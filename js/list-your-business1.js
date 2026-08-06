document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("elb-hero-slider");

  if (!slider) return;

  slider.innerHTML = `
    <div class="elb-hero-slides">

      <div class="elb-hero-slide elb-active"
        style="background-image:url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhQObpsHoeagJ3VEucNW-vygCajeXeM98-gmF68C6PY6nBh-7q11uZ4f-1B2K93ZtPF22_LMBM79Vyi9dI-nipI_gh8YPgmEWQlWudlHf159kN3PFe3VY7-f7z7BbzzZGTxzwYI1kPu1U8BYalI5SlF9u0rmJ1-CfTIAKskXbLy2jn3Vyv1dwHKmkkFDHA/s1600/3d-restaurant-img.webp');
               background-color:blue;">

        <div class="elb-hero-overlay"></div>

        <div class="elb-hero-content">
          <h1>Get a <span>FREE</span><br> Business<br> Listing</h1>

          <p class="subtitlex">
            List Your Restaurant, Cafe, Fast Food or Online Business.
            Get discovered by thousands of customers every day.
          </p>

          <a href="https://menupriceshub.github.io/list-your-business.html"
             class="elb-hero-btn">
            List Your Business
          </a>
        </div>

      </div>

    </div>
  `;
});
