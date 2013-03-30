var camp_music = function(m_data, m_content, m_edit, w_path){
	var dataPath = camp_apis['music_profile'];
	var elmOutput;
	
	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		if (!getProduct('music')) {
			try{
				PassportSC.renewCookie(document.getElementsByTagName('head')[0]);
			}catch(e){}
		}
		if (Music.camp) {
			eval("Music.camp=null");
		}
		this.updateData(true);
	};
	this.build = function() {
		elmBanner = document.createElement('div');
		elmBanner.className = 'banner'+ (getProduct('music')?' banner_small':'');
		elmBanner.innerHTML = '<a href="http://mbox.sogou.com" target="_blank"><img src="' + w_path + (getProduct('music')?'banner_small.gif':'banner.gif') +'" alt="搜狗音乐盒" /></a>';

		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;

		m_content.appendChild(elmBanner);
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if (noCache) {
			PassportSC.parsePassportCookie();
		}
		if (!getProduct('music')) {
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
									variable: 'Music.camp',
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
		if (!Music.camp.profile) {
			this.showContentNotUse();
			return;
		}
		var str = '';
		str += '<div class="profile">';
		str += '<div class="ico"><img src="' + (Music.camp.profile.ico || 'http://img3.pp.sohu.com/ppp/blog/images/common/nobody.gif') + '" alt="' + Music.camp.profile.name + '" /></div>';
		str += '<div class="blogtitle">' + Music.camp.profile.name + '</div>';
		str += '<div class="bloglink">专辑: '+ Music.camp.status.album_num +'个&nbsp;&nbsp;&nbsp;共收藏: '+ Music.camp.status.album_times +'次</div>';
		str += '</div>';
		
		str += '<div class="action">';
		Music.camp.link.nav.each(function(n,i) {
			str += '<a href="' + n.url +'" target="_blank">' + n.dis + '</a>';
			if (i <  Music.camp.link.nav.length-1) {
				str += ' | ';
			}
		})
		str += '</div>';
		elmOutput.innerHTML = str;
	};
	this.showContentNotUse = function() {
		this.loaded();
		var str = '';
		str += '<div class="profile">';
		str += '您还没有激活搜狗音乐盒&nbsp;&nbsp;';
		str += '<a href="http://mbox.sogou.com/mbox.so" target="_blank">立即激活&gt;&gt;</a>';
		str += '</div>';
		elmOutput.innerHTML = str;
	};
};
registerWidget('camp_music');