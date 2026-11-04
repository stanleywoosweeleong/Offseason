# Offseason Durian

One topic: **how to produce durian off-season.** That means inducing flowering out of season, timing it to the market, and carrying that crop through the rains to a good harvest. Every figure links to a published source. The app is a static web app with no build step, no tracking and no backend.

## The off-season cycle (Guide tab)

| Step | When | What the evidence says |
|---|---|---|
| 1. Decide your off-season window | Months ahead | Off-season prices are 2–3 times the peak price (Vietnam). The Mekong Delta can induce year-round. An August–September harvest is the hardest window. Induce in dry, Northeast-monsoon weather (nights 20–22 °C, 50–60% humidity). |
| 2. Prepare the tree | Post-harvest | Drainage and Phytophthora control first. Prune, then push two leaf flushes; spray when the second flush turns dark green. |
| 3. Induce: spray PBZ | Day 0 | 1,000–1,500 ppm foliar, about 20–30 g a.i. per tree. Spray before mulching, in dry weather. Overdosing is common, residue builds up, and trees need rest years. |
| 4. Induce: dry the root zone | Day 0 → buds | Thai trials: 3–7 dry days after PBZ. Mekong Delta: mulch plus dry ditches for 20–25 days (Kho Qua Xanh) or 30–35 days (Ri6, Monthong). Severe drought (beyond about −0.8 MPa) blocks flowering. |
| 5. From flower buds to bloom | ≈ 50–57 days | Re-water once buds show, feed one leaf flush about 10 days after buds, and protect buds from rain-induced dormancy. |
| 6. Hold the off-season crop | First 6 weeks after set | Don't cut water after fruit set. Calcium at 7–21 days. Stop new leaf flushes (KNO₃ 1.5% or MKP 0.5–1%). |
| 7. Harvest | ≈ 90–150 days after bloom | Timing by cultivar. Cut nitrogen as fruit grows (NPK 2:1:1 → 2:1:3 → 1:1:3 at 0.75 kg). Ca(NO₃)₂ 0.4% + MgSO₄ 0.2%. Drain ditches and mulch before an off-season harvest. |

## Other tabs

- **Planner:** pick a cultivar and work backwards from a target harvest date to a PBZ spray window, or forwards from a spray date. The timeline follows the same 7 steps. Presets cover Monthong, Ri6, Musang King, Kho Qua Xanh, Sua Hat Lep and Central Highlands Monthong.
- **PBZ evidence:** every durian PBZ trial side by side, plus residue and safety notes.
- **PBZ mix:** grams of product per tank for a target ppm.
- **Checklist:** in cycle order, saved on the device.
- **Sources:** peer-reviewed papers, Thai DOA, JIRCAS, SOFRI, Can Tho University, ACIAR and EFSA, plus *Flower Induction in Durian* (Tran & Tran 2026).

## Run it

```bash
npm start        # http://localhost:8080
npm test         # planner maths + content checks (every citation resolves, every source is used)
```

## Project layout

```
index.html          app shell
src/guide.js        the 7-step off-season cycle, PBZ trials, gaps, checklist
src/sources.js      reference list
src/planner.js      date and dose calculations (unit-tested)
src/app.js          UI rendering
src/styles.css      styles (light and dark)
test/               node:test unit tests
```

## Disclaimer

This is an educational summary of published research, not agronomic advice for a specific orchard. Plant-growth-regulator rules and registered products differ by country. Follow the product label and consult your local agricultural extension office.
