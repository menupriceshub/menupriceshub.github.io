
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

