/* global self, caches, URL, fetch, Response */
/* Offline fallback only. Never cache searches, menus, accounts, or API responses. */
const CACHE_NAME = "fysen-offline-v1";
const OFFLINE_URL = new URL("offline.html", self.registration.scope).pathname;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("fysen-offline-") && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.mode !== "navigate") return;
  if (new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request).catch(async () => (
      (await caches.match(OFFLINE_URL)) ||
      new Response("Du er frakoblet. Sjekk nettet og prøv igjen.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      })
    )),
  );
});
