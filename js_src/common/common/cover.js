/**
 * ’⁄∏«≤„¿‡
 * @author Jady
 * 
 * @base prototype(1.6)
 **/

var Cover = Class.create({
	initialize: function() {
		if (Prototype.Browser.IE) {
			var i = document.createElement("iframe");
			i.style.cssText = 'position:absolute;display:none;z-index:1000;border-width:0px;left:0px;top:0px;-moz-opacity:0;FILTER: alpha(opacity=0);opacity: 0;-khtml-opacity: 0;';
			i.frameBorder = '0';
			this.iframe = document.body.appendChild(i);
		}
		var d = document.createElement("div");
		d.style.cssText = '-moz-opacity:0.7;FILTER: alpha(opacity=70);opacity: 0.7;-khtml-opacity: 0.7;position:absolute;display:none;z-index:1001;background-color:#333;left:0px;top:0px;';
		this.div = document.body.appendChild(d);
	},
	
	show: function() {
		var r = Dom.getBodyRect();
		if (this.iframe) {
			Dom.setRect(this.iframe, r);
			Element.show(this.iframe);
		}
		Dom.setRect(this.div, r); 
		Element.show(this.div);
	},
	
	hide: function() {
		Element.hide(this.div);
		if (this.iframe) Element.hide(this.iframe);
	}
});

Cover.show = function() {
	if (!Cover._cover) {
		Cover._cover = new Cover();
	}
	Cover._cover.show();
}
Cover.hide = function() {
	(Cover._cover && Cover._cover.hide());
}