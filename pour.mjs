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
// Dual-home file: this script is the source of truth in the monorepo
// (scripts/cli/) AND ships verbatim in the published pour-cli package via
// `npm run sync:cli`. The two homes differ in what sits around it:
//   monorepo  — no prebuilt bundle: the engine is built fresh from
//               src/engine with esbuild, and full puppeteer (a devDep)
//               brings its own Chromium.
//   package   — engine.iife.js is prebuilt next to this file at sync time,
//               and puppeteer-core drives the system Chrome (no 170MB
//               browser download on install).
// Both paths are resolved at runtime below; keep changes working in both.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];

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

Usage: pour <url> [options]

Options:
  --json               print the full engine results as JSON
  --viewport WxH       viewport (default 1440x900); a bare width implies x900
  --scroll             scroll through the page before auditing (lazy content)
  --wait <ms>          extra settle delay after load (default 0)
  --timeout <ms>       navigation timeout (default 30000)
  --bp                 include best-practice rules alongside WCAG A+AA
  --exclude <sel>      CSS selector excluded from every rule
  --fail-on <what>     violations (default) | incomplete | none
  --max-nodes <n>      element details shown per rule (default 5, 0 = all)
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

Exit codes: 0 clean, 1 findings (per --fail-on), 2 error`;

if (flags.has('help') || (!positional.length && !argv.length)) {
  console.log(usage);
  process.exit(flags.has('help') ? 0 : 2);
}

if (flags.has('version')) {
  // Published package: its own package.json sits next to this script.
  // Monorepo: the CLI has no version of its own — the engine is the version
  // that matters, and every report header prints it.
  const pkgPath = path.join(scriptDir, 'package.json');
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    console.log(`${pkg.name} ${pkg.version}`);
  } else {
    console.log('pour-cli (monorepo dev build)');
  }
  process.exit(0);
}

const fail = (message) => { console.error(`pour: ${message}`); process.exit(2); };

// `--filter list` (or a bare/unknown --filter, which prints the same list)
// is a listing command and needs no URL.
const filterListing = flags.has('filter')
  && (flags.get('filter') === true || String(flags.get('filter')).toLowerCase() === 'list');

if (!positional.length && !filterListing) fail('a URL is required\n\n' + usage);
if (positional.length > 1) fail(`one URL at a time (got ${positional.length})`);

let url = positional[0];
let schemeless = false;
if (url) {
  // A scheme-less URL gets https first, like a browser address bar — and like
  // the address bar, a TLS failure later falls back to http (shared hosts
  // often serve a real site on 80 behind a wrong-name cert on 443).
  schemeless = !/^[a-z][a-z0-9+.-]*:/i.test(url);
  if (schemeless) url = `https://${url}`;
  try { new URL(url); } catch { fail(`not a valid URL: ${positional[0]}`); }
}

const viewportMatch = /^(\d{3,5})(?:\s*[x×]\s*(\d{3,5}))?$/i.exec(String(flags.get('viewport') ?? '1440x900').trim());
if (!viewportMatch) fail(`--viewport expects WxH (e.g. 1440x900), got "${flags.get('viewport')}"`);
const viewport = { width: Number(viewportMatch[1]), height: Number(viewportMatch[2] ?? 900) };

const failOn = String(flags.get('fail-on') ?? 'violations');
if (!['violations', 'incomplete', 'none'].includes(failOn)) fail(`--fail-on expects violations | incomplete | none, got "${failOn}"`);

const settleMs = Number(flags.get('wait') ?? 0);
const timeoutMs = Number(flags.get('timeout') ?? 30000);
const maxNodes = Number(flags.get('max-nodes') ?? 5);
if ([settleMs, timeoutMs, maxNodes].some(Number.isNaN)) fail('--wait, --timeout and --max-nodes expect numbers');
const level = String(flags.get('level') ?? 'max');
if (!['quiet', 'rules', 'max'].includes(level)) fail(`--level expects quiet | rules | max, got "${level}"`);
const tags = flags.has('bp') ? [...WCAG_TAGS, 'best-practice'] : WCAG_TAGS;
const asJson = flags.has('json');

// Screenshot mode: filters and audits are exclusive MODES, mirroring the
// extension — some simulations mutate page styles or text, so auditing a
// filtered page would audit the simulation, not the site.
const shotMode = flags.has('filter') || flags.has('shot');

