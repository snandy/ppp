/******* Music Album Widget **********/
//	Author: Jady
//	First Created: 2006-12-06
//	Last Update: 2009-08-05
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var msc_album = function(m_data, m_content, m_edit, w_path){
	
	var recommendUrl = "http://mbox.sogou.com/call.so?a=a";	//	推荐地址
	var wdtUrl = "http://oem.d.sogou.com/musicblog/data.jsp"; //	要请求的信息的地址
	var wdtUrlType = "sl";
	var userPassport = _ept;
	var fullUserPassport = "";
	var wdtDataName = "music_list_";		//	需要取得的变量名称
	
	var wdtEditUrlType = "al";
	var wdtEditName = "album_list";		//	编辑中需要取得的变量名称
	
	var defaultLogoUrl = Actions.imgPath + "defaultalbum.gif";
	var wdtManageUrl = "http://mp3.sogou.com/mbox/mbox.so";		//	管理的地址
	var queryUrl = "http://mp3.sogou.com/music.so?query=";
	
	//	在此处定义本widget需要的变量
	var pid = "";
	
	//	判断是否需要进行数据初始化（也就是说是否需要用户先进行设置）
	var needConfig = true;
	
	var outputEle;				//	内容区对象
	var editEle;				//	编辑区对象
	var wdtData;				//	内容区请求数据的返回变量
	var wdtEdit;				//	编辑区请求数据的返回变量
	
	
	this.initParams = function() {
		this.setPassport();
		wdtManageUrl = setBadge(wdtManageUrl);
		if(typeof(m_data) == "object")
		{
			pid = m_data.pid;
			if(typeof(m_data.title) == "string") this.setTitle(m_data.title);
			
			needConfig = false;
		}
	};
	this.showContent = function() {
		var str = '';
		
		var album = wdtData;
		if(album["is_public"]) {
			var plid = album["plid"];
			var title = album["title"];
			var intro = (album["intro"]=="")?App.Lang.mscNoIntro:album["intro"];
			var listen_url = setBadge(album["listen_url"]);
			var created_time = this.getDateStr(album["created_time"]);
			var disp_url = setBadge(album["disp_url"]);
			var logo = (album["logo"]=="")?defaultLogoUrl:album["logo"];
			var music_list = album["music_list"];
			//	var saveCount = album["times"];	//	收藏次数
			
			this.setTitle(this.formatStr(title));
			
			var musicCount = music_list.length;
			
			str += '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="sp_block_style"><tr><td rowspan="3" class="imgbox100index_td"><div class="imgbox100index"><a href="' + disp_url + '" target="_blank"><img title="' + title + '" alt="' + title + '" src="' + logo + '" /></a></div></td><td><div class="alumbi_title_css"><a href="' + listen_url + '" target="_blank" onclick="window.open(\'' + listen_url + '\',\'_blank\',\'width=470,height=590,toolbar=no,location=no,menubar=no\');return false;"><img src="' + Actions.imgPath + 'ico_earphone.gif" border="0"  style="width:14px; height:11px;" alt="试听" title="试听"  />&nbsp;试听</a></div></td></tr><tr><td class="alumbi_intro_css">专辑简介:</td></tr><tr><td valign="top"><div class="sp_zhuanji_info">' + intro + '</div></td></tr><tr><td colspan="2" style="line-height: 150%;padding-top: 2px;">出品时间: ' + created_time + '</td></tr><tr><td colspan="2" style="line-height: 150%;"><a href="' + this.getRecommendUrl(plid, title) + '" onclick="' + this.getRecommendOpen(plid, title) + '" style="line-height: 150%;" target="_blank">推荐给朋友</a></td></tr></table>';
			
			if(musicCount == 0) {
				if(App.Permit.editModule) {
					str += App.Lang.mscNoSongs;
				} else {
					str += App.Lang.mscNoSongsForUser;
				}
			} else {
				
				str += '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="newsong_list"><tr><td class="title_css" width=45%><strong>歌曲</strong></td><td class="singer_css" width=25%><strong>歌手</strong></td><td width=15%><strong>试听</strong></td><td width=15%><strong>下载</strong></td></tr>';
				for(var i=musicCount-1;i>=0;i--)
				{
					var songNow = music_list[i];
					var ssinger_url = setBadge(songNow["singer_url"]);
					var stitle = songNow["title"];
					//	var stitleurl = setBadge(queryUrl + escape(stitle));
					var stitleurl = songNow["title_url"];
					var ssinger = songNow["singer"];
					var slisten_url = setBadge(songNow["listen_url"]);
					var sdown_url = setBadge(songNow["down_url"]);
					
					str += '<tr><td><div class="title_css"><a href="' + stitleurl + '" target="_blank" title="' + stitle + '">' + stitle + '</a></div></td><td><div class="singer_css"><a href="' + ssinger_url + '" target="_blank" title="' + ssinger + '">' + ssinger + '</a></div></td><td><a href="' + slisten_url + '" target="_blank"><img src="' + Actions.imgPath + 'ico_earphone.gif" onclick="window.open(\'' + slisten_url + '\',\'_blank\',\'width=470,height=590,toolbar=no,location=no,menubar=no\');return false;" alt="试听" title="试听" /></a></td><td><a href="' + sdown_url + '" target="_blank" onclick="window.open(\'' + sdown_url + '\',\'_blank\',\'width=428,height=372,toolbar=no,location=no,menubar=no\');return false;"><img src="' + Actions.imgPath + 'ico_download.gif" alt="下载" title="下载" /></a></td></tr>';
				}
				str += '</table>';
			}
		} else {
			if(App.Permit.editModule) {
				str += App.Lang.mscNotPublic;
			} else {
				str += App.Lang.mscNotPublicForUser;
			}
		}

		outputEle.innerHTML = str;
	};
	//	--------------------  edit modify functions  --------------------
	this.initEditElements = function() {
		m_edit.innerHTML = "";
		editEle = document.createElement("div");
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="77px">'+ App.Lang.mscAlbums +': </td>';
		str += '<td><select name="wdtAlbumId" style="width:115px;"><option value="0">'+ App.Lang.loading +'</option></select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		editEle.innerHTML = str;
		
		m_edit.appendChild(editEle);
		
		this.wdtAlbumIdIpt = editEle.firstChild.rows[0].cells[1].firstChild;
		
		this.saveBtn = editEle.firstChild.rows[1].cells[1].firstChild;
		this.eventSaveData = this.onEditSave.bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
		
		setTimeout(this.requestEditData.bind(this,true), 10);
	};
	this.showEditContent = function() {
		var str = '';
		str += '<select name="wdtAlbumId" style="width:115px;">';
		var albums = wdtEdit.album_list;
		for(var i=albums.length-1;i>=0;i--)
		{
			if(albums[i]["is_public"]) {
				str += '<option value="' + albums[i].plid + '" ' + (albums[i].plid == pid?'selected="selected"':'') + '>' + albums[i].title.unescapeHTML() + '</option>';
			}
		}
		str += '</select>';
		var tmpElm = this.wdtAlbumIdIpt.parentNode;
		tmpElm.innerHTML = str;
		this.wdtAlbumIdIpt = tmpElm.firstChild;
	};
	this.onEditSave = function(e) {
		if(!this.wdtAlbumIdIpt || this.wdtAlbumIdIpt.value == "0" || this.wdtAlbumIdIpt.value == pid) {
			this.closeEdit();
			return;
		}
		
		pid = this.wdtAlbumIdIpt.value;
		var title = this.wdtAlbumIdIpt.options[this.wdtAlbumIdIpt.selectedIndex].text;
		var data = {
			pid: pid,
			title: title
		};
		
		this.save(data);
		window[wdtEditName] = null;
		this.requestData();

	};
	
	
	this.initElement = function() {
		//	clear content
		m_content.innerHTML = "";
		
		//	create the manage element if had permit
		if(App.Permit.editModule){
			var str = '<div style="text-align:right"><a href="' + wdtManageUrl + '" target="_blank">' + App.Lang.manage + '</a></div><hr />';
			m_content.innerHTML = str;
		}
		
		//	create content element
		outputEle = document.createElement("div");
		m_content.appendChild(outputEle);
	};
	this.requestData = function(noCache) {
		if(!outputEle) this.initElement();
		outputEle.innerHTML = App.Lang.loadModuleData;
		
		var dataURL = this.getRequestUrl();
		if(App.Permit.editModule){
			dataURL += "&o=true&ca=" + timeStamp();
		}
		
		//	send request to get data
		new LinkFile(dataURL, {
			type: 'script',
			noCache: noCache,
			callBack: {
				variable: wdtDataName+pid,
				onLoad: this.loadedData.bind(this),
				onFailure: this.noData.bind(this)
			}});
	};
	this.loadedData = function(canRefresh) {
		wdtData = window[wdtDataName+pid];
		//	this.initElement();
		this.showContent();
		this.loaded();
	};
	this.noData = function() {
		//	this.initElement();
		outputEle.innerHTML = App.Lang.fileNotFound;
		this.loaded();
	};
	this.initialize = function() {
		this.initParams();
		if(needConfig) {
			m_content.innerHTML = App.Permit.editModule?App.Lang.notInitAlbum:App.Lang.hasNotSetParm;
		} else {
			this.initElement();
			this.requestData();
		}
	};
	this.destroy = function() {
		if(outputEle) Element.remove(outputEle);
		m_content.innerHTML = "";
	};
	this.refresh = function() {
		window[wdtDataName+pid] = null;
		this.requestData(true);
	};
	
	//	--------------------  edit base functions  --------------------
	this.edit = function() {
		this.initEditElements();
	};
	this.requestEditData = function(noCache) {
		//	send request to get data
		var dataUrl = this.getEditRequestUrl();
		new LinkFile(dataUrl, {
			type: 'script',
			noCache: noCache,
			callBack: {
				variable: wdtEditName,
				onLoad: this.loadEditData.bind(this),
				onFailure: this.noEditData.bind(this)
			}});
	};
	this.noEditData = function() {
		m_edit.innerHTML = App.Lang.fileNotFound;
	};
	this.loadEditData = function() {
		wdtEdit = window[wdtEditName];
		this.showEditContent();
	};
	this.getDateStr = function (utc, mark) {
		if(typeof(mark) == "undefined") mark = "-";
		var date = new Date(utc);
		var dateStr = date.getFullYear() + mark + (date.getMonth()+1) + mark + date.getDate();
		return dateStr;
	};
	this.formatStr = function (str, length) {
		if(typeof(length) == "number" && length > 0) str = str.substr(0, length);
		str = str.replace(/\r|\n/gi, "").replace(/"/g, "&quot;");
		return str;
	};
	this.getRequestUrl = function() {
		var str = wdtUrl + "?a=" + wdtUrlType + "&var_name=" + pid + "&plid=" + pid;
		return setBadge(str);
	};
	this.getEditRequestUrl = function() {
		var str = wdtUrl + "?a=" + wdtEditUrlType + "&uid=" + userPassport;
		return setBadge(str);
	};
	this.setPassport = function() {
		var tempStr = unescape(_musicbox_data);
		var tempObj = tempStr.toQueryParams();
		fullUserPassport = tempObj.uid;
	};
	this.getRecommendUrl = function(plid, title) {
		var str = recommendUrl + "&plid=" + plid + "&at=" + title.replace(/&/g, "%26").replace(/ /g, "%20") + "&uid=" + fullUserPassport;
		return setBadge(str);
	};
	this.getRecommendOpen = function(plid, title) {
		var str = "window.open('" + this.getRecommendUrl(plid, title) + "', 'r', 'toolbar=no,location=no,directories=no,menubar=no,resizable=no,status=yes,scrollbars=no,width=516,height=400,left=100,top=10'); return false;";
		return str;
	};
	function setBadge(url) {
		var str = url + (url.match(/\?/)?'&':'?') + "pid=27022500";
		return str;
	}
};
registerWidget("msc_album");