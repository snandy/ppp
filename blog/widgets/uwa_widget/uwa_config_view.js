/*******************************************************************************************************
 * UWA Config For View
 ******************************************************************************************************/

function isMyBlog() {
	return true;
}

function loadUwaWidget(url, element) {
	UWA.Config.defaultWidget = url;
	UWA.Config.container = typeof(element) == "string" ? document.getElementById(element) : element;

	//	loadWidgetBaseInfo();
	var uwa_widget = {
		title:  	'uwa widget',
		desc:   	'uwa widget',
		author: 	'Jady',
		ico:    	'http://ow.blog.sohu.com/styles/images/icon_def.gif',
		site:   	'http://jadyyang.blog.sohu.com',
		
		data: 		{path: UWA.Config.defaultWidget},
		placeIn: 	UWA.Config.container,

		type:   	'uwa_widget',
		path:   	'uwa_widget/',
		sys:		false,
		gal:		'base'
	}
	new App.Module(uwa_widget);
}