// ------------------------------------------------------------------- output
const tty = process.stdout.isTTY && !asJson;
const color = (code, text) => (tty ? `\u001b[${code}m${text}\u001b[0m` : text);
const bold = (t) => color(1, t);
const dim = (t) => color(2, t);
// The severity palette is the extension's own (--sev-*-vivid in
// src/ui/styles/tokens.css): heat on the top two severities only, neutrals
// below, review in blue. Truecolor terminals get the exact values; others
// the nearest ANSI. Moderate is the terminal's default foreground, which is
// what the extension's moderate resolves to in each of its themes.
const truecolor = /truecolor|24bit/i.test(process.env.COLORTERM ?? '');
const rgb = (r, g, b, fallback) => (truecolor ? `38;2;${r};${g};${b}` : fallback);
const IMPACTS = [
  { id: 'critical', paint: (t) => color(`1;${rgb(255, 82, 51, 91)}`, t) },
  { id: 'serious', paint: (t) => color(rgb(245, 197, 24, 33), t) },
  { id: 'moderate', paint: (t) => t },
  { id: 'minor', paint: (t) => color(rgb(138, 143, 152, 90), t) },
];
const reviewMark = (t) => color(rgb(96, 165, 250, 94), t);
const impactRank = new Map(IMPACTS.map((impact, i) => [impact.id, i]));
const paintImpact = (id, text = id) => (IMPACTS.find((i) => i.id === id)?.paint ?? dim)(text);

// wcag143 → 1.4.3, for the success-criteria note on each rule line.
const toSc = (tag) => {
  const m = /^wcag(\d{3,4})$/.exec(tag);
  return m ? `${m[1][0]}.${m[1][1]}.${m[1].slice(2)}` : null;
};

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
  const prebuilt = path.join(scriptDir, 'engine.iife.js');
  if (existsSync(prebuilt)) {
    engineSource = readFileSync(prebuilt, 'utf8');
  } else {
    progress('bundling engine…');
    const esbuild = await import('esbuild');
    engineSource = esbuild.buildSync({
      entryPoints: [path.resolve(scriptDir, '..', '..', 'src', 'engine', 'index.js')],
      bundle: true,
      format: 'iife',
      globalName: 'PourEngine',
      minify: true,
      write: false,
    }).outputFiles[0].text;
  }
}

// Filters ride the same dual-home logic: prebuilt filters.iife.js in the
// package, a fresh bundle over src/filters in the monorepo. One bundle
// serves twice — evaluated here in Node for name validation and --filter
// list, injected into the page to actually apply the simulation.
let filtersSource = null;
let filterName = null;
let filterIsSensory = false;
if (flags.has('filter')) {
  const prebuiltFilters = path.join(scriptDir, 'filters.iife.js');
  if (existsSync(prebuiltFilters)) {
    filtersSource = readFileSync(prebuiltFilters, 'utf8');
  } else {
    const esbuild = await import('esbuild');
    filtersSource = esbuild.buildSync({
      stdin: {
        contents: "export { createFilterApplier } from './apply.js';\nexport { CSS_FILTERS, SENSORY_FILTERS, MODE_LABELS } from './catalog.js';",
        resolveDir: path.resolve(scriptDir, '..', '..', 'src', 'filters'),
        loader: 'js',
      },
      bundle: true,
      format: 'iife',
      globalName: 'PourFilters',
      minify: true,
      write: false,
      loader: { '.css': 'text' },
    }).outputFiles[0].text;
  }
  (0, eval)(filtersSource);
  const { CSS_FILTERS, SENSORY_FILTERS, MODE_LABELS } = globalThis.PourFilters;
  const visionNames = Object.keys(CSS_FILTERS).filter((n) => n !== 'none');
  const sensoryNames = Object.keys(SENSORY_FILTERS).filter((n) => n !== 'none');
  const wanted = flags.get('filter');
  const norm = String(wanted).toLowerCase();
  filterName = visionNames.find((n) => n.toLowerCase() === norm)
    ?? sensoryNames.find((n) => n.toLowerCase() === norm)
    ?? null;
  filterIsSensory = filterName !== null && !visionNames.includes(filterName);
  if (!filterName) {
    const listing = wanted === true || norm === 'list';
    if (!listing) console.error(`pour: unknown filter "${wanted}"\n`);
    console.log('vision filters:');
    for (const n of visionNames) console.log(`  ${n.padEnd(26)} ${dim(MODE_LABELS[n] ?? '')}`);
    console.log('\nsensory filters:');
    for (const n of sensoryNames) console.log(`  ${n.padEnd(26)} ${dim(MODE_LABELS[n] ?? SENSORY_FILTERS[n]?.label ?? '')}`);
    process.exit(listing ? 0 : 2);
  }
}

