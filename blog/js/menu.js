/******* menu **********/
/*	Author: Todd Lee (www.todd-lee.com)
/*	First Created: 2004-04-06
/*	Last update: 2005-12-15
*/

var MENU_BOX = "tool-bar";	// ���峣�� MENU_BOX Ϊ�������и����˵�������
var MENU_FRAMEID = "menu_iframe";	// ���峣�� MENU_FRAMEID Ϊ�����˵��µĸ���iframe��id
var MENU_ARROWALT = "";

/***** sample
var menu_toolDiv = [
	["��һ��", "alert('�����ˡ���һ�¡���ť')", "��ѡ��������Ϊ����־����"],
	["��Ϊ����", "alert('�����ˡ���Ϊ���ѡ���ť')", "���˲��ͼ�Ϊ�ҵĺ���"]
]
var menu_tool = new MenuObj("menu_tool", "menu_toolTd", "menu_toolArrowTd", "menu_toolDiv", "link-over", "link", "link-over", "link-arrow-over", "link-arrow", "link-arrow-down");
*****/

var menuObj = new Array();
//����������汾
var navVersion;
if( navigator.appVersion.substr( navigator.appVersion.indexOf("MSIE")+5 , 3 ) >=5.5 )
	navVersion = true;
else
	navVersion = false;
//����˵�����
//function MenuObj(����,��ť����TD��ID,��ť�Լ�ͷTD��ID(�ɿ�),�������ID,��꾭��ʱ����ʽ����,�ƿ�ʱ����ʽ����,��������ʽ����)
//var menuNew = new MenuObj("menuNew","newTd","newArrowTd","newDivTd","menu-over","menu-out","menu-click")
function MenuObj(theName, selfId, arrowId, divId, overCss, outCss, clickCss, disableCss, overCssArrow, outCssArrow, clickCssArrow, disableCssArrow) {
	this.name = 		theName;
	this.selfObjId = 	selfId;
	this.arrowObjId = 	arrowId;
	this.divObjId = 	divId;
	this.bOver = 		overCss;
	this.bOut = 		outCss;
	this.bClick = 		clickCss;
	this.bDisable = 	disableCss;
	this.arrowOver = 	overCssArrow;
	this.arrowOut = 	outCssArrow;
	this.arrowClick = 	clickCssArrow;
	this.arrowDisable = disableCssArrow;
	this.showing = 		false;
	this.disabled = 	false;
	this.frmObjId = 	MENU_FRAMEID;
	
	this.buildMenu = 		buildMenu;
	this.buildSubmenu =		buildSubmenu;
	this.buildIframe =		buildIframe;
	this.changeCss = 		changeCss;
	this.showHideSubMenu = 	showHideSubMenu;
	
	document.onclick = mouseClick;
	menuObj[menuObj.length] = this;
	
	// define menu
	if (!document.getElementById(selfId) && document.getElementById(selfId+"_box")) 
		this.buildMenu();
	this.selfObj = document.getElementById(selfId);
	if (arrowId) this.arrowObj = document.getElementById(arrowId);
	
	// define submenu
	if (!document.getElementById(divId)) 
		this.buildSubmenu();
	this.divObj = document.getElementById(divId);
	
	
	// define iframe
	if (!document.getElementById(this.frmObjId)) 
		this.buildIframe();
	this.frmObj = document.getElementById(this.frmObjId);
	
}
// define menu
function buildMenu() {
	if (!document.getElementById(this.selfObjId+"_box")) 
		return false;
	
	// clean object
	this.selfObj = null;
	this.arrowObj = null;
	document.getElementById(this.selfObjId+"_box").innerHTML = '';
	
	try {var _divId = eval(this.divObjId);}
	catch(e){var _divId = ''}
	if (!this.divObjId || !_divId) 
		return;
		
	if (getCookie('blog_'+this.name) && _divId[getCookie('blog_'+this.name)]) {
		var _selectedId = getCookie('blog_'+this.name)
		_text = 	_divId[_selectedId][0];
		_clickFun = _divId[_selectedId][1];
		_title = 	_divId[_selectedId][2];
	}
	else {
		_text = 	_divId[0][0];
		_clickFun = _divId[0][1];
		_title = 	_divId[0][2];
	}
	var str = '';
	str += '<div id="'+ this.selfObjId +'" class="'+ this.bOut +'" '
		+'onmouseover="mouseEvent(event, '+ this.name +')" '
		+'onmouseout="mouseEvent(event, '+ this.name +')" '
		+'onclick="'+ _clickFun +'" '
		+'title="'+ _title +'">'
		+_text
		+'</div>';

	// define menu arrow
	if (this.arrowObjId && _divId.length>1) {
		if (!document.getElementById(this.arrowObjId)) {
			str += '<div id="'+ this.arrowObjId +'" class="'+ this.arrowOut +'" '
				+'onmouseover="mouseEvent(event, '+ this.name +')" '
				+'onmouseout="mouseEvent(event, '+ this.name +')" '
				+'onclick="mouseClick(event, '+ this.name +')">'
				+'<img src="http://photocdn.sohu.com/ppp/blog/styles_toolBar/default/images/spacer.gif" alt="'+ MENU_ARROWALT +'" class="more" />'
				+'</div>';
		}
	}
	document.getElementById(this.selfObjId+"_box").innerHTML = str;
	this.selfObj = document.getElementById(this.selfObjId);
	if (this.arrowObjId && document.getElementById(this.arrowObjId)) 
		this.arrowObj = document.getElementById(this.arrowObjId);
}

