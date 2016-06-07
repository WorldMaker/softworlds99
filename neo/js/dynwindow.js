// DynWindow Object
// a widget-object that creates a draggable window with a Scroll2 to mimic an OS window
// 19991007

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function DynWindow(x,y,width,height) {
	this.name = "DynWindow"+(DynWindow.count++)
	this.x = x
	this.y = y
	this.w = width
	this.h = height
	this.title = ''
	this.visibility = 'inherit'
	this.zIndex = null
	this.obj = this.name+"Object"
	eval(this.obj + "=this")
	
	this.title = ''
	this.border = 6
	this.titleH = 20
	this.corner = 16
	this.iconW = 20
	this.separator = 1
	this.color = new Object()
	this.color.title = '#cdceff'
	this.color.separator = '#62659c'
	this.color.content = 'white'
	
	this.addScroll = DynWindowAddScroll
	this.setImages = DynWindowSetImages
	this.build = DynWindowBuild
	this.activate = DynWindowActivate
	this.setTitle = DynWindowSetTitle
	this.roll = DynWindowRoll
	this.onMinimize = new Function()
	this.onMaximize = new Function()
	this.onClose = new Function()
}
function DynWindowAddScroll(scrollbarW,useH) {
	this.hasScroll = true
	this.scroll = new Scroll(0,0,this.w-2*this.border-scrollbarW,this.h-2*this.border-this.titleH-1-(useH?scrollbarW:0))
	if (useH) this.scroll.useH = true
}
function DynWindowSetImages(dir) {
	this.imgDir = dir||""
	this.min0 = new Image()
	this.min0.src = this.imgDir+"min0.gif"
	this.min1 = new Image()
	this.min1.src = this.imgDir+"min1.gif"
	this.max0 = new Image()
	this.max0.src = this.imgDir+"max0.gif"
	this.max1 = new Image()
	this.max1.src = this.imgDir+"max1.gif"
	this.close0 = new Image()
	this.close0.src = this.imgDir+"close0.gif"
	this.close1 = new Image()
	this.close1.src = this.imgDir+"close1.gif"
	this.icon = this.imgDir+"icon.gif"
	this.borderH = 'layer-background-image:URL('+this.imgDir+'border-h.gif); background-image:URL('+this.imgDir+'border-h.gif); repeat:yes;'
	this.borderV = 'layer-background-image:URL('+this.imgDir+'border-v.gif); background-image:URL('+this.imgDir+'border-v.gif); repeat:yes;'
	this.titleBG = 'layer-background-image:URL('+this.imgDir+'title-bg.gif); background-image:URL('+this.imgDir+'title-bg.gif); repeat:yes;'
}
function DynWindowBuild() {
	if (this.hasScroll) this.scroll.build()
	this.titlebarW = this.w-2*this.border
	var n = this.name
	var b = this.border
	var c = this.corner
	this.css = css(n,this.x,this.y,this.w,this.h,null,this.visibility,this.zIndex)+
	css(n+'TitleSep',b,this.border+this.titleH,this.titlebarW,this.separator,this.color.separator)+
	css(n+'CornerTL',0,0,c,c)+
	css(n+'CornerTR',this.w-c,0,c,c)+
	css(n+'CornerBL',0,this.h-c,c,c)+
	css(n+'CornerBR',this.w-c,this.h-c,c,c)+
	css(n+'BorderT',c,0,this.w-2*c,b,null,null,null,this.borderH)+
	css(n+'BorderB',c,this.h-b,this.w-2*c,b,null,null,null,this.borderH)+
	css(n+'BorderL',0,c,b,this.h-2*c,null,null,null,this.borderV)+
	css(n+'BorderR',this.w-b,c,b,this.h-2*c,null,null,null,this.borderV)+
	css(n+'Titlebar',b,b,this.titlebarW,this.titleH,this.color.title)+
		css(n+'Icon',0,0)+
		css(n+'Title',this.iconW,0)+
		css(n+'TitleBG',0,0,0,this.titleH,null,null,null,this.titleBG)+
		css(n+'Min',this.titlebarW-3*this.iconW,0)+
		css(n+'Max',this.titlebarW-2*this.iconW,0)+
		css(n+'Close',this.titlebarW-this.iconW,0)+
	css(n+'Content',b,b+this.titleH+this.separator,this.w-2*b,this.h-2*b-this.titleH-1,this.color.content)
	if (this.hasScroll) this.css += this.scroll.css
	
	this.divStart = 
	'<div id="'+n+'">\n'+
	'<div id="'+n+'CornerTL"><img src="'+this.imgDir+'corner-tl.gif"></div>\n'+
	'<div id="'+n+'CornerTR"><img src="'+this.imgDir+'corner-tr.gif"></div>\n'+
	'<div id="'+n+'CornerBL"><img src="'+this.imgDir+'corner-bl.gif"></div>\n'+
	'<div id="'+n+'CornerBR"><img src="'+this.imgDir+'corner-br.gif"></div>\n'+
	'<div id="'+n+'BorderT"></div>\n'+
	'<div id="'+n+'BorderB"></div>\n'+
	'<div id="'+n+'BorderL"></div>\n'+
	'<div id="'+n+'BorderR"></div>\n'+
	'<div id="'+n+'Titlebar">\n'+
		'<div id="'+n+'Title"></div>\n'+
		'<div id="'+n+'TitleBG"></div>\n'+
		'<div id="'+n+'Icon"><img src="'+this.icon+'"></div>\n'+
		'<div id="'+n+'Min"><a href="javascript://" onMouseOver="'+this.obj+'.roll(\'min\',1)" onMouseOut="'+this.obj+'.roll(\'min\',0)" onClick="'+this.obj+'.onMinimize()"><img name="'+n+'minImg" src="'+this.min0.src+'" border=0></a></div>\n'+
		'<div id="'+n+'Max"><a href="javascript://" onMouseOver="'+this.obj+'.roll(\'max\',1)" onMouseOut="'+this.obj+'.roll(\'max\',0)" onClick="'+this.obj+'.onMaximize()"><img name="'+n+'maxImg" src="'+this.max0.src+'" border=0></a></div>\n'+
		'<div id="'+n+'Close"><a href="javascript://" onMouseOver="'+this.obj+'.roll(\'close\',1)" onMouseOut="'+this.obj+'.roll(\'close\',0)" onClick="'+this.obj+'.onClose()"><img name="'+n+'closeImg" src="'+this.close0.src+'" border=0></a></div>\n'+
	'</div>\n'+
	'<div id="'+n+'TitleSep"></div>\n'+
	'<div id="'+n+'Content">'
	if (this.hasScroll) this.divStart += this.scroll.divStart
	
	this.divEnd = ''
	if (this.hasScroll) this.divEnd += this.scroll.divEnd
	this.divEnd += '</div></div></div>\n'
	this.div = this.divStart+'</div></div>\n'
}
function DynWindowActivate() {
	this.lyr = new DynLayer(this.name)
	this.titlelyr = new DynLayer(this.name+'Title')
	this.titlebglyr = new DynLayer(this.name+'TitleBG')
	this.contentlyr = new DynLayer(this.name+'Content')
	this.setTitle(this.title)
	
	this.minlyr = new DynLayer(this.name+'Min')
	this.maxlyr = new DynLayer(this.name+'Max')
	this.closelyr = new DynLayer(this.name+'Close')
	
	/*if (is.ns) this.minlyr.event.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP)
	this.minlyr.elm.onmousedown = new Function(this.obj+'.minDown(); return false;')
	this.minlyr.elm.onmouseup = new Function(this.obj+'.minUp(); return false;')
	
	if (is.ns) this.closelyr.event.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP)
	this.closelyr.elm.onmousedown = new Function(this.obj+'.closeDown(); return false;')
	this.closelyr.elm.onmouseup = new Function(this.obj+'.closeUp(); return false;')*/
	
	eval('drag.add('+this.obj+'.lyr)')
	eval('drag.setGrab('+this.obj+'.lyr,0,'+(this.w-this.border-3*this.iconW)+',this.border+this.titleH,0)')
}
function DynWindowSetTitle(title) {
	this.title = title
	this.titlelyr.write('<span class="DynWindowTitle">'+this.title+'</span>')
	var titlew = this.titlelyr.getContentWidth()
	this.titlebglyr.moveTo(titlew+this.iconW+5,0)
	this.titlebglyr.clipTo(0,this.titlebarW-this.iconW*4-titlew-7,this.titleH,0)
}
function DynWindowRoll(which,state) {
	if (state==1) {
		if (which=="min") status = "Minimize"
		else if (which=="max") status = "Maximize"
		else if (which=="close") status = "Close"
	}
	else status = ""
	eval('this.'+which+'lyr.doc.images["'+this.name+which+'Img"].src = this.'+which+state+'.src')
}
DynWindow.count = 0
