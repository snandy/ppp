function showTipInfo(text, tipBox) {
	if ($('tipBoxDiv')) {
		var tipBox = $('tipBoxDiv');
	}
	var body = document.body;
	if (!tipBox) {
		var tipBox = document.createElement("div");
		body.appendChild(tipBox);
	}
	tipBox.innerHTML = text;
	tipBox.id = "tipBoxDiv";
	tipBox.style.color = "#333";
	tipBox.style.border = "2px solid #cecece";
	tipBox.style.background = "#ffffe1";
	tipBox.style.padding = "10px";
	tipBox.style.display = "block";
	tipBox.style.zIndex = "1";
	tipBox.style.position = "absolute";
	var x = (body.offsetWidth - tipBox.offsetWidth)/2;
	var y = Math.ceil((document.documentElement.clientHeight - tipBox.offsetHeight)/2) + document.documentElement.scrollTop;
	tipBox.style.left = x + "px";
	tipBox.style.top = y + "px";
}
function hideTipInfo(tipBox, tipBoxShadow) {
	if (tipBox && tipBoxShadow) {
		tipBox.style.display = 'none';
	}
	else if($('tipBoxDiv')) {
		$('tipBoxDiv').style.display = 'none';
	}
}

function getFullUrl(url) {
	return (url.indexOf('http://') == 0 || url.indexOf('https://') == 0)? 
		url : (url.indexOf('/') == 0)? 
			location.protocol + '//' + location.host + url : (url.indexOf('www') == 0)?
				'http://'+ url : location.href.substr(0, location.href.lastIndexOf('/')+1) + url;
}
// whether a url is a local file
function isLocalFile(url) {
	var pattern = /^http:\/\/|ftp:\/\/|(https:\/\/)/;
	if (!pattern.test(url)) {
		return true;
	}
	if (url.replace(pattern, '').substr(0, url.replace(pattern, '').indexOf('/')) == location.host) {
		return true;
	}
	return false;
}
// get the ture length of a string
function getTureLength(str) {
	if (str == null) {return null;}
	var PatSWord=/^[\x00-\xff]+$/;	//single-byte 
    var PatDWord=/[^\x00-\xff]+/g;	//double-byte 
	var ln = 0;
	for (var i=0; i<str.length; i++) {
		var char = str.charAt(i);
		if (PatSWord.test(char)) {
			ln += 1;
		}else {
			ln += 2;
		}
	}
	return ln;
}
function getUrlParam(name) {
	var params = unescape(location.search);
	if (!params) {return;}
	params = params.substring(1);
	var tmp, reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)","gi");
	tmp = reg.exec(params);
	if (tmp) {
		return (tmp[2]);
	}
	return null;
};

function _$(el) {
	if (typeof(el) == "string") return document.getElementById(el);
	else return el;
}
function loginPath() {
	return 'http://blog.sohu.com/login/logon.do?bru=' + encodeURIComponent(location.href);
}