const CACHE_NAME = 'recipe-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/recipe.html',
    '/styles.css',
    '/app.js',
    '/recipe.js',
    '/images/recipe1.jpg', // Añadir imágenes de recetas aquí
    '/images/recipe2.jpg',
    // Agregar más imágenes según sea necesario
];

// Instalación del service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Activación del service worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME, DATA_CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Manejo de peticiones
self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            caches.open(DATA_CACHE_NAME).then((cache) => {
                return fetch(event.request)
                    .then((response) => {
                        // Cacheamos la respuesta
                        cache.put(event.request, response.clone());
                        return response;
                    })
                    .catch(() => {
                        return cache.match(event.request);
                    });
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});