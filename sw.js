const CACHE_NAME = 'amalan-hidupku-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

// 1. Pasang Service Worker dan simpan fail dalam Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Menyimpan aset ke dalam cache...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Aktifkan Service Worker dan buang cache lama jika ada
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Memadam cache lama...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Strategi: Cuba ambil dari internet, jika gagal (offline), ambil dari Cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
