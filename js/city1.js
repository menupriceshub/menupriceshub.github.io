(async function () {

  const navContainer = document.getElementById("city-nav1");
  if (!navContainer) return;

  const slugify = s =>
    s.toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  let data = [];

  try {
    const res = await fetch("/data/restaurants.json");
    const json = await res.json();
    data = Array.isArray(json) ? json : (json.restaurants || []);
  } catch (e) {
    console.error("restaurants.json load nahi hua", e);
    return;
  }

  const cityNames = [...new Set(
    data.map(r => (r.city || "").trim()).filter(Boolean)
  )].sort();

  const cities = [
    { name: "All", url: "/cities/" },
    ...cityNames.map(n => ({
      name: n,
      url: `/cities/${slugify(n)}/`
    }))
  ];

  /* ===== yahan se aapka purana code same ===== */

  cities.forEach(city => { ... });

  /* active tab + scrollIntoView wala poora part */

})();
