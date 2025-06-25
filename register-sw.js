if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://devpromptwc.github.io/sw.js')
    .then(reg => console.log('Service Worker registrado!', reg))
    .catch(err => console.error('Erro ao registrar o Service Worker', err));
}
