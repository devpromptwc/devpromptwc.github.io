
const CACHE_NAME = 'devprompt-cache-v1';
const OFFLINE_URL = 'https://devprompt.blogspot.com/p/offline.html';

const ASSETS_TO_CACHE = [
  '/',
  '/icons/icon192.png',
  '/icons/icon512.png',
  '/fonts/onest-regular.woff2',
  '/fonts/onest-medium.woff2',
  '/fonts/onest-bold.woff2'
];

// Instala e adiciona arquivos ao cache
self.addEventListener('install', event => {
  console.log('[SW] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Força ativação imediata
});

// Ativa e limpa caches antigos
self.addEventListener('activate', event => {
  console.log('[SW] Ativando e limpando caches antigos...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deletando cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // Assume o controle imediatamente
});

// Intercepta requisições
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;
      }
      return fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      });
    })
  );
});

