
/**
 * �������ģ��jQuery�����࣬ʵ�ֲ���jQuery�еĹ��ܣ����ڶ�dom������������Ĳ���
 * @author Jady
 * 
 * @base prototype(1.6)
 **/

var jQueryBlog = Class.create();
jQueryBlog.prototype = {
	
	/**
	 * jQueryBlog���͵ĳ�ʼ������
	 * @param {stringORHTMLElementORArray} element ��������ж������͵Ŀ����ԣ�
	 * 		1. ��һ�������id��ͬʱҪ�������String���͵ģ�����������##��ͷ
	 * 		2. Ϊһ��XPath�ı��ʽ��������ʽҲ��String���͵�
	 * 		3. Ϊһ��HTMLElement����
	 * 		4. Ϊһ��HTMLElement���������
	 */
	initialize: function(element) {
		//	�������HTMLElement���Ǿ���ת������Ӧ��HTMLElement
		if (typeof(element) == 'string') {
			if (element.length > 2 && element.substr(0, 2) == '##') {
				//	����һ�������id
				element = document.getElementById(element.substr(2));
			} else {
				//	����һ��XPath���ʽ
				element = $$(element);
			}
		}
		
		//	����ת��������
		if (!element) element = [];
		else if (!(element instanceof Array)) element = [element];
		
		//	���ڵ�ǰ������
		this.eles = element;
		this.length = element.length;
	},
	
	/**
	 * ����HTMLElement����Ĳ���������ܻ��ж�����ϣ�
	 * 		1. ���ֻ��nameֵ��ȡ�õ�һ������Ĳ���ֵ��������
	 * 		2. ���name��value�����ڣ��������ж���Ĳ���ֵ�����ص�ǰ��jQueryBlog����
	 * @param {String} name ��������
	 * @param {String} value ����ֵ
	 */
	attr: function(name, value) {
		if (typeof(value) == 'string') {
			//	Ҫ�������ж���Ĳ�����
			if (this.length > 0) {
				this.get().each(function(item) {
					item.setAttribute(name, value);
				});
			}
			return this;
		} else {
			//	Ҫȡ�õ�һ���������Ӧ����ֵ
			return this.length == 0 ? undefined : this.get()[0].getAttribute(name);
		}
	},
	
	/**
	 * ����HTMLElement����Ĳ���������ܻ��ж�����ϣ�
	 * 		1. ���ֻ��nameֵ��ȡ�õ�һ������Ĳ���ֵ��������
	 * 		2. ���name��value�����ڣ��������ж���Ĳ���ֵ�����ص�ǰ��jQueryBlog����
	 * @param {String} name ��������
	 */
	className: function(name) {
		if (typeof(name) == 'string') {
			//	Ҫ�������ж���Ĳ�����
			if (this.length > 0) {
				this.get().each(function(item) {
					item.className = name;
				});
			}
			return this;
		} else {
			//	Ҫȡ�õ�һ���������Ӧ����ֵ
			return this.length == 0 ? undefined : this.get()[0].className;
		}
	},
	
	/**
	 * ɾ������HTMLElement�����е�ĳ������
	 * @param {String} name ��������
	 * @type jQueryBlog
	 * @return ���ص�ǰ��jQueryBlog����
	 */
	removeAttr: function(name) {
		if (this.length > 0) {
			this.get().each(function(item) {
				item.setAttribute(name, value);
			});
		}
		return this;
	},
	
	/**
	 * �����е�HTMLElementԪ�ؼ���һ����ʽ��
	 * @param {String} name ��ʽ����
	 * @type jQueryBlog
	 * @return ��ǰ��jQueryBlog����
	 */
	addClass: function(name) {
		this.get().each(function(item) {
			Element.addClassName(name);
		});
		return this;
	},
	
	/**
	 * ɾ�����е�HTMLElementԪ���ϵ�һ����ʽ��
	 * @param {String} name ��ʽ����
	 * @type jQueryBlog
	 * @return ��ǰ��jQueryBlog����
	 */
	removeClass: function(name) {
		this.get().each(function(item) {
			Element.removeClassName(name);
		});
		return this;
	},
	
	/**
	 * �������ж����е�innerText���ݻ���ȡ�õ�һ��HTMLElementԪ���е�innerText����
	 * @param {String} val Ҫ��ӵ�innerText�е�����
	 * @type jQueryBlogORString
	 * @return ��������ã��Ǿͷ��ص�ǰ��jQueryBlog��������ǻ�ȡ���Ǿ������HTMLElement���Ǿͷ��ص�һ���е�innerTextֵ�����û���Ǿͷ���undefined
	 */
	text: function(val) {
		if (arguments.length > 0) {
			var isIE = Prototype.Browser.IE;
			this.get().each(function(item) {
				if (isIE) {
					item.innerText = val;
				} else {
					item.textContent = val;
				}
			});
			return this;
		} else {
			return this.length == 0 ? undefined : (Prototype.Browser.IE ? this.get()[0].innerText : this.get()[0].textContent);
		}
	},
	
	/**
	 * �������ж����е�value����ȡ�õ�һ��HTMLElementԪ���е�value
	 * @param {String} val Ҫ���õ�valueֵ
	 * @type jQueryBlogORString
	 * @return ��������ã��Ǿͷ��ص�ǰ��jQueryBlog��������ǻ�ȡ���Ǿ������HTMLElement���Ǿͷ��ص�һ����valueֵ�����û���Ǿͷ���undefined
	 */
	val: function(val) {
		if (arguments.length > 0) {
			this.get().each(function(item) {
				item.value = val;
			});
			return this;
		} else {
			return this.length == 0 ? undefined : this.get()[0].value;
		}
	},
	
	/**
	 * �������ж����е�innerHTML���ݻ�ȡ�õ�һ��HTMLElementԪ���е�html����
	 * @param {String} val Ҫ��ӵ�innerHTML�е�����
	 * @type jQueryBlogORString
	 * @return ��ǰ��jQueryBlog���������HTMLElement���Ǿͷ��ص�һ���е�htmlֵ�����û���Ǿͷ���undefined
	 */
	html: function(val) {
		if (arguments.length > 0) {
			this.get().each(function(item) {
				item.innerHTML = val;
				/*
				if (isIE) {
					item.innerHTML = val;
				} else {
					var newEl = item.cloneNode(false);
					newEl.innerHTML = val;
					item.parentNode.replaceChild(newEl, item);
					item.innerHTML = val;
				}
				* */
			});
			return this;
		} else {
			return this.length == 0 ? undefined : this.get()[0].innerHTML;
		}
	},
	
	/**
	 * ����HTMLElement�������ʽ��Ϣ������ܻ��ж�����ϣ�
	 * 		1. ���ֻ��nameֵ��ȡ�õ�һ�������ָ����ʽֵ��������
	 * 		2. ���name��value�����ڣ��������ж����ָ����ʽֵ�����ص�ǰ��jQueryBlog����
	 * @param {String} name ��ʽ����
	 * @param {String} value ��ʽֵ
	 */
	css: function(name, value) {
		if (typeof(value) == 'string') {
			//	Ҫ�������ж������ʽֵ
			if (this.length > 0) {
				this.get().each(function(item) {
					item.setStyle(name, value);
				});
			}
			return this;
		} else {
			//	Ҫȡ�õ�һ���������Ӧ��ʽֵ
			return this.length == 0 ? undefined : this.get()[0].getStyle(name);
		}
	},
	
	/**
	 * �������ж����title����ȡ�õ�һ��HTMLElementԪ���е�title
	 * @param {String} val Ҫ���õ�valueֵ
	 * @type jQueryBlogORString
	 * @return ��������ã��Ǿͷ��ص�ǰ��jQueryBlog��������ǻ�ȡ���Ǿ������HTMLElement���Ǿͷ��ص�һ����titleֵ�����û���Ǿͷ���undefined
	 */
	title: function(val) {
		if (arguments.length > 0) {
			this.get().each(function(item) {
				item.title = val;
			});
			return this;
		} else {
			return this.length == 0 ? undefined : this.get()[0].title;
		}
	},
	
	/**
	 * ȡ�ð�����HTMLElement���������
	 * @type Array
	 * @return Array of HTMLElement
	 */
	get: function() {
		return this.eles;
	},
	
	/**
	 * ѭ�����е�HTMLElement����ִ��ָ���Ĳ���
	 * @param {Function} func ѭ��ִ�еķ���
	 * @type jQueryBlog
	 * @return ��ǰ��jQueryBlog����
	 */
	each: function(func) {
		this.get().each(func)
		return this;
	},
	
	/**
	 * ȡ�����鵽��HTMLElement������
	 * @type number
	 */
	length: 0,
	
	/**
	 * �������е�HTMLElement����
	 */
	eles: [],
	
	/**
	 * �����㼯���ڵ�һ��Ԫ����
	 * @type jQueryBlog
	 * @return ��ǰ��jQueryBlog����
	 */
	focus: function() {
		if (this.length > 0) this.get()[0].focus();
		return this;
	},
	
	/**
	 * ���û��߻�ȡ�����Ƿ���ã�������ڵ�һ���������Ǿͱ�ʾҪ����Ϊ��������ָ����ֵ����������ڵ�һ���������Ǿ�ȡ�õ�һ�������Ƿ����
	 * @param {Boolean} val �Ƿ�
	 * @type jQueryBlogORBoolean
	 * @return ��ǰ��jQueryBlog������һ��������Ƿ����ֵ
	 */
	disabled: function(val) {
		if (typeof(val) == "boolean") {
			this.each(function(i) {
				i.disabled = val;
			});
			return this;
		} else {
			return this.length > 0 ? this.get().disabled : undefined;
		}
	},
	
	/**
	 * �󶨵����¼�
	 * @type jQery
	 * @return ��ǰ��jQueryBlog����
	 */
	click: function(fn) {
		return this.each(function(item) {
			Event.observe(item, "click", fn);
		});
	},
	
	/**
	 * �󶨱���¼�
	 * @type jQery
	 * @return ��ǰ��jQueryBlog����
	 */
	change: function(fn) {
		return this.each(function(item) {
			Event.observe(item, "change", fn);
		});
	},
	
	/**
	 * �󶨼���keyup�¼�
	 * @type jQery
	 * @return ��ǰ��jQueryBlog����
	 */
	keyup: function(fn) {
		return this.each(function(item) {
			Event.observe(item, "keyup", fn);
		});
	}
}

var J = function(element) {
	return new jQueryBlog(element);
}
