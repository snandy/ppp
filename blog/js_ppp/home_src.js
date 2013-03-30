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
			if (menu[i].n == "��ֽ��") {
				menu[i].n = "����Сֽ��";
				menu[i].t = "�� $NICK ��Сֽ��";
			}
			if (menu[i].n == "��Ϊ����") {
				menu[i].n = "��ΪСֽ������";
				menu[i].t = "�� $NICK ΪСֽ������";
			}
		}
	},
	cm_menu: [
		{
			id: "poke", 
			n: "�������к�",
			t: "�������к�",
			c: function(cm) {
				if (typeof(pokeHe) == 'function') pokeHe(cm._id);
				else window.open('http://poke.blog.sohu.com/pop/poking.do?actId=1&pp='+cm._id, '_blank', 'width=630,height=470');
			}
		}
	]
};

/***********************************************************************************************/

/**
 * ��ʾPP�����б�
 */
/*
var PP = {}
PP.Comment = {
	
	//	��ʾ����ǰ�û�����������
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
					str = '����Ƭ��ַ�������ѣ���������˵Щʲô��';
				} else {
					str = '<ul>' + str + '</ul>';
				}
				$(ele).innerHTML = str;
			}, 
			onFailure: function() {
				$(ele).innerHTML = '����Ƭ��ַ�������ѣ���������˵Щʲô��';
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
		["[moved]",		"12.gif",	"�ж�"	],
		["[smile]",		"3.gif",	"��Ц"	],
		["[suprise]",	"22.gif",	"���"	],
		["[sweet]",		"36.gif",	"��ܰ"	],
		["[cool]",		"34.gif",	"��"	],
		["[end]",		"32.gif",	"ˬ"	],
		["[powerful]",	"33.gif",	"ǿ"	],
		["[admire]",	"35.gif",	"��"	]
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
 * ��ʾV�����б�
 */
/*
var V = {}
V.Comment = {
	
	//	��ʾ����ǰ�û�����������
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
						str = '����ÿ�����Ƶ������һ��٩٩��';
					} else {
						str = '<ul>' + str + '</ul>';
					}
				} else {
					str = '����ÿ�����Ƶ������һ��٩٩��';
				}
				$(ele).innerHTML = str;
			}, 
			onFailure: function() {
				$(ele).innerHTML = '����ÿ�����Ƶ������һ��٩٩��';
			}
		});
	}
}
*/

/***********************************************************************************************/

/**
 * ��ʾ����ÿ�
 * 
 * @base prototype jQuery Groj blog/Blog
 */

var Refer = {
	init: function(ctr) {
		this.ctrJ = J(ctr);
		this.ctrJ.html('������...');
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
		this.ctrJ.html('�����İɣ���û���˷�����Ŷ��<a href="http://blog.sohu.com/morefreshblogs.html" target="_blank">��ȥ�ʹ�Ҵ���к��ɣ�</a>');
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
		//	���˵����������Լ������
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
 * �йز��͵�һЩ����
 * 
 * @base prototype groj
 */

var Blog = {};

/**
 * ΪBlog����һЩ�й�ͨ����������ȡ���û���Ϣ�ķ���
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
 * ΪBlog����һЩȡ�õ�ǰ������Ϣ��һЩ����
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
 * ΪBlog����һЩȡ�õ�ǰ�����û�����Ϣ
 */
Object.extend(Blog, {
	getDomain: function() {
		return _blog_domain;
	}
});

/**
 * ΪBlog����һЩ��Ϊ�������ӵķ���
 */
Object.extend(Blog, {
	addToFav: function(from) {
		var _title = Blog.getTitle();
		var _desc = Blog.getDesc();
		var _link = Blog.getLink();
		if (!_title || !_link) {
			alert('�޷���ô�վ����Ӧ����');
			return;
		}
		if (ToolBar) {
			ToolBar.disableBtn(ToolBar.addLink);
		}
		LoadBar.show('��ȡ��...');
		
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
			case 0:	//	�ɹ�
				LoadBar.show('�Ѽ�Ϊ����','ok');
				break;
			case 3:	//	�ظ����
				LoadBar.show('�Ѽ�Ϊ����','ok');
				break;
			default: //	����ʧ����Ϣ
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
 * �й��û���һЩ����
 * 
 * @base common/cookie.js common/base64.js
 */


//	�жϵ�ǰ�û��Ƿ��Ѿ���½��passport
function isPPLogin() {
	var passportP;
	if (typeof PassportSC != 'undefined' && (passportP = getPPP())) {
		return true;
	}
	return false;
}
//	�жϵ�ǰ�û��Ƿ��Ѿ���¼�˲��ͣ��Ѿ���¼��passport���в����ҵ�¼�˲��ͣ�
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
//	ȡ�õ�ǰ�����û���passport��δ����passport�ģ�
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
//	��ȡ��ǰ��½�û�������passport
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
			this.cookie.P = bloginfo[0];	//	xbase64֮���passport
		}
		if (bloginfo[1]) {
			this.cookie.I = bloginfo[1];	//	�ڲ����еı��
		}
		if (bloginfo[2]) {
			this.cookie.ud = bloginfo[2];	//	������
		}
		if (bloginfo[3]) {
			this.cookie.B_TP = bloginfo[3];	//	�û�����
		}
		if (bloginfo[4]) {
			this.cookie.name = unescape(bloginfo[4]);	//	��������
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
	 * ����ѡ��
	 */
	setOptions: function(options) {
	  this.options = Object.extend({
	    size: 10,			//	��ʾ����
	    path: 'http://i.chinaren.com/feed/feedBlogAction.jsp?t=1&'	//	�����ַ
	  }, options || {});
	},
	
	request: function() {
		//	���������������
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
		$(this.options.listEl).innerHTML = !!obj && obj.statusText ? obj.statusText : '����ȡ������';
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
			arr.push('����ͬѧ��̬'); 
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
	'1001': '�Ľ���',
	'1002': '������',
	
	'1101': '������',
	'1102': '�ϴ�����Ƭ',
	'1103': '�������ļ�',
	'1104': '�ϴ�����Ƶ',
	'1105': '�ظ���',
	'1107': '������',
	'1108': 'Ȧ��',
	'1109': '������',
	
	'1201': '����ͶƱ',
	'1202': '�������',
	'1203': '�����۰��ˣ���ӭ��',
	'1206': '��Ϊ�۰�Ĺ���Ա'
}

/**
 * @param {Object} options ѡ��������������������ԣ�
 * 		listEl: �б����
 */
ChinarenFeed.init = function(options) {
  var feed = new ChinarenFeed(options);
  feed.request();
  return feed;
}
/**
 * ʱ���
 */
function timeStamp(){
	var now=new Date();
	return(now.getTime());
}
