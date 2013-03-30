var __def__ = {
	dialog: {},
	
	call: function(type, id) {
		if (!type || !id || !this[type] || !this[type][id]) return;
		return this['fn_' + type](id);
	},
	
	fn_dialog: function(id) {
		Dialog.instance(this.dialog[id]);
	}
}

/********* sohu im ********/
var webim_config = {
	product: "sohu/blog",
	cm_menu_width: "90",
	/*
	categoryGroups: ['sohu/blog'],
	showGroup:'sohu/blog',
	*/
	load_panel:true,
	cm_showtip:false,
	cm_GenMenu: function(candleman, menu){
		for (var i = menu.length-1; i >= 0; i--) {
			if (menu[i].n == "传纸条") {
				menu[i].n = "发送小纸条";
				menu[i].t = "给 $NICK 传小纸条";
			}
			if (menu[i].n == "加为好友") {
				menu[i].n = "加为小纸条好友";
				menu[i].t = "加 $NICK 为小纸条好友";
			}
		}
	},
	cm_menu: [
		{
			id: "poke", 
			n: "向他打招呼",
			t: "向他打招呼",
			c: function(cm) {
				if (typeof(pokeHe) == 'function') pokeHe(cm._id);
				else window.open('http://poke.blog.sohu.com/pop/poking.do?actId=1&pp='+cm._id, '_blank', 'width=630,height=470');
			}
		}
	]
};

/***********************************************************************************************/

/**
 * 显示PP评论列表
 */
/*
var PP = {}
PP.Comment = {
	
	//	显示给当前用户的所有评论
	listOfAccepter: function(ele) {
		var url = 'http://pp.sohu.com/json/commentlist*' + _ept + '*5.html?ca=' + Time.now();
		new Groj(url, {
			variable: 'ppComment',
			onSuccess: function(json) {
				var str = '';
				if (json && json.length) {
					str = json.collect(function(it) {
						if (it && it.content) {
							return '<li><a target="_blank" href="http://pp.sohu.com' + it.viewurl + '">' + it.content + '</a></li>';
						} else {
							return '';
						}
					}).join("");
				}
				if (str == '') {
					str = '把照片地址发给好友，看看他们说些什么。';
				} else {
					str = '<ul>' + str + '</ul>';
				}
				$(ele).innerHTML = str;
			}, 
			onFailure: function() {
				$(ele).innerHTML = '把照片地址发给好友，看看他们说些什么。';
			}
		});
	}
}
*/

/***********************************************************************************************/
/******** Emotion ******/
var Emotion = {
	iconPath: 'http://js3.pp.sohu.com.cn/ppp/images/emotion/',
	lib: [
		["[moved]",		"12.gif",	"感动"	],
		["[smile]",		"3.gif",	"搞笑"	],
		["[suprise]",	"22.gif",	"疯狂"	],
		["[sweet]",		"36.gif",	"温馨"	],
		["[cool]",		"34.gif",	"酷"	],
		["[end]",		"32.gif",	"爽"	],
		["[powerful]",	"33.gif",	"强"	],
		["[admire]",	"35.gif",	"赞"	]
	],
	getEmotion: function(emo) {
		for (var i=0; i<this.lib.length; i++) {
			var emotion = this.lib[i];
			if (emotion[0] == emo) {
				return emotion;
			}
		}
		return null;
	},
	getEmotionIcon: function(ubb) {
		var str = '';
		for (var i=0; i<this.lib.length; i++) {
			var emotion = this.lib[i];
			if (emotion[0] == ubb) {
				str += '<img src="'+ this.iconPath + emotion[1] +'" alt="'+ emotion[2] +'" title="'+ emotion[2] +'" ec="'+ ubb +'" />';
			}
		}
		return str;
	},
	getEmotionIcons: function() {
		var str = '';
		for (var i=0; i<this.lib.length; i++) {
			var emotion = this.lib[i];
			str += '<img src="'+ this.iconPath + emotion[1] +'" alt="'+ emotion[2] +'" title="'+ emotion[2] +'" ec="'+ emotion[0] +'" />';
		}
		return str;
	},
	unescapeUbb: function(ubbStr) {
		ubbStr = ubbStr.replace(/\[moved\]/g, Emotion.getEmotionIcon('[moved]'));
		ubbStr = ubbStr.replace(/\[smile\]/g, Emotion.getEmotionIcon('[smile]'));
		ubbStr = ubbStr.replace(/\[suprise\]/g, Emotion.getEmotionIcon('[suprise]'));
		ubbStr = ubbStr.replace(/\[sweet\]/g, Emotion.getEmotionIcon('[sweet]'));
		ubbStr = ubbStr.replace(/\[cool\]/g, Emotion.getEmotionIcon('[cool]'));
		ubbStr = ubbStr.replace(/\[end\]/g, Emotion.getEmotionIcon('[end]'));
		ubbStr = ubbStr.replace(/\[powerful\]/g, Emotion.getEmotionIcon('[powerful]'));
		ubbStr = ubbStr.replace(/\[admire\]/g, Emotion.getEmotionIcon('[admire]')); 
		return ubbStr;
	}
};

