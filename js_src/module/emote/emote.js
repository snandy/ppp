/**
 * Emote 表情类
 * @author Jady
 * @modifier Springwang 2008-07-02 增加动态表情预览
 **/

var Emote = Class.create();

Emote.prototype = {
	
	initialize: function(options) {
		this.setOptions(options);
		this.build();
		this.initElements();
		this.initEvents();
		this.active();
	}, 
	
	setOptions: function(options) {
		this.options = Object.extend({
			parent: document.body,
			matrix: {
				"20": [22, 3],
				"42": [12, 2]
			},
			output: 'ubb',
			callback: Prototype.emptyFunction,
			active: getCookie('emote') || 'base'
		}, options || {});
		this.options.parent = $(this.options.parent);
	},
	
	//	创建整个结构
	build: function() {
		var data = Emote.Data;
		var arr = [];
		arr.push('<div class="emotionBox"><div class="emotionBar">');
		var tabK;
		for (tabK in data) {
			var tab = data[tabK];
			if (typeof(tab) != "object" || !tab.ubb) continue;
			var img = Emote._getImg(tab.ubb, tabK);
			// -------------增加了【 eType="'+tab.type+'" 】用来标识表情类型，以便识别是否需要预览------------------
			arr.push('<span eType="'+tab.type+'" data_key="' + tabK + '"><img align="absmiddle" src="' + img.url + '" alt="' + tab.alt + '" width="20" height="20" />&nbsp;' + tab.title + '</span>');
		}
		arr.push('</div><div style="clear:both;"></div><div class="basicEm"><div class="emotionBody clearfix"></div><div class="emotionNav"></div></div></div>');
		
		this.options.parent.innerHTML = arr.join('');
	},
	
	//	取得常用的元素
	initElements: function() {
		this.tabCtr = $(this.options.parent.firstChild.firstChild);
		var tmpEl = this.tabCtr.nextSibling.nextSibling;
		this.bodyCtr = $(tmpEl.firstChild);
		this.pageCtr = $(tmpEl.lastChild);
	},
	
	//	绑定相应元素的事件
	initEvents: function() {
		/*
		this.tabCtrHandler = this.onTabCtr.bindAsEventListener(this);
		this.bodyCtrHandler = this.onBodyCtr.bindAsEventListener(this);
		this.pageCtrHandler = this.onPageCtr.bindAsEventListener(this);
		this.tabCtr.observe('click', this.tabCtrHandler);
		this.bodyCtr.observe('click', this.bodyCtrHandler);
		this.pageCtr.observe('click', this.pageCtrHandler);
		*/
		Event.observe(this.tabCtr, 'mouseup', this.onTabCtr.bindAsEventListener(this));
		Event.observe(this.bodyCtr, 'mouseup', this.onBodyCtr.bindAsEventListener(this));
		// ----------------------下面两个时间绑定用来实现动态图标的预览效果-----------------------------
		Event.observe(this.bodyCtr, 'mouseover', this.showPreview.bindAsEventListener(this));
		Event.observe(this.bodyCtr, 'mouseout', this.hidePreview.bindAsEventListener(this));
		//-----------------------------------------------------------------------------------
		Event.observe(this.pageCtr, 'mouseup', this.onPageCtr.bindAsEventListener(this));
	},
	
	
	/*
	destroy: function() {
		this.tabCtr.stopObserving('click', this.tabCtrHandler);
		this.bodyCtr.stopObserving('click', this.bodyCtrHandler);
		this.pageCtr.stopObserving('click', this.pageCtrHandler);
	},
	*/
	
	//	单击tab bar的处理方法
	onTabCtr: function(e) {
		var el = Event.element(e);
		if (el == this.tabCtr) return false;
		
		do {
			if (el.parentNode && el.parentNode == this.tabCtr) break;
		} while(el = el.parentNode)
		
		if (!el.className || el.className != "active") {
			this.options.active = el.getAttribute('data_key');
			this.bodyCtr.innerHTML = '加载中';
			this.pageCtr.innerHTML = '';
			this.active();
			setCookie('emote', this.options.active, 'never', '/', document.location.href.indexOf("blog.sohu.com") != -1 ? 'blog.sohu.com' : document.domain);
			if (this.options.stat) CA.a('emotion_' + this.options.stat + '_' + this.options.active);
		}
		
		Event.stop(e);
		return false;
	},
	// ---------------------以下三个方法用来实现动态图标的预览-----------------------------
	// 显示gif动画的预览层
	showPreview: function(e){
		// 判断当前表情的类型，“3”标识需要预览的图标
		if(this.activeTab.getAttribute('eType') == 3){
			if(!this.pLayer || !$('ePreLayer')){
				$(this.bodyCtr).setStyle({'position':'relative'});
				this.pPos = Dom.getRect(this.bodyCtr);
				this.pLayer = $(document.createElement('div'));
				this.pLayer.setAttribute('id','ePreLayer');
				this.pLayer.setStyle({'position':'absolute','border':'solid 1px #f00','width':'70px','height':'70px'});
				this.bodyCtr.appendChild(this.pLayer);
			}
			//if(e.clientX)
			this.pLayer.setStyle({'left':'-85px','top':'0px'});
			this.showPreIcon(e);
		}
	},
	// 显示ICON
	showPreIcon: function(e){
		var el = Event.element(e);
		if (el == this.bodyCtr) return false;
			
		do {
			if (el.parentNode && el.parentNode == this.bodyCtr) break;
		} while(el = el.parentNode)
		
		var ubb = el.getAttribute("data_ubb");
		var path = this.options.active;
		if (ubb && path) {
			this.pLayer.innerHTML = '<img src="'+Emote._getImg(ubb, path).url+'" />';
			this.pLayer.show();
		}
		
	},
	// 隐藏gif动画的预览层
	hidePreview: function(e){
		if(this.pLayer)
			this.pLayer.hide();
	},
	//---------------------------------------------------------------------------------
	
	//	单击body区域的处理方法
	onBodyCtr: function(e) {
		var el = Event.element(e);
		if (el == this.bodyCtr) return false;
		
		do {
			if (el.parentNode && el.parentNode == this.bodyCtr) break;
		} while(el = el.parentNode)
		
		var ubb = el.getAttribute("data_ubb"), ubbS = ubb;
		var path = el.getAttribute("data_path");
		//if(this.activeTab.getAttribute('eType') == 3)
			//path = Emote.Data[this.options.active].src;
		if (ubb && path) {
			var more = '';
			if (this.options.output == 'url') {
				var obj = Emote._getImg(ubb, path);
				ubb = obj.url;
				more = obj.title;
			} else {
				if (path != "base") ubb = "{" + path + '}' + ubb;
				ubb = '[' + ubb + ']';
			}
			this.options.callback(ubb, more);
			if (this.options.stat) {
				CA.a('emotion_' + this.options.stat + '_' + path + '_' + (Emote.Ubbs[ubbS] && Emote.Ubbs[ubbS][0]));
			}
		}
		
		Event.stop(e);
		return false;
	},
	
	//	单击页码区域的处理方法
	onPageCtr: function(e) {
		var el = Event.element(e);
		if (el == this.pageCtr) return false;
		
		do {
			if (el.parentNode && el.parentNode == this.pageCtr) break;
		} while(el = el.parentNode)
		
		var page = el.getAttribute("data_page");
		if (page) {
			this.page(parseInt(page));
		}
		
		Event.stop(e);
		return false;
	},
	
	//	显示某种类型下的表情
	active: function() {
		//	设置tab是否激活
		var childs = this.tabCtr.childNodes;
		for (var i=0; i<childs.length; i++) {
			if (childs[i].getAttribute('data_key') == this.options.active) {
				childs[i].className = 'active';
				// --------增加了一个属性，标识当前的活动tab-----------------
				this.activeTab = childs[i];
			} else {
				childs[i].className = '';
			}
		}
		
		//	显示列表数据
		this.page();
	},
	
	//	显示第几个的列表数据，如果没有传入index参数，那就显示第一个页，1表示第一页
	page: function(index) {
		if (typeof(index) != 'number') index = 1;
		
		var active = this.options.active,
				emoteObj = Emote.Data[active],
				ubbs = emoteObj.data;
		
		var matrix = this.options.matrix[emoteObj.size],
				cols = matrix[0],
				rows = matrix[1];
				if (this.options.output != 'url')
					rows = Math.ceil(emoteObj.data.length / cols);
		var		size = cols * rows,
				start = (index - 1) * size,
				count = ubbs.length,
				end = Math.min(count, index * size),
				pageCount = Math.ceil(count / size);
				
		
		//	输出表情列表
		var arr = [];
		var path = active;
		if(emoteObj.thumb)
			path = emoteObj.thumb;
		for (var i=start; i<end; i++) {
			if (i != 0 && i%cols == 0) arr.push('<div style="clear:both;"></div>');
			if(emoteObj)
			var imgObj = Emote._getImg(ubbs[i], path);
			arr.push('<a href="javascript:void(0);" data_ubb="' + ubbs[i].replace('"', '\\"') + '" data_path="' + active + '"><img src="' + imgObj.url + '" alt="' + imgObj.title + '" title="' + imgObj.title + '" /></a>');
		}
		this.bodyCtr.innerHTML = arr.join('');
		
		//	输出翻页代码
		arr = [];
		if (pageCount > 1) {
			arr.push(index + '/' + pageCount + '&nbsp;&nbsp;&nbsp;&nbsp;');
			if (index > 1) {
				arr.push('<a href="javascript:void(0);" data_page="' + (index - 1) + '">');
			}
			arr.push('上一页');
			if (index > 1) {
				arr.push('</a>');
			}
			arr.push('&nbsp;&nbsp;&nbsp;&nbsp;');
			if (index < pageCount) {
				arr.push('<a href="javascript:void(0);" data_page="' + (index + 1) + '">');
			}
			arr.push('下一页');
			if (index < pageCount) {
				arr.push('</a>');
			}
		}
		this.pageCtr.innerHTML = arr.join('');
	}
}

