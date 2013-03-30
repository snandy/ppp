/**
 *	@fileoverview 这个文件包含一个POKE APP 中 Friend选择类的实现
 * 
 *	@author Springwang wywy_1208@hotmail.com
 *	@version 0.1
 *	First Created: 2008-08-19	
 *	Last Update: 2008-08-25
 */
 
/**	
 * 依赖类：
 *		common/common
 */

/**
 *	friend 类实现
 *	@class Friend
 *	@return Friend
 */
 
/**(parent)
 * @param {Object} options 选项（必填项），其包括如下属性:
 * 		parent: {String Or Object} 显示发送好友的父容器。
 * 		showSI : { enum } 好友搜索框显示控制，默认为显示
 *		showTB : { enum } 工具栏显示控制，默认为显示
 *		showSH : { enum } 显示隐藏好友选择按钮的控制，默认为显示
 *		showFL : { enum } 好友选择层的显示控制，默认为显示
 *		showDF : { boolean } 单双向好友的显示控制,默认显示所有好友
 *		stMode : { enum } 好友显示样式模式，默认为正常
 *		siMode : { enum } 整个好友选择器的大小模式，默认为大
 *		seMode : { enum } 好友选择模式，默认多选
 *		callBack : { enum } 选择好友后的回调方法，默认为空
 *		rndCount: { number } 随机选择好友的数量
 * 		tips:{array} 操作提示，包括，设置单向好友不可选的时的提示和点击单向好友时的提示{top:'',alert:''}
 */
