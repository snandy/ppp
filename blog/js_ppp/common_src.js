/******* Common Js for Sohu Personal Portal Park **********/
//	Author: Todd Lee (www.todd-lee.com)
//	Last Update: 2012-03-14 by snandy 评论，回复，加跟随（未登陆时）加登陆弹框
//	Copyright: Sohu.com (www.sohu.com)
/**********************************************************/

/******* Common Js **********/
var Browser = {};
Browser.ua = getUserAgent();
function getUserAgent(){
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf("opera") >= 0) {return "opera";}
	if (ua.indexOf("firefox") >= 0) {return "ff";}
	if (ua.indexOf("gecko") >= 0) {return "moz";}
	if (ua.indexOf("msie")) {
		ieVer = parseFloat(ua.substr(ua.indexOf("msie") + 5));
		if (ieVer >= 6) {return "ie6";}
		if (ieVer >= 5.5) {return "ie55";}
		if (ieVer >= 5 ) {return "ie5";}
	}
	return "other";
}
function timeStamp() { 
	var now = new Date();
	return (now.getTime());
}
// return the full url of a relative url
function getFullUrl(url) {
	return (url.indexOf('http://') == 0 || url.indexOf('https://') == 0)? 
		url : (url.indexOf('/') == 0)? 
			location.protocol + '//' + location.host + url : (url.indexOf('www') == 0)?
				'http://'+ url : location.href.substr(0, location.href.lastIndexOf('/')+1) + url;
}
// whether a url is a local file
function isLocalFile(url) {
	var pattern = /^http:\/\/|ftp:\/\/|(https:\/\/)/;
	if (!pattern.test(url)) {
		return true;
	}
	if (url.replace(pattern, '').substr(0, url.replace(pattern, '').indexOf('/')) == location.host) {
		return true;
	}
	return false;
}
// get the ture length of a string
function getTureLength(str) {
	if (str == null) {return null;}
	var PatSWord=/^[\x00-\xff]+$/;	//single-byte 
    var PatDWord=/[^\x00-\xff]+/g;	//double-byte 
	var ln = 0;
	for (var i=0; i<str.length; i++) {
		var char = str.charAt(i);
		if (PatSWord.test(char)) {
			ln += 1;
		}else {
			ln += 2;
		}
	}
	return ln;
}
function getUrlParam(name) {
	var params = unescape(location.search);
	if (!params) {return;}
	params = params.substring(1);
	var tmp, reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)","gi");
	tmp = reg.exec(params);
	if (tmp) {
		return (tmp[2]);
	}
	return null;
};


/******* Cookie Operation **********/
var prefStr = 'Pref';
function getPref(name) {
	var tmp, pref, reg = new RegExp("(^|\|)"+name+"=([^\|]*)(\||$)","gi");
	if (getCookie(prefStr)) {
		pref = getCookie(prefStr);
		tmp = reg.exec(pref);
		if (tmp) {
			return (tmp[2]);
		}
	}
	return null;
}
function setPref(name, value) {
	var tmp, pref, newPref, reg = new RegExp("(^|\|)"+name+"=([^\|]*)(\||$)","gi");
	if (getCookie(prefStr)) {
		pref = getCookie(prefStr);
		tmp = reg.exec(pref);
		if (tmp) {
			newPref = pref.replace(tmp[0], name+'='+value);
		}
		else {
			newPref = pref + '|'+name+'='+value;
		}
	}
	else {
		newPref = name+'='+value;
	}
	setCookie(prefStr, newPref, 'never', '/', 'blog.sohu.com');
}
var prefCurStr = 'PrefCur';
function getPrefCur(name) {
	var tmp, pref, reg = new RegExp("(^|\|)"+name+"=([^\|]*)(\||$)","gi");
	if (getCookie(prefCurStr)) {
		pref = getCookie(prefCurStr);
		tmp = reg.exec(pref);
		if (tmp) {
			return (tmp[2]);
		}
	}
	return null;
}
function setPrefCur(name, value) {
	var tmp, pref, newPref, reg = new RegExp("(^|\|)"+name+"=([^\|]*)(\||$)","gi");
	if (getCookie(prefCurStr)) {
		pref = getCookie(prefCurStr);
		tmp = reg.exec(pref);
		if (tmp) {
			newPref = pref.replace(tmp[0], name+'='+value);
		}
		else {
			newPref = pref + '|'+name+'='+value;
		}
	}
	else {
		newPref = name+'='+value;
	}
	setCookie(prefCurStr, newPref, '', '/', 'blog.sohu.com');
}


/******* User Operation **********/
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
			this.cookie.P = bloginfo[0];
		}
		if (bloginfo[1]) {
			this.cookie.I = bloginfo[1];
		}
		if (bloginfo[2]) {
			this.cookie.ud = bloginfo[2];
		}
		if (bloginfo[3]) {
			this.cookie.B_TP = bloginfo[3];
		}
		if (bloginfo[4]) {
			this.cookie.name = unescape(bloginfo[4]);
		}
		if (bloginfo[5]) {
			this.cookie.ico = bloginfo[5];
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
    if (I!=null && I!="" && I!="null") {
        return I;
	}
	return false;
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
//	取得当前博客用户的明文passport
function getP() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.P) {
		BlogCookieInfo.parseCookie();
	}
	var str = BlogCookieInfo.cookie.P;
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
function loginPath() {
	return 'http://blog.sohu.com/login/logon.do?bru=' + encodeURIComponent(location.href);
}
/******* Add to Favor **********/
var addToFavFrom = null;
function addToFav(from) {
	addToFavFrom = from;
	if (from && (from.sign == 'profileWidget' || from.sign == 'entryProfile')){
		//新版添加好友
		checkBlogPM(from);return;
	}
	
	var _title = getBlogTitle();
	var _desc = getBlogDesc();
	var _link = getBlogLink();
	if (!_title || !_link) {
		alert('无法获得此站点相应数据');
		return;
	}
	
	if (ToolBar) {
		ToolBar.disableBtn(ToolBar.addLink);
	}
	
	if (from && (from.sign == 'profileWidget' || from.sign == 'entryProfile')) {
		Effect.Appear(from.obj, {from: 1, to: 0.2, duration: 0.1, queue: {scope: 'addFav', position: 'end'} });
	}
	LoadBar.show('读取中...');
	
	var url = '/manage/link.do';
	var pars = 'm=add&title='+ escape(_title) +'&desc='+ escape(_desc.substr(0,64) || '') +'&link='+ escape(_link) + '&subscribe=1';
	var myAjax = new Ajax.Request( url, {method: 'post', parameters: pars, onComplete: doneAddToFav, data: from } );
}
function doneAddToFav(request,json,data) {
	location.reload();
}
var FavWin = Class.create({
	initialize: function() {
		this.box = new Element("div");
		this.box.setStyle({'display':'none','position':'absolute','zIndex':'2000'});
		this.box.innerHTML = '<table class="mwinnew mwin3" id="addFriendWin">\
			<thead><tr><td class="bx"></td><td class="by"></td><td class="bz"></td></tr></thead>\
			<tfoot><tr><td class="bx"></td><td class="by"></td><td class="bz"></td></tr></tfoot>\
			<tbody><tr><td class="bx"></td>\
					<td class="by">\
						<div class="mwt">\
							<div class="ttl"><span>添加关注</span><a href="javascript:void(0);" class="mw_close" title="关闭"><b>关闭</b></a></div>\
						</div>\
						<div class="mw">\
							<div class="mwc">\
								<form action="" method="post" name="addFriendForm" id="addFriendForm">\
								<div class="repost">\
										<div class="mwc2" >\
											<p>选择分组</p>\
											<div class="frmc" id="addFrindGroupsCtner"></div>\
											<form ><div class="mwc21" style="height:30px;">\
												或 <a style="line-height:30px;color:#017AD7" href="#" onclick="$(\'newGroupCtn\').toggle();return false;">新建分组</a><span id="newGroupCtn" style="display:none"><input type="text" name="gname" class="txt">\
												<p><a href="#" class="fgyes"><b>确定</b></a><a href="#" onclick="$(\'newGroupCtn\').toggle();return false;" class="fgno"><b>取消</b></a></p></span>\
											</div></form>\
										</div>\
								</div>\
								<div class="post">\
									<p class="btns2"><span class="opt"></span><a class="btn" href="javascript:void(0);"><b>确 定</b></a><a class="btn btn_dis" href="javascript:void(0);"><b>取 消</b></a></p>\
								</div>\
								</form>\
							</div>\
						</div></td>\
					<td class="bz"></td>\
				</tr>\
			</tbody>\
		</table>';
		this.closeBtn = this.box.down('a.mw_close');
		this.cancelBtnCtner = this.box.down('a.btn_dis');
		this.okBtn = this.box.down('a.btn');
		this.cancelBtn = this.box.down('a.btn',1);
		
		this.titleDiv = this.box.down('span');
		this.noticeDiv = this.box.down('div.repost_c');
		
		document.body.appendChild(this.box);
		this.cancelBtn.observe('click',this.hide.bind(this));
		this.closeBtn.observe('click',this.hide.bind(this));
		
		var newGroupBtn = this.box.down('.fgyes');
		Event.observe(newGroupBtn,'click',this.addGroup.bindAsEventListener(this))
	},
	show:function(option){
		option = Object.extend({type:'alert',title:'',notice:'',fnOk:function(){}}
			,option || {});
		this.okBtn.observe('click', function(){
			option.fnOk();
		});
		this.cancelBtnCtner.show();
		var r = Dom.getCenterPos(this.box);
		this.box.setStyle({'top':r.top+'px','left':r.left+'px'});
		this.box.show();
		this.okBtn.focus();
	},
	hide:function(){
		this.box.remove();
		this.reset();
		FavWin._instance = null;
	},
	reset:function(){
		this.okBtn.stopObserving('click');
	},
	addGroup:function(event){
		var srcEle = Event.element(event);
		Event.stop(event);
		var form = srcEle.up('form');
		var gname = form.gname.value.trim();
		if(gname == ''){
			alert('请输入分组名称');
			return;
		}
		
		var pars = 'gname='+encodeURIComponent(gname);
		var addGroupUrl = '/a/app/friend/group/add.do';
		new Ajax.Request(addGroupUrl,{
			 method:'post',
	         parameters:pars,
	         onComplete:function(response){
	         	if(response.status == 200){
	         		eval('var json='+response.responseText)
	         		if(json){
	          			if(json.code == 1){
	          				form.gname.value = '';
	          				var str = '<label class="chkbox"><input type="checkbox" name="groups" checked value="'+json.data.gid+'">'+json.data.gname+'</label>';
	          				$('addFrindGroupsCtner').insert(str);
	          				$('newGroupCtn').hide();
	          			}else{
	          				alert(json.statusText);return;
	          			}
	         		}
	         	}else{
	         		alert("服务器返回异常，请稍后重试");return;
	         	}
	         	
	         }.bind(this)
		});
	}
});
function checkBlogPM(from){
	var $ = jQuery;
	var cls = 'i-addfriendDis';
	var $btn = $(from.obj);
	if ( $btn.hasClass(cls) ) {
		alert('您已跟随过了');
		return;
	}
	var url = '/a/app/friend/friend/add.do?';
	var pars='xpt='+window._xpt+'&appid=1001';
	jQuery.getJSON(url+pars, function(json) {
 		if (json && json.data) {
  			if (json.code == 1) {
  				from.friendId = json.data.friendId;
  				$btn.addClass(cls);
  				addToFavNew(from);
  			} else {
  				alert(json.msg);
  			}
 		}
	});	
}
function addToFavNew(from){
	var win = FavWin._instance;
	if(!win){
		win = new FavWin();
		FavWin._instance = win;
	}else{
		return;
	}
	
	var options = {
		friendId: from.friendId,
		fnOk: function() {
			var addForm = $('addFriendForm');
			var groups = addForm.groups;
			var groupIds = '';
			var url = 'http://i.sohu.com/a/app/friend/update/group/mapping.do';
			
			for(var i=0;i< groups.length;i++){
				if(groups[i].checked){
					groupIds+=groups[i].value+',';
				}
			}
			var parss = '?friendId=' + this.friendId + '&groupIds=' + groupIds;
			var pars = {friendId: this.friendId, groupIds: groupIds};

			if(groupIds.length>1){
				groupIds = groupIds.substring(0,groupIds.length-1);
			}
			jQuery.getJSON(url+parss+'&callback=?', function(json) {
      			if (json.code == 0) {
      				win.hide();
      				doneAddToFav();
      			} else {
      				alert(json.msg);
      			}
			});
		}
	};

	win.show(options);
	setFriendGroups();
}
function setFriendGroups(){
	var url = '/a/app/friend/group/getgroups.do';
	jQuery.getJSON(url, function(json) {
 		if (json && json.code==1) {
			var groups = json.data.groups;
			var str = '';
			for(var i=0;i<groups.length;i++){
				str += '<label class="chkbox"><input type="checkbox" name="groups" value="'+groups[i].groupId+'">'+groups[i].groupName+'</label>';
			}
			if($('addFrindGroupsCtner')){
				$('addFrindGroupsCtner').insert(str);
			}
 		}
	});
}

