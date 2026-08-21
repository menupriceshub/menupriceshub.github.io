/* =========================================================
   NOTIFICATION WIDGET (Firebase Push Notifications)
   Usage:
   Header widget ke baad ye script add karo:
   <script type="module" src="notification-widget.js"></script>

   Requires in HTML (header-widget.js already isse bana deta hai):
   - <div id="notifyBtn"> ... <span id="notifyStatus"></span> <span id="badge"></span> </div>

   Note: Ye sirf HTTPS ya localhost pe kaam karega (Notification API restriction).
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging.js";
import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);

/* =========================================================
   SERVICE WORKER REGISTER
========================================================= */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/firebase-messaging-sw.js")
    .then(() => console.log("Notification SW Registered"))
    .catch(err => console.error("SW Error:", err));
}

/* =========================================================
   TOOLTIP HELPER
========================================================= */
function showTooltip(message, duration = 2500) {
  const tip = document.getElementById("customTooltip");
  if (!tip) return;
  tip.innerText = message;
  tip.classList.add("show");
  clearTimeout(tip._timer);
  tip._timer = setTimeout(() => tip.classList.remove("show"), duration);
}

/* =========================================================
   GET IP LOCATION
========================================================= */
async function getLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    return await res.json();
  } catch (e) {
    console.error("Location fetch failed:", e);
    return null;
  }
}

/* =========================================================
   SAVE SUBSCRIBER TO FIRESTORE
========================================================= */
async function saveSubscriber(token) {
  const loc = await getLocation();

  const data = {
    token: token,
    status: "active",

    website: location.origin,
    pageUrl: location.href,
    pagePath: location.pathname,
    pageTitle: document.title,

    ip: loc?.ip || "N/A",
    city: loc?.city || "N/A",
    region: loc?.region || "N/A",
    country: loc?.country_name || "N/A",
    latitude: loc?.latitude || "N/A",
    longitude: loc?.longitude || "N/A",

    userAgent: navigator.userAgent,
    lastVisit: new Date().toISOString(),
    timestamp: Date.now()
  };

  await setDoc(doc(db, "subscribers", token), data, { merge: true });
  console.log("Subscriber Saved:", data);
}

/* =========================================================
   UPDATE NOTIFICATION STATUS ICON (bell ke corner wala dot)
========================================================= */
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

/* =========================================================
   UNREAD COUNT BADGE (subscribers count wala #count nahi,
   ye notifications.json wala unread count hai)
========================================================= */
async function checkUnreadNotifications() {
  try {
    const res = await fetch("/data/notifications.json?t=" + Date.now());
    const data = await res.json();

    const total = data.notifications.length;
    const seenCount = Number(localStorage.getItem("seenCount") || 0);
    const unread = total - seenCount;

    const badge = document.getElementById("badge");
    if (!badge) return;

    if (unread > 0) {
      badge.style.display = "block";
      badge.textContent = unread;
    } else {
      badge.style.display = "none";
    }
  } catch (err) {
    console.error("Unread notifications check failed:", err);
  }
}

/* =========================================================
   TOTAL SUBSCRIBER COUNT (agar page pe #count element ho)
========================================================= */
async function updateCount() {
  try {
    const snapshot = await getDocs(collection(db, "subscribers"));
    const countEl = document.getElementById("count");
    if (countEl) countEl.innerText = snapshot.size;
  } catch (err) {
    console.error("Count fetch failed:", err);
  }
}

/* =========================================================
   ENABLE NOTIFICATIONS (bell click handler)
   Event delegation use kiya — chahe #notifyBtn baad me
   header-widget.js se inject ho, tab bhi kaam karega.
========================================================= */
document.addEventListener("click", async (e) => {

  const notifyBtn = e.target.closest("#notifyBtn");
  if (!notifyBtn) return;

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    showTooltip("Permission Denied ❌");
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

    showTooltip("Notifications Enabled ✅");
    updateCount();
    updateNotificationStatus();

    notifyBtn.innerHTML = `
      <a href="https://menupriceshub.github.io/notifications.html" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">
        <i class="fa-regular fa-bell bell-icon"></i>
      </a>`;

  } catch (error) {
    console.error("Notification enable error:", error);
    showTooltip(" Error console check karo ❌");
  }

});

/* =========================================================
   AUTO SAVE IF PERMISSION ALREADY GRANTED (silent, page load pe)
========================================================= */
async function autoSave() {
  if (Notification.permission !== "granted") {
    console.log("Notification permission not granted yet");
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
      console.log("Token Auto-Saved:", token);
    } else {
      console.log("No token generated on auto-save");
    }
  } catch (err) {
    console.error("Auto-save error:", err);
  }
}

/* =========================================================
   INIT ON LOAD
========================================================= */
window.addEventListener("load", () => {
  updateNotificationStatus();
  checkUnreadNotifications();
  updateCount();
  autoSave();
});
