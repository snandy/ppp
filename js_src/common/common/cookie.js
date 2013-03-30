/**
 * 有关cookie的一些操作方法
 */

//set cookie
//name(String):	cookie's name
//value(String): cookie's value
//expires(Int:minute|String:never): cookie's expiring time
function setCookie(name, value, expires, path, domain) {
	var str = name + "=" + escape(value);
	if (expires) {
		if (expires == 'never') {expires = 100*365*24*60;}
		var exp = new Date(); 
		exp.setTime(exp.getTime() + expires*60*1000);
		str += "; expires="+exp.toGMTString();
	}
	if (path) {str += "; path=" + path;}
	if (domain) {str += "; domain=" + domain;}
	document.cookie = str;
}
//get cookie by cookie's name
//name(String): cookie's name
function getCookie(name){
	var tmp, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)","gi");
	if( tmp = reg.exec( unescape(document.cookie) ) )
		return(tmp[2]);
	return null;
}

var Cookie = {
	get: getCookie,
	set: setCookie,
	remove: function(name, path, domain) {
		document.cookie = name + "=" + 
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}
