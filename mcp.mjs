// pour's browser tools for AI agents: an MCP server on stdio, started by
// `pour mcp`. Any client of the Model Context Protocol (Claude Code, Codex,
// Grok Build, VS Code's agents through the pour extension) gets three
// tools backed by the same engine and the same headless Chrome the command
// line drives:
//   pour_audit         audit a URL, results cut to a context window's size
//   pour_focus_order   the sequential focus order, stop by stop
//   pour_screenshot    the page as a PNG, through a simulation if asked
// The protocol is small enough to speak directly (JSON-RPC 2.0, one message
// per line, every request answered by id), so the package keeps its single
// dependency. Nothing but protocol messages is written to stdout; notes go
// to stderr. Dual-home like pour.mjs: ships verbatim in the pour-cli package.
//
// To drive it by hand while working on it, which no client ever does (they
// do the handshake themselves), pipe two lines in from the folder you want
// `path` rooted at:
//
//   printf '%s\n' \
//    '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18"}}' \
//    '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"pour_audit","arguments":{"path":"index.html","detail":"summary"}}}' \
//    | pour mcp
import process from 'node:process';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import {
  WCAG_TAGS, loadEngineSource, loadFiltersSource, listFilters, resolveFilter, normaliseUrl, parseViewport,
  loadPuppeteer, launchBrowser, openPage, isChallenge, scrollPage, runAudit, applyFilter, collectFocusOrder,
  compactResults, IMPACT_ORDER, serveRoot,
} from './lib.mjs';

// The tools reach a page two ways: a URL, or a file on disk through `path`.
// Only the first is a web address, and only http and https are web
// addresses. file:, data: and the browser's own schemes would turn an audit
// into a read of the machine: a model drives this server, and it reads pages
// it does not control, so a page that tells it to screenshot
// file:///home/you/.aws/credentials must not be able to get one. Local files
// go through `path`, which serves them over http from inside a root.
const WEB_SCHEMES = new Set(['http:', 'https:']);

// What the server speaks when the client does not ask for a version of its
// own, and the levels a client may set with logging/setLevel.
const PROTOCOL_VERSION = '2025-06-18';
const LOG_LEVELS = ['debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert', 'emergency'];

// How far `path` reaches. The person wiring the server up chooses it, by the
// directory they start it in or by POUR_MCP_ROOT. Nothing a caller sends can
// widen it.
const FILE_ROOT = path.resolve(process.env.POUR_MCP_ROOT ?? process.cwd());

// What the browser lane can render. Every other kind pour reads is a
// template or a component: source that is not a page, and is answered by the
// static lane instead of being fed to Chrome as if it were markup.
const PAGE_EXTENSIONS = new Set(['.html', '.htm']);

/** A `path` argument as a real file, with the folder to serve it from. */
function resolveLocal({ path: asked, root: askedRoot }) {
  const file = path.resolve(FILE_ROOT, String(asked));
  const inside = (target) => {
    const within = path.relative(FILE_ROOT, target);
    return within === '' || (!within.startsWith('..') && !path.isAbsolute(within));
  };
  if (path.dirname(FILE_ROOT) === FILE_ROOT) {
    // Started with the whole filesystem underneath it, which is no boundary
    // at all. A client that names no working directory lands here, so the
    // refusal is the server's own rather than something a client must
    // remember to set.
    throw new Error('path is refused: this server was started at the filesystem root, so it has no project to stay inside. '
      + 'Start it in the folder you want checked, or set POUR_MCP_ROOT to that folder.');
  }
  if (!inside(file)) {
    throw new Error(`path is outside ${FILE_ROOT}, which is as far as this server reaches. `
      + 'Start pour mcp in the folder you want checked, or set POUR_MCP_ROOT to it.');
  }
  if (!existsSync(file) || !statSync(file).isFile()) throw new Error(`no file at ${file}`);
  const root = askedRoot ? path.resolve(FILE_ROOT, String(askedRoot)) : path.dirname(file);
  if (!inside(root)) throw new Error(`root is outside ${FILE_ROOT}, which is as far as this server reaches`);
  const rel = path.relative(root, file);
  if (rel.startsWith('..') || path.isAbsolute(rel)) throw new Error(`root ${root} does not contain ${file}`);
  return { file, root, rel: rel.split(path.sep).join('/') };
}

const STATE_NOTE = 'Results depend on the page state: the viewport width (responsive pages serve different '
  + 'content per breakpoint), whether the page was scrolled first (lazy content), and what is open on it. '
  + 'Say which you used when you report a figure.';

