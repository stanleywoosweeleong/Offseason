// Pure calculation helpers. No DOM access, so they can be unit-tested in Node.

const DAY = 86_400_000;

/**
 * Stage durations in days. Each has a min / typical / max and the source it comes from.
 *
 * pbzToAnthesis: from the PBZ spray to the first open flowers.
 *   - Kozai et al. 2024: spray 15 Aug, first flower 15 Dec = 122 days, after a very wet fortnight.
 *   - Wiangsamut 2022: a 5 Dec spray gave a June harvest. Subtracting about 124 days of fruit growth
 *     puts anthesis about 60–85 days after the spray.
 * anthesisToHarvest ('Monthong'): Sangwanangkul 1998 measured 120–127 days.
 */
export const DEFAULT_STAGES = {
  pbzToAnthesis: { min: 60, typ: 90, max: 122 },
  anthesisToHarvest: { min: 120, typ: 124, max: 127 },
};

/** PBZ concentration band recommended in Vietnam (Tran et al. 2001, via Pham et al. 2022). */
export const PBZ_RECOMMENDED_PPM = { min: 1000, max: 1500 };

export function toUTCDate(input) {
  if (input instanceof Date) return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));
  const [y, m, d] = String(input).split("-").map(Number);
  if (!y || !m || !d) throw new Error(`Invalid date: ${input}`);
  return new Date(Date.UTC(y, m - 1, d));
}

export function addDays(date, days) {
  return new Date(toUTCDate(date).getTime() + days * DAY);
}

export function isoDate(date) {
  return toUTCDate(date).toISOString().slice(0, 10);
}

function validateStages(stages) {
  for (const key of ["pbzToAnthesis", "anthesisToHarvest"]) {
    const s = stages[key];
    if (!s || ![s.min, s.typ, s.max].every((n) => Number.isFinite(n) && n > 0)) {
      throw new Error(`Stage ${key} needs positive min/typ/max`);
    }
    if (!(s.min <= s.typ && s.typ <= s.max)) throw new Error(`Stage ${key} must satisfy min ≤ typ ≤ max`);
  }
}

/**
 * Work backwards from a target harvest date to a PBZ spray window.
 * earliest = harvest − (max + max) and latest = harvest − (min + min).
 * Spraying anywhere in that window can land on the target, depending on season and tree.
 */
export function planFromHarvest(harvestDate, stages = DEFAULT_STAGES) {
  validateStages(stages);
  const h = toUTCDate(harvestDate);
  const { pbzToAnthesis: p, anthesisToHarvest: a } = stages;
  const spray = {
    earliest: addDays(h, -(p.max + a.max)),
    typical: addDays(h, -(p.typ + a.typ)),
    latest: addDays(h, -(p.min + a.min)),
  };
  return { harvest: h, spray, timeline: buildTimeline(spray.typical, stages) };
}

/** Work forwards from a planned (or completed) spray date to a likely harvest range. */
export function planFromSpray(sprayDate, stages = DEFAULT_STAGES) {
  validateStages(stages);
  const s = toUTCDate(sprayDate);
  const { pbzToAnthesis: p, anthesisToHarvest: a } = stages;
  return {
    spray: s,
    anthesis: { earliest: addDays(s, p.min), typical: addDays(s, p.typ), latest: addDays(s, p.max) },
    harvest: {
      earliest: addDays(s, p.min + a.min),
      typical: addDays(s, p.typ + a.typ),
      latest: addDays(s, p.max + a.max),
    },
    timeline: buildTimeline(s, stages),
  };
}

/** Milestones anchored on the typical spray date. Each one carries the source IDs that justify it. */
export function buildTimeline(sprayDate, stages = DEFAULT_STAGES) {
  const s = toUTCDate(sprayDate);
  const { pbzToAnthesis: p, anthesisToHarvest: a } = stages;
  const anthesis = addDays(s, p.typ);
  return [
    {
      id: "flush",
      date: null,
      label: "Before spraying: two leaf flushes",
      detail: "After harvest, prune and feed the tree so it pushes new leaves. Spray once the second post-harvest flush has fully expanded.",
      sources: ["chandraparnik1993", "kozai2024"],
    },
    {
      id: "spray",
      date: s,
      label: "PBZ foliar spray",
      detail: "Pick a dry forecast. Spray all leaves, and keep the rate inside 1,000–1,500 ppm (750 ppm was used on young trees).",
      sources: ["pham2022", "wiangsamut2022", "jantee"],
    },
    {
      id: "dry",
      date: addDays(s, 3),
      endDate: addDays(s, 7),
      label: "Mild dry spell: 3–7 days",
      detail: "Treated trees need only 3–7 dry days, compared with 10–14 for untreated trees. Do not push the tree into severe drought.",
      sources: ["chandraparnik1993", "kozai2024"],
    },
    {
      id: "anthesis",
      date: anthesis,
      label: "Flowering (anthesis)",
      detail: `About ${p.typ} days after spraying in this plan (observed range ${p.min}–${p.max}). Weather moves this date more than anything else.`,
      sources: ["kozai2024", "wiangsamut2022"],
    },
    {
      id: "harvest",
      date: addDays(anthesis, a.typ),
      label: "Harvest maturity",
      detail: `'Monthong' takes ${a.min}–${a.max} days from anthesis to maturity. Count the days from each tagged flower cluster, not from the spray date.`,
      sources: ["sangwanangkul1998"],
    },
  ];
}

/**
 * Spray-tank mix.
 *   g a.i. = ppm × litres / 1000
 *   g product = g a.i. / (a.i.% / 100)
 * Example (Wiangsamut 2022): 750 ppm × 20 L = 15 g a.i., which is 60 g of 25% WP.
 */
export function pbzMix({ ppm, litres, aiPercent }) {
  if (![ppm, litres, aiPercent].every((n) => Number.isFinite(n) && n > 0)) {
    throw new Error("ppm, litres and aiPercent must be positive numbers");
  }
  if (aiPercent > 100) throw new Error("aiPercent cannot exceed 100");
  const gramsAI = (ppm * litres) / 1000;
  const gramsProduct = gramsAI / (aiPercent / 100);
  let status = "ok";
  if (ppm > PBZ_RECOMMENDED_PPM.max) status = "high";
  else if (ppm < PBZ_RECOMMENDED_PPM.min) status = "low";
  return { gramsAI, gramsProduct, status };
}

/** Flag spray dates that fall in months the grower marked as rainy (0 = Jan). */
export function rainRisk(date, rainyMonths = []) {
  return rainyMonths.includes(toUTCDate(date).getUTCMonth());
}
