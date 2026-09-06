// Shared by the pour command (pour.mjs) and the agent server (mcp.mjs): how
// the engine and the filters are found in either home, how a browser is
// launched, how a page is loaded, audited, screenshotted and walked for
// its focus order, and how results are cut down to what a context window
// can hold. Dual-home like pour.mjs: this file ships verbatim in the
// pour-cli package next to the prebuilt engine.iife.js and filters.iife.js,
// and in the monorepo bundles both fresh from src/ on every run.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

export const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];

/** The filters bundle's entry: the applier behind --filter, the lens kit
 *  the focus-order tool walks, and the engine's own selector and
 *  accessible-name helpers so a tab stop is named the way the audit names
 *  it. sync-cli.js prebuilds this same entry for the package. */
export const FILTERS_ENTRY = "export { createFilterApplier } from './apply.js';\n"
  + "export { createLensKit } from './lens-kit.js';\n"
  + "export { CSS_FILTERS, SENSORY_FILTERS, MODE_LABELS } from './catalog.js';\n"
  + "export { cssPath } from '../engine/lib/dom.js';\n"
  + "export { accessibleName } from '../engine/lib/accessible-name.js';";

const srcDir = (scriptDir, ...parts) => path.resolve(scriptDir, '..', '..', 'src', ...parts);
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** The engine as one script: prebuilt in the package, fresh esbuild in the
 *  monorepo (so the CLI always audits with the engine as it is on disk). */
export async function loadEngineSource(scriptDir) {
  const prebuilt = path.join(scriptDir, 'engine.iife.js');
  if (existsSync(prebuilt)) return readFileSync(prebuilt, 'utf8');
  const esbuild = await import('esbuild');
  return esbuild.buildSync({
    entryPoints: [srcDir(scriptDir, 'engine', 'index.js')],
    bundle: true,
    format: 'iife',
    globalName: 'PourEngine',
    minify: true,
    write: false,
  }).outputFiles[0].text;
}

/** The filters and lenses as one script, same two homes. */
export async function loadFiltersSource(scriptDir) {
  const prebuilt = path.join(scriptDir, 'filters.iife.js');
  if (existsSync(prebuilt)) return readFileSync(prebuilt, 'utf8');
  const esbuild = await import('esbuild');
  return esbuild.buildSync({
    stdin: { contents: FILTERS_ENTRY, resolveDir: srcDir(scriptDir, 'filters'), loader: 'js' },
    bundle: true,
    format: 'iife',
    globalName: 'PourFilters',
    minify: true,
    write: false,
    loader: { '.css': 'text' },
  }).outputFiles[0].text;
}

/** Every simulation by name and label, read from the bundle in Node. */
export function listFilters(filtersSource) {
  (0, eval)(filtersSource);
  const { CSS_FILTERS, SENSORY_FILTERS, MODE_LABELS } = globalThis.PourFilters;
  const label = (name) => MODE_LABELS[name] ?? SENSORY_FILTERS[name]?.label ?? '';
  return {
    vision: Object.keys(CSS_FILTERS).filter((n) => n !== 'none').map((name) => ({ name, label: label(name) })),
    sensory: Object.keys(SENSORY_FILTERS).filter((n) => n !== 'none').map((name) => ({ name, label: label(name) })),
  };
}

/** A filter by name, case-insensitively; null when there is no such filter. */
export function resolveFilter(filters, wanted) {
  const norm = String(wanted).toLowerCase();
  const vision = filters.vision.find((f) => f.name.toLowerCase() === norm);
  if (vision) return { name: vision.name, isSensory: false };
  const sensory = filters.sensory.find((f) => f.name.toLowerCase() === norm);
  return sensory ? { name: sensory.name, isSensory: true } : null;
}

/** A URL as typed: a scheme-less address gets https first, like an address
 *  bar (openPage falls back to http on a TLS failure). Throws on nonsense. */
export function normaliseUrl(input) {
  let url = String(input ?? '').trim();
  const schemeless = !/^[a-z][a-z0-9+.-]*:/i.test(url);
  if (schemeless) url = `https://${url}`;
  try { new URL(url); } catch { throw new Error(`not a valid URL: ${input}`); }
  return { url, schemeless };
}

/** "1440x900" (or a bare width, which implies x900) as numbers. */
export function parseViewport(input, fallback = '1440x900') {
  const match = /^(\d{3,5})(?:\s*[x×]\s*(\d{3,5}))?$/i.exec(String(input ?? fallback).trim());
  if (!match) throw new Error(`viewport expects WxH (e.g. 1440x900), got "${input}"`);
  return { width: Number(match[1]), height: Number(match[2] ?? 900) };
}

