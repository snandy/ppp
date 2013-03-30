/**
 *	@fileoverview ����ļ�����һ��POKE APP �� Friendѡ�����ʵ��
 * 
 *	@author Springwang wywy_1208@hotmail.com
 *	@version 0.1
 *	First Created: 2008-08-19	
 *	Last Update: 2008-08-25
 */
 
/**	
 * �����ࣺ
 *		common/common
 */

/**
 *	friend ��ʵ��
 *	@class Friend
 *	@return Friend
 */
 
/**(parent)
 * @param {Object} options ѡ���������������������:
 * 		parent: {String Or Object} ��ʾ���ͺ��ѵĸ�������
 * 		showSI : { enum } ������������ʾ���ƣ�Ĭ��Ϊ��ʾ
 *		showTB : { enum } ��������ʾ���ƣ�Ĭ��Ϊ��ʾ
 *		showSH : { enum } ��ʾ���غ���ѡ��ť�Ŀ��ƣ�Ĭ��Ϊ��ʾ
 *		showFL : { enum } ����ѡ������ʾ���ƣ�Ĭ��Ϊ��ʾ
 *		showDF : { boolean } ��˫����ѵ���ʾ����,Ĭ����ʾ���к���
 *		stMode : { enum } ������ʾ��ʽģʽ��Ĭ��Ϊ����
 *		siMode : { enum } ��������ѡ�����Ĵ�Сģʽ��Ĭ��Ϊ��
 *		seMode : { enum } ����ѡ��ģʽ��Ĭ�϶�ѡ
 *		callBack : { enum } ѡ����Ѻ�Ļص�������Ĭ��Ϊ��
 *		rndCount: { number } ���ѡ����ѵ�����
 * 		tips:{array} ������ʾ�����������õ�����Ѳ���ѡ��ʱ����ʾ�͵���������ʱ����ʾ{top:'',alert:''}
 */
