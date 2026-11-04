// Pure calculation helpers. No DOM access, so they can be unit-tested in Node.

const DAY = 86_400_000;

/**
 * Stage durations in days. Each has a min / typical / max and the source it comes from.
 *
 * pbzToAnthesis: from the PBZ spray to the first open flowers.
 *   - Kozai et al. 2024: spray 15 Aug, first flower 15 Dec = 122 days, after a very wet fortnight.
 *   - Wiangsamut 2022: a 5 Dec spray gave a June harvest. Subtracting about 124 days of fruit growth
 *     puts anthesis about 60–85 days after the spray.
 *   - Tri et al. 2011 (Vietnam): buds appeared 31–45 days after the spray and took 160–167 days from bud to
 *     harvest, so spray to harvest was 191–212 days. The typical value of 78 + 124 = 202 days sits in that range.
 * anthesisToHarvest ('Monthong'): Sangwanangkul 1998 measured 120–127 days.
 */
export const DEFAULT_STAGES = {
  pbzToAnthesis: { min: 60, typ: 78, max: 122 },
  anthesisToHarvest: { min: 120, typ: 124, max: 127 },
};

/**
 * Cultivar presets for flowering → harvest (days).
 *  - Monthong: 120–127 days from anthesis to maturity (Sangwanangkul 1998).
 *  - Musang King: about 90 days from fruit set (Duong et al. 2025).
 *  - Ri6: 97 days from fruit set (Tran et al. 2019; 6 trees, one season). The ±7-day band is a planning buffer
 *    we added, not a measured range.
 */
export const CULTIVAR_PRESETS = {
  monthong: { label: "Monthong", anthesisToHarvest: { min: 120, typ: 124, max: 127 }, sources: ["sangwanangkul1998"] },
  ri6: { label: "Ri6", anthesisToHarvest: { min: 90, typ: 97, max: 104 }, sources: ["tran2019"] },
  // Musang King: about 90 days after fruit set (Duong et al. 2025); the book gives 90–100 days.
  musangking: { label: "Musang King", anthesisToHarvest: { min: 85, typ: 90, max: 100 }, sources: ["duong2025", "tran2023book"] },
  // Kho Qua Xanh: 94.5–101.2 days flowering → harvest, off-season (Hau 2000, Hâu & Hiếu 2026, Table 5.2).
  khoquaxanh: { label: "Kho Qua Xanh", anthesisToHarvest: { min: 94, typ: 99, max: 102 }, sources: ["tran2023book"] },
  // Sua Hat Lep: 103–114 days flowering → harvest across two seasons (Hau et al. 2001, Hâu & Hiếu 2026, Table 5.3).
  suahatlep: { label: "Sua Hat Lep", anthesisToHarvest: { min: 103, typ: 108, max: 114 }, sources: ["tran2023book"] },
  // Monthong in the cooler Central Highlands: 135–150 days anthesis → harvest (Cuong & Van 2020, via the book).
  monthonghighland: { label: "Monthong (Central Highlands)", anthesisToHarvest: { min: 135, typ: 142, max: 150 }, sources: ["tran2023book"] },
};

/** PBZ concentration band recommended in Vietnam (Tran et al. 2001, via Pham et al. 2022). */
export const PBZ_RECOMMENDED_PPM = { min: 1000, max: 1500 };

