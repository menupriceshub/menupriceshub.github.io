(function () {

  /* =========================
     1. CITY TABS GENERATE KARO
  ========================= */

  const cities = [
    { name: "All", url: "/cities/" },

    { name: "New York", url: "/cities/new-york/" },
    { name: "Brooklyn", url: "/cities/brooklyn/" },
    { name: "Austin", url: "/cities/austin/" },
    { name: "Ann Arbor", url: "/cities/ann-arbor/" },
    { name: "Philadelphia", url: "/cities/philadelphia/" },
    { name: "Nashville", url: "/cities/nashville/" },
    { name: "Phoenix", url: "/cities/phoenix/" },
    { name: "New Haven", url: "/cities/new-haven/" },
    { name: "Chicago", url: "/cities/chicago/" },
    { name: "Los Angeles", url: "/cities/los-angeles/" },
    { name: "San Francisco", url: "/cities/san-francisco/" },
    { name: "Berkeley", url: "/cities/berkeley/" },
    { name: "Yountville", url: "/cities/yountville/" },
    { name: "New Orleans", url: "/cities/new-orleans/" },
    { name: "St. Louis", url: "/cities/st-louis/" },
    { name: "Atlanta", url: "/cities/atlanta/" },
    { name: "Charleston", url: "/cities/charleston/" },
    { name: "Savannah", url: "/cities/savannah/" },
    { name: "Memphis", url: "/cities/memphis/" },
    { name: "San Antonio", url: "/cities/san-antonio/" },
    { name: "Driftwood", url: "/cities/driftwood/" },
    { name: "Houston", url: "/cities/houston/" },
    { name: "Dallas", url: "/cities/dallas/" },
    { name: "Oklahoma City", url: "/cities/oklahoma-city/" },
    { name: "Boise", url: "/cities/boise/" },
    { name: "Jackson", url: "/cities/jackson/" },
    { name: "Buellton", url: "/cities/buellton/" },
    { name: "Hollywood", url: "/cities/hollywood/" },
    { name: "Balboa", url: "/cities/balboa/" },
    { name: "Pescadero", url: "/cities/pescadero/" },
    { name: "Oakland", url: "/cities/oakland/" },
    { name: "Seattle", url: "/cities/seattle/" },
    { name: "Portland", url: "/cities/portland/" },
    { name: "Durango", url: "/cities/durango/" },
    { name: "Denver", url: "/cities/denver/" },
    { name: "Cincinnati", url: "/cities/cincinnati/" },
    { name: "Cleveland", url: "/cities/cleveland/" },
    { name: "Detroit", url: "/cities/detroit/" },
    { name: "Waukesha", url: "/cities/waukesha/" },
    { name: "Glendale", url: "/cities/glendale/" },
    { name: "Minneapolis", url: "/cities/minneapolis/" },
    { name: "St. Paul", url: "/cities/st-paul/" },
    { name: "Kansas City", url: "/cities/kansas-city/" }
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
