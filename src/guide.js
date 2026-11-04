// Guide content for one topic: producing durian off-season.
// STAGES follow the off-season cycle in order. Every claim lists the source IDs it rests on (see sources.js).
// Each point has a `level`:
//   "evidence" – measured in a cited trial
//   "survey"   – what growers report doing, not a controlled trial
//   "expert"   – a researcher's recommendation built on their trials, not itself tested as stated
//   "practice" – common practice that the cited trials did not test; check with local extension staff

export const STAGES = [
  {
    "id": "decide",
    "title": "Decide your off-season window",
    "when": "Months ahead",
    "summary": "Off-season fruit sells for more because supply is low. Choose the harvest month first, check that your region and weather can deliver it, then plan backwards.",
    "points": [
      {
        "text": "Why bother: in Vietnam, durian prices are low at the May–July peak and two to three times higher off-season. Harvest in the Mekong Delta's main season also overlaps the start of the rains, which lowers fruit quality.",
        "level": "evidence",
        "sources": [
          "tri2011"
        ]
      },
      {
        "text": "Think in 12-month cycles. The book's month-by-month chart for off-season 'Ri6' and 'Musang King' runs: harvest in months 1–2; liming, pruning and the first leaf flush in months 2–4; a second flush in months 5–6; priming, PBZ, mulch and drought in month 7; flower buds in month 8; fruit set in month 9; and fruit growth to harvest by month 12. That is one off-season crop per tree per year. Two leaf flushes plus about 6–7 months from PBZ to harvest leave no room for more (book p. 301; months read approximately from the chart).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "In Vietnam's Mekong Delta, good irrigation and drainage let growers induce flowering year-round. Natural flowering is Dec–Jan, with harvest in May–Jun. Growers aiming for off-season fruit usually induce in June–July.",
        "level": "evidence",
        "sources": [
          "hau2017",
          "pham2022"
        ]
      },
      {
        "text": "Only start if you control water. Off-season induction needs water you can switch on and off: drain the ditches to create drought, re-water the day buds appear, keep irrigation steady through fruit set, and drain before a rainy harvest. Where buds dry out with no irrigation, they stall. Growers say 'only use PBZ if you have enough water', and that is sound advice, but the reason is this water control, not washing PBZ out of the soil (see step 8).",
        "level": "expert",
        "sources": [
          "tran2023book",
          "hau2017"
        ]
      },
      {
        "text": "Regional calendars in Vietnam: the Mekong Delta flowers in Dec–Jan and harvests in Apr–May; the Southeast flowers Jan–Mar and harvests Jun–Aug; the Central Highlands mostly flowers Jan–Mar and harvests Jul–Aug. Only the Mekong Delta, with controllable irrigation and drainage, does full off-season induction. The other regions mainly support natural flowering.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "In Thailand the main harvest runs from April to September, and the off-season runs from October to March. Prices drop during the peak.",
        "level": "evidence",
        "sources": [
          "kozai2024"
        ]
      },
      {
        "text": "The hardest window is an August–September harvest in the Mekong Delta. It needs flowering in February–March while suppressing the natural cool, dry-season bloom of December–January. Prices are high then, but the authors note the success rate is low, so few growers try it.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "On young 'Monthong' trees, a 5 Dec spray gave a June harvest with higher gross returns than a 5 Nov spray, which gave a May harvest. Earlier is not always more profitable.",
        "level": "evidence",
        "sources": [
          "wiangsamut2022"
        ]
      },
      {
        "text": "With 1,000 ppm PBZ, trees flowered 9–36 days before normal in-season flowering. A separate late method delayed flowering by 28–43 days, which stretches the selling period at both ends.",
        "level": "evidence",
        "sources": [
          "jantee"
        ]
      },
      {
        "text": "Avoid inducing during heavy-rain months. Fruit set suffers. Durian can be induced year-round in the Mekong Delta and Malaysia, but timing the rain matters.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Pick a flowering-friendly weather window. Best conditions: nights of 20–22 °C with about an 8 °C day-night swing (around 30/22 °C) and air humidity of 50–60%. Nights staying above 26 °C burn up the tree's starch. Nights below 18–19 °C can 'burn' young buds.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Watch the monsoon. In the Mekong Delta, the dry Northeast monsoon (humidity 50–60%) favours flowering, and the wet Southwest monsoon (80–90%) pushes leaf growth. In transition periods, treatments applied a few days apart can give different results, so check wind direction and humidity forecasts before inducing.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Light changes through the year. Mekong Delta radiation is about 17–21 MJ/m²/day and dips in the rainy Sep–Nov. The Central Highlands get about 18–22, with a bigger seasonal swing. High dry-season light helps flowering, but the heat of late April–May works against it, and the dull, rainy Aug–Oct favours leaves.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Use the Planner tab to turn a target harvest date into a spray window.",
        "level": "practice",
        "sources": []
      }
    ]
  },
  {
    "id": "prepare",
    "title": "Prepare the tree after the last harvest",
    "when": "Post-harvest · two leaf flushes",
    "summary": "Induction stresses the tree. Start only with healthy, well-drained trees that have pushed and hardened two new leaf flushes.",
    "points": [
      {
        "text": "Drainage comes before any flowering treatment. Waterlogged roots run short of oxygen, take up less calcium, and produce ethylene that blocks flower-bud formation. Sprays such as thiourea cannot fix this. Restore drainage first.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Leaves are durian's food store. Unlike mango or longan, durian keeps its carbohydrate reserves mainly in its leaves. A weak flush, or one stripped by pests or Phytophthora, means poor flowering and poor fruit next season (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Fix soil pH straight after harvest. Apply 3–5 kg agricultural lime per tree (about 500–1,000 kg/ha), or dolomite where magnesium is short, to bring soil pH to 6.0–6.5. Gypsum does not raise pH. Below pH 6.5, soluble cadmium rises and can accumulate in the flesh, which is a residue issue for export markets. Below pH 5, aluminium, iron, manganese and heavy metals start to poison the roots. Biochar (one application, at most 1–2% of the topsoil by weight) binds cadmium, but too much pushes pH too high (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Then regrow the roots. 15–20 days after liming, apply 20–30 kg of well-rotted compost per tree, ideally with Trichoderma against Phytophthora and Fusarium, plus a humic-acid drench. When new feeder-root tips appear, apply 1–2 kg NPK 3:2:1 or 4:3:2 per tree. Water every 1–2 days, keeping soil at 70–75% of field capacity and never waterlogged (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Phytophthora was linked to flooding and poor drainage. Mounding, drainage channels and organic mulch or manure all reduced disease. Fix drainage before you add any extra stress.",
        "level": "evidence",
        "sources": [
          "aciar2022"
        ]
      },
      {
        "text": "The PBZ trials used bearing trees aged 9–12 years. One study used young 'Monthong' trees at a lower 750 ppm rate, and 93.6–97% of them flowered.",
        "level": "evidence",
        "sources": [
          "kozai2024",
          "chandraparnik1993",
          "wiangsamut2022"
        ]
      },
      {
        "text": "After harvest, the trees were pruned and managed to push new leaf flushes. PBZ was applied once the new flush leaves had fully expanded.",
        "level": "evidence",
        "sources": [
          "chandraparnik1993"
        ]
      },
      {
        "text": "Post-harvest pruning: remove diseased, weak, crossing and low branches and the vertical 'water shoots', and thin small shaded branches so light reaches the large inner branches where durian flowers and fruits. Collect and destroy diseased wood, fruit and leaves; borer larvae can survive in it (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Push and protect the flush. Use foliar NPK (1:1:1, 2:1:1 or 3:1:1 depending on vigour), with GA₃ at 5–10 ppm, amino acids or seaweed extract to speed shoot growth. Once leaves expand, give micronutrient sprays every 2–3 weeks. Watch for Phytophthora on young leaves in the rainy season, and for psyllids, leafhoppers and thrips in the dry season (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Synchronise the flushes. Cai Lay growers push 2–3 flushes after harvest. To make each one emerge evenly, they harden the previous flush with an MKP spray (0.5–1%) and briefly withhold water, then trigger the next flush in one wave. The book's protocol table puts the pause at 5–7 days without water before fertilising the next flush, and keeps ditch water 60–80 cm below the beds (book Ch. 9, Table 9.2).",
        "level": "practice",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "In the JIRCAS trials in Thailand and the SOFRI trials in Vietnam, spraying was timed to the full expansion of the second flush after harvest.",
        "level": "evidence",
        "sources": [
          "kozai2024",
          "tri2011"
        ]
      },
      {
        "text": "A practical sign from Mekong Delta growers: spray when the new leaves have turned from light green to dark green, about 2–3 months old.",
        "level": "evidence",
        "sources": [
          "hau2017"
        ]
      },
      {
        "text": "Prune to open the canopy. Thai trials found well-pruned trees with open, light-filled canopies flowered more than dense ones. Sunlit outer branches store more starch and form flower buds more readily than shaded inner branches (Salakpetch 2005, as reported in the book).",
        "level": "evidence",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "The late-flowering method used a fertiliser and watering programme first, then sprayed PBZ on mature leaves.",
        "level": "evidence",
        "sources": [
          "jantee"
        ]
      }
    ]
  },
  {
    "id": "spray",
    "title": "Induce: spray paclobutrazol (PBZ)",
    "when": "Day 0",
    "summary": "PBZ is the main off-season tool. It works when the dose, the leaves and the weather are right, and fails or harms when they are not.",
    "points": [
      {
        "text": "Prime the tree before PBZ (book Ch. 9). (1) When the last flush is fully expanded but still soft and light green, spray MKP (0-52-34) at 0.5–1.0% to harden it evenly. (2) 7–10 days later, apply 1.0–1.5 kg per tree of a high-phosphorus NPK (1:3:2 or 1:3:3), using refined DAP or MAP, because low-grade phosphate can carry cadmium. (3) 15–20 days later, spray phosphorous acid (H₃PO₃) at 0.5–1.0%, once or twice at 10–15-day intervals, as a mild stress. Then spray PBZ on the mature leaves.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "How it works: PBZ blocks gibberellin, the hormone that drives shoot growth, and raises cytokinin. The tree puts its resources into flower buds instead of new leaves. In durian this has been measured: on 10-year-old 'Monthong', 4 g a.i. PBZ per tree gave the lowest gibberellin and the highest cytokinin (kinetin). Adding an 800 ppm ethephon spray also lowered ABA and gave the most flowers (Sakhidin & Suparto 2012).",
        "level": "evidence",
        "sources": [
          "desta2021",
          "sakhidin2012"
        ]
      },
      {
        "text": "The recommended concentration for mature trees is 1,000–1,500 ppm as a foliar spray. Treated trees flowered 14–45 days earlier, with 29–64% more flowers. Higher rates gave a stronger response, but fruit set was not improved.",
        "level": "evidence",
        "sources": [
          "chandraparnik1993",
          "pham2022"
        ]
      },
      {
        "text": "In Vietnam, 1,000–1,600 ppm (20–32 g a.i. in 20 L per tree) brought flower buds 15–22 days earlier and the harvest 19–24 days earlier, and raised yield by 25–60%. Individual fruit were somewhat lighter at the highest rates, and quality (Brix, flesh ratio) was unchanged.",
        "level": "evidence",
        "sources": [
          "tri2011"
        ]
      },
      {
        "text": "An earlier Can Tho University trial on 'Sua Hat Lep' found that 1,000–1,500 ppm brought flowering 7–15 days earlier and raised yield by about 22.5%. This is the source of Vietnam's 1,000–1,500 ppm recommendation, reported here as cited in Pham et al.",
        "level": "evidence",
        "sources": [
          "pham2022"
        ]
      },
      {
        "text": "Cultivars respond differently. 'Kho qua xanh' flowers 20–25 days after induction. 'Ri6', 'Monthong' and 'Sua hat lep' are harder to induce and take 30–35 days or more.",
        "level": "evidence",
        "sources": [
          "hau2017"
        ]
      },
      {
        "text": "PBZ makes flowering more even across the tree, which makes flower and fruit thinning easier. With raised-bed mulching, PBZ did not affect fruit quality in 'Kho Qua Xanh' or 'Sua Hat Lep'.",
        "level": "evidence",
        "sources": [
          "tran2023book",
          "tri2011",
          "subhadrabandhu1998"
        ]
      },
      {
        "text": "Results are not guaranteed. In a 2-year Thai trial on 'Chanee', 500–1,000 ppm sprays raised flowering intensity but did NOT advance flowering or raise yield, and fruit were smaller. The JIRCAS trial also saw a weak effect.",
        "level": "evidence",
        "sources": [
          "subhadrabandhu1998",
          "kozai2024"
        ]
      },
      {
        "text": "Use a foliar spray, not a soil drench. Every durian trial cited here sprayed the leaves. Durian is more sensitive to PBZ than mango, and drenched trees may decline or recover slowly. Soil drenches also leave much more residue in the soil, as mango data show.",
        "level": "evidence",
        "sources": [
          "subhadrabandhu1998",
          "singh2024"
        ]
      },
      {
        "text": "Timing within the season matters. In Indonesia, an August application flowered faster than June or July. In Thailand, a December spray earned more than a November one.",
        "level": "evidence",
        "sources": [
          "sakhidin2019",
          "wiangsamut2022"
        ]
      },
      {
        "text": "For young 'Monthong' trees, the trial used 750 ppm (60 ml of 25% WP in 20 L per tree).",
        "level": "evidence",
        "sources": [
          "wiangsamut2022"
        ]
      },
      {
        "text": "The JIRCAS trial gave each mature tree about 20–30 g a.i. (1,000–1,500 ppm × about 20 L). Vietnamese growers sprayed 7–9.5 L per tree.",
        "level": "evidence",
        "sources": [
          "kozai2024",
          "pham2022"
        ]
      },
      {
        "text": "Overdosing is common: 65% of surveyed Tien Giang growers sprayed above 1,500 ppm, at a mean of 1,816 ppm. After 5 or more years, residue built up in the topsoil (up to about 1 mg/kg) at the canopy edge. Use the Mix tab to weigh out an exact dose.",
        "level": "survey",
        "sources": [
          "pham2022"
        ]
      },
      {
        "text": "Spray only when the forecast is dry. About 187 mm of rain fell in the 14 days after the JIRCAS spray, and the PBZ effect was weak and inconsistent.",
        "level": "evidence",
        "sources": [
          "kozai2024",
          "chandraparnik1992"
        ]
      },
      {
        "text": "Rest the trees. SOFRI recommends pausing PBZ for 1–2 seasons after every 3–4 seasons of use, because residue builds up in the soil. PBZ's soil half-life ranges from about 2 months in mango orchard fields to over a year in regulatory tests.",
        "level": "evidence",
        "sources": [
          "tri2011",
          "kishore2015",
          "singh2024"
        ]
      },
      {
        "text": "Check the residue limit in your destination market before you spray. In the EU, durian has no specific PBZ limit, so the default of 0.01 mg/kg may apply. In mango, no residue was found in fruit at optimised rates.",
        "level": "evidence",
        "sources": [
          "efsa2017",
          "singh2024",
          "kishore2015"
        ]
      },
      {
        "text": "PBZ is rated moderately hazardous to people and highly toxic to aquatic life. Keep sprays and rinse water out of ditches and ponds. This matters most in Mekong-style raised-bed orchards.",
        "level": "evidence",
        "sources": [
          "kishore2015"
        ]
      },
      {
        "text": "Use only PBZ products registered for fruit trees in your country, and follow the label for protective equipment and pre-harvest intervals.",
        "level": "practice",
        "sources": []
      },
      {
        "text": "Before or after the plastic? The book recommends spraying BEFORE mulching. PBZ is readily taken up by roots, so spray that drips onto bare soil still works, whereas spray landing on plastic washes into the ditches. If PBZ is applied to the soil, irrigate for 2–3 days so the roots take it up. Many growers spray over the plastic precisely to avoid soil residue. This is a real trade-off: more soil uptake means more PBZ building up in the soil (see step 8, and the warning against soil drenches in durian). Surveyed orchards held residue only at the drip line.",
        "level": "expert",
        "sources": [
          "tran2023book",
          "pham2022",
          "subhadrabandhu1998"
        ]
      },
      {
        "text": "Use enough spray volume. Many growers mix a high concentration but apply too little liquid per tree. Surveyed growers sprayed 1,816 ppm but delivered only 11.8 g a.i. per tree (Tien Giang), or 1,240 ppm and 10.5 g (Ben Tre). The successful trials gave 20–32 g a.i. per tree (1,000–1,600 ppm × 20 L). Check the grams per tree in the PBZ mix tab. The book's own protocol (Table 9.2) sets a floor: an 8–10-year tree needs at least 10–12 L of spray, about 12–15 g a.i. per tree.",
        "level": "expert",
        "sources": [
          "tran2023book",
          "pham2022",
          "tri2011"
        ]
      },
      {
        "text": "Adjust the dose to season and tree (book Table 9.2). Use the lower end (about 1,000 ppm) in the natural season and the higher end off-season. Vigorous or young bearing trees need more. Spray in the early morning or late afternoon. Do not induce very young trees, or trees that have lost leaves to Phytophthora. Without PBZ, off-season flowering typically reaches only 50–60% of trees, depending on rain.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Spray inside the canopy too. Spray both leaf surfaces and the main branches inside the canopy. Inner branches get less carbohydrate and are harder to induce, so growers use a concentration 20–30% higher there than on the outer leaves. Some instead lightly mist the outer canopy at a low concentration. The book reports these as standard practice, but no trial has tested the exact rates (book Ch. 5, Ch. 9).",
        "level": "practice",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Cultivars differ in how they respond. 'Kho Qua Xanh' (off-season, Cai Lay): with PBZ, buds appeared 19 days after spraying instead of 26, but flowering came only 3–4 days earlier. Flower clusters roughly doubled (72 → 152–163 per tree), and yield rose from 120 to 186–191 kg per tree, although fruit were lighter (2.2 vs 2.5 kg). 'Sua Hat Lep' responded 4–22 days earlier, in several drawn-out flushes. In year 1 its off-season yield rose from 24.6 to 41.5–55.5 kg per tree, but in year 2 the off-season gain was not significant (Hau 2000; Hau et al. 2001; book Tables 5.2–5.7).",
        "level": "evidence",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Thiourea can wake dormant buds after PBZ. On 'Chanee', 500–1,500 ppm thiourea applied after 1,000 ppm PBZ gave 20 times more flowers than untreated trees and 75% more than PBZ alone. It does not work if daily rain exceeds 35 mm (Chandraparnik et al. 1992a, as reported in the book, p. 141; checked against a clear rescan).",
        "level": "evidence",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Other options: uniconazole at 100–500 ppm brought flowering forward on 'Monthong' without reducing fruit size. At 2,500 ppm it shortened fruit stalks and made fruit smaller (Jutamanee et al. 2014). Ethephon, daminozide and NAA have no flowering effect, gibberellins push leaf growth, and root pruning harms or kills trees (as reported in the book). Uniconazole is in the same chemical class as PBZ, is not approved in the EU or GB, and its persistence in soil is uncertain (database values range from days to more than a year), so it is no easy way around PBZ residue (PPDB).",
        "level": "evidence",
        "sources": [
          "tran2023book",
          "ppdb"
        ]
      }
    ]
  },
  {
    "id": "water",
    "title": "Induce: dry the root zone",
    "when": "Day 0 → buds (Thai 3–7 days, Mekong 20–35 days)",
    "summary": "The tree needs a real but controlled drought. In Mekong Delta orchards that means plastic mulch and dry ditches for weeks, not days, but never severe stress.",
    "points": [
      {
        "text": "Expect buds 25–30 days after induction on average. They can appear in 20–25 days in good conditions, or take 35–40 days. Timing depends on cultivar, weather and technique. Under the book's Mekong Delta protocol, PBZ is sprayed, the beds are mulched and the ditches pumped completely dry (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "End the stress the moment buds are clearly visible: roll up the mulch, then fertilise and irrigate straight away. Leave the mulch too long and the buds abort from dehydration. Remove it too early, just as buds break, and a sudden rain can turn them back into leaf buds (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Drought needs differ by cultivar in the Mekong Delta. 'Kho Qua Xanh' flowers after 20–25 days counted from when the ditches are completely dry (about 26 days from first withholding water). 'Ri6' and 'Monthong' need 30–35 days and still flower unevenly, in 2–3 waves. 'Sua Hat Lep' flowers reliably only in the dry season; with incomplete drought its buds take about 3 months and few appear. This is much longer than the 7–14 days (Salakpetch 2000) or 10–14 days (Chandraparnik et al. 1992b) found in Thailand. The book concludes that Mekong Delta durians need a longer drought, and that how well mulching works depends on cultivar, weather and ditch-water management (book pp. 142, 152).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "How much drought is enough (Thai benchmark): a continuous dry spell of about 7–14 days (the book's summary says 10–14), bringing leaf water potential to about −0.7 to −0.8 MPa (Salakpetch 2005). Compare the JIRCAS trial, where plastic mulch reached −0.9 MPa and flowering was suppressed. The useful range is narrow.",
        "level": "evidence",
        "sources": [
          "tran2023book",
          "kozai2024"
        ]
      },
      {
        "text": "After PBZ, 3–7 dry days were enough to trigger flowering. Untreated trees needed 10–14.",
        "level": "evidence",
        "sources": [
          "chandraparnik1993",
          "chandraparnik1992"
        ]
      },
      {
        "text": "Severe drought blocks flowering. Plastic mulch dropped leaf water potential to −0.9 MPa, delayed flowering, and cut flower clusters from about 9 to under 1 per metre of branch, whether or not PBZ was used.",
        "level": "evidence",
        "sources": [
          "kozai2024"
        ]
      },
      {
        "text": "Other drought benchmarks: in Chanthaburi, trees flowered about 50 days after the rain stopped, at a soil moisture of −100 kPa at 15 cm depth. Temperatures below 20 °C were not needed. 'Musang King' growers in Raub, Malaysia, say at least 14 dry days are needed (as reported in the book).",
        "level": "evidence",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Measure soil moisture, don't guess. On the Can Tho University farm soil (0–30 cm: field capacity 57.3%, wilting point 18.9%), trees flowered at 30% soil moisture in the first flush and well at 28.6% in the second. That is roughly a quarter of the available water left. The book's rule of thumb is 30–40% moisture held for 3–4 weeks, adjusted for soil texture (Hau et al. 2001, book Table 5.1).",
        "level": "evidence",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "In Mekong Delta raised-bed orchards, growers drain the ditches for 30–40 days during induction. If heavy rain refills the ditches, trees can flower in 2–3 separate waves, which complicates harvest timing.",
        "level": "evidence",
        "sources": [
          "hau2017"
        ]
      },
      {
        "text": "In the Vietnamese trials, plastic mulch went down 1 week before spraying and was removed gradually when buds broke, 3–4 weeks after the spray. Normal fertiliser and irrigation resumed after that. Mulch alone, without PBZ, was 'not effective'.",
        "level": "evidence",
        "sources": [
          "tri2011"
        ]
      },
      {
        "text": "About a third of surveyed Vietnamese growers cover the root zone with plastic before spraying. Given the JIRCAS result, do not leave a cover on for weeks. The mulched trees in that study were covered for about 8 weeks.",
        "level": "survey",
        "sources": [
          "pham2022",
          "kozai2024"
        ]
      },
      {
        "text": "Mulch style: tent-style plastic over the raised bed lowers soil moisture more than plastic laid flat, because condensation runs off the bed instead of back into it. In Cai Lay, where trees grow on individual mounds, growers wrap each tree's root zone instead.",
        "level": "practice",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Don't clear the grass before mulching. Cai Lay growers find that laying plastic over the grass works better, probably because the grass keeps transpiring and pulls more water out of the soil, which speeds up the drought.",
        "level": "practice",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Plastic mulch is expensive and makes tree care awkward during induction, but Mekong Delta growers keep using it because it works.",
        "level": "expert",
        "sources": [
          "tran2023book",
          "hau2017"
        ]
      },
      {
        "text": "Trenching (root cutting) is contested. Advanced growers in Cai Lay and Cho Lach dig a ring trench about 30–40 cm wide and 30–40 cm deep, 2.5–3.0 m from the trunk, on top of PBZ and drought, and the book's protocol chapter calls it a powerful trigger. The same book notes that no durian study has tested it, and that cutting roots may open the way to root disease. Treat it as unproven (book Ch. 5, Ch. 9).",
        "level": "practice",
        "sources": [
          "tran2023book"
        ]
      }
    ]
  },
  {
    "id": "bloom",
    "title": "From flower buds to bloom",
    "when": "Buds → bloom ≈ 50–57 days",
    "summary": "Once buds show, the drought has done its job. Switch the tree back to steady water, feed one leaf flush, and protect the buds from rain.",
    "points": [
      {
        "text": "Once flower buds are clearly visible, bring the tree back to steady, moderate watering so the buds develop. Ask local extension staff for exact amounts.",
        "level": "practice",
        "sources": []
      },
      {
        "text": "Re-watering after the dry spell (Salakpetch 2005): when leaves droop, give about 10 mm of water (10 L per m² of canopy). After 7 days, water every 3 days until flower buds appear.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Feed and water the developing flowers. After the mulch comes off, Cho Lach growers apply 0.5–1.0 kg NPK 1:1:1 per tree. The book also suggests 0.5–0.7 kg of NPK 1:1:1 blended 3:1 with urea. Irrigate every 2–3 days, because flower expansion needs water like a leaf flush does, and keep ditch water 60–80 cm below the beds from now on. Control flower borer, and anthracnose if it rains (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Break bud dormancy deliberately. Rice-grain-sized new buds go dormant, and more than 10 mm of rain stalls them. A foliar KNO₃ spray at 0.5–1.0% breaks dormancy and gives an even bloom, and the book recommends it even in the dry season. If more than 35 mm of rain hits newly emerging buds, they fall into a deep dormancy that even thiourea cannot break (Salakpetch 2005, as reported in the book).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Force ONE leaf flush 7–10 days after buds appear, then no more. From bud to open flower takes about 55 days in 'Ri6' and 'Bi Ro Hat Lep', and a leaf flush matures in about 45 days. Starting the flush when buds are 2–3 cm long means the new leaves are mature when the flowers open, and they then feed the fruit. Use foliar urea 1.0–1.5%, KNO₃ 0.5–1.0% or GA₃ 5–10 ppm, with a high-N NPK (2:1:1 or 3:1:1). Too late, and the flush steals from the flowers and fruitlets; with no flush at all, the fruit runs short of carbohydrate. Trees given too much PBZ may refuse to flush (book Ch. 7, Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "In the JIRCAS trial, the first buds appeared about 10 weeks after spraying and the first flowers about 7 weeks after that.",
        "level": "evidence",
        "sources": [
          "kozai2024"
        ]
      },
      {
        "text": "PBZ slowed flower and fruit development a little, so allow a few extra days on treated trees.",
        "level": "evidence",
        "sources": [
          "chandraparnik1993"
        ]
      },
      {
        "text": "Flower buds ('crab eyes') can go dormant if even light rain (about 10 mm a day) falls while they develop. Some buds then resume and others stall, giving several waves of fruit (Chandraparnik et al. 1992b; Janick & Paull 2008, as reported in the book). Buds take 6–8 weeks to develop, and some up to 32 weeks.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Concentrated flowering means less competition. Uneven flowering leaves the tree carrying flowers, small fruit and large fruit at once, all competing for nutrients. Strict orchard water management gives earlier, more concentrated flowering than leaving trees to the weather, which usually gives two or more waves.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Don't over-dry during flowering. On 'D24' in Malaysia, 50–75 L per tree per day gave the best flowering. At 25 L per day, all young fruit dropped within 5 weeks of fruit set, and 100 L per day was too wet (Masri 1999, as reported in the book).",
        "level": "evidence",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Thin flowers where flowering is heavy. Thai practice is to thin about 5 weeks after buds appear if there are more than 6 clusters per metre of branch, leaving 3–6 clusters per metre about 30 cm apart. Remove clusters under 2 cm wide and those at branch tips. On 'Monthong', thinning at full bloom to just 10% of flowers gave the most harvested fruit (Subhadrabandhu & Shoda 1997), and removing 66% of clusters 20 days after emergence raised yield and fruit quality (Udomsriyothin 1991). Do NOT thin sparse flowering: the spare carbohydrate triggers a leaf flush that strips the fruit (as reported in the book).",
        "level": "evidence",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Cut water in the week before bloom. About one week before the flowers open (7 weeks after buds appear), reduce irrigation to 20–25% of daily pan evaporation, keeping soil at about 55–60% of field capacity, until the flowers are fully open. Still irrigate if temperatures exceed 36 °C. In Thailand, flowers fully open by 15:00 are taken as a sign the water was managed well. Fertilisation is complete within 3 days of opening (Salakpetch 2005, as reported in the book).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      }
    ]
  },
  {
    "id": "hold",
    "title": "Hold the off-season crop",
    "when": "First 6 weeks after fruit set",
    "summary": "Off-season fruit often grows into the rainy season. Ending the induction drought correctly and keeping soil moisture steady stops the sudden 'matchstick' drop.",
    "points": [
      {
        "text": "Raise water again once fruit has set: bring irrigation back up to 60–70% of daily evaporation to drive young-fruit growth and prevent drought drop (Salakpetch 2005, as reported in the book).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Hand-pollinate where it matters. Hand pollination between 19:00 and 22:00 is part of the book's off-season protocol, and essential for self-incompatible cultivars such as 'Musang King'. Use a soft nylon duster on a telescopic pole (up to about 6 m) to carry pollen from another cultivar. Growers observe that 'Monthong' pollen gives 'Musang King' a longer fruit than 'Ri6' pollen does (book Ch. 6, Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Two sprays to hold fruit: NAA at 20–40 ppm with a high-P foliar feed (NPK 15:30:15) 7 days after fruit set, then GA₃ at 5–10 ppm 3–6 weeks after set, which thickens fruit stalks and reduces drop. NAA, GA₃ and mepiquat chloride must be registered for fruit use where you farm, and some export markets restrict them (book Ch. 6, Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Feeding the young fruit (book protocol): at petal fall, spray a high-P foliar feed (NPK 15:30:15 at 0.5%) twice, 10–15 days apart. From 20–25 days after fruit set, spray MKP at 1.0–1.5% every 10–15 days to keep new flushes down. Also give the first soil feed: NPK 1:1:1 blended 3:1 with urea, 0.5–1.0 kg per tree, adjusted for tree age and crop load (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "When fruit drop happens: unpollinated flowers fall 7–10 days after opening. Young-fruit drop peaks about 3 weeks after fruit set and settles by about 6 weeks. In 'Sua Hat Lep' fewer than 10% of fruit remained after the 3-week drop (Hau & Lam 2008, as reported in the book).",
        "level": "evidence",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "'Matchstick' drop from bad weather: drought, cold snaps, extreme heat or unseasonal heavy rain can strip flowers and matchstick-sized fruit within 1–2 days. Water stress cuts calcium flow to the young fruit; waterlogging suffocates roots and triggers ethylene. Both activate the abscission layer.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "So do NOT cut irrigation after fruit set. Keep soil moisture steady with good drainage and regular watering. Spray calcium (CaCl₂ or Ca-chelate) at 7–21 days after fruit set to strengthen cell walls, and keep potassium and silicon balanced. This is the opposite of the induction drought, which must end once flower buds are visible.",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Which calcium, where. Right after fruit set, the protocol table supplies soil calcium as gypsum or organic calcium, and warns against putting calcium nitrate or calcium chloride on the soil at this stage, because they can upset soil pH and trigger fruit drop. Foliar Ca–B sprays continue, and the calcium nitrate spray (0.2%) comes later, at 30–35 days after set (book Table 9.2).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Stop any new leaf flush during early fruit growth; this is the book's most important fruit-stage measure. Flushes 3–8 weeks after fruit set increase drop and cause misshapen fruit with hard, uneven flesh (Salakpetch et al. 1992). Spray KNO₃ at 1.0–1.5% once or twice, or MKP at 0.5–1.0%. If shoots are already well advanced, the Thai extension mix is 30 mL humic acid + 60 g NPK 15:30:15 or 10:20:30 + 50 mL mepiquat chloride (25%) in 20 L of water (book Ch. 6, Ch. 9).",
        "level": "evidence",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Off-season fruit often grows through wetter months. Keep drainage and Phytophthora controls in place until harvest.",
        "level": "evidence",
        "sources": [
          "aciar2022"
        ]
      }
    ]
  },
  {
    "id": "harvest",
    "title": "Bring off-season fruit to a good harvest",
    "when": "≈ 90–150 days after bloom, by cultivar",
    "summary": "Off-season fruit is prone to flesh disorders, and the harvest often meets rain. Time the pick by cultivar, cut nitrogen as the fruit grows, and dry the roots before harvest.",
    "points": [
      {
        "text": "Fruit timing by cultivar, counted in days after fruit set: 'Kho Qua Xanh', 'Ri6' and 'Musang King' about 90–100; 'Sua Hat Lep' about 100–110; 'Monthong' about 115–120. In the cooler Central Highlands, add 20–30 days; at 700–800 m altitude, harvest can stretch to 135–150 days. Growth is slow for the first 30 days, fast from week 6 to week 12 as the flesh fills, then about 30 days of maturation (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "'Monthong' fruit matures 120–127 days after anthesis. Tag each flower cluster with its opening date.",
        "level": "evidence",
        "sources": [
          "sangwanangkul1998"
        ]
      },
      {
        "text": "'Ri6' is much faster: fruit matures about 97 days after fruit set. Flowering on one tree lasts about 25 days, so tag clusters as they open. Choose the cultivar in the Planner.",
        "level": "evidence",
        "sources": [
          "tran2019"
        ]
      },
      {
        "text": "In the cooler Central Highlands, 'Monthong' can take 135–150 days from flowering to harvest, much longer than in the lowlands. The Planner has a preset for this.",
        "level": "evidence",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Thin the fruit; it decides both this crop and next year's. An overloaded tree runs out of carbohydrate, leading to branch dieback, a skipped crop the following year (biennial bearing) or even tree death. When fruit set is high, thinning is mandatory. Mekong Delta growers thin in 2–3 passes 4–6 weeks after fruit set, when fruitlets are cup to bowl size. Thai schedules thin at weeks 4–5 (keeping 2–3 times the target), week 6 and weeks 7–10; an alternative thins at days 30, 45 and 60, keeping 1.2–1.5 times the target at day 30 (Salakpetch 2005; Ketsa et al. 2020; as reported in the book).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Keep fruit in the right place. Fruit at branch tips and the top of the tree grow fast but get little calcium (it travels to the leaves), so they are prone to soggy flesh. Fruit on the trunk get calcium but too little carbohydrate, and stay small. Keep fruit on the middle section of the main branches, 1–2 per cluster, and none on small, weak side branches, which tend to die back after harvest (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "How many fruit a tree can carry: a 2 kg 'Chanee' fruit needs the output of 150–200 mature leaves (Palakul 1987), or about 330 leaves on a conservative estimate (Salakpetch 2005). As a branch rule, a 2.5 cm branch carries 1 fruit, a 3.8 cm branch 2, and branches over 5 cm 3–4 (Philippine 'Puyat' guidelines). Typical final loads are 50–150 fruit per tree. 7-year-old 'Ri6' carried 32–52 fruit (2.2–3.6 kg each) with the same total yield of about 113 kg per tree (Hieu et al. 2026). Mature elite trees aged 16–20 years carried up to 80–120 ('Ri6') and 140–150 ('Kho Qua Xanh'). Thai guidance for 'Monthong' is about 30 fruit at 6–7 years, 50 at 8–10 and 70 at 15–20 years (as reported in the book).",
        "level": "evidence",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Yield targets from the book's protocol: 7–8-year 'Ri6' carrying 30–50 fruit gives 100–110 kg per tree; 'Musang King' with 50–60 fruit gives 80–100 kg; 8–10-year 'Monthong' with 40–50 fruit gives 120–150 kg. Thin in three passes: 20–25 days after set (an 8–10-year tree may hold 80–100 for now), at 40–45 days when fruit are 9–10 cm (final spacing), and a final load check at 60–70 days ('Ri6', 'Musang King') or 80–85 days ('Monthong') (book Table 9.2).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Don't over-thin. Fruit, like flowers, hold back new shoots. If fruit set is poor, or you thin too hard, the spare carbohydrate triggers a leaf flush that then starves and drops the remaining fruit (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Second and third feeds (book protocol): at 55–60 days after set, apply 0.5–1.0 kg high-K NPK 2:1:3 per tree with a 0.2% calcium nitrate spray against soggy flesh. For cultivars hanging over 100 days, repeat at 75–80 days and add a 0.2% MgSO₄ spray. One month before harvest, spray KNO₃ at 1.0%. The Can Tho 'Musang King' trial schedule below is similar but tested specifically on that cultivar (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Know the fruit clock. 'Musang King' is harvested about 90 days after fruit set (DAFS). Growth is fastest at 28–70 DAFS, and disorders show up from about 70 DAFS. Expect about 35% fruit drop in the first 14 days, rising to about 48.5% by 42 DAFS.",
        "level": "evidence",
        "sources": [
          "duong2025"
        ]
      },
      {
        "text": "Flesh disorders are a big off-season risk. In surveyed 'Musang King' orchards, 19% had disorders only in the off-season and 78% in both seasons. Management, not just weather, is the main driver.",
        "level": "survey",
        "sources": [
          "duong2025"
        ]
      },
      {
        "text": "Cut the nitrogen as the fruit grows. In off-season trials, soil NPK 2:1:1 at 30 DAFS, then 2:1:3 at 45, then 1:1:3 at 60 (0.75 kg per tree each time) gave 10% disordered fruit, while steady high nitrogen (3:1:1) gave 45%. These figures are from conference slides and are not yet in a full paper.",
        "level": "evidence",
        "sources": [
          "hau2026talk"
        ]
      },
      {
        "text": "Don't over-fertilise. In off-season trials, raising NPK from 0.5 to 1.25 kg per tree per application lifted disordered fruit from 12% to 36% for little extra yield. The published main-season trial agrees (8% → 24%), with 0.75 kg as the sweet spot.",
        "level": "evidence",
        "sources": [
          "hau2026talk",
          "duong2025huaf",
          "duong2026crop"
        ]
      },
      {
        "text": "Spray calcium, then magnesium: Ca(NO₃)₂ at 0.4% at 40 DAFS and MgSO₄ at 0.2% at 50 DAFS, 10 L per tree, early morning on a dry, sunny day. In the published main-season trial this gave 0% affected fruit, against 30% for unsprayed trees, and Ca raised yield 4–9%. Off-season slides show Ca raising yield from 85 to 93 kg per tree.",
        "level": "evidence",
        "sources": [
          "duong2026swj",
          "hau2026talk"
        ]
      },
      {
        "text": "The combined protocol gave 0% disordered off-season fruit, against 19.7% for the growers' high-N programme. It used 25% less fertiliser for a statistically similar yield.",
        "level": "evidence",
        "sources": [
          "hau2026talk"
        ]
      },
      {
        "text": "Water during fruit growth, and the rain-at-harvest problem. Keep ditch water 60–80 cm below the beds and irrigate every 2–3 days, changing amounts gradually, because sudden changes cause fruit drop. Waterlogging triggers new flushes, soggy flesh and Phytophthora; too little water in the dry season scorches leaves and stunts fruit. 15–20 days before harvest, cut irrigation back, since mild stress helps the fruit mature. The protocol table pumps the ditches completely dry 10–15 days before harvest. Off-season harvests often meet heavy rain, which causes mushy and soggy flesh. In that case, mulch the root zone and drain the ditches about a month before harvest. Mulching cut flesh disorders to 8.0% and watercore to 4.3% (Loquias & Pascua 1999). For 'Ri6', add Ca + B sprays during flesh growth (book Ch. 7, Ch. 9).",
        "level": "evidence",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Season matters for the evidence too. The two published Ca/NPK trials ran in the Mekong Delta main season (Dec–May, induced in the dry season). The off-season results so far come from conference slides. The authors themselves call for more seasons and sites.",
        "level": "evidence",
        "sources": [
          "duong2025huaf",
          "duong2026swj",
          "hau2026talk"
        ]
      },
      {
        "text": "Pick at the right maturity. For the domestic market, tree-ripened fruit tastes best. For export, cut at about 85% maturity: tapping the rind gives a hollow, dull sound as the flesh starts to separate. Fruit cut below 75% maturity cannot be rescued by ripening treatment (Cheyglinted 1993, as reported in the book). Other maturity signs: the rind turns from light brown to yellow-green, the stalk joint swells, the gaps between spines widen, and the spines become softer (Pascua & Cantila 1992). Don't harvest during heavy rain: pump the ditches dry and wait 3 days after the rain stops before cutting. Don't seal ripening fruit in, or the rind turns dark yellow (book Table 9.2).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "Ripening 'Monthong' and 'Ri6' without disorders: Hau et al. (2009) combined Ca(NO₃)₂ 0.2% at 2 months after set, MgSO₄ 0.2% at 2.5 months and KNO₃ 1.0% one month before harvest with a 0.1–0.2% ethephon treatment after harvest. This virtually eliminated hard, colourless flesh. At 0.4% ethephon, ripening peaked too early (day 4 against day 6); overdosing yellows the rind and makes the flesh mushy. Thai packhouses paint ethephon only on the freshly re-cut stalk and fan the stacked fruit, avoiding rind yellowing. 'Ri6' treated with 200–500 ppm ethylene ripened in 2 days instead of 5. Local cultivars ('Kho Qua Xanh', 'Chuong Bo Hat Lep', 'Sau Huu') ripen evenly without ethylene (book Ch. 7, Ch. 9).",
        "level": "evidence",
        "sources": [
          "tran2023book"
        ]
      }
    ]
  },
  {
    "id": "reset",
    "title": "Reset for next year: keep PBZ from building up",
    "when": "After harvest → back to step 2",
    "summary": "PBZ stays in the soil, and a tree pushed every year can fade. Growers elsewhere keep harvests coming year after year by resting trees, dosing by canopy size, and helping soil microbes break PBZ down.",
    "points": [
      {
        "text": "Why this matters: in a 13-year mango trial, PBZ raised yields for the first five years, then yields fell and trees gradually died; the best long-term yields came from nitrogen without PBZ. In durian, trees given PBZ as a soil drench may decline or recover slowly, and heavily dosed trees struggle to push the pre-bloom leaf flush.",
        "level": "evidence",
        "sources": [
          "grewal2023",
          "subhadrabandhu1998",
          "tran2023book"
        ]
      },
      {
        "text": "Overloading is the other way to lose next year's crop. The book links excessive fruit load to branch dieback, biennial bearing and tree collapse. Thinning to the tree's leaf and branch capacity in step 7 protects next season's flowering as much as limiting PBZ does (book Ch. 9).",
        "level": "expert",
        "sources": [
          "tran2023book"
        ]
      },
      {
        "text": "PBZ lingers. Its soil half-life ranges from about 2 months in mango orchard fields to more than a year in regulatory tests, and surveyed durian orchards held residue in the topsoil at the canopy edge after 5 or more years of use. Regulatory data put PBZ's soil half-life at about 30 days in EU field trials and about 120 days in the lab, so roughly 97% disappears within about 5 months to 1.6 years depending on the soil. In mango, repeating the full dose the next year added to the soil residue, and an Indian review advises basing each year's dose on the residue already in the orchard soil.",
        "level": "evidence",
        "sources": [
          "singh2024",
          "kishore2015",
          "pham2022",
          "ppdb"
        ]
      },
      {
        "text": "Build rest years into the plan. SOFRI advises pausing PBZ for 1–2 seasons after every 3–4 seasons in durian. In 'Alphonso' mango, three years of PBZ followed by three years off kept yields doubled across all six years, because the soil-applied dose kept working for three years after it stopped. With foliar-only durian sprays the carry-over is likely smaller, so expect a lighter rest-year crop.",
        "level": "evidence",
        "sources": [
          "tri2011",
          "reddy2008"
        ]
      },
      {
        "text": "Dose for the tree in front of you, not by habit. Gibberellin falls in proportion to the PBZ dose, so larger doses suppress growth longer. Philippine mango work advises starting at no more than 1 g PBZ per metre of canopy diameter. For durian, stay within 1,000–1,500 ppm as a foliar spray and record the grams of a.i. each tree receives every year.",
        "level": "evidence",
        "sources": [
          "protacio2002",
          "pham2022"
        ]
      },
      {
        "text": "Keep PBZ off the soil where you can. Foliar spraying puts far less into the soil than a soil drench; drenched mango soil started with 10–62 µg/g. Spray in dry weather so it stays on the leaves. If you spray before laying plastic, you accept some PBZ reaching the drip-line soil.",
        "level": "evidence",
        "sources": [
          "singh2024",
          "subhadrabandhu1998",
          "tran2023book"
        ]
      },
      {
        "text": "Soil microbes are the natural clean-up crew. Orchard soils with a PBZ history broke it down much faster (about 1% left after 63 days) than unexposed soil (64% left after 14 days), thanks to adapted bacteria such as Pseudomonas. Bacteria isolated from Mekong Delta orchards (Burkholderia, Pseudomonas, Acinetobacter) degraded 15–37% of PBZ in 15–30 days in the lab. An Indian Klebsiella strain degraded 98% in 15 days, with a 4.5-day soil half-life.",
        "level": "evidence",
        "sources": [
          "vaz2015",
          "thao2014",
          "pham2023",
          "kumar2021"
        ]
      },
      {
        "text": "First field evidence that a microbial product works. In China, one spray of a Micrococcus bacterial agent cut PBZ residue in sandy soil by about 75% within 5 months compared with untreated soil, and halved it where PBZ had just been applied, while soil enzyme activity and yield rose. It was a herb crop, not a fruit tree, with one site, one season and a patented strain, so treat it as promising rather than proven for durian.",
        "level": "evidence",
        "sources": [
          "jiang2025"
        ]
      },
      {
        "text": "Feed the microbes, not just the tree. In mango-orchard soils, adding a mineral nutrient solution raised PBZ breakdown from 8–14% to about 95% in 40 days, far more than adding Pseudomonas bacteria alone (29–38%). Dry soil held the added bacteria back. In practice, a well-fed, moist (not waterlogged) root zone after harvest, with organic matter, is what lets native PBZ-degrading microbes work. This is a lab result.",
        "level": "evidence",
        "sources": [
          "santos2014",
          "vaz2015"
        ]
      },
      {
        "text": "Feed the soil biology after harvest. A diverse soil microbiota speeds PBZ breakdown, and organic mulch and manure also reduced Phytophthora in durian. Adding organic matter after harvest serves both. Microbial 'PBZ detox' products are sold in the Mekong Delta, including one with a Vietnamese utility patent (No. 3266, 2023) reported for mango, plum and durian soils. None has a published durian field trial. If you try one, leave a few untreated trees as a comparison and compare flowering and soil residue the next season.",
        "level": "expert",
        "sources": [
          "vaz2015",
          "aciar2022",
          "bavutex2023"
        ]
      },
      {
        "text": "There is no proven antidote. Activated carbon strips PBZ from irrigation water (90–99% removal), but nobody has tested it, or biochar, on orchard soil. Gibberellin sprays push leaf growth, but no durian trial shows they safely reverse a PBZ overdose. Prevention, through correct dose, foliar application and rest years, is the only tested approach.",
        "level": "evidence",
        "sources": [
          "grant2018",
          "tran2023book"
        ]
      },
      {
        "text": "Flushing with water does not neutralise PBZ. It dissolves poorly (about 23 mg/L) and binds moderately to soil, so irrigation moves only a little. Water does not break it down: PBZ is stable in water, with a half-life of 164 days in water and 787 days with sediment. What is washed out ends up in ditches and canals, where PBZ is very toxic to aquatic life. Watering right after a soil application actually increases root uptake; the book irrigates 2–3 days for that purpose. What water does help is the soil microbes that degrade PBZ, which need a moist but well-aired root zone (about 70–75% of field capacity after harvest), not flooding.",
        "level": "evidence",
        "sources": [
          "ppdb",
          "santos2014",
          "tran2023book",
          "kishore2015"
        ]
      }
    ]
  }
];

// Every durian PBZ field trial cited in the app, for the "PBZ evidence" comparison table.
// effect: "positive" | "mixed" | "none"
export const PBZ_TRIALS = [
  {
    "source": "subhadrabandhu1998",
    "place": "Rayong, TH",
    "cultivar": "Chanee",
    "age": "5–20 yr",
    "method": "Foliar",
    "rate": "500–1,000 ppm",
    "timing": "Jul–Sep",
    "result": "No earlier flowering, no yield gain; more flowering branches; smaller fruit",
    "effect": "none"
  },
  {
    "source": "chandraparnik1993",
    "place": "Chanthaburi, TH",
    "cultivar": "Chanee",
    "age": "12 yr",
    "method": "Foliar",
    "rate": "750–1,500 ppm",
    "timing": "Flush fully expanded",
    "result": "Flowered 14–45 days earlier; 29–64% more flowers; fruit set unchanged",
    "effect": "positive"
  },
  {
    "source": "tri2011",
    "place": "Ben Tre, VN",
    "cultivar": "Dona",
    "age": "9 yr",
    "method": "Foliar + mulch",
    "rate": "1,000–1,600 ppm (20–32 g a.i.)",
    "timing": "Late Aug, 2nd flush",
    "result": "Buds 20–22 days earlier; harvest 19–24 days earlier; yield 135 → 176–215 kg/tree",
    "effect": "positive"
  },
  {
    "source": "tri2011",
    "place": "Ba Ria, VN",
    "cultivar": "Sua Hat Lep",
    "age": "12 yr",
    "method": "Foliar + mulch",
    "rate": "1,000–1,500 ppm",
    "timing": "Late Aug, 2nd flush",
    "result": "Buds 15–17 days earlier; harvest 19–21 days earlier; yield 156 → 195–227 kg/tree",
    "effect": "positive"
  },
  {
    "source": "pham2022",
    "place": "Can Tho, VN",
    "cultivar": "Sua Hat Lep",
    "age": "—",
    "method": "Spray",
    "rate": "1,000–1,500 ppm",
    "timing": "—",
    "result": "Flowered 7–15 days earlier; yield +22.5% (Tran et al. 2001, reported secondhand in Pham 2022)",
    "effect": "positive"
  },
  {
    "source": "tran2023book",
    "place": "Tien Giang, VN",
    "cultivar": "Kho Qua Xanh",
    "age": "—",
    "method": "Foliar + root-zone mulch + ditch drainage",
    "rate": "1,000–1,500 ppm",
    "timing": "Off-season (spray ≈ end Aug)",
    "result": "Buds 19 vs 26 days; flowering 3–4 days earlier; flower clusters 72 → 152–163/tree; yield 120 → 186–191 kg/tree; fruit 2.2 vs 2.5 kg (Hau 2000; Hau et al. 2001; Tables 5.2, 5.4, 5.6)",
    "effect": "positive"
  },
  {
    "source": "tran2023book",
    "place": "Can Tho, VN",
    "cultivar": "Sua Hat Lep",
    "age": "—",
    "method": "Foliar + ditch drainage",
    "rate": "1,000–1,500 ppm",
    "timing": "2 years",
    "result": "Yr 1 off-season: buds 58 vs 80 days, yield 24.6 → 41.5–55.5 kg/tree. Yr 2 off-season: clusters up, but yield not significant (12.2 vs 8.7–17.3 kg) (Hau et al. 2001; Tables 5.3, 5.5, 5.7)",
    "effect": "mixed"
  },
  {
    "source": "kozai2024",
    "place": "Chanthaburi, TH",
    "cultivar": "Monthong",
    "age": "9 yr",
    "method": "Foliar ± mulch",
    "rate": "1,000–1,500 ppm (20–30 g a.i.)",
    "timing": "15 Aug, 2nd flush",
    "result": "Effect not significant (heavy rain after spray); mulch drought suppressed flowering",
    "effect": "none"
  },
  {
    "source": "jantee",
    "place": "Chanthaburi, TH",
    "cultivar": "Not stated in abstract",
    "age": "Bearing",
    "method": "Foliar",
    "rate": "1,000 ppm",
    "timing": "Early & late programmes",
    "result": "Flowered 9–36 days early; 108.6 vs 93.4 kg/tree; late method delayed 28–43 days",
    "effect": "positive"
  },
  {
    "source": "sakhidin2012",
    "place": "Indonesia",
    "cultivar": "Monthong",
    "age": "10 yr",
    "method": "PBZ (soil, g a.i./tree) × ethephon spray",
    "rate": "PBZ 2–4 g a.i.; ethephon 400–800 ppm",
    "timing": "Not in abstract",
    "result": "4 g PBZ + 800 ppm ethephon: most flowers, lowest GA and ABA, highest kinetin (the only durian hormone measurements found)",
    "effect": "positive"
  },
  {
    "source": "sakhidin2019",
    "place": "Central Java, ID",
    "cultivar": "Kani, Monthong",
    "age": "10 yr",
    "method": "Method & rate",
    "rate": "not in abstract",
    "timing": "Jun / Jul / Aug",
    "result": "August application flowered fastest; Kani faster than Monthong",
    "effect": "mixed"
  },
  {
    "source": "wiangsamut2022",
    "place": "Chanthaburi, TH",
    "cultivar": "Monthong",
    "age": "Juvenile",
    "method": "Foliar",
    "rate": "750 ppm",
    "timing": "5 Nov vs 5 Dec",
    "result": "93.6–97% flowered; Dec spray gave June harvest and higher returns",
    "effect": "positive"
  }
];

export const GAPS = [
  "The trials do not all agree (see the tally on the PBZ evidence tab). Two found little or no effect (Rayong 1988–89, Chanthaburi 2007), and a Can Tho trial worked in its first year but not in its second off-season. The weak results point to weather, cultivar and application factors.",
  "No published trial compares soil drench with foliar spray on durian at matched doses. Foliar spraying is the only method with durian evidence.",
  "No durian-specific PBZ residue limit was found in China's GB 2763-2021, Codex or the EU review. China's GB 2763-2026 (in force since March 2026) has not been checked. Exporters should confirm the current limit with the importing country before each season.",
  "Potassium chlorate (KClO₃) is well documented for longan, but no peer-reviewed durian trial was found. Treat it as untested on durian. It also persists in soil (lab half-life about 47–315 days), and the EU withdrew chlorate plant-protection uses in 2008 and regulates chlorate residues in food.",
  "Results vary a lot with weather, even in controlled trials. JIRCAS concluded that more research is needed on the conditions that make PBZ reliable.",
  "Published induction trials cover Thai 'Chanee' and 'Monthong' and Vietnamese 'Dona', 'Sua Hat Lep' and 'Kho Qua Xanh'. Off-season protocols for 'Ri6' and 'Monthong' in the Mekong Delta come from the book's expert guidance, and off-season 'Musang King' fruit data only from conference slides; none yet has a published induction trial.",
  "Only one field trial has tested a PBZ-degrading microbial product, on a Chinese herb crop. None has been run in a durian or other fruit orchard, and no field trial has tested activated carbon or biochar against PBZ. Nobody has yet shown that 'detoxing' the soil improves next year's flowering."
];

export const CHECKLIST = [
  {
    "id": "window",
    "text": "Target harvest date chosen and spray window worked out",
    "stage": "decide"
  },
  {
    "id": "weather",
    "text": "Forecast checked: dry Northeast-monsoon conditions, humidity about 50–60%, nights about 20–22 °C (not >26 °C)",
    "stage": "decide"
  },
  {
    "id": "drain",
    "text": "Drainage checked; no standing water around trunks",
    "stage": "prepare"
  },
  {
    "id": "limeph",
    "text": "Right after harvest: soil pH checked; 3–5 kg lime (or dolomite) per tree, not gypsum",
    "stage": "prepare"
  },
  {
    "id": "canker",
    "text": "Trunks inspected; Phytophthora cankers treated",
    "stage": "prepare"
  },
  {
    "id": "prune",
    "text": "Post-harvest pruning done",
    "stage": "prepare"
  },
  {
    "id": "flush2",
    "text": "Second post-harvest flush fully expanded (leaves hardened, dark green)",
    "stage": "prepare"
  },
  {
    "id": "prime",
    "text": "Last flush hardened with MKP; high-P NPK then phosphorous acid applied before PBZ",
    "stage": "spray"
  },
  {
    "id": "product",
    "text": "Registered PBZ product bought; a.i.% read from the label",
    "stage": "spray"
  },
  {
    "id": "dose",
    "text": "Dose weighed for 1,000–1,500 ppm (750 for young trees)",
    "stage": "spray"
  },
  {
    "id": "forecast",
    "text": "Forecast shows no heavy rain for at least 7 days",
    "stage": "spray"
  },
  {
    "id": "spraybefore",
    "text": "PBZ sprayed BEFORE laying plastic, with enough litres per tree for the full dose",
    "stage": "spray"
  },
  {
    "id": "soilmeter",
    "text": "Soil moisture at 0–30 cm being measured during the drought",
    "stage": "water"
  },
  {
    "id": "drywatch",
    "text": "Drought length set for cultivar and region (Thai trials 3–7 days after PBZ; Mekong Delta: Kho Qua Xanh 20–25, Ri6 / Monthong 30–35), stopping short of severe stress",
    "stage": "water"
  },
  {
    "id": "mulchoff",
    "text": "Buds visible: mulch rolled up and tree fertilised and irrigated the same day",
    "stage": "bloom"
  },
  {
    "id": "rewater",
    "text": "Re-watering plan ready: about 10 mm when leaves droop, then every 3 days after day 7 until buds show",
    "stage": "bloom"
  },
  {
    "id": "prebloom",
    "text": "One week before bloom: irrigation cut to 20–25% of pan evaporation (still water if >36 °C); flowers thinned to 3–6 clusters/m unless flowering is sparse",
    "stage": "bloom"
  },
  {
    "id": "tag",
    "text": "Flower clusters tagged with their opening date",
    "stage": "bloom"
  },
  {
    "id": "kno3buds",
    "text": "KNO₃ 0.5–1% ready to break bud dormancy; leaf flush forced 7–10 days after buds appear",
    "stage": "bloom"
  },
  {
    "id": "noWaterCut",
    "text": "Irrigation steady after fruit set (no water cut-off); Ca spray 7–21 days after set; leaf flushes watched for 3–8 weeks",
    "stage": "hold"
  },
  {
    "id": "thin",
    "text": "Fruit thinned in 2–3 passes 4–6 weeks after set: middle of main branches, 1–2 per cluster, load matched to tree age and branch size",
    "stage": "harvest"
  },
  {
    "id": "fruitcare",
    "text": "Fruit-set date recorded; NPK 30/45/60 DAFS and Ca 40 / Mg 50 DAFS sprays scheduled",
    "stage": "harvest"
  },
  {
    "id": "ditch",
    "text": "Ditch water held 60–80 cm below the bed after fruit set; ditches drained and beds mulched before an off-season harvest",
    "stage": "harvest"
  },
  {
    "id": "preharvest",
    "text": "One month before harvest: KNO₃ 1% spray; 15–20 days before, irrigation cut back (mulch the roots if heavy rain)",
    "stage": "harvest"
  },
  {
    "id": "maturity",
    "text": "Harvest maturity checked (about 85% for export, tap test); ethephon at 0.1–0.2% only if needed",
    "stage": "harvest"
  },
  {
    "id": "pbzlog",
    "text": "PBZ log kept per tree (year, ppm, litres, grams a.i.); rest season planned after every 3–4 seasons of use",
    "stage": "reset"
  },
  {
    "id": "organic",
    "text": "After harvest: organic matter or manure returned to the root zone to support soil microbes",
    "stage": "reset"
  }
];

export const PBZ_SAFETY = [
  {
    "text": "Persistence: the soil half-life is over a year in regulatory tests, and 58–77 days in mango orchard fields. Residue builds up with yearly use.",
    "sources": [
      "kishore2015",
      "singh2024",
      "tri2011"
    ]
  },
  {
    "text": "Measured in durian orchards: up to about 1.04 mg/kg in the topsoil at the canopy edge after 5 or more years. Most growers were overdosing.",
    "sources": [
      "pham2022"
    ]
  },
  {
    "text": "Rotation: pause for 1–2 seasons after every 3–4 seasons of PBZ use.",
    "sources": [
      "tri2011"
    ]
  },
  {
    "text": "Food safety: ADI 0.022 mg/kg bw/day and ARfD 0.10 mg/kg bw. No market checked sets a PBZ limit for durian. China's GB 2763-2021 lists PBZ for mango (0.05 mg/kg) and litchi (0.5 mg/kg) but not durian, and would test the pulp only. The 2026 revision has not been checked. Codex has no PBZ limit at all, and in the EU the 0.01 mg/kg default may apply. No residue was found in mango fruit at optimised rates.",
    "sources": [
      "efsa2017",
      "gb2763",
      "singh2024"
    ]
  },
  {
    "text": "Environment and handling: highly toxic to aquatic life and moderately hazardous to people. Wear protective equipment and keep it out of irrigation ditches.",
    "sources": [
      "kishore2015"
    ]
  },
  {
    "text": "Method: use a foliar spray only. Soil drenches risk tree decline in durian and leave far more soil residue.",
    "sources": [
      "subhadrabandhu1998",
      "singh2024"
    ]
  }
];

// Book Table 9.2 (pp. 286–300) as dated tasks for the Planner. anchor: spray | buds | anthesis | set | harvest | null
// (null = relative to the previous harvest, not dated). from/to are days relative to the anchor.
// early: only for cultivars harvested ≤ 100 days after set; late: only for cultivars hanging > 100 days.
export const PROTOCOL = [
  {
    "step": "prepare",
    "anchor": null,
    "from": null,
    "to": null,
    "title": "Straight after the previous harvest",
    "actions": "Lime 3–5 kg per tree (CaCO₃, or dolomite if Mg is low; not gypsum) to bring soil pH to 6.0–6.5. Prune and clean up diseased wood, fruit and leaves. Irrigate every 2–3 days, keeping soil at 70–75% of field capacity."
  },
  {
    "step": "prepare",
    "anchor": null,
    "from": null,
    "to": null,
    "title": "15–20 days after liming",
    "actions": "Apply 20–30 kg compost per tree (with Trichoderma), plus a humic-acid drench. When new feeder roots show, apply 1–2 kg NPK 3:2:1 or 4:3:2 per tree. Spray GA₃ 5–10 ppm and amino acids or seaweed to push the leaf flush."
  },
  {
    "step": "prepare",
    "anchor": null,
    "from": null,
    "to": null,
    "title": "For a second flush",
    "actions": "Withhold water 5–7 days and spray MKP 0.5–1.0% to harden the current flush, then fertilise and water again. Spray against leafhoppers, psyllids, whiteflies and thrips as new shoots open. Keep ditch water 60–80 cm below the beds."
  },
  {
    "step": "spray",
    "anchor": "spray",
    "from": -30,
    "to": -30,
    "title": "Soft-leaf stage of the last flush",
    "actions": "Spray MKP (0-52-34) at 0.5–1.0% to harden the leaves evenly."
  },
  {
    "step": "spray",
    "anchor": "spray",
    "from": -23,
    "to": -20,
    "title": "7–10 days later",
    "actions": "Soil NPK 1:3:2 or 1:3:3, 1.0–1.5 kg per tree. Use DAP or MAP, not single superphosphate (cadmium risk)."
  },
  {
    "step": "spray",
    "anchor": "spray",
    "from": -15,
    "to": -5,
    "title": "15–20 days later",
    "actions": "Spray phosphorous acid (H₃PO₃) at 0.5–1.0%, 1–2 times at 10–15-day intervals. Remove water shoots on the fruiting branches."
  },
  {
    "step": "water",
    "anchor": "spray",
    "from": -7,
    "to": -7,
    "title": "7 days before PBZ",
    "actions": "Spray MKP 0.5–1.0% on both leaf surfaces. Start the drought: pump the ditches completely dry and keep them dry until flower buds clearly show."
  },
  {
    "step": "spray",
    "anchor": "spray",
    "from": 0,
    "to": 0,
    "title": "PBZ day",
    "actions": "Spray PBZ at 1,000–1,500 ppm (lower in the natural season), early morning or late afternoon, on both leaf surfaces. Use a 20–30% stronger mix on the trunk and main branches. An 8–10-year tree needs at least 10–12 L, about 12–15 g a.i. Stop all irrigation and cover the beds fully with plastic. Do not induce very young trees or trees defoliated by Phytophthora."
  },
  {
    "step": "bloom",
    "anchor": "buds",
    "from": 0,
    "to": 0,
    "title": "Buds clearly visible (usually 20–30 days after PBZ)",
    "actions": "Remove the mulch. Refill the ditches to 60–80 cm and resume watering gradually, every 2–3 days, aiming for 50–60% soil moisture and no waterlogging. If rain over 10 mm hits, or buds develop unevenly, spray KNO₃ 1.0–1.5% directly on the buds, and repeat if needed. Spray micronutrients and Ca on the buds."
  },
  {
    "step": "bloom",
    "anchor": "buds",
    "from": 5,
    "to": 7,
    "title": "Buds rounded (confirmed flower, not leaf)",
    "actions": "Apply 0.5–0.7 kg NPK 2:1:1 per tree to push one leaf flush that matures with the flowers."
  },
  {
    "step": "bloom",
    "anchor": "buds",
    "from": 20,
    "to": 40,
    "title": "Flower thinning (only if flowering is over 40–50% and even)",
    "actions": "Remove flowers at branch tips and near the trunk, crowded clusters, and those with thin stalks. Keep evenly spaced, thick-stalked clusters on the main branches. Apply 0.3–0.4 kg NPK 1:1:1 or 1:1:2 per tree at 25–30 days after bud emergence. Spray preventively against anthracnose if it rains, and give a foliar boron spray before the flowers open."
  },
  {
    "step": "bloom",
    "anchor": "anthesis",
    "from": -7,
    "to": 0,
    "title": "Last week before flowers open",
    "actions": "Cut irrigation by about 20–25% (soil 50–55%), but never withhold water completely, which cuts fruit set. Stop all pesticide sprays before bloom."
  },
  {
    "step": "hold",
    "anchor": "anthesis",
    "from": 0,
    "to": 3,
    "title": "Flowers open",
    "actions": "Hand-pollinate clusters on the middle of the branches, 18:00–21:00 (Ch. 9 text: 19:00–22:00), with pollen from a different cultivar. This is essential for 'Musang King'. Use one brush for only 2–3 trees. 3–5 days after opening, spray Ca–B to raise fruit set."
  },
  {
    "step": "hold",
    "anchor": "set",
    "from": 0,
    "to": 15,
    "title": "Just after fruit set",
    "actions": "Foliar NPK 1:2:1 at 0.5% with seaweed and amino acids, twice, 10–15 days apart. Apply soil calcium as gypsum or organic Ca; avoid calcium nitrate or calcium chloride on the soil now. Spray GA₃ 5–10 ppm twice, 10–15 days apart."
  },
  {
    "step": "hold",
    "anchor": "set",
    "from": 15,
    "to": 20,
    "title": "15–20 days after set",
    "actions": "Spray micronutrients with a low dose of auxin; too much or too-frequent NAA misshapes fruit. Keep soil at 70–75%; don't cut water for fear of a flush, and don't over-water. Spray Ca–B, and control fruit borer."
  },
  {
    "step": "harvest",
    "anchor": "set",
    "from": 20,
    "to": 25,
    "title": "First fruit thinning",
    "actions": "Remove misshapen fruit, thin-stalked fruit, fruit at branch tips, and crowded clusters; an 8–10-year tree can hold 80–100 fruit for now. If set is low (20–30 fruit), spray MKP 1.0–1.5% every 10–15 days to block new flushes."
  },
  {
    "step": "harvest",
    "anchor": "set",
    "from": 25,
    "to": 30,
    "title": "First fruit feed",
    "actions": "Soil NPK 1:1:1 (2:1:1 if the load is heavy), 1.0–1.5 kg per tree. Never use KCl / muriate of potash."
  },
  {
    "step": "harvest",
    "anchor": "set",
    "from": 30,
    "to": 35,
    "title": "Calcium against soggy flesh",
    "actions": "Spray Ca(NO₃)₂ 0.2% or Ca–B, which also prevents aril burn in 'Ri6'. 10–14 days later, spray MgSO₄ 0.2%."
  },
  {
    "step": "harvest",
    "anchor": "set",
    "from": 40,
    "to": 45,
    "title": "Second fruit thinning (fruit 9–10 cm)",
    "actions": "Set final spacing; a 10–15-year tree should end with 70–100 fruit."
  },
  {
    "step": "harvest",
    "anchor": "set",
    "from": 55,
    "to": 60,
    "title": "Second fruit feed",
    "actions": "Soil NPK 2:1:3, 0.5–1.0 kg per tree, plus a KNO₃ spray at 0.5–1.0%. Spray Ca–B, then MgSO₄ 0.2% 15–20 days later. Spray fungicide against fruit rot (Lasiodiplodia in the dry season; Phytophthora, Phomopsis and anthracnose in the wet). Remove all dropped fruit from the orchard."
  },
  {
    "step": "harvest",
    "anchor": "set",
    "from": 60,
    "to": 70,
    "title": "Final load ('Ri6', 'Musang King')",
    "actions": "Keep 1 fruit on a 2.5 cm branch, 2 on a 3.8 cm branch, and 3–4 on branches over 5 cm. Targets at 7–8 years: 'Ri6' 30–50 fruit for 100–110 kg; 'Musang King' 50–60 fruit for 80–100 kg.",
    "early": true
  },
  {
    "step": "harvest",
    "anchor": "set",
    "from": 75,
    "to": 80,
    "title": "Third fruit feed (late cultivars)",
    "actions": "Repeat the 2:1:3 feed and the KNO₃ 0.5–1.0% spray.",
    "late": true
  },
  {
    "step": "harvest",
    "anchor": "set",
    "from": 80,
    "to": 85,
    "title": "Final load ('Monthong')",
    "actions": "At 8–10 years, keep 40–50 fruit for 120–150 kg per tree.",
    "late": true
  },
  {
    "step": "harvest",
    "anchor": "harvest",
    "from": -25,
    "to": -20,
    "title": "20–25 days before harvest",
    "actions": "If heavy rain comes, cover the root zone with plastic and pump the ditches to 60–80 cm to prevent mushy flesh."
  },
  {
    "step": "harvest",
    "anchor": "harvest",
    "from": -15,
    "to": -10,
    "title": "10–15 days before harvest",
    "actions": "Pump the ditches completely dry to finish maturation."
  },
  {
    "step": "harvest",
    "anchor": "harvest",
    "from": 0,
    "to": 0,
    "title": "Harvest",
    "actions": "Signs of maturity: days since fruit set; a dull, hollow sound when tapped; rind turning from light brown to yellow-green; a swollen stalk joint; wider gaps between spines; softer, more flexible spines. Do not harvest in heavy rain: pump the ditches dry and wait 3 days after the rain stops. For export, brush the stalk with ethephon 0.1–0.2% and ripen with good airflow; never seal fruit in."
  }
];
