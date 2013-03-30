/**
 * 对话框类
 * @author Jady
 * 
 * @base prototype(1.6)
 **/

var Dialog = Class.create();
Dialog.prototype = {
	initialize: function(options) {
		this.setOptions(options);
		this.build();
	},
	setOptions: function(options) {
		this.options = Object.extend({
			title: '',
			content: ''
		}, options || {});
	},
	build: function() {
		var opt = this.options;
		
		//	组成内容部分的html
		var html = '<div class="head clearfix">' +
					'<h3>消息</h3>' +
					'<div class="option"><a class="close" href="javascript:void(0)">关闭</a></div>' +
				'</div>' +
				'<div class="body clearfix">' +
					'<h4><img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_error.gif" alt="提示" align="absmiddle" />&nbsp;' + opt.title + '</h4>' +
					(typeof(opt.content) == "string" && opt.content.length > 0 ? ('<p>' + opt.content + '</p>') : '') +
				'</div>' +
				'<div class="foot clearfix">';
		if (opt.button && opt.button.length) {
			opt.button.each(function(btn) {
				if (btn) {
					html += '<input type="button" class="button" value="' + btn.value + '" />';
				}
			});
		}
		html +=	'</div>';
		
		//	创建对象
		this.container = Dom.create({
			tagName: 'div',
			className: 'popMsg',
			style: 'display:none;z-index:1005;',
			innerHTML: html,
			parent: document.body
		});
		this.btnCtr = this.container.childNodes[2];
		this.clsCtr = this.container.childNodes[0].childNodes[1];
		
		//	创建阴影层
		if (Prototype.Browser.IE) {
			this.coverBacker = Dom.create({
					tagName: 'iframe',
					style: 'position:absolute;display:none;z-index:1000;border-width:0px;left:0px;top:0px;-moz-opacity:0;FILTER: alpha(opacity=0);opacity: 0;-khtml-opacity: 0;',
					parent: document.body
				});
			this.coverBacker.frameBorder = "0";
		}
		this.cover = Dom.create({
			tagName: 'div',
			style: '-moz-opacity:0.7;FILTER: alpha(opacity=70);opacity: 0.7;-khtml-opacity: 0.7;position:absolute;display:none;z-index:1001;background-color:#333;left:0px;top:0px;',
			parent: document.body
		});
	},
	
	show: function() {
		var isIE = Prototype.Browser.IE;
		var docRect = {
			left: document.documentElement.scrollLeft,
			top: document.documentElement.scrollTop,
			width: isIE ? document.body.clientWidth : document.documentElement.clientWidth,
			height: isIE ? document.documentElement.offsetHeight : document.documentElement.clientHeight
		}
		var bodyRect = {
			left: 0,
			top: 0,
			width: isIE ? document.body.scrollWidth : document.documentElement.scrollWidth,
			height: isIE ? document.body.scrollHeight : document.documentElement.scrollHeight
		}
		var width = Math.max(docRect.width, bodyRect.width);
		var height = Math.max(docRect.height, bodyRect.height);
		
		//	显示cover
		this.cover.style.width = width + 'px';
		this.cover.style.height = height + 'px';
		if (Prototype.Browser.IE) {
			this.coverBacker.style.width = width + 'px';
			this.coverBacker.style.height = height + 'px';
			Element.show(this.coverBacker);
		}
		Element.show(this.cover);
		
		//	显示容器
		var ctrRect = Dom.getRect(this.container);
		var pos = {
			left: docRect.left + ((docRect.width - ctrRect.width) / 2),
			top: docRect.top + ((docRect.height - ctrRect.height) / 2)
		}
		Dom.setPos(this.container, pos);
		Element.show(this.container);
		
		//	绑定相应的方法
		this.closeEvent = this.close.bind(this);
		Event.observe(this.clsCtr, 'click', this.closeEvent);
		this.btnEvent = this.onClickBtn.bindAsEventListener(this);
		Event.observe(this.btnCtr, 'click', this.btnEvent);
	},
	onClickBtn: function(e) {
		var ele = Event.element(e);
		if (ele.parentNode && ele.parentNode == this.btnCtr) {
			var index = null;
			$A(ele.parentNode.childNodes).each(function(item, i) {
				if (ele == item) {
					index = i;
					throw $break;
				}
			});
			if (index != null && index < this.options.button.length && this.options.button[index]) {
				var obj = this.options.button[index];
				
				this.close();
				if (obj.script) {
					switch (typeof(obj.script)) {
						case 'string':
							eval(obj.script); 
							break;
						case 'function':
							obj.script();
							break;
					}
				}
				if (obj.url) {
					location.href = obj.url;
				}
			}
		}
	},
	close: function() {
		this.hide();
		this.destroy();
	},
	hide: function() {
		Element.hide(this.container);
		if (Prototype.Browser.IE) {
			Element.hide(this.coverBacker);
		}
		Element.hide(this.cover);
		Event.stopObserving(this.btnCtr, 'click', this.btnEvent);
		Event.stopObserving(this.clsCtr, 'click', this.closeEvent);
	},
	destroy: function() {
		Element.remove(this.container);
		if (Prototype.Browser.IE) {
			Element.remove(this.coverBacker);
		}
		Element.remove(this.cover);
		this.container = null;
		this.coverBacker = null;
		this.cover = null;
	}
}
Dialog.alert = function(title, content) {
	var options = {
		title: title,
		content: content,
		button: [
			{type: 'cancel', value: '确定'}
		]
	}
	var d = new Dialog(options);
	d.show();
}
Dialog.instance = function(options) {
	var d = new Dialog(options);
	d.show();
}