document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("faq-container2");
  if (!container) return;

  const PER_PAGE = 15;
  let allFaqs = [];
  let shown = 0;

  container.innerHTML = `
    <div class="faq-grid" id="faq-grid"></div>
    <div style="text-align:center;margin-top:20px">
      <button id="faq-load-more" class="load-more-btn" style="display:none">Load More</button>
    </div>
  `;

  const grid = document.getElementById("faq-grid");
  const btn = document.getElementById("faq-load-more");

  function renderNext() {
    const chunk = allFaqs.slice(shown, shown + PER_PAGE);

    chunk.forEach(faq => {
      const item = document.createElement("div");
      item.className = "faq-item";
      item.innerHTML = `
        <div class="faq-question">
          ${faq.question}
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">${faq.answer}</div>
      `;
      item.querySelector(".faq-question").addEventListener("click", () => {
        item.classList.toggle("active");
      });
      grid.appendChild(item);
    });

    shown += chunk.length;
    btn.style.display = shown < allFaqs.length ? "inline-block" : "none";
  }

  fetch("/data/faq.json")
    .then(res => {
      if (!res.ok) throw new Error("FAQ JSON not found");
      return res.json();
    })
    .then(data => {
      // Saare pages ke faq ek list me jod do (duplicate question hata do)
      const seen = new Set();
      data.forEach(page => {
        (page.faq || []).forEach(f => {
          const key = f.question.trim().toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            allFaqs.push(f);
          }
        });
      });

      if (!allFaqs.length) {
        container.innerHTML = "<p>No FAQs found.</p>";
        return;
      }

      renderNext();
      btn.addEventListener("click", renderNext);
    })
    .catch(err => console.error("FAQ load failed:", err));
});