/***********************************************************************************************/

/**
 * 显示V评论列表
 */
/*
var V = {}
V.Comment = {
	
	//	显示给当前用户的所有评论
	listOfAccepter: function(ele) {
		var vn = 'VComments';
		var url = 'http://v.blog.sohu.com/json/userComment*' + _xpt + '*5*0*' + vn + '.html?t=' + Time.now();
		new Groj(url, {
			variable: vn,
			onSuccess: function(json) {
				var str = '';
				if (json && json.status == 0) {
					if (json.data && json.data.length) {
						str = json.data.collect(function(it) {
							if (it && it.content) {
								var content = it.content;
								var brIndex = content.indexOf("</blockquote>");
								if (brIndex != -1) content = content.substr(brIndex + "</blockquote>".length);
								return '<li><a target="_blank" href="' + it.link + '">' + Emotion.unescapeUbb(content) + '</a></li>';
							} else {
								return '';
							}
						}).join("");
					}
					if (str == '') {
						str = '分享好看的视频，与大家一起侃侃。';
					} else {
						str = '<ul>' + str + '</ul>';
					}
				} else {
					str = '分享好看的视频，与大家一起侃侃。';
				}
				$(ele).innerHTML = str;
			}, 
			onFailure: function() {
				$(ele).innerHTML = '分享好看的视频，与大家一起侃侃。';
			}
		});
	}
}
*/

/***********************************************************************************************/

/**
 * 显示最近访客
 * 
 * @base prototype jQuery Groj blog/Blog
 */

