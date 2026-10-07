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

      // ==============================
      // SAFE VALUE HELPER
      // ==============================
      const safe = (val) => {
        if (val === undefined || val === null) return "";
        const str = String(val).trim();
        if (
          str === "" ||
          str.toLowerCase() === "undefined" ||
          str.toLowerCase() === "null"
        ) {
          return "";
        }
        return str;
      };

      // ==============================
      // PRICE NUMBER HELPER
      // ==============================
      const toNum = (p) =>
        parseFloat(String(p).replace(/[^0-9.]/g, "")) || 0;

      // ==============================
      // VALID ITEMS ONLY
      // (name + price dono hone chahiye)
      // ==============================
      const items = (data.items || []).filter(item =>
        safe(item.name) !== "" && toNum(item.price) > 0
      );

      // ==============================
      // PRICE RANGE (starting -> top)
      // ==============================
      const allPrices = items.map(item => toNum(item.price));

      const avgInfoEl =
        document.getElementById("quick-avgperperson-info1");

      if (avgInfoEl) {

        if (allPrices.length) {

          const minPrice = Math.round(Math.min(...allPrices));
          const maxPrice = Math.round(Math.max(...allPrices));

          avgInfoEl.parentElement.innerHTML = `
            <i
              class="fa fa-receipt"
              style="font-size:15px;color:red"
            ></i>

            <span class="ptg-tooltip-wrap">

              $${minPrice} – $${maxPrice}

              <span class="ptg-tooltip-text">
                Menu prices range from &#36; ${minPrice} (starting)
                to &#36;${maxPrice} (highest).
              </span>

            </span>
          `;

        } else {
          // Koi price nahi mila to box hide
          avgInfoEl.parentElement.style.display = "none";
        }

      }

      // ==============================
      // GROUP ITEMS BY CATEGORY
      // ==============================
      const categoryOrder = [];
      const itemsByCategory = {};

      items.forEach(item => {

        const cat = safe(item.category) || "Other";

        if (!itemsByCategory[cat]) {
          itemsByCategory[cat] = [];
          categoryOrder.push(cat);
        }

        itemsByCategory[cat].push(item);

      });

      // Agar koi valid item hi nahi hai
      if (!categoryOrder.length) {
        container.innerHTML = `
          <p class="ptg-no-menu">
            Menu is currently unavailable.
          </p>
        `;
        return;
      }

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
              ${safe(cat)}
            </button>
          `;

        }).join("");

      // ==============================
      // BUILD TABLES
      // Only Menu Item + Price
      // ==============================
      const tablesHtml =
        categoryOrder.map(cat => {

          return `
            <div
              class="ptg-tab-panel"
              id="ptg-tab-${slug(cat)}"
            >

              <h3 class="ptg-panel-title">
                ${safe(cat)}
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

                          <td data-label="Menu Item">
                            ${safe(item.name)}
                          </td>

                          <td
                            class="ptg-td-price"
                            data-label="Price"
                          >
                            ${safe(item.price)}
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
            <h2>${safe(data.title)}</h2>
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
        container.querySelectorAll(".ptg-tab-btn");

      tabButtons.forEach(btn => {

        btn.addEventListener("click", () => {

          // Remove active
          tabButtons.forEach(b => {
            b.classList.remove("active");
          });

          // Add active
          btn.classList.add("active");

          // Target panel
          const targetPanel =
            document.getElementById(btn.dataset.tab);

          if (targetPanel) {

            const header =
              document.getElementById("site-header");

            const sectionNav =
              document.getElementById("top-section-nav1");

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

        });

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
