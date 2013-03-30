/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2009-08-03
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var profile = function(m_data, m_content, m_edit){
	var dataUrl = '/action/ebi_' + _ebi + '-m_view-type_profile/widget/';
	
	var profileUrl = 'http://profile.blog.sohu.com/service/profile.htm';
	var profileVn = 'profile_widget_info';
	
	var profileStr = '';
	
	var request_profile;
	var elmOutput;
	var profileNick = '';
	
	//焦点博客相关 start
	//_xpt = 'ZjI2MTk2MEBmb2N1cy5jbg==';
	var focusPassport = b64_decodex(_xpt);
	var focusUrl = 'http://blog.focus.cn/sohu_json/sohu_blog_rongyu.php';
	var focusVn = 'focus_blog_info';
	var focusStr = '';
	var focusOutput;
	

	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		request_profile = null;
		Element.remove(elmOutput);
		if (focusPassport.indexOf('@focus.cn')> -1){
			Element.remove(focusOutput);
		}
	};
	
	this.build = function() {
		if(App.Permit.editModule){
			var divMng = document.createElement('div');
			Element.addClassName(divMng, 'profileMng');
			var str = '';
			str += '<a href="http://i.sohu.com/profile/home/swfUploadIcon.htm" target="_blank" onmousedown="CA.q(\'blog_widget_profile_manage\');">';
			str += '管理';
			str += '</a>';
			divMng.innerHTML = str;
			m_content.appendChild(divMng);
		}
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
		
		//判断是焦点博客用户，加入焦点博客内容
		if (focusPassport.indexOf('@focus.cn')> -1){
			focusOutput = document.createElement('div');
			Element.addClassName(focusOutput, 'focus_01');
			focusOutput.innerHTML = App.Lang.loading;
		
			m_content.appendChild(focusOutput);
		}
	};
	this.updateData = function(noCache) {
		if ($('profileData')) {
			elmOutput.innerHTML = $('profileData').innerHTML;
			$('profileData').innerHTML = '';
			Element.remove($('profileData'));
			this.setProfileStr();
		}
		else {
			elmOutput.innerHTML = App.Lang.loadModuleData;
			var options = {
				nocache: noCache,
				onComplete: this.showContent.bind(this)
			};
			request_profile = new App.ImpFile(dataUrl, options);
		}
		
		window[profileVn] = null;
		new Groj(this.getProfileUrl(noCache), {
			variable: profileVn,
			onSuccess: this.getProfile.bind(this),
			onFailure: this.notGetProfile.bind(this)
		});
		
		//判断是焦点博客用户，加入焦点博客内容
		if (focusPassport.indexOf('@focus.cn')> -1){
  		window[focusVn] = null;
  		new Groj(this.getFocusUrl(noCache), {
  			variable: focusVn,
  			onSuccess: this.getFocus.bind(this),
  			onFailure: this.notGetFocus.bind(this)
  		});
		}		
	};
	this.setProfileStr = function() {
		var profileListEle = null;
		if (profileStr && (profileListEle = $(elmOutput).down('.profile_list', 0))) {
			profileListEle.innerHTML = profileStr;
		}
		
		if($('profile_widget_nick')) {
			$('profile_widget_nick').innerHTML = profileNick;
		}
	};
	this.getProfile = function(json) {
		if (json.status != 0 || !json.data) {
			this.notGetProfile(json);
			return;
		}
		var data = json.data;
		var str = [];
		//str.push('昵称：' + this.getInfo(data.nick, null, 'nick') + '<br />');
		if (typeof(data.name) != "undefined") str.push('<b>姓名</b>：' + this.getInfo(data.name) + '<br />');
		if (typeof(data.sex) != "undefined") str.push('<b>性别</b>：' + this.getInfo(data.sex, null, 'sex') + '<br />');
		//if (typeof(data.age) != "undefined") str.push('<b>年龄</b>：' + this.getInfo(data.age, null, 'age') + '<br />');
		if (typeof(data.provinceId) != "undefined" || typeof(data.cityId) != "undefined") {
			str.push('<b>居住地</b>：');
			if (data.province || data.city) {
				if (data.province) {
					str.push(this.getInfo(data.province, 'http://i.sohu.com/app/friend/#/a/app/friend/search/find.do?type=3&provinceid=' + data.provinceId, 'city') + '&nbsp;');
				}
				if (data.city) {
					str.push(this.getInfo(data.city, 'http://i.sohu.com/app/friend/#/a/app/friend/search/find.do?type=3&cityid=' + data.cityId + (data.provinceId ? ('&provinceid=' + data.provinceId) : ''), 'city'));
				}
			} else {
				str.push(this.getInfo(null, 'http://i.sohu.com/profile/home/basic.htm?from=blog'));
			}
			profileStr = str.join('');
		}
		if(typeof(data.nick) != "undefined") profileNick = data.nick;
		this.setProfileStr();
	};
	this.getInfo = function(info, link, type) {
		if (info) {
			switch (type) {
				case "sex":
					if (info == "男") return '' + info + '';
					else if (info == "女") return '' + info + '';
					break;
				case "age":
					if (!isNaN(info)) return '<a href="http://profile.blog.sohu.com/gjsearch.htm?ageBegin=' + info + '&ageEnd=' + info + '" target="_blank">' + info + '</a>';
					break;
				case "city":
					return '<a href="' + link + '" target="_blank">' + info + '</a>';
					break;
			}
			return info;
		}
		else {
			var str = '未填写';
			if (!link) link = 'http://i.sohu.com/profile/home/basic.htm?from=blog';
			if (App.Permit.editModule) str = '<a href="' + link + '" target="_blank">' + str + '</a>'
			return str;
		}
	};
	this.notGetProfile = function(error) {
		profileStr = !!error ? (error.status == 4 ? '' : error.statusText) : App.Lang.fileNotFound;
		this.setProfileStr();
	};
	this.showContent = function(request_profile) {
		if (request_profile.responseText == '') {
			this.setTitle(App.Lang.error);
			elmOutput.innerHTML = App.Lang.analyseFileError;
			return;
		}
		elmOutput.innerHTML = request_profile.responseText;
		if (App.Permit.editModule) {
			$(elmOutput).down('.profile_content', 0).down(0).show();
		}
		this.setProfileStr();
	};
	this.getProfileUrl = function(cache) {
		return profileUrl + '?xp=' + _upt + '&vn=' + profileVn + (cache ? ('&t' + Time.now()) : '');
	};
	
	//焦点博客相关
	this.getFocus = function(json) {
		if (json.status != 1) {
			this.notGetFocus(json);
			return;
		}
		var data = json.data;
		var imgData = json.img;
		var moreUrl = json.moreurl;
		if (moreUrl != '')
			moreUrl = '<a href="' + moreUrl + '" target="_blank">更多 &raquo;</a>';
		focusStr += '\
				<div class="focus_title">焦点荣誉</div>\
					<div align="center" class="focus_02">\
					<table border="0" cellpadding="0" cellspacing="0">';
    if (typeof(data) == "undefined"){
    	focusStr += '<tr><td></td></tr>';	
    }else{
  		for (var i=0;i<data.length;i++){
  			var eleData = data[i];
  			var icon = eleData.icon;
  			var name = eleData.name;
  			var content = eleData.content;
  			var link = eleData.link;
  			if (name == '' || content == '')
  				continue;
  			if (icon == '')
  				icon = 'http://zt.blog.sohu.com/upload/gmfocus/images/icon_df.gif';
  			if (link != '')
  				content = '<a href="' + link + '" target="_blank">' + content + '</a>';
  			focusStr += '\
          <tr>\
            <td width="16" valign="top"><img alt="' + name + '" src="' + icon + '"/></td>\
            <td valign="top" class="focus_l">' + name + '： </td>\
            <td class="focus_r">' + content + '</td>\
          </tr>';	
  		}
		}
		focusStr += '\
      	</table>\
      </div>\
      <div class="focus_03 clear">\
        <ul class="focus_pic fix" style="margin-top: 0px; margin-bottom: 0px;">';
		
		if (typeof(imgData) == 'undefined'){
			focusStr += '';	
		}else{
  		for (var j=0;j<imgData.length;j++){
  			var eleData = imgData[j];
  			var imgStr = eleData.image;
  			var imgUrl = eleData.imageurl;
  			var imgName = eleData.imagename;
  			if (imgStr == '')
  				continue;
  			if (imgUrl == '')
  				focusStr += '<li><img alt="' + imgName + '" src="' + imgStr + '" border="0" alt="' + imgName + '" width="65" height="65"/></li>';
  			else
  				focusStr += '<li><a href="' + imgUrl + '" target="_blank" title="' + imgName + '"><img src="' + imgStr + '" width="65" height="65" border="0"/></a></li>';
  		}
		}
		focusStr += '\
        </ul>\
      </div>\
      <div class="focus_more">' + moreUrl + '</div>\
    </div>';

		focusOutput.innerHTML = focusStr;
	};
	this.notGetFocus = function(error) {
		//focusStr = !!error ? (error.status == 4 ? '' : error.statusText) : App.Lang.fileNotFound;
		//focusOutput.innerHTML = focusStr;
		Element.remove(focusOutput);
	};
	
	this.getFocusUrl = function(cache) {
		return focusUrl + '?xp=' + _xpt + '&vn=' + focusVn + (cache ? ('&t' + Time.now()) : '');
	};
	
};
registerWidget('profile');