// CreateLayer and DestroyLayer Functions
// enables you to dynamically create a layer after the page has been loaded, can only truely delete layers in IE
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function createLayer(id,nestref,left,top,width,height,content,bgColor,visibility,zIndex) {
	if (is.ns) {
		if (nestref) {
			var lyr = eval("document."+nestref+".document."+id+" = new Layer(width, document."+nestref+")")
		}
		else {
			var lyr = document.layers[id] = new Layer(width)
			eval("document."+id+" = lyr")
		}
		lyr.name = id
		lyr.left = left
		lyr.top = top
		if (height!=null) lyr.clip.height = height
		if (bgColor!=null) lyr.bgColor = bgColor
		lyr.visibility = (visibility=='hidden')? 'hide' : 'show'
		if (zIndex!=null) lyr.zIndex = zIndex
		if (content) {
			lyr.document.open()
			lyr.document.write(content)
			lyr.document.close()
		}
	}
	else if (is.ie) {
		var str = '\n<DIV id='+id+' style="position:absolute; left:'+left+'; top:'+top+'; width:'+width
		if (height!=null) {
			str += '; height:'+height
			str += '; clip:rect(0,'+width+','+height+',0)'
		}
		if (bgColor!=null) str += '; background-color:'+bgColor		
		if (zIndex!=null) str += '; z-index:'+zIndex
		if (visibility) str += '; visibility:'+visibility
		str += ';">'+((content)?content:'')+'</DIV>'
		if (nestref) {
			index = nestref.lastIndexOf(".")
			var nestlyr = (index != -1)? nestref.substr(index+1) : nestref
			document.all[nestlyr].insertAdjacentHTML("BeforeEnd",str);
		}
		else {
			document.body.insertAdjacentHTML("BeforeEnd",str)
		}
	}
}
function destroyLayer(id,nestref) {
	if (is.ns) {
		if (nestref) eval("document."+nestref+".document."+id+".visibility = 'hide'")
		else document.layers[id].visibility = "hide"
	}
	else if (is.ie) {
		document.all[id].innerHTML = ""
		document.all[id].outerHTML = ""
	}
}
