// U can change this number to check specific version of flash
var MM_contentVersion = 6;

var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ?
                     navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;

if ( plugin ) {
    var words = navigator.plugins["Shockwave Flash"].description.split(" ");
    for (var i = 0; i < words.length; ++i){
        if (isNaN(parseInt(words[i])))
            continue;
        var MM_PluginVersion = words[i]; 
    }
    var MM_FlashCanPlay = MM_PluginVersion >= MM_contentVersion;
}
else if( navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && 
        (navigator.appVersion.indexOf("Win") != -1) ) {
    //FS hide this from IE4.5 Mac by splitting the tag
    document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
    document.write('on error resume next \n');
    document.write('MM_FlashCanPlay = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & MM_contentVersion)))\n');
    document.write('</SCR' + 'IPT\> \n');
}

if( navigator.userAgent.indexOf("MSIE")<0 ) {
	MM_FlashCanPlay = false;
}
if ( MM_FlashCanPlay && flashNum ){
	document.writeln("<div id='float' style='position: absolute;display:block;z-index:1;left:0px;top:30px;'><EMBED style='WIDTH: 778px; HEIGHT:600px;' src='http://photocdn.sohu.com/ppp/blog/swf/"+flashNum+".swf' type='application/octet-stream' wmode='transparent' ></div>");
} 

function a() {
document.getElementById('float').style.display='none';
}