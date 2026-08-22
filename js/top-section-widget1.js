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

  const navLinks = Array.from(topsectionnav.querySelectorAll(".nav-tab"));
  const tabsContainer = topsectionnav;

  /* =========================
     2. SAFE SMOOTH SCROLL
     (Kiwi/old WebView me object-form
     scrollTo kabhi kabhi fail/ignore hota hai)
  ========================= */

  function centerActiveTab(tab) {
    if (!tab) return;
    const left =
      tab.offsetLeft -
      (tabsContainer.offsetWidth / 2) +
      (tab.offsetWidth / 2);

    try {
      tabsContainer.scrollTo({ left, behavior: "smooth" });
    } catch (e) {
      tabsContainer.scrollLeft = left;
    }
  }

  function setActiveTab(id) {
    navLinks.forEach(link => {
      const isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active-tab", isActive);
      if (isActive) centerActiveTab(link);
    });
  }

  /* =========================
     3. ACTIVE TAB VIA IntersectionObserver
     (scroll event + offsetTop reflow ki jagah;
     ye lightweight hai aur sticky sections ke
     saath reliably kaam karta hai)
  ========================= */

  function initObserver() {
    // Har section ke liye target uska "top edge" - hum ek thin
    // marker rakhte hain jo header/tabs ki height ke hisaab se
    // rootMargin adjust karta hai
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        // top se ~180px neeche jab section aaye tab active maano
        // (sticky header + tabs height ke barabar)
        rootMargin: "-180px 0px -70% 0px",
        threshold: 0
      }
    );

    document.querySelectorAll("main section[id]").forEach(section => {
      observer.observe(section);
    });
  }

  // Kai sections ka content async load hota hai (menu, photos, etc.)
  // isliye thoda delay de kar observer init karo taaki sections
  // apni final position le chuke hon
  window.addEventListener("load", () => {
    setTimeout(initObserver, 300);
  });

  /* CLICK TAB */
 /* CLICK TAB */
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();                 // native jump band
    const id = link.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    navLinks.forEach(item => item.classList.remove("active-tab"));
    link.classList.add("active-tab");
    centerActiveTab(link);

    const cs = window.getComputedStyle(target);
    const marginTop = parseFloat(cs.scrollMarginTop) || 0;
    const targetY = target.getBoundingClientRect().top + window.pageYOffset - marginTop;

    try {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    } catch (err) {
      window.scrollTo(0, targetY);
    }

    history.pushState(null, "", "#" + id);
  });
});
  /* INITIAL CENTER */
  setTimeout(() => {
    const active = topsectionnav.querySelector(".active-tab");
    centerActiveTab(active);
  }, 200);

});
