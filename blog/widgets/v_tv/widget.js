/******* Video TV Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2007-06-25
//	Last Update: 2007-07-10
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var v_tv = function(m_data, m_content, m_edit){
	var elmOutput;
	var elmOutput2;
	var elmOutputE;
	var elmTVFlash;
	var timerSetFlashSize;
	var type = 1;	// 1:new videos | 2:video list | 3:one video
	var skin = 3;
	var vid = null;
	var float = 2;
	var pos = [0, 0];
	var size = [0, 0];
	var playerBox = null;
	this.getPlayerBox = function() {
		var _box = $('innerPlayerBox');
		if (_box && _box.offsetWidth >= 200) {
			return _box;
		}
		return null;
	};
	if (m_data) {
		type = m_data.type || 1;
		skin = m_data.skin || 3;
		vid = m_data.vid || null;
		float = m_data.float || 2;
		pos = m_data.pos || [0, 0];
		size = m_data.size || [0, 0];
	}

	this.getVideoFrag = function () {
		var _url;
		if (type == 2 && vid) {
			_url = 'http://v.blog.sohu.com/fo/p'+ skin +'/'+ vid;
		}
		else {
			_url = 'http://v.blog.sohu.com/fo/p'+ skin +'/!'+ _xpt;
		}
		var str = '';
		str += '<embed src="'+ _url +'" width="100%" height="100%" wmode="opaque" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" id="videoFlash" />';
		return str;
	}

	this.initialize = function() {
		this.build();
	};
	this.destroy = function() {
		clearTimeout(timerSetFlashSize);
		this.destroyVideoFlash();
		Element.remove(elmOutput);
		m_content.innerHTML = '';
	};
	this.destroyVideoFlash = function() {
		if (!document) return;
		if (elmTVFlash) {
			Element.remove(elmTVFlash);
		}
	}
	this.refresh = function() {
		this.destroy();
		this.build();
	};
	this.edit = function() {
		this.buildEdit();
	};
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="60px">'+ App.Lang.v_setTVContent +':</td>';
		str += '<td><input type="radio" name="tvType" value="1"'+ (type == 1? ' checked' : '') +' /> '+ App.Lang.v_newVideos +'</td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="radio" name="tvType" value="2"'+ (type == 2? ' checked' : '') +' /> '+ App.Lang.v_videoList;
		str += '<span><select name="videolist"><option>'+ App.Lang.loading +'</option></select></span></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.v_setTVPos +':</td>';
		str += '<td><input type="radio" name="tvFloat" value="1"'+ ((float == 1 || !playerBox)?  ' checked' : '' ) +' /> '+ App.Lang.v_inMod +'</td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="radio" name="tvFloat" value="2"'+ ((float == 2 && playerBox)? ' checked' : '') +' /> '+ App.Lang.v_floatTop +'</td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		this.tvTypeIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		this.videoList = elmOutputE.firstChild.rows[1].cells[1].lastChild.firstChild;
		this.tvFloat = elmOutputE.firstChild.rows[3].cells[1].firstChild;
		this.saveBtn = elmOutputE.firstChild.rows[5].cells[1].firstChild;
		Event.observe(this.saveBtn, 'click', this.saveData.bindAsEventListener(this));
		
		setTimeout(this.updateVideoListData.bind(this), 10);
	};
	this.updateVideoListData = function() {
		var dataUrl = 'http://v.blog.sohu.com/json/plist*'+ _xpt +'*20*0*1.html';
		new LinkFile(dataUrl, {
			type: 'script',
			noCache: true,
			callBack: {
				variable: 'VBlog.plist1',
				onLoad: function() {
					this.videoList.parentNode.innerHTML = this.getVideoList();
					this.videoList = elmOutputE.firstChild.rows[1].cells[1].lastChild.firstChild;
				}.bind(this),
				onFailure: function() {
					this.videoList.parentNode.innerHTML = '<select name="videolist"><option>'+ App.Lang.fileNotFound +'</option></select>';
					this.videoList = elmOutputE.firstChild.rows[1].cells[1].lastChild.firstChild;
				}.bind(this)
			}});
	};
	this.getVideoList = function() {
		if (!VBlog.plist1 || !VBlog.plist1.data || !VBlog.plist1.data.list || VBlog.plist1.data.list.length == 0) {
			return '<select name="videolist"><option value="">'+ App.Lang.v_noVideoList +'</option></select>';
		}
		var str = '';
		str += '<select name="videolist">';
		$A(VBlog.plist1.data.list).each(function(l) {
			if (l.id == vid) {
				str += '<option value="'+ l.id +'" selected="selected">'+ l.title +'</option>';
			} else {
				str += '<option value="'+ l.id +'">'+ l.title +'</option>';
			}
		});
		str += '</select>';
		return str;
	};

	this.saveData = function() {
		if (type == $F(this.tvTypeIpt).join("") && vid == $F(this.videoList) && float == $F(this.tvFloat).join("")) {
			this.closeEdit();
			return;
		}
		type = $F(this.tvTypeIpt).join("") || type;
		vid = $F(this.videoList) || vid;
		float = $F(this.tvFloat).join("") || float;
		if (float == 2 && !this.getPlayerBox()) {
			alert(App.Lang.v_needPlayerBox);
			return;
		}
		var data = {
			type: type,
			skin: skin,
			vid: vid,
			float: float
		}
		this.save(data);
		
		this.destroy();
		this.build();
	};
	
	this.build = function() {
		if(App.Permit.editModule){
			var divMng = document.createElement('div');
			Element.addClassName(divMng, 'mngBtn');
			var str = '';
			str += '<a href="http://v.blog.sohu.com/s/normal" target="_blank">';
			str += '<img src="'+ App.Actions.imgPath +'ico_videoUpload.gif" alt="'+ App.Lang.v_upload +'"align="absbottom" />';
			str += App.Lang.v_upload;
			str += '</a> | ';
			str += '<a href="http://v.blog.sohu.com/passport" target="_blank">';
			str += App.Lang.manage;
			str += '</a>';
			divMng.innerHTML = str;
			m_content.appendChild(divMng);
		}
		elmOutput = document.createElement('div');
		Element.addClassName(elmOutput, 'videoFlash');
		
		elmOutput.innerHTML = this.getVideoFrag();
		
		if (float == 2) {
			elmOutput2 = document.createElement('div');
			var str2 = '';
			if (App.Permit.editModule) {
				str2 += '<div class="infoBox">';
				str2 += App.Lang.v_tvInfo;
				str2 += '</div>';
			}
			else {
				str2 += '<a href="http://v.blog.sohu.com/people/'+ _xpt +'" target="_blank">';
				str2 += '查看'+ getBlogTitle() +'的视频';
				str2 += '</a>';
			}
			elmOutput2.innerHTML = str2;
			Element.hide(elmOutput2);
			m_content.appendChild(elmOutput2);
			if ((playerBox = this.getPlayerBox())) {
				playerBox.appendChild(elmOutput);
				Element.show(elmOutput2);
			}
			else {
				Element.hide(elmOutput2);
				m_content.appendChild(elmOutput);
			}
		}
		else {
			m_content.appendChild(elmOutput);
		}
		
		elmTVFlash = $('videoFlash');
		timerSetFlashSize = setInterval(this.setFlashSize.bind(this), 500);
		this.loaded();
	};
	this.setFlashSize = function() {
		if (Math.floor(elmOutput.offsetWidth*3/4+20) != Math.floor(elmOutput.offsetHeight)) {
			elmTVFlash.height = 1;
			elmOutput.style.height = (Math.floor(elmOutput.offsetWidth*3/4)+20) +'px';
			elmTVFlash.height = '100%';
		}
		var testPlayerBox = this.getPlayerBox();
 		if (float == 2 && testPlayerBox != playerBox) {
			if ((playerBox = this.getPlayerBox())) {
				playerBox.appendChild(elmOutput);
				Element.show(elmOutput2);
			}
			else {
				Element.hide(elmOutput2);
				m_content.appendChild(elmOutput);
			}
			
		}
	};
};
registerWidget('v_tv');