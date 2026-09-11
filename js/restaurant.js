// restaurant.js
// Reads data-restaurant-id from #page-wrapper, fetches data from the API,
// and fills in the restaurant details on the page.

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("page-wrapper");
  if (!wrapper) return;

  const restaurantId = wrapper.getAttribute("data-restaurant-id");
  if (!restaurantId) {
    console.error("restaurant.js: data-restaurant-id missing on #page-wrapper");
    return;
  }

  const API_URL = `https://menupriceshub-api.cricrock24.workers.dev/?id=${encodeURIComponent(restaurantId)}`;

  fetch(API_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      return res.json();
    })
    .then((data) => populateRestaurant(data))
    .catch((err) => {
      console.error("Failed to load restaurant data:", err);
    });
});

function populateRestaurant(data) {
  // --- Name ---
  const nameEl = document.getElementById("resturant-name1");
  if (nameEl) nameEl.textContent = data.name || "";

  // --- Address / Location ---
  const locationEl = document.getElementById("location-info1");
  if (locationEl) locationEl.textContent = data.location || "";

  // --- Phone (only if API returns it) ---
  const phoneEl = document.getElementById("phonenumber-info1");
  const phoneWrapper = phoneEl ? phoneEl.closest(".location-item") : null;
  if (data.phone) {
    if (phoneEl) phoneEl.textContent = data.phone;
  } else if (phoneWrapper) {
    phoneWrapper.style.display = "none"; // hide phone row if no phone in data
  }

  // --- Website ---
  const websiteEl = document.getElementById("websiteurl-info1");
  if (websiteEl && data.website) {
    const url = data.website.startsWith("http")
      ? data.website
      : `https://${data.website}`;
    websiteEl.href = url;
    websiteEl.textContent = data.website;
    websiteEl.target = "_blank";
    websiteEl.rel = "nofollow noopener noreferrer";
  }

  // --- Call button ---
  const callBtn = document.getElementById("call-btn");
  if (callBtn) {
    if (data.phone) {
      callBtn.href = `tel:${data.phone}`;
    } else {
      callBtn.style.display = "none";
    }
  }

  // --- Directions button (Google Maps search by address) ---
  const directionBtn = document.getElementById("direction-btn");
  if (directionBtn && data.location) {
    directionBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      data.location
    )}`;
  }

  // --- Map iframe ---
  const mapFrame = document.getElementById("restaurant-map");
  if (mapFrame && data.location) {
    mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(
      data.location
    )}&output=embed`;
  }

  // --- Rating ---
  const ratingScoreEl = document.getElementById("card-rating-info1");
  if (ratingScoreEl && data.rating !== undefined) {
    ratingScoreEl.textContent = data.rating;
  }

  const totalRatingEl = document.getElementById("total-rating1");
  if (totalRatingEl && data.totalrating !== undefined) {
    totalRatingEl.textContent = `(${data.totalrating} reviews)`;
  }

  // --- Page title / meta (optional, nice touch) ---
  if (data.name) {
    document.title = `${data.name} Menu With Prices 2026`;
  }

  // --- Hero image / thumbnail (if a hero image element exists) ---
  const heroSlider = document.getElementById("hero-slider-photo1");
  if (heroSlider && data.thumbnail) {
    heroSlider.innerHTML = `<img src="${data.thumbnail}" alt="${data.name || "Restaurant"}" style="width:100%;border-radius:8px;">`;
  }
}
