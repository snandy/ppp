/*******************************************************************************************************
 * UWA Module
 ******************************************************************************************************/
 
/**
 * UWA Module������Ϊһ����׼��App Widget��ʽ���ڣ���������󲢲���ֱ�ӿ��Ÿ�������
 * @class UWA Module
 * @param {Object} m_data ����App Module���͸�UWA Module���й����Widget�����ݣ���ṹΪ��
 * 		{
 *			path: '',
 *			data: {
 *				//	UWA Widget��������Ҫ������
 * 			}
 * 		}
 **/ 
UWA.Module = function(m_data, m_content, m_edit, w_path) {
	this.initVars(m_data, m_content, m_edit);
}

/*---------------------  ����ʵ����Ҫ�ķ���  ---------------------*/

/**
 * ��ʼ�������ı���
 **/
UWA.Module.prototype.initVars = function(m_data, m_content, m_edit) {
	//	�����������
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
	
	//	ϵͳ������Ҫ�Ļ�������
	this.wrapper = null;		//	��װ����widget�ṹ���ݵ�WidgetWrapper����
	this.body = null;			//	�����ṩ��uwa widget����ʹ�õ���ʾ������������
	this.widget = null; 		//	��ģ���е�uwa widget����
	
	//	�й�widget�������õ���
	this.ref = null;			//	��������widget����������Ϣ������������е�ÿһ���һ������ѡ��
	this.refValue = null;		//	�洢ÿ���������ֵ
	this.refForm = null;		//	����widget���ò�����form����
	
	//	�п��ܻ���Ҫ�ı���
	this.timer = null;			//	��ʱ������
	this.autoRefresh = 0;		//	ˢ�¼��
	this.refTimer = null;		//	�������ö�ʱ��
	
	//	�й��������õ�һЩ����
	this.isPrivate = false;		//	�Ƿ���һ��˽�е�ģ��
	this.isEditing = false;		//	�Ƿ��ڱ༭״̬
	
	//	������ģʽ��ص�����
	this.widget = null;
}

/**
 * �Ƿ������˲���·��
 **/
UWA.Module.prototype.isSetTest = function() {
	return this.data && this.data.testpath && (this.data.testpath.length > 0);
}

/**
 * �Ƿ�������ģʽ
 **/
UWA.Module.prototype.isNormal = function() {
	return this.data && this.data.path && (this.data.path.length > 0);
}

/**
 * �Ƿ�������ģʽ
 **/
UWA.Module.prototype.onCloseEdit = function() {
	this.isEditing = false;
}

/**
 * ȡ��Widget Wrapper��Ĵ�����
 **/
UWA.Module.prototype.gettedWrapper = function(wrapper) {
	this.wrapper = wrapper;
	
	if (!this.wrapper) {
		if (!this.isNormal()) this.data.testpath = null;
		this.contentEle.innerHTML = '�Բ��𣬴�ģ�鲻���ã�';
		return;
	}
	
	//	�жϴ�widget�Ƿ�ֻ�в�������
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
	
	//	��ʼ��body����
	this.contentEle.innerHTML = '<div class="uwa_widget_' + this.wrapper.classId + '"></div>';
	this.body = UWA.$element(this.contentEle.firstChild);
	
	//	��ʼ��widget
	this.initWidget();
	
	//	ȡ�ú�׺����������ں�׺����Ļ����Ǿͽ��г�ʼ��
	/*
	if (this.suffix = ((this.contentEle.childNodes.length > 1 && this.contentEle.lastChild.className == UWA.Config.suffixClass) ? this.contentEle.lastChild : null)) {
		this.initSuffix();
	}
	*/
	
	//	������ڶ�ʱ�����Ǿ�������ʱ��
	var autoRefresh = this.wrapper.getIntro().autoRefresh;
	if (typeof(autoRefresh) == "number" && autoRefresh > 0) {
		this.autoRefresh = autoRefresh * 1000;
		this.setTimer();
	}
	
	if (this.loaded) this.loaded();
}

