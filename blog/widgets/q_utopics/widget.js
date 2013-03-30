/******* Group User's Topics Widget **********/
//	Author: Jady
//	Created: 2007-08-6
//	Updated: 2007-08-6
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var q_utopics = function(m_data, m_content, m_edit, w_path){
	
	//	ͨ�õ�һЩ����
	var userPassport = _xpt;
	var wdtData = null;
	var moreUrl = '';
	
	//	�й��������󼰻ظ���һЩ����
	var wdtUrl = "http://q.sohu.com/user/";
	var wdtService = "topics";
	var wdtVarfix = "Q.user_" + wdtService;
	var size = 10;
	
	//	ҳ���ϵ�һЩԪ�ض���
	var outputEle = null;		//	������Ԫ��
	
	//	��ʾ����
	this.showContent = function() {
		outputEle.innerHTML = "";
		var str = '';
		
		var list = wdtData.list;
		if (wdtData.list && list.length) {
			str += '\
				<div class="q_mytopics">\
					<ul>';
			
			var length = Math.min(list.length, size);
			for(var i=0; i<length; i++) {
				var dataNow = list[i];
				var replyCount = dataNow.replyCount;
				var ico = dataNow.ico;
				var title = dataNow.title;
				var url = dataNow.url;
				var replyTime = this.getFriendlyTime(dataNow.replyTime);
				var replyUser = dataNow.replyUser;
				var userUrl = dataNow.userUrl;
				
				str += '<li><table><tr><td valign="top"><img src="' + ico + '" /></td><td><a href="' + url + '" title="' + title + '" alt="' + title + '" target="_blank">' + title + '</a>&nbsp;' + (replyCount > 0 ? ('<span class="reply">�ظ�:' + replyTime + '&nbsp;<a href="' + userUrl + '" title="' + replyUser + '" alt="' + replyUser + '" target="_blank">' + replyUser + '</a></span>') : ('<span class="reply">����:' + replyTime + '</span>')) + '</td></tr></table></li>';
			}
			
			str += '\
					</ul>\
			    	<div class="more"><a href="' + wdtData.listUrl + '" target="_blank">�鿴����>></a></div>\
				</div>';
		} else {
			str = App.Permit.editModule ? '�Ѻ�Ȧ�����Ѻ����� ��ͨ���� �� ������ �Ĺ����ռ䡣����ȥ<a href="http://q.sohu.com/" target="_blank">��������</a>�ɣ�' : '�û�û�з����κ�<a href="http://q.sohu.com/" target="_blank">Ȧ��</a>����';
		}
		
		outputEle.innerHTML = str;
	};
	this.getFriendlyTime = function(time) {
		var now = new Date();
		var interval = now.getTime() - time;
			
		var minu = Math.floor(interval / (60 * 1000));
		var hour = Math.floor(minu / 60);
		var day = Math.floor(hour / 24);
		
		
		var str = '';
		if(day >= 1){
			str += day;
			str += '��';
		}
		
		if(hour < 48 && hour > 0 && (hour % 24) > 0){
			str += hour % 24;
	
			str += 'Сʱ';
		}
	        
		if(hour < 24){
			str += minu % 60;
			str += '����';
		}
		str += 'ǰ';
		if (minu <= 0) {
			str = '�ո�';
		}
		return str;
	}
	
	/*******************************************
	 *	�й����������һЩ����
	 ******************************************/
	this.clearCache = function() {
		var jsonName = this.getJsonName();
		try {
			eval(jsonName + "=null");
		} catch(e) {}
	}
	this.requestData = function(noCache) {
		if(!outputEle) this.initElement();
		outputEle.innerHTML = App.Lang.loadModuleData;
		
		var dataURL = this.getRequestUrl();
		if(noCache) {
			this.clearCache();
		}
		
		new LinkFile(dataURL, {
			type: 'script',
			noCache: noCache,
			callBack: {
				variable: this.getJsonName(),
				onLoad: this.loadedData.bind(this),
				onFailure: this.noData.bind(this)
		}});
	};
	this.loadedData = function(canRefresh) {
		try {
			var data = eval("(" + this.getJsonName() + ")");
			if (data != null) {
				wdtData = data;
				this.showContent();
			} else {
				this.errorData();
			}
		} catch(e) {
			this.errorData();
		}
		this.loaded();
	};
	this.noData = function() {
		outputEle.innerHTML = App.Lang.notWellFormed;
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
		outputEle = m_content.appendChild(outputEle);
	}
	this.getJsonName = function() {
		return wdtVarfix;
	}
	this.getRequestUrl = function() {
		var str = wdtUrl + "!" + userPassport + "/" + wdtService + "!json";
		return str;
	};
};
registerWidget("q_utopics");