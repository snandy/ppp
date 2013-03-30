/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-03-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var refer = function(m_data, m_content, m_edit){
	var request_refer;
	var elmOutput;
	var referScriptMaxLoadTime = 10000;
	var referScriptLoadTime = 0;
	
	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		request_refer = null;
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		this.updateData(true);
	};
	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		Element.addClassName(elmOutput, 'refer');
		Event.observe(elmOutput, 'mousedown', function(){CA.q('blog_widget_refer_content');});
		
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if (_blog_domain == 'null') {
			elmOutput.innerHTML = App.Permit.editModule ? '新来的吧，还没有人发现你哦。<a href="http://blog.sohu.com/morefreshblogs.html" target="_blank">快去和大家打个招呼吧！</a>' : '没有最近访客';
		} else {
			var referUrl = 'http://stat.pic.sohu.com/blogcount?u='+_blog_domain+'&k=rv';
			new LinkFile(referUrl,{type:'script'});
			this.loadReferIds(noCache);
		}
	}
		
	this.loadReferIds = function(noCache) {
		if (typeof referid == 'undefined' || referid == '') {
			this.loaded();
			if(referScriptLoadTime < referScriptMaxLoadTime){
				referScriptLoadTime += 100;
				setTimeout(this.loadReferIds.bind(this, noCache), 100);
			}else{
				elmOutput.innerHTML = '无法获得最近访客数据';
			}
			return;
		}	
		elmOutput.innerHTML = App.Lang.loadModuleData;
		
		var me = this,
			url = 'http://stat.i.sohu.com/guest/frag/blogrecents.do?xpt=' + _upt + '&type=0';

		jQuery.getJSON(url + '&callback=?', function(json){
			me.loaded();
			if (json.msg === 'success') {
				elmOutput.innerHTML = me.buildHTML(json.data.list);
			}else {
				me.setTitle(App.Lang.error);
				elmOutput.innerHTML = App.Lang.analyseFileError;
			}

		});

	};
	this.buildHTML = function(data) {
		var ary = [];
		for(var i=0, len=data.length; i<len; i++) {
			ary.push(this.buildOne(data[i]));
		}
		return ary.join('');
	};
	this.buildOne = function(obj) {
		var ary = [];
		ary.push('<div class="referItem">');
		ary.push('<div class="referIco"><a target="_blank" href="');
		ary.push(obj.blog + '"><img src="' + obj.photo + '"></a>');
		ary.push('</div><a title="' + obj.nick + '" target="_blank" href="' + obj.blog + '">');
		ary.push('<span>' + obj.nick + '</span><br>' + getIntervalTime(obj.visittime));
		ary.push('</a></div>');
		return ary.join('');
	};

};
registerWidget('refer');
