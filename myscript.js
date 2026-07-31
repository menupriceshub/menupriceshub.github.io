
const path = location.pathname
  .replace(".html", "")
  .split("/")
  .filter(Boolean);

let itemList = [{
  "@type": "ListItem",
  "position": 1,
  "name": "Home",
  "item": location.origin + "/"
}];

let url = location.origin;

path.forEach((part, index) => {
  url += "/" + part;

  itemList.push({
    "@type": "ListItem",
    "position": index + 2,
    "name": part.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
    "item": url + ".html"
  });
});

const schema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": itemList
};

const script = document.createElement("script");
script.type = "application/ld+json";
script.text = JSON.stringify(schema);
document.head.appendChild(script);

/* MENU TOGGLE */

const menuBtn =
document.getElementById("menuToggle");

const navMenu =
document.getElementById("navMenu");

menuBtn.addEventListener("click",()=>{

menuBtn.classList.toggle("active");

navMenu.classList.toggle("active");

});

/* CLOSE MENU ON LINK CLICK */

document.querySelectorAll(".nav-menu a")
.forEach(link=>{

link.addEventListener("click",()=>{

menuBtn.classList.remove("active");

navMenu.classList.remove("active");

});

});

/* CLOSE WHEN CLICK OUTSIDE */

document.addEventListener("click",(e)=>{

if(
!menuBtn.contains(e.target)
&&
!navMenu.contains(e.target)
){

menuBtn.classList.remove("active");

navMenu.classList.remove("active");

}

});

(function(){

const container = document.getElementById("breadcrumb");

const path = window.location.pathname
.replace(/^\/|\/$/g,"")
.split("/")
.filter(Boolean);

let html = '<a href="/">Home</a>';

let currentPath = "";

path.forEach((part,index)=>{

currentPath += "/" + part;

let name = part
.replace(".html","")
.replace(/[-_]/g," ")
.replace(/\b\w/g,c=>c.toUpperCase());

html += '<span class="separator">â€º</span>';

if(index === path.length-1){
html += '<span>'+name+'</span>';
}else{
html += '<a href="'+currentPath+'/">'+name+'</a>';
}

});

container.innerHTML = html;

})();

document.addEventListener(
"DOMContentLoaded", ()=>{

  /* =========================
     WHICH SECTION IMAGES?
  ========================= */

  const targetSection =
  document.querySelector("#photos");
  
  // Example:
  // "#photos"
  // ".gallery"
  // "#menu"
  // ".post-body"



  if(!targetSection) return;



  /* =========================
     GET ALL IMAGES
  ========================= */

  const images =
  targetSection.querySelectorAll("img");



  if(images.length === 0) return;



  /* =========================
     CREATE SLIDER
  ========================= */

  const slider =
  document.createElement("div");

  slider.className =
  "photo-slider";



  const track =
  document.createElement("div");

  track.className =
  "photo-track";



  images.forEach((img)=>{

    const slide =
    document.createElement("div");

    slide.className =
    "photo-slide";



    const image =
    document.createElement("img");

    /* AUTO FETCH IMAGE URL */

    image.src = img.src;

    image.alt =
    img.alt || "Photo";



    slide.appendChild(image);

    track.appendChild(slide);

  });



  slider.appendChild(track);



  /* =========================
     DOTS
  ========================= */

  const dotsWrap =
  document.createElement("div");

  dotsWrap.className =
  "slider-dots";



  images.forEach((_,i)=>{

    const dot =
    document.createElement("span");

    if(i === 0){

      dot.classList.add(
        "active"
      );

    }

    dotsWrap.appendChild(dot);

  });



  slider.appendChild(dotsWrap);



  /* =========================
     SHOW SLIDER
  ========================= */

  const sliderBox =
  document.querySelector(
    ".auto-slider"
  );



  if(sliderBox){

    sliderBox.appendChild(
      slider
    );

  }



  /* =========================
     SLIDER LOGIC
  ========================= */

  let current = 0;

  const total = images.length;



  function updateSlider(){

    track.style.transform =
    `translateX(-${current * 100}%)`;



    dotsWrap
    .querySelectorAll("span")
    .forEach((dot,index)=>{

      dot.classList.toggle(
        "active",
        index === current
      );

    });

  }



  /* =========================
     AUTO SLIDE
  ========================= */

  function nextSlide(){

    current =
    (current + 1) % total;

    updateSlider();

  }



  let autoSlide =
  setInterval(nextSlide,4000);



  /* =========================
     TOUCH SWIPE
  ========================= */

  let startX = 0;

  let moveX = 0;



  slider.addEventListener(
    "touchstart",
    (e)=>{

      startX =
      e.touches[0].clientX;

      clearInterval(autoSlide);

    }
  );



  slider.addEventListener(
    "touchmove",
    (e)=>{

      moveX =
      e.touches[0].clientX;

    }
  );



  slider.addEventListener(
    "touchend",
    ()=>{

      let diff =
      startX - moveX;



      if(diff > 50){

        current =
        (current + 1) % total;

      }

      else if(diff < -50){

        current =
        (current - 1 + total)
        % total;

      }



      updateSlider();



      autoSlide =
      setInterval(
        nextSlide,
        4000
      );

    }
  );

});

