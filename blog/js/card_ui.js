BlogPassportSC = {
	appid: 1019,	// blog
	//loginRedirectUrl: location.protocol +'//'+ location.host + location.pathname + (location.search? (getUrlParam('login')? location.search.replace('login='+getUrlParam('login'), 'login='+timeStamp()):location.search+'&login='+timeStamp()):'?login='+timeStamp()) + location.hash,	// blog
	loginRedirectUrl: location.href,	// blog
	// blog
    _drawLoginForm: function () {
		var arr = [];
		arr.push('<div class="errorBox" style="display:none;"></div>');
		arr.push('<form method="post" onsubmit="return PassportSC.doLogin();" name="loginform">');
		arr.push('<table width="100%" border="0" cellspacing="2" cellpadding="0">');
		arr.push('<tr>');
		arr.push('<td nowrap="nowrap"><label for="email" class="redfont">用户名</label></td>');
		arr.push('<td><input name="email" id="email" type="text" class="text" value="" autocomplete="off" disableautocomplete /></td>');
		arr.push('</tr>');
		arr.push('<tr>');
		arr.push('<td nowrap="nowrap"><label for="password" class="redfont">密　码</label></td>');
		arr.push('<td><input name="password" id="password" type="password" class="text" value="" autocomplete="off" disableautocomplete /></td>');
		arr.push('</tr>');
		arr.push('<tr>');
		arr.push('<td></td>');
		arr.push('<td><input type="submit" class="button-submit" value=" 登  录 " /> 你是新人吗？<a href="/login/reg.do">立刻申请</a><br /><span class="notice" id="submitInfo" style="visibility: hidden">正在登录，请稍候……</span></td>');
		arr.push('</tr>');
		arr.push('<tr>');
		arr.push('<td colspan="2"><label for="save"><input name="persistentcookie" id="save" type="checkbox" />记住我的登录状态(在公共计算机上请慎用此功能)</label></td>');
		arr.push('</tr>');
		arr.push('</table>');
		arr.push('</form>');
        this.cElement.innerHTML = arr.join(''); 
    },
	// blog
    drawLoginForm: function () 
    {
        this._drawLoginForm();
        var inputs = this.cElement.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].name == "email") {this.emailInput = inputs[i];}
            if (inputs[i].name == "password") {this.passwdInput = inputs[i];}
            if (inputs[i].name == "persistentcookie") {this.pcInput = inputs[i];}
			if (inputs[i].type == 'submit') {this.submitInput = inputs[i];}
        }
       // this.loginMsg = this.cElement.getElementsByTagName("h3")[0];

        this.pcInput.onclick = function() {
            if (PassportSC.pcInput.checked == false) return;
            var confirm = window.confirm("浏览器将在两周内保持通行证的登录状态，网吧或公共机房上网者请慎用。您能确认本次操作吗？");
            if (confirm == false) {
                PassportSC.pcInput.checked = false;
            }
        };

        this.bindSelector(); //抽象出来，给狐首 pi18030 调用
        this.autoFillUserId();
        if (this.emailInput.value == "") {
            setTimeout(function () {PassportSC.emailInput.focus()}, 50);
		}
        else {
            setTimeout(function () {PassportSC.passwdInput.focus()}, 50);
		}
    },
	// blog
    drawPassportWait: function () {
        document.getElementById('submitInfo').style.visibility = '';
		this.submitInput.disabled = 'disabled';
    },
	// blog
	reportMsg: function(code) {
		var msg = '';
		var status = 0;
		switch(code) {
			case '1':
				msg += '请输入登录用户名';
				break;
			case '2':
				msg += '用户名格式错误。\n请您输入完整的电子邮件地址，如***@sohu.com，***@chinaren.com等';
				break;
			case '3':
				msg += '用户名后缀必须为'+arguments[1];
				break;
			case '4':
				msg += '请输入登录密码';
				break;
			case '5':
				msg += '认证错误。<ul><li>请检查您的用户名和密码是否正确</li><li>如果是17173用户，请注意选择“@17173.com”</li></ul>';
				status = 1;
				break;
			case '6':
				msg += '登录超时，请重试';
				status = 1;
				break;
			case '7':
				msg += '登录失败，请重试';
				status = 1;
				break;
			case '8':
				msg += '网络故障，退出失败，请重新退出';	
				break;
            case '9':
                msg += '登录失败，请稍后重试';
				status = 1;
				break;
			default:
                msg += '登录失败，请稍后重试';
				status = 1;
		}
		if (status == 1) {
			this.showSevError(msg);
		}
		else {
			this.showMsg(msg);
		}
	},
	// blog
	showMsg: function(msg) {
        alert(msg);
	},
	showSevError: function(msg) {
		var errorBox = document.getElementsByClassName('errorBox')[0];
		if (!errorBox) {return;}
		var str = '';
		str += msg;
		errorBox.innerHTML = str;
		Element.show(errorBox);
		try{
			flashErr(errorBox);
		}catch(e){}
	},
	getAppInfo: function(o) {
		flag_gegUserInfo++;
		var dataURL = (getD() && hasBlog())? 'http://'+ getD() +'.blog.sohu.com/service/profile/'+ hasBlog() : 'http://blog.sohu.com/service/profile.jsp?detail=normal';
		if (typeof Blog != 'undefined' && typeof Blog.camp != 'undefined') {
			Blog.camp = null;
		}
		new LinkFile(dataURL, {
								type: 'script',
								noCache: false,
								callBack: {
									variable: 'Blog.camp',
									onLoad: this.showAppInfo.bind(this, o),
									onFailure: this.showAppInfo.bind(this, o)
									/*timeout: 20,
									timerStep: 500*/
								}});
	},
	showAppInfo: function(o) {
		if ((typeof Blog == 'undefined' || typeof Blog.camp == 'undefined' || typeof Blog.camp.profile == 'undefined' || typeof Blog.camp.status == 'undefined' || !Blog.camp.profile) && flag_gegUserInfo<2) {
			this.getAppInfo(o);
			return;
		}
		o = o || document.getElementById(o);
		if (!o) {return;}
		var s = '';
		var ico = getUserIco()? getUserIco() : (Blog.camp.profile? Blog.camp.profile.ico : 'http://img3.pp.sohu.com/ppp/blog/images/common/nobody.gif');
		var entry_count = comment_count = message_count = '?';
		var tip_url = 'http://admin.blog.sohu.com';
		var tip_title = '欢迎来到搜狐博客';
		try{entry_count = Blog.camp.status.entry_count;}catch(e){}
		try{comment_count = Blog.camp.status.comment_count;}catch(e){}
		try{message_count = Blog.camp.status.message_count;}catch(e){}
		try{tip_url = Blog.camp.sysRec.tip.url;}catch(e){}
		try{tip_title = Blog.camp.sysRec.tip.title;}catch(e){}
		s += '<div class="login_ico"><img id="login_icoImg" src="'+ ico +'" alt="'+ (getP() || '头像') +'" /></div>';
		s += '<p class="statusCount">文章:'+ entry_count +'&nbsp;评论:'+ comment_count +'&nbsp;留言:'+ message_count +'</p>';
		s += '<p class="tips"><a href="'+ tip_url +'" target="_blank">'+ tip_title +'</a></p>';
		o.innerHTML = s;
		o.style.display = '';
	}
};
if (typeof PassportSC != 'undefined' && (typeof noRecoverPassportSC == 'undefined' || !noRecoverPassportSC)) {
	PassportSC = Object.extend(PassportSC, (typeof BlogPassportSC != 'undefined'? BlogPassportSC : {}));
}
function logoutApp() {
	BlogCookieInfo.clear();
	var newScript = document.createElement("script");
	newScript.src = 'http://blog.sohu.com/logout.do?noru';
	document.getElementsByTagName('head')[0].appendChild(newScript);
}
