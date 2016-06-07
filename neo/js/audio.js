// Audio Object
// provides common controls for playing audio files
// 19990606

// Copyright (C) 1999 Ultrafluid (ultrafluid@xoommail.com) and Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

var ns = (navigator.appName == 'Netscape') ? true : false;
var ie = (navigator.appName == 'Microsoft Internet Explorer') ? true : false;

function Audio() {
	this.play = AudioPlay
	this.stop = AudioStop
	this.pause = AudioPause
	this.setVol = AudioSetVol
	this.startTime = AudioStartTime
	this.endTime = AudioEndTime
	this.activate = AudioActivate
	this.addTrack = AudioAddTrack
	this.selectTrack = AudioSelectTrack
	this.writeTracks = AudioWriteTracks
	this.loop = false
	this.tracks = new Array();
	this.ns = (navigator.appName=="Netscape")
	this.ie = (navigator.appName=="Microsoft Internet Explorer")
}
function AudioActivate() {
	for (var i in this.tracks) {
		var obj = document[this.tracks[i].name]
		// obj.isSoundCardEnabled()
		if (obj && (this.ns||this.ie)) this.tracks[i].obj = obj
//		alert(i+" "+this.tracks[i].name+" "+this.tracks[i].obj)
	}
}
function AudioAddTrack(name,src,mimeType) {
	var i = this.tracks.length
	this.tracks[i] = new Object()
	this.tracks[i].name = name
	this.tracks[i].src = src
	this.tracks[i].mime = AudioGetMimeType(src.substring(src.indexOf(".")+1))
	if (this.ns) this.tracks[i].html = '<embed name="'+name+'" src="'+src+'" hidden="true" autostart="false" mastersound>'
	else if (this.ie) this.tracks[i].html = 
	'<object style="visibility: hidden" id="' + name + '" width=0 height=0 classid="CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95" CODEBASE="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701" TYPE="application/x-oleobject">'+
	'<param name="AutoStart" value="0">'+
//	'<param name="AutoRewind" value="1">'+
	'<param name="Filename" value="' + src + '">'+
	'<param name="PlayCount" value="1">'+
	'</object>'
}
function AudioGetMimeType(ext) {
	if (ext=='au' || ext=='AU') return "audio/basic"
	else if (ext=='wav' || ext=='WAV') return "audio/x-wav"
	else if (ext=='mid' || ext=='midi' || ext=='MID') return "audio/x-midi"
	else return ""
}
function AudioSelectTrack(name) {
	for (var i in this.tracks) {
		if (this.tracks[i].name == name && this.tracks[i].obj) {
			this.selectedTrack = this.tracks[i]
			if (this.ie) {
				//alert(this.selectedTrack.obj.Duration)
			}
			break
		}
	}
}
function AudioPlay(name) {
	if (name) this.selectTrack(name)
	if (this.ns) this.selectedTrack.obj.play()
	else if (this.ie) {
		if (this.loop) this.selectedTrack.obj.playCount = 0
		this.selectedTrack.obj.Play()
	}
}
/*MediaPlayer.Play(); 
Pause MediaPlayer.Pause(); 
Stop MediaPlayer.Stop(); 
Previous Track MediaPlayer.Previous(); 
Fast Reverse MediaPlayer.FastReverse(); 
Fast Forward MediaPlayer.FastForward(); 
Next Track MediaPlayer.Next(); */

function AudioStop() {
	if (this.ns) this.selectedTrack.obj.stop()
	else {
		this.selectedTrack.obj.AutoRewind = 1
		this.selectedTrack.obj.next()
	}
}
function AudioPause()	{
	if (this.ns) this.selectedTrack.obj.pause()
	else {
		this.selectedTrack.obj.AutoRewind = 0
		this.selectedTrack.obj.stop()
	}
}
function AudioSetVol(vol) {
	if (this.ns) this.selectedTrack.setvol(vol * 10);
	else if (this.ie) this.selectedTrack.volume = 3000 / -vol
}
function AudioStartTime(start) {
	if (this.ns) this.selectedTrack.start_time(start);
	else if (this.ie) this.selectedTrack.selectionStart = start
}
function AudioEndTime(end) {
	if (this.ns) this.selectedTrack.end_time(end);
	else if (this.ie) this.selectedTrack.selectionEnd = end
}
function AudioWriteTracks() {
	if (this.ns && !navigator.javaEnabled()) return
	for (var i in this.tracks) {
		if (this.ie || (this.ns && navigator.mimeTypes[this.tracks[i].mime])) {
			document.write(this.tracks[i].html)
		}
	}
}