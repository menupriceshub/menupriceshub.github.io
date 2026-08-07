const id = document.getElementById("page-wrapper").dataset.restaurantId;

fetch("./data/restaurants.json")
.then(res => res.json())
.then(data => {

let restaurant = data.find(item => item.id === id);

if(restaurant){

document.getElementById("resturant-name1").innerHTML = restaurant.name;

document.getElementById("location-info1").innerHTML = restaurant.location;

  // Call Button
document.getElementById("call-btn").href =
`tel:${restaurant.phone}`;

// Direction Button
document.getElementById("direction-btn").href =
`https://www.google.com/maps/search/?api=1&query=${restaurant.lat},${restaurant.lng}`;

  document.getElementById("phonenumber-info1").innerHTML = `
  <a href="tel:${restaurant.phone}">${restaurant.phone}</a>
  
`;

  // Website button
const website = document.getElementById("websiteurl-info1");

website.href = restaurant.website;
website.target = "_blank";
website.rel = "nofollow noopener noreferrer";
website.textContent = new URL(restaurant.website).hostname.replace("www.", "");

  
  
  
document.getElementById("quick-rating-info1").innerHTML =
restaurant.rating;
  
document.getElementById("card-rating-info1").innerHTML =
restaurant.rating;
  
document.getElementById("total-rating1").innerHTML =
`Based on Google Reviews (${restaurant.totalrating})`;
  
document.getElementById("quick-location-info1").innerHTML =
restaurant.city;
  
// Review Summary
document.getElementById("comment-summary1").innerHTML =
restaurant.reviewSummary;
  
// Photos
let photoHTML="";

restaurant.photos.forEach(photo=>{
photoHTML += `
<img src="${photo.src}" alt="${photo.alt}" width="200" loading="lazy">
`;
});

document.getElementById("photos2").innerHTML = photoHTML;


// Menu
let menuHTML="";

restaurant.menu.forEach(item=>{
menuHTML += `
<div class="menu-card">
<img src="${item.photo}" alt="${item.name}" loading="lazy">
<div class="menu-content">
<h3>${item.name}</h3>
<div class="price">${item.price}</div>
</div>


</div>
`;
});

document.getElementById("menu2grid").innerHTML = menuHTML;
  
  // similar restaurant
const similar = data.filter(item =>
  item.id !== restaurant.id &&
  item.city === restaurant.city
);

let html = `
<div class="section-header">
  <h2 class="section-left">Similar Restaurants</h2>
  <a href="/restaurants.html" class="section-right">
    View All
    <i class="fa-solid fa-chevron-right icon"></i>
  </a>
</div>

<div class="similar-grid">
`;

similar.forEach(item => {
  html += `
    <div class="similar-card">
      <img src="${item.thumbnail}" alt="${item.name}" loading="lazy">
      <a href="${item.url}">${item.name} Menu</a>
    </div>
  `;
});

html += `</div>`;

document.getElementById("similar-restaurants1").innerHTML = html;


let rating = restaurant.rating;

let fullStars = Math.floor(rating);
let halfStar = rating % 1 >= 0.5;

let stars = "";

for(let i = 1; i <= 5; i++){

  if(i <= fullStars){
    stars += '<i class="fa-solid fa-star"></i>';
  }
  else if(i === fullStars + 1 && halfStar){
    stars += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  else{
    stars += '<i class="fa-regular fa-star"></i>';
  }

}

document.querySelector(".rating-stars").innerHTML = stars;


// Rating Distribution

let ratingHTML = "";

restaurant.ratingDistribution.forEach(item => {

ratingHTML += `

<div class="r-row">

<span>${item.star}</span>

<div class="r-bar">
<div class="fill" style="width:${item.percent}%"></div>
</div>

<span>${item.percent}%</span>

</div>

`;

});

document.getElementById("rating-distribution1").innerHTML = ratingHTML;


  
// Open Hours
let hoursHTML = "";

restaurant.hours.forEach(hour => {

hoursHTML += `
<tr>
<td>${hour.day}</td>
<td>${hour.time}</td>
</tr>
`;

});

document.getElementById("hours-table-body").innerHTML = hoursHTML;
  

  // map location 
document.getElementById("restaurant-map").src =
`https://maps.google.com/maps?q=${restaurant.lat},${restaurant.lng}&z=15&output=embed`;
}

});

  
