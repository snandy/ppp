var NewsFeed = Class.create({
	initialize : function(options) {
		this.initOpt(options);
		this.initNewsList();
		this.setTimer();
	},
	setTimer : function() {
		if ( typeof (this.options.auto) == "number") {
			this.autoTimer = window.setInterval(this.requestCont.bind(this), this.options.auto);
		}
	},
	initOpt : function(options) {
		var opt = Object.extend({
			start : 0,
			size : 10,
			type : NewsFeed.Type.N,
			xpt : this.getXpt(),
			classify : true,
			endel : false
		}, options || {});
		opt.listEl = $(opt.listEl);
		if (opt.filter) {
			opt.filter.each(function(i) {
				opt.filter[i] = true;
			});
			if ( typeof (opt.filterSize) != "number")
				opt.filterSize = opt.size;
		}
		this.options = opt;
	},
	initNewsList : function() {
		this.requestCont();
	},
	initForm : function() {
		var opt = this.options;
		if (opt.iptEl && opt.sbtEl) {
			opt.iptEl = $(opt.iptEl);
			opt.sbtEl = $(opt.sbtEl);
			opt.sbtEl.observe('click', this.onSubmitMini.bind(this));
			if (opt.leftEl) {
				opt.leftEl = $(opt.leftEl);
				opt.iptEl.observe('keyup', this.onLeft.bind(this));
				opt.iptEl.observe('focus', this.onFocus.bind(this));
				opt.iptEl.observe('blur', this.onBlur.bind(this, false));
				this.onBlur(true);
			}
			document.observe('keydown', this.keyboardCtrl.bindAsEventListener(this));
		}
	},
	onLeft : function() {
		if (this.options.leftEl) {
			var left = Math.max((70 - this.options.iptEl.value.trim().length), 0);
			this.options.leftEl.innerHTML = left > 0 ? ('可以输入' + left + '个字') : '不允许再输入';
		}
	},
	onFocus : function() {
		if ( typeof (this.options.iptEl.isScrap) != 'undefined' && this.options.iptEl.isScrap == "1") {
			this.options.iptEl.value = '';
			this.options.iptEl.className = 'miniblog_text';
			this.options.iptEl.isScrap = 0;
		}
	},
	onBlur : function(init) {
		if (init || this.options.iptEl.value == '') {
			this.options.iptEl.value = typeof (_miniBlogTipScrape) != 'undefined' ? _miniBlogTipScrape : '一句话博客，好友能在动态里看到哦！';
			this.options.iptEl.className = 'miniblog_text grey';
			this.options.iptEl.isScrap = 1;
		}
	},
	keyboardCtrl : function(e) {
		var keyCode = e.keyCode;
		if (e.charCode)
			keyCode = e.charCode;
		if (Event.element(e).getAttribute('useEnter') && keyCode == 13) {
			this.onSubmitMini();
			Event.stop(e);
		}
	},
	onSubmitMini : function() {
		if ( typeof (this.options.iptEl.isScrap) != 'undefined' && this.options.iptEl.isScrap == 1) {
			this.options.iptEl.focus();
			return;
		}
		var value = this.options.iptEl.value;
		if ( typeof (value) != "string" || value.trim().length == 0) {
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
		this.options.sbtEl.value = '正在发表'
		this.options.sbtEl.disabled = true;
		var vn = Time.now();
		var url = NewsFeed.domain + 'post?type=add&vn=' + vn + '&xpp=' + this.getXpt() + '&content=' + escape(value);
		new Groj(url, {
			variable : 'MiniBlog.newTalk_' + vn,
			onSuccess : this.gotSubmitMini.bind(this),
			onFailure : this.noGotSubmitMini.bind(this)
		});
	},
	gotSubmitMini : function() {
		this.options.iptEl.value = '';
		this.onLeft();
		this.options.sbtEl.value = '说一句';
		this.options.sbtEl.disabled = false;
		if (this.options.onSucc)
			this.options.onSucc();
		else
			this.requestCont();
	},
	noGotSubmitMini : function() {
		alert("发表失败");
		this.options.sbtEl.value = '说一句'
		this.options.sbtEl.disabled = false;
	},
	loading : function(ele) {
		ele.innerHTML = '正在读取信息...';
	},
	getXpt : function() {
		return window._xpt;
	},
	getVN : function() {
		return (this.options.type + Time.now());
	},
	gotoPage : function(page) {
		this.options.start = (page - 1) * this.options.size;
		this.requestCont();
		this.options.start = page;
	},
	gotoList : function(page) {
		this.options.start = page;
		this.requestCont();
	},
	requestCont : function() {
		this.loading(this.options.listEl);
		var vn = this.getVN();
		var url = NewsFeed.domain + this.options.type + "?pp=" + this.getXpt() + "&st=" + this.options.start + "&sz=" + this.options.size + "&vn=" + vn;
		var _this = this;
		window.setTimeout(function() {
			new Groj(url, {
				variable : vn,
				onSuccess : _this.showNews.bind(_this),
				onFailure : _this.showError.bind(_this)
			});
		}, 5);
	},
	requestBoard : function() {
		new Ajax.Request(NewsFeed.boardUrl + "?t=" + (new Date()).getTime(), {
			method : 'get',
			onSuccess : this.setBoardData.bind(this)
		});
	},
	setBoardData : function(transport) {
		this.options.topEl.innerHTML = transport.responseText;
	},
	refresh : function(str) {
		if ( typeof (str) == "string")
			this.options.listEl.update(str);
		this.requestCont();
	},
	initPager : function() {
		if (!this.pager)
			this.pager = new Pager(this.options.pagerEl, this.options.size, this.gotoList.bind(this));
	},
	showNews : function(data) {
		if (data.status == 0 && data.news) {
			this.count = data.count;
			if (this.options.pagerEl != null) {
				this.initPager();
				this.pager.goStart(this.options.start, this.count);
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
	noData : function() {
		this.options.listEl.update(this.options.type == NewsFeed.Type.N ? '暂无好友动态。好友在哪里呢？您可以通过<a href="http://profile.blog.sohu.com/search.htm" target="_blank">找朋友</a> 工具，找到志同道合的人加为好友哦~ ' : isMyBlog() ? '今天有什么好玩的、高兴的或悲伤的事儿啊，写下来，一句两句就行~' : '暂无任何动态');
	},
	filterData : function(list) {
		var newList = [];
		if (list && list.length && list.length > 0) {
			var count = 0;
			var filter = this.options.filter;
			var filterSize = this.options.filterSize;
			list.each(function(it) {
				if (filter[it.type]) {
					newList.push(it);
					count++;
				}
				if (count >= filterSize)
					throw $break;
			});
		}
		return newList;
	},
	showError : function() {
		this.options.listEl.update('不能取得相关数据，请稍后重试');
	},
	config : {
		names : ["今天", "昨天", "本周", "上周", "很早很早以前"]
	},
	sortData : function(data) {
		var names = this.config.names;
		var dayTime = 24 * 60 * 60 * 1000;
		var now = new Date();
		var today = (new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime();
		var distance = now.getTime() - today;
		var day = now.getDay() == 0 ? 6 : (now.getDay() - 1);
		var days = this.config.days = [0, 1, day, day + 7];
		var time = this.config.time = new Array(names.length - 1);
		for (var i = 0; i < names.length - 1; i++) {
			time[i] = today - (dayTime * days[i]);
		}
		function getTimePart(time, parts) {
			for (var i = 0; i < parts.length; i++) {
				if (time >= parts[i])
					return i;
			}
			return parts.length;
		}

		var newData = new Array(names.length);
		var types = {}, type2s = {}, type6s = {}, type11s = {};
		var type3s = {}, type12s = {};
		for (var i = 0; i < data.length; i++) {
			var dataNow = data[i];
			if (dataNow && dataNow.time) {
				var timePart = getTimePart(dataNow.time, time);
				if ( typeof (newData[timePart]) == "undefined")
					newData[timePart] = [];
				newData[timePart].push(dataNow);
			}
		}
		return newData;
	},
	list : function(data, classify) {
		var str = '<ul class="newsfeedList">';
		var xpts = [];
		var needXpt = (this.options.type == NewsFeed.Type.N);
		if (classify) {
			var names = this.config.names;
			for (var i = 0; i < names.length; i++) {
				if ( typeof (data[i]) == "object") {
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
			if (this.options.endel)
				this.delBind();
			$call(function() {
				blog.user.User.fill()
			}, 'blog.user');
		}
	},
	delBind : function() {
		var as = document.getElementsByClassName("delItemA", this.options.listEl, "a");
		for (var i = 0; i < as.length; i++) {
			Event.observe(as[i], "click", this.del.bind(this, as[i]));
		}
	},
	clearCache : function(name) {
		try {
			eval(name + "=null");
		} catch(e) {
		}
	},
	del : function(ele) {
		if (ele && ele.getAttribute("itemid")) {
			var id = ele.getAttribute("itemid");
			if (confirm('确定要删除吗？')) {
				var vn = Time.now();
				this.delVN = 'MiniBlog.newTalk_' + vn;
				var url = NewsFeed.domain + 'post?type=del&sys=0&id=' + id + '&xpp=' + this.getXpt() + '&vn=' + vn;
				setTimeout( function() {
					new LinkFile(url, {
						type : 'script',
						noCache : true,
						callBack : {
							variable : this.delVN,
							onLoad : this.loadedDelData.bind(this),
							onFailure : this.noDelData.bind(this)
						}
					});
				}.bind(this), 0);
			}
		}
		return false;
	},
	loadedDelData : function() {
		var data = eval("(" + this.delVN + ")");
		if (data && data.status == "1") {
			this.requestCont();
		} else {
			alert('删除失败');
		}
	},
	noDelData : function() {
		alert('删除失败');
	},
	listItem : function(list, xpts) {
		var str = '';
		if (list && list.length && list.length > 0) {
			for (var j = 0; j < list.length; j++) {
				var itemNow = list[j];
				if (itemNow) {
					var type = itemNow.type;
					if (this['item' + type]) {
						str += this['item'+type](itemNow, this.options.type, xpts);
					}
					if (xpts && itemNow.passport) {
						xpts.push(itemNow.passport);
					}
				}
			}
		}
		return str;
	},
	itemPrefix : function(data, type) {
		var itemConfig = NewsFeed.Items[data.type];
		var str = '<li class="' + itemConfig.clsName + '">';
		if (type == NewsFeed.Type.M) {
			str += '<div class="icon">' + '<img src="' + itemConfig.icon + '" alt="' + itemConfig.title + '" title="' + itemConfig.title + '" />' + '</div>' + this.getDelStr(data, type);
		} else {
			str += '<div class="icon">' + '<a onmousedown="CA.q(\'newsfeed_blogIco\');" href="#" target="_blank" ' + this.getPpExpress(data.xpt, '#{@href}#{:=}#{$url}') + '><img src="http://js1.pp.sohu.com.cn/ppp/blog/images/common/nobody.gif" ' + this.getPpExpress(data.xpt, '#{@src}#{:=}#{$ico}#{:;}#{@alt}#{:=}#{@title}#{:=}#{$title}') + ' /></a>' + '</div>';
		}
		str += '<div class="content">' + '<div class="innerContent">' + '<dl>';
		return str;
	},
	itemPostfix : function() {
		return '</dl>' + '</div>' + '</div>' + '</li>';
	},
	getDelStr : function(data, type) {
		if (isMyBlog() && this.options.endel && type == NewsFeed.Type.M) {
			return '<div class="option">' + '<a onmousedown="CA.q(\'blog_widget_minifeed_del\');" href="javascript:void(0);" class="delItemA" itemid="' + data.id + '"><img alt="删除" src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_del.gif" align="absbottom" /></a>' + '</div>';
		} else
			return '';
	},
	itemPokefix : function(xpts) {
		if (xpts.length > 0) {
			var arr = [], _xpts = xpts.split('|');
			for (var i = 0; i < _xpts.length; i++) {
				if (_xpts[i] != '') {
					arr.push(this.userLink(_xpts[i], 'power', '', ''));
				}
			}
			return arr.join('、');
		} else {
			return '大家';
		}
	},
	itemHeader : function(data, type) {
		var itemConfig = NewsFeed.Items[data.type];
		var str = this.userLink(data.xpt) + itemConfig['do'];
		return str;
	},
	itemDate : function(data, type) {
		var str = ' <small>' + Time.friendly(data.time) + '</small>';
		return str;
	},
	itemTopic : function(data, type) {
		var str = this.itemHeader(data, type) + this.itemDate(data, type);
		return str;
	},
	itemTitle : function(type, title, link) {
		var str = '';
		if (this.itemValid(title)) {
			var itemConfig = NewsFeed.Items[type];
			str = '<a onmousedown="CA.q(\'newsfeed_' + itemConfig.stat + '_title\');" href="' + link + '" target="_blank">' + title + '</a>';
		}
		return str;
	},
	itemImg : function(type, title, link, image) {
		var str = '<div class="image">';
		if (!this.itemValid(image))
			image = NewsFeed.Items[type].dftImg;
		if ([13, 14, 21, 22, 24].include(type))
			str += '<i><i><i><i>';
		str += '<a onmousedown="CA.q(\'newsfeed_image_link\');" href="' + link + '" target="_blank">' + '<img src="' + image + '" alt="' + title + '"/>';
		if ([4, 20, 21, 32].include(type))
			str += '<span class="v_play"></span>';
		str += '</a>';
		if ([13, 14, 21, 22, 24].include(type))
			str += '</i></i></i></i>';
		str += '</div>';
		return str;
	},
	itemValid : function(value) {
		if ( typeof (value) == 'undefined' || value == 'undefined' || value == 'null' || value == '')
			return false;
		else
			return true;
	},
	itemKeyVal : function(key, value) {
		if (this.itemValid(value))
			return key + value;
		else
			return '';
	},
	itemDl : function(type, nTitle, vTitle, link, nDesc, vDesc, nExt1, vExt1, nExt2, vExt2) {
		var str = '<dl>';
		if (this.itemValid(vTitle))
			str += '<dt>' + nTitle + this.itemTitle(type, vTitle, link) + '</dt>';
		if (this.itemValid(vDesc))
			str += '<dd>' + nDesc + vDesc + '</dd>';
		if (this.itemValid(vExt1))
			str += '<dd>' + nExt1 + vExt1 + '</dd>';
		if (this.itemValid(vExt2))
			str += '<dd>' + nExt2 + vExt2 + '</dd>';
		str += '</dl>';
		return str;
	},
	itemUl : function(type, data, len, title, link, image, hasDl1) {
		var arr = [], str = '';
		arr.push('<ul>');
		for (var i = 0; i < len; i++) {
			str = '<li>' + this.itemImg(type, data[i][title], data[i][link], data[i][image]);
			if (hasDl1)
				str += this.itemDl(type, '', data[i][title], data[i][link]);
			str += '</li>';
			arr.push(str);
		}
		arr.push('</ul>');
		return arr.join('');
	},
	itemQuote : function(reson) {
		var str = '';
		if (this.itemValid(reson))
			str = '<div class="quote"><span class="innerQuote">' + reson + '</span></div>';
		return str;
	},
	itemSPFix : function(ext) {
		var str = '<dd>' + this.itemQuote(ext.reason) + '</dd>' + '<dd><a target="_blank" href="' + ext.commenturl + '">我要评论</a> | <a target="_blank" href="' + ext.shareurl + '">他的所有分享</a></dd>';
		return str;
	},
	itemLink : function(name, link) {
		var str = '';
		if (this.itemValid(name))
			str = '<a href="' + link + '" target="_blank" alt="' + name + '" >' + name + '</a>';
		return str;
	},
	itemTags : function(tags) {
		var str = '';
		if (this.itemValid(tags)) {
			for (var i = 0; i < tags.length; i++) {
				str += this.itemLink(tags[i].tag, tags[i].url) + '&nbsp;';
			}
		}
		return str;
	},
	getCStr : function(count, str) {
		if (this.itemValid(count))
			return '共 ' + count + str;
		else
			return '';
	},
	getPpExpress : function(passport, express) {
		return (' name="BlogUser" data-xpt="' + passport + '" data-blogExp="' + express + '" ');
	},
	userLink : function(passport, clsName, end, urlFix) {
		var str = '';
		if (this.itemValid(passport)) {
			var cls = typeof (clsName) == 'undefined' ? '' : clsName;
			var append = typeof (end) == 'undefined' ? '&nbsp;' : '';
			var uFix = typeof (urlFix) == 'undefined' ? 'mnt/' : urlFix;
			str = '<a class="' + cls + '" onmousedown="CA.q(\'newsfeed_blogName\');" href="#" target="_blank"' + this.getPpExpress(passport, '#{@innerHTML}#{:=}#{$title}#{:;}#{@href}#{:=}#{$url}' + uFix) + '></a>' + append;
		}
		return str;
	},
	findLink : function(str) {
		str = str.replace(/src=\'http/g, 'src=\'htp');
		str = str.replace(/(http[^ \)\u0100-\uffff]*)/g, '<a href="$1" title="$1" target="_blank">$1</a>');
		return str.replace(/src=\'htp/g, 'src=\'http');
	},
	clearText : function(str) {
		str = str.replace(/</ig, '&lt;');
		str = str.replace(/>/ig, '&gt;');
		str = str.replace(/"/ig, '&quot;');
		str = str.replace(/'/ig, '&apos;');
		return str;
	},
	item0 : function(data, type) {
		var ext = data.ext[0];
		ext.title = parseTitle(ext.title);
//		console.log(ext.title);
		var str = '<dt>' + this.itemHeader(data, type) + this.findLink(this.clearText(unescape(ext.title))) + ((ext.from && ext.from == "0") ? '&nbsp;<a onmousedown="CA.q(\'newsfeed_miniblog_mobile\');" href="http://blog.sohu.com/manage/mobile.do?m=funcs" target="_blank" ><img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/mobile/ico_mobile.gif" border="0" alt="本动态由手机发出" title="本动态由手机发出" /></a>' : '') + this.itemDate(data, type) + '</dt>';
		if (ext.type && ext.type == 1) {
			var url = (ext.url) ? ext.url : null;
			if (url) {
				var index = url.lastIndexOf("/");
				var imagePath = url.substring(0, index + 1);
				var imageName = url.substring(index + 1, url.length);
				var smallImageUrl = imagePath + imageName.replace(".", "_s.");
				str += '<dd><a href="' + url + '" target=_blank><img src="' + smallImageUrl + '"></a>';
			}
		}
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);

		function parseTitle(title) {
			if (!title) return;
			var str = '', 
				reg = /@{[^{]*}/g;
			str = title.replace(reg, function(val) {
				var str = val.replace('@', '');
				try {
					var obj = jQuery.parseJSON(str);
				} catch(e) {
					return val
				}
				
				return '@' + obj.snick;
			});
			return str
		}
	},
	item1 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + '<dl>' + '<dt>' + this.itemTitle(data.type, ext.title, ext.link) + '</dt>' + '<dd>' + (this.itemValid(ext.desc) ? ext.desc : '') + '...<a on mousedown="CA.q(\'newsfeed_entry_all\');" href="' + ext.link + '" target="_blank">[全文]</a></dd>' + '</dl>' + '</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item2 : function(data, type) {
		var newData = data.ext, arr = [], str = '';
		if (newData.length == 1) {
			var ext = newData[0];
			str = '<dd class="clearfix">' + this.itemImg(data.type, ext.nick, ext.link, ext.icon) + this.itemDl(data.type, '', ext.nick, ext.link, '', ext.desc) + '</dd>';
			if (this.itemValid(ext.fpassport))
				str += '<dd><a href="javascript:void(0)" onclick="window.open(\'http://blog.sohu.com/manage/friend.do?m=add&t=shortcut&xpt=' + ext.fpassport + '\',\'\',\'height=178 ,width=298\');">加为好友</a> | <a target="_blank" href="http://blog.sohu.com/people/!' + ext.fpassport + '/profile/">查看档案</a></dd>';
			arr.push(str);
		} else {
			arr.push('<dd class="clearfix">' + this.itemUl(data.type, newData, newData.length, 'nick', 'link', 'icon', true) + '</dd>');
		}
		str = '<dt>' + this.itemTopic(data, type) + '</dt>' + arr.join('');
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item3 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemUl(data.type, ext.item, ext.item.length, 'desc', 'url', 'cover130', false) + '</dd>' + '<dd>' + '<dl>' + '<dt>' + this.itemKeyVal('相册：', this.itemTitle(data.type, ext.title, ext.url)) + '</dt>' + '</dl>' + '</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item4 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemImg(data.type, ext.title, ext.url, ext.cover) + this.itemDl(data.type, '视频标题：', ext.title, ext.url, '简介：', ext.desc) + '</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item6 : function(data, type) {
		var newData = data.ext, arr = [], str = '';
		if (newData.length == 1) {
			var ext = newData[0];
			str = '<dd class="clearfix">' + this.itemImg(data.type, ext.title, ext.link, ext.pic) + this.itemDl(data.type, '模块名称：', ext.title, ext.link, '简介：', ext.desc, '作者：', this.itemLink(ext.author, ext.authorlink)) + '</dd>' + '<dd><a target="_blank" href="' + ext.link + '">我也添加</a></dd>';
			arr.push(str);
		} else {
			arr.push('<dd>' + this.itemUl(data.type, newData, (newData.length > 3 ? 3 : newData.length), 'title', 'link', 'pic', true) + '</dd>');
		}
		str = '<dt>' + this.itemTopic(data, type) + '</dt>' + arr.join('');
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item7 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemImg(data.type, ext.name, ext.url, ext.logo) + this.itemDl(data.type, '', ext.name, ext.url, '', ext.desc, '标签：', this.itemTags(ext.tags)) + '</dd>' + '<dd>' + this.itemLink('加入圈子', ext.gjurl) + '</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item8 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.userLink(data.xpt) + '在圈子 ' + this.itemLink(ext.gn, ext.gurl) + ' 里发表了帖子 <small>' + Time.friendly(data.time) + '</small></dt>' + '<dd class="clearfix">' + '<dl>' + '<dt>' + this.itemTitle(data.type, ext.tn, ext.turl) + '</dt>' + '<dd>' + (this.itemValid(ext.desc) ? ext.desc : '') + '...<a on mousedown="CA.q(\'newsfeed_topic_all\');" href="' + ext.turl + '" target="_blank">[全文]</a></dd>' + '</dl>' + '</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item10 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.userLink(data.xpt) + '在广场 ' + this.itemLink(ext.fn, ext.furl) + ' 里发表了帖子 <small>' + Time.friendly(data.time) + '</small></dt>' + '<dd class="clearfix">' + '<dl>' + '<dt>' + this.itemTitle(data.type, ext.tn, ext.turl) + '</dt>' + '<dd>' + (this.itemValid(ext.desc) ? ext.desc : '') + '...<a on mousedown="CA.q(\'newsfeed_topic_all\');" href="' + ext.turl + '" target="_blank">[全文]</a></dd>' + '</dl>' + '</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item11 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemImg(data.type, ext.name, ext.gurl, ext.icon) + this.itemDl(data.type, '', ext.name, ext.gurl, '', ext.desc) + '</dd>' + '<dd><a target="_blank" href="' + ext.gjurl + '">加入圈子</a></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item12 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemHeader(data, type) + '<a onmousedown="CA.q(\'newsfeed_profile\');" class="power" href="' + ext.purl + '" target="_blank">' + NewsFeed.Items[data.type].type[(this.itemValid(ext.type) ? ext.type : 0)] + '</a>' + this.itemDate(data, type) + '</dt>';
		if (ext.type == 7)
			str += '<dd class="clearfix">' + this.itemImg(data.type, '', ext.purl, ext.ico) + '</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item13 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemImg(data.type, ext.title, ext.url, ext.cover130) + this.itemDl(data.type, '主题：', ext.title, ext.url, '', this.getCStr(ext.photocount, ' 张照片')) + '</dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item15 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemImg(data.type, ext.title, ext.link, ext.pic) + this.itemDl(data.type, '模板名称：', ext.title, ext.link) + '</dd>' + '<dd><a target="_blank" href="' + ext.link + '">使用此模板</a></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item16 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemImg(data.type, ext.title, ext.link, ext.pic) + this.itemDl(data.type, '模块名称：', ext.title, ext.link, '简介：', ext.desc) + '</dd>' + '<dd><a target="_blank" href="' + ext.link + '">我也添加</a></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item18 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + '<dl>' + '<dt>' + this.itemTitle(data.type, ext.title, ext.url) + '</dt>' + '</dl>' + '</dd>' + this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item19 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + '<dl>' + '<dt>' + this.itemTitle(data.type, ext.title, ext.url) + '</dt>' + '<dd>' + this.itemKeyVal('作者：', this.userLink(ext.author, '', '', '')) + '</dd>' + '<dd>' + (this.itemValid(ext.desc) ? ext.desc : '') + '<a target="_blank" href="' + ext.url + '">...[全文]</a></dd>' + '</dl>' + '</dd>' + this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item20 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemImg(data.type, ext.title, ext.url, ext.img) + this.itemDl(data.type, '视频标题：', ext.title, ext.url, '简介：', ext.desc, '作者：', this.userLink(ext.author, 'power', '', '')) + '</dd>' + this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item21 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemImg(data.type, ext.title, ext.url, ext.img) + this.itemDl(data.type, '节目单标题：', ext.title, ext.url, '简介：', ext.desc, '', this.getCStr(ext.videocount, ' 个视频'), '来自：', this.userLink(ext.author, 'power', '', '')) + '</dd>' + this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item22 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemImg(data.type, ext.title, ext.url, ext.img) + this.itemDl(data.type, '专辑名称：', ext.title, ext.url, '专辑描述：', ext.desc, '', this.getCStr(ext.photocount, ' 张照片'), '来自：', this.userLink(ext.author, 'power', '', '')) + '</dd>' + this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item23 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemImg(data.type, ext.title, ext.url, ext.img) + this.itemDl(data.type, '照片描述：', ext.title, ext.url, '所属专辑：', this.itemLink(ext.photosetname, ext.photoseturl), '来自：', this.userLink(ext.author, 'power', '', '')) + '</dd>' + this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item24 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemImg(data.type, ext.title, ext.url, ext.img) + this.itemDl(data.type, '名称：', ext.title, ext.url, '', this.getCStr(ext.photocount, ' 张照片'), '作者：', this.userLink(ext.author, 'power', '', '')) + '</dd>' + this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item25 : function(data, type, xpts) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemImg(data.type, ext.title, ext.url, ext.img) + this.itemDl(data.type, '', ext.title, ext.url, '', ext.desc) + '</dd>' + this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item26 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + '<dl>' + '<dt>' + this.itemTitle(data.type, ext.title, ext.url) + '</dt>' + '<dd>' + this.itemKeyVal('来自' + this.itemKeyVal('', ext.from) + '：', this.itemLink(ext.name, ext.qurl)) + this.itemKeyVal('&nbsp;&nbsp;发表者：', this.userLink(ext.author, 'power', '', '')) + '</dd>' + '<dd>' + (this.itemValid(ext.desc) ? ext.desc : '') + '<a target="_blank" href="' + ext.url + '">[全文]</a></dd>' + '</dl>' + '</dd>' + this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item27 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix">' + this.itemImg(data.type, ext.title, ext.url, ext.img) + this.itemDl(data.type, '', ext.title, ext.url, '', ext.desc, '标签：', this.itemTags(ext.tags)) + '</dd>' + this.itemSPFix(ext);
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item28 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemHeader(data, type) + this.itemLink(ext.title, ext.link) + ',<a href="' + ext.link + '" target="_blank">我也去看看</a> ' + this.itemDate(data, type) + '</dt>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item30 : function(data, type, xpts) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemHeader(data, type) + this.clearText(ext.oper1) + '&nbsp;' + this.itemPokefix(ext.user) + (ext.remark != 'null' ? ext.remark : '') + this.clearText(ext.oper2) + '&nbsp;<img src="' + ext.icon + '" />' + this.itemDate(data, type) + '</dt>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item31 : function(data, type, xpts) {
		if (!window.ActFlash) {
			var oHead = document.getElementsByTagName('HEAD').item(0);
			var oScript = document.createElement("script");
			oScript.type = "text/javascript";
			oScript.src = "http://js4.pp.sohu.com.cn/ppp/poke/js_src/actFlash.js";
			oHead.appendChild(oScript);
		}
		var ext = data.ext[0];
		var str = '<dt>' + this.itemHeader(data, type) + this.clearText(ext.oper1) + '&nbsp;' + this.itemPokefix(ext.user) + (ext.remark != 'null' ? ext.remark : '') + this.clearText(ext.oper2) + this.itemDate(data, type) + '</dt>' + '<dd><div class="coolPoke" ><img src="' + ext.icon + '"/><a onclick="ActFlash.preview(\'' + ext.link + '\')" href="javascript:void(0);" title="播放">播放</a></div></dd>';
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item32 : function(data, type) {
		var ext = data.ext[0], arr = [], str = '';
		str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd>' + this.itemImg(data.type, ext.title, ext.url, ext.cover) + this.itemDl(data.type, '节目单标题：', ext.title, ext.url, '简介：', ext.desc, '', this.getCStr(ext.videocount, ' 个视频')) + '</dd>'
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	},
	item33 : function(data, type) {
		var ext = data.ext[0];
		var str = '<dt>' + this.itemTopic(data, type) + '</dt>' + '<dd class="clearfix"><div>' + this.clearText(ext.title) + ' [<a href="http://m.blog.sohu.com/document/detail.do?u=' + ext.uid + '&id=' + ext.did + '" target="_blank">全文</a>]</div></dd>';
		if (ext.img) {
			str += '<dd class="clearfix"><div class="image"><p><a href="http://m.blog.sohu.com/document/detail.do?u=' + ext.uid + '&id=' + ext.did + '" target="_blank"><img src="' + ext.img + '" /></a></p></div></dd>';
		}
		return this.itemPrefix(data, type) + str + this.itemPostfix(data, type);
	}
});
NewsFeed.Type = {
	N : 'news',
	M : 'mini'
};
NewsFeed.Items = {
	'0' : {
		'do' : '说：',
		title : '我在做什么',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/miniblog/ico_widget.gif',
		stat : 'say',
		clsName : 'miniEntry'
	},
	'1' : {
		'do' : '撰写了日志',
		title : '日志',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/entries/ico_widget.gif',
		stat : 'entry',
		clsName : 'addEntry'
	},
	'2' : {
		'do' : '添加了好友',
		title : '好友',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/links/ico_widget.gif',
		stat : 'do',
		clsName : 'addFriend',
		dftImg : 'http://img3.pp.sohu.com/ppp/blog/images/common/nobody.gif'
	},
	'3' : {
		'do' : '上传了照片',
		title : '相册',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/pp_set/ico_widget.gif',
		stat : 'ppset',
		clsName : 'addPhoto'
	},
	'4' : {
		'do' : '上传了视频',
		title : '视频',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/v_video/ico_widget.gif',
		stat : 'video',
		clsName : 'addVideo'
	},
	'5' : {
		'do' : '更换了模板',
		title : '模板',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_theme.gif',
		stat : 'do',
		clsName : 'miniEntry'
	},
	'6' : {
		'do' : '添加了模块',
		title : '添加了模块',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_mod.gif',
		stat : 'widget',
		clsName : 'addWidget',
		dftImg : 'http://ow.blog.sohu.com/styles/images/def.jpg'
	},
	'7' : {
		'do' : '创建了圈子',
		title : '创建圈子',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/q_uadmingroups/ico_widget.gif',
		stat : 'creatgroup',
		clsName : 'creatGroup'
	},
	'8' : {
		'do' : '发表了帖子',
		title : '在圈子中发帖',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/q_utopics/ico_widget.gif',
		stat : 'do',
		clsName : 'groupPost'
	},
	'9' : {
		'do' : '添加了一个新页面',
		title : '添加页面',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_addPage.gif',
		stat : 'do',
		clsName : 'addPage'
	},
	'10' : {
		'do' : '在广场',
		title : '在广场中发帖',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/q_utopics/ico_widget.gif',
		stat : 'do',
		clsName : 'forumPost'
	},
	'11' : {
		'do' : '加入了圈子',
		title : '加入了圈子',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/q_ugroups/ico_widget.gif',
		stat : 'do',
		clsName : 'joinGroup'
	},
	'12' : {
		'do' : '修改了 ',
		title : '修改个人档案',
		icon : 'http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_profile.gif',
		stat : 'do',
		clsName : 'modifyProfile',
		type : {
			0 : '个人档案',
			1 : '基本信息',
			2 : '联系方式',
			3 : '交友信息',
			4 : '性格爱好',
			5 : '学校信息',
			6 : '工作信息',
			7 : '个人头像',
			8 : '空间信息'
		}
	},
	'13' : {
		'do' : '创作了一个动感相册',
		title : '动感相册',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_slide.gif',
		stat : 'slide',
		clsName : 'creatSlide'
	},
	'14' : {
		'do' : '收藏了专辑',
		title : '收藏专辑',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_album.gif',
		stat : 'do',
		clsName : 'favAlbum'
	},
	'15' : {
		'do' : '创建了主题',
		title : '创建主题',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_ot.gif',
		stat : 'creattheme',
		clsName : 'creatTheme'
	},
	'16' : {
		'do' : '创建了模块',
		title : '创建模块',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_ow.gif',
		stat : 'creatwidget',
		clsName : 'creatWidget'
	},
	'17' : {
		'do' : '更新了模块',
		title : '更新模块',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_ow.gif',
		stat : 'updatewidget',
		clsName : 'updateWidget'
	},
	'18' : {
		'do' : '分享了链接',
		title : '分享链接',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat : 'share_link',
		clsName : 'shareLink'
	},
	'19' : {
		'do' : '分享了博文',
		title : '分享博文',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat : 'share_entry',
		clsName : 'shareEntry'
	},
	'20' : {
		'do' : '分享了视频',
		title : '分享视频',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat : 'share_video',
		clsName : 'shareVideo'
	},
	'21' : {
		'do' : '分享了节目单',
		title : '分享节目单',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat : 'share_playlist',
		clsName : 'sharePlaylist'
	},
	'22' : {
		'do' : '分享了专辑',
		title : '分享专辑',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat : 'share_ppset',
		clsName : 'shareAlbum'
	},
	'23' : {
		'do' : '分享了照片',
		doSuffix : '中的照片',
		title : '分享照片',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat : 'share_photo',
		clsName : 'shareAlbum'
	},
	'24' : {
		'do' : '分享了动感相册',
		title : '分享动感相册',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat : 'share_slide',
		clsName : 'shareSlide'
	},
	'25' : {
		'do' : '分享了博友',
		title : '分享博友',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat : 'share_bloger',
		clsName : 'shareBloger',
		dftImg : 'http://img3.pp.sohu.com/ppp/blog/images/common/nobody.gif'
	},
	'26' : {
		'do' : '分享了帖子',
		title : '分享帖子',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat : 'share_post',
		clsName : 'sharePost'
	},
	'27' : {
		'do' : '分享了圈子',
		title : '分享圈子',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_share.gif',
		stat : 'share_group',
		clsName : 'shareGroup',
		dftImg : 'http://js1.pp.sohu.com.cn/ppp/group/styles/images/ico_groupdef.jpg'
	},
	'28' : {
		'do' : '参加了活动',
		title : '参加活动',
		icon : 'http://js3.pp.sohu.com.cn/ppp/blog/widgets/campaign/ico_widget.gif',
		stat : 'joincamp',
		clsName : 'joinCamp'
	},
	'30' : {
		'do' : '',
		title : '基本动作',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_poke.gif',
		stat : 'pokeBase',
		clsName : 'pokeBase'
	},
	'31' : {
		'do' : '',
		title : '酷炫动作',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_poke.gif',
		stat : 'pokeCool',
		clsName : 'pokeCool'
	},
	'32' : {
		'do' : '制作了节目单',
		title : '制作了节目单',
		icon : 'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_poke.gif',
		stat : 'addPlaylist',
		clsName : 'pokeCool'
	},
	'33' : {
		'do' : '发表了一篇微博',
		title : '发表微博',
		icon : 'http://js5.pp.sohu.com.cn/ppp/blog/widgets/entries/ico_widget.gif',
		stat : 'addMBlog',
		clsName : 'addPhoto'
	}
}
NewsFeed.domain = 'http://i.sohu.com/a/newsfeed/';
NewsFeed.boardUrl = '/inc/home/newsfeed.inc';
NewsFeed.ppInfoUrl = '/service/userinfo.jsp?xp='; 