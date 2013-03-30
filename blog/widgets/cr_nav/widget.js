/******* PP Set Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-10-27
//	Last Update: 2006-10-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
var cr_nav = function(m_data, m_content, m_edit){
	var elmOutput;
	var nav;

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
	this.build = function(nocache) {
		this.destroy();
		m_content.innerHTML = '';
		if (!nav) {
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
		var navSet = [{url:"http://class.chinaren.com",img:"cr_nav_1",desc:""},{url:"http://club.chinaren.com",img:"cr_nav_2",desc:""},{url:"http://campus.chinaren.com",img:"cr_nav_3",desc:""},{url:"http://i.chinaren.com/group",img:"cr_nav_4",desc:""}]
		var str = '';
		$A(navSet).each(function(p,i){
			str += '<div style="padding:3px;margin:2px;float:left;width:100px;overflow:hidden">';
				//str += '<a href="' + p.url + '" target="_blank" title="'+ p.desc +'">';
				str += "<embed src='" + Actions.widgetLibPathCR + "cr_nav/" + p.img + ".swf' type='application/x-shockwave-flash' width='50' height='50' quality='high' bgcolor='ffffff' pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='' wmode='transparent' scale='' allowfullscreen='true' pluginspage='http://www.macromedia.com/go/getflashplayer'></embed>";
				//str += '</a>';
				str += '</div>';
				});

		elmOutput.innerHTML = str;
	};

	this.noSetsList = function() {

	};
};
registerWidget('cr_nav');
