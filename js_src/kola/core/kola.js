
/**
 * kola 库的内核部分
 * 其中包括：
 * 		对语言本身的扩展
 * 		对包依赖和注册的支持
 * 		对象选择器
 * 		对Dom对象的封装
 * 		对浏览器的一些扩展
 * @author Jady@live.com
 */


/************************************************** kola *******************************************************/

var kola = {
	version: '0.0.1'
}

/************************************************** Object *******************************************************/

/**
 * 对象继承
 */
Object.extend = function(target, src) {
	
	for (var it in src) {
		target[it] = src[it];
	}
	
	return target;
}

Object.create = function(/*String*/varName, /*Object?*/varValue, /*Object?*/scope) {
	var a = varName.split('.'),
			obj = scope || window;
	for (var i=0, il=a.length, it; i<il; i++) {
		it = a[i];
		var v = obj[it];
		if (typeof(v) == 'undefind' || v == null) {
			obj[it] = {};
		}
		if (i == il-1) {
			if (typeof(varValue) != 'undefined') obj[it] = varValue;
			return obj[it];
		} else {
			obj = obj[it];
		}
	}
}

/************************************************** Class *******************************************************/

var Class = {
	
	/*
	 * 创建一个新类，并继承指定的对象
	 */
	create: function() {
		
		var c = function() {
			this.initialize.apply(this, arguments);
		}
		
		for (var i=0, il=arguments.length, it; i<il; i++) {
			it = arguments[i];
			if (it == null) continue;
			
			Object.extend(c.prototype, it);
		}
		
		return c;
	}
	
}

/************************************************** Function *******************************************************/

Object.extend(Function.prototype, {
	
	bind: function() {
		var method = this, _this = arguments[0], args = [];
		for (var i=1, il=arguments.length; i<il; i++) {
			args.push(arguments[i]); 
		}
		return function() {
			for (var i=0, il=arguments.length; i<il; i++) {
				args.push(arguments[i]); 
			}
			method.apply(_this, args);
		}
	},
	
	bindEvent: function() {
		var method = this, _this = arguments[0], args = [];
		for (var i=1, il=arguments.length; i<il; i++) {
			args.push(arguments[i]); 
		}
		return function(e) {
			args.unshift(e || window.event); 
			method.apply(_this, args);
		}
	},
	
	timeout: function(time) {
		return setTimeout(this, time * 1000);
	},
	
	interval: function(time) {
		return setInterval(this, time * 1000);
	}
	
});

/************************************************** String *******************************************************/

Object.extend(String.prototype, {
	
	trim: function() {
		return this.replace(/^\s+|\s+$/g, '');
	},
	
	escapeHTML: function() {
		if (kola.Browser.safari || kola.Browser.msie) {
			return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
		} else {
	    var self = arguments.callee;
	    self.text.data = this;
	    return self.div.innerHTML;
		}
  },

  unescapeHTML: function() {
		if (kola.Browser.safari || kola.Browser.msie) {
			return this.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
		} else {
	    var div = document.createElement('div');
	    div.innerHTML = this;
	    if (div.childNodes.length > 0) {
    		var str = [];
    		for (var i=0, il=div.childNodes.length, il; i<il; i++) {
    			str.push(div.childNodes[i].nodeValue);
    		}
    		return str.join('');
	    }
	    return '';
		}
  },
  
  //	取得字节长度（双字节字符认为是两个字符）
  byteLength: function() {
  	return this.replace(/[^\x00-\xff]/g,"**").length;
  }
	
});

Object.extend(String.prototype.escapeHTML, {
  div:  document.createElement('div'),
  text: document.createTextNode('')
});
with (String.prototype.escapeHTML) div.appendChild(text);

/************************************************** Array *******************************************************/

var $break = { };
Object.extend(Array.prototype, {
	
	_each: function(iterator, collect) {
		var r = [];
		try {
			for (var i=0, il=this.length; i<il; i++) {
				var v = iterator(this[i], i);
				if (collect && typeof(v) != 'undefined') r.push(v);
			}
		} catch (e) {
			if (e != $break) throw e;
		}
		return r;
	},
	
	collect: function(iterator) {
		return this._each(iterator, true);
	},
	
	each: function(iterator) {
		this._each(iterator, false);
		return this;
	}
	
});

/************************************************** Browser *******************************************************/

