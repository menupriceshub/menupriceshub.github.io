
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
