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
import process from 'node:process';
import {
  WCAG_TAGS, loadEngineSource, loadFiltersSource, listFilters, resolveFilter, normaliseUrl, parseViewport,
  loadPuppeteer, launchBrowser, openPage, isChallenge, scrollPage, runAudit, applyFilter, collectFocusOrder,
  compactResults,
} from './lib.mjs';

const STATE_NOTE = 'Results depend on the page state: the viewport width (responsive pages serve different '
  + 'content per breakpoint), whether the page was scrolled first (lazy content), and what is open on it. '
  + 'Say which you used when you report a figure.';

const PAGE_PROPERTIES = {
  url: { type: 'string', description: 'The page to load. A local dev server is fine (http://localhost:8080/). Without a scheme, https is tried first, then http.' },
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
  const withPage = (args, work) => oneAtATime(async () => {
    const { url, schemeless } = normaliseUrl(args.url);
    const viewport = parseViewport(args.viewport);
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
      return await work(page, loaded, viewport);
    } finally {
      await page.close().catch(() => {});
    }
  });

  const json = (value) => ({ content: [{ type: 'text', text: JSON.stringify(value, null, 1) }] });

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
        required: ['url'],
      }),
      run: (args) => withPage(args, async (page, url, viewport) => {
        const results = await runAudit(page, await engine(), {
          tags: args.bestPractices === true ? [...WCAG_TAGS, 'best-practice'] : WCAG_TAGS,
          exclude: typeof args.exclude === 'string' && args.exclude.trim() ? args.exclude.trim() : undefined,
        });
        const maxNodes = Number.isInteger(args.maxNodes) && args.maxNodes >= 0 ? args.maxNodes : 5;
        const detail = ['summary', 'rules', 'elements'].includes(args.detail) ? args.detail : 'elements';
        return json(compactResults({ ...results, url }, { maxNodes, detail, viewport }));
      }),
    },
    {
      name: 'pour_focus_order',
      title: 'Trace the focus order',
      description: async () => 'The sequential keyboard focus order of a page, as the Tab key visits it: every reachable control in order '
        + 'with its tag, role, accessible name (the engine\'s own computation) and CSS path. Controls with a positive tabindex come '
        + 'first and carry the value, since it forces their position. "unreachable" lists native controls a tabindex of -1 has taken '
        + 'out of the keyboard\'s reach. The same walk as the Focus Order lens in the pour extension. ' + STATE_NOTE,
      schema: async () => ({ type: 'object', properties: { ...PAGE_PROPERTIES }, required: ['url'] }),
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
          required: ['url'],
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

  async function dispatch(method, params) {
    switch (method) {
      case 'initialize': {
        const asked = String(params.protocolVersion ?? '');
        return {
          protocolVersion: /^\d{4}-\d{2}-\d{2}$/.test(asked) ? asked : '2025-06-18',
          capabilities: { tools: {} },
          serverInfo: { name: 'pour', version },
          instructions: 'pour audits pages against WCAG 2.2 with its own engine in headless Chrome. ' + STATE_NOTE
            + ' Findings under "needsReview" are the engine abstaining rather than guessing: report them as needing a look, not as failures.',
        };
      }
      case 'ping':
        return {};
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
