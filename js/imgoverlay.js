const overlay = document.getElementById("overlay2");
const fullImg = document.getElementById("fullImg");
const closeBtn = document.getElementById("close");

function openImage(img) {
  fullImg.src = img.src;
  overlay.style.display = "flex";
}

// Photos 2
document.getElementById("photos2").addEventListener("click", function(e) {
  if (e.target.tagName === "IMG") {
    openImage(e.target);
  }
});

// Hero slider
document.getElementById("hero-slider-photo1").addEventListener("click", function(e) {
  if (e.target.tagName === "IMG") {
    openImage(e.target);
  }
});

// Close
closeBtn.addEventListener("click", function() {
  overlay.style.display = "none";
});

// Outside click
overlay.addEventListener("click", function(e) {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});

// ESC
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    overlay.style.display = "none";
  }
});
