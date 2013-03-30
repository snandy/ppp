/******* group Widget 我关注的圈子**********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-10-27
//	Last Update: 2008-10-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var q_atteGroup = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget 内容展示部分需要填充的对象列表
	var elmOutput = null;	// 内容输出容器
	var gInfoHost = 'http://q.sohu.com/service/group_json.jsp?method=getGroupSummary'; 	// 数据所在域
	var gId = '1';
	
	m_content = $(m_content);
	
	if(m_data){
		gId = m_data.gid || '1';
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
	// 刷新
	this.refresh = function() {
		this.loaded();
		this.build(true);
	};
	
	// 构建 Widget 展示内容
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
					        '圈主：<a class="gtAdminLink" title="" href="#" target="_blank"></a>'+
					    '</div>'+
					    '<div style="clear:both;"></div>'+
					    '<ul class="gTopics">正在加载精华帖子...</ul>'+
					    
					'</div>';
		m_content.appendChild(elmOutput.update(str));
		this.initEles();
		this.setTitle('我关注的圈子', true);
		this.getGroupInfo();
	};
	// 获取所有需要回填数据的对象
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
	 
	// 获取赛事提醒JSON数据
	this.getGroupInfo = function(){
		var vn = 'groupInfo'+this.id;
		var url = gInfoHost+'&gid=' + gId +'&ts='+(new Date()).getTime();
		new Groj(url, {
			variable: vn,
			onSuccess: this.showGroupInfo.bind(this,vn),
			onFailure: this.noData.bind(this,elmOutput,'暂时无法获取圈子信息，请刷新模块试试。')
		});
	};
	
	// 显示赛事提醒信息
	this.showGroupInfo = function(vn){
		var gInfo = window[vn],
			tList = gInfo.tList ? gInfo.tList : [];
		var str = '<li>精华帖：</li>';
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
	
	// 无法获取数据
	this.noData = function(ele,msg){
		ele.update(msg);
	};
};
registerWidget('q_atteGroup');