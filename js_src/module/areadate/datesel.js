/**
 * 有关日期的级联选择器
 * @author Jady
 * 
 * @base element.Select prototype
 **/

var DateSel = Class.create();
DateSel.prototype = {
	
	/**
	 * 绑定日期级联选择器
	 * @param {Object} year 年的设置数据（必填项），其为一个对象，其中包括如下配置属性：
	 * 		ele{Eelment}: select对象（必填项）
	 * 		opt{Object}: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
	 * 		from{Number}: 起始年份（可选项），默认为1900
	 * 		to{Number}: 结束年份（可选项），默认为当前年份与2008的最大值
	 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
	 * @param {Object} month 月的设置数据（必填项），其为一个对象，其中包括如下配置属性：
	 * 		ele{Eelment}: select对象（必填项）
	 * 		opt{Object}: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
	 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
	 * @param {Object} date 日的设置数据（必填项），其为一个对象，其中包括如下配置属性：
	 * 		ele{Eelment}: select对象（必填项）
	 * 		opt{Object}: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
	 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
	 */
	initialize: function(year, month, date) {
		//	取得基本变量
		this.year = year, this.month = month, this.date = date;
		this.yearSel = new Select(year.ele);
		this.monthSel = new Select(month.ele);
		this.dateSel = new Select(date.ele);
		
		//	初始化日期
		this.bindYear();
		this.bindMonth();
		this.onChangeMonth();
		this.dateSel.value(date.val);
		
		//	建立事件
		Event.observe(year.ele, "change", this.onChangeYear.bind(this));
		Event.observe(month.ele, "change", this.onChangeMonth.bind(this));
	},
	
	/**
	 * 绑定年份选择器
	 */
	bindYear: function() {
		var year = this.year;
		var from = typeof(year.from) == "number" ? year.from : (new Date()).getFullYear();
		var to = typeof(year.to) == "number" ? year.to : 1900;
		this.yearSel.clear()
			.addObj(year.opt || {"0": "选择年"})
			.addRange(from, to)
			.value(year.val);
	},
	
	/**
	 * 绑定月份选择器
	 */
	bindMonth: function() {
		var month = this.month;
		this.monthSel.clear()
			.addObj(month.opt || {"0": "选择月"})
			.addRange(1, 12)
			.value(month.val);
	},
	
	/**
	 * 当年份变更时调用的方法，用来更新月列表
	 */
	onChangeYear: function() {
		this.monthSel.value(0);
		this.onChangeMonth();
	},
	
	/**
	 * 当月份变更时调用的方法，用来更新日列表
	 */
	onChangeMonth: function() {
		//	添加基础项
		this.dateSel.clear()
			.addObj(this.date.opt || {"0": "选择日"});
		
		//	取得月份的值
		var monthVal = parseInt(this.monthSel.value());
		monthVal = isNaN(monthVal) ? 0 : monthVal;
		
		if (monthVal >= 1) {
			var to = 1;
			var yearVal = parseInt(this.yearSel.value());
			yearVal = isNaN(yearVal) ? 0 : yearVal;
			if (monthVal == 2) {
				to = (yearVal % 4) == 0 ? 29 : 28; 
			} else {
				if (monthVal <= 7) {
					to = (monthVal % 2) == 1 ? 31 : 30;
				} else {
					to = (monthVal % 2) == 1 ? 30 : 31;
				}
			}
			this.dateSel.addRange(1, to)
				.value(0);
		}
	}
}

/**
 * @param {Object} year 年的设置数据（必填项），其为一个对象，其中包括如下配置属性：
 * 		ele{Eelment}: select对象（必填项）
 * 		opt{Object}: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
 * 		from{Number}: 起始年份（可选项），默认为1900
 * 		to{Number}: 结束年份（可选项），默认为当前年份与2008的最大值
 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
 **/
DateSel.bindYear = function(year) {
	var from = typeof(year.from) == "number" ? year.from : (new Date()).getFullYear();
	var to = typeof(year.to) == "number" ? year.to : 1900;
	var yearSel = new Select(year.ele);
	if (yearSel) {
		yearSel.clear()
			.addObj(year.opt || {"0": "选择年"})
			.addRange(from, to)
			.value(year.val);
	}
}

/**
 * @param {Object} month 月的设置数据（必填项），其为一个对象，其中包括如下配置属性：
 * 		ele{Eelment}: select对象（必填项）
 * 		opt{Object}: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
 **/
DateSel.bindMonth = function(month) {
	var monthSel = new Select(month.ele);
	if (monthSel) {
		monthSel.clear()
			.addObj(month.opt || {"0": "选择月"})
			.addRange(1, 12)
			.value(month.val);
	}
}