importScripts('https://www.gstatic.com/firebasejs/12.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging-compat.js');


firebase.initializeApp({
  apiKey: "AIzaSyCod1_H1HEGw2wUg3lzkC1OCKNfzQ17eho",
  authDomain: "menupriceshub-964c0.firebaseapp.com",
  projectId: "menupriceshub-964c0",
  storageBucket: "menupriceshub-964c0.firebasestorage.app",
  messagingSenderId: "846490180206",
  appId: "1:846490180206:web:dfac3b25ad118c0810e47f"
});

const messaging = firebase.messaging();

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  let url = '/';

  if (
    event.notification.data &&
    event.notification.data.FCM_MSG &&
    event.notification.data.FCM_MSG.data &&
    event.notification.data.FCM_MSG.data.url
  ) {
    url = event.notification.data.FCM_MSG.data.url;
  }

  event.waitUntil(
    clients.openWindow(url)
  );
});
