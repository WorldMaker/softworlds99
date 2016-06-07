<HTML>

<head>
<title>SoftWorlds Distribution</title>
<script language="JavaScript" src="js/dynlayer.js"></script>
<script language="JavaScript" src="js/dynlayer-common.js"></script>
<script language="JavaScript" src="js/dynlayer-glide.js"></script>
<script language="JavaScript" src="js/css.js"></script>
<script language="JavaScript" src="js/liquid.js"></script>
<script language="JavaScript" src="js/mouseevents.js"></script>
<script language="JavaScript" src="js/scroll2.js"></script>
<script language="JavaScript" src="js/collapsemenu.js"></script>
<script language="JavaScript">
<!--

is.ns = (document.layers)? true:false
is.ie = (document.all)? true:false

function createHotLink(hotAddress, hotTitle) {
return '<a href=\"'+hotAddress+'\"'+
' style=\"color: yellow; background: clear; cursor: hand\"'+
' onMouseOver=\"this.style.background = \'blue\'\"'+
' onMouseOut=\"this.style.background = \'\'\"'+
' onMouseDown=\"this.style.fontWeight = \'bold\'\"'+
' onMouseUp=\"this.style.fontWeight =\'normal\'\"'+
'>' + hotTitle + '</a>'
}

onload=init
function init() {
	initMouseEvents()
	mylayer = new DynLayer("mylayerDiv")
	klix = new DynLayer("klixDiv")
	klix.load = DynLayerLoad
	barlayer = new DynLayer("barlayerDiv")
	myscroll.load('<?php echo $page?>')
}

myscroll = new Scroll(25,45,490,350)
myscroll.useH = false
myscroll.imgSet('images/scroll2/metal/',16,16,37,-1,2,-1,2,1,1)
myscroll.build()

//-->
</script>
<style>
<!--
a {text-decoration: none}
-->
</style>
</head>

<body background="images/background.gif" text="#ffffff" link="yellow" alink="yellow" vlink="yellow">

<script language="JavaScript">
<!--

//findWH()

writeCSS (
css('barlayerDiv',25,5,510,40,'clear')+
css('mylayerDiv',780-220,5,210,45,'clear','padding: 5')+
css('klixDiv',780-220,50,210,350,'clear','padding: 5')+
myscroll.css
)

//-->
</script>

<script language="JavaScript">
document.write(myscroll.divStart)
</script>

<center><img src="images/biglogo.jpg"><br>
<SMALL>Welcome to SoftWorlds Distribution!</SMALL></center>

<script language="JavaScript">
document.write(myscroll.divEnd)
</script>

<div id="barlayerDiv">
<table border=0 background="images/bartop.gif" width=100%><tr><td>
<script>
document.write(
createHotLink("javascript: myscroll.window.back()","&nbsp;&nbsp;<font face='wingdings' size=3>&#0215;</font>&nbsp;Back&nbsp;")+
createHotLink("javascript: myscroll.window.forward()","&nbsp;Forward&nbsp;<font face='wingdings' size=3>&#0216;</font>")
)
</script>
</td><td width=100% align=center>
<script>
document.write(
createHotLink("javascript: myscroll.load('swhome.htm')","Home&nbsp;")+
createHotLink("ygg.html","&nbsp;Yggdrasil&nbsp;Games")
)
</script>
</td><td align=right>
<script>
document.write(
createHotLink("javascript: myscroll.load('about.htm')", "?")
)
</script>
</td></tr></table>
</div>

<div id="mylayerDiv"><img border=0 src="images/sw.gif"></div>

<div id="klixDiv">
	<table border=0 width=100%><tr><th background="images/topgrad.gif">
	<B>SoftWorlds</B>
	</th></tr><tr><td>
	<script src="swmenu.js"></script>
	</td></tr>
</div>

<!-- must have bufferFrame in the body somewhere --><IFRAME STYLE="display:none" name="bufferFrame"></IFRAME>
</body>

</HTML>