/******* Category Widget **********/
//	Author: chenqj
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var categories = function(m_data, m_content, m_edit){
	var dataUrl = '/page/widget.do?ebi=' + _ebi + '&m=view&type=categories';
	var request_categories;
	var elmOutput;

	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		request_categories = null;
		Element.remove(elmOutput);
	};
	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if ($('categoriesData')) {
			elmOutput.innerHTML = $('categoriesData').innerHTML;
			$('categoriesData').innerHTML = '';
			Element.remove($('categoriesData'));
		}
		else {
			elmOutput.innerHTML = App.Lang.loadModuleData;
			var options = {
				nocache: noCache,
				onComplete: this.showContent.bind(this)
			};
			request_categories = new App.ImpFile(dataUrl, options);
		}
	};
	this.showContent = function(request_categories) {
		if (request_categories.responseText == '') {
			this.setTitle(App.Lang.error);
			elmOutput.innerHTML = App.Lang.analyseFileError;
			return;
		}
		elmOutput.innerHTML = request_categories.responseText;
	};
};

registerWidget('categories');