/******* PP Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-06-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var game = function(m_data, m_content, m_edit, w_path){
	var elmOutput;
	var elmGameBox;
	var elmGameFlash;
	var timerSetFlashSize;
	var defaultGameName = 'gsllk';
	var objName = {
		'gsllk':	['果蔬连连看'],
		'tiaoqi':	['水晶跳棋'],
		'hjkg':		['黄金矿工'],
		'ysbz':		['遗失宝藏'],
		'fish':		['大鱼吃小鱼'],
		'3dcube':	['3D躲避方块'],
		'snake':	['贪吃蛇'],
		'clashnslash': ['保卫地球'],
		'ngame':	['NGame'],
		'xmas':		['圣诞贺卡','http://game.sohu.com/images/jumpblog.swf?'+encodeURI('str=亲爱的博友,,搜狐博客&phpurl=http://game.sohu.com/happyblog.php')]
	};
	if (m_data) {
		var gameName = m_data.name;
	}
	if (!objName[gameName]) {
		gameName = defaultGameName;
	}
	
	this.getGameFrag = function (_name) {
		if (objName[_name][1]) {
			var swf = objName[_name][1];
		}
		else {
			var swf = w_path + _name + '.swf';
		}
		var str = '';
		str += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="100%" height="100%">';
		str += '<param name="movie" value="' + swf + '" />';
		str += '<param name="quality" value="high" />';
		str += '<embed src="' + swf + '"  quality="high" width="100%" height="100%" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" swLiveConnect="true" />';
		str += '</object>';
		return str;
	}

	this.initialize = function() {
		this.build();
	};
	this.destroy = function() {
		clearTimeout(timerSetFlashSize);
		this.destroyGameFlash();
		Element.remove(elmOutput);
	};
	this.destroyGameFlash = function() {
		if (!document) return;
		if (elmGameFlash) {
			Element.remove(elmGameFlash);
		}
	}
	
	this.edit = function() {
		this.buildEdit();
	};
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" cellpadding="0" cellspacing="2"><tr>';
		str += '<td width="40px">'+ App.Lang.game +': </td>';
		str += '<td><select name="gameName">'+ getGameList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		
		this.eventBuild = this.set.bindAsEventListener(this);
		this.nameIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		Event.observe(this.nameIpt, 'change', this.eventBuild);
		
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		this.saveBtn = elmOutputE.firstChild.rows[1].cells[1].firstChild;
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.saveData = function() {
		if ( $F(this.nameIpt) == gameName) {
			this.closeEdit();
			return;
		}
		this.saveBtn.disabled = 'disabled';
		new Insertion.After(this.saveBtn, App.Lang.loading);
		gameName = $F(this.nameIpt) || gameName || defaultGameName;
		var data = {name: gameName};
		this.save(data);
		this.updateData();
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
	
	this.build = function(_name) {
		_name = _name || gameName || defaultGameName;
		
		elmOutput = document.createElement('div');
		elmOutput.style.textAlign = 'center';
		m_content.appendChild(elmOutput);
		
		elmGameBox = document.createElement('div');
		m_content.appendChild(elmGameBox);
		Element.hide(elmGameBox);
		this.getPlayBtn(_name);
	};
	this.getPlayBtn = function(_name) {
		_name = _name || gameName || defaultGameName;
		var str = '';
		str += '<div><a href="javascript:void(0)">点击这里开始玩“' + objName[_name][0] + '”</a>';
		str += '<a href="'+ w_path + _name + '.swf" target="_blank"><img src="'+ App.Actions.imgPath +'ico_newwin.gif" alt="在弹出窗口玩" align="absbottom" /></a></div>';
		str += '<div class="more"><a href="http://game.sohu.com" target="_blank">去搜狐游戏大厅</a></div>';
		elmOutput.innerHTML = str;
		this.eventStartGame = this.updateData.bind(this, gameName);
		Event.observe(elmOutput.firstChild, 'click', this.eventStartGame);
	};
	this.getStopBtn = function() {
		var str = '';
		str += '<a href="javascript:void(0)">不玩了，休息一下～</a>';
		elmOutput.innerHTML = str;
		this.eventStopGame = this.destoryFlash.bind(this, gameName);
		Event.observe(elmOutput.firstChild, 'click', this.eventStopGame);
	};
	this.updateData = function(_name) {
		_name = _name || gameName || defaultGameName;
		elmGameBox.innerHTML = '';
		elmGameBox.innerHTML = this.getGameFrag(_name);
		Element.show(elmGameBox);
		
		elmGameFlash = elmGameBox.firstChild;
		this.setFlashSize();
		this.getStopBtn();
	};
	this.destoryFlash = function() {
		if (elmGameFlash) {
			Element.remove(elmGameFlash);
		}
		var str = '';
		str += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="1" height="1">';
		str += '<param name="movie" value="' + w_path +'none.swf" />';
		str += '<param name="quality" value="high" />';
		str += '<embed src="' + w_path +'none.swf"  quality="high" width="1" height="1" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" swLiveConnect="true" />';
		str += '</object>';
		elmGameBox.innerHTML = str;
		Element.hide(elmGameBox);
		this.getPlayBtn();
	};
	this.set = function() {
		this.updateData( $F(this.nameIpt));
	};
	
	this.setFlashSize = function() {
		if ((elmGameBox.offsetWidth*3/4) != elmGameBox.offsetHeight) {
			elmGameFlash.height = 1;
			elmGameBox.style.height = (elmGameBox.offsetWidth*3/4) +'px';
			elmGameFlash.height = '100%';
		}
		timerSetFlashSize = setTimeout(this.setFlashSize.bind(this), 500);
	}
	function getGameList() {
		var str = '';
		$H(objName).each(function(c){
			if (c.key == gameName) {
				str += '<option value="'+ c.key +'" selected>'+ c.value[0] +'</option>';
			} else {
				str += '<option value="'+ c.key +'">'+ c.value[0] +'</option>';
			}
		});
		return str;
	}
};
registerWidget('game');