const text = document.getElementById("overviewText");
const btn = document.getElementById("readBtn");

const collapsedHeight = 140;

// Word count check
const wordCount = text.innerText.trim().split(/\s+/).length;

if(wordCount <= 100){
    // 100 ya kam words hai
    btn.style.display = "none";
    text.classList.remove("collapsed");
    text.style.maxHeight = "none";

}else{
    // 100 se zyada words hai
    text.style.maxHeight = collapsedHeight + "px";

    btn.addEventListener("click", () => {

        if (text.classList.contains("collapsed")) {

            text.classList.remove("collapsed");
            text.style.maxHeight = text.scrollHeight + "px";

            text.addEventListener("transitionend", function handler() {
                text.style.maxHeight = "none";
                text.removeEventListener("transitionend", handler);
            });

            btn.textContent = "Read Less";

        } else {

            text.style.maxHeight = text.scrollHeight + "px";

            requestAnimationFrame(() => {
                text.classList.add("collapsed");
                text.style.maxHeight = collapsedHeight + "px";
            });

            btn.textContent = "Read More";
        }

    });
}

const overlay = document.getElementById("overlay2");
const fullImg = document.getElementById("fullImg");
const closeBtn = document.getElementById("close");

// Dynamic images ke liye
document.getElementById("photos2").addEventListener("click", function(e){
  if(e.target.tagName === "IMG"){
    fullImg.src = e.target.src;
    overlay.style.display = "flex";
  }
});

// Close button
closeBtn.addEventListener("click", function(){
  overlay.style.display = "none";
});

// Click outside image
overlay.addEventListener("click", function(e){
  if(e.target === overlay){
    overlay.style.display = "none";
  }
});

// ESC key
document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){
    overlay.style.display = "none";
  }
});

let ratingText = document.getElementById("card-rating-info1").innerText;
let rating = parseFloat(ratingText);

let fullStars = Math.floor(rating);
let halfStar = (rating % 1) >= 0.5;

let stars = "";

