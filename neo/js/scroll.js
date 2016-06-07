// Scroll Object
// a widget that draws a JavaScript scrollbar to scroll a layer
// 19990410

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function Scroll(x,y,width,height) {
	this.name = "Scroll"+(Scroll.count++)
	this.x = x
	this.y = y
	this.w = width
	this.h = height
	this.url = null
	this.active = false
	this.bar = new Function()
	this.arrow = new Function()
	this.arrow.active = false
	this.box = new Function()
	this.border = new Function()
	this.setH = false
	this.history = new Array()
	this.historyLoc = -1
	this.historyLen = -1
	this.visibility = null
	this.zIndex = null
	this.contentRef = null
	this.slideInc = 7
	this.slideSpeed = 20
	this.clipImages = true
	this.usebuffer = true
	this.obj = this.name+"ScrollObject"
	eval(this.obj+"=this")
	this.setMargins = ScrollSetMargins
	this.setMargins(10,10,10,10)
	this.setDimensions = ScrollSetDimensions
	this.setDimensions(0,0,15,this.h,15,15,30,1)
	this.setColors = ScrollSetColors
	this.setColors(null,"#000000","#C5C5C5","#555555","#898989")
	this.preload = ScrollPreload
	this.setImages = ScrollSetImages
	this.setImages()
	this.setHeight = ScrollSetHeight
	this.build = ScrollBuild
	this.load = ScrollLoad
	this.writeContent = ScrollWriteContent
	this.back = ScrollBack
	this.forward = ScrollForward
	this.reload = ScrollReload
	this.activate = ScrollActivate
	this.jumpTo = ScrollJumpTo
	this.barDown = ScrollBarDown
	this.barMove = ScrollBarMove
	this.barUp = ScrollBarUp
	this.arrowDown = ScrollArrowDown
	this.arrowUp = ScrollArrowUp
	this.arrowSlide = ScrollArrowSlide
}
function ScrollSetDimensions(barX,barY,barW,barH,arrowuH,arrowdH,boxH,border) {
	this.arrow.uy = barY
	this.arrow.dy = barY+barH-arrowdH
	this.arrow.uh = arrowuH
	this.arrow.dh = arrowdH
	this.bar.x = barX+this.w
	this.bar.y = barY+this.arrow.uh
	this.bar.w = barW
	this.bar.h = barH-this.arrow.uh-this.arrow.dh
	this.box.h = boxH
	this.border.v = border
}
function ScrollSetColors(bg,border,bar,arrow,box) {
	this.bgcolor = bg
	this.border.color = border
	this.bar.color = bar
	this.arrow.color = arrow
	this.box.color = box
}
function ScrollSetMargins(l,r,t,b) {
	this.marginL = l
	this.marginR = r
	this.marginT = t
	this.marginB = b
}
function ScrollPreload(imgObj,imgSrc) {
	if (imgSrc) {
		eval(imgObj+' = new Image()')
		eval(imgObj+'.src = "'+imgSrc+'"')
		eval(imgObj+'s = true')
	}
	else eval(imgObj+'s = false')
}
function ScrollSetImages(box0,box1,up0,up1,dn0,dn1,bar,directory) {
	if (arguments.length<8) directory = ''
	for (var i=0;i<arguments.length-1;i++) arguments[i] = arguments[i]? directory+arguments[i] : ''
	this.preload(this.obj+'.box.image0',box0)
	this.preload(this.obj+'.box.image1',box1)
	this.preload(this.obj+'.arrow.upimage0',up0)
	this.preload(this.obj+'.arrow.upimage1',up1)
	this.preload(this.obj+'.arrow.dnimage0',dn0)
	this.preload(this.obj+'.arrow.dnimage1',dn1)
	this.preload(this.obj+'.bar.image',bar)
	this.bar.imageW = this.bar.w
	this.bar.imageH = this.bar.h
	this.bar.tile = ''
}
function ScrollBuild() {
	var nm = this.name
	var b = this.border.v
	var bw = this.bar.w
	var ml = this.marginL
	var mr = this.marginR
	var mt = this.marginT
	var bc = this.border.color
	
	this.css = css(nm,this.x,this.y,null,null,null,this.visibility,this.zIndex)+
	css(nm+'BG',0,0,this.w,this.h,this.bgcolor)+
	css(nm+'BorderT',0,0,this.w,b,bc)+
	css(nm+'BorderB',0,this.h-b,this.w,b,bc)+
	css(nm+'BorderL',0,0,b,this.h,bc)+
	css(nm+'BorderR',this.w-b,0,b,this.h,bc)+
	css(nm+'ArrowU',this.bar.x,this.arrow.uy,bw,((this.clipImages)?this.arrow.uh:null),this.arrow.color)+
	css(nm+'ArrowD',this.bar.x,this.arrow.dy,bw,((this.clipImages)?this.arrow.dh:null),this.arrow.color)+
	css(nm+'ArrowUC',this.bar.x,this.arrow.uy,bw,this.arrow.uh)+
	css(nm+'ArrowDC',this.bar.x,this.arrow.dy,bw,this.arrow.dh)+
	css(nm+'Bar',this.bar.x,this.bar.y,bw,((this.clipImages)?this.bar.h:null),this.bar.color,null,null,this.bar.tile)+
	css(nm+'BarC',this.bar.x,this.bar.y,bw,this.bar.h)+
	css(nm+'Box',0,0,bw,((this.clipImages)?this.box.h:null),this.box.color,'hidden')+
	css(nm+'TextC',b+ml,b,this.w-2*b-ml-mr,this.h-2*b)+
	css(nm+'TextT',0,mt,this.w-2*b-ml-mr)
	
	this.divStart = ''
	if (is.ie && this.usebuffer) this.divStart += '<IFRAME NAME="'+nm+'Frame" WIDTH=0 HEIGHT=0 STYLE="display:none"></IFRAME>\n'
	this.divStart += '<DIV ID="'+nm+'">\n'+
	'<DIV ID="'+nm+'BG"></DIV>\n'+
	'<DIV ID="'+nm+'BorderT"></DIV>\n'+
	'<DIV ID="'+nm+'BorderB"></DIV>\n'+
	'<DIV ID="'+nm+'BorderL"></DIV>\n'+
	'<DIV ID="'+nm+'BorderR"></DIV>\n'+
	'<DIV ID="'+nm+'TextC">\n'
	if (is.ie && !this.usebuffer) this.divStart += '<IFRAME NAME="'+nm+'Frame" WIDTH='+(this.w-2*b-ml-mr)+' HEIGHT='+(this.h-2*b)+' MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING="NO" FRAMEBORDER="NO"></IFRAME>\n'
	else this.divStart += '<DIV ID="'+nm+'TextT">\n'
	this.divEnd = '</DIV>\n'
	if (is.ns || this.usebuffer) this.divEnd += '</DIV>\n'
	this.divEnd += '<DIV ID="'+nm+'Bar">\n'
	if (this.bar.images) this.divEnd += '<IMG SRC="'+this.bar.image.src+'" WIDTH="'+this.bar.imageW+'" HEIGHT="'+this.bar.imageH+'">\n'
	this.divEnd += '<DIV ID="'+nm+'Box">'
	if (this.box.image0s) this.divEnd += '<IMG NAME="'+nm+'BoxImg" SRC="'+this.box.image0.src+'">'
	this.divEnd += '</DIV>\n</DIV>\n<DIV ID="'+nm+'ArrowU">'
	if (this.arrow.upimage0s) this.divEnd += '<IMG NAME="'+nm+'UpImg" SRC="'+this.arrow.upimage0.src+'">'
	this.divEnd += '</DIV>\n<DIV ID="'+nm+'ArrowD">'
	if (this.arrow.dnimage0s) this.divEnd += '<IMG NAME="'+nm+'DnImg" SRC="'+this.arrow.dnimage0.src+'">'
	this.divEnd += '</DIV>\n'+
	'<DIV ID="'+nm+'BarC"></DIV>\n'+
	'<DIV ID="'+nm+'ArrowUC"></DIV>\n'+
	'<DIV ID="'+nm+'ArrowDC"></DIV>\n'+
	'</DIV>\n'
	this.div = this.divStart+this.divEnd
}
function ScrollActivate(w,h) {
	if (h) {
		this.textHeight = h
		this.setH = true
	}
	if (is.ie && this.usebuffer && parent.frames[this.name+'Frame'].document.body.innerHTML) document.all[this.name+'TextT'].innerHTML = parent.frames[this.name+'Frame'].document.body.innerHTML
	this.lyr = new DynLayer(this.name)
	if (is.ie && !this.usebuffer) {
		this.textlyr = new DynLayer('content',null,this.name+'Frame')
		this.contentRef = this.name+'content'
	}
	else {
		this.textlyr = new DynLayer(this.name+'TextT')
		this.contentRef = this.name+'.document.'+this.name+'TextC.document.'+this.name+'TextT'
		if (this.lyr.nestref) this.contentRef = this.lyr.nestref+'.document.'+this.contentRef
	}
	this.boxlyr = new DynLayer(this.name+'Box',DynLayer.nestRefArray[this.name+"Box"])
	this.arrowur = new DynLayer(this.name+'ArrowU')
	this.arrowu = new DynLayer(this.name+'ArrowUC')
	this.arrowu.elm.onmousedown = new Function(this.obj+'.arrowDown(1); return false;')
	this.arrowu.elm.onmouseup = new Function(this.obj+'.arrowUp(); return false;')
	this.arrowu.elm.onmouseout = new Function(this.obj+'.arrowUp(); return false;')
	if (is.ns) this.arrowu.elm.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP)
	this.arrowdr = new DynLayer(this.name+'ArrowD')
	this.arrowd = new DynLayer(this.name+'ArrowDC')
	this.arrowd.elm.onmousedown = new Function(this.obj+'.arrowDown(-1); return false;')
	this.arrowd.elm.onmouseup = new Function(this.obj+'.arrowUp(); return false;')
	this.arrowd.elm.onmouseout = new Function(this.obj+'.arrowUp(); return false;')
	if (is.ns) this.arrowd.elm.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP)
	this.barlyr = new DynLayer(this.name+'BarC')
	this.barlyr.elm.scroll = this.obj
	this.barlyr.elm.onmousedown = ScrollBarDownStart
	this.barlyr.elm.onmousemove = ScrollBarMoveStart
	this.barlyr.elm.onmouseup = new Function(this.obj+'.barUp(); return false;')
	this.barlyr.elm.onmouseout = new Function(this.obj+'.arrowUp(); return false;')
	if (is.ns) this.barlyr.elm.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP | Event.MOUSEMOVE)
	if (!this.setH) this.textHeight = (is.ns)? this.textlyr.doc.height : this.textlyr.elm.scrollHeight
	this.setH = false
	if (is.ns) {
		this.textlyr.css.clip.bottom = Math.max(this.textHeight,this.h-2*this.border.v-this.marginT)
		this.textlyr.css.clip.right = this.w - this.border.v*2
	}
	this.ratio = (this.textHeight+this.marginT+this.marginB-this.h+2*this.border.v)/(this.bar.h-this.box.h)
	this.jumpTo('top')
	if (this.ratio>0) this.boxlyr.css.visibility = 'inherit'
	else this.boxlyr.hide()
}
function ScrollLoad(url) {
	if (url != this.url) {
		this.historyLoc += 1
		this.historyLen = this.historyLoc
		this.history[this.historyLen] = url
		this.reload()
	}
}
function ScrollBack() {
	if (this.historyLoc > 0) {
		this.historyLoc -= 1
		this.reload()
	}
}
function ScrollForward() {
	if (this.historyLoc < this.historyLen) {
		this.historyLoc += 1
		this.reload()
	}
}
function ScrollReload() {
	this.url = this.history[this.historyLoc]
	this.refresh = true
	if (is.ns) {
		this.textlyr = new DynLayer(this.name+'TextT')
		this.textlyr.elm.src = this.url
	}
	else if (is.ie) parent.frames[this.name+'Frame'].document.location = this.url
}
function ScrollJumpTo(y) {
	var by,ty
	if (y == "top") {
		by = 0
		ty = this.marginT
	}
	else if (y=="bottom" && this.ratio>0) {
		by = this.bar.h-this.box.h
		ty = -this.ratio*by+this.marginT
	}
	else if (y<this.textHeight) {
		ty = -y
		by = (ty-this.marginT)/-this.ratio
	}
	this.textlyr.moveTo(0,ty)
	this.boxlyr.moveTo(0,by)
}
function ScrollSetHeight(h) {
	this.activate(w,h)
}
function ScrollBarDownStart(e) {
	if (is.ie && event.button==2) return false
	var y = (is.ns)? e.layerY : event.offsetY
	eval(this.scroll+'.barDown('+y+')')
	return false
}
function ScrollBarDown(y) {
	if (this.ratio<=0) return
	var boxh = this.box.h
	var boxy = this.boxlyr.y
	if (y>=boxy && y<boxy+boxh) {
		if (this.box.image1s) this.boxlyr.doc.images[this.name+"BoxImg"].src = this.box.image1.src
		this.clickYnew = y-boxy
		this.clickYold = y
		this.active = true
	}			
	else {
		if (y<=boxh/2) this.boxlyr.moveTo(0,0)
		else if (y>=this.bar.h-boxh/2) this.boxlyr.moveTo(0,this.bar.h-boxh)
		else this.boxlyr.moveTo(0,y-boxh/2)
		if (this.box.image1s) this.boxlyr.doc.images[this.name+"BoxImg"].src = this.box.image1.src
		this.textlyr.moveTo(0,-this.ratio*(this.boxlyr.y)+this.marginT)
		this.clickYnew = y-this.boxlyr.y
		this.clickYold = y
		this.active = true
	}
}
function ScrollBarUp() {
	this.active = false
	if (this.box.image1s) this.boxlyr.doc.images[this.name+"BoxImg"].src = this.box.image0.src
}
function ScrollBarMoveStart(e) {
	var y = (is.ns)? e.layerY : event.offsetY
	eval(this.scroll+'.barMove('+y+')')
	return false
}
function ScrollBarMove(y) {
	if (!this.active) return false
	var diff = y-this.clickYold
	var boxy = this.boxlyr.y
	var barh = this.bar.h-this.box.h
	if (boxy+diff<0 || boxy+diff>barh) {
		if (boxy+diff<0) this.boxlyr.moveTo(0,0)
		else this.boxlyr.moveTo(0,barh)
		this.clickYold = boxy+this.clickYnew
	}
	else {
		this.boxlyr.moveTo(0,y-this.clickYnew)
		this.clickYold = y
	}
	this.textlyr.moveTo(0,-this.ratio*(this.boxlyr.y)+this.marginT)
	return false
}
function ScrollArrowDown(dir) {
	if (this.ratio>0) {
		this.arrow.active = true
		if (dir==1 && this.arrow.upimage1s) this.arrowur.doc.images[this.name+"UpImg"].src = this.arrow.upimage1.src
		if (dir==-1 && this.arrow.dnimage1s) this.arrowdr.doc.images[this.name+"DnImg"].src = this.arrow.dnimage1.src
		this.arrowSlide(dir)
	}
}
function ScrollArrowUp() {
	if (this.ratio>0) {
		this.arrow.active = false
		this.active = false
		if (this.arrow.upimage1s) this.arrowur.doc.images[this.name+"UpImg"].src = this.arrow.upimage0.src
		if (this.arrow.dnimage1s) this.arrowdr.doc.images[this.name+"DnImg"].src = this.arrow.dnimage0.src
		if (this.box.image1s) this.boxlyr.doc.images[this.name+"BoxImg"].src = this.box.image0.src
	}
}
function ScrollArrowSlide(dir) {
	if (this.arrow.active) {
		if ((dir==1 && this.textlyr.y<this.marginT-this.slideInc) || (dir==-1 && this.textlyr.y>-(this.textHeight+2*this.border.v+this.marginB-this.h-this.slideInc))) {
			this.textlyr.moveBy(0,dir*this.slideInc)
			this.boxlyr.moveTo(0,(this.textlyr.y-this.marginT)/-this.ratio)
			setTimeout(this.obj+'.arrowSlide('+dir+')',this.slideSpeed)
		}
		else {
			if (dir==1) this.textlyr.moveTo(0,this.marginT)
			else if (dir==-1) this.textlyr.moveTo(0,-(this.textHeight+2*this.border.v+this.marginB-this.h))
			this.boxlyr.moveTo(0,(this.textlyr.y-this.marginT)/-this.ratio)
		}
	}
}
function ScrollWriteContent(doc) {
	if (!this.usebuffer && is.ie) {
		var str = '<STYLE TYPE="text/css">'+
		css('content',0,this.marginT,this.w-2*this.border.v-this.marginL-this.marginR)
		str += '</STYLE>'
		doc.write(str)
	}
}
Scroll.count = 0