export function toUTCDate(input) {
  if (input instanceof Date) return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));
  const [y, m, d] = String(input).split("-").map(Number);
  // Years below 1900 are half-typed input (Date.UTC would read "0002" as 1902), so reject them.
  if (!y || !m || !d || y < 1900) throw new Error("Enter a complete date.");
  const date = new Date(Date.UTC(2000, m - 1, d));
  date.setUTCFullYear(y);
  return date;
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
      throw new Error("Stage lengths need a positive min, typ and max.");
    }
    if (!(s.min <= s.typ && s.typ <= s.max)) throw new Error("Stage lengths must be in order: min ≤ typ ≤ max.");
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
      label: "Before spraying: reset and prime the tree",
      detail: "After harvest: prune, lime (3–5 kg per tree), add compost, and push 2–3 even leaf flushes. Harden the last flush with MKP 0.5–1%, give high-P NPK 7–10 days later, then phosphorous acid 15–20 days after that. Spray once the leaves are mature. Avoid stacking triazole fungicides (hexaconazole, propiconazole, tebuconazole) on these flushes: some add mild growth suppression on top of PBZ.",
      sources: ["tran2023book", "chandraparnik1993", "kozai2024", "matysiak2013"],
    },
    {
      id: "spray",
      date: s,
      label: "PBZ foliar spray",
      detail: "Pick a dry forecast. Spray all leaves (foliar, not soil drench), and keep the rate inside 1,000–1,500 ppm (750 ppm was used on young trees).",
      sources: ["pham2022", "tri2011", "wiangsamut2022"],
    },
    {
      id: "dry",
      date: addDays(s, 3),
      endDate: addDays(anthesis, -55),
      label: "Controlled drought until flower buds show",
      detail: "Length depends on cultivar and region: 3–7 dry days after PBZ in Thai 'Chanee' trials. With mulch and dry ditches in the Mekong Delta, 'Kho Qua Xanh' needs 20–25 days and 'Ri6' / 'Monthong' 30–35. Stop short of severe stress (leaf water potential beyond about −0.8 MPa).",
      sources: ["chandraparnik1993", "tran2023book", "kozai2024"],
    },
    {
      id: "budflush",
      date: addDays(anthesis, -55),
      endDate: addDays(anthesis, -45),
      label: "Buds visible: mulch off, water and feed; force one leaf flush",
      detail: "Buds usually show 25–30 days after induction and take about 55 days to open. The same day, roll up the mulch, fertilise and irrigate; KNO₃ 0.5–1% breaks bud dormancy. 7–10 days later (buds 2–3 cm), force one leaf flush (urea 1–1.5%, KNO₃ or GA₃ 5–10 ppm) so it matures by bloom.",
      sources: ["tran2023book", "kozai2024"],
    },
    {
      id: "prebloom",
      date: addDays(anthesis, -7),
      endDate: anthesis,
      label: "Week before bloom: cut water, thin flowers",
      detail: "Reduce irrigation to 20–25% of pan evaporation (soil about 55–60% of field capacity) until flowers open, but still water above 36 °C. Where flowering is heavy, thin to 3–6 clusters per metre of branch.",
      sources: ["tran2023book"],
    },
    {
      id: "anthesis",
      date: anthesis,
      label: "Flowering (anthesis)",
      detail: "About {typ} days after spraying in this plan (observed range {min}–{max}). Weather moves this date more than anything else.",
      vars: { typ: p.typ, min: p.min, max: p.max },
      sources: ["kozai2024", "wiangsamut2022", "tri2011"],
    },
    {
      id: "fruitset",
      date: anthesis,
      endDate: addDays(anthesis, 42),
      label: "Hold the crop (first 6 weeks after fruit set)",
      detail: "Keep irrigation steady, with no water cut-off, because off-season fruit often meets heavy rain. Spray Ca 7–21 days after set and stop new leaf flushes. Young-fruit drop peaks about 3 weeks after set.",
      sources: ["tran2023book"],
    },
    {
      id: "thinning",
      date: addDays(anthesis, 28),
      endDate: addDays(anthesis, 42),
      label: "Thin the fruit (2–3 passes)",
      detail: "4–6 weeks after fruit set: keep fruit on the middle of the main branches, 1–2 per cluster, and match the load to tree age and branch size. Overloading costs next year's crop; over-thinning triggers a leaf flush.",
      sources: ["tran2023book"],
    },
    {
      id: "fruitcare",
      date: addDays(anthesis, 30),
      endDate: addDays(anthesis, 60),
      label: "Fruit-care window (30–60 days after fruit set)",
      detail: "Reduce nitrogen as the fruit grows: NPK 2:1:1 → 2:1:3 → 1:1:3 at 30 / 45 / 60 days, 0.75 kg per tree each time. Spray Ca(NO₃)₂ 0.4% at 40 days and MgSO₄ 0.2% at 50 days. Tested on 'Musang King' (main-season papers; off-season results so far from conference slides).",
      sources: ["duong2025huaf", "duong2026swj", "hau2026talk"],
    },
    {
      id: "preharvest",
      date: addDays(anthesis, a.typ - 30),
      endDate: addDays(anthesis, a.typ),
      label: "Last month: KNO₃, cut water, guard against rain",
      detail: "Spray KNO₃ 1% about a month before harvest. 15–20 days before, reduce irrigation. If heavy rain comes, mulch the root zone and keep the ditches drained to prevent soggy, mushy flesh.",
      sources: ["tran2023book"],
    },
    {
      id: "harvest",
      date: addDays(anthesis, a.typ),
      label: "Harvest maturity",
      detail: "In this plan, fruit matures {min}–{max} days after flowering ('Monthong' 120–127; 'Ri6' about 97 and 'Musang King' about 90 from fruit set). Count the days from each tagged flower cluster, not from the spray date.",
      vars: { min: a.min, max: a.max },
      sources: ["sangwanangkul1998", "tran2019", "duong2025"],
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
    throw new Error("Concentration, litres and label strength must be positive numbers.");
  }
  if (aiPercent > 100) throw new Error("Label strength cannot be more than 100%.");
  const gramsAI = (ppm * litres) / 1000;
  const gramsProduct = gramsAI / (aiPercent / 100);
  let status = "ok";
  if (ppm > PBZ_RECOMMENDED_PPM.max) status = "high";
  else if (ppm < PBZ_RECOMMENDED_PPM.min) status = "low";
  return { gramsAI, gramsProduct, status };
}