var Refer = {
	init: function(ctr) {
		this.ctrJ = J(ctr);
		this.ctrJ.html('加载中...');
		this.requestIds();
	},
	
	requestIds: function() {
		if (Blog.getDomain() == 'null') {
			this.noGotIds();
			return;
		}
		var url = 'http://stat.pic.sohu.com/blogcount?u=' + Blog.getDomain() + '&k=rv';
		new Groj(url, {
			variable: 'referid',
			onSuccess: this.gotIds.bind(this),
			onFailure: this.noGotIds.bind(this)
		});
	},
	
	gotIds: function(data) {
		if (typeof(data) == "string" && data.length > 0 && data != '0') this.requestRefers(data);
		else this.noGotIds();
	},
	
	noGotIds: function() {
		this.ctrJ.html('新来的吧，还没有人发现你哦。<a href="http://blog.sohu.com/morefreshblogs.html" target="_blank">快去和大家打个招呼吧！</a>');
	},
	
	requestRefers: function(ids) {
		var url = '/frag/referfrag.jsp?u=' + Blog.getDomain() + '&ids=' + ids;
		new Ajax.Request(url, {
			onSuccess: this.gotRefers.bind(this),
			onFailure: this.noGotRefers.bind(this)
		});
	},
	
	gotRefers: function(transport) {
		if (transport.responseText.length > 0) {
			this.ctrJ.html(transport.responseText);
			setTimeout(this.addTime.bind(this), 0);
		}
		else this.noGotRefers();
	},
	
	noGotRefers: function() {
		this.noGotIds();
	},
	
	addTime: function() {
		if (!(typeof(referidtime) == "string" && referidtime.length > 0)) return; 
		if (this.ctrJ.length == 0 || !this.ctrJ.eles[0]) return;
		//	var brs = this.ctrJ.eles[0].getElementsByTagName("br"),
		var brs = this.ctrJ.eles[0].getElementsByTagName('img'),
				times = referidtime.split(',');
		//	过滤掉博主访问自己的情况
		if (typeof(referid) == "string" && referid.length > 0) {
			var referids = referid.split(',');
			for (var i=0, il=referids.length; i<il; i++) {
				if (referids[i] == _ebi) {
					if (i < times.length) times.splice(i, 1);
					break;
				}
			}
		}
		for (var i=0, il=Math.min(brs.length, times.length); i<il; i++) {
			var it = times[i];
			if (isNaN(it) || parseInt(it) == 0) continue;
			brs[i].alt = brs[i].title = Time.friendly(it);
			//	brs[i].parentNode.appendChild(document.createTextNode(Time.friendly(it)));
		}
	}
}

/***********************************************************************************************/

/**
 * 有关博客的一些方法
 * 
 * @base prototype groj
 */

var Blog = {};

/**
 * 为Blog加入一些有关通过二次请求取得用户信息的方法
 */
Object.extend(Blog, {
	express: function(passport, express) {
	  return ' name="_xp_' + passport + '" xpexpress="' + express + '" ';
	},
	
	request: function(xpts) {
		if (xpts.length > 0) {
			var arrs = [];
			for (var i=0; i<xpts.length; i++) {
				if (arrs[xpts[i]]) continue;
				arrs.push(xpts[i]);
				arrs[xpts[i]] = true;
			}
			var url = '/service/userinfo.jsp?xp=' + arrs.join(",");
			new Groj(url, {
				onSuccess: Blog.gettedBlog
			});
		}
	},
	
	
	gettedBlog: function(data) {
		if (!data) return;
		for (var i in data) {
			if (data[i] && typeof(data[i].url) == "string") {
				Blog.setBlog(i, data[i]);
			}
		}
	},
	
	setBlog: function(passport, info) {
		var name = '_xp_' + passport;
		var eles = document.getElementsByName(name);
		for (var i=0; i<eles.length; i++) {
			var eleNow = eles[i];
			var express = eleNow.getAttribute("xpexpress");
			if (typeof(express) == "string" && express.length > 0) {
				var arr = express.split(";");
				for (var j=0; j<arr.length; j++) {
					var arr2 = arr[j].split(":");
					if (arr2.length != 2) continue;
					switch(arr2[0]) {
						case "html":
							eleNow.innerHTML = info[arr2[1]];
							break;
						case "value":
							eleNow.value = info[arr2[1]];
							break;
						default: 
							eleNow.setAttribute(arr2[0], info[arr2[1]]);
							break;
					}
				}
			}
		}
	}
});


/**
 * 为Blog加入一些取得当前博客信息的一些方法
 */
Object.extend(Blog, {
	getTitle: function() {
		if (!$('homeTitle')) {return null;}
		return ($('homeTitle').firstChild.innerHTML);
	},
	getLink: function() {
		if (!$('blogUrl')) {return null;}
		return ($('blogUrl').lastChild.href);
	},
	getDesc: function() {
		return '';
	}
});


/**
 * 为Blog加入一些取得当前博客用户的信息
 */
Object.extend(Blog, {
	getDomain: function() {
		return _blog_domain;
	}
});

