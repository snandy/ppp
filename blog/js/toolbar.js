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

function getUserTools() {
	var str = '';
	if (isLoginBlogUser()) {
		if (location.pathname.indexOf('/manage/') >= 0 ) {
			var _mngPvTxt = "查看我的博客";
			var _mngPvLnk = _blog_base_url;
		}
		else if (getD() && getD() != _blog_domain) {
			var _mngPvTxt = "查看我的博客";
			var _mngPvLnk = 'http://'+getD()+'.blog.sohu.com';
		}
		else {
			var _mngPvTxt = "管理我的博客";
			var _mngPvLnk = "http://blog.sohu.com/manage/main.do";

		}
		if (typeof gw != 'undefined' && gw) {
			var w = gw();
			str += '<div style="background:#f6f6f6;padding:3px 3px 0;cursor:default;" title="现在心情如何？或许可以写篇日志记录一下～">'+ w +'</div>';
		}
		var _p = getP();
		if (is17173User()) {
			_p = _p.substring(0, _p.indexOf('@17173'));
		}
		str += '<div><span><strong title="欢迎您 '+ _p +'">'+ _p +'</strong></span>|';
		if (Browser.ua.indexOf('ie')<0) {
			str += '<span class="sohuMsg" id="tool-bar-sohuMsg" title="小纸条">&nbsp;</span>|';
		}else{
			str += '<span class="sohuMsgFlash"><embed src="http://images.chinaren.com/product/webim/mood/mood_blog.swf?UserID='+ getP() +'" wmode="transparent" quality="high" pluginspage="htt p://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" menu="-1" /></span>|';
		}
		str += '<a href="'+ _mngPvLnk +'" title="'+ _mngPvTxt +'">'+ _mngPvTxt +'</a>|</div>';
		str += '<div id="menu_newTd_box" class="linkbox">loading...</div>'+  '<div class="linkspace">|</div>'+  '<div id="menu_toolTd_box" class="linkbox">loading...</div>';

	}
	if (isLoginNotActived()) {
		str += '<div><span title="欢迎您 搜狐网友">搜狐网友</span>|<a href="/login/activation.do" title="您还没有激活博客，请先激活">激活我的博客</a>|</div>';
		str += '<div id="menu_newTd_box" class="linkbox">loading...</div>';

	}
	if (notLogin()) {
		str += '<div id="menu_logonTd_box" class="linkbox"><div id="menu_logonTd" class="link" onmouseover="mouseEvent(event, menu_logon)" onmouseout="mouseEvent(event, menu_logon)" onclick="mouseClick(event, menu_logon);loadLoginJs()" title="登录">登录</div></div>';
		str += '<div>|<a href="/login/reg.do">注册</a>|</div>';
		str += '<div id="menu_newTd_box" class="linkbox">loading...</div>';
	}
	return str;
}
function getLoginDiv() {
	if (!$('menu_logonDiv')) {
		var tmp = '<div id="menu_logonDiv" class="menu-div" style="position:absolute;visibility:hidden;z-index:100; padding: 10px; width: 330px" onclick="mouseClick(event, menu_logon, true)">'+ 'loading...' +'</div>';
		document.write(tmp);
	}
}
function getSysTools() {
	var str = '';
	if (isLoginBlogUser() || isLoginNotActived()) {
		str += '<a href="javascript:doLogout();" title="退出登录">离开</a> | ';
	}
	str += '<a href="/help.html" title="帮助" target="_blank">帮助</a>';
	return str;
}
function getSysNavRec() {
	var str = '';
	if (typeof rec != 'undefined' && rec && rec.length>0) {
		var n = Math.round(Math.random()*(rec.length-1));
		var sl = rec[n];
		str = '<a href="'+ sl.l +'" target="_blank" title="'+ sl.t +'">'+ (sl.t.length>10? sl.t.substring(0,10)+'...': sl.t) +'</a>'
	}
	return str;
}
function get17173Logo() {
	return ('<a href="http://blog.17173.com" target="_blank"><img src="http://js.pp.sohu.com/ppp/blog/styles_ppp/images/logo17173.gif" alt="17173博客" align="absmiddle" /></a>');
}

