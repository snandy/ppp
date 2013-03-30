/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-03-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var pp_recommends = function(m_data, m_content, m_edit){
	var dataHost = 'http://pp.sohu.com';
	var dataPath = '/json/phototosetday.html';
	var elmOutput;
	
	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		eval("ppRcmSet=null");
		this.updateData(true);
	};
	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		var dataURL = dataHost + dataPath;
		elmOutput.innerHTML = App.Lang.loadModuleData;
		new LinkFile(dataURL, {
					type: 'script',
					noCache: noCache,
					callBack: {
						variable: 'ppRcmSet',
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
		elmOutput.innerHTML = '�ƺ����ڻ�û�����ݣ��β�<a href="http://pp.sohu.com/userComment.jhtml?m=initShow&userId=24810" target="_blank">�Լ�һ��</a>��';
	}
	
	this.showContent = function() {
		var str = '';
		if (ppRcmSet.length <= 0) {
			elmOutput.innerHTML = App.Lang.noFavs;
			return;
		}
		var size = 0;
		$A(ppRcmSet).each(function(p,i){
			if(p.id){
				str += '<div class="collect">';
				str += '<div class="collectIco">';
				str += '<a href="' + p.viewurl + '" target="_blank" title="'+ p.name.unescapeHTML() +'('+ p.photoCount +'��)">';
				str += '<img src="' + p.cover + '" alt="'+ p.name.unescapeHTML() +'('+ p.photoCount +'��)" width="75" />';
				str += '</div>';
				str += '</div>';
				size++;
			}
		});
		
		if(size == 0){
			elmOutput.innerHTML = '�ƺ����ڻ�û�����ݣ��β�<a href="http://pp.sohu.com/userComment.jhtml?m=initShow&userId=24810" target="_blank">�Լ�һ��</a>��';
			return;
		}
		str += '<div class="more"><a href="http://pp.sohu.com/" target="_blank">�鿴����</a></div>';
		elmOutput.innerHTML = str;
	}
};
registerWidget('pp_recommends');