(function() {
	var ag = navigator.userAgent.toLowerCase();
	kola.Browser = {
		webkit: ag.indexOf('webkit') != -1,
		opera: ag.indexOf('opera') != -1,
		ie: (ag.indexOf('msie') != -1) && (ag.indexOf('opera') == -1),
		mozilla: (ag.indexOf('mozilla') != -1) && (ag.indexOf('webkit') == -1) && (ag.indexOf('compatible') == -1),
		version: (ag.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1]
	}
})();

/************************************************** Require *******************************************************/

(function() {
	
	var Pack = {
		
		/**
		 * 加载指定的包，加载完成之后调用指定的回调方法
		 */
		require: function(/*String*/packages, /*Function*/callback) {
			var pa = packages.replace(/\s/g, '').split(','),		//	所有需要的包
					requires = [],																	//	还需要等待完成可以使用的包
					loads = [];																			//	还需要去加载的包
			
			//	找到所有需要加载的包和需要等待的包
			pa.each(function(it) {
				var st = Pack._status(it);
				if (st != 3) {
					if (st == 0) loads.push(it);
					requires.push(it);
				}
			});
			
			//	如果没有需要加载的包，那就调用回调
			if (requires.length == 0) {
				if (typeof(callback) == 'function') callback.timeout(0);
				return;
			}
			
			//	给需要等待的包设置标记位
			var ro = new Pack._Require(requires, callback);		//	
			requires.each(function(it) {
				Pack._connect(it, ro);
			});
			
			//	加载所有需要的包
			loads.each(function(it) {
				Pack._load(it);
			});
		},
		
		register: function(/*String*/packageName, /*Function?*/content, /*String?*/requires) {
			var st = Pack._status(packageName);
					
			//	根据包的不同状态进行不同的处理
			if (st == 3) return;									//	如果已经存在了该包，那就直接返回
			
			//	判断是否需要先加载一些包
			if (typeof(requires) == 'string') {
				//	有需要提前加载的包
				
				//	包的状态标识为加载完成
				Pack._status(packageName, 2);				
				
				//	那就先加载相应的包
				//	$req(requires, $.Package.register.bind(window, packageName, content));
				$req(requires, $register.bind(window, packageName, content));
			} else {
				//	不需要提前加载一些包
				
				//	如果有需要执行的内容，那就先执行
				if (typeof(content) == 'function') {
					content();
				}
				
				//	标志当前包为完全可用的状态
				Pack._status(packageName, 3);
			}
		},
		
		/**
		 * 设置或者取得包的路径
		 */
		_path: function(/*String*/name, value) {
			
			if (arguments.length == 1) {			//	表示要取得某个包的路径信息
				var pa = packName.split('.'),
						tp = pa.shift(),							//	顶级包名
						cf = Pack._paths[tp],
						ua = [],
						lc = '';
				
				while (pa.length > 0) {
					var str = pa.join('.');
					if (cf[str]) {
						lc = cf[str];
						pa.length = 0;
					} else {
						ua.push(pa.pop());
					}
				}
				
				if (lc == '' && ua.length > 0) {
					return (cf._path || '') + ua[0] + '.js';
				} else {
					return lc + (ua.length > 0 ? (ua.reverse().join('/') + '.js') : '');
				}
			} else {													//	表示要设置包的路径信息
				var pa = packName.split('.'),
						tp = pa.shift(),							//	顶级包名
						P = Pack._paths;
				if (pa == 0) {
					P[tp] = value;
				} else {
					p[tp][pa.join('.')] = value;
				}
			}
		},
		
		_paths: {
			/*
			
			$: {
				_path: 	'http://js1.pp.sohu.com.cn/ppp/js/',		//	表示这个包的根路径
				anim: 	'http://js4.pp.sohu.com.cn/ppp/sns/'
			},
			
			blog: {
				_path: 	'http://js1.pp.sohu.com.cn/ppp/js/',		//	表示这个包的根路径
				common: ''
			}
			
			 */
			
		},
		
		/**
		 * 用来表示包的状态，总共有如下几种状态：
		 * 	uninitialized: 	未初始化
		 * 	loading:				加载中
		 * 	loaded:					加载完成，但是还不能使用
		 * 	complete:				已经完全可用
		 */
		_packages: {
			
		},
		
		/**
		 * 取得或者设置一个包的状态
		 */
		_status: function(/*String*/packageName, /*Number?*/stat) {
			var P = Pack._packages;
			if (!P[packageName]) {
				P[packageName] = {
					status: 0,
					waits: []
				}
				
				var a = packageName.split('.'),
						s = window;
				a.each(function(it, i) {
					if (i != a.length-1) {
						if (!s[it]) {
							s[it] = {};
						}
						s = s[it];
					}
				});
			}
			if (typeof(stat) == Number) {
				//	设置
				P[packageName]._status = stat;
				
				//	如果是完成状态，那就进行相应的回调
				if (stat == 3) {
					var wa = P[packageName].waits;
					for (var i=wa.length-1, it; i>=0; i--) {
						it = wa[i];
						it.update();
					}
				}
			} else {
				//	获取
				return P[packageName]._status;
			}
		},
		
		_connect: function(/*String*/packageName, /*Object*/requireObj) {
			var P = Pack._packages;
			if (!P[packageName]) {
				P[packageName] = {
					status: 0,
					waits: []
				}
			}
			P[packageName].waits.push(requireObj);
		},
		
		_disconnect: function(/*String*/packageName, /*Object*/requireObj) {
			var P = Pack._packages;
			if (!P[packageName]) {
				P[packageName] = {
					status: 0,
					waits: []
				}
			}
			var wa = P[packageName].waits;
			for (var i=wa.length-1, it; i>=0; i--) {
				if (wa[i] == requireObj) {
					wa.splice(i, 1);
				}
			}
		},
		
		_load: function(packageName) {
			var P = Pack,
					st = P._status(packageName),
					obj = P._packages[packageName];
			
			//	如果不是未初始化状态，那就不作任何处理
			if (st != 0) return;
			
			//	标记相应值
			P._status(packageName, 1);
			
			//	加载
			var s = document.createElement("script");
			s.type = 'text/javascript';
			s.src = P._path(packageName);
			document.getElementsByTagName('head')[0].appendChild(s);
		},
		
		_Require: function(/*String*/packages, /*Function?*/callback) {
			this.packages = packages;
			this.callback = callback;
		}
	}
	
	Pack._Require.prototype = {
		update: function() {
			var pa = this.packages;
			for (var i=pa.length-1, it; i>=0; i--) {
				it = pa[i];
				if (Pack._status(it) == 3) {
					pa.splice(i, 1);
					Pack._disconnect(it, this);
				}
			}
			
			//	如果已经没有任何需求，那说明所有相应的文件已经加载成功
			if (pa.length == 0) {
				if (typeof(this.callback) == 'function') {
					var cb = this.callback;
					cb.timeout(0);
				}
			}
		}
	}
	
	window.$req = Pack.require;
	window.$register = Pack.register;
	
	window.$call = function(/*Function*/func, /*String?*/requires, /*Object*/options) {
		if (typeof(requires) == 'string' && requires.length > 0) {
			$req(requires, func);
		} else {
			func();
		}
	}
	
})();

