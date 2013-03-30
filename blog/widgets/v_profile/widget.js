/******* User Video Profile Widget **********/
//	Author: Jady
//	Created: 2007-07-17
//	Updated: 2007-07-17
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var v_profile = function(m_data, m_content, m_edit, w_path){
	
	//	ͨ�õ�һЩ����
	var userPassport = _xpt;
	var wdtManageUrl = 'http://v.blog.sohu.com/passport';
	
	//	ҳ���ϵ�һЩԪ�ض���
	var outputEle = null;		//	������Ԫ��
	var elmVideoFlash = null;
	
	//	��ʾ����
	this.showContent = function() {
		outputEle.innerHTML = '<embed id="v_profile_flash" src="http://v.blog.sohu.com/fo/u/!' + userPassport + '" width="100%" height="100%" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
		this.loaded();
	};
	
	/*******************************************
	 *	�й����������һЩ����
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
	
	//	��ʼ��ҳ���ϵĶ���
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