// Minimal Dynamic Layer Object
// a very minimal version of the DynLayer that could be used when filesize is extremely important - note none of my widgets will work with this

// Copyright 1999 Dan Steinman
// Distributed under the GNU General Public License
// Available at http://www.dansteinman.com/dynapi/

function DynLayer(id,nestref) {
	this.ns = (document.layers)
	if (this.ns) {
		this.elm = (nestref)? eval("document."+nestref+".document."+id) : document.layers[id]
		this.css = this.event = this.elm
		this.doc = this.elm.document
		this.x = this.css.left
		this.y = this.css.top
		this.w = this.css.clip.width
		this.h = this.css.clip.height
	}
	else {
		this.elm = this.event = document.all[id]
		this.css = this.elm.style
		this.doc = document
		this.x = this.elm.offsetLeft
		this.y = this.elm.offsetTop
		this.w = this.css.offsetWidth
		this.h = this.css.offsetHeight
	}
	this.obj = id + "DynLayer"
	eval(this.obj + "=this")
	this.moveTo = DynLayerMoveTo
	this.moveBy = DynLayerMoveBy
	this.show = DynLayerShow
	this.hide = DynLayerHide
}
function DynLayerMoveTo(x,y) {
	if (x!=null) {
		this.x = x
		if (this.ns) this.css.left = this.x
		else this.css.pixelLeft = this.x
	}
	if (y!=null) {
		this.y = y
		if (this.ns) this.css.top = this.y
		else this.css.pixelTop = this.y
	}
}
function DynLayerMoveBy(x,y) {
	this.moveTo(this.x+x,this.y+y)
}
function DynLayerShow() {
	this.css.visibility = (this.ns)? "show" : "visible"
}
function DynLayerHide() {
	this.css.visibility = (this.ns)? "hide" : "hidden"
}