/************************************************** Element *******************************************************/

kola.Element = Class.create({
	
	initialize: function(els) {
		this._els = els.constructor == Array ? els : [els];
	},
	
	attr: function(name, value) {
		if (typeof(value) == 'undefined') {
			var el = this._els[0];
			return typeof(el[name]) != 'undefined' ? el[name] : el.getAttribute(name);
		} else {
			this._els.each(function(el) {
				el[name] = value;
				if (typeof(value) == 'string') el.setAttribute(name, value);
			});
			return this;
		}
	},
	
	html: function(value) {
		return this.attr('innerHTML', value);
	},
	
	text: function(value) {
		return this.attr(typeof(this._els[0].innerText) != 'undefined' ? 'innerText' : 'textContent', value);
	},
	
	val: function(value) {
		return this.attr('value', value);
	},
	
	
	css: function(name, value) {
		if (typeof(value) == 'undefined') {
			return this._els[0].style[name];
		} else {
			this._els.each(function(el) {
				el.style[name] = value;
			});
			return this;
		}
	},
	
	pos: function(position) {
		if (typeof(position) == 'undefined') {
			var el = this._els[0],
					left = 0,
					top = 0,
					de = doc.documentElement,
					db = doc.body,
					add = function(l, t) {
						left += l || 0;
						top += t || 0;
					};
			
			if ( elem.getBoundingClientRect ) {
				var box = elem.getBoundingClientRect();
				add(box.left + Math.max(de.scrollLeft, db.scrollLeft) - de.clientLeft,
						box.top + Math.max(de.scrollTop, db.scrollTop) - de.clientTop);
			} else {
				var op = el.offsetParent,
						fixed = el.style.position == 'fixed',
						oc = el,
						parent = el.parentNode;
				
				// Initial element offsets
				add( el.offsetLeft, el.offsetTop );
	
				// Get parent offsets
				while (op) {
					// Add offsetParent offsets
					add(op.offsetLeft, op.offsetTop);
	
					// Mozilla and Safari > 2 does not include the border on offset parents
					// However Mozilla adds the border for table or table cells
					if (mozilla && !/^t(able|d|h)$/i.test(offsetParent.tagName) || safari)
						add(el.style.borderLeftWidth, el.style.borderTopWidth);
	
					// Add the document scroll offsets if position is fixed on any offsetParent
					if (!fixed && op.style.position == 'fixed')
						fixed = true;
	
					// Set offsetChild to previous offsetParent unless it is the body element
					oc  = op.tagName.toLowerCase() == 'body' ? oc : op;
					// Get next offsetParent
					op = op.offsetParent;
				}
	
				// Get parent scroll offsets
				while (parent && parent.tagName && !/^body|html$/i.test(parent.tagName) ) {
					// Remove parent scroll UNLESS that parent is inline or a table to work around Opera inline/table scrollLeft/Top bug
					if (!/^inline|table.*$/i.test(parent.style.display))
						// Subtract parent scroll offsets
						add(-parent.scrollLeft, -parent.scrollTop);
	
					// Mozilla does not add the border for a parent that has overflow != visible
					if ( mozilla && parent.style.overflow != 'visible')
						add(parent.style.borderLeftWidth, parent.style.borderTopWidth);
	
					// Get next parent
					parent = parent.parentNode;
				}
	
				// Safari <= 2 doubles body offsets with a fixed position element/offsetParent or absolutely positioned offsetChild
				// Mozilla doubles body offsets with a non-absolutely positioned offsetChild
				if (mozilla && oc.style.position != 'absolute')
						add( -db.offsetLeft, -db.offsetTop );
	
				// Add the document scroll offsets if position is fixed
				if ( fixed )
					add(Math.max(de.scrollLeft, db.scrollLeft), Math.max(de.scrollTop,  db.scrollTop));
			}
			return {left: left, top: top};
		} else {
			this._els[0].each(function(el) {
				el.style.left = position.left + 'px';
				el.style.top = position.top + 'px';
			});
			return this;
		}
	},
	
	width: function(value) {
		if (typeof(value) == 'undefined') { 
			return this.css('width').replace('px', '');
		} else {
			return this.css('width', value + 'px');
		}
	},
	
	height: function(value) {
		if (typeof(value) == 'undefined') { 
			return this.css('height').replace('px', '');
		} else {
			return this.css('height', value + 'px');
		}
	},
	
	on: function(name, listener) {
		this._els.each(function(el) {
			kola.Event.on(el, name, listener);
		});
		return this;
	},
	
	un: function(name, listener) {
		this._els.each(function(el) {
			kola.Event.un(el, name, listener);
		});
		return this;
	},
	
	show: function() {
		this.css('display', '');
		return this;
	},
	
	hide: function() {
		this.css('display', 'none');
		return this;
	},
	
	toggle: function() {
		this[this._els[0].style.display == 'none' ? 'show' : 'hide']();
		return this;
	},
	
	remove: function() {
		this._els.each(function(el) {
			el.parentNode.removeChild(el);
		});
	},
	
	get: function(index) {
		return kola.Element.newInstance(this._els[index]);
	},
	
	size: function() {
		return this._els.length;
	},
	
	append: function() {
		var el = this._els[0];
		for (var i=0, il=arguments.length; i<il; i++) {
			el.appendChild(arguments[i]);
		}
		return this;
	},
	
	prepend: function() {
		var el = this._els[0];
		for (var i=arguments.length-1; i>=0; i++) {
			el.insertBefore(arguments[i], el.firstChild);
		}
		return this;
	},

	before: function() {
		var el = this._els[0];
		for (var i=arguments.length-1; i>=0; i++) {
			el.parentNode.insertBefore(arguments[i], el);
		}
		return this;
	},

	after: function() {
		var el = this._els[0];
		for (var i=arguments.length-1; i>=0; i++) {
			el.parentNode.insertBefore(arguments[i], el.nextSibling);
		}
		return this;
	},
	
	prev: function() {
		var els = this._els.collect(function(el) {
			return el.previousSibling;
		});
		return kola.Element.newInstance(els);
	},
	
	next: function() {
		var els = this._els.collect(function(el) {
			return el.nextSibling;
		});
		return kola.Element.newInstance(els);
	},
	
	parent: function() {
		var els = this._els.collect(function(el) {
			return el.parentNode;
		});
		return kola.Element.newInstance(els);
	},
	
	children: function() {
		var els = [];
		this._els.each(function(el) {
			els.concat(el.childNodes);
		});
		return kola.Element.newInstance(els);
	},
	
	elements: function() {
		return this._els;
	},
	/**
	 * 获取对象的标签名称
	 * @return {string} 标签名称
	 */
	tagName: function(){
		return this._els[0].tagName.toLowerCase();
	}
	
});
kola.Element.newInstance = function(els) {
	return new kola.Element(els);
}


