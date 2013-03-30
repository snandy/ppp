/***
 *	@fileoverview �ṩҳ����ʾ�ͷ�ҳ����
 * 
 *	@author jadyyang@sohu.com
 *	@version 0.2
 **/

/***
 *	�����ࣺ
 *		prototype 1.4
 **/
 
/***
 *	����һ����ҳ����ͨ��������ʵ�ָ������͵ķ�ҳ����
 *	������̬��element, size, pageFunc
 *	@class ����һ����ҳ����ͨ������������Ʒ�ҳ��Ϣ��ʹ�ù��̣�
 *		1. ���Ƚ���һ��������һ����ҳ�����磺var a = new Pager("test", 10, goPage);
 *		2. �û����ĳһҳ֮��ϵͳ������û��ƶ��ķ�������pageFunc;
 *		3. ���ȡ���µ����������ҵ������µ�λ�ƣ�����Pager.goPage����goStart����
 *			�����÷�ҳ���ݽ��и��£��磺goto(4);
 *	@constructor ���캯��
 *	@param {ElementOrID} element һ��HTMLElement���������ID��
 *	@param {Number} size һҳҪ��ʾ����Ϣ����
 *	@param {Function} pageFunc ���û�Ҫ����ĳ��ҳ��ʱҪ���õķ�����
 *		��ҳ������ô˷���ʱ�ش����������ݣ�
 *			pageNo {Number} �û������Ϊ�ڼ�ҳ
 *			pager {Pager} ���ڵķ�ҳ����
 *	@return �����´����ķ�ҳ����
 **/
function Pager(element, size, pageFunc) {
	
	//	---------------------  ����������  ---------------------
	
	//	���ñ���
	/***
	 *	һ��HTMLElement���������ID��
	 *	@type ElementOrID
	 **/
	this.element = element ? (element.constructor == Array ? $.apply(null, element) : [$(element)]) : [];
	
	/***
	 *	һҳҪ��ʾ����Ϣ����
	 *	@type Number
	 **/
	this.size = size;
	/***
	 *	���û�Ҫ����ĳ��ҳ��ʱҪ���õķ�����
	 *	��ҳ������ô˷���ʱ�ش����������ݣ�
	 *		pageNo {Number} �û������Ϊ�ڼ�ҳ
	 *		pager {Pager} ���ڵķ�ҳ����
	 *	@type Function
	 **/
	this.pageFunc = pageFunc;
	
	//	��ҳ��Ҫ�������Ϣ
	/***
	 *	������������
	 *	@type Number
	 **/
	this.itemCount = 0;
	/***
	 *	ҳ����
	 *	@type Number
	 **/
	this.pageCount = 0;
	/***
	 * ҳ��ʾ��Χ
	 * @type Number
	 **/
	this.pageRange = 2;
	/***
	 *	����Ϊ�ڼ�ҳ
	 *	@type Number
	 **/
	this.pageNow = 0;
	
	/**
	 * ҳ���ʾ���ͣ������֣�start����page
	 */
	this.pageType = "page";
	
	/***
	 *	��ҳ�����������������ͣ�
	 * 		normal search short mini
	 *	@type String
	 **/
	this.type = 'normal';
	
	//	---------------------  ��ʼ������  ---------------------
	//	�����з�ҳ������¼�
	this.bindPageEvents();
}

/***
 *	�����з�ҳ��������Ԫ�صķ�ҳ�����¼�
 *	@type
 **/
Pager.prototype.bindPageEvents = function() {
	for (var i=0; i<this.element.length; i++) {
		this.element[i].onclick = this.pageEvent.bind(this);
	}
	//	Event.observe(this.element, "click", this.pageEvent.bindAsEventListener(this));
};

/***
 *	��ҳ���󸸶���ĵ���������
 *	@param {Event} e �¼�����
 *	@type
 **/
Pager.prototype.pageEvent = function(e) {
	//	�����ж��û��������Ч�ķ�ҳ����
	e = e || window.event;
	var element = Event.element(e);
	
	//	�ж��Ƿ�����Ч�ķ�ҳ����
	if (element.tagName.toLowerCase() == "a") {
		var goNumber = element.getAttribute("page");
		if (goNumber) {
			this.pageFunc((this.pageType == "page" ? parseInt(goNumber) : ((parseInt(goNumber) - 1) * this.size)), element, this);
		}
	}
};

