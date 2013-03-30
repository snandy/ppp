/******* Core Js **********/
//	Based on prototypes (prototype.conio.net)
//	Modifid by Todd Lee (www.todd-lee.com)
//	Last Update: 2008-01-08
//	Copyright: Sohu.com (www.sohu.com)
/**************************/

var Prototype = {
  Version: '1.5.0_rc0',
  ScriptFragment: '(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)',

  emptyFunction: function() {},
  K: function(x) {return x;}
};

var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    };
  }
};

var Abstract = new Object();

Object.extend = function(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }
  return destination;
};

Object.inspect = function(object) {
  try {
    if (object == undefined) {return 'undefined';}
    if (object == null) {return 'null';}
    return object.inspect ? object.inspect() : object.toString();
  } catch (e) {
    if (e instanceof RangeError) {return '...';}
    throw e;
  }
};

Function.prototype.bind = function() {
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat($A(arguments)));
  };
};

Function.prototype.bindAsEventListener = function(object) {
  var __method = this;
  return function(event) {
    return __method.call(object, event || window.event);
  };
};

Object.extend(Number.prototype, {
  toColorPart: function() {
    var digits = this.toString(16);
    if (this < 16) {return '0' + digits;}
    return digits;
  },

  succ: function() {
    return this + 1;
  },

  times: function(iterator) {
    $R(0, this, true).each(iterator);
    return this;
  }
});

var Try = {
  these: function() {
    var returnValue;

    for (var i = 0; i < arguments.length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) {}
    }

    return returnValue;
  }
};

/*--------------------------------------------------------------------------*/

var PeriodicalExecuter = Class.create();
PeriodicalExecuter.prototype = {
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.callback();
      } finally {
        this.currentlyExecuting = false;
      }
    }
  }
};
Object.extend(String.prototype, {
  gsub: function(pattern, replacement) {
    var result = '', source = this, match;
    replacement = arguments.callee.prepareReplacement(replacement);

    while (source.length > 0) {
      if (source.match(pattern)) {
		match = source.match(pattern);
        result += source.slice(0, match.index);
        result += (replacement(match) || '').toString();
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source;
		source = '';
      }
    }
    return result;
  },

  sub: function(pattern, replacement, count) {
    replacement = this.gsub.prepareReplacement(replacement);
    count = count === undefined ? 1 : count;

    return this.gsub(pattern, function(match) {
      if (--count < 0) {return match[0];}
      return replacement(match);
    });
  },

  scan: function(pattern, iterator) {
    this.gsub(pattern, iterator);
    return this;
  },

  truncate: function(length, truncation) {
    length = length || 30;
    truncation = truncation === undefined ? '...' : truncation;
    return this.length > length ?
      this.slice(0, length - truncation.length) + truncation : this;
  },

  strip: function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  },

  stripTags: function() {
    return this.replace(/<\/?[^>]+>/gi, '');
  },

  stripScripts: function() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  },

  extractScripts: function() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img');
    var matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  },

  evalScripts: function() {
    return this.extractScripts().map(function(script) { return eval(script); });
  },

  escapeHTML: function() {
    var div = document.createElement('div');
    var text = document.createTextNode(this);
    div.appendChild(text);
    return div.innerHTML;
  },

  unescapeHTML: function() {
    var div = document.createElement('div');
    div.innerHTML = this.stripTags();
    return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
  },

  	// Todd Lee
	convertTextToHTML: function() {
		return (this.replace(/\&/g, "&").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r\n|\n|\r/g, "<br \/>").replace(/  /g, "&nbsp; "));
	},
	convertHTMLToText: function() {
		return (this.replace(/(\s*(\r\n|\n|\r)\s*)/g, "").replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/<br\s*\/?>/ig,"\r\n").replace(/\&nbsp;/g, " "));
	},
	trim: function() { 
		return (this.replace(/(^\s*)|(\s*$)/g, ""));
	},
	
  toQueryParams: function() {
    var pairs = this.match(/^\??(.*)$/)[1].split('&');
    return pairs.inject({}, function(params, pairString) {
      var pair = pairString.split('=');
      params[pair[0]] = pair[1];
      return params;
    });
  },

  toArray: function() {
    return this.split('');
  },

  camelize: function() {
    var oStringList = this.split('-');
    if (oStringList.length == 1) {return oStringList[0];}

    var camelizedString = this.indexOf('-') == 0
      ? oStringList[0].charAt(0).toUpperCase() + oStringList[0].substring(1)
      : oStringList[0];

    for (var i = 1, len = oStringList.length; i < len; i++) {
      var s = oStringList[i];
      camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
    }

    return camelizedString;
  },

  inspect: function() {
    return "'" + this.replace(/\\/g, '\\\\').replace(/'/g, '\\\'') + "'";
  }
});

String.prototype.gsub.prepareReplacement = function(replacement) {
  if (typeof replacement == 'function') {return replacement;}
  var template = new Template(replacement);
  return function(match) { return template.evaluate(match); };
};

String.prototype.parseQuery = String.prototype.toQueryParams;

var Template = Class.create();
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
Template.prototype = {
  initialize: function(template, pattern) {
    this.template = template.toString();
    this.pattern  = pattern || Template.Pattern;
  },

  evaluate: function(object) {
    return this.template.gsub(this.pattern, function(match) {
      var before = match[1];
      if (before == '\\') {return match[2];}
      return before + (object[match[3]] || '').toString();
    });
  }
};

var $break    = new Object();
var $continue = new Object();

var Enumerable = {
  each: function(iterator) {
    var index = 0;
    try {
      this._each(function(value) {
        try {
          iterator(value, index++);
        } catch (e) {
          if (e != $continue) {throw e;}
        }
      });
    } catch (e) {
      if (e != $break) {throw e;}
    }
  },

  all: function(iterator) {
    var result = true;
    this.each(function(value, index) {
      result = result && !!(iterator || Prototype.K)(value, index);
      if (!result) {throw $break;}
    });
    return result;
  },

  any: function(iterator) {
    //var result = true;
	var result = false;	// Todd Lee
    this.each(function(value, index) {
      if (!!(iterator || Prototype.K)(value, index)) {
		result = !!(iterator || Prototype.K)(value, index);
        throw $break;
	  }
    });
    return result;
  },

  collect: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      results.push(iterator(value, index));
    });
    return results;
  },

  detect: function (iterator) {
    var result;
    this.each(function(value, index) {
      if (iterator(value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  },

  findAll: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      if (iterator(value, index)) {
        results.push(value);
	  }
    });
    return results;
  },

  grep: function(pattern, iterator) {
    var results = [];
    this.each(function(value, index) {
      var stringValue = value.toString();
      if (stringValue.match(pattern)) {
        results.push((iterator || Prototype.K)(value, index));
	  }
    });
    return results;
  },

  include: function(object) {
    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  },

  inject: function(memo, iterator) {
    this.each(function(value, index) {
      memo = iterator(memo, value, index);
    });
    return memo;
  },

  invoke: function(method) {
    var args = $A(arguments).slice(1);
    return this.collect(function(value) {
      return value[method].apply(value, args);
    });
  },

  max: function(iterator) {
    var result;
    this.each(function(value, index) {
      value = (iterator || Prototype.K)(value, index);
      if (result == undefined || value >= result) {
        result = value;
	  }
    });
    return result;
  },

  min: function(iterator) {
    var result;
    this.each(function(value, index) {
      value = (iterator || Prototype.K)(value, index);
      if (result == undefined || value < result) {
        result = value;
	  }
    });
    return result;
  },

  partition: function(iterator) {
    var trues = [], falses = [];
    this.each(function(value, index) {
      ((iterator || Prototype.K)(value, index) ?
        trues : falses).push(value);
    });
    return [trues, falses];
  },

  pluck: function(property) {
    var results = [];
    this.each(function(value, index) {
      results.push(value[property]);
    });
    return results;
  },

  reject: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      if (!iterator(value, index)) {
        results.push(value);
	  }
    });
    return results;
  },

  sortBy: function(iterator) {
    return this.collect(function(value, index) {
      return {value: value, criteria: iterator(value, index)};
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  },

  toArray: function() {
    return this.collect(Prototype.K);
  },

  zip: function() {
    var iterator = Prototype.K, args = $A(arguments);
    if (typeof args.last() == 'function') {
      iterator = args.pop();
	}

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      return iterator(collections.pluck(index));
    });
  },

  inspect: function() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }
};

Object.extend(Enumerable, {
  map:     Enumerable.collect,
  find:    Enumerable.detect,
  select:  Enumerable.findAll,
  member:  Enumerable.include,
  entries: Enumerable.toArray
});
Array.from = function(iterable) {
  if (!iterable) {return [];}
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
	var l = iterable.length;
    for (var i = 0; i < l; i++) {
      results.push(iterable[i]);
	}
    return results;
  }
};
var $A = Array.from;

Object.extend(Array.prototype, Enumerable);

if (!Array.prototype._reverse) {
  Array.prototype._reverse = Array.prototype.reverse;
}

Object.extend(Array.prototype, {
  _each: function(iterator) {
	var l = this.length;
    for (var i = 0; i < l; i++) {
      iterator(this[i]);
	}
  },

  clear: function() {
    this.length = 0;
    return this;
  },

  first: function() {
    return this[0];
  },

  last: function() {
    return this[this.length - 1];
  },

  compact: function() {
    return this.select(function(value) {
      return value != undefined || value != null;
    });
  },

  flatten: function() {
    return this.inject([], function(array, value) {
      return array.concat(value && value.constructor == Array ?
        value.flatten() : [value]);
    });
  },

  without: function() {
    var values = $A(arguments);
    return this.select(function(value) {
      return !values.include(value);
    });
  },

  indexOf: function(object) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == object) {return i;}
	}
    return -1;
  },

  reverse: function(inline) {
    return (inline !== false ? this : this.toArray())._reverse();
  },

  inspect: function() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  }
});
var Hash = {
  _each: function(iterator) {
    for (var key in this) {
      var value = this[key];
      if (typeof value == 'function') {continue;}

      var pair = [key, value];
      pair.key = key;
      pair.value = value;
      iterator(pair);
    }
  },

  keys: function() {
    return this.pluck('key');
  },

  values: function() {
    return this.pluck('value');
  },

  merge: function(hash) {
    return $H(hash).inject($H(this), function(mergedHash, pair) {
      mergedHash[pair.key] = pair.value;
      return mergedHash;
    });
  },

  toQueryString: function() {
    return this.map(function(pair) {
      return pair.map(encodeURIComponent).join('=');
    }).join('&');
  },

  inspect: function() {
    return '#<Hash:{' + this.map(function(pair) {
      return pair.map(Object.inspect).join(': ');
    }).join(', ') + '}>';
  }
};

function $H(object) {
  var hash = Object.extend({}, object || {});
  Object.extend(hash, Enumerable);
  Object.extend(hash, Hash);
  return hash;
}
ObjectRange = Class.create();
Object.extend(ObjectRange.prototype, Enumerable);
Object.extend(ObjectRange.prototype, {
  initialize: function(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  },

  _each: function(iterator) {
    var value = this.start;
    do {
      iterator(value);
      value = value.succ();
    } while (this.include(value));
  },

  include: function(value) {
    if (value < this.start) {return false;}
    if (this.exclusive) {
      return value < this.end;
	}
    return value <= this.end;
  }
});

var $R = function(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
};

var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new XMLHttpRequest();},
      function() {return new ActiveXObject('Msxml2.XMLHTTP');},
      function() {return new ActiveXObject('Microsoft.XMLHTTP');}
    ) || false;
  },

  activeRequestCount: 0
};

Ajax.Responders = {
  responders: [],

  _each: function(iterator) {
    this.responders._each(iterator);
  },

  register: function(responderToAdd) {
    if (!this.include(responderToAdd)) {
      this.responders.push(responderToAdd);
	}
  },

  unregister: function(responderToRemove) {
    this.responders = this.responders.without(responderToRemove);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (responder[callback] && typeof responder[callback] == 'function') {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) {}
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate: function() {
    Ajax.activeRequestCount++;
  },

  onComplete: function() {
    Ajax.activeRequestCount--;
  }
});

Ajax.Base = function() {};
Ajax.Base.prototype = {
  setOptions: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      contentType:  'application/x-www-form-urlencoded',
      parameters:   ''
    };
    Object.extend(this.options, options || {});
  },

  responseIsSuccess: function() {
    return this.transport.status == undefined
        || this.transport.status == 0
        || (this.transport.status >= 200 && this.transport.status < 300);
  },

  responseIsFailure: function() {
    return !this.responseIsSuccess();
  }
};

Ajax.Request = Class.create();
Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];

Ajax.Request.prototype = Object.extend(new Ajax.Base(), {
  initialize: function(url, options) {
    this.transport = Ajax.getTransport();
    this.setOptions(options);
    this.request(url);
  },

  request: function(url) {
    var parameters = this.options.parameters || '';
    if (parameters.length > 0) {parameters += '&_=';}

    try {
      this.url = url;
      if (this.options.method == 'get' && parameters.length > 0) {
        this.url += (this.url.match(/\?/) ? '&' : '?') + parameters;
	  }

      Ajax.Responders.dispatch('onCreate', this, this.transport);

      this.transport.open(this.options.method, this.url,
        this.options.asynchronous);

      if (this.options.asynchronous) {
        this.transport.onreadystatechange = this.onStateChange.bind(this);
        setTimeout((function() {this.respondToReadyState(1);}).bind(this), 10);
      }

      this.setRequestHeaders();

      var body = this.options.postBody ? this.options.postBody : parameters;
      this.transport.send(this.options.method == 'post' ? body : null);

    } catch (e) {
      this.dispatchException(e);
    }
  },

  setRequestHeaders: function() {
    var requestHeaders =
      ['X-Requested-With', 'XMLHttpRequest',
       'X-Prototype-Version', Prototype.Version,
       'Accept', 'text/javascript, text/html, application/xml, text/xml, */*'];

    if (this.options.method == 'post') {
      requestHeaders.push('Content-type', this.options.contentType);

      /* Force "Connection: close" for Mozilla browsers to work around
       * a bug where XMLHttpReqeuest sends an incorrect Content-length
       * header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType) {
        requestHeaders.push('Connection', 'close');
	  }
    }

    if (this.options.requestHeaders) {
      requestHeaders.push.apply(requestHeaders, this.options.requestHeaders);
	}

    for (var i = 0; i < requestHeaders.length; i += 2) {
      this.transport.setRequestHeader(requestHeaders[i], requestHeaders[i+1]);
	}
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState != 1) {
      this.respondToReadyState(this.transport.readyState);
	}
  },

  header: function(name) {
    try {
      return this.transport.getResponseHeader(name);
    } catch (e) {}
  },

  evalJSON: function() {
    try {
      return eval('(' + this.header('X-JSON') + ')');
    } catch (e) {}
  },

  evalResponse: function() {
    try {
      return eval(this.transport.responseText);
    } catch (e) {
      this.dispatchException(e);
    }
  },

  respondToReadyState: function(readyState) {
    var event = Ajax.Request.Events[readyState];
    var transport = this.transport, json = this.evalJSON();
	var data = this.options.data;	// Todd Lee

    if (event == 'Complete') {
      try {
        (this.options['on' + this.transport.status]
         || this.options['on' + (this.responseIsSuccess() ? 'Success' : 'Failure')]
         //|| Prototype.emptyFunction)(transport, json);
         || Prototype.emptyFunction)(transport, json, data);	// Todd Lee
      } catch (e) {
        this.dispatchException(e);
      }

      if ((this.header('Content-type') || '').match(/^text\/javascript/i)) {
        this.evalResponse();
	  }
    }

    try {
      //(this.options['on' + event] || Prototype.emptyFunction)(transport, json);
      (this.options['on' + event] || Prototype.emptyFunction)(transport, json, data);	// Todd Lee
      Ajax.Responders.dispatch('on' + event, this, transport, json);
    } catch (e) {
      this.dispatchException(e);
    }

    /* Avoid memory leak in MSIE: clean up the oncomplete event handler */
    if (event == 'Complete') {
      this.transport.onreadystatechange = Prototype.emptyFunction;
	}
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Updater = Class.create();

Object.extend(Object.extend(Ajax.Updater.prototype, Ajax.Request.prototype), {
  initialize: function(container, url, options) {
    this.containers = {
      success: container.success ? $(container.success) : $(container),
      failure: container.failure ? $(container.failure) :
        (container.success ? null : $(container))
    };

    this.transport = Ajax.getTransport();
    this.setOptions(options);

    var onComplete = this.options.onComplete || Prototype.emptyFunction;
    this.options.onComplete = (function(transport, object) {
      this.updateContent();
      onComplete(transport, object);
    }).bind(this);

    this.request(url);
  },

  updateContent: function() {
    var receiver = this.responseIsSuccess() ?
      this.containers.success : this.containers.failure;
    var response = this.transport.responseText;

    if (!this.options.evalScripts) {
      response = response.stripScripts();
	}

    if (receiver) {
      if (this.options.insertion) {
        new this.options.insertion(receiver, response);
      } else {
        Element.update(receiver, response);
      }
    }

    if (this.responseIsSuccess()) {
      if (this.onComplete) {
        setTimeout(this.onComplete.bind(this), 10);
	  }
    }
  }
});

Ajax.PeriodicalUpdater = Class.create();
Ajax.PeriodicalUpdater.prototype = Object.extend(new Ajax.Base(), {
  initialize: function(container, url, options) {
    this.setOptions(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = {};
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(request) {
    if (this.options.decay) {
      this.decay = (request.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = request.responseText;
    }
    this.timer = setTimeout(this.onTimerEvent.bind(this),
      this.decay * this.frequency * 1000);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});
function $() {
  var results = [], element;
  for (var i = 0; i < arguments.length; i++) {
    element = arguments[i];
    if (typeof element == 'string') {
      element = document.getElementById(element);
	}
	  
	// results.push(Element.extend(element));
		// Todd Lee
		try{
			results.push(Element.extend(element));
		}catch(e){
			results.push(element);
		}
  }
  return results.length < 2 ? results[0] : results;
}

/*document.getElementsByClassName = function(className, parentElement) {
  var children = ($(parentElement) || document.body).getElementsByTagName('*');
  return $A(children).inject([], function(elements, child) {
    if (child.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))) {
      elements.push(Element.extend(child));
	}
    return elements;
  });
};*/
document.getElementsByClassName = function(className, parentElement, tagName) {
  var children = ($(parentElement) || document.body).getElementsByTagName(tagName || '*');
  return $A(children).inject([], function(elements, child) {
    if (child.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))) {
      elements.push(Element.extend(child));
	}
    return elements;
  });
};

/*--------------------------------------------------------------------------*/


if (!window.Element) {
  var Element = new Object();
}

Element.extend = function(element) {
  //if (!element) return;
  if (!element) {return null;}	// Todd Lee
  if (_nativeExtensions) {return element;}

  if (!element._extended && element.tagName && element != window) {
    var methods = Element.Methods, cache = Element.extend.cache;
    for (property in methods) {
      var value = methods[property];
      if (typeof value == 'function') {
        element[property] = cache.findOrStore(value);
	  }
    }
  }

  element._extended = true;
  return element;
};

Element.extend.cache = {
  findOrStore: function(value) {
    this[value] = this[value] || function() {
      return value.apply(null, [this].concat($A(arguments)));
    };
	return this[value];
  }
};

Element.Methods = {
  visible: function(element) {
    return $(element).style.display != 'none';
  },

  toggle: function() {
    for (var i = 0; i < arguments.length; i++) {
      var element = $(arguments[i]);
      Element[Element.visible(element) ? 'hide' : 'show'](element);
    }
  },

  hide: function() {
    for (var i = 0; i < arguments.length; i++) {
      var element = $(arguments[i]);
      element.style.display = 'none';
    }
  },

  show: function() {
    for (var i = 0; i < arguments.length; i++) {
      var element = $(arguments[i]);
      element.style.display = '';
    }
  },

  remove: function(element) {
    element = $(element);
    element.parentNode.removeChild(element);
  },

  update: function(element, html) {
    $(element).innerHTML = html.stripScripts();
    setTimeout(function() {html.evalScripts();}, 10);
  },

  replace: function(element, html) {
    element = $(element);
    if (element.outerHTML) {
      element.outerHTML = html.stripScripts();
    } else {
      var range = element.ownerDocument.createRange();
      range.selectNodeContents(element);
      element.parentNode.replaceChild(
        range.createContextualFragment(html.stripScripts()), element);
    }
    setTimeout(function() {html.evalScripts();}, 10);
  },

	// Todd Lee
	getWidth: function(element) { 
		element = $(element); 
		return element.offsetWidth; 
	},
	
  getHeight: function(element) {
    element = $(element);
    return element.offsetHeight;
  },

  classNames: function(element) {
    return new Element.ClassNames(element);
  },

  hasClassName: function(element, className) {
    if (!(element = $(element))) {return;}
    return Element.classNames(element).include(className);
  },

  addClassName: function(element, className) {
    if (!(element = $(element))) {return;}
    return Element.classNames(element).add(className);
  },

  removeClassName: function(element, className) {
    if (!(element = $(element))) {return;}
    return Element.classNames(element).remove(className);
  },

  	// Todd Lee
	swapClassName: function(element) {
		element = $(element); 
		for (var i = 1; i < arguments.length; i++) {
			if (element.className == arguments[i]) {
				element.className = (i == arguments.length - 1 ? arguments[1] : arguments[i+1]);
				break;
			}
		}
	},
	getParentElementByTagName: function(element, tagName) {
		element = $(element); 
		while (element.tagName != tagName) {
			element = element.parentNode;
		}
		return element;
	},
	getChildElementByTagName: function(element, tagName) {
		element = $(element);
		var ln = element.childNodes.length;
		var arr = [];	
		for (var i=0; i<ln; i++) {
			if (element.childNodes[i].nodeName.toLowerCase() == tagName) {arr.push(element.childNodes[i]);}
		}
		return arr;
	},
	getParentElementByClassName: function(element, _className) {
		element = $(element); 
		while (element.className != _className) {
			element = element.parentNode;
		}
		return element;
	},
	getChildValueByTagName: function(element, tagName) {
		element = $(element);
		var arr = $A(element.getElementsByTagName(tagName)).map(function(c){
			return (c.firstChild)? ((c.firstChild.nodetype != 1)? c.firstChild.data : null) : '';
		});
		return arr;
	},
	
  // removes whitespace-only text node children
  /*cleanWhitespace: function(element) {
    element = $(element);
    for (var i = 0; i < element.childNodes.length; i++) {
      var node = element.childNodes[i];
      if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        Element.remove(node);
    }
  },*/
	cleanWhitespace: function(element) {
		element = $(element);
		for (var i = 0; i < element.childNodes.length; i++) {
			var node = element.childNodes[i];
			if (node.nodeType == 3 && (!( /\S/.test(node.nodeValue)))) {
				Element.remove(node);
				i--;
			}
			if(node.nodeType == 1) {
				Element.cleanWhitespace(node);
			}
		}
	},

  empty: function(element) {
    return $(element).innerHTML.match(/^\s*$/);
  },

  childOf: function(element, ancestor) {
    element = $(element); ancestor = $(ancestor);
    while (element.parentNode) {
	  element = element.parentNode;
      if (element == ancestor) {return true;}
	}
    return false;
  },

  scrollTo: function(element) {
    element = $(element);
    var x = element.x ? element.x : element.offsetLeft,
        y = element.y ? element.y : element.offsetTop;
    window.scrollTo(x, y);
  },

  getStyle: function(element, style) {
    element = $(element);
    var value = element.style[style.camelize()];
    if (!value) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        var css = document.defaultView.getComputedStyle(element, null);
        value = css ? css.getPropertyValue(style) : null;
      } else if (element.currentStyle) {
        value = element.currentStyle[style.camelize()];
      }
    }

    if (window.opera && ['left', 'top', 'right', 'bottom'].include(style)) {
      if (Element.getStyle(element, 'position') == 'static') {value = 'auto';}
	}

    return value == 'auto' ? null : value;
  },

  setStyle: function(element, style) {
    element = $(element);
    for (var name in style) {
      element.style[name.camelize()] = style[name];
	}
  },

  getDimensions: function(element) {
    element = $(element);
    if (Element.getStyle(element, 'display') != 'none') {
      return {width: element.offsetWidth, height: element.offsetHeight};
	}

    // All *Width and *Height properties give 0 on elements with display none,
    // so enable the element temporarily
    var els = element.style;
    var originalVisibility = els.visibility;
    var originalPosition = els.position;
    els.visibility = 'hidden';
    els.position = 'absolute';
    els.display = '';
    var originalWidth = element.clientWidth;
    var originalHeight = element.clientHeight;
    els.display = 'none';
    els.position = originalPosition;
    els.visibility = originalVisibility;
    return {width: originalWidth, height: originalHeight};
  },

  makePositioned: function(element) {
    element = $(element);
    var pos = Element.getStyle(element, 'position');
    if (pos == 'static' || !pos) {
      element._madePositioned = true;
      element.style.position = 'relative';
      // Opera returns the offset relative to the positioning context, when an
      // element is position relative but top and left have not been defined
      if (window.opera) {
        element.style.top = 0;
        element.style.left = 0;
      }
    }
  },

  undoPositioned: function(element) {
    element = $(element);
    if (element._madePositioned) {
      element._madePositioned = undefined;
      element.style.position =
        element.style.top =
        element.style.left =
        element.style.bottom =
        element.style.right = '';
    }
  },

  makeClipping: function(element) {
    element = $(element);
    if (element._overflow) {return;}
    element._overflow = element.style.overflow;
    if ((Element.getStyle(element, 'overflow') || 'visible') != 'hidden') {
      element.style.overflow = 'hidden';
	}
  },

  undoClipping: function(element) {
    element = $(element);
    if (element._overflow) {return;}
    element.style.overflow = element._overflow;
    element._overflow = undefined;
  }
};

Object.extend(Element, Element.Methods);

var _nativeExtensions = false;

if(!HTMLElement && (/Konqueror|Safari|KHTML/.test(navigator.userAgent))) {
  var HTMLElement = {};
  HTMLElement.prototype = document.createElement('div').__proto__;
}

Element.addMethods = function(methods) {
  Object.extend(Element.Methods, methods || {});

  if(typeof HTMLElement != 'undefined') {
    var methods = Element.Methods, cache = Element.extend.cache;
    for (property in methods) {
      var value = methods[property];
      if (typeof value == 'function') {
        HTMLElement.prototype[property] = cache.findOrStore(value);
	  }
    }
    _nativeExtensions = true;
  }
};

Element.addMethods();

var Toggle = new Object();
Toggle.display = Element.toggle;

/*--------------------------------------------------------------------------*/

Abstract.Insertion = function(adjacency) {
  this.adjacency = adjacency;
};

Abstract.Insertion.prototype = {
  initialize: function(element, content) {
    this.element = $(element);
    this.content = content.stripScripts();

    if (this.adjacency && this.element.insertAdjacentHTML) {
      try {
        this.element.insertAdjacentHTML(this.adjacency, this.content);
      } catch (e) {
        var tagName = this.element.tagName.toLowerCase();
        if (tagName == 'tbody' || tagName == 'tr') {
          this.insertContent(this.contentFromAnonymousTable());
        } else {
          throw e;
        }
      }
    } else {
      this.range = this.element.ownerDocument.createRange();
      if (this.initializeRange) {this.initializeRange();}
      this.insertContent([this.range.createContextualFragment(this.content)]);
    }

    setTimeout(function() {content.evalScripts();}, 10);
  },

  contentFromAnonymousTable: function() {
    var div = document.createElement('div');
    div.innerHTML = '<table><tbody>' + this.content + '</tbody></table>';
    return $A(div.childNodes[0].childNodes[0].childNodes);
  }
};

var Insertion = new Object();

Insertion.Before = Class.create();
Insertion.Before.prototype = Object.extend(new Abstract.Insertion('beforeBegin'), {
  initializeRange: function() {
    this.range.setStartBefore(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.parentNode.insertBefore(fragment, this.element);
    }).bind(this));
  }
});

Insertion.Top = Class.create();
Insertion.Top.prototype = Object.extend(new Abstract.Insertion('afterBegin'), {
  initializeRange: function() {
    this.range.selectNodeContents(this.element);
    this.range.collapse(true);
  },

  insertContent: function(fragments) {
    fragments.reverse(false).each((function(fragment) {
      this.element.insertBefore(fragment, this.element.firstChild);
    }).bind(this));
  }
});

Insertion.Bottom = Class.create();
Insertion.Bottom.prototype = Object.extend(new Abstract.Insertion('beforeEnd'), {
  initializeRange: function() {
    this.range.selectNodeContents(this.element);
    this.range.collapse(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.appendChild(fragment);
    }).bind(this));
  }
});

