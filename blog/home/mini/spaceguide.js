var ScrollWin = {
  w3c : document.getElementById,
  iex : document.all,
  scrollLoop : false,
  scrollInterval : null, // setInterval id
  currentBlock : null,   // object reference
  getWindowHeight : function(){
    if(this.iex) return (document.documentElement.clientHeight) ?
document.documentElement.clientHeight : document.body.clientHeight;
    else return window.innerHeight;
  },
  getScrollLeft : function(){
    if(this.iex) return (document.documentElement.scrollLeft) ?
document.documentElement.scrollLeft : document.body.scrollLeft;
    else return window.pageXOffset;
  },
  getScrollTop : function(){
    if(this.iex) return (document.documentElement.scrollTop) ?
document.documentElement.scrollTop : document.body.scrollTop;
    else return window.pageYOffset;
  },
  getElementYpos : function(el){
    var y = 0;
    while(el.offsetParent){
      y += el.offsetTop
      el = el.offsetParent;
    }
    return y;
  },
 
  scrollTo : function(x,y){
  	var windowHeight = this.getWindowHeight();
    	var bodyHeight = document.body.scrollHeight||document.documentElement.clientHeight;
    	if(y > bodyHeight - windowHeight){
    		y = bodyHeight - windowHeight
    	}
    if(this.scrollLoop){
    	
      var left = this.getScrollLeft();
      var top = this.getScrollTop();
      var windowHeight = this.getWindowHeight();
      var minStep = 5;
      
      if(Math.abs(left-x) <= minStep && Math.abs(top-y) <= minStep){
        window.scrollTo(x,y);
        clearInterval(this.scrollInterval);
        this.scrollLoop = false;
        this.scrollInterval = null;
      }else{
        var xstep = Math.ceil((x-left)/10);
      	var ystep = Math.ceil((y-top)/10);
      	if(ystep == 0){
     		ystep = -1;
     	}
     		window.scrollTo(left+xstep/Math.abs(xstep)*Math.max(minStep,Math.abs(xstep)), top+ystep/Math.abs(ystep)*Math.max(minStep,Math.abs(ystep)));  
      
      }
    }else{
      this.scrollInterval = setInterval("ScrollWin.scrollTo("+x+","+y+")",20);   
      this.scrollLoop = true;
    }
  }
};
var GuidTip = {
	isInit:false,
	closeBtn:null,
	okBtn:null,
	infoEl:null,
	tipFrame:null,
	setMask:null,
	topArr:null,
	framePosition:{left:0,top:0},
	step:0,
	stepReleaseFn:function(){},
	step0Info:'<h3>欢迎您来到搜狐博客空间</h3><p>空间是博客的管理后台，同时它也是系统消息中心，和好友动态的汇集地。</p>',
	step1Info:'微博就是“一句话博客”。<br/>将生活中有趣的事情、突发的感想，在这里用一句话或者图片发布到互联网中与朋友们分享。',
	step2Info:'是否同意TA加你为好友，谁给你的博客留了言，谁在微博中提到你？请关注这里',
	step3Info:'在“设置”中，可以换头像，改密码，修改个人信息',
	init:function(){
		if(this.isInit)return;
		this.tipFrame = new Element('div');
		this.tipFrame.className = 'guideLay';
		this.tipFrame.setStyle({'display':'none'});
		this.tipFrame.innerHTML = ' <div class="guideLayInt"><div class="gidArrTop"></div>'
				+'<div class="gidClose"><a></a></div>'
				+'<div class="gidInfo"></div>'
				+'<div class="gidBtn">'
					+'<span class="stepf"><span>1</span>/3</span><input type="button" class="btn" value="我知道了"/>'
				+'</div></div>';
		this.topArr = this.tipFrame.down('div.gidArrTop');
		this.closeBtn = this.tipFrame.down('div.gidClose');	
		this.okBtn = this.tipFrame.down('input.btn');
		this.infoEl = this.tipFrame.down('div.gidInfo');	
		this.stepEl = this.tipFrame.down('span.stepf');
		this.stepEl.hide();
		this.curStepEl = this.stepEl.down('span');
		if($('pagePop')){
			$('pagePop').appendChild(this.tipFrame);
		}
		document.body.appendChild(this.tipFrame);
		this.setMask = new Element('div');
		this.setMask.innerHTML = ' 设置 ';
		this.setMask.className='mysetMask';
		this.setMask.setStyle({'display':'none','position':'fixed'})
		if($('pagePop')){
			$('pagePop').appendChild(this.setMask);
		}
		document.body.appendChild(this.setMask);
		this.isInit = true;
		Event.observe(this.closeBtn,'click',this.hide.bind(this));
		Event.observe(this.okBtn,'click',this.onOk.bind(this));
	},
	show:function(){
		this.init();
		Cover.show();
		this.tipFrame.show();
		var r = this.framePosition;
		this.tipFrame.setStyle({'top':r.top+'px'});
		if(typeof r.left != 'undefined'){
			this.tipFrame.setStyle({'left':r.left+'px'});
			this.tipFrame.setStyle({'right':'auto'});
		}
		if(typeof r.right  != 'undefined'){
			this.tipFrame.setStyle({'left':'auto'});
			this.tipFrame.setStyle({'right':r.right+'px'});
		}
		this.tipFrame.show();
	},
	onOk:function(){
		this.step++;
		this.showStep();
	},
	showStep:function(){
		this.init();
		switch(this.step){
			case 0:
				this.tipFrame.style.position='absolute';
				this.topArr.hide();
				this.framePosition = Dom.getCenterPos(this.tipFrame);
				this.okBtn.value = '查看更多'
				this.tipFrame.addClassName('gdstep0');
				this.stepReleaseFn=function(){this.tipFrame.removeClassName('gdstep0');}.bind(this);
				this.infoEl.innerHTML = this.step0Info;break;
				
			case 1:
				
				this.stepReleaseFn();
				this.topArr.show();
				this.stepEl.show();
				this.okBtn.value = '我知道了'
				var ele = document.getElementsByClassName('cbox1',$('soHome'))[0];
				ele = $(ele);
				var contentEle = ele;
				var eleP = Dom.getPos(contentEle);
				
				var windowHeight = ScrollWin.getWindowHeight();
				var scrollHeight = ScrollWin.getScrollTop();
				if(scrollHeight+windowHeight < eleP.top+contentEle.offsetHeight+130 || scrollHeight>eleP.top){
					ScrollWin.scrollTo(0,eleP.top-100);		
				}
				this.framePosition = {'left':eleP.left,'top':eleP.top+contentEle.offsetHeight};
				ele.addClassName('gdBight gb1');
				this.tipFrame.addClassName('gdstep1');
				this.stepReleaseFn=function(){document.getElementsByClassName('cbox1',$('soHome'))[0].removeClassName('gdBight gb1');
					this.tipFrame.removeClassName('gdstep1');}.bind(this);
				this.infoEl.innerHTML = this.step1Info;break;
			case 2:
				this.stepReleaseFn();
				var ele = document.getElementsByClassName('c1',$('soHome'))[0];
				ele = $(ele);
				var contentEle = ele;
				var eleP = Dom.getPos(contentEle);
				var windowHeight = ScrollWin.getWindowHeight();
				var scrollHeight = ScrollWin.getScrollTop();
				if(scrollHeight+windowHeight < eleP.top+contentEle.offsetHeight+130 || scrollHeight>eleP.top){
					ScrollWin.scrollTo(0,eleP.top-100);		
				}		
				this.framePosition = {'left':eleP.left-20,'top':eleP.top+contentEle.offsetHeight};
				ele.addClassName('gdBight gb2');
				
				this.tipFrame.addClassName('gdstep2');
				this.stepReleaseFn=function(){document.getElementsByClassName('c1',$('soHome'))[0].removeClassName('gdBight gb2');
						this.tipFrame.removeClassName('gdstep2');}.bind(this);
				this.infoEl.innerHTML = this.step2Info;break;
			case 3:
				this.stepReleaseFn();
				var ele = document.getElementsByClassName('myset',$('toolBar'))[0];
				ele = $(ele);
				var contentEle = ele;
				var eleP = Dom.getPos(contentEle);
				this.framePosition = {'right':40,'top':eleP.top+contentEle.offsetHeight};
				this.setMask.setStyle({'left':(eleP.left-10)+'px','position':'absolute','zIndex':'1002'});
				this.setMask.show();
				if(navigator.userAgent.toLowerCase().indexOf('msie 6') == -1){
					this.tipFrame.style.position='fixed';
					this.setMask.style.position='fixed';
				}else{
					ScrollWin.scrollTo(0,0);
				}
				//ele.addClassName('gdBight gb3');
				
				this.tipFrame.addClassName('gdstep3');
				this.stepReleaseFn = function(){document.getElementsByClassName('myset',$('toolBar'))[0].removeClassName('gdBight gb3');GuidTip.setMask.hide();
				this.tipFrame.removeClassName('gdstep3');}.bind(this);
				this.infoEl.innerHTML = this.step3Info;break;
			default:
				this.hide();return;break;
			;
		}
		if(this.step != 0){
			this.curStepEl.innerHTML = this.step;
		}
		this.show();
	},
	hide:function(){
		if(this.stepReleaseFn)this.stepReleaseFn();
		Cover.hide();
		this.tipFrame.hide();
		var closeTipUrl = '/service/showTips.jsp';
		new Ajax.Request(closeTipUrl,{
				method:'get',
				parameters:'',
				onComplete:function(response){
				}
			});
		ScrollWin.scrollTo(0,0);
	}
}