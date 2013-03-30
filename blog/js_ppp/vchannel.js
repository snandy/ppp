var prePicBox;
var prePic;
var MMCPlayerBox;
var MMCPlayer;
var intervalListen;
function getMMCObj() {
	var str = '';
	str += '<object type="application/x-oleobject" height="100%" width="100%" classid="CLSID:05C1004E-2596-48E5-8E26-39362985EEB9" codebase="http://p3p.sogou.com/MMCShell.cab#version='+ window.parent._vchannel_ver +'">';
	str += '<param name="AdsURL1" value="" />';
	str += '<param name="AdsURL2" value="" />';
	str += '<param name="IDChannel" value="" />';
	str += '<param name="WorkMode" value="2" />';
	str += '<param name="uiMode" value="mini" />';
	str += '<param name="autoStart" value="0" />';
	str += '</object>';
	return str;
}
function buildPlayer() {
	MMCPlayerBox.innerHTML = getMMCObj();
	MMCPlayer = MMCPlayerBox.firstChild;
}
function doPlay() {
	if (!MMCPlayer) {
		buildPlayer();
	}
	prePicBox.style.display = 'none';
	MMCPlayerBox.style.display = '';
	
	MMCPlayer.AdsURL1 = "";
	MMCPlayer.AdsURL2 = "";
	MMCPlayer.IDChannel = window.parent._vchannel_param;
	//MMCPlayer.FileName = 'http://v.sohu.com/20060910/245259190.asx';
	MMCPlayer.play();
	
	intervalListen = setInterval(listenStop, 500);
}
function initPlayer() {
	prePicBox = document.getElementById('vchannel_prePic');
	prePic = prePicBox.firstChild;
	prePlayBtn = prePicBox.childNodes[1].firstChild;
	MMCPlayerBox = document.getElementById('vchannel_MMCPlayer');
	prePic.onclick = doPlay;
	prePlayBtn.onclick = doPlay;
}


function listenStop() {
	if( MMCPlayer.PlayState == 1 || MMCPlayer.PlayState == 10 ) {
		doStop();
		clearInterval(intervalListen);
	}
}
function doStop() {
	prePicBox.style.display = '';
	MMCPlayerBox.style.display = 'none';
	MMCPlayerBox.removeChild(MMCPlayer);
	MMCPlayer = null;
}
