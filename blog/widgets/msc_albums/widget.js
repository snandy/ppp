/******* Music Albums Widget **********/
//	Author: Jady
//	First Created: 2006-12-05
//	Last Update: 2006-12-06
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var msc_albums = function(m_data, m_content, m_edit, w_path){
	
	var recommendUrl = "http://mbox.sogou.com/call.so?a=a";		//	待写：推荐地址
	var wdtUrl = "http://oem.d.sogou.com/musicblog/data.jsp";
	var wdtUrlType = "al";
	var userPassport = _ept;	
	var fullUserPassport = "";
	var wdtDataName = "album_list";
	var wdtData;
	
	var showCount = 10;								//	显示的专辑数量
	var defaultLogoUrl = Actions.imgPath + "defaultalbum.gif";
	var wdtManageUrl = "http://mbox.sogou.com/mbox.so";	//	管理的地址
	var allAlbumsUrl = "http://mbox.sogou.com/mbox.so?uid=";	//	“查看全部”的链接地址
	
	var outputEle;
	
	this.initParams = function() {
		this.setPassport();
		wdtManageUrl = setBadge(wdtManageUrl);
		allAlbumsUrl = setBadge(allAlbumsUrl + fullUserPassport);
	};
	this.showContent = function() {
		var str = '';
		
		//	首先判断是否存在此用户或此用户是否拥有任何专辑
		if(typeof(wdtData.uid) == "string" && wdtData.uid != "") {
		
			var albums = wdtData.album_list;
			var albumCount = albums.length;
			var showLength = Math.min(showCount, albumCount);
			var valiCount = 0;
			str += '<div class="sp">';
			for(var i=albumCount-1; i>=0; i--)
			{
				var albumNow = albums[i];
				if(albumNow["is_public"]) {
					if(++valiCount > showLength) break;
					var plid = albumNow["plid"];			//	专辑编号
					var title = albumNow["title"];			//	专辑名称
					var intro = (albumNow["intro"]=="")?App.Lang.mscNoIntro:albumNow["intro"];			//	专辑简介
					var listen_url = setBadge(albumNow["listen_url"]);	//	试听地址
					var created_time = this.getDateStr(albumNow["created_time"]);	//	创建时间
					//	var saveCount = albumNow["times"];	//	收藏次数
					var disp_url = setBadge(albumNow["disp_url"]);	//	专辑地址
					var logo = (albumNow["logo"]=="")?defaultLogoUrl:albumNow["logo"];			//	专辑封面
					str += '<div class="sp_block_style"><div class="imgbox100index"><a href="' + disp_url + '" target="_blank"><img title="' + title + '" alt="' + title + '" src="' + logo + '" /></a></div><div class="sp_zhuanji_info"><dl><dt><div class="alumbi_title_css"><a href="' + disp_url + '" target="_blank" title="' + title + '">' + title + '</a></div></dt><dd><a href="' + listen_url + '" target="_blank" title="试听" onclick="window.open(\'' + listen_url + '\',\'_blank\',\'width=470,height=590,toolbar=no,location=no,menubar=no\');return false;" style="line-height: 150%;"><img src="' + Actions.imgPath + 'ico_earphone.gif" border="0" alt="试听" title="试听" style="width:14px; height:11px;" />&nbsp;试听</a></dd><dd style="line-height:130%;">' + created_time + '</dd><dd><a href="' + this.getRecommendUrl(plid, title) + '" onclick="' + this.getRecommendOpen(plid, title) + '" target="_blank" title="推荐给朋友" style="line-height: 150%;">推荐给朋友</a></dd></dl></div></div>';
				}
			}
			str += "</div>";
			
			//	显示全部链接按钮
			str += '<div style="clear:both;"></div><div style="text-align:right"><a href="' + this.getMoreAlbumsUrl() + '" target="_blank">查看更多</a></div>';
		} else {
			if(App.Permit.editModule) {
				str += App.Lang.mscNoInit;
			} else {
				str += App.Lang.mscNoInitForUser;
			}
		}
		
		outputEle.innerHTML = str;
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
		var dataURL = this.getRequestUrl();
		if(App.Permit.editModule){
			dataURL = dataURL + "&o=true&ca=" + timeStamp();
		}
		outputEle.innerHTML = App.Lang.loadModuleData;
		
		//	send request to get data
		new LinkFile(dataURL, {
			type: 'script',
			noCache: noCache,
			callBack: {
				variable: wdtDataName,
				onLoad: this.loadedData.bind(this),
				onFailure: this.noData.bind(this)
			}});
	};
	this.loadedData = function() {
		wdtData = window[wdtDataName];
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
		this.initElement();
		this.requestData();
	};
	this.destroy = function() {
		Element.remove(outputEle);
		m_content.innerHTML = "";
	};
	this.refresh = function() {
		window[wdtDataName] = null;
		this.requestData(true);
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
		var str = wdtUrl + "?a=" + wdtUrlType + "&uid=" + userPassport;
		return setBadge(str);
	};
	this.getMoreAlbumsUrl = function() {
		var str = allAlbumsUrl + fullUserPassport;
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
registerWidget("msc_albums");