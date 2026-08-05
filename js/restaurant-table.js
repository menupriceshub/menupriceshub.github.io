document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("page-wrapper");
  const restaurantId = wrapper?.dataset.restaurantId;
  const container = document.getElementById("menu-price-table-section1");

  if (!restaurantId || !container) return;

  fetch(`/data/restaurant-table/${restaurantId}.json`)
    .then(res => {
      if (!res.ok) throw new Error("Not found");
      return res.json();
    })
    .then(data => {

      const categories = [...new Set(data.items.map(item => item.category))];

      container.innerHTML = `
        <section id="ptg-prices">

          <div class="ptg-sec-title">
            <div class="ptg-sec-title-line"></div>
            <h2>${data.title}</h2>
            <div class="ptg-sec-title-line"></div>
          </div>

          ${categories.map(category => `
            <h3 class="ptg-category-title">${category}</h3>

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
                  ${data.items
                    .filter(item => item.category === category)
                    .map(item => `
                      <tr>
                        <td>${item.name}</td>
                        <td class="ptg-td-cal">${item.calories}</td>
                        <td class="ptg-td-price">${item.price}</td>
                      </tr>
                    `).join("")}
                </tbody>
              </table>
            </div>
          `).join("")}

        </section>
      `;
    })
    .catch(() => {
      container.innerHTML = "<p>Menu is currently unavailable.</p>";
    });
});
