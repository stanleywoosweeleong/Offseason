// Offline support for the orchard.
// Network first, so updates arrive when online, but:
//  - only good responses (200, same origin) are ever cached, so a server error or a captive-portal
//    page can never replace a working copy;
//  - if the network is slow (weak signal), the cached copy is shown after 3.5 s;
//  - requests bypass the browser's HTTP cache, so a phone never mixes old and new files after an update.
const CACHE = "offseason-v8";
const NETWORK_WAIT_MS = 3500;
const APP_FILES = [
  "./", "index.html", "manifest.webmanifest",
  "src/styles.css", "src/app.js", "src/cleanup.js", "src/i18n.js", "src/labels.js", "src/i18n/zh.json", "src/i18n/ms.json", "src/i18n/vi.json", "src/i18n/km.json", "src/guide.js", "src/library.js", "src/planner.js", "src/sources.js",
  "fonts/NotoSansKhmer-khmer.woff2", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(APP_FILES.map((f) => new Request(f, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith(respond(e.request));
});

async function respond(request) {
  const cache = await caches.open(CACHE);
  const cached = (await cache.match(request)) || (request.mode === "navigate" ? await cache.match("index.html") : undefined);

  const network = fetch(request, { cache: "no-cache" })
    .then((res) => {
      if (res.ok && res.type === "basic") {
        cache.put(request, res.clone());
        return res;
      }
      return cached || res; // never prefer an error page over a working copy
    })
    .catch(() => cached || Response.error());

  if (!cached) return network;
  const slow = new Promise((resolve) => setTimeout(() => resolve(cached), NETWORK_WAIT_MS));
  return Promise.race([network, slow]);
}
