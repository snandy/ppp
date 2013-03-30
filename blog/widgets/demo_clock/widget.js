/******* Clock Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-03-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Demo_Clock = function(m_data, m_content, m_edit){
	var objClock;
	var clock;
	this.initialize = function() {
		updateTime();
		objClock = setInterval(updateTime,1000);
	};
	this.destroy = function() {
		clearInterval(objClock);
	}
	function updateTime() {
		clock = new Date();
		m_content.innerHTML = clock;
	}
};
registerWidget('Demo_Clock');