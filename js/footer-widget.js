fetch("/data/footer.json")
.then(res => res.json())
.then(data => {

let html = `

<div class="footer-container">
`;

data.columns.forEach(column => {

html += `
<div class="footer-box">
<h3>${column.title}</h3>
`;

column.links.forEach(link => {

html += `
<a href="${link.url}">${link.name}</a>
`;

});

html += `
</div>
`;

});


html += `
</div>


<div class="footer-badge">

<div class="trust-logos">

<a href="//www.dmca.com/Protection/Status.aspx?ID=c82fef17-989f-4eb1-8fe1-8d43f5f18b6e"
title="DMCA.com Protection Status"
class="dmca-badge" rel="nofollow">

<img src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=c82fef17-989f-4eb1-8fe1-8d43f5f18b6e"
alt="DMCA.com Protection Status"
loading="lazy">

</a>


<a href="https://transparencyreport.google.com/safe-browsing/search?url=https%3A%2F%2Fmenupriceshub.github.io&hl=en"
target="_blank"
rel="nofollow">

<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhReVNfbmbhAjZKh4xCyYM89L59HMlTBZ4q-pDr-BCd4HOcRbqXeGBWXVTpZwHPTMtQ9Pqkg9-kriaUe4oijPf3gjVgBTaopLmKcS1e1rfj3Md3ClO7dj4N9nOdD6gEJW79m-Gky3Kj6EzDo2wBZJFpCIleDs0_-CmuikGgmjmF1pqFSxYWcxDMW8WejySk/s1600/public.png"
height="50"
width="150"
alt="Google Safe Browsing Trusted Website"
loading="lazy">

</a>

</div>

</div>


<div class="footer-bottom">
© 2026 MenuPricesHub. All Rights Reserved.
</div>

<br><br>

`;

document.getElementById("footer").innerHTML = html;

});
