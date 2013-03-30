/******* Theme Develop Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-08-28
//	Last Update: 2006-08-28
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Theme_Dev = function(m_data, m_content, m_edit){
	var cUrl = '/service/themeDev.jsp'
	var themeUrl = '';
	var elmOutput;
	var elmOutputE;
	var request_cUser;
	if (m_data) {
		themeUrl = m_data.url || '';
	}

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
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td>'+ App.Lang.themeUrl +': </td>';
		str += '<td><input type="text" name="url" value="'+ (themeUrl || '') +'" class="text" onfocus="this.select()" /></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		this.themeUrlIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		this.saveBtn = elmOutputE.firstChild.rows[1].cells[1].firstChild;
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.saveData = function() {
		if (themeUrl == $F(this.themeUrlIpt).trim()) {
			this.closeEdit();
			return;
		}
		themeUrl = $F(this.themeUrlIpt).trim();
		var data = {
			url: themeUrl
		}
		this.save(data);
		this.updateData();
	};

	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
		
	};
	this.updateData = function(noCache) {
		var options = {
			nocache: noCache,
			parameters: 'd='+ _blog_domain,
			onComplete: this.showContent.bind(this)
		};
		request_cUser = new App.ImpFile(cUrl, options);
	};
	this.showContent = function(request_cUser) {
		if (request_cUser.responseText == '') {
			elmOutput.innerHTML = App.Lang.analyseFileError;
			return;
		}
		if (request_cUser.responseText.trim() != '1') {
			elmOutput.innerHTML = App.Lang.noPermit;
			return;
		}
		
		if (!themeUrl) {
			elmOutput.innerHTML = App.Lang.setThemeUrl;
		}
		else {
			elmOutput.innerHTML = App.Lang.currentTheme + themeUrl;
		}
		App.Themes.doSetTheme(themeUrl);
	}
};
registerWidget('Theme_Dev');
