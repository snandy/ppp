/******* User New Videos Widget **********/
//	Author: Jady
//	Created: 2007-06-14
//	Updated: 2007-06-14
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var v_vrecommend = function(m_data, m_content, m_edit, w_path){
	
	//	ͨ�õ�һЩ����
	var userPassport = _xpt;
	var wdtData = null;
	var moreUrl = '';
	var defCover = Actions.imgPath + "defvideocover.gif";
	
	//	�й��������󼰻ظ���һЩ����
	var wdtUrl = "http://v.blog.sohu.com/json/";
	var wdtService = "vRecommend";
	var wdtVn = "1";
	var wdtVarfix = "VBlog." + wdtService;
	var wdtPlayVars = 'VBlog_' + wdtService;
	var size = 6;
	
	//	ҳ���ϵ�һЩԪ�ض���
	var outputEle = null;		//	������Ԫ��
	
	//	��ʾ����
	this.showContent = function() {
		outputEle.innerHTML = "";
		var str = '';
		var ids = [];
		if(wdtData.length) {
			str += '<ul>';
			for(var i=0; i<wdtData.length; i++) {
				var dataNow = wdtData[i];
				var title = dataNow.title;
				ids.push(dataNow.id);
				
				str += '\
					<li><a href="' + dataNow.url + '" title="' + title + '" alt="' + title + '" target="_blank" class="video_cover"><img src="' + (dataNow.cover || defCover) + '" /><span class="v_play"></span></a>\
						<dl>\
							<dt><a href="' + dataNow.url + '" title="' + title + '" alt="' + title + '" target="_blank">' + title + '</a></dt>\
							<dd class="video_auth">' + App.Lang.v_authorName + '��<a href="' + dataNow.authorUrl + '" alt="' + dataNow.authorName + '" title="' + dataNow.authorName + '" target="_blank">' + dataNow.authorName + '</a></dd>\
							<dd>' + App.Lang.v_play + '��<span id="VBlog_V_' + dataNow.id + '" name="VBlog_V_' + dataNow.id + '">(?)</span></dd>\
							<dd>' + App.Lang.v_comment + '��' + dataNow.comments_count + '</dd>\
						</dl>\
					</li>';
			}
			str += '</ul>';
			
			str += '\
				<div class="more">\
					<a href="' + listUrl + '" target="_blank">' + App.Lang.v_more + '</a>\
				</div>';
		} else {
			str = App.Lang.v_noRecommend;
		}
		outputEle.innerHTML = str;
		this.getPlayCount(ids);
	};
	
	/*******************************************
	 *	�й����������һЩ����
	 ******************************************/
	this.getPlayCount = function(ids) {
		if (ids && ids.length > 0) {
			var url = 'http://vstat.v.blog.sohu.com/dostat.do?method=getVideoPlayCount&v=' + ids.join("|") + "&n=" + this.getPlayJsonName();
			new LinkFile(url, {
				type: 'script',
				callBack: {
					variable: this.getPlayJsonName(),
					onLoad: this.loadedPlayData.bind(this)
			}});
		}
	}
	this.loadedPlayData = function() {
		var data = eval("(" + this.getPlayJsonName() + ")");
		for (var i=0; i<data.length; i++) {
			/*
			var element = $("VBlog_V_" + data[i].id);
			if (element) {
				element.innerHTML = data[i].count;
			}
			*/
			var elements = document.getElementsByName("VBlog_V_" + data[i].id);
			if (elements) {
				for (var ii =0; ii<elements.length; ii++) {
					elements[ii].innerHTML = data[i].count;
				}
			}
		}
	}
	this.clearCache = function() {
		var jsonName = this.getJsonName();
		try {
			eval(jsonName + "=null");
		} catch(e) {}
	}
	this.getJsonName = function() {
		return wdtVarfix + wdtVn;
	}
	this.getPlayJsonName = function() {
		return wdtPlayVars + wdtVn;
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
		var data = eval("(" + this.getJsonName() + ")");
		if (data.status == 1) {
			wdtData = data.data.list;
			listUrl = data.data.listUrl;
		} else {
			outputEle.innerHTML = App.Lang.notWellFormed;
		}
		this.showContent();
		this.loaded();
	};
	this.noData = function() {
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
		outputEle.className = "container";
		m_content.appendChild(outputEle);
	}
	this.getRequestUrl = function() {
		var str = wdtUrl + wdtService + "*recommend*" + size + "*0*" + wdtVn + ".html";
		return str;
	};
};
registerWidget("v_vrecommend");