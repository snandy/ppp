//<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
var musicbox_Timemore;
var musicbox_ShowProgress;
var musicbox_PosNum;
var timeMore;

timeMore=false;

function musicbox_insertFlash(elm, url, w, h, param) {
 if (!document.getElementById(elm)) return;
 var str = '';
 str += '<object width="'+ w +'%" height="'+ h +'%"  id="musicbox_flash" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0">';
 str += '<param name="movie" value="'+url+'">';
 str += '<param name="quality" value="high">';
  str += '<param name="wmode" value="Transparent">';
 str += '<param name="allowscriptaccess" value="always">';
 str += '<param name="FlashVars" value="'+ param +'">';
 str += '<embed width="'+ w +'%" height="'+ h +'%" src="'+ url +'" quality="autohigh" wmode="opaque" type="application/x-shockwave-flash" plugspace="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" flashvars="'+ param +'"></embed>';
 str += '</object>';
 //alert('str='+str);
 //alert('innerHTML before:'+document.getElementById(elm).innerHTML);
 //document.getElementById(elm).innerHTML = '';
 document.getElementById(elm).innerHTML = str;
 //alert('innerHTML after:'+document.getElementById(elm).innerHTML);
}
function musicbox_insertMediaPlayer(elm, w, h) {
 if (!document.getElementById(elm)) return;
 var str = '';
 str += '<object id="musicbox_MediaPlayer1" width="'+ w +'" height="'+ h +'" classid="CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701" standby="Loading Microsoft? Windows? Media Player components..." type="application/x-oleobject" align="middle" >';
 str+='<param name="autoStart" value="true"> '
 str += '<param name="balance" value="0">';
str+='<param name="baseURL" value="">'
str+='<param name="AnimationAtStart" value="true">'
str+='<param name="DefaultFrame" value="mainFrame">'
 str += '<param name="currentPosition" value="0">';
 str += '<param name="AudioStream" value="true">';
 str+='<param name="invokeURLs" value="false"> '
  str += '<param name="mute" value="false"> ';
  str+='<param name="playCount" value="1">'
 str+='<param name="rate" value="1"> '
 str += '<embed type="application/x-mplayer2" pluginspage="http://www.microsoft.com/Windows/MediaPlayer/" align="middle" width="'+ w +'" height="'+ h +'"  autorewind="0" autostart="1" showcontrols="0" ></embed>';
  str += '</object>';
 document.getElementById(elm).innerHTML = str;
}



function musicbox_thisMovie(movieName) {
     var isIE = navigator.appName.indexOf("Microsoft") != -1;
     return (isIE) ? window[movieName] : document[movieName];
}
    
    function musicbox_playNext() {
		//alert("������һ��")
        document.getElementById('musicbox_flash').TCallFrame("_level0.musicbox",1);
    }
   
	function musicbox_MediaPlayerPlay(){
	   document.getElementById('musicbox_MediaPlayer1').play()
	}
    
    
	function musicbox_MediaPlayerPause(){
	    document.getElementById('musicbox_MediaPlayer1').pause()
	}
   
	function musicbox_MediaPlayerStop(){
		 
          document.getElementById('musicbox_MediaPlayer1').Stop()
	}

//-----------��ⲿ�ִ���-----------------------------
var period	= 10000;//�������ڼ�
var errorMsg= "";
var d= new Date();
var ConnectTime = -1;
var PlayTime= -1;
var Speed= -1;
var reportMsg= "";
var _CurrentSong;
var CheckFirst;
var isError;  
var currentlrc="";
	function musicbox_playMp3(address)
	{
	//alert(address)
	clearTimeout(musicbox_Timemore);
	clearInterval(musicbox_ShowProgress);
    timeMore=false;
	if ((navigator.userAgent.indexOf("IE") > -1) && (navigator.platform == "Win32")) {
	musicbox_MediaPlayer1.detachEvent("EndOfStream",MediaEndOfStream);
	musicbox_MediaPlayer1.detachEvent("Error",Error);
	musicbox_MediaPlayer1.detachEvent("playStateChange",playStateChange);
    musicbox_MediaPlayer1.attachEvent("EndOfStream",MediaEndOfStream);
	musicbox_MediaPlayer1.attachEvent("Error",Error);
	musicbox_MediaPlayer1.attachEvent("playStateChange",playStateChange);
	musicbox_Timemore=setTimeout("musicbox_checkTime()",30000);
	musicbox_ShowProgress=setInterval('musicbox_autoProgress()',1000);
	musicbox_getVolume(document.getElementById('musicbox_MediaPlayer1').Volume);
	musicbox_SetProgress(0);
	clearTimeout(CheckFirst);
	d   = new Date();
	document.getElementById('musicbox_MediaPlayer1').Filename = address;
	} else {
	musicbox_Timemore=setTimeout("musicbox_checkTime()",5000);
	document.getElementById('musicbox_MediaPlayer1').SetAutoStart(true);
    document.getElementById('musicbox_MediaPlayer1').SetFileName(address);
	}
    }//end function



