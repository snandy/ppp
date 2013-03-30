var camp_blog = function(m_data, m_content, m_edit, w_path){
	var dataPath = camp_apis['blog_profile'];
	var elmOutput;
	
	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		if (!getProduct('blog')) {
			try{
				PassportSC.renewCookie(document.getElementsByTagName('head')[0]);
			}catch(e){}
		}
		if (Blog.camp) {
			eval("Blog.camp=null");
		}
		this.updateData(true);
	};
	this.build = function() {
		elmBanner = document.createElement('div');
		elmBanner.className = 'banner'+ (this.hasBlog()?' banner_small':'');
		elmBanner.innerHTML = '<a href="http://blog.sohu.com" target="_blank"><img src="' + w_path + (this.hasBlog()?'banner_small.jpg':'banner.jpg') +'" alt="搜狐博客" /></a>';

		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;

		m_content.appendChild(elmBanner);
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if (noCache) {
			PassportSC.parsePassportCookie();
		}
		/*if (!getProduct('blog')) {
			this.showContentNotUse();
			return;
		}*/
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
									variable: 'Blog.camp',
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
		if (!Blog.camp.profile) {
			this.showContentNotUse();
			return;
		}
		var str = '';
		str += '<div class="profile">';
		str += '<div class="ico"><a href="'+ Blog.camp.profile.url +'" target="_blank"><img src="' + Blog.camp.profile.ico + '" alt="' + Blog.camp.profile.title + '" /></a></div>';
		str += '<div class="blogtitle"><a href="'+ Blog.camp.profile.url +'" target="_blank">' + Blog.camp.profile.title + '</a></div>';
		str += '<div class="bloglink"><a href="' + Blog.camp.profile.url + '"  target="_blank">' + Blog.camp.profile.url + '</a></div>';
		str += '<div class="blogdesc">' + Blog.camp.profile.desc+ '</div>';
		str += '</div>';
		str += '<div class="action">';
		for(var i = 0; i < Blog.camp.links.action.length; i++){
			str += '<a href="' + Blog.camp.links.action[i].url +'" target="_blank">' + Blog.camp.links.action[i].dis + '</a>';
			if (i <  Blog.camp.links.action.length-1) {
				str += ' | ';
			}
		}
		str += '</div>';
		elmOutput.innerHTML = str;
	};
	this.showContentNotUse = function() {
		this.loaded();
		var str = '';
		str += '<div class="profile">';
		str += '您还没有激活搜狐博客&nbsp;&nbsp;';
		str += '<a href="http://blog.sohu.com/login/activation.do" target="_blank">立即激活&gt;&gt;</a>';
		str += '</div>';
		elmOutput.innerHTML = str;
	};
	this.hasBlog = function(){
		if(!BlogCookieInfo.cookie||!BlogCookieInfo.cookie.I){
			BlogCookieInfo.parseCookie();
		}
		var I=BlogCookieInfo.cookie.I;
		if(I!=null&&I!=""&&I!="null"){
			return I;
		}
		return false;
	};
};
registerWidget('camp_blog');