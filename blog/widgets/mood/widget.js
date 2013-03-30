/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-03-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var mood = function(m_data, m_content, m_edit, w_path){
	var elmOutput;
	var defaultTM = 'happy';
	var tms = {
		'happy' : '心情不错',
		'angry' : '怒',
		'crazy' : '抓狂',
		'cry' : '悲伤',
		'damn' : '不爽',
		'eek' : '晕',
		'laf' : '开心',
		'sad' : '没心情',
		'tired' : '累'
	};
	if (m_data) {
		var tm = m_data.mood || defaultTM;
	}
	else {
		var tm = defaultTM;
	};

	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		Element.remove(elmOutput);
	};

	
	this.edit = function() {
		this.buildEdit();
	};

	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
		
	};
	this.buildEdit = function() {

		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="80px">今日心情: </td>';
		str += '<td><select name="tm">'+ this.getMoodList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		this.moodIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		this.saveBtn = elmOutputE.firstChild.rows[1].cells[1].firstChild;
		this.eventChgMood = this.set.bindAsEventListener(this);
		Event.observe(this.moodIpt, 'change', this.eventChgMood);
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	
	this.set = function() {
		this.updateData( $F(this.moodIpt));
	};
	this.updateData = function(_tm){
		_tm = _tm || tm;
		var str =  '';
		str += '<div class="mood">';
		str += '<img src="' + w_path + '/' + _tm + '.gif" />';
		str += '<div class="moodDesc">' + tms[_tm] + '</div>';
		str += '</div>';
		elmOutput.innerHTML = str;
	}

	this.getMoodList = function() {
		var str = '';
		$H(tms).each(function(f, i){
			if (f.key == tm) {
				str += '<option value="'+ f.key +'" selected>'+ f.value +'</option>';
			} else {
				str += '<option value="'+ f.key +'">'+ f.value +'</option>';
			}
		});
		return str;
	};
	this.saveData = function() {
		this.saveBtn.disabled = 'disabled';
		tm = $F(this.moodIpt) || tm || defaultTM;
		var data = new Object();
		data.mood = tm;
		this.save(data);
		this.saveBtn.disabled = '';
		this.updateData();

	};
};
registerWidget('mood');