/**
 * 为Blog加入一些加为友情链接的方法
 */
Object.extend(Blog, {
	addToFav: function(from) {
		var _title = Blog.getTitle();
		var _desc = Blog.getDesc();
		var _link = Blog.getLink();
		if (!_title || !_link) {
			alert('无法获得此站点相应数据');
			return;
		}
		if (ToolBar) {
			ToolBar.disableBtn(ToolBar.addLink);
		}
		LoadBar.show('读取中...');
		
		var url = '/manage/link.do';
		var pars = 'm=add&title='+ escape(_title) +'&desc='+ escape(_desc.substr(0,64) || '') +'&link='+ escape(_link) + '&subscribe=1';
		var myAjax = new Ajax.Request( url, {method: 'post', parameters: pars, onComplete: Blog.doneAddToFav});
	},
	doneAddToFav: function(request,json,data) {
		setTimeout(function(){
			if (ToolBar)	{
				ToolBar.ableBtn(ToolBar.addLink);
			}
		}, 1000);
		if (!request || !request.responseText) {
			alert('Error: The resource file is not well-formed.\n'+request.responseText);
			return;
		}
		var data = eval("(" + request.responseText + ")");
		switch (data.status) {
			case 0:	//	成功
				LoadBar.show('已加为好友','ok');
				break;
			case 3:	//	重复添加
				LoadBar.show('已加为好友','ok');
				break;
			default: //	其他失败信息
				var str = 'Error code: '+ data.status +'\n';
				str += 'Error Message: '+ data.statusText +'\n';
				str += 'Please contact administrators.\n';
				alert(str);
				break;
		}
		setTimeout(LoadBar.hide, 1000);
	}
});

var addToFav = Blog.addToFav;

/***********************************************************************************************/

var LoadBar = {
	show: function(text, type) {
		clearTimeout(this.timeout);
		text = text || 'loading...';
		this.build(text);
		if (type == 'ok') {
			Element.addClassName(this.element, 'okBar');
		}
		else {
			Element.removeClassName(this.element, 'okBar');
		}
		Element.show(this.element);
		this.element.style.right = '0px';
		this.element.style.top = document.documentElement.scrollTop + 30 +'px';
		this.showStatusBar(text);
	},
	hide: function(delay) {
		if (LoadBar.element) {
			LoadBar.timeout = setTimeout(function() {
				if (LoadBar.element) {
					Element.hide(LoadBar.element);
				}
				LoadBar.hideStatusBar();
			}, ((delay && !isNaN(delay))? delay : 0) );
		}
	},
	destroy: function() {
		if (this.element) {
			Element.remove(this.element);
			this.element = null;
		}
	},
	build: function(text) {
		if (this.element) {
			this.element.firstChild.firstChild.alt = text;
			this.element.firstChild.childNodes[1].nodeValue = text;
			return;
		}
		this.element = document.createElement('div');
		Element.addClassName(this.element, 'loadBar');
		this.element.style.zIndex = 1000;
		this.element.style.position = 'absolute';
		Element.hide(this.element);
		
		var innerDiv = document.createElement('div');
		var img = 'http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/loading.gif';
		innerDiv.innerHTML = '<img src="'+ img +'" alt="text" />' + text;
		
		this.element.appendChild(innerDiv);
		document.body.appendChild(this.element);
	},
	showStatusBar: function(text) {
		setTimeout(function(){window.status = text;}, 10);
	},
	hideStatusBar: function() {
		setTimeout(function(){window.status = '';}, 10);
	}
};

/***********************************************************************************************/

/**
 * 有关用户的一些功能
 * 
 * @base common/cookie.js common/base64.js
 */


