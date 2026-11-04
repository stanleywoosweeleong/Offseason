// PBZ soil clean-up: every microbe reported to break PBZ down (any crop), and what other crops teach about
// reducing PBZ residue and its side effects. Shown under PBZ › Clean-up.
// test: "field" | "pot" | "soil" (lab soil) | "liquid" (lab culture) | "unknown"

export const MICROBES = [
  {
    name: "Micrococcus yunnanensis HY001", group: "Bacterium", from: "Herb (Ophiopogon) field soil, Sichuan, China", test: "field",
    result: "One spray of a 10⁹ CFU/g product cut existing soil PBZ by about 75% in 5 months (0.55 → 0.067 mg/kg vs 0.27 untreated). Soil enzymes and yield rose.",
    level: "evidence", sources: ["jiang2025"],
  },
  {
    name: "CT3-92 + B6-1 + B2-O (three-strain liquid product)", group: "Bacteria", from: "CT3-92 from a Mekong mango orchard; B6-1 and B2-O from maize leaves (Vietnam)", test: "field",
    result: "Sprayed at 5 L per 1,000 m² of rice soil: no PBZ detectable 10 days after farmers applied it, against 0.13 mg/kg without it. CT3-92 alone removed 47.5% in mango soil in 15 days in the lab.",
    level: "evidence", sources: ["thien2021", "thao2014"],
  },
  {
    name: "Six-strain product (Vietnamese utility patent 3266)", group: "Bacteria", from: "Tien Giang, Vietnam", test: "field",
    result: "Reported to break down 99.77% of soil PBZ in 9 months in a mango test; sold for mango, plum and durian soils. No published trial.",
    level: "expert", sources: ["bavutex2023"],
  },
  {
    name: "Ensifer adhaerens dt8", group: "Bacterium (nitrogen-fixing group)", from: "Banana plantation soil, Hainan, China", test: "pot",
    result: "93.5% of PBZ degraded in 7 days in liquid culture. As an inoculant, banana seedlings in PBZ-contaminated soil returned to normal growth, and wheat grew better in PBZ-polluted mango-orchard soil (photos, no residue data).",
    level: "evidence", sources: ["tan2018dt8"],
  },
  {
    name: "Streptomyces caelestis S3", group: "Actinomycete", from: "Herb (Ophiopogon) base, Sichuan, China", test: "pot",
    result: "97.4% of PBZ degraded in 8 days in liquid culture and about 97.5% of 1 g/kg in soil. Herb plants regained normal height in pots.",
    level: "evidence", sources: ["zhang2024s3"],
  },
  {
    name: "Pseudomonas spp. (native, Brazil)", group: "Bacteria", from: "Mango orchard soils, São Francisco valley, Brazil", test: "soil",
    result: "Soil with a PBZ history left about 1% after 63 days. Adding Pseudomonas raised breakdown from 8–14% to 29–38% in 40 days; adding mineral nutrients raised it to about 95%.",
    level: "evidence", sources: ["vaz2015", "santos2014"],
  },
  {
    name: "Pseudomonas putida T7", group: "Bacterium", from: "PBZ-treated field soil, India", test: "liquid",
    result: "98.3% degraded in 15 days. Also frees zinc, potassium and phosphate and suppresses Fusarium, Colletotrichum and Pythium in the lab: a possible two-in-one for root health.",
    level: "evidence", sources: ["kumar2021t7"],
  },
  {
    name: "Pseudomonas fluorescens, P. nitroreducens, Burkholderia cepacia, Acinetobacter seifertii", group: "Bacteria", from: "30 Mekong Delta mango orchards, Vietnam", test: "liquid",
    result: "The four best of 90 strains degraded 33.6–36.5% of 60 ppm PBZ in 30 days.",
    level: "evidence", sources: ["pham2023"],
  },
  {
    name: "Burkholderia CT2-29 and B. cepacia CT3-18", group: "Bacteria", from: "PBZ-treated durian districts: Cho Lach, Cai Lay, Phong Dien (Vietnam)", test: "liquid",
    result: "15.5–16.4% of 15 ppm degraded in 15 days. The only strains isolated from durian-district soils.",
    level: "evidence", sources: ["thao2014"],
  },
  {
    name: "Pseudomonas-dominated consortium", group: "Mixed bacteria", from: "Industrially contaminated sediment, China", test: "liquid",
    result: "Over 98% of 3.4 mg/L degraded in 36 hours; 60% of 54 mg/L in 48 hours. Faster with oxygen.",
    level: "evidence", sources: ["chen2010"],
  },
  {
    name: "Stenotrophomonas, Bacillus, Brevibacillus (consortium)", group: "Mixed bacteria", from: "Mango soils, Petrolina and Lins, Brazil", test: "liquid",
    result: "Up to 42% removed in culture; in soil about 55% gone by day 60 (half-life about 95 days). Best community came from 20–40 cm depth.",
    level: "evidence", sources: ["silva2003"],
  },
  {
    name: "Deinococcus arenae", group: "Bacterium", from: "Over-treated herb soil, Sichuan, China", test: "liquid",
    result: "43.9% degraded in 11 days: slower than the strains above.",
    level: "evidence", sources: ["huang2024deino"],
  },
  {
    name: "Pseudomonas and Mycobacterium (soil community)", group: "Bacteria", from: "Lab soils, China", test: "soil",
    result: "Linked to PBZ breakdown in soil (half-lives 50–80 days); association only, no isolated strain.",
    level: "evidence", sources: ["zhao2021"],
  },
  {
    name: "Laccase + peroxidase (enzymes, not live microbes)", group: "Enzymes", from: "Laboratory method, China", test: "soil",
    result: "88.4% of soil PBZ gone in 48 hours with a mediator and hydrogen peroxide at 40 °C; laccase alone about 38%. Not a farm product.",
    level: "evidence", sources: ["sun_laccase"],
  },
  {
    name: "Pseudomonas with glycerol", group: "Bacteria", from: "Saturated soil, Brazil", test: "soil",
    result: "Reported 43% in 14 days, 70% in 28 days with glycerol added.",
    level: "lead", sources: ["vaz2012"],
  },
  {
    name: "Soil from PBZ-treated orchards + peanut cake", group: "Native microbes", from: "Brazil", test: "soil",
    result: "Reported about 95% degradation when PBZ-history soil was mixed in with peanut cake.",
    level: "lead", sources: ["dasilva2016"],
  },
  {
    name: "New Mekong and South-East strains (Nong Lam University)", group: "Bacteria", from: "Fruit-orchard soils, Vietnam", test: "unknown",
    result: "Strains isolated in 2024; names and rates not yet readable.",
    level: "lead", sources: ["duong2024bact"],
  },
  {
    name: "First reported PBZ-degrading microbes (1996)", group: "Bacteria", from: "Australia", test: "unknown",
    result: "The earliest report; later papers cite its content inconsistently.",
    level: "lead", sources: ["jackson1996"],
  },
];

