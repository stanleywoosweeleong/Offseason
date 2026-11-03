import { SOURCES } from "./sources.js";
import { STAGES, GAPS, CHECKLIST } from "./guide.js";
import { planFromHarvest, planFromSpray, pbzMix, rainRisk, isoDate, PBZ_RECOMMENDED_PPM } from "./planner.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = (d) => d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const LEVEL_LABEL = { evidence: "Trial evidence", survey: "Grower survey", practice: "Common practice" };

const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  },
};

function cites(ids) {
  if (!ids.length) return "";
  return `<span class="cites">${ids
    .map((id) => `<a href="#src-${id}" data-src="${id}" title="${esc(SOURCES[id].cite)}">${esc(SOURCES[id].short)}</a>`)
    .join("")}</span>`;
}

// ---------- Tabs ----------
function showTab(name) {
  document.querySelectorAll("[role=tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === name)));
  document.querySelectorAll("[role=tabpanel]").forEach((p) => (p.hidden = p.id !== `tab-${name}`));
  store.set("tab", name);
}
document.querySelectorAll("[role=tab]").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-src]");
  if (!a) return;
  e.preventDefault();
  showTab("sources");
  const el = document.getElementById(`src-${a.dataset.src}`);
  el?.scrollIntoView({ behavior: "smooth", block: "center" });
  el?.classList.add("flash");
  setTimeout(() => el?.classList.remove("flash"), 1600);
});

// ---------- Guide ----------
$("#stages").innerHTML = STAGES.map(
  (s, i) => `
  <li class="card stage" id="stage-${s.id}">
    <h2><span class="num">${i + 1}</span>${esc(s.title)}</h2>
    <p class="summary">${esc(s.summary)}</p>
    <ul>${s.points
      .map((p) => `<li class="pt ${p.level}"><span class="lvl ${p.level}">${LEVEL_LABEL[p.level]}</span> ${esc(p.text)} ${cites(p.sources)}</li>`)
      .join("")}</ul>
  </li>`
).join("");
$("#gaps").innerHTML = GAPS.map((g) => `<li>${esc(g)}</li>`).join("");

// ---------- Sources ----------
$("#sourceList").innerHTML = Object.entries(SOURCES)
  .map(
    ([id, s]) => `
  <li class="card src" id="src-${id}">
    <span class="type">${esc(s.type)}</span>
    <p class="cite">${esc(s.cite)}</p>
    <p class="finding">${esc(s.finding)}</p>
    <a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>
  </li>`
  )
  .join("");

// ---------- Planner ----------
const rainy = new Set(store.get("rainy", []));
$("#rainMonths").innerHTML = MONTHS.map(
  (m, i) => `<label class="chip"><input type="checkbox" value="${i}" ${rainy.has(i) ? "checked" : ""}/> ${m}</label>`
).join("");

const defaultDate = (() => {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() + 10, 15);
  return isoDate(d);
})();
$("#planDate").value = store.get("planDate", defaultDate);
const savedMode = store.get("mode", "harvest");
document.querySelector(`input[name=mode][value=${savedMode}]`).checked = true;

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
        <div><b>${esc(t.label)}</b><p>${esc(t.detail)}</p>${cites(t.sources)}</div>
      </li>`
    )
    .join("")}</ol>`;
}

