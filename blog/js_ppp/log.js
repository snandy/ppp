// An implementation of the debug log. 

var logging__ = true;

function Log() {};

Log.lines = [];

Log.write = function(s) {
  if (logging__) {
    this.lines.push(xmlEscapeText(s));
    this.show();
  }
};

// Writes the given XML with every tag on a new line.
Log.writeXML = function(xml) {
  if (logging__) {
    var s0 = xml.replace(/</g, '\n<');
    var s1 = xmlEscapeText(s0);
    var s2 = s1.replace(/\s*\n(\s|\n)*/g, '<br/>');
    this.lines.push(s2);
    this.show();
  }
};

// Writes without any escaping
Log.writeRaw = function(s) {
  if (logging__) {
    this.lines.push(s);
    this.show();
  }
};

Log.clear = function() {
  if (logging__) {
    var l = this.div();
    l.innerHTML = '';
    this.lines = [];
  }
};

Log.show = function() {
  var l = this.div();
  l.innerHTML += this.lines.join('<br/>') + '<br/>';
  this.lines = [];
  l.scrollTop = l.scrollHeight;
};

Log.showIt = function() {
  var l = window.parent? window.parent.document.getElementById('log') : document.getElementById('log');
  if (!l) {return;}
  if (parseInt(l.style.height) > 20) {
	return;
  }
  l.style.width = '500px';
  l.style.height = '100px';
  l.ondblclick = Log.hideIt.bind(Log);
}
Log.hideIt = function() {
  var l = window.parent? window.parent.document.getElementById('log') : document.getElementById('log');
  if (!l) {return;}
  l.style.width = '50px';
  l.style.height = '0px';
  l.ondblclick = Log.showIt.bind(Log);
};

Log.div = function() {
  var l = window.parent? window.parent.document.getElementById('log') : document.getElementById('log');
  if (!l) {
    l = (window.parent? window.parent.document : document).createElement('div');
    l.id = 'log';
    l.style.position = 'absolute';
    l.style.right = '0px';
    l.style.top = '30px';
    //l.style.width = '500px';
    //l.style.height = '100px';
    l.style.overflow = 'auto';
    l.style.overflowX = 'hidden';
    l.style.backgroundColor = '#f0f0f0';
    l.style.border = '1px solid gray';
	l.style.fontFamily = 'Verdana, Arial, Helvetica, sans-serif';
    l.style.fontSize = '10px';
    l.style.padding = '5px';
	try{
		(window.parent? window.parent.document : document).body.appendChild(l);
	}catch(e){}
  }
  Log.showIt();
  return l;
};


function xmlEscapeText(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

Function.prototype.bind = function(object) {
  var __method = this;
  return function() {
    __method.apply(object, arguments);
  }
};

Log.writeRunLogging = false;
Log.writeRunLogStartTime = 0;
Log.writeRunLogTempTime = 0;
Log.writeRunLog = function(s) {
	var t = new Date();
	if (Log.writeRunLogging) {
		var time = t.getTime();
		s = '+'+ (time-Log.writeRunLogStartTime) +'('+ (time-Log.writeRunLogTempTime) +') | '+ s;
		Log.writeRunLogTempTime = time;
	}
	else {
		Log.writeRunLogging = true;
		Log.writeRunLogStartTime = Log.writeRunLogTempTime = t.getTime();
		var time = t.getFullYear() +'-'+ (t.getMonth()+1) +'-'+ t.getDate();
		time += ' '+ t.getHours() +':'+ t.getMinutes() +':'+ t.getSeconds() +'.'+ t.getMilliseconds();
		s = time +' | '+ s;
	}
	Log.writeRaw(s);
};

var $L  = Log.write.bind(Log);
var $LX = Log.writeXML.bind(Log);
var $LR = Log.writeRaw.bind(Log);
var $LC = Log.clear.bind(Log);
var $LT = Log.writeRunLog.bind(Log);
Log.ableLogTime = false;
if (location.search.indexOf('ableLogTime=true')>0) {
	Log.ableLogTime = true;
}
if (Log.ableLogTime) {
$LT('sohu blog log start')
}
