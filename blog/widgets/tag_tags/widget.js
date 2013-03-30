/******* Music Album Widget **********/
//	Author: Jady
//	First Created: 2007-01-09
//	Last Update: 2007-01-22
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var tag_tags = function(m_data, m_content, m_edit, w_path){
	
	var wdtUrl = 'http://ptag.blog.sohu.com/btags/';
	var wdtBlogId = "";	
	var wdtDataName = "";
	
	var wdtTagLink = "";
	
	var wdtSort = "0";
	var wdtSortSelect = null;
	var levelCounts = [0];
	
	var outputEle;
	var editEle;
	var wdtData;
	var wdtEdit;
	
	
	this.initParams = function() {
		//	wdtBlogId = "c1aa7d4792";
		wdtBlogId = _ebi;
		wdtUrl += wdtBlogId + "/";
		wdtTagLink = _blog_base_url + "tag/";
		
		if(typeof(m_data) == "object") {
			wdtSort = m_data.sort;
		}
	};
	this.showContent = function() {
		var str = '';
		
		if(wdtData.length) {
			if (wdtSort == "1") {
				str += '<table>';
				for (var i=0; i<wdtData.length; i++) {
					var tagNow = wdtData[i];
					var tagName = tagNow["tag"];
					var tagEncode = tagNow["encode"];
					var count = tagNow["count"];
					var level = tagNow["level"];
					var tagLink = wdtTagLink + tagEncode + "/";
					
					str += '<tr><td><a href="' + tagLink + '" target="_blank" alt="' + tagName + '" title="' + tagName + '">' + tagName + '</a></td><td>&nbsp;&nbsp;--&nbsp;&nbsp;</td><td>' + count + 'Æª</td></tr>';
				}
				str += '</table>';
			} else {
				wdtData = PTags.getLevels(wdtData);
				
				str += '<ul>';
				for(var i=0; i<wdtData.length; i++) {
					var tagNow = wdtData[i];
					var tagName = tagNow["tag"];
					var tagEncode = tagNow["encode"];
					var count = tagNow["count"];
					var level = tagNow["level"];
					var tagLink = wdtTagLink + tagEncode + "/";
					
					if(i > 0) str += ' ';
					str += '<li class="cloud tag_popular_' + level + '"><a href="' + tagLink + '" target="_blank" alt="' + count + 'Æª" title="' + count + 'Æª">' + tagName + '</a></li>';
				}
				str += '</ul>';
			}
		} else {
			if(App.Permit.editModule) {
				str += App.Lang.tag_noTags;
			} else {
				str += App.Lang.tag_noTagsForUser;
			}
		}

		outputEle.innerHTML = str;
	};
	this.initEditElements = function() {
		m_edit.innerHTML = "";
		editEle = document.createElement("div");
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="60px">'+ App.Lang.tag_sort +': </td>';
		str += '<td><select><option value="0">ÔÆ</option><option value="1">ÁÐ±í</option></select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		editEle.innerHTML = str;
		m_edit.appendChild(editEle);
		
		wdtSortSelect = editEle.firstChild.rows[0].cells[1].firstChild;
		
		wdtSortSelect.value = wdtSort;
		
		this.saveBtn = editEle.firstChild.rows[1].cells[1].firstChild;
		this.eventSaveData = this.onEditSave.bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.onEditSave = function(e) {
		wdtSort = wdtSortSelect.value;
		var data = {
			sort: wdtSort
		};
		
		this.save(data);
		this.requestData(true);
	};
	
	
	this.initElement = function() {
		m_content.innerHTML = "";
		
		outputEle = document.createElement("div");
		m_content.appendChild(outputEle);
	};
	this.requestData = function(noCache) {
		outputEle.innerHTML = App.Lang.loadModuleData;
		
		var dataURL = this.getRequestUrl();
		if(noCache) {
			wdtData = null;
		}
		
		new LinkFile(dataURL, {
			type: 'script',
			noCache: noCache,
			callBack: {
				variable: (wdtSort=="1")?"BlogPtags.tags_count":"BlogPtags.tags_abc",
				onLoad: this.loadedData.bind(this),
				onFailure: this.noData.bind(this)
		}});
	};
	this.loadedData = function(canRefresh) {
		wdtData = (wdtSort=="1")?BlogPtags.tags_count:BlogPtags.tags_abc;
		this.showContent();
		this.loaded();
	};
	this.noData = function() {
		outputEle.innerHTML = App.Lang.fileNotFound;
		this.loaded();
	};
	this.initialize = function() {
		this.initParams();
		this.initElement();
		this.requestData(App.Permit.editModule);
	};
	this.destroy = function() {
		if(outputEle) Element.remove(outputEle);
		m_content.innerHTML = "";
	};
	this.refresh = function() {
		this.requestData(true);
	};
	
	this.edit = function() {
		this.initEditElements();
	};
	this.getRequestUrl = function() {
		var str = wdtUrl + (wdtSort=="1"?"cs/":"");
		return str;
	};
};
registerWidget("tag_tags");