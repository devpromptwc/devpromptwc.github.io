const CACHE_NAME = 'app-cache-v2'; // <--- Mude SEMPRE que fizer alterações

self.addEventListener('install', event => {
  self.skipWaiting(); // Ativa na hora
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        'https://devprompt.blogspot.com/',
        'https://devprompt.blogspot.com/index.html'
      ])
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim()) // Garante controle imediato
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
