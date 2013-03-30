/*******************************************************************************************************
 * UWA Widget Lib ���д洢�����Ѿ����ص�UWA Widget ����
 ******************************************************************************************************/


/**
 * �����Ѿ����ص�UWA Widget ����
 **/
UWA.WidgetLib = {

	/**
	 * �洢�����Ѿ����ص�Widget���ͣ���Ϊһ�����飬ÿ��Ԫ��ΪΪ����һ������
	 *  	{
	 * 			path: "", 		//	widget ��ַ
	 * 			status: 0,		//	״̬��0��ʾ���ڼ����У�1��ʾ���سɹ���-1��ʾ����ʧ��
	 * 			wrapper: null,	//	���ص���wrapper����
	 * 			callbacks: [],	//	������ɺ�Ļص�����
	 * 		}
	 **/
	libs: [],
	
	/**
	 * ͨ��widget��ַȡ�ô�Widget���û���ʱ���е�һ�����
	 * @param {String} path widget·��
	 * @return ��Widget�ڿ��еı�ţ�������Ϊ��һ�����͵�Ψһ��ţ����Ϊ-1ʱ��ʾ���л������ڴ�widget
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
	 * ͨ��widget·������widget��������ɺ����ָ���Ļص�����
	 * @param {String} path widget·��
	 * @param {Function} callback �ص�������ϵͳ���Զ�Ϊ�˻ص�ע���һ������Ϊ��widget��Widget Wrapper����
	 * @param {Boolean} isUseCache �Ƿ�ʹ��cache
	 **/
	getWidget: function(path, callback, isUseCache) {
		if (isUseCache) {
			var widgetLib = null;
			
			//	�����鿴�Ƿ���ڴ�Widget����
			var index = this.getWidgetClassId(path);
			if (index >= 0) {
				//	�Ѿ�������widget�������¼
				
				widgetLib = this.libs[index];
				switch (widgetLib.status) {
					case -1:	//	����ʧ��
						//	����Ѿ����سɹ��Ļ����Ǿ�ȡ�ü��غõĶ���
						widgetWrapper = widgetLib.wrapper;
						break;
					case 0:		//	���ڼ���
						//	���û�м��سɹ��Ļ����Ǿʹ���callback
						widgetLib.callbacks.push(callback);
						break;
					case 1:		//	���سɹ�
						//	����Ѿ����سɹ��Ļ����Ǿ�ȡ�ü��غõĶ���
						widgetWrapper = this.libs[index].wrapper;
						break;
				}
				/*
				if (this.libs[index].status == 1) {
					//	����Ѿ����سɹ��Ļ����Ǿ�ȡ�ü��غõĶ���
					widgetWrapper = this.libs[index].wrapper;
				} else {
					//	���û�м��سɹ��Ļ����Ǿʹ���callback
					this.libs[index].callbacks.push(callback);
				}
				*/
			} else {
				//	�����ڴ�widget�������¼
				
				//	�ڿ��д����µļ�¼
				widgetLib = {
					path: path.toLowerCase(),
					status: 0,
					wrapper: null,
					callbacks: [callback]
				};
				this.libs.push(widgetLib);
			}
			
			if (widgetLib.status == 0) {
				//	û�еĻ����Ǿ�������������Widget
				this.requestWidget(path);
			} else {
				//	���ڴ�Widget�����ûص�����
				callback(widgetLib.wrapper);
			}
		} else {
			this.requestWidgetNC(path, callback);
		}
	},
	
	/**
	 * ͨ��һ��·������һ��widget����
	 * @param {String} url widget·��
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
	 * ͨ��һ��·������һ��widget���ͣ���ʹ��cache��
	 * @param {String} url widget·��
	 * @param {Function} callback �ص�����
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
	 * ����widget�ļ�ʧ�ܺ�Ĵ�����
	 * @param {String} path widget·��
	 * @param {XmlHttp} ajax XmlHttp����
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
	 * ���ص�xml�ļ�֮��Ļص�����
	 * @param {String} path widget·��
	 * @param {XmlDocument} xmlDoc ����widget xml��xml document����
	 * @param {XmlHttp} ajax xmlHttp����
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
	 * ����widget�ļ�ʧ�ܺ�Ĵ���������ʹ�û��棩
	 * @param {String} path widget·��
	 * @param {Function} callback �ص�����
	 * @param {XmlHttp} ajax XmlHttp����
	 **/
	loadFailureNC: function(path, callback, ajax) {
		callback(null);
	},
	
	/**
	 * ���ص�xml�ļ�֮��Ļص���������ʹ�û��棩
	 * @param {String} path widget·��
	 * @param {Function} callback �ص�����
	 * @param {XmlDocument} xmlDoc ����widget xml��xml document����
	 * @param {XmlHttp} ajax xmlHttp����
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