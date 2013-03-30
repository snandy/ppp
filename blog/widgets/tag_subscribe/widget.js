/******* Music Album Widget **********/
//	Author: Jady
//	First Created: 2007-01-09
//	Last Update: 2007-01-22
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var tag_subscribe = function(m_data, m_content, m_edit, w_path){
	
	var wdtUrl = "http://tag.blog.sohu.com/search?";
	var wdtVn = "";
	var wdtDataName = "blogTag.posts";
	var wdtEncodeName = "blogTag.encode";
	
	var wdtMoreUrl = "";
	var wdtTagLink = "http://tag.blog.sohu.com/";
	
	var wdtTitle = "";
	var wdtTag = "";
	var wdtTagEncode = "";
	var wdtCount = 10;
	var wdtTitleEle = null;
	var wdtTagEle = null;
	var wdtCountEle = null;
	
	var needConfig = true;
	
	var outputEle;
	var editEle;
	var wdtData;
	var wdtEdit;
	
	
	this.initParams = function() {
		wdtMoreUrl = "http://tag.blog.sohu.com/";
		
		wdtVn = this.id;
		
		if(typeof(m_data) == "object") {
			wdtTitle = m_data.title;
			wdtTag = m_data.tag;
			wdtCount = m_data.count;
			
			this.setTitle(wdtTitle);
			
			needConfig = false;
		}
		if(!wdtTitle) wdtTitle = this.getTitle();
	};
	this.showContent = function() {
		outputEle.innerHTML = "";
		if(wdtData.length) {
			var ul = document.createElement("ul");
			ul.className = "logList";
			for(var i=0; i<wdtData.length; i++) {
				var logNow = wdtData[i];
				var logPermlink = logNow["permlink"];
				var logTitle = logNow["title"].unescapeHTML();
				var logExcerpt = logNow["excerpt"].unescapeHTML();
				var logBlogName = logNow["blog_name"].unescapeHTML();
				var logTags = this.getTagsStr(logNow["tags"]);
				var logPub = this.getFriendlyTime(logNow["pub"]);
				
				var li = document.createElement("li");
				li.innerHTML = '<img src="'+ App.Actions.imgPath +'arrowList.gif" /><a class="title" href="' + logPermlink + '" target="_blank">' + logTitle + '</a> <span class="time">-&nbsp;' + logPub + '</span>';
				ul.appendChild(li);
				
				var tipStr = '';
				tipStr += '<div><strong>' + logTitle + '</strong></div>';
				tipStr += '<div style="padding:0 3px;border-bottom:1px solid #ccc;margin-bottom:5px;color:#999"> <span style="font-family: Arial, Helvetica, sans-serif;font-size: 12px;color: #000000;">'+ logBlogName +'</span>&nbsp;&nbsp;<span style="font-family: Arial, Helvetica, sans-serif;font-size: 10px;color: #999;">'+ logPub +'</span></div>';
				tipStr += '<div>±Í«©£∫' + logTags + '</div>';
				tipStr += '<div>'+ logExcerpt +'</div>';
				li.tipInfo = tipStr;
				
				li.onmouseover = (function() {
					new App.ToolTip(this, this.tipInfo, 250, "left");
					$('tooltip').style.display = "none";
					this.timeID = setTimeout(function(){$('tooltip').style.display = "";}, 500);
				}).bind(li);
				li.onmouseout = (function(){clearTimeout(this.timeID);}).bind(li);
			}
			outputEle.appendChild(ul);
			
			var footDiv = document.createElement("div");
			footDiv.className = "more";
			footDiv.innerHTML = '<a href="' + wdtMoreUrl + wdtTagEncode + '/" target="_blank">' + App.Lang.tag_moreSubscribe + '</a>';
			outputEle.appendChild(footDiv);
		} else {
			outputEle.innerHTML = App.Lang.tag_noSubscribe;
		}
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
		str += '<td><input type="text" class="text" /></td>';
		str += '</tr><tr>';
		str += '<td width="45px">'+ App.Lang.tag_count +': </td>';
		str += '<td><select></select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		editEle.innerHTML = str;
		m_edit.appendChild(editEle);
		
		wdtTitleEle = editEle.firstChild.rows[0].cells[1].firstChild;
		wdtTagEle = editEle.firstChild.rows[1].cells[1].firstChild;
		wdtCountEle = editEle.firstChild.rows[2].cells[1].firstChild;
		
		wdtTitleEle.value = wdtTitle;
		wdtTagEle.value = wdtTag;
		for(var i=0; i<10; i++) {
			wdtCountEle.options[i] = new Option(i+1, i+1);
		}
		wdtCountEle.value = wdtCount;
		
		Event.observe(wdtTagEle, "keyup", this.onChangeTag.bind(this));
		this.saveBtn = editEle.firstChild.rows[3].cells[1].firstChild;
		this.eventSaveData = this.onEditSave.bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.onChangeTag = function() {
		var value = wdtTagEle.value.unescapeHTML().replace(/[^a-zA-Z0-9,\s\u0391-\uFFE5]+/img,"").replace(/[,\uFF0C\s]+/g," ").replace(/(^\s*)|(\s*$)/g,"");
		if (value.length > 2) {
			value = value.substr(0, 2);
		}
		wdtTitleEle.value = value + "--±Í«©∂©‘ƒ";
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
		var newTag = wdtTagEle.value.unescapeHTML().replace(/[^a-zA-Z0-9,\s\u0391-\uFFE5]+/img,"").replace(/[,\uFF0C\s]+/g," ").replace(/(^\s*)|(\s*$)/g,"");
		if(newTag == "") {
			alert(App.Lang.tag_needInputTags);
			wdtTagEle.focus();
			return false;
		}
		
		var needUpdate = false;
		var needSave = false;
		var newTitle = wdtTitleEle.value.unescapeHTML();
		if(wdtTitle != newTitle) {
			wdtTitle = newTitle;
			needSave = true;
			this.setTitle(wdtTitle);
		}
		if(wdtTag != newTag) {
			wdtTag = newTag;
			needUpdate = true;
			needSave = true;
		}
		if(wdtCount != wdtCountEle.value) {
			wdtCount = wdtCountEle.value;
			needUpdate = true;
			needSave = true;
		}
		
		if(needSave) {
			var data = {
				title: wdtTitle,
				tag: wdtTag,
				count: wdtCount
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
		outputEle.className = "container";
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
				variable: wdtDataName + wdtVn,
				onLoad: this.loadedData.bind(this),
				onFailure: this.noData.bind(this)
		}});
	};
	this.loadedData = function(canRefresh) {
		wdtData = blogTag["posts" + wdtVn];
		wdtTagEncode = blogTag["encode" + wdtVn]["encode"];
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
			m_content.innerHTML = App.Permit.editModule?App.Lang.tag_notInitSubscribe:App.Lang.hasNotSetParm;
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
	this.getRequestUrl = function() {
		var str = wdtUrl + "type=tag&f=json&q=" + escape(wdtTag) + "&count=" + wdtCount + "&vn=" + wdtVn;
		return str;
	};
	this.getFriendlyTime = function(time) {
		return getIntervalTime(time);
	};
	this.getTagsStr = function(tags) {
		var str = "";
		for(var i=0; i<tags.length; i++) {
			if(i>0) str += '&nbsp;';
			str += '<a href="' + wdtTagLink + tags[i] + '/" target="_blank">' + tags[i] + '</a>';
		}
		return str;
	};
};
registerWidget("tag_subscribe");