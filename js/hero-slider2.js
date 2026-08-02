document.addEventListener("DOMContentLoaded", () => {

  const wrapper = document.querySelector("[data-restaurant-id]");
  const id = wrapper?.dataset.restaurantId;

  if (!id) return;

  fetch("./data/restaurants.json")
    .then(res => res.json())
    .then(data => {

      const restaurant = data.find(item => item.id === id);
      if (!restaurant) return;

      // ===== Baaki sara existing code (name, location, menu etc) yahan =====
      document.getElementById("resturant-name1").innerHTML = restaurant.name;
      // ... etc

      // ===== PHOTOS INJECT =====
      const photosSection = document.getElementById("photos"); 
      // ya "photos2" - jo bhi tumhara actual container id hai jisme img dalni hai

      let photoHTML = "";
      restaurant.photos.forEach(photo => {
        photoHTML += `<img src="${photo}" alt="${restaurant.name}">`;
      });
      photosSection.innerHTML = photoHTML;

      // ===== AB SLIDER CHALAO (photos ready hone ke baad) =====
      initSlider();

    });

  /* =========================
     SLIDER FUNCTION
  ========================= */
  function initSlider() {

    const targetSection = document.querySelector("#photos");
    if (!targetSection) return;

    const images = targetSection.querySelectorAll("img");
    if (images.length === 0) return;

    const slider = document.createElement("div");
    slider.className = "photo-slider";

    const track = document.createElement("div");
    track.className = "photo-track";

    images.forEach((img) => {
      const slide = document.createElement("div");
      slide.className = "photo-slide";

      const image = document.createElement("img");
      image.src = img.src;
      image.alt = img.alt || "Photo";

      slide.appendChild(image);
      track.appendChild(slide);
    });

    slider.appendChild(track);

    const dotsWrap = document.createElement("div");
    dotsWrap.className = "slider-dots";

    images.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dotsWrap.appendChild(dot);
    });

    slider.appendChild(dotsWrap);

    const sliderBox = document.querySelector(".auto-slider");
    if (sliderBox) sliderBox.appendChild(slider);

    let current = 0;
    const total = images.length;

    function updateSlider() {
      track.style.transform = `translateX(-${current * 100}%)`;
      dotsWrap.querySelectorAll("span").forEach((dot, index) => {
        dot.classList.toggle("active", index === current);
      });
    }

    function nextSlide() {
      current = (current + 1) % total;
      updateSlider();
    }

    let autoSlide = setInterval(nextSlide, 4000);

    let startX = 0, moveX = 0;

    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      clearInterval(autoSlide);
    });

    slider.addEventListener("touchmove", (e) => {
      moveX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", () => {
      let diff = startX - moveX;
      if (diff > 50) current = (current + 1) % total;
      else if (diff < -50) current = (current - 1 + total) % total;
      updateSlider();
      autoSlide = setInterval(nextSlide, 4000);
    });
  }

});
