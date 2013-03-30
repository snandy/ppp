
/**
 * 这个类是模拟jQuery的主类，实现部分jQuery中的功能，便于对dom对象进行连续的操作
 * @author Jady
 * 
 * @base prototype(1.6)
 **/

var jQueryBlog = Class.create();
jQueryBlog.prototype = {
	
	/**
	 * jQueryBlog类型的初始化方法
	 * @param {stringORHTMLElementORArray} element 这个对象有多种类型的可能性：
	 * 		1. 是一个对象的id，同时要求必须是String类型的，而且以两个##开头
	 * 		2. 为一个XPath的表达式，这个表达式也是String类型的
	 * 		3. 为一个HTMLElement对象
	 * 		4. 为一个HTMLElement对象的数组
	 */
	initialize: function(element) {
		//	如果不是HTMLElement，那就先转化成相应的HTMLElement
		if (typeof(element) == 'string') {
			if (element.length > 2 && element.substr(0, 2) == '##') {
				//	这是一个对象的id
				element = document.getElementById(element.substr(2));
			} else {
				//	这是一个XPath表达式
				element = $$(element);
			}
		}
		
		//	将其转化成数组
		if (!element) element = [];
		else if (!(element instanceof Array)) element = [element];
		
		//	存在当前对象中
		this.eles = element;
		this.length = element.length;
	},
	
	/**
	 * 操作HTMLElement对象的参数，其可能会有多种组合：
	 * 		1. 如果只有name值：取得第一个对象的参数值，并返回
	 * 		2. 如果name和value都存在：设置所有对象的参数值，返回当前的jQueryBlog对象
	 * @param {String} name 参数名称
	 * @param {String} value 参数值
	 */
	attr: function(name, value) {
		if (typeof(value) == 'string') {
			//	要设置所有对象的参数项
			if (this.length > 0) {
				this.get().each(function(item) {
					item.setAttribute(name, value);
				});
			}
			return this;
		} else {
			//	要取得第一个对象的相应参数值
			return this.length == 0 ? undefined : this.get()[0].getAttribute(name);
		}
	},
	
	/**
	 * 操作HTMLElement对象的参数，其可能会有多种组合：
	 * 		1. 如果只有name值：取得第一个对象的参数值，并返回
	 * 		2. 如果name和value都存在：设置所有对象的参数值，返回当前的jQueryBlog对象
	 * @param {String} name 参数名称
	 */
	className: function(name) {
		if (typeof(name) == 'string') {
			//	要设置所有对象的参数项
			if (this.length > 0) {
				this.get().each(function(item) {
					item.className = name;
				});
			}
			return this;
		} else {
			//	要取得第一个对象的相应参数值
			return this.length == 0 ? undefined : this.get()[0].className;
		}
	},
	
	/**
	 * 删除所有HTMLElement对象中的某个参数
	 * @param {String} name 参数名称
	 * @type jQueryBlog
	 * @return 返回当前的jQueryBlog对象
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
	 * 给所有的HTMLElement元素加上一个样式名
	 * @param {String} name 样式名称
	 * @type jQueryBlog
	 * @return 当前的jQueryBlog对象
	 */
	addClass: function(name) {
		this.get().each(function(item) {
			Element.addClassName(name);
		});
		return this;
	},
	
	/**
	 * 删除所有的HTMLElement元素上的一个样式名
	 * @param {String} name 样式名称
	 * @type jQueryBlog
	 * @return 当前的jQueryBlog对象
	 */
	removeClass: function(name) {
		this.get().each(function(item) {
			Element.removeClassName(name);
		});
		return this;
	},
	
	/**
	 * 设置所有对象中的innerText内容或者取得第一个HTMLElement元素中的innerText内容
	 * @param {String} val 要添加到innerText中的内容
	 * @type jQueryBlogORString
	 * @return 如果是设置，那就返回当前的jQueryBlog对象；如果是获取，那就如果有HTMLElement，那就返回第一个中的innerText值，如果没有那就返回undefined
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
	 * 设置所有对象中的value或者取得第一个HTMLElement元素中的value
	 * @param {String} val 要设置的value值
	 * @type jQueryBlogORString
	 * @return 如果是设置，那就返回当前的jQueryBlog对象；如果是获取，那就如果有HTMLElement，那就返回第一个的value值，如果没有那就返回undefined
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
	 * 设置所有对象中的innerHTML内容或取得第一个HTMLElement元素中的html内容
	 * @param {String} val 要添加到innerHTML中的内容
	 * @type jQueryBlogORString
	 * @return 当前的jQueryBlog对象，如果有HTMLElement，那就返回第一个中的html值，如果没有那就返回undefined
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
	 * 操作HTMLElement对象的样式信息，其可能会有多种组合：
	 * 		1. 如果只有name值：取得第一个对象的指定样式值，并返回
	 * 		2. 如果name和value都存在：设置所有对象的指定样式值，返回当前的jQueryBlog对象
	 * @param {String} name 样式名称
	 * @param {String} value 样式值
	 */
	css: function(name, value) {
		if (typeof(value) == 'string') {
			//	要设置所有对象的样式值
			if (this.length > 0) {
				this.get().each(function(item) {
					item.setStyle(name, value);
				});
			}
			return this;
		} else {
			//	要取得第一个对象的相应样式值
			return this.length == 0 ? undefined : this.get()[0].getStyle(name);
		}
	},
	
	/**
	 * 设置所有对象的title或者取得第一个HTMLElement元素中的title
	 * @param {String} val 要设置的value值
	 * @type jQueryBlogORString
	 * @return 如果是设置，那就返回当前的jQueryBlog对象；如果是获取，那就如果有HTMLElement，那就返回第一个的title值，如果没有那就返回undefined
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
	 * 取得包含的HTMLElement对象的数组
	 * @type Array
	 * @return Array of HTMLElement
	 */
	get: function() {
		return this.eles;
	},
	
	/**
	 * 循环所有的HTMLElement对象，执行指定的操作
	 * @param {Function} func 循环执行的方法
	 * @type jQueryBlog
	 * @return 当前的jQueryBlog对象
	 */
	each: function(func) {
		this.get().each(func)
		return this;
	},
	
	/**
	 * 取得所查到的HTMLElement的数量
	 * @type number
	 */
	length: 0,
	
	/**
	 * 本对象中的HTMLElement数组
	 */
	eles: [],
	
	/**
	 * 将焦点集中在第一个元素上
	 * @type jQueryBlog
	 * @return 当前的jQueryBlog对象
	 */
	focus: function() {
		if (this.length > 0) this.get()[0].focus();
		return this;
	},
	
	/**
	 * 设置或者获取对象是否可用，如果存在第一个参数，那就表示要设置为可以设置指定的值，如果不存在第一个参数，那就取得第一个对象是否可用
	 * @param {Boolean} val 是否
	 * @type jQueryBlogORBoolean
	 * @return 当前的jQueryBlog对象或第一个对象的是否可用值
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
	 * 绑定单击事件
	 * @type jQery
	 * @return 当前的jQueryBlog对象
	 */
	click: function(fn) {
		return this.each(function(item) {
			Event.observe(item, "click", fn);
		});
	},
	
	/**
	 * 绑定变更事件
	 * @type jQery
	 * @return 当前的jQueryBlog对象
	 */
	change: function(fn) {
		return this.each(function(item) {
			Event.observe(item, "change", fn);
		});
	},
	
	/**
	 * 绑定键盘keyup事件
	 * @type jQery
	 * @return 当前的jQueryBlog对象
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
