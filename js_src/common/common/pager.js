/***
 *	@fileoverview 提供页码显示和翻页服务
 * 
 *	@author jadyyang@sohu.com
 *	@version 0.2
 **/

/***
 *	依赖类：
 *		prototype 1.4
 **/
 
/***
 *	创建一个翻页对象，通过此类来实现各种类型的翻页服务
 *	参数形态：element, size, pageFunc
 *	@class 代表一个翻页对象，通过这个类来控制翻页信息。使用过程：
 *		1. 首先建立一个这样的一个翻页对象，如：var a = new Pager("test", 10, goPage);
 *		2. 用户点击某一页之后，系统会调用用户制定的方法——pageFunc;
 *		3. 如果取得新的数量，并且到达了新的位移，调用Pager.goPage或者goStart方法
 *			这样让翻页数据进行更新，如：goto(4);
 *	@constructor 构造函数
 *	@param {ElementOrID} element 一个HTMLElement对象或者其ID号
 *	@param {Number} size 一页要显示的信息数量
 *	@param {Function} pageFunc 当用户要跳到某个页码时要调用的方法，
 *		翻页对象调用此方法时回传送两个数据：
 *			pageNo {Number} 用户点击的为第几页
 *			pager {Pager} 现在的翻页对象
 *	@return 返回新创建的翻页对象
 **/
function Pager(element, size, pageFunc) {
	
	//	---------------------  变量定义区  ---------------------
	
	//	配置变量
	/***
	 *	一个HTMLElement对象或者其ID号
	 *	@type ElementOrID
	 **/
	this.element = element ? (element.constructor == Array ? $.apply(null, element) : [$(element)]) : [];
	
	/***
	 *	一页要显示的信息数量
	 *	@type Number
	 **/
	this.size = size;
	/***
	 *	当用户要跳到某个页码时要调用的方法，
	 *	翻页对象调用此方法时回传送两个数据：
	 *		pageNo {Number} 用户点击的为第几页
	 *		pager {Pager} 现在的翻页对象
	 *	@type Function
	 **/
	this.pageFunc = pageFunc;
	
	//	翻页需要的相关信息
	/***
	 *	包含的总数量
	 *	@type Number
	 **/
	this.itemCount = 0;
	/***
	 *	页数量
	 *	@type Number
	 **/
	this.pageCount = 0;
	/***
	 * 页显示范围
	 * @type Number
	 **/
	this.pageRange = 2;
	/***
	 *	现在为第几页
	 *	@type Number
	 **/
	this.pageNow = 0;
	
	/**
	 * 页面表示类型，有两种：start或者page
	 */
	this.pageType = "page";
	
	/***
	 *	翻页类型现在有四种类型：
	 * 		normal search short mini
	 *	@type String
	 **/
	this.type = 'normal';
	
	//	---------------------  初始化部分  ---------------------
	//	绑定所有翻页对象的事件
	this.bindPageEvents();
}

/***
 *	绑定所有翻页数据所在元素的翻页处理事件
 *	@type
 **/
Pager.prototype.bindPageEvents = function() {
	for (var i=0; i<this.element.length; i++) {
		this.element[i].onclick = this.pageEvent.bind(this);
	}
	//	Event.observe(this.element, "click", this.pageEvent.bindAsEventListener(this));
};

/***
 *	翻页对象父对象的单击处理方法
 *	@param {Event} e 事件对象
 *	@type
 **/
Pager.prototype.pageEvent = function(e) {
	//	首先判断用户点击了有效的翻页对象
	e = e || window.event;
	var element = Event.element(e);
	
	//	判断是否是有效的翻页对象
	if (element.tagName.toLowerCase() == "a") {
		var goNumber = element.getAttribute("page");
		if (goNumber) {
			this.pageFunc((this.pageType == "page" ? parseInt(goNumber) : ((parseInt(goNumber) - 1) * this.size)), element, this);
		}
	}
};

/***
 *	设置信息的总数量
 *	@param {Number} count 新的总数量
 *	@type
 **/
Pager.prototype.setCount = function(count) {
	this.itemCount = count;
	this.pageCount = Math.ceil(this.itemCount/this.size);
	this.refresh();
};

/***
 *	跳到某一页。
 *	参数形态：start [, count]
 *	@param {Number} start 当前开始的位移
 *	@param {Number} count 新的总数量
 *	@type
 **/
