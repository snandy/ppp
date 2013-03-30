/******* PP Set Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-10-27
//	Last Update: 2006-10-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var pp_set = function(m_data, m_content, m_edit){
	var elmOutput;
	var elmPPFlash;
	var timerSetFlashSize;
	var dataHost = 'http://pp.sohu.com';
	var dataHost2 = 'http://blog.sohu.com/a/album';
	var setsListPath = '/json/setlist*' + _ept + '*50*1.html';
	var ppUserId = '';
	function getPPId() {
		switch (typeof(ppUserId)) {
			case "string":
				if (ppUserId.length > 0) return parseInt(ppUserId);
				break;
			case "number":
				return ppUserId;
				break; 
		}
		return -1;
	}
	function getSetPathJson(variable, _num) {
		var str = dataHost2 +'/json/photolist*'+ setId + (getPPId() != -1 ? ('*' + ppUserId) : '') + "*" + _num +'*1*'+ variable +'.html';
		if(App.Permit.editModule){
			str += '?o=true&ca='+timeStamp();
		}
		return str;
	}
	function getSetPathXml(_num) {
		var str = dataHost2 +'/xml/photolist*'+ setId + (getPPId() != -1 ? ('*' + ppUserId) : '') + "*" + _num +'*1.html';
		if(App.Permit.editModule){
			str += '?ca='+timeStamp();
		}
		return str;
	}
	var setId = '';
	var setName = '';
	var setPath = '';
	var viewType = 0;
	var num = 10;
	if (m_data) {
		setId = m_data.id || '';
		setName = m_data.name || '';
		viewType = m_data.type || 0;
		num = m_data.num || 10;
		ppUserId = m_data.ppuserid;
	}
	this.getPPFrag = function (_num) {
		var str = '';
		str += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="100%" height="100%">';
        str += '<param name="movie" value="'+ App.Actions.flashPath + _pp_set_flash +'" />';
        str += '<param name="quality" value="high" />';
		str += '<param name="allowScriptAccess" value="sameDomain" />';
		str += '<param name="wmode" value="transparent" />';
        str += '<param name="FlashVars" value="url1='+ getSetPathXml(_num) +'$true" />';
        str += '<embed src="'+ App.Actions.flashPath + _pp_set_flash +'" FlashVars="url1='+ getSetPathXml(_num) +'$true" quality="high" width="100%" height="100%" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" name="myFlash" swLiveConnect="true" wmode="opaque" />';
        str += '</object>';
		return str;
	}

	this.initialize = function() {
		this.build();
	};
	this.destroy = function() {
		clearTimeout(timerSetFlashSize);
		this.destroyPPFlash();
		if (elmOutput) {
			Element.remove(elmOutput);
		}
	};
	this.destroyPPFlash = function() {
		if (!document) return;
		if (typeof elmPPFlash != 'undefined' && elmPPFlash) {
			try {
				Element.remove(elmPPFlash);
			}catch(e){}
		}
	}
	
	this.edit = function() {
		this.buildEdit();
	};
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="60px">'+ App.Lang.ppSet +': </td>';
		str += '<td><select name="setId"><option value="0">'+ App.Lang.loading +'</option></select></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.viewType +': </td>';
		str += '<td><select name="viewType">'+ getViewTypeList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.rssNum +': </td>';
		str += '<td><select name="picNum">'+ getNumList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		
		this.setIdIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		this.viewTypeIpt = elmOutputE.firstChild.rows[1].cells[1].firstChild;
		this.numIpt = elmOutputE.firstChild.rows[2].cells[1].firstChild;
		
		this.saveBtn = elmOutputE.firstChild.rows[3].cells[1].firstChild;
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
		
		setTimeout(this.getSetsList.bind(this), 10);
	};
	this.saveData = function() {
		if ((!$F(this.setIdIpt) || $F(this.setIdIpt) == 0)) {
			this.closeEdit();
			return;
		}
		if (typeof photosets == 'undefined' || !photosets) {
			this.closeEdit();
			return;
		}
		if (setId == $F(this.setIdIpt) && viewType == $F(this.viewTypeIpt) && num == $F(this.numIpt)) {
			this.closeEdit();
			return;
		}
		setId = $F(this.setIdIpt);
		viewType = $F(this.viewTypeIpt) || viewType;
		num = $F(this.numIpt) || num;
		var set = $A(photosets).find(function(s) {
			return (s.id && s.id == setId);
		});
		if (set) {setName = set.name;}
		var tempId = getPPId() == -1 ? '' : getPPId();
		
		var data = {
			id: setId,
			name: setName,
			type: viewType,
			num: num,
			ppuserid: tempId
		}
		this.save(data);
		eval("ppset_"+ this.id +"=null");
		this.build();
	};
	this.refresh = function() {
		eval("ppset_"+ this.id +"=null");
		this.build(true);
	};
	this.build = function(nocache) {
		this.destroy();
		m_content.innerHTML = '';
		if (!setId) {
			elmOutput = document.createElement('div');
			if(App.Permit.editModule) {
				elmOutput.innerHTML = App.Lang.selectViewType;
			}
			else {
				elmOutput.innerHTML = App.Lang.hasNotSetWitchSet;
			}
			m_content.appendChild(elmOutput);
		}
		else {
			if(App.Permit.editModule){
				var divMng = document.createElement('div');
				Element.addClassName(divMng, 'mngBtn');
				var str = '';
				str += '<a href="javascript:ToolBar.getPPUploadPath();">';
				str += '<img src="http://js1.pp.sohu.com.cn/ppp/group/toolbar/themes/default/images/ico_ppUpload.gif" alt="'+ App.Lang.pp_upload +'"align="absbottom" />';
				str += App.Lang.pp_upload;
				str += '</a> | ';
				str += '<a href="http://blog.sohu.com/people/!' + _xpt + '/photosetview-' + setId + (getPPId() != -1 ? ('-' + ppUserId) : '') + '.html" target="_blank">';
				str += App.Lang.manage;
				str += '</a>';
				divMng.innerHTML = str;
				m_content.appendChild(divMng);
			}
			this.setTitle(setName, true);
			if (viewType == 0) {
				m_content.parentNode.style.padding = 0;
				this.buildSlide();
			}
			else {
				m_content.parentNode.style.padding = '1px';
				this.buildJson(nocache);
			}
		}
	};
	this.buildSlide = function() {
		this.loaded();
		elmOutput = document.createElement('div');
		elmOutput.className = 'ppSlideBg';
		var str = '';
		str += this.getPPFrag(num);
		elmOutput.innerHTML = str;
		elmPPFlash = elmOutput.firstChild;
		m_content.appendChild(elmOutput);
		
		timerSetFlashSize = setInterval(this.setFlashSize.bind(this), 500);
	};
	this.buildJson = function(nocache) {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loadModuleData;
		m_content.appendChild(elmOutput);
		
		this.getSetData(nocache);
	};
	this.getSetData = function(nocache) {
		if (nocache || eval("typeof ppset_"+ this.id +" == 'undefined'") || !eval("ppset_"+ this.id)) {
			var variable = 'ppset_'+ this.id;
			var dataURL = getSetPathJson(variable, num);
			new LinkFile(dataURL, {
						type: 'script',
						noCache: nocache,
						callBack: {
							variable: variable,
							onLoad: this.showSetData.bind(this),
							onFailure: this.noSetData.bind(this)
						}});
		}
		else {
			this.showSetData();
		}
	};
	this.showSetData = function() {
		this.loaded();
		if (!eval('ppset_'+ this.id).photos || eval('ppset_'+ this.id).photos.length <= 0) {
			elmOutput.innerHTML = App.Lang.noPic;
			return;
		}
		var str = '';
		switch(viewType) {
			case '1':
				str += this.getShow_bigPic();
				break;
			case '2':
				str += this.getShow_Thumb();
				break;
			case '3':
				str += this.getShow_ico();
				break;
		};
		str += '<div class="more"><a href="http://pp.sohu.com/photosetview-' + setId + (getPPId() != -1 ? ('-' + ppUserId) : '') + '.html" target="_blank">�鿴ȫ��ͼƬ&gt;&gt;</a></div>';
		elmOutput.innerHTML = str;
	};
	this.getShow_bigPic = function() {
		var size = 0;
		var str = '';
		str += '<div class="ppBigPicBg clearfix">';
		$A(eval('ppset_'+ this.id).photos).each(function(p,i){
			if(p.id){
				str += '<table class="ppBigPic" cellpadding="0" cellspacing="0">';
				str += '<tr>';
				str += '<td class="ppBigPicBox">';
				str += '<a href="'+ dataHost + p.view + (App.Permit.editModule? '?o=true&ca='+timeStamp() : '') +'" target="_blank" title="'+ p.name.unescapeHTML() +'">';
				str += '<img src="' + p.middle + '" alt="'+ p.name.unescapeHTML() +'" />';
				str += '</a>';
				if (p.desc) {
					str += '<div class="ppBigPicDesc">'+ p.desc.unescapeHTML() +'</div>';
				}
				str += '</td>';
				str += '</tr>';
				str += '</table>';
				size++;
				if (size >= num) {throw $break;}
			}
		});
		str += '</div>';
		if(size == 0){
			return App.Lang.noPic;
		}
		return str;
	};
	this.getShow_Thumb = function() {
		var _tmp = eval('ppset_'+ this.id);
		var size = 0;
		var str = '';
		str += '<div class="ppThumbBg clearfix">';
		
		
		str += '<div class="ppThumbCover">';
		str += '<table cellpadding="0" cellspacing="0">';
		str += '<tr><td>';
		str += '<a href="'+ _tmp.viewurl + (App.Permit.editModule? '?o=true&ca='+timeStamp() : '') +'" target="_blank" title="'+ _tmp.name.unescapeHTML() +'">';
		str += '<img src="' + _tmp.cover + '" alt="'+ _tmp.name.unescapeHTML() +'" />';
		str += '</a>';
		if (_tmp.name) {
			str += '<div class="ppThumbCoverTitle"'+ (_tmp.name? (' title="'+_tmp.name.unescapeHTML()+'"'): '') +'>';
			str += _tmp.name.unescapeHTML();
			str += '</div>';
		}
		if (_tmp.desc) {
			str += '<div class="ppThumbCoverDesc"'+ (_tmp.desc? (' title="'+_tmp.desc.unescapeHTML()+'"'): '') +'>';
			str += _tmp.desc.unescapeHTML();
			str += '</div>';
		}
		if (_tmp.photoCount) {
			str += '<div class="ppThumbCoverCount">';
			str += _tmp.photoCount +'��';
			str += '</div>';
		}
		str += '</td></tr>';
		str += '</table>';
		str += '</div>';
		
		
		//str += '<div class="ppThumbPics">';
		//str += '<div class="ppThumbPicsInner">';
		$A(_tmp.photos).each(function(p,i){
			if(p.id){
				str += '<div class="ppThumb">';
				str += '<table cellpadding="0" cellspacing="0">';
				str += '<tr>';
				str += '<td class="ppThumbBox">';
				str += '<a href="'+ dataHost + p.view + (App.Permit.editModule? '?o=true&ca='+timeStamp() : '') +'" target="_blank" title="'+ p.name.unescapeHTML() +'">';
				str += '<img src="' + p.thumbnail + '" alt="'+ p.name.unescapeHTML() +'" />';
				str += '</a>';
				str += '<div class="ppThumbDesc"'+ (p.desc? (' title="'+p.desc.unescapeHTML()+'"'): '') +'>';
				if (p.desc) {
					str += p.desc.unescapeHTML();
				}
				str += '</div>';
				str += '</td>';
				str += '</tr>';
				str += '</table>';
				str += '</div>';
				size++;
				if (size >= num) {throw $break;}
			}
		});
		//str += '</div>';
		//str += '</div>';
		
		
		str += '</div>';
		if(size == 0){
			return App.Lang.noPic;
		}
		return str;
	};
	this.getShow_ico = function() {
		var _tmp = eval('ppset_'+ this.id);
		var size = 0;
		var str = '';
		str += '<div class="ppIcoBg clearfix">';




		str += '<div class="ppIcoCover">';
		str += '<table cellpadding="0" cellspacing="0">';
		str += '<tr><td>';
		str += '<a href="'+ _tmp.viewurl + (App.Permit.editModule? '?o=true&ca='+timeStamp() : '') +'" target="_blank" title="'+ _tmp.name.unescapeHTML() +'">';
		str += '<img src="' + _tmp.cover + '" alt="'+ _tmp.name.unescapeHTML() +'" />';
		str += '</a>';
		if (_tmp.name) {
			str += '<div class="ppThumbCoverTitle"'+ (_tmp.name? (' title="'+_tmp.name.unescapeHTML()+'"'): '') +'>';
			str += _tmp.name.unescapeHTML();
			str += '</div>';
		}
		if (_tmp.desc) {
			str += '<div class="ppThumbCoverDesc"'+ (_tmp.desc? (' title="'+_tmp.desc.unescapeHTML()+'"'): '') +'>';
			str += _tmp.desc.unescapeHTML();
			str += '</div>';
		}
		if (_tmp.photoCount) {
			str += '<div class="ppThumbCoverCount">';
			str += _tmp.photoCount +'��';
			str += '</div>';
		}
		str += '</td></tr>';
		str += '</table>';
		str += '</div>';



		$A(_tmp.photos).each(function(p,i){
			if(p.id){
				str += '<div class="ppIco">';
				str += '<a href="'+ dataHost + p.view + (App.Permit.editModule? '?o=true&ca='+timeStamp() : '') +'" target="_blank" title="'+ (p.desc? p.desc.unescapeHTML() : p.name.unescapeHTML()) +'">';
				str += '<img src="' + p.square + '" alt="'+ (p.desc? p.desc.unescapeHTML() : p.name.unescapeHTML()) +'" width="75" />';
				str += '</a>';
				str += '</div>';
				size++;
				if (size >= num) {throw $break;}
			}
		});
		str += '</div>';
		if(size == 0){
			return App.Lang.noPic;
		}
		return str;
	};
	this.noSetData = function() {
		this.loaded();
		elmOutput.innerHTML = App.Lang.noSetData;
	};
	this.setFlashSize = function() {
		if (Math.floor(elmOutput.offsetWidth) >= 500) {
			elmPPFlash.height = 1;
			elmOutput.style.height = (500*3/4+40) +'px';
			elmPPFlash.height = '100%';
		}
		else if (Math.floor(elmOutput.offsetWidth*3/4+40) != Math.floor(elmOutput.offsetHeight)) {
			elmPPFlash.height = 1;
			elmOutput.style.height = (elmOutput.offsetWidth*3/4+40) +'px';
			elmPPFlash.height = '100%';
		}
	};
	this.getSetsList = function() {
		if (typeof photosets == 'undefined' || !photosets) {
			if(App.Permit.editModule){
				var dataURL = dataHost2 + setsListPath + '?o=true&ca='+timeStamp();
			}else{
				var dataURL = dataHost2 + setsListPath;
			}
			new LinkFile(dataURL, {
						type: 'script',
						callBack: {
							variable: 'photosets',
							onLoad: this.showSetsList.bind(this),
							onFailure: this.noSetsList.bind(this),
							timeout: 5000
							/*timerStep: 500*/
						}});
		}
		else {
			this.showSetsList();
		}
	};
	this.showSetsList = function() {
		var str = '';
		str += '<select name="setId">';
		var _n = 0;
		$A(photosets).each(function(p){
			if(p.id){
				ppUserId = p.userid;
				if (p.id == setId) {
					str += '<option value="'+ p.id +'" selected="selected">'+ p.name.unescapeHTML() +'</option>';
				} else {
					str += '<option value="'+ p.id +'">'+ p.name.unescapeHTML() +'</option>';
				}
				_n++;
			}
		});
		if (_n == 0) {
			str += '<option value="0">'+ App.Lang.noSetsList +'</option>';
		}
		str += '</select>';
		var tmpElm = this.setIdIpt.parentNode;
		tmpElm.innerHTML = str;
		this.setIdIpt = tmpElm.firstChild;
		
	};
	this.noSetsList = function() {
		var tmpElm = this.setIdIpt.parentNode;
		tmpElm.innerHTML = '<select><option>'+ App.Lang.cannotGetSetsList +'</option></select>';
		this.setIdIpt = tmpElm.firstChild;
	};
	
	function getViewTypeList() {
		var str = '';
		[App.Lang.slide, App.Lang.bigPic, App.Lang.thumbnails, App.Lang.icon].each(function(n, i){
			if (i == viewType) {
				str += '<option value="'+ i +'" selected="selected">'+ n +'</option>';
			} else {
				str += '<option value="'+ i +'">'+ n +'</option>';
			}
		});
		return str;
	}
	function getNumList() {
		var str = '';
		[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].each(function(n){
			if (n == num) {
				str += '<option value="'+ n +'" selected="selected">'+ n +'</option>';
			} else {
				str += '<option value="'+ n +'">'+ n +'</option>';
			}
		});
		return str;
	}
};
registerWidget('pp_set');