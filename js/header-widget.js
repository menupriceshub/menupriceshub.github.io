/* =========================================================
   HEADER WIDGET (Dynamic)
   Usage: 
   1) HTML me sirf ye rakho:
      <div id="site-header"></div>
      <script src="header-widget.js" defer></script>
   2) Chaho to links yaha se hi edit kar lo (ek jagah se sab page update ho jayenge)
========================================================= */

(function () {

  const NAV_LINKS = [
    { text: "Home", href: "https://menupriceshub.github.io/" },
    { text: "Calories & Nutrition", href: "https://menupriceshub.github.io/calories-and-nutrition.html" },
    { text: "Restaurants", href: "https://menupriceshub.github.io/restaurants.html" },
    { text: "Search", href: "https://menupriceshub.github.io/search.html" },
    { text: "Categories", href: "https://menupriceshub.github.io/categories.html" },
    { text: "Contact", href: "https://menupriceshub.github.io/contact.html" },
    { text: "List Your Business", href: "https://menupriceshub.github.io/list-your-business.html" }
  ];

  /* =========================================================
     1) CSS INJECT
  ========================================================= */
  const css = `
  header{
    position:sticky;
    top:0px; 
    z-index:1000;
    background:#fff;
    padding:15px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-shadow:0 2px 10px rgba(0,0,0,.05);
  }

  .logo{
    font-size:20px;
    color:#ff4d00;
  }

  .menulogotext1{ color:Red; font-weight:600; }
  .menulogotext2{ color:darkblue; font-weight:600; }
  .menulogotext3{ color:darkblue; font-weight:600; }

  .header-right{
    display:flex;
    align-items:center;
    gap:12px;
  }

  .notification-widget{
    order:1;
    position:relative;
    width:32px;
    height:32px;
    background:transparent;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    z-index:999999;
    transition:1s;
    animation:pulse2 2s infinite;
  }

  @keyframes pulse2{
    0%{ box-shadow: 0 0 0 0 rgba(0,0,0, 0.2); }
    70% { box-shadow: 0 0 0 10px rgba(0,0,255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0,0,255, 0); }
  }

  .bell-icon{ color:red; font-size:26px; }

  .status-badge{
    display:none;
    position:absolute;
    top:-3px;
    right:-3px;
    font-size:14px;
    line-height:1;
  }
  .status-badge i{ font-size:16px; }

  #badge{
    position:absolute;
    top:-8px;
    right:-10px;
    min-width:20px;
    height:20px;
    background:red;
    color:#fff;
    border-radius:50%;
    font-size:12px;
    text-align:center;
    line-height:20px;
    display:none;
    font-weight:bold;
  }

  .menu-btn{
    order:2;
    width:52px;
    height:52px;
    border:none;
    border-radius:14px;
    background:transparent;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:6px;
    cursor:pointer;
    transition:.3s;
    padding:0;
    z-index:1002;
  }

  .menu-btn span{
    width:24px;
    height:2.5px;
    background:#ff4d00;
    border-radius:20px;
    transition:.35s ease;
  }
  .menu-btn .span1{ width:14px; }
  .menu-btn .span2{ width:8px; }
  .menu-btn:hover{ transform:scale(1.05); }

  .menu-btn.active span:nth-child(1){ transform:translateY(8px) rotate(45deg); }
  .menu-btn.active span:nth-child(2){ opacity:0; width:0; }
  .menu-btn.active span:nth-child(3){ transform:translateY(-8px) rotate(-45deg); width:24px; }

  .nav-menu{
    display:flex;
    align-items:center;
    flex-wrap:nowrap;
  }

  .nav-menu a{
    text-decoration:none;
    color:#222;
    font-size:15px;
    font-weight:600;
    position:relative;
    transition:.3s;
    white-space:nowrap;
    margin-right:10px;
  }
  .nav-menu a:last-child{ margin-right:0; }
  .nav-menu a:hover{ color:#ff4d00; }

  .nav-menu a::after{
    content:"";
    position:absolute;
    left:0;
    bottom:-5px;
    width:0%;
    height:2px;
    background:#ff4d00;
    transition:.3s;
  }
  .nav-menu a:hover::after{ width:100%; }

  .more-menu{ position:relative; }

  .more-btn{
    background:none;
    border:none;
    font-size:15px;
    font-weight:600;
    color:#222;
    cursor:pointer;
    font-family:'Poppins',sans-serif;
    padding:0;
    display:flex;
    align-items:center;
    gap:5px;
  }
  .more-btn:hover{ color:#ff4d00; }

  .more-dropdown{
    display:none;
    position:absolute;
    top:35px;
    right:0;
    min-width:220px;
    background:#fff;
    border-radius:18px;
    padding:10px;
    box-shadow:0 10px 30px rgba(0,0,0,.1);
    z-index:9999;
  }
  .more-dropdown a{
    display:block;
    padding:12px;
    border-radius:10px;
    border-bottom:1px solid #f2f2f2;
  }
  .more-dropdown a:last-child{ border-bottom:none; }
  .more-dropdown a:hover{ background:#f5f5f5; }
  .more-menu:hover .more-dropdown{ display:block; }
  .more-menu.active .more-dropdown{ display:block; }

  @media(max-width:768px){
    .nav-menu{
      position:fixed;
      top:82px;
      right:-100%;
      width:280px;
      background:#fff;
      padding:25px;
      border-radius:22px 0 0 22px;
      display:flex;
      flex-direction:column;
      align-items:flex-start;
      gap:22px;
      box-shadow:-5px 10px 30px rgba(0,0,0,.08);
      transition:.4s ease;
      z-index:1001;
      max-height:500px;
      overflow-y:auto;
      scrollbar-width:none;
      -ms-overflow-style:none;
    }
    .nav-menu::-webkit-scrollbar{ display:none; }
    .nav-menu.active{ right:0; }
    .nav-menu a{
      width:100%;
      padding-bottom:12px;
      border-bottom:1px solid #f1f1f1;
      font-size:17px;
    }
    .notification-widget{ order:1; }
    .menu-btn{ order:2; }
  }

  @media(min-width:769px){
    .menu-btn{ display:none; }
    .nav-menu{
      position:static;
      flex-direction:row;
      background:transparent;
      padding:0;
      width:auto;
      height:auto;
      box-shadow:none;
      gap:12px;
    }
    .notification-widget{ order:2; }
    .menu-btn{ order:1; }
  }

  @media(min-width:1024px){
    .nav-menu{ gap:15px; flex-wrap:wrap; }
    .nav-menu a{ font-size:13px; }
  }
  `;

  const styleTag = document.createElement("style");
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  /* =========================================================
     2) HTML INJECT
  ========================================================= */
  const linksHTML = NAV_LINKS.map(
    l => `<a href="${l.href}">${l.text}</a>`
  ).join("\n");

  const headerHTML = `
    <div class="logo"><a href="/">
      <span class="menulogotext1">Menu</span><span class="menulogotext2">Prices</span><span class="menulogotext3">Hub</span>
    </a></div>

    <nav class="nav-menu" id="navMenu">
      ${linksHTML}
      <a href="#" id="installBtn" style="display:none;">Install App</a>
    </nav>

    <div class="header-right">
      <div class="notification-widget" id="notifyBtn">
        <i class="fa-regular fa-bell bell-icon"></i>
        <span id="notifyStatus" class="status-badge"></span>
        <span id="badge"></span>
      </div>

      <button class="menu-btn" id="menuToggle" aria-label="Menu">
        <span></span>
        <span class="span1"></span>
        <span class="span2"></span>
      </button>
    </div>
  `;

  const mount = document.getElementById("site-header");
if (mount) {
  mount.innerHTML = headerHTML;
} else {
  document.body.insertAdjacentHTML("afterbegin", `<header id="site-header">${headerHTML}</header>`);
}

  /* =========================================================
     3) JS BEHAVIOUR (menu toggle, close on outside click, more-menu)
  ========================================================= */
  function initHeaderBehaviour() {

    const menuBtn = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (!menuBtn || !navMenu) return;

    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        menuBtn.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });

    // Desktop "More" dropdown agar links 5 se zyada ho
    if (window.innerWidth > 768) {
      const links = Array.from(navMenu.children).filter(el => el.tagName === "A");

      if (links.length > 5) {
        const moreMenu = document.createElement("div");
        moreMenu.className = "more-menu";
        moreMenu.innerHTML = `
          <button class="more-btn">More <i class="fa fa-angle-down"></i></button>
          <div class="more-dropdown"></div>
        `;

        const dropdown = moreMenu.querySelector(".more-dropdown");
        links.slice(5).forEach(link => dropdown.appendChild(link));
        navMenu.appendChild(moreMenu);
      }
    }

    // Notification badge status (visual only, dot ka color)
    function updateNotificationStatus() {
      const badge = document.getElementById("notifyStatus");
      if (!badge) return;

      if (!("Notification" in window)) {
        badge.innerHTML = '<i class="fas fa-times-circle" style="color:red"></i>';
        return;
      }

      if (Notification.permission === "granted") {
        badge.innerHTML = '<i class="fas fa-check-circle" style="color:#28a745"></i>';
        document.getElementById("notifyBtn").style.animation = "none";
      } else {
        badge.innerHTML = '<i class="fas fa-times-circle" style="color:red"></i>';
      }
    }
    updateNotificationStatus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeaderBehaviour);
  } else {
    initHeaderBehaviour();
  }

  // Header inject hone ke baad custom event fire karo,
  // taaki notification/firebase widget (jo alag script me hai) apna kaam shuru kar sake
  document.dispatchEvent(new CustomEvent("headerReady"));

})();
