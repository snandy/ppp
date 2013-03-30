var fs  = require('fs'); 
var jsp = require("./uglifyJS/uglify-js").parser;
var pro = require("./uglifyJS/uglify-js").uglify;


function readFile(file) {
	return fs.readFileSync(file, 'utf8');
}

function writeFile(fname, str) {
	fs.writeFileSync(fname, str, 'utf8');
}

function exists(path) {
	if (path.charAt(path.length - 1) === '/' &&
		path.charAt(path.length - 2) !== ':') {
		path = path.substring(0, path.length - 1);
	}

	try {
		fs.statSync(path);
		return true;
	} catch (e) {
		return false;
	}
}

function mkDir(dir) {
	if (!exists(dir)) {
		fs.mkdirSync(dir, 511);
	}
}

function mkFullDir(dir) {
	var parts = dir.split('/'),
		currDir = '',
		first = true;

	parts.forEach(function (part) {
		//First part may be empty string if path starts with a slash.
		currDir += part + '/';
		first = false;

		if (part) {
			mkDir(currDir);
		}
	});
}

function isFile(path) {
	return fs.statSync(path).isFile();
}

function isDirectory(path) {
	return fs.statSync(path).isDirectory();
}

function renameFile(from, to) {
	return fs.renameSync(from, to);
}

/**
 * type 
 * 1: 基本压缩 去注释，换行，回车
 * 2: 变量替换
 */
function compress(origCode, type) {
	var finalCode, type;
	
	type = type || 1;
	
	// 基本压缩 去注释，换行，回车
	if (type==1) {
		var ast = jsp.parse(origCode);
	}
	
	// 变量,函数名替换
	if (type==2) {
		ast = pro.ast_mangle(ast);
		ast = pro.ast_squeeze(ast);
	}
		
	// ast = pro.ast_lift_variables(ast);
	var finalCode = pro.gen_code(ast);
	
	return finalCode;
}

// buildOne('../modJS/scripts/es5.js', 'es5.js');
function buildOne(flieIn, fileOut) {
	var origCode = readFile(fileIn);
	var finalCode = compress(origCode);
	fs.writeFile(fileOut, finalCode);
}

// 压缩指定目录下的所有js文件，输出到同目录下的xx-bulit
function bulidDir(path) {
	var dir = fs.readdirSync(path);
	var newpath = path + '-built';
	
	fs.mkdir(newpath, function(ex) {
		dir.forEach(function(v) {
			buildOne(v, newpath + '/' + v);
		});
	});

}
// bulidDir('ajax');

// 合并指定目录下的所有文件
function merge(path) {
	var dir = fs.readdirSync(path);
	
	return dir.map(function(v) {
		return readFile(v);
	}).join('');
}


var intro = function() {
	var date = new Date,
		h = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds();
	
	h = h<10 ? '0'+h : h;
	m = m<10 ? '0'+m : m;
	s = s<10 ? '0'+s : s;
	
	var str = 	'/**\n' +
				' * Author: @snandy\n' +
				' * Date: ' + date.getFullYear() + '-' + 
							  (date.getMonth()+1) + '-' + 
							  date.getDate() + ' ' +
							  h + ':' +
							  m + ':' +
							  s + '\n' +
				' */\n';
	
	return str;
}();

// writeFile('merge.js', compress(merge('ajax')))
// var source = 'E:/work/ppp/blog/js_ppp/dialog_src.js';
// var target = 'E:/work/ppp/blog/js_ppp/dialog.js';

var source = 'E:/work/ppp/blog/js_ppp/common_src.js';
var target = 'E:/work/ppp/blog/js_ppp/common.js';

// var source = 'E:/work/ppp/js/common/common_src.js';
// var target = 'E:/work/ppp/js/common/commonaaa.js';

// var source = 'E:/work/ppp/blog/js_ppp/app_src.js';
// var target = 'E:/work/ppp/blog/js_ppp/app.js';

// var source = 'E:/work/ppp/blog/js_ppp/appOpt_src.js';
// var target = 'E:/work/ppp/blog/js_ppp/appOpt.js';

// var source = 'E:/work/ppp/blog/js_ppp/lang_zh_src.js';
// var target = 'E:/work/ppp/blog/js_ppp/lang_zh.js';

// var source = 'E:/work/zchain/$/zchain-0.1.js';
// var target = 'E:/work/zchain/$/zchain1.js';

// var source = 'E:/work/base/jstest/jquery-1.7.2rc1.js';
// var target = 'E:/work/base/jstest/jquery-1.7.2-2.js';

// var source = 'E:/work/ppp/blog/js_ppp/sohublog_src.js';
// var target = 'E:/work/ppp/blog/js_ppp/sohublog.js';

// var source = 'E:/work/base/dojo/dojo.js';
// var target = 'E:/work/base/dojo/dojo.min.js';

var str = readFile(source);
writeFile(target, intro + compress(str));
// mkFullDir('a/b/c/d.js')
