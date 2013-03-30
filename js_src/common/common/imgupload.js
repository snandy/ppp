/*
	图片上传地址
*/
var imgSvrAllot = {
	type: {
		local:		"blog.do",			//	本地
		avatar:		"blogo.do",			//	头像
		toolbar:	"blog/tbUpload.do",	//	地址栏
		customTheme:	"blogbkUpload.do"
	},
	
	getUrl: function(type){
		var url = "http://upload.pp.sohu.com/" + imgSvrAllot.type[type];
		return url;
	}
}