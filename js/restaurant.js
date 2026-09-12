const id = document.getElementById("page-wrapper").dataset.restaurantId;

fetch("/data/restaurants.json")
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
const directionBtn = document.getElementById("direction-btn");

directionBtn.href =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    restaurant.name + ", " + restaurant.location
  )}`;

directionBtn.target = "_blank";
directionBtn.rel = "noopener";

  document.getElementById("phonenumber-info1").innerHTML = `
  <a href="tel:${restaurant.phone}">${restaurant.phone}</a>
`;

document.getElementById("quick-rating-info1").innerHTML =
restaurant.rating;

document.getElementById("card-rating-info1").innerHTML =
restaurant.rating;

document.getElementById("total-rating1").innerHTML =
`Based on Google Reviews (${restaurant.totalrating})`;

document.getElementById("quick-location-info1").innerHTML =
restaurant.city;

  // ---- MAP EMBED (moved to top so it always renders) ----
  document.getElementById("restaurant-map").src =
  `https://maps.google.com/maps?q=${encodeURIComponent(restaurant.name + ", " + restaurant.location)}&z=15&output=embed`;

  // ---- RATING STARS (moved to top so it always renders) ----
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

  // ---- Everything below this line is optional / may be missing on some entries ----

  // Website button
  if (restaurant.website || restaurant.Website) {
    const websiteUrl = restaurant.website || restaurant.Website;
    const website = document.getElementById("websiteurl-info1");
    website.href = websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`;
    website.target = "_blank";
    website.rel = "nofollow noopener noreferrer";
    try {
      website.textContent = new URL(website.href).hostname.replace("www.", "");
    } catch (e) {
      website.textContent = websiteUrl;
    }
  }

  // Review Summary
  if (restaurant.reviewSummary) {
    document.getElementById("comment-summary1").innerHTML =
    restaurant.reviewSummary;
  }

  // Photos
  if (Array.isArray(restaurant.photos)) {
    let photoHTML="";

    restaurant.photos.forEach(photo=>{
    photoHTML += `
    <img src="${photo.src}" alt="${photo.alt}" width="200" loading="lazy">
    `;
    });

    document.getElementById("photos2").innerHTML = photoHTML;
  }

  // Menu
  if (Array.isArray(restaurant.menu)) {
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
  }

  // Similar Restaurants
  const similar = data
    .filter(item =>
      item.id !== restaurant.id &&
      item.city === restaurant.city
    )
    .slice(0, 5);

  let html = `
  <div class="section-header">
    <h2 class="section-left">Similar Restaurants</h2>
    <a href="/restaurants/" class="section-right">
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

  // Rating Distribution
  if (Array.isArray(restaurant.ratingDistribution)) {
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
  }

  // Open Hours
  if (Array.isArray(restaurant.hours)) {
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
  }

}

});
