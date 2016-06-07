// GifAnim Object
// an object which allows JavaScript to animate gifs by swapping through them quickly
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function GifAnim(layer,imgName,imgSeries,end,speed,startFrame) {
	this.layer = layer
	this.imgName = imgName
	this.frame = new Array()
	for (var i=0; i<=end; i++) this.frame[i] = imgSeries+i
	this.end = end
	this.speed = speed
	this.active = false
	this.count = (startFrame)? startFrame : 0
	this.obj = imgName + "GifAnim"
	eval(this.obj + "=this")
	this.play = GifAnimPlay
	this.run = GifAnimRun
	this.stop = GifAnimStop
	this.goToFrame = GifAnimGoToFrame
}
function GifAnimPlay(loop,reset,fn) {
	if (!this.active) {
		this.active = true
		if (!loop) loop = false
		if (!reset) reset = false
		if (!fn) fn = null
		this.run(loop,reset,fn)
	}
}
function GifAnimRun(loop,reset,fn) {
	if (this.active && this.count <= this.end) {
		changeImage(this.layer,this.imgName,this.frame[this.count])
		this.count += 1
		setTimeout(this.obj+".run("+loop+","+reset+",\""+fn+"\")",this.speed)
	}
	else {
		if (loop && this.active) {
			this.count = 0
			this.run(loop,reset,fn)
		}
		else {
			this.active = false
			if (reset) this.goToFrame(0)
			eval(fn)
		}
	}
}
function GifAnimStop() {
	this.active = false
}
function GifAnimGoToFrame(index) {
	this.count = index
	changeImage(this.layer,this.imgName,this.frame[this.count])
}
