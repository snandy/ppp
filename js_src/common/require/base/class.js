
$.Class = {
	
	/*
	 * ����һ������
	 */
	create: function() {
		return function() {
			this.initialize.apply(this, arguments);
		}
	}
	
}