/**
 *	@fileoverview 这个文件包含一个newsfeed类的实现
 * 
 *	@author Springwang wywy_1208@hotmail.com
 *	@Last Update: 2008-09-16
 *	@version 0.1
 */
 
/**	
 * 依赖类：
 *		common/common
 *		common/jquery
 */

/**
 *	newsfeed 类实现
 *	@class newsfeed
 *	@return newsfeed
 */
 
/**(type,topEl,listEl,st,sz,iptEl,sbtEl,leftEl,endel,auto,classify)
 * @param {Object} options 选项（必填项），其包括如下属性:
 * 		type: {String}类型（可选项），只有两种news和mini，默认值为news
 *		topEl: 表示news_board 对象
 * 		listEl: 列表对象（必填项）
 *		start: 从第几页开始时显示（可选项），默认值为0
 * 		size: {Number}显示数量（可选项），默认值为10
 * 		iptEl: 自言自语输入框对象（可选项）
 * 		sbtEl: 自言自语保存按钮对象（可选项）
 * 		leftEl: 自言自语所剩字数显示对象（可选项）
 * 		endel: 是否允许删除（用来控制是否显示删除按钮）
 * 		auto: {Number}自动刷新间隔，以毫秒为单位，如果不存在，那就不刷新（默认值即为不刷新）
 * 		classify: {Boolean}是否进行归类（可选项），默认值为true
 *		pagerEl: 翻页对象
 * 		onSucc: (ref) 发表完个人动态以后需要调用的方法
 */
