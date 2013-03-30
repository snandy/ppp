	var Fld_len=8;
	var Pst_name="playlistMyBox";
	var Pst_list_name = "oMyList";
	var Pst_attr_box="plmybox";
	var Pst_attr_list="mylist";
	var Pst_content="";
	var Pst_list_content="";
	var cur_page	= 1;
	var page_size	= 20;
	var max_fav		= 100;
	var max_playlists = 20;
	var debug=false;
	if(typeof(currentSong)=='undefined') var currentSong=-1;
	if(typeof(lastSong)=='undefined') var lastSong=currentSong;

    function pst_get_list_content(force){
        if(typeof(force)=='undefined' ||!force) force=false;
        if(force || Pst_list_content.Trim()==""){
            if(debug) alert("load list from userData...");
            oPersist.load(Pst_list_name);
            Pst_list_content = oPersist.getAttribute(Pst_attr_list);
            if(Pst_list_content==null) Pst_list_content="";
            if(typeof(Pst_list_content)=='string') Pst_list_content   = Pst_list_content.Trim();
            if(debug) alert("quit pst_get_list_content...");
        }else{
            if(debug) alert("load list from cache");
        }
        return Pst_list_content;
    }
    
    function getPlaylist(){
    	var list = new Array();
    	var mm = 	pst_get_list_content();
    	var lines = mm.split("\n");
    	var item;
    	for(var i=0;i<lines.length;i++){
    		item = new PlaylistItem();
    		item.init(lines[i]);
    		list.Push(item);
    	}
    	return list;
    }
    
	function pst_get_box_content(force){
		if(typeof(force)=='undefined' ||!force)	force=false;
		if(force || Pst_content.Trim()==""){
			if(debug) alert("load from userData...");
			oPersist.load(Pst_name);
			Pst_content = oPersist.getAttribute(Pst_attr_box);
			if(Pst_content==null) Pst_content="";
			if(typeof(Pst_content)=='string') Pst_content	= Pst_content.Trim();
			ss	= fixPersist(Pst_content);
			if(ss.Trim()!=Pst_content.Trim()){
				if(debug) alert("data conflict,need fix and reSave...");
				Pst_content = ss;
				pst_save_box_content(Pst_content);
				if(debug) alert("save OK");
			}
			if(debug) alert("quit pst_get_box_content...");
		}else{
			if(debug) alert("load from cache");
		}
		return Pst_content;
	}

    function pst_save_box_content(str){
		str = str.Trim();
		if(debug) alert("ready to save_box...\n::"+str);
		oPersist.setAttribute(Pst_attr_box,str);
		oPersist.save(Pst_name);
		Pst_content	= str.Trim();
        return true;
    }

    function pst_save_list_content(str){
        var str = str.Trim();
        if(debug) alert("ready to save_list...\n::"+str);
        oPersist.setAttribute(Pst_attr_list,str);
        oPersist.save(Pst_name);
        Pst_list_content = str.Trim();
        return true;
    }

	function ddeAddInput(str){
		//oPersist.load(Pst_name);
		//fixPersist(Pst_attr_box);
		//mem = oPersist.getAttribute(Pst_attr_box);
		var mem = pst_get_box_content(true);
		if(!isExists(str,mem)){
			if(debug) alert("box 不存在此记录可以添加,ready to new..."+str);
			var item = new SongItem();
			item.createItem(str);
			if(debug) alert("create ok..."+item.toString());
			if(mem){
				//oPersist.setAttribute(Pst_attr_box,mem+"\n"+item.toString());
				pst_save_box_content(mem+"\n"+item.toString());
			}else{
				//oPersist.setAttribute(Pst_attr_box,item.toString());
				pst_save_box_content(item.toString());
			}
			//oPersist.save("oMyBox");
		}else{
			if(debug) alert("box 存在此记录!!quit...");
		}
	}

	function ddeAddList(str){//添加playlist数据到client.
		var mem = pst_get_list_content(true);
		if(!isListExists(str,mem)){
			if(debug) alert("list 不存在此记录可以添加,ready to new..."+str);
			var item = new PlaylistItem();
			item.createItem(str);
			if(item.playlistid != parseInt(item.playlistid)){
				alert("ID非法加入失败！！");
				return;
			}else if( item.title.Trim()=="" ){
				alert("Title不能为空！！");
				return;
			}
            if(mem){
                pst_save_list_content(mem+"\n"+item.toString());
            }else{
                pst_save_list_content(item.toString());
            }
			
		}else{
//			if(debug) alert("list 存在此记录,ready to update..."+str);
			window.status="添加失败，已经存在此记录！";
		}

	}

    function deleteBox(){
		if(confirm("您确定要删除『音乐盒』中所有的歌曲吗？")){
			pst_save_box_content("");
		}
    }
	
	function isExists(str,mem){
		//line = str.split("\n");
		var aitem = new SongItem();
		aitem.init(str);
		if(!mem||typeof(mem)=='undefined') return false;
		lines = mem.split("\n");
		if(lines.length>=max_fav){
			alert("对不起，您的音乐收藏盒已满！请先删除旧的以便添加新歌！");
			if(debug) alert("对不起，您的音乐盒已满！");
			return true;
		}
		for(var i=0;i<lines.length;i++){
			var item = new SongItem();
			item.init(lines[i]);
			if(item.globalid==aitem.globalid){ 
				if(debug) alert("isExists::url(1)="+item.globalid+",url(2)="+aitem.globalid);
				return true;
			}
		}
		return false;
	}

	function isListExists(str,mem){
		var aitem = new PlaylistItem();
		aitem.init(str);
		if( !mem || typeof(mem)=='undefined') return(false);
		var lines	= mem.split("\n");
		if( lines.length>= max_playlists ){
			alert("对不起，您的音乐列表已满！请先删除再添加新的列表！");
            if(debug) alert("对不起，您的播放列表已满！");
            return true;
		}
        for(var i=0;i<lines.length;i++){
            var item = new PlaylistItem();
            item.init(lines[i]);
            if(item.playlistid==aitem.playlistid){
                if(debug) alert("isListExists::playlistid(1)="+item.playlistid+",url(2)="+aitem.playlistid);
                alert("isListExists::playlistid(1)="+item.playlistid+",url(2)="+aitem.playlistid);
                return true;
            }
        }
        return false;
	}

	function playClicked(n){
		if( typeof(n)=='undefined' || !n ){
			var e= event.srcElement;
			if(e.parentNode && e.parentNode.tagName=='TR') n = e.parentNode.seq;
		}
		PlayList = true;
		lastSong	= currentSong;
		currentSong = n;
		if(debug) alert("playClicked... begin listBox");
		var list = listBox();
		if(debug) alert("listBox.length=::"+list.length);
		play(list[n]);
	}

	function ddeLoadInput(globalid){ //url for lighlight Item
		var mem = pst_get_box_content();
		if(debug) alert("ddeLoadInput:: begin to show list:"+mem);
		if(!mem||typeof(mem)=='undefined') return;
		var lines = mem.split("\n");
		for(var i=0;i<lines.length;i++){
			var item = new SongItem();
			item.init(lines[i]);
			newtr	= dde_boxlist.insertRow();
			newtr.setAttribute("seq",i);
			newtr.runtimeStyle.cursor="hand";
			newtr.onclick=playClicked;
			if(globalid && globalid == item.globalid)
				newtr.runtimeStyle.backgroundColor="#ffffcc";
			else if(typeof(currentSong)!='undefined' && currentSong==i)
                	newtr.runtimeStyle.backgroundColor="#ffffcc";
			cell = newtr.insertCell();
			cell.setAttribute("align","center");
			cell.innerHTML='<font size="2" face="Verdana">'+(i+1)+'</font>';
			cell = newtr.insertCell();
			cell.setAttribute("align","left");
			cell.setAttribute("style","font-size:14px;font-face:Verdana");
			ll	= item.title.replace("%27","'").length;
			if(ll>20){
				cell.innerHTML="<a style='cursor:hand' onmouseover='window.status=\""+item.globalid+"\";' onclick='playClicked("+i+");return(false);'>"+item.title.replace("%27","'").substring(0,20)+"...</font></a>";
			}else{
				cell.innerHTML="<a style='cursor:hand' onmouseover='window.status=\""+item.globalid+"\";' onclick='playClicked("+i+");return(false);'>"+item.title.replace("%27","'")+"</font></a>";
			}
			//Up Arrow
			cell = newtr.insertCell();		
			cell.setAttribute("align","center");				
			if(i>0) cell.innerHTML='<img border="0" src="images/ce4.gif" style="cursor:hand" onclick="moveUp('+i+')" width="20" height="20">';
			//Down Arrow
			cell = newtr.insertCell();		
			cell.setAttribute("align","center");				
			if(i<(lines.length-1))cell.innerHTML='<img border="0"  style="cursor:hand" onclick="moveDown('+i+')" src="images/downarrow.gif" width="20" height="20">';
			
			
			cell = newtr.insertCell();		
			cell.setAttribute("align","center");				
			cell.innerHTML='<img alt="删除" hspace="1" src="images/i.p.delete.gif" style="cursor:hand" onclick="remove('+i+')" align="absMiddle" border="0">';
		}
		
	}

	function _ddeLoadInput(p){
			ddeLoadInputMyFav(p);
	}

	function ddeLoadInputMyFav(Page){ //url for lighlight Item
		if( !Page ) Page=cur_page;
		var mem = pst_get_box_content();
        	for(var i=dde_boxlist.rows.length-1;i>0;i--){
            		dde_boxlist.rows[i].removeNode(true);
        	}
		if(debug) alert("ddeLoadInput:: begin to show list:"+mem);
		if(!mem||typeof(mem)=='undefined') return;
		var lines = mem.split("\n");
		for(var i=(Page-1)*page_size;i<lines.length && i<Page*page_size;i++){
			var item = new SongItem();
			item.init(lines[i]);
			newtr	= dde_boxlist.insertRow();
			if( i%2==1 ) 	newtr.setAttribute("style","cursor:hand; background-color:#f6f6f6");
			else			newtr.setAttribute("style","cursor:hand");
			newtr.setAttribute("selected","false");
			newtr.setAttribute("globalid",item.globalid);
			newtr.attachEvent("onclick",autoselect);
			newtr.attachEvent("onmouseover",function(){event.srcElement.parentNode.style.background='#cfc';});
			newtr.attachEvent("onmouseout",function(){event.srcElement.parentNode.style.background='transparent';});
//			newtr.setAttribute("onmouseout","this.style.background='transparent';");
			<!--第1列-->
			cell = newtr.insertCell();
			cell.setAttribute("align","center");
			cell.setAttribute("style","cursor:hand");
			cell.innerHTML='';
			<!--第2列-->
			cell = newtr.insertCell();
			cell.setAttribute("align","center");
			cell.innerHTML=i+1;
			<!--第3列-->
			cell = newtr.insertCell();
			cell.innerHTML=""+item.title;
			<!--第4列-->
			cell = newtr.insertCell();
			cell.setAttribute("align","center");
			cell.innerHTML=""+item.singer;
			<!--第5列-->
			cell = newtr.insertCell();
			cell.setAttribute("align","center");
			cell.innerHTML='<td align="center"><a href="#"><img src="myfav/images/listen.gif" alt="试听" width="16" height="15" border="0"></a>';
			<!--第6列-->
			cell = newtr.insertCell();
			cell.setAttribute("align","center");
			if(i!=0)
				cell.innerHTML='<a href="#"><img src="myfav/images/sortup.gif" alt="上移" width="11" height="15" border="0" onclick="moveUp('+i+')"></a>';
			else
				cell.innerHTML='&nbsp;';
			<!--第7列-->
			cell = newtr.insertCell();
			cell.setAttribute("align","center");
			if(i!=lines.length-1)
				cell.innerHTML='<a href="#"><img src="myfav/images/sortdown.gif" alt="下移" width="11" height="15" border="0" onclick="moveDown('+i+')"></a>';
			else
				cell.innerHTML='&nbsp;';
			<!--第8列-->
			cell = newtr.insertCell();
			cell.setAttribute("align","center");
			cell.innerHTML='<a href="#"><img src="myfav/images/del.gif" alt="删除" width="11" height="12" border="0" onclick="remove('+i+')"></a>';
			<!--第9列-->
			cell = newtr.insertCell();
			cell.setAttribute("align","center");
			cell.innerHTML='<a href="#"><img src="myfav/images/sendto.gif" alt="送友" width="15" height="11" border="0"></a>';
		}
		
	}
	
	function moveDown(no){
		
		var mem = pst_get_box_content();
		var lines = mem.split("\n");
		var str = "";
		
		for(var i=0;i<lines.length-1;i++){
			if(no==i){ //swap lines...
				aa = lines[i+1];
				lines[i+1]=lines[i];
				lines[i]=aa;
			}
			str+=lines[i]+"\n";
		}
		str += lines[lines.length-1];
		pst_save_box_content(str);
		if( no  == currentSong-1 ){
			currentSong--;
		}else if( no<lines.length-1 && currentSong==no){
			currentSong++;
		}
		var item = getSongItem(currentSong);
		if(item){
			var globalid = item.globalid;
			refreshBox(globalid);
		}
		else refreshBox();
	}
	//notHighlightItem 是为了05年8月版中的favorite管理而设，为不影响试听页面(currentSong)而设置,当有此参数时则不进行highlight标亮当前歌曲.
	function moveUp(no,notHighlightItem){
		
		var mem	= pst_get_box_content();
		var lines = mem.split("\n");
		var str = "";
		
		for(var i=1;i<lines.length;i++){
			if(no==i){ //swap lines...
				var aa = lines[i-1];
				lines[i-1]=lines[i];
				lines[i]=aa;
			}
			str+=lines[i-1]+"\n";
		}
		str += lines[lines.length-1];
		pst_save_box_content(str);
		if( no==currentSong+1 ){
			currentSong++;
		}else if( no>0 && currentSong==no){
			currentSong--;
		}
		var item = getSongItem(currentSong);
		if(item) refreshBox(item.globalid);
		else refreshBox();
	}

	function remove(no){
		var mem	= pst_get_box_content();
		var lines = mem.split("\n");
		var str = "";
		
		for(var i=0;i<lines.length;i++){
			if(no!=i){
				if(i<lines.length-1) str+=lines[i]+"\n";
				else str+=lines[i];
			}
		}
		pst_save_box_content(str);
        var item = getSongItem(currentSong);
        if(currentSong!=no && item){
            var globalid = item.globalid;
            refreshBox(globalid);
        }else{
			refreshBox();
		}
	}
	
	function refreshBox(globalid){
		for(var i=dde_boxlist.rows.length-1;i>0;i--){
			dde_boxlist.rows[i].removeNode(true);
		}
		ddeLoadInput(globalid);
	}

