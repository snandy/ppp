var camp_pp = function(m_data, m_content, m_edit, w_path){
	var dataURL = camp_apis['pp_profile'];
	var elmOutput;
	
	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		if (!getProduct('pp')) {
			try{
				PassportSC.renewCookie(document.getElementsByTagName('head')[0]);
			}catch(e){}
		}
		try{
			eval("PP.camp=null");
		}catch(e){}
		this.updateData(true);
	};
	this.build = function() {
		elmBanner = document.createElement('div');
		elmBanner.className = 'banner'+ (getProduct('pp')?' banner_small':'');
 		elmBanner.innerHTML = '<a href="http://pp.sohu.com/" target="_blank"><img src="' + w_path + (getProduct('pp')?'banner_small.gif':'banner.gif') +'" alt="图片公园" /></a>';
		
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmBanner);
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if (noCache) {
			PassportSC.parsePassportCookie();
		}
		if (!getProduct('pp')) {
			this.showContentNotUse();
			return;
		}
		if (typeof dataURL == 'undefined' || !dataURL) {
			this.noData();
			return;
		}
		elmOutput.innerHTML = App.Lang.loadModuleData;
		new LinkFile(dataURL, {
								type: 'script',
								noCache: noCache,
								callBack: {
									variable: 'PP.camp',
									onLoad: this.loadedData.bind(this),
									onFailure: this.showContentNotUse.bind(this)
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
		if (!PP.camp.profile) {
			this.showContentNotUse();
			return;
		}
		var str = '';
		str += '<div class="profile">';
		str += '<div class="ico"><a href="'+ PP.camp.profile.userUrl +'" target="_blank"><img src="' + PP.camp.profile.userIco + '" alt="' + PP.camp.profile.ppName + '" /></a></div>';
		str += '<div class="pptitle"><a href="'+ PP.camp.profile.userUrl +'" target="_blank">' + PP.camp.profile.ppName + '</a></div>';
		str += '<div class="ppstatus">专辑:'+ PP.camp.profile.photosetCount +'个&nbsp;&nbsp;&nbsp;&nbsp;图片:' + PP.camp.profile.photoCount + '张</div>';
		str += '</div>';
		str += '<div class="action">';
		for(var i = 0; i < PP.camp.links.userLinks.length; i++){
			str += '<a href="' + PP.camp.links.userLinks[i].href +'" target="_blank">' + PP.camp.links.userLinks[i].display + '</a>';
			if (i <  PP.camp.links.userLinks.length-1) {
				str += ' | ';
			}
		}
		str += '</div>';
		
		
		str += '<div class="message">';
		str += '<h5>最新评论：</h5>';
		if (PP.camp.status.usercomments && PP.camp.status.usercomments.length>0) {
			str += '<ul>';
			$A(PP.camp.status.usercomments).each(function(m) {
				str += '<li><a href="'+ m.url +'" target="_blank">'+ m.text.replace('<br />','').unescapeHTML() +'</a></li>';
			});
			str += '</ul>';
		}
		else {
			str += '暂无评论';
		}
		str += '</div>';


		/*str += '<div class="visitor">';
		str += '<h5>最近踩过我相册的人：</h5>';
		if (PP.camp.status.visitors && PP.camp.status.visitors.length>0) {
			$A(PP.camp.status.visitors).each(function(v) {
				str += '<div class="v"><div class="vico"><a href="'+ v.url +'" target="_blank"><img src="'+ v.ico +'" alt="'+ v.nick +'" /></a></div><a href="'+ v.url +'" class="name" target="_blank">'+ v.nick +'</a></div>';
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
		str += '您还没有激活图片公园&nbsp;&nbsp;';
		str += '<a href="http://pp.sohu.com/passport" target="_blank">立即激活&gt;&gt;</a>';
		str += '</div>';
		elmOutput.innerHTML = str;
	};
};
registerWidget('camp_pp');