
if (typeof(JSPATH) == 'undefined') {
	JSPATH = {
		util: {
			common: 'http://js2.pp.sohu.com.cn/ppp/js/common/common.js',
			module: 'http://js4.pp.sohu.com.cn/ppp/js/module/',
			tool: 'http://js5.pp.sohu.com.cn/ppp/js/tool/'
		},
		blog: {
			_path: 'http://js3.pp.sohu.com.cn/ppp/blog/js_ppp/'
		}
	}
} 
var $config = JSPATH;

var $register = function(/*String*/packageName, /*Function?*/content, /*String?*/requires) {
	var st = $Packages.status(packageName);
			
	//	根据包的不同状态进行不同的处理
	if (st == 'complete') return;									//	如果已经存在了该包，那就直接返回
	
	//	判断是否需要先加载一些包
	if (typeof(requires) == 'string') {
		//	有需要提前加载的包
		
		//	包的状态标识为正在加载完成
		$Packages.status(packageName, 'loaded');				
		
		//	那就先加载相应的包
		//	$require(requires, $register.bind(window, packageName, content));
		$require(requires, function() {$register.call(window, packageName, content);});
	} else {
		//	不需要提前加载一些包
		
		//	如果有需要执行的内容，那就先执行
		if (typeof(content) == 'function') {
			content();
		}
		
		//	标志当前包为完全可用的状态
		$Packages.status(packageName, 'complete');
	}
}

var $declare = function(/*String*/varName, /*Object?*/varValue, /*Object?*/scope) {
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

var $Packages = {
	
	/**
	 * 加载指定的包，加载完成之后调用指定的回调方法
	 */
	require: function(/*String*/packages, /*Function*/callback) {
		var pa = packages.replace(/\s/g, '').split(','),											//	所有需要的包
				requires = [],																//	还需要等待完成可以使用的包
				loads = [];																		//	还需要去加载的包
		
		//	找到所有需要加载的包和需要等待的包
		for (var i=0, il=pa.length, it; i<il; i++) {
			it = pa[i];	//	包的名称
			
			var st = $Packages.status(it);
			if (st != 'complete') {
				if (st == 'uninitialized') loads.push(it);
				requires.push(it);
			}
		}
		
		//	如果没有需要加载的包，那就调用回调
		if (requires.length == 0) {
			if (typeof(callback) == 'function') setTimeout(callback, 0);
			return;
		}
		
		//	给需要等待的包设置标记位
		var ro = new $Packages._Require(requires, callback);		//	
		for (var i=0, il=requires.length, it; i<il; i++) {
			$Packages.connect(requires[i], ro);
		}
		
		//	加载所有需要的包
		for (var i=0, il=loads.length, it; i<il; i++) {
			it = loads[i];
			$Packages._load(it);
		}
	},
	
	/**
	 * 通过一个包名称，取得其相应的路径
	 */
	path: function(/*String*/packageName) {
		var pa = packageName.split('.'),
				tp = pa.shift(),
				cf = $config[tp],
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
	},
	
	/**
	 * 取得或者设置一个包的状态
	 */
	status: function(/*String*/packageName, /*String?*/statusText) {
		if (!$Packages._packages[packageName]) {
			$Packages._packages[packageName] = {
				status: 'uninitialized',
				waits: []
			}
		}
		if (typeof(statusText) == 'string') {
			//	设置
			$Packages._packages[packageName].status = statusText;
			
			//	如果是完成状态，那就进行相应的回调
			if (statusText == 'complete') {
				var wa = $Packages._packages[packageName].waits;
				for (var i=wa.length-1, it; i>=0; i--) {
					it = wa[i];
					it.update();
				}
			}
		} else {
			//	获取
			return $Packages._packages[packageName].status;
		}
	},
	
	connect: function(/*String*/packageName, /*Object*/requireObj) {
		if (!$Packages._packages[packageName]) {
			$Packages._packages[packageName] = {
				status: 'uninitialized',
				waits: []
			}
		}
		$Packages._packages[packageName].waits.push(requireObj);
	},
	
	disconnect: function(/*String*/packageName, /*Object*/requireObj) {
		if (!$Packages._packages[packageName]) {
			$Packages._packages[packageName] = {
				status: 'uninitialized',
				waits: []
			}
		}
		var wa = $Packages._packages[packageName].waits;
		for (var i=wa.length-1, it; i>=0; i--) {
			if (wa[i] == requireObj) {
				wa.splice(i, 1);
			}
		}
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
	
	_load: function(packageName) {
		var st = $Packages.status(packageName);
		var obj = $Packages._packages[packageName];
		
		//	如果不是未初始化状态，那就不作任何处理
		if (st != 'uninitialized') return;
		
		//	标记相应值
		$Packages.status(packageName, 'loading');
		
		//	加载
		var s = document.createElement("script");
		s.type = 'text/javascript';
		s.src = $Packages.path(packageName);
		document.getElementsByTagName('head')[0].appendChild(s);
	}
}

$Packages._Require = function(/*String*/packages, /*Function?*/callback) {
	this.packages = packages;
	this.callback = callback;
}
$Packages._Require.prototype = {
	update: function() {
		var pa = this.packages;
		for (var i=pa.length-1, it; i>=0; i--) {
			it = pa[i];
			if ($Packages.status(it) == 'complete') {
				pa.splice(i, 1);
				$Packages.disconnect(it, this);
			}
		}
		
		//	如果已经没有任何需求，那说明所有相应的文件已经加载成功
		if (pa.length == 0) {
			if (typeof(this.callback) == 'function') {
				var cb = this.callback;
				setTimeout(cb, 0);
			}
		}
	}
}

var $require = $Packages.require;

var $call = function(/*Function*/func, /*String?*/requires, /*Object*/options) {
	if (typeof(requires) == 'string' && requires.length > 0) {
		if (options && options.ele) 
			util.Tip.show(options.tip || '正在加载中...', options.ele);
			
		$require(requires, func);
	} else {
		func();
	}
}

$declare('util.Tip', function() {});
util.Tip.prototype = {
	show: function(text, ele) {
		this._setEl(ele);
		this._setText(text);
		this._show();
	},
	
	hide: function() {
		Element.hide(this.el);
	},
	
	destroy: function() {
		this._ctrEl.parentNode.removeChild(this._ctrEl);
		this._ctrEl = this.cttEl = null;
		this.el = null;
	},
	
	_show: function() {
		var rect = Dom.getRect(this.el);
		Dom.setPos(this._cttEl, {
			left: rect.left,
			top:	rect.bottom
		});
		Element.show(this.el);
	},
	
	_setEl: function(ele) {
		if (ele) 
			this.el = $(ele);
	},
	
	_setText: function(text) {
		if (!this._ctrEl) {
			var ctrEl = document.createElement('div');
			ctrEl.style.cssText = 'position:absolute;display:none;left:0px;top:0px;border:1px solide Red;';
			this._ctrEl = this._cttEl = document.body.appendChild(ctrEl);
		}
		this._cttEl.innerHTML = text;
	}
}
util.Tip.show = function(text, ele) {
	var tip = new util.Tip();
	tip.show(text, ele);
	return tip;
}

$register('util.common');