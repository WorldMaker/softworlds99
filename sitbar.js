var tablet		// This is my Variable that will store the
			// table until rendering.

tablet = ""		// Set it empty.

// This first four lines should not need to be changed.
tablet += "<table align=right>";
tablet += "<tr><td><a href=\"" + homdress + "\"><img src=\"" + barlog + "\"></a></td></tr>";
tablet += "<tr><th>" + sitname + "</th></tr>";
tablet += "<tr><td><img src=\"" + sitlog + "\"></td></tr>";

if (sitid == "sw") {  // Defines the bar for SoftWorlds pages.
	// Each line is fully self contained and can be commented out,
	// or ifed if need be.  All lines have the beginning and end
	// tages for its rown and td.  Class bar is used by top links,
	// sub by lower links, and subsub by the lowest.
	tablet += "<tr><td class=\"bar\"><a href=\"" + baseadd + "/home.htm\">Home</a></td></tr>";
	tablet += "<tr><td class=\"bar\"><a href=\"" + baseadd + "/news.htm\">News</a></td></tr>";
	tablet += "<tr><td class=\"bar\"><a href=\"" + baseadd + "/about.htm\">About</a></td></tr>";
	if (sitsubid == "a") { // Defines the about section.
		tablet += "<tr><td class=\"sub\"><a href=\"" + baseadd + "/faq.htm\">FAQ</a></td></tr>";
		tablet += "<tr><td class=\"sub\"><a href=\"" + baseadd + "/benefits.htm\">Benefits and Requirements</a></td></tr>";
	}
	tablet += "<tr><td class=\"bar\"><a href=\"" + baseadd + "/games.htm\">Games</a></td></tr>";
	if (sitsubid == "g") { // Defines the games section.
		tablet += "<tr><td class=\"sub\"><a href=\"" + baseadd + "/yggdrasil/index.html\">Yggdrasil Games</a></td></tr>";
	};
	tablet += "<tr><td class=\"bar\"><a href=\"mailto:world_maker@yahoo.com\">Join Us!</a></td></tr>";
	tablet += "<tr><td class=\"bar\"><a href=\"mailto:world_maker@yahoo.com\">Contact Us!</a></td></tr>";
};

if (sitid == "ygg") {  // Defines Yggdrasil
	tablet += "<tr><td class=\"bar\"><a href=\"" + baseadd + "/index.html\">Home</a></td></tr>";
	tablet += "<tr><td class=\"bar\"><a href=\"" + baseadd + "/about.htm\">About</a></td></tr>";
	tablet += "<tr><td class=\"bar\"><a href=\"" + baseadd + "/games.htm\">Games</a></td></tr>";
	if (sitsubid == "g" || sitsubid == "q") {
		tablet += "<tr><td class=\"sub\"><a href=\"" + baseadd + "/quid.htm\">The Quiddity</a></td></tr>";
		if (sitsubid == "q") {
			tablet += "<tr><td class=\"subsub\">&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"" + baseadd + "/eazer.htm\">Eazer</a></td></tr>";
			tablet += "<tr><td class=\"subsub\">&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"" + baseadd + "/../azeroth/index.html\">Azeroth: Legacy</a></td></tr>";
		}
		tablet += "<tr><td class=\"sub\"><a href=\"" + baseadd + "/ms.htm\">Market$hare</a></td></tr>";
		tablet += "<tr><td class=\"sub\"><a href=\"" + baseadd + "/chron.htm\">v'Magine</a></td></tr>";
	}
	tablet += "<tr><td class=\"bar\"><a href=\"mailto:world_maker@yahoo.com\">Join Us!</a></td></tr>";
	tablet += "<tr><td class=\"bar\"><a href=\"mailto:world_maker@yahoo.com\">Contact Us!</a></td></tr>";
	tablet += "<tr><td class=\"sub\">A Satellite of <a href=\"" + baseadd + "/../home.htm\">SoftWorlds</a></td></tr>";
}

if (sitid == "az") { // Defines Azeroth: Legacy.
	tablet += "<tr><td class=\"bar\"><a href=\"" + baseadd + "/index.html\">Home</a></td></tr>";
	tablet += "<tr><td class=\"bar\"><a href=\"" + baseadd + "/welcome.htm\">Welcome</a></td></tr>";
	tablet += "<tr><td class=\"bar\"><a href=\"" + baseadd + "/guid.htm\">The GUIddity</a></td></tr>";
	tablet += "<tr><td class=\"bar\"><a href=\"" + baseadd + "/qa.htm\">Questions and Answers</a></td></tr>";
	tablet += "<tr><td class=\"bar\"><a href=\"" + baseadd + "/more.htm\">More Info...</a></td></tr>";
	tablet += "<tr><td class=\"sub\">Created By <a href=\"" + baseadd + "/../yggdrasil/index.html\">Yggdrasil Games</a></td></tr>";
}

tablet += "</table>";  //This line doesn't need to be changed either.

document.write(tablet);  //Renders the table.
