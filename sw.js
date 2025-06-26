//Esse sw.js que tá no Starter Kit é o mais básico e limpo possível — é só o esqueleto funcional pra garantir que o navegador reconheça o PWA como válido e permitia a instalação.

/*O que faz:
Instala normalmente (self.skipWaiting() garante que o novo SW assuma imediatamente).
Ativa e assume controle (self.clients.claim() cuida das abas abertas)

Fetch handler vazio, ou seja:

Deixa o navegador cuidar de tudo por padrão

Não cacheia nada

Não responde offline*/

self.addEventListener('install', event => {
  console.log('[SW] Instalando...');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Ativado');
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Simples: deixar o navegador lidar com tudo por enquanto
});
