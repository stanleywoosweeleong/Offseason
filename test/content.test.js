import { test } from "node:test";
import assert from "node:assert/strict";
import { SOURCES } from "../src/sources.js";
import { STAGES, PBZ_TRIALS, PBZ_SAFETY, CHECKLIST } from "../src/guide.js";
import { buildTimeline, CULTIVAR_PRESETS } from "../src/planner.js";

test("every cited source ID exists in sources.js", () => {
  const ids = [
    ...STAGES.flatMap((s) => s.points.flatMap((p) => p.sources)),
    ...PBZ_TRIALS.map((t) => t.source),
    ...PBZ_SAFETY.flatMap((p) => p.sources),
    ...buildTimeline("2026-01-01").flatMap((t) => t.sources),
    ...Object.values(CULTIVAR_PRESETS).flatMap((c) => c.sources),
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
  ]);
  for (const id of Object.keys(SOURCES)) assert.ok(cited.has(id), `source ${id} is not cited anywhere`);
  const stageIds = new Set(STAGES.map((s) => s.id));
  for (const c of CHECKLIST) assert.ok(stageIds.has(c.stage), `checklist ${c.id} -> ${c.stage}`);
  for (const s of STAGES) { assert.ok(s.when && s.summary, s.id); for (const p of s.points) assert.equal(p.general, undefined); }
});
