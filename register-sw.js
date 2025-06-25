if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://devpromptwc.github.io/sw.js').then(function(registration) {
    console.log('Service Worker registrado com sucesso:', registration);
  }).catch(function(error) {
    console.log('Falha ao registrar o Service Worker:', error);
  });
}

// Adiciona o manifesto ao documento
let link = document.createElement('link');
link.rel = 'manifest';
link.href = 'https://devpromptwc.github.io/manifest.json';
document.head.appendChild(link);
