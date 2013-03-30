/*******************************************************************************************************
 * UWA Widget
 ******************************************************************************************************/
 
/**
 * 提供给用户使用的Widget对象
 * @param {UWA.Module} module 包含widget的符合App Widget对象要求的、承载uwa widget的一个app Widget。
 **/
/*
UWA.Widget = function(module) {
	this._module = module;
	this.body = this._module.body;
}
*/
/**
 * 提供给用户使用的Widget对象
 **/
UWA.Widget = function() {
}

/*---------------------  为实现相关功能，不需要提供给开发者的方法  ---------------------*/
/**
 * 初始化方法
 * @param {String} title 标题
 * @param {String} body 默认内容部分显示的html
 * @param {Array} scripts widget所包含的所有script
 **/
UWA.Widget.prototype.initialize = function(title, body, scripts) {
	//	初始化script
	if (UWA.Config.fileInPage) {
		//	如果是单独存在的模式，那就直接读取相关的属性
		Object.extend(this, widget);
		widget = this;
	} else {
		this.setScripts(scripts);
	}
	
	//	设置相关初始化内容
	this.setTitle(title);
	this.setBody(body);
	
	//	触发onLoad事件
	//	this.onLoad();
}

/**
 * 设置此Widget的所有用到的script
 * @param {Array} scripts 此widget中包含的所有script
 **/
UWA.Widget.prototype.setScripts = function(scripts) {
	var widget = this;
	if (scripts && scripts.length && scripts.length > 0) {
		for (var i=0; i<scripts.length; i++) {
			//	try {
				eval(scripts[i]);
			//	} catch (e) {}
		}
	}
}

/*---------------------  UWA 要求的需要由用户重载的事件  ---------------------*/

/**
 * widget初始化事件，须由用户重载
 **/
/*
UWA.Widget.prototype.onLoad = function() {
}
*/

/**
 * widget刷新事件，须由用户重载
 **/
/*
UWA.Widget.prototype.onRefresh = function() {
}
*/

/**
 * 暂时不支持
 **/
UWA.Widget.prototype.onResize = function() {
}
UWA.Widget.prototype.onSearch = function() {
}
UWA.Widget.prototype.onResetSearch = function() {
}
UWA.Widget.prototype.onKeyboardAction = function() {
}

/*---------------------  UWA 要求的供用户使用的方法  ---------------------*/

/**
 * 向body中添加内容
 * @param {StringOrElement} content 要添加的内容，如果为字符串，那就将其放到div中，然后添加到body对象最后边，如果为一个对象，那就直接将其添加到body对象的最后边
 **/
UWA.Widget.prototype.addBody = function(content) {
	this.body.addContent(content);
}

/**
 * 创建一个临时对象，但是这个对象会支持Element API
 * @param {String} tagName 需要创建的对象的标签名称
 * @return 新创建的对象
 * @type Element
 **/
UWA.Widget.prototype.createElement = function(tagName) {
	if (tagName == "script") return false;
	var el = document.createElement(tagName);
	return UWA.$element(el);
}

/**
 * 取得某个参数设置项的值
 * @param {String} name 参数设置项的名称
 * @return 参数设置项的值
 * @type ANY
 **/
UWA.Widget.prototype.getValue = function(name) {
	/*
	return this._module.getRef(name);
	*/
}

/**
 * 在新窗口打开一个链接
 * @param {String} url 链接地址
 **/
UWA.Widget.prototype.openURL = function(url) {
	window.open(url);
}

/**
 * 向widget中添加内容
 * @param {String} content 要添加到widget显示区域的内容，必须为一个有效的html片段
 **/
UWA.Widget.prototype.setBody = function(content) {
	this.body.innerHTML = content;
}

/**
 * 设置标题
 * @param {String} title 标题
 **/
UWA.Widget.prototype.setTitle = function(title) {
	/*
	this._module.setTitle(title);
	*/
}

/**
 * 设置某个参数设置项的值
 * @param {String} name 参数设置项的名称
 * @param {ANY} value 参数设置项的值
 **/
UWA.Widget.prototype.setValue = function(name, value) {
	/*
	this.setRef(name, value);
	*/
}

/**
 * 向控制台中进行日志记录
 * @param {Object} obj 记录项
 **/
UWA.Widget.prototype.log = function(obj) {
	/*
	this._module.log(obj);
	*/
}

/**
 * 设置自动刷新时间
 * @param {Number} delay 刷新间隔，以秒为单位
 **/
UWA.Widget.prototype.setAutoRefresh = function(delay) {
}

/**
 * 暂时不支持
 **/
UWA.Widget.prototype.setUnreadCount = function(count) {
}
UWA.Widget.prototype.setSearchResultCount = function(count) {
}