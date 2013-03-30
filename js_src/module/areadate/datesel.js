/**
 * �й����ڵļ���ѡ����
 * @author Jady
 * 
 * @base element.Select prototype
 **/

var DateSel = Class.create();
DateSel.prototype = {
	
	/**
	 * �����ڼ���ѡ����
	 * @param {Object} year ����������ݣ����������Ϊһ���������а��������������ԣ�
	 * 		ele{Eelment}: select���󣨱����
	 * 		opt{Object}: Ĭ��ѡ���ѡ�����Ҳ��һ�����󣬶����ÿ�����Զ�Ϊһ��ѡ����û�еĻ����Ͳ���Ĭ��ѡ��
	 * 		from{Number}: ��ʼ��ݣ���ѡ���Ĭ��Ϊ1900
	 * 		to{Number}: ������ݣ���ѡ���Ĭ��Ϊ��ǰ�����2008�����ֵ
	 * 		val: Ĭ��ֵ����ѡ������Ϊ�ַ�����ֵ���Ǿ�����Ϊ���ֵ�����Ϊ����ֵ���Ǿͱ�ʾĬ��ѡ��Ϊ��һ����û��д���Ǿ�Ĭ��ѡ�е�һ��
	 * @param {Object} month �µ��������ݣ����������Ϊһ���������а��������������ԣ�
	 * 		ele{Eelment}: select���󣨱����
	 * 		opt{Object}: Ĭ��ѡ���ѡ�����Ҳ��һ�����󣬶����ÿ�����Զ�Ϊһ��ѡ����û�еĻ����Ͳ���Ĭ��ѡ��
	 * 		val: Ĭ��ֵ����ѡ������Ϊ�ַ�����ֵ���Ǿ�����Ϊ���ֵ�����Ϊ����ֵ���Ǿͱ�ʾĬ��ѡ��Ϊ��һ����û��д���Ǿ�Ĭ��ѡ�е�һ��
	 * @param {Object} date �յ��������ݣ����������Ϊһ���������а��������������ԣ�
	 * 		ele{Eelment}: select���󣨱����
	 * 		opt{Object}: Ĭ��ѡ���ѡ�����Ҳ��һ�����󣬶����ÿ�����Զ�Ϊһ��ѡ����û�еĻ����Ͳ���Ĭ��ѡ��
	 * 		val: Ĭ��ֵ����ѡ������Ϊ�ַ�����ֵ���Ǿ�����Ϊ���ֵ�����Ϊ����ֵ���Ǿͱ�ʾĬ��ѡ��Ϊ��һ����û��д���Ǿ�Ĭ��ѡ�е�һ��
	 */
	initialize: function(year, month, date) {
		//	ȡ�û�������
		this.year = year, this.month = month, this.date = date;
		this.yearSel = new Select(year.ele);
		this.monthSel = new Select(month.ele);
		this.dateSel = new Select(date.ele);
		
		//	��ʼ������
		this.bindYear();
		this.bindMonth();
		this.onChangeMonth();
		this.dateSel.value(date.val);
		
		//	�����¼�
		Event.observe(year.ele, "change", this.onChangeYear.bind(this));
		Event.observe(month.ele, "change", this.onChangeMonth.bind(this));
	},
	
	/**
	 * �����ѡ����
	 */
	bindYear: function() {
		var year = this.year;
		var from = typeof(year.from) == "number" ? year.from : (new Date()).getFullYear();
		var to = typeof(year.to) == "number" ? year.to : 1900;
		this.yearSel.clear()
			.addObj(year.opt || {"0": "ѡ����"})
			.addRange(from, to)
			.value(year.val);
	},
	
	/**
	 * ���·�ѡ����
	 */
	bindMonth: function() {
		var month = this.month;
		this.monthSel.clear()
			.addObj(month.opt || {"0": "ѡ����"})
			.addRange(1, 12)
			.value(month.val);
	},
	
	/**
	 * ����ݱ��ʱ���õķ����������������б�
	 */
	onChangeYear: function() {
		this.monthSel.value(0);
		this.onChangeMonth();
	},
	
	/**
	 * ���·ݱ��ʱ���õķ����������������б�
	 */
	onChangeMonth: function() {
		//	��ӻ�����
		this.dateSel.clear()
			.addObj(this.date.opt || {"0": "ѡ����"});
		
		//	ȡ���·ݵ�ֵ
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
 * @param {Object} year ����������ݣ����������Ϊһ���������а��������������ԣ�
 * 		ele{Eelment}: select���󣨱����
 * 		opt{Object}: Ĭ��ѡ���ѡ�����Ҳ��һ�����󣬶����ÿ�����Զ�Ϊһ��ѡ����û�еĻ����Ͳ���Ĭ��ѡ��
 * 		from{Number}: ��ʼ��ݣ���ѡ���Ĭ��Ϊ1900
 * 		to{Number}: ������ݣ���ѡ���Ĭ��Ϊ��ǰ�����2008�����ֵ
 * 		val: Ĭ��ֵ����ѡ������Ϊ�ַ�����ֵ���Ǿ�����Ϊ���ֵ�����Ϊ����ֵ���Ǿͱ�ʾĬ��ѡ��Ϊ��һ����û��д���Ǿ�Ĭ��ѡ�е�һ��
 **/
DateSel.bindYear = function(year) {
	var from = typeof(year.from) == "number" ? year.from : (new Date()).getFullYear();
	var to = typeof(year.to) == "number" ? year.to : 1900;
	var yearSel = new Select(year.ele);
	if (yearSel) {
		yearSel.clear()
			.addObj(year.opt || {"0": "ѡ����"})
			.addRange(from, to)
			.value(year.val);
	}
}

/**
 * @param {Object} month �µ��������ݣ����������Ϊһ���������а��������������ԣ�
 * 		ele{Eelment}: select���󣨱����
 * 		opt{Object}: Ĭ��ѡ���ѡ�����Ҳ��һ�����󣬶����ÿ�����Զ�Ϊһ��ѡ����û�еĻ����Ͳ���Ĭ��ѡ��
 * 		val: Ĭ��ֵ����ѡ������Ϊ�ַ�����ֵ���Ǿ�����Ϊ���ֵ�����Ϊ����ֵ���Ǿͱ�ʾĬ��ѡ��Ϊ��һ����û��д���Ǿ�Ĭ��ѡ�е�һ��
 **/
DateSel.bindMonth = function(month) {
	var monthSel = new Select(month.ele);
	if (monthSel) {
		monthSel.clear()
			.addObj(month.opt || {"0": "ѡ����"})
			.addRange(1, 12)
			.value(month.val);
	}
}