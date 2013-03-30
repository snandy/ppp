/*******************************************************************************************************
 * UWA Widget Wrapper 封装一个具体的Widget
 ******************************************************************************************************/

UWA.WidgetWrapper = function(isPrivate) {
	this._from = "";
	this._xml = null;
	this._obj = null;
	this.classId = 0;
	
	this.isPrivate = (typeof(isPrivate) == "boolean") ? isPrivate : true;	//	表示是否是私有的，也就是说只有博主自己能够看到
	
	this._intro = null;
	this._scripts = null;
	this._refs = null;
	this._refDom = null;
	this._body = null;
}

UWA.WidgetWrapper.prototype.getDefaultBaseInfo = function() {
	return {
		title: "",
		icon: "",
		author: "",
		website: "",
		description: "",
		version: "",
		keywords: "",
		screenshot: "",
		thumbnail: "",
		apiVersion: "",
		debugMode: false,
		autoRefresh: 0
	}
}

/**
 * 解析基本的Widget信息
 **/
UWA.WidgetWrapper.prototype.parseBaseInfo = function() {
	if (this._intro == null) {
		//	定义基本变量
		this._intro = this.getDefaultBaseInfo();
		this._scripts = "";
		this._body = "";
		
		//	如果数据源是xml文档，那就从xml文档中解析数据。如果数据源是本文档，那就直接从本文档中提取内容
		if (this._from == "xml" || this._from == "this") {
			
			try {
				var isXml = this._from == "xml";
				
				//	获取基本对象
				if (isXml) {
					var doc = this._xml.documentElement;
					var head = doc.getElementsByTagName("head")[0];
					var body = doc.getElementsByTagName("body")[0];
				} else {
					var doc = document;
					var head = doc.getElementsByTagName("head")[0];
					var body = doc.body;
				}
				
				//	-----------------  解析intro部分  -----------------
				//	获取title
				if (isXml) {
					var title = head.getElementsByTagName("title")[0];
					this._intro.title = title.text || title.firstChild.data;
				} else {
					this._intro.title = doc.title;
				}
				
				//	获取icon
				var links = head.getElementsByTagName("link");
				for (var i=0; i<links.length; i++) {
					if (links[i].getAttribute("rel") == "icon") {
						this._intro.icon = links[i].getAttribute("href");
						break;
					}
				}
				//	获取meta
				var metas = head.getElementsByTagName("meta");
				for (var i=0; i<metas.length; i++) {
					var typeName = metas[i].getAttribute("name");
					var typeValue = metas[i].getAttribute("content");
					switch (typeName) {
						case "debugMode":
							typeValue = typeValue == "true";
							break;
						case "autoRefresh":
							try {
								typeValue = parseInt(typeValue);
							} catch (e) {
								typeValue = 0;
							}
							break;
					}
					this._intro[typeName] = typeValue;
				}
				//	-----------------  解析style部分  -----------------
				var styles = head.getElementsByTagName("style");
				var styleStr = "";
				//	循环取得所有样式的内容
				for (var i=0; i<styles.length; i++) {
					if (styles[i].getAttribute("src") == null) {
						styleStr += UWA.innerXML(styles[i]);
						/*
						for (var j=0; j<styles[i].childNodes.length; j++) {
							styleStr += styles[i].childNodes[j].nodeValue;
						}
						*/
					}
				}
				styleStr = styleStr.trim();
				if (styleStr.length > 0) {
					//	给样式加上限定名称
					styleStr = styleStr.replace(/#moduleContent/g, '');
					styleStr = styleStr.replace(/\n\s*([a-zA-z0-9\.\-, :#]*)\s*([{|,])/g, "\n\.uwa_widget_" + this.classId + " $1$2");
					
					//	-- 把取得样式添加到页面中
					var styleEle = document.createElement("style");
					styleEle.setAttribute("type", "text/css");
					if (styleEle.styleSheet) {
						styleEle.styleSheet.cssText = styleStr;
					} else {
						styleEle.appendChild(document.createTextNode(styleStr));
					}
					document.getElementsByTagName("head")[0].appendChild(styleEle);
				}
				//	-----------------  解析script部分  -----------------
				this._scripts = [];
				if (isXml) {
					var scripts = head.getElementsByTagName("script");
					for (var i=0; i<scripts.length; i++) {
						for (var j=0; j<scripts[i].childNodes.length; j++) {
							var nodeType = scripts[i].childNodes[j].nodeType;
							if (nodeType == 8 || nodeType == 4) {
								this._scripts.push(scripts[i].childNodes[j].nodeValue);
							}
						}
						/*
						if (scripts[i].getAttribute("src") == null && scripts[i].firstChild) {
							this._scripts.push(scripts[i].firstChild.nodeValue);
							//	this._scripts.push(UWA.innerXML(scripts[i]));
						}
						*/
					}
				}
				//	-----------------  获取preferences部分  -----------------
				this._refDom = head.getElementsByTagName("preference");
				//	-----------------  解析body部分  -----------------
				if (isXml) {
					this._body = UWA.innerXML(body);
				} else {
					this._body = body.innerHTML;
				}
				/*
				if (body.xml) {
					this._body = body.xml;
				} else {
					var serializer = new XMLSerializer();
					this._body = serializer.serializeToString(body);
				}
				*/
			} catch (e) {
				throw new SyntaxError("此文档不是一个有效的SOW Widget文档");
			}
		} else if (this._from == "obj") {
			this._intro = this._obj.intro;
			this._scripts = this._obj.scripts;
			this._refDom = this._obj.refs;
			this._body = this._obj.body;
		}
	}
	this.parseRef();
}

/**
 * 解析设置部分的基本信息
 **/
UWA.WidgetWrapper.prototype.parseRef = function() {
	if (this._refs == null) {
		this._refs = [];
		
		var dataFuncName = this._from == "xml" || this._from == "this" ? "getData" : "bindData";
		var displayCount = 0;
		for (var i=0; i<this._refDom.length; i++) {
			var item = UWA.Reference[dataFuncName](this._refDom[i]);
			this._refs.push(item);
			this._refs[item.name] = item;
		}
	}
}

/**
 * 取得配置的intro部分
 * @return intro配置属性
 * @type Object
 **/
UWA.WidgetWrapper.prototype.getIntro = function() {
	this.parseBaseInfo();
	return this._intro;
}

/**
 * 取得配置的script部分
 * @return 包含的所有js
 * @type Array
 **/
UWA.WidgetWrapper.prototype.getScripts = function() {
	this.parseBaseInfo();
	return this._scripts;
}

/**
 * 取得配置的preferences部分
 * @return 其中的每一项都是一个参数配置项，这是个只读对象，其他程序不能修改这个对象，因为相同类型的widget会重用这个设置项。
 * @type Array
 **/
UWA.WidgetWrapper.prototype.getPreferences = function() {
	this.parseBaseInfo();
	return this._refs;
}

/**
 * 取得配置的body部分
 * @return body配置属性
 * @type String
 **/
UWA.WidgetWrapper.prototype.getBody = function() {
	this.parseBaseInfo();
	return this._body;
}

/**
 * 从本页面中直接获取包装器
 **/
UWA.WidgetWrapper.getFromThis = function() {
	var wrapper = new UWA.WidgetWrapper(false);
	wrapper._from = "this";
	return wrapper;
}

/**
 * 通过一个widget xml document获得一个Widget Wrapper对象
 * @param {XmlDocument} xmlDom widget xml document对象
 * @param {XmlHttp} ajax xmlHttp对象
 **/
UWA.WidgetWrapper.getFromXml = function(xmlDom, ajax) {
	if (xmlDom && xmlDom.documentElement) {
		var isPrivate = false;
		if (ajax && ajax.getResponseHeader("Widget-Status") == "1") {
			isPrivate = true;
		}
		var wrapper = new UWA.WidgetWrapper(isPrivate);
		wrapper._from = "xml";
		wrapper._xml = xmlDom;
		return wrapper;
	} else {
		var error = '';
		if (xmlDom.parseError && xmlDom.parseError.reason) {
			error += "-&lt;filepos:" + xmlDom.parseError.filepos + "; line:" + xmlDom.parseError.line + "; linepos:" + xmlDom.parseError.line + "; reason:" + xmlDom.parseError.reason;
		}
		throw new SyntaxError("此文档不是一个标准的XML文档，不符合SOW Widget文档规范" + error);
	}
}

/**
 * 通过一个对象获得一个Widget Wrapper对象
 * @param {Object} obj obj对象
 **/
UWA.WidgetWrapper.getFromObj = function(obj) {
	var wrapper = new UWA.WidgetWrapper();
	wrapper._from = "obj";
	wrapper._obj = obj;
	return wrapper;
}