/**
 * Time �й�ʱ���һЩ��������
 * @author Jady
 * 
 * @base 
 **/

var Time = {
  now: function() {
  	return (new Date()).getTime();
  },
  
  /**
   * ȡ�ñ�ʾ���ڵ��ַ���
   * @param {Number} time timeֵ
   * @param {String} splitStr ����ַ�����Ĭ��Ϊ-
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
			str += '��';
		}
		
		if(hour < 48 && hour > 0 && (hour % 24) > 0){
			str += hour % 24;
	
			str += 'Сʱ';
		}
	  
	    if (hour <= 0 && (minu % 60 <= 2)) {
	    	return '�ո�';
	    }
	    
		if(hour < 24){
			str += minu % 60;
			str += '����';
		}
		str += 'ǰ';
		return str;
  }
}
var timeStamp = Time.now;