/**
 * �Ѻ�Сֽ���Ĳ�����
 */

var webim_config = {
	product: "sohu/blog",
	cm_menu_width: "90",
	cm_GenMenu: function(candleman, menu){
		for (var i = menu.length-1; i >= 0; i--) {
			if (menu[i].n == "��ֽ��") {
				menu[i].n = "����Сֽ��";
				menu[i].t = "�� $NICK ��Сֽ��";
			}
			if (menu[i].n == "��Ϊ����") {
				menu[i].n = "��ΪСֽ������";
				menu[i].t = "�� $NICK ΪСֽ������";
			}
		}
	},
	cm_menu: [
		{
			id: "poke", 
			n: "�������к�",
			t: "�������к�",
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