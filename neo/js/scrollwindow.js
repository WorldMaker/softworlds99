// ScrollWindow Object
// a widget that draws layers that are to be scrolled, being built for a new Scroll Object
// 19991011

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function ScrollWindow(x,y,width,height,frame,name) {
	this.name=(name!=null)? name : "ScrollWindow"+(ScrollWindow.count++)
	this.x=x
	this.y=y
	this.w=width
	this.h=height
	this.frame=(is.ie && frame!=null)? window.top.frames[frame] : parent
	this.obj=this.name+"Object"
	eval(this.obj+"=this")
	this.setMargins=ScrollWindowSetMargins
	this.setMargins(0,0,0,0)
}
{var p=ScrollWindow.prototype
p.usebuffer=true
p.inlineBlocks=0
p.inc=10
p.speed=20
p.border=1
p.borderColor='black'
p.bgColor=null
p.build=ScrollWindowBuild
p.activate=ScrollWindowActivate
p.up=ScrollWindowUp
p.down=ScrollWindowDown
p.left=ScrollWindowLeft
p.right=ScrollWindowRight
p.stop=ScrollWindowStop
p.getXfactor=ScrollWindowGetXfactor
p.getYfactor=ScrollWindowGetYfactor
p.load=ScrollWindowLoad
p.reload=ScrollWindowReload
p.back=ScrollWindowBack
p.forward=ScrollWindowForward
p.writeContent=ScrollWindowWriteContent
p.showBlock=ScrollWindowShowBlock
p.jumpTo=ScrollWindowJumpTo
p.history=new Array()
p.historyLoc=-1
p.historyLen=-1
p.onScroll=new Function()
p.onLoad=new Function()
}
function ScrollWindowSetMargins(l,r,t,b) {
	this.marginL=l
	this.marginR=r
	this.marginT=t
	this.marginB=b
}
function ScrollWindowBuild() {
	var w=this.w
	var h=this.h
	var b=this.border
	var bc=this.borderColor
	var ml=this.marginL
	var mr=this.marginR
	var mt=this.marginT
	var mb=this.marginB
	this.css=css(this.name,this.x,this.y,w,h,null,null,null,'overflow:hidden')+
	css(this.name+'Screen',b,b,w-2*b,h-2*b,this.bgColor)
	if (this.border>0) this.css+=css(this.name+'BorderT',0,0,w,b,bc)+css(this.name+'BorderB',0,h-b,w,b,bc)+css(this.name+'BorderL',0,0,b,h,bc)+css(this.name+'BorderR',w-b,0,b,h,bc)
	if (this.inlineBlocks) {
	this.css+=css(this.name+'Content',0,0,w-2*b,null)
	this.css+=css(this.name+'Block0',ml,mt,w-2*b-ml-mr,null,this.bgColor)
	for (var i=1;i<this.inlineBlocks;i++) {
		this.css+=css(this.name+'Block'+i,ml,mt,w-2*b-ml-mr,null,this.bgColor,'hidden')
	}
	}
	else this.css+=css(this.name+'Content',ml,mt,w-2*b-ml-mr)
	this.divStart=(is.ie && this.usebuffer)? '<iframe name="'+this.name+'Frame" width=0 height=0 style="position:absolute; left:0; top:0; visibility:none"></iframe>\n':''
	this.divStart+='<div id="'+this.name+'">'+
	'<div id="'+this.name+'Screen">'
	if (is.ie && !this.usebuffer) this.divStart+='<iframe name="'+this.name+'Frame" width='+(this.w-2*b-ml-mr)+' height='+(this.h-2*b)+' marginwidth=0 marginheight=0 scrolling="no" frameborder="no"></iframe>\n'
	else this.divStart+='<div id="'+this.name+'Content">'
	this.divEnd='</div>'
	if (is.ns || this.usebuffer) this.divEnd+='</div>'
	if (this.border>0) this.divEnd+='<div id="'+this.name+'BorderT"></div><div id="'+this.name+'BorderB"></div><div id="'+this.name+'BorderL"></div><div id="'+this.name+'BorderR"></div>\n'
	this.divEnd+='</div>'
	this.div=this.divStart+this.divEnd
}
function ScrollWindowActivate(w,h) {
	if (!this.activated) {
	this.lyr=new DynLayer(this.name)
	this.screenlyr=new DynLayer(this.name+'Screen')
	this.blocklyr=new Array()
	this.blockActive=0
	}
	if (this.inlineBlocks) {
		DynLayerInit()
		for (var i=0;i<this.inlineBlocks;i++) this.blocklyr[i]=new DynLayer(this.name+'Block'+i)
	}
	if (is.ie && this.usebuffer && this.frame.frames[this.name+'Frame'].document.body.innerHTML) document.all[this.name+'Content'].innerHTML=this.frame.frames[this.name+'Frame'].document.body.innerHTML
	if (this.inlineBlocks) {
	this.contentlyr=this.blocklyr[this.blockActive]
	}
	else if (is.ie && !this.usebuffer) this.contentlyr=new DynLayer('content',null,this.frame.frames[this.name+'Frame'])
	else this.contentlyr=new DynLayer(this.name+'Content')
	var c=this.contentlyr
	c.onSlide=new Function(this.obj+'.onScroll()')
	this.contentHeight=h||((is.ns)?c.doc.height:c.elm.scrollHeight)
	this.contentWidth=w||((is.ns)?c.doc.width:c.elm.scrollWidth)
	if (is.ns) {
		c.css.clip.bottom=Math.max(this.contentHeight,this.h)
		c.css.clip.right=Math.max(this.contentWidth,this.w)
	}
	this.offsetHeight=this.contentHeight+this.marginT+this.marginB-this.screenlyr.h
	this.offsetWidth=this.contentWidth+this.marginL+this.marginR-this.screenlyr.w
	this.enableVScroll=(this.offsetHeight>0)
	this.enableHScroll=(this.offsetWidth>0)
	this.onScroll()
	this.onLoad()
	this.activated=true
}
function ScrollWindowLoad(url) {
	if (url != this.url) {
	this.historyLoc+=1
	this.historyLen=this.historyLoc
	this.history[this.historyLen]=url
	}
	this.reload(0)
}
function ScrollWindowBack() {
	if (this.historyLoc>0) this.reload(-1)
}
function ScrollWindowForward() {
	if (this.historyLoc<this.historyLen) this.reload(1)
}
function ScrollWindowReload(i) {
	this.historyLoc+=i
	this.url=this.history[this.historyLoc]
	this.refresh=true
	this.contentlyr=new DynLayer(this.name+'Content')
	this.contentlyr.moveTo(this.marginL,this.marginT)
	if (is.ns) {
		if (this.inlineBlocks) this.contentlyr.elm.load(this.url,this.w-2*this.border)
		else this.contentlyr.elm.load(this.url,this.w-2*this.border-this.marginL-this.marginR)
	}
	else this.frame.frames[this.name+'Frame'].document.location=this.url
}
function ScrollWindowUp() {
	if (this.enableVScroll) this.contentlyr.slideTo(null,this.marginT,this.inc,this.speed)
}
function ScrollWindowDown() {
	if (this.enableVScroll) this.contentlyr.slideTo(null,-this.offsetHeight+this.marginT,this.inc,this.speed)
}
function ScrollWindowLeft() {
	if (this.enableHScroll) this.contentlyr.slideTo(this.marginL,null,this.inc,this.speed)
}
function ScrollWindowRight() {
	if (this.enableHScroll) this.contentlyr.slideTo(-this.offsetWidth+this.marginL,null,this.inc,this.speed)
}
function ScrollWindowStop() {
	if (this.activated) this.contentlyr.slideActive=false
}
function ScrollWindowGetXfactor() {
	if (this.offsetWidth==0) return 0
	return Math.min((this.offsetWidth-this.contentlyr.x+this.marginL)/this.offsetWidth-1,1)
}
function ScrollWindowGetYfactor() {
	if (this.offsetHeight==0) return 0
	return Math.min((this.offsetHeight-this.contentlyr.y+this.marginT)/this.offsetHeight-1,1)
}
function ScrollWindowWriteContent(doc) {
	if (is.ie) doc.write(css('content',0,0,this.w-2*this.window.border))
}
function ScrollWindowShowBlock(i,fn) {
	if (this.blockActive!=i) {
	this.blockActive=i
	this.contentlyr.moveTo(this.marginL,this.marginT)
	this.contentlyr.hide()
	this.blocklyr[i].css.visibility='inherit'
	this.activate()
	eval(fn)
	}
}
function ScrollWindowJumpTo(x,y) {
	this.contentlyr.moveTo((x!=null)?Math.max(-x,-this.offsetWidth):null,(y!=null)?Math.max(-y,-this.offsetHeight):null)
	this.onScroll()
}
ScrollWindow.count=0
