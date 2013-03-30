/**
 * Class Select is a wrapper of select element
 * @author Jady
 * 
 * @base prototype(1.6)
 **/

var Select = Class.create();
Select.prototype = {
	
	/**
	 * ���캯��
	 * @param {Element} ele select element���󣨱����
	 */
	initialize: function(ele) {
		this.ele = $(ele);
	},
	
	/**
	 * �������ѡ��
	 * @type Select
	 * @return ��ǰ��Select����
	 */
	clear: function() {
		this.ele.options.length = 0;
		return this;
	},
	
	/**
	 * ��һ�������е������ַ�����������ӵ���ǰselect��
	 * @param {Object} obj Ҫ��ӵ����Զ��󣨱����
	 * @type Select
	 * @return ��ǰ��Select����
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
	 * ���һ������
	 * @param {Number} from ��ʼֵ�������
	 * @param {Number} to ����ֵ�������
	 * @param {Number} step �仯������ѡ���Ĭ��Ϊ1��ϵͳ���Զ�����from��to�Ĵ�С��������stepΪ��ֵ���߸�ֵ
	 * @type Select
	 * @return ��ǰ��Select����
	 */
	addRange: function(from, to, step) {
		var el = this.ele;
		
		// ����step��ֵ
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
	 * ��ȡ��������select��ֵ
	 * @param {StringOrNumber} val select��ֵ����������Ǿ�������ֵ������������Ǿ�����ȡ��ֵ��
	 * 		�����׼������ֵ��ֻ�����ַ������ͺ������͡����Ϊ�ַ�����ֵ���Ǿͱ�ʾselect��ֵ������������Ϊ����ֵ���Ǿͱ�ʾĬ��ѡ�еڼ�����������Ͳ��Եȣ��Ǿ�����Ϊ��һ����
	 * @type SelectOrString
	 * @return ���������select��ֵ���Ǿͷ��ص�ǰ��Select��������ǻ�ȡselect��ֵ���Ǿ�ֱ�ӷ����ַ����͵�ֵ��
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
	 * ��ȡ��������select��ֵ
	 * @param {StringOrNumber} val select��ֵ����������Ǿ�������ֵ������������Ǿ�����ȡ��ֵ��
	 * 		�����׼������ֵ��ֻ�����ַ������ͺ������͡����Ϊ�ַ�����ֵ���Ǿͱ�ʾselect��ֵ������������Ϊ����ֵ���Ǿͱ�ʾĬ��ѡ�еڼ�����������Ͳ��Եȣ��Ǿ�����Ϊ��һ����
	 * @type SelectOrString
	 * @return ���������select��ֵ���Ǿͷ��ص�ǰ��Select��������ǻ�ȡselect��ֵ���Ǿ�ֱ�ӷ����ַ����͵�ֵ��
	 */
	disable: function(val) {
		if (typeof(val) == "boolean") {
			this.ele.disabled = val;
		}
		return this;
	},
	
	/**
	 * �ͷŷ����������ͷŵ���ǰ�������Դ
	 */
	destroy: function() {
		this.ele = null;
	}
}