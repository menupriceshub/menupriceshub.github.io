document.addEventListener("DOMContentLoaded", () => {

const grid = document.getElementById("popular-restaurants-grid");

if(!grid) return;

fetch("/data/restaurants.json")
.then(res => res.json())
.then(restaurants => {


const popular = restaurants
.map(r => ({
    ...r,
    score: (Number(r.rating) * 20) + (Number(r.totalrating) / 100)
}))
.sort((a,b)=> b.score - a.score)
.slice(0,6);



grid.innerHTML = popular.map(r => `

<div class="restaurant-card">

<img class="restaurant-img" 
src="${r.thumbnail}" 
alt="${r.name}">

<div class="restaurant-content">

<h3 class="restaurant-name">
${r.name}
</h3>

<div class="restaurant-info">
${r.city} • Restaurant
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

`).join("");



})
.catch(err=>{
console.log("Restaurant JSON Error:",err);
});


});


// Star generate function
function generateStars(rating){

let stars="";

for(let i=1;i<=5;i++){

if(i <= Math.round(rating)){
stars += `<i class="fas fa-star"></i>`;
}
else{
stars += `<i class="far fa-star"></i>`;
}

}

return stars;

}