Pager.prototype.goStart = function(start, count) {
	this.pageNow = (start / this.size) + 1;
	this.pageType = "start";
	if (typeof(count) == "number") {
		this.itemCount = count;
		this.pageCount = Math.ceil(this.itemCount/this.size);
	}
	this.refresh();
};

/***
 *	跳到某一页。
 *	参数形态：pageNo [, count]
 *	@param {Number} pageNo 要去的页码，从1开始
 *	@param {Number} count 新的总数量
 *	@type
 **/
Pager.prototype.goPage = Pager.prototype["goto"] = function(pageNo, count) {
	this.pageNow = pageNo;
	this.pageType = "page";
	if (typeof(count) == "number") {
		this.itemCount = count;
		this.pageCount = Math.ceil(this.itemCount/this.size);
	}
	this.refresh();
};

/***
 *	重新计算，根据最新的数据刷新页面上的翻页信息
 *	@type
 **/
Pager.prototype.refresh = function() {
	//	首先保证跳转到的页码在总页码范围之内
	if(this.pageNow < 1) {
		this.pageNow = 1;
	}
	if(this.pageNow > this.pageCount) {
		this.pageNow = this.pageCount;
	}
	
	//	调用展现方法取得生成的展现字符串
	var str = this["display_" + this.type]();
	
	//	把生成的翻页数据添加到对象中
	for (var i=0; i<this.element.length; i++) {
		this.element[i].innerHTML = str;
	}
	//	this.element.innerHTML = str;
};

/***
 *	取得显示翻页的展示字符串
 *	@type String
 *	@return 返回已经组织好的包含翻页信息的字符串，最完整的格式如下（HTML代码）：
 *		<a href="#number_4">上一页</a>
 *		<a href="#number_1">1</a>
 *		...
 *		<a href="#number_3">3</a>
 *		<a href="#number_4">4</a>
 *		<a href="#number_5">5</a>
 *		<a href="#number_6">6</a>
 *		<a href="#number_7">7</a>
 *		...
 *		<a href="#number_10">10</a>
 *		<a href="#number_6">下一页</a>
 **/
/*
Pager.prototype.display1 = function() {
	var startPage = 0;		//	连续开始的那一页
	var endPage = 0;		//	连续结束的那一页
	
	var pageStr = '';
	if (this.pageCount > 1) {
		//	如果有页数的话计算上面的这些变量
		if(this.pageCount > 0) {
			//	首先确定连续开始页和结束页
			startPage = this.pageNow - this.pageRange;
			if(startPage < 1) {
				startPage = 1;
				endPage = startPage + (2 * this.pageRange);
			} else {
				endPage = this.pageNow + this.pageRange;
			}
			if(endPage > this.pageCount) {
				endPage = this.pageCount;
				startPage = endPage - (2 * this.pageRange);
				if(startPage < 1) startPage = 1;
			}
		}
		
		var pageNow = this.pageNow;
		var pageHash = this.pageHash;
		var getPageStr = function(page, showStr, className) {
			var str = '';
			if (page == pageNow) {
				str = '<span class="pageNo pageCurrent">' + showStr + '</span>';
			} else {
				if (pageHash) {
					str = '<a href="#' + pageHash + page + '" page="' + page + '" class="' + className + '">' + showStr + '</a>';
				} else {
					str = '<a href="#n' + page + '" page="' + page + '" onclick="return false;" class="' + className + '">' + showStr + '</a>';
				}
			}
			return str;
		};
		
		//	根据上面的这些翻页变量生成翻页代码
		//	--	确定是否显示上一页
		if(this.pageNow > 1) pageStr += getPageStr(this.pageNow-1, "上一页", 'pageLast');
		//	--	确定是否显示第一页和前省略号
		if(startPage > 1) {
			pageStr += getPageStr(1, 1, 'pageNo');
			if(startPage > 2) pageStr += '...';
		}
		//	--	循环显示中间的连续页
		if(this.pageCount > 0) {
			for(var i=startPage; i<=endPage; i++) {
				pageStr += getPageStr(i, i, 'pageNo');
			}
		}
		//	--	确定是否显示最后一页和后省略号
		if(endPage < this.pageCount) {
			if(endPage < (this.pageCount - 1)) pageStr += '...';
			pageStr += getPageStr(this.pageCount, this.pageCount, 'pageNo');
		}
		//	--	确定是否显示下一页
		if(this.pageNow < this.pageCount) pageStr += getPageStr(this.pageNow+1, "下一页", 'pageNext');
	}
	
	return pageStr;
};
*/

