// public/service-worker.js

const CACHE_NAME = 'static-v1';
const Cache_Name = 'dynamic'
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',

];

self.addEventListener('install', (event) => {
    console.log('[Service Worker installing...', event);

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                const urlsToCachePromises = urlsToCache.map((url) => {
                    return cache.add(url)
                        .catch((error) => {
                            console.error(`Failed to cache ${url}:`, error);
                            // Return a promise to keep the overall Promise.all chain working
                            return Promise.resolve();
                        });
                });

                // Wait for all caching promises to complete
                return Promise.all(urlsToCachePromises);
            })
            .catch((error) => {
                console.error('Error opening cache:', error);
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker activated...', event)

    return self.clients.claim();
});

//Cache then Network Strategy
//Dynamic Cache with Network Fallback-> If its in the cache load it, if not, go to network and afterwards put it in the cache
self.addEventListener('fetch', (event) => {

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    console.log('[Service Worker] In Cache available:', event.request.url);
                    return response;
                } else {
                    console.log('[Service Worker] Not in Cache. Fetching from network:', event.request.url);

                    return fetch(event.request)
                        .then((networkResponse) => {
                            // Check if the response is valid and cacheable
                            if (networkResponse && networkResponse.status === 200) {
                                const responseToCache = networkResponse.clone();

                                // Open the cache and add the response
                                caches.open(Cache_Name)
                                    .then((cache) => {
                                        cache.put(event.request, responseToCache);
                                        console.log('[Succesfully put in Cache]')
                                    });
                            }

                            return networkResponse;
                        })
                        .catch((error) => {
                            console.error('Fetch failed:', error);
                        });
                }
            })
    );
});