export const NO_FUNGI =
  "No fungus has been shown to break PBZ down. PBZ is itself a fungicide and lowers soil fungal diversity, and the Brazilian enrichments found no fungi. Every degrader so far is a bacterium or actinomycete.";

// What other crops teach. group: rescue | less | help | lasts
export const CLEANUP_GROUPS = [
  { id: "help", title: "Help the soil break PBZ down", summary: "Soil conditions that speed up the native microbes." },
  { id: "less", title: "Put less PBZ into the soil", summary: "Dose, placement and lower-residue alternatives tested in mango and cherry." },
  { id: "rescue", title: "Rescue an overdosed tree", summary: "Gibberellin sprays reverse PBZ, if used early." },
  { id: "lasts", title: "How long PBZ lasts in other crops", summary: "Why one year's dose can still act the next." },
];

export const OTHER_CROPS = [
  // help
  { group: "help", text: "Keep the root zone moist but airy, never waterlogged. PBZ breaks down mainly through microbes that need oxygen: in paddy soil its half-life was 45 days when flooded against 22 days unflooded, and in Hainan mango soils breakdown was fastest at 60% of water-holding capacity and slowest when saturated. Without oxygen, a degrading consortium removed almost nothing.", level: "evidence", sources: ["liu1993", "wu2022", "chen2010"] },
  { group: "help", text: "Leave the soil structure alone. In undisturbed soil cores PBZ's half-life was about 63 days, against about 255 days in sieved soil. Deep digging or rotavating the root zone may slow breakdown, and it damages durian's shallow feeder roots anyway.", level: "evidence", sources: ["hand2021"] },
  { group: "help", text: "Feed the microbes. Adding a mineral nutrient solution raised PBZ breakdown in mango soil to about 95% in 40 days; glycerol and peanut cake have also been reported to help. Soil from an orchard with a PBZ history carries adapted degraders and is a cheap starter.", level: "evidence", sources: ["santos2014", "vaz2015", "silva2003"] },
  { group: "help", text: "Earthworms sped up PBZ breakdown in soil. Organic mulch and manure that feed earthworms and microbes serve durian roots too.", level: "evidence", sources: ["fang2026"] },
  { group: "help", text: "Organic matter has two effects. It binds PBZ, so less reaches the roots (bark media needed 4–14 times more PBZ for the same effect), and manure at 2 t/ha helped clear PBZ from rice soil by harvest. But strong binding can also slow breakdown, so pair organic matter with moisture and air rather than relying on it alone.", level: "evidence", sources: ["milfont2008", "million1998", "thien2021", "wu2022"] },
  { group: "help", text: "Soil chemistry: lower pH and higher cation-exchange capacity sped PBZ breakdown in Hainan mango soils. Durian's target of pH 6.0–6.5 is in the right range; do not lime above it.", level: "evidence", sources: ["wu2022"] },
  { group: "help", text: "Biochar: a specially activated (phosphoric acid) cotton-stalk biochar adsorbed PBZ strongly and, at 1% of the soil, relieved PBZ injury to mung bean seedlings. Ordinary farm biochar has not been tested.", level: "lead", sources: ["zhong2024"] },
  { group: "help", text: "Chemical options remain laboratory tools: nano zero-valent iron cut soil PBZ by only 15%, and an enzyme mix removed 88% in 48 hours under controlled heat and peroxide.", level: "evidence", sources: ["zhou2025", "sun_laccase"] },
  // less
  { group: "less", text: "Use the lowest dose that works. In mango, 0.25 g a.i. per metre of canopy spread has been reported to flower well and leave no detectable soil residue after 5–6 months, against about 9 months at a higher rate. In Philippine mango, the advice is to start at no more than 1 g per metre of canopy diameter.", level: "lead", sources: ["jast2019", "protacio2002"] },
  { group: "less", text: "Spray the leaves rather than drench the soil. In mango, a soil drench left the most and longest-lasting residue; a foliar spray left about 3 months of soil residue, and a spray with the ground covered left none detectable. The durian method in this app is already a foliar spray over plastic.", level: "evidence", sources: ["tri2011"] },
  { group: "less", text: "Paint it on the bark. In sweet cherry, PBZ brushed on a 10–20 cm band of bark still controlled growth but left almost no soil activity 22 months later, while a soil drench left the most. Not tried on durian.", level: "lead", sources: ["jacyna2007"] },
  { group: "less", text: "Swap in prohexadione-calcium, which is gone from soil in about a day (half-life 0.7 days). In Mexican 'Tommy Atkins' mango, one 1,500 mg/L leaf spray matched PBZ for flowering and gave the best yield over two years, and in Vietnam SOFRI found it matched a PBZ drench on two mango cultivars. Not yet tested on durian.", level: "evidence", sources: ["perez2025", "aciar_mango2022", "ppdb_pca"] },
  { group: "less", text: "Uniconazole works at a lower dose than PBZ: in Mekong 'Tuong da xanh' mango, 1.0 g a.i. per metre of canopy (or a leaf spray) flowered like PBZ at 1.5 g. It is the same chemical family, though, and its own soil persistence is uncertain.", level: "evidence", sources: ["hau2019mango", "aciar_mango2022", "ppdb"] },
  { group: "less", text: "Do not over-concentrate a foliar spray: on 'Mahachanok' mango, 2,000 mg/L or more on young flushes caused leaf and panicle injury and shorter panicles. Split doses (1,000 then 2,000 mg/L two weeks apart) flowered earliest.", level: "evidence", sources: ["wongsri2022"] },
  // rescue
  { group: "rescue", text: "Gibberellin (GA₃) is the antidote for over-stunting, and timing is everything. In geranium, one 100 mg/L GA₃ spray fully reversed a PBZ overdose when given within a week, but only partly after 2–3 weeks. In poinsettia, a gibberellin spray 10 days after PBZ restored stem growth; at 30 days it barely did.", level: "evidence", sources: ["cox1991", "blanchard2008"] },
  { group: "rescue", text: "In mango, PBZ makes flower panicles compact. One GA₃ spray at 10 mg/L on the panicle axis when it is about 10 cm long, before the flowers open, restored normal panicle length without hurting flowering or fruit set. For durian, a cautious test would be a few branches first: gibberellin also pushes leaf flush, which competes with flowers and fruit.", level: "evidence", sources: ["castroneto2005", "tran2023book"] },
  // lasts
  { group: "lasts", text: "One application can act for years: 2–3 years in peach, and soil half-lives of 30–114 days in lab soils but up to over a year in some field data. Mango soil-applied at 2–10 g a.i. per tree still held 0.14–2.38 µg/g after 300 days.", level: "evidence", sources: ["loreti1989", "li2025est", "wu2022", "singh2024", "kishore2015"] },
  { group: "lasts", text: "Residue from one crop can stunt the next: taro and potato were severely inhibited by carry-over in soil.", level: "evidence", sources: ["jiang2019"] },
  { group: "lasts", text: "In durian orchards, residue sits where it is applied: highest at the canopy edge in the top 20 cm (up to about 1 mg/kg), none detected deeper at half the canopy radius. That top layer is where clean-up efforts should go.", level: "evidence", sources: ["pham2022"] },
];
