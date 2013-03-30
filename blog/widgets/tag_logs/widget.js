/******* Music Album Widget **********/
//	Author: Jady
//	First Created: 2007-01-09
//	Last Update: 2007-01-22
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var tag_logs = function(m_data, m_content, m_edit, w_path){
	
	var wdtUrl = "http://ptag.blog.sohu.com/ptags/";
	var wdtBlogId = "";
	var wdtDataName = "BlogPtags.entries_";
	var wdtVn = "";
	
	var wdtEditUrl = "http://ptag.blog.sohu.com/btags/";
	var wdtEditName = "BlogPtags.tags_abc";
	
	var wdtMoreUrl = "";
	var wdtTagLink = "http://tag.blog.sohu.com/";
	
	var wdtTitle = "";
	var wdtTag = "";
	var wdtTitleEle = null;
	var wdtTagEle = null;
	
	var needConfig = true;
	
	var outputEle;
	var editEle;
	var wdtData;
	
	
	this.initParams = function() {
		//	wdtBlogId = "c1aa7d4792";
		wdtBlogId = _ebi;
		wdtUrl += wdtBlogId + "/";
		wdtEditUrl += wdtBlogId + "/all/";
		wdtVn = this.id;
		
		if(typeof(m_data) == "object") {
			wdtTitle = m_data.title;
			wdtTag = m_data.tag;
			
			wdtMoreUrl = _blog_base_url + "tag/" + wdtTag + "/";
			
			this.setTitle(wdtTitle);
			
			needConfig = false;
		}
		if(!wdtTitle) wdtTitle = this.getTitle();
	};
	this.showContent = function() {
		var str = '';
		
		if(wdtData.total && parseInt(wdtData.total) > 0) {
			str += '<ul class="logList">';
			for(var i=0; i<wdtData["entries"].length; i++) {
				var logNow = wdtData["entries"][i];
				var logTitle = logNow["title"];
				var logLink = logNow["permanLink"];
				var logTime = this.getFriendlyTime(logNow["timestamp"]);
				
				str += '<li>' + logTime + '&nbsp;|&nbsp;<a href="' + logLink + '" target="_blank" alt="' + logTitle + '" title="' + logTitle + '" class="title">' + logTitle + '</a></li>';
			}
			str += '</ul>';
			
			str += '<div style="clear: both;"></a>';
			str += '<div class="more"><a href="' + wdtMoreUrl + '" target="_blank">' + App.Lang.tag_moreLogs + '</a></div>';
		} else {
			str += App.Lang.tag_noLogs;
		}

		outputEle.innerHTML = str;
	};
	this.initEditElements = function() {
		m_edit.innerHTML = "";
		editEle = document.createElement("div");
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="45px">'+ App.Lang.modTitle +': </td>';
		str += '<td><input type="text" class="text" /></td>';
		str += '</tr><tr>';
		str += '<td width="45px">'+ App.Lang.tag_tag +': </td>';
		str += '<td><select style="width:120px;"><option value="">'+ App.Lang.loading +'</option></select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		editEle.innerHTML = str;
		m_edit.appendChild(editEle);
		
		wdtTitleEle = editEle.firstChild.rows[0].cells[1].firstChild;
		wdtTagEle = editEle.firstChild.rows[1].cells[1].firstChild;
		
		wdtTitleEle.value = wdtTitle;
		
		this.saveBtn = editEle.firstChild.rows[2].cells[1].firstChild;
		this.eventSaveData = this.onEditSave.bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
		
		setTimeout(this.requestEditData.bind(this,true), 10);
	};
	this.showEditContent = function() {
		var str = '';
		
		str += '<select style="width:120px;">';
		if(wdtEdit.length) {
			str += '<option value="" selected="selected">' + App.Lang.tag_selectTag + '</option>';
			for(var i=0; i<wdtEdit.length; i++) {
				var tagNow = wdtEdit[i];
				str += '<option value="'+tagNow["encode"]+'">'+tagNow["tag"]+' (' + wdtEdit[i]["count"] + 'ƪ)' +'</option>';
			}
		} else {
			str += '<option value="">'+App.Lang.tag_noTags+'</option>';
		}
		str += '</select>';
		
		var tmpElm = wdtTagEle.parentNode;
		tmpElm.innerHTML = str;
		wdtTagEle = tmpElm.firstChild;
		
		if(wdtTag) wdtTagEle.value = wdtTag;
		
		this.eventChangeTag = this.onTagChange.bindAsEventListener(this);
		Event.observe(wdtTagEle, "change", this.eventChangeTag);
	};
	this.onTagChange = function(e) {
		if (wdtTagEle.selectedIndex > 0) {
			var str = wdtTagEle.options[wdtTagEle.selectedIndex].text;
			str = "{" + str.substr(0, str.indexOf("(")-1) + "}";
			wdtTitleEle.value = str;
		}
	};
	this.onEditSave = function(e) {
		if($F(wdtTitleEle).length == 0) {
			alert(App.Lang.tag_needInputTitle);
			wdtTitleEle.focus();
			return false;
		}
		if($F(wdtTitleEle).length > 8) {
			var str = App.Lang.modTitleTooLong+'('+$F(wdtTitleEle).length+App.Lang.word+')';
			str += '\n'+App.Lang.reduceTo+'8'+App.Lang.word;
			alert(str);
			$(wdtTitleEle).focus();
			return;
		}
		
		var needUpdate = false;
		var needSave = false;
		var newTitle = wdtTitleEle.value.unescapeHTML();
		if(wdtTitle != newTitle) {
			wdtTitle = newTitle;
			needSave = true;
			this.setTitle(wdtTitle);
		}
		if(wdtTag != wdtTagEle.value) {
			wdtTag = wdtTagEle.value;
			needUpdate = true;
			needSave = true;
			
			wdtMoreUrl = _blog_base_url + "tag/" + wdtTag + "/";
		}
		
		if(needSave) {
			var data = {
				title: wdtTitle,
				tag: wdtTag
			};
			this.save(data);
		}
		
		if(needUpdate) {
			this.requestData(true);
		} else {
			this.closeEdit();
			return true;
		}
	};
	
	
	this.initElement = function() {
		m_content.innerHTML = "";
		
		outputEle = document.createElement("div");
		m_content.appendChild(outputEle);
	};
	this.requestData = function(noCache) {
		if(!outputEle) this.initElement();
		outputEle.innerHTML = App.Lang.loadModuleData;
		
		var dataURL = this.getRequestUrl();
		if(noCache) {
			wdtData = null;
		}
		
		new LinkFile(dataURL, {
			type: 'script',
			noCache: noCache,
			callBack: {
				variable: wdtDataName+wdtVn,
				onLoad: this.loadedData.bind(this),
				onFailure: this.noData.bind(this)
		}});
	};
	this.loadedData = function(canRefresh) {
		wdtData = BlogPtags["entries_" + wdtVn];
		//	wdtMoreUrl = "http://blog.sohu.com/action/m_list-" + wdtBlogId + "-" + wdtTag + "/entry/";
		this.showContent();
		this.loaded();
	};
	this.noData = function() {
		outputEle.innerHTML = App.Lang.fileNotFound;
		this.loaded();
	};
	this.initialize = function() {
		this.initParams();
		if(needConfig) {
			m_content.innerHTML = App.Permit.editModule?App.Lang.tag_notInitLogs:App.Lang.hasNotSetParm;
		} else {
			this.initElement();
			this.requestData(App.Permit.editModule);
		}
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
	this.requestEditData = function(noCache) {
		var dataUrl = wdtEditUrl;
		if(noCache) {
			wdtEdit = null;
		}
		new LinkFile(dataUrl, {
			type: 'script',
			noCache: noCache,
			callBack: {
				variable: wdtEditName,
				onLoad: this.loadEditData.bind(this),
				onFailure: this.noEditData.bind(this)
		}});
	};
	this.noEditData = function() {
		m_edit.innerHTML = App.Lang.fileNotFound;
	};
	this.loadEditData = function() {
		wdtEdit = BlogPtags.tags_abc;
		this.showEditContent();
	};
	this.formatStr = function (str, length) {
		if(typeof(length) == "number" && length > 0) str = str.substr(0, length);
		str = str.replace(/\r|\n/gi, "").replace(/"/g, "&quot;");
		return str;
	};
	this.getRequestUrl = function() {
		var str = wdtUrl + wdtTag + "/" + wdtVn + "/";
		return str;
	};
	this.getFriendlyTime = function(time) {
		var date = new Date();
		date.setTime(time);
		var month = date.getMonth() + 1;
		if(month < 10) month = "0" + month;
		var day = date.getDate();
		if(day < 10) day = "0" + day;
		var dateStr = month + "-" + day;
		return dateStr;
	};
};
registerWidget("tag_logs");