const PAGE_PROPERTIES = {
  url: { type: 'string', description: 'The page to load, http or https only. A local dev server is fine (http://localhost:8080/). Without a scheme, https is tried first, then http. For a file on disk use path instead: file:// URLs are refused.' },
  path: { type: 'string', description: 'A file on disk to check instead of a URL, relative to the folder the server was started in. It is served over http from its own folder, so relative assets load. Give one of url or path, not both.' },
  root: { type: 'string', description: 'With path: the folder to serve as the site root, for a page whose assets are addressed from the root (/styles.css) rather than from its own folder. Defaults to the file\'s own folder.' },
  viewport: { type: 'string', description: 'Viewport as WxH. Default 1440x900. Responsive pages serve different content per width, so the width is part of the result.' },
  scroll: { type: 'boolean', description: 'Scroll through the page first so lazy-loaded content is in the DOM. Changes the numbers, by design. Default false.' },
  waitMs: { type: 'integer', description: 'Extra settle time after the page loads, in milliseconds. Default 0.' },
  timeoutMs: { type: 'integer', description: 'Navigation timeout in milliseconds. Default 30000.' },
  insecure: { type: 'boolean', description: 'Ignore TLS certificate errors, for a dev server with a self-signed certificate. Default false.' },
};

export async function serve({ scriptDir, version = 'dev', executablePath } = {}) {
  const note = (text) => process.stderr.write(`pour mcp: ${text}\n`);

  // The engine and the filters are read (or, in the monorepo, built) once,
  // at the first call that needs them.
  let engineSource = null;
  let filtersSource = null;
  let filters = null;
  const engine = async () => (engineSource ??= await loadEngineSource(scriptDir));
  const filtersBundle = async () => (filtersSource ??= await loadFiltersSource(scriptDir));
  const filterList = async () => (filters ??= listFilters(await filtersBundle()));

  let puppeteer = null;
  let browser = null;
  const getBrowser = async () => {
    if (browser && (browser.connected ?? browser.isConnected?.())) return browser;
    puppeteer ??= await loadPuppeteer();
    browser = await launchBrowser(puppeteer, { headless: true, executablePath });
    browser.on('disconnected', () => { browser = null; });
    return browser;
  };

  // One page per call, closed afterwards, and calls run one at a time so an
  // audit never shares the browser's attention with another.
  let chain = Promise.resolve();
  const oneAtATime = (work) => {
    const next = chain.then(work, work);
    chain = next.catch(() => {});
    return next;
  };
  // Either a web address or a local file, never both, and a web address is
  // http or https. Anything else is refused by name, with the way in.
  const target = async (args) => {
    if (args.path && args.url) throw new Error('give either url or path, not both');
    if (!args.path && !args.url) throw new Error('give a url to load, or a path to a file on disk');
    if (args.path) {
      const local = resolveLocal(args);
      if (!PAGE_EXTENSIONS.has(path.extname(local.file).toLowerCase())) {
        throw new Error(`${local.file} is a template or a component, not a page, so there is nothing for the browser to render. `
          + 'pour_audit reads this kind of file with the static lane instead; a focus order and a screenshot need a rendered page, '
          + 'so build it first and pass the built HTML.');
      }
      const served = await serveRoot(local.root);
      return { url: `${served.origin}/${local.rel}`, schemeless: false, served, label: local.file };
    }
    const { url, schemeless } = normaliseUrl(args.url);
    const scheme = new URL(url).protocol;
    if (!WEB_SCHEMES.has(scheme)) {
      throw new Error(`${scheme} URLs are refused: this server loads http and https only. `
        + 'To check a file on disk, pass it as path, which serves it from inside '
        + `${FILE_ROOT} rather than opening the disk to the browser.`);
    }
    return { url, schemeless, served: null, label: null };
  };

  const withPage = (args, work) => oneAtATime(async () => {
    const { url, schemeless, served, label } = await target(args);
    const viewport = parseViewport(args.viewport);
    try {
      const { page, url: loaded } = await openPage(await getBrowser(), {
        url,
        viewport,
        schemeless,
        timeoutMs: Number(args.timeoutMs) > 0 ? Number(args.timeoutMs) : 30000,
        settleMs: Number(args.waitMs) > 0 ? Number(args.waitMs) : 0,
        insecure: args.insecure === true,
      });
      try {
        if (await isChallenge(page)) {
          throw new Error(`${loaded} is showing a bot-verification challenge, not the site; a result here would describe the challenge page. `
            + `Open the site in a normal browser, or run \`pour ${loaded} --headful\` and complete the check there.`);
        }
        if (args.scroll === true) await scrollPage(page);
        // A served file answers as the file it is. The loopback address it
        // was reached through is an implementation detail and means nothing
        // to whoever asked.
        return await work(page, label ?? loaded, viewport);
      } finally {
        await page.close().catch(() => {});
      }
    } finally {
      await served?.close();
    }
  });

  const json = (value) => ({ content: [{ type: 'text', text: JSON.stringify(value, null, 1) }] });

  /**
   * A template or a component read as source. Chrome would render it as
   * broken markup, so the editor's own lane reads it with jsdom instead, and
   * gives back the one thing the browser lane cannot: the line and the
   * column of every finding.
   */
  const staticAudit = async (args) => {
    const { file } = resolveLocal(args);
    const { checkFiles } = await import('./check.mjs');
    const { files, findings, abstained, durationMs } = await checkFiles({
      scriptDir, files: [file], bestPractices: args.bestPractices === true,
    });
    const detail = ['summary', 'rules', 'elements'].includes(args.detail) ? args.detail : 'elements';
    const maxNodes = Number.isInteger(args.maxNodes) && args.maxNodes >= 0 ? args.maxNodes : 5;
    const counts = Object.fromEntries(IMPACT_ORDER.map((id) => [id, 0]));
    let review = 0;
    for (const f of findings) {
      if (f.kind === 'review') review += 1;
      else counts[f.impact] = (counts[f.impact] ?? 0) + 1;
    }
    const groups = new Map();
    for (const f of findings) {
      const key = `${f.kind}:${f.rule}`;
      if (!groups.has(key)) groups.set(key, { kind: f.kind, rule: f.rule, impact: f.impact, wcag: f.sc, help: f.help, helpUrl: f.helpUrl, at: [] });
      groups.get(key).at.push(f);
    }
    const ordered = [...groups.values()].sort((a, b) => IMPACT_ORDER.indexOf(a.impact) - IMPACT_ORDER.indexOf(b.impact)
      || a.at[0].line - b.at[0].line);
    const shape = (g) => ({
      rule: g.rule,
      impact: g.impact,
      wcag: g.wcag,
      help: g.help,
      helpUrl: g.helpUrl,
      elements: g.at.length,
      ...(detail === 'elements'
        ? { shown: (maxNodes === 0 ? g.at : g.at.slice(0, maxNodes)).map((f) => ({ line: f.line, col: f.col, html: f.html, message: f.message, fix: f.fix })) }
        : {}),
    });
    const violations = ordered.filter((g) => g.kind === 'violation');
    const needsReview = ordered.filter((g) => g.kind === 'review');
    const out = {
      file: files[0]?.file ?? file,
      lane: files[0]?.lane ?? 'static',
      read: 'Source, read with jsdom, not rendered: this file is a template or a component rather than a page. '
        + 'Values that come from code are left unjudged and counted in notJudged, never guessed. Rules that need layout '
        + 'or paint, contrast and target size among them, cannot run on source at all: build the page and audit it with '
        + 'url or with an .html path to reach those.',
      durationMs,
      totals: {
        ...counts,
        review,
        notJudged: abstained,
        rulesFailing: violations.length,
        rulesNeedingReview: needsReview.length,
      },
    };
    if (detail !== 'summary') {
      out.violations = violations.map(shape);
      out.needsReview = needsReview.map(shape);
    }
    return out;
  };

  const tools = [
    {
      name: 'pour_audit',
      title: 'Audit a page with pour',
      description: async () => 'Audit a URL against WCAG 2.2 A and AA with the pour engine in headless Chrome: the page is loaded, '
        + 'the engine runs against the live DOM, and every failing rule comes back with its severity, its success criteria, '
        + 'the failing elements as CSS paths with the fix, and the count of rules the engine would not judge without a human. '
        + 'Works on a running dev server or any URL. ' + STATE_NOTE,
      schema: async () => ({
        type: 'object',
        properties: {
          ...PAGE_PROPERTIES,
          bestPractices: { type: 'boolean', description: 'Also run the best-practice rules (heading order, landmarks, redundant ARIA). Default false.' },
          exclude: { type: 'string', description: 'A CSS selector. Matching elements, and everything inside them, are left out of every rule.' },
          detail: { type: 'string', enum: ['summary', 'rules', 'elements'], description: 'summary: totals only. rules: one entry per failing rule, no elements. elements (default): up to maxNodes elements per rule.' },
          maxNodes: { type: 'integer', description: 'Elements shown per rule at detail "elements". Default 5. 0 shows every element.' },
        },
      }),
      run: (args) => (args.path && !PAGE_EXTENSIONS.has(path.extname(String(args.path)).toLowerCase())
        ? oneAtATime(async () => json(await staticAudit(args)))
        : withPage(args, async (page, url, viewport) => {
        const results = await runAudit(page, await engine(), {
          tags: args.bestPractices === true ? [...WCAG_TAGS, 'best-practice'] : WCAG_TAGS,
          exclude: typeof args.exclude === 'string' && args.exclude.trim() ? args.exclude.trim() : undefined,
        });
        const maxNodes = Number.isInteger(args.maxNodes) && args.maxNodes >= 0 ? args.maxNodes : 5;
        const detail = ['summary', 'rules', 'elements'].includes(args.detail) ? args.detail : 'elements';
        return json(compactResults({ ...results, url }, { maxNodes, detail, viewport }));
      })),
    },
    {
      name: 'pour_focus_order',
      title: 'Trace the focus order',
      description: async () => 'The sequential keyboard focus order of a page, as the Tab key visits it: every reachable control in order '
        + 'with its tag, role, accessible name (the engine\'s own computation) and CSS path. Controls with a positive tabindex come '
        + 'first and carry the value, since it forces their position. "unreachable" lists native controls a tabindex of -1 has taken '
        + 'out of the keyboard\'s reach. The same walk as the Focus Order lens in the pour extension. ' + STATE_NOTE,
      schema: async () => ({ type: 'object', properties: { ...PAGE_PROPERTIES } }),
      run: (args) => withPage(args, async (page, url, viewport) => {
        const order = await collectFocusOrder(page, await filtersBundle());
        return json({ url, viewport: `${viewport.width}x${viewport.height}`, stops: order.stops, unreachable: order.unreachable });
      }),
    },
    {
      name: 'pour_screenshot',
      title: 'Screenshot a page, through a simulation',
      description: async () => {
        const { vision, sensory } = await filterList();
        const list = (group) => group.map((f) => `${f.name} (${f.label})`).join(', ');
        return 'A PNG of the page as loaded, or as seen through one of pour\'s simulations, the same ones the extension ships. '
          + `Vision: ${list(vision)}. Sensory, motor and structure: ${list(sensory)}. `
          + 'Omit the filter for the page as it is. Useful for what the numbers cannot show: colour-vision and low-vision '
          + 'rendering, and the focusOrder and landmarkMap lenses drawn over the page.';
      },
      schema: async () => {
        const { vision, sensory } = await filterList();
        return {
          type: 'object',
          properties: {
            ...PAGE_PROPERTIES,
            filter: { type: 'string', enum: [...vision, ...sensory].map((f) => f.name), description: 'A simulation name. Omit for the plain page.' },
            fullPage: { type: 'boolean', description: 'Capture the full page height instead of the viewport. Long pages make large images. Default false.' },
          },
        };
      },
      run: (args) => withPage(args, async (page, url, viewport) => {
        let applied = null;
        if (typeof args.filter === 'string' && args.filter.trim()) {
          applied = resolveFilter(await filterList(), args.filter.trim());
          if (!applied) throw new Error(`unknown filter "${args.filter}"`);
          await applyFilter(page, await filtersBundle(), applied.name, applied.isSensory);
        }
        const data = await page.screenshot({ fullPage: args.fullPage === true, encoding: 'base64' });
        const label = applied ? ((await filterList())[applied.isSensory ? 'sensory' : 'vision'].find((f) => f.name === applied.name)?.label ?? applied.name) : null;
        return {
          content: [
            { type: 'text', text: `Screenshot of ${url} at ${viewport.width}x${viewport.height}${label ? ` through ${label} (${applied.name})` : ''}${args.fullPage === true ? ', full page' : ''}.` },
            { type: 'image', data, mimeType: 'image/png' },
          ],
        };
      }),
    },
  ];

  // ------------------------------------------------------------ protocol
  const send = (message) => process.stdout.write(`${JSON.stringify(message)}\n`);
  const rpcError = (code, message) => Object.assign(new Error(message), { code });

  // What this server is and what it will and will not reach, in one place:
  // written to stderr as it starts, and sent to the client once it says it
  // is ready, so the answer is the same wherever it is read.
  const details = () => ({
    server: `pour-cli ${version}`,
    protocol: PROTOCOL_VERSION,
    tools: tools.map((tool) => tool.name),
    urls: 'http and https only; file:, data: and the browser\'s own schemes are refused',
    files: `path reaches files inside ${FILE_ROOT}, each served over http from a loopback port so relative assets load`,
    root: FILE_ROOT,
    rootFrom: process.env.POUR_MCP_ROOT ? 'POUR_MCP_ROOT' : 'the directory the server was started in',
    browser: 'headless Chrome, launched on the first call that needs one and kept warm after that',
  });

  let logLevel = 'info';
  const broadcast = (level, data) => {
    if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(logLevel)) return;
    send({ jsonrpc: '2.0', method: 'notifications/message', params: { level, logger: 'pour', data } });
  };

  async function dispatch(method, params) {
    switch (method) {
      case 'initialize': {
        const asked = String(params.protocolVersion ?? '');
        return {
          protocolVersion: /^\d{4}-\d{2}-\d{2}$/.test(asked) ? asked : PROTOCOL_VERSION,
          capabilities: { tools: {}, logging: {} },
          serverInfo: { name: 'pour', version },
          instructions: 'pour audits pages against WCAG 2.2 with its own engine in headless Chrome. ' + STATE_NOTE
            + ' Findings under "needsReview" are the engine abstaining rather than guessing: report them as needing a look, not as failures.',
        };
      }
      case 'ping':
        return {};
      case 'logging/setLevel': {
        const asked = String(params.level ?? '');
        if (!LOG_LEVELS.includes(asked)) throw rpcError(-32602, `unknown log level: ${asked}`);
        logLevel = asked;
        return {};
      }
      case 'notifications/initialized':
        broadcast('info', { message: 'pour is ready', ...details() });
        return undefined;
      case 'tools/list':
        return { tools: await Promise.all(tools.map(async (tool) => ({ name: tool.name, title: tool.title, description: await tool.description(), inputSchema: await tool.schema() }))) };
      case 'tools/call': {
        const tool = tools.find((t) => t.name === params.name);
        if (!tool) throw rpcError(-32602, `unknown tool: ${params.name}`);
        try {
          return await tool.run(params.arguments ?? {});
        } catch (error) {
          return { content: [{ type: 'text', text: `pour: ${error.message}` }], isError: true };
        }
      }
      default:
        if (method.startsWith('notifications/')) return undefined;
        throw rpcError(-32601, `method not found: ${method}`);
    }
  }

  async function handle(message) {
    if (Array.isArray(message)) { for (const each of message) await handle(each); return; }
    if (!message || typeof message !== 'object' || typeof message.method !== 'string') return; // a response, or noise
    const { id, method } = message;
    const isRequest = id !== undefined && id !== null;
    try {
      const result = await dispatch(method, message.params ?? {});
      if (isRequest) send({ jsonrpc: '2.0', id, result: result ?? {} });
    } catch (error) {
      if (isRequest) send({ jsonrpc: '2.0', id, error: { code: error.code ?? -32603, message: error.message } });
      else note(error.message);
    }
  }

  // Said out loud as the server starts. stdout carries nothing but protocol,
  // so this goes to stderr, where whoever wired the server into an editor
  // will see what it answers, how far it reaches and what it refuses, before
  // making a single call.
  const shown = details();
  note(`${shown.server}, MCP ${shown.protocol}, speaking JSON-RPC 2.0 on stdin and stdout`);
  note(`tools: ${shown.tools.join(', ')}`);
  note(`urls: ${shown.urls}`);
  note(path.dirname(FILE_ROOT) === FILE_ROOT
    ? 'path: refused, because this server was started at the filesystem root and has no project to stay inside; '
      + 'start it in a project folder, or set POUR_MCP_ROOT'
    : `path: files inside ${shown.root} (${shown.rootFrom}), served over http so relative assets load`);
  note(`browser: ${shown.browser}`);

  let buffer = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    buffer += chunk;
    let newline;
    while ((newline = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, newline).trim();
      buffer = buffer.slice(newline + 1);
      if (!line) continue;
      let message;
      try {
        message = JSON.parse(line);
      } catch {
        send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'parse error' } });
        continue;
      }
      // Not awaited: a tool call must not hold up a tools/list or a ping
      // behind it. Tool calls themselves queue one at a time.
      handle(message).catch((error) => note(error.message));
    }
  });

  const shutdown = async () => { await browser?.close().catch(() => {}); browser = null; };
  for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.on(signal, () => shutdown().finally(() => process.exit(0)));
  process.stdout.on('error', () => shutdown().finally(() => process.exit(0))); // the client went away mid-write
  await new Promise((resolve) => { process.stdin.on('end', resolve); process.stdin.on('close', resolve); });
  // A client that wrote its requests and closed stdin (a shell pipe) still
  // gets its answers: the queue drains before the browser goes.
  await chain;
  await shutdown();
}