function playBox(){
	//initialList
	var list = listBox();
	PlayList = true; //global var
	currentSong = -1;//global var
	
	playNext();
	//var plarray = MediaPlayer1.playlistCollection.getByName("MyPlaylist");

}

function listBox(){
	var list = new Array();
	var mem = pst_get_box_content();
	if(!mem||typeof(mem)=='undefined') return list;
	var lines = mem.split("\n");
	for(var i=0;i<lines.length;i++){
		if(lines[i].Trim()=="") continue;
    	var item	= new SongItem();
    	item.createItem(lines[i]);
    	list.Push(item);
    }
   return list;
}

function getSongItem(seq){
	
	var item    = new SongItem();
    var list = new Array();
	mem = pst_get_box_content();
   if(typeof(mem)=='undefined' ||mem=="") return list;
   var lines = mem.split("\n");
   if(seq>-1 && seq < lines.length-1){
        item.init(lines[seq]);
		return item;
	}
   return;
}

function getSongItemByGID(globalid){
   
    var item    = new SongItem();
    mem = pst_get_box_content();
   	if(typeof(mem)=='undefined' ||mem=="") return null;
   	var lines = mem.split("\n");
	for(var i=0;i<lines.length;i++){
		item = new SongItem();
		item.init(lines[i]);
		if(item.globalid==globalid) return item;
    }
   return null;
}

