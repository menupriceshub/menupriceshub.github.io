let ratingText = document.getElementById("card-rating-info1").innerText;
let rating = parseFloat(ratingText);

let fullStars = Math.floor(rating);
let halfStar = (rating % 1) >= 0.5;

let stars = "";

for (let i = 1; i <= 5; i++) {

  if (i <= fullStars) {
    stars += '<i class="fa-solid fa-star"></i>';
  }
  else if (i === fullStars + 1 && halfStar) {
    stars += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  else {
    stars += '<i class="fa-regular fa-star"></i>';
  }

}

document.querySelector(".rating-stars").innerHTML = stars;
