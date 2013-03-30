/******* effect js **********/
// Copyright (c) 2005 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
// Contributors:
//  Justin Palmer (http://encytemedia.com/)
//  Mark Pilgrim (http://diveintomark.org/)
//  Martin Bialasinki
// 
// See scriptaculous.js for full license.  

/* ------------- element ext -------------- */  
 
// converts rgb() and #xxx to #xxxxxx format,  
// returns self (or first argument) if not convertable  
String.prototype.parseColor = function() {  
  var color = '#';  
  if(this.slice(0,4) == 'rgb(') {  
    var cols = this.slice(4,this.length-1).split(',');  
    var i=0; do { color += parseInt(cols[i]).toColorPart(); } while (++i<3);  
  } else {  
    if(this.slice(0,1) == '#') {  
      if(this.length==4) {for(var i=1;i<4;i++) {color += (this.charAt(i) + this.charAt(i)).toLowerCase();}}  
      if(this.length==7) {color = this.toLowerCase();}
    }  
  }  
  return(color.length==7 ? color : (arguments[0] || this));  
};

Element.collectTextNodes = function(element) {  
  return $A($(element).childNodes).collect( function(node) {
    return (node.nodeType==3 ? node.nodeValue : 
      (node.hasChildNodes() ? Element.collectTextNodes(node) : ''));
  }).flatten().join('');
};

Element.collectTextNodesIgnoreClass = function(element, className) {  
  return $A($(element).childNodes).collect( function(node) {
    return (node.nodeType==3 ? node.nodeValue : 
      ((node.hasChildNodes() && !Element.hasClassName(node,className)) ? 
        Element.collectTextNodes(node) : ''));
  }).flatten().join('');
};

Element.setStyle = function(element, style) {
  element = $(element);
  for(k in style) {element.style[k.camelize()] = style[k];}
};

Element.setContentZoom = function(element, percent) {  
  Element.setStyle(element, {fontSize: (percent/100) + 'em'});   
  if(navigator.appVersion.indexOf('AppleWebKit')>0) {window.scrollBy(0,0);}
};

Element.getOpacity = function(element){  
  var opacity;
  if (opacity = Element.getStyle(element, 'opacity')) { 
    return parseFloat(opacity);  
  }
  if (opacity = (Element.getStyle(element, 'filter') || '').match(/alpha\(opacity=(.*)\)/))  { 
    if(opacity[1]) {return parseFloat(opacity[1]) / 100;}
  }
  return 1.0;  
};

Element.setOpacity = function(element, value){  
  element= $(element);  
  if (value == 1){
    Element.setStyle(element, { opacity: 
      (/Gecko/.test(navigator.userAgent) && !/Konqueror|Safari|KHTML/.test(navigator.userAgent)) ? 
      0.999999 : null });
    if(/MSIE/.test(navigator.userAgent)) {
      Element.setStyle(element, {filter: Element.getStyle(element,'filter').replace(/alpha\([^\)]*\)/gi,'')});  
	}
  } else {  
    if(value < 0.00001) {value = 0; } 
    Element.setStyle(element, {opacity: value});
    if(/MSIE/.test(navigator.userAgent)) { 
     Element.setStyle(element, 
       { filter: Element.getStyle(element,'filter').replace(/alpha\([^\)]*\)/gi,'') +
                 'alpha(opacity='+value*100+')' });
	}
  }   
}; 
 
Element.getInlineOpacity = function(element){  
  return $(element).style.opacity || '';
}; 

Element.childrenWithClassName = function(element, className) {  
  return $A($(element).getElementsByTagName('*')).select(
    function(c) { return Element.hasClassName(c, className); });
};

Array.prototype.call = function() {
  var args = arguments;
  this.each(function(f){ f.apply(this, args); });
};

/*--------------------------------------------------------------------------*/

var Effect = {
  tagifyText: function(element) {
    var tagifyStyle = 'position:relative';
    if(/MSIE/.test(navigator.userAgent)) {tagifyStyle += ';zoom:1';}
    element = $(element);
    $A(element.childNodes).each( function(child) {
      if(child.nodeType==3) {
        child.nodeValue.toArray().each( function(character) {
          element.insertBefore(
            Builder.node('span',{style: tagifyStyle},
              character == ' ' ? String.fromCharCode(160) : character), 
              child);
        });
        Element.remove(child);
      }
    });
  },
  multiple: function(element, effect) {
    var elements;
    if(((typeof element == 'object') || 
        (typeof element == 'function')) && 
       (element.length)) {
      elements = element;
	}
    else {
      elements = $(element).childNodes;
	}
      
    var options = Object.extend({
      speed: 0.1,
      delay: 0.0
    }, arguments[2] || {});
    var masterDelay = options.delay;

    $A(elements).each( function(element, index) {
      var aa = new effect(element, Object.extend(options, { delay: index * options.speed + masterDelay }));
    });
  },
  PAIRS: {
    'slide':  ['SlideDown','SlideUp'],
    'blind':  ['BlindDown','BlindUp'],
    'appear': ['Appear','Fade']
  },
  toggle: function(element, effect) {
    element = $(element);
    effect = (effect || 'appear').toLowerCase();
    var options = Object.extend({
      queue: { position:'end', scope:(element.id || 'global') }
    }, arguments[2] || {});
    Effect[Element.visible(element) ? 
      Effect.PAIRS[effect][1] : Effect.PAIRS[effect][0]](element, options);
  }
};

var Effect2 = Effect; // deprecated

/* ------------- transitions ------------- */

Effect.Transitions = {};

Effect.Transitions.linear = function(pos) {
  return pos;
};
Effect.Transitions.sinoidal = function(pos) {
  return (-Math.cos(pos*Math.PI)/2) + 0.5;
};
Effect.Transitions.reverse  = function(pos) {
  return 1-pos;
};
Effect.Transitions.flicker = function(pos) {
  return ((-Math.cos(pos*Math.PI)/4) + 0.75) + Math.random()/4;
};
Effect.Transitions.wobble = function(pos) {
  return (-Math.cos(pos*Math.PI*(9*pos))/2) + 0.5;
};
Effect.Transitions.pulse = function(pos) {
  return (Math.floor(pos*10) % 2 == 0 ? 
    (pos*10-Math.floor(pos*10)) : 1-(pos*10-Math.floor(pos*10)));
};
Effect.Transitions.none = function(pos) {
  return 0;
};
Effect.Transitions.full = function(pos) {
  return 1;
};

/* ------------- core effects ------------- */

Effect.ScopedQueue = Class.create();
Object.extend(Object.extend(Effect.ScopedQueue.prototype, Enumerable), {
  initialize: function() {
    this.effects  = [];
    this.interval = null;
  },
  _each: function(iterator) {
    this.effects._each(iterator);
  },
  add: function(effect) {
    var timestamp = new Date().getTime();
    
    var position = (typeof effect.options.queue == 'string') ? 
      effect.options.queue : effect.options.queue.position;
    
    switch(position) {
      case 'front':
        // move unstarted effects after this effect  
        this.effects.findAll(function(e){ return e.state=='idle'; }).each( function(e) {
            e.startOn  += effect.finishOn;
            e.finishOn += effect.finishOn;
          });
        break;
      case 'end':
        // start effect after last queued effect has finished
        timestamp = this.effects.pluck('finishOn').max() || timestamp;
        break;
    }
    
    effect.startOn  += timestamp;
    effect.finishOn += timestamp;
    this.effects.push(effect);
    if(!this.interval) {
      this.interval = setInterval(this.loop.bind(this), 40);
	}
  },
  remove: function(effect) {
    this.effects = this.effects.reject(function(e) { return e==effect; });
    if(this.effects.length == 0) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },
  loop: function() {
    var timePos = new Date().getTime();
    this.effects.invoke('loop', timePos);
  }
});

Effect.Queues = {
  instances: $H(),
  get: function(queueName) {
    if(typeof queueName != 'string') {return queueName;}
    
    if(!this.instances[queueName]) {
      this.instances[queueName] = new Effect.ScopedQueue();
	}
      
    return this.instances[queueName];
  }
};
Effect.Queue = Effect.Queues.get('global');

Effect.DefaultOptions = {
  transition: Effect.Transitions.sinoidal,
  duration:   1.0,   // seconds
  fps:        25.0,  // max. 25fps due to Effect.Queue implementation
  sync:       false, // true for combining
  from:       0.0,
  to:         1.0,
  delay:      0.0,
  queue:      'parallel'
};