$register('blog.user',function(){
	
	/********************************  �йغ��ѵ���  ***********************************/
		window.Friend = Class.create({
			// ��ʼ��
			initialize: function(options) {
				this.setOpt(options);
				this.initPpt();	
				this.build();
				this.initEles();
				this.initEvts();
				this.disaSingle(this.opts.showDF);
			},
			
			initPpt: function(){
				this.UBD = window.UserBlogData;	// ��������object��ʽ
				this.friends = this.$A(this.UBD);		// ��object��ʽת����array��ʽ
				this.keyword = '';						// ���ڴ�������ؼ���
				this.disableSingle = false;	// 			// ���õ�������Ƿ��ѡ
				this.curFid = null;
			},
			
			// ��������ת����һ������
			$A: function(friends){
				var fArray=[];
				for(var friend in friends){
					var f=friends[friend];
					if (typeof(f) == 'object' && !f._stranger) {
						f.passport = friend;
						fArray.push(f);
					}
				}
				return $A(fArray).compact();
			},
			// ���ò���
			setOpt: function(options) {
				options.tips = Object.extend({
						sch: Friend.Tips.search,
						top : '',
						alert : ''},
					options.tips),	// ����������ʾ
				this.opts = Object.extend({
						parent : document.body,			// ����ѡ�����ĸ�����
						showSI : Friend.Display.show,	// ������������ʾ���ƣ�Ĭ��Ϊ��ʾ
						showTB : Friend.Display.show,	// ��������ʾ���ƣ�Ĭ��Ϊ��ʾ
						showSH : Friend.Display.show,	// ��ʾ���غ���ѡ��ť�Ŀ��ƣ�Ĭ��Ϊ��ʾ
						showFL : getCookie('friLayerDisplay') || Friend.Display.hide,	// ����ѡ������ʾ���ƣ�Ĭ��Ϊ��ʾ
						showDF : false,		// ��˫����ѵ���ʾ����,Ĭ����ʾ���к���
						
						stMode : Friend.StMode.normal,	// ������ʾ��ʽģʽ��Ĭ��Ϊ����
						siMode : Friend.SiMode.big,		// ��������ѡ�����Ĵ�Сģʽ��Ĭ��Ϊ��
						seMode : Friend.SeMode.check,	// ����ѡ��ģʽ��Ĭ�϶�ѡ
						callBack : Prototype.emptyFunction,	// ѡ����Ѻ�Ļص�������Ĭ��Ϊ��
						rndCount:5},	// ���ѡ�����������
					options || {});
				this.opts.parent = $(this.opts.parent);
				this.opts.parent.innerHTML = '���ڼ���...';
			},
			// ���������ṹ
			build: function() {
				//this.actions = window[vn];
				var arr = [],friends = this.friends;
				arr.push('<div id="fFinder" class="finder" style="display:'+this.opts.showSI+';">'+
								'<div class="finderWrap clearfix">'+
									'<div class="input">'+
										'<input id="fSearchIpt" type="text" value="'+this.opts.tips.sch+'" />'+
									'</div>'+
									'<div class="toggle">'+
										'<a id="fSeletorToggle" href="javascript:void(0)" class="show" style="display:'+this.opts.showSH+';">ȫ������</a>'+
										'<a id="fSearchClear" href="javascript:void(0)" class="all" style="display:none;">ȫ������</a>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div id="fSelectLayer" class="selector clearfix" style="display:'+this.opts.showFL+';">'+
								'<div id="fsToolbar" class="options clearfix" style="display:'+this.opts.showTB+';">'+
									'<div class="method"><a id="fSelectAll" href="javascript:void(0)" >ȫѡ</a> | <a id="fSelectCancel" href="javascript:void(0)" >ȡ��ѡ��</a> | <a id="fSelectRandom" href="javascript:void(0)" >���ѡȡ'+this.opts.rndCount+'����</a></div>'+
									'<div class="filter"><a id="fSelected" href="javascript:void(0)">��ѡ</a>(<span id="fSeledCount">0</span>) | <a id="fShowAll" class="current" href="javascript:void(0)">����</a>(<span id="fAllCount">'+this.friends.length+'</span>)</div>'+
								'</div>'+
								'<div id="fSelectBox" class="friends">'+
									'<div id="fAlert" class="selectTip">'+this.opts.tips.top+'</div>'+
									'<ul id="fContainer" class="clearfix">');
				for (var i=0;i<friends.length; i++) {
					var liClass='',double='<div class="friend">˫�����</div>',f = friends[i];
					if(typeof(f)!='undefined'){
						if(f.relations == Friend.Type.single){
							liClass = Friend.Style.single;
							double = '';
						}
						var icon = '';
						if(f.icon)
							icon = f.icon;
						else
							icon = f.ico;
						arr.push('<li id="'+f.passport+'" class="'+liClass+'" initClass="'+liClass+'" >'+
									'<a href="javascript:void(0)">'+
										'<div class="icon"><img src="'+icon+'" /></div>'+
										'<div class="info">'+f.title+'</div>'+double+
										'<em>��ѡ</em>'+
									'</a>'+
								'</li>');
					}
				}
				arr.push('</ul></div><div class="footTip">���Է�Ҳ����Ϊ����ʱ��ʾ��ͼ��</div></div>');
				arr.push('<input type="hidden" name="selectedFriends" id="selectedFriends" value="" />');
				this.opts.parent.innerHTML = arr.join('');
			},
			
			//	ȡ�ó��õ�Ԫ��
			initEles: function() {
				this.finderEle = $('fFinder');				// ����������Ĳ�
				this.schIptEle = $('fSearchIpt');			// ����������
				this.selToggleEle = $('fSeletorToggle');	// ����ѡ�����������غ���ʾ�Ĵ�������
				this.schClearEle = $('fSearchClear');		// ��պ�������������
				this.selAllEle = $('fSelectAll');			// ѡ�����к�������
				this.selCancelEle = $('fSelectCancel');		// ȡ��ѡ����������
				this.selRandomEle = $('fSelectRandom');		// ���ѡȡ����
				this.seledEle = $('fSelected');				// �Ѿ�ѡ��ĺ���
				this.showAllEle = $('fShowAll');			// ��ʾ���к���
				this.fSeledCountEle = $('fSeledCount');		// ��ѡ�ĺ�����
				this.fAllCountEle = $('fAllCount');			// �ܵĺ�����
				this.selLayerEle = $('fSelectLayer');		// ����ѡ���
				this.toolbarEle	= $('fsToolbar');			// ������
				this.selBoxEle = $('fSelectBox');			// ����ѡ���
				this.fCtnrEle = $('fContainer');			// ���Ѹ�����
				this.fLiTags = this.fCtnrEle.childElements();// ���еĺ���LI��ǩ
				this.curToolEle = this.showAllEle;			// ��ǰѡ�еĹ���A��ǩ
				this.seledInput = $('selectedFriends');		// ��ѡ����ѵ����ر��ֶ�
			},
			
			//	����ӦԪ�ص��¼�
			initEvts: function() {
				var stopEvent = function(e) {
					Event.stop(e);
				}
				//Event.observe(this.schIptEle, 'focus', this.showSelBox.bind(this));
				Event.observe(this.schIptEle, 'focus', this.clearSchIpt.bind(this));				// �󶨺��������򽹵��¼�����������Ĭ����ʾ��
				Event.observe(this.schIptEle, 'blur', this.resetSchIpt.bind(this,false));			// ͬ��
				Event.observe(this.schIptEle, 'keyup', this.schFriend.bind(this));					// �󶨼����¼�������ʵ��ʵʱ���� 
				Event.observe(this.schIptEle, 'click', stopEvent.bindAsEventListener());					// �󶨼����¼�������ʵ��ʵʱ����
				Event.observe(this.selToggleEle, 'click', this.setSelBox.bind(this,false));			// ����ʾ�����غ���ѡ��㰴ť�ĵ��ʱ�䣬�������ػ���ʾ����ѡ���
				Event.observe(this.schClearEle, 'click', this.resetSchIpt.bind(this,true));			// �����������ť�ĵ��ʱ�䣬�������������
				Event.observe(this.selAllEle, 'click', this.selectAll.bind(this));					// ��ȫѡ��ť�ĵ���¼�������ʵ��ѡ��ȫ������
				Event.observe(this.selCancelEle, 'click', this.selectCancel.bind(this,false));		// ��ȡ����ť�ĵ���¼�������ʵ��ȡ��ѡ�еĺ���
				Event.observe(this.selRandomEle, 'click', this.selectRandom.bind(this));			// �������ť�ĵ��ʱ�䣬����ʵ�����ѡ�����
				Event.observe(this.seledEle, 'click', this.selected.bind(this));					// ����ѡ��ť�ĵ���¼�������ʵ�ֲ鿴��ѡ����
				Event.observe(this.showAllEle, 'click', this.showAll.bind(this));					// �����а�ť�ĵ���¼�������ʵ����ʾ���к���
				Event.observe(this.fCtnrEle, 'click', this.selectSingle.bindAsEventListener(this));	// �󶨺�����������ĵ���¼�������ʵ��ѡ�񵥸�����
			},
			
			// ���ú���������Ĳ����ʾ״̬
			showSI: function(sValue){
				this.finderEle.style.display = sValue; 
			},
			
			// ���ù����������ʾ״̬
			showTB: function(sValue){
				this.toolbarEle.style.display = sValue; 
			},
			
			// ������ʾ���غ���ѡ��ť����ʾ״̬
			showSH: function(sValue){
				this.selToggleEle.style.display = sValue; 
			},
			
			// ���ú������������ʾ״̬
			showFL: function(sValue){
				this.showSelBox();
			},
			// ���õ�˫����ѵ���ʾ״̬
			showDF: function(disableSingle){
				this.disaSingle(disableSingle);
			},
			// ��ʾ����ѡ���
			showSelBox: function(){
				this.setSelBox(true);  // true ��ʾ���۱��������ػ���ʾ�������ʾ��������Toggle������
			},
			
			// ��պ����������е�Ĭ����ʾ����
			clearSchIpt: function(){
				this.showSelBox();	//����ʾ����ѡ��㣬׼������
				if(this.schIptEle.value == this.opts.tips.sch){
					this.schIptEle.value = '';	// ��ղ�����������ʽ
					this.schIptEle.className = Friend.Style.text;
				}
			},
			
			// ���ú����������е�Ĭ����ʾ����
			// ���������¼���һ���ǵ����ȡ����������ť������ã�һ���ǵ����ȡ��ѡ�񡿰�ť�������
			resetSchIpt: function(enforce){	// enforce��true ȡ������,false ȡ��ѡ��
				if(typeof(enforce) != 'undefined' && enforce){
					this.schIptEle.value = this.opts.tips.sch;
					this.schIptEle.className = Friend.Style.grey;
					this.selectCancel(enforce);	// �����󣬲��������лƵ׵ı���ɫ�����ﴫ�ݲ�����ʶ��Ҫ�������ɺ���Li��ǩ����ȥ����ɫ����ɫ
				}
				else{
					if(this.schIptEle.value == ''){		//������Ϊ��ʱ���ã�����ʾ���к���
						this.schIptEle.value = this.opts.tips.sch;
						this.schIptEle.className = Friend.Style.grey;
						this.showAll();
					}
				}
			},
			
			// �������ѣ���������Google��ַ�����������������ֱ��ȥ����ҳ�����HTML��ǩ��
			// ����ֱ����������JSON���ݣ�������������Դ���Ѱ��������ؼ��ʵ������ñ�Ƶķ�ʽ��ʾ����
			// ��û�йؼ��ֵ�����ʾ��
			schFriend: function(){
				// ֻ�е������ؼ��ʲ����ϴ�һ��ʱ������������
				if(this.schIptEle.value == this.keyword)
					return ;
				// ��ȡ�����ؼ���
				this.keyword = this.schIptEle.value == this.opts.tips.sch ? '' : this.schIptEle.value.toLowerCase();
				// �Ƶױ���ɫ���÷�ʽ
				var repTxt = '<strong>'+this.keyword+'</strong>';
				var arr = [];
				if(this.keyword == '')	// �ؼ���Ϊ��ʱ���ء�ȡ����������ť����������ʾ
					this.schClearEle.style.display='none';
				else
					this.schClearEle.style.display='block';;
				for (var i=0;i<this.friends.length; i++) {
					var f = this.friends[i];
					if(typeof(f)!='undefined'){
						var liClass='',initLiClass = '',liState='',title= f.title;
						var double='<div class="friend">˫�����</div>';
					
						// �ж��Ƿ��ǵ������
						if(f.relations == Friend.Type.single){
							initLiClass = 'single';
							liClass = initLiClass;
							double = '';
						}
						liClass=this.fLiTags[i].className; // ��ȡ��ǰ�Ѿ�ѡ��ĺ���
						// ����û�����Ĺؼ��ʲ�Ϊ�գ��ͱ�ʾҪ����ˢѡ�����Ұ�ƥ����û��������еĹؼ�������Ϊ��ɫ����
						if(this.keyword != ''){
							if(f.title.toLowerCase().indexOf(this.keyword) != -1)
								title = f.title.toLowerCase().replace(this.keyword,repTxt); 	// ���ûƵױ���ʱ����дͳһת��ΪСд
							else
								liState='style="display:none;"';
						}
						var icon = '';
						if(f.icon)
							icon = f.icon;
						else
							icon = f.ico;	
						arr.push('<li id="'+f.passport+'" class="'+liClass+'"  initClass="'+initLiClass+'" '+liState+' >'+
										'<a href="javascript:void(0)">'+
											'<div class="icon"><img src="'+icon+'" /></div>'+
											'<div class="info">'+title+'</div>'+double+
											'<em>��ѡ</em>'+
										'</a>'+
									'</li>');
					}
				}
				this.fCtnrEle.innerHTML = arr.join('');
				this.fLiTags = this.fCtnrEle.childElements();// ���еĺ���LI��ǩ
				this.setToolEle(this.curToolEle);	// ȡ�����ܰ�ť��ѡ��״̬
			},
			
			// ��ʾ�������غ���ѡ���
			setSelBox: function(isShow){
				if(typeof(isShow) != 'undefined' && isShow)
					this.selLayerEle.style.display='block';// show();
				else
					this.selLayerEle.toggle(); // Toggle ������
				this.selToggleEle.className = this.selLayerEle.visible()? Friend.Style.hide : Friend.Style.show;
				setCookie('friLayerDisplay', this.selLayerEle.style.display != 'none' ? 'block' : 'none', 'never', '/', document.location.href.indexOf("blog.sohu.com") != -1 ? 'blog.sohu.com' : document.domain);
			},
			// ѡ�����к���
			selectAll: function(){
				// ֻ�е���ȫѡ����ť��Ϊѡ��״̬ʱ����ִ��ȫѡ����
				if(this.selAllEle.className == Friend.Style.current)
					return;
				var disableSingle = this.disableSingle;
				this.fLiTags.each(
					function(li){
						if(!(disableSingle && li.className == Friend.Style.single))	// �����ֹ�������ʱ�����˵��������
							$(li).show().className = Friend.Style.selected;
					}
				);
				this.setToolEle(this.selAllEle);	// ���á�ȫѡ����ťΪѡ��״̬
				this.setSelected();			// ������ѡ������
			},
			// ȡ������ѡ��
			selectCancel: function(reset){
				// ֻ�е���ȡ��ѡ�񡿰�ť��Ϊѡ��״̬ʱ����ִ��ȡ��ѡ����
				if(this.selCancelEle.className == Friend.Style.current)
					return;
				this.fLiTags.each(
					function(li){
						if(typeof(reset)!= 'undefined' && !reset)	// ֻ�е����ǹر�����ʱ��
							$(li).show().className = li.getAttribute('initClass');//Friend.Style.normal;
					}
				);
				if(typeof(reset)!= 'undefined' && reset)
					this.schFriend();	// �����������ѹ��ܣ��������ɺ���Li��ǩ��Ŀ����ȥ��������ƥ��ؼ��ʵĻ�ɫ����
				else
					this.setToolEle(this.selCancelEle);	// ���á�ȡ��ѡ�񡿰�ťΪѡ��״̬
				this.setSelected();	// ������ѡ������
			},
			// ���ѡ��5������
			selectRandom: function(){
				var fCount = this.friends.length -1 ; // ��������
				this.selectCancel(false);	// ȡ����ǰѡ��
				if(this.friends.length <= this.opts.rndCount){
					for(var i=0 ; i < this.friends.length ; i++){
						var li = this.fLiTags[i];
						// �����ֹ�������ʱ�����˵�������ѣ����ҹ������ظ�ѡ��ͬһ����
						if(!(this.disableSingle && li.className == Friend.Style.single) )
							li.className = Friend.Style.selected;
					}
				}
				else{
					for(var i=0 ; i < this.opts.rndCount ; i++){
						var index = Math.floor(Math.random()*fCount);
						var li = this.fLiTags[index];
						// �����ֹ�������ʱ�����˵�������ѣ����ҹ������ظ�ѡ��ͬһ����
						if((this.disableSingle && li.className == Friend.Style.single) 
							|| li.className == Friend.Style.selected)
							i=i-1;
						else
							li.className = Friend.Style.selected;
					}
				}
				this.setToolEle(this.selRandomEle);	// ���á����ѡ����ѡ���ťΪѡ��״̬
				this.selected();	// ���ѡ����ɺ�ֱ��������ѡ���ѷ�����ʾ���ѡ��ĺ���
				this.setSelected();	// ������ѡ������
			},
			
			// �Ѿ�ѡ��ĺ���
			selected: function(){
				// ֻ�е�����ѡ����ť��Ϊѡ��״̬ʱ����ִ����ʾ��ѡ����
				if(this.seledEle.className == Friend.Style.current)
					return;
				this.fLiTags.each(
					function(li){
						if(li.className != Friend.Style.selected)
							$(li).hide();
					}
				);
				this.setToolEle(this.seledEle);	// ���á���ѡ����ťΪѡ��״̬
			},
			
			// ��ʾ���к���
			showAll: function(){
				// ֻ�е������С���ť��Ϊѡ��״̬ʱ����ִ����ʾ���й���
				if(this.showAllEle.className == Friend.Style.current)
					return;
				this.fLiTags.each(
					function(li){
						$(li).show();
					}
				);
				this.setToolEle(this.showAllEle);		// ���á����С���ťΪѡ��״̬
			},
			
			// �������ѵ�ѡ����ȡ��
			selectSingle: function(e){
				if(this.opts.seMode == Friend.SeMode.radio && this.curFid && this.curFid != '')
					$(this.curFid).className = $(this.curFid).getAttribute('initClass');	// ȡ��ѡ��ʱ���ָ���ʼ��ʽ
				var li = this.getEvtEle(e,this.fCtnrEle);	// ͨ��e��ȡ��ǰ����ĺ���Li��ǩ
				if(!li) return;
				// �����ֹ�������ʱ�����˵��������
				if(li && !(li.className == Friend.Style.single && this.disableSingle)){
					if(li.className != Friend.Style.selected)
						li.className = Friend.Style.selected;
					else
						li.className = li.getAttribute('initClass');	// ȡ��ѡ��ʱ���ָ���ʼ��ʽ
					this.fLiTags = this.fCtnrEle.childElements();// ���еĺ���LI��ǩ
					this.setSelected();			// ������ѡ������
					this.setToolEle(this.curToolEle);	// ȡ�����ܰ�ť��ѡ��״̬
					this.curFid = li.id;	// ���õ�ǰѡ�еĺ���ID
					// �����û���Ϣ
					var ubd = this.UBD[li.id];
					ubd.passport = li.id;
					this.opts.callBack(ubd);	// ���ûص�����,���ظ��û������Ϣ
				}
				else{
					if(typeof friendPokeHome!=undefined){
						jQuery.alert({title:'��Ϣ', content: this.opts.tips.alert, onClose:function() {
					}});

					}else{
						Dialog.instance({
						title: this.opts.tips.alert,//'�Է�û����Ϊ���ѣ�ֻ�ܶ���ʹ�ü򵥶���Ŷ~',
						button:[{
							value:'ȷ��'
						}]
					});
					}
					
				}	// �����ֹ�������ʱ��ѡ������Ѹ����������ʾ
					
			},
			// ���ù�����������ǰѡ�й��ܵ���ʽ
			setToolEle: function(a){
				this.curToolEle.className = Friend.Style.normal;
				if(a != this.curToolEle){	// ֻ��Ŀ�겻�ǵ�ǰѡ��״̬ʱ�Ű�Ŀ������Ϊѡ��״̬
					a.className = Friend.Style.current;
					this.curToolEle = a;
				}
			},
			
			// ���¼������ȡָ����HTML���������ǻ�ȡ����
			getEvtEle: function(e,parent){
				var ele = Event.element(e);
				if (ele == parent)
					return null;
				do {
					if (ele.parentNode && ele.parentNode == parent) break;
				} while(ele = ele.parentNode)
				return ele;
			},
			
			// ���õ�������Ƿ��ѡ
			disaSingle: function(disable){
				if(typeof(disable) != 'undefined' && this.disableSingle != disable){
					if(disable){
						this.fLiTags.each(
							function(li){
								if(li.getAttribute('initClass') == Friend.Style.single && li.className == Friend.Style.selected)
									li.className = Friend.Style.single;
							}
						);
						this.selBoxEle.addClassName(Friend.Style.disableSingle);
						this.disableSingle = true;
					}
					else{
						this.selBoxEle.removeClassName(Friend.Style.disableSingle);
						this.disableSingle = false;	
					}
				}
			},
			// ������ѡ���ѵı�ֵ�ͼ�����
			setSelected: function(){
				var selectedFriends = this.fCtnrEle.select('li.selected');
				var arr = [];
				for(var i =0 ; i < selectedFriends.length ; i++)
					arr.push(selectedFriends[i].id);
				this.seledInput.value = arr.join(',');
				this.fSeledCountEle.innerHTML = selectedFriends.length;
			}
		});
		
		/**
		 * @param {Object} options ��������
		 * 		parent : HTMLElement, ������
		 */
		Friend.init = function(options) {
			return new Friend(options);
		};
		
		/**
		 * �������ͣ������޺��ѹ�ϵ��������Ѻ�˫�����
		 */
		Friend.Type={
			single:1,	// �������
			double:2	// ˫�����
		};
		
		/**
		 * ��ʾ��ʽ
		 */
		Friend.Display = {
			show : 'block',
			hide : 'none;'
		};
		
		/**
		 * ��ʽģʽ
		 */
		Friend.StMode = {
			normal : '1'
		};
		
		/**
		 * ��Сģʽ
		 */
		Friend.SiMode = {
			small : '1',
			middle : '2',
			big:'3'
		};
		
		/**
		 * ѡ��ģʽ
		 */
		Friend.SeMode = {
			radio : '1',
			check : '2'
		};
			
		/**
		 * ����ѡ���г��õ���ʾ����
		 */
		Friend.Tips={
			search: '����������ĳ�����ѵĲ�������...'
		};
		/**
		 * ����ѡ���г�����ʽ��
		 */
		Friend.Style={
			text: 'text',
			grey:'text grey', 
			show: 'show',
			hide: 'hide',
			normal:'',
			selected:'selected',
			single:'single',
			current:'current',
			disableSingle:'couplesOnly',
			invisible:'invisible'
		};
		
		// ��֤�Ƿ�ѡ�����û�
		Friend.valid = function(){
			if($F('selectedFriends') == ''){
				//alert('�����붯�����ݣ����磺���ˣ����� һ��');
				Dialog.instance({
						title: '����ѡ�����',
						button:[{
							value:'ȷ��'
						}]
					});
				return false;
			}
			return true;
		};
		
		
	/********************************  �û���Ϣ����  ***********************************/
	$declare('blog.user.User', {
		
		//	ͨ��һЩxptȡ���û��Ĳ�����Ϣ
		getInfos: function(xpts, callback) {
			if (typeof(xpts) == 'object' && xpts != null && xpts.length > 0) xpts = xpts.join(',');
			if (xpts.length == 0) return;
			
			/*
			//	����url�ĳ��������ƣ�������xpt̫��Ļ����Ǿͷֳɼ���
			var str = xpts, sects = [];
			sects.readyCount = 0;
			while (str.length > 1930) {
				var i = str.substr(0, 1930).lastIndexOf(',');
				sects.push(str.substr(0, i));
				str = str.substr(i+1);
			}
			sects.push(str);
			
			//	����ֱ��������
			for (var i=0, il=sects.length; i<il; i++) {
				new Ajax.Request('/service/userinfo.jsp?xp=' + sects[i], {
						onSuccess: function(transport) {
							if (transport.responseText) {
								var json = eval('(' + transport.responseText + ')');
								if (json) {
									if (!window.UserBlogData) window.UserBlogData = {};
									for (var it in json) {
										if (json[it] && json[it].url) {
											UserBlogData[it] = json[it];
											UserBlogData[it]._stranger = true;
										}
									}
									
									if (++sects.readyCount >= sects.length && typeof(callback) == 'function') callback();
								}
							}
						}
				});
			}
			*/
			new Ajax.Request('/service/userinfo.jsp', {
					postBody: 'xp=' + xpts,
					onSuccess: function(transport) {
						if (transport.responseText) {
							var json = eval('(' + transport.responseText + ')');
							if (json) {
								if (!window.UserBlogData) window.UserBlogData = {};
								for (var it in json) {
									if (json[it] && json[it].url) {
										UserBlogData[it] = json[it];
										UserBlogData[it]._stranger = true;
									}
								}
								if (typeof(callback) == 'function') callback();
							}
						}
					}
			});
		},
		
		//	����û��Ĳ�����Ϣ
		fill: function() {
			var xpts = this._fill();
			
			//	�������δ֪��xpt���Ǿ����������
			if (xpts.length > 0) this.getInfos(xpts, this._fill);
		},
		_fill: function() {
			//	�ж��Ƿ����һ��ȫ�ֵ��û�������Ϣ�Ķ���û�еĻ����Ƚ����������
			if (!window.UserBlogData) window.UserBlogData = {};
			var U = UserBlogData;
			
			//	ѭ�����е�Ԫ�أ���������û���Ϣ���Ǿ����ò�����Ϣ����������ڲ�����Ϣ���Ǿͼ�¼��xpt
			var eles = document.getElementsByName("BlogUser"),
					el, xpt, xpts = [];
			for (var i=0, il=eles.length; i<il; i++) {
				if (i >= eles.length) break;
				el = eles[i];
				//	ȷ�ϴ���xpt���ԣ����һ�û��������û���Ϣ���������data-blogStatus���ԣ���ʾ�Ѿ������������Ϣ��
				if ((xpt = Attr.data(el, 'xpt')) && (!Attr.data(el, 'blogStatus') || Attr.data(el, 'blogStatus') != 1)) {
					if (U[xpt]) {
						Attr.expContext(U[xpt], el, 'blogExp');
						Attr.data(el, 'blogStatus', '1');
					} else {
						xpts.push(xpt);
					}
				}
			}
			
			return xpts;
		}
		
	});
		
}, 'util.common');