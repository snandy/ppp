/******* group Widget �ҹ�ע��Ȧ��**********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-10-27
//	Last Update: 2008-10-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var q_atteGroup = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget ����չʾ������Ҫ���Ķ����б�
	var elmOutput = null;	// �����������
	var gInfoHost = 'http://q.sohu.com/service/group_json.jsp?method=getGroupSummary'; 	// ����������
	var gId = '1';
	
	m_content = $(m_content);
	
	if(m_data){
		gId = m_data.gid || '1';
	}
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
		this.loaded();
		this.build(true);
	};
	
	// ���� Widget չʾ����
	this.build = function() {
		elmOutput = new Element('div');
		m_content.innerHTML = '';
		var str = 	'<div class="q_manage">'+
						'<div class="groupCover">'+
					    	'<a class="gcLink" title="" href="#" target="_blank">'+
					        	'<img class="groupIco" src="http://js1.pp.sohu.com.cn/ppp/group/styles/images/ico_groupdef.jpg" alt="" />'+
					        '</a>'+
					    '</div>'+
					    '<div class="groupTitle">'+
					    	'<a class="gtLink" title="" href="#" target="_blank"></a><br /><br />'+
					        'Ȧ����<a class="gtAdminLink" title="" href="#" target="_blank"></a>'+
					    '</div>'+
					    '<div style="clear:both;"></div>'+
					    '<ul class="gTopics">���ڼ��ؾ�������...</ul>'+
					    
					'</div>';
		m_content.appendChild(elmOutput.update(str));
		this.initEles();
		this.setTitle('�ҹ�ע��Ȧ��', true);
		this.getGroupInfo();
	};
	// ��ȡ������Ҫ�������ݵĶ���
	this.initEles = function(){
		eles = {
			gcLink : elmOutput.select('a.gcLink')[0],
			gcIcon : elmOutput.select('img.groupIco')[0],
			gtLink : elmOutput.select('a.gtLink')[0],
			gtAdminLink : elmOutput.select('a.gtAdminLink')[0],
			gTopics : elmOutput.select('ul.gTopics')[0],
			gJoinLink : elmOutput.select('a.gJoinLink')[0]
		}
	};
	 
	// ��ȡ��������JSON����
	this.getGroupInfo = function(){
		var vn = 'groupInfo'+this.id;
		var url = gInfoHost+'&gid=' + gId +'&ts='+(new Date()).getTime();
		new Groj(url, {
			variable: vn,
			onSuccess: this.showGroupInfo.bind(this,vn),
			onFailure: this.noData.bind(this,elmOutput,'��ʱ�޷���ȡȦ����Ϣ����ˢ��ģ�����ԡ�')
		});
	};
	
	// ��ʾ����������Ϣ
	this.showGroupInfo = function(vn){
		var gInfo = window[vn],
			tList = gInfo.tList ? gInfo.tList : [];
		var str = '<li>��������</li>';
		for(var i = 0 ; i < tList.length ; i++){
			var it = tList[i];
			str	+= 	'<li>'+
			        	'<table>'+
			            	'<tbody>'+
			                	'<tr>'+
			                    	'<td valign="top"><img src="http://js1.pp.sohu.com.cn/ppp/group/styles/images/ico_entry.gif" /></td>'+
			                    	'<td><a href="'+it.url+'" target="_blank" title="'+it.name+'">'+it.name+'</a></td>'+
			                    '</tr>'+
			                 '</tbody>'+
			             '</table>'+
			         '</li>';
		}
		eles.gcLink.writeAttribute('href',gInfo.gUrl).writeAttribute('title',gInfo.gName);
		eles.gcIcon.writeAttribute('src',gInfo.gLogo).writeAttribute('alt',gInfo.gName);
		eles.gtLink.writeAttribute('href',gInfo.gUrl).writeAttribute('title',gInfo.gName).innerHTML = '<strong class="gtText">' + gInfo.gName + '</strong>';
		eles.gtAdminLink.writeAttribute('href',gInfo.gHostBlog).innerHTML = gInfo.gHostName;
		eles.gTopics.innerHTML = str;
		eles.gJoinLink.writeAttribute('href',gInfo.gJoinUrl);
		window[vn] = null;
	};
	
	// �޷���ȡ����
	this.noData = function(ele,msg){
		ele.update(msg);
	};
};
registerWidget('q_atteGroup');