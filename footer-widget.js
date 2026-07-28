fetch("./data/footer.json")
.then(res => res.json())
.then(data => {

let footerHTML = `
<div class="footer-container">
`;

data.columns.forEach(column => {

footerHTML += `
<div class="footer-box">
<h3>${column.title}</h3>
`;

column.links.forEach(link => {

footerHTML += `
<a href="${link.url}">
${link.name}
</a>
`;

});

footerHTML += `
</div>
`;

});


footerHTML += `
</div>

<div class="footer-bottom">
${data.copyright}
</div>
`;


document.getElementById("footer").innerHTML = footerHTML;


})
.catch(error => console.log(error));
