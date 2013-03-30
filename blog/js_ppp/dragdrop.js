/******* Drag and Drop Js **********/
//	Based on Scriptaculous (http://script.aculo.us)
//	Copyright (c) 2005 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
//	Modifid by Todd Lee (www.todd-lee.com)
//	Last Update: 2006-11-10
//	Copyright: Sohu.com (www.sohu.com)
/************************************/
var Droppables={drops:[],remove:function(element){var n=0;var results=[];this.drops.each(function(d){if(d.element==$(element)&&n==0){n++;throw $continue;}
results.push(d);});this.drops=results;},add:function(element){element=$(element);var options=Object.extend({greedy:true,hoverclass:null},arguments[1]||{});if(options.containment){options._containers=[];var containment=options.containment;if((typeof containment=='object')&&(containment.constructor==Array)){containment.each(function(c){options._containers.push($(c));});}else{options._containers.push($(containment));}}
if(options.accept){options.accept=[options.accept].flatten();}
if(options.exclude){options._exclude=[];var exclude=options.exclude;if((typeof exclude=='object')&&(exclude.constructor==Array)){exclude.each(function(o){options._exclude.push($(o));});}else{options._exclude.push($(exclude));}}
options.element=element;this.drops.push(options);},isContained:function(element,drop){var parentNode=element.parentNode;return drop._containers.detect(function(c){return parentNode==c;});},isExclude:function(point,drop){return drop._exclude.any(function(o){return Position.within(o,point[0],point[1]);});},isAffected:function(point,element,drop){return(Position.within(drop.element,point[0],point[1])&&(drop.element!=element)&&((!drop.exclude)||!this.isExclude(point,drop))&&((!drop.accept)||(Element.classNames(element).detect(function(v){return drop.accept.include(v);}))||(drop.accept==element.id)));},deactivate:function(drop){if(drop.hoverclass)
Element.removeClassName(drop.element,drop.hoverclass);this.last_active=null;},activate:function(drop){if(drop.hoverclass)
Element.addClassName(drop.element,drop.hoverclass);this.last_active=drop;},show:function(point,drag){if(!this.drops.length)return;var element=drag.element;if(this.last_active)this.deactivate(this.last_active);this.drops.each(function(drop){if(Droppables.isAffected(point,element,drop)){if(drop.onHover){drop.onHover(drag,drop.element,Position.overlap(drop.overlap,drop.element));Droppables.activate(drop);}
if(drop.greedy){Droppables.activate(drop);throw $break;}}});},oupPutSomeThing:function(){if(!$('_tmpP')){var _tmpP=document.createElement('div');_tmpP.id='_tmpP';Element.hide(_tmpP);document.body.appendChild(_tmpP);}
else{var _tmpP=$('_tmpP');}
_tmpP.innerHTML+='a<br />';},fire:function(event,drag){if(!this.last_active){return;}
Position.prepare();var element=drag.element;if(this.isAffected([Event.pointerX(event),Event.pointerY(event)],element,this.last_active)){if(this.last_active.onDrop)
this.last_active.onDrop(drag,this.last_active.element,event);}},reset:function(){if(this.last_active)
this.deactivate(this.last_active);}};var Draggables={drags:[],observers:[],register:function(draggable){if(this.drags.length==0){this.eventMouseUp=this.endDrag.bindAsEventListener(this);this.eventMouseMove=this.updateDrag.bindAsEventListener(this);this.eventKeypress=this.keyPress.bindAsEventListener(this);Event.observe(document,"mouseup",this.eventMouseUp);Event.observe(document,"mousemove",this.eventMouseMove);Event.observe(document,"keypress",this.eventKeypress);}
this.drags.push(draggable);},unregister:function(draggable){this.drags=this.drags.reject(function(d){return d==draggable});if(this.drags.length==0){Event.stopObserving(document,"mouseup",this.eventMouseUp);Event.stopObserving(document,"mousemove",this.eventMouseMove);Event.stopObserving(document,"keypress",this.eventKeypress);}},activate:function(draggable){window.focus();this.activeDraggable=draggable;},deactivate:function(draggbale){this.activeDraggable=null;},updateDrag:function(event){if(!this.activeDraggable)return;var pointer=[Event.pointerX(event),Event.pointerY(event)];if(this._lastPointer&&(this._lastPointer.inspect()==pointer.inspect()))return;this._lastPointer=pointer;this.activeDraggable.updateDrag(event,pointer);},endDrag:function(event){if(!this.activeDraggable)return;this._lastPointer=null;this.activeDraggable.endDrag(event);this.activeDraggable=null;},keyPress:function(event){if(this.activeDraggable)
this.activeDraggable.keyPress(event);},addObserver:function(observer){this.observers.push(observer);this._cacheObserverCallbacks();},removeObserver:function(element){this.observers=this.observers.reject(function(o){return o.element==element});this._cacheObserverCallbacks();},notify:function(eventName,draggable,event){if(this[eventName+'Count']>0)
this.observers.each(function(o){if(o[eventName])o[eventName](eventName,draggable,event);});},_cacheObserverCallbacks:function(){['onStart','onEnd','onDrag'].each(function(eventName){Draggables[eventName+'Count']=Draggables.observers.select(function(o){return o[eventName];}).length;});}};var Draggable=Class.create();Draggable.prototype={initialize:function(element){var options=Object.extend({handle:false,starteffect:function(element){new Effect.Opacity(element,{duration:0.2,from:1.0,to:0.7});},reverteffect:function(element,top_offset,left_offset){var dur=Math.sqrt(Math.abs(top_offset^2)+Math.abs(left_offset^2))*0.02;element._revert=new Effect.Move(element,{x:-left_offset,y:-top_offset,duration:dur});},endeffect:function(element){new Effect.Opacity(element,{duration:0.2,from:0.7,to:1.0});},zindex:1000,revert:false,snap:false},arguments[1]||{});this.element=$(element);if(options.handle&&(typeof options.handle=='string'))
this.handle=Element.childrenWithClassName(this.element,options.handle)[0];if(!this.handle)this.handle=$(options.handle);if(!this.handle)this.handle=this.element;this.options=options;this.dragging=false;this.eventMouseDown=this.initDrag.bindAsEventListener(this);Event.observe(this.handle,"mousedown",this.eventMouseDown);Draggables.register(this);this.handle.style.cursor=(options.constraint)?(options.constraint=='horizontal'?'e':'')+(options.constraint=='vertical'?'s':'')+'-resize':'move';},destroy:function(){Event.stopObserving(this.handle,"mousedown",this.eventMouseDown);Draggables.unregister(this);},currentDelta:function(){return([parseInt(Element.getStyle(this.element,'left')||'0'),parseInt(Element.getStyle(this.element,'top')||'0')]);},initDrag:function(event){if(Event.isLeftClick(event)){var src=Event.element(event);if(src.tagName&&(src.tagName=='INPUT'||src.tagName=='SELECT'||src.tagName=='BUTTON'||src.tagName=='TEXTAREA'))return;if(this.element._revert){this.element._revert.cancel();this.element._revert=null;}
this.delta=this.currentDelta();var pointer=[Event.pointerX(event),Event.pointerY(event)];var pos=Position.cumulativeOffset(this.element);this.offset=[0,1].map(function(i){return(pointer[i]-pos[i])});Draggables.activate(this);Event.stop(event);}},startDrag:function(event){this.dragging=true;this.lastPointer=[Event.pointerX(event),Event.pointerY(event)];if(this.options.zindex){this.originalZ=parseInt(Element.getStyle(this.element,'z-index')||0);this.element.style.zIndex=this.options.zindex;}
if(this.options.ghosting){this._clone=this.element.cloneNode(true);Position.absolutize(this.element);this.element.parentNode.insertBefore(this._clone,this.element);}
Draggables.notify('onStart',this,event);if(this.options.starteffect)this.options.starteffect(this.element);},updateDrag:function(event,pointer){if(!this.dragging)this.startDrag(event);Position.prepare();var _pointer=[(this.options.constraint=='vertical')?this.lastPointer[0]:pointer[0],(this.options.constraint=='horizontal')?this.lastPointer[1]:pointer[1]];Droppables.show(_pointer,this);Draggables.notify('onDrag',this,event);this.draw(pointer);if(this.options.change)this.options.change(this);if(navigator.appVersion.indexOf('AppleWebKit')>0)window.scrollBy(0,0);Event.stop(event);},finishDrag:function(event,success){this.dragging=false;if(this.options.ghosting){Element.remove(this._clone);Position.relativize(this.element);this._clone=null;}
if(success)Droppables.fire(event,this);Draggables.notify('onEnd',this,event);if(!this.hasDrop){Position.relativize(this.element);}
if(this.hasDrop&&!success||!this.hasDrop){var revert=this.options.revert;if(revert&&typeof revert=='function')revert=revert(this.element);var d=this.currentDelta();if(revert&&this.options.reverteffect){this.options.reverteffect(this.element,d[1]-this.delta[1],d[0]-this.delta[0]);}else{this.delta=d;}}
if(this.options.zindex)
this.element.style.zIndex=this.originalZ;if(this.options.endeffect)
this.options.endeffect(this.element);Draggables.deactivate(this);Droppables.reset();},keyPress:function(event){if(!event.keyCode==Event.KEY_ESC)return;this.finishDrag(event,false);Event.stop(event);},endDrag:function(event){if(!this.dragging)return;this.finishDrag(event,true);Event.stop(event);},draw:function(point){var pos=Position.cumulativeOffset(this.element);var d=this.currentDelta();pos[0]-=d[0];pos[1]-=d[1];var p=[0,1].map(function(i){return(point[i]-pos[i]-this.offset[i])}.bind(this));if(this.options.snap){if(typeof this.options.snap=='function'){p=this.options.snap(p[0],p[1]);}else{if(this.options.snap instanceof Array){p=p.map(function(v,i){return Math.round(v/this.options.snap[i])*this.options.snap[i]}.bind(this));}else{p=p.map(function(v){return Math.round(v/this.options.snap)*this.options.snap}.bind(this));}}}
var style=this.element.style;if((!this.options.constraint)||(this.options.constraint=='horizontal'))
style.left=p[0]+"px";if((!this.options.constraint)||(this.options.constraint=='vertical'))
style.top=p[1]+"px";if(style.visibility=="hidden")style.visibility="";}};var SortableObserver=Class.create();SortableObserver.prototype={initialize:function(element,observer){this.element=$(element);this.observer=observer;this.lastValue=Sortable.serialize(this.element);},onStart:function(){this.lastValue=Sortable.serialize(this.element);},onEnd:function(eventName,drag,event){Sortable.unmark();Sortable.untarget(drag);if(this.lastValue!=Sortable.serialize(this.element))
this.observer(this.element);}};var Sortable={sortables:new Array(),options:function(element){element=$(element);return this.sortables.detect(function(s){return s.element==element});},destroy:function(element){element=$(element);this.sortables.findAll(function(s){return s.element==element}).each(function(s){Draggables.removeObserver(s.element);s.draggables.invoke('destroy');});this.sortables=this.sortables.reject(function(s){return s.element==element});},create:function(element){element=$(element);var options=Object.extend({element:element,tag:'li',dropOnEmpty:false,tree:false,overlap:'vertical',constraint:'vertical',containment:element,handle:false,handleTag:false,only:false,hoverclass:null,ghosting:false,targeting:false,capture:false,format:null,onChange:Prototype.emptyFunction,onUpdate:Prototype.emptyFunction},arguments[1]||{});this.destroy(element);var options_for_draggable={revert:true,ghosting:options.ghosting,constraint:options.constraint,handle:options.handle,snap:options.snap};if(options.starteffect)
options_for_draggable.starteffect=options.starteffect;if(options.reverteffect)
options_for_draggable.reverteffect=options.reverteffect;else
if(options.ghosting)options_for_draggable.reverteffect=function(element){element.style.top=0;element.style.left=0;};if(options.endeffect)
options_for_draggable.endeffect=options.endeffect;if(options.zindex)
options_for_draggable.zindex=options.zindex;var options_for_droppable={overlap:options.overlap,containment:options.containment,hoverclass:options.hoverclass,onHover:Sortable.onHover,onDrop:Sortable.onDrop,greedy:!options.dropOnEmpty,accept:options.only};if(Browser.ua.indexOf('ie')<0){Element.cleanWhitespace(element);}
options.draggables=[];options.droppables=[];if(options.dropOnEmpty){Droppables.add(element,{containment:options.containment,onHover:Sortable.onEmptyHover,onDrop:Sortable.onDrop,greedy:false,exclude:options.exclude,capture:options.capture,accept:options.only});options.droppables.push(element);}
(this.findElements(element,options)||[]).each(function(e){var handle=options.handle?document.getElementsByClassName(options.handle,e,options.handleTag)[0]:e;options.draggables.push(new Draggable(e,Object.extend(options_for_draggable,{handle:handle})));Droppables.add(e,options_for_droppable);options.droppables.push(e);});this.sortables.push(options);Draggables.addObserver(new SortableObserver(element,options.onUpdate));},findElements:function(element,options){if(!element.hasChildNodes())return null;var elements=[];$A(element.childNodes).each(function(e){if(e.tagName&&e.tagName.toUpperCase()==options.tag.toUpperCase()&&(!options.only||(Element.hasClassName(e,options.only))))
elements.push(e);if(options.tree){var grandchildren=this.findElements(e,options);if(grandchildren)elements.push(grandchildren);}});return(elements.length>0?elements.flatten():null);},onHover:function(drag,dropon,overlap){var element=Sortable.target(drag,dropon.parentNode)||drag.element;if(overlap>0.5&&!Sortable.options(element.parentNode).capture){if(dropon.previousSibling!=element){var oldParentNode=element.parentNode;dropon.parentNode.insertBefore(element,dropon);if(dropon.parentNode!=oldParentNode){Sortable.options(oldParentNode).onChange(element);}
Sortable.options(dropon.parentNode).onChange(element);}
Sortable.mark(element,dropon,'before');}else{var nextElement=dropon.nextSibling||null;if(nextElement!=element){if(!Sortable._targeter||nextElement!=Sortable._targeter){var oldParentNode=element.parentNode;dropon.parentNode.insertBefore(element,nextElement);if(dropon.parentNode!=oldParentNode){Sortable.options(oldParentNode).onChange(element);}
Sortable.options(dropon.parentNode).onChange(element);}}
Sortable.mark(element,dropon,'after');}},onEmptyHover:function(drag,dropon){var element=Sortable.target(drag,dropon)||drag.element;if(element.parentNode!=dropon){var oldParentNode=element.parentNode;if(dropon.parentNode.childNodes[dropon.parentNode.childNodes.length-1]!=element)
dropon.appendChild(element);if(Sortable.options(dropon).ghosting)
Sortable.mark(element,dropon,'after');if(Sortable.options(oldParentNode))
Sortable.options(oldParentNode).onChange(element);Sortable.options(dropon).onChange(element);}},onDrop:function(drag,dropon,event){drag.hasDrop=null;var _dropon=Sortable.options(dropon)?dropon:(Sortable.options(dropon.parentNode)?dropon.parentNode:null);if(_dropon){if(Sortable._targeter){Sortable._targeter.parentNode.insertBefore(drag.element,Sortable._targeter);if(typeof drag.element._originalWidth=='undefined'||typeof drag.element._originalHeight=='undefined'){drag.element._originalWidth='';drag.element._originalHeight='';}}
if(Sortable.options(_dropon).capture){drag.hasDrop=_dropon;if(App.Modules){App.Modules.registerResizable(App.Modules.getObjByElement(drag.element));App.Modules.getObjByElement(drag.element).setFloat();}}
else{drag.delta=[0,0];Position.relativize(drag.element);if(App.Modules)
App.Modules.unregisterResizable(App.Modules.getObjByElement(drag.element));}}},unmark:function(){if(Sortable._marker)Element.hide(Sortable._marker);},mark:function(element,dropon,position){var sortable=Sortable.options(dropon.parentNode);if(sortable&&!sortable.ghosting)return;if(!Sortable._marker){Sortable._marker=$('dropmarker')||document.createElement(element.tagName);Element.hide(Sortable._marker);Element.addClassName(Sortable._marker,'dropmarker');Element.makePositioned(Sortable._marker);}
dropon.parentNode.insertBefore(Sortable._marker,dropon);if(position=='after'){dropon.parentNode.insertBefore(Sortable._marker,dropon.nextSibling);}
Element.show(Sortable._marker);},target:function(drag,dropon){var sortable=Sortable.options(dropon);if(sortable&&sortable.ghosting)return;var element=drag.element;if(!Sortable._targeter){Sortable._targeter=document.createElement(element.tagName);Sortable._targeter.style.visibility='hidden';element.parentNode.insertBefore(Sortable._targeter,element);Position.absolutize(drag.element);}
if(sortable&&sortable.targeting){Sortable._targeter.style.left='0px';Sortable._targeter.style.top='0px';Sortable._targeter.style.margin=Element.getStyle(element,'margin');Sortable._targeter.style.width=element._originalWidth||'';Sortable._targeter.style.height=(element._originalHeight?element._originalHeight:(element.offsetHeight?(element.offsetHeight+'px'):''));Sortable._targeter.style.position='relative';this.targetMark();}
else{this.unTargetMark();}
return Sortable._targeter;},untarget:function(drag){if(Sortable._targeter){Element.remove(Sortable._targeter);Sortable._targeter=null;this.unTargetMark();}},targetMark:function(){if(!Sortable._tageterMarker){Sortable._tageterMarker=document.createElement(Sortable._targeter.tagName);Element.addClassName(Sortable._tageterMarker,'targeter');Sortable._tageterMarker.style.position='absolute';document.body.appendChild(Sortable._tageterMarker);}
Sortable._tageterMarker.style.left=Position.cumulativeOffset(Sortable._targeter)[0]+'px';Sortable._tageterMarker.style.top=Position.cumulativeOffset(Sortable._targeter)[1]+'px';var disW=parseInt(Element.getStyle(Sortable._targeter,'margin-left'))||parseInt(Element.getStyle(Sortable._targeter,'margin-right'));var disH=parseInt(Element.getStyle(Sortable._targeter,'margin-top'))||parseInt(Element.getStyle(Sortable._targeter,'margin-bottom'));Sortable._tageterMarker.style.width=Sortable._targeter.offsetWidth-(disW||0)+'px';Sortable._tageterMarker.style.height=Sortable._targeter.offsetHeight-(disH||0)+'px';},unTargetMark:function(){if(Sortable._tageterMarker){Element.remove(Sortable._tageterMarker);Sortable._tageterMarker=null;}},serialize:function(element){element=$(element);var sortableOptions=this.options(element);var options=Object.extend({tag:sortableOptions.tag,only:sortableOptions.only,name:element.id,format:sortableOptions.format||/^[^_]*_(.*)$/},arguments[1]||{});return $(this.findElements(element,options)||[]).map(function(item){return(encodeURIComponent(options.name)+"[]="+
encodeURIComponent(item.id.match(options.format)?item.id.match(options.format)[1]:''));}).join("&");}};