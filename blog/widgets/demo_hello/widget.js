/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-03-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Demo_Hello = function(m_data, m_content, m_edit, w_path){
/*	
	// ����Ĳ�����
	// m_data����ģ���м�¼���û����ݣ�ͨ��this.save��������ݣ���json�����ʽ��
	// m_content: HTMLElement����ģ��������������htmlԪ�أ�����ģ��Ҫ��ʾ�����ݶ�Ҫ����ڴ�
	// m_edit��HTMLElement����ģ�������������htmlԪ�أ�������������е����ݶ�Ҫ����ڴ�
	// w_path��widget������·������ʱwidget���л����һЩ����ͼƬ�ȵ��ز��ļ�����ͨ�����·�������е���
	
	
	// һЩ������
	// ��ʼ�������ø�widget������ִ�еķ�����
	this.initialize = function() {
	};
	// ����ɾ����ģ�����ҳ��unloadʱ������á�
	this.destory = function() {
	};
	
	
	// ˢ�£��û����ģ���ϵ�ˢ�°�ť��ִ���������
	// ���û�д˷�������ģ�鲻��ʾˢ�°�ť
	this.refresh = function() {
	};
	// �����refresh����ͬʱʹ�ã���ʾ���ݶ�ȡ������
	// ���û����ˢ�º��ٴε��ˢ�°�ť�ǲ���Ч�ģ�����������loaded��
	this.loaded();
	
	
	// ���ã��û����ģ���ϵ����ð�ť��ִ���������
	// ���û�д˷�������ģ�鲻��ʾ���ð�ť
	this.edit = function() {
	};
	// �ر����ã��û����ģ���ϵĹر����ð�ť��ִ�����������һ�㲻���ã�
	this.onCloseEdit = function() {
	};
	
	// ���档�����û����õ����ݣ�������json�����ʽ���档
	// ��Ҫ�������Լ����˷�������ĳ��ť�ϡ�
	this.save(data);
	// �����������������յ�����״̬ʱ���������������
	this.endSave = function() {
	};
	
	// ģ���id
	//this.id
	
	
	// ����ģ��icon
	this.setIco(String: src);
	// ����ģ�����
	this.setTitle(String: title);
*/
	this.initialize = function() {
		build();
	};
	function build() {
		m_content.innerHTML = 'Hello World!';
	};
};
registerWidget('Demo_Hello');