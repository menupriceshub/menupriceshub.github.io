function shareCurrentUrl() {
  const currentUrl = window.location.href;

  // Mobile/browser share support
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: currentUrl
    })
    .then(() => console.log("URL shared"))
    .catch(err => console.log("Error:", err));
  } else {
    // Fallback: copy URL
    navigator.clipboard.writeText(currentUrl);
    alert("URL copied: " + currentUrl);
  }
}
