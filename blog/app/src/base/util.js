if(!SohuBlog)var SohuBlog = {};
SohuBlog.Util = {
	loadJs:function(jsPath){
		var loadedPath = this.getLoadedJsPath();
		var loaded = false;
		for(var i=0;i<loadedPath;i++){
			if(loadedPath[i] == jsPath){
				loaded = true;
			}
		}
		if(!loaded){
			var newScript = document.createElement('script');
			newScript.src = jsPath;
			document.getElementsByTagName('head')[0].appendChild(newScript);
		}
	},
	getLoadedJsPath:function(){
		var loadedJs = document.getElementsByTagName('script');
		var loadedPath  = [];
		for(var i=0;i<loadedJs.length;i++){
			if(loadedJs[i].getAttribute('src') && loadedJs[i].getAttribute('src') != ''){
				loadedPath.push(loadedJs[i].getAttribute('src'));
			}
		}
		
		return loadedPath;
	},
	loadCss:function(path){
		var loadedPath = this.getLoadedCssPath();
		var loaded = false;
		for(var i=0;i<loadedPath;i++){
			if(loadedPath[i] == jsPath){
				loaded = true;
			}
		}
		if(!loaded){
			var newCss = document.createElement('link');
			newCss.type = 'text/css';
			newCss.href = jsPath;
			document.getElementsByTagName('head')[0].appendChild(newScript);
		}
	},
	getLoadedCssPath:function(){
		var loadedCss = document.getElementsByTagName('link');
		var loadedPath  = [];
		for(var i=0;i<loadedCss.length;i++){
			if(loadedCss[i].getAttribute('type') == 'text/css' && loadedCss[i].getAttribute('href') && loadedJs[i].getAttribute('href') != ''){
				loadedPath.push(loadedCss[i].getAttribute('href'));
			}
		}
		
		return loadedPath;
	},
	inArr:function(arr,item){
		if(typeof arr == 'array' || typeof arr == 'object'){
			for(var i=0;i<arr.length;i++){
				if(arr[i] == item){
					return true;
				}
			}
		}
		return false;
	}
}
