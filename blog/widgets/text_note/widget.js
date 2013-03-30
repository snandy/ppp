/******* Text Note Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-27
//	Last Update: 2006-06-19
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Text_Note = function(m_data, m_content, m_edit){
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
		content = null;
		Element.remove(elmOutputE);
		Element.remove(elmOutput);
	};
	this.edit = function() {
		this.buildEdit();
	};
	
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" cellpadding="0" cellspacing="2"><tr>';
		str += '<td width="40px">'+ App.Lang.modTitle +': </td>';
		str += '<td><input type="text" name="textTitle" value="'+ (this.getTitle() || '') +'" class="text" /></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.modBg +': </td>';
		str += '<td class="colorSelection">';
		str += '<div style="background-color:none;" title="透明"></div>'+
				'<div style="background-color:#FFF;" title="#FFF"></div>'+
				'<div style="background-color:lightyellow;" title="lightyellow"></div>'+
				'<div style="background-color:#EEFFE0;" title="#EEFFE0"></div>'+
				'<div style="background-color:#FFE0E1;" title="#FFE0E1"></div>'+
				'<div style="background-color:#E0E0FF;" title="#E0E0FF"></div>'+
				'<div style="background-color:#FEE8BD;" title="#FEE8BD"></div>';
		str += '</td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
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
		m_content.style.backgroundColor = color;
	};
	this.saveData = function() {
		var newTitleValue = $F(this.titleIpt);
		if (getTureLength(newTitleValue)>16) {
			var str = App.Lang.modTitleTooLong+'('+getTureLength(newTitleValue)+App.Lang.byte+')';
			str += '\n'+App.Lang.reduceTo+'16'+App.Lang.byte+'(8'+App.Lang.chsWord+')';
			alert(str);
			$(this.titleIpt).focus();
			return;
		}
		if (/[<>&"]/.test(newTitleValue)) {
			alert('标题中不能含有 & > < "');
			$(this.titleIpt).focus();
			return;
		}
		if (this.getTitle() == newTitleValue.unescapeHTML() && lastColor == color) {
			this.closeEdit();
			return;
		}
		this.saveBtn.disabled = 'disabled';
		new Insertion.After(this.saveBtn, App.Lang.loading);
		this.setTitle(newTitleValue.unescapeHTML(), true);
		lastColor = color;
		var data = {
			color: color,
			content: content
		};
		this.save(data, $F(this.titleIpt).unescapeHTML());
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
	this.saveContent = function(_content) {
		if (_content.length > maxWords) {
			var str = '';
			str += App.Lang.tooLong +'('+ _content.length + App.Lang.word +')'+'\n';
			str += App.Lang.reduceTo +maxWords+ App.Lang.word;
			alert(str);
			return;
		}
		if (_content == content) return;
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
		
		elmOutput.innerHTML = content || App.Lang.typeTextHere;
		
		var _high = {
			backgroundColor: 	'transparent',
			border:				'1px solid red',
			padding:			'4px',
			cursor: 			'text'
		};
		
		var _unHigh = {
			backgroundColor: 	'transparent',
			border:				'none',
			padding:			'5px'
		};
		if (Browser.ua.indexOf('ie') < 0) {
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
		}
		else {
			elmOutput.innerHTML = makeClickable(elmOutput.innerHTML);
			function setClicks() {
				var links = elmOutput.getElementsByTagName('a');
				$A(links).each(function(l) {
					l.onclick = function() {
						ableEdit = false;
					};
				});
			}
			this.lastText = elmOutput.innerText;
			setClicks();
			Element.setStyle(elmOutput, _unHigh);
			if (App.Permit.editModule) {
				elmOutput.contentEditable = false;
				elmOutput.onmousedown = function() {
					ableEdit = true;
				};
				elmOutput.onmouseover = function() {
					Element.setStyle(elmOutput, _high);
				};
				elmOutput.onmouseout = function() {
					if (!editing) {
						Element.setStyle(elmOutput, _unHigh);
					}
				};
				elmOutput.onclick = function() {
					if (ableEdit) {
						editing = true;
						this.contentEditable = true;
						Element.setStyle(elmOutput, _high);
						this.focus();
					}
				};
				var self = this;
				elmOutput.onblur = function() {
					editing = false;
					this.contentEditable = false;
					Element.setStyle(elmOutput, _unHigh);
					var text = this.innerText || App.Lang.typeTextHere;
					this.innerHTML = makeClickable(text.convertTextToHTML());
					setClicks();
					//if (text != self.lastText) {
						self.lastText = text;
						self.saveContent(text.convertTextToHTML());
					//}
				};
			}
		}
		this.setColor();
		m_content.parentNode.style.padding = 0;
	};
	function makeClickable(str){
		//str = str.replace(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/ig,"\n[url=$1]$2[/url]\n");
		str = str.replace(/((http|https|ftp):\/\/[\w+(\-\w+)*\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"\u0391-\uFFE5])*)/ig, '<a href="$1" target="_blank">$1</a>');
		str = str.replace(/([^(:\/\/)\.][^a-zA-Z\.])((www|blog)\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"\u0391-\uFFE5])*)/ig, '$1<a href="http://$2" target="_blank">$2</a>');
		str = str.replace(/(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/ig, '<a href="mailto:$1" target="_blank">$1</a>');
		return str;
	}
};
registerWidget('Text_Note');