$register('blog.user',function(){
	
	/********************************  有关好友的类  ***********************************/
		window.Friend = Class.create({
			// 初始化
			initialize: function(options) {
				this.setOpt(options);
				this.initPpt();	
				this.build();
				this.initEles();
				this.initEvts();
				this.disaSingle(this.opts.showDF);
			},
			
			initPpt: function(){
				this.UBD = window.UserBlogData;	// 好友数据object格式
				this.friends = this.$A(this.UBD);		// 把object形式转换成array形式
				this.keyword = '';						// 用于存放搜索关键词
				this.disableSingle = false;	// 			// 设置单向好友是否可选
				this.curFid = null;
			},
			
			// 好友数据转换成一个数组
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
			// 设置参数
			setOpt: function(options) {
				options.tips = Object.extend({
						sch: Friend.Tips.search,
						top : '',
						alert : ''},
					options.tips),	// 各种文字提示
				this.opts = Object.extend({
						parent : document.body,			// 好友选择器的父容器
						showSI : Friend.Display.show,	// 好友搜索框显示控制，默认为显示
						showTB : Friend.Display.show,	// 工具栏显示控制，默认为显示
						showSH : Friend.Display.show,	// 显示隐藏好友选择按钮的控制，默认为显示
						showFL : getCookie('friLayerDisplay') || Friend.Display.hide,	// 好友选择层的显示控制，默认为显示
						showDF : false,		// 单双向好友的显示控制,默认显示所有好友
						
						stMode : Friend.StMode.normal,	// 好友显示样式模式，默认为正常
						siMode : Friend.SiMode.big,		// 整个好友选择器的大小模式，默认为大
						seMode : Friend.SeMode.check,	// 好友选择模式，默认多选
						callBack : Prototype.emptyFunction,	// 选择好友后的回调方法，默认为空
						rndCount:5},	// 随机选择的数量控制
					options || {});
				this.opts.parent = $(this.opts.parent);
				this.opts.parent.innerHTML = '正在加载...';
			},
			// 创建整个结构
			build: function() {
				//this.actions = window[vn];
				var arr = [],friends = this.friends;
				arr.push('<div id="fFinder" class="finder" style="display:'+this.opts.showSI+';">'+
								'<div class="finderWrap clearfix">'+
									'<div class="input">'+
										'<input id="fSearchIpt" type="text" value="'+this.opts.tips.sch+'" />'+
									'</div>'+
									'<div class="toggle">'+
										'<a id="fSeletorToggle" href="javascript:void(0)" class="show" style="display:'+this.opts.showSH+';">全部好友</a>'+
										'<a id="fSearchClear" href="javascript:void(0)" class="all" style="display:none;">全部好友</a>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div id="fSelectLayer" class="selector clearfix" style="display:'+this.opts.showFL+';">'+
								'<div id="fsToolbar" class="options clearfix" style="display:'+this.opts.showTB+';">'+
									'<div class="method"><a id="fSelectAll" href="javascript:void(0)" >全选</a> | <a id="fSelectCancel" href="javascript:void(0)" >取消选择</a> | <a id="fSelectRandom" href="javascript:void(0)" >随机选取'+this.opts.rndCount+'个人</a></div>'+
									'<div class="filter"><a id="fSelected" href="javascript:void(0)">已选</a>(<span id="fSeledCount">0</span>) | <a id="fShowAll" class="current" href="javascript:void(0)">所有</a>(<span id="fAllCount">'+this.friends.length+'</span>)</div>'+
								'</div>'+
								'<div id="fSelectBox" class="friends">'+
									'<div id="fAlert" class="selectTip">'+this.opts.tips.top+'</div>'+
									'<ul id="fContainer" class="clearfix">');
				for (var i=0;i<friends.length; i++) {
					var liClass='',double='<div class="friend">双向好友</div>',f = friends[i];
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
										'<em>已选</em>'+
									'</a>'+
								'</li>');
					}
				}
				arr.push('</ul></div><div class="footTip">当对方也加你为好友时显示该图标</div></div>');
				arr.push('<input type="hidden" name="selectedFriends" id="selectedFriends" value="" />');
				this.opts.parent.innerHTML = arr.join('');
			},
			
			//	取得常用的元素
			initEles: function() {
				this.finderEle = $('fFinder');				// 好友搜索框的层
				this.schIptEle = $('fSearchIpt');			// 好友搜索框
				this.selToggleEle = $('fSeletorToggle');	// 好友选择容器的隐藏和显示的触发链接
				this.schClearEle = $('fSearchClear');		// 清空好友搜索框链接
				this.selAllEle = $('fSelectAll');			// 选择所有好友链接
				this.selCancelEle = $('fSelectCancel');		// 取消选择所有链接
				this.selRandomEle = $('fSelectRandom');		// 随机选取链接
				this.seledEle = $('fSelected');				// 已经选择的好友
				this.showAllEle = $('fShowAll');			// 显示所有好友
				this.fSeledCountEle = $('fSeledCount');		// 已选的好友数
				this.fAllCountEle = $('fAllCount');			// 总的好友数
				this.selLayerEle = $('fSelectLayer');		// 好友选择层
				this.toolbarEle	= $('fsToolbar');			// 工具栏
				this.selBoxEle = $('fSelectBox');			// 好友选择框
				this.fCtnrEle = $('fContainer');			// 好友父容器
				this.fLiTags = this.fCtnrEle.childElements();// 所有的好友LI标签
				this.curToolEle = this.showAllEle;			// 当前选中的功能A标签
				this.seledInput = $('selectedFriends');		// 已选择好友的隐藏表单字段
			},
			
			//	绑定相应元素的事件
			initEvts: function() {
				var stopEvent = function(e) {
					Event.stop(e);
				}
				//Event.observe(this.schIptEle, 'focus', this.showSelBox.bind(this));
				Event.observe(this.schIptEle, 'focus', this.clearSchIpt.bind(this));				// 绑定好友搜索框焦点事件，用来处理默认提示语
				Event.observe(this.schIptEle, 'blur', this.resetSchIpt.bind(this,false));			// 同上
				Event.observe(this.schIptEle, 'keyup', this.schFriend.bind(this));					// 绑定键盘事件，用来实现实时搜索 
				Event.observe(this.schIptEle, 'click', stopEvent.bindAsEventListener());					// 绑定键盘事件，用来实现实时搜索
				Event.observe(this.selToggleEle, 'click', this.setSelBox.bind(this,false));			// 绑定显示和隐藏好友选择层按钮的点击时间，用来隐藏或显示好友选择层
				Event.observe(this.schClearEle, 'click', this.resetSchIpt.bind(this,true));			// 绑定清空搜索框按钮的点击时间，用来清空搜索框
				Event.observe(this.selAllEle, 'click', this.selectAll.bind(this));					// 绑定全选按钮的点击事件，用来实现选择全部好友
				Event.observe(this.selCancelEle, 'click', this.selectCancel.bind(this,false));		// 绑定取消按钮的点击事件，用来实现取消选中的好友
				Event.observe(this.selRandomEle, 'click', this.selectRandom.bind(this));			// 绑定随机按钮的点击时间，用来实现随机选择好友
				Event.observe(this.seledEle, 'click', this.selected.bind(this));					// 绑定已选按钮的点击事件，用来实现查看已选好友
				Event.observe(this.showAllEle, 'click', this.showAll.bind(this));					// 绑定所有按钮的点击事件，用来实现显示所有好友
				Event.observe(this.fCtnrEle, 'click', this.selectSingle.bindAsEventListener(this));	// 绑定好友外层容器的点击事件，用来实现选择单个好友
			},
			
			// 设置好友搜索框的层的显示状态
			showSI: function(sValue){
				this.finderEle.style.display = sValue; 
			},
			
			// 设置工具栏层的显示状态
			showTB: function(sValue){
				this.toolbarEle.style.display = sValue; 
			},
			
			// 设置显示隐藏好友选择按钮的显示状态
			showSH: function(sValue){
				this.selToggleEle.style.display = sValue; 
			},
			
			// 设置好友搜索层的显示状态
			showFL: function(sValue){
				this.showSelBox();
			},
			// 设置单双向好友的显示状态
			showDF: function(disableSingle){
				this.disaSingle(disableSingle);
			},
			// 显示好友选择层
			showSelBox: function(){
				this.setSelBox(true);  // true 表示无论本身是隐藏或显示，最后都显示，而不是Toggle触发器
			},
			
			// 清空好友搜索框中的默认提示文字
			clearSchIpt: function(){
				this.showSelBox();	//　显示好友选择层，准备搜索
				if(this.schIptEle.value == this.opts.tips.sch){
					this.schIptEle.value = '';	// 清空并设置文字样式
					this.schIptEle.className = Friend.Style.text;
				}
			},
			
			// 重置好友搜索框中的默认提示文字
			// 包括两个事件，一个是点击【取消搜索】按钮后的重置，一个是点击【取消选择】按钮后的重置
			resetSchIpt: function(enforce){	// enforce：true 取消搜索,false 取消选择
				if(typeof(enforce) != 'undefined' && enforce){
					this.schIptEle.value = this.opts.tips.sch;
					this.schIptEle.className = Friend.Style.grey;
					this.selectCancel(enforce);	// 搜索后，博客名中有黄底的背景色，这里传递参数标识需要重新生成好友Li标签，已去掉黄色背景色
				}
				else{
					if(this.schIptEle.value == ''){		//搜索框为空时重置，并显示所有好友
						this.schIptEle.value = this.opts.tips.sch;
						this.schIptEle.className = Friend.Style.grey;
						this.showAll();
					}
				}
			},
			
			// 搜索好友：这里类似Google网址导航里的搜索，不是直接去搜索页面里的HTML标签，
			// 而是直接搜索好友JSON数据，把它当作数据源，把包含搜索关键词的数据用标黄的方式显示出来
			// 而没有关键字的则不显示。
			schFriend: function(){
				// 只有当搜索关键词不和上次一样时才做搜索操作
				if(this.schIptEle.value == this.keyword)
					return ;
				// 获取搜索关键词
				this.keyword = this.schIptEle.value == this.opts.tips.sch ? '' : this.schIptEle.value.toLowerCase();
				// 黄底背景色设置方式
				var repTxt = '<strong>'+this.keyword+'</strong>';
				var arr = [];
				if(this.keyword == '')	// 关键词为空时隐藏【取消搜索】按钮，反正则显示
					this.schClearEle.style.display='none';
				else
					this.schClearEle.style.display='block';;
				for (var i=0;i<this.friends.length; i++) {
					var f = this.friends[i];
					if(typeof(f)!='undefined'){
						var liClass='',initLiClass = '',liState='',title= f.title;
						var double='<div class="friend">双向好友</div>';
					
						// 判断是否是单向好友
						if(f.relations == Friend.Type.single){
							initLiClass = 'single';
							liClass = initLiClass;
							double = '';
						}
						liClass=this.fLiTags[i].className; // 获取当前已经选择的好友
						// 如果用户输入的关键词不为空，就表示要进行刷选，并且把匹配的用户博客名中的关键词设置为黄色背景
						if(this.keyword != ''){
							if(f.title.toLowerCase().indexOf(this.keyword) != -1)
								title = f.title.toLowerCase().replace(this.keyword,repTxt); 	// 设置黄底背景时，大写统一转换为小写
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
											'<em>已选</em>'+
										'</a>'+
									'</li>');
					}
				}
				this.fCtnrEle.innerHTML = arr.join('');
				this.fLiTags = this.fCtnrEle.childElements();// 所有的好友LI标签
				this.setToolEle(this.curToolEle);	// 取消功能按钮的选中状态
			},
			
			// 显示或者隐藏好友选择层
			setSelBox: function(isShow){
				if(typeof(isShow) != 'undefined' && isShow)
					this.selLayerEle.style.display='block';// show();
				else
					this.selLayerEle.toggle(); // Toggle 触发器
				this.selToggleEle.className = this.selLayerEle.visible()? Friend.Style.hide : Friend.Style.show;
				setCookie('friLayerDisplay', this.selLayerEle.style.display != 'none' ? 'block' : 'none', 'never', '/', document.location.href.indexOf("blog.sohu.com") != -1 ? 'blog.sohu.com' : document.domain);
			},
			// 选中所有好友
			selectAll: function(){
				// 只有当【全选】按钮不为选中状态时，才执行全选功能
				if(this.selAllEle.className == Friend.Style.current)
					return;
				var disableSingle = this.disableSingle;
				this.fLiTags.each(
					function(li){
						if(!(disableSingle && li.className == Friend.Style.single))	// 如果禁止单向好友时，过滤掉单向好友
							$(li).show().className = Friend.Style.selected;
					}
				);
				this.setToolEle(this.selAllEle);	// 设置【全选】按钮为选择状态
				this.setSelected();			// 设置已选好友数
			},
			// 取消所有选择
			selectCancel: function(reset){
				// 只有当【取消选择】按钮不为选中状态时，才执行取消选择功能
				if(this.selCancelEle.className == Friend.Style.current)
					return;
				this.fLiTags.each(
					function(li){
						if(typeof(reset)!= 'undefined' && !reset)	// 只有当不是关闭搜索时候，
							$(li).show().className = li.getAttribute('initClass');//Friend.Style.normal;
					}
				);
				if(typeof(reset)!= 'undefined' && reset)
					this.schFriend();	// 调用搜索好友功能，重新生成好友Li标签，目的是去掉搜索后被匹配关键词的黄色背景
				else
					this.setToolEle(this.selCancelEle);	// 设置【取消选择】按钮为选择状态
				this.setSelected();	// 设置已选好友数
			},
			// 随机选中5个好友
			selectRandom: function(){
				var fCount = this.friends.length -1 ; // 好友总数
				this.selectCancel(false);	// 取消当前选择
				if(this.friends.length <= this.opts.rndCount){
					for(var i=0 ; i < this.friends.length ; i++){
						var li = this.fLiTags[i];
						// 如果禁止单向好友时，过滤掉单向好友，并且过滤了重复选择同一好友
						if(!(this.disableSingle && li.className == Friend.Style.single) )
							li.className = Friend.Style.selected;
					}
				}
				else{
					for(var i=0 ; i < this.opts.rndCount ; i++){
						var index = Math.floor(Math.random()*fCount);
						var li = this.fLiTags[index];
						// 如果禁止单向好友时，过滤掉单向好友，并且过滤了重复选择同一好友
						if((this.disableSingle && li.className == Friend.Style.single) 
							|| li.className == Friend.Style.selected)
							i=i-1;
						else
							li.className = Friend.Style.selected;
					}
				}
				this.setToolEle(this.selRandomEle);	// 设置【随机选择好友】按钮为选择状态
				this.selected();	// 随机选择完成后，直接条用已选好友方法显示随机选择的好友
				this.setSelected();	// 设置已选好友数
			},
			
			// 已经选择的好友
			selected: function(){
				// 只有当【已选】按钮不为选中状态时，才执行显示已选功能
				if(this.seledEle.className == Friend.Style.current)
					return;
				this.fLiTags.each(
					function(li){
						if(li.className != Friend.Style.selected)
							$(li).hide();
					}
				);
				this.setToolEle(this.seledEle);	// 设置【已选】按钮为选择状态
			},
			
			// 显示所有好友
			showAll: function(){
				// 只有当【所有】按钮不为选中状态时，才执行显示所有功能
				if(this.showAllEle.className == Friend.Style.current)
					return;
				this.fLiTags.each(
					function(li){
						$(li).show();
					}
				);
				this.setToolEle(this.showAllEle);		// 设置【所有】按钮为选择状态
			},
			
			// 单个好友的选中与取消
			selectSingle: function(e){
				if(this.opts.seMode == Friend.SeMode.radio && this.curFid && this.curFid != '')
					$(this.curFid).className = $(this.curFid).getAttribute('initClass');	// 取消选择时，恢复初始样式
				var li = this.getEvtEle(e,this.fCtnrEle);	// 通过e获取当前点击的好友Li标签
				if(!li) return;
				// 如果禁止单向好友时，过滤掉单向好友
				if(li && !(li.className == Friend.Style.single && this.disableSingle)){
					if(li.className != Friend.Style.selected)
						li.className = Friend.Style.selected;
					else
						li.className = li.getAttribute('initClass');	// 取消选择时，恢复初始样式
					this.fLiTags = this.fCtnrEle.childElements();// 所有的好友LI标签
					this.setSelected();			// 设置已选好友数
					this.setToolEle(this.curToolEle);	// 取消功能按钮的选中状态
					this.curFid = li.id;	// 设置当前选中的好友ID
					// 传回用户信息
					var ubd = this.UBD[li.id];
					ubd.passport = li.id;
					this.opts.callBack(ubd);	// 调用回调函数,传回该用户相关信息
				}
				else{
					if(typeof friendPokeHome!=undefined){
						jQuery.alert({title:'消息', content: this.opts.tips.alert, onClose:function() {
					}});

					}else{
						Dialog.instance({
						title: this.opts.tips.alert,//'对方没加你为好友，只能对他使用简单动作哦~',
						button:[{
							value:'确定'
						}]
					});
					}
					
				}	// 如果禁止单向好友时，选择单向好友给予下面的提示
					
			},
			// 设置功能链接区域当前选中功能的样式
			setToolEle: function(a){
				this.curToolEle.className = Friend.Style.normal;
				if(a != this.curToolEle){	// 只有目标不是当前选中状态时才把目标设置为选中状态
					a.className = Friend.Style.current;
					this.curToolEle = a;
				}
			},
			
			// 从事件对象获取指定的HTML对象，这里是获取好友
			getEvtEle: function(e,parent){
				var ele = Event.element(e);
				if (ele == parent)
					return null;
				do {
					if (ele.parentNode && ele.parentNode == parent) break;
				} while(ele = ele.parentNode)
				return ele;
			},
			
			// 设置单向好友是否可选
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
			// 设置已选好友的表单值和计数器
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
		 * @param {Object} options 配置属性
		 * 		parent : HTMLElement, 父对象
		 */
		Friend.init = function(options) {
			return new Friend(options);
		};
		
		/**
		 * 好友类型，包括无好友关系，单向好友和双向好友
		 */
		Friend.Type={
			single:1,	// 单向好友
			double:2	// 双向好友
		};
		
		/**
		 * 显示样式
		 */
		Friend.Display = {
			show : 'block',
			hide : 'none;'
		};
		
		/**
		 * 样式模式
		 */
		Friend.StMode = {
			normal : '1'
		};
		
		/**
		 * 大小模式
		 */
		Friend.SiMode = {
			small : '1',
			middle : '2',
			big:'3'
		};
		
		/**
		 * 选择模式
		 */
		Friend.SeMode = {
			radio : '1',
			check : '2'
		};
			
		/**
		 * 好用选择中常用的提示文字
		 */
		Friend.Tips={
			search: '在这里输入某个好友的博客名称...'
		};
		/**
		 * 好用选择中常用样式名
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
		
		// 验证是否选择了用户
		Friend.valid = function(){
			if($F('selectedFriends') == ''){
				//alert('请输入动作内容，例如：捏了（他） 一下');
				Dialog.instance({
						title: '请先选择好友',
						button:[{
							value:'确定'
						}]
					});
				return false;
			}
			return true;
		};
		
		
	/********************************  用户信息的类  ***********************************/
	$declare('blog.user.User', {
		
		//	通过一些xpt取得用户的博客信息
		getInfos: function(xpts, callback) {
			if (typeof(xpts) == 'object' && xpts != null && xpts.length > 0) xpts = xpts.join(',');
			if (xpts.length == 0) return;
			
			/*
			//	由于url的长度有限制，因此如果xpt太多的话，那就分成几组
			var str = xpts, sects = [];
			sects.readyCount = 0;
			while (str.length > 1930) {
				var i = str.substr(0, 1930).lastIndexOf(',');
				sects.push(str.substr(0, i));
				str = str.substr(i+1);
			}
			sects.push(str);
			
			//	多组分别进行请求
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
		
		//	填充用户的博客信息
		fill: function() {
			var xpts = this._fill();
			
			//	如果还有未知的xpt，那就请求服务器
			if (xpts.length > 0) this.getInfos(xpts, this._fill);
		},
		_fill: function() {
			//	判断是否存在一个全局的用户博客信息的对象，没有的话就先建立这个对象
			if (!window.UserBlogData) window.UserBlogData = {};
			var U = UserBlogData;
			
			//	循环所有的元素，如果存在用户信息，那就设置博客信息，如果不存在博客信息，那就记录下xpt
			var eles = document.getElementsByName("BlogUser"),
					el, xpt, xpts = [];
			for (var i=0, il=eles.length; i<il; i++) {
				if (i >= eles.length) break;
				el = eles[i];
				//	确认存在xpt属性，并且还没有填充完用户信息（如果存在data-blogStatus属性，表示已经设置了相关信息）
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