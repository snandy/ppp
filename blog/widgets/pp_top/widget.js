/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-03-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var pp_top = function(m_data, m_content, m_edit){
	var dataHost = 'http://pp.sohu.com';
	var dataPath = '/json/phototoday.html';
	var elmOutput;
	
	this.initialize = function() {
		this.build();
		//this.updateData();
	};
	this.destroy = function() {
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		eval("ppRcmUser=null");
		this.updateData(true);
	};
	this.build = function() {
		elmOutput = document.createElement('div');
		//elmOutput.innerHTML = App.Lang.loading;
		elmOutput.innerHTML = '����Ʒ�������ң��β���������������һ�����ͷ���<a href="http://q.sohu.com/forum/16" target="_blank">���Ѻ�Ȧ�ӡ���ͼƬ�㡱</a>';
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		var dataURL = dataHost + dataPath;
		elmOutput.innerHTML = App.Lang.loadModuleData;
		new LinkFile(dataURL, {
					type: 'script',
					noCache: noCache,
					callBack: {
						variable: 'ppRcmUser',
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
		
		if (ppRcmUser.length <= 0) {
			elmOutput.innerHTML = '�ƺ����ڻ�û�����ݣ��β�<a href="http://pp.sohu.com/userComment.jhtml?m=initShow&userId=24810" target="_blank">�Լ�һ��</a>��';
			return;
		}
		var size = 0;
		$A(ppRcmUser).each(function(p,i){
			if(p.userid && p.ico && size < 9){
				str += '<div class="collect">';
				str += '<div class="collectIco">';
				str += '<a href="' + p.url + '" target="_blank" title="'+ p.name.unescapeHTML() +'">';
				str +='<img src="' + p.ico + '" alt="'+ p.name.unescapeHTML() +'" width="50" />';
				str += '</div>';
				str += '<a href="' + p.url + '" target="_blank" title="'+ p.name.unescapeHTML() +'"><span>' + p.name.unescapeHTML() +'</span><br /></a>';
				str += '</div>';
				size++;
			}
		});
		if(size == 0){
			elmOutput.innerHTML = '�ƺ����ڻ�û�����ݣ��β�<a href="http://pp.sohu.com/userComment.jhtml?m=initShow&userId=24810" target="_blank">�Լ�һ��</a>��';
			return;
		}
		str += '<div class="more"><a href="http://pp.sohu.com/top/today.html" target="_blank">�鿴ȫ��</a></div>';
		elmOutput.innerHTML = str;
	}
};
registerWidget('pp_top');
