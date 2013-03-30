/******* Text Note Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-27
//	Last Update: 2006-03-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Demo_Text = function(m_data, m_content, m_edit){
	if (m_data) {
		var color = m_data.color;
		var lastColor = color;
		var content = m_data.content || '';
	}
	var maxWords = 1000;
	var elmOutput;
	var elmOutputE;
/*	
	this.initialize = function() {
		//...
	};
	this.edit = function() {
		//...
	};
	this.onCloseEdit = function() {
		//...
	};
	this.refresh = function() {
		//...
	};
	this.destory = function() {
		//...
	};
	this.save(Object: data, String: title);
	this.loaded();
	this.setIco(String: src);
	this.setTitle(String: title, Boolean: cover);
	this.getTitle();
*/
	this.initialize = function() {
		this.build();
	};
	this.destroy = function() {
	};
	this.edit = function() {
		this.buildEdit();
	};
	
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
		
		this.saveBtn = elmOutputE.firstChild.rows[2].cells[1].firstChild;
		this.eventSaveData = this.saveData .bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);

	};
	this.setColor = function(c) {
		if (c) {
			color = c;
		}
		m_content.parentNode.style.backgroundColor = color;
	};
	this.saveData = function() {
		if (this.getTitle() == $F(this.titleIpt) && lastColor == color) return;
		this.setTitle($F(this.titleIpt), true);
		lastColor = color;
		var data = {
			color: color,
			content: content
		};
		this.save(data, $F(this.titleIpt));
	};
	this.saveContent = function(_content) {
		if (_content.length > maxWords) {
			var str = '';
			str += App.Lang.tooLong +'('+ _content.length + App.Lang.word +')'+'\n';
			str += App.Lang.reduceTo +maxWords+ App.Lang.word;
			alert(str);
			return;
		}
		content = _content;
		var data = {
			color: color,
			content: _content
		};
		this.save(data);
	};
	this.build = function() {
		elmOutput = document.createElement('div');
		Element.addClassName(elmOutput, 'noteContainer');
		m_content.appendChild(elmOutput);
		
		elmOutput.innerHTML = content || '';
		
		var _high = {
			backgroundColor: 	'transparent',
			border:				'1px solid red',
			padding:			'4px'
		};
		
		var _unHigh = {
			backgroundColor: 	'transparent',
			border:				'none',
			padding:			'5px'
		};
		var options = {
			type: 'area',
			overStyle:_high,
			outStyle: _unHigh,
			defaultValue: App.Lang.typeTextHere,
			filter: makeClickable,
			onChange: this.saveContent.bind(this)
		};
		if (!App.Permit.editModule) {
			options.able = false;
		}
		new App.EditableText(elmOutput, options);
		this.setColor();
		m_content.parentNode.style.padding = 0;
	};
	function makeClickable(str){
		var lines = str.split('<br />');
		$A(lines).each(function(line, i){
			var tmps = line.split(' ');
			$A(tmps).each(function(tmp, j){
				if(tmp.indexOf('www.')!=-1 && tmp.indexOf("http://")==-1){
					tmps[j] = '<a href="http://'+ tmp +'" target="_blank">'+ tmp +'</a>';
				} else if(tmp.indexOf('http://')!=-1 || tmp.indexOf('ftp://')!=-1 || tmp.indexOf('https://')!=-1){
					tmps[j] = '<a href="'+ tmp +'" target="_blank">'+ tmp +'</a>';
				} else if (tmp.indexOf('@') != -1 && tmp.charAt(0) != '@' && tmp.charAt(tmp.length-1) != '@') {
					tmps[j] = '<a href="mailto:'+ tmp +'">'+ tmp +'</a>';
				}
			});
			lines[i] = tmps.join(' ');
		});
		return lines.join('<br />');
	}
};
registerWidget('Demo_Text');