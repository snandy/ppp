var camp_alumni = function(m_data, m_content, m_edit, w_path){
	var dataPath = camp_apis['alumni_profile'];
	//var dataPath = '/alumni.js';
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
		if (!getProduct('alumni')) {
			try{
				PassportSC.renewCookie(document.getElementsByTagName('head')[0]);
			}catch(e){}
		}
		try{
			eval("Alumni.camp=null");
		}catch(e){}
		this.updateData(true);
	};
	this.build = function() {
		elmBanner = document.createElement('div');
		elmBanner.className = 'banner'+ (getProduct('alumni')?' banner_small':'');
		elmBanner.innerHTML = '<a href="http://alumni.chinaren.com/" target="_blank"><img src="' + w_path + (getProduct('alumni')?'banner_small.gif':'banner.gif') +'" alt="Chinaren 校友录" /></a>';
		
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmBanner);
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if (noCache) {
			PassportSC.parsePassportCookie();
		}
		if (!getProduct('alumni')) {
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
									variable: 'Alumni.camp',
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
		if (!Alumni.camp.profile) {
			this.showContentNotUse();
			return;
		}
		var str = '';
		str += '<div class="profile">';
		str += '<div class="ico"><img src="' + (Alumni.camp.profile.ico || 'http://img3.pp.sohu.com/ppp/blog/images/common/nobody.gif') + '" alt="' + Alumni.camp.profile.title + '" /></div>';
		str += '<div class="uname">' + Alumni.camp.profile.title + '</div>';
		str += '<div class="desc">我的近况：' + Alumni.camp.profile.situation+ '</div>';
		str += '</div>';
		str += '<div class="nav">';
		for(var i = 0; i < Alumni.camp.links.nav.length; i++){
			str += '<a href="' + Alumni.camp.links.nav[i].url +'" target="_blank">' + Alumni.camp.links.nav[i].dis + '</a>';
			if (i <  Alumni.camp.links.nav.length-1) {
				str += ' | ';
			}
		}
		str += '</div>';
		if (Alumni.camp.links.action) {
			str += '<div class="action">';
				if (Alumni.camp.links.action.uni && Alumni.camp.links.action.uni.length > 0) {
					str += '<h5>我的大学班级：</h5>';
					str += '<ul>';
					$A(Alumni.camp.links.action.uni).each(function(c) {
						str += '<li><a href="'+ c.url +'" target="_blank">'+ c.dis +'</a></li>';
					});
					str += '</ul>';
				}
				if (Alumni.camp.links.action.mid && Alumni.camp.links.action.mid.length > 0) {
					str += '<h5>我的中学班级：</h5>';
					str += '<ul>';
					$A(Alumni.camp.links.action.mid).each(function(c) {
						str += '<li><a href="'+ c.url +'" target="_blank">'+ c.dis +'</a></li>';
					});
					str += '</ul>';
				}
				if (Alumni.camp.links.action.gra && Alumni.camp.links.action.gra.length > 0) {
					str += '<h5>我的小学班级：</h5>';
					str += '<ul>';
					$A(Alumni.camp.links.action.gra).each(function(c) {
						str += '<li><a href="'+ c.url +'" target="_blank">'+ c.dis +'</a></li>';
					});
					str += '</ul>';
				}
				if (Alumni.camp.links.action.nur && Alumni.camp.links.action.nur.length > 0) {
					str += '<h5>我的幼儿园：</h5>';
					str += '<ul>';
					$A(Alumni.camp.links.action.nur).each(function(c) {
						str += '<li><a href="'+ c.url +'" target="_blank">'+ c.dis +'</a></li>';
					});
					str += '</ul>';
				}
				if (Alumni.camp.links.action.other && Alumni.camp.links.action.other.length > 0) {
					str += '<h5>我的其他班级：</h5>';
					str += '<ul>';
					$A(Alumni.camp.links.action.other).each(function(c) {
						str += '<li><a href="'+ c.url +'" target="_blank">'+ c.dis +'</a></li>';
					});
					str += '</ul>';
				}
			str += '</div>';
		}
		elmOutput.innerHTML = str;
	};
	this.showContentNotUse = function() {
		this.loaded();
		var str = '';
		str += '<div class="profile">';
		str += '您还没有激活校友录&nbsp;&nbsp;';
		str += '<a href="http://alumni.chinaren.com" target="_blank">立即激活&gt;&gt;</a>';
		str += '</div>';
		elmOutput.innerHTML = str;
	};
};
registerWidget('camp_alumni');