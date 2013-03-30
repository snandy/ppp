/*******************************************************************************************************
 * UWA Module
 ******************************************************************************************************/
 
/**
 * UWA Module，其作为一个标准的App Widget形式存在，但这个对象并不会直接开放给开发者
 * @class UWA Module
 * @param {Object} m_data 这是App Module传送给UWA Module的有关这个Widget的数据，其结构为：
 * 		{
 *			path: '',
 *			data: {
 *				//	UWA Widget本身所需要的数据
 * 			}
 * 		}
 **/ 
UWA.Module = function(m_data, m_content, m_edit, w_path) {
	this.initVars(m_data, m_content, m_edit);
}

/*---------------------  自身实现需要的方法  ---------------------*/

/**
 * 初始化基本的变量
 **/
UWA.Module.prototype.initVars = function(m_data, m_content, m_edit) {
	//	保存基本变量
	if (typeof(m_data) == "string") {
		if (m_data.length > 0) {
			this.data = eval("(" + m_data + ")");
		} else {
			this.data = {};
		}
	} else {
		this.data = m_data;
	}
	if (typeof(this.data.ref) != "object") this.data.ref = {};
	this.contentEle = m_content;
	this.editEle = m_edit;
	
	//	系统操作需要的基本变量
	this.wrapper = null;		//	包装整个widget结构数据的WidgetWrapper对象
	this.body = null;			//	可以提供给uwa widget对象使用的显示区域容器对象
	this.widget = null; 		//	此模块中的uwa widget对象
	
	//	有关widget参数配置的项
	this.ref = null;			//	包含整个widget参数配置信息的数组对象，其中的每一项都是一个配置选项
	this.refValue = null;		//	存储每个设置项的值
	this.refForm = null;		//	包含widget设置参数的form对象
	
	//	有可能会需要的变量
	this.timer = null;			//	定时器对象
	this.autoRefresh = 0;		//	刷新间隔
	this.refTimer = null;		//	保存设置定时器
	
	//	有关运行配置的一些变量
	this.isPrivate = false;		//	是否是一个私有的模块
	this.isEditing = false;		//	是否处于编辑状态
	
	//	跟测试模式相关的内容
	this.widget = null;
}

/**
 * 是否设置了测试路径
 **/
UWA.Module.prototype.isSetTest = function() {
	return this.data && this.data.testpath && (this.data.testpath.length > 0);
}

/**
 * 是否是正常模式
 **/
UWA.Module.prototype.isNormal = function() {
	return this.data && this.data.path && (this.data.path.length > 0);
}

/**
 * 是否是正常模式
 **/
UWA.Module.prototype.onCloseEdit = function() {
	this.isEditing = false;
}

/**
 * 取得Widget Wrapper后的处理方法
 **/
UWA.Module.prototype.gettedWrapper = function(wrapper) {
	this.wrapper = wrapper;
	
	if (!this.wrapper) {
		if (!this.isNormal()) this.data.testpath = null;
		this.contentEle.innerHTML = '对不起，此模块不可用！';
		return;
	}
	
	//	判断此widget是否只有博主可用
	if (this.wrapper.isPrivate || this.isPrivate) {
		if (!isMyBlog()) {
			return this.notShow();
		}
	}
			
	this.edit = null;
	this.refresh = null;
	this.ref = null;
	this.refValue = null;
	this.refForm = null;
	
	//	初始化body对象
	this.contentEle.innerHTML = '<div class="uwa_widget_' + this.wrapper.classId + '"></div>';
	this.body = UWA.$element(this.contentEle.firstChild);
	
	//	初始化widget
	this.initWidget();
	
	//	取得后缀对象，如果存在后缀对象的话，那就进行初始化
	/*
	if (this.suffix = ((this.contentEle.childNodes.length > 1 && this.contentEle.lastChild.className == UWA.Config.suffixClass) ? this.contentEle.lastChild : null)) {
		this.initSuffix();
	}
	*/
	
	//	如果存在定时器，那就启动定时器
	var autoRefresh = this.wrapper.getIntro().autoRefresh;
	if (typeof(autoRefresh) == "number" && autoRefresh > 0) {
		this.autoRefresh = autoRefresh * 1000;
		this.setTimer();
	}
	
	if (this.loaded) this.loaded();
}

