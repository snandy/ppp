/******* Hello World Widget **********/
//	Author: mingguo
//	First Created: 2009-09-14
//	Last Update: 2009-09-14
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var focus_category = function(m_data, m_content, m_edit){
	var focusVn = 'focuscategory';
	var dataHost = 'http://blog.focus.cn';
	var dataPath = '/sohu_json/sohu_sjs_fenlei.php?xp=' + _xpt + '&vn=' + focusVn;
	var elmOutput;
		
	
	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		if (elmOutput) {
			Element.remove(elmOutput);
		}
	};
	this.refresh = function() {
		this.updateData(true);
	};
	this.build = function() {
		this.destroy();
		elmOutput = document.createElement('div');
		Element.addClassName(elmOutput, 'zpfl');
		elmOutput.innerHTML = App.Lang.loading;
		m_content.appendChild(elmOutput);
	};

	this.updateData = function(noCache) {
		var dataURL = dataHost + dataPath;
		elmOutput.innerHTML = App.Lang.loadModuleData;
		new LinkFile(dataURL, {
					type: 'script',
					noCache: noCache,
					callBack: {
						variable: focusVn,
						onLoad: this.loadedData.bind(this),
						onFailure: this.noData.bind(this)
						/*timeout: 20,
						timerStep: 500*/
					}});
	}
	this.loadedData = function() {
		this.loaded();
		this.showContent();
	};
	this.noData = function() {
		this.loaded();
		elmOutput.innerHTML = App.Lang.fileNotFound;
	}
	
	this.showContent = function() {
		var str = '';
		if (focuscategory.length <= 0) {
			elmOutput.innerHTML = App.Lang.noSets;
			return;
		}
  	if (status == 1){		
  		if (typeof(focuscategory.data) == 'undefined' || focuscategory.data.length == 0){
  			if (App.Permit.editModule)
  				str += '<div class="zpflc">您还未提交设计作品，<a href="http://pp.sohu.com/people/!' + _xpt + '" target="_blank">马上去相册提交</a></div>';
  			else
  				str += '<div>该设计师尚未提交设计作品</div>';
  		}else{
  			for (var i=0;i<focuscategory.data.length;i++){
  				var data = focuscategory.data[i];
  				var name = data.name;
  				var category = data.category;
  				if (typeof(category) != 'undefined'){
  					str += '\
              <div class="zpflt">' + name + '：</div>\
              <div class="zpflc">\
                <ul>';
  					for (var j=0;j<category.length;j++){
  						str += '<li><a href="' + category[j].link + '" target="_blank">' + category[j].cname + '</a> (' + category[j].count + ')</li>';				
  					}
  					str += '</ul></div>';
  				}
  			}
  		}
  	}else{
  		if (App.Permit.editModule)
  			str += '<div class="zpflc">您的博客不属于设计师博客，<a href="http://blog.focus.cn/sohu_sjs_photos.php" target="_blank">马上开通设计师博客功能</a></div>';
  		else
  			str += '<div>该博客不是设计师博客</div>';
  	}	
		
		elmOutput.innerHTML = str;
	}
	
};
registerWidget('focus_category');
