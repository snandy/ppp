/**
 * @license sohu blog editor
 * 
 * 2012-4-11 by snandy 优化 变量Config.temp减少重复代码
 * 
 */

~function() {
	var Config = Editor.Config;

	//	工具栏中的工具配置信息
	Config.tool.data = 
	[
		[
			[
				["bimg","paste","粘贴",Editor.paste,Editor.blankUpCall,Editor.blankCall,Editor.normalCancelCall]
			]
		],
		[
			[
				["img","cut","剪切",Editor.cut,Editor.blankUpCall,Editor.blankCall,Editor.normalCancelCall]
			],
			[
				["img","copy","复制",Editor.copy,Editor.blankUpCall,Editor.blankCall,Editor.normalCancelCall]			
			]
		],
		[[["line","line"]]],
		[
			[
				["select","fontname","字体",Editor.showFontNameList,Editor.hideFontNameList,Editor.setFontName,Editor.cancelFontName],
				["select","fontsize","字号",Editor.showFontSizeList,Editor.hideFontSizeList,Editor.setFontSize,Editor.cancelFontSize]
			],
			[
				["img","bold","粗体",Editor.setBold,Editor.clearBold],
				["img","italic","斜体",Editor.setItalic],
				["img","underline","下划线",Editor.setUnderline],
				["img","forecolor","文字颜色",Editor.showForeColorList,Editor.hideForeColorList,Editor.setForeColor,Editor.cancelForeColor],
				["img","backcolor","背景颜色",Editor.showBackColorList,Editor.hideBackColorList,Editor.setBackColor,Editor.cancelBackColor],
				["img","url","插入超链接",Editor.showLink,Editor.clearLink,Editor.addLink,Editor.cancelLinkCall],
				["img","emot","插入表情",Editor.showBrow,Editor.hideBrow,Editor.addBrow,Editor.cancelBrowCall]
			]
		],
		[[["line","line"]]],
		[[["line","line"]]],
		[[["line","line"]]],
		[[["line","line"]]],
		[[["line","line"]]],
		[
			[
				["img","justifyleft","左对齐",Editor.setLeft,Editor.setLeft],
				["img","justifycenter","居中",Editor.setCenter,Editor.setCenter],
				["img","justifyright","右对齐",Editor.setRight,Editor.setRight]
			],
			[
				["img","orderlist","数字列表",Editor.setOrder,Editor.setOrder],
				["img","unorderlist","符号列表",Editor.setUnorder,Editor.setUnorder],
				["img","indent","增大缩进",Editor.setIndent],
				["img","outdent","减小缩进",Editor.setOutdent]
			]
		],
		[[["line","line"]]],
		[
			[
				["bimg","relative_mini", "插入相关微博", Editor.showRelativeMini, Editor.showRelativeMini, Editor.addRelativeMini, Editor.cancelRelativeMiniCall]
			]
		],
		[
			[
				["bimg", "relative_s", "插入相关博文", Editor.showRelative, Editor.showRelative, Editor.addRelative, Editor.cancelRelativeCall]
			]
		],[
			[
				["bimg", "simg", "插入图片", Editor.showImg, Editor.showImg, Editor.addImg, Editor.cancelImgCall]
			]
		],
		[
			[
				["bimg", "svideo", "插入视频", Editor.showMv, Editor.showMv, Editor.addMv, Editor.cancelMvCall]
			]
		],
		[
			[
				["bimg", "smusic", "插入音乐", Editor.showMusic]
			]
		],	
		[
			[["line","line"]]
		],
		[
			[
				["bimg", "undo", "撤销上一步操作", Editor.undo, Editor.undo]
			]
		]
	];
	//	与工具栏相关的css属性配置数据
	Config.tool.css = {
		row: "tool_row",
		newLine: "newLine",
		part: "tool_part",
		tool: "tool_tool",
		toolOver: "tool_over",
		toolDown: "tool_down",
		toolDisable: "tool_disable",
		toolBig: "b_tool_tool",
		toolOverBig: "b_tool_over",
		toolDownBig: "b_tool_down",
		toolDisableBig: "b_tool_disable",
		editor: "editor",
		cache: "editor_cache",
		footer: "editor_footer clearfix",
		coder: "editor_coder2"
	};

	//	----------------------  下面为针对需要打开新页面功能的配置  ----------------------
	Config.pager = {};
	Config.pager.option = {
		coverClass:"cover",			//	覆盖整个页面的层的css
		containerClass:"pager",		//	显示新页面的容器（div）的css
		loadingClass:"loading"		//	显示loading的css
	};

	//	----------------------  下面是显示列表的配置  ----------------------
	Config.lister = {};
	Config.temp = '<div style="width:10px;height:11px;overflow:hidden;background-color:';
	Config.lister.option = {
		containerClass:"lister",	//	列表容器的css
		itemClass:"listerItem",		//	列表中项的css
		itemOverClass:"listerItem_over"	//	列表中项的css
	};
	Config.lister.mapData = {
		type: "manual2",
		content: '<form action="#" onsubmit="Editor.checkMapInput($(\'editorMapInput\'));return false;"><div style="background:#eee;padding:3px 5px;margin-bottom:2px;"><img src="http://img3.pp.sohu.com/ppp/blog/styles/images/editor/arr.gif" />&nbsp;插入地图</div><div style="width:120px;padding:5px;"><div style="margin-bottom:3px;">请填入地图关键词：</div><div style="margin-bottom:3px;"><input id="editorMapInput" name="editorMapInput" size=16 class="input" /></div><div style="text-align:center;"><input type="submit" value="搜索" class="button" /></div></div></form>',
		init: "Editor.initMapInput($('editorMapInput'))"
	};
	Config.lister.fontNameData = {
		type:"auto",
		pattern:'<div style="float:left;width:130px;text-align:center;font-size:12pt;"><div style="font-family:$=value$">$=text$</div></div>',
		text:['宋体','黑体','隶书','楷体','幼圆','Arial','Impact','Georgia','Verdana','Courier New','Times New Roman'],
		value:['宋体','黑体','隶书','楷体_GB2312','幼圆','Arial','Impact','Georgia','Verdana','Courier New','Times New Roman']
	};
	Config.lister.fontSizeData = {
		type:"auto",
		pattern:'<div style="float:left;width:100px;text-align:center;"><div class="fontSizee$=value$" >$=text$</div></div>',
		text:['初号','一号','二号','三号','四号','五号','六号'],
		value:[7,6,5,4,3,2,1]
	};
	Config.lister.colorData = {
		type:"manual",
		itemClass:"colorItem",
		itemOverClass:"colorItem_over",
		value:	[
			['<div style="overflow:hidden;color:#000000;height:15px;width:229px;border:1px solid #dbd8d1;float:left;text-align:center;font-size:13px;margin-bottom:1px;">自动颜色</div>','#'],
			[false,false],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#003300;"></div>','#003300'],
			[Config.temp + '#006600;"></div>','#006600'],
			[Config.temp + '#009900;"></div>','#009900'],
			[Config.temp + '#00CC00;"></div>','#00CC00'],
			[Config.temp + '#00FF00;"></div>','#00FF00'],
			[Config.temp + '#330000;"></div>','#330000'],
			[Config.temp + '#333300;"></div>','#333300'],
			[Config.temp + '#336600;"></div>','#336600'],
			[Config.temp + '#339900;"></div>','#339900'],
			[Config.temp + '#33CC00;"></div>','#33CC00'],
			[Config.temp + '#33FF00;"></div>','#33FF00'],
			[Config.temp + '#660000;"></div>','#660000'],
			[Config.temp + '#663300;"></div>','#663300'],
			[Config.temp + '#666600;"></div>','#666600'],
			[Config.temp + '#669900;"></div>','#669900'],
			[Config.temp + '#66CC00;"></div>','#66CC00'],
			[Config.temp + '#66FF00;"></div>','#66FF00'],
			[false,false],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#333333;"></div>','#333333'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#000033;"></div>','#000033'],
			[Config.temp + '#003333;"></div>','#003333'],
			[Config.temp + '#006633;"></div>','#006633'],
			[Config.temp + '#009933;"></div>','#009933'],
			[Config.temp + '#00CC33;"></div>','#00CC33'],
			[Config.temp + '#00FF33;"></div>','#00FF33'],
			[Config.temp + '#330033;"></div>','#330033'],
			[Config.temp + '#333333;"></div>','#333333'],
			[Config.temp + '#336633;"></div>','#336633'],
			[Config.temp + '#339933;"></div>','#339933'],
			[Config.temp + '#33CC33;"></div>','#33CC33'],
			[Config.temp + '#33FF33;"></div>','#33FF33'],
			[Config.temp + '#660033;"></div>','#660033'],
			[Config.temp + '#663333;"></div>','#663333'],
			[Config.temp + '#666633;"></div>','#666633'],
			[Config.temp + '#669933;"></div>','#669933'],
			[Config.temp + '#66CC33;"></div>','#66CC33'],
			[Config.temp + '#66FF33;"></div>','#66FF33'],
			[false,false],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#666666;"></div>','#666666'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#000066;"></div>','#000066'],
			[Config.temp + '#003366;"></div>','#003366'],
			[Config.temp + '#006666;"></div>','#006666'],
			[Config.temp + '#009966;"></div>','#009966'],
			[Config.temp + '#00CC66;"></div>','#00CC66'],
			[Config.temp + '#00FF66;"></div>','#00FF66'],
			[Config.temp + '#330066;"></div>','#330066'],
			[Config.temp + '#333366;"></div>','#333366'],
			[Config.temp + '#336666;"></div>','#336666'],
			[Config.temp + '#339966;"></div>','#339966'],
			[Config.temp + '#33CC66;"></div>','#33CC66'],
			[Config.temp + '#33FF66;"></div>','#33FF66'],
			[Config.temp + '#660066;"></div>','#660066'],
			[Config.temp + '#663366;"></div>','#663366'],
			[Config.temp + '#666666;"></div>','#666666'],
			[Config.temp + '#669966;"></div>','#669966'],
			[Config.temp + '#66CC66;"></div>','#66CC66'],
			[Config.temp + '#66FF66;"></div>','#66FF66'],
			[false,false],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#999999;"></div>','#999999'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#000099;"></div>','#000099'],
			[Config.temp + '#003399;"></div>','#003399'],
			[Config.temp + '#006699;"></div>','#006699'],
			[Config.temp + '#009999;"></div>','#009999'],
			[Config.temp + '#00CC99;"></div>','#00CC99'],
			[Config.temp + '#00FF99;"></div>','#00FF99'],
			[Config.temp + '#330099;"></div>','#330099'],
			[Config.temp + '#333399;"></div>','#333399'],
			[Config.temp + '#336699;"></div>','#336699'],
			[Config.temp + '#339999;"></div>','#339999'],
			[Config.temp + '#33CC99;"></div>','#33CC99'],
			[Config.temp + '#33FF99;"></div>','#33FF99'],
			[Config.temp + '#660099;"></div>','#660099'],
			[Config.temp + '#663399;"></div>','#663399'],
			[Config.temp + '#666699;"></div>','#666699'],
			[Config.temp + '#669999;"></div>','#669999'],
			[Config.temp + '#66CC99;"></div>','#66CC99'],
			[Config.temp + '#66FF99;"></div>','#66FF99'],
			[false,false],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#CCCCCC;"></div>','#CCCCCC'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#0000CC;"></div>','#0000CC'],
			[Config.temp + '#0033CC;"></div>','#0033CC'],
			[Config.temp + '#0066CC;"></div>','#0066CC'],
			[Config.temp + '#0099CC;"></div>','#0099CC'],
			[Config.temp + '#00CCCC;"></div>','#00CCCC'],
			[Config.temp + '#00FFCC;"></div>','#00FFCC'],
			[Config.temp + '#3300CC;"></div>','#3300CC'],
			[Config.temp + '#3333CC;"></div>','#3333CC'],
			[Config.temp + '#3366CC;"></div>','#3366CC'],
			[Config.temp + '#3399CC;"></div>','#3399CC'],
			[Config.temp + '#33CCCC;"></div>','#33CCCC'],
			[Config.temp + '#33FFCC;"></div>','#33FFCC'],
			[Config.temp + '#6600CC;"></div>','#6600CC'],
			[Config.temp + '#6633CC;"></div>','#6633CC'],
			[Config.temp + '#6666CC;"></div>','#6666CC'],
			[Config.temp + '#6699CC;"></div>','#6699CC'],
			[Config.temp + '#66CCCC;"></div>','#66CCCC'],
			[Config.temp + '#66FFCC;"></div>','#66FFCC'],
			[false,false],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#FFFFFF;"></div>','#FFFFFF'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#0000FF;"></div>','#0000FF'],
			[Config.temp + '#0033FF;"></div>','#0033FF'],
			[Config.temp + '#0066FF;"></div>','#0066FF'],
			[Config.temp + '#0099FF;"></div>','#0099FF'],
			[Config.temp + '#00CCFF;"></div>','#00CCFF'],
			[Config.temp + '#00FFFF;"></div>','#00FFFF'],
			[Config.temp + '#3300FF;"></div>','#3300FF'],
			[Config.temp + '#3333FF;"></div>','#3333FF'],
			[Config.temp + '#3366FF;"></div>','#3366FF'],
			[Config.temp + '#3399FF;"></div>','#3399FF'],
			[Config.temp + '#33CCFF;"></div>','#33CCFF'],
			[Config.temp + '#33FFFF;"></div>','#33FFFF'],
			[Config.temp + '#6600FF;"></div>','#6600FF'],
			[Config.temp + '#6633FF;"></div>','#6633FF'],
			[Config.temp + '#6666FF;"></div>','#6666FF'],
			[Config.temp + '#6699FF;"></div>','#6699FF'],
			[Config.temp + '#66CCFF;"></div>','#66CCFF'],
			[Config.temp + '#66FFFF;"></div>','#66FFFF'],
			[false,false],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#FF0000;"></div>','#FF0000'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#990000;"></div>','#990000'],
			[Config.temp + '#993300;"></div>','#993300'],
			[Config.temp + '#996600;"></div>','#996600'],
			[Config.temp + '#999900;"></div>','#999900'],
			[Config.temp + '#99CC00;"></div>','#99CC00'],
			[Config.temp + '#99FF00;"></div>','#99FF00'],
			[Config.temp + '#CC0000;"></div>','#CC0000'],
			[Config.temp + '#CC3300;"></div>','#CC3300'],
			[Config.temp + '#CC6600;"></div>','#CC6600'],
			[Config.temp + '#CC9900;"></div>','#CC9900'],
			[Config.temp + '#CCCC00;"></div>','#CCCC00'],
			[Config.temp + '#CCFF00;"></div>','#CCFF00'],
			[Config.temp + '#FF0000;"></div>','#FF0000'],
			[Config.temp + '#FF3300;"></div>','#FF3300'],
			[Config.temp + '#FF6600;"></div>','#FF6600'],
			[Config.temp + '#FF9900;"></div>','#FF9900'],
			[Config.temp + '#FFCC00;"></div>','#FFCC00'],
			[Config.temp + '#FFFF00;"></div>','#FFFF00'],
			[false,false],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#00FF00;"></div>','#00FF00'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#990033;"></div>','#990033'],
			[Config.temp + '#993333;"></div>','#993333'],
			[Config.temp + '#996633;"></div>','#996633'],
			[Config.temp + '#999933;"></div>','#999933'],
			[Config.temp + '#99CC33;"></div>','#99CC33'],
			[Config.temp + '#99FF33;"></div>','#99FF33'],
			[Config.temp + '#CC0033;"></div>','#CC0033'],
			[Config.temp + '#CC3333;"></div>','#CC3333'],
			[Config.temp + '#CC6633;"></div>','#CC6633'],
			[Config.temp + '#CC9933;"></div>','#CC9933'],
			[Config.temp + '#CCCC33;"></div>','#CCCC33'],
			[Config.temp + '#CCFF33;"></div>','#CCFF33'],
			[Config.temp + '#FF0033;"></div>','#FF0033'],
			[Config.temp + '#FF3333;"></div>','#FF3333'],
			[Config.temp + '#FF6633;"></div>','#FF6633'],
			[Config.temp + '#FF9933;"></div>','#FF9933'],
			[Config.temp + '#FFCC33;"></div>','#FFCC33'],
			[Config.temp + '#FFFF33;"></div>','#FFFF33'],
			[false,false],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#0000FF;"></div>','#0000FF'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#990066;"></div>','#990066'],
			[Config.temp + '#993366;"></div>','#993366'],
			[Config.temp + '#996666;"></div>','#996666'],
			[Config.temp + '#999966;"></div>','#999966'],
			[Config.temp + '#99CC66;"></div>','#99CC66'],
			[Config.temp + '#99FF66;"></div>','#99FF66'],
			[Config.temp + '#CC0066;"></div>','#CC0066'],
			[Config.temp + '#CC3366;"></div>','#CC3366'],
			[Config.temp + '#CC6666;"></div>','#CC6666'],
			[Config.temp + '#CC9966;"></div>','#CC9966'],
			[Config.temp + '#CCCC66;"></div>','#CCCC66'],
			[Config.temp + '#CCFF66;"></div>','#CCFF66'],
			[Config.temp + '#FF0066;"></div>','#FF0066'],
			[Config.temp + '#FF3366;"></div>','#FF3366'],
			[Config.temp + '#FF6666;"></div>','#FF6666'],
			[Config.temp + '#FF9966;"></div>','#FF9966'],
			[Config.temp + '#FFCC66;"></div>','#FFCC66'],
			[Config.temp + '#FFFF66;"></div>','#FFFF66'],
			[false,false],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#FFFF00;"></div>','#FFFF00'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#990099;"></div>','#990099'],
			[Config.temp + '#993399;"></div>','#993399'],
			[Config.temp + '#996699;"></div>','#996699'],
			[Config.temp + '#999999;"></div>','#999999'],
			[Config.temp + '#99CC99;"></div>','#99CC99'],
			[Config.temp + '#99FF99;"></div>','#99FF99'],
			[Config.temp + '#CC0099;"></div>','#CC0099'],
			[Config.temp + '#CC3399;"></div>','#CC3399'],
			[Config.temp + '#CC6699;"></div>','#CC6699'],
			[Config.temp + '#CC9999;"></div>','#CC9999'],
			[Config.temp + '#CCCC99;"></div>','#CCCC99'],
			[Config.temp + '#CCFF99;"></div>','#CCFF99'],
			[Config.temp + '#FF0099;"></div>','#FF0099'],
			[Config.temp + '#FF3399;"></div>','#FF3399'],
			[Config.temp + '#FF6699;"></div>','#FF6699'],
			[Config.temp + '#FF9999;"></div>','#FF9999'],
			[Config.temp + '#FFCC99;"></div>','#FFCC99'],
			[Config.temp + '#FFFF99;"></div>','#FFFF99'],
			[false,false],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#00FFFF;"></div>','#00FFFF'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#9900CC;"></div>','#9900CC'],
			[Config.temp + '#9933CC;"></div>','#9933CC'],
			[Config.temp + '#9966CC;"></div>','#9966CC'],
			[Config.temp + '#9999CC;"></div>','#9999CC'],
			[Config.temp + '#99CCCC;"></div>','#99CCCC'],
			[Config.temp + '#99FFCC;"></div>','#99FFCC'],
			[Config.temp + '#CC00CC;"></div>','#CC00CC'],
			[Config.temp + '#CC33CC;"></div>','#CC33CC'],
			[Config.temp + '#CC66CC;"></div>','#CC66CC'],
			[Config.temp + '#CC99CC;"></div>','#CC99CC'],
			[Config.temp + '#CCCCCC;"></div>','#CCCCCC'],
			[Config.temp + '#CCFFCC;"></div>','#CCFFCC'],
			[Config.temp + '#FF00CC;"></div>','#FF00CC'],
			[Config.temp + '#FF33CC;"></div>','#FF33CC'],
			[Config.temp + '#FF66CC;"></div>','#FF66CC'],
			[Config.temp + '#FF99CC;"></div>','#FF99CC'],
			[Config.temp + '#FFCCCC;"></div>','#FFCCCC'],
			[Config.temp + '#FFFFCC;"></div>','#FFFFCC'],
			[false,false],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#FF00FF;"></div>','#FF00FF'],
			[Config.temp + '#000000;"></div>','#000000'],
			[Config.temp + '#9900FF;"></div>','#9900FF'],
			[Config.temp + '#9933FF;"></div>','#9933FF'],
			[Config.temp + '#9966FF;"></div>','#9966FF'],
			[Config.temp + '#9999FF;"></div>','#9999FF'],
			[Config.temp + '#99CCFF;"></div>','#99CCFF'],
			[Config.temp + '#99FFFF;"></div>','#99FFFF'],
			[Config.temp + '#CC00FF;"></div>','#CC00FF'],
			[Config.temp + '#CC33FF;"></div>','#CC33FF'],
			[Config.temp + '#CC66FF;"></div>','#CC66FF'],
			[Config.temp + '#CC99FF;"></div>','#CC99FF'],
			[Config.temp + '#CCCCFF;"></div>','#CCCCFF'],
			[Config.temp + '#CCFFFF;"></div>','#CCFFFF'],
			[Config.temp + '#FF00FF;"></div>','#FF00FF'],
			[Config.temp + '#FF33FF;"></div>','#FF33FF'],
			[Config.temp + '#FF66FF;"></div>','#FF66FF'],
			[Config.temp + '#FF99FF;"></div>','#FF99FF'],
			[Config.temp + '#FFCCFF;"></div>','#FFCCFF'],
			[Config.temp + '#FFFFFF;"></div>','#FFFFFF'],
			[false,false]
		]
	};

}();
