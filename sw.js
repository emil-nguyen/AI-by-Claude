// Service worker: gemmer appen, så den virker uden internet.
// Ændrer du index.html, så skift versionsnavnet herunder (fx abc-v2).
const V = "abc-v2";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if(e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request).catch(() => caches.match("./index.html"))));
});