// Browser: full puppeteer where present (monorepo devDep, brings its own
// Chromium); otherwise puppeteer-core driving an installed Chrome.
export async function loadPuppeteer() {
  try { return (await import('puppeteer')).default; } catch { /* not the monorepo */ }
  try { return (await import('puppeteer-core')).default; } catch { /* nor the package */ }
  throw new Error('neither puppeteer nor puppeteer-core is installed');
}

export async function launchBrowser(puppeteer, { headless = true, insecure = false, executablePath } = {}) {
  const opts = {
    headless,
    // The CLI does its own https→http fallback for scheme-less URLs;
    // Chrome's silent http→https upgrade would fight it (and surfaces a
    // failed upgrade as an opaque ERR_BLOCKED_BY_CLIENT).
    args: ['--disable-features=HttpsUpgrades,HttpsFirstBalancedModeAutoEnable'],
  };
  if (insecure) opts.acceptInsecureCerts = true;
  const explicit = executablePath ?? process.env.PUPPETEER_EXECUTABLE_PATH;
  if (explicit) return puppeteer.launch({ ...opts, executablePath: String(explicit) });
  // Plain launch works when puppeteer manages its own browser; with
  // puppeteer-core it throws immediately, and the channels find the
  // system-installed Chrome (then Edge, which is also Chromium).
  try { return await puppeteer.launch(opts); } catch { /* no managed browser */ }
  for (const channel of ['chrome', 'chrome-beta', 'msedge']) {
    try { return await puppeteer.launch({ ...opts, channel }); } catch { /* not installed */ }
  }
  throw new Error('no Chrome found — install Google Chrome, or point --browser (or PUPPETEER_EXECUTABLE_PATH) at a Chrome/Chromium binary');
}

/**
 * A new page with the URL loaded: https first for a scheme-less address,
 * retried over http when the TLS handshake fails (shared hosts often serve
 * a real site on 80 behind a wrong-name cert on 443), then the settle
 * delay. Resolves to the page and the URL that actually loaded; throws
 * with a one-line reason otherwise (the page is closed first).
 */
export async function openPage(browser, { url, viewport, timeoutMs = 30000, settleMs = 0, schemeless = false, insecure = false, onNote } = {}) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  if (insecure) {
    // Per page, so one browser serves trusting and untrusting calls alike.
    const session = await page.createCDPSession();
    await session.send('Security.setIgnoreCertificateErrors', { ignore: true });
  }
  const goto = () => page.goto(url, { waitUntil: 'networkidle2', timeout: timeoutMs });
  try {
    await goto();
  } catch (error) {
    const message = error.message.split('\n')[0];
    const tlsFailure = /ERR_CERT|ERR_SSL|SSL_PROTOCOL/i.test(message);
    if (!(tlsFailure && schemeless && url.startsWith('https://'))) {
      await page.close().catch(() => {});
      throw new Error(`could not load ${url}: ${message}${tlsFailure ? '\n(--insecure ignores certificate errors, if you trust the site)' : ''}`);
    }
    url = url.replace(/^https:/, 'http:');
    onNote?.(`https failed (${message.split(' at ')[0]}) — retrying over ${url}…`);
    try {
      await goto();
    } catch (retryError) {
      await page.close().catch(() => {});
      throw new Error(`could not load ${url}: ${retryError.message.split('\n')[0]}`);
    }
  }
  if (settleMs > 0) await sleep(settleMs);
  return { page, url };
}

/** A bot-verification interstitial (Cloudflare's "Just a moment…" and kin)
 *  is not the site: auditing it would report the challenge page's markup as
 *  the site's accessibility, in a confident 0.0s audit. */
export const isChallenge = (page) => page.evaluate(() =>
  /just a moment|attention required|performing security verification/i.test(document.title || '')
  || !!document.querySelector('script[src*="challenges.cloudflare.com"], #challenge-running, #cf-challenge-running'),
).catch(() => false); // evaluate can race the post-challenge navigation