/**
 * 添加定时器
 **/
UWA.Module.prototype.setTimer = function() {
	if (this.autoRefresh && this.refresh) {
		this.timer = window.setTimeout(this.refresh.bind(this), this.autoRefresh);
	}
}

/**
 * 删除定时器
 **/
UWA.Module.prototype.clearTimer = function() {
	if (this.timer) {
		window.clearTimeout(this.timer);
		this.timer = null;
	}
}

/**
 * 如果模块不能向用户开放时的处理方法
 **/
UWA.Module.prototype.notShow = function() {
	
	this.contentEle.innerHTML = '此模块为私有模块，只有博主可用';
	
	if (this.loaded) this.loaded();
	return false;
}

/**
 * 初始化用户开发的Widget
 **/
UWA.Module.prototype.initWidget = function() {
	/*
	this.widget = new UWA.Widget(this);
	this.widget.initialize(this.wrapper.getIntro().title, this.wrapper.getBody(), this.wrapper.getScripts());
	*/
	this.widget = new UWA.Widget();
	
	//	为widget绑定一些属性和方法
	this.widget.body = UWA.$element(this.body);
	this.widget.getValue = this.getRef.bind(this);
	this.widget.setValue = this.setRef.bind(this);
	this.widget.setTitle = this.onSetTitle.bind(this);
	this.widget.setAutoRefresh = this.setAutoRefresh.bind(this);
	this.widget.log = this.log.bind(this);
	
	//	初始化参数设置部分
	this.initRef();
	
	//	开始调用用户的方法进行初始化
	try {
		this.widget.initialize(this.wrapper.getIntro().title, this.wrapper.getBody(), this.wrapper.getScripts());
	} catch (e) {
		this.log(e);
	}
	
	//	根据widget的情况设置module的按钮
	var hadRefresh = false;
	var hadEdit = false;
	var hadShare = false;
	if (this.widget.onRefresh && typeof(this.widget.onRefresh) == "function") {
		hadRefresh = true;
		this.refresh = this._refresh;
	}
	if (this.isNormal()) {
		for (var i=0; i<this.ref.length; i++) {
			if (this.ref[i].type == "hidden") continue;
			hadEdit = true;
			break;
		}
	} else {
		hadEdit = true;
	}
	if (!(this.wrapper.isPrivate || this.isPrivate)) {
		this.shareMePath = this._shareMePath;
		hadShare = true;
	}
	if (hadEdit) this.edit = this._edit;
	if (hadRefresh || hadEdit || hadShare) this.resetControls();
	
	//	调用初始化方法
	if (this.widget.onLoad && typeof(this.widget.onLoad) == "function") {
		try {
			this.widget.onLoad();
		} catch (e) {
			this.log(e);
		}
	}
	
	//	设置图标
	var ico = this.wrapper.getIntro().icon;
	if (ico && ico.length > 0) {
		this.setIco(ico);
	}
}

/**
 * 初始化后缀对象
 **/
/*
UWA.Module.prototype.initSuffix = function() {
	Event.observe(this.suffix.lastChild, 'click', this.onSend2Friends.bind(this, this.suffix.lastChild));
}
*/

/**
 * 
 */
/*
UWA.Module.prototype.onSend2Friends = function(ele) {
	//	确保用户没有重复操作
	var config = UWA.Config,
			attr = 'data-share2';
	if (ele.getAttribute(attr)) return;
	
	//	设置相关数据，并发送相应请求
	ele.setAttribute(attr, 'true');
	ele.innerHTML = config.sharIng;
	UWA.Data.getJson('http://ow.blog.sohu.com/widget/0/sendMsg?url=' + encodeURIComponent(this.data.path), function(json) {
		var aa = new PopWin({
			type: 'alert',
			title: config.share2,
			content: (json || 0).statusText || config.shareError
		});
		ele.innerHTML = config.share2;
		ele.removeAttribute(attr);
	});
}
*/

