function Wplay(){
  MediaPlayer1.play()
}
//播放


function Wstop(){
  MediaPlayer1.stop()
  
}
//停止



function Wpause(){
  MediaPlayer1.pause()
}
//暂停


function next5()
{
	//alert(MediaPlayer1.CurrentPosition)
	MediaPlayer1.CurrentPosition += 5;
}

function pre5()
{
    MediaPlayer1.CurrentPosition -= 5;
}



function stopsound()
{
     //player.settings.volume = 0;
	 volumeResetNum = MediaPlayer1.Volume; //存入变量
	 //alert(volumeResetNum)
     MediaPlayer1.Volume=0;
}


function backupsound()
{
     //player.settings.volume = 0;
	 //alert(volumeResetNum)
	MediaPlayer1.Volume=volumeResetNum;
}


function gotosound(args)
{
	//alert(args)
	MediaPlayer1.CurrentPosition=args*MediaPlayer1.duration;
	showTime();
}


function setvol(args)
{
	//alert(100*(args-100))
    MediaPlayer1.Volume=100*(args-100);
}

function formatSec(s){
	if( (0+s)<10 ) s= "0"+Math.floor(s);
	else	s = Math.floor(s);
	return s;
}

function showTime()
{

var cp=MediaPlayer1.currentPosition
//播放秒  当前
var cps=MediaPlayer1.CurrentTime;
//播放时间 当前
var dur=MediaPlayer1.duration;
//总秒
var durs=MediaPlayer1.TotalTitleTime;
//总时间



cps=MediaPlayer1.currentPosition;
cps_min=Math.floor(cps/60);
cps_sec=cps%60;
cps=formatSec(cps_min)+":"+formatSec(cps_sec);

durs=(0+MediaPlayer1.duration);
durs_min=Math.floor(durs/60);
durs_sec=durs%60;
durs=formatSec(durs_min)+":"+formatSec(durs_sec);
//alert("cps="+cps+",durs="+durs);

var volume=MediaPlayer1.Volume;

var Times=""

if(dur>0)
{
   Times= cps + "/" + durs
}
   else
{
   Times=""
}



//删除调用


//window.status = Times
window.document.zhr.SetVariable("JSTxt", Times);
window.document.zhr.SetVariable("cp",cp);
window.document.zhr.SetVariable("dur",dur);
window.document.zhr.SetVariable("vol",volume);
window.document.zhr.SetVariable("cps",cps);
window.document.zhr.SetVariable("durs",durs);
}
//showtime

var ShowMuisc
var load_In

function getUrl(Url)
{
    //alert(Url)
   MediaPlayer1.FileName=Url
   //ShowMuisc = setInterval('showTime()',1000); 
   load_In = setInterval('load_Music()',1000); 
}

function clearplayer()
{
   clearTimeout(ShowMuisc);
   clearInterval(load_In);
} 

//地址




loadtime=0;
function load_Music()
{
	 loadtime++;
	zsj=MediaPlayer1.CurrentPosition;
    //document.title=zsj;
	if (zsj>1) 
	{
	  ShowMuisc = setInterval('showTime()',1000); 
      //alert("超过10")
	  clearInterval(load_In);
	  //alert("clear load_in 完毕")
	}

	

}

// -->


function printurl(args)
{
	//alert(args)
	//$(urlinfo).innerHTML += args+'<br />';
}

function ceshi(msg)
{
	alert(msg)
}

function mcbar(args)
{
	alert(args)
}

function zhr_DOFSCommand(command,args)
	{
    if (command=="Play")
	{
         Wplay()
	}
	if (command=="Stop")
	{
         Wstop()
	}
	if (command=="Pause")
	{
         Wpause()
	}
	if (command=="Url")
	{
         getUrl(args)
	}
    if(command=="next5")
		{
		next5()
	}
	if(command=="pre5")
		{
		pre5()
	}
	if(command=="stopsound")
		{
		stopsound()
	}
	if(command=="backupsound")
		{
		backupsound()
	}
	if(command=="gotosound")
	{
      gotosound(args)
	}
	if(command=="setvol")
	{
		setvol(args)
	}
	if(command=="clearplayer")
	{
       clearplayer()
	}
	   if(command=="ceshi")
	{
       ceshi(args)
	}
	   if (command=="ceshi")
	{
         ceshi(args)
	}	  
		 if (command=="init")
	{
       initMusicbox()
	}
	   	 if (command=="geturl")
	{
       printurl(args)
	}
}