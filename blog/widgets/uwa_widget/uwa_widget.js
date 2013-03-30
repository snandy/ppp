/*******************************************************************************************************
 * UWA Widget
 ******************************************************************************************************/
 
/**
 * �ṩ���û�ʹ�õ�Widget����
 * @param {UWA.Module} module ����widget�ķ���App Widget����Ҫ��ġ�����uwa widget��һ��app Widget��
 **/
/*
UWA.Widget = function(module) {
	this._module = module;
	this.body = this._module.body;
}
*/
/**
 * �ṩ���û�ʹ�õ�Widget����
 **/
UWA.Widget = function() {
}

/*---------------------  Ϊʵ����ع��ܣ�����Ҫ�ṩ�������ߵķ���  ---------------------*/
/**
 * ��ʼ������
 * @param {String} title ����
 * @param {String} body Ĭ�����ݲ�����ʾ��html
 * @param {Array} scripts widget������������script
 **/
UWA.Widget.prototype.initialize = function(title, body, scripts) {
	//	��ʼ��script
	if (UWA.Config.fileInPage) {
		//	����ǵ������ڵ�ģʽ���Ǿ�ֱ�Ӷ�ȡ��ص�����
		Object.extend(this, widget);
		widget = this;
	} else {
		this.setScripts(scripts);
	}
	
	//	������س�ʼ������
	this.setTitle(title);
	this.setBody(body);
	
	//	����onLoad�¼�
	//	this.onLoad();
}

/**
 * ���ô�Widget�������õ���script
 * @param {Array} scripts ��widget�а���������script
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

/*---------------------  UWA Ҫ�����Ҫ���û����ص��¼�  ---------------------*/

/**
 * widget��ʼ���¼��������û�����
 **/
/*
UWA.Widget.prototype.onLoad = function() {
}
*/

/**
 * widgetˢ���¼��������û�����
 **/
/*
UWA.Widget.prototype.onRefresh = function() {
}
*/

/**
 * ��ʱ��֧��
 **/
UWA.Widget.prototype.onResize = function() {
}
UWA.Widget.prototype.onSearch = function() {
}
UWA.Widget.prototype.onResetSearch = function() {
}
UWA.Widget.prototype.onKeyboardAction = function() {
}

/*---------------------  UWA Ҫ��Ĺ��û�ʹ�õķ���  ---------------------*/

/**
 * ��body���������
 * @param {StringOrElement} content Ҫ��ӵ����ݣ����Ϊ�ַ������Ǿͽ���ŵ�div�У�Ȼ����ӵ�body�������ߣ����Ϊһ�������Ǿ�ֱ�ӽ�����ӵ�body���������
 **/
UWA.Widget.prototype.addBody = function(content) {
	this.body.addContent(content);
}

/**
 * ����һ����ʱ���󣬵�����������֧��Element API
 * @param {String} tagName ��Ҫ�����Ķ���ı�ǩ����
 * @return �´����Ķ���
 * @type Element
 **/
UWA.Widget.prototype.createElement = function(tagName) {
	if (tagName == "script") return false;
	var el = document.createElement(tagName);
	return UWA.$element(el);
}

/**
 * ȡ��ĳ�������������ֵ
 * @param {String} name ���������������
 * @return �����������ֵ
 * @type ANY
 **/
UWA.Widget.prototype.getValue = function(name) {
	/*
	return this._module.getRef(name);
	*/
}

/**
 * ���´��ڴ�һ������
 * @param {String} url ���ӵ�ַ
 **/
UWA.Widget.prototype.openURL = function(url) {
	window.open(url);
}

/**
 * ��widget���������
 * @param {String} content Ҫ��ӵ�widget��ʾ��������ݣ�����Ϊһ����Ч��htmlƬ��
 **/
UWA.Widget.prototype.setBody = function(content) {
	this.body.innerHTML = content;
}

/**
 * ���ñ���
 * @param {String} title ����
 **/
UWA.Widget.prototype.setTitle = function(title) {
	/*
	this._module.setTitle(title);
	*/
}

/**
 * ����ĳ�������������ֵ
 * @param {String} name ���������������
 * @param {ANY} value �����������ֵ
 **/
UWA.Widget.prototype.setValue = function(name, value) {
	/*
	this.setRef(name, value);
	*/
}

/**
 * �����̨�н�����־��¼
 * @param {Object} obj ��¼��
 **/
UWA.Widget.prototype.log = function(obj) {
	/*
	this._module.log(obj);
	*/
}

/**
 * �����Զ�ˢ��ʱ��
 * @param {Number} delay ˢ�¼��������Ϊ��λ
 **/
UWA.Widget.prototype.setAutoRefresh = function(delay) {
}

/**
 * ��ʱ��֧��
 **/
UWA.Widget.prototype.setUnreadCount = function(count) {
}
UWA.Widget.prototype.setSearchResultCount = function(count) {
}