/**
 * Emote的配置信息，比如表情地址等
 */
Emote.Config = {
	imgPath: 'http://js3.pp.sohu.com.cn/ppp/images/emotion/'
}

/**
 * Emote的表情信息
 */
Emote.Data = {
	base: {
		title: '基本',			//	tab bar上的标题
		ubb: ':)',					//	tab bar显示的ubb表情
		alt: '基本表情',		//	tab bar上的alt
		size: '20',				//	tab中表情的大小
		type: 1,					//	1表示旧的格式，2表示新的格式（静态，不需要预览），3表示新的（动态需要预览）
		data: [
			":)",				"#_#",			"8*)",					":D",				":-)",			":P",					"B_)",					"B_I",
			"^_*",			":$",				":|",						":(",				":.(",			":_(",				"):(",					":V",
			"*_*",			":^",				":?",						":!",				"=:|",			":%",					":O",						":X",
			"|-)",			":Z",				":9",						":T",				":-*",			"*_/",				":#|",					":69",
			"//shuang",	"//qiang",	"//ku",					"//zan",		"//heart",	"//break",		"//F",					"//W",
			"//mail",		"//strong",	"//weak",				"//share",	"//phone",	"//mobile",		"//kiss",				"//V",
			"//sun",		"//moon",		"//star",				"(!)",			"//TV",			"//clock",		"//gift",				"//cash",
			"//coffee",	"//rice",		"//watermelon",	"//tomato",	"//pill",		"//pig",			"//football",		"//shit"
		]
	},
	
	s: {
		title: '狐狐',
		ubb: '8*)',
		alt: '狐狐表情',
		size: '42',
		type: 2,
		data: [
			"//pig",				"//heart",			"B_I",					"snt",				"=:|",			"8*)",					"elv",					"nob",
			":D",			"lny",				":_(",						"rdf",				":9",			":|",				"//shit",					"ctm",
			"plg",			":Z",				":#|",						":?",				"ft",			"//zan",					"epd",						"//share",
			":$",			"drk",				"brs",						"//rice",				"bra",			"spk",				"//clock",					"xms",
			"bsk",	"flw",	"ber",					"cak",		"chr",	"oly",		"tor",					"up"
		]
	},
	
	b: {
		title: '柏夫',
		ubb: 'T[:.(]',// 修改了tab上显示的ICON，改为单独使用一个20的图标来表示
		alt: '柏夫表情',
		size: '42',
		type: 3,
		thumb:'b/t',// ---------标识缩略图的目录--------------
		data: [
			"hi",				"ok",			"fco",					":T",				":D",			"):(",					":!",					"bet",
			"ft",			"gdn",				"#_#",						"=:|",				"sof",			":.(",				"nob",					"glw",
			"thd",			"pas",				":?",						"mop",				"b4",			"^_*",					":(",						"up",
			"agi",			"soy",				"stg",               "bj",                  "cmp",                         "bdn",                        "fbi",           "skt",
			"wuy",           "olc"
		]
	}
}

