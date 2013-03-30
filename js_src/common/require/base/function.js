
Object.extend(Function.prototype, {
	
	before: function() {
		var method = this, args = [];
		for (var i=0, il=arguments.length; i<il; i++) {
			args.push(arguments[i]); 
		}
		return function() {
			for (var i=0, il=arguments.length; i<il; i++) {
				args.push(arguments[i]); 
			}
			method.apply(this, args);
		}
	},
	
	after: function() {
		var method = this, args = [];
		for (var i=0, il=arguments.length; i<il; i++) {
			args.push(arguments[i]); 
		}
		return function() {
			for (var i=0, il=arguments.length; i<il; i++) {
				args.unshift(arguments[i]); 
			}
			method.apply(this, args);
		}
	},
	
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
	
	bindAfter: function() {
		var method = this, _this = arguments[0], args = [];
		for (var i=1, il=arguments.length; i<il; i++) {
			args.push(arguments[i]); 
		}
		return function() {
			for (var i=0, il=arguments.length; i<il; i++) {
				args.unshift(arguments[i]); 
			}
			method.apply(_this, args);
		}
	},
	
	wrap: function(before) {
		var method = this;
		return function() {
			var args = [method];
			for (var i=0, il=arguments.length; i<il; i++) {
				args.push(arguments[i]); 
			}
			before.apply(this, args);
		}
	},
	
	timeout: function(time) {
		return setTimeout(this, time * 1000);
	},
	
	interval: function(time) {
		return setInterval(this, time * 1000);
	}
	
});