/**
 * ��Ӷ�ʱ��
 **/
UWA.Module.prototype.setTimer = function() {
	if (this.autoRefresh && this.refresh) {
		this.timer = window.setTimeout(this.refresh.bind(this), this.autoRefresh);
	}
}

/**
 * ɾ����ʱ��
 **/
UWA.Module.prototype.clearTimer = function() {
	if (this.timer) {
		window.clearTimeout(this.timer);
		this.timer = null;
	}
}

/**
 * ���ģ�鲻�����û�����ʱ�Ĵ�����
 **/
UWA.Module.prototype.notShow = function() {
	
	this.contentEle.innerHTML = '��ģ��Ϊ˽��ģ�飬ֻ�в�������';
	
	if (this.loaded) this.loaded();
	return false;
}

/**
 * ��ʼ���û�������Widget
 **/
UWA.Module.prototype.initWidget = function() {
	/*
	this.widget = new UWA.Widget(this);
	this.widget.initialize(this.wrapper.getIntro().title, this.wrapper.getBody(), this.wrapper.getScripts());
	*/
	this.widget = new UWA.Widget();
	
	//	Ϊwidget��һЩ���Ժͷ���
	this.widget.body = UWA.$element(this.body);
	this.widget.getValue = this.getRef.bind(this);
	this.widget.setValue = this.setRef.bind(this);
	this.widget.setTitle = this.onSetTitle.bind(this);
	this.widget.setAutoRefresh = this.setAutoRefresh.bind(this);
	this.widget.log = this.log.bind(this);
	
	//	��ʼ���������ò���
	this.initRef();
	
	//	��ʼ�����û��ķ������г�ʼ��
	try {
		this.widget.initialize(this.wrapper.getIntro().title, this.wrapper.getBody(), this.wrapper.getScripts());
	} catch (e) {
		this.log(e);
	}
	
	//	����widget���������module�İ�ť
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
	
	//	���ó�ʼ������
	if (this.widget.onLoad && typeof(this.widget.onLoad) == "function") {
		try {
			this.widget.onLoad();
		} catch (e) {
			this.log(e);
		}
	}
	
	//	����ͼ��
	var ico = this.wrapper.getIntro().icon;
	if (ico && ico.length > 0) {
		this.setIco(ico);
	}
}

/**
 * ��ʼ����׺����
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
	//	ȷ���û�û���ظ�����
	var config = UWA.Config,
			attr = 'data-share2';
	if (ele.getAttribute(attr)) return;
	
	//	����������ݣ���������Ӧ����
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
 * �����Widget�����ӵ�ַ
 */
UWA.Module.prototype._shareMePath = function() {
	return 'url=' + encodeURIComponent(this.data.path);
}
/**
 * �����Widget�����ӵ�ַ��Ĭ��״���·���false����ʾ���ܷ���ֻ�����ܹ������״̬�²Ż��滻�������_shareMePath����
 */
UWA.Module.prototype.shareMePath = function() {
	return false;
}

/**
 * ���ñ���
 **/
