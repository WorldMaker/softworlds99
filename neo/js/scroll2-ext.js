// Scroll2 Extras
// a set of extentions to the Scroll2 and related objects
// 19990618

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

// animated showBlocks()
function ScrollWindowShowBlock(i,fn) {
	if (this.blockActive!=i) {
	this.blockActive=i
	this.contentlyr.css.zIndex = 1
	this.blocklyr[i].css.visibility='inherit'
	this.blocklyr[i].css.zIndex = 2
	this.blocklyr[i].moveTo(null,this.h)
	this.blocklyr[i].slideTo(null,this.marginT,10,20,this.obj+'.showBlock2(\''+fn+'\')')
	}
}
function ScrollWindowShowBlock2(fn) {
	this.contentlyr.hide()
	this.contentlyr.moveTo(null,this.marginT)
	eval(fn)
}
ScrollWindow.prototype.showBlock=ScrollWindowShowBlock
ScrollWindow.prototype.showBlock2=ScrollWindowShowBlock2

// resize ScrollBar
function ScrollBarResize(w,h) {
	this.w = w
	this.h = h
	this.lyr.clipTo(0,w,h,0)
	this.lyrc.clipTo(0,w,h,0)
	if (is.ie) {this.lyr.css.width = w; this.lyr.css.height = h;}
	this.offsetHeight = this.h-this.boxH
	this.offsetWidth = this.w-this.boxW
	if (this.boxlyr.x+this.boxW>this.w) this.boxlyr.moveTo(this.w-this.boxW,null)
	if (this.boxlyr.y+this.boxH>this.h) this.boxlyr.moveTo(null,this.h-this.boxH)
	this.onScroll()
}
ScrollBar.prototype.resize = ScrollBarResize

// resize ScrollWindow
function ScrollWindowResize(w,h) {
	if (!this.activated) return
	this.w = w
	this.h = h
	this.lyr.clipTo(0,w,h,0)
	if (this.border>0) {
	var l = new DynLayer(this.name+'BorderL')
	var r = new DynLayer(this.name+'BorderR')
	var t = new DynLayer(this.name+'BorderT')
	var b = new DynLayer(this.name+'BorderB')
	l.clipTo(0,this.border,h,0)
	r.clipTo(0,this.border,h,0)
	r.moveTo(w-this.border,null)
	t.clipTo(0,w,this.border,0)
	b.clipTo(0,w,this.border,0)
	b.moveTo(null,h-this.border)
	}
	this.screenlyr.clipTo(0,w-this.border,h-this.border,0)
	this.screenlyr.w = w
	this.screenlyr.h = h
	this.setStill = true
	this.activate()
}
ScrollWindow.prototype.resize = ScrollWindowResize

// resize Scroll2 (not impletmented yet)
function ScrollResize(w,h) {
	this.window.resize(w,h)
}
Scroll.prototype.resize = ScrollResize
