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
		elmBanner.innerHTML = '<a href="http://club.sohu.com/" target="_blank"><img src="' + w_path + (getProduct('club')?'banner_small.jpg':'banner.jpg') +'" alt="�Ѻ�����" /></a>';
		
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
		str += '<div class="welcome">��ӭ�� <span class="uname">' + Club.camp.profile.title + '</span> [<a href="'+ Club.camp.profile.editurl +'" target="_blank">�޸ĸ�����Ϣ</a>]</div>';
		str += '<div class="desc">';
		str += '���� <a href="'+ Club.camp.status.msgurl +'" target="_blank">'+ Club.camp.status.msg +'��</a> ������&nbsp;&nbsp;&nbsp;&nbsp;<a href="'+ Club.camp.status.frdurl +'" target="_blank">'+ Club.camp.status.frd +'��</a> ��������<br />';
		str += '��������'+ Club.camp.status.level +'&nbsp;&nbsp;&nbsp;&nbsp;���֣�'+ Club.camp.status.point;
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
		str += '<h5>���ղصİ棺</h5>';
		if (Club.camp.links.fav && Club.camp.links.fav.length>0) {
			str += '<ul>';
			$A(Club.camp.links.fav).each(function(f) {
				str += '<li><a href="'+ f.url +'" target="_blank">'+ f.dis +'</a></li>';
			});
			str += '<li class="morefav">[<a href="'+ Club.camp.links.favmore +'" target="_blank">����</a>]</li>';
			str += '</ul>';
		}
		else {
			str += '�����ղ�';
		}
		str += '</div>';
		
		elmOutput.innerHTML = str;
	};
	this.showContentNotUse = function() {
		this.loaded();
		var str = '';
		str += '<div class="profile">';
		str += '����û�м����Ѻ�����&nbsp;&nbsp;';
		str += '<a href="http://club.sohu.com" target="_blank">��������&gt;&gt;</a>';
		str += '</div>';
		elmOutput.innerHTML = str;
	};
};
registerWidget('camp_club');