/*! pour report runner | MIT | https://pour.dev */

// scripts/report/run.mjs
import fs5 from "node:fs";
import path6 from "node:path";
import readline2 from "node:readline";
import dns from "node:dns/promises";
import { spawn, execFile } from "node:child_process";
import { fileURLToPath as fileURLToPath3 } from "node:url";

// scripts/benchmark/consent.js
var SELECTORS = [
  "#onetrust-accept-btn-handler",
  "button#truste-consent-button",
  "#sp-cc-accept",
  'button[data-testid="accept-all"]',
  "#L2AGLb",
  "#bnp_btn_accept",
  'button[title="Accept all"]',
  // Tealium's explicit-consent prompt (inclusion.hsbc.com): the accept
  // button reads "Accept optional cookies", which the text rule rejects.
  "#consent_prompt_submit"
];
var TEXT = "^(accept( all)?( cookies)?|accept all cookies|i (agree|accept)|agree|allow all( cookies)?|got it|yes, i(\u2019|')m happy)$";
async function acceptConsent(page, how = true) {
  const sels = typeof how === "string" ? [how] : SELECTORS;
  for (let round = 0; round < 2; round += 1) {
    let clicked = null;
    for (const frame of page.frames()) {
      clicked = await frame.evaluate((selectors, reSrc, textAllowed) => {
        const re = new RegExp(reSrc, "i");
        const visible = (el) => el.offsetParent !== null && el.getBoundingClientRect().width > 0;
        for (const sel of selectors) {
          const el = document.querySelector(sel);
          if (el && visible(el)) {
            el.click();
            return `selector ${sel}`;
          }
        }
        if (!textAllowed) return null;
        for (const el of document.querySelectorAll('button, [role="button"]')) {
          const t = (el.textContent || "").trim();
          if (t && t.length <= 40 && re.test(t) && visible(el)) {
            el.click();
            return `button "${t}"`;
          }
        }
        return null;
      }, sels, TEXT, typeof how !== "string").catch(() => null);
      if (clicked) break;
    }
    if (!clicked) return round ? "clicked" : null;
    await new Promise((r) => setTimeout(r, 1500));
    if (round === 0) var first = clicked;
  }
  return first ?? null;
}

// scripts/cli/lib.mjs
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
var srcDir = (scriptDir, ...parts) => path.resolve(scriptDir, "..", "..", "src", ...parts);
async function loadEngineSource(scriptDir) {
  const prebuilt = path.join(scriptDir, "engine.iife.js");
  if (existsSync(prebuilt)) return readFileSync(prebuilt, "utf8");
  const esbuild = await import("esbuild");
  return esbuild.buildSync({
    entryPoints: [srcDir(scriptDir, "engine", "index.js")],
    bundle: true,
    format: "iife",
    globalName: "PourEngine",
    minify: true,
    write: false
  }).outputFiles[0].text;
}
async function loadPuppeteer() {
  try {
    return (await import("puppeteer")).default;
  } catch {
  }
  try {
    return (await import("puppeteer-core")).default;
  } catch {
  }
  throw new Error("neither puppeteer nor puppeteer-core is installed");
}

// src/config/project.config.js
var project_config_default = {
  // Internal slug: safe for file names, package ids, storage keys. No spaces.
  slug: "pour",
  // Public-facing names. pour is named after WCAG's four POUR principles.
  productName: "pour",
  shortName: "pour",
  // The extension and the bookmarklet, spoken of together. They share one
  // UI and one engine, so prose that applies to both should name them both
  // with one term rather than listing them every time. Keep in step with
  // shortName by hand: a literal, because sibling keys cannot reference each
  // other here. Plural, so it takes a plural verb ("pour tools ship...").
  toolsName: "pour tools",
  // Doubles as the extension's store summary and feeds the site's meta
  // description, so it must read well in both places and stay ≤132 chars
  // (the Chrome Web Store summary limit).
  description: "One-click accessibility checker: WCAG 2.2 audits, contrast checks, exact fixes, and vision, sensory and motor filters.",
  author: "David Yarham",
  homepage: "https://pour.dev",
  // Public contact address: site footers, org section, store support fields.
  supportEmail: "info@pour.dev",
  // One version shared across site + extension. Bump only when David says a
  // build is going out (2026-08-06, refined 2026-08-09): extension,
  // bookmarklet or engine work gets its number at the point he decides to
  // upload, so every uploadable build has its own; site-only changes ship
  // with no bump at all.
  version: "1.2.113",
  // the focus-order badges and the lens chips stay inside the page: at the document's edge, or the viewport's for a fixed target, a badge that hung off its element's corner sat half off the screen, the skip link's 1 and the logo's 2 on pour.dev among them, and is now pushed back inside by however much protrudes, in the extension and the bookmarklet alike; the editor extension declares the Liquid and Nunjucks languages itself so a .liquid or .njk file is checked without another extension installed; previously 1.2.112, Focus Order leads the Simulate tab, first in the Structure section beside Landmarks & Headings, in the popup, the side panel and the bookmarklet alike; the same release gives the editor extension Liquid and Nunjucks plus its agent tool, and pour-cli its MCP server; previously 1.2.111, auto run restored to the way it started an audit before 2 September and four asserted failures gone from the engine
  // Our own accessibility engine (src/engine/) — the product's only engine.
  engine: {
    name: "pour engine",
    version: "1.39.0"
    // Minor: four false positives leave and two landmark rules narrow. A presentational role survives on an element that is not really focusable, so a disabled control carrying role="none" is kept out of the accessibility tree and asked for no name; the meta refresh delay is read the way the HTML parser reads it, so a directive the browser discards asserts nothing; a button named by the CSS alternative text syntax is named by it; region and form count as landmarks only once they are named. Previously 1.38.0, whose note follows. Minor: two verdict changes and a probe guard. video-loop-motion passes a looping video whose visible pause button names it, or a container holding it, through aria-controls; bold for the large-scale contrast test starts at weight 600, was 700, held in BOLD_WEIGHT; the text-spacing probe holds the document's height and restores the scroll instantly, so an audit never moves the page. Previously 1.37.1, the cleanup that changed no verdict.
  },
  extension: {
    // Appended to productName for the manifest name, which IS the store
    // listing title on both CWS and AMO — keyworded for store search
    // (2026-08-17). Browser chrome shows short_name ("pour") and the
    // DevTools panel tab uses __PRODUCT_NAME__, so the long name only
    // surfaces where it should: the stores and the extensions manager.
    nameSuffix: " - Accessibility Checker & WCAG Audit",
    // Live Chrome Web Store listing (title updates with the next upload).
    chromeWebStoreUrl: "https://chromewebstore.google.com/detail/cmebappepecpgihmahkfmaahmajglgch",
    // AMO listing (locale-free canonical; AMO redirects to the visitor's).
    // Live since Mozilla approved the listing on 2026-08-10; wired into the
    // [data-store-browser="firefox"] buttons in index.html.
    firefoxAmoUrl: "https://addons.mozilla.org/firefox/addon/pour-devtools/",
    // VS Code Marketplace listing of the editor extension (src/vscode),
    // live since 2026-08-29; the homepage's editor card links it.
    vscodeMarketplaceUrl: "https://marketplace.visualstudio.com/items?itemName=pourdev.pour-html",
    // AMO add-on id (browser_specific_settings.gecko.id) — required for MV3
    // uploads, and storage.sync only works in Firefox with an explicit id.
    geckoId: "devtools@pour.dev",
    // Firefox floor: 140 (current ESR). Everything we use is older —
    // storage.session 115+, Popover API 125+, match_origin_as_fallback 128+ —
    // but the manifest's data_collection_permissions key needs 140.
    geckoStrictMinVersion: "140.0",
    // Builds to produce from the one shared codebase. 'chromium' covers
    // Chrome and Edge (same MV3 build ships to both stores); 'firefox' is
    // the same source with manifest deltas only (see build-extension.js).
    // There is no Safari extension (removed 2026-09-02, David: the iOS
    // shortcut covers Apple platforms for now; the port lives in git
    // history should anyone ask for it).
    targets: ["chromium", "firefox"]
  },
  site: {
    // Output subfolder inside dist/
    outDir: "site"
  },
  benchmark: {
    // The run the site's speed and accuracy figures are read from, by its
    // stamp under reports/benchmark/ (data-<stamp>.json). Every figure in
    // the copy is derived from that file at build time (scripts/lib/facts.js),
    // so quoting a new run is one line here, never a hunt through prose.
    published: "2026-09-02-2326"
  }
};

// src/engine/lib/dom.js
var NEVER_RENDERED = /* @__PURE__ */ new Set(["SCRIPT", "TEMPLATE", "STYLE", "LINK", "META"]);
function collectRoots(context) {
  const roots = [context];
  for (let i = 0; i < roots.length; i++) {
    if (!roots[i].querySelectorAll) continue;
    for (const el of roots[i].querySelectorAll("*")) {
      if (el.shadowRoot) roots.push(el.shadowRoot);
    }
  }
  return roots;
}
var attributesGetter = typeof Element !== "undefined" ? Object.getOwnPropertyDescriptor(Element.prototype, "attributes")?.get : null;
function attributesOf(element) {
  const own = element.attributes;
  if (own && typeof own.length === "number" && typeof own.item === "function") return own;
  return attributesGetter ? attributesGetter.call(element) : [];
}
function isEmbeddedDocument(doc) {
  const win = doc?.defaultView;
  return !!(win && win.top && win !== win.top);
}
function isInert(element) {
  for (let node = element; node; node = node.parentElement ?? node.getRootNode?.()?.host ?? null) {
    if (node.nodeType === 1 && node.hasAttribute("inert")) return true;
  }
  return false;
}

// src/engine/rules/wcag/2.4.2-document-title.js
var PLACEHOLDER = /* @__PURE__ */ new Set([
  "untitled document",
  "untitled page",
  "untitled-1",
  "untitled 1",
  "no title",
  "insert title here",
  "title here",
  "page title",
  "document title",
  "web page",
  "webpage"
]);
var UNDESCRIPTIVE = /* @__PURE__ */ new Set([
  "untitled",
  "document",
  "page",
  "title",
  "default",
  "index",
  "new document",
  "new page",
  "new tab",
  "react app",
  "create react app",
  "vite app",
  "vite + react",
  "vite + vue",
  "vite + svelte",
  "next app",
  "create next app",
  "vue app",
  "nuxt app",
  "svelte app",
  "angular app",
  "my app",
  "my site",
  "my website",
  "site title",
  "your site title",
  "example domain",
  "hello world"
]);
var document_title_default = {
  id: "document-title",
  name: "Page title",
  impact: "serious",
  tags: ["wcag2a", "wcag242"],
  help: "The page must have a title that describes its topic or purpose",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html",
  selector: "html",
  visibleOnly: false,
  evaluate(element) {
    if (isEmbeddedDocument(element.ownerDocument)) return { status: "pass" };
    const title = element.ownerDocument.title.trim();
    if (!title) {
      return {
        status: "fail",
        message: "The page has no title, so users of screen readers and browser tabs cannot tell what it is.",
        fix: "Add <title>Page name \u2014 Site name</title> inside <head>."
      };
    }
    const normalized = title.replace(/\s+/g, " ").toLowerCase();
    if (PLACEHOLDER.has(normalized) || /^(?:untitled|new (?:document|page|tab))[\s-]*\d+$/.test(normalized)) {
      return {
        status: "fail",
        message: `\u201C${title}\u201D is a placeholder left by an editor or template. It gives no topic and no purpose, so a screen reader announces nothing useful when the page loads, and a row of open tabs, bookmarks or history entries becomes impossible to tell apart.`,
        fix: "Put this page's own subject in the title first, then the site name."
      };
    }
    if (UNDESCRIPTIVE.has(normalized)) {
      return {
        status: "incomplete",
        message: `\u201C${title}\u201D is a generic title, and usually a default nobody replaced. Unless the page really is about that, it describes neither topic nor purpose and 2.4.2 is not met. Check whether it was meant to be filled in.`
      };
    }
    return { status: "pass" };
  }
};

// src/engine/rules/wcag/3.1.1-html-lang.js
var LANG_PATTERN = /^([a-zA-Z]{2,3}(-[a-zA-Z0-9]{1,8})*|[xXiI](-[a-zA-Z0-9]{1,8})+)$/;
var html_lang_default = {
  id: "html-lang",
  name: "Page language",
  impact: "serious",
  tags: ["wcag2a", "wcag311"],
  help: "The <html> element must declare a valid language",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html",
  selector: "html",
  visibleOnly: false,
  evaluate(element) {
    const lang = element.getAttribute("lang")?.trim();
    if (!element.hasAttribute("lang")) {
      return {
        status: "fail",
        message: "No lang attribute: screen readers will guess the language and may mispronounce everything.",
        fix: 'Add lang to the html element, e.g. <html lang="en">.'
      };
    }
    if (!lang) {
      return {
        status: "fail",
        message: "The lang attribute is present but empty, so the page declares no language: screen readers will guess it and may mispronounce everything.",
        fix: 'Give lang a BCP 47 value, e.g. <html lang="en">.'
      };
    }
    if (!LANG_PATTERN.test(lang)) {
      return {
        status: "fail",
        message: `lang="${lang}" is not a valid language tag.`,
        fix: 'Use a BCP 47 tag such as lang="en" or lang="en-GB".'
      };
    }
    return { status: "pass" };
  }
};

// src/engine/rules/wcag/3.1.2-valid-lang-parts.js
var LANG_PATTERN2 = /^([a-zA-Z]{2,3}(-[a-zA-Z0-9]{1,8})*|[xXiI](-[a-zA-Z0-9]{1,8})+)$/;
var valid_lang_parts_default = {
  id: "valid-lang-parts",
  name: "Part language tags",
  impact: "serious",
  tags: ["wcag2aa", "wcag312"],
  help: "lang attributes on page parts must be valid",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html",
  selector: "[lang]:not(html)",
  evaluate(element) {
    const lang = element.getAttribute("lang").trim();
    if (lang === "" || LANG_PATTERN2.test(lang)) return { status: "pass" };
    return {
      status: "fail",
      message: `lang="${lang}" is not a valid language tag, so screen readers may switch to the wrong pronunciation.`,
      fix: 'Use a BCP 47 tag such as lang="fr" or lang="de-AT".'
    };
  }
};

// src/engine/rules/wcag/1.1.1-image-alt.js
var FILENAME_ALT = /\.(png|jpe?g|gif|webp|svg|avif|bmp|ico)([?#].*)?$/i;
var GENERIC_ALT = /^(image|img|photo|photograph|picture|graphic|icon|untitled|placeholder|spacer|\d+)$/i;
var image_alt_default = {
  id: "image-alt",
  name: "Image alt text",
  impact: "critical",
  tags: ["wcag2a", "wcag111"],
  help: "Every <img> needs a text alternative",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
  selector: "img",
  evaluate(element, { accessibleName: accessibleName2 }) {
    const role = element.getAttribute("role");
    if (role === "presentation" || role === "none") return { status: "pass" };
    if (element.hasAttribute("alt")) {
      const alt = element.getAttribute("alt");
      if (alt === "") return { status: "pass" };
      if (!alt.trim()) {
        return {
          status: "incomplete",
          message: `alt="${alt}" is only whitespace \u2014 not a description, and not the decorative marker either (that is alt="" with nothing between the quotes). Screen readers skip it today, so check the image is really decorative; if it carries meaning, describe it, and either way use alt="".`
        };
      }
      const trimmed = alt.trim();
      if (FILENAME_ALT.test(trimmed) || GENERIC_ALT.test(trimmed)) {
        return {
          status: "incomplete",
          message: `alt="${trimmed}" looks like a file name or placeholder, not a description \u2014 screen-reader users learn nothing from it. If the image carries meaning, describe it; if not, use alt="".`
        };
      }
      return { status: "pass" };
    }
    if (accessibleName2(element)) return { status: "pass" };
    return {
      status: "fail",
      message: "This image has no alt attribute, so screen readers announce its file name or nothing at all.",
      fix: `Describe the image: <img alt="\u2026" src="${element.getAttribute("src") ?? ""}">, or mark it decorative with alt="".`
    };
  }
};

// src/engine/lib/accessible-name.js
var TEXT_INPUT = /* @__PURE__ */ new Set([
  "text",
  "search",
  "url",
  "tel",
  "email",
  "password",
  "number",
  "date",
  "datetime-local",
  "month",
  "time",
  "week",
  ""
]);
var LABELABLE = /* @__PURE__ */ new Set(["input", "select", "textarea", "button", "meter", "output", "progress"]);
function accessibleName(element) {
  return computeName(element, false);
}
function labelledByName(element) {
  const refs = element.getAttribute?.("aria-labelledby");
  if (!refs) return "";
  const root = element.getRootNode();
  return refs.split(/\s+/).filter(Boolean).map((id) => {
    const target2 = root.getElementById?.(id);
    return target2 ? computeName(target2, true) : "";
  }).join(" ").replace(/\s+/g, " ").trim();
}
function computeName(element, inLabelledBy) {
  if (!inLabelledBy) {
    const fromLabelledBy = labelledByName(element);
    if (fromLabelledBy) return fromLabelledBy;
  }
  const ariaLabel = element.getAttribute("aria-label")?.trim();
  if (ariaLabel) return ariaLabel;
  const tag = element.tagName.toLowerCase();
  if (tag === "img" || tag === "area") {
    const alt = element.getAttribute("alt")?.trim();
    if (alt) return alt;
  }
  if (LABELABLE.has(tag) && element.labels?.length) {
    const text = [...element.labels].map((label2) => label2.textContent).join(" ").trim();
    if (text) return text;
  }
  if (tag === "input" || tag === "select" || tag === "textarea") {
    if (element.type === "submit" || element.type === "reset" || element.type === "button") {
      const value = (element.value ?? element.getAttribute("value") ?? "").trim();
      if (value) return value;
    }
    if (element.type === "image") {
      const alt = element.getAttribute("alt")?.trim();
      if (alt) return alt;
    }
    if (inLabelledBy && (tag === "textarea" || TEXT_INPUT.has(element.type))) {
      const value = (element.value ?? "").trim();
      if (value) return value;
    }
    if (element.type === "submit") return "Submit";
    if (element.type === "reset") return "Reset";
  }
  const fromContents = visibleContentText(element, inLabelledBy).replace(/\s+/g, " ").trim();
  if (fromContents) return fromContents;
  return (element.getAttribute("title") ?? element.getAttribute("placeholder") ?? "").trim();
}
function visibleContentText(element, includeHidden) {
  const nodes = element.shadowRoot ? element.shadowRoot.childNodes : element.childNodes;
  return generatedContent(element, "::before") + textFromNodes(nodes, includeHidden) + generatedContent(element, "::after");
}
function generatedContent(element, pseudo) {
  const content = getComputedStyle(element, pseudo).content;
  if (!content || content === "none" || content === "normal") return "";
  const alt = content.match(/\/\s*"((?:[^"\\]|\\.)*)"\s*$/);
  if (alt) return alt[1].replace(/\\(.)/g, "$1");
  const match = content.match(/^"((?:[^"\\]|\\.)*)"$/);
  return match ? match[1].replace(/\\(.)/g, "$1") : "";
}
function textFromNodes(nodes, includeHidden) {
  let text = "";
  for (const node of nodes) {
    if (node.nodeType === 3) {
      text += node.textContent;
      continue;
    }
    if (node.nodeType !== 1) continue;
    const tag = node.tagName.toLowerCase();
    if (tag === "script" || tag === "style" || tag === "noscript" || tag === "template") continue;
    if (!includeHidden) {
      if (node.getAttribute("aria-hidden") === "true" || node.hasAttribute("hidden")) continue;
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden") continue;
    }
    if (tag === "slot") {
      const assigned = node.assignedNodes?.() ?? [];
      text += textFromNodes(assigned.length ? assigned : node.childNodes, includeHidden);
      continue;
    }
    if (tag === "img" || tag === "area") {
      const imgAria = node.getAttribute("aria-label")?.trim();
      if (imgAria) {
        text += ` ${imgAria} `;
        continue;
      }
      const alt = node.getAttribute("alt");
      if (alt !== null) {
        text += ` ${alt} `;
        continue;
      }
      const imgTitle = node.getAttribute("title")?.trim();
      if (imgTitle) text += ` ${imgTitle} `;
      continue;
    }
    const ariaLabel = node.getAttribute("aria-label")?.trim();
    if (ariaLabel) {
      text += ` ${ariaLabel} `;
      continue;
    }
    const fromSubtree = textFromNodes(node.shadowRoot ? node.shadowRoot.childNodes : node.childNodes, includeHidden);
    if (fromSubtree.trim()) {
      text += fromSubtree;
      continue;
    }
    const title = node.getAttribute("title")?.trim();
    if (title) text += ` ${title} `;
  }
  return text;
}

// src/engine/rules/wcag/1.1.1-svg-img-alt.js
var svg_img_alt_default = {
  id: "svg-img-alt",
  name: "SVG accessible name",
  impact: "serious",
  tags: ["wcag2a", "wcag111"],
  help: 'Inline SVG and role="img" graphics need an accessible name',
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
  // <img> itself is handled by image-alt; this covers SVG (with or without a
  // role) and role="img" divs/spans. Top-level plain <svg> is included
  // because browsers expose it to AT as a graphic even without a role.
  selector: 'svg[role="img"], svg[role="graphics-document"], svg[role="graphics-symbol"], [role="img"]:not(img):not(svg), svg:not([role])',
  evaluate(element, { accessibleName: accessibleName2 }) {
    if (element.tagName.toLowerCase() !== "svg" && element.getAttribute("role") === "img") {
      const authorName2 = labelledByName(element) || element.getAttribute("aria-label")?.trim() || element.getAttribute("title")?.trim();
      if (authorName2) return { status: "pass" };
      return {
        status: "fail",
        message: 'This element is marked as an image but has no accessible name \u2014 for role="img", content inside it (including an inner SVG\u2019s <title>) does not count as a name.',
        fix: 'Add aria-label="\u2026" or aria-labelledby pointing at visible text.'
      };
    }
    if (accessibleName2(element)) return { status: "pass" };
    if (!element.getAttribute("role") && element.tagName.toLowerCase() === "svg") {
      if (element.parentNode instanceof SVGElement) return { status: "pass" };
      const control = element.closest('a[href], button, [role="button"], [role="link"]');
      if (control && accessibleName2(control)) return { status: "pass" };
      return {
        status: "incomplete",
        message: "This SVG has no accessible name and is not marked decorative \u2014 some screen readers announce it as an unlabeled graphic.",
        fix: 'Add aria-hidden="true" if decorative; if meaningful, add role="img" and aria-label="\u2026" (or a <title> as the first child).'
      };
    }
    return {
      status: "fail",
      message: "This element is marked as an image but has no accessible name.",
      fix: 'Add aria-label="\u2026" (for SVG, a <title> as the first child also works).'
    };
  }
};

// src/engine/lib/roles.js
var KNOWN_ARIA = /* @__PURE__ */ new Set([
  "activedescendant",
  "atomic",
  "autocomplete",
  "braillelabel",
  "brailleroledescription",
  "busy",
  "checked",
  "colcount",
  "colindex",
  "colindextext",
  "colspan",
  "controls",
  "current",
  "describedby",
  "description",
  "details",
  "disabled",
  "dropeffect",
  "errormessage",
  "expanded",
  "flowto",
  "grabbed",
  "haspopup",
  "hidden",
  "invalid",
  "keyshortcuts",
  "label",
  "labelledby",
  "level",
  "live",
  "modal",
  "multiline",
  "multiselectable",
  "orientation",
  "owns",
  "placeholder",
  "posinset",
  "pressed",
  "readonly",
  "relevant",
  "required",
  "roledescription",
  "rowcount",
  "rowindex",
  "rowindextext",
  "rowspan",
  "selected",
  "setsize",
  "sort",
  "valuemax",
  "valuemin",
  "valuenow",
  "valuetext"
]);
var GLOBAL_ARIA = /* @__PURE__ */ new Set([
  "atomic",
  "busy",
  "controls",
  "current",
  "describedby",
  "description",
  "details",
  "dropeffect",
  "flowto",
  "grabbed",
  "hidden",
  "keyshortcuts",
  "label",
  "labelledby",
  "live",
  "owns",
  "relevant",
  "roledescription",
  "braillelabel",
  "brailleroledescription"
]);
var LANDMARK_ROLES = /* @__PURE__ */ new Set([
  "banner",
  "complementary",
  "contentinfo",
  "form",
  "main",
  "navigation",
  "region",
  "search"
]);
var ROLE_ARIA = {
  // aria-colindextext / aria-rowindextext are ARIA 1.3 (Chromium maps them)
  // and belong to cell, gridcell, columnheader, rowheader and row. They were
  // in KNOWN_ARIA without a role that owned them, so the engine recognised
  // the attribute and then said no role supports it. 2026-08-25 overnight audit.
  link: ["disabled", "errormessage", "expanded", "haspopup", "invalid"],
  button: ["disabled", "errormessage", "expanded", "haspopup", "invalid", "pressed"],
  checkbox: ["checked", "disabled", "errormessage", "expanded", "haspopup", "invalid", "readonly", "required"],
  switch: ["checked", "disabled", "errormessage", "expanded", "haspopup", "invalid", "readonly", "required"],
  radio: ["checked", "disabled", "errormessage", "haspopup", "invalid", "posinset", "setsize"],
  option: ["checked", "disabled", "errormessage", "haspopup", "invalid", "posinset", "selected", "setsize"],
  tab: ["disabled", "errormessage", "expanded", "haspopup", "invalid", "posinset", "selected", "setsize"],
  menuitem: ["disabled", "errormessage", "expanded", "haspopup", "invalid", "posinset", "setsize"],
  menuitemcheckbox: ["checked", "disabled", "errormessage", "expanded", "haspopup", "invalid", "posinset", "setsize"],
  menuitemradio: ["checked", "disabled", "errormessage", "expanded", "haspopup", "invalid", "posinset", "setsize"],
  textbox: ["activedescendant", "autocomplete", "disabled", "errormessage", "haspopup", "invalid", "multiline", "placeholder", "readonly", "required"],
  searchbox: ["activedescendant", "autocomplete", "disabled", "errormessage", "haspopup", "invalid", "multiline", "placeholder", "readonly", "required"],
  combobox: ["activedescendant", "autocomplete", "disabled", "errormessage", "expanded", "haspopup", "invalid", "readonly", "required"],
  listbox: ["activedescendant", "disabled", "errormessage", "expanded", "haspopup", "invalid", "multiselectable", "orientation", "readonly", "required"],
  slider: ["disabled", "errormessage", "haspopup", "invalid", "orientation", "readonly", "valuemax", "valuemin", "valuenow", "valuetext"],
  spinbutton: ["activedescendant", "disabled", "errormessage", "haspopup", "invalid", "readonly", "required", "valuemax", "valuemin", "valuenow", "valuetext"],
  progressbar: ["disabled", "errormessage", "haspopup", "invalid", "valuemax", "valuemin", "valuenow", "valuetext"],
  meter: ["disabled", "errormessage", "haspopup", "invalid", "valuemax", "valuemin", "valuenow", "valuetext"],
  scrollbar: ["disabled", "errormessage", "haspopup", "invalid", "orientation", "valuemax", "valuemin", "valuenow", "valuetext"],
  heading: ["disabled", "errormessage", "haspopup", "invalid", "level"],
  list: ["disabled", "errormessage", "haspopup", "invalid"],
  listitem: ["disabled", "errormessage", "haspopup", "invalid", "level", "posinset", "setsize"],
  row: ["activedescendant", "colindex", "colindextext", "disabled", "errormessage", "expanded", "haspopup", "invalid", "level", "posinset", "rowindex", "rowindextext", "selected", "setsize"],
  rowgroup: ["disabled", "errormessage", "haspopup", "invalid"],
  cell: ["colindex", "colindextext", "colspan", "disabled", "errormessage", "haspopup", "invalid", "rowindex", "rowindextext", "rowspan"],
  gridcell: ["colindex", "colindextext", "colspan", "disabled", "errormessage", "expanded", "haspopup", "invalid", "readonly", "required", "rowindex", "rowindextext", "rowspan", "selected"],
  columnheader: ["colindex", "colindextext", "colspan", "disabled", "errormessage", "expanded", "haspopup", "invalid", "readonly", "required", "rowindex", "rowindextext", "rowspan", "selected", "sort"],
  rowheader: ["colindex", "colindextext", "colspan", "disabled", "errormessage", "expanded", "haspopup", "invalid", "readonly", "required", "rowindex", "rowindextext", "rowspan", "selected", "sort"],
  table: ["colcount", "disabled", "errormessage", "haspopup", "invalid", "rowcount"],
  grid: ["activedescendant", "colcount", "disabled", "errormessage", "haspopup", "invalid", "multiselectable", "readonly", "rowcount"],
  treegrid: ["activedescendant", "colcount", "disabled", "errormessage", "haspopup", "invalid", "multiselectable", "orientation", "readonly", "required", "rowcount"],
  tablist: ["activedescendant", "disabled", "errormessage", "haspopup", "invalid", "multiselectable", "orientation"],
  menu: ["activedescendant", "disabled", "errormessage", "haspopup", "invalid", "orientation"],
  menubar: ["activedescendant", "disabled", "errormessage", "haspopup", "invalid", "orientation"],
  tree: ["activedescendant", "disabled", "errormessage", "haspopup", "invalid", "multiselectable", "orientation", "required"],
  treeitem: ["checked", "disabled", "errormessage", "expanded", "haspopup", "invalid", "level", "posinset", "selected", "setsize"],
  radiogroup: ["activedescendant", "disabled", "errormessage", "haspopup", "invalid", "orientation", "readonly", "required"],
  group: ["activedescendant", "disabled", "errormessage", "haspopup", "invalid"],
  separator: ["disabled", "errormessage", "haspopup", "invalid", "orientation", "valuemax", "valuemin", "valuenow", "valuetext"],
  toolbar: ["activedescendant", "disabled", "errormessage", "haspopup", "invalid", "orientation"],
  dialog: ["disabled", "errormessage", "haspopup", "invalid", "modal"],
  alertdialog: ["disabled", "errormessage", "haspopup", "invalid", "modal"],
  application: ["activedescendant", "disabled", "errormessage", "expanded", "haspopup", "invalid"],
  article: ["disabled", "errormessage", "haspopup", "invalid", "posinset", "setsize"],
  img: ["disabled", "errormessage", "haspopup", "invalid"],
  figure: ["disabled", "errormessage", "haspopup", "invalid"],
  document: ["disabled", "errormessage", "haspopup", "invalid"],
  feed: ["disabled", "errormessage", "haspopup", "invalid"],
  math: ["disabled", "errormessage", "haspopup", "invalid"],
  note: ["disabled", "errormessage", "haspopup", "invalid"],
  presentation: ["disabled", "errormessage", "haspopup", "invalid"],
  none: ["disabled", "errormessage", "haspopup", "invalid"],
  banner: ["disabled", "errormessage", "haspopup", "invalid"],
  complementary: ["disabled", "errormessage", "haspopup", "invalid"],
  contentinfo: ["disabled", "errormessage", "haspopup", "invalid"],
  form: ["disabled", "errormessage", "haspopup", "invalid"],
  main: ["disabled", "errormessage", "haspopup", "invalid"],
  navigation: ["disabled", "errormessage", "haspopup", "invalid"],
  region: ["disabled", "errormessage", "haspopup", "invalid"],
  search: ["disabled", "errormessage", "haspopup", "invalid"],
  alert: ["disabled", "errormessage", "haspopup", "invalid"],
  log: ["disabled", "errormessage", "haspopup", "invalid"],
  marquee: ["disabled", "errormessage", "haspopup", "invalid"],
  status: ["disabled", "errormessage", "haspopup", "invalid"],
  timer: ["disabled", "errormessage", "haspopup", "invalid"],
  tabpanel: ["disabled", "errormessage", "haspopup", "invalid"],
  tooltip: ["disabled", "errormessage", "haspopup", "invalid"],
  definition: ["disabled", "errormessage", "haspopup", "invalid"],
  term: ["disabled", "errormessage", "haspopup", "invalid"],
  paragraph: ["disabled", "errormessage", "haspopup", "invalid"],
  generic: ["disabled", "errormessage", "haspopup", "invalid"],
  blockquote: ["disabled", "errormessage", "haspopup", "invalid"],
  caption: ["disabled", "errormessage", "haspopup", "invalid"],
  code: ["disabled", "errormessage", "haspopup", "invalid"],
  emphasis: ["disabled", "errormessage", "haspopup", "invalid"],
  strong: ["disabled", "errormessage", "haspopup", "invalid"],
  time: ["disabled", "errormessage", "haspopup", "invalid"],
  deletion: ["disabled", "errormessage", "haspopup", "invalid"],
  insertion: ["disabled", "errormessage", "haspopup", "invalid"],
  subscript: ["disabled", "errormessage", "haspopup", "invalid"],
  superscript: ["disabled", "errormessage", "haspopup", "invalid"]
};
var INPUT_ROLES = {
  checkbox: "checkbox",
  radio: "radio",
  range: "slider",
  number: "spinbutton",
  search: "searchbox",
  email: "textbox",
  tel: "textbox",
  text: "textbox",
  url: "textbox",
  button: "button",
  submit: "button",
  reset: "button",
  image: "button"
};
var DATALIST_TYPES = /* @__PURE__ */ new Set(["text", "search", "tel", "url", "email"]);
var TAG_ROLES = {
  button: "button",
  textarea: "textbox",
  img: "img",
  article: "article",
  aside: "complementary",
  nav: "navigation",
  main: "main",
  search: "search",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  h5: "heading",
  h6: "heading",
  ul: "list",
  ol: "list",
  menu: "list",
  li: "listitem",
  table: "table",
  thead: "rowgroup",
  tbody: "rowgroup",
  tfoot: "rowgroup",
  tr: "row",
  td: "cell",
  th: "columnheader",
  form: "form",
  fieldset: "group",
  details: "group",
  dialog: "dialog",
  hr: "separator",
  progress: "progressbar",
  meter: "meter",
  output: "status",
  option: "option",
  datalist: "listbox",
  dt: "term",
  dd: "definition",
  p: "paragraph",
  div: "generic",
  span: "generic",
  blockquote: "blockquote",
  figure: "figure",
  time: "time",
  code: "code",
  em: "emphasis",
  strong: "strong"
};
function implicitRole(element) {
  const tag = element.tagName.toLowerCase();
  if (tag === "a" || tag === "area") return element.hasAttribute("href") ? "link" : "generic";
  if (tag === "input") {
    if (DATALIST_TYPES.has(element.type) && element.hasAttribute("list")) return "combobox";
    return INPUT_ROLES[element.type] ?? null;
  }
  if (tag === "td" || tag === "th") {
    if (tag === "th" && element.getAttribute("scope")?.toLowerCase() === "row") return "rowheader";
    if (tag === "th") return "columnheader";
    const table2 = element.closest("table");
    const tableRole = table2 && effectiveRole(table2);
    return tableRole === "grid" || tableRole === "treegrid" ? "gridcell" : "cell";
  }
  if (tag === "select") return element.multiple || element.size > 1 ? "listbox" : "combobox";
  if (tag === "img") return element.getAttribute("alt") === "" ? "presentation" : "img";
  if (tag === "header") return element.closest("article, aside, main, nav, section") ? "generic" : "banner";
  if (tag === "footer") return element.closest("article, aside, main, nav, section") ? "generic" : "contentinfo";
  if (tag === "aside") {
    const sectioned = element.parentElement?.closest("article, aside, nav, section");
    const named2 = element.hasAttribute("aria-label") || element.hasAttribute("aria-labelledby");
    return sectioned && !named2 ? "generic" : "complementary";
  }
  if (tag === "section") {
    return element.hasAttribute("aria-label") || element.hasAttribute("aria-labelledby") ? "region" : "generic";
  }
  return TAG_ROLES[tag] ?? null;
}
function presentationDiscarded(element) {
  if ([...GLOBAL_ARIA].some((name) => element.hasAttribute(`aria-${name}`))) return true;
  if (element.matches(":disabled") || element.closest("[inert]")) return false;
  if (element.tabIndex >= 0) return true;
  return element.matches('a[href], button, input, select, textarea, summary, [contenteditable="true"]');
}
function effectiveRole(element) {
  const explicit = element.getAttribute("role")?.trim().split(/\s+/) ?? [];
  for (const token of explicit) {
    const role = token.toLowerCase();
    if (!ROLE_ARIA[role]) continue;
    if ((role === "presentation" || role === "none") && presentationDiscarded(element)) {
      return implicitRole(element);
    }
    return role;
  }
  return explicit.length ? null : implicitRole(element);
}

// src/engine/rules/wcag/4.1.2-button-name.js
var button_name_default = {
  id: "button-name",
  name: "Button names",
  impact: "critical",
  tags: ["wcag2a", "wcag412"],
  help: "Buttons must have an accessible name",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: 'button, [role="button"], input[type="button"], input[type="submit"], input[type="reset"]',
  evaluate(element, { accessibleName: accessibleName2 }) {
    const role = effectiveRole(element) ?? implicitRole(element);
    if (role !== "button") return { status: "pass" };
    if (accessibleName2(element)) return { status: "pass" };
    return {
      status: "fail",
      message: 'This button has no accessible name \u2014 a screen reader announces just "button".',
      fix: 'Add visible text inside the button, or aria-label="What it does" for icon-only buttons.'
    };
  }
};

// src/engine/rules/wcag/2.4.4-link-name.js
var link_name_default = {
  id: "link-name",
  name: "Link names",
  impact: "serious",
  tags: ["wcag2a", "wcag244", "wcag412"],
  help: "Links must have an accessible name",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html",
  // a[href] has the link role implicitly; role="link" claims it explicitly.
  // (Links without href have no link role and are correctly excluded.)
  selector: 'a[href], [role="link"]',
  evaluate(element, { accessibleName: accessibleName2 }) {
    const role = effectiveRole(element) ?? implicitRole(element);
    if (role !== "link") return { status: "pass" };
    if (accessibleName2(element)) return { status: "pass" };
    return {
      status: "fail",
      message: "This link has no accessible name \u2014 screen readers can only announce its URL.",
      fix: "Add text content to the link, alt text to the image inside it, or an aria-label."
    };
  }
};

// src/engine/rules/wcag/2.4.4-link-text-generic.js
var GENERIC = /* @__PURE__ */ new Set([
  // English
  "read more",
  "read more about this",
  "more",
  "much more",
  "learn more",
  "click here",
  "click",
  "click this",
  "tap here",
  "press here",
  "here",
  "this",
  "this link",
  "link",
  "this page",
  "go",
  "go here",
  "more info",
  "more information",
  "further information",
  "see more",
  "view more",
  "show more",
  "find out more",
  "discover more",
  "continue",
  "continue reading",
  "keep reading",
  "full story",
  "full article",
  "details",
  "see details",
  "view details",
  "more details",
  // French — contributed and checked by a native speaker
  "en savoir plus",
  "savoir plus",
  "lire la suite",
  "lire plus",
  "plus",
  "cliquez ici",
  "cliquer ici",
  "clique ici",
  "ici",
  "ce lien",
  "lien",
  "cette page",
  "voir plus",
  "en voir plus",
  "afficher plus",
  "afficher",
  "voir",
  "voir le d\xE9tail",
  "voir les d\xE9tails",
  "plus de d\xE9tails",
  "plus d informations",
  "plus d infos",
  "en savoir davantage",
  "d\xE9couvrir",
  "d\xE9couvrez",
  "continuer",
  "suite"
]);
function normalizeName(name) {
  return name.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").replace(/\s+/g, " ").trim();
}
function provablyGeneric(name) {
  const trimmed = name.trim();
  if (/^[<\[({"'«‹「『].*[>\])}"'»›」』]$/su.test(trimmed)) return false;
  const plain = trimmed.toLowerCase().replace(/[’']/gu, " ").replace(/^[^\p{L}\p{N}\s]+\s*/u, "").replace(/[^\p{L}\p{N}\s]+\s*$/u, "").replace(/\s+/g, " ").trim();
  return GENERIC.has(plain);
}
function createLinkPurposeRule({ id, impact, tags, help, helpUrl, verdict }) {
  return {
    id,
    impact,
    tags,
    help,
    helpUrl,
    // role="link" claims the link role explicitly; an <a> without href has no
    // link role at all and is correctly out of scope. Links with NO name are
    // link-name's finding, not this one.
    selector: 'a[href], [role="link"]',
    evaluate(element, { accessibleName: accessibleName2 }) {
      const name = accessibleName2(element);
      if (!name) return { status: "pass" };
      const normalized = normalizeName(name);
      if (!GENERIC.has(normalized)) return { status: "pass" };
      const lang = (element.closest("[lang]")?.getAttribute("lang") ?? element.ownerDocument.documentElement.getAttribute("lang") ?? "").trim();
      return verdict(name, { provable: provablyGeneric(name), normalized, lang });
    }
  };
}
var link_text_generic_default = createLinkPurposeRule({
  id: "link-text-generic",
  name: "Generic link text",
  impact: "moderate",
  tags: ["wcag2a", "wcag244"],
  help: "Link text should describe where the link goes",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html",
  verdict: (name) => ({
    status: "incomplete",
    message: `\u201C${name}\u201D does not say where this link goes. 2.4.4 lets the surrounding text supply that, so this passes only if the context a screen reader reaches \u2014 the same sentence, list item, table cell, or the heading of the card it sits in \u2014 makes the destination obvious. Check it does, and remember that anyone navigating by a list of the page's links sees this name on its own.`,
    fix: 'Put the destination in the link text itself, e.g. "Read more about the 2026 budget", or extend the name with aria-label while keeping the visible words at the start of it.'
  })
});

// src/engine/rules/wcag/2.4.9-link-text-generic-only.js
var FRENCH_ONLY_ENGLISH_NAMES = /* @__PURE__ */ new Set(["plus", "suite"]);
var FRENCH = /^fr(-|$)/i;
function mayBeBrandName(normalized, lang) {
  if (normalized === "go") return true;
  return FRENCH_ONLY_ENGLISH_NAMES.has(normalized) && !FRENCH.test(lang);
}
var link_text_generic_only_default = createLinkPurposeRule({
  id: "link-text-generic-only",
  name: "Self-sufficient link text",
  impact: "moderate",
  tags: ["wcag2aaa", "wcag249"],
  help: "Link text alone must identify where the link goes (AAA)",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html",
  verdict: (name, { provable, normalized, lang }) => {
    if (!provable || mayBeBrandName(normalized, lang)) return {
      status: "incomplete",
      message: `\u201C${name}\u201D matches a generic link phrase, but may identify its destination anyway: a code term keeps its meaning through the punctuation this comparison drops, and a brand or product name (a logo link named \u201CGo\u201D, a plan named \u201CPlus\u201D) is the destination. Check whether this name, read alone in a list of the page's links, says where it goes.`,
      fix: 'If the name really is generic here, put the destination in the link text, e.g. "Read more about the 2026 budget".'
    };
    return {
      status: "fail",
      message: `\u201C${name}\u201D gives no purpose on its own. 2.4.9 asks that the link text alone identify where a link goes, without relying on the sentence or heading around it, so anyone reading the page's links as a list can tell them apart.`,
      fix: 'Name the destination in the link text, e.g. "Read more about the 2026 budget".'
    };
  }
});

// src/engine/rules/wcag/1.3.1-form-label.js
var form_label_default = {
  id: "form-label",
  name: "Form field labels",
  impact: "critical",
  tags: ["wcag2a", "wcag131", "wcag332", "wcag412"],
  help: "Every form field needs a label",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
  selector: 'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="image"]), select, textarea',
  evaluate(element) {
    const role = effectiveRole(element);
    if (role === "presentation" || role === "none") return { status: "pass" };
    const visibleLabels = [...element.labels ?? []].filter((label2) => {
      if (label2.closest('[aria-hidden="true"]')) return false;
      const style = getComputedStyle(label2);
      return style.display !== "none" && style.visibility !== "hidden";
    });
    const accessibleText = (node) => {
      if (node.nodeType === Node.TEXT_NODE) return node.textContent;
      if (node.nodeType !== Node.ELEMENT_NODE) return "";
      if (node.getAttribute("aria-hidden") === "true") return "";
      const nodeStyle = getComputedStyle(node);
      if (nodeStyle.display === "none" || nodeStyle.visibility === "hidden") return "";
      const aria = node.getAttribute("aria-label");
      if (aria?.trim()) return aria;
      const alt = node.tagName === "IMG" || node.tagName === "AREA" ? node.getAttribute("alt") : null;
      if (alt?.trim()) return alt;
      return [...node.childNodes].map(accessibleText).join(" ");
    };
    const labelsText = visibleLabels.map(accessibleText).join(" ").trim();
    const ariaLabel = element.getAttribute("aria-label")?.trim();
    const labelledby = labelledByName(element);
    if (labelsText || ariaLabel || labelledby) return { status: "pass" };
    const id = element.id ? ` (it already has id="${element.id}")` : " (give it an id first)";
    if (element.getAttribute("title")?.trim()) {
      return {
        status: "incomplete",
        message: "This field is named only by its title attribute (technique H65) \u2014 conformant, but the label is invisible until hover and some tools skip it. Check a visible label isn\u2019t needed here."
      };
    }
    if (element.getAttribute("placeholder")) {
      return {
        status: "fail",
        message: "This field relies on its placeholder as the only label \u2014 the name vanishes as soon as the user types.",
        fix: `Add <label for="\u2026">Field name</label> pointing at this field${id}; keep the placeholder as an example value only.`
      };
    }
    if (element.labels?.length && !visibleLabels.length) {
      const onlyAriaHidden = [...element.labels].some((label2) => {
        const style = getComputedStyle(label2);
        return style.display !== "none" && style.visibility !== "hidden";
      });
      if (onlyAriaHidden) {
        return {
          status: "fail",
          message: `This field's only <label> is inside aria-hidden="true": sighted users still see it, but it is removed from the accessibility tree, so the field has no accessible name.`,
          fix: "Remove aria-hidden from the label (or from the ancestor that hides it). If the label must stay hidden from assistive technology, name the field another way with aria-label or aria-labelledby."
        };
      }
      return {
        status: "fail",
        message: "This field's only <label> is hidden (display:none or visibility:hidden), so no one can see or rely on it.",
        fix: "Make the label visible, or use a visually-hidden-but-rendered technique (clip/sr-only) if it must not show."
      };
    }
    if (element.labels?.length) {
      const looksLabelled = visibleLabels.some((l) => l.textContent.trim());
      const ariaHiddenText = visibleLabels.some((l) => [...l.querySelectorAll('[aria-hidden="true"]')].some((twin) => twin.textContent.trim()));
      if (looksLabelled && !ariaHiddenText) {
        return {
          status: "fail",
          message: "This field's <label> holds text, but all of it is inside unrendered content (display:none or visibility:hidden), so the accessible name computes to nothing and nobody sees a label.",
          fix: "Render the text inside the label, move it out of the hidden element, or add aria-label to the field."
        };
      }
      return {
        status: "fail",
        message: looksLabelled ? "This field's <label> shows text, but all of it is inside aria-hidden content \u2014 the accessible name computes to nothing." : "This field has a <label>, but the label is empty \u2014 it announces nothing.",
        fix: looksLabelled ? "Move the visible text out of the aria-hidden wrapper, or add aria-label to the field." : "Put visible text inside the label."
      };
    }
    if (element.id) {
      const root = element.getRootNode();
      const pointed = root.querySelector?.(`label[for="${CSS.escape(element.id)}"]`);
      const first = root.getElementById?.(element.id);
      if (pointed && first && first !== element) {
        return {
          status: "fail",
          message: `A <label for="${element.id}"> exists, but an earlier element on the page has the same id, so the label belongs to that one and this field has no label at all.`,
          fix: `Give this field a unique id and point its label at that; ids must not repeat on a page.`
        };
      }
    }
    return {
      status: "fail",
      message: "This form field has no label \u2014 users cannot tell what to enter.",
      fix: `Add <label for="\u2026">Field name</label> pointing at this field${id}.`
    };
  }
};

// src/engine/rules/wcag/1.3.5-autocomplete-valid.js
var FIELD_NAMES = /* @__PURE__ */ new Set([
  "additional-name",
  "address-level1",
  "address-level2",
  "address-level3",
  "address-level4",
  "address-line1",
  "address-line2",
  "address-line3",
  "bday",
  "bday-day",
  "bday-month",
  "bday-year",
  "cc-additional-name",
  "cc-csc",
  "cc-exp",
  "cc-exp-month",
  "cc-exp-year",
  "cc-family-name",
  "cc-given-name",
  "cc-name",
  "cc-number",
  "cc-type",
  "country",
  "country-name",
  "current-password",
  "email",
  "family-name",
  "given-name",
  "honorific-prefix",
  "honorific-suffix",
  "impp",
  "language",
  "name",
  "new-password",
  "nickname",
  "one-time-code",
  "organization",
  "organization-title",
  "photo",
  "postal-code",
  "sex",
  "street-address",
  "tel",
  "tel-area-code",
  "tel-country-code",
  "tel-extension",
  "tel-local",
  "tel-local-prefix",
  "tel-local-suffix",
  "tel-national",
  "transaction-amount",
  "transaction-currency",
  "url",
  "username"
]);
var CONTACT_TYPES = /* @__PURE__ */ new Set(["home", "work", "mobile", "fax", "pager"]);
var CONTACT_FIELDS = /* @__PURE__ */ new Set([
  "tel",
  "tel-country-code",
  "tel-national",
  "tel-area-code",
  "tel-local",
  "tel-local-prefix",
  "tel-local-suffix",
  "tel-extension",
  "email",
  "impp"
]);
var MODIFIERS = /* @__PURE__ */ new Set(["shipping", "billing", "webauthn", "on", "off"]);
var isSection = (token) => token.startsWith("section-");
var isKnown = (token) => FIELD_NAMES.has(token) || CONTACT_TYPES.has(token) || MODIFIERS.has(token) || isSection(token);
function grammarFault(tokens) {
  if (tokens.length === 1 && (tokens[0] === "on" || tokens[0] === "off")) return null;
  if (tokens.includes("on") || tokens.includes("off")) return '"on" and "off" must stand alone, with no other tokens';
  let i = 0;
  if (isSection(tokens[i])) i += 1;
  if (tokens[i] === "shipping" || tokens[i] === "billing") i += 1;
  if (CONTACT_TYPES.has(tokens[i])) {
    if (!CONTACT_FIELDS.has(tokens[i + 1])) {
      return `"${tokens[i]}" must come directly before a tel, tel-*, email or impp field name`;
    }
    i += 2;
  } else if (FIELD_NAMES.has(tokens[i])) {
    i += 1;
  } else {
    const found = tokens[i];
    if (found && isSection(found)) return `"${found}" must be the first token`;
    if (found === "webauthn") return '"webauthn" must come last, after a field name';
    if (found === "shipping" || found === "billing") return `"${found}" may appear once, directly before the field name`;
    return "the value names no field (exactly one field name such as email, tel or given-name is required)";
  }
  if (tokens[i] === "webauthn") i += 1;
  if (i < tokens.length) {
    const extra = tokens[i];
    if (isSection(extra)) return `"${extra}" must be the first token`;
    if (extra === "shipping" || extra === "billing") return `"${extra}" must come before the field name`;
    if (extra === "webauthn") return '"webauthn" must be the last token';
    if (FIELD_NAMES.has(extra) || CONTACT_TYPES.has(extra)) return `only one field name is allowed, but "${tokens[i - 1]}" is followed by "${extra}"`;
    return `"${extra}" cannot follow the field name`;
  }
  return null;
}
var autocomplete_valid_default = {
  id: "autocomplete-valid",
  name: "Autocomplete tokens",
  impact: "serious",
  tags: ["wcag21aa", "wcag135"],
  help: "autocomplete attributes must use valid tokens",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html",
  // HTML gives the autocomplete attribute no effect on checkbox, radio, file,
  // submit, image, reset and button inputs, and a disabled control collects
  // nothing, so neither can misidentify a purpose (2026-08-25 overnight
  // audit; the same applicability ACT rule 73f2c2 states).
  selector: 'input[autocomplete]:not([type="checkbox"]):not([type="radio"]):not([type="file"]):not([type="submit"]):not([type="image"]):not([type="reset"]):not([type="button"]):not(:disabled), select[autocomplete]:not(:disabled), textarea[autocomplete]:not(:disabled)',
  evaluate(element) {
    if (element.getAttribute("aria-disabled") === "true") return { status: "pass" };
    const tokens = element.getAttribute("autocomplete").trim().toLowerCase().split(/\s+/).filter(Boolean);
    const invalid = tokens.filter((token) => !isKnown(token));
    if (invalid.length) {
      return {
        status: "fail",
        message: `autocomplete contains unknown token(s): ${invalid.join(", ")} \u2014 browsers and assistive tools can't identify this field's purpose.`,
        fix: 'Use tokens from the HTML input-purposes list, e.g. autocomplete="email" or autocomplete="given-name".'
      };
    }
    const fault = tokens.length ? grammarFault(tokens) : null;
    if (!fault) return { status: "pass" };
    return {
      status: "fail",
      message: `autocomplete="${element.getAttribute("autocomplete").trim()}" is not a valid autofill value: ${fault}. Browsers discard the whole value, so no purpose is exposed.`,
      fix: 'Use one field name from the HTML autofill list, optionally preceded by section-*, then shipping or billing, and (for tel, email and impp only) a contact type, e.g. autocomplete="shipping tel" or autocomplete="home email".'
    };
  }
};

// src/engine/rules/wcag/1.3.4-orientation.js
var ROOT_PART = /^(html|body|:root)((?::[a-z-]+(?:\([^()]*\))?)*)$/i;
var LOCK_ROTATE = /rotate(?:3d\([^)]*,\s*)?\(?\s*(?:-?(?:90|270)deg|0\.25turn|-0\.25turn|100grad|-100grad)/i;
function rootSelector(selectorText, doc) {
  return (selectorText ?? "").split(",").some((part) => {
    const match = ROOT_PART.exec(part.trim());
    if (!match) return false;
    if (!match[2]) return true;
    const root = /^body$/i.test(match[1]) ? doc.body : doc.documentElement;
    try {
      return !!root && root.matches(part.trim());
    } catch {
      return false;
    }
  });
}
function scanRules(rules, insideOrientation, findings, doc) {
  for (const rule of rules ?? []) {
    const condition = rule.conditionText ?? rule.media?.mediaText;
    if (condition !== void 0 && rule.cssRules) {
      const orientation = /orientation\s*:\s*(portrait|landscape)/i.exec(condition)?.[1];
      scanRules(rule.cssRules, orientation ? { condition, orientation } : insideOrientation, findings, doc);
      continue;
    }
    if (insideOrientation && rule.style && rootSelector(rule.selectorText, doc)) {
      const { display, visibility, transform, rotate } = rule.style;
      if (display === "none" || visibility === "hidden") {
        findings.push({ kind: "hidden", selector: rule.selectorText, ...insideOrientation });
      } else if (LOCK_ROTATE.test(transform ?? "") || LOCK_ROTATE.test(rotate ?? "")) {
        findings.push({ kind: "rotated", selector: rule.selectorText, ...insideOrientation });
      }
    } else if (rule.cssRules) {
      scanRules(rule.cssRules, insideOrientation, findings);
    }
  }
}
var orientation_default = {
  id: "orientation-lock",
  name: "Orientation lock",
  impact: "serious",
  tags: ["wcag21aa", "wcag134"],
  help: "Content must work in both portrait and landscape",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/orientation.html",
  selector: "html",
  // The evidence is in the stylesheet, not in the root's own rendering — and
  // the lock hides the root exactly when it is in force, so a visibility
  // filter here would silence the rule in the only state that matters.
  visibleOnly: false,
  evaluate(element) {
    const findings = [];
    for (const sheet of element.ownerDocument.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      scanRules(rules, null, findings, element.ownerDocument);
    }
    if (!findings.length) return { status: "pass" };
    const f = findings[0];
    const verb = f.kind === "hidden" ? "hides the page" : "rotates the page to force the other orientation";
    return {
      status: "fail",
      message: `A stylesheet rule (${f.selector} under @media ${f.condition}) ${verb} when the device is in ${f.orientation} \u2014 the content is locked to a single display orientation.`,
      fix: "Let the layout adapt to both orientations instead of hiding or rotating the page. If a single orientation is genuinely essential (rare), document why."
    };
  }
};

// src/engine/rules/wcag/1.4.4-meta-viewport.js
var meta_viewport_default = {
  id: "meta-viewport",
  name: "Viewport zoom lock",
  impact: "critical",
  tags: ["wcag2aa", "wcag144"],
  help: "The viewport must let users zoom to at least 200%",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html",
  selector: 'meta[name="viewport"]',
  visibleOnly: false,
  evaluate(element) {
    if (isEmbeddedDocument(element.ownerDocument)) return { status: "pass" };
    const content = element.getAttribute("content") ?? "";
    const disablesZoom = /user-scalable\s*=\s*(no|0)/i.test(content);
    const maxScale = content.match(/maximum-scale\s*=\s*([\d.]+)/i);
    const cappedZoom = maxScale && parseFloat(maxScale[1]) < 2;
    if (!disablesZoom && !cappedZoom) return { status: "pass" };
    return {
      status: "fail",
      message: "This viewport meta tag stops low-vision users from zooming the page.",
      fix: "Remove user-scalable=no and any maximum-scale below 2 from the viewport meta tag."
    };
  }
};

// src/engine/lib/contrast.js
var LEGACY_RGB = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+%?)\s*)?\)$/;
var MODERN_RGB = /^rgba?\(\s*([\d.]+%?)\s+([\d.]+%?)\s+([\d.]+%?)\s*(?:\/\s*([\d.]+%?)\s*)?\)$/;
var SRGB_COLOR = /^color\(\s*srgb\s+(-?[\d.]+%?)\s+(-?[\d.]+%?)\s+(-?[\d.]+%?)\s*(?:\/\s*([\d.]+%?)\s*)?\)$/;
var clamp255 = (value) => Math.min(255, Math.max(0, value));
var channel = (token, unitScale) => clamp255(token.endsWith("%") ? parseFloat(token) / 100 * 255 : parseFloat(token) * unitScale);
var alphaOf = (token) => {
  if (token === void 0) return 1;
  const value = parseFloat(token);
  return Math.min(1, Math.max(0, token.endsWith("%") ? value / 100 : value));
};
function parseKnownSyntax(cssColor) {
  const rgb = LEGACY_RGB.exec(cssColor) ?? MODERN_RGB.exec(cssColor);
  if (rgb) return { r: channel(rgb[1], 1), g: channel(rgb[2], 1), b: channel(rgb[3], 1), a: alphaOf(rgb[4]) };
  const srgb = SRGB_COLOR.exec(cssColor);
  if (srgb) return { r: channel(srgb[1], 255), g: channel(srgb[2], 255), b: channel(srgb[3], 255), a: alphaOf(srgb[4]) };
  return null;
}
var probe;
var probeUnavailable = false;
function paintToSrgb(cssColor) {
  if (probeUnavailable) return null;
  try {
    probe ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    if (!probe) {
      probeUnavailable = true;
      return null;
    }
    probe.fillStyle = "#000000";
    probe.fillStyle = cssColor;
    const asBlack = probe.fillStyle;
    probe.fillStyle = "#ffffff";
    probe.fillStyle = cssColor;
    if (asBlack === "#000000" && probe.fillStyle === "#ffffff") return null;
    probe.clearRect(0, 0, 1, 1);
    probe.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = probe.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: a / 255 };
  } catch {
    probeUnavailable = true;
    return null;
  }
}
var colorCache = /* @__PURE__ */ new Map();
function parseColor(cssColor) {
  if (cssColor == null) return null;
  if (colorCache.has(cssColor)) return colorCache.get(cssColor);
  const color = parseKnownSyntax(cssColor) ?? paintToSrgb(cssColor);
  if (colorCache.size < 1e4) colorCache.set(cssColor, color);
  return color;
}
function channelLuminance(value) {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function luminance({ r, g, b }) {
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}
function contrastRatio(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}
function showRatio(ratio) {
  const text = ratio >= 10 ? (Math.floor(ratio * 10) / 10).toFixed(1) : (Math.floor(ratio * 100) / 100).toFixed(2);
  return text.replace(/\.0+$/, "");
}
function composite(top, bottom) {
  const a = top.a + bottom.a * (1 - top.a);
  const blend = (t, b) => (t * top.a + b * bottom.a * (1 - top.a)) / (a || 1);
  return { r: blend(top.r, bottom.r), g: blend(top.g, bottom.g), b: blend(top.b, bottom.b), a };
}
var backgroundCache = /* @__PURE__ */ new WeakMap();
var opacityCache = /* @__PURE__ */ new WeakMap();
var opacityAnimatorsCache = null;
var mediaRectsCache = null;
var panelRectsCache = null;
var pseudoCache = /* @__PURE__ */ new WeakMap();
var zeroClipCache = /* @__PURE__ */ new WeakMap();
var firstLineRulesCache = /* @__PURE__ */ new WeakMap();
var HAS_IMAGE = Symbol("background-image in chain");
function inZeroClipSubtree(element) {
  for (let a = element; a; a = a.parentElement) {
    let hidden = zeroClipCache.get(a);
    if (hidden === void 0) {
      const s = getComputedStyle(a);
      hidden = false;
      if (s.clip !== "auto" && s.position !== "static") {
        const m = /rect\(([^)]+)\)/.exec(s.clip);
        if (m) {
          const parts = m[1].split(",").map((v) => v.trim());
          if (!parts.includes("auto") && parts.length === 4) {
            const [t, r, b, l] = parts.map(parseFloat);
            if (r - l <= 0 || b - t <= 0) hidden = true;
          }
        }
      }
      if (!hidden && s.clipPath && s.clipPath !== "none") {
        const m = /inset\(([^)]+)\)/.exec(s.clipPath);
        if (m && !m[1].includes("px")) {
          const parts = m[1].trim().split(/\s+/).map(parseFloat);
          const [t, r = t, b = t, l = r] = parts;
          if (t + b >= 100 || l + r >= 100) hidden = true;
        }
      }
      zeroClipCache.set(a, hidden);
    }
    if (hidden) return true;
  }
  return false;
}
function backgroundColorSource(element) {
  for (let node = element; node && node.nodeType === 1; node = node.assignedSlot ?? node.parentElement ?? node.getRootNode()?.host) {
    const style = getComputedStyle(node);
    if (style.backgroundImage !== "none" && !paintsNothing(style.backgroundImage)) return null;
    const color = parseColor(style.backgroundColor);
    if (!color || color.a === 0) continue;
    return color.a >= 1 ? style.backgroundColor : null;
  }
  return null;
}
var transparentImages = /* @__PURE__ */ new Set();
function paintsNothing(backgroundImage) {
  if (backgroundImage.includes("gradient(")) return false;
  const urls = [...backgroundImage.matchAll(/url\(["']?(.*?)["']?\)/g)].map((m) => m[1]);
  return urls.length > 0 && urls.every((url) => transparentImages.has(url));
}
function canvasColor(doc) {
  const scheme = getComputedStyle(doc.documentElement).colorScheme ?? "";
  const prefersDark = typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: dark)").matches;
  const useDark = /dark/.test(scheme) && (!/light/.test(scheme) || prefersDark);
  return useDark ? { r: 18, g: 18, b: 18, a: 1 } : { r: 255, g: 255, b: 255, a: 1 };
}
function resolveBackground(element, doc) {
  if (!element || element.nodeType !== 1) return canvasColor(doc);
  if (backgroundCache.has(element)) {
    const cached = backgroundCache.get(element);
    return cached === HAS_IMAGE ? null : cached;
  }
  let result;
  const style = getComputedStyle(element);
  if (style.backgroundImage !== "none" && !paintsNothing(style.backgroundImage)) {
    result = null;
  } else {
    const color = parseColor(style.backgroundColor);
    if (color && color.a >= 1) {
      result = color;
    } else {
      const behind = resolveBackground(
        element.assignedSlot ?? element.parentElement ?? element.getRootNode()?.host,
        doc
      );
      result = behind === null ? null : color && color.a > 0 ? composite(color, behind) : behind;
    }
  }
  backgroundCache.set(element, result === null ? HAS_IMAGE : result);
  return result;
}
function effectiveBackground(element) {
  return resolveBackground(element, element.ownerDocument);
}
function opacityAnimators(doc) {
  if (!opacityAnimatorsCache) {
    opacityAnimatorsCache = /* @__PURE__ */ new WeakMap();
    for (const animation of typeof doc.getAnimations === "function" ? doc.getAnimations() : []) {
      if (animation.playState !== "running") continue;
      const target2 = animation.effect?.target;
      if (!target2) continue;
      const keyframes = animation.effect.getKeyframes?.() ?? [];
      if (!keyframes.some((frame) => frame.opacity !== void 0)) continue;
      let rest = null;
      const timing = animation.effect.getComputedTiming?.() ?? {};
      if (Number.isFinite(timing.endTime) && (timing.fill === "forwards" || timing.fill === "both")) {
        const last = [...keyframes].reverse().find((frame) => frame.opacity !== void 0);
        const value = parseFloat(last?.opacity);
        if (Number.isFinite(value)) rest = value;
      }
      const previous = opacityAnimatorsCache.get(target2);
      if (previous === void 0 || rest !== null && (previous === null || rest < previous)) {
        opacityAnimatorsCache.set(target2, rest);
      }
    }
  }
  return opacityAnimatorsCache;
}
function opacityAnimating(element) {
  const animators = opacityAnimators(element.ownerDocument);
  for (let node = element; node && node.nodeType === 1; node = node.parentElement ?? node.getRootNode()?.host) {
    if (animators.has(node)) return true;
  }
  return false;
}
function restingOpacity(element) {
  const animators = opacityAnimators(element.ownerDocument);
  let product = 1;
  for (let node = element; node && node.nodeType === 1; node = node.parentElement ?? node.getRootNode()?.host) {
    if (animators.has(node)) {
      const rest = animators.get(node);
      product *= rest === null ? 1 : rest;
    } else {
      product *= parseFloat(getComputedStyle(node).opacity) || 0;
    }
  }
  return product;
}
function cumulativeOpacity(element) {
  if (!element || element.nodeType !== 1) return 1;
  let cached = opacityCache.get(element);
  if (cached === void 0) {
    const parent = element.parentElement ?? element.getRootNode()?.host ?? null;
    cached = (parseFloat(getComputedStyle(element).opacity) || 0) * cumulativeOpacity(parent);
    opacityCache.set(element, cached);
  }
  return cached;
}
function nodeRestingOpacity(node) {
  const animators = opacityAnimators(node.ownerDocument);
  if (animators.has(node)) {
    const rest = animators.get(node);
    return rest === null ? 1 : rest;
  }
  const value = parseFloat(getComputedStyle(node).opacity);
  return Number.isFinite(value) ? value : 1;
}
function opacityGroupPaint(element, foreground) {
  const flatParent = (node) => node.parentElement ?? node.getRootNode()?.host ?? null;
  let top = null;
  let opacity = 1;
  for (let node = element; node && node.nodeType === 1; node = flatParent(node)) {
    const own = nodeRestingOpacity(node);
    if (own < 1) {
      top = node;
      opacity *= own;
    }
  }
  if (!top) return null;
  let text = { ...foreground };
  let paint = { r: 0, g: 0, b: 0, a: 0 };
  let painted = false;
  for (let node = element; node && node.nodeType === 1; node = flatParent(node)) {
    const style = getComputedStyle(node);
    if (style.backgroundImage !== "none" && !paintsNothing(style.backgroundImage)) return null;
    if (style.mixBlendMode && style.mixBlendMode !== "normal" || style.filter && style.filter !== "none" || style.backdropFilter && style.backdropFilter !== "none") return null;
    const color = parseColor(style.backgroundColor);
    if (color && color.a > 0) {
      text = composite(text, color);
      paint = composite(paint, color);
      painted = true;
    }
    const own = nodeRestingOpacity(node);
    if (own < 1) {
      text = { ...text, a: text.a * own };
      paint = { ...paint, a: paint.a * own };
    }
    if (node === top) break;
  }
  if (!painted) return null;
  const behindNode = flatParent(top);
  const behind = behindNode ? effectiveBackground(behindNode) : canvasColor(element.ownerDocument);
  if (!behind) return { unresolved: true, opacity };
  return { foreground: composite(text, behind), background: composite(paint, behind), opacity, text, paint };
}
function backgroundObscured(element) {
  const doc = element.ownerDocument;
  if (typeof doc.elementsFromPoint !== "function") return null;
  const own = parseColor(getComputedStyle(element).backgroundColor);
  if (own && own.a >= 1) return null;
  const rect = element.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const win = doc.defaultView;
  const x = Math.min(Math.max(rect.left + rect.width / 2, 0), win.innerWidth - 1);
  const y = Math.min(Math.max(rect.top + rect.height / 2, 0), win.innerHeight - 1);
  const stack = doc.elementsFromPoint(x, y);
  const start = stack.indexOf(element);
  if (start === -1) return "unverifiable";
  for (const layer of stack.slice(start + 1)) {
    if (layer.contains(element)) {
      const style = getComputedStyle(layer);
      if (style.backgroundImage !== "none") return layer;
      const bg = parseColor(style.backgroundColor);
      if (bg && bg.a >= 1) return null;
      continue;
    }
    return layer;
  }
  return null;
}
function textSamplePoint(element) {
  for (const node of element.childNodes) {
    if (node.nodeType !== 3 || !node.textContent.trim()) continue;
    const range = element.ownerDocument.createRange();
    range.selectNodeContents(node);
    const rect2 = range.getClientRects()[0];
    if (rect2 && rect2.width && rect2.height) {
      return { x: rect2.left + rect2.width / 2, y: rect2.top + rect2.height / 2 };
    }
  }
  const rect = element.getBoundingClientRect();
  return rect.width && rect.height ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : null;
}
var px = (value) => typeof value === "string" && value.endsWith("px") ? parseFloat(value) : NaN;
function containingBlockFor(host2) {
  for (let node = host2; node && node.nodeType === 1; node = node.parentElement) {
    const style = getComputedStyle(node);
    if (style.position !== "static" || style.transform !== "none" || style.filter !== "none" || /paint|layout|strict|content/.test(style.contain ?? "")) return node;
  }
  return null;
}
function pseudoRect(host2, style) {
  const block = containingBlockFor(host2);
  if (!block) return null;
  const hostStyle = getComputedStyle(block);
  const hostRect = block.getBoundingClientRect();
  const borderLeft = px(hostStyle.borderLeftWidth) || 0;
  const borderTop = px(hostStyle.borderTopWidth) || 0;
  const cbLeft = hostRect.left + borderLeft;
  const cbTop = hostRect.top + borderTop;
  const cbWidth = hostRect.width - borderLeft - (px(hostStyle.borderRightWidth) || 0);
  const cbHeight = hostRect.height - borderTop - (px(hostStyle.borderBottomWidth) || 0);
  const extraX = (px(style.paddingLeft) || 0) + (px(style.paddingRight) || 0) + (px(style.borderLeftWidth) || 0) + (px(style.borderRightWidth) || 0);
  const extraY = (px(style.paddingTop) || 0) + (px(style.paddingBottom) || 0) + (px(style.borderTopWidth) || 0) + (px(style.borderBottomWidth) || 0);
  const span = (startValue, endValue, sizeValue, origin, extent, extra) => {
    const start = px(startValue);
    const end = px(endValue);
    const size = px(sizeValue);
    if (Number.isFinite(start) && Number.isFinite(end)) return [origin + start, origin + extent - end];
    if (Number.isFinite(start) && Number.isFinite(size)) return [origin + start, origin + start + size + extra];
    if (Number.isFinite(end) && Number.isFinite(size)) {
      const far = origin + extent - end;
      return [far - size - extra, far];
    }
    return null;
  };
  const x = span(style.left, style.right, style.width, cbLeft, cbWidth, extraX);
  const y = span(style.top, style.bottom, style.height, cbTop, cbHeight, extraY);
  if (!x || !y) return null;
  let [left, right] = x;
  let [top, bottom] = y;
  if (style.transform && style.transform !== "none") {
    const matrix = /^matrix\(([^)]+)\)$/.exec(style.transform);
    if (!matrix) return null;
    const [a, b, c, d, e, f] = matrix[1].split(",").map(Number);
    if (a !== 1 || b !== 0 || c !== 0 || d !== 1) return null;
    left += e;
    right += e;
    top += f;
    bottom += f;
  }
  return { left, top, right, bottom, empty: !(right > left) || !(bottom > top) };
}
function pseudoLayers(host2) {
  let layers = pseudoCache.get(host2);
  if (layers !== void 0) return layers;
  layers = [];
  for (const which of ["::before", "::after"]) {
    const style = getComputedStyle(host2, which);
    if (style.content === "none" || style.display === "none" || style.visibility === "hidden") continue;
    const color = parseColor(style.backgroundColor);
    const paints = style.backgroundImage !== "none" || (color?.a ?? 0) > 0;
    if (!paints) continue;
    if (style.position !== "absolute" && style.position !== "fixed") continue;
    const opacity = parseFloat(style.opacity);
    const opacityFactor = Number.isFinite(opacity) ? opacity : 1;
    const rect = style.position === "absolute" ? pseudoRect(host2, style) : null;
    if (!rect) {
      const alphaBound = Math.min(1, opacityFactor * (style.backgroundImage !== "none" ? 1 : color.a));
      if (alphaBound > 0) layers.push({ film: alphaBound, fixed: style.position === "fixed" });
      continue;
    }
    if (rect.empty) continue;
    let layerColor = color;
    if (layerColor && opacityFactor < 1) layerColor = { ...layerColor, a: layerColor.a * opacityFactor };
    const imageCss = style.backgroundImage !== "none" ? style.backgroundImage : null;
    const imageMeta = imageCss ? { repeat: style.backgroundRepeat, size: style.backgroundSize, position: style.backgroundPosition } : null;
    layers.push({ rect, color: layerColor, imageCss, imageMeta });
  }
  pseudoCache.set(host2, layers);
  return layers;
}
function pseudoBackdropForText(element) {
  const point = textSamplePoint(element);
  if (!point) return null;
  let acc = null;
  let image = null;
  let settled = false;
  let film = 0;
  let crossed = false;
  let beyondPaint = false;
  for (let node = element; node && node.nodeType === 1; node = node.parentElement ?? node.getRootNode()?.host) {
    for (const layer of pseudoLayers(node)) {
      if (layer.film) {
        if (!layer.fixed && crossed) continue;
        film = 1 - (1 - film) * (1 - layer.film);
        continue;
      }
      if (settled) continue;
      const { rect, color, imageCss } = layer;
      if (point.x < rect.left || point.x > rect.right || point.y < rect.top || point.y > rect.bottom) continue;
      if (imageCss) {
        image = { css: imageCss, element: node, box: rect, meta: layer.imageMeta };
        settled = true;
        beyondPaint = beyondPaint || crossed;
        continue;
      }
      if (!color || color.a === 0) continue;
      acc = acc ? composite(acc, color) : color;
      beyondPaint = beyondPaint || crossed;
      if (acc.a >= 1) settled = true;
    }
    if (!crossed) {
      const style = getComputedStyle(node);
      if (style.backgroundImage !== "none" && !paintsNothing(style.backgroundImage) || (parseColor(style.backgroundColor)?.a ?? 0) >= 1) crossed = true;
    }
  }
  if (image) return { image, ...film > 0 && { film }, ...beyondPaint && { beyondPaint } };
  if (acc) return { color: acc, ...film > 0 && { film }, ...beyondPaint && { beyondPaint } };
  return film > 0 ? { film } : null;
}
function filmedContrastBounds(foreground, background, film) {
  const ratios = [contrastRatio(foreground, background)];
  const textLum = luminance(foreground);
  const sides = [];
  for (const channel2 of [0, 255]) {
    const paint = { r: channel2, g: channel2, b: channel2, a: film };
    const shiftedBackground = composite(paint, background);
    ratios.push(contrastRatio(foreground, shiftedBackground));
    ratios.push(contrastRatio(composite(paint, foreground), shiftedBackground));
    sides.push(Math.sign(textLum - luminance(shiftedBackground)));
  }
  return {
    min: Math.min(...ratios),
    max: Math.max(...ratios),
    crossed: sides[0] !== sides[1]
  };
}
function scrimIn(layersAbove, element, win) {
  const rect = element.getBoundingClientRect();
  const found = [];
  for (const layer of layersAbove) {
    if (layer.contains(element) || element.contains(layer)) continue;
    const style = getComputedStyle(layer);
    const color = parseColor(style.backgroundColor);
    const alpha = (color ? color.a : 0) * (parseFloat(style.opacity) || 1);
    const hasBackdropFilter = style.backdropFilter && style.backdropFilter !== "none";
    if (!hasBackdropFilter && (alpha < 0.15 || alpha >= 1)) continue;
    const r = layer.getBoundingClientRect();
    const coversViewport = (Math.min(r.right, win.innerWidth) - Math.max(r.left, 0)) * (Math.min(r.bottom, win.innerHeight) - Math.max(r.top, 0)) >= 0.6 * win.innerWidth * win.innerHeight;
    const coversElement = r.left <= rect.left + 1 && r.top <= rect.top + 1 && r.right >= rect.right - 1 && r.bottom >= rect.bottom - 1;
    if (coversViewport && coversElement) found.push(layer);
  }
  return found.length ? found : null;
}
function scrimPaint(layers) {
  const paints = [];
  for (const layer of layers) {
    const style = getComputedStyle(layer);
    if (style.backdropFilter && style.backdropFilter !== "none") return null;
    if (style.filter && style.filter !== "none") return null;
    if (style.mixBlendMode && style.mixBlendMode !== "normal") return null;
    if (style.backgroundImage !== "none") return null;
    const color = parseColor(style.backgroundColor);
    if (!color) return null;
    const alpha = color.a * (parseFloat(style.opacity) || 1);
    if (alpha <= 0) continue;
    paints.push({ ...color, a: alpha });
  }
  return paints.length ? paints : null;
}
function paintedBackdrop(element) {
  const doc = element.ownerDocument;
  const win = doc.defaultView;
  if (typeof doc.elementsFromPoint !== "function") return "unresolved";
  const point = textSamplePoint(element);
  if (!point) return "unresolved";
  if (point.x < 0 || point.y < 0 || point.x >= win.innerWidth || point.y >= win.innerHeight) {
    return "offscreen";
  }
  const stack = doc.elementsFromPoint(point.x, point.y);
  const start = stack.indexOf(element);
  const scrim = start > 0 ? scrimIn(stack.slice(0, start), element, win) : null;
  let acc = null;
  const overlays = [];
  const own = parseColor(getComputedStyle(element).backgroundColor);
  if (own && own.a > 0) {
    if (own.a >= 1) return { color: own, scrim };
    acc = own;
    overlays.push(own);
  }
  if (start === -1) return "unresolved";
  const missing = [];
  const inStack = new Set(stack);
  for (let a = element.parentElement ?? element.getRootNode()?.host; a && a.nodeType === 1; a = a.parentElement ?? a.getRootNode()?.host) {
    if (inStack.has(a)) continue;
    const box = a.getBoundingClientRect();
    if (point.x < box.left || point.x >= box.right || point.y < box.top || point.y >= box.bottom) continue;
    const st = getComputedStyle(a);
    const c = parseColor(st.backgroundColor);
    if (c && c.a > 0 || st.backgroundImage !== "none" && !paintsNothing(st.backgroundImage)) missing.push(a);
  }
  const layers = [];
  for (const layer of stack.slice(start + 1)) {
    while (missing.length && !missing[0].contains(layer)) layers.push(missing.shift());
    layers.push(layer);
  }
  layers.push(...missing);
  for (const layer of layers) {
    if (/^(img|video|canvas|svg|picture|object|embed|iframe)$/i.test(layer.tagName)) {
      return { image: layer, scrim, overlays };
    }
    const style = getComputedStyle(layer);
    if (layer.shadowRoot) return "unresolved";
    if (style.mixBlendMode && style.mixBlendMode !== "normal" || style.filter && style.filter !== "none" || style.backdropFilter && style.backdropFilter !== "none") return "unresolved";
    if (style.backgroundImage !== "none") {
      const rects = backgroundImagePaintRects(layer);
      const covers = (r) => !r || point.x >= r.left && point.x < r.right && point.y >= r.top && point.y < r.bottom;
      if (!rects.length || rects.some(covers)) return { image: layer, scrim, overlays };
    }
    let color = parseColor(style.backgroundColor);
    if (!color) return "unresolved";
    const layerOpacity = parseFloat(style.opacity);
    if (layerOpacity < 1) color = { ...color, a: color.a * layerOpacity };
    if (color.a === 0) continue;
    acc = acc ? composite(acc, color) : color;
    if (acc.a >= 1) return { color: acc, scrim };
    overlays.push(color);
  }
  const canvas = canvasColor(doc);
  return { color: acc ? composite(acc, canvas) : canvas, scrim };
}
function opaquePanelRects(doc) {
  if (!panelRectsCache) {
    panelRectsCache = { panels: [], veil: null };
    const win = doc.defaultView;
    const all = doc.querySelectorAll("body *");
    if (all.length <= 3e4) {
      for (const el of all) {
        const style = getComputedStyle(el);
        if (style.position === "static" && style.cssFloat === "none") continue;
        const color = parseColor(style.backgroundColor);
        const rect = el.getBoundingClientRect();
        if (color && color.a >= 1 && rect.width >= 24 && rect.height >= 12) {
          panelRectsCache.panels.push({ element: el, rect, color, hitTestBlind: style.pointerEvents === "none" });
        }
        if (!panelRectsCache.veil && (style.position === "fixed" || style.position === "sticky") && style.visibility !== "hidden") {
          const alpha = (color ? color.a : 0) * (parseFloat(style.opacity) || 1);
          const hasBackdropFilter = style.backdropFilter && style.backdropFilter !== "none";
          const coversViewport = rect.width >= 0.9 * win.innerWidth && rect.height >= 0.9 * win.innerHeight;
          if (coversViewport && (hasBackdropFilter || alpha >= 0.15 && alpha < 1)) {
            panelRectsCache.veil = el;
          }
        }
      }
    }
  }
  return panelRectsCache.panels;
}
function viewportVeil(doc) {
  opaquePanelRects(doc);
  return panelRectsCache.veil;
}
function parseTextShadows(cssText) {
  if (!cssText || cssText === "none") return [];
  const layers = [];
  for (const part of cssText.split(/,(?![^(]*\))/)) {
    const colorMatch = /rgba?\([^)]*\)|#[0-9a-fA-F]{3,8}\b/.exec(part);
    const lengths = [...part.replace(colorMatch?.[0] ?? "", "").matchAll(/(-?\d*\.?\d+)px/g)].map((m) => parseFloat(m[1]));
    if (lengths.length < 2) continue;
    layers.push({ x: lengths[0], y: lengths[1], blur: lengths[2] ?? 0, color: parseColor(colorMatch?.[0] ?? "") });
  }
  return layers;
}
function textShadowHalo(cssText, fontSize) {
  const cap = Math.max(2, fontSize * 0.25);
  const byColor = /* @__PURE__ */ new Map();
  for (const layer of parseTextShadows(cssText)) {
    if (!layer.color || layer.color.a < 0.95) continue;
    if (layer.blur > cap || Math.abs(layer.x) > cap || Math.abs(layer.y) > cap) continue;
    const key = `${Math.round(layer.color.r)},${Math.round(layer.color.g)},${Math.round(layer.color.b)}`;
    const dirs = byColor.get(key) ?? { color: layer.color, up: false, down: false, left: false, right: false };
    if (layer.blur >= Math.max(Math.abs(layer.x), Math.abs(layer.y), 0.5)) {
      dirs.up = dirs.down = dirs.left = dirs.right = true;
    } else {
      if (layer.x > 0) dirs.right = true;
      if (layer.x < 0) dirs.left = true;
      if (layer.y > 0) dirs.down = true;
      if (layer.y < 0) dirs.up = true;
    }
    byColor.set(key, dirs);
  }
  for (const dirs of byColor.values()) {
    if (dirs.up && dirs.down && dirs.left && dirs.right) return dirs.color;
  }
  return null;
}
function textShadowNegligible(cssText, fontSize) {
  return parseTextShadows(cssText).every((l) => !l.color || l.color.a < 0.15 || l.blur > fontSize * 0.5);
}
function paintableRect(element, rect) {
  let { left, top, right, bottom } = rect;
  let mode2 = getComputedStyle(element).position;
  for (let a = element.parentElement; a; a = a.parentElement) {
    if (mode2 === "fixed") break;
    const s = getComputedStyle(a);
    const containingBlock = s.position !== "static" || s.transform !== "none" || s.filter && s.filter !== "none";
    if (mode2 === "absolute" && !containingBlock) continue;
    const clips = (o) => o === "hidden" || o === "clip";
    if (clips(s.overflowX) || clips(s.overflowY)) {
      const b = a.getBoundingClientRect();
      if (clips(s.overflowX)) {
        left = Math.max(left, b.left);
        right = Math.min(right, b.right);
      }
      if (clips(s.overflowY)) {
        top = Math.max(top, b.top);
        bottom = Math.min(bottom, b.bottom);
      }
      if (right <= left || bottom <= top) return null;
    }
    mode2 = s.position;
  }
  return {
    left,
    top,
    right,
    bottom,
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function mediaRects(doc) {
  if (!mediaRectsCache) {
    mediaRectsCache = [];
    for (const el of doc.querySelectorAll("img, video, canvas, svg")) {
      const rect = paintableRect(el, el.getBoundingClientRect());
      if (rect && rect.width >= 8 && rect.height >= 8) {
        mediaRectsCache.push({ element: el, rect, hitTestBlind: getComputedStyle(el).pointerEvents === "none" });
      }
    }
  }
  return mediaRectsCache;
}
function backgroundImageSource(element) {
  const overlays = [];
  for (let current = element; current; current = current.parentElement) {
    const style = getComputedStyle(current);
    if (style.backgroundImage !== "none") return { css: style.backgroundImage, element: current, overlays };
    const color = parseColor(style.backgroundColor);
    if (color && color.a >= 1) return null;
    if (color && color.a > 0) overlays.push(color);
  }
  return null;
}
function applyOverlays(base, overlays) {
  let result = base;
  for (let i = overlays.length - 1; i >= 0; i--) result = composite(overlays[i], result);
  return result;
}
var overlayKey = (overlays) => overlays.map((c) => `${c.r},${c.g},${c.b},${c.a}`).join(";");
var imageRangeCache = /* @__PURE__ */ new Map();
var MAX_SAMPLE_AXIS = 1024;
function sampleGridFor(extent) {
  if (!extent || !(extent.width > 0) || !(extent.height > 0)) return null;
  const axis = (value) => Math.min(MAX_SAMPLE_AXIS, Math.max(32, Math.ceil(value / 4)));
  const width = axis(extent.width);
  const height = axis(extent.height);
  return { width, height, reduced: extent.width / width > 4.5 || extent.height / height > 4.5 };
}
function imageLuminanceRange(url, overlays = [], grid = null) {
  const width = grid?.width ?? 32;
  const height = grid?.height ?? 32;
  const sizeKey = width === 32 && height === 32 ? "" : `|${width}x${height}`;
  const cacheKey = `${url}${overlays.length ? `|${overlayKey(overlays)}` : ""}${sizeKey}`;
  if (imageRangeCache.has(cacheKey)) return imageRangeCache.get(cacheKey);
  const promise = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    const timer = setTimeout(() => resolve(null), 1500);
    img.onload = () => {
      clearTimeout(timer);
      try {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, width, height);
        const data = ctx.getImageData(0, 0, width, height).data;
        let min = 1;
        let max2 = 0;
        let minColor = null;
        let maxColor = null;
        let opaquePixels = 0;
        let alphaSeen = false;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 255) alphaSeen = true;
          if (data[i + 3] < 128) continue;
          opaquePixels += 1;
          const pixel = { r: data[i], g: data[i + 1], b: data[i + 2], a: 1 };
          const shown = overlays.length ? applyOverlays(pixel, overlays) : pixel;
          const l = luminance(shown);
          if (l < min) {
            min = l;
            minColor = shown;
          }
          if (l > max2) {
            max2 = l;
            maxColor = shown;
          }
        }
        if (!opaquePixels) {
          transparentImages.add(url);
          backgroundCache = /* @__PURE__ */ new WeakMap();
          resolve({ transparent: true, width: img.naturalWidth, height: img.naturalHeight });
          return;
        }
        const reduced = Boolean(grid?.reduced) && (img.naturalWidth > width || img.naturalHeight > height);
        resolve(min <= max2 ? { min, max: max2, minColor, maxColor, hasAlpha: alphaSeen, width: img.naturalWidth, height: img.naturalHeight, reduced } : null);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };
    img.src = url;
  });
  imageRangeCache.set(cacheKey, promise);
  return promise;
}
function backgroundImagePaintRects(element) {
  const style = getComputedStyle(element);
  const images = splitLayers(style.backgroundImage);
  if (!images.length) return [];
  const box = element.getBoundingClientRect();
  const sizes = splitLayers(style.backgroundSize);
  const positions = splitLayers(style.backgroundPosition);
  const repeats = splitLayers(style.backgroundRepeat);
  const per = (list2, i) => list2.length ? list2[i % list2.length] : void 0;
  return images.map((image, i) => {
    if (image === "none") return { left: 0, top: 0, right: 0, bottom: 0 };
    const repeat = per(repeats, i) ?? "repeat";
    if (repeat !== "no-repeat") return null;
    const size = per(sizes, i) ?? "auto";
    if (size === "cover" || size === "contain") return null;
    const parts = splitParts(size);
    const extent = (value, total) => {
      if (value?.endsWith("px")) return parseFloat(value);
      if (value?.endsWith("%")) return parseFloat(value) / 100 * total;
      return null;
    };
    const width = extent(parts[0], box.width);
    const height = extent(parts[1] ?? parts[0], box.height);
    if (width === null || height === null || Number.isNaN(width) || Number.isNaN(height)) return null;
    const pos = splitParts(per(positions, i) ?? "0% 0%");
    const offset = (value, total, span) => {
      if (value?.endsWith("%")) return parseFloat(value) / 100 * (total - span);
      if (value?.endsWith("px")) return parseFloat(value);
      return null;
    };
    const offsetX = offset(pos[0], box.width, width);
    const offsetY = offset(pos[1] ?? "50%", box.height, height);
    if (offsetX === null || offsetY === null || Number.isNaN(offsetX) || Number.isNaN(offsetY)) return null;
    const left = box.left + offsetX;
    const top = box.top + offsetY;
    return { left, top, right: left + width, bottom: top + height };
  });
}
function splitParts(value) {
  const out = [];
  let depth = 0;
  let current = "";
  for (const ch of value) {
    if (ch === "(") depth += 1;
    if (ch === ")") depth -= 1;
    if (/\s/.test(ch) && depth === 0) {
      if (current) out.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  if (current) out.push(current);
  return out;
}
function splitLayers(value) {
  if (!value || value === "none") return value === "none" ? ["none"] : [];
  const out = [];
  let depth = 0;
  let current = "";
  for (const ch of value) {
    if (ch === "(") depth += 1;
    if (ch === ")") depth -= 1;
    if (ch === "," && depth === 0) {
      out.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim()) out.push(current.trim());
  return out;
}
function backgroundImagePaintRect(element, intrinsic) {
  const style = getComputedStyle(element);
  if (splitLayers(style.backgroundImage).filter((layer) => layer !== "none").length !== 1) return null;
  const box = element.getBoundingClientRect();
  return imagePaintRectInBox(
    { left: box.left, top: box.top, right: box.right, bottom: box.bottom },
    { repeat: style.backgroundRepeat, size: style.backgroundSize, position: style.backgroundPosition },
    intrinsic
  );
}
function imagePaintRectInBox(box, meta2, intrinsic) {
  if (!box || !meta2) return null;
  if (meta2.repeat !== "no-repeat") return null;
  if (meta2.size === "cover" || meta2.size === "contain") return null;
  const boxWidth = box.right - box.left;
  const boxHeight = box.bottom - box.top;
  const dimension = (value, total, auto) => {
    if (value?.endsWith("px")) return parseFloat(value);
    if (value?.endsWith("%")) return parseFloat(value) / 100 * total;
    return auto;
  };
  const size = meta2.size.split(" ");
  const width = dimension(size[0], boxWidth, intrinsic?.width);
  const height = dimension(size[1] ?? size[0], boxHeight, intrinsic?.height);
  if (!Number.isFinite(width) || !Number.isFinite(height)) return null;
  const offset = (value, total, extent) => {
    if (value?.endsWith("%")) return parseFloat(value) / 100 * (total - extent);
    if (value?.endsWith("px")) return parseFloat(value);
    return null;
  };
  const pos = meta2.position.split(" ");
  const offsetX = offset(pos[0], boxWidth, width);
  const offsetY = offset(pos[1] ?? "50%", boxHeight, height);
  if (offsetX === null || offsetY === null || Number.isNaN(offsetX) || Number.isNaN(offsetY)) return null;
  const left = box.left + offsetX;
  const top = box.top + offsetY;
  return { left, top, right: left + width, bottom: top + height };
}
function rangeWithBackdrop(range, under, overlays = []) {
  if (!range || !range.hasAlpha) return range;
  if (!under || under.a < 1) return null;
  const shown = overlays.length ? applyOverlays(under, overlays) : under;
  const underLum = luminance(shown);
  return {
    ...range,
    min: Math.min(range.min, underLum),
    max: Math.max(range.max, underLum),
    minColor: underLum < range.min ? shown : range.minColor,
    maxColor: underLum > range.max ? shown : range.maxColor
  };
}
function splitBackgroundLayers(backgroundImageCss) {
  return splitLayers(backgroundImageCss);
}
function backgroundLayerUrl(layer) {
  const match = /^url\(([\s\S]*)\)$/.exec((layer ?? "").trim());
  if (!match) return null;
  let inner = match[1].trim();
  const quote = inner[0];
  if ((quote === '"' || quote === "'") && inner.endsWith(quote)) {
    inner = inner.slice(1, -1).replace(new RegExp(`\\\\${quote}`, "g"), quote);
  }
  return inner;
}
var GRADIENT_NON_COLOR = /^(?:(?:to|at|from|in|circle|ellipse|closest-side|closest-corner|farthest-side|farthest-corner)\b|calc\(|-?\d|\.\d)/i;
function gradientStops(layer) {
  const result = { colors: [], unparsed: 0, translucent: false, space: null };
  const open = layer.indexOf("(");
  const close = layer.lastIndexOf(")");
  if (open === -1 || close <= open) return result;
  for (const part of splitLayers(layer.slice(open + 1, close))) {
    const space = /(?:^|\s)in\s+([a-z0-9-]+)/i.exec(part);
    if (space && space[1].toLowerCase() !== "srgb") result.space = space[1].toLowerCase();
    let token = null;
    const call = /([a-z][a-z0-9-]*)\(/i.exec(part);
    if (call) {
      let depth = 0;
      for (let i = call.index; i < part.length; i++) {
        if (part[i] === "(") depth += 1;
        if (part[i] === ")") {
          depth -= 1;
          if (depth === 0) {
            token = part.slice(call.index, i + 1);
            break;
          }
        }
      }
    } else {
      token = part.trim().split(/\s+/)[0] ?? "";
    }
    if (!token || GRADIENT_NON_COLOR.test(token)) continue;
    const color = /^currentcolor$/i.test(token) ? null : parseColor(token);
    if (!color) {
      result.unparsed += 1;
      continue;
    }
    if (color.a < 1) result.translucent = true;
    result.colors.push(color);
  }
  return result;
}
function sampledGradientRange(layer, overlays = [], steps = 16) {
  const { colors, unparsed, translucent, space } = gradientStops(layer);
  if (!colors.length || unparsed || translucent || space) return null;
  const samples = [];
  if (colors.length === 1) samples.push(colors[0]);
  for (let i = 0; i + 1 < colors.length; i++) {
    const from = colors[i];
    const to = colors[i + 1];
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      samples.push({
        r: from.r + (to.r - from.r) * t,
        g: from.g + (to.g - from.g) * t,
        b: from.b + (to.b - from.b) * t,
        a: 1
      });
    }
  }
  const composited = samples.map((sample) => overlays.length ? applyOverlays(sample, overlays) : sample);
  let min = Infinity;
  let max2 = -Infinity;
  let minColor = null;
  let maxColor = null;
  for (const sample of composited) {
    const l = luminance(sample);
    if (l < min) {
      min = l;
      minColor = sample;
    }
    if (l > max2) {
      max2 = l;
      maxColor = sample;
    }
  }
  return { min, max: max2, minColor, maxColor, sampled: true };
}
function ratioFromLuminance(l1, l2) {
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}
function rangeVerdict(foreground, range, required) {
  const textLum = luminance(foreground);
  const inside = textLum >= range.min && textLum <= range.max;
  const worst = inside ? 1 : Math.min(ratioFromLuminance(textLum, range.min), ratioFromLuminance(textLum, range.max));
  const best = Math.max(ratioFromLuminance(textLum, range.min), ratioFromLuminance(textLum, range.max));
  if (worst >= required) return { verdict: "pass", worst, best };
  if (best < required) return { verdict: "fail", worst, best };
  return { verdict: "mixed", worst, best };
}
function rootHasFirstLineRules(root) {
  let has = firstLineRulesCache.get(root);
  if (has !== void 0) return has;
  has = false;
  const scan = (rules) => {
    for (const rule of rules) {
      if (rule.selectorText && /::?first-(?:line|letter)\b/.test(rule.selectorText)) return true;
      const inner = rule.cssRules ?? rule.styleSheet?.cssRules;
      if (inner && scan(inner)) return true;
    }
    return false;
  };
  const sheets = [...root.styleSheets ?? [], ...root.adoptedStyleSheets ?? []];
  for (const sheet of sheets) {
    try {
      if (scan(sheet.cssRules)) {
        has = true;
        break;
      }
    } catch {
      has = true;
      break;
    }
  }
  firstLineRulesCache.set(root, has);
  return has;
}
function pseudoTextColors(element, style) {
  if (style.display === "inline" || style.display === "contents") return [];
  if (!rootHasFirstLineRules(element.getRootNode())) return [];
  const paintedColor = (s) => s.webkitTextFillColor && s.webkitTextFillColor !== s.color ? s.webkitTextFillColor : s.color;
  const base = paintedColor(style);
  const found = [];
  for (const pseudo of ["::first-line", "::first-letter"]) {
    const pseudoStyle = getComputedStyle(element, pseudo);
    const css = paintedColor(pseudoStyle);
    if (!css || css === base) continue;
    const color = parseColor(css);
    if (color) found.push({ pseudo, color, style: pseudoStyle });
  }
  return found;
}
var BOLD_WEIGHT = 600;
function isLargeText(style) {
  const size = parseFloat(style.fontSize);
  const weight = parseInt(style.fontWeight, 10) || 400;
  return size >= 24 || size >= 56 / 3 && weight >= BOLD_WEIGHT;
}

// src/engine/rules/wcag/1.4.3-color-contrast.js
var firstLayerUrl = (css) => splitBackgroundLayers(css ?? "").map(backgroundLayerUrl).find(Boolean) ?? null;
var extentOf = (rect) => rect ? { width: rect.right - rect.left, height: rect.bottom - rect.top } : null;
var SEPARATOR_GLYPHS = /^([|¦·•∙‧/⁄\\‐‑‒–—―⁃«»‹›-])\1*$/;
var channelText = (value) => String(Math.round(value * 100) / 100);
var asRgb = (color) => `rgb(${channelText(color.r)}, ${channelText(color.g)}, ${channelText(color.b)})`;
var veiledIncomplete = (resting, veiled) => ({
  status: "incomplete",
  message: "This text sits behind a translucent full-page overlay (a modal or loading veil), which changes its presented contrast" + (resting && veiled ? `: ${showRatio(resting)}:1 at rest, ${showRatio(veiled)}:1 as presented through the overlay, which straddles the threshold` : "") + " \u2014 judge the page with the overlay dismissed, or the dimmed state by eye if the overlay is permanent."
});
var ARIA_DISABLED_HOSTS = 'button, a[href], input, select, textarea, fieldset, optgroup, option, [role="button"], [role="link"], [role="checkbox"], [role="radio"], [role="switch"], [role="tab"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="option"], [role="slider"], [role="spinbutton"], [role="textbox"], [role="searchbox"], [role="combobox"], [role="gridcell"], [role="treeitem"], [role="scrollbar"], [role="separator"], [role="application"], [role="group"], [role="listbox"], [role="menu"], [role="menubar"], [role="radiogroup"], [role="tablist"], [role="tree"], [role="treegrid"], [role="grid"], [role="toolbar"]';
function inactiveComponentText(element) {
  for (let node = element; node; node = node.parentElement) {
    const disabled = node.closest(":disabled");
    if (!disabled) break;
    if (disabled.tagName !== "FIELDSET") return true;
    const legend = element.closest("legend");
    if (!legend || legend.parentElement !== disabled || disabled.querySelector(":scope > legend") !== legend) return true;
    node = disabled;
  }
  const ariaDisabled = element.closest('[aria-disabled="true"]');
  return Boolean(ariaDisabled && ariaDisabled.matches(ARIA_DISABLED_HOSTS));
}
function unreachableControl(control) {
  if (control.matches(':disabled, [aria-disabled="true"], [tabindex="-1"]')) return true;
  if (control.closest("[inert]")) return true;
  const nativeFocusable = control.matches("button, a[href], input, select");
  return !nativeFocusable && !control.hasAttribute("tabindex") && !control.isContentEditable;
}
function coveredByTextTwin(element) {
  const doc = element.ownerDocument;
  if (typeof doc.elementsFromPoint !== "function") return false;
  const text = element.textContent.trim();
  if (!text) return false;
  const rect = element.getBoundingClientRect();
  const win = doc.defaultView;
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  if (x < 0 || y < 0 || x >= win.innerWidth || y >= win.innerHeight) return false;
  const stack = doc.elementsFromPoint(x, y);
  const index = stack.indexOf(element);
  if (index <= 0) return false;
  return stack.slice(0, index).some((layer) => !layer.contains(element) && !element.contains(layer) && layer.textContent.trim() === text);
}
function textIntersects(element, rect) {
  const box = element.getBoundingClientRect();
  if (Math.min(box.right, rect.right) - Math.max(box.left, rect.left) < 3 || Math.min(box.bottom, rect.bottom) - Math.max(box.top, rect.top) < 3) return false;
  const range = element.ownerDocument.createRange();
  for (const node of element.childNodes) {
    if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) continue;
    range.selectNodeContents(node);
    for (const r of range.getClientRects()) {
      const overlapX = Math.min(r.right, rect.right) - Math.max(r.left, rect.left);
      const overlapY = Math.min(r.bottom, rect.bottom) - Math.max(r.top, rect.top);
      if (overlapX >= 3 && overlapY >= 3) return true;
    }
  }
  return false;
}
async function imageVsText(imageSource, element, doc) {
  const url = firstLayerUrl(imageSource.css);
  let intrinsic = null;
  if (url) {
    try {
      intrinsic = await imageLuminanceRange(new URL(url, doc.baseURI).href);
    } catch {
    }
  }
  const dimensionless = !intrinsic || !intrinsic.width || intrinsic.width === 300 && intrinsic.height === 150;
  const isGradient = !url && imageSource.css.includes("gradient(");
  let sizedSmall = false;
  if (isGradient) {
    const size = getComputedStyle(imageSource.element).backgroundSize ?? "";
    const px2 = [...size.matchAll(/(\d+(?:\.\d+)?)px/g)].map((m) => parseFloat(m[1]));
    sizedSmall = px2.length > 0 && px2.every((value) => value <= 40);
  }
  const paint = backgroundImagePaintRect(imageSource.element, dimensionless ? null : intrinsic);
  if (!paint) return { relation: "unknown", intrinsic, dimensionless, isGradient, sizedSmall, paint: null };
  return {
    relation: textIntersects(element, paint) ? "under" : "clear",
    intrinsic,
    dimensionless,
    isGradient,
    sizedSmall,
    paint
  };
}
function textVisuallyHidden(element, style, foreground) {
  if (foreground?.a === 0) return true;
  if (parseFloat(style.fontSize) === 0) return true;
  if (parseFloat(style.opacity) === 0) return true;
  const indent = parseFloat(style.textIndent) || 0;
  const clipped2 = /hidden|clip/.test(`${style.overflow} ${style.overflowX} ${style.overflowY}`) || style.clipPath !== "none" || style.clip !== "auto" && style.position === "absolute";
  if (!clipped2 && Math.abs(indent) <= 1e3) return inZeroClipSubtree(element);
  const rect = element.getBoundingClientRect();
  if ((rect.width <= 1 || rect.height <= 1) && clipped2) return true;
  if (Math.abs(indent) > rect.width && (clipped2 || Math.abs(indent) > 1e3)) return true;
  return inZeroClipSubtree(element);
}
function verdictFromRange(range, foreground, required, what, reduced = false) {
  if (!range) return null;
  const { verdict, worst, best } = rangeVerdict(foreground, range, required);
  if (verdict === "pass") {
    if (!reduced) return { status: "pass" };
    return {
      status: "incomplete",
      message: `The ${what} behind this text is too large to sample at glyph scale, so detail narrower than the sampling grid could sit under the text unseen. Every sampled pixel passes (worst ${showRatio(worst)}:1), so confirm by eye.`
    };
  }
  if (verdict === "fail") {
    return {
      status: "fail",
      message: `Contrast against the ${what} behind this text is at best ${showRatio(best)}:1 \u2014 below the ${required}:1 minimum against every part of it.`,
      fix: "Change the text colour, or place a solid overlay between the text and the image."
    };
  }
  return {
    status: "incomplete",
    message: `The ${what} behind this text has both light and dark areas (contrast ranges ${showRatio(worst)}\u2013${showRatio(best)}:1 for this text) \u2014 whether it passes depends on the exact overlap, check by eye.`
  };
}
function unaccountedScrim(element, imageCarrier) {
  const pseudo = pseudoBackdropForText(element);
  if (pseudo?.color?.a > 0) return true;
  const doc = element.ownerDocument;
  if (typeof doc.elementsFromPoint !== "function") return false;
  const rect = element.getBoundingClientRect();
  const win = doc.defaultView;
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  if (x < 0 || y < 0 || x >= win.innerWidth || y >= win.innerHeight) return false;
  const stack = doc.elementsFromPoint(x, y);
  const start = stack.indexOf(element);
  if (start === -1) return false;
  return stack.slice(start + 1).some((layer) => {
    if (layer.contains(element) || layer === imageCarrier) return false;
    const color = parseColor(getComputedStyle(layer).backgroundColor);
    return color && color.a > 0;
  });
}
var PAINTS_NOTHING = Symbol("fully transparent image layer");
function paintUnderImage(carrier) {
  const color = parseColor(getComputedStyle(carrier).backgroundColor);
  if (color && color.a >= 1) return color;
  const parent = carrier.parentElement ?? carrier.getRootNode()?.host ?? null;
  const behind = parent ? effectiveBackground(parent) : null;
  if (!behind) return null;
  return color && color.a > 0 ? composite(color, behind) : behind;
}
async function sampledVerdict(source2, foreground, required, doc, overlays = [], under = null, extent = null) {
  if (!source2) return null;
  let range = null;
  let what = "image";
  const grid = sampleGridFor(extent);
  if (source2.tagName === "IMG") {
    range = await imageLuminanceRange(source2.currentSrc || source2.src, overlays, grid);
  } else {
    const css = source2.css ?? getComputedStyle(source2).backgroundImage;
    if (!css || css === "none") return null;
    const layers = splitBackgroundLayers(css).filter((layer2) => layer2 !== "none");
    if (layers.length > 1) return null;
    const layer = layers[0] ?? "";
    const url = backgroundLayerUrl(layer);
    if (url) {
      let absolute;
      try {
        absolute = new URL(url, doc.baseURI).href;
      } catch {
        return null;
      }
      range = await imageLuminanceRange(absolute, overlays, grid);
    } else if (layer.includes("gradient(")) {
      what = "gradient";
      const stops = gradientStops(layer);
      if (!stops.colors.length || stops.unparsed) {
        return {
          status: "incomplete",
          message: "The gradient behind this text has colour stops this engine could not parse, so its range of colours could not be sampled. Check the contrast by eye."
        };
      }
      if (stops.space) {
        return {
          status: "incomplete",
          message: `The gradient behind this text interpolates in ${stops.space}, not sRGB, so the colours between its stops cannot be computed here. Check the contrast by eye.`
        };
      }
      if (stops.translucent) {
        return {
          status: "incomplete",
          message: "The gradient behind this text has translucent colour stops, so what shows behind the glyphs is a blend with whatever is painted beneath the gradient. Check the contrast by eye."
        };
      }
      range = sampledGradientRange(layer, overlays);
    } else {
      return null;
    }
  }
  if (range?.transparent) return PAINTS_NOTHING;
  if (range?.hasAlpha) {
    range = rangeWithBackdrop(range, under, overlays);
    if (!range) {
      return {
        status: "incomplete",
        message: `The ${what} behind this text has transparent regions, so parts of the text sit on whatever is painted beneath it, and that layer could not be resolved \u2014 check the contrast by eye.`
      };
    }
  }
  if (foreground.a < 1) {
    const ends = [range?.minColor, range?.maxColor].filter(Boolean);
    if (ends.length === 2) {
      const ratios = ends.map((backdrop) => contrastRatio(composite(foreground, backdrop), backdrop));
      if (ratios.every((ratio) => ratio < required)) {
        const best = Math.max(...ratios);
        return {
          status: "fail",
          message: `This text is translucent, so it blends with what is behind it: against every part of that backdrop the blend reaches at best ${showRatio(best)}:1, below the ${required}:1 minimum.`,
          fix: "Raise the text opacity, change its colour, or put a solid layer between the text and the backdrop.",
          data: { ratio: Number(showRatio(best)), required }
        };
      }
    }
    return {
      status: "incomplete",
      message: "This text is translucent over an image or gradient, so its presented colour depends on the pixels beneath \u2014 contrast must be checked by eye."
    };
  }
  if (!range && what === "image") {
    return {
      status: "incomplete",
      message: "The image painted behind this text can\u2019t be read: it is cross-origin, or it failed to load, so a script can\u2019t sample its colours. Check the contrast by eye."
    };
  }
  return verdictFromRange(range, foreground, required, what, Boolean(range?.reduced));
}
function createContrastRule({ id, tags, help, helpUrl, thresholds }) {
  const largeScaleNoteFor = (style, required, ratio) => {
    if (required !== thresholds.normal || ratio < thresholds.large) return "";
    const sizePx = parseFloat(style.fontSize) || 0;
    const weightNum = parseInt(style.fontWeight, 10) || 400;
    const bold = weightNum >= BOLD_WEIGHT;
    const cutoff = bold ? 56 / 3 : 24;
    const cutoffText = bold ? "18.67px" : "24px";
    const nearCutoff = Math.abs(sizePx - cutoff) < 0.05;
    let shown = nearCutoff ? `${sizePx.toFixed(2)}px` : `${Math.round(sizePx * 10) / 10}px`;
    if (nearCutoff && parseFloat(shown) >= parseFloat(cutoffText)) shown = `just under ${cutoffText}`;
    if (bold && sizePx < 56 / 3) {
      return ` This text is bold at ${shown}; bold text counts as large scale from 18.67px (14pt), where the ${thresholds.large}:1 minimum would apply and these colours would pass.`;
    }
    if (!bold && sizePx >= 56 / 3 && sizePx < 24) {
      return ` At ${shown} regular weight this is not large scale; from 24px (18pt), or bold at this size, the ${thresholds.large}:1 minimum would apply and these colours would pass.`;
    }
    return "";
  };
  const rule = {
    id,
    impact: "serious",
    tags,
    help,
    helpUrl,
    // Every element except the ones whose text is judged elsewhere or isn't
    // CSS-colour text at all: a tag allow-list silently skipped visible text
    // in anything it forgot (form, center, font, custom elements — Hacker
    // News writes "Search:" directly inside <form>), and the own-text check
    // below keeps the empty wrappers out of the results either way. Form
    // controls stay out because control-contrast judges their text; SVG/MathML
    // stay out because their glyphs are painted by fill, not color.
    selector: "*:not(script):not(style):not(noscript):not(title):not(option):not(optgroup):not(input):not(textarea):not(select):not(svg):not(svg *):not(math):not(math *)",
    visibility: "visual",
    // contrast is seen by sighted users even in aria-hidden content
    async evaluate(element, { ownText }) {
      if (!ownText(element)) return { status: "pass" };
      if (inactiveComponentText(element)) return { status: "pass" };
      let styleSource = element;
      if (element.shadowRoot) {
        const ownTextNode = [...element.childNodes].find((node) => node.nodeType === 3 && node.textContent.trim());
        const slot = ownTextNode?.assignedSlot ?? null;
        if (!slot) return { status: "pass" };
        styleSource = slot;
      }
      const style = getComputedStyle(styleSource);
      const laidInline = style.display.startsWith("inline") || /flex|grid/.test(element.parentElement ? getComputedStyle(element.parentElement).display : "");
      if (SEPARATOR_GLYPHS.test(ownText(element)) && laidInline && !element.closest('code, pre, samp, kbd, var, a[href], button, [role="button"], [role="link"], [role="menuitem"], [role="tab"], [role="option"]')) {
        const hasContent = (start, dir) => {
          for (let node = start; node; node = node[dir]) {
            if (node.nodeType === 3 && node.textContent.trim()) return true;
            if (node.nodeType === 1 && (node.textContent.trim() || node.matches("img, svg, video, canvas, input, select, button"))) return true;
          }
          return false;
        };
        if (hasContent(element.previousSibling, "previousSibling") && hasContent(element.nextSibling, "nextSibling")) {
          return { status: "pass" };
        }
      }
      const control = element.closest('button, a[href], input, select, [role="button"], [role="link"], [role="option"], [role="tab"]');
      if (control && getComputedStyle(control).pointerEvents === "none" && unreachableControl(control)) {
        if ((control.textContent || "").trim().length <= 80) return { status: "pass" };
        return {
          status: "incomplete",
          message: "This text sits inside a non-interactive (pointer-events: none) control with substantial content \u2014 a disabled control's dimmed text is exempt from contrast, but an inactive content slide is not. Judge which this is by eye."
        };
      }
      const fill = parseColor(style.webkitTextFillColor);
      const clipsText = /\btext\b/.test(style.webkitBackgroundClip ?? "") || /\btext\b/.test(style.backgroundClip ?? "");
      if (clipsText) {
        const behind = effectiveBackground(element.parentElement ?? element);
        const fgRange = style.backgroundImage !== "none" ? sampledGradientRange(splitBackgroundLayers(style.backgroundImage)[0] ?? "") : null;
        if (fgRange && behind) {
          const required2 = isLargeText(style) ? thresholds.large : thresholds.normal;
          return verdictFromRange(fgRange, behind, required2, "gradient painting this text") ?? {
            status: "incomplete",
            message: "This text is painted with its background layer (background-clip: text) \u2014 contrast must be checked by eye."
          };
        }
        return {
          status: "incomplete",
          message: "This text is painted with its background layer (background-clip: text) \u2014 contrast must be checked by eye."
        };
      }
      let foreground = fill && style.webkitTextFillColor !== style.color ? fill : parseColor(style.color);
      if (textVisuallyHidden(element, style, foreground)) return { status: "pass" };
      if (!foreground) {
        return { status: "incomplete", message: "The text colour could not be parsed \u2014 check contrast by eye." };
      }
      let required = isLargeText(style) ? thresholds.large : thresholds.normal;
      const doc = element.ownerDocument;
      let foregroundOrigin = null;
      const baseForeground = foreground;
      const baseRequired = required;
      const alternates = pseudoTextColors(element, style).map(({ pseudo, color, style: pseudoStyle }) => ({
        origin: pseudo,
        color,
        required: isLargeText(pseudoStyle) ? thresholds.large : thresholds.normal
      }));
      const worstCandidate = (candidates, backdrop) => candidates.reduce((worst, candidate) => {
        const shown = candidate.color.a < 1 ? composite(candidate.color, backdrop) : candidate.color;
        const margin = contrastRatio(shown, backdrop) / candidate.required;
        return !worst || margin < worst.margin ? { ...candidate, margin } : worst;
      }, null);
      if (alternates.length) {
        const estimate = effectiveBackground(styleSource) ?? { r: 255, g: 255, b: 255, a: 1 };
        const pick = worstCandidate([{ origin: null, color: foreground, required }, ...alternates], estimate);
        foreground = pick.color;
        required = pick.required;
        foregroundOrigin = pick.origin;
      }
      const opacity = opacityAnimating(element) ? restingOpacity(element) : cumulativeOpacity(element);
      if (opacity < 0.05) return { status: "pass" };
      if (opacity < 1) {
        const groupEligible = (!style.textShadow || style.textShadow === "none") && !(pseudoBackdropForText(element)?.film > 0);
        const group = groupEligible ? opacityGroupPaint(element, foreground) : null;
        if (group?.unresolved) {
          return {
            status: "incomplete",
            message: `This text and its own background render together at ${Math.round(group.opacity * 100)}% opacity over an image or gradient, so the presented colours are a blend a script cannot resolve. Check the contrast by eye.`
          };
        }
        if (group) {
          const groupRatio = contrastRatio(group.foreground, group.background);
          const groupRect = element.getBoundingClientRect();
          const near = (r) => Math.min(groupRect.right, r.right) - Math.max(groupRect.left, r.left) >= 3 && Math.min(groupRect.bottom, r.bottom) - Math.max(groupRect.top, r.top) >= 3;
          const overMedia = mediaRects(doc).some(({ element: media, rect: mediaRect }) => near(mediaRect) && !media.contains(element) && !element.contains(media) && textIntersects(element, mediaRect));
          if (overMedia) {
            return {
              status: "incomplete",
              message: "This text overlaps an image or video, so its real background can\u2019t be computed \u2014 contrast must be checked by eye."
            };
          }
          const flipping = opaquePanelRects(doc).some(({ element: panel, rect: rect2, color }) => near(rect2) && !panel.contains(element) && !element.contains(panel) && textIntersects(element, rect2) && contrastRatio(composite(group.text, color), composite(group.paint, color)) >= required !== groupRatio >= required);
          if (flipping) {
            return {
              status: "incomplete",
              message: "This text overlaps a coloured block that isn\u2019t its DOM ancestor, so its real background is ambiguous \u2014 check contrast by eye."
            };
          }
          const groupPainted = paintedBackdrop(element);
          let groupScrim = groupPainted?.scrim ?? null;
          if (!groupScrim && groupPainted === "offscreen") {
            const veil = viewportVeil(doc);
            if (veil && !veil.contains(element)) groupScrim = [veil];
          }
          if (groupScrim) {
            const groupVeil = scrimPaint(groupScrim);
            if (!groupVeil) return veiledIncomplete();
            const veiledRatio = contrastRatio(applyOverlays(group.foreground, groupVeil), applyOverlays(group.background, groupVeil));
            if (veiledRatio >= required !== groupRatio >= required) return veiledIncomplete(groupRatio, veiledRatio);
          }
          if (groupRatio >= required) return { status: "pass" };
          if (!groupRect.width || !groupRect.height) return { status: "pass" };
          const groupFg = asRgb(group.foreground);
          const groupBg = asRgb(group.background);
          return {
            status: "fail",
            message: `Contrast is ${showRatio(groupRatio)}:1, below the ${required}:1 WCAG minimum for this text size.${largeScaleNoteFor(style, required, groupRatio)}`,
            fix: `Darken the text or lighten the background until the ratio reaches ${required}:1 (currently ${groupFg} on ${groupBg}).` + (style.color !== groupFg ? ` Your CSS writes the text as ${style.color}, so searching it for the sRGB values above won't find them.` : "") + ` The gap is opacity: this element or an ancestor renders at ${Math.round(group.opacity * 100)}% opacity, so the text and its own background are both blended toward what lies behind them, into the sRGB values above.`,
            data: {
              foreground: groupFg,
              background: groupBg,
              ratio: Number(showRatio(groupRatio)),
              required
            }
          };
        }
        foreground = { ...foreground, a: foreground.a * opacity };
      }
      const imageSource = backgroundImageSource(element);
      if (imageSource) {
        const { relation, intrinsic, dimensionless, isGradient, sizedSmall, paint } = await imageVsText(imageSource, element, doc);
        if (relation !== "clear") {
          const carrierBox = imageSource.element.getBoundingClientRect();
          const extent = paint ? extentOf(paint) : {
            width: Math.max(carrierBox.width, dimensionless ? 0 : intrinsic.width),
            height: Math.max(carrierBox.height, dimensionless ? 0 : intrinsic.height)
          };
          let sampled = await sampledVerdict(
            imageSource,
            foreground,
            required,
            doc,
            imageSource.overlays,
            paintUnderImage(imageSource.element),
            extent
          );
          if (sampled !== PAINTS_NOTHING) {
            if (sampled && unaccountedScrim(element, imageSource.element)) {
              sampled = {
                status: "incomplete",
                message: "This text sits over a background image with a translucent overlay painted on top of it (a pseudo-element or positioned scrim), so the colour behind the glyphs is the blend of the two \u2014 check the contrast by eye."
              };
            }
            const iconScale = isGradient ? sizedSmall || carrierBox.height <= 40 : dimensionless || intrinsic.width <= 32 && intrinsic.height <= 32 || carrierBox.height <= 40;
            if (sampled?.status === "fail" && iconScale) {
              return {
                status: "incomplete",
                message: "A small background icon is painted on this element \u2014 if it sits beside the text rather than under it, judge the contrast against the plain background by eye."
              };
            }
            return sampled ?? {
              status: "incomplete",
              message: "The background here is several stacked image or gradient layers, which a script can\u2019t sample. Contrast must be checked by eye."
            };
          }
        }
      }
      let background = effectiveBackground(styleSource);
      const painted = paintedBackdrop(element);
      let veilPaint = null;
      let scrimLayers = painted?.scrim ?? null;
      if (!scrimLayers && painted === "offscreen") {
        const veil = viewportVeil(doc);
        if (veil && !veil.contains(element)) scrimLayers = [veil];
      }
      if (scrimLayers) {
        veilPaint = scrimPaint(scrimLayers);
        if (!veilPaint) return veiledIncomplete();
      }
      const pseudoResolved = pseudoBackdropForText(element);
      const film = pseudoResolved?.film ?? 0;
      let pseudoBack = pseudoResolved?.color || pseudoResolved?.image ? pseudoResolved : null;
      let pseudoIconScale = false;
      if (pseudoBack?.image?.meta && pseudoBack.image.box) {
        const pseudoUrl = firstLayerUrl(pseudoBack.image.css);
        if (pseudoUrl && pseudoBack.image.meta.repeat === "no-repeat") {
          let pseudoIntrinsic = null;
          try {
            pseudoIntrinsic = await imageLuminanceRange(new URL(pseudoUrl, doc.baseURI).href);
          } catch {
          }
          const dimensionless = !pseudoIntrinsic || !pseudoIntrinsic.width || pseudoIntrinsic.width === 300 && pseudoIntrinsic.height === 150;
          const paint = imagePaintRectInBox(pseudoBack.image.box, pseudoBack.image.meta, dimensionless ? null : pseudoIntrinsic);
          if (paint && !paint.empty && !textIntersects(element, paint)) {
            pseudoBack = null;
          } else {
            pseudoIconScale = dimensionless || pseudoIntrinsic.width <= 32 && pseudoIntrinsic.height <= 32;
          }
        }
      }
      const filmIncomplete = {
        status: "incomplete",
        message: "A pseudo-element with its own background paints in this element's chain, but its position can't be computed \u2014 so whether it sits behind this text is unknown. Check the contrast by eye."
      };
      if (film > 0 && (pseudoBack?.image || painted?.image || painted === "unresolved" || veilPaint || style.textShadow && style.textShadow !== "none")) {
        return filmIncomplete;
      }
      if (veilPaint && (pseudoBack?.image || painted?.image)) return veiledIncomplete();
      if (pseudoBack?.image && pseudoBack.beyondPaint) {
        return {
          status: "incomplete",
          message: "An ancestor's pseudo-element paints an image or gradient where this text is, but other backgrounds sit between them \u2014 which one is behind the glyphs depends on paint order, so check the contrast by eye."
        };
      }
      if (pseudoBack?.image) {
        const sampled = await sampledVerdict(
          pseudoBack.image,
          foreground,
          required,
          doc,
          [],
          effectiveBackground(pseudoBack.image.element),
          extentOf(pseudoBack.image.box)
        );
        if (sampled !== PAINTS_NOTHING) {
          if (sampled?.status === "fail" && pseudoIconScale) {
            return {
              status: "incomplete",
              message: "A small icon is painted by a pseudo-element on this element \u2014 if it sits beside the text rather than under it, judge the contrast against the plain background by eye."
            };
          }
          return sampled ?? {
            status: "incomplete",
            message: "A pseudo-element paints an image or gradient behind this text, so its real background isn\u2019t the computed colour \u2014 contrast must be checked by eye."
          };
        }
      }
      if (painted?.image && !pseudoBack) {
        const sampled = await sampledVerdict(
          painted.image,
          foreground,
          required,
          doc,
          painted.overlays ?? [],
          null,
          extentOf(painted.image.getBoundingClientRect())
        );
        if (sampled !== PAINTS_NOTHING) {
          return sampled ?? {
            status: "incomplete",
            message: "An image or overlapping element is painted behind this text, so its real background isn\u2019t the computed colour \u2014 contrast must be checked by eye."
          };
        }
      }
      let backgroundVerified = false;
      if (painted?.color) {
        background = painted.color;
        backgroundVerified = true;
      } else if (painted === "unresolved") {
        const obscuring = backgroundObscured(element);
        if (obscuring && obscuring !== "unverifiable") {
          const sampled = await sampledVerdict(
            obscuring,
            foreground,
            required,
            doc,
            [],
            null,
            extentOf(obscuring.getBoundingClientRect())
          );
          if (sampled !== PAINTS_NOTHING) {
            return sampled ?? {
              status: "incomplete",
              message: "An image or overlapping element is painted behind this text, so its real background isn\u2019t the computed colour \u2014 contrast must be checked by eye."
            };
          }
        }
      }
      if (pseudoBack?.color && pseudoBack.beyondPaint) {
        const candidate = pseudoBack.color.a >= 1 || !background ? pseudoBack.color : composite(pseudoBack.color, background);
        if (!background) {
          return { status: "incomplete", message: "The background could not be determined \u2014 check contrast by eye." };
        }
        const overWalked = foreground.a < 1 ? composite(foreground, background) : foreground;
        const overPseudo = foreground.a < 1 ? composite(foreground, candidate) : foreground;
        if (contrastRatio(overWalked, background) >= required !== contrastRatio(overPseudo, candidate) >= required) {
          return {
            status: "incomplete",
            message: "An ancestor's pseudo-element paints where this text is, but other backgrounds sit between them \u2014 which colour is behind the glyphs depends on paint order, and the two candidates disagree on the verdict. Check the contrast by eye."
          };
        }
      } else if (pseudoBack?.color) {
        background = pseudoBack.color.a >= 1 || !background ? pseudoBack.color : composite(pseudoBack.color, background);
        backgroundVerified = true;
      }
      if (!background) {
        return { status: "incomplete", message: "The background could not be determined \u2014 check contrast by eye." };
      }
      if (alternates.length) {
        const dim2 = (color) => opacity < 1 ? { ...color, a: color.a * opacity } : color;
        const base = { origin: null, color: dim2(baseForeground), required: baseRequired };
        const pick = worstCandidate([base, ...alternates.map((a) => ({ ...a, color: dim2(a.color) }))], background);
        foreground = pick.color;
        required = pick.required;
        foregroundOrigin = pick.origin;
      }
      if (foreground.a < 1) foreground = composite(foreground, background);
      const backdropHazard = (direction, blindOnly) => {
        const ownPaint = parseColor(style.backgroundColor);
        if (ownPaint && ownPaint.a >= 1) return null;
        const box = element.getBoundingClientRect();
        const near = (r) => Math.min(box.right, r.right) - Math.max(box.left, r.left) >= 3 && Math.min(box.bottom, r.bottom) - Math.max(box.top, r.top) >= 3;
        const overMedia = mediaRects(doc).some(({ element: media, rect: mediaRect, hitTestBlind }) => (!blindOnly || hitTestBlind) && near(mediaRect) && !media.contains(element) && !element.contains(media) && textIntersects(element, mediaRect));
        if (overMedia) {
          return {
            status: "incomplete",
            message: "This text overlaps an image or video, so its real background can\u2019t be computed \u2014 contrast must be checked by eye."
          };
        }
        const flipping = opaquePanelRects(doc).some(({ element: panel, rect: rect2, color, hitTestBlind }) => (!blindOnly || hitTestBlind) && near(rect2) && !panel.contains(element) && !element.contains(panel) && textIntersects(element, rect2) && contrastRatio(foreground, color) >= required !== (direction === "pass"));
        if (flipping) {
          return {
            status: "incomplete",
            message: "This text overlaps a coloured block that isn\u2019t its DOM ancestor, so its real background is ambiguous \u2014 check contrast by eye."
          };
        }
        if (!blindOnly) {
          let outOfFlow = false;
          let block = null;
          for (let node = element; node && node.nodeType === 1 && node !== doc.body; node = node.parentElement ?? node.getRootNode()?.host) {
            const position = getComputedStyle(node).position;
            if (node !== element && position !== "static") {
              block = node;
              break;
            }
            if (position === "absolute" || position === "fixed") outOfFlow = true;
          }
          if (outOfFlow && block) {
            const inside = block.querySelectorAll("*");
            if (inside.length <= 2e3) {
              for (const sibling of inside) {
                if (sibling === element || sibling.contains(element) || element.contains(sibling)) continue;
                const siblingStyle = getComputedStyle(sibling);
                if (siblingStyle.position !== "static" || siblingStyle.visibility === "hidden") continue;
                const paint = parseColor(siblingStyle.backgroundColor);
                if (!paint || paint.a < 1) continue;
                const siblingRect = sibling.getBoundingClientRect();
                if (siblingRect.width < 24 || siblingRect.height < 12 || !near(siblingRect) || !textIntersects(element, siblingRect)) continue;
                if (contrastRatio(foreground, paint) >= required !== (direction === "pass")) {
                  return {
                    status: "incomplete",
                    message: "This text is positioned over a coloured box that isn\u2019t its DOM ancestor, so its real background is ambiguous \u2014 check contrast by eye."
                  };
                }
              }
            }
          }
        }
        return null;
      };
      const ratio = contrastRatio(foreground, background);
      if (film > 0) {
        const bounds = filmedContrastBounds(foreground, background, film);
        const decided = bounds.min >= required === bounds.max >= required && !(bounds.crossed && bounds.min >= required);
        if (!decided) return filmIncomplete;
      }
      const veiled = (fg, bg) => contrastRatio(applyOverlays(fg, veilPaint), applyOverlays(bg, veilPaint));
      if (veilPaint) {
        const veiledRatio = veiled(foreground, background);
        if (veiledRatio >= required !== ratio >= required) {
          return veiledIncomplete(ratio, veiledRatio);
        }
      }
      if (ratio >= required) {
        return backdropHazard("pass", backgroundVerified) ?? { status: "pass" };
      }
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return { status: "pass" };
      {
        const win = doc.defaultView;
        if (win && getComputedStyle(doc.documentElement).direction !== "rtl" && (rect.right + win.scrollX <= 0 || rect.bottom + win.scrollY <= 0)) {
          return { status: "pass" };
        }
      }
      if (style.textShadow && style.textShadow !== "none") {
        const fontSize = parseFloat(style.fontSize) || 16;
        const halo = textShadowHalo(style.textShadow, fontSize);
        if (halo) {
          const haloRatio = contrastRatio(foreground, halo);
          if (veilPaint) {
            const veiledHalo = veiled(foreground, halo);
            if (veiledHalo >= required !== haloRatio >= required) {
              return veiledIncomplete(haloRatio, veiledHalo);
            }
          }
          if (haloRatio >= required) return { status: "pass" };
          return {
            status: "fail",
            message: `Contrast is ${showRatio(haloRatio)}:1 against this text's own outline and ${showRatio(ratio)}:1 against the background \u2014 below the ${required}:1 WCAG minimum for this text size.`,
            fix: `Increase the difference between the text colour and its text-shadow outline (or the background) until the ratio reaches ${required}:1.`,
            data: {
              // The judged (composited) colour, not style.color: the checker
              // link must score the pair the viewer actually sees.
              foreground: asRgb(foreground),
              background: asRgb(halo),
              ratio: Number(showRatio(haloRatio)),
              required
            }
          };
        }
        if (!textShadowNegligible(style.textShadow, fontSize)) {
          return {
            status: "incomplete",
            message: `Contrast against the background is ${showRatio(ratio)}:1, but this text has a text-shadow \u2014 if the shadow forms a solid halo, contrast may be measured against it instead. Check by eye.`
          };
        }
      }
      if (Math.round(foreground.r) === Math.round(background.r) && Math.round(foreground.g) === Math.round(background.g) && Math.round(foreground.b) === Math.round(background.b)) {
        return {
          status: "incomplete",
          message: "This text is exactly the same colour as its background \u2014 invisible. If that's a hiding technique for screen-reader-only labels, use the clip pattern instead; if the text is meant to be seen, this is a serious defect."
        };
      }
      if (coveredByTextTwin(element)) return { status: "pass" };
      {
        const hazard = backdropHazard("fail", backgroundVerified);
        if (hazard) return hazard;
      }
      const foregroundRgb = asRgb(foreground);
      const backgroundRgb = asRgb(background);
      const sameValue = (css, judged) => {
        const parsed = parseColor(css);
        return parsed != null && parsed.a >= 1 && asRgb(parsed) === judged;
      };
      const authoredFg = !foregroundOrigin && style.color !== foregroundRgb ? style.color : null;
      const pseudoNote = foregroundOrigin ? ` The judged text colour comes from a ${foregroundOrigin} rule on this element, which paints that part of the text in place of its color.` : "";
      const backgroundSource = backgroundColorSource(element);
      const authoredBg = backgroundSource && backgroundSource !== backgroundRgb ? backgroundSource : null;
      const foregroundCss = authoredFg && sameValue(authoredFg, foregroundRgb) ? authoredFg : null;
      const backgroundCss = authoredBg && sameValue(authoredBg, backgroundRgb) ? authoredBg : null;
      const authored = [
        authoredFg && `the text as ${authoredFg}`,
        authoredBg && `the background as ${authoredBg}`
      ].filter(Boolean).join(" and ");
      const parsedAuthoredFg = authoredFg && !foregroundCss ? parseColor(authoredFg) : null;
      const dimmedNote = parsedAuthoredFg ? opacity < 1 ? ` The gap is opacity: this element or an ancestor renders at ${Math.round(opacity * 100)}% opacity, dimming the text to the sRGB value above.` : parsedAuthoredFg.a < 1 ? " The text colour is translucent, so it composites with the background into the sRGB value above." : "" : "";
      const largeScaleNote = largeScaleNoteFor(style, required, ratio);
      return {
        status: "fail",
        message: `Contrast is ${showRatio(ratio)}:1 \u2014 below the ${required}:1 WCAG minimum for this text size.${largeScaleNote}`,
        fix: `Darken the text or lighten the background until the ratio reaches ${required}:1 (currently ${foregroundRgb} on ${backgroundRgb}).` + (authored ? ` Your CSS writes ${authored}, so searching it for the sRGB values above won't find them.` : "") + dimmedNote + pseudoNote,
        // The exact pair, for the UIs to link out to an interactive checker.
        data: {
          foreground: foregroundRgb,
          background: backgroundRgb,
          ...foregroundCss ? { foregroundCss } : {},
          ...backgroundCss ? { backgroundCss } : {},
          ratio: Number(showRatio(ratio)),
          required
        }
      };
    }
  };
  const judge = rule.evaluate.bind(rule);
  rule.evaluate = async (element, helpers) => {
    const verdict = await judge(element, helpers);
    if (verdict.status === "fail" && element.closest('[aria-hidden="true"]')) {
      verdict.message += " aria-hidden hides this from screen readers, not from sighted users; contrast is judged for the people who see it.";
    }
    return verdict;
  };
  return rule;
}
var color_contrast_default = createContrastRule({
  id: "color-contrast",
  name: "Text contrast",
  tags: ["wcag2aa", "wcag143"],
  help: "Text must have sufficient contrast against its background",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
  thresholds: { normal: 4.5, large: 3 }
});

// src/engine/rules/wcag/4.1.2-frame-title.js
var frame_title_default = {
  id: "frame-title",
  name: "Frame titles",
  impact: "serious",
  tags: ["wcag2a", "wcag412"],
  help: "Frames must have a title describing their content",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: "iframe, frame",
  evaluate(element, { accessibleName: accessibleName2 }) {
    if (element.getAttribute("title")?.trim() || accessibleName2(element)) return { status: "pass" };
    return {
      status: "fail",
      message: "This frame has no title \u2014 screen-reader users cannot tell what it contains before entering it.",
      fix: `Add title="\u2026" describing the embedded content, e.g. <iframe title="Newsletter signup" src="${element.getAttribute("src") ?? ""}">.`
    };
  }
};

// src/engine/rules/wcag/4.1.2-aria-valid-refs.js
var REF_ATTRIBUTES = [
  "aria-labelledby",
  "aria-describedby",
  "aria-controls",
  "aria-activedescendant",
  "aria-owns",
  "aria-errormessage",
  "aria-details"
];
var WIDGET_ROLES = /* @__PURE__ */ new Set([
  // ARIA 1.2 widget roles
  "button",
  "checkbox",
  "gridcell",
  "link",
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio",
  "option",
  "progressbar",
  "radio",
  "scrollbar",
  "searchbox",
  "separator",
  "slider",
  "spinbutton",
  "switch",
  "tab",
  "tabpanel",
  "textbox",
  "treeitem",
  // ARIA 1.2 composite widget roles
  "combobox",
  "grid",
  "listbox",
  "menu",
  "menubar",
  "radiogroup",
  "tablist",
  "tree",
  "treegrid",
  // window roles: a dialog is operated as one thing, and dialog-name asserts on it anyway
  "dialog",
  "alertdialog"
]);
var NATIVE_CONTROLS = 'a[href], button, input:not([type="hidden"]), select, textarea, summary, audio[controls], video[controls], [contenteditable="true"]';
function nativeName(element) {
  const tag = element.tagName.toLowerCase();
  if (tag === "img" || tag === "area") return element.getAttribute("alt")?.trim() ?? "";
  const child = { svg: "title", table: "caption", fieldset: "legend", figure: "figcaption" }[tag];
  if (!child) return "";
  return [...element.children].find((c) => c.tagName.toLowerCase() === child)?.textContent.trim() ?? "";
}
function isUserInterfaceComponent(element) {
  if (element.matches(NATIVE_CONTROLS)) return true;
  if (WIDGET_ROLES.has(effectiveRole(element))) return true;
  return element.tabIndex >= 0;
}
function inspect(element) {
  const root = element.getRootNode();
  const collapsed = element.getAttribute("aria-expanded") === "false";
  const missing = [];
  const ambiguous = [];
  for (const attr of REF_ATTRIBUTES) {
    for (const id of (element.getAttribute(attr) ?? "").split(/\s+/).filter(Boolean)) {
      if (!root.getElementById?.(id)) {
        if (attr === "aria-controls" && collapsed) continue;
        missing.push({ attr, id });
        continue;
      }
      const count2 = root.querySelectorAll(`[id="${CSS.escape(id)}"]`).length;
      if (count2 > 1) {
        ambiguous.push(`${attr}="${id}" \u2014 ${count2} elements share this id; the reference binds to the FIRST one in the DOM`);
      }
    }
  }
  return { missing, ambiguous };
}
function outcome({ missing, ambiguous }, element, accessibleName2) {
  if (missing.length) {
    const component = isUserInterfaceComponent(element);
    const restingName = component ? (accessibleName2?.(element) ?? "").trim() : (labelledByName(element) || element.getAttribute("aria-label") || nativeName(element) || element.getAttribute("title") || "").trim();
    const relevant = missing.filter(({ attr }) => !(attr === "aria-labelledby" && restingName));
    if (!relevant.length) return { status: "pass" };
    const line = ({ attr, id }) => attr === "aria-labelledby" ? `aria-labelledby="${id}" points to nothing and leaves this element without an accessible name` : `${attr}="${id}" points to nothing \u2014 assistive technology silently ignores it`;
    const asserted = relevant.filter(({ attr }) => attr !== "aria-describedby" && (attr !== "aria-labelledby" || component));
    if (asserted.length) {
      return {
        status: "fail",
        message: `Broken ARIA references: ${relevant.map(line).join("; ")}.`,
        fix: "Correct or remove the reference, or give the target element that id."
      };
    }
    const unnamed = relevant.filter(({ attr }) => attr === "aria-labelledby");
    if (unnamed.length) {
      const tag = element.tagName.toLowerCase();
      return {
        status: "incomplete",
        message: `${unnamed.map(({ id }) => `aria-labelledby="${id}" points to nothing`).join("; ")}, so this <${tag}> has no accessible name. It is not a user interface component, so 4.1.2 does not require one, but the reference was meant to label it: correct it, or remove it if the label was never needed.`,
        fix: "Correct or remove the reference, or give the target element that id."
      };
    }
    return {
      status: "incomplete",
      message: `${relevant.map(line).join("; ")} at rest. The element keeps its name and role, so this is not a proven 4.1.2 failure: if the description is created when the element is hovered or focused (a tooltip library), this works; otherwise correct the reference.`,
      fix: "Correct or remove the reference, or give the target element that id."
    };
  }
  if (ambiguous.length) {
    return {
      status: "incomplete",
      message: `Ambiguous ARIA references: ${ambiguous.join("; ")}. If the first copy in the DOM is the intended target, this works today \u2014 but it's fragile.`
    };
  }
  return { status: "pass" };
}
var aria_valid_refs_default = {
  id: "aria-valid-refs",
  name: "ARIA id references",
  // Moderate, not critical: with 4.1.1 Parsing retired in WCAG 2.2 these
  // are 4.1.2 name/state defects, and aria-controls in particular has weak
  // assistive-technology support — real, but rarely blocking.
  impact: "moderate",
  tags: ["wcag2a", "wcag412"],
  help: "ARIA id references must point to elements that exist",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: REF_ATTRIBUTES.map((attr) => `[${attr}]`).join(", "),
  evaluate(element, { accessibleName: accessibleName2 } = {}) {
    return outcome(inspect(element), element, accessibleName2);
  }
};

// src/engine/rules/wcag/4.1.2-valid-role.js
var VALID_ROLES = /* @__PURE__ */ new Set([
  "alert",
  "alertdialog",
  "application",
  "article",
  "banner",
  "blockquote",
  "button",
  "caption",
  "cell",
  "checkbox",
  "code",
  "columnheader",
  "combobox",
  "complementary",
  "contentinfo",
  "definition",
  "deletion",
  "dialog",
  "directory",
  "document",
  "emphasis",
  "feed",
  "figure",
  "form",
  "generic",
  "grid",
  "gridcell",
  "group",
  "heading",
  "img",
  "insertion",
  "link",
  "list",
  "listbox",
  "listitem",
  "log",
  "main",
  "marquee",
  "math",
  "menu",
  "menubar",
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio",
  "meter",
  "navigation",
  "none",
  "note",
  "option",
  "paragraph",
  "presentation",
  "progressbar",
  "radio",
  "radiogroup",
  "region",
  "row",
  "rowgroup",
  "rowheader",
  "scrollbar",
  "search",
  "searchbox",
  "separator",
  "slider",
  "spinbutton",
  "status",
  "strong",
  "subscript",
  "superscript",
  "switch",
  "tab",
  "table",
  "tablist",
  "tabpanel",
  "term",
  "textbox",
  "time",
  "timer",
  "toolbar",
  "tooltip",
  "tree",
  "treegrid",
  "treeitem",
  // ARIA 1.3 additions. `image` is the spec's own primary spelling with
  // `img` kept as the synonym — img is the one ARIA role that isn't a whole
  // word, which is why authors reach for `image`, and Safari (2021),
  // Firefox (116) and Chromium all map it. Flagging it was a false positive
  // on real sites; verified against Chromium's accessibility tree, where
  // role="image" resolves to image and only a genuinely bogus role falls
  // back to generic.
  "image",
  "comment",
  "mark",
  "suggestion"
]);
function editDistance(a, b) {
  const rows = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) rows[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      rows[i][j] = Math.min(
        rows[i - 1][j] + 1,
        rows[i][j - 1] + 1,
        rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return rows[a.length][b.length];
}
function nearestRole(tokens) {
  let best = null;
  let bestDistance = 3;
  for (const token of tokens) {
    const t = token.toLowerCase();
    for (const role of VALID_ROLES) {
      if (Math.abs(role.length - t.length) > 2) continue;
      const distance = editDistance(t, role);
      if (distance > 0 && distance < bestDistance) {
        best = role;
        bestDistance = distance;
      }
    }
  }
  return best;
}
var valid_role_default = {
  id: "valid-role",
  name: "Valid roles",
  impact: "critical",
  tags: ["wcag2a", "wcag412"],
  help: "role attributes must use valid ARIA roles",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: "[role]",
  evaluate(element) {
    const tokens = element.getAttribute("role").trim().split(/\s+/).filter(Boolean);
    const isValid = (token) => {
      const t = token.toLowerCase();
      return VALID_ROLES.has(t) || t.startsWith("doc-") || t.startsWith("graphics-");
    };
    if (tokens.some(isValid)) return { status: "pass" };
    const tag = element.tagName.toLowerCase();
    const nearest = nearestRole(tokens);
    const hint = nearest ? ` (did you mean role="${nearest}"?)` : "";
    const fix = nearest ? `Correct the spelling to role="${nearest}", or remove the attribute to keep the element\u2019s native role.` : "Use a valid role from the ARIA specification, or remove the attribute to keep the element\u2019s native role.";
    const genericFallback = tag === "div" || tag === "span" || tag === "svg";
    const focusable = element.tabIndex >= 0 || element.matches("a[href], button, input, select, textarea, summary");
    const hasAriaProps = [...attributesOf(element)].some(
      (attr) => attr.name.startsWith("aria-") && attr.name !== "aria-hidden"
    );
    if (genericFallback && !focusable && !hasAriaProps) return { status: "pass" };
    if (!focusable && !hasAriaProps) {
      return {
        status: "incomplete",
        message: `role="${element.getAttribute("role")}" is not a valid ARIA role${hint}, so assistive technology ignores it and exposes the element's native <${tag}> semantics. Nothing is announced wrongly, but the author reached for a role that does not exist. Is the native <${tag}> role the right one here? If a different role was intended, that role is missing.`,
        fix
      };
    }
    return {
      status: "fail",
      message: `role="${element.getAttribute("role")}" is not a valid ARIA role${hint}, so assistive technology ignores it${genericFallback ? "" : ` and falls back to the element\u2019s native <${tag}> semantics`}.`,
      fix
    };
  }
};

// src/engine/rules/wcag/4.1.2-aria-hidden-focus.js
var FOCUSABLE = 'a[href], area[href], button, input, select, textarea, summary, iframe, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]';
var aria_hidden_focus_default = {
  id: "aria-hidden-focus",
  name: "Focusable hidden content",
  impact: "serious",
  tags: ["wcag2a", "wcag412"],
  help: 'Nothing focusable may sit inside aria-hidden="true"',
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: '[aria-hidden="true"]',
  visibleOnly: false,
  // these elements are hidden from AT by definition
  evaluate(element, { isRendered }) {
    const focusable = [element, ...element.querySelectorAll(FOCUSABLE)].filter(
      (el) => el.matches?.(FOCUSABLE) && !(el.hasAttribute("tabindex") && el.tabIndex < 0) && !el.matches(":disabled") && !el.closest("[inert]") && isRendered(el) && cumulativeOpacity(el) > 0
    );
    if (!focusable.length) return { status: "pass" };
    const doc = element.ownerDocument;
    let modal = null;
    try {
      modal = doc.querySelector("dialog:modal");
    } catch {
    }
    modal ??= [...doc.querySelectorAll('[aria-modal="true"]')].find(isRendered) ?? null;
    if (modal && !element.contains(modal) && !modal.contains(element)) {
      return {
        status: "incomplete",
        message: `This aria-hidden element contains ${focusable.length} focusable element(s) while a modal dialog is open \u2014 fine if the modal traps keyboard focus, a failure if Tab can reach them. Check the trap by keyboard.`
      };
    }
    return {
      status: "fail",
      message: `This aria-hidden element contains ${focusable.length} focusable element(s) \u2014 keyboard users can Tab into content that screen readers cannot see.`,
      fix: 'Add tabindex="-1" (or disabled) to focusable elements inside aria-hidden regions, or remove aria-hidden.'
    };
  }
};

// src/engine/rules/wcag/1.3.1-list-structure.js
var ITEM_ROLES = ["listitem", "presentation", "none"];
var list_structure_default = {
  id: "list-structure",
  name: "List structure",
  impact: "serious",
  tags: ["wcag2a", "wcag131"],
  help: "Lists must only contain list items",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
  selector: "ul, ol",
  evaluate(element, { isRendered }) {
    if (element.hasAttribute("role") && element.getAttribute("role") !== "list") return { status: "pass" };
    const effectiveChildren = (parent) => [...parent.children].flatMap((child) => child.tagName === "SLOT" ? child.assignedElements?.().length ? child.assignedElements() : [...child.children] : [child]);
    const isValidChild = (child) => {
      if (NEVER_RENDERED.has(child.tagName)) return true;
      if (isRendered && !isRendered(child)) return true;
      const role = child.getAttribute("role") ?? "";
      if (child.tagName === "LI") return !role || ITEM_ROLES.includes(role);
      if (ITEM_ROLES.includes(role)) return true;
      const genericWrapper = !child.hasAttribute("role") && (child.tagName === "DIV" || child.tagName === "SPAN");
      if (!genericWrapper) return false;
      const hasStrayText = [...child.childNodes].some(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
      );
      return !hasStrayText && effectiveChildren(child).every(isValidChild);
    };
    const invalid = effectiveChildren(element).filter((child) => !isValidChild(child));
    if (!invalid.length) {
      const renderedItems = effectiveChildren(element).filter((child) => child.tagName === "LI" && (!isRendered || isRendered(child)));
      const neutralised = renderedItems.filter((child) => ["presentation", "none"].includes(child.getAttribute("role") ?? ""));
      if (renderedItems.length && neutralised.length === renderedItems.length) {
        return {
          status: "fail",
          message: `Every item in this list carries role="${neutralised[0].getAttribute("role")}", so the list announces itself with zero items while ${renderedItems.length} are visible \u2014 screen readers lose the count and the positions.`,
          fix: 'Remove the role from the <li> elements, or neutralise the whole structure by putting role="presentation" (or the intended widget role) on the list element itself.'
        };
      }
      return { status: "pass" };
    }
    const tags = [...new Set(invalid.map((child) => {
      const role = child.getAttribute("role");
      return `<${child.tagName.toLowerCase()}${role ? ` role="${role}"` : ""}>`;
    }))].join(", ");
    return {
      status: "fail",
      message: `This list has ${invalid.length} direct child(ren) without listitem semantics (${tags}) \u2014 screen readers misreport the list's size and structure.`,
      fix: 'Use plain <li> children (an explicit role like role="group" replaces the listitem role), or move non-item elements outside the list.'
    };
  }
};

// src/engine/rules/wcag/4.1.2-nested-interactive.js
var INTERACTIVE = 'a[href], button, input, select, textarea, summary, audio[controls], video[controls], [role="button"], [role="link"], [role="checkbox"], [role="radio"], [role="switch"], [role="menuitem"], [role="tab"], [role="option"]';
var nested_interactive_default = {
  id: "nested-interactive",
  name: "Nested controls",
  impact: "serious",
  tags: ["wcag2a", "wcag412"],
  help: "A control must not contain another control",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: INTERACTIVE,
  evaluate(element, { isRendered }) {
    const NATIVE = "a[href], button, input, select, textarea, summary, audio[controls], video[controls]";
    const nested = [...element.querySelectorAll(INTERACTIVE)].find((el) => !el.matches(":disabled") && !(el.hasAttribute("tabindex") && el.tabIndex < 0) && !(el.tagName === "INPUT" && el.type === "hidden") && isRendered(el) && !el.closest('[aria-hidden="true"]') && (el.matches(NATIVE) || el.hasAttribute("tabindex")));
    if (!nested) return { status: "pass" };
    if (element.tagName === "SUMMARY") {
      return {
        status: "incomplete",
        message: `This summary contains another interactive element (<${nested.tagName.toLowerCase()}>). HTML allows it and both controls keep their name and role, but the disclosure and the control inside it are separate keyboard stops in one label. Check that activating each does what a user expects.`
      };
    }
    return {
      status: "fail",
      message: `This ${element.tagName.toLowerCase()} contains another interactive element (<${nested.tagName.toLowerCase()}>) \u2014 focus order and announcements become unpredictable.`,
      fix: "Restructure so interactive elements are siblings, not ancestors of each other."
    };
  }
};

// src/engine/rules/wcag/2.4.1-bypass-blocks.js
var NAMED_ONLY = /* @__PURE__ */ new Set(["form", "region"]);
var LANDMARK_CANDIDATES = "main, header, footer, nav, aside, section, form, [role]";
var hasName = (el) => Boolean(
  el.getAttribute("aria-label")?.trim() || el.getAttribute("aria-labelledby")?.trim() || el.getAttribute("title")?.trim()
);
var isLandmark = (el) => {
  const role = effectiveRole(el);
  return LANDMARK_ROLES.has(role) && (!NAMED_ONLY.has(role) || hasName(el));
};
var bypass_blocks_default = {
  id: "bypass-blocks",
  name: "Skip to content",
  impact: "serious",
  tags: ["wcag2a", "wcag241"],
  help: "The page must offer a way to skip repeated blocks",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html",
  selector: "html",
  visibleOnly: false,
  evaluate(element, { isRendered }) {
    if (isEmbeddedDocument(element.ownerDocument)) return { status: "pass" };
    const doc = element.ownerDocument;
    const roots = collectRoots(doc);
    const inAnyRoot = (selector) => roots.some((root) => root.querySelector?.(selector));
    if (roots.some((root) => [...root.querySelectorAll?.(LANDMARK_CANDIDATES) ?? []].some(isLandmark))) {
      return { status: "pass" };
    }
    if (inAnyRoot('h1, h2, h3, h4, h5, h6, [role="heading"]')) return { status: "pass" };
    for (const root of roots) {
      for (const link of root.querySelectorAll?.('a[href^="#"]') ?? []) {
        const id = link.getAttribute("href").slice(1);
        if (!id) continue;
        if (isRendered && !isRendered(link)) continue;
        if (roots.some((r) => r.getElementById?.(id) || r.querySelector?.(`[id="${CSS.escape(id)}"]`))) {
          return { status: "pass" };
        }
      }
    }
    const frames = [...doc.querySelectorAll("iframe, frame") ?? []];
    if (frames.length && frames.every((frame) => frame.getAttribute("title")?.trim())) {
      return { status: "pass" };
    }
    const linkCount = roots.reduce((n, root) => n + (root.querySelectorAll?.("a[href], button").length ?? 0), 0);
    if (linkCount < 4) return { status: "pass" };
    return {
      status: "fail",
      message: `This page has ${linkCount} links and buttons but no landmark, heading, skip link, or titled frame \u2014 keyboard and screen-reader users must go through the whole header and nav to reach anything.`,
      fix: 'Add a skip link like <a href="#content">Skip to content</a>, wrap primary content in <main>, or structure the page with headings.'
    };
  }
};

// src/engine/rules/wcag/2.5.8-target-size.js
var TARGETS = 'a[href], button, input, select, [role="button"], [role="link"]';
function isHiddenFromPointer(element, rect) {
  if (rect.width <= 1 || rect.height <= 1) return true;
  if (rect.right <= 0 || rect.bottom <= 0) return true;
  const win = element.ownerDocument.defaultView;
  const scroller = element.ownerDocument.scrollingElement ?? element.ownerDocument.documentElement;
  if (win && scroller) {
    if (rect.left + win.scrollX >= scroller.scrollWidth - 1) return true;
    if (rect.top + win.scrollY >= scroller.scrollHeight - 1) return true;
  }
  const style = getComputedStyle(element);
  if ((parseFloat(style.opacity) || 0) === 0) return true;
  if (style.clipPath !== "none" || style.clip !== "auto" && style.position === "absolute") return true;
  return false;
}
function reachableRects(element, rect) {
  const doc = element.ownerDocument;
  const win = doc.defaultView;
  if (!win || typeof doc.elementsFromPoint !== "function") return [rect];
  const fragments = [...element.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
  const probes = fragments.length ? fragments : [rect];
  const reachable = [];
  let testable = false;
  for (const fragment of probes) {
    const x = fragment.left + fragment.width / 2;
    const y = fragment.top + fragment.height / 2;
    if (x < 0 || y < 0 || x >= win.innerWidth || y >= win.innerHeight) continue;
    const stack = doc.elementsFromPoint(x, y);
    const index = stack.indexOf(element);
    if (index < 0) {
      if (element.getRootNode() === doc) testable = true;
      continue;
    }
    testable = true;
    if (stack.slice(0, index).every((layer) => layer.contains(element) || element.contains(layer))) {
      reachable.push(fragment);
    }
  }
  if (!testable) return probes;
  return reachable;
}
function textOutsideTargets(element) {
  for (const node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return true;
    if (node.nodeType === Node.ELEMENT_NODE && !node.matches(TARGETS) && textOutsideTargets(node)) return true;
  }
  return false;
}
function isInTextLine(element) {
  let node = element;
  while (node && getComputedStyle(node).display.startsWith("inline")) {
    for (const sibling of node.parentNode?.childNodes ?? []) {
      if (sibling === node) continue;
      if (sibling.nodeType === Node.TEXT_NODE && sibling.textContent.trim()) return true;
      if (sibling.nodeType === Node.ELEMENT_NODE && !sibling.matches(TARGETS) && textOutsideTargets(sibling) && getComputedStyle(sibling).display.startsWith("inline")) return true;
    }
    node = node.parentElement;
  }
  return false;
}
var NATIVE_CONTROL = /^(button|input|select|textarea)$/i;
var SIZING = /^(width|height|(min|max)-(width|height|inline-size|block-size)|inline-size|block-size|padding(-.+)?|border(-.+)?|font(-.+)?|line-height|box-sizing|transform|scale|zoom|appearance|all)$/;
var sizingRulesByRoot = /* @__PURE__ */ new WeakMap();
function declaresSizing(style) {
  for (let k = 0; k < style.length; k++) if (SIZING.test(style[k])) return true;
  return false;
}
function authorSizingRules(root) {
  const sheets = [...root.styleSheets ?? [], ...root.adoptedStyleSheets ?? []];
  const key = sheets.map((s) => {
    try {
      return s.cssRules.length;
    } catch {
      return "x";
    }
  }).join(",");
  const cached = sizingRulesByRoot.get(root);
  if (cached?.key === key) return cached;
  const win = (root.ownerDocument ?? root).defaultView;
  const probe2 = (root.ownerDocument ?? root).createElement("div");
  const entry = { key, selectors: [], open: false };
  const walk = (rules, parent) => {
    for (const rule of rules) {
      if (rule.media && win?.matchMedia && !win.matchMedia(rule.media.mediaText).matches) continue;
      let selector = rule.selectorText ?? parent;
      if (parent && rule.selectorText) {
        selector = /&/.test(selector) ? selector.replace(/&/g, `:is(${parent})`) : `:is(${parent}) ${selector}`;
      }
      if (selector && rule.style && declaresSizing(rule.style)) {
        try {
          probe2.matches(selector);
          entry.selectors.push(selector);
        } catch {
          entry.open = true;
        }
      }
      if (rule.cssRules?.length) walk(rule.cssRules, rule.selectorText ? selector : parent);
    }
  };
  for (const sheet of sheets) {
    try {
      walk(sheet.cssRules, null);
    } catch {
      entry.open = true;
    }
  }
  entry.combined = entry.selectors.join(", ");
  sizingRulesByRoot.set(root, entry);
  return entry;
}
function uaSized(element) {
  if (!NATIVE_CONTROL.test(element.tagName) || element.type === "image") return "no";
  if (declaresSizing(element.style)) return "no";
  const entry = authorSizingRules(element.getRootNode());
  if (entry.combined && element.matches(entry.combined)) return "no";
  return entry.open ? "open" : "yes";
}
function pointToRectDistance(point, rect) {
  const dx = Math.max(rect.left - point.x, 0, point.x - rect.right);
  const dy = Math.max(rect.top - point.y, 0, point.y - rect.bottom);
  return Math.hypot(dx, dy);
}
function createTargetSizeRule({ id, tags, help, helpUrl, min, spacingException }) {
  const px2 = (v) => {
    if (!(Math.round(v) >= min && v < min)) return String(Math.round(v));
    for (const digits of [1, 2]) {
      const shown = v.toFixed(digits);
      if (Number(shown) < min) return shown;
    }
    return `just under ${min}`;
  };
  return {
    id,
    impact: "serious",
    tags,
    help,
    helpUrl,
    selector: 'button, a[href], input:not([type="hidden"]), select, [role="button"], [role="link"]',
    visibility: "visual",
    // pointer targets are visual regardless of aria-hidden
    // Judged as a set: the spacing exception needs the other targets' positions.
    evaluateAll(elements) {
      const targetRect = (element) => {
        const rect = element.getBoundingClientRect();
        const label2 = element.labels?.[0];
        if (!label2) return rect;
        const labelRect = label2.getBoundingClientRect();
        if (!labelRect.width || !labelRect.height) return rect;
        const left = Math.min(rect.left, labelRect.left);
        const top = Math.min(rect.top, labelRect.top);
        const right = Math.max(rect.right, labelRect.right);
        const bottom = Math.max(rect.bottom, labelRect.bottom);
        return { left, top, right, bottom, width: right - left, height: bottom - top };
      };
      const uaControlled = (element) => element.tagName === "INPUT" && (element.type === "checkbox" || element.type === "radio") && getComputedStyle(element).appearance !== "none";
      const rects = elements.map(targetRect);
      const centers = rects.map((r) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 }));
      const layoutSkipped = (element) => {
        try {
          return typeof element.checkVisibility === "function" && element.checkVisibility({ visibilityProperty: true }) && !element.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true });
        } catch {
          return false;
        }
      };
      const laidOut = rects.map((r, i) => r.width > 0 && r.height > 0 && !isInert(elements[i]) && !isHiddenFromPointer(elements[i], r) && !layoutSkipped(elements[i]));
      const undersized = rects.map((r, i) => laidOut[i] && (r.width < min || r.height < min));
      const encloses = (a, b) => a.left <= b.left && a.right >= b.right && a.top <= b.top && a.bottom >= b.bottom;
      const paintedEncloses = (target2, targetBox, innerBox) => {
        if (!encloses(targetBox, innerBox)) return false;
        const fragments = [...target2.getClientRects()].filter((f) => f.width > 0 && f.height > 0);
        return fragments.length <= 1 || fragments.some((f) => encloses(f, innerBox));
      };
      const fixedContexts = /* @__PURE__ */ new Map();
      const fixedContextOf = (element) => {
        if (fixedContexts.has(element)) return fixedContexts.get(element);
        let context = null;
        for (let node = element; node && node !== element.ownerDocument.documentElement; node = node.parentElement) {
          const position = getComputedStyle(node).position;
          if (position === "fixed" || position === "sticky") {
            context = node;
            break;
          }
        }
        fixedContexts.set(element, context);
        return context;
      };
      const overlapOf = (a, b) => {
        const left = Math.max(a.left, b.left);
        const top = Math.max(a.top, b.top);
        const right = Math.min(a.right, b.right);
        const bottom = Math.min(a.bottom, b.bottom);
        return right - left > 2 && bottom - top > 2 ? { left, top, right, bottom, width: right - left, height: bottom - top } : null;
      };
      const paintsOver = (j, i, overlap) => {
        const doc = elements[i].ownerDocument;
        const win = doc.defaultView;
        const x = overlap.left + overlap.width / 2;
        const y = overlap.top + overlap.height / 2;
        if (!win || typeof doc.elementsFromPoint !== "function" || x < 0 || y < 0 || x >= win.innerWidth || y >= win.innerHeight) return false;
        for (const layer of doc.elementsFromPoint(x, y)) {
          const inJ = elements[j] === layer || elements[j].contains(layer);
          const inI = elements[i] === layer || elements[i].contains(layer);
          if (inJ && !inI) return true;
          if (inI && !inJ) return false;
        }
        return false;
      };
      const uncovered = (rect, overlap) => {
        const slabs = [
          { left: rect.left, top: rect.top, right: overlap.left, bottom: rect.bottom },
          { left: overlap.right, top: rect.top, right: rect.right, bottom: rect.bottom },
          { left: rect.left, top: rect.top, right: rect.right, bottom: overlap.top },
          { left: rect.left, top: overlap.bottom, right: rect.right, bottom: rect.bottom }
        ].map((s) => ({ ...s, width: s.right - s.left, height: s.bottom - s.top })).filter((s) => s.width >= 1 && s.height >= 1);
        if (!slabs.length) {
          return { left: rect.left, top: rect.top, right: rect.left, bottom: rect.top, width: 0, height: 0 };
        }
        return slabs.reduce((best, s) => s.width * s.height > best.width * best.height ? s : best);
      };
      const CELL = 256;
      let cellIndex = null;
      const cellsOf = (r) => {
        const keys = [];
        for (let cx = Math.floor(r.left / CELL); cx <= Math.floor(r.right / CELL); cx++) {
          for (let cy = Math.floor(r.top / CELL); cy <= Math.floor(r.bottom / CELL); cy++) {
            keys.push(`${cx}:${cy}`);
          }
        }
        return keys;
      };
      const overlapCandidates = (i) => {
        if (!cellIndex) {
          cellIndex = /* @__PURE__ */ new Map();
          rects.forEach((r, j) => {
            if (!laidOut[j]) return;
            for (const key of cellsOf(r)) {
              if (!cellIndex.has(key)) cellIndex.set(key, []);
              cellIndex.get(key).push(j);
            }
          });
        }
        const seen2 = /* @__PURE__ */ new Set();
        for (const key of cellsOf(rects[i])) {
          for (const j of cellIndex.get(key) ?? []) if (j !== i) seen2.add(j);
        }
        return seen2;
      };
      const obscuredRect = (i) => {
        let effective = null;
        for (const j of overlapCandidates(i)) {
          if (elements[j].contains(elements[i]) || elements[i].contains(elements[j])) continue;
          if (encloses(rects[j], rects[i]) || encloses(rects[i], rects[j])) continue;
          if (typeof elements[i].href === "string" && elements[i].href === elements[j].href) continue;
          const overlap = overlapOf(effective ?? rects[i], rects[j]);
          if (!overlap) continue;
          if (fixedContextOf(elements[j]) !== fixedContextOf(elements[i])) continue;
          if (!paintsOver(j, i, overlap)) continue;
          effective = uncovered(effective ?? rects[i], overlap);
        }
        return effective;
      };
      const destinationOf = (element) => {
        if (typeof element.href !== "string" || !element.href) return null;
        const attr = (element.getAttribute("href") ?? "").trim();
        if (!attr || attr === "#" || /^javascript:/i.test(attr)) return null;
        return element.href;
      };
      let adequateDestinations = null;
      const equivalentElsewhere = (i) => {
        const destination = destinationOf(elements[i]);
        if (!destination) return false;
        if (!adequateDestinations) {
          adequateDestinations = /* @__PURE__ */ new Set();
          elements.forEach((other, j) => {
            if (!laidOut[j] || undersized[j] || other.ownerDocument !== elements[i].ownerDocument) return;
            const d = destinationOf(other);
            if (d) adequateDestinations.add(d);
          });
        }
        return adequateDestinations.has(destination);
      };
      return elements.map((element, i) => {
        if (!laidOut[i]) return { status: "pass" };
        if (!undersized[i]) {
          const effective = obscuredRect(i);
          if (!effective || effective.width >= min && effective.height >= min) return { status: "pass" };
          if (isInTextLine(element)) return { status: "pass" };
          const everHit = (() => {
            const doc = element.ownerDocument;
            const win = doc.defaultView;
            if (!win || typeof doc.elementsFromPoint !== "function") return true;
            const fragments = [...element.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
            let tested = false;
            for (const fragment of fragments.length ? fragments : [rects[i]]) {
              const x = fragment.left + fragment.width / 2;
              const y = fragment.top + fragment.height / 2;
              if (x < 0 || y < 0 || x >= win.innerWidth || y >= win.innerHeight) continue;
              tested = true;
              if (doc.elementsFromPoint(x, y).includes(element)) return true;
            }
            return !tested;
          })();
          if (!everHit) return { status: "pass" };
          const rect2 = rects[i];
          return {
            status: "fail",
            message: `This target's box is ${Math.round(rect2.width)}\xD7${Math.round(rect2.height)}px, but another target overlaps it and clicks in the overlap go there \u2014 the part that still accepts the pointer is ${px2(effective.width)}\xD7${px2(effective.height)}px, below the ${min}\xD7${min}px minimum.`,
            fix: "Space the targets so they no longer overlap, or enlarge this one until the uncovered part reaches the minimum.",
            data: {
              box: { width: Math.round(rect2.width), height: Math.round(rect2.height) },
              effective: { width: Math.round(effective.width), height: Math.round(effective.height) }
            }
          };
        }
        if (uaControlled(element)) return { status: "pass" };
        const uaProof = uaSized(element);
        if (uaProof === "yes") return { status: "pass" };
        if (isInTextLine(element)) return { status: "pass" };
        if (spacingException) {
          const crowds = (other, j) => {
            if (j === i || !laidOut[j]) return false;
            if (other.contains(element) || element.contains(other)) return false;
            if (paintedEncloses(other, rects[j], rects[i]) || paintedEncloses(element, rects[i], rects[j])) return false;
            if (fixedContextOf(other) !== fixedContextOf(element)) return false;
            const within = (box) => {
              if (undersized[j]) {
                const c = { x: box.left + box.width / 2, y: box.top + box.height / 2 };
                if (Math.hypot(c.x - centers[i].x, c.y - centers[i].y) < min) return true;
              }
              return pointToRectDistance(centers[i], box) < min / 2;
            };
            if (!within(rects[j])) return false;
            return reachableRects(other, rects[j]).some(within);
          };
          const crowded = elements.some(crowds);
          if (!crowded) return { status: "pass" };
        }
        if (equivalentElsewhere(i)) return { status: "pass" };
        const rect = rects[i];
        if (uaProof === "open") {
          return {
            status: "incomplete",
            message: `This native control is ${px2(rect.width)}\xD7${px2(rect.height)}px, under the ${min}\xD7${min}px minimum${spacingException ? ", and another target crowds it" : ""}. The browser sizes an unstyled control (the User Agent Control exception), but a stylesheet this audit cannot read might set its size. Check whether author CSS sizes this control; if nothing does, it passes.`
          };
        }
        return {
          status: "fail",
          message: spacingException ? `This target is ${px2(rect.width)}\xD7${px2(rect.height)}px AND another target crowds it (within ${min}px) \u2014 small targets are only acceptable with clear space around them; crowded ones are hard to hit for users with motor impairments.` : `This target is ${px2(rect.width)}\xD7${px2(rect.height)}px \u2014 below the ${min}\xD7${min}px minimum, hard to hit for users with motor impairments.`,
          fix: `Increase the element\u2019s size or padding to at least ${min}\xD7${min}px${spacingException ? ", or add spacing between the targets" : ""}.`
        };
      });
    }
  };
}
var target_size_default = createTargetSizeRule({
  id: "target-size",
  name: "Target size",
  tags: ["wcag22aa", "wcag258"],
  help: "Interactive targets must be at least 24\xD724 pixels",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
  min: 24,
  spacingException: true
});

// src/engine/rules/wcag/1.4.2-audio-control.js
var audio_control_default = {
  id: "audio-control",
  name: "Auto-playing audio control",
  impact: "critical",
  tags: ["wcag2a", "wcag142"],
  help: "Auto-playing audio must be stoppable or muted",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html",
  selector: "audio[autoplay], video[autoplay]",
  visibleOnly: false,
  evaluate(element) {
    if (element.muted || element.volume === 0) return { status: "pass" };
    if (element.hasAttribute("muted") || element.hasAttribute("controls")) return { status: "pass" };
    if (!element.loop) {
      if (Number.isFinite(element.duration) && element.duration <= 3) return { status: "pass" };
      if (!Number.isFinite(element.duration)) {
        return {
          status: "incomplete",
          message: "This media auto-plays without controls or muting; its duration isn\u2019t loaded yet, and only audio playing longer than 3 seconds fails 1.4.2 \u2014 check whether it has sound and how long it plays."
        };
      }
    }
    const span = element.loop ? "on a loop" : "for more than three seconds";
    const fix = "Add controls (or muted), or do not autoplay. Otherwise put a pause, stop or volume control near the start of the page, before the media.";
    if (element.tagName === "VIDEO") {
      const decoded = element.webkitAudioDecodedByteCount;
      const started = !element.paused && !element.ended && element.currentTime >= 1;
      if (started && decoded === 0) return { status: "pass" };
      if (decoded > 0) {
        return {
          status: "incomplete",
          message: `This video auto-plays with sound ${span}, with no controls and no muting, so its audio talks over a screen reader unless the page offers a way to stop it. Check for a pause, stop or volume control near the top of the page; if there is none, 1.4.2 is not met.`,
          fix
        };
      }
      return {
        status: "incomplete",
        message: `This video auto-plays ${span} with no controls and no muting. If this video has a soundtrack, its audio talks over a screen reader unless the page offers a way to stop it. Check whether it has sound and, if so, that a pause, stop or volume control sits near the top of the page.`,
        fix
      };
    }
    return {
      status: "incomplete",
      message: `This audio auto-plays ${span} with no controls and no muting, so it talks over a screen reader unless the page offers a way to stop it. Check for a pause, stop or volume control near the top of the page; if there is none, 1.4.2 is not met.`,
      fix
    };
  }
};

// src/engine/rules/wcag/2.2.2-pause-stop-hide.js
var MOTION_PROPERTIES = /* @__PURE__ */ new Set([
  "transform",
  "translate",
  "rotate",
  "scale",
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "left",
  "right",
  "top",
  "bottom",
  "marginLeft",
  "marginRight",
  "marginTop",
  "marginBottom",
  "backgroundPosition",
  "backgroundPositionX",
  "backgroundPositionY",
  "objectPosition"
]);
function keyframesMove(keyframes) {
  return keyframes.some((frame) => Object.keys(frame).some((property) => MOTION_PROPERTIES.has(property)));
}
function keyframesBlink(keyframes) {
  if (keyframes.some((frame) => frame.visibility === "hidden")) return true;
  const opacities = keyframes.map((frame) => parseFloat(frame.opacity)).filter((value) => !Number.isNaN(value));
  return opacities.some((value) => value <= 0.25) && opacities.some((value) => value >= 0.75);
}
function generatedText(content) {
  if (!content || content === "none" || content === "normal") return false;
  const withoutImages = content.replace(/url\([^)]*\)/g, "");
  const strings = withoutImages.match(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g) ?? [];
  if (strings.some((string) => string.slice(1, -1).trim())) return true;
  return /\b(?:attr|counters?)\(|(?:open|close)-quote/.test(withoutImages);
}
function endlesslyMoving(doc) {
  const moving = /* @__PURE__ */ new Map();
  if (typeof doc.getAnimations !== "function") return moving;
  let animations;
  try {
    animations = doc.getAnimations();
  } catch {
    return moving;
  }
  for (const animation of animations) {
    if (animation.playState !== "running" || !animation.playbackRate) continue;
    if (animation.timeline && animation.timeline !== doc.timeline) continue;
    const effect = animation.effect;
    const target2 = effect?.target;
    if (!target2 || target2.nodeType !== 1) continue;
    const timing = effect.getComputedTiming?.() ?? {};
    if (timing.iterations !== Infinity || !(timing.duration > 0)) continue;
    let keyframes;
    try {
      keyframes = effect.getKeyframes();
    } catch {
      continue;
    }
    const moves = keyframesMove(keyframes);
    if (!moves && !keyframesBlink(keyframes)) continue;
    let pseudoText = false;
    if (effect.pseudoElement) {
      let content = "";
      try {
        content = target2.ownerDocument.defaultView.getComputedStyle(target2, effect.pseudoElement).content;
      } catch {
      }
      if (!generatedText(content)) continue;
      pseudoText = true;
    }
    if (!moving.has(target2)) {
      moving.set(target2, { name: animation.animationName, verb: moves ? "moves" : "blinks", pseudoText });
    }
  }
  return moving;
}
var pause_stop_hide_default = {
  id: "pause-stop-hide",
  name: "Pausable moving content",
  impact: "serious",
  tags: ["wcag2a", "wcag222"],
  help: "Moving content must be pausable",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
  selector: "*",
  // The criterion is about VISIBLE movement — a display:none marquee moves
  // nothing. aria-hidden content still moves on screen, so the rendered
  // check (not the AT-exposure check) is the right filter.
  visibility: "visual",
  // One getAnimations() call for the whole page, then a lookup per element.
  evaluateAll(elements) {
    if (!elements.length) return [];
    const moving = endlesslyMoving(elements[0].ownerDocument);
    return elements.map((element) => {
      if (element.tagName === "MARQUEE" || element.tagName === "BLINK") {
        if (element.tagName === "MARQUEE" && element.getAttribute("scrollamount") === "0") {
          return { status: "pass" };
        }
        return {
          status: "fail",
          message: `<${element.tagName.toLowerCase()}> scrolls or blinks with no way to pause it, which is unusable for people with attention or vestibular conditions.`,
          fix: "Replace it with static content, or a CSS animation with a pause control that honours prefers-reduced-motion."
        };
      }
      const animation = moving.get(element);
      if (!animation || !(animation.pseudoText || element.textContent.trim())) return { status: "pass" };
      const named2 = animation.name ? ` (the \u201C${animation.name}\u201D animation)` : "";
      return {
        status: "incomplete",
        message: `This content ${animation.verb} continuously${named2}: the animation repeats for ever, so it runs well past the five seconds at which WCAG 2.2.2 requires a way to pause, stop or hide it. Check the page offers one, and that it reaches this content.`
      };
    });
  }
};

// src/engine/rules/wcag/1.2.2-media-captions.js
var media_captions_default = {
  id: "media-captions",
  name: "Video captions",
  impact: "critical",
  tags: ["wcag2a", "wcag122"],
  help: "Video content must have captions",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html",
  selector: "video",
  visibleOnly: false,
  evaluate(element) {
    if (element.querySelector('track[kind="captions" i]')) {
      return { status: "pass" };
    }
    if (element.querySelector('track[kind="subtitles" i], track:not([kind])')) {
      return {
        status: "incomplete",
        message: 'This video has a subtitles track but no captions track. Subtitles carry dialogue for people who can hear the audio; captions also carry sound effects and other audio information deaf and hard-of-hearing users need. Check the track covers those, or mark it kind="captions" if it does.',
        fix: 'Use <track kind="captions" src="\u2026" srclang="\u2026" label="\u2026"> for a track that includes non-speech audio information.'
      };
    }
    if (!element.currentSrc && !element.getAttribute("src") && !element.querySelector("source")) {
      return { status: "pass" };
    }
    if (element.muted && !element.controls) {
      return { status: "pass" };
    }
    return {
      status: "incomplete",
      message: "No caption track found on this video. If captions aren\u2019t burned in or provided by the player, deaf and hard-of-hearing users are excluded \u2014 please verify.",
      fix: 'Add <track kind="captions" src="\u2026" srclang="\u2026" label="\u2026"> with a WebVTT file.'
    };
  }
};

// src/engine/rules/wcag/4.1.2-aria-attr-valid.js
var ENUMS = {
  "aria-atomic": ["true", "false"],
  "aria-busy": ["true", "false"],
  "aria-disabled": ["true", "false"],
  "aria-expanded": ["true", "false", "undefined"],
  "aria-hidden": ["true", "false", "undefined"],
  "aria-modal": ["true", "false"],
  "aria-multiline": ["true", "false"],
  "aria-multiselectable": ["true", "false"],
  "aria-readonly": ["true", "false"],
  "aria-required": ["true", "false"],
  "aria-selected": ["true", "false", "undefined"],
  "aria-checked": ["true", "false", "mixed", "undefined"],
  "aria-pressed": ["true", "false", "mixed", "undefined"],
  "aria-live": ["off", "polite", "assertive"],
  "aria-orientation": ["horizontal", "vertical", "undefined"],
  "aria-sort": ["none", "ascending", "descending", "other"],
  "aria-autocomplete": ["none", "inline", "list", "both"],
  "aria-invalid": ["true", "false", "grammar", "spelling"],
  "aria-haspopup": ["true", "false", "menu", "listbox", "tree", "grid", "dialog"],
  "aria-current": ["true", "false", "page", "step", "location", "date", "time"]
};
var aria_attr_valid_default = {
  id: "aria-attr-valid",
  name: "Valid ARIA values",
  impact: "critical",
  tags: ["wcag2a", "wcag412"],
  help: "aria attributes must exist and have valid values",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: "*",
  visibleOnly: false,
  // applies to hidden elements too; also avoids visibility cost on every node
  evaluate(element) {
    const unknown = [];
    const invalid = [];
    const empty = [];
    let role;
    for (const { name, value } of attributesOf(element)) {
      if (!name.startsWith("aria-")) continue;
      const attr = name.slice(5);
      if (!KNOWN_ARIA.has(attr)) {
        unknown.push(name);
      } else if (ENUMS[name] && value.trim() === "") {
        if (name !== "aria-current") empty.push(name);
      } else if (ENUMS[name] && !ENUMS[name].includes(value.trim().toLowerCase())) {
        if (!GLOBAL_ARIA.has(attr)) {
          role ??= effectiveRole(element);
          if (role && ROLE_ARIA[role] && !ROLE_ARIA[role].includes(attr)) continue;
        }
        invalid.push(`${name}="${value}" \u2014 allowed values: ${ENUMS[name].join(", ")}`);
      }
    }
    if (invalid.length) {
      return {
        status: "fail",
        message: `Invalid ARIA: ${invalid.join("; ")}. Assistive technology ignores attributes it doesn't recognise.`,
        fix: "Correct the attribute name/value against the ARIA specification, or remove it."
      };
    }
    if (empty.length) {
      return {
        status: "incomplete",
        message: `${empty.join(", ")} is empty, so the browser ignores it and no state is exposed. Was a value intended here? If a real state was meant (${empty.map((n) => ENUMS[n].slice(0, 3).join(", ")).join("; ")}, ...), it is missing and this is a 4.1.2 failure; if the attribute is a template leftover, no one is affected.`,
        fix: "Give the attribute one of its allowed values, or remove it."
      };
    }
    if (unknown.length) {
      return {
        status: "incomplete",
        message: `${unknown.join(", ")} is not an ARIA attribute, so the browser ignores it and assistive technology never sees it. Nothing is announced wrongly, but nothing is announced at all. Was a real ARIA state or name intended here? If it was, that state or name is missing and this is a 4.1.2 failure. If not, the attribute is stray and no one is affected. Invalid markup is not by itself a WCAG failure: the criterion that policed validity, 4.1.1 Parsing, was removed in WCAG 2.2.`,
        fix: "Correct the attribute name against the ARIA specification, or remove it."
      };
    }
    return { status: "pass" };
  }
};

// src/engine/rules/wcag/4.1.2-aria-allowed-attr.js
var HANDLED_ELSEWHERE = /* @__PURE__ */ new Set(["label", "labelledby"]);
var aria_allowed_attr_default = {
  id: "aria-allowed-attr",
  name: "Allowed ARIA attributes",
  impact: "moderate",
  tags: ["wcag2a", "wcag412"],
  help: "ARIA attributes must be supported by the element\u2019s role",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: "*",
  visibleOnly: false,
  evaluate(element) {
    const ariaAttrs = [];
    for (const { name } of attributesOf(element)) {
      if (!name.startsWith("aria-")) continue;
      const attr = name.slice(5);
      if (!HANDLED_ELSEWHERE.has(attr) && KNOWN_ARIA.has(attr)) ariaAttrs.push(attr);
    }
    if (!ariaAttrs.length) return { status: "pass" };
    const role = effectiveRole(element);
    const allowed = role && ROLE_ARIA[role];
    if (!allowed) return { status: "pass" };
    const disallowed = ariaAttrs.filter((name) => !GLOBAL_ARIA.has(name) && !allowed.includes(name));
    if (!disallowed.length) return { status: "pass" };
    const names = disallowed.map((n) => `aria-${n}`);
    return {
      status: "incomplete",
      message: `${names.join(", ")} is not supported on role "${role}", so the browser drops it and assistive technology never sees it. Nothing is announced wrongly, but nothing is announced at all. Does this element really have that state? If it does, it is invisible to a screen reader and this is a 4.1.2 failure. If it does not, the attribute is simply stray and no one is affected. Invalid markup is not by itself a WCAG failure: the criterion that policed validity, 4.1.1 Parsing, was removed in WCAG 2.2 (w3.org/WAI/WCAG22/Understanding/parsing.html), so what decides this is whether the state reaches users, not the syntax.`,
      fix: `Move ${names.join("/")} to the element whose role supports it, usually the control that toggles this one, or remove it if the element has no such state. Adding a role to this element to make the attribute legal is rarely right: the host language restricts which roles each element may take.`
    };
  }
};

// src/engine/rules/wcag/4.1.2-aria-field-name.js
var AUTHOR_ONLY = ["textbox", "searchbox", "combobox", "listbox", "spinbutton", "slider", "progressbar", "meter"];
var FROM_CONTENT = ["checkbox", "radio", "switch"];
function authorName(element) {
  return labelledByName(element) || element.getAttribute("aria-label")?.trim() || element.getAttribute("title")?.trim() || "";
}
var aria_field_name_default = {
  id: "aria-field-name",
  name: "ARIA field names",
  impact: "serious",
  tags: ["wcag2a", "wcag412"],
  help: "ARIA fields and value widgets must have an accessible name",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: [...AUTHOR_ONLY, ...FROM_CONTENT].map((role) => `[role="${role}"]:not(input):not(select):not(textarea)`).join(", "),
  evaluate(element, { accessibleName: accessibleName2 }) {
    const role = element.getAttribute("role");
    const name = FROM_CONTENT.includes(role) ? accessibleName2(element) : authorName(element);
    if (name) return { status: "pass" };
    if (role === "combobox" && element.tabIndex < 0) {
      const input = element.querySelector('input, [role="textbox"], [role="searchbox"]');
      if (input && (input.labels?.length || input.getAttribute("aria-label") || input.getAttribute("aria-labelledby"))) {
        return { status: "pass" };
      }
    }
    return {
      status: "fail",
      message: `This role="${role}" control has no accessible name \u2014 screen readers announce the role and value with no idea what it's for.${AUTHOR_ONLY.includes(role) ? " (Content inside it does not count as a name for this role.)" : ""}`,
      fix: 'Add aria-label="\u2026" or aria-labelledby pointing at its visible label.'
    };
  }
};

// src/engine/rules/wcag/4.1.2-aria-label-misuse.js
var NAME_FROM_CONTENT = 'a[href], button, summary, h1, h2, h3, h4, h5, h6, th, td, [role="button"], [role="link"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="option"], [role="tab"], [role="treeitem"], [role="checkbox"], [role="radio"], [role="switch"], [role="heading"], [role="cell"], [role="gridcell"], [role="columnheader"], [role="rowheader"], [role="tooltip"]';
var NAME_PROHIBITED_ROLES = ["caption", "code", "deletion", "emphasis", "generic", "insertion", "paragraph", "strong", "subscript", "superscript"];
var IMPLICITLY_PROHIBITED = ["div", "span", "p", "strong", "em", "code", "del", "s", "ins", "sub", "sup"];
var SELECTOR = ["aria-label", "aria-labelledby"].flatMap((attr) => [
  ...IMPLICITLY_PROHIBITED.map((tag) => `${tag}[${attr}]:not([role]):not([tabindex])`),
  ...NAME_PROHIBITED_ROLES.map((role) => `[role="${role}"][${attr}]:not([tabindex])`)
]).join(", ");
var aria_label_misuse_default = {
  id: "aria-label-misuse",
  name: "aria-label placement",
  impact: "moderate",
  tags: ["wcag2a", "wcag412"],
  help: "aria-label or aria-labelledby on a plain container is prohibited by ARIA, so its announcement is not guaranteed",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  // §5.2.8.6 prohibits BOTH naming attributes on generic — aria-labelledby
  // pointing at perfectly real text is the same authoring error as an inline
  // aria-label, and the more tempting one (a card labelled by its own title).
  selector: SELECTOR,
  evaluate(element) {
    if (element.closest(NAME_FROM_CONTENT)) return { status: "pass" };
    const label2 = element.getAttribute("aria-label");
    const attempt = label2 !== null ? `aria-label="${label2}"` : (() => {
      const text = (element.getAttribute("aria-labelledby") ?? "").trim().split(/\s+/).map((id) => element.ownerDocument.getElementById(id)?.textContent?.trim()).filter(Boolean).join(" ");
      return text ? `aria-labelledby (naming it "${text.slice(0, 80)}")` : "aria-labelledby (whose references resolve to no text)";
    })();
    return {
      status: "incomplete",
      message: `${attempt} on ${element.hasAttribute("role") ? `role="${element.getAttribute("role").trim()}"` : `a plain <${element.tagName.toLowerCase()}>`} is prohibited by ARIA: this element's role does not support naming, so although many browser and screen reader pairings announce the label today, that support is not guaranteed anywhere and can differ between assistive technologies. Where it is announced it replaces the element's visible text; where it is not, users get the visible text alone. Check both presentations read correctly, and that nothing here relies on the label being heard. Prohibited markup is not by itself a WCAG failure: the criterion that policed validity, 4.1.1 Parsing, was removed in WCAG 2.2 (w3.org/WAI/WCAG22/Understanding/parsing.html), so what decides this is what users actually hear.`,
      fix: "If this element must reliably announce something of its own, give it the role it is playing (a landmark, group, or widget role) so the name is legal and exposure is guaranteed \u2014 or move the spoken text into visible or visually-hidden real text. If the label is stray, remove it. Do not add a role solely to legalise the label."
    };
  }
};

// src/engine/rules/wcag/4.1.2-role-required-aria.js
var REQUIRED = {
  checkbox: ["aria-checked"],
  switch: ["aria-checked"],
  radio: ["aria-checked"],
  menuitemcheckbox: ["aria-checked"],
  menuitemradio: ["aria-checked"],
  slider: ["aria-valuenow"],
  meter: ["aria-valuenow"],
  scrollbar: ["aria-valuenow", "aria-controls"],
  separator: ["aria-valuenow"],
  heading: ["aria-level"],
  combobox: ["aria-expanded", "aria-controls"],
  option: ["aria-selected"]
};
var HELD_AT_REVIEW = /* @__PURE__ */ new Set(["aria-controls", "aria-selected"]);
var COST = {
  "aria-checked": "screen readers can't announce whether it is on or off",
  "aria-valuenow": "screen readers can't announce its value or position",
  "aria-level": "browsers assume level 2 for a heading with no level, so the outline a screen reader user navigates by is a guess",
  "aria-expanded": "screen readers can't announce whether its list is open",
  "aria-controls": "assistive technology has no link from the control to what it operates",
  "aria-selected": "a screen reader may not announce which option is selected"
};
function suppliedNatively(element, attr) {
  const tag = element.tagName;
  const type = tag === "INPUT" ? element.type : null;
  switch (attr) {
    case "aria-checked":
      return type === "checkbox" || type === "radio";
    case "aria-valuenow":
      return type === "range" || tag === "METER" || tag === "PROGRESS";
    case "aria-level":
      return /^H[1-6]$/.test(tag);
    case "aria-selected":
      return tag === "OPTION";
    case "aria-expanded":
      return tag === "SELECT";
    default:
      return false;
  }
}
var role_required_aria_default = {
  id: "role-required-aria",
  name: "Required role states",
  impact: "serious",
  tags: ["wcag2a", "wcag412"],
  help: "Some roles require a state attribute to work",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: Object.keys(REQUIRED).map((role) => `[role="${role}"]`).join(", "),
  evaluate(element) {
    const role = element.getAttribute("role");
    if (role === "separator" && !(element.tabIndex >= 0)) return { status: "pass" };
    const missing = REQUIRED[role].filter((attr) => !element.hasAttribute(attr) && !suppliedNatively(element, attr));
    if (!missing.length) return { status: "pass" };
    const failing = missing.filter((attr) => !HELD_AT_REVIEW.has(attr));
    if (failing.length) {
      const list3 = failing.join(" and ");
      const why = role === "separator" ? `this separator takes focus, so it is a resizing widget, but without aria-valuenow ${COST["aria-valuenow"]}` : failing.map((attr) => COST[attr]).join("; ");
      return {
        status: "fail",
        message: `role="${role}" without ${list3} \u2014 ${why}.`,
        fix: `Add ${list3} and keep it updated from your script, or use the native HTML element instead.`
      };
    }
    if (role === "combobox" && element.getAttribute("aria-expanded") !== "true") return { status: "pass" };
    const list2 = missing.join(" and ");
    return {
      status: "incomplete",
      message: `role="${role}" without ${list2}, which ARIA lists as required for the role \u2014 ${missing.map((attr) => COST[attr]).join("; ")}. Check the control is usable with a screen reader; adding ${list2} settles it.`
    };
  }
};

// src/engine/rules/wcag/4.1.2-label-for-valid.js
var WRAPPABLE = 'input:not([type="hidden"]), select, textarea, button, meter, output, progress';
var label_for_valid_default = {
  id: "label-for-valid",
  name: "Label target references",
  impact: "serious",
  tags: ["wcag2a", "wcag412"],
  help: "label[for] must reference a form control that exists",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: "label[for]",
  evaluate(element) {
    const id = element.getAttribute("for");
    if (element.control) return { status: "pass" };
    const target2 = element.getRootNode().getElementById?.(id);
    if (target2 && target2.tagName === "INPUT" && target2.type === "hidden") return { status: "pass" };
    const wrapped = element.querySelector(WRAPPABLE);
    if (wrapped) {
      return {
        status: "fail",
        message: `This label wraps a <${wrapped.tagName.toLowerCase()}> but its for="${id}" ${target2 ? `points at a <${target2.tagName.toLowerCase()}>, which is not labelable` : "points at nothing"}. The for attribute overrides the wrapping, so the wrapped control is not labelled by this text.`,
        fix: `Point the for attribute at the wrapped control's id, or remove the for attribute so the wrapping labels it.`
      };
    }
    return {
      status: "incomplete",
      message: target2 ? `for="${id}" points at a <${target2.tagName.toLowerCase()}>, which is not a labelable element, so the browser ignores the association. Was a form control meant to be here? If so it has no label from this text (form-label reports the control itself); if this text captions something that is not a control, nothing is affected.` : `for="${id}" points at nothing, so this label is not associated with any control. Was a form control meant to be here? If so it has lost its label (form-label reports the control itself); if this is leftover markup, no one is affected.`,
      fix: "Point the for attribute at the id of the control it labels, or remove the attribute."
    };
  }
};

// src/engine/rules/wcag/1.3.1-listitem-parent.js
var listitem_parent_default = {
  id: "listitem-parent",
  name: "List item placement",
  impact: "serious",
  tags: ["wcag2a", "wcag131"],
  help: "<li> must be inside a list",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
  selector: "li:not([role])",
  // a role attribute replaces the listitem semantics
  evaluate(element) {
    const flatParent = (el) => el.assignedSlot?.parentElement ?? el.parentElement ?? el.getRootNode()?.host;
    let parent = flatParent(element);
    while (parent?.tagName === "SLOT") parent = parent.assignedSlot?.parentElement ?? parent.parentElement;
    const listContainer = (el) => {
      const tokens = (el.getAttribute("role") ?? "").trim().toLowerCase().split(/\s+/).filter(Boolean);
      const role = tokens.find((t) => ROLE_ARIA[t]) ?? null;
      if (el.matches("ul, ol, menu")) return !role || ["list", "presentation", "none"].includes(role);
      return role === "list";
    };
    const transparent = (el) => ["presentation", "none"].includes(el.getAttribute("role") ?? "") || !el.hasAttribute("role") && (el.tagName === "DIV" || el.tagName === "SPAN");
    while (parent && !listContainer(parent) && transparent(parent)) parent = flatParent(parent);
    if (parent && listContainer(parent)) return { status: "pass" };
    const parentLabel = parent ? `<${parent.tagName.toLowerCase()}${parent.getAttribute("role") ? ` role="${parent.getAttribute("role")}"` : ""}>` : "nothing";
    if (parent?.getAttribute("role") === "group") {
      let above = flatParent(parent);
      while (above && !listContainer(above) && (transparent(above) || above.getAttribute("role") === "group")) above = flatParent(above);
      if (above && listContainer(above)) {
        return {
          status: "fail",
          message: `This <li> sits inside ${parentLabel} within its list. A list may only own list items directly, and role="group" is not permitted between a list and its items, so screen readers lose the item's list context.`,
          fix: 'Remove role="group" from the wrapper (a plain <div> keeps the items owned by the list), or move the group label onto the list element with aria-label.'
        };
      }
    }
    return {
      status: "fail",
      message: `This <li> sits inside ${parentLabel} \u2014 ${parent?.matches("ul, ol, menu") && parent.getAttribute("role") ? "the explicit role replaces the list semantics, so" : "outside a list,"} screen readers lose the item's list context entirely.`,
      fix: parent?.matches("ul, ol, menu") && parent.getAttribute("role") ? "Remove the role from the list (use a wrapping element for the landmark), or give the items roles the container expects." : "Wrap it in a <ul> or <ol>, or change it to a <div>/<p> if it isn\u2019t really a list item."
    };
  }
};

// src/engine/rules/wcag/1.3.1-definition-list.js
var ALLOWED = /* @__PURE__ */ new Set(["DT", "DD", "DIV"]);
var definition_list_default = {
  id: "definition-list",
  name: "Definition list structure",
  impact: "serious",
  tags: ["wcag2a", "wcag131"],
  help: "<dl> must be structured as term/description pairs",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
  selector: "dl:not([role])",
  // a role attribute replaces the dl semantics
  evaluate(element, { isRendered }) {
    const invalid = [...element.children].filter((child) => !ALLOWED.has(child.tagName) && !NEVER_RENDERED.has(child.tagName) && (!isRendered || isRendered(child)));
    if (invalid.length) {
      const tags = [...new Set(invalid.map((child) => `<${child.tagName.toLowerCase()}>`))].join(", ");
      return {
        status: "fail",
        message: `This <dl> contains ${tags} directly \u2014 only <dt>, <dd> (optionally grouped in <div>) are allowed, otherwise the term/description pairing breaks.`,
        fix: "Restructure the list into <dt>/<dd> pairs, or use a different element."
      };
    }
    const emptyWrappers = [...element.children].filter((child) => child.tagName === "DIV" && ![...child.children].some((inner) => inner.tagName === "DT" || inner.tagName === "DD"));
    if (emptyWrappers.length) {
      return {
        status: "fail",
        message: `${emptyWrappers.length} <div> wrapper(s) in this <dl> hold no <dt>/<dd> directly \u2014 the term/description pairing breaks when the pairs sit deeper than the wrapper.`,
        fix: "Make each <div> child of the <dl> contain its <dt>/<dd> pair directly, or flatten the pairs into the <dl> itself."
      };
    }
    return { status: "pass" };
  }
};

// src/engine/rules/wcag/1.3.1-dlitem-parent.js
var dlitem_parent_default = {
  id: "dlitem-parent",
  name: "Definition item placement",
  impact: "serious",
  tags: ["wcag2a", "wcag131"],
  help: "<dt> and <dd> must be inside a <dl>",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
  selector: "dt:not([role]), dd:not([role])",
  // role overrides the dt/dd semantics
  evaluate(element) {
    const flatParent = (node) => node.assignedSlot?.parentElement ?? node.parentElement ?? node.getRootNode()?.host ?? null;
    for (let parent = flatParent(element); parent; parent = flatParent(parent)) {
      if (parent.tagName === "DL") return { status: "pass" };
    }
    return {
      status: "fail",
      message: `<${element.tagName.toLowerCase()}> outside a <dl> has no term/description semantics.`,
      fix: "Wrap the terms and descriptions in a <dl>, or use different elements."
    };
  }
};

// src/engine/rules/wcag/1.1.1-area-alt.js
var area_alt_default = {
  id: "area-alt",
  name: "Image map alt text",
  impact: "critical",
  tags: ["wcag2a", "wcag111", "wcag244"],
  help: "Image map areas must have alternative text",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
  selector: "map area[href]",
  visibleOnly: false,
  evaluate(element, { accessibleName: accessibleName2 }) {
    if (accessibleName2(element)) return { status: "pass" };
    return {
      status: "fail",
      message: "This clickable map area has no alt text \u2014 screen readers announce nothing for it.",
      fix: 'Add alt="Where this area links to".'
    };
  }
};

// src/engine/rules/wcag/1.1.1-object-alt.js
var object_alt_default = {
  id: "object-alt",
  name: "Object alt text",
  impact: "serious",
  tags: ["wcag2a", "wcag111"],
  help: "<object> embeds must have a text alternative",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
  selector: "object",
  evaluate(element, { accessibleName: accessibleName2 }) {
    if (accessibleName2(element) || element.textContent.trim()) return { status: "pass" };
    const type = (element.getAttribute("type") ?? "").trim().toLowerCase();
    const data = (element.getAttribute("data") ?? "").split(/[?#]/)[0].toLowerCase();
    const isDocument = type.startsWith("text/") || type === "application/pdf" || type === "application/xhtml+xml" || !type && /\.(html?|xhtml|pdf|txt)$/.test(data);
    if (isDocument) {
      return {
        status: "incomplete",
        message: "This embedded object renders a text document but has no accessible name, so assistive technology users get no indication of what the embedded document is. Check it is identified in the surrounding context.",
        fix: 'Add aria-label="\u2026" naming the embedded document, or fallback content inside the <object> element.'
      };
    }
    return {
      status: "fail",
      message: "This embedded object has no text alternative \u2014 users who can\u2019t see it get nothing.",
      fix: 'Add aria-label="\u2026", or fallback content inside the <object> element.'
    };
  }
};

// src/engine/rules/wcag/1.1.1-input-image-alt.js
var input_image_alt_default = {
  id: "input-image-alt",
  name: "Image button alt text",
  impact: "critical",
  tags: ["wcag2a", "wcag111", "wcag412"],
  help: "Image inputs need alt text describing their action",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
  selector: 'input[type="image"]',
  evaluate(element, { accessibleName: accessibleName2 }) {
    if (accessibleName2(element)) return { status: "pass" };
    return {
      status: "fail",
      // HTML-AAM: a nameless image input takes an implementation-defined
      // name such as "Submit", which says nothing about what THIS button
      // does (2026-08-25 overnight audit).
      message: 'This image button has no alt text, so browsers fall back to a generic "Submit" name that does not describe what the button does.',
      fix: 'Add alt="What the button does", e.g. alt="Search".'
    };
  }
};

// src/engine/rules/best-practice/multiple-labels.js
var multiple_labels_default = {
  id: "multiple-labels",
  name: "Multiple labels",
  impact: "minor",
  tags: ["best-practice"],
  help: "Form fields should not have multiple labels",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html",
  selector: "input, select, textarea",
  evaluate(element, { isVisible }) {
    const visibleLabels = [...element.labels ?? []].filter(isVisible);
    if (visibleLabels.length <= 1) return { status: "pass" };
    return {
      status: "fail",
      message: `${visibleLabels.length} visible labels point at this field \u2014 screen readers differ in which they announce.`,
      fix: "Keep one label; move extra guidance into aria-describedby text."
    };
  }
};

// src/engine/rules/wcag/2.2.1-meta-refresh.js
function refreshDestination(content) {
  let rest = content.replace(/^\s*[\d.]*\s*(?:[;,]\s*)?/, "");
  rest = rest.replace(/^url\s*(?:=\s*)?/i, "");
  const quote = rest[0] === '"' || rest[0] === "'" ? rest[0] : "";
  if (quote) {
    rest = rest.slice(1);
    const close = rest.indexOf(quote);
    if (close !== -1) rest = rest.slice(0, close);
  }
  return rest.trim();
}
function refreshDelay(content) {
  const isAsciiSpace = (c) => c === " " || c === "	" || c === "\n" || c === "\f" || c === "\r";
  const isDigit = (c) => c >= "0" && c <= "9";
  let i = 0;
  while (i < content.length && isAsciiSpace(content[i])) i++;
  let digits = "";
  while (i < content.length && isDigit(content[i])) digits += content[i++];
  if (!digits && content[i] !== ".") return null;
  const delay = digits ? Number(digits) : 0;
  while (i < content.length && (isDigit(content[i]) || content[i] === ".")) i++;
  if (i < content.length && content[i] !== ";" && content[i] !== "," && !isAsciiSpace(content[i])) return null;
  return delay;
}
var meta_refresh_default = {
  id: "meta-refresh",
  name: "Timed page refresh",
  impact: "critical",
  tags: ["wcag2a", "wcag221"],
  help: "The page must not use a timed refresh",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html",
  selector: 'meta[http-equiv="refresh" i]',
  visibleOnly: false,
  evaluate(element) {
    const content = element.getAttribute("content") ?? "";
    const delay = refreshDelay(content);
    if (delay === null) return { status: "pass" };
    const hasDestination = refreshDestination(content) !== "";
    if (delay === 0 && !hasDestination) {
      return {
        status: "fail",
        message: "The page reloads itself immediately and has no destination to move on to, so the reload repeats for as long as the page is open. Nobody can read or complete anything on it.",
        fix: 'Remove the timed refresh. If this is meant to be a redirect, give it a url (content="0; url=\u2026"); if the content needs updating, update it in place instead of reloading.'
      };
    }
    if (!(delay > 0)) return { status: "pass" };
    if (delay > 72e3) return { status: "pass" };
    return {
      status: "fail",
      message: `The page refreshes/redirects after ${delay}s \u2014 slow readers lose their place (or the whole page) with no control.`,
      fix: "Remove the timed refresh; let users act in their own time."
    };
  }
};

// src/engine/rules/wcag/1.4.1-link-in-text-block.js
var splitList = (value) => (value ?? "").split(/,(?![^(]*\))/).map((part) => part.trim());
var SIDES = ["Top", "Right", "Bottom", "Left"];
var sidePaints = (s, side) => parseFloat(s[`border${side}Width`]) > 0 && s[`border${side}Style`] !== "none" && (parseColor(s[`border${side}Color`])?.a ?? 0) > 0;
function boxShadowPaints(boxShadow) {
  if (!boxShadow || boxShadow === "none") return false;
  return splitList(boxShadow).some((layer) => {
    const colorText = layer.match(/[a-z-]+\([^)]*\)/)?.[0];
    const color = colorText ? parseColor(colorText) : null;
    if (color && color.a === 0) return false;
    const lengths = layer.replace(colorText ?? "", "").match(/-?[\d.]+(?=px)/g) ?? [];
    return !(lengths.length && lengths.every((n) => parseFloat(n) === 0));
  });
}
function backgroundImagePaints(s, rect) {
  if (!s.backgroundImage || s.backgroundImage === "none") return "no";
  const images = splitList(s.backgroundImage);
  const sizes = splitList(s.backgroundSize);
  const repeats = splitList(s.backgroundRepeat);
  const positions = splitList(s.backgroundPosition);
  let verdict = "no";
  images.forEach((image, i) => {
    if (image === "none") return;
    const size = sizes[i % sizes.length] || "auto";
    if (/(^|\s)0(px|%)?(\s|$)/.test(size)) return;
    const repeat = repeats[i % repeats.length] || "repeat";
    const position = positions[i % positions.length] || "0% 0%";
    if (repeat.includes("no-repeat")) {
      const outside = position.split(/\s+/).some((component, axis) => {
        const n = parseFloat(component);
        if (Number.isNaN(n)) return false;
        if (component.endsWith("%")) return n < 0 || n > 100;
        const extent = axis === 0 ? rect?.width : rect?.height;
        return n < 0 || Number.isFinite(extent) && n > extent;
      });
      if (outside) {
        if (verdict === "no") verdict = "unclear";
        return;
      }
    }
    verdict = "yes";
  });
  return verdict;
}
function pseudoCue(element, which) {
  let p;
  try {
    p = getComputedStyle(element, which);
  } catch {
    return null;
  }
  const content = p.content;
  if (!content || content === "none" || content === "normal" || p.display === "none") return null;
  if (p.visibility !== "visible" || parseFloat(p.opacity) === 0) return null;
  const matrix = (p.transform ?? "none").match(/^matrix(3d)?\((.*)\)$/);
  if (matrix) {
    const n = matrix[2].split(",").map(parseFloat);
    const [a, b, c, d] = matrix[1] ? [n[0], n[1], n[4], n[5]] : n;
    if (a === 0 && b === 0 || c === 0 && d === 0) return null;
  }
  const width = parseFloat(p.width);
  const height = parseFloat(p.height);
  const glyph = /^["'].+["']$/s.test(content) && parseFloat(p.fontSize) > 0 || /^(url|counter|counters|attr|image-set)\(/.test(content);
  const paintedBackground = (parseColor(p.backgroundColor)?.a ?? 0) > 0 || backgroundImagePaints(p, Number.isNaN(width) ? null : { width, height }) === "yes";
  const paintedBorder = SIDES.some((side) => sidePaints(p, side));
  if (paintedBackground || paintedBorder) {
    if (Number.isNaN(width) || Number.isNaN(height)) return glyph ? "glyph" : "unclear";
    const extra = (edges) => edges.reduce((sum, edge) => sum + (parseFloat(p[edge]) || 0), 0);
    const boxWidth = width + extra(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"]);
    const boxHeight = height + extra(["paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"]);
    if (boxWidth > 0 && boxHeight > 0) return "cue";
  }
  if (glyph) {
    if (!Number.isNaN(width) && !Number.isNaN(height) && width <= 1 && height <= 1) return null;
    return "glyph";
  }
  return null;
}
var GRAPHIC = "svg, img, picture, canvas, video, object, embed";
var link_in_text_block_default = {
  id: "link-in-text-block",
  name: "Link distinction in text",
  impact: "serious",
  tags: ["wcag2a", "wcag141"],
  help: "Links inside text must be distinguishable by more than colour",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html",
  // Only running prose counts as a "text block". <li> is included because
  // footers and credits routinely write sentences as list items ("built by
  // the <a>team</a> with help from <a>contributors</a>"), and those links are
  // embedded in prose exactly as 1.4.1 means it. Pure link lists (navs,
  // blogrolls) are still excluded, but by the ownText guard below rather than
  // by tag: in <li><a>Home</a></li> the item has no text of its own.
  // <div> was measured too and added nothing on any test site, so it stays
  // out rather than widening the blast radius for no gain.
  selector: "p a[href], dd a[href], blockquote a[href], td a[href], li a[href]",
  visibility: "visual",
  // colour distinction is a purely visual concern
  evaluate(element, { ownText }) {
    const parent = element.closest("p, dd, blockquote, td, li");
    if (!element.textContent.trim() || !parent) return { status: "pass" };
    if (ownText(parent).replace(/\s+/g, "").length < 10) return { status: "pass" };
    const style = getComputedStyle(element);
    const parentStyle = getComputedStyle(parent);
    const weight = (s) => parseInt(s.fontWeight, 10) || 400;
    const slanted = (s) => /italic|oblique/.test(s.fontStyle ?? "");
    const parentSize = parseFloat(parentStyle.fontSize) || 16;
    const cueBearers = [{ s: style, el: element, text: true }];
    let graphic = false;
    for (const el of element.querySelectorAll("*")) {
      const rects = [...el.getClientRects()].filter((r) => r.width > 1 && r.height > 1);
      if (!rects.length) continue;
      if (el.matches(GRAPHIC)) {
        if (rects.some((r) => r.width >= 4 && r.height >= 4)) graphic = true;
        continue;
      }
      if (el.closest(GRAPHIC)) continue;
      cueBearers.push({ s: getComputedStyle(el), el, text: !!el.textContent.trim() });
    }
    let unclear = false;
    for (const { s, el, text } of cueBearers) {
      if (text && (s.textDecorationLine ?? s.textDecoration ?? "").includes("underline")) return { status: "pass" };
      if (sidePaints(s, "Bottom")) return { status: "pass" };
      if (boxShadowPaints(s.boxShadow)) return { status: "pass" };
      const ownBackground = parseColor(s.backgroundColor);
      if (ownBackground && ownBackground.a > 0) return { status: "pass" };
      const painted = backgroundImagePaints(s, el.getBoundingClientRect());
      if (painted === "yes") return { status: "pass" };
      if (painted === "unclear") unclear = true;
      if (!text) continue;
      if (Math.abs(weight(s) - weight(parentStyle)) >= 300) return { status: "pass" };
      if (slanted(s) !== slanted(parentStyle)) return { status: "pass" };
    }
    const textBearers = cueBearers.filter((b) => b.text).map((b) => b.s);
    const weightStep = Math.max(...textBearers.map((s) => Math.abs(weight(s) - weight(parentStyle))));
    const sizeStep = Math.max(...textBearers.map((s) => Math.abs((parseFloat(s.fontSize) || parentSize) - parentSize)));
    const sizeCue = sizeStep >= 2 && sizeStep / parentSize >= 0.1;
    let linkColor = parseColor(style.color);
    let textColor = parseColor(parentStyle.color);
    if (!linkColor || !textColor) return { status: "pass" };
    if ((linkColor.a ?? 1) < 1 || (textColor.a ?? 1) < 1) {
      if (backgroundImageSource(element)) {
        return {
          status: "incomplete",
          message: "This link has no underline and its colour is translucent over a background image or gradient, so its colour difference from the surrounding text depends on the pixels behind it. Check by eye that something other than colour identifies it as a link.",
          fix: "Underline links inside text (text-decoration: underline), or add a non-colour indicator."
        };
      }
      const backdrop = effectiveBackground(element);
      if (!backdrop) {
        return {
          status: "incomplete",
          message: "This link has no underline and its colour is translucent, but the background it composites over could not be determined. Check by eye that something other than colour identifies it as a link.",
          fix: "Underline links inside text (text-decoration: underline), or add a non-colour indicator."
        };
      }
      const over = (color) => (color.a ?? 1) < 1 ? composite(color, backdrop) : color;
      linkColor = over(linkColor);
      textColor = over(textColor);
    }
    const same = (x, y) => Math.round(x) === Math.round(y);
    if (same(linkColor.r, textColor.r) && same(linkColor.g, textColor.g) && same(linkColor.b, textColor.b)) {
      return { status: "pass" };
    }
    const ratio = contrastRatio(linkColor, textColor);
    if (ratio >= 3) return { status: "pass" };
    for (let ancestor = element.parentElement; ancestor && ancestor !== parent; ancestor = ancestor.parentElement) {
      if (!(getComputedStyle(ancestor).textDecorationLine ?? "").includes("underline")) continue;
      if (ancestor.textContent.replace(/\s+/g, "") === element.textContent.replace(/\s+/g, "")) return { status: "pass" };
      break;
    }
    for (const which of ["::after", "::before"]) {
      const verdict = pseudoCue(element, which);
      if (verdict === "cue") return { status: "pass" };
      if (verdict === "glyph") graphic = true;
      if (verdict === "unclear") unclear = true;
    }
    const fragments = [...element.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
    if (fragments.length) {
      const mids = fragments.map((r) => r.top + r.height / 2);
      const walker = element.ownerDocument.createTreeWalker(parent, NodeFilter.SHOW_TEXT);
      const range = element.ownerDocument.createRange();
      let sharesLine = false;
      for (let node = walker.nextNode(); node && !sharesLine; node = walker.nextNode()) {
        if (!node.textContent.trim() || element.contains(node)) continue;
        range.selectNodeContents(node);
        for (const r of range.getClientRects()) {
          if (r.width > 0 && mids.some((mid) => r.top <= mid && r.bottom >= mid)) {
            sharesLine = true;
            break;
          }
        }
      }
      if (!sharesLine) return { status: "pass" };
    }
    const shown = ratio.toFixed(2);
    const reviewFix = "Underline links inside text (text-decoration: underline), or add another clear non-colour indicator.";
    if (graphic) {
      return {
        status: "incomplete",
        message: `This link has no underline and only ${shown}:1 colour difference from the surrounding text, but it carries an icon or image. Judge by eye whether the graphic reads as part of the link and marks it out from the prose; if it does not, this fails SC 1.4.1.`,
        fix: reviewFix
      };
    }
    if (unclear) {
      return {
        status: "incomplete",
        message: `This link has no underline and only ${shown}:1 colour difference from the surrounding text, but a generated box or background image is painted on it whose size at rest could not be measured. Check by eye whether it draws a visible underline or shape; if nothing shows until hover, this fails SC 1.4.1.`,
        fix: reviewFix
      };
    }
    if (weightStep >= 200) {
      return {
        status: "incomplete",
        message: `This link has no underline and only ${shown}:1 colour difference from the surrounding text, but its font weight differs from the prose by ${weightStep}: a visible non-colour cue that falls short of a clear bold step. Judge by eye whether the weight alone identifies it as a link in this face and size; if it does not, this fails SC 1.4.1.`,
        fix: "Underline links inside text (text-decoration: underline), raise the weight difference to a clear bold step, or add another non-colour indicator."
      };
    }
    if (sizeCue) {
      return {
        status: "incomplete",
        message: `This link has no underline and only ${shown}:1 colour difference from the surrounding text, but its font size differs from the prose by ${sizeStep.toFixed(1).replace(/\.0$/, "")}px, one of the cues G182 names. Judge by eye whether the size alone identifies it as a link; if it does not, this fails SC 1.4.1.`,
        fix: reviewFix
      };
    }
    return {
      status: "fail",
      // The measured fact is the ratio against G183's threshold, and that is
      // all this says. Naming a group who "can't see it" overclaims: a
      // saturated red against near-white misses 3:1 on luminance while
      // staying perfectly distinct to most people, including most red-green
      // colour blindness, where the red darkens and the gap widens.
      message: ratio < 1.01 ? "This link has no underline and its colour differs from the surrounding text in hue alone, with no luminance difference: the distinction disappears entirely without colour vision, the exact failure F73 describes." : `This link has no underline and only ${shown}:1 colour difference from the surrounding text, below the 3:1 WCAG technique G183 asks for when colour is the only thing marking a link.`,
      fix: "Underline links inside text (text-decoration: underline), or add a non-colour indicator."
    };
  }
};

// src/engine/rules/wcag/1.3.1-p-as-heading.js
var p_as_heading_default = {
  id: "p-as-heading",
  name: "Styled text as heading",
  impact: "serious",
  tags: ["wcag2a", "wcag131"],
  help: "Bold paragraphs should not stand in for headings",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
  selector: "p",
  evaluate(element) {
    const text = element.textContent.trim();
    const only = element.children.length === 1 && element.children[0];
    const looksLikeHeading = text && text.length < 60 && only && only.matches("b, strong") && only.textContent.trim() === text && element.nextElementSibling?.matches("p");
    if (!looksLikeHeading) return { status: "pass" };
    return {
      status: "incomplete",
      message: `"${text}" is a short bold paragraph followed by text \u2014 if it's acting as a heading, it's invisible to heading navigation. Verify.`,
      fix: "If it is a heading, use a real heading element (<h2>\u2026</h2>) at the appropriate level."
    };
  }
};

// src/engine/rules/wcag/1.3.1-aria-required-children.js
var REQUIRED_CHILDREN = {
  feed: ["article"],
  row: ["cell", "columnheader", "gridcell", "rowheader"],
  list: ["listitem"],
  listbox: ["option", "group"],
  menu: ["menuitem", "menuitemcheckbox", "menuitemradio", "group"],
  menubar: ["menuitem", "menuitemcheckbox", "menuitemradio", "group"],
  radiogroup: ["radio"],
  tablist: ["tab"],
  tree: ["treeitem", "group"],
  table: ["row", "rowgroup"],
  grid: ["row", "rowgroup"],
  treegrid: ["row", "rowgroup"],
  rowgroup: ["row"]
};
var roleOf = (element) => element.getAttribute("role")?.trim().split(/\s+/)[0]?.toLowerCase() ?? implicitRole(element);
function composedDescendants(element) {
  const found = [];
  const pending = [element];
  const seen2 = /* @__PURE__ */ new Set();
  const enter = (el) => {
    if (seen2.has(el)) return;
    seen2.add(el);
    found.push(el);
    if (el.shadowRoot) pending.push(el.shadowRoot);
    if (el.tagName === "SLOT") for (const assigned of el.assignedElements({ flatten: true })) {
      enter(assigned);
      pending.push(assigned);
    }
  };
  for (let i = 0; i < pending.length; i++) {
    const scope = pending[i];
    if (scope.shadowRoot) pending.push(scope.shadowRoot);
    if (scope.tagName === "SLOT") for (const assigned of scope.assignedElements({ flatten: true })) {
      enter(assigned);
      pending.push(assigned);
    }
    for (const el of scope.querySelectorAll("*")) enter(el);
  }
  return found;
}
function candidateDescendants(element) {
  const found = composedDescendants(element).filter((el) => !el.matches("script, style, template"));
  const owns = element.getAttribute("aria-owns");
  if (owns) {
    const root = element.getRootNode();
    for (const id of owns.split(/\s+/).filter(Boolean)) {
      const target2 = root.getElementById?.(id);
      if (target2) found.push(target2, ...composedDescendants(target2));
    }
  }
  return found;
}
var aria_required_children_default = {
  id: "aria-required-children",
  name: "Required ARIA children",
  impact: "critical",
  tags: ["wcag2a", "wcag131"],
  help: "Composite ARIA roles must contain their required children",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
  selector: Object.keys(REQUIRED_CHILDREN).map((role) => `[role="${role}"]`).join(", "),
  evaluate(element) {
    if (element.getAttribute("aria-busy") === "true") return { status: "pass" };
    const role = element.getAttribute("role").trim().split(/\s+/)[0].toLowerCase();
    const required = REQUIRED_CHILDREN[role];
    const children = [...element.children, ...element.shadowRoot?.children ?? []].filter((c) => !c.matches("script, style, template"));
    if (!children.length && !element.hasAttribute("aria-owns")) return { status: "pass" };
    if (candidateDescendants(element).some((child) => required.includes(roleOf(child)))) {
      return { status: "pass" };
    }
    return {
      status: "fail",
      message: `role="${role}" contains no ${required.join("/")} anywhere inside it, and claims none by aria-owns \u2014 screen readers announce a broken, empty ${role}.`,
      fix: `Give the item elements role="${required[0]}", or remove role="${role}" from the container.`
    };
  }
};

// src/engine/rules/wcag/1.3.1-aria-required-parent.js
var REQUIRED_PARENT = {
  caption: ["figure", "grid", "table", "treegrid"],
  columnheader: ["row"],
  rowheader: ["row"],
  listitem: ["list"],
  option: ["listbox", "group"],
  menuitem: ["menu", "menubar", "group"],
  menuitemcheckbox: ["menu", "menubar", "group"],
  menuitemradio: ["menu", "menubar", "group"],
  tab: ["tablist"],
  treeitem: ["tree", "group"],
  row: ["table", "grid", "treegrid", "rowgroup"],
  rowgroup: ["table", "grid", "treegrid"],
  cell: ["row"],
  gridcell: ["row"]
};
var IMPLICIT_CONTAINER = { ul: "list", ol: "list", menu: "list", table: "table", tbody: "rowgroup", thead: "rowgroup", tfoot: "rowgroup", tr: "row", figure: "figure" };
var aria_required_parent_default = {
  id: "aria-required-parent",
  name: "Required ARIA parent",
  impact: "critical",
  tags: ["wcag2a", "wcag131"],
  help: "ARIA child roles must be inside their required container role",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
  selector: Object.keys(REQUIRED_PARENT).map((role) => `[role="${role}"]`).join(", "),
  evaluate(element) {
    const role = element.getAttribute("role").trim().split(/\s+/)[0].toLowerCase();
    const containers = REQUIRED_PARENT[role];
    const named2 = containers.filter((container) => container !== "group");
    if (element.id) {
      const owner = element.getRootNode().querySelector?.(`[aria-owns~="${CSS.escape(element.id)}"]`);
      const ownerRole = owner && (owner.getAttribute("role")?.trim().split(/\s+/)[0]?.toLowerCase() ?? IMPLICIT_CONTAINER[owner.tagName.toLowerCase()]);
      if (ownerRole && containers.includes(ownerRole)) return { status: "pass" };
    }
    const flatParent = (node) => node.assignedSlot ?? node.parentElement ?? (node.getRootNode() instanceof ShadowRoot ? node.getRootNode().host : null);
    for (let parent = flatParent(element); parent; parent = flatParent(parent)) {
      if (parent.tagName === "SLOT" && !parent.hasAttribute("role")) continue;
      const parentRole = parent.getAttribute("role")?.trim().split(/\s+/)[0]?.toLowerCase() ?? IMPLICIT_CONTAINER[parent.tagName.toLowerCase()];
      if (containers.includes(parentRole)) return { status: "pass" };
      if (parentRole === "group") continue;
      if (parentRole === "presentation" || parentRole === "none") continue;
      if (parentRole) break;
    }
    return {
      status: "fail",
      message: `role="${role}" is not inside a ${named2.join("/")} \u2014 assistive technology loses the structure entirely.`,
      fix: `Wrap it in an element with role="${named2[0]}", or fix the intervening roles.`
    };
  }
};

// src/engine/rules/wcag/2.1.1-scrollable-region-focusable.js
var FOCUSABLE2 = 'a[href], button, input:not([type="hidden"]), select, textarea, summary, [tabindex]';
function isTabbable(element) {
  if (element.tabIndex < 0 || element.disabled) return false;
  if (isInert(element)) return false;
  if (typeof element.checkVisibility === "function") {
    return element.checkVisibility({ visibilityProperty: true });
  }
  return true;
}
function hasTabbableContent(node) {
  for (const el of node.querySelectorAll?.(FOCUSABLE2) ?? []) {
    if (isTabbable(el)) return true;
  }
  for (const slot of node.querySelectorAll?.("slot") ?? []) {
    for (const assigned of slot.assignedElements?.() ?? []) {
      if (assigned.matches?.(FOCUSABLE2) && isTabbable(assigned)) return true;
      for (const el of assigned.querySelectorAll?.(FOCUSABLE2) ?? []) {
        if (isTabbable(el)) return true;
      }
    }
  }
  for (const el of node.querySelectorAll?.("*") ?? []) {
    if (el.shadowRoot && hasTabbableContent(el.shadowRoot)) return true;
  }
  return false;
}
var scrollable_region_focusable_default = {
  id: "scrollable-region-focusable",
  name: "Keyboard-reachable scroll areas",
  impact: "serious",
  tags: ["wcag2a", "wcag211", "wcag213"],
  // 2.1.3 is 2.1.1's AAA twin — same check satisfies both
  help: "Scrollable regions must be reachable by keyboard",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html",
  selector: "*",
  // Visibility is checked inside, AFTER the cheap overflow gate: filtering
  // every element of the page up front would cost a style read per element;
  // gating first pays it only on the handful that actually overflow.
  visibleOnly: false,
  evaluate(element, { isVisible }) {
    const overflowsX = element.scrollWidth > element.clientWidth + 1;
    const overflowsY = element.scrollHeight > element.clientHeight + 1;
    if (!overflowsX && !overflowsY) return { status: "pass" };
    if (element === element.ownerDocument.documentElement || element === element.ownerDocument.body) {
      return { status: "pass" };
    }
    if (!element.clientWidth || !element.clientHeight) return { status: "pass" };
    const style = getComputedStyle(element);
    const scrollableX = overflowsX && /(auto|scroll)/.test(style.overflowX);
    const scrollableY = overflowsY && /(auto|scroll)/.test(style.overflowY);
    if (!scrollableX && !scrollableY) return { status: "pass" };
    if (!isVisible(element)) return { status: "pass" };
    if (element.tabIndex >= 0) return { status: "pass" };
    if (hasTabbableContent(element)) return { status: "pass" };
    if (element.hasAttribute("tabindex")) {
      return {
        status: "fail",
        message: 'This region scrolls, holds nothing tabbable, and its tabindex="-1" removes the region itself from the tab order \u2014 keyboard users cannot reach the overflowed content in any browser.',
        fix: 'Change tabindex="-1" to tabindex="0" (plus role="region" and an aria-label describing it), or make something inside it tabbable.'
      };
    }
    return {
      status: "incomplete",
      message: 'This region scrolls and holds nothing tabbable, so reaching its overflowed content depends on the browser. Chromium gives such containers keyboard focus automatically; not every engine does. Tab to it in the browsers you support, and add tabindex="0" if it cannot be reached.',
      fix: 'If you support browsers that do not focus scroll containers, add tabindex="0" (plus role="region" and an aria-label describing it).'
    };
  }
};

// src/engine/rules/wcag/1.3.1-table-headers.js
var BLOCK_CONTENT = "h1, h2, h3, h4, h5, h6, p, ul, ol, dl, menu, form, nav, main, header, footer, section, article, aside, blockquote, figure, fieldset, pre, hr, table";
var table_headers_default = {
  id: "table-headers",
  name: "Table header associations",
  impact: "serious",
  tags: ["wcag2a", "wcag131"],
  help: "Data tables must have properly associated header cells",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
  selector: "table",
  evaluate(element) {
    const role = element.getAttribute("role");
    if (role && !["table", "grid"].includes(role)) return { status: "pass" };
    const rows = [...element.rows];
    const cells = rows.flatMap((row) => [...row.cells]);
    const isGrid = rows.length >= 2 && Math.max(0, ...rows.map((row) => row.cells.length)) >= 2;
    const textCells = cells.filter((cell) => cell.textContent.trim()).length;
    if (!isGrid || textCells < 4) return { status: "pass" };
    const cellRole = (cell) => cell.getAttribute("role")?.trim().split(/\s+/)[0]?.toLowerCase();
    const isHeaderCell = (cell) => cell.tagName === "TH" || ["columnheader", "rowheader"].includes(cellRole(cell));
    const hasHeaderCell = cells.some(isHeaderCell);
    if (!hasHeaderCell && (element.querySelector("table") || element.parentElement?.closest("table"))) {
      return {
        status: "incomplete",
        message: 'This table has no header cells and is part of a nested-table structure \u2014 a layout-table signature. If it really presents data, mark its header cells with <th>; if it is layout scaffolding, add role="presentation".'
      };
    }
    const badRefs = cells.filter((cell) => {
      const headers = cell.getAttribute("headers");
      return headers && headers.trim().split(/\s+/).filter(Boolean).some((id) => {
        const target2 = element.getRootNode().getElementById?.(id);
        return !target2 || !cells.includes(target2) || !(/^T[HD]$/.test(target2.tagName) || isHeaderCell(target2));
      });
    });
    if (badRefs.length) {
      return {
        status: "fail",
        message: `${badRefs.length} cell(s) have headers="\u2026" referencing ids that are not header cells of this table \u2014 screen readers cannot relate the data to its headers.`,
        fix: "Make each headers attribute list the id(s) of <th> cells in the same table."
      };
    }
    const hasHeaders = hasHeaderCell || cells.some((cell) => cell.hasAttribute("scope") || cell.hasAttribute("headers"));
    if (!hasHeaders) {
      if (cells.some((cell) => cell.querySelector(BLOCK_CONTENT))) {
        return {
          status: "incomplete",
          message: 'This table has no header cells and its cells hold block content (headings, paragraphs, lists or forms), which is a layout-table signature. If it really presents data, mark its header cells with <th>; if it is layout scaffolding, add role="presentation".'
        };
      }
      const twoColumns = Math.max(0, ...rows.map((row) => row.cells.length)) === 2;
      return {
        status: "fail",
        message: "This looks like a data table but has no header cells \u2014 screen reader users get the data with no way to tell what each row/column means.",
        fix: twoColumns ? 'Mark the first cell of each row as <th scope="row">: in a two-column table the first column names what the second holds.' : 'Mark header cells with <th> (add scope="col" or scope="row" when the table has both).'
      };
    }
    return { status: "pass" };
  }
};

// src/engine/rules/wcag/1.4.6-contrast-enhanced.js
var contrast_enhanced_default = createContrastRule({
  id: "color-contrast-enhanced",
  name: "Enhanced text contrast",
  tags: ["wcag2aaa", "wcag146"],
  help: "Text must have enhanced contrast against its background (AAA)",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html",
  thresholds: { normal: 7, large: 4.5 }
});

// src/engine/rules/wcag/2.5.5-target-size-enhanced.js
var target_size_enhanced_default = createTargetSizeRule({
  id: "target-size-enhanced",
  name: "Enhanced target size",
  // 2.5.5 was introduced in WCAG 2.1, so the versioned AAA tag is the true
  // one (retagged 2026-08-25 overnight audit).
  tags: ["wcag21aaa", "wcag255"],
  help: "Interactive targets must be at least 44\xD744 pixels (AAA)",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html",
  min: 44,
  spacingException: false
});

// src/engine/rules/wcag/4.1.2-dialog-name.js
var dialog_name_default = {
  id: "dialog-name",
  name: "Dialog names",
  impact: "serious",
  tags: ["wcag2a", "wcag412"],
  help: "Dialogs must have an accessible name",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  // Default visibility filter: a closed <dialog> is display:none, so only
  // dialogs the user can actually encounter are judged.
  selector: 'dialog, [role="dialog"], [role="alertdialog"]',
  evaluate(element) {
    if (labelledByName(element)) return { status: "pass" };
    if (element.getAttribute("aria-label")?.trim() || element.getAttribute("title")?.trim()) {
      return { status: "pass" };
    }
    return {
      status: "fail",
      message: 'This dialog has no accessible name \u2014 screen readers announce just "dialog" with no hint of what it is or why it appeared.',
      fix: `Point aria-labelledby at the dialog's heading, or add aria-label="What this dialog is".`
    };
  }
};

// src/engine/rules/wcag/1.4.3-control-contrast.js
var control_contrast_default = {
  id: "control-contrast",
  name: "Form control contrast",
  impact: "serious",
  tags: ["wcag2aa", "wcag143"],
  help: "Text inside form controls must have sufficient contrast",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
  selector: 'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]):not([type="file"]):not([type="image"]), select, textarea',
  visibility: "visual",
  evaluate(element) {
    if (element.closest(':disabled, [aria-disabled="true"]')) return { status: "pass" };
    const rect = element.getBoundingClientRect();
    if (rect.width <= 1 || rect.height <= 1) return { status: "pass" };
    const style = getComputedStyle(element);
    if (parseFloat(style.fontSize) === 0) return { status: "pass" };
    if (/^(submit|button|reset)$/i.test(element.getAttribute("type") ?? "") && element.hasAttribute("value") && element.getAttribute("value") === "") {
      return { status: "pass" };
    }
    {
      const doc = element.ownerDocument;
      const win = doc.defaultView;
      if (win && getComputedStyle(doc.documentElement).direction !== "rtl" && (rect.right + win.scrollX <= 0 || rect.bottom + win.scrollY <= 0)) {
        return { status: "pass" };
      }
    }
    const opacity = opacityAnimating(element) ? restingOpacity(element) : cumulativeOpacity(element);
    if (opacity < 0.05) return { status: "pass" };
    const own = parseColor(style.backgroundColor);
    let background;
    if (own && own.a >= 1) {
      background = own;
    } else {
      if (backgroundImageSource(element)) {
        return {
          status: "incomplete",
          message: "This field is see-through and sits over a background image or gradient, so its real text contrast depends on the pixels behind it. Check it by eye."
        };
      }
      const behind = effectiveBackground(element);
      background = behind && own && own.a > 0 ? composite(own, behind) : behind;
    }
    if (!background) {
      return { status: "incomplete", message: "The control\u2019s background could not be determined \u2014 check its text contrast by eye." };
    }
    const required = isLargeText(style) ? 3 : 4.5;
    const judge = (color, what, ownOpacity = 1) => {
      const parsed = parseColor(color);
      if (!parsed || parsed.a === 0) return null;
      const painted = opacity * ownOpacity;
      const faded = painted < 1 ? { ...parsed, a: parsed.a * painted } : parsed;
      const fg = faded.a < 1 ? composite(faded, background) : faded;
      const ratio = contrastRatio(fg, background);
      if (ratio >= required) return null;
      return { what, ratio };
    };
    const failures = [];
    const valueVerdict = judge(style.color, "value text");
    if (valueVerdict) failures.push(valueVerdict);
    if (element.getAttribute("placeholder")?.trim()) {
      let placeholderColor = null;
      let placeholderOpacity = 1;
      try {
        const placeholderStyle = getComputedStyle(element, "::placeholder");
        placeholderColor = placeholderStyle.color;
        const parsedOpacity = parseFloat(placeholderStyle.opacity);
        if (Number.isFinite(parsedOpacity)) placeholderOpacity = Math.min(1, Math.max(0, parsedOpacity));
      } catch {
      }
      if (placeholderColor && (placeholderColor !== style.color || placeholderOpacity < 1)) {
        const verdict = judge(placeholderColor, "placeholder text", placeholderOpacity);
        if (verdict) failures.push(verdict);
      }
    }
    if (!failures.length) return { status: "pass" };
    const worst = failures.sort((a, b) => a.ratio - b.ratio)[0];
    return {
      status: "fail",
      message: `This field's ${worst.what} has ${showRatio(worst.ratio)}:1 contrast against the field background \u2014 below the ${required}:1 minimum.`,
      fix: `Darken the ${worst.what.includes("placeholder") ? "placeholder colour (::placeholder)" : "text colour"} until it reaches ${required}:1 against the field background.`,
      data: { ratio: Number(showRatio(worst.ratio)), required }
    };
  }
};

// src/engine/rules/wcag/1.4.11-non-text-contrast.js
var non_text_contrast_default = {
  id: "non-text-contrast",
  // Named for what the rule measures: field fills and borders. It never
  // examines an icon, and the Understanding document says a boundary is not
  // required when the field has other visible identifiers, so the old
  // "icons need a visible boundary" wording overclaimed twice (2026-08-25
  // overnight audit).
  name: "Form field boundary contrast",
  impact: "serious",
  tags: ["wcag21aa", "wcag1411"],
  help: "Form field fills and borders below 3:1 need checking against the field's other identifiers",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html",
  // range and file are excluded: untouched, both are drawn by the user agent
  // (the 1.4.11 user-agent exception), and Chrome's UA default for file is
  // already appearance:none so the appearance test cannot tell an author
  // restyle from the default. An author-styled range needs a track-and-thumb
  // judgment this rule does not attempt, so the field-boundary message would
  // be wrong for it either way (2026-08-25 overnight audit).
  selector: 'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="image"]):not([type="range"]):not([type="file"]), select, textarea',
  visibility: "visual",
  evaluate(element) {
    if (element.closest(':disabled, [aria-disabled="true"]')) return { status: "pass" };
    const ownRect = element.getBoundingClientRect();
    if (ownRect.width <= 1 || ownRect.height <= 1) return { status: "pass" };
    const style = getComputedStyle(element);
    if (style.appearance !== "none" && element.tagName === "SELECT") return { status: "pass" };
    const surrounding = effectiveBackground(element.parentElement ?? element);
    if (!surrounding) {
      return { status: "incomplete", message: "The background around this field could not be determined \u2014 check the field has a visible boundary by eye." };
    }
    const boundaries = [];
    let translucentSeen = false;
    const fill = parseColor(style.backgroundColor);
    if (fill && fill.a > 0) {
      boundaries.push(fill.a >= 1 ? fill : composite(fill, surrounding));
      if (fill.a < 1) translucentSeen = true;
    }
    let hasBorder = false;
    for (const side of ["Top", "Right", "Bottom", "Left"]) {
      if (parseFloat(style[`border${side}Width`]) <= 0) continue;
      if (style[`border${side}Style`] === "none") continue;
      hasBorder = true;
      const color = parseColor(style[`border${side}Color`]);
      if (!color || color.a === 0) continue;
      boundaries.push(color.a >= 1 ? color : composite(color, surrounding));
      if (color.a < 1) translucentSeen = true;
    }
    if (parseFloat(style.outlineWidth) > 0 && style.outlineStyle !== "none") {
      const color = parseColor(style.outlineColor);
      if (color && color.a > 0) {
        hasBorder = true;
        boundaries.push(color.a >= 1 ? color : composite(color, surrounding));
        if (color.a < 1) translucentSeen = true;
      }
    }
    const best = Math.max(1, ...boundaries.map((color) => contrastRatio(color, surrounding)));
    if (best >= 3) return { status: "pass" };
    if (style.boxShadow !== "none" || style.backgroundImage !== "none") {
      return {
        status: "incomplete",
        message: "This field\u2019s boundary may come from a box-shadow or background image \u2014 check it reaches 3:1 against the page by eye."
      };
    }
    if (translucentSeen) {
      return {
        status: "incomplete",
        message: `This field's boundary uses translucent colours and reaches about ${showRatio(best)}:1 against the page \u2014 near the 3:1 minimum; check by eye.`
      };
    }
    for (let wrapper = element.parentElement, depth = 0; wrapper && depth < 4; wrapper = wrapper.parentElement, depth++) {
      const wrapperRect = wrapper.getBoundingClientRect();
      if (wrapperRect.height > ownRect.height + 24 || wrapperRect.width > ownRect.width + 160) break;
      const wrapperStyle = getComputedStyle(wrapper);
      const wrapperHasBorder = ["Top", "Right", "Bottom", "Left"].some((side) => parseFloat(wrapperStyle[`border${side}Width`]) > 0 && wrapperStyle[`border${side}Style`] !== "none" && (parseColor(wrapperStyle[`border${side}Color`])?.a ?? 0) > 0);
      if (wrapperHasBorder) return { status: "pass" };
      const wrapperFill = parseColor(wrapperStyle.backgroundColor);
      if (wrapperFill && wrapperFill.a >= 1) {
        const around = effectiveBackground(wrapper.parentElement ?? wrapper);
        if (around && contrastRatio(wrapperFill, around) >= 3) return { status: "pass" };
        break;
      }
    }
    if (!hasBorder && (!fill || fill.a === 0)) {
      return {
        status: "incomplete",
        message: "This field has no border and no distinct fill \u2014 if its label and layout don\u2019t already make it findable, low-vision users can\u2019t locate it. Check by eye (3:1 boundary or clear identification needed)."
      };
    }
    return {
      status: "incomplete",
      message: `This field's boundary reaches only ${showRatio(best)}:1 against the page \u2014 below the 3:1 minimum. That\u2019s conformant ONLY if the field is identifiable without the boundary (visible label, placeholder position); check by eye.`
    };
  }
};

// src/engine/rules/wcag/1.4.12-text-spacing.js
var override = (minHeight) => `html { overflow-anchor: none !important; min-height: ${minHeight}px !important; }
* {
  line-height: 1.5 !important;
  letter-spacing: 0.12em !important;
  word-spacing: 0.16em !important;
}
p { margin-bottom: 2em !important; }`;
var clipped = (element) => element.scrollWidth > element.clientWidth + 2 || element.scrollHeight > element.clientHeight + 2;
var text_spacing_default = {
  id: "text-spacing",
  name: "Text spacing overrides",
  impact: "serious",
  tags: ["wcag21aa", "wcag1412"],
  help: "Text must survive user spacing overrides without being cut off",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html",
  // Candidates: containers that CAN clip. Everything else reflows freely
  // and passes by construction.
  selector: "p, h1, h2, h3, h4, h5, h6, a, button, li, span, div, td, th, label, dt, dd, figcaption",
  visibility: "visual",
  evaluateAll(elements) {
    const doc = elements[0]?.ownerDocument ?? document;
    if (elements.length > 2e4) return elements.map(() => ({ status: "pass" }));
    const candidates = elements.map((element) => {
      const style = getComputedStyle(element);
      const hides = /(hidden|clip)/.test(`${style.overflowX} ${style.overflowY}`);
      if (!hides || !element.textContent.trim()) return null;
      return element.clientWidth > 4 && element.clientHeight > 4 ? element : null;
    });
    if (!candidates.some(Boolean)) return elements.map(() => ({ status: "pass" }));
    const before = candidates.map((element) => element && clipped(element));
    const win = doc.defaultView;
    const scrollX = win?.scrollX ?? 0;
    const scrollY = win?.scrollY ?? 0;
    const probe2 = doc.createElement("style");
    probe2.dataset.pourAudit = "probe";
    probe2.textContent = override(doc.documentElement.scrollHeight);
    doc.documentElement.append(probe2);
    let after;
    try {
      void doc.documentElement.offsetHeight;
      after = candidates.map((element) => element && clipped(element));
    } finally {
      probe2.remove();
      void doc.documentElement.offsetHeight;
      if (win && (win.scrollX !== scrollX || win.scrollY !== scrollY)) win.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
    }
    return elements.map((element, i) => {
      if (!candidates[i]) return { status: "pass" };
      if (before[i] || !after[i]) return { status: "pass" };
      return {
        status: "incomplete",
        message: "With the WCAG text-spacing overrides applied (line height 1.5, letter/word spacing bumps), this container overflows instead of growing \u2014 if that hides text rather than empty trailing spacing, users who need wider spacing lose content. Check with the overrides applied; to be safe, let the container grow (min-height instead of height, avoid overflow:hidden on text)."
      };
    });
  }
};

// src/engine/rules/wcag/1.4.10-reflow.js
var reflow_default = {
  id: "reflow",
  name: "Content reflow",
  impact: "moderate",
  tags: ["wcag21aa", "wcag1410"],
  help: "Content should reflow to one-dimensional scrolling",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html",
  selector: "html",
  visibleOnly: false,
  evaluate(element) {
    const doc = element.ownerDocument;
    const scroller = doc.scrollingElement ?? doc.documentElement;
    const overflow = scroller.scrollWidth - scroller.clientWidth;
    if (overflow <= 1) return { status: "pass" };
    return {
      status: "incomplete",
      message: `The page already scrolls horizontally by ${Math.round(overflow)}px at the current viewport \u2014 at the 320px reflow breakpoint it will be worse. Verify content reflows at 320 CSS px width (data tables, maps and images are exempt).`
    };
  }
};

// src/engine/rules/wcag/2.4.7-focus-visible.js
var FOCUS_TOKEN = /:focus(?:-visible)?(?![\w-])/g;
var HAS_FOCUS = /:focus(?:-visible)?(?![\w-])/;
function focusSuppressors(doc) {
  const suspects = [];
  const replacementIn = (style) => style.getPropertyValue("box-shadow") || style.getPropertyValue("border") || style.getPropertyValue("border-color") || style.getPropertyValue("background") || style.getPropertyValue("background-color") || style.getPropertyValue("text-decoration");
  const outlineOf = (style) => `${style.getPropertyValue("outline")} ${style.getPropertyValue("outline-style")} ${style.getPropertyValue("outline-width")}`;
  const removesOutline = (outline) => /\bnone\b/.test(outline) || /(^|\s)0(px)?(\s|$)/.test(outline);
  const subjects = (selectorText) => selectorText.split(",").map((part) => part.replace(FOCUS_TOKEN, "").replace(/\s+/g, " ").trim());
  let sheet = null;
  const inspect2 = (rule) => {
    if (!rule.selectorText || !/:focus/.test(rule.selectorText)) return;
    if (/:not\(\s*:focus-visible\s*\)/.test(rule.selectorText)) return;
    const style = rule.style;
    if (!style) return;
    const styles = [style, ...[...rule.cssRules ?? []].filter((child) => child.style && !child.selectorText).map((child) => child.style)];
    const replaced = styles.some(replacementIn);
    const outlines = styles.map(outlineOf).filter((o) => o.trim());
    const showsOutline = outlines.some((o) => !removesOutline(o));
    if (HAS_FOCUS.test(rule.selectorText) && (replaced || showsOutline)) {
      sheet.providers.push({ order: sheet.order, subjects: subjects(rule.selectorText) });
    }
    if (!outlines.some(removesOutline) || replaced) return;
    sheet.suspects.push({ order: sheet.order, selector: rule.selectorText, subjects: subjects(rule.selectorText) });
  };
  const covered = (subject, provider) => provider.subjects.some((p) => p === subject || p === "*" || p === "");
  const settle = () => {
    for (const suspect of sheet.suspects) {
      const restored = suspect.subjects.every((subject) => sheet.providers.some((provider) => provider.order > suspect.order && covered(subject, provider)));
      if (!restored) suspects.push(suspect.selector);
    }
  };
  const scan = (rules) => {
    for (const rule of rules) {
      sheet.order++;
      inspect2(rule);
      if (rule.cssRules?.length) scan(rule.cssRules);
    }
  };
  for (const styleSheet of doc.styleSheets) {
    sheet = { order: 0, suspects: [], providers: [] };
    try {
      scan(styleSheet.cssRules);
    } catch {
    }
    settle();
  }
  return suspects;
}
var focus_visible_default = {
  id: "focus-visible",
  name: "Visible focus",
  impact: "serious",
  tags: ["wcag2aa", "wcag247"],
  help: "Keyboard focus must remain visible",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html",
  selector: "html",
  visibleOnly: false,
  evaluate(element) {
    const suspects = focusSuppressors(element.ownerDocument);
    if (!suspects.length) return { status: "pass" };
    const shown = suspects.slice(0, 3).join(", ");
    return {
      status: "incomplete",
      message: `${suspects.length} CSS rule(s) remove the focus outline without setting a replacement in the same rule (e.g. ${shown}) \u2014 if no other rule provides a visible indicator, keyboard users lose their place. Tab through the page to check.`
    };
  }
};

// src/engine/rules/wcag/2.4.11-focus-not-obscured.js
var FOCUSABLE3 = 'a[href], button, input:not([type="hidden"]), select, textarea, summary, [tabindex]:not([tabindex="-1"])';
function edgeReserved(doc, edge, needed) {
  const scroller = doc.scrollingElement ?? doc.documentElement;
  const style = getComputedStyle(scroller);
  const value = edge === "top" ? style.scrollPaddingTop : style.scrollPaddingBottom;
  const px2 = value && value.endsWith("px") ? parseFloat(value) : 0;
  return px2 >= needed - 1;
}
var focus_not_obscured_default = {
  id: "focus-not-obscured",
  name: "Unobscured focus",
  impact: "serious",
  tags: ["wcag22aa", "wcag2411"],
  help: "Focused elements must not be fully hidden behind overlays",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html",
  selector: FOCUSABLE3,
  visibility: "visual",
  evaluateAll(elements) {
    const doc = elements[0]?.ownerDocument ?? document;
    const win = doc.defaultView;
    const modal = [...doc.querySelectorAll('dialog[open], [role="dialog"], [role="alertdialog"], [aria-modal="true"]')].some((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && getComputedStyle(el).visibility !== "hidden";
    });
    if (modal) return elements.map(() => ({ status: "pass" }));
    const overlayVerdict = /* @__PURE__ */ new Map();
    const isObscuringOverlay = (layer) => {
      if (overlayVerdict.has(layer)) return overlayVerdict.get(layer);
      let verdict = false;
      const style = getComputedStyle(layer);
      if (style.position === "fixed" || style.position === "sticky") {
        const bg = style.backgroundColor.match(/rgba?\(([^)]+)\)/)?.[1]?.split(",");
        const alpha = bg?.[3] === void 0 ? 1 : parseFloat(bg[3]);
        const rect = layer.getBoundingClientRect();
        verdict = alpha >= 0.9 && rect.width >= 40 && rect.height >= 24;
      }
      overlayVerdict.set(layer, verdict);
      return verdict;
    };
    const covered = (rect, overlay) => rect.left >= overlay.left && rect.right <= overlay.right && rect.top >= overlay.top && rect.bottom <= overlay.bottom;
    return elements.map((element) => {
      if (element.matches(":disabled")) return { status: "pass" };
      if (isInert(element)) return { status: "pass" };
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return { status: "pass" };
      if (rect.bottom < 0 || rect.right < 0 || rect.top > win.innerHeight || rect.left > win.innerWidth) {
        return { status: "pass" };
      }
      const x = Math.min(Math.max(rect.left + rect.width / 2, 0), win.innerWidth - 1);
      const y = Math.min(Math.max(rect.top + rect.height / 2, 0), win.innerHeight - 1);
      const stack = doc.elementsFromPoint(x, y);
      const index = stack.indexOf(element);
      if (index <= 0) return { status: "pass" };
      const blocker = stack.slice(0, index).find((layer) => !layer.contains(element) && !element.contains(layer) && isObscuringOverlay(layer) && covered(rect, layer.getBoundingClientRect()));
      if (!blocker) return { status: "pass" };
      const panel = blocker.getBoundingClientRect();
      const edge = panel.top <= 1 && panel.bottom < win.innerHeight ? "top" : panel.bottom >= win.innerHeight - 1 ? "bottom" : null;
      if (edge && edgeReserved(doc, edge, panel.height)) return { status: "pass" };
      return {
        status: "incomplete",
        message: "This element is currently underneath an opaque fixed panel. Whether that breaks 2.4.11 depends on where the page sits when focus reaches it \u2014 the browser does not scroll an element that is already in the viewport, merely covered, so focus can land invisibly. Tab through the page and check the focus indicator is never entirely hidden.",
        fix: `Reserve room for the panel with scroll-padding-${edge ?? "bottom"} on the scrolling container, or move focus clear of it when the panel is up.`
      };
    });
  }
};

// src/engine/rules/wcag/3.3.8-auth-field-obstruction.js
var auth_field_obstruction_default = {
  id: "auth-field-obstruction",
  name: "Accessible login fields",
  impact: "serious",
  tags: ["wcag22aa", "wcag338"],
  help: "Login fields must not block paste or password managers",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html",
  selector: 'input[type="password"]:not([autocomplete~="new-password"]), input[autocomplete~="current-password"], input[autocomplete~="one-time-code"]',
  evaluate(element) {
    const blocksPaste = /return\s+false|preventDefault/.test(element.getAttribute("onpaste") ?? "");
    const tokens = (element.getAttribute("autocomplete") ?? "").trim().toLowerCase().split(/\s+/).filter(Boolean);
    const autocompleteOff = tokens.length === 1 && tokens[0] === "off";
    if (!blocksPaste && !autocompleteOff) return { status: "pass" };
    const form = element.form ?? element.closest("form");
    const passwordFields = form ? form.querySelectorAll('input[type="password"]').length : element.type === "password" ? 1 : 0;
    const identityField = form?.querySelector('input[autocomplete~="username"], input[autocomplete~="email"], input[type="email"]');
    const provenLogin = tokens.includes("current-password") || tokens.includes("one-time-code") || passwordFields === 1 && Boolean(identityField);
    const scopeQuestion = passwordFields >= 2 ? "This form holds more than one password field, the shape of account sign-up or a password change, which 3.3.8 does not cover unless the field takes an existing credential. Confirm whether this field is part of an authentication step at all." : "Nothing here shows the field takes an existing credential (no current-password purpose, and no username or email field beside it), so confirm it is part of signing in before treating this as a failure.";
    const step = provenLogin ? "this login" : "this step";
    if (blocksPaste && autocompleteOff) {
      if (provenLogin) {
        return {
          status: "fail",
          message: `This authentication field blocks pasting AND sets autocomplete="off", so both of the mechanisms 3.3.8 names are obstructed at once: copy and paste, and password-manager entry. What is left is typing the credential from memory.`,
          fix: 'Remove the paste blocking, and drop autocomplete="off" so a password manager can fill the field.'
        };
      }
      return {
        status: "incomplete",
        message: `This password field blocks pasting AND sets autocomplete="off". If it is part of signing in, both of the mechanisms 3.3.8 names are obstructed at once (copy and paste, and password-manager entry) and it fails. ${scopeQuestion}`,
        fix: 'Remove the paste blocking, and drop autocomplete="off" so a password manager can fill the field.'
      };
    }
    if (blocksPaste) {
      return {
        status: "incomplete",
        message: `This field blocks pasting, which removes copy and paste, one of the two mechanisms 3.3.8 names. A password manager fills the field directly and is unaffected, so this is only a failure if nothing else here helps. Check whether a password manager can complete ${step}, or whether the page offers another way in such as a passkey or a federated sign-in.${provenLogin ? "" : ` ${scopeQuestion}`}`,
        fix: "Remove the paste blocking, or make sure another way to sign in is available that does not rely on recalling the credential."
      };
    }
    return {
      status: "incomplete",
      message: `This field sets autocomplete="off", discouraging password managers. Browsers often fill anyway: verify a password manager can complete ${step} without retyping.${provenLogin ? "" : ` ${scopeQuestion}`}`
    };
  }
};

// src/engine/rules/wcag/1.1.1-embed-alt.js
var embed_alt_default = {
  id: "embed-alt",
  name: "Embed accessible name",
  impact: "serious",
  tags: ["wcag2a", "wcag111"],
  help: "<embed> needs an accessible name",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
  selector: "embed",
  evaluate(element, { accessibleName: accessibleName2 }) {
    if (accessibleName2(element)) return { status: "pass" };
    const type = (element.getAttribute("type") ?? "").trim().toLowerCase();
    const src = (element.getAttribute("src") ?? "").split(/[?#]/)[0].toLowerCase();
    const isDocument = type.startsWith("text/") || type === "application/pdf" || type === "application/xhtml+xml" || !type && /\.(html?|xhtml|pdf|txt)$/.test(src);
    if (isDocument) {
      return {
        status: "incomplete",
        message: "This <embed> renders a text document but has no accessible name \u2014 assistive technology users get no indication of what the embedded document is. Check it is identified in the surrounding context.",
        fix: 'Add title="\u2026" naming the embedded document.'
      };
    }
    return {
      status: "fail",
      message: "This <embed> has no accessible name \u2014 screen readers cannot tell users what the embedded content is.",
      fix: 'Add title="\u2026" (or aria-label) describing what the embed shows.'
    };
  }
};

// src/engine/rules/wcag/1.1.1-canvas-alt.js
var canvas_alt_default = {
  id: "canvas-alt",
  name: "Canvas accessible name",
  impact: "moderate",
  tags: ["wcag2a", "wcag111"],
  help: "Meaningful <canvas> graphics need an accessible name or fallback",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
  selector: "canvas:not([role])",
  evaluate(element, { accessibleName: accessibleName2 }) {
    if (accessibleName2(element)) return { status: "pass" };
    const fallback = [...element.childNodes].filter((node) => !/^(SCRIPT|STYLE|TEMPLATE)$/.test(node.nodeName)).map((node) => node.textContent).join("").trim();
    if (fallback) return { status: "pass" };
    const control = element.closest('a[href], button, [role="button"], [role="link"]');
    if (control && accessibleName2(control)) return { status: "pass" };
    const rect = element.getBoundingClientRect();
    if (rect.width < 32 || rect.height < 32) return { status: "pass" };
    return {
      status: "incomplete",
      message: "This canvas has no accessible name, no fallback content, and is not marked decorative \u2014 if it draws a chart or diagram, screen reader users get nothing at all.",
      fix: 'If decorative, add aria-hidden="true". If meaningful, add role="img" with aria-label="\u2026", or put a text alternative inside the <canvas> as fallback content.'
    };
  }
};

// src/engine/rules/wcag/2.2.2-video-loop-motion.js
function pauseControlFor(video, isVisible) {
  const root = video.getRootNode();
  if (!root.querySelectorAll) return null;
  const byId = (id) => root.getElementById ? root.getElementById(id) : root.querySelector(`#${CSS.escape(id)}`);
  for (const control of root.querySelectorAll('button[aria-controls], [role="button"][aria-controls], input[type="button"][aria-controls]')) {
    if (control.disabled || !isVisible(control)) continue;
    for (const id of control.getAttribute("aria-controls").split(/\s+/)) {
      const target2 = id && byId(id);
      if (target2 && (target2 === video || target2.contains(video))) return control;
    }
  }
  return null;
}
var video_loop_motion_default = {
  id: "video-loop-motion",
  name: "Looping video control",
  impact: "serious",
  tags: ["wcag2a", "wcag222"],
  help: "Looping autoplay video must be pausable",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
  selector: "video[autoplay][loop]:not([controls])",
  // Movement is a visual matter: an aria-hidden hero still moves on screen.
  visibility: "visual",
  evaluate(element, { isVisible }) {
    const rect = element.getBoundingClientRect();
    if (rect.width < 64 && rect.height < 64) return { status: "pass" };
    if (element.paused && element.readyState >= 2) return { status: "pass" };
    if (pauseControlFor(element, isVisible)) return { status: "pass" };
    return {
      status: "incomplete",
      message: "This video auto-plays on a loop with no built-in controls: it starts by itself and never ends, so it runs well past the five seconds at which WCAG 2.2.2 requires a way to pause, stop or hide it. Check the page offers a pause control that reaches this video, or that the video is the only content presented.",
      fix: "Add controls, wire a visible pause button to it, or drop autoplay \u2014 and honour prefers-reduced-motion."
    };
  }
};

// src/engine/rules/wcag/2.4.3-visual-order-divergence.js
var FLEXGRID = /^(inline-)?(flex|grid)$/;
function tabbable(element) {
  if (element.disabled || element.tabIndex < 0) return false;
  if (isInert(element)) return false;
  return true;
}
function visualSequence(entries, rightToLeft) {
  const rows = [];
  for (const entry of [...entries].sort((a, b) => a.rect.top - b.rect.top)) {
    const row = rows.find((candidates) => {
      const first = candidates[0].rect;
      const overlap = Math.min(first.bottom, entry.rect.bottom) - Math.max(first.top, entry.rect.top);
      return overlap > Math.min(first.height, entry.rect.height) / 2;
    });
    if (row) row.push(entry);
    else rows.push([entry]);
  }
  return rows.flatMap((row) => row.sort((a, b) => rightToLeft ? b.rect.right - a.rect.right : a.rect.left - b.rect.left));
}
var visual_order_divergence_default = {
  id: "visual-order-divergence",
  name: "Focus order vs visual order",
  impact: "moderate",
  tags: ["wcag2a", "wcag243"],
  help: "CSS reordering should not make Tab jump against the visual order",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
  selector: 'a[href], button, input:not([type="hidden"]), select, textarea, summary, [tabindex]',
  evaluateAll(elements) {
    const outcomes = /* @__PURE__ */ new Map();
    const groups = /* @__PURE__ */ new Map();
    for (const element of elements) {
      if (!tabbable(element)) continue;
      const parent = element.parentElement;
      if (!parent) continue;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(element);
    }
    for (const [parent, children] of groups) {
      if (children.length < 2) continue;
      const parentStyle = getComputedStyle(parent);
      if (!FLEXGRID.test(parentStyle.display)) continue;
      const reversed = /-reverse$/.test(parentStyle.flexDirection);
      const entries = children.map((element) => ({ element, style: getComputedStyle(element) })).filter(({ style }) => style.position !== "absolute" && style.position !== "fixed").map((entry) => ({ ...entry, rect: entry.element.getBoundingClientRect() })).filter(({ rect }) => rect.width > 0 && rect.height > 0);
      if (entries.length < 2) continue;
      const usesOrder = entries.some(({ style }) => style.order !== "0");
      if (!reversed && !usesOrder) continue;
      const visual = visualSequence(entries, parentStyle.direction === "rtl");
      const diverges = visual.some((entry, i) => entry !== entries[i]);
      if (!diverges) continue;
      const cause = reversed ? `flex-direction: ${parentStyle.flexDirection}` : "CSS order";
      outcomes.set(entries[0].element, {
        status: "incomplete",
        message: `Keyboard focus moves through these ${entries.length} controls in DOM order, but ${cause} arranges them differently on screen \u2014 Tab will jump against the visual layout. Check the focus sequence still preserves meaning and operability.`,
        fix: "Reorder the source to match the visual order instead of reordering with CSS, or confirm the divergence is harmless here."
      });
    }
    return elements.map((element) => outcomes.get(element) ?? { status: "pass" });
  }
};

// src/engine/rules/wcag/1.2.1-audio-transcript.js
var audio_transcript_default = {
  id: "audio-transcript",
  name: "Audio transcript",
  impact: "serious",
  tags: ["wcag2a", "wcag121"],
  help: "Prerecorded audio-only content needs a transcript",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html",
  selector: "audio",
  visibleOnly: false,
  evaluate(element) {
    if (!element.currentSrc && !element.getAttribute("src") && !element.querySelector("source")) {
      return { status: "pass" };
    }
    if ((element.muted || element.volume === 0) && !element.hasAttribute("controls")) {
      return { status: "pass" };
    }
    return {
      status: "incomplete",
      message: "This audio content needs a transcript nearby \u2014 deaf and hard-of-hearing users get nothing from the recording itself. Check that an equivalent text version exists and is easy to find from the player (1.2.1 covers prerecorded audio; a live stream is 1.2.9 instead).",
      fix: "Provide a transcript of the recording as text on the page or behind a clearly labelled link next to the player."
    };
  }
};

// src/engine/rules/wcag/1.3.2-reading-order-divergence.js
var reading_order_divergence_default = {
  id: "reading-order-divergence",
  name: "Reading order vs visual order",
  impact: "moderate",
  tags: ["wcag2a", "wcag132"],
  help: "CSS reordering should not make reading order diverge from the visual order",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html",
  selector: "*",
  evaluateAll(elements) {
    const outcomes = /* @__PURE__ */ new Map();
    const groups = /* @__PURE__ */ new Map();
    for (const element of elements) {
      const parent = element.parentElement;
      if (!parent) continue;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(element);
    }
    for (const [parent, children] of groups) {
      if (children.length < 2) continue;
      const parentStyle = getComputedStyle(parent);
      if (!FLEXGRID.test(parentStyle.display)) continue;
      const reversed = /-reverse$/.test(parentStyle.flexDirection);
      const entries = children.map((element) => ({ element, style: getComputedStyle(element) })).filter(({ style }) => style.position !== "absolute" && style.position !== "fixed").map((entry) => ({ ...entry, rect: entry.element.getBoundingClientRect() })).filter(({ rect }) => rect.width > 0 && rect.height > 0);
      if (entries.length < 2) continue;
      const usesOrder = entries.some(({ style }) => style.order !== "0");
      if (!reversed && !usesOrder) continue;
      const withText = entries.filter(({ element }) => (element.textContent || "").trim().length > 0);
      if (withText.length < 2) continue;
      if (entries.every(({ element }) => element.matches("a[href], button, input, select, textarea, summary, [tabindex]") && tabbable(element))) continue;
      const visual = visualSequence(entries, parentStyle.direction === "rtl");
      const diverges = visual.some((entry, i) => entry !== entries[i]);
      if (!diverges) continue;
      const cause = reversed ? `flex-direction: ${parentStyle.flexDirection}` : "CSS order";
      outcomes.set(entries[0].element, {
        status: "incomplete",
        message: `A screen reader reads these ${entries.length} blocks in DOM order, but ${cause} arranges them differently on screen \u2014 sighted and screen reader users get two different sequences. Check the source order still tells the same story as the layout.`,
        fix: "Reorder the source to match the visual order instead of reordering with CSS, or confirm the sequence difference does not change meaning here."
      });
    }
    return elements.map((element) => outcomes.get(element) ?? { status: "pass" });
  }
};

// src/engine/rules/wcag/2.5.7-drag-alternative.js
var drag_alternative_default = {
  id: "drag-alternative",
  name: "Dragging alternative",
  impact: "moderate",
  tags: ["wcag22aa", "wcag257"],
  help: "Dragging must have a single-pointer alternative",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html",
  selector: '[draggable="true" i]:not(img):not(a[href])',
  evaluate() {
    return {
      status: "incomplete",
      message: "This element declares itself draggable, and 2.5.7 requires everything achievable by dragging to also work with single clicks or taps \u2014 tremors, switch access and head pointers can press but not drag. Check an equivalent no-drag path exists (buttons to reorder, a menu to move, a field to set the value), unless dragging itself is essential here.",
      fix: 'Add a single-pointer way to do the same thing, e.g. up/down buttons beside a sortable item or a "move to" action in a menu.'
    };
  }
};

// src/engine/rules/wcag/3.3.7-redundant-entry.js
var EXEMPT = /* @__PURE__ */ new Set(["new-password", "current-password", "one-time-code", "on", "off"]);
var redundant_entry_default = {
  id: "redundant-entry",
  name: "Redundant entry",
  impact: "moderate",
  tags: ["wcag22a", "wcag337"],
  help: "A form should not ask for the same information twice",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html",
  selector: "form",
  evaluate(element, { isVisible }) {
    const seen2 = /* @__PURE__ */ new Map();
    for (const field of element.querySelectorAll("input[autocomplete], select[autocomplete], textarea[autocomplete]")) {
      if (field.disabled || field.readOnly) continue;
      if (!isVisible(field)) continue;
      if (field instanceof HTMLInputElement && (field.type === "hidden" || field.type === "password")) continue;
      const purpose = (field.getAttribute("autocomplete") || "").trim().toLowerCase().replace(/\s+/g, " ");
      if (!purpose || EXEMPT.has(purpose)) continue;
      if (seen2.has(purpose)) {
        return {
          status: "incomplete",
          message: `This form asks for "${purpose}" twice \u2014 3.3.7 says information the user already entered must be auto-populated or selectable, not typed again. A deliberate confirmation field can be essential (the criterion's own escape); that judgement is yours.`,
          fix: "Auto-populate the second field from the first, offer the earlier value for selection, or drop the duplicate. Keep it only if re-entry is genuinely essential here.",
          data: { purpose }
        };
      }
      seen2.set(purpose, field);
    }
    return { status: "pass" };
  }
};

// src/engine/rules/wcag/4.1.2-invoker-target.js
var POPOVER_COMMANDS = /* @__PURE__ */ new Set(["toggle-popover", "show-popover", "hide-popover"]);
var DIALOG_COMMANDS = /* @__PURE__ */ new Set(["show-modal", "close", "request-close"]);
var invoker_target_default = {
  id: "invoker-target",
  name: "Popover and command targets",
  impact: "serious",
  tags: ["wcag2a", "wcag412"],
  help: "popovertarget and commandfor must point at an element they can act on",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: "[popovertarget], [commandfor]",
  evaluate(element) {
    const root = element.getRootNode();
    const lookup = (id) => id && root.getElementById?.(id) || null;
    const problems = [];
    if (element.hasAttribute("popovertarget")) {
      const id = element.getAttribute("popovertarget").trim();
      const target2 = lookup(id);
      if (!target2) {
        problems.push(`popovertarget="${id}" names no element in this document`);
      } else if (!target2.hasAttribute("popover")) {
        problems.push(`popovertarget="${id}" points at a <${target2.tagName.toLowerCase()}> with no popover attribute, which the button cannot open`);
      }
    }
    if (element.hasAttribute("commandfor")) {
      const id = element.getAttribute("commandfor").trim();
      const command = (element.getAttribute("command") ?? "").trim().toLowerCase();
      const target2 = lookup(id);
      if (!target2) {
        problems.push(`commandfor="${id}" names no element in this document`);
      } else if (!command) {
        problems.push("commandfor has no command attribute, so activating the button does nothing");
      } else if (POPOVER_COMMANDS.has(command) && !target2.hasAttribute("popover")) {
        problems.push(`command="${command}" needs a popover, and "${id}" has no popover attribute`);
      } else if (DIALOG_COMMANDS.has(command) && target2.tagName !== "DIALOG") {
        problems.push(`command="${command}" needs a <dialog>, and "${id}" is a <${target2.tagName.toLowerCase()}>`);
      }
    }
    if (!problems.length) return { status: "pass" };
    return {
      status: "fail",
      message: `${problems.join("; ")}. Activating this button does nothing, and the expanded state and control relationship the browser would expose for it are missing.`,
      fix: "Point the attribute at the id of the popover or dialog it drives (give that element the popover attribute, or make it a <dialog>), and keep the id unique in this tree."
    };
  }
};

// src/engine/rules/wcag/2.3.3-reduced-motion.js
var MOTION_CSS = [
  "transform",
  "translate",
  "rotate",
  "scale",
  "offset-path",
  "offset-distance",
  "offset-rotate",
  "left",
  "right",
  "top",
  "bottom"
];
var INTERACTION = /:(?:hover|focus-visible|focus-within|focus|active)\b/;
var INTERACTION_ALL = /:(?:hover|focus-visible|focus-within|focus|active)\b/g;
var ANIMATES = /\b(?:all|transform|translate|rotate|scale|offset-path|offset-distance|offset-rotate|left|right|top|bottom|inset)\b/;
function movesFar(rule) {
  const style = rule.style;
  if (["offset-path", "offset-distance", "offset-rotate", "rotate", "left", "right", "top", "bottom"].some((property) => style.getPropertyValue(property))) return true;
  const values = ["transform", "translate", "scale"].map((property) => style.getPropertyValue(property)).join(" ");
  if (/rotate|skew|matrix|%|em|rem|vw|vh/.test(values)) return true;
  const px2 = [...values.matchAll(/(-?\d*\.?\d+)px/g)].map((m) => Math.abs(parseFloat(m[1])));
  if (px2.some((n) => n >= 8)) return true;
  const scales = [...values.matchAll(/scale[XYZ3d]*\(([^)]*)\)/gi)].flatMap((m) => m[1].split(",").map((v) => parseFloat(v)));
  const bareScale = style.getPropertyValue("scale").split(/\s+/).map((v) => parseFloat(v)).filter((v) => !Number.isNaN(v));
  return [...scales, ...bareScale].some((v) => !Number.isNaN(v) && (v < 0.85 || v > 1.15));
}
function rulesAnimate(doc, rule) {
  const own = rule.style.getPropertyValue("transition-duration") || rule.style.getPropertyValue("animation-name");
  if (own && own !== "none" && own !== "0s") return true;
  const resting = rule.selectorText.replace(INTERACTION_ALL, "").trim();
  if (!resting || /^[,\s]*$/.test(resting)) return false;
  let subjects;
  try {
    subjects = doc.querySelectorAll(resting);
  } catch {
    return false;
  }
  let seen2 = 0;
  for (const subject of subjects) {
    if (seen2++ >= 5) break;
    const style = doc.defaultView.getComputedStyle(subject);
    const durations = style.transitionDuration.split(",").map((d) => parseFloat(d) || 0);
    if (!durations.some((d) => d > 0)) continue;
    if (ANIMATES.test(style.transitionProperty)) return true;
  }
  return false;
}
function readStyles(doc) {
  const facts = { honours: false, hoverMotion: 0, hoverSelectors: [], unreadable: 0 };
  const scan = (rules) => {
    for (const rule of rules) {
      const media = rule.media?.mediaText;
      if (media && /prefers-reduced-motion/i.test(media)) facts.honours = true;
      if (rule.selectorText && INTERACTION.test(rule.selectorText) && rule.style && MOTION_CSS.some((property) => rule.style.getPropertyValue(property)) && movesFar(rule) && rulesAnimate(doc, rule)) {
        facts.hoverMotion += 1;
        if (facts.hoverSelectors.length < 3) facts.hoverSelectors.push(rule.selectorText.slice(0, 80));
      }
      const inner = rule.cssRules ?? rule.styleSheet?.cssRules;
      if (inner) {
        try {
          scan(inner);
        } catch {
          facts.unreadable += 1;
        }
      }
    }
  };
  const sheets = [...doc.styleSheets ?? [], ...doc.adoptedStyleSheets ?? []];
  for (const sheet of sheets) {
    try {
      scan(sheet.cssRules);
    } catch {
      facts.unreadable += 1;
    }
  }
  return facts;
}
function scrollDrivenMotion(doc) {
  if (typeof doc.getAnimations !== "function") return 0;
  let animations;
  try {
    animations = doc.getAnimations();
  } catch {
    return 0;
  }
  let count2 = 0;
  for (const animation of animations) {
    if (!animation.timeline || animation.timeline === doc.timeline) continue;
    let keyframes;
    try {
      keyframes = animation.effect?.getKeyframes?.() ?? [];
    } catch {
      continue;
    }
    if (keyframesMove(keyframes)) count2 += 1;
  }
  return count2;
}
var reduced_motion_default = {
  id: "reduced-motion",
  name: "Motion honours reduced-motion",
  impact: "moderate",
  tags: ["wcag21aaa", "wcag233"],
  help: "Motion set off by scrolling, hovering or focusing should be switchable off",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html",
  selector: "html",
  visibleOnly: false,
  evaluate(element) {
    const doc = element.ownerDocument;
    const win = doc.defaultView;
    const styles = readStyles(doc);
    if (styles.honours) return { status: "pass" };
    const evidence = [];
    const scrolling = scrollDrivenMotion(doc);
    if (scrolling) evidence.push(`${scrolling} scroll-driven animation${scrolling === 1 ? "" : "s"} that move${scrolling === 1 ? "s" : ""} content`);
    const smooth = [doc.documentElement, doc.body].some((node) => node && win.getComputedStyle(node).scrollBehavior === "smooth");
    if (smooth) evidence.push("smooth scrolling on in-page navigation (scroll-behavior: smooth)");
    if (styles.hoverMotion) {
      const more = styles.hoverMotion > styles.hoverSelectors.length ? ", \u2026" : "";
      evidence.push(`${styles.hoverMotion} style rule${styles.hoverMotion === 1 ? "" : "s"} animating movement on hover or focus (${styles.hoverSelectors.join(", ")}${more})`);
    }
    if (!evidence.length) return { status: "pass" };
    const unread = styles.unreadable ? ` (${styles.unreadable} stylesheet${styles.unreadable === 1 ? "" : "s"} could not be read and might carry one)` : "";
    return {
      status: "incomplete",
      message: `This page moves content when people interact with it (${evidence.join("; ")}), and none of the stylesheets this audit could read honours prefers-reduced-motion${unread}. 2.3.3 asks that such motion can be turned off unless it is essential.`,
      fix: "Put the motion inside @media (prefers-reduced-motion: no-preference), or remove it under @media (prefers-reduced-motion: reduce), keeping only motion that is essential to the function or the information."
    };
  }
};

// src/engine/rules/wcag/3.2.2-on-input-navigation.js
var NAVIGATES = /\blocation\s*(\+?=(?!=)|\.\s*(href\s*\+?=(?!=)|(assign|replace|reload)\s*\())|\.(submit|requestSubmit)\s*\(|window\.open\s*\(/;
var on_input_navigation_default = {
  id: "on-input-navigation",
  name: "Unexpected context change",
  impact: "serious",
  tags: ["wcag2a", "wcag322", "wcag321"],
  help: "Changing or focusing a control must not unexpectedly change context",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/on-input.html",
  selector: "select[onchange], input[onchange], textarea[onchange], select[oninput], input[oninput], textarea[oninput], [onfocus]",
  evaluate(element) {
    const onfocus = element.getAttribute("onfocus");
    if (onfocus && NAVIGATES.test(onfocus)) {
      return {
        status: "incomplete",
        message: "Focusing this element appears to navigate or submit (its onfocus handler reaches for location/submit). A change of context on focus alone fails WCAG 3.2.1 \u2014 check what the handler actually does when focus lands.",
        fix: "Trigger navigation from activation (click/Enter), never from focus."
      };
    }
    for (const attr of ["onchange", "oninput"]) {
      const handler = element.getAttribute(attr);
      if (handler && NAVIGATES.test(handler)) {
        return {
          status: "incomplete",
          message: `Changing this control appears to navigate or submit (its ${attr} handler reaches for location/submit). WCAG 3.2.2 allows that only when users are told beforehand: check the page says so before the control.`,
          fix: "Describe the behaviour before the control, or navigate from an explicit Go button instead of the change event."
        };
      }
    }
    return { status: "pass" };
  }
};

// src/engine/rules/wcag/3.3.1-error-message-linkage.js
var error_message_linkage_default = {
  id: "error-message-linkage",
  name: "Error message linkage",
  impact: "serious",
  tags: ["wcag2a", "wcag331"],
  help: "Fields marked invalid need their error described in text",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html",
  selector: '[aria-invalid="true"], [aria-invalid="spelling"], [aria-invalid="grammar"], [aria-errormessage]',
  evaluate(element, { isVisible, accessibleName: accessibleName2 }) {
    const root = element.getRootNode();
    const state = element.getAttribute("aria-invalid");
    const invalid = !!state && state !== "false" && state !== "undefined";
    const targetsOf = (attribute) => (element.getAttribute(attribute) ?? "").trim().split(/\s+/).filter(Boolean).map((id) => root.getElementById?.(id)).filter(Boolean);
    const hasText = (targets) => targets.some((target2) => isVisible(target2) && (target2.textContent.trim() || accessibleName2(target2)));
    if (element.hasAttribute("aria-errormessage")) {
      if (!invalid) return { status: "pass" };
      const targets = targetsOf("aria-errormessage");
      if (hasText(targets)) return { status: "pass" };
      return {
        status: "incomplete",
        message: (targets.length ? "This field is marked invalid, but the element its aria-errormessage points at is empty or hidden \u2014 screen readers follow the reference and find no text." : "This field is marked invalid, but its aria-errormessage points at nothing \u2014 screen readers follow the reference and find no text.") + " The error must be described in text: check a visible message exists, and fix the reference so it reaches assistive technology too.",
        fix: "Point aria-errormessage at the visible element containing the error text, and keep that element populated while the field is invalid."
      };
    }
    if (hasText(targetsOf("aria-describedby"))) return { status: "pass" };
    return {
      status: "incomplete",
      message: "This field is marked invalid, but no error text is programmatically linked to it. The error must be described to the user in text \u2014 check a message exists, and associate it with aria-describedby or aria-errormessage so screen readers announce it with the field.",
      fix: "Add the error text near the field and reference it with aria-describedby (or aria-errormessage)."
    };
  }
};

// src/engine/rules/wcag/4.1.2-composite-widget-name.js
var ITEM_ROLES2 = /* @__PURE__ */ new Set(["tab", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "treeitem"]);
var composite_widget_name_default = {
  id: "composite-widget-name",
  name: "Widget item names",
  impact: "serious",
  tags: ["wcag2a", "wcag412"],
  help: "Tabs, menu items, options and tree items need an accessible name",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: '[role="tab"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="option"], [role="treeitem"]',
  evaluate(element, { accessibleName: accessibleName2 }) {
    const role = effectiveRole(element);
    if (!ITEM_ROLES2.has(role)) return { status: "pass" };
    if (accessibleName2(element)) return { status: "pass" };
    return {
      status: "fail",
      message: `This ${role} has no accessible name \u2014 a screen reader announces an unnamed ${role}, and users cannot tell what choosing it does.`,
      fix: 'Put text inside the element, or add aria-label="\u2026" for icon-only items.'
    };
  }
};

// src/engine/rules/wcag/4.1.2-summary-name.js
var summary_name_default = {
  id: "summary-name",
  name: "Disclosure names",
  impact: "serious",
  tags: ["wcag2a", "wcag412"],
  help: "Disclosure controls (<summary>) need an accessible name",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: "summary",
  evaluate(element, { accessibleName: accessibleName2 }) {
    const details = element.parentElement;
    const isControl = details?.tagName === "DETAILS" && details.querySelector(":scope > summary") === element;
    if (!isControl) return { status: "pass" };
    if (accessibleName2(element)) return { status: "pass" };
    return {
      status: "fail",
      message: "This disclosure control has no accessible name \u2014 a screen reader announces an unnamed button, and users cannot tell what it expands.",
      fix: 'Put text inside the <summary>, or add aria-label="\u2026" for icon-only disclosures.'
    };
  }
};

// src/engine/rules/best-practice/heading-order.js
var level = (el) => el.hasAttribute("aria-level") ? parseInt(el.getAttribute("aria-level"), 10) : parseInt(el.tagName[1], 10) || 2;
var inOutline = (el) => {
  const role = effectiveRole(el);
  return role === "heading" || role === null;
};
var heading_order_default = {
  id: "heading-order",
  name: "Heading order",
  impact: "moderate",
  tags: ["best-practice"],
  help: "Headings should step down one level at a time",
  helpUrl: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
  selector: 'h1, h2, h3, h4, h5, h6, [role="heading"]',
  // Needs the whole page: each heading is judged against the previous one.
  evaluateAll(elements) {
    let previous = 0;
    return elements.map((element) => {
      if (!inOutline(element)) return { status: "pass" };
      const current = level(element);
      const skipped2 = previous > 0 && current > previous + 1;
      const outcome2 = skipped2 ? {
        status: "fail",
        message: `Heading level jumps from h${previous} to h${current}, which breaks the page outline for screen-reader navigation.`,
        fix: `Use <h${previous + 1}> here, or restructure so levels increase one at a time.`
      } : { status: "pass" };
      previous = current;
      return outcome2;
    });
  }
};

// src/engine/rules/best-practice/empty-heading.js
var empty_heading_default = {
  id: "empty-heading",
  name: "Empty headings",
  impact: "minor",
  tags: ["best-practice"],
  help: "Headings must contain text",
  helpUrl: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
  selector: 'h1, h2, h3, h4, h5, h6, [role="heading"]',
  evaluate(element, { accessibleName: accessibleName2 }) {
    const role = element.getAttribute("role");
    if (role && role !== "heading") return { status: "pass" };
    if (accessibleName2(element)) return { status: "pass" };
    return {
      status: "fail",
      message: "This heading is empty \u2014 screen-reader users navigating by headings land on nothing.",
      fix: "Add text to the heading, or remove the element if it is only used for spacing."
    };
  }
};

// src/engine/rules/best-practice/positive-tabindex.js
var positive_tabindex_default = {
  id: "positive-tabindex",
  name: "Positive tabindex",
  impact: "serious",
  tags: ["best-practice"],
  help: "Positive tabindex values disrupt the natural focus order",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
  selector: "[tabindex]",
  evaluate(element) {
    const tabindex = parseInt(element.getAttribute("tabindex"), 10);
    if (!(tabindex > 0)) return { status: "pass" };
    return {
      status: "fail",
      message: `tabindex="${tabindex}" overrides the natural focus order, which almost always creates a confusing keyboard path.`,
      fix: 'Use tabindex="0" and place the element where it belongs in the document order instead.'
    };
  }
};

// src/engine/rules/best-practice/region.js
var LANDMARK = 'main, nav, aside, search, form[aria-label], form[aria-labelledby], header:not(:is(article, aside, main, nav, section) header), footer:not(:is(article, aside, main, nav, section) footer), section[aria-label], section[aria-labelledby], [role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], [role="complementary"], [role="region"][aria-label], [role="region"][aria-labelledby], [role="form"][aria-label], [role="form"][aria-labelledby], [role="search"], [role="dialog"], [role="alertdialog"], dialog[open]';
var region_default = {
  id: "region",
  name: "Content outside landmarks",
  impact: "moderate",
  tags: ["best-practice"],
  help: "All readable content belongs inside a landmark region",
  helpUrl: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/",
  // Any element with its own text — wrapper elements without direct text are
  // skipped, so each offending text block is reported exactly once.
  selector: "body *:not(script):not(style):not(template):not(noscript)",
  // evaluateAll so document-level facts are computed ONCE per audit: a
  // page with NO landmarks at all has one structural problem, not one per
  // text block — landmark-one-main reports it once; flagging every
  // paragraph (30k times on a single-page spec) is noise at ruinous
  // serialization cost. region's per-block value is for pages that HAVE
  // landmarks but leave content outside them.
  evaluateAll(elements, helpers) {
    const doc = elements[0]?.ownerDocument ?? document;
    if (!doc.querySelector(LANDMARK)) return elements.map(() => ({ status: "pass" }));
    return elements.map((element) => this.judge(element, helpers));
  },
  judge(element, { ownText }) {
    const isMedia = element.matches(
      'img:not([alt=""]):not([role="presentation"]):not([role="none"]), svg[role="img"], video, audio, canvas, iframe, input:not([type="hidden"]), select, textarea, button'
    );
    if (!ownText(element) && !isMedia) return { status: "pass" };
    if (element.closest(LANDMARK)) return { status: "pass" };
    const doc = element.ownerDocument;
    const link = element.closest('a[href*="#"]');
    if (link) {
      let id = link.getAttribute("href").split("#")[1] ?? "";
      try {
        id = decodeURIComponent(id);
      } catch {
      }
      const target2 = id && (doc.getElementById(id) || doc.getElementsByName(id)[0]);
      const looksLikeSkip = /^skip\b/i.test(link.textContent.trim());
      const firstLandmark = doc.querySelector(LANDMARK);
      const beforeLandmarks = !firstLandmark || link.compareDocumentPosition(firstLandmark) & Node.DOCUMENT_POSITION_FOLLOWING;
      if ((target2 || looksLikeSkip) && beforeLandmarks) return { status: "pass" };
    }
    for (let parent = element.parentElement; parent && parent !== doc.body; parent = parent.parentElement) {
      if (ownText(parent)) return { status: "pass" };
    }
    return {
      status: "fail",
      message: "This content sits outside any landmark, so screen-reader users navigating by regions never reach it.",
      fix: "Move it into <main>, <nav>, <header>, <footer>, <aside>, or a labelled <section>."
    };
  }
};

// src/engine/rules/best-practice/landmark-one-main.js
var landmark_one_main_default = {
  id: "landmark-one-main",
  name: "One main landmark",
  impact: "moderate",
  tags: ["best-practice"],
  help: "The page should have exactly one main landmark",
  helpUrl: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/",
  selector: "html",
  visibleOnly: false,
  evaluate(element, { isVisible }) {
    const count2 = collectRoots(element.ownerDocument).flatMap((root) => [...root.querySelectorAll('main, [role="main"]')]).filter(isVisible).length;
    if (count2 === 1) return { status: "pass" };
    return {
      status: "fail",
      message: count2 === 0 ? "No <main> landmark \u2014 screen-reader users have no shortcut to the primary content." : `${count2} main landmarks \u2014 "skip to main" becomes ambiguous.`,
      fix: count2 === 0 ? "Wrap the primary content in a single <main> element." : "Keep one <main>; demote the others to <section> or <div>."
    };
  }
};

// src/engine/rules/best-practice/page-heading-one.js
var HEADING = 'h1, h2, h3, h4, h5, h6, [role="heading"]';
var page_heading_one_default = {
  id: "page-heading-one",
  name: "Leading page heading",
  impact: "moderate",
  tags: ["best-practice"],
  help: "Every page should start its outline with an <h1>",
  helpUrl: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
  selector: "html",
  visibleOnly: false,
  evaluate(element) {
    const hasLevelOne = collectRoots(element.ownerDocument).some((root) => [...root.querySelectorAll(HEADING)].some((heading) => level(heading) === 1));
    if (hasLevelOne) return { status: "pass" };
    return {
      status: "fail",
      message: "No <h1> \u2014 the page outline has no starting point for screen-reader navigation.",
      fix: "Add one <h1> naming what the page is about."
    };
  }
};

// src/engine/rules/best-practice/landmark-unique.js
var SINGLETON = /* @__PURE__ */ new Set(["banner", "contentinfo", "main"]);
var landmarkRole = (element) => element.getAttribute("role")?.trim().split(/\s+/)[0]?.toLowerCase() ?? implicitRole(element);
var landmarkName = (element) => labelledByName(element) || element.getAttribute("aria-label")?.trim() || element.getAttribute("title")?.trim() || "";
var landmark_unique_default = {
  id: "landmark-unique",
  name: "Distinguishable landmarks",
  impact: "moderate",
  tags: ["best-practice"],
  help: "Landmarks of the same type need distinguishing labels",
  helpUrl: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/",
  // Implicit landmarks (header, footer, labelled section/form) join the
  // grouping — a page's <header> and a div[role="banner"] ARE duplicates.
  // region and form need a name to BE landmarks (ARIA 1.2 gives both "Name
  // From: author", and Chromium exposes an unnamed one as generic), which is
  // why the native <section> and <form> above are already spelled with the
  // name requirement. Without it, two unnamed div[role="region"] were
  // reported as indistinguishable landmarks when neither is a landmark at
  // all, sending the author to label something no screen reader announces.
  selector: 'nav, search, aside, header, footer, section[aria-label], section[aria-labelledby], form[aria-label], form[aria-labelledby], [role="navigation"], [role="complementary"], [role="banner"], [role="contentinfo"], [role="region"][aria-label], [role="region"][aria-labelledby], [role="form"][aria-label], [role="form"][aria-labelledby], [role="search"], [role="main"], main',
  // Judged as a set: two unlabelled navs are the problem, not either alone.
  evaluateAll(elements) {
    const roles = elements.map(landmarkRole);
    const outcomes = elements.map(() => ({ status: "pass" }));
    const landmarkIndexes = elements.map((element, index) => ({ element, index, role: roles[index] })).filter(({ role }) => LANDMARK_ROLES.has(role));
    for (const singleton of SINGLETON) {
      const dupes = landmarkIndexes.filter(({ role }) => role === singleton);
      if (dupes.length < 2) continue;
      for (const { index } of dupes) {
        outcomes[index] = {
          status: "fail",
          message: `${dupes.length} ${singleton} landmarks on one page \u2014 ${singleton} must be unique; screen-reader region navigation becomes ambiguous.`,
          fix: `Keep one ${singleton}; demote the others (remove the role, or use a non-landmark element).`
        };
      }
    }
    const groups = {};
    for (const { element, index, role } of landmarkIndexes) {
      if (SINGLETON.has(role)) continue;
      const key = `${role}::${landmarkName(element).toLowerCase()}`;
      (groups[key] ??= []).push(index);
    }
    for (const [key, indexes] of Object.entries(groups)) {
      if (indexes.length < 2) continue;
      const [role, name] = key.split("::");
      for (const index of indexes) {
        outcomes[index] = {
          status: "fail",
          message: name ? `${indexes.length} ${role} landmarks share the label "${name}" \u2014 screen-reader users can't tell them apart.` : `${indexes.length} unlabelled ${role} landmarks \u2014 screen-reader users hear "${role}" twice with no way to tell them apart.`,
          fix: 'Give each one a distinct aria-label, e.g. aria-label="Primary" / aria-label="Footer".'
        };
      }
    }
    return outcomes;
  }
};

// src/engine/rules/best-practice/redundant-role.js
var JUDGED_TAGS = /* @__PURE__ */ new Set([
  "ul",
  "ol",
  "li",
  "button",
  "nav",
  "main",
  "aside",
  "form",
  "table",
  "article",
  "img",
  "hr",
  "progress",
  "textarea",
  "dialog",
  "option",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  // Table structure (th is skipped: its implicit role is contextual —
  // columnheader or rowheader). header/footer/section are contextual too.
  "tr",
  "thead",
  "tbody",
  "tfoot",
  "td",
  "fieldset",
  "a",
  "input"
]);
var JUDGED_INPUT_TYPES = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "button",
  "submit",
  "reset",
  "text",
  "email",
  "tel",
  "url",
  "range",
  "number",
  "search"
]);
function implicitRole2(element) {
  const tag = element.tagName.toLowerCase();
  if (!JUDGED_TAGS.has(tag)) return null;
  if (tag === "input" && !JUDGED_INPUT_TYPES.has(element.type)) return null;
  const role = implicitRole(element);
  return role && role !== "generic" && role !== "presentation" ? role : null;
}
var TABLE_DISPLAY = {
  table: ["table", "inline-table"],
  thead: ["table-header-group"],
  tbody: ["table-row-group"],
  tfoot: ["table-footer-group"],
  tr: ["table-row"],
  td: ["table-cell"]
};
var TABLE_ROLES = /* @__PURE__ */ new Set(["table", "rowgroup", "row", "cell"]);
function tableSemanticsStripped(element, tag) {
  const table2 = tag === "table" ? element : element.closest("table");
  if (table2 && !TABLE_DISPLAY.table.includes(getComputedStyle(table2).display)) return true;
  const native = TABLE_DISPLAY[tag];
  return !!native && !native.includes(getComputedStyle(element).display);
}
function markerRemoved(item) {
  if (getComputedStyle(item).listStyleType === "none") return true;
  const marker = getComputedStyle(item, "::marker").content;
  return marker === "none" || marker === '""' || marker === "''";
}
function listMarkersRemoved(list2) {
  if (getComputedStyle(list2).listStyleType === "none") return true;
  for (const child of list2.children) {
    if (child.tagName === "LI" && markerRemoved(child)) return true;
  }
  return false;
}
var redundant_role_default = {
  id: "redundant-role",
  name: "Redundant roles",
  impact: "minor",
  tags: ["best-practice"],
  help: "role attributes should not repeat the element\u2019s built-in role",
  helpUrl: "https://www.w3.org/TR/using-aria/#firstrule",
  selector: "[role]",
  evaluate(element) {
    const explicit = element.getAttribute("role").trim().split(/\s+/)[0]?.toLowerCase();
    const implicit = implicitRole2(element);
    if (!implicit || explicit !== implicit) return { status: "pass" };
    const tag = element.tagName.toLowerCase();
    if (explicit === "list" && listMarkersRemoved(element)) return { status: "pass" };
    if (explicit === "listitem") {
      if (markerRemoved(element)) return { status: "pass" };
      const list2 = element.closest("ul, ol");
      if (list2 && getComputedStyle(list2).listStyleType === "none") return { status: "pass" };
    }
    if (TABLE_ROLES.has(explicit) && tableSemanticsStripped(element, tag)) return { status: "pass" };
    if (explicit === "img" && /\.svg([?#]|$)/i.test(element.currentSrc || element.src || "")) return { status: "pass" };
    const caveat = implicit === "list" ? " (Exception: keep it if you set list-style: none \u2014 Safari/VoiceOver drops list semantics without it.)" : "";
    return {
      status: "fail",
      message: `role="${explicit}" is redundant: <${tag}> already has that role built in. Redundant ARIA adds noise and drift risk, not accessibility.${caveat}`,
      fix: `Remove role="${explicit}" from the <${tag}>.`
    };
  }
};

// src/engine/rules/best-practice/redundant-aria.js
var NATIVE_PAIRS = [
  { aria: "aria-required", native: "required" },
  { aria: "aria-disabled", native: "disabled" },
  { aria: "aria-readonly", native: "readonly" },
  { aria: "aria-placeholder", native: "placeholder" },
  { aria: "aria-checked", native: "checked" }
];
var redundant_aria_default = {
  id: "redundant-aria",
  name: "Redundant ARIA attributes",
  impact: "minor",
  tags: ["best-practice"],
  help: "aria attributes should not duplicate native HTML attributes",
  helpUrl: "https://www.w3.org/TR/using-aria/#rule2",
  selector: '[aria-required], [aria-disabled], [aria-readonly], [aria-placeholder], [aria-checked], [aria-hidden="false"]',
  evaluate(element) {
    const redundant = NATIVE_PAIRS.filter(({ aria, native }) => element.hasAttribute(aria) && element.hasAttribute(native)).map(({ aria, native }) => `${aria} duplicates ${native}`);
    if (element.getAttribute("aria-hidden") === "false") {
      redundant.push('aria-hidden="false" does nothing reliable \u2014 elements are visible to AT by default');
    }
    if (!redundant.length) return { status: "pass" };
    return {
      status: "fail",
      message: `Redundant ARIA: ${redundant.join("; ")}. The native attribute already tells assistive technology everything.`,
      fix: "Remove the aria-* attribute(s) and keep the native HTML attribute."
    };
  }
};

// src/engine/rules/best-practice/redundant-aria-label.js
var NAME_FROM_CONTENT2 = /* @__PURE__ */ new Set([
  "button",
  "link",
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio",
  "option",
  "tab",
  "treeitem",
  "checkbox",
  "radio",
  "switch",
  "heading",
  "cell",
  "gridcell",
  "columnheader",
  "rowheader",
  "tooltip"
]);
var EMPTY_CONTENT = /* @__PURE__ */ new Set(["none", "normal", '""', "''"]);
function contentBeyondText(element) {
  const nodes = [element, ...element.querySelectorAll("*")];
  for (const node of nodes) {
    const tag = node.tagName.toLowerCase();
    if (tag === "img" || tag === "area" || tag === "svg") return true;
    if (node !== element && (node.getAttribute("aria-hidden") === "true" || node.hasAttribute("hidden"))) return true;
    const style = getComputedStyle(node);
    if (node !== element && (style.display === "none" || style.visibility === "hidden")) return true;
    if (!EMPTY_CONTENT.has(getComputedStyle(node, "::before").content)) return true;
    if (!EMPTY_CONTENT.has(getComputedStyle(node, "::after").content)) return true;
  }
  return false;
}
var redundant_aria_label_default = {
  id: "redundant-aria-label",
  name: "Redundant aria-label",
  impact: "minor",
  tags: ["best-practice"],
  help: "aria-label should not repeat the visible text",
  helpUrl: "https://www.w3.org/TR/using-aria/#rule2",
  selector: "[aria-label]",
  evaluate(element) {
    if (!NAME_FROM_CONTENT2.has(effectiveRole(element))) return { status: "pass" };
    const label2 = element.getAttribute("aria-label").replace(/\s+/g, " ").trim().toLowerCase();
    const visible = element.textContent.replace(/\s+/g, " ").trim().toLowerCase();
    if (!visible || label2 !== visible) return { status: "pass" };
    if (contentBeyondText(element)) return { status: "pass" };
    return {
      status: "fail",
      message: `aria-label="${element.getAttribute("aria-label")}" is identical to the element's visible text \u2014 it adds nothing and will drift out of sync when the text changes.`,
      fix: "Remove the aria-label and let the visible text be the accessible name."
    };
  }
};

// src/engine/rules/best-practice/redundant-alt-phrase.js
var REDUNDANT_PHRASE = /^(?:(?:image|icon)s?(?:\s*[:-]\s*|\s+(?:of|showing|depicting)\b\s*|\s*$)|(?:picture|graphic)s?\s+of\b\s*)/i;
var redundant_alt_phrase_default = {
  id: "redundant-alt-phrase",
  name: "Redundant alt phrasing",
  impact: "minor",
  tags: ["best-practice"],
  help: 'alt text should not start with "image of" or similar',
  helpUrl: "https://www.w3.org/WAI/tutorials/images/tips/",
  selector: "img[alt]",
  evaluate(element) {
    const alt = element.getAttribute("alt").trim();
    if (!alt || !REDUNDANT_PHRASE.test(alt)) return { status: "pass" };
    return {
      status: "fail",
      message: `alt="${alt}" \u2014 screen readers already announce this element as an image, so users hear "image, ${alt}".`,
      fix: `Describe the content directly, e.g. alt="${alt.replace(REDUNDANT_PHRASE, "").trim() || "\u2026"}".`
    };
  }
};

// src/engine/rules/best-practice/redundant-tabindex.js
var redundant_tabindex_default = {
  id: "redundant-tabindex",
  name: "Redundant tabindex",
  impact: "minor",
  tags: ["best-practice"],
  help: 'tabindex="0" is unnecessary on natively focusable elements',
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
  selector: 'button[tabindex="0"], a[href][tabindex="0"], input[tabindex="0"], select[tabindex="0"], textarea[tabindex="0"], summary[tabindex="0"]',
  evaluate(element) {
    return {
      status: "fail",
      message: `<${element.tagName.toLowerCase()}> is focusable by default \u2014 tabindex="0" adds nothing.`,
      fix: "Remove the tabindex attribute."
    };
  }
};

// src/engine/rules/best-practice/redundant-image-alt.js
var HIDDEN_TAGS = /* @__PURE__ */ new Set(["script", "style", "noscript", "template"]);
function exposedText(root) {
  let text = "";
  for (const node of root.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
      continue;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) continue;
    const tag = node.tagName.toLowerCase();
    if (HIDDEN_TAGS.has(tag) || tag === "img" || tag === "area" || tag === "svg") continue;
    if (node.getAttribute("aria-hidden") === "true" || node.hasAttribute("hidden")) continue;
    const style = getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden") continue;
    text += exposedText(node);
  }
  return text;
}
var norm = (s) => (s ?? "").replace(/\s+/g, " ").trim().toLowerCase();
var redundant_image_alt_default = {
  id: "redundant-image-alt",
  name: "Redundant image alt",
  impact: "minor",
  tags: ["best-practice"],
  help: "Image alt should not repeat adjacent link or button text",
  helpUrl: "https://www.w3.org/WAI/tutorials/images/functional/",
  selector: "a[href] img[alt], button img[alt], a[href] img[title]:not([alt]), button img[title]:not([alt])",
  evaluate(element) {
    const alt = element.getAttribute("alt");
    const usesTitle = alt === null;
    const alternative = norm(usesTitle ? element.getAttribute("title") : alt);
    if (!alternative) return { status: "pass" };
    const container = element.closest("a[href], button");
    const text = norm(exposedText(container));
    if (!text) return { status: "pass" };
    if (alternative !== text) return { status: "pass" };
    const kind = container.tagName === "A" ? "link" : "button";
    return {
      status: "fail",
      message: usesTitle ? `The image title repeats the ${kind} text \u2014 the title names the image, so screen readers announce "${element.getAttribute("title")}" twice.` : `The image alt repeats the ${kind} text \u2014 screen readers announce "${element.getAttribute("alt")}" twice.`,
      fix: usesTitle ? 'Add alt="" to the image (and drop the title if it is not needed as a tooltip); the visible text already names the control.' : 'Use alt="" on the image; the visible text already names the control.'
    };
  }
};

// src/engine/rules/best-practice/landmark-top-level.js
var named = (element) => element.hasAttribute("aria-label") || element.hasAttribute("aria-labelledby") || element.hasAttribute("title");
function landmarkAncestor(element) {
  for (let parent = element.parentElement; parent; parent = parent.parentElement) {
    const explicit = parent.getAttribute("role")?.trim().split(/\s+/)[0]?.toLowerCase();
    const role = explicit ?? implicitRole(parent);
    if (!explicit && (role === "form" || role === "region") && !named(parent)) continue;
    if (role && LANDMARK_ROLES.has(role)) return { element: parent, role };
  }
  return null;
}
var landmark_top_level_default = {
  id: "landmark-top-level",
  name: "Top-level landmarks",
  impact: "moderate",
  tags: ["best-practice"],
  help: "banner, main, contentinfo and complementary landmarks must be top level",
  helpUrl: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/",
  selector: 'header, footer, main, aside, [role="banner"], [role="contentinfo"], [role="main"], [role="complementary"]',
  evaluate(element) {
    const tag = element.tagName.toLowerCase();
    if ((tag === "header" || tag === "footer") && !element.hasAttribute("role") && element.closest("article, aside, main, nav, section")) {
      return { status: "pass" };
    }
    if (tag === "aside" && !element.hasAttribute("role") && implicitRole(element) !== "complementary") {
      return { status: "pass" };
    }
    const container = landmarkAncestor(element);
    if (!container) return { status: "pass" };
    const role = element.getAttribute("role") ?? { header: "banner", footer: "contentinfo", main: "main", aside: "complementary" }[tag];
    return {
      status: "fail",
      message: `This ${role} landmark is nested inside a ${container.role} landmark (<${container.element.tagName.toLowerCase()}>) \u2014 page-level regions lose their meaning when nested.`,
      fix: "Move it to be a direct child of <body>, or remove the landmark role."
    };
  }
};

// src/engine/rules/best-practice/accesskeys.js
var accesskeys_default = {
  id: "accesskeys",
  name: "Duplicate access keys",
  impact: "serious",
  tags: ["best-practice"],
  help: "The same accesskey must not be assigned twice",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html",
  selector: "[accesskey]",
  visibleOnly: false,
  // Judged as a set: duplicates are the problem.
  evaluateAll(elements) {
    const byKey = {};
    elements.forEach((element, index) => {
      const key = element.getAttribute("accesskey").trim().toLowerCase();
      (byKey[key] ??= []).push(index);
    });
    const outcomes = elements.map(() => ({ status: "pass" }));
    for (const [key, indexes] of Object.entries(byKey)) {
      if (indexes.length < 2) continue;
      for (const index of indexes) {
        outcomes[index] = {
          status: "fail",
          message: `accesskey="${key}" is used ${indexes.length} times \u2014 the browser can only honour one, so the others silently do nothing.`,
          fix: "Give each accesskey a unique value, or remove them (they conflict with AT shortcuts anyway)."
        };
      }
    }
    return outcomes;
  }
};

// src/engine/rules/best-practice/button-type.js
function defaultButton(form) {
  return form.querySelector('button, input[type="submit"], input[type="image"]');
}
var button_type_default = {
  id: "button-type",
  name: "Button types in forms",
  impact: "minor",
  tags: ["best-practice"],
  help: "Buttons inside forms should declare their type",
  helpUrl: "https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-type",
  selector: 'form button:not([type]), form button[type=""]',
  evaluate(element) {
    const form = element.form ?? element.closest("form");
    const buttons = form.querySelectorAll("button");
    if (buttons.length === 1 && buttons[0] === element && defaultButton(form) === element) {
      return { status: "pass" };
    }
    return {
      status: "fail",
      message: "A <button> without a type inside a form is a submit button by default (the HTML missing value default is the Submit Button state), so activating it submits the form. Declare the type so the intent is explicit.",
      fix: 'Add type="button" (or type="submit" if submission is intended).'
    };
  }
};

// src/engine/rules/best-practice/no-autofocus.js
var FOCUS_CONTAINER = 'dialog, [role="dialog"], [role="alertdialog"], [popover]';
var no_autofocus_default = {
  id: "no-autofocus",
  name: "Autofocus on load",
  impact: "minor",
  tags: ["best-practice"],
  help: "autofocus disorients assistive-technology users",
  helpUrl: "https://html.spec.whatwg.org/multipage/interaction.html#the-autofocus-attribute",
  selector: "[autofocus]",
  visibleOnly: false,
  evaluate(element) {
    if (element.closest(FOCUS_CONTAINER)) return { status: "pass" };
    const tag = element.tagName.toLowerCase();
    return {
      status: "incomplete",
      message: `autofocus moves focus to this <${tag}> as soon as the page loads, so screen-reader and magnifier users skip everything before it. Review: the HTML spec allows this only when the control is the page's main purpose (a search box on a search page, say); otherwise it disorients.`,
      fix: `Remove autofocus from the <${tag}> unless this control is the page's whole purpose; let users reach it in document order.`
    };
  }
};

// src/engine/rules/best-practice/new-window-link.js
var MENTIONS_NEW_WINDOW = /new (window|tab)|opens? in/i;
function effectiveLang(element) {
  return element.closest("[lang]")?.getAttribute("lang")?.trim() || element.ownerDocument.documentElement.getAttribute("lang")?.trim() || "";
}
function describedByText(element) {
  const refs = element.getAttribute("aria-describedby");
  if (!refs) return "";
  const root = element.getRootNode();
  return refs.split(/\s+/).filter(Boolean).map((id) => root.getElementById?.(id)?.textContent ?? "").join(" ");
}
var new_window_link_default = {
  id: "new-window-link",
  name: "New-window warnings",
  impact: "minor",
  tags: ["best-practice"],
  help: "Links opening a new window should say so",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Techniques/general/G201",
  selector: 'a[target="_blank"], a[target="blank"]',
  evaluate(element, { accessibleName: accessibleName2 }) {
    const name = `${accessibleName2(element)} ${element.getAttribute("title") ?? ""} ${describedByText(element)}`;
    if (MENTIONS_NEW_WINDOW.test(name)) return { status: "pass" };
    const lang = effectiveLang(element);
    if (lang && !/^en(?:[-_]|$)/i.test(lang)) {
      return {
        status: "incomplete",
        message: `This link opens a new window or tab. Does its name, title or description say so in the page's language ("${lang}")? The automated wording check reads English only.`,
        fix: 'Say so in the link text or a visually hidden span (for example the local-language equivalent of "opens in new window"), or drop target="_blank".'
      };
    }
    return {
      status: "fail",
      message: "This link opens a new window/tab without saying so \u2014 the back button stops working and screen-reader users get no warning about the context change.",
      fix: 'Append visually-hidden text like <span class="sr-only">(opens in new window)</span>, or drop target="_blank".'
    };
  }
};

// src/engine/rules/best-practice/fieldset-legend.js
var fieldset_legend_default = {
  id: "fieldset-legend",
  name: "Grouped field labels",
  impact: "moderate",
  tags: ["best-practice"],
  help: "Radio and checkbox groups should be grouped with a label",
  helpUrl: "https://www.w3.org/WAI/tutorials/forms/grouping/",
  selector: 'input[type="radio"][name], input[type="checkbox"][name]',
  // Judged as a set: only same-name groups of 2+ need grouping, and one
  // finding per group is enough.
  evaluateAll(elements) {
    const groups = {};
    elements.forEach((element, index) => {
      const key = `${element.type}::${element.form?.id ?? ""}::${element.name}`;
      (groups[key] ??= []).push(index);
    });
    const outcomes = elements.map(() => ({ status: "pass" }));
    for (const indexes of Object.values(groups)) {
      if (indexes.length < 2) continue;
      const first = elements[indexes[0]];
      const group = first.closest('fieldset, [role="group"], [role="radiogroup"]');
      const legend = group?.querySelector(":scope > legend");
      const grouped = group && (legend && accessibleName(legend) || labelledByName(group) || group.getAttribute("aria-label")?.trim());
      if (grouped) continue;
      outcomes[indexes[0]] = {
        status: "fail",
        message: `This group of ${indexes.length} ${first.type} inputs (name="${first.name}") has no group label \u2014 screen-reader users hear each option without knowing what question it answers.`,
        fix: 'Wrap the group in <fieldset> with a <legend>, or role="radiogroup"/"group" with an aria-label.'
      };
    }
    return outcomes;
  }
};

// src/engine/rules/index.js
function scKey(rule) {
  const tag = rule.tags.find((t) => /^wcag\d{3,4}$/.test(t));
  if (!tag) return [9, 9, 99];
  const digits = tag.slice(4);
  return [+digits[0], +digits[1], +digits.slice(2)];
}
var rules_default = [
  document_title_default,
  html_lang_default,
  valid_lang_parts_default,
  image_alt_default,
  svg_img_alt_default,
  button_name_default,
  link_name_default,
  link_text_generic_default,
  link_text_generic_only_default,
  // labelInName, — re-parked 2026-08-01, see note at the import
  form_label_default,
  autocomplete_valid_default,
  orientation_default,
  meta_viewport_default,
  color_contrast_default,
  frame_title_default,
  aria_valid_refs_default,
  valid_role_default,
  aria_hidden_focus_default,
  list_structure_default,
  nested_interactive_default,
  bypass_blocks_default,
  target_size_default,
  audio_control_default,
  pause_stop_hide_default,
  media_captions_default,
  aria_attr_valid_default,
  aria_allowed_attr_default,
  aria_field_name_default,
  aria_label_misuse_default,
  role_required_aria_default,
  label_for_valid_default,
  listitem_parent_default,
  definition_list_default,
  dlitem_parent_default,
  area_alt_default,
  object_alt_default,
  input_image_alt_default,
  multiple_labels_default,
  meta_refresh_default,
  link_in_text_block_default,
  p_as_heading_default,
  aria_required_children_default,
  aria_required_parent_default,
  scrollable_region_focusable_default,
  table_headers_default,
  dialog_name_default,
  control_contrast_default,
  non_text_contrast_default,
  text_spacing_default,
  reflow_default,
  focus_visible_default,
  focus_not_obscured_default,
  auth_field_obstruction_default,
  embed_alt_default,
  canvas_alt_default,
  video_loop_motion_default,
  visual_order_divergence_default,
  audio_transcript_default,
  reading_order_divergence_default,
  drag_alternative_default,
  redundant_entry_default,
  invoker_target_default,
  reduced_motion_default,
  on_input_navigation_default,
  error_message_linkage_default,
  composite_widget_name_default,
  summary_name_default,
  contrast_enhanced_default,
  target_size_enhanced_default,
  heading_order_default,
  empty_heading_default,
  positive_tabindex_default,
  region_default,
  landmark_one_main_default,
  page_heading_one_default,
  landmark_unique_default,
  redundant_role_default,
  redundant_aria_default,
  redundant_aria_label_default,
  redundant_alt_phrase_default,
  redundant_tabindex_default,
  redundant_image_alt_default,
  landmark_top_level_default,
  accesskeys_default,
  button_type_default,
  no_autofocus_default,
  new_window_link_default,
  fieldset_legend_default
].sort((a, b) => {
  const ka = scKey(a);
  const kb = scKey(b);
  return ka[0] - kb[0] || ka[1] - kb[1] || ka[2] - kb[2] || a.id.localeCompare(b.id);
});

// src/engine/wcag22.js
var sc = (num2, name, level2, automation, since = "2.0") => ({
  num: num2,
  name,
  level: level2,
  automation,
  since,
  // WCAG version that introduced this criterion
  principle: { 1: "Perceivable", 2: "Operable", 3: "Understandable", 4: "Robust" }[num2[0]],
  url: `https://www.w3.org/WAI/WCAG22/Understanding/${name.toLowerCase().replace(/[(),]/g, "").replace(/\s+/g, "-")}.html`
});
var wcag22_default = [
  // 1. Perceivable
  sc("1.1.1", "Non-text Content", "A", "partial"),
  sc("1.2.1", "Audio-only and Video-only (Prerecorded)", "A", "partial"),
  // partial: the audio-only transcript question is askable; silent-video detection is not
  sc("1.2.2", "Captions (Prerecorded)", "A", "partial"),
  sc("1.2.3", "Audio Description or Media Alternative (Prerecorded)", "A", "manual"),
  sc("1.2.4", "Captions (Live)", "AA", "manual"),
  sc("1.2.5", "Audio Description (Prerecorded)", "AA", "manual"),
  sc("1.2.6", "Sign Language (Prerecorded)", "AAA", "manual"),
  sc("1.2.7", "Extended Audio Description (Prerecorded)", "AAA", "manual"),
  sc("1.2.8", "Media Alternative (Prerecorded)", "AAA", "manual"),
  sc("1.2.9", "Audio-only (Live)", "AAA", "manual"),
  sc("1.3.1", "Info and Relationships", "A", "partial"),
  sc("1.3.2", "Meaningful Sequence", "A", "partial"),
  // partial: CSS-reorder divergence is measurable; whether meaning survives is the reader's call
  sc("1.3.3", "Sensory Characteristics", "A", "manual"),
  sc("1.3.4", "Orientation", "AA", "partial", "2.1"),
  // orientation-lock (2026-08-01) proves CSS root hides/rotations; script locks stay a human check
  sc("1.3.5", "Identify Input Purpose", "AA", "partial", "2.1"),
  // partial: wrong tokens are provable; MISSING autocomplete on identity fields needs judgment
  sc("1.3.6", "Identify Purpose", "AAA", "manual", "2.1"),
  sc("1.4.1", "Use of Color", "A", "partial"),
  // link-in-text-block automates the link case
  sc("1.4.2", "Audio Control", "A", "partial"),
  // partial: declarative autoplay is provable; JS-initiated audio is not
  sc("1.4.3", "Contrast (Minimum)", "AA", "partial"),
  sc("1.4.4", "Resize Text", "AA", "partial"),
  sc("1.4.5", "Images of Text", "AA", "manual"),
  sc("1.4.6", "Contrast (Enhanced)", "AAA", "partial"),
  sc("1.4.7", "Low or No Background Audio", "AAA", "manual"),
  sc("1.4.8", "Visual Presentation", "AAA", "manual"),
  sc("1.4.9", "Images of Text (No Exception)", "AAA", "manual"),
  sc("1.4.10", "Reflow", "AA", "partial", "2.1"),
  // partial: reflow (current-viewport overflow heuristic); full test is at 320px
  sc("1.4.11", "Non-text Contrast", "AA", "partial", "2.1"),
  // partial: non-text-contrast covers field boundaries; icons/focus indicators need eyes
  sc("1.4.12", "Text Spacing", "AA", "partial", "2.1"),
  // partial: text-spacing probes the SC's own override test for clipping
  sc("1.4.13", "Content on Hover or Focus", "AA", "manual", "2.1"),
  // 2. Operable
  sc("2.1.1", "Keyboard", "A", "partial"),
  sc("2.1.2", "No Keyboard Trap", "A", "manual"),
  sc("2.1.3", "Keyboard (No Exception)", "AAA", "partial"),
  // 2.1.1's rules apply; no-exception scope needs humans
  sc("2.1.4", "Character Key Shortcuts", "A", "manual", "2.1"),
  sc("2.2.1", "Timing Adjustable", "A", "partial"),
  // meta-refresh automates the redirect/refresh case
  sc("2.2.2", "Pause, Stop, Hide", "A", "partial"),
  sc("2.2.3", "No Timing", "AAA", "manual"),
  sc("2.2.4", "Interruptions", "AAA", "manual"),
  sc("2.2.5", "Re-authenticating", "AAA", "manual"),
  sc("2.2.6", "Timeouts", "AAA", "manual", "2.1"),
  sc("2.3.1", "Three Flashes or Below Threshold", "A", "manual"),
  sc("2.3.2", "Three Flashes", "AAA", "manual"),
  sc("2.3.3", "Animation from Interactions", "AAA", "partial", "2.1"),
  // partial: reduced-motion reads scroll-driven, smooth-scroll and animated hover/focus motion against the page's prefers-reduced-motion rules; whether the motion is essential stays human
  sc("2.4.1", "Bypass Blocks", "A", "partial"),
  // partial: "repeated across pages" can't be established from one page
  sc("2.4.2", "Page Titled", "A", "partial"),
  // partial: document-title proves a title exists and catches known placeholders; whether a real one DESCRIBES the page needs a reader
  sc("2.4.3", "Focus Order", "A", "partial"),
  // visual-order-divergence flags CSS order/*-reverse against DOM order; whether an order preserves MEANING stays human
  sc("2.4.4", "Link Purpose (In Context)", "A", "partial"),
  sc("2.4.5", "Multiple Ways", "AA", "manual"),
  sc("2.4.6", "Headings and Labels", "AA", "manual"),
  sc("2.4.7", "Focus Visible", "AA", "partial"),
  // partial: focus-visible flags outline suppression; the indicator itself needs eyes
  sc("2.4.8", "Location", "AAA", "manual"),
  sc("2.4.9", "Link Purpose (Link Only)", "AAA", "partial"),
  // partial: contentless link names are provable; whether a real name describes its destination needs a reader
  sc("2.4.10", "Section Headings", "AAA", "manual"),
  sc("2.4.11", "Focus Not Obscured (Minimum)", "AA", "partial", "2.2"),
  // partial: focus-not-obscured catches fully-covered targets at rest
  sc("2.4.12", "Focus Not Obscured (Enhanced)", "AAA", "manual", "2.2"),
  sc("2.4.13", "Focus Appearance", "AAA", "manual", "2.2"),
  sc("2.5.1", "Pointer Gestures", "A", "manual", "2.1"),
  sc("2.5.2", "Pointer Cancellation", "A", "manual", "2.1"),
  sc("2.5.3", "Label in Name", "A", "manual", "2.1"),
  // manual WHILE label-in-name is parked (re-parked 2026-08-01, see rules/index.js) — 'auto' with no active rule would make this SC vanish from results AND the manual checklist
  sc("2.5.4", "Motion Actuation", "A", "manual", "2.1"),
  sc("2.5.5", "Target Size (Enhanced)", "AAA", "partial", "2.1"),
  sc("2.5.6", "Concurrent Input Mechanisms", "AAA", "manual", "2.1"),
  sc("2.5.7", "Dragging Movements", "AA", "partial", "2.2"),
  // partial: declared draggable UI is visible; pointer-event drag logic is not
  sc("2.5.8", "Target Size (Minimum)", "AA", "partial", "2.2"),
  // partial: size/spacing are computable; the equivalent-control and essential exceptions need judgment
  // 3. Understandable
  sc("3.1.1", "Language of Page", "A", "partial"),
  // partial: html-lang proves the tag is present and well-formed; whether it names the language actually written needs a reader
  sc("3.1.2", "Language of Parts", "AA", "partial"),
  // partial: invalid lang values are provable; UNMARKED foreign passages need language identification
  sc("3.1.3", "Unusual Words", "AAA", "manual"),
  sc("3.1.4", "Abbreviations", "AAA", "manual"),
  sc("3.1.5", "Reading Level", "AAA", "manual"),
  sc("3.1.6", "Pronunciation", "AAA", "manual"),
  sc("3.2.1", "On Focus", "A", "partial"),
  // on-input-navigation flags inline onfocus handlers that navigate; addEventListener handlers are invisible to a DOM audit
  sc("3.2.2", "On Input", "A", "partial"),
  // on-input-navigation flags the inline jump-menu signature; "advised beforehand" stays a human call
  sc("3.2.3", "Consistent Navigation", "AA", "manual"),
  sc("3.2.4", "Consistent Identification", "AA", "manual"),
  sc("3.2.5", "Change on Request", "AAA", "manual"),
  sc("3.2.6", "Consistent Help", "A", "manual", "2.2"),
  sc("3.3.1", "Error Identification", "A", "partial"),
  // error-message-linkage proves broken aria-errormessage targets; only in force when the page is captured mid-error
  sc("3.3.2", "Labels or Instructions", "A", "partial"),
  sc("3.3.3", "Error Suggestion", "AA", "manual"),
  sc("3.3.4", "Error Prevention (Legal, Financial, Data)", "AA", "manual"),
  sc("3.3.5", "Help", "AAA", "manual"),
  sc("3.3.6", "Error Prevention (All)", "AAA", "manual"),
  sc("3.3.7", "Redundant Entry", "A", "partial", "2.2"),
  // partial: duplicate autocomplete purposes in one form are visible; cross-page processes are not
  sc("3.3.8", "Accessible Authentication (Minimum)", "AA", "partial", "2.2"),
  // partial: auth-field-obstruction catches paste blocking; alternatives need judgment
  sc("3.3.9", "Accessible Authentication (Enhanced)", "AAA", "manual", "2.2"),
  // 4. Robust (4.1.1 Parsing was removed in WCAG 2.2)
  sc("4.1.2", "Name, Role, Value", "A", "partial"),
  sc("4.1.3", "Status Messages", "AA", "manual", "2.1")
];

// scripts/report/nsfw.mjs
import fs from "node:fs";
var STRONG = /(porn|hentai|xxx|xhamster|xvideos|xnxx|pornhub|onlyfans|chaturbate|stripchat|livejasmin|bongacams|camsoda|redtube|youporn|spankbang|brazzers|eporner|hqporner|rule34|nhentai|javhd|javmost|sxyprn|thothub|coomer|kemono|fansly|manyvids|literotica|f95zone|myfreecams|thumbzilla|motherless|shemale|tranny)/i;
var WHOLE = /(^|\.)(sex|sexy|sextube|sexvideos?|sexcams?|nude|nudes|naked|fap|cam4|xcams|jav|javtube|tube8|beeg|txxx|ixxx|fuq|hclips|adult|adultfriendfinder|adulttime|adultdvdempire|escorts?|slut|sluts|whore|pussy|tits|anal|fuck|dick|cock|boobs|milf|milfs|erotic|erotica|fetish|bdsm|iwara|4tube|pornone|xtube|heavy-r|e-hentai|clips4sale)(\.|$)/i;
var TITLE_WORDS = /\b(porn|xxx|sex videos?|hentai|nsfw|18\+|adult (?:videos?|site|content)|erotic|nude|naked|escorts?|camgirls?|live sex|xvideos|onlyfans)\b/i;
var DOMAINS = /* @__PURE__ */ new Set([
  "missav.live",
  "missav.ws",
  "missav.com",
  "javwow.com",
  "jable.tv",
  "xasiat.com",
  "shahvani.com",
  "pussyspace.net",
  "hentai.name",
  "supjav.com",
  "javfull.net",
  "javtiful.com",
  "avgle.com",
  "javmix.tv",
  "njav.tv",
  "7mmtv.sx",
  "tktube.com",
  "kissjav.com",
  "javguru.top",
  "thisvid.com",
  "boyfriendtv.com",
  "gayforit.eu",
  "ixxx.com",
  "fuq.com",
  "txxx.com",
  "hclips.com",
  "upornia.com",
  "vjav.com",
  "tnaflix.com",
  "drtuber.com",
  "okxxx.com",
  "daftsex.com",
  "noodlemagazine.com",
  "sextb.net",
  "miruro.tv",
  "hitomi.la",
  "pixiv.net",
  "exhentai.org",
  "e-hentai.org",
  "nhentai.net",
  "rule34.xxx",
  "ttlmodels.com",
  "imagefap.com",
  "motherless.com",
  "planetsuzy.org",
  "simpcity.su",
  "forum.phun.org",
  "bunkr.si",
  "cyberdrop.me",
  "vk.com/video",
  "hanime.tv",
  "hentaihaven.xxx",
  "yourporn.sexy",
  "sxyprn.com",
  "porntrex.com",
  "perfectgirls.net",
  "anysex.com",
  "chaturbate.com",
  "stripchat.com",
  "bongacams.com",
  "livejasmin.com",
  "cam4.com",
  "camsoda.com",
  "myfreecams.com",
  "flirt4free.com",
  "xcams.com",
  "onlyfans.com",
  "fansly.com",
  "manyvids.com",
  "loyalfans.com",
  "spankbang.com",
  "eporner.com",
  "hqporner.com",
  "xnxx.com",
  "xvideos.com",
  "pornhub.com",
  "xhamster.com",
  "redtube.com",
  "youporn.com",
  "tube8.com",
  "beeg.com",
  "brazzers.com",
  "literotica.com",
  "sexstories.com",
  "f95zone.to",
  "iwara.tv",
  "kemono.su",
  "coomer.su",
  "thothub.to",
  "fapello.com",
  "fapodrop.com",
  "ahegao.io",
  "erome.com",
  "redgifs.com",
  "gfycat.porn",
  "porn.com",
  "porn300.com",
  "porndig.com",
  "pornone.com",
  "pornhat.com",
  "pornzog.com",
  "stripchat.global",
  "nudevista.com",
  "pornpics.com",
  "babepedia.com",
  "freeones.com",
  "iafd.com",
  "theporndude.com",
  "xmoviesforyou.com"
]);
var adultSet = null;
function useAdultList(file) {
  if (!file || !fs.existsSync(file)) return false;
  adultSet = new Set(fs.readFileSync(file, "utf8").split("\n").map((d) => d.trim().toLowerCase()).filter(Boolean));
  return true;
}
var strip = (d) => String(d ?? "").toLowerCase().replace(/^www\./, "");
function isNsfw(row) {
  const domain = strip(row.domain ?? (row.url ? new URL(row.url).hostname : ""));
  if (!domain) return false;
  const labels = domain.split(".");
  for (let i = 0; i < labels.length - 1; i++) {
    const d = labels.slice(i).join(".");
    if (DOMAINS.has(d) || adultSet && adultSet.has(d)) return true;
  }
  if (STRONG.test(domain) || WHOLE.test(domain)) return true;
  if (row.title && TITLE_WORDS.test(row.title)) return true;
  return false;
}
var maskDomain = (name) => String(name ?? "").replace(/[^./]/g, "#");

// scripts/lib/util.js
import net from "node:net";
import path2 from "node:path";
import { fileURLToPath } from "node:url";
var rootDir = path2.resolve(path2.dirname(fileURLToPath(import.meta.url)), "..", "..");
var distDir = path2.join(rootDir, "dist");
async function freePort(start, host2 = "127.0.0.1", tries = 50) {
  const probe2 = (port2) => new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.once("error", () => resolve(false));
    server.listen(port2, host2, () => server.close(() => resolve(true)));
  });
  for (let port2 = start; port2 < start + tries; port2++) if (await probe2(port2)) return port2;
  throw new Error(`no free port between ${start} and ${start + tries - 1}`);
}
function hasFlag(flag) {
  return process.argv.includes(flag);
}
function flagValue(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i === -1 || process.argv[i + 1] === void 0 ? fallback : process.argv[i + 1];
}
var escapeHtml = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// scripts/report/tally.mjs
var ruleById = new Map(rules_default.map((r) => [r.id, r]));
var scByNum = new Map(wcag22_default.map((c) => [c.num, c]));
var tagToSc = (tag) => {
  const m = /^wcag(\d)(\d)(\d{1,2})$/.exec(tag);
  return m ? `${m[1]}.${m[2]}.${m[3]}` : null;
};
var scsCache = /* @__PURE__ */ new Map();
var ruleScs = (id) => {
  if (!scsCache.has(id)) scsCache.set(id, [...new Set((ruleById.get(id)?.tags ?? []).map(tagToSc).filter(Boolean))]);
  return scsCache.get(id);
};
var scsOf = (v) => ruleScs(v.id);
var helpOf = (id) => ruleById.get(id)?.help ?? id;
var BUCKETS = [[0, 0, "none"], [1, 5, "1 to 5"], [6, 20, "6 to 20"], [21, 50, "21 to 50"], [51, 100, "51 to 100"], [101, 250, "101 to 250"], [251, Infinity, "more than 250"]];
var BANDS = [[0, 749, "under 750"], [750, 1499, "750 to 1,499"], [1500, 2999, "1,500 to 2,999"], [3e3, Infinity, "3,000 or more"]];
var IMPACTS = ["critical", "serious", "moderate", "minor"];
var HEAVIEST = 100;
var CLEAN_SAMPLE = 200;
var RECENT = 18;
var newGroup = () => ({ pages: 0, failingPages: 0, sumFailing: 0, counts: /* @__PURE__ */ new Map() });
var bump = (map, key, by = 1) => map.set(key, (map.get(key) ?? 0) + by);
function medianOf(counts, total) {
  if (!total) return 0;
  const keys = [...counts.keys()].sort((a, b) => a - b);
  const mid = (total - 1) / 2;
  let seen2 = 0;
  let lower = null;
  for (const k of keys) {
    const c = counts.get(k);
    if (lower === null && seen2 + c > Math.floor(mid)) lower = k;
    if (seen2 + c > mid) return lower === null ? k : Number.isInteger(mid) ? k : (lower + k) / 2;
    seen2 += c;
  }
  return keys.at(-1) ?? 0;
}
function createTally() {
  return {
    pages: 0,
    skipped: 0,
    tagged: 0,
    reasons: /* @__PURE__ */ new Map(),
    failingPages: 0,
    sumFailing: 0,
    sumReview: 0,
    pagesWithReview: 0,
    counts: /* @__PURE__ */ new Map(),
    reviewCounts: /* @__PURE__ */ new Map(),
    hist: BUCKETS.map(() => 0),
    rules: /* @__PURE__ */ new Map(),
    scs: /* @__PURE__ */ new Map(),
    severity: new Map(IMPACTS.map((i) => [i, { pages: 0, elements: 0 }])),
    complexity: { elements: 0, images: 0, headings: 0, inputs: 0, links: 0, buttons: 0, ariaAttrs: 0 },
    bands: BANDS.map(([from, to, label2]) => ({ from, to, label: label2, pages: 0, failingPages: 0, sumFailing: 0, sumReview: 0 })),
    review: /* @__PURE__ */ new Map(),
    groups: { tld: /* @__PURE__ */ new Map(), lang: /* @__PURE__ */ new Map(), section: /* @__PURE__ */ new Map() },
    noLang: 0,
    heaviest: [],
    clean: 0,
    cleanSample: [],
    recent: [],
    // Breadth, levels, tiers, consent (2026-08-30 additions).
    breadthHist: BREADTH.map(() => 0),
    widest: [],
    levels: { clean: 0, aaOnly: 0, a: 0 },
    tiers: /* @__PURE__ */ new Map(),
    consent: { with: newGroup(), without: newGroup() }
  };
}
var BREADTH = [[0, 0, "none"], [1, 1, "one"], [2, 3, "2 to 3"], [4, 6, "4 to 6"], [7, Infinity, "7 or more"]];
var WIDEST = 100;
var labelOf = (row) => row.domain ?? (row.url ? (() => {
  const u = new URL(row.url);
  return (u.pathname || "/") + u.search;
})() : "?");
function add(t, row, opts = {}) {
  const ORDER = ["critical", "serious", "moderate", "minor"];
  const worst = (row.violations ?? []).reduce((w, v) => ORDER.indexOf(v.impact) !== -1 && (w === null || ORDER.indexOf(v.impact) < ORDER.indexOf(w)) ? v.impact : w, null);
  const brief = { key: row.rank ?? row.url, rank: row.rank, tier: row.tier, nsfw: isNsfw(row) || void 0, worst: worst ?? void 0, label: labelOf(row), url: row.url ?? (row.domain ? `https://${row.domain}/` : null), status: row.status, reason: row.reason, detail: row.detail, failing: row.violationElements ?? 0, review: row.reviewElements ?? 0, elements: row.elements ?? 0, rules: row.violations?.length ?? 0 };
  t.recent.unshift(brief);
  if (t.recent.length > RECENT) t.recent.pop();
  if (row.status !== "audited") {
    t.skipped += 1;
    bump(t.reasons, row.reason ?? "unknown");
    return;
  }
  t.pages += 1;
  const f = row.violationElements ?? 0;
  const rv = row.reviewElements ?? 0;
  t.sumFailing += f;
  t.sumReview += rv;
  bump(t.counts, f);
  bump(t.reviewCounts, rv);
  if (f > 0) t.failingPages += 1;
  else {
    t.clean += 1;
    if (t.cleanSample.length < CLEAN_SAMPLE) t.cleanSample.push(brief);
  }
  if (rv > 0) t.pagesWithReview += 1;
  t.hist[BUCKETS.findIndex(([lo, hi]) => f >= lo && f <= hi)] += 1;
  const seenSc = /* @__PURE__ */ new Set();
  for (const v of row.violations ?? []) {
    const e = t.rules.get(v.id) ?? { pages: 0, elements: 0, impact: v.impact };
    e.pages += 1;
    e.elements += v.nodes;
    t.rules.set(v.id, e);
    for (const sc2 of scsOf(v)) {
      const x = t.scs.get(sc2) ?? { pages: 0, elements: 0 };
      if (!seenSc.has(sc2)) {
        x.pages += 1;
        seenSc.add(sc2);
      }
      x.elements += v.nodes;
      t.scs.set(sc2, x);
    }
  }
  for (const impact of IMPACTS) {
    const els = (row.violations ?? []).filter((v) => v.impact === impact).reduce((n, v) => n + v.nodes, 0);
    if (els) {
      const x = t.severity.get(impact);
      x.pages += 1;
      x.elements += els;
    }
  }
  for (const k of Object.keys(t.complexity)) t.complexity[k] += Number(row[k]) || 0;
  const band = t.bands.find((b) => (row.elements ?? 0) >= b.from && (row.elements ?? 0) <= b.to);
  if (band) {
    band.pages += 1;
    if (f) band.failingPages += 1;
    band.sumFailing += f;
    band.sumReview += rv;
  }
  for (const v of row.incomplete ?? []) {
    const e = t.review.get(v.id) ?? { pages: 0, elements: 0 };
    e.pages += 1;
    e.elements += v.nodes;
    t.review.set(v.id, e);
  }
  const bumpGroup = (g) => {
    g.pages += 1;
    if (f) g.failingPages += 1;
    g.sumFailing += f;
    bump(g.counts, f);
    return g;
  };
  const group = (map, key) => {
    if (map instanceof Map) {
      const g = bumpGroup(map.get(key) ?? newGroup());
      map.set(key, g);
      return g;
    }
    return bumpGroup(map);
  };
  if (row.domain) group(t.groups.tld, `.${row.domain.split(".").at(-1)}`);
  const lang = row.lang ? row.lang.trim().toLowerCase().split(/[-_]/)[0] : "";
  if (!lang) t.noLang += 1;
  group(t.groups.lang, lang || "none");
  if (row.url && opts.host) {
    const u = new URL(row.url);
    const seg = u.pathname.split("/").filter(Boolean)[0];
    const hostPrefix = u.hostname !== opts.host ? `${u.hostname} ` : "";
    const g = group(t.groups.section, hostPrefix + (seg ? `/${seg}/` : "/"));
    g.only = g.pages === 1 ? hostPrefix + (u.pathname || "/") + u.search : null;
  }
  if (f > 0 && (t.heaviest.length < HEAVIEST || f > t.heaviest.at(-1).failing)) {
    const i = t.heaviest.findIndex((h) => f > h.failing);
    t.heaviest.splice(i === -1 ? t.heaviest.length : i, 0, brief);
    if (t.heaviest.length > HEAVIEST) t.heaviest.pop();
  }
  const failedScs = /* @__PURE__ */ new Set();
  for (const v of row.violations ?? []) for (const sc2 of scsOf(v)) failedScs.add(sc2);
  const breadth = failedScs.size;
  t.breadthHist[BREADTH.findIndex(([lo, hi]) => breadth >= lo && breadth <= hi)] += 1;
  const wide = { ...brief, criteria: breadth };
  if (breadth > 0 && (t.widest.length < WIDEST || breadth > t.widest.at(-1).criteria || breadth === t.widest.at(-1).criteria && f > t.widest.at(-1).failing)) {
    const i = t.widest.findIndex((w) => breadth > w.criteria || breadth === w.criteria && f > w.failing);
    t.widest.splice(i === -1 ? t.widest.length : i, 0, wide);
    if (t.widest.length > WIDEST) t.widest.pop();
  }
  const failsA = [...failedScs].some((sc2) => scByNum.get(sc2)?.level === "A");
  t.levels[breadth === 0 ? "clean" : failsA ? "a" : "aaOnly"] += 1;
  if (row.tier != null) group(t.tiers, row.tier);
  group(row.consent ? t.consent.with : t.consent.without, "x");
}
function summarize(t, opts = {}) {
  const n = t.pages;
  const pct = (part, whole = n) => whole ? 100 * part / whole : 0;
  const groupRows = (map, min) => [...map.entries()].filter(([, g]) => g.pages >= min).map(([key, g]) => ({ key: g.only ?? key, pages: g.pages, failingPct: pct(g.failingPages, g.pages), perPage: g.sumFailing / g.pages, median: medianOf(g.counts, g.pages) })).sort((a, b) => b.pages - a.pages);
  const minGroup = opts.minGroup ?? 10;
  return {
    pages: n,
    skipped: t.skipped,
    tagged: t.tagged,
    reasons: [...t.reasons.entries()].sort((a, b) => b[1] - a[1]),
    failingPages: t.failingPages,
    failingPct: pct(t.failingPages),
    totalFailing: t.sumFailing,
    meanFailing: n ? t.sumFailing / n : 0,
    medianFailing: medianOf(t.counts, n),
    totalReview: t.sumReview,
    meanReview: n ? t.sumReview / n : 0,
    pagesWithReview: t.pagesWithReview,
    medianReview: medianOf(t.reviewCounts, n),
    histogram: BUCKETS.map(([, , label2], i) => ({ label: label2, pages: t.hist[i] })),
    rules: [...t.rules.entries()].map(([id, e]) => ({ id, help: helpOf(id), scs: ruleScs(id), impact: e.impact, pages: e.pages, elements: e.elements, pagesPct: pct(e.pages), perPage: n ? e.elements / n : 0 })).sort((a, b) => b.pages - a.pages || b.elements - a.elements),
    criteria: [...t.scs.entries()].map(([sc2, e]) => ({ sc: sc2, name: scByNum.get(sc2)?.name ?? "", level: scByNum.get(sc2)?.level ?? "", pages: e.pages, elements: e.elements, pagesPct: pct(e.pages), perPage: n ? e.elements / n : 0 })).sort((a, b) => b.pages - a.pages),
    severity: IMPACTS.map((impact) => ({ impact, ...t.severity.get(impact), pagesPct: pct(t.severity.get(impact).pages), perPage: n ? t.severity.get(impact).elements / n : 0 })).filter((x) => x.elements > 0),
    complexity: Object.fromEntries(Object.entries(t.complexity).map(([k, v]) => [k, n ? v / n : 0])),
    bands: t.bands.map((b) => ({ label: b.label, pages: b.pages, failingPct: pct(b.failingPages, b.pages), perPage: b.pages ? b.sumFailing / b.pages : 0, reviewPerPage: b.pages ? b.sumReview / b.pages : 0 })),
    review: [...t.review.entries()].map(([id, e]) => ({ id, help: helpOf(id), pages: e.pages, elements: e.elements, pagesPct: pct(e.pages), perPage: n ? e.elements / n : 0 })).sort((a, b) => b.pages - a.pages).slice(0, 12),
    byTld: groupRows(t.groups.tld, minGroup),
    byLang: groupRows(t.groups.lang, minGroup),
    bySection: groupRows(t.groups.section, 1),
    noLang: t.noLang,
    heaviest: t.heaviest,
    clean: t.clean,
    cleanSample: t.cleanSample,
    recent: t.recent,
    breadth: BREADTH.map(([, , label2], i) => ({ label: label2, pages: t.breadthHist[i] })),
    widest: t.widest,
    levels: { clean: t.levels.clean, aaOnly: t.levels.aaOnly, a: t.levels.a, passesA: t.levels.clean + t.levels.aaOnly, passesAPct: pct(t.levels.clean + t.levels.aaOnly) },
    byTier: [...t.tiers.entries()].sort((a, b) => a[0] - b[0]).map(([tier, g]) => ({ key: `top ${tier.toLocaleString("en-US")}`, tier, pages: g.pages, failingPct: pct(g.failingPages, g.pages), perPage: g.sumFailing / g.pages, median: medianOf(g.counts, g.pages) })),
    consent: ["with", "without"].map((k) => {
      const g = t.consent[k];
      return { key: k === "with" ? "A consent layer was accepted" : "No consent layer", pages: g.pages, failingPct: g.pages ? pct(g.failingPages, g.pages) : 0, perPage: g.pages ? g.sumFailing / g.pages : 0, median: medianOf(g.counts, g.pages) };
    })
  };
}

// scripts/report/lists.mjs
import fs2 from "node:fs";
import path3 from "node:path";
import zlib from "node:zlib";
var TRANCO_API = "https://tranco-list.eu/api/lists/date/latest";
var CRUX_DIR_API = "https://api.github.com/repos/zakird/crux-top-lists/contents/data/global";
var CRUX_RAW = "https://raw.githubusercontent.com/zakird/crux-top-lists/main/data/global";
var permanentReason = (row) => {
  if (row.reason === "unreachable") return row.detail === "not a hostname" ? "not a hostname" : /ERR_NAME_NOT_RESOLVED/.test(row.detail ?? "") ? "name does not resolve" : null;
  if (row.reason === "http-error") return /HTTP (404|410)/.test(row.detail ?? "") ? row.detail : null;
  if (row.reason === "not-html") return `serves ${row.detail || "a non-HTML document"}`;
  if (row.reason === "placeholder") return `placeholder, ${row.detail}`;
  return null;
};
function readList(file) {
  const rows = [];
  let line = 0;
  for (const raw of fs2.readFileSync(file, "utf8").split("\n")) {
    const text = raw.trim();
    if (!text || text.startsWith("#")) continue;
    line += 1;
    const cells = text.split(",").map((c) => c.trim());
    let rank;
    let domain;
    let tag = null;
    let tier = null;
    let url = null;
    let rest;
    if (/^\d+$/.test(cells[0]) && cells[1]) {
      rank = Number(cells[0]);
      domain = cells[1];
      rest = cells.slice(2);
    } else {
      rank = line;
      domain = cells[0];
      rest = cells.slice(1);
    }
    if (/^\d+$/.test(rest[0] ?? "")) {
      tier = Number(rest[0]);
      rest = rest.slice(1);
    }
    if (rest[0]) tag = { reason: rest[0], date: rest[1] ?? "" };
    if (/^[a-z]+:\/\//i.test(domain)) {
      try {
        const u = new URL(domain);
        url = `${u.origin}/`;
        domain = u.hostname;
      } catch {
        continue;
      }
    }
    domain = domain.toLowerCase().replace(/^www\./, "");
    rows.push({ rank, domain, url, tier, tag, invalid: !/^[a-z0-9.-]+\.[a-z0-9-]{2,}$/i.test(domain) || void 0 });
  }
  return rows;
}
function writeList(file, rows) {
  const csv = rows.map((r) => `${r.rank},${r.url ? r.url.replace(/\/$/, "") : r.domain}${r.tier != null ? `,${r.tier}` : ""}${r.tag ? `,${r.tag.reason.replace(/,/g, ";")},${r.tag.date}` : ""}`).join("\n") + "\n";
  fs2.writeFileSync(file, csv);
}
function carriedTags(dir, prefix, exceptFile) {
  const previous = fs2.readdirSync(dir).filter((f) => f.startsWith(prefix) && f.endsWith(".csv") && path3.join(dir, f) !== exceptFile).map((f) => path3.join(dir, f)).sort((a, b) => fs2.statSync(b).mtimeMs - fs2.statSync(a).mtimeMs)[0];
  const carried = /* @__PURE__ */ new Map();
  if (previous) {
    for (const r of readList(previous)) if (r.tag) carried.set(r.domain, r.tag);
  }
  return { carried, previous };
}
async function resolveCrux(dir, count2 = 1e5) {
  fs2.mkdirSync(dir, { recursive: true });
  const listing = await (await fetch(CRUX_DIR_API, { headers: { "user-agent": "pour-report" } })).json();
  const months = listing.map((f) => f.name).filter((n) => /^\d{6}\.csv\.gz$/.test(n)).sort();
  const id = months.at(-1)?.slice(0, 6);
  if (!id) throw new Error("could not find a CrUX monthly file in the mirror");
  const date = `${id.slice(0, 4)}-${id.slice(4)}-01`;
  const file = path3.join(dir, `crux-${id}.csv`);
  if (!fs2.existsSync(file)) {
    console.log(`downloading the CrUX top list for ${id.slice(0, 4)}-${id.slice(4)}\u2026`);
    const res = await fetch(`${CRUX_RAW}/${id}.csv.gz`);
    if (!res.ok) throw new Error(`CrUX download failed: HTTP ${res.status}`);
    const text = zlib.gunzipSync(Buffer.from(await res.arrayBuffer())).toString("utf8");
    const { carried, previous } = carriedTags(dir, "crux-", file);
    const rows = [];
    for (const line of text.split("\n")) {
      const [origin, tier] = line.trim().split(",");
      if (!origin || !/^https?:\/\//.test(origin) || Number(tier) > count2) continue;
      let host2;
      try {
        host2 = new URL(origin).hostname.toLowerCase().replace(/^www\./, "");
      } catch {
        continue;
      }
      rows.push({ rank: rows.length + 1, domain: host2, url: `${origin}/`, tier: Number(tier), tag: carried.get(host2) ?? null });
    }
    writeList(file, rows);
    console.log(`saved ${path3.relative(process.cwd(), file)}: ${rows.length} origins, ${carried.size ? `${rows.filter((r) => r.tag).length} tags carried over from ${path3.basename(previous)}` : "no earlier tags"}`);
  }
  return { file, id, date, source: "crux", name: "Chrome UX Report top sites", url: "https://github.com/zakird/crux-top-lists" };
}
async function resolveTranco(dir, count2 = 1e5) {
  fs2.mkdirSync(dir, { recursive: true });
  const meta2 = await (await fetch(TRANCO_API)).json();
  const id = meta2.list_id;
  const date = String(meta2.created_on ?? "").slice(0, 10);
  const file = path3.join(dir, `tranco-${id}.csv`);
  if (!fs2.existsSync(file)) {
    const { carried, previous } = carriedTags(dir, "tranco-", file);
    console.log(`downloading Tranco list ${id} (${date})\u2026`);
    const res = await fetch(`https://tranco-list.eu/download/${id}/${count2}`);
    if (!res.ok) throw new Error(`Tranco download failed: HTTP ${res.status}`);
    const text = await res.text();
    const rows = [];
    for (const line of text.split("\n")) {
      const [rank, domain] = line.trim().split(",");
      if (!rank || !domain) continue;
      const d = domain.toLowerCase();
      rows.push({ rank: Number(rank), domain: d, tag: carried.get(d) ?? null });
    }
    writeList(file, rows);
    console.log(`saved ${path3.relative(process.cwd(), file)}: ${rows.length} domains, ${carried.size ? `${rows.filter((r) => r.tag).length} tags carried over from ${path3.basename(previous)}` : "no earlier tags"}`);
  }
  return { file, id, date, source: "tranco", name: "Tranco", url: "https://tranco-list.eu" };
}

// scripts/report/render.mjs
import fs4 from "node:fs";
import path5 from "node:path";
import readline from "node:readline";
import { fileURLToPath as fileURLToPath2 } from "node:url";
import crypto from "node:crypto";

// scripts/report/html.mjs
import fs3 from "node:fs";
import path4 from "node:path";

// src/ui/impact-donut.js
var R = 42;
var STROKE = 7;
var CIRCUMFERENCE = 2 * Math.PI * R;
var GAP = 2;
var CORNER = 2;
var OUTER = R + STROKE / 2;
var INNER = R - STROKE / 2;
var pt = (radius, angle) => `${(60 + radius * Math.sin(angle)).toFixed(2)} ${(60 - radius * Math.cos(angle)).toFixed(2)}`;
function segmentPath(t0, t1) {
  const cornerOuter = CORNER / OUTER;
  const cornerInner = CORNER / INNER;
  const largeOuter = t1 - t0 - 2 * cornerOuter > Math.PI ? 1 : 0;
  const largeInner = t1 - t0 - 2 * cornerInner > Math.PI ? 1 : 0;
  return [
    `M ${pt(OUTER, t0 + cornerOuter)}`,
    `A ${OUTER} ${OUTER} 0 ${largeOuter} 1 ${pt(OUTER, t1 - cornerOuter)}`,
    `A ${CORNER} ${CORNER} 0 0 1 ${pt(OUTER - CORNER, t1)}`,
    `L ${pt(INNER + CORNER, t1)}`,
    `A ${CORNER} ${CORNER} 0 0 1 ${pt(INNER, t1 - cornerInner)}`,
    `A ${INNER} ${INNER} 0 ${largeInner} 0 ${pt(INNER, t0 + cornerInner)}`,
    `A ${CORNER} ${CORNER} 0 0 1 ${pt(INNER + CORNER, t0)}`,
    `L ${pt(OUTER - CORNER, t0)}`,
    `A ${CORNER} ${CORNER} 0 0 1 ${pt(OUTER, t0 + cornerOuter)}`,
    "Z"
  ].join(" ");
}
function renderImpactDonut({ impacts, counts, totalElements, hidden, displayTotal }) {
  const present = impacts.filter((impact) => counts[impact].elements);
  if (!present.length || !totalElements) return "";
  const multi = present.length > 1;
  const minSpan = (2 * CORNER + 1) / INNER;
  const MIN_SLOT = STROKE + 2 * GAP;
  const floorFor = (impact) => MIN_SLOT * Math.min(1, counts[impact].elements);
  let slots = present.map((impact) => ({ impact, arc: counts[impact].elements / totalElements * CIRCUMFERENCE }));
  if (multi) {
    const deficit = slots.reduce((sum, s) => sum + Math.max(0, floorFor(s.impact) - s.arc), 0);
    const surplus = slots.reduce((sum, s) => sum + Math.max(0, s.arc - floorFor(s.impact)), 0);
    slots = slots.map((s) => {
      const floor = floorFor(s.impact);
      return { ...s, arc: s.arc < floor ? floor : s.arc - (s.arc - floor) / surplus * deficit };
    });
  }
  let startLength = 0;
  const segments = slots.map(({ impact, arc }) => {
    const share = counts[impact].elements / totalElements;
    const shown = Math.round(counts[impact].elements);
    const title = impact === "track" ? "" : `<title>${impact} \u2014 ${shown} element${shown === 1 ? "" : "s"} (${Math.round(share * 100)}%)</title>`;
    const cls = `donut-seg seg-${impact}${hidden.has(impact) ? " off" : ""}`;
    const data = impact === "track" ? "" : ` data-impact="${impact}"`;
    const fill = "";
    const t0 = (startLength + GAP / 2) / CIRCUMFERENCE * 2 * Math.PI;
    const t1 = (startLength + arc - GAP / 2) / CIRCUMFERENCE * 2 * Math.PI;
    startLength += arc;
    if (!multi) {
      const ring = (radius, sweep) => `M ${pt(radius, 0)} A ${radius} ${radius} 0 1 ${sweep} ${pt(radius, Math.PI)} A ${radius} ${radius} 0 1 ${sweep} ${pt(radius, 0)}`;
      return `<path class="${cls}"${data} fill-rule="evenodd"${fill} d="${ring(OUTER, 1)} ${ring(INNER, 0)}">${title}</path>`;
    }
    if (t1 - t0 < minSpan) {
      const mid = (t0 + t1) / 2;
      return `<circle class="${cls}"${data}${fill} cx="${(60 + R * Math.sin(mid)).toFixed(2)}" cy="${(60 - R * Math.cos(mid)).toFixed(2)}" r="${STROKE / 2}">${title}</circle>`;
    }
    return `<path class="${cls}"${data}${fill} d="${segmentPath(t0, t1)}">${title}</path>`;
  }).join("");
  return `
    <svg class="impact-donut" viewBox="0 0 120 120" aria-hidden="true">
${segments}
      <text class="donut-total" x="60" y="55">${Math.round(displayTotal ?? totalElements)}</text>
      <text class="donut-caption" x="60" y="75">element${Math.round(displayTotal ?? totalElements) === 1 ? "" : "s"}</text>
    </svg>`;
}

// scripts/report/html.mjs
var COMMON_NAV = [{ id: "spread", label: "By failures" }, { id: "rules", label: "By rule" }, { id: "criteria", label: "By success criterion" }, { id: "severity", label: "By severity" }, { id: "shape", label: "By page shape" }];
var int = (v) => Math.round(v).toLocaleString("en-US");
var dec = (v, d = 1) => Number(v).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
var pc = (v) => `${dec(v, v >= 10 ? 0 : 1)}%`;
var longDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
var monthName = (ym) => (/* @__PURE__ */ new Date(`${ym}-01T00:00:00`)).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
var bars = (items, valueOf, labelOf2, countOf, header = null) => {
  const max2 = Math.max(...items.map(valueOf), 1);
  const head = header ? `<li class="bars-head" aria-hidden="true"><span>${escapeHtml(header[0])}</span><span></span><span class="val">${escapeHtml(header[1])}</span></li>` : "";
  return `<ul class="bars">${head}${items.map((it) => `<li><span>${escapeHtml(labelOf2(it))}</span><span class="track"><span class="bar" style="width:${(100 * valueOf(it) / max2).toFixed(1)}%"></span></span><span class="val">${countOf(it)}</span></li>`).join("")}</ul>`;
};
var SORT_ICON = '<svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><g class="i-none"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></g><g class="i-asc"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></g><g class="i-desc"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></g></svg>';
var table = (head, body, opts = {}) => `<div class="wrap"><table class="${opts.compact ? "compact" : ""}${opts.sortable ? " sortable" : ""}"${opts.label ? ` aria-label="${escapeHtml(opts.label)}"` : ""}><thead><tr>${head.map(([h, numeric], i) => `<th scope="col"${numeric ? ' class="num"' : ""}${opts.sortable ? ` aria-sort="none"` : ""}>${opts.sortable ? `<button type="button" class="sort" data-col="${i}" data-type="${numeric ? "num" : "text"}">${h}${SORT_ICON}</button>` : h}</th>`).join("")}</tr></thead><tbody>${opts.sortable ? body.replace(/<th scope="row"([^>]*)>([\s\S]*?)<\/th>/g, '<th scope="row"$1><span class="rh">$2</span></th>') : body}</tbody></table></div>`;
var num = (v) => `<td class="num">${v}</td>`;
var scLink = (sc2) => `<a href="${escapeHtml(scByNum.get(sc2)?.url ?? "#")}" rel="external">${sc2}</a>`;
var miniStats = (pairs) => {
  const list2 = pairs.filter(Boolean);
  return list2.length ? `<div class="ministats">${list2.map(([value, label2]) => `<p class="ministat"><strong>${value}</strong>${label2}</p>`).join("")}</div>` : "";
};
var disclosure = (count2, label2, body, tone = "moderate") => `<details class="group"><summary><span class="count-tile impact-${escapeHtml(tone)}">${typeof count2 === "number" ? int(count2) : escapeHtml(count2)}</span><span class="group-main">${label2}</span></summary>${body}</details>`;
var dot = (impact) => `<span class="dot impact-${escapeHtml(impact ?? "moderate")}" aria-hidden="true"></span>`;
function severityViz(s, what = "pages") {
  const impacts = ["critical", "serious", "moderate", "minor"];
  const counts = Object.fromEntries(impacts.map((i) => [i, { elements: s.severity.find((x) => x.impact === i)?.elements ?? 0 }]));
  const total = s.totalFailing;
  if (!total) return "";
  const compact = (n) => n >= 1e6 ? `${(n / 1e6).toFixed(n >= 1e7 ? 1 : 2)}M` : n >= 1e4 ? `${Math.round(n / 1e3)}K` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}K` : String(n);
  const donut = renderImpactDonut({ impacts, counts, totalElements: total, hidden: /* @__PURE__ */ new Set() }).replace(/(<text class="donut-total"[^>]*>)[^<]*(<\/text>)/, `$1${compact(total)}$2`).replace(/<title>(\w+) — (\d+) elements? \((\d+)%\)<\/title>/g, (m, impact, n, share) => `<title>${impact}: ${int(Number(n))} elements (${share}%)</title>`);
  const rows = s.severity.map((x) => `<li class="impact impact-${escapeHtml(x.impact)}"><span class="dot"></span>${escapeHtml(x.impact)}<span class="share">${pc(x.pagesPct)} of ${what}</span><span class="pill-count">${int(x.elements)}</span></li>`).join("");
  return `<div class="viz" role="group" aria-label="Failing elements by severity">${donut}<ul class="impact-summary">${rows}<li class="impact impact-review review-row"><span class="dot"></span>review<span class="share">${pc(s.pages ? 100 * s.pagesWithReview / s.pages : 0)} of ${what}</span><span class="pill-count">${int(s.totalReview)}</span></li><li class="impact impact-good"><span class="dot"></span>clean<span class="share">${pc(s.pages ? 100 * s.clean / s.pages : 0)} of ${what}, nothing found</span><span class="pill-count">${int(s.clean)} ${what}</span></li></ul></div>`;
}
var ruleCell = (id, help) => `<span class="rule">${escapeHtml(id)}</span><span class="help">${escapeHtml(help ?? helpOf(id))}</span>`;
var groupTable = (label2, rows, ariaLabel, what = "pages") => table(
  [[label2, false], [what[0].toUpperCase() + what.slice(1), true], ["With failures", true], [`Failing elements per ${what.slice(0, -1)}`, true], ["Median", true]],
  rows.map((g) => `<tr><th scope="row">${escapeHtml(g.key)}</th>${num(int(g.pages))}${num(pc(g.failingPct))}${num(dec(g.perPage))}${num(int(g.median))}</tr>`).join(""),
  { label: ariaLabel }
);
var REASON_LABEL = {
  unreachable: "did not resolve or refused the connection",
  "http-error": "answered with an HTTP error",
  "not-html": "served something other than an HTML page",
  "bot-challenge": "showed a bot challenge instead of the page",
  blocked: "were refused by the site's firewall after every try",
  placeholder: "rendered too few elements to be a page",
  duplicate: "redirected to a site already in the report",
  "redirected-away": "redirected to another site",
  robots: "are disallowed by the site's robots.txt",
  timeout: "did not finish inside the time allowed",
  error: "failed during the audit",
  tagged: "were tagged unavailable by an earlier run and not tried"
};
var WHO = {
  "color-contrast": ["Low-contrast text", "people with low vision, and anyone reading on a dim screen or in sunlight"],
  "link-name": ["Links with no name", 'a screen reader hears "link" with no idea where it goes; voice control cannot click what it cannot name'],
  "form-label": ["Unlabelled form fields", "a screen reader reaches the field and cannot say what it asks for"],
  "image-alt": ["Images with no text alternative", "people who cannot see the image get the filename, or nothing"],
  "control-contrast": ["Faint text inside form fields", "people with low vision typing into fields they can barely read"],
  "target-size": ["Small touch targets", "people with tremor or limited dexterity, and every thumb on a small screen"],
  "meta-viewport": ["Zoom disabled", "people who need larger text are locked at the size the designer chose"],
  "link-in-text-block": ["Links only colour sets apart", "colourblind readers cannot find the links in the prose"],
  "aria-hidden-focus": ["Focus lands on hidden content", "keyboard users tab into things that are not visibly there"],
  "dialog-name": ["Dialogs with no name", "a screen reader opens a window and cannot say what it is"],
  "list-structure": ["Broken list structure", "screen readers announce the wrong size and shape for a list"]
};
function commonSections(s, what = "pages", engine = "the engine") {
  const n = s.pages;
  const pct = (part) => n ? 100 * part / n : 0;
  const topSix = s.rules.slice(0, 6);
  const sixShare = s.totalFailing ? 100 * topSix.reduce((t, e) => t + e.elements, 0) / s.totalFailing : 0;
  const rare = s.rules.filter((e) => e.pagesPct < 1);
  const ruleRow = (e, full) => `<tr><th scope="row">${dot(e.impact)}${ruleCell(e.id, e.help)}</th><td>${e.scs.map(scLink).join(", ") || "best practice"}</td>${num(int(e.pages))}${full ? num(pc(e.pagesPct)) + num(dec(e.perPage)) : ""}${num(int(e.elements))}</tr>`;
  const unit = what.slice(0, -1);
  const What = what[0].toUpperCase() + what.slice(1);
  return `
    <section class="docs" id="spread" aria-labelledby="spread-title">
      <h2 id="spread-title">By failures</h2>
      ${miniStats([[int(s.totalFailing), "failing elements found in total"]])}
      <p>
        Every failing element on every ${unit} was counted, and the ${what} grouped by that count.
        Most ${what} have a handful to a few dozen; a small group run into the hundreds, and they
        pull the average up. Each row is one group, and the bar is how many ${what} fall in it:
      </p>
      ${bars(s.histogram, (b) => b.pages, (b) => b.label, (b) => `${int(b.pages)} <span class="dim">(${pc(pct(b.pages))})</span>`, ["Failing elements", What])}
    </section>

    <section class="docs" id="rules" aria-labelledby="common-title">
      <h2 id="common-title">By rule</h2>
      ${topSix.length ? miniStats([[pc(sixShare), `of the failures come from ${topSix.length === 6 ? "six" : topSix.length} rules`], [int(s.rules.length), "rules failed somewhere"]]) : ""}
      <p>
        ${topSix.length ? `${topSix.length === 6 ? "Six rules" : `${topSix.length} rule${topSix.length === 1 ? "" : "s"}`} make up most of what was found:
        ${topSix.map((e, i) => `${i === topSix.length - 1 && topSix.length > 1 ? "and " : ""}${escapeHtml(e.help.toLowerCase().replace(/\.$/, ""))} on ${pc(e.pagesPct)} of ${what}`).join(", ")}.` : "Nothing failed."}
        A rule is one check. The criterion is the part of WCAG it tests. Elements per ${unit}
        is the average over all ${int(n)} ${what}, including the ones that passed.
      </p>
      ${(() => {
    const seen2 = topSix.filter((e) => WHO[e.id]);
    return seen2.length ? `<p>Behind each rule is a person locked out:</p><ul class="who">${seen2.map((e) => `<li><strong>${escapeHtml(WHO[e.id][0])}</strong>${escapeHtml(WHO[e.id][1])}</li>`).join("")}</ul>` : "";
  })()}
      ${(() => {
    const common = s.rules.filter((e) => e.pagesPct >= 1);
    return common.length ? disclosure(common.length, `The rule${common.length === 1 ? "" : "s"} that failed on at least one ${unit} in a hundred`, table(
      [["Rule", false], ["Criterion", false], [What, true], [`Share of ${what}`, true], [`Elements per ${unit}`, true], ["Elements", true]],
      common.map((e) => ruleRow(e, true)).join(""),
      { label: "Failures by rule, on at least one page in a hundred" }
    )) : "";
  })()}
      ${rare.length ? disclosure(rare.length, `The rule${rare.length === 1 ? "" : "s"} that failed on fewer than one ${unit} in a hundred`, `${table([["Rule", false], ["Criterion", false], [What, true], ["Elements", true]], rare.map((e) => ruleRow(e, false)).join(""), { compact: true, label: "Failures by rule, rarer than one page in a hundred" })}`) : ""}
    </section>

    <section class="docs" id="criteria" aria-labelledby="criteria-title">
      <h2 id="criteria-title">By success criterion</h2>
      ${s.criteria.length ? miniStats([[int(s.criteria.length), "criteria broken somewhere"], [pc(s.criteria[0].pagesPct), `of ${what} fail ${s.criteria[0].sc} ${escapeHtml(s.criteria[0].name)}`]]) : ""}
      <p>
        The same failures, grouped by the WCAG&nbsp;2.2 criterion they break. A ${unit} counts
        once per criterion. A rule that covers two criteria counts in both.
      </p>
      ${s.criteria.length ? disclosure(s.criteria.length, "Every criterion with a failure", table(
    [["Criterion", false], [What, true], [`Share of ${what}`, true], [`Elements per ${unit}`, true]],
    s.criteria.map((e) => `<tr><th scope="row">${scLink(e.sc)} <span class="help">${escapeHtml(e.name)}</span></th>${num(int(e.pages))}${num(pc(e.pagesPct))}${num(dec(e.perPage))}</tr>`).join(""),
    { label: "Failures by success criterion" }
  )) : ""}
    </section>

    <section class="docs" id="severity" aria-labelledby="severity-title">
      <h2 id="severity-title">By severity</h2>
      ${(() => {
    const c = s.severity.find((x) => x.impact === "critical"), sr = s.severity.find((x) => x.impact === "serious");
    return miniStats([...c ? [[pc(c.pagesPct), `of ${what} have a critical failure`]] : [], ...sr ? [[pc(sr.pagesPct), `of ${what} have a serious failure`]] : []]);
  })()}
      <p>
        How much a failure gets in the way: critical stops a task, serious makes it hard,
        moderate and minor slow it down.
      </p>
      ${table(
    [["Severity", false], [What, true], [`Share of ${what}`, true], ["Elements", true], [`Elements per ${unit}`, true]],
    s.severity.map((x) => `<tr><th scope="row" class="nw">${dot(x.impact)}${escapeHtml(x.impact)}</th>${num(int(x.pages))}${num(pc(x.pagesPct))}${num(int(x.elements))}${num(dec(x.perPage))}</tr>`).join(""),
    { label: "Failures by severity" }
  )}
    </section>

    <section class="docs" id="shape" aria-labelledby="shape-title">
      <h2 id="shape-title">By page shape</h2>
      ${miniStats([[int(s.complexity.elements), `elements on the average ${unit}`], [int(s.complexity.ariaAttrs), `ARIA attributes on the average ${unit}`]])}
      <p>
        The average ${unit} also has ${int(s.complexity.images)} images, ${int(s.complexity.headings)} headings,
        ${int(s.complexity.links)} links, ${int(s.complexity.buttons)} buttons
        and ${int(s.complexity.inputs)} form fields.
        ${s.bands.some((b) => b.pages) ? "Bigger pages have more to fail:" : ""}
      </p>
      ${s.bands.some((b) => b.pages) ? table(
    [[`Elements on the ${unit}`, false], [What, true], ["With failures", true], [`Failing elements per ${unit}`, true], [`Elements to review per ${unit}`, true]],
    s.bands.filter((b) => b.pages).map((b) => `<tr><th scope="row">${b.label}</th>${num(int(b.pages))}${num(pc(b.failingPct))}${num(dec(b.perPage))}${num(dec(b.reviewPerPage))}</tr>`).join(""),
    { label: "Failures by page size" }
  ) : ""}
    </section>
`;
}
function reviewSection(s, what = "pages", engine = "the engine") {
  const pct = (part) => s.pages ? 100 * part / s.pages : 0;
  const unit = what.slice(0, -1);
  const What = what[0].toUpperCase() + what.slice(1);
  return `    <section class="docs" id="review" aria-labelledby="review-title">
      <h2 id="review-title">Not sure</h2>
      ${miniStats([[int(s.totalReview), "elements handed to a person"], [pc(pct(s.pagesWithReview)), `of ${what} have something to review`]])}
      <p>
        Nothing above is a guess. When ${engine} cannot be sure, it hands the element to a
        person, ${dec(s.meanReview)} per ${unit} on average.
      </p>
      ${s.review.length ? disclosure(s.review.length, "The rules that most often needed a person", table(
    [["Rule", false], [What, true], [`Share of ${what}`, true], [`Elements per ${unit}`, true]],
    s.review.map((e) => `<tr><th scope="row">${dot("review")}${ruleCell(e.id, e.help)}</th>${num(int(e.pages))}${num(pc(e.pagesPct))}${num(dec(e.perPage))}</tr>`).join(""),
    { label: "Elements handed to a person, by rule" }
  ), "review") : ""}
    </section>`;
}
function promoSection() {
  return `
    <section class="docs" id="try" aria-labelledby="try-title">
      <hr class="report-end">
      <div class="promo">
        <span class="promo-mark" aria-hidden="true"><svg viewBox="0 0 32 32" width="24" height="24" focusable="false"><rect x="2" y="2" width="10.5" height="10.5"/><rect x="19.5" y="2" width="10.5" height="10.5"/><rect x="2" y="19.5" width="10.5" height="10.5"/><rect x="19.5" y="19.5" width="10.5" height="10.5"/></svg><span>pour</span></span>
        <h2 id="try-title">Check your own pages</h2>
        <p>
          pour Tools comprise the browser extension, the bookmarklet, the command line
          and the VS Code extension: free, open source, the same checks wherever you work.
        </p>
        <div class="promo-links">
          <a class="btn" href="https://pour.dev" rel="external">Get pour Tools at pour.dev</a>
        </div>
      </div>
    </section>`;
}
function limitsSection(extra = "", unit = "page") {
  return `
    <section class="docs" id="limits" aria-labelledby="limits-title">
      <h2 id="limits-title">Limits</h2>
      <p>
        Automation checks part of WCAG. A ${unit} with no failures here can still be hard to
        use; only a person can find the rest. One failing element is one count, so a menu
        of forty low-contrast links counts forty times. ${extra}
        The window size matters too: sites show different content at
        different widths, and these numbers are for this one. And a ${unit} is
        judged on the page it chose to serve: where that was a sign-in form
        or a redirect stub rather than a home page, a clean result speaks for
        that form, not the site behind it.
      </p>
    </section>`;
}
var CSS2 = `
:root{--bg:#08090A;--surface:#101113;--text:#F7F8F8;--muted:#8A8F98;--accent:#FFD60A;--hair:rgba(247,248,248,.09);--hair2:rgba(247,248,248,.2);--hairline:rgba(247,248,248,.09);--sev-critical-bg:rgba(255,82,51,.16);--sev-critical-fg:#FF5233;--sev-serious-bg:rgba(245,197,24,.14);--sev-serious-fg:#F5C518;--sev-moderate-bg:rgba(247,248,248,.10);--sev-moderate-fg:#F7F8F8;--sev-minor-bg:rgba(247,248,248,.06);--sev-minor-fg:#8A8F98;--sev-review-bg:rgba(59,130,246,.16);--sev-review-fg:#60A5FA;--sev-critical-vivid:#FF5233;--sev-serious-vivid:#F5C518;--sev-moderate-vivid:#C6CBD2;--sev-minor-vivid:#7C828B;--sev-review-vivid:#60A5FA;--sev-good-bg:rgba(34,197,94,.16);--sev-good-fg:#4ADE80;--sev-good-vivid:#4ADE80;--font:'Atkinson Hyperlegible','Helvetica Neue',Arial,sans-serif;--display:Inter,'Helvetica Neue',Arial,sans-serif;--mono:ui-monospace,'SF Mono',Menlo,Consolas,monospace;--measure:56rem;--gutter:clamp(1.25rem,5vw,4rem)}
*{box-sizing:border-box}
html{color-scheme:dark;background:var(--bg)}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.6 var(--font);-webkit-font-smoothing:antialiased}
a{color:var(--text);text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:3px}
a:hover{background:var(--text);color:var(--bg)}
:focus-visible{outline:2px solid var(--text);outline-offset:3px}
.skip{position:absolute;left:var(--gutter);top:.5rem;padding:.5rem .8rem;background:var(--text);color:var(--bg);font-weight:700;text-decoration:none;transform:translateY(-300%)}
.skip:focus{transform:none}
.top{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:.5rem 1.5rem;padding:.8rem var(--gutter);background:var(--bg);border-bottom:1px solid var(--hair)}
.get-pour{margin-left:auto;white-space:nowrap;background:var(--text);color:var(--bg);text-decoration:none;font-weight:640;font-size:.9rem;border:1px solid var(--text);border-radius:8px;padding:.45rem .85rem}
.get-pour:hover{background:var(--bg);color:var(--text)}
.menu-toggle{display:flex;align-items:center;gap:.45rem;background:none;border:0;color:var(--text);padding:.5rem;cursor:pointer;font:640 .9rem/1 var(--font)}
.menu-toggle svg{display:block}
.menu-toggle .icon-close{display:none}
.menu-toggle[aria-expanded=true] .icon-close{display:block}
.menu-toggle[aria-expanded=true] .icon-menu{display:none}
.top nav{position:absolute;top:100%;left:0;right:0;background:var(--bg);border-bottom:1px solid var(--hair2);display:none;max-height:calc(100vh - 3.6rem);overflow:auto}
.top nav.open{display:block}
.wordmark{display:inline-flex;align-items:center;gap:.5rem;font:700 1.15rem/1 var(--display);text-decoration:none;padding:.35rem 0}
.wordmark svg{display:block}
.wordmark rect{fill:currentColor}
.wordmark:hover{background:none;color:var(--text)}
section[id]{scroll-margin-top:9.5rem}
.menu{display:flex;flex-direction:column;gap:0;margin:0;padding:.5rem calc(var(--gutter) - .7rem) 1rem;list-style:none}
.menu a{display:block;padding:.7rem;font-size:1rem;font-weight:640;text-decoration:none;color:var(--muted);border-radius:6px}
.menu a:hover{background:var(--text);color:var(--bg)}
main{display:block}
.docs{max-width:calc(var(--measure) + 2*var(--gutter));margin-inline:auto;padding:clamp(3.8rem,7.5vh,5.6rem) var(--gutter) 0}
.intro{padding-top:clamp(4.5rem,9vh,7rem)}
.eyebrow{font-family:var(--mono);font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin:0 0 1.2rem}
h1{font:620 clamp(2.2rem,4.6vw,3.6rem)/1.05 var(--display);letter-spacing:-.02em;margin:0}
h2{font:600 clamp(1.55rem,2.8vw,2.2rem)/1.15 var(--display);letter-spacing:-.015em;margin:0}
.lede{margin:1.5rem 0 0;font-size:1.125rem;color:var(--muted)}
.docs p{margin:1.2rem 0 0;color:var(--muted);max-width:var(--measure)}
.note{font-size:.9rem}
.stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(1.8rem,4.5vw,4rem);max-width:calc(var(--measure) + 2*var(--gutter));margin:clamp(3rem,6vh,4.5rem) auto 0;padding:0 var(--gutter)}
.stat{margin:0;padding-top:1.2rem;border-top:1px solid var(--hair2);text-align:center;color:var(--muted);font-size:1rem}
.stat strong{display:block;font:620 clamp(2.6rem,4.6vw,4rem)/1 var(--display);color:var(--text);margin-bottom:.5rem}
.ministats{display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:1.2rem 2rem;margin:1.6rem 0 .4rem}
.ministat{margin:0;padding-top:.8rem;border-top:1px solid var(--hair2);color:var(--muted);font-size:.85rem}
.ministat strong{display:block;font:620 1.7rem/1.1 var(--display);color:var(--text);margin-bottom:.25rem}
.bars{list-style:none;margin:1.5rem 0 0;padding:0;display:grid;gap:.8rem}
/* The closing advert: a card in the site's grammar, buttons that invert
 * with no transition. */
.report-end{border:0;border-top:1px solid var(--hair);margin:0 0 clamp(2.4rem,5vh,3.6rem)}
.promo{background:var(--surface);border:1px solid var(--hair);border-radius:14px;padding:clamp(1.6rem,4vw,2.6rem)}
.promo .promo-mark{display:inline-flex;align-items:center;gap:.6rem;margin-bottom:1.1rem;font:700 1.3rem/1 var(--display);color:var(--text)}
.promo .promo-mark rect{fill:var(--text)}
.promo h2{margin-top:0}
.promo-links{display:flex;flex-wrap:wrap;gap:.8rem;margin-top:1.8rem}
.btn{display:inline-block;padding:.65rem 1.1rem;border-radius:8px;background:var(--text);color:var(--bg);font-weight:640;text-decoration:none;border:1px solid var(--text)}
.btn:hover{background:var(--bg);color:var(--text)}
.who{list-style:none;margin:1.4rem 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1rem 2rem}
.who li{color:var(--muted);font-size:.95rem;line-height:1.5}
.who strong{display:block;color:var(--text);font-weight:640}
.player-slot{display:flex;justify-content:center;max-width:calc(var(--measure) + 2*var(--gutter));margin:1.6rem auto 0;padding:0 var(--gutter);position:sticky;top:calc(5.3rem + .6rem);z-index:9}
.player{position:relative;display:flex;align-items:center;gap:.55rem;background:var(--surface);border:1px solid var(--hair);border-radius:999px;padding:.5rem 1rem .6rem .55rem;width:fit-content;max-width:100%;margin-inline:auto}
.player-slot.reading .player{width:34rem}
.player-slot.reading .now{flex:1}
.player[hidden]{display:none}
.player{background:var(--bg);border-color:var(--hair2);box-shadow:0 8px 30px rgba(0,0,0,.45)}
.pp{flex:none;width:36px;height:36px;border-radius:50%;background:var(--text);color:var(--bg);border:1px solid var(--text);display:inline-flex;align-items:center;justify-content:center;cursor:pointer}
.pp:hover{background:var(--surface);color:var(--text)}
.pp svg[hidden]{display:none}
.counter{flex:none;color:var(--muted);font-size:.85rem;font-variant-numeric:tabular-nums;white-space:nowrap}
.counter[hidden]{display:none}
.now a{color:inherit;text-decoration:none}
.now a:hover{color:var(--bg)}
.now{min-width:0;color:var(--text);font:640 .9rem/1.3 var(--font);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;padding:.6rem 0}
.icon-btn{flex:none;background:none;border:0;color:var(--text);padding:.3rem;border-radius:50%;cursor:pointer;display:inline-flex}
.icon-btn:hover{background:var(--text);color:var(--bg)}
.icon-btn[hidden]{display:none}
.consent-banner{position:fixed;inset-inline:0;bottom:0;z-index:40;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem 2.5rem;padding:1.1rem var(--gutter);background:var(--surface);border-top:1px solid var(--hair2)}
.consent-banner[hidden]{display:none}
.consent-copy{margin:0;max-width:var(--measure);font-size:.9rem;color:var(--muted)}
.consent-copy strong{display:block;color:var(--text);font-weight:640}
.consent-actions{display:flex;flex-wrap:wrap;gap:.8rem}
.btn.ghost{background:transparent;color:var(--text)}
.btn.ghost:hover{background:var(--text);color:var(--bg)}
.consent-reopen{background:none;border:0;padding:0;color:inherit;font:inherit;text-decoration:underline;cursor:pointer}
.read-outline{position:fixed;pointer-events:none;z-index:8;width:3px;background:var(--accent);border-radius:2px}
.read-outline[hidden]{display:none}
.icon-btn[aria-pressed="true"]{background:var(--text);color:var(--bg)}
.icon-btn svg[hidden]{display:none}
.rate-btn{flex:none;background:none;border:0;color:var(--muted);font:640 .9rem/1 var(--font);cursor:pointer;padding:.3rem .3rem;border-radius:6px}
.rate-btn:hover{background:var(--text);color:var(--bg)}
.rate-btn[hidden]{display:none}
.pop-wrap{position:relative;display:inline-flex}
.player-slot:not(.reading) .pop-wrap{display:none}
.player-slot:not(.reading) .player{cursor:pointer}
.pop{position:absolute;top:calc(100% + 10px);left:50%;transform:translateX(-50%);display:flex;flex-direction:column;gap:2px;background:var(--bg);border:1px solid var(--hair2);border-radius:10px;padding:.3rem;box-shadow:0 8px 30px rgba(0,0,0,.45);z-index:2}
.pop[hidden]{display:none}
.pop button{background:none;border:0;border-radius:7px;color:var(--muted);font:640 .85rem/1 var(--font);padding:.5rem .8rem;cursor:pointer;white-space:nowrap;text-align:center}
.pop button:hover{background:var(--text);color:var(--bg)}
.pop button[aria-current="true"]{color:var(--text)}
.pop button[aria-current="true"]:hover{color:var(--bg)}
.track-line{position:absolute;left:1.4rem;right:1.4rem;bottom:-1px;height:14px;cursor:pointer}
.track-line[hidden]{display:none}
.track-line .played{position:absolute;left:0;bottom:3px;height:3px;background:var(--text);border-radius:2px;width:0}
.bars .bars-head{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.bars li{display:grid;grid-template-columns:minmax(6.5rem,9rem) 1fr minmax(6rem,auto);gap:1rem;align-items:center;font-size:.9rem;color:var(--muted);font-variant-numeric:tabular-nums}
.track{display:block;height:12px;background:var(--surface);border-radius:0 4px 4px 0}
.bar{display:block;height:100%;background:var(--text);border-radius:0 4px 4px 0}
.val{text-align:right;color:var(--text)}
.dim{color:var(--muted)}
.wrap{overflow-x:auto;margin-top:1.5rem}
table{width:100%;min-width:560px;border-collapse:collapse;font-size:1rem;background:var(--surface);border:1px solid var(--hair2);border-radius:12px;overflow:hidden}
th,td{text-align:left;vertical-align:top;padding:1rem 1.2rem;border-bottom:1px solid var(--hair)}
thead th{font:700 .8rem/1.4 var(--display);letter-spacing:.07em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--hair2)}
tbody tr:last-child th,tbody tr:last-child td{border-bottom:none}
tbody th[scope=row]{font-weight:600}
td{color:var(--muted)}
th.num,td.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.compact th,.compact td{padding:.5rem 1rem;font-size:.9rem}
.compact thead th{font-size:.7rem;letter-spacing:.05em}
tbody th[scope=row]{overflow-wrap:anywhere}
/* A table cell ignores max-width in auto layout, so the ellipsis lives on a block inside it: a 2,000px address then caps at 22rem instead of widening the page (hsbc.com, 2026-09-01). */
table.sortable tbody th[scope=row] .rh{display:block;position:relative;max-width:22rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* position:relative on the clipped blocks: the link's visually-hidden "(opens in a new tab)" is absolutely positioned, and without a positioned ancestor its static position 2,000px out escaped the clip and gave the whole page a horizontal scroll. */
table.sortable tbody th[scope=row] a{white-space:nowrap}
.rule{font-family:var(--mono);font-size:.9rem;font-weight:400}
th .dot{margin-right:.5rem}
th .dot + .rule{display:inline}
th .rule + .help{margin-left:calc(8px + .5rem)}
.help{display:block;font-weight:400;color:var(--muted);font-size:.9rem}
/* Disclosures in the extension's group-row grammar: a hairlined row, the
   count as a tinted tile at the start, a chevron drawn from two borders at
   the end, the row squaring off and seaming when open. */
details.group{margin-top:1.2rem;border-top:1px solid var(--hair);border-bottom:1px solid var(--hair)}
details.group>summary{display:flex;align-items:center;gap:12px;padding:8px 12px 8px 8px;list-style:none;cursor:pointer;color:var(--text);border-radius:12px;min-width:0}
details.group>summary::-webkit-details-marker{display:none}
details.group>summary:hover{background:var(--surface)}
details.group[open]>summary{border-radius:0;border-bottom:1px solid var(--hair)}
details.group[open]>summary:hover{background:var(--bg)}
details.group>summary::after{content:'';flex:none;width:6px;height:6px;margin:-2px 6px 0 auto;border-right:1.5px solid var(--muted);border-bottom:1.5px solid var(--muted);transform:rotate(45deg);transform-origin:66% 66%;transition:transform .18s ease}
details.group[open]>summary::after{transform:rotate(225deg)}
@media (prefers-reduced-motion:reduce){details.group>summary::after{transition:none}}
.count-tile{flex:none;min-width:32px;height:32px;padding:0 8px;display:inline-flex;align-items:center;justify-content:center;border-radius:10px;font-size:.85rem;font-weight:640;font-variant-numeric:tabular-nums;box-shadow:inset 0 0 0 1px color-mix(in srgb,currentColor 18%,transparent)}
.count-tile.impact-good{background:var(--sev-good-bg);color:var(--sev-good-fg)}.count-tile.impact-moderate{background:var(--sev-moderate-bg);color:var(--sev-moderate-fg)}.count-tile.impact-review{background:var(--sev-review-bg);color:var(--sev-review-fg)}.count-tile.impact-minor{background:var(--sev-minor-bg);color:var(--sev-minor-fg)}
details.group>summary .group-main{min-width:0;position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
details.group>.wrap{margin-top:0;padding:.5rem 0 1rem}
details{margin-top:1.2rem}
summary{cursor:pointer;color:var(--text);padding:.3rem 0}
.sample{display:block;margin-top:.5rem}
.sample:first-child{margin-top:0}
.sample code{font-family:var(--mono);font-size:.8rem;color:var(--text);word-break:break-all}
/* Severity: the extension's palette and its donut, verbatim. */
.dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--muted);vertical-align:middle;margin-right:.5rem;flex:none}
.impact-critical .dot,.dot.impact-critical{background:var(--sev-critical-vivid)}.impact-serious .dot,.dot.impact-serious{background:var(--sev-serious-vivid)}.impact-moderate .dot,.dot.impact-moderate{background:var(--sev-moderate-vivid)}.impact-minor .dot,.dot.impact-minor{background:var(--sev-minor-vivid)}.impact-review .dot,.dot.impact-review{background:var(--sev-review-vivid)}.impact-good .dot,.dot.impact-good{background:var(--sev-good-vivid)}
.viz{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:2rem clamp(2rem,6vw,5rem);max-width:calc(var(--measure) + 2*var(--gutter));margin:clamp(2.4rem,5vh,3.6rem) auto 0;padding:.5rem var(--gutter) 0;box-sizing:border-box}
.impact-donut{width:clamp(180px,24vw,260px);height:auto}
@media (max-width:720px){.viz{grid-template-columns:1fr;justify-items:center}.impact-donut{width:min(65vw,280px)}}
.impact-donut .seg-critical{fill:var(--sev-critical-vivid)}.impact-donut .seg-serious{fill:var(--sev-serious-vivid)}.impact-donut .seg-moderate{fill:var(--sev-moderate-vivid)}.impact-donut .seg-minor{fill:var(--sev-minor-vivid)}
.impact-donut .donut-total{fill:var(--text);font-family:var(--display);font-size:20px;font-weight:640;letter-spacing:-.03em;text-anchor:middle;dominant-baseline:central}
.impact-donut .donut-caption{fill:var(--muted);font-size:7.5px;letter-spacing:.08em;text-transform:uppercase;text-anchor:middle}
.impact-summary{list-style:none;margin:0;padding:0;display:grid;gap:.7rem;width:100%}
.impact-summary li{display:grid;grid-template-columns:10px 8rem 1fr auto;align-items:center;gap:.9rem;font-size:1.15rem;color:var(--text);font-variant-numeric:tabular-nums}
.impact-summary .dot{width:10px;height:10px}
.impact-summary .dot{margin:0}
.impact-summary .review-row{margin-top:.4rem;padding-top:.9rem;border-top:1px solid var(--hair)}
/* Phone width: the legend keeps each share on one line and lets the
 * label column shrink; this block must follow the base rules to win. */
@media (max-width:720px){.impact-summary li{grid-template-columns:10px auto 1fr auto;font-size:1rem;gap:.6rem}.impact-summary .share{white-space:nowrap;font-size:.85rem}.impact-summary .pill-count{font-size:.9rem;white-space:nowrap}}
.impact-summary .share{color:var(--muted)}
.pill-count{min-width:3rem;text-align:center;padding:0 12px;border-radius:8px;font-size:1rem;line-height:28px;font-weight:600}
.impact-critical .pill-count,.pill-count.impact-critical{background:var(--sev-critical-bg);color:var(--sev-critical-fg)}.impact-serious .pill-count,.pill-count.impact-serious{background:var(--sev-serious-bg);color:var(--sev-serious-fg)}.impact-moderate .pill-count,.pill-count.impact-moderate{background:var(--sev-moderate-bg);color:var(--sev-moderate-fg)}.impact-minor .pill-count,.pill-count.impact-minor{background:var(--sev-minor-bg);color:var(--sev-minor-fg)}.impact-review .pill-count,.pill-count.impact-review{background:var(--sev-review-bg);color:var(--sev-review-fg)}.impact-good .pill-count,.pill-count.impact-good{background:var(--sev-good-bg);color:var(--sev-good-fg)}
td .pill-count{font-size:.85rem;line-height:22px;padding:0 8px;min-width:2.4rem}
th.nw{white-space:nowrap}
td.rank-dot{white-space:nowrap}
td.rank-dot .dot{margin:0 .5rem 0 0}
.nsfw{color:var(--muted)}
.ext-icon{display:inline-block;width:.78em;height:.78em;margin-left:.28em;vertical-align:.05em}
.ext-tail{white-space:nowrap}
.visually-hidden{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.badge{display:inline-block;margin-left:.4rem;padding:0 .4rem;border-radius:4px;font:700 .65rem/1.5 var(--display);letter-spacing:.08em;vertical-align:middle;background:var(--sev-critical-bg);color:var(--sev-critical-fg);cursor:default}
th .sort{all:unset;cursor:pointer;font:inherit;color:inherit;letter-spacing:inherit;text-transform:inherit;padding:.2rem 0;white-space:nowrap}
th .sort:focus-visible{outline:2px solid var(--text);outline-offset:3px}
th .sort-icon{width:1em;height:1em;margin-left:.3em;vertical-align:-.15em;color:var(--muted);opacity:.6}
th .sort-icon g{display:none}
th[aria-sort=none] .sort-icon .i-none,th[aria-sort=ascending] .sort-icon .i-asc,th[aria-sort=descending] .sort-icon .i-desc{display:inline}
th[aria-sort=ascending] .sort-icon,th[aria-sort=descending] .sort-icon,th .sort:hover .sort-icon{color:var(--text);opacity:1}
footer{max-width:calc(var(--measure) + 2*var(--gutter));margin:clamp(4.5rem,9vh,7rem) auto 0;padding:1.5rem var(--gutter) 3rem;border-top:1px solid var(--hair);color:var(--muted);font-size:.9rem}
@media (max-width:720px){.stats{grid-template-columns:1fr}}
/* Print: paper tokens, no interactive chrome; a script opens every
 * disclosure before printing so nothing folded is lost. Backgrounds are
 * forced with print-color-adjust, since browsers strip them by default
 * and the bars, pills and tiles are drawn with backgrounds. */
@media print{
@page{margin:14mm}
:root{--bg:#fff;--text:#000;--muted:#444;--surface:#eee;--hair:#bbb;--hair2:#bbb;--sev-critical-bg:#eee;--sev-serious-bg:#eee;--sev-moderate-bg:#eee;--sev-minor-bg:#eee;--sev-review-bg:#eee;--sev-good-bg:#eee;--sev-critical-fg:#000;--sev-serious-fg:#000;--sev-moderate-fg:#000;--sev-minor-fg:#444;--sev-review-fg:#000;--sev-good-fg:#000;--gutter:.25rem}
*{-webkit-print-color-adjust:exact;print-color-adjust:exact}
html{color-scheme:light;background:#fff}
body{background:#fff;color:#000}
.top{position:static;background:#fff}
.top nav,.menu-toggle,.get-pour,.sort-icon,.skip,.player,.consent-banner,.consent-reopen{display:none}
.ext-tail svg{display:none}
.table-wrap{overflow:visible}
table{font-size:.66rem}
th,td{padding:.4rem .35rem}
table.sortable tbody th[scope=row] .rh{max-width:none;white-space:normal}
a{color:#000}
h2{break-after:avoid}
tr,li,.ministat,.stat,.viz,.promo{break-inside:avoid}
thead{display:table-header-group}
details.group>summary{list-style:none}
details.group>summary::-webkit-details-marker{display:none}
}
`;
var EXT_ICON = '<svg class="ext-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>';
function decorateExternalLinks(html) {
  return html.replace(/<a href="([^"]*)" rel="external">([^<]*)<\/a>/g, (m, href, text) => {
    const match = /^(.*?)(\S+)\s*$/s.exec(text);
    const head = match ? match[1] : "";
    const last = match ? match[2] : text;
    return `<a href="${href}" rel="external noopener" target="_blank">${head}<span class="ext-tail">${last}${EXT_ICON}<span class="visually-hidden"> (opens in a new tab)</span></span></a>`;
  });
}
function shell({ title, description, eyebrow, heading, lede, nav, stats, viz = "", body, generated, share = null, footnote = null, indexable = false, engine = null }) {
  lede = decorateExternalLinks(lede);
  body = decorateExternalLinks(body);
  const shareTags = share ? `
  <meta property="og:title" content="${escapeHtml(share.title ?? title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(share.url)}" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="${escapeHtml(share.image)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escapeHtml(share.imageAlt)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@A11y_pour" />
  <meta name="twitter:title" content="${escapeHtml(share.title ?? title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(share.image)}" />
  <meta name="twitter:image:alt" content="${escapeHtml(share.imageAlt)}" />` : "";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  ${indexable ? "" : '<meta name="robots" content="noindex, nofollow" />'}
  <meta name="theme-color" content="#08090A" />${shareTags}
  <!-- Google tag (gtag.js) behind Consent Mode v2, the same wiring as the
       main site: all storage denied until the visitor accepts via the cookie
       banner at the bottom of this page, the stored yes shared with pour.dev
       (one key, one choice for the whole origin). Loaded ONLY on the
       production host, so local re-renders send nothing to GA. -->
  <script>
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(){dataLayer.push(arguments);};
    if (location.hostname === 'pour.dev' || location.hostname === 'www.pour.dev') {
      gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied'
      });
      try {
        if (localStorage.getItem('pour-consent') === 'granted') {
          gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'granted',
            ad_user_data: 'granted'
          });
        }
      } catch (e) {}
      gtag('js', new Date());
      gtag('config', 'G-KTV9CHEXZG', { cookie_expires: 31536000 });
      gtag('config', 'AW-8448093095');
      var gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-KTV9CHEXZG';
      document.head.appendChild(gtagScript);
    }
  </script>
  <style>${CSS2}</style>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="top">
    <a class="wordmark" href="#top" aria-label="Back to the top"><svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true" focusable="false"><rect x="2" y="2" width="10.5" height="10.5"/><rect x="19.5" y="2" width="10.5" height="10.5"/><rect x="2" y="19.5" width="10.5" height="10.5"/><rect x="19.5" y="19.5" width="10.5" height="10.5"/></svg><span>pour</span></a>
    <nav aria-label="Sections" id="menu"><ul class="menu"><li><a href="#top">Overview</a></li>${nav.map((s) => `<li><a href="#${s.id}">${escapeHtml(s.label)}</a></li>`).join("")}</ul></nav>
    <a class="get-pour" href="https://pour.dev">Get pour Tools</a>
    <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="menu">
      <svg class="icon-menu" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
      <svg class="icon-close" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      <span class="menu-word">Menu</span>
    </button>
  </header>
  <main id="main">
    <section class="docs intro" aria-labelledby="title">
      <p class="eyebrow">${eyebrow}</p>
      <h1 id="title">${heading}</h1>
      <p class="lede">${lede}</p>
    </section>
    <div class="player-slot"><div class="player" hidden>
      <button type="button" class="pp" aria-label="Listen to this report">
        <svg class="i-play" viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z"/></svg>
        <svg class="i-pause" viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" focusable="false" hidden><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
      </button>
      <span class="counter" aria-hidden="true" hidden></span>
      <span class="now" aria-live="off">Listen to this report</span>
      <button type="button" class="icon-btn back-btn" aria-label="Back one part" title="Back one part" hidden><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M19 5v14l-9-7zM5 5h3v14H5z"/></svg></button>
      <button type="button" class="icon-btn skip-btn" aria-label="Skip one part" title="Skip one part" hidden><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M5 5v14l9-7zM16 5h3v14h-3z"/></svg></button>
      <button type="button" class="icon-btn follow-btn" aria-label="Follow the reading" title="Follow the reading" aria-pressed="false" hidden><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg></button>
      <span class="pop-wrap">
        <button type="button" class="icon-btn vol-btn" aria-label="Volume" title="Volume" aria-expanded="false" aria-controls="vol-pop" hidden>
          <svg class="v-hi" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 8a5.5 5.5 0 0 1 0 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <svg class="v-lo" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false" hidden><path d="M3 9v6h4l5 5V4L7 9H3z"/></svg>
        </button>
        <span class="pop vol-pop" id="vol-pop" hidden>
          <button type="button" data-vol="1">Full</button>
          <button type="button" data-vol="0.5">Half</button>
        </span>
      </span>
      <span class="pop-wrap">
        <button type="button" class="rate-btn" aria-label="Reading speed" title="Reading speed" aria-expanded="false" aria-controls="rate-pop" hidden>1.5&times;</button>
        <span class="pop rate-pop" id="rate-pop" hidden>
          <button type="button" data-rate="1">1&times;</button>
          <button type="button" data-rate="1.25">1.25&times;</button>
          <button type="button" data-rate="1.5">1.5&times;</button>
          <button type="button" data-rate="2">2&times;</button>
        </span>
      </span>
      <span class="track-line" hidden><span class="played"></span></span>
    </div></div>
    <div class="stats" role="group" aria-label="The headline numbers">${stats.map(([value, label2]) => `<p class="stat"><strong>${value}</strong>${label2}</p>`).join("")}</div>
${viz}
${body}
  </main>
  <aside class="consent-banner" id="consent-banner" role="region" aria-label="Cookie consent" hidden>
    <p class="consent-copy">
      <strong>Cookies, only if you say so.</strong>
      This site uses Google Analytics to count visits and learn which sections
      help, and Google Ads conversion measurement to learn which store clicks
      came from an ad. Nothing is stored or sent for either unless you accept,
      and declining changes nothing about how the site works. If you accept,
      the cookie lasts a year.
    </p>
    <div class="consent-actions">
      <button type="button" class="btn consent-btn" id="consent-accept">Accept analytics</button>
      <button type="button" class="btn ghost consent-btn" id="consent-decline">Decline</button>
    </div>
  </aside>
  <footer>${footnote ? `${footnote}<br>` : ""}${engine ? `run with ${escapeHtml(engine.name)} ${escapeHtml(engine.version)}` : "pour engine"} \xB7 <a href="https://pour.dev">pour.dev</a> \xB7 generated ${escapeHtml(longDate(generated))} \xB7 <button type="button" class="consent-reopen" id="consent-reopen">Cookie choices</button></footer>
  <script>
  (function () {
    var KEY = 'pour-consent';
    var banner = document.getElementById('consent-banner');
    var accept = document.getElementById('consent-accept');
    var decline = document.getElementById('consent-decline');
    var reopen = document.getElementById('consent-reopen');
    // Off pour.dev (a report opened from disk, a dev server) there is no
    // analytics tag, so there is nothing to consent to: the banner and the
    // footer's Cookie choices go, separator included (David, 2026-09-01).
    if (location.hostname !== 'pour.dev' && location.hostname !== 'www.pour.dev') {
      banner.remove();
      if (reopen) { var sep = reopen.previousSibling; if (sep && sep.nodeType === 3) sep.textContent = sep.textContent.trimEnd().replace(/\xB7$/, '').trimEnd(); reopen.remove(); }
      return;
    }
    function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
    function apply(value) {
      try { localStorage.setItem(KEY, value); } catch (e) { /* private mode: the choice applies for this visit */ }
      if (typeof window.gtag === 'function') {
        var state = value === 'granted' ? 'granted' : 'denied';
        window.gtag('consent', 'update', { analytics_storage: state, ad_storage: state, ad_user_data: state });
      }
      banner.hidden = true;
    }
    if (!stored()) banner.hidden = false;
    accept.addEventListener('click', function () { apply('granted'); });
    decline.addEventListener('click', function () { apply('denied'); });
    if (reopen) reopen.addEventListener('click', function () { banner.hidden = false; accept.focus(); });
    // SC 2.4.11 Focus Not Obscured: the banner is an opaque fixed panel, so
    // focus landing at that height gets nudged clear, the same correction
    // the main site carries after its own audit caught the failure.
    document.addEventListener('focusin', function (event) {
      if (banner.hidden || banner.contains(event.target)) return;
      var t = event.target.getBoundingClientRect();
      if (!t.width && !t.height) return;
      var p = banner.getBoundingClientRect();
      var overlap = t.bottom - p.top;
      if (overlap <= 0 || t.top >= p.bottom) return;
      window.scrollBy({ top: overlap + 12, behavior: 'auto' });
    });
  }());
  </script>
  <script>
  // The section menu collapses behind a hamburger on small screens; it
  // overlays the content, closes on a chosen section or Escape, and the
  // button carries the state for assistive technology.
  (function () {
    var toggle = document.querySelector('.menu-toggle'), menu = document.getElementById('menu');
    if (toggle && menu) {
      var setOpen = function (open) { menu.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); };
      toggle.addEventListener('click', function () { setOpen(!menu.classList.contains('open')); });
      menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    }
  })();
  // The report reads itself aloud with the Speech Synthesis API, one
  // utterance at a time with the current one held in a variable, since
  // Chrome garbage-collects unreferenced queued utterances and the voice
  // dies partway. The pill is a small player: play doubles as pause; the
  // clock is an estimate from characters and speed, since speech has no
  // real duration; the title names the section being read; back and skip
  // move a section; volume cycles full, half, muted; the speed button
  // cycles the rate; the track seeks; and the pill docks under the header
  // while reading once it scrolls away.
  (function () {
    var player = document.querySelector('.player');
    if (!player || !('speechSynthesis' in window)) return;
    player.hidden = false;
    var slot = player.parentNode;
    var pp = player.querySelector('.pp');
    var backBtn = player.querySelector('.back-btn');
    var skipBtn = player.querySelector('.skip-btn');
    var followBtn = player.querySelector('.follow-btn');
    var volBtn = player.querySelector('.vol-btn');
    var rateBtn = player.querySelector('.rate-btn');
    var counter = player.querySelector('.counter');
    var now = player.querySelector('.now');
    var track = player.querySelector('.track-line');
    var played = player.querySelector('.played');
    var iconPlay = pp.querySelector('.i-play');
    var iconPause = pp.querySelector('.i-pause');
    var RATES = [1, 1.25, 1.5, 2];
    var VOLS = [{ v: 1, name: 'full', icon: '.v-hi' }, { v: 0.5, name: 'half', icon: '.v-lo' }];
    var speaking = false, paused = false, idx = 0, parts = [], current = null;
    var follow = false;
    var retriedAt = -1;
    // Voices differ per browser and OS (Edge ships Natural voices, macOS
    // has Enhanced ones, Chrome offers Google voices); pick the best one
    // matching the page language, and fall back to the platform default.
    // getVoices() fills in asynchronously, hence the voiceschanged listener.
    var voice = null;
    function pickVoice() {
      var voices = speechSynthesis.getVoices();
      if (!voices.length) return;
      var lang = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
      var score = function (v) {
        if (!v.lang || v.lang.slice(0, 2).toLowerCase() !== lang) return -1;
        var n = v.name.toLowerCase();
        var sc = 0;
        if (n.indexOf('natural') !== -1) sc += 9; // decisively above any local+default tally, so Edge's Natural voices always win
        if (/\\b(ava|emma|aria|jenny|sonia|libby|michelle)\\b/.test(n)) sc += 1; // among equals, prefer the female voices (backslashes doubled: this lives in a template literal)
        if (n.indexOf('premium') !== -1 || n.indexOf('enhanced') !== -1) sc += 6; // above Samantha's 5+2, so a downloaded premium voice always wins
        if (n.indexOf('samantha') !== -1) sc += 5; // preferred over Daniel
        if (n.indexOf('daniel') !== -1) sc += 3;
        // Local voices are reliable everywhere; Chrome's network-backed
        // Google voices fail silently with chained utterances, so they
        // earn nothing and local service is worth real points.
        if (v.localService) sc += 2;
        if (v.default) sc += 1;
        return sc;
      };
      var best = voices.slice().sort(function (a, b) { return score(b) - score(a); })[0];
      voice = best && score(best) >= 0 ? best : null;
    }
    pickVoice();
    speechSynthesis.addEventListener('voiceschanged', pickVoice);
    // Apple's speech engine reads noticeably faster at the same nominal
    // rate, so Safari and iOS start at 1.25 where others start at 1.5.
    var apple = /iphone|ipad|ipod/i.test(navigator.userAgent) || (/safari/i.test(navigator.userAgent) && !/chrome|chromium|crios|edg/i.test(navigator.userAgent));
    var rateIdx = apple ? 1 : 2, volIdx = 0, curChar = 0;
    function texts() {
      var say = function (el) {
        var c = el.cloneNode(true);
        c.querySelectorAll('.visually-hidden').forEach(function (n) { n.remove(); });
        return c.textContent.replace(/\\s+/g, ' ').trim();
      };
      var stat = function (el) {
        var c = el.cloneNode(true);
        var strong = c.querySelector('strong');
        if (!strong) return say(c);
        var figure = strong.textContent.trim();
        strong.remove();
        return figure + ', ' + say(c);
      };
      var out = [];
      var h1 = document.querySelector('h1'); if (h1) out.push({ t: say(h1), where: 'Overview', id: 'top', first: true, el: h1 });
      var lede = document.querySelector('.lede'); if (lede) out.push({ t: say(lede), where: 'Overview', id: 'top', el: lede });
      document.querySelectorAll('.stat').forEach(function (el) { out.push({ t: stat(el), where: 'Overview', id: 'top', el: el }); });
      // The donut's own total first, its compact figure expanded to words,
      // then the legend, each row as a sentence: the dot and pill glue
      // their text together, so the pieces are read separately.
      var donutTotal = document.querySelector('.impact-donut .donut-total');
      if (donutTotal) {
        var figure = donutTotal.textContent.trim().replace('M', ' million').replace('K', ' thousand');
        var caption = document.querySelector('.impact-donut .donut-caption');
        out.push({ t: figure + ' ' + (caption ? caption.textContent.trim().toLowerCase() : 'elements') + ' in all.', where: 'Overview', id: 'top', el: document.querySelector('.impact-donut') });
      }
      document.querySelectorAll('.viz .impact-summary li').forEach(function (li) {
        var share = li.querySelector('.share');
        var pill = li.querySelector('.pill-count');
        var c = li.cloneNode(true);
        c.querySelectorAll('.dot, .share, .pill-count').forEach(function (n) { n.remove(); });
        var bits = [say(c)];
        if (share) bits.push(say(share));
        if (pill) bits.push(/^[0-9,]+$/.test(pill.textContent.trim()) ? say(pill) + ' elements' : say(pill));
        out.push({ t: bits.join(', ') + '.', where: 'Overview', id: 'top', el: li });
      });
      document.querySelectorAll('section.docs:not(.intro)').forEach(function (sec) {
        var h2 = sec.querySelector('h2');
        var where = h2 ? say(h2) : 'Overview';
        if (h2) out.push({ t: where + '.', where: where, id: sec.id, first: true, el: h2 });
        // Everything visible, in document order: ministats, paragraphs and
        // notes, bar-list rows (label, count, share), the who-list entries,
        // fold summaries (label, count, folded), open tables row by row,
        // and the closing button. Folded content stays silent until opened.
        var clean = function (t) { return t.replace(/[\u21C5\u2191\u2193]/g, '').trim(); };
        sec.querySelectorAll('summary, .ministat, p, .bars li, .who li, table, .promo-links a').forEach(function (el) {
          if (el.tagName === 'SUMMARY') {
            var open = el.parentElement.open;
            var tile = el.querySelector('.count-tile');
            var main = el.querySelector('.group-main');
            out.push({ t: (main ? say(main) : say(el)) + (tile ? ', ' + say(tile) + (open ? ' entries:' : ' entries, folded.') : '.'), where: where, id: sec.id, el: el });
            return;
          }
          var fold = el.closest('details');
          if ((fold && !fold.open) || el.classList.contains('bars-head')) return;
          if (el.tagName === 'A') { out.push({ t: say(el) + '.', where: where, id: sec.id, el: el }); return; }
          if (el.tagName === 'LI') {
            if (!el.parentElement.classList.contains('bars')) { out.push({ t: stat(el), where: where, id: sec.id, el: el }); return; }
            var lbl = el.querySelector('span');
            var val = el.querySelector('.val');
            if (lbl && val) out.push({ t: say(lbl) + ', ' + say(val).replace(' (', ', ').replace(')', '') + '.', where: where, id: sec.id, el: el });
            return;
          }
          if (el.tagName === 'TABLE') {
            var heads = [];
            el.querySelectorAll('thead th').forEach(function (h) { heads.push(clean(say(h))); });
            var trs = el.querySelectorAll('tbody tr');
            var cap = 10;
            trs.forEach(function (tr, i) {
              if (i >= cap) return;
              var bits = [];
              for (var k = 0; k < tr.children.length; k += 1) {
                var v = clean(say(tr.children[k]));
                if (!v) continue;
                bits.push(bits.length === 0 ? v : (heads[k] ? heads[k] + ', ' + v : v));
              }
              if (bits.length) out.push({ t: bits.join('; ') + '.', where: where, id: sec.id, el: tr });
            });
            if (trs.length > cap) out.push({ t: (trs.length - cap) + ' more rows are in the table.', where: where, id: sec.id, el: el });
            return;
          }
          out.push({ t: el.classList.contains('ministat') ? stat(el) : say(el), where: where, id: sec.id, el: el });
        });
      });
      return out.filter(function (x) { return x.t; });
    }
    function paint() {
      counter.textContent = idx + ' / ' + parts.length;
      played.style.width = parts.length ? (100 * idx / parts.length).toFixed(1) + '%' : '0';
    }
    function ui() {
      var on = speaking;
      counter.hidden = !on; backBtn.hidden = !on; skipBtn.hidden = !on; followBtn.hidden = !on; volBtn.hidden = !on; rateBtn.hidden = !on; track.hidden = !on;
      // CSS sticky docks the pill under the header; the class only marks
      // the reading state so the idle button never floats over the page.
      slot.classList.toggle('reading', on);
      // toggleAttribute, not .hidden: SVG elements have no hidden property,
      // so the assignment would be an inert expando and the icon never flips.
      iconPlay.toggleAttribute('hidden', on && !paused);
      iconPause.toggleAttribute('hidden', !on || paused);
      var ppName = !on ? 'Listen to this report' : paused ? 'Resume' : 'Pause';
      pp.setAttribute('aria-label', ppName);
      pp.setAttribute('title', ppName);
      if (!on) { now.textContent = 'Listen to this report'; }
    }
    function stop() {
      speaking = false; paused = false; current = null;
      speechSynthesis.cancel();
      dropLock();
      readMark.hidden = true; markEl = null;
      if (typeof closePops === 'function') closePops();
      ui();
    }
    // The section name in the pill is a link to that section.
    function show(part) {
      now.innerHTML = '';
      var a = document.createElement('a');
      a.href = '#' + (part.id || 'top');
      a.textContent = part.where;
      now.appendChild(a);
      paint();
    }
    function speakPart(offset) {
      var part = parts[idx - 1];
      current = new SpeechSynthesisUtterance(offset ? part.t.slice(offset) : part.t);
      current.rate = RATES[rateIdx];
      current.volume = VOLS[volIdx].v;
      if (voice) { current.voice = voice; current.lang = voice.lang; }
      current.onboundary = function (e) { if (typeof e.charIndex === 'number') { curChar = offset + e.charIndex; } };
      // Watchdog: if the chosen voice never starts, drop to the platform
      // default and retry, armed for a network voice only, and only once,
      // because a LOCAL engine's cold start can take longer than the
      // window, and cancelling it restarts the init: a silence loop.
      if (voice && !voice.localService) {
        var u = current;
        var startedAt = false;
        u.onstart = function () { startedAt = true; };
        setTimeout(function () {
          if (current === u && speaking && !paused && !startedAt) {
            voice = null;
            speechSynthesis.cancel();
            speechSynthesis.resume();
            speakPart(offset);
          }
        }, 3000);
      }
      current.onend = function () { curChar = part.t.length; if (speaking && !paused) next(); };
      // One utterance failing must not kill the reading: a network voice
      // (Edge's Naturals) can hiccup on a single part. Retry that part
      // once from the last spoken word, then move past it; only stop when
      // there is nowhere left to go.
      current.onerror = function (e) {
        if (!speaking) return;
        var cur = idx - 1;
        if (retriedAt !== cur) { retriedAt = cur; startAt(cur); }
        else if (cur + 1 < parts.length) { startAt(cur + 1); }
        else stop();
      };
      speechSynthesis.speak(current);
      speechSynthesis.resume(); // Chrome again: a stuck pause otherwise swallows the utterance silently
    }
    function next() {
      if (!speaking || idx >= parts.length) { stop(); return; }
      var part = parts[idx];
      idx += 1; curChar = 0;
      show(part);
      // Follow mode brings each part to the centre as it starts reading,
      // and the voice chip sits beside whatever is being read.
      if (follow && part.el && typeof part.el.scrollIntoView === 'function') {
        part.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        placeMark(part.el);
      }
      speakPart(0);
    }
    // A volume or speed change picks up from the last spoken word, not the
    // start of the passage: the boundary events keep curChar at word edges.
    function reSpeak() {
      if (!speaking || idx === 0) return;
      if (current) { current.onend = null; current.onerror = null; current.onboundary = null; }
      var from = Math.min(curChar, parts[idx - 1].t.length - 1);
      speechSynthesis.cancel(); speechSynthesis.resume();
      setTimeout(function () { speakPart(Math.max(0, from)); }, 60);
    }
    function startAt(i) {
      if (current) { current.onend = null; current.onerror = null; current.onboundary = null; }
      idx = Math.max(0, Math.min(parts.length - 1, i));
      curChar = 0; paused = false;
      speechSynthesis.cancel(); speechSynthesis.resume();
      ui();
      setTimeout(next, 60);
    }
    function begin() {
      parts = texts(); idx = 0; curChar = 0; retriedAt = -1;
      speaking = true; paused = false;
      grabLock();
      speechSynthesis.cancel();
      speechSynthesis.resume(); // unstick Chrome's lingering paused state, which silences every speak()
      ui(); next();
    }
    // The whole idle pill starts the reading, not just the round button.
    player.addEventListener('click', function (e) { if (!speaking && !e.target.closest('button')) begin(); });
    // iOS stops speech the moment the screen dims; a wake lock keeps the
    // display on while reading, released on pause and stop, retaken when
    // the tab becomes visible again mid-read.
    var lock = null;
    function grabLock() {
      if (!navigator.wakeLock || !speaking || paused) return;
      navigator.wakeLock.request('screen').then(function (l) { lock = l; }).catch(function () {});
    }
    function dropLock() {
      if (lock) { lock.release().catch(function () {}); lock = null; }
    }
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') grabLock(); });
    pp.addEventListener('click', function () {
      if (!speaking) begin();
      else if (paused) { paused = false; speechSynthesis.resume(); grabLock(); ui(); }
      else { paused = true; speechSynthesis.pause(); dropLock(); ui(); }
    });
    // The site's own attention idiom marks what is being read while
    // follow is on: three pixels of solid accent along the element's left
    // edge, an editor's current-line gutter, tracked every frame so
    // scrolling and reflow never strand it. It never touches a glyph.
    var readMark = document.createElement('span');
    readMark.className = 'read-outline';
    readMark.hidden = true;
    readMark.setAttribute('aria-hidden', 'true');
    document.body.appendChild(readMark);
    var markEl = null;
    function trackMark() {
      if (!follow || !speaking || !markEl) { readMark.hidden = true; return; }
      var r = markEl.getBoundingClientRect();
      readMark.style.left = Math.max(4, r.left - 14) + 'px';
      readMark.style.top = r.top + 'px';
      readMark.style.height = r.height + 'px';
      readMark.hidden = false;
      requestAnimationFrame(trackMark);
    }
    function placeMark(el) {
      var was = markEl;
      markEl = el;
      if (!was) trackMark();
    }
    // Opening or closing a fold while reading rebuilds the parts list on
    // the spot, so the newly revealed content gets read when reached; the
    // current position is kept by matching the part being spoken.
    document.addEventListener('toggle', function (e) {
      if (!speaking || !e.target || e.target.tagName !== 'DETAILS') return;
      var curEl = parts[idx - 1] && parts[idx - 1].el;
      var curT = parts[idx - 1] && parts[idx - 1].t;
      parts = texts();
      var j = -1;
      for (var k = 0; k < parts.length; k += 1) { if (parts[k].el === curEl && parts[k].t === curT) { j = k; break; } }
      idx = j >= 0 ? j + 1 : Math.min(idx, parts.length);
      paint();
    }, true);
    followBtn.addEventListener('click', function () {
      follow = !follow;
      followBtn.setAttribute('aria-pressed', String(follow));
      if (!follow) { readMark.hidden = true; markEl = null; }
      if (follow && speaking && parts[idx - 1] && parts[idx - 1].el) {
        parts[idx - 1].el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        placeMark(parts[idx - 1].el);
      }
    });
    // Back and skip move one part at a time, not a whole section.
    backBtn.addEventListener('click', function () {
      if (!speaking) return;
      startAt(idx - 2);
    });
    skipBtn.addEventListener('click', function () {
      if (!speaking) return;
      if (idx >= parts.length) { stop(); return; }
      startAt(idx);
    });
    var volPop = player.querySelector('.vol-pop');
    var ratePop = player.querySelector('.rate-pop');
    function closePops() {
      volPop.hidden = true; ratePop.hidden = true;
      volBtn.setAttribute('aria-expanded', 'false'); rateBtn.setAttribute('aria-expanded', 'false');
    }
    function togglePop(pop, btn) {
      var open = pop.hidden;
      closePops();
      pop.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    }
    function mark(pop, attr, value) {
      pop.querySelectorAll('button').forEach(function (o) { o.setAttribute('aria-current', String(o.getAttribute(attr) === value)); });
    }
    mark(volPop, 'data-vol', '1'); mark(ratePop, 'data-rate', String(RATES[rateIdx]));
    rateBtn.innerHTML = RATES[rateIdx] + '&times;';
    volBtn.addEventListener('click', function () { togglePop(volPop, volBtn); });
    rateBtn.addEventListener('click', function () { togglePop(ratePop, rateBtn); });
    volPop.addEventListener('click', function (e) {
      var o = e.target.closest('button'); if (!o) return;
      volIdx = VOLS.findIndex(function (v) { return String(v.v) === o.getAttribute('data-vol'); });
      volBtn.setAttribute('aria-label', 'Volume: ' + VOLS[volIdx].name);
      volBtn.setAttribute('title', 'Volume: ' + VOLS[volIdx].name);
      VOLS.forEach(function (v) { volBtn.querySelector(v.icon).toggleAttribute('hidden', v !== VOLS[volIdx]); });
      mark(volPop, 'data-vol', o.getAttribute('data-vol'));
      closePops();
      if (speaking && !paused) reSpeak();
    });
    ratePop.addEventListener('click', function (e) {
      var o = e.target.closest('button'); if (!o) return;
      rateIdx = RATES.findIndex(function (r) { return String(r) === o.getAttribute('data-rate'); });
      rateBtn.innerHTML = o.getAttribute('data-rate') + '&times;';
      mark(ratePop, 'data-rate', o.getAttribute('data-rate'));
      closePops();
      paint();
      if (speaking && !paused) reSpeak();
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.pop-wrap')) closePops(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePops(); });
    track.addEventListener('click', function (e) {
      if (!speaking) return;
      var r = track.getBoundingClientRect();
      startAt(Math.floor(((e.clientX - r.left) / r.width) * parts.length));
    });
    window.addEventListener('pagehide', function () { speechSynthesis.cancel(); });
  })();
  // Printing opens every disclosure first and restores it after, so a
  // printout carries the folded tables too.
  (function () {
    var opened = [];
    window.addEventListener('beforeprint', function () {
      opened = Array.prototype.filter.call(document.querySelectorAll('details'), function (d) { return !d.open; });
      opened.forEach(function (d) { d.open = true; });
    });
    window.addEventListener('afterprint', function () { opened.forEach(function (d) { d.open = false; }); opened = []; });
  })();
  // Click a column header in a sortable table to sort by it; again to
  // reverse. Numbers sort as numbers (commas and percent signs ignored).
  document.querySelectorAll('table.sortable').forEach(function (table) {
    table.querySelectorAll('th .sort').forEach(function (button) {
      button.addEventListener('click', function () {
        var th = button.parentNode, col = Number(button.dataset.col), numeric = button.dataset.type === 'num';
        var dir = th.getAttribute('aria-sort') === 'descending' ? 'ascending' : 'descending';
        table.querySelectorAll('th[aria-sort]').forEach(function (h) { h.setAttribute('aria-sort', 'none'); });
        th.setAttribute('aria-sort', dir);
        var body = table.tBodies[0], rows = Array.prototype.slice.call(body.rows);
        var value = function (row) { var cell = row.cells[col]; var text = cell ? cell.textContent.trim() : ''; return numeric ? (parseFloat(text.replace(/[^0-9.-]/g, '')) || 0) : text.toLowerCase(); };
        rows.sort(function (a, b) { var x = value(a), y = value(b); var c = x < y ? -1 : x > y ? 1 : 0; return dir === 'ascending' ? c : -c; });
        rows.forEach(function (row) { body.appendChild(row); });
      });
    });
  });
  </script>
</body>
</html>
`;
}
function writePage(slug2, html) {
  const outFile = path4.join(rootDir, "src", "site", "public", "audit", slug2, "index.html");
  fs3.mkdirSync(path4.dirname(outFile), { recursive: true });
  fs3.writeFileSync(outFile, html);
  return outFile;
}

// scripts/report/render.mjs
var HOLD_ROWS = 3e3;
async function render(runDir2, { publicCopy = true } = {}) {
  const status = JSON.parse(fs4.readFileSync(path5.join(runDir2, "status.json"), "utf8"));
  useAdultList(path5.join(rootDir, "reports", "audit", "lists", "adult", "domains"));
  const isSite2 = status.kind === "site";
  const engineName = "the pour engine";
  const engineLead = "The pour engine";
  const engineShort = "the engine";
  const tally2 = createTally();
  const held = /* @__PURE__ */ new Map();
  let total = 0;
  const rl = readline.createInterface({ input: fs4.createReadStream(path5.join(runDir2, "progress.jsonl")), crlfDelay: Infinity });
  const latest = /* @__PURE__ */ new Map();
  const retried = /* @__PURE__ */ new Map();
  let recovered2 = 0;
  for await (const line of rl) {
    if (!line.trim()) continue;
    let row;
    try {
      row = JSON.parse(line);
    } catch {
      continue;
    }
    const key = isSite2 ? row.url : row.rank;
    const previous = latest.get(key);
    if (row.rechecked && previous) {
      const was = previous.status === "audited" ? "audited" : previous.reason ?? "skipped";
      retried.set(was, (retried.get(was) ?? 0) + 1);
      if (row.status === "audited" && previous.status !== "audited") recovered2 += 1;
    }
    latest.set(key, row);
  }
  tally2.tagged = !isSite2 && status.total ? Math.max(0, status.total - latest.size) : 0;
  const retriedCount = [...retried.values()].reduce((n, c) => n + c, 0);
  const listed = (parts) => parts.length > 2 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}` : parts.join(" and ");
  const recheckSentence = retriedCount ? `A later pass retried ${int(retriedCount)} ${retriedCount === 1 ? isSite2 ? "address" : "entry" : isSite2 ? "addresses" : "entries"}, ${listed([...retried.entries()].sort((a, b) => b[1] - a[1]).map(([reason, c]) => `${int(c)} that ${REASON_LABEL[reason] ?? reason}`))}; ${recovered2 ? `${int(recovered2)} answered with a page and ${recovered2 === 1 ? "counts" : "count"} as audited.` : "none answered with a page."}` : "";
  for (const row of latest.values()) {
    total += 1;
    add(tally2, row, { host: status.host });
    if (latest.size <= HOLD_ROWS) held.set(isSite2 ? row.url : row.rank, row);
  }
  const s = summarize(tally2, { minGroup: 10 });
  const rows = [...held.values()];
  const summaryFile = path5.join(runDir2, "summary.json");
  fs4.writeFileSync(summaryFile, JSON.stringify({ ...s, recent: void 0, meta: { ...status, summary: void 0, inflight: void 0, backoffs: void 0 } }, null, 2));
  const generated = (/* @__PURE__ */ new Date()).toISOString();
  const runDate = longDate(generated);
  const what = isSite2 ? "pages" : "sites";
  const audited2 = rows.filter((r) => r.status === "audited");
  const skipped2 = rows.filter((r) => r.status !== "audited");
  const partial = !!status.paused;
  let publicPage = false;
  const pathOf = (url) => {
    const u = new URL(url);
    return (u.hostname !== status.host ? u.hostname : "") + (u.pathname || "/") + u.search;
  };
  const nsfwName = (name) => `<span class="nsfw">${escapeHtml(maskDomain(name))}<span class="badge" title="Adult site: the name is withheld and not linked">NSFW</span></span>`;
  const linkless = () => publicPage && status.kind !== "site";
  const pageLink = (r) => isNsfw(r) ? nsfwName(r.domain ?? pathOf(r.url)) : linkless() ? escapeHtml(r.domain ?? pathOf(r.url)) : `<a href="${escapeHtml(r.url ?? `https://${r.domain}/`)}" rel="external">${escapeHtml(r.domain ?? pathOf(r.url))}</a>`;
  const briefLink = (b) => b.nsfw ? nsfwName(b.label) : linkless() ? escapeHtml(b.label) : `<a href="${escapeHtml(b.url)}" rel="external">${escapeHtml(b.label)}</a>`;
  const reasonsText = s.reasons.map(([reason, c]) => `${int(c)} ${REASON_LABEL[reason] ?? reason}`).join("; ");
  function build(isPublic) {
    publicPage = isPublic;
    let intro;
    let extraSections;
    let nav;
    let heading;
    let eyebrow;
    let title;
    let description;
    if (isSite2) {
      heading = `${escapeHtml(status.site)}, page by page.`;
      eyebrow = `Site audit \xB7 ${escapeHtml(runDate)}${partial ? " \xB7 in progress" : ""}`;
      title = `${escapeHtml(status.site)}, audited page by page \xB7 pour`;
      description = `The pour engine over ${int(s.pages)} pages of ${status.site}: how many fail WCAG 2.2 AA, what fails most, and where on each page.`;
      intro = `${engineLead} ran over ${int(s.pages)} pages of <a href="${escapeHtml(status.start)}" rel="external">${escapeHtml(status.site)}</a>,
          following links from the front page${status.sameHost ? "" : " across the site and its subdomains"}. Each page was
          loaded once in a desktop window and checked against WCAG&nbsp;2.2 AA. No scrolling,
          no clicking. The numbers count what the engine could prove; checks that need a person are
          not included.${partial ? " The run is not finished; these are the numbers so far." : ""}`;
      const withFailures = audited2.filter((r) => r.violationElements > 0).sort((a, b) => b.violationElements - a.violationElements);
      nav = [...COMMON_NAV, { id: "sections", label: "By section" }, { id: "breadth", label: "By breadth" }, { id: "ends", label: "Site scores" }, ...rows.length && !publicPage ? [{ id: "every", label: "Every page" }] : [], ...rows.length ? [{ id: "where", label: "Where" }] : [], { id: "method", label: "Method" }, { id: "review", label: "Not sure" }, { id: "limits", label: "Limits" }];
      extraSections = `
      <section class="docs" id="sections" aria-labelledby="sections-title">
        <h2 id="sections-title">By section</h2>
        <p>Pages grouped by the first part of their address${status.sameHost ? "" : ", with the host shown where it is not the main one"}. A section with one page in it is named by that page.</p>
        ${(() => {
        const t = groupTable("Section", s.bySection, "Failures by section of the site");
        return s.bySection.length > 12 ? disclosure(s.bySection.length, `Every section, ${int(s.bySection.length)} rows`, t) : t;
      })()}
      </section>
      ${breadthSection(s, briefLink)}
      ${twoEnds(s, briefLink, "page")}
      ${rows.length && !publicPage ? `
      <section class="docs" id="every" aria-labelledby="every-title">
        <h2 id="every-title">Every page</h2>
        <p>All ${int(audited2.length)} pages and what the engine found on each.</p>
        ${(() => {
        const t = `${table(
          [["Page", false], ["Depth", true], ["Failing", true], ["Rules", true], ["Review", true], ["Elements", true]],
          audited2.sort((a, b) => a.depth - b.depth || a.url.localeCompare(b.url)).map((r) => `<tr><th scope="row">${pageLink(r)}</th>${num(int(r.depth ?? 0))}${num(int(r.violationElements))}${num(int(r.violations.length))}${num(int(r.reviewElements))}${num(int(r.elements))}</tr>`).join(""),
          { compact: true, sortable: true, label: "Every page audited" }
        )}`;
        return audited2.length > 60 ? disclosure(audited2.length, `Every page, ${int(audited2.length)} rows`, t) : t;
      })()}
      </section>
      <section class="docs" id="where" aria-labelledby="where-title">
        <h2 id="where-title">Where, on each page</h2>
        <p>
          Every page with a failure, worst first, with the rules it failed and up to five
          of the failing elements for each.
        </p>
        ${withFailures.map((r) => `<details><summary>${escapeHtml(pathOf(r.url))} <span class="dim">\xB7 ${int(r.violationElements)} failing element${r.violationElements === 1 ? "" : "s"} in ${int(r.violations.length)} rule${r.violations.length === 1 ? "" : "s"}</span></summary>
          <p class="note">${escapeHtml(r.title || "")} \xB7 <a href="${escapeHtml(r.url)}" rel="external">${escapeHtml(r.url)}</a></p>
          ${table(
        [["Rule", false], ["Criterion", false], ["Elements", true], ["Where", false]],
        [...r.violations].sort((a, b) => b.nodes - a.nodes).map((v) => `<tr><th scope="row">${dot(v.impact)}${ruleCell(v.id, v.help)}</th><td>${scsOf(v).map(scLink).join(", ") || "best practice"}</td>${num(int(v.nodes))}<td>${(v.sample ?? []).map((x) => `<span class="sample"><code>${escapeHtml(x.target)}</code><span class="help">${escapeHtml(x.message)}</span></span>`).join("")}${v.nodes > (v.sample?.length ?? 0) ? `<span class="dim">and ${int(v.nodes - (v.sample?.length ?? 0))} more</span>` : ""}</td></tr>`).join(""),
        { compact: true, label: `Failures on ${pathOf(r.url)}` }
      )}
        </details>`).join("")}
      </section>` : ""}
      <section class="docs" id="method" aria-labelledby="method-title">
        <h2 id="method-title">Method</h2>
        <p>
          The crawl started at <a href="${escapeHtml(status.start)}" rel="external">${escapeHtml(status.start)}</a> and followed
          every link to a page on ${status.sameHost ? "the same host" : `${escapeHtml(status.site)} or its subdomains`}, stopping at ${int(status.count)} pages.
          It found ${int(status.discovered ?? 0)} addresses${status.queued ? ` and left ${int(status.queued)} unvisited` : ""}.
          ${status.robots?.fetched ? `The site's robots.txt (${int(status.robots.rules)} rule${status.robots.rules === 1 ? "" : "s"}) was respected.` : "No robots.txt could be read."}
          Links to files were not followed. Tracking parameters were removed so a page was not counted twice.
          Each page was loaded once in headless Chromium at ${status.viewport.width} by ${status.viewport.height} pixels, given
          ${dec(status.settleMs / 1e3, 1)} seconds to settle, then audited: the top document only, no scrolling, no clicking,
          a consent layer accepted where one appeared.
          The engine ran at WCAG&nbsp;2.2 AA, the same as the extension and the command line.
          ${recheckSentence}
        </p>
        ${s.skipped ? `<p>${int(s.skipped)} address${s.skipped === 1 ? " was" : "es were"} found but not audited: ${reasonsText}. A site that shows a bot challenge to a headless browser may not show one to a person; these are kept for a later pass.</p>
        ${skipped2.length ? disclosure(skipped2.length, "The addresses not audited and the reason for each", `${table([["Address", false], ["Why", false]], skipped2.map((r) => `<tr><th scope="row">${escapeHtml(pathOf(r.url))}</th><td>${escapeHtml(r.reason)}${r.detail ? ` <span class="dim">${escapeHtml(r.detail)}</span>` : ""}</td></tr>`).join(""), { compact: true, label: "Addresses not audited and the reason for each" })}`, "minor") : ""}` : ""}
      </section>
      ${reviewSection(s, "pages", engineShort)}
      ${limitsSection("A header on every page counts on every page. Pages behind a login, a search or a form were not reached.")}
      ${promoSection()}`;
    } else {
      const top = status.mode === "top";
      const topLabel = top ? `the top ${int(status.topN ?? status.total)}` : "";
      const crux = status.list?.source === "crux";
      const listName = top ? `${topLabel} on ${crux ? "the Chrome UX Report's list of most visited sites" : "the Tranco ranking"}` : escapeHtml(status.list?.file ?? "the list");
      const tierLabel = (b) => b.tier != null ? `top ${int(b.tier)}` : b.rank != null ? int(b.rank) : "";
      heading = top ? `The pour ${int(status.topN ?? status.total)}.` : `${escapeHtml(status.label)}, audited.`;
      eyebrow = `${top ? `Monthly study \xB7 ${escapeHtml(monthName(status.month))}` : `List audit \xB7 ${escapeHtml(runDate)}`}${partial ? " \xB7 in progress" : ""}`;
      title = top ? `The pour ${int(status.topN ?? status.total)}: the top sites, audited \xB7 ${monthName(status.month)}` : `${status.label}, audited \xB7 pour`;
      description = top ? `The pour engine ran over the top ${int(status.topN ?? status.total)} sites: ${dec(s.failingPct)}% have proven accessibility failures, ${dec(s.meanFailing)} failing elements on the average site.` : `The pour engine over ${int(s.pages)} sites from ${listName}: how many fail WCAG 2.2 AA and what fails most.`;
      const previous = top ? previousMonth(runDir2, status.month) : null;
      const total2 = status.count ?? status.total ?? s.pages;
      intro = `${engineLead} ran over
          ${top ? crux ? `the top ${int(status.topN ?? status.total)} sites on the <a href="https://developer.chrome.com/docs/crux" rel="external">Chrome UX Report</a> list of what people load in Chrome (the ${escapeHtml(monthName(`${status.list.id.slice(0, 4)}-${status.list.id.slice(4)}`))} list)` : `the top ${int(status.topN ?? status.total)} domains on <a href="https://tranco-list.eu/" rel="external">Tranco</a>'s list (${escapeHtml(listMetaDate(status))})` : `${listName} (${int(total2)} entries)`}.
          ${int(s.pages)} sites could be audited; the rest could not be reached, refused the visit, or did not load in time.
          Each site was loaded once in a desktop window and checked against WCAG&nbsp;2.2 AA.
          No scrolling, no clicking, one page per site. The numbers count what the engine could prove;
          checks that need a person are not included.${partial ? ` The run is not finished: ${int(s.pages)} of ${int(status.count ?? status.total)} pages so far.` : ""}
          ${previous ? `Since ${escapeHtml(monthName(previous.month))}: ${delta(previous.failingPct, s.failingPct, "points")} in pages with a failure, ${delta(previous.meanFailing, s.meanFailing, "")} in failing elements per page.` : ""}`;
      nav = [...COMMON_NAV, ...s.byTier.length > 1 ? [{ id: "tiers", label: "By popularity" }] : [], { id: "breadth", label: "By breadth" }, { id: "consent", label: "By consent" }, { id: "groups", label: "By language" }, { id: "ends", label: "Site scores" }, ...rows.length && !publicPage ? [{ id: "every", label: "Every page" }] : [], { id: "months", label: "Month by month" }, { id: "method", label: "Method" }, { id: "review", label: "Not sure" }, { id: "limits", label: "Limits" }];
      extraSections = `${s.byTier.length > 1 ? `
      <section class="docs" id="tiers" aria-labelledby="tiers-title">
        <h2 id="tiers-title">By popularity</h2>
        <p>
          The Chrome UX Report groups sites in tiers: the top 1,000, then the top 5,000, 10,000, 50,000 and 100,000.
          Each row is the sites in that tier and not in a smaller one.
        </p>
        ${miniStats([[dec(s.byTier[0].perPage), `failing elements per site in the ${escapeHtml(s.byTier[0].key)}`], [dec(s.byTier[s.byTier.length - 1].perPage), `in the rest of the ${escapeHtml(s.byTier[s.byTier.length - 1].key)}`]])}
        ${groupTable("Tier", s.byTier, "Failures by popularity tier", what)}
      </section>` : ""}
      ${breadthSection(s, briefLink, what)}
      ${consentSection(s, what)}
      <section class="docs" id="groups" aria-labelledby="groups-title">
        <h2 id="groups-title">By language</h2>
        <p>
          Languages with at least ten pages, each the one the page declares;
          ${int(s.noLang)} pages (${pc(s.pages ? 100 * s.noLang / s.pages : 0)}) declare none.
        </p>
        ${disclosure(s.byLang.length, `${int(s.byLang.length)} languages`, groupTable("Declared language", s.byLang, "Failures by declared language", what))}
      </section>
      ${twoEnds(s, briefLink, "site")}
      ${rows.length && !publicPage ? `
      <section class="docs" id="every" aria-labelledby="every-title">
        <h2 id="every-title">Every page</h2>
        <p>All ${int(audited2.length)} pages in list order and what the engine found on each.</p>
        ${disclosure(audited2.length, `Every page, ${int(audited2.length)} rows`, `${table(
        [["Rank", true], ["Site", false], ["Failing", true], ["Rules", true], ["Review", true], ["Elements", true]],
        audited2.sort((a, b) => a.rank - b.rank).map((r) => `<tr>${num(int(r.rank))}<th scope="row">${pageLink(r)}</th>${num(int(r.violationElements))}${num(int(r.violations.length))}${num(int(r.reviewElements))}${num(int(r.elements))}</tr>`).join(""),
        { compact: true, sortable: true, label: "Every page in the report" }
      )}`)}
      </section>` : ""}
      <section class="docs" id="months" aria-labelledby="months-title">
        <h2 id="months-title">Month by month</h2>
        <p>
          The run repeats monthly on the freshest list. ${allMonths(runDir2).length > 1 ? "The months so far:" : "This is the first month; each run adds a row."}
        </p>
        ${table(
        [["Month", false], ["Sites audited", true], ["With failures", true], ["Failing elements per site", true], ["Median", true]],
        allMonths(runDir2).map((m) => `<tr><th scope="row">${escapeHtml(monthName(m.month))}</th>${num(int(m.pages))}${num(`${dec(m.failingPct)}%`)}${num(dec(m.meanFailing))}${num(int(m.medianFailing))}</tr>`).join(""),
        { label: "The monthly runs" }
      )}
      </section>
      <section class="docs" id="method" aria-labelledby="method-title">
        <h2 id="method-title">Method</h2>
        <p>
          ${top ? crux ? `The list is the Chrome UX Report's ranking of sites for ${escapeHtml(monthName(`${status.list.id.slice(0, 4)}-${status.list.id.slice(4)}`))}, built from what real Chrome users load and published in tiers, taken from the <a href="${escapeHtml(status.list.url)}" rel="external">crux-top-lists</a> mirror. The rank here is the site's place in that list; within a tier the order is the list's own.` : `The list is the Tranco daily list <span class="rule">${escapeHtml(status.list?.id ?? "")}</span> of ${escapeHtml(listMetaDate(status))}, a blend of several traffic rankings.` : `The list is ${listName}, ${int(status.total ?? 0)} entries.`}
          Sites were tried in order. One counts when it answered with an HTML page; a bot-challenge page in place of the site is a skip, not an audit.${status.month === "2026-08" ? " Seven sites that served the same Human Verification challenge page, one element over the placeholder floor, were counted as clean in the rendering of 29 August 2026 and were re-tagged as challenged on 1 September; the figures on this page include that correction." : ""}
          Each site was loaded once in headless Chromium at ${status.viewport.width} by ${status.viewport.height} pixels, given
          ${dec(status.settleMs / 1e3, 0)} seconds to settle, then audited: the top document only, no scrolling, no clicking,
          a consent layer accepted where one covered the page. The engine ran at WCAG&nbsp;2.2 AA, the same as the extension and the command line.
          ${recheckSentence}
        </p>
        <p>
          ${int(s.skipped)} entries could not be audited: ${reasonsText || "none"}.
          ${s.tagged ? `A further ${int(s.tagged)} were tagged unavailable by an earlier pass and not tried.` : ""}
          Most are CDN, DNS and advertising domains with nothing to visit. Firewall blocks and bot
          challenges are never tagged; they are tried again next time.
        </p>
        ${skipped2.length ? disclosure(skipped2.length, "The skipped entries and the reason for each", `${table([["Rank", true], ["Domain", false], ["Why", false]], skipped2.sort((a, b) => a.rank - b.rank).map((r) => `<tr>${num(r.tier != null ? `top ${int(r.tier)}` : int(r.rank))}<th scope="row">${escapeHtml(r.domain)}</th><td>${escapeHtml(r.reason)}${r.detail ? ` <span class="dim">${escapeHtml(r.detail)}</span>` : ""}</td></tr>`).join(""), { compact: true, label: "Skipped entries and the reason for each" })}`, "minor") : ""}
      </section>
      ${reviewSection(s, what, engineShort)}
      ${limitsSection("Sites change by the hour.", "site")}
      ${promoSection()}`;
    }
    let share = null;
    const slugPath = status.mode === "top" && status.month ? `${status.slug}/${status.month}` : status.slug;
    const cardFile = status.month ? path5.join(rootDir, "src", "site", "public", "assets", "img", `og-top-100k-${status.month}.jpg`) : null;
    if (cardFile && fs4.existsSync(cardFile) && status.slug.startsWith("top-")) {
      const v = crypto.createHash("sha256").update(fs4.readFileSync(cardFile)).digest("hex").slice(0, 10);
      share = {
        url: `${project_config_default.homepage}/audit/${slugPath}/`,
        image: `${project_config_default.homepage}/assets/img/og-top-100k-${status.month}.jpg?v=${v}`,
        imageAlt: `A grayscale street crowd behind the pour logo and the headline The pour 100,000: the top sites, audited, with three figures: ${pc(s.failingPct)} have a proven WCAG failure, ${int(s.meanFailing)} failing elements on the average site, and ${pc(s.rules.find((e) => e.id === "color-contrast")?.pagesPct ?? 0)} with low-contrast text.`
      };
    }
    const html = shell({
      title,
      description,
      eyebrow,
      heading,
      lede: intro,
      nav,
      generated,
      // Which engine build produced these numbers, printed in the footer:
      // the version recorded when the run STARTED, not whatever ships today.
      engine: status.engine ?? (status.engineVersion ? { name: "pour engine", version: status.engineVersion } : null),
      indexable: status.mode === "top",
      footnote: status.mode === "top" ? 'Inspired by <a href="https://webaim.org/projects/million/" rel="external">the WebAIM Million</a>, measured with the pour engine.' : null,
      // The headline figures are exact, one decimal, never rounded to a
      // neater number (David, 2026-08-31).
      stats: [[`${dec(s.failingPct)}%`, `of the ${what} audited have proven accessibility failures`], [dec(s.meanFailing), `failing elements on the average ${what.slice(0, -1)}`], [int(s.medianFailing), `failing elements on the median ${what.slice(0, -1)}`]],
      viz: severityViz(s, what),
      body: `${commonSections(s, what, engineShort)}${extraSections}`,
      share
    });
    return html;
  }
  const fullFile = path5.join(runDir2, "report.html");
  fs4.writeFileSync(fullFile, build(false));
  const outFile = publicCopy ? writePage(status.mode === "top" && status.month ? `${status.slug}/${status.month}` : status.slug, build(true)) : fullFile;
  return `report: ${path5.relative(process.cwd(), outFile) || outFile} \xB7 ${int(s.pages)} pages, ${pc(s.failingPct)} with failures, ${dec(s.meanFailing)} failing elements per page (median ${int(s.medianFailing)})${partial ? " \xB7 run not finished" : ""}`;
}
function breadthSection(s, briefLink, what = "pages") {
  return `
    <section class="docs" id="breadth" aria-labelledby="breadth-title">
      <h2 id="breadth-title">By breadth</h2>
      <p>
        Elements say how much is wrong. Criteria say how many kinds of thing are wrong: forty low-contrast
        links is one criterion. ${what[0].toUpperCase() + what.slice(1)} by the number of criteria they fail:
      </p>
      ${bars(s.breadth, (b) => b.pages, (b) => b.label, (b) => `${int(b.pages)} <span class="dim">(${pc(s.pages ? 100 * b.pages / s.pages : 0)})</span>`, ["Criteria failed", "Pages"])}
      ${s.widest.length ? `${miniStats([[int(s.widest[0].criteria), `criteria broken on the widest ${what.slice(0, -1)}`]])}
      ${disclosure(Math.min(s.widest.length, 25), "The pages failing the most criteria", table(
    [...s.widest[0].rank != null ? [["Rank", true]] : [], [what === "pages" ? "Page" : "Site", false], ["Criteria", true], ["Rules", true], ["Failing", true]],
    s.widest.slice(0, 25).map((b) => `<tr>${b.rank != null ? num(int(b.rank)) : ""}<th scope="row">${briefLink(b)}</th>${num(int(b.criteria))}${num(int(b.rules))}${num(int(b.failing))}</tr>`).join(""),
    { compact: true, sortable: true, label: "The pages that break the most distinct criteria" }
  ))}` : ""}
    </section>`;
}
function consentSection(s, what = "pages") {
  const [w, wo] = s.consent;
  if (!w.pages) return "";
  return `
    <section class="docs" id="consent" aria-labelledby="consent-title">
      <h2 id="consent-title">By consent</h2>
      ${miniStats([[pc(s.pages ? 100 * w.pages / s.pages : 0), `of ${what} showed a consent layer`]])}
      <p>
        A consent layer covering the page was accepted before the audit, so the page was
        measured, not the layer. ${what[0].toUpperCase() + what.slice(1)} with and without one:
      </p>
      ${groupTable("Group", s.consent, "Failures with and without a consent layer", what)}
    </section>`;
}
function twoEnds(s, briefLink, unit) {
  const U = unit === "page" ? "Page" : "Site";
  return `
    <section class="docs" id="ends" aria-labelledby="ends-title">
      <h2 id="ends-title">Site scores</h2>
      ${miniStats([...s.clean ? [[int(s.clean), `${unit}s with nothing proved wrong`]] : [], ...s.heaviest.length ? [[int(s.heaviest[0].failing), "failing elements on the heaviest page"]] : []])}
      ${(() => {
    const names = s.cleanSample.filter((b) => !b.nsfw && b.rank != null).slice(0, 5).map((b) => escapeHtml(b.label));
    return names.length >= 3 ? `<p>It can be done: ${names.slice(0, -1).join(", ")} and ${names[names.length - 1]} are among them.</p>` : "";
  })()}
      <p>
        ${s.clean ? "Nothing the engine could prove wrong is a floor, not a pass; the human checks still apply." : `Every ${unit} had at least one failure the engine could prove.`}
      </p>
      ${s.clean ? disclosure(s.cleanSample.length, `${s.cleanSample.length < s.clean ? `The first ${int(s.cleanSample.length)} clean ${unit}s by rank` : `The ${int(s.clean)} clean ${unit}${s.clean === 1 ? "" : "s"}`}`, `${table(
    [...s.cleanSample[0]?.rank != null ? [["Rank", true]] : [], [U, false], ["Failing", true], ["Review", true], ["Elements", true]],
    s.cleanSample.map((b) => `<tr>${b.rank != null ? `<td class="num rank-dot">${dot("good")}${int(b.rank)}</td>` : ""}<th scope="row">${b.rank == null ? dot("good") : ""}${briefLink(b)}</th>${num("0")}${num(int(b.review))}${num(int(b.elements))}</tr>`).join(""),
    { compact: true, sortable: true, label: "Pages with nothing the engine could prove wrong" }
  )}`, "good") : ""}
      ${s.heaviest.length ? `<p>The ${s.heaviest.length < 100 ? int(s.heaviest.length) : "hundred"} pages with the most failing elements:</p>` : ""}
      ${s.heaviest.length ? table(
    [...s.heaviest[0].rank != null ? [["Rank", true]] : [], [U, false], ["Failing", true], ["Rules", true], ["Elements", true]],
    s.heaviest.map((b) => `<tr>${b.rank != null ? num(int(b.rank)) : ""}<th scope="row">${briefLink(b)}</th>${num(int(b.failing))}${num(int(b.rules))}${num(int(b.elements))}</tr>`).join(""),
    { compact: s.heaviest.length > 20, sortable: true, label: "The pages with the most failing elements" }
  ) : ""}
      ${s.heaviest.length && s.heaviest[0].rank != null ? `<p class="note">Click a heading to sort. Rank is the page's place in the list; failing is failing elements; rules is how many rules failed; elements is the size of the page.</p>` : ""}
    </section>`;
}
var listMetaDate = (status) => status.list?.date ? longDate(status.list.date) : longDate(new Date(status.startedAt).toISOString());
function delta(before, after, unit) {
  const d = after - before;
  if (Math.abs(d) < 0.05) return "no change";
  return `${d > 0 ? "up" : "down"} ${dec(Math.abs(d))}${unit ? ` ${unit}` : ""}`;
}
function allMonths(runDir2) {
  const parent = path5.dirname(runDir2);
  return fs4.readdirSync(parent).filter((f) => /^\d{4}-\d{2}$/.test(f)).sort().map((m) => {
    const file = path5.join(parent, m, "summary.json");
    if (!fs4.existsSync(file)) return null;
    try {
      return { month: m, ...JSON.parse(fs4.readFileSync(file, "utf8")) };
    } catch {
      return null;
    }
  }).filter(Boolean);
}
function previousMonth(runDir2, month) {
  const parent = path5.dirname(runDir2);
  const months = fs4.readdirSync(parent).filter((f) => /^\d{4}-\d{2}$/.test(f) && f < month).sort();
  for (const m of months.reverse()) {
    const file = path5.join(parent, m, "summary.json");
    if (fs4.existsSync(file)) {
      try {
        return { month: m, ...JSON.parse(fs4.readFileSync(file, "utf8")) };
      } catch {
      }
    }
  }
  return null;
}
if (process.argv[1] === fileURLToPath2(import.meta.url) && /render\.mjs$/.test(process.argv[1])) {
  const dir = path5.resolve(process.argv[2] ?? "");
  if (!fs4.existsSync(path5.join(dir, "status.json"))) {
    console.error("usage: render.mjs <run dir with status.json and progress.jsonl>");
    process.exit(1);
  }
  console.log(await render(dir));
}

// scripts/report/run.mjs
var homeDir = path6.dirname(fileURLToPath3(import.meta.url));
var packaged = fs5.existsSync(path6.join(homeDir, "engine.iife.js"));
var args = process.argv.slice(2);
var VALUE_FLAGS = /* @__PURE__ */ new Set(["--workers", "--pause", "--count", "--max", "--viewport", "--depth", "--port", "--top", "--load", "--timeout", "--source", "--month", "--out", "--report"]);
var target;
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("--")) {
    if (VALUE_FLAGS.has(args[i])) i++;
    continue;
  }
  target = args[i];
  break;
}
if (!target) {
  console.error('Name a target: a URL, a list file, or "top" (the Tranco ranking, --top N). See the header of scripts/report/run.mjs.');
  process.exit(1);
}
var mode = target === "top" ? "top" : /^[a-z]+:\/\//i.test(target) ? "site" : fs5.existsSync(target) ? "list" : /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(target) ? "site" : null;
if (!mode) {
  console.error(`Cannot tell what "${target}" is: not a URL, not a file I can find, not "top".`);
  process.exit(1);
}
var topN = Number(flagValue("--top", 1e5));
var source = String(flagValue("--source", "crux")).toLowerCase();
if (!["crux", "tranco"].includes(source)) {
  console.error(`--source expects crux or tranco, got "${source}"`);
  process.exit(1);
}
if (mode === "site" && !/^[a-z]+:\/\//i.test(target)) target = `https://${target}/`;
var isSite = mode === "site";
var workers = Number(flagValue("--workers", isSite ? 4 : 8));
var politeMs = Number(flagValue("--pause", isSite ? 1e3 : 250));
var count = flagValue("--count") ? Number(flagValue("--count")) : Infinity;
var max = Number(flagValue("--max", 5e3));
var maxDepth = Number(flagValue("--depth", Infinity));
var sameHost = hasFlag("--same-host");
var [vw, vh] = String(flagValue("--viewport", "1440x900")).split("x").map(Number);
var recheck = hasFlag("--recheck");
var renderOnly = hasFlag("--render");
var fresh = hasFlag("--fresh");
var WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"];
var NAV_TIMEOUT = Number(flagValue("--load", 1e4));
var SETTLE_MS = isSite ? 1500 : 2e3;
var HARD_CAP_MS = Number(flagValue("--timeout", 2e4));
var TIMEOUT_TRIES = 1;
var MIN_ELEMENTS = 50;
var TRIES = 1;
var recheckArg = recheck ? args[args.indexOf("--recheck") + 1] : void 0;
var RECHECK_REASONS = new Set(recheckArg && !recheckArg.startsWith("--") && /^[a-z,-]+$/.test(recheckArg) ? recheckArg.split(",") : ["error"]);
var runnerFault = (row) => row.reason === "error" || row.reason === "timeout" && /in setup/.test(row.detail ?? "");
var recheckable = (row) => recheckArg && !recheckArg.startsWith("--") && /^[a-z,-]+$/.test(recheckArg) ? RECHECK_REASONS.has(row.reason) : runnerFault(row);
var TORN_DOWN = /detached Frame|Target closed|Session closed|Connection closed|browser has disconnected|Execution context was destroyed|Navigating frame was detached/i;
var neverResolves = (row) => row.reason === "unreachable" && /ERR_NAME_NOT_RESOLVED/.test(row.detail ?? "");
var SKIP_EXT = /\.(pdf|jpe?g|png|gif|svg|webp|avif|ico|mp4|mp3|m4a|webm|mov|zip|gz|tgz|rar|7z|dmg|exe|msi|apk|docx?|xlsx?|pptx?|csv|xml|rss|atom|json|js|css|woff2?|ttf|eot)$/i;
var TRACKING = /^(utm_|gclid$|fbclid$|msclkid$|mc_cid$|mc_eid$|_ga$|ref$)/i;
var SECOND_LEVEL = /* @__PURE__ */ new Set(["co", "com", "net", "org", "gov", "edu", "ac", "or", "ne", "go"]);
function registrable(hostname) {
  const labels = hostname.toLowerCase().replace(/^www\./, "").split(".");
  if (labels.length <= 2) return labels.join(".");
  const [tld, sld] = [labels.at(-1), labels.at(-2)];
  return tld.length === 2 && SECOND_LEVEL.has(sld) ? labels.slice(-3).join(".") : labels.slice(-2).join(".");
}
var localStamp = () => {
  const d = /* @__PURE__ */ new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
};
var thisMonth = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
var outDir = flagValue("--out") ? path6.resolve(String(flagValue("--out"))) : null;
var showDir = (dir) => path6.relative(process.cwd(), dir) || dir;
var auditsDir = outDir ?? (packaged ? path6.resolve("pour-reports") : path6.join(rootDir, "reports", "audit"));
var renderOptions = { publicCopy: !outDir && !packaged };
var reportFile = flagValue("--report") ? path6.resolve(String(flagValue("--report"))) : null;
if (reportFile && !/\.html?$/i.test(reportFile)) {
  console.error(`--report expects an .html file path, got "${flagValue("--report")}"`);
  process.exit(1);
}
async function renderRun() {
  const message = await render(runDir, renderOptions);
  if (!reportFile) return message;
  fs5.mkdirSync(path6.dirname(reportFile), { recursive: true });
  fs5.copyFileSync(path6.join(runDir, "report.html"), reportFile);
  return `${message}
saved ${showDir(reportFile)}`;
}
var list = null;
var listFile = null;
var listMeta = null;
var slug;
var label;
var startUrl = null;
var host = null;
var site = null;
if (mode === "top") {
  listMeta = await (source === "tranco" ? resolveTranco : resolveCrux)(path6.join(auditsDir, "lists"), topN);
  listFile = listMeta.file;
  slug = `top-${topN % 1e3 === 0 ? `${topN / 1e3}k` : topN}${source === "tranco" ? "-tranco" : ""}`;
  label = `The top ${topN.toLocaleString("en-US")}`;
} else if (mode === "list") {
  listFile = path6.resolve(target);
  slug = path6.basename(listFile).replace(/\.[a-z]+$/i, "").toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  label = path6.basename(listFile);
} else {
  startUrl = new URL(target);
  host = startUrl.hostname.toLowerCase();
  site = registrable(host);
  slug = site;
  label = site;
}
var fullList = null;
if (listFile) {
  fullList = readList(listFile);
  list = fullList;
}
if (mode === "top") list = fullList.filter((r) => r.rank <= topN);
var slugDir = path6.join(auditsDir, slug);
fs5.mkdirSync(slugDir, { recursive: true });
function pickRunDir() {
  if (mode === "top") return path6.join(slugDir, flagValue("--month") && /^\d{4}-\d{2}$/.test(flagValue("--month")) ? flagValue("--month") : thisMonth());
  const runs = fs5.readdirSync(slugDir).filter((f) => /^\d{4}-\d{2}-\d{2}-\d{4}$/.test(f)).sort();
  const latest = runs.at(-1);
  if (latest && !fresh) {
    const status = readJson(path6.join(slugDir, latest, "status.json"));
    if (status && (!status.done || recheck || renderOnly)) return path6.join(slugDir, latest);
  }
  return path6.join(slugDir, localStamp());
}
function readJson(file) {
  try {
    return JSON.parse(fs5.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}
var runDir = pickRunDir();
if (fresh && fs5.existsSync(path6.join(runDir, "progress.jsonl"))) {
  const existing = readJson(path6.join(runDir, "status.json"));
  const summary = existing ? `${existing.audited ?? 0} pages audited, ${existing.skipped ?? 0} skipped${existing.done ? ", finished" : existing.paused ? ", stopped" : ""}` : "a run in progress";
  if (!hasFlag("--yes")) {
    if (!process.stdin.isTTY) {
      console.error(`--fresh would delete ${showDir(runDir)} (${summary}). Add --yes to confirm.`);
      process.exit(1);
    }
    const rl = (await import("node:readline/promises")).createInterface({ input: process.stdin, output: process.stdout });
    const answer = (await rl.question(`Are you sure? --fresh deletes ${showDir(runDir)} (${summary}) and starts again from the top. Type yes to continue: `)).trim().toLowerCase();
    rl.close();
    if (answer !== "yes" && answer !== "y") {
      console.log("Left as it was. Run without --fresh to resume, or with --recheck to retry the refused pages.");
      process.exit(0);
    }
  }
  for (const f of ["progress.jsonl", "status.json", "summary.json"]) fs5.rmSync(path6.join(runDir, f), { force: true });
}
fs5.mkdirSync(runDir, { recursive: true });
var progressFile = path6.join(runDir, "progress.jsonl");
var statusFile = path6.join(runDir, "status.json");
var prior = readJson(statusFile);
var tally = createTally();
var inflight = /* @__PURE__ */ new Map();
var hostState = /* @__PURE__ */ new Map();
var stateOf = (h) => {
  if (!hostState.has(h)) hostState.set(h, { host: h, run: 0, backoffUntil: 0, backoffMs: 3e4 });
  return hostState.get(h);
};
var hostOf = (item) => isSite ? new URL(item.url).hostname : item.domain;
var sessionStartedAt = Date.now();
var attempts = 0;
var resolved = 0;
var recovered = 0;
var stopping = false;
var lastStatus = 0;
var finished = false;
var newTags = /* @__PURE__ */ new Map();
var REBUILD_MS = 3e4;
var tallyStale = false;
var lastRebuildAt = 0;
var liveRecent = [];
var briefOf = (row) => ({ rank: row.rank, tier: row.tier, nsfw: isNsfw(row) || void 0, label: row.domain ?? (row.url ? (new URL(row.url).pathname || "/") + new URL(row.url).search : "?"), url: row.url ?? (row.domain ? `https://${row.domain}/` : null), status: row.status, reason: row.reason, detail: row.detail, failing: row.violationElements ?? 0, review: row.reviewElements ?? 0, elements: row.elements ?? 0, rules: row.violations?.length ?? 0 });
var done = /* @__PURE__ */ new Map();
var hosts = /* @__PURE__ */ new Map();
async function replay() {
  if (!fs5.existsSync(progressFile)) return;
  const rl = readline2.createInterface({ input: fs5.createReadStream(progressFile), crlfDelay: Infinity });
  for await (const line of rl) {
    if (!line.trim()) continue;
    let row;
    try {
      row = JSON.parse(line);
    } catch {
      continue;
    }
    done.set(isSite ? row.url : row.rank, row);
  }
  for (const row of done.values()) {
    add(tally, row, { host });
    if (row.host && row.status === "audited") hosts.set(row.host, row.rank);
  }
}
await replay();
tally.recent = [];
var audited = [...done.values()].filter((r) => r.status === "audited").length;
var skipped = done.size - audited;
if (isSite && !recheck && !renderOnly && !fresh && done.size && audited === 0) {
  const seed = done.get(startUrl.toString()) ?? [...done.values()][0];
  console.log(`${label}: nothing was audited last time (the first page ${seed.reason === "blocked" ? "was refused" : `was skipped, ${seed.reason}`}${seed.detail ? `, ${seed.detail}` : ""}); trying the site again from the top.`);
  done.clear();
  skipped = 0;
  rebuildTally();
  fs5.writeFileSync(progressFile, "");
}
var auditedAtStart = audited;
var finishedAtStart = done.size;
if (list) tally.tagged = list.filter((r) => r.tag).length;
var meta = {
  kind: isSite ? "site" : "list",
  mode,
  slug,
  label,
  target: startUrl?.toString() ?? path6.basename(listFile),
  start: startUrl?.toString() ?? null,
  host,
  site,
  sameHost,
  list: listMeta ? { file: path6.basename(listFile), id: listMeta.id, date: listMeta.date, source: listMeta.source, name: listMeta.name, url: listMeta.url } : listFile ? { file: path6.basename(listFile) } : null,
  total: list?.length ?? null,
  count: isSite ? max : Number.isFinite(count) ? count : list?.length ?? null,
  engineVersion: project_config_default.engine.version,
  viewport: { width: vw, height: vh },
  tags: WCAG_TAGS,
  settleMs: SETTLE_MS,
  navTimeoutMs: NAV_TIMEOUT,
  hardCapMs: HARD_CAP_MS,
  minElements: MIN_ELEMENTS,
  workers,
  pauseMs: politeMs,
  startedAt: prior?.startedAt ?? Date.now(),
  activeMs: prior?.activeMs ?? 0,
  month: mode === "top" ? path6.basename(runDir) : null,
  topN: mode === "top" ? topN : null,
  engine: { id: "pour", name: project_config_default.engine.name, version: project_config_default.engine.version }
};
if (prior?.list && listMeta && prior.list.source && prior.list.source !== listMeta.source && !fresh) {
  console.error(`${label}: this month's run was started on ${prior.list.name ?? prior.list.source} (${prior.list.file}). Continue it with --source ${prior.list.source}, or start over on ${listMeta.name} with --fresh.`);
  process.exit(1);
}
var queue = [];
var retryQueue = [];
var seen = /* @__PURE__ */ new Set();
var cursor = 0;
var recheckTotal = 0;
if (isSite) {
  if (recheck) {
    for (const row of done.values()) if (row.status !== "audited" && recheckable(row) && !neverResolves(row) && (!row.rechecked || hasFlag("--again"))) queue.push({ url: row.url, depth: row.depth ?? 0, from: row.from ?? null });
    for (const row of done.values()) seen.add(row.url);
    recheckTotal = queue.length;
  } else {
    for (const row of done.values()) seen.add(row.url);
    for (const row of done.values()) for (const link of row.links ?? []) if (!seen.has(link)) {
      seen.add(link);
      queue.push({ url: link, depth: (row.depth ?? 0) + 1, from: row.url });
    }
    if (!done.size) {
      const first = normalise(startUrl.toString(), startUrl) ?? startUrl.toString();
      seen.add(first);
      queue.push({ url: first, depth: 0, from: null });
    }
  }
} else if (recheck) {
  const again = hasFlag("--again");
  let alreadyDone = 0;
  for (const row of done.values()) {
    if (row.status === "audited" || !recheckable(row) || neverResolves(row)) continue;
    if (row.rechecked && !again) {
      alreadyDone += 1;
      continue;
    }
    queue.push({ rank: row.rank, domain: row.domain, url: row.url, tier: row.tier });
  }
  recheckTotal = queue.length;
  if (alreadyDone) console.log(`${alreadyDone} refused page${alreadyDone === 1 ? "" : "s"} already rechecked this month and left alone (--again includes them)`);
}
if (list && !recheck) while (cursor < list.length && (list[cursor].tag || done.has(list[cursor].rank))) cursor++;
console.log(`${label} with the pour engine: ${isSite ? `crawling ${sameHost ? host : `*.${site}`} up to ${max} pages` : `${list.length} domains${tally.tagged ? `, ${tally.tagged} tagged unavailable` : ""}${Number.isFinite(count) ? `, stopping at ${count} audited` : ""}`} \xB7 ${done.size ? `resuming with ${audited} audited, ${skipped} skipped` : "fresh run"}${recheck ? ` \xB7 recheck of ${recheckTotal} refused pages` : ""} \xB7 ${workers} workers \xB7 ${showDir(runDir)}`);
var robots = { fetched: false, rules: [] };
if (isSite) {
  try {
    const res = await fetch(`${startUrl.origin}/robots.txt`, { headers: { "user-agent": "pour-report" } });
    if (res.ok) {
      robots.fetched = true;
      let applies = false;
      for (const raw of (await res.text()).split("\n")) {
        const line = raw.replace(/#.*/, "").trim();
        const m = /^([a-z-]+)\s*:\s*(.*)$/i.exec(line);
        if (!m) continue;
        const key = m[1].toLowerCase();
        const value = m[2].trim();
        if (key === "user-agent") applies = value === "*";
        else if (applies && (key === "disallow" || key === "allow") && value) robots.rules.push({ allow: key === "allow", length: value.length, re: new RegExp("^" + value.split("*").map((s) => s.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*").replace(/\\\$$/, "$")) });
      }
    }
  } catch {
  }
}
function robotsAllows(url) {
  const p = url.pathname + url.search;
  let best = null;
  for (const r of robots.rules) if (r.re.test(p) && (!best || r.length > best.length || r.length === best.length && r.allow)) best = r;
  return !best || best.allow;
}
function normalise(href, base) {
  let url;
  try {
    url = new URL(href, base);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(url.protocol)) return null;
  url.hash = "";
  url.hostname = url.hostname.toLowerCase();
  if (sameHost ? url.hostname !== host : registrable(url.hostname) !== site) return null;
  if (SKIP_EXT.test(url.pathname)) return null;
  for (const key of [...url.searchParams.keys()]) if (TRACKING.test(key)) url.searchParams.delete(key);
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) url.pathname = url.pathname.slice(0, -1);
  return url.toString();
}
var openReport = () => new Promise((resolve) => {
  if (hasFlag("--no-open") || process.platform !== "darwin") return resolve();
  execFile("open", [reportFile ?? path6.join(runDir, "report.html")], () => resolve());
});
if (renderOnly) {
  if (!done.size) {
    console.error("Nothing on disk to render yet.");
    process.exit(1);
  }
  writeStatus({ done: prior?.done ?? false, paused: prior?.paused ?? !prior?.done, capped: prior?.capped ?? false }, true);
  console.log(await renderRun());
  process.exit(0);
}
if (prior?.done && !recheck && !fresh && done.size) {
  console.log(`${label}: this run finished already (${audited} pages, the whole ${isSite ? "site" : "list"}). Re-rendering the report; --fresh starts a new run, --recheck retries the refused pages.`);
  writeStatus({ done: true }, true);
  console.log(await renderRun());
  await openReport();
  process.exit(0);
}
var engineSource = await loadEngineSource(homeDir);
var puppeteer = await loadPuppeteer();
var CHALLENGE = () => /just a moment|attention required|performing security verification|access denied|verify you are human|are you a robot|checking your browser|access to this page has been denied|pardon our interruption|robot check|bot verification/i.test(document.title || "") || /^\s*(human verification|verification|captcha|please wait\.{0,3}|one moment,? please\.{0,3}|security check|are you a human\??)\s*$/i.test(document.title || "") || !!document.querySelector('script[src*="challenges.cloudflare.com"], #challenge-running, #cf-challenge-running, #px-captcha, iframe[src*="captcha"], iframe[src*="hcaptcha"], form#challenge-form, script[src*="awswaf"], script[src*="captcha-delivery.com"], script[src*="challenge.js"][src*="waf"]');
async function launchBrowser() {
  const opts = { headless: true, handleSIGINT: false, handleSIGTERM: false, handleSIGHUP: false, args: ["--disable-features=HttpsUpgrades,HttpsFirstBalancedModeAutoEnable", "--autoplay-policy=no-user-gesture-required"] };
  const launched = await (async () => {
    if (process.env.PUPPETEER_EXECUTABLE_PATH) return puppeteer.launch({ ...opts, executablePath: process.env.PUPPETEER_EXECUTABLE_PATH });
    try {
      return await puppeteer.launch(opts);
    } catch {
    }
    const cache = path6.join(process.env.HOME ?? "", "Library", "Caches", "ms-playwright");
    if (fs5.existsSync(cache)) {
      for (const dir of fs5.readdirSync(cache).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse()) {
        for (const candidate of ["chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing", "chrome-mac/Chromium.app/Contents/MacOS/Chromium", "chrome-linux/chrome"]) {
          const bin = path6.join(cache, dir, candidate);
          if (fs5.existsSync(bin)) return puppeteer.launch({ ...opts, executablePath: bin });
        }
      }
    }
    for (const channel2 of ["chrome", "chrome-beta", "msedge"]) {
      try {
        return await puppeteer.launch({ ...opts, channel: channel2 });
      } catch {
      }
    }
    console.error("No Chromium found. Install Google Chrome, or point PUPPETEER_EXECUTABLE_PATH at a Chrome/Chromium binary.");
    process.exit(1);
  })();
  try {
    const cdp = await launched.target().createCDPSession();
    await cdp.send("Browser.setDownloadBehavior", { behavior: "deny" });
    await cdp.detach();
  } catch {
  }
  return launched;
}
var browser = await launchBrowser();
if (process.platform === "darwin") {
  try {
    spawn("caffeinate", ["-i", "-w", String(process.pid)], { stdio: "ignore", detached: true }).unref();
  } catch {
  }
}
var siteContext = isSite ? browser.defaultBrowserContext() : null;
var STALL_MS = 9e4;
var RELAUNCH_GAP_MS = 18e4;
var lastCompletedAt = Date.now();
var lastRelaunchAt = 0;
var relaunching = null;
async function relaunchBrowser(why) {
  if (relaunching) return relaunching;
  relaunching = (async () => {
    console.log(yellow(`browser ${why}: replacing it (${inflight.size} pages in flight are tried again)`));
    const old = browser;
    try {
      old.process()?.kill("SIGKILL");
    } catch {
    }
    await old.close().catch(() => {
    });
    openPages.clear();
    browser = await launchBrowser();
    browser.on("disconnected", () => {
      if (!stopping && !finished && !relaunching) relaunchBrowser("disconnected");
    });
    siteContext = isSite ? browser.defaultBrowserContext() : null;
    lastCompletedAt = Date.now();
    lastRelaunchAt = Date.now();
    tornDownRun = 0;
    relaunching = null;
  })();
  return relaunching;
}
var tornDownRun = 0;
browser.on("disconnected", () => {
  if (!stopping && !finished && !relaunching) relaunchBrowser("disconnected");
});
var watchdog = setInterval(() => {
  if (stopping || finished || relaunching) return;
  if (!browser.connected) {
    relaunchBrowser("disconnected");
    return;
  }
  if (tornDownRun >= 5) {
    tornDownRun = 0;
    relaunchBrowser("five pages in a row torn down");
    return;
  }
  if (inflight.size && Date.now() - lastCompletedAt > STALL_MS && Date.now() - lastRelaunchAt > RELAUNCH_GAP_MS) relaunchBrowser(`stalled: nothing completed in ${Math.round(STALL_MS / 1e3)}s`);
}, 5e3);
async function auditOne(item) {
  if (!isSite && item.invalid) return { rank: item.rank, domain: item.domain, ...item.tier != null ? { tier: item.tier } : {}, status: "skipped", reason: "unreachable", detail: "not a hostname", totalMs: 0 };
  if (!isSite) {
    const resolves = await Promise.race([dns.lookup(item.domain).then(() => true, (e) => e.code === "ENOTFOUND" || e.code === "EAI_NONAME" ? false : true), new Promise((r) => setTimeout(() => r(true), 3e3))]);
    if (!resolves) return { rank: item.rank, domain: item.domain, ...item.tier != null ? { tier: item.tier } : {}, status: "skipped", reason: "unreachable", detail: "net::ERR_NAME_NOT_RESOLVED (dns)", totalMs: 0 };
  }
  const row = isSite ? { url: item.url, depth: item.depth, from: item.from, status: "skipped", reason: null, links: [] } : { rank: item.rank, domain: item.domain, ...item.tier != null ? { tier: item.tier } : {}, status: "skipped", reason: null };
  if (stopping || finished) {
    row.reason = "error";
    row.detail = "Target closed (stopping)";
    return row;
  }
  let context = null;
  let page = null;
  let cdp = null;
  const t0 = Date.now();
  liveRows.set(isSite ? item.url : item.rank, row);
  try {
    context = isSite ? siteContext : await browser.createBrowserContext();
    page = await context.newPage();
    openPages.set(isSite ? item.url : item.rank, page);
    await page.setViewport({ width: vw, height: vh });
    await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");
    await page.setBypassCSP(true);
    page.on("dialog", (dialog) => dialog.dismiss().catch(() => {
    }));
    row.phase = "load";
    let response = null;
    let navError = null;
    for (const url of isSite ? [item.url] : item.url ? [item.url] : [`https://${item.domain}/`, `http://${item.domain}/`]) {
      navError = null;
      try {
        response = await page.goto(url, { waitUntil: "load", timeout: NAV_TIMEOUT });
        break;
      } catch (err) {
        if (err.name === "TimeoutError") {
          row.reason = "timeout";
          row.detail = `did not load in ${NAV_TIMEOUT / 1e3}s`;
          return row;
        }
        navError = err.message.split("\n")[0];
      }
    }
    if (navError) {
      row.reason = "unreachable";
      row.detail = navError.slice(0, 120);
      return row;
    }
    row.loadMs = Date.now() - t0;
    row.phase = "settle";
    if (!isSite) row.url = page.url();
    else row.finalUrl = page.url();
    if (response) {
      row.httpStatus = response.status();
      row.contentType = (response.headers()["content-type"] || "").split(";")[0];
      if ([403, 429, 503].includes(row.httpStatus)) {
        row.reason = "blocked";
        row.detail = `HTTP ${row.httpStatus}`;
        return row;
      }
      if (row.httpStatus >= 400) {
        row.reason = "http-error";
        row.detail = `HTTP ${row.httpStatus}`;
        return row;
      }
      if (row.contentType && !/html|xhtml/.test(row.contentType)) {
        row.reason = "not-html";
        row.detail = row.contentType;
        return row;
      }
    }
    if (isSite) {
      const finalHost = new URL(row.finalUrl).hostname.toLowerCase();
      if (sameHost ? finalHost !== host : registrable(finalHost) !== site) {
        row.reason = "redirected-away";
        row.detail = finalHost;
        return row;
      }
    }
    await new Promise((r) => setTimeout(r, SETTLE_MS));
    row.phase = "challenge check";
    if (await page.evaluate(CHALLENGE).catch(() => false)) {
      row.reason = "bot-challenge";
      return row;
    }
    row.phase = "consent";
    const clicked = await Promise.race([acceptConsent(page, true).catch(() => null), new Promise((r) => setTimeout(() => r(null), 5e3))]);
    if (clicked) row.consent = clicked;
    row.phase = "stats";
    cdp = await page.createCDPSession();
    const { frameTree } = await cdp.send("Page.getFrameTree");
    const { executionContextId } = await cdp.send("Page.createIsolatedWorld", { frameId: frameTree.frame.id, worldName: "pour" });
    const evalIsolated = async (expression) => {
      const r = await cdp.send("Runtime.evaluate", { expression, contextId: executionContextId, awaitPromise: true, returnByValue: true });
      if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception?.description || r.exceptionDetails.text || "evaluation failed").split("\n")[0]);
      return r.result.value;
    };
    const found = await evalIsolated(`(() => ({
      title: (document.title || '').trim().slice(0, 140),
      lang: document.documentElement.getAttribute('lang'),
      elements: document.querySelectorAll('*').length,
      images: document.querySelectorAll('img').length,
      headings: document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]').length,
      inputs: document.querySelectorAll('input:not([type="hidden"]),select,textarea').length,
      links: document.querySelectorAll('a[href]').length,
      buttons: document.querySelectorAll('button,[role="button"]').length,
      ariaAttrs: Array.from(document.querySelectorAll('*')).reduce((n, el) => n + Array.from(el.attributes).filter((a) => a.name.startsWith('aria-') || a.name === 'role').length, 0),
      hrefs: ${isSite ? "true" : "false"} ? [...new Set(Array.from(document.querySelectorAll('a[href]')).map((a) => a.href))].slice(0, 2000) : [],
    }))()`);
    const { hrefs, ...stats } = found;
    for (const k of ["elements", "images", "headings", "inputs", "links", "buttons", "ariaAttrs"]) stats[k] = Number(stats[k]) || 0;
    Object.assign(row, stats);
    if (isSite) row.links = [...new Set(hrefs.map((h) => normalise(h, row.finalUrl)).filter(Boolean))];
    if (stats.elements < MIN_ELEMENTS) {
      row.reason = "placeholder";
      row.detail = `${stats.elements} elements`;
      return row;
    }
    if (stats.elements < 80 && /captcha|challenge|bot check|bot manager|human verification|are you (a )?human|blocked/i.test(row.title || "")) {
      row.reason = "bot-challenge";
      row.detail = `${stats.elements} elements, titled ${JSON.stringify(row.title)}`;
      return row;
    }
    if (!isSite) row.host = registrable(new URL(row.url).hostname);
    row.phase = "engine";
    await evalIsolated(engineSource);
    const results = await evalIsolated(`(async () => {
      const tags = ${JSON.stringify(WCAG_TAGS)}; const samples = ${isSite ? "true" : "false"};
      const res = await PourEngine.run(document, { tags });
      const ms = res.durationMs;
      const compact = (list) => list.map((r) => ({ id: r.id, impact: r.impact ?? null, nodes: r.nodes.length, ...(samples ? { sample: r.nodes.slice(0, 5).map((n) => ({ target: String(n.target[0]).slice(0, 200), message: String(n.failureSummary || '').split(String.fromCharCode(10))[0].slice(0, 240) })) } : {}) }));
      return { ms, violations: compact(res.violations), incomplete: compact(res.incomplete), passes: res.passes ? res.passes.length : 0 };
    })()`);
    row.status = "audited";
    row.engineMs = Math.round(results.ms);
    delete row.phase;
    row.violations = results.violations;
    row.incomplete = results.incomplete;
    row.rulesPassed = results.passes;
    row.violationElements = results.violations.reduce((n, r) => n + r.nodes, 0);
    row.reviewElements = results.incomplete.reduce((n, r) => n + r.nodes, 0);
    return row;
  } catch (err) {
    row.reason = "error";
    row.detail = String(err.message || err).split("\n")[0].slice(0, 160);
    return row;
  } finally {
    row.totalMs = Date.now() - t0;
    openPages.delete(isSite ? item.url : item.rank);
    liveRows.delete(isSite ? item.url : item.rank);
    if (cdp) await cdp.detach().catch(() => {
    });
    if (page) await page.close().catch(() => {
    });
    if (!isSite && context) await context.close().catch(() => {
    });
  }
}
var openPages = /* @__PURE__ */ new Map();
var liveRows = /* @__PURE__ */ new Map();
var closeTimedOut = (key) => {
  const page = openPages.get(key);
  if (page) page.close().catch(() => {
  });
};
var tty = process.stdout.isTTY;
var truecolor = /truecolor|24bit/i.test(process.env.COLORTERM ?? "");
var paintWith = (code) => (text) => tty ? `\x1B[${code}m${text}\x1B[0m` : text;
var green = paintWith(truecolor ? "38;2;123;231;174" : "32");
var yellow = paintWith(truecolor ? "38;2;245;197;24" : "33");
var dim = paintWith("2");
var TROUBLE = /* @__PURE__ */ new Set(["timeout", "blocked", "bot-challenge", "error"]);
function writeStatus(extra = {}, force = false) {
  const now = Date.now();
  if (!force && now - lastStatus < 1e3) return;
  lastStatus = now;
  if (tallyStale && (force || now - lastRebuildAt > REBUILD_MS)) rebuildTally();
  fs5.writeFileSync(statusFile, JSON.stringify({
    ...meta,
    activeMs: meta.activeMs + (now - sessionStartedAt),
    sessionStartedAt,
    auditedAtStart,
    finishedAtStart,
    cursorIndex: list ? cursor : null,
    audited,
    skipped,
    tagged: tally.tagged,
    finished: done.size,
    discovered: isSite ? seen.size : null,
    queued: isSite ? queue.length : null,
    cursorRank: list ? list[Math.min(cursor, list.length - 1)]?.rank ?? null : null,
    recheck,
    recheckTotal,
    attempts,
    resolved,
    recovered,
    retryQueued: retryQueue.length,
    backoffs: [...hostState.values()].filter((h) => h.backoffUntil > now).map((h) => ({ host: h.host, until: h.backoffUntil })),
    inflight: [...inflight.entries()].map(([key, v]) => ({ rank: v.rank, label: v.label, href: v.href, since: v.since })),
    robots: isSite ? { fetched: robots.fetched, rules: robots.rules.length } : null,
    done: false,
    paused: false,
    ...extra,
    summary: { ...summarize(tally, { minGroup: 10 }), recent: liveRecent }
  }));
}
function record(row) {
  if (finished) return;
  row.finishedAt = Date.now();
  if (row.reason !== "timeout" && !(row.reason === "error" && TORN_DOWN.test(row.detail ?? ""))) lastCompletedAt = row.finishedAt;
  const key = isSite ? row.url : row.rank;
  const previous = done.get(key);
  resolved += 1;
  if (previous) {
    row.rechecked = true;
    if (previous.status === "audited") audited -= 1;
    else skipped -= 1;
    if (row.status === "audited" && previous.status !== "audited") recovered += 1;
  }
  if (!isSite && row.status === "audited") {
    const twin = hosts.get(row.host);
    if (twin !== void 0 && twin !== row.rank) {
      row.status = "skipped";
      row.reason = "duplicate";
      row.detail = `same site as rank ${twin} (${row.host})`;
      delete row.violations;
      delete row.incomplete;
    } else hosts.set(row.host, row.rank);
  }
  if (row.status === "audited") audited += 1;
  else skipped += 1;
  done.set(key, row);
  fs5.appendFileSync(progressFile, JSON.stringify(row) + "\n");
  if (previous) tallyStale = true;
  else add(tally, row, { host });
  liveRecent.unshift(briefOf(row));
  if (liveRecent.length > 18) liveRecent.pop();
  if (!isSite && row.status === "skipped") {
    const why = permanentReason(row);
    if (why) newTags.set(row.domain, why);
  }
  if (isSite && !recheck && row.depth < maxDepth) for (const link of row.links ?? []) {
    if (seen.has(link)) continue;
    seen.add(link);
    if (!robotsAllows(new URL(link))) {
      const r = { url: link, depth: row.depth + 1, from: row.url, status: "skipped", reason: "robots", links: [], finishedAt: Date.now() };
      done.set(link, r);
      skipped += 1;
      add(tally, r, { host });
      fs5.appendFileSync(progressFile, JSON.stringify(r) + "\n");
      continue;
    }
    queue.push({ url: link, depth: row.depth + 1, from: row.url });
  }
  const what = row.status === "audited" ? `${row.violationElements} failing, ${row.reviewElements} review, ${row.elements} el` : `skipped: ${row.reason}${row.detail ? ` (${row.detail})` : ""}`;
  const paint = row.status === "audited" ? green : TROUBLE.has(row.reason) ? yellow : dim;
  console.log(`${dim(`[${audited}${isSite ? `/${max} \xB7 queue ${queue.length}` : Number.isFinite(count) ? `/${count}` : ` \xB7 rank ${row.rank}`}]`)} ${isSite ? new URL(row.url).pathname || "/" : row.domain}: ${paint(what)}`);
}
function rebuildTally() {
  const fresh2 = createTally();
  fresh2.tagged = tally.tagged;
  for (const r of done.values()) add(fresh2, r, { host });
  Object.assign(tally, fresh2);
  tallyStale = false;
  lastRebuildAt = Date.now();
}
var ready = (q) => stateOf(hostOf(q)).backoffUntil <= Date.now() && (q.notBefore ?? 0) <= Date.now();
function nextItem() {
  for (let i = 0; i < queue.length; i++) if (ready(queue[i])) return queue.splice(i, 1)[0];
  if (!isSite && !recheck) {
    while (cursor < list.length) {
      const entry = list[cursor++];
      if (entry.tag || done.has(entry.rank)) continue;
      return { rank: entry.rank, domain: entry.domain, url: entry.url, tier: entry.tier, invalid: entry.invalid };
    }
  }
  if (retryQueue.length && !inflight.size) {
    console.log(dim(`the rest is done; ${retryQueue.length} timed-out page${retryQueue.length === 1 ? "" : "s"} get another try`));
    for (const it of retryQueue.splice(0)) {
      it.notBefore = Date.now() + 5e3;
      queue.push(it);
    }
  }
  return null;
}
var moreToCome = () => queue.length > 0 || retryQueue.length > 0 || !isSite && !recheck && cursor < list.length;
var capReached = () => recheck ? false : isSite ? audited + inflight.size >= max : audited + inflight.size >= count;
async function worker() {
  while (!stopping && !capReached()) {
    if (relaunching) {
      await relaunching;
      continue;
    }
    const item = nextItem();
    if (!item) {
      if (!inflight.size && !moreToCome()) return;
      await new Promise((r) => setTimeout(r, 1e3));
      continue;
    }
    const key = isSite ? item.url : item.rank;
    inflight.set(key, { rank: item.rank, label: isSite ? new URL(item.url).pathname || "/" : item.domain, href: isSite ? item.url : item.url ?? `https://${item.domain}/`, since: Date.now(), retry: item.timeouts ? "retry after a timeout" : item.tries ? "retry" : void 0 });
    writeStatus();
    let timer;
    const timeout = new Promise((resolve) => {
      timer = setTimeout(() => {
        closeTimedOut(key);
        resolve({ ...isSite ? { url: item.url, depth: item.depth, from: item.from, links: [] } : { rank: item.rank, domain: item.domain, ...item.tier != null ? { tier: item.tier } : {} }, status: "skipped", reason: "timeout", detail: `over ${HARD_CAP_MS / 1e3}s in ${liveRows.get(key)?.phase ?? "setup"}` });
      }, HARD_CAP_MS);
    });
    const row = await Promise.race([auditOne(item), timeout]);
    clearTimeout(timer);
    if (item.retried) row.retried = true;
    inflight.delete(key);
    attempts += 1;
    const name = isSite ? new URL(item.url).pathname || "/" : item.domain;
    if (row.reason === "error" && TORN_DOWN.test(row.detail ?? "")) {
      tornDownRun += 1;
      if (stopping) continue;
      item.tries = (item.tries ?? 0) + 1;
      if (item.tries < 2 || !browser.connected || relaunching) {
        item.notBefore = Date.now() + 5e3;
        queue.push(item);
        console.log(dim(`  ${name}: page torn down, trying again`));
        writeStatus();
        continue;
      }
    } else tornDownRun = 0;
    const state = stateOf(hostOf(item));
    if (row.reason === "timeout") {
      item.timeouts = (item.timeouts ?? 0) + 1;
      if (item.timeouts < TIMEOUT_TRIES && !stopping) {
        retryQueue.push(item);
        console.log(dim(`  ${name}: ${row.detail}, back of the queue for one more try`));
        writeStatus();
        continue;
      }
    }
    if (row.reason === "blocked" || row.reason === "bot-challenge") {
      state.run += 1;
      item.tries = (item.tries ?? 0) + 1;
      const gaveUp = state.backoffMs >= 15 * 6e4;
      if (item.tries < TRIES && !gaveUp) {
        queue.push(item);
        console.log(dim(`  ${name}: ${row.reason}${row.detail ? ` (${row.detail})` : ""}, try ${item.tries} of ${TRIES}`));
      } else {
        row.tries = item.tries;
        record(row);
      }
      if (state.run >= 5 && state.backoffUntil <= Date.now()) {
        state.backoffMs = Math.min(state.backoffMs * 2, 15 * 6e4);
        state.backoffUntil = Date.now() + state.backoffMs;
        state.run = 0;
        console.log(yellow(`${state.host} refused 5 in a row: its pages wait ${Math.round(state.backoffMs / 1e3)}s`));
      }
    } else {
      if (row.status === "audited") state.run = 0;
      record(row);
    }
    writeStatus();
    await new Promise((r) => setTimeout(r, politeMs));
  }
}
var askedPort = Number(flagValue("--port", mode === "top" ? 8770 : 8771));
var port = await freePort(askedPort);
if (port !== askedPort) console.log(`port ${askedPort} is in use, another run's screen most likely; this run's screen is on ${port}`);
var screenScript = packaged ? path6.join(homeDir, "report-screen.mjs") : path6.join(rootDir, "scripts", "report", "serve.mjs");
var screen = spawn(process.execPath, [screenScript, runDir, "--port", String(port)], { stdio: ["ignore", "inherit", "inherit"] });
writeStatus({}, true);
if (!hasFlag("--no-open") && process.platform === "darwin") setTimeout(() => execFile("open", [`http://127.0.0.1:${port}`]), 800);
var stop = () => {
  if (stopping) return;
  stopping = true;
  console.log("\nstopping: letting the pages in flight finish (Ctrl+C again to abandon them; they are tried again on resume)\u2026");
  process.once("SIGINT", () => {
    console.log("abandoning in-flight pages");
    finish(false).then(() => process.exit(130));
  });
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
async function finish(complete) {
  if (finished) return;
  finished = true;
  clearInterval(watchdog);
  if (list && newTags.size) {
    const date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    for (const entry of fullList) {
      const why = newTags.get(entry.domain);
      if (why && !entry.tag) entry.tag = { reason: why, date };
    }
    writeList(listFile, fullList);
    console.log(`tagged ${newTags.size} domains as unavailable in ${path6.relative(rootDir, listFile)}`);
  }
  const exhausted = complete && !moreToCome() && !queue.length;
  if (audited === 0) {
    const seed = [...done.values()][0];
    writeStatus({ done: false, paused: true, refused: true }, true);
    await browser.close().catch(() => {
    });
    const why = seed ? ` The first page ${seed.reason === "blocked" ? "was refused" : `was skipped, ${seed.reason}`}${seed.detail ? `, ${seed.detail}` : ""}.` : "";
    console.log(`
${label}: nothing audited.${why} No report written; run the same command to try again${seed?.reason === "blocked" ? ", though a site that refuses the first request tends to refuse the next" : ""}.`);
    screen.kill();
    return;
  }
  writeStatus({ done: exhausted, paused: !complete, capped: complete && !exhausted }, true);
  await browser.close().catch(() => {
  });
  console.log(complete ? `
${exhausted ? "finished" : "reached the cap"}: ${audited} pages audited, ${skipped} skipped.` : `
stopped: ${audited} pages audited, ${skipped} skipped. Run the same command to resume.`);
  console.log(await renderRun());
  if (complete) await openReport();
  screen.kill();
}
if (isSite && !done.size) {
  const first = queue.shift();
  inflight.set(first.url, { label: "/", href: first.url, since: Date.now() });
  writeStatus({}, true);
  let seedTimer;
  const row = await Promise.race([auditOne(first), new Promise((resolve) => {
    seedTimer = setTimeout(() => {
      closeTimedOut(first.url);
      resolve({ url: first.url, depth: 0, from: null, links: [], status: "skipped", reason: "timeout", detail: `over ${HARD_CAP_MS / 1e3}s` });
    }, HARD_CAP_MS);
  })]);
  clearTimeout(seedTimer);
  inflight.delete(first.url);
  attempts += 1;
  if (!(row.reason === "error" && TORN_DOWN.test(row.detail ?? ""))) record(row);
  else queue.unshift(first);
  writeStatus({}, true);
}
await Promise.all(Array.from({ length: workers }, worker));
await finish(!stopping);
process.exit(stopping ? 130 : 0);
