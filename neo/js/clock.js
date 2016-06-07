// DHTML Clock Object
// a widget that writes the date and current time (with updating seconds) to 2 individual layers
// 19990330

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function Clock(dateX,dateY,timeX,timeY) {
	this.name = "Clock"+(Clock.count++)
	this.obj = this.name + "Object"
	eval(this.obj + "=this")
	this.dateX = dateX
	this.dateY = dateY
	this.timeX = timeX
	this.timeY = timeY
	this.timeStyle = 'color: black;'
	this.dateStyle = 'color: black;'
	this.showSeconds = true
	this.twelveHour = true
	this.showDate = true
	this.showTime = true
	this.shortDate = false
	this.activate = ClockActivate
	this.getDate = ClockGetDate
	this.getTime = ClockGetTime
	this.build = ClockBuild
	this.tick = ClockTick
}
function ClockBuild() {
	this.getTime()
	this.css = css(this.name+'Date',this.dateX,this.dateY)+
	css(this.name+'Time',this.timeX,this.timeY)+
	'.'+this.name+'DateStyle {'+this.dateStyle+'}\n'+
	'.'+this.name+'TimeStyle {'+this.timeStyle+'}\n'
	this.dateDiv = '<div id="'+this.name+'Date"><div class="'+this.name+'DateStyle">'+this.getDate()+'</div></div>'
	this.timeDiv = '<div id="'+this.name+'Time"><div class="'+this.name+'TimeStyle">'+this.time+'</div></div>'
	this.div = ''
	if (this.showDate) this.div += this.dateDiv
	if (this.showTime) this.div += this.timeDiv
}
function ClockGetDate() {
	if (this.shortDate) {
		var monthList = new Array('Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec')
		var dayList = new Array('Sun','Mon','Tues','Wed','Th','Fri','Sat')
	}
	else {
		var monthList = new Array('January','February','March','April','May','June','July','August','September','October','November','December')
		var dayList = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday')
	}
	now = new Date()
	return dayList[now.getDay()]+", "+monthList[now.getMonth()]+" "+now.getDate()+", "+(1900+now.getYear())+"."
}
function ClockGetTime() {
	var now = new Date()
	this.newmin = now.getMinutes()
	if (this.newmin<10) this.newmin = "0"+this.newmin
	var hour = now.getHours()
	var ampm = "am"
	if (this.twelveHour) {
		if (hour>12) {
			hour-=12
			ampm = "pm"
		}
		else if (hour==0) {
			hour = 12
		}
	}
	if (hour<10) hour = "&nbsp;"+hour
	this.time = hour+":"+this.newmin
	if (this.showSeconds) {
		var sec = now.getSeconds()
		if (sec<10) sec = "0"+sec
		this.time += ":"+sec
	}
	if (this.twelveHour) this.time += ampm
}
function ClockActivate() {
	if (this.showDate) {
		this.datelyr = new DynLayer(this.name+"Date")
		this.datelyr.write = DynLayerWrite
	}
	if (this.showTime) {
		this.timelyr = new DynLayer(this.name+"Time")
		this.timelyr.write = DynLayerWrite
	}
	this.tick()
}
function ClockTick() {
	this.getTime()
	if (this.oldmin!=this.newmin || this.showSeconds) {
		if (this.showTime) this.timelyr.write('<div class="'+this.name+'timeStyle">'+this.time+'</div>')
		this.oldmin = this.newmin
	}
	setTimeout(this.obj+".tick()",1000)
}
Clock.count = 0
