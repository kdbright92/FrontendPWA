// public/service-worker.js


const CACHE_VERSION = 'static-v2';
const Cache_Name = 'dynamic';
const SYNC_TAG = 'sync-data';
const DB_NAME = 'offlineDataDB';
const STORE_NAME = 'offlineDataStore';

const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
];
async function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

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
});



self.addEventListener('sync', (event) => {
    console.log('Sync event triggered');

    const syncData = async () => {
        try {
            const offlineData = await getOfflineData();
            const token = getAuthToken();
            console.log(token);

            for (const data of offlineData) {
                try {
                    const response = await fetch('https://localhost:8443/api/post/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(data),
                    });

                    if (response.ok) {
                        await removeOfflineData(data.id);
                    }
                } catch (error) {
                    console.error('Sync failed:', error);
                }
            }
        } catch (error) {
            console.error('Error retrieving offline data:', error);
        }
    };

    syncData();
});


// Example functions for IndexedDB storage
async function addOfflineData(data) {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.add(data);
}

// Get all data from the IndexedDB store
async function getOfflineData() {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const data = await store.getAll();
    return data;
}

// Remove data from the IndexedDB store
async function removeOfflineData(id) {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(id);
}










