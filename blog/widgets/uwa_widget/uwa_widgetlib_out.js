/*******************************************************************************************************
 * UWA Widget Lib Out plugin �ṩ�����������õ�lib���
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