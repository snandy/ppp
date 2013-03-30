
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
			
	//	���ݰ��Ĳ�ͬ״̬���в�ͬ�Ĵ���
	if (st == 'complete') return;									//	����Ѿ������˸ð����Ǿ�ֱ�ӷ���
	
	//	�ж��Ƿ���Ҫ�ȼ���һЩ��
	if (typeof(requires) == 'string') {
		//	����Ҫ��ǰ���صİ�
		
		//	����״̬��ʶΪ���ڼ������
		$Packages.status(packageName, 'loaded');				
		
		//	�Ǿ��ȼ�����Ӧ�İ�
		//	$require(requires, $register.bind(window, packageName, content));
		$require(requires, function() {$register.call(window, packageName, content);});
	} else {
		//	����Ҫ��ǰ����һЩ��
		
		//	�������Ҫִ�е����ݣ��Ǿ���ִ��
		if (typeof(content) == 'function') {
			content();
		}
		
		//	��־��ǰ��Ϊ��ȫ���õ�״̬
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
	 * ����ָ���İ����������֮�����ָ���Ļص�����
	 */
	require: function(/*String*/packages, /*Function*/callback) {
		var pa = packages.replace(/\s/g, '').split(','),											//	������Ҫ�İ�
				requires = [],																//	����Ҫ�ȴ���ɿ���ʹ�õİ�
				loads = [];																		//	����Ҫȥ���صİ�
		
		//	�ҵ�������Ҫ���صİ�����Ҫ�ȴ��İ�
		for (var i=0, il=pa.length, it; i<il; i++) {
			it = pa[i];	//	��������
			
			var st = $Packages.status(it);
			if (st != 'complete') {
				if (st == 'uninitialized') loads.push(it);
				requires.push(it);
			}
		}
		
		//	���û����Ҫ���صİ����Ǿ͵��ûص�
		if (requires.length == 0) {
			if (typeof(callback) == 'function') setTimeout(callback, 0);
			return;
		}
		
		//	����Ҫ�ȴ��İ����ñ��λ
		var ro = new $Packages._Require(requires, callback);		//	
		for (var i=0, il=requires.length, it; i<il; i++) {
			$Packages.connect(requires[i], ro);
		}
		
		//	����������Ҫ�İ�
		for (var i=0, il=loads.length, it; i<il; i++) {
			it = loads[i];
			$Packages._load(it);
		}
	},
	
	/**
	 * ͨ��һ�������ƣ�ȡ������Ӧ��·��
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
	 * ȡ�û�������һ������״̬
	 */
	status: function(/*String*/packageName, /*String?*/statusText) {
		if (!$Packages._packages[packageName]) {
			$Packages._packages[packageName] = {
				status: 'uninitialized',
				waits: []
			}
		}
		if (typeof(statusText) == 'string') {
			//	����
			$Packages._packages[packageName].status = statusText;
			
			//	��������״̬���Ǿͽ�����Ӧ�Ļص�
			if (statusText == 'complete') {
				var wa = $Packages._packages[packageName].waits;
				for (var i=wa.length-1, it; i>=0; i--) {
					it = wa[i];
					it.update();
				}
			}
		} else {
			//	��ȡ
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
	 * ������ʾ����״̬���ܹ������¼���״̬��
	 * 	uninitialized: 	δ��ʼ��
	 * 	loading:				������
	 * 	loaded:					������ɣ����ǻ�����ʹ��
	 * 	complete:				�Ѿ���ȫ����
	 */
	_packages: {
		
	},
	
	_load: function(packageName) {
		var st = $Packages.status(packageName);
		var obj = $Packages._packages[packageName];
		
		//	�������δ��ʼ��״̬���ǾͲ����κδ���
		if (st != 'uninitialized') return;
		
		//	�����Ӧֵ
		$Packages.status(packageName, 'loading');
		
		//	����
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
		
		//	����Ѿ�û���κ�������˵��������Ӧ���ļ��Ѿ����سɹ�
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
			util.Tip.show(options.tip || '���ڼ�����...', options.ele);
			
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