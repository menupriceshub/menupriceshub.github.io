fetch("./data/about.json")
.then(response => response.json())
.then(data => {

document.getElementById("about-title").innerHTML = data.title;
document.getElementById("about-content").innerHTML =
`
${data.description}
`;

});
