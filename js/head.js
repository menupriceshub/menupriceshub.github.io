// 1. <link> - CSS file ya favicon
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'style.css';
document.head.appendChild(link);

// Favicon
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.href = 'https://menupriceshub.github.io/menupriceshub-512x512.png';
document.head.appendChild(favicon);



// ===== Google Analytics (gtag.js) =====
const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-120B2PKSDH';
document.head.appendChild(gaScript);

const gaInlineScript = document.createElement('script');
gaInlineScript.textContent = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-120B2PKSDH');
`;
document.head.appendChild(gaInlineScript);

// 3. <meta> - SEO tags
const meta = document.createElement('meta');
meta.name = 'description';
meta.content = 'My website description';
document.head.appendChild(meta);

// 4. <style> - inline CSS
const style = document.createElement('style');
style.textContent = 'body { margin: 0; }';
document.head.appendChild(style);




// 5. <style> - inline CSS

const scripts = [
  { src: "/js/review-widget.js", defer: true },
  { src: "/js/about-widget.js", defer: true },
  { src: "/js/install-app.js", defer: true },
  { src: "/js/notification-widget.js", type: "module" },
  { src: "/js/faq-widget.js", defer: true },
  { src: "/js/hero-slider2.js", defer: true },
  { src: "/js/restaurant-table.js", defer: true },
  { src: "/js/read-more1.js", defer: true },
  { src: "/js/my-script1.js", defer: true },
  { src: "/js/browser1.js", defer: true },
  { src: "/js/star-graphics.js", defer: true },
  { src: "/js/breadcrumb1.js", defer: true },
  { src: "/js/center-tab1.js", defer: true },
  { src: "/js/mph-scroll.js", defer: true },
  { src: "/js/mph-share.js", defer: true },
  { src: "/js/mph-tooltip.js", defer: true }
];

scripts.forEach(item => {
  const script = document.createElement("script");
  script.src = item.src;

  if (item.type) {
    script.type = item.type;
  } else {
    script.defer = true;
  }

  document.head.appendChild(script);
});
