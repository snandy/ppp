/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	Author: chenqj
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var hello = function(m_data, m_content, m_edit){
	
	var defaultWords = '投我以桃，报之以李。一《诗经》\n满招损，谦受益。—《尚书》\n天行健，君子以自强不息—《周易》';
	
	if (m_data) {
		var color = m_data.color;
		var lastColor = color;
		var content = m_data.content || '';
	}
	var maxWords = 500;
	var elmOutput;
	var elmOutputE;
	
	var ableEdit = true;
	var editing = false;
	
	this.initialize = function() {
		this.build();
	};
	this.destroy = function() {
	};
	this.edit = function() {
		this.buildEdit();
	};
	this.refresh = function() {
		this.sayHello();
	}
	
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="40px">'+ App.Lang.modTitle +': </td>';
		str += '<td><input type="text" name="textTitle" value="'+ (this.getTitle() || '') +'" class="input-text" /></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.modBg +': </td>';
		str += '<td class="colorSelection">';
		str += '<div style="background-color:#FFF;"></div>'+
				'<div style="background-color:lightyellow;"></div>'+
				'<div style="background-color:#EEFFE0;"></div>'+
				'<div style="background-color:#FFE0E1;"></div>'+
				'<div style="background-color:#E0E0FF;"></div>'+
				'<div style="background-color:#FEE8BD;"></div>';
		str += '</td>';
		str += '</tr><tr>';
		str += '<td colspan="2">文字: </td>';
		str += '</tr><tr>';
		str += '<td colspan="2">';
		str += '<textarea name="textContent" cols="26" rows="8">'+ (this.getWords() || '') + '</textarea>';
		str += '</td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="input-button" /></td>';
		str += '</tr></table>';
		
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		this.titleIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		
		this.colorSelect = elmOutputE.firstChild.rows[1].cells[1];
		$A(this.colorSelect.childNodes).each(function(c){
			c.onclick = this.setColor.bind(this, Element.getStyle(c, 'background-color'));
		}.bind(this));
		
		this.contentIpt = elmOutputE.firstChild.rows[3].cells[0].firstChild;
		this.saveBtn = elmOutputE.firstChild.rows[4].cells[1].firstChild;
		this.eventSaveData = this.saveData .bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);

	};
	this.setColor = function(c) {
		if (c) {
			color = c;
		}
		m_content.parentNode.style.backgroundColor = color;
	};
	this.getWords = function() {
		return (content || defaultWords);
	};
	this.saveData = function() {
		if (this.getTitle() == $F(this.titleIpt) && lastColor == color && (this.getWords() == $F(this.contentIpt))) return;
		this.setTitle($F(this.titleIpt), true);
		lastColor = color;
		content = $F(this.contentIpt);
		var data = {
			color: color,
			content: content
		};
		this.save(data, $F(this.titleIpt));
	};

	this.build = function() {
		this.sayHello();
	};
	
	this.sayHello = function() {
		m_content.innerHTML = App.Lang.loadModuleData;
		this.loaded();
		var items = this.getWords().split('\n');
		if (items.length <= 0) return;
		var n = Math.round(Math.random()*items.length);
		if (n == 0){n = 1;}
		m_content.innerHTML = items[n -1];
		
	}
	
	
};
registerWidget('hello');