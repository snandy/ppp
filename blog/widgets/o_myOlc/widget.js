/******* bj2008 Olympic Game My OYC Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-17
//	Last Update: 2008-07-17
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_myOlc = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget ����չʾ������Ҫ���Ķ����б�
	var elmOutput = null;	// �����������
	var blogHost = 'http://'+window.location.host;
	var scrap = blogHost+'/inc/olympic/frag/82/75086_258458227.inc?ts='+(new Date()).getTime();
	
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
		var str = '	<div class="myOlc-content">'+
					    '<div class="myOlc_top">'+
					    	'<h2><img id="userIconImg" align="absmiddle" src="" alt="" /> <span id="userNameText" ></span><div class="clear"></div><div>��ӭ��ס���Ͱ��˴�</div></h2>'+
					    '</div>'+
					    '<div class="rank">'+
					        '<div class="artList">'+
					        	'<h4><img align="absmiddle" src="http://js4.pp.sohu.com.cn/ppp/blog/styles_ppp/images/olympic/ico_og.gif" /> <a href="http://bj2008.blog.sohu.com/" target="_blank">�Ѻ����Ͱ��˴�</a> �峤���棺</h4>'+
					          '<ul id="czBulletin">'+
					           		App.Lang.loading +
					          '</ul>'+
					        '</div>'+
					        '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
					         '<tr>'+
					            '<td align="center"><a class="btn_joinguess" target="_blank" href="http://2008.sohu.com/">����ý�屨��<span>����ý�屨��</span></a></td>'+
					            '<td align="center"><a class="btn_joinguess" target="_blank" href="http://info.2008.sohu.com/">������������<span>������������</span></a></td>'+
					          '</tr>'+
					          '<tr>'+
					            '<td align="center"><a class="btn_joinguess" target="_blank" href="http://blog.sohu.com/manage/main.do?tracker=widget_0_myOlc">�ҵĿռ�<span>�ҵĿռ�</span></a></td>'+
					            '<td align="center"><a class="btn_joinguess" target="_blank" href="http://www.beijing2008.cn/">���˹���<span>���˹���</span></a></td>'+
					          '</tr>'+
					        '</table>'+
					    '</div>'+
					'</div>';
		m_content.appendChild(elmOutput.update(str));
		this.initEles();
		this.setTitle('�ҵİ��˴�', true);
		this.getUserInfo();
		this.getScrap();
	};
	
	// ��ȡ������Ҫ�������ݵĶ���
	this.initEles = function(){
		//if(!eles){
			eles = {
				user:{
					iconImg : elmOutput.select('img#userIconImg')[0],
					nameText : elmOutput.select('span#userNameText')[0]
				},
				czBulletin : elmOutput.select('ul#czBulletin')[0]
			}
		//}
	};
	
	// ��ȡ������Ϣ
	this.getUserInfo = function(){
		var url = blogHost+'/service/userinfo.jsp?xp='+_xpt+'&ts='+(new Date()).getTime();
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showUserInfo.bind(this)//,
				//onFailure: this.noData.bind(this)
			}
		);
	};
	// ��ʾ������Ϣ
	this.showUserInfo = function(transport){
		if(transport && transport.responseText!=''){
			var userInfo = eval("(" + transport.responseText + ")")[_xpt];
			eles.user.iconImg.writeAttribute('src',userInfo.ico);
			eles.user.nameText.update(userInfo.title);
		}
	};
	
	// ��ȡ�峤������Ƭ
	this.getScrap = function(){
		var url = scrap;//'�����Ǵ峤������Ƭ';
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showScrap.bind(this),
				onFailure: this.noData.bind(this,eles.czBulletin,'���޹���')
			}
		);
	};
	
	// ��ʾ�峤������Ƭ
	this.showScrap = function(transport){
		if(transport && transport.responseText)
			eles.czBulletin.innerHTML = transport.responseText;
		else
			eles.czBulletin.innerHTML = '<li>���޹���</li>' ;
	};

	// �޷���ȡ����
	this.noData = function(ele,msg){
		ele.update(msg);
	};
};
registerWidget('o_myOlc');