/******* Group Admin's groups Widget **********/
//	Author: Jady
//	Created: 2007-08-6
//	Updated: 2007-08-6
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var q_uadmingroups = function(m_data, m_content, m_edit, w_path){
	
	//	通用的一些变量
	var userPassport = _xpt;
	var wdtData = null;
	var moreUrl = '';
	
	//	有关数据请求及回复的一些变量
	var wdtUrl = "http://q.sohu.com/user/";
	var wdtService = "admin_groups";
	var wdtVarfix = "Q.user_" + wdtService;
	
	//	页面上的一些元素对象
	var outputEle = null;		//	内容区元素
	
	//	显示内容
	this.showContent = function() {
		outputEle.innerHTML = "";
		var str = '';
		
		if(wdtData.length) {
			str += '\
				<div class="q_manage">';
			
			for (var i=0; i<wdtData.length; i++) {
				var dataNow = wdtData[i];
				var ico = dataNow.ico;
				var title = dataNow.title;
				var urlStr = dataNow.url;
				var userCount = dataNow.userCount;
				var tag = dataNow.tag;
				var topics = dataNow.topics;
				
				str += '\
					<div class="groupCover">\
						<a href="' + urlStr + '" target="_blank" title="' + title + '" alt="' + title + '"><img class="groupIco" src="' + ico + '" title="' + title + '" alt="' + title + '" /></a>\
					</div>\
				    <div class="groupTitle">\
				    	<a href="' + urlStr + '" target="_blank" title="' + title + '" alt="' + title + '"><strong>' + title + '</strong></a>(<strong>' + userCount + '</strong>人)<br />\
				   		标签：<br />' + this.getTagStr(tag) + '\
				    </div>\
				    <div style="clear:both"></div>\
					<ul>';
				    				
				if (topics && topics.length) {
					str += '<li>最新更新：</li>';
					
					for (var j=0; j<topics.length; j++) {
						var topicNow = topics[j];
						var replyCount = topicNow.replyCount;
						var topicIco = topicNow.ico;
						var topicTitle = topicNow.title;
						var topicUrl = topicNow.url;
						var topicReplyTime = this.getFriendlyTime(topicNow.replyTime);
						var topicReplyUser = topicNow.replyUser;
						var topicUserUrl = topicNow.userUrl;
						
						str += '<li><table><tr><td valign="top"><img src="' + topicIco + '" /></td><td><a href="' + topicUrl + '" title="' + topicTitle + '" alt="' + topicTitle + '" target="_blank">' + topicTitle + '</a>&nbsp;' + (replyCount > 0 ? ('<span class="reply">回复:' + topicReplyTime + '&nbsp;<a href="' + topicUserUrl + '" title="' + topicReplyUser + '" alt="' + topicReplyUser + '" target="_blank">' + topicReplyUser + '</a></span>') : ('<span class="reply">发表:' + topicReplyTime + '</span>')) + '</td></tr></table></li>';
					}
				} else {
					str += '<li>无最新更新</li>';
				}
				
				str += '\
					</ul>\
					<div class="more"><a href="' + urlStr + '" target="_blank">查看更多>></a></div>';
			}
  
			str += '</div>';
		} else {
			str = App.Permit.editModule ? '搜狐圈子是搜狐博友 沟通交流 和 分享博客 的公共空间。马上去<a href="http://q.sohu.com/" target="_blank">建个圈子</a>吧！' : '用户没有管理任何<a href="http://q.sohu.com/" target="_blank">圈子</a>';
		}
		
		outputEle.innerHTML = str;
	};
	this.getFriendlyTime = function(time) {
		var now = new Date();
		var interval = now.getTime() - time;
			
		var minu = Math.floor(interval / (60 * 1000));
		var hour = Math.floor(minu / 60);
		var day = Math.floor(hour / 24);
		
		
		var str = '';
		if(day >= 1){
			str += day;
			str += '天';
		}
		
		if(hour < 48 && hour > 0 && (hour % 24) > 0){
			str += hour % 24;
	
			str += '小时';
		}
	        
		if(hour < 24){
			str += minu % 60;
			str += '分钟';
		}
		str += '前';
		if (minu <= 0) {
			str = '刚刚';
		}
		return str;
	}
	
	/*******************************************
	 *	有关数据请求的一些方法
	 ******************************************/
	this.clearCache = function() {
		var jsonName = this.getJsonName();
		try {
			eval(jsonName + "=null");
		} catch(e) {}
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
		try {
			var data = eval("(" + this.getJsonName() + ")");
			if (data != null) {
				wdtData = data;
				this.showContent();
			} else {
				this.errorData();
			}
		} catch(e) {
			this.errorData();
		}
		this.loaded();
	};
	this.noData = function() {
		outputEle.innerHTML = App.Lang.notWellFormed;
		this.loaded();
	};
	this.errorData = function() {
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
		
		outputEle = document.createElement("div");
		outputEle = m_content.appendChild(outputEle);
	}
	this.getJsonName = function() {
		return wdtVarfix;
	}
	this.getRequestUrl = function() {
		var str = wdtUrl + "!" + userPassport + "/" + wdtService + "!json";
		return str;
	}
	this.getTagStr = function(tag) {
		var str = '';
		var tags = tag.split(" ");
		for (var i=0; i<tags.length; i++) {
			if (i > 0) str += '&nbsp;';
			str += '<a href="http://tag.q.sohu.com/page/tag.do?action=groups&id=' + tags[i] + '" target="_blank" title="' + tags[i] + '" alt="' + tags[i] + '">' + tags[i] + '</a>';
		}
		return str;
	}
};
registerWidget("q_uadmingroups");