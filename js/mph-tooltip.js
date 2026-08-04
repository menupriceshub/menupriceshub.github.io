function showTooltip(message, duration = 2500) {
  const tip = document.getElementById("customTooltip");
  tip.innerText = message;
  tip.classList.add("show");

  clearTimeout(tip._timer);
  tip._timer = setTimeout(() => {
    tip.classList.remove("show");
  }, duration);
}
