var divTop,divLeft,divWidth,divHeight,docHeight,docWidth,objTimer,timecounter = 0;
var showtimeout = 2000;
function getMsg()
{
	try{
	divTop = parseInt(document.getElementById("epop").style.top,10)
	divLeft = parseInt(document.getElementById("epop").style.left,10)
	divHeight = parseInt(document.getElementById("epop").offsetHeight,10)
	divWidth = parseInt(document.getElementById("epop").offsetWidth,10)
	docWidth = document.body.clientWidth;
	docHeight = document.body.clientHeight;
	document.getElementById("epop").style.top = parseInt(document.body.scrollTop,10) + docHeight + 10;//  divHeight
	document.getElementById("epop").style.left = parseInt(document.body.scrollLeft,10) + docWidth - divWidth
	document.getElementById("epop").style.visibility="visible"
	objTimer = window.setInterval("moveDiv()",2)
	}
	catch(e){}
}

function resizeDiv()
	{
	timecounter+=1
	try{
	divHeight = parseInt(document.getElementById("epop").offsetHeight,10)
	divWidth = parseInt(document.getElementById("epop").offsetWidth,10)
	docWidth = document.body.clientWidth;
	docHeight = document.body.clientHeight;
	document.getElementById("epop").style.top = docHeight - divHeight + parseInt(document.body.scrollTop,10)
	document.getElementById("epop").style.left = docWidth - divWidth + parseInt(document.body.scrollLeft,10)
	}
	catch(e){}
}

function moveDiv()
{
	try
	{
		if(parseInt(document.getElementById("epop").style.top,10) <= (docHeight - divHeight + parseInt(document.body.scrollTop,10)))
		{
			if(objTimer) window.clearInterval(objTimer)
			objTimer = window.setInterval("resizeDiv()",3)
		}
		divTop = parseInt(document.getElementById("epop").style.top,10)
		document.getElementById("epop").style.top = divTop - 5
	}
	catch(e){}
}

function hiddenDiv()
{
//do nothing
}

function closeDiv()
{
        setCookie('bvisited', new Date().getTime());
	document.getElementById("epop").style.visibility="hidden";
	if(objTimer) window.clearInterval(objTimer)
}

//set cookie
//name(String):	cookie's name
//value(String): cookie's value
//expires(Int:minute|String:never): cookie's expiring time
function setCookie(name, value) {
	var str = name + "=" + escape(value);
	str += "; path=/";
	str += "; domain=sohu.com";
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

if(getCookie('bvisited') == null || (new Date().getTime() - getCookie('bvisited')> 10*1000*60)){
	var popup = document.getElementById("epop");
	popup.innerHTML = '<table width=326 border="0" cellspacing="0" style="BORDER-TOP:#ffffff 1px solid; BORDER-LEFT:#ffffff 1px solid" bgcolor="#cfdef4"> 	<tr> 		<td height="24" width="26" style="FONT-SIZE:12px;BACKGROUND-IMAGE:url(http://photocdn.sohu.com/20060606/Img243594341.gif);COLOR:#0f2c8c" valign="middle"></td><td style="FONT-WEIGHT:normal;FONT-SIZE:9pt;BACKGROUND-IMAGE:url(http://photocdn.sohu.com/20060606/Img243594341.gif);COLOR:#1f336b;PADDING-TOP:4px" valign="middle" width="100%"><font color=red><b>³´¹ÉÐÝÏÐ</b></font></td><td style="BACKGROUND-IMAGE:url(http://photocdn.sohu.com/20060606/Img243594341.gif);PADDING-TOP:2px" valign="middle" width="19" align="right"><img src="http://photocdn.sohu.com/20060606/Img243594319.gif" hspace="3" style="CURSOR:pointer" onClick="closeDiv()" title="¹Ø±Õ"></td></tr></table><IFRAME marginwidth=0 marginheight=0  frameborder=0 bordercolor="000000" scrolling=no  width=326 height=163 src="http://blog.sohu.com/inc/home/popup.html"></IFRAME> '

	window.onload = getMsg;
	window.onresize = resizeDiv;
	window.onerror = function(){}
}
else{
	// do nothing;	
}
