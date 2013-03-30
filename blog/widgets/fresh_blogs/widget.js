/******* Fresh Blogs Widget **********/
//	Author: chenqj
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var fresh_blogs = function(m_data, m_content, m_edit){
	var intervalObj;
	var rndUpdateTime = Math.round(60*1000*Math.random());
	var intervalTime = 20*60*1000 + rndUpdateTime;
	var dataUrl = '/inc/fresh_blogs_plus.inc';
	var request_fb;
	var elmOutput;
	
	this.initialize = function() {
		this.build();
		this.updateData();
		intervalObj = setInterval(this.updateData.bind(this), intervalTime);
	};
	this.destroy = function() {
		clearInterval(intervalObj);
		request = null;
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		this.updateData(true);
	};
	this.build = function() {
		
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		m_content.appendChild(elmOutput);
		
		var _hr = document.createElement('hr');
		m_content.appendChild(_hr);
		
		
		var divLink = document.createElement('div');
		divLink.style.textAlign = 'center';
		divLink.innerHTML = '<a href="http://blog.sohu.com/morefreshblogs.html" target="_blank">最近更新的200位博客</a>';
		m_content.appendChild(divLink);
	};
	this.updateData = function(noCache) {
		elmOutput.innerHTML = App.Lang.loadModuleData;
		var options = {
			nocache: noCache,
			onComplete: this.showContent.bind(this)
		};
		request_fb = new App.ImpFile(dataUrl, options);
	}
	this.showContent = function(request_fb) {
		this.loaded();
		if (request_fb.responseText == '') {
			this.setTitle(App.Lang.error);
			elmOutput.innerHTML = App.Lang.analyseFileError;
			return;
		}
		var str = '';
		str += request_fb.responseText;
		elmOutput.innerHTML = str;
	}
};
registerWidget('fresh_blogs');