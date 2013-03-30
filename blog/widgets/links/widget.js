/******* Links Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-06-25
//	Last Update: 2008-08-28 (Springwang for POKE)
//	Last Update: 2011-09-23 (jQuery.getJSON - line ：280)
//  Last Update: 2012-01-10 (跟随超过199条时添加“查看更多跟随”) by snandy
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var links = function(m_data, m_content, m_edit){
	
	var divAdd;
	var elmOutput;
	
	var mngUrl = '/manage/link.do';
	var suUrl = '/frag/blogufrag.jsp';
	var request_links;
	var request_sus;
	var linkList;
	var suData;
	var LINK_PREFIX = 'link_';
	var editingLink;
	var divEditingLink = null;
	var delingId;
	var divDelingLink = null;
	var isNewData = false;
	var canReRequest = true;
	var isViewMoreAdded = false;
	
	this.getUrl = function(method) {
		var url = (App.Permit.editModule ? '/manage' : '/page') + '/link.do?m=' + method + '&t=' + timeStamp() + (App.Permit.editModule ? '' : ('&d=' + _blog_domain));
		
		if(method == 'delete'){
			url = '/a/app/friend/friend/delete.do';
		}
		return url;
	};
	this.getListUrl = function() {
		var url = 'http://blog.sohu.com/app/friend.do?m=getwidgetfriend&xpt='+ _upt;
		return url;
	};

	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.build = function() {
		if(App.Permit.editModule){
			divAdd = document.createElement('div');
			Element.addClassName(divAdd, 'linksAdd');
			var str = '';
			str += '<a href="http://i.sohu.com/app/friend/#/a/app/friend/search/find.do" target="_blank" onmousedown="CA.q(\'blog_widget_link_find\');">找朋友</a>';
			str += '<div class="link" style="text-align:center;border-bottom:0;border-top:1px solid;margin-top:3px;padding-top:5px;"><a href="http://blog.sohu.com/manage/main.do?tracker=widget_link" target="_blank"><strong>看看他们在干什么</strong></a><img align="absbottom" src="http://img3.pp.sohu.com/ppp/blog/styles/images/ico_upn_1.gif" title="看看他们在干什么" /></div>';
			divAdd.innerHTML = str;
			
			this.eventEditLink = this.editLink.bind(this,null);
			
			m_content.appendChild(divAdd);
		}
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
	};
	this.subscribe = function(id) {
		if (!id) return;
		this.clsEditLink();
		editingLink = $A(linkList).find(function(l){return(l.id == id)});
		if (!editingLink) return;
		
		divEditingLink = $A(elmOutput.childNodes).find(function(l){return(l.id == LINK_PREFIX+id)});
		
		var opr = 'update';
		var _tit = editingLink.title || editingLink.tit || '';
		var _desc = editingLink.desc || '';
		var _url = editingLink.link || editingLink.url || '';
		var _subscribe = (editingLink.subscribe && editingLink.subscribe == '1') ? '0' : '1';
		
		new Ajax.Request(this.getUrl("update"), {
				method: 'post',
				parameters: (editingLink ? ("id="+id) : "" ) + '&title='+ escape(_tit) + '&desc=' + escape(_desc) + '&link=' + escape(_url) + '&subscribe=' + _subscribe,
				onSuccess: this.saveEditLinkDone.bind(this)
			});
	};
	this.editLink = function(id) {
		this.buildEditLink(id);
	};
	this.isLikeABlog = function(url) {
		return (/^http:\/\/[a-z0-9-]{4,16}\.blog\.sohu\.com\/$/.test(url));
	};
	this.getBlogDomain = function(url) {
		var re = new RegExp("^http:\/\/([a-z0-9-]{4,16})\.blog\.sohu\.com\/$", "");
		var arr = re.exec(url);
		if (arr) {
			return arr[1];
		}
		return '';
	};
	this.buildEditLink = function(id) {
		this.clsEditLink();
		var opr = 'add';
		var notAdminBlog = true;
		if (id) {
			editingLink = $A(linkList).find(function(l){return(l.id == id)});
			if (editingLink) {
				var opr = 'update';
				var _tit = editingLink.title || editingLink.tit || '';
				var _desc = editingLink.desc || '';
				var _url = editingLink.link || editingLink.url || '';
				var _subscribe = (editingLink.subscribe && editingLink.subscribe == '1') ? '1' : '0';
				notAdminBlog = (editingLink.link.indexOf('http://admin.blog.sohu.com') == -1);
			}
		}
		
		if (opr == 'update' && !isNewData) {
			this.updateDyData();
			return;
		} 
		
		var _tit = _tit || '';
		var _desc = _desc || '';
		var _url = _url || 'http://';
		var _subscribe = _subscribe || '1';
		
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
		str += '</tr><tr ' + (opr == 'update' ? ' style="display:none;" ' : '') + '>';
		str += '<td>'+ App.Lang.linkUrl +':</td><td><input type="text" value="'+ this.getBlogDomain(_url) +'" onfocus="this.select()" class="text" style="width:30px;" ' + ((id && this.isLikeABlog(_url)) ? ' disabled="disabled" ' : '') + ' />.blog.sohu.com</td>';
		str += '</tr><tr><td>&nbsp;</td><td><a href="javascript:void(0);" onclick="Element.toggle(\'noSb\')" onmousedown="CA.q(\'blog_widget_link_notsohu\');">不是搜狐博客？</a></td>';
		str += '</tr><tr id="noSb" style="display:none;"><td>&nbsp;</td><td><div style="border:1px solid #ccc;background:#FFFFCC;color:#666;padding:5px;width:95%;float:left;">如果您的好友不是搜狐博客的，您可以添加一个站外友情链接模块，来帮助管理。<br /><a onmousedown="CA.q(\'blog_widget_link_addwidget\');" style="color:#f63;" href="javascript:void(0);" onclick="App.Modules.newMod(\'my_links\');">立即添加>></a></div></td>';
		str += '</tr><tr ' + (opr == 'update' && (!this.isLikeABlog(_url)) ? 'style="display:none;"' : '') + '>';
		str += '<td colspan="2" align="left"><label onmousedown="CA.q(\'blog_widget_link_focus\');"><input type="checkbox" name="subscribe" ' + (_subscribe == "1" ? 'checked="checked"' : '') + ' value="1" />关注该好友</label></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td><td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /> <input type="button" value="'+ App.Lang.close +'" class="button" /></td>';
		str += '</tr><tr ' + (opr == 'add' ? '' : ' style="display:none" ') + '>';
		str += '</tr></table></form>';
		divEditContent.innerHTML = str;
		
		this.iptTit = divEditContent.firstChild.firstChild.rows[0].cells[1].firstChild;
		this.iptDesc = divEditContent.firstChild.firstChild.rows[1].cells[1].firstChild;
		this.iptUrl = divEditContent.firstChild.firstChild.rows[2].cells[1].firstChild;
		this.iptSub = divEditContent.firstChild.firstChild.rows[5].cells[0].firstChild.firstChild;
		this.iptSbm = divEditContent.firstChild.firstChild.rows[6].cells[1].firstChild;
		this.iptCnl = divEditContent.firstChild.firstChild.rows[6].cells[1].lastChild;
		
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
		
		if (opr == 'update' && id) {
			divEditingLink = $A(elmOutput.childNodes).find(function(l){return(l.id == LINK_PREFIX+id)});
			if (divEditingLink) {
				elmOutput.insertBefore(divEdit, divEditingLink);
				$A(divEditingLink.childNodes).each(function(i){
					if (i.nodeType == 1) Element.hide(i);
				});
			}
		}
		else if (opr == 'add') {
			m_content.insertBefore(divEdit, divAdd);
			$A(divAdd.childNodes).each(function(i){
				if (i.nodeType == 1) Element.hide(i);
			});
		}
		this.iptTit.focus();
		
		var _tmpWidth = this.iptTit.parentNode.offsetWidth*0.8 +'px';
		this.iptTit.style.width = _tmpWidth;
		this.iptDesc.style.width = _tmpWidth;
	};
	this.clsEditLink = function() {
		if (this.divEdit) {
			Element.remove(this.divEdit);
			this.divEdit = null;
		}
		if (divEditingLink) {
			$A(divEditingLink.childNodes).each(function(i){
				if (i.nodeType == 1) Element.show(i);
			});
			divEditingLink = null;
			editingLink = null;
		}
		else {
			$A(divAdd.childNodes).each(function(i){
				if (i.nodeType == 1) Element.show(i);
			});
		}
	};
	
	
	this.destroy = function() {
		request_sus = null;
		request_links = null;
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		this.updateData(true);
	};
	this.updateDyData = function() {
		elmOutput.innerHTML = '您的好友数据正在更新，请稍候...<br />请在数据更新完成后再次进行此操作';
		
		new Ajax.Request(this.getListUrl(), {
			method: 'get',
			onSuccess: this.analyseContent.bind(this)
		});
	}
	this.updateData = function(noCache, loadingStr) {
		if ($('linksData')) {
			this.showContent($('linksData').innerHTML);
			$('linksData').innerHTML = '';
			Element.remove($('linksData'));
		}
		else {
			elmOutput.innerHTML = loadingStr || App.Lang.loadModuleData;
			
			var self = this;
			jQuery.getJSON('http://blog.sohu.com/friend/widget.do?m=getwidgetfriend&cb=?',{xpt: _xpt},function(data){
				self.analyseContent(data);
			});
			
		}
	};
	this.analyseContent = function(transport) {
		this.loaded();
		try {
			var data=transport;
			if (data.data && data.data.length > 0 && !data.data[0]) {
				throw new Error("数据格式不正确");
			}
		} catch (e) {
			if (canReRequest) {
				canReRequest = false;
				this.updateDyData();
			} else {
				elmOutput.innerHTML = '数据格式不正确，请联系在线客服';
			}
			return;
		}
		isNewData = false;
		if (data) {
			if (typeof data.status == "number") {
				isNewData = true;
				if (data.status == 0) {
					this.showContent(data.data);
				} else {
					elmOutput.innerHTML = data.statusText;
				}
			} else {
				if (data.length > 0) data.splice(0, 1);
				this.showContent(data, true);
			}
		} else {
			elmOutput.innerHTML = App.Lang.analyseFileError;
			return;
		}
		if(transport.data.length > 199 && !isViewMoreAdded) {
			var str = '';
			if(_blog_domain) {
				str = '<a style="float:right" href="http://' + _blog_domain + '.i.sohu.com/app/friend/">查看更多跟随</a>';
			}else {
				str = '<a style="float:right" href="http://i.sohu.com/p/' + _upt + '/app/friend/">查看更多跟随</a>';
			}
			var div = document.createElement('div');
			div.innerHTML = str;
			elmOutput.parentNode.parentNode.appendChild(div);
			isViewMoreAdded = true;
		}
	};
	this.showContent = function(list, isOld) {
		this.loaded();
		linkList = list;
		if (typeof linkList == 'undefined' || !linkList) {
			elmOutput.innerHTML = App.Lang.analyseFileError;
			return;
		}
		if (linkList.length === 0) {
			if(App.Permit.editModule)
				elmOutput.innerHTML = App.Lang.noLinks;
			else
				elmOutput.innerHTML = App.Lang.noLinksGuest;
			return;
		}
		elmOutput.innerHTML = '';
		//	var suIds = [];
		var ids = [];
		$A(linkList).each(function(l){
			if (!l || typeof l.id == 'undefined' || !l.id) {throw $continue;}
			if (isOld) {
				if(l.su && l.su != ''){
					ids.push(l.su);
				}
			} else {
				if (l.xp && l.xp != '') {
					ids.push(l.xp);
				}
			}
			elmOutput.appendChild(this.getOneLink(l));
		}.bind(this));
		
		if (isOld) {
			this.getSuData(ids);
		} else {
			this.getXpuData(ids);
		}
		setTimeout(this.initCandleMen.bind(this), 10);
	};
	this.getXpuData = function(ids) {
		if (!ids || ids.length === 0) {return;}
		new Ajax.Request(suUrl + '?c=' + timeStamp(), {
			method: 'post',
			parameters: 'xps=' + ids.join(','),
			onComplete: this.showXpu.bind(this)
		});
	};
	this.getSuData = function(suIds) {
		if (!suIds || suIds.length === 0) {return;}
		var options = {
			parameters: 'ids='+ suIds.join(','),
			onComplete: this.showSu.bind(this),
			method: 'post'
		};
		request_sus = new App.ImpFile(suUrl, options);
	};
	this.showXpu = function(req) {
		suData = JSON.parse(req.responseText);
		if (typeof suData == 'undefined' || !suData) {
			return;
		}
		$A(document.getElementsByClassName('upIco', elmOutput)).each(function(up) {
			if (!up.getAttribute('xp')) {throw $continue;}
			var id = up.getAttribute('xp');
			if (typeof suData[id] == 'undefined' || !suData[id]) {throw $continue;}
			var mofi = suData[id];
			var mofiLevel = 1;
			var mofiTitle = '';
			if(mofi && mofi > 0){
				var now = new Date().getTime();
				var interval = now - mofi; 
				if(interval < 0) interval = 0;
				var minu = Math.floor(interval / (60 * 1000));
				var day = Math.floor(minu / (24 * 60));
				if(minu == 0){
					mofiLevel = 4;
					mofiTitle += '更新时间未知';
				}else if(minu < 60){
					mofiLevel = 1;
					mofiTitle += '刚刚更新，快去抢个沙发～';
				}else if(day < 1){
					mofiLevel = 2;
					mofiTitle += Math.floor(minu / 60) +'小时前更新，去看看有什么变化';
				}else if(day < 7){
					mofiLevel = 3;
					mofiTitle += day +'天前更新，去顶顶支持他一下';
				}else{
					mofiLevel = 4;
					mofiTitle = '好久没更新了，这家伙像是去火星了～';
				}
			}else{
				mofiLevel = 4;
				mofiTitle += '更新时间未知';
			}
			up.src = 'http://img3.pp.sohu.com/ppp/blog/styles/images/ico_upn_' + mofiLevel + '.gif';
			up.title = mofiTitle;
		});
	};
	this.showSu = function(req) {
		suData = JSON.parse(req.responseText);
		if (typeof suData == 'undefined' || !suData) {
			return;
		}
		$A(document.getElementsByClassName('upIco', elmOutput)).each(function(up) {
			if (!up.getAttribute('su')) {throw $continue;}
			var id = up.getAttribute('su');
			if (typeof suData[id] == 'undefined' || !suData[id]) {throw $continue;}
			var mofi = suData[id];
			var mofiLevel = 1;
			var mofiTitle = '';
			if(mofi && mofi > 0){
				var now = new Date().getTime();
				var interval = now - mofi; 
				if(interval < 0) interval = 0;
				var minu = Math.floor(interval / (60 * 1000));
				var day = Math.floor(minu / (24 * 60));
				if(minu == 0){
					mofiLevel = 4;
					mofiTitle += '更新时间未知';
				}else if(minu < 60){
					mofiLevel = 1;
					mofiTitle += '刚刚更新，快去抢个沙发～';
				}else if(day < 1){
					mofiLevel = 2;
					mofiTitle += Math.floor(minu / 60) +'小时前更新，去看看有什么变化';
				}else if(day < 7){
					mofiLevel = 3;
					mofiTitle += day +'天前更新，去顶顶支持他一下';
				}else{
					mofiLevel = 4;
					mofiTitle = '好久没更新了，这家伙像是去火星了～';
				}
			}else{
				mofiLevel = 4;
				mofiTitle += '更新时间未知';
			}
			up.src = 'http://img3.pp.sohu.com/ppp/blog/styles/images/ico_upn_' + mofiLevel + '.gif';
			up.alt = up.title = mofiTitle;
		});
	};
	this.initCandleMen = function() {
		SohuIM.setCandleMenParam();
		try {
			if (typeof sohuim != undefined && sohuim && sohuim.candleArmy && sohuim.candleArmy.RenderAll) {
				sohuim.candleArmy.RenderAll(webim_config.cm_container, webim_config.product);
			}
		}catch(e){}
	};
	this.getOneLink = function(l) {
		var isOld = false;
		if (typeof(l.link) != 'string') {
			l.link = l.url;
			l.title = l.tit;
			l.xp = l.param;
			isOld = true;
		}
	
		var notAdminBlog = (l.link.indexOf('http://admin.blog.sohu.com') == -1);
	
		var divLink = document.createElement('div');
		divLink.setAttribute('id', LINK_PREFIX + l.id);
		Element.addClassName(divLink, 'link');
		
		var divTit = document.createElement('div');
		Element.addClassName(divTit, 'tit');
		var str = '';
		str += '<a href="'+ l.link +'" target="_blank" title="'+ l.title +'" onmousedown="CA.q(\'blog_widget_link_friendblog\');">';
		str += l.title;
		str += '</a>';

		if (l.xp || l.su) {
			str += '<img src="'+ App.Actions.imgPath +'spacer.gif" align="absbottom" style="height:16px;" class="upIco"' + (isOld ? (' su="'+ l.su +'" ') : (' xp="'+ l.xp +'" ')) + ' title="' + App.Lang.loading + '" />';
		}
		if (l.type&& l.type == "2") {
			str += '<img src="http://img3.pp.sohu.com/ppp/blog/widgets/links/ico_dlink.gif" align="absmiddle" class="upIco" title="互为好友" />';
		}
		if(l.xp && l.xp.length > 0){
			str += ' <a href="javascript://;" name="onlineIcon" style="display:none" rel="" param="'+ l.xp +'"></a>';
		}
		str += '<a  href="javascript://;" onmousedown="CA.q(\'blog_widget_link_poke\');" onclick="pokeMe(false,\''+l.xp+'\')"><img align="absmiddle"  src="http://js1.pp.sohu.com.cn/ppp/images/icons/ico_poke.gif" alt="向他打招呼" title="向他打招呼"/></a>';
		divTit.innerHTML = str;
		
		var divDesc = document.createElement('div');
		Element.addClassName(divDesc, 'desc');
		divDesc.title = l.desc;
		divDesc.innerHTML = l.desc;
		
		if(App.Permit.editModule){
			var divOpr = document.createElement('div');
			Element.addClassName(divOpr, 'opr');
			
			
			var str2 = '';
			str2 += '<img onmousedown="CA.q(\'blog_widget_link_del\');" src="'+ App.Actions.imgPath +'ico_del.gif" alt="'+ App.Lang.del +'" />';
			divOpr.innerHTML = str2;

			this.eventDelLink = this.delLink.bind(this, l.id);
			Event.observe(divOpr.lastChild, 'click', this.eventDelLink);
			
			divLink.appendChild(divOpr);
		}
		divLink.appendChild(divTit);
		divLink.appendChild(divDesc);
		return divLink;
	};
	this.delLink = function(id) {
		if (!isNewData) {
			this.updateDyData();
			return;
		} 
		var opt4popWin = {
			type:		'confirm',
			content:	App.Lang.confirmDelLink,
			focus:		false,
			okAction:	this.acceptDel.bind(this, id)
		};
		new PopWin(opt4popWin);
	};
	this.acceptDel = function(id) {
		delingId = id;
		LoadBar.show(App.Lang.loading);
		new Ajax.Request(this.getUrl("delete"), {
				method: 'post',
				parameters: "friendid="+delingId,
				onSuccess: this.delLinkDone.bind(this)
			});
	};
	this.delLinkDone = function(transport) {
		LoadBar.hide();
		var data = eval("(" + transport.responseText + ")");
		if (!data || data.status != 1) {
			alert(!!data ? '删除成功' : '发生错误，请重新操作');
		}
		this.clsEditLink();
		this.updateData(true);
	};
	this.doDelLink = function(mngRequest) {
		this.delLinkDone();o
		
		linkList = $A(linkList).reject(function(l) { return l.id == delingId; });
		divDelingLink = $A(elmOutput.childNodes).find(function(l){return(l.id == LINK_PREFIX+delingId)});
		Element.remove(divDelingLink);
		delingId = null;
		divDelingLink = null;
		if (linkList.length === 0) {
			elmOutput.innerHTML = App.Lang.noLinks;
		}
	};
	this.saveEditLink = function() {
		var opr = editingLink ? "update" : "add";
	
		var expRequire = /.+/;
		var expUrl = /^[a-z0-9-]{4,16}$/;
		if( !expRequire.test( $F(this.iptTit) ) ){
			alert(App.Lang.noTitle);
			$(this.iptTit).focus();
			return;
		}
		if($F(this.iptTit).length>32) {
			var str = App.Lang.customTitleTooLong+'('+$F(this.iptTit).length+App.Lang.word+')';
			str += '\n'+App.Lang.reduceTo+'32'+App.Lang.word;
			alert(str);
			$(this.iptTit).focus();
			return;
		}
		if($F(this.iptDesc).length>64) {
			var str = App.Lang.customDescTooLong+'('+$F(this.iptDesc).length+App.Lang.word+')';
			str += '\n'+App.Lang.reduceTo+'32'+App.Lang.word;
			alert(str);
			$(this.iptDesc).focus();
			return;
		}
		if (opr == 'add' && !expUrl.test( $F(this.iptUrl) ) ){
			alert('请填写搜狐博客的域名');
			$(this.iptUrl).focus();
			return;
		}
		this.iptSbm.disabled = 'disabled';
		
		var newUrl = 'http://' + $F(this.iptUrl).unescapeHTML() + '.blog.sohu.com/';
		if (editingLink && editingLink.title == $F(this.iptTit).unescapeHTML() && 
			editingLink.desc == $F(this.iptDesc).unescapeHTML() &&  
			editingLink.subscribe == (this.iptSub.checked ? "1" : "0")) {
			
			this.clsEditLink();
			return;
		}
		
		LoadBar.show(App.Lang.loading);
		
		new Ajax.Request(this.getUrl(editingLink ? "update" : "add"), {
				method: 'post',
				parameters: (editingLink ? ("id="+editingLink.id) : "" ) + '&title='+ escape($F(this.iptTit).unescapeHTML()) + '&desc=' + escape($F(this.iptDesc).unescapeHTML()) + (opr == 'add' ? ('&link=' + escape(newUrl)) : '') + '&subscribe=' + (this.iptSub.checked ? "1" : "0"),
				onSuccess: this.saveEditLinkDone.bind(this)
			});
		
	};
	this.saveEditLinkDone = function(transport) {
		this.saveEditLinkOk(transport);
	};
	this.getSpecialEle = function(parent, attName, attValue) {
		var eles = parent.getElementsByTagName("img");
		for (var i=0; i<eles.length; i++) {
			if (eles[i].getAttribute(attName) && eles[i].getAttribute(attName) == attValue) {
				return eles[i];
			}
		}
		return null;
	};
	this.saveEditLinkOk = function(transport) {
		LoadBar.hide();
		var data = eval("(" + transport.responseText + ")");
		if (!data || data.status != 0) {
			alert(!!data ? data.statusText : '发生错误，请重新操作');
			if (this.iptSbm) this.iptSbm.disabled = false;
		}
		
		if (!isNewData) {
			this.clsEditLink();
			this.updateData(true);
			return;
		}
		
		var linkInfo = data.data;
		
		if (editingLink) {
			linkList = $A(linkList).map(function(l) {
				if (l.id == editingLink.id) {
					return linkInfo;
				}
				return l;
			}.bind(this));
			if (divEditingLink) {
				var _tit = document.getElementsByClassName('tit', divEditingLink)[0].firstChild;
				_tit.innerHTML = linkInfo.title || $F(this.iptTit).unescapeHTML();
				var _desc = document.getElementsByClassName('desc', divEditingLink)[0];
				_desc.innerHTML = linkInfo.desc || $F(this.iptDesc).unescapeHTML();
				
				if (Browser.ua.indexOf('ie')<0) {
					new Effect.Highlight(divEditingLink, { duration: 2.0 });
				}
			}
		}
		else {
			if (linkList.length === 0) {
				elmOutput.innerHTML = '';
			}
			linkList.push(linkInfo);
			var divLink = this.getOneLink(linkInfo);
			elmOutput.appendChild(divLink);
			document.getElementsByClassName('tit', divLink)[0].firstChild.focus();
			if (Browser.ua.indexOf('ie')<0) {
				new Effect.Highlight(divLink, { duration: 2.0 });
			}
			if (linkInfo.xp.length > 0) setTimeout(this.initCandleMen.bind(this), 10);
		}
		this.clsEditLink();
	};
};

registerWidget('links');
