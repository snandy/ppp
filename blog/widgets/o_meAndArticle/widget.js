/******* bj2008 Olympic Game olympic articles Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-22
//	Last Update: 2008-07-22
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_meAndArticle = function(m_data, m_content, m_edit){
	var elmOutput = null;	// �����������
	var blogHost = 'http://'+window.location.host;
	var scrap = blogHost+'/ppp/blog/widgets/o_meAndArticle/meAndArticle.inc?ts='+(new Date()).getTime();
	
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
		m_content.appendChild(elmOutput);
		this.setTitle('�����������', true);
		this.getScrap();
	};
	
	
	// ��ȡ����������Ƭ
	this.getScrap = function(){
		var url = scrap;//'���������տ������Ƭ��ַ';
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showScrap.bind(this),
				onFailure: this.noData.bind(this,elmOutput,'���ް�������')
			}
		);
	};
	
	// ��ʾ��������
	this.showScrap = function(transport){
		if(transport && transport.responseText)
			elmOutput.innerHTML = transport.responseText;
		else
			elmOutput.innerHTML = '���ް�������' ;
	};
	// �޷���ȡ����
	this.noData = function(ele,msg){
		ele.update(msg);
	};
};
registerWidget('o_meAndArticle');