// Signed-in audits. Three ways in, all of them things the page's own
// scripts never see happening:
//
//   --login           a visible browser opens, the person signs in, presses
//                     Enter, and the browser's cookies and the localStorage
//                     of the pages they are on go into every page of the run
//                     before it navigates (and again after the report runner
//                     replaces a wedged browser). The session lives in the
//                     process and dies with it: nothing is written to disk
//                     (David, 2026-09-14: a saved session is a live login
//                     in a project folder, one commit away from a leak).
//   request auth      --basic user:pass for HTTP authentication (staging
//                     sites), --header "Name: value" and --cookie name=value
//                     for token sessions. Set per page before it loads.
//
// Everything stays on the site being audited. The sign-in window may pass
// through a sign-in provider, and a page embeds fonts, scripts and images
// from other hosts: only cookies and storage belonging to the site are
// kept from the window, and a header or HTTP credentials go only on
// requests to the site, never to a third-party host on the page, not even
// one that answers with its own authentication challenge.
//
// Sessions expire, so a page that lands on a sign-in form instead of the
// address asked for is reported as exactly that (looksLikeSignIn), never
// audited as if it were the site.
//
// Shared by pour.mjs and the report runner (scripts/report/run.mjs); mcp.mjs
// uses the sign-in check. Dual-home like lib.mjs: sync:cli copies it into
// the package.
import process from 'node:process';
import readline from 'node:readline';

// The site a cookie or a credential belongs to: the registrable domain
// (example.com, example.co.uk; the same reading as the report runner's),
// an IP address or a bare name as itself.
const SECOND_LEVEL = new Set(['co', 'com', 'net', 'org', 'gov', 'edu', 'ac', 'or', 'ne', 'go']);
export function siteOf(hostname) {
  const host = String(hostname).toLowerCase().replace(/^\.+/, '').replace(/^\[|\]$/g, '');
  if (/^[\d.]+$/.test(host) || host.includes(':')) return host;
  const labels = host.replace(/^www\./, '').split('.');
  if (labels.length <= 2) return labels.join('.');
  const [tld, sld] = [labels.at(-1), labels.at(-2)];
  return (tld.length === 2 && SECOND_LEVEL.has(sld)) ? labels.slice(-3).join('.') : labels.slice(-2).join('.');
}
const urlOnSite = (href, site) => { try { return siteOf(new URL(href).hostname) === site; } catch { return false; } };

/** The session for one site from the sign-in window: the cookies that
 *  belong to the site (a sign-in provider's are left behind) and the
 *  localStorage of the site's origins that have a page open. */
export async function captureAuthState(browser, url) {
  const site = siteOf(new URL(url).hostname);
  const pages = await browser.pages();
  const first = pages[0] ?? await browser.newPage();
  const cdp = await first.createCDPSession();
  const { cookies: all } = await cdp.send('Network.getAllCookies');
  await cdp.detach().catch(() => {});
  const cookies = all.filter((c) => siteOf(c.domain) === site);
  const origins = {};
  for (const page of pages) {
    let origin;
    try { origin = new URL(page.url()).origin; } catch { continue; }
    if (!/^https?:/.test(origin) || !urlOnSite(origin, site)) continue;
    const items = await page.evaluate(() => {
      const out = {};
      try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); out[k] = localStorage.getItem(k); } } catch { /* storage refused */ }
      return out;
    }).catch(() => null);
    if (items && Object.keys(items).length) origins[origin] = { ...(origins[origin] ?? {}), ...items };
  }
  return { site, cookies, origins };
}

// Network.getAllCookies returns more fields than Network.setCookies accepts
// (size, session, partition keys in a shape that changed between Chrome
// versions); only what can be set travels back.
const settable = (c) => {
  const out = { name: c.name, value: c.value, domain: c.domain, path: c.path ?? '/', secure: !!c.secure, httpOnly: !!c.httpOnly };
  if (c.sameSite) out.sameSite = c.sameSite;
  if (typeof c.expires === 'number' && c.expires > 0) out.expires = c.expires;
  if (c.priority) out.priority = c.priority;
  if (c.sourceScheme) out.sourceScheme = c.sourceScheme;
  if (typeof c.sourcePort === 'number') out.sourcePort = c.sourcePort;
  return out;
};

