// Checkbox Object
// allows you to use images to replace HTML CheckBoxes
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function CheckBox(layer,imgName,trueValue,falseValue,defaultToTrue) {
	this.layer = layer
	this.imgName = imgName
	this.trueValue = trueValue
	this.falseValue = falseValue
	this.state = (defaultToTrue) ? 1 : 0
	this.value = (this.state) ? this.trueValue : this.falseValue
	this.change = CheckBoxChange
}
function CheckBoxChange() {
	this.state = (this.state) ? 0 : 1
	this.value = (this.state) ? this.trueValue : this.falseValue
	changeImage(this.layer,this.imgName,'checkbox'+this.state)
}
