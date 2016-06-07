// DynLayer Write Method
// rewrites the contents of the layer
// 19990604

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function DynLayerWrite(html) {
	if (is.ns) {
		this.doc.open()
		this.doc.write(html)
		this.doc.close()
	}
	else if (is.ie) {
		this.event.innerHTML = html
	}
}
DynLayer.prototype.write = DynLayerWrite
