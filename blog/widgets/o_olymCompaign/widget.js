/******* bj2008 Olympic Game today news Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-22
//	Last Update: 2008-07-22
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_olymCompaign = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget 内容展示部分需要填充的对象列表
	var elmOutput = null;	// 内容输出容器
	var blogHost = 'http://'+window.location.host;
	var scrap = blogHost+'/inc/olympic/frag/82/75091_258458227.inc?ts='+(new Date()).getTime();
	
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
		elmOutput.innerHTML = '<div></div><div style="text-align:right;display:none;"><a target="_blank" href="">更多>></a></div>';
		m_content.appendChild(elmOutput);
		this.initEles();
		this.setTitle('奥运抢票活动', true);
		this.getScrap();
	};
	
	// 获取所有需要回填数据的对象
	this.initEles = function(){
		eles = {
			news : elmOutput.select('div')[0],
			more : elmOutput.select('div')[1]
		}
	};
	// 获取赛事提醒碎片
	this.getScrap = function(){
		var url = scrap;//'这里是奥运今日的碎片地址';
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showScrap.bind(this),
				onFailure: this.noData.bind(this,eles.news,'暂无奥运抢票活动')
			}
		);
	};
	
	// 显示赛事提醒
	this.showScrap = function(transport){
		if(transport && transport.responseText){
			eles.news.innerHTML = transport.responseText;
			//eles.more.show();
		}
		else
			elmOutput.innerHTML = '暂无奥运抢票活动' ;
	};
	// 无法获取数据
	this.noData = function(ele,msg){
		ele.update(msg);
	};
};
registerWidget('o_olymCompaign');