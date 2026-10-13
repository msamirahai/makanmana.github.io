const C='makan-mana-v117',F=['./','index.html','firebase-config.js','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;const u=new URL(e.request.url);const keep=u.origin==location.origin||u.host=='www.gstatic.com'||u.host=='fonts.googleapis.com'||u.host=='fonts.gstatic.com';if(!keep)return;
e.respondWith(fetch(e.request).then(r=>{if(r.ok||r.type=='opaque'){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode=='navigate'?caches.match('index.html'):undefined))))});
