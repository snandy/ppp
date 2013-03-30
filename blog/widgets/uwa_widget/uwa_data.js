/*******************************************************************************************************
 * UWA Data ��װһ�������Widget
 ******************************************************************************************************/

UWA.Data = {

	/**
	 * ����һ��xml�ĵ�
	 * @param {String} url xml�ļ���ַ
	 * @param {Function} callback �ص�������ϵͳ���Զ��ѽ�������Xml Document������Ϊ��һ������ע�뵽�ص�������
	 **/
	getXml: function(url, callback) {
		this.request(url, {
			type: "xml",
			parameters: "ct=text%2Fxml",
			onComplete: callback
		});
	},
	
	/**
	 * ����һ��text�ĵ�
	 * @param {String} url text�ļ���ַ
	 * @param {Function} callback �ص�������ϵͳ���Զ���ȡ�õ�text�ı���Ϊ��һ������ע�뵽�ص�������
	 **/
	getText: function(url, callback) {
		this.request(url, {
			type: "text",
			onComplete: callback
		});
	},
	
	/**
	 * ����һ��json�ĵ�
	 * @param {String} url json�ļ���ַ
	 * @param {Function} callback �ص�������ϵͳ���Զ��ѽ�������json������Ϊ��һ������ע�뵽�ص�������
	 **/
	getJson: function(url, callback) {
		this.request(url, {
			type: "json",
			onComplete: callback
		});
	},

	/**
	 * ����һ��xml�ĵ�
	 * @param {String} url xml�ļ���ַ
	 * @param {Function} callback �ص�������ϵͳ���Զ��ѽ�������Xml Document������Ϊ��һ������ע�뵽�ص�������
	 * @param {Function} errorCallback ����ص�������ϵͳ��XmlHttp������Ϊ��һ������ע�뵽�ص�������
	 * @param {Boolean} isUseCache �Ƿ�ʹ��cache
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
	 * ��ʱ��֧��
	 **/
	getFeed: function(url, callback) {
	},
	
	/**
	 * ����һ��Ajax Request
	 * @param {String} url �����ַ
	 * @param {Object} request ��ز��������а������������£�
	 *		method: ���������ڰ���get��Ĭ�ϣ���post
	 *		proxy: Э�飬����ֻ֧��ajax
	 *		type: ���ص��������ͣ�����֧��text��Ĭ�ϣ���json��xml
	 *		parameters: ���Ϊpostʱ�������Ĳ���
	 *		onComplete: �ص�����
	 **/
	request: function(url, request) {
		//	��ʼ��request����
		request = Object.extend({
			method: "get",
			proxy: "ajax",
			type: "text",
			parameters: ""
		}, request || {});
		if (typeof(request.onComplete) != "function") request.onComplete = function() {}
		
		/*
		//	��ʼ��url
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
		
		//	���ݲ�ͬ�������������ͽ�����Ӧ�Ĳ���
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
	 * ����ʧ�ܺ�Ĵ�����
	 **/
	onFailure: function(transport) {
		UWA.log("status:" + transport.status + ";statusText:" + transport.statusText);
	}
}