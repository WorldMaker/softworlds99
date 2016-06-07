// PassArgs Functions
// functions to handle passing arguments between pages via query strings
// 19991023

// Copyright (C) 1999 Noah Slater (noah@mailcity.com)
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

// create a passedArgs[] array from the data sent in a query string
function getArgs(){
	passedArgs=new Array()
	search = self.location.href
	search = search.split('?')
	if(search.length>0){
		argList = search[1]
		argList = argList.split(',')
		for(var i=0; i<argList.length; i++){
		newArg = argList[i]
		newArg = argList[i].split('=')
		passedArgs[i] = unescape(newArg[1])
		}
	}
}

// create a query string to send to a another page
function passArgs(url,target){
	argsArray = new String()
	for (var i=2; i<passArgs.arguments.length; i++){
		if(i!=(passArgs.arguments.length-1)){
			eval('argsArray+="arg'+(i-1)+'='+escape(passArgs.arguments[i])+',"')
		} else{
			eval('argsArray+="arg'+(i-1)+'='+escape(passArgs.arguments[i])+'"')
		}
	}
	passTarget=target.split(':')
	switch(passTarget[0]){
		case 'top':
		eval('top.location.href="'+url+'?'+argsArray+'"')
			break;
		case 'frame':
		eval('top.'+passTarget[1]+'.location.href="'+url+'?'+argsArray+'"')
			break;
		case 'blank':
		eval('window.open("'+url+'?'+argsArray+'")')
			break;
	}
}

// assemble a string with the url arguments
function returnArgs(url){
	argsArray = new String()
	for (var i=1; i<returnArgs.arguments.length; i++){
		if(i!=(returnArgs.arguments.length-1)){
			eval('argsArray+="arg'+(i-1)+'='+escape(returnArgs.arguments[i])+',"')
		} else{
			eval('argsArray+="arg'+(i-1)+'='+escape(returnArgs.arguments[i])+'"')
		}
	}
		eval('returnArgs="'+url+'?'+argsArray+'"')
		return returnArgs
}
