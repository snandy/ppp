/**
 * @fileoverview UWA Object
 * 
 * @author Jady Yang (jadyyang@sohu.com)
 * @version 1.0
 **/

/**
 * 翻页控制类
 * @param {Object} params 翻页的配置参数，其中包括如下属性：
 * 		module{Widget}: widget对象的引用，一般可直接写为"widget"
 *		limit{Number}: 一页中要显示的信息的数量
 * 		offset{Number}: 当前页中第一项在总列表中的编号
 * 		dataArray{Array}: 一个包括所有数据项（总列表中的项）的列表
 **/
UWA.Controls.Pager = function(params) {
	this.module = params.module;
	this.limit = parseInt(params.limit);
	this.offset = parseInt(params.offset);
	this.dataArray = params.dataArray;
}

/**
 * 取得整个生成的翻页对象
 * @return 保证整个翻页信息的元素对象 
 * @type HTMLElement
 **/
UWA.Controls.Pager.prototype.getContent = function() {
	var ctr = document.createElement("div");
	ctr.className = "pager";
	
	//	判断是否显示上一页
	if (this.offset > 0) {
		var pre = document.createElement("a");
		pre.className = "prev";
		pre.href = "javascript:void(0);";
		pre.innerHTML = "上一页";
		pre.onclick = this.onChange.bind(this, this.offset-this.limit);
		ctr.appendChild(pre);
	}
	
	//	判断是否显示下一页
	if (this.offset < this.dataArray.length - this.limit) {
		var next = document.createElement("a");
		next.className = "next";
		next.href = "javascript:void(0);";
		next.innerHTML = "下一页";
		next.onclick = this.onChange.bind(this, this.offset + this.limit);
		ctr.appendChild(next);
	}
	
	return ctr;
}

/**
 * 取得整个生成的翻页对象
 * @return 保证整个翻页信息的元素对象 
 * @type HTMLElement
 **/
UWA.Controls.Pager.prototype.getDom = function() {
	return this.getContent();
}

/**
 * 单击翻页调用的方法，开发者必须重载此方法
 * @param {Number} offset 要显示的开始的那个数据
 **/
UWA.Controls.Pager.prototype.onChange = function(offset) {
	
}