//����״̬
function isOpenState(){
	    //���أ�
	if (document.getElementById('musicbox_MediaPlayer1')) {
		return (document.getElementById('musicbox_MediaPlayer1').OpenState==6 && ConnectTime==-1);
	}
}

//����״̬
function isPlayState(){
	if (document.getElementById('musicbox_MediaPlayer1')) {
		return (document.getElementById('musicbox_MediaPlayer1').PlayState==2 && PlayTime==-1);
	}
}

//�ٶ�
function getNetSpeed(now){
	if (document.getElementById('musicbox_MediaPlayer1')) {
		return (document.getElementById('musicbox_MediaPlayer1').ReceivedPackets/(now.getTime()-d.getTime())*1000);
	}
}
//��ȡ�ļ���ַ
function getCurrURL(){
	if (document.getElementById('musicbox_MediaPlayer1')) {
		return (document.getElementById('musicbox_MediaPlayer1').FileName);
	}
}
//��ȡ�������
function getErrNums(){
	if (document.getElementById('musicbox_MediaPlayer1')) {
		return document.getElementById('musicbox_MediaPlayer1').ErrorCode;
	}
}
//��ȡ�����������
function getErrCode(){
	if (document.getElementById('musicbox_MediaPlayer1')) {
		return document.getElementById('musicbox_MediaPlayer1').ErrorDescription;
	}
}

//20���ڼ������ֵ������,���ڣ�����󱨸棬���ڣ����Ӳ�����һ��
    function musicbox_dde(){
    var now = new Date();
  	if( (now.getTime()-d.getTime()) < period )
		{
		if( isOpenState() ) ConnectTime = (now.getTime()-d.getTime())/1000;
		if( isPlayState() ) PlayTime = (now.getTime()-d.getTime())/1000;
		_CurrentSong=getCurrURL()
		CheckFirst=setTimeout(musicbox_dde,1000);
  	}else{
		//���������룬report
		report();
		}//end if
  }

  //���ʹ���ֵ
  function report(){
	//����flash��ķ����ı�lrc��ֵ
	 
	var now = new Date();
	//���������ٶ�	
	Speed	= getNetSpeed(now);
	//������ַ
	var currentURL = getCurrURL();
	//����groudid
	var globalid = currentlrc;//cgroupid
    var a=globalid.lastIndexOf("=")
    globalid=globalid.slice(a+1,a+17)
    var isMirror = false;
    if(currentURL && currentURL.indexOf("wxc")>0) isMirror = true;
	if (currentURL) {
		currentURL = currentURL.replace(/\?wxc/g,"");
		currentURL = currentURL.replace(/&/g,"%26");
	}
    
	if(errorMsg=="" && !(Speed==0 && PlayTime>-1 && ConnectTime>-1)){//�Ǵ����� �ǻ��沥��
		reportMsg = "?ConnectTime="+ConnectTime+"&PlayTime="+PlayTime+"&Speed="+Speed+"&url="+currentURL+"&grpid="+globalid+"&type=NEW";
	}else if(errorMsg != ""){
		errorMsg = errorMsg.replace(/&/g,"%26");
		reportMsg="?Error="+errorMsg+"&url="+currentURL+"&grpid="+globalid+"&type=NEW";
        isError=true;
	}else{
	        //window.status="�����Ѿ�����!";
	}
   
    
	if( reportMsg != "")
	{
		
		win_listenPing = document.getElementById("listenPing");
		pmsg	= "http://pa.d.sogou.com/listenPing.jsp"+reportMsg.replace(" ","_")+"&area=n&vendor=blogDetector&mirror="+isMirror;
		//alert(pmsg)
		if( win_listenPing.src != pmsg) {
			win_listenPing.src=pmsg;
		}
        //ʼ����
		d   = new Date();
		ConnectTime = -1;
		PlayTime    = -1;
		Speed   = -1;
		reportMsg = "";
		errorMsg = "";
		lrc=""
		if(isError){
          //musicbox_playNext();
		  isError=false;
		}
	}//end if
    document.getElementById('musicbox_flash').musicbox_setlrc();
}

function setlrc(lrc){
    currentlrc=lrc;
}

