self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('app-devprompt-cache').then(function(cache) {
      return cache.addAll([
        'https://devprompt.blogspot.com/',
        'https://devpromptwc.github.io/sw.js',
        'https://devpromptwc.github.io/manifest.json',
        'https://devpromptwc.github.io/icons/icon192.png',
        'https://devpromptwc.github.io/icons/icon512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