Pager.prototype._getRangeObj = function() {
	if (this.pageCount < 1) return null;
	
	var now = this.pageNow,
			count = this.pageCount,
			range = this.pageRange,
			start = false,
			end = false,
			first = false,
			last = false,
			pre = false,
			end = false;
	
	if (count > 1) {
		var start = now - range;
		if (start < 1) {
			start = 1;
			var end = start + (2 * range);
		} else {
			var end = now + range;
		}
		if (end > count) {
			end = count;
			start = end - (2 * range);
			if (start < 1) start = 1;
		}
		
		var first = start > 1 ? 1 : false;
		var last = end < count ? count : false;
		var pre = now > 1 ? (now - 1) : false;
		var next = now < count ? (now + 1) : false; 
	}
	
	return {
		now: now,
		count: count,
		range: range,
		
		start: start,
		end: end,
		
		first: first,
		last: last,
		pre: pre,
		next: next
	}
}

Pager.prototype._getPageStr = function(page, showStr, isNumber, now) {
	var str = '';
	if (page == now) {
		str = '<span>' + showStr + '</span>';
	} else {
		str = '<a href="javascript:void(0)" page="' + page + '" >' + (isNumber ? '[' : '') + showStr + (isNumber ? ']' : '') + '</a>';
	}
	return str;
}

/***
 *	普通版翻页
 *	@type String
 *	@return 返回已经组织好的包含翻页信息的字符串
 **/
Pager.prototype.display_normal = function() {
	var page = this._getRangeObj();
	
	var arr = [];
	if (!page) arr.push('&nbsp;');
	else {
		
		//	显示所有页数
		arr.push('共' + page.count + '页');
		if (page.count > 1) {
			arr.push('&nbsp;|');
			
			//	确定是否显示第一页
			if (page.first) arr.push(this._getPageStr(1, '第一页', false, page.now));
			//	确定是否显示上一页
			if (page.pre) arr.push(this._getPageStr(page.pre, '上一页', false, page.now));
			
			if (page.start && page.end) {
				for (var i=page.start; i<=page.end; i++) {
					arr.push(this._getPageStr(i, i, true, page.now));
				}
			}
			
			//	确定是否显示下一页
			if (page.next) arr.push(this._getPageStr(page.next, '下一页', false, page.now));
			//	确定是否显示上一页
			if (page.last) arr.push(this._getPageStr(page.last, '最末页', false, page.now));
		}
	}
	
	return arr.join('');
	/*
	var startPage = 0;		
	var endPage = 0;		
	
	var pageStr = '';
	if (this.pageCount > 1) {
		//	如果有页数的话计算上面的这些变量
		if(this.pageCount > 0) {
			//	首先确定连续开始页和结束页
			startPage = this.pageNow - this.pageRange;
			if (startPage < 1) {
				startPage = 1;
				endPage = startPage + (2 * this.pageRange);
			} else {
				endPage = this.pageNow + this.pageRange;
			}
			if (endPage > this.pageCount) {
				endPage = this.pageCount;
				startPage = endPage - (2 * this.pageRange);
				if(startPage < 1) startPage = 1;
			}
		}
		
		var pageNow = this.pageNow;
		var getPageStr = function(page, showStr, isNumber) {
			var str = '';
			if (page == pageNow) {
				str = '<span>' + showStr + '</span>';
			} else {
				str = '<a href="javascript:void(0)" page="' + page + '" >' + (isNumber ? '[' : '') + showStr + (isNumber ? ']' : '') + '</a>';
			}
			return str;
		};
		
		//	根据上面的这些翻页变量生成翻页代码
		//	--	确定是否显示上一页
		if(this.pageNow > 1) pageStr += getPageStr(this.pageNow-1, "上一页", false);
		//	--	循环显示中间的连续页
		if(this.pageCount > 0) {
			for(var i=startPage; i<=endPage; i++) {
				pageStr += getPageStr(i, i, true);
			}
		}
		//	--	确定是否显示下一页
		if(this.pageNow < this.pageCount) pageStr += getPageStr(this.pageNow+1, "下一页", false);
	} else {
		pageStr = '&nbsp;';
	}
	
	return pageStr;
	*/
};

