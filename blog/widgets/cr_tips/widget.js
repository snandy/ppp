/******* Chinaren Tips Widget **********/
//	Author: Jady
//	First Created: 2008-07-08
//	Last Update: 2008-07-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var cr_tips = function(m_data, m_content, m_edit){
	
	var dataUrl = '/inc/home/blogbeta/crTips.inc';
	
	var outputEl;
	
	this.initialize = function() {
		this.build();
		this.reqData();
	};
	this.build = function() {
		outputEl = document.createElement('div');
		outputEl.innerHTML = App.Lang.loading;
		
		m_content.appendChild(outputEl);
	};
	this.reqData = function() {
		new Ajax.Request(dataUrl, {
			method: 'get',
			onSuccess: this.gotData.bind(this),
			onFailure: this.noGotData.bind(this)
		});
	};
	this.gotData = function(req) {
		outputEl.innerHTML = req && req.responseText;
	};
	this.noGotData = function(req) {
		outputEl.innerHTML = App.Lang.notWellFormed;
	};
	this.destroy = function() {
		Element.remove(outputEl);
	};
};

registerWidget('cr_tips');
