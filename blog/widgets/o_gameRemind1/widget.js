/******* bj2008 Olympic Game Game Remind Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-15
//	Last Update: 2008-07-15
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_gameRemind1 = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget ����չʾ������Ҫ���Ķ����б�
	var elmOutput = null;	// �����������
	var blogHost = 'http://'+window.location.host;
	var infoHost = 'http://info.2008.sohu.com'; 	// ����������
	var cateGroup = null;	// ��С���Ӧ��JSON
	var cateIdxTbl = null;	// ��С������
	var intval = null;		// ��ʶ�������Ƿ��Ѿ����ù�
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
		this.loaded();
		this.build(true);
	};
	
	// ���� Widget չʾ����
	this.build = function(nocache) {
		this.destroy();
		elmOutput = new Element('div');
		m_content.innerHTML = '';
		var str = '';
		if(App.Permit.editModule) 
			str+=	'<div class="manage"><a href="http://sch.blog.sohu.com/user_attention_standalone.do" target="_blank" onmousedown="CA.q(\'blog_widget_gameRemind_setting\');">���ù�ע������</a></div>';		
		str += 	'<div class="gameRemind-content">'+
				'<div class="remindGames">'+App.Lang.loading+'</div>'+
				'</div>';
		if(App.Permit.editModule) 		
			str+=	'<div class="more"><a href="http://blog.sohu.com/home/soSchedule/match_list.do" target="_blank" onmousedown="CA.q(\'blog_widget_gameRemind_more\');">�ҵ���������>></a></div>';
		m_content.appendChild(elmOutput.update(str));
		this.initEles();
		this.setTitle('������������', true);
		//this.getCateGroup();
		this.getRemindInfo();
	};
	// ��ȡ������Ҫ�������ݵĶ���
	this.initEles = function(){
		//if(!eles){
			eles = {
				rGames : elmOutput.select('div.remindGames')[0]
			}
		//}
	};
	 
	// ��ȡ��������JSON����
	this.getRemindInfo = function(){
		var vn = 'remindInfo';
		var url ='http://sch.blog.sohu.com/user_matches.do?xpt='+_xpt+'&size=5&ts='+(new Date()).getTime();//Y2FpeWoyMDAyQHNvaHUuY29t
		new Groj(url, {
			variable: vn,
			charset:'utf-8',
			onSuccess: this.showRemindInfo.bind(this,vn),
			onFailure: this.noData.bind(this,eles.rGames,'���ޱ���')
		});
	};
	
	// ��ʾ����������Ϣ
	this.showRemindInfo = function(vn){
		var rInfo = window[vn];
		var str= '';
		if(rInfo.length == 0){
			if(App.Permit.editModule) 
				str = '<br />���ʰ��˱�����ʼ�ˣ�������ע�ı���������У���ȥ <a href="http://sch.blog.sohu.com/user_attention_standalone.do" target="_blank">���ð�>></a><br /><br />' ;
			else
				str = '���ޱ���';
		}
		else{
			for(var i = 0 ; i < rInfo.length ; i++){
				var it = rInfo[i];
				var evtId = it.id;
				var starIcon = '';
	            //var cateName = this.getCateName(evtId.substring(0, 2));
	            //var groupName = this.getGroupName(evtId.substring(0, 2),evtId.substring(0, 6));
	            if(it.picurl && it.picurl != '')
	            	starIcon = '<div style="float:left;width:55px;"><img src="'+it.picurl+'" alt="'+it.picname+'" title="'+it.picname+'" style="width:45px;height:60px;padding:1px;border:1px solid #ccc;" /></div>'
				if(it.status == 4 || it.status == 24){
					str += '<div class="game_n clearfix">' + starIcon + '<div>'+it.time + '<br />' + it.event+'<br />';
					if(it.aList && it.aList != '')
						str += '<a href="'+it.aList+'" target="_blank" onmousedown="CA.q(\'blog_widget_gameRemind_name\');">����</a>&nbsp;&nbsp;';
					if(it.vLive && it.vLive != '')
						str += '<a href="'+it.vLive+'" target="_blank" onmousedown="CA.q(\'blog_widget_gameRemind_video\');">��Ƶֱ��</a>&nbsp;&nbsp;';
					if(it.tLive && it.tLive != ''){
						if(it.tLive.indexOf('http://cis') != -1 || it.tLive.indexOf('http://info') != -1)
							str+= '<a href="'+it.tLive+'" target="_blank" onmousedown="CA.q(\'blog_widget_gameRemind_info\');">����ֱ��</a>&nbsp;&nbsp;';
						else
							str+= '<a href="'+it.tLive+'" target="_blank" onmousedown="CA.q(\'blog_widget_gameRemind_text\');">ͼ��ֱ��</a>&nbsp;&nbsp;';
					}
					if(it.techStat && it.techStat !='')
						str+= '<a href="'+it.techStat+'" target="_blank" onmousedown="CA.q(\'blog_widget_gameRemind_count\');">ͳ��</a>';
					str +='</div></div>';
				}else{
					if(it.aList && it.aList != '')
						str += '<div class="game_f"><a class="clearfix" onmousedown="CA.q(\'blog_widget_gameRemind_f\');" target="_blank" href="'+it.aList+'">' + starIcon + '<div>'+it.time + '<br />' + it.event+'</div></a></div>';
					else
						str += '<div class="game_f"><a class="clearfix" onmousedown="CA.q(\'blog_widget_gameRemind_f\');" target="_blank" href="'+infoHost+'/Schedule/'+evtId.substring(0,2)+'.shtml#2008'+it.time.substring(0,2)+it.time.substring(3,5)+'">' + starIcon + '<div>'+it.time + '<br />' + it.event+'</div></a></div>';
				}
			}
		}
		eles.rGames.innerHTML = str;
		eles.rGames.update(eles.rGames.innerHTML);
		if(!intval)
			this.setTimer();
	};
	// ���ö�ʱ��
	this.setTimer = function(){
		intval = window.setInterval(this.build.bind(this),600000);
	};
	// �޷���ȡ����
	this.noData = function(ele,msg){
		ele.update(msg);
	};
	// �Ƽ�������ʵ��
	this.shareMePath = function() {
		return 'url=o_gameRemind1';
	};
};
registerWidget('o_gameRemind1');