Effect.Base = function() {};
Effect.Base.prototype = {
  position: null,
  start: function(options) {
    this.options      = Object.extend(Object.extend({},Effect.DefaultOptions), options || {});
    this.currentFrame = 0;
    this.state        = 'idle';
    this.startOn      = this.options.delay*1000;
    this.finishOn     = this.startOn + (this.options.duration*1000);
    this.event('beforeStart');
    if(!this.options.sync) {
      Effect.Queues.get(typeof this.options.queue == 'string' ? 
        'global' : this.options.queue.scope).add(this);
	}
  },
  loop: function(timePos) {
    if(timePos >= this.startOn) {
      if(timePos >= this.finishOn) {
        this.render(1.0);
        this.cancel();
        this.event('beforeFinish');
        if(this.finish) {this.finish();}
        this.event('afterFinish');
        return;  
      }
      var pos   = (timePos - this.startOn) / (this.finishOn - this.startOn);
      var frame = Math.round(pos * this.options.fps * this.options.duration);
      if(frame > this.currentFrame) {
        this.render(pos);
        this.currentFrame = frame;
      }
    }
  },
  render: function(pos) {
    if(this.state == 'idle') {
      this.state = 'running';
      this.event('beforeSetup');
      if(this.setup) {this.setup();}
      this.event('afterSetup');
    }
    if(this.state == 'running') {
      if(this.options.transition) {pos = this.options.transition(pos);}
      pos *= (this.options.to-this.options.from);
      pos += this.options.from;
      this.position = pos;
      this.event('beforeUpdate');
      if(this.update) {this.update(pos);}
      this.event('afterUpdate');
    }
  },
  cancel: function() {
    if(!this.options.sync) {
      Effect.Queues.get(typeof this.options.queue == 'string' ? 
        'global' : this.options.queue.scope).remove(this);
	}
    this.state = 'finished';
  },
  event: function(eventName) {
    if(this.options[eventName + 'Internal']) {this.options[eventName + 'Internal'](this);}
    if(this.options[eventName]) {this.options[eventName](this);}
  },
  inspect: function() {
    return '#<Effect:' + $H(this).inspect() + ',options:' + $H(this.options).inspect() + '>';
  }
};

Effect.Parallel = Class.create();
Object.extend(Object.extend(Effect.Parallel.prototype, Effect.Base.prototype), {
  initialize: function(effects) {
    this.effects = effects || [];
    this.start(arguments[1]);
  },
  update: function(position) {
    this.effects.invoke('render', position);
  },
  finish: function(position) {
    this.effects.each( function(effect) {
      effect.render(1.0);
      effect.cancel();
      effect.event('beforeFinish');
      if(effect.finish) {effect.finish(position);}
      effect.event('afterFinish');
    });
  }
});

Effect.Opacity = Class.create();
Object.extend(Object.extend(Effect.Opacity.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    // make this work on IE on elements without 'layout'
    if(/MSIE/.test(navigator.userAgent) && (!this.element.hasLayout)) {
      Element.setStyle(this.element, {zoom: 1});
	}
    var options = Object.extend({
      from: Element.getOpacity(this.element) || 0.0,
      to:   1.0
    }, arguments[1] || {});
    this.start(options);
  },
  update: function(position) {
    Element.setOpacity(this.element, position);
  }
});

Effect.Move = Class.create();
Object.extend(Object.extend(Effect.Move.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    var options = Object.extend({
      x:    0,
      y:    0,
      mode: 'relative'
    }, arguments[1] || {});
    this.start(options);
  },
  setup: function() {
    // Bug in Opera: Opera returns the "real" position of a static element or
    // relative element that does not have top/left explicitly set.
    // ==> Always set top and left for position relative elements in your stylesheets 
    // (to 0 if you do not need them) 
    Element.makePositioned(this.element);
    this.originalLeft = parseFloat(Element.getStyle(this.element,'left') || '0');
    this.originalTop  = parseFloat(Element.getStyle(this.element,'top')  || '0');
    if(this.options.mode == 'absolute') {
      // absolute movement, so we need to calc deltaX and deltaY
      this.options.x = this.options.x - this.originalLeft;
      this.options.y = this.options.y - this.originalTop;
    }
  },
  update: function(position) {
    Element.setStyle(this.element, {
      left: this.options.x  * position + this.originalLeft + 'px',
      top:  this.options.y  * position + this.originalTop  + 'px'
    });
  }
});

// for backwards compatibility
Effect.MoveBy = function(element, toTop, toLeft) {
  return new Effect.Move(element, 
    Object.extend({ x: toLeft, y: toTop }, arguments[3] || {}));
};

Effect.Scale = Class.create();
Object.extend(Object.extend(Effect.Scale.prototype, Effect.Base.prototype), {
  initialize: function(element, percent) {
    this.element = $(element);
    var options = Object.extend({
      scaleX: true,
      scaleY: true,
      scaleContent: true,
      scaleFromCenter: false,
      scaleMode: 'box',        // 'box' or 'contents' or {} with provided values
      scaleFrom: 100.0,
      scaleTo:   percent
    }, arguments[2] || {});
    this.start(options);
  },
  setup: function() {
    this.restoreAfterFinish = this.options.restoreAfterFinish || false;
    this.elementPositioning = Element.getStyle(this.element,'position');
    
    this.originalStyle = {};
    ['top','left','width','height','fontSize'].each( function(k) {
      this.originalStyle[k] = this.element.style[k];
    }.bind(this));
      
    this.originalTop  = this.element.offsetTop;
    this.originalLeft = this.element.offsetLeft;
    
    var fontSize = Element.getStyle(this.element,'font-size') || '100%';
    ['em','px','%'].each( function(fontSizeType) {
      if(fontSize.indexOf(fontSizeType)>0) {
        this.fontSize     = parseFloat(fontSize);
        this.fontSizeType = fontSizeType;
      }
    }.bind(this));
    
    this.factor = (this.options.scaleTo - this.options.scaleFrom)/100;
    
    this.dims = null;
    if(this.options.scaleMode=='box') {
      this.dims = [this.element.offsetHeight, this.element.offsetWidth];
	}
    if(/^content/.test(this.options.scaleMode)) {
      this.dims = [this.element.scrollHeight, this.element.scrollWidth];
	}
    if(!this.dims) {
      this.dims = [this.options.scaleMode.originalHeight,
                   this.options.scaleMode.originalWidth];
	}
  },
  update: function(position) {
    var currentScale = (this.options.scaleFrom/100.0) + (this.factor * position);
    if(this.options.scaleContent && this.fontSize) {
      Element.setStyle(this.element, {fontSize: this.fontSize * currentScale + this.fontSizeType });
	}
    this.setDimensions(this.dims[0] * currentScale, this.dims[1] * currentScale);
  },
  finish: function(position) {
    if (this.restoreAfterFinish) {Element.setStyle(this.element, this.originalStyle);}
  },
  setDimensions: function(height, width) {
    var d = {};
    if(this.options.scaleX) {d.width = width + 'px';}
    if(this.options.scaleY) {d.height = height + 'px';}
    if(this.options.scaleFromCenter) {
      var topd  = (height - this.dims[0])/2;
      var leftd = (width  - this.dims[1])/2;
      if(this.elementPositioning == 'absolute') {
        if(this.options.scaleY) {d.top = this.originalTop-topd + 'px';}
        if(this.options.scaleX) {d.left = this.originalLeft-leftd + 'px';}
      } else {
        if(this.options.scaleY) {d.top = -topd + 'px';}
        if(this.options.scaleX) {d.left = -leftd + 'px';}
      }
    }
    Element.setStyle(this.element, d);
  }
});

Effect.Highlight = Class.create();
Object.extend(Object.extend(Effect.Highlight.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    var options = Object.extend({ startcolor: '#ffff99' }, arguments[1] || {});
    this.start(options);
  },
  setup: function() {
    // Prevent executing on elements not in the layout flow
    if(Element.getStyle(this.element, 'display')=='none') { this.cancel(); return; }
    // Disable background image during the effect
    this.oldStyle = {
      backgroundImage: Element.getStyle(this.element, 'background-image') };
    Element.setStyle(this.element, {backgroundImage: 'none'});
    if(!this.options.endcolor) {
      this.options.endcolor = Element.getStyle(this.element, 'background-color').parseColor('#ffffff');
	}
    if(!this.options.restorecolor) {
      this.options.restorecolor = Element.getStyle(this.element, 'background-color');
	}
    // init color calculations
    this._base  = $R(0,2).map(function(i){ return parseInt(this.options.startcolor.slice(i*2+1,i*2+3),16); }.bind(this));
    this._delta = $R(0,2).map(function(i){ return parseInt(this.options.endcolor.slice(i*2+1,i*2+3),16)-this._base[i]; }.bind(this));
  },
  update: function(position) {
    Element.setStyle(this.element,{backgroundColor: $R(0,2).inject('#',function(m,v,i){
      return m+(Math.round(this._base[i]+(this._delta[i]*position)).toColorPart()); }.bind(this)) });
  },
  finish: function() {
    Element.setStyle(this.element, Object.extend(this.oldStyle, {
      backgroundColor: this.options.restorecolor
    }));
  }
});