/***
 *	������Ϣ��������
 *	@param {Number} count �µ�������
 *	@type
 **/
Pager.prototype.setCount = function(count) {
	this.itemCount = count;
	this.pageCount = Math.ceil(this.itemCount/this.size);
	this.refresh();
};

/***
 *	����ĳһҳ��
 *	������̬��start [, count]
 *	@param {Number} start ��ǰ��ʼ��λ��
 *	@param {Number} count �µ�������
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
 *	����ĳһҳ��
 *	������̬��pageNo [, count]
 *	@param {Number} pageNo Ҫȥ��ҳ�룬��1��ʼ
 *	@param {Number} count �µ�������
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
 *	���¼��㣬�������µ�����ˢ��ҳ���ϵķ�ҳ��Ϣ
 *	@type
 **/
Pager.prototype.refresh = function() {
	//	���ȱ�֤��ת����ҳ������ҳ�뷶Χ֮��
	if(this.pageNow < 1) {
		this.pageNow = 1;
	}
	if(this.pageNow > this.pageCount) {
		this.pageNow = this.pageCount;
	}
	
	//	����չ�ַ���ȡ�����ɵ�չ���ַ���
	var str = this["display_" + this.type]();
	
	//	�����ɵķ�ҳ������ӵ�������
	for (var i=0; i<this.element.length; i++) {
		this.element[i].innerHTML = str;
	}
	//	this.element.innerHTML = str;
};

/***
 *	ȡ����ʾ��ҳ��չʾ�ַ���
 *	@type String
 *	@return �����Ѿ���֯�õİ�����ҳ��Ϣ���ַ������������ĸ�ʽ���£�HTML���룩��
 *		<a href="#number_4">��һҳ</a>
 *		<a href="#number_1">1</a>
 *		...
 *		<a href="#number_3">3</a>
 *		<a href="#number_4">4</a>
 *		<a href="#number_5">5</a>
 *		<a href="#number_6">6</a>
 *		<a href="#number_7">7</a>
 *		...
 *		<a href="#number_10">10</a>
 *		<a href="#number_6">��һҳ</a>
 **/
/*
Pager.prototype.display1 = function() {
	var startPage = 0;		//	������ʼ����һҳ
	var endPage = 0;		//	������������һҳ
	
	var pageStr = '';
	if (this.pageCount > 1) {
		//	�����ҳ���Ļ������������Щ����
		if(this.pageCount > 0) {
			//	����ȷ��������ʼҳ�ͽ���ҳ
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
		
		//	�����������Щ��ҳ�������ɷ�ҳ����
		//	--	ȷ���Ƿ���ʾ��һҳ
		if(this.pageNow > 1) pageStr += getPageStr(this.pageNow-1, "��һҳ", 'pageLast');
		//	--	ȷ���Ƿ���ʾ��һҳ��ǰʡ�Ժ�
		if(startPage > 1) {
			pageStr += getPageStr(1, 1, 'pageNo');
			if(startPage > 2) pageStr += '...';
		}
		//	--	ѭ����ʾ�м������ҳ
		if(this.pageCount > 0) {
			for(var i=startPage; i<=endPage; i++) {
				pageStr += getPageStr(i, i, 'pageNo');
			}
		}
		//	--	ȷ���Ƿ���ʾ���һҳ�ͺ�ʡ�Ժ�
		if(endPage < this.pageCount) {
			if(endPage < (this.pageCount - 1)) pageStr += '...';
			pageStr += getPageStr(this.pageCount, this.pageCount, 'pageNo');
		}
		//	--	ȷ���Ƿ���ʾ��һҳ
		if(this.pageNow < this.pageCount) pageStr += getPageStr(this.pageNow+1, "��һҳ", 'pageNext');
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
 *	��ͨ�淭ҳ
 *	@type String
 *	@return �����Ѿ���֯�õİ�����ҳ��Ϣ���ַ���
 **/
