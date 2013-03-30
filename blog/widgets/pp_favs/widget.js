/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-03-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var pp_favs = function(m_data, m_content, m_edit){
	var dataHost = 'http://pp.sohu.com';
	var dataPath = '/json/favs*' + _ept + '*9*1.html';
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
		if(App.Permit.editModule){
			var dataURL = dataHost + dataPath + '?o=true&ca='+timeStamp();
		}else{
			var dataURL = dataHost + dataPath;
		}
		elmOutput.innerHTML = App.Lang.loadModuleData;
		new LinkFile(dataURL, {
					type: 'script',
					noCache: noCache,
					callBack: {
						variable: 'ppCollection',
						onLoad: this.loadedData.bind(this),
						onFailure: this.noData.bind(this)
						/*timeout: 20,
						timerStep: 500*/
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
		var str = '';
		if (ppCollection.length <= 0) {
			elmOutput.innerHTML = App.Lang.noFavs;
			return;
		}
		var size = 0;
		$A(ppCollection).each(function(p,i){
			if(p.id){
				str += '<div class="collect">';
				str += '<div class="collectIco">';
				str += '<a href="' + dataHost + p.viewurl + (App.Permit.editModule? '?o=true&ca='+timeStamp() : '') +'" target="_blank" title="'+ p.name.unescapeHTML() +'">';
				str += '<img src="' + p.cover + '" alt="'+ p.name.unescapeHTML() +'" width="75" />';
				str += '</div>';
				str += '<a href="' + dataHost + p.viewurl + '" target="_blank" title="'+ p.name.unescapeHTML() +'"><span>' + p.name.unescapeHTML() +'</span></a>';
				str += '<span>' + p.photoCount +'张</span>';
				str += '</div>';
				size++;
			}
		});
		
		if(size == 0){
			elmOutput.innerHTML = App.Lang.noFavs;
			return;
		}
		if(ppuserid){
			str += '<div class="more"><a href="http://pp.sohu.com/favs.jhtml?m=list&userId=' + ppuserid + '" target="_blank">查看全部收藏</a></div>';
		}
		elmOutput.innerHTML = str;
	}
};
registerWidget('pp_favs');
