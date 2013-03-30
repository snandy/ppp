
$.Class = {
	
	/*
	 * 创建一个新类
	 */
	create: function() {
		return function() {
			this.initialize.apply(this, arguments);
		}
	}
	
}