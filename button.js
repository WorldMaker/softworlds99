/********************************************************************
       SoftWorlds Button Server
 ********************************************************************/

/** Our Button Options: **
 
	s - SCRAMM
	v - VERGE
	y - Yggdrasil
	a - ALL

 *************************/

sbuttons = new Object();
vbuttons = new Object();
ybuttons = new Object();
abuttons = new Object();
snum = 1;
vnum = 0;
ynum = 1;
anum = 2;

sbuttons[1] = "<img src=\"" + sw + "/images/button.gif\">";

ybuttons[1] = "<img src=\"" + sw + "/images/button.gif\">";

abuttons[1] = "<img src=\"" + sw + "/images/button.gif\">";
abuttons[2] = "<img src=\"" + ygg + "/sat.gif\">";

document.write('<p style=\"font-size: 10pt\">');

if (buttontype == "s") {
day = new Date();
seed = day.getTime();
ran = parseInt(((seed - (parseInt(seed/1000,10) * 1000))/10)/100*snum + 1,10);
document.write(sbuttons[ran]);
}

if (buttontype == "y") {
day = new Date();
seed = day.getTime();
ran = parseInt(((seed - (parseInt(seed/1000,10) * 1000))/10)/100*ynum + 1,10);
document.write(ybuttons[ran]);
}

if (buttontype == "v") {
day = new Date();
seed = day.getTime();
ran = parseInt(((seed - (parseInt(seed/1000,10) * 1000))/10)/100*vnum + 1,10);
document.write(vbuttons[ran]);
}

if (buttontype == "a") {
day = new Date();
seed = day.getTime();
ran = parseInt(((seed - (parseInt(seed/1000,10) * 1000))/10)/100*anum + 1,10);
document.write(abuttons[ran]);
}

document.write("<br><a href=\"" + sw + "/button.htm\">SoftWorlds Button Network</a></p>");