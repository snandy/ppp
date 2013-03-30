
$.Object = {
	
	extend: function(target, src) {
		for (var it in src) {
			target[it] = src[it];
		}
	}
	
}