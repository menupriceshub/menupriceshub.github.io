document.addEventListener("DOMContentLoaded", () => {
  fetch("/data/restaurants.json")
    .then(res => res.json())
    .then(restaurants => {
      renderPopular(restaurants, "popular-restaurants-section1", "Restaurant");
      renderPopular(restaurants, "popular-cafe-section1", "Cafe");

      // all restaurants list with see more
      initAllRestaurants(restaurants, "all-restaurants-section");

      // near me feature (native device location, no third-party API)
      initNearMe(restaurants, "nearby-section");
    });
});

/* ---------------- POPULAR SECTIONS ---------------- */

function renderPopular(data, sectionId, category) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const items = data
    .filter(r => r.category === category)
    .map(r => ({
      ...r,
      score: (Number(r.rating) * 20) + (Number(r.totalrating) / 100)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  section.innerHTML = `
    <div class="section-header">
      <h2 class="section-left">Popular ${category}s</h2>
      <a href="#" class="section-right">
        View All
        <i class="fa-solid fa-chevron-right icon"></i>
      </a>
    </div>

    <div class="restaurant-grid">
      ${items.map(r => restaurantCardHTML(r, category)).join("")}
    </div>
  `;
}

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

  if (!allData || allData.length === 0) {
    section.innerHTML = `
      <div class="no-data-message">
        <i class="fa-solid fa-utensils"></i>
        <p>No restaurants available</p>
      </div>
    `;
    return;
  }

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

/* ---------------- NEAR ME (native device location only) ---------------- */

function initNearMe(data, nearbySectionId) {
  const btn = document.getElementById("near-me-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const locationLabel = document.getElementById("user-location-label");

    if (!navigator.geolocation) {
      if (locationLabel) {
        locationLabel.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Geolocation not supported`;
      }
      showNearbyError(nearbySectionId, "Geolocation is not supported by your browser");
      return;
    }

    if (locationLabel) {
      locationLabel.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Locating you...`;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;

        if (locationLabel) {
          locationLabel.innerHTML = `<i class="fa-solid fa-location-dot"></i> Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
        }

        renderNearby(data, latitude, longitude, nearbySectionId);
      },
      err => {
        if (locationLabel) {
          locationLabel.innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> Location access denied`;
        }
        showNearbyError(nearbySectionId, "Please allow location access to see nearby restaurants");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
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

/* ---------------- STAR RATING ---------------- */

function generateStars(rating) {
  let html = "";
  rating = Number(rating);

  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;

  let hasHalf = false;
  let full = fullStars;

  if (decimal >= 0.75) {
    full = fullStars + 1;
  } else if (decimal >= 0.25) {
    hasHalf = true;
  }

  for (let i = 1; i <= 5; i++) {
    if (i <= full) {
      html += `<i class="fas fa-star"></i>`;
    } else if (i === full + 1 && hasHalf) {
      html += `<i class="fas fa-star-half-alt"></i>`;
    } else {
      html += `<i class="far fa-star"></i>`;
    }
  }

  return html;
}
