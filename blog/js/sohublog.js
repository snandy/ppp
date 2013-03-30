/**
 * by snandy 2012-11-07 
 * 1 加统计API: mysohu.put_log 与isohu相同 
 * 
 *  
 */
if (!window.console) {
	window.console = {}
	console.log = function() {}
}

var mysohu = {
	put_log: function(msg) {
		console.log(msg + ' clicked')
		var img = new Image
		img.src = 'http://cc.i.sohu.com/pv.gif?' + msg + '&ts=' + +new Date
	}
}

function lsl() {
	if (typeof sl == 'undefined' || typeof sp == 'undefined' || !sl || !sp) return
	if (typeof SP != 'undefined' && SP) return
	var ss = document.getElementsByTagName('script')
	for (var i=0; i<sl.length; i++) {
		var _sl = sl[i], _f = false
		for (var j=0; j<ss.length; j++) {
			var _s = ss[j].getAttribute('src')
			if (_s && _s.indexOf(_sl)>=0) {
				_f = true
				break
			}
		}
		if (!_f) {
			if (_sl.indexOf('/')>=0) {
				document.write('<scr'+'ipt type="text/javascript" src="'+ _sl +'"></scr'+'ipt>')
			}
			else {
				document.write('<scr'+'ipt type="text/javascript" src="'+ sp + _sl +'.js"></scr'+'ipt>')
			}
		}
	}
}
lsl()