Emote.Ubbs = {
	":)": ["smile", "微笑"], 
	"#_#": ["flatter", "谄媚" ],
	"8*)": ["titter", "偷笑" ], 
	":D": ["spit", "大笑" ],
	":-)": ["shame", "害羞" ], 
	":P": ["naughty", "调皮" ],
	"B_)": ["complacent", "得意" ], 
	"B_I": ["cool", "耍酷" ],
	"^_*": ["lash", "讽刺" ], 
	":$": ["complaint", "委屈" ],
	":|": ["gloomy", "郁闷" ], 
	":(": ["sorry", "难过" ],
	":.(": ["weep", "泪奔" ], 
	"T[:.(]": ["weep_tab", "泪奔" ], 
	":_(": ["cry", "大哭" ],
	"):(": ["detonate", "发火" ], 
	":V": ["curse", "咒骂" ],
	"*_*": ["muzzy", "发呆" ], 
	":^": ["misunderstand", "不懂" ],
	":?": ["haze", "疑惑" ], 
	":!": ["surprise", "吃惊" ],
	"=:|": ["perspire", "流汗" ], 
	":%": ["embarrassed", "尴尬" ],
	":O": ["fright", "惊恐" ], 
	":X": ["stopper", "闭嘴" ],
	"|-)": ["yawn", "犯困" ], 
	":Z": ["sleep", "睡觉" ],
	":9": ["greedy", "馋" ], 
	":T": ["puke", "吐" ],
	":-*": ["whisper", "耳语" ], 
	"*_/": ["pirate", "海盗" ],
	":#|": ["bandage", "重伤" ], 
	":69": ["hug", "拥抱" ],
	"//shuang": ["comfortably", "爽" ], 
	"//qiang": ["strong", "强" ],
	"//ku": ["cool2", "酷" ], 
	"//zan": ["good", "赞" ],
	"//heart": ["heart", "红心" ], 
	"//break": ["hearted", "心碎" ],
	"//F": ["blow", "花开" ], 
	"//W": ["fade", "花谢" ],
	"//mail": ["mail", "邮件" ], 
	"//strong": ["fine", "手势-棒" ],
	"//weak": ["bad", "手势-逊" ], 
	"//share": ["share", "握手" ],
	"//phone": ["phone", "电话" ], 
	"//mobile": ["mobile", "手机" ],
	"//kiss": ["lip", "嘴唇" ], 
	"//V": ["victory", "V" ],
	"//sun": ["sun", "太阳" ], 
	"//moon": ["moon", "月亮" ],
	"//star": ["star", "星星" ], 
	"(!)": ["bulb", "灯泡" ],
	"//TV": ["tv", "电视" ], 
	"//clock": ["clock", "闹钟" ],
	"//gift": ["gift", "礼物" ], 
	"//cash": ["cash", "现金" ],
	"//coffee": ["coffee", "咖啡" ], 
	"//rice": ["dining", "饭" ],
	"//watermelon": ["watermelon", "西瓜" ], 
	"//tomato": ["tomato", "番茄" ],
	"//pill": ["pill", "药丸" ], 
	"//pig": ["pig", "猪头" ],
	"//football": ["football", "足球" ], 
	"//shit": ["shit", "便便" ],
	"snt": ["snot", "鼻涕"],
	"elv": ["elvis", "猫王"],
	"nob": ["nostbleed", "鼻血"],
	"lny": ["loney", "坏笑"],
	"rdf": ["redflag", "红旗"],
	"ctm": ["contemn", "蔑视"],
	"plg": ["plunger", "搋子"],
	"ft": ["faint", "晕"],
	"epd": ["explode", "爆炸"],
	"drk": ["drink", "饮料"],
	"brs": ["brushing", "刷牙"],
	"bra": ["bra", "胸罩"],
	"spk": ["speaker", "喇叭"],
	"xms": ["xmas", "圣诞"],
	"bsk": ["basketball", "篮球"],
	"flw": ["floweret", "小花"],
	"ber": ["beer", "啤酒"],
	"cak": ["cake", "蛋糕"],
	"chr": ["cheer", "加油"],
	"oly": ["olympic", "奥运"],
	"tor": ["torch", "火炬"],
	"up": ["up", "顶"],
	"agi": ["agitation", "咱聊聊啊"],
	"b4": ["b4", "鄙视"],
	"bet": ["beat", "扁人"],
	"fco": ["faceoff", "变脸"],
	"glw": ["gallow", "我吓死你"],
	"gdn": ["goodnight", "晚安"],
	"hi": ["hi", "HI"],
	"mop": ["mop", "鬼脸"],
	"ok": ["ok", "OK"],
	"pas": ["pass", "路过"],
	"glw": ["gallow", "我吓死你"],
	"sof": ["sofa", "沙发"],
	"soy": ["soysauce", "打酱油"],
	"stg": ["struggle", "努力"],
	"thd": ["thunder", "被雷到了"],
	"bj": ["beijing", "北京欢迎您"],
	"cmp": ["champion", "冠军"],
	"bdn": ["birdnest", "鸟巢"],
	"fbi": ["feibi", "加油哦"],
	"skt": ["skate", "滑冰"],
	"wuy": ["wuying", "无影手"],
	"olc": ["olymcheer", "奥运加油"]
}