Pager.prototype.display_normal = function() {
	var page = this._getRangeObj();
	
	var arr = [];
	if (!page) arr.push('&nbsp;');
	else {
		
		//	��ʾ����ҳ��
		arr.push('��' + page.count + 'ҳ');
		if (page.count > 1) {
			arr.push('&nbsp;|');
			
			//	ȷ���Ƿ���ʾ��һҳ
			if (page.first) arr.push(this._getPageStr(1, '��һҳ', false, page.now));
			//	ȷ���Ƿ���ʾ��һҳ
			if (page.pre) arr.push(this._getPageStr(page.pre, '��һҳ', false, page.now));
			
			if (page.start && page.end) {
				for (var i=page.start; i<=page.end; i++) {
					arr.push(this._getPageStr(i, i, true, page.now));
				}
			}
			
			//	ȷ���Ƿ���ʾ��һҳ
			if (page.next) arr.push(this._getPageStr(page.next, '��һҳ', false, page.now));
			//	ȷ���Ƿ���ʾ��һҳ
			if (page.last) arr.push(this._getPageStr(page.last, '��ĩҳ', false, page.now));
		}
	}
	
	return arr.join('');
	/*
	var startPage = 0;		
	var endPage = 0;		
	
	var pageStr = '';
	if (this.pageCount > 1) {
		//	�����ҳ���Ļ������������Щ����
		if(this.pageCount > 0) {
			//	����ȷ��������ʼҳ�ͽ���ҳ
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
		
		//	�����������Щ��ҳ�������ɷ�ҳ����
		//	--	ȷ���Ƿ���ʾ��һҳ
		if(this.pageNow > 1) pageStr += getPageStr(this.pageNow-1, "��һҳ", false);
		//	--	ѭ����ʾ�м������ҳ
		if(this.pageCount > 0) {
			for(var i=startPage; i<=endPage; i++) {
				pageStr += getPageStr(i, i, true);
			}
		}
		//	--	ȷ���Ƿ���ʾ��һҳ
		if(this.pageNow < this.pageCount) pageStr += getPageStr(this.pageNow+1, "��һҳ", false);
	} else {
		pageStr = '&nbsp;';
	}
	
	return pageStr;
	*/
};

/***
 *	ȡ����ʾ��ҳ��չʾ�ַ���
 *	@type String
 *	@return �����Ѿ���֯�õİ�����ҳ��Ϣ���ַ������������ĸ�ʽ���£�HTML���룩��
 *		<a href="#number_4">��һҳ</a>
 *		<a href="#number_3">3</a>
 *		<a href="#number_4">4</a>
 *		<a href="#number_5">5</a>
 *		<a href="#number_6">6</a>
 *		<a href="#number_7">7</a>
 *		<a href="#number_6">��һҳ</a>
 **/
