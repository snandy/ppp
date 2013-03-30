/******* Clock2 Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-04-08
//	Last Update: 2006-04-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Demo_Clock2 = function(m_data, m_content, m_edit){
	var objClock = [
		'<embed src="http://www.clocklink.com/clocks/0005-Red.swf?TimeZone=CCT" width="150" height="150" wmode="transparent" type="application/x-shockwave-flash"></embed>',
		'<embed src="http://www.clocklink.com/clocks/5005-Orange.swf?TimeZone=CCT&TimeFormat=hhmmssTT" width="120" height="40" wmode="transparent" type="application/x-shockwave-flash"></embed>',
		'<embed src="http://www.clocklink.com/clocks/0001-Blue.swf?TimeZone=CCT" width="150" height="150" wmode="transparent" type="application/x-shockwave-flash">',
		'<embed src="http://www.clocklink.com/clocks/0007-Red.swf?TimeZone=CCT" width="150" height="150" wmode="transparent" type="application/x-shockwave-flash">',
		'<embed src="http://www.clocklink.com/clocks/9001E-Blue.swf?TimeZone=CCT&Target=2008,8,8,20,0,0&Title=2008 Olympics" width="288" height="18" wmode="transparent" type="application/x-shockwave-flash">'
	];
	if (m_data)
		var num = m_data.num;
	var defaultNum = 1;
	this.initialize = function() {
		this.build();
	};
	this.destroy = function() {
	}
	this.edit = function() {
		this.buildEdit();
	};
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="40px">'+ App.Lang.clockStyle +': </td>';
		str += '<td><select name="clockStyle">'+ getOptionList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="input-button" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		
		this.eventBuild = this.set.bindAsEventListener(this);
		this.numIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		Event.observe(this.numIpt, 'change', this.eventBuild);
		
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		this.saveBtn = elmOutputE.firstChild.rows[1].cells[1].firstChild;
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.saveData = function() {
		if (num == $F(this.numIpt)) return;
		num = $F(this.numIpt) || num || defaultNum;
		var data = {num: num};
		this.save(data);
		this.build();
	};
	this.set = function() {
		if (num == $F(this.numIpt)) return;
		this.build($F(this.numIpt) || num || defaultNum);
	};
	this.build = function(_num) {
		m_content.innerHTML = (_num? objClock[_num-1] : (num? objClock[num-1] : objClock[defaultNum-1]) );
		m_content.style.textAlign = 'center';
	};
	function getOptionList() {
		var str = '';
		$A(objClock).each(function(s, i){
			if ((i+1) == num) {
				str += '<option value="'+ (i+1) +'" selected>'+ (i+1) +'</option>';
			} else {
				str += '<option value="'+ (i+1) +'">'+ (i+1) +'</option>';
			}
		});
		return str;
	}
};
registerWidget('Demo_Clock2');