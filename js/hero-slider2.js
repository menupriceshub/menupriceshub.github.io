document.addEventListener("DOMContentLoaded", () => {

  const wrapper = document.querySelector("[data-restaurant-id]");
  const id = wrapper?.dataset.restaurantId;

  if (!id) return;

  fetch("./data/restaurants.json")
    .then(res => res.json())
    .then(data => {

      const restaurant = data.find(item => item.id === id);
      if (!restaurant) return;

      // ===== Baaki existing code (name, location, menu etc) =====
      document.getElementById("resturant-name1").innerHTML = restaurant.name;
      // ... etc

      // ===== SLIDER DIRECTLY JSON SE BANAO =====
      initSlider(restaurant.photos, restaurant.name);

    });

  /* =========================
     SLIDER FUNCTION (JSON images se)
  ========================= */
  function initSlider(photos, altText) {

    const sliderBox = document.querySelector(".auto-slider");
    if (!sliderBox || !photos || photos.length === 0) return;

    const slider = document.createElement("div");
    slider.className = "photo-slider";

    const track = document.createElement("div");
    track.className = "photo-track";

    photos.forEach((photoUrl) => {
      const slide = document.createElement("div");
      slide.className = "photo-slide";

      const image = document.createElement("img");
      image.src = photoUrl;
      image.alt = altText || "Photo";

      slide.appendChild(image);
      track.appendChild(slide);
    });

    slider.appendChild(track);

    const dotsWrap = document.createElement("div");
    dotsWrap.className = "slider-dots";

    photos.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dotsWrap.appendChild(dot);
    });

    slider.appendChild(dotsWrap);

    sliderBox.appendChild(slider);

    let current = 0;
    const total = photos.length;

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
