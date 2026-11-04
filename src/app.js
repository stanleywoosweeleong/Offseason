import { SOURCES } from "./sources.js";
import { STAGES, GAPS, CHECKLIST, PBZ_TRIALS, PBZ_SAFETY, PROTOCOL } from "./guide.js";
import { LIBRARY } from "./library.js";
import { MICROBES, NO_FUNGI, CLEANUP_GROUPS, OTHER_CROPS, TRIAZOLES, TRIAZOLE_ADVICE } from "./cleanup.js";
import { REGIONS, RAIN_SOURCES, wetMonths, monthRuns } from "./regions.js";
import { LEVEL, EFFECT_LABEL, TEST_LABEL, TRI_LABEL } from "./labels.js";
import { LANGS, LANG_MENU, LOCALE, loadLang, lang, tr, trf, applyStatic } from "./i18n.js";
import { planFromHarvest, planFromSpray, pbzMix, tankMix, rainyMonthsInWindow, addDays, isoDate, PBZ_RECOMMENDED_PPM, CULTIVAR_PRESETS, buildProtocol } from "./planner.js";

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const loc = () => LOCALE[lang];
// Khmer month names are built in, because many browsers have no Khmer date data and would show English.
const KM_MONTHS = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
const monthName = (i) => (lang === "km" ? KM_MONTHS[i] : new Date(Date.UTC(2026, i, 1)).toLocaleDateString(loc(), { month: "short", timeZone: "UTC" }));
const fmt = (d) => (lang === "km"
  ? `${d.getUTCDate()} ${KM_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
  : d.toLocaleDateString(loc(), { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }));
const fmtMonthYear = (year, month) => (lang === "km"
  ? `${KM_MONTHS[month]} ${year}`
  : new Date(Date.UTC(year, month, 1)).toLocaleDateString(loc(), { month: "short", year: "numeric", timeZone: "UTC" }));
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
  if (typeof updateFab === "function") updateFab();
}
// Tapping the tab you are already on scrolls back to the top, as in most phone apps.
$$(".tabbar [role=tab]").forEach((b) =>
  b.addEventListener("click", () => {
    if (b.dataset.tab === currentTab && window.scrollY > 0) scrollToTop();
    else showTab(b.dataset.tab);
  })
);

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
// ---------- Share the microbe list (WhatsApp / copy) ----------
// Plain text with WhatsApp formatting (*bold*, _italic_), grouped by how each microbe was tested,
// with the source and its link after every entry so a researcher can check each claim.
const APP_URL = "https://stanleywoosweeleong.github.io/Offseason/";
// whatsapp: bold headings with *…* (WhatsApp renders them). Otherwise plain text with no markers,
// because the share sheet and Copy can end up in email, notes or documents.
function microbeShareText({ whatsapp = false } = {}) {
  const bold = (t) => (whatsapp ? `*${t}*` : t);
  const groups = [
    [tr("Tested in the field or in pots"), MICROBES.filter((m) => ["field", "pot"].includes(m.test) && m.level !== "lead")],
    [tr("Laboratory only"), MICROBES.filter((m) => !["field", "pot"].includes(m.test) && m.level !== "lead")],
    [tr("Leads still to be checked"), MICROBES.filter((m) => m.level === "lead")],
  ];
  let n = 0;
  const lines = [bold(tr("Microbes that break down paclobutrazol (PBZ)")), `${tr("Offseason Durian")} · ${MICROBES.length}`];
  for (const [title, list] of groups) {
    if (!list.length) continue;
    lines.push("", bold(title));
    for (const m of list) {
      n++;
      lines.push(
        "",
        `${n}. ${tr(m.name)} (${tr(m.group)}) · ${tr(TEST_LABEL[m.test])}`,
        `${tr("From:")} ${tr(m.from)}`,
        `${tr("Result:")} ${tr(m.result)}`,
        ...m.sources.map((id) => `${tr("Source:")} ${tr(SOURCES[id].short)}${SOURCES[id].url ? ` ${SOURCES[id].url}` : ""}`)
      );
    }
  }
  lines.push("", tr(NO_FUNGI), "", `⚠ ${tr("None has been tested in a durian orchard yet.")}`, `${tr("Full details and more sources:")} ${APP_URL}`);
  return lines.join("\n");
}
function updateShareLinks() {
  $("#shareMicrobesWa").href = `https://wa.me/?text=${encodeURIComponent(microbeShareText({ whatsapp: true }))}`;
}
// The phone's own share sheet (WhatsApp, Telegram, email…) handles long text better than a wa.me link.
if (navigator.share) {
  $("#shareMicrobes").hidden = false;
  $("#shareMicrobes").addEventListener("click", () => {
    navigator.share({ title: tr("Microbes that break down paclobutrazol (PBZ)"), text: microbeShareText() }).catch(() => {});
  });
}
$("#copyMicrobes").addEventListener("click", async () => {
  const label = $("#copyMicrobesLabel");
  try {
    await navigator.clipboard.writeText(microbeShareText());
    label.textContent = tr("Copied");
  } catch {
    label.textContent = tr("Copy failed");
  }
  setTimeout(() => (label.textContent = tr("Copy list")), 2000);
});

