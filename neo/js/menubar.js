// MenuBar Object
// a widget that creates selectable tabs for swapping layers
// 19991011

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function MenuBar(x,y,height) {
	this.name = "MenuBar"+(MenuBar.count++)
	this.x = x
	this.y = y
	this.h = height
	this.obj = this.name+"Object"
	eval(this.obj+"=this")

	this.overOpen = false
		
	this.items = new Array()
	
	this.color = new Object()
	this.color.textNormal = '#000000'
	this.color.textSelected = '#FFFFFF'
	this.color.bgNormal = '#E6E6E6'
	this.color.bgSelected = '#0000A0'
	this.color.bgRollover = '#D1D1D1'
	this.color.border = '#000000'
	this.fontname = 'Helvetica'
	this.fontsize = 11
	
	this.addItem = MenuBarAddItem
	this.build = MenuBarBuild
	this.activate = MenuBarActivate
	this.itemOver = MenuBarItemOver
	this.itemOut = MenuBarItemOut
	this.itemDown = MenuBarItemDown
	this.select = MenuBarSelect
	this.deselect = MenuBarDeselect
}
function MenuBarAddItem(text,menulist,nospace) {
	var i = this.items.length
	this.items[i] = new Object()
	text = (nospace!=false)? '&nbsp;'+text+'&nbsp;' : text
	this.items[i].text = '<span class="'+this.name+'TextNormal">'+text+'</span>'
	this.items[i].textSelected = '<span class="'+this.name+'TextSelected">'+text+'</span>'
	this.items[i].menulist = menulist
}
function MenuBarBuild() {
	var n = this.name
	this.css = css(n,this.x,this.y,0,this.h,this.color.border)+
	css(n+'i',this.x,this.y,0,this.h)+
	'.'+this.name+'TextNormal {font-family:"'+this.fontname+'"; font-size:'+this.fontsize+'pt; color:'+this.color.textNormal+'; background-color:transparent;}\n'+
	'.'+this.name+'TextSelected {font-family:"'+this.fontname+'"; font-size:'+this.fontsize+'pt; color:'+this.color.textSelected+'; background-color:transparent;}\n'
	
	for (i in this.items) {
		this.css += css(n+'Item'+i,0,0,0,0,this.color.bgNormal)
		this.css += css(n+'Item'+i+'text',0,0)
		this.css += css(n+'Item'+i+'e',0,0,0,0)
	}
	
	this.div = '<div id="'+n+'"><div id="'+n+'i">\n'
	for (i in this.items) {
		this.div += '<div id="'+n+'Item'+i+'">\n'+
		'<div id="'+n+'Item'+i+'text">'+this.items[i].text+'</div>\n'+
		'<div id="'+n+'Item'+i+'e"></div>\n'+
		'</div>\n'
	}
	this.div += '</div></div>'
}
function MenuBarActivate() {
	this.lyr = new DynLayer(this.name)
	this.ilyr = new DynLayer(this.name+'i')
	this.contentW = 0
	for (i in this.items) {
		this.items[i].lyr = new DynLayer(this.name+'Item'+i)
		this.items[i].textlyr = new DynLayer(this.name+'Item'+i+'text')
		this.items[i].elyr = new DynLayer(this.name+'Item'+i+'e')
		
		if (is.ns) this.items[i].elyr.elm.captureEvents(Event.MOUSEOVER | Event.MOUSEOUT | Event.MOUSEDOWN)
		this.items[i].elyr.elm.onmouseover = new Function(this.obj+'.itemOver('+i+')')
		this.items[i].elyr.elm.onmouseout = new Function(this.obj+'.itemOut('+i+')')
		this.items[i].elyr.elm.onmousedown = new Function(this.obj+'.itemDown('+i+')')
		
		var w = this.items[i].textlyr.getContentWidth()
		this.items[i].lyr.clipTo(0,w,this.h,0)
		this.items[i].textlyr.clipTo(0,w,this.h,0)
		this.items[i].elyr.clipTo(0,w,this.h,0)
		
		this.items[i].lyr.moveTo(this.contentW,null)
		this.items[i].menulist.lyr.moveTo(this.lyr.x+this.contentW+((i!=0)?1:0),this.lyr.y+19)
		this.contentW += w
	}
	this.lyr.clipTo(0,this.contentW,this.h,0)
	this.ilyr.clipTo(0,this.contentW-2,this.h-2,0)
	this.ilyr.moveTo(1,1)
}
function MenuBarItemOver(i) {
	if (this.selectedIndex!=i) {
		if (this.overOpen) this.itemDown(i)
		else this.items[i].lyr.setbg(this.color.bgRollover)
	}
}
function MenuBarItemOut(i) {
	if (this.selectedIndex!=i) this.items[i].lyr.setbg(this.color.bgNormal)
}
function MenuBarItemDown(i) {
	if (this.selectedIndex!=i) {
		this.select(i)
	}
	else {
		this.deselect()
	}
}
function MenuBarSelect(i) {
	this.deselect()
	this.items[i].lyr.setbg(this.color.bgSelected)
	this.items[i].textlyr.write(this.items[i].textSelected)
	this.items[i].menulist.show()
	this.selectedIndex = i
}
function MenuBarDeselect() {
	if (this.selectedIndex!=null) {
	this.items[this.selectedIndex].lyr.setbg(this.color.bgNormal)
	this.items[this.selectedIndex].textlyr.write(this.items[this.selectedIndex].text)
	this.items[this.selectedIndex].menulist.hide()
	this.selectedIndex = null
	}
}

MenuBar.count = 0

