document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("page-wrapper");
  const restaurantId = wrapper?.dataset.restaurantId;
  const container = document.getElementById("menu-price-table-section1");
  const priceRangeEl = document.getElementById("ptg-price-range");

  if (!restaurantId || !container) return;

  fetch(`/data/restaurant-table/${restaurantId}.json`)
    .then(res => {
      if (!res.ok) throw new Error("Not found");
      return res.json();
    })
    .then(data => {

      const toNum = (p) => parseFloat(p.replace(/[^0-9.]/g, ""));

      const byCategory = {};
      data.items.forEach(item => {
        if (!byCategory[item.category]) byCategory[item.category] = [];
        byCategory[item.category].push(toNum(item.price));
      });

      const mainCategories = ["Pizza", "Burger"];
      const getMinMax = (categories) => {
        let all = [];
        categories.forEach(cat => {
          if (byCategory[cat]) all = all.concat(byCategory[cat]);
        });
        return { min: Math.min(...all), max: Math.max(...all) };
      };

      const main = getMinMax(mainCategories);
      const side = byCategory["Sides"]
        ? { min: Math.min(...byCategory["Sides"]), max: Math.max(...byCategory["Sides"]) }
        : { min: 0, max: 0 };
      const bev = byCategory["Beverages"]
        ? { min: Math.min(...byCategory["Beverages"]), max: Math.max(...byCategory["Beverages"]) }
        : { min: 0, max: 0 };

      const perPersonMin = Math.round(main.min + side.min + bev.min);
      const perPersonMax = Math.round(main.max + side.max + bev.max);
      const forTwoMin = perPersonMin * 2;
      const forTwoMax = perPersonMax * 2;

      // ✅ Info box update (unchanged)
      const avgInfoEl = document.getElementById("quick-avgperperson-info1");
      if (avgInfoEl) {
        avgInfoEl.parentElement.innerHTML = `
          <i class="fa fa-receipt" style="font-size:15px;color:red"></i>
          <span class="ptg-tooltip-wrap">
            ₹${perPersonMin} – ₹${perPersonMax}
            <span class="ptg-tooltip-text">₹${perPersonMin} – ₹${perPersonMax} per person, based on 1 main course + 1 side + 1 drink. For two: ₹${forTwoMin} – ₹${forTwoMax}</span>
          </span>
        `;
      }

      // ===== Group items by category, preserving first-seen order =====
      const categoryOrder = [];
      const itemsByCategory = {};
      data.items.forEach(item => {
        if (!itemsByCategory[item.category]) {
          itemsByCategory[item.category] = [];
          categoryOrder.push(item.category);
        }
        itemsByCategory[item.category].push(item);
      });

      // Helper to make a safe id from category name
      const slug = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      // ===== Build tabs =====
      const tabsHtml = categoryOrder.map((cat, idx) => `
        <button class="ptg-tab-btn${idx === 0 ? " active" : ""}" data-tab="ptg-tab-${slug(cat)}">
          ${cat}
        </button>
      `).join("");

      // ===== Build one table per category =====
      const tablesHtml = categoryOrder.map((cat, idx) => `
        <div class="ptg-tab-panel${idx === 0 ? " active" : ""}" id="ptg-tab-${slug(cat)}">
          <div class="ptg-table-wrap">
            <table class="ptg-table">
              <thead>
                <tr>
                  <th>Menu Item</th>
                  <th>Calories</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsByCategory[cat].map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td class="ptg-td-cal">${item.calories}</td>
                    <td class="ptg-td-price">${item.price}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `).join("");

      container.innerHTML = `
        <section id="ptg-prices">
          <div class="ptg-sec-title">
            <h2>${data.title}</h2>
          </div>

          <div class="ptg-tabs">
            ${tabsHtml}
          </div>

          <div class="ptg-tab-panels">
            ${tablesHtml}
          </div>

          <div class="ptg-scroll-note">
            ↔ Swipe table to see more
          </div>

          <p class="ptg-price-note">
            * Prices may vary by location.
          </p>
        </section>
      `;

      // ===== Tab switching logic =====
      const tabButtons = container.querySelectorAll(".ptg-tab-btn");
      const tabPanels = container.querySelectorAll(".ptg-tab-panel");

      tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          tabButtons.forEach(b => b.classList.remove("active"));
          tabPanels.forEach(p => p.classList.remove("active"));

          btn.classList.add("active");
          document.getElementById(btn.dataset.tab).classList.add("active");
        });
      });
    })
    .catch(() => {
      container.innerHTML = `<p class="ptg-no-menu">Menu is currently unavailable.</p>`;
    });
});
