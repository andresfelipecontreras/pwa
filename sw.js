//Nombre y version de la cache
const CACHE_NAME = ' v1_cache_andres_abogados'

//ficheros de la cache
var urlsToCache = [
    './',
    './css/style.css',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png',
];
// Event install

self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    });

            })
            .catch(err =>console.log('No ha registrado el cahe', err))

    );
});
// Event Activate
//Que la app funcionen sin conexion
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cacheNames =>{
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhitelist.indexOf(cacheName) === -1){
                            //Borrar elementos que no se necesitan de la cahe
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
            .then(() =>{
                //Activar cache
                self.clients.claim();
            })
    )
})
// Event fetch
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
            .then(res =>{
                if(res) {
                    //devuelvo datos de la cache
                    return res;
                }
                return fetch(e.request);
            })
    )

})
