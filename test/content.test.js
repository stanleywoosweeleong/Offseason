import { test } from "node:test";
import assert from "node:assert/strict";
import { SOURCES } from "../src/sources.js";
import { STAGES, PBZ_TRIALS, PBZ_SAFETY, CHECKLIST } from "../src/guide.js";
import { buildTimeline, CULTIVAR_PRESETS } from "../src/planner.js";
import { LIBRARY } from "../src/library.js";
import { RAIN_SOURCES } from "../src/regions.js";
import { MICROBES, OTHER_CROPS, CLEANUP_GROUPS, TRIAZOLES } from "../src/cleanup.js";

test("every cited source ID exists in sources.js", () => {
  const ids = [
    ...STAGES.flatMap((s) => s.points.flatMap((p) => p.sources)),
    ...PBZ_TRIALS.map((t) => t.source),
    ...PBZ_SAFETY.flatMap((p) => p.sources),
    ...buildTimeline("2026-01-01").flatMap((t) => t.sources),
    ...Object.values(CULTIVAR_PRESETS).flatMap((c) => c.sources),
    ...LIBRARY.flatMap((t) => t.points.flatMap((p) => p.sources)),
    ...RAIN_SOURCES,
    ...MICROBES.flatMap((m) => m.sources),
    ...OTHER_CROPS.flatMap((p) => p.sources),
    ...TRIAZOLES.flatMap((t) => t.sources),
  ];
  for (const id of ids) assert.ok(SOURCES[id], `missing source: ${id}`);
});

test("every source has a URL and a finding", () => {
  for (const [id, s] of Object.entries(SOURCES)) {
    if (s.url !== null) assert.match(s.url, /^https:\/\//, id);
    else assert.match(s.type, /print only/i, `${id}: null url only allowed for print-only sources`);
    assert.ok(s.finding.length > 40, id);
  }
});

test("one topic: every source is cited somewhere, every point and checklist item maps to a stage", () => {
  const cited = new Set([
    ...STAGES.flatMap((s) => s.points.flatMap((p) => p.sources)),
    ...PBZ_TRIALS.map((t) => t.source),
    ...PBZ_SAFETY.flatMap((p) => p.sources),
    ...buildTimeline("2026-01-01").flatMap((t) => t.sources),
    ...Object.values(CULTIVAR_PRESETS).flatMap((c) => c.sources),
    ...LIBRARY.flatMap((t) => t.points.flatMap((p) => p.sources)),
    ...RAIN_SOURCES,
    ...MICROBES.flatMap((m) => m.sources),
    ...OTHER_CROPS.flatMap((p) => p.sources),
    ...TRIAZOLES.flatMap((t) => t.sources),
  ]);
  for (const id of Object.keys(SOURCES)) assert.ok(cited.has(id), `source ${id} is not cited anywhere`);
  const stageIds = new Set(STAGES.map((s) => s.id));
  for (const c of CHECKLIST) assert.ok(stageIds.has(c.stage), `checklist ${c.id} -> ${c.stage}`);
  for (const s of STAGES) { assert.ok(s.when && s.summary, s.id); for (const p of s.points) assert.equal(p.general, undefined); }
});

test("library: valid levels, unverified leads only in the library, every topic non-empty", () => {
  const levels = new Set(["evidence", "survey", "expert", "practice", "lead"]);
  for (const t of LIBRARY) {
    assert.ok(t.id && t.title && t.summary && t.points.length, t.id);
    for (const p of t.points) { assert.ok(levels.has(p.level), `${t.id}: ${p.level}`); assert.ok(p.sources.length, `${t.id}: point without source`); }
  }
  for (const s of STAGES) for (const p of s.points) assert.notEqual(p.level, "lead", `guide step ${s.id} contains an unverified lead`);
});

test("offline: service worker caches every app module", async () => {
  const { readFileSync, readdirSync } = await import("node:fs");
  const sw = readFileSync(new URL("../sw.js", import.meta.url), "utf8");
  for (const f of readdirSync(new URL("../src/", import.meta.url))) assert.ok(sw.includes(`src/${f}`), `sw.js missing src/${f}`);
});

test("clean-up: valid test types, groups and levels", () => {
  const tests = new Set(["field", "pot", "soil", "liquid", "unknown"]);
  const levels = new Set(["evidence", "survey", "expert", "practice", "lead"]);
  const groups = new Set(CLEANUP_GROUPS.map((g) => g.id));
  for (const m of MICROBES) { assert.ok(tests.has(m.test), m.name); assert.ok(levels.has(m.level), m.name); assert.ok(m.sources.length, m.name); }
  for (const p of OTHER_CROPS) { assert.ok(groups.has(p.group), p.text); assert.ok(levels.has(p.level), p.text); }
  for (const g of groups) assert.ok(OTHER_CROPS.some((p) => p.group === g), `empty group ${g}`);
});

test("languages: every language file covers every app string, with placeholders intact", async () => {
  const { readFileSync, existsSync } = await import("node:fs");
  const { allStrings } = await import("../scripts/i18n-strings.mjs");
  const { LANGS } = await import("../src/i18n.js");
  const strings = allStrings();
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join(",");
  for (const lang of LANGS.filter((l) => l !== "en")) {
    const file = new URL(`../src/i18n/${lang}.json`, import.meta.url);
    assert.ok(existsSync(file), `missing src/i18n/${lang}.json`);
    const d = JSON.parse(readFileSync(file, "utf8"));
    const missing = strings.filter((s) => !d[s]);
    assert.equal(missing.length, 0, `${lang}: ${missing.length} untranslated, e.g. ${missing.slice(0, 3).join(" | ")}`);
    for (const [k, v] of Object.entries(d)) assert.equal(ph(v), ph(k), `${lang}: placeholders differ in "${k.slice(0, 60)}"`);
  }
});

test("languages: service worker caches every language file", async () => {
  const { readFileSync } = await import("node:fs");
  const { LANGS } = await import("../src/i18n.js");
  const sw = readFileSync(new URL("../sw.js", import.meta.url), "utf8");
  for (const l of LANGS.filter((x) => x !== "en")) assert.ok(sw.includes(`src/i18n/${l}.json`), l);
});

test("fonts: the bundled Khmer font exists, is referenced by the stylesheet and cached offline", async () => {
  const { readFileSync, existsSync } = await import("node:fs");
  const font = "fonts/NotoSansKhmer-khmer.woff2";
  assert.ok(existsSync(new URL(`../${font}`, import.meta.url)), font);
  assert.ok(existsSync(new URL("../fonts/OFL.txt", import.meta.url)), "font licence");
  assert.ok(readFileSync(new URL("../src/styles.css", import.meta.url), "utf8").includes(`../${font}`));
  assert.ok(readFileSync(new URL("../sw.js", import.meta.url), "utf8").includes(font));
});
