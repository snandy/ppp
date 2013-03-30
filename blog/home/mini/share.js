/**
 * 一键转帖相关
 * @author junchen626
 */
if(!Mini) var Mini = {};
Mini.Share={
	fwInfo:{from:encodeURIComponent('搜狐微博'),content:''},
	toBlog:function(eA){
		var url = this.getUrl(eA);
		var title = this.getTitle(eA,'escape');
		window.open('http://share.blog.sohu.com/submit.jhtml?shareType=0&url='
			+url+'&title='+title,'一键转帖到搜狐博客');
		return false;
	},
	toBai:function(eA){
		var url = this.getUrl(eA);
		var title = this.getTitle(eA);
		window.open('http://bai.sohu.com/share/blank/addbutton.do?from='
			+this.fwInfo.from+'&link='+url+'&title='+title,'一键转帖到白社会');
		return false;
	},
	toKaixin :function(eA) {
		var url = this.getUrl(eA);
		var title = this.getTitle(eA);
		var content = this.getContent(eA);
		window.open('http://www.kaixin001.com/repaste/share.php?rtitle='
			+title+'&rurl='+url+'&rcontent='+content,'一键转帖到开心网');
		return false;
	},
	toXiaonei:function(eA) {
		var url = this.getUrl(eA);
		var title = this.getTitle(eA);
			window.open('http://share.renren.com/share/buttonshare.do?link='
			+url+'&title='+title,'一键转帖');
		return false;
	},
	toDouban:function(eA) {
		var url = this.getUrl(eA);
		var title = this.getTitle(eA);
		window.open('http://www.douban.com/recommend/?url='+url+'&title='+title,'转帖');
		
		return false;
	},
	getUrl:function(eA){
		eA = eA||Mini.Share.EventEl;
		eA = $(eA);
		try{
			if(eA.tagName != 'a'){
				eA = eA.up('a');
			}
			var url = eA.previous('span').innerHTML;
			if(url.indexOf('http://') == -1){
				url = 'http://'+window.location.host + url;
			}
			var url = encodeURIComponent(url);
		}catch(err){
			var url = '';
		}
		return url;
	},
	getTitle:function(eA,encodeType){
		eA = eA||Mini.Share.EventEl;
		eA = $(eA);
		var title = '';
		
		try{
			var ele = eA.up('div.feedItem');
			ele = ele.down('div.feedHead');
			if(encodeType == 'escape'){
				title = escape(ele.innerHTML.replace(/<[^>]*>/ig,''));
			}else{
				title = encodeURIComponent(ele.innerHTML.replace(/<[^>]*>/ig,''));
			}
		}catch(err2){
			
		}
		title = title.replace(/%A0/g,'%20');//nbsp;产生的空格变成普通空格，否则会产生乱码
		return title;
	},
	getContent:function(eA){
		eA = eA||Mini.Share.EventEl;
		eA = $(eA)
		try{
			var content = encodeURIComponent(eA.up('div.feedItem').down('h4').down('p').innerHTML);
		}catch(err){
			var content = '';
		}
		content = content.replace(/%A0/g,'%20');//nbsp;产生的空格变成普通空格，否则会产生乱码
		return content;
	},
		
	showSites:function(evt){
		var el = Event.element(evt);
		this._buildList();
		Position.clone(el,this.layer,{
	      setLeft:    true,
	      setTop:     true,
	      setWidth:   false,
	      setHeight:  false,
	      offsetTop:  20,
	      offsetLeft: 0
    	});
		if(!Mini.Share.layer.visible() || Mini.Share.EventEl != el){
			Mini.Share.layer.show();
			Event.stop(evt);
			outEvent([Mini.Share.layer],function(){Mini.Share.layer.hide();return true;})
		}else if(Mini.Share.EventEl == el){
			Mini.Share.layer.hide();
		}
		Mini.Share.EventEl = el;
		
		return false;
	},
	_buildList:function(){
		if(Mini.Share.hasBuild)return;
		this.layer = new Element('div',{'class':'popLayer'});
		this.layer.className='popLayer';
		this.layer.setStyle({'width':'75px'});
		var str='<div class="decor">'
					+'<span class="tl">'
					+'<span class="tr">'
					+'<span class="br">'
					+'<span class="bl">'
				+'</span></span></span></span></div>'
				+'<div class="content">'
				+'</div>';
		this.layer.innerHTML = str;
		this.layer.hide();
		var sites=[{title:'搜狐博客',icon:'i-st-blog',handler:'toBlog'},
					{title:'白社会',icon:'i-st-bai',handler:'toBai'},
					{title:'开心网',icon:'i-st-kaixin',handler:'toKaixin'},
					{title:'人人网',icon:'i-st-renren',handler:'toXiaonei'},
					{title:'豆瓣网',icon:'i-st-douban',handler:'toDouban'}
					];
		var sitesEl = this.layer.getElementsByTagName('div')[1];
		sitesEl = $(sitesEl);
		for(var i=0;i<sites.length;i++){
			var site = sites[i];
			var item = new Element('div');
			item.className = 'shareLi';
			//if(i==sites.length-1){item.className='noborder'}
			item.innerHTML ='<a href="javascript:void(0)" onclick="Mini.Share.'+site.handler+'()" title="'+site.title+'"><i class="i '+site.icon+'"></i>'+site.title+'</a>';
			sitesEl.insert(item);
		}
		if($("pagePop"))
			$("pagePop").appendChild(this.layer);
		else
			document.body.appendChild(this.layer);
			
		Mini.Share.hasBuild = true;
		
	}
}
