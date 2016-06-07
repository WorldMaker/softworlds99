// Parabola Object
// Dynlayer addon object to move a layer in a parabolic curve
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function Parabola(dynlayer,name) {
	this.dynlayer = dynlayer
	this.name = name
	this.play = ParabolaPlay
	this.slide = ParabolaSlide
	this.stop = ParabolaStop
}
function ParabolaPlay(type,distx,disty,xinc,speed,fn) {
	if (!this.active) {
		this.type = type
		this.distx = Math.abs(distx)
		this.disty = Math.abs(disty)
		this.dirx = (distx>0)? 1:-1
		this.diry = (disty>0)? 1:-1
		this.xinc = xinc
		this.speed = speed
		this.fn = fn
		this.startX = eval(this.dynlayer+'.x')
		this.startY = eval(this.dynlayer+'.y')
		this.active = false
		this.i = 0
		this.factor = this.disty/Math.pow(this.distx/this.type,2)
		this.active = true
		eval(this.dynlayer+'.'+this.name+'.slide()')
	}
}
function ParabolaSlide() {
	if (this.active && Math.abs(this.i)<this.distx) {
		this.i += this.dirx*this.xinc
		var x = this.startX + this.i
		if (this.type==1) var y = this.startY + this.diry*this.factor*Math.pow(Math.abs(this.i),2)
		if (this.type==2) var y = this.startY + this.diry*this.factor*Math.pow(this.distx/2-Math.abs(this.i),2) + this.diry*this.disty
		eval(this.dynlayer+'.moveTo('+x+','+y+')')
		setTimeout(this.dynlayer+'.'+this.name+'.slide()',this.speed)
	}
	else {
		this.active = false
		eval(this.fn)
	}
}
function ParabolaStop() {
	this.active = false
}
