const text = document.getElementById("overviewText");
const btn = document.getElementById("readBtn");

const collapsedHeight = 140;

// Word count check
const wordCount = text.innerText.trim().split(/\s+/).length;

if(wordCount <= 100){
    // 100 ya kam words hai
    btn.style.display = "none";
    text.classList.remove("collapsed");
    text.style.maxHeight = "none";

}else{
    // 100 se zyada words hai
    text.style.maxHeight = collapsedHeight + "px";

    btn.addEventListener("click", () => {

        if (text.classList.contains("collapsed")) {

            text.classList.remove("collapsed");
            text.style.maxHeight = text.scrollHeight + "px";

            text.addEventListener("transitionend", function handler() {
                text.style.maxHeight = "none";
                text.removeEventListener("transitionend", handler);
            });

            btn.textContent = "Read Less";

        } else {

            text.style.maxHeight = text.scrollHeight + "px";

            requestAnimationFrame(() => {
                text.classList.add("collapsed");
                text.style.maxHeight = collapsedHeight + "px";
            });

            btn.textContent = "Read More";
        }

    });
}
