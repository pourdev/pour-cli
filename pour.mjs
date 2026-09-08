#!/usr/bin/env node
// pour — audit a URL from the terminal.
//
// The same engine the extension ships, driven by headless Chromium: the page
// is loaded once, the engine bundle is injected into the live DOM, and the
// report lands on stdout. Exit code 1 when the audit finds what --fail-on
// asks about, so it drops straight into CI.
//
// Usage:
//   pour <url>                     # WCAG 2.2 A+AA audit, human report
//   pour index.html                # a page on disk, served from a loopback
//                                  # port so its relative and root-relative
//                                  # assets load (file:// cannot)
//   pour build/page.html --root build   # when assets are addressed from the
//                                  # site root rather than the page's folder
//   pour <url> --json              # full engine results as JSON
//   pour <url> --viewport 1440x900 # responsive pages serve different content
//                                  # per breakpoint — the width IS part of
//                                  # the result, so it's echoed in the header
//   pour <url> --scroll            # scroll the page first (lazy content
//                                  # loads in; audit numbers are
//                                  # state-dependent, so this changes them)
//   pour <url> --bp                # include best-practice rules
//   pour <url> --wait 2000         # extra settle time after load (ms)
//   pour <url> --exclude ".ads"    # CSS selector to leave out of every rule
//   pour <url> --fail-on none      # violations (default) | incomplete | none
//   pour <url> --headful           # watch the browser work
//   pour mcp                       # serve the audit, the focus order and the
//                                  # simulation screenshots to an AI agent as
//                                  # tools (MCP over stdio; see mcp.mjs). The
//                                  # tools take a URL or a local path, and
//                                  # refuse file: URLs, which this command
//                                  # does not: see the note in mcp.mjs
//   pour report yoursite.com       # every internal page of a site (or the
//                                  # home page of every domain in a list
//                                  # file), audited with a progress screen
//                                  # and a standalone HTML report at the end
//                                  # (the report runner, scripts/report)
//   pour check src/                # the editor's static lane over files: every
//                                  # finding with file, line and column, as
//                                  # text, Markdown, GitHub annotations or
//                                  # SARIF for code scanning (see check.mjs)
//   pour <url> --format markdown   # the audit as a pull-request comment
// Dual-home file: this script is the source of truth in the monorepo
// (scripts/cli/) AND ships verbatim in the published pour-cli package via
// `npm run sync:cli`, together with lib.mjs (the browser and engine plumbing
// it shares with the agent server) and mcp.mjs. The two homes differ in
// what sits around them:
//   monorepo  — no prebuilt bundle: the engine is built fresh from
//               src/engine with esbuild, and full puppeteer (a devDep)
//               brings its own Chromium.
//   package   — engine.iife.js is prebuilt next to this file at sync time,
//               and puppeteer-core drives the system Chrome (no 170MB
//               browser download on install).
// Both paths are resolved at runtime in lib.mjs; keep changes working in both.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import {
  WCAG_TAGS, loadEngineSource, loadFiltersSource, listFilters, resolveFilter, normaliseUrl, parseViewport,
  loadPuppeteer, launchBrowser, openPage, isChallenge, scrollPage, runAudit, applyFilter, sortViolations, toSc,
  IMPACT_ORDER, sleep, serveRoot,
} from './lib.mjs';
import { makePaint, findingsFromResults, markdownReport } from './report.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------- arguments
const argv = process.argv.slice(2);
const flags = new Map();
const positional = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (!a.startsWith('--')) { positional.push(a); continue; }
  const eq = a.indexOf('=');
  if (eq !== -1) { flags.set(a.slice(2, eq), a.slice(eq + 1)); continue; }
  const next = argv[i + 1];
  if (next !== undefined && !next.startsWith('--')) { flags.set(a.slice(2), next); i++; }
  else flags.set(a.slice(2), true);
}

