var camp_club = function(m_data, m_content, m_edit, w_path){
	var dataPath = camp_apis['club_profile'];
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
		if (!getProduct('club')) {
			try{
				PassportSC.renewCookie(document.getElementsByTagName('head')[0]);
			}catch(e){}
		}
		try{
			eval("Club.camp=null");
		}catch(e){}
		this.updateData(true);
	};
	this.build = function() {
		elmBanner = document.createElement('div');
		elmBanner.className = 'banner'+ (getProduct('club')?' banner_small':'');
		elmBanner.innerHTML = '<a href="http://club.sohu.com/" target="_blank"><img src="' + w_path + (getProduct('club')?'banner_small.jpg':'banner.jpg') +'" alt="搜狐社区" /></a>';
		
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmBanner);
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if (noCache) {
			PassportSC.parsePassportCookie();
		}
		if (!getProduct('club')) {
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
									variable: 'Club.camp',
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
		if (!Club.camp.profile) {
			this.showContentNotUse();
			return;
		}
		var str = '';
		str += '<div class="profile">';
		str += '<div class="welcome">欢迎您 <span class="uname">' + Club.camp.profile.title + '</span> [<a href="'+ Club.camp.profile.editurl +'" target="_blank">修改个人信息</a>]</div>';
		str += '<div class="desc">';
		str += '您有 <a href="'+ Club.camp.status.msgurl +'" target="_blank">'+ Club.camp.status.msg +'条</a> 新留言&nbsp;&nbsp;&nbsp;&nbsp;<a href="'+ Club.camp.status.frdurl +'" target="_blank">'+ Club.camp.status.frd +'个</a> 好友在线<br />';
		str += '社区级别：'+ Club.camp.status.level +'&nbsp;&nbsp;&nbsp;&nbsp;积分：'+ Club.camp.status.point;
		str += '</div>';
		str += '</div>';
		str += '<div class="nav">';
		for(var i = 0; i < Club.camp.links.nav.length; i++){
			str += '<a href="' + Club.camp.links.nav[i].url +'" target="_blank">' + Club.camp.links.nav[i].dis + '</a>';
			if (i <  Club.camp.links.nav.length-1) {
				str += ' | ';
			}
		}
		str += '</div>';
		
		
		str += '<div class="fav">';
		str += '<h5>我收藏的版：</h5>';
		if (Club.camp.links.fav && Club.camp.links.fav.length>0) {
			str += '<ul>';
			$A(Club.camp.links.fav).each(function(f) {
				str += '<li><a href="'+ f.url +'" target="_blank">'+ f.dis +'</a></li>';
			});
			str += '<li class="morefav">[<a href="'+ Club.camp.links.favmore +'" target="_blank">更多</a>]</li>';
			str += '</ul>';
		}
		else {
			str += '暂无收藏';
		}
		str += '</div>';
		
		elmOutput.innerHTML = str;
	};
	this.showContentNotUse = function() {
		this.loaded();
		var str = '';
		str += '<div class="profile">';
		str += '您还没有激活搜狐社区&nbsp;&nbsp;';
		str += '<a href="http://club.sohu.com" target="_blank">立即激活&gt;&gt;</a>';
		str += '</div>';
		elmOutput.innerHTML = str;
	};
};
registerWidget('camp_club');