/******* Page Message **********/
function highLightMsg(elm) {
	if (!$(elm)) return;
	var element = $(elm);
	element.style.borderColor = '#29aba3';
}
function highLightErr(elm) {
	if (!$(elm)) return;
	var element = $(elm);
	element.style.borderColor = 'red';
}
function lowLightMsg(elm) {
	if (!$(elm)) return;
	var element = $(elm);
	element.style.borderColor = '#ccc';
}
function flashMsg(elm) {
	if (!$(elm)) return;
	var element = $(elm);
	setTimeout(function(){highLightMsg(element)}, 0);
	setTimeout(function(){lowLightMsg(element)}, 50);
	setTimeout(function(){highLightMsg(element)}, 150);
	setTimeout(function(){lowLightMsg(element)}, 200);
	setTimeout(function(){highLightMsg(element)}, 300);
	setTimeout(function(){lowLightMsg(element)}, 350);
	setTimeout(function(){highLightMsg(element)}, 450);
	setTimeout(function(){lowLightMsg(element)}, 1500);
}
function flashErr(elm) {
	if (!$(elm)) return;
	var element = $(elm);
	setTimeout(function(){highLightErr(element)}, 0);
	setTimeout(function(){lowLightMsg(element)}, 50);
	setTimeout(function(){highLightErr(element)}, 150);
	setTimeout(function(){lowLightMsg(element)}, 200);
	setTimeout(function(){highLightErr(element)}, 300);
	setTimeout(function(){lowLightMsg(element)}, 350);
	setTimeout(function(){highLightErr(element)}, 450);
	setTimeout(function(){lowLightMsg(element)}, 1500);
}
flashMsg('message');
flashErr('errormsg');


// start some function when page loaded
var Starter = {
	funs: [],
	add: function(fun) {
		if (!this.funs) {this.funss = [];}
		this.funs.push(fun);
	},
	start: function() {
		if (!this.funs || this.funs.length <= 0) {return;}
		$A(this.funs).each(function(f) {
			(f)();
		});
	}
};
// loading process
var LoadBar = {
	show: function(text, type) {
		clearTimeout(this.timeout);
		text = text || (  ((typeof App != 'undefined') && App.Lang && App.Lang.loading)? App.Lang.loading : 'loading...'  );
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
		var img = ((typeof App != 'undefined') && App.Actions && App.Actions.imgPath)? 
			App.Actions.imgPath+'loading.gif' : 'http://js2.pp.sohu.com.cn/ppp/blog/styles_ppp/images/loading.gif';
		innerDiv.innerHTML = '<img src="'+ img +'" alt="text" />' + text;
		
		this.element.appendChild(innerDiv);
		document.body.appendChild(this.element);
	},
	showStatusBar: function(text) {
		setTimeout(function(){window.status = text;}, 10);
	},
	hideStatusBar: function() {
		setTimeout(function(){window.status = '';}, 10);
	},
	loadPage: function() {
		this.show('请稍候，正在下载...');
	}
};
//getStart(LoadBar.hide);
Starter.add(LoadBar.hide);
if ($('_preLoadText')) {
	Element.hide($('_preLoadText'));
	LoadBar.loadPage();
}


/******* Logon Form **********/
function checkLogonForm(frm) {	
	if ($F('username').length <= 0) {
		alert("请填写用户名");
		$('username').focus();
		return false;
	}
	if ($F('passwd').length <= 0) {
		alert("请填写密码");
		$('passwd').focus();
		return false;
	}
	if ($('reme') && $F('reme') >= 1){
		setCookie('username', $F('username'), 'never', '/', 'blog.sohu.com');
		setCookie('domain', $F('maildomain'), 'never', '/', 'blog.sohu.com');
		setCookie('rememberme', 'true', 'never', '/', 'sohu.com');
	}else{
		setCookie('username', '', 'never', '/', 'blog.sohu.com');
		setCookie('domain', '', 'never', '/', 'blog.sohu.com');
		setCookie('rememberme', 'false', 'never', '/', 'sohu.com');
	}
	$('loginid').value = $F('username') + $F('maildomain');

	setParm(frm);frm.Submit.disabled = 'disabled';
	$('submitInfo').style.visibility = 'visible';
	return true;
}
function setLogonForm() {
	$('username').value = getCookie('username') || '';
	for (var i = 0; i < $('maildomain').options.length; i++) {
		if( $('maildomain').options[i].value == getCookie('domain') ) {
			$('maildomain').options[i].selected = true;break;
		}
	}
	if (getCookie('rememberme') == "true") {
		$('reme').checked = true;
		$('passwd').select();
		$('passwd').focus();
	}
}
function getLogonForm() {var str = '<form action="http://passport.sohu.com/login.jsp" method="post" target="_top" name="form_login" id="form_login" onsubmit="return checkLogonForm(this)"><input type="hidden" name="loginid" id="loginid" value="" /><table width="100%" border="0" cellspacing="2" cellpadding="0"><tr><td nowrap="nowrap"><label for="username" class="redfont">用户名</label></td><td><input name="username" type="text" class="text" id="username" value="" /> <select name="maildomain" id="maildomain" class="text"><option value="@sohu.com" selected="selected">@sohu.com</option><option value="@chinaren.com">@chinaren.com</option><option value="@vip.sohu.com">@vip.sohu.com</option><option value="@sms.sohu.com">@sms.sohu.com</option><option value="@sol.sohu.com">@sol.sohu.com</option><option value="@sogou.com">@sogou.com</option><option value="@17173.com">17173用户</option></select></td></tr><tr><td nowrap="nowrap"><label for="passwd" class="redfont">密　码</label></td><td><input name="passwd" type="password" class="text" id="passwd" value="" /></td></tr><tr><td></td><td><input name="Submit" id="Submit" type="submit" class="button-submit" value=" 登  录 " />你是新人吗？<a href="/login/reg.do">立刻申请</a><br /><span class="notice" id="submitInfo" style="visibility: hidden">正在登录，请稍候……</span></td></tr><tr><td colspan="2"><label for="save"><input name="reme" type="checkbox" id="reme" value="1" />记住我的登录状态(在公共计算机上请慎用此功能)</label></td></tr></table></form>';return str;}


function initHead() {
	new App.EditableText($('blogTitle'), {defaultValue: '搜狐博客', maxLenght: 12, editStyle: 'editableText', onChange: response});
	new App.EditableText($('blogDesc'), {type: 'area', defaultValue: '每个人都有属于自己的一片森林，迷失的人迷失了，相逢的人会再相逢。', maxLenght: 100, editStyle: 'editableArea', onChange: response});
}
function insertMngOpr() {
	if (!isMyBlog()) {return;}
	if (getUserType() == 3) {return;}
	if (!$('mngOpr')) {return;}
	var mng = $('mngOpr');
	var str = '';
	if(window.location.href.indexOf("/entry/") != -1){
		str += '<a href="http://blog.sohu.com/manage/entry.do?m=add&t=shortcut" class="navNewEntry" onmousedown="CA.q(\'blog_nav_newEntry\');" target="_blank">撰写新日志</a>';
	
	}
	str += ' <a href="http://blog.sohu.com/manage/main.do?tracker=myblog" class="navSysOpt" onmousedown="CA.q(\'blog_myHome\');">进入我的搜狐</a>';
	if (!mng.innerHTML) {
		mng.innerHTML = str;
	}
}
function gotoBlog() {
	window.open('http://blog.sohu.com/manage/main.do', 'blogWin');
}
function gotoPP() {
	window.open('http://pp.sohu.com/passport', 'ppWin');
}
function gotoMusic() {
	window.open('http://mbox.sogou.com/mbox.so', 'musicWin');
}
function gotoVideo() {
	window.open('http://v.blog.sohu.com/passport', 'videoWin');
}
//getStart(insertMngOpr);
Starter.add(insertMngOpr);
/******** entry list ******/
function getPageText(_con, _startPg, _totalItem, _itemPerPg, _curPg, _act) {
	_con = $(_con);
	if (!_con) {return;}
	if (_curPg == 0) {_curPg = 1;}
	var _pgCount = Math.ceil(_totalItem/_itemPerPg);
	 _pgCount = _pgCount || 1;
	var str = '';
	str += '共'+ _pgCount +'页';
	str += '&nbsp;&nbsp;|&nbsp;&nbsp;';
	if (_curPg == _startPg) {
		str += '第一页';
		str += '&nbsp;';
		str += '上一页';
	}
	else {
		str += '<a href="javascript:void(0)" onclick="'+_act+'('+_startPg+');return false;">第一页</a>';
		str += '&nbsp;';
		str += '<a href="javascript:void(0)" onclick="'+_act+'('+(_curPg-1)+');return false;">上一页</a>';
	}
	str += '&nbsp;';
	for (var i=_startPg; i<=_pgCount; i++) {
		if (i == _curPg) {
			str += i;
			str += '&nbsp;';
		}
		else if (i>=_curPg-5 && i<=_curPg+5) {
			str += '<a href="javascript:void(0)" onclick="'+_act+'('+i+');return false;">['+i+']</a>';
			str += '&nbsp;';
		}
		else if (i == _curPg-6 || i == _curPg+6) {
			str += '...&nbsp;';
		}
	}
	if (_curPg == _pgCount) {
		str += '下一页';
		str += '&nbsp;';
		str += '最末页';
	}
	else {
		str += '<a href="javascript:void(0)" onclick="'+_act+'('+(_curPg+1)+');return false;">下一页</a>';
		str += '&nbsp;';
		str += '<a href="javascript:void(0)" onclick="'+_act+'('+_pgCount+');return false;">最末页</a>';
	}
	_con.innerHTML = str;
}
function chageEntryPage(_pg) {
	curPage = _pg || 0;
	getEntryList(curPage, category, tag);
	getPageText(pageTextContainer, startPage, totalCount, itemPerPage, curPage, chagePageAction);
	return false;
}
function chageRecmdEntryPage(_pg) {
	curPage = _pg || 0;
	getEntryList(curPage, category, tag, 'recmd');
	getPageText(pageTextContainer, startPage, totalCount, itemPerPage, curPage, chagePageAction);
	return false;
}
function getEntryList(_pg, _c, _t, _type) {
	if (_pg>0) {
		LoadBar.show('读取中...');
	}
	_type = _type || 'frag';
	var url = '/action/v_'+_type+'-ebi_'+escape(_ebi);
	if(_pg > 1){
		url += '-pg_' + _pg;
	}
	if(_c > 0){
		url += '-c_' + _c;
	}
	url += '/entry/';
	var pars = '';
	if(_t){
		pars += 'tag=' + escape(_t);
	}
	if (isMyBlog()) {
		pars += pars? '&o=true' : 'o=true';
	}

	if ($('entryList')) {
		var myAjax = new Ajax.Updater('entryList', url, {method: 'get', parameters: pars, onComplete: entryLoaded } );
	}
}
function entryLoaded() {
	setTimeout(LoadBar.hide,500);
	if (jumpAnchor) {
		setTimeout(function(){location.hash = '#entry';},600);
	}
	jumpAnchor = true;
	Entries.insertItemOpr();
	Entries.insertItemReadCount();
	Entries.insertItemCmtCount(jQuery('#entryList')[0]);
}
var Entries = {
	ITEM_PREFIX: 'itemId_',
	ITEMCMTCOUNT_PREFIX: 'itemCmtCount_',
	ITEMREADCOUNT_PREFIX: 'itemReadCount_',
	itemReadCountUrl: 'http://ana.blog.sohu.com/blogcount',
	entries: [],
	insertItemOpr: function(from) {
		if (!isMyBlog()) {return;}
		var items = [];
		items = document.getElementsByClassName('itemOpr');
		if (items.length <= 0) {return;}
		$A(items).each(function(it, i) {
			if ( it && it.id && (it.id.indexOf(this.ITEM_PREFIX)==0) ) {
				var itemId = it.id.substr(this.ITEM_PREFIX.length);
				var str = '';
				str += '<a href="http://blog.sohu.com/manage/entry.do?m=edit&id='+ itemId +'&t=shortcut" target="_blank">';
				str += '<img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_edit.gif" alt="修改" />';
				str += '</a>';
				str += '<a href="http://blog.sohu.com/manage/entry.do?m=delete&id='+ itemId;
				if (typeof from != 'undefined' && from != '') {
					str += '&from=' + from;
				}
				str += '" onclick="return confirm(\'确认要删除吗？\')">';
				str += '<img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_del.gif" alt="删除" />';
				str += '</a>';
				if (!it.innerHTML) {
					it.innerHTML = str;
				}

			}
		}.bind(this));
	},
	insertItemCmtCount: function(container) {
		var jq = jQuery,
			$items = jq('.itemCmtCount', container),
			$input = jq('input', container);
		
		var ids = jq('.item-label', container).map(function(item){
			return jq('[id]', this).attr('id').replace('itemId', 'blog');
		}).get().join(',');

		var countUrl = 'http://cc.i.sohu.com/a/app/mblog/getCounts.htm?_input_encode=UTF-8&callback=?';

		jq.getJSON(countUrl, {ids: ids, callback:'?'}, function(json) {
			$items.each(function(i, el){
				var id = (el.getAttribute('id') || '').replace('itemCmtCount_', '');
				if(id) {
					el.innerHTML = json[id]['commentcount'];
				}
				
			});
		});

	},
	entriesReadCount: {},
	insertItemReadCount: function(from) {
		var itemIds = [];
		$A(document.getElementsByClassName('itemReadCount')).each(function(it, i) {
			if ( it && it.id && (it.id.indexOf(this.ITEMREADCOUNT_PREFIX)==0) ) {
				var itemId = it.id.substr(this.ITEMREADCOUNT_PREFIX.length);
				var _count = this.entriesReadCount[itemId];
				if (typeof _count != 'undefined' && _count != null && !isNaN(_count)) {
					if (!it.innerHTML || it.innerHTML == '?') {
						it.innerHTML = _count;
					}
				}
				else if (itemId) {
					itemIds.push(itemId);
				} 
			}
		}.bind(this));
		
		if (itemIds.length > 0) {
			var ts = timeStamp();
			var vn = 'Blog.ercs_'+ ts;
			if (from == 'view') {var dataURL = this.itemReadCountUrl +'?e='+ itemIds[0] +'&vn='+ ts;}
			else {var dataURL = this.itemReadCountUrl +'?l='+ itemIds.join(',') +'&vn='+ ts;}
			new LinkFile(dataURL, {
									type: 'script',
									noCache: true,
									callBack: {
										variable: vn,
										onLoad: function() {
											this.entriesReadCount = Object.extend(this.entriesReadCount, eval(vn) || {});
											this.insertItemReadCount(from)
										}.bind(this)
										//timeout: 1000
										//timerStep: 500
									}});
		}
	},
	clearReadCount: function(id) {
		if (id) {
			this.entriesReadCount[id] = null;
		}
		else {
			this.entriesReadCount = null;
			this.entriesReadCount = {};
		}
	},
	getConEntrySubMenuData: function(id) {
		var divSubContent = document.createElement('div');
		divSubContent.className = 'menuInnerSub-div clearfix';

		
		var arr = [];
		arr.push('<form method="post" onsubmit="return false;">');
		arr.push('<table cellpadding="2" cellspacing="5">');
		arr.push('<tr><td>');
		arr.push('<div class="infoBox">您可以在发表日志的同时，投稿给我们。<br />如果该日志被录用，将会被展示在相应频道栏目中。同时管理员会以留言方式通知您。<br /><br />提示：每篇日志只能投稿一次，欢迎原创，谢绝转载</div>');
		arr.push('</td></tr>');
		arr.push('<tr><td>');
		arr.push('请选择投稿栏目:');
		arr.push('<input type="hidden" name="id" value="'+ id +'" />');
		arr.push('<input type="hidden" name="contrChId" value="" />');
		arr.push('<input type="hidden" name="contrCataId" value="" />');
		arr.push('</td></tr>');
		arr.push('<tr><td>');
		arr.push('</td></tr>');
		arr.push('<tr><td>');
		arr.push('<input type="submit" value=" 投 稿 " class="button-submit" />');
		arr.push(' <input type="button" value="取消" class="button" />');
		arr.push('<span style="display:none;">loading...</span>');
		arr.push('</td></tr>');
		arr.push('</table>');		
		arr.push('</form>');
		divSubContent.innerHTML = arr.join('');
		
		this.entries[id].conForm = divSubContent.firstChild;
		this.entries[id].conChIpt = divSubContent.firstChild.firstChild.rows[1].cells[0].childNodes[1];
		this.entries[id].conCataIpt = divSubContent.firstChild.firstChild.rows[1].cells[0].childNodes[2];
		this.entries[id].conSelBox = divSubContent.firstChild.firstChild.rows[2].cells[0];
		this.entries[id].conSubBtn = divSubContent.firstChild.firstChild.rows[3].cells[0].firstChild;
		this.entries[id].conCanBtn = divSubContent.firstChild.firstChild.rows[3].cells[0].getElementsByTagName('input')[1];
		this.entries[id].conSubLoadText = divSubContent.firstChild.firstChild.rows[3].cells[0].lastChild;
		
		Event.observe(this.entries[id].conForm, 'submit', this.conSubmit.bind(this, id));
		Event.observe(this.entries[id].conCanBtn, 'click', function() {
			this.entries[id].conEntryMenu.hide();
		}.bind(this));
		setTimeout(this.setConSelecter.bind(this, id), 10);
		return divSubContent;
	},
	setConSelecter: function(id) {
		this.entries[id].conSelecterMenu = new SelecterMenu(this.entries[id].conSelBox, getConDataUrl, {startId: conStartId, variablePrefix: 'con_', selectPerfix: 'con_level_'});
	},
	conSubmit: function(id) {
		var entry = this.entries[id];
		var conValues = entry.conSelecterMenu.getValues();
		if (!conValues[conValues.length-1] || conValues[conValues.length-1] == '' || conValues[conValues.length-1] == '56_allGame') {
			alert('请选择投稿栏目');
			try{
				entry.conSelecterMenu.levels[entry.conSelecterMenu.levels.length-1].elm_sel.focus();
			}catch(e){
				entry.conSelecterMenu.levels[entry.conSelecterMenu.levels.length-2].elm_sel.focus();
			}
			return false;
		}

		entry.conSubBtn.disabled = true;
		entry.conCanBtn.disabled = true;
		Element.show(entry.conSubLoadText);
		var url = '/manage/entry.do';
		if (is17173User()) {
			var pars = 'm=contribute&id='+ id +'&contrChId='+ conStartId +'&contrCataId='+ conValues[conValues.length-1];
		}
		else {
			var pars = 'm=contribute&id='+ id +'&contrChId='+ conValues[0] +'&contrCataId='+ conValues[conValues.length-1];
		}
		var myAjax = new Ajax.Request( url, {method: 'get', parameters: pars, onComplete: this.okConSubmit.bind(this), data: id } );
	},
	okConSubmit: function(request, json, data) {
		if (!request || !request.responseText || request.responseText.indexOf('<') !== 0 || !request.responseXML) {
			this.errorConSubmit(request);
			return;
		}
		var xmlDom = request.responseXML;
		var code = Element.getChildValueByTagName(xmlDom, 'code')[0];
		var message = Element.getChildValueByTagName(xmlDom, 'message')[0].trim();
		if (typeof code == 'undefined' || typeof message == 'undefined') {
			return this.errorConSubmit(request);
		}
		if (code == '200') {
			alert(Info.htmlInfo(unescape(message),0,' '));
		}
		else {
			alert(Info.htmlInfo(unescape(message),1,' '));
		}
		
		this.endConSubmit(data);
	},
	errorConSubmit: function(request) {
		alert('Error: The resource file is not well-formed.\n'+request.responseText);
	},
	endConSubmit: function(id) {
		var entry = this.entries[id];
		entry.conSubBtn.disabled = false;
		entry.conCanBtn.disabled = false;
		Element.hide(entry.conSubLoadText);
		entry.conEntryMenu.hide();
	}
};
if (is17173User()) {
	var conStartId = 56;
} else {
	var conStartId = 0;
}
function getConDataUrl(id) {
	return 'http://act.blog.sohu.com/blog-contri/cata/con_'+id+'.js';
}