UWA.Module.prototype.onSetTitle = function(title) {
	if (typeof(title) == "string" && title.length > 0) {
		if (title.length > 8) {
			var PatSWord=/^[\x00-\xff]+$/;	//	�����ַ�
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
 * ��ʼ��widget�������ò���
 **/
UWA.Module.prototype.initRef = function() {
	this.ref = this.wrapper.getPreferences();
}

/**
 * �û�׼����������ʱ�������¼�
 **/
UWA.Module.prototype.onSubmit = function() {
	if (!this.isNormal() && !this.isSetTest()) {
		//	������ڲ���ģʽ�±�����Ե�ַ
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
		//	�����������ģʽ���߲���ģʽ�±�����������ֵ
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

/*---------------------  ���Ÿ�UWA�ķ���  ---------------------*/

/**
 * �����Զ�ˢ��ʱ��
 * @param {Number} delay ˢ�¼��������Ϊ��λ
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
 * ȡ��ĳ�������������ֵ
 * @param {String} name ���������������
 * @return �����������ֵ
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
		var e = new ReferenceError('����������������"' + name + '"');
		this.log(e);
	}
}

/**
 * ����ĳ�������������ֵ
 * @param {String} name ���������������
 * @param {String} value �����������ֵ
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
		var e = new ReferenceError('����������������"' + name + '"');
		this.log(e);
	}
}

UWA.Module.prototype.setRefNow = function() {
	this.save(this.data);
	this.refTimer = null;
}

/**
 * �����̨�н�����־��¼
 * @param {Object} obj ��¼��
 **/
UWA.Module.prototype.log = function(obj) {
	if (this.wrapper.getIntro().debugMode) {
		UWA.log(obj);
	}
}

/*---------------------  App Widget Ҫ��ķ���  ---------------------*/

/**
 * ��ʼ��������Required by App��
 **/
UWA.Module.prototype.initialize = function() {
	/*
	if (this.data == null || (typeof(this.data) == "string" && this.data == "")) {
		this.data = {path: UWA.Config.defaultWidget};
	}
	*/
	
	/*	��ʱ
	if (typeof(this.data) == "string") {
		this.data = eval("(" + this.data + ")");
	}
	*/
	
	this.contentEle.innerHTML = '���ڼ���...';
	
	if (this.isNormal()) {
		//	����ģʽ
		//	���� UWA Widget
		UWA.WidgetLib.getWidget(this.data.path, this.gettedWrapper.bind(this), true);
	} else {
		this.isPrivate = true;
		//	����ģʽ
		if (this.isSetTest()) {
			//	�Ѿ������˲��Ե�ַ
			
			UWA.WidgetLib.getWidget(this.data.testpath, this.gettedWrapper.bind(this), false);
		} else {
			//	δ���ò��Ե�ַ
			var scriptStr = '' +
				'widget.onLoad = function() {' +
					'widget.setBody("��ģ�������������һ����׼��Sohu Open Widget��<br />������ģ�����Ͻǵġ����á���������Ҫ���Ե�Widget��ַ��");' +
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
						label: "��ַ",
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
 * ����ģ��
 **/
UWA.Module.prototype.destroy = function() {
	//	����ô���û�б�������ݣ��Ǿ����ϱ���
	if (this.refTimer) this.setRefNow();
	
	//	���ˢ�¶�ʱ��
	this.clearTimer();
	
	//	�����������
	this.widget = null;
	this.wrapper = null;
	this.body = null;
	this.ref = null;
	this.contentEle.innerHTML = "";
}

/**
 * ˢ��ģ��
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
 * ����Ұ�ť��ʵ�ַ���
 **/
UWA.Module.prototype.addMe = function() {
	if (this.isNormal()) {
		window.open('http://blog.sohu.com/manage/module.do?m=preview&url=' + encodeURIComponent(this.data.path));
		return true;
	}
	return false;
}

/**
 * ��ʾ�༭ģ��
 **/
UWA.Module.prototype._edit = function() {
	this.isEditing = true;
	if (this.widget) {
		if (!this.refForm) {
			//	���༭����
			var str = '<form onsubmit="return false"><table border="0" cellpadding="2" cellspacing="0">';
			
			var rowIndex = -1;
			if (!this.isNormal()) {
				str += '<tr><td width="45px">&nbsp;</td><td>��ģ��Ϊ"����ģ��"</td></tr>';
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
				this.editEle.innerHTML = '<table border="0" cellpadding="2" cellspacing="0"><tr><td width="45px">&nbsp;</td><td>��ģ��Ϊ"����ģ��"</td></tr><tr><td width="45px">&nbsp;</td><td>��ģ��û�п�������</td></tr></table>';
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
		this.editEle.innerHTML = '������ɲ���ʹ�ô˹���';
	}
}

/*---------------------  ��App ��ע��  ---------------------*/
var uwa_widget = UWA.Module;

registerWidget("uwa_widget");