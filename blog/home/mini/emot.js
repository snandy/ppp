/**
 * 表情框相关
 * @author junchen626
 */
if(!Mini)var Mini = {};
Mini.Emotion = {
	emotions:{1:"[:)]",2:"[#_#]",3:"[8*)]",4:"[:D]",5:"[:-)]",6:"[:P]",7:"[B_)]",8:"[B_I]",9:"[^_*]",10:"[:$]",11:"[:|]",12:"[:(]",13:"[:.(]",14:"[:_(]",15:"[):(]",16:"[:V]",17:"[*_*]",18:"[:^]",19:"[:?]",20:"[:!]",21:"[=:|]",22:"[:%]",23:"[:O]",24:"[:X]",25:"[|-)]",26:"[:Z]",27:"[:9]",28:"[:T]",29:"[:-*]",30:"[*_/]",31:"[:#|]",32:"[:69]",33:"[//shuang]",34:"[//qiang]",35:"[//ku]",36:"[//zan]",37:"[//heart]",38:"[//break]",39:"[//F]",40:"[//W]",41:"[//mail]",42:"[//strong]",43:"[//weak]",44:"[//share]",45:"[//phone]",46:"[//mobile]",47:"[//kiss]",48:"[//V]",49:"[//sun]",50:"[//moon]",51:"[//star]",52:"[(!)]",53:"[//TV]",54:"[//clock]",55:"[//gift]",56:"[//cash]",57:"[//coffee]",58:"[//rice]",59:"[//watermelon]",60:"[//tomato]",61:"[//pill]",62:"[//pig]",63:"[//football]",64:"[//shit]"},
	mdiv:null,
	ediv:null,
	pdiv:null,
	ouput:null,
	pg:null,
	psz : 32,
	tpg:2,
	init:function(){
		if(Mini.Emotion._hasInit)return;
		this._buildFrame();
		this._buildContent();
		Mini.Emotion._hasInit = true;
	},
	_buildFrame:function(){
		this.mdiv = new Element('div');
		this.mdiv.className="popLayer emotLayer";
		
		var str='<div class="decor">'
		     +'<span class="tl"></span>'
		      +'<span class="tr"></span>'
		      +'<span class="br"></span>'
		      +'<span class="bl"></span>'
		  +'</div>'
		  +'<iframe style="width: 230px; height: 146px;" class="maskIframe"></iframe>'
		  +'<div class="content">'
		    +'<div class="emotBox">'
		      +'<div class="emots">';
		      str += '</div>'
		      +'<div class="pager pager-simple"><span class="pagePrev pageNow" data-key="up">上一页</span>' +
		      		'<a href="javascript:void(0)" class="pagePrev" data-key="up">上一页</a>' +
		      		'<span data-key="page">1</span><a href="javascript:void(0)" class="pageNext ">下一页</a>' +
		      		'<span class="pageNext pageNow">下一页</span></div>'
			    +'</div>'
			  +'</div>';
		
		this.mdiv.innerHTML = str;
		this.mdiv.hide();
		if($("pagePop"))
			$("pagePop").appendChild(this.mdiv);
		else
			document.body.appendChild(this.mdiv);
		this.ediv = document.getElementsByClassName("emots",this.mdiv)[0];
		this.pctner = document.getElementsByClassName("pager",this.mdiv)[0];
		this.pctner = this.pctner.getElementsByTagName("span")[1];
		this.dpup = document.getElementsByClassName("pagePrev",this.mdiv,"SPAN")[0];
		this.pup = document.getElementsByClassName("pagePrev",this.mdiv,"A")[0];
		this.dpdown = document.getElementsByClassName("pageNext",this.mdiv,"SPAN")[0];
		this.pdown = document.getElementsByClassName("pageNext",this.mdiv,"A")[0];
				
	},
	_buildContent:function(pg){
		if(!pg)pg=1;
		pg = parseInt(pg);
		if(pg<=0)pg=1;if(pg>this.tpg)pg=this.tpg;
		if(this.pg == pg)return;
		this.pg = pg;
		var st = (pg-1)*this.psz+1;
		var str = new Array();
		for(var i=st;i<st+this.psz;i++){
			str.push('<a class="emot e-base-'+ i +'" name="'+ i +'" href="javascript:void(0);"></a>')
		}
		this.ediv.innerHTML = str.join(' ');
		this._buildPager();
		this._bindEvent();
	},
	_buildPager:function(){
		if(this.pg>1){
			this.pup.show();this.dpup.hide();
		}else{
			this.pup.hide();this.dpup.show();
		}
		this.pctner.innerHTML = this.pg;
		
		if(this.pg<this.tpg){
			this.pdown.show();this.dpdown.hide();
		}else{
			this.pdown.hide();this.dpdown.show();
		}
		
	},
	_bindEvent:function(){
		var eles = this.ediv.getElementsByTagName("A");
		for(var i=0;i<eles.length;i++){
			var ele = eles[i];
			Event.observe(ele,"click",this._onclickImg)
		}
		var pnele = document.getElementsByClassName("pageNext",this.mdiv,"A")[0];
		if(pnele){
			Event.observe(pnele,"click",function(){this._buildContent(this.pg+1);}.bind(this));
		}
		var ppele = document.getElementsByClassName("pagePrev",this.mdiv,"A")[0];
		if(ppele){
			Event.observe(ppele,"click",function(){this._buildContent(this.pg-1);}.bind(this));
		}
	},
	_onclickImg:function(evt){
		//this对象为被点击的表情
		evt = evt ? evt : (window.event ? window.event : null);   
        var elem = evt.srcElement ? evt.srcElement : evt.target;  
        var id = elem.name;
        eval("var s=Mini.Emotion.emotions["+id+"]");
        Mini.Emotion.ouput.value += s;
        Mini.Emotion.mdiv.hide();
	},
	show:function(evt){
		if(!Mini.Emotion._hasInit)Mini.Emotion.init();
		//this对象为回填的输入框
		evt = evt ? evt : (window.event ? window.event : null);   
        var elem = evt.srcElement ? evt.srcElement : evt.target;  
        Position.clone(elem,Mini.Emotion.mdiv,{
	      setLeft:    true,
	      setTop:     true,
	      setWidth:   false,
	      setHeight:  false,
	      offsetTop:  -150,
	      offsetLeft: 0
    	});
		Mini.Emotion.mdiv.show();
		Mini.Emotion.ouput = this;
		outEvent([Mini.Emotion.mdiv,elem],function(){Mini.Emotion.mdiv.hide();return true;});
	}
}
