
$.Event = {
	
	on: function(el, name, func) {
		if (el.addEventListener) {
			el.addEventListener(name, func, false);
		} else {
			el.attachEvent('on' + name, func);
		}
	},
	
	un: function(el, name, func) {
		if (el.removeEventListener) {
			el.removeEventListener(name, func, false);
		} else {
			el.detachEvent('on' + name, func);
		}
	},
	
	stop: function(e) {
		e.preventDefault();
		e.stopPropagation();
	}
	
}