Insertion.After = Class.create();
Insertion.After.prototype = Object.extend(new Abstract.Insertion('afterEnd'), {
  initializeRange: function() {
    this.range.setStartAfter(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.parentNode.insertBefore(fragment,
        this.element.nextSibling);
    }).bind(this));
  }
});

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) {return;}
    this.set(this.toArray().concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) {return;}
    this.set(this.select(function(className) {
      return className != classNameToRemove;
    }).join(' '));
  },

  toString: function() {
    return this.toArray().join(' ');
  }
};

Object.extend(Element.ClassNames.prototype, Enumerable);
var Selector = Class.create();
Selector.prototype = {
  initialize: function(expression) {
    this.params = {classNames: []};
    this.expression = expression.toString().strip();
    this.parseExpression();
    this.compileMatcher();
  },

  parseExpression: function() {
    function abort(message) { throw 'Parse error in selector: ' + message; }

    if (this.expression == '')  {abort('empty expression');}

    var params = this.params, expr = this.expression, match, modifier, clause, rest;
    while (expr.match(/^(.*)\[([a-z0-9_:-]+?)(?:([~\|!]?=)(?:"([^"]*)"|([^\]\s]*)))?\]$/i)) {
	  match = expr.match(/^(.*)\[([a-z0-9_:-]+?)(?:([~\|!]?=)(?:"([^"]*)"|([^\]\s]*)))?\]$/i);
      params.attributes = params.attributes || [];
      params.attributes.push({name: match[2], operator: match[3], value: match[4] || match[5] || ''});
      expr = match[1];
    }

    if (expr == '*') {
		this.params.wildcard = true;
		return this.params.wildcard;
	}

    while (expr.match(/^([^a-z0-9_-])?([a-z0-9_-]+)(.*)/i)) {
	  match = expr.match(/^([^a-z0-9_-])?([a-z0-9_-]+)(.*)/i);
      modifier = match[1]; clause = match[2]; rest = match[3];
      switch (modifier) {
        case '#':       params.id = clause; break;
        case '.':       params.classNames.push(clause); break;
        case '':
        case undefined: params.tagName = clause.toUpperCase(); break;
        default:        abort(expr.inspect());
      }
      expr = rest;
    }

    if (expr.length > 0) {abort(expr.inspect());}
  },

  buildMatchExpression: function() {
    var params = this.params, conditions = [], clause;

    if (params.wildcard) {
      conditions.push('true');
	}
    if (params.id) {
	  clause = params.id;
      conditions.push('element.id == ' + clause.inspect());
	}
    if (params.tagName) {
	  clause = params.tagName;
      conditions.push('element.tagName.toUpperCase() == ' + clause.inspect());
	}
    if (params.classNames.length > 0) {
	  clause = params.classNames;
      for (var i = 0; i < clause.length; i++) {
        conditions.push('Element.hasClassName(element, ' + clause[i].inspect() + ')');
	  }
	}
    if (params.attributes) {
	  clause = params.attributes;
      clause.each(function(attribute) {
        var value = 'element.getAttribute(' + attribute.name.inspect() + ')';
        var splitValueBy = function(delimiter) {
          return value + ' && ' + value + '.split(' + delimiter.inspect() + ')';
        };

        switch (attribute.operator) {
          case '=':       conditions.push(value + ' == ' + attribute.value.inspect()); break;
          case '~=':      conditions.push(splitValueBy(' ') + '.include(' + attribute.value.inspect() + ')'); break;
          case '|=':      conditions.push(
                            splitValueBy('-') + '.first().toUpperCase() == ' + attribute.value.toUpperCase().inspect()
                          ); break;
          case '!=':      conditions.push(value + ' != ' + attribute.value.inspect()); break;
          case '':
          case undefined: conditions.push(value + ' != null'); break;
          default:        throw 'Unknown operator ' + attribute.operator + ' in selector';
        }
      });
    }

    return conditions.join(' && ');
  },

  compileMatcher: function() {
    this.match = new Function('element', 'if (!element.tagName) return false; return ' + this.buildMatchExpression());
  },

  findElements: function(scope) {
    var element;

    if ($(this.params.id)) {
	  element = $(this.params.id);
      if (this.match(element)) {
        if (!scope || Element.childOf(element, scope)) {
          return [element];
		}
	  }
	}

    scope = (scope || document).getElementsByTagName(this.params.tagName || '*');

    var results = [];
    for (var i = 0; i < scope.length; i++) {
      if (this.match(element = scope[i])) {
        results.push(Element.extend(element));
	  }
	}

    return results;
  },

  toString: function() {
    return this.expression;
  }
};

function $$() {
  return $A(arguments).map(function(expression) {
    return expression.strip().split(/\s+/).inject([null], function(results, expr) {
      var selector = new Selector(expr);
      return results.map(selector.findElements.bind(selector)).flatten();
    });
  }).flatten();
}
var Field = {
  clear: function() {
    for (var i = 0; i < arguments.length; i++) {
      $(arguments[i]).value = '';
	}
  },

  focus: function(element) {
    $(element).focus();
  },

  present: function() {
    for (var i = 0; i < arguments.length; i++) {
      if ($(arguments[i]).value == '') {return false;}
	}
    return true;
  },

  select: function(element) {
    $(element).select();
  },

  activate: function(element) {
    element = $(element);
    element.focus();
    if (element.select) {
      element.select();
	}
  },
  
  	// Todd Lee
	setCursorToEnd: function(element) { 
		try {
			range = element.createTextRange();
			range.collapse(true);
			range.moveStart('character',element.value.length);
			range.select();
		}
		catch(e) {
			element.focus();
		}
	}

};

/*--------------------------------------------------------------------------*/

var Form = {
  serialize: function(form) {
    var elements = Form.getElements($(form));
    var queryComponents = new Array();

    for (var i = 0; i < elements.length; i++) {
      var queryComponent = Form.Element.serialize(elements[i]);
      if (queryComponent) {
        queryComponents.push(queryComponent);
	  }
    }

    return queryComponents.join('&');
  },

  getElements: function(form) {
    form = $(form);
    var elements = new Array();

    for (var tagName in Form.Element.Serializers) {
      var tagElements = form.getElementsByTagName(tagName);
      for (var j = 0; j < tagElements.length; j++) {
        elements.push(tagElements[j]);
	  }
    }
    return elements;
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name) {
      return inputs;
	}

    var matchingInputs = new Array();
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) ||
          (name && input.name != name)) {
        continue;
	  }
      matchingInputs.push(input);
    }

    return matchingInputs;
  },

  disable: function(form) {
    var elements = Form.getElements(form);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.blur();
      element.disabled = 'true';
    }
  },

  enable: function(form) {
    var elements = Form.getElements(form);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.disabled = '';
    }
  },


  findFirstElement: function(form) {
    return Form.getElements(form).find(function(element) {
      return element.type != 'hidden' && !element.disabled &&
        ['input', 'select', 'textarea'].include(element.tagName.toLowerCase());
    });
  },

  focusFirstElement: function(form) {
    Field.activate(Form.findFirstElement(form));
  },

  reset: function(form) {
    $(form).reset();
  }
};

Form.Element = {
  serialize: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    var parameter = Form.Element.Serializers[method](element);

    if (parameter) {
      //var key = encodeURIComponent(parameter[0]);
      var key = escape(parameter[0]);
      if (key.length == 0) {return;}

      if (parameter[1].constructor != Array) {
        parameter[1] = [parameter[1]];
	  }

      return parameter[1].map(function(value) {
        //return key + '=' + encodeURIComponent(value);
        return key + '=' + escape(value);
      }).join('&');
    }
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    var parameter = Form.Element.Serializers[method](element);

    if (parameter) {
      return parameter[1];
	}
  }
};

Form.Element.Serializers = {
  input: function(element) {
    switch (element.type.toLowerCase()) {
      case 'submit':
      case 'hidden':
      case 'password':
      case 'text':
        return Form.Element.Serializers.textarea(element);
      case 'checkbox':
      case 'radio':
        return Form.Element.Serializers.inputSelector(element);
    }
    return false;
  },

  /*inputSelector: function(element) {
    if (element.checked)
      return [element.name, element.value];
  },*/
  // Todd Lee
  inputSelector: function(element) {
	var groups = document.getElementsByName(element.name);
	var subValue = new Array();
	for (var i=0; i<groups.length; i++ ) {
		if (groups[i].checked) {
		  subValue.push(groups[i].value);
		}
	}
	if (subValue.length < 1) {
		subValue = [];
	}
	 return [element.name, subValue];
  },

  textarea: function(element) {
    return [element.name, element.value];
  },

  select: function(element) {
    return Form.Element.Serializers[element.type == 'select-one' ?
      'selectOne' : 'selectMany'](element);
  },

  selectOne: function(element) {
    var value = '', opt, index = element.selectedIndex;
    if (index >= 0) {
      opt = element.options[index];
      value = opt.value || opt.text;
    }
    return [element.name, value];
  },

  selectMany: function(element) {
    var value = [];
    for (var i = 0; i < element.length; i++) {
      var opt = element.options[i];
      if (opt.selected) {
        value.push(opt.value || opt.text);
	  }
    }
    return [element.name, value];
  }
};

/*--------------------------------------------------------------------------*/

var $F = Form.Element.getValue;

/*--------------------------------------------------------------------------*/

Abstract.TimedObserver = function() {};
Abstract.TimedObserver.prototype = {
  initialize: function(element, frequency, callback) {
    this.frequency = frequency;
    this.element   = $(element);
    this.callback  = callback;

    this.lastValue = this.getValue();
    this.registerCallback();
  },

  registerCallback: function() {
    setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  onTimerEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
};

Form.Element.Observer = Class.create();
Form.Element.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create();
Form.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = function() {};
Abstract.EventObserver.prototype = {
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form') {
      this.registerFormCallbacks();
	}
    else {
      this.registerCallback(this.element);
	}
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    var elements = Form.getElements(this.element);
    for (var i = 0; i < elements.length; i++) {
      this.registerCallback(elements[i]);
	}
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        case 'password':
        case 'text':
        case 'textarea':
        case 'select-one':
        case 'select-multiple':
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
};

Form.Element.EventObserver = Class.create();
Form.Element.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create();
Form.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
if (!window.Event) {
  var Event = new Object();
}

Object.extend(Event, {
  KEY_BACKSPACE: 8,
  KEY_TAB:       9,
  KEY_RETURN:   13,
  KEY_ESC:      27,
  KEY_LEFT:     37,
  KEY_UP:       38,
  KEY_RIGHT:    39,
  KEY_DOWN:     40,
  KEY_DELETE:   46,

  element: function(event) {
    return event.target || event.srcElement;
  },

  isLeftClick: function(event) {
    return (((event.which) && (event.which == 1)) ||
            ((event.button) && (event.button == 1)));
  },

  pointerX: function(event) {
    return event.pageX || (event.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft));
  },

  pointerY: function(event) {
    return event.pageY || (event.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop));
  },

  stop: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.returnValue = false;
      event.cancelBubble = true;
    }
  },

  // find the first node with the given tagName, starting from the
  // node the event was triggered on; traverses the DOM upwards
  findElement: function(event, tagName) {
    var element = Event.element(event);
    while (element.parentNode && (!element.tagName ||
        (element.tagName.toUpperCase() != tagName.toUpperCase()))) {
      element = element.parentNode;
	}
    return element;
  },

  observers: false,

  _observeAndCache: function(element, name, observer, useCapture) {
    if (!this.observers) {this.observers = [];}
    if (element.addEventListener) {
      this.observers.push([element, name, observer, useCapture]);
      element.addEventListener(name, observer, useCapture);
    } else if (element.attachEvent) {
      this.observers.push([element, name, observer, useCapture]);
      element.attachEvent('on' + name, observer);
    }
  },

  unloadCache: function() {
    if (!Event.observers) {return;}
    for (var i = 0; i < Event.observers.length; i++) {
      Event.stopObserving.apply(this, Event.observers[i]);
      Event.observers[i][0] = null;
    }
    Event.observers = false;
  },

  observe: function(element, name, observer, useCapture) {
    var element = $(element);
    useCapture = useCapture || false;

    if (name == 'keypress' &&
        (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
        || element.attachEvent)) {
      name = 'keydown';
	}

    this._observeAndCache(element, name, observer, useCapture);
  },

  stopObserving: function(element, name, observer, useCapture) {
    var element = $(element);
    useCapture = useCapture || false;

    if (name == 'keypress' &&
        (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
        || element.detachEvent)) {
      name = 'keydown';
	}

    if (element.removeEventListener) {
      element.removeEventListener(name, observer, useCapture);
    } else if (element.detachEvent) {
      element.detachEvent('on' + name, observer);
    }
  }
});

/* prevent memory leaks in IE */
if (navigator.appVersion.match(/\bMSIE\b/)) {
  Event.observe(window, 'unload', Event.unloadCache, false);
}
  

var Position = {
  // set to true if needed, warning: firefox performance problems
  // NOT neeeded for page scrolling, only if draggable contained in
  // scrollable elements
  includeScrollOffsets: false,

  // must be called before calling withinIncludingScrolloffset, every time the
  // page is scrolled
  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  realOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    return [valueL, valueT];
  },

  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return [valueL, valueT];
  },

  positionedOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        p = Element.getStyle(element, 'position');
        if (p == 'relative' || p == 'absolute') {break;}
      }
    } while (element);
    return [valueL, valueT];
  },

  offsetParent: function(element) {
    if (element.offsetParent) {return element.offsetParent;}
    if (element == document.body) {return element;}

    while ((element = element.parentNode) && element != document.body) {
      if (Element.getStyle(element, 'position') != 'static') {
        return element;
	  }
	}

    return document.body;
  },

  // caches x/y coordinate pair to use with overlap
  within: function(element, x, y) {
    if (this.includeScrollOffsets) {
      return this.withinIncludingScrolloffsets(element, x, y);
	}
    this.xcomp = x;
    this.ycomp = y;
    this.offset = this.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = this.realOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = this.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  // within must be called directly before
  overlap: function(mode, element) {
    if (!mode) {return 0;}
    if (mode == 'vertical') {
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
	}
    if (mode == 'horizontal') {
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
	}
  },

  clone: function(source, target) {
    source = $(source);
    target = $(target);
    target.style.position = 'absolute';
    var offsets = this.cumulativeOffset(source);
    target.style.top    = offsets[1] + 'px';
    target.style.left   = offsets[0] + 'px';
    target.style.width  = source.offsetWidth + 'px';
    target.style.height = source.offsetHeight + 'px';
  },

  page: function(forElement) {
    var valueT = 0, valueL = 0;

    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;

      // Safari fix
      if (element.offsetParent==document.body) {
        if (Element.getStyle(element,'position')=='absolute') {break;}
	  }
	  element = element.offsetParent;
    } while (element);

    element = forElement;
    do {
      valueT -= element.scrollTop  || 0;
      valueL -= element.scrollLeft || 0;
	  element = element.parentNode;
    } while (element);

    return [valueL, valueT];
  },

  clone: function(source, target) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, arguments[2] || {});

    // find page position of source
    source = $(source);
    var p = Position.page(source);

    // find coordinate system to use
    target = $(target);
    var delta = [0, 0];
    var parent = null;
    // delta [0,0] will do fine with position: fixed elements,
    // position:absolute needs offsetParent deltas
    if (Element.getStyle(target,'position') == 'absolute') {
      parent = Position.offsetParent(target);
      delta = Position.page(parent);
    }

    // correct by body offsets (fixes Safari)
    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }

    // set position
    if(options.setLeft)   {target.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';}
    if(options.setTop)    {target.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';}
    if(options.setWidth)  {target.style.width = source.offsetWidth + 'px';}
    if(options.setHeight) {target.style.height = source.offsetHeight + 'px';}
  },

  /*absolutize: function(element) {
    element = $(element);
    if (element.style.position == 'absolute') return;
    Position.prepare();

    var offsets = Position.positionedOffset(element);
    var top     = offsets[1];
    var left    = offsets[0];
    var width   = element.clientWidth;
    var height  = element.clientHeight;

    element._originalLeft   = left - parseFloat(element.style.left  || 0);
    element._originalTop    = top  - parseFloat(element.style.top || 0);
    element._originalWidth  = element.style.width;
    element._originalHeight = element.style.height;

    element.style.position = 'absolute';
    element.style.top    = top + 'px';;
    element.style.left   = left + 'px';;
    element.style.width  = width + 'px';;
    element.style.height = height + 'px';;
  },

  relativize: function(element) {
    element = $(element);
    if (element.style.position == 'relative') return;
    Position.prepare();

    element.style.position = 'relative';
    var top  = parseFloat(element.style.top  || 0) - (element._originalTop || 0);
    var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);

    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.height = element._originalHeight;
    element.style.width  = element._originalWidth;
  }*/
  // Todd Lee
  absolutize: function(element) {
    element = $(element);
	if (Element.getStyle(element, 'position') == 'absolute') {
		return;
	}
	
    Position.prepare();

    var offsets = Position.cumulativeOffset(element);
    var top     = offsets[1];
    var left    = offsets[0];
    var width   = element.clientWidth;
    var height  = element.clientHeight;

    element._originalLeft   = parseFloat(element.style.left  || 0);
    element._originalTop    = parseFloat(element.style.top || 0);
    element._originalWidth  = element.style.width;
    element._originalHeight = element.style.height;

    element.style.position = 'absolute';
    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.width  = width + 'px';


    element.style.height = height + 'px';

	var pos = Position.cumulativeOffset(element);
	var p = [0,1].map(function(i){ return (offsets[i]-pos[i]); });
	var d = [
		p[0] + parseInt(Element.getStyle(element, 'left') || 0),
		p[1] + parseInt(Element.getStyle(element, 'top') || 0)
	];
	element.style.left = d[0] + 'px';
	element.style.top = d[1] + 'px';
  },
  relativize: function(element) {
    element = $(element);
	if (Element.getStyle(element, 'position') == 'relative') {
		return;
	}
	if (typeof(element._originalWidth) == 'undefined' || typeof(element._originalHeight)=='undefined') {
		return;
	}
	
    Position.prepare();

    var offsets = Position.cumulativeOffset(element);

	element.style.position = 'relative';
    var top  = parseFloat(element.style.top  || 0);
    var left = parseFloat(element.style.left || 0);

    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
	element.style.height = element._originalHeight;
	element.style.width  = element._originalWidth;

	var pos = Position.cumulativeOffset(element);
	var p = [0,1].map(function(i){ return (offsets[i]-pos[i]); });
	var d = [
		p[0] + parseInt(Element.getStyle(element, 'left') || 0),
		p[1] + parseInt(Element.getStyle(element, 'top') || 0)
	];
	element.style.left = d[0] + 'px';
	element.style.top = d[1] + 'px';
  }
};

