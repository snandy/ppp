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
function compress(origCode) {
	var finalCode;

	var ast = jsp.parse(origCode);
	ast = pro.ast_mangle(ast);
	ast = pro.ast_squeeze(ast);
		
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

// 合并多个文件
function mergeFile(/*file1, file2, file3, ..*/) {
	var arr = [];
	for (var file, i=0; i<arguments.length; i++) {
		arr[i] = readFile(arguments[i]);
	}
	return arr.join('');
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
// var source = 'blog/js_ppp/dialog_src.js';
// var target = 'blog/js_ppp/dialog.js';

var source = 'blog/js_ppp/common_src.js';
var target = 'blog/js_ppp/common.js';

//var source = 'blog/js/pp18030_all_source.js';
//var target = 'blog/js/pp18030_all.js';

// var source = 'ppp/js/common/common_src.js';
// var target = 'ppp/js/common/commonaaa.js';

// var source = 'blog/js_ppp/app_src.js';
// var target = 'blog/js_ppp/app.js';

// var source = 'blog/js_ppp/appOpt_src.js';
// var target = 'blog/js_ppp/appOpt.js';

// var source = 'ppp/blog/js_ppp/lang_zh_src.js';
// var target = 'ppp/blog/js_ppp/lang_zh.js';

// var source = 'ppp/blog/js_ppp/sohublog_src.js';
// var target = 'ppp/blog/js_ppp/sohublog.js';

//var source = 'blog/js/editor_common_src.js';
//var target = 'blog/js/editor_common.js';

//var source = 'blog/js/editor_config_src.js';
//var target = 'blog/js/editor_config.js';

// var source = mergeFile('blog/js/editor_common.js', 'blog/js/editor_config.js');
// var target = 'blog/js/editor.js';
// writeFile(target, intro + source);

// writeFile(target, intro + compress(source));

var str = readFile(source);
writeFile(target, intro + compress(str));
// mkFullDir('a/b/c/d.js')