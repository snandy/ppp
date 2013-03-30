/******* Group User Profile Widget **********/
//	Author: Jady
//	Created: 2007-08-6
//	Updated: 2007-08-6
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var q_ushow = function(m_data, m_content, m_edit, w_path){
	
	//	通用的一些变量
	var userPassport = _xpt;
	var wdtData = null;
	var moreUrl = '';
	var manageUrl = 'http://q.sohu.com/passport';
	
	//	有关数据请求及回复的一些变量
	var wdtUrl = "http://q.sohu.com/user/";
	var wdtService = "show";
	var wdtVarfix = "Q.user_" + wdtService;
	var lifeUrl = 'http://ana.q.sohu.com/qget.js';
	var lifeVn = '';
	var userId = '';
	
	//	页面上的一些元素对象
	var outputEle = null;		//	内容区元素
	
	//	显示内容
	this.showContent = function() {
		outputEle.innerHTML = "";
		
		if (wdtData.id) { 
			userId = wdtData.id;
			var ico = wdtData.ico;
			var url = wdtData.url;
			//	var manageUrl = wdtData.manageUrl;
			var nick = wdtData.nick;
			var integral = wdtData.integral;
			var honor = wdtData.honor;
			
			var str = '\
				<div id="q_profile">\
					' + (App.Permit.editModule ? ('<div class="manage"><a href="' + manageUrl + '" target="_blank">管理</a></div>') : '') + '\
					<div class="blogCard"><a target="_blank" href="' + url + '"><img class="blogIco" alt="' + nick + '" title="' + nick + '" src="' + ico + '" width="48" height="48" /></a></div>\
					<ul class="blogStatus">\
						<li class="nick">昵称：<a href="' + url + '" target="_blank">' + nick + '</a></li>\
						<li class="point">积分：' + integral + '</li>\
						<li class="life">体力：<span id="q_ushow_' + this.id + '" class="bloggerLife"></span></li>\
						<li class="title">头衔：' + honor + '</li>\
					</ul>\
					<div class="more"><a href="' + url + '" target="_blank">查看详细档案>></a></div>\
				</div>';
			
			outputEle.innerHTML = str;
			
			this.requestLife();
		} else {
			outputEle.innerHTML = App.Permit.editModule ? '搜狐圈子是搜狐博友 沟通交流 和 分享博客 的公共空间。马上去<a href="http://q.sohu.com/login/activation.do" target="_blank">激活圈子</a>吧！' : '用户还未激活<a href="http://q.sohu.com/" target="_blank">圈子</a>';
		}
	};
	this.requestLife = function() {
		var url = this.getLifeUrl();
		var vn = this.getLifeName();
		new LinkFile(url, {
								type: 'script',
								noCache: true,
								callBack: {
									variable: vn,
									onLoad: this.getLife.bind(this),
									onFailure: function() {}
								}});
	}
	this.getLife = function() {
		try {
			var data = eval("(" + this.getLifeName() + ")");
			$("q_ushow_" + this.id).innerHTML = data[userId];
		} catch(e) {}
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
	};
	this.getLifeName = function() {
		return 'Q.ana.user_lv_' + lifeVn;
	}
	this.getLifeUrl = function() {
		lifeVn = timeStamp();
		var str = lifeUrl + '?id=' + userId + '&type=1&flag=1&vn=' + lifeVn;
		return str;
	};
};
registerWidget("q_ushow");