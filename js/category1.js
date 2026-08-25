document.addEventListener("DOMContentLoaded", () => {


const section = document.getElementById(
"category-restaurants-section"
);

if(!section) return;



// URL se category nikalo
const category = location.pathname
.split("/")
.filter(Boolean)
.pop()
.toLowerCase();



fetch("/data/restaurants.json")

.then(res=>res.json())

.then(restaurants=>{


const items = restaurants.filter(r =>

r.category &&
r.category.toLowerCase() === category

);



renderCategory(
items,
section,
category
);


});


});





function renderCategory(data, section, category) {

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

        visibleCount += 5;

        renderCards();

      });

    }

  }

  renderCards();
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



function fixCategoryTabsPosition(){
  const header = document.getElementById('site-header');
  const catTabs = document.querySelector('.category-section-nav-tabs');
  if(header && catTabs){
    catTabs.style.top = header.offsetHeight + 'px';
  }
}

// Header load hone ke baad chalao
window.addEventListener('load', fixCategoryTabsPosition);

// Resize par bhi update karo (mobile rotate / responsive change)
window.addEventListener('resize', fixCategoryTabsPosition);