function SongItem(){
        this.globalid = "";//group id
        this.title="";//song name
        this.lyrictype="";//lyric type
        this.gid= ""; //lyric id
        this.singer="";//
	this.version="2.0";
        this.album="";
        this.playtime = "";
}

SongItem.prototype.init = function(str){
	if(!str || str.Trim()=="") return this;
	var fields = str.split("\t");
	var len	= fields.length;
	var i=0;
	if(len==3){
		this.globalid = "null";
	}else{
		if(len>i) this.globalid = fields[i++].Trim();
		else this.globalid="";
	}

	if(len>i) this.title = fields[i++].Trim();
	else this.title="";
	if(len>i) this.lyrictype = fields[i++].Trim();
        else this.lyrictype="";
	if(len>i) this.gid   = fields[i++].Trim();
	else this.gid="";
	if(len>i) this.singer   = fields[i++].Trim();
	else this.singer="";
	if(len>i) this.version=fields[i++].Trim();
	else this.version="2.0";
	return this;
}

SongItem.prototype.createItem = function(str){
	if(debug) alert("createItem::"+str);
	var fields = str.split("\t");
	var len	= fields.length;
	if(len==3){
		if(debug) alert("createItem for len=3:str="+str);
		str = "null\t"+str;
		for(var i=len;i<Fld_len;i++) str += "\t"+"null";
		return this.init(str);
	}else if(len==4){
		if(debug) alert("createItem for len=4:str="+str);
		for(var i=len;i<Fld_len;i++) str += "\t"+"null";
		return this.init(str);
	}else if(len==5){
      		if(debug) alert("createItem for len=5:str="+str);
       		for(var i=len;i<Fld_len;i++) str += "\t"+"null";
        	return this.init(str);
	}else if(len==6){
      		if(debug) alert("createItem for len=6:str="+str);
       		for(var i=len;i<Fld_len;i++) str += "\t"+"null";
        	return this.init(str);
	}else if(len==8){
		if(debug) alert("createItem for len=8:str="+str);
		return this.init(str);
	}
}

