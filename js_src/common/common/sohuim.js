/**
 * 搜狐小纸条的操作类
 */

var webim_config = {
	product: "sohu/blog",
	cm_menu_width: "90",
	cm_GenMenu: function(candleman, menu){
		for (var i = menu.length-1; i >= 0; i--) {
			if (menu[i].n == "传纸条") {
				menu[i].n = "发送小纸条";
				menu[i].t = "给 $NICK 传小纸条";
			}
			if (menu[i].n == "加为好友") {
				menu[i].n = "加为小纸条好友";
				menu[i].t = "加 $NICK 为小纸条好友";
			}
		}
	},
	cm_menu: [
		{
			id: "poke", 
			n: "向他打招呼",
			t: "向他打招呼",
			c: function(cm) {
				if (typeof(pokeHe) == 'function') pokeHe(cm._id);
				else window.open('http://poke.blog.sohu.com/pop/poking.do?actId=1&pp='+cm._id, '_blank', 'width=630,height=470');
			}
		}
	]
};
var SohuIM = {
	setCandleMenParam: function() {
		var elm_cm = document.getElementsByName('onlineIcon');
		if (elm_cm && elm_cm.length > 0) {
			$A(elm_cm).each(function(e) {
				if ((e.getAttribute('param') || e.param) && (!e.rel || e.rel == '')) {
					var _params = (e.getAttribute('param') || e.param).split(';');
					_params[0] = b64_decodex(_params[0]);
					e.rel = _params.join(';');
				}
			});
		}
	}
};