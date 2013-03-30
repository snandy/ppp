/**
*
*  Copyright 2007 Sohu.com Inc. All rights reserved.
*  搜狐公司
*  @author jadyyang@sohu.com
*  date: 2008-07-15
**/
var UWA={};
UWA.innerXML=function(node){var str='';var nodes=node.childNodes;if(nodes){for(var i=0;i<nodes.length;i++){var nodeNow=nodes[i];if(nodeNow.nodeType==3){str+=nodeNow.data;}else{if(nodeNow.xml){str+=nodeNow.xml;}else{var serializer=new XMLSerializer();str+=serializer.serializeToString(nodeNow);}}}}
return str;}
UWA.log=function(obj){if(window.console){console.log(obj);}else{if((App.Permit.able3rdDev||App.Permit.ableDemo)&&document.readyState&&document.readyState=="complete"){if(obj instanceof Error){$LR("--------- Error ---------");$LR("name: "+obj.name);$LR("number:"+(obj.number&0xFFFF));$LR("message: "+obj.message);$LR("-------------------------");}else{$LR(obj.toString());}}}}
UWA.Config={moduler:"/px",ajax:"/py"}
UWA.Data={getXml:function(url,callback){this.request(url,{type:"xml",parameters:"ct=text%2Fxml",onComplete:callback});},getText:function(url,callback){this.request(url,{type:"text",onComplete:callback});},getJson:function(url,callback){this.request(url,{type:"json",onComplete:callback});},getModule:function(url,callback,errorCallback,isUseCache){var request={type:"xml",proxy:"moduler",onComplete:callback,onFailure:errorCallback}
if(!isUseCache)request.parameters="ca=0";this.request(url,request);},getFeed:function(url,callback){},request:function(url,request){request=Object.extend({method:"get",proxy:"ajax",type:"text",parameters:""},request||{});if(typeof(request.onComplete)!="function")request.onComplete=function(){}
var urlStr=UWA.Config[request.proxy];if(urlStr&&urlStr!=""){url=urlStr+"?url="+encodeURIComponent(url)+"&c="+new Date().getTime();}else{url+=(url.match(/\?/)?'&':'?')+"_ow_c="+new Date().getTime();}
if(!request.onFailure)request.onFailure=this.onFailure;request.onSuccess=request.onComplete;request.onComplete=null;switch(request.type){case"text":var callback=request.onSuccess;request.onSuccess=function(transport){try{callback(transport.responseText);}catch(e){UWA.log(e);}}
new Ajax.Request(url,request);break;case"json":var callback=request.onSuccess;request.onSuccess=function(transport){try{var data=eval("("+transport.responseText+")");callback(data);}catch(e){UWA.log(e);}}
new Ajax.Request(url,request);break;case'xml':var callback=request.onSuccess;request.onSuccess=function(transport){try{callback(transport.responseXML,transport);}catch(e){UWA.log(e);}}
new Ajax.Request(url,request);break;}},onFailure:function(transport){UWA.log("status:"+transport.status+";statusText:"+transport.statusText);}}
UWA.Element={addClassName:function(className){if(!this.hasClassName(className))this.className=(this.className.length==0?"":(this.className+" "))+className;},addContent:function(content){switch(typeof(content)){case"string":case"number":var div=document.createElement("div");div.innerHTML=content;this.appendChild(div);break;case"object":this.appendChild(content);break;}},appendText:function(text){var textN=document.createTextNode(text);this.appendChild(textN);},empty:function(){this.innerHTML="";},getDimensions:function(){if(this.style.display!=null&&this.style.display!="none"){return{width:this.offsetWidth,height:this.offsetHeight}}
var els=this.style;var originalVisibility=els.visibility;var originalPosition=els.position;var originalDisplay=els.display;els.position='absolute';els.visibility='hidden';els.display='block';var originalWidth=this.clientWidth;var originalHeight=this.clientHeight;els.display=originalDisplay;els.position=originalPosition;els.visibility=originalVisibility;return{width:originalWidth,height:originalHeight}},getElementsByClassName:function(className){var childs=this.all?this.all:this.getElementsByTagName("*");var eles=[];for(var i=0;i<childs.length;i++){if(childs[i].className.match(new RegExp("(^|\\s)"+className+"(\\s|$)"))){eles.push(childs[i]);}}
return eles;},getParent:function(){return this.parentNode;},getChildren:function(){return this.childNodes;},hasClassName:function(className){return this.className.match(new RegExp("(^|\\s)"+className+"(\\s|$)"));},hide:function(){this.style.display="none";},remove:function(){this.parentNode.removeChild(this);},removeClassName:function(className){this.className=this.className.replace(new RegExp('(^|\\s)'+className+'(\\s|$)'),'$1').trim();},setText:function(text){this.innerHTML="";this.appendText(text);},setHTML:function(html){this.innerHTML=html;},setContent:function(content){this.innerHTML="";this.addContent(content);},setStyle:function(property,value){this.style[property]=value;},show:function(){this.style.display="";},toggle:function(){this.style.display=this.style.display=="none"?"":"none";}}
UWA.$element=function(element){var obj=typeof(element)=="string"?document.getElementById(element):element;if(!obj.isUwaExtended){Object.extend(obj,UWA.Element);obj.isUwaExtended=true;}
return obj;}
UWA.Reference={config:{base:[["name","","string"],["label","","string"],["defaultValue",undefined,"string"]],text:[],boolean:[["onchange",false,"boolean"],["defaultValue","false","string"]],hidden:[],range:[["onchange",false,"boolean"],["min","1","string"],["max","1","string"],["step","1","string"],["defaultValue",undefined,"string"]],list:[["onchange",false,"boolean"]],password:[]},getData:function(element){var object={};this.parseData(this.config.base,element,object);var type=element.getAttribute("type")==undefined?"text":element.getAttribute("type").toLowerCase();object.type=type;this[type+"Data"](element,object);return object;},textData:function(element,object){},booleanData:function(element,object){this.parseData(this.config.boolean,element,object);},hiddenData:function(element,object){},rangeData:function(element,object){this.parseData(this.config.range,element,object);},listData:function(element,object){this.parseData(this.config.list,element,object);var options=element.getElementsByTagName("option");object.options=[];for(var i=0;i<options.length;i++){object.options.push({label:options[i].getAttribute("label"),value:options[i].getAttribute("value")});}},passwordData:function(element,object){},parseData:function(config,element,object){for(var i=0;i<config.length;i++){var value=element.getAttribute(config[i][0]);if(value==null){object[config[i][0]]=config[i][1];}else{switch(config[i][2]){case"number":value=parseFloat(value);break;case"boolean":value=value.toLowerCase()=="true";break;}
object[config[i][0]]=value;}}
return object;},bindObjData:function(config,obj){for(var i=0;i<config.length;i++){if(typeof(obj[config[i][0]])!=config[i][2]){obj[config[i][0]]=config[i][1];}}},bindData:function(obj){this.bindObjData(this.config.base,obj);this.bindObjData(this.config[obj.type],obj);return obj;}}
UWA.Widget=function(){}
UWA.Widget.prototype.initialize=function(title,body,scripts){if(UWA.Config.fileInPage){Object.extend(this,widget);widget=this;}else{this.setScripts(scripts);}
this.setTitle(title);this.setBody(body);}
UWA.Widget.prototype.setScripts=function(scripts){var widget=this;if(scripts&&scripts.length&&scripts.length>0){for(var i=0;i<scripts.length;i++){eval(scripts[i]);}}}
UWA.Widget.prototype.onResize=function(){}
UWA.Widget.prototype.onSearch=function(){}
UWA.Widget.prototype.onResetSearch=function(){}
UWA.Widget.prototype.onKeyboardAction=function(){}
UWA.Widget.prototype.addBody=function(content){this.body.addContent(content);}
UWA.Widget.prototype.createElement=function(tagName){if(tagName=="script")return false;var el=document.createElement(tagName);return UWA.$element(el);}
UWA.Widget.prototype.getValue=function(name){}
UWA.Widget.prototype.openURL=function(url){window.open(url);}
UWA.Widget.prototype.setBody=function(content){this.body.innerHTML=content;}
UWA.Widget.prototype.setTitle=function(title){}
UWA.Widget.prototype.setValue=function(name,value){}
UWA.Widget.prototype.log=function(obj){}
UWA.Widget.prototype.setAutoRefresh=function(delay){}
UWA.Widget.prototype.setUnreadCount=function(count){}
UWA.Widget.prototype.setSearchResultCount=function(count){}
UWA.WidgetLib={libs:[],getWidgetClassId:function(path){var pathLower=path.toLowerCase();var libs=this.libs;for(var i=0;i<libs.length;i++){if(libs[i].path==pathLower){return i;}}
return-1;},getWidget:function(path,callback,isUseCache){if(isUseCache){var widgetLib=null;var index=this.getWidgetClassId(path);if(index>=0){widgetLib=this.libs[index];switch(widgetLib.status){case-1:widgetWrapper=widgetLib.wrapper;break;case 0:widgetLib.callbacks.push(callback);break;case 1:widgetWrapper=this.libs[index].wrapper;break;}}else{widgetLib={path:path.toLowerCase(),status:0,wrapper:null,callbacks:[callback]};this.libs.push(widgetLib);}
if(widgetLib.status==0){this.requestWidget(path);}else{callback(widgetLib.wrapper);}}else{this.requestWidgetNC(path,callback);}},requestWidget:function(url){UWA.Data.getModule(url,this.loadedWidgetXml.bind(this,url),this.loadFailure.bind(this,url),true);},requestWidgetNC:function(url,callback){UWA.Data.getModule(url,this.loadedWidgetXmlNC.bind(this,url,callback),this.loadFailureNC.bind(this,url,callback),false);},loadFailure:function(path,ajax){var index=this.getWidgetClassId(path);if(index>=0){var widget=this.libs[index];widget.status=-1;widget.wrapper=null;var callbacks=widget.callbacks;while(callbacks.length>0){var callback=callbacks.pop();callback(widget.wrapper);}}},loadedWidgetXml:function(path,xmlDoc,ajax){try{var wrapper=UWA.WidgetWrapper.getFromXml(xmlDoc,ajax);}catch(e){UWA.log(e);return;}
var index=this.getWidgetClassId(path);if(index>=0){wrapper.classId=index;var widget=this.libs[index];widget.status=1;widget.wrapper=wrapper;var callbacks=widget.callbacks;while(callbacks.length>0){var callback=callbacks.pop();callback(wrapper);}}},loadFailureNC:function(path,callback,ajax){callback(null);},loadedWidgetXmlNC:function(path,callback,xmlDoc,ajax){try{var wrapper=UWA.WidgetWrapper.getFromXml(xmlDoc,ajax);}catch(e){UWA.log(e);return;}
callback(wrapper);}}
UWA.WidgetWrapper=function(isPrivate){this._from="";this._xml=null;this._obj=null;this.classId=0;this.isPrivate=(typeof(isPrivate)=="boolean")?isPrivate:true;this._intro=null;this._scripts=null;this._refs=null;this._refDom=null;this._body=null;}
UWA.WidgetWrapper.prototype.getDefaultBaseInfo=function(){return{title:"",icon:"",author:"",website:"",description:"",version:"",keywords:"",screenshot:"",thumbnail:"",apiVersion:"",debugMode:false,autoRefresh:0}}
UWA.WidgetWrapper.prototype.parseBaseInfo=function(){if(this._intro==null){this._intro=this.getDefaultBaseInfo();this._scripts="";this._body="";if(this._from=="xml"||this._from=="this"){try{var isXml=this._from=="xml";if(isXml){var doc=this._xml.documentElement;var head=doc.getElementsByTagName("head")[0];var body=doc.getElementsByTagName("body")[0];}else{var doc=document;var head=doc.getElementsByTagName("head")[0];var body=doc.body;}
if(isXml){var title=head.getElementsByTagName("title")[0];this._intro.title=title.text||title.firstChild.data;}else{this._intro.title=doc.title;}
var links=head.getElementsByTagName("link");for(var i=0;i<links.length;i++){if(links[i].getAttribute("rel")=="icon"){this._intro.icon=links[i].getAttribute("href");break;}}
var metas=head.getElementsByTagName("meta");for(var i=0;i<metas.length;i++){var typeName=metas[i].getAttribute("name");var typeValue=metas[i].getAttribute("content");switch(typeName){case"debugMode":typeValue=typeValue=="true";break;case"autoRefresh":try{typeValue=parseInt(typeValue);}catch(e){typeValue=0;}
break;}
this._intro[typeName]=typeValue;}
var styles=head.getElementsByTagName("style");var styleStr="";for(var i=0;i<styles.length;i++){if(styles[i].getAttribute("src")==null){styleStr+=UWA.innerXML(styles[i]);}}
styleStr=styleStr.trim();if(styleStr.length>0){styleStr=styleStr.replace(/#moduleContent/g,'');styleStr=styleStr.replace(/\n\s*([a-zA-z0-9\.\-, :#]*)\s*([{|,])/g,"\n\.uwa_widget_"+this.classId+" $1$2");var styleEle=document.createElement("style");styleEle.setAttribute("type","text/css");if(styleEle.styleSheet){styleEle.styleSheet.cssText=styleStr;}else{styleEle.appendChild(document.createTextNode(styleStr));}
document.getElementsByTagName("head")[0].appendChild(styleEle);}
this._scripts=[];if(isXml){var scripts=head.getElementsByTagName("script");for(var i=0;i<scripts.length;i++){for(var j=0;j<scripts[i].childNodes.length;j++){var nodeType=scripts[i].childNodes[j].nodeType;if(nodeType==8||nodeType==4){this._scripts.push(scripts[i].childNodes[j].nodeValue);}}}}
this._refDom=head.getElementsByTagName("preference");if(isXml){this._body=UWA.innerXML(body);}else{this._body=body.innerHTML;}}catch(e){throw new SyntaxError("此文档不是一个有效的SOW Widget文档");}}else if(this._from=="obj"){this._intro=this._obj.intro;this._scripts=this._obj.scripts;this._refDom=this._obj.refs;this._body=this._obj.body;}}
this.parseRef();}
UWA.WidgetWrapper.prototype.parseRef=function(){if(this._refs==null){this._refs=[];var dataFuncName=this._from=="xml"||this._from=="this"?"getData":"bindData";var displayCount=0;for(var i=0;i<this._refDom.length;i++){var item=UWA.Reference[dataFuncName](this._refDom[i]);this._refs.push(item);this._refs[item.name]=item;}}}
UWA.WidgetWrapper.prototype.getIntro=function(){this.parseBaseInfo();return this._intro;}
UWA.WidgetWrapper.prototype.getScripts=function(){this.parseBaseInfo();return this._scripts;}
UWA.WidgetWrapper.prototype.getPreferences=function(){this.parseBaseInfo();return this._refs;}
UWA.WidgetWrapper.prototype.getBody=function(){this.parseBaseInfo();return this._body;}
UWA.WidgetWrapper.getFromThis=function(){var wrapper=new UWA.WidgetWrapper(false);wrapper._from="this";return wrapper;}
UWA.WidgetWrapper.getFromXml=function(xmlDom,ajax){if(xmlDom&&xmlDom.documentElement){var isPrivate=false;if(ajax&&ajax.getResponseHeader("Widget-Status")=="1"){isPrivate=true;}
var wrapper=new UWA.WidgetWrapper(isPrivate);wrapper._from="xml";wrapper._xml=xmlDom;return wrapper;}else{var error='';if(xmlDom.parseError&&xmlDom.parseError.reason){error+="-&lt;filepos:"+xmlDom.parseError.filepos+"; line:"+xmlDom.parseError.line+"; linepos:"+xmlDom.parseError.line+"; reason:"+xmlDom.parseError.reason;}
throw new SyntaxError("此文档不是一个标准的XML文档，不符合SOW Widget文档规范"+error);}}
UWA.WidgetWrapper.getFromObj=function(obj){var wrapper=new UWA.WidgetWrapper();wrapper._from="obj";wrapper._obj=obj;return wrapper;}
UWA.Controls={};
UWA.Controls.Pager=function(params){this.module=params.module;this.limit=parseInt(params.limit);this.offset=parseInt(params.offset);this.dataArray=params.dataArray;}
UWA.Controls.Pager.prototype.getContent=function(){var ctr=document.createElement("div");ctr.className="pager";if(this.offset>0){var pre=document.createElement("a");pre.className="prev";pre.href="javascript:void(0);";pre.innerHTML="上一页";pre.onclick=this.onChange.bind(this,this.offset-this.limit);ctr.appendChild(pre);}
if(this.offset<this.dataArray.length-this.limit){var next=document.createElement("a");next.className="next";next.href="javascript:void(0);";next.innerHTML="下一页";next.onclick=this.onChange.bind(this,this.offset+this.limit);ctr.appendChild(next);}
return ctr;}
UWA.Controls.Pager.prototype.getDom=function(){return this.getContent();}
UWA.Controls.Pager.prototype.onChange=function(offset){}
UWA.Controls.TabView=function(options){this.initialize(options);}
UWA.Controls.TabView.prototype={setOptions:function(options){this.options={autohideDropdowns:true,tabSetClass:"tabSet",tabListClass:"tabList",tabContentClass:"tabContent",softPadding:false,orientation:'top',dataKey:'text',extendedAction:false}
Object.extend(this.options,options||{});},initialize:function(options){this.setOptions(options);this.dataItems={};this.selectedTab=null;this.selectedIndex=this.options.selectedIndex||0;},_createTabSet:function(){this.tabSet=document.createElement("div");this.tabSet.className=this.options.tabSetClass;this.tabList=document.createElement("ul");this.tabList.className=this.options.tabListClass+" autoclear";this.tabList.style.padding='0';if(/^(top)|(bottom)|(left)|(right)$/.test(this.options.orientation)){Element.addClassName(this.tabList,this.options.orientation);}
this.tabSet.appendChild(this.tabList);},appendTo:function(element){if(!this.tabSet)this._createTabSet();if(!this.selectedTab&&this.tabList.hasChildNodes())this.selectTab(0,false);$(element).appendChild(this.tabSet);},addTab:function(name,dataItem,options){if(!this.tabSet)this._createTabSet();if(typeof options=='undefined')options={}
var li=document.createElement("li");li.className="tab";li.setAttribute("name",name);li.onclick=this.eventTabClicked.bindAsEventListener(this);if(options.staticText){li.setAttribute('static','static');}
var a=document.createElement("a");a.href="#";a.target="_blank";a.style.whiteSpace="nowrap";a.onclick=function(){return false;}
if(dataItem.length){if(dataItem[0].image){var imgElement=document.createElement("img");imgElement.src=dataItem[0].image;a.appendChild(imgElement);}
else{if(dataItem[0].picto){var picto=document.createElement("img");picto.src=dataItem[0].picto;picto.style.marginRight="4px";picto.style.marginBottom="-2px";a.appendChild(picto);}
else if(dataItem[0].icon){var icon=document.createElement("img");icon.src=dataItem[0].icon;icon.style.marginRight="4px";icon.style.marginBottom="-2px";a.appendChild(icon);}
var textElement=document.createElement("span");textElement.appendChild(document.createTextNode(options.staticText||dataItem[0].text));a.appendChild(textElement);}
li.setAttribute("key",dataItem[0][this.options.dataKey]);var dropdownElement=document.createElement("span");dropdownElement.className="dropdown";do{var uniqueId="dropdownTab-"+(Math.ceil(Math.random()*1000));}
while($(uniqueId))
dropdownElement.setAttribute("id",uniqueId);var placeHolder=document.createElement("img");placeHolder.src="http://ow.blog.sohu.com/styles/images/s.gif";placeHolder.width=14;placeHolder.height=14;placeHolder.style.verticalAlign="middle";placeHolder.className="placeHolder";dropdownElement.appendChild(placeHolder);a.appendChild(dropdownElement);dropdownElement.onmousedown=this.eventDropDown.bindAsEventListener(this);}
else{if(dataItem.image){var imgElement=document.createElement("img");imgElement.src=dataItem.image;a.appendChild(imgElement);}
else{if(dataItem.picto){var picto=document.createElement("img");picto.src=dataItem.picto;picto.style.marginRight="4px";picto.style.marginBottom="-2px";a.appendChild(picto);}
else if(dataItem.icon){var icon=document.createElement("img");icon.src=dataItem.icon;icon.style.marginRight="4px";icon.style.marginBottom="-2px";a.appendChild(icon);}
a.appendChild(document.createTextNode(dataItem.text));}
li.setAttribute("key",dataItem[this.options.dataKey]);}
li.appendChild(a);if(this.selectedTab==null){}
this.tabList.appendChild(li);this.createTabContent(name);this.dataItems[name]=dataItem;return li;},removeTab:function(name){var tabItem=this.getTab(name);Element.remove(tabItem);},addExternalLink:function(name,href){var tabItem=this.getTab(name);tabItem.firstChild.setAttribute("href",href);},eventTabClicked:function(e){if(Event.element(e).className=="placeHolder"){return false;}
var sender=Event.findElement(e,"LI");if(!Element.hasClassName(sender,'disabled')){this.selectTab(sender);}
return false;},eventExtendedActionClicked:function(e){this.hidePopupMenu();this._notify('extendedActionClicked');return false;},enableTab:function(name,enable){var tabItem=this.getTab(name);if(enable)Element.removeClassName(tabItem,'disabled');else Element.addClassName(tabItem,'disabled');},selectTab:function(tabItem,notify){if(typeof tabItem=='number'||typeof tabItem=='string'){tabItem=this.getTab(tabItem);}
var name=tabItem.getAttribute('name');if(this.selectedTab&&(this.selectedTab.getAttribute('name')==name)){return;}
var items=this.tabList.getElementsByTagName('li');for(var i=0,li;li=items[i];i++){Element.removeClassName(li,'selected');if(this.popupMenu)this.hidePopupMenu();if(this.options.autohideDropdowns){var dropdowns=$(li).getElementsByClassName('dropdown');$A(dropdowns).each(function(el){Element.hide(el)});}}
Element.addClassName(tabItem,'selected');if(this.options.autohideDropdowns){var dropdowns=$(tabItem).getElementsByClassName('dropdown');$A(dropdowns).each(function(el){Element.show(el)});}
for(var i=0,content;content=this.contentArray[i];i++){if(name==content.getAttribute('name'))Element.show(content);else Element.hide(content);}
this.selectedTab=tabItem;this.selectedIndex=tabItem.getAttribute('index');if(notify===false)return;this._notify('activeTabChange');},hide:function(){Element.hide(this.tabSet);},show:function(){Element.show(this.tabSet);},hideTabList:function(){Element.hide(this.tabList);},showTabList:function(){Element.show(this.tabList);},reload:function(){this._notify('activeTabChange');},eventDropDown:function(e){var sender=Event.findElement(e,"LI");this.popupMenu=$('minitabsOptions');if(!this.popupMenu){this.popupMenu=document.createElement('ul');this.popupMenu.setAttribute('id','minitabsOptions');this.popupMenu.className='popupMenu';this.popupMenu.style.position='absolute';document.getElementsByTagName('body').item(0).appendChild(this.popupMenu);Element.hide(this.popupMenu);Event.observe(document,'mousedown',this.hidePopupMenu.bindAsEventListener(this));}
var dropdownButton=$(sender).getElementsByClassName('dropdown')[0];if(Element.visible(this.popupMenu)&&this.popupMenu.getAttribute("dropdownId")==dropdownButton.id){this.hidePopupMenu();return;}
this._showPopupMenu(sender);this.popupMenu.setAttribute("dropdownId",dropdownButton.id);Event.stop(e);return false;},getTabContent:function(name){if(typeof name=='number'){return this.contentArray.detect(function(el){return el.getAttribute("index")==name;});}
return this.contentArray.detect(function(el){return el.getAttribute("name")==name;});},setContent:function(name,content){var node=this.getTabContent(name);if(node){if(typeof content=='string'){node.innerHTML=content;}
else{node.innerHTML='';node.appendChild(content);}}},getTab:function(name){if(typeof name=='string'||typeof name=='number'){var items=this.tabList.getElementsByTagName('li');for(var i=0,item;item=items[i];i++){if(typeof name=='number'&&name==i)return item;if(name==item.getAttribute('name'))return item;}}
return name;},observe:function(name,observer){if(!this.observers)this.observers=[];this.observers.push([name,observer]);},_notify:function(event){if(!this.observers)return;var sender=this.selectedTab;var eventArgs=this.dataItems[sender.getAttribute('name')];if(eventArgs.length){var dataKey=this.options.dataKey;eventArgs=eventArgs.detect(function(el){return el[dataKey]==sender.getAttribute('key')});}
this.observers.each(function(observer){if(observer[0]==event&&typeof(observer[1])=='function')
observer[1](sender.getAttribute('name'),eventArgs);});},_showPopupMenu:function(tabItem){var offset=Position.cumulativeOffset(tabItem);this.popupMenu.innerHTML='';try{var tabName=tabItem.getAttribute('name');var dataItems=this.dataItems[tabName];var tabKey=tabItem.getAttribute('key');for(var i=0,item;item=dataItems[i];i++){if(item[this.options.dataKey]==tabKey&&tabItem.getAttribute('static')!='static')
continue;var li=document.createElement("li");var a=document.createElement("a");if(item.picto){var picto=document.createElement("img");picto.src=item.picto;picto.style.marginRight="4px";picto.style.marginBottom="-2px";a.appendChild(picto);}
else if(item.icon){var icon=document.createElement("img");icon.src=item.icon;icon.style.marginRight="4px";icon.style.marginBottom="-2px";a.appendChild(icon);}
a.href=(item.htmlUrl||"javascript:void(0)");a.setAttribute('context',tabName);a.appendChild(document.createTextNode(item.text));a.setAttribute("key",item[this.options.dataKey]);if(!this.options.extendedAction&&(dataItems.length-1)==i){Element.addClassName(a,'last');}
a.onclick=this.eventPopupMenuClicked.bindAsEventListener(this);li.appendChild(a);this.popupMenu.appendChild(li);}
if(this.options.extendedAction){var li=document.createElement("li");var a=document.createElement("a");a.href="javascript:void(0)";Element.addClassName(a,'action');a.setAttribute('context',tabName);a.appendChild(document.createTextNode(this.options.extendedAction));a.onclick=this.eventExtendedActionClicked.bindAsEventListener(this);li.appendChild(a);this.popupMenu.appendChild(li);}}
catch(e){}
var tabDimensions=Element.getDimensions(tabItem);var delta=0;this.popupMenu.style.left=(offset[0]+delta)+'px';this.popupMenu.style.top=(offset[1]+delta+tabDimensions.height)+'px';this.popupMenu.style.width="auto";var menuWidth=Element.getDimensions(this.popupMenu).width;if(menuWidth<tabDimensions.width){var delta=12;if(document.all)delta=11;this.popupMenu.style.width=tabDimensions.width-delta+"px";}
Element.show(this.popupMenu);var drops=$(this.tabList).getElementsByClassName("dropped");$A(drops).each(function(el){Element.removeClassName(el,"dropped");});Element.addClassName(tabItem,'dropped');},eventPopupMenuClicked:function(e){var sender=Event.findElement(e,"A");var tabName=sender.getAttribute('context');var tabItem=this.getTab(tabName);if(tabItem.getAttribute('static')!='static'){var dataKey=this.options.dataKey;var dataItem=this.dataItems[tabName].detect(function(el){return el[dataKey]==sender.getAttribute('key')});tabItem.getElementsByTagName("span")[0].innerHTML=dataItem.text;if(dataItem.picto){tabItem.getElementsByTagName("img")[0].src=dataItem.picto;}
else if(dataItem.icon){tabItem.getElementsByTagName("img")[0].src=dataItem.icon;}}
tabItem.setAttribute("key",sender.getAttribute('key'));this._notify('activeTabChange');this.selectTab(tabItem);this.hidePopupMenu();Event.stop(e);return false;},selectKey:function(name,key,select){var tabItem=this.getTab(name);var dataItem=null;var dataKey=this.options.dataKey;if(typeof(this.dataItems[name].detect)=='function'){dataItem=this.dataItems[name].detect(function(el){return el[dataKey]==key;});}
if(dataItem){tabItem.getElementsByTagName("span")[0].innerHTML=dataItem.text;tabItem.setAttribute("key",key);if(dataItem.icon){tabItem.getElementsByTagName("img")[0].src=dataItem.icon;}
if(select===undefined||select){this.selectTab(tabItem);}
if(select===undefined||select){this.selectTab(tabItem);}}},hidePopupMenu:function(e){if(!this.popupMenu)
return false;if(e&&Position.within(this.popupMenu,Event.pointerX(e),Event.pointerY(e))){Event.stop(e);return false;}
Element.hide(this.popupMenu);var drops=$(this.tabList).getElementsByClassName("dropped");$A(drops).each(function(el){Element.removeClassName(el,"dropped");});},createTabContent:function(name,index){var tabContent=document.createElement("div");if(this.options.softPadding){if(document.all)tabContent.style.padding="3px 3px 3px 3px";else tabContent.style.padding="6px 3px 3px 3px";}
tabContent.className=this.options.tabContentClass;tabContent.setAttribute("name",name);tabContent.innerHTML="Loading ...";this.tabSet.appendChild(tabContent);if(!this.contentArray)this.contentArray=[];this.contentArray.push(tabContent);tabContent.setAttribute("tabIndex",this.contentArray.length-1);},restoreState:function(module){var data=module.dataObj.data;if(typeof data.miniTabViewState!='undefined'){var state=data.miniTabViewState.parseJSON();if(state&&typeof state.selectedKey=='string'){this.selectKey(state.selectedKey);return;}
if(state&&typeof state.selectedTab=='string'){this.selectTab(state.selectedTab);return;}}
this.selectTab(0);},saveState:function(module){var jsonViewState=null;var selectedKey=this.selectedTab.getAttribute('key');if(typeof selectedKey=='string'){jsonViewState='{"selectedKey": "'+selectedKey+'"}';}
else{jsonViewState='{"selectedTab": "'+this.selectedTab.getAttribute('name')+'"}';}
if(jsonViewState&&jsonViewState!=module.dataObj.data.miniTabViewState){module.dataObj.data.miniTabViewState=jsonViewState;module.save();}},destroy:function(){Event.stopObserving(document,'mousedown',this.hidePopupMenu);}}
var OWA={Permit:{isAdmin:isMyBlog()}}
UWA.Module=function(m_data,m_content,m_edit,w_path){this.initVars(m_data,m_content,m_edit);}
UWA.Module.prototype.initVars=function(m_data,m_content,m_edit){if(typeof(m_data)=="string"){if(m_data.length>0){this.data=eval("("+m_data+")");}else{this.data={};}}else{this.data=m_data;}
if(typeof(this.data.ref)!="object")this.data.ref={};this.contentEle=m_content;this.editEle=m_edit;this.wrapper=null;this.body=null;this.widget=null;this.ref=null;this.refValue=null;this.refForm=null;this.timer=null;this.autoRefresh=0;this.refTimer=null;this.isPrivate=false;this.isEditing=false;this.widget=null;}
UWA.Module.prototype.isSetTest=function(){return this.data&&this.data.testpath&&(this.data.testpath.length>0);}
UWA.Module.prototype.isNormal=function(){return this.data&&this.data.path&&(this.data.path.length>0);}
UWA.Module.prototype.onCloseEdit=function(){this.isEditing=false;}
UWA.Module.prototype.gettedWrapper=function(wrapper){this.wrapper=wrapper;if(!this.wrapper){if(!this.isNormal())this.data.testpath=null;this.contentEle.innerHTML='对不起，此模块不可用！';return;}
if(this.wrapper.isPrivate||this.isPrivate){if(!isMyBlog()){return this.notShow();}}
this.edit=null;this.refresh=null;this.ref=null;this.refValue=null;this.refForm=null;this.contentEle.innerHTML='<div class="uwa_widget_'+this.wrapper.classId+'"></div>';this.body=UWA.$element(this.contentEle.firstChild);this.initWidget();var autoRefresh=this.wrapper.getIntro().autoRefresh;if(typeof(autoRefresh)=="number"&&autoRefresh>0){this.autoRefresh=autoRefresh*1000;this.setTimer();}
if(this.loaded)this.loaded();}
UWA.Module.prototype.setTimer=function(){if(this.autoRefresh&&this.refresh){this.timer=window.setTimeout(this.refresh.bind(this),this.autoRefresh);}}
UWA.Module.prototype.clearTimer=function(){if(this.timer){window.clearTimeout(this.timer);this.timer=null;}}
UWA.Module.prototype.notShow=function(){this.contentEle.innerHTML='此模块为私有模块，只有博主可用';if(this.loaded)this.loaded();return false;}
UWA.Module.prototype.initWidget=function(){this.widget=new UWA.Widget();this.widget.body=UWA.$element(this.body);this.widget.getValue=this.getRef.bind(this);this.widget.setValue=this.setRef.bind(this);this.widget.setTitle=this.onSetTitle.bind(this);this.widget.setAutoRefresh=this.setAutoRefresh.bind(this);this.widget.log=this.log.bind(this);this.initRef();try{this.widget.initialize(this.wrapper.getIntro().title,this.wrapper.getBody(),this.wrapper.getScripts());}catch(e){this.log(e);}
var hadRefresh=false;var hadEdit=false;var hadShare=false;if(this.widget.onRefresh&&typeof(this.widget.onRefresh)=="function"){hadRefresh=true;this.refresh=this._refresh;}
if(this.isNormal()){for(var i=0;i<this.ref.length;i++){if(this.ref[i].type=="hidden")continue;hadEdit=true;break;}}else{hadEdit=true;}
if(!(this.wrapper.isPrivate||this.isPrivate)){this.shareMePath=this._shareMePath;hadShare=true;}
if(hadEdit)this.edit=this._edit;if(hadRefresh||hadEdit||hadShare)this.resetControls();if(this.widget.onLoad&&typeof(this.widget.onLoad)=="function"){try{this.widget.onLoad();}catch(e){this.log(e);}}
var ico=this.wrapper.getIntro().icon;if(ico&&ico.length>0){this.setIco(ico);}}
UWA.Module.prototype._shareMePath=function(){return'url='+encodeURIComponent(this.data.path);}
UWA.Module.prototype.shareMePath=function(){return false;}
UWA.Module.prototype.onSetTitle=function(title){if(typeof(title)=="string"&&title.length>0){if(title.length>8){var PatSWord=/^[\x00-\xff]+$/;var length=0;for(var i=0;i<title.length;i++){var char=title.charAt(i);if(PatSWord.test(char)){length+=1;}
else{length+=2;}
if(length>16)break;}
title=title.substr(0,i);}
this.setTitle(title,true);}}
UWA.Module.prototype.initRef=function(){this.ref=this.wrapper.getPreferences();}
UWA.Module.prototype.onSubmit=function(){if(!this.isNormal()&&!this.isSetTest()){var path=this.getRef("testpath");if(typeof(path)=="string"&&path.length>0&&path.trim().length>0){var data={testpath:path.trim()};this.endSave=function(){this.data=data;if(!this.data.ref)this.data.ref={};this.initialize();this.endSave=null;}
this.save(data);}
this.isEditing=false;}else{var refData=this.data.ref;if(this.refForm){for(var i=0;i<this.ref.length;i++){var refNow=this.ref[i];if(refNow.type=="hidden")continue;switch(refNow.type){case"text":case"password":var formValue=this.refForm[refNow.name].value;if(typeof(formValue)=="undefined"||formValue==null||formValue==""||formValue==refNow.defaultValue){refData[refNow.name]=undefined;}else{refData[refNow.name]=formValue;}
break;case"boolean":var formValue=this.refForm[refNow.name].checked.toString();if(formValue!=refNow.defaultValue){refData[refNow.name]=formValue;}else{refData[refNow.name]=undefined;}
break;case"range":case"list":var formValue=this.refForm[refNow.name].value;refData[refNow.name]=formValue;break;}}}
this.save(this.data);this.isEditing=false;if(this.refresh)this.refresh();}
return false;}
UWA.Module.prototype.setAutoRefresh=function(delay){this.clearTimer();if(typeof(delay)!="number"){delay=0;try{delay=parseInt(delay);}catch(e){this.log(e);}}
if(delay>0){this.autoRefresh=delay*1000;this.setTimer();}}
UWA.Module.prototype.getRef=function(name){if(this.ref[name]){if(this.isEditing&&this.refForm&&this.ref[name].type!="hidden"){switch(this.ref[name].type){case"boolean":return this.refForm[name].checked.toString();break;default:return this.refForm[name].value;break;}}else{var value=typeof(this.data.ref[name])=='undefined'?this.ref[name].defaultValue:this.data.ref[name];return typeof(value)=="undefined"?value:value.toString();}}else{var e=new ReferenceError('不存在属性设置项"'+name+'"');this.log(e);}}
UWA.Module.prototype.setRef=function(name,value){if(this.ref[name]){this.data.ref[name]=typeof(value)=="undefined"?undefined:value.toString();if(this.refForm&&this.ref[name].type!="hidden"){if(this.ref[name].type=="boolean"){this.refForm[name].checked=value=="true";}else{this.refForm[name].value=value;}}
if(this.refTimer==null){this.refTimer=window.setTimeout(this.setRefNow.bind(this),200);}}else{var e=new ReferenceError('不存在属性设置项"'+name+'"');this.log(e);}}
UWA.Module.prototype.setRefNow=function(){this.save(this.data);this.refTimer=null;}
UWA.Module.prototype.log=function(obj){if(this.wrapper.getIntro().debugMode){UWA.log(obj);}}
UWA.Module.prototype.initialize=function(){this.contentEle.innerHTML='正在加载...';if(this.isNormal()){UWA.WidgetLib.getWidget(this.data.path,this.gettedWrapper.bind(this),true);}else{this.isPrivate=true;if(this.isSetTest()){UWA.WidgetLib.getWidget(this.data.testpath,this.gettedWrapper.bind(this),false);}else{var scriptStr=''+'widget.onLoad = function() {'+'widget.setBody("本模块可以用来测试一个标准的Sohu Open Widget。<br />请点击此模块右上角的“设置”，填入您要测试的Widget地址。");'+'}';var obj={intro:{debugMode:true},scripts:[scriptStr],refs:[{type:"text",label:"地址",name:"testpath"}],body:""}
var wrapper=UWA.WidgetWrapper.getFromObj(obj);this.gettedWrapper(wrapper);}}}
UWA.Module.prototype.destroy=function(){if(this.refTimer)this.setRefNow();this.clearTimer();this.widget=null;this.wrapper=null;this.body=null;this.ref=null;this.contentEle.innerHTML="";}
UWA.Module.prototype._refresh=function(){if(this.widget){this.clearTimer();try{this.widget.onRefresh();}catch(e){this.log(e);}
this.setTimer();if(this.loaded)this.loaded();}}
UWA.Module.prototype.addMe=function(){if(this.isNormal()){window.open('http://blog.sohu.com/manage/module.do?m=preview&url='+encodeURIComponent(this.data.path));return true;}
return false;}
UWA.Module.prototype._edit=function(){this.isEditing=true;if(this.widget){if(!this.refForm){var str='<form onsubmit="return false"><table border="0" cellpadding="2" cellspacing="0">';var rowIndex=-1;if(!this.isNormal()){str+='<tr><td width="45px">&nbsp;</td><td>此模块为"测试模块"</td></tr>';rowIndex++;}
var onchanges=[];var showCount=0;var dataRef=this.data.ref;for(var i=0;i<this.ref.length;i++){var refNow=this.ref[i];if(refNow.type=="hidden")continue;showCount++;rowIndex++;str+='<tr><td width="45px">'+refNow.label+':</td><td>';var refName=refNow.name;var refValue=(typeof(dataRef[refName])=="undefined")?refNow.defaultValue:dataRef[refName];switch(refNow.type){case"text":str+='<input type="text" class="text" name="'+refName+'" '+(typeof(refValue)=="string"?(' value="'+refValue+'" '):'')+' />';break;case"boolean":str+='<input type="checkbox" name="'+refName+'" '+(refValue=="true"?(' checked="checked" '):'')+' />';if(refNow.onchange)onchanges.push(rowIndex);break;case"range":str+='<select class="text" name="'+refName+'">';var min=parseFloat(refNow.min);var max=parseFloat(refNow.max);var step=parseFloat(refNow.step);if(max>min){for(var j=min;j<=max;j+=step){str+='<option value="'+j+'" '+(refValue==j.toString()?' selected="selected" ':'')+'>'+j+'</option>';}}
str+='</select>';if(refNow.onchange)onchanges.push(rowIndex);break;case"list":str+='<select class="text" name="'+refName+'">';for(var j=0;j<refNow.options.length;j++){str+='<option value="'+refNow.options[j].value+'" '+((typeof(refValue)!="undefined"&&refValue==refNow.options[j].value)?' selected="selected" ':'')+'>'+refNow.options[j].label+'</option>';}
str+='</select>';if(refNow.onchange)onchanges.push(rowIndex);break;case"password":str+='<input type="password" class="text" name="'+refName+'" '+(typeof(refValue)=="string"?(' value="'+refValue+'" '):'')+' />';break;}
str+='</td></tr>';}
str+='<tr><td>&nbsp;</td><td><input type="submit" name="" value="'+App.Lang.save+'" class="button-submit" /></td></tr></table></form>';if(showCount==0){this.editEle.innerHTML='<table border="0" cellpadding="2" cellspacing="0"><tr><td width="45px">&nbsp;</td><td>此模块为"测试模块"</td></tr><tr><td width="45px">&nbsp;</td><td>此模块没有可设置项</td></tr></table>';}else{this.editEle.innerHTML=str;this.refForm=this.editEle.firstChild;var table=this.refForm.firstChild;if(onchanges.length>0&&this.refresh){for(var i=0;i<onchanges.length;i++){Event.observe(table.rows[onchanges[i]].cells[1].firstChild,"change",this.refresh.bind(this));}}
Event.observe(this.refForm,"submit",this.onSubmit.bind(this));}}}else{this.editEle.innerHTML='加载完成才能使用此功能';}}
var uwa_widget=UWA.Module;registerWidget("uwa_widget");