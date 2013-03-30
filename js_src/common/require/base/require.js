
$.Package = {
		
	/**
	 * 加载指定的包，加载完成之后调用指定的回调方法
	 */
	require: function(/*String*/packages, /*Function*/callback) {
		var pa = packages.replace(/\s/g, '').split(','),		//	所有需要的包
				requires = [],																	//	还需要等待完成可以使用的包
				loads = [],																			//	还需要去加载的包
				P = $.Package;
		
		//	找到所有需要加载的包和需要等待的包
		for (var i=0, il=pa.length, it; i<il; i++) {
			it = pa[i];	//	包的名称
			
			var st = P._status(it);
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
		var ro = new P._Require(requires, callback);		//	
		for (var i=0, il=requires.length, it; i<il; i++) {
			P._connect(requires[i], ro);
		}
		
		//	加载所有需要的包
		for (var i=0, il=loads.length, it; i<il; i++) {
			it = loads[i];
			P._load(it);
		}
	},
	
	register: function(/*String*/packageName, /*Function?*/content, /*String?*/requires) {
		var P = $.Package,
				st = P._status(packageName);
				
		//	根据包的不同状态进行不同的处理
		if (st == 'complete') return;									//	如果已经存在了该包，那就直接返回
		
		//	判断是否需要先加载一些包
		if (typeof(requires) == 'string') {
			//	有需要提前加载的包
			
			//	包的状态标识为正在加载完成
			P._status(packageName, 'loaded');				
			
			//	那就先加载相应的包
			//	$req(requires, $.Package.register.bind(window, packageName, content));
			$req(requires, function() {P.register.call(window, packageName, content);});
		} else {
			//	不需要提前加载一些包
			
			//	如果有需要执行的内容，那就先执行
			if (typeof(content) == 'function') {
				content();
			}
			
			//	标志当前包为完全可用的状态
			P._status(packageName, 'complete');
		}
	},
	
	declare: function(/*String*/varName, /*Object?*/varValue, /*Object?*/scope) {
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
	},
	
	/**
	 * 设置或者取得包的路径
	 */
	path: function(/*String*/name, value) {
		
		if (arguments.length == 1) {			//	表示要取得某个包的路径信息
			var pa = packName.split('.'),
					tp = pa.shift(),							//	顶级包名
					cf = $.Package._paths[tp],
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
					P = $.Package._paths;
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
	_status: function(/*String*/packageName, /*String?*/statusText) {
		var P = $.Package._packages;
		if (!P[packageName]) {
			P[packageName] = {
				status: 'uninitialized',
				waits: []
			}
		}
		if (typeof(statusText) == 'string') {
			//	设置
			P[packageName]._status = statusText;
			
			//	如果是完成状态，那就进行相应的回调
			if (statusText == 'complete') {
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
		var P = $.Package._packages;
		if (!P[packageName]) {
			P[packageName] = {
				status: 'uninitialized',
				waits: []
			}
		}
		P[packageName].waits.push(requireObj);
	},
	
	_disconnect: function(/*String*/packageName, /*Object*/requireObj) {
		var P = $.Package._packages;
		if (!P[packageName]) {
			P[packageName] = {
				status: 'uninitialized',
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
		var P = $.Package,
				st = P._status(packageName),
				obj = P._packages[packageName];
		
		//	如果不是未初始化状态，那就不作任何处理
		if (st != 'uninitialized') return;
		
		//	标记相应值
		P._status(packageName, 'loading');
		
		//	加载
		var s = document.createElement("script");
		s.type = 'text/javascript';
		s.src = P.path(packageName);
		document.getElementsByTagName('head')[0].appendChild(s);
	},
	
	_Require: function(/*String*/packages, /*Function?*/callback) {
		this.packages = packages;
		this.callback = callback;
	}
	
}

$.Package._Require.prototype = {
	update: function() {
		var pa = this.packages;
		for (var i=pa.length-1, it; i>=0; i--) {
			it = pa[i];
			if ($.Package._status(it) == 'complete') {
				pa.splice(i, 1);
				$.Package._disconnect(it, this);
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

var $req = $.Package.require;

var $call = function(/*Function*/func, /*String?*/requires, /*Object*/options) {
	if (typeof(requires) == 'string' && requires.length > 0) {
		if (options && options.ele) 
		$req(requires, func);
	} else {
		func();
	}
}

//	注册当前的这个包
$.Package.register('$.base');

