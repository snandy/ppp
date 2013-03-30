/*******************************************************************************************************
 * UWA Widget Lib 其中存储所有已经加载的UWA Widget 类型
 ******************************************************************************************************/


/**
 * 管理已经加载的UWA Widget 类型
 **/
UWA.WidgetLib = {

	/**
	 * 存储所有已经加载的Widget类型，其为一个数组，每个元素为为这样一个对象：
	 *  	{
	 * 			path: "", 		//	widget 地址
	 * 			status: 0,		//	状态：0表示正在加载中，1表示加载成功，-1表示加载失败
	 * 			wrapper: null,	//	加载到的wrapper对象
	 * 			callbacks: [],	//	加载完成后的回调方法
	 * 		}
	 **/
	libs: [],
	
	/**
	 * 通过widget地址取得此Widget在用户临时库中的一个编号
	 * @param {String} path widget路径
	 * @return 此Widget在库中的编号，可以认为是一个类型的唯一编号，如果为-1时表示库中还不存在此widget
	 * @type Number
	 **/
	getWidgetClassId: function(path) {
		var pathLower = path.toLowerCase();
		var libs = this.libs;
		for (var i=0; i<libs.length; i++) {
			if (libs[i].path == pathLower) {
				return i;
			}
		}
		return -1;
	},

	/**
	 * 通过widget路径加载widget，加载完成后调用指定的回调方法
	 * @param {String} path widget路径
	 * @param {Function} callback 回调方法，系统会自动为此回调注入第一个参数为此widget的Widget Wrapper对象
	 * @param {Boolean} isUseCache 是否使用cache
	 **/
	getWidget: function(path, callback, isUseCache) {
		if (isUseCache) {
			var widgetLib = null;
			
			//	遍历查看是否存在此Widget类型
			var index = this.getWidgetClassId(path);
			if (index >= 0) {
				//	已经存在了widget的请求记录
				
				widgetLib = this.libs[index];
				switch (widgetLib.status) {
					case -1:	//	加载失败
						//	如果已经加载成功的话，那就取得加载好的对象
						widgetWrapper = widgetLib.wrapper;
						break;
					case 0:		//	正在加载
						//	如果没有加载成功的话，那就存入callback
						widgetLib.callbacks.push(callback);
						break;
					case 1:		//	加载成功
						//	如果已经加载成功的话，那就取得加载好的对象
						widgetWrapper = this.libs[index].wrapper;
						break;
				}
				/*
				if (this.libs[index].status == 1) {
					//	如果已经加载成功的话，那就取得加载好的对象
					widgetWrapper = this.libs[index].wrapper;
				} else {
					//	如果没有加载成功的话，那就存入callback
					this.libs[index].callbacks.push(callback);
				}
				*/
			} else {
				//	不存在此widget的请求记录
				
				//	在库中存入新的记录
				widgetLib = {
					path: path.toLowerCase(),
					status: 0,
					wrapper: null,
					callbacks: [callback]
				};
				this.libs.push(widgetLib);
			}
			
			if (widgetLib.status == 0) {
				//	没有的话，那就向服务器请求此Widget
				this.requestWidget(path);
			} else {
				//	存在此Widget，调用回调方法
				callback(widgetLib.wrapper);
			}
		} else {
			this.requestWidgetNC(path, callback);
		}
	},
	
	/**
	 * 通过一个路径加载一个widget类型
	 * @param {String} url widget路径
	 **/
	requestWidget: function(url) {
		/*
		if (UWA.Config["moduler"] && UWA.Config["moduler"] != "") {
			url = UWA.Config["moduler"] + encodeURIComponent(url);
		}
		*/
		UWA.Data.getModule(url, this.loadedWidgetXml.bind(this, url), this.loadFailure.bind(this, url), true);
	},
	
	/**
	 * 通过一个路径加载一个widget类型（不使用cache）
	 * @param {String} url widget路径
	 * @param {Function} callback 回调方法
	 **/
	requestWidgetNC: function(url, callback) {
		/*
		if (UWA.Config["moduler"] && UWA.Config["moduler"] != "") {
			url = UWA.Config["moduler"] + encodeURIComponent(url);
		}
		*/
		UWA.Data.getModule(url, this.loadedWidgetXmlNC.bind(this, url, callback), this.loadFailureNC.bind(this, url, callback), false);
	},
	
	/**
	 * 请求widget文件失败后的处理方法
	 * @param {String} path widget路径
	 * @param {XmlHttp} ajax XmlHttp对象
	 **/
	loadFailure: function(path, ajax) {
		var index = this.getWidgetClassId(path);
		if (index >= 0) {
			var widget = this.libs[index];
			widget.status = -1;
			widget.wrapper = null;
			var callbacks = widget.callbacks;
			while (callbacks.length > 0) {
				var callback = callbacks.pop();
				callback(widget.wrapper);
			}
		}
	},
	
	/**
	 * 加载到xml文件之后的回调方法
	 * @param {String} path widget路径
	 * @param {XmlDocument} xmlDoc 包含widget xml的xml document对象
	 * @param {XmlHttp} ajax xmlHttp对象
	 **/
	loadedWidgetXml: function(path, xmlDoc, ajax) {
		try {
			var wrapper = UWA.WidgetWrapper.getFromXml(xmlDoc, ajax);
		} catch (e) {
			UWA.log(e);
			return;
		}
		
		var index = this.getWidgetClassId(path);
		if (index >= 0) {
			wrapper.classId = index;
			var widget = this.libs[index];
			widget.status = 1;
			widget.wrapper = wrapper;
			var callbacks = widget.callbacks;
			while (callbacks.length > 0) {
				var callback = callbacks.pop();
				callback(wrapper);
			}
		}
	},
	
	/**
	 * 请求widget文件失败后的处理方法（不使用缓存）
	 * @param {String} path widget路径
	 * @param {Function} callback 回调方法
	 * @param {XmlHttp} ajax XmlHttp对象
	 **/
	loadFailureNC: function(path, callback, ajax) {
		callback(null);
	},
	
	/**
	 * 加载到xml文件之后的回调方法（不使用缓存）
	 * @param {String} path widget路径
	 * @param {Function} callback 回调方法
	 * @param {XmlDocument} xmlDoc 包含widget xml的xml document对象
	 * @param {XmlHttp} ajax xmlHttp对象
	 **/
	loadedWidgetXmlNC: function(path, callback, xmlDoc, ajax) {
		try {
			var wrapper = UWA.WidgetWrapper.getFromXml(xmlDoc, ajax);
		} catch (e) {
			UWA.log(e);
			return;
		}
		
		callback(wrapper);
	}
}