// This is the 'Offline page' service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = 'ega-calculator-cache-v1';
const offlineFallbackPage = '/offline.html';
const filesToCache = [
  '/',
  '/js/app.js',
  '/js/ui.js',
  '/js/cyesis.js',
  '/css/style.css',
  '/img/logo.png',
  '/img/icons/48.png',
  '/img/icons/96.png',
  '/img/icons/120.png',
  '/img/icons/144.png',
  '/img/icons/150.png',
  '/img/icons/256.png',
  '/img/icons/512.png',
  offlineFallbackPage
];

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      console.log('[ServiceWorker] Pre-caching offline page');
      await cache.addAll(filesToCache);
    })()
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    try {
      const preloadResp = await event.preloadResponse;

      if (preloadResp) {
        return preloadResp;
      }

      const networkResp = await fetch(event.request);
      return networkResp;
    } catch (error) {
      console.log('[Service Worker] Fetch failed; using offline content.');
      const cache = await caches.open(CACHE);

      let cachedResp;
      if (event.request.url === self.location.origin + '/') {
        cachedResp = await cache.match(offlineFallbackPage);
      } else {
        cachedResp = await cache.match(event.request.url);
      }

      return cachedResp;
    }
  })());
});
