var camp_passport = function(m_data, m_content, m_edit, w_path){
	var dataPath = camp_apis['passport_profile'];
	//var dataPath = '/passport.js';
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
		try{
			eval("Passport.camp=null");
		}catch(e){}
		this.updateData(true);
	};
	this.build = function() {
		elmBanner = document.createElement('div');
		elmBanner.className = 'banner banner_small';
		elmBanner.innerHTML = '<a href="http://passport.sohu.com/" target="_blank"><img src="' + w_path + 'banner_small.gif" alt="�Ѻ�ͨ��֤" /></a>';
		
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmBanner);
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		/*if (noCache) {
			PassportSC.parsePassportCookie();
		}
		if (!getProduct('passport')) {
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
									variable: 'Passport.camp',
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
		if (!Passport.camp.profile) {
			this.showContentNotUse();
			return;
		}
		var str = '';
		str += '<div class="profile">';
		str += '<div class="desc">';
		str += '�Ѻ�ͨ��֤��'+ Passport.camp.profile.passport +'<br />';
		str += '������'+ Passport.camp.profile.name +'<br />';
		str += '���գ�'+ Passport.camp.profile.birthday +'<br />';
		str += '�������䣺'+ Passport.camp.profile.mail +'<br />';
		str += '</div>';
		str += '</div>';
		
		/*if (Passport.camp.links.service && Passport.camp.links.service.length>0) {
			str += '<div class="act">';
			str += '<h5>��ʹ�õ��Ѻ�����</h5>';
			str += '<ul>';
			$A(Passport.camp.links.service).each(function(a) {
				str += '<li><a href="'+ a.url +'" target="_blank">'+ a.dis +'</a></li>';
			});
			str += '</ul>';
			str += '</div>';
		}*/
		
		str += '<div class="nav">';
		for(var i = 0; i < Passport.camp.links.nav.length; i++){
			str += '<a href="' + Passport.camp.links.nav[i].url +'" target="_blank">' + Passport.camp.links.nav[i].dis + '</a>';
			if (i <  Passport.camp.links.nav.length-1) {
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
		str += '����û�м����Ѻ�ͨ��֤&nbsp;&nbsp;';
		str += '<a href="http://passport.sohu.com" target="_blank">��������&gt;&gt;</a>';
		str += '</div>';
		elmOutput.innerHTML = str;
	};
};
registerWidget('camp_passport');