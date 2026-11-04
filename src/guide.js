// Step-by-step guide content. Every claim lists the source IDs it rests on (see sources.js).
// Each item has a `level`:
//   "evidence" – measured in a cited trial
//   "survey"   – what growers report doing, not a controlled trial
//   "expert"   – a researcher's recommendation built on their trials, not itself tested as stated
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
      {
        text: "Drainage comes before any flowering treatment. Waterlogged roots run short of oxygen, take up less calcium, and produce ethylene that blocks flower-bud formation. Sprays such as thiourea cannot fix this. Restore drainage first.",
        level: "expert",
        sources: ["tran2023book"],
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
        text: "In the JIRCAS trials in Thailand and the SOFRI trials in Vietnam, spraying was timed to the full expansion of the second flush after harvest.",
        level: "evidence",
        sources: ["kozai2024", "tri2011"],
      },
      {
        text: "A practical sign from Mekong Delta growers: spray when the new leaves have turned from light green to dark green, about 2–3 months old.",
        level: "evidence",
        sources: ["hau2017"],
      },
      {
        text: "The late-flowering method used a fertiliser and watering programme first, then sprayed PBZ on mature leaves.",
        level: "evidence",
        sources: ["jantee"],
      },
      {
        text: "Prune to open the canopy. Thai trials found well-pruned trees with open, light-filled canopies flowered more than dense ones. Sunlit outer branches store more starch and form flower buds more readily than shaded inner branches (Salakpetch 2005, as reported in the book).",
        level: "evidence",
        sources: ["tran2023book"],
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
        text: "In Vietnam's Mekong Delta, good irrigation and drainage let growers induce flowering year-round. Natural flowering is Dec–Jan, with harvest in May–Jun. Growers aiming for off-season fruit usually induce in June–July.",
        level: "evidence",
        sources: ["hau2017", "pham2022"],
      },
      {
        text: "Use the Planner tab to turn a target harvest date into a spray window.",
        level: "practice",
        sources: [],
      },
      {
        text: "Avoid inducing during heavy-rain months. Fruit set suffers. Durian can be induced year-round in the Mekong Delta and Malaysia, but timing the rain matters.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "The hardest window is an August–September harvest in the Mekong Delta. It needs flowering in February–March while suppressing the natural cool, dry-season bloom of December–January. Prices are high then, but the authors note the success rate is low, so few growers try it.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "Regional calendars in Vietnam: the Mekong Delta flowers in Dec–Jan and harvests in Apr–May; the Southeast flowers Jan–Mar and harvests Jun–Aug; the Central Highlands mostly flowers Jan–Mar and harvests Jul–Aug. Only the Mekong Delta, with controllable irrigation and drainage, does full off-season induction. The other regions mainly support natural flowering.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "Pick a flowering-friendly weather window. Best conditions: nights of 20–22 °C with about an 8 °C day-night swing (around 30/22 °C) and air humidity of 50–60%. Nights staying above 26 °C burn up the tree's starch. Nights below 18–19 °C can 'burn' young buds.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "Watch the monsoon. In the Mekong Delta, the dry Northeast monsoon (humidity 50–60%) favours flowering, and the wet Southwest monsoon (80–90%) pushes leaf growth. In transition periods, treatments applied a few days apart can give different results, so check wind direction and humidity forecasts before inducing.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "Light changes through the year. Mekong Delta radiation is about 17–21 MJ/m²/day and dips in the rainy Sep–Nov. The Central Highlands get about 18–22, with a bigger seasonal swing. High dry-season light helps flowering, but the heat of late April–May works against it, and the dull, rainy Aug–Oct favours leaves.",
        level: "expert",
        sources: ["tran2023book"],
      },
    ],
  },
  {
    id: "spray",
    title: "Apply paclobutrazol (PBZ) correctly",
    summary: "PBZ is a triazole growth regulator that blocks gibberellin. More is not better.",
    points: [
      {
        text: "How it works: PBZ blocks gibberellin, the hormone that drives shoot growth, and raises cytokinin. The tree puts its resources into flower buds instead of new leaves.",
        level: "evidence",
        sources: ["desta2021"],
      },
      {
        text: "The recommended concentration for mature trees is 1,000–1,500 ppm as a foliar spray. Treated trees flowered 14–45 days earlier, with 29–64% more flowers. Higher rates gave a stronger response, but fruit set was not improved.",
        level: "evidence",
        sources: ["chandraparnik1993", "pham2022"],
      },
      {
        text: "In Vietnam, 1,000–1,600 ppm (20–32 g a.i. in 20 L per tree) brought flower buds 15–22 days earlier and the harvest 19–24 days earlier, and raised yield by 25–60%. Individual fruit were somewhat lighter at the highest rates, and quality (Brix, flesh ratio) was unchanged.",
        level: "evidence",
        sources: ["tri2011"],
      },
      {
        text: "An earlier Can Tho University trial on 'Sua Hat Lep' found that 1,000–1,500 ppm brought flowering 7–15 days earlier and raised yield by about 22.5%. This is the source of Vietnam's 1,000–1,500 ppm recommendation, reported here as cited in Pham et al.",
        level: "evidence",
        sources: ["pham2022"],
      },
      {
        text: "Cultivars respond differently. 'Kho qua xanh' flowers 20–25 days after induction. 'Ri6', 'Monthong' and 'Sua hat lep' are harder to induce and take 30–35 days or more.",
        level: "evidence",
        sources: ["hau2017"],
      },
      {
        text: "PBZ makes flowering more even across the tree, which makes flower and fruit thinning easier. With raised-bed mulching, PBZ did not affect fruit quality in 'Kho Qua Xanh' or 'Sua Hat Lep'.",
        level: "evidence",
        sources: ["tran2023book", "tri2011", "subhadrabandhu1998"],
      },
      {
        text: "Results are not guaranteed. In a 2-year Thai trial on 'Chanee', 500–1,000 ppm sprays raised flowering intensity but did NOT advance flowering or raise yield, and fruit were smaller. The JIRCAS trial also saw a weak effect.",
        level: "evidence",
        sources: ["subhadrabandhu1998", "kozai2024"],
      },
      {
        text: "Use a foliar spray, not a soil drench. Every durian trial cited here sprayed the leaves. Durian is more sensitive to PBZ than mango, and drenched trees may decline or recover slowly. Soil drenches also leave much more residue in the soil, as mango data show.",
        level: "evidence",
        sources: ["subhadrabandhu1998", "singh2024"],
      },
      {
        text: "Timing within the season matters. In Indonesia, an August application flowered faster than June or July. In Thailand, a December spray earned more than a November one.",
        level: "evidence",
        sources: ["sakhidin2019", "wiangsamut2022"],
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
        text: "Rest the trees. SOFRI recommends pausing PBZ for 1–2 seasons after every 3–4 seasons of use, because residue builds up in the soil. PBZ's soil half-life ranges from about 2 months in mango orchard fields to over a year in regulatory tests.",
        level: "evidence",
        sources: ["tri2011", "kishore2015", "singh2024"],
      },
      {
        text: "Check the residue limit in your destination market before you spray. In the EU, durian has no specific PBZ limit, so the default of 0.01 mg/kg may apply. In mango, no residue was found in fruit at optimised rates.",
        level: "evidence",
        sources: ["efsa2017", "singh2024", "kishore2015"],
      },
      {
        text: "PBZ is rated moderately hazardous to people and highly toxic to aquatic life. Keep sprays and rinse water out of ditches and ponds. This matters most in Mekong-style raised-bed orchards.",
        level: "evidence",
        sources: ["kishore2015"],
      },
      {
        text: "Use only PBZ products registered for fruit trees in your country, and follow the label for protective equipment and pre-harvest intervals.",
        level: "practice",
        sources: [],
      },
      {
        text: "Spray PBZ before laying the plastic. Spray that lands on impermeable mulch washes into the ditches and is wasted. Spray that falls on bare soil before mulching can be taken up by the roots. Surveyed orchards had PBZ residue only at the canopy drip line (0–20 cm deep), consistent with spray running off plastic laid beforehand.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "Use enough spray volume. Many growers mix a high concentration but apply too little liquid per tree. Surveyed growers sprayed 1,816 ppm but delivered only 11.8 g a.i. per tree (Tien Giang), or 1,240 ppm and 10.5 g (Ben Tre). The successful trials gave 20–32 g a.i. per tree (1,000–1,600 ppm × 20 L). Check the grams per tree in the PBZ mix tab.",
        level: "expert",
        sources: ["tran2023book", "pham2022", "tri2011"],
      },
      {
        text: "Grower technique for even flowering: inner primary branches are harder to induce than outer branches. Growers lightly mist the outer canopy at a low concentration and spray the inner primary branches at a higher one. No trial has tested specific rates for this yet.",
        level: "practice",
        sources: ["tran2023book"],
      },
      {
        text: "Cultivars differ in how they respond. 'Kho Qua Xanh' (off-season, Cai Lay): with PBZ, buds appeared 19 days after spraying instead of 26, but flowering came only 3–4 days earlier. Flower clusters roughly doubled (72 → 152–163 per tree), and yield rose from 120 to 186–191 kg per tree, although fruit were lighter (2.2 vs 2.5 kg). 'Sua Hat Lep' responded 4–22 days earlier, in several drawn-out flushes. In year 1 its off-season yield rose from 24.6 to 41.5–55.5 kg per tree, but in year 2 the off-season gain was not significant (Hau 2000; Hau et al. 2001; book Tables 5.2–5.7).",
        level: "evidence",
        sources: ["tran2023book"],
      },
      {
        text: "Thiourea can wake dormant buds after PBZ. On 'Chanee', 500–1,500 ppm thiourea applied after 1,000 ppm PBZ gave 20 times more flowers than untreated trees and 75% more than PBZ alone. It does not work if daily rain exceeds 35 mm (Chandraparnik et al. 1992a, as reported in the book, p. 141; checked against a clear rescan).",
        level: "evidence",
        sources: ["tran2023book"],
      },
      {
        text: "Other options: uniconazole at 100–500 ppm brought flowering forward on 'Monthong' without reducing fruit size. At 2,500 ppm it shortened fruit stalks and made fruit smaller (Jutamanee et al. 2014). Ethephon, daminozide and NAA have no flowering effect, gibberellins push leaf growth, and root pruning harms or kills trees (as reported in the book).",
        level: "evidence",
        sources: ["tran2023book"],
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
        text: "In the Vietnamese trials, plastic mulch went down 1 week before spraying and was removed gradually when buds broke, 3–4 weeks after the spray. Normal fertiliser and irrigation resumed after that. Mulch alone, without PBZ, was 'not effective'.",
        level: "evidence",
        sources: ["tri2011"],
      },
      {
        text: "In Mekong Delta raised-bed orchards, growers drain the ditches for 30–40 days during induction. If heavy rain refills the ditches, trees can flower in 2–3 separate waves, which complicates harvest timing.",
        level: "evidence",
        sources: ["hau2017"],
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
      {
        text: "How much drought is enough (Thai benchmark): a continuous dry spell of about 7–14 days (the book's summary says 10–14), bringing leaf water potential to about −0.7 to −0.8 MPa (Salakpetch 2005). Compare the JIRCAS trial, where plastic mulch reached −0.9 MPa and flowering was suppressed. The useful range is narrow.",
        level: "evidence",
        sources: ["tran2023book", "kozai2024"],
      },
      {
        text: "Other drought benchmarks: in Chanthaburi, trees flowered about 50 days after the rain stopped, at a soil moisture of −100 kPa at 15 cm depth. Temperatures below 20 °C were not needed. 'Musang King' growers in Raub, Malaysia, say at least 14 dry days are needed (as reported in the book).",
        level: "evidence",
        sources: ["tran2023book"],
      },
      {
        text: "Re-watering after the dry spell (Salakpetch 2005): when leaves droop, give about 10 mm of water (10 L per m² of canopy). After 7 days, water every 3 days until flower buds appear.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "Don't over-dry during flowering. On 'D24' in Malaysia, 50–75 L per tree per day gave the best flowering. At 25 L per day, all young fruit dropped within 5 weeks of fruit set, and 100 L per day was too wet (Masri 1999, as reported in the book).",
        level: "evidence",
        sources: ["tran2023book"],
      },
      {
        text: "Don't clear the grass before mulching. Cai Lay growers find that laying plastic over the grass works better, probably because the grass keeps transpiring and pulls more water out of the soil, which speeds up the drought.",
        level: "practice",
        sources: ["tran2023book"],
      },
      {
        text: "Mulch style: tent-style plastic over the raised bed lowers soil moisture more than plastic laid flat, because condensation runs off the bed instead of back into it. In Cai Lay, where trees grow on individual mounds, growers wrap each tree's root zone instead.",
        level: "practice",
        sources: ["tran2023book"],
      },
      {
        text: "Trenching 30–40 cm deep near the trunk, as done in Cai Lay, is a grower practice with no durian trials behind it. It may encourage root disease. Treat it as unproven.",
        level: "practice",
        sources: ["tran2023book"],
      },
      {
        text: "Drought needs differ by cultivar in the Mekong Delta. 'Kho Qua Xanh' flowers after 20–25 days counted from when the ditches are completely dry (about 26 days from first withholding water). 'Ri6' and 'Monthong' need 30–35 days and still flower unevenly, in 2–3 waves. 'Sua Hat Lep' flowers reliably only in the dry season; with incomplete drought its buds take about 3 months and few appear. This is much longer than the 7–14 days (Salakpetch 2000) or 10–14 days (Chandraparnik et al. 1992b) found in Thailand. The book concludes that Mekong Delta durians need a longer drought, and that how well mulching works depends on cultivar, weather and ditch-water management (book pp. 142, 152).",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "Measure soil moisture, don't guess. On the Can Tho University farm soil (0–30 cm: field capacity 57.3%, wilting point 18.9%), trees flowered at 30% soil moisture in the first flush and well at 28.6% in the second. That is roughly a quarter of the available water left. The book's rule of thumb is 30–40% moisture held for 3–4 weeks, adjusted for soil texture (Hau et al. 2001, book Table 5.1).",
        level: "evidence",
        sources: ["tran2023book"],
      },
      {
        text: "Plastic mulch is expensive and makes tree care awkward during induction, but Mekong Delta growers keep using it because it works.",
        level: "expert",
        sources: ["tran2023book", "hau2017"],
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
        text: "'Ri6' is much faster: fruit matures about 97 days after fruit set. Flowering on one tree lasts about 25 days, so tag clusters as they open. Choose the cultivar in the Planner.",
        level: "evidence",
        sources: ["tran2019"],
      },
      {
        text: "In 'Ri6', 82% of flowers set fruit, but 71.7% of young-fruit drop happens in the first 14 days. Physiological disorders appear from 70 to 97 days, so keep water and nutrition steady late in fruit growth.",
        level: "evidence",
        sources: ["tran2019"],
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
      {
        text: "Flower buds ('crab eyes') can go dormant if even light rain (about 10 mm a day) falls while they develop. Some buds then resume and others stall, giving several waves of fruit (Chandraparnik et al. 1992b; Janick & Paull 2008, as reported in the book). Buds take 6–8 weeks to develop, and some up to 32 weeks.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "Cool nights at flowering: around 15 °C at night causes flower drop in 'Monthong', which has fewer fertile ovules. 'Chanee' still sets fruit at 15 °C, and Central Highlands orchards flower well at similar night temperatures.",
        level: "evidence",
        sources: ["tran2023book"],
      },
      {
        text: "In the cooler Central Highlands, 'Monthong' can take 135–150 days from flowering to harvest, much longer than in the lowlands. The Planner has a preset for this.",
        level: "evidence",
        sources: ["tran2023book"],
      },
      {
        text: "Wind at flowering: light wind (0.5–2 m/s) dries leaves and flowers and limits fungal disease. Strong wind above 5 m/s, as in storms, breaks branches and knocks off flowers. Hot, dry winds can scorch flowers and weaken buds. Windbreaks help in exposed orchards.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "In Darwin, cool 15 °C nights triggered 'Monthong' flowering within 1–2 weeks (Lim & Luder 2000, as reported in the book). Cool nights can help flowers form but cause 'Monthong' flowers to drop once open.",
        level: "evidence",
        sources: ["tran2023book"],
      },
    ],
  },
  {
    id: "fruitset",
    title: "Set more fruit and stop young-fruit drop",
    summary: "Most young fruit are lost in the first month after fruit set. Hand pollination, boron, steady water, calcium and stopping leaf flushes protect the crop you worked to induce.",
    points: [
      {
        text: "Why fruit set needs help: durian's male and female flower parts mature at different times, and many cultivars are partly or fully self-incompatible. 'Musang King' specifically needs cross-pollination. Poorly pollinated fruit end up misshapen, with empty locules, and have little market value.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "Which cultivars need hand pollination (Vietnam): 'Kho Qua Xanh', 'Chuong Bo Hat Lep' and 'Sau Huu' set well on their own. 'Sua Hat Lep' and 'Ri6' need supplemental pollination to set well and give evenly shaped fruit. 'Monthong' may not strictly need it, but hand pollination raises set and cuts young-fruit drop. Orchards grown from seed are genetically mixed and usually don't need it.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "What hand pollination achieves: in Thailand it raised fruit set in 'Chanee' from 0–6% to 30–64% and in 'Kanyao' from 21% to 87–90%. Self-pollinated set was only 7.7% in 'Monthong' and 3.6% in 'Chanee'; with 'Kradumthong' pollen it rose to 27.2% and 16.3% (Honsho et al. 2004). In Vietnam, 'Sua Hat Lep' set rose from 13.3% to 60–90% and evenly shaped fruit from 0% to 50–93%, with 'Monthong' a good pollen source (Hau & Lam 2008; Van 2001; as reported in the book).",
        level: "evidence",
        sources: ["tran2023book"],
      },
      {
        text: "How to hand-pollinate: work between 18:00 and 21:00, when flowers open. Collect pollen from a DIFFERENT cultivar with a nylon brush and sweep it gently onto the stigmas. Use one brush for only 2–3 trees, then clean or replace it so pollen sources don't mix.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "Plant a cultivar mix for pollination and a longer season. Malaysia recommends D24 50%, D99 30% and D98 or D114 20% (D99 ripens 90–100 days after anthesis, D24 105–115, D98/D114 120–130). Thailand pairs 'Chanee', 'Kradumthong', 'Kanyao' and 'Monthong', with 'Kradumthong' as the pollen donor ('Chanee'/'Kradumthong' 103–105 days, 'Monthong'/'Kanyao' 127–130). Staggered ripening also avoids peak-season gluts.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "Boron for pollen: pollen germination needs Ca 50–90 ppm, B 30–60 ppm, Mg 15–30 ppm and K 15–30 ppm, and boron is the one usually short. Salakpetch (2005) advises a Ca + B spray in the 6th week after flower buds appear. On 'Sua Hat Lep', 'Monthong' and 'Kho Qua Xanh', 100 ppm boric acid raised pollen germination 2.8–4.8 times and pollen-tube length 4–8.9 times (Van 2001, as reported in the book). The Can Tho Musang King trials used a similar Ca 1% + B 100 ppm spray around bloom.",
        level: "evidence",
        sources: ["tran2023book", "duong2025huaf"],
      },
      {
        text: "When fruit drop happens: unpollinated flowers fall 7–10 days after opening. Young-fruit drop peaks about 3 weeks after fruit set and settles by about 6 weeks. In 'Sua Hat Lep' fewer than 10% of fruit remained after the 3-week drop (Hau & Lam 2008, as reported in the book).",
        level: "evidence",
        sources: ["tran2023book"],
      },
      {
        text: "NAA can raise fruit set. One NAA spray at 20–60 ppm before flowering raised 'Sua Hat Lep' set from 70% to 87%, but did nothing for 'Kho Qua Xanh', which already sets 95.7% (Thuy 2001). The book's practical advice is 20–40 ppm shortly after fruit set; too much NAA easily causes misshapen fruit.",
        level: "evidence",
        sources: ["tran2023book"],
      },
      {
        text: "Gibberellin (GA₃) can hold young fruit. 5 ppm sprayed onto the fruit stalks at about 6 weeks reduced drop and increased fruit size by 20–30% (Mamat & Wahab 1990, 1992). On 'Kho Qua Xanh', 5–10 ppm raised the share of fruit reaching harvest to 43.6–45.8%, against 11.2% untreated. Timing mattered: sprays at 30–45 days after fruit set worked (40.6–45.9%), but at 15 days they did not (6.1%) (Thuy 2001). The book suggests 5–10 ppm at 3–6 weeks; it works best in cultivars with many aborted seeds, such as 'Sua Hat Lep' and 'Monthong'.",
        level: "evidence",
        sources: ["tran2023book"],
      },
      {
        text: "Stop new leaf flushes from competing with young fruit. Flushes 3–8 weeks after fruit set increase drop and cause misshapen fruit with hard, brownish, uneven flesh (Salakpetch et al. 1992). Daminozide or mepiquat chloride at 630 ppm delayed leaf buds by 3 weeks. KNO₃ 1.5% or MKP 2.5% delayed new leaves by 14 days despite some leaf burn, and KNO₃ also improved fruit retention, fruit weight and pulp ratio (Punnachit et al. 1992). The book's advice: spray KNO₃ 1.5% or mepiquat chloride 600 ppm if fruit set is low or flushes come in waves.",
        level: "evidence",
        sources: ["tran2023book"],
      },
      {
        text: "'Matchstick' drop from bad weather: drought, cold snaps, extreme heat or unseasonal heavy rain can strip flowers and matchstick-sized fruit within 1–2 days. Water stress cuts calcium flow to the young fruit; waterlogging suffocates roots and triggers ethylene. Both activate the abscission layer.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "So do NOT cut irrigation after fruit set. Keep soil moisture steady with good drainage and regular watering. Spray calcium (CaCl₂ or Ca-chelate) at 7–21 days after fruit set to strengthen cell walls, and keep potassium and silicon balanced. This is the opposite of the induction drought, which must end once flower buds are visible.",
        level: "expert",
        sources: ["tran2023book"],
      },
      {
        text: "Plant growth regulators such as NAA, GA₃, daminozide and mepiquat chloride must be registered for fruit use in your country, and some export markets restrict them. Check labels and local rules before using them.",
        level: "practice",
        sources: [],
      },
    ],
  },
  {
    id: "quality",
    title: "Protect off-season fruit quality",
    summary: "Getting flowers out of season is half the job. Off-season fruit is prone to flesh disorders such as 'tiger stripe', hardened pulp and tip burn. Can Tho University tested a fix on 'Musang King'.",
    points: [
      {
        text: "Season matters for the evidence too. The two published Ca/NPK trials ran in the Mekong Delta main season (Dec–May, induced in the dry season). The off-season results so far come from conference slides. The authors themselves call for more seasons and sites.",
        level: "evidence",
        sources: ["duong2025huaf", "duong2026swj", "hau2026talk"],
      },
      {
        text: "Flesh disorders are a big off-season risk. In surveyed 'Musang King' orchards, 19% had disorders only in the off-season and 78% in both seasons. Management, not just weather, is the main driver.",
        level: "survey",
        sources: ["duong2025"],
      },
      {
        text: "Know the fruit clock. 'Musang King' is harvested about 90 days after fruit set (DAFS). Growth is fastest at 28–70 DAFS, and disorders show up from about 70 DAFS. Expect about 35% fruit drop in the first 14 days, rising to about 48.5% by 42 DAFS.",
        level: "evidence",
        sources: ["duong2025"],
      },
      {
        text: "Cut the nitrogen as the fruit grows. In off-season trials, soil NPK 2:1:1 at 30 DAFS, then 2:1:3 at 45, then 1:1:3 at 60 (0.75 kg per tree each time) gave 10% disordered fruit, while steady high nitrogen (3:1:1) gave 45%. These figures are from conference slides and are not yet in a full paper.",
        level: "evidence",
        sources: ["hau2026talk"],
      },
      {
        text: "Don't over-fertilise; 0.75 kg per tree per application is about the sweet spot. In the published main-season trial, going from 0.75 to 1.25 kg raised disordered fruit from 12% to 24% for about 2 kg more yield, and lowered sugar. The off-season slides show the same pattern (12% at 0.5 kg, 36% at 1.25 kg).",
        level: "evidence",
        sources: ["duong2025huaf", "duong2026crop", "hau2026talk"],
      },
      {
        text: "Spray calcium, then magnesium: Ca(NO₃)₂ at 0.4% at 40 DAFS and MgSO₄ at 0.2% at 50 DAFS, 10 L per tree, early morning on a dry, sunny day. In the published main-season trial this gave 0% affected fruit, against 30% for unsprayed trees, and Ca raised yield 4–9%. Off-season slides show Ca raising yield from 85 to 93 kg per tree.",
        level: "evidence",
        sources: ["duong2026swj", "hau2026talk"],
      },
      {
        text: "The combined protocol gave 0% disordered off-season fruit, against 19.7% for the growers' high-N programme. It used 25% less fertiliser for a statistically similar yield.",
        level: "evidence",
        sources: ["hau2026talk"],
      },
      {
        text: "Protect fruit set. In the Can Tho trials, every tree got a Ca (1%) + boron (100 ppm) spray 14 and 7 days before flowers opened, at full bloom, and 7 days after. This was routine care, not a tested treatment, and fruit set reached about 91%.",
        level: "expert",
        sources: ["duong2025huaf"],
      },
      {
        text: "Calcium all season: lime to pH 5.8–6.5 after harvest. Apply soluble Ca to the root zone 2–3 times in the first 40–50 DAFS, then spray Ca every 15–20 days during long rain, hot dry spells or cold weather. For a dated spray and fertiliser schedule with a mix calculator, use the Tiger Stripe app.",
        level: "expert",
        sources: ["hau2026talk"],
      },
      {
        text: "Never use chloride fertilisers. Researchers and extension officers warn that muriate of potash (KCl/MOP), or NPK blends made with it, causes soggy, watery flesh, probably because chloride makes the flesh take up water as harvest nears. Check that the potassium in any NPK blend comes from sulphate of potash (K₂SO₄) or potassium nitrate (KNO₃). In a Cai Lay survey, 100% of durian growers avoided chloride fertilisers (Tham 2008, as reported in the book). The Can Tho Musang King trials also used K₂SO₄.",
        level: "expert",
        sources: ["tran2023book", "duong2026swj"],
      },
      {
        text: "Boron and calcium near flowering and harvest: Philippine guidance treats tip burn as a boron-deficiency symptom and suggests 10 g of borax per tree at flowering. It also suggests 2 kg of calcium nitrate per tree one month before harvest to correct uneven ripening (Armenio & Rfu-Xi 2006, as reported in the book). These are recommendations, not trial results; never exceed product label rates.",
        level: "expert",
        sources: ["tran2023book"],
      },
    ],
  },
];

// Every durian PBZ field trial cited in the app, for the "PBZ evidence" comparison table.
// effect: "positive" | "mixed" | "none"
export const PBZ_TRIALS = [
  {
    source: "subhadrabandhu1998", place: "Rayong, TH", cultivar: "Chanee", age: "5–20 yr",
    method: "Foliar", rate: "500–1,000 ppm", timing: "Jul–Sep",
    result: "No earlier flowering, no yield gain; more flowering branches; smaller fruit",
    effect: "none",
  },
  {
    source: "chandraparnik1993", place: "Chanthaburi, TH", cultivar: "Chanee", age: "12 yr",
    method: "Foliar", rate: "750–1,500 ppm", timing: "Flush fully expanded",
    result: "Flowered 14–45 days earlier; 29–64% more flowers; fruit set unchanged",
    effect: "positive",
  },
  {
    source: "tri2011", place: "Ben Tre, VN", cultivar: "Dona", age: "9 yr",
    method: "Foliar + mulch", rate: "1,000–1,600 ppm (20–32 g a.i.)", timing: "Late Aug, 2nd flush",
    result: "Buds 20–22 days earlier; harvest 19–24 days earlier; yield 135 → 176–215 kg/tree",
    effect: "positive",
  },
  {
    source: "tri2011", place: "Ba Ria, VN", cultivar: "Sua Hat Lep", age: "12 yr",
    method: "Foliar + mulch", rate: "1,000–1,500 ppm", timing: "Late Aug, 2nd flush",
    result: "Buds 15–17 days earlier; harvest 19–21 days earlier; yield 156 → 195–227 kg/tree",
    effect: "positive",
  },
  {
    source: "pham2022", place: "Can Tho, VN", cultivar: "Sua Hat Lep", age: "—",
    method: "Spray", rate: "1,000–1,500 ppm", timing: "—",
    result: "Flowered 7–15 days earlier; yield +22.5% (Tran et al. 2001, reported secondhand in Pham 2022)",
    effect: "positive",
  },
  {
    source: "tran2023book", place: "Tien Giang, VN", cultivar: "Kho Qua Xanh", age: "—",
    method: "Foliar + root-zone mulch + ditch drainage", rate: "1,000–1,500 ppm", timing: "Off-season (spray ≈ end Aug)",
    result: "Buds 19 vs 26 days; flowering 3–4 days earlier; flower clusters 72 → 152–163/tree; yield 120 → 186–191 kg/tree; fruit 2.2 vs 2.5 kg (Hau 2000; Hau et al. 2001; Tables 5.2, 5.4, 5.6)",
    effect: "positive",
  },
  {
    source: "tran2023book", place: "Can Tho, VN", cultivar: "Sua Hat Lep", age: "—",
    method: "Foliar + ditch drainage", rate: "1,000–1,500 ppm", timing: "2 years",
    result: "Yr 1 off-season: buds 58 vs 80 days, yield 24.6 → 41.5–55.5 kg/tree. Yr 2 off-season: clusters up, but yield not significant (12.2 vs 8.7–17.3 kg) (Hau et al. 2001; Tables 5.3, 5.5, 5.7)",
    effect: "mixed",
  },
  {
    source: "kozai2024", place: "Chanthaburi, TH", cultivar: "Monthong", age: "9 yr",
    method: "Foliar ± mulch", rate: "1,000–1,500 ppm (20–30 g a.i.)", timing: "15 Aug, 2nd flush",
    result: "Effect not significant (heavy rain after spray); mulch drought suppressed flowering",
    effect: "none",
  },
  {
    source: "jantee", place: "Chanthaburi, TH", cultivar: "Not stated in abstract", age: "Bearing",
    method: "Foliar", rate: "1,000 ppm", timing: "Early & late programmes",
    result: "Flowered 9–36 days early; 108.6 vs 93.4 kg/tree; late method delayed 28–43 days",
    effect: "positive",
  },
  {
    source: "sakhidin2019", place: "Central Java, ID", cultivar: "Kani, Monthong", age: "10 yr",
    method: "Method & rate", rate: "not in abstract", timing: "Jun / Jul / Aug",
    result: "August application flowered fastest; Kani faster than Monthong",
    effect: "mixed",
  },
  {
    source: "wiangsamut2022", place: "Chanthaburi, TH", cultivar: "Monthong", age: "Juvenile",
    method: "Foliar", rate: "750 ppm", timing: "5 Nov vs 5 Dec",
    result: "93.6–97% flowered; Dec spray gave June harvest and higher returns",
    effect: "positive",
  },
];

export const GAPS = [
  "The trials do not all agree (see the tally on the PBZ evidence tab). Two found little or no effect (Rayong 1988–89, Chanthaburi 2007), and a Can Tho trial worked in its first year but not in its second off-season. The weak results point to weather, cultivar and application factors.",
  "No published trial compares soil drench with foliar spray on durian at matched doses. Foliar spraying is the only method with durian evidence.",
  "No codified durian MRL for paclobutrazol was found in the EU review. Check each destination market's current rules, for example China's GB 2763 or Codex.",
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
  { id: "spraybefore", text: "PBZ sprayed BEFORE laying plastic, with enough litres per tree for the full dose", stage: "spray" },
  { id: "rewater", text: "Re-watering plan ready: about 10 mm when leaves droop, then every 3 days after day 7 until buds show", stage: "water" },
  { id: "weather", text: "Forecast checked: dry Northeast-monsoon conditions, humidity about 50–60%, nights about 20–22 °C (not >26 °C)", stage: "timing" },
  { id: "soilmeter", text: "Soil moisture at 0–30 cm being measured; drought length set for the cultivar (Ri6 / Monthong 30–35 days in the Mekong Delta)", stage: "water" },
  { id: "drywatch", text: "Irrigation held back for a short (3–7 day) dry spell only", stage: "water" },
  { id: "tag", text: "Flower clusters tagged with their opening date", stage: "fruit" },
  { id: "pollen", text: "Pollen-donor cultivar identified; brushes ready for hand pollination at 18:00–21:00 (essential for Ri6, Sua Hat Lep, Musang King)", stage: "fruitset" },
  { id: "noWaterCut", text: "Irrigation steady after fruit set (no water cut-off); Ca spray planned for 7–21 days after set; leaf flushes watched for 3–8 weeks", stage: "fruitset" },
  { id: "fruitcare", text: "Fruit-set date recorded; NPK 30/45/60 DAFS and Ca 40 / Mg 50 DAFS sprays scheduled", stage: "quality" },
  { id: "noKCl", text: "Fertiliser labels checked: potassium from K₂SO₄ or KNO₃, never KCl / muriate of potash", stage: "quality" },
  { id: "lime", text: "After harvest: soil pH checked and limed to 5.8–6.5", stage: "quality" },
];

export const PBZ_SAFETY = [
  { text: "Persistence: the soil half-life is over a year in regulatory tests, and 58–77 days in mango orchard fields. Residue builds up with yearly use.", sources: ["kishore2015", "singh2024", "tri2011"] },
  { text: "Measured in durian orchards: up to about 1.04 mg/kg in the topsoil at the canopy edge after 5 or more years. Most growers were overdosing.", sources: ["pham2022"] },
  { text: "Rotation: pause for 1–2 seasons after every 3–4 seasons of PBZ use.", sources: ["tri2011"] },
  { text: "Food safety: ADI 0.022 mg/kg bw/day and ARfD 0.10 mg/kg bw. The EU has no durian-specific MRL, so the 0.01 mg/kg default may apply. No residue was found in mango fruit at optimised rates.", sources: ["efsa2017", "singh2024"] },
  { text: "Environment and handling: highly toxic to aquatic life and moderately hazardous to people. Wear protective equipment and keep it out of irrigation ditches.", sources: ["kishore2015"] },
  { text: "Method: use a foliar spray only. Soil drenches risk tree decline in durian and leave far more soil residue.", sources: ["subhadrabandhu1998", "singh2024"] },
];
