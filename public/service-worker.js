// public/service-worker.js


const CACHE_VERSION = 'static-v2';
const Cache_Name = 'dynamic';


const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
];


const getAuthToken = () => {
    const userData = localStorage.getItem('user');

    // Check if userData is not null or undefined
    if (userData) {
        const userObj = JSON.parse(userData);

        // Check if the userObj has a token property
        if (userObj && userObj.token) {
            console.log(userObj.token)

            return userObj.token;


        }
        else { console.log("fuck") }
    }


};
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

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200 && event.request.method === 'POST') {
                    // If it's a POST request, trigger background sync
                    event.waitUntil(
                        self.registration.sync.register(SYNC_TAG)
                    );
                } else if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
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
                console.error('Fetch failed:', error);
                return caches.match(event.request);
            })
    );
});


self.addEventListener('sync', (event) => {
    console.log('Sync event triggered');

    const syncData = async () => {
        const offlineData = JSON.parse(localStorage.getItem('offlinePosts')) || [];
        const token = getAuthToken();

        // Loop through offline data and sync with the server
        for (const data of offlineData) {
            try {
                // Perform the server sync here (similar to your axios.post logic)
                const response = await fetch('https://localhost:8443/api/post/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    // Remove the synced data from local storage
                    const updatedOfflineData = offlineData.filter((d) => d !== data);
                    localStorage.setItem('offlineData', JSON.stringify(updatedOfflineData));
                }
            } catch (error) {
                console.error('Sync failed:', error);
            }
        }
    };

    event.waitUntil(syncData());
});







