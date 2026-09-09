const CACHE_NAME = 'mixcode-tool-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './assets/alpine.min.js',
  './assets/logos.js',
  './assets/logo-white.png',
  './assets/logo-color.png',
  './assets/fonts/cairo-arabic-700.woff2',
  './assets/fonts/cairo-latin-700.woff2',
  './assets/fonts/tajawal-arabic-700.woff2',
  './assets/fonts/tajawal-latin-700.woff2',
  './assets/fonts/alexandria-arabic-700.woff2',
  './assets/fonts/alexandria-latin-700.woff2',
  './assets/fonts/Almarai-Bold.ttf',
  './assets/fonts/almarai-arabic-700.woff2',
  './assets/fonts/inter-latin-700.woff2',
  './assets/fonts/montserrat-latin-700.woff2'
];

// Install event - Cache all core static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate event - Clean up old caches if any
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Cache-first with network fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback for HTML documents if offline
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
