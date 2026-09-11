/**
 * restaurant.js
 * -------------------------------------------------------------
 * Reads the restaurant id from #page-wrapper[data-restaurant-id],
 * fetches the record from the MenuPricesHub Worker API, and fills
 * in the page elements (name, address, phone, website, map,
 * open hours, menu grid, price table).
 *
 * IMPORTANT: This assumes your stored restaurant JSON looks like:
 * {
 *   "id": "03peterlugersteakhouse",
 *   "name": "Peter Luger Steak House",
 *   "category": "Steakhouse",
 *   "city": "New York",
 *   "url": "https://peterluger.com",
 *   "address": "178 Broadway, Brooklyn, NY 11211",
 *   "phone": "+1 718-387-7400",
 *   "lat": 40.7099,
 *   "lng": -73.9626,
 *   "hours": [
 *     { "day": "Monday", "open": "11:45 AM", "close": "9:45 PM" }
 *   ],
 *   "menu": [
 *     { "name": "Porterhouse Steak", "price": "$54.90", "image": "https://..." }
 *   ]
 * }
 *
 * Agar aapke actual data ke field names alag hain (jaise "address"
 * ki jagah "location", ya "phone" ki jagah "phoneNumber"), to bas
 * neeche "data.xxx" wali lines mein field names badal dijiye —
 * baaki sab as-is chalega.
 * -------------------------------------------------------------
 */

(function () {
  const WORKER_URL = "https://menupriceshub-api.cricrock24.workers.dev";

  const wrapper = document.getElementById("page-wrapper");
  const id = wrapper ? wrapper.dataset.restaurantId : null;

  if (!id) {
    console.error("restaurant.js: #page-wrapper par data-restaurant-id nahi mila.");
    return;
  }

  fetch(`${WORKER_URL}/?id=${encodeURIComponent(id)}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Restaurant not found (status ${res.status})`);
      return res.json();
    })
    .then((data) => renderRestaurant(data))
    .catch((err) => {
      console.error("restaurant.js:", err.message);
    });

  function renderRestaurant(data) {
    // --- Name ---
    setText("resturant-name1", data.name);

    // --- Address ---
    setText("location-info1", data.address || data.city);

    // --- Phone ---
    setText("phonenumber-info1", data.phone);
    const callBtn = document.getElementById("call-btn");
    if (callBtn && data.phone) {
      callBtn.href = `tel:${data.phone}`;
    }

    // --- Website ---
    const websiteEl = document.getElementById("websiteurl-info1");
    if (websiteEl && data.url) {
      websiteEl.href = data.url;
      websiteEl.textContent = data.url;
    }

    // --- Directions button ---
    const directionBtn = document.getElementById("direction-btn");
    if (directionBtn) {
      if (data.lat && data.lng) {
        directionBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${data.lat},${data.lng}`;
      } else if (data.address) {
        directionBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          data.address
        )}`;
      }
    }

    // --- Embedded map ---
    const mapFrame = document.getElementById("restaurant-map");
    if (mapFrame) {
      if (data.lat && data.lng) {
        mapFrame.src = `https://www.google.com/maps?q=${data.lat},${data.lng}&output=embed`;
      } else if (data.address) {
        mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(
          data.address
        )}&output=embed`;
      }
    }

    // --- Open hours table ---
    renderHours(data.hours);

    // --- Menu cards (top items) ---
    renderMenuGrid(data.menu);

    // --- Full price table ---
    renderPriceTable(data.menu);

    // --- Page <title>, if you want it dynamic instead of static ---
    // document.title = `${data.name} Menu With Prices 2026`;
  }

  function setText(elId, value) {
    const el = document.getElementById(elId);
    if (el && value) el.textContent = value;
  }

  function renderHours(hours) {
    const tbody = document.getElementById("hours-table-body");
    if (!tbody || !Array.isArray(hours) || hours.length === 0) return;

    tbody.innerHTML = hours
      .map(
        (h) => `
        <tr>
          <td>${escapeHtml(h.day)}</td>
          <td>${escapeHtml(h.open)} - ${escapeHtml(h.close)}</td>
        </tr>`
      )
      .join("");
  }

  function renderMenuGrid(menu) {
    const grid = document.getElementById("menu2grid");
    if (!grid || !Array.isArray(menu) || menu.length === 0) return;

    grid.innerHTML = menu
      .slice(0, 8)
      .map(
        (item) => `
        <div class="menu-card">
          ${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.name)}">` : ""}
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.price)}</p>
        </div>`
      )
      .join("");
  }

  function renderPriceTable(menu) {
    const section = document.getElementById("menu-price-table-section1");
    if (!section || !Array.isArray(menu) || menu.length === 0) return;

    section.innerHTML = `
      <h2 class="section-title">Menu Prices</h2>
      <table class="price-table">
        <thead>
          <tr><th>Item</th><th>Price</th></tr>
        </thead>
        <tbody>
          ${menu
            .map(
              (item) =>
                `<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.price)}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>`;
  }

  function escapeHtml(str) {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
})();
