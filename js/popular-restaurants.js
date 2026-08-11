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


// filter category
const items = data
.filter(r => r.category === category)
.map(r => ({
 ...r,
 score: (Number(r.rating)*20) + (Number(r.totalrating)/100)
}))
.sort((a,b)=>b.score-a.score)
.slice(0,6);



section.innerHTML = `

<div class="section-header">
<h2 class="section-left">Popular ${category}s</h2>

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
<span>{r.rating}</span>
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

`;

}



function generateStars(rating){
  let html = "";
  rating = Number(rating);

  const fullStars = Math.floor(rating);
  const hasHalf = (rating - fullStars) >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      html += `<i class="fas fa-star"></i>`;
    } else if (i === fullStars + 1 && hasHalf) {
      html += `<i class="fas fa-star-half-alt"></i>`;
    } else {
      html += `<i class="far fa-star"></i>`;
    }
  }

  return html;
}
