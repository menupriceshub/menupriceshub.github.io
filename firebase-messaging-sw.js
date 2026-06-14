importScripts('https://www.gstatic.com/firebasejs/12.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBjziH0t9bWHu8Dx4orVck0ie_WyeC9pcY",
  authDomain: "menupriceshub-a1b55.firebaseapp.com",
  projectId: "menupriceshub-a1b55",
  storageBucket: "menupriceshub-a1b55.firebasestorage.app",
  messagingSenderId: "602825616043",
  appId: "1:602825616043:web:b22d9cc478f798c4c1a5ee"
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
