(function () {
  /* =========================
     1. CATEGORY TABS GENERATE KARO
  ========================= */
  const categories = [
  { name: "All", url: "/restaurants/" },
  { name: "Deli", url: "/categories/deli" },
  { name: "Steakhouse", url: "/categories/steakhouse" },
  { name: "BBQ", url: "/categories/bbq" },
  { name: "Cheesesteak", url: "/categories/cheesesteak" },
  { name: "Hot Chicken", url: "/categories/hot-chicken" },
  { name: "Pizza", url: "/categories/pizza" },
  { name: "Steak house", url: "/categories/steak-house" },
  { name: "Ukrainian", url: "/categories/ukrainian" },
  { name: "Hot Dogs", url: "/categories/hot-dogs" },
  { name: "Seafood", url: "/categories/seafood" },
  { name: "American", url: "/categories/american" },
  { name: "Fine Dining", url: "/categories/fine-dining" },
  { name: "Creole", url: "/categories/creole" },
  { name: "Southern", url: "/categories/southern" },
  { name: "Bakery", url: "/categories/bakery" },
  { name: "French", url: "/categories/french" },
  { name: "Fried Chicken", url: "/categories/fried-chicken" },
  { name: "Mexican", url: "/categories/mexican" },
  { name: "Tacos", url: "/categories/tacos" },
  { name: "Burgers", url: "/categories/burgers" },
  { name: "Japanese", url: "/categories/japanese" },
  { name: "Soup", url: "/categories/soup" },
  { name: "Caribbean", url: "/categories/caribbean" },
  { name: "Dessert", url: "/categories/dessert" },
  { name: "Breakfast", url: "/categories/breakfast" },
  { name: "Chili", url: "/categories/chili" },
  { name: "Brewpub", url: "/categories/brewpub" },
  { name: "Italian Beef", url: "/categories/italian-beef" }
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
