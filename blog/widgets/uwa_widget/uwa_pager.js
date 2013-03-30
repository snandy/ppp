/**
 * @fileoverview UWA Object
 * 
 * @author Jady Yang (jadyyang@sohu.com)
 * @version 1.0
 **/

/**
 * ��ҳ������
 * @param {Object} params ��ҳ�����ò��������а����������ԣ�
 * 		module{Widget}: widget��������ã�һ���ֱ��дΪ"widget"
 *		limit{Number}: һҳ��Ҫ��ʾ����Ϣ������
 * 		offset{Number}: ��ǰҳ�е�һ�������б��еı��
 * 		dataArray{Array}: һ������������������б��е�����б�
 **/
UWA.Controls.Pager = function(params) {
	this.module = params.module;
	this.limit = parseInt(params.limit);
	this.offset = parseInt(params.offset);
	this.dataArray = params.dataArray;
}

/**
 * ȡ���������ɵķ�ҳ����
 * @return ��֤������ҳ��Ϣ��Ԫ�ض��� 
 * @type HTMLElement
 **/
UWA.Controls.Pager.prototype.getContent = function() {
	var ctr = document.createElement("div");
	ctr.className = "pager";
	
	//	�ж��Ƿ���ʾ��һҳ
	if (this.offset > 0) {
		var pre = document.createElement("a");
		pre.className = "prev";
		pre.href = "javascript:void(0);";
		pre.innerHTML = "��һҳ";
		pre.onclick = this.onChange.bind(this, this.offset-this.limit);
		ctr.appendChild(pre);
	}
	
	//	�ж��Ƿ���ʾ��һҳ
	if (this.offset < this.dataArray.length - this.limit) {
		var next = document.createElement("a");
		next.className = "next";
		next.href = "javascript:void(0);";
		next.innerHTML = "��һҳ";
		next.onclick = this.onChange.bind(this, this.offset + this.limit);
		ctr.appendChild(next);
	}
	
	return ctr;
}

/**
 * ȡ���������ɵķ�ҳ����
 * @return ��֤������ҳ��Ϣ��Ԫ�ض��� 
 * @type HTMLElement
 **/
UWA.Controls.Pager.prototype.getDom = function() {
	return this.getContent();
}

/**
 * ������ҳ���õķ����������߱������ش˷���
 * @param {Number} offset Ҫ��ʾ�Ŀ�ʼ���Ǹ�����
 **/
UWA.Controls.Pager.prototype.onChange = function(offset) {
	
}