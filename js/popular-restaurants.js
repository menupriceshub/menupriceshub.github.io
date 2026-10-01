document.addEventListener("DOMContentLoaded", () => {

fetch("/data/restaurants.json")
.then(res => res.json())
.then(restaurants => {


renderPopular(
  restaurants,
  "popular-restaurants-section1",
  "Pizza"
);


renderPopular(
  restaurants,
  "popular-cafe-section1",
  "Cafe"
);



renderPopular(
  restaurants,
  "popular-deli-section1",
  "Deli"
);

renderPopular(
  restaurants,
  "popular-steakhouse-section1",
  "Steakhouse"
);

renderPopular(
  restaurants,
  "popular-bbq-section1",
  "BBQ"
);

renderPopular(
  restaurants,
  "popular-cheesesteak-section1",
  "Cheesesteak"
);

renderPopular(
  restaurants,
  "popular-hot-chicken-section1",
  "Hot Chicken"
);

renderPopular(
  restaurants,
  "popular-pizza-section1",
  "Pizza"
);

renderPopular(
  restaurants,
  "popular-steak-house-section1",
  "Steak house"
);

renderPopular(
  restaurants,
  "popular-ukrainian-section1",
  "Ukrainian"
);

renderPopular(
  restaurants,
  "popular-hot-dogs-section1",
  "Hot Dogs"
);

renderPopular(
  restaurants,
  "popular-seafood-section1",
  "Seafood"
);

renderPopular(
  restaurants,
  "popular-american-section1",
  "American"
);

renderPopular(
  restaurants,
  "popular-fine-dining-section1",
  "Fine Dining"
);

renderPopular(
  restaurants,
  "popular-creole-section1",
  "Creole"
);

renderPopular(
  restaurants,
  "popular-southern-section1",
  "Southern"
);

renderPopular(
  restaurants,
  "popular-bakery-section1",
  "Bakery"
);

renderPopular(
  restaurants,
  "popular-french-section1",
  "French"
);

renderPopular(
  restaurants,
  "popular-fried-chicken-section1",
  "Fried Chicken"
);

renderPopular(
  restaurants,
  "popular-mexican-section1",
  "Mexican"
);

renderPopular(
  restaurants,
  "popular-tacos-section1",
  "Tacos"
);

renderPopular(
  restaurants,
  "popular-burgers-section1",
  "Burgers"
);

renderPopular(
  restaurants,
  "popular-japanese-section1",
  "Japanese"
);

renderPopular(
  restaurants,
  "popular-soup-section1",
  "Soup"
);

renderPopular(
  restaurants,
  "popular-caribbean-section1",
  "Caribbean"
);

renderPopular(
  restaurants,
  "popular-dessert-section1",
  "Dessert"
);

renderPopular(
  restaurants,
  "popular-breakfast-section1",
  "Breakfast"
);

renderPopular(
  restaurants,
  "popular-chili-section1",
  "Chili"
);

renderPopular(
  restaurants,
  "popular-brewpub-section1",
  "Brewpub"
);

renderPopular(
  restaurants,
  "popular-italian-beef-section1",
  "Italian Beef"
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



<a href="/categories/${category.toLowerCase()}/" class="section-right">
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



<a href="/restaurants/${r.url}" class="restaurant-btn">
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
  const decimal = rating - fullStars;

  // decide half star: agar decimal >= 0.25 aur < 0.75 to half, >=0.75 to round up as full
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
      html += `<i class="fas fa-star-half-alt"></i>`; // FontAwesome 5
      // FontAwesome 6 ho to: fa-star-half-stroke
    } else {
      html += `<i class="far fa-star"></i>`;
    }
  }

  return html;
}
