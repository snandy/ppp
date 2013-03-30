/**
 * Time 有关时间的一些基本方法
 * @author Jady
 * 
 * @base 
 **/

var Time = {
  now: function() {
  	return (new Date()).getTime();
  },
  
  /**
   * 取得表示日期的字符串
   * @param {Number} time time值
   * @param {String} splitStr 间隔字符串，默认为-
   */
  getDateStr: function(time, splitStr) {
  	splitStr = typeof(splitStr) == "string" ? splitStr : '-';
  	var date = new Date();
  	date.setTime(time);
  	var str = date.getFullYear() + splitStr + (date.getMonth() + 1) + splitStr + date.getDate();
  	return str;
  },
  
  friendly: function(time) {
    var now = new Date();
		var interval = now.getTime() - time;
			
		var minu = Math.floor(interval / (60 * 1000));
		var hour = Math.floor(minu / 60);
		var day = Math.floor(hour / 24);
		
		
		var str = '';
		if(day >= 1){
			str += day;
			str += '天';
		}
		
		if(hour < 48 && hour > 0 && (hour % 24) > 0){
			str += hour % 24;
	
			str += '小时';
		}
	  
	    if (hour <= 0 && (minu % 60 <= 2)) {
	    	return '刚刚';
	    }
	    
		if(hour < 24){
			str += minu % 60;
			str += '分钟';
		}
		str += '前';
		return str;
  }
}
var timeStamp = Time.now;