// indexedDB.mjs

import { openDB } from 'idb';

export function openDatabase() {
    return openDB('pwa', 1, (upgradeDb) => {
        console.log('Object store names:', upgradeDb.objectStoreNames);
        if (!upgradeDb.objectStoreNames.contains('pwa')) {
            const store = upgradeDb.createObjectStore('pwa', { keyPath: 'id', autoIncrement: true });
            console.log('Object store created:', store);
        }
    });
}

export function addItem(item) {
    return openDatabase().then((db) => {
        const tx = db.transaction('pwa', 'readwrite');
        const store = tx.objectStore('pwa');
        return store.add(item);
    });
}

export function getAllItems() {
    return openDatabase().then((db) => {
        const tx = db.transaction('pwa', 'readonly');
        const store = tx.objectStore('pwa');
        return store.getAll();
    });
}