function renderCleanup() {
  updateShareLinks();
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
// Opening a PBZ section starts at its top (just under the section tabs), not at the old scroll position.
$$(".subnav button").forEach((b) =>
  b.addEventListener("click", () => {
    showSub(b.dataset.sub);
    const panel = document.querySelector(`[data-subpanel="${b.dataset.sub}"]`);
    // Where the section tabs sit once pinned (below the header, and below the main tab bar on wide screens).
    const nav = $(".subnav");
    const below = parseFloat(getComputedStyle(nav).top) + nav.getBoundingClientRect().height + 12;
    const y = window.scrollY + panel.getBoundingClientRect().top - below;
    if (window.scrollY > y) window.scrollTo({ top: Math.max(0, y) });
  })
);

// ---------- Planner ----------
function renderRainMonths() {
  const rainy = new Set(store.get("rainy", []));
  $("#rainMonths").innerHTML = Array.from({ length: 12 }, (_, i) =>
    `<label class="chip"><input type="checkbox" value="${i}" ${rainy.has(i) ? "checked" : ""}/> ${esc(monthName(i))}</label>`
  ).join("");
  renderRegionPicker();
}

// ---------- Rainy-season presets by region ----------
// "Dec – Feb (into the next year)", "May, Aug – Nov", or a note when no month stands out.
function seasonText(months) {
  const runs = monthRuns(months);
  if (!runs.length) return tr("No month stands out: rain is spread through the year.");
  if (months.length === 12) return tr("All year");
  const parts = runs.map(([a, b]) => (a === b ? monthName(a) : `${monthName(a)} – ${monthName(b)}`));
  const wraps = runs.some(([a, b]) => a > b);
  return parts.join(", ") + (wraps ? ` ${tr("(into the next year)")}` : "");
}
function renderRegionPicker() {
  const sel = $("#rainRegion");
  const saved = store.get("rainRegion", "");
  const countries = [...new Set(REGIONS.map((r) => r.country))];
  sel.innerHTML =
    `<option value="">${esc(tr("Choose your region"))}</option>` +
    countries
      .map((c) => `<optgroup label="${esc(tr(c))}">${REGIONS.filter((r) => r.country === c)
        .map((r) => `<option value="${r.id}">${esc(tr(r.region))}</option>`).join("")}</optgroup>`)
      .join("");
  sel.value = REGIONS.some((r) => r.id === saved) ? saved : "";
  renderRainInfo();
}
function renderRainInfo() {
  const r = REGIONS.find((x) => x.id === $("#rainRegion").value);
  if (!r) { $("#rainInfo").innerHTML = ""; return; }
  const wet = new Set(wetMonths(r));
  const max = Math.max(...r.mm);
  const ticked = $$("#rainMonths input:checked").map((c) => Number(c.value));
  const edited = ticked.length !== wet.size || ticked.some((m) => !wet.has(m));
  $("#rainInfo").innerHTML = `
    <div class="rain-card">
      <p class="rain-season"><b>${esc(tr("Typical heavy-rain months:"))}</b> ${esc(seasonText([...wet]))}</p>
      <div class="rain-bars" role="img" aria-label="${esc(tr("Average rainfall by month"))}">
        ${r.mm.map((v, i) => `<span class="rb${wet.has(i) ? " wet" : ""}" title="${esc(monthName(i))}: ${v} mm"><i style="height:${Math.max(4, Math.round((v / max) * 100))}%"></i><small>${esc(monthName(i).slice(0, 1))}</small></span>`).join("")}
      </div>
      <p class="hint">${esc(trf("Average rainfall at {place}, 1991–2020 (estimate). Adjust the ticks to your own farm.", { place: r.place }))}${edited ? ` <b>${esc(tr("You have edited these months."))}</b>` : ""}</p>
      ${cites(RAIN_SOURCES)}
    </div>`;
}
$("#rainRegion").addEventListener("change", (e) => {
  store.set("rainRegion", e.target.value);
  const r = REGIONS.find((x) => x.id === e.target.value);
  if (r) {
    const wet = new Set(wetMonths(r));
    $$("#rainMonths input").forEach((c) => (c.checked = wet.has(Number(c.value))));
  }
  renderRainInfo();
  renderPlan();
});
$("#rainMonths").addEventListener("change", renderRainInfo);
$("#planDate").value = store.get("planDate", ""); // no pre-filled date: the grower picks one
document.querySelector(`input[name=mode][value=${store.get("mode", "harvest")}]`).checked = true;

function applyCultivar(key) {
  const preset = CULTIVAR_PRESETS[key];
  if (!preset) return;
  const a = preset.anthesisToHarvest;
  $("#a_min").value = a.min; $("#a_typ").value = a.typ; $("#a_max").value = a.max;
}
// Stage lengths are saved, so a grower's own records survive a reload.
const STAGE_IDS = ["p_min", "p_typ", "p_max", "a_min", "a_typ", "a_max"];
const saveStages = () => store.set("stages", Object.fromEntries(STAGE_IDS.map((id) => [id, $(`#${id}`).value])));
$("#cultivar").value = store.get("cultivar", "monthong");
if (!$("#cultivar").value) $("#cultivar").value = "monthong";
const savedStages = store.get("stages", null);
if (savedStages) {
  // PBZ → flowering is the grower's own; flowering → harvest comes from the preset unless set to Custom.
  const ids = $("#cultivar").value === "custom" ? STAGE_IDS : STAGE_IDS.slice(0, 3);
  ids.forEach((id) => { if (savedStages[id]) $(`#${id}`).value = savedStages[id]; });
}
if ($("#cultivar").value !== "custom") applyCultivar($("#cultivar").value);
$("#cultivar").addEventListener("change", (e) => { store.set("cultivar", e.target.value); applyCultivar(e.target.value); saveStages(); renderPlan(); });
["#a_min", "#a_typ", "#a_max"].forEach((id) =>
  $(id).addEventListener("input", () => { $("#cultivar").value = "custom"; store.set("cultivar", "custom"); })
);
STAGE_IDS.forEach((id) => $(`#${id}`).addEventListener("input", saveStages));

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
    <p class="hint">${tr("Hâu & Hiếu's day-by-day off-season protocol (Table 9.2), placed on your calendar. Final-load rows switch between early cultivars (≤ 100 days) and late ones such as 'Monthong'.")}</p>
    ${cites(["tran2023book"])}
    <ol class="timeline protocol">${rows
      .map((r) => `<li class="tl"><div class="when">${when(r)}</div><span class="step">${trf("Step {n}", { n: stepNo[r.step] })}</span> <b>${esc(tr(r.title))}</b><p>${esc(tr(r.actions))}</p></li>`)
      .join("")}</ol></details>`;
}
// Today as a UTC date (the planner works in whole UTC days).
const today = () => { const n = new Date(); return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())); };
function renderPlan() {
  const mode = document.querySelector("input[name=mode]:checked").value;
  $("#dateLabel").textContent = mode === "harvest" ? tr("Target harvest date") : tr("Planned PBZ spray date");
  const months = $$("#rainMonths input:checked").map((c) => Number(c.value));
  store.set("rainy", months);
  store.set("mode", mode);
  store.set("planDate", $("#planDate").value);
  const out = $("#planOut");
  if (!$("#planDate").value) { out.innerHTML = `<div class="card mix-missing"><p>${esc(tr("Choose a date above to see your plan."))}</p></div>`; return; }
  try {
    const stages = readStages();
    // Name each rainy month with its year, so a season that runs into the next year reads clearly.
    const monthYear = ({ year, month }) => fmtMonthYear(year, month);
    const rainWarn = (hits) => hits.length
      ? `<p class="warn">${esc(trf("⚠ Touches months you marked as rainy: {months}. Rain after spraying made PBZ unreliable in trials.", { months: hits.map(monthYear).join(", ") }))}</p>${cites(["kozai2024", "chandraparnik1993"])}`
      : "";
    if (mode === "harvest") {
      const r = planFromHarvest($("#planDate").value, stages);
      // Check every month the window touches, not just its ends.
      // Include the 14 days after the latest spray date, as in spray mode: rain then is what weakened PBZ.
      const risky = rainWarn(rainyMonthsInWindow(r.spray.earliest, addDays(r.spray.latest, 14), months));
      const past = r.spray.latest < today()
        ? `<p class="warn">${tr("⚠ This whole spray window is already in the past. Choose a later harvest date.")}</p>`
        : r.spray.earliest < today() ? `<p class="note">${tr("Part of this spray window has already passed.")}</p>` : "";
      out.innerHTML = `
        <div class="card result">
          <h3>${tr("Spray PBZ between")}</h3>
          <p class="big">${fmt(r.spray.earliest)} <span>→</span><br />${fmt(r.spray.latest)}</p>
          <p>${trf("Most likely: {date}. The window is wide because weather drives flowering; spray early in it if your area flowers late.", { date: `<b>${fmt(r.spray.typical)}</b>` })}</p>
          ${past}${risky}
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
          ${r.spray < today() ? `<p class="note">${tr("This spray date is in the past.")}</p>` : ""}${rainWarn(rainyMonthsInWindow(r.spray, addDays(r.spray, 14), months))}
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
  saveMix();
  // No pre-filled figures: the dose appears only once the farmer has chosen every input.
  const filled = (sel) => $(sel).value.trim() !== "";
  const missing = [
    (!tankSel || (tankSel === "other" && !filled("#m_tank"))) && tr("your tank size"),
    (!aiSel || (aiSel === "other" && !filled("#m_ai"))) && tr("the strength on your PBZ label"),
    !filled("#m_ppm") && tr("which trees you are spraying"),
    !filled("#m_trees") && tr("the number of trees"),
    !filled("#m_l") && tr("the litres you spray per tree"),
  ].filter(Boolean);
  if (missing.length) {
    $("#mixOut").innerHTML = `<div class="card mix-missing"><p><b>${esc(tr("To see your dose, choose:"))}</b></p><ul>${missing.map((m) => `<li>${esc(m)}</li>`).join("")}</ul></div>`;
    return;
  }
  const tank = tankSel === "other" ? Number($("#m_tank").value) : Number(tankSel);
  const ai = aiSel === "other" ? Number($("#m_ai").value) : Number(aiSel);
  const ppm = Number($("#m_ppm").value), litres = Number($("#m_l").value);
  const trees = Math.round(Number($("#m_trees").value));
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
    const lowDose = perTree < 12 && r.status !== "low" ? `<p class="note">${trf("Each tree gets only {g} g of active ingredient. For an 8–10-year tree Hâu & Hiếu's minimum is about 12–15 g, so spray 10–12 L per tree.", { g: num(perTree, 1) })}</p>` : "";
    const treesPerTank = r.treesPerTank >= 1
      ? trf("One tank sprays about {n} trees at {l} L each.", { n: `<b>${num(r.treesPerTank, 1)}</b>`, l: num(litres, 1) })
      : trf("Each tree needs about {n} tanks ({l} L).", { n: `<b>${num(1 / r.treesPerTank, 1)}</b>`, l: num(litres, 1) });
    const orchard = trees > 1 || r.tanks > 1
      ? `<h3>${trees > 1 ? trf("For {n} trees", { n: num(trees) }) : tr("For 1 tree")}</h3>
         <p>${trf(r.tanks > 1 ? "You need {l} L of spray: mix {n} tanks of {t} L, using {p} of product in total." : "You need {l} L of spray: mix 1 tank of {t} L, using {p} of product in total.", { l: `<b>${num(r.totalLitres, 2)}</b>`, n: `<b>${num(r.tanks)}</b>`, t: num(tank, 2), p: `<b>${big(r.productTotal)}</b>` })}</p>`
      : "";
    const leftover = r.leftoverLitres >= 1 ? `<p class="hint">${trf("The last tank will have about {l} L left over. Mix a smaller last batch rather than pouring leftover PBZ on the ground: it stays in the soil for months.", { l: num(r.leftoverLitres, 1) })}</p>` : "";
    out.innerHTML = `
      <div class="card result${overdose.length ? " over" : ""}">
        ${danger}
        <h3>${trf("Put in each {t} L tank of water", { t: num(tank, 2) })}</h3>
        <p class="big">${big(r.productPerTank)} <span>${esc(trf("of {product}", { product: what }))}</span></p>
        <p>${treesPerTank}</p>
        ${orchard}${leftover}${lowDose}${msg}
        <p class="hint">${form === "sc" ? tr("Measure liquid with a measuring cylinder or syringe. If the label gives g/L (for example 250 g/L), divide by 10 to get % (25%).") : tr("Weigh powder on a kitchen scale; spoon and bottle-cap measures vary a lot between products.")} ${tr("Mix the product in a little water first, then top up the tank. Wear gloves and a mask.")}</p>
        <p class="hint"><b>${tr("Where to spray:")}</b> ${tr("both sides of the mature leaves, plus the main branches inside the canopy, until the leaves are wet but not dripping. Lay the plastic over the beds about a week before, so drips land on plastic, not soil.")}</p>
        <details class="adv"><summary>${tr("Scientist view")}</summary><p class="hint">${trf("{ppm} ppm active ingredient = {g} g a.i. per {t} L tank, about {gt} g a.i. per tree.", { ppm: num(ppm), g: num(r.aiPerTank, 1), t: num(tank, 2), gt: num(perTree, 1) })}</p></details>
      </div>`;
  } catch (err) {
    out.innerHTML = `<div class="card warn">${esc(tr(err.message))}</div>`;
  }
}
// Remember the farmer's own entries (never defaults) so the next visit starts where they left off.
const MIX_RADIOS = ["tank", "ai", "form", "dose"];
const MIX_FIELDS = ["m_tank", "m_ai", "m_ppm", "m_trees", "m_l"];
function saveMix() {
  store.set("mix", {
    ...Object.fromEntries(MIX_RADIOS.map((n) => [n, radio(n) || ""])),
    ...Object.fromEntries(MIX_FIELDS.map((id) => [id, $(`#${id}`).value])),
  });
}
(function restoreMix() {
  const m = store.get("mix", null);
  if (!m) return;
  for (const n of MIX_RADIOS) {
    const el = m[n] && document.querySelector(`#mixForm input[name=${n}][value="${m[n]}"]`);
    if (el) el.checked = true;
  }
  for (const id of MIX_FIELDS) if (m[id] != null) $(`#${id}`).value = m[id];
})();
const mixForm = $("#mixForm");
mixForm.addEventListener("change", (e) => {
  if (e.target.name === "dose") $("#m_ppm").value = e.target.value;
  // A ppm typed in the Scientist view selects the matching tree type, or none if it matches no preset.
  if (e.target.id === "m_ppm") document.querySelectorAll("#mixForm input[name=dose]").forEach((r) => (r.checked = r.value === e.target.value));
  renderMix();
});
mixForm.addEventListener("input", renderMix);

