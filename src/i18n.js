// Languages, as in the Tigerstripe app: English (default and fallback), Chinese, Malay, Vietnamese, Khmer.
// Translations are dictionaries keyed by the exact English string (src/i18n/<lang>.json).
// A missing entry falls back to English, so the app always works while translations are reviewed.

export const LANGS = ["en", "zh", "ms", "vi", "km"];
export const LANG_MENU = [
  ["en", "EN", "English", "English"],
  ["zh", "中文", "中文", "Chinese"],
  ["ms", "BM", "Bahasa Malaysia", "Malay"],
  ["vi", "VI", "Tiếng Việt", "Vietnamese"],
  ["km", "KM", "ភាសាខ្មែរ", "Khmer"],
];
export const LOCALE = { en: "en-GB", zh: "zh-CN", ms: "ms-MY", vi: "vi-VN", km: "km-KH" };

let dict = {};
export let lang = "en";

let latest = 0;
/**
 * Load a language. Resolves to "ok", "failed" (fell back to English) or "stale" (a newer request
 * started meanwhile, so this one is ignored). Gives up after `timeoutMs` so a weak signal never
 * leaves the app blank.
 */
export async function loadLang(code, { timeoutMs = 4000 } = {}) {
  const ticket = ++latest;
  const want = LANGS.includes(code) ? code : "en";
  if (want === "en") { dict = {}; lang = "en"; return "ok"; }
  const ctrl = typeof AbortController === "function" ? new AbortController() : null;
  const timer = setTimeout(() => ctrl?.abort(), timeoutMs);
  let next = null;
  try {
    const res = await fetch(`src/i18n/${want}.json`, ctrl ? { signal: ctrl.signal } : undefined);
    if (res.ok) next = await res.json();
  } catch { /* offline, timed out or aborted */ }
  clearTimeout(timer);
  if (ticket !== latest) return "stale";
  if (!next) { dict = {}; lang = "en"; return "failed"; }
  dict = next;
  lang = want;
  return "ok";
}

/** Translate one English string (falls back to English). */
export const tr = (s) => (s && Object.prototype.hasOwnProperty.call(dict, s) && dict[s]) || s || "";
/** Translate a template with {placeholders}, then fill them. Values are inserted as given (may be HTML). */
export const trf = (s, vals) => tr(s).replace(/\{(\w+)\}/g, (m, k) => (k in vals ? vals[k] : m));

// ---------- Static page text ----------
// Every text node and label attribute in the page is recorded once in English, then re-set on each language change.
const norm = (s) => s.replace(/\s+/g, " ").trim();
const ATTRS = ["aria-label", "placeholder", "title"];
let staticNodes = null;

function collectStatic(root) {
  const nodes = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      if (n.parentElement?.closest("svg, script, style, [data-notr]")) return NodeFilter.FILTER_REJECT;
      return /\p{L}/u.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const [, lead, , trail] = n.nodeValue.match(/^(\s*)([\s\S]*?)(\s*)$/);
    nodes.push({ node: n, en: norm(n.nodeValue), lead, trail });
  }
  const attrs = [];
  root.querySelectorAll(ATTRS.map((a) => `[${a}]`).join(",")).forEach((el) =>
    ATTRS.forEach((a) => { if (el.hasAttribute(a) && /\p{L}/u.test(el.getAttribute(a))) attrs.push({ el, a, en: norm(el.getAttribute(a)) }); })
  );
  return { nodes, attrs, title: document.title };
}

export function applyStatic() {
  if (!staticNodes) staticNodes = collectStatic(document.body);
  for (const { node, en, lead, trail } of staticNodes.nodes) node.nodeValue = lead + tr(en) + trail;
  for (const { el, a, en } of staticNodes.attrs) el.setAttribute(a, tr(en));
  document.title = tr(staticNodes.title);
  document.documentElement.lang = lang;
  document.body.dataset.lang = lang;
}
