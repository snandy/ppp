/******* share Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-09-08
//	Last Update: 2008-09-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
//  �ҵķ���������ѷ����б�չʾ

var share = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget ����չʾ������Ҫ���Ķ����б�
	var elmOutput =  m_content;	// �����������
	var blogHost = 'http://'+window.location.host;
	var fShareUrl = 'http://share.blog.sohu.com/shareService.jhtml?m=widget&type=1&xpt='+_xpt;
	var myShareUrl = 'http://share.blog.sohu.com/shareService.jhtml?m=widget&type=0&xpt='+_xpt;
	var delShareUrl = 'http://share.blog.sohu.com/shareService.jhtml?m=deleteShare&shareId=';
	
	m_content = $(m_content);
	
	// Widget ��ʼ��
	this.initialize = function() {
		this.loaded();
		this.build();
	};
	
	// ����widget
	this.destroy = function() {
		if (elmOutput) {
			elmOutput.innerHTML ='';
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
		m_content.innerHTML ='<div class="manage" style="display:none" onmousedown="CA.q(\'blog_widget_Share_goApp\');"><a href="http://blog.sohu.com/home/soShare/" target="_blank">�����·���</a></div>'+ 
							 '<div class="navTab" style="display:none;">'+
							    '<ul>'+
							      '<li class="fShare_head"  onmousedown="CA.q(\'blog_widget_share_tab1\');">���ѷ���</li>'+
							      '<li class="myShare_head" onmousedown="CA.q(\'blog_widget_share_tab2\');">�ҵķ���</li>'+
							    '</ul>'+
							    '<div class="clearBoth"></div>'+
							  '</div>'+
							  '<div class="clearBoth"></div>'+
							  '<div class="fShare_body" style="display:none;">'+
							    '<div class="fShare_cont">���ڶ�ȡ���ѷ�����Ϣ</div>'+
							    '<div class="more"><a onmousedown="CA.q(\'blog_widget_fShare_more\');"  href="http://blog.sohu.com/home/soShare/f_s" target="_blank">�鿴����&raquo;</a></div>'+
							  '</div>'+
							  '<div class="myShare_body" style="display:none">'+
							    '<div class="myShare_cont" onmousedown="CA.q(\'blog_widget_myShare_content\');">���ڶ�ȡ���ķ�����Ϣ</div>'+
							    '<div class="more adminMore" style="display:none;"><a onmousedown="CA.q(\'blog_widget_myShare_more\');" href="http://blog.sohu.com/home/soShare/m_s" target="_blank">�鿴����&raquo;</a></div>'+
							  	'<div class="more userMore" style="display:none;"><a onmousedown="CA.q(\'blog_widget_myShare_more\');" href="/app/soShare/" target="_blank">�鿴����&raquo;</a></div>'+
							  '</div>';
		this.initEles();
		this.initEvts();
		this.setTitle('���·���', true);
		if (isMyBlog()){
			Element.show(eles.fShare.newLink);
			Element.show(eles.headCtr);	
			Element.show(eles.myShare.aMore);
		}
		else
			Element.show(eles.myShare.uMore);
		this.showTab(isMyBlog() ? "fShare" : "myShare");
	};
	
	this.initEles = function() {
		eles = {
			fShare: {
				head: document.getElementsByClassName("fShare_head", m_content, "li")[0],
				body: document.getElementsByClassName("fShare_body", m_content, "div")[0], 
				cont: document.getElementsByClassName("fShare_cont", m_content, "div")[0],
				newLink: document.getElementsByClassName("manage", m_content, "div")[0]
			},
			myShare: {
				head: document.getElementsByClassName("myShare_head", m_content, "li")[0], 
				body: document.getElementsByClassName("myShare_body", m_content, "div")[0], 
				cont: document.getElementsByClassName("myShare_cont", m_content, "div")[0]
			},
			headCtr: document.getElementsByClassName("navTab", m_content, "div")[0]
		}
		eles.fShare.more = document.getElementsByClassName("more", eles.fShare.body, "div")[0];
		eles.myShare.aMore = document.getElementsByClassName("adminMore", eles.myShare.body, "div")[0];
		eles.myShare.uMore = document.getElementsByClassName("userMore", eles.myShare.body, "div")[0];
	};
	
	this.initEvts = function() {
		if (isMyBlog()) {
			Event.observe(eles.myShare.head, "click", this.showTab.bind(this, 'myShare'));
			Event.observe(eles.fShare.head, "click", this.showTab.bind(this, 'fShare'));
		}
	};
	
	this.showTab = function(type) {
		var another = (type == "myShare") ? "fShare" : "myShare";
		eles[another].head.className = "";
		Element.hide(eles[another].body);
		
		eles[type].head.className = "active";
		Element.show(eles[type].body);
		if (type == 'fShare') 
			this.showfShare();
		else 
			this.showmyShare();
	};
	// ��ʾfShare
	this.showfShare = function(){
		this.getList(fShareUrl,'Widget_fShareList',eles.fShare.cont);
	};
	// ��ʾmySharefeed
	this.showmyShare = function(){
		this.getList(myShareUrl,'Widget_myShareList',eles.myShare.cont);
	};
	
	this.getList = function(url,vn,ele){
		//this._showList = callBack;
		new Groj(url, {
			variable: vn,
			onSuccess: this.showList.bind(this,vn,ele),
			onFailure: this.noData.bind(this,ele,'���޷���ȡ������Ϣ')
		});
	};
	
	this.showList = function(vn,ele){
		if(window[vn]){
			ele.innerHTML = window[vn];
			setTimeout(function(){window[vn] =null;},0); // 10���Ӻ�Ÿ���
			//getPPinfo();
			this.getXpts();
			this.bindDel();
		}
		else
			this.noData(ele,'���޷���ȡ������Ϣ');
	};
	// ��ɾ������
	this.bindDel = function(){
		if(isMyBlog()){
			var delTags = document.getElementsByName('del_shareItem');
			if(delTags.length > 0 ){
				for(var i=0;i < delTags.length; i++){
					delTags[i].style.display="block";
					Event.observe(delTags[i],'click',this.delItem.bindAsEventListener(this));	
				}
			}
		}
	};
	// ɾ���ҵķ�����
	this.delItem = function(e){
		if (confirm('ȷ��Ҫɾ����')) {
			var ele = Event.findElement(e,'a');
			var url = delShareUrl+ ele.getAttribute('data-shareId')
				vn = 'Widget_delResult'
			new Groj(url, {
				variable: vn,
				onSuccess: this.delComplete.bind(this,vn,ele),
				onFailure: this.noData.bind(this,'','ɾ������ʧ��')
			});
		}
	};
	//����ɾ����ķ��ؽ��
	this.delComplete = function(vn,ele){
		if(window[vn] && window[vn] == 1){
			ele.up('li').remove();
		}
		else
			this.noData('','ɾ������ʧ��');
	};
	
	// �޷���ȡ����
	this.noData = function(ele,msg){
		if(ele != '')
			ele.update(msg);
		else
			alert(msg);
	};
	
	this.getXpts = function(){
		$call(function(){blog.user.User.fill()},'blog.user');
	};
};
registerWidget('share');