/***
 *	取得显示翻页的展示字符串
 *	@type String
 *	@return 返回已经组织好的包含翻页信息的字符串，最完整的格式如下（HTML代码）：
 *		<a href="#number_4">上一页</a>
 *		<a href="#number_3">3</a>
 *		<a href="#number_4">4</a>
 *		<a href="#number_5">5</a>
 *		<a href="#number_6">6</a>
 *		<a href="#number_7">7</a>
 *		<a href="#number_6">下一页</a>
 **/
Pager.prototype.display_search = function() {
	var startPage = 0;		//	连续开始的那一页
	var endPage = 0;		//	连续结束的那一页
	
	var pageStr = '';
	if (this.pageCount > 1) {
		//	如果有页数的话计算上面的这些变量
		if(this.pageCount > 0) {
			//	首先确定连续开始页和结束页
			startPage = this.pageNow - this.pageRange;
			if (startPage < 1) {
				startPage = 1;
				endPage = startPage + (2 * this.pageRange);
			} else {
				endPage = this.pageNow + this.pageRange;
			}
			if (endPage > this.pageCount) {
				endPage = this.pageCount;
				startPage = endPage - (2 * this.pageRange);
				if(startPage < 1) startPage = 1;
			}
		}
		
		var pageNow = this.pageNow;
		var getPageStr = function(page, showStr, isNumber) {
			var str = '';
			if (page == pageNow) {
				str = '<span>' + showStr + '</span>';
			} else {
				str = '<a href="javascript:void(0)" page="' + page + '" >' + (isNumber ? '[' : '') + showStr + (isNumber ? ']' : '') + '</a>';
			}
			return str;
		};
		
		//	根据上面的这些翻页变量生成翻页代码
		//	--	确定是否显示上一页
		if(this.pageNow > 1) pageStr += getPageStr(this.pageNow-1, "上一页", false);
		//	--	循环显示中间的连续页
		if(this.pageCount > 0) {
			for(var i=startPage; i<=endPage; i++) {
				pageStr += getPageStr(i, i, true);
			}
		}
		//	--	确定是否显示下一页
		if(this.pageNow < this.pageCount) pageStr += getPageStr(this.pageNow+1, "下一页", false);
	} else {
		pageStr = '&nbsp;';
	}
	
	return pageStr;
};

/***
 *	取得显示翻页的展示字符串
 *	@type String
 *	@return 返回已经组织好的包含翻页信息的字符串，最完整的格式如下（HTML代码）：
 *		<a href="#number_4">上一页</a>
 *		<a href="#number_1">1</a>
 *		...
 *		<a href="#number_3">3</a>
 *		<a href="#number_4">4</a>
 *		<a href="#number_5">5</a>
 *		<a href="#number_6">6</a>
 *		<a href="#number_7">7</a>
 *		...
 *		<a href="#number_6">下一页</a>
 **/