//	判断当前用户是否已经登陆了passport
function isPPLogin() {
	var passportP;
	if (typeof PassportSC != 'undefined' && (passportP = getPPP())) {
		return true;
	}
	return false;
}
//	判断当前用户是否已经登录了博客（已经登录了passport且有博客且登录了博客）
function isLogin() {
    if (isPPLogin()) {
		var blogP;
		if ((blogP = getP()) && blogP == getPPP() && hasBlog()) {
			return true;
		}
		return false;
	}
	return false;
}
//	取得当前博客用户的passport（未经过passport的）
function getP() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.P) {
		BlogCookieInfo.parseCookie();
	}
	var str = BlogCookieInfo.cookie.P;
	/*var c = String.fromCharCode(str.charCodeAt(0) - str.length);
	for(var i=1; i<str.length; i++) {
		c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i-1));
	}*/
	var c = '';
	if (str) {
		try{
			c = b64_decodex(str);
			if (c.indexOf('@') < 0) {
				c = '';
			}
		}catch(e){}
		return c;
	}
	else {
		return '';
	}
}
//	获取当前登陆用户的明文passport
function getPPP() {
	if (typeof PassportSC != 'undefined' && PassportSC && PassportSC.cookieHandle) {
		var strPassport = PassportSC.cookieHandle();
		if (strPassport.indexOf('@focus.cn')> 0 ){
			strPassport = PassportSC.cookie['uid'] + '@focus.cn';   //todo: passport should offer a function
		}
		return strPassport;
	}
	return '';
}
// 'mail', 'alumni', 'blog', 'pp', 'club', 'crclub', 'xiaonei', 'say', 'music'
function getProduct(pdt) {
	if (!pdt) {return false;}
	if (typeof PassportSC == 'undefined' || !PassportSC) {
		return false;
	}
	if (!PassportSC.cookie || !PassportSC.cookie.service) {
		PassportSC.parsePassportCookie();
	}
	if (PassportSC.cookie.service[pdt] != 0) {
		return PassportSC.cookie.service[pdt];
	}
	else {
		return false;
	}
}
var BlogCookieInfo = {
	cookie: {},
	parseCookie: function() {
		if (!getCookie('bloginfo')) {return false;}
		var bloginfo = getCookie('bloginfo').split('|');
		
		if (bloginfo[0]) {
			this.cookie.P = bloginfo[0];	//	xbase64之后的passport
		}
		if (bloginfo[1]) {
			this.cookie.I = bloginfo[1];	//	在博客中的编号
		}
		if (bloginfo[2]) {
			this.cookie.ud = bloginfo[2];	//	短域名
		}
		if (bloginfo[3]) {
			this.cookie.B_TP = bloginfo[3];	//	用户类型
		}
		if (bloginfo[4]) {
			this.cookie.name = unescape(bloginfo[4]);	//	博客名称
		}
		if (bloginfo[5]) {
			this.cookie.ico = bloginfo[5];	//	icon
		}
	},
	clear: function() {
		this.cookie = {};
	}
};
function hasBlog() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.I) {
		BlogCookieInfo.parseCookie();
	}
	var I = BlogCookieInfo.cookie.I;
    if (I!=null && I!="" && I!="null" && getUserType() != "3") {
        return I;
	}
	return false;
}
function getXP () {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.ud) {
		BlogCookieInfo.parseCookie();
	}
	return BlogCookieInfo.cookie.P;
}
function getD() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.ud) {
		BlogCookieInfo.parseCookie();
	}
	return BlogCookieInfo.cookie.ud;
}
function isMyBlog() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.I) {
		BlogCookieInfo.parseCookie();
	}
	if (isLogin() && hasBlog() && (typeof _ebi != 'undefined') && _ebi) {
		if (BlogCookieInfo.cookie.I == _ebi) {
			return true;
		}
	}
	return false;
}
// 0:old user, 1:plus! user, 2:updating user, 3:camp user
function getUserType() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.B_TP) {
		BlogCookieInfo.parseCookie();
	}
	return BlogCookieInfo.cookie.B_TP;
}
function getUserName() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.name) {
		BlogCookieInfo.parseCookie();
	}
	return BlogCookieInfo.cookie.name;
}
function getUserIco() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.ico) {
		BlogCookieInfo.parseCookie();
	}
	return BlogCookieInfo.cookie.ico;
}
function is17173User() {
	return (getP() && getP().indexOf('@17173') > 0);
}


