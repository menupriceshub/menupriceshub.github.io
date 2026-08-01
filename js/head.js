// 1. <link> - CSS file ya favicon
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'style.css';
document.head.appendChild(link);

// Favicon
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.href = 'favicon.ico';
document.head.appendChild(favicon);

// 2. <script> - Google Analytics/AdSense
const script = document.createElement('script');
script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
script.async = true;
document.head.appendChild(script);

// 3. <meta> - SEO tags
const meta = document.createElement('meta');
meta.name = 'description';
meta.content = 'My website description';
document.head.appendChild(meta);

// 4. <style> - inline CSS
const style = document.createElement('style');
style.textContent = 'body { margin: 0; }';
document.head.appendChild(style);
