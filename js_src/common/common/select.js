/**
 * Class Select is a wrapper of select element
 * @author Jady
 * 
 * @base prototype(1.6)
 **/

var Select = Class.create();
Select.prototype = {
	
	/**
	 * 构造函数
	 * @param {Element} ele select element对象（必填项）
	 */
	initialize: function(ele) {
		this.ele = $(ele);
	},
	
	/**
	 * 清除所有选项
	 * @type Select
	 * @return 当前的Select对象
	 */
	clear: function() {
		this.ele.options.length = 0;
		return this;
	},
	
	/**
	 * 把一个对象中的所有字符串属性项添加到当前select中
	 * @param {Object} obj 要添加的属性对象（必填项）
	 * @type Select
	 * @return 当前的Select对象
	 */
	addObj: function(obj) {
		var el = this.ele;
		for (var i in obj) {
			if (typeof(obj[i]) == "string") {
				el.options[el.options.length] = new Option(obj[i], i);
			}
		}
		return this;
	},
	
	/**
	 * 添加一个区段
	 * @param {Number} from 开始值（必填项）
	 * @param {Number} to 结束值（必填项）
	 * @param {Number} step 变化量（可选项），默认为1，系统会自动根据from和to的大小，来决定step为正值或者负值
	 * @type Select
	 * @return 当前的Select对象
	 */
	addRange: function(from, to, step) {
		var el = this.ele;
		
		// 设置step的值
		step = (typeof(step) == "number" && step != 0) ? Math.abs(step) : 1;
		if (from < to) {
			for (var i=from; i<=to; i+=step) {
				el.options[el.options.length] = new Option(i, i);
			}
		} else {
			for (var i=from; i>=to; i-=step) {
				el.options[el.options.length] = new Option(i, i);
			}
		}
		return this;
	},
	
	/**
	 * 获取或者设置select的值
	 * @param {StringOrNumber} val select的值，如果存在那就是设置值，如果不存在那就是想取得值。
	 * 		如果是准备设置值，只接受字符串类型和数字型。如果为字符串的值，那就表示select的值就是这个。如果为数字值，那就表示默认选中第几个。如果类型不对等，那就设置为第一个。
	 * @type SelectOrString
	 * @return 如果是设置select的值，那就返回当前的Select对象。如果是获取select的值，那就直接返回字符串型的值。
	 */
	value: function(val) {
		var el = this.ele;
		switch (typeof(val)) {
			case "string":
				el.value = val;
				break;
			case "number":
				el.selectedIndex = (val > el.options.length ? 0 : val);
				break;
			case "undefined":
				return el.value;
				break;
			default:
				el.selectedIndex = 0;
				break;
		}
		return this;
	},
	
	/**
	 * 获取或者设置select的值
	 * @param {StringOrNumber} val select的值，如果存在那就是设置值，如果不存在那就是想取得值。
	 * 		如果是准备设置值，只接受字符串类型和数字型。如果为字符串的值，那就表示select的值就是这个。如果为数字值，那就表示默认选中第几个。如果类型不对等，那就设置为第一个。
	 * @type SelectOrString
	 * @return 如果是设置select的值，那就返回当前的Select对象。如果是获取select的值，那就直接返回字符串型的值。
	 */
	disable: function(val) {
		if (typeof(val) == "boolean") {
			this.ele.disabled = val;
		}
		return this;
	},
	
	/**
	 * 释放方法，用于释放掉当前的相关资源
	 */
	destroy: function() {
		this.ele = null;
	}
}