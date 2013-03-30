/******* bj2008 Olympic Game today news Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-22
//	Last Update: 2008-07-22
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_adidas = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget 内容展示部分需要填充的对象列表
	var elmOutput = null;	// 内容输出容器
	
	m_content = $(m_content);
	
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
	// 刷新
	this.refresh = function() {
		this.build(true);
		this.loaded();
	};
	
	
	// 构建 Widget 展示内容
	this.build = function(nocache) {
		this.destroy();
		elmOutput = new Element('div').update(App.Lang.loading);
		m_content.innerHTML = '';
		elmOutput.innerHTML = '<div id="adiOlympic">'+
								'<div class="adiSwf">'+
									'<font color="#FFFFFF">正在加载...</font>'+
								'</div>'+
								'<div class="mkAavatar">'+
									'<a href="#">制作我的奥运头像</a>'+
								'</div>'+
								'<div class="adiLinks">'+
									'<a href="http://2008.adidas.com/gametime/default.aspx" class="left">奥运加油地带</a>'+
									'<a href="http://olympicadidas.blog.sohu.com/95959164.html" target="_blank" class="right">模块说明</a>'+
								'</div>'+
								'<div class="adiGroup">'+
									'<a href="http://q.sohu.com/forum/23/topic/3245341" target="_blank">上传动感加油头像 精美好礼等你拿</a>'+
								'</div>'+
							'</div>';
		m_content.appendChild(elmOutput);
		this.initEles();
		this.setTitle('动感加油头像', true);
		this.setMkAavatar();
	};

	this.initEles = function(){
		eles = {
			mkAavatar : elmOutput.select('div.mkAavatar')[0],
			adiLinks : elmOutput.select('div.adiLinks')[0],
			adiSwf : elmOutput.select('div.adiSwf')[0]
		}
	};

	this.getFlash = function(){
       var url = '/py?url=' + encodeURIComponent('http://see.blog.sohu.com/front.html?m=getCounterByKey&type=0&key=adidas_' + _xpt);
	   new Ajax.Request(url, {
			onComplete: this.showFlash.bind(this)
		});
	};
	
	this.showFlash = function(req){
		if (!req || !req.responseText) return;
		var json = eval('(' + req.responseText + ")");
		var str = '';
		var str = '';
		if (json == "-1"){
			str = '<embed width="183" height="238" align="middle" type="application/x-shockwave-flash" src="http://zt.blog.sohu.com/upload/demo/default.swf" quality="high" wmode="transparent" />';
		}else{
			str = '<iframe marginWidth=0 marginHeight=0 src="http://see.blog.sohu.com/adidas/avatar/default.jsp?sam=' + encodeURIComponent(_xpt) + '&v='+req.responseText+'" frameBorder=0 width=183 scrolling=no height=238></iframe>';
		}
        eles.adiSwf.innerHTML = str;
     	eles.adiSwf.update(eles.adiSwf.innerHTML);
   
	};
	
	
	this.setMkAavatar = function(){
		eles.mkAavatar.innerHTML = '<a href="http://see.blog.sohu.com/front.html?m=uploadAdidasFlash" target="_balnk">制作我的奥运头像</a>';
		eles.adiLinks.innerHTML = '<a href="http://ad.doubleclick.net/clk;206533486;28908887;a?http://2008.adidas.com" target="_blank" class="left">奥运加油地带</a><a href="http://olympicadidas.blog.sohu.com/95959164.html" target="_blank" class="right">模块说明</a>';
       	this.getFlash();
	};
};
registerWidget('o_adidas');