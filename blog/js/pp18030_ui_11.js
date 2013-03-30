PassportSC._drawLoginForm = function() {
	this.cElement.innerHTML = '<form method="post" onsubmit="return PassportSC.doLogin();" name="loginform"><div class="pptitle">搜狐<b>通行证</b><div class="ppthree">'
			+ PassportSC.cardTitle
			+ '</div></div><div class="ppcontent" id="ppcontid"><ul class="card"><div class="error" id="pperrmsg"></div><li>用户名 <input name="email" type="text" class="ppinput" autocomplete="off" disableautocomplete /></li><li>密　码 <input name="password" type="password" class="ppinput" autocomplete="off" disableautocomplete /></li><dt><span><input name="persistentcookie" type="checkbox" value="1" '
			+ PassportSC.defualtRemPwd
			+ ' />记住密码</span><input type="submit" class="sign" value="登 录" onfocus="this.blur()" src="http://js.sohu.com/passport/images/spacer.gif" alt="登 录" /></dt><dl><a href="'
			+ this.registerUrl
			+ '" target="_blank">注册新用户</a><a href="'
			+ this.recoverUrl
			+ '" target="_blank">忘记密码</a><a href="http://passport.sohu.com/help/" target="_blank">帮助中心</a></dl></ul></div></form>'
};
PassportSC.drawPassportWait = function(A) {
	this.cElement.innerHTML = '<div class="pptitle">搜狐<b>通行证</b><div class="ppthree">'
			+ PassportSC.cardTitle
			+ '</div></div><div class="ppcontent" id="ppcontid"><div class="ppWaitMsg">'
			+ A + "</div></div>"
};
PassportSC._drawPassportCard = function() {
	var E = '<div class="pptitle2"><span>搜狐<b>通行证</b><div class="ppthree">'
			+ PassportSC.cardTitle
			+ '</div></span><a class="exit" href="javascript:PassportSC.doLogout();">退出</a></div><div class="ppcontent" id="ppcontid"><div class="listContA"></div><div class="middle"><ul>';
	if (this.defaultApp != "") {
		E += '<li class="current">' + this.defaultApp + "</li>"
	}
	E += '<li><img src="http://js.sohu.com/passport/images/spacer.gif" alt="去"/></li>';
	for (var D = 0; D < this.bottomRow[0]["length"]; D++) {
		E += '<li><a href="' + this.bottomRow[0][D]["url"]
				+ '" target="_blank">' + this.bottomRow[0][D]["name"]
				+ "</a></li>";
		if (D != (this.bottomRow[0].length - 1)) {
			E += "<li>|</li>"
		}
	}
	E += '</ul></div><div class="bottom"><ul>';
	for (var D = 0; D < this.bottomRow[1]["length"]; D++) {
		E += '<li><a href="' + this.bottomRow[1][D]["url"]
				+ '" target="_blank">' + this.bottomRow[1][D]["name"]
				+ "</a></li>";
		if (D != (this.bottomRow[1].length - 1)) {
			E += "<li>|</li>"
		}
	}
	E += '<li class="dabenying"';
	var B = PassportSC.campUrl + this.appid;
	var C = getStringLen(this.cookie.userid);
	var A = this.cookie.userid.indexOf("@");
	var F = this.cookie.userid.substr(A + 1);
	if (this.domainList.toString().indexOf(F) < 0
			|| C > this.cookie.userid.length) {
		E += ' style="display:none"'
	}
	E += '><a href="' + B + '" target="_blank"><img src="' + PassportSC.campImg
			+ '" alt="' + PassportSC.campImgAlt + '" /></a></li></ul></div>';
	this.cElement.innerHTML = E
};
PassportSC.drawPassportInfo = function() {
	html = "<ul><li>"
			+ this.cookie.userid
			+ '<div class="candle" id="ppdefaultim"></div></li><li><p>欢迎您，您已经成功登录搜狐通行证！ </p></li><li>现在即可畅游搜狐所有服务。</li></ul>';
	this.iElement.innerHTML = html;
	var C = window.ActiveXObject ? true : false;
	if (C) {
		var A = document.getElementById("ppdefaultim");
		var B = this.cookie.userid;
		A.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"  codebase="http://images.chinaren.com/product/webim/mood/mood.swf?UserID='
				+ B
				+ '"   width="220" height="90">    <param name="movie" value="http://images.chinaren.com/product/webim/mood/mood.swf?UserID='
				+ B
				+ '"><param name="wmode" value="transparent"><param name="allowscriptaccess" value="always"> <embed src="http://images.chinaren.com/product/webim/mood/mood.swf?UserID='
				+ B
				+ '" wmode="transparent" quality="high" allowscriptaccess="always" bgcolor="#ffffff" width="220" height="90" type="application/x-shockwave-flash"/></object>'
	}
};