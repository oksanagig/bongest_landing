const CACHE_NAME = 'bongest-worker-v2';
const PRECACHE_URLS = ['/worker'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Skip non-GET and OAuth callbacks
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('/~oauth')) return;

  // Network-first for API calls
  if (event.request.url.includes('/functions/v1/')) return;

  event.respondWith((async () => {
    try {
      return await fetch(event.request);
    } catch {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;
      if (event.request.mode === 'navigate') {
        const appShell = await caches.match('/worker');
        if (appShell) return appShell;
      }
      return Response.error();
    }
  })());
});
