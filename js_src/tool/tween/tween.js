/**
 * 震荡动画类
 * @author Jady
 * 
 * @base prototype
 **/

var Tween = Class.create();

Tween.prototype = {
	
	/**
	 * @Param {Object} options 配置项
	 * 		property: 属性（可以用.间隔）
	 *		values: 属性值列表
	 *		time: 事件间隔
	 *		count: 晃动次数
	 **/ 
	initialize: function(options) {
		this.setOptions(options);
		
		this.timer = null;
		this.displayNo = 0;
	},
	
	setOptions: function(options) {
		this.options = Object.extend({
				count: 10,
				time: 500
			}, options || {});
	},
	
	start: function(element) {
		this.element = $(element);
		this.clearTimer();
		this.displayNo = 0;
		
		this.timer = window.setInterval(this.display.bind(this), this.options.time);
	},
	
	stop: function() {
		this.clearTimer();
		this.element = null;
	},
	
	display: function() {
		if (this.element) {
			var options = this.options;
			var arrs = options.property.split(".");
			var property = this.element;
			for (var i=0; i<arrs.length-1; i++) {
				property = property[arrs[i]];
			}
			property[arrs[arrs.length - 1]] = options.values[this.displayNo % options.values.length];
			
			if (++this.displayNo >= options.count) this.stop();
		} else {
			this.stop();
		}
	},
	
	clearTimer: function() {
		if (this.timer) {
			window.clearInterval(this.timer);
			this.timer = null;
		}
	}
}

Tween.twinkle = function(element, options) {
	var tween = new Tween(options || {property: "style.backgroundColor", values: ['#FFFFE1', ''], time: 400, count: 4});
	tween.start(element);
}