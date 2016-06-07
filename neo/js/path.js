// Path Object
// Dynlayer addon object to move a layer in a specified coordinate path
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function Path(dynlayer,name,arrayX,arrayY) {
	this.dynlayer = dynlayer.obj
	this.name = name
	this.arrayX = arrayX
	this.arrayY = arrayY
	this.loop = false
	this.speed = 30
	this.fn = null
	this.play = PathPlay
	this.slide = PathSlide
	this.pause = PathPause
	this.stop = PathStop
}
function PathPlay(loop,speed,fn) {
	if (this.active) return
	this.loop = (loop)? loop : false
	this.speed = (speed)? speed : 30
	this.fn = (fn)? fn : null
	if (!this.paused) this.i = 0
	this.active = true
	this.paused = false
	eval(this.dynlayer+"."+this.name+".slide()")
}
function PathSlide() {
	if (this.active && this.i < this.arrayX.length) {
		eval(this.dynlayer+".moveTo("+this.arrayX[this.i]+","+this.arrayY[this.i]+")")
		this.i += 1
		setTimeout(this.dynlayer+"."+this.name+".slide()",this.speed)
	}
	else if (!this.paused) {
		this.i = 0
		if (this.loop && this.active) setTimeout(this.dynlayer+"."+this.name+".slide()",this.speed)
		else {
			this.active = false
			eval(this.fn)
		}
	}
}
function PathPause() {
	if (this.active) {
		this.active = false
		this.paused = true
	}
}
function PathStop() {
	this.active = false
	this.paused = false
}