/**
 * Farmer's tank mix: product per tank of water, and how many tanks an orchard needs.
 * Product amount is grams for a powder (WP) or mL for a liquid (SC, taking % as weight per volume).
 */
export function tankMix({ ppm, tankLitres, aiPercent, litresPerTree, trees = 1 }) {
  if (![tankLitres, litresPerTree, trees].every((n) => Number.isFinite(n) && n > 0)) {
    throw new Error("Tank size, litres per tree and number of trees must be positive numbers.");
  }
  const perTank = pbzMix({ ppm, litres: tankLitres, aiPercent });
  const totalLitres = litresPerTree * trees;
  const tanks = Math.ceil(totalLitres / tankLitres - 1e-9);
  return {
    productPerTank: perTank.gramsProduct,
    aiPerTank: perTank.gramsAI,
    treesPerTank: tankLitres / litresPerTree,
    totalLitres,
    tanks,
    productTotal: perTank.gramsProduct * tanks,
    leftoverLitres: tanks * tankLitres - totalLitres,
    status: perTank.status,
  };
}

/** True if any day from start to end (inclusive) falls in a month the grower marked as rainy (0 = Jan). */
export function rainInWindow(start, end, rainyMonths = []) {
  if (!rainyMonths.length) return false;
  const a = toUTCDate(start), b = toUTCDate(end);
  for (let d = new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), 1)); d <= b; d.setUTCMonth(d.getUTCMonth() + 1)) {
    if (rainyMonths.includes(d.getUTCMonth())) return true;
  }
  return false;
}

/** Flag spray dates that fall in months the grower marked as rainy (0 = Jan). */
export function rainRisk(date, rainyMonths = []) {
  return rainyMonths.includes(toUTCDate(date).getUTCMonth());
}

/**
 * Turn Hâu & Hiếu's day-by-day protocol (Table 9.2) into calendar dates for one spray date.
 * Anchors: spray; buds = anthesis − 55 days (bud → bloom ≈ 55 days, Hâu & Hiếu 2026, Ch. 9); anthesis;
 * set = anthesis + 3 days (fertilisation is complete within 3 days of opening); harvest = anthesis + harvest days.
 */
export function buildProtocol(sprayDate, protocol, stages = DEFAULT_STAGES) {
  validateStages(stages);
  const s = toUTCDate(sprayDate);
  const { pbzToAnthesis: p, anthesisToHarvest: a } = stages;
  const anthesis = addDays(s, p.typ);
  const anchors = { spray: s, buds: addDays(anthesis, -55), anthesis, set: addDays(anthesis, 3), harvest: addDays(anthesis, a.typ) };
  const late = a.typ > 100;
  return protocol
    .filter((r) => !(r.late && !late) && !(r.early && late))
    .map((r) => ({
      ...r,
      start: r.anchor ? addDays(anchors[r.anchor], r.from) : null,
      end: r.anchor ? addDays(anchors[r.anchor], r.to) : null,
    }));
}