const usage = `pour — audit a URL against WCAG 2.2 with the pour engine

Usage: pour <url | file.html> [options]
       pour report <url | list.csv> [options]
       pour check <files, folders or globs> [options]
       pour mcp [--browser <path>]

Options:
  --root <dir>         with a local .html file: the folder to serve as the
                       site root, for a page whose assets are addressed from
                       there (/css/site.css). Default: the file's own folder
  --json               print the full engine results as JSON
  --viewport WxH       viewport (default 1440x900); a bare width implies x900
  --scroll             scroll through the page before auditing (lazy content)
  --wait <ms>          extra settle delay after load (default 0)
  --timeout <ms>       navigation timeout (default 30000)
  --bp                 include best-practice rules alongside WCAG A+AA
  --exclude <sel>      CSS selector excluded from every rule
  --fail-on <what>     violations (default) | incomplete | none
  --max-nodes <n>      element details shown per rule (default 5, 0 = all)
  --format <what>      terminal (default) | json | markdown (a pull-request
                       comment); pour check adds github (annotations on the
                       changed lines of a pull request) and sarif (GitHub
                       code scanning, and any SARIF viewer)
  --level <detail>     quiet (the totals line only) | rules (one line per
                       rule, no elements) | max (default: everything)
  --filter <name>      screenshot the page through a vision/sensory simulation
                       instead of auditing (--filter list shows them all)
  --shot [file]        screenshot mode: save a PNG (default name derived from
                       the URL and filter) — no audit runs
  --full               capture the full page height, not just the viewport
  --insecure           ignore TLS certificate errors
  --browser <path>     Chrome/Chromium binary to drive (default: bundled
                       Chromium in the monorepo, system Chrome when installed
                       from npm; PUPPETEER_EXECUTABLE_PATH works too)
  --headful            run the browser with a visible window

  pour report <target> the report runner: every internal page of a site,
                       breadth first from the address given, or the home
                       page of every domain in a list file, audited with a
                       live progress screen in the browser and a standalone
                       HTML report at the end. Ctrl+C stops cleanly; the
                       same command resumes. Options: --max <n> pages
                       (default 5000), --workers <n> (4 for a site, 8 for a
                       list), --pause <ms> between pages per worker,
                       --depth <n>, --same-host, --viewport WxH, --load
                       <ms> to let a page load (default 10000), --timeout
                       <ms> for the whole page (default 20000), --report
                       <file.html> where to save the finished report, --out
                       <dir> where the run itself lives (default
                       reports/audit in the monorepo), --no-open, --port
                       <n>, --fresh, --recheck, --render

  pour check <paths>   the editor's static lane from the terminal, no
                       browser: HTML, JSX, TSX, Vue, Svelte, Angular, Liquid
                       and Nunjucks files, every finding with its file, line
                       and column. Values from code and script-built markup
                       are left unjudged and counted. --bp, --fail-on,
                       --level, --max-nodes and --format apply; --no-css
                       skips reading linked local stylesheets

  pour mcp             serve pour's browser tools to an AI agent over the
                       Model Context Protocol on stdio: pour_audit,
                       pour_focus_order and pour_screenshot. Add it to any
                       MCP client as the command "pour" with the argument
                       "mcp"; the VS Code extension adds it by itself. Each
                       tool takes a url, http or https, or a path to a file
                       on disk, which is served over a loopback port so its
                       relative assets load. A path reaches inside the
                       directory the server was started in; POUR_MCP_ROOT
                       names a different one. file: URLs are refused there:
                       a model chooses those addresses, and the disk is not
                       a web page. This command still takes them, since you
                       are the one typing.

Exit codes: 0 clean, 1 findings (per --fail-on), 2 error`;

if (flags.has('help') || (!positional.length && !argv.length)) {
  console.log(usage);
  process.exit(flags.has('help') ? 0 : 2);
}

// Published package: its own package.json sits next to this script.
// Monorepo: the CLI has no version of its own — the engine is the version
// that matters, and every report header prints it.
const packageVersion = () => {
  const pkgPath = path.join(scriptDir, 'package.json');
  if (!existsSync(pkgPath)) return null;
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  return `${pkg.name} ${pkg.version}`;
};

if (flags.has('version')) {
  console.log(packageVersion() ?? 'pour-cli (monorepo dev build)');
  process.exit(0);
}

const fail = (message) => { console.error(`pour: ${message}`); process.exit(2); };

// `pour mcp`: the agent server owns the process until its client closes
// stdin. Everything below is the one-shot command.
if (positional[0] === 'mcp') {
  if (positional.length > 1) fail('pour mcp takes no URL: the agent passes one to each tool');
  const { serve } = await import('./mcp.mjs');
  await serve({
    scriptDir,
    version: packageVersion()?.split(' ')[1] ?? 'dev',
    executablePath: flags.get('browser') ? String(flags.get('browser')) : undefined,
  });
  process.exit(0);
}

