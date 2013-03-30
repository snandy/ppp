/**
 * @fileoverview UWA Object
 * 
 * @author Jady Yang (jadyyang@sohu.com)
 * @version 1.0
 **/

UWA.Element = {
	addClassName: function(className) {
		if (!this.hasClassName(className)) this.className = (this.className.length==0 ? "" : (this.className + " ")) + className;
	},
	
	addContent: function(content) {
		switch (typeof(content)) {
			case "string":
			case "number":
				var div = document.createElement("div");
				div.innerHTML = content;
				this.appendChild(div);
				break;
			case "object":
				this.appendChild(content);
				break;
		}
		/*
		if (typeof(content) == "string" || typeof(content) == "number") {
		} else {
			this.appendChild(content);
		}
		*/
	},
	
	appendText: function(text) {
		var textN = document.createTextNode(text);
		this.appendChild(textN);
	},
	
	empty: function() {
		this.innerHTML = "";
	},
	
	getDimensions: function() {
		if (this.style.display != null && this.style.display != "none") {
			return {
				width: this.offsetWidth,
				height: this.offsetHeight
			}
		}
		
		var els = this.style;
		var originalVisibility = els.visibility;
		var originalPosition = els.position;
		var originalDisplay = els.display;
		els.position = 'absolute';
		els.visibility = 'hidden';
		els.display = 'block';
		var originalWidth = this.clientWidth;
		var originalHeight = this.clientHeight;
		els.display = originalDisplay;
		els.position = originalPosition;
		els.visibility = originalVisibility;
		return {
		    width: originalWidth,
		    height: originalHeight
		}
	},
	
	getElementsByClassName: function(className) {
		var childs = this.all ? this.all : this.getElementsByTagName("*");
		var eles = [];
		for (var i=0; i<childs.length; i++) {
			if (childs[i].className.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))) {
				eles.push(childs[i]);
			}
		}
		return eles;
	},
	
	getParent: function() {
		return this.parentNode;
	},
	
	getChildren: function() {
		return this.childNodes;
	},
	
	hasClassName: function(className) {
		return this.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)"));
	},
	
	hide: function() {
		this.style.display = "none";
	},
	
	remove: function() {
		this.parentNode.removeChild(this);
	},
	
	removeClassName: function(className) {
		 this.className = this.className.replace(new RegExp('(^|\\s)'+className+'(\\s|$)'), '$1').trim();
	},
	
	setText: function(text) {
		this.innerHTML = "";
		this.appendText(text);
	},
	
	setHTML: function(html) {
		this.innerHTML = html;
	},
	
	setContent: function(content) {
		this.innerHTML = "";
		this.addContent(content);
	},
	
	setStyle: function(property, value) {
		this.style[property] = value;
	},
	
	show: function() {
		this.style.display = "";
	},
	
	toggle: function() {
		this.style.display = this.style.display == "none" ? "" : "none";
	}
}

UWA.$element = function(element) {
	var obj = typeof(element) == "string" ? document.getElementById(element) : element;
	if (!obj.isUwaExtended) {
		Object.extend(obj, UWA.Element);
		obj.isUwaExtended = true;
	}
	return obj;
}