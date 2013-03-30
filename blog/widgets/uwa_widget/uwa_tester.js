/*******************************************************************************************************
 * UWA Tester
 ******************************************************************************************************/
 
/**
 * UWA Tester���̳���UWA Module��ר�����ڲ���һ��UWA Widget
 * @class UWA Tester
 * @param {Object} m_data ����App Module���͸�UWA Module���й����Widget�����ݣ���ṹΪ��
 * 		{
 *			path: '',
 *			data: {
 *				//	UWA Widget��������Ҫ������
 * 			}
 * 		}
 **/ 
UWA.Tester = function(m_data, m_content, m_edit, w_path) {
	this.initVars(m_data, m_content, m_edit);
}

/**
 * ��Module��̳�
 **/
UWA.Tester.prototype = new UWA.Module();

/**
 * ��ʼ�������ı���
 **/
UWA.Tester.prototype.initVars = function(m_data, m_content, m_edit) {
	UWA.Module.prototype.initVars.apply(this, arguments);
	
	//	���ǻ����еı���
	this.moduleCache = false;	//	�Ƿ�ӻ�����ȡ���ڱ�ģ���ж�Ĭ��ΪFalse
	this.isPrivate = true;		//	��һ��˽��ģ��
	
	//	�������¼ӵı���
	this.widget = null; 		//	��ģ���е�uwa widget����
}

/**
 * �ж��Ƿ�û������Ҫ���Ե�����
 **/
UWA.Tester.prototype.isSet = function() {
	return this.data && this.data.path && (this.data.path.length > 0); 
}

UWA.Tester.prototype.initialize = function() {
	if (this.isSet()) {
		//	���� UWA Widget
		UWA.Module.prototype.initialize.call(this);
		//	this.onSubmit = UWA.Module.prototype.onSubmit.bind(this);
		//	UWA.WidgetLib.getWidget(this.data.path, this.gettedWrapper.bind(this));
	} else {
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
 * �û�׼����������ʱ�������¼�
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
 * �û�׼����������ʱ�������¼�
 **/
UWA.Tester.prototype.testerRefresh = function() {
	if (this.isSet()) {
		UWA.Module.prototype.initialize.call(this);
	}
}

/*---------------------  ��App ��ע��  ---------------------*/
var uwa_tester = UWA.Tester;

registerWidget("uwa_tester");