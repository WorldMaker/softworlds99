// Ellipse Object
// DynLayer addon object to move a layer in an elliptical path
// 19990606

// Copyright (C) 1999 Rusty Davis (tjglcl@bellsouth.net)
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function Ellipse(dynlayer,name,a,b,angleinc,angle,endangle,speed,fn) {
	this.dynlayer = dynlayer
	this.name = name
	this.play = EllipsePlay
	this.slide = EllipseSlide
	this.pause = EllipsePause
	this.stop = EllipseStop
	this.a = a
	this.b = b
	this.angleinc = angleinc
	this.angle = angle
	this.endangle = endangle
	this.speed = speed
	this.fn = fn
}
function EllipsePlay() {
	if (this.active) return
	if (!this.paused) {
		this.centerX = eval(this.dynlayer+'.x') - this.a*Math.cos(this.angle*Math.PI/180)
		this.centerY = eval(this.dynlayer+'.y') + this.b*Math.sin(this.angle*Math.PI/180)
		if (this.endangle!=null) {
		this.angleinc = Math.abs(this.angleinc)
		if (this.endangle<this.angle) this.angleinc *= -1
		}
	}
	this.active = true
	this.paused = false
	eval(this.dynlayer+'.'+this.name+'.slide()')
}
function EllipseSlide() {
	if (this.active && (this.endangle==null || Math.abs(this.angleinc)<Math.abs(this.endangle-this.angle))) {
		this.angle += this.angleinc
		var x = this.centerX + this.a*Math.cos(this.angle*Math.PI/180)
		var y = this.centerY - this.b*Math.sin(this.angle*Math.PI/180)
		eval(this.dynlayer+'.moveTo('+x+','+y+')')
		setTimeout(this.dynlayer+'.'+this.name+'.slide()',this.speed)
	}
	else {
		if (this.endangle!=null) {
			var x = Math.round(this.centerX + this.b*Math.cos(this.endangle*Math.PI/180))
			var y = Math.round(this.centerY - this.a*Math.sin(this.endangle*Math.PI/180))
			eval(this.dynlayer+'.moveTo('+x+','+y+')')
		}
		if (!this.paused) {
			this.active = false
			eval(this.fn)
		}
	}
}
function EllipsePause() {
	if (this.active) {
		this.active = false
		this.paused = true
	}
}
function EllipseStop() {
	this.active = false
	this.paused = false
}
