const mobileBar = document.getElementById("mobileBar");

window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;
  const pageHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollPercent = (scrollTop / pageHeight) * 100;

  // 20% scroll ke baad show
  if(scrollPercent > 20){

    mobileBar.style.display = "flex";

    setTimeout(() => {
      mobileBar.classList.add("show");
    }, 10);

  } else {

    mobileBar.classList.remove("show");

    setTimeout(() => {
      mobileBar.style.display = "none";
    }, 350);

  }

});
