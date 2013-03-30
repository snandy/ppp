/*******************************************************************************************************
 * UWA Config For View
 ******************************************************************************************************/

var widget = {};
function documentOnReady() {
	UWA.Config.defaultWidget = "this";
	UWA.Config.container = document.body;
	UWA.Config.ajax = "";
	UWA.Config.moduler = "";
	
	loadWidgetBaseInfo();
	
	var uwa_widget = {
		title:  	'uwa widget',
		desc:   	'uwa widget',
		author: 	'Jady',
		site:   	'http://testgood.blog.sohu.com',
		
		data: 		{path: UWA.Config.defaultWidget},
		placeIn: 	$(UWA.Config.container),

		type:   	'uwa_widget',
		path:   	'uwa_widget/',
		sys:		false,
		gal:		'base'
	}
	new App.Module(uwa_widget);
}
window.onload = documentOnReady;