
$.Ajax = {
	
	request: function(url, callback, options) {
		var trans = this._getTransport();
		options = Object.extend(options || {}, {
			method:       'get'
		});
		trans.open(options.method, url, options.async);
		trans.onreadystatechange = this._onStateChange.curry(trans, url, callback, options);
		trans.send(options.data || null);
	},
	
	text: function(url, callback, options) {
		if (typeof(callback)) callback = callback.wrap(this._successText);
		this.request(url, callback, options);
	},
	
	json: function(url, callback, options) {
		if (typeof(callback)) callback = callback.wrap(this._successJson);
		this.request(url, callback, options);
	},
	
	xml: function(url, callback, options) {
		if (typeof(callback)) callback = callback.wrap(this._successXml);
		this.request(url, callback, options);
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
  
  _onStateChange: function(trans, url, callback, options) {
  	if (state == 4) {
  		var s = trans.status;
  		if (!!s && s >= 200 && s < 300) {
  			if (typeof(callback) == 'function') callback(trans);
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

$.Xhr = {
	
	load: function(url, type, options) {
		
	},
	
	json: function(url, callback, name, options) {
		
	}
	
}



	request: function() {
		if (this.isVarValid()) {
			this.onResult();
			return;
		}
		
		//	判断链接地址中是否存在vn参数，没有的话加上相应的vn参数
		if (this.url.indexOf('?' + this.options.vn + '=') == -1 && this.url.indexOf('&' + this.options.vn + '=') == -1) {
			this.url += (this.url.indexOf('?') == -1 ? '?' : '&') + this.options.vn + '=' + this.options.variable;
		}
		
		var oHead = document.getElementsByTagName('head')[0];
		this.link = document.createElement('script');
		this.link.src = this.url;
		this.link.type = 'text/javascript';
		if (this.options.charset) {
			this.link.charset = this.options.charset;
		}
		this.timer = window.setInterval(this.onCheck.bind(this), this.options.step);
		oHead.appendChild(this.link);
		
		//	设置超时回调函数
		this.outTimer = window.setTimeout(this.onTimeout.bind(this), this.options.timeout)
	},
	
	isVarValid: function() {
		var vari = this.getVar();
		return (typeof(vari) != "undefined" && vari != null);
	},
	
	getVar: function() {
		var vari = window;
		this.varArr.each(function(item) {
			vari = vari[item];
			if (typeof(vari) == "undefined" || vari == null) throw $break;
		});
		return vari;
	},
	
	onCheck: function() {
		if (this.isVarValid()) this.onResult();
		else return;
	},
	
	onTimeout: function() {
		this.clearTimer();
		if (this.link) Element.remove(this.link);
		if (this._onFailure) this._onFailure();
		else if (this.options.onFailure) this.options.onFailure();
	},
	
	onResult: function() {
		this.clearTimer();
		this.options.onSuccess(this.getVar());
	},
	
	clearTimer: function() {
		if (this.timer) {
			window.clearInterval(this.timer);
			this.timer = null;
		}
		window.clearTimeout(this.outTimer);
		this.outTimer = null;
	}