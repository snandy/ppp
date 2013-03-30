if(!Mini) var Mini = {};
Mini.Util={
	getTxtLength:function(str){
		var tagFilter = /<a[^>]*>[^<]*<\/a>/ig;
		str = str.replace(tagFilter,'$1');
		return this.getLenU(str);
	},
	limitTxt:function(str,len){
		//var tagFilter = /<a[^>]*>([^<]*)<\/a>/g;
		//str = str.replace(tagFilter,'$1');
		var txtLen = this.getTxtLength(str);
		var allLen = this.getLenU(str);
		return this.limitU(str,len+allLen-txtLen);
	},
	getLenU :function(str){
		return str.replace(/[^\x00-\xff]/g,"**").length;
	},

	substrU:function(str,length){
		var newStr='';
		if(str){
			if(str.length>length){
				newStr=str.substr(0,length);
			}else{newStr=str;}
		}
		return newStr;
	},
	limitU:function(str,length){
		switch(typeof(str)){
			case"string":case"number":
			var eLength=3;
			if(str.length>length)
				str=str.substr(0,length);
			if(this.getLenU(str)>length){
				var reg=new RegExp("[^\x00-\xff]");
				var index=Math.floor(str.length/2);
				var needLength=length-3-this.getLenU(str.substr(0,index));
				while(needLength>0){
					needLength-=reg.test(str.substr(index,1))?2:1;
					if(needLength>=0){index++;}
				}
			str=str.substr(0,index)+'...';}
		return str;break;default:return"";break;}
	},
	selectText:function (oElement,nStart,nEnd){
		oElement.focus();
		ds=document.selection;
		if(!ds){
			oElement.setSelectionRange(nStart,nEnd);return;
		}
		var range=oElement.createTextRange();
		range.collapse(1);range.moveStart("character",nStart);
		range.moveEnd("character",nEnd-nStart);
		range.select();
	}

}