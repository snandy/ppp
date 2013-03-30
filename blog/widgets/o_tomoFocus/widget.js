/******* bj2008 Olympic Game tomorrow focus news Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-22
//	Last Update: 2008-07-22
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
//����ѡ��
var o_tomoFocus = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget ����չʾ������Ҫ���Ķ����б�
	var elmOutput = null;	// �����������
	var blogHost = 'http://'+window.location.host;
	var scrap = blogHost+'/inc/olympic/frag/51/86441_258245195.inc?ts='+(new Date()).getTime();
	
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
		elmOutput.innerHTML = '<div></div><div style="text-align:right;display:none;"><a target="_blank" href="http://zt.blog.sohu.com/s2008/5195/s258343734/index.shtml">����>></a></div>';
		m_content.appendChild(elmOutput);
		this.initEles();
		this.setTitle('����ѡ��', true);
		this.getScrap();
	};
	// ��ȡ������Ҫ�������ݵĶ���
	this.initEles = function(){
		eles = {
			news : elmOutput.select('div')[0],
			more : elmOutput.select('div')[1]
		}
	};
	
	// ��ȡ����������Ƭ
	this.getScrap = function(){
		var url = scrap;//'���������տ������Ƭ��ַ';
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showScrap.bind(this),
				onFailure: this.noData.bind(this,eles.news,'���޽���ѡ��')
			}
		);
	};
	
	// ��ʾ��������
	this.showScrap = function(transport){
		if(transport && transport.responseText){
			eles.news.innerHTML = transport.responseText;
			eles.more.show();
		}
		else
			elmOutput.innerHTML = '���޽���ѡ��' ;
	};
	// �޷���ȡ����
	this.noData = function(ele,msg){
		ele.update(msg);
	};
};
registerWidget('o_tomoFocus');