/** Put a saved session on a page before it navigates: cookies into the
 *  page's browser context, localStorage restored on each origin the state
 *  names, ahead of the page's own scripts. */
export async function applyAuthState(page, state) {
  if (state.cookies?.length) {
    const cdp = await page.createCDPSession();
    await cdp.send('Network.setCookies', { cookies: state.cookies.map(settable) });
    await cdp.detach().catch(() => {});
  }
  if (state.origins && Object.keys(state.origins).length) {
    await page.evaluateOnNewDocument((origins) => {
      const items = origins[location.origin];
      if (!items) return;
      try { for (const [k, v] of Object.entries(items)) if (localStorage.getItem(k) === null) localStorage.setItem(k, v); } catch { /* storage refused */ }
    }, state.origins);
  }
}

/** `--header "Name: value"` (repeatable) to an object. */
export function parseHeaders(values) {
  const headers = {};
  for (const raw of [].concat(values ?? []).filter((v) => typeof v === 'string')) {
    const at = raw.indexOf(':');
    if (at < 1) throw new Error(`--header expects "Name: value", got "${raw}"`);
    headers[raw.slice(0, at).trim()] = raw.slice(at + 1).trim();
  }
  return headers;
}

/** `--cookie name=value` (repeatable) to a list. */
export function parseCookies(values) {
  return [].concat(values ?? []).filter((v) => typeof v === 'string').map((raw) => {
    const at = raw.indexOf('=');
    if (at < 1) throw new Error(`--cookie expects name=value, got "${raw}"`);
    return { name: raw.slice(0, at).trim(), value: raw.slice(at + 1) };
  });
}

/** `--basic user:pass`. */
export function parseBasic(value) {
  if (typeof value !== 'string' || !value.includes(':')) throw new Error('--basic expects user:password');
  const at = value.indexOf(':');
  return { username: value.slice(0, at), password: value.slice(at + 1) };
}

/** Request-level auth for one page, set before it loads. Cookies from the
 *  flag are set for the address being audited. Headers and HTTP credentials
 *  are added at the network layer, request by request, and only to
 *  requests for the site: a page's third-party fonts, scripts, images and
 *  frames get neither, and a third-party host's own authentication
 *  challenge is declined rather than answered with the site's password. */
export async function applyRequestAuth(page, { basic, headers, cookies, url } = {}) {
  if (cookies?.length && url) await page.setCookie(...cookies.map((c) => ({ ...c, url })));
  const extra = headers && Object.keys(headers).length ? headers : null;
  if (!basic && !extra) return;
  const site = siteOf(new URL(url).hostname);
  const cdp = await page.createCDPSession();
  const answered = new Set();
  cdp.on('Fetch.requestPaused', ({ requestId, request }) => {
    const params = { requestId };
    if (extra && urlOnSite(request.url, site)) params.headers = Object.entries({ ...request.headers, ...extra }).map(([name, value]) => ({ name, value }));
    cdp.send('Fetch.continueRequest', params).catch(() => {});
  });
  cdp.on('Fetch.authRequired', ({ requestId, request, authChallenge }) => {
    // One answer per request: credentials the server refuses are not
    // offered again, and a proxy's challenge is not the site's.
    const ours = basic && authChallenge?.source !== 'Proxy' && urlOnSite(request.url, site) && !answered.has(requestId);
    if (ours) answered.add(requestId);
    const authChallengeResponse = ours ? { response: 'ProvideCredentials', username: basic.username, password: basic.password } : { response: 'CancelAuth' };
    cdp.send('Fetch.continueWithAuth', { requestId, authChallengeResponse }).catch(() => {});
  });
  await cdp.send('Fetch.enable', { patterns: [{ urlPattern: '*', requestStage: 'Request' }], handleAuthRequests: true });
}

/** The page arrived somewhere other than the address asked for, and that
 *  somewhere is a sign-in form: a password field, or a sign-in address or
 *  title. Auditing the address's own sign-in page on purpose is not caught
 *  (the page did not move), only a bounce away from the target. */
