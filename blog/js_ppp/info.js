var Info = {
	messages : {
		'blog.name' : '��������',
		'blog.domain' : '��������',
		'blog.desc' : '��������',
		'blog.detailDesc' : '���˵���',
		'comment.author.name' : '�ƺ�',
		'comment.author.site' : '��վ����',
		'comment.author.email' : '����',
		'comment.content' : '��������',
		'comment.vcode' : '��֤��',
		'message.author.name' : '�ƺ�',
		'message.author.site' : '��վ����',
		'message.author.email' : '����',
		'message.content' : '��������',
		'message.vcode' : '��֤��',
		'entry.title' : '��־����',
		'entry.content' : '��־����',
		'entry.excerpt' : '��־ժҪ',
		'entry.keywords' : '�ؼ���',
		'category.name' : '��������',
		'category.desc' : '��������',
		'mobile.code' : '�ֻ���',
		'mobile.vcode' : '��֤��',
		'module.title' : 'ģ�����',
		'module.data' : 'ģ�����',
		'module.type' : 'ģ������',
		'link.title' : '������������',
		'link.desc' : '������������',
		'link.url' : '�������ӵ�ַ',
		'errors.required' : '{0}����Ϊ��.',
		'errors.minlength' : '{0}�������� {1} ���ַ�',
		'errors.maxlength' : '{0}���ܴ��� {1} ���ַ�',
		'errors.range' : '{0}������{1}���ַ���{2}���ַ�֮��',
		'errors.email' : '{0}����һ����Ч���ʼ���ַ',
		'errors.invalid' : '{0}��Ч.',
		'errors.comment.authorname' : ' �û�������Ϊ��.',
		'errors.comment.commentcontent' : '�������ݲ���Ϊ��.',
		'errors.comment.maxcommentlength' : '�������ݹ��࣬���Ϊ1000��.',
		'errors.comment.maxauthorName' : '�ƺ�����',
		'errors.comment.maxauthorSite' : '��վ���ӹ���',
		'errors.comment.maxcommentContent' : '�������ݹ���',
		'errors.comment.publish.forbidden' : '���߲�����Դ��Ľ�������',
		'errors.comment.publish.nofriforbidden' : '����ֻ�������ĺ��ѿ�����',
		'errors.blog.onlyfriend' : '����ֻ�������ĺ��ѿɲ鿴',
		'errors.comment.publish.needlogin' : '����ֻ�����¼�û��ſɶԴ������ۡ�<a href="http://blog.sohu.com/login/logon.do">��¼</a>',
		'errors.message.authorname' : ' �û�������Ϊ��.',
		'errors.message.commentcontent' : '�������ݲ���Ϊ��.',
		'errors.message.maxcommentlength' : '�������ݹ��࣬���Ϊ1000��.',
		'errors.message.maxauthorName' : '�ƺ�����',
		'errors.message.maxauthorSite' : '��վ���ӹ���',
		'errors.message.maxcommentContent' : '�������ݹ���',
		'errors.message.publish.forbidden' : '���߲����������',
		'errors.message.publish.needlogin' : '����ֻ�����¼�û��ſ����ԡ�<a href="http://blog.sohu.com/login/logon.do">��¼</a>',
		'errors.message.vcode' : ' ��֤�벻��Ϊ��.',
		'errors.entry.entrytitle' : '����д��־����.',
		'errors.entry.maxentrytitle' : '��־�������.',
		'errors.entry.entrycontent' : '����д��־����.',
		'errors.entry.maxentryexcerpt' : 'ժҪ���ȹ���',
		'errors.entry.maxentrykeywords' : '�ؼ��ֹ���',
		'errors.link.unexist' : '�������Ӳ�����',
		'errors.link.reach.limit' : '���ĺ��������Ѿ��ﵽϵͳ����',
		'errors.module.reach.limit' : '����ģ���Ѿ��ﵽϵͳ����',
		'errors.module.attempt.delete.entry' : '����ɾ����־ģ��',
		'errors.general' : '����ʧ��',
		'errors.operate.failure' : '���ݲ���ʧ��',
		'errors.rpc' : '����ʧ�ܣ���ҳ��ʱ������',
		'errors.npe' : 'ϵͳ�ڲ�����',
		'errors.forbidden' : '����ʧ�ܣ������Ƿ�����Ӧ��Ȩ��',
		'errors.param' : '��������',
		'errors.vcode' : '��֤������������������Ƿ���ͼƬ����ʾ����ĸһ��',
		'errors.password' : '������ڼ򵥣�����������',
		'errors.domain.format' : '��������������Ӣ�ĺ�����',
		'errors.domain.exist' : '���������ѱ�ռ��',
		'errors.number.formate' : '������ʽ����',
		'errors.blog.unexis' : '���Ͳ�����',
		'errors.login.user.unexist' : '�û�������',
		'errors.login.auth' : '��֤����<ul style="margin:0px;padding:0px;"><li>�����û����������Ƿ���ȷ��</li><li>�������������Ƿ���ȷ����ʾ�������17173�û�����ע��ѡ��17173�û����',
		'errors.passport.invalid' : '�Ƿ����û���',
		'errors.login' : 'ϵͳ�ڲ��������Ժ�����',
		'errors.activation' : '����ʧ�ܣ���<a href="/login/activation.do">����</a>',
		'errors.auto.activation' : '�Զ�����ʧ�ܣ���<a href="/passport">����</a>',
		'errors.blog.unexist' : '���Ͳ�����',
		'errors.you.have.not.blog' : '����û���Լ��Ĳ���,<a href="/login/reg.do">���ھ�ȥ����</a>',
		'errors.blog.delete' : '���Ȩ�ޱ��ر��ˡ�',
		'errors.entry.unexist' : '����־������',
		'errors.entry.private' : '����־�ѱ�����',
		'errors.archive.unexist' : '�ù鵵������',
		'errors.category.unexist' : '�÷��಻����',
		'errors.mobile.invalidvcode' : '���������֤�벻��ȷ��',
		'errors.mobile.mobilecode' : '�ֻ��Ų���Ϊ��',
		'errors.mobile.binding' : '���ֻ���{0}�ѱ���',
		'errors.keyword.rewrite' : '����������ݰ������йؼ��֣���������д��',
		'errors.entry.contribute.duplicate' : '�Բ���,���Ѿ�Ͷ������,��һƪ���԰�',
		'errors.not.ppp' : '����û����������Ū��,�޷�������һ������, ���ھ�<a href="http://blog.sohu.com/manage/upgrade.do">����</a>?',
		'messages.general' : '�����ɹ�',
		'messages.setting.saved' : '�����޸ĳɹ�',
		'messages.theme.saved' : '�����޸ĳɹ���������<a href="{0}" target="_blank">�������</a>�鿴�޸ĺ�Ľ��',
		'messages.flash.saved' : 'Flash��Ч�޸ĳɹ���������<a href="{0}" target="_blank">�������</a>�鿴�޸ĺ�Ľ��',
		'messages.layout.saved' : 'ҳ�沼���޸ĳɹ���������<a href="{0}" target="_blank">�������</a>�鿴�޸ĺ�Ľ��',
		'messages.entry.saved' : '<div class="noticeInfo"><h3>��־����ɹ�</h3><div id="autoDir"></div></div><div class="moreInfo"><p>���������ԣ�</p><ul><li id="defautAction"><a href="/manage/entry.do?m=edit&id={0}">�����༭</a></li><li><a href="/manage/entry.do?m=list&t=draft">ת���ݸ��б�ҳ��</a></li><li><a href="/manage/entry.do?m=add">׫д��һƪ����־</a></li></ul></div>',
		'messages.entry.published' : '<div class="noticeInfo"><h3>��־�����ɹ�</h3><div id="autoDir"></div></div><div class="moreInfo"><p>�����Ƽ�����<ul><li><a href="http://q.sohu.com" target="_blank" style="font-size:14px;font-weight:bold;color:red">����Ѻ�Ȧ��</a>&nbsp;<img src="http://js1.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_new.gif" alt="�¹��ܣ�" title="�¹��ܣ�" /></li></ul></p><div class="clear"></div><p>���������ԣ�</p><ul><li id="defautAction"><a href="/manage/entry.do">ת����־�б�ҳ��</a></li><li><a href="{0}">�鿴���շ������־</a></li><li><a href="/manage/entry.do?m=add">׫д��һƪ����־</a></li></ul></div>',
		'messages.entry.shortcutpublished' : '<div class="noticeInfo"><h3>��־�����ɹ�</h3><div id="autoDir"></div></div><div class="moreInfo"><p>�����Ƽ�����<ul><li><a href="http://q.sohu.com" target="_blank" style="font-size:14px;font-weight:bold;color:red">����Ѻ�Ȧ��</a>&nbsp;<img src="http://js1.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_new.gif" alt="�¹��ܣ�" title="�¹��ܣ�" /></li></ul></p><div class="clear"></div><p>���������ԣ�</p><ul><li id="defautAction"><a href="javascript:closeWin();">�رձ�ҳ</a></li><li><a href="{1}">�鿴�ҵĲ�����ҳ</a></li><li><a href="{0}">�鿴���շ������־</a></li><li><a href="/manage/entry.do?m=add&t=shortcut">׫д��һƪ����־</a></li></ul></div>',
		'messages.entry.shortcutsaved' : '<div class="noticeInfo"><h3>��־����ɹ�</h3><div id="autoDir"></div></div><div class="moreInfo"><p>���������ԣ�</p><ul><li id="defautAction"><a href="/manage/entry.do?m=edit&id={0}&t=shortcut">�����༭</a></li><li><a href="/manage/entry.do?m=list&t=draft">ת���ݸ��б�ҳ��</a></li><li><a href="/manage/entry.do?m=add&t=shortcut">׫д��һƪ����־</a></li></ul></div>',
		'messages.entry.updated' : '<div class="noticeInfo"><h3>��־�޸ĳɹ�</h3><div id="autoDir"></div></div><div class="moreInfo"><p>���������ԣ�</p><ul><li id="defautAction"><a href="{0}">�鿴�����޸ĵ���־</a></li><li><a href="/manage/entry.do">ת����־�б�ҳ��</a></li></ul></div>',
		'messages.entry.shortcutupdated' : '<div class="noticeInfo"><h3>��־�޸ĳɹ�</h3><div id="autoDir"></div></div><div class="moreInfo"><p>���������ԣ�</p><ul><li id="defautAction"><a href="javascript:closeWin();">�رձ�ҳ</a></li><li><a href="{0}">�鿴�����޸ĵ���־</a></li><li><a href="{1}">�鿴�ҵĲ���</a></li></ul></div>',
		'messages.blog.upgraded' : '<div class="noticeInfo"><h3>��ϲ���������ɹ���</h3><div id="autoDir"></div></div><div class="moreInfo"><p>���������ԣ�</p><ul><li id="defautAction"><a href="{0}">�鿴�ҵĲ���</a></li><li><a href="javascript:closeWin();">�رձ�ҳ</a></li></ul></div>',
		'messages.video.upgraded' : '<div class="noticeInfo"><h3>��ϲ�������óɹ���</h3><div id="autoDir"></div></div><div class="moreInfo"><p>���������ԣ�</p><ul><li id="defautAction"><a href="{0}">�鿴�ҵĲ���</a></li><li><a href="javascript:closeWin();">�رձ�ҳ</a></li></ul></div>',
		'messages.blog.down' : '<div class="noticeInfo"><h3>�����ɹ�����л��������</h3><div id="autoDir"></div></div><div class="moreInfo"><p>���������ԣ�</p><ul><li id="defautAction"><a href="{0}">�鿴�ҵĲ���</a></li><li><a href="javascript:closeWin();">�رձ�ҳ</a></li></ul></div>',
		'messages.entry.private' : '����־�ѱ�����,ֻ�����Լ����ܿ���',
		'messages.entry.deleted' : '��־ɾ���ɹ�',
		'messages.comment.published' : '���۷���ɹ�',
		'messages.comment.deleted' : '����ɾ���ɹ�',
		'messages.comment.checked' : '������˳ɹ�',
		'messages.message.published' : '���Է���ɹ�',
		'messages.message.deleted' : '����ɾ���ɹ�',
		'messages.message.checked' : '������˳ɹ�',
		'messages.category.saved' : '<div class="noticeInfo"><h3>����"{0}"����ɹ�</h3><div id="autoDir"></div></div><div class="moreInfo"><p>���������ԣ�</p><ul><li id="defautAction"><a href="/manage/category.do">�����б�</a></li><li><a href="manage/category.do?m=add">�����·���</a></li></ul></div>',
		'messages.category.updated' : '<div class="noticeInfo"><h3>����"{0}"���³ɹ�</h3><div id="autoDir"></div></div><div class="moreInfo"><p>���������ԣ�</p><ul><li id="defautAction"><a href="/manage/category.do">�����б�</a></li><li><a href="manage/category.do?m=add">�����·���</a></li></ul></div>',
		'messages.category.deleted' : '����"{0}"ɾ���ɹ�',
		'messages.category.added' : '<div class="noticeInfo"><h3>����"{0}"��ӳɹ�</h3><div id="autoDir"></div></div><div class="moreInfo"><p>���������ԣ�</p><ul><li id="defautAction"><a href="/manage/category.do">�����б�</a></li><li><a href="manage/category.do?m=add">�����·���</a></li></ul></div>',
		'messages.profile.saved' : '�����޸ĳɹ�',
		'messages.entry.contributed' : 'Ͷ��ɹ���\n�������־��¼�ã����ᱻչʾ����ӦƵ����Ŀ�С�ͬʱ����Ա�������Է�ʽ֪ͨ����',
		'messages.mobile.setsuccess' : '���óɹ���������ͨ�����ŷ������ռ���<br /><a href="/manage/mobile.do">����</a>',
		'messages.mobile.cancelsuccess' : '�����ֻ����ͷ����Ѿ�ȡ��!<br /><a href="/manage/mobile.do">����</a>',
		'messages.category.added.short' : '���ౣ��ɹ�',
		'messages.category.updated.short' : '������³ɹ�'
	},
	getCookie : function (name){
		var tmp, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)","gi");
		if( tmp = reg.exec( unescape(document.cookie) ) )
			return(tmp[2]);
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
		if(tmp)	return tmp;
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
}