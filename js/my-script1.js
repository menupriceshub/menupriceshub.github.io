
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





function showTooltip(message, duration = 2500) {
  const tip = document.getElementById("customTooltip");
  tip.innerText = message;
  tip.classList.add("show");

  clearTimeout(tip._timer);
  tip._timer = setTimeout(() => {
    tip.classList.remove("show");
  }, duration);
}







....... 


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








scroll

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






<!-- =====================================
REPLACE YOUR OLD ACTIVE TAB SCRIPT
WITH THIS NEW SCRIPT
===================================== -->



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







(function(){

const container = document.getElementById("breadcrumb1");

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

html += '<span class="separator">›</span>';

if(index === path.length-1){
html += '<span>'+name+'</span>';
}else{
html += '<a href="'+currentPath+'/">'+name+'</a>';
}

});

container.innerHTML = html;

})();


