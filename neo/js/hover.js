// Hover Object
// A Dynlayer addon object to move a layer in a hovering motion (vertical/horizontal)
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function Hover(dynlayer,name) {
	this.dynlayer = dynlayer
	this.name = name
	this.play = HoverPlay
	this.slide = HoverSlide
	this.pause = HoverPause
	this.stop = HoverStop
}
function HoverPlay(amplitude,angleinc,angle,cycles,orientation,speed,fn) {
	if (this.active) return
	if (!this.paused) {
		this.amplitude = amplitude
		this.angleinc = angleinc
		this.angle = angle
		this.cycles = cycles
		this.orientation = orientation
		this.speed = speed
		this.active = false
		this.centerX = eval(this.dynlayer+'.x') - this.amplitude*Math.sin(this.angle*Math.PI/180)
		this.centerY = eval(this.dynlayer+'.y') + this.amplitude*Math.sin(this.angle*Math.PI/180)
	}
	this.active = true
	this.paused = false
	eval(this.dynlayer+'.'+this.name+'.slide()')
}
function HoverSlide() {
	if (this.active && (this.cycles==null || Math.abs(this.angleinc)<Math.abs(this.cycles*360-this.angle))) {
		this.angle += this.angleinc
		var x = (this.orientation=="h")? this.centerX + this.amplitude*Math.sin(this.angle*Math.PI/180) : null
		var y = (this.orientation=="v")? this.centerY - this.amplitude*Math.sin(this.angle*Math.PI/180) : null
		eval(this.dynlayer+'.moveTo('+x+','+y+')')
		setTimeout(this.dynlayer+'.'+this.name+'.slide()',this.speed)
	}
	else if (!this.paused) {
		this.active = false
		eval(this.fn)
	}
}
function HoverPause() {
	if (this.active) {
		this.active = false
		this.paused = true
	}
}
function HoverStop() {
	this.active = false
	this.paused = false
}
