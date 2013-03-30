/******* Music_act Box Widget **********/
//	Author: gm 
//	First Created: 2010-03-11
//	Last Update: 2010-03-11
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
var _musicbox_param = '';
var _musicbox_swfName = 'musicbox.swf';
var music_act = function(m_data, m_content, m_edit){
	var moreUrl = setBadge('http://mp3.sogou.com/music.so?query=%B5%CB%C0%F6%BE%FD&w=02009900&dr=1');
	//var moreUrl = setBadge('http://act.blog.sohu.com/musicbox.jsp?u='+_ept);	//	更多地址
	//	var albumsUrl = setBadge('http://10.11.11.48/coo/blog/useralbums.js'); //	待写：专辑列表接口地址
	var albumsUrl = setBadge('http://oem.d.sogou.com/musicblog/data.jsp?a=ua');
	var albumList = null;	//	专辑列表父对象useralbums.js
	
	var skinLib = {
		1: {name: App.Lang.musicboxSkinskin1, h:305, url: 'skin1/'},
		2: {name: App.Lang.musicboxSkinskin2, h:300, url: 'skin2/'},
		3: {name: App.Lang.musicboxSkinskin3, h:340, url: 'skin3/'}
	};
	var skin = 3;
	var pl = 'auto';
	if (m_data) {
		skin = m_data.skin || 3;
		pl = m_data.play || 'auto';
	}
	var elmOutput;

	this.initialize = function() {
		this.build();
		
	};
	this.destroy = function() {
		this.destroyMusicbox();
	};
	this.destroyMusicbox = function() {
		if (!document || !document.frames || !document.frames["musicboxIframe"]) return;
		if(document.frames["musicboxIframe"].musicbox_allStop) {
			document.frames["musicboxIframe"].musicbox_allStop;
		}
		if (document.frames["musicboxIframe"].document.getElementById('musicbox_MediaPlayer1')) {
			Element.remove(document.frames["musicboxIframe"].document.getElementById('musicbox_MediaPlayer1'));
		}
		if (document.frames["musicboxIframe"].document.getElementById('musicbox_flash')) {
			try{
			//Element.remove(document.frames["musicboxIframe"].document.getElementById('musicbox_flash'));
			}catch(e){alert('error')}
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
		str += '<td width="40px">'+ App.Lang.musicboxSkin +': </td>';
		str += '<td><select name="musicboxSkin">'+ getSkinList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td width="40px">'+ App.Lang.musicboxPlay +': </td>';
		str += '<td><input type="checkbox" name="musicboxAuto" value="auto"'+ (pl=='auto'? 'checked="checked"':'') +' />'+ App.Lang.musicboxAutoPlay +'</td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		
		this.eventBuild = this.set.bindAsEventListener(this);
		this.skinIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		Event.observe(this.skinIpt, 'change', this.eventBuild);

		this.plIpt = elmOutputE.firstChild.rows[1].cells[1].firstChild;

		this.eventSaveData = this.saveData.bindAsEventListener(this);
		this.saveBtn = elmOutputE.firstChild.rows[2].cells[1].firstChild;
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.saveData = function() {
		if ( $F(this.skinIpt) == skin && $F(this.plIpt) == pl ) {
			this.closeEdit();
			return;
		}
		this.saveBtn.disabled = 'disabled';
		new Insertion.After(this.saveBtn, App.Lang.loading);
		skin = $F(this.skinIpt) || skin;
		pl = this.plIpt.checked? 'auto' : 'hand';
		var data = {skin: skin, play: pl};
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
		this.build( $F(this.skinIpt) );
	};
	this.build = function(_skin) {
		_skin = _skin || skin;
/*
		var param = 'http://oem.d.sogou.com/coo/blog/blog.so?';
		param += unescape(_musicbox_data);
		param += '&tp=al';
		param += '&ca=' + timeStamp();
		param += '$'+ skinLib[_skin].url +'$skin.swf';
		param += '$'+ pl;
		param += '$' + (App.Permit.editModule?'isadmin':'notadmin');
*/
		var param = 'http://zt.blog.sohu.com/upload/musicact/config.xml?';//指定显示几个特定的专辑
		param += '&tp=al';
		param += '&ca=' + timeStamp();
		param += '$'+ skinLib[_skin].url +'$skin.swf';
		param += '$'+ pl;
		param += '$' + (App.Permit.editModule?'isadmin':'notadmin');
		_musicbox_param = 'param='+ escape(param);
		
		this.destroyMusicbox();
		m_content.innerHTML = '';
		
/*
		if(App.Permit.editModule){
			var divMng = document.createElement('div');
			Element.addClassName(divMng, 'musicMng');
			var str = '';
			str += '<a href="http://mp3.sogou.com/coo/blog/loginMusicBox.so" target="_blank">';
			str += App.Lang.manage;
			str += '</a>';
			divMng.innerHTML = str;
			m_content.appendChild(divMng);
		}
*/
		
		elmOutput = document.createElement('div');
		elmOutput.setAttribute('id', 'musicbox');
		Element.addClassName(elmOutput, 'musicFlash');
		if (Browser.ua.indexOf('ie') >=0) {
			var str = '';
			str += '<iframe name="musicboxIframe" id="musicboxIframe" src="'+ _musicbox_path +'index.html" style="border:0;width:100%;height:'+ skinLib[_skin].h +'px;" allowTransparency="true"></iframe>';
			
			//	增加精彩网友专辑部分
//			str += '<div class="albumname">' + App.Lang.mscUserAlbums + '</div><div style="clear: both;"></div>';
//			str += '<div class="albums"></div><div style="clear: both;"></div>';
			str += '<div class="more"><a href="' + moreUrl + '" target="_blank">' + App.Lang.mscMoreAlbums + '</a></div>';
			
			elmOutput.innerHTML = str;
			
			//	取得列表对象，并发送请求
//			albumList = elmOutput.childNodes[3];
//			this.requestData();
		}
		else {
			elmOutput.innerHTML = App.Lang.musicboxNeedIE;
		}
		m_content.appendChild(elmOutput);
		
	};
	//	请求专辑列表数据
	this.requestData = function(noCache) {
		albumList.innerHTML = App.Lang.loading;
		if(noCache) {
			user_albums = null;
		}
		
		new LinkFile(albumsUrl, {
			type: 'script',
			noCache: noCache,
			callBack: {
				variable: "user_albums",
				onLoad: this.loadedData.bind(this),
				onFailure: this.noData.bind(this)
		}});
	};
	this.getList = function(data) {
		var str = '';
		for(var i=0; i<data.length; i++) {
			var title = data[i].title.replace("\"","&quot;").replace("<","&lt;").replace(">","&gt;");
			var photo = data[i].photo;
			var url = setBadge(data[i].url);
			str += '<div class="image65"><a href="' + url + '" title="' + title + '" alt="' + title + '" target="_blank"><img src="' + photo + '" height="65" /></a></div>';
		}
		albumList.innerHTML = str;
	};
	this.loadedData = function() {
		albumList.innerHTML = "";
		this.getList(user_albums);
	};
	this.noData = function() {
		albumList.innerHTML = App.Lang.fileNotFound;
	};
	
	function getSkinList() {
		var str = '';
		$H(skinLib).each(function(s, i){
			if (s.key == skin) {
				str += '<option value="'+ s.key +'" selected>'+ s.value.name +'</option>';
			} else {
				str += '<option value="'+ s.key +'">'+ s.value.name +'</option>';
			}
		});
		return str;
	}
	function setBadge(url) {
		var str = url + (url.match(/\?/)?'&':'?') + "pid=27022500";
		return str;
	}
};
registerWidget('music_act');