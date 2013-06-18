/******* Custom_Links Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-07-06
//	Last Update: 2006-07-07
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Custom_Links = function(m_data, m_content, m_edit){

	/*
	//为了过滤自定义列表，保存data2	[ 2012-3-5 ]
	var data2 ={};
	jQuery.each(preloadUserData,function(i,obj){
		if(obj.id == 'm_34987324'){
			data2 = obj.data2.linkList;
		}
	});
	*/
	
	

	var icoLib = {
		flag: {name: '旗帜', url: App.Actions.imgPath+'ico_flag.gif'},
		book: {name: '书', url: App.Actions.imgPath+'ico_book.gif'},
		bookmark: {name: '收藏', url: App.Actions.imgPath+'ico_bookmark.gif'},
		cd: {name: 'CD', url: App.Actions.imgPath+'ico_cd.gif'},
		music: {name: '音乐', url: App.Actions.imgPath+'ico_music.gif'}, 
		picture: {name: '图片', url: App.Actions.imgPath+'ico_picture.gif'},
		video: {name: '电影', url: App.Actions.imgPath+'ico_video.gif'}
	};
	var linkList = [];
	var ico = 'flag';
	if (m_data) {
		ico = m_data.ico || 'flag';
		linkList = m_data.linkList || [];
	}
	var divAdd;
	var elmOutput;
	var elmOutputE;
	var linkList;
	var LINK_PREFIX = 'link_';
	var editingLink;
	var editingIndex;
	var divEditingLink = null;
	var delingIndex;
	var divDelingLink = null;
	var lastIco;


	this.initialize = function() {
		this.setIcon();
		 this.build();
		 this.showContent();
	};
	this.destroy = function() {
		Element.remove(elmOutputE);
		Element.remove(elmOutput);
		linkList = null;
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
		str += '<td>'+ App.Lang.modIco +': </td>';
		str += '<td class="icoSelection">';
		str += getIcoList();
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
			c.onclick = this.setIcon.bind(this, c.getAttribute('icoId'));
		}.bind(this));
		
		this.saveBtn = elmOutputE.firstChild.rows[2].cells[1].firstChild;
		this.eventSaveData = this.saveData .bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);

	};
	this.setIcon = function(i) {
		if (i) {
			ico = i;
		}
		this.setIco(icoLib[ico].url);
	};
	this.saveData = function() {
		if (getTureLength($F(this.titleIpt))>16) {
			var str = App.Lang.modTitleTooLong+'('+getTureLength($F(this.titleIpt))+App.Lang.byte+')';
			str += '\n'+App.Lang.reduceTo+'16'+App.Lang.byte+'(8'+App.Lang.chsWord+')';
			alert(str);
			$(this.titleIpt).focus();
			return;
		}
		if (this.getTitle() == $F(this.titleIpt).unescapeHTML() && lastIco == ico) {
			this.closeEdit();
			return;
		}
		this.saveBtn.disabled = 'disabled';
		new Insertion.After(this.saveBtn, App.Lang.loading);
		this.setTitle($F(this.titleIpt).unescapeHTML(), true);
		lastIco = ico;
		var data = {
			ico: ico,
			linkList: linkList
			
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
	this.saveContent = function() {
		var data = {
			ico: ico,
			linkList: linkList
		};
		this.save(data);
	};
	this.build = function() {
		if(App.Permit.editModule){
			divAdd = document.createElement('div');
			divAdd.className = 'linksAdd';
			var str = '';
			str += '<a href="javascript:void(0)">';
			str += App.Lang.add;
			str += '</a>';
			divAdd.innerHTML = str;
			
			this.eventEditLink = this.editLink.bind(this);
			Event.observe(divAdd.firstChild, 'click', this.eventEditLink);
			
			m_content.appendChild(divAdd);
		}
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
	};
	this.showContent = function() {
		if (typeof linkList == 'undefined' || !linkList) {
			elmOutput.innerHTML = App.Lang.noCustomLinks;
			return;
		}
		if (linkList.length === 0) {
			elmOutput.innerHTML = App.Lang.noCustomLinks;
			return;
		}
		elmOutput.innerHTML = '';
		$A(linkList).each(function(l, i){
			elmOutput.appendChild(this.getOneLink(l, i));
		}.bind(this));
	};
	this.getOneLink = function(l, i) {

		var ispass =[];
		var str = l.url;
		var arr = ['163.com','sohu.com','taobao.com','sina.com'];	
		
		for(var k=0; k<arr.length; k++){
			var reg = new RegExp(arr[k]);
			ispass.push(reg.test(str));
		}
		
		var mk = false;
		for(var j=0; j<ispass.length; j++){
			if(ispass[j]){
				mk=true;
			}
		}
		
		
		var divLink = document.createElement('div');
		if(mk == true){
		
			divLink.setAttribute('id', LINK_PREFIX + i);
			Element.addClassName(divLink, 'link');
			
			var divTit = document.createElement('div');
			Element.addClassName(divTit, 'tit');
			var str = '';
			str += '<a href="'+ l.url +'" target="_blank" title="'+l.tit+'">';
			str += l.tit;
			str += '</a>';
			divTit.innerHTML = str;
			
			var divDesc = document.createElement('div');
			Element.addClassName(divDesc, 'desc');
			divDesc.setAttribute('title', l.desc);
			divDesc.innerHTML = l.desc;
			
		}else{
		
			divLink.setAttribute('id', LINK_PREFIX + i);
			//divLink.setAttribute("style","display:none");
			
			jQuery(divLink).hide();
			
			Element.addClassName(divLink, 'link');
			
			
			var divTit = document.createElement('div');
			Element.addClassName(divTit, 'tit');
			var str = '';
			str += '<a href="'+ l.url +'" target="_blank" title="'+l.tit+'">';
			str += l.tit;
			str += '</a>';
			divTit.innerHTML = str;
			
			var divDesc = document.createElement('div');
			Element.addClassName(divDesc, 'desc');
			divDesc.setAttribute('title', l.desc);
			divDesc.innerHTML = l.desc;
		
		}
		
		//事件绑定
		if(App.Permit.editModule){
			var divOpr = document.createElement('div');
			Element.addClassName(divOpr, 'opr');
			var str2 = '';
			str2 += '<img src="'+ App.Actions.imgPath +'ico_edit.gif" alt="'+ App.Lang.editBtn +'" />';
			str2 += '<img src="'+ App.Actions.imgPath +'ico_del.gif" alt="'+ App.Lang.del +'" />';
			divOpr.innerHTML = str2;
			
			this.eventEditLink = this.editLink.bind(this, i);
			Event.observe(divOpr.firstChild, 'click', this.eventEditLink);
			this.eventDelLink = this.delLink.bind(this, i);
			Event.observe(divOpr.lastChild, 'click', this.eventDelLink);
			
			divLink.appendChild(divOpr);
		}
		divLink.appendChild(divTit);
		divLink.appendChild(divDesc);
		
		return divLink;
	}
	this.delLink = function(index) {
		delingIndex = index;
		var opt4popWin = {
			type:		'confirm',
			content:	App.Lang.confirmDelCustomLink,
			focus:		false,
			okAction:	this.doDelLink.bind(this)
		};
		new PopWin(opt4popWin);
	};
	this.doDelLink = function() {
		linkList = $A(linkList).reject(function(l,i) { return i == delingIndex; });
		divDelingLink = $A(elmOutput.childNodes).find(function(l){return(l.id == LINK_PREFIX+delingIndex)});
		Element.remove(divDelingLink);
		delingIndex = null;
		divDelingLink = null;
		if (linkList.length === 0) {
			elmOutput.innerHTML = App.Lang.noLinks;
		}
		//$LR(JSON.stringify(linkList));
		this.saveContent();
	};
	this.editLink = function(index) {
		this.buildEditLink(index);
		editingIndex = index;
	};
	this.buildEditLink = function(index) {
	
		this.clsEditLink();
		var opr = 'add';
		if (index !== null) {
			editingLink = $A(linkList).find(function(l,i){return(i == index)});
			if (editingLink) {
				opr = 'edit';
				var _tit = editingLink.tit || '';
				var _desc = editingLink.desc || '';
				var _url = editingLink.url || '';
			}
		}
		if (opr == 'add' && linkList.length>=10) {
			alert(App.Lang.customLinksMax);
			return;
		}
		var _tit = _tit || '';
		var _desc = _desc || '';
		var _url = _url || 'http://';
		
		divEdit = document.createElement('div');
		this.divEdit = divEdit;
		Element.addClassName(divEdit, 'linkEdit');

		divEditFrame = document.createElement('div');
		Element.addClassName(divEditFrame, 'editFrame');

		var divHeader = document.createElement('div');
		Element.addClassName(divHeader, 'linkEditHeader');
		divHeader.innerHTML = (opr == 'add')? App.Lang.add : (App.Lang.editBtn+'['+_tit+']');

		var divCls = document.createElement('div');
		Element.addClassName(divCls, 'clsLinkEdit');
		divCls.innerHTML = '<img src="'+App.Actions.imgPath+'ico_cls.gif" alt="'+ App.Lang.close +'" title="'+ App.Lang.close +'" />';
		
		var divEditContent = document.createElement('div');
		Element.addClassName(divEditContent, 'editContent');
		
		
		var str = '';
		str += '<form><table width="100%"><tr>';
		str += '<td>'+ App.Lang.linkTitle +':</td><td><input type="text" value="'+ _tit +'" onfocus="this.select()" class="text" /></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.linkDesc +':</td><td><input type="text" value="'+ _desc +'" onfocus="this.select()" class="text" /></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.linkUrl +':</td><td><input type="text" value="'+ _url +'" onfocus="this.select()" class="text" /></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td><td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /> <input type="button" value="'+ App.Lang.cancel +'" class="button" /></td>';
		str += '</tr></table></form>';
		divEditContent.innerHTML = str;
		
		this.iptTit = divEditContent.firstChild.firstChild.rows[0].cells[1].firstChild;
		this.iptDesc = divEditContent.firstChild.firstChild.rows[1].cells[1].firstChild;
		this.iptUrl = divEditContent.firstChild.firstChild.rows[2].cells[1].firstChild;
		this.iptSbm = divEditContent.firstChild.firstChild.rows[3].cells[1].firstChild;
		this.iptCnl = divEditContent.firstChild.firstChild.rows[3].cells[1].lastChild;
		
		divEditContent.firstChild.onsubmit = function() {
			this.saveEditLink();
			return false;
		}.bind(this)
		
		this.eventClsEdit = this.clsEditLink.bindAsEventListener(this);
		Event.observe(divCls, 'click', this.eventClsEdit);
		Event.observe(this.iptCnl, 'click', this.eventClsEdit);

		divEditFrame.appendChild(divCls);
		divEditFrame.appendChild(divHeader);
		divEditFrame.appendChild(divEditContent);
		divEdit.appendChild(divEditFrame);
		
		if (opr == 'edit') {
			divEditingLink = $A(elmOutput.childNodes).find(function(l){return(l.id == LINK_PREFIX+index)});
			if (divEditingLink) {
				elmOutput.insertBefore(divEdit, divEditingLink);
				$A(divEditingLink.childNodes).each(function(i){
					Element.hide(i);
				});
			}
		}
		else if (opr == 'add') {
			m_content.insertBefore(divEdit, divAdd);
			$A(divAdd.childNodes).each(function(i){
				Element.hide(i);
			});
		}
		this.iptTit.focus();
		
		var _tmpWidth = this.iptTit.parentNode.offsetWidth*0.8 +'px';
		this.iptTit.style.width = _tmpWidth;
		this.iptDesc.style.width = _tmpWidth;
		this.iptUrl.style.width = _tmpWidth;
	};
	this.clsEditLink = function() {
		if (this.divEdit) {
			Element.remove(this.divEdit);
			this.divEdit = null;
		}
		if (divEditingLink) {
			$A(divEditingLink.childNodes).each(function(i){
				Element.show(i);
			});
			divEditingLink = null;
			editingLink = null;
		}
		else {
			$A(divAdd.childNodes).each(function(i){
				Element.show(i);
			});
		}
	};
	this.saveEditLink = function() {
		var expRequire = /.+/;
		var expUrl = /^(http|https|ftp):\/\/([a-zA-Z0-9]|[-_])+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
		if( !expRequire.test( $F(this.iptTit) ) ){
			alert(App.Lang.noCustomTitle);
			$(this.iptTit).focus();
			return;
		}
		if(getTureLength($F(this.iptTit))>30) {
			var str = App.Lang.customTitleTooLong+'('+getTureLength($F(this.iptTit))+App.Lang.byte+')';
			str += '\n'+App.Lang.reduceTo+'30'+App.Lang.byte+'(15'+App.Lang.chsWord+')';
			alert(str);
			$(this.iptTit).focus();
			return;
		}
		if($F(this.iptDesc).length>50) {
			var str = App.Lang.customDescTooLong+'('+getTureLength($F(this.iptDesc))+App.Lang.byte+')';
			str += '\n'+App.Lang.reduceTo+'50'+App.Lang.byte+'(25'+App.Lang.chsWord+')';
			alert(str);
			$(this.iptDesc).focus();
			return;
		}
		if( !expUrl.test( $F(this.iptUrl) ) ){
			alert(App.Lang.noUrl);
			$(this.iptUrl).focus();
			return;
		}
		this.iptSbm.disabled = 'disabled';
		
		if (editingLink && editingLink.tit == $F(this.iptTit) && 
			editingLink.desc == $F(this.iptDesc) && editingLink.url == $F(this.iptUrl)) {
			this.clsEditLink();
			return;
		}
		
		this.saveEditLinkOk();
	};
	this.saveEditLinkOk = function(mngRequest) {
		var addTit = $F(this.iptTit).unescapeHTML() || '';
		var addDesc = $F(this.iptDesc).unescapeHTML() || '';
		var addUrl = $F(this.iptUrl).unescapeHTML() || '';
		
		if (editingLink) {
			linkList = $A(linkList).map(function(l,i) {
				if (i == editingIndex) {
					return({tit:addTit,desc:addDesc,url:addUrl});
				}
				return l;
			}.bind(this));
			if (divEditingLink) {
				var _tit = document.getElementsByClassName('tit', divEditingLink)[0].firstChild;
				_tit.innerHTML = addTit;
				_tit.href = addUrl;
				var _desc = document.getElementsByClassName('desc', divEditingLink)[0];
				_desc.innerHTML = addDesc;
				if (Browser.ua.indexOf('ie')<0) {
					new Effect.Highlight(divEditingLink, { duration: 2.0 });
				}
			}
		}
		else {
			if (linkList.length === 0) {
				elmOutput.innerHTML = '';
			}
			var l = {
				tit: addTit,
				desc: addDesc,
				url: addUrl
			};
			var divLink = this.getOneLink(l,linkList.length);
			linkList.push(l);
			elmOutput.appendChild(divLink);
			document.getElementsByClassName('tit', divLink)[0].firstChild.focus();
			if (Browser.ua.indexOf('ie')<0) {
				new Effect.Highlight(divLink, { duration: 2.0 });
			}
		}
		//$LR(JSON.stringify(linkList)+'<hr />');
		this.clsEditLink();
		this.saveContent();
	};
	function getIcoList() {
		var str = '';
		$H(icoLib).each(function(ic){
			if (ic.key == ico) {
				str += '<div style="background:url('+ic.value.url+');" title="'+ic.value.name+'" icoId="'+ic.key+'"></div>'
			} else {
				str += '<div style="background:url('+ic.value.url+');" title="'+ic.value.name+'" icoId="'+ic.key+'"></div>'
			}
		});
		return str;
	}
};

registerWidget('Custom_Links');