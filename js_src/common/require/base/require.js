
$.Package = {
		
	/**
	 * ����ָ���İ����������֮�����ָ���Ļص�����
	 */
	require: function(/*String*/packages, /*Function*/callback) {
		var pa = packages.replace(/\s/g, '').split(','),		//	������Ҫ�İ�
				requires = [],																	//	����Ҫ�ȴ���ɿ���ʹ�õİ�
				loads = [],																			//	����Ҫȥ���صİ�
				P = $.Package;
		
		//	�ҵ�������Ҫ���صİ�����Ҫ�ȴ��İ�
		for (var i=0, il=pa.length, it; i<il; i++) {
			it = pa[i];	//	��������
			
			var st = P._status(it);
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
		var ro = new P._Require(requires, callback);		//	
		for (var i=0, il=requires.length, it; i<il; i++) {
			P._connect(requires[i], ro);
		}
		
		//	����������Ҫ�İ�
		for (var i=0, il=loads.length, it; i<il; i++) {
			it = loads[i];
			P._load(it);
		}
	},
	
	register: function(/*String*/packageName, /*Function?*/content, /*String?*/requires) {
		var P = $.Package,
				st = P._status(packageName);
				
		//	���ݰ��Ĳ�ͬ״̬���в�ͬ�Ĵ���
		if (st == 'complete') return;									//	����Ѿ������˸ð����Ǿ�ֱ�ӷ���
		
		//	�ж��Ƿ���Ҫ�ȼ���һЩ��
		if (typeof(requires) == 'string') {
			//	����Ҫ��ǰ���صİ�
			
			//	����״̬��ʶΪ���ڼ������
			P._status(packageName, 'loaded');				
			
			//	�Ǿ��ȼ�����Ӧ�İ�
			//	$req(requires, $.Package.register.bind(window, packageName, content));
			$req(requires, function() {P.register.call(window, packageName, content);});
		} else {
			//	����Ҫ��ǰ����һЩ��
			
			//	�������Ҫִ�е����ݣ��Ǿ���ִ��
			if (typeof(content) == 'function') {
				content();
			}
			
			//	��־��ǰ��Ϊ��ȫ���õ�״̬
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
	 * ���û���ȡ�ð���·��
	 */
	path: function(/*String*/name, value) {
		
		if (arguments.length == 1) {			//	��ʾҪȡ��ĳ������·����Ϣ
			var pa = packName.split('.'),
					tp = pa.shift(),							//	��������
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
		} else {													//	��ʾҪ���ð���·����Ϣ
			var pa = packName.split('.'),
					tp = pa.shift(),							//	��������
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
			_path: 	'http://js1.pp.sohu.com.cn/ppp/js/',		//	��ʾ������ĸ�·��
			anim: 	'http://js4.pp.sohu.com.cn/ppp/sns/'
		},
		
		blog: {
			_path: 	'http://js1.pp.sohu.com.cn/ppp/js/',		//	��ʾ������ĸ�·��
			common: ''
		}
		
		 */
		
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
	
	/**
	 * ȡ�û�������һ������״̬
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
			//	����
			P[packageName]._status = statusText;
			
			//	��������״̬���Ǿͽ�����Ӧ�Ļص�
			if (statusText == 'complete') {
				var wa = P[packageName].waits;
				for (var i=wa.length-1, it; i>=0; i--) {
					it = wa[i];
					it.update();
				}
			}
		} else {
			//	��ȡ
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
		
		//	�������δ��ʼ��״̬���ǾͲ����κδ���
		if (st != 'uninitialized') return;
		
		//	�����Ӧֵ
		P._status(packageName, 'loading');
		
		//	����
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
		
		//	����Ѿ�û���κ�������˵��������Ӧ���ļ��Ѿ����سɹ�
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

//	ע�ᵱǰ�������
$.Package.register('$.base');