/**
 * 博文最终页左侧统计信息
 */
function showBlogStat(){
		var statUrl = '/action/ebi_' + _ebi + '-m_view-type_statsnocomments/widget/';
		
		new Ajax.Request(statUrl,{
			method:'get',
				parameters:'',
				onComplete:function(response){
					if(response.status == 200){
						var resultTxt = response.responseText;
						$('sideBlogStat').innerHTML = resultTxt;
						$('statusCount').innerHTML = '访问：数据加载中';
						getRVC();
					}
				}
		});
		function getRVC(){
			if(_blog_domain){
				var url = 'http://stat.pic.sohu.com/blogcount?u='+_blog_domain+'&t=json&t='+(new Date()).getTime();
				new Groj(url, {
					variable: 'rctVisitCount',			
					onSuccess: function(){
						if($('statusCount') && window['rctVisitCount']){
							$('statusCount').innerHTML = '';
							$('statusCount').innerHTML = '访问：'+window['rctVisitCount'];
						}
					}
				});
			}else{
				$('statusCount').innerHTML = '';
			}
		}
	}
/******** tag list ******/
var PTags = {
	getTags: function(element,options) {
		if (!element) {return;}
		if (typeof(options.max) != 'number') options.max = -1;
		element.innerHTML = '正在加载...';
		
		var dataURL = 'http://ptag.blog.sohu.com/btags/'+ _ebi +'/all/';
		//var dataURL = 'http://ptag.blog.sohu.com/btags/e3c3a63792/all/';
		//var dataURL = '/ptag.js';
		
		new LinkFile(dataURL, {
			type: 'script',
			noCache: isMyBlog(),
			callBack: {
				variable: 'BlogPtags.tags_abc',
				onLoad: this.showAbc.bind(this,element,options),
				onFailure: this.noData.bind(this,element,options)
		}});
	},
	showAbc: function(element,options) {
		if (!BlogPtags.tags_abc || BlogPtags.tags_abc.length <= 0) {
			element.innerHTML = '暂无标签';
			return;
		}
		
		var str = '';
		
		str += '<ul class="ptags">';
		var i = 0, max = options.max;
		var getItemStr = this.getItemStr;
		this.getLevels(BlogPtags.tags_abc).each(function(t) {
			if (max != -1 && i++ >= max) throw $break;
			str += getItemStr(t);
		});
		str += '</ul>';
		if (max != -1 && i >= max) {
			str += '<div style="cursor:pointer;float:right;">查看全部标签</div>';
		}
		
		element.innerHTML = str;
		if (max != -1 && i >= 20) {
			Event.observe(element.lastChild, 'click', this.showAllAbc.bind(this, element));
		}
		if (options && options.onOkShow) {
			options.onOkShow();
		}
	},
	showAllAbc: function(element) {
		var str = '';
		
		str += '<ul class="ptags">';
		var getItemStr = this.getItemStr;
		this.getLevels(BlogPtags.tags_abc).each(function(t) {
			str += getItemStr(t);
		});
		str += '</ul>';
		
		element.innerHTML = str;
	},
	getItemStr: function(t) {
		var str = '<li class="ptag_'+ t.level + '">';
		str += '<a href="'+ _blog_base_url +'tag/'+ (t.encode) +'/" title="' + t.count + '篇">';
		str += t.tag;
		str += '</a>';
		str += '</li>';
		return str;
	},
	noData: function(element,options) {
		element.innerHTML = '暂时无法获取数据，请稍后再试';
		if (options && options.onErrorShow) {
			options.onErrorShow();
		}
	},
	getLevels: function(ptags) {
		var levelMax = ptags.max(function(t) {
			return parseInt(t.count);
		});
		var levelMin = ptags.min(function(t) {
			return parseInt(t.count);
		});
		var level = [];
		level[0] = Math.floor((levelMax-levelMin)*0.9)+levelMin;
		level[1] = Math.floor((levelMax-levelMin)*0.7)+levelMin;
		level[2] = Math.floor((levelMax-levelMin)*0.4)+levelMin;
		
		return (ptags.map(function(t) {
			t.level = (t.count>level[0])? 4 : ( (t.count>level[1])? 3 : ( (t.count>level[2])? 2 : 1) );
			return t;
		}));
	}
};
/******** comment list ******/
function getCommontList2(curPage) {

	var url = 'http://i.sohu.com/a/app/discuss/indexBlogList.htm?_input_encode=UTF-8';
	var ids = 'blog_' + entryId + '_0_' + _upt;
	var page = curPage || 1;
	var itemPerPage = 10;
	url += '&ids=' + ids;
	url += '&page=' + page;
	url += '&sz=' + itemPerPage;

	jQuery.getJSON(url + '&callback=?', function(json) {
		if(!json || !json.discusss || !json.discusss.length) return;
		if(!commentListEl) {
			commentListEl = $('commentlist');
		}
		// 清空上一次内容，可能会存在内存泄露
		commentListEl.innerHTML = '';

		// 生成评论列表
		Comments.list(json);
		
		// 生成分页
		var startPage = 1;
		var totalCount = json.discusscount;
		getPageText(pageTextContainer, startPage, totalCount, itemPerPage, page, chagePageAction);

		setTimeout(Comments.insertCmtOpr.bind(Comments), 10);
	});
}

function getCommontList(_id, _pg, _cc, _noCache) {
	if (_pg>0) {
                LoadBar.show('读取中...');
        }
        _pg = _pg || 1;
        var url = '/action/m_list-id_' + _id + '-cc_' + _cc + '-pg_' + _pg  + '/comment/';

        var pars = '';
        if(_noCache) {
                pars = 'nc=true';
        }

        if ($('commentlist')) {
                var myAjax = new Ajax.Updater('commentlist', url, {method: 'get', parameters: pars, onComplete: commontLoaded } );
        }
}
function commontLoaded() {
	setTimeout(LoadBar.hide,500);
	if (jumpAnchor) {
		setTimeout(function(){location.hash = '#comment';},600);
	}
	jumpAnchor = true;
	setTimeout(Comments.insertCmtOpr.bind(Comments), 10);
	setTimeout(Comments.insertIconInfo.bind(Comments), 10);
	setTimeout(Comments.initCandleMen.bind(Comments), 10);
}
function chagePage(_pg) {
	curPage = _pg || 0;
	if(typeof blogId == 'undefined'){
		getCommontList(entryId, curPage, totalCount, noCache);
	}else{
		getCommontList2(curPage);
	}
	return false;
}
// 判断是否是自己的博客
function isOwnBlog() {
	var pp = Base64.encode(PassportSC.cookieHandle());
	if (typeof _upt!='undefined' && _upt==pp) {
		return true;
	}
	return false;
}

function commonLogin(where, callback) {
	where = where || '';

	if (!jQuery.ppDialog) {
		return;
	}
	jQuery.ppDialog({
		appId: '1001',
		title: '想要发表您的观点吗，马上登录吧！',
		onLogin: function() {
			if (isOwnBlog()) {
				location.reload();
				return;
			}
			if (callback) {
				callback();
			}
			if (where){
				if (location.href.indexOf(where) < 0) {
					location.href = location.href+where;
				}
				location.reload();
			}

		}
	});

}

setTimeout(function(){
	if (!window.jQuery) {
		return;
	}
	
	var $el = jQuery('a.i-addfriend');

	if (!$el[0]) {
		return;
	}

	function add() {
		var param = {
			sign: 'entryProfile',
			obj: $el[0]
		};
		addToFav(param);	
	}

	$el.click(function() {
		CA.q('blog_entry_profile_addFriend');

		if (isPPLogin()) {
			add();
		} else {
			commonLogin('', add);
		}
	});

}, 1500);


var commentListEl;
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
// function parseTitle(title) {
// 	if (!title) return;
// 	var str = '', 
// 		reg = /@{"snick":"[^",:{}@]*","sname":"[^",:{}@]*"}/g,
// 		arr = title.match(reg);

// 	if (!arr) return title;

