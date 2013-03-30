/******* Music Recommends Widget **********/
//	Author: Jady
//	First Created: 2006-12-06
//	Last Update: 2006-12-06
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var msc_recommends = function(m_data, m_content, m_edit, w_path){
	
	var recommendUrl = "http://mbox.sogou.com/call.so?a=sa";	//	推荐地址
	var wdtUrl = "http://oem.d.sogou.com/musicblog/ra.js"; //	要请求的信息的地址
	var userPassport = "";
	var wdtDataName = "recommand_albums";		//	需要取得的变量名称
	var wdtData;				//	需要取得的变量
	
	var defaultLogoUrl = Actions.imgPath + "defaultalbum.gif";
	var moreUrl = setBadge("http://mp3.sogou.com/sogou_phb/bangdan_star.jsp");	//	查看更多链接地址
	
	var outputEle;
	
	this.showContent = function() {
		var str = '';
		
		var albums = wdtData;
		var albumCount = albums.length;
		str += '<div class="sp">';
		for(var i=0;i<albumCount;i++)
		{
			var albumNow = albums[i];
			
			var star = albumNow["star"];
			var star_url = setBadge(albumNow["star_url"]);
			var title = albumNow["title"];
			var category = albumNow["category"];
			var style = albumNow["style"];
			var intro = albumNow["intro"];
			var listen_url = setBadge(albumNow["listen_url"]);
			var publishtime = albumNow["publishtime"].substr(0,10);
			var photo = (albumNow["photo"]=="")?defaultLogoUrl:albumNow["photo"];
			var disp_url = setBadge(albumNow["disp_url"]);
			var language = albumNow["language"];
			var company = albumNow["company"];
			var star_id = albumNow["id"];
			
			/*
			str += '<div class="sp_block_style"><div class="imgbox100index"><a href="' + disp_url + '" target="_blank"><img title="' + title + '" alt="' + title + '" src="' + photo + '" /></a></div><div class="sp_zhuanji_info"><dl><dt><div class="alumbi_title_css"><a href="' + disp_url + '" target="_blank" title="' + title + '">' + title + '</a></div></dt><dd>类别: ' + category + '</dd><dd><div class="alumbi_title_css">歌手: <a href="' + star_url + '" target="_blank" title="' + star + '">' + star + '</a></div></dd><dd>' + publishtime + '</dd><dd><a href="' + disp_url + '" target="_blank" title="专辑介绍">专辑介绍</a>&nbsp;<a href="#" target="_blank" onclick="window.open(\'' + listen_url + '\',\'_blank\',\'width=470,height=590,toolbar=no,location=no,menubar=no\');return false;" title="试听">试听</a></dd></dl></div></div>';
			*/
			
			str += '<div class="sp_block_style"><div class="imgbox100index"><a href="' + disp_url + '" target="_blank"><img title="' + title + '" alt="' + title + '" src="' + photo + '" /></a></div><div class="sp_zhuanji_info"><dl><dt><div class="alumbi_title_css"><a href="' + disp_url + '" target="_blank" title="' + title + '">' + title + '</a></div></dt><dd><a href="' + listen_url + '" target="_blank" title="试听" onclick="window.open(\'' + listen_url + '\',\'_blank\',\'width=470,height=590,toolbar=no,location=no,menubar=no\');return false;" style="line-height: 150%;"><img src="' + Actions.imgPath + 'ico_earphone.gif" border="0" alt="试听" title="试听"  style="width:14px; height:11px;" />&nbsp;试听</a></dd><dd>类别: ' + category + '</dd><dd><div class="alumbi_title_css">歌手: <a href="' + star_url + '" target="_blank" title="' + star + '">' + star + '</a></div></dd><dd>' + publishtime + '</dd><dd><a href="' + this.getRecommendUrl(star_id, title, star) + '" onclick="' + this.getRecommendOpen(star_id, title, star) + '" target="_blank" title="推荐给朋友" style="line-height: 150%;">推荐给朋友</a></dd></dl></div></div>';
		}
		str += '</div>';
		
		//	显示全部链接按钮
		str += '<div style="clear:both;"></div><div style="text-align:right"><a href="' + moreUrl + '" target="_blank">查看更多</a></div>';
		
		outputEle.innerHTML = str;
	};
	
	
	this.initElement = function() {
		//	clear content
		m_content.innerHTML = "";
		
		//	create content element
		outputEle = document.createElement("div");
		m_content.appendChild(outputEle);
	};
	this.requestData = function(noCache) {
		var dataURL = this.getRequestUrl();
		m_content.innerHTML = App.Lang.loadModuleData;
		
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
		this.initElement();
		this.showContent();
		this.loaded();
	};
	this.noData = function() {
		this.initElement();
		outputEle.innerHTML = App.Lang.fileNotFound;
		this.loaded();
	};
	this.initialize = function() {
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
	this.formatStr = function (str, length) {
		if(typeof(length) == "number" && length > 0) str = str.substr(0, length);
		str = str.replace(/\r|\n/gi, "").replace(/"/g, "&quot;");
		return str;
	};
	this.getRequestUrl = function() {
		return setBadge(wdtUrl);
	};
	this.getRecommendUrl = function(plid, title, singer) {
		var str = recommendUrl + "&id=" + plid + "&at=" + title.replace(/&/g, "%26").replace(/ /g, "%20") + "&singer=" + singer;
		return setBadge(str);
	};
	this.getRecommendOpen = function(plid, title, singer) {
		var str = "window.open('" + this.getRecommendUrl(plid, title, singer) + "', 'r', 'toolbar=no,location=no,directories=no,menubar=no,resizable=no,status=yes,scrollbars=no,width=516,height=400,left=100,top=10'); return false;";
		return str;
	};
	function setBadge(url) {
		var str = url + (url.match(/\?/)?'&':'?') + "pid=27022500";
		return str;
	}
};
registerWidget("msc_recommends");