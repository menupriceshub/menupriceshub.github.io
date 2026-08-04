
document.addEventListener("DOMContentLoaded",()=>{

if(window.innerWidth <= 768) return;

/* Desktop Only */

const nav = document.getElementById("navMenu");

if(!nav) return;

const links =
Array.from(nav.children)
.filter(el => el.tagName === "A");

if(links.length <= 5) return;

/* Create More Menu */

const moreMenu =
document.createElement("div");

moreMenu.className =
"more-menu";

moreMenu.innerHTML = `
<button class="more-btn">
More <i class="fa fa-angle-down"></i>
</button>
<div class="more-dropdown"></div>
`;

const dropdown =
moreMenu.querySelector(
".more-dropdown"
);

/* Move items after 5 */

links.slice(5).forEach(link=>{

dropdown.appendChild(link);

});

/* Add More Button */

nav.appendChild(moreMenu);

});