/**
 * 分享此Widget的链接地址
 */
UWA.Module.prototype._shareMePath = function() {
	return 'url=' + encodeURIComponent(this.data.path);
}
/**
 * 分享此Widget的链接地址，默认状况下返回false，表示不能分享，只有在能够分享的状态下才会替换成上面的_shareMePath方法
 */
UWA.Module.prototype.shareMePath = function() {
	return false;
}

/**
 * 设置标题
 **/
UWA.Module.prototype.onSetTitle = function(title) {
	if (typeof(title) == "string" && title.length > 0) {
		if (title.length > 8) {
			var PatSWord=/^[\x00-\xff]+$/;	//	中文字符
			var length = 0;
			for (var i=0; i<title.length; i++) {
				var char = title.charAt(i);
				if (PatSWord.test(char)) {
					length += 1;
				}
				else {
					length += 2;
				}
				if (length > 16) break;
			}
			title = title.substr(0, i);
		}
		this.setTitle(title, true);
	}
}

/**
 * 初始化widget参数设置部分
 **/
UWA.Module.prototype.initRef = function() {
	this.ref = this.wrapper.getPreferences();
}

/**
 * 用户准备保存设置时触发的事件
 **/
UWA.Module.prototype.onSubmit = function() {
	if (!this.isNormal() && !this.isSetTest()) {
		//	如果是在测试模式下保存测试地址
		var path = this.getRef("testpath");
		if (typeof(path) == "string" && path.length > 0 && path.trim().length > 0) {
			var data = {testpath: path.trim()};
			this.endSave = function() {
				this.data = data;
				if (!this.data.ref) this.data.ref = {};
				this.initialize();
				this.endSave = null;
			}
			this.save(data);
		}
		this.isEditing = false;
	} else {
		//	如果是在正常模式或者测试模式下保存属性设置值
		var refData = this.data.ref;
		if (this.refForm) {
			for (var i=0; i<this.ref.length; i++) {
				var refNow = this.ref[i];
				if (refNow.type == "hidden") continue;
				switch (refNow.type) {
					case "text":
					case "password":
						var formValue = this.refForm[refNow.name].value;
						if (typeof(formValue) == "undefined" || formValue == null || formValue == "" || formValue == refNow.defaultValue) {
							refData[refNow.name] = undefined;
						} else {
							refData[refNow.name] = formValue;
						}
						break;
					case "boolean":
						var formValue = this.refForm[refNow.name].checked.toString();
						if (formValue != refNow.defaultValue) {
							refData[refNow.name] = formValue;
						} else {
							refData[refNow.name] = undefined;
						}
						break;
					case "range":
					case "list":
						var formValue = this.refForm[refNow.name].value;
						refData[refNow.name] = formValue;
						break;
				}
			}
		}
		this.save(this.data);
		this.isEditing = false;
		if (this.refresh) this.refresh();
	}
	return false;
}

/*---------------------  开放给UWA的方法  ---------------------*/

/**
 * 设置自动刷新时间
 * @param {Number} delay 刷新间隔，以秒为单位
 **/
UWA.Module.prototype.setAutoRefresh = function(delay) {
	this.clearTimer();
	if (typeof(delay) != "number") {
		delay = 0;
		try {
			delay = parseInt(delay);
		} catch (e) {
			this.log(e);
		}
	}
	if (delay > 0) {
		this.autoRefresh = delay * 1000;
		this.setTimer();
	} 
}

/**
 * 取得某个参数设置项的值
 * @param {String} name 参数设置项的名称
 * @return 参数设置项的值
 * @type String
 **/
UWA.Module.prototype.getRef = function(name) {
	if (this.ref[name]) {
		if (this.isEditing && this.refForm && this.ref[name].type != "hidden") {
			switch (this.ref[name].type) {
				case "boolean":
					return this.refForm[name].checked.toString();
					break;
				default:
					return this.refForm[name].value;
					break;
			}
		} else {
			var value = typeof(this.data.ref[name]) == 'undefined' ? this.ref[name].defaultValue : this.data.ref[name];
			return typeof(value) == "undefined" ? value : value.toString();
		}
	} else {
		var e = new ReferenceError('不存在属性设置项"' + name + '"');
		this.log(e);
	}
}

