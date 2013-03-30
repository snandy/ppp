/**
 * @fileoverview UWA Object
 * 
 * @author Jady Yang (jadyyang@sohu.com)
 * @version 1.0
 **/

var UWA = {};


/*
var UWA = {};

UWA.Widget = function(bodyVar) {
	this.body = bodyVar;
	
	this.settings = {};
} 
UWA.Widget.prototype.onLoad = function() {
}
UWA.Widget.prototype.onRefresh = function() {
}

UWA.Widget.prototype.setBody = function(str) {
	this.body.innerHTML = str;
}
UWA.Widget.prototype.getValue = function(name) {
	return this.settings[name];
}

UWA.WidgetModule = function(xml) {

	this._from = "";
	this._xml = null;
	
	this._intro = null;
	this._preferences = null;
	this._preferencesDom = null;
	this._script = null;
	this._style = null;
	this._body = null;
	
}

UWA.WidgetModule.prototype.setFromXml = function(xmlDoc) {
	this._from = "xml";
	this._xml = xmlDoc;
}

UWA.WidgetModule.prototype.getBaseInfo = function() {
	if (this._intro == null) {
		this._intro = {};
		if (this._from == "xml") {
			var htmlChilds = this._xml.documentElement.childNodes;
			for (var j=0; j<htmlChilds.length; j++) {
				if (htmlChilds[j].nodeName) {
					switch (htmlChilds[j].nodeName.toLowerCase()) {
						case "head":
							var headChilds = htmlChilds[j].childNodes;
							for (var i=0; i<headChilds.length; i++) {
								if (headChilds[i].nodeName) {
									switch (headChilds[i].nodeName.toLowerCase()) {
										case "title":
											this._intro.title = headChilds[i].childNodes[0].data;
											break;
										case "meta":
											this._intro[headChilds[i].getAttribute("name")] = headChilds[i].getAttribute("content");
											break;
										case "widget:preferences":
											this._preferencesDom = headChilds[i];
											break;
										case "script":
											this._script = headChilds[i].childNodes[0].data;
											break;
										case "style":
											this._style = headChilds[i].childNodes[0].data;
											break;
									}
								}
							}
							break;
						case "body":
							this._body = htmlChilds[j].childNodes[0].data;
							break;
					}
				}
			}
		}
	}
}

UWA.WidgetModule.prototype.getIntro = function() {
	this.getBaseInfo();
	return this._intro;
}

UWA.WidgetModule.prototype.getReferences = function() {
	this.getBaseInfo();
	
	if (this._preferences == null) {
		this._preferences = [];
		var references = this._preferencesDom.childNodes;
		for (var i=0; i<references.length; i++) {
			var refNow = references[i];
			if (refNow.nodeName && refNow.nodeName.toLowerCase() == "preference") {
				this._preferences.push({
					type: refNow.getAttribute("type"),
					name: refNow.getAttribute("name"),
					label: refNow.getAttribute("label"),
					defaultValue: refNow.getAttribute("defaultValue")
				});
			}
		}
	}
	
	return this._preferences;
}

UWA.WidgetModule.prototype.getStyle = function() {
	this.getBaseInfo();
	return this._style;
}

UWA.WidgetModule.prototype.getScript = function() {
	this.getBaseInfo();
	return this._script;
}

UWA.WidgetModule.prototype.getBody = function() {
	this.getBaseInfo();
	return this._body;
}

UWA.getWidgetFromXml = function(url, callback) {
	new Ajax.Request(url, {
		onSuccess: UWA.parseWidgetFromXml.bind(null, callback)
	});
}
UWA.parseWidgetFromXml = function(callback, transport) {
	var widgetModule = new UWA.WidgetModule();
	widgetModule.setFromXml(transport.responseXML);
	callback(widgetModule);
}

var ow_test = function(m_data, m_content, m_edit, w_path){
	
	var widgetUrl = "http://blog.sohu.com/ppp/blog/widgets/ow_test/test.xhtml";
	
	var widget = new UWA.Widget(m_content);
	var widgetModule = null;
	
	var setInputs = {};
	
	this.showBaseInfo = function(widgetModuleVar) {
		widgetModule = widgetModuleVar;
		this.setTitle(widgetModule.getIntro().title);
		m_content.innerHTML = widgetModule.getBody();
		eval(widgetModule.getScript());
		widget.onLoad();
	}
	
	this.showEdit = function() {
		m_edit.innerHTML = "";
		editEle = document.createElement("div");
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0">';
		var refers = widgetModule.getReferences();
		for (var i=0; i<refers.length; i++) {
			str += '' +
				'<tr>' +
					'<td width="60px">'+ refers[i].label +': </td>';
			
			switch (refers[i].type) {
				case "text":
					str += '' + 
					'<td><input type="text" name="' + refers[i].name + '" value="' + refers[i].defaultValue + '" /></td>';
					break;
			}
			
			str += '' +
				'</tr>';
		}
		str += '<tr><td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		m_edit.innerHTML = str;
		
		for (var i=0; i<refers.length; i++) {
			setInputs[refers[i].name] = m_edit.firstChild.rows[i].cells[1].firstChild;
			widget.settings[refers[i].name] = refers[i].defaultValue;
		}
		
		Event.observe(m_edit.firstChild.rows[refers.length].cells[1].firstChild, 'click', this.closeEdit.bind(this));
	}
	this.closeEdit = function() {
		for (var item in setInputs) {
			if (typeof(widget.settings[item]) == "undefined") {
				widget.settings[item] = setInputs[item].value;
			}
		}
		this.save(widget.settings);
		widget.onRefresh();
	}
	
	this.initialize = function() {
		UWA.getWidgetFromXml(widgetUrl, this.showBaseInfo.bind(this));
	}
	this.destroy = function() {
		m_content.innerHTML = "";
	}
	this.refresh = function() {
		widget.onRefresh();
	}
	this.edit = function() {
		this.showEdit();
	}
};
registerWidget("ow_test");
*/