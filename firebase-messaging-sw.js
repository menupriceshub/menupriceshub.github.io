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

// ✅ Raw push event directly handle karo — Firebase ke upar depend mat raho
self.addEventListener("push", function(event) {
  let payload = {};

  try {
    payload = event.data.json();
  } catch (e) {
    console.error("Push parse error:", e);
  }

  const title =
    payload.data?.title ||
    payload.notification?.title ||
    "MenuPricesHub";

  const options = {
    body: payload.data?.body || payload.notification?.body || "",
    icon: payload.data?.icon || "/icon-192x192.png",
    badge: payload.data?.badge || "/badge-72x72.png",
    image: payload.data?.image || "",
    data: { url: payload.data?.url || "/" },
    vibrate: [200, 100, 200],
    requireInteraction: true
  };

  // ✅ event.waitUntil() zaroor lagao
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Firebase ko bhi register rakho (foreground ke liye)
messaging.onBackgroundMessage((payload) => {
  console.log("Background Message received:", payload);
  // Yahan kuch return mat karo — upar wala handler handle kar raha hai
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
        return clients.openWindow(url);
      })
  );
});
