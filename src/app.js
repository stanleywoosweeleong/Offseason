import { SOURCES } from "./sources.js";
import { STAGES, GAPS, CHECKLIST, PBZ_TRIALS, PBZ_SAFETY, PROTOCOL } from "./guide.js";
import { LIBRARY } from "./library.js";
import { MICROBES, NO_FUNGI, CLEANUP_GROUPS, OTHER_CROPS, TRIAZOLES, TRIAZOLE_ADVICE } from "./cleanup.js";
import { planFromHarvest, planFromSpray, pbzMix, rainRisk, isoDate, PBZ_RECOMMENDED_PPM, CULTIVAR_PRESETS, buildProtocol } from "./planner.js";

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = (d) => d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const LEVEL_LABEL = { evidence: "Trial evidence", survey: "Grower survey", expert: "Expert advice", practice: "Common practice", lead: "Unverified lead" };
const TAB_TITLE = { guide: "Off-season guide", planner: "Plan your season", pbz: "Paclobutrazol", checklist: "Checklist", library: "Library & sources" };
const stepNo = Object.fromEntries(STAGES.map((s, i) => [s.id, i + 1]));

const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  },
};

// Citation tags open a bottom sheet with the reference, so readers never lose their place.
function cites(ids) {
  if (!ids || !ids.length) return "";
  return `<span class="cites">${ids
    .map((id) => `<button type="button" class="cite-chip" data-src="${id}">${esc(SOURCES[id].short)}</button>`)
    .join("")}</span>`;
}
const pointHTML = (p) =>
  `<li class="pt ${p.level}"><span class="lvl ${p.level}">${LEVEL_LABEL[p.level]}</span> ${esc(p.text)} ${cites(p.sources)}</li>`;

// ---------- Tabs ----------
function showTab(name, { scroll = true } = {}) {
  $$(".tabbar [role=tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === name)));
  $$("main [role=tabpanel]").forEach((p) => (p.hidden = p.id !== `tab-${name}`));
  $("#sectionTitle").textContent = TAB_TITLE[name];
  store.set("tab", name);
  if (scroll) window.scrollTo({ top: 0 });
}
$$(".tabbar [role=tab]").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));

// ---------- Citation sheet ----------
let lastFocus = null;
function openSheet(id) {
  const s = SOURCES[id];
  if (!s) return;
  lastFocus = document.activeElement;
  $("#sheetType").textContent = s.type;
  $("#sheetTitle").textContent = s.short;
  $("#sheetCite").textContent = s.cite;
  $("#sheetFinding").textContent = s.finding;
  const link = $("#sheetLink");
  if (s.url) { link.href = s.url; link.hidden = false; } else { link.removeAttribute("href"); link.hidden = true; }
  $("#sheet").hidden = false;
  $("#sheetBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
  $("#sheet").scrollTop = 0;
  $("#sheetTitle").focus({ preventScroll: true });
}
function closeSheet() {
  $("#sheet").hidden = true;
  $("#sheetBackdrop").hidden = true;
  document.body.style.overflow = "";
  lastFocus?.focus?.();
}
document.addEventListener("click", (e) => {
  const chip = e.target.closest("[data-src]");
  if (chip) { e.preventDefault(); openSheet(chip.dataset.src); }
});
$("#sheetClose").addEventListener("click", closeSheet);
$("#sheetBackdrop").addEventListener("click", closeSheet);
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#sheet").hidden) closeSheet(); });
// Swipe the sheet down to close it.
(() => {
  let y0 = null;
  const sheet = $("#sheet");
  sheet.addEventListener("touchstart", (e) => { y0 = sheet.scrollTop <= 0 ? e.touches[0].clientY : null; }, { passive: true });
  sheet.addEventListener("touchend", (e) => { if (y0 !== null && e.changedTouches[0].clientY - y0 > 80) closeSheet(); y0 = null; }, { passive: true });
})();

// ---------- Guide ----------
function openStage(id) {
  const el = document.getElementById(`stage-${id}`);
  if (!el) return;
  el.open = true;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
function renderGuide() {
  $("#cycle").innerHTML = STAGES.map(
    (s, i) => `<li><button type="button" data-step="${s.id}"><span class="num">${i + 1}</span><span><b>${esc(s.title)}</b><small>${esc(s.when)}</small></span></button></li>`
  ).join("");
  const opened = new Set(store.get("openStages", [STAGES[0].id]));
  $("#stages").innerHTML = STAGES.map(
    (s, i) => `
  <details class="card stage" id="stage-${s.id}" ${opened.has(s.id) ? "open" : ""}>
    <summary><span class="num">${i + 1}</span><span><span class="st-title">${esc(s.title)}</span><span class="st-when">${esc(s.when)} <span class="st-count">· ${s.points.length} points</span></span></span></summary>
    <div class="stage-body">
      <p class="summary">${esc(s.summary)}</p>
      <ul class="pts">${s.points.map(pointHTML).join("")}</ul>
      ${i < STAGES.length - 1 ? `<div class="next-step"><button type="button" class="ghost small" data-step="${STAGES[i + 1].id}">Next: step ${i + 2} →</button></div>` : `<div class="next-step"><button type="button" class="ghost small" data-step="${STAGES[1].id}">Back to step 2 for next season ↺</button></div>`}
    </div>
  </details>`
  ).join("");
  $$("#stages details").forEach((d) =>
    d.addEventListener("toggle", () => store.set("openStages", $$("#stages details[open]").map((x) => x.id.replace("stage-", ""))))
  );
  $("#gaps").innerHTML = GAPS.map((g) => `<li>${esc(g)}</li>`).join("");
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-step]");
  if (b) openStage(b.dataset.step);
});

