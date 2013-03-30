/******* bj2008 Olympic Wonderfull Photo Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-17
//	Last Update: 2008-07-17
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_wondPhoto = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget 内容展示部分需要填充的对象列表
	var elmOutput = null;	// 内容输出容器
	var elmOutputE = null; 	// 编辑输出容器
	var blogHost = 'http://'+window.location.host;
	var photoHost = 'http://info.2008.sohu.com'; 	// 数据所在域
	
	var cateId = '1001';	// 精彩图片分类ID
	
	/*
	// 初始化精彩图片分类ID
	if (m_data) {
		cateId = m_data.cateId || '';
	};
	*/
	m_content = $(m_content);
	//m_edit = $(m_edit);
	
	// Widget 初始化
	this.initialize = function() {
		this.loaded();
		this.build();
		this.jsReady();
	};
	
	// 销毁widget
	this.destroy = function() {
		if (elmOutput) {
			elmOutput.remove();
		}
	};
	/*
	// Widget 设置方法
	this.edit = function() {
		this.buildEdit();
	};
	*/
	this.refresh = function() {
		this.build(true);
		this.loaded();
	};
	
	// 重新设置FLASH ，加载新的类别的图片
	this.resetPhotoShower = function(){
		this.setPhotoShower($F(eles.cateSelector));
	};
	
	// 设置图片展示FLASH
	this.setPhotoShower = function(cateId){
		var str = '';
		var src = 'http://js3.pp.sohu.com.cn/ppp/blog/styles_ppp/images/olympic/OlympicWidget.swf';
		var flashvars = 'cateId='+cateId;
		if(Prototype.Browser.IE) {
			str +=	'<object id="wondPhoto_ob" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="100%" height="100%" align="middle">' +
						'<param name="allowScriptAccess" value="always" />' +
						'<param name="movie" value="' + src + '" />' +
						'<param name="flashvars" value="' + flashvars + '" />' +
						'<param name="quality" value="high" />' +
						'<param name="wmode" value="opaque" />' +
						'<param name="allowFullScreen" value="true" />' +
						'<embed id="slide_em" src="' + src + '" flashvars="' + flashvars + '" quality="high" width="100%" height="100%" wmode="opaque" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />' +
					'</object>';
		} else {
			str += '<embed id="slide_em" src="' + src + '" flashvars="' + flashvars + '" quality="high"  width="100%" height="100%" wmode="opaque" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
		}
		eles.photoShower.update(str);
	};
	// 获取比赛项目列表
	this.getCateList = function(){
		var url =  blogHost+'/inc/olympic/frag/cate_level_1009.xml?ts='+(new Date()).getTime();
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showCateList.bind(this),
				onFailure: this.noData.bind(this,eles.cateSelector,'<option>暂无法获取图片分类</option>')
			}
		);
	};
	// 显示比赛项目列表
	this.showCateList = function(transport){
		var result=transport.responseXML.getElementsByTagName("category");
		eles.cateSelector.update(this.buildSlctOpt($A(result),cateId));
		if(result[0].getAttribute("id") != cateId)
			this.setPhotoShower(result[0].getAttribute("id"));
	};
	
	// 给定数组源和选定值，构建下拉框的项
	this.buildSlctOpt = function(cateArray,selectedId){
		var str ='';
		if(cateArray.length == 0)
			str += '<option value="0">没有项</option>';
		else{
			cateArray.each(function(it){
				if(it.getAttribute("id")){
					if (it.getAttribute("id") == selectedId) {
						str += '<option value="'+ it.getAttribute("id") +'" selected="selected">'+ it.getElementsByTagName("name")[0].firstChild.nodeValue +'</option>';
					} else {
						str += '<option value="'+ it.getAttribute("id") +'">'+ it.getElementsByTagName("name")[0].firstChild.nodeValue +'</option>';
					}
				}
			});
		}
		return str;
	};
	/*
	// 保存用户设置
	this.saveData = function() {
		if ((!$F(this.cateIdIpt) || $F(this.cateIdIpt) == 0)) {
			this.closeEdit();
			return;
		}
		if (cateId == $F(this.cateId)) {
			this.closeEdit();
			return;
		}
		spId = $F(this.cateIdIpt);
		
		var data = {
			cateId: cateId
		}
		this.save(data);
		this.build();
	};
	*/
	// 构建 Widget 展示内容
	this.build = function(nocache) {
		this.destroy();
		elmOutput = new Element('div');
		m_content.innerHTML = '';
		if (!cateId) {
			elmOutput.innerHTML = '请点击设置选择你想关注的照片分类';
			m_content.appendChild(elmOutput);
		}
		else {
			var str='<div class="wondPhoto-content">'+
					    '<div class="adBanner">Beijing2008奥运会</div>'+
					    '<div class="ad1"><a href="http://www.brilliance-auto.com/index/cp_junjiefrv_a.asp" target="_blank"><img alt="华晨汽车" src="http://js4.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ad_huachen1.jpg" /></a></div>'+
					    '<div class="rank">'+
							'<h3><span class="red">华晨汽车</span> 特约奥运精彩图片</h3>'+
							'<div class="selectPic"><select id="cateSelector"></select></div>'+
					        '<div id="photoShower" style="width:200px; height:278px"><img src="http://js4.pp.sohu.com.cn/ppp/blog/styles_ppp/images/olympic/flash.jpg" alt="flash" /></div>'+
					        '<br />'+
					        '</div>';
				if(!App.Permit.editModule)  {
					str +=	'<div class="wondPhoto_bm_bg">'+
					'<a href="http://blog.sohu.com/manage/module.do?m=preview&type=o_wondPhoto" target="_blank">添加到我的博客</a>';
					}
				else
					str +=	'<div class="wondPhoto_bm_s_bg">';
					
				str +=  '</div>'+
					'</div>';
			m_content.appendChild(elmOutput.update(str));
			this.initEles();
			eles.cateSelector.observe('change', this.resetPhotoShower.bind(this));
			this.setTitle('奥运精彩图片', true);
			this.setPhotoShower(cateId);
			this.getCateList();
			
		}
	};
	
	// 获取所有需要回填数据的对象
	this.initEles = function(){
		//if(!eles){
			eles = {
				cateSelector : elmOutput.select('select#cateSelector')[0],
				photoShower : elmOutput.select('div#photoShower')[0]
			}
		//}
	};
	
	this.noData = function(ele,msg){
		ele.update(msg);
	};
	
	this.jsReady = function(){
		window.jsReady = function(){
			//alert('正在调用jsReady方法');
			return true;
		}
	};
};
registerWidget('o_wondPhoto');