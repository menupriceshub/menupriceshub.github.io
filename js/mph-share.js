// ✅ Yahan se nav items easily add/edit/remove kar sakte ho
const navItems = [
  {
    icon: "fa-home",
    label: "Home",
    link: "https://menupriceshub.github.io"
  },
  {
    icon: "fa-location-dot",
    label: "Cities",
    link: "https://menupriceshub.github.io/cities/"
  },
  {
    icon: "fa-search",
    label: "Search",
    link: "https://menupriceshub.github.io/search.html"
  },
  {
    icon: "fa-coffee",
    label: "Menu",
    link: "https://menupriceshub.github.io/restaurants/"
  },
  {
    icon: "fa-share",
    label: "Share",
    action: "share"   // link ki jagah action
  }
];

// Nav ko HTML mein render karta hai
function renderNav() {
  const nav = document.getElementById("mobileBar");
  if (!nav) return;

  nav.innerHTML = navItems.map((item, index) => {
    const iconHtml = `<i class="fa ${item.icon}" style="font-size:15px;color:#666;"></i>`;

    if (item.action === "share") {
      return `
        <div class="nav-item" data-index="${index}" onclick="handleNavClick(${index})">
          ${iconHtml} ${item.label}
        </div>`;
    }

    return `
      <a href="${item.link}" class="nav-item" data-index="${index}" onclick="handleNavClick(${index})">
        ${iconHtml} ${item.label}
      </a>`;
  }).join("");
}

// Click handle karta hai (active tab + share action)
function handleNavClick(index) {
  setActive(index);

  const item = navItems[index];
  if (item.action === "share") {
    shareCurrentUrl();
  }
}

// Active tab highlight
function setActive(index) {
  document.querySelectorAll("#mobileBar .nav-item").forEach(el => el.classList.remove("active"));
  const el = document.querySelector(`#mobileBar .nav-item[data-index="${index}"]`);
  if (el) el.classList.add("active");
}

// Share function
function shareCurrentUrl() {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({ title: document.title, url }).catch(() => {});
  } else {
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied: " + url);
    });
  }
}

// Page load hote hi current page ke hisaab se active tab set karo
function setActiveFromPath() {
  const path = window.location.pathname;
  let index = 0;
  if (path.includes("city.html")) index = 1;
  else if (path.includes("search.html")) index = 2;
  else if (path.includes("menu.html")) index = 3;
  setActive(index);
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  setActiveFromPath();
});
