/*******************************************************************************************************
 * UWA Widget Lib Out plugin �ṩ�����������õ�lib���
 ******************************************************************************************************/

function loadWidgetBaseInfo() {
	var xmlDoc = UWA.WidgetWrapper.getFromXml({documentElement: document});
	xmlDoc.parseBaseInfo();
	UWA.WidgetLib.libs[0] = {
		path: UWA.Config.defaultWidget,
		status: 1,
		wrapper: xmlDoc,
		callback: []
	}
}