/******* User Video Profile Widget **********/
//	Author: Jady
//	Created: 2007-07-17
//	Updated: 2007-07-17
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var v_profile = function(m_data, m_content, m_edit, w_path){
	
	//	通用的一些变量
	var userPassport = _xpt;
	var wdtManageUrl = 'http://v.blog.sohu.com/passport';
	
	//	页面上的一些元素对象
	var outputEle = null;		//	内容区元素
	var elmVideoFlash = null;
	
	//	显示内容
	this.showContent = function() {
		outputEle.innerHTML = '<embed id="v_profile_flash" src="http://v.blog.sohu.com/fo/u/!' + userPassport + '" width="100%" height="100%" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
		this.loaded();
	};
	
	/*******************************************
	 *	有关数据请求的一些方法
	 ******************************************/
	this.requestData = function(noCache) {
		if (!outputEle) this.initElement();
		this.showContent();
	};
	this.initialize = function() {
		this.requestData(App.Permit.editModule);
		elmVideoFlash = $('v_profile_flash');
		timerSetFlashSize = setInterval(this.setFlashSize.bind(this), 500);
	};
	this.destroy = function() {
		clearTimeout(timerSetFlashSize);
		if(outputEle) Element.remove(outputEle);
		m_content.innerHTML = "";
	};
	this.refresh = function() {
		this.requestData(true);
	};
	
	//	初始化页面上的对象
	this.initElement = function() {
		m_content.innerHTML = "";
		
		//	create the manage element if had permit
		if(App.Permit.editModule){
			var str = '<div style="text-align:right"><a href="' + wdtManageUrl + '" target="_blank">' + App.Lang.manage + '</a></div><hr size="1" />';
			m_content.innerHTML = str;
		}
		
		outputEle = document.createElement("div");
		m_content.appendChild(outputEle);
	}
	this.setFlashSize = function() {
		if (Math.floor(outputEle.offsetWidth*3/4+20) != Math.floor(outputEle.offsetHeight)) {
			elmVideoFlash.height = 1;
			outputEle.style.height = (Math.floor(outputEle.offsetWidth*3/4)+20) +'px';
			elmVideoFlash.height = '100%';
		}
	}
};
registerWidget("v_profile");