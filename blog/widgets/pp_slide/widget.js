/******* Music Album Widget **********/
//	Author: Jady
//	First Created: 2007-01-09
//	Last Update: 2007-01-22
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var pp_slide = function(m_data, m_content, m_edit, w_path){
	
	//	static url links
	var wdtUrl = {
		make: 'http://blog.sohu.com/people/!' + _xpt + '/album/slide.jhtml?method=create',
		swf: 'http://blog.sohu.com/people/!' + _xpt + '/album/slide.jhtml?method=getswf'
	}
	
	//	widget saved data
	var wdtData = {
		id: 0,
		userid: '',
		title: '',
		//	swf: '',
		swfvars: ''
	}
	
	//	widget request data from server
	var wdtEdit = null;
	
	//	widget used param in runtime
	var needConfig = true;
	var wdtVn = '';
	
	//	some element in widget
	var outputEle;
	var editEle;
	var slidesEle;
	
	
	this.initParams = function() {
		wdtVn = '_JD_P_slides_' + this.id;
		
		if(typeof(m_data) == "object") {
			wdtData.id = m_data.id;
			wdtData.userid = m_data.userid;
			wdtData.title = m_data.title;
			//	wdtData.swf = m_data.swf;
			wdtData.swfvars = m_data.swfvars;
			
			needConfig = false;
		}
		
		if(!wdtData.title) wdtData.title = this.getTitle();
		else this.setTitle(wdtData.title);
	};
	this.showSlide = function() {
		if (!outputEle) this.initElement();
		var arr = [];
		if (App.Permit.editModule) {
			arr.push('<div class="mngBtn"><a href="' + wdtUrl.make + '" title="制作动感相册" target="_blank">制作动感相册</a>&nbsp;|&nbsp;<a href="' + this.getManageUrl() + '" title="管理所有动感相册" target="_blank">管理</a></div>');
		}
		arr.push('<embed src="' + wdtUrl.swf + '" flashvars="' + wdtData.swfvars + '" quality="high" width="100%" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" swLiveConnect="true" wmode="opaque" />');
		arr.push('<div style="margin-top:5px; text-align: right;clear:both;"><a href="' + this.getMoreUrl() + '" title="查看更多精彩动感相册" target="_blank">更多精彩动感相册</a></div>');
		outputEle.innerHTML = arr.join('');
		var height = outputEle.offsetWidth * 0.75;
		$(outputEle).select("embed")[0].style.height = height + 'px';
		this.loaded();
	};
	this.initEditElements = function() {
		m_edit.innerHTML = "";
		editEle = document.createElement("div");
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="45px">所有相册: </td>';
		str += '<td><select style="width:120px;"><option value="">'+ App.Lang.loading +'</option></select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" disabled="disabled" /></td>';
		str += '</tr></table>';
		editEle.innerHTML = str;
		m_edit.appendChild(editEle);
		
		slidesEle = editEle.firstChild.rows[0].cells[1].firstChild;
		
		this.saveBtn = editEle.firstChild.rows[1].cells[1].firstChild;
		this.eventSaveData = this.onEditSave.bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
		
		setTimeout(this.requestEditData.bind(this,true), 10);
	};
	this.showEditContent = function() {
		var str = '';
		
		str += '<select style="width:120px;">';
		var haveData = false;
		if(wdtEdit.length) {
			for(var i=0; i<wdtEdit.length; i++) {
				var itemNow = wdtEdit[i];
				if (itemNow && itemNow.id) {
					str += '<option value="' + i + '"' + (itemNow.swfvars == wdtData.swfvars ? ' selected="selected"' : '') + '>' + itemNow.name +'</option>';
					haveData = true;
				}
			}
		} 
		
		if (!haveData) {
			str += '<option value="">您还没有动感相册</option>';
		} else {
			needConfig = false;
			this.saveBtn.disabled = false;
		}
		str += '</select>';
		
		var tmpElm = slidesEle.parentNode;
		tmpElm.innerHTML = str;
		slidesEle = tmpElm.firstChild;
	};
	this.onEditSave = function(e) {
		
		var dataNow = wdtEdit[parseInt(slidesEle.value)];
		
		var needUpdate = false;
		if(wdtData.swfvars != dataNow.swfvars) {
			needUpdate = true;
		}
		
		if(needUpdate) {
			wdtData = {
				id: dataNow.id,
				userid: dataNow.userid,
				//	swf: dataNow.swf,
				swfvars: dataNow.swfvars,
				title: dataNow.name
			}
			this.save(wdtData);
			this.setTitle(wdtData.title);
			this.showSlide();
		} else {
			this.closeEdit();
			return true;
		}
	};
	
	
	this.initialize = function() {
		this.initParams();
		if(needConfig) {
			m_content.innerHTML = App.Permit.editModule ? '您可以使用此模块，来展示一个您精心制作的动感相册。<br /><br />请点击此模块右上角的“设置”，选择您要展示的作品。<br /><br />如果您还没有动感相册，那赶快<a href="' + wdtUrl.make + '" target="_blank" title="制作动感相册">创作一个</a>吧，乐趣无穷哦~' : App.Lang.hasNotSetParm;
		} else {
			this.initElement();
			this.showSlide();
		}
		this.loaded();
	};
	this.initElement = function() {
		m_content.innerHTML = "";
		
		outputEle = document.createElement("div");
		m_content.appendChild(outputEle);
	};
	this.edit = function() {
		this.initEditElements();
	};
	this.requestEditData = function() {
		window[wdtVn] = null;
		wdtEdit = null;
		
		new LinkFile(this.slidesImplUrl(), {
			type: 'script',
			noCache: true,
			callBack: {
				variable: wdtVn,
				onLoad: this.loadEditData.bind(this),
				onFailure: this.noEditData.bind(this)
		}});
	};
	this.noEditData = function() {
		m_edit.innerHTML = App.Lang.fileNotFound;
	};
	this.loadEditData = function() {
		wdtEdit = window[wdtVn].status == 0 ? window[wdtVn].data : [];
		this.showEditContent();
	};
	
	this.getMoreUrl = this.getManageUrl = function() {
		return !!wdtData.userid ? ('http://blog.sohu.com/people/!' + _xpt + '/slide.jhtml') : 'http://blog.sohu.com';
	};
	this.slidesImplUrl = function() {
		return 'http://blog.sohu.com/people/!' + _xpt + '/album/slide.jhtml?method=list&xp=' + _xpt + '&st=0&sz=100&vn=' + wdtVn;
	};
	this.destroy = function() {
		if(outputEle) Element.remove(outputEle);
		m_content.innerHTML = "";
	};
	this.refresh = function() {
		if (!needConfig) this.showSlide();
	};
};
registerWidget("pp_slide");