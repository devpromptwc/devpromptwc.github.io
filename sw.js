const CACHE_NAME = 'devprompt-cache-v1';
const OFFLINE_URL = '/offline.html'; // ignorado se não estiver no Blogger

self.addEventListener('install', event => {
  // A instalação aqui precisa ser leve
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        // Atenção: esses arquivos precisam existir no domínio blogger
        '/', 
        '/favicon.ico'
      ]).catch(() => {});
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // Aqui você pode retornar um fallback, se quiser
      });
    })
  );
});