var NewsFeed = Class.create({
 	initialize: function(options) {
		this.initOpt(options);
		this.initNewsList();
		this.setTimer();
	},
	
	/**
	 * 设置定时刷新
	 */
	setTimer: function(){
		if (typeof(this.options.auto) == "number") {
			this.autoTimer = window.setInterval(this.requestCont.bind(this), this.options.auto);
		}
	},
	/**
	 * 初始化参数选项
	 */
	initOpt: function(options) {
		var opt = Object.extend({
			start:0,			// 起始页
			size: 10,			// 显示数量
			type: NewsFeed.Type.N,	// 类型
			xpt: this.getXpt(),	// xbase64 passport
			classify: true,		// 是否归类
			endel: false		// 是否允许删除
		}, options || {});

		opt.listEl = $(opt.listEl);
		// 如果存在过滤器的话，那就设置过滤器
		if (opt.filter) {
		 	opt.filter.each(function(i) {
		 		opt.filter[i] = true;
		 	});
		 	if (typeof(opt.filterSize) != "number") opt.filterSize = opt.size;
		 }
		 this.options = opt;
	},
	/**
	 * 初始化消息列表
	 */
	initNewsList: function(){
		this.requestCont();
	},
	/**
	 * 初始化minifeed中的一些输入项
	 */
	initForm: function() {
		var opt = this.options;
		if (opt.iptEl && opt.sbtEl) {
			opt.iptEl = $(opt.iptEl);
			opt.sbtEl = $(opt.sbtEl);
			opt.sbtEl.observe('click',this.onSubmitMini.bind(this));
			if (opt.leftEl) {
				opt.leftEl = $(opt.leftEl);
				opt.iptEl.observe('keyup',this.onLeft.bind(this));
				opt.iptEl.observe('focus',this.onFocus.bind(this));
				opt.iptEl.observe('blur',this.onBlur.bind(this,false));
				this.onBlur(true);
			}
			document.observe('keydown',this.keyboardCtrl.bindAsEventListener(this));
		}
	},
	
	
	/**
	 * 用于显示还能够输入多少个字
	 */
	onLeft: function() {
		if (this.options.leftEl) {
			var left = Math.max((70-this.options.iptEl.value.trim().length), 0);
			this.options.leftEl.innerHTML = left > 0 ? ('可以输入' + left + '个字') : '不允许再输入';
		}
	},
	/**
	 * 当用户输入的时候，清空输入框的提示语
	 */
	 onFocus: function(){
	 	// isScrap 标识是否当前是否是碎片信息（1：是，0：不是）
	 	if(typeof(this.options.iptEl.isScrap)!='undefined' && this.options.iptEl.isScrap == "1"){
	 		this.options.iptEl.value = '';
	 		this.options.iptEl.className = 'miniblog_text';	
	 		this.options.iptEl.isScrap = 0;
	 	}
	 },
	 /**
	 * 当失去焦点的时候，判断是否需要重新设置碎片
	 */
	 onBlur: function(init){
	 	// isScrap 标识是否当前是否是碎片信息（1：是，0：不是）
	 	if(init || this.options.iptEl.value =='' ){
	 		this.options.iptEl.value = typeof(_miniBlogTipScrape) !='undefined' ? _miniBlogTipScrape : '一句话博客，好友能在动态里看到哦！';
	 		this.options.iptEl.className = 'miniblog_text grey';	
	 		this.options.iptEl.isScrap = 1;
	 	}
	 },
	 /**
	 * 键盘监测，实现enter发表一句话博客
	 */
	 keyboardCtrl: function(e){
	 	var keyCode = e.keyCode;
		if(e.charCode)
			keyCode = e.charCode;
		if(Event.element(e).getAttribute('useEnter')&& keyCode == 13){// 实现代表enter的键盘码
			this.onSubmitMini();
			Event.stop(e);
		}
	 },
	/**
	 * 保存自言自语的处理方法
	 */
	onSubmitMini: function() {
		if(typeof(this.options.iptEl.isScrap)!='undefined' && this.options.iptEl.isScrap == 1){
			this.options.iptEl.focus();
			return;
		}
		//	验证自言自语的有效性
		var value = this.options.iptEl.value;
		if (typeof(value) != "string" || value.trim().length == 0) {
			alert('内容不能为空');
			this.options.iptEl.focus();
			return;
		}
		value = value.trim();
		if (value.length > 70) {
			alert('内容限制为70个字');
			this.options.iptEl.focus();
			return;
		}
		
		this.options.sbtEl.value='正在发表'
		this.options.sbtEl.disabled =true;
		
		//	向服务器保存数据
		var vn = Time.now();
		var url = NewsFeed.domain + 'post?type=add&vn=' + vn + '&xpp=' + this.getXpt() + '&content=' + escape(value);
		new Groj(url, {
			variable: 'MiniBlog.newTalk_' + vn,
			onSuccess: this.gotSubmitMini.bind(this),
			onFailure: this.noGotSubmitMini.bind(this)
		});
	},
	/**
	 * 保存自言自语成功后的回调方法
	 */
	gotSubmitMini: function() {
		this.options.iptEl.value = '';
		//document.focus();//this.onBlur(false);
		this.onLeft();
		this.options.sbtEl.value='说一句';
		this.options.sbtEl.disabled =false;
		if(this.options.onSucc)
			this.options.onSucc();
		else
			this.requestCont();
	},
	/**
	 * 保存自言自语失败后的回调方法
	 */
	noGotSubmitMini: function() {
		alert("发表失败");
		this.options.sbtEl.value='说一句'
		this.options.sbtEl.disabled =false;
	},
	/**
	 * 设置加载状态
	 */
	loading: function(ele) {
		ele.innerHTML = '正在读取信息...';
	},
	/**
	 * 获取博主用户的passport xbase64编码
	 */
	 getXpt: function(){
	 	return window._xpt;
	 },
	 /**
	 * 获取异域访问时的变量名称
	 */
	 getVN: function(){
	 	return (this.options.type + Time.now());
	 },
	 
	 /**
	 * 列表翻页时跳到某一页去，传入的参数是页码
	 */
	 gotoPage: function(page){
	 	this.options.start = (page-1) * this.options.size;
	 	this.requestCont();
	 	this.options.start = page;
	 },
	 
	 /**
	 * 列表翻页时跳到某一页去，传入的参数是从第几条数据开始
	 */
	 gotoList: function(page){
	 	this.options.start = page;
	 	this.requestCont();
	 },
	/**
	 * 请求news数据
	 */
	requestCont: function() {
		this.loading(this.options.listEl);
		//	获取一些跟请求地址相关的变量
		var vn = this.getVN();//this.options.type + Time.now();
		var url = NewsFeed.domain + this.options.type + "?pp=" + this.getXpt() + "&st=" + this.options.start + "&sz=" + this.options.size + "&vn=" + vn;
		var _this = this;
		window.setTimeout(function() {
		 new Groj(url, {
		   variable: vn,
		   onSuccess: _this.showNews.bind(_this),
		   onFailure: _this.showError.bind(_this)
		 });
		}, 5);
	},
	
	/**
	 * 请求board数据
	 */
	requestBoard: function() {
		new Ajax.Request(NewsFeed.boardUrl + "?t=" + (new Date()).getTime(), {
			method: 'get',
			onSuccess: this.setBoardData.bind(this)
		});
	},
	
	/**
	 * 显示board数据
	 */
	setBoardData: function(transport) {
		this.options.topEl.innerHTML = transport.responseText;
	},
	/**
	 * 刷新列表
	 * @param {String} str 显示的提示语（可选项），如果没有就不显提示语，如果为空字符串，那就显示空字符串
	 */
	refresh: function(str) {
		if (typeof(str) == "string") this.options.listEl.update(str);
		this.requestCont();
	},
	/**
	 * 初始化翻页对象
	 */
	initPager: function(){
		if(!this.pager)
			this.pager = new Pager(this.options.pagerEl,this.options.size,this.gotoList.bind(this));
	},
	/**
	 * 成功收到服务器回应后的处理方法
	 */
	showNews: function(data) {
	  if (data.status == 0 && data.news) {
	  	this.count = data.count;
	  	if(this.options.pagerEl != null){
	  		this.initPager();
	  		this.pager.goStart(this.options.start,this.count);
	  	}
	  	var listData = data.news;
	  	if (this.options.filter) {
	  		listData = this.filterData(listData);
	  	}
	  	if (this.options.classify) {
	  		listData = this.sortData(listData);
	  	}
	    this.list(listData, this.options.classify);
	  } else {
	  	this.noData();
	  }
	},
	/**
	 * 没有数据设置提示信息
	 */
	noData: function(){
	    	this.options.listEl.update(this.options.type == NewsFeed.Type.N ? '暂无好友动态。好友在哪里呢？您可以通过<a href="http://profile.blog.sohu.com/search.htm" target="_blank">找朋友</a> 工具，找到志同道合的人加为好友哦~ ' : isMyBlog() ? '今天有什么好玩的、高兴的或悲伤的事儿啊，写下来，一句两句就行~':'暂无任何动态');
	},
	/**
	 * 过滤数据
	 */
	filterData: function(list) {
		var newList = [];
		if (list && list.length && list.length > 0) {
			var count = 0;
			var filter = this.options.filter;
			var filterSize = this.options.filterSize;
			list.each(function(it) {
				if (filter[it.type]) {
					newList.push(it);
					count ++;
				}
				if (count >= filterSize) throw $break;
			});
		}
		return newList;
	},
	
	/**
	 * 未成功收到服务器回应后的处理方法
	 */
	showError: function() {
	  this.options.listEl.update('不能取得相关数据，请稍后重试');
	},
	
	config: {
		names: ["今天", "昨天", "本周", "上周", "很早很早以前"]
	},
	
	/**
	 * 重新排列数据
	 */
	sortData: function(data) {
	  	var names = this.config.names;
	  
		var dayTime = 24 * 60 * 60 * 1000;
		var now = new Date();
		var today = (new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime();
		var distance = now.getTime() - today;
		var day = now.getDay() == 0 ? 6 : (now.getDay() - 1);
		var days = this.config.days = [0, 1, day, day + 7];
		var time = this.config.time = new Array(names.length - 1);
		for (var i=0; i<names.length - 1; i++) {
			time[i] = today - (dayTime * days[i]);
		}
		
		function getTimePart(time, parts) {
			for (var i=0; i<parts.length; i++) {
				if (time >= parts[i]) return i;
			}
			return parts.length;
		}
		
		var newData = new Array(names.length);
		var types = {},type2s = {},type6s = {},type11s = {};
		var type3s = {},type12s = {};
		for (var i=0; i<data.length; i++) {
			var dataNow = data[i];
			if (dataNow && dataNow.time) {
				var timePart = getTimePart(dataNow.time, time);
				
				if (typeof(newData[timePart]) == "undefined") newData[timePart] = [];
				newData[timePart].push(dataNow);
				
			}
		}
		
		return newData;
	},
	
	/**
	 * 显示列表
	 */
	list: function(data, classify) {
		var str = '<ul class="newsfeedList">';
		var xpts = [];
		var needXpt = (this.options.type == NewsFeed.Type.N);
		if (classify) {
			var names = this.config.names;
			
			for (var i=0; i<names.length; i++) {
				if (typeof(data[i]) == "object") {
					str += '<h2>- ' + names[i] + ' -</h2>';
					str += this.listItem(data[i], xpts);
				}
			}
		} else {
			str += this.listItem(data, xpts);
		}
		if (str == '') {
			this.noData();
		} else {
			str += '</ul>';
			this.options.listEl.update(str);
			if(this.options.endel)
				this.delBind();
			//this.refreshUserBlog();
			$call(function(){blog.user.User.fill()},'blog.user');
		}
	},
	/**
	 * 给删除按钮绑定删除方法
	 */
	delBind: function(){
		var as = document.getElementsByClassName("delItemA", this.options.listEl, "a");
		for (var i=0; i<as.length; i++) {
			Event.observe(as[i], "click", this.del.bind(this, as[i]));
		}
	},
	
	clearCache: function(name) {
		try {
			eval(name + "=null");
		} catch(e) {}
	},
	/**
	 * 删除项
	 */
	del: function(ele) {
		if (ele && ele.getAttribute("itemid")) {
			var id = ele.getAttribute("itemid");
			if (confirm('确定要删除吗？')) {
				var vn = Time.now();
				this.delVN = 'MiniBlog.newTalk_' + vn;
				//this.clearCache(this.delVN);
				var url = NewsFeed.domain+'post?type=del&sys=0&id=' + id + '&xpp=' + this.getXpt() + '&vn=' + vn;
				//this.clearCache(this.getDelName());
				setTimeout(function() {new LinkFile(url, {
					type: 'script',
					noCache: true,
					callBack: {
						variable: this.delVN,
						onLoad: this.loadedDelData.bind(this),
						onFailure: this.noDelData.bind(this)
				}});}.bind(this), 0);
			}
		}
		
		return false;
	},
	/**
	 * 删除成功，重新加载列表
	 */
	loadedDelData: function() {
		var data = eval("(" + this.delVN + ")");
		if (data && data.status == "1") {
			this.requestCont();
		} else {
			alert('删除失败');
		}
	},
	/**
	 * 删除失败
	 */
	noDelData: function() {
		alert('删除失败');
	},
	
	/**
	 * 取得一个列表片段
	 */
	listItem: function(list, xpts) {
		var str = '';
		if (list && list.length && list.length > 0) {
			for (var j=0; j<list.length; j++) {
				var itemNow = list[j];
				if (itemNow) {
					var type = itemNow.type;
					if (this['item' + type]) {
						str += this['item' + type](itemNow, this.options.type, xpts); 
					} else if (NewsFeed.Items[type]) {
						// 没有类型信息的消息暂不显示
					}
					if (xpts && itemNow.passport) {
						xpts.push(itemNow.passport);
					}
				}
			}
		}
		return str;
	},
	
	/**
	 * 取得一个单项的前缀
	 */
	itemPrefix: function(data, type) {
		var itemConfig = NewsFeed.Items[data.type];
		var str = '<li class="'+itemConfig.clsName+'">';
		if (type == NewsFeed.Type.M) {
			str += 	'<div class="icon">'+
						'<img src="' + itemConfig.icon + '" alt="' + itemConfig.title + '" title="' + itemConfig.title + '" />'+
					'</div>'+
					this.getDelStr(data, type);
			      
		} else {
			str +=	'<div class="icon">'+
						'<a onmousedown="CA.q(\'newsfeed_blogIco\');" href="#" target="_blank" ' + this.getPpExpress(data.xpt, '#{@href}#{:=}#{$url}') + '><img src="http://js1.pp.sohu.com.cn/ppp/blog/images/common/nobody.gif" ' + this.getPpExpress(data.xpt, '#{@src}#{:=}#{$ico}#{:;}#{@alt}#{:=}#{@title}#{:=}#{$title}') + ' /></a>'+
					'</div>';
		}
		str += 		'<div class="content">'+
						'<div class="innerContent">'+
							'<dl>';
		return str;
	},
	
	/**
	 * 取得一个单项的后缀
	 */
	itemPostfix: function() {
		return 				'</dl>'+
						'</div>'+
					'</div>'+
				'</li>';
	},
	
	/**
	 * 取得一个删除片段
	 */
	getDelStr: function(data, type) {
		if(isMyBlog() && this.options.endel && type == NewsFeed.Type.M){
			return '<div class="option">'+
						'<a onmousedown="CA.q(\'blog_widget_minifeed_del\');" href="javascript:void(0);" class="delItemA" itemid="' + data.id + '"><img alt="删除" src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_del.gif" align="absbottom" /></a>'+
					'</div>';
		}else
		 	return '';
	},
	
	// 获取所有被poke对象的链接
	itemPokefix: function(xpts){
		if (xpts.length > 0) {
			var arr=[],
				_xpts = xpts.split('|');
			for(var i = 0; i < _xpts.length ; i++){
				if(_xpts[i] != ''){
					arr.push(this.userLink(_xpts[i],'power','',''));
				}
			} 
			return arr.join('、');
		} else {
			return '大家';
		}
	},
	
	/**
	 * 取得一项的头信息
	 */
	itemHeader: function(data, type) {
		var itemConfig = NewsFeed.Items[data.type];
		var str = this.userLink(data.xpt) + itemConfig['do'];
		return str;
	},
	
	/**
	 * 替换时间提示
	 */
	itemDate: function(data, type) {
		var str = ' <small>' + Time.friendly(data.time) + '</small>';
		return str;
	},
	/**
	 * 取得一项的主题信息
	 */
	itemTopic: function(data, type) {
		var str = this.itemHeader(data,type) + this.itemDate(data,type);
		return str;
	},
	/**
	 * 取得一项的标题链接
	 */
	itemTitle: function(type,title,link) {
		var str = '';
		if(this.itemValid(title)){
			var itemConfig = NewsFeed.Items[type];
			str ='<a onmousedown="CA.q(\'newsfeed_' + itemConfig.stat + '_title\');" href="' + link + '" target="_blank">' + title + '</a>';
		}
		return str;
	},
	// image块结构
	itemImg: function(type,title,link,image){
		var str = '<div class="image">';
		if(!this.itemValid(image))
			image =  NewsFeed.Items[type].dftImg;
		if([13,14,21,22,24].include(type))	// 这里只要涉及相册，动感相册，节目单的消息
			str	+=	'<i><i><i><i>';
		str +=		'<a onmousedown="CA.q(\'newsfeed_image_link\');" href="' + link + '" target="_blank">'+
							'<img src="'+image+'" alt="'+title+'"/>';
		if([4,20,21,32].include(type))
			str +=		'<span class="v_play"></span>';
			
		str +=		'</a>';
		if([13,14,21,22,24].include(type))
			str	+=	'</i></i></i></i>';
		str += 	'</div>';
		return str;
	},
	// 消息的每个项的验证
	itemValid: function(value){
		if(typeof(value) == 'undefined' || value == 'undefined' || value == 'null' || value == '')
			return false;
		else
			return true;
	},
	
	// 组装拼接一个小项,形如（作者：Springwang）
	itemKeyVal: function(key,value){
		if(this.itemValid(value))
			return key+value;
		else 
			return '';
	},
	
	// dl块结构
	itemDl: function(type,nTitle,vTitle,link,nDesc,vDesc,nExt1,vExt1,nExt2,vExt2){
		var str = 	'<dl>';
		if(this.itemValid(vTitle))
			str +=		'<dt>'+nTitle+this.itemTitle(type,vTitle,link)+'</dt>';
		if(this.itemValid(vDesc))
			str +=		'<dd>'+nDesc+vDesc+'</dd>';
		if(this.itemValid(vExt1))
			str +=		'<dd>'+nExt1+vExt1+'</dd>';
		if(this.itemValid(vExt2))
			str +=		'<dd>'+nExt2+vExt2+'</dd>';
		str +=		'</dl>';
		return str;
	},
	// ul块结构
	itemUl: function(type,data,len,title,link,image,hasDl1){
		var arr=[],str ='';
		arr.push('<ul>');
		for (var i=0; i< len ; i++) {
			str = '<li>'+this.itemImg(type,data[i][title],data[i][link],data[i][image]);
			if(hasDl1)
				str += this.itemDl(type,'',data[i][title],data[i][link]);
			str += '</li>';
			arr.push(str);
		}
		arr.push('</ul>');
		return arr.join('');
	},
	// 双引号结构
	itemQuote: function(reson){
		var str = '';
		if(this.itemValid(reson))
			str = '<div class="quote"><span class="innerQuote">'+reson+'</span></div>';
		return str;
	},
	// 分享后缀
	itemSPFix: function(ext){
		var str = 	'<dd>' + this.itemQuote(ext.reason) + '</dd>'+
		         	'<dd><a target="_blank" href="'+ext.commenturl+'">我要评论</a> | <a target="_blank" href="'+ext.shareurl+'">他的所有分享</a></dd>';
		return str;
	},
	// 链接块
	itemLink: function(name,link) {
		var str = '';
		if(this.itemValid(name))
			str = '<a href="'+link+'" target="_blank" alt="'+name+'" >'+name+'</a>';
		return str;
	},
	// 组织标签链接
	itemTags: function(tags){
		var str= '';
		if(this.itemValid(tags)){
			for(var i=0; i< tags.length;  i++){
				str += this.itemLink(tags[i].tag,tags[i].url)+'&nbsp;';
			}
		}
		return str;
	},
	//  验证后返回
	getCStr: function(count,str){
		if(this.itemValid(count))
			return '共 '+count + str;
		else
			return '';
	},
	/**
	 * 取得一个显示博客信息的表达式
	 */
	getPpExpress: function(passport, express) {
		return (' name="BlogUser" data-xpt="' + passport + '" data-blogExp="' + express + '" ');
	},
	
	/**
	 * 取得一个passport链接
	 */
	userLink: function(passport,clsName,end,urlFix) {
		var str = '';
		if(this.itemValid(passport)){
			var cls = typeof(clsName)== 'undefined' ? '' : clsName;
			var append = typeof(end)=='undefined' ? '&nbsp;':'';
			var uFix = typeof(urlFix)=='undefined' ? 'mnt/':urlFix;
			str = '<a class="'+cls+'" onmousedown="CA.q(\'newsfeed_blogName\');" href="#" target="_blank"' + this.getPpExpress(passport, '#{@innerHTML}#{:=}#{$title}#{:;}#{@href}#{:=}#{$url}'+uFix) + '></a>' + append;
		}
		return str;
	},
	
	//	替换文字中的链接
	findLink: function(str) {
		str = str.replace(/src=\'http/g,'src=\'htp');
		str = str.replace(/(http[^ \)\u0100-\uffff]*)/g, '<a href="$1" title="$1" target="_blank">$1</a>');
		return str.replace(/src=\'htp/g,'src=\'http');
	},
	//	替换文字中的危险标签
	clearText: function(str) {
		str = str.replace(/</ig,'&lt;');
		str = str.replace(/>/ig,'&gt;');
		str = str.replace(/"/ig,'&quot;');
		str = str.replace(/'/ig,'&apos;');
		return str;
	},
	
	//	自言自语
	item0: function(data, type) {
		var ext = data.ext[0];
		
		var str = 	'<dt>' + this.itemHeader(data,type) +this.findLink(this.clearText(unescape(ext.title))) + 
						((ext.from && ext.from=="0") ? '&nbsp;<a onmousedown="CA.q(\'newsfeed_miniblog_mobile\');" href="http://blog.sohu.com/manage/mobile.do?m=funcs" target="_blank" ><img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/mobile/ico_mobile.gif" border="0" alt="本动态由手机发出" title="本动态由手机发出" /></a>' : '')+
				  		this.itemDate(data,type) +
				  	'</dt>';
		//含有图片时
		if(ext.type && ext.type==1){
			var url = (ext.url)?ext.url:null;
			if(url){
				var index = url.lastIndexOf("/");
			    var imagePath = url.substring(0,index+1);
			    var imageName = url.substring(index+1,url.length);
			    var smallImageUrl = imagePath+imageName.replace(".", "_s.");
			    str += '<dd><a href="'+url+'" target=_blank><img src="'+smallImageUrl+'"></a>';
			}
		}
				  
				  	
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	发日志
	item1: function(data, type) {
		var ext = data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+
						'<dl>'+
							'<dt>'+this.itemTitle(data.type,ext.title,ext.link)+ '</dt>'+
							'<dd>' + (this.itemValid(ext.desc)? ext.desc : '') + '...<a on mousedown="CA.q(\'newsfeed_entry_all\');" href="' + ext.link + '" target="_blank">[全文]</a></dd>'+
						'</dl>'+
					'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	添加好友
	item2: function(data, type) {
		var newData=data.ext,arr = [],str='';
		if(newData.length == 1){
			var ext = newData[0];
			str = 	'<dd class="clearfix">'+this.itemImg(data.type,ext.nick,ext.link,ext.icon)+this.itemDl(data.type,'',ext.nick,ext.link,'',ext.desc)+'</dd>';
			if(this.itemValid(ext.fpassport))
				str +='<dd><a href="javascript:void(0)" onclick="window.open(\'http://blog.sohu.com/manage/friend.do?m=add&t=shortcut&xpt='+ext.fpassport+'\',\'\',\'height=178 ,width=298\');">加为好友</a> | <a target="_blank" href="http://blog.sohu.com/people/!' + ext.fpassport + '/profile/">查看档案</a></dd>';
			arr.push(str);
		}
		else{
			arr.push('<dd class="clearfix">'+this.itemUl(data.type,newData,newData.length,'nick','link','icon',true)+'</dd>');
		}
		str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ arr.join('');
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	
	//	更新相册
	item3: function(data, type) {
		var ext=data.ext[0];
		var str =	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ 	
					'<dd class="clearfix">'+this.itemUl(data.type,ext.item,ext.item.length,'desc','url','cover130',false)+'</dd>'+
					'<dd>'+
						'<dl>'+
							'<dt>'+this.itemKeyVal('相册：',this.itemTitle(data.type,ext.title,ext.url))+'</dt>'+
						'</dl>'+
					'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	上传视频
	item4: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.cover)+this.itemDl(data.type,'视频标题：',ext.title,ext.url,'简介：',ext.desc)+'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	
	/*
	//	更换新模板,暂时不发
	item5: function(data, type) {},
	*/
	
	//	添加了模块
	item6: function(data, type) {
		var newData=data.ext,arr = [],str='';
		if(newData.length == 1){
			var ext = newData[0];
			str = 	'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.link,ext.pic)+this.itemDl(data.type,'模块名称：',ext.title,ext.link,'简介：',ext.desc,'作者：',this.itemLink(ext.author,ext.authorlink))+'</dd>'+
					'<dd><a target="_blank" href="'+ext.link+'">我也添加</a></dd>';
			arr.push(str);
		}
		else{
			arr.push('<dd>'+this.itemUl(data.type,newData,(newData.length > 3 ? 3 : newData.length),'title','link','pic',true)+'</dd>');
		}
		str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ arr.join('');
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	创建了圈子
	item7: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ 
					'<dd class="clearfix">'+this.itemImg(data.type,ext.name,ext.url,ext.logo)+this.itemDl(data.type,'',ext.name,ext.url,'',ext.desc,'标签：',this.itemTags(ext.tags))+'</dd>'+
					'<dd>'+this.itemLink('加入圈子',ext.gjurl)+'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	
	//	圈子发帖
	item8: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.userLink(data.xpt) + '在圈子 ' + this.itemLink(ext.gn,ext.gurl)+ ' 里发表了帖子 <small>' + Time.friendly(data.time) + '</small></dt>'+
					'<dd class="clearfix">'+
						'<dl>'+
							'<dt>'+this.itemTitle(data.type,ext.tn,ext.turl)+ '</dt>'+
		        			'<dd>' + (this.itemValid(ext.desc)? ext.desc : '') + '...<a on mousedown="CA.q(\'newsfeed_topic_all\');" href="' + ext.turl + '" target="_blank">[全文]</a></dd>'+
						'</dl>'+
					'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	/* 暂时不发
	//	添加了Tab
	item9: function(data, type) {},
	*/
	//	广场发帖
	item10: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.userLink(data.xpt) + '在广场 ' + this.itemLink(ext.fn,ext.furl)+ ' 里发表了帖子 <small>' + Time.friendly(data.time) + '</small></dt>'+
					'<dd class="clearfix">'+
						'<dl>'+
							'<dt>'+this.itemTitle(data.type,ext.tn,ext.turl)+ '</dt>'+
							'<dd>' + (this.itemValid(ext.desc)? ext.desc : '') + '...<a on mousedown="CA.q(\'newsfeed_topic_all\');" href="' + ext.turl + '" target="_blank">[全文]</a></dd>'+
						'</dl>'+
					'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	加入了圈子
	item11: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.name,ext.gurl,ext.icon)+this.itemDl(data.type,'',ext.name,ext.gurl,'',ext.desc)+'</dd>'+
					'<dd><a target="_blank" href="'+ext.gjurl+'">加入圈子</a></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
					
	//	修改个人档案
	item12: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemHeader(data, type)+ '<a onmousedown="CA.q(\'newsfeed_profile\');" class="power" href="'+ext.purl+'" target="_blank">'+NewsFeed.Items[data.type].type[(this.itemValid(ext.type)? ext.type : 0)]+'</a>'+this.itemDate(data,type)+'</dt>';
		if(ext.type == 7)				
			str +=	'<dd class="clearfix">'+this.itemImg(data.type,'',ext.purl,ext.ico)+'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	
	//	创建动感相册
	item13: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.cover130)+this.itemDl(data.type,'主题：',ext.title,ext.url,'',this.getCStr(ext.photocount,' 张照片'))+'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	/*
	// 收藏专辑 暂时无此消息
	item14: function(data, type) {
	},
	*/
	
	//	创建了主题
	item15: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.link,ext.pic)+this.itemDl(data.type,'模板名称：',ext.title,ext.link)+'</dd>'+
					'<dd><a target="_blank" href="'+ext.link+'">使用此模板</a></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	
	//	创建了模块
	item16: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ 
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.link,ext.pic)+this.itemDl(data.type,'模块名称：',ext.title,ext.link,'简介：',ext.desc)+'</dd>'+
					'<dd><a target="_blank" href="'+ext.link+'">我也添加</a></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	/*
	//	更新了模块 暂时不发
	item17: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ 
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.link,ext.pic)+this.itemDl(data.type,'模块名称：',ext.title,ext.link,'简介：',ext.desc)+'</dd>'+
					'<dd><a target="_blank" href="'+ext.link+'">我也添加</a> | <a target="_blank" href="#">推荐给好友</a></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	*/
	//	分享了链接
	item18: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+
						'<dl>'+
							'<dt>'+this.itemTitle(data.type,ext.title,ext.url)+ '</dt>'+
						'</dl>'+
					'</dd>'+
		         	this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	分享了博文
	item19: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+
						'<dl>'+
							'<dt>'+this.itemTitle(data.type,ext.title,ext.url)+ '</dt>'+
							'<dd>'+this.itemKeyVal('作者：',this.userLink(ext.author,'','',''))+ '</dd>'+
							'<dd>'+(this.itemValid(ext.desc)? ext.desc : '')+'<a target="_blank" href="'+ext.url+'">...[全文]</a></dd>'+
						'</dl>'+
					'</dd>'+
		         	this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	//	分享了视频
	item20: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'视频标题：',ext.title,ext.url,'简介：',ext.desc,'作者：',this.userLink(ext.author,'power','',''))+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	//	分享了节目单
	item21: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'节目单标题：',ext.title,ext.url,'简介：',ext.desc,'',this.getCStr(ext.videocount,' 个视频'),'来自：',this.userLink(ext.author,'power','',''))+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	//	分享了专辑
	item22: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'专辑名称：',ext.title,ext.url,'专辑描述：',ext.desc,'',this.getCStr(ext.photocount,' 张照片'),'来自：',this.userLink(ext.author,'power','',''))+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	//	分享了照片
	item23: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'照片描述：',ext.title,ext.url,'所属专辑：',this.itemLink(ext.photosetname,ext.photoseturl),'来自：',this.userLink(ext.author,'power','',''))+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	//	分享了动感相册
	item24: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'名称：',ext.title,ext.url,'',this.getCStr(ext.photocount,' 张照片'),'作者：',this.userLink(ext.author,'power','',''))+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	//	分享了博友
	item25: function(data, type, xpts) {
		var ext=data.ext[0];
		var	str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'',ext.title,ext.url,'',ext.desc)+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	//	分享了帖子
	item26: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+
						'<dl>'+
							'<dt>'+this.itemTitle(data.type,ext.title,ext.url)+ '</dt>'+
							'<dd>'+this.itemKeyVal('来自'+this.itemKeyVal('',ext.from)+'：',this.itemLink(ext.name,ext.qurl))+ this.itemKeyVal('&nbsp;&nbsp;发表者：',this.userLink(ext.author,'power','',''))+ '</dd>'+
							'<dd>'+(this.itemValid(ext.desc)? ext.desc : '')+'<a target="_blank" href="'+ext.url+'">[全文]</a></dd>'+
						'</dl>'+
					'</dd>'+
		         	this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	//	分享了圈子
	item27: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'',ext.title,ext.url,'',ext.desc,'标签：',this.itemTags(ext.tags))+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	
	
	//	活动
	item28: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemHeader(data, type) + this.itemLink(ext.title,ext.link)+ 
					',<a href="'+ext.link+'" target="_blank">我也去看看</a> '+ this.itemDate(data,type)+'</dt>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	poke基本动作
	item30: function(data, type,xpts) {
		var ext=data.ext[0];
		var str = '<dt>'+this.itemHeader(data, type) + this.clearText( ext.oper1) + '&nbsp;' + this.itemPokefix(ext.user)+ (ext.remark != 'null' ? ext.remark:'') +this.clearText( ext.oper2) + '&nbsp;<img src="'+ext.icon+'" />'+this.itemDate(data,type)+'</dt>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	//	poke酷炫动作
	item31: function(data, type, xpts) {
		// 加载酷炫预览的JS文件
		if(!window.ActFlash){
		    var oHead = document.getElementsByTagName('HEAD').item(0);
		    var oScript= document.createElement("script");
		    oScript.type = "text/javascript";
		    oScript.src="http://js4.pp.sohu.com.cn/ppp/poke/js_src/actFlash.js";
		    oHead.appendChild( oScript);
		}
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemHeader(data, type) +  this.clearText( ext.oper1) + '&nbsp;' + this.itemPokefix(ext.user)+ (ext.remark != 'null' ? ext.remark:'') + this.clearText(  ext.oper2) + this.itemDate(data,type)+'</dt>'+
					'<dd><div class="coolPoke" ><img src="'+ext.icon+'"/><a onclick="ActFlash.preview(\''+ext.link+'\')" href="javascript:void(0);" title="播放">播放</a></div></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	制作了节目单
	item32: function(data, type) {
		var ext=data.ext[0],arr = [],str='';
		str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
				'<dd>'+this.itemImg(data.type,ext.title,ext.url,ext.cover)+this.itemDl(data.type,'节目单标题：',ext.title,ext.url,'简介：',ext.desc,'',this.getCStr(ext.videocount,' 个视频'))+'</dd>'
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	发布微博
	item33: function(data, type) {
		var ext=data.ext[0];
		var str =	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ 	
					'<dd class="clearfix"><div>'+this.clearText(ext.title)+' [<a href="http://m.blog.sohu.com/document/detail.do?u='+ext.uid+'&id='+ext.did+'" target="_blank">全文</a>]</div></dd>' ;
		if(ext.img){
			str +='<dd class="clearfix"><div class="image"><p><a href="http://m.blog.sohu.com/document/detail.do?u='+ext.uid+'&id='+ext.did+'" target="_blank"><img src="'+ext.img+'" /></a></p></div></dd>' ;
		}
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	}
});
// newsfeed 所在的产品
/*NewsFeed.Pdt={
	W:'widget',
	H:'home',
	L:'miniLst'
};
*/
// newsfeed 的类型
NewsFeed.Type = {
	N:'news',
	M:'mini'
};

NewsFeed.Items = {
	'0': {
		'do': '说：',
		title: '我在做什么',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/miniblog/ico_widget.gif',
		stat: 'say',
		clsName: 'miniEntry'
	},
	'1': {
		'do': '撰写了日志',
		title: '日志',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/entries/ico_widget.gif',
		stat: 'entry',
		clsName: 'addEntry'
		
	},
	'2': {
		'do': '添加了好友',
		title: '好友',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/links/ico_widget.gif',
		stat: 'do',
		clsName: 'addFriend',
		dftImg: 'http://img3.pp.sohu.com/ppp/blog/images/common/nobody.gif'
	},
	'3': {
		'do': '上传了照片',
		title: '相册',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/pp_set/ico_widget.gif',
		stat: 'ppset',
		clsName: 'addPhoto'
	},
	'4': {
		'do': '上传了视频',
		title: '视频',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/v_video/ico_widget.gif',
		stat: 'video',
		clsName: 'addVideo'
	},
	'5': {
		'do': '更换了模板',
		title: '模板',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_theme.gif',
		stat: 'do',
		clsName: 'miniEntry'
	},
	'6': {
		'do': '添加了模块',
		title: '添加了模块',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_mod.gif',
		stat: 'widget',
		clsName: 'addWidget',
		dftImg: 'http://ow.blog.sohu.com/styles/images/def.jpg'
	},
	'7': {
		'do': '创建了圈子',
		title: '创建圈子',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/q_uadmingroups/ico_widget.gif',
		stat: 'creatgroup',
		clsName: 'creatGroup'
	},
	'8': {
		'do': '发表了帖子',
		title: '在圈子中发帖',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/q_utopics/ico_widget.gif',
		stat: 'do',
		clsName: 'groupPost'
	},
	'9': {
		'do': '添加了一个新页面',
		title: '添加页面',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_addPage.gif',
		stat: 'do',
		clsName: 'addPage'
		
	},
	'10': {
		'do': '在广场',
		title: '在广场中发帖',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/q_utopics/ico_widget.gif',
		stat: 'do',
		clsName: 'forumPost'
	},
	'11': {
		'do': '加入了圈子',
		title: '加入了圈子',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/q_ugroups/ico_widget.gif',
		stat: 'do',
		clsName: 'joinGroup'
	},
	'12': {
		'do': '修改了 ',
		title: '修改个人档案',
		icon: 'http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_profile.gif',
		stat: 'do',
		clsName: 'modifyProfile',
		type: {
			0: '个人档案',
			1: '基本信息',
			2: '联系方式',
			3: '交友信息',
			4: '性格爱好',
			5: '学校信息',
			6: '工作信息',
			7: '个人头像',
			8: '空间信息'
		}
	},
	'13': {
		'do': '创作了一个动感相册',
		title: '动感相册',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_slide.gif',
		stat: 'slide',
		clsName: 'creatSlide'
	},
	'14': {
		'do': '收藏了专辑',
		title: '收藏专辑',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_album.gif',
		stat: 'do',
		clsName: 'favAlbum'
	},
	'15': {
		'do': '创建了主题',
		title: '创建主题',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_ot.gif',
		stat: 'creattheme',
		clsName: 'creatTheme'
		
	},
	'16': {
		'do': '创建了模块',
		title: '创建模块',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_ow.gif',
		stat: 'creatwidget',
		clsName: 'creatWidget'
	},
	'17': {
		'do': '更新了模块',
		title: '更新模块',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_ow.gif',
		stat: 'updatewidget',
		clsName: 'updateWidget'
	},
	'18': {
		'do': '分享了链接',
		title: '分享链接',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_link',
		clsName: 'shareLink'
	},
	'19': {
		'do': '分享了博文',
		title: '分享博文',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_entry',
		clsName: 'shareEntry'
	},
	'20': {
		'do': '分享了视频',
		title: '分享视频',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_video',
		clsName: 'shareVideo'
	},
	'21': {
		'do': '分享了节目单',
		title: '分享节目单',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_playlist',
		clsName: 'sharePlaylist'
	},
	'22': {
		'do': '分享了专辑',
		title: '分享专辑',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_ppset',
		clsName: 'shareAlbum'
		
	},
	'23': {
		'do': '分享了照片',
		doSuffix: '中的照片',
		title: '分享照片',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_photo',
		clsName: 'shareAlbum'
	},
	'24': {
		'do': '分享了动感相册',
		title: '分享动感相册',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_slide',
		clsName: 'shareSlide'
		
	},
	'25': {
		'do': '分享了博友',
		title: '分享博友',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_bloger',
		clsName: 'shareBloger',
		dftImg: 'http://img3.pp.sohu.com/ppp/blog/images/common/nobody.gif'
	},
	'26': {
		'do': '分享了帖子',
		title: '分享帖子',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_post',
		clsName: 'sharePost'
	},
	'27': {
		'do': '分享了圈子',
		title: '分享圈子',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_group',
		clsName: 'shareGroup',
		dftImg: 'http://js1.pp.sohu.com.cn/ppp/group/styles/images/ico_groupdef.jpg'
	},
	'28': {
		'do': '参加了活动',
		title: '参加活动',
		icon: 'http://js3.pp.sohu.com.cn/ppp/blog/widgets/campaign/ico_widget.gif',
		stat: 'joincamp',
		clsName: 'joinCamp'
	},
	'30': {
		'do': '',
		title: '基本动作',
		icon:'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_poke.gif',
		stat: 'pokeBase',
		clsName: 'pokeBase'
	},	
	'31': {
		'do': '',
		title: '酷炫动作',
		icon:'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_poke.gif',
		stat: 'pokeCool',
		clsName: 'pokeCool'
	},	
	'32': {
		'do': '制作了节目单',
		title: '制作了节目单',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_poke.gif',
		stat: 'addPlaylist',
		clsName: 'pokeCool'
	},	
	'33': {
		'do': '发表了一篇微博',
		title: '发表微博',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/entries/ico_widget.gif',
		stat: 'addMBlog',
		clsName: 'addPhoto'
	}
}

NewsFeed.domain = 'http://mnf.blog.sohu.com/';
NewsFeed.boardUrl = '/inc/home/newsfeed.inc';
NewsFeed.ppInfoUrl = '/service/userinfo.jsp?xp=';