SongItem.prototype.toString = function(){
        var rt  = this.globalid+"\t";
        rt              += this.title+"\t";
        rt              += this.lyrictype+"\t";
        rt              += this.gid+"\t";
        rt              += this.singer+"\t";
	rt		+= this.version+"\t";
        for(var i=6;i<Fld_len;i++){
                rt += "null\t";
        }
        return rt.Trim();
}

function playNext(){
	window.document.zhr.TCallFrame("_level0.nextmusic",0);
}

function playPre(){
try{
	currentSong--;
	var list = listBox();
	if(list.length==0) return;
	if(currentSong>list.length-1) currentSong=list.length-1;
	if(currentSong<0 && PlayLoop){
		currentSong=list.length-1;
		play(list[currentSong]);
	}else if(currentSong<0){
		window.status="已经达到播放列表顶部";
	}else{
		play(list[currentSong]);
	}
}catch(e){
	document.title=e;
}
}
var Idx_item	= null;
function play(item){
	var list = listBox();
	/*if( isRM(list[currentSong].url) != isRM(list[lastSong].url) ){
		oldloc = location.href;
		var re = /&currentSong=\d{1,}/g;
		oldloc = oldloc.replace(re,"");
		re	= /&isRM=\d{1}/g;
		oldloc = oldloc.replace(re,"");
		
		oldloc += "&currentSong="+currentSong;
		if(isRM(list[currentSong].url)) oldloc += "&isRM=1";
		alert(oldloc);		
		location.href = oldloc;
	}*/
	if(debug) alert("in func play(item)..."+item.toString());
	Idx_item	= item;
	highlightList(item.globalid);
	if(debug) alert("ready to setTimeout(play2,500)...");
	setTimeout("play2()",500);
	if(debug) alert("down setTimeout(play2,500)");
}

