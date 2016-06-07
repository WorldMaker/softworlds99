// ButtonImage Object [mini]
// a smaller version of the ButtonImage for use in Scroll2
// 19990624

// Copyright 1999 Dan Steinman
// Distributed under the GNU General Public License
// Available at http://www.dansteinman.com/dynapi/

function ButtonImage(x,y,w,h) {
this.x = x
this.y = y
this.w = w
this.h = h
this.name = "ButtonImage"+(ButtonImage.count++)
this.obj = this.name+"Object"
eval(this.obj+"=this")
}
{var p = ButtonImage.prototype
p.setImages = ButtonImageSetImages
p.build = ButtonImageBuild
p.activate = ButtonImageActivate
p.down = ButtonImageDown
p.up = ButtonImageUp
p.change = ButtonImageChange
p.onDown = new Function()
p.onUp = new Function()}
function ButtonImageSetImages(off,on,dir) {
this.i0 = new Image()
this.i = this.i0.src = (dir||'')+off
this.i1 = new Image()
this.i1.src = (dir||'')+on
}
function ButtonImageBuild() {
with(this) {
this.css = css(name,x,y,w,h)+css(name+'C',0,0,w,h)
this.div = '<div id="'+name+'"><img name="'+name+'Img" src="'+i+'" width='+w+' height='+h+'><div id="'+name+'C"></div></div>\n'
}
}
function ButtonImageActivate() {
this.lyr = new DynLayer(this.name)
this.clyr = new DynLayer(this.name+'C')
if (is.ns) this.clyr.elm.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP)
this.clyr.elm.onmousedown = new Function(this.obj+".down(); return false;")
this.clyr.elm.onmouseup = new Function(this.obj+".up(); return false;")
}
function ButtonImageDown() {this.change(this.i1);this.onDown()}
function ButtonImageUp() {this.change(this.i0);this.onUp()}
function ButtonImageChange(img) {this.lyr.doc.images[this.name+"Img"].src = img.src}
ButtonImage.count = 0