/** Scroll through the page so lazy content loads, then back to the top. */
export async function scrollPage(page) {
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

/** The engine, injected and run against the live DOM. onProgress, when
 *  given, is called with (done, total, rule) at most every 100 ms: each
 *  call is a CDP message riding the same connection as the audit, and
 *  unthrottled progress measurably skews it. */
export async function runAudit(page, engineSource, { tags = WCAG_TAGS, exclude, onProgress } = {}) {
  if (onProgress) await page.exposeFunction('__pourProgress', onProgress);
  return page.evaluate(async (source, options, report) => {
    // eslint-disable-next-line no-eval
    (0, eval)(source);
    let lastPost = 0;
    const progress = (p) => {
      if (!report || !p.total) return;
      const now = performance.now();
      if (p.done !== p.total && now - lastPost < 100) return;
      lastPost = now;
      window.__pourProgress(Math.floor(p.done), p.total, p.rule ?? '');
    };
    return await window.PourEngine.run(document, options, progress);
  }, engineSource, { tags, ...(exclude ? { exclude } : {}) }, Boolean(onProgress));
}

/** A vision or sensory simulation applied to the page, settled. */
export async function applyFilter(page, filtersSource, name, isSensory) {
  await page.evaluate((source, filter, sensory) => {
    (0, eval)(source);
    const applier = window.PourFilters.createFilterApplier(document);
    if (sensory) applier.applySensory(filter);
    else applier.applyVision(filter);
  }, filtersSource, name, isSensory);
  // Overlay positions and animated simulations settle over a few frames.
  await sleep(450);
}

/** The sequential focus order as the Focus Order lens collects it: every
 *  keyboard-reachable control in the order Tab visits it (positive
 *  tabindex first), plus the native controls a tabindex of -1 has taken
 *  out of reach. Each stop is named by the engine's accessible-name
 *  computation and located by its CSS path. */
export async function collectFocusOrder(page, filtersSource) {
  return page.evaluate((source) => {
    (0, eval)(source);
    const { createLensKit, cssPath, accessibleName } = window.PourFilters;
    const { stops, unreachable } = createLensKit(document).collectFocusStops();
    const describe = (el) => {
      const role = el.getAttribute('role');
      let name = '';
      try { name = accessibleName(el) || ''; } catch { name = ''; }
      return { tag: el.tagName.toLowerCase(), ...(role ? { role } : {}), name, target: cssPath(el) };
    };
    return {
      stops: stops.map((stop, i) => ({ n: i + 1, ...describe(stop.el), ...(stop.idx > 0 ? { tabindex: stop.idx } : {}) })),
      unreachable: unreachable.map(({ el }) => describe(el)),
    };
  }, filtersSource);
}

// wcag143 → 1.4.3, for the success-criteria note on each rule.
export const toSc = (tag) => {
  const m = /^wcag(\d{3,4})$/.exec(tag);
  return m ? `${m[1][0]}.${m[1][1]}.${m[1].slice(2)}` : null;
};

export const IMPACT_ORDER = ['critical', 'serious', 'moderate', 'minor'];
const impactRank = (id) => { const i = IMPACT_ORDER.indexOf(id); return i === -1 ? 9 : i; };

/** Failing rules, worst first, then by how many elements. */
export const sortViolations = (violations) => [...violations].sort((a, b) =>
  impactRank(a.impact) - impactRank(b.impact) || b.nodes.length - a.nodes.length);

/**
 * The engine's results cut to a size a context window can hold: totals,
 * then each failing rule with its criteria and up to maxNodes elements
 * (0 shows all), then the rules the engine would not judge without a
 * human. detail "summary" keeps the totals only; "rules" drops elements.
 */
export function compactResults(results, { maxNodes = 5, detail = 'elements', viewport } = {}) {
  const node = (n) => {
    const [message, ...fix] = String(n.failureSummary ?? '').split('\nFix: ');
    return { target: n.target[0], html: n.html, message, ...(fix.length ? { fix: fix.join('\nFix: ') } : {}) };
  };
  const rule = (r) => ({
    rule: r.id,
    impact: r.impact,
    wcag: [...new Set(r.tags.map(toSc).filter(Boolean))],
    help: r.help,
    helpUrl: r.helpUrl,
    elements: r.nodes.length,
    ...(detail === 'elements' ? { shown: (maxNodes === 0 ? r.nodes : r.nodes.slice(0, maxNodes)).map(node) } : {}),
  });
  const counts = Object.fromEntries(IMPACT_ORDER.map((id) => [id, 0]));
  for (const r of results.violations) counts[r.impact] = (counts[r.impact] ?? 0) + r.nodes.length;
  const review = results.incomplete.reduce((n, r) => n + r.nodes.length, 0);
  const out = {
    url: results.url,
    engine: results.testEngine?.version,
    ...(viewport ? { viewport: `${viewport.width}x${viewport.height}` } : {}),
    durationMs: results.durationMs,
    totals: {
      ...counts,
      review,
      rulesFailing: results.violations.length,
      rulesNeedingReview: results.incomplete.length,
      rulesPassing: results.passes.length,
      criteriaNeedingAHuman: results.manualReview?.length ?? 0,
    },
  };
  if (detail !== 'summary') {
    out.violations = sortViolations(results.violations).map(rule);
    out.needsReview = results.incomplete.map(rule);
  }
  return out;
}
