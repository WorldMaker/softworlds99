// DynLayer Wipe Methods
// DynLayer animated clipping (wipe effects) methods
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function DynLayerWipeInit(clipTop,clipRight,clipBottom,clipLeft) {
	if (arguments.length==4) this.clipInit(clipTop,clipRight,clipBottom,clipLeft)
	else this.clipInit()
}
function DynLayerWipeTo(endt,endr,endb,endl,num,speed,fn) {
	var distt = (endt!=null)? endt-this.clipValues('t'):0
	var distr = (endr!=null)? endr-this.clipValues('r'):0
	var distb = (endb!=null)? endb-this.clipValues('b'):0
	var distl = (endl!=null)? endl-this.clipValues('l'):0
	this.wipeStart(distt,distr,distb,distl,endt,endr,endb,endl,num,speed,fn)
}
function DynLayerWipeBy(distt,distr,distb,distl,num,speed,fn) {
	this.wipeStart(distt,distr,distb,distl,distt+this.clipValues('t'),distr+this.clipValues('r'),distb+this.clipValues('b'),distl+this.clipValues('l'),num,speed,fn)
}
function DynLayerWipeStart(distt,distr,distb,distl,endt,endr,endb,endl,num,speed,fn) {
	if (this.wipeActive) return
	if (!fn) fn = null
	this.wipeActive = true
	this.wipe(distt/num,distr/num,distb/num,distl/num,endt,endr,endb,endl,this.clipValues('t'),this.clipValues('r'),this.clipValues('b'),this.clipValues('l'),num,1,speed,fn)
}
function DynLayerWipe(dt,dr,db,dl,endt,endr,endb,endl,st,sr,sb,sl,num,i,speed,fn) {
	if (!this.wipeActive) return
	if (i++ < num) {
		this.clipTo(st+i*dt,sr+i*dr,sb+i*db,sl+i*dl)
		setTimeout(this.obj+".wipe("+dt+","+dr+","+db+","+dl+","+endt+","+endr+","+endb+","+endl+","+st+","+sr+","+sb+","+sl+","+num+","+i+","+speed+",\""+fn+"\")",speed)
	}
	else {
		this.wipeActive = false
		this.clipTo(endt,endr,endb,endl)
		eval(fn)	
	}
}
DynLayer.prototype.wipeInit = DynLayerWipeInit
DynLayer.prototype.wipeTo = DynLayerWipeTo
DynLayer.prototype.wipeBy = DynLayerWipeBy
DynLayer.prototype.wipeStart = DynLayerWipeStart
DynLayer.prototype.wipe = DynLayerWipe
