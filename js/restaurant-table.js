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

      // ==============================
      // PRICE NUMBER HELPER
      // ==============================

      const toNum = (p) =>
        parseFloat(String(p).replace(/[^0-9.]/g, "")) || 0;


      // ==============================
      // GROUP PRICE BY CATEGORY
      // ==============================

      const byCategory = {};

      data.items.forEach(item => {

        if (!byCategory[item.category]) {
          byCategory[item.category] = [];
        }

        byCategory[item.category].push(
          toNum(item.price)
        );

      });


      // ==============================
      // PRICE RANGE CALCULATION
      // ==============================

      const mainCategories = ["Pizza", "Burger"];

      const getMinMax = (categories) => {

        let all = [];

        categories.forEach(cat => {

          if (byCategory[cat]) {
            all = all.concat(byCategory[cat]);
          }

        });

        if (!all.length) {
          return {
            min: 0,
            max: 0
          };
        }

        return {
          min: Math.min(...all),
          max: Math.max(...all)
        };

      };


      const main = getMinMax(mainCategories);


      const side = byCategory["Sides"]
        ? {
            min: Math.min(...byCategory["Sides"]),
            max: Math.max(...byCategory["Sides"])
          }
        : {
            min: 0,
            max: 0
          };


      const bev = byCategory["Beverages"]
        ? {
            min: Math.min(...byCategory["Beverages"]),
            max: Math.max(...byCategory["Beverages"])
          }
        : {
            min: 0,
            max: 0
          };


      const perPersonMin =
        Math.round(
          main.min +
          side.min +
          bev.min
        );


      const perPersonMax =
        Math.round(
          main.max +
          side.max +
          bev.max
        );


      const forTwoMin =
        perPersonMin * 2;


      const forTwoMax =
        perPersonMax * 2;


      // ==============================
      // PRICE INFO BOX
      // ==============================

      const avgInfoEl =
        document.getElementById(
          "quick-avgperperson-info1"
        );


      if (avgInfoEl) {

        avgInfoEl.parentElement.innerHTML = `
          <i
            class="fa fa-receipt"
            style="font-size:15px;color:red"
          ></i>

          <span class="ptg-tooltip-wrap">

            ₹${perPersonMin} – ₹${perPersonMax}

            <span class="ptg-tooltip-text">
              ₹${perPersonMin} – ₹${perPersonMax}
              per person, based on
              1 main course + 1 side + 1 drink.
              For two:
              ₹${forTwoMin} – ₹${forTwoMax}
            </span>

          </span>
        `;

      }


      // ==============================
      // GROUP ITEMS BY CATEGORY
      // ==============================

      const categoryOrder = [];
      const itemsByCategory = {};


      data.items.forEach(item => {

        if (!itemsByCategory[item.category]) {

          itemsByCategory[item.category] = [];

          categoryOrder.push(
            item.category
          );

        }

        itemsByCategory[item.category].push(
          item
        );

      });


      // ==============================
      // CATEGORY SLUG
      // ==============================

      const slug = (str) => {

        return String(str)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      };


      // ==============================
      // BUILD TABS
      // ==============================

      const tabsHtml =
        categoryOrder.map((cat, idx) => {

          return `
            <button
              class="ptg-tab-btn${idx === 0 ? " active" : ""}"
              data-tab="ptg-tab-${slug(cat)}"
            >
              ${cat}
            </button>
          `;

        }).join("");


      // ==============================
      // BUILD TABLES
      // ==============================
      // Calories column removed.
      // Only Menu Item + Price.
      // ==============================

      const tablesHtml =
        categoryOrder.map(cat => {

          return `
            <div
              class="ptg-tab-panel"
              id="ptg-tab-${slug(cat)}"
            >

              <h3 class="ptg-panel-title">
                ${cat}
              </h3>

              <div class="ptg-table-wrap">

                <table class="ptg-table">

                  <thead>
                    <tr>
                      <th>Menu Item</th>
                      <th>Price</th>
                    </tr>
                  </thead>

                  <tbody>

                    ${itemsByCategory[cat].map(item => {

                      return `
                        <tr>

                          <td
                            data-label="Menu Item"
                          >
                            ${item.name}
                          </td>

                          <td
                            class="ptg-td-price"
                            data-label="Price"
                          >
                            ${item.price}
                          </td>

                        </tr>
                      `;

                    }).join("")}

                  </tbody>

                </table>

              </div>

            </div>
          `;

        }).join("");


      // ==============================
      // INSERT HTML
      // ==============================

      container.innerHTML = `

        <section id="menu-price-table-section1">

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


      // ==============================
      // TAB CLICK
      // ==============================

      const tabButtons =
        container.querySelectorAll(
          ".ptg-tab-btn"
        );


      tabButtons.forEach(btn => {

        btn.addEventListener(
          "click",
          () => {

            // Remove active
            tabButtons.forEach(b => {
              b.classList.remove("active");
            });


            // Add active
            btn.classList.add("active");


            // Target panel
            const targetPanel =
              document.getElementById(
                btn.dataset.tab
              );


            if (targetPanel) {

              const header =
                document.getElementById(
                  "site-header"
                );


              const sectionNav =
                document.getElementById(
                  "top-section-nav1"
                );


              // Calculate sticky height
              const stickyOffset =
                (header?.offsetHeight || 0) +
                (sectionNav?.offsetHeight || 0) +
                10;


              const targetY =
                targetPanel.getBoundingClientRect().top +
                window.pageYOffset -
                stickyOffset;


              window.scrollTo({
                top: targetY,
                behavior: "smooth"
              });

            }


            // Keep clicked tab visible
            btn.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center"
            });

          }
        );

      });

    })

    .catch(() => {

      container.innerHTML = `
        <p class="ptg-no-menu">
          Menu is currently unavailable.
        </p>
      `;

    });

});
