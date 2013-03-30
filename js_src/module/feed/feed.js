/**
 *	@fileoverview ����ļ�����һ��newsfeed���ʵ��
 * 
 *	@author Springwang wywy_1208@hotmail.com
 *	@Last Update: 2008-09-16
 *	@version 0.1
 */
 
/**	
 * �����ࣺ
 *		common/common
 *		common/jquery
 */

/**
 *	newsfeed ��ʵ��
 *	@class newsfeed
 *	@return newsfeed
 */
 
/**(type,topEl,listEl,st,sz,iptEl,sbtEl,leftEl,endel,auto,classify)
 * @param {Object} options ѡ���������������������:
 * 		type: {String}���ͣ���ѡ���ֻ������news��mini��Ĭ��ֵΪnews
 *		topEl: ��ʾnews_board ����
 * 		listEl: �б���󣨱����
 *		start: �ӵڼ�ҳ��ʼʱ��ʾ����ѡ���Ĭ��ֵΪ0
 * 		size: {Number}��ʾ��������ѡ���Ĭ��ֵΪ10
 * 		iptEl: ���������������󣨿�ѡ�
 * 		sbtEl: �������ﱣ�水ť���󣨿�ѡ�
 * 		leftEl: ����������ʣ������ʾ���󣨿�ѡ�
 * 		endel: �Ƿ�����ɾ�������������Ƿ���ʾɾ����ť��
 * 		auto: {Number}�Զ�ˢ�¼�����Ժ���Ϊ��λ����������ڣ��ǾͲ�ˢ�£�Ĭ��ֵ��Ϊ��ˢ�£�
 * 		classify: {Boolean}�Ƿ���й��ࣨ��ѡ���Ĭ��ֵΪtrue
 *		pagerEl: ��ҳ����
 * 		onSucc: (ref) ��������˶�̬�Ժ���Ҫ���õķ���
 */