// Browser: full puppeteer where present (monorepo devDep, brings its own
// Chromium); otherwise puppeteer-core driving an installed Chrome.
let puppeteer;
try { puppeteer = (await import('puppeteer')).default; }
catch {
  try { puppeteer = (await import('puppeteer-core')).default; }
  catch { fail('neither puppeteer nor puppeteer-core is installed'); }
}

async function launchBrowser() {
  const opts = {
    headless: !flags.has('headful'),
    // The CLI does its own https→http fallback for scheme-less URLs;
    // Chrome's silent http→https upgrade would fight it (and surfaces a
    // failed upgrade as an opaque ERR_BLOCKED_BY_CLIENT).
    args: ['--disable-features=HttpsUpgrades,HttpsFirstBalancedModeAutoEnable'],
  };
  if (flags.has('insecure')) opts.acceptInsecureCerts = true;
  const explicit = flags.get('browser') ?? process.env.PUPPETEER_EXECUTABLE_PATH;
  if (explicit) return puppeteer.launch({ ...opts, executablePath: String(explicit) });
  // Plain launch works when puppeteer manages its own browser; with
  // puppeteer-core it throws immediately, and the channels find the
  // system-installed Chrome (then Edge, which is also Chromium).
  try { return await puppeteer.launch(opts); } catch {}
  for (const channel of ['chrome', 'chrome-beta', 'msedge']) {
    try { return await puppeteer.launch({ ...opts, channel }); } catch {}
  }
  return fail('no Chrome found — install Google Chrome, or point --browser (or PUPPETEER_EXECUTABLE_PATH) at a Chrome/Chromium binary');
}

