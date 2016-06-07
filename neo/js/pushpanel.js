// PushPanel Object
// a ScrollWindow with up/down button panel controls
// 19990922

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function PushPanel(x,y,width,height,frame) {
	this.name="PushPanel"+(PushPanel.count++)
	this.x=x
	this.y=y
	this.w=width
	this.h=height
	this.frame=frame
	this.isVertical = true
	this.obj=this.name+"Object"
	this.window=new ScrollWindow(0,0,this.w,this.h,this.frame)
	this.window.onScroll=new Function(this.obj+'.setPanels()')
	eval(this.obj+"=this")
}
{PushPanel.count=0
var p=PushPanel.prototype
p.setImages=PushPanelSetImages
p.build=PushPanelBuild
p.activate=PushPanelActivate
p.move0=PushPanelMove0
p.move1=PushPanelMove1
p.stop=PushPanelStop
p.setPanels=PushPanelSetPanels
}
function PushPanelSetImages(h,dir) {
	this.imageH = h
	str0 = (this.isVertical)? "up":"lt"
	str1 = (this.isVertical)? "dn":"rt"
	this.i0_0 = new Image()
	this.i0_0.src = (dir||'')+'pushpanel-'+str0+'0.gif'
	this.i0_1 = new Image()
	this.i0_1.src = (dir||'')+'pushpanel-'+str0+'1.gif'
	this.i1_0 = new Image()
	this.i1_0.src = (dir||'')+'pushpanel-'+str1+'0.gif'
	this.i1_1 = new Image()
	this.i1_1.src = (dir||'')+'pushpanel-'+str1+'1.gif'
}
function PushPanelBuild() {
	this.window.build()
	this.css=css(this.name,this.x,this.y)+
	css(this.name+'i0',0,0,null,null,null,'hidden')
	
	if (this.isVertical) this.css += css(this.name+'i1',0,this.h-this.imageH,null,null,null,'hidden')
	else this.css += css(this.name+'i1',this.w-this.imageH,0,null,null,null,'hidden')
	
	this.css += this.window.css
	this.divStart='<div id="'+this.name+'">'+this.window.divStart
	this.divEnd=this.window.divEnd+
	'<div id="'+this.name+'i0"><a href="javascript://" onMouseDown="'+this.obj+'.move0(); return false;" onMouseUp="'+this.obj+'.stop()" onMouseOut="'+this.obj+'.stop()"><img name="'+this.name+'Image0" src="'+this.i0_0.src+'" border=0></a></div>'+
	'<div id="'+this.name+'i1"><a href="javascript://" onMouseDown="'+this.obj+'.move1(); return false;" onMouseup="'+this.obj+'.stop()" onMouseOut="'+this.obj+'.stop()"><img name="'+this.name+'Image1" src="'+this.i1_0.src+'" border=0></a></div>'+
	'</div>'
	this.div=this.divStart+this.divEnd
}
function PushPanelActivate() {
	this.lyr=new DynLayer(this.name)
	this.i0lyr=new DynLayer(this.name+'i0')
	this.i1lyr=new DynLayer(this.name+'i1')
	this.window.activate()
	this.setPanels()
}
function PushPanelMove0() {
	this.i0lyr.doc.images[this.name+'Image0'].src = this.i0_1.src
	this.i1lyr.show()
	if (this.isVertical) this.window.up()
	else this.window.left()
}
function PushPanelMove1() {
	this.i1lyr.doc.images[this.name+'Image1'].src = this.i1_1.src
	this.i0lyr.show()
	if (this.isVertical) this.window.down()
	else this.window.right()
}
function PushPanelStop() {
	this.i0lyr.doc.images[this.name+'Image0'].src = this.i0_0.src
	this.i1lyr.doc.images[this.name+'Image1'].src = this.i1_0.src
	this.window.stop()
}
function PushPanelSetPanels() {
	if ((this.isVertical&&!this.window.enableVScroll) || (!this.isVertical&&!this.window.enableHScroll)) {
		this.i0lyr.hide()
		this.i1lyr.hide()
	}
	else if ((this.isVertical&&this.window.getYfactor()==0) || (!this.isVertical&&this.window.getXfactor()==0)) {
		this.stop()
		this.i0lyr.hide()
		this.i1lyr.show()
	}
	else if ((this.isVertical&&this.window.getYfactor()==1) || (!this.isVertical&&this.window.getXfactor()==1)) {
		this.stop()
		this.i0lyr.show()
		this.i1lyr.hide()
	}
	else {
		this.i0lyr.show()
		this.i1lyr.show()
	}
}
