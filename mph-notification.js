import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getCountFromServer
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

// =========================
// CONFIG (single source of truth)
// =========================
const firebaseConfig = {
  apiKey: "AIzaSyCod1_H1HEGw2wUg3lzkC1OCKNfzQ17eho",
  authDomain: "menupriceshub-964c0.firebaseapp.com",
  projectId: "menupriceshub-964c0",
  storageBucket: "menupriceshub-964c0.firebasestorage.app",
  messagingSenderId: "846490180206",
  appId: "1:846490180206:web:dfac3b25ad118c0810e47f"
};

const VAPID_KEY =
  "BMF7VaLIylgT6m6g1LQi6V2Z0T5huntAO4rGEA_IRO40YjYpZkwBqg1o9g93RvLIO0-w0V-r5ffPr3C6XXAp5SA";

// =========================
// SINGLE INIT (fixes "Firebase App already exists" error)
// =========================
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);

// =========================
// SERVICE WORKER (registered once)
// =========================
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((err) => console.error("SW registration failed:", err));
}

// =========================
// LOCATION LOOKUP
// Note: ipapi.co free tier is rate-limited; failures are handled gracefully.
// Consider asking user consent before collecting IP/location data.
// =========================
async function getLocation() {
  try {
    const res = await fetch("https://ipwho.is/");
    if (!res.ok) throw new Error(`ipwho responded ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error("lookup unsuccessful");

    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country_name: data.country,
      latitude: data.latitude,
      longitude: data.longitude
    };
  } catch (e) {
    console.warn("Location lookup failed:", e);
    return null;
  }
}

// =========================
// SAVE SUBSCRIBER (merge so repeated calls update, not duplicate)
// =========================
async function saveSubscriber(token) {
  const loc = await getLocation();

  const data = {
    token,
    status: "active",

    website: location.origin,
    pageUrl: location.href,
    pagePath: location.pathname,
    pageTitle: document.title,

    ip: loc?.ip || "N/A",
    city: loc?.city || "N/A",
    region: loc?.region || "N/A",
    country: loc?.country_name || "N/A",
    latitude: loc?.latitude ?? "N/A",
    longitude: loc?.longitude ?? "N/A",

    userAgent: navigator.userAgent,
    lastVisit: new Date().toISOString(),
    timestamp: Date.now()
  };

  try {
    await setDoc(doc(db, "subscribers", token), data, { merge: true });
    console.log("Subscriber saved:", token);
  } catch (err) {
    console.error("Failed to save subscriber:", err);
  }
}

// =========================
// SUBSCRIBER COUNT
// Uses getCountFromServer (aggregate query) instead of downloading
// every document just to count them — much cheaper and faster.
// =========================
async function updateCount() {
  const countEl = document.getElementById("count");
  if (!countEl) return;

  try {
    const snapshot = await getCountFromServer(collection(db, "subscribers"));
    countEl.innerText = snapshot.data().count;
  } catch (err) {
    console.error("Failed to fetch subscriber count:", err);
  }
}

// =========================
// NOTIFICATION STATUS BADGE
// =========================
function updateNotificationStatus() {
  const badge = document.getElementById("notifyStatus");
  const notifyBtn = document.getElementById("notifyBtn");

  if (!badge) return;

  if (!("Notification" in window)) {
    badge.innerHTML = '<i class="fas fa-times-circle" style="color:red"></i>';
    return;
  }

  if (Notification.permission === "granted") {
    badge.innerHTML = '<i class="fas fa-check-circle" style="color:#28a745"></i>';
    if (notifyBtn) notifyBtn.style.animation = "none";
  } else {
    badge.innerHTML = '<i class="fas fa-times-circle" style="color:red"></i>';
  }
}

// =========================
// TOOLTIP HELPER
// (Assumes a showTooltip function exists elsewhere on the page.
// Falls back to console log if not defined, to avoid a hard crash.)
// =========================
function notifyTooltip(message) {
  if (typeof showTooltip === "function") {
    showTooltip(message);
  } else {
    console.log("Tooltip:", message);
  }
}

// =========================
// ENABLE NOTIFICATIONS (button click)
// =========================
function bindNotifyButton() {
  const notifyBtn = document.getElementById("notifyBtn");
  if (!notifyBtn) return;

  notifyBtn.addEventListener("click", async () => {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      notifyTooltip("Permission Denied ❌");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration
      });

      if (!token) {
        alert("Token not generated ❌");
        return;
      }

      await saveSubscriber(token);
      notifyTooltip("Notifications Enabled ✅");
      await updateCount();
      updateNotificationStatus();

      notifyBtn.innerHTML = `
        <a href="https://menupriceshub.github.io/notifications.html"
           style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">
          <i class="fa-regular fa-bell bell-icon"></i>
        </a>`;
    } catch (error) {
      console.error("Enable notifications failed:", error);
    }
  });
}

// =========================
// AUTO SAVE IF PERMISSION ALREADY GRANTED
// (e.g. returning visitor who already allowed notifications)
// =========================
async function autoSave() {
  if (Notification.permission !== "granted") {
    console.log("Notification permission not granted, skipping auto-save");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });

    if (token) {
      await saveSubscriber(token);
    } else {
      console.log("No token generated during auto-save");
    }
  } catch (err) {
    console.error("Auto-save error:", err);
  }
}

// =========================
// UNREAD NOTIFICATIONS BADGE
// =========================
async function checkNotifications() {
  const badge = document.getElementById("badge");
  if (!badge) return;

  try {
    const res = await fetch("notifications.json?t=" + Date.now());
    const data = await res.json();

    const total = data.notifications.length;
    const seenCount = Number(localStorage.getItem("seenCount") || 0);
    const unread = total - seenCount;

    if (unread > 0) {
      badge.style.display = "block";
      badge.textContent = unread;
    } else {
      badge.style.display = "none";
    }
  } catch (err) {
    console.error("Failed to check notifications:", err);
  }
}

// =========================
// INIT ON LOAD
// =========================
window.addEventListener("load", () => {
  bindNotifyButton();
  updateNotificationStatus();
  updateCount();
  autoSave();
  checkNotifications();
});
