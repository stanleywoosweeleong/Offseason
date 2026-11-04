// DevTools audit: collects what Chrome DevTools would show (Issues panel via the Audits domain, console
// warnings/errors, uncaught errors, failed requests) while visiting every tab and section in every language.
// Usage: npm run devtools-audit [-- URL]   (default: the live site). Needs Playwright with full Chromium:
// the stripped "headless shell" does not raise Issues, so this launches channel "chromium".
// Exits 1 if anything is reported.
const { chromium, devices } = require("playwright");
(async () => {
  const b = await chromium.launch({ channel: "chromium" });
  const ctx = await b.newContext({ ...devices["iPhone 15 Pro Max"], viewport: { width: 440, height: 956 } });
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p);
  const issues = new Map();
  cdp.on("Audits.issueAdded", ({ issue }) => {
    const d = issue.details || {};
    const key = issue.code + " " + JSON.stringify(d).slice(0, 400);
    issues.set(key, issue);
  });
  await cdp.send("Audits.enable");
  const consoleMsgs = [], failed = [], pageErrors = [];
  p.on("console", (m) => { if (m.type() !== "log" && m.type() !== "debug") consoleMsgs.push(`${m.type()}: ${m.text()}`); });
  p.on("pageerror", (e) => pageErrors.push(e.message));
  p.on("requestfailed", (r) => failed.push(`${r.url()} ${r.failure()?.errorText}`));
  p.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });

  await p.goto(process.argv[2] || "https://stanleywoosweeleong.github.io/Offseason/");
  await p.waitForTimeout(800);
  for (const lang of ["en", "zh", "ms", "vi", "km"]) {
    await p.evaluate(() => { const m = document.querySelector("#langModal"); if (m.hidden) document.querySelector("#langBtn").click(); });
    await p.evaluate((l) => document.querySelector(`#langOpts [data-l=${l}]`).click(), lang);
    await p.waitForTimeout(400);
    for (const t of ["guide", "planner", "checklist", "library"]) {
      await p.evaluate((t) => document.querySelector(`[data-tab=${t}]`).click(), t);
      await p.evaluate(() => document.querySelectorAll("main details").forEach((d) => (d.open = true)));
      await p.waitForTimeout(150);
    }
    for (const s of ["evidence", "mix", "safety", "cleanup"]) {
      await p.evaluate(() => document.querySelector("[data-tab=pbz]").click());
      await p.evaluate((s) => document.querySelector(`[data-sub=${s}]`).click(), s);
      await p.waitForTimeout(150);
    }
    // exercise the forms
    await p.evaluate(() => document.querySelector("[data-sub=mix]").click());
    await p.evaluate(() => { for (const [n, v] of [["tank", "16"], ["ai", "25"], ["dose", "1000"]]) document.querySelector(`#mixForm input[name=${n}][value="${v}"]`).click(); });
    await p.fill("#m_trees", "10"); await p.fill("#m_l", "12");
    await p.evaluate(() => document.querySelector("[data-tab=planner]").click());
    await p.fill("#planDate", "2027-09-15");
    await p.evaluate(() => document.querySelectorAll("#tab-planner details").forEach((d) => (d.open = true)));
    await p.selectOption("#rainRegion", "my-pahang");
    await p.evaluate(() => document.querySelector("[data-tab=library]").click());
    await p.fill("#libSearch", "PBZ");
    await p.waitForTimeout(300);
    await p.evaluate(() => document.querySelector(".cite-chip")?.click());
    await p.waitForTimeout(200);
    await p.evaluate(() => document.querySelector("#sheetClose")?.click());
  }
  // service worker / offline
  await p.evaluate(() => navigator.serviceWorker.ready);
  await p.reload(); await p.waitForTimeout(800);
  await p.waitForTimeout(500);

  console.log(`ISSUES (${issues.size}):`);
  for (const [, i] of issues) console.log(" -", i.code, JSON.stringify(i.details).slice(0, 500));
  console.log(`CONSOLE warnings/errors (${consoleMsgs.length}):`, [...new Set(consoleMsgs)].slice(0, 20));
  console.log(`PAGE errors (${pageErrors.length}):`, pageErrors.slice(0, 10));
  console.log(`FAILED requests (${failed.length}):`, [...new Set(failed)].slice(0, 20));
  await b.close();
  process.exit(issues.size || consoleMsgs.length || pageErrors.length || failed.length ? 1 : 0);
})();
