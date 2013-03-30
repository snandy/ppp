/**
 * Groj is a general request of json
 * @author Jady
 * 
 * @base prototype
 **/

var Groj = Class.create();
Groj.prototype = {
	initialize: function(url, options) {
	  //	判断是同域请求还是跨域请求
	  if (url.indexOf("/") == 0 || url.indexOf("http://" + document.domain) == 0) {
	    this.options = Object.clone(options);
	    this.options.evalJSON = 'force';
	    this._onSuccess = this.options.onSuccess;
	    this._onFailure = this.options.onFailure || Prototype.emptyFunction;
	    this.options.onSuccess = this.onAjaxSuccess.bind(this);
	    this.options.onFailure = this.onAjaxFailure.bind(this);
	    new Ajax.Request(url, this.options);
	  } else {
	    //	跨域请求
			this.url = url;
			this.setOptions(options);
			this.request();
	  }
	},
	
	onAjaxSuccess: function(transport) {
	  this._onSuccess(transport.responseJSON);
	},
	
	onAjaxFailure: function(error) {
		this._onFailure(error || {'status': -1, statusText: '请求超时'});
	},
	
	setOptions: function(options) {
		this.options = Object.extend({
			variable: '',
			charset: '',
			vn: 'vn',
			onSuccess: Prototype.emptyFunction,
			onFailure: Prototype.emptyFunction,
			step: 500,		//	循环问询间隔时间（毫秒为单位）
			timeout: 20001	//	超时时间（毫秒为单位）
		}, options || {});
		this.varArr = this.options.variable.split(".");
	},
	
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
} 