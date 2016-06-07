// ProgressBar Object
// provides a progress bar which you could use to indicate the loading progress of a large page
// 19991020

// Darin Kadrioski <dkadrios@lason.com>
// Copyright (c) 1999 Nebiru Software
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function ProgressBar(x,y,width,height,barImage) {
	this.name = "ProgressBar"+(ProgressBar.count++)
	this.x = x
	this.y = y
	this.w = width
	this.h = height
	this.barImage = barImage
	this.padding = 3
	this.bordercolor = 'black'
	this.bgcolor = 'silver'
	this.build = ProgressBarBuild
	this.activate = ProgressBarActivate
	this.setPosition = ProgressBarSetPosition
}
function ProgressBarBuild() {
	this.css = css(this.name,this.x,this.y,this.w,this.h,this.bgcolor)+
	css(this.name+'Top',0,0,this.w,2,this.bordercolor)+
	css(this.name+'Bottom',0,this.h-1,this.w,2,this.bordercolor)+
	css(this.name+'Left',0,0,2,this.h,this.bordercolor)+
	css(this.name+'Right',this.w-1,0,2,this.h,this.bordercolor)+
	css(this.name+'Image',this.padding,this.padding,0,this.h-2*this.padding,null,null,null,'layer-background-image:url('+this.barImage+'); background-image:url('+this.barImage+'); repeat:yes;')
	this.div = '<DIV ID="'+this.name+'">\n '+ 
	'<DIV ID="'+this.name+'Image"></DIV>\n'+
	'<DIV ID="'+this.name+'Top"></DIV>\n'+
	'<DIV ID="'+this.name+'Bottom"></DIV>\n'+
	'<DIV ID="'+this.name+'Left"></DIV>\n'+
	'<DIV ID="'+this.name+'Right"></DIV>\n'+
	'</DIV>\n';
}
function ProgressBarActivate() {
	this.lyr = new DynLayer(this.name)
	this.imagelyr = new DynLayer(this.name+'Image')
	this.imagelyr.clipInit(0,0,this.h-2*this.padding,0)
}
function ProgressBarSetPosition(percent) {
	var newWidth = (this.w-2*this.padding)*(percent/100);
	this.imagelyr.clipTo(0,newWidth,this.h-2*this.padding,0);
}
ProgressBar.count = 0
