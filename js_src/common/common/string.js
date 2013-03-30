Object.extend(String.prototype, {
	
	getFullHTML: function() {
		var div = document.createElement("div");
		div.innerHTML = this;
		return div.innerHTML;
	},
	
	lengthU: function() {
		return this.replace(/[^\x00-\xff]/g,"**").length;
	},
	
	limitU: function(len) {
		var str = this, leftLen = 2, leftStr = '..';
		if (this.length > len) {
			str = this.substr(0, len);
			if (str.lengthU() == len) {
				return str.substr(0, len-leftLen) + leftStr;
			}
		}
		
		if (str.lengthU() > len) {
			var reg = new RegExp("[^\x00-\xff]");
			var index = Math.floor(str.length/2);
			var needLength = len - leftLen - str.substr(0, index).lengthU();
			while (needLength > 0) {
				needLength -= reg.test(str.substr(index, 1))?2:1;
				if (needLength >= 0) {
					index++;
				}
			}
			str = str.substr(0, index) + leftStr;
		}	
		return str;
	},

  	// Todd Lee
	convertTextToHTML: function() {
		return (this.replace(/\&/g, "&").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r\n|\n|\r/g, "<br \/>").replace(/  /g, "&nbsp; "));
	},
	convertHTMLToText: function() {
		return (this.replace(/(\s*(\r\n|\n|\r)\s*)/g, "").replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/<br\s*\/?>/ig,"\r\n").replace(/\&nbsp;/g, " "));
	},
	trim: function() { 
		return (this.replace(/(^\s*)|(\s*$)/g, ""));
	}
});