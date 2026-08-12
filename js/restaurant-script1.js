document.addEventListener("DOMContentLoaded", () => {
  fetch("/data/restaurants.json")
    .then(res => res.json())
    .then(restaurants => {
      renderPopular(restaurants, "popular-restaurants-section1", "Restaurant");
      renderPopular(restaurants, "popular-cafe-section1", "Cafe");

      // naya: all restaurants list with load more
      initAllRestaurants(restaurants, "all-restaurants-section");

      // naya: near me feature
      initNearMe(restaurants, "nearby-section");
    });
});

/* ---------------- ALL RESTAURANTS + SEE MORE ---------------- */

let allData = [];
let visibleCount = 10;
const LOAD_STEP = 5;

function initAllRestaurants(data, sectionId) {
  allData = data; // sabhi restaurants (Restaurant + Cafe dono)
  renderAllList(sectionId);
}

function renderAllList(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const items = allData.slice(0, visibleCount);
  const hasMore = visibleCount < allData.length;

  section.innerHTML = `
    <div class="section-header">
      <h2 class="section-left">All Restaurants</h2>
    </div>

    <div class="restaurant-grid" id="all-restaurants-grid">
      ${items.map(r => restaurantCardHTML(r, r.category)).join("")}
    </div>

    ${hasMore ? `
      <div class="see-more-wrapper">
        <button id="see-more-btn" class="see-more-btn">See More</button>
      </div>
    ` : ""}
  `;

  if (hasMore) {
    document.getElementById("see-more-btn").addEventListener("click", () => {
      visibleCount += LOAD_STEP;
      renderAllList(sectionId);
    });
  }
}

/* ---------------- NEAR ME ---------------- */

function initNearMe(data, nearbySectionId) {
  const btn = document.getElementById("near-me-btn");
  if (!btn) return; // agar HTML me button nahi hai to skip

  btn.addEventListener("click", () => {
    const locationLabel = document.getElementById("user-location-label");

    if (!navigator.geolocation) {
      showNearbyError(nearbySectionId, "Geolocation is not supported by your browser");
      return;
    }

    if (locationLabel) locationLabel.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Locating you...`;

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        showUserLocationName(latitude, longitude);
        renderNearby(data, latitude, longitude, nearbySectionId);
      },
      err => {
        // user ne allow nahi kiya ya error aaya
        if (locationLabel) {
          locationLabel.innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> Location access denied`;
        }
        showNearbyError(nearbySectionId, "Please allow location access to see nearby restaurants");
      }
    );
  });
}

// Reverse geocode karke user ko unka area/city naam dikhana (free, no API key - OpenStreetMap Nominatim)
function showUserLocationName(lat, lng) {
  const locationLabel = document.getElementById("user-location-label");
  if (!locationLabel) return;

  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
    .then(res => res.json())
    .then(data => {
      const place = data.address?.suburb || data.address?.city || data.address?.town || data.display_name || "Your area";
      locationLabel.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${place}`;
    })
    .catch(() => {
      locationLabel.innerHTML = `<i class="fa-solid fa-location-dot"></i> Lat: ${lat.toFixed(2)}, Lng: ${lng.toFixed(2)}`;
    });
}

function renderNearby(data, lat, lng, sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  // sirf wahi restaurants jinke paas lat/lng data hai
  const withCoords = data.filter(r => r.lat && r.lng);

  if (withCoords.length === 0) {
    showNearbyError(sectionId, "Nearby restaurant data is not available");
    return;
  }

  const nearby = withCoords
    .map(r => ({ ...r, distance: getDistanceKm(lat, lng, Number(r.lat), Number(r.lng)) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 10);

  section.innerHTML = `
    <div class="section-header">
      <h2 class="section-left">Near You</h2>
    </div>
    <div class="restaurant-grid">
      ${nearby.map(r => restaurantCardHTML(r, r.category, r.distance)).join("")}
    </div>
  `;
}

function showNearbyError(sectionId, message) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.innerHTML = `
    <div class="no-data-message">
      <i class="fa-solid fa-map-location-dot"></i>
      <p>${message}</p>
    </div>
  `;
}

// Haversine formula - do coordinates ke beech distance km me
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ---------------- SHARED CARD BUILDER ---------------- */

function restaurantCardHTML(r, category, distance = null) {
  return `
    <div class="restaurant-card">
      <img class="restaurant-img" src="${r.thumbnail}">
      <div class="restaurant-content">
        <h3 class="restaurant-name">${r.name}</h3>
        <div class="restaurant-info">
          ${r.city} • ${category}${distance !== null ? ` • ${distance.toFixed(1)} km` : ""}
        </div>
        <div class="restaurant-bottom">
          <div class="restaurant-rating">
            <span>${r.rating}</span>
            <span class="restaurant-stars">${generateStars(r.rating)}</span>
          </div>
          <a href="${r.url}" class="restaurant-btn">View</a>
        </div>
      </div>
    </div>
  `;
}

function generateStars(rating) {
  let html = "";
  rating = Number(rating);
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;
  let hasHalf = false;
  let full = fullStars;

  if (decimal >= 0.75) full = fullStars + 1;
  else if (decimal >= 0.25) hasHalf = true;

  for (let i = 1; i <= 5; i++) {
    if (i <= full) html += `<i class="fas fa-star"></i>`;
    else if (i === full + 1 && hasHalf) html += `<i class="fas fa-star-half-alt"></i>`;
    else html += `<i class="far fa-star"></i>`;
  }
  return html;
}