function toolBarBuild() {
	if (!$('tool-bar')) return;
	if (is17173User()) {
		$('sohu-blog-logo').innerHTML = get17173Logo();
	}
	if ($('user-tools')) {
		$('user-tools').innerHTML = getUserTools();
	}
	if ($('sys-tools')) {
		$('sys-tools').innerHTML = getSysTools();
	}
	if ($('sys-nav-ht')) {
		$('sys-nav-ht').innerHTML = getSysNavRec();
	}
	if (notLogin()) {
		getLoginDiv();
	}
	toolBarInit();
	
	// disable tool menu in manager page
	if (isLoginBlogUser() && location.pathname.indexOf('/manage/') >= 0) {
		disableMenu(menu_tool);
	}
	
			var sohuMsgBtn = $('tool-bar-sohuMsg');
			if (sohuMsgBtn) {
				Event.observe(sohuMsgBtn, 'mouseover', function() {
					Element.addClassName(sohuMsgBtn, 'sohuMsg-over');
				});
				Event.observe(sohuMsgBtn, 'mouseout', function() {
					Element.removeClassName(sohuMsgBtn, 'sohuMsg-over');
				});
				Event.observe(sohuMsgBtn, 'click', Event.stop);
				Event.observe(sohuMsgBtn, 'click', function() {
					window.open('http://me.sohu.com');
				});
			}
	
	toolBarBluildFlag = true;
}

function showLogin() {
	if($('menu_logonDiv')) {
		/*$('menu_logonDiv').innerHTML = getLogonForm();
		if(menu_logon.showing)setLogonForm();*/
		PassportSC.campImg = 'http://www.sohu.com/passport/images/pic007_1.gif';
		PassportSC.campImgAlt = '奥运村';
		PassportSC.isShowRemPwdMsg = 0;
		PassportSC.drawPassport($('menu_logonDiv'));
	}
}

function loadLoginJs() {
	var head = document.getElementsByTagName("head")[0];
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
	}
}
function doLogout() {
	logoutApp();
	PassportSC.logoutHandle(document.getElementsByTagName('head')[0], logoutFailCall,logoutSuccessCall);
}
function logoutFailCall() {
	PassportSC.reportMsg('8');
}
function logoutSuccessCall() {
	if (location.pathname.indexOf('/manage/') >= 0 ) {
		location.href = 'http://blog.sohu.com';
	}
	else {
		location.reload();
	}
	//location.href = 'http://blog.sohu.com';
}

function toolBarInit() {
	menu_newDiv = [["撰写新日志", "var newEntry=window.open('http://blog.sohu.com/manage/entry.do?m=add&t=shortcut','newEntry')", "撰写新日志"]];
	menu_new = new MenuObj("menu_new", "menu_newTd", "menu_newArrowTd", "menu_newDiv", "link-over", "link", "link-over", "link-disable", "link-arrow-over", "link-arrow", "link-arrow-down", "link-arrow-disable");
	if (isLoginBlogUser()) {
		var _blogTitle = (getBlogTitle())? " "+getBlogTitle()+" ":"此站点";
		menu_toolDiv = [["加为好友", "addToFav()", "将"+ _blogTitle +"加为我的好友"]];
		menu_tool = new MenuObj("menu_tool", "menu_toolTd", "menu_toolArrowTd", "menu_toolDiv", "link-over", "link", "link-over", "link-disable", "link-arrow-over", "link-arrow", "link-arrow-down", "link-arrow-disable");
		//menu_peiDiv = [["<img src='/themes_toolbar/default/images/ico_heart_7.gif' />", "alert('你点击了“速配”按钮')", "您与"+ _blogTitle +"的速配指数为：67 \n点击了解更多..."]];
		//menu_pei = new MenuObj("menu_pei", "menu_peiTd", "menu_peiArrowTd", "menu_peiDiv", "link-over", "link", "link-over", "link-disable", "link-arrow-over", "link-arrow", "link-arrow-down", "link-arrow-disable");

	}
	if (notLogin()) {
		menu_logon = new MenuObj("menu_logon", "menu_logonTd", "", "menu_logonDiv", "link-over", "link", "link-over", "link-disable", "link-arrow-over", "link-arrow", "link-arrow-down", "link-arrow-disable");
	}
}
var menu_newDiv, menu_new, menu_toolDiv, menu_tool, menu_peiDiv, menu_pei;
var toolBarBluildFlag = false;
//toolBarBuild();
