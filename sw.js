const CACHE_NAME = 'custodylog-v12';
const ASSETS = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

const OFFLINE_HTML = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CustodyLog — Offline</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#0f1117;color:#e8e9ed;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px}.c{max-width:320px}.icon{font-size:48px;margin-bottom:16px}h1{font-size:20px;margin-bottom:8px}p{font-size:14px;color:#6b7089;line-height:1.5;margin-bottom:24px}button{padding:14px 28px;border-radius:12px;border:none;background:#4a9eff;color:#fff;font-size:15px;font-weight:600;cursor:pointer}</style></head><body><div class="c"><div class="icon">📡</div><h1>You\'re Offline</h1><p>CustodyLog needs to load its core files first. Please connect to the internet and try again.</p><button onclick="location.reload()">Retry</button></div></body></html>';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const networkFetch = fetch(e.request).then(resp => {
        if (resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => {
        if (cached) return cached;
        if (e.request.mode === 'navigate') {
          return new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html' } });
        }
        return new Response('Offline', { status: 503, statusText: 'Offline' });
      });
      return cached || networkFetch;
    })
  );
});
