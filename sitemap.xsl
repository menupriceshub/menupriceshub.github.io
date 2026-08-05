<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet 
version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">

<html>
<head>

<title>MenuPricesHub Sitemap</title>

<meta name="viewport" content="width=device-width, initial-scale=1"/>

<style>

body{
font-family:Arial, sans-serif;
background:#f8fafc;
margin:0;
padding:20px;
}

.container{
max-width:1000px;
margin:auto;
background:white;
border-radius:16px;
padding:25px;
box-shadow:0 5px 20px rgba(0,0,0,.08);
}

h1{
color:#ff4d00;
margin-bottom:5px;
}

p{
color:#555;
}

table{
width:100%;
border-collapse:collapse;
margin-top:20px;
}

th{
background:#ff4d00;
color:white;
padding:14px;
text-align:left;
}

td{
padding:14px;
border-bottom:1px solid #eee;
}

tr:hover{
background:#fff7f2;
}

a{
color:#0f172a;
text-decoration:none;
font-weight:600;
}

.badge{
background:#fff0e8;
color:#ff4d00;
padding:5px 10px;
border-radius:20px;
font-size:13px;
}

@media(max-width:600px){

body{
padding:10px;
}

.container{
padding:15px;
}

table{
font-size:14px;
}

th,td{
padding:10px;
}

}

</style>

</head>


<body>

<div class="container">

<h1>🍕 MenuPricesHub Sitemap</h1>

<p>
All pages indexed by MenuPricesHub
</p>


<table>

<tr>

<th>URL</th>

<th>Frequency</th>

<th>Priority</th>

</tr>


<xsl:for-each select="urlset/url">

<tr>

<td>

<a>

<xsl:attribute name="href">
<xsl:value-of select="loc"/>
</xsl:attribute>

<xsl:value-of select="loc"/>

</a>

</td>


<td>

<span class="badge">
<xsl:value-of select="changefreq"/>
</span>

</td>


<td>
<xsl:value-of select="priority"/>
</td>


</tr>

</xsl:for-each>


</table>

</div>

</body>

</html>

</xsl:template>

</xsl:stylesheet>
