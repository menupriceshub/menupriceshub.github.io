document.addEventListener("DOMContentLoaded", () => {

  const section = document.getElementById("category-restaurants-section");

  if (!section) return;

  // URL se category nikalo
  const category = location.pathname
    .split("/")
    .filter(Boolean)
    .pop()
    .toLowerCase();

  fetch("/data/restaurants.json")
    .then(res => {
      if (!res.ok) throw new Error("Failed to load restaurants.json: " + res.status);
      return res.json();
    })
    .then(restaurants => {

      const items = restaurants.filter(r =>
        r.foodCategory &&
        r.foodCategory.some(cat => normalize(cat) === normalize(category))
      );

      renderCategory(items, section, category);

    })
    .catch(err => {
      console.error("Category restaurants error:", err);
      section.innerHTML = `<p class="error-msg">Restaurants load nahi ho paaye. Please try again later.</p>`;
    });

});

// Normalize helper — spaces/hyphens/case ignore karke compare karta hai
function normalize(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, "");
}

function renderCategory(data, section, category) {

  const heading = category.charAt(0).toUpperCase() + category.slice(1);

  if (!data || data.length === 0) {
    section.innerHTML = `
      <div class="section-header">
        <h2 class="section-left">Popular ${heading} Restaurants</h2>
        <a href="/categories/" class="section-right">
          View All
          <i class="fa-solid fa-chevron-right icon"></i>
        </a>
      </div>
      <p class="no-results">No restaurants found in this category yet.</p>
    `;
    return;
  }

  section.innerHTML = `

    <div class="section-header">
      <h2 class="section-left">Popular ${heading} Restaurants</h2>
      <a href="/categories/" class="section-right">
        View All
        <i class="fa-solid fa-chevron-right icon"></i>
      </a>
    </div>

    <div class="restaurant-grid">
      ${data.map(r => `
        <div class="restaurant-card">
          <img
            class="restaurant-img"
            src="${r.thumbnail}"
            alt="${r.name}"
            loading="lazy"
          >

          <div class="restaurant-content">
            <h3 class="restaurant-name">${r.name}</h3>

            <div class="restaurant-info">
              ${r.city} • ${heading}
            </div>

            <div class="restaurant-bottom">
              <div class="restaurant-rating">
                <span>${r.rating}</span>
                <span class="restaurant-stars">${generateStars(r.rating)}</span>
              </div>

              <a href="/${r.url}" class="restaurant-btn">View</a>
            </div>
          </div>
        </div>
      `).join("")}
    </div>

  `;
}

function generateStars(rating) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += i <= Math.round(rating)
      ? `<i class="fas fa-star"></i>`
      : `<i class="far fa-star"></i>`;
  }
  return html;
}
