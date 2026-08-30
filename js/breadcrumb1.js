(function () {

  // ==============================
  // GET CURRENT PATH
  // ==============================

  const path = window.location.pathname
    .replace(/^\/|\/$/g, "")
    .split("/")
    .filter(Boolean);

  // ==============================
  // VISIBLE BREADCRUMB
  // ==============================

  const container = document.getElementById("breadcrumb1");

  let html = '<a href="/">Home</a>';

  let currentPath = "";

  path.forEach((part, index) => {

    currentPath += "/" + part;

    const isLast = index === path.length - 1;

    const name = part
      .replace(/\.html$/, "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

    html += '<span class="separator">›</span>';

    if (isLast) {

      html += '<span>' + name + '</span>';

    } else {

      // Folder/category pages
      html += '<a href="' + currentPath + '/">' + name + '</a>';

    }

  });

  if (container) {
    container.innerHTML = html;
  }


  // ==============================
  // BREADCRUMB SEO SCHEMA
  // ==============================

  const itemList = [];

  // Home
  itemList.push({
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": window.location.origin + "/"
  });

  let schemaUrl = window.location.origin;

  path.forEach((part, index) => {

    schemaUrl += "/" + part;

    const name = part
      .replace(/\.html$/, "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

    // Current page URL
    let itemUrl = schemaUrl;

    if (index < path.length - 1) {
      itemUrl += "/";
    }

    itemList.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": itemUrl
    });

  });


  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemList
  };


  // Add JSON-LD to <head>
  const script = document.createElement("script");

  script.type = "application/ld+json";

  script.textContent = JSON.stringify(schema);

  document.head.appendChild(script);


})();
