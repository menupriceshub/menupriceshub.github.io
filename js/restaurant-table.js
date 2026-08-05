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
      container.innerHTML = `
        <p class="ptg-no-menu">
          Menu is currently unavailable.
        </p>
      `;
    });
});