//����
function doErrorReport(){
	//for 6.4
    var errNum = getErrNums();
    var errDesc =getErrCode();
	var msg = "Error number: " + errNum + ";";
	msg += "Error description: " + errDesc;
	errorMsg    = msg;
	report();
}


 function clearping(){
		clearTimeout(CheckFirst);
	}

function Error(){
  var cur=getCurrURL();
  //alert(cur)
  if((cur.indexOf(".rm")>0)||(cur.indexOf(".ram")>0)){
	 musicbox_playNext();
	}else{
	    //��FLASH�ж��ǲ��ǵ�һ�Σ�����ǣ�ִ��doErrorReport
	document.getElementById('musicbox_flash').musicbox_doErrorReport();
	 }
	}

//���������------------------------------------------------------------------------------------------------------------------
    //����Ƿ�ʱ
    function musicbox_checkTime(){
		//alert("��ʱ")
	   if(document && document.getElementById('musicbox_MediaPlayer1') && (document.getElementById('musicbox_MediaPlayer1').PlayState==0||document.getElementById('musicbox_MediaPlayer1').PlayState==3) )
	   {
		   //alert("��ʱ")
		   if(timeMore==false)
		   {
			  // alert("��һ��")
	            musicbox_playMp3(document.getElementById('musicbox_MediaPlayer1').Filename)
				timeMore=true;
		   }else{
			  // alert("��һ��")
              musicbox_playNext();
		   }
	   }
	}
    
    
    function musicbox_getVolume(num){
	  document.getElementById('musicbox_flash').musicbox_getVolume(num);
	}
   
	function musicbox_SetVolume(num){
	   var b=35*num-3500;
	   //alert(b)
	   document.getElementById('musicbox_MediaPlayer1').Volume=b;
	}
   
	function musicbox_SetProgress(num){
		if (document && document.getElementById('musicbox_flash')) {
	  document.getElementById('musicbox_flash').musicbox_SetProgress(num);
		}
	}
    
	function musicbox_autoProgress(){
	     
		   if (document && document.getElementById('musicbox_MediaPlayer1')){
	       var cp=document.getElementById('musicbox_MediaPlayer1').currentPosition;
		   }
		 
		   if (document && document.getElementById('musicbox_MediaPlayer1')) {
		   var dur=document.getElementById('musicbox_MediaPlayer1').duration;
		   }
		   var jindu=(cp/dur);
           musicbox_SetProgress(jindu);
	}


	function musicbox_GetProgress(num){
	   document.getElementById('musicbox_MediaPlayer1').currentPosition=(num/100)*document.getElementById('musicbox_MediaPlayer1').duration;
	   musicbox_autoProgress();
	}


	
	function ceshi(num){
	  //	alert(num)
	}
   
	function musicbox_getlink(str){
	   window.open(str)
	}
   
	function musicbox_search(str){

	    var _form = document.createElement("form");
	    _form.style.display = "none";
	    _form.action = "http://d.sogou.com/music.so";
	    _form.target = "_blank";
	    var _input = document.createElement("input");
	   _input.value = str;
	   _input.name = "query";
	    _form.appendChild(_input);
	   document.body.appendChild(_form);
	   _form.submit();
	   _form.parentNode.removeChild(_form);
	}


function musicbox_initFlash(swfName, param){
  musicbox_insertMediaPlayer('MediaPlayer', 0, 0);
  if(document.getElementById("musicbox_MediaPlayer1")!=null)
  {
      musicbox_insertFlash('musicbox', swfName, 100, 100, param)
   }
}

function musicbox_allStop(){
	document.getElementById("musicbox_MediaPlayer1").Stop();
    clearTimeout(musicbox_Timemore);
	clearInterval(musicbox_ShowProgress);
	document.getElementById("musicbox_flash").StopPlay();
}

  
    function MediaEndOfStream(){
	   musicbox_playNext();
	}
	
	
	function playStateChange(){
	    var f;
        var lOldState=arguments[0];
		var lNewState=arguments[1];
		//alert(lOldState+"+"+lNewState)
		if(lOldState==2 && lNewState==1){
	   f=2;
	}else if((lOldState==1 && lNewState==2)||(lOldState==3 && lNewState==2)){
	  f=1;
	}else if(lOldState==2 && lNewState==3)
	{
	   f=3;
	}
	else if(lOldState==2 && lNewState==0)
	{
	  f=2;
	 clearTimeout(musicbox_Timemore);
	}else if(lOldState==1 && lNewState==0){
        document.getElementById('musicbox_MediaPlayer1').Stop();
		clearTimeout(musicbox_Timemore);
		 f=2;
	}
	else
	{
       f=0;
	}
	musicbox_thisMovie("musicbox_flash").musicbox_showStat(f);
	}
	
   