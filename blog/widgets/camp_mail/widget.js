var camp_mail = function(m_data, m_content, m_edit, w_path){
	var dataPath = camp_apis['mail_profile'];
	//var dataPath = '/mail.js';
	var elmOutput;
	var elmBanner;
	
	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		if (!getProduct('mail')) {
			try{
				PassportSC.renewCookie(document.getElementsByTagName('head')[0]);
			}catch(e){}
		}
		try{
			eval("Mail.camp=null");
		}catch(e){}
		this.updateData(true);
	};
	this.build = function() {
		elmBanner = document.createElement('div');
		elmBanner.className = 'banner'+ (getProduct('mail')?' banner_small':'');
		elmBanner.innerHTML = '<a href="http://mail.sohu.com/" target="_blank"><img src="' + w_path + (getProduct('mail')?'banner_small.jpg':'banner.jpg') +'" alt="搜狐邮箱" /></a>';
		
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmBanner);
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if (noCache) {
			PassportSC.parsePassportCookie();
		}
		if (!getProduct('mail')) {
			this.showContentNotUse();
			return;
		}
		if (getProduct('mail') != 'sohu') {
			this.showContentNotSupport();
			return;
		}
		if (typeof dataPath == 'undefined' || !dataPath) {
			this.noData();
			return;
		}
		var dataURL = dataPath;
		elmOutput.innerHTML = App.Lang.loadModuleData;
		new LinkFile(dataURL, {
								type: 'script',
								noCache: noCache,
								callBack: {
									variable: 'Mail.camp',
									onLoad: this.loadedData.bind(this),
									onFailure: this.noData.bind(this)
									/*timeout: 20,
									timerStep: 500*/
								}});
	};
	this.loadedData = function() {
		this.loaded();
		this.showContent();
	};
	this.noData = function() {
		this.loaded();
		var str = '';
		str += '<div class="profile">';
		str += App.Lang.cannotGetPdtData;
		str += '</div>';
		elmOutput.innerHTML = str;
	};
	
	this.showContent = function() {
		if (!Mail.camp.status) {
			this.showContentNotUse();
			return;
		}
		if (Mail.camp.status.active && Mail.camp.status.active == 'false') {
			this.showNotActive();
			return;
		}
		var str = '';
		str += '<div class="profile">';
		str += '<div class="desc">';
		str += '未读邮件：<a href="http://mail.sohu.com" target="_blank">'+ Mail.camp.status.unread +'封</a>&nbsp;&nbsp;&nbsp;&nbsp;积分：'+ Mail.camp.status.point +'<br />';
		str += '</div>';
		str += '</div>';
		str += '<div class="nav">';
		for(var i = 0; i < Mail.camp.links.nav.length; i++){
			str += '<a href="' + Mail.camp.links.nav[i].url +'" target="_blank">' + Mail.camp.links.nav[i].dis + '</a>';
			if (i <  Mail.camp.links.nav.length-1) {
				str += ' | ';
			}
		}
		str += '</div>';
		
		str += '<div class="unread">';
		str += '<h5>最近收到的信：</h5>';
		if (Mail.camp.links.unread && Mail.camp.links.unread.length>0) {
			str += '<table>';
			$A(Mail.camp.links.unread).each(function(m) {
				str += '<tr>';
				//str += '<td class="ico"><img src="'+ w_path +'ico_mail.gif" alt="" /></td>';
				var _auth = m.auth;
				_auth = m.auth.replace(/\"/gi,'');
				_auth = _auth.replace(/<w*>$/ig, '');
				_auth = _auth.convertTextToHTML();
				str += '<td class="auth"><div title="'+ _auth +'">'+ _auth +'</div></td>';
				str += '<td><a href="'+ m.url +'" target="_blank" title="'+ m.tit +'">'+ m.tit +'</a></td>';
				str += '</tr>';
			});
			str += '</table>';
		}
		else {
			str += '暂无邮件'
		}
		str += '</div>';
		
		if (Mail.camp.links.act && Mail.camp.links.act.length>0) {
			str += '<div class="act">';
			str += '<h5>活动看板：</h5>';
			str += '<ul>';
			$A(Mail.camp.links.act).each(function(a) {
				str += '<li><a href="'+ a.url +'" target="_blank">'+ a.dis +'</a></li>';
			});
			str += '</ul>';
			str += '</div>';
		}
		
		elmOutput.innerHTML = str;
	};
	this.showContentNotUse = function() {
		this.loaded();
		var str = '';
		str += '<div class="profile">';
		str += '您还没有激活搜狐邮箱&nbsp;&nbsp;';
		str += '<a href="http://mail.sohu.com">立即激活&gt;&gt;</a>';
		str += '</div>';
		elmOutput.innerHTML = str;
	};
	this.showContentNotSupport = function() {
		this.loaded();
		var str = '';
		str += '<div class="profile">';
		str += '暂时只支持sohu.com邮箱，<br />chinaren.com和sogou.com邮箱即将推出。';
		str += '</div>';
		elmOutput.innerHTML = str;
	};
	this.showNotActive = function() {
		this.loaded();
		var str = '';
		str += '<div class="profile">';
		str += '由于您的邮箱长时间没有使用，已经被暂时停用。<br />如果希望继续使用，请<a href="http://register.mail.sohu.com/active/Reg2.jsp" target="_blank">重新激活&gt;&gt;</a>';
		str += '</div>';
		elmOutput.innerHTML = str;
	};
};
registerWidget('camp_mail');