/**
 * @对 kola.Element类针对下拉选择框控件的扩展实现
 */
Object.extend(kola.Element.prototype,{
	/**
	 * 把一个对象中的所有字符串属性项添加到当前select中
	 * @param {Object} obj 要添加的属性对象（必填项）
	 * @type Select
	 * @return 当前的Select对象
	 */
	addOptions: function(obj) {
		var el = this._els[0];
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
		var el = this._els[0];
		
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
	select: function(val) {
		var el = this._els[0];
		switch (typeof(val)) {
			case "number":
				el.selectedIndex = (val > el.options.length ? 0 : val);
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
			this._els[0].disabled = val;
		}
		return this;
	},
	
	/**
	 * 清除所有选项
	 * @type Select
	 * @return 当前的Select对象
	 */
	clear: function() {
		this._els[0].options.length = 0;
		return this;
	}
});

/************************************************** Selector *******************************************************/

/**
 * 取得对象
 * @param exp 对象表达式，接受这三种类型的参数
 * 		1. String类型的对象选择表达式
 * 		2. 原生对象
 * 		3. 已经封装过的对象
 */

	window.$ = function(exp, context) {
		var eles = [];
		
		if (typeof(exp) == 'object') {
			if (exp.constructor == kola.Element) {
				return exp;
			} else {
				eles = exp;
			} 
		} else {
			if (exp.charAt(0) == '#' && exp.indexOf(' ') == -1 && exp.indexOf('>') == -1) {
				eles = [document.getElementById(exp.substr(1))];
			} else {
				var sels = parseSelectorStr(exp);
				scope = context || window;
				
				sels.each(function(sel, i) {
					var el, parents;
					if (sel.scopeType == 0) {
						parents = [document.getElementById(sel.itemName)];
					} else {
						if (sel.scopeType == 1) {
							parents = scope.childNodes;
							if (sel.itemName.length > 0) {
								parents = parents.collect(function(it, j) {
									if (it.tagName && it.tagName.toLowerCase() == sel.itemName) {
										return it;
									} 
								});
							}
						} else {
							parents = scope.getElementsByTagName(sel.itemName || '*');
						}
					}
					
					if (sel.propName != '') {
						parents = parents.collect(function(it, i) {
							var v = it.getAttribute(sel.propName);
							if (sel.propValue.length > 0) {
								if (v != null && v == sel.propValue) return it;
							} else {
								if (v != null) return it;
							}
						});
					}
				});
			}
		}
		
		
		
		
		return kola.Element.newInstance(eles); 
	}
	
	/*
	{
		scopeType: '',			//	范围。三种：ID，子对象，孙对象
		itemName: '',				//	对象名称
		propName: '',				//	属性类型。两种：className或者属性名
		propValue: ''
	}
	*/
	
	
	
	var parseSelectorStr = function(str) {
		var sels = [];
		
		var arr = str.split(' ');
		arr.each(function(it, i) {
			var arr2 = it.split('>');
			arr2.each(function(it2, j) {
				var scopeType = (j == 0) ? 2 : 1,
						itemName = '',
						propName = '',
						propValue = '';
				
				var propIndex = it2.indexOf('.');
				if (propIndex != -1) {
					propName = 'class';
					propValue = it2.substr(propIndex+1);
					it2 = it2.substr(0, propIndex);
				} else {
					propIndex = it2.indexOf('[');
					if (propIndex != -1) {
						propName = it2.substr(propIndex+1, it2.length).split('=');
						it2 = it2.substr(0, propIndex);
						if (propName.length == 2) {
							propValue = propName[1];
						}
						propName = propName[0];
					}
				}
				
				if (it2.length > 0) {
					var c = it2.charAt(0);
					switch (c) {
						case '*':
							scopeType = 2;
							break;
						case '#':
							scopeType = 0;
							itemName = it2.substr(1);
							break;
						default:
							itemName = it2;
							break;
					}
				}
				
				sels.push({
					scopeType: scopeType,
					itemType: itemType,
					itemName: itemName,
					propName: propName,
					propValue: propValue
				});
			});
		});
		
		return sels;
	}


/************************************************** Event *******************************************************/

kola.Event = {
	
	on: function(el, name, func) {
		if (el.addEventListener) {
			el.addEventListener(name, func, false);
		} else {
			el.attachEvent('on' + name, func);
		}
	},
	
	un: function(el, name, func) {
		if (el.removeEventListener) {
			el.removeEventListener(name, func, false);
		} else {
			el.detachEvent('on' + name, func);
		}
	},
	
	stop: function(e) {
		e.preventDefault();
		e.stopPropagation();
	},
	/**
	 * 获取事件源对象
	 * @param {event} e
	 * @return {element} 事件源对象
	 */
	element: function(e){
		var ele = e.srcElement ? e.srcElement: e.target;
		return $(ele.nodeType == 3 ? ele.parentNode : ele);
	}
	
}

/************************************************** Ajax *******************************************************/

kola.Ajax = {
	
	request: function(url, options) {
		var trans = this._getTransport();
		options = Object.extend({
			method: 'get',
			data: null,
			async: true
		},options || {});
		if(!this.callback) 
			this.callback = options.onSuccess.bind(this);
		trans.open(options.method, url, options.async);
		trans.onreadystatechange = this._onStateChange.bind(this,trans, url, options);
		trans.send(options.data || null);
	},
	
	text: function(url, options) {
		if (typeof(options.onSuccess) == 'function')
			this.callback = this._successText.bind(this,options.onSuccess);
		this.request(url, options);
	},
	
	json: function(url, options) {
		if (typeof(options.onSuccess) == 'function') 
			this.callback = this._successJson.bind(this,options.onSuccess);
		this.request(url, options);
	},
	
	xml: function(url, options) {
		if (typeof(options.onSuccess) == 'function') 
			this.callback = this._successXml.bind(this,options.onSuccess);
		this.request(url, options);
	},
	
	_getTransport: function() {
		if (window.XMLHttpRequest) return new XMLHttpRequest();
		else {
			try {
				return new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e) {
				try {
					return new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e) {
					return false;
				}
			}
		}
  },
  
  _onStateChange: function(trans, url, options) {
  	if (trans.readyState == 4) {
  		var s = trans.status;
  		if (!!s && s >= 200 && s < 300) {
  			if (typeof(this.callback) == 'function') this.callback(trans);
  		} else {
  			if (typeof(options.onFailure) == 'function') options.onFailure(trans);
  		}
  	}
  },
  
  _successText: function(callback, trans) {
  	callback(trans.responseText);
  },
  
  _successJson: function(callback, trans) {
  	callback(eval('(' + trans.responseText + ')'));
  },
  
  _successXml: function(callback, trans) {
  	callback(trans.responseXML);
  }
	
}

/************************************************** Cookie *******************************************************/

kola.Cookie = {
	get: function(name) {
		var tmp, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)","gi");
		if( tmp = reg.exec( unescape(document.cookie) ) )
			return(tmp[2]);
		return null;
	},
	set: function(name, value, expires, path, domain) {
		var str = name + "=" + escape(value);
		if (expires) {
			if (expires == 'never') {expires = 100*365*24*60;}
			var exp = new Date(); 
			exp.setTime(exp.getTime() + expires*60*1000);
			str += "; expires="+exp.toGMTString();
		}
		if (path) {str += "; path=" + path;}
		if (domain) {str += "; domain=" + domain;}
		document.cookie = str;
	},
	remove: function(name, path, domain) {
		document.cookie = name + "=" + 
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}