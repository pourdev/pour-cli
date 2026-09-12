/*! pour report screen | MIT | https://pour.dev */

// scripts/report/serve.mjs
import fs from "node:fs";
import http from "node:http";
import path2 from "node:path";

// src/engine/lib/dom.js
var NEVER_RENDERED = /* @__PURE__ */ new Set(["SCRIPT", "TEMPLATE", "STYLE", "LINK", "META"]);
function collectRoots(context) {
  const roots = context.shadowRoot ? [context, context.shadowRoot] : [context];
  for (let i = 0; i < roots.length; i++) {
    if (!roots[i].querySelectorAll) continue;
    for (const el of roots[i].querySelectorAll("*")) {
      if (el.shadowRoot) roots.push(el.shadowRoot);
    }
  }
  return roots;
}
function flatTreeParent(node) {
  return node.assignedSlot ?? node.parentElement ?? node.getRootNode()?.host ?? null;
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
  for (let node = element; node; node = flatTreeParent(node)) {
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
        status: "incomplete",
        message: `\u201C${title}\u201D resembles a template title. Check whether it describes this page's actual topic or purpose; the same words can also be a legitimate subject or name.`,
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
    const table = element.closest("table");
    const tableRole = table && effectiveRole(table);
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
  if (element.matches(":disabled") || isInert(element)) return false;
  if (element.tabIndex >= 0) return true;
  return element.matches('a[href], button, input, select, textarea, summary, [contenteditable="true"]');
}
function effectiveRole(element) {
  const explicit = element.getAttribute("role")?.trim().split(/\s+/) ?? [];
  for (const token of explicit) {
    const role = token.toLowerCase();
    if (role === "image") return "img";
    if (!ROLE_ARIA[role]) continue;
    if ((role === "presentation" || role === "none") && presentationDiscarded(element)) {
      return implicitRole(element);
    }
    return role;
  }
  return implicitRole(element);
}

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
    const role = effectiveRole(element);
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
  return computeName(element, false, false, /* @__PURE__ */ new Set());
}
function labelledByName(element) {
  return referencedName(element, /* @__PURE__ */ new Set()) ?? "";
}
function nativeLabelName(element, label) {
  return computeName(label, false, hiddenForName(label), /* @__PURE__ */ new Set([element]));
}
function hiddenForName(element) {
  for (let node = element; node; node = flatTreeParent(node)) {
    if (node.getAttribute?.("aria-hidden") === "true") return true;
    const style = getComputedStyle(node);
    if (style.display === "none") return true;
  }
  const visibility = getComputedStyle(element).visibility;
  return visibility === "hidden" || visibility === "collapse";
}
function referencedName(element, visited) {
  const refs = element.getAttribute?.("aria-labelledby");
  if (!refs) return null;
  const root = element.getRootNode();
  const targets = refs.split(/\s+/).filter(Boolean).map((id) => root.getElementById?.(id)).filter(Boolean);
  if (!targets.length) return null;
  return targets.map((target) => {
    const path3 = new Set(visited);
    if (target === element) path3.delete(element);
    return computeName(target, true, hiddenForName(target), path3);
  }).join(" ").replace(/\s+/g, " ").trim();
}
function computeName(element, inLabelledBy, includeHidden, visited) {
  if (visited.has(element)) return "";
  visited.add(element);
  if (!inLabelledBy) {
    const fromLabelledBy = referencedName(element, visited);
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
    const text = [...element.labels].map((label) => computeName(label, inLabelledBy, hiddenForName(label), visited)).join(" ").trim();
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
  const fromContents = visibleContentText(element, includeHidden, inLabelledBy, visited).replace(/\s+/g, " ").trim();
  if (fromContents) return fromContents;
  return (element.getAttribute("title") ?? element.getAttribute("placeholder") ?? "").trim();
}
function visibleContentText(element, includeHidden, inLabelledBy, visited) {
  const nodes = element.shadowRoot ? element.shadowRoot.childNodes : element.childNodes;
  return generatedContent(element, "::before", includeHidden) + textFromNodes(nodes, includeHidden, inLabelledBy, visited) + generatedContent(element, "::after", includeHidden);
}
function generatedContent(element, pseudo, includeHidden) {
  const style = getComputedStyle(element, pseudo);
  if (!includeHidden && (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse")) return "";
  const content = style.content;
  if (!content || content === "none" || content === "normal") return "";
  const alt = content.match(/\/\s*"((?:[^"\\]|\\.)*)"\s*$/);
  if (alt) return alt[1].replace(/\\(.)/g, "$1");
  const match = content.match(/^"((?:[^"\\]|\\.)*)"$/);
  return match ? match[1].replace(/\\(.)/g, "$1") : "";
}
function textFromNodes(nodes, includeHidden, inLabelledBy, visited) {
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
      if (node.getAttribute("aria-hidden") === "true") continue;
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse") continue;
    }
    if (tag === "slot") {
      const assigned = node.assignedNodes?.() ?? [];
      text += textFromNodes(assigned.length ? assigned : node.childNodes, includeHidden, inLabelledBy, visited);
      continue;
    }
    if ((tag === "img" || tag === "area") && node.getAttribute("alt") === "" && !node.getAttribute("aria-label")?.trim() && !node.getAttribute("aria-labelledby")) continue;
    const childName = computeName(node, inLabelledBy, includeHidden, visited);
    text += tag === "img" || tag === "area" || node.hasAttribute("aria-label") || node.hasAttribute("aria-labelledby") ? ` ${childName} ` : childName;
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
  selector: "svg, [role]",
  evaluate(element, { accessibleName: accessibleName2 }) {
    if (element.tagName === "IMG") return { status: "pass" };
    const svg = element.tagName.toLowerCase() === "svg";
    const explicitGraphic = effectiveRole(element) === "img" || ["graphics-document", "graphics-symbol"].includes(element.getAttribute("role")?.trim());
    if (!svg && !explicitGraphic) return { status: "pass" };
    if (svg && element.hasAttribute("role") && !explicitGraphic) return { status: "pass" };
    const nativeTitle = svg && [...element.children].find((child) => child.tagName.toLowerCase() === "title");
    const name = labelledByName(element) || element.getAttribute("aria-label")?.trim() || nativeTitle && accessibleName2(nativeTitle) || element.getAttribute("title")?.trim();
    if (name) return { status: "pass" };
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

// src/engine/rules/wcag/4.1.2-button-name.js
var button_name_default = {
  id: "button-name",
  name: "Button names",
  impact: "critical",
  tags: ["wcag2a", "wcag412"],
  help: "Buttons must have an accessible name",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
  selector: 'button, [role], input[type="button"], input[type="submit"], input[type="reset"]',
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
      if ((effectiveRole(element) ?? implicitRole(element)) !== "link") return { status: "pass" };
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
      status: "incomplete",
      message: `\u201C${name}\u201D appears generic when read alone. Check whether it identifies the destination in this context or whether a mechanism makes the link text descriptive. 2.4.9 permits such a mechanism; the initial link name alone cannot establish a failure.`,
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
    const visibleLabels = [...element.labels ?? []].filter((label) => {
      if (label.closest('[aria-hidden="true"]')) return false;
      const style = getComputedStyle(label);
      return style.display !== "none" && style.visibility !== "hidden";
    });
    const labelsText = visibleLabels.map((label) => nativeLabelName(element, label)).join(" ").trim();
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
      const onlyAriaHidden = [...element.labels].some((label) => {
        const style = getComputedStyle(label);
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
    const fault = invalid.length ? null : tokens.length ? grammarFault(tokens) : null;
    if (!invalid.length && !fault) return { status: "pass" };
    const problem = invalid.length ? `autocomplete contains unknown token(s): ${invalid.join(", ")}, so browsers and assistive tools cannot identify this field's purpose from it` : `autocomplete="${element.getAttribute("autocomplete").trim()}" is not a valid autofill value: ${fault}. Browsers discard the whole value, so no purpose is exposed`;
    const fix = invalid.length ? 'Use tokens from the HTML input-purposes list, e.g. autocomplete="email" or autocomplete="given-name".' : 'Use one field name from the HTML autofill list, optionally preceded by section-*, then shipping or billing, and (for tel, email and impp only) a contact type, e.g. autocomplete="shipping tel" or autocomplete="home email".';
    if (element.type === "search") {
      return {
        status: "incomplete",
        message: `${problem}. 1.3.5 covers fields that collect information about the user, which a search box usually does not; if this one does, correct the value.`,
        fix
      };
    }
    return {
      status: "fail",
      message: `${problem}. 1.3.5 covers fields that collect information about the user, which is what an autocomplete attribute is for; if this field collects nothing about the user, the criterion does not apply and this finding can be dismissed.`,
      fix
    };
  }
};

// src/engine/rules/wcag/1.3.4-orientation.js
var ROOT_PART = /^(html|body|:root)((?::[a-z-]+(?:\([^()]*\))?)*)$/i;
var LOCK_ROTATE = /rotate(?:3d\([^)]*,\s*)?\(?\s*(?:-?(?:90|270)deg|0\.25turn|-0\.25turn|100grad|-100grad)/i;
function matchingRoots(selectorText, doc) {
  const roots = /* @__PURE__ */ new Set();
  for (const part of (selectorText ?? "").split(",")) {
    const match = ROOT_PART.exec(part.trim());
    if (!match) continue;
    const root = /^body$/i.test(match[1]) ? doc.body : doc.documentElement;
    try {
      if (root?.matches(part.trim())) roots.add(root);
    } catch {
    }
  }
  return [...roots];
}
function quarterTurn(style, win) {
  let angle = 0;
  if (style.transform && style.transform !== "none") {
    try {
      const matrix = new win.DOMMatrixReadOnly(style.transform);
      if (!matrix.is2D) return null;
      angle += Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;
    } catch {
      return null;
    }
  }
  if (style.rotate && style.rotate !== "none") {
    const rotation = /^(?:(?:z|0\s+0\s+1)\s+)?(-?[\d.]+)(deg|rad|grad|turn)$/.exec(style.rotate);
    if (!rotation) return null;
    const scale = { deg: 1, rad: 180 / Math.PI, grad: 0.9, turn: 360 }[rotation[2]];
    angle += Number(rotation[1]) * scale;
  }
  return Math.abs((angle % 180 + 180) % 180 - 90) < 0.01;
}
function scanRules(rules, orientationContext, active, state, doc) {
  const win = doc.defaultView;
  for (const rule of rules ?? []) {
    if (rule.type === win.CSSRule.SUPPORTS_RULE) {
      if (win.CSS.supports(rule.conditionText)) scanRules(rule.cssRules, orientationContext, active, state, doc);
      continue;
    }
    if (rule.type === win.CSSRule.MEDIA_RULE) {
      const condition = rule.conditionText ?? rule.media.mediaText;
      const orientation = /orientation\s*:\s*(portrait|landscape)/i.exec(condition)?.[1];
      const context = orientation ? { condition, orientation } : orientationContext;
      scanRules(rule.cssRules, context, active && win.matchMedia(condition).matches, state, doc);
      continue;
    }
    if (orientationContext && rule.style) {
      const { display, visibility, transform, rotate } = rule.style;
      const declared = {
        display: display ? display === "none" ? "hidden" : null : void 0,
        visibility: visibility ? visibility === "hidden" ? "hidden" : null : void 0,
        transform: transform ? LOCK_ROTATE.test(transform) ? "rotated" : null : void 0,
        rotate: rotate ? LOCK_ROTATE.test(`rotate(${rotate})`) ? "rotated" : null : void 0
      };
      if (Object.values(declared).some((value) => value !== void 0)) {
        for (const root of matchingRoots(rule.selectorText, doc)) {
          const key = `${orientationContext.orientation.toLowerCase()}|${root === doc.body ? "body" : "html"}`;
          if (!state.has(key)) state.set(key, {});
          const entry = state.get(key);
          for (const [property, kind] of Object.entries(declared)) {
            if (kind === void 0) continue;
            entry[property] = kind ? { kind, active, selector: rule.selectorText, ...orientationContext } : null;
          }
        }
      }
    }
    if (rule.cssRules) scanRules(
      rule.cssRules,
      orientationContext,
      active && rule.conditionText === void 0,
      state,
      doc
    );
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
  visibleOnly: false,
  // a restriction can hide the root itself
  evaluate(element) {
    const doc = element.ownerDocument;
    const win = doc.defaultView;
    const state = /* @__PURE__ */ new Map();
    for (const sheet of doc.styleSheets) {
      if (sheet.disabled) continue;
      const media = sheet.media?.mediaText;
      if (media && !win.matchMedia(media).matches) continue;
      let rules;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      scanRules(rules, null, true, state, doc);
    }
    const findings = [];
    for (const [key, entry] of state) {
      const root = key.endsWith("|body") ? doc.body : doc.documentElement;
      for (const finding2 of Object.values(entry)) {
        if (!finding2) continue;
        if (finding2.active) {
          const computed = win.getComputedStyle(root);
          const effective = finding2.kind === "hidden" ? computed.display === "none" || computed.visibility === "hidden" : quarterTurn(computed, win);
          if (effective === false) continue;
        }
        findings.push(finding2);
      }
    }
    if (!findings.length) return { status: "pass" };
    const finding = findings.find((candidate) => candidate.active) ?? findings[0];
    const verb = finding.kind === "hidden" ? "hides the page" : "rotates the page to force the other orientation";
    return {
      status: "fail",
      message: `A stylesheet rule (${finding.selector} under @media ${finding.condition}) ${verb} when the device is in ${finding.orientation}${finding.active ? ", and it is in effect now" : ""}: the content is locked to a single display orientation. 1.3.4 allows that only where one orientation is essential, which a stylesheet cannot show; this finding assumes it is not.`,
      fix: "Let the layout adapt to both orientations instead of hiding or rotating the page. If a single orientation is genuinely essential (rare), document why and dismiss this finding."
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
      message: "This viewport meta tag stops users zooming the page, so text cannot be enlarged with the browser. 1.4.4 is met only if the page provides its own control that enlarges all text to 200% (technique G178); this finding assumes it does not, since the tag cannot show it.",
      fix: "Remove user-scalable=no and any maximum-scale below 2 from the viewport meta tag. If the page has its own text-size control that reaches 200%, record that and dismiss this finding."
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
var chainEffectCache = /* @__PURE__ */ new WeakMap();
var uncoveredEffectCache = /* @__PURE__ */ new WeakMap();
var blendBackdropCache = /* @__PURE__ */ new WeakMap();
var HAS_IMAGE = Symbol("background-image in chain");
var flatParentOf = (node) => node.assignedSlot ?? node.parentElement ?? node.getRootNode()?.host ?? null;
function colourChangingFilter(filter) {
  if (!filter || filter === "none") return false;
  let depth = 0;
  let name = "";
  for (const ch of filter) {
    if (ch === "(") {
      if (depth === 0 && name && name !== "drop-shadow") return true;
      depth += 1;
      name = "";
    } else if (ch === ")") {
      depth -= 1;
    } else if (depth === 0) {
      name = /[a-z-]/i.test(ch) ? name + ch.toLowerCase() : "";
    }
  }
  return false;
}
function chainEffect(node) {
  if (!node || node.nodeType !== 1) return false;
  if (chainEffectCache.has(node)) return chainEffectCache.get(node);
  const style = getComputedStyle(node);
  const own = colourChangingFilter(style.filter) || style.mixBlendMode && style.mixBlendMode !== "normal";
  const result = Boolean(own || chainEffect(flatParentOf(node)));
  chainEffectCache.set(node, result);
  return result;
}
function uncoveredEffect(node) {
  if (!node || node.nodeType !== 1) return false;
  if (uncoveredEffectCache.has(node)) return uncoveredEffectCache.get(node);
  const style = getComputedStyle(node);
  let result;
  if ((parseColor(style.backgroundColor)?.a ?? 0) >= 1) result = false;
  else if (style.backdropFilter && style.backdropFilter !== "none" || style.filter && style.filter !== "none") result = true;
  else result = uncoveredEffect(flatParentOf(node));
  uncoveredEffectCache.set(node, result);
  return result;
}
function hasPaintEffects(element) {
  if (!element || element.nodeType !== 1) return false;
  return chainEffect(element) || uncoveredEffect(element);
}
function isolatedBlendBackdrop(element) {
  if (!element || element.nodeType !== 1) return false;
  if (blendBackdropCache.has(element)) return blendBackdropCache.get(element);
  const style = getComputedStyle(element);
  const background = parseColor(style.backgroundColor);
  let result = false;
  if (!background || background.a < 1) {
    const isolated = style.isolation === "isolate" || ["fixed", "sticky"].includes(style.position) || style.zIndex !== "auto" || ["transform", "perspective", "filter", "backdropFilter", "clipPath", "maskImage", "webkitMaskImage"].some((key) => style[key] && style[key] !== "none") || /(?:paint|layout|strict|content)/.test(style.contain) || style.willChange && style.willChange !== "auto" || parseFloat(style.opacity) < 1;
    result = isolated || isolatedBlendBackdrop(element.assignedSlot ?? element.parentElement ?? element.getRootNode()?.host);
  }
  blendBackdropCache.set(element, result);
  return result;
}
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
      const target = animation.effect?.target;
      if (!target) continue;
      const keyframes = animation.effect.getKeyframes?.() ?? [];
      if (!keyframes.some((frame) => frame.opacity !== void 0)) continue;
      let rest = null;
      const timing = animation.effect.getComputedTiming?.() ?? {};
      if (Number.isFinite(timing.endTime) && (timing.fill === "forwards" || timing.fill === "both")) {
        const last = [...keyframes].reverse().find((frame) => frame.opacity !== void 0);
        const value = parseFloat(last?.opacity);
        if (Number.isFinite(value)) rest = value;
      }
      const previous = opacityAnimatorsCache.get(target);
      if (previous === void 0 || rest !== null && (previous === null || rest < previous)) {
        opacityAnimatorsCache.set(target, rest);
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
function containingBlockFor(host) {
  for (let node = host; node && node.nodeType === 1; node = node.parentElement) {
    const style = getComputedStyle(node);
    if (style.position !== "static" || style.transform !== "none" || style.filter !== "none" || /paint|layout|strict|content/.test(style.contain ?? "")) return node;
  }
  return null;
}
function pseudoRect(host, style) {
  const block = containingBlockFor(host);
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
function pseudoLayers(host) {
  let layers = pseudoCache.get(host);
  if (layers !== void 0) return layers;
  layers = [];
  for (const which of ["::before", "::after"]) {
    const style = getComputedStyle(host, which);
    if (style.content === "none" || style.display === "none" || style.visibility === "hidden") continue;
    const color = parseColor(style.backgroundColor);
    const paints = style.backgroundImage !== "none" || (color?.a ?? 0) > 0;
    if (!paints) continue;
    if (style.position !== "absolute" && style.position !== "fixed") continue;
    const opacity = parseFloat(style.opacity);
    const opacityFactor = Number.isFinite(opacity) ? opacity : 1;
    const rect = style.position === "absolute" ? pseudoRect(host, style) : null;
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
  pseudoCache.set(host, layers);
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
  let mode = getComputedStyle(element).position;
  for (let a = element.parentElement; a; a = a.parentElement) {
    if (mode === "fixed") break;
    const s = getComputedStyle(a);
    const containingBlock = s.position !== "static" || s.transform !== "none" || s.filter && s.filter !== "none";
    if (mode === "absolute" && !containingBlock) continue;
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
    mode = s.position;
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
function imageLuminanceRange(url, overlays = [], grid = null, under = null) {
  const width = grid?.width ?? 32;
  const height = grid?.height ?? 32;
  const sizeKey = width === 32 && height === 32 ? "" : `|${width}x${height}`;
  const backdrop = under?.a >= 1 ? under : null;
  const cacheKey = `${url}${overlays.length ? `|${overlayKey(overlays)}` : ""}${sizeKey}${backdrop ? `|under:${overlayKey([backdrop])}` : ""}`;
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
        let min = Infinity;
        let max = -Infinity;
        let minColor = null;
        let maxColor = null;
        let opaquePixels = 0;
        let alphaSeen = false;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 255 && !backdrop) alphaSeen = true;
          if (data[i + 3] > 0) opaquePixels += 1;
          if (data[i + 3] === 0 && !backdrop) continue;
          const pixel = { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] / 255 };
          const painted = backdrop ? composite(pixel, backdrop) : { ...pixel, a: 1 };
          const shown = overlays.length ? applyOverlays(painted, overlays) : painted;
          const l = luminance(shown);
          if (l < min) {
            min = l;
            minColor = shown;
          }
          if (l > max) {
            max = l;
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
        resolve(min <= max ? { min, max, minColor, maxColor, hasAlpha: alphaSeen, width: img.naturalWidth, height: img.naturalHeight, reduced } : null);
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
  const per = (list, i) => list.length ? list[i % list.length] : void 0;
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
function imagePaintRectInBox(box, meta, intrinsic) {
  if (!box || !meta) return null;
  if (meta.repeat !== "no-repeat") return null;
  if (meta.size === "cover" || meta.size === "contain") return null;
  const boxWidth = box.right - box.left;
  const boxHeight = box.bottom - box.top;
  const dimension = (value, total, auto) => {
    if (value?.endsWith("px")) return parseFloat(value);
    if (value?.endsWith("%")) return parseFloat(value) / 100 * total;
    return auto;
  };
  const size = meta.size.split(" ");
  const width = dimension(size[0], boxWidth, intrinsic?.width);
  const height = dimension(size[1] ?? size[0], boxHeight, intrinsic?.height);
  if (!Number.isFinite(width) || !Number.isFinite(height)) return null;
  const offset = (value, total, extent) => {
    if (value?.endsWith("%")) return parseFloat(value) / 100 * (total - extent);
    if (value?.endsWith("px")) return parseFloat(value);
    return null;
  };
  const pos = meta.position.split(" ");
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
  let max = -Infinity;
  let minColor = null;
  let maxColor = null;
  for (const sample of composited) {
    const l = luminance(sample);
    if (l < min) {
      min = l;
      minColor = sample;
    }
    if (l > max) {
      max = l;
      maxColor = sample;
    }
  }
  return { min, max, minColor, maxColor, sampled: true };
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
async function sampledVerdict(source, foreground, required, doc, overlays = [], under = null, extent = null) {
  if (!source) return null;
  let range = null;
  let what = "image";
  const grid = sampleGridFor(extent);
  if (source.tagName === "IMG") {
    range = await imageLuminanceRange(source.currentSrc || source.src, overlays, grid, under);
  } else {
    const css = source.css ?? getComputedStyle(source).backgroundImage;
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
      range = await imageLuminanceRange(absolute, overlays, grid, under);
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
        if (hasPaintEffects(styleSource)) {
          return { status: "incomplete", message: "A filter or blend mode changes the colours presented by this text and its background. Check the resulting contrast by eye." };
        }
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
      const ownMultiply = style.mixBlendMode === "multiply" && styleSource === element && !element.children.length && !element.shadowRoot && parseColor(style.backgroundColor)?.a === 0 && style.backgroundImage === "none" && style.filter === "none" && (!style.backdropFilter || style.backdropFilter === "none") && (!style.textShadow || style.textShadow === "none") && !hasPaintEffects(element.assignedSlot ?? element.parentElement ?? element.getRootNode()?.host) && !isolatedBlendBackdrop(element.assignedSlot ?? element.parentElement ?? element.getRootNode()?.host) && !["::before", "::after"].some((pseudo) => {
        const pseudoStyle = getComputedStyle(element, pseudo);
        const content = pseudoStyle.content;
        const bareJoiner = (content === '"\u2060"' || content === "'\u2060'") && pseudoStyle.display === "inline" && pseudoStyle.position === "static" && pseudoStyle.cssFloat === "none" && parseColor(pseudoStyle.backgroundColor)?.a === 0 && ["backgroundImage", "boxShadow", "textShadow", "transform", "filter", "backdropFilter", "maskImage", "webkitMaskImage"].every((key) => !pseudoStyle[key] || pseudoStyle[key] === "none") && ["Top", "Right", "Bottom", "Left"].every((side) => parseFloat(pseudoStyle[`padding${side}`]) === 0 && parseFloat(pseudoStyle[`border${side}Width`]) === 0) && pseudoStyle.outlineStyle === "none" && (!pseudoStyle.mixBlendMode || pseudoStyle.mixBlendMode === "normal");
        if (bareJoiner) return false;
        return content && content !== "none" && content !== "normal" && content !== '""';
      });
      if (hasPaintEffects(styleSource) && !ownMultiply) {
        return { status: "incomplete", message: "A filter or blend mode changes the colours presented by this text and its background. Check the resulting contrast by eye." };
      }
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
      let basePaints = true;
      if (!element.childElementCount && alternates.some((a) => a.origin === "::first-line")) {
        const range = doc.createRange();
        range.selectNodeContents(element);
        const lines = [...range.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
        if (lines.length && lines.every((r) => Math.abs(r.top - lines[0].top) < 1)) {
          const generated = ["::before", "::after"].some((pseudo) => {
            const generatedStyle = getComputedStyle(element, pseudo);
            return generatedStyle.display !== "none" && !["none", "normal"].includes(generatedStyle.content);
          });
          if (generated) return { status: "incomplete", message: "Generated content may occupy this element\u2019s first line, so the colours that actually paint its text cannot be identified from text ranges alone. Check contrast by eye." };
          basePaints = false;
        }
      }
      const worstCandidate = (candidates, backdrop) => candidates.reduce((worst, candidate) => {
        const shown = candidate.color.a < 1 ? composite(candidate.color, backdrop) : candidate.color;
        const margin = contrastRatio(shown, backdrop) / candidate.required;
        return !worst || margin < worst.margin ? { ...candidate, margin } : worst;
      }, null);
      if (alternates.length) {
        const estimate = effectiveBackground(styleSource) ?? { r: 255, g: 255, b: 255, a: 1 };
        const pick = worstCandidate([...basePaints ? [{ origin: null, color: foreground, required }] : [], ...alternates], estimate);
        foreground = pick.color;
        required = pick.required;
        foregroundOrigin = pick.origin;
      }
      const opacity = opacityAnimating(element) ? restingOpacity(element) : cumulativeOpacity(element);
      if (opacity < 0.05) return { status: "pass" };
      if (ownMultiply && (opacity < 1 || alternates.length)) {
        return { status: "incomplete", message: "This text blends as a group or uses additional text paint. Check its presented contrast by eye." };
      }
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
        if (ownMultiply) return { status: "incomplete", message: "This text multiplies against an image or gradient. Its contrast depends on the pixels behind each glyph; check it by eye." };
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
      if (ownMultiply && painted?.image) {
        return { status: "incomplete", message: "This text multiplies against image paint. Check its presented contrast by eye." };
      }
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
      if (ownMultiply && pseudoResolved) {
        return { status: "incomplete", message: "Pseudo-element paint affects the backdrop of this blended text. Check its presented contrast by eye." };
      }
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
        const dim = (color) => opacity < 1 ? { ...color, a: color.a * opacity } : color;
        const base = { origin: null, color: dim(baseForeground), required: baseRequired };
        const pick = worstCandidate([...basePaints ? [base] : [], ...alternates.map((a) => ({ ...a, color: dim(a.color) }))], background);
        foreground = pick.color;
        required = pick.required;
        foregroundOrigin = pick.origin;
      }
      if (ownMultiply) {
        foreground = {
          ...foreground,
          r: foreground.r * background.r / 255,
          g: foreground.g * background.g / 255,
          b: foreground.b * background.b / 255
        };
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
        const flipping = opaquePanelRects(doc).some(({ element: panel, rect: rect2, color, hitTestBlind }) => (!blindOnly || hitTestBlind) && near(rect2) && !panel.contains(element) && !element.contains(panel) && textIntersects(element, rect2) && (ownMultiply || contrastRatio(foreground, color) >= required !== (direction === "pass")));
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
                if (ownMultiply || contrastRatio(foreground, paint) >= required !== (direction === "pass")) {
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
    if (attr === "aria-errormessage" && (!element.hasAttribute("aria-invalid") || ["false", ""].includes(element.getAttribute("aria-invalid").trim().toLowerCase()))) continue;
    for (const id of (element.getAttribute(attr) ?? "").split(/\s+/).filter(Boolean)) {
      if (!root.getElementById?.(id)) {
        if (attr === "aria-controls" && collapsed) continue;
        missing.push({ attr, id });
        continue;
      }
      const count = root.querySelectorAll(`[id="${CSS.escape(id)}"]`).length;
      if (count > 1) {
        ambiguous.push(`${attr}="${id}" \u2014 ${count} elements share this id; the reference binds to the FIRST one in the DOM`);
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
    const asserted = relevant.filter(({ attr }) => component && (attr === "aria-labelledby" || attr === "aria-activedescendant"));
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
    const nativeRole = implicitRole(element);
    if (!focusable && !hasAriaProps || nativeRole && nativeRole !== "generic") {
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
    if (effectiveRole(element) !== "list") return { status: "pass" };
    const effectiveChildren = (parent) => [...parent.children].flatMap((child) => child.tagName === "SLOT" ? child.assignedElements?.().length ? child.assignedElements() : [...child.children] : [child]);
    const isValidChild = (child) => {
      if (NEVER_RENDERED.has(child.tagName)) return true;
      if (isRendered && !isRendered(child)) return true;
      const role = effectiveRole(child);
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
      const neutralised = renderedItems.filter((child) => ["presentation", "none"].includes(effectiveRole(child)));
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
    const candidates = [...element.querySelectorAll(INTERACTIVE)].filter((el) => !el.matches(":disabled") && !isInert(el) && !(el.tagName === "INPUT" && el.type === "hidden") && isRendered(el) && !el.closest('[aria-hidden="true"]') && (el.matches(NATIVE) || el.hasAttribute("tabindex")));
    const nested = candidates.find((el) => !(el.hasAttribute("tabindex") && el.tabIndex < 0)) ?? candidates[0];
    if (!nested) return { status: "pass" };
    if (nested.hasAttribute("tabindex") && nested.tabIndex < 0 && !element.matches("a[href], button")) {
      return {
        status: "incomplete",
        message: `This control contains an element (<${nested.tagName.toLowerCase()}>) with a negative tabindex. It can still receive focus. Check that both controls expose the intended name and role, and that focusing and activating the child works correctly.`
      };
    }
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
      status: "incomplete",
      message: `This page has ${linkCount} links and buttons but no detected landmark, heading, skip link or titled frame. Check whether it contains blocks repeated on other pages and, if so, whether a mechanism lets users bypass them. A single page cannot establish repetition.`,
      fix: 'Add a skip link like <a href="#content">Skip to content</a>, wrap primary content in <main>, or structure the page with headings.'
    };
  }
};

// src/engine/rules/wcag/2.5.8-target-size.js
var TARGETS = 'a[href], button, input, select, [role="button"], [role="link"]';
function containsComposed(ancestor, element) {
  if (ancestor.contains(element)) return true;
  if (ancestor.getRootNode() === element.getRootNode() && !element.assignedSlot) return false;
  for (let node = element; node; node = node.assignedSlot ?? node.parentElement ?? node.getRootNode()?.host) {
    if (node === ancestor) return true;
  }
  return false;
}
function outsideHiddenOverflow(element, rect) {
  for (let parent = element.parentElement; parent; parent = parent.parentElement) {
    const style = getComputedStyle(parent);
    if (style.display === "contents") continue;
    const x = /^(hidden|clip)$/.test(style.overflowX);
    const y = /^(hidden|clip)$/.test(style.overflowY);
    if (!x && !y) continue;
    const clip = parent.getBoundingClientRect();
    if (x && (clip.width === 0 || rect.right <= clip.left || rect.left >= clip.right) || y && (clip.height === 0 || rect.bottom <= clip.top || rect.top >= clip.bottom)) return true;
  }
  return false;
}
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
function declaresSizing(style) {
  for (let k = 0; k < style.length; k++) if (SIZING.test(style[k])) return true;
  return false;
}
function authorSizingRules(root, sizingRulesByRoot) {
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
function uaSized(element, sizingRulesByRoot) {
  if (!NATIVE_CONTROL.test(element.tagName) || element.type === "image") return "no";
  if (declaresSizing(element.style)) return "no";
  const entry = authorSizingRules(element.getRootNode(), sizingRulesByRoot);
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
    async evaluateAll(elements, helpers = {}) {
      const sizingRulesByRoot = /* @__PURE__ */ new WeakMap();
      const yieldToMain = helpers.yieldToMain ?? (() => Promise.resolve());
      const targetRect = (element) => {
        const rect = element.getBoundingClientRect();
        const label = element.labels?.[0];
        if (!label) return rect;
        const labelRect = label.getBoundingClientRect();
        if (!labelRect.width || !labelRect.height) return rect;
        const left = Math.min(rect.left, labelRect.left);
        const top = Math.min(rect.top, labelRect.top);
        const right = Math.max(rect.right, labelRect.right);
        const bottom = Math.max(rect.bottom, labelRect.bottom);
        return { left, top, right, bottom, width: right - left, height: bottom - top };
      };
      const uaControlled = (element) => element.tagName === "INPUT" && (element.type === "checkbox" || element.type === "radio") && getComputedStyle(element).appearance !== "none";
      const rects = [];
      for (let i = 0; i < elements.length; i++) {
        if (i % 64 === 0) await yieldToMain();
        rects.push(targetRect(elements[i]));
      }
      const centers = rects.map((r) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 }));
      const layoutSkipped = (element) => {
        try {
          return typeof element.checkVisibility === "function" && element.checkVisibility({ visibilityProperty: true }) && !element.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true });
        } catch {
          return false;
        }
      };
      const laidOut = [];
      for (let i = 0; i < elements.length; i++) {
        if (i % 64 === 0) await yieldToMain();
        const r = rects[i], element = elements[i];
        laidOut.push(r.width > 0 && r.height > 0 && !element.matches(":disabled") && !isInert(element) && !isHiddenFromPointer(element, r) && !layoutSkipped(element));
      }
      const undersized = rects.map((r, i) => laidOut[i] && (r.width < min || r.height < min));
      const encloses = (a, b) => a.left <= b.left && a.right >= b.right && a.top <= b.top && a.bottom >= b.bottom;
      const paintedEncloses = (target, targetBox, innerBox) => {
        if (!encloses(targetBox, innerBox)) return false;
        const fragments = [...target.getClientRects()].filter((f) => f.width > 0 && f.height > 0);
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
        return slabs;
      };
      const CELL = 256;
      const cellIndex = /* @__PURE__ */ new Map();
      const wideTargets = [];
      const cellsOf = (r) => {
        const keys = [];
        if ((Math.floor(r.right / CELL) - Math.floor(r.left / CELL) + 1) * (Math.floor(r.bottom / CELL) - Math.floor(r.top / CELL) + 1) > 2048) return null;
        for (let cx = Math.floor(r.left / CELL); cx <= Math.floor(r.right / CELL); cx++) {
          for (let cy = Math.floor(r.top / CELL); cy <= Math.floor(r.bottom / CELL); cy++) {
            keys.push(`${cx}:${cy}`);
          }
        }
        return keys;
      };
      for (let j = 0; j < rects.length; j++) {
        if (j % 64 === 0) await yieldToMain();
        if (!laidOut[j]) continue;
        const keys = cellsOf(rects[j]);
        if (!keys) {
          wideTargets.push(j);
          continue;
        }
        for (const key of keys) {
          if (!cellIndex.has(key)) cellIndex.set(key, []);
          cellIndex.get(key).push(j);
        }
      }
      const nearbyCandidates = (i, box = rects[i]) => {
        const keys = cellsOf(box);
        if (!keys) return elements.map((_, j) => j).filter((j) => j !== i && laidOut[j]);
        const seen = new Set(wideTargets.filter((j) => j !== i));
        for (const key of keys) {
          for (const j of cellIndex.get(key) ?? []) if (j !== i) seen.add(j);
        }
        return seen;
      };
      const obscuredRects = /* @__PURE__ */ new Map();
      const calculateObscuredRect = (i) => {
        let areas = null;
        for (const j of nearbyCandidates(i)) {
          if (elements[j].contains(elements[i]) || elements[i].contains(elements[j])) continue;
          if (encloses(rects[j], rects[i]) || encloses(rects[i], rects[j])) continue;
          if (typeof elements[i].href === "string" && elements[i].href === elements[j].href) continue;
          const overlap = overlapOf(rects[i], rects[j]);
          if (!overlap) continue;
          if (fixedContextOf(elements[j]) !== fixedContextOf(elements[i])) continue;
          if (!paintsOver(j, i, overlap)) continue;
          const next = (areas ?? [rects[i]]).flatMap((area) => {
            const cut = overlapOf(area, rects[j]);
            return cut ? uncovered(area, cut) : [area];
          });
          areas = next.filter((area, k) => !next.some((other, n) => n !== k && encloses(other, area) && (n < k || !encloses(area, other))));
          if (areas.length > 128) return { uncertain: true };
        }
        if (areas === null) return null;
        return areas.find((area) => area.width >= min && area.height >= min) ?? areas.reduce(
          (best, area) => area.width * area.height > best.width * best.height ? area : best,
          { width: 0, height: 0 }
        );
      };
      const obscuredRect = (i) => {
        if (!obscuredRects.has(i)) obscuredRects.set(i, calculateObscuredRect(i));
        return obscuredRects.get(i);
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
          adequateDestinations = /* @__PURE__ */ new Map();
          elements.forEach((other, j) => {
            if (!laidOut[j] || undersized[j] || other.ownerDocument !== elements[i].ownerDocument) return;
            const d = destinationOf(other);
            if (d) {
              if (!adequateDestinations.has(d)) adequateDestinations.set(d, []);
              adequateDestinations.get(d).push(j);
            }
          });
        }
        let uncertain = false;
        for (const j of adequateDestinations.get(destination) ?? []) {
          if (j === i) continue;
          const area = obscuredRect(j);
          if (area?.uncertain) {
            uncertain = true;
            continue;
          }
          if (!area || area.width >= min && area.height >= min) return "pass";
        }
        return uncertain ? "incomplete" : null;
      };
      let alternativeKeys = null;
      const names = /* @__PURE__ */ new Map();
      const nameOf = (element) => {
        if (!names.has(element)) names.set(element, helpers.accessibleName?.(element)?.trim() ?? "");
        return names.get(element);
      };
      const signatures = (element) => {
        const keys = [];
        const name = nameOf(element);
        if (name) keys.push(`name:${name}`);
        const handler = element.getAttribute("onclick")?.trim();
        if (handler) keys.push(`handler:${handler}`);
        const controls = element.getAttribute("aria-controls")?.trim().split(/\s+/).sort().join(" ");
        if (controls) keys.push(`controls:${controls}`);
        return keys;
      };
      const plausibleAlternative = (i) => {
        if (destinationOf(elements[i])) return false;
        const own = signatures(elements[i]);
        if (!own.length) return false;
        if (!alternativeKeys) {
          alternativeKeys = /* @__PURE__ */ new Map();
          elements.forEach((other, j) => {
            if (!laidOut[j] || undersized[j] || destinationOf(other)) return;
            const area = obscuredRect(j);
            if (area && !area.uncertain && (area.width < min || area.height < min)) return;
            for (const key of signatures(other)) {
              if (!alternativeKeys.has(key)) alternativeKeys.set(key, []);
              alternativeKeys.get(key).push(j);
            }
          });
        }
        return own.some((key) => alternativeKeys.get(key)?.some((j) => j !== i));
      };
      const alternativeReview = () => ({
        status: "incomplete",
        message: `This control's measured pointer area is below ${min}\xD7${min}px, but a larger control has a matching name, handler or declared target. Check whether it provides the same function and meets the target-size requirement; if so, the Equivalent exception applies.`,
        fix: "Verify the larger alternative, or enlarge or separate this target."
      });
      const equivalentReview = () => ({
        status: "incomplete",
        message: `Another link reaches the same destination, but its unobscured pointer area could not be established. Check whether that alternative meets ${min}\xD7${min}px before applying the Equivalent exception.`
      });
      const judge = (element, i) => {
        if (!laidOut[i]) return { status: "pass" };
        if (!undersized[i]) {
          const effective = obscuredRect(i);
          if (effective?.uncertain) return {
            status: "incomplete",
            message: "Several targets overlap this control. The remaining pointer area could not be resolved within the geometry budget; check whether it contains the required target size."
          };
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
          const equivalent2 = equivalentElsewhere(i);
          if (equivalent2 === "pass") return { status: "pass" };
          if (equivalent2 === "incomplete") return equivalentReview();
          if (plausibleAlternative(i)) return alternativeReview();
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
        const uaProof = uaSized(element, sizingRulesByRoot);
        if (uaProof === "yes") return { status: "pass" };
        if (isInTextLine(element)) return { status: "pass" };
        if (spacingException) {
          const crowds = (other, j) => {
            if (j === i || !laidOut[j]) return false;
            if (containsComposed(other, element) || containsComposed(element, other)) return false;
            if (paintedEncloses(other, rects[j], rects[i]) || paintedEncloses(element, rects[i], rects[j])) {
              const destination = destinationOf(element);
              if (destination && destination === destinationOf(other)) return false;
              if (outsideHiddenOverflow(element, rects[i]) || outsideHiddenOverflow(other, rects[j])) return false;
            }
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
          const center = centers[i];
          const crowded = [...nearbyCandidates(i, {
            left: center.x - min,
            right: center.x + min,
            top: center.y - min,
            bottom: center.y + min
          })].some((j) => crowds(elements[j], j));
          if (!crowded) return { status: "pass" };
        }
        const equivalent = equivalentElsewhere(i);
        if (equivalent === "pass") return { status: "pass" };
        if (equivalent === "incomplete") return equivalentReview();
        if (plausibleAlternative(i)) return alternativeReview();
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
      };
      const outcomes = [];
      for (let i = 0; i < elements.length; i++) {
        if (i % 64 === 0) await yieldToMain();
        outcomes.push(judge(elements[i], i));
      }
      return outcomes;
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
    const target = effect?.target;
    if (!target || target.nodeType !== 1) continue;
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
        content = target.ownerDocument.defaultView.getComputedStyle(target, effect.pseudoElement).content;
      } catch {
      }
      if (!generatedText(content)) continue;
      pseudoText = true;
    }
    if (!moving.has(target)) {
      moving.set(target, { name: animation.animationName, verb: moves ? "moves" : "blinks", pseudoText });
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
      if (element.tagName === "MARQUEE") {
        if (element.tagName === "MARQUEE" && element.getAttribute("scrollamount") === "0") {
          return { status: "pass" };
        }
        return {
          status: "incomplete",
          message: "This marquee can scroll content. Check whether it actually starts automatically, continues for more than five seconds alongside other content, and has a working pause, stop or hide mechanism. The element alone does not establish those conditions.",
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
      if (name === "aria-current" || name === "aria-invalid") continue;
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
  selector: "[role]:not(input):not(select):not(textarea)",
  evaluate(element, { accessibleName: accessibleName2 }) {
    const role = effectiveRole(element);
    if (![...AUTHOR_ONLY, ...FROM_CONTENT].includes(role)) return { status: "pass" };
    const name = FROM_CONTENT.includes(role) || element.labels?.length ? accessibleName2(element) : authorName(element);
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
    const label = element.getAttribute("aria-label");
    const attempt = label !== null ? `aria-label="${label}"` : (() => {
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
      const list2 = failing.join(" and ");
      const why = role === "separator" ? `this separator takes focus, so it is a resizing widget, but without aria-valuenow ${COST["aria-valuenow"]}` : failing.map((attr) => COST[attr]).join("; ");
      return {
        status: "fail",
        message: `role="${role}" without ${list2} \u2014 ${why}.`,
        fix: `Add ${list2} and keep it updated from your script, or use the native HTML element instead.`
      };
    }
    if (role === "combobox" && element.getAttribute("aria-expanded") !== "true") return { status: "pass" };
    const list = missing.join(" and ");
    return {
      status: "incomplete",
      message: `role="${role}" without ${list}, which ARIA lists as required for the role \u2014 ${missing.map((attr) => COST[attr]).join("; ")}. Check the control is usable with a screen reader; adding ${list} settles it.`
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
  evaluate(element, { accessibleName: accessibleName2 }) {
    const id = element.getAttribute("for");
    if (element.control) return { status: "pass" };
    const target = element.getRootNode().getElementById?.(id);
    if (target && target.tagName === "INPUT" && target.type === "hidden") return { status: "pass" };
    const wrapped = element.querySelector(WRAPPABLE);
    if (wrapped && !accessibleName2(wrapped)) {
      return {
        status: "fail",
        message: `This label wraps a <${wrapped.tagName.toLowerCase()}> but its for="${id}" ${target ? `points at a <${target.tagName.toLowerCase()}>, which is not labelable` : "points at nothing"}. The for attribute overrides the wrapping, so the wrapped control is not labelled by this text.`,
        fix: `Point the for attribute at the wrapped control's id, or remove the for attribute so the wrapping labels it.`
      };
    }
    return {
      status: "incomplete",
      message: target ? `for="${id}" points at a <${target.tagName.toLowerCase()}>, which is not a labelable element, so the browser ignores the association. Was a form control meant to be here? If so it has no label from this text (form-label reports the control itself); if this text captions something that is not a control, nothing is affected.` : `for="${id}" points at nothing, so this label is not associated with any control. Was a form control meant to be here? If so it has lost its label (form-label reports the control itself); if this is leftover markup, no one is affected.`,
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
    const exposed = (child) => !NEVER_RENDERED.has(child.tagName) && !child.closest('[aria-hidden="true"]') && !isInert(child) && (!isRendered || isRendered(child) || getComputedStyle(child).display === "contents");
    const invalid = [...element.children].filter((child) => !ALLOWED.has(child.tagName) && exposed(child));
    if (invalid.length) {
      const tags = [...new Set(invalid.map((child) => `<${child.tagName.toLowerCase()}>`))].join(", ");
      return {
        status: "fail",
        message: `This <dl> contains ${tags} directly \u2014 only <dt>, <dd> (optionally grouped in <div>) are allowed, otherwise the term/description pairing breaks.`,
        fix: "Restructure the list into <dt>/<dd> pairs, or use a different element."
      };
    }
    const emptyWrappers = [...element.children].filter((child) => child.tagName === "DIV" && exposed(child) && ![...child.children].some((inner) => inner.tagName === "DT" || inner.tagName === "DD"));
    if (emptyWrappers.length) {
      return {
        status: "fail",
        message: `${emptyWrappers.length} <div> wrapper(s) in this <dl> hold no <dt>/<dd> directly \u2014 the term/description pairing breaks when the pairs sit deeper than the wrapper.`,
        fix: "Make each <div> child of the <dl> contain its <dt>/<dd> pair directly, or flatten the pairs into the <dl> itself."
      };
    }
    const children = [...element.children].filter(exposed);
    const groups = [
      [...element.children].filter((child) => child.tagName !== "DIV"),
      ...children.filter((child) => child.tagName === "DIV").map((child) => [...child.children])
    ];
    for (const members of groups) {
      const group = members.filter(exposed);
      const concealedPairMember = members.some((child) => (child.tagName === "DT" || child.tagName === "DD") && !exposed(child));
      const concealedResult = {
        status: "incomplete",
        message: "A term or description in this group is hidden from assistive technology. Check that any disclosure control exposes the associated content when opened, and that the term and description relationship remains available."
      };
      let last = null;
      for (const child of group) {
        if (child.tagName !== "DT" && child.tagName !== "DD") continue;
        if (child.tagName === "DD" && last === null) {
          if (concealedPairMember) return concealedResult;
          return {
            status: "fail",
            message: "This description list has a description without a preceding term in its group.",
            fix: "Add a <dt> before the <dd>, or use a paragraph when the content is not a term and description."
          };
        }
        last = child.tagName;
      }
      if (last === "DT") {
        if (concealedPairMember) return concealedResult;
        return {
          status: "fail",
          message: "This description list ends a group with a term that has no description.",
          fix: "Follow the <dt> element or elements with at least one <dd> in the same group."
        };
      }
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
  evaluate(element, { accessibleName: accessibleName2, isVisible }) {
    const map = element.closest("map");
    const images = [...element.getRootNode().querySelectorAll("img[usemap], object[usemap]")];
    const active = map?.name && images.some((image) => image.getAttribute("usemap") === `#${map.name}` && isVisible(image));
    if (!active) return { status: "pass" };
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
      message: `The page refreshes or redirects itself after ${delay}s. Slow readers lose their place, or the whole page, and a meta refresh offers no way to turn that off, adjust it or extend it. 2.2.1 excuses a time limit only where it is part of a real-time event or essential; this finding assumes neither applies, since the tag cannot show it.`,
      fix: "Remove the timed refresh; let users act in their own time. If the page offers a control that turns the refresh off, or the refresh is essential, record that and dismiss this finding."
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
  // Prose in a generic container has the same requirement. F73 does not
  // limit colour-only links to paragraph markup. The text and shared-line
  // checks below keep navigation and separate blocks out of this lane.
  // https://www.w3.org/WAI/WCAG22/Techniques/failures/F73
  selector: "p a[href], dd a[href], blockquote a[href], td a[href], li a[href], div a[href]",
  visibility: "visual",
  // colour distinction is a purely visual concern
  evaluate(element, { ownText }) {
    const parent = element.closest("p, dd, blockquote, td, li, div");
    if (!element.textContent.trim() || !parent) return { status: "pass" };
    const surroundingText = ownText(parent).trim();
    if (!/[\p{L}\p{N}]/u.test(surroundingText)) return { status: "pass" };
    const shortContext = surroundingText.replace(/\s+/g, "").length < 10;
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
      if (ownBackground && ownBackground.a > 0) {
        const surroundings = effectiveBackground(parent);
        if (!surroundings) unclear = true;
        else {
          const shown2 = composite(ownBackground, surroundings);
          if (["r", "g", "b"].some((channel2) => Math.round(shown2[channel2]) !== Math.round(surroundings[channel2]))) return { status: "pass" };
        }
      }
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
    const glyphColours = cueBearers.filter(({ el }) => ownText(el)).map(({ s }) => s.webkitTextFillColor || s.color);
    const distinctColours = [...new Set(glyphColours)];
    if (distinctColours.length > 1) {
      return { status: "incomplete", message: "This link presents text in several colours without a detected non-colour cue. Check that each part is distinguishable from the surrounding text." };
    }
    let linkColor = parseColor(distinctColours[0] || style.webkitTextFillColor || style.color);
    let textColor = parseColor(parentStyle.webkitTextFillColor || parentStyle.color);
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
    if (shortContext) {
      return {
        status: "incomplete",
        message: `This link has no detected non-colour cue and only ${shown}:1 colour difference from nearby text. The surrounding text is a short fragment. Check whether it forms a sentence or other prose with the link; if it does, colour alone does not distinguish the link sufficiently.`,
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
var roleOf = effectiveRole;
function composedDescendants(element) {
  const found = [];
  const pending = [element];
  const seen = /* @__PURE__ */ new Set();
  const enter = (el) => {
    if (seen.has(el)) return;
    seen.add(el);
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
      const target = root.getElementById?.(id);
      if (target) found.push(target, ...composedDescendants(target));
    }
  }
  return found;
}
function exposedChild(element, isVisible) {
  if (isVisible(element)) return true;
  if (element.tagName !== "OPTION") return false;
  const select = element.closest("select");
  return !!select && isVisible(select);
}
var aria_required_children_default = {
  id: "aria-required-children",
  name: "Required ARIA children",
  impact: "critical",
  tags: ["wcag2a", "wcag131"],
  help: "Composite ARIA roles must contain their required children",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
  selector: "[role]",
  evaluate(element, { isVisible }) {
    if (element.getAttribute("aria-busy") === "true") return { status: "pass" };
    const role = effectiveRole(element);
    const required = REQUIRED_CHILDREN[role];
    if (!required) return { status: "pass" };
    const children = [...element.children, ...element.shadowRoot?.children ?? []].filter((c) => !c.matches("script, style, template"));
    if (!children.length && !element.hasAttribute("aria-owns")) return { status: "pass" };
    if (candidateDescendants(element).some((child) => required.includes(roleOf(child)) && exposedChild(child, isVisible))) {
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
var aria_required_parent_default = {
  id: "aria-required-parent",
  name: "Required ARIA parent",
  impact: "critical",
  tags: ["wcag2a", "wcag131"],
  help: "ARIA child roles must be inside their required container role",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
  selector: "[role]",
  evaluate(element) {
    const role = effectiveRole(element);
    const containers = REQUIRED_PARENT[role];
    if (!containers) return { status: "pass" };
    const named2 = containers.filter((container) => container !== "group");
    if (element.id) {
      const owner = element.getRootNode().querySelector?.(`[aria-owns~="${CSS.escape(element.id)}"]`);
      const ownerRole = owner && effectiveRole(owner);
      if (ownerRole && containers.includes(ownerRole)) return { status: "pass" };
    }
    const flatParent = (node) => node.assignedSlot ?? node.parentElement ?? (node.getRootNode() instanceof ShadowRoot ? node.getRootNode().host : null);
    for (let parent = flatParent(element); parent; parent = flatParent(parent)) {
      if (parent.tagName === "SLOT" && !parent.hasAttribute("role")) continue;
      const parentRole = effectiveRole(parent);
      if (containers.includes(parentRole)) return { status: "pass" };
      if (parentRole === "group") continue;
      if (parentRole === "presentation" || parentRole === "none") continue;
      if (parentRole && parentRole !== "generic") break;
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
        status: "incomplete",
        message: "This region scrolls, has no detected tabbable content and is removed from sequential focus by a negative tabindex. Check whether keyboard-operable controls elsewhere scroll it or move focus into it; without such a mechanism, the overflowed content may be unreachable.",
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
        const target = element.getRootNode().getElementById?.(id);
        return !target || !cells.includes(target) || !isHeaderCell(target);
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
      const filled = cells.filter((cell) => cell.textContent.trim());
      const navigational = filled.every((cell) => {
        const controls = [...cell.querySelectorAll("a, button")];
        return controls.length && controls.map((control) => control.textContent.trim()).join(" ").replace(/\s+/g, " ") === cell.textContent.trim().replace(/\s+/g, " ");
      });
      if (navigational) {
        return {
          status: "incomplete",
          message: 'This table has no header cells and every cell holds only a link or a button, which is the shape of a navigation block laid out as a table. If it presents data, mark its header cells with <th>; if it is layout, add role="presentation".'
        };
      }
      const twoColumns = Math.max(0, ...rows.map((row) => row.cells.length)) === 2;
      return {
        status: "fail",
        message: 'This looks like a data table but has no header cells, so screen reader users get the data with no way to tell what each row or column means. If it only arranges content, mark it role="presentation" and dismiss this finding.',
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
    if (hasPaintEffects(element)) {
      return { status: "incomplete", message: "A filter or blend mode changes the colours presented inside this field. Check the resulting text contrast by eye." };
    }
    const own = parseColor(style.backgroundColor);
    let background;
    if (style.backgroundImage !== "none") {
      const layers = splitBackgroundLayers(style.backgroundImage);
      const range = layers.length === 1 && layers[0].includes("gradient(") ? sampledGradientRange(layers[0]) : null;
      const fullBox = /^(auto|auto auto)$/.test(style.backgroundSize) && style.backgroundPosition === "0% 0%" && ["repeat", "no-repeat"].includes(style.backgroundRepeat);
      if (!range || range.min !== range.max || opacity < 1 || !fullBox) {
        return { status: "incomplete", message: "An image or gradient paints this field background. Check its text against the pixels behind it." };
      }
      background = range.minColor;
    } else if (own && own.a >= 1) {
      background = own;
    } else {
      if (backgroundImageSource(element)) {
        return {
          status: "incomplete",
          message: "This field is see-through and sits over a background image or gradient, so its real text contrast depends on the pixels behind it. Check it by eye."
        };
      }
      const behind = effectiveBackground(element);
      background = behind;
    }
    if (!background) {
      return { status: "incomplete", message: "The control\u2019s background could not be determined \u2014 check its text contrast by eye." };
    }
    const required = isLargeText(style) ? 3 : 4.5;
    let unresolvedGroup = false;
    const judge = (color, what, ownOpacity = 1) => {
      const parsed = parseColor(color);
      if (!parsed || parsed.a === 0) return null;
      if (opacity < 1) {
        const group = opacityGroupPaint(element, { ...parsed, a: parsed.a * ownOpacity });
        if (group?.unresolved) {
          unresolvedGroup = true;
          return null;
        }
        if (group) {
          const ratio2 = contrastRatio(group.foreground, group.background);
          return ratio2 >= required ? null : { what, ratio: ratio2 };
        }
      }
      const painted = opacity * ownOpacity;
      const faded = painted < 1 ? { ...parsed, a: parsed.a * painted } : parsed;
      const fg = faded.a < 1 ? composite(faded, background) : faded;
      const ratio = contrastRatio(fg, background);
      if (ratio >= required) return null;
      return { what, ratio };
    };
    const failures = [];
    const valueVerdict = judge(style.webkitTextFillColor || style.color, "value text");
    if (valueVerdict) failures.push(valueVerdict);
    if (element.getAttribute("placeholder")?.trim() && element.matches(":placeholder-shown")) {
      let placeholderColor = null;
      let placeholderOpacity = 1;
      try {
        const placeholderStyle = getComputedStyle(element, "::placeholder");
        placeholderColor = placeholderStyle.webkitTextFillColor || placeholderStyle.color;
        const parsedOpacity = parseFloat(placeholderStyle.opacity);
        if (Number.isFinite(parsedOpacity)) placeholderOpacity = Math.min(1, Math.max(0, parsedOpacity));
      } catch {
      }
      if (placeholderColor && (placeholderColor !== style.color || placeholderOpacity < 1)) {
        const verdict = judge(placeholderColor, "placeholder text", placeholderOpacity);
        if (verdict) failures.push(verdict);
      }
    }
    if (unresolvedGroup) return { status: "incomplete", message: "The field and its text fade together over an unresolved background. Check the presented text contrast by eye." };
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
      if (wrapperHasBorder) {
        const around = effectiveBackground(wrapper.parentElement ?? wrapper);
        const contrastingBorder = around && ["Top", "Right", "Bottom", "Left"].some((side) => {
          if (!(parseFloat(wrapperStyle[`border${side}Width`]) > 0) || wrapperStyle[`border${side}Style`] === "none") return false;
          const colour = parseColor(wrapperStyle[`border${side}Color`]);
          return colour && contrastRatio(composite(colour, around), around) >= 3;
        });
        if (contrastingBorder) return { status: "pass" };
      }
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
    if (elements.length > 2e4) {
      return elements.map((_, index) => index === 0 ? { status: "incomplete", message: `The text-spacing probe was not run because this page has ${elements.length} candidate elements, exceeding its 20,000-element budget. Check the page with the WCAG spacing overrides applied.` } : { status: "skipped" });
    }
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
    const probes = [probe2];
    for (const root of new Set(candidates.filter(Boolean).map((element) => element.getRootNode()))) {
      if (root === doc || !root.host) continue;
      const scoped = probe2.cloneNode(true);
      root.append(scoped);
      probes.push(scoped);
    }
    let after;
    try {
      void doc.documentElement.offsetHeight;
      after = candidates.map((element) => element && clipped(element));
    } finally {
      for (const applied of probes) applied.remove();
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
      message: `The page already scrolls horizontally by ${Math.round(overflow)}px at the current viewport. Verify content reflows at 320 CSS px width (data tables, maps and images are exempt).`
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
function createFocusObscuredRule({ id, name, tags, help, helpUrl, partial }) {
  return {
    id,
    name,
    impact: "serious",
    tags,
    help,
    helpUrl,
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
      const contained = (rect, overlay) => rect.left >= overlay.left && rect.right <= overlay.right && rect.top >= overlay.top && rect.bottom <= overlay.bottom;
      const overlaps = (rect, overlay) => Math.min(rect.right, overlay.right) - Math.max(rect.left, overlay.left) > 0 && Math.min(rect.bottom, overlay.bottom) - Math.max(rect.top, overlay.top) > 0;
      const clampX = (x) => Math.min(Math.max(x, 0), win.innerWidth - 1);
      const clampY = (y) => Math.min(Math.max(y, 0), win.innerHeight - 1);
      const blockerAt = (element, rect, x, y) => {
        const stack = doc.elementsFromPoint(clampX(x), clampY(y));
        const index = stack.indexOf(element);
        if (index <= 0) return null;
        const above = stack.slice(0, index);
        return above.find((layer) => !layer.contains(element) && !element.contains(layer) && isObscuringOverlay(layer) && (partial ? overlaps : contained)(rect, layer.getBoundingClientRect())) ?? null;
      };
      return elements.map((element) => {
        if (element.matches(":disabled")) return { status: "pass" };
        if (isInert(element)) return { status: "pass" };
        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return { status: "pass" };
        if (rect.bottom < 0 || rect.right < 0 || rect.top > win.innerHeight || rect.left > win.innerWidth) {
          return { status: "pass" };
        }
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        let blocker = blockerAt(element, rect, cx, cy);
        if (!blocker && partial) {
          const inset = 1;
          const xs = [rect.left + inset, cx, rect.right - inset];
          const ys = [rect.top + inset, cy, rect.bottom - inset];
          for (const x of xs) {
            for (const y of ys) {
              if (x === cx && y === cy) continue;
              blocker = blockerAt(element, rect, x, y);
              if (blocker) break;
            }
            if (blocker) break;
          }
        }
        if (!blocker) return { status: "pass" };
        const panel = blocker.getBoundingClientRect();
        const edge = panel.top <= 1 && panel.bottom < win.innerHeight ? "top" : panel.bottom >= win.innerHeight - 1 ? "bottom" : null;
        if (edge && edgeReserved(doc, edge, panel.height)) return { status: "pass" };
        return partial ? {
          status: "incomplete",
          message: "Part of this element is currently underneath an opaque fixed panel. 2.4.12 (AAA) allows no part of a focused component to be hidden by author content, and whether that happens depends on where the page sits when focus reaches it \u2014 the browser does not scroll an element that is already in the viewport, merely overlapped, so focus can land half-hidden. Tab through the page and check the whole element, indicator included, stays clear of the panel.",
          fix: `Reserve room for the panel with scroll-padding-${edge ?? "bottom"} on the scrolling container, or move focus clear of it when the panel is up.`
        } : {
          status: "incomplete",
          message: "This element is currently underneath an opaque fixed panel. Whether that breaks 2.4.11 depends on where the page sits when focus reaches it \u2014 the browser does not scroll an element that is already in the viewport, merely covered, so focus can land invisibly. Tab through the page and check the focus indicator is never entirely hidden.",
          fix: `Reserve room for the panel with scroll-padding-${edge ?? "bottom"} on the scrolling container, or move focus clear of it when the panel is up.`
        };
      });
    }
  };
}
var focus_not_obscured_default = createFocusObscuredRule({
  id: "focus-not-obscured",
  name: "Unobscured focus",
  tags: ["wcag22aa", "wcag2411"],
  help: "Focused elements must not be fully hidden behind overlays",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html",
  partial: false
});

// src/engine/rules/wcag/3.3.8-auth-field-obstruction.js
var auth_field_obstruction_default = {
  id: "auth-field-obstruction",
  name: "Accessible login fields",
  impact: "serious",
  // 3.3.9 (AAA) drops 3.3.8's object-recognition and personal-content
  // exceptions and keeps everything this rule looks at: F109 is listed as a
  // failure of both. Twin-tagged on the 2.1.1/2.1.3 precedent.
  tags: ["wcag22aa", "wcag338", "wcag339"],
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
      return {
        status: "incomplete",
        message: `This field has a paste handler containing cancellation code and sets autocomplete="off". Check whether the handler actually blocks pasting, whether a password manager can fill the field, and whether another authentication method is available. Conditional code may leave pasting enabled, and autocomplete="off" does not establish that password-manager entry is blocked.${provenLogin ? "" : ` ${scopeQuestion}`}`,
        fix: 'Remove the paste blocking, and drop autocomplete="off" so a password manager can fill the field.'
      };
    }
    if (blocksPaste) {
      return {
        status: "incomplete",
        message: `This field has a paste handler containing cancellation code. Check whether pasting is actually blocked; the code may run only conditionally. Also check whether a password manager can complete ${step}, or whether the page offers another way in such as a passkey or a federated sign-in.${provenLogin ? "" : ` ${scopeQuestion}`}`,
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
      const target = id && byId(id);
      if (target && (target === video || target.contains(video))) return control;
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
    const seen = /* @__PURE__ */ new Map();
    for (const field of element.querySelectorAll("input[autocomplete], select[autocomplete], textarea[autocomplete]")) {
      if (field.disabled || field.readOnly) continue;
      if (!isVisible(field)) continue;
      if (field instanceof HTMLInputElement && (field.type === "hidden" || field.type === "password")) continue;
      const purpose = (field.getAttribute("autocomplete") || "").trim().toLowerCase().replace(/\s+/g, " ");
      if (!purpose || EXEMPT.has(purpose)) continue;
      if (seen.has(purpose)) {
        return {
          status: "incomplete",
          message: `This form asks for "${purpose}" twice \u2014 3.3.7 says information the user already entered must be auto-populated or selectable, not typed again. A deliberate confirmation field can be essential (the criterion's own escape); that judgement is yours.`,
          fix: "Auto-populate the second field from the first, offer the earlier value for selection, or drop the duplicate. Keep it only if re-entry is genuinely essential here.",
          data: { purpose }
        };
      }
      seen.set(purpose, field);
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
    if (element.matches(":disabled") || !element.matches('button, input[type="button"]')) return { status: "pass" };
    const root = element.getRootNode();
    const lookup = (id) => id && root.getElementById?.(id) || null;
    const problems = [];
    if (element.hasAttribute("popovertarget")) {
      const id = element.getAttribute("popovertarget").trim();
      const target = lookup(id);
      if (!target) {
        problems.push(`popovertarget="${id}" names no element in this document`);
      } else if (!target.hasAttribute("popover")) {
        problems.push(`popovertarget="${id}" points at a <${target.tagName.toLowerCase()}> with no popover attribute, which the button cannot open`);
      }
    }
    if (element.tagName === "BUTTON" && element.hasAttribute("commandfor")) {
      const id = element.getAttribute("commandfor").trim();
      const command = (element.getAttribute("command") ?? "").trim().toLowerCase();
      const target = lookup(id);
      if (!target) {
        problems.push(`commandfor="${id}" names no element in this document`);
      } else if (!command) {
        problems.push("commandfor has no command attribute, so activating the button does nothing");
      } else if (POPOVER_COMMANDS.has(command) && !target.hasAttribute("popover")) {
        problems.push(`command="${command}" needs a popover, and "${id}" has no popover attribute`);
      } else if (DIALOG_COMMANDS.has(command) && target.tagName !== "DIALOG") {
        problems.push(`command="${command}" needs a <dialog>, and "${id}" is a <${target.tagName.toLowerCase()}>`);
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
  let seen = 0;
  for (const subject of subjects) {
    if (seen++ >= 5) break;
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
  let count = 0;
  for (const animation of animations) {
    if (!animation.timeline || animation.timeline === doc.timeline) continue;
    let keyframes;
    try {
      keyframes = animation.effect?.getKeyframes?.() ?? [];
    } catch {
      continue;
    }
    if (keyframesMove(keyframes)) count += 1;
  }
  return count;
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
    const hasText = (targets) => targets.some((target) => isVisible(target) && (target.textContent.trim() || accessibleName2(target)));
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
  selector: "[role]",
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

// src/engine/rules/wcag/2.2.4-meta-refresh-no-exceptions.js
var meta_refresh_no_exceptions_default = {
  id: "meta-refresh-no-exceptions",
  name: "Timed refresh (AAA)",
  impact: "serious",
  tags: ["wcag2aaa", "wcag224", "wcag325"],
  help: "The page must not refresh or redirect itself on any timer (AAA)",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/interruptions.html",
  selector: 'meta[http-equiv="refresh" i]',
  visibleOnly: false,
  evaluate(element) {
    const content = element.getAttribute("content") ?? "";
    const delay = refreshDelay(content);
    if (delay === null) return { status: "pass" };
    const hasDestination = refreshDestination(content) !== "";
    if (delay === 0 && hasDestination) return { status: "pass" };
    if (!hasDestination) {
      return {
        status: "fail",
        message: `The page reloads itself${delay > 0 ? ` every ${delay}s` : " immediately, over and over"} (failure F41). The reader cannot postpone or suppress the reload, which 2.2.4 requires, and it changes the page without being asked, which 3.2.5 forbids. Neither AAA criterion has 2.2.1's 20-hour allowance.`,
        fix: "Remove the timed refresh and update the content in place, or let the reader request an update with a control."
      };
    }
    return {
      status: "fail",
      message: `The page redirects itself after ${delay}s (failure F40). The reader cannot postpone or suppress the move, which 2.2.4 requires, and the change of context is not requested, which 3.2.5 forbids; the AAA criteria allow no 20-hour exemption. 2.2.4 excuses only an emergency, which the tag cannot show, so this finding assumes there is none.`,
      fix: 'Redirect instantly (content="0; url=\u2026") or on the server, or give the reader a link and let them choose when to move.'
    };
  }
};

// src/engine/rules/wcag/2.4.12-focus-not-obscured-enhanced.js
var focus_not_obscured_enhanced_default = createFocusObscuredRule({
  id: "focus-not-obscured-enhanced",
  name: "Fully unobscured focus",
  tags: ["wcag22aaa", "wcag2412"],
  help: "No part of a focused element may be hidden behind overlays (AAA)",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html",
  partial: true
});

// src/engine/rules/wcag/1.2.3-video-audio-description.js
var video_audio_description_default = {
  id: "video-audio-description",
  name: "Video audio description",
  impact: "serious",
  tags: ["wcag2a", "wcag123", "wcag125"],
  help: "Video content needs audio description or a text alternative",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html",
  selector: "video",
  visibleOnly: false,
  evaluate(element) {
    if (element.querySelector('track[kind="descriptions" i]')) return { status: "pass" };
    if (!element.currentSrc && !element.getAttribute("src") && !element.querySelector("source")) {
      return { status: "pass" };
    }
    if (element.muted && !element.controls) return { status: "pass" };
    return {
      status: "incomplete",
      message: "This video has no audio-description track. If it shows something its soundtrack does not say (text on screen, actions, charts, who is speaking), blind and low-vision users miss it. 1.2.5 asks for audio description; at Level A, 1.2.3 is also met by a full text alternative describing the visuals, linked near the player. A talking-head video whose soundtrack already carries everything needs neither, and a video with no soundtrack at all is 1.2.1's question instead: check which this is, and where the description or alternative lives.",
      fix: 'Provide a described audio track or a described version of the video (a <track kind="descriptions"> file works for text-based description), or publish a full transcript that describes the visuals next to the player.'
    };
  }
};

// src/engine/rules/wcag/2.4.6-heading-label-placeholder.js
var SCAFFOLD = /* @__PURE__ */ new Set([
  "add your heading text here",
  "add a heading",
  "add heading",
  "your heading here",
  "heading here",
  "your title goes here",
  "your title here",
  "title goes here",
  "title here",
  "insert title here",
  "insert heading here",
  "heading text",
  "heading goes here",
  "section title here",
  "placeholder",
  "placeholder text",
  "placeholder heading",
  "label text",
  "your label here",
  "text here",
  "enter text here",
  "your text here",
  "type here",
  "sample heading",
  "sample text",
  "dummy text",
  "dummy heading",
  "todo",
  "tbd",
  "xxx",
  "xxxx",
  "asdf",
  "this is a heading",
  "this is a title",
  "this is the heading",
  "this is a label",
  "new heading",
  "new label",
  "new section"
]);
var GENERIC2 = /* @__PURE__ */ new Set([
  "heading",
  "title",
  "subtitle",
  "headline",
  "label",
  "untitled",
  "header",
  "text",
  "default",
  "section",
  "section title",
  "section heading",
  "page title",
  "field",
  "input"
]);
var NUMBERED = /^(?:heading|title|label|h)\s*[1-6]$/;
var heading_label_placeholder_default = {
  id: "heading-label-placeholder",
  name: "Placeholder headings and labels",
  impact: "moderate",
  tags: ["wcag2aa", "wcag246"],
  help: "Headings and labels must describe their topic or purpose, not be template text",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html",
  selector: 'h1, h2, h3, h4, h5, h6, [role="heading"], label, legend',
  evaluate(element) {
    const role = element.getAttribute("role");
    if (/^h[1-6]$/i.test(element.tagName) && role && role !== "heading") return { status: "pass" };
    const text = (element.textContent ?? "").replace(/\s+/g, " ").trim();
    if (!text) return { status: "pass" };
    const normalized = text.toLowerCase().replace(/[\s.:!…-]+$/, "");
    const kind = /^h[1-6]$/i.test(element.tagName) || role === "heading" ? "heading" : "label";
    if (SCAFFOLD.has(normalized) || normalized.startsWith("lorem ipsum") || NUMBERED.test(normalized)) {
      return {
        status: "fail",
        message: `\u201C${text}\u201D is template text left in a ${kind}. It describes nothing, so a screen-reader user scanning by ${kind}s, or anyone reading the form, learns nothing from it.`,
        fix: kind === "heading" ? "Replace it with words that name what the section is about." : "Replace it with words that name what the field asks for."
      };
    }
    if (GENERIC2.has(normalized)) {
      return {
        status: "incomplete",
        message: `\u201C${text}\u201D is a generic ${kind}. Check whether it describes the topic of its section or the purpose of its field; the same word can also be a real subject or name.`,
        fix: kind === "heading" ? "Name the section's actual topic in the heading." : "Name what the field asks for in the label."
      };
    }
    return { status: "pass" };
  }
};

// src/engine/rules/wcag/1.4.8-text-justified.js
var BLOCK = /^(?:block|list-item|table-cell|flow-root)$/;
function inlineText(element) {
  let text = "";
  for (const node of element.childNodes) {
    if (node.nodeType === 3) text += node.textContent;
    else if (node.nodeType === 1 && getComputedStyle(node).display.startsWith("inline")) text += node.textContent;
  }
  return text.replace(/\s+/g, " ").trim();
}
var text_justified_default = {
  id: "text-justified",
  name: "Justified text",
  impact: "moderate",
  tags: ["wcag2aaa", "wcag148"],
  help: "Blocks of text should not be justified to both margins (AAA)",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html",
  selector: "p, li, dd, dt, td, th, blockquote, figcaption, summary, address, div, section, article, main, aside, header, footer",
  evaluate(element) {
    const style = getComputedStyle(element);
    if (style.textAlign !== "justify" && style.textAlign !== "justify-all") return { status: "pass" };
    if (!BLOCK.test(style.display)) return { status: "pass" };
    if (inlineText(element).length < 120) return { status: "pass" };
    return {
      status: "incomplete",
      message: 'This block of text is justified to both margins. The uneven spaces between words form "rivers of white" down the page that some readers with dyslexia or low vision cannot read across (failure F88). 1.4.8 allows justified text only where a mechanism lets the reader switch it off; check that one exists, in the page or the browser.',
      fix: "Set text-align: start (or left) on running text, or offer a control that turns justification off."
    };
  }
};

// src/engine/rules/wcag/2.4.10-section-heading.js
var HEADING = 'h1, h2, h3, h4, h5, h6, [role="heading"]';
var SUBSTANTIVE = "img, svg, video, audio, canvas, iframe, input, select, textarea, button";
var SKIP = "script, style, template, noscript";
function edgeIsHeading(element, fromEnd) {
  const children = (node) => fromEnd ? [...node.childNodes].reverse() : [...node.childNodes];
  const stack = children(element).reverse();
  while (stack.length) {
    const node = stack.pop();
    if (node.nodeType === 3) {
      if (node.textContent.trim()) return false;
      continue;
    }
    if (node.nodeType !== 1) continue;
    if (node.matches(HEADING)) return true;
    if (node.matches(SKIP)) continue;
    if (node.matches(SUBSTANTIVE)) return false;
    for (const child of children(node).reverse()) stack.push(child);
  }
  return false;
}
var section_heading_default = {
  id: "section-heading",
  name: "Section headings",
  impact: "moderate",
  tags: ["wcag2aaa", "wcag2410"],
  help: "Sections of written content should begin with a heading (AAA)",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/section-headings.html",
  selector: "section",
  evaluate(element) {
    if (element.hasAttribute("aria-label") || element.hasAttribute("aria-labelledby")) return { status: "pass" };
    const role = element.getAttribute("role");
    if (role && role !== "region") return { status: "pass" };
    const ownHeading = [...element.querySelectorAll(HEADING)].some((heading) => heading.closest("section, article") === element);
    if (ownHeading || edgeIsHeading(element, false)) return { status: "pass" };
    const before = element.previousElementSibling;
    if (before && (before.matches(HEADING) || before.matches("header, hgroup") && before.querySelector(HEADING) || edgeIsHeading(before, true))) {
      return { status: "pass" };
    }
    const item = element.closest("article");
    if (item && item.parentElement && !item.querySelector(HEADING)) {
      const items = (node) => [...node.children].filter((child) => child.matches("article") || child.querySelector(":scope > article")).length;
      const container = item.parentElement;
      if (items(container) >= 3 || container.parentElement && items(container.parentElement) >= 3) return { status: "pass" };
    }
    const text = (element.textContent ?? "").replace(/\s+/g, " ").trim();
    const paragraphs = element.querySelectorAll("p").length;
    if (text.length < 200 && paragraphs < 2) return { status: "pass" };
    return {
      status: "incomplete",
      message: "This section holds written content but begins with no heading of its own, so readers scanning by headings cannot find or skip it. 2.4.10 asks for a heading at the start of each section of writing; check whether this is a section of content that needs one, or a purely structural wrapper.",
      fix: "Start the section with a heading that names its topic, at the level below its parent heading, or name it with aria-labelledby pointing at its visible title."
    };
  }
};

// src/engine/rules/wcag/3.3.9-captcha-alternative.js
var CREDENTIAL = 'input[type="password"], input[autocomplete~="current-password"], input[autocomplete~="one-time-code"]';
var captcha_alternative_default = {
  id: "captcha-alternative",
  name: "CAPTCHA in a login step",
  impact: "serious",
  tags: ["wcag22aaa", "wcag339"],
  help: "A picture-puzzle CAPTCHA in an authentication step needs an alternative (AAA)",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html",
  selector: 'iframe[src*="recaptcha" i], iframe[src*="hcaptcha" i], iframe[src*="turnstile" i], .g-recaptcha, .h-captcha, .cf-turnstile, [data-sitekey]',
  visibleOnly: false,
  evaluate(element) {
    const form = element.closest("form");
    if (!form || !form.querySelector(CREDENTIAL)) return { status: "pass" };
    return {
      status: "incomplete",
      message: "This login form carries a CAPTCHA widget. If the challenge can escalate to a picture puzzle, that is object recognition, which 3.3.8 allows but 3.3.9 (AAA) does not: a cognitive function test in an authentication step then needs another way in (a passkey, an emailed link, a federated sign-in) or a mechanism that helps the user through it. Check what the widget can show and what the alternatives are.",
      fix: "Use a risk-based or invisible challenge that never shows a puzzle, or offer another authentication method beside it."
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
      const target = id && (doc.getElementById(id) || doc.getElementsByName(id)[0]);
      const looksLikeSkip = /^skip\b/i.test(link.textContent.trim());
      const firstLandmark = doc.querySelector(LANDMARK);
      const beforeLandmarks = !firstLandmark || link.compareDocumentPosition(firstLandmark) & Node.DOCUMENT_POSITION_FOLLOWING;
      if ((target || looksLikeSkip) && beforeLandmarks) return { status: "pass" };
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

// src/engine/rules/wcag/1.3.6-region-purpose.js
var region_purpose_default = {
  id: "region-purpose",
  name: "Regions with a purpose",
  impact: "moderate",
  tags: ["wcag21aaa", "wcag136"],
  help: "The purpose of page regions should be programmatically determinable (AAA)",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/identify-purpose.html",
  selector: "html",
  visibleOnly: false,
  evaluate(element) {
    const doc = element.ownerDocument;
    if (doc.querySelector(LANDMARK)) return { status: "pass" };
    return {
      status: "incomplete",
      message: "This page declares no landmark regions (no main, nav, header, footer, aside, search or labelled region), so the purpose of its regions is not exposed to assistive technology or personalisation tools. 1.3.6 (AAA) lists landmarks as the way to identify regions; the purpose of components and icons still needs a person to check.",
      fix: "Wrap the page's regions in <main>, <nav>, <header>, <footer>, <aside> and labelled <section> elements (or the matching ARIA roles)."
    };
  }
};

// src/engine/rules/wcag/3.3.4-financial-form-confirmation.js
var financial_form_confirmation_default = {
  id: "financial-form-confirmation",
  name: "Payment form safeguards",
  impact: "serious",
  tags: ["wcag2aa", "wcag334"],
  help: "A form that takes a payment must be reversible, checked or confirmed before submission",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html",
  selector: "form",
  visibleOnly: false,
  evaluate(element) {
    if (!element.querySelector('input[autocomplete*="cc-" i], input[autocomplete~="transaction-amount" i]')) return { status: "pass" };
    return {
      status: "incomplete",
      message: "This form collects card details, so submitting it makes a financial transaction. 3.3.4 requires at least one of: the submission can be reversed, the entries are checked for errors with a chance to correct them, or a review-and-confirm step comes before the final submit. Check which applies to this checkout.",
      fix: "Add a review page before the final submit, validate the entries and let the user correct them, or state a period in which the order can be amended or cancelled."
    };
  }
};

// src/engine/rules/wcag/2.5.1-pointer-gesture-alternative.js
var HANDLED = /* @__PURE__ */ new Set(["auto", "manipulation"]);
function handsGestureToScript(value) {
  if (!value || HANDLED.has(value)) return false;
  const tokens = value.split(/\s+/);
  if (tokens.includes("none")) return true;
  const panX = tokens.some((t) => /^pan-(x|left|right)$/.test(t));
  const panY = tokens.some((t) => /^pan-(y|up|down)$/.test(t));
  return !panX || !panY;
}
var pointer_gesture_alternative_default = {
  id: "pointer-gesture-alternative",
  name: "Pointer gesture alternative",
  impact: "serious",
  tags: ["wcag21a", "wcag251"],
  help: "Swipe, pan and pinch gestures need a single-pointer alternative",
  helpUrl: "https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html",
  selector: "*",
  visibleOnly: false,
  evaluateAll(elements, { isRendered }) {
    const candidates = /* @__PURE__ */ new Set();
    for (const element of elements) {
      const tag = element.tagName;
      if (tag === "HTML" || tag === "BODY" || tag === "SCRIPT" || tag === "STYLE" || tag === "LINK" || tag === "META" || tag === "TEMPLATE") continue;
      if (element.getAttribute("draggable") === "true" || element.getAttribute("role") === "slider" || tag === "INPUT" && element.type === "range") continue;
      const rect = element.getBoundingClientRect();
      if (rect.width < 100 || rect.height < 60) continue;
      if (!isRendered(element)) continue;
      const value = getComputedStyle(element).touchAction;
      if (!handsGestureToScript(value)) continue;
      candidates.add(element);
    }
    const outermost = /* @__PURE__ */ new Set();
    const reportedParents = /* @__PURE__ */ new Set();
    for (const element of candidates) {
      let nested = false;
      for (let parent = element.parentElement; parent; parent = parent.parentElement) {
        if (candidates.has(parent)) {
          nested = true;
          break;
        }
      }
      if (nested || reportedParents.has(element.parentElement)) continue;
      reportedParents.add(element.parentElement);
      outermost.add(element);
    }
    return elements.map((element) => {
      if (!outermost.has(element)) return { status: "pass" };
      const value = getComputedStyle(element).touchAction;
      const tokens = value.split(/\s+/);
      const handled = tokens.includes("none") ? "every touch gesture" : [
        !tokens.some((t) => /^pan-(x|left|right)$/.test(t)) && "horizontal swipes",
        !tokens.some((t) => /^pan-(y|up|down)$/.test(t)) && "vertical swipes"
      ].filter(Boolean).join(" and ");
      return {
        status: "incomplete",
        message: `touch-action: ${value} tells the browser to hand ${handled} on this element to the page's own script, which is how custom swipe, pan and pinch interactions are built. 2.5.1 requires whatever those gestures do to also work with a single tap or click (previous and next buttons, zoom in and out, a choose-a-value control), unless the gesture is essential. Check a single-pointer way exists for everything the gesture does.`,
        fix: "Add plain buttons for the same actions (previous/next, zoom in/out), or make the element operable by simple clicks as well as gestures."
      };
    });
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
      const skipped = previous > 0 && current > previous + 1;
      const outcome2 = skipped ? {
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
    const count = collectRoots(element.ownerDocument).flatMap((root) => [...root.querySelectorAll('main, [role="main"]')]).filter(isVisible).length;
    if (count === 1) return { status: "pass" };
    return {
      status: "fail",
      message: count === 0 ? "No <main> landmark \u2014 screen-reader users have no shortcut to the primary content." : `${count} main landmarks \u2014 "skip to main" becomes ambiguous.`,
      fix: count === 0 ? "Wrap the primary content in a single <main> element." : "Keep one <main>; demote the others to <section> or <div>."
    };
  }
};

// src/engine/rules/best-practice/page-heading-one.js
var HEADING2 = 'h1, h2, h3, h4, h5, h6, [role="heading"]';
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
    const hasLevelOne = collectRoots(element.ownerDocument).some((root) => [...root.querySelectorAll(HEADING2)].some((heading) => level(heading) === 1));
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
  const table = tag === "table" ? element : element.closest("table");
  if (table && !TABLE_DISPLAY.table.includes(getComputedStyle(table).display)) return true;
  const native = TABLE_DISPLAY[tag];
  return !!native && !native.includes(getComputedStyle(element).display);
}
function markerRemoved(item) {
  if (getComputedStyle(item).listStyleType === "none") return true;
  const marker = getComputedStyle(item, "::marker").content;
  return marker === "none" || marker === '""' || marker === "''";
}
function listMarkersRemoved(list) {
  if (getComputedStyle(list).listStyleType === "none") return true;
  for (const child of list.children) {
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
      const list = element.closest("ul, ol");
      if (list && getComputedStyle(list).listStyleType === "none") return { status: "pass" };
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
    const label = element.getAttribute("aria-label").replace(/\s+/g, " ").trim().toLowerCase();
    const visible = element.textContent.replace(/\s+/g, " ").trim().toLowerCase();
    if (!visible || label !== visible) return { status: "pass" };
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
    const groups = /* @__PURE__ */ new Map();
    elements.forEach((element, index) => {
      const owner = element.form ?? element.getRootNode();
      if (!groups.has(owner)) groups.set(owner, /* @__PURE__ */ new Map());
      const byName = groups.get(owner);
      const key = `${element.type}::${element.name}`;
      if (!byName.has(key)) byName.set(key, []);
      byName.get(key).push(index);
    });
    const outcomes = elements.map(() => ({ status: "pass" }));
    for (const indexes of [...groups.values()].flatMap((byName) => [...byName.values()])) {
      if (indexes.length < 2) continue;
      const first = elements[indexes[0]];
      const group = first.closest('fieldset, [role="group"], [role="radiogroup"]');
      const legend = group?.querySelector(":scope > legend");
      const grouped = group && indexes.every((index) => group.contains(elements[index])) && (legend && accessibleName(legend) || labelledByName(group) || group.getAttribute("aria-label")?.trim());
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
  meta_refresh_no_exceptions_default,
  focus_not_obscured_enhanced_default,
  video_audio_description_default,
  heading_label_placeholder_default,
  text_justified_default,
  section_heading_default,
  captcha_alternative_default,
  region_purpose_default,
  financial_form_confirmation_default,
  pointer_gesture_alternative_default,
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
var sc = (num, name, level2, automation, since = "2.0") => ({
  num,
  name,
  level: level2,
  automation,
  since,
  // WCAG version that introduced this criterion
  principle: { 1: "Perceivable", 2: "Operable", 3: "Understandable", 4: "Robust" }[num[0]],
  url: `https://www.w3.org/WAI/WCAG22/Understanding/${name.toLowerCase().replace(/[(),]/g, "").replace(/\s+/g, "-")}.html`
});
var wcag22_default = [
  // 1. Perceivable
  sc("1.1.1", "Non-text Content", "A", "partial"),
  sc("1.2.1", "Audio-only and Video-only (Prerecorded)", "A", "partial"),
  // partial: the audio-only transcript question is askable; silent-video detection is not
  sc("1.2.2", "Captions (Prerecorded)", "A", "partial"),
  sc("1.2.3", "Audio Description or Media Alternative (Prerecorded)", "A", "partial"),
  // partial: video-audio-description asks per sound-capable video without a descriptions track; whether description or a text alternative exists, or is needed at all, is the reviewer's
  sc("1.2.4", "Captions (Live)", "AA", "manual"),
  sc("1.2.5", "Audio Description (Prerecorded)", "AA", "partial"),
  // partial: same question as 1.2.3 (video-audio-description); H96 descriptions track is the one DOM-visible pass
  sc("1.2.6", "Sign Language (Prerecorded)", "AAA", "manual"),
  sc("1.2.7", "Extended Audio Description (Prerecorded)", "AAA", "manual"),
  sc("1.2.8", "Media Alternative (Prerecorded)", "AAA", "manual"),
  sc("1.2.9", "Audio-only (Live)", "AAA", "manual"),
  sc("1.3.1", "Info and Relationships", "A", "partial"),
  sc("1.3.2", "Meaningful Sequence", "A", "partial"),
  // partial: CSS-reorder divergence is measurable; whether meaning survives is the reader's call
  sc("1.3.3", "Sensory Characteristics", "A", "manual"),
  sc("1.3.4", "Orientation", "AA", "partial", "2.1"),
  // orientation-lock asserts CSS root hides/rotations as ACT b33eff does, essential exception assumed absent; script locks stay a human check
  sc("1.3.5", "Identify Input Purpose", "AA", "partial", "2.1"),
  // partial: wrong tokens are asserted as ACT 73f2c2 does (search boxes asked); MISSING autocomplete on identity fields needs judgment
  sc("1.3.6", "Identify Purpose", "AAA", "partial", "2.1"),
  // partial: region-purpose asks once per page with no landmark at all (ARIA11 is the regions technique); component and icon purpose stays human
  sc("1.4.1", "Use of Color", "A", "partial"),
  // link-in-text-block automates the link case
  sc("1.4.2", "Audio Control", "A", "partial"),
  // declarative autoplay identifies candidates; audibility and alternative controls need review
  sc("1.4.3", "Contrast (Minimum)", "AA", "partial"),
  sc("1.4.4", "Resize Text", "AA", "partial"),
  sc("1.4.5", "Images of Text", "AA", "manual"),
  sc("1.4.6", "Contrast (Enhanced)", "AAA", "partial"),
  sc("1.4.7", "Low or No Background Audio", "AAA", "manual"),
  sc("1.4.8", "Visual Presentation", "AAA", "partial"),
  // partial: text-justified asks about justified running text (F88); the other four requirements are met by browser mechanisms and not judged
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
  sc("2.2.4", "Interruptions", "AAA", "partial"),
  // partial: meta-refresh-no-exceptions asserts any timed refresh or redirect (F40, F41); scripted interruptions are invisible
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
  sc("2.4.6", "Headings and Labels", "AA", "partial"),
  // partial: heading-label-placeholder asserts template text left in a heading or label and asks about single generic words; whether real words describe the topic needs a reader
  sc("2.4.7", "Focus Visible", "AA", "partial"),
  // partial: focus-visible flags outline suppression; the indicator itself needs eyes
  sc("2.4.8", "Location", "AAA", "manual"),
  sc("2.4.9", "Link Purpose (Link Only)", "AAA", "partial"),
  // generic wording nominates candidates; whether wording explains the destination needs a reader
  sc("2.4.10", "Section Headings", "AAA", "partial"),
  // partial: section-heading asks about a declared <section> of running text with no heading of its own; where sections begin in undeclared writing stays human
  sc("2.4.11", "Focus Not Obscured (Minimum)", "AA", "partial", "2.2"),
  // covered resting targets are candidates; actual focus/scroll behavior needs review
  sc("2.4.12", "Focus Not Obscured (Enhanced)", "AAA", "partial", "2.2"),
  // partial: focus-not-obscured-enhanced reviews any overlap by an opaque fixed panel, 2.4.11's geometry without the containment requirement
  sc("2.4.13", "Focus Appearance", "AAA", "manual", "2.2"),
  sc("2.5.1", "Pointer Gestures", "A", "partial", "2.1"),
  // partial: pointer-gesture-alternative asks about surfaces whose touch-action hands swipes or every touch to script (carousels, maps, canvases); pointer-event gesture logic with no declaration is invisible
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
  sc("3.2.5", "Change on Request", "AAA", "partial"),
  // partial: meta-refresh-no-exceptions (F40, F41); scripted context changes and pop-ups on load are invisible
  sc("3.2.6", "Consistent Help", "A", "manual", "2.2"),
  sc("3.3.1", "Error Identification", "A", "partial"),
  // error-message-linkage proves broken aria-errormessage targets; only in force when the page is captured mid-error
  sc("3.3.2", "Labels or Instructions", "A", "partial"),
  sc("3.3.3", "Error Suggestion", "AA", "manual"),
  sc("3.3.4", "Error Prevention (Legal, Financial, Data)", "AA", "partial"),
  // partial: financial-form-confirmation asks once per form that takes card details; legal commitments and data deletion have no markup signature
  sc("3.3.5", "Help", "AAA", "manual"),
  sc("3.3.6", "Error Prevention (All)", "AAA", "manual"),
  sc("3.3.7", "Redundant Entry", "A", "partial", "2.2"),
  // partial: duplicate autocomplete purposes in one form are visible; cross-page processes are not
  sc("3.3.8", "Accessible Authentication (Minimum)", "AA", "partial", "2.2"),
  // partial: auth-field-obstruction catches paste blocking; alternatives need judgment
  sc("3.3.9", "Accessible Authentication (Enhanced)", "AAA", "partial", "2.2"),
  // partial: auth-field-obstruction's F109 findings apply unchanged (twin tag) and captcha-alternative asks about a CAPTCHA beside a credential, the object-recognition exception 3.3.9 removes
  // 4. Robust (4.1.1 Parsing was removed in WCAG 2.2)
  sc("4.1.2", "Name, Role, Value", "A", "partial"),
  sc("4.1.3", "Status Messages", "AA", "manual", "2.1")
];

// scripts/report/nsfw.mjs
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
import path from "node:path";
import { fileURLToPath } from "node:url";
var rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
var distDir = path.join(rootDir, "dist");
function flagValue(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i === -1 || process.argv[i + 1] === void 0 ? fallback : process.argv[i + 1];
}

// scripts/report/tally.mjs
var ruleById = new Map(rules_default.map((r) => [r.id, r]));
var scByNum = new Map(wcag22_default.map((c) => [c.num, c]));

// src/ui/impact-donut.js
var R = 42;
var STROKE = 7;
var CIRCUMFERENCE = 2 * Math.PI * R;
var OUTER = R + STROKE / 2;
var INNER = R - STROKE / 2;

// scripts/report/html.mjs
var CSS2 = `
@font-face{font-family:'DM Sans';src:url(data:font/woff2;base64,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) format('woff2');font-weight:100 1000;font-style:normal;font-display:swap}
:root{--bg:#08090A;--surface:#101113;--text:#F7F8F8;--muted:#8A8F98;--accent:#FFD60A;--hair:rgba(247,248,248,.09);--hair2:rgba(247,248,248,.2);--hairline:rgba(247,248,248,.09);--sev-critical-bg:rgba(255,82,51,.16);--sev-critical-fg:#FF5233;--sev-serious-bg:rgba(245,197,24,.14);--sev-serious-fg:#F5C518;--sev-moderate-bg:rgba(247,248,248,.10);--sev-moderate-fg:#F7F8F8;--sev-minor-bg:rgba(247,248,248,.06);--sev-minor-fg:#8A8F98;--sev-review-bg:rgba(59,130,246,.16);--sev-review-fg:#60A5FA;--sev-critical-vivid:#FF5233;--sev-serious-vivid:#F5C518;--sev-moderate-vivid:#C6CBD2;--sev-minor-vivid:#7C828B;--sev-review-vivid:#60A5FA;--sev-good-bg:rgba(34,197,94,.16);--sev-good-fg:#4ADE80;--sev-good-vivid:#4ADE80;--font:'DM Sans','Helvetica Neue',Arial,sans-serif;--display:'DM Sans','Helvetica Neue',Arial,sans-serif;--mono:'DM Sans',system-ui,sans-serif;--code:ui-monospace,'SF Mono',Menlo,Consolas,monospace;--measure:56rem;--gutter:clamp(1.25rem,5vw,4rem)}
*{box-sizing:border-box}
html{color-scheme:dark;background:var(--bg)}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.6 var(--font);-webkit-font-smoothing:antialiased}
a{color:var(--text);text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:3px}
a:hover{background:var(--text);color:var(--bg)}
:focus-visible{outline:2px solid var(--text);outline-offset:3px}
.skip{position:absolute;left:var(--gutter);top:.5rem;padding:.5rem .8rem;background:var(--text);color:var(--bg);font-weight:700;text-decoration:none;transform:translateY(-300%)}
.skip:focus{transform:none}
.top{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:.5rem 1.5rem;padding:.8rem var(--gutter);background:var(--bg);border-bottom:1px solid var(--hair)}
.menu-toggle{margin-left:auto;display:flex;align-items:center;gap:.45rem;background:none;border:0;color:var(--text);padding:.5rem;cursor:pointer;font:640 .9rem/1 var(--font)}
.menu-toggle svg{display:block}
.menu-toggle .icon-close{display:none}
.menu-toggle[aria-expanded=true] .icon-close{display:block}
.menu-toggle[aria-expanded=true] .icon-menu{display:none}
.top nav{position:absolute;top:100%;left:0;right:0;background:var(--bg);border-bottom:1px solid var(--hair2);display:none;max-height:calc(100vh - 3.6rem);overflow:auto}
.top nav.open{display:block}
.wordmark{display:inline-flex;align-items:center;gap:.6rem;font:650 1.25rem/1 var(--display);letter-spacing:-.02em;text-decoration:none;padding:.35rem 0}
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
.sample code{font-family:var(--code);font-size:.8rem;color:var(--text);word-break:break-all}
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
.visually-hidden{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}a,button,summary{-webkit-tap-highlight-color:transparent}a:active,button:active,summary:active{opacity:.72}
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
.top nav,.menu-toggle,.sort-icon,.skip,.player,.consent-banner,.consent-reopen{display:none}
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

// scripts/report/serve.mjs
var args = process.argv.slice(2);
var runDir = path2.resolve(args.find((a) => !a.startsWith("--")) ?? "");
var port = Number(flagValue("--port", 8770));
var fontsDir = path2.join(rootDir, "src", "site", "public", "assets", "fonts");
var readStatus = () => {
  try {
    return JSON.parse(fs.readFileSync(path2.join(runDir, "status.json"), "utf8"));
  } catch {
    return null;
  }
};
function snapshot() {
  const s = readStatus();
  const now = Date.now();
  if (!s) return { missing: true, now };
  const sessionSec = (now - (s.sessionStartedAt ?? s.startedAt)) / 1e3;
  const sessionAudited = Math.max(0, s.audited - (s.auditedAtStart ?? 0));
  const rate = sessionSec > 0 ? sessionAudited / sessionSec : 0;
  const finishedRate = sessionSec > 0 ? Math.max(0, s.finished - (s.finishedAtStart ?? 0)) / sessionSec : 0;
  const ranksLeft = s.total != null ? Math.max(0, s.count != null && s.count < s.total ? s.count - s.audited : s.total - (s.cursorIndex ?? 0)) : null;
  const resolvedRate = sessionSec > 0 ? (s.resolved ?? 0) / sessionSec : 0;
  const left = s.recheck ? Math.max(0, (s.recheckTotal ?? 0) - (s.resolved ?? 0)) : s.kind === "site" ? Math.min((s.count ?? Infinity) - s.audited, s.queued ?? 0) : ranksLeft;
  const processed = s.recheck ? s.resolved ?? 0 : s.kind === "site" ? s.audited : Math.min(s.total ?? Infinity, (s.finished ?? 0) + (s.tagged ?? 0));
  const of = s.recheck ? s.recheckTotal ?? 0 : s.kind === "site" ? Math.min(s.count ?? Infinity, s.audited + (s.queued ?? 0) + (s.inflight?.length ?? 0)) : s.count != null && s.count < s.total ? s.count : s.total;
  return {
    ...s,
    now,
    rate,
    finishedRate,
    resolvedRate,
    left,
    processed,
    of,
    summary: s.summary ? { ...s.summary, recent: (s.summary.recent ?? []).map((r) => r.nsfw ? { ...r, label: maskDomain(r.label), url: null } : r) } : s.summary,
    // activeMs is written with the current session already added (run.mjs writeStatus, about once a second), so nothing is added here: adding the session again showed a fresh 10s run as 18s (gov.uk, 2026-09-01).
    activeSec: (s.activeMs ?? 0) / 1e3,
    sessionSec,
    eta: left == null ? null : s.recheck ? resolvedRate > 0 ? left / resolvedRate : null : s.kind === "site" ? rate > 0 ? left / rate : null : finishedRate > 0 ? left / finishedRate : null,
    inflight: (s.inflight ?? []).map((f) => {
      const nsfw = isNsfw({ domain: f.label }) || void 0;
      return { ...f, nsfw, label: nsfw ? maskDomain(f.label) : f.label, seconds: Math.round((now - f.since) / 1e3) };
    }).sort((a, b) => b.seconds - a.seconds),
    backoffs: (s.backoffs ?? []).map((b) => ({ host: b.host, left: Math.max(0, Math.round((b.until - now) / 1e3)) })).filter((b) => b.left > 0)
  };
}
var LIVE_CSS = `
[hidden]{display:none!important}
html{scroll-behavior:auto}
#main{scroll-margin-top:0}
td.result{text-align:right;color:var(--muted);width:1%}
@font-face{font-family:'Inter';font-style:normal;font-weight:100 900;font-display:swap;src:url(/fonts/inter-var-latin.woff2) format('woff2')}
@font-face{font-family:'Atkinson Hyperlegible';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/atkinson-400-latin.woff2) format('woff2')}
@font-face{font-family:'Atkinson Hyperlegible';font-style:normal;font-weight:700;font-display:swap;src:url(/fonts/atkinson-700-latin.woff2) format('woff2')}
.state{margin-left:auto;font-family:var(--mono);font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);display:inline-flex;align-items:center;gap:.5rem}
.state::before{content:'';width:8px;height:8px;border-radius:50%;background:var(--muted)}
.state.running::before{background:var(--accent)}
.state.finished{color:var(--text)}
.state.finished::before{background:var(--text)}
.intro{padding-top:clamp(3rem,6vh,4.5rem)}
.sub{font-variant-numeric:tabular-nums}
.progress{max-width:calc(var(--measure) + 2*var(--gutter));margin:2.2rem auto 0;padding:0 var(--gutter)}
.progress-row{display:flex;align-items:baseline;justify-content:space-between;gap:1rem;font-size:.9rem;color:var(--muted);font-variant-numeric:tabular-nums}
.progress-row strong{font:620 2.2rem/1 var(--display);color:var(--text)}
.progress .track{margin-top:.8rem;height:14px}
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(11rem,1fr));gap:1.5rem 2rem;max-width:calc(var(--measure) + 2*var(--gutter));margin:2.5rem auto 0;padding:0 var(--gutter)}
.tile{margin:0;padding-top:.8rem;border-top:1px solid var(--hair2);color:var(--muted);font-size:.85rem}
.tile strong{display:block;font:620 1.7rem/1 var(--display);color:var(--text);margin-bottom:.4rem;font-variant-numeric:tabular-nums}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(28rem,1fr));gap:0 3rem;max-width:calc(var(--measure) + 2*var(--gutter) + 28rem);margin:0 auto;padding:0 var(--gutter)}
td.page{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:18rem}
td.result{white-space:nowrap}
.grid .docs{padding-inline:0;max-width:none;margin:0}
table{min-width:0}
.compact th,.compact td{padding:.45rem .8rem}
td.d{color:var(--muted)}
td a{color:var(--text)}
.badge{display:inline-block;margin-left:.4rem;padding:0 .4rem;border-radius:4px;font:700 .65rem/1.5 var(--display);letter-spacing:.08em;vertical-align:middle;background:rgba(255,82,51,.16);color:#FF5233;cursor:default}
.empty{color:var(--muted)}
.hosts{list-style:none;margin:1rem 0 0;padding:0;display:grid;gap:.4rem;font-variant-numeric:tabular-nums}
`;
var page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>pour \xB7 report run</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>${CSS2}${LIVE_CSS}</style>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="top">
    <a class="wordmark" href="https://pour.dev"><svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true" focusable="false"><rect x="2" y="2" width="10.5" height="10.5"/><rect x="19.5" y="2" width="10.5" height="10.5"/><rect x="2" y="19.5" width="10.5" height="10.5"/><rect x="19.5" y="19.5" width="10.5" height="10.5"/></svg><span>pour</span></a>
    <nav aria-label="Sections"><ul class="menu"><li><a href="#main">Summary</a></li><li><a href="#flight">In flight</a></li><li><a href="#recent">Just finished</a></li><li><a href="#spread">Spread</a></li><li><a href="#rules">Rules</a></li><li><a href="#skips">Skipped</a></li></ul></nav>
    <span class="state" id="state" aria-live="polite">connecting</span>
  </header>
  <main id="main">
    <section class="docs intro" aria-labelledby="title">
      <p class="eyebrow" id="eyebrow">Report runner</p>
      <h1 id="title">Starting up.</h1>
      <p class="lede sub" id="sub">Waiting for the run to write its first status.</p>
    </section>
    <div class="progress" role="group" aria-label="Progress">
      <div class="progress-row"><span><strong id="p-pct">0%</strong></span><span id="p-text">0 of 0</span><span id="p-eta">\u2013</span></div>
      <span class="track" aria-hidden="true"><span class="bar" id="bar" style="width:0%"></span></span>
    </div>
    <div class="stats" role="group" aria-label="The headline numbers so far">
      <p class="stat"><strong id="t-audited">0</strong>pages audited</p>
      <p class="stat"><strong id="t-fail">0%</strong>of pages with a failure the engine could prove</p>
      <p class="stat"><strong id="t-mean">0</strong>failing elements on the average page, <span id="t-median">0</span> on the median</p>
    </div>
    <div class="tiles" role="group" aria-label="The run">
      <p class="tile"><strong id="t-rate">0</strong>pages audited a minute</p>
      <p class="tile"><strong id="t-done-rate">0</strong>entries processed a minute, skips included</p>
      <p class="tile"><strong id="t-skipped">0</strong><span id="t-skipped-label">skipped</span></p>
      <p class="tile" id="tile-queued" hidden><strong id="t-queued">0</strong>pages queued</p>
      <p class="tile" id="tile-tagged" hidden><strong id="t-tagged">0</strong>tagged unavailable by an earlier run</p>
      <p class="tile" id="tile-retry" hidden><strong id="t-retry">0</strong>timed out, one more try after the rest</p>
      <p class="tile"><strong id="t-review">0</strong>elements to review per page</p>
      <p class="tile"><strong id="t-session">0</strong>this session</p>
      <p class="tile"><strong id="t-active">0</strong>running time, all sessions</p>
    </div>
    <div class="tiles" id="recheck" hidden role="group" aria-label="The recheck pass">
      <p class="tile"><strong id="r-togo">0</strong>recheck pages to go, of <span id="r-total">0</span></p>
      <p class="tile"><strong id="r-recovered">0</strong>recovered this pass</p>
      <p class="tile"><strong id="r-refused">0</strong>still refused</p>
      <p class="tile"><strong id="r-attempts">0</strong>attempts made</p>
    </div>
    <div class="grid">
      <section class="docs" id="flight" aria-labelledby="flight-title">
        <h2 id="flight-title">In flight</h2>
        <p id="flight-note" class="note">The pages being loaded and audited right now, longest first.</p>
        <div class="wrap"><table class="compact" aria-label="Pages in flight"><thead><tr><th scope="col">Page</th><th scope="col" class="num">For</th></tr></thead><tbody id="inflight"></tbody></table></div>
        <ul class="hosts" id="hosts" hidden></ul>
      </section>
      <section class="docs" id="recent" aria-labelledby="recent-title">
        <h2 id="recent-title">Just finished</h2>
        <p class="note">The last pages to land, newest first.</p>
        <div class="wrap"><table class="compact" aria-label="Pages just finished"><thead><tr><th scope="col">Page</th><th scope="col" class="result">Result</th></tr></thead><tbody id="recentRows"></tbody></table></div>
      </section>
      <section class="docs" id="spread" aria-labelledby="spread-title">
        <h2 id="spread-title">Failures per page</h2>
        <p class="note">Audited pages by their count of failing elements.</p>
        <ul class="bars" id="hist"></ul>
      </section>
      <section class="docs" id="rules" aria-labelledby="rules-title">
        <h2 id="rules-title">Most common rules so far</h2>
        <p class="note">By the number of pages each rule failed on.</p>
        <div class="wrap"><table class="compact" aria-label="Most common rules"><thead><tr><th scope="col">Rule</th><th scope="col" class="num">Pages</th><th scope="col" class="num">Elements</th></tr></thead><tbody id="rulesRows"></tbody></table></div>
      </section>
      <section class="docs" id="skips" aria-labelledby="skips-title">
        <h2 id="skips-title">Skipped, by reason</h2>
        <p class="note">Entries that were not pages, or would not be audited.</p>
        <div class="wrap"><table class="compact" aria-label="Skipped entries by reason"><thead><tr><th scope="col">Reason</th><th scope="col" class="num">Entries</th></tr></thead><tbody id="reasons"></tbody></table></div>
      </section>
    </div>
  </main>
  <footer>pour engine \xB7 <a href="https://pour.dev">pour.dev</a> \xB7 this screen reads the run's status file; the report is written when the run ends.</footer>
<script>
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const n = (v) => Number(v || 0).toLocaleString('en-US');
  const dhm = (s) => { s = Math.round(s); const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60); return d ? d + 'd ' + h + 'h ' + m + 'm' : h ? h + 'h ' + m + 'm' : m + 'm ' + String(s % 60).padStart(2, '0') + 's'; };
  const link = (href, text, nsfw) => (href && !nsfw) ? '<a href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(text) + '</a>' : esc(text) + (nsfw ? '<span class="badge" title="Adult site: the name is withheld and not linked">NSFW</span>' : '');
  const monthName = (ym) => new Date(ym + '-01T00:00:00').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  async function tick() {
    let d; try { d = await (await fetch('/api/status', { cache: 'no-store' })).json(); } catch { return; }
    if (d.missing) return;
    const s = d.summary || {};
    const site = d.kind === 'site';
    const state = d.done ? 'finished' : d.paused ? 'stopped' : 'running';
    $('state').textContent = state; $('state').className = 'state ' + state;
    document.title = 'pour \xB7 ' + d.label;
    const listNote = d.list ? (d.list.source === 'crux' ? ' \xB7 Chrome UX Report list for ' + monthName(d.list.id.slice(0, 4) + '-' + d.list.id.slice(4)) : d.list.source === 'tranco' ? ' \xB7 Tranco list ' + d.list.id : '') : '';
    $('eyebrow').textContent = (d.mode === 'top' ? 'Monthly study \xB7 ' + monthName(d.month) + listNote : site ? 'Site audit' : 'List audit \xB7 ' + (d.list ? d.list.file : ''));
    $('title').textContent = d.done ? (d.label + ', audited.') : site ? 'Crawling ' + d.label + '.' : d.mode === 'top' ? 'Auditing the top ' + n(d.topN) + '.' : 'Auditing ' + d.label + '.';
    $('sub').textContent = (d.workers ? d.workers + ' workers' : '') + (site ? ' \xB7 ' + n(d.discovered) + ' addresses found so far' : ' \xB7 rank ' + n(d.cursorRank) + ' of ' + n(d.total)) + (d.paused ? ' \xB7 stopped; the same command resumes it' : d.done ? ' \xB7 the report has been written' : '');
    const pct = d.of ? Math.min(100, 100 * d.processed / d.of) : 0;
    $('p-pct').textContent = pct.toFixed(pct < 10 ? 1 : 0) + '%';
    $('p-text').textContent = n(d.processed) + ' of ' + n(d.of) + (site ? ' pages' : ' entries') + ' processed';
    $('p-eta').textContent = d.done ? 'done' : d.paused ? 'stopped' : d.eta == null ? 'estimating\u2026' : dhm(d.eta) + ' to go';
    $('bar').style.width = pct.toFixed(2) + '%';
    $('t-audited').textContent = n(d.audited);
    $('t-fail').textContent = (s.failingPct || 0).toFixed(1) + '%';
    $('t-mean').textContent = (s.meanFailing || 0).toFixed(1); $('t-median').textContent = s.medianFailing ?? 0;
    $('t-rate').textContent = (d.rate * 60).toFixed(1);
    $('t-done-rate').textContent = ((d.recheck ? d.resolvedRate : d.finishedRate) * 60).toFixed(1);
    $('t-skipped').textContent = n(d.skipped); $('t-skipped-label').textContent = site ? 'addresses skipped' : 'entries skipped';
    $('tile-queued').hidden = !site; $('t-queued').textContent = n(d.queued);
    $('tile-tagged').hidden = !d.tagged; $('t-tagged').textContent = n(d.tagged);
    $('tile-retry').hidden = !d.retryQueued; $('t-retry').textContent = n(d.retryQueued);
    $('t-review').textContent = (s.meanReview || 0).toFixed(1);
    $('t-session').textContent = dhm(d.sessionSec || 0);
    $('t-active').textContent = dhm(d.activeSec || 0);
    $('recheck').hidden = !d.recheck;
    if (d.recheck) { $('r-togo').textContent = n(Math.max(0, (d.recheckTotal || 0) - (d.resolved || 0))); $('r-total').textContent = n(d.recheckTotal); $('r-recovered').textContent = n(d.recovered); $('r-refused').textContent = n(Math.max(0, (d.resolved || 0) - (d.recovered || 0))); $('r-attempts').textContent = n(d.attempts); }
    $('inflight').innerHTML = d.inflight.length ? d.inflight.map((f) => '<tr><td class="page">' + (f.rank != null ? '<span class="dim">#' + n(f.rank) + '</span> ' : '') + link(f.href, f.label, f.nsfw) + (f.retry ? ' <span class="dim">\xB7 ' + esc(f.retry) + '</span>' : '') + '</td><td class="num d">' + f.seconds + 's</td></tr>').join('') : '<tr><td class="empty" colspan="2">' + (d.done ? 'nothing, the run is over' : d.paused ? 'nothing, the run is stopped' : d.backoffs.length ? 'nothing, waiting out a pause' : 'nothing yet') + '</td></tr>';
    $('hosts').hidden = !d.backoffs.length;
    $('hosts').innerHTML = d.backoffs.map((b) => '<li><span class="rule">' + esc(b.host) + '</span> <span class="dim">refused five in a row, its pages wait ' + dhm(b.left) + '</span></li>').join('');
    const hist = s.histogram || []; const max = Math.max(1, ...hist.map((h) => h.pages));
    $('hist').innerHTML = hist.map((h) => '<li><span>' + esc(h.label) + '</span><span class="track"><span class="bar" style="width:' + (100 * h.pages / max).toFixed(1) + '%"></span></span><span class="val">' + n(h.pages) + '</span></li>').join('');
    const reasons = s.reasons || [];
    $('reasons').innerHTML = reasons.length ? reasons.map(([r, c]) => '<tr><td>' + esc(r) + '</td><td class="num">' + n(c) + '</td></tr>').join('') : '<tr><td class="empty" colspan="2">none</td></tr>';
    $('rulesRows').innerHTML = (s.rules || []).slice(0, 10).map((r) => '<tr><td><span class="rule">' + esc(r.id) + '</span></td><td class="num">' + n(r.pages) + '</td><td class="num">' + n(r.elements) + '</td></tr>').join('') || '<tr><td class="empty" colspan="3">nothing failed yet</td></tr>';
    $('recentRows').innerHTML = (s.recent || []).map((r) => '<tr><td class="page">' + (r.rank != null ? '<span class="dim">#' + n(r.rank) + '</span> ' : '') + link(r.url, r.label, r.nsfw) + '</td><td class="result">' + (r.status === 'audited' ? n(r.failing) + ' failing \xB7 ' + n(r.review) + ' review' : esc(r.reason) + (r.detail ? ' \xB7 ' + esc(r.detail) : '')) + '</td></tr>').join('');
  }
  tick(); setInterval(tick, 2000);
</script>
</body>
</html>`;
var server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  if (url.startsWith("/api/status")) {
    res.writeHead(200, { "content-type": "application/json", "cache-control": "no-store" });
    res.end(JSON.stringify(snapshot()));
    return;
  }
  if (url.startsWith("/fonts/")) {
    const file = path2.join(fontsDir, path2.basename(url));
    if (fs.existsSync(file)) {
      res.writeHead(200, { "content-type": "font/woff2", "cache-control": "max-age=86400" });
      res.end(fs.readFileSync(file));
      return;
    }
  }
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(page);
});
server.on("error", (error) => {
  console.error(error.code === "EADDRINUSE" ? `port ${port} is in use; pass --port with a free one` : String(error));
  process.exit(1);
});
server.listen(port, "127.0.0.1", () => console.log(`progress screen: http://127.0.0.1:${port}`));
