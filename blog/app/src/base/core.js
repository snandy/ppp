if(!SohuBlog)var SohuBlog = {};
SohuBlog.App = {
	appPath:'app',ajaxPath:'a',canvasId:'canvas',
	getAppInfo : function(){
		var href = window.location.pathname + window.location.search;
		var hash = this.getHash();
		if(href.indexOf('#') != -1)
			href = href.substring(0,href.indexOf('#'));
		if(hash != ''){
			hash = hash.substring(1);
		}
		
		var appName = href.substring(href.indexOf(this.appPath)+this.appPath.length+1);
		appName = appName.substring(0,appName.indexOf('/'));
		return {'href':href,'hash':hash,'appName':appName};
	},
	getHash : function() {
		var matches = window.location.toString().match(/^[^#]*(#.+)$/);
		if (matches) {
			return matches[1];
		} else {
			return '';
		}
	},
	getView : function(){
		var appInfo = this.getAppInfo();
		if(appInfo.appName == ''){return}
		var url;
		if(appInfo.hash != ''){
			url = appInfo.hash;
		}else{
			url = appInfo.href;
		}
		if(!this.isAppInternalHref(url)){
			//window.location = url;
			this.on404();
			return;
		}
		
		var prefPath = '/'+this.ajaxPath;
		if(url != '' && url.indexOf(prefPath+'/') != 0){
			url = prefPath + url;
		}
		new Ajax.Request(url,{
			method:'get',
			parameters:'',
			onComplete:function(response){
				if(response.status == 200){
					eval("var json="+response.responseText);
	          		if(json){
	          			if(json.status == 1){
	          				if(json.data.page_title){
	          					top.document.title = json.data.page_title;
	          				}
	          				$(this.canvasId).innerHTML = json.data.view;
	          				setTimeout(this.bindHrefEvent.bind(this),0);
	          				if(json.onload){
	          					var sources = json.onload;
	          					sources.each(function(oSource){
	          						if(oSource.type == 'javascript'){
	          							if(oSource.text){
	          								eval(oSource.text);
	          							}
	          						}
	          					})
	          				}
	          				return;
	          			}else{
	          				Mini.MsgBox.alert(json.statusText);
	          				return;
	          			}
	          		}
	          		this.errorView();
				}else{
					this.errorView(response.status);return;
				}
			}.bind(this)
		})
	},
	isNormalHref:function(href){
		if(href && href != '' && href.indexOf('#') != 0 && href.indexOf('javascript') != 0){
			return true;
		}
		return false;
	},
	isAppInternalHref:function(href){
		var appName = this.getAppInfo().appName;
		if(href.indexOf('/'+this.appPath+'/'+appName+'/') == 0 || href.indexOf('/'+this.ajaxPath+'/'+this.appPath+'/'+appName+'/') == 0){
			return true;
		}
		return false;
	},
	getRelativePath:function(href){
		if(href.indexOf('http://'+window.location.hostname) == 0){
			href = href.substring(href.indexOf('http://')+'http://'.length);
			href = href.substring(href.indexOf('/'));
		}
		return href;
	},
	getLinkEle:function(oEle){
		while(oEle.tagName.toLowerCase() != 'a' ||oEle.tagName.toLowerCase() == 'body'){
			oEle = oEle.parentNode;
		}
		if(oEle.tagName.toLowerCase() == 'body' || oEle.tagName.toLowerCase() != 'a'){
			return null;
		}
		return oEle;
	},
	bindHrefEvent:function(){
		var as = $(this.canvasId).getElementsByTagName('a');
		for(var i=0;i<as.length;i++){
			var a = as[i];
			var href = this.getRelativePath(a.getAttribute('href'));
			if(this.isNormalHref(href) && this.isAppInternalHref(href)){
				Event.observe(a,'click',function(event){
					var srcEle = Event.element(event);
					srcEle = this.getLinkEle(srcEle);
					var href = this.getRelativePath(srcEle.getAttribute('href'));
					window.location.hash = href;
					this.getView();
					Event.stop(event); 
					return false;
				}.bindAsEventListener(this))
			}
		}
	},
	errorView:function(code){
		if(code && code == 404){
			this.on404();return;
		}
		$(this.canvasId).innerHTML = '<div class="main"><div class="mytip" style="margin:20px;">由于处星人的入侵，暂时无法显示好友，请博友保持淡定，稍后再试</div></div>';
	},
	on404:function(){
		$(this.canvasId).innerHTML = '<div class="main"><div class="mytip" style="margin:20px;">您访问了一个不存在的地址 <a href="'+this.getAppInfo().href+'">回到首页</a></div></div>';
	}
	
};
Event.observe(window,'load',function(){SohuBlog.App.getView()});