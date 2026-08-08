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

r.foodCategory &&
r.foodCategory.some(cat =>
cat.toLowerCase() === category
)

);



renderCategory(
items,
section,
category
);


});


});





function renderCategory(data, section, category){


section.innerHTML = `


<div class="section-header">

<h2 class="section-left">
Popular ${category.charAt(0).toUpperCase()+category.slice(1)} Restaurants
</h2>


<a href="/categories/" class="section-right">
View All
<i class="fa-solid fa-chevron-right icon"></i>
</a>


</div>



<div class="restaurant-grid">


${data.map(r=>`


<div class="restaurant-card">


<img 
class="restaurant-img"
src="${r.thumbnail}"
alt="${r.name}"
loading="lazy"
>


<div class="restaurant-content">


<h3 class="restaurant-name">
${r.name}
</h3>



<div class="restaurant-info">

${r.city} • ${category}

</div>



<div class="restaurant-bottom">


<div class="restaurant-rating">

<span>
${r.rating}
</span>


<span class="restaurant-stars">
${generateStars(r.rating)}
</span>


</div>



<a 
href="/${r.url}" 
class="restaurant-btn">
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

let html="";


for(let i=1;i<=5;i++){

html += i <= Math.round(rating)

? `<i class="fas fa-star"></i>`

: `<i class="far fa-star"></i>`;

}


return html;

}
