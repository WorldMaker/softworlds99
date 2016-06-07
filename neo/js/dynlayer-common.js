// Dynamic Layer Object Common Extensions
// DynLayer write(), load(), setbg(), img() addon methods
// 19990531

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

// DynLayer Load Method
// loads the contents of an external file into the layer
function DynLayerLoad(url,fn) {
	this.loadFinish = DynLayerLoadFinish
	if (is.ns) this.css.load(url,this.w)
	else if (is.ie) parent.bufferFrame.document.location = url
	this.evalfn = fn
}
function DynLayerLoadFinish() {
	if (is.ie) this.event.innerHTML = parent.bufferFrame.document.body.innerHTML
	eval(this.evalfn)
}
DynLayer.prototype.load = DynLayerLoad

// DynLayer Set Background Method
// changes the background (the layer must be clipped)
function DynLayerSetbg(color) {
	if (is.ns) this.doc.bgColor = color
	else this.css.backgroundColor = color
}
DynLayer.prototype.setbg = DynLayerSetbg

// DynLayer ChangeImage Method
// swaps an image in the layer
function DynLayerImg(imgName,imgObj) {
	this.doc.images[imgName].src = eval(imgObj+'.src')
}
DynLayer.prototype.img = DynLayerImg

// DynLayer GetRelative Methods
// retrieves the real location of a relatively positioned layer
function DynLayerGetRelativeX() {
	return (is.ns)? this.css.pageX : this.elm.offsetLeft
}
function DynLayerGetRelativeY() {
	return (is.ns)? this.css.pageY : this.elm.offsetTop
}
DynLayer.prototype.getRelativeX = DynLayerGetRelativeX
DynLayer.prototype.getRelativeY = DynLayerGetRelativeY

// DynLayer GetContent Width/Height Methods
// retrieves the total width/height of the contents of the layer when they are not known
function DynLayerGetContentWidth() {
	return (is.ns)? this.doc.width : this.elm.scrollWidth
}
function DynLayerGetContentHeight() {
	return (is.ns)? this.doc.height : this.elm.scrollHeight
}
DynLayer.prototype.getContentWidth = DynLayerGetContentWidth
DynLayer.prototype.getContentHeight = DynLayerGetContentHeight
