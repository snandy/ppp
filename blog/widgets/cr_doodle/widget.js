/******* PP Set Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-10-27
//	Last Update: 2006-10-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
var cr_doodle = function(m_data, m_content, m_edit){
	var elmOutput;
	var doodle;
	var dataHost = 'http://i.chinaren.com';
	var setsListPath = '/json/json_doodle.jsp?uid='+_xpt;


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
		if (!doodle) {
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
						variable: '_doodle',
						onLoad: this.showSetsList.bind(this),
						onFailure: this.noSetsList.bind(this)
						/*timeout: 5000
						timerStep: 500*/
					}});
	};
	this.showSetsList = function() {
		var str = '';
		doodle=true;	
		str += _doodle;
		if(_doodle.length > 0 ){
			if(App.Permit.editModule){
				elmOutput.innerHTML = '<div style="text-align:right;"><a style="font-weight:bold;color:red" href="http://i.chinaren.com/user/index.jsp?edit=1&m=1#mydoodle" target="_blank">修改涂鸦</a></div><br>';
				elmOutput.innerHTML += str;
			}else{
				elmOutput.innerHTML = str;
			}
		}else{
			elmOutput.innerHTML = "时光飞逝，昔日同窗的我们如今变成了什么模样？用涂鸦板展示一个真实的自我吧！";
		}
		
	};
	this.noSetsList = function() {
		
	};
};
registerWidget('cr_doodle');
function adjustImg(src) {
        try{ 
                var iw=400; 
                if(self.screen.width>=1024) iw=480; 
                if(src.width > iw) src.width=iw;
        } catch(e) {}
}
