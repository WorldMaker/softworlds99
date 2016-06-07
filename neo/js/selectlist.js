// SelectList Object
// widget that mimics an HTML Select List utilizing the List Object
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function SelectList(x,y,width,height,listW) {
	this.name = "SelectList"+(SelectList.count++)
	this.x = x
	this.y = y
	this.w = width
	this.h = height

	this.fontname = 'Helvetica'
	this.fontsize = 11
	this.color = new Object()
	this.color.text = '#000000'
	this.color.border = '#000000'

	this.textX = 0
	this.textY = 0
	this.listX = 0
	this.listW = (listW)?listW:this.w
	this.zIndex = null
	this.visibility = 'inherit'
	
	this.list = new List(1,0,this.listW-2)
	this.list.preSelect = 0
	
	this.opened = false
	this.obj = this.name + "SelectListObject"
	eval(this.obj + "=this")
	this.build = SelectListBuild
	this.activate = SelectListActivate
	this.open = SelectListOpen
	this.close = SelectListClose
	this.toggle = SelectListToggle
	this.select = SelectListSelect
	this.onSelect = new Function()
	this.setImage = SelectListSetImage
	this.setImage()
}
function SelectListSetImage(imageL,imageM,imageR,imageLw,imageRw) {
	this.imageLw = imageLw
	this.imageMw = this.w-imageLw-imageRw
	this.imageRw = imageRw
	this.imageL = (imageL)? '<img src="'+imageL+'" width='+this.imageLw+' height='+this.h+'>':''
	this.imageM = (imageM)? '<img src="'+imageM+'" width='+this.imageMw+' height='+this.h+'>':''
	this.imageR = (imageR)? '<img src="'+imageR+'" width='+this.imageRw+' height='+this.h+'>':''
}
function SelectListBuild(write) {
	this.list.build()
	this.css = css(this.name,this.x,this.y,this.w,this.h,null,this.visibility,this.zIndex)+
	css(this.name+'List',this.listX,this.h,this.listW,0,this.color.border)+
	this.list.css+
	css(this.name+'SelectorBG1',0,0,this.w,this.h,this.color.border)+
	css(this.name+'SelectorBG2',1,1,this.w-2,this.h-2)+
	css(this.name+'SelectorImageL',0,0,this.imageLw,this.h)+
	css(this.name+'SelectorImageM',this.imageLw,0,this.imageMw,this.h)+
	css(this.name+'SelectorImageR',this.w-this.imageRw,0,this.imageRw,this.h)+
	css(this.name+'SelectorText',this.textX,this.textY,this.w,this.h)+
	css(this.name+'Selector',0,0,this.w,this.h)+
	'.'+this.name+'TextStyle {font-family:"'+this.fontname+'"; font-size:'+this.fontsize+'pt; color:'+this.color.text+'; background-color:transparent; margin-left:5px;}\n'
	this.div = '<div id="'+this.name+'">\n'+
	'<div id="'+this.name+'List">\n'+
	this.list.div+
	'</div>\n'+
	'<div id="'+this.name+'SelectorBG1">\n'+
	'<div id="'+this.name+'SelectorBG2"></div>\n'+
	'</div>\n'+
	'<div id="'+this.name+'SelectorImageL">'+this.imageL+'</div>\n'+
	'<div id="'+this.name+'SelectorImageM">'+this.imageM+'</div>\n'+
	'<div id="'+this.name+'SelectorImageR">'+this.imageR+'</div>\n'+
	'<div id="'+this.name+'SelectorText"><div class="'+this.name+'TextStyle">'+this.list.items[this.list.preSelect].text+'</div></div>\n'+
	'<div id="'+this.name+'Selector"></div>\n'+
	'</div>'
}
function SelectListActivate() {
	this.list.activate()
	this.lyr = new DynLayer(this.name)
	this.lyr.clipInit()
	this.textlyr = new DynLayer(this.name+'SelectorText')
	this.selectorlyr = new DynLayer(this.name+'Selector')
	if (is.ns) this.selectorlyr.event.captureEvents(Event.MOUSEDOWN)
	this.selectorlyr.event.onmousedown = new Function(this.obj+'.toggle(); return false;')
	this.listlyr = new DynLayer(this.name+'List')
	this.listlyr.slideInit()
	this.listlyr.clipInit()
	this.listlyr.clipTo(0,this.listW,this.list.h+1,0)
	this.listlyr.moveTo(null,-(this.w,this.list.h+this.h+1))
	this.list.onSelect = new Function(this.obj+'.select(); return false;')
}
function SelectListToggle() {
	if (this.listlyr.slideActive) return
	if (!this.opened) this.open()
	else this.close()
}
function SelectListOpen() {
	this.listlyr.css.height = this.list.h+1
	this.lyr.clipTo(0,this.w,this.list.h+this.h+1,0)
	this.listlyr.slideTo(null,this.h,10,15,this.obj+'.opened=true;')
}
function SelectListClose() {
	this.listlyr.slideTo(null,-(this.w,this.list.h+this.h+1),10,15,this.obj+'.lyr.clipTo(0,'+this.obj+'.w,'+this.obj+'.h,0); '+this.obj+'.opened=false;')
	this.onSelect()
}
function SelectListSelect(i) {
	this.textlyr.write('<div class="'+this.name+'TextStyle">'+this.list.items[i||this.list.selectedIndex].text+'</div>')
	this.close()
}
function SelectListRedirect() {
	location.href = this.list.value
}
SelectList.count = 0
