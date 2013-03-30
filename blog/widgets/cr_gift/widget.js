/******* PP Set Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-10-27
//	Last Update: 2006-10-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
var cr_gift = function(m_data, m_content, m_edit){
	var elmOutput;
	var gift;

	var dataHost = 'http://i.chinaren.com';
	var setsListPath = '/json/json_gift.jsp?uid='+_xpt;


	this.initialize = function() {
		this.build();
	};
	this.destroy = function() {
		if (elmOutput) {
			Element.remove(elmOutput);
		}
	};
	this.saveData = function() {
		this.build();
	};
	/*this.refresh = function() {
		this.build(true);
	};*/
	this.build = function(nocache) {
		this.destroy();
		m_content.innerHTML = '';
		if (!gift) {
			elmOutput = document.createElement('div');
			elmOutput.innerHTML = App.Lang.loading;
			m_content.appendChild(elmOutput);
			this.getSetsList();
		}
		else {
			this.getSetsList();
		}
	};


	this.getSetsList = function() {
		var dataURL = dataHost + setsListPath;
		new LinkFile(dataURL, {
					type: 'script',
					callBack: {
						variable: 'resJsGift',
						onLoad: this.showSetsList.bind(this),
						onFailure: this.noSetsList.bind(this)
						/*timeout: 5000
						timerStep: 500*/
					}});
	};
	this.showSetsList = function() {
		var str = '';
		gift=true;
		if (resJsGift=='') {
			elmOutput.innerHTML = App.Lang.noPicQuery;
			return;
		}
		if(App.Permit.editModule){
			str += '<div style="text-align:right;"><a href="http://i.chinaren.com/user/index.jsp#gift" style="font-weight:bold;color:red"  target="_blank">π‹¿Ì¿ÒŒÔ</a></div><br>';
		}
		var desc = '';
		var pic = resJsGift.split(",");
		for(var i=0;i<pic.length-1;i++){
			str += '<div style="border:1px solid #ccc;padding:3px;margin:2px;float:left;width:81px;height:81px;overflow:hidden">';
			str += '<a href="http://i.chinaren.com/user/index.jsp?ef=1&uid='+ _xpt + '" target="_blank" >';
			str += '<img src="http://s2.cr.itc.cn/sns/images/gift/' + pic[i] + '.gif" width="81" />';
			str += '</a>';
			str += '</div>';
		}

		elmOutput.innerHTML = str;


	};

	this.noSetsList = function() {

	};
};
registerWidget('cr_gift');
