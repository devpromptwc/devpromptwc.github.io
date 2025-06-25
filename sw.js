self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('app-cache').then(cache =>
      cache.addAll([
        'https://devprompt.blogspot.com/',
        'https://devprompt.blogspot.com/index.html'
      ])
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