function openInOpener(url){
	if(typeof(opener)!='undefined'){
		opener.location.href	= url;
		opener.focus();
		return(false);
	}
	return(true);
}

function play2(){
	if(debug) alert("in func play2(item)...");
	var item	= Idx_item;
	var player = document.getElementById("MediaPlayer1");
	singleGroup(item.globalid);
	if(!player || typeof(player)=='undefined'){
		alert("程序初试化出错,为更好为您服务请提交此反馈……");
		open("http://61.135.131.168:8080/feedback/?query=Sogou","_blank","");
		return;
	}
	if( typeof(detectOver)=='boolean' ){ detectOver = false;}
	player.FileName	= "/getBoostSong.so?groupid="+item.globalid;
	geciurl = "/gecis.so?lyricid="+item.gid;
	if(item.gid.length<10) geciurl="sorry. no lrc find..";
	syncStaticLRC(geciurl);
	document.getElementById("headTitle").innerHTML="<a href='/music.so?query="+item.title+"' target=_blank>"+item.title.Chop(32)+"</a>";
//	document.getElementById("ADDFAV_HREF").href="newAddFav.so?gid="+item.globalid;
//	document.getElementById("ADDFAV_HREF").href="javascript:void(null)";
//	document.getElementById("ADDFAV_HREF").href="musicFav.so?gid="+item.globalid+"&tl="+item.title+"&lycType=&lrcid=&ar=";
//	document.getElementById("ADDFAV_HREF").innerHTML="<a href=javascript:void(null) onclick=popup('newAddFav.so?gid="+item.globalid+"',300,360);return false;><font color=red>收藏到音乐盒</font></a>";
	
	
	//append by orrin
//	document.getElementById("headSinger").innerHTML="<a href='/music.so?query"+item.singer+"' onclick='return(openInOpener(this.href)'>"+item.artist+"</a>";

	var addFavObj=document.getElementById("ADDFAV_HREF")
        addFavObj.onclick=function (){
                popup("newAddFav.so?gid="+item.globalid,300,360);
                return false;
                //popup("d.sogou.com",400,360);
        }


       	var downObj=document.getElementById("downloadIMG")
	downObj.onclick=function (){
		quickDown(item.globalid,item.title);
		l('p4p=1000','listen');
	};
	// for sync LRC...
	if(item.globalid!="" && item.globalid!="undefined" && item.globalid!="null"){
		if(typeof(ko)=='undefined'){
/*
			ko.setPlayer("MediaPlayer1");
			u	="/gecilrc.so?lyricid="+item.lyricid+"&mm"+(new Date).getTime();
			ko.setURL(u);
			ko.setOutput("show");
			ko.syncLRC();
			ko.start();
*/
		}else{
			u	="/gecilrc.so?lyricid="+item.gid+"&mm"+(new Date).getTime();
			ko.setURL(u);
			ko.setOutput("contentLRC");
			ko.syncLRC();
			ko.start();
		}
	}else{
		if(typeof(ko)!='undefined') ko.destroy();
		ko.output.innerHTML="欢迎使用搜狗音乐搜索……";
	}
}

