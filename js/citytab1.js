(function () {

  /* =========================
     1. CITY TABS GENERATE KARO
  ========================= */

  const cities = [
    { name: "All", url: "/cities/" },

    { name: "New York", url: "/cities/new-york/" },
    { name: "Los Angeles", url: "/cities/los-angeles/" },
    { name: "Chicago", url: "/cities/chicago/" },
    { name: "Houston", url: "/cities/houston/" },
    { name: "Miami", url: "/cities/miami/" },
    { name: "Las Vegas", url: "/cities/las-vegas/" },
    { name: "Dallas", url: "/cities/dallas/" },
    { name: "Seattle", url: "/cities/seattle/" }
  ];


  const navContainer = document.getElementById("city-nav1");

  if (!navContainer) return;


  /* =========================
     2. CITY LINKS CREATE KARO
  ========================= */

  cities.forEach(city => {

    const a = document.createElement("a");

    a.href = city.url;
    a.className = "city-tab";
    a.textContent = city.name;

    navContainer.appendChild(a);

  });


  /* =========================
     3. ACTIVE CITY SET KARO
  ========================= */

  const cityTabs = document.querySelectorAll(".city-tab");

  if (!cityTabs.length) return;


  const currentPath = window.location.pathname
    .replace(/\/+$/, "")
    .split("/")
    .filter(Boolean);


  /*
     Example:

     /cities/
     → All

     /cities/new-york/
     → New York

     /cities/los-angeles/
     → Los Angeles
  */

  let currentCity = "";

  if (
    currentPath.length >= 2 &&
    currentPath[0] === "cities"
  ) {

    currentCity = currentPath[currentPath.length - 1];

  }


  let activeTab = null;


  cityTabs.forEach(tab => {

    const tabPath = tab.getAttribute("href")
      .replace(/\/+$/, "")
      .split("/")
      .filter(Boolean);


    let tabCity = "";

    if (
      tabPath.length >= 2 &&
      tabPath[0] === "cities"
    ) {

      tabCity = tabPath[tabPath.length - 1];

    }


    tab.classList.remove("active-city-tab");


    /* =========================
       ALL CITY PAGE
    ========================= */

    if (!currentCity && tabCity === "") {

      tab.classList.add("active-city-tab");

      activeTab = tab;

    }


    /* =========================
       SPECIFIC CITY PAGE
    ========================= */

    else if (
      currentCity &&
      tabCity === currentCity
    ) {

      tab.classList.add("active-city-tab");

      activeTab = tab;

    }

  });


  /* =========================
     4. ACTIVE CITY AUTO CENTER
  ========================= */

  if (activeTab) {

    setTimeout(() => {

      activeTab.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });

    }, 100);

  }

})();