Effect.ScrollTo = Class.create();
Object.extend(Object.extend(Effect.ScrollTo.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    this.start(arguments[1] || {});
  },
  setup: function() {
    Position.prepare();
    var offsets = Position.cumulativeOffset(this.element);
    if(this.options.offset) {offsets[1] += this.options.offset;}
    var max = window.innerHeight ? 
      window.height - window.innerHeight :
      document.body.scrollHeight - 
        (document.documentElement.clientHeight ? 
          document.documentElement.clientHeight : document.body.clientHeight);
    this.scrollStart = Position.deltaY;
    this.delta = (offsets[1] > max ? max : offsets[1]) - this.scrollStart;
  },
  update: function(position) {
    Position.prepare();
    window.scrollTo(Position.deltaX, 
      this.scrollStart + (position*this.delta));
  }
});

/* ------------- combination effects ------------- */

Effect.Fade = function(element) {
  var oldOpacity = Element.getInlineOpacity(element);
  var options = Object.extend({
  from: Element.getOpacity(element) || 1.0,
  to:   0.0,
  afterFinishInternal: function(effect) {
    if(effect.options.to!=0) {return;}
    Element.hide(effect.element);
    Element.setStyle(effect.element, {opacity: oldOpacity}); }
  }, arguments[1] || {});
  return new Effect.Opacity(element,options);
};

Effect.Appear = function(element) {
  var options = Object.extend({
  from: (Element.getStyle(element, 'display') == 'none' ? 0.0 : Element.getOpacity(element) || 0.0),
  to:   1.0,
  beforeSetup: function(effect) { 
    Element.setOpacity(effect.element, effect.options.from);
    Element.show(effect.element); }
  }, arguments[1] || {});
  return new Effect.Opacity(element,options);
};

Effect.Puff = function(element) {
  element = $(element);
  var oldStyle = { opacity: Element.getInlineOpacity(element), position: Element.getStyle(element, 'position') };
  return new Effect.Parallel(
   [ new Effect.Scale(element, 200, 
      { sync: true, scaleFromCenter: true, scaleContent: true, restoreAfterFinish: true }), 
     new Effect.Opacity(element, { sync: true, to: 0.0 } ) ], 
     Object.extend({ duration: 1.0, 
      beforeSetupInternal: function(effect) { 
        Element.setStyle(effect.effects[0].element, {position: 'absolute'}); },
      afterFinishInternal: function(effect) {
         Element.hide(effect.effects[0].element);
         Element.setStyle(effect.effects[0].element, oldStyle); }
     }, arguments[1] || {})
   );
};

Effect.BlindUp = function(element) {
  element = $(element);
  Element.makeClipping(element);
  return new Effect.Scale(element, 0, 
    Object.extend({ scaleContent: false, 
      scaleX: false, 
      restoreAfterFinish: true,
      afterFinishInternal: function(effect) {
        [Element.hide, Element.undoClipping].call(effect.element); } 
    }, arguments[1] || {})
  );
};

Effect.BlindDown = function(element) {
  element = $(element);
  var oldHeight = Element.getStyle(element, 'height');
  var elementDimensions = Element.getDimensions(element);
  return new Effect.Scale(element, 100, 
    Object.extend({ scaleContent: false, 
      scaleX: false,
      scaleFrom: 0,
      scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
      restoreAfterFinish: true,
      afterSetup: function(effect) {
        Element.makeClipping(effect.element);
        Element.setStyle(effect.element, {height: '0px'});
        Element.show(effect.element); 
      },  
      afterFinishInternal: function(effect) {
        Element.undoClipping(effect.element);
        Element.setStyle(effect.element, {height: oldHeight});
      }
    }, arguments[1] || {})
  );
};

Effect.SwitchOff = function(element) {
  element = $(element);
  var oldOpacity = Element.getInlineOpacity(element);
  return new Effect.Appear(element, { 
    duration: 0.4,
    from: 0,
    transition: Effect.Transitions.flicker,
    afterFinishInternal: function(effect) {
      var aa = new Effect.Scale(effect.element, 1, { 
        duration: 0.3, scaleFromCenter: true,
        scaleX: false, scaleContent: false, restoreAfterFinish: true,
        beforeSetup: function(effect) {
          [Element.makePositioned,Element.makeClipping].call(effect.element);
        },
        afterFinishInternal: function(effect) {
          [Element.hide,Element.undoClipping,Element.undoPositioned].call(effect.element);
          Element.setStyle(effect.element, {opacity: oldOpacity});
        }
      });
    }
  });
};

Effect.DropOut = function(element) {
  element = $(element);
  var oldStyle = {
    top: Element.getStyle(element, 'top'),
    left: Element.getStyle(element, 'left'),
    opacity: Element.getInlineOpacity(element) };
  return new Effect.Parallel(
    [ new Effect.Move(element, {x: 0, y: 100, sync: true }), 
      new Effect.Opacity(element, { sync: true, to: 0.0 }) ],
    Object.extend(
      { duration: 0.5,
        beforeSetup: function(effect) {
          Element.makePositioned(effect.effects[0].element); },
        afterFinishInternal: function(effect) {
          [Element.hide, Element.undoPositioned].call(effect.effects[0].element);
          Element.setStyle(effect.effects[0].element, oldStyle); } 
      }, arguments[1] || {}));
};

Effect.Shake = function(element) {
  element = $(element);
  var oldStyle = {
    top: Element.getStyle(element, 'top'),
    left: Element.getStyle(element, 'left') };
	  return new Effect.Move(element, 
	    { x:  20, y: 0, duration: 0.05, afterFinishInternal: function(effect) {
	  var aa = new Effect.Move(effect.element,
	    { x: -40, y: 0, duration: 0.1,  afterFinishInternal: function(effect) {
	  var bb = new Effect.Move(effect.element,
	    { x:  40, y: 0, duration: 0.1,  afterFinishInternal: function(effect) {
	  var cc = new Effect.Move(effect.element,
	    { x: -40, y: 0, duration: 0.1,  afterFinishInternal: function(effect) {
	  var dd = new Effect.Move(effect.element,
	    { x:  40, y: 0, duration: 0.1,  afterFinishInternal: function(effect) {
	  var ee = new Effect.Move(effect.element,
	    { x: -20, y: 0, duration: 0.05, afterFinishInternal: function(effect) {
        Element.undoPositioned(effect.element);
        Element.setStyle(effect.element, oldStyle);
  }}); }}); }}); }}); }}); }});
};

Effect.SlideDown = function(element) {
  element = $(element);
  Element.cleanWhitespace(element);
  // SlideDown need to have the content of the element wrapped in a container element with fixed height!
  var oldInnerBottom = Element.getStyle(element.firstChild, 'bottom');
  var elementDimensions = Element.getDimensions(element);
  return new Effect.Scale(element, 100, Object.extend({ 
    scaleContent: false, 
    scaleX: false, 
    scaleFrom: 0,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      Element.makePositioned(effect.element);
      Element.makePositioned(effect.element.firstChild);
      if(window.opera) {Element.setStyle(effect.element, {top: ''});}
      Element.makeClipping(effect.element);
      Element.setStyle(effect.element, {height: '0px'});
      Element.show(element); },
    afterUpdateInternal: function(effect) {
      Element.setStyle(effect.element.firstChild, {bottom:
        (effect.dims[0] - effect.element.clientHeight) + 'px' }); },
    afterFinishInternal: function(effect) {
      Element.undoClipping(effect.element); 
      Element.undoPositioned(effect.element.firstChild);
      Element.undoPositioned(effect.element);
      Element.setStyle(effect.element.firstChild, {bottom: oldInnerBottom}); }
    }, arguments[1] || {})
  );
};
  