var NewsFeed = Class.create({
 	initialize: function(options) {
		this.initOpt(options);
		this.initNewsList();
		this.setTimer();
	},
	
	/**
	 * ���ö�ʱˢ��
	 */
	setTimer: function(){
		if (typeof(this.options.auto) == "number") {
			this.autoTimer = window.setInterval(this.requestCont.bind(this), this.options.auto);
		}
	},
	/**
	 * ��ʼ������ѡ��
	 */
	initOpt: function(options) {
		var opt = Object.extend({
			start:0,			// ��ʼҳ
			size: 10,			// ��ʾ����
			type: NewsFeed.Type.N,	// ����
			xpt: this.getXpt(),	// xbase64 passport
			classify: true,		// �Ƿ����
			endel: false		// �Ƿ�����ɾ��
		}, options || {});

		opt.listEl = $(opt.listEl);
		// ������ڹ������Ļ����Ǿ����ù�����
		if (opt.filter) {
		 	opt.filter.each(function(i) {
		 		opt.filter[i] = true;
		 	});
		 	if (typeof(opt.filterSize) != "number") opt.filterSize = opt.size;
		 }
		 this.options = opt;
	},
	/**
	 * ��ʼ����Ϣ�б�
	 */
	initNewsList: function(){
		this.requestCont();
	},
	/**
	 * ��ʼ��minifeed�е�һЩ������
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
	 * ������ʾ���ܹ�������ٸ���
	 */
	onLeft: function() {
		if (this.options.leftEl) {
			var left = Math.max((70-this.options.iptEl.value.trim().length), 0);
			this.options.leftEl.innerHTML = left > 0 ? ('��������' + left + '����') : '������������';
		}
	},
	/**
	 * ���û������ʱ�������������ʾ��
	 */
	 onFocus: function(){
	 	// isScrap ��ʶ�Ƿ�ǰ�Ƿ�����Ƭ��Ϣ��1���ǣ�0�����ǣ�
	 	if(typeof(this.options.iptEl.isScrap)!='undefined' && this.options.iptEl.isScrap == "1"){
	 		this.options.iptEl.value = '';
	 		this.options.iptEl.className = 'miniblog_text';	
	 		this.options.iptEl.isScrap = 0;
	 	}
	 },
	 /**
	 * ��ʧȥ�����ʱ���ж��Ƿ���Ҫ����������Ƭ
	 */
	 onBlur: function(init){
	 	// isScrap ��ʶ�Ƿ�ǰ�Ƿ�����Ƭ��Ϣ��1���ǣ�0�����ǣ�
	 	if(init || this.options.iptEl.value =='' ){
	 		this.options.iptEl.value = typeof(_miniBlogTipScrape) !='undefined' ? _miniBlogTipScrape : 'һ�仰���ͣ��������ڶ�̬�￴��Ŷ��';
	 		this.options.iptEl.className = 'miniblog_text grey';	
	 		this.options.iptEl.isScrap = 1;
	 	}
	 },
	 /**
	 * ���̼�⣬ʵ��enter����һ�仰����
	 */
	 keyboardCtrl: function(e){
	 	var keyCode = e.keyCode;
		if(e.charCode)
			keyCode = e.charCode;
		if(Event.element(e).getAttribute('useEnter')&& keyCode == 13){// ʵ�ִ���enter�ļ�����
			this.onSubmitMini();
			Event.stop(e);
		}
	 },
	/**
	 * ������������Ĵ�����
	 */
	onSubmitMini: function() {
		if(typeof(this.options.iptEl.isScrap)!='undefined' && this.options.iptEl.isScrap == 1){
			this.options.iptEl.focus();
			return;
		}
		//	��֤�����������Ч��
		var value = this.options.iptEl.value;
		if (typeof(value) != "string" || value.trim().length == 0) {
			alert('���ݲ���Ϊ��');
			this.options.iptEl.focus();
			return;
		}
		value = value.trim();
		if (value.length > 70) {
			alert('��������Ϊ70����');
			this.options.iptEl.focus();
			return;
		}
		
		this.options.sbtEl.value='���ڷ���'
		this.options.sbtEl.disabled =true;
		
		//	���������������
		var vn = Time.now();
		var url = NewsFeed.domain + 'post?type=add&vn=' + vn + '&xpp=' + this.getXpt() + '&content=' + escape(value);
		new Groj(url, {
			variable: 'MiniBlog.newTalk_' + vn,
			onSuccess: this.gotSubmitMini.bind(this),
			onFailure: this.noGotSubmitMini.bind(this)
		});
	},
	/**
	 * ������������ɹ���Ļص�����
	 */
	gotSubmitMini: function() {
		this.options.iptEl.value = '';
		//document.focus();//this.onBlur(false);
		this.onLeft();
		this.options.sbtEl.value='˵һ��';
		this.options.sbtEl.disabled =false;
		if(this.options.onSucc)
			this.options.onSucc();
		else
			this.requestCont();
	},
	/**
	 * ������������ʧ�ܺ�Ļص�����
	 */
	noGotSubmitMini: function() {
		alert("����ʧ��");
		this.options.sbtEl.value='˵һ��'
		this.options.sbtEl.disabled =false;
	},
	/**
	 * ���ü���״̬
	 */
	loading: function(ele) {
		ele.innerHTML = '���ڶ�ȡ��Ϣ...';
	},
	/**
	 * ��ȡ�����û���passport xbase64����
	 */
	 getXpt: function(){
	 	return window._xpt;
	 },
	 /**
	 * ��ȡ�������ʱ�ı�������
	 */
	 getVN: function(){
	 	return (this.options.type + Time.now());
	 },
	 
	 /**
	 * �б�ҳʱ����ĳһҳȥ������Ĳ�����ҳ��
	 */
	 gotoPage: function(page){
	 	this.options.start = (page-1) * this.options.size;
	 	this.requestCont();
	 	this.options.start = page;
	 },
	 
	 /**
	 * �б�ҳʱ����ĳһҳȥ������Ĳ����Ǵӵڼ������ݿ�ʼ
	 */
	 gotoList: function(page){
	 	this.options.start = page;
	 	this.requestCont();
	 },
	/**
	 * ����news����
	 */
	requestCont: function() {
		this.loading(this.options.listEl);
		//	��ȡһЩ�������ַ��صı���
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
	 * ����board����
	 */
	requestBoard: function() {
		new Ajax.Request(NewsFeed.boardUrl + "?t=" + (new Date()).getTime(), {
			method: 'get',
			onSuccess: this.setBoardData.bind(this)
		});
	},
	
	/**
	 * ��ʾboard����
	 */
	setBoardData: function(transport) {
		this.options.topEl.innerHTML = transport.responseText;
	},
	/**
	 * ˢ���б�
	 * @param {String} str ��ʾ����ʾ���ѡ������û�оͲ�����ʾ����Ϊ���ַ������Ǿ���ʾ���ַ���
	 */
	refresh: function(str) {
		if (typeof(str) == "string") this.options.listEl.update(str);
		this.requestCont();
	},
	/**
	 * ��ʼ����ҳ����
	 */
	initPager: function(){
		if(!this.pager)
			this.pager = new Pager(this.options.pagerEl,this.options.size,this.gotoList.bind(this));
	},
	/**
	 * �ɹ��յ���������Ӧ��Ĵ�����
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
	 * û������������ʾ��Ϣ
	 */
	noData: function(){
	    	this.options.listEl.update(this.options.type == NewsFeed.Type.N ? '���޺��Ѷ�̬�������������أ�������ͨ��<a href="http://profile.blog.sohu.com/search.htm" target="_blank">������</a> ���ߣ��ҵ�־ͬ���ϵ��˼�Ϊ����Ŷ~ ' : isMyBlog() ? '������ʲô����ġ����˵Ļ��˵��¶�����д������һ���������~':'�����κζ�̬');
	},
	/**
	 * ��������
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
	 * δ�ɹ��յ���������Ӧ��Ĵ�����
	 */
	showError: function() {
	  this.options.listEl.update('����ȡ��������ݣ����Ժ�����');
	},
	
	config: {
		names: ["����", "����", "����", "����", "���������ǰ"]
	},
	
	/**
	 * ������������
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
	 * ��ʾ�б�
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
	 * ��ɾ����ť��ɾ������
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
	 * ɾ����
	 */
	del: function(ele) {
		if (ele && ele.getAttribute("itemid")) {
			var id = ele.getAttribute("itemid");
			if (confirm('ȷ��Ҫɾ����')) {
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
	 * ɾ���ɹ������¼����б�
	 */
	loadedDelData: function() {
		var data = eval("(" + this.delVN + ")");
		if (data && data.status == "1") {
			this.requestCont();
		} else {
			alert('ɾ��ʧ��');
		}
	},
	/**
	 * ɾ��ʧ��
	 */
	noDelData: function() {
		alert('ɾ��ʧ��');
	},
	
	/**
	 * ȡ��һ���б�Ƭ��
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
						// û��������Ϣ����Ϣ�ݲ���ʾ
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
	 * ȡ��һ�������ǰ׺
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
	 * ȡ��һ������ĺ�׺
	 */
	itemPostfix: function() {
		return 				'</dl>'+
						'</div>'+
					'</div>'+
				'</li>';
	},
	
	/**
	 * ȡ��һ��ɾ��Ƭ��
	 */
	getDelStr: function(data, type) {
		if(isMyBlog() && this.options.endel && type == NewsFeed.Type.M){
			return '<div class="option">'+
						'<a onmousedown="CA.q(\'blog_widget_minifeed_del\');" href="javascript:void(0);" class="delItemA" itemid="' + data.id + '"><img alt="ɾ��" src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_del.gif" align="absbottom" /></a>'+
					'</div>';
		}else
		 	return '';
	},
	
	// ��ȡ���б�poke���������
	itemPokefix: function(xpts){
		if (xpts.length > 0) {
			var arr=[],
				_xpts = xpts.split('|');
			for(var i = 0; i < _xpts.length ; i++){
				if(_xpts[i] != ''){
					arr.push(this.userLink(_xpts[i],'power','',''));
				}
			} 
			return arr.join('��');
		} else {
			return '���';
		}
	},
	
	/**
	 * ȡ��һ���ͷ��Ϣ
	 */
	itemHeader: function(data, type) {
		var itemConfig = NewsFeed.Items[data.type];
		var str = this.userLink(data.xpt) + itemConfig['do'];
		return str;
	},
	
	/**
	 * �滻ʱ����ʾ
	 */
	itemDate: function(data, type) {
		var str = ' <small>' + Time.friendly(data.time) + '</small>';
		return str;
	},
	/**
	 * ȡ��һ���������Ϣ
	 */
	itemTopic: function(data, type) {
		var str = this.itemHeader(data,type) + this.itemDate(data,type);
		return str;
	},
	/**
	 * ȡ��һ��ı�������
	 */
	itemTitle: function(type,title,link) {
		var str = '';
		if(this.itemValid(title)){
			var itemConfig = NewsFeed.Items[type];
			str ='<a onmousedown="CA.q(\'newsfeed_' + itemConfig.stat + '_title\');" href="' + link + '" target="_blank">' + title + '</a>';
		}
		return str;
	},
	// image��ṹ
	itemImg: function(type,title,link,image){
		var str = '<div class="image">';
		if(!this.itemValid(image))
			image =  NewsFeed.Items[type].dftImg;
		if([13,14,21,22,24].include(type))	// ����ֻҪ�漰��ᣬ������ᣬ��Ŀ������Ϣ
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
	// ��Ϣ��ÿ�������֤
	itemValid: function(value){
		if(typeof(value) == 'undefined' || value == 'undefined' || value == 'null' || value == '')
			return false;
		else
			return true;
	},
	
	// ��װƴ��һ��С��,���磨���ߣ�Springwang��
	itemKeyVal: function(key,value){
		if(this.itemValid(value))
			return key+value;
		else 
			return '';
	},
	
	// dl��ṹ
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
	// ul��ṹ
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
	// ˫���Žṹ
	itemQuote: function(reson){
		var str = '';
		if(this.itemValid(reson))
			str = '<div class="quote"><span class="innerQuote">'+reson+'</span></div>';
		return str;
	},
	// �����׺
	itemSPFix: function(ext){
		var str = 	'<dd>' + this.itemQuote(ext.reason) + '</dd>'+
		         	'<dd><a target="_blank" href="'+ext.commenturl+'">��Ҫ����</a> | <a target="_blank" href="'+ext.shareurl+'">�������з���</a></dd>';
		return str;
	},
	// ���ӿ�
	itemLink: function(name,link) {
		var str = '';
		if(this.itemValid(name))
			str = '<a href="'+link+'" target="_blank" alt="'+name+'" >'+name+'</a>';
		return str;
	},
	// ��֯��ǩ����
	itemTags: function(tags){
		var str= '';
		if(this.itemValid(tags)){
			for(var i=0; i< tags.length;  i++){
				str += this.itemLink(tags[i].tag,tags[i].url)+'&nbsp;';
			}
		}
		return str;
	},
	//  ��֤�󷵻�
	getCStr: function(count,str){
		if(this.itemValid(count))
			return '�� '+count + str;
		else
			return '';
	},
	/**
	 * ȡ��һ����ʾ������Ϣ�ı��ʽ
	 */
	getPpExpress: function(passport, express) {
		return (' name="BlogUser" data-xpt="' + passport + '" data-blogExp="' + express + '" ');
	},
	
	/**
	 * ȡ��һ��passport����
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
	
	//	�滻�����е�����
	findLink: function(str) {
		str = str.replace(/src=\'http/g,'src=\'htp');
		str = str.replace(/(http[^ \)\u0100-\uffff]*)/g, '<a href="$1" title="$1" target="_blank">$1</a>');
		return str.replace(/src=\'htp/g,'src=\'http');
	},
	//	�滻�����е�Σ�ձ�ǩ
	clearText: function(str) {
		str = str.replace(/</ig,'&lt;');
		str = str.replace(/>/ig,'&gt;');
		str = str.replace(/"/ig,'&quot;');
		str = str.replace(/'/ig,'&apos;');
		return str;
	},
	
	//	��������
	item0: function(data, type) {
		var ext = data.ext[0];
		
		var str = 	'<dt>' + this.itemHeader(data,type) +this.findLink(this.clearText(unescape(ext.title))) + 
						((ext.from && ext.from=="0") ? '&nbsp;<a onmousedown="CA.q(\'newsfeed_miniblog_mobile\');" href="http://blog.sohu.com/manage/mobile.do?m=funcs" target="_blank" ><img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/mobile/ico_mobile.gif" border="0" alt="����̬���ֻ�����" title="����̬���ֻ�����" /></a>' : '')+
				  		this.itemDate(data,type) +
				  	'</dt>';
		//����ͼƬʱ
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
	
	//	����־
	item1: function(data, type) {
		var ext = data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+
						'<dl>'+
							'<dt>'+this.itemTitle(data.type,ext.title,ext.link)+ '</dt>'+
							'<dd>' + (this.itemValid(ext.desc)? ext.desc : '') + '...<a on mousedown="CA.q(\'newsfeed_entry_all\');" href="' + ext.link + '" target="_blank">[ȫ��]</a></dd>'+
						'</dl>'+
					'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	��Ӻ���
	item2: function(data, type) {
		var newData=data.ext,arr = [],str='';
		if(newData.length == 1){
			var ext = newData[0];
			str = 	'<dd class="clearfix">'+this.itemImg(data.type,ext.nick,ext.link,ext.icon)+this.itemDl(data.type,'',ext.nick,ext.link,'',ext.desc)+'</dd>';
			if(this.itemValid(ext.fpassport))
				str +='<dd><a href="javascript:void(0)" onclick="window.open(\'http://blog.sohu.com/manage/friend.do?m=add&t=shortcut&xpt='+ext.fpassport+'\',\'\',\'height=178 ,width=298\');">��Ϊ����</a> | <a target="_blank" href="http://blog.sohu.com/people/!' + ext.fpassport + '/profile/">�鿴����</a></dd>';
			arr.push(str);
		}
		else{
			arr.push('<dd class="clearfix">'+this.itemUl(data.type,newData,newData.length,'nick','link','icon',true)+'</dd>');
		}
		str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ arr.join('');
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	
	//	�������
	item3: function(data, type) {
		var ext=data.ext[0];
		var str =	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ 	
					'<dd class="clearfix">'+this.itemUl(data.type,ext.item,ext.item.length,'desc','url','cover130',false)+'</dd>'+
					'<dd>'+
						'<dl>'+
							'<dt>'+this.itemKeyVal('��᣺',this.itemTitle(data.type,ext.title,ext.url))+'</dt>'+
						'</dl>'+
					'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	�ϴ���Ƶ
	item4: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.cover)+this.itemDl(data.type,'��Ƶ���⣺',ext.title,ext.url,'��飺',ext.desc)+'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	
	/*
	//	������ģ��,��ʱ����
	item5: function(data, type) {},
	*/
	
	//	�����ģ��
	item6: function(data, type) {
		var newData=data.ext,arr = [],str='';
		if(newData.length == 1){
			var ext = newData[0];
			str = 	'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.link,ext.pic)+this.itemDl(data.type,'ģ�����ƣ�',ext.title,ext.link,'��飺',ext.desc,'���ߣ�',this.itemLink(ext.author,ext.authorlink))+'</dd>'+
					'<dd><a target="_blank" href="'+ext.link+'">��Ҳ���</a></dd>';
			arr.push(str);
		}
		else{
			arr.push('<dd>'+this.itemUl(data.type,newData,(newData.length > 3 ? 3 : newData.length),'title','link','pic',true)+'</dd>');
		}
		str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ arr.join('');
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	������Ȧ��
	item7: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ 
					'<dd class="clearfix">'+this.itemImg(data.type,ext.name,ext.url,ext.logo)+this.itemDl(data.type,'',ext.name,ext.url,'',ext.desc,'��ǩ��',this.itemTags(ext.tags))+'</dd>'+
					'<dd>'+this.itemLink('����Ȧ��',ext.gjurl)+'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	
	//	Ȧ�ӷ���
	item8: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.userLink(data.xpt) + '��Ȧ�� ' + this.itemLink(ext.gn,ext.gurl)+ ' �﷢�������� <small>' + Time.friendly(data.time) + '</small></dt>'+
					'<dd class="clearfix">'+
						'<dl>'+
							'<dt>'+this.itemTitle(data.type,ext.tn,ext.turl)+ '</dt>'+
		        			'<dd>' + (this.itemValid(ext.desc)? ext.desc : '') + '...<a on mousedown="CA.q(\'newsfeed_topic_all\');" href="' + ext.turl + '" target="_blank">[ȫ��]</a></dd>'+
						'</dl>'+
					'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	/* ��ʱ����
	//	�����Tab
	item9: function(data, type) {},
	*/
	//	�㳡����
	item10: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.userLink(data.xpt) + '�ڹ㳡 ' + this.itemLink(ext.fn,ext.furl)+ ' �﷢�������� <small>' + Time.friendly(data.time) + '</small></dt>'+
					'<dd class="clearfix">'+
						'<dl>'+
							'<dt>'+this.itemTitle(data.type,ext.tn,ext.turl)+ '</dt>'+
							'<dd>' + (this.itemValid(ext.desc)? ext.desc : '') + '...<a on mousedown="CA.q(\'newsfeed_topic_all\');" href="' + ext.turl + '" target="_blank">[ȫ��]</a></dd>'+
						'</dl>'+
					'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	������Ȧ��
	item11: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.name,ext.gurl,ext.icon)+this.itemDl(data.type,'',ext.name,ext.gurl,'',ext.desc)+'</dd>'+
					'<dd><a target="_blank" href="'+ext.gjurl+'">����Ȧ��</a></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
					
	//	�޸ĸ��˵���
	item12: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemHeader(data, type)+ '<a onmousedown="CA.q(\'newsfeed_profile\');" class="power" href="'+ext.purl+'" target="_blank">'+NewsFeed.Items[data.type].type[(this.itemValid(ext.type)? ext.type : 0)]+'</a>'+this.itemDate(data,type)+'</dt>';
		if(ext.type == 7)				
			str +=	'<dd class="clearfix">'+this.itemImg(data.type,'',ext.purl,ext.ico)+'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	
	//	�����������
	item13: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.cover130)+this.itemDl(data.type,'���⣺',ext.title,ext.url,'',this.getCStr(ext.photocount,' ����Ƭ'))+'</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	/*
	// �ղ�ר�� ��ʱ�޴���Ϣ
	item14: function(data, type) {
	},
	*/
	
	//	����������
	item15: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.link,ext.pic)+this.itemDl(data.type,'ģ�����ƣ�',ext.title,ext.link)+'</dd>'+
					'<dd><a target="_blank" href="'+ext.link+'">ʹ�ô�ģ��</a></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	
	//	������ģ��
	item16: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ 
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.link,ext.pic)+this.itemDl(data.type,'ģ�����ƣ�',ext.title,ext.link,'��飺',ext.desc)+'</dd>'+
					'<dd><a target="_blank" href="'+ext.link+'">��Ҳ���</a></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	/*
	//	������ģ�� ��ʱ����
	item17: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ 
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.link,ext.pic)+this.itemDl(data.type,'ģ�����ƣ�',ext.title,ext.link,'��飺',ext.desc)+'</dd>'+
					'<dd><a target="_blank" href="'+ext.link+'">��Ҳ���</a> | <a target="_blank" href="#">�Ƽ�������</a></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	*/
	//	����������
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
	
	//	�����˲���
	item19: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+
						'<dl>'+
							'<dt>'+this.itemTitle(data.type,ext.title,ext.url)+ '</dt>'+
							'<dd>'+this.itemKeyVal('���ߣ�',this.userLink(ext.author,'','',''))+ '</dd>'+
							'<dd>'+(this.itemValid(ext.desc)? ext.desc : '')+'<a target="_blank" href="'+ext.url+'">...[ȫ��]</a></dd>'+
						'</dl>'+
					'</dd>'+
		         	this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	//	��������Ƶ
	item20: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'��Ƶ���⣺',ext.title,ext.url,'��飺',ext.desc,'���ߣ�',this.userLink(ext.author,'power','',''))+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	//	�����˽�Ŀ��
	item21: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'��Ŀ�����⣺',ext.title,ext.url,'��飺',ext.desc,'',this.getCStr(ext.videocount,' ����Ƶ'),'���ԣ�',this.userLink(ext.author,'power','',''))+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	//	������ר��
	item22: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'ר�����ƣ�',ext.title,ext.url,'ר��������',ext.desc,'',this.getCStr(ext.photocount,' ����Ƭ'),'���ԣ�',this.userLink(ext.author,'power','',''))+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	//	��������Ƭ
	item23: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'��Ƭ������',ext.title,ext.url,'����ר����',this.itemLink(ext.photosetname,ext.photoseturl),'���ԣ�',this.userLink(ext.author,'power','',''))+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	//	�����˶������
	item24: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'���ƣ�',ext.title,ext.url,'',this.getCStr(ext.photocount,' ����Ƭ'),'���ߣ�',this.userLink(ext.author,'power','',''))+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	//	�����˲���
	item25: function(data, type, xpts) {
		var ext=data.ext[0];
		var	str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'',ext.title,ext.url,'',ext.desc)+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	//	����������
	item26: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+
						'<dl>'+
							'<dt>'+this.itemTitle(data.type,ext.title,ext.url)+ '</dt>'+
							'<dd>'+this.itemKeyVal('����'+this.itemKeyVal('',ext.from)+'��',this.itemLink(ext.name,ext.qurl))+ this.itemKeyVal('&nbsp;&nbsp;�����ߣ�',this.userLink(ext.author,'power','',''))+ '</dd>'+
							'<dd>'+(this.itemValid(ext.desc)? ext.desc : '')+'<a target="_blank" href="'+ext.url+'">[ȫ��]</a></dd>'+
						'</dl>'+
					'</dd>'+
		         	this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	//	������Ȧ��
	item27: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
					'<dd class="clearfix">'+this.itemImg(data.type,ext.title,ext.url,ext.img)+this.itemDl(data.type,'',ext.title,ext.url,'',ext.desc,'��ǩ��',this.itemTags(ext.tags))+'</dd>'+
					this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	},
	
	
	//	�
	item28: function(data, type) {
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemHeader(data, type) + this.itemLink(ext.title,ext.link)+ 
					',<a href="'+ext.link+'" target="_blank">��Ҳȥ����</a> '+ this.itemDate(data,type)+'</dt>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	poke��������
	item30: function(data, type,xpts) {
		var ext=data.ext[0];
		var str = '<dt>'+this.itemHeader(data, type) + this.clearText( ext.oper1) + '&nbsp;' + this.itemPokefix(ext.user)+ (ext.remark != 'null' ? ext.remark:'') +this.clearText( ext.oper2) + '&nbsp;<img src="'+ext.icon+'" />'+this.itemDate(data,type)+'</dt>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	//	poke���Ŷ���
	item31: function(data, type, xpts) {
		// ���ؿ���Ԥ����JS�ļ�
		if(!window.ActFlash){
		    var oHead = document.getElementsByTagName('HEAD').item(0);
		    var oScript= document.createElement("script");
		    oScript.type = "text/javascript";
		    oScript.src="http://js4.pp.sohu.com.cn/ppp/poke/js_src/actFlash.js";
		    oHead.appendChild( oScript);
		}
		var ext=data.ext[0];
		var str = 	'<dt>'+this.itemHeader(data, type) +  this.clearText( ext.oper1) + '&nbsp;' + this.itemPokefix(ext.user)+ (ext.remark != 'null' ? ext.remark:'') + this.clearText(  ext.oper2) + this.itemDate(data,type)+'</dt>'+
					'<dd><div class="coolPoke" ><img src="'+ext.icon+'"/><a onclick="ActFlash.preview(\''+ext.link+'\')" href="javascript:void(0);" title="����">����</a></div></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	�����˽�Ŀ��
	item32: function(data, type) {
		var ext=data.ext[0],arr = [],str='';
		str = 	'<dt>'+this.itemTopic(data, type)+ '</dt>'+
				'<dd>'+this.itemImg(data.type,ext.title,ext.url,ext.cover)+this.itemDl(data.type,'��Ŀ�����⣺',ext.title,ext.url,'��飺',ext.desc,'',this.getCStr(ext.videocount,' ����Ƶ'))+'</dd>'
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	
	//	����΢��
	item33: function(data, type) {
		var ext=data.ext[0];
		var str =	'<dt>'+this.itemTopic(data, type)+ '</dt>'+ 	
					'<dd class="clearfix"><div>'+this.clearText(ext.title)+' [<a href="http://m.blog.sohu.com/document/detail.do?u='+ext.uid+'&id='+ext.did+'" target="_blank">ȫ��</a>]</div></dd>' ;
		if(ext.img){
			str +='<dd class="clearfix"><div class="image"><p><a href="http://m.blog.sohu.com/document/detail.do?u='+ext.uid+'&id='+ext.did+'" target="_blank"><img src="'+ext.img+'" /></a></p></div></dd>' ;
		}
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type); 
	}
});
// newsfeed ���ڵĲ�Ʒ
/*NewsFeed.Pdt={
	W:'widget',
	H:'home',
	L:'miniLst'
};
*/
// newsfeed ������
NewsFeed.Type = {
	N:'news',
	M:'mini'
};

NewsFeed.Items = {
	'0': {
		'do': '˵��',
		title: '������ʲô',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/miniblog/ico_widget.gif',
		stat: 'say',
		clsName: 'miniEntry'
	},
	'1': {
		'do': '׫д����־',
		title: '��־',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/entries/ico_widget.gif',
		stat: 'entry',
		clsName: 'addEntry'
		
	},
	'2': {
		'do': '����˺���',
		title: '����',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/links/ico_widget.gif',
		stat: 'do',
		clsName: 'addFriend',
		dftImg: 'http://img3.pp.sohu.com/ppp/blog/images/common/nobody.gif'
	},
	'3': {
		'do': '�ϴ�����Ƭ',
		title: '���',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/pp_set/ico_widget.gif',
		stat: 'ppset',
		clsName: 'addPhoto'
	},
	'4': {
		'do': '�ϴ�����Ƶ',
		title: '��Ƶ',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/v_video/ico_widget.gif',
		stat: 'video',
		clsName: 'addVideo'
	},
	'5': {
		'do': '������ģ��',
		title: 'ģ��',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_theme.gif',
		stat: 'do',
		clsName: 'miniEntry'
	},
	'6': {
		'do': '�����ģ��',
		title: '�����ģ��',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_mod.gif',
		stat: 'widget',
		clsName: 'addWidget',
		dftImg: 'http://ow.blog.sohu.com/styles/images/def.jpg'
	},
	'7': {
		'do': '������Ȧ��',
		title: '����Ȧ��',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/q_uadmingroups/ico_widget.gif',
		stat: 'creatgroup',
		clsName: 'creatGroup'
	},
	'8': {
		'do': '����������',
		title: '��Ȧ���з���',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/q_utopics/ico_widget.gif',
		stat: 'do',
		clsName: 'groupPost'
	},
	'9': {
		'do': '�����һ����ҳ��',
		title: '���ҳ��',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_addPage.gif',
		stat: 'do',
		clsName: 'addPage'
		
	},
	'10': {
		'do': '�ڹ㳡',
		title: '�ڹ㳡�з���',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/q_utopics/ico_widget.gif',
		stat: 'do',
		clsName: 'forumPost'
	},
	'11': {
		'do': '������Ȧ��',
		title: '������Ȧ��',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/q_ugroups/ico_widget.gif',
		stat: 'do',
		clsName: 'joinGroup'
	},
	'12': {
		'do': '�޸��� ',
		title: '�޸ĸ��˵���',
		icon: 'http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_profile.gif',
		stat: 'do',
		clsName: 'modifyProfile',
		type: {
			0: '���˵���',
			1: '������Ϣ',
			2: '��ϵ��ʽ',
			3: '������Ϣ',
			4: '�Ը񰮺�',
			5: 'ѧУ��Ϣ',
			6: '������Ϣ',
			7: '����ͷ��',
			8: '�ռ���Ϣ'
		}
	},
	'13': {
		'do': '������һ���������',
		title: '�������',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_slide.gif',
		stat: 'slide',
		clsName: 'creatSlide'
	},
	'14': {
		'do': '�ղ���ר��',
		title: '�ղ�ר��',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_album.gif',
		stat: 'do',
		clsName: 'favAlbum'
	},
	'15': {
		'do': '����������',
		title: '��������',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_ot.gif',
		stat: 'creattheme',
		clsName: 'creatTheme'
		
	},
	'16': {
		'do': '������ģ��',
		title: '����ģ��',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_ow.gif',
		stat: 'creatwidget',
		clsName: 'creatWidget'
	},
	'17': {
		'do': '������ģ��',
		title: '����ģ��',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_ow.gif',
		stat: 'updatewidget',
		clsName: 'updateWidget'
	},
	'18': {
		'do': '����������',
		title: '��������',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_link',
		clsName: 'shareLink'
	},
	'19': {
		'do': '�����˲���',
		title: '������',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_entry',
		clsName: 'shareEntry'
	},
	'20': {
		'do': '��������Ƶ',
		title: '������Ƶ',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_video',
		clsName: 'shareVideo'
	},
	'21': {
		'do': '�����˽�Ŀ��',
		title: '�����Ŀ��',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_playlist',
		clsName: 'sharePlaylist'
	},
	'22': {
		'do': '������ר��',
		title: '����ר��',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_ppset',
		clsName: 'shareAlbum'
		
	},
	'23': {
		'do': '��������Ƭ',
		doSuffix: '�е���Ƭ',
		title: '������Ƭ',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_photo',
		clsName: 'shareAlbum'
	},
	'24': {
		'do': '�����˶������',
		title: '���������',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_slide',
		clsName: 'shareSlide'
		
	},
	'25': {
		'do': '�����˲���',
		title: '������',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_bloger',
		clsName: 'shareBloger',
		dftImg: 'http://img3.pp.sohu.com/ppp/blog/images/common/nobody.gif'
	},
	'26': {
		'do': '����������',
		title: '��������',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_post',
		clsName: 'sharePost'
	},
	'27': {
		'do': '������Ȧ��',
		title: '����Ȧ��',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat: 'share_group',
		clsName: 'shareGroup',
		dftImg: 'http://js1.pp.sohu.com.cn/ppp/group/styles/images/ico_groupdef.jpg'
	},
	'28': {
		'do': '�μ��˻',
		title: '�μӻ',
		icon: 'http://js3.pp.sohu.com.cn/ppp/blog/widgets/campaign/ico_widget.gif',
		stat: 'joincamp',
		clsName: 'joinCamp'
	},
	'30': {
		'do': '',
		title: '��������',
		icon:'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_poke.gif',
		stat: 'pokeBase',
		clsName: 'pokeBase'
	},	
	'31': {
		'do': '',
		title: '���Ŷ���',
		icon:'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_poke.gif',
		stat: 'pokeCool',
		clsName: 'pokeCool'
	},	
	'32': {
		'do': '�����˽�Ŀ��',
		title: '�����˽�Ŀ��',
		icon: 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_poke.gif',
		stat: 'addPlaylist',
		clsName: 'pokeCool'
	},	
	'33': {
		'do': '������һƪ΢��',
		title: '����΢��',
		icon: 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/entries/ico_widget.gif',
		stat: 'addMBlog',
		clsName: 'addPhoto'
	}
}

NewsFeed.domain = 'http://mnf.blog.sohu.com/';
NewsFeed.boardUrl = '/inc/home/newsfeed.inc';
NewsFeed.ppInfoUrl = '/service/userinfo.jsp?xp=';
