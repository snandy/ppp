
(function() {

	var E = function(el) {
		this._el = el;
	}
	E.prototype = {
		
		attr: function(name, value) {
			var el = this._el || this;
			if (arguments.length == 1) {
				return el.getAttribute(name);
			} else {
				el.setAttribute(name, value);
				return this;
			}
		},
		
		html: function(value) {
			return this._property('innerHTML', value);
		},
		
		text: function(value) {
			return this._property(typeof(el.innerText) != 'undefined' ? 'innerText' : 'textContent', value);
		},
		
		val: function(value) {
			return this._property('value', value);
		},
		
		_property: function(name, value) {
			var el = this._el || this;
			if (typeof(value) == 'undefined') {
				return el[name];
			} else {
				el[name] = value;
				return this;
			}
		},
		
		
		css: function(name, value) {
			var el = this._el || this;
			if (arguments.length == 1) {
				return el.style[name];
			} else {
				el.style[name] = value;
				return this;
			}
		},
		
		pos: function() {
			
		},
		
		width: function(value) {
			return this._property('width', value);
		},
		
		height: function(value) {
			return this._property('height', value);
		},
		
		//	�������ֻ��IE�������ʹ�ã������ͷſǶ����Ԫ�ص�����
		depose: function() {
			this._el = null;
		},
		
		on: function(name, func) {
			$.Event.on(this._el || this, name, func);
			return this;
		},
		
		un: function(name, func) {
			$.Event.un(this._el || this, name, func);
			return this;
		}
	}
	
	//	�������Ԫ�ص�ԭ�ͣ��Ǿ�ֱ����չԭ�ͣ�Firefox, Safari, Webkit֧�֣�
	if (window.HTMLElement) {
		$.Object.extend(HTMLElement, E.prototype);
	}
	
	
	$.Element = {
		
		//	�������ֻ�ṩ��IE�µ�ԭ������ʹ��
		pack: function(el) {
			return new E(el);
		}
		
	}
	
})();