function getBlogTitle() {
	if (!$('blogTitle')) {return null;}
	return ($('blogTitle').lastChild.innerHTML);
}
function getBlogLink() {
	if (!$('blogTitle')) {return null;}
	return ($('blogTitle').lastChild.href);
}
function getBlogDesc() {
	if (!$('blogDesc')) {return null;}
	return ($('blogDesc').innerHTML);
}

var User = {
  getXpt: getXP,
  isAdmin: isMyBlog
}

/***********************************************************************************************/


var ChinarenFeed = Class.create({
	initialize: function(options) {
		this.setOptions(options);
	},
	
	/**
	 * 设置选项
	 */
	setOptions: function(options) {
	  this.options = Object.extend({
	    size: 10,			//	显示数量
	    path: 'http://i.chinaren.com/feed/feedBlogAction.jsp?t=1&'	//	请求地址
	  }, options || {});
	},
	
	request: function() {
		//	向服务器保存数据
		var vn = '_jn_cr_feed';
		var url = this.options.path + 'name=' + vn + '&c=' + Time.now();
		new Groj(url, {
			variable: vn,
			onSuccess: this.getResponse.bind(this),
			onFailure: this.noGetResponse.bind(this)
		});
	},
	
	getResponse: function(json) {
		if (!json || json.status != 0) {
			this.noGetResponse(json);
		} else {
			this.showList(json.data);
		}
	},
	
	noGetResponse: function(obj) {
		$(this.options.listEl).innerHTML = !!obj && obj.statusText ? obj.statusText : '不能取得数据';
	},
	
	showList: function(data) {
		var arr = [];
		if (data && data.length) {
			var types = ChinarenFeed.types;
			for (var i=0; i<data.length; i++) {
				var di = data[i];
				if (!di) continue;
				
				arr.push('<div class="item"><div class="blogIco">');
				arr.push('<a href="' + di.link + '" title="' + di.nick + '" target="_blank"><img class="v32img" src="' + di.ico + '" title="' + di.nick + '" alt="' + di.nick + '" /></a>');
				arr.push('</div><div class="content"><dl><dt>');
				arr.push('<a href="' + di.link + '" title="' + di.nick + '" target="_blank">' + di.nick + '</a>&nbsp;');
				arr.push((types[di.type] || '') + '&nbsp;' + di.title + '<small>' + Time.friendly(di.ctime));
				arr.push('</small></dt><dd>');
				arr.push(di.desc || ' ');
				arr.push('</dd></dl></div></div>');
			}
		}
		if (arr.length == 0) {
			arr.push('暂无同学动态'); 
		}
		var listEl = $(this.options.listEl);
		listEl.innerHTML = arr.join('');
		setTimeout(function(el) {
			listEl.select('a').each(function(it) {
				it.target = '_blank';
			});
		}, 0);
	}
});

ChinarenFeed.types = {
	'1001': '的近况',
	'1002': '更新了',
	
	'1101': '发留言',
	'1102': '上传了照片',
	'1103': '共享了文件',
	'1104': '上传了视频',
	'1105': '回复了',
	'1107': '评论了',
	'1108': '圈了',
	'1109': '评论了',
	
	'1201': '发起投票',
	'1202': '申请加入',
	'1203': '加入咱班了，欢迎！',
	'1206': '成为咱班的管理员'
}

/**
 * @param {Object} options 选项（必填项），其包括如下属性：
 * 		listEl: 列表对象
 */
ChinarenFeed.init = function(options) {
  var feed = new ChinarenFeed(options);
  feed.request();
  return feed;
}
/**
 * 时间戳
 */
function timeStamp(){
	var now=new Date();
	return(now.getTime());
}
