var camp_xiaonei = function(m_data, m_content, m_edit, w_path){
	var dataPath = camp_apis['xiaonei_profile'];
	//var dataPath = '/i.js';
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
		if (!getProduct('xiaonei')) {
			try{
				PassportSC.renewCookie(document.getElementsByTagName('head')[0]);
			}catch(e){}
		}
		try{
			eval("Xiaonei.camp=null");
		}catch(e){}
		this.updateData(true);
	};
	this.build = function() {
		elmBanner = document.createElement('div');
		elmBanner.className = 'banner'+ (getProduct('xiaonei')?' banner_small':'');
		elmBanner.innerHTML = '<a href="http://i.chinaren.com/" target="_blank"><img src="' + w_path + (getProduct('xiaonei')?'banner_small.gif':'banner.gif') +'" alt="Chinaren 校内" /></a>';
		
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmBanner);
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if (noCache) {
			PassportSC.parsePassportCookie();
		}
		if (!getProduct('xiaonei')) {
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
									variable: 'Xiaonei.camp',
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
		if (!Xiaonei.camp.profile) {
			this.showContentNotUse();
			return;
		}
		var str = '';
		str += '<div class="profile">';
		str += '<div class="ico"><img src="' + Xiaonei.camp.profile.ico + '" alt="' + Xiaonei.camp.profile.title + '" /></div>';
		str += '<div class="uname">' + Xiaonei.camp.profile.title + '</div>';
		str += '<div class="desc">我被关注过：' + Xiaonei.camp.status.attention+ ' 人次</div>';
		str += '</div>';
		str += '<div class="nav">';
		for(var i = 0; i < Xiaonei.camp.links.nav.length; i++){
			str += '<a href="' + Xiaonei.camp.links.nav[i].url +'" target="_blank">' + Xiaonei.camp.links.nav[i].dis + '</a>';
			if (i <  Xiaonei.camp.links.nav.length-1) {
				str += ' | ';
			}
		}
		str += '</div>';
		
		
		str += '<div class="message">';
		str += '<h5>给我的新留言：</h5>';
		if (Xiaonei.camp.status.message && Xiaonei.camp.status.message.length>0) {
			str += '<ul>';
			$A(Xiaonei.camp.status.message).each(function(m) {
				str += '<li><a href="'+ m.userUrl +'" class="name" target="_blank">'+ m.name +'</a><a href="'+ m.url +'" class="msg" target="_blank">'+ m.msg +'</a></li>';
			});
			str += '</ul>';
		}
		else {
			str += '暂无留言';
		}
		str += '</div>';
		
		
		/*str += '<div class="visitor">';
		str += '<h5>最近踩过我地盘的人：</h5>';
		if (Xiaonei.camp.status.visitor && Xiaonei.camp.status.visitor.length>0) {
			$A(Xiaonei.camp.status.visitor).each(function(v) {
				str += '<div class="v"><div class="vico"><a href="'+ v.userUrl +'" target="_blank"><img src="'+ v.ico +'" alt="'+ v.name +'" /></a></div><a href="'+ v.userUrl +'" class="name" target="_blank">'+ v.name +'</a></div>';
			});
		}
		else {
			str += '暂无访客';
		}
		str += '</div>';*/
		
		elmOutput.innerHTML = str;
	};
	this.showContentNotUse = function() {
		this.loaded();
		var str = '';
		str += '<div class="profile">';
		str += '您还没有激活ChinaRen校内&nbsp;&nbsp;';
		str += '<a href="http://i.chinaren.com" target="_blank">立即激活&gt;&gt;</a>';
		str += '</div>';
		elmOutput.innerHTML = str;
	};
};
registerWidget('camp_xiaonei');