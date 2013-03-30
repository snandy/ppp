/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-03-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Demo_Hello = function(m_data, m_content, m_edit, w_path){
/*	
	// 传入的参数：
	// m_data：该模块中记录的用户数据（通过this.save保存的数据），json对象格式。
	// m_content: HTMLElement，该模块主体内容区的html元素，所有模块要显示的内容都要填充在此
	// m_edit：HTMLElement，该模块设置面板区的html元素，所有设置面板中的内容都要填充在此
	// w_path：widget包所在路径，有时widget包中会包含一些其他图片等的素材文件，可通过这个路径来进行调用
	
	
	// 一些方法：
	// 初始化，调用该widget后首先执行的方法。
	this.initialize = function() {
	};
	// 消灭，删除该模块或是页面unload时，会调用。
	this.destory = function() {
	};
	
	
	// 刷新，用户点击模块上的刷新按钮，执行这个方法
	// 如果没有此方法，则模块不显示刷新按钮
	this.refresh = function() {
	};
	// 必须和refresh方法同时使用，表示数据读取结束。
	// 在用户点击刷新后，再次点击刷新按钮是不生效的，除非运行了loaded。
	this.loaded();
	
	
	// 设置，用户点击模块上的设置按钮，执行这个方法
	// 如果没有此方法，则模块不显示设置按钮
	this.edit = function() {
	};
	// 关闭设置，用户点击模块上的关闭设置按钮，执行这个方法（一般不常用）
	this.onCloseEdit = function() {
	};
	
	// 保存。保存用户设置的数据，数据以json对象格式保存。
	// 需要开发者自己将此方法绑定在某按钮上。
	this.save(data);
	// 保存结束，保存结束收到返回状态时，后会调用这个方法
	this.endSave = function() {
	};
	
	// 模块的id
	//this.id
	
	
	// 设置模块icon
	this.setIco(String: src);
	// 设置模块标题
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