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

      // ✅ Existing HTML wale info-box ko yahan se update karo
const avgInfoEl = document.getElementById("quick-avgperperson-info1");
if (avgInfoEl) {
  avgInfoEl.parentElement.innerHTML = `
    <i class="fa fa-receipt" style="font-size:15px;color:red"></i>
    <span class="ptg-tooltip-wrap">
      ₹${perPersonMin} – ₹${perPersonMax}
      <span class="ptg-tooltip-text">₹${perPersonMin} – ₹${perPersonMax}per person, based on 1 main course + 1 side + 1 drink)For two: ₹${forTwoMin} – ₹${forTwoMax}</span>
    </span>
  `;
}

      // ===== Table (unchanged) =====
      container.innerHTML = `
        <section id="ptg-prices">
          <div class="ptg-sec-title">
            <h2>${data.title}</h2>
          </div>
          <div class="ptg-table-wrap">
            <table class="ptg-table">
              <thead>
                <tr>
                  <th>Menu Item</th>
                  <th>Category</th>
                  <th>Calories</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${data.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td class="ptg-td-cal">${item.calories}</td>
                    <td class="ptg-td-price">${item.price}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table> <div class="ptg-scroll-note">
    ↔ Swipe table to see more
  </div>

  <p class="ptg-price-note">
    * Prices may vary by location.
  </p>
          </div>
        </section>
      `;
    })
    .catch(() => {
      container.innerHTML = `<p class="ptg-no-menu">Menu is currently unavailable.</p>`;
    });
});
