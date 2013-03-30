/******* Clock Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-04-08
//	Last Update: 2006-06-16
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Clock = function(m_data, m_content, m_edit, w_path){
	function getObjClock(_num, _color, _size){
		var objClock = [
			'<embed src="'+w_path+'/clock1/'+ (_color || 'Orange') +'.swf" width="120" height="40" wmode="transparent" type="application/x-shockwave-flash"></embed>',
			'<embed src="'+w_path+'/clock2/'+ (_color || 'Red') +'.swf" width="'+ (_size || 110) +'" height="'+ (_size || 110) +'" wmode="transparent" type="application/x-shockwave-flash"></embed>',
			'<embed src="'+w_path+'/clock3/'+ (_color || 'Blue') +'.swf" width="'+ (_size || 110) +'" height="'+ (_size || 110) +'" wmode="transparent" type="application/x-shockwave-flash"></embed>',
			'<embed src="'+w_path+'/clock4/'+ (_color || 'Blue') +'.swf" width="181" height="40" wmode="transparent" type="application/x-shockwave-flash"></embed>'
		];
		return(objClock[_num-1]);
	}
	var elmOutputE;
	var clockSum = 4;
	var defaultNum = 1;
	var defaultColor = 'Blue';
	var objColor = {
		'Blue': 'blue',
		'Red': 'red',
		'Orange': 'orange',
		'Yellow': 'yellow',
		'Green': 'green',
		'Dark': 'gray'
	};
	if (m_data) {
		var num = m_data.num;
		var color = m_data.color;
		var size = m_data.size;
	}
	if (num>4){num = 4}
	this.initialize = function() {
		this.build();
	};
	this.destroy = function() {
		Element.remove(elmOutputE);
		m_content.innerHTML = '';
	}
	this.edit = function() {
		this.buildEdit();
	};
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" cellpadding="0" cellspacing="2"><tr>';
		str += '<td width="40px">'+ App.Lang.clockStyle +': </td>';
		str += '<td><select name="clockStyle">'+ getStyleList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.clockColor +': </td>';
		str += '<td><select name="clockColor">'+ getColorList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		
		this.eventBuild = this.set.bindAsEventListener(this);
		this.numIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		Event.observe(this.numIpt, 'change', this.eventBuild);
		this.colorIpt = elmOutputE.firstChild.rows[1].cells[1].firstChild;
		Event.observe(this.colorIpt, 'change', this.eventBuild);
		
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		this.saveBtn = elmOutputE.firstChild.rows[2].cells[1].firstChild;
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.saveData = function() {
		if ( $F(this.numIpt) == num && $F(this.colorIpt) == color ) {
			this.closeEdit();
			return;
		}
		this.saveBtn.disabled = 'disabled';
		new Insertion.After(this.saveBtn, App.Lang.loading);
		num = $F(this.numIpt) || num || defaultNum;
		color = $F(this.colorIpt) || color || defaultColor;
		var data = {num: num, color: color};
		this.save(data);
		this.build();
	};
	this.endSave = function() {
		if (this.saveBtn && this.saveBtn.nextSibling) {
			Element.remove(this.saveBtn.nextSibling);
			new Insertion.After(this.saveBtn, App.Lang.saved);
			setTimeout(function(){
				Element.remove(this.saveBtn.nextSibling);
				this.saveBtn.disabled = '';
			}.bind(this), 1000);
		}
	};
	this.set = function() {
		this.build( $F(this.numIpt) , $F(this.colorIpt) );
	};
	this.build = function(_num, _color) {
		_num = _num || num || defaultNum;
		_color = _color || color || defaultColor;
		m_content.innerHTML = getObjClock(_num, _color);
		m_content.style.textAlign = 'center';
	};
	function getStyleList() {
		var str = '';
		for (var i=1; i<=clockSum; i++) {
			if (i == num) {
				str += '<option value="'+ i +'" selected>'+ i +'</option>';
			} else {
				str += '<option value="'+ i +'">'+ i +'</option>';
			}
		};
		return str;
	}
	function getColorList() {
		var str = '';
		$H(objColor).each(function(c){
			if (c.key == color) {
				str += '<option value="'+ c.key +'" style="background-color:'+ c.value +'" selected>&#160;&#160;&#160;&#160;</option>';
			} else {
				str += '<option value="'+ c.key +'" style="background-color:'+ c.value +'">&#160;&#160;&#160;&#160;</option>';
			}
		});
		return str;
	}
};
registerWidget('Clock');