// Typical rainfall by durian-growing region, for the planner's rainy-month presets.
// mm: average rainfall per month (Jan–Dec), 1991–2020, at a representative durian district, from the
// NASA POWER climatology (MERRA-2 corrected precipitation). Model data at about 50 km resolution: good for
// the timing of the rainy season, less reliable for exact amounts, so months are marked relative to each
// site's own average. Fetched November 2026; see scripts in the project history.

export const RAIN_SOURCES = ["nasapower"];

export const REGIONS = [
  { id: "my-penang", country: "Malaysia", region: "Penang", place: "Balik Pulau", lat: 5.35, lon: 100.23, mm: [79, 71, 135, 188, 228, 173, 193, 225, 261, 298, 253, 159] },
  { id: "my-perak", country: "Malaysia", region: "Perak", place: "Sungai Siput", lat: 4.82, lon: 101.07, mm: [162, 94, 143, 155, 167, 128, 140, 175, 197, 265, 378, 334] },
  { id: "my-pahang", country: "Malaysia", region: "Pahang (Raub, Bentong)", place: "Raub", lat: 3.79, lon: 101.86, mm: [214, 140, 183, 205, 179, 127, 138, 171, 190, 260, 309, 301] },
  { id: "my-johor", country: "Malaysia", region: "Johor", place: "Muar", lat: 2.05, lon: 102.57, mm: [142, 100, 159, 193, 178, 163, 187, 205, 173, 209, 261, 219] },
  { id: "my-eastcoast", country: "Malaysia", region: "Kelantan / Terengganu (east coast)", place: "Tanah Merah", lat: 5.81, lon: 102.15, mm: [141, 63, 105, 110, 146, 150, 146, 184, 188, 259, 486, 429] },
  { id: "my-sabah-w", country: "Malaysia", region: "Sabah (west coast)", place: "Penampang", lat: 5.92, lon: 116.11, mm: [168, 98, 105, 142, 204, 257, 261, 263, 273, 370, 286, 280] },
  { id: "my-sabah-e", country: "Malaysia", region: "Sabah (east, Tawau)", place: "Tawau", lat: 4.25, lon: 117.89, mm: [200, 145, 168, 153, 180, 197, 208, 221, 161, 207, 202, 255] },
  { id: "my-sarawak", country: "Malaysia", region: "Sarawak", place: "Kuching", lat: 1.55, lon: 110.35, mm: [517, 376, 301, 278, 246, 232, 200, 231, 230, 316, 338, 448] },
  { id: "th-east", country: "Thailand", region: "East (Chanthaburi, Rayong)", place: "Chanthaburi", lat: 12.61, lon: 102.1, mm: [33, 36, 77, 113, 286, 395, 431, 399, 460, 267, 67, 20] },
  { id: "th-chumphon", country: "Thailand", region: "South, east coast (Chumphon)", place: "Chumphon", lat: 10.49, lon: 99.18, mm: [78, 36, 88, 98, 216, 240, 271, 264, 259, 262, 219, 121] },
  { id: "th-yala", country: "Thailand", region: "Deep south (Yala)", place: "Yala", lat: 6.54, lon: 101.28, mm: [102, 45, 88, 100, 151, 139, 140, 166, 177, 234, 376, 317] },
  { id: "vn-mekong", country: "Vietnam", region: "Mekong Delta (Tien Giang)", place: "Cai Lay", lat: 10.41, lon: 106.11, mm: [13, 8, 17, 49, 160, 238, 219, 200, 211, 230, 107, 37] },
  { id: "vn-southeast", country: "Vietnam", region: "Southeast (Dong Nai)", place: "Long Khanh", lat: 10.93, lon: 107.24, mm: [9, 4, 9, 43, 162, 196, 217, 200, 199, 202, 92, 33] },
  { id: "vn-highlands", country: "Vietnam", region: "Central Highlands (Dak Lak)", place: "Krong Pac", lat: 12.71, lon: 108.3, mm: [16, 5, 12, 32, 110, 124, 120, 148, 166, 175, 134, 60] },
  { id: "kh-kampot", country: "Cambodia", region: "Kampot", place: "Kampot", lat: 10.61, lon: 104.18, mm: [29, 18, 50, 117, 206, 329, 346, 332, 352, 247, 118, 46] },
  { id: "ph-davao", country: "Philippines", region: "Davao (Mindanao)", place: "Davao City", lat: 7.07, lon: 125.61, mm: [184, 120, 112, 111, 162, 196, 186, 178, 173, 213, 143, 148] },
];

/** A month counts as a heavy-rain month if it is at least 15% wetter than the site's monthly average (and over 120 mm). */
export function wetMonths(region, factor = 1.15) {
  const mean = region.mm.reduce((a, b) => a + b, 0) / 12;
  return region.mm.map((v, i) => (v >= mean * factor && v >= 120 ? i : -1)).filter((i) => i >= 0);
}

/**
 * Group months (0–11) into runs, joining December to January so a season like Nov–Jan stays one run.
 * Returns [[start, end], ...]; a run with start > end crosses into the next year.
 */
export function monthRuns(months) {
  const set = new Set(months);
  if (!set.size) return [];
  if (set.size === 12) return [[0, 11]];
  const runs = [];
  let start = [...Array(12).keys()].find((m) => set.has(m) && !set.has((m + 11) % 12));
  for (let k = 0, m = start; k < 12; k++, m = (m + 1) % 12) {
    if (set.has(m) && !set.has((m + 11) % 12)) start = m;
    if (set.has(m) && !set.has((m + 1) % 12)) runs.push([start, m]);
  }
  return runs.sort((a, b) => a[0] - b[0]);
}