Pager.prototype.display_search = function() {
	var startPage = 0;		//	������ʼ����һҳ
	var endPage = 0;		//	������������һҳ
	
	var pageStr = '';
	if (this.pageCount > 1) {
		//	�����ҳ���Ļ������������Щ����
		if(this.pageCount > 0) {
			//	����ȷ��������ʼҳ�ͽ���ҳ
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
		
		//	�����������Щ��ҳ�������ɷ�ҳ����
		//	--	ȷ���Ƿ���ʾ��һҳ
		if(this.pageNow > 1) pageStr += getPageStr(this.pageNow-1, "��һҳ", false);
		//	--	ѭ����ʾ�м������ҳ
		if(this.pageCount > 0) {
			for(var i=startPage; i<=endPage; i++) {
				pageStr += getPageStr(i, i, true);
			}
		}
		//	--	ȷ���Ƿ���ʾ��һҳ
		if(this.pageNow < this.pageCount) pageStr += getPageStr(this.pageNow+1, "��һҳ", false);
	} else {
		pageStr = '&nbsp;';
	}
	
	return pageStr;
};

/***
 *	ȡ����ʾ��ҳ��չʾ�ַ���
 *	@type String
 *	@return �����Ѿ���֯�õİ�����ҳ��Ϣ���ַ������������ĸ�ʽ���£�HTML���룩��
 *		<a href="#number_4">��һҳ</a>
 *		<a href="#number_1">1</a>
 *		...
 *		<a href="#number_3">3</a>
 *		<a href="#number_4">4</a>
 *		<a href="#number_5">5</a>
 *		<a href="#number_6">6</a>
 *		<a href="#number_7">7</a>
 *		...
 *		<a href="#number_6">��һҳ</a>
 **/
/*
Pager.prototype.display3 = function() {
	var startPage = 0;		//	������ʼ����һҳ
	var endPage = 0;		//	������������һҳ
	
	var pageStr = '';
	if (this.pageCount > 1) {
		//	�����ҳ���Ļ������������Щ����
		if(this.pageCount > 0) {
			//	����ȷ��������ʼҳ�ͽ���ҳ
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
		
		//	�����������Щ��ҳ�������ɷ�ҳ����
		//	--	ȷ���Ƿ���ʾ��һҳ
		if(this.pageNow > 1) pageStr += getPageStr(this.pageNow-1, "��һҳ", 'pageLast');
		//	--	ȷ���Ƿ���ʾ��һҳ��ǰʡ�Ժ�
		if(startPage > 1) {
			pageStr += getPageStr(1, 1, 'pageNo');
			if(startPage > 2) pageStr += '...';
		}
		//	--	ѭ����ʾ�м������ҳ
		if(this.pageCount > 0) {
			for(var i=startPage; i<=endPage; i++) {
				pageStr += getPageStr(i, i, 'pageNo');
			}
		}
		//	--	ȷ���Ƿ���ʾ���һҳ�ͺ�ʡ�Ժ�
		if(endPage < this.pageCount) {
			pageStr += '...';
			//	pageStr += getPageStr(this.pageCount, this.pageCount, 'pageNo');
		}
		//	--	ȷ���Ƿ���ʾ��һҳ
		if(this.pageNow < this.pageCount) pageStr += getPageStr(this.pageNow+1, "��һҳ", 'pageNext');
	} else {
		pageStr = '&nbsp;';
	}
	
	return pageStr;
};
*/

/***
 *	ȡ����ʾ��ҳ��չʾ�ַ���
 *	@type String
 *	@return �����Ѿ���֯�õİ�����ҳ��Ϣ���ַ������������ĸ�ʽ���£�HTML���룩��
 *		<span class="last">��һҳ</span> һֱ����
 *		<a href="#number_1">[1]</a>
 *		...
 *		<a href="#number_3">[3]</a>
 *		<a href="#number_4">[4]</a>
 *		<span class="current">5</span>
 *		<a href="#number_6">[6]</a>
 *		<a href="#number_7">[7]</a>
 *		...
 *		<a href="#number_6" class="next">��һҳ</a> һֱ����
 *		�����ǿɵ�ģ�����a�����Բ��ܵ�ģ�����span
 **/
/*
Pager.prototype.display4 = function() {
	var startPage = 0;		//	������ʼ����һҳ
	var endPage = 0;		//	������������һҳ
	
	var pageStr = '';
	if (this.pageCount > 0) {
		//	���㿪ʼҳ�ͽ���ҳ
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
		
		//	�����������Щ��ҳ�������ɷ�ҳ����
		//	--	��ʾ��һҳ
		pageStr += getPageStr((this.pageNow > 1 ? (this.pageNow - 1) : 1), "��һҳ", 'last');
		//	--	ȷ���Ƿ���ʾ��һҳ��ǰʡ�Ժ�
		if(startPage > 1) {
			pageStr += getPageStr(1, 1);
			if(startPage > 2) pageStr += '...';
		}
		//	--	ѭ����ʾ�м������ҳ
		if(this.pageCount > 0) {
			for(var i=startPage; i<=endPage; i++) {
				pageStr += getPageStr(i, (i == pageNow ? i : ('[' + i + ']')));
			}
		}
		//	--	ȷ���Ƿ���ʾ���һҳ�ͺ�ʡ�Ժ�
		if(endPage < this.pageCount) {
			pageStr += '...';
		}
		//	--	��ʾ��һҳ
		pageStr += getPageStr((this.pageNow >= this.pageCount ? this.pageNow : (this.pageNow + 1)), "��һҳ", 'next');
	} else {
		pageStr = '&nbsp;';
	}
	
	return pageStr;
}
*/