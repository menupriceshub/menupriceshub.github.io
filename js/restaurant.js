const id = document.getElementById("page-wrapper").dataset.restaurantId;

const API_URL = `https://menupriceshub-api.cricrock24.workers.dev/?id=${encodeURIComponent(id)}`;

fetch(API_URL)
  .then(res => res.json())
  .then(restaurant => {

    if (!restaurant || !restaurant.id) {
      console.error("Restaurant not found for id:", id);
      return;
    }

    // --- Basic Info ---
    document.getElementById("resturant-name1").innerHTML = restaurant.name || "";
    document.getElementById("location-info1").innerHTML = restaurant.location || "";

    // --- Phone (Call + Direction buttons) ---
    const callBtn = document.getElementById("call-btn");
    const phoneEl = document.getElementById("phonenumber-info1");

    if (restaurant.phone) {
      callBtn.href = `tel:${restaurant.phone}`;
      phoneEl.innerHTML = `<a href="tel:${restaurant.phone}">${restaurant.phone}</a>`;
    } else {
      if (callBtn) callBtn.style.display = "none";
      if (phoneEl) phoneEl.closest(".location-item")?.style.setProperty("display", "none");
    }

    const directionBtn = document.getElementById("direction-btn");
    if (directionBtn) {
      directionBtn.href =
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          restaurant.name + ", " + restaurant.location
        )}`;
      directionBtn.target = "_blank";
      directionBtn.rel = "noopener";
    }

    // --- Website button ---
    const website = document.getElementById("websiteurl-info1");
    if (website && restaurant.website) {
      const url = restaurant.website.startsWith("http")
        ? restaurant.website
        : `https://${restaurant.website}`;
      website.href = url;
      website.target = "_blank";
      website.rel = "nofollow noopener noreferrer";
      website.textContent = new URL(url).hostname.replace("www.", "");
    }

    // --- Rating ---
    const quickRating = document.getElementById("quick-rating-info1");
    if (quickRating) quickRating.innerHTML = restaurant.rating ?? "";

    const cardRating = document.getElementById("card-rating-info1");
    if (cardRating) cardRating.innerHTML = restaurant.rating ?? "";

    const totalRating = document.getElementById("total-rating1");
    if (totalRating) {
      totalRating.innerHTML = `Based on Google Reviews (${restaurant.totalrating ?? 0})`;
    }

    const quickLocation = document.getElementById("quick-location-info1");
    if (quickLocation) quickLocation.innerHTML = restaurant.city || "";

    // --- Review Summary (only if API provides it) ---
    const reviewSummaryEl = document.getElementById("comment-summary1");
    if (reviewSummaryEl) {
      reviewSummaryEl.innerHTML = restaurant.reviewSummary || "";
    }

    // --- Photos (only if API provides an array) ---
    const photosEl = document.getElementById("photos2");
    if (photosEl) {
      if (Array.isArray(restaurant.photos) && restaurant.photos.length) {
        let photoHTML = "";
        restaurant.photos.forEach(photo => {
          photoHTML += `<img src="${photo.src}" alt="${photo.alt}" width="200" loading="lazy">`;
        });
        photosEl.innerHTML = photoHTML;
      } else if (restaurant.thumbnail) {
        // fallback: at least show the thumbnail
        photosEl.innerHTML = `<img src="${restaurant.thumbnail}" alt="${restaurant.name}" width="200" loading="lazy">`;
      }
    }

    // --- Menu (only if API provides an array) ---
    const menuEl = document.getElementById("menu2grid");
    if (menuEl) {
      if (Array.isArray(restaurant.menu) && restaurant.menu.length) {
        let menuHTML = "";
        restaurant.menu.forEach(item => {
          menuHTML += `
            <div class="menu-card">
              <img src="${item.photo}" alt="${item.name}" loading="lazy">
              <div class="menu-content">
                <h3>${item.name}</h3>
                <div class="price">${item.price}</div>
              </div>
            </div>
          `;
        });
        menuEl.innerHTML = menuHTML;
      } else {
        document.getElementById("menu")?.style.setProperty("display", "none");
      }
    }

    // --- Similar Restaurants ---
    // Note: this API returns ONE restaurant by id, not the full list,
    // so "similar restaurants" can't be computed client-side here unless
    // the API also exposes a list/city endpoint. Hiding section for now.
    const similarEl = document.getElementById("similar-restaurants1");
    if (similarEl) {
      similarEl.style.display = "none";
      // If you get a list endpoint later (e.g. ?city=Brooklyn), re-enable
      // the original filter+render logic here.
    }

    // --- Star rating icons ---
    const rating = restaurant.rating || 0;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars += '<i class="fa-solid fa-star"></i>';
      } else if (i === fullStars + 1 && halfStar) {
        stars += '<i class="fa-solid fa-star-half-stroke"></i>';
      } else {
        stars += '<i class="fa-regular fa-star"></i>';
      }
    }
    const starsEl = document.querySelector(".rating-stars");
    if (starsEl) starsEl.innerHTML = stars;

    // --- Rating Distribution (only if API provides it) ---
    const ratingDistEl = document.getElementById("rating-distribution1");
    if (ratingDistEl) {
      if (Array.isArray(restaurant.ratingDistribution) && restaurant.ratingDistribution.length) {
        let ratingHTML = "";
        restaurant.ratingDistribution.forEach(item => {
          ratingHTML += `
            <div class="r-row">
              <span>${item.star}</span>
              <div class="r-bar"><div class="fill" style="width:${item.percent}%"></div></div>
              <span>${item.percent}%</span>
            </div>
          `;
        });
        ratingDistEl.innerHTML = ratingHTML;
      } else {
        ratingDistEl.style.display = "none";
      }
    }

    // --- Open Hours (only if API provides it) ---
    const hoursBody = document.getElementById("hours-table-body");
    if (hoursBody) {
      if (Array.isArray(restaurant.hours) && restaurant.hours.length) {
        let hoursHTML = "";
        restaurant.hours.forEach(hour => {
          hoursHTML += `<tr><td>${hour.day}</td><td>${hour.time}</td></tr>`;
        });
        hoursBody.innerHTML = hoursHTML;
      } else {
        document.getElementById("openhours")?.style.setProperty("display", "none");
      }
    }

    // --- Map ---
    const mapEl = document.getElementById("restaurant-map");
    if (mapEl) {
      mapEl.src =
        `https://maps.google.com/maps?q=${encodeURIComponent(
          restaurant.name + ", " + restaurant.location
        )}&z=15&output=embed`;
    }
  })
  .catch(err => {
    console.error("Failed to load restaurant data:", err);
  });