// ---------- Checklist ----------
function renderChecklist() {
  const done = new Set(store.get("checklist", []));
  const groups = STAGES.map((s) => ({ s, items: CHECKLIST.filter((c) => c.stage === s.id) })).filter((g) => g.items.length);
  $("#checklist").innerHTML = groups
    .map(
      ({ s, items }) => `<div class="card check-group" id="check-${s.id}">
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
  if (!q) return esc(text);
  // Split the raw text on the query, then escape each piece, so the highlight never shows entity codes.
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return String(text).split(re).map((part, i) => (i % 2 ? `<mark>${esc(part)}</mark>` : esc(part))).join("");
}
function renderLibrary(q = "") {
  const query = norm(q.trim());
  const match = (p) =>
    !query || norm(tr(p.text)).includes(query) || norm(p.text).includes(query) || p.sources.some((id) => norm(tr(SOURCES[id].short) + " " + SOURCES[id].cite).includes(query));
  const topics = LIBRARY.map((t) => ({ t, pts: t.points.filter(match) })).filter((x) => x.pts.length || (!query && x.t));
  $("#library").innerHTML = topics.length
    ? topics
        .map(
          ({ t, pts }) => `<details class="card lib-topic" id="lib-${t.id}" ${query ? "open" : ""}>
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

// ---------- Navigation: back to top + contents ----------
const smooth = () => (matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");
function scrollToTop() { window.scrollTo({ top: 0, behavior: smooth() }); }

// What the Contents sheet lists on each tab: [element id, label, sub-label]
function tocEntries() {
  if (currentTab === "guide")
    return [
      ...STAGES.map((s, i) => [`stage-${s.id}`, `${i + 1}. ${tr(s.title)}`, tr(s.when)]),
      ["gapsBlock", tr("What the evidence does not tell us"), ""],
    ];
  if (currentTab === "library")
    return [
      ...LIBRARY.filter((t) => document.getElementById(`lib-${t.id}`)).map((t) => [`lib-${t.id}`, tr(t.title), tr(t.summary)]),
      ["sourcesBlock", tr("All sources"), ""],
    ];
  if (currentTab === "checklist")
    return STAGES.filter((s) => document.getElementById(`check-${s.id}`)).map((s) => [`check-${s.id}`, `${stepNo[s.id]}. ${tr(s.title)}`, ""]);
  return [];
}
const TOC_TABS = new Set(["guide", "library", "checklist"]);
const tocTitle = () => (currentTab === "library" ? tr("Topics") : tr("Steps"));

function updateFab() {
  const scrolled = window.scrollY > window.innerHeight * 0.8;
  $("#fab").hidden = !scrolled;
  $("#tocBtn").hidden = !TOC_TABS.has(currentTab);
  if (TOC_TABS.has(currentTab)) $("#tocBtn span").textContent = tocTitle();
}
let fabTick = false;
window.addEventListener("scroll", () => {
  if (fabTick) return;
  fabTick = true;
  requestAnimationFrame(() => { updateFab(); fabTick = false; });
}, { passive: true });
$("#topBtn").addEventListener("click", scrollToTop);

function currentSectionId(entries) {
  const line = $(".appbar").getBoundingClientRect().bottom + 24;
  let cur = entries[0]?.[0];
  for (const [id] of entries) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) cur = id;
  }
  return cur;
}
function openToc() {
  const entries = tocEntries();
  if (!entries.length) return;
  const cur = currentSectionId(entries);
  $("#tocTitle").textContent = tocTitle();
  $("#tocList").innerHTML = entries
    .map(([id, label, sub]) => `<li><button type="button" data-jump="${id}" ${id === cur ? 'aria-current="true"' : ""}><span class="toc-l">${esc(label)}</span>${sub ? `<small>${esc(sub)}</small>` : ""}</button></li>`)
    .join("");
  $("#tocCollapse").hidden = currentTab === "checklist";
  $("#tocSheet").hidden = false;
  $("#tocBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
  $("#tocSheet").scrollTop = 0;
  $("#tocList [aria-current]")?.scrollIntoView({ block: "center" });
  $("#tocTitle").focus({ preventScroll: true });
}
function closeToc() {
  $("#tocSheet").hidden = true;
  $("#tocBackdrop").hidden = true;
  document.body.style.overflow = "";
  if (!$("#fab").hidden) $("#tocBtn").focus({ preventScroll: true });
}

// Keep keyboard focus inside whichever dialog is open (language picker, contents, citation).
document.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;
  const box = !$("#langModal").hidden ? $(".langbox") : !$("#tocSheet").hidden ? $("#tocSheet") : !$("#sheet").hidden ? $("#sheet") : null;
  if (!box) return;
  const f = [...box.querySelectorAll("button, a[href], input, [tabindex]:not([tabindex='-1'])")].filter((el) => !el.hidden && el.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && (document.activeElement === first || !box.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && (document.activeElement === last || !box.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
});
$("#tocBtn").addEventListener("click", openToc);
$("#tocClose").addEventListener("click", closeToc);
$("#tocBackdrop").addEventListener("click", closeToc);
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#tocSheet").hidden) closeToc(); });
$("#tocList").addEventListener("click", (e) => {
  const b = e.target.closest("[data-jump]");
  if (!b) return;
  const el = document.getElementById(b.dataset.jump);
  closeToc();
  if (!el) return;
  if (el.tagName === "DETAILS") el.open = true;
  el.scrollIntoView({ behavior: smooth(), block: "start" });
});
$("#tocCollapse").addEventListener("click", () => {
  $$(`#tab-${currentTab} details[open]`).forEach((d) => (d.open = false));
  closeToc();
  scrollToTop();
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
  const tag = LANG_MENU.find(([c]) => c === lang)[1];
  $("#langBtn").textContent = tag;
  // The spoken name must include the visible text ("EN"), not just "Language".
  $("#langBtn").setAttribute("aria-label", `${tag} · ${tr("Language")}`);
  showTab(currentTab, { scroll: false });
}
let pickerPlace = null;
function openLangPicker() {
  $("#langOpts").innerHTML = LANG_MENU.map(
    ([c, , name, en]) => `<button type="button" data-l="${c}" aria-pressed="${c === lang}"><span class="nm" lang="${c}">${name}</span>${en !== name ? `<span class="en">${en}</span>` : ""}<span class="tick" aria-hidden="true">✓</span></button>`
  ).join("");
  $("#langMsg").hidden = true;
  $("#langModal").hidden = false;
  pickerPlace = readingPlace();
  $("#langOpts button[aria-pressed=true]")?.focus({ preventScroll: true });
}
$("#langBtn").addEventListener("click", openLangPicker);
// Keep the reader's place when the language changes: the same paragraph stays at the top of the
// screen and every open section stays open, even though translations change the page length.
const pathOf = (el) => {
  const path = [];
  for (; el && el !== document.body; el = el.parentElement) path.unshift([...el.parentElement.children].indexOf(el));
  return path;
};
const atPath = (path) => path.reduce((el, i) => el?.children[i], document.body);
function readingPlace() {
  const subnav = document.querySelector("#tab-pbz:not([hidden]) .subnav");
  const top = $(".appbar").getBoundingClientRect().bottom + (subnav ? subnav.getBoundingClientRect().height : 0);
  const anchor = $$("main .pt, main li, main p, main h2, main h3, main summary, main article, main label")
    .find((el) => el.offsetParent && el.getBoundingClientRect().bottom > top + 2);
  const r = anchor?.getBoundingClientRect();
  return {
    anchor: anchor ? pathOf(anchor) : null,
    top,
    offset: r ? r.top : 0,
    hidden: r && r.top < top ? (top - r.top) / r.height : 0, // share of the paragraph already scrolled past
    open: $$("main details[open]").map(pathOf),
    y: window.scrollY,
  };
}
function restorePlace(place) {
  for (const path of place.open) { const d = atPath(path); if (d?.tagName === "DETAILS") d.open = true; }
  const el = place.anchor && atPath(place.anchor);
  if (!el) { window.scrollTo(0, place.y); return; }
  const r = el.getBoundingClientRect();
  const want = place.hidden ? place.top - place.hidden * r.height : place.offset;
  window.scrollTo(0, window.scrollY + r.top - want);
}
$("#langOpts").addEventListener("click", async (e) => {
  const b = e.target.closest("[data-l]");
  if (!b) return;
  const place = pickerPlace || readingPlace();
  const opts = $("#langOpts");
  opts.setAttribute("aria-busy", "true");
  const result = await loadLang(b.dataset.l);
  opts.removeAttribute("aria-busy");
  if (result === "stale") return; // a newer tap won
  langChosen = true;
  if (result === "failed") {
    // Stay in English rather than mixing languages, and say why.
    store.set("lang", "en");
    renderAll();
    const name = LANG_MENU.find(([c]) => c === b.dataset.l)?.[2] || b.dataset.l;
    openLangPicker();
    $("#langMsg").textContent = `Could not load ${name}. Check your connection and try again.`;
    $("#langMsg").hidden = false;
    return;
  }
  pickerPlace = null;
  store.set("lang", b.dataset.l);
  $("#langModal").hidden = true;
  renderAll();
  restorePlace(place);
  if (e.detail === 0) $("#langBtn").focus({ preventScroll: true }); // keyboard only: a tap leaves no ring
});
// The picker can be dismissed once any language has been chosen (also when storage is blocked).
let langChosen = false;
const canCloseLang = () => langChosen || store.get("lang", null);
$("#langModal").addEventListener("click", (e) => { if (e.target.id === "langModal" && canCloseLang()) $("#langModal").hidden = true; });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#langModal").hidden && canCloseLang()) $("#langModal").hidden = true; });

// ---------- Init ----------
const savedLang = store.get("lang", null);
// Never keep the screen blank for long on a weak signal: fall back to English after 2.5 s.
if ((await loadLang(savedLang || "en", { timeoutMs: 2500 })) === "ok" && savedLang) langChosen = true;
const savedTab = store.get("tab", "guide");
currentTab = document.getElementById(`tab-${savedTab}`) ? savedTab : "guide";
renderAll();
showSub(store.get("pbzSub", "evidence"));
updateFab();
document.documentElement.classList.remove("loading");
if (!savedLang) openLangPicker();

// Offline support: cache the app so it works in the orchard without signal.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
