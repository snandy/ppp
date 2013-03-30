/******* Music New Songs Widget **********/
//	Author: Jady
//	First Created: 2006-12-06
//	Last Update: 2006-12-06
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var msc_newsongs = function(m_data, m_content, m_edit, w_path){
	
	var wdtUrl = "http://oem.d.sogou.com/musicblog/ns.js"; //	要请求的信息的地址
	var userPassport = "";
	var wdtDataName = "new_songs";		//	需要取得的变量名称
	var wdtData;				//	需要取得的变量
	
	var defaultLogoUrl = Actions.imgPath + "defaultalbum.gif";
	var allSongsUrl = setBadge("http://mp3.sogou.com/sogou_phb/bangdan_new.html");							//	“查看全部”的链接地址
	var queryUrl = "http://mp3.sogou.com/music.so?query=";
	
	var outputEle;
	
	this.showContent = function() {
		var str = '';
		
		//	添加表头
		str += '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="newsong_list"><tr><td class="title_css" width=45%><strong>歌曲</strong></td><td class="singer_css" width=25%><strong>歌手</strong></td><td width=15%><strong>试听</strong></td><td width=15%><strong>下载</strong></td></tr>';
		
		var songs = wdtData;
		var songCount = songs.length;
		
		for(var i=0;i<songCount;i++)
		{
			var songNow = songs[i];
			var singer_url = setBadge(songNow["singer_url"]);
			var title = songNow["title"];
			//	var titleurl = setBadge(queryUrl + escape(title));
			var titleurl = songNow["title_url"];
			var singer = songNow["singer"];
			var listen_url = setBadge(songNow["listen_url"]);
			var down_url = setBadge(songNow["down_url"]);
			
			str += '<tr><td><div class="title_css"><a href="' + titleurl + '" target="_blank" title="' + title + '">' + title + '</a></div></td><td><div class="singer_css"><a href="' + singer_url + '" target="_blank" title="' + singer + '">' + singer + '</a></div></td><td><a href="' + listen_url + '" target="_blank" onclick="window.open(\'' + listen_url + '\',\'_blank\',\'width=470,height=590,toolbar=no,location=no,menubar=no\');return false;"><img src="' + Actions.imgPath + 'ico_earphone.gif"  style="width:14px; height:11px;" border="0" alt="试听" title="试听"  /></a></td><td><a href="' + down_url + '" target="_blank" onclick="window.open(\'' + down_url + '\',\'_blank\',\'width=350,height=395,toolbar=no,location=no,menubar=no\');return false;"><img src="' + Actions.imgPath + 'ico_download.gif" border="0" title="下载" alt="下载" /></a></td></tr>';
		}
		
		//	添加表尾
		str += '</table>';
		
		//	显示全部链接按钮
		str += '<div style="clear:both;"><br /></div><div style="text-align:right"><a href="' + allSongsUrl + '" target="_blank">查看更多</a></div>';
		
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
			}
		});
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
	function setBadge(url) {
		var str = url + (url.match(/\?/)?'&':'?') + "pid=27022500";
		return str;
	}
};
registerWidget("msc_newsongs");