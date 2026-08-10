document.addEventListener("DOMContentLoaded", () => {

  fetch("/data/restaurants.json")
    .then(res => res.json())
    .then(restaurants => {

      renderPopular(
        restaurants,
        "popular-restaurants-section1",
        "Restaurant"
      );

      renderPopular(
        restaurants,
        "popular-cafe-section1",
        "Cafe"
      );

    });

});


function renderPopular(data, sectionId, category){

  const section = document.getElementById(sectionId);
  if(!section) return;

  const items = data
    .filter(r => r.category === category)
    .map(r => ({
      ...r,
      score: (Number(r.rating)*20) + (Number(r.totalrating)/100)
    }))
    .sort((a,b)=>b.score-a.score)
    .slice(0,6);

  section.innerHTML = `

  <div class="popular-restaurants">

    <div class="section-header">
      <h2 class="popular-heading">Popular ${category}s</h2>
      <a href="#" class="section-right">
        View All
        <i class="fa-solid fa-chevron-right icon"></i>
      </a>
    </div>

    <div class="restaurant-grid">

      ${items.map(r=>`

        <div class="restaurant-card">

          <img class="restaurant-img" src="${r.thumbnail}">

          <div class="restaurant-content">

            <h3 class="restaurant-name">
              ${r.name}
            </h3>

            <div class="restaurant-info">
              ${r.city} • ${category}
            </div>

            <div class="restaurant-bottom">

              <div class="restaurant-rating">
                <span>${r.rating}</span>
                <span class="restaurant-stars">
                  ${generateStars(r.rating)}
                </span>
              </div>

              <a href="${r.url}" class="restaurant-btn">
                View
              </a>

            </div>

          </div>

        </div>

      `).join("")}

    </div>

  </div>

  `;

}


function generateStars(rating){

  let html="";

  for(let i=1;i<=5;i++){
    html += i <= Math.round(rating)
      ? `<i class="fas fa-star"></i>`
      : `<i class="far fa-star"></i>`;
  }

  return html;

}
