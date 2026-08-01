document.addEventListener("DOMContentLoaded", () => {

  const slug = location.pathname
    .split("/")
    .pop()
    .replace(".html", "")
    .toLowerCase() || "chipotle";


  const placeholder = document.getElementById("faq-container1");

  if (!placeholder) return;


  fetch("/data/faq.json")
    .then(res => {
      if (!res.ok) throw new Error("FAQ JSON not found");
      return res.json();
    })

    .then(data => {

      const page = data.find(item =>
        slug.includes(item.slug.toLowerCase())
      );


      if (!page || !page.faq) return;


      // Full FAQ structure inject
      placeholder.innerHTML = `
    
          <div class="section-header">
            <h2 class="section-left">FAQ</h2>

            <a href="/faq/" class="section-right">
              View All
              <i class="fa-solid fa-chevron-right icon"></i>
            </a>
          </div>

<div class="faq-grid" id="faq-grid1">
          

        
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


        item.querySelector(".faq-question")
          .addEventListener("click", () => {
            item.classList.toggle("active");
          });


        grid.appendChild(item);

      });


    })

    .catch(err => {
      console.error("FAQ load failed:", err);
    });

});
