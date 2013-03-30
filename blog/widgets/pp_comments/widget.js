/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-03-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var pp_comments = function(m_data, m_content, m_edit){
	var dataHost = 'http://blog.sohu.com/people/!' + _xpt + '/album';
	var dataHost2 = 'http://blog.sohu.com/a/album';
	var dataPath = '/json/commentlist*' + _ept + '*10.html';
	var elmOutput;
	
	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		this.updateData(true);
	};
	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		elmOutput.innerHTML = App.Lang.loadModuleData;
		if(App.Permit.editModule){
			var dataURL = dataHost2 + dataPath + '?o=true&ca='+timeStamp();
		}else{
			var dataURL = dataHost2 + dataPath;
		}
		elmOutput.innerHTML = App.Lang.loadModuleData;
		new LinkFile(dataURL, {
					type: 'script',
					noCache: noCache,
					callBack: {
						variable: 'ppComment',
						onLoad: this.loadedData.bind(this),
						onFailure: this.noData.bind(this)
					}});
	}
	this.loadedData = function() {
		this.loaded();
		this.showContent();
	};
	this.noData = function() {
		this.loaded();
		elmOutput.innerHTML = App.Lang.fileNotFound;
	}
	
	this.showContent = function() {
		var str = '<ul>';
		if (ppComment.length <= 0) {
			elmOutput.innerHTML = App.Lang.noComments;
			return;
		}
		var size = 0;
		$A(ppComment).each(function(p,i){
			if(p.content && p.viewurl){
				str += '<li><a href="' + dataHost + p.viewurl + (App.Permit.editModule? '?o=true&ca='+timeStamp() : '') + '" target="_blank" title="'+ p.content.unescapeHTML() +'">' + p.content.unescapeHTML();
				str += '</li>';
				size++;
			}
		});
		str += '</ul>';
		
		if(size == 0){
			elmOutput.innerHTML = App.Lang.noComments;
			return;
		}
		
		elmOutput.innerHTML = str;
	}
};
registerWidget('pp_comments');
