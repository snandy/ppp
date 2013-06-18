/**
 * @license sohu blog editor
 * 2012-02-14 by snandy 编辑器bug
 * 2012-04-11 by snandy 插入视频后不马上播放 给flash传autoplay=false
 * 2013-01-29 by snandy 插入音乐 / 重构
 */

Function.prototype.bindAsEventListener2 = function(object, info) {
	var __method = this;
	return function(event) {
		return __method.call(object, event || window.event, info);
	}
};
~function(window, document) {

var Browser = function(ua){
	var b = {
		ie: /msie/.test(ua) && !/opera/.test(ua),
		chrome: /chrome/.test(ua)
	};
	return b;
}(navigator.userAgent.toLowerCase());

function Dom(){}
Dom.create = function(tag, cls, parent) {
	var element = document.createElement(tag);
	if(cls) element.className = cls;
	if(!parent) parent = document.body;
	parent.appendChild(element);
	return element;
};
Dom.show = function(el) {
	el.style.display = "block";
};
Dom.hide = function(el) {
	el.style.display = "none";
};
Dom.getViewSize = function() {
	return {w: window['innerWidth'] || document.documentElement.clientWidth,
			h: window['innerHeight'] || document.documentElement.clientHeight};
};
Dom.getOffsetRect = function(element) {
	var rect = {
		left:0,
		top:0,
		width:0,
		height:0,
		bottom:0,
		right:0
	};
	if (element == document) {
		element = document.documentElement;
		rect.left = element.scrollLeft;
		rect.top = element.scrollTop;
		if (Browser.ie) {
			rect.width = element.offsetWidth;
			rect.height = element.offsetHeight;
		} else {
			rect.width = window.innerWidth;
			rect.height = window.innerHeight;
		}
	} else {
		rect.left = element.offsetLeft;
		rect.top = element.offsetTop;
		if (element == document.body && !Browser.ie) {
			element = document.documentElement;
			rect.width = element.scrollWidth;
			rect.height = element.scrollHeight;
		} else {
			rect.width = element.offsetWidth;
			rect.height = element.offsetHeight;
		}
	}
	rect.bottom = rect.top + rect.height;
	rect.right = rect.left + rect.width;
	return rect;
};
Dom.getRect = function(el) {
	var rect = Dom.getOffsetRect(el);
	var parent = el.offsetParent;
	while (parent) {
		var tempRect = Dom.getOffsetRect(parent);
		rect.left += tempRect.left;
		rect.top += tempRect.top;
		parent = parent.offsetParent;
	}
	rect.bottom = rect.top + rect.height;
	rect.right = rect.left + rect.width;
	return rect;
};
Dom.setPosition = function(el, position) {
	el.style.left = position.left + "px";
	el.style.top = position.top + "px";
};
Dom.showModalDialog = function(url, args, feas) {
	var win, feasStr = '', left, top;

	if (Browser.ie) {
		if (feas) {
			for (var i=0; i<feas.length; i++) {
				var name = feas[i][0],
					value = feas[i][1];
				switch (name) {
					case "width": {
						name = "dialogWidth";
						value = value + "px";
						break;
					}
					case "height": {
						name = "dialogHeight";
						value = value + "px";
						break;
					}
				}
				feasStr += name + ":" + value + ";";
			}
		}
		win = window.showModalDialog(url, args, feasStr);
	} else {
		if (feas) {
			for (var i=0; i<feas.length; i++) {
				var name = feas[i][0],
					value = feas[i][1];

				if (name==='width') {
					left = screen.width/2 - value/2;
				}
				if (name==="height") {
					top = screen.height/2 - value/2;
				}
				feasStr += name + "=" + value + ",";
			}
			feasStr += ('left=' + left + ',');
			feasStr += ('top=' + top);
		}
		win = window.open(url, null, feasStr + "modal=yes");
		win.dialogArguments = args;
	}
	return win;
};
Dom.open = function(url, args, feas, isClear) {
	var win, feasStr = '';
	if (!args) {
		args = null
	}
	if (!feas) {
		feas = [["modal","yes"]]	
	}
	if (isClear) {
		feas.push(["location","no"]);
		feas.push(["menubar","no"]);
		feas.push(["toolbar","no"]);
		feas.push(["scrollbars","yes"]);
		feas.push(["resizable","yes"]);
	}
	for (var i=0; i<feas.length; i++) {
		feasStr += feas[i][0] + "=" + feas[i][1];
		if(i != feas.length-1) feasStr += ",";
	}
	
	window.openDialogArguments = args;
	win = window.open(url,null,feasStr);
	return win;
}

var Editor = {};
Editor.editorWin = false;
Editor.editorObj = false;
Editor.cache = false;
Editor.coder = false;
Editor.selection = false;
Editor.rangeCache = false;
Editor.viewState = "view";

//针对工具栏的配置
Editor.Config = {};
Editor.Config.tool = {};
var editorConfig = Editor.Config;

Editor.init = function(parent,recoverName) {
	this.parent = $(parent);
	Editor.initFrame();
	Editor.menu = $("menuContainer");
	Editor.coder = $("entrycontent");
	Editor.coder.value = $('entryDraft').value
	if (Browser.ie == null) {
		alert("您现在所使用的浏览器不支持此编辑器很多高级功能，建议您采用IE或Firefox！");
		Dom.show(Editor.coder);
		Editor.menu.style.height = "0px";
	} else {
		if (Browser.ie) {
			$(recoverName).style.display = "";		
		}
		Editor.container = $("editorContainer");
		Editor.txtContainer = $("txtEditorContainer");
		Editor.ifrContainer = $("ifrEditorContainer");
		Editor.ctContainer = $("cacheToolContainer");
		Editor.initElements();
	}
	Editor.initCache();
};

// 下面是缓存的操作
Editor.initCache = function(){
	Editor.initCacheTool();
	Editor.recover();
	window.setInterval(Editor.backup, 60000);
};
Editor.initFrame = function() {
	this.parent.innerHTML = '<div id="cacheToolContainer" style="width:1px;height:1px;"></div>' +
							'<div class="all_container">' +
								'<div id="menuContainer" class="menu_container"></div>' +
								'<div id="editorContainer" class="editor_container">' +
									'<div id="txtEditorContainer" class="editor_coder"><textarea id="entrycontent" name="entrycontent" ></textarea></div>' +
									'<div id="ifrEditorContainer" class="editor"></div>' +
								'</div>' +
							'</div>';
};
Editor.initTools = function() {
	Editor.controls = {};
	var jump = false,	
		toolsData = editorConfig.tool.data,
		css = editorConfig.tool.css;

	for (var i=0; i<toolsData.length; i++) {
		var part = Dom.create('div', css.part, Editor.menu);
		var partData = toolsData[i];
		
		for (var j=0; j<partData.length; j++) {
			Dom.create("div", css.newLine, part);
			var row = Dom.create("div",css.row,part);
			var rowData = partData[j];
		
			for (var k=0; k<rowData.length; k++) {
				var toolData = rowData[k];
				var type = toolData[0];
				var controlId = toolData[1];
				if (type == "line") {
					var src = "http://js.pp.sohu.com/ppp/blog/styles_v_0909301/images/editor/" + controlId + ".gif";
					var tool = Dom.create("div", css.tool, row);
					var img = Dom.create("img", false, tool);
					img.src = src;
				} else {
					var name = toolData[2];
					var downCall = toolData[3];
					var upCall = toolData[4];
					var selectCall = toolData[5];
					var cancelCall = toolData[6];
					
					var tool = Dom.create("div", type == "bimg" ? css.toolBig : css.tool, row);
					Editor.controls[controlId] = tool;
					tool.sohu = {};
					tool.sohu.id = controlId;
					tool.sohu.type = type;
					tool.sohu.state = 0;
					if (type == "img" || type == 'bimg') {
						var src = "http://js2.pp.sohu.com.cn/ppp/blog/styles_v_100314/images/editor/" + controlId + ".gif";
						var img = Dom.create("img",false,tool);
						img.src = src;
						img.title = name;
						tool.sohu.tool = img;
					} else {
						var toolCss = controlId + "Select";
						var tool2 = Dom.create('div', controlId, tool);
						if (Browser.ie) {
							tool.sohu.tool = [];
							tool.sohu.tool.selectedIndex = 0;
							tool.sohu.tool[0] = Dom.create("div",toolCss,tool2);
							tool.sohu.tool[0].sohuValue = null;
							var texts,values;
							if (controlId == "fontname") {
								texts = editorConfig.lister.fontNameData.text;
								values = editorConfig.lister.fontNameData.value;
								tool.sohu.tool[0].innerHTML = "字体";
							} else {
								texts = editorConfig.lister.fontSizeData.text;
								values = editorConfig.lister.fontSizeData.value;
								tool.sohu.tool[0].innerHTML = "字号";
							}
							for (var i=0; i<texts.length; i++) {
								var newElement = Dom.create("div",toolCss,tool2);
								newElement.style.display = "none";
								newElement.innerHTML = texts[i];
								newElement.sohuValue = values[i].toString();
								tool.sohu.tool[i+1] = newElement;
							}
						} else {
							jump = true;
							tool.sohu.tool = Dom.create("div", toolCss, tool2);
						}
					}
					
					tool.sohu.downCall = downCall;
					if (upCall) {
						tool.sohu.upCall = upCall;
						if (selectCall) tool.sohu.selectCall = selectCall;
						if (cancelCall) tool.sohu.cancelCall = cancelCall;
					} else {
						tool.sohu.upCall = downCall;
					}
					Event.observe( tool, "mouseover", Editor.toolMouseOver.bind(Editor, tool) );
					Event.observe( tool, "mouseout", Editor.toolMouseOut.bind(Editor, tool) );
					Event.observe( tool, "mousedown", Editor.toolMouseDown.bind(Editor, tool) );
					Event.observe( tool, "mouseup", Editor.toolMouseUp.bindAsEventListener2(Editor, tool) );
				}
			}
		}
		if (jump) {
			jump = false;
			i += 4;
		}
	}
};
Editor.initElements = function() {
	var css = editorConfig.tool.css;
	Dom.show(Editor.coder);
	Dom.hide(Editor.txtContainer);
	
	Editor.initTools();
	Editor.menu.onselectstart = function(){return false;};
	
	window.sohu = {};
	Editor.ifrContainer.innerHTML = '<div class="editor_bg"><div class="editor_bg_on"></div><div class="editor_margin_on"></div><iframe frameborder="0"></iframe><div class="editor_margin_below"></div><div class="editor_bg_down"></div></div>';
	Editor.editorObj = Editor.ifrContainer.firstChild.childNodes[2];
	Editor.editorWin = Editor.editorObj.contentWindow;
	Editor.editorObj.style.height = '330px';
	Editor.coder.style.height = '330px';
	
	var doc = Editor.editorWin.document;
	doc.open();
	var html = "";
	html += "<html>";
	html += "<head>";
	html += '<meta http-equiv="Content-Type" content="text/html; charset=gbk" />';
	html += "<style> *{line-height:160%;}body{font-size:14px;line-height:130%;font-family:'宋体',Verdana,Arial,Helvetica,sans-serif;}img{border:0;}p{margin:5px 0;}</style>";
	html += "</head>";
	html += "<body>";
	if (!Browser.ie) {
		html += Editor.coder.value == '' ? '' : Editor.coder.value;	
	}
	html += "</body>";
	html += "</html>";
	doc.write(html);
	doc.close();
	
	if (Browser.ie) {
		Editor.iCache = Dom.create("iframe",css.cache,Editor.ifrContainer);
		Editor.iCacheDoc = Editor.iCache.contentWindow.document;
		Editor.iCacheDoc.open();
		Editor.iCacheDoc.write("<html><head><style>body{font-family:'宋体';}</style></head><body></body></html>");
		Editor.iCacheDoc.close();
		
		doc.body.contentEditable = true;
		Event.observe(Editor.editorWin.document.body,"beforedeactivate",Editor.cacheRange);
		Event.observe(Editor.getDocument().body,"paste",Editor.shortcutPaste);
		Event.observe(Editor.editorWin.document,"selectionchange",Editor.checkAllState);
		Editor.pasteHTML(Editor.coder.value == '' ? '' : Editor.coder.value);
	} else {
		Editor.disableSpecialTool();
		Editor.bindLoadFF();
	}
	Event.observe(window,'beforeunload',Editor.delBackup.bind(this));//this.delBackup.bind(this)
	Editor.cache = Dom.create("div",css.cache,document.body);
	
	var footer = Dom.create("div", editorConfig.tool.css.footer, Editor.container);
	footer.innerHTML = '<span style="float:left;margin-left:10px;">' +
							'<a href="javascript:void(0)">' +
								'<img align="absmiddle" src="http://js1.pp.sohu.com.cn/ppp/blog/styles_v_0909301/images/editor/ico_plus.gif" title="增大窗口" />' +
							'</a>&nbsp;' +
							'<a href="javascript:void(0)">' +
								'<img align="absmiddle" src="http://js1.pp.sohu.com.cn/ppp/blog/styles_v_0909301/images/editor/ico_minus.gif" title="减小窗口" />' +
							'</a>' +
						'</span>' +
						'<label style="float:right;margin-right:10px;">' +
							'<input type="checkbox"/>' + '<span style="position:relative;bottom:3px;left:3px">显示源代码</span>'
						'</label>';
	Editor.wideAreaControler = footer.firstChild.firstChild;
	Editor.narrowAreaControler = footer.firstChild.lastChild;
	Editor.viewControler = footer.lastChild.firstChild;
	this.setAble(Editor.narrowAreaControler, false);
	this.setOpacity(Editor.narrowAreaControler.firstChild, 0.3);
	Event.observe(Editor.wideAreaControler, "click", this.setArea.bind(this,true));
	Event.observe(Editor.narrowAreaControler, "click", this.setArea.bind(this,false));
	Event.observe(Editor.viewControler, "click", this.setView.bind(this));
	
	// 跟踪回车事件
	Event.observe(Editor.editorWin.document, "keypress", Editor._e_keyPress.bindAsEventListener2(Editor));
};
// 设置编辑器的编辑区域大小
Editor.setArea = function(widen) {
	var height= parseInt(Editor.editorObj.style.height), step = 100;
	if (widen) {
		if (height < 630) {
			Editor.editorObj.style.height = parseInt(Editor.editorObj.style.height)+ step + 'px';
			Editor.coder.style.height = parseInt(Editor.coder.style.height)+ step + 'px';
			height= parseInt(Editor.editorObj.style.height);
			if (height == 630) {
				this.setAble(Editor.wideAreaControler, false);
				this.setOpacity(Editor.wideAreaControler.firstChild, 0.3);
			}
		}
	} else {
		if (height > 330) {
			Editor.editorObj.style.height = parseInt(Editor.editorObj.style.height)- step + 'px';
			Editor.coder.style.height = parseInt(Editor.coder.style.height) - step + 'px';
			height= parseInt(Editor.editorObj.style.height);
			if (height == 330) {
				this.setAble(Editor.narrowAreaControler, false);
				this.setOpacity(Editor.narrowAreaControler.firstChild,0.3);
			}
		}
	}
	if (height > 330) {
		this.setAble(Editor.narrowAreaControler, true);
		this.setOpacity(Editor.narrowAreaControler.firstChild, 1);
	}
	if (height < 630) {
		this.setAble(Editor.wideAreaControler, true);
		this.setOpacity(Editor.wideAreaControler.firstChild, 1);
	}
};
Editor.setAble = function(ele, enable){
	if(enable)
		ele.disabled = '';
	else
		ele.disabled = 'disabled';
};
Editor.setOpacity = function(ele, opValue){
	ele.style.filter = "Alpha(Opacity=" + opValue*100 + ")";
	ele.style.MozOpacity = opValue;
};
Editor.disableSpecialTool = function() {
	Editor.setState(Editor.controls["cut"],-3);
	Editor.setState(Editor.controls["copy"],-3);
	Editor.setState(Editor.controls["paste"],-3);
	Editor.controls["cut"].sohu.tool.title = "提示：您现在所使用的浏览器不支持此操作，请使用快捷键 [Ctrl + C]！";
	Editor.controls["copy"].sohu.tool.title = "提示：您现在所使用的浏览器不支持此操作，请使用快捷键 [Ctrl + X]！";
	Editor.controls["paste"].sohu.tool.title = "提示：您现在所使用的浏览器不支持此操作，请使用快捷键 [Ctrl + V]！";
};
Editor.bindLoadFF = function() {
	Editor.setDesignMode(true);
	Event.observe(Editor.editorWin.document.body,"mouseup",Editor.checkAllState);
	Event.observe(Editor.editorWin.document,"keypress",Editor.checkAllState);
};
Editor.setContent = function() {
	if(Editor.txtContainer.style.display == "none"  || Editor.coder.style.display == "none") {
		Editor.coder.value = Editor._bindEntryStyle();
	} else {
		Editor.editorWin.document.body.innerHTML = Editor.coder.value;
		Editor.coder.value=Editor.editorWin.document.body.innerHTML;
	}
};
Editor._bindEntryStyle = function() {
	var nodes = Editor.editorWin.document.body.childNodes;
	var parent = null;
	for (var i=0, il=nodes.length; i<il; i++) {
		var node = nodes[i];
		if (node.nodeType && node.nodeType == 1) {
			if (parent) {
				parent = null;
				break;
			} else {
				parent = node;
			}
		}
	}
	var html = Editor.editorWin.document.body.innerHTML;
	if (!parent || parent.tagName.toLowerCase() != 'div' || parent.style.lineHeight != '160%' || parent.style.fontSize != '14px') {
		html = ['<div style="line-height:160%;font-size:14px;">', html, '</div>'];
		return html.join('');
	} else {
		return html;
	}
};
Editor.preview = function() {
	var title = $F("entrytitle");
	if(title == "") {
		alert("请填写日志标题");
		$("entrytitle").focus();
		return;
	}
	title = title.convertTextToHTML();
	
	Editor.setContent();
	var content = $F(Editor.coder);
	
	if(content.length < 1){
		alert("请填写日志内容");
		return;
	}
	
	var feas = [];
	var args = {
		win: window,
		title: title,
		content: content
	};
	Dom.open("/editor/support/preview.html",args,feas,true);
};

Editor.checkAllState = function() {
	if (!Editor.isChecking) {
		Editor.isChecking = true;
		if (!Editor.stateArray) {
			Editor.stateChecking = true;
			if (Browser.ie) {
				Editor.stateArray = ["Paste","Cut","Copy","FontName","FontSize","Bold","Italic","Underline","JustifyLeft","InsertOrderedList","InsertUnorderedList","Undo"];
			} else {
				Editor.stateArray = ["fontname","fontsize","bold","italic","underline","justifyleft","insertorderedlist","insertunorderedlist"];
			}
		}
		try	{
			var range = Editor.editorWin.document;
			if (range) {
				var i = 0;
				for (i=0;i<Editor.stateArray.length;i++) {
					Editor.checkCommandState(Editor.stateArray[i], range);
				}
			}
		}catch(e){}
		finally	{
			Editor.isChecking = false;
		}
	}
};
Editor.checkCommandState = function(command,range) {
	var returnValue = false;
	var commandLower = command.toLowerCase();
	var element = Editor.controls[commandLower];
	if (commandLower == "insertorderedlist") {
		element = Editor.controls["orderlist"];	
	} else if (commandLower == "insertunorderedlist") {
		element = Editor.controls["unorderlist"];	
	}
	
	switch(commandLower) {
		case "cut":
		case "copy":
		case "paste": {
			returnValue = range.queryCommandEnabled(command);
			if(returnValue) Editor.setState(element,0);
			else Editor.setState(element,-3);
			break;
		}
		case "fontname":
		case "fontsize": {
			returnValue = range.queryCommandValue(command);
			if (Browser.ie) {
				var childs = element.sohu.tool;
				var oldSelectedIndex = childs.selectedIndex;
				if (childs[oldSelectedIndex].sohuValue != returnValue) {
					var i = 0, hasValue = false;
					if (returnValue != null) {
						for (i=1;i<childs.length;i++) {
							if (childs[i].sohuValue == returnValue) {
								hasValue = true;
								childs.selectedIndex = i;
							}
						}
					}
					if(!hasValue) childs.selectedIndex = 0;
					if(childs.selectedIndex != oldSelectedIndex) {
						childs[oldSelectedIndex].style.display = "none";
						childs[childs.selectedIndex].style.display = "";
					}
				}
			} else {
				if(commandLower == "fontname") {
					if (returnValue == "") {
						returnValue = "字体";
					} else {
						returnValue = returnValue.replace(/'/g,"");
						var dotIndex = returnValue.indexOf(",");
						if(dotIndex > 0) returnValue = returnValue.substr(0,dotIndex);
						dotIndex = returnValue.indexOf("_");
						if(dotIndex > 0) returnValue = returnValue.substr(0,dotIndex);
					}
				} else {
					if(returnValue == "") {
						returnValue = "字号";
					} else {
						var i = 0,hasValue = false;
						var values = editorConfig.lister.fontSizeData.value;
						for(i=0;i<values.length;i++) {
							if(values[i] == returnValue) {
								returnValue = editorConfig.lister.fontSizeData.text[i];
								hasValue = true;
								break;
							}
						}
						if(!hasValue) returnValue = "字号";
					}
				}
				element.sohu.tool.innerHTML = returnValue;
			}
			break;
		}
		case "justifyleft":
		case "justifycenter":
		case "justifyright": {
			var left=0,center=0,right=0;
			if (Browser.ie) {
				left = range.queryCommandState("JustifyLeft")?-2:0;
				center = range.queryCommandState("JustifyCenter")?-2:0;
				right = range.queryCommandState("JustifyRight")?-2:0;
			} else {
				returnValue = range.queryCommandValue(command);
				if(returnValue == "left") left = -2;
				if(returnValue == "center") center = -2;
				if(returnValue == "right") right = -2;
			}
			Editor.setState(Editor.controls["justifyleft"],left);
			Editor.setState(Editor.controls["justifycenter"],center);
			Editor.setState(Editor.controls["justifyright"],right);
			break;
		}
		case "undo": {
			returnValue = Editor.editorWin.document.queryCommandEnabled(command);
			if(returnValue) Editor.setState(element,0);
			else Editor.setState(element,-3);
			break;
		}
		default: {
			returnValue = range.queryCommandState(command);
			if(returnValue) Editor.setState(element,-2);
			else Editor.setState(element,0);
			break;
		}
	}
	return returnValue;
};
Editor.command = function(commandText, option) {
	var returnValue = false;
	if (Editor.isView()) {
		Editor.checkRange();
		if(option && option=="#" && Browser.ie) {
			Editor.removeColor(commandText);
		} else {
			try {
				if (!Browser.ie) {
					commandText = commandText.toLowerCase();				
				}
				Editor.editorWin.document.execCommand(commandText, false, option);
				if (!Browser.ie) {
					Editor.editorWin.focus();
				}
			}catch(e){}
		}
	}
	return returnValue;
};
Editor.getText = function() {
	var range = Editor.getRange();
	if (range) {
		if(Editor.selection.type.toLowerCase() == "control") {
			html = range.item(0).innerHTML;
		} else {
			html = range.text;
		}
		if(!html) html = "";
	}	
	return html;
};
Editor.removeColor = function(command) {
	var html = Editor.getText();
	if (html.length > 0) {
		var element = Editor.getSpecialElement("font",true);
		if(element && element.innerHTML == html) {
			if(command == "ForeColor") {
				element.color = "";
			} else {
				element.style.backgroundColor = "";
			}
		}
	} else {
		Editor.editorWin.document.execCommand(command,false,"#");
	}
};
Editor.undo = function() {
	Editor.command("Undo",1);
	return -1;
};
Editor.setState = function(element,stateValue,controlId) {
	if (!element) {
		element = Editor.controls[controlId];	
	}
	if (element) {
		element.sohu.state = stateValue;
		if(element.sohu.type != "select") {
			var fix = element.sohu.type == 'bimg' ? 'Big' : '';
			switch(stateValue) {
				case 1:
					element.className = editorConfig.tool.css['toolOver' + fix];
					break;
				case 0:
					element.className = editorConfig.tool.css['tool' + fix];
					break;
				case -1:
				case -2:
					element.className = editorConfig.tool.css['toolDown' + fix];
					break;
				case -3:
					element.className = editorConfig.tool.css['toolDisable' + fix];
					break;
			}
		}
	}
};
Editor.toolMouseOver = function(element) {
	if(Editor.isView() && element.sohu.state == 0) {
		Editor.setState(element, 1);
	}
};
Editor.toolMouseOut = function(element) {
	if(Editor.isView() && (element.sohu.state == 1 || element.sohu.state == -1)) {
		Editor.setState(element,0);
	}
};
Editor.toolMouseDown = function(element) {
	if(Editor.isView() && element.sohu.state != -3) { 
		if(Lister.now) {
			if(!(element.sohu.lister && element.sohu.lister == Lister.now)) {
				Lister.now.cancel(false);
			}
		}
		if(element.sohu.state != -1 && element.sohu.state != -2) Editor.setState(element,-1);
	}
};
Editor.toolMouseUp = function(e, element) {
	if (Editor.isView() && element.sohu.state != -3) {
		var newState = 1;
		if(element.sohu.state == -1) newState = element.sohu.downCall.call(Editor);
		if(element.sohu.state == -2) newState = element.sohu.upCall.call(Editor);
		Editor.setState(element,newState);
		Event.stop(e);
		Editor.checkAllState();
	}
};
Editor.blankUpCall = function(){return 0};
Editor.blankCall = function(returnValue) {
	if (typeof returnValue != "undefined") return returnValue;
};
Editor.normalCancelCall = function(controlId,state) {
	var newState = 0;
	if (state) newState = state;
	Editor.setState(null,newState,controlId);
};
Editor.showFontNameList = function() {
	var element = Editor.controls["fontname"];
	if(!element.sohu.lister) element.sohu.lister = new Lister(element,editorConfig.lister.fontNameData,1,editorConfig.lister.option);
	element.sohu.lister.show();
	return -2;
};
Editor.hideFontNameList = function() {
	var element = Editor.controls["fontname"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	return 1;
};
Editor.setFontName = function(fontName) {
	if(fontName) Editor.command("FontName",fontName);
	Editor.setState(null,0,"fontname");
};
Editor.cancelFontName = function() {
	Editor.setState(null,0,"fontname");
};
Editor.showFontName = function(fontName,fontValue) {
	var element = Editor.controls["fontname"].sohu.tool;
	var str = "字体";
	if(fontName) {
		str = fontName;	
	} else if(fontValue) {
		var i = 0;
		var fontNameData = editorConfig.lister.fontNameData
		for (i=0;i<fontNameData.value.length;i++) {
			if (fontNameData.value[i] == fontValue) {
				str = fontNameData.text[i];
			}
		}
	}
	element.innerHTML = str;
};
Editor.showFontSizeList = function() {
	var element = Editor.controls["fontsize"];
	if(!element.sohu.lister) element.sohu.lister = new Lister(element,editorConfig.lister.fontSizeData,1,editorConfig.lister.option);
	element.sohu.lister.show();
	return -2;
};
Editor.hideFontSizeList = function() {
	var element = Editor.controls["fontsize"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	return 1;
};
Editor.setFontSize = function(fontSize) {
	if(fontSize) Editor.command("FontSize",fontSize);
	Editor.setState(null, 0, "fontname");
};
Editor.cancelFontSize = function() {
	Editor.setState(null, 0, "fontsize");
};
Editor.showFontSize = function(fontName,fontValue) {
	var element = Editor.controls["fontsize"].sohu.tool;
	var str = "字号";
	if(fontName) {
		str = fontName;	
	} else if (fontValue) {
		var i = 0, fontNameData = editorConfig.lister.fontSizeData;
		for(i=0;i<fontNameData.value.length;i++) {
			if(fontNameData.value[i] == fontValue) {
				str = fontNameData.text[i];
			}
		}
	}
	element.innerHTML = str;
};
Editor.showForeColorList = function() {
	var element = Editor.controls["forecolor"];
	if(!element.sohu.lister) element.sohu.lister = new Lister(element,editorConfig.lister.colorData, 6, editorConfig.lister.option);
	element.sohu.lister.show();
	return -2;
};
Editor.hideForeColorList = function() {
	var element = Editor.controls["forecolor"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	return 1;
};
Editor.setForeColor = function(foreColor) {
	if(foreColor) Editor.command("ForeColor",foreColor);
	Editor.setState(null, 0, "forecolor");
};
Editor.cancelForeColor = function() {
	Editor.setState(null, 0, "forecolor");
};
Editor.showBackColorList = function() {
	var element = Editor.controls["backcolor"];
	if(!element.sohu.lister) element.sohu.lister = new Lister(element,editorConfig.lister.colorData, 6, editorConfig.lister.option);
	element.sohu.lister.show();
	return -2;
};
Editor.hideBackColorList = function() {
	var element = Editor.controls["backcolor"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	return 1;
};
Editor.setBackColor = function(backColor,element) {
	if (backColor) {
		if (Browser.ie) {
			Editor.command("BackColor", backColor);
		} else {
			Editor.command("hilitecolor", backColor);
		}
	}
	Editor.setState(null, 0, "backcolor");
};
Editor.cancelBackColor = function() {
	Editor.setState(null, 0, "backcolor");
};
Editor.getDocument = function() {
	return Editor.editorWin.document;
};
Editor.setDesignMode = function (canEdit) {
	Editor.getDocument().designMode = canEdit ? "On" : "Off";
};
Editor.canEdit = function() {
	return (Editor.viewState != "changing");
};
Editor.isView = function() {
	return (Editor.viewState == "view");
};
Editor.showBrow = function() {
	var element = Editor.controls["emot"];
	if(!element.sohu.lister) {
		var browConfig = {
			init: function(container, callback) {
				Emote.init({parent: container, output: 'url', callback: function(url, title) {
					callback('<img src="' + url + '" title="' + title + '"/>');
				},
				matrix: {
					"20": [11, 6],
					"42": [6, 4]
				},
				stat: 'editor'});
			},
			type: 'function'
		}
		element.sohu.lister = new Lister(element,browConfig, 8, editorConfig.lister.option);
	}
	element.sohu.lister.show();
	return -2;
};
Editor.hideBrow = function() {
	var element = Editor.controls["emot"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	return 1;
};
Editor.addBrow = function(browName) {
	if (browName) {
		var html = "&nbsp;" + browName + "&nbsp;";
		Editor.pasteHTML(html);
	}
	Editor.setState(null,0,"emot");
};
Editor.cancelBrowCall = function() {
	Editor.setState(null,0,"emot");
};
Editor.fastPasteHTML = function(html) {
	if (Browser.ie) {
		var range = Editor.editorWin.document.selection.createRange();
		if(range) range.pasteHTML(html);
	} else {
		var range = Editor.editorWin.document;
		range.execCommand("inserthtml", null, html);
	}
};
Editor.pasteHTML = function(html) {
	var returnValue = false;
	if (Editor.isView()) {
		var range = Editor.getRange();
		if (range) {
			if (Browser.ie) {
				var type = Editor.selection.type.toLowerCase();
				if (type == "control") {
					var tempRange = Editor.editorWin.document.body.createTextRange();
					tempRange.moveToElementText(range.item(0));
					range = tempRange;
				}
				range.pasteHTML(html);
				range.select();
			} else if (Browser.chrome) {
				Editor.chromePasteHTML(html);
			} else {
				Editor.command("inserthtml", html);
			}
			returnValue = true;
		} else {
			alert("发生错误，请重新操作！");
		}
	}
	return returnValue;
};
// http://stackoverflow.com/questions/10934651/chrome-html-document-execcommandinserthtml-inserts-into-following-table-cell
// http://stackoverflow.com/questions/6690752/insert-html-at-cursor-in-a-contenteditable-div/6691294#6691294
// chrome bug , vision: 24.0.1312.57 m chrome中无法插入音乐
Editor.chromePasteHTML = function(html) {
	var win = Editor.editorWin, 
		doc = win.document;
	var sel, range;
	if (win.getSelection) {
		// IE9 and non-IE
		sel = win.getSelection();
		if (!sel.rangeCount) {
			Editor.focusContent();
		}
		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();
			// Range.createContextualFragment() would be useful here but is
			// non-standard and not supported in all browsers (IE9, for one)
			var el = doc.createElement("div");
			el.innerHTML = html;
			var frag = doc.createDocumentFragment(), node, lastNode;
			while ( (node = el.firstChild) ) {
				lastNode = frag.appendChild(node);
			}
			range.insertNode(frag);
			// Preserve the selection
			if (lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	}
};
Editor.getClipboardData = function() {
	Editor.iCacheDoc.body.innerHTML = "";
	Editor.iCacheDoc.body.createTextRange().execCommand("Paste");
	var htmlData = Editor.iCacheDoc.body.innerHTML;
	Editor.iCacheDoc.body.innerHTML = "";
	return htmlData;
};
Editor.clearFromWord = function(html) {
	html = html.replace(/<\/?SPAN[^>]*>/gi, "" );
	html = html.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3");
	html = html.replace(/<(\w[^>]*) style="([^"]*)"([^>]*)/gi, "<$1$3");
	html = html.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3");
	html = html.replace(/<\\?\?xml[^>]*>/gi, "");
	html = html.replace(/<\/?\w+:[^>]*>/gi, "");
	html = html.replace(/<\/?\w+:[^>]*>/gi, "");
	html = html.replace(/<\/?\w+:[^>]*>/gi, "");
	return html;
};
Editor.getSelectedHTML = function() {
	var html = "";
	var range = Editor.getRange();
	if (range) {
		if (Browser.ie) {
			if(Editor.selection.type.toLowerCase() == "control") {
				html = range.item(0).outerHTML;
			} else {
				html = range.htmlText;
			}
			if (!html) html = "";
		} else {
			if(Editor.selection.rangeCount > 0) {
				var tRange = Editor.selection.getRangeAt(0);
				var dFragment = tRange.cloneContents();
				Editor.cache.innerHTML = "";
				Editor.cache.appendChild(dFragment);
				html = Editor.cache.innerHTML;
				Editor.cache.innerHTML = "";
			}
		}
		
	}
	return html;
};
Editor.setBold = function() {
	var newState = Editor.command("Bold") ? -2 : 0;
	return newState;
};
Editor.setItalic = function() {
	var newState = Editor.command("Italic") ? -2 : 0;
	return newState;
};
Editor.setUnderline = function() {
	var newState = Editor.command("Underline")? -2 : 0;
	return newState;
};
Editor.copy = function() {
	if (Browser.ie) {
		Editor.command("Copy");
		return -1;
	} else {
		alert("提示：您现在所使用的浏览器不支持此操作，请使用快捷键 [Ctrl + C]！");
		return 0;
	}
};
Editor.cut = function() {
	if (Browser.ie)	{
		Editor.command("Cut");
		return -1;
	} else {
		alert("提示：您现在所使用的浏览器不支持此操作，请使用快捷键 [Ctrl + X]！");
		return 0;
	}
};
Editor.shortcutPaste = function() {
	Editor.paste();
	return false;
};
Editor.paste = function() {
	if (Browser.ie) {
		if (Editor.isView()) {
			var pasteData = Editor.getClipboardData();
			if (pasteData && pasteData.length > 0) {
				var wordPattern = /<\w[^>]* class="?MsoNormal"?/gi;
				if (wordPattern.test(pasteData)) {
					if (confirm("您现在是从word中复制，是否清除其中的格式？\r\n\r\n小提示：清除格式可以使编辑更为方便！")) {
						pasteData = Editor.clearFromWord(pasteData);
					}
				}
				Editor.pasteHTML(pasteData);
			}
		}
		return -1;
	} else {
		alert("提示：您现在所使用的浏览器不支持此操作，请使用快捷键 [Ctrl + V]！");
		return 0;
	}
};
Editor.setElementJustify = function(element,value) {
	switch(value) {
		case "left":
			align = "FLOAT: left; MARGIN: 0px 10px 10px 0px";
			break;
		case "center":
			align = "DISPLAY: block; MARGIN: 0px auto 10px; TEXT-ALIGN: center";
			break;
		case "right":
			align = "FLOAT: right; MARGIN: 0px 0px 10px 10px";
			break;
		default:
			align = "DISPLAY: block";
			break;
	}
	element.style.cssText = align;
};

Editor.setLeft = function() {
	var element = Editor.getSpecialElement(["img","embed"]);
	if(element) Editor.setElementJustify(element,"left");
	else Editor.command("JustifyLeft");
	return -1;
};
Editor.setCenter = function() {
	var element = Editor.getSpecialElement(["img","embed"]);
	if(element) Editor.setElementJustify(element,"center");
	else Editor.command("JustifyCenter");
	return -1;
};
Editor.setRight = function() {
	var element = Editor.getSpecialElement(["img","embed"]);
	if(element) Editor.setElementJustify(element,"right");
	else Editor.command("JustifyRight");
	return -1;
};
Editor.setOrder = function() {
	Editor.command("InsertOrderedList");
	return -1;
};
Editor.setUnorder = function() {
	Editor.command("InsertUnorderedList");
	return -1;
};
Editor.setIndent = function() {
	Editor.command("Indent");
	return -1;
};
Editor.setOutdent = function() {
	Editor.command("Outdent");
	return -1;
};
Editor.showLink = function() {
	var controler = Editor.controls["url"];
	var linkElement = Editor.getSpecialElement("a",true);
		
	if(!linkElement) {
		var str = Editor.getSelectedHTML();
		if(str.length < 1) {
			alert("请选择要添加链接的内容！");
			return 0;
		}
	}
	var feas = [
		["height","260"],
		["width","560"],
		["center","yes"]
	];
	var args = {
		win: window,
		controler: controler,
		obj: linkElement
	};
	Dom.showModalDialog("/editor/support/link.html",args,feas);
	
	return 0;
};
Editor.clearLink = function() {
	if (Browser.ie) {
		Editor.command("Unlink");
	} else {
		var html = "";
		var linkElement;
		if (Browser.ie) {
			linkElement = Editor.getSpecialElement("a",true);		
		} else {
			linkElement = Editor.getSpecialElement("a",false);		
		}
		
		if (linkElement) {
			html = linkElement.innerHTML;
			if (!Browser.ie) {
				var tempRange = Editor.editorWin.document.createRange();
				tempRange.selectNode(linkElement);
				var sel = Editor.editorWin.getSelection();
				if(sel) {
					sel.removeAllRanges();
					sel.addRange(tempRange);
				}
			}
			Editor.pasteHTML(html);
		}
	}
};
Editor.cancelLinkCall = function() {
	Editor.setState(null,0,"url");
};
Editor.addLink = function(obj) {
	if (obj) {
		var html = "";
		var linkElement = Editor.getSpecialElement("a");
		
		if(linkElement) {
			html = linkElement.innerHTML;		
		} else {
			html = Editor.getSelectedHTML();		
		}
		if(linkElement) {
			linkElement.href = obj.link;
			linkElement.target = obj.target;
		} else {
			html = '<a href="' + obj.link + '" target="' + obj.target + '">' + html + '</a>';	
			Editor.pasteHTML(html);
		}
	}
};
Editor.showImg = function() {
	var controler = Editor.controls["simg"];
	var imgElement = Editor.getSpecialElement("img",true);
	var feas = [
		["height","600"],
		["width","845"],
		["center","yes"]
	];
	var args = {
		win: window,
		controler: controler,
		obj: imgElement
	};
	Dom.showModalDialog("/editor/support/insert_image.html", args, feas);
	
	return 0;
};
Editor.showMusic = function() {
	var controler = Editor.controls["smusic"];
	var imgElement = Editor.getSpecialElement("img", true);
	var feas = [
		["height", Browser.chrome?"400":"360"],
		["width", "405"],
		["center", "yes"]
	];
	var args = {
		win: window,
		controler: controler,
		obj: imgElement
	};
	var win = Dom.showModalDialog("/editor/support/insert_music.html", args, feas);

	return 0;
};
Editor.cancelImgCall = function() {
	Editor.setState(null,0,"simg");
};
Editor.addImg = function(info) {
	if(info) { 
		//	首先判断是添加新图片还是修改图片信息
		var imgElement = Editor.getSpecialElement('img', true);
		var align = '';
		if(info.align) {
			switch(info.align) {
				case 'none':
					align = ' ';
					break;
				case 'left':
					align = 'float:left; margin:0px 10px 10px 0px';
					break;
				case 'center':
					align = 'display:block; margin:0px auto 10px; text-align:center';
					break;
				case 'right':
					align = 'float:right; margin:0px 0px 10px 10px';
					break;
			}
		}
		if(imgElement) {
			//	修改
			imgElement.src = info.data[0].url;
			imgElement.style.cssText = align;
		} else {
			//	添加
			//	根据不同的类型执行不同的操作
			var type = info.type;
			var data = info.data;
			var html = '';
			if(align == '') align = 'display:block;margin:0px auto 10px;text-align:center;';
			
			if (type == "imgs") {
				//	要插入多张图片
				var i, imgCount = data.length;
				for (i=0; i<imgCount; i++) {
					var dataNow = data[i],
						url = dataNow.url,
						width = dataNow.width > 640 ? 640 : dataNow.width;
					html += '<img src="' + url + '" border="0"' + (width ? ' width="' + width + '"' : '') + '" style="' + align + '"/>';
				}
			} else {
				html = '<br/>';
				if (info.kind == 1) {
					// 图标模式
					html += '<div style="float:left;padding:7px;">' +
								'<div style="float:left;margin:0 10px 8px 0;width:229px;">' +
									'<div style="padding:0 10px;background-color:white;text-align:center">' +
										'<a href="'+info.link+'" target=_blank><img style="width:200px;" src="' + info.url + '"></a>' +
										'<div style="font-size:12px;color:#333;text-align:left;">' +
											'<div style="font-weight:bold;padding-top:10px;">' + info.name + '</div>' +
											'<div style="padding-top:10px;">' + info.desc + '</div>' + 
											'<div style="text-align:right;padding-top:10px;">' + info.count + '张</div>' +
										'</div>' +
									'</div>' +
								'</div>';
					var i, dataLength = data.length;
					for (i=0; i<dataLength; i++) {
						var dataNow = data[i];
						html += '<div style="float:left;margin:2px 5px;;text-align:center">' + 
									'<a href="' + dataNow.link + '" target=_blank><img src="' + dataNow.url + '"></a>' +
								'</div>';
					}
					
					html += '</div>';
				} else if(info.kind == 2) {
					// 缩微图模式
					html += '<div style="overflow:hidden;float:left;background-color:#333;padding:7px;">' +
								'<div style="float:left;margin:0 10px 8px 0;width:300px;">' +
									'<div style="padding:10px;background-color:white;text-align:center">' + 
										'<a href="'+info.link+'" target=_blank><img style="width:250px;" src="'+info.url+'"></a>' +
										'<div style="font-size:12px;color:#333;text-align:left";>' +
											'<div style="font-weight:bold;padding-top:10px;">'+info.name+'</div>' + 
											'<div style="padding-top:10px;">'+info.desc+'</div>' +
											'<div style="padding-top:10px;text-align:right">'+info.count+'张</div>' +
										'</div>' +
									'</div>' +
								'</div>';
					var i, dataLength = data.length;
					for (i=0; i<dataLength; i++) {
						var bigImg = '', dataNow = data[i];
						bigImg = '<div style="float:left;margin:0 5px 1px 0;height:190px;text-align:center;">' +
									'<div style="width:100%;background-color:white;">' + 
										'<div style="padding:7px;text-align:center;">' + 
											'<a href="' + dataNow.link + '" target=_blank><img src="' + dataNow.url + '"' + '></a>' +
											'<div style="font-size:12px;margin:7px 0 0;overflow:hidden;color:#333;height:28px;text-align:left;line-height:120%;">'+dataNow.alt+'</div>' +
										'</div>' + 
									'</div>' +
								'</div>';
						html += bigImg;
					}
					
					html += '</div>';
				}
				html += '<div style="clear:both;"></div><br/>';
			}
			Editor.pasteHTML(html);
		}
	}
}
Editor.redraw = function() {
	Editor.editorWin.document.body.style.display = "none";
	Editor.editorWin.document.body.style.display = "block";
};
Editor.showImg2 = function() {
	var controler = Editor.controls["simg"];
	var feas = [
		["height","647"],
		["width","800"],
		["center","yes"]
	];
	var args = {
		win: window,
		controler: controler
	};
	Dom.showModalDialog("/editor/support/insert_image2.html",args,feas);
	
	return 0;
};
Editor.addImg2 = function(imgObj) {
	if(imgObj && imgObj.length > 0) {
		var i, html = "";
		for (i=imgObj.length-1;i>=0;i--) {
			html += '<img border="0" style="display:block;text-align:center;margin:0px auto 10px;" src="' + imgObj[i] + '" />';
		}
		Editor.pasteHTML(html);
	}
};
Editor.showMv = function() {
	var controler = Editor.controls["svideo"];
	var mvElement = Editor.getSpecialElement("embed", true);
	var feas = [
		["height","647"],
		["width","760"],
		["center","yes"]
	];
	var args = {
		win: window,
		controler: controler,
		obj: mvElement
	};
	Dom.showModalDialog("/editor/support/insert_media.html", args, feas);
	
	return 0;
};
Editor.cancelMvCall = function() {
	Editor.setState(null, 0, 'svideo');
};
Editor.addMv = function(mvObj) {
	if (!mvObj) {
		return;
	}
	if (mvObj.type == "net") {
		var align = "",
			mvElement = Editor.getSpecialElement("embed");
		switch (mvObj.f_align.toString()) {
			case "none":
				align = "DISPLAY:block";
				break;
			case "left":
				align = "FLOAT:left;MARGIN: 0px 10px 10px 0px";
				break;
			case "center":
				align = "DISPLAY:block;MARGIN: 0px auto 10px;TEXT-ALIGN:center";
				break;
			case "right":
				align = "FLOAT:right;MARGIN: 0px 0px 10px 10px";
				break;
		};
		var mediaFile = mvObj.f_url.substring(mvObj.f_url.lastIndexOf('.')+1).toLowerCase();
		var mediaType = "video";
		if ( /mp3|wma|wav|mid/.test(mediaFile) ) {
			mediaType = 'audio';
		}

		var width = "", height = "";
		if (mvObj.f_width == "") {
			width = (mediaType == "audio") ? 300: 480;
		} else {
			width = mvObj.f_width;
		}
		if (mvObj.f_height == "") {
			height = (mediaType == "audio") ? 45 : 418;
		} else {
			height = mvObj.f_height;
		}
		if (mvElement) {
			var range = Editor.getRange();
			mvElement.src = mvObj.f_url;
			mvElement.style.cssText = align;
			mvElement.width = width;
			mvElement.height = height;
			mvElement.autostart = (mvObj.f_autostart=="true")?true:false;
			mvElement.loop = (mvObj.f_loop=="true")?true:false;
		} else {
			var start = mvObj.f_autostart;
			var loop = mvObj.f_loop;
			var html = '<embed style="' + align + '" src="' + mvObj.f_url + '&autoplay=false" width="' + width + '" height="' + height + '"  loop="' + loop + '" autostart="' + start + '" />';
			Editor.pasteHTML(html);
		}
	} else if (mvObj.type == "lists") {
		var align = "DISPLAY: block; MARGIN: 0px auto 10px; TEXT-ALIGN: center";
		var html = '';
		var data = mvObj.data;
		for (var i=0; i<data.length; i++) {
			html += '<embed style="' + align + '" src="' + data[i].flash + '&autoplay=false" width="480" height="418" quality="high" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
			if (data[i].title) html += '<div style="DISPLAY: block; MARGIN: 0px auto 10px; TEXT-ALIGN: center;"><a href="' + data[i].url + '" target="_blank">'+(data[i].title)+'</a></div><br />';
		}
		Editor.pasteHTML(html);
	}
};
Editor.setView = function() {
	if (Editor.viewState != "changing") {
		var oldViewState = Editor.viewState;
		Editor.viewState = "changing";
		var newViewState = (oldViewState=="view") ? "code": "view";
		if (oldViewState != newViewState) {
			if (newViewState == "code") {
				Editor.viewControler.checked = true;
				Editor.coder.value = Editor.editorWin.document.body.innerHTML;
				Dom.hide(Editor.ifrContainer);
				Dom.show(Editor.txtContainer);
				Editor.menu.style.filter = "Alpha(Opacity=30)";
				Editor.menu.style.MozOpacity = "0.3";
				Editor.coder.focus();
			} else if(newViewState == "view") {
				Editor.viewControler.checked = false;
				Editor.editorWin.document.body.innerHTML = Editor.coder.value;
				Dom.hide(Editor.txtContainer);
				Dom.show(Editor.ifrContainer);
				Editor.menu.style.filter = "Alpha(Opacity=100)";
				Editor.menu.style.MozOpacity = "1";
				if (Browser.ie) {
					var range = Editor.editorWin.document.body.createTextRange();
					range.setEndPoint("EndToStart",range);
					range.select();
				} else {
					Editor.editorWin.document.designMode = "on";			
				}
				if (Editor.editorObj.focus) {
					Editor.editorObj.focus();
				}
			}
		}
		Editor.viewState = newViewState;
	}
};
Editor.showMap = function() {
	var element = Editor.controls["map"];
	if(!element.sohu.lister) element.sohu.lister = new Lister(element, editorConfig.lister.mapData, 6, editorConfig.lister.option);
	element.sohu.lister.show();
	return -2;
};
Editor.hideMap = function() {
	var element = Editor.controls["map"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	return 1;
};
Editor.initMapInput = function(element) {
	element.value = "";
	element.focus();
};
Editor.checkMapInput = function(element) {
	var queryValue = element.value;
	if(queryValue == "") {
		alert("请填入搜索关键词！");
		element.focus();
	} else {
		if (Browser.ie) {
			Editor.controls["map"].sohu.lister.cancel(false);
			var linkStr = "http://map.sogou.com/privatemap/?lq=" + decodeURIComponent(queryValue) + "&login=auto&appid=1733&redirect=http://blog.sohu.com/editor/support/map.html";
			var params = [
				["width","800"],
				["height","600"],
				["center","yes"]
			];
			var a = Dom.open(linkStr,null,params);
			if(!a) alert("您的浏览器阻止了地图操作窗口，请关闭浏览器的阻止弹出窗口选项后继续使用！");
		} else {
			alert("对不起，您的浏览器不支持此功能！");
		}
		return 0;
	}
};
Editor.addMap = function(obj) {
	Editor.checkRange();
	var src = obj.src;
	var link = obj.link;
	var html = '<a href="' + link + '" target="_blank"><img title="点击此查看地图" src="' + src + '" style="display: block; margin: 0px auto 10px; text-align: center;" border="0" /></a>';
	html = decodeURI(html);
	Editor.pasteHTML(html);
};
Editor.cancelMapCall = function() {
	Editor.setState(null,0,"map");
};
Editor.showArticle = function() {
	var controler = Editor.controls["article"];
	var feas = [
		["height","350"],
		["width","550"],
		["center","yes"]
	];
	Editor.setContent();
	var content = Editor.coder.value.unescapeHTML();
	if(content.length < 300) {
		alert("对不起，文品测试至少需要300个文字！");
	} else {
		var args = {
			win: window,
			controler: controler,
			content: content
		};
		Dom.showModalDialog("/editor/support/sogou_article.html",args,feas);
	}
	
	return 0;
};
Editor.cancelArticleCall = function() {
	Editor.setState(null,0,"article");
};
Editor.addArticle = function(content) {
	content = '<br /><!-- sohublogblock begin -->' + content + '<!-- sohublogblock end -->';
	Editor.pasteHTML(content);
};

//	area of add relative article
Editor.showRelative = function() {
	var keywords = $F('keywords').trim();
	if (keywords == "") {
		Editor.setContent();
		if (Editor.coder.value.length < 100) {
			Editor.popupRelative(keywords);
		} else {
			showTipInfo("正在分析您的日志内容，请稍候...");
			_requestTag(Editor.popupRelative);
		}
	} else {
		Editor.popupRelative(keywords);
	}
	return 0;
};
Editor.popupRelative = function(keywords) {
	hideTipInfo();
	
	var controler = Editor.controls["relative_s"],
		feas = [
			["height","572"],
			["width","643"],
			["center","yes"]
		],
		args = {
			win: window,
			controler: controler,
			keywords: keywords
		};
	Dom.showModalDialog("/editor/support/relative.html", args, feas);
	
	return 0;
};
Editor.cancelRelativeCall = function() {
	Editor.setState(null, 0, "relative_s");
};
Editor.addRelative = function(articles,type) {
	type = type || 'entry'
	switch(type){
		case 'entry':
		var typeStr='日志';break;
		case 'mini':
		var typeStr='微博';break;
		default:
		var typeStr='日志';
	}
	
	var content = '';
	if (articles[0].length > 0) {
		var data = articles[0];
		content += '<br /><div style="font-weight: bold;">我的相关'+typeStr+'：</div><br />';
		for (var i=0; i<data.length; i++) {
			var	title = data[i]["title"],
				url = data[i]["url"],
				time = Editor.getDateStr(data[i]["time"]);
				
			content += time + '&nbsp;|&nbsp;<a href="' + url + '" target="_blank" title="' + title + '">' + title + '</a><br />';
		}
		content += '<br />';
	}
	if (articles[1].length > 0) {
		var data = articles[1];
		content += '<br /><div style="font-weight: bold;">其他网友的相关'+typeStr+'：</div><br />';
		for (var i=0; i<data.length; i++) {
			var	title = data[i]["title"],
				url = data[i]["url"],
				time = Editor.getDateStr(data[i]["time"]);
				
			content += time + '&nbsp;|&nbsp;<a href="' + url + '" target="_blank" title="' + title + '">' + title + '</a><br/>';
		}
		content += '<br />';
	}
	Editor.pasteHTML(content);
};

Editor.showRelativeMini = function() {
	var keywords = '';
	Editor.popupRelativeMini(keywords);
	return 0;
};
Editor.popupRelativeMini = function(keywords) {
	hideTipInfo();
	var controler = Editor.controls["relative_mini"];
	var feas = [
		["height","572"],
		["width","643"],
		["center","yes"]
	];
	var args = {
		win: window,
		controler: controler,
		keywords: keywords
	};
	Dom.showModalDialog("/editor/support/relative_mini.html", args, feas);
	
	return 0;
};
Editor.addRelativeMini = function(articles,type) {
	var content = '', data = [];
	if (articles[0].length > 0) {
		data = articles[0];
	} else if(articles[1].length > 0){
		data = articles[1];
	}
	content += '<br /><div style="margin:10px 100px;padding:10px;border:1px solid;"><div style="margin:10px;font-weight:bold;">以下内容来自搜狐微博</div>';
	for (var i=0; i<data.length; i++) {
		if (data[i]['content']){
			content += data[i]['content'];
		}
	}
	content += '<div style="clear:both"></div></div>';
	Editor.pasteHTML(content);
}
Editor.cancelRelativeMiniCall = function() {
	Editor.setState(null, 0, "relative_mini");
};
Editor.getDateStr = function(timestamp) {
	var date = new Date(parseInt(timestamp));
	var month = date.getMonth() + 1;
	month = (month>9 ? '' : '0') + month;
	var day= (date.getDate()>9?"":"0") + date.getDate();
	var str = date.getFullYear() + "-" + month + "-" + day;
	return str;
};
Editor.focusContent = function() {
	try	{
		Editor.editorWin.focus();
	} catch (e){}
};
Editor.cacheRange = function() {
	Editor.selection = Editor.editorWin.document.selection;
	Editor.rangeCache = Editor.selection.createRange();
};
Editor.checkRange = function() {
	if(Editor.rangeCache) {
		Editor.editorWin.focus();
		Editor.rangeCache.select();
		Editor.rangeCache = false;
	}
};
Editor.getRange = function() {
	var range = false;
	if (Browser.ie) {
		Editor.editorWin.focus();
		Editor.selection = Editor.editorWin.document.selection;
		range = Editor.selection.createRange();
	} else {
		Editor.selection = Editor.editorWin.getSelection();
		range = Editor.editorWin.document;
	}
	
	return range;
};
Editor._e_keyPress = function(e) {
	if (e.keyCode != 13) return;
	window.setTimeout(Editor._afterKeyEnter, 0);
};
Editor._afterKeyEnter = function() {
	var element = Editor.getElement();
	if (!!element && element.tagName) {
		switch (element.tagName.toLowerCase()) {
			case 'br':
				element = element.parentNode;
				if (!element || !element.tagName || element.tagName.toLowerCase() != 'p') {
					return;
				}
			case 'p':
				var html = element.innerHTML;
				if (html.length < 10) {
					html = html.toLowerCase();
					if (html == '' || html == '<br>' || html == '<br/>' || html == '<br />' || html == '&nbsp;') {
						var prev = element;
						while (prev = prev.previousSibling) {
							if (prev.nodeType && prev.nodeType == 1) {
								break;
							}
						}
						var prevStr = '';
						if (prev && prev.tagName && prev.tagName.toLowerCase() == 'p') {
							var prevHtml = prev.innerHTML;
							var index = 0, str = [];
							while (true) {
								var type = '&nbsp;';
								if (prevHtml.indexOf(type, index)-index == 0) {
									index += type.length;
									str.push(type);
									continue;
								}
								type = ' ';
								if (prevHtml.indexOf(type, index)-index == 0) {
									index += type.length;
									str.push('&nbsp;');
									continue;
								}
								type = '　';
								if (prevHtml.indexOf(type, index)-index == 0) {
									index += type.length;
									str.push(type);
									continue;
								} else {
									break;
								}
							}
							if (str.length > 0) {
								prevStr = str.join('');
							}
						}
						
						if (prevStr.length > 0) Editor.pasteHTML(prevStr);
					}
				}
				break;
		}
		
	}
};
Editor.getElement = function() {
	var element, sel, range;
	if (Browser.ie) {
		sel = Editor.editorWin.document.selection;
		switch(sel.type.toLowerCase()) {
			case "none":
			case "text": {
				range = sel.createRange();
				element = range.parentElement();
				break;
			}
			case "control": {
				var ranges = sel.createRange();
				element = ranges.item(0);
				break;
			}
		}
	} else {
		sel = Editor.editorWin.getSelection();
		if (sel.rangeCount > 0) {
			range = sel.getRangeAt(0);
			if (range.startContainer == range.endContainer) {
				if(range.startContainer.nodeType != 3) {
					element = range.startContainer.childNodes[range.startOffset];
				} else {
					element = range.startContainer;				
				}
			} else {
				element = range.commonAncestorContainer;			
			}
		}
		if (element && element.nodeType == 3) {
			element = element.parentNode;		
		}
	}
	
	return element;
};
Editor.getSpecialElement = function(tagName,isFoucs) {
	var element = null;
	var tempElement = Editor.getElement();
	
	if (tempElement) {
		if (typeof tagName == "string") tagName = [tagName];
		while (tempElement && tempElement.tagName) {
			for (var i=tagName.length-1;i>=0;i--) {
				if (tagName[i] == tempElement.tagName.toLowerCase()) {
					element = tempElement;
					break;
				}
			}
			if (element) {
				break;
			} else {
				tempElement = tempElement.parentNode;
			}
		}
	}
	if (isFoucs && element) {
		if (Browser.ie) {
			Editor.rangeCache = false;
			var range = Editor.editorWin.document.body.createTextRange();
			range.moveToElementText(element);
			range.select();
		} else {
			var sel = Editor.editorWin.getSelection();
			if (sel) {
				var range = sel.getRangeAt(0);
				range.selectNode(element);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	}
	
	return element;
};
// 初始化缓存工具
Editor.initCacheTool = function(){
	var str = '';
	var src = 'http://js3.pp.sohu.com.cn/ppp/blog/styles_ppp/images/cacheWriter.swf';
	var flashvars = 'callBackFun=Editor.checkCacheTool';
	if (Browser.ie) {
		str +=	'<object id="cacheFlash_ob" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="100%" height="100%" align="middle">' +
					'<param name="allowScriptAccess" value="always" />' +
					'<param name="movie" value="' + src + '" />' +
					'<param name="flashvars" value="' + flashvars + '" />' +
					'<param name="quality" value="high" />' +
					'<param name="wmode" value="transparent" />' +
					'<param name="allowFullScreen" value="true" />' +
					'<embed id="cacheFlash_em" src="' + src + '" flashvars="' + flashvars + '" quality="high" width="100%" height="100%" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />' +
				'</object>';
	} else {
		str += '<embed id="cacheFlash_em" src="' + src + '" flashvars="' + flashvars + '" quality="high"  width="100%" height="100%" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
	}
	Editor.ctContainer.innerHTML = str;
};
// 与FLASH缓存工具通信，通知对方是否都已准备好
Editor.checkCacheTool = function(){
	Editor.cacheToolReady = true;
	return true;
}
// 获取缓存工具
Editor.getCacheTool = function() {
	if (Browser.ie) {
		return $('cacheFlash_ob');
	} else {
		return document['cacheFlash_em'];
	}
};
// 备份当前编辑的日志
Editor.backup = function(){
	Editor.setContent();
	if(Editor.coder.value != '')
		Editor.getCacheTool().setCache('entry',Editor.coder.value);
};
// 恢复当前编辑的日志
Editor.recover = function(){
	var cacheTool = Editor.getCacheTool();
	try{
		var cache = cacheTool.getCache('entry');
		var content = '';
		if(Editor.coder.value == ''){
			if(cache != null)
				content = cache;
		}
		if (!!content) {
			Editor.pasteHTML(content);
		}

	} catch (e){
		window.setTimeout(Editor.recover,100);
	}
};
// 删除备份
Editor.delBackup = function(){
	Editor.getCacheTool().delCache('entry');
};

var Lister = Class.create();
Lister.now = false;
Lister.prototype = {
	initialize: function(controler,listData,colCount,option) {
		this.controler = controler;
		this.listData = listData;
		this.colCount = colCount;
		this.containerClass = option.containerClass;
		this.itemClass = listData.itemClass?listData.itemClass:option.itemClass;
		this.itemOverClass = listData.itemOverClass?listData.itemOverClass:option.itemOverClass;
		
		if(!this.listData.text) this.listData.text = this.listData.value;
		
		this.clickEventObj = false;
		this.visibility = false;
		
		this.initContainer(this.containerClass);
	},
	initContainer: function(class2) {
		var element = document.createElement("div");
		element.className = class2;
		element.style.display = "none";
		this.container = element;
		this.initContent();
		document.body.appendChild(this.container);
	},
	initContent: function() {
		switch(this.listData.type) {
			case "auto": {
				for(var i=0;i<this.listData.value.length;i++) {
					if(i%this.colCount == 0 && i > 0) Dom.create("div","newLine",this.container);
					this.initListItem(i,this.container);
				}
				break;
			}
			case "manual": {
				for(var i=0;i<this.listData.value.length;i++) {
					this.initListItem2(i,this.container);
				}
				break;
			}
			case "manual2": {
				this.container.innerHTML = this.listData.content;
				break;
			}
			case "function":
				this.listData.init(this.container, this.selectedCall.bind(this)); 
				break;
		}
	},
	initListItem: function(index,parent) {
		var text = this.listData.text[index];
		var value = this.listData.value[index];
		var pattern = this.listData.pattern;
		
		text = pattern.replace(/\$=text\$/ig,text).replace(/\$=value\$/ig,value);
		var element = Dom.create("div",this.itemClass,parent);
		element.innerHTML = text;
		
		var itemClickFunc = this.selectedCall.bind(this,value);
		var itemOverFunc = this.itemMouseOver.bind(this,element);
		var itemOutFunc = this.itemMouseOut.bind(this,element);
		Event.observe(element,"click",itemClickFunc);
		Event.observe(element,"mouseover",itemOverFunc);
		Event.observe(element,"mouseout",itemOutFunc);
	},
	initListItem2: function(index,parent) {
		var text = this.listData.value[index][0];
		var value = this.listData.value[index][1];
		
		if(text) {
			var element = Dom.create("div",this.itemClass,parent);
			element.innerHTML = text;
			var itemClickFunc = this.selectedCall.bind(this,value);
			var itemOverFunc = this.itemMouseOver.bind(this,element);
			var itemOutFunc = this.itemMouseOut.bind(this,element);
			Event.observe(element,"click",itemClickFunc);
			Event.observe(element,"mouseover",itemOverFunc);
			Event.observe(element,"mouseout",itemOutFunc);
		} else {
			Dom.create("div","newLine",this.container);
		}
	},
	itemMouseOver: function(element) {
		element.className = this.itemOverClass;
	},
	itemMouseOut: function(element) {
		element.className = this.itemClass;
	},
	selectedCall: function(value) {
		this.hide();
		this.controler.sohu.selectCall.call(Editor,value,this.controler);
	},
	cancel: function(e) {
		if(this.visibility) {
			var canCancel = true;
			if(typeof(e) != "boolean") {
				e = window.event || e;
				if(e) {
					eventEle = Event.element(e);
					while(eventEle) {
						if(this.container == eventEle) {
							canCancel = false;
							break;
						}
						eventEle = eventEle.parentElement;
					}
				}
			}
			if(canCancel) {
				this.hide();
				this.controler.sohu.cancelCall.call(this.controler);
			}
		}
	},
	show: function() {
		if(!this.visibility) {
			this.visibility = true;
			var rect = Dom.getRect(this.controler);
			var position = {left:rect.left,top:rect.bottom};
			Dom.setPosition(this.container,position);
			this.clickEventObj = this.cancel.bind(this);
			Event.observe(document,"mouseup",this.clickEventObj);
			Event.observe(Editor.editorWin.document,"mouseup",this.clickEventObj);
			Dom.show(this.container);
			Lister.now = this;
			if(this.listData.init) eval(this.listData.init);
		}
	},
	hide: function() {
		Lister.now = false;
		if(this.clickEventObj) {
			Event.stopObserving(document,"mouseup",this.clickEventObj);
			Event.stopObserving(Editor.editorWin.document,"mouseup",this.clickEventObj);
			this.clickEventObj = false;
		}
		this.visibility = false;
		Dom.hide(this.container);
	}
};

// exports Editor
window.Dom = Dom;
window.Editor = Editor;

}(this, this.document);