function highlightList(globalid){
	var player = document.getElementById("MediaPlayer1");
	if(typeof(player)=='undefined') player = document.getElementById("player");
	if(globalid){
		refreshBox(globalid);
	}else{
		//alert(player.url)
		refreshBox();
	}
}

function syncStaticLRC(url){
    var xmlhttp=false;
    /*@cc_on @*/
    /*@if (@_jscript_version >= 5)
    // JScript gives us Conditional compilation, we can cope with old IE versions.
    // and security blocked creation of the objects.*/
     try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
     } catch (e) {
      try { 
       xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
       xmlhttp = false;
      }
     }
    /*@end @*/
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
	if(url.indexOf("?")<0) url = url+"?"+(new Date()).getTime();
	else url = url+"&"+(new Date()).getTime();
    xmlhttp.open("GET", url,true); //ok resouse ;true -- 并行
    xmlhttp.setRequestHeader("Content-Type","text/xml; charset=gb2312");
    xmlhttp.onreadystatechange=function() {
        //window.status="httpRequest Code:"+xmlhttp.readyState;
            if (xmlhttp.readyState==4) {
          //   alert(xmlhttp.getAllResponseHeaders())

		try{
		mm = document.getElementById("staticLRC");
		if(mm) {
			mm.innerHTML="";
		}

                  if(xmlhttp.status<400){
                          //NOTE:: xmlhttp.responseText can not leading or included by <tag> !!!!

						  str   = xmlhttp.responseText;
						if(mm) mm.innerHTML = str;
                  }else{
			//if(mm) mm.innerHTML = "staticLRC_DDE_ERROR==>"+this.url+" has Not Found....ErrorCode="+xmlhttp.status;
			if(mm) mm.innerHTML = "无歌词！";
                  }
		}catch(e){
		//	alert("reasdfasdfa::"+e);
		}

            }
    }
    xmlhttp.send(null);
}

function fixPersist(str){
	var mem = str;
	if(debug) alert("begin to fix data(==::\n"+mem);
	if(!mem||typeof(mem)=='undefined') return "";
	var lines = mem.split("\n");
	var newMem = "";
	for(var i=0;i<lines.length;i++){
		//fields = lines[i].split("\t");
		var item = new SongItem();
		item.createItem(lines[i]);
		var s	= item.toString();
		if(debug) alert("checkItem("+s+")="+checkItem(s)+"::len="+s.split('\t').length);
		if(checkItem(s)) newMem += s+"\n";
	}
	return newMem.Trim();
}

function getGlobalID(url){
		mem = pst_get_box_content();
        lines = mem.split("\n");
		rt="";
        for(var i=0;i<lines.length;i++){
            var item = new SongItem();
			item.init(lines[i]);
			if(item.url == url){
				rt = item.globalid;
				break;
			}
		}
		if(debug) alert("find md5 of url("+url+")::"+rt);
		return rt;
}


String.prototype.Trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

function checkItem(str){
	var rt = true;
	var item = new SongItem();
	item.init(str);
//	if(item.url.toLowerCase().indexOf("http://")!=0 && item.url.toLowerCase().indexOf("ftp://")!=0) rt = false;
//	if( _isGID(item.title) ) rt = false;
//	if( !_isGID(item.globalid) && item.globalid.toLowerCase()!="null" && item.globalid.toLowerCase()!="" ) rt = false;
//	if( !_isGID(item.gid) && item.gid.toLowerCase()!="null" && item.gid.toLowerCase()!="" ) rt = false;
	return rt;
}

function _isGID(str){
	if(typeof(str)=='undefined') return false;
	var rt = false;
	var ss = str.Trim().replace(/^(\d|[abcdef]){16}$/g,"*");
	if(ss == "*") rt = true;
	if(ss == 'null') rt = true;
	return rt;
}
function getGlobalIDByURL(url){
	var mem = pst_get_box_content();
	var list = listBox();
	for(var i=0;i<list.length;i++){
		if(list[i].url.replace(/\?wxc/g,"")==url.replace(/\?wxc/g,"")){
			if(debug) alert("getGlobalIDByURL::"+list[i].globalid);
			return list[i].globalid;
		}
	}
}

//以下代码为收藏管理所用