/**
 * 通过一个ubb取得一个图片的信息
 * @param {String} ubb ubb标识符，比如是一个完整的标识符
 * @type Object
 * @return 返回取得的表情的图片信息，不正确的话返回null，其有两个属性:
 * 		url表示表情的地址，title表示表情的说明
 */
Emote.getImg = function(ubb) {
	if (!ubb || ubb.length < 3 || ubb.charAt(0) != '[' || ubb.charAt(ubb.length-1) != ']') return null;
	
	var start = 1,
			end = ubb.length - 1,
			path = 'base';
			
	if (ubb.charAt(1) == '{') {
		var index = ubb.indexOf('}', 1);
		if (index < 3) return null;
		start = index + 1;
		path = ubb.substring(2, index);
	}
	
	ubb = ubb.substring(start, end);
	
	return this._getImg(ubb, path);
}

/**
 * 通过情的图片地址取得这个表情的ubb代码
 * @param {String} url 表情的图片地址
 * @type String
 * @return 表情的ubb代码
 */
Emote.getUbb = function(url) {
	if (url.indexOf(this.Config.imgPath) != 0) return null;
	
	var start = this.Config.imgPath.length;
	var end = url.indexOf('/', start);
	if (end < 0) return null;
	
	var path = url.substring(start, end);
	
	start = end + 1,
	end = url.indexOf('.', start);
	if (end < 0) return null;
	var ubb = url.substring(start, end);
	
	if (path != 'base') {
		ubb = '{' + path + '}' + ubb;
	}
	
	return '[' + ubb + ']';
}

Emote._getImg = function(ubb, path) {
	var item = this.Ubbs[ubb];
	return {
		url: this.Config.imgPath + path + '/' + item[0] + '.gif',
		title: item[1]
	}
} 

/**
 * @param {Object} options 配置属性
 * 		parent : HTMLElement, 父对象
 * 		matrix : Object, 格式为:
 * 				{"20": [20, 10],	//	表示20大小的表情，一行显示20个，显示10行
 * 				 "42": [10, 5]}		//	表示42大小的表情，一行显示10个，显示5行
 * 		output : String, 输出类型，ubb表示直接为ubb代码，如果为url表示为表情的地址
 * 		callback : Function, 点击了表情之后的回调方法，系统会把用户点击的表情作为第一个参数注入，同时会把一些辅助信息当作第二个参数注入
 */
Emote.init = function(options) {
	return new Emote(options);
}