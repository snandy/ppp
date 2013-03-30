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
		'errors.comment.publish.nofriforbidden' : '博主只允许他的好友可评论',
		'errors.blog.onlyfriend' : '博主只允许他的好友可查看',
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
		'errors.link.unexist' : '友情连接不存在',
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
		'errors.password' : '密码过于简单，请重新输入',
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
		'errors.blog.delete' : '你的权限被关闭了。',
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
		'messages.setting.saved' : '设置修改成功',
		'messages.theme.saved' : '主题修改成功，您可以<a href="{0}" target="_blank">点击这里</a>查看修改后的结果',
		'messages.flash.saved' : 'Flash特效修改成功，您可以<a href="{0}" target="_blank">点击这里</a>查看修改后的结果',
		'messages.layout.saved' : '页面布局修改成功，您可以<a href="{0}" target="_blank">点击这里</a>查看修改后的结果',
		'messages.entry.saved' : '<div class="noticeInfo"><h3>日志保存成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="/manage/entry.do?m=edit&id={0}">继续编辑</a></li><li><a href="/manage/entry.do?m=list&t=draft">转到草稿列表页面</a></li><li><a href="/manage/entry.do?m=add">撰写另一篇新日志</a></li></ul></div>',
		'messages.entry.published' : '<div class="noticeInfo"><h3>日志发布成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>我们推荐您：<ul><li><a href="http://q.sohu.com" target="_blank" style="font-size:14px;font-weight:bold;color:red">逛逛搜狐圈子</a>&nbsp;<img src="http://js1.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_new.gif" alt="新功能！" title="新功能！" /></li></ul></p><div class="clear"></div><p>或者您可以：</p><ul><li id="defautAction"><a href="/manage/entry.do">转到日志列表页面</a></li><li><a href="{0}">查看您刚发表的日志</a></li><li><a href="/manage/entry.do?m=add">撰写另一篇新日志</a></li></ul></div>',
		'messages.entry.shortcutpublished' : '<div class="noticeInfo"><h3>日志发布成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>我们推荐您：<ul><li><a href="http://q.sohu.com" target="_blank" style="font-size:14px;font-weight:bold;color:red">逛逛搜狐圈子</a>&nbsp;<img src="http://js1.pp.sohu.com.cn/ppp/blog/themes_ppp/def/images/ico_new.gif" alt="新功能！" title="新功能！" /></li></ul></p><div class="clear"></div><p>或者您可以：</p><ul><li id="defautAction"><a href="javascript:closeWin();">关闭本页</a></li><li><a href="{1}">查看我的博客首页</a></li><li><a href="{0}">查看您刚发表的日志</a></li><li><a href="/manage/entry.do?m=add&t=shortcut">撰写另一篇新日志</a></li></ul></div>',
		'messages.entry.shortcutsaved' : '<div class="noticeInfo"><h3>日志保存成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="/manage/entry.do?m=edit&id={0}&t=shortcut">继续编辑</a></li><li><a href="/manage/entry.do?m=list&t=draft">转到草稿列表页面</a></li><li><a href="/manage/entry.do?m=add&t=shortcut">撰写另一篇新日志</a></li></ul></div>',
		'messages.entry.updated' : '<div class="noticeInfo"><h3>日志修改成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="{0}">查看您刚修改的日志</a></li><li><a href="/manage/entry.do">转到日志列表页面</a></li></ul></div>',
		'messages.entry.shortcutupdated' : '<div class="noticeInfo"><h3>日志修改成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="javascript:closeWin();">关闭本页</a></li><li><a href="{0}">查看您刚修改的日志</a></li><li><a href="{1}">查看我的博客</a></li></ul></div>',
		'messages.blog.upgraded' : '<div class="noticeInfo"><h3>恭喜您，升级成功！</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="{0}">查看我的博客</a></li><li><a href="javascript:closeWin();">关闭本页</a></li></ul></div>',
		'messages.video.upgraded' : '<div class="noticeInfo"><h3>恭喜您，设置成功！</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="{0}">查看我的博客</a></li><li><a href="javascript:closeWin();">关闭本页</a></li></ul></div>',
		'messages.blog.down' : '<div class="noticeInfo"><h3>降级成功，感谢您的试用</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="{0}">查看我的博客</a></li><li><a href="javascript:closeWin();">关闭本页</a></li></ul></div>',
		'messages.entry.private' : '该日志已被隐藏,只有您自己才能看到',
		'messages.entry.deleted' : '日志删除成功',
		'messages.comment.published' : '评论发表成功',
		'messages.comment.deleted' : '评论删除成功',
		'messages.comment.checked' : '评论审核成功',
		'messages.message.published' : '留言发表成功',
		'messages.message.deleted' : '留言删除成功',
		'messages.message.checked' : '留言审核成功',
		'messages.category.saved' : '<div class="noticeInfo"><h3>分类"{0}"保存成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="/manage/category.do">返回列表</a></li><li><a href="manage/category.do?m=add">创建新分类</a></li></ul></div>',
		'messages.category.updated' : '<div class="noticeInfo"><h3>分类"{0}"更新成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="/manage/category.do">返回列表</a></li><li><a href="manage/category.do?m=add">创建新分类</a></li></ul></div>',
		'messages.category.deleted' : '分类"{0}"删除成功',
		'messages.category.added' : '<div class="noticeInfo"><h3>分类"{0}"添加成功</h3><div id="autoDir"></div></div><div class="moreInfo"><p>或者您可以：</p><ul><li id="defautAction"><a href="/manage/category.do">返回列表</a></li><li><a href="manage/category.do?m=add">创建新分类</a></li></ul></div>',
		'messages.profile.saved' : '档案修改成功',
		'messages.entry.contributed' : '投稿成功。\n如果该日志被录用，将会被展示在相应频道栏目中。同时管理员会以留言方式通知您。',
		'messages.mobile.setsuccess' : '设置成功！您可以通过彩信发表博客日记了<br /><a href="/manage/mobile.do">返回</a>',
		'messages.mobile.cancelsuccess' : '您的手机博客服务已经取消!<br /><a href="/manage/mobile.do">返回</a>',
		'messages.category.added.short' : '分类保存成功',
		'messages.category.updated.short' : '分类更新成功'
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