// define submenu
function buildSubmenu() {
	try {_divId = eval(this.divObjId);}
	catch(e){var _divId = ''}
	if (this.divObjId && _divId){
		this.divObj = document.createElement("div");
		document.getElementById(MENU_BOX).appendChild(this.divObj);
		this.divObj.id = this.divObjId;
		
		this.divObj.className = 'menu-div';
		this.divObj.style.position = 'absolute';
		this.divObj.style.visibility = 'hidden';
		this.divObj.style.zIndex = '100';

		var str = '';
		for (var i=0; i<_divId.length; i++){
			str += '<div class="'+ this.bOut +'" '
				+'onmouseover="mouseEventCommon(event, this)" '
				+'onmouseout="mouseEventCommon(event, this)" '
				+'onclick="'+ _divId[i][1] +';changeDefaultMenu('+ this.name +', '+ i +')" '
				+'title="'+ _divId[i][2] +'">'
				+ _divId[i][0] 
				+'</div>';
		}
		this.divObj.innerHTML = str;
	}
}
// define iframe
function buildIframe() {
	this.frmObj = document.createElement("iframe");
	document.getElementById(MENU_BOX).appendChild(this.frmObj);
	this.frmObj.id = this.frmObjId;
	this.frmObj.frameborder = '0';
	this.frmObj.className = 'menu-iframe';
	this.frmObj.style.position = 'absolute';
	this.frmObj.style.visibility = 'hidden';
	this.frmObj.style.zIndex = '0';
}

function changeDefaultMenu(_obj, _index) {
	setCookie('blog_'+_obj.name, _index, 'never', '/', 'blog.sohu.com');
	_obj.buildMenu();
}

