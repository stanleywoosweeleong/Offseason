import { SOURCES } from "./sources.js";
import { STAGES, GAPS, CHECKLIST, PBZ_TRIALS, PBZ_SAFETY, PROTOCOL } from "./guide.js";
import { LIBRARY } from "./library.js";
import { MICROBES, NO_FUNGI, CLEANUP_GROUPS, OTHER_CROPS, TRIAZOLES, TRIAZOLE_ADVICE } from "./cleanup.js";
import { LEVEL, EFFECT_LABEL, TEST_LABEL, TRI_LABEL } from "./labels.js";
import { LANGS, LANG_MENU, LOCALE, loadLang, lang, tr, trf, applyStatic } from "./i18n.js";
import { planFromHarvest, planFromSpray, pbzMix, tankMix, rainRisk, isoDate, PBZ_RECOMMENDED_PPM, CULTIVAR_PRESETS, buildProtocol } from "./planner.js";

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const loc = () => LOCALE[lang];
const monthName = (i) => new Date(Date.UTC(2026, i, 1)).toLocaleDateString(loc(), { month: "short", timeZone: "UTC" });
const fmt = (d) => d.toLocaleDateString(loc(), { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const lvl = (k) => tr(LEVEL[k]);
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
    .map((id) => `<button type="button" class="cite-chip" data-src="${id}">${esc(tr(SOURCES[id].short))}</button>`)
    .join("")}</span>`;
}
const pointHTML = (p) =>
  `<li class="pt ${p.level}"><span class="lvl ${p.level}">${lvl(p.level)}</span> ${esc(tr(p.text))} ${cites(p.sources)}</li>`;

// ---------- Tabs ----------
let currentTab = "guide";
function showTab(name, { scroll = true } = {}) {
  $$(".tabbar [role=tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === name)));
  $$("main [role=tabpanel]").forEach((p) => (p.hidden = p.id !== `tab-${name}`));
  currentTab = name;
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
  $("#sheetType").textContent = tr(s.type);
  $("#sheetTitle").textContent = tr(s.short);
  $("#sheetCite").textContent = s.cite;
  $("#sheetFinding").textContent = tr(s.finding);
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
    (s, i) => `<li><button type="button" data-step="${s.id}"><span class="num">${i + 1}</span><span><b>${esc(tr(s.title))}</b><small>${esc(tr(s.when))}</small></span></button></li>`
  ).join("");
  const opened = new Set(store.get("openStages", [STAGES[0].id]));
  $("#stages").innerHTML = STAGES.map(
    (s, i) => `
  <details class="card stage" id="stage-${s.id}" ${opened.has(s.id) ? "open" : ""}>
    <summary><span class="num">${i + 1}</span><span><span class="st-title">${esc(tr(s.title))}</span><span class="st-when">${esc(tr(s.when))} <span class="st-count">· ${trf("{n} points", { n: s.points.length })}</span></span></span></summary>
    <div class="stage-body">
      <p class="summary">${esc(tr(s.summary))}</p>
      <ul class="pts">${s.points.map(pointHTML).join("")}</ul>
      ${i < STAGES.length - 1 ? `<div class="next-step"><button type="button" class="ghost small" data-step="${STAGES[i + 1].id}">${trf("Next: step {n} →", { n: i + 2 })}</button></div>` : `<div class="next-step"><button type="button" class="ghost small" data-step="${STAGES[1].id}">${tr("Back to step 2 for next season ↺")}</button></div>`}
    </div>
  </details>`
  ).join("");
  $$("#stages details").forEach((d) =>
    d.addEventListener("toggle", () => store.set("openStages", $$("#stages details[open]").map((x) => x.id.replace("stage-", ""))))
  );
  $("#gaps").innerHTML = GAPS.map((g) => `<li>${esc(tr(g))}</li>`).join("");
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-step]");
  if (b) openStage(b.dataset.step);
});

// ---------- PBZ ----------
function renderPBZ() {
  const tally = PBZ_TRIALS.reduce((t, r) => ((t[r.effect] = (t[r.effect] || 0) + 1), t), {});
  $("#pbzTally").innerHTML = Object.keys(EFFECT_LABEL)
    .filter((k) => tally[k])
    .map((k) => `<span class="eff ${k}"><b>${tally[k]}</b> ${tr(EFFECT_LABEL[k])}</span>`)
    .join("");
  $("#pbzTrials").innerHTML = PBZ_TRIALS.map(
    (t) => `
  <article class="card trial ${t.effect}">
    <span class="eff ${t.effect}">${tr(EFFECT_LABEL[t.effect])}</span>
    <dl>
      <dt>${tr("Where")}</dt><dd>${esc(tr(t.place))}</dd>
      <dt>${tr("Cultivar")}</dt><dd>${esc(tr(t.cultivar))} · ${esc(tr(t.age))}</dd>
      <dt>${tr("Method")}</dt><dd>${esc(tr(t.method))} · ${esc(tr(t.rate))}</dd>
      <dt>${tr("Timing")}</dt><dd>${esc(tr(t.timing))}</dd>
    </dl>
    <p>${esc(tr(t.result))}</p>
    ${cites([t.source])}
  </article>`
  ).join("");
  $("#pbzSafety").innerHTML = PBZ_SAFETY.map((p) => `<li>${esc(tr(p.text))} ${cites(p.sources)}</li>`).join("");
}
function renderCleanup() {
  const f = document.querySelector("input[name=mfilter]:checked")?.value || "all";
  const show = MICROBES.filter((m) => f === "all" || (f === "farm" ? ["field", "pot"].includes(m.test) : !["field", "pot"].includes(m.test)));
  $("#microbeCount").textContent = `(${show.length})`;
  $("#microbes").innerHTML = show.map(
    (m) => `
  <article class="card trial microbe t-${m.test}">
    <div class="m-tags"><span class="eff ${["field", "pot"].includes(m.test) ? "positive" : "mixed"}">${tr(TEST_LABEL[m.test])}</span>${m.level === "lead" ? ` <span class="lvl lead">${lvl("lead")}</span>` : m.level === "expert" ? ` <span class="lvl expert">${tr("Not peer-reviewed")}</span>` : ""}</div>
    <h3 class="m-name">${esc(tr(m.name))}</h3>
    <dl><dt>${tr("Type")}</dt><dd>${esc(tr(m.group))}</dd><dt>${tr("From")}</dt><dd>${esc(tr(m.from))}</dd></dl>
    <p>${esc(tr(m.result))}</p>
    ${cites(m.sources)}
  </article>`
  ).join("");
}
function renderTriazoles() {
  $("#triazoles").innerHTML = TRIAZOLES.map((t) => {
    const [lab, cls] = TRI_LABEL[t.effect];
    return `
  <article class="card trial microbe">
    <div class="m-tags"><span class="eff ${cls}">${tr(lab)}</span> <span class="lvl ${t.malaysia.startsWith("Sold") ? "evidence" : "practice"}">${esc(tr(t.malaysia))}</span></div>
    <h3 class="m-name" style="font-style:normal">${esc(t.name)}</h3>
    <p><b>${tr("Like PBZ?")}</b> ${esc(tr(t.likePBZ))}</p>
    <p class="hint">${esc(tr(t.evidence))}</p>
    ${cites(t.sources)}
  </article>`;
  }).join("");
  $("#triazoleAdvice").innerHTML = TRIAZOLE_ADVICE.map((a) => `<li>${esc(tr(a))}</li>`).join("");
}
function renderOtherCrops() {
  $("#noFungi").textContent = tr(NO_FUNGI);
  $("#otherCrops").innerHTML = CLEANUP_GROUPS.map(
    (g) => `
  <details class="card lib-topic">
    <summary><span class="st-title">${esc(tr(g.title))}</span><span class="st-count">${esc(tr(g.summary))}</span></summary>
    <ul class="plain">${OTHER_CROPS.filter((p) => p.group === g.id)
      .map((p) => `<li><span class="lvl ${p.level}">${lvl(p.level)}</span> ${esc(tr(p.text))} ${cites(p.sources)}</li>`)
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
function renderRainMonths() {
  const rainy = new Set(store.get("rainy", []));
  $("#rainMonths").innerHTML = Array.from({ length: 12 }, (_, i) =>
    `<label class="chip"><input type="checkbox" value="${i}" ${rainy.has(i) ? "checked" : ""}/> ${esc(monthName(i))}</label>`
  ).join("");
}
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
        <div class="when">${t.date ? fmt(t.date) + (t.endDate ? ` – ${fmt(t.endDate)}` : "") : tr("Before spray")}</div>
        <b>${esc(tr(t.label))}</b><p>${esc(trf(t.detail, t.vars || {}))}</p>${cites(t.sources)}
      </li>`
    )
    .join("")}</ol>`;
}
function protocolHTML(sprayDate, stages) {
  const rows = buildProtocol(sprayDate, PROTOCOL, stages);
  const when = (r) => (r.start ? fmt(r.start) + (isoDate(r.end) !== isoDate(r.start) ? ` – ${fmt(r.end)}` : "") : tr("After last harvest"));
  return `<details class="card" ${store.get("protoOpen", false) ? "open" : ""} id="protoBlock">
    <summary>${trf("Your dated protocol · {n} tasks", { n: rows.length })}</summary>
    <p class="hint">${tr("The book's day-by-day off-season protocol (Table 9.2), placed on your calendar. Final-load rows switch between early cultivars (≤ 100 days) and late ones such as 'Monthong'.")}</p>
    ${cites(["tran2023book"])}
    <ol class="timeline protocol">${rows
      .map((r) => `<li class="tl"><div class="when">${when(r)}</div><span class="step">${trf("Step {n}", { n: stepNo[r.step] })}</span> <b>${esc(tr(r.title))}</b><p>${esc(tr(r.actions))}</p></li>`)
      .join("")}</ol></details>`;
}
function renderPlan() {
  const mode = document.querySelector("input[name=mode]:checked").value;
  $("#dateLabel").textContent = mode === "harvest" ? tr("Target harvest date") : tr("Planned PBZ spray date");
  const months = $$("#rainMonths input:checked").map((c) => Number(c.value));
  store.set("rainy", months);
  store.set("mode", mode);
  store.set("planDate", $("#planDate").value);
  const out = $("#planOut");
  if (!$("#planDate").value) { out.innerHTML = ""; return; }
  try {
    const stages = readStages();
    const rainWarn = `<p class="warn">${tr("⚠ Falls in a month you marked as rainy. Rain after spraying made PBZ unreliable in trials.")}</p>${cites(["kozai2024", "chandraparnik1993"])}`;
    if (mode === "harvest") {
      const r = planFromHarvest($("#planDate").value, stages);
      const risky = ["earliest", "typical", "latest"].some((k) => rainRisk(r.spray[k], months));
      out.innerHTML = `
        <div class="card result">
          <h3>${tr("Spray PBZ between")}</h3>
          <p class="big">${fmt(r.spray.earliest)} <span>→</span><br />${fmt(r.spray.latest)}</p>
          <p>${trf("Most likely: {date}. The window is wide because weather drives flowering; spray early in it if your area flowers late.", { date: `<b>${fmt(r.spray.typical)}</b>` })}</p>
          ${risky ? rainWarn : ""}
        </div>
        <div class="card"><h3>${tr("Timeline")}</h3>${timelineHTML(r.timeline)}</div>
        ${protocolHTML(r.spray.typical, stages)}`;
    } else {
      const r = planFromSpray($("#planDate").value, stages);
      out.innerHTML = `
        <div class="card result">
          <h3>${tr("Expected harvest")}</h3>
          <p class="big">${fmt(r.harvest.earliest)} <span>→</span><br />${fmt(r.harvest.latest)}</p>
          <p>${trf("Flowering likely {from} – {to}. Most likely harvest: {date}.", { from: fmt(r.anthesis.earliest), to: fmt(r.anthesis.latest), date: `<b>${fmt(r.harvest.typical)}</b>` })}</p>
          ${rainRisk(r.spray, months) ? rainWarn : ""}
        </div>
        <div class="card"><h3>${tr("Timeline")}</h3>${timelineHTML(r.timeline)}</div>
        ${protocolHTML(r.spray, stages)}`;
    }
    $("#protoBlock")?.addEventListener("toggle", (e) => store.set("protoOpen", e.target.open));
  } catch (err) {
    out.innerHTML = `<div class="card warn">${esc(tr(err.message))}</div>`;
  }
}
$("#tab-planner .form").addEventListener("input", renderPlan);
$("#tab-planner .form").addEventListener("change", renderPlan);

// ---------- Mix ----------
const radio = (name) => document.querySelector(`input[name=${name}]:checked`)?.value;
const num = (n, d = 0) => Number(n.toFixed(d)).toLocaleString(loc(), { maximumFractionDigits: d });
function renderMix() {
  const tankSel = radio("tank"), aiSel = radio("ai"), form = radio("form");
  $("#tankOtherWrap").hidden = tankSel !== "other";
  $("#aiOtherWrap").hidden = aiSel !== "other";
  const tank = tankSel === "other" ? Number($("#m_tank").value) : Number(tankSel);
  const ai = aiSel === "other" ? Number($("#m_ai").value) : Number(aiSel);
  const ppm = Number($("#m_ppm").value), litres = Number($("#m_l").value);
  const trees = Math.max(1, Math.round(Number($("#m_trees").value) || 1));
  const unit = form === "sc" ? "mL" : "g";
  const what = form === "sc" ? trf("{p}% liquid (SC)", { p: num(ai, 1) }) : trf("{p}% powder (WP)", { p: num(ai, 1) });
  const big = (x) => (x >= 1000 && unit === "g" ? `${num(x / 1000, 2)} kg` : x >= 1000 ? `${num(x / 1000, 2)} L` : `${num(x, x < 20 ? 1 : 0)} ${unit}`);
  const out = $("#mixOut");
  try {
    const r = tankMix({ ppm, tankLitres: tank, aiPercent: ai, litresPerTree: litres, trees });
    const msg = {
      ok: `<p class="good">${tr("✓ Within the rate recommended for mature trees (1,000–1,500 ppm).")}</p>${cites(["pham2022", "chandraparnik1993"])}`,
      high: `<p class="warn">${tr("⚠ Stronger than recommended. Overdosing is common, adds no proven benefit and builds up residue in the soil.")}</p>${cites(["pham2022"])}`,
      low: `<p class="note">${tr("Lighter than the mature-tree rate. Young 'Monthong' trees did well on this; mature trees may respond less.")}</p>${cites(["wiangsamut2022", "chandraparnik1993"])}`,
    }[r.status];
    const perTree = (r.aiPerTank / tank) * litres;
    const overdose = [];
    if (r.status === "high") overdose.push(tr("Too strong. This mix is above 1,500 ppm, the highest rate recommended for durian. Overdosed durian trees can stop growing new leaves, decline slowly, or fail to flower well next season, and the extra PBZ stays in the soil. Go back to \"Mature trees\" unless an adviser has told you otherwise."));
    if (perTree > 32) overdose.push(trf("Too much per tree. Each tree would get {g} g of active ingredient, more than any durian trial used (at most 32 g, on big trees sprayed with 20 L). Spray less per tree: wet the leaves, do not soak them.", { g: num(perTree, 1) }));
    const danger = overdose.length ? `<div class="danger" role="alert"><b>${tr("⚠ Risk of overdosing")}</b>${overdose.map((x) => `<p>${esc(x)}</p>`).join("")}${cites(["grewal2023", "subhadrabandhu1998", "tri2011"])}</div>` : "";
    const lowDose = perTree < 12 && r.status !== "low" ? `<p class="note">${trf("Each tree gets only {g} g of active ingredient. For an 8–10-year tree the book's minimum is about 12–15 g, so spray 10–12 L per tree.", { g: num(perTree, 1) })}</p>` : "";
    const treesPerTank = r.treesPerTank >= 1
      ? trf("One tank sprays about {n} trees at {l} L each.", { n: `<b>${num(r.treesPerTank, 1)}</b>`, l: num(litres, 1) })
      : trf("Each tree needs about {n} tanks ({l} L).", { n: `<b>${num(1 / r.treesPerTank, 1)}</b>`, l: num(litres, 1) });
    const orchard = trees > 1 || r.tanks > 1
      ? `<h3>${trees > 1 ? trf("For {n} trees", { n: num(trees) }) : tr("For 1 tree")}</h3>
         <p>${trf(r.tanks > 1 ? "You need {l} L of spray: mix {n} tanks of {t} L, using {p} of product in total." : "You need {l} L of spray: mix 1 tank of {t} L, using {p} of product in total.", { l: `<b>${num(r.totalLitres)}</b>`, n: `<b>${num(r.tanks)}</b>`, t: num(tank), p: `<b>${big(r.productTotal)}</b>` })}</p>`
      : "";
    const leftover = r.leftoverLitres >= 1 ? `<p class="hint">${trf("The last tank will have about {l} L left over. Mix a smaller last batch rather than pouring leftover PBZ on the ground: it stays in the soil for months.", { l: num(r.leftoverLitres) })}</p>` : "";
    out.innerHTML = `
      <div class="card result${overdose.length ? " over" : ""}">
        ${danger}
        <h3>${trf("Put in each {t} L tank of water", { t: num(tank) })}</h3>
        <p class="big">${big(r.productPerTank)} <span>${esc(trf("of {product}", { product: what }))}</span></p>
        <p>${treesPerTank}</p>
        ${orchard}${leftover}${lowDose}${msg}
        <p class="hint">${form === "sc" ? tr("Measure liquid with a measuring cylinder or syringe. If the label gives g/L (for example 250 g/L), divide by 10 to get % (25%).") : tr("Weigh powder on a kitchen scale; spoon and bottle-cap measures vary a lot between products.")} ${tr("Mix the product in a little water first, then top up the tank. Wear gloves and a mask.")}</p>
        <p class="hint"><b>${tr("Where to spray:")}</b> ${tr("both sides of the mature leaves, plus the main branches inside the canopy, until the leaves are wet but not dripping. Lay the plastic over the beds about a week before, so drips land on plastic, not soil.")}</p>
        <details class="adv"><summary>${tr("Scientist view")}</summary><p class="hint">${trf("{ppm} ppm active ingredient = {g} g a.i. per {t} L tank, about {gt} g a.i. per tree.", { ppm: num(ppm), g: num(r.aiPerTank, 1), t: num(tank), gt: num(perTree, 1) })}</p></details>
      </div>`;
  } catch (err) {
    out.innerHTML = `<div class="card warn">${esc(tr(err.message))}</div>`;
  }
}
const mixForm = $("#mixForm");
mixForm.addEventListener("change", (e) => {
  if (e.target.name === "dose") $("#m_ppm").value = e.target.value;
  renderMix();
});
mixForm.addEventListener("input", renderMix);

// ---------- Checklist ----------
function renderChecklist() {
  const done = new Set(store.get("checklist", []));
  const groups = STAGES.map((s) => ({ s, items: CHECKLIST.filter((c) => c.stage === s.id) })).filter((g) => g.items.length);
  $("#checklist").innerHTML = groups
    .map(
      ({ s, items }) => `<div class="card check-group">
        <h3><span class="num">${stepNo[s.id]}</span>${esc(tr(s.title))}</h3>
        <ul>${items
          .map((c) => `<li><label><input type="checkbox" value="${c.id}" ${done.has(c.id) ? "checked" : ""}/> <span>${esc(tr(c.text))}</span></label></li>`)
          .join("")}</ul></div>`
    )
    .join("");
  updateProgress();
}
function updateProgress() {
  const n = CHECKLIST.length, d = $$("#checklist input:checked").length;
  $("#progressText").textContent = trf("{d} of {n} done", { d, n });
  $("#progressBar").style.width = `${Math.round((d / n) * 100)}%`;
}
$("#checklist").addEventListener("change", () => {
  store.set("checklist", $$("#checklist input:checked").map((c) => c.value));
  updateProgress();
});
$("#resetChecklist").addEventListener("click", () => {
  if (confirm(tr("Clear all ticks?"))) { store.set("checklist", []); renderChecklist(); }
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
    !query || norm(tr(p.text)).includes(query) || norm(p.text).includes(query) || p.sources.some((id) => norm(tr(SOURCES[id].short) + " " + SOURCES[id].cite).includes(query));
  const topics = LIBRARY.map((t) => ({ t, pts: t.points.filter(match) })).filter((x) => x.pts.length || (!query && x.t));
  $("#library").innerHTML = topics.length
    ? topics
        .map(
          ({ t, pts }) => `<details class="card lib-topic" ${query ? "open" : ""}>
        <summary><span><span class="st-title">${esc(tr(t.title))}</span><span class="st-count">${trf("{n} points", { n: pts.length })}</span></span></summary>
        <div class="stage-body"><p class="summary">${esc(tr(t.summary))}</p>
        <ul class="pts">${pts
          .map((p) => `<li class="pt ${p.level}"><span class="lvl ${p.level}">${lvl(p.level)}</span> ${highlight(tr(p.text), query)} ${cites(p.sources)}</li>`)
          .join("")}</ul></div></details>`
        )
        .join("")
    : `<p class="empty">${esc(trf("No library points match “{q}”.", { q }))}</p>`;
  const srcs = Object.entries(SOURCES).filter(([, s]) => !query || norm(`${s.short} ${s.cite} ${s.finding} ${s.type} ${tr(s.short)} ${tr(s.finding)} ${tr(s.type)}`).includes(query));
  $("#sourceCount").textContent = query ? trf("{n} of {t} match", { n: srcs.length, t: Object.keys(SOURCES).length }) : Object.keys(SOURCES).length;
  $("#sourceList").innerHTML = srcs
    .map(
      ([id, s]) => `<li class="src" id="src-${id}">
      <span class="type">${esc(tr(s.type))}</span>
      <p class="cite">${highlight(s.cite, query)}</p>
      <p class="finding">${highlight(tr(s.finding), query)}</p>
      ${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${tr("Open source ↗")}</a>` : `<span class="hint">${tr("Print edition, no online copy")}</span>`}
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

// ---------- Language ----------
function renderAll() {
  applyStatic();
  renderRainMonths();
  renderGuide();
  renderPBZ();
  renderCleanup();
  renderOtherCrops();
  renderTriazoles();
  renderPlan();
  renderMix();
  renderChecklist();
  renderLibrary($("#libSearch").value);
  $("#langBtn").textContent = LANG_MENU.find(([c]) => c === lang)[1];
  showTab(currentTab, { scroll: false });
}
function openLangPicker() {
  $("#langOpts").innerHTML = LANG_MENU.map(
    ([c, tag, name, en]) => `<button type="button" data-l="${c}" lang="${c}" aria-pressed="${c === lang}"><span class="tag">${tag}</span><span class="nm">${name}<small>${en}</small></span></button>`
  ).join("");
  $("#langModal").hidden = false;
  $("#langOpts button[aria-pressed=true]")?.focus();
}
$("#langBtn").addEventListener("click", openLangPicker);
$("#langOpts").addEventListener("click", async (e) => {
  const b = e.target.closest("[data-l]");
  if (!b) return;
  store.set("lang", b.dataset.l);
  await loadLang(b.dataset.l);
  $("#langModal").hidden = true;
  renderAll();
});
$("#langModal").addEventListener("click", (e) => { if (e.target.id === "langModal" && store.get("lang", null)) $("#langModal").hidden = true; });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#langModal").hidden && store.get("lang", null)) $("#langModal").hidden = true; });

// ---------- Init ----------
const savedLang = store.get("lang", null);
await loadLang(savedLang || "en");
currentTab = store.get("tab", "guide");
renderAll();
showSub(store.get("pbzSub", "evidence"));
if (!savedLang) openLangPicker();

// Offline support: cache the app so it works in the orchard without signal.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