/*
Pager.prototype.display3 = function() {
	var startPage = 0;		//	连续开始的那一页
	var endPage = 0;		//	连续结束的那一页
	
	var pageStr = '';
	if (this.pageCount > 1) {
		//	如果有页数的话计算上面的这些变量
		if(this.pageCount > 0) {
			//	首先确定连续开始页和结束页
			startPage = this.pageNow - this.pageRange;
			if(startPage < 1) {
				startPage = 1;
				endPage = startPage + (2 * this.pageRange);
			} else {
				endPage = this.pageNow + this.pageRange;
			}
			if(endPage > this.pageCount) {
				endPage = this.pageCount;
				startPage = endPage - (2 * this.pageRange);
				if(startPage < 1) startPage = 1;
			}
		}
		
		var pageNow = this.pageNow;
		var pageHash = this.pageHash;
		var getPageStr = function(page, showStr, className) {
			var str = '';
			if (page == pageNow) {
				str = '<span class="pageNo pageCurrent">' + showStr + '</span>';
			} else {
				if (pageHash) {
					str = '<a href="#' + pageHash + page + '" page="' + page + '" class="' + className + '">' + showStr + '</a>';
				} else {
					str = '<a href="#n' + page + '" page="' + page + '" onclick="return false;" class="' + className + '">' + showStr + '</a>';
				}
			}
			return str;
		};
		
		//	根据上面的这些翻页变量生成翻页代码
		//	--	确定是否显示上一页
		if(this.pageNow > 1) pageStr += getPageStr(this.pageNow-1, "上一页", 'pageLast');
		//	--	确定是否显示第一页和前省略号
		if(startPage > 1) {
			pageStr += getPageStr(1, 1, 'pageNo');
			if(startPage > 2) pageStr += '...';
		}
		//	--	循环显示中间的连续页
		if(this.pageCount > 0) {
			for(var i=startPage; i<=endPage; i++) {
				pageStr += getPageStr(i, i, 'pageNo');
			}
		}
		//	--	确定是否显示最后一页和后省略号
		if(endPage < this.pageCount) {
			pageStr += '...';
			//	pageStr += getPageStr(this.pageCount, this.pageCount, 'pageNo');
		}
		//	--	确定是否显示下一页
		if(this.pageNow < this.pageCount) pageStr += getPageStr(this.pageNow+1, "下一页", 'pageNext');
	} else {
		pageStr = '&nbsp;';
	}
	
	return pageStr;
};
*/

/***
 *	取得显示翻页的展示字符串
 *	@type String
 *	@return 返回已经组织好的包含翻页信息的字符串，最完整的格式如下（HTML代码）：
 *		<span class="last">上一页</span> 一直存在
 *		<a href="#number_1">[1]</a>
 *		...
 *		<a href="#number_3">[3]</a>
 *		<a href="#number_4">[4]</a>
 *		<span class="current">5</span>
 *		<a href="#number_6">[6]</a>
 *		<a href="#number_7">[7]</a>
 *		...
 *		<a href="#number_6" class="next">下一页</a> 一直存在
 *		所有是可点的，都是a，所以不能点的，都是span
 **/
/*
Pager.prototype.display4 = function() {
	var startPage = 0;		//	连续开始的那一页
	var endPage = 0;		//	连续结束的那一页
	
	var pageStr = '';
	if (this.pageCount > 0) {
		//	计算开始页和结束页
		startPage = this.pageNow - this.pageRange;
		if(startPage < 1) {
			startPage = 1;
			endPage = startPage + (2 * this.pageRange);
		} else {
			endPage = this.pageNow + this.pageRange;
		}
		if(endPage > this.pageCount) {
			endPage = this.pageCount;
			startPage = endPage - (2 * this.pageRange);
			if(startPage < 1) startPage = 1;
		}
		
		var pageNow = this.pageNow;
		var pageHash = this.pageHash;
		var getPageStr = function(page, showStr, className) {
			var str = '';
			if (page == pageNow) {
				str = '<span class="' + (!!className ? className : 'current') + '">' + showStr + '</span>';
			} else {
				if (pageHash) {
					str = '<a href="#' + pageHash + page + '" page="' + page + '" class="' + className + '">' + showStr + '</a>';
				} else {
					str = '<a href="#" page="' + page + '" onclick="return false;"' + (!!className ? (' class="' + className + '"') : '') + '>' + showStr + '</a>';
				}
			}
			return str;
		};
		
		//	根据上面的这些翻页变量生成翻页代码
		//	--	显示上一页
		pageStr += getPageStr((this.pageNow > 1 ? (this.pageNow - 1) : 1), "上一页", 'last');
		//	--	确定是否显示第一页和前省略号
		if(startPage > 1) {
			pageStr += getPageStr(1, 1);
			if(startPage > 2) pageStr += '...';
		}
		//	--	循环显示中间的连续页
		if(this.pageCount > 0) {
			for(var i=startPage; i<=endPage; i++) {
				pageStr += getPageStr(i, (i == pageNow ? i : ('[' + i + ']')));
			}
		}
		//	--	确定是否显示最后一页和后省略号
		if(endPage < this.pageCount) {
			pageStr += '...';
		}
		//	--	显示下一页
		pageStr += getPageStr((this.pageNow >= this.pageCount ? this.pageNow : (this.pageNow + 1)), "下一页", 'next');
	} else {
		pageStr = '&nbsp;';
	}
	
	return pageStr;
}
*/