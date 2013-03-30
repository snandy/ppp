/*******************************************************************************************************
 * UWA Data 封装一个具体的Widget
 ******************************************************************************************************/

UWA.Data = {

	/**
	 * 请求一个xml文档
	 * @param {String} url xml文件地址
	 * @param {Function} callback 回调方法，系统会自动把解析到的Xml Document对象作为第一个参数注入到回调方法中
	 **/
	getXml: function(url, callback) {
		this.request(url, {
			type: "xml",
			parameters: "ct=text%2Fxml",
			onComplete: callback
		});
	},
	
	/**
	 * 请求一个text文档
	 * @param {String} url text文件地址
	 * @param {Function} callback 回调方法，系统会自动把取得的text文本作为第一个参数注入到回调方法中
	 **/
	getText: function(url, callback) {
		this.request(url, {
			type: "text",
			onComplete: callback
		});
	},
	
	/**
	 * 请求一个json文档
	 * @param {String} url json文件地址
	 * @param {Function} callback 回调方法，系统会自动把解析出的json对象作为第一个参数注入到回调方法中
	 **/
	getJson: function(url, callback) {
		this.request(url, {
			type: "json",
			onComplete: callback
		});
	},

	/**
	 * 请求一个xml文档
	 * @param {String} url xml文件地址
	 * @param {Function} callback 回调方法，系统会自动把解析到的Xml Document对象作为第一个参数注入到回调方法中
	 * @param {Function} errorCallback 错误回调方法，系统会XmlHttp对象作为第一个参数注入到回调方法中
	 * @param {Boolean} isUseCache 是否使用cache
	 **/
	getModule: function(url, callback, errorCallback, isUseCache) {
		var request = {
			type: "xml",
			proxy: "moduler",
			onComplete: callback,
			onFailure: errorCallback
		}
		if (!isUseCache) request.parameters = "ca=0";
		this.request(url, request);
	},
	
	/**
	 * 暂时不支持
	 **/
	getFeed: function(url, callback) {
	},
	
	/**
	 * 发送一个Ajax Request
	 * @param {String} url 请求地址
	 * @param {Object} request 相关参数，其中包括的属性如下：
	 *		method: 方法，现在包括get（默认）和post
	 *		proxy: 协议，现在只支持ajax
	 *		type: 返回的数据类型，现在支持text（默认）、json和xml
	 *		parameters: 如果为post时，附带的参数
	 *		onComplete: 回调方法
	 **/
	request: function(url, request) {
		//	初始化request对象
		request = Object.extend({
			method: "get",
			proxy: "ajax",
			type: "text",
			parameters: ""
		}, request || {});
		if (typeof(request.onComplete) != "function") request.onComplete = function() {}
		
		/*
		//	初始化url
		if (UWA.Config[request.proxy] && UWA.Config[request.proxy] != "") {
			url = UWA.Config[request.proxy] + url + (url.match(/\?/) ? '&' : '?') + "_ow_c=" + new Date().getTime();
			//	url = UWA.Config[request.proxy] + url
		} else {
			url += (url.match(/\?/) ? '&' : '?') + "_ow_c=" + new Date().getTime();
		}
		*/
		var urlStr = UWA.Config[request.proxy];
		if (urlStr && urlStr != "") {
			url = urlStr + "?url=" + encodeURIComponent(url) + "&c=" + new Date().getTime();
		} else {
			url += (url.match(/\?/) ? '&' : '?') + "_ow_c=" + new Date().getTime();
		}
		
		if (!request.onFailure) request.onFailure = this.onFailure;
		request.onSuccess = request.onComplete;
		request.onComplete = null;
		
		//	根据不同的数据请求类型进行相应的操作
	    switch (request.type) {
	    	case "text":
	    		var callback = request.onSuccess;
	    		request.onSuccess = function(transport) {
	    			try {
	    				callback(transport.responseText);
    				} catch (e) {
    					UWA.log(e);
    				}
	    		}
	    		new Ajax.Request(url, request);
	    		break;
	    	case "json":
	    		var callback = request.onSuccess;
	    		request.onSuccess = function(transport) {
	    			try {
    					var data = eval("(" + transport.responseText + ")");
    					callback(data);
    				} catch (e) {
    					UWA.log(e);
    				}
	    		}
	    		new Ajax.Request(url, request);
	    		break;
	    	case 'xml':
	    		var callback = request.onSuccess;
	    		request.onSuccess = function(transport) {
	    			try {
	    				callback(transport.responseXML, transport);
    				} catch (e) {
    					UWA.log(e);
    				}
	    		}
	    		new Ajax.Request(url, request);
	    		break;
	    }
	},
	
	/**
	 * 加载失败后的处理方法
	 **/
	onFailure: function(transport) {
		UWA.log("status:" + transport.status + ";statusText:" + transport.statusText);
	}
}