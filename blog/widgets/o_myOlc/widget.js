/******* bj2008 Olympic Game My OYC Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-17
//	Last Update: 2008-07-17
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_myOlc = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget 内容展示部分需要填充的对象列表
	var elmOutput = null;	// 内容输出容器
	var blogHost = 'http://'+window.location.host;
	var scrap = blogHost+'/inc/olympic/frag/82/75086_258458227.inc?ts='+(new Date()).getTime();
	
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
		var str = '	<div class="myOlc-content">'+
					    '<div class="myOlc_top">'+
					    	'<h2><img id="userIconImg" align="absmiddle" src="" alt="" /> <span id="userNameText" ></span><div class="clear"></div><div>欢迎入住博客奥运村</div></h2>'+
					    '</div>'+
					    '<div class="rank">'+
					        '<div class="artList">'+
					        	'<h4><img align="absmiddle" src="http://js4.pp.sohu.com.cn/ppp/blog/styles_ppp/images/olympic/ico_og.gif" /> <a href="http://bj2008.blog.sohu.com/" target="_blank">搜狐博客奥运村</a> 村长公告：</h4>'+
					          '<ul id="czBulletin">'+
					           		App.Lang.loading +
					          '</ul>'+
					        '</div>'+
					        '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
					         '<tr>'+
					            '<td align="center"><a class="btn_joinguess" target="_blank" href="http://2008.sohu.com/">奥运媒体报道<span>奥运媒体报道</span></a></td>'+
					            '<td align="center"><a class="btn_joinguess" target="_blank" href="http://info.2008.sohu.com/">奥运数据中心<span>奥运数据中心</span></a></td>'+
					          '</tr>'+
					          '<tr>'+
					            '<td align="center"><a class="btn_joinguess" target="_blank" href="http://blog.sohu.com/manage/main.do?tracker=widget_0_myOlc">我的空间<span>我的空间</span></a></td>'+
					            '<td align="center"><a class="btn_joinguess" target="_blank" href="http://www.beijing2008.cn/">奥运官网<span>奥运官网</span></a></td>'+
					          '</tr>'+
					        '</table>'+
					    '</div>'+
					'</div>';
		m_content.appendChild(elmOutput.update(str));
		this.initEles();
		this.setTitle('我的奥运村', true);
		this.getUserInfo();
		this.getScrap();
	};
	
	// 获取所有需要回填数据的对象
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
	
	// 获取博主信息
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
	// 显示博主信息
	this.showUserInfo = function(transport){
		if(transport && transport.responseText!=''){
			var userInfo = eval("(" + transport.responseText + ")")[_xpt];
			eles.user.iconImg.writeAttribute('src',userInfo.ico);
			eles.user.nameText.update(userInfo.title);
		}
	};
	
	// 获取村长公告碎片
	this.getScrap = function(){
		var url = scrap;//'这里是村长公告碎片';
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showScrap.bind(this),
				onFailure: this.noData.bind(this,eles.czBulletin,'暂无公告')
			}
		);
	};
	
	// 显示村长公告碎片
	this.showScrap = function(transport){
		if(transport && transport.responseText)
			eles.czBulletin.innerHTML = transport.responseText;
		else
			eles.czBulletin.innerHTML = '<li>暂无公告</li>' ;
	};

	// 无法获取数据
	this.noData = function(ele,msg){
		ele.update(msg);
	};
};
registerWidget('o_myOlc');