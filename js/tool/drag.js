/**
*
*  Copyright 2007 Sohu.com Inc. All rights reserved.
*  �Ѻ���˾
*  @author jadyyang@sohu.com
*  date: 2008-05-22
**/
var Drag=Class.create({initialize:function(options){this.setOptions(options);this.status=0;},setOptions:function(options){this.options=Object.extend({float:'',position:'',vert:true},options||{});},setDrag:function(handle,element){if(!handle._hadBindDrag){handle._hadBindDrag=true;this.handle=handle;this.element=element;if(!this.options.drops)this.options.drops=[element.parentNode];this.init();}else{this.options=null;}},init:function(){this.handle.observe("mousedown",this.onClickHandle.bindAsEventListener(this));},onClickHandle:function(e){var el=Event.element(e);while(el){if(el.tagName&&el.tagName.toLowerCase()=="a")return false;else el=el.parentNode;}
if(this.status==0){this.initDrag(e);this.onDragingHandle=this.onDraging.bindAsEventListener(this);this.onEndDragHandle=this.onEndDrag.bindAsEventListener(this);document.observe("mousemove",this.onDragingHandle);document.observe("mouseup",this.onEndDragHandle);}
Event.stop(e);return false;},initDrag:function(e){var rect=Dom.getRect(this.element);this.offsetPos={left:Event.pointerX(e)-rect.left,top:Event.pointerY(e)-rect.top}
this.floater=new Element(this.element.tagName,{"class":this.options.float,style:'position:absolute; display:none; left:'+rect.left+'px;top:'+rect.top+'px;width:'+rect.width+'px;height:'+rect.height+'px;'});this.floater.innerHTML=this.element.innerHTML;Dom.setOpacity(this.floater,80);this.floater=document.body.appendChild(this.floater);this.className=this.element.className;this.element.className=this.options.position;this.floater.show();this.element.childElements().each(function(it){it.style.visibility='hidden';});this.backer=this.element;this.parent=this.element.parentNode;},onDraging:function(e){if(this.floater){if(Event.isLeftClick(e)){if(!this.isCalculating){this.isCalculating=true;var pointer={left:Event.pointerX(e),top:Event.pointerY(e)}
var newPos={left:pointer.left-this.offsetPos.left,top:pointer.top-this.offsetPos.top}
Dom.setPos(this.floater,newPos);var backInfo=this.getBacker(pointer);if(backInfo&&backInfo.backer!=this.element){if(backInfo.isFront){if(backInfo.backer.previousSibling!=this.element){this.element=this.parent.removeChild(this.element);this.parent=backInfo.backer.parentNode;this.element=this.parent.insertBefore(this.element,backInfo.backer);this.backer=this.element;}}else{if(backInfo.backer){if(backInfo.backer.nextSibling!=this.element){if(backInfo.backer==this.parent.lastChild){this.element=this.parent.removeChild(this.element);this.parent=backInfo.backer.parentNode;this.element=this.parent.appendChild(this.element);this.backer=this.element;}else{this.element=this.parent.removeChild(this.element);this.parent=backInfo.backer.parentNode;this.element=this.parent.insertBefore(this.element,backInfo.backer.nextSibling);this.backer=this.element;}}}else{this.element=this.parent.removeChild(this.element);this.parent=backInfo.parent;this.element=this.parent.appendChild(this.element);this.backer=this.element;}}}
this.isCalculating=false;}}else{this.clear();}}
Event.stop(e);return false;},onEndDrag:function(e){document.stopObserving("mousemove",this.onDragingHandle);document.stopObserving("mouseup",this.onEndDragHandle);this.onDragingHandle=null;this.onEndDragHandle=null;this.goBack();if(this.options.onchange){this.options.onchange();}
Event.stop(e);return false;},goBack:function(){this.timer=window.setTimeout(this.moveToNewPos.bind(this),10);},moveToNewPos:function(){var pos=Dom.getPos(this.floater);var pos2=Dom.getPos(this.element);if(pos.left==pos2.left&&pos.top==pos2.top){this.clear();}else{var xDis=pos.left-pos2.left;var yDis=pos.top-pos2.top;var miniOffset=10;var slowOffset=9;var quickOffset=3;var xAv=Math.abs(xDis)>miniOffset?slowOffset:quickOffset;var yAv=Math.abs(yDis)>miniOffset?slowOffset:quickOffset;var xOffset=(xDis>0)?Math.ceil((xDis)/xAv):Math.floor((xDis)/xAv);var yOffset=(yDis>0)?Math.ceil((yDis)/yAv):Math.floor((yDis)/yAv);var newPos={left:Math.abs(xOffset)<1?pos2.left:(pos.left-xOffset),top:Math.abs(yOffset)<1?pos2.top:(pos.top-yOffset)}
Dom.setPos(this.floater,newPos);this.goBack();}},isInRect:function(pos,rect){if(pos.left>=rect.left&&pos.left<=rect.right&&pos.top>=rect.top&&pos.top<=rect.bottom)return true;return false;},getBacker:function(pos){var rect=Dom.getRect(this.parent);var offsetPos={left:pos.left-rect.left,top:pos.top-rect.top}
var rectNow=null;if(this.isInRect(pos,rect)){if(this.backer){rectNow=Dom.getOffsetRect(this.backer);if(this.isInRect(offsetPos,rectNow)){return{backer:this.backer,isFront:this.options.vert?(offsetPos.top<rectNow.top+Math.floor(rectNow.height/2)):(offsetPos.left<rectNow.left+Math.floor(rectNow.width/2))};}}
if(this.backer!=this.element){rectNow=Dom.getOffsetRect(this.element);if(this.isInRect(offsetPos,rectNow)){return{backer:this.backer,isFront:this.options.vert?(offsetPos.top<rectNow.top+Math.floor(rectNow.height/2)):(offsetPos.left<rectNow.left+Math.floor(rectNow.width/2))};}}
var childs=this.parent.childElements();for(var i=0;i<childs.length;i++){var child=childs[i];if(child!=this.backer&&child!=this.element){rectNow=Dom.getOffsetRect(child);if(this.isInRect(offsetPos,rectNow)){this.backer=child;return{backer:this.backer,isFront:this.options.vert?(offsetPos.top<rectNow.top+Math.floor(rectNow.height/2)):(offsetPos.left<rectNow.left+Math.floor(rectNow.width/2))};}}}}else{var vert=this.options.vert;var drops=this.options.drops;for(var j=0;j<drops.length;j++){var parentNow=$(drops[j]);rect=Dom.getRect(parentNow);if(parentNow!=this.parent){if(this.isInRect(pos,rect)){offsetPos={left:pos.left-rect.left,top:pos.top-rect.top}
var childs=parentNow.childElements();for(var i=0;i<childs.length;i++){var child=childs[i];rectNow=Dom.getOffsetRect(child);if(this.isInRect(offsetPos,rectNow)){this.backer=child;return{backer:this.backer,isFront:this.options.vert?(offsetPos.top<rectNow.top+Math.floor(rectNow.height/2)):(offsetPos.left<rectNow.left+Math.floor(rectNow.width/2))};}}}}
if(vert&&pos.left>=rect.left&&pos.left<=rect.right){return{backer:null,parent:parentNow,isFront:false};}}}
return null;},clear:function(){if(this.timer){window.clearTimeout(this.timer);this.timer=null;}
if(this.onDragingHandle){document.stopObserving("mousemove",this.onDragingHandle);this.onDragingHandle=null;}
if(this.onEndDragHandle){document.stopObserving("mouseup",this.onEndDragHandle);this.onEndDragHandle=null;}
if(this.floater){Element.remove(this.floater);this.floater=null;}
this.element.className=this.className;this.element.childElements().each(function(it){it.style.visibility='visible';});this.offsetPos=null;this.isCalculating=false;this.backer=null;this.status=0;}});Drag.init=function(parent,options){parent=$(parent);var eles=parent.childElements();var handles=options.handle?parent.select(options.handle):eles;for(var i=0;i<handles.length;i++){var d=new Drag(options);d.setDrag(handles[i],eles[i]);}}