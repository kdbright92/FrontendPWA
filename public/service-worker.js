// public/service-worker.js

const CACHE_NAME = 'my-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/App.js'
    // Add other URLs you want to cache
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return the response from the cache
                if (response) {
                    return response;
                }

                // Not in cache - fetch the resource from the network
                return fetch(event.request);
            })
    );
});
