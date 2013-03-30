/*******************************************************************************************************
 * UWA Tester
 ******************************************************************************************************/
 
/**
 * UWA Tester，继承自UWA Module，专门用于测试一个UWA Widget
 * @class UWA Tester
 * @param {Object} m_data 这是App Module传送给UWA Module的有关这个Widget的数据，其结构为：
 * 		{
 *			path: '',
 *			data: {
 *				//	UWA Widget本身所需要的数据
 * 			}
 * 		}
 **/ 
UWA.Tester = function(m_data, m_content, m_edit, w_path) {
	this.initVars(m_data, m_content, m_edit);
}

/**
 * 从Module类继承
 **/
UWA.Tester.prototype = new UWA.Module();

/**
 * 初始化基本的变量
 **/
UWA.Tester.prototype.initVars = function(m_data, m_content, m_edit) {
	UWA.Module.prototype.initVars.apply(this, arguments);
	
	//	覆盖基类中的变量
	this.moduleCache = false;	//	是否从缓存中取，在本模块中都默认为False
	this.isPrivate = true;		//	是一个私有模块
	
	//	本类中新加的变量
	this.widget = null; 		//	此模块中的uwa widget对象
}

/**
 * 判断是否还没有设置要测试的内容
 **/
UWA.Tester.prototype.isSet = function() {
	return this.data && this.data.path && (this.data.path.length > 0); 
}

UWA.Tester.prototype.initialize = function() {
	if (this.isSet()) {
		//	请求 UWA Widget
		UWA.Module.prototype.initialize.call(this);
		//	this.onSubmit = UWA.Module.prototype.onSubmit.bind(this);
		//	UWA.WidgetLib.getWidget(this.data.path, this.gettedWrapper.bind(this));
	} else {
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
					name: "path"
				}
			],
			
			body: ""
		}
		var wrapper = UWA.WidgetWrapper.getFromObj(obj);
		this.gettedWrapper(wrapper);
	}
}

/**
 * 用户准备保存设置时触发的事件
 **/
UWA.Tester.prototype.onSubmit = function() {
	if (!this.isSet()) {
		var path = this.getRef("path");
		if (typeof(path) == "string" && path.length > 0 && path.trim().length > 0) {
			var data = {path: path.trim()};
			this.endSave = function() {
				this.data = data;
				this.testerRefresh();
				this.endSave = null;
			}
			this.save(data);
		}
	} else {
		UWA.Module.prototype.onSubmit.call(this);
	}
	return false;
}

/**
 * 用户准备保存设置时触发的事件
 **/
UWA.Tester.prototype.testerRefresh = function() {
	if (this.isSet()) {
		UWA.Module.prototype.initialize.call(this);
	}
}

/*---------------------  在App 中注册  ---------------------*/
var uwa_tester = UWA.Tester;

registerWidget("uwa_tester");