// `pour report`: the report runner, a child process so its progress
// screen, Ctrl+C handling and resume work exactly as they do under npm.
// The runner lives beside the command in the monorepo; the package will
// carry it once it is bundled, until then this says so plainly.
if (positional[0] === 'report') {
  const runner = [path.join(scriptDir, 'report-runner.mjs'), path.join(scriptDir, '..', 'report', 'run.mjs')].find(existsSync);
  if (!runner) fail('pour report needs the report runner, which this build does not carry');
  const target = positional[1];
  if (!target) fail(`pour report needs a URL or a list file\n\n${usage}`);
  if (positional.length > 2) fail(`pour report takes one target (got ${positional.length - 1}); put the flags after it`);
  // --max caps a site's crawl and a list's audited count alike; the runner
  // keeps its two names and reads whichever applies.
  const VALUES = {
    max: ['--max', '--count'], count: ['--count'], workers: ['--workers'], pause: ['--pause'], depth: ['--depth'],
    viewport: ['--viewport'], load: ['--load'], timeout: ['--timeout'], port: ['--port'], out: ['--out'], report: ['--report'],
  };
  const SWITCHES = { 'same-host': '--same-host', fresh: '--fresh', recheck: '--recheck', render: '--render', 'no-open': '--no-open', yes: '--yes' };
  const runnerArgs = [target];
  for (const [name, value] of flags) {
    if (VALUES[name]) { for (const f of VALUES[name]) runnerArgs.push(f, String(value)); }
    else if (SWITCHES[name]) { runnerArgs.push(SWITCHES[name]); if (typeof value === 'string') runnerArgs.push(value); }
    else fail(`pour report does not take --${name}`);
  }
  // Ctrl+C reaches the runner directly (same process group); the command
  // waits for it to stop cleanly and carries its exit code.
  process.on('SIGINT', () => {});
  const child = spawn(process.execPath, [runner, ...runnerArgs], { stdio: 'inherit' });
  process.exitCode = await new Promise((resolve) => child.on('exit', (code) => resolve(code ?? 1)));
} else if (positional[0] === 'check') {
// `pour check`: files, not a URL. The static lane runs in-process and
// returns the exit code; every error is a usage error here.
  const { runCheck } = await import('./check.mjs');
  try {
    process.exitCode = await runCheck({
      scriptDir, inputs: positional.slice(1), flags, version: packageVersion()?.split(' ')[1] ?? 'dev',
    });
  } catch (error) {
    fail(error.message);
  }
} else {
  // `--filter list` (or a bare/unknown --filter, which prints the same list)
  // is a listing command and needs no URL.
  const filterListing = flags.has('filter')
    && (flags.get('filter') === true || String(flags.get('filter')).toLowerCase() === 'list');

  if (!positional.length && !filterListing) fail('a URL is required\n\n' + usage);
  if (positional.length > 1) fail(`one URL at a time (got ${positional.length})`);

  let url = positional[0];
  let schemeless = false;

  // A target that names an .html file on disk is audited as the page it is.
  // It gets served from a loopback port rather than opened as file://, so
  // that its relative and root-relative assets load: over file:// a
  // stylesheet at /css/site.css never arrives, and the audit quietly reports
  // an unstyled page as if it were the real one. --root names the folder to
  // serve as the site root when the page addresses its assets from there.
  // The kinds pour reads that are not pages belong to `pour check`, which
  // reads source rather than rendering it.
  const TEMPLATE_EXTENSIONS = ['.jsx', '.tsx', '.vue', '.svelte', '.liquid', '.njk', '.nunjucks'];
  let localFile = null;
  let localRoot = null;
  if (url && !/^[a-z][a-z0-9+.-]*:/i.test(url) && existsSync(url) && statSync(url).isFile()) {
    const ext = path.extname(url).toLowerCase();
    if (ext === '.html' || ext === '.htm') {
      localFile = path.resolve(url);
      localRoot = flags.get('root') ? path.resolve(String(flags.get('root'))) : path.dirname(localFile);
      const within = path.relative(localRoot, localFile);
      if (within.startsWith('..') || path.isAbsolute(within)) fail(`--root ${localRoot} does not contain ${localFile}`);
    } else if (TEMPLATE_EXTENSIONS.includes(ext)) {
      fail(`${url} is a template or a component, not a page, so there is nothing to render.\nRead it as source instead: pour check ${url}`);
    }
  }
  if (url && !localFile) {
    // A scheme-less URL gets https first, like a browser address bar, and like
    // the address bar, a TLS failure later falls back to http (shared hosts
    // often serve a real site on 80 behind a wrong-name cert on 443).
    try { ({ url, schemeless } = normaliseUrl(url)); } catch (error) { fail(error.message); }
  }

  // What the report calls the target. A served file answers as the file it
  // is: the loopback address is plumbing and means nothing to the reader.
  const label = (() => {
    if (!localFile) return url;
    const relative = path.relative(process.cwd(), localFile);
    // A file below the working directory reads better as a short path; one
    // outside it reads better in full than as a row of dot-dots.
    return relative.startsWith('..') ? localFile : relative.split(path.sep).join('/');
  })();

  let viewport;
  try { viewport = parseViewport(flags.get('viewport')); } catch (error) { fail(`--${error.message}`); }

  const failOn = String(flags.get('fail-on') ?? 'violations');
  if (!['violations', 'incomplete', 'none'].includes(failOn)) fail(`--fail-on expects violations | incomplete | none, got "${failOn}"`);

  const settleMs = Number(flags.get('wait') ?? 0);
  const timeoutMs = Number(flags.get('timeout') ?? 30000);
  const maxNodes = Number(flags.get('max-nodes') ?? 5);
  if ([settleMs, timeoutMs, maxNodes].some(Number.isNaN)) fail('--wait, --timeout and --max-nodes expect numbers');
  const level = String(flags.get('level') ?? 'max');
  if (!['quiet', 'rules', 'max'].includes(level)) fail(`--level expects quiet | rules | max, got "${level}"`);
  const tags = flags.has('bp') ? [...WCAG_TAGS, 'best-practice'] : WCAG_TAGS;
  const format = String(flags.get('format') ?? (flags.has('json') ? 'json' : 'terminal'));
  if (!['terminal', 'json', 'markdown'].includes(format)) fail(`--format expects terminal | json | markdown for a URL audit, got "${format}"`);
  const asJson = format === 'json';

  // Screenshot mode: filters and audits are exclusive MODES, mirroring the
  // extension — some simulations mutate page styles or text, so auditing a
  // filtered page would audit the simulation, not the site.
  const shotMode = flags.has('filter') || flags.has('shot');

  // ------------------------------------------------------------------- output
  const tty = process.stdout.isTTY && !asJson;
  const { color, bold, dim, paintImpact, reviewMark } = makePaint(tty);

  const progress = (text) => {
    if (!process.stderr.isTTY || asJson) return;
    process.stderr.write(`\r\u001b[2K${text}`);
  };
  const progressDone = () => {
    if (process.stderr.isTTY && !asJson) process.stderr.write('\r\u001b[2K');
  };

  // -------------------------------------------------------------------- audit
  // Engine: prebuilt bundle in the published package, fresh esbuild in the
  // monorepo (so the CLI always audits with the engine as it is on disk).
  let engineSource;
  if (!shotMode) {
    if (!existsSync(path.join(scriptDir, 'engine.iife.js'))) progress('bundling engine…');
    engineSource = await loadEngineSource(scriptDir);
  }

  // Filters ride the same dual-home logic: prebuilt filters.iife.js in the
  // package, a fresh bundle over src/filters in the monorepo. One bundle
  // serves twice — evaluated here in Node for name validation and --filter
  // list, injected into the page to actually apply the simulation.
  let filtersSource = null;
  let filterName = null;
  let filterIsSensory = false;
  if (flags.has('filter')) {
    filtersSource = await loadFiltersSource(scriptDir);
    const filters = listFilters(filtersSource);
    const wanted = flags.get('filter');
    const resolved = wanted === true ? null : resolveFilter(filters, wanted);
    if (!resolved) {
      const listing = wanted === true || String(wanted).toLowerCase() === 'list';
      if (!listing) console.error(`pour: unknown filter "${wanted}"\n`);
      console.log('vision filters:');
      for (const f of filters.vision) console.log(`  ${f.name.padEnd(26)} ${dim(f.label)}`);
      console.log('\nsensory filters:');
      for (const f of filters.sensory) console.log(`  ${f.name.padEnd(26)} ${dim(f.label)}`);
      process.exit(listing ? 0 : 2);
    }
    ({ name: filterName, isSensory: filterIsSensory } = resolved);
  }

  let puppeteer;
  let browser;
  try {
    puppeteer = await loadPuppeteer();
    browser = await launchBrowser(puppeteer, {
      headless: !flags.has('headful'),
      insecure: flags.has('insecure'),
      executablePath: flags.get('browser') ? String(flags.get('browser')) : undefined,
    });
  } catch (error) {
    fail(error.message);
  }

  let results;
  let shotPath;
  let served = null;
  try {
    if (localFile) {
      served = await serveRoot(localRoot);
      url = `${served.origin}/${path.relative(localRoot, localFile).split(path.sep).join('/')}`;
    }
    progress(`loading ${label}…`);
    let page;
    try {
      ({ page, url } = await openPage(browser, { url, viewport, timeoutMs, settleMs, schemeless, onNote: progress }));
    } catch (error) {
      progressDone();
      fail(error.message);
    }

    // A bot-verification interstitial (Cloudflare's "Just a moment…" and kin)
    // is not the site: auditing it would report the challenge page's markup as
    // the site's accessibility, in a confident 0.0s audit. Refuse rather than
    // mislead — except in --headful, where the human completes the check in
    // the visible window and the audit continues against the real page.
    if (await isChallenge(page)) {
      if (!flags.has('headful')) {
        progressDone();
        fail(`${url} is showing a bot-verification challenge, not the site — an audit here would measure the challenge page.\nRe-run with --headful and complete the verification in the browser window; pour waits and audits the real page.`);
      }
      progress('bot challenge detected — complete the verification in the browser window…');
      const deadline = Date.now() + 120000;
      while (await isChallenge(page)) {
        if (Date.now() > deadline) {
          progressDone();
          fail('the verification was not completed within 2 minutes');
        }
        await sleep(500);
      }
      // The cleared challenge navigates to the real page; let it arrive.
      await sleep(1500);
    }

    if (flags.has('scroll')) {
      progress('scrolling for lazy content…');
      await scrollPage(page);
    }

    if (shotMode) {
      if (filterName) {
        progress(`applying ${filterName}…`);
        await applyFilter(page, filtersSource, filterName, filterIsSensory);
      }
      const explicitShot = flags.get('shot');
      shotPath = typeof explicitShot === 'string'
        ? explicitShot
        : `pour-${localFile ? path.basename(localFile, path.extname(localFile)) : new URL(url).hostname}${filterName ? `-${filterName}` : ''}.png`;
      progress('capturing…');
      await page.screenshot({ path: shotPath, fullPage: flags.has('full') });
    } else {
      progress('auditing…');
      results = await runAudit(page, engineSource, {
        tags,
        exclude: flags.get('exclude') ? String(flags.get('exclude')) : undefined,
        onProgress: (done, total, rule) => progress(`auditing… ${done}/${total} ${dim(rule)}`),
      });
    }
  } finally {
    await browser.close();
    await served?.close();
  }
  progressDone();

  // ------------------------------------------------------------------- report
  if (shotMode) {
    console.log(`${bold('pour')} ${dim('·')} ${label}`);
    console.log(`saved ${bold(shotPath)}${filterName ? ` ${dim(`· ${filterName}`)}` : ''} ${dim(`· ${viewport.width}x${viewport.height}${flags.has('full') ? ' · full page' : ''}`)}`);
    process.exitCode = 0;
  } else {

  if (asJson) {
    // A served file reports as the file. The loopback port it was reached
    // through changes every run and would only make two runs of the same
    // page look different.
    console.log(JSON.stringify({ ...results, url: label, viewport }, null, 2));
  } else if (format === 'markdown') {
    console.log(markdownReport(findingsFromResults(results, label), {
      title: label,
      meta: [`engine ${results.testEngine.version}`, `${viewport.width}x${viewport.height}`, flags.has('bp') ? 'WCAG 2.2 A+AA + best practices' : 'WCAG 2.2 A+AA'],
      maxNodes,
    }));
  } else {
    const totalNodes = (list) => list.reduce((n, r) => n + r.nodes.length, 0);
    const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
    const seconds = (results.durationMs / 1000).toFixed(1);

    // --level quiet keeps only the totals line below, for scripts and quick
    // checks; rules keeps the per-rule lines but drops the element details.
    if (level !== 'quiet') {
      console.log(`\n${bold('pour')} ${dim('·')} ${label}`);
      console.log(dim(`engine ${results.testEngine.version} · ${viewport.width}x${viewport.height} · ${flags.has('bp') ? 'WCAG 2.2 A+AA + best practices' : 'WCAG 2.2 A+AA'} · ${seconds}s`));

      const sorted = sortViolations(results.violations);

      if (!sorted.length) {
        console.log(`\n${color(32, '✓')} no violations found`);
      } else {
        console.log(`\n${bold(`VIOLATIONS`)} ${dim(`(${plural(sorted.length, 'rule')}, ${plural(totalNodes(sorted), 'element')})`)}`);
        // At the rules level the lines form a table: severity, id and count
        // are padded into columns (on the plain strings — ANSI escapes would
        // defeat padEnd), so the eye can scan a column instead of a ragged edge.
        const idWidth = Math.max(...sorted.map((rule) => rule.id.length));
        const countWidth = Math.max(...sorted.map((rule) => String(rule.nodes.length).length));
        for (const rule of sorted) {
          const scs = [...new Set(rule.tags.map(toSc).filter(Boolean))];
          if (level !== 'max') {
            const count = `${String(rule.nodes.length).padStart(countWidth)} ${rule.nodes.length === 1 ? 'element ' : 'elements'}`;
            console.log(`  ${paintImpact(rule.impact, '●')} ${paintImpact(rule.impact, rule.impact.padEnd(8))}  ${bold(rule.id.padEnd(idWidth))}  ${dim(`${count}${scs.length ? `  ${scs.join(', ')}` : ''}`.trimEnd())}`);
            continue;
          }
          console.log(`\n  ${paintImpact(rule.impact, '●')} ${paintImpact(rule.impact)}  ${bold(rule.id)} ${dim(`· ${plural(rule.nodes.length, 'element')}${scs.length ? ` · ${scs.join(', ')}` : ''}`)}`);
          console.log(`    ${rule.help}`);
          const shown = maxNodes === 0 ? rule.nodes : rule.nodes.slice(0, maxNodes);
          shown.forEach((node, i) => {
            console.log(`    ${dim(`${i + 1}.`)} ${node.target[0]}`);
            const message = (node.failureSummary || '').split('\n')[0];
            if (message) console.log(`       ${dim(message)}`);
          });
          if (rule.nodes.length > shown.length) console.log(dim(`       … ${rule.nodes.length - shown.length} more (--max-nodes 0 shows all)`));
        }
      }

      if (results.incomplete.length) {
        console.log(`\n${bold('NEEDS REVIEW')} ${dim(`(${plural(results.incomplete.length, 'rule')}, ${plural(totalNodes(results.incomplete), 'element')} — the engine abstains rather than guess)`)}`);
        const reviewWidth = Math.max(...results.incomplete.map((rule) => rule.id.length));
        for (const rule of results.incomplete) {
          console.log(level !== 'max'
            ? `  ${reviewMark('◐')} ${rule.id.padEnd(reviewWidth)}  ${dim(plural(rule.nodes.length, 'element'))}`
            : `  ${reviewMark('◐')} ${rule.id} ${dim(`· ${plural(rule.nodes.length, 'element')}`)}`);
        }
      }
    }

    const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };
    for (const rule of results.violations) counts[rule.impact] = (counts[rule.impact] ?? 0) + rule.nodes.length;
    const summary = IMPACT_ORDER.filter((id) => counts[id]).map((id) => paintImpact(id, `${counts[id]} ${id}`)).join(dim(' · '));
    const totals = `${summary || color(32, 'clean')}${results.incomplete.length ? dim(` · ${totalNodes(results.incomplete)} to review`) : ''}`;
    console.log(level === 'quiet' ? totals : `\n${totals}\n`);
  }

  const failed = (failOn === 'violations' && results.violations.length > 0)
    || (failOn === 'incomplete' && (results.violations.length > 0 || results.incomplete.length > 0));
  // Not process.exit(): a piped stdout is asynchronous on macOS, and exiting
  // right after a large --json print truncated it mid-document. The browser
  // is closed, so the loop drains and the process ends on its own.
  process.exitCode = failed ? 1 : 0;
  }
}
