# Offseason Durian

One topic: **how to produce durian off-season.** That means inducing flowering out of season, timing it to the market, and carrying that crop through the rains to a good harvest. Every figure links to a published source. The app is a static web app with no build step, no tracking and no backend.

## The off-season cycle (Guide tab, 8 steps)

| Step | When | What the evidence says |
|---|---|---|
| 1. Decide your off-season window | Months ahead | Off-season prices are 2–3 times the peak price (Vietnam). The Mekong Delta can induce year-round. An August–September harvest is the hardest window. Induce in dry, Northeast-monsoon weather (nights 20–22 °C, 50–60% humidity). |
| 2. Prepare the tree | Post-harvest | Drainage and Phytophthora control first. Lime 3–5 kg per tree (not gypsum), compost with Trichoderma, and roots before shoots. Prune, then push 2–3 synchronised leaf flushes. |
| 3. Induce: spray PBZ | Day 0 | Prime first: MKP to harden the flush, high-P NPK, then phosphorous acid. Then 1,000–1,500 ppm foliar, about 20–30 g a.i. per tree. Lay the plastic about a week before, then spray the leaves in dry weather (SOFRI trial practice); lift it at bud break. Overdosing is common, residue builds up, and trees need rest years. |
| 4. Induce: dry the root zone | Day 0 → buds | Thai trials: 3–7 dry days after PBZ. Mekong Delta: mulch plus dry ditches for 20–25 days (Kho Qua Xanh) or 30–35 days (Ri6, Monthong). Severe drought (beyond about −0.8 MPa) blocks flowering. |
| 5. From flower buds to bloom | ≈ 55 days | Buds show 25–30 days after induction. Mulch off, feed and water the same day. KNO₃ to break bud dormancy. Force one leaf flush 7–10 days later. Thin heavy flowering to 3–6 clusters per metre. Cut water to 20–25% of evaporation in the last week before bloom. |
| 6. Hold the off-season crop | First 6 weeks after set | Raise water to 60–70% of evaporation. Hand-pollinate 19:00–22:00 (essential for Musang King). NAA at day 7, GA₃ at 3–6 weeks. Calcium at 7–21 days. Stop new leaf flushes. |
| 7. Harvest | ≈ 90–120 days after fruit set (+20–30 in highlands) | Thin in 2–3 passes 4–6 weeks after set, keeping fruit mid-branch, 1–2 per cluster, with the load matched to leaves and branch size; overloading costs next year's crop. Cut nitrogen as fruit grows. Ca/Mg sprays. KNO₃ 1% a month before harvest. Cut water 15–20 days before. Mulch and drain against rain. Export fruit picked at about 85% maturity; ethephon 0.1–0.2% if needed. |
| 8. Reset for next year | After harvest → step 2 | PBZ persists, and repeated use faded and killed mango trees after 5 years. Rest 1–2 seasons after every 3–4 (SOFRI); mango kept yields with 3 years on, 3 off. Dose by canopy, spray foliar, and feed soil microbes, which break PBZ down (lab studies in Vietnam, India and Brazil). No proven antidote. |

## App layout (mobile first)

The app is built for phones first. A bottom tab bar holds five sections, and it moves to the top on wide screens. The app installs to the home screen and works offline (service worker), so it can be used in the orchard without signal. Tapping a grey source tag opens the reference in a bottom sheet.

- **Guide:** the 8-step cycle above, as collapsible steps with a scrollable step strip and "next step" links.
- **Plan:** pick a cultivar and a target harvest (or spray) date to get the spray window, a timeline, and **Your dated protocol**, the book's day-by-day Table 9.2 converted to calendar dates. It flags rainy months.
- **PBZ:** every durian PBZ trial side by side (Evidence); a farmer's tank calculator (16 L knapsack, 20 L container, 200 L drum or 1000 L tank; liquid or powder product) that gives mL or g per tank, trees per tank and tanks per orchard, with a Scientist view in ppm (Mix); residue and safety notes, including how triazole fungicides compare with PBZ (Safety); and every microbe known to break PBZ down, plus residue lessons from other crops (Clean-up).
- **Checklist:** grouped by step, with a progress bar, saved on the device.
- **Library:** everything else the research found, organised by topic: pollination and fruit set, flowering seasons and weather, fruit quality and ripening, tree health, more on PBZ in soil, residue limits for other chemicals, other flowering chemicals, markets, and sources still to recover. It is searchable, along with the full source list (70 sources). Unverified leads are labelled and never appear in the Guide.

## Languages

Like the Tigerstripe app, the app speaks English, 中文 (Simplified Chinese), Bahasa Malaysia, Tiếng Việt and ភាសាខ្មែរ (Khmer). A language picker opens on the first visit, and the button at the top right changes it later. Translations live in `src/i18n/<lang>.json`, keyed by the exact English text; anything missing falls back to English. Bibliographic citations stay in their original form.

The translations were drafted by AI and should be reviewed by native speakers (for Vietnamese, ideally Prof. Trần Văn Hâu's group) before the app is used for extension work.

To update after changing any text: `node scripts/i18n-strings.mjs > strings.json` lists every English string; add the new ones to each `src/i18n/<lang>.json`. `npm test` fails until every language covers every string with its `{placeholders}` intact.

## Run it

```bash
npm start        # http://localhost:8080
npm test         # planner maths + content checks (every citation resolves, every source is used, leads stay out of the Guide, offline cache complete)
```

## Project layout

```
index.html          app shell (bottom tab bar, bottom sheet)
manifest.webmanifest, sw.js, icons/   install + offline support
src/library.js      Library topics (everything outside the 8 steps, incl. unverified leads)
src/guide.js        the 8-step off-season cycle, Table 9.2 protocol, PBZ trials, gaps, checklist
src/sources.js      reference list
src/planner.js      date and dose calculations (unit-tested)
src/app.js          UI rendering
src/i18n.js         language picker support and translation lookup
src/i18n/*.json     translations (zh, ms, vi, km), keyed by English text
src/labels.js       short shared labels
src/cleanup.js      PBZ Clean-up (microbes, other-crop lessons) and triazole fungicide comparison
scripts/i18n-strings.mjs   lists every string that needs translating
src/styles.css      styles (light and dark)
test/               node:test unit tests
```

## Disclaimer

This is an educational summary of published research, not agronomic advice for a specific orchard. Plant-growth-regulator rules and registered products differ by country. Follow the product label and consult your local agricultural extension office.
