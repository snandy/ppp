/**
 * @fileoverview UWA Object
 * 
 * @author Jady Yang (jadyyang@sohu.com)
 * @version 1.0
 **/
 
/*
	<div class="tabSet">
		<ul class="tabList">
			<li><a href="#" style="white-space:nowrap"></a></li>
			<li class="active"><a href="#" style="white-space:nowrap"></a></li>
		</ul>
		<div class="tabContent">
		</div>
		<div class="tabContent">
		</div>
	</div>
*/

/**
 * Tab控制器
 * @param {Object} options Tab的配置参数，非必填项，其中包括如下属性：
 *		autohideDropdowns:	true
 *		tabSetClass:		"tabSet"		整个Tab容器对象的样式名称
 *		tabListClass:		"tabList"		Tab Head列表的对象（ul）的样式名称
 *		tabContentClass:	"tabContent"
 *		softPadding:		false
 *		orientation:		"top"			Tab显示的位置，可能的值包括：top、bottom、left、right
 *		dataKey:			"text"
 *		extendedAction:		false
 **/
UWA.Controls.TabView = function(options) {
	this.initialize(options);
}

UWA.Controls.TabView.prototype={
setOptions:function(options){
    this.options={
        autohideDropdowns:true,tabSetClass:"tabSet",tabListClass:"tabList",tabContentClass:"tabContent",softPadding:false,orientation:'top',dataKey:'text',extendedAction:false
    }
    Object.extend(this.options,options||{
    }
    );
}
,initialize:function(options){
    this.setOptions(options);
    this.dataItems={
    };
    this.selectedTab=null;
    this.selectedIndex=this.options.selectedIndex||0;
}
,_createTabSet:function(){
    this.tabSet=document.createElement("div");
    this.tabSet.className=this.options.tabSetClass;
    this.tabList=document.createElement("ul");
    this.tabList.className=this.options.tabListClass+" autoclear";
    this.tabList.style.padding='0';
    if(/^(top)|(bottom)|(left)|(right)$/.test(this.options.orientation)){
        Element.addClassName(this.tabList,this.options.orientation);
    }
    this.tabSet.appendChild(this.tabList);
}
,appendTo:function(element){
    if(!this.tabSet)this._createTabSet();
    if(!this.selectedTab&&this.tabList.hasChildNodes())this.selectTab(0,false);
    $(element).appendChild(this.tabSet);
    /*
    if(window.widget&&typeof window.widget.callback=='function'){
        window.widget.callback('onUpdateBody');
    }
    */
}
,addTab:function(name,dataItem,options){
    if(!this.tabSet)this._createTabSet();
    if(typeof options=='undefined')options={
    }
    var li=document.createElement("li");
    li.className="tab";
    li.setAttribute("name",name);
    li.onclick=this.eventTabClicked.bindAsEventListener(this);
    if(options.staticText){
        li.setAttribute('static','static');
    }
    var a=document.createElement("a");
    a.href="#";
    a.target="_blank";
    a.style.whiteSpace="nowrap";
    a.onclick=function(){
        return false;
    }
    if(dataItem.length){
        if(dataItem[0].image){
            var imgElement=document.createElement("img");
            imgElement.src=dataItem[0].image;
            a.appendChild(imgElement);
        }
        else{
            if(dataItem[0].picto){
                var picto=document.createElement("img");
                picto.src=dataItem[0].picto;
                picto.style.marginRight="4px";
                picto.style.marginBottom="-2px";
                a.appendChild(picto);
            }
            else if(dataItem[0].icon){
                var icon=document.createElement("img");
                icon.src=dataItem[0].icon;
                icon.style.marginRight="4px";
                icon.style.marginBottom="-2px";
                a.appendChild(icon);
            }
            var textElement=document.createElement("span");
            textElement.appendChild(document.createTextNode(options.staticText||dataItem[0].text));
            a.appendChild(textElement);
        }
        li.setAttribute("key",dataItem[0][this.options.dataKey]);
        var dropdownElement=document.createElement("span");
        dropdownElement.className="dropdown";
        do{
            var uniqueId="dropdownTab-"+(Math.ceil(Math.random()*1000));
        }
        while($(uniqueId))
        dropdownElement.setAttribute("id",uniqueId);
        var placeHolder=document.createElement("img");
        placeHolder.src="http://ow.blog.sohu.com/styles/images/s.gif";
        placeHolder.width=14;
        placeHolder.height=14;
        placeHolder.style.verticalAlign="middle";
        placeHolder.className="placeHolder";
        dropdownElement.appendChild(placeHolder);
        a.appendChild(dropdownElement);
        dropdownElement.onmousedown=this.eventDropDown.bindAsEventListener(this);
    }
    else{
        if(dataItem.image){
            var imgElement=document.createElement("img");
            imgElement.src=dataItem.image;
            a.appendChild(imgElement);
        }
        else{
            if(dataItem.picto){
                var picto=document.createElement("img");
                picto.src=dataItem.picto;
                picto.style.marginRight="4px";
                picto.style.marginBottom="-2px";
                a.appendChild(picto);
            }
            else if(dataItem.icon){
                var icon=document.createElement("img");
                icon.src=dataItem.icon;
                icon.style.marginRight="4px";
                icon.style.marginBottom="-2px";
                a.appendChild(icon);
            }
            a.appendChild(document.createTextNode(dataItem.text));
        }
        li.setAttribute("key",dataItem[this.options.dataKey]);
    }
    li.appendChild(a);
    if(this.selectedTab==null){
    }
    this.tabList.appendChild(li);
    this.createTabContent(name);
    this.dataItems[name]=dataItem;
    return li;
}
,removeTab:function(name){
    var tabItem=this.getTab(name);
    Element.remove(tabItem);
}
,addExternalLink:function(name,href){
    var tabItem=this.getTab(name);
    tabItem.firstChild.setAttribute("href",href);
}
,eventTabClicked:function(e){
    if(Event.element(e).className=="placeHolder"){
        return false;
    }
    var sender=Event.findElement(e,"LI");
    if(!Element.hasClassName(sender,'disabled')){
        this.selectTab(sender);
    }
    return false;
}
,eventExtendedActionClicked:function(e){
    this.hidePopupMenu();
    this._notify('extendedActionClicked');
    return false;
}
,enableTab:function(name,enable){
    var tabItem=this.getTab(name);
    if(enable)Element.removeClassName(tabItem,'disabled');
    else Element.addClassName(tabItem,'disabled');
}
,selectTab:function(tabItem,notify){
    if(typeof tabItem=='number'||typeof tabItem=='string'){
        tabItem=this.getTab(tabItem);
    }
    var name=tabItem.getAttribute('name');
    if(this.selectedTab&&(this.selectedTab.getAttribute('name')==name)){
        return;
    }
    var items=this.tabList.getElementsByTagName('li');
    for(var i=0,li;li=items[i];i++){
        Element.removeClassName(li,'selected');
        if(this.popupMenu)this.hidePopupMenu();
        if(this.options.autohideDropdowns){
            var dropdowns=$(li).getElementsByClassName('dropdown');
$A(dropdowns).each(function(el){
    Element.hide(el)
}
);
}
}
Element.addClassName(tabItem,'selected');
if(this.options.autohideDropdowns){
var dropdowns=$(tabItem).getElementsByClassName('dropdown');
$A(dropdowns).each(function(el){
    Element.show(el)
}
);
}
for(var i=0,content;content=this.contentArray[i];i++){
/*
if(Browser.isSafari&&content.getElementsByTagName("iframe").length){
    if(name==content.getAttribute('name')){
        content.style.visibility="visible";
        content.style.position="static";
    }
    else{
        var frame=content.getElementsByTagName("iframe")[0];
        content.style.width=frame.contentWindow.innerWidth+"px";
        content.style.visibility="hidden";
        content.style.position="absolute";
        content.style.left="0px";
        content.style.top="0px";
    }
}
else{
*/
    if(name==content.getAttribute('name'))Element.show(content);
    else Element.hide(content);
/*}*/
}
this.selectedTab=tabItem;
this.selectedIndex=tabItem.getAttribute('index');
if(notify===false)return;
this._notify('activeTabChange');
}
,hide:function(){
Element.hide(this.tabSet);
}
,show:function(){
Element.show(this.tabSet);
}
,hideTabList:function(){
Element.hide(this.tabList);
}
,showTabList:function(){
Element.show(this.tabList);
}
,reload:function(){
this._notify('activeTabChange');
}
,eventDropDown:function(e){
var sender=Event.findElement(e,"LI");
this.popupMenu=$('minitabsOptions');
if(!this.popupMenu){
this.popupMenu=document.createElement('ul');
this.popupMenu.setAttribute('id','minitabsOptions');
this.popupMenu.className='popupMenu';
this.popupMenu.style.position='absolute';
document.getElementsByTagName('body').item(0).appendChild(this.popupMenu);
Element.hide(this.popupMenu);
Event.observe(document,'mousedown',this.hidePopupMenu.bindAsEventListener(this));
}
var dropdownButton=$(sender).getElementsByClassName('dropdown')[0];
if(Element.visible(this.popupMenu)&&this.popupMenu.getAttribute("dropdownId")==dropdownButton.id){
this.hidePopupMenu();
return;
}
this._showPopupMenu(sender);
this.popupMenu.setAttribute("dropdownId",dropdownButton.id);
Event.stop(e);
return false;
}
,getTabContent:function(name){
if(typeof name=='number'){
return this.contentArray.detect(function(el){
    return el.getAttribute("index")==name;
}
);
}
return this.contentArray.detect(function(el){
    return el.getAttribute("name")==name;
}
);
}
,setContent:function(name,content){
var node=this.getTabContent(name);
if(node){
    if(typeof content=='string'){
        node.innerHTML=content;
    }
    else{
        node.innerHTML='';
        node.appendChild(content);
    }
}
/*
if(window.widget&&typeof window.widget.callback=='function'){
    window.widget.callback('onUpdateBody');
}
*/
}
,getTab:function(name){
if(typeof name=='string'||typeof name=='number'){
    var items=this.tabList.getElementsByTagName('li');
    for(var i=0,item;item=items[i];i++){
        if(typeof name=='number'&&name==i)return item;
        if(name==item.getAttribute('name'))return item;
    }
}
return name;
}
,observe:function(name,observer){
if(!this.observers)this.observers=[];
this.observers.push([name,observer]);
}
,_notify:function(event){
if(!this.observers)return;
var sender=this.selectedTab;
var eventArgs=this.dataItems[sender.getAttribute('name')];
if(eventArgs.length){
    var dataKey=this.options.dataKey;
eventArgs=eventArgs.detect(function(el){
    return el[dataKey]==sender.getAttribute('key')
}
);
}
this.observers.each(function(observer){
    if(observer[0]==event&&typeof(observer[1])=='function')
    observer[1](sender.getAttribute('name'),eventArgs);
}
);
}
,_showPopupMenu:function(tabItem){
var offset=Position.cumulativeOffset(tabItem);
this.popupMenu.innerHTML='';
try{
    var tabName=tabItem.getAttribute('name');
    var dataItems=this.dataItems[tabName];
    var tabKey=tabItem.getAttribute('key');
    for(var i=0,item;item=dataItems[i];i++){
        if(item[this.options.dataKey]==tabKey&&tabItem.getAttribute('static')!='static')
        continue;
        var li=document.createElement("li");
        var a=document.createElement("a");
        if(item.picto){
            var picto=document.createElement("img");
            picto.src=item.picto;
            picto.style.marginRight="4px";
            picto.style.marginBottom="-2px";
            a.appendChild(picto);
        }
        else if(item.icon){
            var icon=document.createElement("img");
            icon.src=item.icon;
            icon.style.marginRight="4px";
            icon.style.marginBottom="-2px";
            a.appendChild(icon);
        }
        a.href=(item.htmlUrl||"javascript:void(0)");
        a.setAttribute('context',tabName);
        a.appendChild(document.createTextNode(item.text));
        a.setAttribute("key",item[this.options.dataKey]);
        if(!this.options.extendedAction&&(dataItems.length-1)==i){
            Element.addClassName(a,'last');
        }
        a.onclick=this.eventPopupMenuClicked.bindAsEventListener(this);
        li.appendChild(a);
        this.popupMenu.appendChild(li);
    }
    if(this.options.extendedAction){
        var li=document.createElement("li");
        var a=document.createElement("a");
        a.href="javascript:void(0)";
        Element.addClassName(a,'action');
        a.setAttribute('context',tabName);
        a.appendChild(document.createTextNode(this.options.extendedAction));
        a.onclick=this.eventExtendedActionClicked.bindAsEventListener(this);
        li.appendChild(a);
        this.popupMenu.appendChild(li);
    }
}
catch(e){
}
var tabDimensions=Element.getDimensions(tabItem);
var delta = 0;
/*
var delta=(typeof App!='undefined'&&App.userCustom&&(App.userCustom.themeTitle=='Coriander'))?0:1;
if(Browser.isSafari||Browser.isOpera)delta=0;
*/
this.popupMenu.style.left=(offset[0]+delta)+'px';
this.popupMenu.style.top=(offset[1]+delta+tabDimensions.height)+'px';
this.popupMenu.style.width="auto";
var menuWidth=Element.getDimensions(this.popupMenu).width;
if(menuWidth<tabDimensions.width){
    var delta=12;
    if(document.all)delta=11;
    this.popupMenu.style.width=tabDimensions.width-delta+"px";
}
Element.show(this.popupMenu);
var drops=$(this.tabList).getElementsByClassName("dropped");
$A(drops).each(function(el){
    Element.removeClassName(el,"dropped");
}
);
Element.addClassName(tabItem,'dropped');
}
,eventPopupMenuClicked:function(e){
var sender=Event.findElement(e,"A");
var tabName=sender.getAttribute('context');
var tabItem=this.getTab(tabName);
if(tabItem.getAttribute('static')!='static'){
    var dataKey=this.options.dataKey;
var dataItem=this.dataItems[tabName].detect(function(el){
    return el[dataKey]==sender.getAttribute('key')
}
);
tabItem.getElementsByTagName("span")[0].innerHTML=dataItem.text;
if(dataItem.picto){
    tabItem.getElementsByTagName("img")[0].src=dataItem.picto;
}
else if(dataItem.icon){
    tabItem.getElementsByTagName("img")[0].src=dataItem.icon;
}
}
tabItem.setAttribute("key",sender.getAttribute('key'));
this._notify('activeTabChange');
this.selectTab(tabItem);
this.hidePopupMenu();
Event.stop(e);
return false;
}
,selectKey:function(name,key,select){
var tabItem=this.getTab(name);
var dataItem=null;
var dataKey=this.options.dataKey;
if(typeof(this.dataItems[name].detect)=='function'){
dataItem=this.dataItems[name].detect(function(el){
    return el[dataKey]==key;
}
);
}
if(dataItem){
tabItem.getElementsByTagName("span")[0].innerHTML=dataItem.text;
tabItem.setAttribute("key",key);
if(dataItem.icon){
    tabItem.getElementsByTagName("img")[0].src=dataItem.icon;
}
if(select===undefined||select){
    this.selectTab(tabItem);
}
if(select===undefined||select){
    this.selectTab(tabItem);
}
}
}
,hidePopupMenu:function(e){
if(!this.popupMenu)
return false;
if(e&&Position.within(this.popupMenu,Event.pointerX(e),Event.pointerY(e))){
Event.stop(e);
return false;
}
Element.hide(this.popupMenu);
var drops=$(this.tabList).getElementsByClassName("dropped");
$A(drops).each(function(el){
    Element.removeClassName(el,"dropped");
}
);
}
,createTabContent:function(name,index){
var tabContent=document.createElement("div");
if(this.options.softPadding){
    if(document.all)tabContent.style.padding="3px 3px 3px 3px";
    else tabContent.style.padding="6px 3px 3px 3px";
}
tabContent.className=this.options.tabContentClass;
tabContent.setAttribute("name",name);
tabContent.innerHTML="Loading ...";
this.tabSet.appendChild(tabContent);
if(!this.contentArray)this.contentArray=[];
this.contentArray.push(tabContent);
tabContent.setAttribute("tabIndex",this.contentArray.length-1);
}
,restoreState:function(module){
var data=module.dataObj.data;
if(typeof data.miniTabViewState!='undefined'){
    var state=data.miniTabViewState.parseJSON();
    if(state&&typeof state.selectedKey=='string'){
        this.selectKey(state.selectedKey);
        return;
    }
    if(state&&typeof state.selectedTab=='string'){
        this.selectTab(state.selectedTab);
        return;
    }
}
this.selectTab(0);
}
,saveState:function(module){
var jsonViewState=null;
var selectedKey=this.selectedTab.getAttribute('key');
if(typeof selectedKey=='string'){
    jsonViewState='{"selectedKey": "'+selectedKey+'"}';
}
else{
    jsonViewState='{"selectedTab": "'+this.selectedTab.getAttribute('name')+'"}';
}
if(jsonViewState&&jsonViewState!=module.dataObj.data.miniTabViewState){
    module.dataObj.data.miniTabViewState=jsonViewState;
    module.save();
}
}
,destroy:function(){
Event.stopObserving(document,'mousedown',this.hidePopupMenu);
}
}