<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging.js";
import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

// ---------------- CONFIG ----------------
const firebaseConfig = {
  apiKey: "AIzaSyCod1_H1HEGw2wUg3lzkC1OCKNfzQ17eho",
  authDomain: "menupriceshub-964c0.firebaseapp.com",
  projectId: "menupriceshub-964c0",
  storageBucket: "menupriceshub-964c0.firebasestorage.app",
  messagingSenderId: "846490180206",
  appId: "1:846490180206:web:dfac3b25ad118c0810e47f"
};

const VAPID_KEY = "BMF7VaLIylgT6m6g1LQi6V2Z0T5huntAO4rGEA_IRO40YjYpZkwBqg1o9g93RvLIO0-w0V-r5ffPr3C6XXAp5SA";

// ---------------- INIT ----------------
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);

// ---------------- SERVICE WORKER (registered once) ----------------
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/firebase-messaging-sw.js")
    .then(() => console.log("Service Worker Registered"))
    .catch(err => console.error(err));
}

// ---------------- LOCATION HELPER ----------------
async function getLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

// ---------------- SAVE SUBSCRIBER (shared by click + auto-save) ----------------
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

// ---------------- COUNT ----------------
async function updateCount() {
  const snapshot = await getDocs(collection(db, "subscribers"));
  const countEl = document.getElementById("count");
  if (countEl) countEl.innerText = snapshot.size;
}

// ---------------- NOTIFY BUTTON CLICK ----------------
const notifyBtn = document.getElementById("notifyBtn");
if (notifyBtn) {
  notifyBtn.addEventListener("click", async () => {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("Permission Denied ❌");
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
        alert("Notifications Enabled ✅");
        updateCount();

        notifyBtn.innerHTML = `
          <a href="https://menupriceshub.github.io/notifications.html">
            <i class="fa-regular fa-bell bell-icon"></i>
          </a>`;
      } else {
        alert("Token not generated ❌");
      }
    } catch (error) {
      console.error(error);
    }
  });
}

// ---------------- AUTO SAVE IF ALREADY GRANTED ----------------
async function autoSave() {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    console.log("Notification permission not granted");
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
      console.log("Token Saved (auto):", token);
    } else {
      console.log("No token generated");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

// ---------------- STATUS BADGE ----------------
function updateNotificationStatus() {
  const badge = document.getElementById("notifyStatus");
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

// ---------------- INITIAL LOAD ----------------
updateCount();
updateNotificationStatus();
window.addEventListener("load", autoSave);
</script>
