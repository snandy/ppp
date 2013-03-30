/******* Group Ten Topics Widget **********/
//	Author: Jady
//	Created: 2007-08-6
//	Updated: 2007-08-6
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var q_tentopic = function(m_data, m_content, m_edit, w_path){
	
	//	ͨ�õ�һЩ����
	var wdtData = null;
	
	//	�й��������󼰻ظ���һЩ����
	var ajax = null;
	
	//	ҳ���ϵ�һЩԪ�ض���
	var outputEle = null;		//	������Ԫ��
	
	//	��ʾ����
	this.showContent = function() {
		outputEle.innerHTML = wdtData;
	};
	
	/*******************************************
	 *	�й����������һЩ����
	 ******************************************/
	this.requestData = function() {
		if(!outputEle) this.initElement();
		outputEle.innerHTML = App.Lang.loadModuleData;
		
		var dataURL = this.getRequestUrl();
		
		ajax = new Ajax.Request(dataURL, {
			method: 'get',
			onSuccess: this.loadedData.bind(this),
			onFailure: this.noData.bind(this)
		});
	};
	this.loadedData = function() {
		var str = ajax.transport.responseText;
		if (str.length > 0) {
			wdtData = str;
			this.showContent();
		} else {
			this.errorData();
		}
		this.loaded();
	};
	this.noData = function() {
		outputEle.innerHTML = App.Lang.fileNotFound;
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
	
	//	��ʼ��ҳ���ϵĶ���
	this.initElement = function() {
		m_content.innerHTML = "";
		
		outputEle = document.createElement("div");
		m_content.appendChild(outputEle);
	}
	this.getRequestUrl = function() {
		var str = '/inc/home/tenTopic.inc?t=' + timeStamp();
		return str;
	};
};
registerWidget("q_tentopic");