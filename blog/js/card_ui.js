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
		arr.push('<td nowrap="nowrap"><label for="email" class="redfont">�û���</label></td>');
		arr.push('<td><input name="email" id="email" type="text" class="text" value="" autocomplete="off" disableautocomplete /></td>');
		arr.push('</tr>');
		arr.push('<tr>');
		arr.push('<td nowrap="nowrap"><label for="password" class="redfont">�ܡ���</label></td>');
		arr.push('<td><input name="password" id="password" type="password" class="text" value="" autocomplete="off" disableautocomplete /></td>');
		arr.push('</tr>');
		arr.push('<tr>');
		arr.push('<td></td>');
		arr.push('<td><input type="submit" class="button-submit" value=" ��  ¼ " /> ����������<a href="/login/reg.do">��������</a><br /><span class="notice" id="submitInfo" style="visibility: hidden">���ڵ�¼�����Ժ򡭡�</span></td>');
		arr.push('</tr>');
		arr.push('<tr>');
		arr.push('<td colspan="2"><label for="save"><input name="persistentcookie" id="save" type="checkbox" />��ס�ҵĵ�¼״̬(�ڹ���������������ô˹���)</label></td>');
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
            var confirm = window.confirm("��������������ڱ���ͨ��֤�ĵ�¼״̬�����ɻ򹫹����������������á�����ȷ�ϱ��β�����");
            if (confirm == false) {
                PassportSC.pcInput.checked = false;
            }
        };

        this.bindSelector(); //��������������� pi18030 ����
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
				msg += '�������¼�û���';
				break;
			case '2':
				msg += '�û�����ʽ����\n�������������ĵ����ʼ���ַ����***@sohu.com��***@chinaren.com��';
				break;
			case '3':
				msg += '�û�����׺����Ϊ'+arguments[1];
				break;
			case '4':
				msg += '�������¼����';
				break;
			case '5':
				msg += '��֤����<ul><li>���������û����������Ƿ���ȷ</li><li>�����17173�û�����ע��ѡ��@17173.com��</li></ul>';
				status = 1;
				break;
			case '6':
				msg += '��¼��ʱ��������';
				status = 1;
				break;
			case '7':
				msg += '��¼ʧ�ܣ�������';
				status = 1;
				break;
			case '8':
				msg += '������ϣ��˳�ʧ�ܣ��������˳�';	
				break;
            case '9':
                msg += '��¼ʧ�ܣ����Ժ�����';
				status = 1;
				break;
			default:
                msg += '��¼ʧ�ܣ����Ժ�����';
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
		var tip_title = '��ӭ�����Ѻ�����';
		try{entry_count = Blog.camp.status.entry_count;}catch(e){}
		try{comment_count = Blog.camp.status.comment_count;}catch(e){}
		try{message_count = Blog.camp.status.message_count;}catch(e){}
		try{tip_url = Blog.camp.sysRec.tip.url;}catch(e){}
		try{tip_title = Blog.camp.sysRec.tip.title;}catch(e){}
		s += '<div class="login_ico"><img id="login_icoImg" src="'+ ico +'" alt="'+ (getP() || 'ͷ��') +'" /></div>';
		s += '<p class="statusCount">����:'+ entry_count +'&nbsp;����:'+ comment_count +'&nbsp;����:'+ message_count +'</p>';
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
