<script>
(function(){

const container = document.getElementById("breadcrumb1");

const path = window.location.pathname
.replace(/^\/|\/$/g,"")
.split("/")
.filter(Boolean);

let html = '<a href="/">Home</a>';

let currentPath = "";

path.forEach((part,index)=>{

currentPath += "/" + part;

let name = part
.replace(".html","")
.replace(/[-_]/g," ")
.replace(/\b\w/g,c=>c.toUpperCase());

html += '<span class="separator">›</span>';

if(index === path.length-1){
html += '<span>'+name+'</span>';
}else{
html += '<a href="'+currentPath+'/">'+name+'</a>';
}

});

container.innerHTML = html;

})();
</script>
