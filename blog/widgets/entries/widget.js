/******* Entry List Widget **********/
//	Author: chenqj
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var entries = function(m_data, m_content, m_edit){
	if (_sff) {
		var dataUrl = '/sff/entries/'+ _ebi +'.html';
	}
	else {
		var dataUrl = '/action/v_frag-ebi_' + _ebi + '-sff_true/entry/';
		//var dataUrl = '/action/ebi_' + _ebi + '-m_view-type_entries/widget/';
	}
	var request_entries;
	var elmOutput;
	//var ITEM_PREFIX = 'itemId_';
	//var ITEMCMTCOUNT_PREFIX = 'itemCmtCount_';

	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		request_entries = null;
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		Entries.clearReadCount();
		this.updateData(true);
	};
	this.build = function() {
		if(App.Permit.editModule){
			var divAdd = document.createElement('div');
			Element.addClassName(divAdd, 'entriesAdd');
			var str = '';
			str += '<a href="http://blog.sohu.com/manage/entry.do?m=add&t=shortcut" target="_blank" onmousedown="CA.q(\'blog_widget_entries_write\');">';
			str += '<img src="'+ App.Actions.imgPath +'ico_write.gif" />';
			str += '撰写新日志';
			str += '</a> | ';
			str += '<a href="http://i.sohu.com/blog/home/entry/list.htm" target="_blank" onmousedown="CA.q(\'blog_widget_entries_manage\');">管理</a>';
			divAdd.innerHTML = str;
			m_content.appendChild(divAdd);
		}
		
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if ($('entriesData')) {
			this.loaded();
			elmOutput.innerHTML = $('entriesData').innerHTML;
			$('entriesData').innerHTML = '';
			Element.remove($('entriesData'));
		}
		else {
			elmOutput.innerHTML = App.Lang.loadModuleData;
			var options = {
				nocache: noCache,
				onComplete: this.showContent.bind(this)
			};
			if(App.Permit.editModule){
				var requestUrl = dataUrl + '?o=true&ca='+timeStamp();
			}else{
				var requestUrl = dataUrl;
			}
			
			request_entries = new App.ImpFile(requestUrl, options);
		}
	};
	this.showContent = function(request_entries) {
		this.loaded();
		if (request_entries.responseText == '') {
			this.setTitle(App.Lang.error);
			elmOutput.innerHTML = App.Lang.analyseFileError;
			return;
		}
		elmOutput.innerHTML = request_entries.responseText;
		if (App.Permit.ableLog) {
			$LT('Widget[entries] insertContent end');
		}
		Entries.insertItemOpr();
		Entries.insertItemCmtCount(jQuery('.entries-content')[0]);
		Entries.insertItemReadCount();
	};
	/*this.insertItemOpr = function () {
		if (!App.Permit.editModule) return;
		var items = [];
		items = document.getElementsByClassName('itemOpr');
		if (items.length <= 0) return;
		for (var i=0; i<items.length; i++) {
			if ( items[i] && items[i].id && (items[i].id.indexOf(ITEM_PREFIX)==0) ) {
				var itemId = items[i].id.substr(ITEM_PREFIX.length);
				var str = '';
				str += '<a href="http://blog.sohu.com/manage/entry.do?m=edit&id='+ itemId +'&t=shortcut" target="_blank">';
				str += '<img src="'+ App.Actions.imgPath +'ico_edit.gif" alt="编辑" />';
				str += '</a>';
				str += '<a href="http://blog.sohu.com/manage/entry.do?m=delete&id='+ itemId +'" onclick="return confirm(\'是否确认删除该日志？\')">';
				str += '<img src="'+ App.Actions.imgPath +'ico_del.gif" alt="删除" />';
				str += '</a>';
				if (!items[i].innerHTML)
					items[i].innerHTML = str;
			}
		}
	};*/
	/*this.insertItemCmtCount = function() {
		if(typeof eccs == 'undefined' || eccs == null) return;
		var items = [];
		items = document.getElementsByClassName('itemCmtCount');
		if (items.length <= 0) return;
		for (var i=0; i<items.length; i++) {
			var _item = items[i];
			if ( _item && _item.id && (_item.id.indexOf(ITEMCMTCOUNT_PREFIX)==0) ) {
				var itemId = _item.id.substr(ITEMCMTCOUNT_PREFIX.length);
				var _count = eccs[itemId];
				var str = '';
				if (!isNaN(_count)) {
					str += _count;
				}
				if (str && (!_item.innerHTML || _item.innerHTML == '?')) {
					_item.innerHTML = str;
				}
			}
		}
	};*/
};
registerWidget('entries');