// Safari returns margins on body which is incorrect if the child is absolutely
// positioned.  For performance reasons, redefine Position.cumulativeOffset for
// KHTML/WebKit only.
if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) {
  Position.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body) {
        if (Element.getStyle(element, 'position') == 'absolute') {break;}
	  }

      element = element.offsetParent;
    } while (element);

    return [valueL, valueT];
  };
}
/******* Core Js End **********/
/******* Json Js **********/
/*
Copyright (c) 2005 JSON.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The Software shall be used for Good, not Evil.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*
    The global object JSON contains two methods.

    JSON.stringify(value) takes a JavaScript value and produces a JSON text.
    The value must not be cyclical.

    JSON.parse(text) takes a JSON text and produces a JavaScript value. It will
    return false if there is an error.
*/
var JSON = function () {
    var m = {
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"' : '\\"',
		'\\': '\\\\'
	},
	s = {
		'boolean': function (x) {
			return String(x);
		},
		number: function (x) {
			return isFinite(x) ? String(x) : 'null';
		},
		string: function (x) {
			if (/["\\\x00-\x1f]/.test(x)) {
				x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
					var c = m[b];
					if (c) {
						return c;
					}
					c = b.charCodeAt();
					return '\\u00' +
						Math.floor(c / 16).toString(16) +
						(c % 16).toString(16);
				});
			}
			return '"' + x + '"';
		},
		object: function (x) {
			if (x) {
				var a = [], b, f, i, l, v;
				if (x instanceof Array) {
					a[0] = '[';
					l = x.length;
					for (i = 0; i < l; i += 1) {
						v = x[i];
						f = s[typeof v];
						if (f) {
							v = f(v);
							if (typeof v == 'string') {
								if (b) {
									a[a.length] = ',';
								}
								a[a.length] = v;
								b = true;
							}
						}
					}
					a[a.length] = ']';
				} else if (x instanceof Object) {
					a[0] = '{';
					for (i in x) {
						v = x[i];
						f = s[typeof v];
						if (f) {
							v = f(v);
							if (typeof v == 'string') {
								if (b) {
									a[a.length] = ',';
								}
								a.push(s.string(i), ':', v);
								b = true;
							}
						}
					}
					a[a.length] = '}';
				} else {
					return;
				}
				return a.join('');
			}
			return 'null';
		}
	};
    return {
        copyright: '(c)2005 JSON.org',
        license: 'http://www.JSON.org/license.html',
/*
    Stringify a JavaScript value, producing a JSON text.
*/
        stringify: function (v) {
            var f = s[typeof v];
            if (f) {
                v = f(v);
                if (typeof v == 'string') {
                    return v;
                }
            }
            return null;
        },
/*
    Parse a JSON text, producing a JavaScript value.
    It returns false if there is a syntax error.
*/
        parse: function (text) {
            try {
                return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
                        text.replace(/"(\\.|[^"\\])*"/g, ''))) &&
                    eval('(' + text + ')');
            } catch (e) {
                return false;
            }
        }
    };
}();
/******* Json Js End **********/
/******* decode base64 **********/
function b64_423(str) {
    b64table = new Array(
            'A','B','C','D','E','F','G','H',
            'I','J','K','L','M','N','O','P',
            'Q','R','S','T','U','V','W','X',
            'Y','Z','a','b','c','d','e','f',
            'g','h','i','j','k','l','m','n',
            'o','p','q','r','s','t','u','v',
            'w','x','y','z','0','1','2','3',
            '4','5','6','7','8','9','-','_');
    var binary = new String();
    for (var i = 0; i < str.length; i ++) {
        for (var j = 0; j < 64; j++) {
            if (str.charAt(i) == b64table[j]) {
                var bin = j.toString(2);
                binary += ("000000" + bin).substr(bin.length);
                break;
            }
        }
        if (j == 64) {
            if (i == 2) {
                /* 去掉 4 个 0 */
                return binary.substr(0, 8);
            } else {
                /* 去掉 2 个 0 */
                return binary.substr(0, 16);
            }
        }
    }
    return binary;
}
function b2i(str) {
    var x = 0;
    var k = 128;
    for (var i = 0; i < 8; i++, k=k/2) {
        if (str.charAt(i) == "1") {
            x += k;
        }
    }
    return String.fromCharCode(x)
}
function b64_decodex(str) {
    var ret = new Array();
    var i;
    var x = "";
    for (var i = 0; i < str.length; i += 4) {
        x += b64_423(str.substr(i, 4));
    }
    for (var i = 0; i < x.length; i += 8) {
        ret += b2i(x.substr(i, 8));
    }
    return ret;
}


/******* Common Js for Sohu Blog **********/
/*	Author: Todd Lee (www.todd-lee.com)
/*	Last update: 2007-04-17
*/

var Browser = new Object();
Browser.ua = getUserAgent();
function getUserAgent(){
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf("opera") >= 0) {return "opera";}
	if (ua.indexOf("firefox") >= 0) {return "ff";}
	if (ua.indexOf("gecko") >= 0) {return "moz";}
	if (ua.indexOf("msie")) {
		ieVer = parseFloat(ua.substr(ua.indexOf("msie") + 5));
		if (ieVer >= 6) {return "ie6";}
		if (ieVer >= 5.5) {return "ie55";}
		if (ieVer >= 5 ) {return "ie5";}
	}
	return "other";
}

/******* My Favor List **********/

/*** exmaple ***
favList[0] = new Object;
favList[0].id = 1;
favList[0].tit = "Todd Lee";
favList[0].desc = "Todd Lee Blog";
favList[0].url = "http://www.todd-lee.com";

favList[1] = new Object;
favList[1].id = 2;
favList[1].tit = "Todd Lee 2";
favList[1].desc = "Todd Lee Blog 2";
favList[1].url = "http://www.todd-lee.com";
...
*/
if (!favList) var favList = [];
var MyFav = Object.extend((typeof MyFav != 'undefined'? MyFav:{}), {
	/*** global variables ***/
	styleOut 	: 'myfav',		//the class of myFav object
	styleOver 	: 'myfav-over',	//mouseover class
	styleClick 	: 'myfav-over',	//click class
	
	str_noList			: '暂无链接',	//the notice when there is no my favor
	str_editMyFavTitle 	: '新增',		//the words in edit box title
	str_editMyFavTitle2 : '修改',		//the words in edit box title
	str_noticeWordsTitle: '请填写链接名',	//
	str_noticeWordsUrl	: '您填入的链接地址不是一个有效的搜狐博客地址',	//
	str_noticeWordsDel	: '是否确认删除？',	//
	str_noticeLoading	: 'Loading...',	//
	str_noticeDone		: '操作成功',	//
	
	obj_myFavBox 		: 'myFavBox',		//my favor list container 
	obj_popDiv			: 'popDiv',			//my favor cell box
	obj_editMyFavBox	: 'editMyFavBox',	//my favor edit box
	obj_editMyFavTitle 	: 'editMyFavTitle',	//my favor edit box title
	obj_favTitle		: 'favTitle',		//my favor edit box favor's title
	obj_favDesc			: 'favDesc',		//my favor edit box favor's description
	obj_favUrl			: 'favUrl',			//my favor edit box favor's url
	/*** global variables end ***/
	
	//favList : new Array(),
	selectedObj : null,
	showing : false,
	
	/*** build my favor list ***/
	/*
	buildMyFavList : function() {
		this.showing = false;
		this.selectedObj = null;
		var str = "";
		if( favList.length > 0 ) {
			var theObj;
			for( var i=0; i<favList.length; i++) {
				theObj = favList[i];
				var _desc = (theObj.desc)? "\n"+theObj.desc : "";
				str += "<div id=\"myFav_"+ theObj.id +"\" tit=\""+ theObj.tit +"\"desc=\""+ theObj.desc +"\" url=\""+ theObj.url +"\" class=\""+ this.styleOut +"\" onmouseover=\"MyFav.mouseEvent(event, this)\" onmouseout=\"MyFav.mouseEvent(event, this)\">";
				str += "<a href=\""+ theObj.url +"\" target=\"_blank\" title=\""+ theObj.tit + _desc +"\"><strong>"+ theObj.tit +"</strong></a> ";
				if (theObj.usr) {
					str += theObj.usr;
				}
				str += "<br /><span style=\"text-decoration: none;\">"+ theObj.desc +"</span>";
				str += "</div>";
			}
		}
		else {
			str = this.str_noList;
		}
		$(this.obj_myFavBox).innerHTML = str;
	},
	*/
	buildMyFavList : function() {
		this.showing = false;
		this.selectedObj = null;
		var str = "";
		if( favList.length > 0 ) {
			var theObj;
			for( var i=0; i<favList.length; i++) {
				theObj = favList[i];
				var _desc = (theObj.desc)? "\n"+theObj.desc : "";
				str += "<div id=\"myFav_"+ theObj.id +"\" title=\""+ theObj.title +"\"desc=\""+ theObj.desc +"\" link=\""+ theObj.link +"\" class=\""+ this.styleOut +"\" onmouseover=\"MyFav.mouseEvent(event, this)\" onmouseout=\"MyFav.mouseEvent(event, this)\">";
				str += "<a href=\""+ theObj.link +"\" target=\"_blank\" title=\""+ theObj.title + _desc +"\"><strong>"+ theObj.title +"</strong></a> ";
				if(theObj.level && theObj.level.length > 0){
					str += '<img src="http://img3.pp.sohu.com/ppp/blog/styles/images/ico_upn_' + theObj.level + '.gif" align="absbottom" style="height:16px;" class="upIco" alt="' + theObj.modifiedTime + '" />';
				}
				str += "<br /><span style=\"text-decoration: none;\">"+ theObj.desc +"</span>";
				str += "</div>";
			}
		}
		else {
			str = this.str_noList;
		}
		$(this.obj_myFavBox).innerHTML = str;
	},
	/*** build my favor list end ***/

	/*** style operations of my favor list ***/
	//listen mouse event
	mouseEvent : function(e, theObj, opr) {
		if (!e) 
			var e=window.event;
		if (!theObj) {
			try {
				theObj = e.srcElement;
			}
			catch(e){}
		}
		if (theObj.id.indexOf('myFav_') < 0 && this.selectedObj ) {
			theObj = this.selectedObj;
		}
		if ( e.type == 'mouseover' ){
			this.overCell(theObj);
		}
		else if ( e.type == 'mouseout'  ||  e.type == 'blur' ){
			this.outCell(theObj);
		}
		else if ((e.type == 'click')){
			if (opr == 'delete') {
				this.deleteFav(theObj);
			}
			else if (opr == 'edit'){
				this.editFavCheck(theObj);
			}
			else {
				if (!this.showing) {
					this.selectCell(theObj, opr);
				}
				else {
					this.unSelectCell(theObj);
				}
				this.showing = !this.showing;
			}
		}
	},
	
	//on mouse over to do this
	overCell : function(theObj) {
		if (!this.showing) {
			this.outCellAll();
			theObj.className = this.styleOver;
			this.selectEntry(theObj);
			this.showTip(theObj);
		}
	},
	//on mouse out to do this
	outCell : function(theObj) {
		if (!this.showing) {
			theObj.className = this.styleOut;
			this.hideTip();
		}
	},
	//a shortcut to set all to mouse out style
	outCellAll : function() {
		for (var i=0; i<favList.length; i++) {
			this.outCell(favList[i]);
		}
	},

	//on mouse click to do this
	selectCell : function(theObj, opr) {
		if (opr != 'add') {
			theObj.className = this.styleOver;
		}
		this.selectEntry(theObj);
		this.showAddBar(theObj, opr);
	},
	//on clear select to do this
	unSelectCell : function(theObj){
		theObj.className = this.styleOut;
		this.unSelectEntry();
		this.hideTip();
		this.hideAddBar();
	},

	//set mark
	selectEntry : function(theObj){
		if ( !this.isSelected(theObj) ){
			this.selectedObj = theObj;
		}
	},
	//clear mark
	unSelectEntry : function(){
		selectedObj = null;
	},
	//whether the object is selected
	isSelected : function(theObj){
		if (this.selectedObj == theObj)
			return true;
		return false;
	},

	//show edit & delete icon
	showTip : function(theObj) {
		var thePopBox = $(this.obj_popDiv);
		var str = "";
		thePopBox.style.display = 'block';
		thePopBox.style.position = 'absolute';
		thePopBox.style.top    = Position.cumulativeOffset(theObj)[1] -0 +1 + 'px';
		thePopBox.style.left   = Position.cumulativeOffset(theObj)[0] -0 +Element.getWidth(theObj) -33 + 'px';
	},
	hideTip : function() {
		$(this.obj_popDiv).style.display = 'none';
	},

	//show edit panel
	/*
	showAddBar : function(theObj, opr) {
		$(this.obj_editMyFavBox).style.display = 'block';
		$(this.obj_editMyFavBox).style.position = 'absolute';
		$(this.obj_editMyFavBox).style.top    = Position.cumulativeOffset(theObj)[1] + 'px';
		$(this.obj_editMyFavBox).style.left   = Position.cumulativeOffset(theObj)[0] -0 +Element.getWidth(theObj) -33 + 'px';
		$(this.obj_editMyFavTitle).innerHTML = (opr == 'add')? this.str_editMyFavTitle : this.str_editMyFavTitle2;
		$(this.obj_favTitle).value = (opr == 'add')? '' : theObj.getAttribute('tit');
		$(this.obj_favDesc).value = (opr == 'add')? '' : theObj.getAttribute('desc');
		$(this.obj_favUrl).value = (opr == 'add')? 'http://' : theObj.getAttribute('url');
		$(this.obj_favTitle).select();
		$(this.obj_favTitle).focus();
	},
	*/
	showAddBar : function(theObj, opr) {
		$(this.obj_editMyFavBox).style.display = 'block';
		$(this.obj_editMyFavBox).style.position = 'absolute';
		$(this.obj_editMyFavBox).style.top    = Position.cumulativeOffset(theObj)[1] + 'px';
		$(this.obj_editMyFavBox).style.left   = Position.cumulativeOffset(theObj)[0] -0 +Element.getWidth(theObj) -33 + 'px';
		$(this.obj_editMyFavTitle).innerHTML = (opr == 'add')? this.str_editMyFavTitle : this.str_editMyFavTitle2;
		$(this.obj_favTitle).value = (opr == 'add')? '' : theObj.getAttribute('title');
		$(this.obj_favDesc).value = (opr == 'add')? '' : theObj.getAttribute('desc');
		$(this.obj_favUrl).value = (opr == 'add')? 'http://' : theObj.getAttribute('link');
		$(this.obj_favUrl).disabled = (opr != 'add');
		$(this.obj_favTitle).select();
		$(this.obj_favTitle).focus();
	},
	hideAddBar : function() {
		$(this.obj_editMyFavBox).style.display = 'none';
	},
	/*** style operations of my favor list end ***/

	/*** data operations of my favor list ***/
	//get the data index of current object
	getSourceDataIndex : function(theObj) {
		for (var i=0; i<favList.length; i++) {
			if ('myFav_'+favList[i].id == theObj.id) {
				return (i);
			}
		}
		return (-1);
	},
	//confirm delete one
	/*
	deleteFav : function(theObj) {
		theObj.className = this.styleOver;
		this.selectEntry(theObj);
		if (confirm(this.str_noticeWordsDel + theObj.getAttribute('tit') +'?')) {
			showTipInfo(MyFav.str_noticeLoading);
			var doDelete = function() {MyFav.requestDeleteStatus(theObj)};
			doIt = setTimeout(doDelete, 1);
			//var doDelete = function() {MyFav.doDeleteFav(theObj)};
			//doIt = setTimeout(doDelete, 1);
		}
		else {
			this.unSelectCell(theObj);
		}
	},
	*/
	deleteFav : function(theObj) {
		theObj.className = this.styleOver;
		this.selectEntry(theObj);
		if (confirm(this.str_noticeWordsDel + theObj.getAttribute('title') +'?')) {
			showTipInfo(MyFav.str_noticeLoading);
			var doDelete = function() {MyFav.requestDeleteStatus(theObj)};
			doIt = setTimeout(doDelete, 1);
			//var doDelete = function() {MyFav.doDeleteFav(theObj)};
			//doIt = setTimeout(doDelete, 1);
		}
		else {
			this.unSelectCell(theObj);
		}
	},
	//request from server
	requestDeleteStatus : function(theObj) {
		var url = '/manage/link.do';
		var pars = 'm=delete&id=' + favList[this.getSourceDataIndex(theObj)].id;
		var myAjax = new Ajax.Request( url, {method: 'post', parameters: pars, onComplete: MyFav.doDeleteFav, data: theObj } );
	},
	//do delete operation
	/*
	doDeleteFav : function(request, json, theObj) {
		hideTipInfo();
		if (!request || !request.responseText || request.responseText.indexOf('<') !== 0 || !request.responseXML) {
			alert('Error: The resource file is not well-formed.\n'+request.responseText);
			return;
		}
		var xmlDom = request.responseXML;
		var code = Element.getChildValueByTagName(xmlDom, 'code')[0];
		var message = Element.getChildValueByTagName(xmlDom, 'message')[0];
		if (typeof code == 'undefined' || typeof message == 'undefined') {
			alert('Error: The resource file is not well-formed.\n'+request.responseText);
			return;
		}
		if (code != '200') {
			var str = 'Error code: '+ code +'\n';
			str += 'Error Message: '+ message +'\n';
			str += 'Please contact administrators.\n';
			alert(str);
			return;
		}
		showTipInfo(MyFav.str_noticeDone);
		//theObj = MyFav.selectedObj;
		if ( MyFav.getSourceDataIndex(theObj) >= 0 ) {
			favList.splice(MyFav.getSourceDataIndex(theObj), 1);
			MyFav.unSelectCell(theObj);
			MyFav.buildMyFavList();
		}	
		setTimeout(hideTipInfo, 500);
	},
	*/
	doDeleteFav : function(request, json, theObj) {
		hideTipInfo();
		if (!request || !request.responseText) {
			alert('Error: The resource file is not well-formed.\n'+request.responseText);
			return;
		}
		var json = eval('(' + request.responseText + ')');
		if (json.status != 0) {
			alert(json.statusText);
			return;
		}
		showTipInfo(MyFav.str_noticeDone);
		//theObj = MyFav.selectedObj;
		if ( MyFav.getSourceDataIndex(theObj) >= 0 ) {
			favList.splice(MyFav.getSourceDataIndex(theObj), 1);
			MyFav.unSelectCell(theObj);
			MyFav.buildMyFavList();
		}	
		setTimeout(hideTipInfo, 500);
	},
	//check edit data
	/*
	editFavCheck : function(theObj) {
		var expRequire = /.+/;
		var expUrl = /^(http|https|ftp):\/\/([a-zA-Z0-9]|[-_])+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
		if( !expRequire.test( $(this.obj_favTitle).value ) ){
			alert(this.str_noticeWordsTitle);
			$(this.obj_favTitle).focus();
		}
		else if( !expUrl.test( $(this.obj_favUrl).value ) ){
			alert(this.str_noticeWordsUrl);
			$(this.obj_favUrl).focus();
		}
		else {
			showTipInfo(MyFav.str_noticeLoading);
			this.requestEditStatus(theObj);
		}
	},
	*/
	editFavCheck : function(theObj) {
		var expRequire = /.+/;
		var expUrl = /^http:\/\/([a-z0-9-]{4,16})\.blog\.sohu\.com/;
		if( !expRequire.test( $(this.obj_favTitle).value ) ){
			alert(this.str_noticeWordsTitle);
			$(this.obj_favTitle).focus();
		}
		else if( !expUrl.test( $(this.obj_favUrl).value ) ){
			alert(this.str_noticeWordsUrl);
			$(this.obj_favUrl).focus();
		}
		else {
			showTipInfo(MyFav.str_noticeLoading);
			this.requestEditStatus(theObj);
		}
	},
	//request from server
	requestEditStatus : function(theObj) {
		//edit
		if (this.getSourceDataIndex(theObj) >= 0) {
			var url = '/manage/link.do';
			var pars = 'm=update&id='+favList[this.getSourceDataIndex(theObj)].id+'&title='+escape($(this.obj_favTitle).value)+'&desc='+escape($(this.obj_favDesc).value)+'&link='+escape($(this.obj_favUrl).value);
			var myAjax = new Ajax.Request( url, {method: 'post', parameters: pars, onComplete: MyFav.doEditFav, data: theObj } );
		}
		//add
		else {
			var url = '/manage/link.do';
			var pars = 'm=add&title='+escape($(this.obj_favTitle).value)+'&desc='+escape($(this.obj_favDesc).value)+'&link='+escape($(this.obj_favUrl).value);
			var myAjax = new Ajax.Request( url, {method: 'post', parameters: pars, onComplete: MyFav.doEditFav, data: theObj } );
		}
	},
	//do edit operation
	/*
	doEditFav : function(request, json, theObj) {
		hideTipInfo();
		if (!request || !request.responseText || request.responseText.indexOf('<') !== 0 || !request.responseXML) {
			alert('Error: The resource file is not well-formed.\n'+request.responseText);
			return;
		}
		var xmlDom = request.responseXML;
		var code = Element.getChildValueByTagName(xmlDom, 'code')[0];
		var message = Element.getChildValueByTagName(xmlDom, 'message')[0];
		if (typeof code == 'undefined' || typeof message == 'undefined') {
			alert('Error: The resource file is not well-formed.\n'+request.responseText);
			return;
		}
		if (code != '200') {
			var str = 'Error code: '+ code +'\n';
			str += 'Error Message: '+ message +'\n';
			str += 'Please contact administrators.\n';
			alert(str);
			return;
		}
		showTipInfo(MyFav.str_noticeDone);
		var addLink = xmlDom.getElementsByTagName('link')[0];
		var addId = addLink.getAttribute('id') || '';
		var addTit = Element.getChildValueByTagName(addLink, 'name')[0] || '';
		var addDesc = Element.getChildValueByTagName(addLink, 'desc')[0] || '';
		var addUrl = Element.getChildValueByTagName(addLink, 'url')[0] || '';
		if (MyFav.getSourceDataIndex(theObj) >= 0) {
			favList[MyFav.getSourceDataIndex(theObj)].tit = addTit;
			favList[MyFav.getSourceDataIndex(theObj)].desc = addDesc;
			favList[MyFav.getSourceDataIndex(theObj)].url = addUrl;
		}
		else if ( theObj.id.indexOf('myFav_') >= 0 ) {
			var _obj = new Object();
			_obj.id 	= addId;
			_obj.tit 	= addTit;
			_obj.desc 	= addDesc;
			_obj.url 	= addUrl;
			favList[favList.length] = _obj;
		}
		MyFav.unSelectCell(theObj);
		MyFav.buildMyFavList();
		setTimeout(hideTipInfo, 500);
	}
	*/
	doEditFav : function(request, json, theObj) {
		hideTipInfo();
		if (!request || !request.responseText) {
			alert('Error: The resource file is not well-formed.\n'+request.responseText);
			return;
		}
		var json = eval('(' + request.responseText + ')');
		if (json.status != 0) {
			alert(json.statusText);
			return;
		}
		showTipInfo(MyFav.str_noticeDone);
		if (MyFav.getSourceDataIndex(theObj) >= 0) {
			favList[MyFav.getSourceDataIndex(theObj)] = json.data;
		} else if ( theObj.id.indexOf('myFav_') >= 0 ) {
			favList[favList.length] = json.data;
		}
		MyFav.unSelectCell(theObj);
		MyFav.buildMyFavList();
		setTimeout(hideTipInfo, 500);
	}
	/*** data operations of my favor list end ***/
});
/******* My Favor List end **********/


//open new window in the middle of the screen
//url(String): new window's url
//winName(String): new window's name
//theWidth(Int): new window's width
//theHeight(Int): new window's height
//scrolls(yes|null): wheather can scrolls
function openWindow( url, winName, theWidth, theHeight, scrolls ) {
	var xposition=0; 
	var yposition=0;
	if ( (parseInt(navigator.appVersion) >= 4 ) ){
		xposition = (screen.width - theWidth) / 2;
		yposition = (screen.height - theHeight) / 2;
	}
	var theproperty= "width=" + theWidth + "," ;
	theproperty+= "height=" + theHeight + "," ;
	theproperty+= "location=0," ;
	theproperty+= "menubar=0,";
	theproperty+= "resizable=0,";
	if(scrolls)
		theproperty+= "scrollbars=" + scrolls + ",";
	else
		theproperty+= "scrollbars=0,";	
	theproperty+= "status=0," ;
	theproperty+= "titlebar=0,";
	theproperty+= "toolbar=0,";
	theproperty+= "hotkeys=0,";
	theproperty+= "screenx=" + xposition + ","; //仅?用于Netscape
	theproperty+= "screeny=" + yposition + ","; //仅?用于Netscape
	theproperty+= "left=" + xposition + ","; //IE
	theproperty+= "top=" + yposition; //IE 
	return( window.open( url,winName,theproperty ) );
}

//set cookie
//name(String):	cookie's name
//value(String): cookie's value
//expires(Int:minute|String:never): cookie's expiring time
function setCookie(name, value, expires, path, domain) {
	var str = name + "=" + escape(value);
	if (expires) {
		if (expires == 'never') {expires = 100*365*24*60;}
		var exp = new Date(); 
		exp.setTime(exp.getTime() + expires*60*1000);
		str += "; expires="+exp.toGMTString();
	}
	if (path) {str += "; path=" + path;}
	if (domain) {str += "; domain=" + domain;}
	document.cookie = str;
}
//get cookie by cookie's name
//name(String): cookie's name
function getCookie(name){
	var tmp, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)","gi");
	if( tmp = reg.exec( unescape(document.cookie) ) )
		return(tmp[2]);
	return null;
}


function toggleSidePanel(arrowObj){
	Element.swapClassName(arrowObj, "arrow-up", "arrow-down");
	var children = Element.getParentElementByClassName(arrowObj, "panel").childNodes;
	for (var i = 0; i < children.length; i++) {
		if (children[i].nodeType == 1 && children[i].className.indexOf("content") != -1) {
			var contentObj = children[i];
			break;
		}
	}
	Element.swapClassName(contentObj, "panel-content", "panel-content-hidden");
}

function toggleItem(arrowObj){
	Element.swapClassName(arrowObj, "arrow-up", "arrow-down");
	var children = Element.getParentElementByClassName(arrowObj, "item").childNodes;
	for (var i = 0; i < children.length; i++) {
		if (children[i].nodeType == 1 && children[i].className.indexOf("body") != -1) {
			var contentObj = children[i];
			break;
		}
	}
	Element.swapClassName(contentObj, "item-body", "item-body-hidden");
}