function getPlaylistItemByID(playlistid){
    
    var item    = new PlaylistItem();
    mem = pst_get_list_content();
    if(typeof(mem)=='undefined' ||mem=="") return null;
    var lines = mem.split("\n");
    for(var i=0;i<lines.length;i++){
        item = new PlaylistItem();
        item.init(lines[i]);
        if(item.playlistid==playlistid) return item;
    }
   return null;
}   

function removePlaylist(plid){
        var mm = pst_get_list_content(true);
        var lines = mm.split("\n");
        var str = "";
        for(var i=0;i<lines.length;i++){
            var item = new PlaylistItem();
            item.init(lines[i]);
            if(item.playlistid != plid) 
				str += item.toString()+"\n";
			else
				window.status="found id("+plid+") to delete"+item.playlistid;
		}
        pst_save_list_content(str.Trim());
}

function replacePlaylist(oldid,newid,newtitle){
	if(oldid && newid){
		var mm = pst_get_list_content();
		var lines = mm.split("\n");
		var str = "";
		for(var i=0;i<lines.length;i++){
			var item = new PlaylistItem();
			item.init(lines[i]);
			if(item.playlistid == oldid) {
				item.playlistid = newid;
				if(newtitle) item.title=newtitle;
			}
			str += item.toString()+"\n";
		}
		pst_save_list_content(str.Trim());
	}
}
    
function PlaylistItem(){
    this.playlistid = "";
    this.title="";
} 


PlaylistItem.prototype.init = function(str){
    if(!str || str.Trim()=="") return this;
    var fields = str.split("\t");
    var len = fields.length;
    var i=0;
    if(len>i) this.playlistid = fields[i++].Trim();
    if(len>i) this.title = fields[i++].Trim();
    return this;
}

PlaylistItem.prototype.createItem = function(str){
	return this.init(str);
}

PlaylistItem.prototype.toString = function(){
    var rt  = this.playlistid+"\t";
    rt      += this.title;
    return rt.Trim();
} 


function statusShow(oo){ //根据Row对象取得 属性值，根据状态决定是否改变第一个cell 的显示内容。（选中打勾）
	if(oo.getAttribute("selected")=='true')
		oo.cells[0].innerHTML='<img src="myfav/images/checked.gif" alt="已选择" width="14" height="13">';
	else
		oo.cells[0].innerHTML='';
}

function selectAll(){
        for(var i=dde_boxlist.rows.length-1;i>0;i--){
            dde_boxlist.rows[i].setAttribute("selected","true");
			statusShow( dde_boxlist.rows[i] );
        }
}
function unselectAll(){
        for(var i=dde_boxlist.rows.length-1;i>0;i--){
            dde_boxlist.rows[i].setAttribute("selected","false");
			statusShow( dde_boxlist.rows[i] );
        }
}

function select(oo,flag){
try{
	if(flag){
		oo.setAttribute("selected","true");
	}else{
		oo.setAttribute("selected","false");
	}
	statusShow(oo);
}catch(e){alert("Error:select():"+e);}
}

function autoselect(no){
	var oo = event.srcElement;
	while( typeof(oo)!="undefined" && oo.tagName!="TR" ) oo = oo.parentNode;
	if( typeof(oo)=="undefined" || oo.tagName!="TR" ) return;
try{
	if(oo.getAttribute("selected")=='true')
		select(oo,false);
	else
		select(oo,true);
}catch(e){alert("Error:select():"+e);}
}

function getSelectItems(){//取得当前被选中的行 所对应 user-data 构造的item 数组.
	var list	= new Array();
	var globalid="";
	var item;
	for(var i=1;i<dde_boxlist.rows.length;i++){
		if( dde_boxlist.rows[i].getAttribute("selected") != "true") continue;
		globalid= dde_boxlist.rows[i].getAttribute("globalid");
		item = getSongItemByGID(globalid);
		if(item!=null) list.Push(item);
	}
	alert(list.length);
	s="";
	for(i=0;i<list.length;i++){
		item = list[i];
		s += item.toString()+"\n";
	}
	alert(s);
	return list;
}


