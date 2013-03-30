/******* Feeds Widget **********/
//	Author: Jady Yang
//	First Created: 2008-05-22
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var tl_notice = function(m_data, m_content, m_edit){
	
	var url = '/rss/tl/gonggao.xml';
	var keys = ['title', 'time', 'style'];
	
	var outputEl = null;
	
	this.getUrl = function(noCache) {
		return url;
	};
	this.build = function() {
		outputEl = document.createElement('div');
		outputEl.className = 'itemsContainer';
		m_content.appendChild(outputEl);
	};
	this.request = function(noCache) {
		outputEl.innerHTML = App.Lang.loadModuleData;
		new Ajax.Request(this.getUrl(noCache), {
			method: 'get',
			onSuccess: this.gotData.bind(this),
			onFailure: this.noGotData.bind(this)
		});
	};
	this.gotData = function(trans) {
		if (!trans || !trans.responseText || !trans.responseXML || trans.responseXML.documentElement == null) this.info(App.Lang.notWellFormed);
		
		var getData = function(item) {
			var data = {};
			for (var j=0; j<keys.length; j++) {
				data[keys[j]] = item.getAttribute(keys[j]);
			}
			for (var j=0; j<item.childNodes.length; j++) {
				if (item.childNodes[j].nodeType == 4) {
					data.value = item.childNodes[j].data || item.childNodes[j].text;
					break;
				}
			}
			return data;
		}
		
		var items = trans.responseXML.documentElement.getElementsByTagName("data");
		var arr = [];
		if (items && items.length) {
			arr.push('<ul>');
			for (var i=0; i<items.length; i++) {
				if (i >= 10) break;
				var itemData = getData(items[i]);
				arr.push('<li>');
				arr.push('<a href="'+ itemData.value +'" target="_blank" title="' + itemData.title + '">' + (itemData.style ? '<strong>' : '') + itemData.time + ' ' + itemData.title + (itemData.style ? '</strong>' : '') + '</a></li>');
			}
			arr.push('</ul>');
		} else {
			arr.push('暂无任何公告');
		}
		
		this.info(arr.join(''));
		this.loaded();
	};
	
	this.noGotData = function(trans) {
		this.info(App.Lang.notWellFormed);
		this.loaded();
	};
	this.info = function(info) {
		outputEl.innerHTML = info;
	};
	
	this.initialize = function() {
		this.build();
		this.request(App.Permit.editModule);
	};
	this.refresh = function() {
		this.request(App.Permit.editModule);
	};
	this.destroy = function() {
		outputEl.innerHTML = '';
		Element.remove(outputEl);
		outputEl = null;
	};
};
registerWidget('tl_notice');