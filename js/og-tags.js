(async function () {
  try {
    // Load restaurant data
    const response = await fetch("/data/restaurants.json");
    const restaurants = await response.json();

    // Current HTML page filename
    const currentPage = window.location.pathname.split("/").pop();

    // Find matching restaurant
    const restaurant = restaurants.find(item => item.url === currentPage);

    // Restaurant not found
    if (!restaurant) {
      console.warn("Restaurant data not found for:", currentPage);
      return;
    }

    // Remove existing OG/Twitter tags to avoid duplicates
    document.querySelectorAll(
      'meta[property^="og:"], meta[name^="twitter:"]'
    ).forEach(meta => meta.remove());

    // Helper function
    function addMeta(attribute, value, content) {
      if (!content) return;

      const meta = document.createElement("meta");
      meta.setAttribute(attribute, value);
      meta.setAttribute("content", content);

      document.head.appendChild(meta);
    }

    // Canonical URL
    const siteUrl = "https://menupriceshub.github.io";
    const pageUrl = new URL(restaurant.url, siteUrl + "/").href;

    // Title
    document.title = `${restaurant.name} Menu, Prices & Details`;

    // Description
    const description =
      restaurant.description ||
      `${restaurant.name} menu, prices, location, reviews and restaurant details.`;

    // Main image
    const image =
      restaurant.thumbnail ||
      (restaurant.photos && restaurant.photos.length
        ? restaurant.photos[0].src
        : "");

    // Open Graph
    addMeta("property", "og:type", "restaurant");
    addMeta("property", "og:title", `${restaurant.name} Menu, Prices & Details`);
    addMeta("property", "og:description", description);
    addMeta("property", "og:url", pageUrl);
    addMeta("property", "og:image", image);
    addMeta("property", "og:site_name", "MenuPricesHub");

    // Twitter Card
    addMeta("name", "twitter:card", "summary_large_image");
    addMeta("name", "twitter:title", `${restaurant.name} Menu, Prices & Details`);
    addMeta("name", "twitter:description", description);
    addMeta("name", "twitter:image", image);

    console.log("OG tags generated for:", restaurant.name);

  } catch (error) {
    console.error("OG Tags Error:", error);
  }
})();
