document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("city-sections");
  if (!container) return;

  // URL se city aur category nikalo
  // /cities/new-york/        -> city = new-york
  // /cities/new-york/pizza/  -> city = new-york, category = pizza
  // /cities/st-louis/        -> city = st-louis
  const parts = location.pathname.split("/").filter(Boolean);
  const i = parts.indexOf("cities");
  const citySlug = i !== -1 ? slugify(decodeURIComponent(parts[i + 1] || "")) : null;
  const catSlug = i !== -1 && parts[i + 2] ? slugify(decodeURIComponent(parts[i + 2])) : null;

  if (!citySlug) return;

  fetch("/data/restaurants.json")
    .then(res => res.json())
    .then(restaurants => {

      // Sirf is city (ya state) ke restaurants
      const cityData = restaurants.filter(r =>
        slugify(r.city) === citySlug || slugify(r.state) === citySlug
      );

      if (cityData.length === 0) {
        container.innerHTML = `<p>No restaurants found.</p>`;
        return;
      }

      // Sundar naam (New York / St. Louis) data se
      const first = cityData[0];
      const cityName = slugify(first.city) === citySlug ? first.city : first.state;

      // Heading / title
      const h1 = document.getElementById("city-title");
      if (h1) h1.textContent = `Restaurants in ${cityName}`;
      document.title = `Restaurants in ${cityName}`;

      // Agar category URL me hai (/cities/new-york/pizza/) -> poori list
      if (catSlug) {
        const cat = cityData.find(r => slugify(r.category) === catSlug);
        if (!cat) {
          container.innerHTML = `<p>No restaurants found.</p>`;
          return;
        }
        const div = document.createElement("div");
        div.id = "city-all";
        container.appendChild(div);
        renderPopular(cityData, div.id, cat.category, cityName, 1000);
        return;
      }

      // Warna category wise sections (top 6)
      const categories = [...new Set(cityData.map(r => r.category))];
      categories.sort((a, b) =>
        cityData.filter(r => r.category === b).length -
        cityData.filter(r => r.category === a).length
      );

      categories.forEach(cat => {
        const div = document.createElement("div");
        div.id = "city-" + slugify(cat);
        container.appendChild(div);
        renderPopular(cityData, div.id, cat, cityName, 6);
      });
    })
    .catch(err => {
      console.error("Data load error:", err);
      container.innerHTML = `<p>Something went wrong. Please try again.</p>`;
    });
});


// "St. Louis" -> "st-louis", "Coeur d'Alene" -> "coeur-dalene", "Food & Drinks" -> "food-drinks"
function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")  // . ' & jaise special characters hatao
    .replace(/\s+/g, "-")          // spaces -> -
    .replace(/-+/g, "-")           // multiple - -> single -
    .replace(/^-|-$/g, "");        // start/end ke - hatao
}


function renderPopular(data, sectionId, category, city, limit) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const items = data
    .filter(r => r.category === category)
    .map(r => ({
      ...r,
      score: (Number(r.rating) * 20) + (Number(r.totalrating) / 100)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (items.length === 0) return;

  section.innerHTML = `
    <div class="section-header">
      <h2 class="section-left">Popular ${category} in ${city}</h2>

      <a href="/cities/${slugify(city)}/${slugify(category)}/" class="section-right">
        View All
        <i class="fa-solid fa-chevron-right icon"></i>
      </a>
    </div>

    <div class="restaurant-grid">
      ${items.map(r => `
        <div class="restaurant-card">
          <img class="restaurant-img" src="${r.thumbnail}" alt="${r.name}">

          <div class="restaurant-content">
            <h3 class="restaurant-name">${r.name}</h3>

            <div class="restaurant-info">
              ${r.city} • ${category}
            </div>

            <div class="restaurant-bottom">
              <div class="restaurant-rating">
                <span>${r.rating}</span>
                <span class="restaurant-stars">${generateStars(r.rating)}</span>
              </div>

              <a href="/restaurants/${r.url}" class="restaurant-btn">View</a>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}


function generateStars(rating) {
  let html = "";
  rating = Number(rating);

  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;

  let hasHalf = false;
  let full = fullStars;

  if (decimal >= 0.75) {
    full = fullStars + 1;
  } else if (decimal >= 0.25) {
    hasHalf = true;
  }

  for (let i = 1; i <= 5; i++) {
    if (i <= full) {
      html += `<i class="fas fa-star"></i>`;
    } else if (i === full + 1 && hasHalf) {
      html += `<i class="fas fa-star-half-alt"></i>`;
    } else {
      html += `<i class="far fa-star"></i>`;
    }
  }

  return html;
}
