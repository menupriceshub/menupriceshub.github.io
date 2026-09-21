(async function () {
  try {
    // ==========================================
    // LOAD RESTAURANT DATA
    // ==========================================
    const response = await fetch("/data/restaurants.json");

    if (!response.ok) {
      throw new Error("Failed to load restaurants.json");
    }

    const restaurants = await response.json();

    // ==========================================
    // CURRENT PAGE
    // ==========================================
    const currentPage =
      window.location.pathname.split("/").filter(Boolean).pop() || "";

    // ==========================================
    // FIND RESTAURANT
    // ==========================================
    const restaurant = restaurants.find(item => {
      const itemUrl = (item.url || "").split("/").filter(Boolean).pop();
      return itemUrl === currentPage;
    });

    if (!restaurant) {
      console.warn(
        "Restaurant data not found for:",
        currentPage
      );
      return;
    }

    // ==========================================
    // REMOVE OLD OG / TWITTER TAGS
    // ==========================================
    document
      .querySelectorAll(
        'meta[property^="og:"], meta[name^="twitter:"]'
      )
      .forEach(meta => meta.remove());

    // ==========================================
    // HELPER
    // ==========================================
    function addMeta(attribute, value, content) {
      if (!content) return;

      const meta = document.createElement("meta");

      meta.setAttribute(attribute, value);
      meta.setAttribute("content", content);

      document.head.appendChild(meta);
    }

    // ==========================================
    // SITE URL
    // ==========================================
    const siteUrl = "https://menupriceshub.github.io";

    // Restaurant page URL
    const pageUrl = new URL(
      restaurant.url,
      siteUrl + "/"
    ).href;

    // ==========================================
    // TITLE
    // ==========================================
    const title =
      `${restaurant.name} Menu, Prices & Details`;

    document.title = title;

    // ==========================================
    // DESCRIPTION
    // ==========================================
    let description = restaurant.description;

    // Ignore "-", empty or invalid description
    if (
      !description ||
      description.trim() === "-" ||
      description.trim().length < 20
    ) {
      description =
        `${restaurant.name} menu, prices, location, reviews, hours and restaurant details.`;
    }

    // ==========================================
    // IMAGE
    // ==========================================
    let image =
      restaurant.thumbnail ||
      (
        restaurant.photos &&
        restaurant.photos.length > 0
          ? restaurant.photos[0].src
          : ""
      );

    // Convert relative image URL to absolute
    if (image) {
      image = new URL(
        image,
        siteUrl + "/"
      ).href;
    }

    // ==========================================
    // IMAGE ALT
    // ==========================================
    let imageAlt =
      restaurant.photos &&
      restaurant.photos.length > 0 &&
      restaurant.photos[0].alt
        ? restaurant.photos[0].alt
        : `${restaurant.name} restaurant`;

    // ==========================================
    // OPEN GRAPH
    // ==========================================

    addMeta(
      "property",
      "og:type",
      "website"
    );

    addMeta(
      "property",
      "og:title",
      title
    );

    addMeta(
      "property",
      "og:description",
      description
    );

    addMeta(
      "property",
      "og:url",
      pageUrl
    );

    addMeta(
      "property",
      "og:site_name",
      "MenuPricesHub"
    );

    addMeta(
      "property",
      "og:image",
      image
    );

    addMeta(
      "property",
      "og:image:alt",
      imageAlt
    );

    // ==========================================
    // TWITTER CARD
    // ==========================================

    addMeta(
      "name",
      "twitter:card",
      "summary_large_image"
    );

    addMeta(
      "name",
      "twitter:title",
      title
    );

    addMeta(
      "name",
      "twitter:description",
      description
    );

    addMeta(
      "name",
      "twitter:image",
      image
    );

    addMeta(
      "name",
      "twitter:image:alt",
      imageAlt
    );

    // ==========================================
    // CANONICAL
    // ==========================================

    let canonical =
      document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", pageUrl);

    // ==========================================
    // DEBUG
    // ==========================================

    console.log(
      "OG tags generated:",
      restaurant.name
    );

    console.log(
      "OG URL:",
      pageUrl
    );

    console.log(
      "OG Image:",
      image
    );

  } catch (error) {
    console.error(
      "OG Tags Error:",
      error
    );
  }
})();
