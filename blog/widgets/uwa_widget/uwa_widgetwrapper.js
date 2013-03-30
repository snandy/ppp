/*******************************************************************************************************
 * UWA Widget Wrapper ��װһ�������Widget
 ******************************************************************************************************/

UWA.WidgetWrapper = function(isPrivate) {
	this._from = "";
	this._xml = null;
	this._obj = null;
	this.classId = 0;
	
	this.isPrivate = (typeof(isPrivate) == "boolean") ? isPrivate : true;	//	��ʾ�Ƿ���˽�еģ�Ҳ����˵ֻ�в����Լ��ܹ�����
	
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
 * ����������Widget��Ϣ
 **/
UWA.WidgetWrapper.prototype.parseBaseInfo = function() {
	if (this._intro == null) {
		//	�����������
		this._intro = this.getDefaultBaseInfo();
		this._scripts = "";
		this._body = "";
		
		//	�������Դ��xml�ĵ����Ǿʹ�xml�ĵ��н������ݡ��������Դ�Ǳ��ĵ����Ǿ�ֱ�Ӵӱ��ĵ�����ȡ����
		if (this._from == "xml" || this._from == "this") {
			
			try {
				var isXml = this._from == "xml";
				
				//	��ȡ��������
				if (isXml) {
					var doc = this._xml.documentElement;
					var head = doc.getElementsByTagName("head")[0];
					var body = doc.getElementsByTagName("body")[0];
				} else {
					var doc = document;
					var head = doc.getElementsByTagName("head")[0];
					var body = doc.body;
				}
				
				//	-----------------  ����intro����  -----------------
				//	��ȡtitle
				if (isXml) {
					var title = head.getElementsByTagName("title")[0];
					this._intro.title = title.text || title.firstChild.data;
				} else {
					this._intro.title = doc.title;
				}
				
				//	��ȡicon
				var links = head.getElementsByTagName("link");
				for (var i=0; i<links.length; i++) {
					if (links[i].getAttribute("rel") == "icon") {
						this._intro.icon = links[i].getAttribute("href");
						break;
					}
				}
				//	��ȡmeta
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
				//	-----------------  ����style����  -----------------
				var styles = head.getElementsByTagName("style");
				var styleStr = "";
				//	ѭ��ȡ��������ʽ������
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
					//	����ʽ�����޶�����
					styleStr = styleStr.replace(/#moduleContent/g, '');
					styleStr = styleStr.replace(/\n\s*([a-zA-z0-9\.\-, :#]*)\s*([{|,])/g, "\n\.uwa_widget_" + this.classId + " $1$2");
					
					//	-- ��ȡ����ʽ��ӵ�ҳ����
					var styleEle = document.createElement("style");
					styleEle.setAttribute("type", "text/css");
					if (styleEle.styleSheet) {
						styleEle.styleSheet.cssText = styleStr;
					} else {
						styleEle.appendChild(document.createTextNode(styleStr));
					}
					document.getElementsByTagName("head")[0].appendChild(styleEle);
				}
				//	-----------------  ����script����  -----------------
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
				//	-----------------  ��ȡpreferences����  -----------------
				this._refDom = head.getElementsByTagName("preference");
				//	-----------------  ����body����  -----------------
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
				throw new SyntaxError("���ĵ�����һ����Ч��SOW Widget�ĵ�");
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
 * �������ò��ֵĻ�����Ϣ
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
 * ȡ�����õ�intro����
 * @return intro��������
 * @type Object
 **/
UWA.WidgetWrapper.prototype.getIntro = function() {
	this.parseBaseInfo();
	return this._intro;
}

/**
 * ȡ�����õ�script����
 * @return ����������js
 * @type Array
 **/
UWA.WidgetWrapper.prototype.getScripts = function() {
	this.parseBaseInfo();
	return this._scripts;
}

/**
 * ȡ�����õ�preferences����
 * @return ���е�ÿһ���һ��������������Ǹ�ֻ�����������������޸����������Ϊ��ͬ���͵�widget��������������
 * @type Array
 **/
UWA.WidgetWrapper.prototype.getPreferences = function() {
	this.parseBaseInfo();
	return this._refs;
}

/**
 * ȡ�����õ�body����
 * @return body��������
 * @type String
 **/
UWA.WidgetWrapper.prototype.getBody = function() {
	this.parseBaseInfo();
	return this._body;
}

/**
 * �ӱ�ҳ����ֱ�ӻ�ȡ��װ��
 **/
UWA.WidgetWrapper.getFromThis = function() {
	var wrapper = new UWA.WidgetWrapper(false);
	wrapper._from = "this";
	return wrapper;
}

/**
 * ͨ��һ��widget xml document���һ��Widget Wrapper����
 * @param {XmlDocument} xmlDom widget xml document����
 * @param {XmlHttp} ajax xmlHttp����
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
		throw new SyntaxError("���ĵ�����һ����׼��XML�ĵ���������SOW Widget�ĵ��淶" + error);
	}
}

/**
 * ͨ��һ��������һ��Widget Wrapper����
 * @param {Object} obj obj����
 **/
UWA.WidgetWrapper.getFromObj = function(obj) {
	var wrapper = new UWA.WidgetWrapper();
	wrapper._from = "obj";
	wrapper._obj = obj;
	return wrapper;
}