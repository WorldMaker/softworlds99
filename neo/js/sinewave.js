// SineWave Object
// Dynlayer addon object to move a layer in a sine wave
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function SineWave(dynlayer,name) {
	this.dynlayer = dynlayer
	this.name = name
	this.play = SineWavePlay
	this.slide = SineWaveSlide
	this.pause = SineWavePause
	this.stop = SineWaveStop
}
function SineWavePlay(amplitude,wavelength,angleinc,angle,cycles,direction,speed,fn) {
	if (this.active) return
	if (!this.paused) {
		this.amplitude = amplitude
		this.wavelength = wavelength
		this.angleinc = angleinc
		this.angle = angle
		this.cycles = cycles
		this.direction = direction
		this.speed = speed
		this.fn = fn
		this.active = false
		this.startX = eval(this.dynlayer+'.x') - this.direction*this.angle*this.wavelength/360
		this.startY = eval(this.dynlayer+'.y') + this.amplitude/2*Math.sin(this.angle*Math.PI/180)
	}
	this.active = true
	this.paused = false
	eval(this.dynlayer+'.'+this.name+'.slide()')
}
function SineWaveSlide() {
	if (this.active && (this.cycles==null || Math.abs(this.angle)<this.cycles*360)) {
		this.angle += this.angleinc
		var x = this.startX + this.direction*this.angle*this.wavelength/360
		var y = this.startY - this.amplitude/2*Math.sin(this.angle*Math.PI/180)
		eval(this.dynlayer+'.moveTo('+x+','+y+')')
		setTimeout(this.dynlayer+'.'+this.name+'.slide()',this.speed)
	}
	else if (!this.paused) {
		this.active = false
		eval(this.fn)
	}
}
function SineWavePause() {
	if (this.active) {
		this.active = false
		this.paused = true
	}
}
function SineWaveStop() {
	this.active = false
	this.paused = false
}
