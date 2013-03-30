/******* Rss Reader Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-14
//	Last Update: 2006-03-31
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Demo_RSSReader = function(m_data, m_content, m_edit){
	var defaultNum = 10;
	if (m_data) {
		var rss = getFullUrl(m_data.url.trim());
		var num = m_data.num || defaultNum;
	}
	var rndUpdateTime = Math.round(60*1000*Math.random());
	var intervalTime = 20*60*1000 + rndUpdateTime;
	var intervalObj;
	var elmOutput;
	var elmOutputE;
	var request;
	var feed;
/*	
	this.initialize = function() {
		//...
	};
	this.edit = function() {
		//...
	};
	this.onCloseEdit = function() {
		//...
	};
	this.refresh = function() {
		//...
	};
	this.destory = function() {
		//...
	};
	this.save(Object: data);
	this.loaded();
	this.setIco(String: src);
	this.setTitle(String: title);
*/
	this.initialize = function() {
		this.build();
		this.updateData();
		intervalObj = setInterval(this.updateData.bind(this), intervalTime);
	};
	this.destroy = function() {
		clearInterval(intervalObj);
		request = null;
	};
	this.refresh = function() {
		this.updateData(true);
	};
	this.edit = function() {
		this.buildEdit();
	};
	
	
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="40px">'+ App.Lang.rssUrl +': </td>';
		str += '<td><input type="text" name="rssUrl" value="'+ (rss || '') +'" class="input-text" /></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.rssNum +': </td>';
		str += '<td><select name="rssNum">'+ getOptionList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="input-button" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		this.rssIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		this.numIpt = elmOutputE.firstChild.rows[1].cells[1].firstChild;
		this.saveBtn = elmOutputE.firstChild.rows[2].cells[1].firstChild;
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.saveData = function() {
		if (rss == getFullUrl($F(this.rssIpt).trim()) && num == $F(this.numIpt)) return;
		lastRss = rss;
		rss = getFullUrl($F(this.rssIpt).trim());
		num = $F(this.numIpt) || num || defaultNum;
		var data = new Object();
		data.url = rss;
		data.num = num;
		this.save(data);
		if (lastRss != getFullUrl($F(this.rssIpt).trim())) {
			this.updateData();
		}
		else {
			this.showContent();
		}
	};
	this.build = function() {
		elmOutput = document.createElement('div');
		Element.addClassName(elmOutput, 'itemsContainer');
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if (!rss) {
			elmOutput.innerHTML = App.Lang.setRssFirst;
			return;
		}
		elmOutput.innerHTML = App.Lang.loadModuleData;
		this.setTitle(App.Lang.loadModuleData);
		var url = rss;
		var options = {
			nocache: noCache || false,
			onComplete: this.analyseContent.bind(this)
		};
		request = new App.ImpFile(url, options);
		this.getIco();
	};
	this.analyseContent = function(request) {
		this.loaded();
		if (request.responseText == '' || request.responseXML.documentElement==null) {
			this.setTitle(App.Lang.error);
			elmOutput.innerHTML = App.Lang.analyseFileError;
			return;
		}
		Element.cleanWhitespace(request.responseXML.documentElement);
		feed = new Feed(request);
		this.showContent();
	};
	this.showContent = function() {
		if (!feed || !feed.title) return;
		var title = '<a href="'+ feed.htmlUrl +'" target="_blank" title="'+ feed.title +'">'+ feed.title +'</a>';
		this.setTitle(title);
		
		elmOutput.innerHTML = '';
		var elmUl = document.createElement('ul');
		$A(feed.items).each(function(it, i){
			if (i >= num) throw $break;
			var elmItem = document.createElement('li');
			var elmLink = document.createElement("a");
			elmLink.href = it.link;
			elmLink.target = "_blank";
			elmLink.title = it.title.trim();
			elmLink.appendChild(document.createTextNode(it.title.trim()));
			
			elmItem.appendChild(elmLink);
			//elmItem.appendChild(document.createTextNode(it.date));
			
			elmUl.appendChild(elmItem);
		}.bind(this));
		elmOutput.appendChild(elmUl);
		this.buildEdit();
	};
	this.getIco = function() {
		reg = new RegExp("^http:\/\/([^\/])*\/","gi");
		var icoUrl = reg.exec(rss)[0] +'favicon.ico';
		var tmp = document.createElement('img');
		tmp.onload = function() {
			this.setIco(icoUrl);
		}.bind(this);
		tmp.src = icoUrl;
	};
	function getOptionList() {
		if (feed) {
			var str = '';
			$A(feed.items).each(function(it, i){
				if ((i+1) == num) {
					str += '<option value="'+(i+1)+'" selected>'+ (i+1) +'</option>';
				} else {
					str += '<option value="'+(i+1)+'">'+ (i+1) +'</option>';
				}
			});
			return str;
		}
	}
};
registerWidget('Demo_RSSReader');