function printPaging(flag){ //打印翻页信息: flag--是否直接操作显示区域内容，false--只返回内容，true，直接操作paging 容器的内容。
//<a href="#">[上一页]</a><a href="#">1</a><a href="#">2</a><a href="#">3</a><span class="currentpage1">4</span><a href="#">5</a><a href="#">6</a><a href="#">7</a><a href="#">8</a><a href="#">[下一页]</a>
	var str="";
	var mem = pst_get_box_content();
	var lines = mem.split("\n");
	var len = lines.length;
	var pages=Math.floor((len+page_size-1)/page_size);
	if(cur_page>1)	str += '<a href="#" onclick="cur_page--;ddeLoadInputMyFav();printPaging(true);return(false)">[上一页]</a>';
	for(var i=1;i<=pages;i++){
		if(cur_page == i)
			str	+= '<a href="#" onclick="cur_page='+i+';ddeLoadInputMyFav();printPaging(true);return(false)" class=currentpage>'+i+'</a>';
		else
			str	+= '<a href="#" onclick="cur_page='+i+';ddeLoadInputMyFav();printPaging(true);return(false)">'+i+'</a>';
	}
	if(cur_page<pages)	str += '<a href="#" onclick="cur_page++;ddeLoadInputMyFav();printPaging(true);return(false)">[下一页]</a>';
	else	str += '<font color=white>[下一页]</font>';
	if( flag ){ 
		document.getElementById("paging1").innerHTML=str;
		document.getElementById("paging2").innerHTML=str;
	}else{	
		document.write(str);
	}
	return str;
}

function submitPlaylist(){
	var list = getSelectItems();
	var fm	= document.getElementById("fm_Playlist");
	var listid	= fm.pid;
	var title	= fm.title;
	var lists	= fm.lists;

	var pl  = document.getElementById("playlists");
	if( pl.options[pl.options.selectedIndex].value == 0 ){
		alert("请选择播放列表名称……");
		return(false);
	}
	title.value	= pl.options[pl.options.selectedIndex].text;
	listid.value = pl.options[pl.options.selectedIndex].value;
	for(var i=0;i<list.length;i++){
		lists.value+=list[i].globalid+":"+list[i].gid;
		if(i<list.length-1)	lists.value += ",";
	}
	fm.submit();
}

Array.prototype.Push = function(o){
    var len = this.length;
    this.length++;
    this[len]=o;
}

/**
* 计算字符串的长度，一个汉字两个字符
*/
String.prototype.realLength = function()
{
  return this.replace(/[^\\x00-\\xff]/g,"**").length;
}

String.prototype.Chop = function(num){
    if(!num || num<0) num = 10;
    var old = this+"";
    var s = this;
    while(s.realLength()>num){
        s=s.substring(0,s.length-1);
    }
    if(old.realLength()>num) s += "...";
    return s;
}

function isRM(url){
	var rt = false;
	if( url.toLowerCase().indexOf(".rm")>0 || url.toLowerCase().indexOf(".ram")>0 ) rt = true;
	return rt;
}


/**
* 处理传入值为groupid
* gid组ID，
*/

function singleGroup(gid){
	if(gid!=null||gid!=""){ syncPlayList("/GetBoostList.so?groupid="+gid+"&"+ori_query+"&diy_seq="+(currentSong));}	
}

function syncPlayList(url){
    	var xmlhttp=false;
     	try {
      		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
     	} catch (e) {
      		try { 
       			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      		} catch (E) {
       			xmlhttp = false;
      		}
     	}
    	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      		xmlhttp = new XMLHttpRequest();
    	}
	if(url.indexOf("?")<0) url = url+"?"+(new Date()).getTime();
	else url = url+"&"+(new Date()).getTime();
   	xmlhttp.open("GET", url,true); //ok resouse ;true -- 并行
    	xmlhttp.setRequestHeader("Content-Type","text/xml; charset=gb2312");
    	xmlhttp.onreadystatechange=function() {
        	if (xmlhttp.readyState==4) {
			mm = document.getElementById("globalPlayList");
			if(mm)	mm.innerHTML="aa";
                	if(xmlhttp.status<400){
				str   = xmlhttp.responseText;
				if(mm) mm.innerHTML = str;

                }else{
			if(mm) mm.innerHTML = "syncPlayList_DDE_ERROR==>"+url+" has Not Found....ErrorCode="+xmlhttp.status;
                }
	}
    }
    xmlhttp.send(null);
}

//
function  tgroupid2cgroupid(tgroupid){
	if(tgroupid.substring(0,1)!="~") return;
	thewin	= document.getElementById("downloadIFR");
	if(thewin) thewin.src="tgroupid2cgroupid.so?tmpgroupid="+tgroupid;
}

//
function quickDown(cgroupid,title){
var isSetupToolBar=true;
try{
	var obj = new ActiveXObject("sogoutb.Detector");
	if(typeof(obj)!='object') {
		isSetupToolBar=false;	
	}
}catch(e){
		isSetupToolBar=false;
}
        if(!isSetupToolBar){
                open("downquick.so?groupid="+cgroupid+"&t="+title,"download","width=400,height=300");
        }else{
                window.downloadIFR.location="downquick.so?groupid="+cgroupid+"&t="+title;
	}
}