// ---------- PBZ ----------
const EFFECT_LABEL = { positive: "Clear benefit", mixed: "Mixed", none: "Little / no effect" };
function renderPBZ() {
  const tally = PBZ_TRIALS.reduce((t, r) => ((t[r.effect] = (t[r.effect] || 0) + 1), t), {});
  $("#pbzTally").innerHTML = Object.keys(EFFECT_LABEL)
    .filter((k) => tally[k])
    .map((k) => `<span class="eff ${k}"><b>${tally[k]}</b> ${EFFECT_LABEL[k]}</span>`)
    .join("");
  $("#pbzTrials").innerHTML = PBZ_TRIALS.map(
    (t) => `
  <article class="card trial ${t.effect}">
    <span class="eff ${t.effect}">${EFFECT_LABEL[t.effect]}</span>
    <dl>
      <dt>Where</dt><dd>${esc(t.place)}</dd>
      <dt>Cultivar</dt><dd>${esc(t.cultivar)} · ${esc(t.age)}</dd>
      <dt>Method</dt><dd>${esc(t.method)} · ${esc(t.rate)}</dd>
      <dt>Timing</dt><dd>${esc(t.timing)}</dd>
    </dl>
    <p>${esc(t.result)}</p>
    ${cites([t.source])}
  </article>`
  ).join("");
  $("#pbzSafety").innerHTML = PBZ_SAFETY.map((p) => `<li>${esc(p.text)} ${cites(p.sources)}</li>`).join("");
}
const TEST_LABEL = { field: "Field trial", pot: "Pot / nursery", soil: "Lab soil", liquid: "Lab culture", unknown: "Not yet read" };
function renderCleanup() {
  const f = document.querySelector("input[name=mfilter]:checked")?.value || "all";
  const show = MICROBES.filter((m) => f === "all" || (f === "farm" ? ["field", "pot"].includes(m.test) : !["field", "pot"].includes(m.test)));
  $("#microbeCount").textContent = `(${show.length})`;
  $("#microbes").innerHTML = show.map(
    (m) => `
  <article class="card trial microbe t-${m.test}">
    <div class="m-tags"><span class="eff ${["field", "pot"].includes(m.test) ? "positive" : "mixed"}">${TEST_LABEL[m.test]}</span>${m.level === "lead" ? ` <span class="lvl lead">${LEVEL_LABEL.lead}</span>` : m.level === "expert" ? ` <span class="lvl expert">Not peer-reviewed</span>` : ""}</div>
    <h3 class="m-name">${esc(m.name)}</h3>
    <dl><dt>Type</dt><dd>${esc(m.group)}</dd><dt>From</dt><dd>${esc(m.from)}</dd></dl>
    <p>${esc(m.result)}</p>
    ${cites(m.sources)}
  </article>`
  ).join("");
}
const TRI_LABEL = { similar: ["Similar to PBZ", "none"], mild: ["Mild PBZ-like effect", "mixed"], weak: ["Weak, short-lived", "positive"], different: ["Stunts by another route", "mixed"] };
function renderTriazoles() {
  $("#triazoles").innerHTML = TRIAZOLES.map((t) => {
    const [lab, cls] = TRI_LABEL[t.effect];
    return `
  <article class="card trial microbe">
    <div class="m-tags"><span class="eff ${cls}">${lab}</span> <span class="lvl ${t.malaysia.startsWith("Sold") ? "evidence" : "practice"}">${esc(t.malaysia)}</span></div>
    <h3 class="m-name" style="font-style:normal">${esc(t.name)}</h3>
    <p><b>Like PBZ?</b> ${esc(t.likePBZ)}</p>
    <p class="hint">${esc(t.evidence)}</p>
    ${cites(t.sources)}
  </article>`;
  }).join("");
  $("#triazoleAdvice").innerHTML = TRIAZOLE_ADVICE.map((a) => `<li>${esc(a)}</li>`).join("");
}
function renderOtherCrops() {
  $("#noFungi").textContent = NO_FUNGI;
  $("#otherCrops").innerHTML = CLEANUP_GROUPS.map(
    (g) => `
  <details class="card lib-topic">
    <summary><span class="st-title">${esc(g.title)}</span><span class="st-count">${esc(g.summary)}</span></summary>
    <ul class="plain">${OTHER_CROPS.filter((p) => p.group === g.id)
      .map((p) => `<li><span class="lvl ${p.level}">${LEVEL_LABEL[p.level]}</span> ${esc(p.text)} ${cites(p.sources)}</li>`)
      .join("")}</ul>
  </details>`
  ).join("");
}
document.querySelectorAll("input[name=mfilter]").forEach((r) => r.addEventListener("change", renderCleanup));

