const CACHE_NAME = "menupriceshub-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/offline.html",
  "/css/style.css",
  "/js/app.js",
  "/favicon.ico"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => caches.match("/offline.html"))
      );
    })
  );
});

// 🔔 Push Notification aane par
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data.json();
  } catch (err) {
    data = { title: "New Notification", body: event.data ? event.data.text() : "" };
  }

  // 1. System notification dikhao (tray me)
  event.waitUntil(
    self.registration.showNotification(data.title || "MenuPricesHub", {
      body: data.body || "",
      icon: "/favicon.ico"
    })
  );

  // 2. Khuli hui tabs ko batao ki naya push aaya (badge update karne ke liye)
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ type: "NEW_NOTIFICATION" });
      });
    })
  );
});

// Notification pe click hone par (optional but useful)
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientsArr) => {
      if (clientsArr.length > 0) {
        clientsArr[0].focus();
      } else {
        clients.openWindow("/notification.html");
      }
    })
  );
});
