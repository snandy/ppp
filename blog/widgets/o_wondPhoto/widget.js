/******* bj2008 Olympic Wonderfull Photo Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-17
//	Last Update: 2008-07-17
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_wondPhoto = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget ����չʾ������Ҫ���Ķ����б�
	var elmOutput = null;	// �����������
	var elmOutputE = null; 	// �༭�������
	var blogHost = 'http://'+window.location.host;
	var photoHost = 'http://info.2008.sohu.com'; 	// ����������
	
	var cateId = '1001';	// ����ͼƬ����ID
	
	/*
	// ��ʼ������ͼƬ����ID
	if (m_data) {
		cateId = m_data.cateId || '';
	};
	*/
	m_content = $(m_content);
	//m_edit = $(m_edit);
	
	// Widget ��ʼ��
	this.initialize = function() {
		this.loaded();
		this.build();
		this.jsReady();
	};
	
	// ����widget
	this.destroy = function() {
		if (elmOutput) {
			elmOutput.remove();
		}
	};
	/*
	// Widget ���÷���
	this.edit = function() {
		this.buildEdit();
	};
	*/
	this.refresh = function() {
		this.build(true);
		this.loaded();
	};
	
	// ��������FLASH �������µ�����ͼƬ
	this.resetPhotoShower = function(){
		this.setPhotoShower($F(eles.cateSelector));
	};
	
	// ����ͼƬչʾFLASH
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
	// ��ȡ������Ŀ�б�
	this.getCateList = function(){
		var url =  blogHost+'/inc/olympic/frag/cate_level_1009.xml?ts='+(new Date()).getTime();
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showCateList.bind(this),
				onFailure: this.noData.bind(this,eles.cateSelector,'<option>���޷���ȡͼƬ����</option>')
			}
		);
	};
	// ��ʾ������Ŀ�б�
	this.showCateList = function(transport){
		var result=transport.responseXML.getElementsByTagName("category");
		eles.cateSelector.update(this.buildSlctOpt($A(result),cateId));
		if(result[0].getAttribute("id") != cateId)
			this.setPhotoShower(result[0].getAttribute("id"));
	};
	
	// ��������Դ��ѡ��ֵ���������������
	this.buildSlctOpt = function(cateArray,selectedId){
		var str ='';
		if(cateArray.length == 0)
			str += '<option value="0">û����</option>';
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
	// �����û�����
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
	// ���� Widget չʾ����
	this.build = function(nocache) {
		this.destroy();
		elmOutput = new Element('div');
		m_content.innerHTML = '';
		if (!cateId) {
			elmOutput.innerHTML = '��������ѡ�������ע����Ƭ����';
			m_content.appendChild(elmOutput);
		}
		else {
			var str='<div class="wondPhoto-content">'+
					    '<div class="adBanner">Beijing2008���˻�</div>'+
					    '<div class="ad1"><a href="http://www.brilliance-auto.com/index/cp_junjiefrv_a.asp" target="_blank"><img alt="��������" src="http://js4.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ad_huachen1.jpg" /></a></div>'+
					    '<div class="rank">'+
							'<h3><span class="red">��������</span> ��Լ���˾���ͼƬ</h3>'+
							'<div class="selectPic"><select id="cateSelector"></select></div>'+
					        '<div id="photoShower" style="width:200px; height:278px"><img src="http://js4.pp.sohu.com.cn/ppp/blog/styles_ppp/images/olympic/flash.jpg" alt="flash" /></div>'+
					        '<br />'+
					        '</div>';
				if(!App.Permit.editModule)  {
					str +=	'<div class="wondPhoto_bm_bg">'+
					'<a href="http://blog.sohu.com/manage/module.do?m=preview&type=o_wondPhoto" target="_blank">��ӵ��ҵĲ���</a>';
					}
				else
					str +=	'<div class="wondPhoto_bm_s_bg">';
					
				str +=  '</div>'+
					'</div>';
			m_content.appendChild(elmOutput.update(str));
			this.initEles();
			eles.cateSelector.observe('change', this.resetPhotoShower.bind(this));
			this.setTitle('���˾���ͼƬ', true);
			this.setPhotoShower(cateId);
			this.getCateList();
			
		}
	};
	
	// ��ȡ������Ҫ�������ݵĶ���
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
			//alert('���ڵ���jsReady����');
			return true;
		}
	};
};
registerWidget('o_wondPhoto');