const browser = await launchBrowser();
let results;
let shotPath;
try {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  progress(`loading ${url}…`);
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: timeoutMs });
  } catch (error) {
    const message = error.message.split('\n')[0];
    const tlsFailure = /ERR_CERT|ERR_SSL|SSL_PROTOCOL/i.test(message);
    if (tlsFailure && schemeless && url.startsWith('https://')) {
      url = url.replace(/^https:/, 'http:');
      progress(`https failed (${message.split(' at ')[0]}) — retrying over ${url}…`);
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: timeoutMs });
      } catch (retryError) {
        progressDone();
        fail(`could not load ${url}: ${retryError.message.split('\n')[0]}`);
      }
    } else {
      progressDone();
      fail(`could not load ${url}: ${message}${tlsFailure ? '\n(--insecure ignores certificate errors, if you trust the site)' : ''}`);
    }
  }
  if (settleMs > 0) await new Promise((resolve) => setTimeout(resolve, settleMs));

  // A bot-verification interstitial (Cloudflare's "Just a moment…" and kin)
  // is not the site: auditing it would report the challenge page's markup as
  // the site's accessibility, in a confident 0.0s audit. Refuse rather than
  // mislead — except in --headful, where the human completes the check in
  // the visible window and the audit continues against the real page.
  const onChallenge = () => page.evaluate(() =>
    /just a moment|attention required|performing security verification/i.test(document.title || '')
    || !!document.querySelector('script[src*="challenges.cloudflare.com"], #challenge-running, #cf-challenge-running'),
  ).catch(() => false); // evaluate can race the post-challenge navigation
  if (await onChallenge()) {
    if (!flags.has('headful')) {
      progressDone();
      fail(`${url} is showing a bot-verification challenge, not the site — an audit here would measure the challenge page.\nRe-run with --headful and complete the verification in the browser window; pour waits and audits the real page.`);
    }
    progress('bot challenge detected — complete the verification in the browser window…');
    const deadline = Date.now() + 120000;
    while (await onChallenge()) {
      if (Date.now() > deadline) {
        progressDone();
        fail('the verification was not completed within 2 minutes');
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    // The cleared challenge navigates to the real page; let it arrive.
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  if (flags.has('scroll')) {
    progress('scrolling for lazy content…');
    await page.evaluate(async () => {
      const step = window.innerHeight;
      const limit = 60; // ~60 viewports is plenty; endless feeds never finish
      for (let i = 0; i < limit; i++) {
        const bottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        if (bottom) break;
        window.scrollBy(0, step);
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 300));
    });
  }

  if (shotMode) {
    if (filterName) {
      progress(`applying ${filterName}…`);
      await page.evaluate((source, name, isSensory) => {
        (0, eval)(source);
        const applier = window.PourFilters.createFilterApplier(document);
        if (isSensory) applier.applySensory(name);
        else applier.applyVision(name);
      }, filtersSource, filterName, filterIsSensory);
      // Overlay positions and animated simulations settle over a few frames.
      await new Promise((resolve) => setTimeout(resolve, 450));
    }
    const explicitShot = flags.get('shot');
    shotPath = typeof explicitShot === 'string'
      ? explicitShot
      : `pour-${new URL(url).hostname}${filterName ? `-${filterName}` : ''}.png`;
    progress('capturing…');
    await page.screenshot({ path: shotPath, fullPage: flags.has('full') });
  } else {
    await page.exposeFunction('__pourProgress', (done, total, rule) => {
      progress(`auditing… ${done}/${total} ${dim(rule)}`);
    });
    progress('auditing…');
    results = await page.evaluate(async (source, options) => {
      // eslint-disable-next-line no-eval
      (0, eval)(source);
      // Throttled: every exposed-function call is a CDP message riding the
      // same connection as the audit; unthrottled progress measurably skews it.
      let lastPost = 0;
      const onProgress = (p) => {
        if (!p.total) return;
        const now = performance.now();
        if (p.done !== p.total && now - lastPost < 100) return;
        lastPost = now;
        window.__pourProgress(Math.floor(p.done), p.total, p.rule ?? '');
      };
      return await window.PourEngine.run(document, options, onProgress);
    }, engineSource, { tags, ...(flags.get('exclude') ? { exclude: String(flags.get('exclude')) } : {}) });
  }
} finally {
  await browser.close();
}
progressDone();

// ------------------------------------------------------------------- report
if (shotMode) {
  console.log(`${bold('pour')} ${dim('·')} ${url}`);
  console.log(`saved ${bold(shotPath)}${filterName ? ` ${dim(`· ${filterName}`)}` : ''} ${dim(`· ${viewport.width}x${viewport.height}${flags.has('full') ? ' · full page' : ''}`)}`);
  process.exit(0);
}

if (asJson) {
  console.log(JSON.stringify({ ...results, viewport }, null, 2));
} else {
  const totalNodes = (list) => list.reduce((n, r) => n + r.nodes.length, 0);
  const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
  const seconds = (results.durationMs / 1000).toFixed(1);

  // --level quiet keeps only the totals line below, for scripts and quick
  // checks; rules keeps the per-rule lines but drops the element details.
  if (level !== 'quiet') {
    console.log(`\n${bold('pour')} ${dim('·')} ${url}`);
    console.log(dim(`engine ${results.testEngine.version} · ${viewport.width}x${viewport.height} · ${flags.has('bp') ? 'WCAG 2.2 A+AA + best practices' : 'WCAG 2.2 A+AA'} · ${seconds}s`));

    const sorted = [...results.violations].sort((a, b) =>
      (impactRank.get(a.impact) ?? 9) - (impactRank.get(b.impact) ?? 9) || b.nodes.length - a.nodes.length);

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
  const summary = IMPACTS.filter(({ id }) => counts[id]).map(({ id }) => paintImpact(id, `${counts[id]} ${id}`)).join(dim(' · '));
  const totals = `${summary || color(32, 'clean')}${results.incomplete.length ? dim(` · ${totalNodes(results.incomplete)} to review`) : ''}`;
  console.log(level === 'quiet' ? totals : `\n${totals}\n`);
}

const failed = (failOn === 'violations' && results.violations.length > 0)
  || (failOn === 'incomplete' && (results.violations.length > 0 || results.incomplete.length > 0));
process.exit(failed ? 1 : 0);