for (let i = 1; i <= 5; i++) {

  if (i <= fullStars) {
    stars += '<i class="fa-solid fa-star"></i>';
  }
  else if (i === fullStars + 1 && halfStar) {
    stars += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  else {
    stars += '<i class="fa-regular fa-star"></i>';
  }

}

document.querySelector(".rating-stars").innerHTML = stars;

let ratingText = document.getElementById("card-rating-info1").innerText;
let rating = parseFloat(ratingText);

let fullStars = Math.floor(rating);
let halfStar = (rating % 1) >= 0.5;

let stars = "";

for (let i = 1; i <= 5; i++) {

  if (i <= fullStars) {
    stars += '<i class="fa-solid fa-star"></i>';
  }
  else if (i === fullStars + 1 && halfStar) {
    stars += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  else {
    stars += '<i class="fa-regular fa-star"></i>';
  }

}

document.querySelector(".rating-stars").innerHTML = stars;

const slug = location.pathname.split("/").pop().replace(".html", "").toLowerCase() || "chipotle";

fetch("/data/faq.json")
  .then(res => res.json())
  .then(data => {
    const page = data.find(item =>
      slug.includes(item.slug.toLowerCase())
    );

    if (!page) return;

    const grid = document.getElementById("faq-grid1");
    grid.innerHTML = "";

    page.faq.slice(0, 5).forEach(faq => {
      const item = document.createElement("div");
      item.className = "faq-item";
      item.innerHTML = `
        <div class="faq-question">
          ${faq.question}
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">
          ${faq.answer}
        </div>
      `;

      item.querySelector(".faq-question").addEventListener("click", () => {
        item.classList.toggle("active");
      });

      grid.appendChild(item);
    });
  })
  .catch(err => console.error("FAQ load failed:", err));

// Auto add thumbnail from link
document.querySelectorAll(".similar-card").forEach(async (card)=>{

  let link = card.querySelector("a");
  if(!link) return;

  let url = link.href;

  // Use link text as alt
  let titleText = link.textContent.trim();

  // Microlink API
  let api = "https://api.microlink.io/?url=" + encodeURIComponent(url);

  try{
    let res = await fetch(api);
    let data = await res.json();

    let imgUrl = data.data.image?.url;

    let img = document.createElement("img");
    img.src = imgUrl || "https://via.placeholder.com/50";

    // âœ… lazy loading add
    img.loading = "lazy";

    // âœ… alt text add
    img.alt = titleText || "thumbnail";

    img.style.width = "50px";
    img.style.height = "50px";
    img.style.objectFit = "cover";

    // insert image before text
    card.insertBefore(img, link);

  }catch(e){
    let img = document.createElement("img");
    img.src = "https://via.placeholder.com/50";

    img.loading = "lazy";
    img.alt = titleText || "thumbnail";

    card.insertBefore(img, link);
  }

});

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-tab");

const tabsContainer =
document.querySelector(".section-tabs");



/* =========================
AUTO CENTER FUNCTION
========================= */

function centerActiveTab(tab){

const left =
tab.offsetLeft
-
(tabsContainer.offsetWidth / 2)
+
(tab.offsetWidth / 2);

tabsContainer.scrollTo({
left:left,
behavior:"smooth"
});

}



/* =========================
ACTIVE TAB ON SCROLL
========================= */

window.addEventListener("scroll",()=>{

let current = "";

sections.forEach(section=>{

const sectionTop =
section.offsetTop;

if(pageYOffset >= sectionTop - 180){

current =
section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove(
"active-tab"
);

if(
link.getAttribute("href")
===
"#" + current
){

link.classList.add(
"active-tab"
);

/* AUTO CENTER */

centerActiveTab(link);

}

});

});



/* =========================
CLICK TAB CENTER
========================= */

navLinks.forEach(link=>{

link.addEventListener("click",()=>{

navLinks.forEach(item=>{

item.classList.remove(
"active-tab"
);

});

link.classList.add(
"active-tab"
);

centerActiveTab(link);

});

});



/* =========================
PAGE LOAD ACTIVE CENTER
========================= */

window.addEventListener("load",()=>{

const active =
document.querySelector(
".active-tab"
);

if(active){

setTimeout(()=>{

centerActiveTab(active);

},200);

}

});

const mobileBar = document.getElementById("mobileBar");

window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;
  const pageHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollPercent = (scrollTop / pageHeight) * 100;

  // 20% scroll ke baad show
  if(scrollPercent > 20){

    mobileBar.style.display = "flex";

    setTimeout(() => {
      mobileBar.classList.add("show");
    }, 10);

  } else {

    mobileBar.classList.remove("show");

    setTimeout(() => {
      mobileBar.style.display = "none";
    }, 350);

  }

});

function shareCurrentUrl() {
  const currentUrl = window.location.href;

  // Mobile/browser share support
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: currentUrl
    })
    .then(() => console.log("URL shared"))
    .catch(err => console.log("Error:", err));
  } else {
    // Fallback: copy URL
    navigator.clipboard.writeText(currentUrl);
    alert("URL copied: " + currentUrl);
  }
}

document.addEventListener("DOMContentLoaded",()=>{

if(window.innerWidth <= 768) return;

/* Desktop Only */

const nav = document.getElementById("navMenu");

if(!nav) return;

const links =
Array.from(nav.children)
.filter(el => el.tagName === "A");

if(links.length <= 5) return;

/* Create More Menu */

const moreMenu =
document.createElement("div");

moreMenu.className =
"more-menu";

moreMenu.innerHTML = `
<button class="more-btn">
More <i class="fa fa-angle-down"></i>
</button>
<div class="more-dropdown"></div>
`;

const dropdown =
moreMenu.querySelector(
".more-dropdown"
);

/* Move items after 5 */

links.slice(5).forEach(link=>{

dropdown.appendChild(link);

});

/* Add More Button */

nav.appendChild(moreMenu);

});

// Smooth scroll fix for Kiwi and older browsers
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId) || 
                   document.querySelector('[name="' + targetId + '"]');
      
      if (target) {
        e.preventDefault();
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - 160;
        
        // Try native smooth scroll first
        if ('scrollBehavior' in document.documentElement.style) {
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        } else {
          // Manual smooth scroll for Kiwi/older browsers
          var start = window.pageYOffset;
          var distance = targetPos - start;
          var duration = 600;
          var startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var ease = progress < 0.5 
              ? 2 * progress * progress 
              : -1 + (4 - 2 * progress) * progress;
            window.scrollTo(0, start + distance * ease);
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      }
    });
  });

document.querySelectorAll('.faq-question').forEach(question=>{

question.addEventListener('click',()=>{

question.parentElement.classList.toggle('active');

});

});

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    document.getElementById('installBtn').style.display = 'inline-block';
});

