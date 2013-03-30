function isLoginBlogUser() {
	return (isLogin() && hasBlog() && getUserType() != 3);
}

function isLoginNotActived() {
	return ((isLogin() && !hasBlog()) || (isLogin() && getUserType() == 3) );
}

function notLogin() {
	return (!isLogin());
}

function is17173User() {
	return (getP().indexOf('@17173') > 0);
}
ToolBar = {
	initialize: function() {
		this.build();
		this.bindObserve();
	},
	build: function() {
		if (!$('tool-bar')) return;
		if (is17173User()) {
			$('sohu-blog-logo').innerHTML = this.get17173Logo();
		}
		if ($('user-tools')) {
			$('user-tools').innerHTML = this.getUserTools();
		}
		if ($('sys-tools')) {
			$('sys-tools').innerHTML = this.getSysTools();
		}
	},
	bindObserve: function() {
		if ($('tool-bar-mngArrow')) {
			this.mngArrow = $('tool-bar-mngArrow');
			Event.observe(this.mngArrow, 'mouseover', function() {
				Element.addClassName(this.mngArrow, 'navSysArrow-over');
			}.bindAsEventListener(this));
			Event.observe(this.mngArrow, 'mouseout', function() {
				Element.removeClassName(this.mngArrow, 'navSysArrow-over');
			}.bindAsEventListener(this));
			Event.observe(this.mngArrow, 'click', Event.stop.bindAsEventListener(this));
			Event.observe(this.mngArrow, 'click', this.showMngOpr.bindAsEventListener(this));
		}
		if ($('tool-bar-addLink')) {
			this.addLink = $('tool-bar-addLink');
			Event.observe(this.addLink, 'click', Event.stop.bindAsEventListener(this));
			Event.observe(this.addLink, 'click', function() {
				addToFav();
				this.addLink.blur();
			}.bindAsEventListener(this));
		}
		if (notLogin() && $('tool-bar-login')) {
			this.loginBtn = $('tool-bar-login');
			Event.observe(this.loginBtn, 'click', Event.stop.bindAsEventListener(this));
			Event.observe(this.loginBtn, 'click', function() {
				if (isLogin()) {
					location.reload();
				}
				else if (isPPLogin()) {
					location.href = '/login/logon.do?bru='+ location.href;
				}
				else {
					this.showLogin();
					setTimeout(this.loadLoginJs.bind(this), 10);
					this.loginBtn.blur();
				}
			}.bindAsEventListener(this));
		}
		if (isLoginBlogUser() && $('tool-bar-passport')) {
			this.psptBtn = $('tool-bar-passport');
			Event.observe(this.psptBtn, 'mouseover', function() {
				Element.addClassName(this.psptBtn, 'psptMail-over');
			}.bindAsEventListener(this));
			Event.observe(this.psptBtn, 'mouseout', function() {
				Element.removeClassName(this.psptBtn, 'psptMail-over');
			}.bindAsEventListener(this));
			Event.observe(this.psptBtn, 'click', Event.stop.bindAsEventListener(this));
			Event.observe(this.psptBtn, 'click', function() {
				if (isLogin()) {
					this.psptCard();
				}
				else {
					if(confirm('您还没有登录，是否现在登录？')) {
						location.href = '/login/logon.do';
					}
				}
			}.bindAsEventListener(this));
			
			this.sohuMsgBtn = $('tool-bar-sohuMsg');
			if (this.sohuMsgBtn) {
				Event.observe(this.sohuMsgBtn, 'mouseover', function() {
					Element.addClassName(this.sohuMsgBtn, 'sohuMsg-over');
				}.bindAsEventListener(this));
				Event.observe(this.sohuMsgBtn, 'mouseout', function() {
					Element.removeClassName(this.sohuMsgBtn, 'sohuMsg-over');
				}.bindAsEventListener(this));
				Event.observe(this.sohuMsgBtn, 'click', Event.stop.bindAsEventListener(this));
				Event.observe(this.sohuMsgBtn, 'click', function() {
					window.open('http://me.sohu.com');
				}.bindAsEventListener(this));
			}
		}
	},
	get17173Logo: function() {
		return ('<a href="http://blog.17173.com" target="_blank"><img src="http://js.pp.sohu.com/ppp/blog/styles_ppp/images/logo17173.gif" alt="17173博客" align="absmiddle" /></a>');
	},
	getUserTools: function() {
		var str = '';
		if (isLoginBlogUser()) {
			if (isMyBlog()) {
				if (location.pathname.indexOf('/manage/') >= 0 ) {
					var _mngPvTxt = "查看我的博客";
					var _mngPvLnk = _blog_base_url;
				}
				else {
					var _mngPvTxt = "管理我的博客";
					var _mngPvLnk = "http://blog.sohu.com/manage/main.do";
				}
			}
			else {
				var _mngPvTxt = "查看我的博客";
				var _mngPvLnk = 'http://'+getD()+'.blog.sohu.com';
			}
			if (typeof gw != 'undefined' && gw) {
				var w = gw();
				str += '<div style="background:#eee;padding:3px 3px 0;cursor:default;" title="现在心情如何？或许可以写篇日志记录一下～">'+ w +'</div>';
			}
			var _p = getP();
			if (is17173User()) {
				_p = _p.substring(0, _p.indexOf('@17173'));
			}
			//str += '<div>';
			str += '<span class="psptMail" id="tool-bar-passport"><strong title="欢迎您 '+ _p +'">'+ _p +'</strong><span>&nbsp;</span></span>|';
			if (Browser.ua.indexOf('ie')<0) {
				str += '<span class="sohuMsg" id="tool-bar-sohuMsg" title="小纸条">&nbsp;</span>|';
			}else{
				str += '<span class="sohuMsgFlash"><embed src="http://images.chinaren.com/product/webim/mood/mood_blog.swf?UserID='+ getP() +'" wmode="transparent" quality="high" pluginspage="htt p://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" menu="-1" /></span>|';
			}
			str += '<a href="'+ _mngPvLnk +'" title="'+ _mngPvTxt +'" id="tool-bar-mng">'+ _mngPvTxt +'</a>';
			str += '<span class="navSysArrow" id="tool-bar-mngArrow"><span>&nbsp;</span></span>|';
			//str += '</div>';
			str += '<a href="http://blog.sohu.com/manage/entry.do?m=add&t=shortcut" title="撰写新日志" target="_blank">撰写新日志</a>|';
			var _blogTitle = (getBlogTitle())? " "+getBlogTitle()+" ":"此站点";
			str += '<a id="tool-bar-addLink" href="javascript:void(0)" title="将'+ _blogTitle +'加为我的好友">加为好友</a>';
	
		}
		if (isLoginNotActived()) {
			//str += '<div>';
			str += '<span title="欢迎您 搜狐网友">欢迎您 搜狐网友</span>|';
			str += '<a href="/login/activation.do" title="您还没有激活博客，请先激活">立即激活博客</a>';
			//str += '</div>';
			//str += '|<a href="http://blog.sohu.com/manage/entry.do?m=add&t=shortcut" title="撰写新日志" target="_blank">撰写新日志</a>';
		}
		if (notLogin()) {
			str += '<a id="tool-bar-login" href="javascript:void(0)" title="登录">登录</a>|';
			str += '<a href="/login/reg.do" title="注册">注册</a>|';
			str += '<a href="http://blog.sohu.com/manage/entry.do?m=add&t=shortcut" title="撰写新日志" target="_blank">撰写新日志</a>';
		}
		return str;
	},
	getSysTools: function() {
		var str = '';
		if (isLogin()) {
			str += '<a href="javascript:ToolBar.doLogout();" title="退出登录">离开</a> | ';
		}
		str += '<a href="http://blog.sohu.com/help.html" title="帮助" target="_blank">帮助</a>';
		return str;
	},
	showMngOpr: function() {
		if (!this.mngArrow) {return;}
		if (!this.mngOprMenu) {
			var opt4mngOpr = {
				menuData: [{
					title: null,
					active: true,
					data: [
						{
							text: '<img src="http://js.pp.sohu.com/ppp/blog/styles_ppp/images/ico_sys.gif" alt="弹出新窗口管理我的博客" /> 管理我的博客<img src="http://js.pp.sohu.com/ppp/blog/styles_ppp/images/ico_newwin.gif" />',
							title: '弹出新窗口管理我的博客',
							action: gotoBlog,
							value: null
						},
						{
							text: '<img src="http://js.pp.sohu.com/ppp/blog/styles_ppp/images/ico_pictureKey.gif" alt="弹出新窗口转到图片公园" /> 管理我的相册<img src="http://js.pp.sohu.com/ppp/blog/styles_ppp/images/ico_newwin.gif" />',
							title: '弹出新窗口转到图片公园',
							action: gotoPP,
							value: null
						},
						{
							text: '<img src="http://js.pp.sohu.com/ppp/blog/styles_ppp/images/ico_musicKey.gif" alt="弹出新窗口转到搜狗音乐盒" /> 管理我的音乐<img src="http://js.pp.sohu.com/ppp/blog/styles_ppp/images/ico_newwin.gif" />',
							title: '弹出新窗口转到搜狗音乐盒',
							action: gotoMusic,
							value: null
						}
					]
				}],
				title: null,
				clsBtn: false,
				autoCls: true,
				autoActive: false,
				btn: this.mngArrow,
				displace: [-80, 0],
				placeIn: $('divMenuBox'),
				zIndex: 1500,
				sDivCss: 'menuSub-div menuSub-div-newPage'
			};
			
			this.mngOprMenu = new WinMenu(opt4mngOpr);
		}
		if (!this.mngOprMenu.win.showing) {
			this.mngOprMenu.show();
		}
		else {
			this.mngOprMenu.hide();
		}
	},
	showLogin: function() {
		if (!this.loginBtn) {return;}
		if (!this.loginMenu) {
			var opt4login = {
				menuData: [{
					title: null,
					active: true,
					data: this.getLoginInnerDiv.bind(this)
				}],
				title: null,
				clsBtn: false,
				autoCls: true,
				autoActive: false,
				btn: this.loginBtn,
				displace: [0, 0],
				placeIn: $('divMenuBox'),
				zIndex: 1500,
				sDivCss: 'menuSub-div menu-div'
			};
			
			this.loginMenu = new WinMenu(opt4login);
			
			setTimeout(function(){
				PassportSC.campImg = 'http://www.sohu.com/passport/images/pic007_1.gif';
				PassportSC.campImgAlt = '奥运村';
				PassportSC.isShowRemPwdMsg = 0;
				PassportSC.drawPassport(this.loginInnerDiv)
			}.bind(this), 10);
		}
		if (!this.loginMenu.win.showing) {
			this.loginMenu.show();
			if (PassportSC.emailInput.value == "") {
				setTimeout(function () {PassportSC.emailInput.focus()}, 1);
			}
			else {
				setTimeout(function () {PassportSC.passwdInput.focus()}, 1);
			}
		}
		else {
			this.loginMenu.hide();
		}
	},
	getLoginInnerDiv: function() {
		var _div = document.createElement('div');
		this.loginInnerDiv = _div;
		_div.style.margin = '10px';
		_div.innerHTML = 'loading...';
		return _div;
	},
	loadLoginJs: function() {
		/*var head = document.getElementsByTagName("head")[0];
		var scripts = head.getElementsByTagName('script');
		var flag = false;
		for (var i=0; i<scripts.length; i++) {
			if (scripts[i].src.indexOf('loginJS') >= 0) {
				flag = true;
			}
		}
		if (!flag) {
			var script = document.createElement("script");
			script.src = '/loginJS?bru='+ location.href +'&show='+ timeStamp();
			head.appendChild(script);
		}*/
		//PassportSC.drawPassport(this.loginInnerDiv);

	},
	psptCard: function() {
		if (!this.psptBtn) {return;}
		if (!this.psptMenu) {
			var opt4pspt = {
				menuData: [{
					title: null,
					active: true,
					data: this.getPsptInnerDiv.bind(this)
				}],
				title: null,
				clsBtn: false,
				autoCls: false,
				autoActive: false,
				btn: this.psptBtn,
				displace: [-6, 0],
				placeIn: $('divMenuBox'),
				zIndex: 1500,
				
				onShow: this.psptCardShow.bind(this),
				onHide: this.psptCardHide.bind(this),
				
				sDivCss: 'menuSub-div psptCardMenu-div'
			};
			
			this.psptMenu = new WinMenu(opt4pspt);
			
			setTimeout(function(){
				PassportSC.campImg = 'http://www.sohu.com/passport/images/pic007_1.gif';
				PassportSC.campImgAlt = '奥运村';
				PassportSC.isShowRemPwdMsg = 0;
				PassportSC.drawPassport(this.psptInnerDiv);
				
				var clsBox = document.getElementsByClassName('pptRight', this.psptInnerDiv)[0];
				if (!clsBox) {return;}
				var str = '';
				str += '<table cellpadding="0" cellspacing="0"><tr><td>';
				str += '<input type="checkbox" id="paptClsOpt" value="1" '+ (getPref('psptCardHide')==1? 'checked="checked"':'') +' />';
				str += '</td><td>';
				str += '<label for="paptClsOpt" title="下次登录时默认隐藏搜狐通行证卡片">默认隐藏</label>';
				str += '</td><td>';
				str += '<img src="http://images.sohu.com/passport/v3/cardstyle/images/spacer.gif" alt="隐藏" title="隐藏" /></td></tr></table>';
				clsBox.innerHTML = str;
				
				this.clsBtn = clsBox.getElementsByTagName('img')[0];
				this.clsOpt = clsBox.getElementsByTagName('input')[0];
				
				Event.observe(this.clsBtn, 'click', function() {
					this.psptMenu.hide();
				}.bindAsEventListener(this));
				
			}.bind(this), 10);
		}
		if (!this.psptMenu.win.showing) {
			this.psptMenu.show();
		}
		else {
			this.psptMenu.hide();
		}
	},
	psptCardDefaultShow: function() {
		if (getPref('psptCardHide') != 1 && getPrefCur('psptCardHide') != 1) {
			setTimeout(function(){this.psptCard();}.bind(this),100);
		}
	},
	psptCardShow: function() {
		Element.addClassName(this.psptBtn, 'psptMail-over');
		setPrefCur('psptCardHide','0');
	},
	psptCardHide: function() {
		if (this.clsOpt.checked) {
			setPref('psptCardHide','1');
		}
		else {
			setPref('psptCardHide','0');
		}
		setPrefCur('psptCardHide','1');
		Element.removeClassName(this.psptBtn, 'psptMail-over');
	},
	getPsptInnerDiv: function() {
		var _div = document.createElement('div');
		this.psptInnerDiv = _div;
		return _div;
	},
	disableBtn: function(elm) {
		Element.addClassName(elm, 'disable');
	},
	ableBtn: function(elm) {
		Element.removeClassName(elm, 'disable');
	},
	gotoBlog: function() {
		window.open('http://blog.sohu.com/manage/main.do', 'blogWin');
	},
	gotoPP: function() {
		window.open('http://pp.sohu.com/passport', 'ppWin');
	},
	gotoMusic: function() {
		window.open('http://d.sogou.com/coo/blog/loginMusicBox.so', 'musicWin');
	},
	doLogout: function() {
		logoutApp();
		PassportSC.logoutHandle(document.getElementsByTagName('head')[0], ToolBar.logoutFailCall,ToolBar.logoutSuccessCall);
	},
	logoutFailCall: function() {
		PassportSC.reportMsg('8');
	},
	logoutSuccessCall: function() {
		if (location.pathname.indexOf('/manage/') >= 0 ) {
			location.href = 'http://blog.sohu.com';
		}
		else {
			location.reload();
		}
		//location.href = 'http://blog.sohu.com';
	}
};
function showLogin() {
	if(ToolBar && ToolBar.loginInnerDiv) {
		ToolBar.loginInnerDiv.innerHTML = getLogonForm();
		if(ToolBar.loginMenu.showing) {
			setLogonForm();
		}
	}
}