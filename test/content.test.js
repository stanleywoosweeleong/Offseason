import { test } from "node:test";
import assert from "node:assert/strict";
import { SOURCES } from "../src/sources.js";
import { STAGES, PBZ_TRIALS, PBZ_SAFETY } from "../src/guide.js";
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
