// ButtonImage Object
// button widget with a swappable image and down/up/roll controls
// 19990613

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function ButtonImage(x,y,width,height) {
	this.name = "ButtonImage"+(ButtonImage.count++)
	this.x = x
	this.y = y
	this.w = width
	this.h = height
	this.obj = this.name+"Object"
	eval(this.obj+"=this")
}
ButtonImage.prototype.checkbox = false
ButtonImage.prototype.preload = ButtonImagePreload
ButtonImage.prototype.setImages = ButtonImageSetImages
ButtonImage.prototype.build = ButtonImageBuild
ButtonImage.prototype.activate = ButtonImageActivate
ButtonImage.prototype.down = ButtonImageDown
ButtonImage.prototype.up = ButtonImageUp
ButtonImage.prototype.over = ButtonImageOver
ButtonImage.prototype.out = ButtonImageOut
ButtonImage.prototype.change = ButtonImageChange
ButtonImage.prototype.onDown = new Function()
ButtonImage.prototype.onUp = new Function()
ButtonImage.prototype.onOver = new Function()
ButtonImage.prototype.onOut = new Function()
ButtonImage.prototype.onSelect = new Function()
ButtonImage.prototype.onDeselect = new Function()

function ButtonImageSetImages(imgOff,imgOn,imgRoll,dir) {
	if (!dir) dir = ''
	this.preload(this.obj+".imgOff",imgOff?dir+imgOff:'')
	this.preload(this.obj+".imgOn",imgOn?dir+imgOn:'')
	this.preload(this.obj+".imgRoll",imgRoll?dir+imgRoll:'')
}
function ButtonImagePreload(imgObj,imgSrc) {
	if (imgSrc) {
		eval(imgObj+' = new Image()')
		eval(imgObj+'.src = "'+imgSrc+'"')
		eval(imgObj+'s = true')
	}
	else eval(imgObj+'s = false')
}
function ButtonImageBuild() {
	this.css = css(this.name,this.x,this.y,this.w,this.h)+
	css(this.name+'C',0,0,this.w,this.h)
	
	this.div = '<div id="'+this.name+'">\n<img name="'+this.name+'Img" src="'+this.imgOff.src+'" width='+this.w+' height='+this.h+'>\n'+
	'<div id="'+this.name+'C"></div>\n'+
	'</div>'
}
function ButtonImageActivate() {
	this.lyr = new DynLayer(this.name)
	this.clyr = new DynLayer(this.name+'C')
	if (is.ns) this.clyr.elm.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP)
	this.clyr.elm.onmousedown = new Function(this.obj+".down(); return false;")
	this.clyr.elm.onmouseup = new Function(this.obj+".up(); return false;")
	this.clyr.elm.onmouseover = new Function(this.obj+".over(); return false;")
	this.clyr.elm.onmouseout = new Function(this.obj+".out(); return false;")
}
function ButtonImageDown() {
	if (this.selected) {
		this.selected = false
		if (this.imgOns) this.change(this.imgOn)
		this.onDeselect()
	}
	else {
		if (this.checkbox) this.selected = true
		if (this.imgOns) this.change(this.imgOn)
		this.onSelect()
	}
	this.onDown()
}
function ButtonImageUp() {
	if (!this.selected) {
		if (this.imgRolls) this.change(this.imgRoll)
		else if (this.imgOns) this.change(this.imgOff)
	}
	this.onUp()
}
function ButtonImageOver() {
	if (this.imgRolls && !this.selected) this.change(this.imgRoll)
	this.onOver()
}
function ButtonImageOut() {
	if (this.imgRolls && !this.selected) this.change(this.imgOff)
	this.onOut()
}
function ButtonImageChange(img) {
	this.lyr.doc.images[this.name+"Img"].src = img.src
}
ButtonImage.count = 0
