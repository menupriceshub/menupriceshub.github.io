const page = document.getElementById("page-wrapper");

const restaurantId = page.dataset.restaurantId;

fetch("/data/restaurants.json")
.then(res => res.json())
.then(restaurants => {

const restaurant = restaurants.find(
item => item.id === restaurantId
);

if(!restaurant) return;


const schema = {
"@context": "https://schema.org",
"@type": "Restaurant",

"name": restaurant.name,

"url": window.location.href,

"image": restaurant.thumbnail,

"address": {
"@type": "PostalAddress",
"streetAddress": restaurant.address,
"addressLocality": restaurant.city,
"addressCountry": "IN"
},

"telephone": restaurant.phone,

"aggregateRating": {
"@type": "AggregateRating",
"ratingValue": restaurant.rating,
"reviewCount": restaurant.reviews
},

"sameAs": [
restaurant.website
]
};


const script = document.createElement("script");
script.type = "application/ld+json";
script.textContent = JSON.stringify(schema);

document.head.appendChild(script);


});
