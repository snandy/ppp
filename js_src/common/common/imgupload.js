/*
	ͼƬ�ϴ���ַ
*/
var imgSvrAllot = {
	type: {
		local:		"blog.do",			//	����
		avatar:		"blogo.do",			//	ͷ��
		toolbar:	"blog/tbUpload.do",	//	��ַ��
		customTheme:	"blogbkUpload.do"
	},
	
	getUrl: function(type){
		var url = "http://upload.pp.sohu.com/" + imgSvrAllot.type[type];
		return url;
	}
}