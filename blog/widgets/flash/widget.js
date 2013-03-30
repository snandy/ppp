/******* flash  通用模块 **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-11-3
//	Last Update: 2008-11-3
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var flash = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget 内容展示部分需要填充的对象列表
	var elmOutput = null;	// 内容输出容器
	var flashSource = 'http://js3.pp.sohu.com.cn/ppp/blog/styles_ppp/images/loading.swf';//m_data.url;
	var width = 200;
	var height = 150;
	
	/*
	// 初始化精彩图片分类ID
	if (m_data) {
		cateId = m_data.cateId || '';
	};
	*/
	m_content = $(m_content);
	
	// 初始化flash相关信息
	if(m_data){
		flashSource = m_data.url;
		title = m_data.title;
		width = m_data.width;
		height = m_data.height;
	}
	
	// Widget 初始化
	this.initialize = function() {
		this.loaded();
		this.build();
		
	};
	
	// 销毁widget
	this.destroy = function() {
		if (elmOutput) {
			elmOutput.remove();
		}
	};
	
	this.refresh = function() {
		this.build(true);
		this.loaded();
	};
	
	// 构建 Widget 展示内容
	this.build = function(nocache) {
		this.destroy();
		elmOutput = new Element('div');
		m_content.innerHTML = '';
		elmOutput.innerHTML = 	'<div class="flash-content">'+
								    '<div class="flashLabel" style="width:100%;height:'+this.getHeight(width,height)+'px">'+this.buildEmbed(flashSource)+'</div>'+
								    '<div class="links">'+
								    	'<div class="listFlash"><a href=" http://ow.blog.sohu.com/category/0/rssWidget?cat=2&mode=recmd" target="_blank">Flash专区</a></div>'+
								    	'<div class="fullScreen"><a href="http://ow.blog.sohu.com/fullScreen.jsp?url='+encodeURIComponent(flashSource)+'&width='+width+'&height='+height+'" target="_blank">全屏显示</a></div>'+
								    '</div>'+
								'</div>';
		m_content.appendChild(elmOutput);
		this.setTitle(title, true);
	};
	
	// 设置图片展示FLASH
	this.buildEmbed = function(flash){
		var str = '';
		if(Prototype.Browser.IE) {
			str +=	'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="100%" height="100%" align="middle">' +
						'<param name="allowScriptAccess" value="always" />' +
						'<param name="movie" value="' + flash + '" />' +
						'<param name="flashvars" value="" />' +
						'<param name="quality" value="high" />' +
						'<param name="wmode" value="transparent" />' +
						'<param name="allowFullScreen" value="true" />' +
					'</object>';
		} else {
			str += '<embed src="' + flash + '" flashvars="" quality="high"  width="100%" height="100%" wmode="opaque" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
		}
		return str;
	};
	
	// 设置flash的尺寸
	this.getHeight = function(width,height){
		return Math.ceil(m_content.offsetWidth * (height / width));
	};
};
registerWidget('flash');
