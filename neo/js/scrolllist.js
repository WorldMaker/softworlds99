// ScrollList Object
// widget that mimics and HTML Select List (with a SIZE set) utilizing the List Object
// 19990410

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function ScrollList(x,y,width,height) {
	this.name = "ScrollList"+(ScrollList.count++)
	this.x = x
	this.y = y
	this.w = width
	this.h = height
	this.zIndex = null
	this.visibility = 'inherit'
	
	this.list = new List(0,0,this.w)
	this.scroll = new Scroll(0,0,this.w,this.h)
	this.scroll.drawBorder = true
	
	this.obj = this.name + "ScrollListObject"
	eval(this.obj + "=this")
	this.build = ScrollListBuild
	this.activate = ScrollListActivate
}
function ScrollListBuild(write) {
	this.scroll.build(false)
	this.list.build()

	this.css = css(this.name,this.x,this.y,null,null,null,this.visibility,this.zIndex)+
	this.scroll.css+
	this.list.css

	this.div = '<div id="'+this.name+'">\n'+
	this.scroll.divStart+
	this.list.div+
	this.scroll.divEnd+
	'</div>'
}
function ScrollListActivate() {
	this.lyr = new DynLayer(this.name)
	this.list.activate()
	this.scroll.activate(null,this.list.h)
}
ScrollList.count = 0
