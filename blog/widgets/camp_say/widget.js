var camp_say = function(m_data, m_content, m_edit, w_path){
	var dataPath = camp_apis['say_profile'];
	//var dataPath = '/crclub.js';
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
		if (!getProduct('say')) {
			try{
				PassportSC.renewCookie(document.getElementsByTagName('head')[0]);
			}catch(e){}
		}
		try{
			eval("Say.camp=null");
		}catch(e){}
		this.updateData(true);
	};
	this.build = function() {
		elmBanner = document.createElement('div');
		elmBanner.className = 'banner'+ (getProduct('say')?' banner_small':'');
		elmBanner.innerHTML = '<a href="http://bbs.sogou.com/" target="_blank"><img src="' + w_path + (getProduct('say')?'banner_small.gif':'banner.gif') +'" alt="搜狗说吧" /></a>';
		
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmBanner);
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if (noCache) {
			PassportSC.parsePassportCookie();
		}
		if (!getProduct('say')) {
			this.showContentNotUse();
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
									variable: 'Say.camp',
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
		if (!Say.camp.profile) {
			this.showContentNotUse();
			return;
		}
		var str = '';
		str += '<div class="profile">';
		str += '<div class="ico"><img src="' + (Say.camp.profile.ico || 'http://img3.pp.sohu.com/ppp/blog/images/common/nobody.gif') + '" alt="' + Say.camp.profile.name + '" /></div>';
		str += '<div class="uname">' + Say.camp.profile.name + '</div>';
		str += '<div class="desc"><a href="#" target="_blank">我的消息('+ Say.camp.status.message.unread +'/'+ Say.camp.status.message.all +')</a> | <a href="#" target="_blank">个人中心</a></div>';
		str += '</div>';
		
		
		if (Say.camp.link.fav && Say.camp.link.fav.length>0) {
			str += '<div class="fav clearfix">';
			str += '<h5>我光顾的吧：</h5>';
			str += '<ul>';
			$A(Say.camp.link.fav).each(function(f,i) {
				if (i > 6) {throw $break;}
				str += '<li><a href="'+ f.url +'" target="_blank">'+ f.dis +'</a></li>';
			});
			str += '</ul>';
			str += '</div>';
		}

		if (Say.camp.link.admin && Say.camp.link.admin.length>0) {
			str += '<div class="fav clearfix">';
			str += '<h5>我管理的吧：</h5>';
			str += '<ul>';
			$A(Say.camp.link.admin).each(function(f,i) {
				if (i > 6) {throw $break;}
				str += '<li><a href="'+ f.url +'" target="_blank">'+ f.dis +'</a></li>';
			});
			str += '<li class="morefav"><a href="'+ Say.camp.link.admin_more +'" target="_blank">更多&gt;&gt;</a></li>';
			str += '</ul>';
			str += '</div>';
		}
		if (Say.camp.link.join && Say.camp.link.join.length>0) {
			str += '<div class="fav clearfix">';
			str += '<h5>我加入的吧：</h5>';
			str += '<ul>';
			$A(Say.camp.link.join).each(function(f,i) {
				if (i > 6) {throw $break;}
				str += '<li><a href="'+ f.url +'" target="_blank">'+ f.dis +'</a></li>';
			});
			str += '<li class="morefav"><a href="'+ Say.camp.link.join_more +'" target="_blank">更多&gt;&gt;</a></li>';
			str += '</ul>';
			str += '</div>';
		}

		elmOutput.innerHTML = str;
	};
	this.showContentNotUse = function() {
		this.loaded();
		var str = '';
		str += '<div class="profile">';
		str += '您还没有激活搜狗说吧&nbsp;&nbsp;';
		str += '<a href="http://bbs.sogou.com/pc/active?rturl=http://bbs.sogou.com/&sc=&action=active" target="_blank">立即激活&gt;&gt;</a>';
		str += '</div>';
		elmOutput.innerHTML = str;
	};
};
registerWidget('camp_say');