document.getElementById('installBtn').addEventListener('click', async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    console.log('Install Result:', outcome);

    deferredPrompt = null;
    document.getElementById('installBtn').style.display = 'none';
});

window.addEventListener('appinstalled', () => {
    alert('App Installed Successfully!');
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
        .then(reg => {
            console.log('Service Worker Registered');
        })
        .catch(err => {
            console.log('SW Error:', err);
        });
    });
}

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

// GET LOCATION FUNCTION
async function getLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    return await res.json();
  } catch (e) {
    return null;
  }
}

// ENABLE NOTIFICATIONS
document.getElementById("notifyBtn").addEventListener("click", async () => {

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    showTooltip("Permission Denied âŒ");
    return;
  }

  try {

    const registration = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: "BMF7VaLIylgT6m6g1LQi6V2Z0T5huntAO4rGEA_IRO40YjYpZkwBqg1o9g93RvLIO0-w0V-r5ffPr3C6XXAp5SA",
      serviceWorkerRegistration: registration
    });

    if (token) {

      // ðŸŒ GET IP + LOCATION
      const loc = await getLocation();

      // ðŸ’¾ SAVE TO FIREBASE
      await setDoc(doc(db, "subscribers", token), {
        token: token,
        status: "active",
        createdAt: new Date(),

        // ðŸ”— PAGE INFO              
    website: location.origin,
    pageUrl: location.href,
    pagePath: location.pathname,
    pageTitle: document.title,

        ip: loc?.ip || "N/A",
        city: loc?.city || "N/A",
        region: loc?.region || "N/A",
        country: loc?.country_name || "N/A",
        latitude: loc?.latitude || "N/A",
        longitude: loc?.longitude || "N/A"
      });

      showTooltip("Notifications Enabled âœ…");
      updateCount();
      document.getElementById("notifyBtn").innerHTML = `
    <a href="https://menupriceshub.github.io/notifications.html" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">
      <i class="fa-regular fa-bell bell-icon"></i>
    </a>`;
    } else {
      alert("Token not generated âŒ");
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

function updateNotificationStatus() {

  const badge = document.getElementById("notifyStatus");
  const notifyBtn = document.getElementById("notifyBtn");

  if (!badge) return;

  if (!("Notification" in window)) {

    badge.innerHTML =
      '<i class="fas fa-times-circle" style="color:red"></i>';

    return;
  }

  if (Notification.permission === "granted") {

    badge.innerHTML =
      '<i class="fas fa-check-circle" style="color:#28a745"></i>';

    if (notifyBtn) {
      notifyBtn.style.animation = "none";
    }

  } else {

    badge.innerHTML =
      '<i class="fas fa-times-circle" style="color:red"></i>';
  }
}

updateNotificationStatus();

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

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

// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/firebase-messaging-sw.js")
    .then(() => console.log("Service Worker Registered"))
    .catch(err => console.error(err));
}

// Get IP Location
async function getLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Save Subscriber Data
async function saveSubscriber(token) {
  const loc = await getLocation();

  const data = {
    token: token,

    website: location.origin,
    pageUrl: location.href,
    pagePath: location.pathname,
    pageTitle: document.title,

    ip: loc?.ip || "",
    country: loc?.country_name || "",
    state: loc?.region || "",
    city: loc?.city || "",
    latitude: loc?.latitude || "",
    longitude: loc?.longitude || "",

    userAgent: navigator.userAgent,

    lastVisit: new Date().toISOString(),
    timestamp: Date.now()
  };

  await setDoc(
    doc(db, "subscribers", token),
    data,
    { merge: true }
  );

  console.log("Subscriber Saved:", data);
}

// Auto Save If Notification Already Allowed
async function autoSave() {

  if (Notification.permission !== "granted") {
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
      console.log("Token Saved:", token);
    } else {
      console.log("No token generated");
    }

  } catch (err) {
    console.error("Error:", err);
  }
}

window.addEventListener("load", autoSave);

async function checkNotifications() {
    const res = await fetch("notifications.json?t=" + Date.now());
    const data = await res.json();

    // Total notifications
    const total = data.notifications.length;

    // Last seen count
    const seenCount = Number(localStorage.getItem("seenCount") || 0);

    const unread = total - seenCount;

    const badge = document.getElementById("badge");

    if (unread > 0) {
        badge.style.display = "block";
        badge.textContent = unread;
    } else {
        badge.style.display = "none";
    }
}

checkNotifications();

function showTooltip(message, duration = 2500) {
  const tip = document.getElementById("customTooltip");
  tip.innerText = message;
  tip.classList.add("show");

  clearTimeout(tip._timer);
  tip._timer = setTimeout(() => {
    tip.classList.remove("show");
  }, duration);
}
