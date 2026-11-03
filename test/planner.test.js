import { test } from "node:test";
import assert from "node:assert/strict";
import { pbzMix, planFromHarvest, planFromSpray, isoDate, rainRisk, DEFAULT_STAGES } from "../src/planner.js";

test("pbzMix reproduces the Wiangsamut 2022 recipe (750 ppm, 20 L, 25% WP → 60 g)", () => {
  const r = pbzMix({ ppm: 750, litres: 20, aiPercent: 25 });
  assert.equal(r.gramsAI, 15);
  assert.equal(r.gramsProduct, 60);
  assert.equal(r.status, "low");
});

test("pbzMix reproduces Kozai 2024 dose (1,000 ppm × 20 L = 20 g a.i.)", () => {
  const r = pbzMix({ ppm: 1000, litres: 20, aiPercent: 10 });
  assert.equal(r.gramsAI, 20);
  assert.equal(r.gramsProduct, 200);
  assert.equal(r.status, "ok");
});

test("pbzMix flags above-recommendation rates", () => {
  assert.equal(pbzMix({ ppm: 1816, litres: 7, aiPercent: 15 }).status, "high");
});

test("pbzMix rejects bad input", () => {
  assert.throws(() => pbzMix({ ppm: 0, litres: 20, aiPercent: 25 }));
  assert.throws(() => pbzMix({ ppm: 1000, litres: 20, aiPercent: 120 }));
});

test("planFromSpray matches Kozai 2024 anthesis (15 Aug → 15 Dec at max)", () => {
  const r = planFromSpray("2007-08-15");
  assert.equal(isoDate(r.anthesis.latest), "2007-12-15");
});

test("planFromHarvest and planFromSpray are inverse on typical values", () => {
  const plan = planFromHarvest("2027-06-15");
  const back = planFromSpray(plan.spray.typical);
  assert.equal(isoDate(back.harvest.typical), "2027-06-15");
  assert.ok(plan.spray.earliest < plan.spray.typical && plan.spray.typical < plan.spray.latest);
});

test("planFromHarvest gives a December spray window for a June harvest (consistent with Wiangsamut 2022)", () => {
  const { spray } = planFromHarvest("2023-06-10", DEFAULT_STAGES);
  // 5 Dec 2022 must sit inside the window
  assert.ok(isoDate(spray.earliest) <= "2022-12-05" && "2022-12-05" <= isoDate(spray.latest));
});

test("rainRisk", () => {
  assert.equal(rainRisk("2026-09-01", [8, 9]), true);
  assert.equal(rainRisk("2026-01-01", [8, 9]), false);
});

test("typical spray-to-harvest sits inside Tri et al. 2011 observed 191–212 days", () => {
  const { pbzToAnthesis: p, anthesisToHarvest: a } = DEFAULT_STAGES;
  const total = p.typ + a.typ;
  assert.ok(total >= 191 && total <= 212, `got ${total}`);
});

test("pbzMix reproduces Tri et al. 2011 (1,400 ppm × 20 L = 28 g a.i. = 280 g of 10% WP)", () => {
  const r = pbzMix({ ppm: 1400, litres: 20, aiPercent: 10 });
  assert.equal(r.gramsAI, 28);
  assert.equal(r.gramsProduct, 280);
});

test("cultivar presets are valid and Ri6 harvests sooner than Monthong", async () => {
  const { CULTIVAR_PRESETS } = await import("../src/planner.js");
  const spray = "2026-06-15";
  const h = (k) => planFromSpray(spray, { ...DEFAULT_STAGES, anthesisToHarvest: CULTIVAR_PRESETS[k].anthesisToHarvest }).harvest.typical;
  assert.equal(CULTIVAR_PRESETS.ri6.anthesisToHarvest.typ, 97);
  assert.ok(h("ri6") < h("monthong"));
});

test("Musang King preset is ~90 days and timeline includes the fruit-care window", async () => {
  const { CULTIVAR_PRESETS, buildTimeline } = await import("../src/planner.js");
  assert.equal(CULTIVAR_PRESETS.musangking.anthesisToHarvest.typ, 90);
  const tl = buildTimeline("2026-06-01");
  const fc = tl.find((t) => t.id === "fruitcare");
  const an = tl.find((t) => t.id === "anthesis");
  assert.equal((fc.date - an.date) / 86400000, 30);
});