// 	var regArr = [];
// 	for (var i=0; i<arr.length; i++) {
// 		var ss = arr[i],
// 			rreg = RegExp(ss),
// 			dest = parse(ss);
// 		regArr.push({r: rreg, s: dest});
// 	}

// 	var i=0, len = regArr.length;
// 	var res = function gets(title) {
// 		var obj = regArr[i++], ds = '';
// 		if (obj) {
// 			var ds = title.replace(obj.r, obj.s)
// 			return gets(ds)
// 		} else {
// 			return title;
// 		}
// 	}(title);

// 	// console.log(res)
// 	function parse(str) {
// 		var str = str.replace('@', '');
// 		try {
// 			var obj = jQuery.parseJSON(str);
// 		} catch(e) {
// 			return str;
// 		}
// 		return '@' + obj.snick;
// 	}
// 	return res;
// }
var Comments = {
	CMT_PREFIX: 'cmtId_',
	CMTICO_PREFIX: 'icoId_',
	CMTICOIMG: 'http://js1.pp.sohu.com.cn/ppp/blog/images/common/nobody.gif',
	
	insertCmtOpr: function() {
		if (!isMyBlog()) {return;}
		var cmts = [];
		cmts = document.getElementsByClassName('cmtOpr');
		if (cmts.length < 1) {return;}
		for (var i=0; i<cmts.length; i++) {
			var str = ' |<a href="javascript://" action="delete">';
			str += '<img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_del.gif" title="删除" align="absbottom">';
			str += '</a>';
			if (!cmts[i].innerHTML) {
				cmts[i].innerHTML = str;
			}
		}
	},
	insertIconInfo: function() {
		if (!isLogin() || !hasBlog()) {return;}
		var icos = [];
		icos = document.getElementsByClassName('cmtIco');
		if (icos.length <= 0) {return;}
		for (var i=0; i<icos.length; i++) {
			if ( icos[i] && icos[i].id && (icos[i].id.indexOf(this.CMTICO_PREFIX)==0) ) {
				var icoId = icos[i].id.substr(this.CMTICO_PREFIX.length);
				var icoImg = icos[i].getElementsByTagName('img')[0];
				if (icoId == hasBlog() && icoImg && icoImg.src == this.CMTICOIMG) {
					var str = '';
					str += '<a href="http://blog.sohu.com/manage/profile.do" target="_blank" title="上传我的头像">';
					str +='<img src="'+ this.CMTICOIMG +'" />';
					str += '<span>上传头像</span></a>';
					icos[i].innerHTML = str;
				}
			}
		}
	},
	initCandleMen: function() {
		SohuIM.setCandleMenParam();
		try {
			if (typeof sohuim != undefined && sohuim && sohuim.candleArmy && sohuim.candleArmy.RenderAll) {
				sohuim.candleArmy.RenderAll(webim_config.cm_container, webim_config.product);
			}
		}catch(e){}
	},
	buildOne: function(data) {
		var arr = [];
		var str = this.parseContent(data.content);
		arr.push('<div class="info-content" cid="' + data.id + '">');
		arr.push('<div style="margin-bottom: 10px;">' + str + '</div>');
		arr.push('<div class="cmtIco">');
		arr.push('<a title="' + data.unick + '" target="_blank" href="' + data.ulink + '">');
		arr.push('<img src="' + data.uavatar + '"></a></div>');
		arr.push('<div class="info-title">');
		arr.push('<h3>发布者 <a target="_blank" href="' + data.ulink + '">' + data.unick + '</a>');
		arr.push('<a href="javascript:void(0)" param="' + data.passport + ';' + data.unick + '" rel="' + data.ulink + ';' + data.unick + '" name="onlineIcon" ' + '_webim_ppid="' + data.ulink + '">');
		arr.push('<img src="http://images.sohu.com/cs/sohuim/em/user_off_0.gif" height="12px" border="0"></a>');
		arr.push('(' + data.ulink + ')<br>' + timeUtil.get_timeago(data.createtime) + '</h3>');
		arr.push('<div style="margin-top:16px;" class="item-label">');
		arr.push('<a href="javascript://" action="reply">回复</a><span class="cmtOpr"></span></div></div>');
		arr.push('<div class="clear"></div></div>');
		arr.push('<hr>');
		return arr.join('');
	},
	parseContent: function(content) {
		if(typeof content !== 'string') return;

		var emoteStr = this.parseEmote(content);
		emoteStr = parseTitle(emoteStr);

		var idx1 = emoteStr.indexOf('@'),
			idx2 = emoteStr.indexOf('：');

		if(idx1==-1 || idx2==-1) {
			return emoteStr;
		}
		var cont = emoteStr.substring(idx1, idx2);
		var nick = cont.substring(1);
		var str = '<a target="_blank" href="http://i.sohu.com/nick/' + nick + '">' + cont + '</a>';

		return emoteStr.replace(RegExp(cont), str);
	},
	parseEmote: function(str) {
		var reg = /(\[[^\[\]]+\])/g;

		var arr = str.match(reg);
		if(!arr) return str; 
		
		var res = '';
		for(var i=0,l=arr.length; i<l; i++) {
			var mark = arr[i], data, url, imgstr='';
			if(mark in emoteData.base) {
				data = emoteData.base[mark];
				url = emoteBaseUrl;
			}else if(mark in emoteData.fox) {
				data = emoteData.fox[mark];
				url = emoteFoxUrl
			}else if(mark in emoteData.pafu) {
				data = emoteData.pafu[mark];
				url = emotePafuUrl;
			}
			if(data) {
				imgstr = '<img src="' + url + data[0] + '" title="' + data[1] + '">';
				if(res) {
					res = res.replace(mark, imgstr);
				}else {
					res = str.replace(mark, imgstr);
				}
			}else {
				return str;
			}
		}

		return res;
	},
	one: function(data) {
		if(!commentListEl) {
			commentListEl = $('commentlist');
		}
		str = Comments.buildOne(data);
		jQuery(commentListEl).append(str);
		
	},
	list: function(data) {
		if(data.discusscount) {
			$('discusscount').innerHTML = data.discusscount;
		}
		for(var i=0,len=data.discusss.length; i<len; i++) {
			this.one(data.discusss[i]);
		}
	},
	addEvent: function() {
		if (typeof jQuery === 'undefined') {
			return;
		}

		var jq = jQuery;
		$commentlist = jq('#commentlist');
		// 回复按钮
		$commentlist.delegate('[action=reply]', 'click', function(e){
			var cc = $('commentContent');
			if (!isLogin()) {
				commonLogin('#commentbox');
				return;
			}else if(!cc) {
				alert('抱歉，由于博主的设置，您暂时无法评论');
			}
			var $el = jq(e.target).closest('.info-content'),
				obj = $el.children()[0],
				text = getFilterEmotionText(obj.innerHTML);
			var $links = jq(e.target).closest('.info-content').find('.info-title').find('h3').find('a');
			var strAuthor = $links.first().html();
			cc.value = '';
			cc.value += '回复@' + strAuthor + '：';
			cc.focus();
			try {
				var r = cc.createTextRange();
				r.moveStart("character",cc.value.length);
				r.collapse(true);
				r.select();
			}catch(e){}
			
			// 回复passport和内容
			var replyXPT = $links.last().attr('param').split(';')[0];
			jq('[name=replytopassport]').val(replyXPT);
			jq('[name=replytodiscussid]').val($el.attr('cid'));
		});
		// 删除按钮
		$commentlist.delegate('[action=delete]', 'click', function(e){
			var $el = jq(e.target).closest('.info-content');
			var id = $el.attr('cid');
			
			var url = 'http://i.sohu.com/a/app/discuss/delete.htm?_input_encode=UTF-8';
			url += '&ids=' + id + '_' + _upt;

			if(confirm('确认要删除吗？')) {
				jq.getJSON(url + '&callback=?', function(json){
					if(json.code == 0) {
						$el.next().remove();
						$el.remove();
					}
				});
			}

		});
	}

};
setTimeout(function(){
	Comments.addEvent();
}, 1500);


