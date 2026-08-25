(function () {
  /* =========================
     1. CATEGORY TABS GENERATE KARO
  ========================= */
  const categories = [
    { name: "All", url: "/restaurants/" },
    { name: "Asian Food", url: "/categories/asian-food" },
    { name: "Burger", url: "/categories/burger" },
    { name: "Cafe", url: "/categories/cafe/" },
    { name: "Desserts", url: "/categories/desserts" },
    { name: "Healthy Food", url: "/categories/healthy-food" },
    { name: "Italian", url: "/categories/italian" },
    { name: "Mexican", url: "/categories/mexican" },
    { name: "Pizza", url: "/categories/pizza" }
  ];

  const navContainer = document.getElementById("category-nav1");

  categories.forEach(cat => {
    const a = document.createElement("a");
    a.href = cat.url;
    a.className = "cat-tab";
    a.textContent = cat.name;
    navContainer.appendChild(a);
  });

  /* =========================
     2. ACTIVE TAB SET KARO (URL ke last segment se)
  ========================= */
  const categoryTabs = document.querySelectorAll(".cat-tab");
  if (!categoryTabs.length) return;

  const currentPath = window.location.pathname
    .replace(/\/+$/, "")
    .split("/")
    .filter(Boolean)
    .pop() || "";

  let activeTab = null;

  categoryTabs.forEach(tab => {
    const tabPath = tab.getAttribute("href")
      .replace(/\/+$/, "")
      .split("/")
      .filter(Boolean)
      .pop() || "";

    tab.classList.remove("active-tab2");

    if (tabPath === currentPath) {
      tab.classList.add("active-tab2");
      activeTab = tab;
    }
  });

  /* =========================
     3. ACTIVE TAB KO AUTO-CENTER SCROLL KARO
  ========================= */
  if (activeTab) {
    activeTab.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }
})();