export const looksLikeSignIn = (page, target) => page.evaluate((wanted) => {
  let here; let want;
  try { here = new URL(location.href); want = new URL(wanted); } catch { return false; }
  const strip = (p) => p.replace(/\/+$/, '');
  const moved = here.origin !== want.origin || strip(here.pathname) !== strip(want.pathname);
  if (!moved) return false;
  const address = /(^|\/)(log-?in|sign-?in|signin|auth|sso|oauth|session\/new|account\/login|users\/sign_in|wp-login\.php)(\/|$|\?|\.)/i.test(here.pathname + here.search);
  const title = /\b(log ?in|sign ?in)\b/i.test(document.title || '');
  const password = !!document.querySelector('input[type="password"]');
  return password || address || title;
}, target).catch(() => false);

/** The visible browser a person signs in with. Launched the way audits
 *  launch, Chrome announces the automation (navigator.webdriver, the
 *  "controlled by automated test software" bar) and sign-in providers
 *  refuse it: Google answers "This browser or app may not be secure". So
 *  the automation flag is left off, navigator.webdriver is not raised for
 *  the DevTools connection either (Chrome sets it for any remote debugging
 *  port since 2025, --enable-automation or not), and the Chrome the person
 *  has installed is preferred over the testing build the audits use,
 *  unless --browser names one. The audit browser itself is unchanged. */
export async function launchSignInBrowser(puppeteer, { executablePath, insecure = false, args = [] } = {}) {
  const opts = {
    headless: false,
    ignoreDefaultArgs: ['--enable-automation'],
    args: ['--disable-blink-features=AutomationControlled', '--disable-features=HttpsUpgrades,HttpsFirstBalancedModeAutoEnable', ...args],
  };
  if (insecure) opts.acceptInsecureCerts = true;
  if (executablePath) return puppeteer.launch({ ...opts, executablePath: String(executablePath) });
  for (const channel of ['chrome', 'chrome-beta', 'msedge']) {
    try { return await puppeteer.launch({ ...opts, channel }); } catch { /* not installed */ }
  }
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return puppeteer.launch({ ...opts, executablePath: process.env.PUPPETEER_EXECUTABLE_PATH });
  try { return await puppeteer.launch(opts); } catch { /* no managed browser */ }
  throw new Error('no Chrome found to sign in with: install Google Chrome, or point --browser at a Chrome/Chromium binary');
}

/** Sign in by hand: a visible browser at the URL, the person signs in and
 *  presses Enter in the terminal (or the browser disconnects, which is an
 *  error: the session can only be read while it is open), then the session
 *  is captured, in memory, and the browser closed. `launch` makes the
 *  headful browser; `say` prints instructions. */
export async function signIn({ launch, url, viewport, say = (t) => console.error(t) }) {
  const browser = await launch();
  try {
    const page = (await browser.pages())[0] ?? await browser.newPage();
    if (viewport) await page.setViewport(viewport);
    await page.goto(url, { waitUntil: 'load', timeout: 60000 }).catch(() => { /* the person can still sign in on whatever loaded */ });
    say(`Sign in to ${new URL(url).hostname} in the browser window, then press Enter here once you are back on the site. (Do not close the window: the session is read from it, and kept only for this run.)`);
    const closed = new Promise((_, reject) => browser.once('disconnected', () => reject(new Error('the browser window was closed before the session could be read; sign in and press Enter in the terminal instead of closing it'))));
    const entered = process.stdin.isTTY
      ? new Promise((resolve) => { const rl = readline.createInterface({ input: process.stdin, output: process.stderr }); rl.question('', () => { rl.close(); resolve(); }); })
      : new Promise((resolve) => { say('No terminal to press Enter in: waiting 2 minutes for the sign-in, then reading the session.'); setTimeout(resolve, 120000); });
    await Promise.race([entered, closed]);
    const state = await captureAuthState(browser, url);
    if (!state.cookies.length && !Object.keys(state.origins).length) say(`No session for ${state.site} was found in the window (was it still on the sign-in provider's page?). The run goes on signed out.`);
    return state;
  } finally {
    // The window's profile is a temporary one puppeteer removes on close;
    // what was read from it lives in this process alone.
    await browser.close().catch(() => {});
  }
}
