<script type="module">
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

// INIT
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);

// SERVICE WORKER
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
  .then(() => console.log("SW Registered"))
  .catch(err => console.log(err));
}

// ENABLE NOTIFICATIONS
document.getElementById("notifyBtn").addEventListener("click", async () => {

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    alert("Permission Denied ❌");
    return;
  }

  try {

    const registration = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: "BMF7VaLIylgT6m6g1LQi6V2Z0T5huntAO4rGEA_IRO40YjYpZkwBqg1o9g93RvLIO0-w0V-r5ffPr3C6XXAp5SA",
      serviceWorkerRegistration: registration
    });

    if (token) {

      // SAVE TOKEN
      await setDoc(doc(db, "subscribers", token), {
        token: token,
        status: "active",
        createdAt: new Date()
      });

      alert("Notifications Enabled ✅");
      updateCount();

    } else {
      alert("Token not generated ❌");
    }

  } catch (error) {
    console.error(error);
  }

});

// COUNT FUNCTION
async function updateCount() {
  const snapshot = await getDocs(collection(db, "subscribers"));
  document.getElementById("count").innerText = snapshot.size;
}

// LOAD COUNT ON START
updateCount();

</script>


