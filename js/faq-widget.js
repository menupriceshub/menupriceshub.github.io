document.addEventListener("DOMContentLoaded", () => {

  const slug = location.pathname
    .split("/")
    .pop()
    .replace(".html", "")
    .toLowerCase() || "home";

  const currentTitle = document.title.toLowerCase();

  const placeholder = document.getElementById("faq-container1");
  if (!placeholder) return;

  fetch("/data/faq.json")
    .then(res => {
      if (!res.ok) throw new Error("FAQ JSON not found");
      return res.json();
    })
    .then(data => {

      // Find the most relevant FAQ using both slug and title
      let page = null;
      let bestScore = 0;

      data.forEach(item => {
        let score = 0;

        if (item.slug) {
          const s = item.slug.toLowerCase();

          if (slug === s) score += 100;
          else if (slug.includes(s) || s.includes(slug)) score += 60;

          if (currentTitle.includes(s)) score += 30;
        }

        if (item.title) {
          const t = item.title.toLowerCase();

          if (currentTitle === t) score += 100;
          else if (currentTitle.includes(t) || t.includes(currentTitle)) score += 70;
        }

        if (score > bestScore) {
          bestScore = score;
          page = item;
        }
      });

      if (!page || !page.faq) return;

      placeholder.innerHTML = `
        <div class="section-header">
          <h2 class="section-left">FAQ</h2>

          <a href="/faq/" class="section-right">
            View All
            <i class="fa-solid fa-chevron-right icon"></i>
          </a>
        </div>

        <div class="faq-grid" id="faq-grid1"></div>
      `;

      const grid = document.getElementById("faq-grid1");

      page.faq.slice(0, 5).forEach(faq => {

        const item = document.createElement("div");
        item.className = "faq-item";

        item.innerHTML = `
          <div class="faq-question">
            ${faq.question}
            <span class="faq-icon">+</span>
          </div>

          <div class="faq-answer">
            ${faq.answer}
          </div>
        `;

        item.querySelector(".faq-question").addEventListener("click", () => {
          item.classList.toggle("active");
        });

        grid.appendChild(item);
      });

    })
    .catch(err => {
      console.error("FAQ load failed:", err);
    });

});
