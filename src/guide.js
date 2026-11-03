// Step-by-step guide content. Every claim lists the source IDs it rests on (see sources.js).
// Each item has a `level`:
//   "evidence" – measured in a cited trial
//   "survey"   – what growers report doing, not a controlled trial
//   "practice" – common practice that the cited trials did not test; check with local extension staff

export const STAGES = [
  {
    id: "ready",
    title: "Check the orchard is ready",
    summary: "Off-season induction stresses the tree, so start only with healthy, well-drained trees.",
    points: [
      {
        text: "Phytophthora was linked to flooding and poor drainage. Mounding, drainage channels and organic mulch or manure all reduced disease. Fix drainage before you add any extra stress.",
        level: "evidence",
        sources: ["aciar2022"],
      },
      {
        text: "Phosphonate trunk injection or bark spray was effective against Phytophthora in durian trials. Treat any cankers before you induce flowering.",
        level: "evidence",
        sources: ["aciar2022"],
      },
      {
        text: "The PBZ trials used bearing trees aged 9–12 years. One study used young 'Monthong' trees at a lower 750 ppm rate, and 93.6–97% of them flowered.",
        level: "evidence",
        sources: ["kozai2024", "chandraparnik1993", "wiangsamut2022"],
      },
    ],
  },
  {
    id: "flush",
    title: "After harvest: build two leaf flushes",
    summary: "PBZ works on mature leaves. The trials sprayed only once the post-harvest flush had fully expanded.",
    points: [
      {
        text: "After harvest, the trees were pruned and managed to push new leaf flushes. PBZ was applied once the new flush leaves had fully expanded.",
        level: "evidence",
        sources: ["chandraparnik1993"],
      },
      {
        text: "In the JIRCAS trial, the spray date matched the full expansion of the second flush after harvest.",
        level: "evidence",
        sources: ["kozai2024"],
      },
      {
        text: "The late-flowering method used a fertiliser and watering programme first, then sprayed PBZ on mature leaves.",
        level: "evidence",
        sources: ["jantee"],
      },
    ],
  },
  {
    id: "timing",
    title: "Choose your market window",
    summary: "Off-season pays because prices fall during the peak. Plan backwards from the month you want to sell.",
    points: [
      {
        text: "In Thailand the main harvest runs from April to September, and the off-season runs from October to March. Prices drop during the peak.",
        level: "evidence",
        sources: ["kozai2024"],
      },
      {
        text: "With 1,000 ppm PBZ, trees flowered 9–36 days before normal in-season flowering. A separate late method delayed flowering by 28–43 days, which stretches the selling period at both ends.",
        level: "evidence",
        sources: ["jantee"],
      },
      {
        text: "On young 'Monthong' trees, a 5 Dec spray gave a June harvest with higher gross returns than a 5 Nov spray, which gave a May harvest. Earlier is not always more profitable.",
        level: "evidence",
        sources: ["wiangsamut2022"],
      },
      {
        text: "Use the Planner tab to turn a target harvest date into a spray window.",
        level: "practice",
        sources: [],
      },
    ],
  },
  {
    id: "spray",
    title: "Apply paclobutrazol (PBZ) correctly",
    summary: "PBZ is a triazole growth regulator that blocks gibberellin. More is not better.",
    points: [
      {
        text: "The recommended concentration for mature trees is 1,000–1,500 ppm as a foliar spray. Treated trees flowered 14–45 days earlier, with 29–64% more flowers. Higher rates gave a stronger response, but fruit set was not improved.",
        level: "evidence",
        sources: ["chandraparnik1993", "pham2022"],
      },
      {
        text: "For young 'Monthong' trees, the trial used 750 ppm (60 ml of 25% WP in 20 L per tree).",
        level: "evidence",
        sources: ["wiangsamut2022"],
      },
      {
        text: "The JIRCAS trial gave each mature tree about 20–30 g a.i. (1,000–1,500 ppm × about 20 L). Vietnamese growers sprayed 7–9.5 L per tree.",
        level: "evidence",
        sources: ["kozai2024", "pham2022"],
      },
      {
        text: "Overdosing is common: 65% of surveyed Tien Giang growers sprayed above 1,500 ppm, at a mean of 1,816 ppm. After 5 or more years, residue built up in the topsoil (up to about 1 mg/kg) at the canopy edge. Use the Mix tab to weigh out an exact dose.",
        level: "survey",
        sources: ["pham2022"],
      },
      {
        text: "Spray only when the forecast is dry. About 187 mm of rain fell in the 14 days after the JIRCAS spray, and the PBZ effect was weak and inconsistent.",
        level: "evidence",
        sources: ["kozai2024", "chandraparnik1992"],
      },
      {
        text: "Use only PBZ products registered for fruit trees in your country, and follow the label for protective equipment and pre-harvest intervals.",
        level: "practice",
        sources: [],
      },
    ],
  },
  {
    id: "water",
    title: "Manage water: a mild dry spell, not drought",
    summary: "The most important lesson from recent research is that the tree needs some stress, but not too much.",
    points: [
      {
        text: "After PBZ, 3–7 dry days were enough to trigger flowering. Untreated trees needed 10–14.",
        level: "evidence",
        sources: ["chandraparnik1993", "chandraparnik1992"],
      },
      {
        text: "Severe drought blocks flowering. Plastic mulch dropped leaf water potential to −0.9 MPa, delayed flowering, and cut flower clusters from about 9 to under 1 per metre of branch, whether or not PBZ was used.",
        level: "evidence",
        sources: ["kozai2024"],
      },
      {
        text: "About a third of surveyed Vietnamese growers cover the root zone with plastic before spraying. Given the JIRCAS result, do not leave a cover on for weeks. The mulched trees in that study were covered for about 8 weeks.",
        level: "survey",
        sources: ["pham2022", "kozai2024"],
      },
      {
        text: "Once flower buds are clearly visible, bring the tree back to steady, moderate watering so the buds develop. Ask local extension staff for exact amounts.",
        level: "practice",
        sources: [],
      },
    ],
  },
  {
    id: "fruit",
    title: "Flowering through harvest",
    summary: "Time the harvest from flower opening, not from the spray date.",
    points: [
      {
        text: "In the JIRCAS trial, the first buds appeared about 10 weeks after spraying and the first flowers about 7 weeks after that.",
        level: "evidence",
        sources: ["kozai2024"],
      },
      {
        text: "'Monthong' fruit matures 120–127 days after anthesis. Tag each flower cluster with its opening date.",
        level: "evidence",
        sources: ["sangwanangkul1998"],
      },
      {
        text: "Fruit cut at 120 days ripened in 6–9 days, and fruit cut at 127 days ripened in 4–6 days with peak sugars. Choose the cut date to suit how far the fruit has to travel.",
        level: "evidence",
        sources: ["sangwanangkul1998"],
      },
      {
        text: "PBZ slowed flower and fruit development a little, so allow a few extra days on treated trees.",
        level: "evidence",
        sources: ["chandraparnik1993"],
      },
      {
        text: "Off-season fruit often grows through wetter months. Keep drainage and Phytophthora controls in place until harvest.",
        level: "evidence",
        sources: ["aciar2022"],
      },
    ],
  },
];

