// public/service-worker.js


const CACHE_VERSION = 'static-v2';
const Cache_Name = 'dynamic';


const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
];



self.addEventListener('install', (event) => {
    console.log('[Service Worker installing...', event);

    event.waitUntil(
        caches.open(`${CACHE_VERSION}`)
            .then((cache) => {
                const urlsToCachePromises = urlsToCache.map((url) => {
                    return cache.add(url)
                        .catch((error) => {
                            console.error(`Failed to cache ${url}:`, error);
                            return Promise.resolve();
                        });
                });

                return Promise.all(urlsToCachePromises);
            })
            .catch((error) => {
                console.error('Error opening cache:', error);
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker activated...', event);

    // Delete old caches
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== `${CACHE_VERSION}`) {
                            return caches.delete(cacheName);
                        }
                        return null;
                    })
                );
            })
    );

    return self.clients.claim();
});

/* //Network first then Cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                if (event.request.method === 'POST' && networkResponse && networkResponse.status !== 200) {
                    // If it's a POST request and it failed, check online status before triggering background sync
                    console.log('Failed Post');

                    if (navigator.onLine) {
                        // If online, trigger background sync
                        event.waitUntil(
                            self.registration.sync.register(SYNC_TAG)
                        );
                    }
                    else {
                        // If offline, manually trigger sync when back online
                        navigator.serviceWorker.ready.then(function (swRegistration) {
                            return swRegistration.sync.register(SYNC_TAG);
                        });
                    }
                } else if (event.request.method === 'GET' && networkResponse && networkResponse.status === 200) {
                    // If it's a GET request with a successful response, cache the response
                    const responseToCache = networkResponse.clone();

                    caches.open(Cache_Name)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                            console.log('[Successfully put in Cache]');
                        });
                }

                return networkResponse;
            })
            .catch((error) => {
                // If the fetch fails, log an error
                console.error('Fetch failed:', error);

                //riggering background sync for failed POST requests

                event.waitUntil(
                    self.registration.sync.register(SYNC_TAG)
                );


                // Attempt to return a cached response
                return caches.match(event.request);
            })
    );
}); */



//Cache first then Network, then put the response in the cache
/* self.addEventListener('fetch', (event) => {
    if (event.request.method === 'POST') {
        // Let the request go directly to the network without caching
        return fetch(event.request);
    }
    event.respondWith(
        caches.match(event.request).then((cacheResponse) => {
            // If the response is in the cache, return it
            if (cacheResponse) {
                return cacheResponse;
            }

            // If the response is not in the cache, fetch from the network
            return fetch(event.request)
                .then((networkResponse) => {
                    // Check if the network response is valid (status 200) before caching
                    if (event.request.method === 'GET' && networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        // Open the cache and put the response

                        caches.open(Cache_Name)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                                console.log('[Successfully put in Cache]');
                            });
                    }

                    return networkResponse;
                })
                .catch((error) => {
                    // If the fetch fails, log an error and return a fallback response
                    console.error('Fetch failed:', error);
                    return new Response('Offline fallback response');
                });

        })
    );
}); */

self.addEventListener('fetch', (event) => {
    if (event.request.method === 'GET') {
        // For GET requests, try to respond from the cache first
        event.respondWith(
            caches.match(event.request).then((cacheResponse) => {
                // If the response is in the cache, return it
                if (cacheResponse) {
                    return cacheResponse;
                }

                // If the response is not in the cache, fetch from the network
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Check if the network response is valid (status 200) before caching
                        if (event.request.method === 'GET' && networkResponse && networkResponse.status === 200) {
                            const responseToCache = networkResponse.clone();
                            // Open the cache and put the response
                            caches.open(Cache_Name)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                    console.log('[Successfully put in Cache]');
                                });
                        }

                        return networkResponse;
                    })
                    .catch((error) => {
                        // If the fetch fails, log an error and return a fallback response
                        console.error('Fetch failed:', error);
                        return new Response('Offline fallback response');
                    });
            })
        );
    } else if (event.request.method === 'POST') {
        // For POST requests, fetch from the network and cache the response
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    // Check if the network response is valid (status 200) before caching
                    if (event.request.method === 'POST' && networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        // Open the cache and put the response
                        caches.open(Cache_Name)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                                console.log('[Successfully put POST response in Cache]');
                            });
                    }

                    return networkResponse;
                })
                .catch((error) => {
                    console.error('POST request failed:', error);
                    // You may want to customize the response for failed POST requests
                    return new Response('Post request failed.');
                })
        );
    }
});


















