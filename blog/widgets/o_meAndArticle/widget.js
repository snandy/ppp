/******* bj2008 Olympic Game olympic articles Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-22
//	Last Update: 2008-07-22
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_meAndArticle = function(m_data, m_content, m_edit){
	var elmOutput = null;	// 内容输出容器
	var blogHost = 'http://'+window.location.host;
	var scrap = blogHost+'/ppp/blog/widgets/o_meAndArticle/meAndArticle.inc?ts='+(new Date()).getTime();
	
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
		m_content.appendChild(elmOutput);
		this.setTitle('我与奥运征文', true);
		this.getScrap();
	};
	
	
	// 获取赛事提醒碎片
	this.getScrap = function(){
		var url = scrap;//'这里是明日看点的碎片地址';
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showScrap.bind(this),
				onFailure: this.noData.bind(this,elmOutput,'暂无奥运征文')
			}
		);
	};
	
	// 显示赛事提醒
	this.showScrap = function(transport){
		if(transport && transport.responseText)
			elmOutput.innerHTML = transport.responseText;
		else
			elmOutput.innerHTML = '暂无奥运征文' ;
	};
	// 无法获取数据
	this.noData = function(ele,msg){
		ele.update(msg);
	};
};
registerWidget('o_meAndArticle');