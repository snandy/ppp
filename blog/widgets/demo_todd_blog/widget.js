/******* Todd_Blog Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-03-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Demo_Todd_Blog = function(m_data, m_content, m_edit){
	var url = 'http://www.todd-lee.com/blog/';
	//var rss = 'test.xml';
	var rss = 'http://www.todd-lee.com/blog/feed.asp';
	var rndUpdateTime = Math.round(60*1000*Math.random());
	var intervalTime = 20*60*1000 + rndUpdateTime;
	var intervalObj;
	var elmOutput;
	var request;
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
	this.save(data);
	this.onload();
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
	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		Element.addClassName(elmOutput, 'itemsContainer');
		
		var elmAdd = document.createElement('div');
		Element.addClassName(elmAdd, 'rssTitle');
		var elmLink = document.createElement("a");
		elmLink.href = url;
		elmLink.target = '_blank';
		elmLink.innerHTML = 'Go to Todd Lee Blog';
		elmAdd.appendChild(elmLink);
		
		m_content.appendChild(elmAdd);
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		elmOutput.innerHTML = App.Lang.loadModuleData;
		var url = rss;
		var options = {
			nocache: noCache,
			onComplete: this.showContent.bind(this)
		};
		request = new App.ImpFile(url, options);
	}
	this.showContent = function(request) {
		var xmlDom = request.responseXML;
		var items = xmlDom.getElementsByTagName('item');
		elmOutput.innerHTML = '';
		$A(items).each(function(i){
			var title = Element.getChildValueByTagName(i, 'title')[0];
			var link = Element.getChildValueByTagName(i, 'link')[0];
			var cate = Element.getChildValueByTagName(i, 'category')[0];
			var author = Element.getChildValueByTagName(i, 'author')[0];
			var pubDate = Element.getChildValueByTagName(i, 'pubDate')[0];
			var description = Element.getChildValueByTagName(i, 'description')[0];
			
			var elmItem = document.createElement('div');
			Element.addClassName(elmItem, 'item');
			
			var elmTitle = document.createElement('h3');
			var elmLink = document.createElement("a");
			elmLink.href = link;
			elmLink.target = "_blank";
			elmLink.innerHTML = title;
			elmTitle.appendChild(elmLink);
			
			var elmInfo = document.createElement('div');
			Element.addClassName(elmInfo, 'itemInfo');
			elmInfo.innerHTML = 'author: '+ author +' | '+ pubDate;
			
			var elmDesc = document.createElement('div');
			Element.addClassName(elmDesc, 'itemDesc');
			elmDesc.innerHTML = description;
			
			
			elmItem.appendChild(elmTitle);
			elmItem.appendChild(elmInfo);
			elmItem.appendChild(elmDesc);
			
			var elmSpacer = document.createElement('hr');
			
			elmOutput.appendChild(elmItem);
			elmOutput.appendChild(elmSpacer);
		}.bind(this));
		this.loaded();
	}
};
registerWidget('Demo_Todd_Blog');
