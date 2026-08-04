const overlay = document.getElementById("overlay2");
const fullImg = document.getElementById("fullImg");
const closeBtn = document.getElementById("close");

// Dynamic images ke liye
document.getElementById("photos2").addEventListener("click", function(e){
  if(e.target.tagName === "IMG"){
    fullImg.src = e.target.src;
    overlay.style.display = "flex";
  }
});


// Dynamic images ke liye
document.getElementById("img-slide1").addEventListener("click", function(e){
  if(e.target.tagName === "IMG"){
    fullImg.src = e.target.src;
    overlay.style.display = "flex";
  }
});

// Close button
closeBtn.addEventListener("click", function(){
  overlay.style.display = "none";
});

// Click outside image
overlay.addEventListener("click", function(e){
  if(e.target === overlay){
    overlay.style.display = "none";
  }
});

// ESC key
document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){
    overlay.style.display = "none";
  }
});
