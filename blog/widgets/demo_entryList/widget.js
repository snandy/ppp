/******* Demo_EntryList Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-04-20
//	Last Update: 2006-04-20
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Demo_EntryList = function(m_data, m_content, m_edit){
	var intervalObj;
	var rndUpdateTime = Math.round(60*1000*Math.random());
	var intervalTime = 20*60*1000 + rndUpdateTime;
	var entryUrl = '/demo/entryList.asp';
/*	
	this.initialize = function() {
		//...
	};
	this.edit = function() {
		//...
	};
	this.onCloseEdit = function() {
		//...
	};
	this.refresh = function() {
		//...
	};
	this.destory = function() {
		//...
	};
	this.save(data);
	this.loaded();
	this.setIco(String: src);
	this.setTitle(String: title);
*/
	this.initialize = function() {
		this.build();
		this.updateData();
		intervalObj = setInterval(this.updateData.bind(this), intervalTime);
	};
	this.destroy = function() {
		clearInterval(intervalObj);
		request = null;
	};
	this.refresh = function() {
		this.updateData(true);
	};
	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		Element.addClassName(elmOutput, 'itemsContainer');
		
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if ($('entryData')) {
			this.loaded();
			elmOutput.innerHTML = $('entryData').innerHTML;
			$('entryData').innerHTML = '';
			Element.remove($('entryData'));
		}
		else {
			elmOutput.innerHTML = App.Lang.loadModuleData;
			var url = entryUrl;
			var options = {
				nocache: noCache,
				onComplete: this.showContent.bind(this)
			};
			request = new App.ImpFile(url, options);
			//request = new Ajax.Request(url, options);
		}
	}
	this.showContent = function(request) {
		this.loaded();
		if (request.responseText == '') {
			this.setTitle(App.Lang.error);
			elmOutput.innerHTML = App.Lang.analyseFileError;
			return;
		}
		elmOutput.innerHTML = request.responseText;
	}
};
registerWidget('Demo_EntryList');
