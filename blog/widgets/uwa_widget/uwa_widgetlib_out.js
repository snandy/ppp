/*******************************************************************************************************
 * UWA Widget Lib Out plugin 提供给外链测试用的lib插件
 ******************************************************************************************************/

function loadWidgetBaseInfo() {
	var xmlDoc = UWA.WidgetWrapper.getFromThis();
	xmlDoc.parseBaseInfo();
	UWA.WidgetLib.libs[0] = {
		path: UWA.Config.defaultWidget,
		status: 1,
		wrapper: xmlDoc,
		callback: []
	}
	document.body.innerHTML = "";
}