/**
 * 设置某个参数设置项的值
 * @param {String} name 参数设置项的名称
 * @param {String} value 参数设置项的值
 **/
UWA.Module.prototype.setRef = function(name, value) {
	if (this.ref[name]) {
		this.data.ref[name] = typeof(value) == "undefined" ? undefined : value.toString();
		if (this.refForm && this.ref[name].type != "hidden") {
			if (this.ref[name].type == "boolean") {
				this.refForm[name].checked = value == "true";
			} else {
				this.refForm[name].value = value;
			}
		}
		
		if (this.refTimer == null) {
			this.refTimer = window.setTimeout(this.setRefNow.bind(this), 200);
		}
		//	this.save(this.data);
	} else {
		var e = new ReferenceError('不存在属性设置项"' + name + '"');
		this.log(e);
	}
}

UWA.Module.prototype.setRefNow = function() {
	this.save(this.data);
	this.refTimer = null;
}

/**
 * 向控制台中进行日志记录
 * @param {Object} obj 记录项
 **/
UWA.Module.prototype.log = function(obj) {
	if (this.wrapper.getIntro().debugMode) {
		UWA.log(obj);
	}
}

/*---------------------  App Widget 要求的方法  ---------------------*/

/**
 * 初始化方法（Required by App）
 **/
UWA.Module.prototype.initialize = function() {
	/*
	if (this.data == null || (typeof(this.data) == "string" && this.data == "")) {
		this.data = {path: UWA.Config.defaultWidget};
	}
	*/
	
	/*	临时
	if (typeof(this.data) == "string") {
		this.data = eval("(" + this.data + ")");
	}
	*/
	
	this.contentEle.innerHTML = '正在加载...';
	
	if (this.isNormal()) {
		//	正常模式
		//	请求 UWA Widget
		UWA.WidgetLib.getWidget(this.data.path, this.gettedWrapper.bind(this), true);
	} else {
		this.isPrivate = true;
		//	测试模式
		if (this.isSetTest()) {
			//	已经设置了测试地址
			
			UWA.WidgetLib.getWidget(this.data.testpath, this.gettedWrapper.bind(this), false);
		} else {
			//	未设置测试地址
			var scriptStr = '' +
				'widget.onLoad = function() {' +
					'widget.setBody("本模块可以用来测试一个标准的Sohu Open Widget。<br />请点击此模块右上角的“设置”，填入您要测试的Widget地址。");' +
				'}';
			var obj = {
				intro: {
					debugMode: true
				},
				
				scripts: [
					scriptStr
				],
				
				refs: [
					{
						type: "text",
						label: "地址",
						name: "testpath"
					}
				],
				
				body: ""
			}
			var wrapper = UWA.WidgetWrapper.getFromObj(obj);
			this.gettedWrapper(wrapper);
		}
	}
}

/**
 * 销毁模块
 **/
UWA.Module.prototype.destroy = function() {
	//	如果好存在没有保存的数据，那就马上保存
	if (this.refTimer) this.setRefNow();
	
	//	清楚刷新定时器
	this.clearTimer();
	
	//	清楚其他变量
	this.widget = null;
	this.wrapper = null;
	this.body = null;
	this.ref = null;
	this.contentEle.innerHTML = "";
}

/**
 * 刷新模块
 **/
UWA.Module.prototype._refresh = function() {
	if (this.widget) {
		this.clearTimer();
		try {
			this.widget.onRefresh();
		} catch (e) {
			this.log(e);
		}
		this.setTimer();
		if (this.loaded) this.loaded();
	}
}

/**
 * 添加我按钮的实现方法
 **/
UWA.Module.prototype.addMe = function() {
	if (this.isNormal()) {
		window.open('http://blog.sohu.com/manage/module.do?m=preview&url=' + encodeURIComponent(this.data.path));
		return true;
	}
	return false;
}