Effect.SlideUp = function(element) {
  element = $(element);
  Element.cleanWhitespace(element);
  var oldInnerBottom = Element.getStyle(element.firstChild, 'bottom');
  return new Effect.Scale(element, 0, 
   Object.extend({ scaleContent: false, 
    scaleX: false, 
    scaleMode: 'box',
    scaleFrom: 100,
    restoreAfterFinish: true,
    beforeStartInternal: function(effect) {
      Element.makePositioned(effect.element);
      Element.makePositioned(effect.element.firstChild);
      if(window.opera) {Element.setStyle(effect.element, {top: ''});}
      Element.makeClipping(effect.element);
      Element.show(element); },  
    afterUpdateInternal: function(effect) {
      Element.setStyle(effect.element.firstChild, {bottom:
        (effect.dims[0] - effect.element.clientHeight) + 'px' }); },
    afterFinishInternal: function(effect) {
        [Element.hide, Element.undoClipping].call(effect.element); 
        Element.undoPositioned(effect.element.firstChild);
        Element.undoPositioned(effect.element);
        Element.setStyle(effect.element.firstChild, {bottom: oldInnerBottom}); }
   }, arguments[1] || {})
  );
};

// Bug in opera makes the TD containing this element expand for a instance after finish 
Effect.Squish = function(element) {
  return new Effect.Scale(element, window.opera ? 1 : 0, 
    { restoreAfterFinish: true,
      beforeSetup: function(effect) {
        Element.makeClipping(effect.element); },  
      afterFinishInternal: function(effect) {
        Element.hide(effect.element); 
        Element.undoClipping(effect.element); }
  });
};

Effect.Grow = function(element) {
  element = $(element);
  var options = Object.extend({
    direction: 'center',
    moveTransistion: Effect.Transitions.sinoidal,
    scaleTransition: Effect.Transitions.sinoidal,
    opacityTransition: Effect.Transitions.full
  }, arguments[1] || {});
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    height: element.style.height,
    width: element.style.width,
    opacity: Element.getInlineOpacity(element) };

  var dims = Element.getDimensions(element);    
  var initialMoveX, initialMoveY;
  var moveX, moveY;
  
  switch (options.direction) {
    case 'top-left':
      initialMoveX = initialMoveY = moveX = moveY = 0; 
      break;
    case 'top-right':
      initialMoveX = dims.width;
      initialMoveY = moveY = 0;
      moveX = -dims.width;
      break;
    case 'bottom-left':
      initialMoveX = moveX = 0;
      initialMoveY = dims.height;
      moveY = -dims.height;
      break;
    case 'bottom-right':
      initialMoveX = dims.width;
      initialMoveY = dims.height;
      moveX = -dims.width;
      moveY = -dims.height;
      break;
    case 'center':
      initialMoveX = dims.width / 2;
      initialMoveY = dims.height / 2;
      moveX = -dims.width / 2;
      moveY = -dims.height / 2;
      break;
  }
  
  return new Effect.Move(element, {
    x: initialMoveX,
    y: initialMoveY,
    duration: 0.01, 
    beforeSetup: function(effect) {
      Element.hide(effect.element);
      Element.makeClipping(effect.element);
      Element.makePositioned(effect.element);
    },
    afterFinishInternal: function(effect) {
      var aa = new Effect.Parallel(
        [ new Effect.Opacity(effect.element, { sync: true, to: 1.0, from: 0.0, transition: options.opacityTransition }),
          new Effect.Move(effect.element, { x: moveX, y: moveY, sync: true, transition: options.moveTransition }),
          new Effect.Scale(effect.element, 100, {
            scaleMode: { originalHeight: dims.height, originalWidth: dims.width }, 
            sync: true, scaleFrom: window.opera ? 1 : 0, transition: options.scaleTransition, restoreAfterFinish: true})
        ], Object.extend({
             beforeSetup: function(effect) {
               Element.setStyle(effect.effects[0].element, {height: '0px'});
               Element.show(effect.effects[0].element); },
             afterFinishInternal: function(effect) {
               [Element.undoClipping, Element.undoPositioned].call(effect.effects[0].element); 
               Element.setStyle(effect.effects[0].element, oldStyle); }
           }, options)
      );
    }
  });
};

Effect.Shrink = function(element) {
  element = $(element);
  var options = Object.extend({
    direction: 'center',
    moveTransistion: Effect.Transitions.sinoidal,
    scaleTransition: Effect.Transitions.sinoidal,
    opacityTransition: Effect.Transitions.none
  }, arguments[1] || {});
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    height: element.style.height,
    width: element.style.width,
    opacity: Element.getInlineOpacity(element) };

  var dims = Element.getDimensions(element);
  var moveX, moveY;
  
  switch (options.direction) {
    case 'top-left':
      moveX = moveY = 0;
      break;
    case 'top-right':
      moveX = dims.width;
      moveY = 0;
      break;
    case 'bottom-left':
      moveX = 0;
      moveY = dims.height;
      break;
    case 'bottom-right':
      moveX = dims.width;
      moveY = dims.height;
      break;
    case 'center':  
      moveX = dims.width / 2;
      moveY = dims.height / 2;
      break;
  }
  
  return new Effect.Parallel(
    [ new Effect.Opacity(element, { sync: true, to: 0.0, from: 1.0, transition: options.opacityTransition }),
      new Effect.Scale(element, window.opera ? 1 : 0, { sync: true, transition: options.scaleTransition, restoreAfterFinish: true}),
      new Effect.Move(element, { x: moveX, y: moveY, sync: true, transition: options.moveTransition })
    ], Object.extend({            
         beforeStartInternal: function(effect) {
           [Element.makePositioned, Element.makeClipping].call(effect.effects[0].element); },
         afterFinishInternal: function(effect) {
           [Element.hide, Element.undoClipping, Element.undoPositioned].call(effect.effects[0].element);
           Element.setStyle(effect.effects[0].element, oldStyle); }
       }, options)
  );
};

Effect.Pulsate = function(element) {
  element = $(element);
  var options    = arguments[1] || {};
  var oldOpacity = Element.getInlineOpacity(element);
  var transition = options.transition || Effect.Transitions.sinoidal;
  var reverser   = function(pos){ return transition(1-Effect.Transitions.pulse(pos)); };
  reverser.bind(transition);
  return new Effect.Opacity(element, 
    Object.extend(Object.extend({  duration: 3.0, from: 0,
      afterFinishInternal: function(effect) { Element.setStyle(effect.element, {opacity: oldOpacity}); }
    }, options), {transition: reverser}));
};

Effect.Fold = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    width: element.style.width,
    height: element.style.height };
  Element.makeClipping(element);
  return new Effect.Scale(element, 5, Object.extend({   
    scaleContent: false,
    scaleX: false,
    afterFinishInternal: function(effect) {
    var aa = new Effect.Scale(element, 1, { 
      scaleContent: false, 
      scaleY: false,
      afterFinishInternal: function(effect) {
        [Element.hide, Element.undoClipping].call(effect.element); 
        Element.setStyle(effect.element, oldStyle);
      } });
  }}, arguments[1] || {}));
};

