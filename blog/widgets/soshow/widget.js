/******* SoShow Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-06-27
//	Last Update: 2007-02-25
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var soshow = function(m_data, m_content, m_edit){
	var showUrl = setBadge('http://star.soshow.sohu.com/blogiframe.html?username=' +_ept+ '&mnd=0&width=195');	//	show地址

	this.initialize = function() {
		this.build();
	};
	this.destroy = function() {
		this.destroySoShowIframe();
		Element.remove(elmOutput);
	};
	this.destroySoShowIframe = function() {
		if (!document) return;
		if (elmSoshowIframe) {
			Element.remove(elmSoshowIframe);
		}
	}
	this.build = function() {
		
		if(App.Permit.editModule){
			var divMng = document.createElement('div');
			Element.addClassName(divMng, 'soshowMng');
			var str = '';
			str += '<a href="http://star.soshow.sohu.com/diy.up" target="_blank">';
			str += App.Lang.manage;
			str += '</a>';
			divMng.innerHTML = str;
			m_content.appendChild(divMng);
		}
		
		elmOutput = document.createElement('div');
		Element.addClassName(elmOutput, 'soshowFlash');
		var str = '';
		str += '<iframe name="soshowIframe" id="soshowIframe" src="'+ showUrl + '" style="border:0;width:195px;height:288px;" frameborder="0" allowTransparency="true"></iframe>';
		
		str += '<div class="more"><a href="http://star.soshow.sohu.com/" target="_blank">查看更多搜秀</a></div>';
		elmOutput.innerHTML = str;
		m_content.appendChild(elmOutput);
		
		elmSoshowIframe = $('soshowIframe');
	};
	
	function setBadge(url) {
//		var str = url + (url.match(/\?/)?'&':'?') + "pid=27022500";

		var str = url;
		return str;
	}
};
registerWidget('soshow');