document.addEventListener("DOMContentLoaded", () => {
  const topsectionnav = document.getElementById("top-section-nav1");

  topsectionnav.innerHTML = `
    <div class="info-box">
      <i class="fa fa-check-circle" style="font-size:15px;color:red"></i> Verified
    </div>

    <a href="#reviews">
      <div class="info-box">
        <i class="fa fa-star" style="font-size:15px;color:red"></i>
        <span id="quick-rating-info1"></span> Rating
      </div>
    </a>

    <a href="#openhours">
      <div class="info-box">
        <i class="fa fa-clock" style="font-size:15px;color:red"></i> Open Hours
      </div>
    </a>

    <a href="#location">
      <div class="info-box">
        <i class="fa fa-location-dot" style="font-size:15px;color:red"></i>
        <span id="quick-location-info1"></span>
      </div>
    </a>

    <a href="#menu">
      <div class="info-box">
        <i class="fa fa-spoon" style="font-size:15px;color:red"></i> Latest Menu
      </div>
    </a>

    <a href="#location">
      <div class="info-box">
        <i class="fa fa-phone" style="font-size:15px;color:red"></i> Call Now
      </div>
    </a>

    <div class="info-box">
      <i class="fa fa-receipt" style="font-size:15px;color:red"></i>
      <span id="quick-avgperperson-info1">Loading...</span>
    </div>
  `;
});
