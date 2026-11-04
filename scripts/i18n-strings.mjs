// Collects every English string the app shows, so each language file can be checked for coverage.
// Run `node scripts/i18n-strings.mjs > /tmp/strings.json` to get the list for translators.
import { readFileSync } from "node:fs";
import { SOURCES } from "../src/sources.js";
import { STAGES, GAPS, CHECKLIST, PBZ_TRIALS, PBZ_SAFETY, PROTOCOL } from "../src/guide.js";
import { LIBRARY } from "../src/library.js";
import { MICROBES, NO_FUNGI, CLEANUP_GROUPS, OTHER_CROPS, TRIAZOLES, TRIAZOLE_ADVICE } from "../src/cleanup.js";
import { buildTimeline } from "../src/planner.js";
import { REGIONS } from "../src/regions.js";
import { LEVEL, EFFECT_LABEL, TEST_LABEL, TRI_LABEL } from "../src/labels.js";

const root = new URL("../", import.meta.url);
const read = (f) => readFileSync(new URL(f, root), "utf8");
const norm = (s) => s.replace(/\s+/g, " ").trim();
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const hasWord = (s) => /\p{L}{2,}/u.test(s) && !/^[\d.,\s%]*(L|mL|g\/L|kg)$/.test(s);

/** Strings found in the static page (text nodes and aria-label / placeholder / title attributes). */
export function staticStrings() {
  let html = read("index.html");
  const out = [decode(norm(html.match(/<title>([^<]*)<\/title>/)[1]))];
  html = html.slice(html.indexOf("<body"));
  html = html.replace(/<!--[\s\S]*?-->/g, "").replace(/<svg[\s\S]*?<\/svg>/g, "").replace(/<script[\s\S]*?<\/script>/g, "");
  html = html.replace(/<(\w+)[^>]*\sdata-notr[^>]*>[\s\S]*?<\/\1>/g, "");
  for (const m of html.matchAll(/\s(?:aria-label|placeholder|title)="([^"]*)"/g)) out.push(decode(norm(m[1])));
  for (const m of html.matchAll(/>([^<>]+)</g)) out.push(decode(norm(m[1])));
  return out;
}

/** Literal strings passed to tr("…") / trf("…") in the app code. */
export function codeStrings() {
  const src = read("src/app.js");
  const out = [];
  // tr("…"), trf("…", …) and trf(cond ? "…" : "…", …)
  for (const m of src.matchAll(/\btrf?\(\s*(?:[^"()]*\?\s*)?"((?:[^"\\]|\\.)*)"(?:\s*:\s*"((?:[^"\\]|\\.)*)")?/g)) {
    out.push(JSON.parse(`"${m[1]}"`));
    if (m[2]) out.push(JSON.parse(`"${m[2]}"`));
  }
  return out;
}

export function dataStrings() {
  const out = [];
  const push = (...xs) => xs.forEach((x) => typeof x === "string" && out.push(x));
  for (const s of STAGES) { push(s.title, s.when, s.summary); s.points.forEach((p) => push(p.text)); }
  for (const t of PBZ_TRIALS) push(t.place, t.cultivar, t.age, t.method, t.rate, t.timing, t.result);
  push(...GAPS, ...CHECKLIST.map((c) => c.text), ...PBZ_SAFETY.map((p) => p.text));
  for (const r of PROTOCOL) push(r.title, r.actions);
  for (const t of LIBRARY) { push(t.title, t.summary); t.points.forEach((p) => push(p.text)); }
  for (const m of MICROBES) push(m.name, m.group, m.from, m.result);
  push(NO_FUNGI, ...TRIAZOLE_ADVICE);
  for (const g of CLEANUP_GROUPS) push(g.title, g.summary);
  for (const p of OTHER_CROPS) push(p.text);
  for (const t of TRIAZOLES) push(t.malaysia, t.likePBZ, t.evidence);
  for (const s of Object.values(SOURCES)) push(s.short, s.type, s.finding);
  for (const t of buildTimeline("2026-01-01")) push(t.label, t.detail);
  for (const r of REGIONS) push(r.country, r.region);
  push(...Object.values(LEVEL), ...Object.values(EFFECT_LABEL), ...Object.values(TEST_LABEL), ...Object.values(TRI_LABEL).map((x) => x[0]));
  const planner = read("src/planner.js");
  for (const m of planner.matchAll(/new Error\("((?:[^"\\]|\\.)*)"\)/g)) push(JSON.parse(`"${m[1]}"`));
  return out;
}

export function allStrings() {
  return [...new Set([...staticStrings(), ...codeStrings(), ...dataStrings()].filter((s) => s && hasWord(s)))].sort();
}

if (import.meta.url === `file://${process.argv[1]}`) console.log(JSON.stringify(allStrings(), null, 1));
