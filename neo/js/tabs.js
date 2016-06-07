// Tabs Object
// a widget that creates selectable tabs for swapping layers
// 19991011

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function Tabs(x,y,width,height) {
	this.name = "Tabs"+(Tabs.count++)
	this.x = x
	this.y = y
	this.w = width
	this.h = height
	this.obj = this.name+"Object"
	eval(this.obj+"=this")
	
	this.contentW = 0
	this.items = new Array()
	this.seplyr = new Array()
	this.selectedIndex = null
	this.setImages = TabsSetImages
	this.addItems = TabsAddItems
	this.build = TabsBuild
	this.activate = TabsActivate
	this.scroll = TabsScroll
	this.stop = TabsStop
	this.select = TabsSelect
	this.onSelect = new Function('')
}
function TabsSetImages(sepW,startW,endW,buttonW,imgDir) {
	this.sepW = sepW
	this.startW = startW
	this.endW = endW
	this.imgDir = imgDir||''
	this.buttonW = buttonW
	this.left0 = new Image()
	this.left0.src = this.imgDir+'tabs-l0.gif'
	this.left1 = new Image()
	this.left1.src = this.imgDir+'tabs-l1.gif'
	this.right0 = new Image()
	this.right0.src = this.imgDir+'tabs-r0.gif'
	this.right1 = new Image()
	this.right1.src = this.imgDir+'tabs-r1.gif'
	this.sepl = new Image()
	this.sepl.src = this.imgDir+'tabs-sepl.gif'
	this.sepm = new Image()
	this.sepm.src = this.imgDir+'tabs-sepm.gif'
	this.sepr = new Image()
	this.sepr.src = this.imgDir+'tabs-sepr.gif'
	this.start0 = new Image()
	this.start0.src = this.imgDir+'tabs-start0.gif'
	this.start1 = new Image()
	this.start1.src = this.imgDir+'tabs-start1.gif'
	this.end0 = new Image()
	this.end0.src = this.imgDir+'tabs-end0.gif'
	this.end1 = new Image()
	this.end1.src = this.imgDir+'tabs-end1.gif'
	this.bg0 = 'layer-background-image:URL('+this.imgDir+'tabs-bg0.gif); background-image:URL('+this.imgDir+'tabs-bg0.gif); repeat:yes;'
	this.bg1 = 'layer-background-image:URL('+this.imgDir+'tabs-bg1.gif); background-image:URL('+this.imgDir+'tabs-bg1.gif); repeat:yes;'
	this.ext = 'layer-background-image:URL('+this.imgDir+'tabs-ext.gif); background-image:URL('+this.imgDir+'tabs-text.gif); repeat:yes;'
}
function TabsAddItems() {
	for (var i=0;i<arguments.length;i++) {
		var i = this.items.length
		this.items[i] = new Object()
		this.items[i].text = '&nbsp;'+arguments[i]+'&nbsp;'
	}
}
function TabsBuild() {
	var n = this.name
	this.css = css(n,this.x,this.y,this.w,this.h)+
	css(n+'Scroll',0,0,null,null)+
	css(n+'Left',this.w-2*this.buttonW,0,this.buttonW,this.h,null,'hidden')+
	css(n+'Right',this.w-this.buttonW,0,this.buttonW,this.h,null,'hidden')+
	css(n+'Start',0,0,this.startW,this.h)+
	css(n+'End',0,0,this.endW,this.h,'hidden')+
	css(n+'Extend',0,0,0,0,'hidden',null,null,this.ext)
	
	for (i in this.items) {
		this.css += css(n+'Item'+i,0,1,0,0)
		this.css += css(n+'Item'+i+'bg0',0,0,0,0,null,null,null,this.bg0)
		this.css += css(n+'Item'+i+'bg1',0,0,0,0,null,'hidden',null,this.bg1)
		this.css += css(n+'Item'+i+'text',0,0,0,0)
		if (i!=this.items.length-1) this.css += css(n+'Sep'+i,0,0,this.sepW,this.h,'#ffffff')
	}
	
	this.div = '<div id="'+n+'"><div id="'+n+'Scroll">\n'
	for (i in this.items) {
		this.div += '<div id="'+n+'Item'+i+'">\n'+
		'<div id="'+n+'Item'+i+'bg0"></div>\n'+
		'<div id="'+n+'Item'+i+'bg1"></div>\n'+
		'<div id="'+n+'Item'+i+'text"><a href="javascript:'+this.obj+'.select('+i+')" class="TabsStyle" onMouseOver="status=\''+this.items[i].text+'\'" onMouseOut="status=\'\'">'+this.items[i].text+'</a></div></div>\n'
		if (i!=this.items.length-1) this.div += '<div id="'+n+'Sep'+i+'"><img name="'+this.name+'Sep'+i+'" src="'+this.sepm.src+'"></div>\n'
	}
	this.div += '<div id="'+n+'Start"><img name="'+this.name+'StartImg" src="'+this.start0.src+'"></div>\n'+
	'<div id="'+n+'End"><img name="'+this.name+'EndImg" src="'+this.end0.src+'"></div>\n'+
	'</div>'+
	'<div id="'+n+'Left"><a href="javascript://" onMouseDown="'+this.obj+'.scroll(\'left\')" onMouseUp="'+this.obj+'.stop(\'left\')" onMouseOut="'+this.obj+'.stop(\'left\')"><img name="'+n+'leftimg" src="'+this.left0.src+'" border=0></a></div>\n'+
	'<div id="'+n+'Right"><a href="javascript://" onMouseDown="'+this.obj+'.scroll(\'right\')" onMouseUp="'+this.obj+'.stop(\'right\')" onMouseOut="'+this.obj+'.stop(\'right\')"><img name="'+n+'rightimg" src="'+this.right0.src+'" border=0></a></div>\n'+
	'<div id="'+n+'Extend"></div>\n'+
	'</div>'
}
function TabsActivate(noexec) {
	this.lyr = new DynLayer(this.name)
	this.contentW = this.startW
	for (i in this.items) {
		this.items[i].textlyr = new DynLayer(this.name+'Item'+i+'text')
		var w = this.items[i].textlyr.getContentWidth()
		this.items[i].textlyr.clipTo(0,w,this.h,0)
		this.items[i].bg0lyr = new DynLayer(this.name+'Item'+i+'bg0')
		this.items[i].bg0lyr.clipTo(0,w,this.h,0)
		this.items[i].bg1lyr = new DynLayer(this.name+'Item'+i+'bg1')
		this.items[i].bg1lyr.clipTo(0,w,this.h,0)
		this.items[i].lyr = new DynLayer(this.name+'Item'+i)
		this.items[i].lyr.clipTo(0,w,this.h,0)
		this.items[i].lyr.moveTo(this.contentW,null)
		this.contentW += w
		if (i<this.items.length-1) {
			this.seplyr[i] = new DynLayer(this.name+'Sep'+i)
			this.seplyr[i].moveTo(this.contentW,0)
			this.contentW += this.sepW
		}
	}
	this.leftlyr = new DynLayer(this.name+'Left')
	this.rightlyr = new DynLayer(this.name+'Right')
	this.startlyr = new DynLayer(this.name+'Start')
	this.endlyr = new DynLayer(this.name+'End')
	this.extlyr = new DynLayer(this.name+'Extend')
	
	this.endlyr.moveTo(this.contentW,0)
	this.contentW += this.endW
	
	this.scrolllyr = new DynLayer(this.name+'Scroll')
	this.scrolllyr.clipTo(0,this.contentW,this.h,0)
	this.miniscroll = new MiniScroll(this.lyr,this.scrolllyr)
	this.miniscroll.contentWidth = this.contentW
	this.miniscroll.activate()
	
	if (this.miniscroll.enableHScroll) {
		this.miniscroll.offsetWidth += 2*this.buttonW
		this.leftlyr.show()
		this.rightlyr.show()
	}
	else {
		this.endlyr.show()
		this.extlyr.moveTo(this.contentW,null)
		this.extlyr.clipTo(0,this.w-this.contentW,this.h,0)
		this.extlyr.show()
	}
	if (this.selectedIndex!=null) this.select(this.selectedIndex,noexec)
}
function TabsSelect(i,noexec) {
	if (this.selectedIndex!=null) {
	this.items[this.selectedIndex].lyr.moveTo(null,1)
	this.items[this.selectedIndex].bg1lyr.hide()
	this.items[this.selectedIndex].bg0lyr.show()
	if (this.selectedIndex<this.items.length-1 && i!=this.selectedIndex+1) this.seplyr[this.selectedIndex].doc.images[this.name+"Sep"+this.selectedIndex].src = this.sepm.src
	else this.endlyr.doc.images[this.name+"EndImg"].src = this.end0.src
	if (this.selectedIndex!=0 && i!=this.selectedIndex-1) this.seplyr[this.selectedIndex-1].doc.images[this.name+"Sep"+(this.selectedIndex-1)].src = this.sepm.src
	else this.startlyr.doc.images[this.name+"StartImg"].src = this.start0.src
	}
	this.selectedIndex = i
	this.items[i].lyr.moveTo(null,0)
	this.items[i].bg1lyr.show()
	this.items[i].bg0lyr.hide()
	if (i<this.items.length-1) this.seplyr[i].doc.images[this.name+"Sep"+i].src = this.sepr.src
	else this.endlyr.doc.images[this.name+"EndImg"].src = this.end1.src
	if (i!=0) this.seplyr[i-1].doc.images[this.name+"Sep"+(i-1)].src = this.sepl.src
	else this.startlyr.doc.images[this.name+"StartImg"].src = this.start1.src
	if (noexec!=false) this.onSelect()
}
function TabsScroll(which) {
	eval('this.miniscroll.'+which+'()')
	eval('this.'+which+'lyr.doc.images["'+this.name+which+'img"].src = this.'+which+'1.src')
}
function TabsStop(which) {
	this.miniscroll.stop()
	eval('this.'+which+'lyr.doc.images["'+this.name+which+'img"].src = this.'+which+'0.src')
}
Tabs.count = 0

