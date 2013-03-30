/**
 * 提示信息
 * @author junchen626
 */
if(!Mini)var Mini = {};

Mini.MsgBox = {
	alert:function(sA,fnB){
		//Cover.show();
		//alert(sA);
		Mini.ConfirmBox.reset();
		Mini.ConfirmBox.show({type:'alert','title':'提示','notice':sA,fnOk:fnB});
	},
	confirm:function(sA,fnB){
		Mini.ConfirmBox.reset();
		Mini.ConfirmBox.show({type:'confirm',title:'确认',notice:sA,fnOk:fnB});
//		if(window.confirm(sA)){
//			fnB();
//		}
	},
	confirmExt:function(sA,sB,fnC,sD,bE){
		Mini.ConfirmBox.reset();
		if(typeof bE == 'undefined')bE = true;
		Mini.ConfirmBox.show({type:'confirm',title:sD||'确认',notice:sA, ext:sB, fnOk:fnC,needReturn:bE});
//		if(window.confirm(sA)){
//			fnB();
//		}
	}
}
Mini.ConfirmBox = Class.create({
	initialize: function() {
		this.box = new Element("div");
		this.box.setStyle({'display':'none','position':'absolute','zIndex':'2000'})
		this.box.addClassName('mwin');
		
							
		this.box.innerHTML = '<table id="add_tw_window" class="mwin1" style="">'
						+'<thead><tr><td class="bx"></td><td class="by"></td><td class="bz"></td></tr></thead>'
						+'<tfoot><tr><td class="bx"></td><td class="by"></td><td class="bz"></td></tr></tfoot>'
						+'<tbody><tr><td class="bx"></td>'
						+'<td class="by">'
							+'<div class="mwt">'
								+'<div class="ttl twWinTitle"><span></span><a href="javascript:void(0);" onclick="return false;" class="mw_close close overlayCanB" title="关闭"><b>跳 过</b></a></div>'
							+'</div>'
							+'<div class="mw mw_a mw02">'
								+'<div class="mwc">'
									+'<div class="repost">'
										+'<div class="repost_c"></div>'
										+'<div class="post">'
											+'<p class="btns2"><span class="opt"></span><a class="btn" href="javascript:void(0);"><b>确 定</b></a><a class="btn btn_dis" href="javascript:void(0);"><b>取 消</b></a></p>'
										+'</div>'
									+'</div>'
									+'</div>'
									+'</div></td>'
									+'<td class="bz"></td>'
								+'</tr>'
							+'</tbody>'
						+'</table>';
		this.closeBtn = this.box.down('a.mw_close');
		this.okBtnCtner = this.box.down('a.btn');
		this.cancelBtnCtner = this.box.down('a.btn_dis');
		this.okBtn = this.box.down('a.btn');
		this.cancelBtn = this.box.down('a.btn',1);
		
		this.titleDiv = this.box.down('span');
		this.noticeDiv = this.box.down('div.repost_c');
		
		document.body.appendChild(this.box);
		this.cancelBtn.observe('click',this.hide.bind(this));
		this.closeBtn.observe('click',this.hide.bind(this));
	},
	show:function(option){
		Cover.show();
		option = Object.extend({type:'alert',title:'',notice:'',fnOk:function(){},test:''}
			,option || {});
		this.titleDiv.innerHTML = option.title||'';
		this.noticeDiv.innerHTML = option.notice||'';
		if(option.ext){
			this.noticeDiv.innerHTML += option.ext;
		}
		
		if(option.type=='confirm'){
			this.okBtn.observe('click',
				function(){
					if(option.needReturn){//需要后续操作控制弹出框是否隐藏
						option.fnOk();
					}else{
						this.hide();
						option.fnOk();
					}
				}.bind(this));
			this.cancelBtnCtner.show();
		}else{
			if(option.fnOk){
				//去除本身点击事件
				Event.observe(this.okBtn, 'click', Event.stop.bindAsEventListener(this));
				
				this.okBtn.observe('click',function(){this.hide();option.fnOk()}.bind(this));
			}else{
				this.okBtn.observe('click',this.hide.bind(this));
			}
			this.cancelBtnCtner.hide();
		}
		
		var r = Dom.getCenterPos(this.box);
		this.box.setStyle({'top':r.top+'px','left':r.left+'px'});
		this.box.show();
		this.okBtn.focus();
	},
	hide:function(){
		this.box.hide();
		this.reset();
		Cover.hide();
	},
	reset:function(){
		this.okBtn.stopObserving('click');
	}
})

Mini.ConfirmBox.show = function(sA,fnB){
	if(!Mini.ConfirmBox._instance){
		Mini.ConfirmBox._instance = new Mini.ConfirmBox();
	}
	Mini.ConfirmBox._instance.show(sA,fnB);
}

Mini.ConfirmBox.hide = function(){
	(Mini.ConfirmBox._instance && Mini.ConfirmBox._instance.hide());
}

Mini.ConfirmBox.reset = function(){
	(Mini.ConfirmBox._instance && Mini.ConfirmBox._instance.reset());
}