function renderPlan() {
  const mode = document.querySelector("input[name=mode]:checked").value;
  $("#dateLabel").textContent = mode === "harvest" ? "Target harvest date" : "Planned PBZ spray date";
  const months = [...document.querySelectorAll("#rainMonths input:checked")].map((c) => Number(c.value));
  store.set("rainy", months);
  store.set("mode", mode);
  store.set("planDate", $("#planDate").value);
  const out = $("#planOut");
  if (!$("#planDate").value) { out.innerHTML = ""; return; }
  try {
    const stages = readStages();
    if (mode === "harvest") {
      const r = planFromHarvest($("#planDate").value, stages);
      const risky = ["earliest", "typical", "latest"].filter((k) => rainRisk(r.spray[k], months));
      out.innerHTML = `
        <div class="card result">
          <h3>Spray PBZ between</h3>
          <p class="big">${fmt(r.spray.earliest)} <span>→</span> ${fmt(r.spray.latest)}</p>
          <p>Most likely date: <b>${fmt(r.spray.typical)}</b>. The window is wide because weather drives flowering. Spray at the start of the window if your area tends to flower late.</p>
          ${risky.length ? `<p class="warn">⚠ Part of this window falls in a month you marked as rainy. Rain after spraying made PBZ unreliable in trials. ${cites(["kozai2024", "chandraparnik1993"])}</p>` : ""}
        </div>
        <div class="card"><h3>Timeline (anchored on the most likely spray date)</h3>${timelineHTML(r.timeline)}</div>`;
    } else {
      const r = planFromSpray($("#planDate").value, stages);
      out.innerHTML = `
        <div class="card result">
          <h3>Expected harvest</h3>
          <p class="big">${fmt(r.harvest.earliest)} <span>→</span> ${fmt(r.harvest.latest)}</p>
          <p>Flowering likely ${fmt(r.anthesis.earliest)} – ${fmt(r.anthesis.latest)}. Most likely harvest: <b>${fmt(r.harvest.typical)}</b>.</p>
          ${rainRisk(r.spray, months) ? `<p class="warn">⚠ This spray date is in a month you marked as rainy. ${cites(["kozai2024", "chandraparnik1993"])}</p>` : ""}
        </div>
        <div class="card"><h3>Timeline</h3>${timelineHTML(r.timeline)}</div>`;
    }
  } catch (err) {
    out.innerHTML = `<div class="card warn">${esc(err.message)}</div>`;
  }
}
document.querySelector("#tab-planner").addEventListener("input", renderPlan);
renderPlan();

// ---------- Mix ----------
function renderMix() {
  const ppm = Number($("#m_ppm").value), litres = Number($("#m_l").value), ai = Number($("#m_ai").value);
  const trees = Math.max(1, Math.round(Number($("#m_trees").value) || 1));
  const out = $("#mixOut");
  try {
    const r = pbzMix({ ppm, litres, aiPercent: ai });
    const msg = {
      ok: `<p class="good">✓ Within the 1,000–1,500 ppm range recommended for mature trees. ${cites(["pham2022", "chandraparnik1993"])}</p>`,
      high: `<p class="warn">⚠ Above ${PBZ_RECOMMENDED_PPM.max.toLocaleString()} ppm. Overdosing is common, adds no proven benefit and builds up residue in the soil. ${cites(["pham2022"])}</p>`,
      low: `<p class="note">Below 1,000 ppm. A study on young 'Monthong' trees used 750 ppm successfully. For mature trees the response may be weaker. ${cites(["wiangsamut2022", "chandraparnik1993"])}</p>`,
    }[r.status];
    out.innerHTML = `
      <div class="card result">
        <h3>Per tank (${litres} L)</h3>
        <p class="big">${r.gramsProduct.toFixed(1)} g <span>of ${ai}% product</span></p>
        <p>= ${r.gramsAI.toFixed(1)} g active ingredient.${trees > 1 ? ` For ${trees} trees at ${litres} L each: <b>${(r.gramsProduct * trees).toFixed(0)} g</b> product in <b>${(litres * trees).toFixed(0)} L</b>.` : ""}</p>
        <p class="hint">Liquid (SC) labels state g/L. Convert to % first, or measure by weight.</p>
        ${msg}
      </div>`;
  } catch (err) {
    out.innerHTML = `<div class="card warn">${esc(err.message)}</div>`;
  }
}
document.querySelector("#tab-mix").addEventListener("input", renderMix);
renderMix();

// ---------- Checklist ----------
function renderChecklist() {
  const done = new Set(store.get("checklist", []));
  $("#checklist").innerHTML = CHECKLIST.map(
    (c) => `<li><label><input type="checkbox" value="${c.id}" ${done.has(c.id) ? "checked" : ""}/> ${esc(c.text)}</label></li>`
  ).join("");
}
$("#checklist").addEventListener("change", () => {
  store.set("checklist", [...document.querySelectorAll("#checklist input:checked")].map((c) => c.value));
});
$("#resetChecklist").addEventListener("click", () => { store.set("checklist", []); renderChecklist(); });
renderChecklist();

showTab(store.get("tab", "guide"));
