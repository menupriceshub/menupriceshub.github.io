function renderCategory(data, section, category) {

  // Pehle sirf 10 restaurants
  let visibleCount = 10;

  function renderCards() {

    const visibleData = data.slice(0, visibleCount);

    section.innerHTML = `

      <div class="section-header">
        <h2 class="section-left">
          ${category.charAt(0).toUpperCase() + category.slice(1)} Restaurants
        </h2>

        <a href="/categories/${category}/" class="section-right">
          View All
          <i class="fa-solid fa-chevron-right icon"></i>
        </a>
      </div>

      <div class="catrest-grid">

        ${visibleData.map(r => `
          <div class="catrest-card">

            <img 
              class="catrest-img"
              src="${r.thumbnail}"
              alt="${r.name}"
              loading="lazy"
            >

            <div class="catrest-content">

              <h3 class="catrest-name">
                ${r.name}
              </h3>

              <div class="catrest-info">
                ${r.city} • ${category}
              </div>

              <div class="catrest-bottom">

                <div class="catrest-rating">
                  <span>${r.rating}</span>

                  <span class="catrest-stars">
                    ${generateStars(r.rating)}
                  </span>
                </div>

                <a href="/${r.url}" class="catrest-btn">
                  View
                </a>

              </div>

            </div>
          </div>
        `).join("")}

      </div>

      ${
        visibleCount < data.length
        ? `
          <div class="load-more-wrap">
            <button id="loadMoreCategory" class="load-more-btn">
              Load More
            </button>
          </div>
        `
        : ""
      }

    `;

    const loadMoreBtn = document.getElementById("loadMoreCategory");

    if (loadMoreBtn) {

      loadMoreBtn.addEventListener("click", () => {

        // Har click par sirf 5 aur
        visibleCount += 5;

        renderCards();

      });

    }

  }

  renderCards();
}