export const GAPS = [
  "Potassium chlorate (KClO₃) is well documented for longan, but no peer-reviewed durian trial was found. Treat it as untested on durian.",
  "Results vary a lot with weather, even in controlled trials. JIRCAS concluded that more research is needed on the conditions that make PBZ reliable.",
  "Most trials are on Thai 'Monthong' and 'Chanee'. Timings for Musang King, Ri6 and other cultivars need local validation.",
  "The long-term effects of repeated yearly PBZ use on tree vigour and soil are not well studied beyond residue surveys.",
];

export const CHECKLIST = [
  { id: "drain", text: "Drainage checked; no standing water around trunks", stage: "ready" },
  { id: "canker", text: "Trunks inspected; Phytophthora cankers treated", stage: "ready" },
  { id: "prune", text: "Post-harvest pruning done", stage: "flush" },
  { id: "flush2", text: "Second post-harvest flush fully expanded (leaves hardened, dark green)", stage: "flush" },
  { id: "window", text: "Target harvest date chosen and spray window worked out", stage: "timing" },
  { id: "product", text: "Registered PBZ product bought; a.i.% read from the label", stage: "spray" },
  { id: "dose", text: "Dose weighed for 1,000–1,500 ppm (750 for young trees)", stage: "spray" },
  { id: "forecast", text: "Forecast shows no heavy rain for at least 7 days", stage: "spray" },
  { id: "drywatch", text: "Irrigation held back for a short (3–7 day) dry spell only", stage: "water" },
  { id: "tag", text: "Flower clusters tagged with their opening date", stage: "fruit" },
];
