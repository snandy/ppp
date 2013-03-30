/******* bj2008 Olympic Game today news Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-22
//	Last Update: 2008-07-22
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_olymToday = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget ����չʾ������Ҫ���Ķ����б�
	var elmOutput = null;	// �����������
	var blogHost = 'http://'+window.location.host;
	var scrap = blogHost+'/inc/olympic/frag/51/86304_258245195.inc?ts='+(new Date()).getTime();
	
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
		elmOutput.innerHTML = '<div><a href="http://zt.blog.sohu.com/s2008/olympic/" target="_blank"><img src="http://js2.pp.sohu.com.cn/ppp/blog/styles_ppp/images/olympic/olymBanner.jpg" /></a></div><div></div><div style="text-align:right;display:none;"><a target="_blank" href="">����>></a></div>';
		m_content.appendChild(elmOutput);
		this.initEles();
		this.setTitle('����ͷ��', true);
		this.getScrap();
	};
	
	// ��ȡ������Ҫ�������ݵĶ���
	this.initEles = function(){
		eles = {
			news : elmOutput.select('div')[1],
			more : elmOutput.select('div')[2]
		}
	};
	// ��ȡ����������Ƭ
	this.getScrap = function(){
		var url = scrap;//'�����ǰ��˽��յ���Ƭ��ַ';
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showScrap.bind(this),
				onFailure: this.noData.bind(this,eles.news,'���޽���ͷ��')
			}
		);
	};
	
	// ��ʾ��������
	this.showScrap = function(transport){
		if(transport && transport.responseText){
			eles.news.innerHTML = transport.responseText;
			//eles.more.show();
		}
		else
			elmOutput.innerHTML = '���޽���ͷ��' ;
	};
	// �޷���ȡ����
	this.noData = function(ele,msg){
		ele.update(msg);
	};
};
registerWidget('o_olymToday');