/**
 * 显示编辑模块
 **/
UWA.Module.prototype._edit = function() {
	this.isEditing = true;
	if (this.widget) {
		if (!this.refForm) {
			//	填充编辑区域
			var str = '<form onsubmit="return false"><table border="0" cellpadding="2" cellspacing="0">';
			
			var rowIndex = -1;
			if (!this.isNormal()) {
				str += '<tr><td width="45px">&nbsp;</td><td>此模块为"测试模块"</td></tr>';
				rowIndex ++;
			}
			
			var onchanges = [];
			var showCount = 0;
			var dataRef = this.data.ref;
			for (var i=0; i<this.ref.length; i++) {
				var refNow = this.ref[i];
				if (refNow.type == "hidden") continue;
				showCount++;
				rowIndex ++;
				
				str += '<tr><td width="45px">' + refNow.label + ':</td><td>';
				var refName = refNow.name;
				var refValue = (typeof(dataRef[refName]) == "undefined") ? refNow.defaultValue : dataRef[refName];
				switch (refNow.type) {
					case "text":
						str += '<input type="text" class="text" name="' + refName + '" ' + (typeof(refValue) == "string" ? (' value="' + refValue + '" ') : '') + ' />';
						break;
					case "boolean":
						str += '<input type="checkbox" name="' + refName + '" ' + (refValue == "true" ? (' checked="checked" ') : '') + ' />';
						if (refNow.onchange) onchanges.push(rowIndex);
						break;
					case "range":
						str += '<select class="text" name="' + refName + '">';
						var min = parseFloat(refNow.min);
						var max = parseFloat(refNow.max);
						var step = parseFloat(refNow.step);
						if (max > min) {
							for (var j=min; j<=max; j+=step) {
								str += '<option value="' + j + '" ' + (refValue == j.toString() ? ' selected="selected" ' : '') + '>' + j + '</option>';
							}
						}
						str += '</select>';
						if (refNow.onchange) onchanges.push(rowIndex);
						break;
					case "list":
						str += '<select class="text" name="' + refName + '">';
						for (var j=0; j<refNow.options.length; j++) {
							str += '<option value="' + refNow.options[j].value + '" ' + ((typeof(refValue) != "undefined" && refValue == refNow.options[j].value) ? ' selected="selected" ' : '') + '>' + refNow.options[j].label + '</option>';
						}
						str += '</select>';
						if (refNow.onchange) onchanges.push(rowIndex);
						break;
					case "password":
						str += '<input type="password" class="text" name="' + refName + '" ' + (typeof(refValue) == "string" ? (' value="' + refValue + '" ') : '') + ' />';
						break;
				}
				str += '</td></tr>';
			}
			str += '<tr><td>&nbsp;</td><td><input type="submit" name="" value="'+ App.Lang.save +'" class="button-submit" /></td></tr></table></form>';
			
			if (showCount == 0) {
				this.editEle.innerHTML = '<table border="0" cellpadding="2" cellspacing="0"><tr><td width="45px">&nbsp;</td><td>此模块为"测试模块"</td></tr><tr><td width="45px">&nbsp;</td><td>此模块没有可设置项</td></tr></table>';
			} else {
				this.editEle.innerHTML = str;
			
				this.refForm = this.editEle.firstChild;
				var table = this.refForm.firstChild;
				if (onchanges.length > 0 && this.refresh) {
					for (var i=0; i<onchanges.length; i++) {
						Event.observe(table.rows[onchanges[i]].cells[1].firstChild, "change", this.refresh.bind(this));
					}
				}
				
				//	this.refForm.onsubmit = this.onSubmit.bind(this);
				Event.observe(this.refForm, "submit", this.onSubmit.bind(this));
			}
		}
	} else {
		this.editEle.innerHTML = '加载完成才能使用此功能';
	}
}

/*---------------------  在App 中注册  ---------------------*/
var uwa_widget = UWA.Module;

registerWidget("uwa_widget");