// public/service-worker.js

const CACHE_NAME = 'my-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',


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
                    // Update cache in the background
                    fetchAndUpdateCache(event.request);
                    return response;
                }

                // Not in cache - fetch the resource from the network
                return fetch(event.request)
                    .then((response) => {
                        // Clone the response to store it in the cache
                        const clonedResponse = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                // Cache the fetched resource
                                cache.put(event.request, clonedResponse);
                            });

                        return response;
                    })
                    .catch((error) => {
                        console.error('Error fetching and caching:', error);
                    });
            })
    );
});


async function fetchAndUpdateCache(request) {
    try {
        const response = await fetch(request);
        if (response.status === 200) {
            // Clone the response to store it in the cache
            const clonedResponse = response.clone();

            caches.open(CACHE_NAME)
                .then((cache) => {
                    // Update the cache with the new response
                    cache.put(request, clonedResponse);
                });
        }
    } catch (error) {
        console.error('Error updating cache:', error);
    }
}