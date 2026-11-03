# Offseason Durian

An evidence-based guide and planner for producing durian outside the main season. It runs as a static web app with no build step, no tracking and no backend.

## Features

| Tab | What it does |
|---|---|
| **Guide** | A 6-stage protocol: orchard readiness, post-harvest leaf flushes, choosing a market window, paclobutrazol (PBZ) application, water management, and flowering to harvest. Each point is labelled *trial evidence*, *grower survey* or *common practice* and links to its source. |
| **Planner** | Works backwards from a target harvest date to a PBZ spray window, or forwards from a spray date to an expected harvest. It flags spray dates in months you mark as rainy, and you can edit the stage lengths. |
| **PBZ evidence** | All 8 durian paclobutrazol trial sites (7 studies, from Thailand, Vietnam and Indonesia) side by side, labelled clear benefit, timing effect or little/no effect, plus a safety, residue and sustainability summary. |
| **PBZ mix** | Grams of product per tank for a target ppm, tank volume and label a.i.%. It warns when the rate is outside the recommended 1,000–1,500 ppm. |
| **Checklist** | A pre-induction checklist, saved in the browser. |
| **Sources** | Full citations with key findings and links. |

## Main findings in the evidence

- PBZ at **1,000–1,500 ppm** as a foliar spray, applied once the **second post-harvest leaf flush has fully expanded**, brings flowering forward by **9–45 days** (Chandraparnik et al. 1993; Jantee et al., Acta Hort. 1186; Kozai et al. 2024).
- After PBZ, the tree needs only a **3–7 day dry spell**, compared with 10–14 days untreated (Chandraparnik et al. 1992/1993). **Severe drought (leaf water potential −0.9 MPa) blocks flowering** (Kozai et al. 2024, JIRCAS).
- **Rain right after spraying** makes PBZ unreliable (Kozai et al. 2024).
- **Overdosing is common.** 65% of surveyed Tien Giang growers sprayed above 1,500 ppm, and residue builds up in the soil (Pham et al. 2022).
- **'Monthong' fruit matures 120–127 days after anthesis** (Sangwanangkul 1998).
- **Spray timing should follow price, not just earliness.** On young 'Monthong' trees, a December spray (June harvest) earned more than a November spray (Wiangsamut & Wiangsamut 2022).
- **The PBZ results are not uniform.** In Vietnam, 1,000–1,600 ppm sprays brought the harvest 19–24 days earlier and raised yield by 25–60% (Tri et al. 2011, SOFRI/JIRCAS). A 2-season Thai trial on 'Chanee' found no earlier flowering (Subhadrabandhu & Kaiviparkbunyay 1998), and the JIRCAS 2007 trial was weak after heavy rain.
- **Use a foliar spray, not a soil drench.** Durian is more sensitive to PBZ than mango (Subhadrabandhu & Kaiviparkbunyay 1998).
- **Rest the trees.** Pause PBZ for 1–2 seasons after every 3–4 seasons of use (Tri et al. 2011). PBZ persists in soil, with a half-life from about 2 months to over a year (Kishore et al. 2015; Singh et al. 2024).
- **Check residue limits.** In the EU, durian has no specific PBZ limit, so the 0.01 mg/kg default may apply. ADI is 0.022 mg/kg bw/day (EFSA 2017).
- **Manage Phytophthora** with drainage, mounding, organic matter and phosphonate (ACIAR HORT/2007/067).

The full reference list is in [`src/sources.js`](src/sources.js) and in the app's **Sources** tab.

## Run it

```bash
npm start        # serves at http://localhost:8080 (python3 http.server)
npm test         # unit tests for the planner and mix maths (Node 18+)
```

You can also open the folder with any static file server. ES modules do not load from `file://`.

## Project layout

```
index.html          app shell
src/sources.js      reference list (the single source of truth for citations)
src/guide.js        guide stages, evidence gaps, checklist
src/planner.js      pure date and dose calculations (unit-tested)
src/app.js          UI rendering
src/styles.css      styles (light and dark)
test/               node:test unit tests
```

## Disclaimer

This is an educational summary of published research, not agronomic advice for a specific orchard. Plant-growth-regulator rules and registered products differ by country. Follow the product label and consult your local agricultural extension office.