/******* Drag and Drop Js **********/
//	Based on Scriptaculous (http://script.aculo.us)
//	Copyright (c) 2005 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
//	Modifid by Todd Lee (www.todd-lee.com)
//	Last Update: 2006-11-10
//	Copyright: Sohu.com (www.sohu.com)
/************************************/
var Droppables = {
  drops: [],

  remove: function(element) {
    //this.drops = this.drops.reject(function(d) { return d.element==$(element) });
	
		// Todd Lee
		var n = 0;
		var results = [];
		this.drops.each(function(d) {
			if (d.element==$(element) && n==0) {
				n++;
				throw $continue;
			}
			results.push(d);
		});
		this.drops = results;
  },

  add: function(element) {
    element = $(element);
    var options = Object.extend({
      greedy:     true,
      hoverclass: null  
    }, arguments[1] || {});

    // cache containers
    if(options.containment) {
      options._containers = [];
      var containment = options.containment;
      if((typeof containment == 'object') && 
        (containment.constructor == Array)) {
        containment.each( function(c) { options._containers.push($(c)); });
      } else {
        options._containers.push($(containment));
      }
    }
    
    if(options.accept) {options.accept = [options.accept].flatten();}
	
		// Todd Lee
		if(options.exclude) {
		  options._exclude = [];
		  var exclude = options.exclude;
		  if((typeof exclude == 'object') && 
			(exclude.constructor == Array)) {
			exclude.each( function(o) { options._exclude.push($(o)); });
		  } else {
			options._exclude.push($(exclude));
		  }
		}

    //Element.makePositioned(element); // fix IE	// Todd Lee
    options.element = element;

	//$LR(element.id)
    this.drops.push(options);
	//$LR(this.drops)
  },

  isContained: function(element, drop) {
    var parentNode = element.parentNode;
    return drop._containers.detect(function(c) {return parentNode == c; });
  },

	// Todd Lee
	isExclude: function(point, drop) {
		return drop._exclude.any(function(o) { return Position.within(o, point[0], point[1]); });
	},
/*isAffected: function(point, element, drop) {
    return (
      (drop.element!=element) &&
      ((!drop._containers) ||
        this.isContained(element, drop)) &&
      ((!drop.accept) ||
        (Element.classNames(element).detect( 
          function(v) { return drop.accept.include(v) } ) )) &&
      Position.within(drop.element, point[0], point[1]) );
  },*/
  	// Todd Lee
  isAffected: function(point, element, drop) {
    /*return (
      (drop.element!=element) &&
      ((!drop._containers) ||
        this.isContained(element, drop)) &&
      ((!drop.accept) ||
        (Element.classNames(element).detect( 
          function(v) { return drop.accept.include(v) } ) ) ||
			(drop.accept == element.id) ) &&
	  ((!drop.exclude) || 
		!this.isExclude(point, drop)
	  ) &&
      Position.within(drop.element, point[0], point[1])
	);*/
	// Todd Lee
	  /*var aa = '';
	  aa += drop.element.id +' ';
	  aa += Position.within(drop.element, point[0], point[1]) +' ';
	  aa += (drop.element!=element) +' ';
	  aa += ((!drop.exclude) || !this.isExclude(point, drop)) +' ';
	  aa += ((!drop.accept) ||    (Element.classNames(element).detect( function(v) { return drop.accept.include(v) } ) ) ||	(drop.accept == element.id) ) +' ';
	  aa += ((!drop._containers) || this.isContained(element, drop)) +' ';
	  $LR(aa);*/
	  
    return (
      Position.within(drop.element, point[0], point[1]) &&
      (drop.element!=element) &&
	  ((!drop.exclude) || 
		!this.isExclude(point, drop)) &&
      ((!drop.accept) ||
        (Element.classNames(element).detect( 
          function(v) { return drop.accept.include(v); } ) ) ||
			(drop.accept == element.id) ) /*&&	// Todd Lee mark this for mod in tabs drop bug, why here use this?????
      ((!drop._containers) ||
        this.isContained(element, drop))*/
	  
	);
  },

  deactivate: function(drop) {
    if(drop.hoverclass) {
      Element.removeClassName(drop.element, drop.hoverclass);
	}
    this.last_active = null;
  },

  activate: function(drop) {
    if(drop.hoverclass) {
      Element.addClassName(drop.element, drop.hoverclass);
	}
    this.last_active = drop;
  },

/*  
	show: function(point, element) {
    if(!this.drops.length) return;
    
    if(this.last_active) this.deactivate(this.last_active);
    this.drops.each( function(drop) {
      if(Droppables.isAffected(point, element, drop)) {
        if(drop.onHover)
           drop.onHover(element, drop.element, Position.overlap(drop.overlap, drop.element));
        if(drop.greedy) { 
          Droppables.activate(drop);
          throw $break;
        }
      }
    });
  },
*/  
	// Todd Lee
	// change element to drag object
  show: function(point, drag) {
    if(!this.drops.length) {return;}
	var element = drag.element;
    if(this.last_active) {this.deactivate(this.last_active);}
	//$LR('<hr />')
    this.drops.each( function(drop) {
		  //$LR(drop.element.id+' -- ')
      if(Droppables.isAffected(point, element, drop)) {
        if(drop.onHover) {
           //drop.onHover(element, drop.element, Position.overlap(drop.overlap, drop.element));
           drop.onHover(drag, drop.element, Position.overlap(drop.overlap, drop.element));	// Todd Lee
		   Droppables.activate(drop);	// Todd Lee
		}
		
			// Todd Lee
			/*if (drop.capture) {
				Droppables.activate(drop);
				throw $break;
			}*/
			
        if(drop.greedy) { 
          Droppables.activate(drop);
          throw $break;
        }
      }
    });
	//if (Browser.ua.indexOf('ie')>=0) this.oupPutSomeThing();	// Todd Lee
	},
	
	// Todd Lee
	// fix IE bug
	// it's very slow if there's no element out put
	oupPutSomeThing: function() {
		if (!$('_tmpP')) {
			var _tmpP = document.createElement('div');
			_tmpP.id = '_tmpP';
			Element.hide(_tmpP);
			document.body.appendChild(_tmpP);
		}
		else {
			var _tmpP = $('_tmpP');
		}
		_tmpP.innerHTML += 'a<br />';
	},
	
/*
  fire: function(event, element) {
    if(!this.last_active) return;
    Position.prepare();

    if (this.isAffected([Event.pointerX(event), Event.pointerY(event)], element, this.last_active))
      if (this.last_active.onDrop) 
        this.last_active.onDrop(element, this.last_active.element, event);
  },
*/
	// Todd Lee
	// change element to drag object
  fire: function(event, drag) {
	  
	  	// Todd Lee
		/*if (Sortable._targeter) {
			Sortable._targeter.parentNode.insertBefore(drag.element, Sortable._targeter);
			if (typeof drag.element._originalWidth == 'undefined' || typeof drag.element._originalHeight == 'undefined') {
				drag.element._originalWidth = '';
				drag.element._originalHeight = '';
			}
		}*/
		
    if(!this.last_active) {
		//drag.delta = [0,0];	// Todd Lee
		//drag.hasDrop = null;	// Todd Lee
		return;
	}
    Position.prepare();
	
	var element = drag.element;
    if (this.isAffected([Event.pointerX(event), Event.pointerY(event)], element, this.last_active)) {
	  
	  //drag.hasDrop = this.last_active;	// Todd Lee
	  
      if (this.last_active.onDrop) {
        //this.last_active.onDrop(element, this.last_active.element, event);
		this.last_active.onDrop(drag, this.last_active.element, event);	// Todd Lee
	  }
	}
	 
  },

  reset: function() {
    if(this.last_active) {
      this.deactivate(this.last_active);
	}
  }
};

var Draggables = {
  drags: [],
  observers: [],
  
  register: function(draggable) {
    if(this.drags.length == 0) {
      this.eventMouseUp   = this.endDrag.bindAsEventListener(this);
      this.eventMouseMove = this.updateDrag.bindAsEventListener(this);
      this.eventKeypress  = this.keyPress.bindAsEventListener(this);
      
      Event.observe(document, "mouseup", this.eventMouseUp);
      Event.observe(document, "mousemove", this.eventMouseMove);
      Event.observe(document, "keypress", this.eventKeypress);
    }
    this.drags.push(draggable);
  },
  
  unregister: function(draggable) {
    this.drags = this.drags.reject(function(d) { return d==draggable; });
    if(this.drags.length == 0) {
      Event.stopObserving(document, "mouseup", this.eventMouseUp);
      Event.stopObserving(document, "mousemove", this.eventMouseMove);
      Event.stopObserving(document, "keypress", this.eventKeypress);
    }
  },
  
  activate: function(draggable) {
    window.focus(); // allows keypress events if window isn't currently focused, fails for Safari
    this.activeDraggable = draggable;
  },
  
  deactivate: function(draggbale) {
    this.activeDraggable = null;
  },
  
  updateDrag: function(event) {
    if(!this.activeDraggable) {return;}
    var pointer = [Event.pointerX(event), Event.pointerY(event)];
    // Mozilla-based browsers fire successive mousemove events with
    // the same coordinates, prevent needless redrawing (moz bug?)
    if(this._lastPointer && (this._lastPointer.inspect() == pointer.inspect())) {return;}
    this._lastPointer = pointer;
    this.activeDraggable.updateDrag(event, pointer);
  },
  
  endDrag: function(event) {
    if(!this.activeDraggable) {return;}
    this._lastPointer = null;
    this.activeDraggable.endDrag(event);
    this.activeDraggable = null;
  },
  
  keyPress: function(event) {
    if(this.activeDraggable) {
      this.activeDraggable.keyPress(event);
	}
  },
  
  addObserver: function(observer) {
    this.observers.push(observer);
    this._cacheObserverCallbacks();
  },
  
  removeObserver: function(element) {  // element instead of observer fixes mem leaks
    this.observers = this.observers.reject( function(o) { return o.element==element; });
    this._cacheObserverCallbacks();
  },
  
  notify: function(eventName, draggable, event) {  // 'onStart', 'onEnd', 'onDrag'
    if(this[eventName+'Count'] > 0) {
      this.observers.each( function(o) {
        if(o[eventName]) {o[eventName](eventName, draggable, event);}
      });
	}
  },
  
  _cacheObserverCallbacks: function() {
    ['onStart','onEnd','onDrag'].each( function(eventName) {
      Draggables[eventName+'Count'] = Draggables.observers.select(
        function(o) { return o[eventName]; }
      ).length;
    });
  }
};

/*--------------------------------------------------------------------------*/

