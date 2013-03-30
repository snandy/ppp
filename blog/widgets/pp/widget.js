/******* PP Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-09-20
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var pp = function(m_data, m_content, m_edit){
	var elmOutput;
	var elmPPFlash;
	var timerSetFlashSize;
//	var ppSrc = 'http://pp.sohu.com/people/' + _ept + '/4.html';
//	var ppSrc = 'http://blog.sohu.com/people/!' + _xpt + '/album/photoset.jhtml?m=view&style=4&pageNo=1&email=' + _xpt;
	var ppSrc = 'http://blog.sohu.com/people/!' + _xpt + '/album/photoset.jhtml?m=view%26style=4%26pageNo=1%26email=' + _xpt;
	this.getPPFrag = function () {
		var str = '';
		str += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="100%" height="100%" id="ppFlash">';
        str += '<param name="movie" value="'+ App.Actions.flashPath +'ppm_060718.swf" />';
        str += '<param name="quality" value="high" />';
		str += '<param name="wmode" value="transparent" />';
        str += '<param name="FlashVars" value="url1='+ ppSrc +'$http://'+ _blog_domain +'.blog.sohu.com/pp/" />';
        str += '<embed src="'+ App.Actions.flashPath +'ppm_060718.swf" FlashVars="url1='+ ppSrc +'$http://'+ _blog_domain +'.blog.sohu.com/pp/" quality="high" width="100%" height="100%" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" name="myFlash" swLiveConnect="true" wmode="opaque" />';
        str += '</object>';
		return str;
	}

	this.initialize = function() {
		this.build();
	};
	this.destroy = function() {
		clearTimeout(timerSetFlashSize);
		this.destroyPPFlash();
		Element.remove(elmOutput);
	};
	this.destroyPPFlash = function() {
		if (!document) return;
		if (elmPPFlash) {
			Element.remove(elmPPFlash);
		}
	}
	
	this.build = function() {
		if(App.Permit.editModule){
			var divMng = document.createElement('div');
			Element.addClassName(divMng, 'mngBtn');
			var str = '';
			str += '<a href="javascript:ToolBar.getPPUploadPath();">';
			str += '<img src="http://js1.pp.sohu.com.cn/ppp/group/toolbar/themes/default/images/ico_ppUpload.gif" alt="'+ App.Lang.pp_upload +'"align="absbottom" />';
			str += App.Lang.pp_upload;
			str += '</a> | ';
			str += '<a href="http://blog.sohu.com/people/!' + _xpt + '/album/" target="_blank">';
			str += App.Lang.manage;
			str += '</a>';
			divMng.innerHTML = str;
			m_content.appendChild(divMng);
		}
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		Element.addClassName(elmOutput, 'ppFlash');
		
		elmOutput.innerHTML = this.getPPFrag();
		m_content.appendChild(elmOutput);
		
		elmPPFlash = $('ppFlash');
		timerSetFlashSize = setInterval(this.setFlashSize.bind(this), 500);
	};
	this.setFlashSize = function() {
		if (Math.floor(elmOutput.offsetWidth*3/4+30) != Math.floor(elmOutput.offsetHeight)) {
			elmPPFlash.height = 1;
			elmOutput.style.height = (elmOutput.offsetWidth*3/4+30) +'px';
			elmPPFlash.height = '100%';
		}
	}
};
registerWidget('pp');