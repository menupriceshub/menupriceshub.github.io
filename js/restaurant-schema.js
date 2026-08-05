document.addEventListener("DOMContentLoaded", function(){

const wrapper = document.getElementById("page-wrapper");

if(!wrapper) return;

const restaurantId = wrapper.dataset.restaurantId;


fetch("/data/restaurants.json")
.then(response => response.json())
.then(data => {


const restaurant = data.find(
item => item.id === restaurantId
);


if(!restaurant){
console.log("Restaurant not found");
return;
}


const schema = {
"@context": "https://schema.org",
"@type": "Restaurant",

"name": restaurant.name,

"description": restaurant.description,

"image": restaurant.thumbnail,

"url": window.location.href,

"telephone": restaurant.phone,


"address": {
"@type": "PostalAddress",
"addressLocality": restaurant.city,
"streetAddress": restaurant.location,
"addressCountry": "IN"
},


"geo": {
"@type": "GeoCoordinates",
"latitude": restaurant.lat,
"longitude": restaurant.lng
},


"sameAs": [
restaurant.website
],


"aggregateRating": {
"@type": "AggregateRating",
"ratingValue": restaurant.rating,
"reviewCount": Number(restaurant.totalrating)
},


"openingHoursSpecification": restaurant.hours.map(item => ({
"@type":"OpeningHoursSpecification",
"dayOfWeek": item.day,
"opens": item.time.split("–")[0].trim(),
"closes": item.time.split("–")[1]?.trim()
})),


"hasMenu": {
"@type":"Menu",
"hasMenuSection": restaurant.menu.map(item=>({

"@type":"MenuItem",
"name": item.name,

"offers":{
"@type":"Offer",
"price": item.price.replace("₹",""),
"priceCurrency":"INR"
}

}))
}

};



const script = document.createElement("script");

script.type = "application/ld+json";

script.textContent = JSON.stringify(schema,null,2);


document.head.appendChild(script);


console.log("Schema Added", schema);


})

.catch(error=>{
console.error("Schema Error:",error);
});


});