/*function isLogin() {
    if (getCookie("P")!=null && getCookie("P")!="" && getCookie("P")!="null")
        return true;
	return false;
}*/
function isPPLogin() {
    //if (getCookie("passport")!=null && getCookie("passport")!="" && getCookie("passport")!="null") {
		var passportP;
		if (typeof PassportSC != 'undefined' && (passportP = getPPP())) {
			return true;
		}
		return false;
	/*}
	return false;*/
}
function isLogin() {
    if (isPPLogin()) {
		var blogP;
		if ((blogP = getP()) && blogP == getPPP()) {
			return true;
		}
		return false;
	}
	return false;
}
// 'mail', 'alumni', 'blog', 'pp', 'club', 'crclub', 'xiaonei', 'say', 'music'
function getProduct(pdt) {
	if (!pdt) {return false;}
	if (typeof PassportSC == 'undefined' || !PassportSC) {
		return false;
	}
	if (!PassportSC.cookie || !PassportSC.cookie.service) {
		PassportSC.parsePassportCookie();
	}
	if (PassportSC.cookie.service[pdt] != 0) {
		return PassportSC.cookie.service[pdt];
	}
	else {
		return false;
	}
}
var BlogCookieInfo = {
	cookie: {},
	parseCookie: function() {
		if (!getCookie('bloginfo')) {return false;}
		var bloginfo = getCookie('bloginfo').split('|');
		if (bloginfo[0]) {
			this.cookie.P = bloginfo[0];
		}
		if (bloginfo[1]) {
			this.cookie.I = bloginfo[1];
		}
		if (bloginfo[2]) {
			this.cookie.ud = bloginfo[2];
		}
		if (bloginfo[3]) {
			this.cookie.B_TP = bloginfo[3];
		}
		if (bloginfo[4]) {
			this.cookie.name = unescape(bloginfo[4]);
		}
		if (bloginfo[5]) {
			this.cookie.ico = bloginfo[5];
		}
	},
	clear: function() {
		this.cookie = {};
	}
};
function hasBlog() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.I) {
		BlogCookieInfo.parseCookie();
	}
	var I = BlogCookieInfo.cookie.I;
    if (I!=null && I!="" && I!="null") {
        return I;
	}
	return false;
}
function getPPP() {
	if (typeof PassportSC != 'undefined' && PassportSC && PassportSC.cookieHandle) {
		var strPassport = PassportSC.cookieHandle();
		if (strPassport.indexOf('@focus.cn')> 0 ){
			strPassport = PassportSC.cookie['uid'] + '@focus.cn';   //todo: passport should offer a function
		}
		return strPassport;
	}
	return '';
}
function getXP () {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.ud) {
		BlogCookieInfo.parseCookie();
	}
	return BlogCookieInfo.cookie.P;
}
function getP() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.P) {
		BlogCookieInfo.parseCookie();
	}
	var str = BlogCookieInfo.cookie.P;
	/*var c = String.fromCharCode(str.charCodeAt(0) - str.length);
	for(var i=1; i<str.length; i++) {
		c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i-1));
	}*/
	if (str) {
		var c = b64_decodex(str);
		return c;
	}
	else {
		return '';
	}
}
function getD() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.ud) {
		BlogCookieInfo.parseCookie();
	}
	return BlogCookieInfo.cookie.ud;
}
function isMyBlog() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.I) {
		BlogCookieInfo.parseCookie();
	}
	if (isLogin() && hasBlog() && (typeof _ebi != 'undefined') && _ebi) {
		if (BlogCookieInfo.cookie.I == _ebi) {
			return true;
		}
	}
	return false;
}
// 0:old user, 1:plus! user, 2:updating user, 3:camp user
function getUserType() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.B_TP) {
		BlogCookieInfo.parseCookie();
	}
	return BlogCookieInfo.cookie.B_TP;
}
function getUserName() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.name) {
		BlogCookieInfo.parseCookie();
	}
	return BlogCookieInfo.cookie.name;
}
function getUserIco() {
	if (!BlogCookieInfo.cookie || !BlogCookieInfo.cookie.ico) {
		BlogCookieInfo.parseCookie();
	}
	return BlogCookieInfo.cookie.ico;
}
function is17173User() {
	return (getP() && getP().indexOf('@17173') > 0);
}
function showTipInfo(text, tipBox) {
	if ($('tipBoxDiv')) {
		var tipBox = $('tipBoxDiv');
	}
	var body = document.body;
	if (!tipBox) {
		var tipBox = document.createElement("div");
		body.appendChild(tipBox);
	}
	tipBox.innerHTML = text;
	tipBox.id = "tipBoxDiv";
	tipBox.style.color = "#333";
	tipBox.style.border = "2px solid #cecece";
	tipBox.style.background = "#ffffe1";
	tipBox.style.padding = "10px";
	tipBox.style.display = "block";
	tipBox.style.zIndex = "1";
	tipBox.style.position = "absolute";
	var x = (body.offsetWidth - tipBox.offsetWidth)/2;
	var y = Math.ceil((document.documentElement.clientHeight - tipBox.offsetHeight)/2) + document.documentElement.scrollTop;
	tipBox.style.left = x + "px";
	tipBox.style.top = y + "px";
}
function hideTipInfo(tipBox, tipBoxShadow) {
	if (tipBox && tipBoxShadow) {
		tipBox.style.display = 'none';
	}
	else if($('tipBoxDiv')) {
		$('tipBoxDiv').style.display = 'none';
	}
}
function getBlogTitle() {
	if (!$('blogTitle')) return null;
	return ($('blogTitle').firstChild.innerHTML);
}
function getBlogLink() {
	if (!$('blogTitle')) return null;
	return ($('blogTitle').firstChild.href);
}
function getBlogDesc() {
	if (!$('blogDesc')) return null;
	return ($('blogDesc').innerHTML);
}
function addToFav() {
	var _title = getBlogTitle();
	var _desc = getBlogDesc();
	var _link = getBlogLink();
	if (!_title || !_link) {
		alert('无法获得此站点相应数据');
		return;
	}
	if (ToolBar) {
		ToolBar.disableBtn(ToolBar.addLink);
	}
	showTipInfo(MyFav.str_noticeLoading);
	
	var url = '/manage/link.do';
	var pars = 'm=add&title='+ escape(_title) +'&desc='+ escape(_desc.substr(0,64) || '') +'&link='+ escape(_link);
	var myAjax = new Ajax.Request( url, {method: 'post', parameters: pars, onComplete: doneAddToFav } );
}
function doneAddToFav(request) {
	hideTipInfo();
	var error = null;
	if (request && request.responseText) {
		if (request.responseXML && request.responseXML.documentElement) {
			var xmlDom = request.responseXML;
			var code = Element.getChildValueByTagName(xmlDom, 'code')[0];
			var message = Element.getChildValueByTagName(xmlDom, 'message')[0];
			if (typeof code == 'undefined' || typeof message == 'undefined') {
				alert('Error: The resource file is not well-formed.\n'+request.responseText);
				return;
			}
			if (code != '200') {
				error = {
					status: code,
					statusText: message
				}
			}
		} else {
			var data = null;
			try {
				data = eval('(' + request.responseText + ')');
			} catch (e) {
				error = {
					status: '-1',
					statusText: e.description
				}
			}
			if (data && data.status != 0) {
				error = data;
			}
		}
	} else {
		alert('Error: The resource file is not well-formed.\n'+request.responseText);
		return;
	}
	if (error) {
		var str = 'Error code: '+ error.status +'\n';
		str += 'Error Message: '+ error.statusText +'\n';
		str += 'Please contact administrators.\n';
		alert(str);
		return;
	}
	showTipInfo(MyFav.str_noticeDone);
	if (ToolBar)	{
		setTimeout(function(){ToolBar.ableBtn(ToolBar.addLink);}, 1000);
	}
	setTimeout(hideTipInfo, 1000);
}
function timeStamp() {	var now = new Date();return (now.getTime());}
function checkLogonForm(frm) {	
	if ($F('username').length <= 0) {
		alert("请填写用户名");
		$('username').focus();
		return false;
	}
	if ($F('passwd').length <= 0) {
		alert("请填写密码");
		$('passwd').focus();
		return false;


	}
	if ($('reme') && $F('reme') >= 1){
		setCookie('username', $F('username'), 'never', '/', 'blog.sohu.com');
		setCookie('domain', $F('maildomain'), 'never', '/', 'blog.sohu.com');
		setCookie('rememberme', 'true', 'never', '/', 'sohu.com');
	}else{
		setCookie('username', '', 'never', '/', 'blog.sohu.com');
		setCookie('domain', '', 'never', '/', 'blog.sohu.com');
		setCookie('rememberme', 'false', 'never', '/', 'sohu.com');
	}
	$('loginid').value = $F('username') + $F('maildomain');
	setParm(frm);frm.Submit.disabled = 'disabled';
	$('submitInfo').style.visibility = 'visible';
	return true;
}
function setLogonForm() {
	$('username').value = getCookie('username') || '';
	for (var i = 0; i < $('maildomain').options.length; i++) {
		if( $('maildomain').options[i].value == getCookie('domain') ) {
			$('maildomain').options[i].selected = true;break;
		}
	}
	if (getCookie('rememberme') == "true") {
		$('reme').checked = true;
		$('passwd').select();
		$('passwd').focus();
	}
}
function getLogonForm() {var str = '<form action="http://passport.sohu.com/login.jsp" method="post" name="form_login" id="form_login" onsubmit="return checkLogonForm(this)"><input type="hidden" name="loginid" id="loginid" value="" /><table width="100%" border="0" cellspacing="2" cellpadding="0"><tr><td nowrap="nowrap"><label for="username" class="redfont">用户名</label></td><td><input name="username" type="text" class="text" id="username" value="" /> <select name="maildomain" id="maildomain" class="text"><option value="@sohu.com" selected="selected">@sohu.com</option><option value="@chinaren.com">@chinaren.com</option><option value="@vip.sohu.com">@vip.sohu.com</option><option value="@sms.sohu.com">@sms.sohu.com</option><option value="@sol.sohu.com">@sol.sohu.com</option><option value="@sogou.com">@sogou.com</option><option value="@17173.com">17173用户</option></select></td></tr><tr><td nowrap="nowrap" class="redfont"><label for="passwd">密　码</label></td><td><input name="passwd" type="password" class="text" id="passwd" value="" /></td></tr><tr><td></td><td><input name="Submit" id="Submit" type="submit" class="button-submit" value=" 登  录 " />你是新人吗？<a href="/login/reg.do">立刻申请</a><br /><span class="notice" id="submitInfo" style="visibility: hidden">正在登录，请稍候……</span></td></tr><tr><td colspan="2"><label for="save"><input name="reme" type="checkbox" id="reme" value="1" />记住我的登录状态(在公共计算机上请慎用此功能)</label></td></tr></table></form>';return str;};
function showManageSideBar() {
	$('toggleSideBar').innerHTML = '&lt;&lt; 关闭侧栏';
	$('toggleSideBar').href = 'javascript:hideManageSideBar()';
	$('content').className = 'content';
	Element.show($('sidebar'));
}
function hideManageSideBar() {
	$('toggleSideBar').innerHTML = '展开侧栏 &gt;&gt;';
	$('toggleSideBar').href = 'javascript:showManageSideBar()';
	Element.hide($('sidebar'));
	$('content').className = 'content-wide';
}
function getPPFrag(elm) {
	if (!$(elm)) return;
	var str = '';
	str += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="180" height="150" id="myFlash">';
	str += '<param name="movie" value="http://img3.pp.sohu.com/ppp/blog/flash/ppm_060718.swf" />';
	str += '<param name="quality" value="high" />';
	str += '<param name="wmode" value="transparent" />';
	str += '<param name="FlashVars" value="url1='+ _ppsrc +'$http://'+ _blog_domain +'.blog.sohu.com/pp/" />';
	str += '<embed src="http://img3.pp.sohu.com/ppp/blog/flash/ppm_060718.swf" FlashVars="url1='+ _ppsrc +'$http://'+ _blog_domain +'.blog.sohu.com/pp/" quality="high" width="180" height="150" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" name="myFlash" swLiveConnect="true" wmode="opaque" />';
	str += '</object>';
	$(elm).innerHTML = str;
}
function getPPSelect() {
	if (typeof ppuserid == 'undefined' || !ppuserid) return('');
	var str = '';
	str += '<select name="ppSource" id="ppSource" onchange="setPPSource()">';
	str += '<option value="http://pp.sohu.com/photolist-list-4-'+ ppuserid +'-1.html" selected="selected">全部</option>';
	for (var i=0; i<photosets.length; i++) {
		var photoset = photosets[i];
		if (!photoset.id) continue;
		str += '<option value="http://pp.sohu.com/set-view-'+ photoset.id +'-'+ ppuserid +'-4-1.html">'+ photoset.name +'</option>';
	}
	str += '</select>';
	return str;
}
function getPPLabel() {
	if (typeof ppuserid == 'undefined' || !ppuserid) return('');
	var str = '';
	str += '<a href="http://pp.sohu.com/setlist.jhtml?method=list&userId='+ ppuserid +'" target="_blank" class="contentLabel" onfocus="this.blur();">转到图片公园</a>';
	//str += '<a href="http://pp.sohu.com/photolist.jhtml?method=list&style=1&userid='+ ppuserid +'&pageNo=1" target="_blank" class="contentLabel" onfocus="this.blur();">缩&nbsp;&nbsp;略</a>';
	//str += '<a href="http://pp.sohu.com/photolist.jhtml?method=list&style=0&userid='+ ppuserid +'&pageNo=1" target="_blank" class="contentLabel" onfocus="this.blur();">标&nbsp;&nbsp;准</a>';
	//str += '<span class="contentLabelActive">幻&nbsp;&nbsp;灯</span>';
	return str;
}
function getPPBigFlash(elm) {
	if (typeof ppuserid == 'undefined' || !ppuserid) {
		$(elm).innerHTML = '暂时无法获取数据，请稍后再试';
		return;
	}
	if (ppuserid < 0) {
		$(elm).innerHTML = '还未开通相册';
		return;
	}
	if (!$(elm)) return;
	var str = '';
	str += '<object id="myFlash" width=720 height=550 classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0">';
	str += '<param name="movie" value="http://img3.pp.sohu.com/ppp/blog/flash/show20060525.swf">';
	str += '<param name="wmode" value="opaque">';
	str += '<param name="quality" value="autohigh">';
	str += '<param id="flashvars" name="flashvars" value="urlA=http://pp.sohu.com/photolist-list-4-'+ ppuserid +'-1.html"/>';
	str += '<embed width="720" height="550" src="http://img3.pp.sohu.com/ppp/blog/flash/show20060525.swf?urlA=http://pp.sohu.com/photolist-list-4-'+ ppuserid +'-1.html" quality="autohigh" wmode="opaque" type="application/x-shockwave-flash" plugspace="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" name="myFlash" swLiveConnect="true"> </embed>';
	str += '</object>';
	$(elm).innerHTML = str;
}
function getMusicFlash(elm) {
	if (!$(elm)) return;
	var str = '';
	str += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="180" height="200" id="zhr">';
	str += '<param name="movie" value="/flash/musicbox.swf" />';
	str += '<param name="quality" value="high" />';
	str += '<embed src="/flash/musicbox.swf"  name="zhr" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="180" height="200"></embed> </object>';
	$(elm).innerHTML = str;
}
function getMusicFrag(request) {
	if (!request || request.responseText == '') return('<hr />没有获得音乐盒数据');
	if (!request.responseXML || !request.responseXML.documentElement) return('<hr />分析音乐盒数据失败');
	var str = '';
	str += '<div>';
	str += '<hr />';
	var xmlDom = request.responseXML;
	var lists = xmlDom.getElementsByTagName('musiclist');
	if (lists[0]) {
		str += '<input name="flashvar" type="hidden" value="'+ lists[0].getAttribute('address') +'$red" />';
	}
	for (var i=0; i<lists.length; i++) {
		var list = lists[i];
		str += '<div>';
		str += '<a href="javascript:changelist(\''+ list.getAttribute('address') +'$red\', \''+ list.getAttribute('sogouurl') +'\')">';
		str += list.getAttribute('name') +'</a>';
		str += '<br />';
		str += list.getAttribute('num') +' 首 ';
//		str += list.getAttribute('num') +' 首 '+ list.getAttribute('desc').substring(0, 11);
		str += '</div>';
		str += '<hr />';
	}
	str += '</div>';
	return str;
}
function getMusicSelect(request) {
	if (!request || request.responseText == '') return('没有获得音乐盒数据');
	if (!request.responseXML || !request.responseXML.documentElement) return('分析音乐盒数据失败');
	var xmlDom = request.responseXML;
	var lists = xmlDom.getElementsByTagName('musiclist');
	var str = '';
	str += '<select name="musicSource" id="musicSource" onchange="setMusicSource()">';
	for (var i=0; i<lists.length; i++) {
		var list = lists[i];
		if (!list.getAttribute('sogouurl')) continue;
		str += '<option value="'+ list.getAttribute('sogouurl').replace('&amp;', '&') +'">'+ list.getAttribute('name') +'</option>';
	}
	str += '</select>';
	return str;
}
function getMusicLabel() {
	if (!$('musicSource') || !$F('musicSource')) return('没有获得音乐盒数据');
	var str = '';
	str += '<a href="javascript:var musicBox = openWindow(\''+ $F('musicSource') +'\', \'musicBox\', 595, 415 );" class="contentLabel" onfocus="this.blur();" title="弹出小窗口">弹出小窗口</a>';
	//str += '<span class="contentLabelActive">大窗口</span>';
	return str;
}
function highLightMsg(elm) {
	if (!$(elm)) return;
	var element = $(elm);
	element.style.borderColor = '#29aba3';
}
function highLightErr(elm) {
	if (!$(elm)) return;
	var element = $(elm);
	element.style.borderColor = 'red';
}
function lowLightMsg(elm) {
	if (!$(elm)) return;
	var element = $(elm);
	element.style.borderColor = '#ccc';
}
function flashMsg(elm) {
	if (!$(elm)) return;
	var element = $(elm);
	setTimeout(function(){highLightMsg(element)}, 0);
	setTimeout(function(){lowLightMsg(element)}, 50);
	setTimeout(function(){highLightMsg(element)}, 150);
	setTimeout(function(){lowLightMsg(element)}, 200);
	setTimeout(function(){highLightMsg(element)}, 300);
	setTimeout(function(){lowLightMsg(element)}, 350);
	setTimeout(function(){highLightMsg(element)}, 450);
	setTimeout(function(){lowLightMsg(element)}, 1500);
}
function flashErr(elm) {
	if (!$(elm)) return;
	var element = $(elm);
	setTimeout(function(){highLightErr(element)}, 0);
	setTimeout(function(){lowLightMsg(element)}, 50);
	setTimeout(function(){highLightErr(element)}, 150);
	setTimeout(function(){lowLightMsg(element)}, 200);
	setTimeout(function(){highLightErr(element)}, 300);
	setTimeout(function(){lowLightMsg(element)}, 350);
	setTimeout(function(){highLightErr(element)}, 450);
	setTimeout(function(){lowLightMsg(element)}, 1500);
}
flashMsg('message');
flashErr('errormsg');