var Draggable = Class.create();
Draggable.prototype = {
  initialize: function(element) {
    var options = Object.extend({
      handle: false,
      starteffect: function(element) { 
        var aa = new Effect.Opacity(element, {duration:0.2, from:1.0, to:0.7}); 
      },
      reverteffect: function(element, top_offset, left_offset) {
        var dur = Math.sqrt(Math.abs(top_offset^2)+Math.abs(left_offset^2))*0.02;
        element._revert = new Effect.Move(element, { x: -left_offset, y: -top_offset, duration: dur});
      },
      endeffect: function(element) { 
        var aa = new Effect.Opacity(element, {duration:0.2, from:0.7, to:1.0}); 
      },
      zindex: 1000,
      revert: false,
      snap: false   // false, or xy or [x,y] or function(x,y){ return [x,y] }
    }, arguments[1] || {});

    this.element = $(element);
    
    if(options.handle && (typeof options.handle == 'string')) {
      this.handle = Element.childrenWithClassName(this.element, options.handle)[0];  
	}
    if(!this.handle) {this.handle = $(options.handle);}
    if(!this.handle) {this.handle = this.element;}

    //Element.makePositioned(this.element); // fix IE	// Todd Lee

    //this.delta    = this.currentDelta();
    this.options  = options;
    this.dragging = false;

    this.eventMouseDown = this.initDrag.bindAsEventListener(this);
    Event.observe(this.handle, "mousedown", this.eventMouseDown);
    
    Draggables.register(this);
	
	// Todd Lee
	this.handle.style.cursor = (options.constraint)? (options.constraint == 'horizontal'?'e':'')+(options.constraint == 'vertical'?'s':'')+'-resize' : 'move';
  },
  
  destroy: function() {
    Event.stopObserving(this.handle, "mousedown", this.eventMouseDown);
    Draggables.unregister(this);
  },
  
  currentDelta: function() {
    return([
      parseInt(Element.getStyle(this.element,'left') || '0'),
      parseInt(Element.getStyle(this.element,'top') || '0')]);
  },
  
  initDrag: function(event) {
    if(Event.isLeftClick(event)) {    
      // abort on form elements, fixes a Firefox issue
      var src = Event.element(event);
      if(src.tagName && (
        src.tagName=='INPUT' ||
        src.tagName=='SELECT' ||
        src.tagName=='BUTTON' ||
        src.tagName=='TEXTAREA')) {return;}
        
      if(this.element._revert) {
        this.element._revert.cancel();
        this.element._revert = null;
      }
      
	  this.delta  = this.currentDelta();	// Todd Lee
      var pointer = [Event.pointerX(event), Event.pointerY(event)];
      var pos     = Position.cumulativeOffset(this.element);
      this.offset = [0,1].map( function(i) { return (pointer[i] - pos[i]); });
      
      Draggables.activate(this);
      Event.stop(event);
    }
  },
  
  startDrag: function(event) {
    this.dragging = true;
	
	this.lastPointer = [Event.pointerX(event), Event.pointerY(event)];	// Todd Lee
    
    if(this.options.zindex) {
      this.originalZ = parseInt(Element.getStyle(this.element,'z-index') || 0);
      this.element.style.zIndex = this.options.zindex;
    }
    if(this.options.ghosting) {
      this._clone = this.element.cloneNode(true);
      Position.absolutize(this.element);
      this.element.parentNode.insertBefore(this._clone, this.element);
    }
	
    Draggables.notify('onStart', this, event);
    if(this.options.starteffect) {this.options.starteffect(this.element);}
  },
  
  updateDrag: function(event, pointer) {
    if(!this.dragging) {this.startDrag(event);}
    Position.prepare();
	//Droppables.show(pointer, this.element);
	
		// Todd Lee
		var _pointer = [
			(this.options.constraint == 'vertical')? this.lastPointer[0] : pointer[0],
			(this.options.constraint == 'horizontal')? this.lastPointer[1] : pointer[1]
			];
		Droppables.show(_pointer, this);
	
	Draggables.notify('onDrag', this, event);
    this.draw(pointer);
    if(this.options.change) {this.options.change(this);}
    
    // fix AppleWebKit rendering
    if(navigator.appVersion.indexOf('AppleWebKit')>0) {window.scrollBy(0,0);}
    Event.stop(event);
  },
  
  finishDrag: function(event, success) {
    this.dragging = false;

    if(this.options.ghosting) {
      Element.remove(this._clone);
      Position.relativize(this.element);
      this._clone = null;
    }
		/*// Todd Lee
		if(this._targeter) {
			this.removeTargeter();
		}*/
		
    //if(success) Droppables.fire(event, this.element);
    if(success) {Droppables.fire(event, this);	}// Todd Lee
    Draggables.notify('onEnd', this, event);
	
	if (!this.hasDrop) {	// Todd Lee
		Position.relativize(this.element);	// Todd Lee
	}	// Todd Lee
	//this.hasDrop = null;	// Todd Lee
	
	if (this.hasDrop && !success || !this.hasDrop) {	// Todd Lee
		var revert = this.options.revert;
		if(revert && typeof revert == 'function') {revert = revert(this.element);}
	
		var d = this.currentDelta();
		if(revert && this.options.reverteffect) {
		  this.options.reverteffect(this.element, 
			d[1]-this.delta[1], d[0]-this.delta[0]);
		} else {
		  this.delta = d;
		}
	}	// Todd Lee

    if(this.options.zindex) {
      this.element.style.zIndex = this.originalZ;
	}

    if(this.options.endeffect) {
      this.options.endeffect(this.element);
	}

    Draggables.deactivate(this);
    Droppables.reset();
  },
  
  keyPress: function(event) {
    if(!event.keyCode==Event.KEY_ESC) {return;}
    this.finishDrag(event, false);
    Event.stop(event);
  },
  
  endDrag: function(event) {
    if(!this.dragging) {return;}
    this.finishDrag(event, true);
    Event.stop(event);
  },
  
  draw: function(point) {
    var pos = Position.cumulativeOffset(this.element);
    var d = this.currentDelta();
    pos[0] -= d[0]; pos[1] -= d[1];
    
    var p = [0,1].map(function(i){ return (point[i]-pos[i]-this.offset[i]); }.bind(this));
    
    if(this.options.snap) {
      if(typeof this.options.snap == 'function') {
        p = this.options.snap(p[0],p[1]);
      } else {
      if(this.options.snap instanceof Array) {
        p = p.map( function(v, i) {
          return Math.round(v/this.options.snap[i])*this.options.snap[i]; }.bind(this));
      } else {
        p = p.map( function(v) {
          return Math.round(v/this.options.snap)*this.options.snap; }.bind(this));
      }
    }}
    
    var style = this.element.style;
    if((!this.options.constraint) || (this.options.constraint=='horizontal')) {
      style.left = p[0] + "px";
	}
    if((!this.options.constraint) || (this.options.constraint=='vertical')) {
      style.top  = p[1] + "px";
	}
    if(style.visibility=="hidden") {style.visibility = "";} // fix gecko rendering
  }
};

/*--------------------------------------------------------------------------*/

var SortableObserver = Class.create();
SortableObserver.prototype = {
  initialize: function(element, observer) {
    this.element   = $(element);
    this.observer  = observer;
    this.lastValue = Sortable.serialize(this.element);
  },
  
  onStart: function() {
    this.lastValue = Sortable.serialize(this.element);
  },
  
  //onEnd: function() {
  onEnd: function(eventName, drag, event) {	// Todd Lee
    Sortable.unmark();
    Sortable.untarget(drag);	// Todd Lee
	
    if(this.lastValue != Sortable.serialize(this.element)) {
      this.observer(this.element);
	}
  }
};

