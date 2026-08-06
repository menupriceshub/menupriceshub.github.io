document.addEventListener("DOMContentLoaded", () => {
  const topsectionnav = document.getElementById("top-section-nav1");

  topsectionnav.innerHTML = `
    <a href="#overview" class="nav-tab active-tab">
Overview
</a>

<a href="#menu" class="nav-tab">
Menu
</a>
<a href="#ptg-prices" class="nav-tab">
Price List
</a>


<a href="#photos" class="nav-tab">
Photos
</a>

<a href="#location" class="nav-tab">
Location
</a>

<a href="#openhours" class="nav-tab">
Open Hours
</a>


<a href="#reviews" class="nav-tab">
Reviews
</a>

<a href="#faq" class="nav-tab">
FAQ
</a>
  `;
});