/******* Article Content ********/
var ArticleContent = {
	playEmbed: function(elmId, param) {
		if (!$(elmId)) {return;}
		var str = '';
		str += '<embed '+ param.replace(/'/, '"') +'></embed>';
		Element.replace($(elmId), str);
	}
};

/******* comment form ********/
function setCPShow() {
	var $ = jQuery,
		commentForm = $('#commentForm')[0];

	if (!isPPLogin()) {
		commentForm.innerHTML = '由于最近广告泛滥，暂只允许登录用户对此文评论。<a href="javascript://">登录</a>';
	}
	$('a', commentForm).click(function() {
		commonLogin('#commentbox');
	});
}

function checkCForm() {
	var content = $F('commentContent');

	if(content.length == 0){
		alert("评论内容不能为空");
		$('commentContent').focus();
		return false;
	}
	if(content.length > 300){
		alert("评论内容过多，最多为300字");
		$('commentContent').focus();
		return false;
	}
	
	var url = 'http://i.sohu.com/a/app/discuss/save.htm?_input_encode=UTF-8';
	var replytopassport = jQuery('[name=replytopassport]').val();
	var replytodiscussid = jQuery('[name=replytodiscussid]').val();

	var param = {
		from: 'oldBlog',
		appid: 'blog',
		discusstype : '0',
		content: content,
		itemid: entryId
	};
	if( replytopassport!== '' && content.substr(0,3)=='回复@' ) {
		param.replytopassport = replytopassport;
		param.replytodiscussid = replytodiscussid;
	}

	jQuery.getJSON(
		url+'&callback=?',
		param,
		function(json){
		if(json.code == 0) {
			chagePage();
			var ccontent = $('commentContent');
			if(ccontent) {
				ccontent.value = '';
				ccontent.focus();
			}

		}else {
			alert(json.msg || '评论失败，请稍后再试');
		}
	});
}

var timeUtil = {
	serverTime : new Date().getTime(),
	timeOffset : 0,
	setServerTime : function(n) {
		if (n) {
			this.serverTime = n;
			this.timeOffset = new Date().getTime() - n;
		} else {
			this.serverTime = new Date().getTime() - this.timeOffset;
		}
	},
	get_timeago : function(time) {

		this.setServerTime();

		var tip = '', second = 1000, minute = second * 60, hour = minute * 60, 
			now_time = this.serverTime, 
			now = new Date(now_time), 
			now_year = now.getFullYear(), 
			now_month = now.getMonth(), 
			now_date = now.getDate(),
			now_midnight = new Date(now_year, now_month, now_date), 
			midnight_time = now_midnight.getTime(),
			diff = now_time - time;

		// 处理时间格式
		if (diff < 0) {
			tip = '';
		} else if (diff < minute * 5) {
			tip = '刚刚';
		} else if (diff < hour) {
			var m = Math.floor(diff / minute);
			tip = m + '分钟前';
		} else if (diff < now_time - midnight_time) {
			var t = new Date(time), hh = t.getHours(), mm = t.getMinutes();
			hh < 10 && (hh = '0' + hh);
			mm < 10 && (mm = '0' + mm);
			tip = '今日 ' + hh + ':' + mm;
		} else {
			var t = new Date(time), MM = t.getMonth() + 1, DD = t.getDate(), hh = t.getHours(), mm = t.getMinutes();
			MM < 10 && (MM = '0' + MM);
			DD < 10 && (DD = '0' + DD);
			hh < 10 && (hh = '0' + hh);
			mm < 10 && (mm = '0' + mm)
			tip = MM + '月' + DD + '日 ' + hh + ':' + mm;
		}
		return tip;
	}
};

function getFilterEmotionText(text) {
	text = text || '';
	text = text.replace(/ec\=(\"|)([^\"\s]*)(\"|)/g,"> $2 <");
	text = text.replace(/\<[^\<\>]*\>/g,"");
	text = text.replace(/ +/g," ");
	text = text.replace(/\n+/g,"\n");
	text = text.replace(/^\n*/gm,"");
	text = text.replace(/^\s*/gm,"");
	text = text.replace(/\n*$/gm,"");
	text = text.replace(/\s*$/gm,"");
	return text;
}

/******** message list ******/
function getMessageList(_pg, _noCache) {
	if (_pg>0) {
		LoadBar.show('读取中...');
	}
	_pg = _pg || 1;
	var url = '/action/ebi_'+ _ebi +'-pg_'+ _pg + '-v_frag/message/';
	var pars = '';
	if(_noCache) {pars = 'o=true';}
	
	if ($('messagelist')) {
		var myAjax = new Ajax.Updater('messagelist', url, {method: 'get', parameters: pars, onComplete: messageLoaded } );
	}
}
function messageLoaded() {
	setTimeout(LoadBar.hide,500);
	if (jumpAnchor) {
		setTimeout(function(){location.hash = '#top';},600);
	}
	jumpAnchor = true;
	setTimeout(Message.insertMsgOpr.bind(Message), 10);
	setTimeout(Message.insertMsgReplyOpr.bind(Message), 10);
	setTimeout(Comments.insertIconInfo.bind(Comments), 10);
	setTimeout(Comments.initCandleMen.bind(Comments), 10);
}
function chageMsgPage(_pg) {
	curPage = _pg || 0;
	getMessageList(curPage, noCache);
	getPageText(pageTextContainer, startPage, totalCount, itemPerPage, curPage, chagePageAction);
	return false;
}
var Message = {
	MSG_PREFIX: 'msgId_',
	MSGREPLY_PREFIX: 'msgReplyId_',
	insertMsgOpr: function() {
		if (!isMyBlog()) {return;}
		var msgs = [];
		msgs = document.getElementsByClassName('msgOpr');
		if (msgs.length <= 0) {return;}
		for (var i=0; i<msgs.length; i++) {
			if ( msgs[i] && msgs[i].id && (msgs[i].id.indexOf(this.MSG_PREFIX)==0) ) {
				var msgId = msgs[i].id.substr(this.MSG_PREFIX.length);
				var str = '';
				str += '<a href="javascript:void(0)" onclick="replyM(' + msgId + ',this.parentNode)">回复</a> ';
				str += '|<a href="/manage/message.do?m=delete&id='+ msgId +'" onclick="return confirm(\'确认要删除吗？\')">';
				str += '<img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_del.gif" alt="删除" align="absbottom" />';
				str += '</a>';
				if (!msgs[i].innerHTML) {
					msgs[i].innerHTML = str;
				}
			}
		}
	},
	insertMsgReplyOpr: function() {
		if (!isMyBlog()) {return;}
		var msgReplys = [];
		msgReplys = document.getElementsByClassName('msgReplyOpr');
		if (msgReplys.length <= 0) {return;}
		for (var i=0; i<msgReplys.length; i++) {
			if ( msgReplys[i] && msgReplys[i].id && (msgReplys[i].id.indexOf(this.MSGREPLY_PREFIX)==0) ) {
				var msgReplyId = msgReplys[i].id.substr(this.MSGREPLY_PREFIX.length);
				var str = '';
				str += '<a href="/manage/message.do?m=delete&id='+ msgReplyId +'" onclick="return confirm(\'确认要删除吗？\')">';
				str += '<img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_del.gif" alt="删除" align="absbottom" />';
				str += '</a>';
				if (!msgReplys[i].innerHTML) {
					msgReplys[i].innerHTML = str;
				}
			}
		}
	}
};
/******* message form ********/
function replyM(id){
	var btn = $(Message.MSG_PREFIX+id);
	var divMsg = Element.getParentElementByClassName(btn, 'info-content');
	var divMsgReplyForm = document.getElementsByClassName('msgReplyForm',divMsg)[0];
	var imgRpl = document.getElementsByClassName('msgOpr',divMsg)[0];
		
	var divMsgReplyBox = document.getElementsByClassName('msgReply',divMsg)[0];
	
	if (btn.getAttribute('on')!='true') {
		btn.setAttribute('on', 'true');
		var text = '';
		if (divMsgReplyBox) {
			divMsgReplyContent = document.getElementsByClassName('msgReplyContent',divMsg)[0];
			if (divMsgReplyContent) {
				text = getFilterEmotionText(divMsgReplyContent.innerHTML.convertHTMLToText());
			}
			Element.hide(divMsgReplyBox);
		}
		divMsgReplyForm.innerHTML = getReplyMForm(id, text, (imgRpl.getAttribute("ebi") && imgRpl.getAttribute("ebi").length > 0));
		Element.show(divMsgReplyForm);
	}
	else {
		btn.setAttribute('on', 'false');
		if (divMsgReplyBox) {
			Element.show(divMsgReplyBox);
		}
		divMsgReplyForm.innerHTML = '';
		Element.hide(divMsgReplyForm);
	}
}
function getReplyMForm(id,defaultText, isABloger) {
	defaultText = defaultText || '';
	var str = '';
	str += '<div class="info-title"><h3>博主回复：</h3></div>';
	str += '<div class="msgReplyContent">';
	str += '<form action="/page/message.do" method="post" onsubmit="return checkMRForm(this)">';
	str += '<input type="hidden" name="ebi" value="'+ _ebi +'" />';
	str += '<input type="hidden" name="replyId" value="'+ id +'" />';
	str += '<input type="hidden" name="m" value="reply" />';
	str += '<textarea name="messageContent" rows="8" class="text" style="width:95%">'+defaultText+'</textarea>';
	if (isABloger) str += '<br /><input type="checkbox" name="notify" id="notifyEle" checked="checked" value="true" />同时回复到对方留言板<br />';
	str += '<input type="submit" name="submit" value="回 复" class="button-submit" /> <input type="button" name="cls" value="取 消" class="button" onclick="replyM('+id+')" />';
	str += '<form>';
	str += '</div>';
	return str;
}
function checkMRForm(frm) {
	var msgReply = Form.getElements(frm).find(function(elm){
		return(elm.name == 'messageContent');
	});
	if($F(msgReply).length == 0){
		alert("回复内容不能为空");
		msgReply.focus();
		return false;
	}
	if($F(msgReply).length > 1000){
		alert("回复内容过多（"+ $F('messageContent').length +"字），最多为1000字");
		msgReply.focus();
		return false;
	}
}
/******* pp flash ********/
function getPPSelect() {
	if (typeof ppuserid == 'undefined' || !ppuserid) {return('');}
	var str = '';
	str += '<select name="ppSource" id="ppSource" onchange="setPPSource()">';
	str += '<option value="http://pp.sohu.com/photolist-list-4-'+ ppuserid +'-1.html" selected="selected">全部</option>';
	for (var i=0; i<photosets.length; i++) {
		var photoset = photosets[i];
		if (!photoset.id) {continue;}
		str += '<option value="http://pp.sohu.com/set-view-'+ photoset.id +'-' + ppuserid + '-4-1.html">'+ photoset.name +'</option>';
	}
	str += '</select>';
	return str;
}
function getPPLabel() {
	if (typeof ppuserid == 'undefined' || !ppuserid) {return('');}
	var str = '';
	str += '<a href="http://pp.sohu.com/setlist.jhtml?method=list&userId='+ ppuserid +'" target="_blank" class="contentLabel" onfocus="this.blur();">转到图片公园</a>';
	return str;
}
function getPPBigFlash(elm) {
	if (typeof ppuserid == 'undefined' || !ppuserid) {
		$(elm).innerHTML = '暂时无法获取数据，请稍后再试';
		return;
	}
	if (ppuserid < 0) {
		$(elm).innerHTML = '还未开通相册';
		return;
	}
	if (!$(elm)) {return;}
	var str = '';
	str += '<object id="myFlash" width=720 height=550 classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0">';
	str += '<param name="movie" value="http://js4.pp.sohu.com.cn/ppp/blog/flash/show20060525.swf">';
	str += '<param name="wmode" value="opaque">';
	str += '<param name="quality" value="autohigh">';
	str += '<param id="flashvars" name="flashvars" value="urlA=http://pp.sohu.com/photolist-list-4-'+ ppuserid +'-1.html"/>';
	str += '<embed width="720" height="550" src="http://js4.pp.sohu.com.cn/ppp/blog/flash/show20060525.swf?urlA=http://pp.sohu.com/photolist-list-4-'+ ppuserid +'-1.html" quality="autohigh" wmode="opaque" type="application/x-shockwave-flash" plugspace="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" name="myFlash" swLiveConnect="true"> </embed>';
	str += '</object>';
	$(elm).innerHTML = str;
}
/******* music flash ********/
function getMusicSelect(request) {
	if (!request || request.responseText == '') {return('没有获得音乐盒数据');}
	if (!request.responseXML || !request.responseXML.documentElement) {return('分析音乐盒数据失败');}
	var xmlDom = request.responseXML;
	var lists = xmlDom.getElementsByTagName('musiclist');
	var str = '';
	str += '<select name="musicSource" id="musicSource" onchange="setMusicSource()">';
	for (var i=0; i<lists.length; i++) {
		var list = lists[i];
		if (!list.getAttribute('sogouurl')) {continue;}
		str += '<option value="'+ list.getAttribute('sogouurl').replace('&amp;', '&') +'">'+ list.getAttribute('name') +'</option>';
	}
	str += '</select>';
	return str;
}
/******** Emotion ******/
var Emotion = {
	iconPath: 'http://js3.pp.sohu.com.cn/ppp/images/emotion/',
	lib: [
		[ "[:)]", "0.gif", "微笑" ], [ "[#_#]", "1.gif", "谄媚" ],
		[ "[8*)]", "2.gif", "偷笑" ], [ "[:D]", "3.gif", "大笑" ],
		[ "[:-)]", "4.gif", "害羞" ], [ "[:P]", "5.gif", "调皮" ],
		[ "[B_)]", "6.gif", "得意" ], [ "[B_I]", "7.gif", "耍酷" ],
		[ "[^_*]", "8.gif", "讽刺" ], [ "[:$]", "9.gif", "委屈" ],
		[ "[:|]", "10.gif", "郁闷" ], [ "[:(]", "11.gif", "难过" ],
		[ "[:.(]", "12.gif", "流泪" ], [ "[:_(]", "13.gif", "大哭" ],
		[ "[):(]", "14.gif", "发火" ], [ "[:V]", "15.gif", "咒骂" ],
		[ "[*_*]", "16.gif", "发呆" ], [ "[:^]", "17.gif", "不惑" ],
		[ "[:?]", "18.gif", "疑惑" ], [ "[:!]", "19.gif", "吃惊" ],
		[ "[=:|]", "20.gif", "流汗" ], [ "[:%]", "21.gif", "尴尬" ],
		[ "[:O]", "22.gif", "惊恐" ], [ "[:X]", "23.gif", "闭嘴" ],
		[ "[|-)]", "24.gif", "犯困" ], [ "[:Z]", "25.gif", "睡觉" ],
		[ "[:9]", "26.gif", "馋" ], [ "[:T]", "27.gif", "吐" ],
		[ "[:-*]", "28.gif", "耳语" ], [ "[*_/]", "29.gif", "海盗" ],
		[ "[:#|]", "30.gif", "重伤" ], [ "[:69]", "31.gif", "拥抱" ],
		[ "[//shuang]", "32.gif", "爽" ], [ "[//qiang]", "33.gif", "强" ],
		[ "[//ku]", "34.gif", "酷" ], [ "[//zan]", "35.gif", "赞" ],
		[ "[//heart]", "36.gif", "红心" ], [ "[//break]", "37.gif", "心碎" ],
		[ "[//F]", "38.gif", "花开" ], [ "[//W]", "39.gif", "花谢" ],
		[ "[//mail]", "40.gif", "邮件" ], [ "[//strong]", "41.gif", "手势-棒" ],
		[ "[//weak]", "42.gif", "手势-逊" ], [ "[//share]", "43.gif", "握手" ],
		[ "[//phone]", "44.gif", "电话" ], [ "[//mobile]", "45.gif", "手机" ],
		[ "[//kiss]", "46.gif", "嘴唇" ], [ "[//V]", "47.gif", "V" ],
		[ "[//sun]", "48.gif", "太阳" ], [ "[//moon]", "49.gif", "月亮" ],
		[ "[//star]", "50.gif", "星星" ], [ "[(!)]", "51.gif", "灯泡" ],
		[ "[//TV]", "52.gif", "电视" ], [ "[//clock]", "53.gif", "闹钟" ],
		[ "[//gift]", "54.gif", "礼物" ], [ "[//cash]", "55.gif", "现金" ],
		[ "[//coffee]", "56.gif", "咖啡" ], [ "[//rice]", "57.gif", "饭" ],
		[ "[//watermelon]", "58.gif", "西瓜" ], [ "[//tomato]", "59.gif", "番茄" ],
		[ "[//pill]", "60.gif", "药丸" ], [ "[//pig]", "61.gif", "猪头" ],
		[ "[//football]", "62.gif", "足球" ], [ "[//shit]", "63.gif", "便便" ]
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
	getEmotionIcons: function() {
		var str = '';
		for (var i=0; i<this.lib.length; i++) {
			var emotion = this.lib[i];
			str += '<img src="'+ this.iconPath + emotion[1] +'" alt="'+ emotion[0] +'" ec="'+ emotion[0] +'" />';
		}
		return str;
	},
	insert2frm: function(ec, frm) {
		ec = ' ' + ec + ' ';
		if (frm.createTextRange && frm.caretPos) {
			var caretPos = frm.caretPos;
			caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? ec + ' ' : ec;
			frm.focus();
		} else {
			frm.value += ec;
			frm.focus();
		}
	}
};

function setCmtEmoEvent() {
	for (var i=0; i<$('emotionBox').childNodes.length; i++) {
		var ico = $('emotionBox').childNodes[i];
		ico.onclick = function() {
			Emotion.insert2frm(this.getAttribute('ec'), $('commentContent'));
		};
	}
}

/******** Correlative Entry ******/
var CorEntry = {
	getEntries: function(element, etags, inNum, outNum, by) {
		this.element = element;
		if (!etags || inNum<=0 || outNum<=0) {(by=='system')?this.noEntriesBySys():this.noEntriesByPsn();return;}
		etags = etags.split(/,|，| |　/);
		if (etags.length == 0) {(by=='system')?this.noEntriesBySys():this.noEntriesByPsn();return;}
		
		var inTags = etags.splice(0, inNum);
		if (by == 'system') {
			this.getDataBySys(inTags, outNum);
		}
		else {
			this.getDataByPsn(inTags, outNum);
		}
	},
	getDataBySys: function(inTags, outNum) {
		var dataURL = 'http://tag.blog.sohu.com/'+ encodeURIComponent(escape(inTags.join(' '))) +'/json/';
		new LinkFile(dataURL, {
			type: 'script',
			noCache: isMyBlog(),
			callBack: {
				variable: 'blogTag.posts',
				onLoad: this.showEntriesBySys.bind(this,outNum),
				onFailure: this.noEntriesBySys.bind(this)
		}});
	},
	showEntriesBySys: function(outNum) {
		if (!blogTag || !blogTag.posts || blogTag.posts.length==0) {this.noEntriesBySys();return;}
		try{
			var str = '';
			str += '<div class="item-title">';
			str += '<h3>其他博客也发表了类似文章（'+ getIntervalTime(blogTag.posts[0].pub) +'）</h3>';
			str += '<div class="clear"></div>';


			str += '</div>';
			str += '<div>';
			var displayNum = 0;
			var authorBlogLink = 'http://' + _blog_domain + '.blog.sohu.com/';
			blogTag.posts.each(function(p) {
				if(p.blog_link.indexOf(authorBlogLink) >= 0){ throw $continue;}
				displayNum++;
				if(displayNum > outNum){ throw $break; }
				str += '<div class="tagEntry">';
				str += '<div class="tagEntry_authorPic"><a href="'+ p.blog_link +'" target="_blank"><img src="'+ p.blog_icon +'" alt="'+ p.blog_name +'" /></a></div>';
				str += '<h5><a href="'+ p.blog_link +'" target="_blank" class="tagEntry_authorName">'+ p.blog_name +'</a>：<a href="'+ p.permlink +'" target="_blank" class="tagEntyr_title">'+ p.title +'</a><span class="tagEntry_pubTime">'+ getIntervalTime(p.pub) +'</span></h5>';
				str += '<div class="tagEntry_content">'+ p.excerpt +'...</div>';
				str += '</div>';
			});
			if(displayNum > 0){
				if ($('tagsBox')) {
					str += '<div class="tagListMore">查看更多：'+ $('tagsBox').innerHTML +'</div>';
				}
				str += '</div>';
				this.element.innerHTML = str;
	
				Element.show(this.element);
			}else{
				errorLoadTagList();return;
			}
		}
		catch(e){
			this.noEntriesBySys();
		}
	},
	noEntriesBySys: function() {
		this.getSysRecTags(this.element);
	},
	getSysRecTags: function(element) {
		var url = '/inc/home/tag_index.inc';
		if ($(element)) {
			var div = document.createElement('div');
			div.id = 'rec';
			div.className = 'clearfix';
			var myAjax = new Ajax.Updater(div, url, {method: 'get'} );
			element.appendChild(div);
			Element.show(element);
		}
	},
	getDataByPsn: function(inTags, outNum) {
		this.inTagsByPsn = inTags;
		this.useInTagIndexByPsn = 0;
		this.outEntriesByPsn = [];
		this.outNumByPsn = outNum;
		
		this.getOneDataByPsn();
	},
	getOneDataByPsn: function() {
		if (this.inTagsByPsn.length > 0 && this.useInTagIndexByPsn < this.inTagsByPsn.length && this.outEntriesByPsn.length < this.outNumByPsn ) {
			var ts = timeStamp();
			var dataURL = 'http://ptag.blog.sohu.com/ptags/'+ _ebi +'/'+ encodeURI(escape(this.inTagsByPsn[this.useInTagIndexByPsn])) +'/'+ ts +'/';
			new LinkFile(dataURL, {
				type: 'script',
				noCache: isMyBlog(),
				callBack: {
					variable: 'BlogPtags.entries_'+ ts,
					onLoad: function(){
						this.outEntriesByPsn = this.getTureEntriesByPerson( this.outEntriesByPsn.concat(eval('BlogPtags.entries_'+ ts +'.entries')) );
						this.useInTagIndexByPsn++;
						this.getOneDataByPsn();
					}.bind(this),
					onFailure: this.noEntriesByPsn.bind(this)
			}});
		}
		else {
			this.showEntriesByPsn();
		}
		
	},
	showEntriesByPsn: function() {
		try{
			if (this.outEntriesByPsn.length > 0) {
				var str = '';
				str += '<div class="item-title clearfix">';
				str += '<h3>相关文章</h3>';
				str += '<span>(根据该日志的标签，发现博主还有如下日志与本文相关)</span>';
				str += '</div>';
				str += '<ul class="corEntry">';
				this.outEntriesByPsn.each(function(e,i) {
					if (i >= this.outNumByPsn) {throw $break;}
					str += '<li>';
					str += '<a href="'+ e.permanLink +'" target="_blank" title="'+ e.title +' ---- '+ getIntervalTime(e.timestamp) +'">';
					str += e.title;
					str += '</a>';

					str += '</li>';
				}.bind(this));
				str += '</ul>';
				
				this.element.innerHTML = str;
				Element.show(this.element);
			}
			else {
				this.noEntriesByPsn();
			}
		}
		catch(e){
			this.noEntriesByPsn();
		}
	},
	noEntriesByPsn: function() {
		var div = document.createElement('div');
		div.id = 'rec';
		div.className = 'clearfix';
		
		PTags.getTags(div,{
					  onOkShow: function() {
							this.element.appendChild(div);
							Element.show(this.element);
						}.bind(this)
		});
		
	},
	getTureEntriesByPerson: function(entries) {
		var trueEnetries = [];

		entries.each(function(e) {
			if ( trueEnetries.any(function(te){return (te.entryId == e.entryId);}) ) {
				throw $continue;
			}
			if(e.entryId == entryId){
				throw $continue;
			}
			else {
				trueEnetries.push(e);
			}
		});
		return trueEnetries;
	}
};
function getIntervalTime(time) {
	var now = new Date();
	var interval = now.getTime() - time;
		
	var minu = Math.floor(interval / (60 * 1000));
	var hour = Math.floor(minu / 60);
	var day = Math.floor(hour / 24);
	
	
	var str = '';
	if(day >= 1){
		str += day;
		str += '天';
	}

	if(hour < 48 && hour > 0 && (hour % 24) > 0){
		str += hour % 24;
		str += '小时';
	}
    
    if (hour == 0 && (minu % 60 <= 2)) {
    	return '刚刚';
    }
    
	if(hour < 24 && minu > 0){
		str += minu % 60;
		str += '分钟';
	}
	str += '前';
	return str;
}
/******** icon lib for nav ******/
var icoLib = ['none.gif','anchor.gif','attach.gif','basket.gif','bomb.gif','book.gif','book_addresses.gif','book_open.gif','brick.gif','briefcase.gif','bug.gif','cake.gif','calendar_view_day.gif','calendar_view_month.gif','camera.gif','car.gif','cd.gif','chart_bar.gif','chart_curve.gif','chart_organisation.gif','chart_pie.gif','clock.gif','clock_red.gif','cog.gif','coins.gif','color_swatch.gif','comment.gif','computer.gif','connect.gif','creditcards.gif','door.gif','door_open.gif','drink.gif','drink_empty.gif','email.gif','email_open.gif','email_open_image.gif','emoticon_evilgrin.gif','emoticon_grin.gif','emoticon_happy.gif','emoticon_smile.gif','emoticon_surprised.gif','emoticon_tongue.gif','emoticon_unhappy.gif','emoticon_waii.gif','emoticon_wink.gif','exclamation.gif','eye.gif','feed.gif','flag_blue.gif','flag_green.gif','flag_orange.gif','flag_pink.gif','flag_purple.gif','flag_red.gif','flag_yellow.gif','folder.gif','heart.gif','house.gif','image.gif','information.gif','ipod.gif','keyboard.gif','layout.gif','lightbulb.gif','lightbulb_off.gif','lock.gif','lock_open.gif','lorry.gif','lorry_flatbed.gif','magnifier.gif','money.gif','money_dollar.gif','money_euro.gif','money_pound.gif','money_yen.gif','monitor.gif','mouse.gif','music.gif','new.gif','note.gif','page.gif','page_copy.gif','page_white.gif','page_white_acrobat.gif','page_white_code.gif','page_white_compressed.gif','page_white_excel.gif','page_white_flash.gif','page_white_php.gif','page_white_picture.gif','page_white_powerpoint.gif','page_white_text.gif','page_white_word.gif','page_white_world.gif','palette.gif','paste_plain.gif','pencil.gif','phone.gif','photo.gif','picture.gif','printer.gif','printer_empty.gif','rainbow.gif','rosette.gif','server.gif','shield.gif','sport_8ball.gif','sport_basketball.gif','sport_football.gif','sport_golf.gif','sport_raquet.gif','sport_shuttlecock.gif','sport_soccer.gif','sport_tennis.gif','star.gif','stop.gif','tag_blue.gif','tag_green.gif','tag_orange.gif','tag_pink.gif','tag_purple.gif','tag_red.gif','tag_yellow.gif','telephone.gif','television.gif','thumb_down.gif','thumb_up.gif','trash.gif','tux.gif','user.gif','user_female.gif','user_gray.gif','user_green.gif','user_orange.gif','user_red.gif','user_suit.gif','vcard.gif','weather_clouds.gif','weather_cloudy.gif','weather_lightning.gif','weather_rain.gif','weather_snow.gif','weather_sun.gif','world.gif','zoom.gif','chinaren.gif','olympic.gif'];
function getNavIco(ico, title) {
	if (!ico || ico == '') {ico = 58;}
	var str = '';
	if (ico != 0) {
		str += '<img class="pageIcon" src="http://js5.pp.sohu.com.cn/ppp/blog/styles_ppp/images/custom/icons/'+ icoLib[ico] +'" title="'+ title +'" />';
	}
	return str;
}
var emoteBaseUrl = 'http://js3.pp.sohu.com.cn/ppp/images/emotion/base/',
	emoteFoxUrl = 'http://js3.pp.sohu.com.cn/ppp/images/emotion/s/',
	emotePafuUrl = 'http://js3.pp.sohu.com.cn/ppp/images/emotion/b/';

var emoteData = { 
		base : { 
			//基本表情
			"[:)]" : ["smile.gif", "微笑"],
			"[#_#]" : ["flatter.gif", "谄媚"],
			"[8*)]" : ["titter.gif", "偷笑" ],
			"[:D]": ["spit.gif", "大笑"],
			"[:-)]": ["shame.gif", "害羞"],
			"[:P]" : ["naughty.gif", "调皮"],
			"[B_)]" : ["complacent.gif", "得意"],
			"[B_I]" : ["cool.gif", "耍酷"],
			"[^_*]" : ["lash.gif", "讽刺"],
			"[:$]" : ["complaint.gif", "委屈"],
			"[:|]" : ["gloomy.gif", "郁闷"],
			"[:(]" : ["sorry.gif", "难过"],
			"[:.(]" : ["weep.gif", "泪奔"],
			"[:_(]" : ["cry.gif", "大哭"],
			"[):(]" : ["detonate.gif", "发火"],
			"[:V]" : ["curse.gif", "咒骂"],
			"[*_*]" : ["muzzy.gif", "发呆"],
			"[:^]" : ["misunderstand.gif", "不懂"],
			"[:?]" : ["haze.gif", "疑惑"],
			"[:!]" : ["surprise.gif", "吃惊"],
			"[=:|]" : ["perspire.gif", "流汗"],
			"[:%]" : ["embarrassed.gif", "尴尬"],
			"[:O]" : ["fright.gif", "惊恐"],
			"[:X]" : ["stopper.gif", "闭嘴"],
			"[|-)]" : ["yawn.gif", "犯困"],
			"[:Z]" : ["sleep.gif", "睡觉"],
			"[:9]" : ["greedy.gif", "馋"],
			"[:T]" : ["puke.gif", "吐"],
			"[:-*]" : ["whisper.gif", "耳语"],
			"[*_/]" : ["pirate.gif", "海盗"],
			"[:#|]" : ["bandage.gif", "重伤"],
			"[:69]" : ["hug.gif", "拥抱"],
			"[//shuang]" : ["comfortably.gif", "爽"],
			"[//qiang]" : ["strong.gif", "强"],
			"[//ku]" : ["cool2.gif", "酷"],
			"[//zan]" : ["good.gif", "赞"],
			"[//heart]" : ["heart.gif", "红心"],
			"[//break]" : ["hearted.gif", "心碎"],
			"[//F]" : ["blow.gif", "花开"],
			"[//W]" : ["fade.gif", "花谢"],
			"[//mail]" : ["mail.gif", "邮件"],
			"[//strong]" : ["fine.gif", "手势-棒"],
			"[//weak]" : ["bad.gif", "手势-逊"],
			"[//share]" : ["share.gif", "握手"],
			"[//phone]" : ["phone.gif", "电话"],
			"[//mobile]" : ["mobile.gif", "手机"],
			"[//kiss]" : ["lip.gif", "嘴唇"],
			"[//V]" : ["victory.gif", "V"],
			"[//sun]" : ["sun.gif", "太阳"],
			"[//moon]" : ["moon.gif", "月亮"],
			"[//star]" : ["star.gif", "星星"],
			"[(!)]" : ["bulb.gif", "灯泡"],
			"[//TV]" : ["tv.gif", "电视"],
			"[//clock]" : ["clock.gif", "闹钟"],
			"[//gift]" : ["gift.gif", "礼物"],
			"[//cash]" : ["cash.gif", "现金"],
			"[//coffee]" : ["coffee.gif", "咖啡"],
			"[//rice]" : ["dining.gif", "饭"],
			"[//watermelon]" : ["watermelon.gif", "西瓜"],
			"[//tomato]" : ["tomato.gif", "番茄"],
			"[//pill]" : ["pill.gif", "药丸"],
			"[//pig]" : ["pig.gif", "猪头"],
			"[//football]" : ["football.gif", "足球"],
			"[//shit]" : ["shit.gif", "便便"]
		},
	fox : {
		//狐狐表情
		"[{s}//pig]" : ["pig.gif", "猪头"],
		"[{s}//heart]" : ["heart.gif", "红心"],
		"[{s}B_I]" : ["cool.gif", "耍酷"],
		"[{s}snt]" : ["snot.gif", "鼻涕"],
		"[{s}=:|]" : ["perspire.gif", "流汗"],
		"[{s}8*)]" : ["titter.gif", "偷笑"],
		"[{s}elv]" : ["elvis.gif", "猫王"],
		"[{s}nob]" : ["nostbleed.gif", "鼻血"],
		"[{s}:D]" : ["spit.gif", "大笑"],
		"[{s}lny]" : ["loney.gif", "坏笑"],
		"[{s}:_(]" : ["cry.gif", "大哭"],
		"[{s}rdf]" : ["redflag.gif", "红旗"],
		"[{s}:9]" : ["greedy.gif", "馋"],
		"[{s}:|]" : ["gloomy.gif", "郁闷"],
		"[{s}//shit]" : ["shit.gif", "便便"],
		"[{s}ctm]" : ["contemn.gif", "蔑视"],
		"[{s}plg]" : ["plunger.gif", "搋子"],
		"[{s}:Z]" : ["sleep.gif", "睡觉"],
		"[{s}:#|]" : ["bandage.gif", "重伤"],
		"[{s}:?]" : ["haze.gif", "疑惑"],
		"[{s}ft]" : ["faint.gif", "晕"],
		"[{s}//zan]" : ["good.gif", "赞"],
		"[{s}epd]" : ["explode.gif", "爆炸"],
		"[{s}//share]" : ["share.gif", "握手"],
		"[{s}:$]" : ["complaint.gif", "委屈"],
		"[{s}drk]" : ["drink.gif", "饮料"],
		"[{s}brs]" : ["brushing.gif", "刷牙"],
		"[{s}//rice]" : ["dining.gif", "饭"],
		"[{s}bra]" : ["bra.gif", "胸罩"],
		"[{s}spk]" : ["speaker.gif", "喇叭"],
		"[{s}//clock]" : ["clock.gif", "闹钟"],
		"[{s}xms]" : ["xmas.gif", "圣诞"],
		"[{s}bsk]" : ["basketball.gif", "篮球"],
		"[{s}flw]" : ["floweret.gif", "小花"],
		"[{s}ber]" : ["beer.gif", "啤酒"],
		"[{s}cak]" : ["cake.gif", "蛋糕"],
		"[{s}chr]" : ["cheer.gif", "加油"],
		"[{s}oly]" : ["olympic.gif", "奥运"],
		"[{s}tor]" : ["torch.gif", "火炬"],
		"[{s}up]" : ["up.gif", "顶"]
	},
	pafu : {
		//柏夫表情
		"[{b}hi]" : ["hi.gif", "HI"],
		"[{b}ok]" : ["ok.gif", "OK"],
		"[{b}fco]" : ["faceoff.gif", "变脸"],
		"[{b}:T]" : ["puke.gif", "吐"],
		"[{b}:D]" : ["spit.gif", "大笑"],
		"[{b}):(]" : ["detonate.gif", "发火"],
		"[{b}:!]" : ["surprise.gif", "吃惊"],
		"[{b}bet]" : ["beat.gif", "扁人"],
		"[{b}ft]" : ["faint.gif", "晕"],
		"[{b}gdn]" : ["goodnight.gif", "晚安"],
		"[{b}#_#]" : ["flatter.gif", "谄媚"],
		"[{b}=:|]" : ["perspire.gif", "流汗"],
		"[{b}sof]" : ["sofa.gif", "沙发"],
		"[{b}:.(]" : ["weep.gif", "泪奔"],
		"[{b}nob]" : ["nostbleed.gif", "鼻血"],
		"[{b}glw]" : ["gallow.gif", "我吓死你"],
		"[{b}thd]" : ["thunder.gif", "被雷到了"],
		"[{b}pas]" : ["pass.gif", "路过"],
		"[{b}:?]" : ["haze.gif", "疑惑"],
		"[{b}mop]" : ["mop.gif", "鬼脸"],
		"[{b}b4]" : ["b4.gif", "鄙视"],
		"[{b}^_*]" : ["lash.gif", "讽刺"],
		"[{b}:(]" : ["sorry.gif", "难过"],
		"[{b}up]" : ["up.gif", "顶"],
		"[{b}agi]" : ["agitation.gif", "咱聊聊啊"],
		"[{b}soy]" : ["soysauce.gif", "打酱油"],
		"[{b}stg]" : ["struggle.gif", "努力"],
		"[{b}bj]" : ["beijing.gif", "北京欢迎您"],
		"[{b}cmp]" : ["champion.gif", "冠军"],
		"[{b}bdn]" : ["birdnest.gif", "鸟巢"],
		"[{b}fbi]" : ["feibi.gif", "加油哦"],
		"[{b}skt]" : ["skate.gif", "滑冰"],
		"[{b}wuy]" : ["wuying.gif", "无影手"],
		"[{b}olc]" : ["olymcheer.gif", "奥运加油"]
	}
};

// link script or css
var LinkFile = Class.create();
LinkFile.prototype = {
	initialize: function(_url, options) {
		this.options = Object.extend({
			type:	'script',
			charset:'',
			noCache: false,
			callBack:	null
		}, options || {});
		
		this.options.callBack = Object.extend({
			variable: null,
			onLoad: null,
			timeout:  20000,
			timerStep:500
		}, options.callBack || {});
		
		this.timer = 0;
		this.loadTimer = null;
		
		if (this.options.type == 'script') {
			this.getJs(_url.trim());
		}
		else {
			this.getCss(_url.trim());
		}
		
		if (this.options.callBack.variable) {
			this.options.callBack.vars = this.options.callBack.variable.split('.');
		}
	},
	stop: function() {
		clearInterval(this.loadTimer);
		this.loadTimer = null;
		this.timer = 0;
		return;
	},
	doCallback: function() {
		if (this.options.type != 'script' || !this.options.callBack || !this.options.callBack.vars || !this.options.callBack.onLoad) {
			this.stop();
			return;
		}
		this.timer += this.options.callBack.timerStep;
		
		if ( $A(this.options.callBack.vars).any(function(v,i) {
			var _v = this.options.callBack.vars.slice(0,i+1).join('.');
			return ( eval('typeof '+ _v +'== "undefined"') || eval(_v +'==null') );
		}.bind(this)) && (this.timer < this.options.callBack.timeout) ) {
			return;
		}
		else {
			clearInterval(this.loadTimer);
			if ( $A(this.options.callBack.vars).all(function(v,i) {
				var _v = this.options.callBack.vars.slice(0,i+1).join('.');
				return ( eval('typeof '+ _v +'!= "undefined"') && eval(_v +'!=null') );
			}.bind(this)) ) {
				(this.options.callBack.onLoad)();
			}
			else if ( (this.timer >= this.options.callBack.timeout) && this.options.callBack.onFailure) {
				(this.options.callBack.onFailure)();
			}
			this.loadTimer = null;
			this.timer = 0;
		}
	},
	getJs: function(_url) {
		var oHead = document.getElementsByTagName('head')[0];
		var _links = Element.getChildElementByTagName(oHead, 'SCRIPT');
		$A(_links).each(function(s){
			if (getFullUrl(s.getAttribute('src') || '') == getFullUrl(_url)) {
				Element.remove(s);
			}
		});
		this._link = document.createElement('script');
		if (this.options.noCache) {
			_url += (_url.match(/\?/) ? '&' : '?') + 'c=' + timeStamp();
		}
		this._link.type = 'text/javascript';
		if (this.options.charset) {
			this._link.charset = this.options.charset;
		}
		this._link.src = _url;
		if (this.options.callBack) {
			this.loadTimer = setInterval(function(){this.doCallback();}.bind(this), this.options.callBack.timerStep);
		}
		oHead.appendChild(this._link);
	},
	getCss: function(_url) {
		var oHead = document.getElementsByTagName('head')[0];
		var _links = Element.getChildElementByTagName(oHead, 'LINK');
		$A(_links).each(function(l){
			if (getFullUrl(l.getAttribute('href') || '') == getFullUrl(_url)) {
				Element.remove(l);
			}
		});
		this._link = document.createElement('link');
		if (this.options.noCache) {
			_url += (_url.match(/\?/) ? '&' : '?') + 'c=' + timeStamp();

		}
		this._link.href = _url;
		this._link.type = 'text/css';
		this._link.rel = 'stylesheet';
		if (this.options.charset) {
			this._link.charset = this.options.charset;
		}
		oHead.appendChild(this._link);
	}
};


/******** window menu ******/
var WinMenus = {
	wMenus: [],
	register: function(wMenu) {
		this.wMenus.push(wMenu);
	},
	unregister: function(wMenu) {
		this.wMenus = this.wMenus.reject(function(m) { return m==wMenu; });
	}
};


// infinite levels selecter menu
var SelecterMenu = Class.create();
SelecterMenu.prototype = {
	initialize: function(element, dataUrl, options) {
		this.element = $(element);
		this.levels = [];
		this.dataUrl = dataUrl;
		this.options = Object.extend({
			startId: 0,
			variablePrefix: 'sel_',
			selectPerfix: 'sel_level_',
			defaultActive: []
		}, options || {});
		this.buildLevelOne(0, this.options.startId);
	},
	getLevelBySelId: function(id) {
		return this.levels.find(function(s) {
			return (s.sel == id);
		});
	},
	destroyLevelFollow: function(level) {
		var ln = this.levels.length;
		for (var i = ln-1; i>=level; i--) {
			this.destroyLevelOne(i);
		}
	},
	destroyLevelOne: function(level) {
		if (!this.levels[level]) {return;}
		Element.remove(this.levels[level].element);
		
		this.levels = this.levels.reject(function(m, i) {
			return i==level; 
		});
	}, 
	buildLevelOne: function(level, id) {
		if (!this.levels[level]) {
			var elm_spanBox = document.createElement('span');
			this.levels[level] = {
				element: elm_spanBox
			};
			this.element.appendChild(elm_spanBox);
		}
		this.levels[level].	selId = id,
		this.levels[level].element.innerHTML = 'loading...';
		
		this.loadDataOne(level, id);
	},
	loadDataOne: function(level, id) {
		if (this.loadDataHandle) {this.loadDataHandle.stop();}
		var url = '';
		if (this.dataUrl.constructor == String) {
			url += this.dataUrl;
			if (url.indexOf('?') > 0) {
				url += '&id='+ id;
			}
			else {
				url += '?id='+ id;
			}
		}
		else if (this.dataUrl.constructor == Function) {
			url = this.dataUrl(id);
		}
		
		if (eval('typeof '+this.options.variablePrefix + id +' == "undefined"')) {
			this.loadDataHandle = new LinkFile(url, {
						type: 'script',
						//noCache: noCache,
						callBack: {
							variable: this.options.variablePrefix + id,
							onLoad: this.buildSelOne.bind(this, level),
							onFailure: this.destroyLevelFollow.bind(this, level)
							/*timeout: 20,
							timerStep: 500*/
						}});
		}
		else {
			this.buildSelOne(level);
		}
	},
	buildSelOne: function(level) {
		var obj_level = this.levels[level];
		if (!obj_level) {return;}
		obj_level.data = eval(this.options.variablePrefix + obj_level.selId);
		if (!obj_level.data) {return;}
		
		var elm_sel = document.createElement('select');
		this.levels[level].elm_sel = elm_sel;
		elm_sel.name = this.options.selectPerfix + level;
		
		var i = 0;
		elm_sel.options[i++] = new Option('----', '');
		var cat = '';
		$A(obj_level.data).each(function(opt) {
			if (opt.cat && opt.cat != cat) {
				cat = opt.cat;
				elm_sel.options[i++] = new Option('---- == '+ opt.cat +' == ----', '');
			}
			elm_sel.options[i++] = new Option(opt.name, opt.id);
		});
		
		Event.observe(elm_sel, 'change', function(){
			this.changeOpt(level, elm_sel.value);
		}.bindAsEventListener(this));
			
		obj_level.element.innerHTML = '';
		obj_level.element.appendChild(elm_sel);
		try{
			elm_sel.focus();
		}catch(e){}
	},
	changeOpt: function(level, id) {
		var obj_level = this.levels[level];
		if (!obj_level) {return;}
		
		this.destroyLevelFollow(level+1);
		if (!id) {return;}
		var opt = $A(obj_level.data).find(function(o) {
			return (o.id == id);
		});
		if (!opt) {return;}
		if (opt.hasC == '1') {
			this.buildLevelOne(level+1, id);
		}
	},
	getValues: function() {
		return (this.levels.map(function(l) {
			if (l.elm_sel) {
				return l.elm_sel.value;
			}
			else {
				return null;
			}
		}));
	}
};

var Info = {
	messages : {
		'blog.name' : '博客名称',
		'blog.domain' : '个性域名',
		'blog.desc' : '博客描述',
		'blog.detailDesc' : '主人档案',
		'comment.author.name' : '称呼',
		'comment.author.site' : '网站链接',
		'comment.author.email' : '邮箱',
		'comment.content' : '评论内容',
		'comment.vcode' : '验证码',
		'message.author.name' : '称呼',
		'message.author.site' : '网站链接',
		'message.author.email' : '邮箱',
		'message.content' : '评论内容',
		'message.vcode' : '验证码',
		'entry.title' : '日志标题',
		'entry.content' : '日志内容',
		'entry.excerpt' : '日志摘要',
		'entry.keywords' : '关键字',
		'category.name' : '分类名称',
		'category.desc' : '分类描述',
		'mobile.code' : '手机号',
		'mobile.vcode' : '验证码',
		'module.title' : '模块标题',
		'module.data' : '模块参数',
		'module.type' : '模块类型',
		'link.title' : '友情连接名称',
		'link.desc' : '友情连接描述',
		'link.url' : '友情连接地址',
		'errors.required' : '{0}不能为空.',
		'errors.minlength' : '{0}不能少于 {1} 个字符',
		'errors.maxlength' : '{0}不能大于 {1} 个字符',
		'errors.range' : '{0}必须在{1}个字符和{2}个字符之间',
		'errors.email' : '{0}不是一个有效的邮件地址',
		'errors.invalid' : '{0}无效.',
		'errors.comment.authorname' : ' 用户名不能为空.',
		'errors.comment.commentcontent' : '评论内容不能为空.',
		'errors.comment.maxcommentlength' : '评论内容过多，最多为1000字.',
		'errors.comment.maxauthorName' : '称呼过长',
		'errors.comment.maxauthorSite' : '网站链接过长',
		'errors.comment.maxcommentContent' : '评论内容过长',
		'errors.comment.publish.forbidden' : '作者不允许对此文进行评论',
		'errors.comment.publish.needlogin' : '作者只允许登录用户才可对此文评论。<a href="http://blog.sohu.com/login/logon.do">登录</a>',
		'errors.message.authorname' : ' 用户名不能为空.',
		'errors.message.commentcontent' : '留言内容不能为空.',
		'errors.message.maxcommentlength' : '留言内容过多，最多为1000字.',
		'errors.message.maxauthorName' : '称呼过长',
		'errors.message.maxauthorSite' : '网站链接过长',
		'errors.message.maxcommentContent' : '留言内容过长',
		'errors.message.publish.forbidden' : '作者不允许对留言',
		'errors.message.publish.needlogin' : '作者只允许登录用户才可留言。<a href="http://blog.sohu.com/login/logon.do">登录</a>',
		'errors.message.vcode' : ' 验证码不能为空.',
		'errors.entry.entrytitle' : '请填写日志标题.',
		'errors.entry.maxentrytitle' : '日志标题过长.',
		'errors.entry.entrycontent' : '请填写日志内容.',
		'errors.entry.maxentryexcerpt' : '摘要长度过长',
		'errors.entry.maxentrykeywords' : '关键字过长',
		'errors.link.unexist' : '该好友不存在',
		'errors.link.reach.limit' : '您的好友数量已经达到系统上限',
		'errors.module.reach.limit' : '您的模块已经达到系统上限',
		'errors.module.attempt.delete.entry' : '不能删除日志模块',
		'errors.general' : '操作失败',
		'errors.operate.failure' : '数据操作失败',
		'errors.rpc' : '操作失败，该页暂时不可用',
		'errors.npe' : '系统内部错误',
		'errors.forbidden' : '操作失败，请检查是否有相应的权限',
		'errors.param' : '参数错误',
		'errors.vcode' : '验证码错误，请检查您的输入是否与图片中显示的字母一致',
		'errors.domain.format' : '个性域名必须是英文和数字',
		'errors.domain.exist' : '个性域名已被占用',
		'errors.number.formate' : '参数格式错误',
		'errors.blog.unexis' : '博客不存在',
		'errors.login.user.unexist' : '用户不存在',
		'errors.login.auth' : '认证错误。<ul style="margin:0px;padding:0px;"><li>请检查用户名和密码是否正确。</li><li>请检查您的域名是否正确。提示：如果是17173用户，请注意选择“17173用户”项。',
		'errors.passport.invalid' : '非法的用户名',
		'errors.login' : '系统内部错误，请稍后重试',
		'errors.activation' : '激活失败，请<a href="/login/activation.do">重试</a>',
		'errors.auto.activation' : '自动激活失败，请<a href="/passport">重试</a>',
		'errors.blog.unexist' : '博客不存在',
		'errors.you.have.not.blog' : '您还没有自己的博客,<a href="/login/reg.do">现在就去申请</a>',
		'errors.entry.unexist' : '该日志不存在',
		'errors.entry.private' : '该日志已被隐藏',
		'errors.archive.unexist' : '该归档不存在',
		'errors.category.unexist' : '该分类不存在',
		'errors.mobile.invalidvcode' : '您输入的验证码不正确！',
		'errors.mobile.mobilecode' : '手机号不能为空',
		'errors.mobile.binding' : '该手机号{0}已被绑定',
		'errors.keyword.rewrite' : '您发表的内容包含敏感关键字！请重新填写。',
		'errors.entry.contribute.duplicate' : '对不起,您已经投过稿了,换一篇试试吧',
		'errors.not.ppp' : '您还没有升级到玩弄版,无法进行下一步操作, 现在就<a href="http://blog.sohu.com/manage/upgrade.do">升级</a>?',
		'messages.general' : '操作成功',
		'messages.setting.saved' : '修改成功',
		'messages.theme.saved' : '主题修改成功，您可以<a href="{0}" target="_blank">点击这里</a>查看修改后的结果',
		'messages.flash.saved' : 'Flash特效修改成功，您可以<a href="{0}" target="_blank">点击这里</a>查看修改后的结果',
		'messages.layout.saved' : '页面布局修改成功，您可以<a href="{0}" target="_blank">点击这里</a>查看修改后的结果',
		'messages.entry.saved' : '<div class="noticeInfo"><h3>日志保存成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="/manage/entry.do?m=edit&id={0}">继续编辑</a></li><li><a href="/manage/entry.do?m=list&t=draft">转到草稿列表页面</a></li><li><a href="/manage/entry.do?m=add">撰写另一篇新日志</a></li></ul></div>',
		'messages.entry.published' : '<div class="noticeInfo"><h3>日志发布成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="/manage/entry.do">转到日志列表页面</a></li><li><a href="{0}">查看您刚发表的日志</a></li><li><a href="/manage/entry.do?m=add">撰写另一篇新日志</a></li></ul></div>',
		'messages.entry.shortcutpublished' : '<div class="noticeInfo"><h3>日志发布成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="javascript:closeWin();">关闭本页</a></li><li><a href="{1}">查看我的博客首页</a></li><li><a href="{0}">查看您刚发表的日志</a></li><li><a href="/manage/entry.do?m=add&t=shortcut">撰写另一篇新日志</a></li></ul></div>',
		'messages.entry.shortcutsaved' : '<div class="noticeInfo"><h3>日志保存成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="/manage/entry.do?m=edit&id={0}&t=shortcut">继续编辑</a></li><li><a href="/manage/entry.do?m=list&t=draft">转到草稿列表页面</a></li><li><a href="/manage/entry.do?m=add&t=shortcut">撰写另一篇新日志</a></li></ul></div>',
		'messages.entry.updated' : '<div class="noticeInfo"><h3>日志修改成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="{0}">查看您刚修改的日志</a></li><li><a href="/manage/entry.do">转到日志列表页面</a></li></ul></div>',
		'messages.entry.shortcutupdated' : '<div class="noticeInfo"><h3>日志修改成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="javascript:closeWin();">关闭本页</a></li><li><a href="{0}">查看您刚修改的日志</a></li><li><a href="{1}">查看我的博客</a></li></ul></div>',
		'messages.blog.upgraded' : '<div class="noticeInfo"><h3>恭喜您，升级成功！</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="{0}">查看我的博客</a></li><li><a href="javascript:closeWin();">关闭本页</a></li></ul></div>',
		'messages.blog.down' : '<div class="noticeInfo"><h3>降级成功，感谢您的试用</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="{0}">查看我的博客</a></li><li><a href="javascript:closeWin();">关闭本页</a></li></ul></div>',
		'messages.entry.private' : '该日志已被隐藏,只有您自己才能看到',
		'messages.entry.deleted' : '日志删除成功',
		'messages.comment.published' : '评论发表成功&nbsp;&nbsp;&nbsp;<a href=" http://blog.sohu.com/manage/main.do " target=”_blank” style="color: #069;" onmousedown="CA.a(\'entry_commemt_success\');">查看其他好友的最新日志</a>',
		'messages.comment.deleted' : '评论删除成功',
		'messages.message.published' : '留言发表成功',
		'messages.message.deleted' : '留言删除成功',
		'messages.category.saved' : '<div class="noticeInfo"><h3>分类"{0}"保存成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="/manage/category.do">返回列表</a></li><li><a href="manage/category.do?m=add">创建新分类</a></li></ul></div>',
		'messages.category.updated' : '<div class="noticeInfo"><h3>分类"{0}"更新成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="/manage/category.do">返回列表</a></li><li><a href="manage/category.do?m=add">创建新分类</a></li></ul></div>',
		'messages.category.deleted' : '分类"{0}"删除成功',
		'messages.category.added' : '<div class="noticeInfo"><h3>分类"{0}"添加成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="/manage/category.do">返回列表</a></li><li><a href="manage/category.do?m=add">创建新分类</a></li></ul></div>',
		'messages.profile.saved' : '档案修改成功',
		'messages.entry.contributed' : '投稿成功。\n如果该日志被录用，将会被展示在相应频道栏目中。同时管理员会以留言方式通知您。',
		'messages.mobile.setsuccess' : '设置成功！您可以通过彩信发表博客日记了<br /><a href="/manage/mobile.do">返回</a>',
		'messages.mobile.cancelsuccess' : '您的手机博客服务已经取消!<br /><a href="/manage/mobile.do">返回</a>'
	},
	getCookie : function (name){
		var tmp, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)","gi");
		if( tmp = reg.exec( unescape(document.cookie) ) ) {
			return(tmp[2]);
		}
		return null;
	},
	setCookie : function (name, value, expires, path, domain) {
		var str = name + "=" + escape(value);
		if (expires) {
			if (expires == 'never') 
				expires = 100*365*24*60;
			var exp=new Date(); 
			exp.setTime(exp.getTime() + expires*60*1000);
			str += "; expires="+exp.toGMTString();
		}
		if (path) {
			str += "; path=" + path;
		}
		if (domain) {str += "; domain=" + domain;}
		document.cookie = str;
	},
	getInfo: function (key){
		var tmp = Info.messages[key];
		if(tmp)	{return tmp;}
		return key;
	},
	formatMsg : function (key, params){
		var msgDef = Info.getInfo(key);
		if(msgDef && params){
			for(var i = 0; i < params.length; ++i){
				msgDef = msgDef.replace('{' + i + '}', Info.getInfo(params[i]));
			}
		}
		return msgDef;
	},
	formatMsgs : function (msgs, type, sep){
		var str = "";
		for (var msg in msgs) {
			if(type == 0){
				if(msg.indexOf('messages') != 0) continue;
			}else if(type == 1){ 
				if(msg.indexOf('errors') != 0)	continue;
			}
	
			var param = msgs[msg];
			if(param.constructor == Array ){
				var fmsg = Info.formatMsg(msg, msgs[msg]);
				if(fmsg){
						str += fmsg;
						if (typeof sep == 'undefined' || sep == '') {
							str += '<br />';
						}else{
							str += sep;
						}
				}
			}
		}
		return str;
	},
	readInfo : function (type, sep){
		var cookieMsg = Info.getCookie('msg');
		if(cookieMsg == '' || cookieMsg == 'none')	return '';
		var fmsgs = Info.htmlInfo(cookieMsg, type, sep);
		if(fmsgs && fmsgs.length > 0){
			Info.setCookie('msg', 'none', '', '/', 'blog.sohu.com');
		}
		return fmsgs;
	},
	htmlInfo : function (str, type, sep){
		var msgs = JSON.parse(str);		
		if(msgs){
			return Info.formatMsgs(msgs, type, sep);
		}
		return str;
	},
	displayMsg : function (){
		document.write(Info.readInfo(0));
	},
	displayErr : function(){
		document.write(Info.readInfo(1));
	}
};

// 图片上传地址
var imgSvrAllot = {
	type: {
		local:		"blog.do",			//	本地
		avatar:		"blogo.do",			//	头像
		toolbar:	"blog/tbUpload.do",	//	地址栏
		customTheme:"blogbkUpload.do"
	},
	getUrl: function(type){
		var url = "http://upload.pp.sohu.com/" + imgSvrAllot.type[type];
		return url;
	}
};

// taobao AD 2013-1-23
setTimeout(function() {
	var $ = jQuery
	var preUrl = 'http://i.sohu.com/a/advertise/',
		charset = '?cb=?&_input_encode=UTF-8&_output_encode=UTF-8',
		adUrl = preUrl + 'get.htm' + charset,
		upUrl = preUrl + 'updesc.htm' + charset,
		elAd = $('.blog-article-ad-wrapper'), $title, $show, $edit, $input
		
	$blog_config = window.$blog_config || {}
	
	if (!$blog_config.showAd) return
	
	// 参数cache，jsonpCallback用来强制使用缓存，因为默认会生成TIMESTAMP，且不同jsonpCallback
	$.ajax({
		url: adUrl,
		cache: true,
		dataType: 'jsonp',
		jsonpCallback: 'callback',
		data: {xpt: window._upt},
		success: function(obj) {
			elAd.html(obj.data)
			$title = elAd.find('.title')
			$show  = $title.find('.tt-bt')
			$edit  = $title.find('.tt-bj')
			$input = $title.find('input')
			if (isOwnBlog()) {
				$edit.show()
			}
		}
	})
	
	elAd.delegate('.tt-bj', 'click', function() {
		$show.hide()
		$input.show()[0].focus()
		$input.val($show.text())
	}).delegate('input', 'blur', function() {
		var val = $input.val()
		if (val === '') return;
		if (val.length > 20) {
			alert('标题不能超过20个字符')
			return
		}
		$.getJSON(upUrl, {desc: val}, function(obj) {
			if (obj.status == 0) {
				$show.html(val).show()
				$input.hide()
			} else {
				$.inform({
					icon: 'icon-error',
					delay: 2000,
					easyClose: true,
					content: '保存失败，稍后再试'
				})
			}
		})
	})
	// 统计，随时可能移除 因为部分DOM是ajax请求获取的，所以延迟待其获取后使用事件委托
	setTimeout(function() {
		$('.blog-article-insertad').delegate('.img, .info h4 a, .btn-qkk a', 'click', function() {
			mysohu.put_log('blog_ad_in')
		})
		$('.blog-article-ad', elAd).delegate('li a', 'click', function(e) {
			mysohu.put_log('blog_ad_out')
		})
	}, 2000)

}, 1000);

// 博文中插入的音乐实现自动播放
~function() {
	function thisMovie(movieName) {
		if (jQuery.browser.msie) {
			return document.getElementById(movieName);
		} else {
			 return document[movieName];
		}
 	}
	// 由于虾米不能提供准确监听flash是否加载的接口，用递归试探，每隔2.5秒，直到播放为止
	(function play() {
		setTimeout(function() {
			try {
				var blogContainer = document.getElementById('main-content');
				var id = blogContainer.getElementsByTagName('object')[0].id;
				movie = thisMovie(id);
				movie.musicPlay();
			} catch (e){
				play();
			}
		}, 2500);
	})();
	
}();

