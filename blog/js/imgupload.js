/***
 *	���ļ������ṩͼƬ���ϴ���ַ�Ĺ���
 *	
 *	@author jadyyang@tom.com
 *	@update 2007-3-15
 **/

//	���䷽��
var imgSvrAllot = [
	["44", 3],
	["45", 3],
	["64", 1],
	["114", 1]
];

//	��ַ����
imgSvrAllot.type = {
	local:		"blog.do",			//	����
	avatar:		"blogo.do",			//	ͷ��
	toolbar:	"blog/tbUpload.do"	//	��ַ��
};

//	���ȡ��һ����ַ
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