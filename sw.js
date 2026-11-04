// Offline support. Network first (so updates arrive when online), falling back to the cache in the orchard.
const CACHE = "offseason-v6";
const APP_FILES = [
  "./", "index.html", "manifest.webmanifest",
  "src/styles.css", "src/app.js", "src/cleanup.js", "src/i18n.js", "src/labels.js", "src/i18n/zh.json", "src/i18n/ms.json", "src/i18n/vi.json", "src/i18n/km.json", "src/guide.js", "src/library.js", "src/planner.js", "src/sources.js",
  "fonts/NotoSansKhmer-khmer.woff2", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(APP_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("index.html")))
  );
});
