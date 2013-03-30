/******* Group User Joined Groups Widget **********/
//	Author: Jady
//	Created: 2007-08-6
//	Updated: 2007-08-6
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var q_ugroups = function(m_data, m_content, m_edit, w_path){
	
	//	ͨ�õ�һЩ����
	var userPassport = _xpt;
	var wdtData = null;
	var moreUrl = '';
	
	//	�й��������󼰻ظ���һЩ����
	var wdtUrl = "http://q.sohu.com/user/";
	var wdtService = "groups";
	var wdtVarfix = "Q.user_" + wdtService;
	
	//	ҳ���ϵ�һЩԪ�ض���
	var outputEle = null;		//	������Ԫ��
	
	//	��ʾ����
	this.showContent = function() {
		outputEle.innerHTML = "";
		var str = '';
		
		if(wdtData.length) {
			if (wdtData.length >= 6) {
				str += '<ul class="q_join">';
				for(var i=0; i<wdtData.length; i++) {
					var dataNow = wdtData[i];
					var ico = dataNow.ico;
					var title = dataNow.title;
					var url = dataNow.url;
					var modifiedImg = this.getUpdateImg(dataNow.modified);
					
					str += '\
						<li>\
							<a href="' + url + '" target="_blank" title="' + title + '" alt="' + title + '"><img class="group_ico" src="' + ico + '" title="' + title + '" alt="' + title + '" align="absmiddle" />' + title + '</a>\
							' + modifiedImg + '\
						</li>';
				}
				str += '</ul>';
			} else {
				str += '<ul class="q_join_s">';
				for(var i=0; i<wdtData.length; i++) {
					var dataNow = wdtData[i];
					var ico = dataNow.ico;
					var title = dataNow.title;
					var url = dataNow.url;
					var modifiedImg = this.getUpdateImg(dataNow.modified);
					var tag = this.getTagStr(dataNow.tag);
					
					str += '\
						<li>\
							<div class="groupCover">\
								<a href="' + url + '" target="_blank" title="' + title + '" alt="' + title + '"><img class="groupIco" src="' + ico + '" alt="' + title + '" title="' + title + '" /></a>\
							</div>\
							<div class="groupTitle">\
								<a href="' + url + '" target="_blank" title="' + title + '" alt="' + title + '"><strong>' + title + '</strong></a>' + modifiedImg + '<br />\
								��ǩ��<br />' + tag + '\
							</div>\
							<div style="clear:both"></div>\
						</li>';
				}
				str += '</ul>';
			}
		} else {
			str = App.Permit.editModule ? '�Ѻ�Ȧ�����Ѻ����� ��ͨ���� �� ������ �Ĺ����ռ䡣����ȥ<a href="http://q.sohu.com/" target="_blank">����Ȧ��</a>�ɣ�' : '�û�û�м����κ�<a href="http://q.sohu.com/" target="_blank">Ȧ��</a>';
		}
		
		outputEle.innerHTML = str;
	};
	this.getUpdateImg = function(time) {
		var str = '';
		var mofiLevel = 4;
		var mofiTitle = '�þ�û�����ˣ�ȥ����֧��һ��';
		var now = new Date().getTime();
		var interval = now - time; 
		if (interval < 0) interval = 0;
		var minu = Math.floor(interval / (60 * 1000));
		var day = Math.floor(minu / (24 * 60));
		if(minu < 60){
			mofiLevel = 1;
			mofiTitle = '�ոո��£���ȥ����ɳ����';
		}else if(day < 1){
			mofiLevel = 2;
			mofiTitle = Math.floor(minu / 60) +'Сʱǰ���£�ȥ������ʲô������';
		}else if(day < 7){
			mofiLevel = 3;
			mofiTitle = day +'��ǰ���£�ȥ����֧��һ��';
		}
		str = '<img class="news_info" title="' + mofiTitle + '" alt="' + mofiTitle + '" src="http://img3.pp.sohu.com/ppp/blog/styles/images/ico_upn_' + mofiLevel + '.gif" align="absmiddle" />';
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
	}
	this.getTagStr = function(tag) {
		var str = '';
		var tags = tag.split(" ");
		for (var i=0; i<tags.length; i++) {
			if (i > 0) str += '&nbsp;';
			str += '<a href="http://tag.q.sohu.com/page/tag.do?action=groups&id=' + tags[i] + '" target="_blank" title="' + tags[i] + '" alt="' + tags[i] + '">' + tags[i] + '</a>';
		}
		return str;
	}
};
registerWidget("q_ugroups");