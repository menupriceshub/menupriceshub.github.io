document.addEventListener("DOMContentLoaded", () => {

const container = document.getElementById("mph-latest-blog");

if(!container) return;

fetch("/data/blog-post.json")
.then(res => res.json())
.then(data => {

let html = `

<div class="section-header">

<h2 class="section-left">
Latest Blog Post
</h2>

<a href="/blog.html" class="section-right">
View All
<i class="fa-solid fa-chevron-right icon"></i>
</a>

</div>


<div class="mph-latest-main">


<a href="${data.featured.url}" class="mph-latest-featured">

<img src="${data.featured.image}" 
alt="${data.featured.title}">

<div class="mph-latest-overlay">

<span>Featured</span>

<h3>
${data.featured.title}
</h3>

</div>

</a>


<div class="mph-latest-list">

`;

// Only 4 blog posts
data.posts.slice(0, 4).forEach(post => {

html += `

<a href="${post.url}" class="mph-latest-item">

<img src="${post.image}" alt="${post.title}">

<h4>
${post.title}
</h4>

</a>

`;

});


html += `

</div>

</div>

`;

container.innerHTML = html;

})

.catch(err => console.log("Blog Load Error:", err));

});