/******* Article Content ********/
var ArticleContent = {
	playEmbed: function(elmId, param) {
		if (!$(elmId)) {return;}
		var str = '';
		str += '<embed '+ param.replace(/'/, '"') +'></embed>';
		Element.replace($(elmId), str);
	}
};

/******* comment form ********/
function setCPShow() {
	if (isLogin()) {
		hideAnonyForm();
	}
	else {
		//if (commentPermission == '2') {
			$('commentForm').innerHTML = '由于最近广告泛滥，暂时只允许登录用户对此文评论。<a href=""http://blog.sohu.com/login/logon.do">登录</a>';
	//	}
		//else {
		//	showAnonyForm();
		//}
	}
	setMyCName();
}
function showAnonyForm() {
	Element.show($('aNotice'));
	Element.show($('aNickname'));
	Element.show($('aEmail'));
	Element.show($('aSite'));
	Element.show($('aRemember'));
}
function hideAnonyForm() {
	Element.hide($('aNotice'));
	Element.hide($('aNickname'));
	Element.hide($('aEmail'));
	Element.hide($('aSite'));
	Element.hide($('aRemember'));
}
function rememberMyCName() {
	if ($('rememberme').checked) {
		setCookie('authorName', $F('authorName'), 'never', '/', 'blog.sohu.com');
		setCookie('authorEmail', $F('authorEmail'), 'never', '/', 'blog.sohu.com');
		setCookie('authorSite', $F('authorSite'), 'never', '/', 'blog.sohu.com');
		setCookie('rememberme', $F('rememberme'), 'never', '/', 'blog.sohu.com');
	}
	else {
		setCookie('authorName', '', 'never', '/', 'blog.sohu.com');
		setCookie('authorEmail', '', 'never', '/', 'blog.sohu.com');
		setCookie('authorSite', '', 'never', '/', 'blog.sohu.com');
		setCookie('rememberme', '', 'never', '/', 'blog.sohu.com');
	}
}
function haveValue(o) {
	if (o!=null && o!="" && o!="null")
		return true;
	return false;
}
function setMyCName() {
	if (!$('authorName')) return;
	if (haveValue(getCookie('authorName')))
		$('authorName').value = getCookie('authorName');
	else
		$('authorName').value = '搜狐网友';
		
	if (haveValue(getCookie('authorEmail')))
		$('authorEmail').value = getCookie('authorEmail');
		
	if (haveValue(getCookie('authorSite')))
		$('authorSite').value = getCookie('authorSite');
	else
		$('authorSite').value = 'http://blog.sohu.com';
		
	if (haveValue(getCookie('rememberme')))
		$('rememberme').checked = true;
	else
		$('authorSite').checked = false;
}
function checkCForm() {
	if (!isLogin() && commentPermission != '2') {
		if($F('authorName').length == 0){
			alert("称呼不能为空");
			$('authorName').focus();
			return false;
		}
		if($F('authorEmail').length != 0){
			var reg = /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/;
			if (!reg.test($F('authorEmail'))) {
				alert("邮箱格式不正确");
				$('authorEmail').focus();
				return false;
			}
		}
		if($F('authorSite').length != 0){
			var reg = /^(http|https|ftp):\/\/[A-Za-z0-9-]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
			if (!reg.test($F('authorSite'))) {
				alert("网站链接格式不正确");
				$('authorSite').focus();
				return false;
			}
		}
	}
	if($F('commentContent').length == 0){
		alert("评论内容不能为空");
		$('commentContent').focus();
		return false;
	}
	if($F('commentContent').length > 1000){
		alert("评论内容过多，最多为1000字");
		$('commentContent').focus();
		return false;
	}
	if (!$('vcode')) {
		showC_code();
	}
	if($F('vcode').length == 0){
	     alert("验证码不能为空");
		 $('vcode').focus();
	     return false;
	}
	rememberMyCName();
	return true;
}
function showC_code() {
	var str_c_codeText = "验&nbsp;证&nbsp;码:";
	//var str_c_codeInput = "<input name=\"c_code\" id=\"c_code\" type=\"text\" class=\"text\" size=\"8\" maxlength=\"4\" />&nbsp;<img id=\"c_codeImg\" src=\"\" alt=\"验证码\" style=\"vertical-align:text-bottom\" />&nbsp;<a href=\"javascript:refreshC_code()\">看不清验证码？</a>"
	//var str_c_codeInput = "<input name=\"vcode\" type=\"text\" class=\"text\" id=\"vcode\" value=\"\" size=\"4\" maxlength=\"4\" />&nbsp;<img src=\"/rand?vcode=<%=vv%>\" alt=\"验证码\" id=\"c_codeImg\" style=\"vertical-align:text-bottom;\" />&nbsp;（字母大小写皆可）<input type=\"hidden\" name=\"vcodeEn\" value=\"<%=vv%>\" />"
	var str_c_codeInput = '<input name="vcode" type="text" class="text" id="vcode" value="" size="6" maxlength="6" />&nbsp;<span></span>&nbsp;（请输入图片中的文字）<a href="javascript:void(0)">看不清验证码？</a>';
	if ($('c_codeTextBox').innerHTML == '') {
		$('c_codeTextBox').innerHTML = str_c_codeText;
	}
	if ($('c_codeInputBox').innerHTML == '') {
		$('c_codeInputBox').innerHTML = str_c_codeInput;
		var vCodeImgCon = $('c_codeInputBox').getElementsByTagName('span')[0];
		var vCodeRefresh = $('c_codeInputBox').getElementsByTagName('a')[0];
		vCodeRefresh.onclick = function() {new VCode(vCodeImgCon);return false;};
		new VCode(vCodeImgCon);
	}
}
var VCode = Class.create();
VCode.prototype = {
	initialize: function(container, options) {
		this.container = $(container);
		this.options = Object.extend({
			parameters: '',
			onComplete: this.showVCodeImg.bind(this),
			onFailure: this.reportError.bind(this),
			method: 'get',
			nocache: true
		},options || {});
		this.getVCode();
		
		/*if(VCode.zhVcodeStr){
			this.showZhVCodeImg();
		}else{
			this.getZhVcodeStr();
		}*/
		
	},
	getZhVcodeStr:function(){
		this.zhVcodeUrl = 'http://vcode.blog.sohu.com/vcode/getvcode_js.php';
		var vn = 'vcodestr';
		new LinkFile(this.zhVcodeUrl, {
			type: 'script',
			noCache: true,
			callBack: {
				variable: vn,
				timeout: 5000,
				onLoad: function() {
					VCode.zhVcodeStr = eval(vn);
					this.showZhVCodeImg();
				}.bind(this),
				onFailure:this.reportError.bind(this)
			}});
	},
	showZhVCodeImg:function(){
		var str = '';
		str += '<img src="http://vcode.blog.sohu.com/vcode/vcode_cn.php?vcode='+VCode.zhVcodeStr+'&ctp=1&aflag=1&refresh='+ (new Date()).getTime() +'" alt="验证码" style="vertical-align:text-bottom;height:50px;width:130px;" />';
		str += '<input type="hidden" name="vcodeEn" id="vcodeEn" value="'+ VCode.zhVcodeStr +'" />';
		this.container.innerHTML = str;
	},
	getVCode: function() {
		this.container.innerHTML = '. . . .';
		this.url = '/service/vcode.jsp';
		if (this.options.nocache) {
			this.options.parameters += (this.options.parameters.length>0? '&':'') + 'nocache='+timeStamp();
		}
		var myAjax = new Ajax.Request(this.url, this.options);
	},
	showVCodeImg: function(request) {
		if (!request || !request.responseText) {this.reportError();return;}
		var vCodeEn = request.responseText;
		var str = '';
		str += '<img src="/rand?vcode='+ vCodeEn +'" alt="验证码" style="vertical-align:text-bottom;height:50px;width:130px;" />';
		str += '<input type="hidden" name="vcodeEn" id="vcodeEn" value="'+ vCodeEn +'" />';
		this.container.innerHTML = str;
	},
	reportError: function() {
		alert('读取验证码失败，请尝试重新刷新。');
	}
};
function initCForm() {
	if ($('commentContent') && $F('commentContent')) {
		showC_code();
	}
}
function getFilterEmotionText(text) {
	text = text || '';
	text = text.replace(/ec\=(\"|)([^\"\s]*)(\"|)/g,"> $2 <");
	text = text.replace(/\<[^\<\>]*\>/g,"");
	text = text.replace(/ +/g," ");
	text = text.replace(/\n+/g,"\n");
	text = text.replace(/^\n*/gm,"");
	text = text.replace(/^\s*/gm,"");
	text = text.replace(/\n*$/gm,"");
	text = text.replace(/\s*$/gm,"");
	return text;
}
function doQuote(obj,strAuthor,id){
	if (!$('commentContent')) return;
	var obj = $(obj);
	var text = getFilterEmotionText(obj.innerHTML);
	$('commentContent').value += "[quote]"+strAuthor+" 在上文中提到：\n"+text+"[/quote]\n";
	$('parentId').value = id;

	if($('commentContent').parentNode.childNodes[$('commentContent').parentNode.childNodes.length-1] && $('commentContent').parentNode.childNodes[$('commentContent').parentNode.childNodes.length-1].tagName == "DIV"){
		var _div = $('commentContent').parentNode.childNodes[$('commentContent').parentNode.childNodes.length-1];
	}
	else if( $('commentContent').nextSibling && $('commentContent').nextSibling.tagName == "DIV" ){
		var _div = $('commentContent').nextSibling;
	}
	else {
		var _div = document.createElement("div");
		$('commentContent').parentNode.appendChild(_div);
	}
	_div.style.color = "red";
	var str = "提示：“[quote]”和“[/quote]”间为引用内容，您不必修改。在后面写上您的回复即可。";
	_div.innerHTML = str;

	window.location.hash = "commentbox";
	$('commentContent').focus();
	try {
		var r = $('commentContent').createTextRange();
		r.moveStart("character",$('commentContent').value.length);
		r.collapse(true);
		r.select();
	}catch(e){}
}
/******* message form ********/
function setMPShow() {
	if (isLogin()) {
		hideAnonyForm();
	}
	else {
		//if (messagePermission == '2') {
			$('messageForm').innerHTML = '<div class="noticeInfo"><h3>由于最近广告泛滥，暂时只允许登录用户发表留言。<a href="http://blog.sohu.com/login/logon.do">登录</a></h3></div>';
		//}
		//else {
		//	showAnonyForm();
		//}
	}
	setMyCName();
}
function checkMForm() {
	if (!isLogin() && messagePermission != '2') {
		if($F('authorName').length == 0){
			alert("称呼不能为空");
			$('authorName').focus();
			return false;
		}
		if($F('authorEmail').length != 0){
			var reg = /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/;
			if (!reg.test($F('authorEmail'))) {
				alert("邮箱格式不正确");
				$('authorEmail').focus();
				return false;
			}
		}
		if($F('authorSite').length != 0){
			var reg = /^(http|https|ftp):\/\/[A-Za-z0-9-]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
			if (!reg.test($F('authorSite'))) {
				alert("网站链接格式不正确");
				$('authorSite').focus();
				return false;
			}
		}
	}
	if($F('messageContent').length == 0){
		alert("留言内容不能为空");
		$('messageContent').focus();
		return false;
	}
	if($F('messageContent').length > 1000){
		alert("留言内容过多（"+ $F('messageContent').length +"字），最多为1000字");
		$('messageContent').focus();
		return false;
	}
	if (!$('vcode')) {
		showC_code();
	}
	if($F('vcode').length == 0){
	     alert("验证码不能为空");
		 $('vcode').focus();
	     return false;
	}
	rememberMyCName();
	return true;
}
function initMForm() {
	if ($('messageContent') && $F('messageContent')) {
		showC_code();
	}
}
function replyM(id){
	var btn = $(Message.MSG_PREFIX+id);
	var divMsg = Element.getParentElementByClassName(btn, 'info-content');
	var divMsgReplyForm = document.getElementsByClassName('msgReplyForm',divMsg)[0];
	
	var divMsgReplyBox = document.getElementsByClassName('msgReply',divMsg)[0];
	
	if (btn.getAttribute('on')!='true') {
		btn.setAttribute('on', 'true');
		var text = '';
		if (divMsgReplyBox) {
			divMsgReplyContent = document.getElementsByClassName('msgReplyContent',divMsg)[0];
			if (divMsgReplyContent) {
				text = getFilterEmotionText(divMsgReplyContent.innerHTML.convertHTMLToText());
			}
			Element.hide(divMsgReplyBox);
		}
		divMsgReplyForm.innerHTML = getReplyMForm(id, text);
		Element.show(divMsgReplyForm);
	}
	else {
		btn.setAttribute('on', 'false');
		if (divMsgReplyBox) {
			Element.show(divMsgReplyBox);
		}
		Element.hide(divMsgReplyForm);
	}
}
function getReplyMForm(id,defaultText) {
	defaultText = defaultText || '';
	var str = '';
	str += '<div class="info-title"><h3>博主回复：</h3></div>';
	str += '<div class="msgReplyContent">';
	str += '<form action="/page/message.do" method="post" onsubmit="return checkMRForm(this)">';
	str += '<input type="hidden" name="ebi" value="'+ _ebi +'" />';
	str += '<input type="hidden" name="replyId" value="'+ id +'" />';
	str += '<input type="hidden" name="m" value="reply" />';
	str += '<textarea name="messageContent" rows="8" class="text" style="width:95%">'+defaultText+'</textarea>';
	str += '<input type="submit" name="submit" value="回 复" class="button-submit" /> <input type="button" name="cls" value="取 消" class="button" onclick="replyM('+id+')" />';
	str += '<form>';
	str += '</div>';
	return str;
}
function checkMRForm(frm) {
	var msgReply;
	var elms = Form.getElements(frm);
	for (var i=0; i<elms.length; i++) {
		var elm = elms[i];
		if (elm.name == 'messageContent') {
			msgReply = elm;
			break;
		}
	}
	if($F(msgReply).length == 0){
		alert("回复内容不能为空");
		msgReply.focus();
		return false;
	}
	if($F(msgReply).length > 1000){
		alert("回复内容过多（"+ $F('messageContent').length +"字），最多为1000字");
		msgReply.focus();
		return false;
	}
}
/******* entry form ********/
function insertUploadPlus(element) {document.getElementById(element).innerHTML = getUploadCtl() + getUploadBtn();}
function showAddGategoryBox() { $('addGategoryBox').style.display = '';$('addGategoryBut').style.display = 'none';$('newGategory').focus();}
function hideAddGategoryBox() { $('newGategory').value = '';$('addGategoryBox').style.display = 'none';$('addGategoryBut').style.display = '';}
function checkAddGategory() {if ($F('newGategory').length == 0) {	alert('请填写分类名称');$('newGategory').focus();}else {showTipInfo("loading...");doAddGategory();}}
function doAddGategory() {	var url = '/manage/category.do';var pars = 'm=save&&name='+escape($F('newGategory'));var myAjax = new Ajax.Request( url, {method: 'post', parameters: pars, onComplete: responseAddGategory } );}function responseAddGategory(request) {if (request.responseText.indexOf(0) != 0){alert('error code: '+request.responseText);}else {showTipInfo("操作成功！");	_id = request.responseText.substring(1);_value = $F('newGategory');	var option = new Option(_value, _id, true, true);	document.entryForm.categoryId.options.add(option, 1); document.entryForm.categoryId.options[1].selected = true;hideAddGategoryBox();}setTimeout(hideTipInfo, 500);}
function showTip(theObj) {	var thePopBox = $('myHumor');var str = "";	thePopBox.style.display = 'block';thePopBox.style.position = 'absolute';thePopBox.style.top = Position.cumulativeOffset(theObj)[1] + 'px';thePopBox.style.left = Position.cumulativeOffset(theObj)[0] + 'px';}
function hideTip() {$('myHumor').style.display = 'none';}
function saveDraft() {	$('oper').value = 'art_draft';document.entryForm.target = '_self';$('save').click();/*$('oper').value = 'art_ok';document.entryForm.target = '_self';*/}
function preview() {$('oper').value = 'art_view';	document.entryForm.target = '_blank';	$('save').click();$('oper').value = 'art_ok';	document.entryForm.target = '_self';}
function checkEntryForm(frm) {
	if ($F('entrytitle') == '') {
		alert("请填写日志标题");
		$('entrytitle').focus();
		return false;
	}
	if ($F('entrytitle').length > 50) {
		alert("日志标题过长。\n目前为"+$F('entrytitle').length+"字，请缩短到50字内");
		$('entrytitle').focus();
		return false;
	}
	if ($F('keywords')) {
		var arr=$F('keywords').split(/\s|　|,|，/);
		if (arr.length>5) {
			alert("标签个数过多。\n目前为"+arr.length+"个，请减少到5个内");
			$('keywords').focus();
			return false;
		}
		return true;
	}
	if ($F('entrycontent') == '') {
		alert("请填写日志内容");
		Editor.focusContent();
		return false;
	}
	if ($('vcode') && $F('vcode').length == 0 && $F('oper') == 'art_ok') {
		alert('请填写验证码');
		$('vcode').focus();
		return false;
	}
	if ($F('oper') == 'art_ok' && $('conThisAticle') && $('conThisAticle').checked && conSelecterMenu) {
		var conValues = conSelecterMenu.getValues();
		if(!conValues[conValues.length-1] || conValues[conValues.length-1]=='' || conValues[conValues.length-1]=='56_allGame') {
			alert('请选择投稿栏目');
			try {
				conSelecterMenu.levels[conSelecterMenu.levels.length-1].elm_sel.focus();
			} catch(e) {
				conSelecterMenu.levels[conSelecterMenu.levels.length-2].elm_sel.focus();
			}
			return false;
		}
		if (is17173User()) {
			$('contrChId').value=conStartId;
		} else {
			$('contrChId').value=conValues[0];
		}
		$('contrCataId').value=conValues[conValues.length-1];
	}
	return true;
}
/**
 * 有关对象操作的一些方法
 * @author Jady
 * 
 * @base prototype
 **/

var Dom2 = {
	create: function(options) {
		var ele = document.createElement(options.tagName || "div");
		if (options.className) ele.className = options.className;
		if (options.style) ele.style.cssText = options.style;
		if (options.innerHTML) ele.innerHTML = options.innerHTML;
		if (options.href) ele.href = options.href;
		if (options.parent) $(options.parent).appendChild(ele);
		return ele;
	},
	
	setOpacity: function(element, value) {
		element = $(element);
		if (document.all) {
			element.style.filter = 'Alpha(Opacity=' + value + ');';
		} else {
			element.style.MozOpacity = value/100;
		}
	},
	
	getElementsByTagClassName: function(parent, tagName, className) {
		var eles = $(parent).getElementsByTagName(tagName);
		var returnEles = [];
		for (var i=0; i<eles.length; i++) {
			if (eles[i].className && eles[i].className == className) {
				returnEles.push(eles[i]);
			}
		}
		return returnEles;
	},

	getClientPos: function(element) {
		element = $(element);
		var pos = {
			left: element.clientLeft,
			top: element.clientTop
		}
		return pos;
	},

	getOffsetPos: function(element) {
		element = $(element);
		var pos = {
			left: 0,
			top: 0
		};
		
		if (element == document) {
			pos.left = document.documentElement.scrollLeft;
			pos.top = document.documentElement.scrollTop;
		} else {
			pos.left = element.offsetLeft;
			pos.top = element.offsetTop;
		}
		
		return pos;
	},
	getPos: function(element) {
		element = $(element);
		
		var pos = this.getOffsetPos(element);
		while (element = element.offsetParent) {
			var tempPos = this.getOffsetPos(element);
			pos.left += tempPos.left;
			pos.top += tempPos.top;
		}
		
		return pos;
	},
	
	getCenterPos: function(el) {
		//	取得对象的大小
		var wh = Dom2.getWH(el);
		
		//	取得document的Rect
		var doc = Dom2.getDocRect();
		
		return {
			left: doc.left + (doc.width > wh.width ? ((doc.width - wh.width) / 2) : 0),
			top: doc.top + (doc.height > wh.height ? ((doc.height - wh.height) / 2) : 0)
		}
	},
	
	getDocRect: function() {
		var r = {
			left: Math.max(document.body.scrollLeft, document.documentElement.scrollLeft),
			top: Math.max(document.body.scrollTop, document.documentElement.scrollTop),
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		}
		r.right = r.left + r.width;
		r.bottom = r.top + r.height;
		return r;
	},
	
	getBodyRect: function() {
		var r = {
			left: 0,
			top: 0,
			width: Math.max(document.body.clientWidth, document.documentElement.clientWidth, document.body.scrollWidth),
			height: Math.max(document.body.clientHeight, document.documentElement.clientHeight, document.body.scrollHeight)
		}
		r.right = r.width;
		r.bottom = r.height;
		return r;
	},
	
	getScrollPos: function(el) {
		el = $(el);
		return {
			left: el.scrollLeft,
			top: el.scrollTop
		};
	},
	
	//	取得一个对象的高度和宽度
	getWH: function(el) {
		el = $(el);
		if (el.style.display == 'none') {
			Dom2.setOpacity(el, 0);
			Element.show(el);
			var w = el.offsetWidth;
			var h = el.offsetHeight;
			Element.hide(el);
			Dom2.setOpacity(el, 100);
		} else {
			var w = el.offsetWidth;
			var h = el.offsetHeight;
		}
		
		return {
			width: w,
			height: h
		};
	},
	
	getRect: function(el) {
		var rect = this.getPos(el);
		var wh = this.getWH(el);
		rect.width = wh.width;
		rect.height = wh.height;
		rect.right = rect.left + rect.width;
		rect.bottom = rect.top + rect.height;
		
		return rect;
	},
	
	getOffsetRect: function(element) {
		var rect = this.getOffsetPos(element);
		var wh = this.getWH(element);
		rect.width = wh.width;
		rect.height = wh.height;
		rect.right = rect.left + wh.width;
		rect.bottom = rect.top + wh.height;
		return rect;
	},
	
	getClientRect: function(element) {
		var rect = this.getClientPos(element);
		var wh = this.getClientWH(element);
		rect.width = wh.width;
		rect.height = wh.height;
		rect.right = rect.left + rect.width;
		rect.bottom = rect.top + rect.height;
		return rect;
	},
	
	getScrollWH: function(el) {
		el = $(el);
		return {
			width: el.scrollWidth,
			height: el.scrollHeight
		};
	},
	
	getClientWH: function(el) {
		el = $(el);
		return {
			width: el.clientWidth,
			height: el.clientHeight
		};
		/*
		if(element == document) element = document.documentElement;
		if(element == document.body && !document.all) {
			element = document.documentElement;
			wh.width = element.scrollWidth;
			wh.height = element.scrollHeight;
		} else {
			wh.width = element.clientWidth;
			wh.height = element.clientHeight;
		}
		return wh;
		*/
	},

	setPos: function(element, pos) {
		element.style.left = pos.left + "px";
		element.style.top = pos.top + "px";
	},
	
	setRect: function(el, rect) {
		el = $(el);
		if (typeof(rect.left) == "number") el.style.left = rect.left + 'px';
		if (typeof(rect.top) == "number") el.style.top = rect.top + 'px';
		if (typeof(rect.width) == "number") el.style.width = rect.width + 'px';
		if (typeof(rect.height) == "number") el.style.height = rect.height + 'px';
	}
}

var Cover = Class.create()
Cover.prototype={
	initialize: function() {
		if (navigator.appVersion.match(/\bMSIE\b/)) {
			var i = document.createElement("iframe");
			i.style.cssText = 'position:absolute;display:none;z-index:1000;border-width:0px;left:0px;top:0px;-moz-opacity:0;FILTER: alpha(opacity=0);opacity: 0;-khtml-opacity: 0;';
			i.frameBorder = '0';
			this.iframe = document.body.appendChild(i);
		}
		var d = document.createElement("div");
		d.style.cssText = '-moz-opacity:0.7;FILTER: alpha(opacity=70);opacity: 0.7;-khtml-opacity: 0.7;position:absolute;display:none;z-index:1001;background-color:#333;left:0px;top:0px;';
		this.div = document.body.appendChild(d);
	},
	
	show: function() {
		var r = Dom2.getBodyRect();
		if (this.iframe) {
			Dom2.setRect(this.iframe, r);
			Element.show(this.iframe);
		}
		Dom2.setRect(this.div, r); 
		Element.show(this.div);
	},
	
	hide: function() {
		Element.hide(this.div);
		if (this.iframe) Element.hide(this.iframe);
	}
}

Cover.show = function() {
	if (!Cover._cover) {
		Cover._cover = new Cover();
	}
	Cover._cover.show();
}
Cover.hide = function() {
	(Cover._cover && Cover._cover.hide());
}

var EntryAlert ={
	show:function(msg){
		Cover.show();
		if(!EntryAlert.alertDiv){
			EntryAlert.alertDiv = document.createElement('div');
			EntryAlert.alertDiv = $(EntryAlert.alertDiv);
			EntryAlert.alertDiv.id='toooftenalert';
			EntryAlert.alertDiv.style.cssText='position:absolute;width:250px;background-color:#fff;z-index:1002;display:none';
			EntryAlert.alertDiv.innerHTML = '<div class="mod"><div class="modFrame"><table height="100%" cellspacing="0" cellpadding="0" class="modTable">' +
					'<thead><tr><td class="mheader lt"></td><td class="mheader t" style="cursor: move;">' +
					'<div class="modHeader"><div class="modCls" title="关闭"></div><div class="modIco"><img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_info.gif"></div><div class="modTitle">消息</div></div></td><td class="mheader rt"></td></tr></thead><tbody><tr><td class="mbody l"></td><td height="100%" class="mbody c"><div class="modCon">'+msg+'</div><div class="divBtn"><input type="button" class="button-submit" onclick="EntryAlert.close()" value="确定"></div></td><td class="mbody r"></td></tr></tbody><tfoot><tr><td class="mfooter lb"></td><td class="mfooter b"></td><td class="mfooter rb"></td></tr></tfoot></table></div></div>'
			document.body.appendChild(EntryAlert.alertDiv);
			var r = Dom2.getCenterPos(EntryAlert.alertDiv);
			Dom2.setRect(EntryAlert.alertDiv,r);
		}
		EntryAlert.alertDiv.show();
	},
	close:function(){
		Cover.hide();
		EntryAlert.alertDiv.style.display = 'none';
	}
}

function checkEntryFormWithEntryTime(frm){
	//验证表单
	if(!checkEntryForm(frm)){
		return false;
	}
	//只限制发新文章
	if($('m') && $F('m') != 'save'){
		return true;
	}
	var xpt = window._xpt;
	var vn = "entryCheck"+(new Date()).getTime();
	new LinkFile('http://blog.sohu.com/service/write_check.jsp?vn='+vn, {
		type: 'script',
		noCache: true,
		callBack: {
			variable: vn,
			timeout:  3000,
			onLoad: function(){
				if(window[vn]){
					var data = window[vn];
					if( typeof data.status != 'undefined' && data.status == 0){
						var msg = '一分钟内只能发表一篇博文，请稍事休息';
						//Mini.MsgBox.alert('一分钟内只能发表一篇博文，请稍事休息');
						EntryAlert.show(msg);
						return;
					}
				}
				frm.submit();
			},
			onFailure:function(){
				frm.submit();
			}
		}
	}); 
	return false;
}
function _requestTag(func) {
	var url='/service/tag/extr.html';
	var text=$F('entrytitle')+' '+$F('entrytitle')+' '+$F('entrycontent');
	var options = {method:'post',parameters:'text='+escape(text),onComplete:_haveGetTag.bind(null,func)};
	setTimeout(function(){var myAjax=new Ajax.Request(url,options);},500);
}
function requestTag() {
	Editor.setContent();
	if($F('entrycontent').length <= 0) {
		alert("请先填写日志内容，系统才能根据内容来提取标签。\n\n或者您可以自己为日志添加一些标签，例如“情感 日记”。");
	}
	else if($F('entrycontent').length < 100) {
		alert("您的日志内容过少，系统很难有效提取标签。\n请增加到100字以上。\n\n或者您可以自己为日志添加一些标签，例如“情感 日记”。");
	} else {
		showTipInfo("正在生成日志标签，请稍候...");
		$('save').disabled=true;
		$('draft').disabled=true;
		$('view').disabled=true;
		$('getTag').disabled=true;
		_requestTag(haveGetTag);
	}
}
var TAGS_PREFIX='tags:';
function submitEntryForm(request) {
	showTipInfo("正在发布日志...");
	$('entryForm').submit();
}
function _haveGetTag(func, request) {
	var tags = "";
	if(request.responseText&&request.responseText.trim().indexOf(TAGS_PREFIX)==0) {
		var arr=request.responseText.trim().split('\n');
		if(arr.length==2&&arr[1]) {
			tags = arr[1];
		}
	}
	
	func(tags);
}
function haveGetTag(tags) {
	hideTipInfo();
	$('save').disabled=false;
	$('draft').disabled=false;
	$('view').disabled=false;
	$('getTag').disabled=false;
	if (tags == "") {
		alert("很遗憾，系统没有提取出有效的标签。\n\n或许您可以自己为日志添加一些标签，例如“情感 日记”。");
		$('keywords').focus();
	} else {
		$('keywords').value = tags;
	}
}

/***
 *	有关用户圈子的状态信息：
 *		0	还未发送请求
 *		1	正在请求
 *		2	有圈子
 *		3	无圈子
 **/
var groupsStatus = 0;
function showHideGroups(checkbox) {
	if (checkbox.checked) {
		switch(groupsStatus) {
			case 0:
				requestUserGroups();
			case 1:
			case 2:
				Element.show('groupsSelecterBox');
				if($("toGroupPlus"))$("toGroupPlus").innerHTML = '-';
				break;
			case 3:
				Element.show('noGroupsBox');
				$("postToGroup").checked = false;
				break;
		}
	} else {
		$("groupsSelecterBox").style.display = "none";
		$("noGroupsBox").style.display = "none";
		if($("toGroupPlus"))$("toGroupPlus").innerHTML = '+';
	}
}
function requestUserGroups() {
	groupsStatus = 1;
	$("groupsBox").innerHTML = '加载中...';
	//	$("groupsSelecterBox").style.display = "";
	new LinkFile('http://q.sohu.com/user/!' + _xpt + '/groups!json', {
								type: 'script',
								noCache: true,
								callBack: {
									variable: "Q.user_groups",
									onLoad: getUserGroupsByCheckBox
									}}); 
}
function getUserGroups() {
	var data = Q.user_groups;
	if (data && data.length) {
		groupsStatus = 2;
		var str = '请选择要推送的圈子：<select name="toGroupId"><option value="">-</option>';
		for (var i=0; i<data.length; i++) {
			str += '<option value="' + data[i].id + '">' + data[i].title + '</option>';
		}
		str += '</select>';
		$("groupsBox").innerHTML = str;
	} else {
		groupsStatus = 3;
		if ($("groupsSelecterBox").style.display == "") {
			$("groupsSelecterBox").style.display = "none";
			$("noGroupsBox").style.display = "";
			$("postToGroup").checked = false;
		}
	}
}
function getUserGroupsByCheckBox() {
	var data = Q.user_groups;
	var defaultChecked = false;
	if (data && data.length) {
		groupsStatus = 2;
		var str = '<ul id="qList">';
		var favGroups = getFavGroups();
		for (var i=0; i<data.length; i++) {
			var isChecked = defaultChecked;
			//if(favGroups.length != 0 && inFavGroups(data[i].id,favGroups)){
			//	isChecked = true;
			//}
			str += '<li><label class="cbox"><input type="checkbox" name="toGroupIds" '+((isChecked)?'checked':'')+' value="' + data[i].id + '" />' + data[i].title + '</label></li>';
			//str += '<label><input type="checkbox" name="toGroupIds" '+((isChecked)?'checked':'')+' value="' + data[i].id + '"/>' + data[i].title + '</label>';
		}
		str += '</ul>';
		$("groupsBox").innerHTML = str;
	} else {
		groupsStatus = 3;
		if ($("groupsSelecterBox").style.display == "") {
			$("groupsSelecterBox").style.display = "none";
			$("noGroupsBox").style.display = "";
			$("postToGroup").checked = false;
			$("toGroupPlus").innerHTML = '-';
		}
	}
}
function saveFavGroups(){
	var eles = document.getElementsByName('toGroupIds');
	var ids = '0';
	for(var i=0;i<eles.length;i++){
		var ele = eles[i];
		if(ele.checked){
			ids += ','+ele.value;
		}
	}
	setCookie('postToGroupIds'+window._xpt,ids,365*1440,'/','blog.sohu.com');
}
function getFavGroups(){
	var str = getCookie('postToGroupIds'+window._xpt);
	if(!str){
		return [];
	}
	var ids = str.split(',');
	return ids;
}
function inFavGroups(id,favGroups){
	for(var i=0;i<favGroups.length;i++){
		if(favGroups[i] == id){
			return true;
		}
	}
	return false;
}
function showHideCon() {
	Element.toggle($('conSelecterBox'));
	if ($('conBox').innerHTML == '' && $('conSelecterBox').style.display != 'none') {
		setCon();
	}
}
var conSelecterMenu = null;
function setCon() {
	if ($('conBox')) {
		conSelecterMenu = new SelecterMenu('conBox', getConDataUrl, {startId: conStartId, variablePrefix: 'con_', selectPerfix: 'con_level_'});
	}
}
/******** entry list ******/
function chageEntryPage(_pg) {
	curPage = _pg || 0;
	if (typeof tag == 'undefined' || !tag) {tag = '';}
	getEntryList(curPage, category, tag);
	if (typeof _pos == 'undefined' || _pos != 'h') {
		getPageText(pageTextContainer, startPage, totalCount, itemPerPage, curPage, chagePageAction);
	}
	return false;
}
function getEntryList(_pg, _c, _t) {
	if (typeof _pos != 'undefined' && _pos == 'h' && typeof _sff != 'undefined' && _sff) {
		var url = '/sff/entries/'+ _ebi +'.html';
	}
	else {
		if (_pg>0)
			showTipInfo('loading...');
		var url = '/action/v_frag-ebi_'+escape(_ebi);
		if(_pg > 1){
			url += '-pg_' + _pg;
		}
		if(_c > 0){
			url += '-c_' + _c;
		}
		/*if(_t){
			url += '-tag_' + (_t);
		}*/
		if(typeof _pos != 'undefined' && _pos == 'h'){
			url += '-sff_true';
		}
		url += '/entry/';
	}
	var pars = '';
	if(_t){
		pars += 'tag=' + escape(_t);
	}
	if (isMyBlog()) {
		pars += pars? ('&o=true&ca='+timeStamp()) : ('o=true&ca='+timeStamp());
	}
	if ($('entryList')) {
		var myAjax = new Ajax.Updater('entryList', url, {method: 'get', parameters: pars, onComplete: entryLoaded } );
	}
}
function entryLoaded() {
	hideTipInfo();
	if (jumpAnchor)
		location.hash = '#entry';
	jumpAnchor = true;
	Entries.insertItemCmtCount();
	Entries.insertItemOpr();
	Entries.insertItemReadCount();
	insertLatestEntries();
	loadItemCmtCount();
}
function loadItemCmtCount() {
	if (!$('entriesIdData')) return;
	var itemsId = $('entriesIdData').innerHTML;
	if (!itemsId) return;
	var url = '/page/comment.do';
	var pars = 'm=list&v=count&eids='+itemsId;
	var myAjax = new Ajax.Request( url, {method: 'get', parameters: pars, onComplete: Entries.insertItemCmtCount } );
}
/*var ITEMCMTCOUNT_PREFIX = 'itemCmtCount_';
function insertItemCmtCount(request) {
	if(typeof eccs == 'undefined' || eccs == null) return;
	var items = [];
	items = document.getElementsByClassName('itemCmtCount');
	if (items.length <= 0) return;
	for (var i=0; i<items.length; i++) {
		var _item = items[i];
		if ( _item && _item.id && (_item.id.indexOf(ITEMCMTCOUNT_PREFIX)==0) ) {
			var itemId = _item.id.substr(ITEMCMTCOUNT_PREFIX.length);
			var _count = eccs[itemId];
			var str = '';
			if (!isNaN(_count))
				str += _count;
			if (str && (!_item.innerHTML || _item.innerHTML == '?'))
				_item.innerHTML = str;
		}
	}
}*/
/******** insert operation button ******/
var Entries = {
	ITEM_PREFIX: 'itemId_',
	ITEMCMTCOUNT_PREFIX: 'itemCmtCount_',
	ITEMREADCOUNT_PREFIX: 'itemReadCount_',
	itemReadCountUrl: 'http://ana.blog.sohu.com/blogcount',
	entries: [],
	insertItemOpr: function(from) {
		if (!isMyBlog()) {return;}
		var items = [];
		items = document.getElementsByClassName('itemOpr');
		if (items.length <= 0) {return;}
		$A(items).each(function(it, i) {
			if ( it && it.id && (it.id.indexOf(this.ITEM_PREFIX)==0) ) {
				var itemId = it.id.substr(this.ITEM_PREFIX.length);
				var str = '';
				
				str += '<a href="javascript:void(0)">';
				str += '<img src="http://img3.pp.sohu.com/ppp/blog/styles_ppp/images/ico_contribute.gif" alt="日志投稿" />';
				str += '</a>';
				
				str += '<a href="http://blog.sohu.com/manage/entry.do?m=edit&id='+ itemId +'&t=shortcut" target="_blank">';
				str += '<img src="http://img3.pp.sohu.com/ppp/blog/styles_ppp/images/ico_edit.gif" alt="修改" />';
				str += '</a>';
				str += '<a href="http://blog.sohu.com/manage/entry.do?m=delete&id='+ itemId;
				if (typeof from != 'undefined' && from != '') {
					str += '&from=' + from;
				}
				str += '" onclick="return confirm(\'确认要删除吗？\')">';
				str += '<img src="http://img3.pp.sohu.com/ppp/blog/styles_ppp/images/ico_del.gif" alt="删除" />';
				str += '</a>';
				if (!it.innerHTML) {
					it.innerHTML = str;
				}
				
				var conBtn = it.firstChild;
				Event.observe(conBtn, 'click', this.conEntry.bind(this, itemId));
				this.entries[itemId] = {
					conBtn: conBtn
				};
			}
		}.bind(this));
	},
	insertItemCmtCount: function() {
		if(typeof eccs == 'undefined' || eccs == null) return;
		$A(document.getElementsByClassName('itemCmtCount')).each(function(it, i) {
			if ( it && it.id && (it.id.indexOf(this.ITEMCMTCOUNT_PREFIX)==0) ) {
				var itemId = it.id.substr(this.ITEMCMTCOUNT_PREFIX.length);
				var _count = eccs[itemId];
				var str = '';
				if (!isNaN(_count)) {
					str += _count;
				}
				if (str && (!it.innerHTML || it.innerHTML == '?')) {
					it.innerHTML = str;
				}
			}
		}.bind(this));
	},
	entriesReadCount: {},
	insertItemReadCount: function(from) {
		var itemIds = [];
		$A(document.getElementsByClassName('itemReadCount')).each(function(it, i) {
			if ( it && it.id && (it.id.indexOf(this.ITEMREADCOUNT_PREFIX)==0) ) {
				var itemId = it.id.substr(this.ITEMREADCOUNT_PREFIX.length);
				var _count = this.entriesReadCount[itemId];
				if (typeof _count != 'undefined' && _count != null && !isNaN(_count)) {
					if (!it.innerHTML || it.innerHTML == '?') {
						it.innerHTML = _count;
					}
				}
				else if (itemId) {
					itemIds.push(itemId);
				} 
			}
		}.bind(this));
		
		if (itemIds.length > 0) {
			var ts = timeStamp();
			var vn = 'Blog.ercs_'+ ts;
			if (from == 'view') {var dataURL = this.itemReadCountUrl +'?e='+ itemIds[0] +'&vn='+ ts;}
			else {var dataURL = this.itemReadCountUrl +'?l='+ itemIds.join(',') +'&vn='+ ts;}
			new LinkFile(dataURL, {
									type: 'script',
									noCache: true,
									callBack: {
										variable: vn,
										onLoad: function() {
											this.entriesReadCount = Object.extend(this.entriesReadCount, eval(vn) || {});
											this.insertItemReadCount(from)
										}.bind(this)
										//timeout: 1000
										//timerStep: 500
									}});
		}
	},
	clearReadCount: function(id) {
		if (id) {
			this.entriesReadCount[id] = null;
		}
		else {
			this.entriesReadCount = null;
			this.entriesReadCount = {};
		}
	},
	getConEntrySubMenuData: function(id) {
		var divSubContent = document.createElement('div');
		divSubContent.className = 'menuInnerSub-div clearfix';

		
		var arr = [];
		arr.push('<form method="post" onsubmit="return false;">');
		arr.push('<table cellpadding="2" cellspacing="5">');
		arr.push('<tr><td>');
		arr.push('<div style="border:1px solid #ccc; padding:5px;background-color: #ffffe1;">您可以在发表日志的同时，投稿给我们。<br />如果该日志被录用，将会被展示在相应频道栏目中。同时管理员会以留言方式通知您。<br /><br />提示：每篇日志只能投稿一次，欢迎原创，谢绝转载</div>');
		arr.push('</td></tr>');
		arr.push('<tr><td>');
		arr.push('请选择投稿栏目:');
		arr.push('<input type="hidden" name="id" value="'+ id +'" />');
		arr.push('<input type="hidden" name="contrChId" value="" />');
		arr.push('<input type="hidden" name="contrCataId" value="" />');
		arr.push('</td></tr>');
		arr.push('<tr><td>');
		arr.push('</td></tr>');
		arr.push('<tr><td>');
		arr.push('<input type="submit" value=" 投 稿 " class="button-submit" />');
		arr.push(' <input type="button" value="取消" class="button" />');
		arr.push('<span style="display:none;">loading...</span>');
		arr.push('</td></tr>');
		arr.push('</table>');		
		arr.push('</form>');
		divSubContent.innerHTML = arr.join('');
		
		this.entries[id].conForm = divSubContent.firstChild;
		this.entries[id].conChIpt = divSubContent.firstChild.firstChild.rows[1].cells[0].childNodes[1];
		this.entries[id].conCataIpt = divSubContent.firstChild.firstChild.rows[1].cells[0].childNodes[2];
		this.entries[id].conSelBox = divSubContent.firstChild.firstChild.rows[2].cells[0];
		this.entries[id].conSubBtn = divSubContent.firstChild.firstChild.rows[3].cells[0].firstChild;
		this.entries[id].conCanBtn = divSubContent.firstChild.firstChild.rows[3].cells[0].getElementsByTagName('input')[1];
		this.entries[id].conSubLoadText = divSubContent.firstChild.firstChild.rows[3].cells[0].lastChild;
		
		Event.observe(this.entries[id].conForm, 'submit', this.conSubmit.bind(this, id));
		Event.observe(this.entries[id].conCanBtn, 'click', function() {
			this.entries[id].conEntryMenu.hide();
		}.bind(this));
		setTimeout(this.setConSelecter.bind(this, id), 10);
		return divSubContent;
	},
	setConSelecter: function(id) {
		this.entries[id].conSelecterMenu = new SelecterMenu(this.entries[id].conSelBox, getConDataUrl, {startId: conStartId, variablePrefix: 'con_', selectPerfix: 'con_level_'});
	},
	conSubmit: function(id) {
		var entry = this.entries[id];
		var conValues = entry.conSelecterMenu.getValues();
		if (!conValues[conValues.length-1] || conValues[conValues.length-1] == '' || conValues[conValues.length-1] == '56_allGame') {
			alert('请选择投稿栏目');
			try{
				entry.conSelecterMenu.levels[entry.conSelecterMenu.levels.length-1].elm_sel.focus();
			}catch(e){
				entry.conSelecterMenu.levels[entry.conSelecterMenu.levels.length-2].elm_sel.focus();
			}
			return false;
		}
		//$('contrChId').value = conValues[0];
		
		entry.conSubBtn.disabled = true;
		entry.conCanBtn.disabled = true;
		Element.show(entry.conSubLoadText);
		var url = '/manage/entry.do';
		//var pars = 'm=contribute&id='+ id +'&contrChId='+ conStartId +'&contrCataId='+ conValues[conValues.length-1];
		if (is17173User()) {
			var pars = 'm=contribute&id='+ id +'&contrChId='+ conStartId +'&contrCataId='+ conValues[conValues.length-1];
		}
		else {
			var pars = 'm=contribute&id='+ id +'&contrChId='+ conValues[0] +'&contrCataId='+ conValues[conValues.length-1];
		}
		var myAjax = new Ajax.Request( url, {method: 'get', parameters: pars, onComplete: this.okConSubmit.bind(this), data: id } );
	},
	okConSubmit: function(request, json, data) {
		if (!request || !request.responseText || request.responseText.indexOf('<') !== 0 || !request.responseXML) {
			this.errorConSubmit(request);
			return;
		}
		var xmlDom = request.responseXML;
		var code = Element.getChildValueByTagName(xmlDom, 'code')[0];
		var message = Element.getChildValueByTagName(xmlDom, 'message')[0].trim();
		if (typeof code == 'undefined' || typeof message == 'undefined') {
			return this.errorConSubmit(request);
		}
		if (code == '200') {
			alert(Info.htmlInfo(unescape(message),0,' '));
		}
		else {
			alert(Info.htmlInfo(unescape(message),1,' '));
		}
		
		this.endConSubmit(data);
	},
	errorConSubmit: function(request) {
		alert('Error: The resource file is not well-formed.\n'+request.responseText);
	},
	endConSubmit: function(id) {
		var entry = this.entries[id];
		entry.conSubBtn.disabled = false;
		entry.conCanBtn.disabled = false;
		Element.hide(entry.conSubLoadText);
		entry.conEntryMenu.hide();
	},
	conEntry: function(id) {
		var entry = this.entries[id];
		if (!entry.conEntryMenu) {
			var opt4conEntry = {
				menuData: [
					{
						title: null,
						active: true,
						data: this.getConEntrySubMenuData.bind(this,id)
					}
				],
				title: '日志投稿',
				/*clsBtn: false,*/
				/*autoCls: true,*/
				autoActive: false,
				btn: entry.conBtn,
				displace: [-240, 0],
				zIndex: 500,
				sDivCss: 'menuSub-div menuSub-div-conEntry'
			};
			
			this.entries[id].conEntryMenu = new WinMenu(opt4conEntry);
		}
		if (!entry.conEntryMenu.showing) {
			entry.conEntryMenu.show();
		}
		else {
			entry.conEntryMenu.hide();
		}
	}
};
if (is17173User()) {
	var conStartId = 56;
}
else {
	var conStartId = 0;
}
function getConDataUrl(id) {
	//return '/con_data/con_'+id+'.js';
	return 'http://act.blog.sohu.com/blog-contri/cata/con_'+id+'.js';
}

/******** tag list ******/
var PTags = {
	getTags: function(element,options) {
		if (!element) {return;}
		if (typeof(options.max) != 'number') options.max = -1;
		element.innerHTML = '正在加载...';
		
		var dataURL = 'http://ptag.blog.sohu.com/btags/'+ _ebi +'/all/';
		//var dataURL = 'http://ptag.blog.sohu.com/btags/e3c3a63792/all/';
		//var dataURL = '/ptag.js';
		
		new LinkFile(dataURL, {
			type: 'script',
			noCache: isMyBlog(),
			callBack: {
				variable: 'BlogPtags.tags_abc',
				onLoad: this.showAbc.bind(this,element,options),
				onFailure: this.noData.bind(this,element,options)
		}});
	},
	showAbc: function(element,options) {
		if (!BlogPtags.tags_abc || BlogPtags.tags_abc.length <= 0) {
			element.innerHTML = '暂无标签';
			return;
		}
		
		var str = '';
		
		var i = 0, max = options.max;
		str += '<ul class="ptags">';
		var getItemStr = this.getItemStr;
		this.getLevels(BlogPtags.tags_abc).each(function(t) {
			if (max != -1 && i++ >= max) throw $break;
			str += getItemStr(t);
		});
		str += '</ul>';
		if (max != -1 && i >= max) {
			str += '<div style="cursor:pointer;float:right;">查看全部标签</div>';
		}
		
		element.innerHTML = str;
		if (max != -1 && i >= 20) {
			Event.observe(element.lastChild, 'click', this.showAllAbc.bind(this, element));
		}
		if (options && options.onOkShow) {
			options.onOkShow();
		}
	},
	showAllAbc: function(element) {
		var str = '';
		
		str += '<ul class="ptags">';
		var getItemStr = this.getItemStr;
		this.getLevels(BlogPtags.tags_abc).each(function(t) {
			str += getItemStr(t);
		});
		str += '</ul>';
		
		element.innerHTML = str;
	},
	getItemStr: function(t) {
		var str = '<li class="ptag_'+ t.level + '">';
		str += '<a href="/tag/'+ (t.encode) +'/" title="' + t.count + '篇">';
		str += t.tag;
		str += '</a>';
		str += '</li>';
		return str;
	},
	noData: function(element,options) {
		element.innerHTML = '暂时无法获取数据，请稍后再试';
		if (options && options.onErrorShow) {
			options.onErrorShow();
		}
	},
	getLevels: function(ptags) {
		var levelMax = ptags.max(function(t) {
			return parseInt(t.count);
		});
		var levelMin = ptags.min(function(t) {
			return parseInt(t.count);
		});
		var level = [];
		level[0] = Math.floor((levelMax-levelMin)*0.9)+levelMin;
		level[1] = Math.floor((levelMax-levelMin)*0.7)+levelMin;
		level[2] = Math.floor((levelMax-levelMin)*0.4)+levelMin;
		
		return (ptags.map(function(t) {
			t.level = (t.count>level[0])? 4 : ( (t.count>level[1])? 3 : ( (t.count>level[2])? 2 : 1) );
			return t;
		}));
	}
};

/******** comment list ******/
function getCommontList(_id, _pg, _cc, _noCache) {
	if (_pg>0)
		showTipInfo('loading...');
	_pg = _pg || 1;
	var url = '/action/m_list-id_' + _id + '-cc_' + _cc + '-pg_' + _pg + '/comment/';
	var pars = '';
	if(_noCache) pars = 'nc=true';
	
	if ($('commentlist')) {
		var myAjax = new Ajax.Updater('commentlist', url, {method: 'get', parameters: pars, onComplete: commontLoaded } );
	}
}
function commontLoaded() {
	hideTipInfo();
	if (jumpAnchor)
		location.hash = '#comment';
	jumpAnchor = true;
	setTimeout(Comments.insertCmtOpr.bind(Comments), 10);
	setTimeout(Comments.insertIconInfo.bind(Comments), 10);
	setTimeout(Comments.initCandleMen.bind(Comments), 10);
}
function getPageText(_con, _startPg, _totalItem, _itemPerPg, _curPg, _act) {
	_con = $(_con);
	if (!_con) return;
	if (_curPg == 0) _curPg = 1;
	var _pgCount = Math.ceil(_totalItem/_itemPerPg);
	 _pgCount = _pgCount || 1;
	var str = '';
	str += '共'+ _pgCount +'页';
	str += '&nbsp;&nbsp;|&nbsp;&nbsp;';
	if (_curPg == _startPg) {
		str += '第一页';
		str += '&nbsp;';
		str += '上一页';
	}
	else {
		str += '<a href="javascript:void(0)" onclick="'+_act+'('+_startPg+');return false;">第一页</a>';
		str += '&nbsp;';
		str += '<a href="javascript:void(0)" onclick="'+_act+'('+(_curPg-1)+');return false;">上一页</a>';
	}
	str += '&nbsp;';
	for (var i=_startPg; i<=_pgCount; i++) {
		if (i == _curPg) {
			str += i;
			str += '&nbsp;';
		}
		else if (i>=_curPg-5 && i<=_curPg+5) {
			str += '<a href="javascript:void(0)" onclick="'+_act+'('+i+');return false;">['+i+']</a>';
			str += '&nbsp;';
		}
		else if (i == _curPg-6 || i == _curPg+6) {
			str += '...&nbsp;';
		}
	}
	if (_curPg == _pgCount) {
		str += '下一页';
		str += '&nbsp;';
		str += '最末页';
	}
	else {
		str += '<a href="javascript:void(0)" onclick="'+_act+'('+(_curPg+1)+');return false;">下一页</a>';
		str += '&nbsp;';
		str += '<a href="javascript:void(0)" onclick="'+_act+'('+_pgCount+');return false;">最末页</a>';
	}
	_con.innerHTML = str;
}
function chagePage(_pg) {
	curPage = _pg || 0;
	getCommontList(entryId, curPage, totalCount, noCache);
	getPageText(pageTextContainer, startPage, totalCount, itemPerPage, curPage, chagePageAction);
	return false;
}

var Comments = {
	CMT_PREFIX: 'cmtId_',
	CMTICO_PREFIX: 'icoId_',
	CMTICOIMG: 'http://img3.pp.sohu.com/ppp/blog/images/common/nobody.gif',
	
	insertCmtOpr: function() {
		if (!isMyBlog()) {return;}
		var cmts = [];
		cmts = document.getElementsByClassName('cmtOpr');
		if (cmts.length <= 0) {return;}
		for (var i=0; i<cmts.length; i++) {
			if ( cmts[i] && cmts[i].id && (cmts[i].id.indexOf(this.CMT_PREFIX)==0) ) {
				var cmtId = cmts[i].id.substr(this.CMT_PREFIX.length);
				var str = '';
				str += '|<a href="/manage/comment.do?m=delete&id='+ cmtId +'" onclick="return confirm(\'确认要删除吗？\')">';
				str += '<img src="http://img3.pp.sohu.com/ppp/blog/styles_ppp/images/ico_del.gif" alt="删除" align="absbottom" />';
				str += '</a>';
				if (!cmts[i].innerHTML) {
					cmts[i].innerHTML = str;
				}
			}
		}
	},
	insertIconInfo: function() {
		if (!isLogin() || !hasBlog()) {return;}
		var icos = [];
		icos = document.getElementsByClassName('cmtIco');
		if (icos.length <= 0) {return;}
		for (var i=0; i<icos.length; i++) {
			if ( icos[i] && icos[i].id && (icos[i].id.indexOf(this.CMTICO_PREFIX)==0) ) {
				var icoId = icos[i].id.substr(this.CMTICO_PREFIX.length);
				var icoImg = icos[i].getElementsByTagName('img')[0];
				if (icoId == hasBlog() && icoImg && icoImg.src == this.CMTICOIMG) {
					var str = '';
					str += '<a href="http://blog.sohu.com/manage/profile.do" target="_blank" title="上传我的头像">';
					str +='<img src="'+ this.CMTICOIMG +'" />';
					str += '<span>上传头像</span></a>';
					icos[i].innerHTML = str;
				}
			}
		}
	},
	initCandleMen: function() {
		SohuIM.setCandleMenParam();
		try {
			if (typeof sohuim != undefined && sohuim && sohuim.candleArmy && sohuim.candleArmy.RenderAll) {
				sohuim.candleArmy.RenderAll(webim_config.cm_container, webim_config.product);
			}
		}catch(e){}
	}
};
/******** message list ******/
function getMessageList(_pg, _noCache) {
	if (_pg>0) {
		showTipInfo('loading...');
	}
	_pg = _pg || 1;
	var url = '/action/ebi_'+ _ebi +'-pg_'+ _pg + '-v_frag/message/';
	var pars = '';
	if(_noCache) {pars = 'o=true';}
	
	if ($('messagelist')) {
		var myAjax = new Ajax.Updater('messagelist', url, {method: 'get', parameters: pars, onComplete: messageLoaded } );
	}
}
function messageLoaded() {
	hideTipInfo();
	if (jumpAnchor) {
		location.hash = '#top';
	}
	jumpAnchor = true;
	setTimeout(Message.insertMsgOpr.bind(Message), 10);
	setTimeout(Message.insertMsgReplyOpr.bind(Message), 10);
	setTimeout(Comments.insertIconInfo.bind(Comments), 10);
	setTimeout(Comments.initCandleMen.bind(Comments), 10);
}
function chageMsgPage(_pg) {
	curPage = _pg || 0;
	getMessageList(curPage, noCache);
	getPageText(pageTextContainer, startPage, totalCount, itemPerPage, curPage, chagePageAction);
	return false;
}
var Message = {
	MSG_PREFIX: 'msgId_',
	MSGREPLY_PREFIX: 'msgReplyId_',
	insertMsgOpr: function() {
		if (!isMyBlog()) {return;}
		var msgs = [];
		msgs = document.getElementsByClassName('msgOpr');
		if (msgs.length <= 0) {return;}
		for (var i=0; i<msgs.length; i++) {
			if ( msgs[i] && msgs[i].id && (msgs[i].id.indexOf(this.MSG_PREFIX)==0) ) {
				var msgId = msgs[i].id.substr(this.MSG_PREFIX.length);
				var str = '';
				str += '<a href="javascript:void(0)" onclick="replyM(' + msgId + ',this.parentNode)">回复</a> ';
				str += '|<a href="/manage/message.do?m=delete&id='+ msgId +'" onclick="return confirm(\'确认要删除吗？\')">';
				str += '<img src="http://img3.pp.sohu.com/ppp/blog/styles_ppp/images/ico_del.gif" alt="删除" align="absbottom" />';
				str += '</a>';
				if (!msgs[i].innerHTML) {
					msgs[i].innerHTML = str;
				}
			}
		}
	},
	insertMsgReplyOpr: function() {
		if (!isMyBlog()) {return;}
		var msgReplys = [];
		msgReplys = document.getElementsByClassName('msgReplyOpr');
		if (msgReplys.length <= 0) {return;}
		for (var i=0; i<msgReplys.length; i++) {
			if ( msgReplys[i] && msgReplys[i].id && (msgReplys[i].id.indexOf(this.MSGREPLY_PREFIX)==0) ) {
				var msgReplyId = msgReplys[i].id.substr(this.MSGREPLY_PREFIX.length);
				var str = '';
				str += '<a href="/manage/message.do?m=delete&id='+ msgReplyId +'" onclick="return confirm(\'确认要删除吗？\')">';
				str += '<img src="http://img3.pp.sohu.com/ppp/blog/styles_ppp/images/ico_del.gif" alt="删除" align="absbottom" />';
				str += '</a>';
				if (!msgReplys[i].innerHTML) {
					msgReplys[i].innerHTML = str;
				}
			}
		}
	}
};
function insertMngOpr() {
	if (!isMyBlog()) return;
	if (!$('mngOpr')) return;
	var mng = $('mngOpr');
	var str = '<a href="http://blog.sohu.com/manage/main.do" class="navSysOpt">管理我的博客</a>';
	if (!mng.innerHTML)
		mng.innerHTML = str;
}
insertMngOpr();
function insertNewEntryOpr() {
	if (!isMyBlog()) return;
	if (!$('newEntryOpr')) return;
	var newEntry = $('newEntryOpr');
	var str = '<a href="http://blog.sohu.com/manage/upgrade.do"><img src="http://img3.pp.sohu.com/ppp/blog/images/common/logo_update.gif" border=0 /></a>&nbsp;|&nbsp;<a href="http://blog.sohu.com/manage/entry.do?m=add&t=shortcut" target="_blank">撰写新日志</a>';
	if (!newEntry.innerHTML)
		newEntry.innerHTML = str;
}
insertNewEntryOpr();
/******** insert latest entries list ******/
function insertLatestEntries() {
	if (!$('latestEntriesList') || !$('latestEntriesData')) {
		//setTimeout(insertLatestEntries, 1000);
		return;
	}
	if ($('latestEntriesData').innerHTML)
		$('latestEntriesList').innerHTML = $('latestEntriesData').innerHTML;
	else {
		$('latestEntriesList').innerHTML = '<ul><li>暂无日志</li></ul>';
	}
}
/******** get refer list ******/
function reqReferUserList() {
	if (!$('refer')) return;
	if (typeof referid == 'undefined' || referid == '') {
		$('refer').innerHTML = '无法获得最近访客数据';
		return;
	}
	var referUserListUrl = '/frag/referfrag.jsp?u='+_blog_domain+'&ids='+referid;
	var myAjax_refer = new Ajax.Request(referUserListUrl, {method:'get',onComplete:getReferUserList});
}
function getReferUserList(request) {
	if (!$('refer')) return;
	if (!request.responseText) {
		$('refer').innerHTML = '无法获得最近访客列表';
		return;
	}
	$('refer').innerHTML = request.responseText;
	setTimeout(setReferTime, 0);
}
function setReferTime() {
	if (!(typeof(referidtime) == "string" && referidtime.length > 0)) return; 
	if (!$('refer')) return;
	var brs = $('refer').getElementsByTagName("br"),
			times = referidtime.split(',');
	for (var i=0, il=Math.min(brs.length, times.length); i<il; i++) {
		var it = times[i];
		if (isNaN(it) || parseInt(it) == 0) continue;
		brs[i].parentNode.appendChild(document.createTextNode(getIntervalTime(it)));
	}
}
/******** Emotion ******/
var Emotion = {
	iconPath: 'http://img3.pp.sohu.com/ppp/blog/images/emotion/',
	lib: [
		[ "[:)]", "0.gif", "微笑" ], [ "[#_#]", "1.gif", "谄媚" ],
		[ "[8*)]", "2.gif", "偷笑" ], [ "[:D]", "3.gif", "大笑" ],
		[ "[:-)]", "4.gif", "害羞" ], [ "[:P]", "5.gif", "调皮" ],
		[ "[B_)]", "6.gif", "得意" ], [ "[B_I]", "7.gif", "耍酷" ],
		[ "[^_*]", "8.gif", "讽刺" ], [ "[:$]", "9.gif", "委屈" ],
		[ "[:|]", "10.gif", "郁闷" ], [ "[:(]", "11.gif", "难过" ],
		[ "[:.(]", "12.gif", "流泪" ], [ "[:_(]", "13.gif", "大哭" ],
		[ "[):(]", "14.gif", "发火" ], [ "[:V]", "15.gif", "咒骂" ],
		[ "[*_*]", "16.gif", "发呆" ], [ "[:^]", "17.gif", "不惑" ],
		[ "[:?]", "18.gif", "疑惑" ], [ "[:!]", "19.gif", "吃惊" ],
		[ "[=:|]", "20.gif", "流汗" ], [ "[:%]", "21.gif", "尴尬" ],
		[ "[:O]", "22.gif", "惊恐" ], [ "[:X]", "23.gif", "闭嘴" ],
		[ "[|-)]", "24.gif", "犯困" ], [ "[:Z]", "25.gif", "睡觉" ],
		[ "[:9]", "26.gif", "馋" ], [ "[:T]", "27.gif", "吐" ],
		[ "[:-*]", "28.gif", "耳语" ], [ "[*_/]", "29.gif", "海盗" ],
		[ "[:#|]", "30.gif", "重伤" ], [ "[:69]", "31.gif", "拥抱" ],
		[ "[//shuang]", "32.gif", "爽" ], [ "[//qiang]", "33.gif", "强" ],
		[ "[//ku]", "34.gif", "酷" ], [ "[//zan]", "35.gif", "赞" ],
		[ "[//heart]", "36.gif", "红心" ], [ "[//break]", "37.gif", "心碎" ],
		[ "[//F]", "38.gif", "花开" ], [ "[//W]", "39.gif", "花谢" ],
		[ "[//mail]", "40.gif", "邮件" ], [ "[//strong]", "41.gif", "手势-棒" ],
		[ "[//weak]", "42.gif", "手势-逊" ], [ "[//share]", "43.gif", "握手" ],
		[ "[//phone]", "44.gif", "电话" ], [ "[//mobile]", "45.gif", "手机" ],
		[ "[//kiss]", "46.gif", "嘴唇" ], [ "[//V]", "47.gif", "V" ],
		[ "[//sun]", "48.gif", "太阳" ], [ "[//moon]", "49.gif", "月亮" ],
		[ "[//star]", "50.gif", "星星" ], [ "[(!)]", "51.gif", "灯泡" ],
		[ "[//TV]", "52.gif", "电视" ], [ "[//clock]", "53.gif", "闹钟" ],
		[ "[//gift]", "54.gif", "礼物" ], [ "[//cash]", "55.gif", "现金" ],
		[ "[//coffee]", "56.gif", "咖啡" ], [ "[//rice]", "57.gif", "饭" ],
		[ "[//watermelon]", "58.gif", "西瓜" ], [ "[//tomato]", "59.gif", "番茄" ],
		[ "[//pill]", "60.gif", "药丸" ], [ "[//pig]", "61.gif", "猪头" ],
		[ "[//football]", "62.gif", "足球" ], [ "[//shit]", "63.gif", "便便" ]
	],
	getEmotion: function(emo) {
		for (var i=0; i<this.lib.length; i++) {
			var emotion = this.lib[i];
			if (emotion[0] == emo) {
				return emotion;
			}
		}
		return null;
	},
	getEmotionIcons: function() {
		var str = '';
		for (var i=0; i<this.lib.length; i++) {
			var emotion = this.lib[i];
			str += '<img src="'+ this.iconPath + emotion[1] +'" alt="'+ emotion[0] +'" ec="'+ emotion[0] +'" />';
		}
		return str;
	},
	insert2frm: function(ec, frm) {
		ec = ' ' + ec + ' ';
		if (frm.createTextRange && frm.caretPos) {
		var caretPos = frm.caretPos;
		caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? ec + ' ' : ec;
		frm.focus();
		} else {
		frm.value  += ec;
		frm.focus();
		}
	}
}

function setCmtEmoEvent() {
	for (var i=0; i<$('emotionBox').childNodes.length; i++) {
		var ico = $('emotionBox').childNodes[i];
		ico.onclick = function() {
			Emotion.insert2frm(this.getAttribute('ec'), $('commentContent'));
		}
	}
}


/******** Correlative Entry ******/
var CorEntry = {
	getEntries: function(element, etags, inNum, outNum, by) {
		this.element = element;
		if (!etags || inNum<=0 || outNum<=0) {(by=='system')?this.noEntriesBySys():this.noEntriesByPsn();return;}
		etags = etags.split(/,|，| |　/);
		if (etags.length == 0) {(by=='system')?this.noEntriesBySys():this.noEntriesByPsn();return;}
		
		var inTags = etags.splice(0, inNum);
		if (by == 'system') {
			this.getDataBySys(inTags, outNum);
		}
		else {
			this.getDataByPsn(inTags, outNum);
		}
	},
	getDataBySys: function(inTags, outNum) {
		var dataURL = 'http://tag.blog.sohu.com/'+ encodeURIComponent(escape(inTags.join(' '))) +'/json/';
		new LinkFile(dataURL, {
			type: 'script',
			noCache: isMyBlog(),
			callBack: {
				variable: 'blogTag.posts',
				onLoad: this.showEntriesBySys.bind(this,outNum),
				onFailure: this.noEntriesBySys.bind(this)
		}});
	},
	showEntriesBySys: function(outNum) {
		if (!blogTag || !blogTag.posts || blogTag.posts.length==0) {this.noEntriesBySys();return;}
		try{
			var str = '';
			str += '<div class="item-title">';
			str += '<h3>其他博客也发表了类似文章（'+ getIntervalTime(blogTag.posts[0].pub) +'）</h3>';
			str += '<div class="clear"></div>';
			str += '</div>';
			str += '<div>';
			var displayNum = 0;
			var authorBlogLink = 'http://' + _blog_domain + '.blog.sohu.com/';
			blogTag.posts.each(function(p) {
				if(p.blog_link.indexOf(authorBlogLink) >= 0){ throw $continue;}
				displayNum++;
				if(displayNum > outNum){ throw $break; }
				str += '<div class="tagEntry">';
				str += '<div class="tagEntry_authorPic"><a href="'+ p.blog_link +'" target="_blank"><img src="'+ p.blog_icon +'" alt="'+ p.blog_name +'" /></a></div>';
				str += '<h5><a href="'+ p.blog_link +'" target="_blank" class="tagEntry_authorName">'+ p.blog_name +'</a>：<a href="'+ p.permlink +'" target="_blank" class="tagEntyr_title">'+ p.title +'</a><span class="tagEntry_pubTime">'+ getIntervalTime(p.pub) +'</span></h5>';
				str += '<div class="tagEntry_content">'+ p.excerpt +'...</div>';
				str += '</div>';
			});
			if(displayNum > 0){
				if ($('tagsBox')) {
					str += '<div class="tagListMore">查看更多：'+ $('tagsBox').innerHTML +'</div>';
				}
				str += '</div>';
				this.element.innerHTML = str;
	
				Element.show(this.element);
			}else{
				errorLoadTagList();return;
			}
		}
		catch(e){
			this.noEntriesBySys();
		}
	},
	noEntriesBySys: function() {
		this.getSysRecTags(this.element);
	},
	getSysRecTags: function(element) {
		var url = '/inc/home/tag_index.inc';
		if ($(element)) {
			var div = document.createElement('div');
			div.id = 'rec';
			div.className = 'clearfix';
			var myAjax = new Ajax.Updater(div, url, {method: 'get'} );
			element.appendChild(div);
			Element.show(element);
		}
	},
	getDataByPsn: function(inTags, outNum) {
		this.inTagsByPsn = inTags;
		this.useInTagIndexByPsn = 0;
		this.outEntriesByPsn = [];
		this.outNumByPsn = outNum;
		
		this.getOneDataByPsn();
	},
	getOneDataByPsn: function() {
		if (this.inTagsByPsn.length > 0 && this.useInTagIndexByPsn < this.inTagsByPsn.length && this.outEntriesByPsn.length < this.outNumByPsn ) {
			var ts = timeStamp();
			var dataURL = 'http://ptag.blog.sohu.com/ptags/'+ _ebi +'/'+ encodeURI(escape(this.inTagsByPsn[this.useInTagIndexByPsn])) +'/'+ ts +'/';
			//var dataURL = 'http://ptag.blog.sohu.com/ptags/e3c3a63792/'+ encodeURI(escape(this.inTagsByPsn[this.useInTagIndexByPsn])) +'/'+ ts +'/';
			new LinkFile(dataURL, {
				type: 'script',
				noCache: isMyBlog(),
				callBack: {
					variable: 'BlogPtags.entries_'+ ts,
					onLoad: function(){
						this.outEntriesByPsn = this.getTureEntriesByPerson( this.outEntriesByPsn.concat(eval('BlogPtags.entries_'+ ts +'.entries')) );
						this.useInTagIndexByPsn++;
						this.getOneDataByPsn();
					}.bind(this),
					onFailure: this.noEntriesByPsn.bind(this)
			}});
		}
		else {
			this.showEntriesByPsn();
		}
		
	},
	showEntriesByPsn: function() {
		try{
			if (this.outEntriesByPsn.length > 0) {
				var str = '';
				str += '<div class="item-title clearfix">';
				str += '<h3>相关文章</h3>';
				str += '<span>(根据该日志的标签，发现博主还有如下日志与本文相关)</span>';
				str += '</div>';
				str += '<ul class="corEntry">';
				this.outEntriesByPsn.each(function(e,i) {
					if (i >= this.outNumByPsn) {throw $break;}
					str += '<li>';
					str += '<a href="'+ e.permanLink +'" target="_blank" title="'+ e.title +' ---- '+ getIntervalTime(e.timestamp) +'">';
					str += e.title;
					str += '</a>';
					str += '</li>';
				}.bind(this));
				//str += '<li class="corEntryMore"><a href="'+ _blog_base_url +'entry/" target="_blank">阅读全部日志&gt;&gt;</a></li>';
				str += '</ul>';
				
				this.element.innerHTML = str;
				
				Element.show(this.element);
			}
			else {
				this.noEntriesByPsn();
			}
		}
		catch(e){
			this.noEntriesByPsn();
		}
	},
	noEntriesByPsn: function() {
		var div = document.createElement('div');
		div.id = 'rec';
		div.className = 'clearfix';
		
		PTags.getTags(div,{
					  onOkShow: function() {
							this.element.appendChild(div);
							Element.show(this.element);
						}.bind(this)
		});
		
	},
	getTureEntriesByPerson: function(entries) {
		var trueEnetries = [];
		entries.each(function(e) {
			if ( trueEnetries.any(function(te){return (te.entryId == e.entryId);}) ) {
				throw $continue;
			}
			if(e.entryId == entryId){
				throw $continue;
			}
			else {
				trueEnetries.push(e);
			}
		});
		return trueEnetries;
	}
};
function getIntervalTime(time) {
	var now = new Date();
	var interval = now.getTime() - time;
		
	var minu = Math.floor(interval / (60 * 1000));
	var hour = Math.floor(minu / 60);
	var day = Math.floor(hour / 24);
	
	
	var str = '';
	if(day >= 1){
		str += day;
		str += '天';
	}
	
	if(hour < 48 && hour > 0 && (hour % 24) > 0){
		str += hour % 24;
		str += '小时';
	}
        
	if(hour < 24){
		str += minu % 60;
		str += '分钟';
	}
	str += '前';
	return str;
}

// return the full url of a relative url
function getFullUrl(url) {
	return (url.indexOf('http://') == 0 || url.indexOf('https://') == 0)? 
		url : (url.indexOf('/') == 0)? 
			location.protocol + '//' + location.host + url : (url.indexOf('www') == 0)?
				'http://'+ url : location.href.substr(0, location.href.lastIndexOf('/')+1) + url;
}
// link script or css
/* var test = new LinkFile('test.js', {
							   type: 'script',
							   callBack: {
								   variable: 'test',
								   onLoad: onLoadFun,
								   onFailure: onFailureFun,
								   (timeout:  20,)
								   (timerStep: 500)
							   }});
*/
var LinkFile = Class.create();
LinkFile.prototype = {
	initialize: function(_url, options) {
		this.options = Object.extend({
			type:	'script',
			charset:'',
			noCache: false,
			callBack:	null
		}, options || {});
		
		this.options.callBack = Object.extend({
			variable: null,
			onLoad: null,
			timeout:  20000,
			timerStep:500
		}, options.callBack || {});
		
		this.timer = 0;
		this.loadTimer = null;
		
		if (this.options.type == 'script') {
			this.getJs(_url.trim());
		}
		else {
			this.getCss(_url.trim());
		}
		
		if (this.options.callBack.variable) {
			this.options.callBack.vars = this.options.callBack.variable.split('.');
		}
	},
	stop: function() {
		clearInterval(this.loadTimer);
		this.loadTimer = null;
		this.timer = 0;
		return;
	},
	doCallback: function() {
		if (this.options.type != 'script' || !this.options.callBack || !this.options.callBack.vars || !this.options.callBack.onLoad) {
			this.stop();
			return;
		}
		this.timer += this.options.callBack.timerStep;
		
		if ( $A(this.options.callBack.vars).any(function(v,i) {
			var _v = this.options.callBack.vars.slice(0,i+1).join('.');
			return ( eval('typeof '+ _v +'== "undefined"') || eval(_v +'==null') );
		}.bind(this)) && (this.timer < this.options.callBack.timeout) ) {
			return;
		}
		/*if ( (eval('typeof '+ this.options.callBack.variable +'== "undefined"') || eval(this.options.callBack.variable +'==null')) && (this.timer < this.options.callBack.timeout) ) {
			return;
		}*/
		else {
			clearInterval(this.loadTimer);
			if ( $A(this.options.callBack.vars).all(function(v,i) {
				var _v = this.options.callBack.vars.slice(0,i+1).join('.');
				return ( eval('typeof '+ _v +'!= "undefined"') && eval(_v +'!=null') );
			}.bind(this)) ) {
				(this.options.callBack.onLoad)();
			}
			/*if (eval('typeof '+ this.options.callBack.variable +'!= "undefined"') && eval(this.options.callBack.variable +'!=null')) {
				(this.options.callBack.onLoad)();
			}*/
			else if ( (this.timer >= this.options.callBack.timeout) && this.options.callBack.onFailure) {
				(this.options.callBack.onFailure)();
			}
			this.loadTimer = null;
			this.timer = 0;
		}
	},
	getJs: function(_url) {
		var oHead = document.getElementsByTagName('head')[0];
		var _links = Element.getChildElementByTagName(oHead, 'SCRIPT');
		$A(_links).each(function(s){
			if (getFullUrl(s.getAttribute('src') || '') == getFullUrl(_url)) {
				Element.remove(s);
			}
		});
		this._link = document.createElement('script');
		if (this.options.noCache) {
			_url += (_url.match(/\?/) ? '&' : '?') + 'c=' + timeStamp();
		}
		this._link.src = _url;
		//this._link.setAttribute('src', _url);
		this._link.type = 'text/javascript';
		//this._link.setAttribute('type', 'text/javascript');
		if (this.options.charset) {
			this._link.charset = this.options.charset;
		}
		if (this.options.callBack) {
			this.loadTimer = setInterval(function(){this.doCallback();}.bind(this), this.options.callBack.timerStep);
		}
		oHead.appendChild(this._link);
	},
	getCss: function(_url) {
		var oHead = document.getElementsByTagName('head')[0];
		var _links = Element.getChildElementByTagName(oHead, 'LINK');
		$A(_links).each(function(l){
			if (getFullUrl(l.getAttribute('href') || '') == getFullUrl(_url)) {
				Element.remove(l);
			}
		});
		this._link = document.createElement('link');
		if (this.options.noCache) {
			_url += (_url.match(/\?/) ? '&' : '?') + 'c=' + timeStamp();

		}
		this._link.href = _url;
		//this._link.setAttribute('href', _url);
		this._link.type = 'text/css';
		//this._link.setAttribute('type', 'text/css');
		this._link.rel = 'stylesheet';
		//this._link.setAttribute('rel', 'stylesheet');
		if (this.options.charset) {
			this._link.charset = this.options.charset;
		}
		oHead.appendChild(this._link);
	}
};

/******** window menu ******/
var WinMenus = {
	wMenus: [],
	register: function(wMenu) {
		this.wMenus.push(wMenu);
	},
	unregister: function(wMenu) {
		this.wMenus = this.wMenus.reject(function(m) { return m==wMenu; });
	}
};
var WinMenu = Class.create();
WinMenu.prototype = {
	initialize: function(options) {
		this.options = Object.extend({
			menuData: [],	// *the submenu data in json
			/*menuData: [
				{
					title: '',
					active: true,
					isDivCssEx: 'menuInnerSub-div',
					data: [
						{
							text: 'some html text',
							title: 'the hover title',
							action: null,
							value: null,
							active: true,
							disabled: false
						},
						{
							text: 'some html text',
							title: 'the hover title',
							action: null,
							value: null,
							active: true,
							disabled: false
						}
					]
				},
				{
					title: '',
					active: true,
					isDivCssEx: 'menuInnerSub-div',
					data: [
						{
							text: 'some html text',
							title: 'the hover title',
							action: null,
							value: null,
							active: true,
							disabled: false
						},
						{
							text: 'some html text',
							title: 'the hover title',
							action: null,
							value: null,
							active: true,
							disabled: false
						}
					]
				}
			]*/
			title: null,	// window title
			clsBtn: true,	// need close button?
			shadow: true,	// need shadow?
			shadowOffset: 4,
			dragable: false	,	// need dragable?
			placeIn: document.body,
			dynamicLoad: false,
			click2cls: true,	// close submenu panel when click on submenu
			autoCls: false,		// close submenu panel when click on document
			autoActive: true,	// auto set active item
			btn: null,	// *the button that clicked(to position the menu under it)
			displace: [],	// the displacement of submenu [x,y]
			ableExpandSubmenu: true,
			noneInfo: (typeof App != 'undefined')? App.Lang.none : '',
			zIndex: 500,
			allInOne: false,
			
			sDivCss: 'menuSub-div',
			imtDivCss: 'subMenu-maintitle',
			itDivCss: 'subMenu-title',
			isDivCss:'menuInnerSub-div',
			sOutCss: 'menuSub-out',
			sOverCss: 'menuSub-over',
			sDownCss: 'menuSub-down',
			sDisableCss: 'menuSub-disabled',
			sActiveCss: 'menuSub-active',
			
			Lang: {
				close: (typeof App != 'undefined')? App.Lang.close : 'close',
				loading: (typeof App != 'undefined')? App.Lang.loading : 'loading'
			}
		}, options || {});
		
		this.buildWin();
		WinMenus.register(this);
		
		this.eventCancelBubble = Event.stop.bindAsEventListener(this);
		if (this.options.autoCls) {
			Event.observe(this.options.btn, 'click', this.eventCancelBubble);
			//Event.observe(this.element, 'click', this.eventCancelBubble);
			Event.observe(document, "click", function(e) {
				if (Event.element(e) != this.element && !Element.childOf(Event.element(e), this.element)) {
					this.hide();
				}
			}.bindAsEventListener(this));
		}
	},
	destroy: function() {
		Element.remove(this.element);
		WinMenus.unregister(this);
	},
	buildWin: function() {
		var divWin = document.createElement('div');
		this.element = divWin;
		divWin.className = this.options.sDivCss;
		
		Element.hide(divWin);
		
		var arr = [];
		if (this.options.title || this.options.clsBtn) {
			arr.push('<div class="'+ this.options.imtDivCss +' clearfix">');
			if (this.options.clsBtn) {
				arr.push('<div class="cls" title="'+ this.options.Lang.close +'"></div>');
			}
			if (this.options.title) {
				arr.push(this.options.title);
			}
			arr.push('</div>');
		}
		this.options.menuData.each(function(sm) {
			var _class = this.options.itDivCss;
			var _style = '';
			if (this.options.ableExpandSubmenu) {
				_class += ' ';
				if (sm.active) {
					_class += this.options.itDivCss +'-active';
				}
				else {
					_class += this.options.itDivCss +'-out';
					_style += ' style="display:none;"';
				}
			}
			arr.push('<div class="'+ _class +' clearfix"'+ (sm.title? '':' style="display:none"') +'>');
			arr.push(sm.title);
			arr.push('</div>');
			arr.push('<div class="'+ this.options.isDivCss +' clearfix"'+ _style +'>');
			arr.push(this.options.Lang.loading);
			arr.push('</div>');
		}.bind(this));
		this.element.innerHTML = arr.join('');
		
		if (this.options.clsBtn) {
			this.elm_cls = this.element.childNodes[0].firstChild;
			Event.observe(this.elm_cls, 'click', this.hide.bind(this));
		}
		
		
		this.elm_subTitle = [];
		this.elm_subCont = [];
		var plusIndex = 0;
		if (this.options.title || this.options.clsBtn) {
			plusIndex = 1;
		}
		this.options.menuData.each(function(sm, i) {
			this.elm_subTitle.push(this.element.childNodes[i*2+plusIndex]);
			this.elm_subCont.push(this.element.childNodes[i*2+1+plusIndex]);
		}.bind(this));

		if (this.options.ableExpandSubmenu) {
			$A(this.elm_subTitle).each(function(st, i) {
				var btn = st;
				Event.observe(btn, 'click', function() {
					Element.toggle(this.elm_subCont[i]);
					if (this.elm_subCont[i].style.display == 'none') {
						Element.removeClassName(btn, this.options.itDivCss +'-active');
						Element.addClassName(btn, this.options.itDivCss +'-out');
					}
					else {
						Element.removeClassName(btn, this.options.itDivCss +'-out');
						Element.addClassName(btn, this.options.itDivCss +'-active');
						if (this.elm_subCont[i].innerHTML == this.options.Lang.loading) {
							setTimeout(this.buildSubContent.bind(this, i), 10);
						}
					}
					//setTimeout(this.hideSbuContentOther.bind(this,i),10);
				}.bind(this));
				Event.observe(btn, 'mouseover', function() {
					Element.addClassName(btn, this.options.itDivCss +'-over');
				}.bind(this));
				Event.observe(btn, 'mouseout', function() {
					Element.removeClassName(btn, this.options.itDivCss +'-over');
				}.bind(this));
			}.bind(this));
		}

		
		$(this.options.placeIn).appendChild(divWin);
		
		setTimeout(this.buildSubContent.bind(this, 0), 10);
	},
	updateMenuData: function(menuData) {
		this.options.menuData = menuData;
		this.updateSubContent(0);
	},
	buildSubContent: function(index) {
		if (isNaN(index)) {return;}
		if (!this.options.menuData[index] || !this.elm_subCont[index]) {return;}
		if (this.elm_subCont[index].style.display != 'none' && this.elm_subCont[index].innerHTML == this.options.Lang.loading) {
			this.doBuildSubContent(index);
		}
		
		if (index < this.options.menuData.length-1) {
			setTimeout(this.buildSubContent.bind(this,index+1), 10);
		}
	},
	updateSubContent: function(index) {
		if (isNaN(index)) {return;}
		if (!this.options.menuData[index] || !this.elm_subCont[index]) {return;}
		if (this.elm_subCont[index].innerHTML != this.options.Lang.loading) {
			this.doBuildSubContent(index);
		}
		
		if (index < this.options.menuData.length-1) {
			setTimeout(this.updateSubContent.bind(this,index+1), 10);
		}
	},
	doBuildSubContent: function(index) {
		if (this.options.menuData[index].data.constructor == Array) {
			var divSubContent = this.getSubContent(index);
		}
		else if (this.options.menuData[index].data.constructor == Function) {
			var divSubContent = this.options.menuData[index].data(index);
		}
		
		if (this.elm_subCont[index].style.display == 'none') {
			Element.hide(divSubContent);
		}
		if (divSubContent.innerHTML == '') {
			divSubContent.innerHTML = this.options.noneInfo;
		}
		this.elm_subCont[index].parentNode.insertBefore(divSubContent, this.elm_subCont[index]);
		Element.remove(this.elm_subCont[index]);
		this.elm_subCont[index] = divSubContent;
	},

	getSubContent: function(index) {
		sm = this.options.menuData[index];
		
		var divSubContent = document.createElement('div');
		divSubContent.className = this.options.isDivCss +' clearfix';
		
		if (sm.isDivCssEx) {
			Element.addClassName(divSubContent, sm.isDivCssEx);
		}
		
		sm.data.each(function(si, i) {
			var si = {
				text: si.text || '',
				title: si.title || '',
				action: si.action || Prototype.emptyFunction,
				value: (si.value || !isNaN(si.value))? si.value : null,
				active: si.active || false,
				disabled: si.disabled || false
			};
			var divSI = document.createElement('div');
			divSI.className = this.options.sOutCss;
			if (si.active) {
				Element.addClassName(divSI, this.options.sActiveCss);
			}
			if (si.disabled) {
				Element.addClassName(divSI, this.options.sDisableCss);
			}
			divSI.innerHTML = si.text;
			if (si.text) {divSI.title = (si.title || si.text);}
			
			
			Event.observe(divSI, 'mouseover', function() {
				if (si.disabled) {return;}
				Element.addClassName(divSI, this.options.sOverCss);
			}.bind(this));
			Event.observe(divSI, 'mouseout', function() {
				if (si.disabled) {return;}
				Element.removeClassName(divSI, this.options.sOverCss);
				Element.removeClassName(divSI, this.options.sDownCss);
			}.bind(this));

			Event.observe(divSI, 'mousedown', function() {
				if (si.disabled) {return;}
				Element.addClassName(divSI, this.options.sDownCss);
			}.bind(this));
			Event.observe(divSI, 'mouseup', function() {
				if (si.disabled) {return;}
				Element.removeClassName(divSI, this.options.sDownCss);
			}.bind(this));
			Event.observe(divSI, 'click', function() {
				if (si.disabled) {return;}
				if (this.options.autoActive) {
					this.activeItem(index, i);
				}
				(si.action)(si.value);
				
				if (this.options.click2cls) {
					this.hide();
				}
			}.bind(this));
			divSubContent.appendChild(divSI);
		}.bind(this));
		
		return divSubContent;
	},
	show: function() {
		if (this.showing) {return;}
		if (!this.element) {this.buildWin();}
		this.element.style.position = 'absolute';
		var pos = Position.cumulativeOffset(this.options.btn);
		this.element.style.left = pos[0] + (this.options.displace[0] || 0 ) +'px';
		this.element.style.top = (pos[1] + (this.options.displace[1] || 0 ) + parseInt(this.options.btn.offsetHeight) + 2) +'px';
		this.element.style.zIndex = this.options.zIndex;
		
		if (Browser.ua.indexOf('ie')<0 && typeof Effect != 'undefined' && Effect) {
			Effect.Appear(this.element, {from: 0.0, to: 0.95, duration: 0.3, queue: {scope: 'optMenu', position: 'end'} });
			setTimeout(this.showFrm.bind(this), 400);
			if (this.options.shadow) {
				this.showShadow_2();
			}
		}
		else {
			Element.show(this.element);
			this.showFrm();
			if (this.options.shadow) {
				this.showShadow();
			}
		}
		
		this.showing = true;
		
		if (this.options.onShow) {
			(this.options.onShow)();
		}
	},

	hide: function() {
		if (!this.showing) {return;}
		if (!this.element) {return;}
		if (Browser.ua.indexOf('ie')<0 && typeof Effect != 'undefined' && Effect) {
			Effect.Fade(this.element, { duration: 0.3, queue:{scope: 'optMenu', position: 'end'} });
			if (this.options.shadow) {
				this.hideShadow_2();
			}
		}
		else {
			Element.hide(this.element);
			if (this.options.shadow) {
				this.hideShadow();
			}
		}
		this.hideFrm();
		this.showing = false;
		
		if (this.options.onHide) {
			(this.options.onHide)();
		}
	},
	showSubContentOther: function(j) {
		$A(this.elm_subTitle).each(function(st,i) {
			if (this.elm_subCont[i].style.display != 'none' || i == j) {
				throw $continue;
			}
			Element.removeClassName(st, this.options.itDivCss +'-out');
			Element.addClassName(st, this.options.itDivCss +'-active');
		}.bind(this));
		$A(this.elm_subCont).each(function(sc,i) {
			if (sc.style.display != 'none' || i == j) {
				throw $continue;
			}
			Element.show(sc);
			if (sc.innerHTML == this.options.Lang.loading) {
				setTimeout(this.buildSubContent.bind(this, i), 10);
			}
		}.bind(this));
	},
	hideSbuContentOther: function(j) {
		$A(this.elm_subTitle).each(function(st,i) {
			if (this.elm_subCont[i].style.display == 'none' || i == j) {
				throw $continue;
			}
			Element.removeClassName(st, this.options.itDivCss +'-active');
			Element.addClassName(st, this.options.itDivCss +'-out');
		}.bind(this));
		$A(this.elm_subCont).each(function(sc,i) {
			if (sc.style.display == 'none' || i == j) {
				throw $continue;
			}
			Element.hide(sc);
		}.bind(this));
	},
	activeItem: function(subContIndex, index) {
		$A(this.elm_subCont).each(function(sc, i) {
			if (!this.options.allInOne && i != subContIndex) {throw $continue;}
			if (sc.innerHTML == this.options.Lang.loading) {throw $continue;}
			$A(document.getElementsByClassName(this.options.sOutCss, sc, 'div')).each(function(btn, j) {
				if (!btn) {throw $break;}
				Element.removeClassName(btn, this.options.sActiveCss);
				if (subContIndex == i && index == j) {

					Element.addClassName(btn, this.options.sActiveCss);
				}
			}.bind(this));
		}.bind(this));
	},
	buildFrm: function() {
		var frm = document.createElement('iframe');
		this.elm_frm = frm;
		frm.style.position = 'absolute';
		frm.frameborder = '0';
		frm.style.border = 'none';
		Element.hide(frm);
		$(this.options.placeIn).appendChild(frm);
	},
	showFrm: function() {
		if (Browser.ua == 'ie5' || Browser.ua == 'other' || Browser.ua == 'ff') {return;}
		if (!this.elm_frm) {this.buildFrm();}
		if (this.elm_frm.offsetHeight != this.element.offsetHeight || this.elm_frm.offsetWidth != this.element.offsetWidth) {
			this.elm_frm.style.left = this.element.style.left;
			this.elm_frm.style.top = this.element.style.top;
			this.elm_frm.style.zIndex = this.options.zIndex-10;
			this.elm_frm.style.width = this.element.offsetWidth +'px';
			this.elm_frm.style.height = this.element.offsetHeight +'px';
			Element.show(this.elm_frm);
		}
		clearTimeout(this.frmTimeout);
		this.frmTimeout = null;
		this.frmTimeout = setTimeout(this.showFrm.bind(this), 100);
	},
	hideFrm: function() {
		if (!this.elm_frm) {return;}
		clearTimeout(this.frmTimeout);
		this.frmTimeout = null;
		this.elm_frm.style.height = '0px';
		Element.hide(this.elm_frm);
	},
	buildShadow: function() {
		var divShadow = document.createElement('div');
		this.elm_shadow = divShadow;
		divShadow.style.position = 'absolute';
		divShadow.style.background = '#333';
		if (Element.setOpacity) {
			Element.setOpacity(divShadow, 0.5);
		}
		Element.hide(divShadow);
		$(this.options.placeIn).appendChild(divShadow);
	},
	showShadow: function() {
		if (!this.elm_shadow) {this.buildShadow();}
		if (this.elm_shadow.offsetHeight != this.element.offsetHeight || this.elm_shadow.offsetWidth != this.element.offsetWidth) {
			this.elm_shadow.style.left = parseInt(this.element.style.left) + 4 +'px';
			this.elm_shadow.style.top = parseInt(this.element.style.top) + 4 +'px';
			this.elm_shadow.style.zIndex = this.options.zIndex-1;
			this.elm_shadow.style.width = this.element.offsetWidth +'px';
			this.elm_shadow.style.height = this.element.offsetHeight +'px';
			Element.show(this.elm_shadow);
		}
		clearTimeout(this.shadowTimeout);
		this.shadowTimeout = null;
		this.shadowTimeout = setTimeout(this.showShadow.bind(this), 100);
	},
	hideShadow: function() {
		if (!this.elm_shadow) {return;}
		clearTimeout(this.shadowTimeout);
		this.shadowTimeout = null;
		this.elm_shadow.style.height = '0px';
		Element.hide(this.elm_shadow);
	},
	buildShadow_2: function() {
		var divShadow_r = document.createElement('div');
		var divShadow_b = document.createElement('div');
		this.elm_shadow_r = divShadow_r;
		this.elm_shadow_b = divShadow_b;
		divShadow_r.style.position = 'absolute';
		divShadow_b.style.position = 'absolute';
		divShadow_r.style.background = '#333';
		divShadow_b.style.background = '#333';
		/*if (Element.setOpacity) {
			Element.setOpacity(divShadow_r, 0.5);
			Element.setOpacity(divShadow_b, 0.5);
		}*/
		Element.hide(divShadow_r);
		Element.hide(divShadow_b);
		$(this.options.placeIn).appendChild(divShadow_r);
		$(this.options.placeIn).appendChild(divShadow_b);
	},
	showShadow_2: function() {
		if (!this.elm_shadow_r || !this.elm_shadow_b) {this.buildShadow_2();}
		if (this.elm_shadow_r.offsetHeight != this.element.offsetHeight || this.elm_shadow_b.offsetWidth != this.element.offsetWidth-this.options.shadowOffset) {
			this.elm_shadow_r.style.left = parseInt(this.element.style.left) + parseInt(this.element.offsetWidth) +'px';
			this.elm_shadow_r.style.top = parseInt(this.element.style.top) + this.options.shadowOffset +'px';
			
			this.elm_shadow_b.style.left = parseInt(this.element.style.left) + this.options.shadowOffset +'px';
			this.elm_shadow_b.style.top = parseInt(this.element.style.top) + parseInt(this.element.offsetHeight) +'px';
			
			this.elm_shadow_r.style.zIndex = this.options.zIndex-1;
			this.elm_shadow_b.style.zIndex = this.options.zIndex-1;
			
			this.elm_shadow_r.style.width = this.options.shadowOffset +'px';
			this.elm_shadow_r.style.height = this.element.offsetHeight +'px';
			
			this.elm_shadow_b.style.width = this.element.offsetWidth - this.options.shadowOffset +'px';
			this.elm_shadow_b.style.height = this.options.shadowOffset +'px';
			
			//Element.show(this.elm_shadow_r, this.elm_shadow_b);
		}
		if (!this.showing) {
			Effect.Appear(this.elm_shadow_r, {from: 0.0, to: 0.5, duration: 0.3, queue: {scope: 'optMenuShadow_r', position: 'end'} });
			Effect.Appear(this.elm_shadow_b, {from: 0.0, to: 0.5, duration: 0.3, queue: {scope: 'optMenuShadow_b', position: 'end'} });
		}
		
		clearTimeout(this.shadowTimeout);
		this.shadowTimeout = null;
		this.shadowTimeout = setTimeout(this.showShadow_2.bind(this), 100);
	},
	hideShadow_2: function() {
		if (!this.elm_shadow_r || !this.elm_shadow_b) {return;}
		clearTimeout(this.shadowTimeout);
		this.shadowTimeout = null;
		this.elm_shadow_r.style.height = '0px';
		this.elm_shadow_b.style.width = '0px';
		
		Effect.Fade(this.elm_shadow_r, { duration: 0.3, queue:{scope: 'optMenuShadow_r', position: 'end'} });
		Effect.Fade(this.elm_shadow_b, { duration: 0.3, queue:{scope: 'optMenuShadow_b', position: 'end'} });
		//Element.hide(this.elm_shadow_r, this.elm_shadow_b);
	}
};


// infinite levels selecter menu
var SelecterMenu = Class.create();
SelecterMenu.prototype = {
	initialize: function(element, dataUrl, options) {
		this.element = $(element);
		this.levels = [];
		this.dataUrl = dataUrl;
		this.options = Object.extend({
			startId: 0,
			variablePrefix: 'sel_',
			selectPerfix: 'sel_level_',
			defaultActive: []
		}, options || {});
		this.buildLevelOne(0, this.options.startId);
	},
	getLevelBySelId: function(id) {
		return this.levels.find(function(s) {
			return (s.sel == id);
		});
	},
	destroyLevelFollow: function(level) {
		var ln = this.levels.length;
		for (var i = ln-1; i>=level; i--) {
			this.destroyLevelOne(i);
		}
	},
	destroyLevelOne: function(level) {
		if (!this.levels[level]) {return;}
		Element.remove(this.levels[level].element);
		
		this.levels = this.levels.reject(function(m, i) {
			return i==level; 
		});
	}, 
	buildLevelOne: function(level, id) {
		if (!this.levels[level]) {
			var elm_spanBox = document.createElement('span');
			this.levels[level] = {
				element: elm_spanBox
			};
			this.element.appendChild(elm_spanBox);
		}
		this.levels[level].	selId = id,
		this.levels[level].element.innerHTML = 'loading...';
		
		this.loadDataOne(level, id);
	},
	loadDataOne: function(level, id) {
		if (this.loadDataHandle) {this.loadDataHandle.stop();}
		var url = '';
		if (this.dataUrl.constructor == String) {
			url += this.dataUrl;
			if (url.indexOf('?') > 0) {
				url += '&id='+ id;
			}
			else {
				url += '?id='+ id;
			}
		}
		else if (this.dataUrl.constructor == Function) {
			url = this.dataUrl(id);
		}
		
		if (eval('typeof '+this.options.variablePrefix + id +' == "undefined"')) {
			this.loadDataHandle = new LinkFile(url, {
						type: 'script',
						//noCache: noCache,
						callBack: {
							variable: this.options.variablePrefix + id,
							onLoad: this.buildSelOne.bind(this, level),
							onFailure: this.destroyLevelFollow.bind(this, level)
							/*timeout: 20,
							timerStep: 500*/
						}});
		}
		else {
			this.buildSelOne(level);
		}
	},
	buildSelOne: function(level) {
		var obj_level = this.levels[level];
		if (!obj_level) {return;}
		obj_level.data = eval(this.options.variablePrefix + obj_level.selId);
		if (!obj_level.data) {return;}
		
		var elm_sel = document.createElement('select');
		this.levels[level].elm_sel = elm_sel;
		elm_sel.name = this.options.selectPerfix + level;
		
		var i = 0;
		elm_sel.options[i++] = new Option('----', '');
		var cat = '';
		$A(obj_level.data).each(function(opt) {
			if (opt.cat && opt.cat != cat) {
				cat = opt.cat;
				elm_sel.options[i++] = new Option('---- == '+ opt.cat +' == ----', '');
			}
			elm_sel.options[i++] = new Option(opt.name, opt.id);
		});
		
		Event.observe(elm_sel, 'change', function(){
			this.changeOpt(level, elm_sel.value);
		}.bindAsEventListener(this));
			
		obj_level.element.innerHTML = '';
		obj_level.element.appendChild(elm_sel);
		try{
			elm_sel.focus();
		}catch(e){}
	},
	changeOpt: function(level, id) {
		var obj_level = this.levels[level];
		if (!obj_level) {return;}
		
		this.destroyLevelFollow(level+1);
		if (!id) {return;}
		var opt = $A(obj_level.data).find(function(o) {
			return (o.id == id);
		});
		if (!opt) {return;}
		if (opt.hasC == '1') {
			this.buildLevelOne(level+1, id);
		}
	},
	getValues: function() {
		return (this.levels.map(function(l) {
			if (l.elm_sel) {
				return l.elm_sel.value;
			}
			else {
				return null;
			}
		}));
	}
};

/*
	图片上传负载均衡，使用之前首先需要再加一个属性，例子如下：
	imgSvrAllot.servers = [
		["44", 3],
		["45", 3],
		["64", 1],
		["114", 1]
	];
*/
var imgSvrAllot = {
	type: {
		local:		"blog.do",			//	本地
		avatar:		"blogo.do",			//	头像
		toolbar:	"blog/tbUpload.do",	//	地址栏
		customTheme:	"blogbkUpload.do"
	},
	
	getUrl: function(type){
		var url = "http://" + id + ".pp.sohu.com/" + imgSvrAllot.type[type];
		return url;
	}
};
/********* sohu im ********/
var webim_config = {
	product: "sohu/blog",
	cm_menu_width: "90",
	/*
	categoryGroups: ['sohu/blog'],
	showGroup:'sohu/blog',
	*/
	cm_showtip:false,
	load_panel:true,
	cm_GenMenu: function(candleman, menu){
		for (var i = menu.length-1; i >= 0; i--) {
			if (menu[i].n == "传纸条") {
				menu[i].n = "发送小纸条";
				menu[i].t = "给 $NICK 传小纸条";
			}
			if (menu[i].n == "加为好友") {
				menu[i].n = "加为小纸条好友";
				menu[i].t = "加 $NICK 为小纸条好友";
			}
		}
	},
	cm_menu: [
		{
			id: "poke", 
			n: "向他打招呼",
			t: "向他打招呼",
			c: function(cm) {
				if (typeof(pokeHe) == 'function') pokeHe(cm._id);
				else window.open('http://poke.blog.sohu.com/pop/poking.do?actId=1&pp='+cm._id, '_blank', 'width=630,height=470');
			}
		}
	]
};
var SohuIM = {
	setCandleMenParam: function() {
		var elm_cm = document.getElementsByName('onlineIcon');
		if (elm_cm && elm_cm.length > 0) {
			$A(elm_cm).each(function(e) {
				if ((e.getAttribute('param') || e.param) && (!e.rel || e.rel == '')) {
					var _params = (e.getAttribute('param') || e.param).split(';');
					e.rel = b64_decodex(_params[0]) +';'+ _params[1];
				}
			});
		}
	}
};
/********* sohu im end ********/
/******* Common Js for Sohu Blog end **********/
