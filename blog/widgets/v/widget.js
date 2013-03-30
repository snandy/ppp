/******* V Channel Widget **********/
//      Author: Todd Lee (www.todd-lee.com)
//      First Created: 2006-09-07
//      Last Update: 2006-09-20
//      Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
var _vchannel_param = '';
var _vchannel_bType = '';
var v = function(m_data, m_content, m_edit, w_path){
	var dataUrl_v = 'http://act.blog.sohu.com/json/v_sohu.js';
	var dataUrl_s = 'http://act.blog.sohu.com/json/s_sohu.js';
	var dataUrl_con = '/rss/v.xml';
	var request_data;
	var elmOutput;
	var elmOutput2;
	var elmOutputE;
	var elmVersion;
	var elmIframe;
	var maxLoadRsTime = 20000;
	var loadRsTime = 0;
	var timerSetIframeSize;
	var bType = 'v';
	if (m_data) {
		bType = m_data.bType || 'v';
	}

	this.initialize = function() {
		this.build();
		setTimeout(this.updateData.bind(this), 1000) ;
		this.updateData2();
	};
	this.destroy = function() {
		request_data = null;
		playurl = null;
		clearInterval(timerSetIframeSize);
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
		str += '<td width="40px">'+ App.Lang.broadcast +': </td>';
		str += '<td><select name="bType">'+ getBroadcastList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		
		this.eventBuild = this.set.bindAsEventListener(this);
		this.bTypeIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		Event.observe(this.bTypeIpt, 'change', this.eventBuild);
		
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		this.saveBtn = elmOutputE.firstChild.rows[1].cells[1].firstChild;
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.saveData = function() {
		if ($F(this.bTypeIpt) == bType) {
			//this.closeEdit();
			//return;
		}
		this.saveBtn.disabled = 'disabled';
		new Insertion.After(this.saveBtn, App.Lang.loading);
		bType = $F(this.bTypeIpt) || bType;
		var data = {bType: bType};
		this.save(data);
		
		if ($F(this.bTypeIpt) != bType) {
			this.updateData();
		}
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
		bType = $F(this.bTypeIpt) || bType;
		this.updateData();
	};

	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		elmVersion = document.createElement('div');
		Element.hide(elmVersion);
		elmVersion.innerHTML = '<IE:CLIENTCAPS id="oClientCaps" style="BEHAVIOR: url(#default#clientcaps)" />';

		elmOutput2 = document.createElement('div');
		
		m_content.appendChild(elmOutput);
		m_content.appendChild(elmVersion);
		m_content.appendChild(document.createElement('hr'));
		m_content.appendChild(elmOutput2);

	};
	this.updateData = function() {
		if (bType == 's') {
			this.setTitle(App.Lang.sohuSportsBroadcast);
			this.setIco(w_path +'ico_widget_s.gif');
		}
		else {
			this.setTitle(App.Lang.sohuEntertainmentBroadcast);
			this.setIco(w_path +'ico_widget.gif');
		}
		if (Browser.ua.indexOf('ie') < 0) {
			elmOutput.innerHTML = App.Lang.vChannelNeedIE;
			return;
		}
		var v = getWMPVersion()
		if (v.substring(0, v.indexOf('.')) < 6) {
			elmOutput.innerHTML = App.Lang.vChannelNeedWMP9;
			return;
		}
		if (!hasMMC()) {
			elmOutput.innerHTML = App.Lang.vChannelNeedMMC;
			return;
		}
		
		elmOutput.innerHTML = App.Lang.loadModuleData;
		
		if (bType == 's') {
			var url = dataUrl_s;
		}
		else {
			var url = dataUrl_v;
		}

		new LinkFile(url, {
						type: 'script',
						callBack: {
							variable: 'playurl',
							onLoad: this.loadedData.bind(this),
							onFailure: this.noData.bind(this)
							/*timeout: 20,
							timerStep: 500*/
						}});
	};
	this.loadedData = function() {
		this.showContent();
	};
	this.noData = function() {
		elmOutput.innerHTML = App.Lang.fileNotFound;
	}

	this.showContent = function() {
		clearInterval(timerSetIframeSize);
		elmOutput.style.height = '1px';
		
		_vchannel_param = playurl;
		_vchannel_path = (typeof _vchannel_path != 'undefined')? _vchannel_path : '/flash/vchannel/';
		_vchannel_bType = bType;
		var str = '<iframe name="vchannel" id="vchannel" src="'+ _vchannel_path +'index.html" style="border:0;overflow:hidden;width:100%;" allowTransparency="true"></iframe>';
		elmOutput.innerHTML = str;
		elmIframe = elmOutput.firstChild;
		
		timerSetIframeSize = setInterval(this.setIframeSize.bind(this), 500);
	};
	this.setIframeSize = function() {
		if (Math.floor(elmOutput.offsetWidth*0.81+40) != Math.floor(elmOutput.offsetHeight)) {
			if (!this.vObj) {this.vObj = frames['vchannel'].document.getElementsByTagName('object')[0];}
			if (this.vObj) {
				this.vObj.height = '1';
			}
			elmIframe.style.height = '1px';
			elmOutput.style.height = (elmOutput.offsetWidth*0.81+40) +'px';
			elmIframe.style.height = '100%';
			if (this.vObj) {
				this.vObj.height = '100%';
			}
		}
	};
	this.updateData2 = function() {
		var url = dataUrl_con;
		var options = {
			onComplete: this.analyseContent2.bind(this)
		};
		request_data = new App.ImpFile(url, options);
	};
	this.analyseContent2 = function(req) {
		if (!req || !req.responseText || !req.responseXML) {
			elmOutput2.innerHTML = '';
			return;
		}
		this.showContent2(req);
	};
	this.showContent2 = function(req) {
		var vnews = req.responseXML.getElementsByTagName('vnews');
		$A(vnews).each(function(v) {
			var divV = document.createElement('div');
			divV.className = 'vCon';
			var str = '';
			str += '<a href="'+ Element.getChildValueByTagName(v, 'url')[0] +'" target="_blank">';
			str += '<img src="'+ Element.getChildValueByTagName(v, 'pictureAddr')[0] +'" alt="'+ Element.getChildValueByTagName(v, 'title')[0] +'" />';
			str += Element.getChildValueByTagName(v, 'title')[0];
			str += '</a>';
			divV.innerHTML = str;
			
			elmOutput2.appendChild(divV);
		});
	};
	function getWMPVersion() {
		var uv = '';
		if ($('oClientCaps')) {
			wmpV = $('oClientCaps').getComponentVersion("{22D6F312-B0F6-11D0-94AB-0080C74C7E95}","ComponentID");
			if (wmpV) {
				var uv = wmpV.replace(',', '.');
			}
		}
		return uv;
	}
	function hasMMC() {
		var flag = false;
		try{
			var player = new ActiveXObject( "MMCShell.MMCPlayer" );
			flag = true;
			player = null;
		}
		catch(e) {}
		return flag;
	}
	function getBroadcastList() {
		var str = '';
		$H({"v": App.Lang.sohuEntertainmentBroadcast,
		    "s": App.Lang.sohuSportsBroadcast}).each(function(c){
			if (c.key == bType) {
				str += '<option value="'+ c.key +'" selected>'+ c.value +'</option>';
			} else {
				str += '<option value="'+ c.key +'">'+ c.value +'</option>';
			}
		});
		return str;
	}
};
registerWidget('v');