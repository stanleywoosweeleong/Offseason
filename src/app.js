import { SOURCES } from "./sources.js";
import { STAGES, GAPS, CHECKLIST, PBZ_TRIALS, PBZ_SAFETY, PROTOCOL } from "./guide.js";
import { planFromHarvest, planFromSpray, pbzMix, rainRisk, isoDate, PBZ_RECOMMENDED_PPM, CULTIVAR_PRESETS, buildProtocol } from "./planner.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = (d) => d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const LEVEL_LABEL = { evidence: "Trial evidence", survey: "Grower survey", expert: "Expert advice", practice: "Common practice" };

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
// One topic: the off-season cycle, in order. The strip at the top summarises the steps and links to each.
function renderGuide() {
  $("#cycle").innerHTML = STAGES.map(
    (s, i) => `<li><a href="#stage-${s.id}"><span class="num">${i + 1}</span><span><b>${esc(s.title)}</b><small>${esc(s.when)}</small></span></a></li>`
  ).join("");
  $("#stages").innerHTML = STAGES.map(
    (s, i) => `
  <li class="card stage" id="stage-${s.id}">
    <h2><span class="num">${i + 1}</span>${esc(s.title)}</h2>
    <p class="when">${esc(s.when)}</p>
    <p class="summary">${esc(s.summary)}</p>
    <ul>${s.points
      .map((p) => `<li class="pt ${p.level}"><span class="lvl ${p.level}">${LEVEL_LABEL[p.level]}</span> ${esc(p.text)} ${cites(p.sources)}</li>`)
      .join("")}</ul>
  </li>`
  ).join("");
}
$("#gaps").innerHTML = GAPS.map((g) => `<li>${esc(g)}</li>`).join("");

// ---------- PBZ evidence ----------
const EFFECT_LABEL = { positive: "Clear benefit", mixed: "Mixed", none: "Little / no effect" };
const tally = PBZ_TRIALS.reduce((t, r) => ((t[r.effect] = (t[r.effect] || 0) + 1), t), {});
$("#pbzTally").innerHTML = Object.keys(EFFECT_LABEL)
  .filter((k) => tally[k])
  .map((k) => `<span class="eff ${k}"><b>${tally[k]}</b> ${EFFECT_LABEL[k]}</span>`)
  .join("");
$("#pbzTrials").innerHTML = PBZ_TRIALS.map(
  (t) => `
  <article class="card trial ${t.effect}">
    <header><span class="eff ${t.effect}">${EFFECT_LABEL[t.effect]}</span> ${cites([t.source])}</header>
    <dl>
      <dt>Where</dt><dd>${esc(t.place)}</dd>
      <dt>Cultivar</dt><dd>${esc(t.cultivar)} · ${esc(t.age)}</dd>
      <dt>Method</dt><dd>${esc(t.method)} · ${esc(t.rate)}</dd>
      <dt>Timing</dt><dd>${esc(t.timing)}</dd>
    </dl>
    <p>${esc(t.result)}</p>
  </article>`
).join("");
$("#pbzSafety").innerHTML = PBZ_SAFETY.map((p) => `<li>${esc(p.text)} ${cites(p.sources)}</li>`).join("");

// ---------- Sources ----------
$("#sourceList").innerHTML = Object.entries(SOURCES)
  .map(
    ([id, s]) => `
  <li class="card src" id="src-${id}">
    <span class="type">${esc(s.type)}</span>
    <p class="cite">${esc(s.cite)}</p>
    <p class="finding">${esc(s.finding)}</p>
    ${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>` : `<span class="hint">Print edition, no online copy</span>`}
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

function protocolHTML(sprayDate, stages) {
  const stepNo = Object.fromEntries(STAGES.map((st, i) => [st.id, i + 1]));
  const rows = buildProtocol(sprayDate, PROTOCOL, stages);
  const when = (r) => (r.start ? fmt(r.start) + (isoDate(r.end) !== isoDate(r.start) ? ` – ${fmt(r.end)}` : "") : "After last harvest");
  return `<div class="card"><h3>Your dated protocol</h3>
    <p class="hint">The book's day-by-day off-season protocol for 'Monthong' and 'Ri6' (Table 9.2), placed on your calendar. Rows for the final fruit load switch automatically between early cultivars (≤ 100 days) and late cultivars such as 'Monthong'. ${cites(["tran2023book"])}</p>
    <ol class="timeline protocol">${rows
      .map((r) => `<li class="tl"><div class="when">${when(r)}</div><div><span class="step">Step ${stepNo[r.step]}</span> <b>${esc(r.title)}</b><p>${esc(r.actions)}</p></div></li>`)
      .join("")}</ol></div>`;
}

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
        <div class="card"><h3>Timeline (anchored on the most likely spray date)</h3>${timelineHTML(r.timeline)}</div>
        ${protocolHTML(r.spray.typical, stages)}`;
    } else {
      const r = planFromSpray($("#planDate").value, stages);
      out.innerHTML = `
        <div class="card result">
          <h3>Expected harvest</h3>
          <p class="big">${fmt(r.harvest.earliest)} <span>→</span> ${fmt(r.harvest.latest)}</p>
          <p>Flowering likely ${fmt(r.anthesis.earliest)} – ${fmt(r.anthesis.latest)}. Most likely harvest: <b>${fmt(r.harvest.typical)}</b>.</p>
          ${rainRisk(r.spray, months) ? `<p class="warn">⚠ This spray date is in a month you marked as rainy. ${cites(["kozai2024", "chandraparnik1993"])}</p>` : ""}
        </div>
        <div class="card"><h3>Timeline</h3>${timelineHTML(r.timeline)}</div>
        ${protocolHTML(r.spray, stages)}`;
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
  const stepNo = Object.fromEntries(STAGES.map((s, i) => [s.id, i + 1]));
  $("#checklist").innerHTML = CHECKLIST.map(
    (c) => `<li><label><input type="checkbox" value="${c.id}" ${done.has(c.id) ? "checked" : ""}/> <span><span class="step">Step ${stepNo[c.stage]}</span> ${esc(c.text)}</span></label></li>`
  ).join("");
}
$("#checklist").addEventListener("change", () => {
  store.set("checklist", [...document.querySelectorAll("#checklist input:checked")].map((c) => c.value));
});
$("#resetChecklist").addEventListener("click", () => { store.set("checklist", []); renderChecklist(); });
renderChecklist();

renderGuide();
showTab(store.get("tab", "guide"));
