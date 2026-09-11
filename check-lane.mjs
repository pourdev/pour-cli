/*! pour check lane 1.40.0 | MIT | https://pour.dev */

// src/vscode/audit.js
import jsdom from "jsdom";

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
function flatTreeParent(node) {
  return node.parentElement ?? node.getRootNode()?.host ?? null;
}
function isRendered(element) {
  if (typeof element.checkVisibility === "function") {
    return element.checkVisibility({ visibilityProperty: true });
  }
  const style = getComputedStyle(element);
  return style.display !== "none" && style.visibility !== "hidden";
}
function isVisible(element) {
  for (let node = element; node; node = flatTreeParent(node)) {
    if (node.getAttribute?.("aria-hidden") === "true") return false;
  }
  return isRendered(element);
}
function cssPathInRoot(element) {
  const root = element.getRootNode();
  const uniqueId = (el) => el.id && root.querySelectorAll(`#${CSS.escape(el.id)}`).length === 1;
  if (uniqueId(element)) return `#${CSS.escape(element.id)}`;
  const parts = [];
  let current = element;
  while (current && current.nodeType === Node.ELEMENT_NODE && current !== document.documentElement) {
    let part = current.tagName.toLowerCase();
    if (current.parentElement) {
      let index = 1;
      for (let sib = current.previousElementSibling; sib; sib = sib.previousElementSibling) {
        if (sib.tagName === current.tagName) index += 1;
      }
      let repeated = index > 1;
      for (let sib = current.nextElementSibling; !repeated && sib; sib = sib.nextElementSibling) {
        if (sib.tagName === current.tagName) repeated = true;
      }
      if (repeated) part += `:nth-of-type(${index})`;
    }
    parts.unshift(part);
    if (current.parentElement && uniqueId(current.parentElement)) {
      parts.unshift(`#${CSS.escape(current.parentElement.id)}`);
      break;
    }
    current = current.parentElement;
  }
  return parts.join(" > ") || element.tagName.toLowerCase();
}
function cssPath(element) {
  let path = cssPathInRoot(element);
  let root = element.getRootNode();
  while (root && root.host) {
    path = `${cssPathInRoot(root.host)} >>> ${path}`;
    root = root.host.getRootNode();
  }
  return path;
}
var attributesGetter = typeof Element !== "undefined" ? Object.getOwnPropertyDescriptor(Element.prototype, "attributes")?.get : null;
function attributesOf(element) {
  const own = element.attributes;
  if (own && typeof own.length === "number" && typeof own.item === "function") return own;
  return attributesGetter ? attributesGetter.call(element) : [];
}
function htmlSnippet(element, maxLength = 300) {
  let html = `<${element.tagName.toLowerCase()}`;
  for (const { name, value } of attributesOf(element)) {
    if (html.length >= maxLength) break;
    html += ` ${name}="${value}"`;
  }
  html += ">";
  const text = ownText(element);
  if (text && html.length < maxLength) html += text.slice(0, maxLength - html.length);
  return html.length > maxLength ? `${html.slice(0, maxLength)}\u2026` : html;
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
function ownText(element) {
  return [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE).map((node) => node.textContent).join("").trim();
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
    const target = root.getElementById?.(id);
    return target ? computeName(target, true) : "";
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
    const text = [...element.labels].map((label) => label.textContent).join(" ").trim();
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
    const visibleLabels = [...element.labels ?? []].filter((label) => {
      if (label.closest('[aria-hidden="true"]')) return false;
      const style = getComputedStyle(label);
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
        let max = 0;
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
    range = await imageLuminanceRange(source.currentSrc || source.src, overlays, grid);
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
    async evaluate(element, { ownText: ownText2 }) {
      if (!ownText2(element)) return { status: "pass" };
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
      if (SEPARATOR_GLYPHS.test(ownText2(element)) && laidInline && !element.closest('code, pre, samp, kbd, var, a[href], button, [role="button"], [role="link"], [role="menuitem"], [role="tab"], [role="option"]')) {
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
        const dim = (color) => opacity < 1 ? { ...color, a: color.a * opacity } : color;
        const base = { origin: null, color: dim(baseForeground), required: baseRequired };
        const pick = worstCandidate([base, ...alternates.map((a) => ({ ...a, color: dim(a.color) }))], background);
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
  evaluate(element, { isRendered: isRendered2 }) {
    const focusable = [element, ...element.querySelectorAll(FOCUSABLE)].filter(
      (el) => el.matches?.(FOCUSABLE) && !(el.hasAttribute("tabindex") && el.tabIndex < 0) && !el.matches(":disabled") && !el.closest("[inert]") && isRendered2(el) && cumulativeOpacity(el) > 0
    );
    if (!focusable.length) return { status: "pass" };
    const doc = element.ownerDocument;
    let modal = null;
    try {
      modal = doc.querySelector("dialog:modal");
    } catch {
    }
    modal ??= [...doc.querySelectorAll('[aria-modal="true"]')].find(isRendered2) ?? null;
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
  evaluate(element, { isRendered: isRendered2 }) {
    if (element.hasAttribute("role") && element.getAttribute("role") !== "list") return { status: "pass" };
    const effectiveChildren = (parent) => [...parent.children].flatMap((child) => child.tagName === "SLOT" ? child.assignedElements?.().length ? child.assignedElements() : [...child.children] : [child]);
    const isValidChild = (child) => {
      if (NEVER_RENDERED.has(child.tagName)) return true;
      if (isRendered2 && !isRendered2(child)) return true;
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
      const renderedItems = effectiveChildren(element).filter((child) => child.tagName === "LI" && (!isRendered2 || isRendered2(child)));
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
  evaluate(element, { isRendered: isRendered2 }) {
    const NATIVE = "a[href], button, input, select, textarea, summary, audio[controls], video[controls]";
    const candidates = [...element.querySelectorAll(INTERACTIVE)].filter((el) => !el.matches(":disabled") && !isInert(el) && !(el.tagName === "INPUT" && el.type === "hidden") && isRendered2(el) && !el.closest('[aria-hidden="true"]') && (el.matches(NATIVE) || el.hasAttribute("tabindex")));
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
  evaluate(element, { isRendered: isRendered2 }) {
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
        if (isRendered2 && !isRendered2(link)) continue;
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
        const seen = /* @__PURE__ */ new Set();
        for (const key of cellsOf(rects[i])) {
          for (const j of cellIndex.get(key) ?? []) if (j !== i) seen.add(j);
        }
        return seen;
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
  evaluate(element) {
    const id = element.getAttribute("for");
    if (element.control) return { status: "pass" };
    const target = element.getRootNode().getElementById?.(id);
    if (target && target.tagName === "INPUT" && target.type === "hidden") return { status: "pass" };
    const wrapped = element.querySelector(WRAPPABLE);
    if (wrapped) {
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
  evaluate(element, { isRendered: isRendered2 }) {
    const exposed = (child) => !NEVER_RENDERED.has(child.tagName) && !child.closest('[aria-hidden="true"]') && !isInert(child) && (!isRendered2 || isRendered2(child) || getComputedStyle(child).display === "contents");
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
  evaluate(element, { isVisible: isVisible2 }) {
    const visibleLabels = [...element.labels ?? []].filter(isVisible2);
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
  // Prose in a generic container has the same requirement. F73 does not
  // limit colour-only links to paragraph markup. The text and shared-line
  // checks below keep navigation and separate blocks out of this lane.
  // https://www.w3.org/WAI/WCAG22/Techniques/failures/F73
  selector: "p a[href], dd a[href], blockquote a[href], td a[href], li a[href], div a[href]",
  visibility: "visual",
  // colour distinction is a purely visual concern
  evaluate(element, { ownText: ownText2 }) {
    const parent = element.closest("p, dd, blockquote, td, li, div");
    if (!element.textContent.trim() || !parent) return { status: "pass" };
    const surroundingText = ownText2(parent).trim();
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
var roleOf = (element) => element.getAttribute("role")?.trim().split(/\s+/)[0]?.toLowerCase() ?? implicitRole(element);
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
  evaluate(element, { isVisible: isVisible2 }) {
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
    if (!isVisible2(element)) return { status: "pass" };
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
        const target = element.getRootNode().getElementById?.(id);
        return !target || !cells.includes(target) || !(/^T[HD]$/.test(target.tagName) || isHeaderCell(target));
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
function pauseControlFor(video, isVisible2) {
  const root = video.getRootNode();
  if (!root.querySelectorAll) return null;
  const byId = (id) => root.getElementById ? root.getElementById(id) : root.querySelector(`#${CSS.escape(id)}`);
  for (const control of root.querySelectorAll('button[aria-controls], [role="button"][aria-controls], input[type="button"][aria-controls]')) {
    if (control.disabled || !isVisible2(control)) continue;
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
  evaluate(element, { isVisible: isVisible2 }) {
    const rect = element.getBoundingClientRect();
    if (rect.width < 64 && rect.height < 64) return { status: "pass" };
    if (element.paused && element.readyState >= 2) return { status: "pass" };
    if (pauseControlFor(element, isVisible2)) return { status: "pass" };
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
  evaluate(element, { isVisible: isVisible2 }) {
    const seen = /* @__PURE__ */ new Map();
    for (const field of element.querySelectorAll("input[autocomplete], select[autocomplete], textarea[autocomplete]")) {
      if (field.disabled || field.readOnly) continue;
      if (!isVisible2(field)) continue;
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
    if (element.hasAttribute("commandfor")) {
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
  evaluate(element, { isVisible: isVisible2, accessibleName: accessibleName2 }) {
    const root = element.getRootNode();
    const state = element.getAttribute("aria-invalid");
    const invalid = !!state && state !== "false" && state !== "undefined";
    const targetsOf = (attribute) => (element.getAttribute(attribute) ?? "").trim().split(/\s+/).filter(Boolean).map((id) => root.getElementById?.(id)).filter(Boolean);
    const hasText = (targets) => targets.some((target) => isVisible2(target) && (target.textContent.trim() || accessibleName2(target)));
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
  judge(element, { ownText: ownText2 }) {
    const isMedia = element.matches(
      'img:not([alt=""]):not([role="presentation"]):not([role="none"]), svg[role="img"], video, audio, canvas, iframe, input:not([type="hidden"]), select, textarea, button'
    );
    if (!ownText2(element) && !isMedia) return { status: "pass" };
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
      if (ownText2(parent)) return { status: "pass" };
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
  evaluate(element, { isVisible: isVisible2 }) {
    const count = collectRoots(element.ownerDocument).flatMap((root) => [...root.querySelectorAll('main, [role="main"]')]).filter(isVisible2).length;
    if (count === 1) return { status: "pass" };
    return {
      status: "fail",
      message: count === 0 ? "No <main> landmark \u2014 screen-reader users have no shortcut to the primary content." : `${count} main landmarks \u2014 "skip to main" becomes ambiguous.`,
      fix: count === 0 ? "Wrap the primary content in a single <main> element." : "Keep one <main>; demote the others to <section> or <div>."
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

// src/vscode/rules-list.js
var STATIC_RULES = /* @__PURE__ */ new Set([
  // Names, alternatives and labels
  "image-alt",
  "input-image-alt",
  "area-alt",
  "object-alt",
  "embed-alt",
  "button-name",
  "link-name",
  "link-text-generic",
  "link-text-generic-only",
  "form-label",
  "aria-field-name",
  "composite-widget-name",
  "dialog-name",
  "summary-name",
  "frame-title",
  "multiple-labels",
  // ARIA
  "aria-allowed-attr",
  "aria-attr-valid",
  "aria-valid-refs",
  "aria-hidden-focus",
  "aria-label-misuse",
  "valid-role",
  "role-required-aria",
  "nested-interactive",
  "invoker-target",
  "redundant-aria",
  // Structure
  "list-structure",
  "listitem-parent",
  "definition-list",
  "table-headers",
  "p-as-heading",
  "heading-order",
  "empty-heading",
  "page-heading-one",
  "landmark-one-main",
  "landmark-top-level",
  "landmark-unique",
  "region",
  "fieldset-legend",
  // Page-level
  "document-title",
  "html-lang",
  "valid-lang-parts",
  "bypass-blocks",
  "meta-viewport",
  "meta-refresh",
  "orientation-lock",
  // Forms and input
  "autocomplete-valid",
  "error-message-linkage",
  "on-input-navigation",
  "auth-field-obstruction",
  "audio-control",
  "drag-alternative",
  "focus-visible",
  // Keyboard and best practice
  "accesskeys",
  "positive-tabindex",
  "redundant-tabindex",
  "no-autofocus",
  "button-type",
  "new-window-link",
  "redundant-alt-phrase",
  "redundant-image-alt"
]);

// src/vscode/templates.js
import { parse } from "@babel/parser";
var HARMLESS_BINDINGS = /* @__PURE__ */ new Set([
  "class",
  "classname",
  "style",
  "src",
  "srcset",
  "sizes",
  "width",
  "height",
  "loading",
  "decoding",
  "href",
  "to",
  "key",
  "ref",
  "action",
  "method",
  "target",
  "rel",
  "download",
  "disabled",
  "checked",
  "selected",
  "readonly",
  "ngmodel",
  "model",
  "value",
  "is"
]);
var COMPONENT_TAG = /<(\/?)([A-Z][\w.$]*)/g;
function neutraliseComponents(text) {
  return text.replace(COMPONENT_TAG, (match, slash, name) => {
    const neutral = name.length >= 2 ? `x-${name.slice(2).toLowerCase().replace(/[^a-z0-9-]/g, "-")}` : "x";
    return `<${slash}${neutral}`;
  });
}
function blank(text, regex) {
  return text.replace(regex, (match) => match.replace(/[^\n]/g, " "));
}
function extractVue(text) {
  const open = /^[ \t]*<template\b[^>]*>/m.exec(text);
  if (!open) return null;
  const start = open.index + open[0].length;
  const closeIndex = text.lastIndexOf("</template>");
  if (closeIndex <= start) return null;
  let fragment = text.slice(start, closeIndex);
  fragment = fragment.replace(/<(\/?)template\b/g, "<$1pour-tpl");
  fragment = neutraliseComponents(fragment);
  return { fragment, toSource: (offset) => start + offset };
}
function extractSvelte(text) {
  let fragment = blank(text, /<script\b[\s\S]*?<\/script>/gi);
  fragment = blank(fragment, /<style\b[\s\S]*?<\/style>/gi);
  fragment = blank(fragment, /\{[#:/][^}]*\}/g);
  fragment = fragment.replace(/=\{([^}]*)\}/g, (match, inner) => `={${inner.replace(/[^\n]/g, "_")}}`);
  fragment = neutraliseComponents(fragment);
  return { fragment, toSource: (offset) => offset };
}
function extractAngular(text) {
  const fragment = blank(text, /@(if|for|else if|else|switch|case|default|defer|placeholder|loading|error|empty)\b[^{]*\{/g);
  return { fragment, toSource: (offset) => offset };
}
var VOID = /* @__PURE__ */ new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
var ATTRIBUTE_NAMES = { classname: "class", htmlfor: "for", tabindex: "tabindex", readonly: "readonly", maxlength: "maxlength", autocomplete: "autocomplete" };
var escapeAttribute = (value) => String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
var escapeText = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;");
function jsxName(node) {
  if (node.type === "JSXIdentifier") return node.name;
  if (node.type === "JSXNamespacedName") return `${node.namespace.name}:${node.name.name}`;
  if (node.type === "JSXMemberExpression") return `${jsxName(node.object)}.${node.property.name}`;
  return "x";
}
function jsxRootsIn(node, out = []) {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) {
    node.forEach((child) => jsxRootsIn(child, out));
    return out;
  }
  if (node.type === "JSXElement" || node.type === "JSXFragment") {
    out.push(node);
    return out;
  }
  for (const key of Object.keys(node)) {
    if (key === "loc" || key === "start" || key === "end" || key === "extra" || key === "leadingComments" || key === "trailingComments") continue;
    jsxRootsIn(node[key], out);
  }
  return out;
}
function literalString(expression) {
  if (!expression) return null;
  if (expression.type === "StringLiteral") return expression.value;
  if (expression.type === "NumericLiteral") return String(expression.value);
  if (expression.type === "BooleanLiteral") return expression.value ? "" : false;
  if (expression.type === "TemplateLiteral" && expression.expressions.length === 0) return expression.quasis.map((q) => q.value.cooked ?? "").join("");
  return null;
}
var JsxEmitter = class {
  constructor() {
    this.out = "";
    this.map = [];
  }
  emitChildren(children) {
    for (const child of children) {
      if (child.type === "JSXText") {
        this.out += escapeText(child.value);
        continue;
      }
      if (child.type === "JSXElement" || child.type === "JSXFragment") {
        this.emit(child);
        continue;
      }
      if (child.type === "JSXExpressionContainer") {
        if (child.expression.type === "JSXEmptyExpression") continue;
        const literal = literalString(child.expression);
        if (literal === false) continue;
        if (literal !== null) {
          this.out += escapeText(literal);
          continue;
        }
        const nested = jsxRootsIn(child.expression);
        if (nested.length) nested.forEach((root) => this.emit(root));
        else this.out += "{\u2026}";
      }
    }
  }
  emit(node) {
    if (node.type === "JSXFragment") {
      this.emitChildren(node.children);
      return;
    }
    const opening = node.openingElement;
    const rawName = jsxName(opening.name);
    const isComponent = !/^[a-z]/.test(rawName) || rawName.includes(".");
    const tag = isComponent ? "x-component" : rawName;
    const bound = [];
    let spread = false;
    let attributes = "";
    for (const attribute of opening.attributes) {
      if (attribute.type === "JSXSpreadAttribute") {
        spread = true;
        continue;
      }
      const rawAttribute = jsxName(attribute.name);
      const name = ATTRIBUTE_NAMES[rawAttribute.toLowerCase()] ?? rawAttribute;
      if (!attribute.value) {
        attributes += ` ${name}=""`;
        continue;
      }
      if (attribute.value.type === "StringLiteral") {
        attributes += ` ${name}="${escapeAttribute(attribute.value.value)}"`;
        continue;
      }
      const literal = attribute.value.type === "JSXExpressionContainer" ? literalString(attribute.value.expression) : null;
      if (literal === false) continue;
      if (literal !== null) {
        attributes += ` ${name}="${escapeAttribute(literal)}"`;
        continue;
      }
      bound.push(name);
      attributes += ` ${name}="{\u2026}"`;
    }
    if (isComponent) attributes += ` data-pour-name="${escapeAttribute(rawName)}"`;
    if (bound.length) attributes += ` data-pour-bound="${escapeAttribute(bound.join(" "))}"`;
    if (spread) attributes += ' data-pour-spread=""';
    const dynamicChildren = node.children.some((child) => child.type === "JSXExpressionContainer" && child.expression.type !== "JSXEmptyExpression" && literalString(child.expression) === null);
    if (dynamicChildren) attributes += ' data-pour-dynamic=""';
    const fragStart = this.out.length;
    this.out += `<${tag}${attributes}>`;
    this.map.push({ fragStart, fragEnd: this.out.length, srcStart: opening.start, srcEnd: opening.end });
    if (VOID.has(tag)) return;
    this.emitChildren(node.children);
    this.out += `</${tag}>`;
  }
};
function extractJsx(text) {
  let ast;
  try {
    ast = parse(text, { sourceType: "module", errorRecovery: true, plugins: ["jsx", "typescript", "decorators"] });
  } catch {
    return null;
  }
  const roots = jsxRootsIn(ast.program.body);
  if (!roots.length) return null;
  const emitter = new JsxEmitter();
  for (const root of roots) {
    emitter.emit(root);
    emitter.out += "\n";
  }
  const { map } = emitter;
  const toSource = (offset) => {
    let best = null;
    for (const entry of map) if (entry.fragStart <= offset && (!best || entry.fragStart > best.fragStart)) best = entry;
    return best ? { start: best.srcStart, end: best.srcEnd } : { start: 0, end: 0 };
  };
  return { fragment: emitter.out, toSource };
}
var SILENT_TAGS = /* @__PURE__ */ new Set([
  "if",
  "elsif",
  "elif",
  "else",
  "unless",
  "case",
  "when",
  "for",
  "break",
  "continue",
  "ifchanged",
  "asyncEach",
  "asyncAll",
  "assign",
  "capture",
  "set",
  "macro",
  "extends",
  "import",
  "from",
  "raw",
  "comment",
  "verbatim",
  "filter",
  "#"
]);
function extractCurly(text) {
  let fragment = blank(text, /^---[^\n]*\r?\n[\s\S]*?\r?\n---[^\n]*(?:\r?\n|$)/);
  fragment = blank(fragment, /\{%-?\s*raw\s*-?%\}[\s\S]*?\{%-?\s*endraw\s*-?%\}/g);
  fragment = blank(fragment, /\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}/g);
  fragment = blank(fragment, /\{#[\s\S]*?#\}/g);
  const marks = [];
  fragment = fragment.replace(/\{%-?\s*([\w#]*)[\s\S]*?%\}/g, (match, name, offset) => {
    const silent = SILENT_TAGS.has(name) || /^end/i.test(name);
    marks.push({ offset, content: !silent });
    return match.replace(/[^\n]/g, " ");
  });
  return { fragment, toSource: (offset) => offset, marks, wholePage: /<html[\s>]/i.test(fragment) };
}
function extractMarkup(text, lane) {
  switch (lane) {
    case "vue":
      return extractVue(text);
    case "svelte":
      return extractSvelte(text);
    case "angular":
      return extractAngular(text);
    case "jsx":
      return extractJsx(text);
    case "liquid":
    case "nunjucks":
      return extractCurly(text);
    default:
      return null;
  }
}
function isDynamic(element, lane) {
  if (element.hasAttribute("data-pour-spread") || element.hasAttribute("data-pour-dynamic")) return true;
  const bound = (element.getAttribute("data-pour-bound") ?? "").split(" ").filter(Boolean);
  for (const { name, value } of element.attributes) {
    let target = null;
    if (lane === "vue") {
      if (name === "v-html" || name === "v-text" || name === "v-bind") return true;
      if (name.startsWith(":")) target = name.slice(1);
      else if (name.startsWith("v-bind:")) target = name.slice(7);
      else if (name === "v-model" || name.startsWith("v-model:")) target = "model";
    } else if (lane === "svelte") {
      if (name.startsWith("{")) return true;
      if (name.startsWith("bind:")) target = name.slice(5);
      else if (/\{[^}]*\}/.test(value) && !name.includes(":")) target = name;
    } else if (lane === "angular") {
      if (name === "[innerhtml]" || name === "[textcontent]") return true;
      if (name.startsWith("[(")) target = name.slice(2, -2);
      else if (name.startsWith("[")) target = name.slice(1, -1).replace(/^attr\./, "");
      else if (name.startsWith("bind-")) target = name.slice(5);
      else if (value.includes("{{")) target = name;
    } else if (lane === "liquid" || lane === "nunjucks") {
      if (name.startsWith("{")) return true;
      if (value.includes("{{")) target = name;
    }
    if (target !== null && !HARMLESS_BINDINGS.has(target.toLowerCase())) return true;
  }
  if (bound.some((name) => !HARMLESS_BINDINGS.has(name.toLowerCase()))) return true;
  for (const child of element.children) {
    if (child.tagName.toLowerCase().startsWith("x-")) return true;
  }
  return false;
}

// src/vscode/audit.js
var { JSDOM, VirtualConsole, requestInterceptor } = jsdom;
var WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"];
var PAGE_RULES = /* @__PURE__ */ new Set([
  "document-title",
  "html-lang",
  "bypass-blocks",
  "meta-viewport",
  "meta-refresh",
  "landmark-one-main",
  "page-heading-one",
  "region",
  "orientation-lock"
]);
var HEAD_RULES = /* @__PURE__ */ new Set(["document-title", "meta-viewport", "meta-refresh"]);
var BODY_RULES = /* @__PURE__ */ new Set(["bypass-blocks", "page-heading-one", "landmark-one-main", "region"]);
function pageRegionUnknowable(ruleId, document2) {
  const region = HEAD_RULES.has(ruleId) ? document2.head : BODY_RULES.has(ruleId) ? document2.body : null;
  if (!region) return false;
  return region.hasAttribute("data-pour-dynamic") || region.querySelector("[data-pour-dynamic]") !== null;
}
function localStylesheetsOnly() {
  return {
    interceptors: [requestInterceptor((request) => {
      if (request.url.startsWith("file:") && /\.css(\?|#|$)/i.test(request.url)) return void 0;
      return new Response(null, { status: 404 });
    })]
  };
}
function cssEscape(value) {
  return String(value).replace(/([^\w-])/g, "\\$1");
}
function applyTemplateMarks(dom, roots, marks) {
  const spans = [];
  for (const element of roots.flatMap((root) => [...root.querySelectorAll("*")])) {
    const location = dom.nodeLocation(element);
    if (!location) continue;
    const tag = location.startTag ?? location;
    spans.push({ element, tagStart: tag.startOffset, tagEnd: tag.endOffset, start: location.startOffset, end: location.endOffset });
  }
  for (const mark of marks) {
    const inTag = spans.find((span) => mark.offset >= span.tagStart && mark.offset < span.tagEnd);
    if (inTag) {
      inTag.element.setAttribute("data-pour-spread", "");
      continue;
    }
    if (!mark.content) continue;
    let innermost = null;
    for (const span of spans) {
      if (mark.offset < span.start || mark.offset >= span.end) continue;
      if (!innermost || span.end - span.start < innermost.end - innermost.start) innermost = span;
    }
    innermost?.element.setAttribute("data-pour-dynamic", "");
  }
}
function installGlobals(window, viewport) {
  const names = [
    "window",
    "document",
    "getComputedStyle",
    "Node",
    "Element",
    "HTMLElement",
    "SVGElement",
    "Range",
    "DOMException",
    "Image",
    "HTMLCanvasElement",
    "NodeFilter",
    "ShadowRoot",
    "DocumentFragment",
    "Text",
    "Comment",
    "Event",
    "CustomEvent",
    "HTMLInputElement",
    "HTMLSelectElement",
    "HTMLTextAreaElement",
    "HTMLButtonElement",
    "HTMLImageElement",
    "HTMLAnchorElement",
    "HTMLIFrameElement",
    "HTMLVideoElement",
    "HTMLAudioElement",
    "HTMLMediaElement",
    "HTMLLabelElement",
    "HTMLFormElement"
  ];
  for (const name of names) {
    try {
      globalThis[name] = window[name];
    } catch {
    }
  }
  const width = viewport?.width ?? 1280;
  const height = viewport?.height ?? 800;
  window.innerWidth = width;
  window.innerHeight = height;
  globalThis.innerWidth = width;
  globalThis.innerHeight = height;
  window.CSS = window.CSS ?? { escape: cssEscape };
  if (!window.CSS.escape) window.CSS.escape = cssEscape;
  globalThis.CSS = window.CSS;
  window.matchMedia = (query) => ({
    matches: /orientation:\s*portrait/.test(query) ? height > width : /orientation:\s*landscape/.test(query) ? width >= height : false,
    media: query,
    addEventListener() {
    },
    removeEventListener() {
    },
    addListener() {
    },
    removeListener() {
    }
  });
  globalThis.matchMedia = window.matchMedia;
  window.Element.prototype.checkVisibility = function checkVisibility() {
    for (let node = this; node && node.nodeType === 1; node = node.parentElement ?? node.getRootNode()?.host ?? null) {
      const style = window.getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden") return false;
    }
    return true;
  };
  window.Element.prototype.getAnimations = () => [];
  window.document.elementsFromPoint = () => [];
  window.document.elementFromPoint = () => null;
  window.HTMLCanvasElement.prototype.getContext = () => null;
}
function attachDeclarativeShadowRoots(root) {
  for (const template of root.querySelectorAll("template[shadowrootmode]")) {
    const host = template.parentElement;
    if (!host || host.shadowRoot) continue;
    const shadow = host.attachShadow({ mode: "open" });
    shadow.append(template.content);
    template.remove();
    attachDeclarativeShadowRoots(shadow);
  }
}
function sourceSpan(dom, element) {
  let node = element;
  const location = dom.nodeLocation(node);
  if (!location) return { start: 0, end: 0 };
  const tag = location.startTag ?? location;
  return { start: tag.startOffset, end: tag.endOffset };
}
function ruleMatchesTags(rule, tags) {
  if (!tags?.length) return true;
  return rule.tags.some((tag) => tags.includes(tag));
}
async function auditHtml(html, options = {}) {
  const started = performance.now();
  const url = options.url ?? "file:///untitled.html";
  const loadStylesheets = options.loadStylesheets !== false;
  const virtualConsole = new VirtualConsole();
  const dom = new JSDOM(html, {
    url,
    includeNodeLocations: true,
    pretendToBeVisual: true,
    virtualConsole,
    ...loadStylesheets ? { resources: localStylesheetsOnly() } : {}
  });
  const { window } = dom;
  const { document: document2 } = window;
  if (loadStylesheets && document2.readyState !== "complete") {
    await new Promise((resolve) => {
      const timer = setTimeout(resolve, 1500);
      window.addEventListener("load", () => {
        clearTimeout(timer);
        resolve();
      }, { once: true });
    });
  }
  try {
    attachDeclarativeShadowRoots(document2);
  } catch {
  }
  installGlobals(window, options.viewport);
  const helpers = { isVisible, isRendered, cssPath, htmlSnippet, ownText, accessibleName };
  const tags = options.tags ?? WCAG_TAGS;
  const active = rules_default.filter((rule) => !rule.disabled && STATIC_RULES.has(rule.id) && ruleMatchesTags(rule, tags) && (!options.only || rule.id === options.only) && !(options.template && !options.pageLevel && PAGE_RULES.has(rule.id)));
  const roots = collectRoots(document2);
  if (options.marks?.length) applyTemplateMarks(dom, roots, options.marks);
  const findings = [];
  const ran = [];
  let abstained = 0;
  for (const rule of active) {
    let elements = roots.flatMap((root) => [...root.querySelectorAll(rule.selector)]);
    if (rule.visibleOnly !== false) {
      elements = elements.filter(rule.visibility === "visual" ? isRendered : isVisible);
    }
    let outcomes;
    try {
      outcomes = rule.evaluateAll ? await rule.evaluateAll(elements, helpers) : await Promise.all(elements.map((element) => rule.evaluate(element, helpers)));
    } catch (error) {
      ran.push({ id: rule.id, elements: elements.length, error: String(error?.message ?? error) });
      continue;
    }
    const counts = { id: rule.id, elements: elements.length, pass: 0, fail: 0, incomplete: 0 };
    elements.forEach((element, i) => {
      const outcome2 = outcomes[i];
      if (!outcome2 || outcome2.status === "pass") {
        counts.pass += 1;
        return;
      }
      if (options.template) {
        const unknowable = HEAD_RULES.has(rule.id) || BODY_RULES.has(rule.id) ? pageRegionUnknowable(rule.id, document2) : isDynamic(element, options.template);
        if (unknowable) {
          abstained += 1;
          return;
        }
      }
      counts[outcome2.status] = (counts[outcome2.status] ?? 0) + 1;
      findings.push({
        rule: rule.id,
        name: rule.name ?? rule.id,
        impact: rule.impact,
        status: outcome2.status,
        help: rule.help,
        helpUrl: rule.helpUrl,
        message: outcome2.message ?? rule.help,
        fix: outcome2.fix ?? null,
        target: cssPath(element),
        html: htmlSnippet(element, 160),
        ...sourceSpan(dom, element)
      });
    });
    ran.push(counts);
  }
  window.close();
  return { findings, rules: ran, abstained, durationMs: Math.round(performance.now() - started) };
}
var FRAGMENT_PREFIX = '<!doctype html><html lang="en"><head><title>Component</title></head><body>';
var FRAGMENT_SUFFIX = "</body></html>";
async function auditSource(text, { lane = "page", ...options } = {}) {
  if (lane === "page") return auditHtml(text, options);
  const markup = extractMarkup(text, lane);
  if (!markup) return { findings: [], rules: [], abstained: 0, durationMs: 0 };
  const whole = markup.wholePage === true;
  const prefix = whole ? "" : FRAGMENT_PREFIX;
  const html = whole ? markup.fragment : FRAGMENT_PREFIX + markup.fragment + FRAGMENT_SUFFIX;
  const result = await auditHtml(html, {
    ...options,
    template: lane,
    pageLevel: whole,
    loadStylesheets: false,
    marks: (markup.marks ?? []).map((mark) => ({ ...mark, offset: mark.offset + prefix.length }))
  });
  result.findings = result.findings.flatMap((finding) => {
    const local = finding.start - prefix.length;
    if (local < 0) return [];
    const mapped = markup.toSource(local);
    return [typeof mapped === "number" ? { ...finding, start: mapped, end: mapped + (finding.end - finding.start) } : { ...finding, start: mapped.start, end: mapped.end }];
  });
  return result;
}

// src/vscode/lanes.js
var TEMPLATE_SYNTAX = /\{%|^---[^\n]*\r?\n/;
function laneFor(languageId, fileName = "", text = "") {
  if (languageId === "liquid") return "liquid";
  if (languageId === "nunjucks" || languageId === "njk") return "nunjucks";
  if (languageId === "plaintext" && /\.liquid$/i.test(fileName)) return "liquid";
  if (languageId === "plaintext" && /\.(njk|nunjucks|nunj|nj)$/i.test(fileName)) return "nunjucks";
  if (languageId === "html") {
    if (/\.component\.html$/i.test(fileName)) return "angular";
    if (/\.liquid$/i.test(fileName)) return "liquid";
    if (/\.(njk|nunjucks|nunj|nj)$/i.test(fileName)) return "nunjucks";
    return TEMPLATE_SYNTAX.test(text) ? "liquid" : "page";
  }
  if (languageId === "vue") return "vue";
  if (languageId === "svelte") return "svelte";
  if (languageId === "javascriptreact" || languageId === "typescriptreact") return "jsx";
  return null;
}
export {
  WCAG_TAGS,
  auditSource,
  laneFor,
  rules_default as rules
};
