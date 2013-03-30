/******* Links Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-08-08
//	Last Update: 2006-08-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var messages = function(m_data, m_content, m_edit){
	var submitUrl = 'http://i.sohu.com/a/guestbook/oldBlogAddReply.htm';
	var request_messages;
	var elmOutput;
	var elmTip;
	var vcode;
	var delingId;
	var MSG_PREFIX = 'msg_';
	var RPL_PREFIX = 'rpl_';

	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		request_latest_comments = null;
		Element.remove(elmOutput);
	};
	this.build = function() {
		if (App.Permit.editModule) {
			elmTip = document.createElement('div');
			elmTip.innerHTML = '<div style="border: 2px solid #ccc; margin:5px 0; padding: 10px 10px 10px 30px;color:#666; background-color: #FFFFE1; background-image: url(http://js.pp.sohu.com/ppp/images/icons/ico_info.gif); background-position: 7px 10px; background-repeat: no-repeat;"> 友情提醒：搜狐博客管理员的正确地址为<a style="color:#104D6C;" href="http://admin.blog.sohu.com" target="_blank">http://admin.blog.sohu.com</a>，其他都是冒牌。警惕虚假中奖信息，<a style="color:#104D6C;" href="http://admin.blog.sohu.com/94492353.html" target="_blank">点击查看详情</a>。</div>';
			m_content.appendChild(elmTip);
		}
		
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		m_content.appendChild(elmOutput);
	};
	this.updateData = function() {
		var me = this;
		var requestUrl = 'http://i.sohu.com/a/guestbook/oldblog.htm';

		elmOutput.innerHTML = App.Lang.loadModuleData;
		requestUrl += '?xpt=' + _upt + '&callback=?';
		jQuery.getJSON(requestUrl, function(json) {
			var ary = [], len = json.msg.length;

			if(json.code === -2) {
				showErrMsg('对方仅允许TA跟随的人查看');
				return;
			}
			if (len > 0) {
				me.showContent(json.msg);
			} else {
				showErrMsg('暂无留言');
			}
			
		});

		function showErrMsg(msg) {
			var ary = [];
			ary.push('<div class="msg">' + msg + '</div>');
			me.setTitle(App.Lang.error);
			ary = ary.concat(me.giveMeMessage());
			elmOutput.innerHTML = ary.join('');
		}
		
	};
	this.showContent = function(msg) {
		var ary = [];
		for(var i=0, len=msg.length; i<len; i++) {
			ary.push(this.buildOne(msg[i]));
		}
		ary = ary.concat(this.giveMeMessage());
		elmOutput.innerHTML = ary.join('');
		setTimeout(this.insertMsgOpr.bind(this), 10);
		setTimeout(this.insertReplyOpr.bind(this), 10);
		setTimeout(this.initCandleMen.bind(this), 10);
	};
	this.giveMeMessage = function() {
		var ary = [];
		var allCommentUrl = 'http://i.sohu.com/p/' + _upt + '/guestbook/index.htm';
		ary.push('<div class="moreMsgs"><a target="_blank" href="' + allCommentUrl + '">阅读全部留言&gt;&gt;</a></div>');
		ary.push('<div class="writeMsg"><a target="_blank" href="' + allCommentUrl + '" title="给我留言"><img align="absbottom" src="http://js.pp.sohu.com/ppp/blog/styles_ppp/images/ico_write_message.gif">给我留言</a></div>');
		return ary;
	};
	this.buildOne = function(obj) {
		var ary = [],
			nick = obj.mnick || '',
			passport = obj.mpasspost || '';
		ary.push('<div class="msg"><div class="msgOpr" msgid="' + obj.mid + '"></div>');
		ary.push('<div class="aName"><div style="padding-top:3px;">');
		ary.push('<a title="' + obj.mdomain + '" target="_blank" href="' + obj.mdomain + '">' + nick + '</a>');
		ary.push('<a param="' + obj.mxpt + ';' + nick + '" rel="' + passport + ';' + nick + '" ');
		ary.push('name="onlineIcon" href="javascript:void(0)" _webim_ppid="' + passport + '">');
		ary.push('<img src="http://images.sohu.com/cs/sohuim/em/user_off_0.gif" style="height:12px;border:0px none;"></a>');
		ary.push('<br>' + obj.mdate + '</div></div>');
		ary.push('<div class="content">' + obj.mcontent + '</div>');
		ary.push('<div style="display:none;" class="rplFormBox"></div>');
		ary.push(this.buildReply(obj));
		ary.push('</div>');
		return ary.join('');
	};
	this.buildReply = function(obj) {
		var ary = [];
		if(obj.rid) {
			ary.push('<div class="reply"><div class="rplOpr" rplid="' + obj.rid + '"></div>');
			ary.push('<div class="raName"><a target="_blank" href="' + obj.rdomain + '">' + obj.rnick + '</a>回复：<br>' + obj.rdate + '</div>');
			ary.push('<div class="rContent">' + obj.rcontent + '</div></div>');
		}
		return ary.join('');
	};
	this.insertMsgOpr = function() {
		if(App.Permit.editModule) {			
			msgs = document.getElementsByClassName('msgOpr', elmOutput);
			$A(msgs).each(function(m) {
				var msgId = m.getAttribute('msgid');
				if ( msgId ) {
					var str = '';
					str += '<img src="http://img3.pp.sohu.com/ppp/blog/styles_ppp/images/ico_reply.gif" title="回复" />';
					str += '<img src="http://img3.pp.sohu.com/ppp/blog/styles_ppp/images/ico_del.gif" title="删除" />';
					if (!m.innerHTML) {
						m.innerHTML = str;
					}
					this.eventRplMsg = this.rplMsg.bind(this, msgId, m);
					Event.observe(m.firstChild, 'click', this.eventRplMsg);
					this.eventDelMsg = this.delMsg.bind(this, 'msg', msgId, m);
					Event.observe(m.lastChild, 'click', this.eventDelMsg);

				}
			}.bind(this));
		}
	};
	this.insertReplyOpr = function() {
		if (App.Permit.editModule) {
			rpls = document.getElementsByClassName('rplOpr', elmOutput);
			$A(rpls).each(function(r) {
				var rid = r.getAttribute('rplid');
				var mid = jQuery(r.parentNode.parentNode).children().attr('msgid');
				var str = '';
				str += '<img src="http://img3.pp.sohu.com/ppp/blog/styles_ppp/images/ico_del.gif" title="删除" />';
				if (!r.innerHTML) {
					r.innerHTML = str;
				}
				this.eventDelRpl = this.delMsg.bind(this, 'reply', rid, r, mid);
				Event.observe(r.lastChild, 'click', this.eventDelRpl);
				
			}.bind(this));
		}
	};
	this.initCandleMen = function() {
		SohuIM.setCandleMenParam();
		try {
			if (typeof sohuim != undefined && sohuim && sohuim.candleArmy && sohuim.candleArmy.RenderAll) {
				sohuim.candleArmy.RenderAll(webim_config.cm_container, webim_config.product);
			}
		}catch(e){}
	};
	this.rememberMyCName = function () {
		if (this.rememberme && this.rememberme.checked) {
			setCookie('authorName', $F(this.authorName), 'never', '/', 'blog.sohu.com');
			setCookie('authorEmail', $F(this.authorEmail), 'never', '/', 'blog.sohu.com');
			setCookie('authorSite', $F(this.authorSite), 'never', '/', 'blog.sohu.com');
			setCookie('rememberme', $F(this.rememberme), 'never', '/', 'blog.sohu.com');
		}
		else {
			setCookie('authorName', '', 'never', '/', 'blog.sohu.com');
			setCookie('authorEmail', '', 'never', '/', 'blog.sohu.com');
			setCookie('authorSite', '', 'never', '/', 'blog.sohu.com');
			setCookie('rememberme', '', 'never', '/', 'blog.sohu.com');
		}
	};
	this.showError = function(code, message) {
		alert(Info.htmlInfo(unescape(message),1,' '));
	};
	this.delMsg = function(type, id, m, mid) {
		var opt4popWin = {
			type:		'confirm',
			content:	App.Lang.confirmDelMsg,
			focus:		false,
			okAction:	this.acceptDel.bind(this, type, id, m, mid)
		};
		new PopWin(opt4popWin);
	};
	this.acceptDel = function(type, id, m, mid) {
		LoadBar.show(App.Lang.loading);
		var me = this;
		var url = '';
		if(type=='msg') {
			url = 'http://i.sohu.com/a/guestbook/oldBlogDeleteMessage.htm';
			url += '?messageId=' + id;
			url += '&xpt=' + _upt;
		}else if(type=='reply') {
			url = 'http://i.sohu.com/a/guestbook/oldBlogDeleteReply.htm';
			url += '?replyId=' + id;
			url += '&xpt=' + _upt;
			url += '&messageId=' + mid;
		}
		jQuery.getJSON(url+'&callback=?', function(json){
			LoadBar.hide();
			if(json.status == 1) {
				var divDelingMsg = m.parentNode;
				Element.remove(divDelingMsg);
				divDelingMsg = null;
			}
		});

	};
	this.rplMsg = function(msgId, msgOpr) {
		var divMsg = jQuery(msgOpr).closest('.msg')[0];
		var divRplFromBox = document.getElementsByClassName('rplFormBox', divMsg)[0];
		var divRplBox = document.getElementsByClassName('reply',divMsg)[0];
		var imgRpl = document.getElementsByClassName('msgOpr',divMsg)[0];
		if (divRplFromBox.style.display != 'none') {
			Element.hide(divRplFromBox);
			if (divRplBox) {
				Element.show(divRplBox);
			}
			return;
		}
		Element.show(divRplFromBox);
		if (divRplFromBox.innerHTML == '') {
			var text = '';
			if (divRplBox) {
				var divRplContent = document.getElementsByClassName('rContent',divRplBox)[0];
				var text = getFilterEmotionText(divRplContent.innerHTML.convertHTMLToText());
				Element.hide(divRplBox);
			}
			divRplFromBox.innerHTML = this.getRplForm(msgId, text);
			
			var rplForm = divRplFromBox.getElementsByTagName('form')[0];
			rplForm.onsubmit = this.submitRpl.bind(this, rplForm);
			var rplCls = Form.getInputs(rplForm, 'button')[0] || null;
			if (rplCls) {
				this.eventRplMsg = this.rplMsg.bind(this, msgId, rplForm);
				Event.observe(rplCls, 'click', this.eventRplMsg);
			}
		}
		// 登录且访问的不是自己的博客才显示验证码
		if(_upt!=Base64.encode(PassportSC.cookieHandle())) {
			this.showVcode();
		}
		var rplForm = divRplFromBox.getElementsByTagName('form')[0];
		var rplContent = rplForm.getElementsByTagName('textarea')[0];
		rplContent.select();
		rplContent.focus();
	};
	this.getRplForm = function(id, defaultText) {
		defaultText = defaultText || '';
		var str = '';
		str += '<div class="raName"><span>回复：</span></div>';
		str += '<div class="rContent">';
		str += '<form action="/page/message.do" method="post">';
		str += '<input type="hidden" name="messageId" value="' + id + '" />';
		str += '<textarea name="content" rows="8" class="text" style="width:95%">'+defaultText+'</textarea>';
		str += '<div class="vcodeBox"></div>';
		str += '<input type="submit" value="回 复" class="button-submit"/><input type="button" value="取 消" class="button"/>';
		str += '<form>';
		str += '</div>';
		return str;
	};
	this.showVcode = function() {
		this.vcodeBox = document.getElementsByClassName('vcodeBox')[0];
		if (this.vcodeBox.innerHTML != '') {return;}
		var str = '';
		str += '<input name="usercode" type="text" class="text" value="" size="6" maxlength="6" />&nbsp;';
		str += '<span></span>&nbsp;（请输入图片中的文字）';
		str += '<a href="javascript:void(0)">看不清验证码？</a>';
		this.vcodeBox.innerHTML = str;
		
		var vCodeImgCon = this.vcodeBox.getElementsByTagName('span')[0];
		var vCodeRefresh = this.vcodeBox.getElementsByTagName('a')[0];
		vCodeRefresh.onclick = function() {new VCode(vCodeImgCon);};
		new VCode(vCodeImgCon);
		
		Element.show(this.vcodeBox);
		
		this.vcode = Form.getInputs(this.msgForm, 'text', 'vcode')[0] || null;
	};
	this.submitRpl = function(frm) {
		var rplContent = frm.getElementsByTagName('textarea')[0];

		if($F(rplContent).length == 0){
			alert("回复内容不能为空");
			rplContent.focus();
			return false;
		}
		if($F(rplContent).length > 1000){
			alert("回复内容过多（"+ $F(rplContent).length +"字），最多为1000字");
			rplContent.focus();
			return false;
		}
		if(frm.usercode && frm.usercode.value == '') {
			alert("验证码不能为空");
			frm.usercode.focus();
			return false;
		}
		LoadBar.show();

		var me = this;
		var submitUrl = 'http://i.sohu.com/a/guestbook/oldBlogAddReply.htm';
		submitUrl += '?' + Form.serialize(frm);

		jQuery.getJSON(submitUrl+'&callback=?', function(json){
			if(json.status == 1) {
				me.updateData();
			}else {
				alert(json.statusText || '回复失败，请稍后再试');
			}
			LoadBar.hide();
			
		});
		return false;
	};
};

var VCode = Class.create();
VCode.prototype = {
	initialize: function(container, options) {
		this.container = $(container);
		this.options = Object.extend({
			parameters: '',
			onComplete: this.showVCodeImg.bind(this),
			onFailure: this.reportError.bind(this),
			method: 'get',
			nocache: true
		},options || {});
		this.getVCode();
		
		/*if(VCode.zhVcodeStr){
			this.showZhVCodeImg();
		}else{
			this.getZhVcodeStr();
		}*/
		
	},
	getZhVcodeStr:function(){
		this.zhVcodeUrl = 'http://vcode.blog.sohu.com/vcode/getvcode_js.php';
		var vn = 'vcodestr';
		new LinkFile(this.zhVcodeUrl, {
			type: 'script',
			noCache: true,
			callBack: {
				variable: vn,
				timeout: 5000,
				onLoad: function() {
					VCode.zhVcodeStr = eval(vn);
					this.showZhVCodeImg();
				}.bind(this),
				onFailure:this.reportError.bind(this)
			}});
	},
	showZhVCodeImg:function(){
		var str = '';
		str += '<img src="http://vcode.blog.sohu.com/vcode/vcode_cn.php?vcode='+VCode.zhVcodeStr+'&ctp=1&aflag=1&refresh='+ (new Date()).getTime() +'" alt="验证码" style="vertical-align:text-bottom;height:50px;width:130px;" />';
		str += '<input type="hidden" name="vcodeEn" id="vcodeEn" value="'+ VCode.zhVcodeStr +'" />';
		this.container.innerHTML = str;
	},
	getVCode: function() {
		this.container.innerHTML = '. . . .';
		this.url = '/service/vcode.jsp';
		if (this.options.nocache) {
			this.options.parameters += (this.options.parameters.length>0? '&':'') + 'nocache='+timeStamp();
		}
		var myAjax = new Ajax.Request(this.url, this.options);
	},
	showVCodeImg: function(request) {
		if (!request || !request.responseText) {this.reportError();return;}
		var vCodeEn = request.responseText;
		var str = '';
		str += '<img src="/rand?vcode='+ vCodeEn +'" alt="验证码" style="vertical-align:text-bottom;height:50px;width:130px;" />';
		str += '<input type="hidden" name="vcodeEn" id="vcodeEn" value="'+ vCodeEn +'" />';
		this.container.innerHTML = str;
	},
	reportError: function() {
		alert('读取验证码失败，请尝试重新刷新。');
	}
};
function initCForm() {
	if ($('commentContent') && $F('commentContent')) {
		showC_code();
	}
}
registerWidget('messages');