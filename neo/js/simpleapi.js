// SimpleAPI
// set of functions for easily manipulating layers, a simple alternative to using the DynLayer
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

// warning: these have not been test, please email me a fix if there's any problems

// get the style object reference
function getObject(id,nestref) {
	if (is.ns) return (nestref)? eval('document.'+nestref+'.document.'+id+'.document') : document.layers[id].document
	if (is.ie) return document.all[id].style
}

// get the element object reference
function getElement(id,nestref) {
	if (is.ns) return getObject(id,nestref)
	if (is.ie) return document.all[id]
}

// show and hide functions
function show(obj) {
	if (is.ns) obj.visibility = "show"
	else if (is.ie) obj.visibility = "visible"
}
function hide(obj) {
	if (is.ns) obj.visibility = "hide"
	else if (is.ie) obj.visibility = "hidden"
}

// movement functions
function getX(obj) {
	if (is.ns) return obj.css.left
	else return obj.css.pixelLeft
}
function getY(obj) {
	if (is.ns) return obj.css.top
	else return obj.css.pixelTop
}
function setX(obj,x) {
	if (is.ns) obj.css.left = x
	else obj.css.pixelLeft = x
}
function setY(obj,y) {
	if (is.ns) obj.css.top = y
	else obj.css.pixelTop = y
}
function moveTo(obj,x,y) {
	if (x!=null) setX(obj,x)
	if (y!=null)setY(obj,y)
}
function moveBy(obj,x,y) {
	setX(obj,getX(obj)+x)
	setY(obj,getY(obj)+y)
}

// layer write function
function layerWrite(elm,text) {  // use getElement()
	if (is.ns) {
		elm.open()
		elm.write(text)
		elm.close()
	}
	else elm.innerHTML = text
}

// background color
function setbg(obj,color) {
	if (is.ns) obj.document.bgColor = color
	else obj.backgroundColor = color
}
