
/**
 * 取得对象
 * @param exp 对象表达式，接受这三种类型的参数
 * 		1. String类型的对象选择表达式
 * 		2. 原生对象
 * 		3. 已经封装过的对象
 */
var $ = function(exp) {
	
	//	如果表达式为字符串，那就先找到原生对象
	if (typeof(exp) == 'string') {
		switch (exp.charAt(0)) {
			case '#':		//	表示是通过id取值
				exp = document.getElementById(exp.substr(1));
				break;
		}
	}
	
	//	判断对象是否被包装过，如果包装过，那就返回当前的这个对象，如果没有那就返回被包装过的对象（这里只可能是IE浏览器下的原生对象）
	return exp.attr ? exp : $.Element.pack(exp);
}