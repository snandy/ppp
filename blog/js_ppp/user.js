$register('blog.user',function(){window.Friend=Class.create({initialize:function(options){this.setOpt(options);this.initPpt();this.build();this.initEles();this.initEvts();this.disaSingle(this.opts.showDF);},initPpt:function(){this.UBD=window.UserBlogData;this.friends=this.$A(this.UBD);this.keyword='';this.disableSingle=false;this.curFid=null;},$A:function(friends){var fArray=[];for(var friend in friends){var f=friends[friend];if(typeof(f)=='object'&&!f._stranger){f.passport=friend;fArray.push(f);}}
return $A(fArray).compact();},setOpt:function(options){options.tips=Object.extend({sch:Friend.Tips.search,top:'',alert:''},options.tips),this.opts=Object.extend({parent:document.body,showSI:Friend.Display.show,showTB:Friend.Display.show,showSH:Friend.Display.show,showFL:getCookie('friLayerDisplay')||Friend.Display.hide,showDF:false,stMode:Friend.StMode.normal,siMode:Friend.SiMode.big,seMode:Friend.SeMode.check,callBack:Prototype.emptyFunction,rndCount:5},options||{});this.opts.parent=$(this.opts.parent);this.opts.parent.innerHTML='正在加载...';},build:function(){var arr=[],friends=this.friends;arr.push('<div id="fFinder" class="finder" style="display:'+this.opts.showSI+';">'+'<div class="finderWrap clearfix">'+'<div class="input">'+'<input id="fSearchIpt" type="text" value="'+this.opts.tips.sch+'" />'+'</div>'+'<div class="toggle">'+'<a id="fSeletorToggle" href="javascript:void(0)" class="show" style="display:'+this.opts.showSH+';">全部好友</a>'+'<a id="fSearchClear" href="javascript:void(0)" class="all" style="display:none;">全部好友</a>'+'</div>'+'</div>'+'</div>'+'<div id="fSelectLayer" class="selector clearfix" style="display:'+this.opts.showFL+';">'+'<div id="fsToolbar" class="options clearfix" style="display:'+this.opts.showTB+';">'+'<div class="method"><a id="fSelectAll" href="javascript:void(0)" >全选</a> | <a id="fSelectCancel" href="javascript:void(0)" >取消选择</a> | <a id="fSelectRandom" href="javascript:void(0)" >随机选取'+this.opts.rndCount+'个人</a></div>'+'<div class="filter"><a id="fSelected" href="javascript:void(0)">已选</a>(<span id="fSeledCount">0</span>) | <a id="fShowAll" class="current" href="javascript:void(0)">所有</a>(<span id="fAllCount">'+this.friends.length+'</span>)</div>'+'</div>'+'<div id="fSelectBox" class="friends">'+'<div id="fAlert" class="selectTip">'+this.opts.tips.top+'</div>'+'<ul id="fContainer" class="clearfix">');for(var i=0;i<friends.length;i++){var liClass='',double='<div class="friend">双向好友</div>',f=friends[i];if(typeof(f)!='undefined'){if(f.relations==Friend.Type.single){liClass=Friend.Style.single;double='';}
var icon='';if(f.icon)
icon=f.icon;else
icon=f.ico;arr.push('<li id="'+f.passport+'" class="'+liClass+'" initClass="'+liClass+'" >'+'<a href="javascript:void(0)">'+'<div class="icon"><img src="'+icon+'" /></div>'+'<div class="info">'+f.title+'</div>'+double+'<em>已选</em>'+'</a>'+'</li>');}}
arr.push('</ul></div><div class="footTip">当对方也加你为好友时显示该图标</div></div>');arr.push('<input type="hidden" name="selectedFriends" id="selectedFriends" value="" />');this.opts.parent.innerHTML=arr.join('');},initEles:function(){this.finderEle=$('fFinder');this.schIptEle=$('fSearchIpt');this.selToggleEle=$('fSeletorToggle');this.schClearEle=$('fSearchClear');this.selAllEle=$('fSelectAll');this.selCancelEle=$('fSelectCancel');this.selRandomEle=$('fSelectRandom');this.seledEle=$('fSelected');this.showAllEle=$('fShowAll');this.fSeledCountEle=$('fSeledCount');this.fAllCountEle=$('fAllCount');this.selLayerEle=$('fSelectLayer');this.toolbarEle=$('fsToolbar');this.selBoxEle=$('fSelectBox');this.fCtnrEle=$('fContainer');this.fLiTags=this.fCtnrEle.childElements();this.curToolEle=this.showAllEle;this.seledInput=$('selectedFriends');},initEvts:function(){var stopEvent=function(e){Event.stop(e);}
Event.observe(this.schIptEle,'focus',this.clearSchIpt.bind(this));Event.observe(this.schIptEle,'blur',this.resetSchIpt.bind(this,false));Event.observe(this.schIptEle,'keyup',this.schFriend.bind(this));Event.observe(this.schIptEle,'click',stopEvent.bindAsEventListener());Event.observe(this.selToggleEle,'click',this.setSelBox.bind(this,false));Event.observe(this.schClearEle,'click',this.resetSchIpt.bind(this,true));Event.observe(this.selAllEle,'click',this.selectAll.bind(this));Event.observe(this.selCancelEle,'click',this.selectCancel.bind(this,false));Event.observe(this.selRandomEle,'click',this.selectRandom.bind(this));Event.observe(this.seledEle,'click',this.selected.bind(this));Event.observe(this.showAllEle,'click',this.showAll.bind(this));Event.observe(this.fCtnrEle,'click',this.selectSingle.bindAsEventListener(this));},showSI:function(sValue){this.finderEle.style.display=sValue;},showTB:function(sValue){this.toolbarEle.style.display=sValue;},showSH:function(sValue){this.selToggleEle.style.display=sValue;},showFL:function(sValue){this.showSelBox();},showDF:function(disableSingle){this.disaSingle(disableSingle);},showSelBox:function(){this.setSelBox(true);},clearSchIpt:function(){this.showSelBox();if(this.schIptEle.value==this.opts.tips.sch){this.schIptEle.value='';this.schIptEle.className=Friend.Style.text;}},resetSchIpt:function(enforce){if(typeof(enforce)!='undefined'&&enforce){this.schIptEle.value=this.opts.tips.sch;this.schIptEle.className=Friend.Style.grey;this.selectCancel(enforce);}
else{if(this.schIptEle.value==''){this.schIptEle.value=this.opts.tips.sch;this.schIptEle.className=Friend.Style.grey;this.showAll();}}},schFriend:function(){if(this.schIptEle.value==this.keyword)
return;this.keyword=this.schIptEle.value==this.opts.tips.sch?'':this.schIptEle.value.toLowerCase();var repTxt='<strong>'+this.keyword+'</strong>';var arr=[];if(this.keyword=='')
this.schClearEle.style.display='none';else
this.schClearEle.style.display='block';;for(var i=0;i<this.friends.length;i++){var f=this.friends[i];if(typeof(f)!='undefined'){var liClass='',initLiClass='',liState='',title=f.title;var double='<div class="friend">双向好友</div>';if(f.relations==Friend.Type.single){initLiClass='single';liClass=initLiClass;double='';}
liClass=this.fLiTags[i].className;if(this.keyword!=''){if(f.title.toLowerCase().indexOf(this.keyword)!=-1)
title=f.title.toLowerCase().replace(this.keyword,repTxt);else
liState='style="display:none;"';}
var icon='';if(f.icon)
icon=f.icon;else
icon=f.ico;arr.push('<li id="'+f.passport+'" class="'+liClass+'"  initClass="'+initLiClass+'" '+liState+' >'+'<a href="javascript:void(0)">'+'<div class="icon"><img src="'+icon+'" /></div>'+'<div class="info">'+title+'</div>'+double+'<em>已选</em>'+'</a>'+'</li>');}}
this.fCtnrEle.innerHTML=arr.join('');this.fLiTags=this.fCtnrEle.childElements();this.setToolEle(this.curToolEle);},setSelBox:function(isShow){if(typeof(isShow)!='undefined'&&isShow)
this.selLayerEle.style.display='block';else
this.selLayerEle.toggle();this.selToggleEle.className=this.selLayerEle.visible()?Friend.Style.hide:Friend.Style.show;setCookie('friLayerDisplay',this.selLayerEle.style.display!='none'?'block':'none','never','/',document.location.href.indexOf("blog.sohu.com")!=-1?'blog.sohu.com':document.domain);},selectAll:function(){if(this.selAllEle.className==Friend.Style.current)
return;var disableSingle=this.disableSingle;this.fLiTags.each(function(li){if(!(disableSingle&&li.className==Friend.Style.single))
$(li).show().className=Friend.Style.selected;});this.setToolEle(this.selAllEle);this.setSelected();},selectCancel:function(reset){if(this.selCancelEle.className==Friend.Style.current)
return;this.fLiTags.each(function(li){if(typeof(reset)!='undefined'&&!reset)
$(li).show().className=li.getAttribute('initClass');});if(typeof(reset)!='undefined'&&reset)
this.schFriend();else
this.setToolEle(this.selCancelEle);this.setSelected();},selectRandom:function(){var fCount=this.friends.length-1;this.selectCancel(false);if(this.friends.length<=this.opts.rndCount){for(var i=0;i<this.friends.length;i++){var li=this.fLiTags[i];if(!(this.disableSingle&&li.className==Friend.Style.single))
li.className=Friend.Style.selected;}}
else{for(var i=0;i<this.opts.rndCount;i++){var index=Math.floor(Math.random()*fCount);var li=this.fLiTags[index];if((this.disableSingle&&li.className==Friend.Style.single)||li.className==Friend.Style.selected)
i=i-1;else
li.className=Friend.Style.selected;}}
this.setToolEle(this.selRandomEle);this.selected();this.setSelected();},selected:function(){if(this.seledEle.className==Friend.Style.current)
return;this.fLiTags.each(function(li){if(li.className!=Friend.Style.selected)
$(li).hide();});this.setToolEle(this.seledEle);},showAll:function(){if(this.showAllEle.className==Friend.Style.current)
return;this.fLiTags.each(function(li){$(li).show();});this.setToolEle(this.showAllEle);},selectSingle:function(e){if(this.opts.seMode==Friend.SeMode.radio&&this.curFid&&this.curFid!='')
$(this.curFid).className=$(this.curFid).getAttribute('initClass');var li=this.getEvtEle(e,this.fCtnrEle);if(!li)return;if(li&&!(li.className==Friend.Style.single&&this.disableSingle)){if(li.className!=Friend.Style.selected)
li.className=Friend.Style.selected;else
li.className=li.getAttribute('initClass');this.fLiTags=this.fCtnrEle.childElements();this.setSelected();this.setToolEle(this.curToolEle);this.curFid=li.id;var ubd=this.UBD[li.id];ubd.passport=li.id;this.opts.callBack(ubd);}
else{if(typeof friendPokeHome!=undefined){jQuery.alert({title:'消息',content:this.opts.tips.alert,onClose:function(){}});}else{Dialog.instance({title:this.opts.tips.alert,button:[{value:'确定'}]});}}},setToolEle:function(a){this.curToolEle.className=Friend.Style.normal;if(a!=this.curToolEle){a.className=Friend.Style.current;this.curToolEle=a;}},getEvtEle:function(e,parent){var ele=Event.element(e);if(ele==parent)
return null;do{if(ele.parentNode&&ele.parentNode==parent)break;}while(ele=ele.parentNode)
return ele;},disaSingle:function(disable){if(typeof(disable)!='undefined'&&this.disableSingle!=disable){if(disable){this.fLiTags.each(function(li){if(li.getAttribute('initClass')==Friend.Style.single&&li.className==Friend.Style.selected)
li.className=Friend.Style.single;});this.selBoxEle.addClassName(Friend.Style.disableSingle);this.disableSingle=true;}
else{this.selBoxEle.removeClassName(Friend.Style.disableSingle);this.disableSingle=false;}}},setSelected:function(){var selectedFriends=this.fCtnrEle.select('li.selected');var arr=[];for(var i=0;i<selectedFriends.length;i++)
arr.push(selectedFriends[i].id);this.seledInput.value=arr.join(',');this.fSeledCountEle.innerHTML=selectedFriends.length;}});Friend.init=function(options){return new Friend(options);};Friend.Type={single:1,double:2};Friend.Display={show:'block',hide:'none;'};Friend.StMode={normal:'1'};Friend.SiMode={small:'1',middle:'2',big:'3'};Friend.SeMode={radio:'1',check:'2'};Friend.Tips={search:'在这里输入某个好友的博客名称...'};Friend.Style={text:'text',grey:'text grey',show:'show',hide:'hide',normal:'',selected:'selected',single:'single',current:'current',disableSingle:'couplesOnly',invisible:'invisible'};Friend.valid=function(){if($F('selectedFriends')==''){Dialog.instance({title:'请先选择好友',button:[{value:'确定'}]});return false;}
return true;};$declare('blog.user.User',{getInfos:function(xpts,callback){if(typeof(xpts)=='object'&&xpts!=null&&xpts.length>0)xpts=xpts.join(',');if(xpts.length==0)return;new Ajax.Request('/service/userinfo.jsp',{postBody:'xp='+xpts,onSuccess:function(transport){if(transport.responseText){var json=eval('('+transport.responseText+')');if(json){if(!window.UserBlogData)window.UserBlogData={};for(var it in json){if(json[it]&&json[it].url){UserBlogData[it]=json[it];UserBlogData[it]._stranger=true;}}
if(typeof(callback)=='function')callback();}}}});},fill:function(){var xpts=this._fill();if(xpts.length>0)this.getInfos(xpts,this._fill);},_fill:function(){if(!window.UserBlogData)window.UserBlogData={};var U=UserBlogData;var eles=document.getElementsByName("BlogUser"),el,xpt,xpts=[];for(var i=0,il=eles.length;i<il;i++){if(i>=eles.length)break;el=eles[i];if((xpt=Attr.data(el,'xpt'))&&(!Attr.data(el,'blogStatus')||Attr.data(el,'blogStatus')!=1)){if(U[xpt]){Attr.expContext(U[xpt],el,'blogExp');Attr.data(el,'blogStatus','1');}else{xpts.push(xpt);}}}
return xpts;}});},'util.common');