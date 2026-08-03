(function(){

document.getElementById("star-rating").innerHTML = `

<div class="star-container">

<div class="review-header-city">
<img src="" class="corner-img">
</div>

<div class="rating-card">

<h3>How was your experience?</h3>

<p>Rate this restaurant and leave a comment.</p>

<div class="stars">

<span class="fa-regular fa-star" onclick="setRating(1)"></span>
<span class="fa-regular fa-star" onclick="setRating(2)"></span>
<span class="fa-regular fa-star" onclick="setRating(3)"></span>
<span class="fa-regular fa-star" onclick="setRating(4)"></span>
<span class="fa-regular fa-star" onclick="setRating(5)"></span>

</div>


<textarea id="comment" placeholder="Write your review..."></textarea>


<button id="submitReview" onclick="submitReview()">
Submit Review
</button>


</div>

</div>
`;


let widgetSelectedRating = 0;


const widgetPageKey = "comment_" + window.location.pathname;

const widgetSubmittedKey =
"review_submitted_" + window.location.pathname;



const widgetExpiryTime = 24 * 60 * 60 * 1000;

const widgetNow = Date.now();


const widgetSavedTime = localStorage.getItem(widgetSubmittedKey+"_time");


if(widgetSavedTime && widgetNow - widgetSavedTime > widgetExpiryTime){

localStorage.removeItem(widgetSubmittedKey);

localStorage.removeItem(widgetSubmittedKey+"_time");

}




if(localStorage.getItem(widgetSubmittedKey)){


document.querySelector(".rating-card").innerHTML =
`
<div class="review-success">
<i class="fa fa-check-circle"></i>
Thanks for your review!
</div>
`;

}


else{


let box=document.getElementById("comment");

if(box){

box.value =
localStorage.getItem(widgetPageKey) || "";


box.addEventListener("input",function(){

localStorage.setItem(widgetPageKey,this.value);

});

}

}




window.setRating = function(rating){

widgetSelectedRating = rating;


document.querySelectorAll(".stars span")
.forEach((star,index)=>{


if(index < rating){

star.classList.remove("fa-regular");

star.classList.add("fa-solid");

}

else{

star.classList.remove("fa-solid");

star.classList.add("fa-regular");

}


});

};





window.submitReview = function(){


if(widgetSelectedRating===0){

alert("Please select a rating.");

return;

}



let comment =
document.getElementById("comment").value;



let formUrl =
"https://docs.google.com/forms/d/e/1FAIpQLScaJ_4wAK0Ca-Gujxaq-HBcIQQq0GmbQBKwU6_VlUcIDQySzw/viewform?usp=pp_url"
+
"&entry.1888396654="+encodeURIComponent(location.href)
+
"&entry.379203129="+encodeURIComponent(comment)
+
"&entry.1418687276="+encodeURIComponent(widgetSelectedRating);



localStorage.setItem(widgetSubmittedKey,"yes");

localStorage.setItem(
widgetSubmittedKey+"_time",
Date.now()
);



document.querySelector(".rating-card").innerHTML =
`
<div class="review-success">
 Thanks for your review!
</div>
`;



window.open(formUrl,"_blank");


};

})();
