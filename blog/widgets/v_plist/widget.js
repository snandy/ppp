/******* User New Plist Widget **********/
//	Author: Jady
//	Created: 2007-06-14
//	Updated: 2007-06-14
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var v_plist = function(m_data, m_content, m_edit, w_path){
	
	//	通用的一些变量
	var userPassport = _xpt;
	var wdtData = null;
	var moreUrl = '';
	var defCover = Actions.imgPath + "defvideocover.gif";
	var wdtManageUrl = 'http://v.blog.sohu.com/passport';
	
	//	有关数据请求及回复的一些变量
	var wdtUrl = "http://v.blog.sohu.com/json/";
	var wdtService = "plist";
	var wdtVn = "1";
	var wdtVarfix = "VBlog." + wdtService;
	var wdtPlayVars = 'VBlog_' + wdtService;
	var size = 8;
	var listUrl = '';
	
	//	页面上的一些元素对象
	var outputEle = null;		//	内容区元素
	
	//	显示内容
	this.showContent = function() {
		outputEle.innerHTML = "";
		var str = '';
		var ids = [];
		if(wdtData && wdtData.length) {
			str += '<ul>';
			for(var i=0; i<wdtData.length; i++) {
				if (wdtData[i]) {
					var dataNow = wdtData[i];
					var title = dataNow.title;
					var covers = dataNow.cover.split(";");
					ids.push(dataNow.id);
					
					str += '\
						<li>\
							<div class="video_cover">\
							<a href="' + dataNow.url + '" target="_blank" title="' + title + '" alt="' + title + '">\
								<img src="' + (covers[0] || defCover) + '" />\
								<span class="v_play"></span>\
							</a>\
							</div>\
							<dl>\
								<dt><a href="' + dataNow.url + '" title="' + title + '" alt="' + title + '" target="_blank">' + title + '</a></dt>\
								<dd>' + App.Lang.v_play + '：<span id="VBlog_P_' + dataNow.id + '" name="VBlog_P_' + dataNow.id + '">(?)</span></dd>\
								<dd>' + App.Lang.v_favo + '：' + dataNow.favoriteCount + '</dd>\
							</dl>\
							<div class="more"><a href="' + dataNow.url + '" target="_blank">' + App.Lang.v_plistVideos + '</a></div>\
						</li>';
				}
			}
			str += '</ul>\
					<div class="more_more"><a href="' + listUrl + '" target="_blank">' + App.Lang.v_more + '</a></div>';
		} else {
			str = App.Lang.v_noVideoList;
		}
		outputEle.innerHTML = str;
		this.getPlayCount(ids);
	};
	
	/*******************************************
	 *	有关数据请求的一些方法
	 ******************************************/
	this.getPlayCount = function(ids) {
		if (ids && ids.length > 0) {
			var url = 'http://vstat.v.blog.sohu.com/dostat.do?method=getCardPlayCount&vc=' + ids.join("|") + "&n=" + this.getPlayJsonName();
			new LinkFile(url, {
				type: 'script',
				callBack: {
					variable: this.getPlayJsonName(),
					onLoad: this.loadedPlayData.bind(this)
			}});
		}
	}
	this.loadedPlayData = function() {
		var data = eval("(" + this.getPlayJsonName() + ")");
		for (var i=0; i<data.length; i++) {
			/*
			var element = $("VBlog_P_" + data[i].id);
			if (element) {
				element.innerHTML = data[i].count;
			}
			*/
			var elements = document.getElementsByName("VBlog_P_" + data[i].id);
			if (elements) {
				for (var ii =0; ii<elements.length; ii++) {
					elements[ii].innerHTML = data[i].count;
				}
			}
		}
	}
	this.clearCache = function() {
		var jsonName = this.getJsonName();
		try {
			eval(jsonName + "=null");
		} catch(e) {}
	}
	this.getJsonName = function() {
		return wdtVarfix + wdtVn;
	}
	this.getPlayJsonName = function() {
		return wdtPlayVars + wdtVn;
	}
	this.requestData = function(noCache) {
		if(!outputEle) this.initElement();
		outputEle.innerHTML = App.Lang.loadModuleData;
		
		var dataURL = this.getRequestUrl();
		if(noCache) {
			this.clearCache();
		}
		
		new LinkFile(dataURL, {
			type: 'script',
			noCache: noCache,
			callBack: {
				variable: this.getJsonName(),
				onLoad: this.loadedData.bind(this),
				onFailure: this.noData.bind(this)
		}});
	};
	this.loadedData = function(canRefresh) {
		var data = eval("(" + this.getJsonName() + ")");
		if (data.status == 1) {
			wdtData = data.data.list;
			listUrl = data.data.listUrl;
		} else if (data.status == 3) {
			outputEle.innerHTML = App.Lang.v_noVideoList;
		} else {
			outputEle.innerHTML = App.Lang.notWellFormed;
		}
		this.showContent();
		this.loaded();
	};
	this.noData = function() {
		outputEle.innerHTML = App.Lang.fileNotFound;
		this.loaded();
	};
	this.initialize = function() {
		this.requestData(App.Permit.editModule);
	};
	this.destroy = function() {
		if(outputEle) Element.remove(outputEle);
		m_content.innerHTML = "";
	};
	this.refresh = function() {
		this.requestData(true);
	};
	
	//	初始化页面上的对象
	this.initElement = function() {
		m_content.innerHTML = "";
		
		//	create the manage element if had permit
		if(App.Permit.editModule){
			var str = '<div style="text-align:right">' +
				'<a href="http://v.blog.sohu.com/s/normal" target="_blank">' +
				'<img src="'+ App.Actions.imgPath +'ico_videoUpload.gif" alt="'+ App.Lang.v_upload +'"align="absbottom" />' +
				App.Lang.v_upload +
				'</a> | ' +
				'<a href="' + wdtManageUrl + '" target="_blank">' + App.Lang.manage + '</a></div><hr size="1" />';
			m_content.innerHTML = str;
		}
		
		outputEle = document.createElement("div");
		outputEle.className = "container";
		m_content.appendChild(outputEle);
	}
	this.getRequestUrl = function() {
		var str = wdtUrl + wdtService + "*" + userPassport + "*" + size + "*0*" + wdtVn + ".html";
		return str;
	};
};
registerWidget("v_plist");