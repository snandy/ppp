/**
 * 学校选择器
 * @author Jady
 * 
 * @base prototype Area Groj Time Tween
 **/
 
var SchoolSel = Class.create();
SchoolSel.prototype = {
	initialize: function(options) {
		
		/**
		 * 其中可以设置的属性包括：
		 *		type: 学校类型，6为大学，4为中学，1为小学
		 *		textEle: 显示学校名称的对象
		 *		valueEle: 显示学校编号的对象
		 **/
		this.options = Object.extend({
				type: 6
			}, options);
		
		this.colCount = 3;
		this.rowCount = 15;
		this.size = this.colCount * this.rowCount;
		
		this.createSelector();
		this.initPager();
		this.initSelector();
	},
	
	createSelector: function() {
		var innerHTML = '' +
			'<table width="100%" cellspacing="0" cellpadding="0" border="0" class="popLayer"><tr><td class="lt">&nbsp;</td><td class="mt">&nbsp;</td><td class="rt">&nbsp;</td></tr><tr><td class="lm">&nbsp;</td><td class="mm">' +
				'<div class="mod"><div class="head clearfix"><h3>请选择学校所在的省市：' +
				'<select></select>&nbsp;' +
				(this.options.type != 6 ? '<select></select>' : '') +
				'</h3><div class="option"><a href="#" class="close">关闭</a></div></div>' +
				'<div class="body clearfix">' +
				'<div class="SchoolSelectorCtr"></div>' +
				'<hr />' +
				'<div class="pageNav"></div>' +
				'<div style="margin:-22px 0 0 0"><a href="http://q.sohu.com/forum/21/topic/1504090" target="_blank">没有您所在的学校？</a></div></div></div>' +
			'</td><td class="rm">&nbsp;</td></tr><tr><td class="lb">&nbsp;</td><td class="mb">&nbsp;</td><td class="rb">&nbsp;</td></tr></table>';
			
		if (Prototype.Browser.IE) {
			this.backer = Dom.create({
					tagName: 'iframe',
					style: 'position:absolute;display:none;z-index:1000;border-width:0px;',
					parent: document.body
				});
			this.backer.frameBorder = "0";
		}
		var selector = this.selector = Dom.create({
				tagName: 'div',
				className: 'selecter',
				style: 'position:absolute;display:none;z-index:1005;',
				innerHTML: innerHTML,
				parent: document.body
			});
		var eles = selector.getElementsByTagName("select");
		this.provinceEle = eles[0];
		if (this.options.type != 6) this.cityEle = eles[1];
		this.closeEle = selector.getElementsByTagName("a")[0];
		this.contentEle = Dom.getElementsByTagClassName(selector, "div", "SchoolSelectorCtr")[0];
		this.pageEle = Dom.getElementsByTagClassName(selector, "div", "pageNav")[0];
	},
	
	initSelector: function() {
		//	绑定相应的事件
		var areaEle = this.getAreaEle();
		Event.observe(areaEle, "change", this.areaChange.bind(this));
		Event.observe(this.closeEle, "click", this.hide.bind(this));
		Event.observe(this.contentEle, "click", this.observeSelect.bindAsEventListener(this));
		
		//	默认显示第一个
		if (this.cityEle) {
			Area.bindSelector({ele: this.provinceEle}, {ele: this.cityEle});
			this.provinceEle.selectedIndex = 1;
			Area.onChangeProv({ele: this.cityEle}, this.provinceEle);
			this.cityEle.selectedIndex = 1;
		} else {
			Area.bindProvince({ele: this.provinceEle});
			this.provinceEle.selectedIndex = 1;
		}
		this.areaChange();
	},
	
	initPager: function() {
		this.pager = new Pager(this.pageEle, this.size, this.gotoPage.bind(this));
		this.pager.type = 'search';
		this.pager.pageRange = 3;
	},
	
	observeSelect: function(e) {
		var ele = Event.element(e);
		if (ele && ele.tagName && ele.tagName.toLowerCase() == "a" && typeof(ele.getAttribute("value")) == "string" && ele.getAttribute("value").length > 0) {
			var value = ele.getAttribute("value");
			var text = ele.innerHTML;
			this.textEle.value = text;
			this.valueEle.value = value;
			this.hide();
		} 
	},
	
	bindEle: function(eles) {
		this.textEle = eles.textEle;
		this.valueEle = eles.valueEle;
	},
	
	areaChange: function(areaEle) {
		var areaId = this.getAreaEle().value;
		this.clearPager();
		if (areaId == "0") {
			this.needSelectArea();
		} else {
			this.requestSchool(areaId);
		}
	},
	
	getAreaEle: function() {
		return this.options.type == 6 ? this.provinceEle : this.cityEle;
	},
	
	requestSchool: function(areaId, pageNo) {
		this.contentEle.innerHTML = '加载中...';
		var vn = "school_" + Time.now();
		var url = 'http://profile.blog.sohu.com/service/schoolJson.htm?' + ((this.options.type != 6) ? ('city=' + areaId) : ('prov=' + areaId)) + '&cate=' + this.options.type + '&st=' + (typeof(pageNo) == "number" ? (pageNo * this.size) : 0) + '&sz=' + this.size ;//+ '&vn=' + vn;
		var _this = this;
		setTimeout(function() {
			new Groj(url, {
				variable: vn,
				onSuccess: _this.getSchoolSuccess.bind(_this),
				onFailure: _this.getSchoolFailure.bind(_this)
			});
		}, 5);
		this.resizeBacker();
	},
	
	gotoPage: function(no) {
		this.requestSchool(this.getAreaEle().value, no-1);
	},
	
	/*
	observePage: function(e) {
		var ele = Event.element(e);
		if (ele && ele.tagName && ele.tagName.toLowerCase() == "a" && typeof(ele.getAttribute("value")) == "string" && ele.getAttribute("value").length > 0) {
			var value = ele.getAttribute("value");
			this.requestSchool(this.getAreaEle().value, parseInt(value));
		} 
		return false;
	},
	*/
	
	getSchoolSuccess: function(data) {
		if (data.status == 0) {
			this.listSchools(data.data);
			this.resetPager(data);
		}
		this.resizeBacker();
	},
	
	getSchoolFailure: function() {
		this.contentEle.innerHTML = '请求信息失败';
		this.resizeBacker();
	},
	
	listSchools: function(schools) {
		var str = '';
		if (schools.length == 0) {
			str = '没有学校';
		} else {
			str += '<table width="100%" border="0" cellspacing="4" cellpadding="0">';
			var canLoop = true;
			var trIndex = 0;
			var schoolsLength = schools.length;
			while (canLoop) {
				str += '<tr>';
				
				var startIndex = trIndex * this.colCount;
				for (var i=0; i<this.colCount; i++) {
					str += '<td>';
					if (startIndex + i < schoolsLength) {
						str += '<a href="javascript:void(0);" value="' + schools[startIndex + i][0] + '">' + schools[startIndex + i][1] + '</a>';
					} else {
						str += '&nbsp;';
						canLoop = false;
					}
					str += '</td>';
				}
				
				if (startIndex + this.colCount == schoolsLength) canLoop = false;
				trIndex ++;
				
				str += '</tr>';
			}
		}
		this.contentEle.innerHTML = str;
	},
	
	needSelectArea: function() {
		this.contentEle.innerHTML = '请选择省市';
		this.resizeBacker();
	},
	
	resetPager: function(data) {
		var count = data.count;
		var start = data.start;
		var pageNow = (start / this.size) + 1;
		this.pager.goto(pageNow, count);
	},
	
	clearPager: function() {
		this.pageEle.innerHTML = '&nbsp;';
	},
	
	hide: function() {
		Element.hide(this.selector);
		if (this.backer) {
			Element.hide(this.backer);
		}
		return false;
	},
	
	show: function() {
		//	首先获取应该显示的位置
		//	var docRect = Dom.getRect(document);
		var docRect = Dom.getDocRect();
		var textRect = Dom.getRect(this.textEle);
		var selRect = Dom.getRect(this.selector);
		var pos = {
			left: Math.max(docRect.left + ((docRect.width - selRect.width)/2), 0),
			top: textRect.bottom + 5
		}
		/*
		var pos = Position.cumulativeOffset(this.textEle);
		pos.left += 5;
		*/
		
		Dom.setPos(this.selector, pos);
		Element.show(this.selector);
		if (this.backer) {
			Dom.setPos(this.backer, pos);
			Element.show(this.backer);
			this.resizeBacker();
		}
	},
	
	resizeBacker: function() {
		if (this.backer) {
			var rect = Dom.getRect(this.selector);
			Dom.setPos(this.backer, rect);
			this.backer.style.width = rect.width + 'px';
			this.backer.style.height = rect.height + 'px';
		}
	}
}

SchoolSel.show = function(textEle, valueEle, schoolType) {
	var selector = null;
	var selectors = SchoolSel.selectors;
	if (!selectors) {
		selectors = SchoolSel.selectors = {};
	} else {
		for (var item in selectors) {
			if (selectors[item].hide) {
				selectors[item].hide();
			}
		}
	}
	if (!selectors["" + schoolType]) {
		selectors["" + schoolType] = new SchoolSel({type: schoolType, textEle:textEle, valueEle:valueEle});
	}
	selector = selectors["" + schoolType];
	selector.bindEle({textEle:textEle, valueEle:valueEle});
	selector.show();
	Tween.twinkle(selector.selector);
}