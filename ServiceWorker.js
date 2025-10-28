const cacheName = "Innate-Adjectives-1.0";
const contentToCache = [
    "Build/d3c7bbe3a5864531a3084decb9f3ebf1.loader.js",
    "Build/90abb0651695c338625d2e596b018b87.framework.js.unityweb",
    "Build/3cc5e1664dcc400ced2ba14e009b4185.data.unityweb",
    "Build/7cb3837944d2a72217a51da548341c5d.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
