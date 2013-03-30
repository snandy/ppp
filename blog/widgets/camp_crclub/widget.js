var camp_crclub = function(m_data, m_content, m_edit, w_path){
	var dataPath = camp_apis['crclub_profile'];
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
		if (!getProduct('crclub')) {
			try{
				PassportSC.renewCookie(document.getElementsByTagName('head')[0]);
			}catch(e){}
		}
		try{
			eval("CRClub.camp=null");
		}catch(e){}
		this.updateData(true);
	};
	this.build = function() {
		elmBanner = document.createElement('div');
		elmBanner.className = 'banner'+ (getProduct('crclub')?' banner_small':'');
		elmBanner.innerHTML = '<a href="http://club.chinaren.com/" target="_blank"><img src="' + w_path + (getProduct('crclub')?'banner_small.gif':'banner.gif') +'" alt="Chinaren 社区" /></a>';
		
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmBanner);
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if (noCache) {
			PassportSC.parsePassportCookie();
		}
		if (!getProduct('crclub')) {
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
									variable: 'CRClub.camp',
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
		if (!CRClub.camp.profile) {
			this.showContentNotUse();
			return;
		}
		var str = '';
		str += '<div class="profile">';
		str += '<div class="ico"><img src="' + CRClub.camp.profile.ico + '" alt="' + CRClub.camp.profile.title + '" /></div>';
		str += '<div class="uname">' + CRClub.camp.profile.title + '</div>';
		str += '<div class="desc">';
		str += '发帖：' + CRClub.camp.status.post+ ' (<a href="'+ CRClub.camp.status.elite +'" target="_blank">精华</a>，<a href="'+ CRClub.camp.status.rec +'" target="_blank">推荐</a>)';
		str += '&nbsp;&nbsp;&nbsp;&nbsp;回帖：'+ CRClub.camp.status.reply;
		str += '</div>';
		str += '</div>';
		str += '<div class="nav">';
		for(var i = 0; i < CRClub.camp.links.nav.length; i++){
			str += '<a href="' + CRClub.camp.links.nav[i].url +'" target="_blank">' + CRClub.camp.links.nav[i].dis + '</a>';
			if (i <  CRClub.camp.links.nav.length-1) {
				str += ' | ';
			}
		}
		str += '</div>';
		
		
		str += '<div class="recpost">';
		str += '<h5>我最近发表的文章：</h5>';
		if (CRClub.camp.status.recentPost && CRClub.camp.status.recentPost.length>0) {
			str += '<ul>';
			$A(CRClub.camp.status.recentPost).each(function(p) {
				str += '<li><a href="'+ p.url +'" target="_blank">'+ p.dis +'</a></li>';
			});
			str += '</ul>';
		}
		else {
			str += '暂无文章';
		}
		str += '</div>';
		
		
		str += '<div class="fav">';
		str += '<h5>我收藏的版：</h5>';
		if (CRClub.camp.links.fav && CRClub.camp.links.fav.length>0) {
			str += '<ul>';
			$A(CRClub.camp.links.fav).each(function(f) {
				str += '<li><a href="'+ f.url +'" target="_blank">'+ f.dis +'</a></li>';
			});
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
		str += '您还没有激活ChinaRen社区&nbsp;&nbsp;';
		str += '<a href="http://club.chinaren.com" target="_blank">立即激活&gt;&gt;</a>';
		str += '</div>';
		elmOutput.innerHTML = str;
	};
};
registerWidget('camp_crclub');