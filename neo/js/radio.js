// Radio Object
// allows you to use images to replace HTML Radio Buttons
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function Radio(layer,imgNames,length,defaultValue) {
	this.layer = layer
	this.imgNames = imgNames
	this.length = length
	this.change = RadioChange
	this.value = (defaultValue)? defaultValue : "undefined"
}
function RadioChange(index,value) {
	this.value = value
	for (var i=0; i<this.length; i++) changeImage(this.layer,this.imgNames+i,'radio0')
	changeImage(this.layer,this.imgNames+index,'radio1')
}