var Sortable = {
  sortables: new Array(),
  
  options: function(element){
    element = $(element);
    return this.sortables.detect(function(s) { return s.element == element; });
  },
  
  destroy: function(element){
    element = $(element);
    this.sortables.findAll(function(s) { return s.element == element; }).each(function(s){
      Draggables.removeObserver(s.element);
      //s.droppables.each(function(d){ Droppables.remove(d) });	// Todd Lee 2006-11-10 if remove them, dragging mod over tab will be error.
      s.draggables.invoke('destroy');
    });
    this.sortables = this.sortables.reject(function(s) { return s.element == element; });
  },
  
  create: function(element) {
	  
	// Todd Lee 2006-08-16 speed test
	/*if (App.Permit.ableLog) {
		Log._t_sortableCreate = new Date().getTime();
		$LT('Sortable.create');
	}*/
	// speed test end
	
	
    element = $(element);
    var options = Object.extend({ 
      element:     element,
      tag:         'li',       // assumes li children, override with tag: 'tagname'
      dropOnEmpty: false,
      tree:        false,      // fixme: unimplemented
      overlap:     'vertical', // one of 'vertical', 'horizontal'
      constraint:  'vertical', // one of 'vertical', 'horizontal', false
      containment: element,    // also takes array of elements (or id's); or false
      handle:      false,      // or a CSS class
	  handleTag:   false,	// Todd Lee 2006-08-17 the handle's tagName
      only:        false,
      hoverclass:  null,
      ghosting:    false,
	  targeting:   false,	// Todd Lee
	  capture:	   false,	// Todd Lee
      format:      null,
      onChange:    Prototype.emptyFunction,
      onUpdate:    Prototype.emptyFunction
    }, arguments[1] || {});
	
    // clear any old sortable with same element
    this.destroy(element);

    // build options for the draggables
    var options_for_draggable = {
      revert:      true,
      ghosting:    options.ghosting,
      constraint:  options.constraint,
      handle:      options.handle,
	  snap:		   options.snap	// Todd Lee
	};

    if(options.starteffect) {
      options_for_draggable.starteffect = options.starteffect;
	}

    if(options.reverteffect) {
      options_for_draggable.reverteffect = options.reverteffect;
	}
    else {
      if(options.ghosting) { options_for_draggable.reverteffect = function(element) {
          element.style.top  = 0;
          element.style.left = 0;
        };
	  }
	}

    if(options.endeffect) {
      options_for_draggable.endeffect = options.endeffect;
	}

    if(options.zindex) {
      options_for_draggable.zindex = options.zindex;
	}

    // build options for the droppables  
    var options_for_droppable = {
      overlap:     options.overlap,
      containment: options.containment,
      hoverclass:  options.hoverclass,
      onHover:     Sortable.onHover,
	  onDrop:	   Sortable.onDrop,	// Todd Lee
      greedy:      !options.dropOnEmpty,
	  accept:      options.only	// Todd Lee 2006-06-12
    };



	// Todd Lee 2006-08-16 speed test
	/*if (App.Permit.ableLog) {
		Log._t_sortableCreate_clnWS = new Date().getTime();
		$LT('Sortable.create:Element.cleanWhitespace ('+ (Log._t_sortableCreate_clnWS-Log._t_sortableCreate) +')');
	}*/
	// speed test end
	
	
	
    // fix for gecko engine
    //Element.cleanWhitespace(element); 
	// Todd Lee
	if (!Prototype.Browser.IE) {
	//	if (Browser.ua.indexOf('ie')<0) {
		Element.cleanWhitespace(element); 
	}

    options.draggables = [];
    options.droppables = [];

    // make it so

	
    // drop on empty handling
    if(options.dropOnEmpty) {
		
		
		// Todd Lee 2006-08-16 speed test
		/*if (App.Permit.ableLog) {
			Log._t_sortableCreate_optDOE = new Date().getTime();
			$LT('Sortable.create:options.dropOnEmpty ('+ (Log._t_sortableCreate_optDOE-Log._t_sortableCreate) +')');
		}*/
		// speed test end
	
      //Droppables.add(element,
        //{containment: options.containment, onHover: Sortable.onEmptyHover, greedy: false});
			// Todd Lee
			Droppables.add(element, {
				containment:	options.containment, 
				onHover:		Sortable.onEmptyHover, 
				onDrop:			Sortable.onDrop,
				greedy:			false, 
				exclude:		options.exclude, 
				capture:		options.capture,
				accept:			options.only	// Todd Lee 2006-06-12
			});
      options.droppables.push(element);
    }
	
	
	
	// Todd Lee 2006-08-16 speed test
	/*if (App.Permit.ableLog) {
		Log._t_sortableCreate_newDraggable = new Date().getTime();
		$LT('Sortable.create:new Draggable ('+ (Log._t_sortableCreate_newDraggable-Log._t_sortableCreate) +')');
	}*/
	// speed test end
	
	

   /* (this.findElements(element, options) || []).each( function(e) {
      // handles are per-draggable
      var handle = options.handle ? 
        Element.childrenWithClassName(e, options.handle)[0] : e;    
      options.draggables.push(
        new Draggable(e, Object.extend(options_for_draggable, { handle: handle })));
      Droppables.add(e, options_for_droppable);
      options.droppables.push(e);
    });*/
   
   // Todd Lee 2006-08-16
    (this.findElements(element, options) || []).each( function(e) {
      // handles are per-draggable
		var handle = options.handle ? 
			document.getElementsByClassName(options.handle, e, options.handleTag)[0] : e;
			//Element.childrenWithClassName(e, options.handle)[0] : e;    
		options.draggables.push(
			new Draggable(e, Object.extend(options_for_draggable, { handle: handle })));
		Droppables.add(e, options_for_droppable);
		options.droppables.push(e);
    });
	

	/*// Todd Lee: move this block from above to here
    // drop on empty handling
    if(options.dropOnEmpty) {
      //Droppables.add(element,
        //{containment: options.containment, onHover: Sortable.onEmptyHover, greedy: false});
			// Todd Lee
			Droppables.add(element, {
				containment:	options.containment, 
				onHover:		Sortable.onEmptyHover, 
				onDrop:			Sortable.onDrop,
				//greedy:			false, 
				exclude:		options.exclude, 
				capture:		options.capture
			});
      options.droppables.push(element);
    }*/

    // keep reference
    this.sortables.push(options);
	
	

	// Todd Lee 2006-08-16 speed test
	/*if (App.Permit.ableLog) {
		Log._t_sortableCreate_dragAddObs = new Date().getTime();
		$LT('Sortable.create:Draggables.addObserver ('+ (Log._t_sortableCreate_dragAddObs-Log._t_sortableCreate) +')');
	}*/
	// speed test end
	
	
    // for onupdate
    Draggables.addObserver(new SortableObserver(element, options.onUpdate));

	// Todd Lee 2006-08-16 speed test
	/*if (App.Permit.ableLog) {
		Log._t_sortableCreateEnd = new Date().getTime();
		$LT('Sortable.create end ('+ (Log._t_sortableCreateEnd-Log._t_sortableCreate) +')');
	}*/
	// speed test end
  },

  // return all suitable-for-sortable elements in a guaranteed order
  findElements: function(element, options) {
    if(!element.hasChildNodes()) {return null;}
    var elements = [];
    $A(element.childNodes).each( function(e) {
      if(e.tagName && e.tagName.toUpperCase()==options.tag.toUpperCase() &&
        (!options.only || (Element.hasClassName(e, options.only)))) {
          elements.push(e);
	  }
      if(options.tree) {
        var grandchildren = this.findElements(e, options);
        if(grandchildren) elements.push(grandchildren);
      }
    });

    return (elements.length>0 ? elements.flatten() : null);
  },

  //onHover: function(element, dropon, overlap) {
  onHover: function(drag, dropon, overlap) {	// Todd Lee
  
		var element = Sortable.target(drag, dropon.parentNode) || drag.element;	// Todd Lee
		// Todd Lee
		//if(element.parentNode!=dropon)
			//Position.relativize(element);
		
		//if(overlap>0.5) {
		if(overlap>0.5 && !Sortable.options(element.parentNode).capture) {	// Todd Lee
      //Sortable.mark(dropon, 'before');
      if(dropon.previousSibling != element) {
				var oldParentNode = element.parentNode;
				//element.style.visibility = "hidden"; // fix gecko rendering
				dropon.parentNode.insertBefore(element, dropon);
				//element.style.visibility = "hidden"; // fix gecko rendering	// Todd Lee
				if(dropon.parentNode!=oldParentNode) {
				  Sortable.options(oldParentNode).onChange(element);
				}
				Sortable.options(dropon.parentNode).onChange(element);
      }
      Sortable.mark(element, dropon, 'before');	// Todd Lee
    } else {
      //Sortable.mark(dropon, 'after');
      var nextElement = dropon.nextSibling || null;
      if(nextElement != element) {
				if (!Sortable._targeter || nextElement != Sortable._targeter) {	// Todd Lee
					var oldParentNode = element.parentNode;
					//element.style.visibility = "hidden"; // fix gecko rendering
					dropon.parentNode.insertBefore(element, nextElement);
					//element.style.visibility = "hidden"; // fix gecko rendering	// Todd Lee
					if(dropon.parentNode!=oldParentNode) {
					  Sortable.options(oldParentNode).onChange(element);
					}
					Sortable.options(dropon.parentNode).onChange(element);
				}	// Todd Lee
      }
      Sortable.mark(element, dropon, 'after');	// Todd Lee
    }
	//Sortable.target(element, dropon);	// Todd Lee
  },

  //onEmptyHover: function(element, dropon) {
  onEmptyHover: function(drag, dropon) {	// Todd Lee
  
	var element = Sortable.target(drag, dropon) || drag.element;	// Todd Lee
	
	
    if(element.parentNode!=dropon) {
    //if(element.parentNode!=dropon || Sortable.options(dropon).capture) {	// Todd Lee
			
      var oldParentNode = element.parentNode;
	  if (dropon.parentNode.childNodes[dropon.parentNode.childNodes.length-1] != element) {		// Todd Lee
		  dropon.appendChild(element);
	  }
		
		// Todd Lee
		if (Sortable.options(dropon).ghosting) {
			Sortable.mark(element, dropon, 'after');
		}
			
	  //element.style.visibility = "hidden"; // Todd Lee
	  if (Sortable.options(oldParentNode)) {	// Todd Lee
		  Sortable.options(oldParentNode).onChange(element);
	  }
      Sortable.options(dropon).onChange(element);
	  
    }
	
	// Todd Lee
	//if (Browser.ua != 'opera')
		//Sortable.target(element, dropon);
  },
  
	// Todd Lee
	onDrop: function(drag, dropon, event) {
		drag.hasDrop = null;
		var _dropon = Sortable.options(dropon)? dropon : (Sortable.options(dropon.parentNode)? dropon.parentNode : null);
		if (_dropon) {
			if (Sortable._targeter) {
				Sortable._targeter.parentNode.insertBefore(drag.element, Sortable._targeter);
				if (typeof drag.element._originalWidth == 'undefined' || typeof drag.element._originalHeight == 'undefined') {
					drag.element._originalWidth = '';
					drag.element._originalHeight = '';
				}
			}
			if (Sortable.options(_dropon).capture) {
				drag.hasDrop = _dropon;
				
				// register resizable
				if (typeof(App) != "undefined" && App.Modules) {
					App.Modules.registerResizable(App.Modules.getObjByElement(drag.element));
					App.Modules.getObjByElement(drag.element).setFloat();
				}
			}
			else {
				drag.delta = [0,0];
				Position.relativize(drag.element);
				
				// unregister resizable
				if (typeof(App) != "undefined" && App.Modules) {
					App.Modules.unregisterResizable(App.Modules.getObjByElement(drag.element));
				}
			}
			// update modules order
			//App.UserModules.updateUserModulseOrder();
		}
	},
  

  unmark: function() {
    if(Sortable._marker) {Element.hide(Sortable._marker);}
  },
  
  /*mark: function(dropon, position) {
    // mark on ghosting only
    var sortable = Sortable.options(dropon.parentNode);
    //if(sortable && !sortable.ghosting) return;
    if(sortable && !sortable.ghosting) return;	// Todd Lee

    if(!Sortable._marker) {
      Sortable._marker = $('dropmarker') || document.createElement('DIV');
      Element.hide(Sortable._marker);
      Element.addClassName(Sortable._marker, 'dropmarker');
      Sortable._marker.style.position = 'absolute';
      document.getElementsByTagName("body").item(0).appendChild(Sortable._marker);
    }    
    var offsets = Position.cumulativeOffset(dropon);
    Sortable._marker.style.left = offsets[0] + 'px';
    Sortable._marker.style.top = offsets[1] + 'px';
    
    if(position=='after') {
      if(sortable.overlap == 'horizontal') 
        Sortable._marker.style.left = (offsets[0]+dropon.clientWidth) + 'px';
      else {
        Sortable._marker.style.top = (offsets[1]+dropon.clientHeight) + 'px';
	  }
	}
		// Todd Lee
		if(sortable.overlap == 'horizontal') {
			Sortable._marker.style.width = 'auto';
			Sortable._marker.style.height = dropon.clientHeight + 'px';
		}
		else {
			Sortable._marker.style.width = dropon.clientWidth + 'px';
			Sortable._marker.style.height = 'auto';
		}
    
    Element.show(Sortable._marker);
  },*/
  
  // Todd Lee
  mark: function(element, dropon, position) {
    // mark on ghosting only
    var sortable = Sortable.options(dropon.parentNode);
    //if(sortable && !sortable.ghosting) return;
    if(sortable && !sortable.ghosting) {return;}	// Todd Lee

    if(!Sortable._marker) {
      Sortable._marker = $('dropmarker') || document.createElement(element.tagName);
      Element.hide(Sortable._marker);
      Element.addClassName(Sortable._marker, 'dropmarker');
	  Element.makePositioned(Sortable._marker);
    }  
	//Sortable._marker.style.position = 'relative';
    dropon.parentNode.insertBefore(Sortable._marker, dropon);
    if(position=='after') {
		dropon.parentNode.insertBefore(Sortable._marker, dropon.nextSibling);
	}
    Element.show(Sortable._marker);
	//Position.absolutize(Sortable._marker);
  },
  
	// Todd Lee
	target: function(drag, dropon) {
		// target on targeting only
		var sortable = Sortable.options(dropon);
		if(sortable && sortable.ghosting) {return;}
		//if(sortable && !sortable.targeting) return;
		
		var element = drag.element;
		if(!Sortable._targeter) {
			//Sortable._targeter = element.cloneNode(true);	// 2006-07-06 do not clone element for music box's id problem
			//Sortable._targeter.id = '';	// 2006-07-06 do not clone element for music box's id problem
			Sortable._targeter = document.createElement(element.tagName);	// 2006-07-06 do not clone element for music box's id problem
			Sortable._targeter.style.visibility = 'hidden';
			//Sortable._targeter.id = drag.element.id + '_targeter';
			element.parentNode.insertBefore(Sortable._targeter, element);
			Position.absolutize(drag.element);
		}
		
		if(sortable && sortable.targeting) {
			//Sortable._targeter._originalWidth = element._originalWidth || '';
			//Sortable._targeter._originalHeight = element._originalHeight || '';
			Sortable._targeter.style.left = '0px';
			Sortable._targeter.style.top = '0px';
			Sortable._targeter.style.margin = Element.getStyle(element, 'margin');	// 2006-07-06 do not clone element for music box's id problem
			Sortable._targeter.style.width = element._originalWidth || '';
			//Sortable._targeter.style.height = element._originalHeight || '';	// 2006-07-06 do not clone element for music box's id problem
			Sortable._targeter.style.height = ( element._originalHeight? element._originalHeight : (element.offsetHeight? (element.offsetHeight+'px') : '') );	// 2006-07-06 do not clone element for music box's id problem
			Sortable._targeter.style.position = 'relative';
			
			//Position.relativize(Sortable._targeter);
			this.targetMark();
		}
		else {
			this.unTargetMark();
		}
		return Sortable._targeter;
	},
	untarget: function(drag) {
		if (Sortable._targeter) {
			Element.remove(Sortable._targeter);
			Sortable._targeter = null;
			this.unTargetMark();
		}
	},
	targetMark: function() {
		if (!Sortable._tageterMarker) {
			Sortable._tageterMarker = document.createElement(Sortable._targeter.tagName);
			Element.addClassName(Sortable._tageterMarker, 'targeter');
			Sortable._tageterMarker.style.position = 'absolute';
			document.body.appendChild(Sortable._tageterMarker);
		}
		Sortable._tageterMarker.style.left = Position.cumulativeOffset(Sortable._targeter)[0] +'px';
		Sortable._tageterMarker.style.top = Position.cumulativeOffset(Sortable._targeter)[1] +'px';
		var disW = parseInt(Element.getStyle(Sortable._targeter, 'margin-left')) || parseInt(Element.getStyle(Sortable._targeter, 'margin-right'));
		var disH = parseInt(Element.getStyle(Sortable._targeter, 'margin-top')) || parseInt(Element.getStyle(Sortable._targeter, 'margin-bottom'));
		Sortable._tageterMarker.style.width = Sortable._targeter.offsetWidth - (disW || 0)  +'px';
		Sortable._tageterMarker.style.height = Sortable._targeter.offsetHeight - (disH || 0) +'px';
	},
	unTargetMark: function() {
		if (Sortable._tageterMarker) {
			Element.remove(Sortable._tageterMarker);
			Sortable._tageterMarker = null;
		}
	},

  serialize: function(element) {
    element = $(element);
    var sortableOptions = this.options(element);
    var options = Object.extend({
      tag:  sortableOptions.tag,
      only: sortableOptions.only,
      name: element.id,
      format: sortableOptions.format || /^[^_]*_(.*)$/
    }, arguments[1] || {});
    return $(this.findElements(element, options) || []).map( function(item) {
      return (encodeURIComponent(options.name) + "[]=" + 
              encodeURIComponent(item.id.match(options.format) ? item.id.match(options.format)[1] : ''));
    }).join("&");
  }
};