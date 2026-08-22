document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     1. BUILD TABS
  ========================= */

  const topsectionnav = document.getElementById("top-section-nav1");

  topsectionnav.innerHTML = `
    <a href="#overview" class="nav-tab active-tab">Overview</a>
    <a href="#menu" class="nav-tab">Menu</a>
    <a href="#menu-price-table-section1" class="nav-tab">Price List</a>
    <a href="#photos" class="nav-tab">Photos</a>
    <a href="#location" class="nav-tab">Location</a>
    <a href="#openhours" class="nav-tab">Open Hours</a>
    <a href="#reviews" class="nav-tab">Reviews</a>
    <a href="#faq" class="nav-tab">FAQ</a>
  `;

  /* =========================
     2. ACTIVE TAB + AUTO CENTER
  ========================= */

  const sections = document.querySelectorAll("section");
  const navLinks = topsectionnav.querySelectorAll(".nav-tab");
  const tabsContainer = topsectionnav;

  // ✅ CHANGE 1: force scroll-behavior via JS bhi (CSS fallback ke sath)
  tabsContainer.style.scrollBehavior = "smooth";

  function centerActiveTab(tab) {
    const left =
      tab.offsetLeft -
      (tabsContainer.offsetWidth / 2) +
      (tab.offsetWidth / 2);

    // ✅ CHANGE 2: scrollTo({behavior}) hata kar scrollLeft use kiya
    // Kiwi ke purane Chromium me scrollTo({behavior:"smooth"}) fail hota hai,
    // scrollLeft + CSS scroll-behavior zyada reliable hai
    tabsContainer.scrollLeft = left;
  }

  /* ACTIVE TAB ON SCROLL */
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 180) {   // ✅ CHANGE 3: window.pageYOffset explicit
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active-tab");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active-tab");
        centerActiveTab(link);
      }
    });
  });

  /* CLICK TAB CENTER */
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(item => item.classList.remove("active-tab"));
      link.classList.add("active-tab");
      centerActiveTab(link);
    });
  });

  /* PAGE LOAD ACTIVE CENTER */
  window.addEventListener("load", () => {
    const active = topsectionnav.querySelector(".active-tab");
    if (active) {
      setTimeout(() => {
        centerActiveTab(active);
      }, 300);   // ✅ CHANGE 4: 200ms se 300ms — Kiwi thoda slow render karta hai
    }
  });

});
