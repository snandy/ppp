/***
 *	此文件负责提供图片的上传地址的功能
 *	
 *	@author jadyyang@tom.com
 *	@update 2007-3-15
 **/

//	分配方案
var imgSvrAllot = [
	["44", 3],
	["45", 3],
	["64", 1],
	["114", 1]
];

//	地址方案
imgSvrAllot.type = {
	local:		"blog.do",			//	本地
	avatar:		"blogo.do",			//	头像
	toolbar:	"blog/tbUpload.do"	//	地址栏
};

//	随机取得一个地址
imgSvrAllot.getUrl = function (type) {
	var arrs = [];
	var k = 0;
	for (var i=0; i<this.length; i++) {
		for (var j=0; j<this[i][1]; j++) {
			arrs[k++] = this[i][0];
		}
	}
	
	var id = arrs[Math.floor(Math.random() * k)];
	var url = "http://photo" + id + ".pp.sohu.com/" + imgSvrAllot.type[type];
	return url;
};