/******* bj2008 Olympic Game today news Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-22
//	Last Update: 2008-07-22
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_adidas = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget ����չʾ������Ҫ���Ķ����б�
	var elmOutput = null;	// �����������
	
	m_content = $(m_content);
	
	// Widget ��ʼ��
	this.initialize = function() {
		this.loaded();
		this.build();
	};
	
	// ����widget
	this.destroy = function() {
		if (elmOutput) {
			elmOutput.remove();
		}
	};
	// ˢ��
	this.refresh = function() {
		this.build(true);
		this.loaded();
	};
	
	
	// ���� Widget չʾ����
	this.build = function(nocache) {
		this.destroy();
		elmOutput = new Element('div').update(App.Lang.loading);
		m_content.innerHTML = '';
		elmOutput.innerHTML = '<div id="adiOlympic">'+
								'<div class="adiSwf">'+
									'<font color="#FFFFFF">���ڼ���...</font>'+
								'</div>'+
								'<div class="mkAavatar">'+
									'<a href="#">�����ҵİ���ͷ��</a>'+
								'</div>'+
								'<div class="adiLinks">'+
									'<a href="http://2008.adidas.com/gametime/default.aspx" class="left">���˼��͵ش�</a>'+
									'<a href="http://olympicadidas.blog.sohu.com/95959164.html" target="_blank" class="right">ģ��˵��</a>'+
								'</div>'+
								'<div class="adiGroup">'+
									'<a href="http://q.sohu.com/forum/23/topic/3245341" target="_blank">�ϴ����м���ͷ�� �������������</a>'+
								'</div>'+
							'</div>';
		m_content.appendChild(elmOutput);
		this.initEles();
		this.setTitle('���м���ͷ��', true);
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
		eles.mkAavatar.innerHTML = '<a href="http://see.blog.sohu.com/front.html?m=uploadAdidasFlash" target="_balnk">�����ҵİ���ͷ��</a>';
		eles.adiLinks.innerHTML = '<a href="http://ad.doubleclick.net/clk;206533486;28908887;a?http://2008.adidas.com" target="_blank" class="left">���˼��͵ش�</a><a href="http://olympicadidas.blog.sohu.com/95959164.html" target="_blank" class="right">ģ��˵��</a>';
       	this.getFlash();
	};
};
registerWidget('o_adidas');