//�˵�����ĸ�����ʽ����
//function changeCss(����¼����ƣ�over,out,click)
//theObj.changeCss('over');
function changeCss(mousEvent) {
	if (typeof this.selfObj != "undefined") {
		if (mousEvent == 'over') {
			if (this.bOver) {
				if (this.arrowObj)
					this.arrowObj.className = this.arrowOver;
				this.selfObj.className = this.bOver;
			}
		}
		else if (mousEvent == 'click') {
			if (this.bClick) {
				if (this.arrowObj)
					this.arrowObj.className = this.arrowClick;
				this.selfObj.className = this.bClick;
			}
		}
		else if (mousEvent == 'disable') {
			if (this.bDisable) {
				if (this.arrowObj)
					this.arrowObj.className = this.arrowDisable;
				this.selfObj.className = this.bDisable;
			}
		}
		else {
			if (this.bOut) {
				if (this.arrowObj)
					this.arrowObj.className = this.arrowOut;
				this.selfObj.className = this.bOut;
			}
		}
	}
}
//��꾭�����ƿ���ʧȥ���� ����ø�����ʽ����
//function mouseEvent(event�����¼�, �¼�����)
//onMouseOver = mouseEvent(event, menuNew)
function mouseEvent(e, theObj) {
	if (!e) {
		try {
			var e = window.event;
		}
		catch(e) {e = ev}
	}
	if (!theObj.showing && !theObj.disabled) {
		if (e.type == 'mouseover') {
			theObj.changeCss('over');
		}
		else if ((e.type == 'mouseout') || (e.type == 'blur')) {
			theObj.changeCss();
		}
	}
	/*else {
		if (e.type == 'blur')
			theObj.showHideSubMenu();
	}*/
}
var menuEventAction = new Object();
function disableMenu(theObj) {
	if (!theObj) return;
	if (menuEventAction[theObj.name]) return;
	theObj.changeCss('disable');
	menuEventAction[theObj.name] = theObj;
	menuEventAction[theObj.name]._selfObj = theObj.selfObj.onclick;
	theObj.selfObj.onclick = '';
	if (theObj.arrowObj) {
		menuEventAction[theObj.name]._arrowObj = theObj.arrowObj.onclick;
		theObj.arrowObj.onclick = '';
	}
	theObj.disabled = true;
}
function ableMenu(theObj) {
	if (!theObj) return;
	if (!menuEventAction[theObj.name]) return;
	theObj.changeCss();
	theObj.selfObj.onclick = menuEventAction[theObj.name]._selfObj;
	if (menuEventAction[theObj.name]._arrowObj) {
		theObj.arrowObj.onclick = menuEventAction[theObj.name]._arrowObj;
	}
	menuEventAction[theObj.name] = null;
	theObj.disabled = false;
}
//����� ����ô򿪹ر��Ӳ˵�����
//function mouseClick(event�����¼�, �¼�����)
//onClick = mouseClick(event, menuNew)
function mouseClick(e, theObj, selfIsMenuDiv) {
	if (!e)
		var e = window.event;
	try {
		e.cancelBubble = true;
		//e.returnValue = false;
	}
	catch(e) {
		ev.preventDefault();
		ev.stopPropagation();
	}
	if (theObj) {
		if (!selfIsMenuDiv) {
			//theObj.divObj.onclick = "mouseClick(event,"+theObj+",true)";
			theObj.showHideSubMenu();
		}
	}
	else {
		cancleMenu();
	}
}
//�˵�����Ĵ򿪹ر��Ӳ˵��ķ���
//theObj.showHideSubMenu();
function showHideSubMenu() {
	if (!this.showing) {
		cancleMenu(this);
		var selfObjPos = getXY(this.selfObj);
		positionObject(this.divObjId,selfObjPos.left,selfObjPos.top+18);
		showObject(this.divObjId);
		
		
		/*if(navVersion) {	//ie5.5ʱ����ʾiframe
			this.frmObj.style.height = this.divObj.offsetHeight;
			this.frmObj.style.width = this.divObj.offsetWidth;
			
			positionObject(this.frmObjId,selfObjPos.left,selfObjPos.top+18);
			showObject(this.frmObjId);
		}*/
		
		this.changeCss('click');
		this.showing = true;
	}
	else {
		//hideAll();
		hideObject(this.divObjId);
		hideObject(this.frmObjId);
		this.showing = false;
		this.changeCss('over');
		//mouseEvent(window.event, this);
	}
}
//���ض���ĺ���λ��
//function getXY(����)
//objPos = getXY(Obj); objPosX = objPos.left ; objPosY = objPos.top;
function getXY(Obj) {
	for (var sumTop = 0,sumLeft = 0 ; Obj!=document.body ; sumTop += Obj.offsetTop,sumLeft += Obj.offsetLeft,Obj = Obj.offsetParent);
	return {left:sumLeft,top:sumTop}
}

function cancleMenu(callerObj) {
	for (var i=0; i < menuObj.length; i++) {
		if ((callerObj) && (callerObj.name != menuObj[i].name)) {	
			if (menuObj[i].showing) {
				menuObj[i].showHideSubMenu();
				menuObj[i].changeCss();
			}
		}
		else {
			if (menuObj[i].showing) {
				menuObj[i].showHideSubMenu();
				menuObj[i].changeCss();
			}
		}
	}
}

//����û�������Ĳ˵�ʹ��
//mouseEventCommon(event�����¼�)
function mouseEventCommon(e, theObj) {
	if (!e)
		var e=window.event;
	while (theObj.tagName != "DIV"){
		theObj = theObj.theObj;
	}
	if (e.type == 'mouseover'){
		theObj.className = "link-over";
	}
	else if ((e.type == 'mouseout') || (e.type == 'blur')){
		theObj.className = "link";
	}
}
function showObject(obj) {
  document.getElementById(obj).style.visibility = "visible";
}
function hideObject(obj) {
  document.getElementById(obj).style.visibility = "hidden";
}
function positionObject(obj,x,y) {
    var foo = document.getElementById(obj).style;
    foo.left = x + "px";
    foo.top = y + "px";
}
