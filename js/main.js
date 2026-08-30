const scripts = [
  "review-widget.js",
  "about-widget.js",
  "install-app.js",
  "notification-widget.js",
  "faq-widget.js",
  "hero-slider2.js",
  "restaurant-table.js",
  "read-more1.js",
  "my-script1.js",
  "browser1.js",
  "star-graphics.js",
  "breadcrumb1.js",
  "center-tab1.js",
  "mph-scroll.js",
  "mph-share.js",
  "mph-tooltip.js",
  "head.js",
  "quick-info1.js",
  "top-section-widget1.js",
  "restaurant-schema.js",
  "header-widget.js",
  "restaurant.js",
  "imgoverlay.js",
  "footer-widget.js"
];

scripts.forEach(file => {
  const script = document.createElement("script");

  script.src = `/js/${file}`;
  script.defer = true;

  if (file === "notification-widget.js") {
    script.type = "module";
  }

  document.head.appendChild(script);
});
