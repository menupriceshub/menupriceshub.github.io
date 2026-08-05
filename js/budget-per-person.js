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

      // ===== "For Two" Google-style price range =====
      const toNum = (p) => parseFloat(p.replace(/[^0-9.]/g, ""));

      // Category-wise items alag karo
      const byCategory = {};
      data.items.forEach(item => {
        if (!byCategory[item.category]) byCategory[item.category] = [];
        byCategory[item.category].push(toNum(item.price));
      });

      // Main course categories (jisme se ek zaroor order hota hai)
      const mainCategories = ["Pizza", "Burger"];
      const sideCategory = "Sides";
      const beverageCategory = "Beverages";

      // Har category ka min aur max price nikaalo
      const getMinMax = (categories) => {
        let all = [];
        categories.forEach(cat => {
          if (byCategory[cat]) all = all.concat(byCategory[cat]);
        });
        return { min: Math.min(...all), max: Math.max(...all) };
      };

      const main = getMinMax(mainCategories);
      const side = byCategory[sideCategory]
        ? { min: Math.min(...byCategory[sideCategory]), max: Math.max(...byCategory[sideCategory]) }
        : { min: 0, max: 0 };
      const bev = byCategory[beverageCategory]
        ? { min: Math.min(...byCategory[beverageCategory]), max: Math.max(...byCategory[beverageCategory]) }
        : { min: 0, max: 0 };

      // Ek person ka meal = main + side + beverage
      const perPersonMin = main.min + side.min + bev.min;
      const perPersonMax = main.max + side.max + bev.max;

      // "For Two" = per person × 2
      const forTwoMin = Math.round(perPersonMin * 2);
      const forTwoMax = Math.round(perPersonMax * 2);

      if (priceRangeEl) {
        priceRangeEl.textContent = `₹${forTwoMin}–${forTwoMax} for two`;
      }

      // ===== Table render (same as before) =====
      container.innerHTML = `
        <section id="ptg-prices">
          <div class="ptg-sec-title">
            <div class="ptg-sec-title-line"></div>
            <h2>${data.title}</h2>
            <div class="ptg-sec-title-line"></div>
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
            </table>
          </div>
        </section>
      `;
    })
    .catch(() => {
      container.innerHTML = `<p class="ptg-no-menu">Menu is currently unavailable.</p>`;
    });
});