function showSub(name) {
  $$(".subnav button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.sub === name)));
  $$("[data-subpanel]").forEach((p) => (p.hidden = p.dataset.subpanel !== name));
  store.set("pbzSub", name);
}
$$(".subnav button").forEach((b) => b.addEventListener("click", () => showSub(b.dataset.sub)));

// ---------- Planner ----------
const rainy = new Set(store.get("rainy", []));
$("#rainMonths").innerHTML = MONTHS.map(
  (m, i) => `<label class="chip"><input type="checkbox" value="${i}" ${rainy.has(i) ? "checked" : ""}/> ${m}</label>`
).join("");
const defaultDate = (() => { const d = new Date(); d.setUTCMonth(d.getUTCMonth() + 10, 15); return isoDate(d); })();
$("#planDate").value = store.get("planDate", defaultDate);
document.querySelector(`input[name=mode][value=${store.get("mode", "harvest")}]`).checked = true;

function applyCultivar(key) {
  const preset = CULTIVAR_PRESETS[key];
  if (!preset) return;
  const a = preset.anthesisToHarvest;
  $("#a_min").value = a.min; $("#a_typ").value = a.typ; $("#a_max").value = a.max;
}
$("#cultivar").value = store.get("cultivar", "monthong");
if ($("#cultivar").value !== "custom") applyCultivar($("#cultivar").value);
$("#cultivar").addEventListener("change", (e) => { store.set("cultivar", e.target.value); applyCultivar(e.target.value); renderPlan(); });
["#a_min", "#a_typ", "#a_max"].forEach((id) =>
  $(id).addEventListener("input", () => { $("#cultivar").value = "custom"; store.set("cultivar", "custom"); })
);

function readStages() {
  const n = (id) => Number($(id).value);
  return {
    pbzToAnthesis: { min: n("#p_min"), typ: n("#p_typ"), max: n("#p_max") },
    anthesisToHarvest: { min: n("#a_min"), typ: n("#a_typ"), max: n("#a_max") },
  };
}
function timelineHTML(timeline) {
  return `<ol class="timeline">${timeline
    .map(
      (t) => `<li class="tl ${t.id}">
        <div class="when">${t.date ? fmt(t.date) + (t.endDate ? ` – ${fmt(t.endDate)}` : "") : "Before spray"}</div>
        <b>${esc(t.label)}</b><p>${esc(t.detail)}</p>${cites(t.sources)}
      </li>`
    )
    .join("")}</ol>`;
}
function protocolHTML(sprayDate, stages) {
  const rows = buildProtocol(sprayDate, PROTOCOL, stages);
  const when = (r) => (r.start ? fmt(r.start) + (isoDate(r.end) !== isoDate(r.start) ? ` – ${fmt(r.end)}` : "") : "After last harvest");
  return `<details class="card" ${store.get("protoOpen", false) ? "open" : ""} id="protoBlock">
    <summary>Your dated protocol · ${rows.length} tasks</summary>
    <p class="hint">The book's day-by-day off-season protocol (Table 9.2), placed on your calendar. Final-load rows switch between early cultivars (≤ 100 days) and late ones such as 'Monthong'.</p>
    ${cites(["tran2023book"])}
    <ol class="timeline protocol">${rows
      .map((r) => `<li class="tl"><div class="when">${when(r)}</div><span class="step">Step ${stepNo[r.step]}</span> <b>${esc(r.title)}</b><p>${esc(r.actions)}</p></li>`)
      .join("")}</ol></details>`;
}
function renderPlan() {
  const mode = document.querySelector("input[name=mode]:checked").value;
  $("#dateLabel").textContent = mode === "harvest" ? "Target harvest date" : "Planned PBZ spray date";
  const months = $$("#rainMonths input:checked").map((c) => Number(c.value));
  store.set("rainy", months);
  store.set("mode", mode);
  store.set("planDate", $("#planDate").value);
  const out = $("#planOut");
  if (!$("#planDate").value) { out.innerHTML = ""; return; }
  try {
    const stages = readStages();
    const rainWarn = `<p class="warn">⚠ Falls in a month you marked as rainy. Rain after spraying made PBZ unreliable in trials.</p>${cites(["kozai2024", "chandraparnik1993"])}`;
    if (mode === "harvest") {
      const r = planFromHarvest($("#planDate").value, stages);
      const risky = ["earliest", "typical", "latest"].some((k) => rainRisk(r.spray[k], months));
      out.innerHTML = `
        <div class="card result">
          <h3>Spray PBZ between</h3>
          <p class="big">${fmt(r.spray.earliest)} <span>→</span><br />${fmt(r.spray.latest)}</p>
          <p>Most likely: <b>${fmt(r.spray.typical)}</b>. The window is wide because weather drives flowering; spray early in it if your area flowers late.</p>
          ${risky ? rainWarn : ""}
        </div>
        <div class="card"><h3>Timeline</h3>${timelineHTML(r.timeline)}</div>
        ${protocolHTML(r.spray.typical, stages)}`;
    } else {
      const r = planFromSpray($("#planDate").value, stages);
      out.innerHTML = `
        <div class="card result">
          <h3>Expected harvest</h3>
          <p class="big">${fmt(r.harvest.earliest)} <span>→</span><br />${fmt(r.harvest.latest)}</p>
          <p>Flowering likely ${fmt(r.anthesis.earliest)} – ${fmt(r.anthesis.latest)}. Most likely harvest: <b>${fmt(r.harvest.typical)}</b>.</p>
          ${rainRisk(r.spray, months) ? rainWarn : ""}
        </div>
        <div class="card"><h3>Timeline</h3>${timelineHTML(r.timeline)}</div>
        ${protocolHTML(r.spray, stages)}`;
    }
    $("#protoBlock")?.addEventListener("toggle", (e) => store.set("protoOpen", e.target.open));
  } catch (err) {
    out.innerHTML = `<div class="card warn">${esc(err.message)}</div>`;
  }
}
$("#tab-planner .form").addEventListener("input", renderPlan);
$("#tab-planner .form").addEventListener("change", renderPlan);

// ---------- Mix ----------
function renderMix() {
  const ppm = Number($("#m_ppm").value), litres = Number($("#m_l").value), ai = Number($("#m_ai").value);
  const trees = Math.max(1, Math.round(Number($("#m_trees").value) || 1));
  const out = $("#mixOut");
  try {
    const r = pbzMix({ ppm, litres, aiPercent: ai });
    const msg = {
      ok: `<p class="good">✓ Within the 1,000–1,500 ppm range recommended for mature trees.</p>${cites(["pham2022", "chandraparnik1993"])}`,
      high: `<p class="warn">⚠ Above ${PBZ_RECOMMENDED_PPM.max.toLocaleString()} ppm. Overdosing is common, adds no proven benefit and builds up residue in the soil.</p>${cites(["pham2022"])}`,
      low: `<p class="note">Below 1,000 ppm. Young 'Monthong' trees did well on 750 ppm; mature trees may respond less.</p>${cites(["wiangsamut2022", "chandraparnik1993"])}`,
    }[r.status];
    const lowDose = r.gramsAI < 12 ? `<p class="note">Only ${r.gramsAI.toFixed(1)} g a.i. per tree. The book's minimum for an 8–10-year tree is about 12–15 g (10–12 L).</p>` : "";
    out.innerHTML = `
      <div class="card result">
        <h3>Per tree (${litres} L)</h3>
        <p class="big">${r.gramsProduct.toFixed(1)} g <span>of ${ai}% product</span></p>
        <p>= ${r.gramsAI.toFixed(1)} g active ingredient.${trees > 1 ? ` For ${trees} trees: <b>${(r.gramsProduct * trees).toFixed(0)} g</b> product in <b>${(litres * trees).toFixed(0)} L</b>.` : ""}</p>
        ${lowDose}${msg}
        <p class="hint">Liquid (SC) labels state g/L; convert to % first, or measure by weight.</p>
      </div>`;
  } catch (err) {
    out.innerHTML = `<div class="card warn">${esc(err.message)}</div>`;
  }
}
$("#tab-pbz [data-subpanel=mix] .form").addEventListener("input", renderMix);

// ---------- Checklist ----------
function renderChecklist() {
  const done = new Set(store.get("checklist", []));
  const groups = STAGES.map((s) => ({ s, items: CHECKLIST.filter((c) => c.stage === s.id) })).filter((g) => g.items.length);
  $("#checklist").innerHTML = groups
    .map(
      ({ s, items }) => `<div class="card check-group">
        <h3><span class="num">${stepNo[s.id]}</span>${esc(s.title)}</h3>
        <ul>${items
          .map((c) => `<li><label><input type="checkbox" value="${c.id}" ${done.has(c.id) ? "checked" : ""}/> <span>${esc(c.text)}</span></label></li>`)
          .join("")}</ul></div>`
    )
    .join("");
  updateProgress();
}
function updateProgress() {
  const n = CHECKLIST.length, d = $$("#checklist input:checked").length;
  $("#progressText").textContent = `${d} of ${n} done`;
  $("#progressBar").style.width = `${Math.round((d / n) * 100)}%`;
}
$("#checklist").addEventListener("change", () => {
  store.set("checklist", $$("#checklist input:checked").map((c) => c.value));
  updateProgress();
});
$("#resetChecklist").addEventListener("click", () => {
  if (confirm("Clear all ticks?")) { store.set("checklist", []); renderChecklist(); }
});

// ---------- Library & sources (searchable) ----------
const norm = (s) => s.toLowerCase();
function highlight(text, q) {
  const safe = esc(text);
  if (!q) return safe;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return safe.replace(re, "<mark>$1</mark>");
}
function renderLibrary(q = "") {
  const query = norm(q.trim());
  const match = (p) =>
    !query || norm(p.text).includes(query) || p.sources.some((id) => norm(SOURCES[id].short + " " + SOURCES[id].cite).includes(query));
  const topics = LIBRARY.map((t) => ({ t, pts: t.points.filter(match) })).filter((x) => x.pts.length || (!query && x.t));
  $("#library").innerHTML = topics.length
    ? topics
        .map(
          ({ t, pts }) => `<details class="card lib-topic" ${query ? "open" : ""}>
        <summary><span><span class="st-title">${esc(t.title)}</span><span class="st-count">${pts.length} points</span></span></summary>
        <div class="stage-body"><p class="summary">${esc(t.summary)}</p>
        <ul class="pts">${pts
          .map((p) => `<li class="pt ${p.level}"><span class="lvl ${p.level}">${LEVEL_LABEL[p.level]}</span> ${highlight(p.text, query)} ${cites(p.sources)}</li>`)
          .join("")}</ul></div></details>`
        )
        .join("")
    : `<p class="empty">No library points match “${esc(q)}”.</p>`;
  const srcs = Object.entries(SOURCES).filter(([, s]) => !query || norm(`${s.short} ${s.cite} ${s.finding} ${s.type}`).includes(query));
  $("#sourceCount").textContent = query ? `${srcs.length} of ${Object.keys(SOURCES).length} match` : Object.keys(SOURCES).length;
  $("#sourceList").innerHTML = srcs
    .map(
      ([id, s]) => `<li class="src" id="src-${id}">
      <span class="type">${esc(s.type)}</span>
      <p class="cite">${highlight(s.cite, query)}</p>
      <p class="finding">${highlight(s.finding, query)}</p>
      ${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>` : `<span class="hint">Print edition, no online copy</span>`}
    </li>`
    )
    .join("");
  if (query && srcs.length) $("#sourcesBlock").open = true;
}
let searchTimer;
$("#libSearch").addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => renderLibrary(e.target.value), 150);
});

// ---------- Init ----------
renderGuide();
renderPBZ();
renderCleanup();
renderOtherCrops();
renderTriazoles();
renderPlan();
renderMix();
renderChecklist();
renderLibrary();
showSub(store.get("pbzSub", "evidence"));
showTab(store.get("tab", "guide"), { scroll: false });

// Offline support: cache the app so it works in the orchard without signal.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
