// === FIREBASE IMPORTS ===
importScripts("https://www.gstatic.com/firebasejs/12.14.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCod1_H1HEGw2wUg3lzkC1OCKNfzQ17eho",
  authDomain: "menupriceshub-964c0.firebaseapp.com",
  projectId: "menupriceshub-964c0",
  storageBucket: "menupriceshub-964c0.firebasestorage.app",
  messagingSenderId: "846490180206",
  appId: "1:846490180206:web:dfac3b25ad118c0810e47f"
});

const messaging = firebase.messaging();

// === CACHING ===
const CACHE_NAME = "menupriceshub-v1";
const urlsToCache = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match("/index.html"))
  );
});

// === PUSH NOTIFICATIONS ===
self.addEventListener("push", function(event) {
  let payload = {};
  try { payload = event.data.json(); } catch(e) {}

  const title = payload.data?.title || payload.notification?.title || "MenuPricesHub";
  const options = {
    body: payload.data?.body || payload.notification?.body || "",
    icon: payload.data?.icon || "/icon-192x192.png",
    badge: payload.data?.badge || "/badge-72x72.png",
    data: { url: payload.data?.url || "/" },
    vibrate: [200, 100, 200],
    requireInteraction: true
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// === NOTIFICATION CLICK ===
self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url === url && "focus" in client) return client.focus();
        }
        return clients.openWindow(url);
      })
  );
});
