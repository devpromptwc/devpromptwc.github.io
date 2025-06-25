self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('app-devprompt-cache').then(function(cache) {
      return cache.addAll([
        'https://devprompt.blogspot.com//',
        'https://devprompt.blogspot.com/sw.js',
        'https://devprompt.blogspot.com/manifest.json',
        'https://devprompt.blogspot.com/icons/icon-192x192.png',
        'https://devprompt.blogspot.com/icons/icon-512x512.png'
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
