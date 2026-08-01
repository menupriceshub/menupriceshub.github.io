document.addEventListener(
"DOMContentLoaded", ()=>{

  /* =========================
     WHICH SECTION IMAGES?
  ========================= */

  const targetSection =
  document.querySelector("#photos");
  
  // Example:
  // "#photos"
  // ".gallery"
  // "#menu"
  // ".post-body"



  if(!targetSection) return;



  /* =========================
     GET ALL IMAGES
  ========================= */

  const images =
  targetSection.querySelectorAll("img");



  if(images.length === 0) return;



  /* =========================
     CREATE SLIDER
  ========================= */

  const slider =
  document.createElement("div");

  slider.className =
  "photo-slider";



  const track =
  document.createElement("div");

  track.className =
  "photo-track";



  images.forEach((img)=>{

    const slide =
    document.createElement("div");

    slide.className =
    "photo-slide";



    const image =
    document.createElement("img");

    /* AUTO FETCH IMAGE URL */

    image.src = img.src;

    image.alt =
    img.alt || "Photo";



    slide.appendChild(image);

    track.appendChild(slide);

  });



  slider.appendChild(track);



  /* =========================
     DOTS
  ========================= */

  const dotsWrap =
  document.createElement("div");

  dotsWrap.className =
  "slider-dots";



  images.forEach((_,i)=>{

    const dot =
    document.createElement("span");

    if(i === 0){

      dot.classList.add(
        "active"
      );

    }

    dotsWrap.appendChild(dot);

  });



  slider.appendChild(dotsWrap);



  /* =========================
     SHOW SLIDER
  ========================= */

  const sliderBox =
  document.querySelector(
    ".auto-slider"
  );



  if(sliderBox){

    sliderBox.appendChild(
      slider
    );

  }



  /* =========================
     SLIDER LOGIC
  ========================= */

  let current = 0;

  const total = images.length;



  function updateSlider(){

    track.style.transform =
    `translateX(-${current * 100}%)`;



    dotsWrap
    .querySelectorAll("span")
    .forEach((dot,index)=>{

      dot.classList.toggle(
        "active",
        index === current
      );

    });

  }



  /* =========================
     AUTO SLIDE
  ========================= */

  function nextSlide(){

    current =
    (current + 1) % total;

    updateSlider();

  }



  let autoSlide =
  setInterval(nextSlide,4000);



  /* =========================
     TOUCH SWIPE
  ========================= */

  let startX = 0;

  let moveX = 0;



  slider.addEventListener(
    "touchstart",
    (e)=>{

      startX =
      e.touches[0].clientX;

      clearInterval(autoSlide);

    }
  );



  slider.addEventListener(
    "touchmove",
    (e)=>{

      moveX =
      e.touches[0].clientX;

    }
  );



  slider.addEventListener(
    "touchend",
    ()=>{

      let diff =
      startX - moveX;



      if(diff > 50){

        current =
        (current + 1) % total;

      }

      else if(diff < -50){

        current =
        (current - 1 + total)
        % total;

      }



      updateSlider();



      autoSlide =
      setInterval(
        nextSlide,
        4000
      );

    }
  );

});

