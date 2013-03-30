/**
 * 有关对象操作的一些方法
 * @author Jady
 * 
 * @base prototype
 **/

var Dom = {
	create: function(options) {
		var ele = document.createElement(options.tagName || "div");
		if (options.className) ele.className = options.className;
		if (options.style) ele.style.cssText = options.style;
		if (options.innerHTML) ele.innerHTML = options.innerHTML;
		if (options.href) ele.href = options.href;
		if (options.parent) $(options.parent).appendChild(ele);
		return ele;
	},
	
	setOpacity: function(element, value) {
		element = $(element);
		if (document.all) {
			element.style.filter = 'Alpha(Opacity=' + value + ');';
		} else {
			element.style.MozOpacity = value/100;
		}
	},
	
	getElementsByTagClassName: function(parent, tagName, className) {
		var eles = $(parent).getElementsByTagName(tagName);
		var returnEles = [];
		for (var i=0; i<eles.length; i++) {
			if (eles[i].className && eles[i].className == className) {
				returnEles.push(eles[i]);
			}
		}
		return returnEles;
	},

	getClientPos: function(element) {
		element = $(element);
		var pos = {
			left: element.clientLeft,
			top: element.clientTop
		}
		return pos;
	},

	getOffsetPos: function(element) {
		element = $(element);
		var pos = {
			left: 0,
			top: 0
		};
		
		if (element == document) {
			pos.left = document.documentElement.scrollLeft;
			pos.top = document.documentElement.scrollTop;
		} else {
			pos.left = element.offsetLeft;
			pos.top = element.offsetTop;
		}
		
		return pos;
	},

	/*
	getPos: function(el) {
		el = _$(el);
		var pos = this.getOffsetPos(el);
		while (el = el.offsetParent) {
			var tempPos = this.getOffsetPos(el);
			pos.left += tempPos.left;
			pos.top += tempPos.top;
		}
		
		return pos;
	},
	*/
	getPos: function(element) {
		element = $(element);
		
		var pos = this.getOffsetPos(element);
		while (element = element.offsetParent) {
			var tempPos = this.getOffsetPos(element);
			pos.left += tempPos.left;
			pos.top += tempPos.top;
		}
		
		return pos;
	},
	
	getCenterPos: function(el) {
		//	取得对象的大小
		var wh = Dom.getWH(el);
		
		//	取得document的Rect
		var doc = Dom.getDocRect();
		
		return {
			left: doc.left + (doc.width > wh.width ? ((doc.width - wh.width) / 2) : 0),
			top: doc.top + (doc.height > wh.height ? ((doc.height - wh.height) / 2) : 0)
		}
	},
	
	getDocRect: function() {
		var r = {
			left: Math.max(document.body.scrollLeft, document.documentElement.scrollLeft),
			top: Math.max(document.body.scrollTop, document.documentElement.scrollTop),
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		}
		r.right = r.left + r.width;
		r.bottom = r.top + r.height;
		return r;
	},
	
	getBodyRect: function() {
		var r = {
			left: 0,
			top: 0,
			width: Math.max(document.body.clientWidth, document.documentElement.clientWidth, document.body.scrollWidth),
			height: Math.max(document.body.clientHeight, document.documentElement.clientHeight, document.body.scrollHeight)
		}
		r.right = r.width;
		r.bottom = r.height;
		return r;
	},
	
	getScrollPos: function(el) {
		el = _$(el);
		return {
			left: el.scrollLeft,
			top: el.scrollTop
		};
	},
	
	//	取得一个对象的高度和宽度
	getWH: function(el) {
		el = _$(el);
		if (el.style.display == 'none') {
			Dom.setOpacity(el, 0);
			Element.show(el);
			var w = el.offsetWidth;
			var h = el.offsetHeight;
			Element.hide(el);
			Dom.setOpacity(el, 100);
		} else {
			var w = el.offsetWidth;
			var h = el.offsetHeight;
		}
		
		return {
			width: w,
			height: h
		};
	},
	
	getRect: function(el) {
		var rect = this.getPos(el);
		var wh = this.getWH(el);
		rect.width = wh.width;
		rect.height = wh.height;
		rect.right = rect.left + rect.width;
		rect.bottom = rect.top + rect.height;
		
		return rect;
	},
	
	getOffsetRect: function(element) {
		var rect = this.getOffsetPos(element);
		var wh = this.getWH(element);
		rect.width = wh.width;
		rect.height = wh.height;
		rect.right = rect.left + wh.width;
		rect.bottom = rect.top + wh.height;
		return rect;
	},
	
	getClientRect: function(element) {
		var rect = this.getClientPos(element);
		var wh = this.getClientWH(element);
		rect.width = wh.width;
		rect.height = wh.height;
		rect.right = rect.left + rect.width;
		rect.bottom = rect.top + rect.height;
		return rect;
	},
	
	getScrollWH: function(el) {
		el = _$(el);
		return {
			width: el.scrollWidth,
			height: el.scrollHeight
		};
	},
	
	getClientWH: function(el) {
		el = _$(el);
		return {
			width: el.clientWidth,
			height: el.clientHeight
		};
		/*
		if(element == document) element = document.documentElement;
		if(element == document.body && !document.all) {
			element = document.documentElement;
			wh.width = element.scrollWidth;
			wh.height = element.scrollHeight;
		} else {
			wh.width = element.clientWidth;
			wh.height = element.clientHeight;
		}
		return wh;
		*/
	},

	setPos: function(element, pos) {
		element.style.left = pos.left + "px";
		element.style.top = pos.top + "px";
	},
	
	setRect: function(el, rect) {
		el = _$(el);
		if (typeof(rect.left) == "number") el.style.left = rect.left + 'px';
		if (typeof(rect.top) == "number") el.style.top = rect.top + 'px';
		if (typeof(rect.width) == "number") el.style.width = rect.width + 'px';
		if (typeof(rect.height) == "number") el.style.height = rect.height + 'px';
	}
}