// Browser smoke test: reproduces the pre-launch review findings and checks they stay fixed.
// Needs Playwright with Chromium. Run with `npm run smoke` (it starts its own local server).
const { chromium, devices } = require("playwright");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png", ".woff2": "font/woff2" };

// Test server with switches to simulate a slow or failing network.
const control = { slow: {}, fail: {} };
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  const file = path.join(ROOT, url === "/" ? "index.html" : url);
  const send = () => {
    if (control.fail[url]) { res.writeHead(control.fail[url]); return res.end("error"); }
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
      res.end(data);
    });
  };
  control.slow[url] ? setTimeout(send, control.slow[url]) : send();
});

let failures = 0;
const check = (name, ok, detail = "") => { console.log(`${ok ? "ok  " : "FAIL"}  ${name}${detail ? "  (" + detail + ")" : ""}`); if (!ok) failures++; };
const tap = (p, sel) => p.evaluate((s) => document.querySelector(s).click(), sel);
const txt = (p, sel) => p.evaluate((s) => document.querySelector(s).textContent.replace(/\s+/g, " "), sel);

(async () => {
  await new Promise((r) => server.listen(0, r));
  const base = `http://localhost:${server.address().port}/`;
  const browser = await chromium.launch();
  const errors = [];
  const newPage = async (ctx) => { const p = await ctx.newPage(); p.on("pageerror", (e) => errors.push(e.message)); return p; };

  // 1. Fractional tank size keeps its decimals
  let ctx = await browser.newContext({ ...devices["iPhone 13"] });
  let p = await newPage(ctx);
  await p.goto(base);
  await tap(p, "#langOpts [data-l=en]");
  await tap(p, "[data-tab=pbz]"); await tap(p, "[data-sub=mix]");
  await tap(p, "#mixForm input[name=tank][value=other]");
  await p.fill("#m_tank", "1.5");
  const mix = await txt(p, "#mixOut");
  check("1.5 L tank is labelled 1.5 L with 6 mL", /each 1\.5 L tank/.test(mix) && /6 mL/.test(mix), mix.slice(0, 60));

  // 1b. Overdose warning still fires
  await p.fill("#m_tank", "16");
  await p.evaluate(() => { document.querySelector("#m_ppm").value = "2000"; document.querySelector("#m_ppm").dispatchEvent(new Event("input", { bubbles: true })); });
  check("overdose warning above 1,500 ppm", (await txt(p, "#mixOut")).includes("Risk of overdosing"));

  // 2. Custom stage lengths survive a reload
  await tap(p, "[data-tab=planner]");
  await p.selectOption("#cultivar", "musangking");
  await p.evaluate(() => document.querySelectorAll("#tab-planner details.adv").forEach((d) => (d.open = true)));
  await p.fill("#a_typ", "95");
  await p.fill("#p_typ", "70");
  await p.reload();
  check("custom stage lengths restored", (await p.inputValue("#a_typ")) === "95" && (await p.inputValue("#p_typ")) === "70" && (await p.inputValue("#cultivar")) === "custom");

  // 3. Rain in the middle of the window is flagged
  await p.evaluate(() => document.querySelectorAll("#tab-planner details.adv").forEach((d) => (d.open = true)));
  await p.evaluate(() => { const el = document.querySelector("#a_typ"); el.value = "124"; el.dispatchEvent(new Event("input", { bubbles: true })); });
  await p.evaluate(() => { const el = document.querySelector("#p_typ"); el.value = "78"; el.dispatchEvent(new Event("input", { bubbles: true })); });
  await p.evaluate(() => { document.querySelector("#a_min").value = "120"; document.querySelector("#a_max").value = "127"; document.querySelector("#p_min").value = "60"; document.querySelector("#p_max").value = "122"; });
  await p.fill("#planDate", "2027-10-07");
  await p.evaluate(() => { const c = document.querySelector('#rainMonths input[value="1"]'); c.checked = true; c.dispatchEvent(new Event("change", { bubbles: true })); });
  const plan = await txt(p, "#planOut");
  check("rainy February inside the window is flagged", plan.includes("marked as rainy"), plan.slice(0, 70));

  // 8. Past spray window is flagged
  await p.fill("#planDate", "2020-03-01");
  check("past spray window is flagged", (await txt(p, "#planOut")).includes("already in the past"));

  // 7. Search highlight shows no entity codes
  await tap(p, "[data-tab=library]");
  await p.fill("#libSearch", "3");
  await p.waitForTimeout(300);
  check("search shows no &#39; or &amp;", !/&#39;|&amp;/.test(await txt(p, "#tab-library")));
  await ctx.close();

  // 6. Two quick language taps: the last one wins
  ctx = await browser.newContext({ ...devices["iPhone 13"], serviceWorkers: "block" });
  p = await newPage(ctx);
  await p.goto(base);
  await tap(p, "#langOpts [data-l=en]");
  control.slow["/src/i18n/km.json"] = 1500;
  await tap(p, "#langBtn");
  await tap(p, "#langOpts [data-l=km]");
  await tap(p, "#langOpts [data-l=zh]");
  await p.waitForTimeout(2200);
  delete control.slow["/src/i18n/km.json"];
  const guideTab = await txt(p, "[data-tab=guide] span");
  check("quick language switch ends in the last choice", guideTab.trim() === "指南" && (await p.evaluate(() => document.documentElement.lang)) === "zh", guideTab);

  // 9. A failed language file falls back cleanly to English with a message
  control.fail["/src/i18n/vi.json"] = 503;
  await tap(p, "#langBtn");
  await tap(p, "#langOpts [data-l=vi]");
  await p.waitForTimeout(500);
  delete control.fail["/src/i18n/vi.json"];
  check("failed language → English + message", (await txt(p, "[data-tab=guide] span")).trim() === "Guide" && (await p.isVisible("#langMsg")));
  await ctx.close();

  // 4 + 5. Service worker: an error response never replaces the cached copy; slow network falls back to cache
  ctx = await browser.newContext({ ...devices["iPhone 13"] });
  p = await newPage(ctx);
  await p.goto(base);
  await p.evaluate(() => navigator.serviceWorker.ready);
  await p.reload(); // now controlled by the service worker
  await tap(p, "#langOpts [data-l=en]");
  await p.waitForTimeout(800);
  control.fail["/src/planner.js"] = 503;
  await p.reload();
  await p.waitForTimeout(800);
  delete control.fail["/src/planner.js"];
  await ctx.setOffline(true);
  await p.reload();
  await p.waitForTimeout(800);
  check("offline after a 503 still renders the guide", (await p.locator("#stages details").count()) === 8);
  await ctx.setOffline(false);
  control.slow["/src/app.js"] = 8000;
  await p.reload();
  await p.waitForTimeout(5000);
  delete control.slow["/src/app.js"];
  check("slow network falls back to the cached app within 5 s", (await p.locator("#stages details").count()) === 8);
  await ctx.close();

  // Small screens: nothing wider than the screen in any language
  for (const lang of ["en", "zh", "ms", "vi", "km"]) {
    ctx = await browser.newContext({ ...devices["iPhone SE"] });
    p = await newPage(ctx);
    await p.goto(base);
    await tap(p, `#langOpts [data-l=${lang}]`);
    let wide = 0;
    for (const t of ["guide", "planner", "pbz", "checklist", "library"]) {
      await tap(p, `[data-tab=${t}]`);
      if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth || innerWidth > 320)) wide++;
    }
    check(`320 px fits (${lang})`, wide === 0);
    await ctx.close();
  }

  check("no page errors", errors.length === 0, errors.slice(0, 3).join(" | "));
  await browser.close();
  server.close();
  console.log(failures ? `\n${failures} check(s) failed` : "\nall smoke checks passed");
  process.exit(failures ? 1 : 0);
})();
