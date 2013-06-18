/*----- initialize parameters --------------------------------------------------------*/
// set js base
var js_domain1 = 'js1.pp.sohu.com.cn';
var js_domain2 = 'js2.pp.sohu.com.cn';
var js_domain3 = 'js3.pp.sohu.com.cn';
var js_domain4 = 'js4.pp.sohu.com.cn';
var js_domain5 = 'js5.pp.sohu.com.cn';
var camp_apis = {
	"blog_profile" : "http://blog.sohu.com/service/profile.jsp",
	"pp_profile" : "http://pp.sohu.com/photoparkService.jhtml?method=getUser&type=json",
	"alumni_profile" : "http://alumni.chinaren.com/my/json.camp.alumni.jsp",
	"xiaonei_profile" : "http://xiaonei.chinaren.com/my/json.camp.xiaonei.jsp",
	"crclub_profile" : "http://club.chinaren.com/my/json.camp.club.jsp",
	"club_profile" : "http://club.sohu.com/getuserinfoforcamp.php", 
	"mail_profile" : "http://login.mail.sohu.com/servlet/LoginServlet?ul=camp",
	"passport_profile" : "http://passport.sohu.com/interface/widget.jsp",
	"say_profile" : "http://bbs.sogou.com/jsp/exinterface/widget.jsp",
	"music_profile" : "http://mbox.sogou.com/mbox/coo/widget.jsp",
	"relaxgame_profile" : "http://game.sohu.com/gamecamp/gamecampcard.php"
};

/***** user options *****/

// set app's theme
//var theme = 'default';


/***** system options *****/

// set language
// value:
//	'zh': chinese
//	'en': english
var lang = 'zh';

var Actions = {
	// set images base path
	// value:
	//	an url path not with file name
	// imgPath: '/demo/images/',
	imgPath: 'http://' + js_domain1 + '/ppp/blog/styles_ppp/images/',
	
	// set themes base path
	// value:
	//	an url path not with file name
	// imgPath: '/demo/images/',
	themePath: (typeof ThP != 'undefined')? ThP : 'http://' + js_domain2 + '/ppp/blog/themes_ppp/',
	
	// set js base path
	// value:
	//	an url path not with file name
	// jsPath: '/js/',
	jsPath: (typeof SP != 'undefined')? SP : 'http://' + js_domain3 + '/ppp/blog/js_ppp/',
	
	// set flash base path
	// value:
	//	an url path not with file name
	// flashPath: '/flash/',
	flashPath: 'http://js.pp.sohu.com/ppp/blog/flash/',
	
	// set widget base path
	// value:
	//	an url path not with file name
	// jsPath: '/js/',
	widgetLibPath: 'http://js.pp.sohu.com'+ (typeof WP != 'undefined'? WP : '/ppp/blog/widgets/'),
	widgetLibPath1: 'http://'+ js_domain1 + (typeof WP != 'undefined'? WP : '/ppp/blog/widgets/'),
	widgetLibPath2: 'http://'+ js_domain2 + (typeof WP != 'undefined'? WP : '/ppp/blog/widgets/'),
	widgetLibPath3: 'http://'+ js_domain3 + (typeof WP != 'undefined'? WP : '/ppp/blog/widgets/'),
	widgetLibPath4: 'http://'+ js_domain4 + (typeof WP != 'undefined'? WP : '/ppp/blog/widgets/'),
	widgetLibPath5: 'http://'+ js_domain5 + (typeof WP != 'undefined'? WP : '/ppp/blog/widgets/'),
	widgetLibPathCR: 'http://'+ js_domain5 + (typeof WP != 'undefined'? WP : '/ppp/blog/widgets/'),
	
	// set user's style
	// value:
	//	an url path
	customTheme: '/manage/style.do',

	// set user's modules list
	// value:
	//	an url path
	//userData: '/userModules2.xml',
	userData: '/action/',
	
	// set new module action
	// value:
	//	an url path
	newMod: '/manage/module.do',
	
	// set delete module action
	// value:
	//	an url path
	delMod: '/manage/module.do',
	
	// set edit module action
	// value:
	//	an url path
	editMod: '/manage/module.do',
	
	// set new page action
	// value:
	//	an url path
	//newPage: '/newpage.xml',
	newPage: '/manage/page.do',
	
	// set delete page action
	// value:
	//	an url path
	//delPage: '/delpage.xml',
	delPage: '/manage/page.do',

	// set edit page action
	// value:
	//	an url path
	//editPage: '/editpage.xml',
	editPage: '/manage/page.do',

	// set column style action
	// value:
	//	an url path
	//colStyle: '/manage/module.do',
	
	// set update user's style action
	// value:
	//	an url path
	editUserStyle: '/manage/module.do',
	
	// set theme action
	// value:
	//	an url path
	theme: '/manage/theme.do',
	
	// set links manage action
	// value:
	//	an url path
	linkMng: '/manage/link.do',
	
	// set greenway action
	// value:
	//	an url path
	greenWay: 'http://act.blog.sohu.com/service/list_code.jsp',
	//greenWay: '/greenway.js',
		
	// set proxy to load file on other domain
	// value:
	//	an url path
	// proxyURL: 'proxy?fetchUrl=http://test.com/test.xml&xslt=http://test.com/test.xsl&cache=10&nocache=true',
	proxyURL: '/hp'
};

// set client side cache
// if this's setted to 'true', every file imported by js will nocache on client
// value:
//	true: nocache
//	false: cache
var noCache = false;

// set default server side cache time(minute)
var defaultCacheTime = 30;

// set the max time to load an widget
var maxWidgetLoadTime = 20000;

// column style list
var colStyleLib = {
	'25:25:25:25':		'custom/colStyles/25_25_25_25.gif',
	'33:33:33': 		'custom/colStyles/33_33_33.gif',
	'25:50:25': 		'custom/colStyles/25_50_25.gif',
	'25:25:50': 		'custom/colStyles/25_25_50.gif',
	'50:25:25': 		'custom/colStyles/50_25_25.gif',
	'50:50': 			'custom/colStyles/50_50.gif',
	'25:75': 			'custom/colStyles/25_75.gif',
	'75:25': 			'custom/colStyles/75_25.gif',
	'67:33': 			'custom/colStyles/67_33.gif',
	'33:67': 			'custom/colStyles/33_67.gif',
	'100': 				'custom/colStyles/100.gif'
};

// themes group
var themeGroup = [
    
    {key: 'sys', title: '默认主题'},
	{key: 'ot', title: '我购买的主题', isNew: true, type: "function", dataUrl: 'http://ow.blog.sohu.com/goods/0/myGoods?p='+PassportSC.cookie.userid+'&vn=ow_my_themes', more: true,moreTitle:'更多 &gt;&gt;',moreId: 'ow_my_themes_more', moreUrl:'http://ow.blog.sohu.com/manage/goods.do?action=myThemes&catId=1&passport='+PassportSC.cookie.userid},
	{key: 'ot', title: '付费主题购买区', isNew: true, type: "function", dataUrl: 'http://ow.blog.sohu.com/goods/0/latestGoods?st=0&sz=16&vn=ow_latest_themes', more: true,moreTitle:'更多付费主题 &gt;&gt;',moreId: 'ow_latest_themes_more', moreUrl:'http://ow.blog.sohu.com/goods/0/goods', itDivExtCss: 'div_jsf'},
	
	//{key: 'olympic', title: '奥运主题专区'},
	{key: 'bw', title: '部落窝主题专区'},
	{key: 'fei2', title: 'F2主题专区'},
	{key: 'cr', title: 'ChinaRen主题专区'},
	//{key: 'g17173', title: '17173主题专区', demo: true},
	{key: 'g17173', title: '17173主题专区'},
	//{key: 'gw', title: '主题绿色通道'},
	{key: 'customTheme', title: '主题自定义'},
	{key: 'ot', title: '精彩主题推荐', isNew: true, type: "function", dataUrl: 'http://ow.blog.sohu.com/page/zone.do?action=recmdTheme&st=0&sz=16&vn=ow_recmd_themes'}
	
];
var themeLib = [
/*	纯色主题命名规则：
	棕：p01**	红：p02**	橙：p03**	黄：p04**	绿：p05**
	蓝：p06**	紫：p07**	灰：p08**	白：p09**	黑：p00**	*/
	/*新模板*/
	{id:'np0000',	grp:'sys',	smp:'sample.gif'},
	{id:'np0001',	grp:'sys',	smp:'sample.gif'},
	{id:'np0002',	grp:'sys',	smp:'sample.gif'},
	{id:'np0003',	grp:'sys',	smp:'sample.gif'},
	{id:'np0005',	grp:'sys',	smp:'sample.gif'},
	/* 浅色不透明 */
	{id:'p0201',	grp:'sys',	smp:'sample.gif'},
	{id:'p0401',	grp:'sys',	smp:'sample.gif'},
	{id:'p0501',	grp:'sys',	smp:'sample.gif'},
	{id:'p0601',	grp:'sys',	smp:'sample.gif'},
	{id:'p0701',	grp:'sys',	smp:'sample.gif'},
	{id:'p0801',	grp:'sys',	smp:'sample.gif'},
	/* 浅色透明 */
	{id:'p0203',	grp:'sys',	smp:'sample.gif'},
	{id:'p0403',	grp:'sys',	smp:'sample.gif'},
	{id:'p0503',	grp:'sys',	smp:'sample.gif'},
	{id:'p0603',	grp:'sys',	smp:'sample.gif'},
	{id:'p0703',	grp:'sys',	smp:'sample.gif'},
	{id:'p0803',	grp:'sys',	smp:'sample.gif'},
	/* 深色不透明 */
	{id:'p0204',	grp:'sys',	smp:'sample.gif'},
	{id:'p0304',	grp:'sys',	smp:'sample.gif'},
	{id:'p0504',	grp:'sys',	smp:'sample.gif'},
	{id:'p0604',	grp:'sys',	smp:'sample.gif'},
	{id:'p0704',	grp:'sys',	smp:'sample.gif'},
	{id:'p0004',	grp:'sys',	smp:'sample.gif'},
	/* 深色透明 */
	{id:'p0205',	grp:'sys',	smp:'sample.gif'},
	{id:'p0305',	grp:'sys',	smp:'sample.gif'},
	{id:'p0505',	grp:'sys',	smp:'sample.gif'},
	{id:'p0605',	grp:'sys',	smp:'sample.gif'},
	{id:'p0705',	grp:'sys',	smp:'sample.gif'},
	{id:'p0005',	grp:'sys',	smp:'sample.gif'},

	{id:'p21',		grp:'sys',	smp:'sample.jpg'},
	{id:'p22',		grp:'sys',	smp:'sample.jpg'},
	{id:'p23',		grp:'sys',	smp:'sample.gif'},
	{id:'p24',		grp:'sys',	smp:'sample.gif'},
	{id:'p25',		grp:'sys',	smp:'sample.gif'},
	{id:'p1001',	grp:'sys',	smp:'sample.jpg'},
	{id:'p1002',	grp:'sys',	smp:'sample.jpg'},
	{id:'p1003',	grp:'sys',	smp:'sample.jpg'},
	{id:'p1004',	grp:'sys',	smp:'sample.jpg'},
	{id:'p1005',	grp:'sys',	smp:'sample.jpg'},
	{id:'p1006',	grp:'sys',	smp:'sample.jpg'},
	{id:'p26',		grp:'sys',	smp:'sample.jpg'},
	{id:'p27',		grp:'sys',	smp:'sample.jpg'},
	{id:'p28',		grp:'sys',	smp:'sample.jpg'},
	{id:'p29',		grp:'sys',	smp:'sample.jpg'},
	{id:'p30',		grp:'sys',	smp:'sample.gif'},
	/*0208新增*/
	{id:'p6013',	grp:'sys',	smp:'sample.gif'},
	{id:'p6014',	grp:'sys',	smp:'sample.gif'},
	{id:'p6015',	grp:'sys',	smp:'sample.gif'},
	{id:'p6016',	grp:'sys',	smp:'sample.gif'},
	{id:'p6017',	grp:'sys',	smp:'sample.gif'},
	{id:'p6018',	grp:'sys',	smp:'sample.gif'},
	{id:'p6019',	grp:'sys',	smp:'sample.gif'},
	{id:'p6020',	grp:'sys',	smp:'sample.gif'},
	/*0302新增*/
	{id:'p6021',	grp:'sys',	smp:'sample.gif'},
	{id:'p6022',	grp:'sys',	smp:'sample.gif'},
	
	/*六一主题*/
	{id:'p6000',	grp:'sys',	smp:'sample.gif'},
	{id:'p6001',	grp:'sys',	smp:'sample.jpg'},
	{id:'p6002',	grp:'sys',	smp:'sample.gif'},
	{id:'p6003',	grp:'sys',	smp:'sample.jpg'},
	/*变形金刚*/
	{id:'p9011',	grp:'sys',	smp:'sample.jpg'},
	/*七夕主题*/
	{id:'p6004',	grp:'sys',	smp:'sample.gif'},
	{id:'p6005',	grp:'sys',	smp:'sample.gif'},
	{id:'p6006',	grp:'sys',	smp:'sample.gif'},
	{id:'p6007',	grp:'sys',	smp:'sample.jpg'},
	{id:'p6008',	grp:'sys',	smp:'sample.jpg'},
	{id:'p6009',	grp:'sys',	smp:'sample.jpg'},
	{id:'p6010',	grp:'sys',	smp:'sample.jpg'},
	{id:'p6011',	grp:'sys',	smp:'sample.jpg'},
	{id:'p6012',	grp:'sys',	smp:'sample.jpg'},
	
	
	
	/* 部落窝主题 */
	/*{id:'p1007',	grp:'bw',	smp:'sample.gif'},*/
	{id:'p1008',	grp:'bw',	smp:'sample.gif'},
	{id:'p1009',	grp:'bw',	smp:'sample.gif'},
	{id:'p1010',	grp:'bw',	smp:'sample.gif'},
	/*{id:'p1011',	grp:'bw',	smp:'sample.gif'},*/
	/*{id:'p1012',	grp:'bw',	smp:'sample.gif'},*/
	{id:'p1013',	grp:'bw',	smp:'sample.gif'},
	/*{id:'p1014',	grp:'bw',	smp:'sample.gif'},
	{id:'p1015',	grp:'bw',	smp:'sample.gif'},
	{id:'p1016',	grp:'bw',	smp:'sample.gif'},*/
	{id:'p1017',	grp:'bw',	smp:'sample.gif'},
	/*{id:'p1018',	grp:'bw',	smp:'sample.gif'},*/
	{id:'p1019',	grp:'bw',	smp:'sample.gif'},
	/*{id:'p1020',	grp:'bw',	smp:'sample.gif'},*/
	{id:'p1021',	grp:'bw',	smp:'sample.gif'},
	/*{id:'p1022',	grp:'bw',	smp:'sample.gif'},*/
	{id:'p1023',	grp:'bw',	smp:'sample.gif'},
	{id:'p1024',	grp:'bw',	smp:'sample.gif'},
	{id:'p1025',	grp:'bw',	smp:'sample.gif'},
	{id:'p1026',	grp:'bw',	smp:'sample.gif'},
	{id:'p1027',	grp:'bw',	smp:'sample.gif'},
	{id:'p1028',	grp:'bw',	smp:'sample.gif'},
	{id:'p1029',	grp:'bw',	smp:'sample.gif'},
	{id:'p1030',	grp:'bw',	smp:'sample.gif'},
	{id:'p1031',	grp:'bw',	smp:'sample.gif'},
	{id:'p1032',	grp:'bw',	smp:'sample.gif'},
	{id:'p1033',	grp:'bw',	smp:'sample.gif'},
	{id:'p1034',	grp:'bw',	smp:'sample.gif'},
	{id:'p1035',	grp:'bw',	smp:'sample.gif'},
	{id:'p1036',	grp:'bw',	smp:'sample.gif'},
	{id:'p1037',	grp:'bw',	smp:'sample.gif'},
	{id:'p1038',	grp:'bw',	smp:'sample.gif'},
	{id:'p1039',	grp:'bw',	smp:'sample.gif'},
	{id:'p1040',	grp:'bw',	smp:'sample.gif'},
	{id:'p1041',	grp:'bw',	smp:'sample.gif'},
	{id:'p1042',	grp:'bw',	smp:'sample.gif'},
	{id:'p1043',	grp:'bw',	smp:'sample.gif'},
	{id:'p1044',	grp:'bw',	smp:'sample.gif'},
	{id:'p1045',	grp:'bw',	smp:'sample.gif'},
	{id:'p1046',	grp:'bw',	smp:'sample.gif'},
	{id:'p1047',	grp:'bw',	smp:'sample.gif'},
	{id:'p1048',	grp:'bw',	smp:'sample.gif'},
	{id:'p1049',	grp:'bw',	smp:'sample.gif'},
	{id:'p1050',	grp:'bw',	smp:'sample.gif'},
	{id:'p1051',	grp:'bw',	smp:'sample.gif'},
	{id:'p1052',	grp:'bw',	smp:'sample.gif'},
	{id:'p1053',	grp:'bw',	smp:'sample.gif'},
	{id:'p1054',	grp:'bw',	smp:'sample.gif'},
	{id:'p1055',	grp:'bw',	smp:'sample.gif'},
	{id:'p1056',	grp:'bw',	smp:'sample.gif'},
	{id:'p1057',	grp:'bw',	smp:'sample.gif'},
	{id:'p1058',	grp:'bw',	smp:'sample.gif'},
	{id:'p1059',	grp:'bw',	smp:'sample.gif'},
	{id:'p1060',	grp:'bw',	smp:'sample.gif'},
	{id:'p1061',	grp:'bw',	smp:'sample.gif'},
	{id:'p1062',	grp:'bw',	smp:'sample.gif'},
	{id:'p1063',	grp:'bw',	smp:'sample.gif'},
	{id:'p1064',	grp:'bw',	smp:'sample.gif'},
	{id:'p1065',	grp:'bw',	smp:'sample.gif'},
	{id:'p1066',	grp:'bw',	smp:'sample.gif'},
	{id:'p1067',	grp:'bw',	smp:'sample.gif'},
	{id:'p1068',	grp:'bw',	smp:'sample.gif'},
	{id:'p1069',	grp:'bw',	smp:'sample.gif'},
	{id:'p1070',	grp:'bw',	smp:'sample.gif'},
	{id:'p1071',	grp:'bw',	smp:'sample.gif',	isNew:true},
	{id:'p1072',	grp:'bw',	smp:'sample.gif',	isNew:true},

	/* Fei2主题 */
	{id:'p2001',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2002',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2003',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2004',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2005',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2006',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2007',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2008',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2009',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2010',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2011',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2012',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2013',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2014',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2015',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2016',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2017',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2018',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2019',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2020',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2021',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2022',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2023',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2024',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2025',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2026',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2027',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2028',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2029',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2030',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2031',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2032',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2033',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2034',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2035',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2036',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2037',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2038',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2039',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2040',	grp:'fei2',	smp:'sample.jpg'},
	{id:'p2041',	grp:'fei2',	smp:'sample.jpg'},
	
	/* ChinaRen校内主题 */
	{id:'c1016',	grp:'cr',	smp:'sample.jpg'},
	{id:'c1014',	grp:'cr',	smp:'sample.jpg'},
	{id:'c1015',	grp:'cr',	smp:'sample.jpg'},
	{id:'c1001',	grp:'cr',	smp:'sample.gif'},
	{id:'c1003',	grp:'cr',	smp:'sample.gif'},
	{id:'c1005',	grp:'cr',	smp:'sample.gif'},
	{id:'c1006',	grp:'cr',	smp:'sample.gif'},
	{id:'c1007',	grp:'cr',	smp:'sample.gif'},
	{id:'c1008',	grp:'cr',	smp:'sample.gif'},
	{id:'c1009',	grp:'cr',	smp:'sample.gif'},
	{id:'c1010',	grp:'cr',	smp:'sample.gif'},
	{id:'c1011',	grp:'cr',	smp:'sample.gif'},

	/* 游戏主题 */
	{id:'p3001',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3002',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3003',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3004',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3005',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3006',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3007',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3008',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3009',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3011',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3012',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3014',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3015',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3016',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3018',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3019',	grp:'g17173',	smp:'sample.gif'},
	{id:'p3022',	grp:'g17173',	smp:'sample.gif'}
	
];

// custom theme
var cusThemeHeaderBgi = [
	{smp: Actions.imgPath+'custom/themesHeaderBg/1_smp.gif', src: Actions.imgPath+'custom/themesHeaderBg/1.jpg', tiled:'no-repeat', height:'200'},
	{smp: Actions.imgPath+'custom/themesHeaderBg/2_smp.gif', src: Actions.imgPath+'custom/themesHeaderBg/2.jpg', tiled:'no-repeat', height:'200'},
	{smp: Actions.imgPath+'custom/themesHeaderBg/3_smp.gif', src: Actions.imgPath+'custom/themesHeaderBg/3.jpg', tiled:'no-repeat', height:'200'},
	{smp: Actions.imgPath+'custom/themesHeaderBg/4_smp.gif', src: Actions.imgPath+'custom/themesHeaderBg/4.jpg', tiled:'no-repeat', height:'200'},
	{smp: Actions.imgPath+'custom/themesHeaderBg/5_smp.gif', src: Actions.imgPath+'custom/themesHeaderBg/5.jpg', tiled:'no-repeat', height:'200'},
	{smp: Actions.imgPath+'custom/themesHeaderBg/6_smp.gif', src: Actions.imgPath+'custom/themesHeaderBg/6.jpg', tiled:'no-repeat', height:'200'}
];
var cusThemeBodyBgi = [
	{smp: Actions.imgPath+'custom/themesBodyBg/1_smp.gif', src: Actions.imgPath+'custom/themesBodyBg/1.jpg', tiled:'repeat'},
	{smp: Actions.imgPath+'custom/themesBodyBg/2_smp.gif', src: Actions.imgPath+'custom/themesBodyBg/2.jpg', tiled:'repeat'},
	{smp: Actions.imgPath+'custom/themesBodyBg/3_smp.gif', src: Actions.imgPath+'custom/themesBodyBg/3.jpg', tiled:'repeat'},
	{smp: Actions.imgPath+'custom/themesBodyBg/4_smp.gif', src: Actions.imgPath+'custom/themesBodyBg/4.jpg', tiled:'repeat'},
	{smp: Actions.imgPath+'custom/themesBodyBg/5_smp.gif', src: Actions.imgPath+'custom/themesBodyBg/5.jpg', tiled:'repeat'},
	{smp: Actions.imgPath+'custom/themesBodyBg/6_smp.gif', src: Actions.imgPath+'custom/themesBodyBg/6.jpg', tiled:'repeat'},
	{smp: Actions.imgPath+'custom/themesBodyBg/7_smp.gif', src: Actions.imgPath+'custom/themesBodyBg/7.jpg', tiled:'repeat'},
	{smp: Actions.imgPath+'custom/themesBodyBg/8_smp.gif', src: Actions.imgPath+'custom/themesBodyBg/8.jpg', tiled:'repeat'},
	{smp: Actions.imgPath+'custom/themesBodyBg/9_smp.gif', src: Actions.imgPath+'custom/themesBodyBg/9.gif', tiled:'repeat'}
];

// widgets gallery
var widgetGallery = [
	{key: 'base', title: '基本'},
	{key: 'mini', title: '微博'},
	{key: 'entry', title: '日志'},
	{key: 'picture', title: '图片'},
	{key: 'music', title: '音乐'},
	{key: 'video', title: '视频'},
	{key: 'ground', title: '圈子'},
	{key: 'tool', title: '工具'},
	{key: 'subscibe', title: '订阅'},
	{key: 'camp', title: '大本营'},
	{key: 'chinaren', title: 'ChinaRen'},
	{key: 'other', title: '其他'},
	{key: 'ow', title: '精品模块推荐', isNew: true, type: "function", dataUrl: 'http://ow.blog.sohu.com/page/category.do?action=recmdWidget&st=0&sz=15&vn=ow_recmd_widgets'}
];
// widgets library
var widgetLib = [
	{
		title:	'日志',
		desc:	'最新的几篇日志',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		type:	'entries',
		path:	Actions.widgetLibPath5 + 'entries/',
		js:		['widget.js'],
		only:	true,
		sys:	true,
		gal:	'entry'
	},
	{
		title:	'最新图片',
		desc:	'最新上传的图片',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		
		type:	'pp',
		path:	Actions.widgetLibPath4 + 'pp/',
		js:		['widget.js'],
		only:	true,
		sys:	true,
		gal:	'picture'
	},
	{
		title:	'最新图评',
		desc:	'其他网友对您的图片的最新评论',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		
		type:	'pp_comments',
		path:	Actions.widgetLibPath3 + 'pp_comments/',
		js:		['widget.js'],
		css:	['style.css'],
		only:	true,
		sys:	true,
		gal:	'picture'
	},
	{
		title:	'相册收藏',
		desc:	'收藏的相册专辑',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		
		type:	'pp_favs',
		path:	Actions.widgetLibPath2 + 'pp_favs/',
		js:		['widget.js'],
		css:	['style.css'],
		only:	true,
		sys:	true,
		demo:	true,
		gal:	'picture'
	},
	{
		title:	'相册专辑',
		desc:	'相册的专辑列表',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		
		type:	'pp_sets',
		path:	Actions.widgetLibPath1 + 'pp_sets/',
		js:		['widget.js'],
		css:	['style.css'],
		only:	true,
		sys:	true,
		gal:	'picture'
	},
	{
		title:	'相册某一专辑',
		desc:	'以缩略或幻灯方式，显示相册中的某一专辑',
		ico:	'ico_widget.gif',
		author:	'Todd Lee',
		site:	'http://www.todd-lee.com',
		
		type:	'pp_set',
		path:	Actions.widgetLibPath5 + 'pp_set/',
		js:		['widget.js'],
		css:	['style.css'],
		gal:	'picture'
	},
	{
		title:	'相册风云榜',
		desc:	'搜狐相册风云榜',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		
		type:	'pp_top',
		path:	Actions.widgetLibPath4 + 'pp_top/',
		js:		['widget.js'],
		css:	['style.css'],
		only:	true,
		sys:	true,
		toy:	true,
		gal:	'picture'
	},
	{
		title:	'精品相册专辑',
		desc:	'搜狐相册精品专辑',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		
		type:	'pp_recommends',
		path:	Actions.widgetLibPath3 + 'pp_recommends/',
		js:		['widget.js'],
		css:	['style.css'],
		only:	true,
		sys:	true,
		demo:	true,
		gal:	'picture'
	},
	{
		title:	'音乐盒',
		desc:	'音乐盒播放器',
		ico:	'ico_widget.gif',
		author:	'Todd Lee',
		site:	'http://www.todd-lee.com',
		
		type:	'music',
		path:	Actions.widgetLibPath2 + 'music/',
		js:		['widget.js'],
		css:	['style.css'],
		only:	true,
		sys:	true,
		gal:	'music'
	},
	{
		title:	'邓丽君音乐盒',
		desc:	'邓丽君音乐盒播放器',
		ico:	'ico_widget.gif',
		author:	'gm',
		site:	'http://gmtjuwidget.blog.sohu.com',
		
		type:	'music_act',
		path:	Actions.widgetLibPath2 + 'music_act/',
		js:		['widget.js'],
		css:	['style.css'],
		only:	true,
		sys:	true,
		demo:	true,
		gal:	'music'
	},
	{
		title:	'档案',
		desc:	'个人档案',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		pubDate:'2006-6-19 12:32',
		
		type:	'profile',
		path:	Actions.widgetLibPath1 + 'profile/',
		js:		['widget.js'],
		css:	['style.css'],
		only:	true,
		sys:	true,
		gal:	'base'
	},
	{
		title:	'好友',
		desc:	'好友列表',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		
		type:	'links',
		path:	Actions.widgetLibPath5 + 'links/',
		js:		['widget.js'],
		//css:	['style.css'],
		only:	true,
		sys:	true,
		gal:	'base'
	},
	{
		title:	'日志分类',
		desc:	'日志的分类列表',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		
		type:	'categories',
		path:	Actions.widgetLibPath4 + 'categories/',
		js:		['widget.js'],
		//css:	['style.css'],
		only:	true,
		sys:	true,
		gal:	'entry'
	},
	{
		title:	'最新评论',
		desc:	'列出最新的十条评论',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		
		type:	'latest_comments',
		path:	Actions.widgetLibPath3 + 'latest_comments/',
		js:		['widget.js'],
		//css:	['style.css'],
		only:	true,
		sys:	true,
		gal:	'entry'
	},
	{
		title:	'统计信息',
		desc:	'博客的统计信息',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		
		type:	'stats',
		path:	Actions.widgetLibPath2 + 'stats/',
		js:		['widget.js'],
		//css:	['style.css'],
		only:	true,
		sys:	true,
		gal:	'base'
	},
	{
		title:	'最近访客',
		desc:	'你可以通过他看谁曾一次又一次的造访你的博客而只字未留,他可能是暗恋你的人 关心你的人 憎恨你的人 无意中闲逛来的人',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		
		type:	'refer',
		path:	Actions.widgetLibPath1 + 'refer/',
		js:		['widget.js'],
		//css:	['style.css'],
		only:	true,
		sys:	true,
		gal:	'base'
	},
    {
		title:  '留言',
		desc:   '列出最新的留言',
		ico:    'ico_widget.gif',
		author:	'Todd Lee',
		site:	'http://www.todd-lee.com',

		type:   'messages',
		path:   Actions.widgetLibPath5 + 'messages/',
		js:     ['widget.js'],
		//css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'base'
    },
	{
		title:	'更新的博客',
		desc:	'列出最近更新的十个博客',
		ico:	'ico_widget.gif',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		
		type:	'fresh_blogs',
		path:	Actions.widgetLibPath4 + 'fresh_blogs/',
		js:		['widget.js'],
		//css:	['style.css'],
		only:	true,
		sys:	true,
		gal:	'base'
	},
	{
		title:	'自定义列表',
		desc:	'可以列出您喜欢的书、音乐、电影等等～',
		ico:	'ico_widget.gif',
		author:	'Todd Lee',
		site:	'http://www.todd-lee.com',
		
		type:	'Custom_Links',
		path:	Actions.widgetLibPath3 + 'custom_links/',
		js:		['widget.js'],
		css:	['style.css'],
		gal:	'other'
		
	},
	{
		title:	'自写文本',
		desc:	'您可以在您的页面上增加一些公告或便签',
		ico:	'ico_widget.gif',
		author:	'Todd Lee',
		site:	'http://www.todd-lee.com',
		pubDate:'2006-07-05',
		
		type:	'Text_Note',
		path:	Actions.widgetLibPath2 + 'text_note/',
		js:		['widget.js'],
		css:	['style.css'],
		gal:	'other'
		
	},
	{
		title:  '搜狗搜索',
		desc:   '搜索网页，博客，音乐',
		ico:	'ico_widget.gif',
		author: 'chenqj',
		site:	'http://chenqj.blog.sohu.com',
							
		type:	'search',
		path:	Actions.widgetLibPath1 + 'search/',
		js:		['widget.js'],
		css:	['style.css'],
		only:	true,
		sys:	true,
		gal:	'tool'
	},
	{
		title:	'新闻/社区',
		desc:	'为您精选搜狐新闻和社区，方便您每日阅读',
		ico:	'ico_widget.gif',
		author:	'Todd Lee',
		site:	'http://www.todd-lee.com',
		pubDate:'2006-07-05',
		
		type:	'Feeds',
		path:	Actions.widgetLibPath5 + 'sohu_news/',
		js:		['widget.js'],
		css:	['style.css'],
		gal:	'subscibe'
	},
	{
		title:	'时钟',
		desc:	'给自己的博客加一个小时钟',
		ico:	'ico_widget.gif',
		author:	'Todd Lee',
		site:	'http://www.todd-lee.com',
		pubDate:'2006-07-05',
		
		type:	'Clock',
		path:	Actions.widgetLibPath4 + 'clock/',
		js:		['widget.js'],
		css:	['style.css'],
		gal:	'tool'
	},
	{
		title:  '每日星座运势',
		desc:   '看看每天的运势',
		ico:    'ico_widget.gif',
		author: 'chenqj',
		site:   'http://chenqj.blog.sohu.com',

		type:   'horoscope',
		path:   Actions.widgetLibPath3 + 'horoscope/',
		js:     ['widget.js'],
		css:    ['style.css'],
		gal:	'subscibe'
	},
	{
		title:  '图片点点看',
		desc:   '精彩图片点点看',
		ico:	'ico_widget.gif',
		author: 'chenqj',
		site:   'http://chenqj.blog.sohu.com',

		type:   'pic',
		path:   Actions.widgetLibPath2 + 'pic/',
		js:             ['widget.js'],
		//css:    ['style.css'],
		only:   true,
		demo:	true,
		gal:	'picture'
    },
    {
		title:  '休闲小游戏',
		desc:   '轻松一下，玩一会儿游戏吧',
		ico:    'ico_widget.gif',
		author: 'chenqj',
		site:   'http://chenqj.blog.sohu.com',

		type:   'game',
		path:   Actions.widgetLibPath1 + 'game/',
		js:     ['widget.js'],
		css:    ['style.css'],
		gal:	'other'
    },
    {
		title:  'FLASH 模块',
		desc:   '好玩的FLASH模块',
		ico:    'http://i0.itc.cn/20081111/63b_659b68d4_9ef0_44fb_9feb_d14045ec9d8b_1.gif',
		author: 'Springwang',
		site:   'http://www.i-starting.com',

		type:   'flash',
		path:   Actions.widgetLibPath1 + 'flash/',
		js:     ['widget.js'],
		css:    ['style.css'],
		dev:	true,
		gal:	'other'
    },
    {   
		title:  '搜狐视频播报',
		desc:   '搜狐娱乐播报，搜狐体育播报',
		ico:    'ico_widget.gif',
		author:	'Todd Lee',
		site:	'http://www.todd-lee.com',
		
		type:   'v',
		path:   Actions.widgetLibPath5 + 'v/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:   true,
		demo:	true,
		gal:	'video'
    },
	{
		title:	'好友文章订阅',
		desc:	'列出好友的日志，不会错过他的每篇精彩文章',
		ico:	'ico_widget.gif',
		author:	'Todd Lee',
		site:	'http://www.todd-lee.com',
		pubDate:'2006-07-05',
		
		type:	'Friend_Rss',
		path:	Actions.widgetLibPath4 + 'friend_rss/',
		js:		['widget.js'],
		css:	['style.css'],
		toy:	true,
		gal:	'subscibe'
	},
    {       
		title:  '心情晴雨表',
		desc:   '说出你的心情，我们一起分享，一起分担',
		ico:    'ico_widget.gif',
		author: 'chenqj',
		site:   'http://chenqj.blog.sohu.com',
		
		type:   'mood',
		path:   Actions.widgetLibPath3 + 'mood/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:   true,
		toy:    true,
		gal:	'base'
    },
	{
		title:  'del.icio.us',
		desc:   'del.icio.us',
		ico:	'ico_widget.gif',
		author: 'chenqj',
		site:   'http://chenqj.blog.sohu.com',

		type:   'delicious',
		path:   Actions.widgetLibPath2 + 'delicious/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:   true,
		toy:    true,
		gal:	'subscibe'
    },
	{
		title:  'Theme Developer',
		desc:   '主题开发者测试用模块',
		//ico:	'ico_widget.gif',
		author: 'Todd Lee',
		site:   'http://www.todd-lee.com',
		
		type:   'Theme_Dev',
		path:	Actions.widgetLibPath1 + 'themeDev/',
		js:		['widget.js'],
		only:   true,
		dev:	true,
		gal:	'tool'
    },
	{
		title:	'每日一句',
		desc:	'随机地显示名言,每次显示一行',
		//ico:	'',
		author:	'chenqj',
		site:	'http://chenqj.blog.sohu.com',
		
		type:	'hello',
		path:	Actions.widgetLibPath5 + 'hello/',
		js:		['widget.js'],
		css:	['style.css'],
		demo:	true,
		gal:	'subscibe'
	},
	{
		title:  '17173资讯',
		desc:   '最新网游排名和网游测试时间表',
		ico:    'ico_widget.gif',
		author: 'Todd Lee',
		site:   'http://www.todd-lee.com',

		type:   'game17173',
		path:   Actions.widgetLibPath4 + 'game17173/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'subscibe'
	},
	{
		title:  '博客活动',
		desc:   '搜狐博客活动',
		ico:    'ico_widget.gif',
		author: 'Todd Lee',
		site:   'http://www.todd-lee.com',

		type:   'campaign',
		path:   Actions.widgetLibPath3 + 'campaign/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'subscibe'
	},
	{
		title:  '音乐盒专辑',
		desc:   '音乐盒的专辑列表',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'msc_albums',
		path:   Actions.widgetLibPath2 + 'msc_albums/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'music'
	},
	{
		title:  '音乐盒某专辑',
		desc:   '音乐盒中的某一个专辑',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'msc_album',
		path:   Actions.widgetLibPath1 + 'msc_album/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	false,
		sys:	false,
		gal:	'music'
	},
	{
		title:  '推荐专辑',
		desc:   'sogou音乐明星专辑',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'msc_recommends',
		path:   Actions.widgetLibPath5 + 'msc_recommends/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'music'
	},
	{
		title:  '新歌快递',
		desc:   'sogou音乐新歌快递',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'msc_newsongs',
		path:   Actions.widgetLibPath4 + 'msc_newsongs/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'music'
	},
	{
		title:  '日志标签',
		desc:   '日志标签列表',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'tag_tags',
		path:   Actions.widgetLibPath3 + 'tag_tags/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'entry'
	},
	{
		title:  '某一标签日志',
		desc:   '个人某一标签中的日志列表',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'tag_logs',
		path:   Actions.widgetLibPath2 + 'tag_logs/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	false,
		sys:	false,
		gal:	'entry'
	},
	{
		title:  '标签订阅',
		desc:   '订阅系统中某一标签的日志',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'tag_subscribe',
		path:   Actions.widgetLibPath1 + 'tag_subscribe/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	false,
		sys:	false,
		gal:	'subscibe'
	},
	{
		title:  '搜狐通行证',
		desc:   '使用搜狐各个产品的通行证',
		ico:    'ico_widget.gif',

		type:   'camp_passport',
		path:   Actions.widgetLibPath4 + 'camp_passport/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		private:true,
		gal:	'camp'
	},
	{
		title:  '搜狐博客',
		desc:   '搜狐博客是快速稳定的门户平台，提供最专业的Blog托管服务，免费注册，成为博客，建立自己的个人门户',
		ico:    'ico_widget.gif',

		type:   'camp_blog',
		path:   Actions.widgetLibPath3 + 'camp_blog/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		private:true,
		gal:	'camp'
	},
	{
		title:  '搜狐邮件',
		desc:   '搜狐闪电邮件',
		ico:    'ico_widget.gif',

		type:   'camp_mail',
		path:   Actions.widgetLibPath2 + 'camp_mail/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		private:true,
		gal:	'camp'
	},
	{
		title:  '图片公园',
		desc:   '搜狐图片公园（ pp.sohu.com ）是您的个人网络相册，您可以发布照片，进行个性展示，与好友分享交流',
		ico:    'ico_widget.gif',

		type:   'camp_pp',
		path:   Actions.widgetLibPath1 + 'camp_pp/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		private:true,
		gal:	'camp'
	},
	{
		title:  '搜狗音乐盒',
		desc:   '搜狗音乐盒',
		ico:    'ico_widget.gif',

		type:   'camp_music',
		path:   Actions.widgetLibPath5 + 'camp_music/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		private:true,
		gal:	'camp'
	},
	{
		title:  '搜狐社区',
		desc:   '中国第一社区',
		ico:    'ico_widget.gif',

		type:   'camp_club',
		path:   Actions.widgetLibPath4 + 'camp_club/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		private:true,
		gal:	'camp'
	},
	{
		title:  '校友录',
		desc:   '中国规模最大、数据最全、服务最稳定的校友录产品',
		ico:    'ico_widget.gif',

		type:   'camp_alumni',
		path:   Actions.widgetLibPath3 + 'camp_alumni/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		private:true,
		gal:	'camp'
	},
	{
		title:  '校内',
		desc:   '专属于在校大学生的真实空间',
		ico:    'ico_widget.gif',

		type:   'camp_xiaonei',
		path:   Actions.widgetLibPath2 + 'camp_xiaonei/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		private:true,
		gal:	'camp',
		demo:		true
	},
	{
		title:  'CR社区',
		desc:   '时尚年轻人的新锐社区',
		ico:    'ico_widget.gif',

		type:   'camp_crclub',
		path:   Actions.widgetLibPath1 + 'camp_crclub/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		private:true,
		gal:	'camp'
	},
	{
		title:  '搜狗说吧',
		desc:   '搜狗说吧',
		ico:    'ico_widget.gif',

		type:   'camp_say',
		path:   Actions.widgetLibPath5 + 'camp_say/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		private:true,
		gal:	'camp'
	},
	{
		title:  '搜狐游戏',
		desc:   '搜狐游戏',
		ico:    'ico_widget.gif',

		type:   'camp_relaxgame',
		path:   Actions.widgetLibPath5 + 'camp_relaxgame/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		private:true,
		gal:	'camp',
		demo:	true
	},
	{
		title:  '声色放映厅',
		desc:   '将您的视频展示给大家',
		ico:    'ico_widget.gif',
		author: 'Todd Lee',
		site:   'http://www.todd-lee.com',

		type:   'v_tv',
		path:   Actions.widgetLibPath3 + 'v_tv/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		demo:	true,
		gal:	'video'
	},
	{
		title:  '最新视频',
		desc:   '最新视频',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'v_video',
		path:   Actions.widgetLibPath2 + 'v_video/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'video'
	},
	{
		title:  '最新节目单',
		desc:   '最新节目单',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'v_plist',
		path:   Actions.widgetLibPath1 + 'v_plist/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'video'
	},
	{
		title:  '收藏的视频',
		desc:   '收藏的视频',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'v_favovideo',
		path:   Actions.widgetLibPath5 + 'v_favovideo/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'video'
	},
	{
		title:  '收藏的节目单',
		desc:   '收藏的节目单',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'v_favoplist',
		path:   Actions.widgetLibPath4 + 'v_favoplist/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'video'
	},
	{
		title:  '推荐视频',
		desc:   '推荐视频',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',
		type:   'v_vrecommend',
		path:   Actions.widgetLibPath3 + 'v_vrecommend/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'video'
	},
	{
		title:  '视频档案',
		desc:   '视频档案',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',
		type:   'v_profile',
		path:   Actions.widgetLibPath3 + 'v_profile/',
		js:     ['widget.js'],
		only:	true,
		sys:	true,
		demo:	true,
		gal:	'video'
	},
	{
		title:  '最新动态',
		desc:   '最新动态',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',
		type:   'miniblog',
		path:   Actions.widgetLibPath4 + 'miniblog/',
		js:     ['widget.js', HMP + 'feed.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		demo:	false,
		gal:	'base'
	},
	{
		title:  '最新分享',
		desc:   '最新分享',
		ico:    'http://js2.pp.sohu.com.cn/ppp/images/icons/ico_share2.gif',
		author: 'Springwang',
		site:   'http://www.i-starting.com',
		type:   'share',
		path:   Actions.widgetLibPath4 + 'share/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'base'
	},
	{
		title:  '珍藏的社区',
		desc:   '列出您珍藏的社区版面，方便您随时去查看',
		ico:    'ico_widget.gif',
		author: 'Todd Lee',
		site:   'http://www.todd-lee.com',

		type:   'club_favboard',
		path:   Actions.widgetLibPath5 + 'club_favboard/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'subscibe'
	},
	{
		title:  '关注的说吧',
		desc:   '列出您关注的说吧，方便您随时去查看',
		ico:    'ico_widget.gif',
		author: 'Todd Lee',
		site:   'http://www.todd-lee.com',

		type:   'say_favbar',
		path:   Actions.widgetLibPath1 + 'say_favbar/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'subscibe'
	},
	{
		title:  '关注的标签',
		desc:   '列出您关注的标签，方便您随时去查看',
		ico:    'ico_widget.gif',
		author: 'Todd Lee',
		site:   'http://www.todd-lee.com',

		type:   'tag_favtag',
		path:   Actions.widgetLibPath2 + 'tag_favtag/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'subscibe'
	},
	{
		title:  '加入的圈子',
		desc:   '加入的圈子',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'q_ugroups',
		path:   Actions.widgetLibPath3 + 'q_ugroups/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'ground'
	},
	{
		title:  '管理的圈子',
		desc:   '管理的圈子',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'q_uadmingroups',
		path:   Actions.widgetLibPath4 + 'q_uadmingroups/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'ground'
	},
	{
		title:  '我关注的圈子',
		desc:   '我关注的圈子',
		ico:    'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_group.gif',
		author: 'Springwang',
		site:   'http://www.i-starting.com',

		type:   'q_atteGroup',
		path:   Actions.widgetLibPath4 + 'q_atteGroup/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	false,
		sys:	true,
		dev:	true,
		gal:	'ground'
	},
	{
		title:  '圈子个人档案',
		desc:   '圈个人子档案',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'q_ushow',
		path:   Actions.widgetLibPath5 + 'q_ushow/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'ground'
	},
	{
		title:  '发表的圈子主帖',
		desc:   '发表的圈子主贴',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'q_utopics',
		path:   Actions.widgetLibPath1 + 'q_utopics/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'ground'
	},
	{
		title:  '24小时热帖',
		desc:   '24小时热帖',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'q_tentopic',
		path:   Actions.widgetLibPath2 + 'q_tentopic/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'ground'
	},
	{
		title:  '测试模块',
		desc:   'Open Widget测试模块',
		ico:    'ico_widget.gif',
		author: 'Jady',
		site:   'http://jadyyang.blog.sohu.com',

		type:   'uwa_widget',
		path:   UWAP,
		js:     ['uwa.js'],
		css:    ['uwa.css'],
		dev:	true,
		gal:	'base'
	},
	{
		title:	'站外友情链接',
		desc:	'站外友情链接',
		ico:	'ico_widget.gif',
		author:	'jady',
		site:	'http://jadyyang.blog.sohu.com',
		
		type:	'my_links',
		path:	Actions.widgetLibPath5 + 'my_links/',
		js:		['widget.js'],
		css:	['style.css'],
		//only:	true,
		//sys:	true,
		gal:	'base',
		demo:    true
	},
	{
		title:  'RSS订阅',
		desc:   'RSS订阅',
		ico:    'ico_widget.gif',

		type:   'rss',
		path:   Actions.widgetLibPath5 + 'rss/',
		js:     ['widget.js'],
		css:    ['style.css'],
		gal:		'subscibe'
	},
	{
		title:  '动感相册',
		desc:   '动感相册',
		ico:    'http://js1.pp.sohu.com.cn/ppp/images/icons/ico_slide.gif',

		type:   'pp_slide',
		path:   Actions.widgetLibPath5 + 'pp_slide/',
		js:     ['widget.js'],
		css:    ['style.css'],
		gal:		'picture'
	},
	{
		title:  '天龙官网公告',
		desc:   '天龙官网公告',
		ico:    'ico_widget.gif',

		type:   'tl_notice',
		path:   Actions.widgetLibPath1 + 'tl_notice/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'subscibe'
	},
	{
		title:  '天龙八部众',
		desc:   '天龙八部众',
		ico:    'ico_widget.gif',

		type:   'tl_bbshot',
		path:   Actions.widgetLibPath2 + 'tl_bbshot/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'subscibe'
	},
	{
		title:  '在CR的涂鸦',
		desc:   '在CR的涂鸦',
		ico:    'ico_widget.gif',

		type:   'cr_doodle',
		path:   Actions.widgetLibPathCR + 'cr_doodle/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'CR图片频道',
		desc:   'CR图片频道',
		ico:    'ico_widget.gif',

		type:   'cr_clubpic',
		path:   Actions.widgetLibPathCR + 'cr_clubpic/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'CR型男索女',
		desc:   'CR型男索女',
		ico:    'ico_widget.gif',

		type:   'cr_club1',
		path:   Actions.widgetLibPathCR + 'cr_club1/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'CR麻辣婆媳',
		desc:   'CR麻辣婆媳',
		ico:    'ico_widget.gif',

		type:   'cr_club2',
		path:   Actions.widgetLibPathCR + 'cr_club2/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'CR魅力女人',
		desc:   'CR魅力女人',
		ico:    'ico_widget.gif',

		type:   'cr_club3',
		path:   Actions.widgetLibPathCR + 'cr_club3/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'CR小宠当家',
		desc:   'CR小宠当家',
		ico:    'ico_widget.gif',

		type:   'cr_club4',
		path:   Actions.widgetLibPathCR + 'cr_club4/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'CR今日关注',
		desc:   'CR今日关注',
		ico:    'ico_widget.gif',

		type:   'cr_focus',
		path:   Actions.widgetLibPathCR + 'cr_focus/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'CR新鲜校园',
		desc:   'CR新鲜校园',
		ico:    'ico_widget.gif',

		type:   'cr_campus',
		path:   Actions.widgetLibPathCR + 'cr_campus/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'ChinaRen专栏',
		desc:   'ChinaRen专栏',
		ico:    'ico_widget.gif',

		type:   'cr_ding',
		path:   Actions.widgetLibPathCR + 'cr_ding/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'CR热点专题',
		desc:   'CR热点专题',
		ico:    'ico_widget.gif',

		type:   'cr_feature',
		path:   Actions.widgetLibPathCR + 'cr_feature/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'CR精彩活动',
		desc:   'CR精彩活动',
		ico:    'ico_widget.gif',

		type:   'cr_party',
		path:   Actions.widgetLibPathCR + 'cr_party/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'CR小黑板',
		desc:   'CR小黑板',
		ico:    'ico_widget.gif',

		type:   'cr_board',
		path:   Actions.widgetLibPathCR + 'cr_board/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  '学校公告栏',
		desc:   '学校公告栏',
		ico:    'ico_widget.gif',

		type:   'cr_school',
		path:   Actions.widgetLibPathCR + 'cr_school/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'CR学校搜索',
		desc:   'CR学校搜索',
		ico:    'ico_widget.gif',

		type:   'cr_search',
		path:   Actions.widgetLibPathCR + 'cr_search/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  '在CR的近况',
		desc:   '在CR的近况',
		ico:    'ico_widget.gif',

		type:   'cr_track',
		path:   Actions.widgetLibPathCR + 'cr_track/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'CR群组',
		desc:   'CR群组',
		ico:    'ico_widget.gif',

		type:   'cr_group',
		path:   Actions.widgetLibPathCR + 'cr_group/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  'ChinaRen导航',
		desc:   'ChinaRen导航',
		ico:    'ico_widget.gif',

		type:   'cr_nav',
		path:   Actions.widgetLibPathCR + 'cr_nav/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  '在CR收到的礼物',
		desc:   '在CR收到的礼物',
		ico:    'ico_widget.gif',

		type:   'cr_gift',
		path:   Actions.widgetLibPathCR + 'cr_gift/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:		'chinaren'
	},
	{
		title:  '公告',
		desc:   '公告',
		ico:    'http://js5.pp.sohu.com.cn/ppp/blog/styles_ppp/images/custom/icons/rosette.gif',

		type:   'cr_tips',
		path:   Actions.widgetLibPath5 + 'cr_tips/',
		js:     ['widget.js'],
		//	css:    ['style.css'],
		only:	true,
		sys:	true,
		dev:	true,
		gal:		'chinaren'
	},
	{
		title:  '奥运精彩图片',
		desc:   '精彩奥运图片展示',
		ico:    'ico_widget.gif',

		type:   'o_wondPhoto',
		path:   Actions.widgetLibPath1 + 'o_wondPhoto/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		//dev:	true,
		demo:	true,
		gal:	'picture'
	},
	{
		title:  '微博',
		desc:   '我的微博列表',
		ico:    'ico_widget.gif',
		author: 'gm',
		site:   'http://gmtjuwidget.blog.sohu.com',

		type:   't_mini',
		path:   Actions.widgetLibPath2 + 't_mini/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'mini'
	},
	{
		title:  '微博档案',
		desc:   '我的微博档案',
		ico:    'ico_widget.gif',
		author: 'gm',
		site:   'http://gmtjuwidget.blog.sohu.com',

		type:   't_profile',
		path:   Actions.widgetLibPath2 + 't_profile/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'mini'
	},
	{
		title:  '微博标签',
		desc:   '微博热门标签',
		ico:    'ico_widget.gif',
		author: 'gm',
		site:   'http://gmtjuwidget.blog.sohu.com',

		type:   't_tag',
		path:   Actions.widgetLibPath2 + 't_tag/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'mini'
	},
	{
		title:  '微博访客',
		desc:   '微博访客',
		ico:    'ico_widget.gif',
		author: 'gm',
		site:   'http://gmtjuwidget.blog.sohu.com',

		type:   't_visitor',
		path:   Actions.widgetLibPath2 + 't_visitor/',
		js:     ['widget.js'],
		css:    ['style.css'],
		only:	true,
		sys:	true,
		gal:	'mini'
	}
	
];
// pages library
var pageLib = [
	{
		title:	'相册',
		desc:	'包含常用的相册模块',
		ico:	100,
		type:	'1',
		hash:	'p_pp',
		colStyle: '25:75',
		widgets:[['pp_sets'],['pp_set','pp_recommends']],
		permit:	0,
		
		only:		true,
		ableDel:	true,
		ableSetOpt:	true,
		ableSetTit:	false,
		ableSetCol:	true,
		ableSetIco:	false,
		ableSetPer: false
	},
	{
		title:	'音乐',
		desc:	'包含常用的音乐模块',
		ico:	78,
		type:	'2',
		hash:	'p_music',
		colStyle: '67:33',
		widgets:[['msc_album','msc_recommends'],['msc_albums','msc_newsongs']],
		permit:	0,
		
		only:		true,
		ableDel:	true,
		ableSetOpt:	true,
		ableSetTit:	false,
		ableSetCol:	true,
		ableSetIco:	false,
		ableSetPer: false
	},
	{
		title:	'视频',
		desc:	'包含常用的视频模块',
		ico:	125,
		type:	'4',
		hash:	'p_video',
		colStyle: '33:67',
		widgets:[['v_profile','v_favovideo','v_favoplist','v_vrecommend'],['v_tv','v_video','v_plist']],
		permit:	0,
		
		only:		true,
		ableDel:	true,
		ableSetOpt:	true,
		ableSetTit:	false,
		ableSetCol:	true,
		ableSetIco:	false,
		ableSetPer: false
	},
	{
		title:	'ChinaRen',
		desc:	'包含常用的ChinaRen模块',
		ico:	146,
		type:	'5',
		hash:	'p_chinaren',
		colStyle: '50:50',
		widgets:[['cr_ding','cr_club2','cr_focus','cr_club3','cr_party'],['cr_clubpic','cr_campus','cr_club1','cr_feature','cr_club4']],
		permit:	0,
		
		only:		true,
		ableDel:	true,
		ableSetOpt:	true,
		ableSetTit:	false,
		ableSetCol:	true,
		ableSetIco:	false,
		ableSetPer: false
	},
	{
		title:	'大本营',
		desc:	'搜狐各产品的大本营',
		info:	'这里是搜狐大本营，您可以由此方便地进入搜狐各个产品。其内容为私有，只有您自己可见。',
		ico:	55,
		type:	'3',
		hash:	'p_camp',
		colStyle: '33:33:33',
		widgets:[['camp_passport'],['camp_blog','camp_mail','camp_pp'],['camp_club','camp_alumni','camp_xiaonei','camp_crclub']],
		permit:	1,
		
		only:		true,
		ableDel:	false,
		ableSetOpt:	true,
		ableSetTit:	false,
		ableSetCol:	true,
		ableSetIco:	false,
		ableSetPer: false,
		demo:		true
	},
	{
		title:	'',
		desc:	'可以自定义页面标题、图标、版式等',
		ico:	0,
		type:	'0',
		hash:	'p_0',
		colStyle: '',
		widgets:[],
		permit:	0,
		
		only:		false,
		ableDel:	true,
		ableSetOpt:	true,
		ableSetTit:	true,
		ableSetCol:	true,
		ableSetIco:	true,
		ableSetPer: false
	}
];

// set editable box's style
// the style when mouse over
var highlightStyle = {
	backgroundColor: 	'white',
	border:				'1px solid #ccc',
	padding:			'0'
};
// the style when mouse out
var unHighlightStyle = {
	backgroundColor: 	'transparent',
	border:				'none',
	padding:			'1px'
};
// the prefix of the module container's id
// the id will looks like "col_1"
var colId_prefix = 'col_';

// the prefix of the page hash
var pageHash_prefix = 'tp_';

// set the default column style
var defaultColStyle = '33:33:33';

// set whether only create first page's mods when init browser
var createOnlyFirstPageMod = true;

// set the max count of pages
var maxPageTabCount = 6;

// set the max count of modules in one page
var maxPerPageModCount = 20;

var lib = {
	Lang: Actions.jsPath+'lang_'+lang+'.js'
};

function checkOptVar() {
	if (!_sff) {
		$LR('<span style="color:red"><strong>Warning:</strong> _sff = false</span>');
	}
	if (!_sff_l) {
		$LR('<span style="color:red"><strong>Warning:</strong> _sff_l = false</span>');
	}
	if (pageLib[3].ableSetPer) {
		$LR('<span style="color:red"><strong>Warning:</strong> page0.ableSetPer = true</span>');
	}
}
checkOptVar();
/******* App Js For Sohu Personal Portal Page **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2005-12-26
//	Last Update: 2008-06-05
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
var App = {
	version: '0.2',
	
	/***** user options *****/
	
	// set app's 
	// value:
	//	1: guest
	//	2: manager
	status: (isMyBlog()? ((getUserType() == 3)? 3:2) : 1),
	
	
	// set app's theme
	theme: (typeof _theme != 'undefined'? _theme : 'default'),
	
	
	/***** system options *****/
	
	// set language
	// value:
	//	'zh': chinese
	//	'en': english
	lang: (typeof lang != 'undefined'? lang : 'zh'),
	
	Actions: Object.extend({
		// set images base path
		// value:
		//	an url path not with file name
		// imgPath: '/demo/images/',
		imgPath: 'http://js3.pp.sohu.com.cn/ppp/blog/styles_ppp/images/',
		
		// set icons short path based on imgPath
		// value:
		// 	an short url path not with file name and imgPath
		// icoShortPath: 'custom/icons/',
		icoShortPath: 'custom/icons/',
		
		// set themes base path
		// value:
		//	an url path not with file name
		// imgPath: '/demo/images/',
		themePath: 'http://js1.pp.sohu.com.cn/ppp/blog/themes_ppp/',
		
		// set js base path
		// value:
		//	an url path not with file name
		// jsPath: '/js/',
		jsPath: 'http://js2.pp.sohu.com.cn/ppp/blog/js_ppp/',
		
		// set widget base path
		// value:
		//	an url path not with file name
		// jsPath: '/js/',
		widgetLibPath: 'http://js4.pp.sohu.com.cn/ppp/blog/widgets/',
		
		// set user's style
		// value:
		//	an url path
		customTheme: '/manage/style.do',
	
		// set user's modules list
		// value:
		//	an url path
		userData: '/action/',
		
		// set new module action
		// value:
		//	an url path
		newMod: '/manage/module.do',
		
		// set delete module action
		// value:
		//	an url path
		delMod: '/manage/module.do',
		
		// set edit module action
		// value:
		//	an url path
		editMod: '/manage/module.do',
		
		// set new page action
		// value:
		//	an url path
		newPage: '/manage/page.do',
		
		// set delete page action
		// value:
		//	an url path
		delPage: '/manage/page.do',

		// set edit page action
		// value:
		//	an url path
		editPage: '/manage/page.do',

		// set column style action
		// value:
		//	an url path
		//colStyle: '/manage/module.do',
		
		// set update user's style action
		// value:
		//	an url path
		editUserStyle: '/manage/module.do',
		
		// set theme action
		// value:
		//	an url path
		theme: '/manage/theme.do',
		
		// set theme greenway action
		// value:
		//	an url path
		themeGW: '/manage/theme.do',
		
		// set links manage action
		// value:
		//	an url path
		linkMng: '/manage/link.do',
		
		// set greenway action
		// value:
		//	an url path
		greenWay: 'http://act.blog.sohu.com/service/list_code.jsp',

		// set proxy to load file on other domain
		// value:
		//	an url path
		// proxyURL: 'proxy?fetchUrl=http://test.com/test.xml&xslt=http://test.com/test.xsl&cache=10&nocache=true',
		proxyURL: '/hp'
		
	}, (typeof Actions != 'undefined'? Actions : {}) ),
	
	// set client side cache
	// if this's setted to 'true', every file imported by js will nocache on client
	// value:
	//	true: nocache
	//	false: cache
	noCache: (typeof noCache != 'undefined'? noCache : false),
	
	// set default server side cache time(minute)
	cacheTime: (typeof defaultCacheTime != 'undefined'? defaultCacheTime : 30),
	
	// set the max time to load an widget
	maxWidgetLoadTime:  (typeof maxWidgetLoadTime != 'undefined'? maxWidgetLoadTime : 10000),
	
	// column style list
	colStyleLib: Object.extend({
		'25:25:25:25':		'custom/colStyles/25_25_25_25.gif',
		'25:50:25': 		'custom/colStyles/25_50_25.gif',
		'25:25:50': 		'custom/colStyles/25_25_50.gif',
		'50:25:25': 		'custom/colStyles/50_25_25.gif',


		'50:50': 			'custom/colStyles/50_50.gif',
		'25:75': 			'custom/colStyles/25_75.gif',
		'75:25': 			'custom/colStyles/75_25.gif'
	}, (typeof colStyleLib != 'undefined'? colStyleLib : {}) ),
	
	
	// icon list
	icoLib: Object.extend([
		'none.gif','anchor.gif','attach.gif','basket.gif','bomb.gif','book.gif','book_addresses.gif','book_open.gif','brick.gif','briefcase.gif','bug.gif','cake.gif','calendar_view_day.gif','calendar_view_month.gif','camera.gif','car.gif','cd.gif','chart_bar.gif','chart_curve.gif','chart_organisation.gif','chart_pie.gif','clock.gif','clock_red.gif','cog.gif','coins.gif','color_swatch.gif','comment.gif','computer.gif','connect.gif','creditcards.gif','door.gif','door_open.gif','drink.gif','drink_empty.gif','email.gif','email_open.gif','email_open_image.gif','emoticon_evilgrin.gif','emoticon_grin.gif','emoticon_happy.gif','emoticon_smile.gif','emoticon_surprised.gif','emoticon_tongue.gif','emoticon_unhappy.gif','emoticon_waii.gif','emoticon_wink.gif','exclamation.gif','eye.gif','feed.gif','flag_blue.gif','flag_green.gif','flag_orange.gif','flag_pink.gif','flag_purple.gif','flag_red.gif','flag_yellow.gif','folder.gif','heart.gif','house.gif','image.gif','information.gif','ipod.gif','keyboard.gif','layout.gif','lightbulb.gif','lightbulb_off.gif','lock.gif','lock_open.gif','lorry.gif','lorry_flatbed.gif','magnifier.gif','money.gif','money_dollar.gif','money_euro.gif','money_pound.gif','money_yen.gif','monitor.gif','mouse.gif','music.gif','new.gif','note.gif','page.gif','page_copy.gif','page_white.gif','page_white_acrobat.gif','page_white_code.gif','page_white_compressed.gif','page_white_excel.gif','page_white_flash.gif','page_white_php.gif','page_white_picture.gif','page_white_powerpoint.gif','page_white_text.gif','page_white_word.gif','page_white_world.gif','palette.gif','paste_plain.gif','pencil.gif','phone.gif','photo.gif','picture.gif','printer.gif','printer_empty.gif','rainbow.gif','rosette.gif','server.gif','shield.gif','sport_8ball.gif','sport_basketball.gif','sport_football.gif','sport_golf.gif','sport_raquet.gif','sport_shuttlecock.gif','sport_soccer.gif','sport_tennis.gif','star.gif','stop.gif','tag_blue.gif','tag_green.gif','tag_orange.gif','tag_pink.gif','tag_purple.gif','tag_red.gif','tag_yellow.gif','telephone.gif','television.gif','thumb_down.gif','thumb_up.gif','trash.gif','tux.gif','user.gif','user_female.gif','user_gray.gif','user_green.gif','user_orange.gif','user_red.gif','user_suit.gif','vcard.gif','weather_clouds.gif','weather_cloudy.gif','weather_lightning.gif','weather_rain.gif','weather_snow.gif','weather_sun.gif','world.gif','zoom.gif','chinaren.gif','olympic.gif'
	], (typeof icoLib != 'undefined'? icoLib : []) ),
	
	// set editable box's style
	// the style when mouse over
	highlightStyle: Object.extend({
		backgroundColor: 	'white',
		border:				'1px solid #ccc',
		padding:			'0'
	}, (typeof highlightStyle != 'undefined'? highlightStyle : {}) ),
	// the style when mouse out
	unHighlightStyle: Object.extend({
		backgroundColor: 	'transparent',
		border:				'none',
		padding:			'1px'
	}, (typeof unHighlightStyle != 'undefined'? unHighlightStyle : {}) ),
	
	// the prefix of the module container's id
	// the id will looks like "col_1"
	colId_prefix: (typeof colId_prefix != 'undefined'? colId_prefix : 'col_'),
	
	// the prefix of the page hash
	pageHash_prefix: (typeof pageHash_prefix != 'undefined'? pageHash_prefix : 'tp_'),
	
	// set the default column style
	defaultColStyle: '33:33:33',
	
	// set whether only create first page's mods when init browser
	createOnlyFirstPageMod: (typeof createOnlyFirstPageMod != 'undefined'? createOnlyFirstPageMod : true),
	
	// set the max count of pages
	maxPageTabCount: (typeof maxPageTabCount != 'undefined'? maxPageTabCount : 5),
	
	// set the max count of modules in one page
	maxPerPageModCount: (typeof maxPerPageModCount != 'undefined'? maxPerPageModCount : 20),
	
	// set whether show new widget tip on the "add widget" button
	showNewWidgtTip: (typeof showNewWidgtTip != 'undefined'? showNewWidgtTip : false),
	
	// set whether show new theme tip on the "set theme" button
	showNewThemeTip: (typeof showNewThemeTip != 'undefined'? showNewThemeTip : false),
	
	cancelBubble: function(event) {
		Event.stop(event);
	}
};
// user's permit
App.Permit = {
	resize: App.status == 2,	// resizalbe module
	editModule: App.status == 2,	// editable module
	sortable: App.status == 2,	// sortable module
	editTheme: App.status == 2,	// editable theme
	editHead: App.status == 2,	// editable page head
	editPageTab: App.status == 2,	// editable page tab options


	ableViewPvtPageTab: (App.status == 2 || App.status == 3),	// able view privet page tab
	ableToy: getUrlParam('t'+'o'+'y') == 'true',	// able toy mode
	able3rdDev: getUrlParam('3'+'r'+'dD'+'e'+'v') == 'true',	// able dev mode
	ableDemo: getUrlParam('p'+'p'+'pDe'+'vel'+'ope'+'r') == 'true',	// able demo mode
	ableLog: getUrlParam('l'+'o'+'g') == 'true'	// able log mode
};
// load library file
App.Lib = {
	lib: Object.extend({
		Lang: App.Actions.jsPath+'lang_'+App.lang+'.js'
		//Json: App.Actions.jsPath+'json.js',
		//Menu: App.Actions.jsPath+'menu.js',
		
		/******* Effet Js **********/
		//	Based on Scriptaculous (http://script.aculo.us)
		//	Version: '1.5.1'
		//	Modifid by Todd Lee (www.todd-lee.com)
		//ScriptaculousEffects: App.Actions.jsPath+'effects.js',
		//ScriptaculousDragdrop: App.Actions.jsPath+'dragdrop.js'
	}, (typeof lib != 'undefined'? lib : {})),
	
	load: function(){
		$H(this.lib).each(function(f){
			document.write('<scr'+'ipt type="text/javascript" charset="utf-8" src="'+f.value+'"></scr'+'ipt>');
		});
	}
};
App.Lib.load();

//	管理所有类型Widget的配置信息(by jady)
App.WidgetLib = {
	gallery: Object.extend([
		{
			key: 'other',
			title: ''
		}
	], (typeof widgetGallery != 'undefined'? widgetGallery : []) ),
	getGallery: function(key) {
		return this.gallery.find(function(g) {
			return (g && g.key && g.key == key);
		});
	},
	lib: Object.extend([], (typeof widgetLib != 'undefined'? widgetLib : []) ),
	getWidget: function(type) {
		return this.lib.find(function(w) {
			return (w && w.type && w.type == type);
		});
	},
	analyseAll: function() {
		var _lib = [];
		$A(this.lib).each(function(w){
			var _w = this.getAnalysedWidget(w);
			if (_w) {
				_lib.push(_w);
				if (_w.isNew && this.getGallery(_w.gal) && !this.getGallery(_w.gal).hasNew) {
					this.getGallery(_w.gal).hasNew = true;
					if (!this.hasNew) {
						this.hasNew = true;
					}
				}
			}
		}.bind(this));
		this.lib = _lib;
	},
	getAnalysedWidget: function(widget) {
		var result = Object.extend({
			title:	'No Title',
			desc:	'no description.',
			ico:	App.Actions.imgPath+'ico_widget.gif',
			author:	'Todd Lee',
			site:	'http://www.todd-lee.com',
			pubDate:'Sun, 16 May 1982 11:30:00 GMT',
			
			type:	'',	// must
			path:	'',	// must
			js:		[],
			css:	[],
			only:	false,
			sys:	false,
			ableDel:true,
			toy:	false,
			dev:	false,
			demo:	false,
			private:false,
			gal:	'other'
		}, (widget || {}) );
		if (!App.showNewWidgtTip && result.isNew) {
			result.isNew = null;
		}
		if (!result.type) {
			alert('Error: widget type is undefined.');
			return null;
		}
		if (!result.path) {
			alert('Error: path of widget ['+ result.type +'] is undefined.');
			return null;
		}
		var baseWidgetPath = result.path;
		
		if (result.ico) {
			var ico = result.ico.trim();
			if (ico && ico.indexOf('http://') !== 0 && ico.indexOf('/') !== 0) {
				ico = baseWidgetPath + (ico || '');
			}
			result.ico = ico;
		}
		
		$A(result.js).each(function(f, i){
			if (f.indexOf('http://') !== 0 && f.indexOf('/') !== 0) {
				result.js[i] = baseWidgetPath + f;
			}
		});
		
		$A(result.css).each(function(f, i){
			if (f.indexOf('http://') !== 0 && f.indexOf('/') !== 0) {
				result.css[i] = baseWidgetPath + f;
			}
		});
		
		return(result);
	}
};
App.WidgetLib.analyseAll();

//	管理所有类型Page的配置信息(by jady)
App.PageLib = {
	lib: Object.extend([], (typeof pageLib != 'undefined'? pageLib : []) ),
	getPage: function(type) {
		return this.lib.find(function(p) {
			return (p && p.type && p.type == type);
		});
	},
	analyseAll: function() {
		var _lib = [];
		$A(this.lib).each(function(p){
			var _p = this.getAnalysedPage(p);
			if (_p) {
				_lib.push(_p);
			}
		}.bind(this));
		this.lib = _lib;
	},
	//	获取一个page的配置信息
	getAnalysedPage: function(page) {
		var result = Object.extend({
			title:	'',
			desc:	'',
			ico:	0,
			author:	'Todd Lee',
			site:	'http://www.todd-lee.com',
			pubDate:'Sun, 16 May 1982 11:30:00 GMT',
			
			type:	'',	// must
			hash:	'',	// must (which hash go to this page)
			colStyle: App.defaultColStyle,
			widgets:[],
			permit:	0,
			
			only:	false,
			ableDel:true,
			ableSetOpt:	true,
			ableSetTit:	true,
			ableSetCol:	true,
			ableSetIco:	true,
			ableSetPer: true,
			
			toy:	false,
			dev:	false,
			demo:	false
		}, (page || {}) );
		if (!result.type) {
			alert('Error: page type is undefined.');
			return null;
		}
		if (!result.hash) {
			alert('Error: page hash is undefined.');
			return null;

		}
		return(result);
	}
};
App.PageLib.analyseAll();

// theme list
App.ThemeLib = {
	group: Object.extend([
		{
			key: 'sys',
			title: ''
		}
	], (typeof themeGroup != 'undefined'? themeGroup : []) ),
	getGroup: function(key) {
		return this.group.find(function(g) {
			return (g && g.key && g.key == key);
		});
	},
	lib: Object.extend([], (typeof themeLib != 'undefined'? themeLib : []) ),
	getTheme: function(id) {
		return this.lib.find(function(t) {
			return (t && t.id && t.id == id);
		});
	},
	analyseAll: function() {
		var _lib = [];
		$A(this.lib).each(function(t){
			var _t = this.getAnalysedTheme(t);
			if (_t) {
				_lib.push(_t);
				if (_t.isNew && this.getGroup(_t.grp) && !this.getGroup(_t.grp).hasNew) {
					this.getGroup(_t.grp).hasNew = true;
					if (!this.hasNew) {
						this.hasNew = true;
					}
				}
			}
		}.bind(this));
		this.lib = _lib;
	},
	getAnalysedTheme: function(theme) {
		var result = Object.extend({
			id:		'',	// must
			grp:	'sys',
			smp:	'sample.jpg',
			path:	'',
			code:	'',
			name:	''
		}, (theme || {}) );
		if (!App.showNewThemeTip && result.isNew) {
			result.isNew = null;
		}
		if (!result.id) {
			alert('Error: theme id is undefined.');
			return null;
		}
		return(result);
	},
	add: function(theme) {
		if (this.getTheme(theme.id)) {return;}
		this.lib.push(this.getAnalysedTheme(theme));
	}
};
App.ThemeLib.analyseAll();


// custom theme header bgi list
App.CusThemeLib = {
	headerBgi: {
		lib: Object.extend([], (typeof cusThemeHeaderBgi != 'undefined'? cusThemeHeaderBgi : []) ),
		getImg: function(src) {
			return this.lib.find(function(img) {
				return (img && img.src && img.src == src);
			});
		},
		analyseAll: function() {
			var _lib = [];
			$A(this.lib).each(function(img){
				var _img = this.getAnalysedImg(img);
				if (_img) {
					_lib.push(_img);
				}
			}.bind(this));
			this.lib = _lib;
		},
		getAnalysedImg: function(img) {
			var result = Object.extend({
				src:	'',	// must
				smp:	'',
				tiled:	'',	// noRepeat | repeat | repeatX | repeatY
				align:	'', // left/center/right top/center/bottom
				height:	'' // int
			}, (img || {}) );
			if (!result.src) {
				alert('Error: header bgi url is undefined.');
				return null;
			}
			return(result);
		}
	},
	bodyBgi: {
		lib: Object.extend([], (typeof cusThemeBodyBgi != 'undefined'? cusThemeBodyBgi : []) ),
		getImg: function(src) {
			return this.lib.find(function(img) {
				return (img && img.src && img.src == src);
			});
		},
		analyseAll: function() {
			var _lib = [];
			$A(this.lib).each(function(img){
				var _img = this.getAnalysedImg(img);
				if (_img) {
					_lib.push(_img);
				}
			}.bind(this));
			this.lib = _lib;
		},
		getAnalysedImg: function(img) {
			var result = Object.extend({
				src:	'',	// must
				smp:	'',
				tiled:	'',	// noRepeat | repeat | repeatX | repeatY
				align:	'' // left/center/right top/center/bottom
			}, (img || {}) );
			if (!result.src) {
				alert('Error: header bgi url is undefined.');
				return null;
			}
			return(result);
		}
	}
};
App.CusThemeLib.headerBgi.analyseAll();
App.CusThemeLib.bodyBgi.analyseAll();
/*-------------------------------------------------------------*/


App.ImpBase = function() {};
App.ImpBase.prototype = {
	setOptions: function(options) {
		this.options = Object.extend({
			parameters: '',
			onFailure: this.reportError.bind(this),
			method: 'get'
		}, options || {});
		if (App.noCache) {
			this.options.parameters = this.options.parameters? 
				this.options.parameters + '&c='+timeStamp() : 'c='+timeStamp();
		}
	},
	reportError: function(request) {
		var str = App.Lang.error +': '+ request.status +' '+ 
			(typeof request.statusText!= 'undefined'?request.statusText:'') +'\n\n';
		if (request.status == '404') {
			str += App.Lang.fileNotFound;
			str += ' ( '+ this.url +' )\n';
		}
		else if (request.status == '500') {
			str += App.Lang.serverError;
			str += ' ( '+ this.url +' )\n';
		}
		else if (request.status == '403') {
			str += App.Lang.noPermit;
			str += ' ( '+ this.url +' )\n';
		}
		else if (request.status == '12007') {
			str += App.Lang.notConneted;
		}
		else if (request.status == '12029') {
			str += App.Lang.cannotGetConnetion;
			str += ' ( '+ this.url +' )\n';
		}
		else {
			str += App.Lang.unknownError;
			str += ' ( '+ this.url +' )\n';
		}
		
		if (request.status == '500') {
			str += App.Lang.contactAdmin +'\n';
		}
		//if (Browser.ua != 'opera') {str += '\n'+ App.Lang.seeMoreInfo +'\n';}
		LoadBar.hide();
		
		/*if (Browser.ua != 'opera') {
			if (confirm(str)) {alert(request.responseText);}
		}
		else {*/
			alert(str);
		//}
		/*if (Browser.ua != 'opera') {
			var opt4popWin = {
				type: 'confirm',
				focus: false,
				title: App.Lang.error,
				ico: 'error',
				content: str,
				width: '300',
				okAction: this.showError.bind(this),
				okData: request.responseText
			};
		}
		else {
			var opt4popWin = {
				type: 'alert',
				title: App.Lang.error,
				ico: 'error',
				content: str,
				width: '300'
			};
		}
		new PopWin(opt4popWin);*/
		return false;
	},
	showError: function(text) {
		var opt4popWin = {
			type: 'alert',
			title: App.Lang.info,
			content: text,
			width: '600'
		};
		var aa = new PopWin(opt4popWin);
	}


};
// import file
// var url = 'test.xml';
// var pars = 'pars=test';
/* var myFile = new App.ImpFile( url, 
	{parameters: pars, onComplete: callbackFunc, onFailure: reportError, data: argObj } );
*/
App.ImpFile = Class.create();
App.ImpFile.prototype = Object.extend(new App.ImpBase(), {
	initialize: function(_url, options) {
		_url = _url.trim();
		var url;
		this.setOptions(options);
		if (isLocalFile(_url)) {
			url = _url;
		}
		else {
			url = App.Actions.proxyURL;
			this.options.parameters += (this.options.parameters.length>0? '&':'') + 'url='+encodeURIComponent(_url);
		}
		if (this.options.nocache) {
			this.options.parameters += (this.options.parameters.length>0? '&':'') + 'nocache='+timeStamp();
		}
		this.url = url;
		var myAjax = new Ajax.Request(this.url, this.options);
	}
});

// put text to editable input
/*
var _high = {
	backgroundColor: 	'transparent',
	border:				'1px solid red',

	padding:			'0px'
};
var _unHigh = {
	backgroundColor: 	'transparent',
	border:				'none',
	padding:			'1px'
};
var test = new App.EditableText($('testDiv'), 
	{type: text, showBtn: true, overStyle:_high, outStyle: _unHigh, 
	editStyle: 'text', defaultValue: 'default', maxSize: 400, onChange: response});
*/
App.EditableText = Class.create();
App.EditableText.prototype = {
	initialize: function(obj, options) {
		this.obj = obj;
		this.options = Object.extend({
			able: true,
			type: 'text',
			defaultValue: '',
			showBtn: false,
			overStyle: App.highlightStyle,
			outStyle: App.unHighlightStyle,
			maxSize: 9999,
			maxLenght: 9999,
			filter: function(str){return str;}
		}, options || {});
		this.type = this.options.type;
		this.setOut();
		this.buildText();
		if (this.options.able) {
			Event.observe(this.obj, 'mouseover', this.setOver.bindAsEventListener(this));
			Event.observe(this.obj, 'mouseout', this.setOut.bindAsEventListener(this));
			
			this.eventCancelBubble = App.cancelBubble.bindAsEventListener(this);
			Event.observe(this.obj, 'click', this.eventCancelBubble);

			Event.observe(this.obj, 'click', this.setToEditMode.bindAsEventListener(this));
		}
	},
	buildText: function() {
		this.data = this.obj.innerHTML.convertHTMLToText().convertTextToHTML() || this.options.defaultValue;
		var str = '';
		if (this.type == 'text') {
			str += '<span>'+ this.options.filter(this.data) +'</span>';
			str += '<span style="display:none"><input type="text" maxlength="'+ this.options.maxLenght +'" /></span>';
			this.obj.innerHTML = str;
		}
		else if (this.type == 'area') {
			str += '<div>'+ this.options.filter(this.data) +'</div>';
			str += '<div style="display:none">';
			str += '<textarea style="overflow:auto;" maxlength="'+ this.options.maxLenght +'"></textarea>';
			str += '</div>';
			this.obj.innerHTML = str;
		}
		this.text = this.obj.firstChild;
		this.edit = this.text.nextSibling;
		this.inputElm = this.edit.firstChild;
	},
	setOver: function() {
		if (this.editing) {return false;}
		Element.setStyle(this.obj, this.options.overStyle); 
		this.obj.style.cursor = 'text';
	},
	setOut: function() {
		if (this.editing) {return false;}
		Element.setStyle(this.obj, this.options.outStyle);
		this.obj.style.cursor = 'default';
	},
	setToEditMode: function() {
		if (this.editing) {return false;}
		this.editing = true;
		this.setOver();
		this.initForm();
	},
	initForm: function() {
		if (this.options.showBtn) {
			var str = '';
			str += '<span><input type="button" value="'+ App.Lang.save +'" />';
			str += '<a href="javascript:void(0)">'+ App.Lang.cancel +'</a></span>';
			var aa = new Insertion.After(this.obj, str);
			var opt = this.obj.nextSibling;
			var okBtn = opt.firstChild;
			var cancelBtn = opt.lastChild;
			Event.observe(okBtn, 'click', this.finish.bindAsEventListener(this));
			Event.observe(cancelBtn, 'click', this.cancel.bindAsEventListener(this));
		}
		var text = this.text;
		var edit = this.edit;
		var inputElm = this.inputElm;
		inputElm.className = this.options.editStyle;
		inputElm.style.border = 'none';
		Element.hide(text);
		Element.show(edit);
		if (this.type == 'text') {
			inputElm.value = this.data.convertHTMLToText();
			Field.activate(inputElm);
		}
		else if (this.type == 'area') {
			inputElm.value = this.data.convertHTMLToText();
			Field.setCursorToEnd(inputElm);
		}
		this.refreshSize();
		this.lastData = this.data;
		Event.observe(inputElm, 'keyup', this.refreshSize.bindAsEventListener(this));
		if (!this.options.showBtn) {
			Event.observe(inputElm, 'blur', this.finish.bindAsEventListener(this));
		}
		if (this.type == 'text') {
			Event.observe(inputElm, 'keydown', this.onEnterDown.bindAsEventListener(this));
		}
	},
	finish: function () {
		if (!this.editing) {return false;}
		var _v = this.inputElm.value;
		if (this.type == 'text') {
			this.data = (_v==='') ? this.options.defaultValue || '' : _v.escapeHTML();
		}
		else if (this.type == 'area') {
			this.data = (_v==='') ? this.options.defaultValue || '' : _v.convertTextToHTML();
		}
		Element.hide(this.edit);
		this.text.innerHTML = this.options.filter(this.data);
		Element.show(this.text);
		Element.hide(this.edit);
		if (this.options.showBtn) {
			this.hideBtn();
		}
		this.editing = false;
		this.setOut();
		if (this.data != this.lastData && this.options.onChange) {
			(this.options.onChange)(this.data);
		}
	},
	cancel: function () {
		if (!this.editing) {return false;}
		this.text.innerHTML = this.options.filter(this.lastData);
		Element.hide(this.edit);






		Element.show(this.text);
		this.hideBtn();

		this.editing = false;
		this.setOut();
	},
	hideBtn: function () {
		Element.remove(this.obj.nextSibling);
	},





	refreshSize: function () {
		if (!this.editing) {return false;}
		var text = this.text;
		var inputElm = this.inputElm;
		Element.show(text);
		if (this.type == 'text') {
			text.style.whiteSpace = 'nowrap';
			//text.style.styleFloat = 'left';
			text.innerHTML = inputElm.value.escapeHTML();
			inputElm.style.width = Math.min( (parseInt(text.offsetWidth) + 20), this.options.maxSize ) + "px";
			inputElm.style.height = parseInt(text.offsetHeight) +'px';
		}
		else if (this.type == 'area') {
			text.innerHTML = inputElm.value.convertTextToHTML();
			inputElm.style.width = parseInt(text.offsetWidth) -4 +'px';
			inputElm.style.height = Math.min( (parseInt(text.offsetHeight) + 20), this.options.maxSize ) + "px";
		}
		Element.hide(text);
	},
	onEnterDown: function () {
		if (!this.editing) {return false;}
		if (window.event.keyCode == Event.KEY_RETURN) {
			this.finish();
		}
	}
};

App.Resizables = {
	resizes: [],
	activeResizable: null,
	register: function(resizable) {
		if (this.resizes.length === 0) {
			this.eventMouseUp   = this.end.bindAsEventListener(this);
			this.eventMouseMove = this.resize.bindAsEventListener(this);
			this.eventKeypress  = this.keyPress.bindAsEventListener(this);
			
			Event.observe(document, "mouseup", this.eventMouseUp);
			Event.observe(document, "mousemove", this.eventMouseMove);
			Event.observe(document, "keypress", this.eventKeypress);
		}
		this.resizes.push(resizable);
	},
	
	unregister: function(resizable) {
		this.resizes = this.resizes.reject(function(r) { return r==resizable; });
		if(this.resizes.length === 0) {
		  Event.stopObserving(document, "mouseup", this.eventMouseUp);
		  Event.stopObserving(document, "mousemove", this.eventMouseMove);
		  Event.stopObserving(document, "keypress", this.eventKeypress);
		}
	},
	
	activate: function(resizable) {
		window.focus(); // allows keypress events if window isn't currently focused, fails for Safari
		this.activeResizable = resizable;
	},
	
	deactivate: function(resizable) {
		this.activeResizable = null;
	},
	resize: function(event) {
		if(!this.activeResizable) {return;}
		var pointer = [Event.pointerX(event), Event.pointerY(event)];
		// Mozilla-based browsers fire successive mousemove events with
		// the same coordinates, prevent needless redrawing (moz bug?)
		if(this._lastPointer && (this._lastPointer.inspect() == pointer.inspect())) {return;}
		this._lastPointer = pointer;
		
		this.activeResizable.resize(event);
	},
	
	end: function(event) {
		if(!this.activeResizable) {return;}
		this._lastPointer = null;
		this.activeResizable.end(event);
		this.activeResizable = null;
	},
	
	keyPress: function(event) {
		if(this.activeResizable) {
			this.activeResizable.keyPress(event);
		}
	}
};
// set resizable object
/* new App.Resizable('mod_00001', 
	{borderStart: 10, 
	border: 10, 
	constraint: 'horizontal', 
	addons: 'content', 
	snap: snapFun, 
	change:onResizeChangeFun});
*/
App.Resizable = Class.create();
App.Resizable.prototype = {
	initialize: function(element, options) {
		this.element =$(element);
		this.options = Object.extend({
			able: true,
			borderStart: 0,   // 0, or xy or [x,y]
			border: 10,
			zindex: 1000,
			constraint: false,
			snap: false,   // false, or xy or [x,y] or function(x,y){ return [x,y] }
			defaultWidth: null,
			defaultHeight: null
		}, options || {});
		
		if (this.options.addons) {
			if (this.options.addons.constructor != Array) {
				var obj = this.options.addons;
				this.options.addons = [];
				this.options.addons.push(obj);
			}
			this.options.addons = $A(this.options.addons).map( function(o){
				if(o && (typeof o == 'string')) {
					var addon = document.getElementsByClassName(o, this.element)[0];
				}
				if(!addon) {addon = $(o);}
				return (addon);
			}.bind(this) );
		}
		
		Element.cleanWhitespace(this.element);
		
		if (options.defaultWidth || options.defaultHeight) {
			this.resizeTo(options.defaultWidth, options.defaultHeight);
		}
		this.eventMouseMove = this.over.bindAsEventListener(this);
		this.eventMouseDown = this.start.bindAsEventListener(this);
		Event.observe(this.element, 'mousemove', this.eventMouseMove);
		Event.observe(this.element, 'mousedown', this.eventMouseDown);
		
		App.Resizables.register(this);
	},
	destroy: function() {
		Event.stopObserving(this.element, "mousemove", this.eventMouseMove);
		Event.stopObserving(this.element, "mousedown", this.eventMouseDown);
		if (this.options.addons) {
			this.options.addons.each(function(o){
				o.style.width = o._originalWidth || '';
				o.style.height = o._originalHeight || '';
				o._originalWidth  = null;
				o._originalHeight = null;
			}.bind(this));
		}
		App.Resizables.unregister(this);
	},
	over: function(event) {
		if (!this.options.able) {return false;}
		if (App.Resizables.activeResizable) {return false;}
		
		var offset = this.getOffset(event);
		var size = [this.element.offsetWidth, this.element.offsetHeight];
		var ableXY = this.options.constraint? 
			[this.options.constraint == 'horizontal', this.options.constraint == 'vertical'] : [true, true];
		this.resizeXY =  [0,1].map( function(i) {


			var _borderStart;
			if (this.options.borderStart instanceof Array) {_borderStart = this.options.borderStart[i];}
			else {_borderStart = this.options.borderStart;}
			return ( ableXY[i] && (offset[i] < (size[i] - _borderStart)) && 
				(offset[i] > (size[i] - _borderStart - this.options.border)) );
		}.bind(this) );

		this.element.style.cursor = (this.resizeXY[0] || this.resizeXY[1])? 
			((this.resizeXY[1]?"s":"") + (this.resizeXY[0]?"e":"") + "-resize") : "default";
	},
	start: function(event) {
		if (!this.resizeXY || (!this.resizeXY[0] && !this.resizeXY[1])) {return;}
		var offset = this.getOffset(event);
		var dis = this.getDis(this.element);
		var size = [(parseInt(Element.getStyle(this.element, 'width')) || this.element.offsetWidth-dis[0]), 
			(parseInt(Element.getStyle(this.element, 'height')) || this.element.offsetHeight-dis[1])];
		this.sm = [0,1].map(function(i){return size[i] - offset[i];});

		if (this.options.addons) {
			this.options.addons.each(function(o){
				o.addonDis = this.getDis(o);
				o.addonSize = [(parseInt(Element.getStyle(o, 'width')) || o.offsetWidth-o.addonDis[0]), 
					(parseInt(Element.getStyle(o, 'height')) || o.offsetHeight-o.addonDis[1])];
				o.sm = [0,1].map(function(i){return o.addonSize[i] - offset[i];});
				
				//o._originalWidth  = o.style.width;
				//o._originalHeight = o.style.height;
				
			}.bind(this));
		}

		App.Resizables.activate(this);
	},
	resize: function(event) {
		if (!this.resizing) {
			this.resizing = true;
			this.originalZ = parseInt(Element.getStyle(this.element,'z-index') || 0);
			this.element.style.zIndex = this.options.zindex;
		}
		this.draw(event);

		if (this.options.change) {this.options.change(this);}
		App.cancelBubble(event);
	},
	draw: function(event) {
		var offset = this.getOffset(event);
		var s = [0,1].map( function(i) { 
			return ( offset[i] + this.sm[i] );
		}.bind(this) );
		
		if (this.options.snap) {
			if (typeof this.options.snap == 'function') {
				s = this.options.snap(this.element, s[0], s[1]);
			} else {
				if (this.options.snap instanceof Array) {

					s = s.map( function(v, i) {
						return Math.round(v/this.options.snap[i])*this.options.snap[i];
					}.bind(this) );
				} else {
					s = s.map( function(v) {
						return Math.round(v/this.options.snap)*this.options.snap;
					}.bind(this) );
				}
			}
		}
		
		var c = [0,1].map( function(i) {return ( s[i] - this.sm[i] );}.bind(this));
		if (this.options.addons) {
			this.options.addons.each(function(o){
				if(this.resizeXY[0]) {
					o.style.width = Math.max(o.sm[0]+c[0], 0) + "px";
				}
				if(this.resizeXY[1]) {
					o.style.height = Math.max(o.sm[1]+c[1], 0) + "px";
				}
			}.bind(this));
		}

		
		if(this.resizeXY[0]) {
			this.element.style.width = Math.max(s[0], 0) + "px";
		}
		if(this.resizeXY[1]) {
			this.element.style.height = Math.max(s[1], 0) + "px";
		}
	},
	end: function(event) {
		if(!this.resizing) {return;}
		this.resizing = false;
		if(this.options.zindex) {
			this.element.style.zIndex = this.originalZ;
		}
		App.Resizables.deactivate(this);
		if (this.options.update) {this.options.update(this);}
		App.cancelBubble(event);
	},
	resizeTo: function(w, h) {
		var c = [w, h];
		var dis = this.getDis(this.element);
		var size = [(parseInt(Element.getStyle(this.element, 'width')) || Element.getDimensions(this.element).width-dis[0]), 
			(parseInt(Element.getStyle(this.element, 'height')) || Element.getDimensions(this.element).height-dis[1])];
		var offset = [0,1].map(function(i){return c[i] - size[i];});

		if (this.options.addons) {
			this.options.addons.each(function(o){
				o.addonDis = this.getDis(o);
				o.addonSize = [(parseInt(Element.getStyle(o, 'width')) || Element.getDimensions(o).width-o.addonDis[0]), 
					(parseInt(Element.getStyle(o, 'height')) || Element.getDimensions(o).height-o.addonDis[1])];
				o.ss = [0,1].map(function(i){return o.addonSize[i] + offset[i];});
				
				o._originalWidth  = o.style.width;
				o._originalHeight = o.style.height;
				
				if(c[0]) {o.style.width = o.ss[0] +'px';}
				if(c[1]) {o.style.height = o.ss[1] +'px';}
			}.bind(this));
		}
		if(c[0]) {
			this.element.style.width = Math.max(c[0], 0) + "px";
		}
		if(c[1]) {
			this.element.style.height = Math.max(c[1], 0) + "px";
		}
	},
	adjustSize: function(w, h) {
		var fdis = this.getDis(this.element.firstChild);
		var fsize = [(parseInt(Element.getStyle(this.element.firstChild, 'width'))+fdis[0] || 
						Element.getDimensions(this.element.firstChild).width), 
			(parseInt(Element.getStyle(this.element.firstChild, 'height'))+fdis[1] || 
				Element.getDimensions(this.element.firstChild).height)];
		var dis = this.getDisPadding(this.element);
		if (w) {
			this.element.style.width = fsize[0] + dis[0] +'px';
		}
		if (h) {
			this.element.style.height = fsize[1] + dis[1] +'px';
		}
	},
	getOffset: function(event) {
		var pointer = [Event.pointerX(event), Event.pointerY(event)];
		var pos     = Position.cumulativeOffset(this.element);
		var offset = [0,1].map( function(i) { return (pointer[i] - pos[i]); });
		return offset;
	},
	getDisPadding: function(element) {
		var dis = [
			0 	+ (parseInt(Element.getStyle(element, 'padding-left')) || 0) 
				+ (parseInt(Element.getStyle(element, 'padding-right')) || 0),
			0 	+ (parseInt(Element.getStyle(element, 'padding-top')) || 0) 
				+ (parseInt(Element.getStyle(element, 'padding-top')) || 0)
		];
		return dis;
	},
	getDisBorder: function(element) {
		var dis = [
			0 	+ (parseInt(Element.getStyle(element, 'border-left-width')) || 0) 
				+ (parseInt(Element.getStyle(element, 'border-right-width')) || 0), 
			0 	+ (parseInt(Element.getStyle(element, 'border-top-width')) || 0) 
				+ (parseInt(Element.getStyle(element, 'border-bottom-width')) || 0)
		];

		return dis;
	},
	getDis: function(element) {
		var dis = [0,1].map(function(i){
			return (0 + this.getDisPadding(element)[i] + this.getDisBorder(element)[i]);
		}.bind(this));
		return dis;
	},
	keyPress: function(event) {
		if(!event.keyCode == Event.KEY_ESC) {return;}
		this.end(event);
	}
};



App.Requester = {
	orderObj: null,
	floatObj: [],
	request: function(mode, obj) {
		switch(mode) {
			case 'new':
			case 'del':
			case 'newPage':
			case 'delPage':
			case 'editPageTitle':
			case 'editPageColStyle':
			case 'editPageIco':
			case 'editPagePermit':
			case 'editPageMods':
			case 'editPage':
			case 'pageOrder':
			//case 'colStyle':
			case 'customTheme':
			case 'customThemeClean':
			case 'theme':
			case 'themeGW':
			case 'styleAll':
			//case 'expand':
			//case 'linkMng':
			case 'userData':
				this.doSend(mode, obj);
				break;
			case 'edit':
				if (!obj.options.id) {
					obj.endSave();
					return;
				}
				this.doSend(mode, obj);
				break;
			case 'order':
				/*if (!this.orderObj) {
					this.eventSendOrder = this.doSend.bind(this, 'order', null);
					Event.observe(window, 'unload', this.eventSendOrder);
				}

				this.orderObj = obj;*/
				this.doSend(mode, obj);
				break;
			case 'float':
				if (this.floatObj.length === 0) {
					this.eventSendFloat = this.sendFloatAll.bind(this);
					Event.observe(window, 'unload', this.eventSendFloat);
				}
				if (!$A(this.floatObj).include(obj.options.id)) {
					this.floatObj.push(obj.options.id);
				}
				break;
				
			default: return;
		}
	},
	sendFloatAll: function() {
		$A(this.floatObj).each(function(id){
			if ($(id)) {
				this.doSend( 'float', App.Modules.getObjByElement($(id)) );
			}
		}.bind(this));
	},
	doSend: function(mode, obj) {
		LoadBar.show();
		var url = '';
		var options = {};
		switch(mode) {
			case 'userData':
				LoadBar.show(App.Lang.loadUserModule);
				//url = App.Actions.userData;
				url = App.Actions.userData+'m_list-ebi_'+ _ebi +'/module/';
				if (App.Permit.editModule) {
					url += '?o=true';
				}
				options = {
					data: {okFun: App.UserData.response.bind(App.UserData)}
				};
				break;
			case 'order':
				url = App.Actions.editMod;
				obj = obj || this.orderObj;
				options = {
					parameters: 'm=update&id='+obj.id+'&type=order&data='+JSON.stringify(obj.data),
					method: 'post'
				};
				//Event.stopObserving(window, 'unload', this.eventSendOrder);
				break;
			case 'new':
				url = App.Actions.newMod;
				options = {
					parameters: 'm=save&type='+obj.options.type+
						'&title='+escape(obj.options.title)+
						'&data='+escape(JSON.stringify(obj.options.data) || ''),
					data: {okFun: App.Modules.doNewMod.bind(App.Modules)},
					method: 'post'
				};
				break;
			case 'edit':
				url = App.Actions.editMod;
				options = {
					parameters: 'm=update&id='+obj.options.id+
						'&type='+obj.options.type+
						'&title='+escape(obj.options.title)+
						'&data='+escape(JSON.stringify(obj.options.data)||''),
					data: {okFun: obj.endSave.bind(obj)},
					method: 'post'
				};
				break;
			case 'del':
				url = App.Actions.delMod;
				options = {
					parameters: 'm=delete&id='+obj.options.id,
					data: {okFun: obj.doClose.bind(obj)}
				};
				break;
			case 'newPage':
				url = App.Actions.newPage;
				options = {
					parameters: 'm=save&type='+obj.options.type+
						'&title='+escape(obj.options.title)+
						'&ico='+obj.options.ico+
						'&colStyle='+obj.options.colStyle+
						'&permit='+obj.options.permit+
						'&widget='+JSON.stringify(obj.options.widgets),
					data: {okFun: App.PageTabs.analyseNewPageTab.bind(App.PageTabs)},
					method: 'post'
				};
				break;
			case 'delPage':
				url = App.Actions.delPage;
				options = {
					parameters: 'm=delete&id='+obj.options.id,
					data: {okFun: obj.doClose.bind(obj)}
				};
				break;
			case 'editPageTitle':
				url = App.Actions.editPage;
				options = {
					parameters: 'm=update&id='+obj.options.id+
						'&type='+obj.options.type+
						'&title='+escape(obj.newTitle),
					data: {okFun: obj.doSaveTitle.bind(obj)},
					method: 'post'
				};
				break;
			case 'editPageColStyle':
				url = App.Actions.editPage;
				options = {
					parameters: 'm=update&id='+obj.options.id+
						'&colStyle='+escape(obj.newColStyle),
					data: {okFun: obj.doSetColStyle.bind(obj)},
					method: 'post'
				};
				break;
			case 'editPageIco':
				url = App.Actions.editPage;
				options = {
					parameters: 'm=update&id='+obj.options.id+
						'&ico='+escape(obj.newIco),
					data: {okFun: obj.doSetIcon.bind(obj)},
					method: 'post'
				};
				break;
			case 'editPagePermit':
				url = App.Actions.editPage;
				options = {
					parameters: 'm=update&id='+obj.options.id+
						'&permit='+escape(obj.newPermit),
					data: {okFun: obj.doSetPermit.bind(obj)},
					method: 'post'
				};
				break;

			case 'editPageMods':
				url = App.Actions.editPage;
				options = {
					parameters: 'm=update&id='+obj.options.id+
						'&mods='+JSON.stringify(obj.newMods),
					method: 'post'
				};
				break;
			case 'editPage':
				url = App.Actions.editPage;
				options = {
					parameters: 'm=update&id='+obj.options.id+
						'&title='+escape(obj.options.title)+
						'&ico='+obj.options.ico+
						'&colStyle='+obj.options.colStyle+
						'&permit='+obj.options.permit+
						'&mods='+JSON.stringify(obj.options.mods),
					//data: {okFun: obj.endSave.bind(obj)},
					method: 'post'
				};
				break;
			case 'pageOrder':
				url = App.Actions.editPage;
				options = {
					parameters: 'm=update&layout='+JSON.stringify(obj.data),
					method: 'post'
				};
				break;
			case 'theme':
				url = App.Actions.theme;
				options = {
					parameters: 'm=update&v=xml&theme='+obj,
					data: {okFun: App.Themes.doSetTheme.bind(App.Themes)},
					method: 'post'
				};
				break;
			case 'themeGW':
				url = App.Actions.themeGW;
				options = {
					parameters: 'm=update&v=xml&greenThemeId='+obj.themeCode+'&vcode='+obj.vcode+'&vcodeEn='+escape(obj.vcodeEn),
					data: {okFun: App.Framework.okSetThemeGW.bind(App.Framework),
						errorFun: App.Framework.errorSetThemeGW.bind(App.Framework)},
					method: 'post'
				};
				break;
			case 'customTheme':
				url = App.Actions.customTheme;
				options = {
					parameters: 'm=update&v=xml&'+obj,
					data: {okFun: App.UserStyle.saveOk.bind(App.UserStyle)},
					method: 'post'
				};
				break;
			case 'customThemeClean':
				url = App.Actions.customTheme;
				options = {
					parameters: 'm=clean&v=xml',
					data: {okFun: App.UserStyle.cleanOk.bind(App.UserStyle)},
					method: 'post'
				};
				break;
			//	重新设置博客的样式
			case 'styleAll':
				url = App.Actions.customTheme;
				options = {
					parameters: 'm=updateAll&v=xml&'+obj,
					data: {okFun: App.UserStyle.styleAllOk.bind(App.UserStyle)},
					method: 'post'
				};
				break;
			case 'float':
				url = App.Actions.editMod;
				options = {
					parameters: 'id='+obj.options.id+'&floating='+JSON.stringify(obj.options.floating)
				};
				break;
			case 'expand':
				url = App.Actions.editMod;
				options = {
					parameters: 'id='+obj.options.id+'&isExpanded='+JSON.stringify(obj.options.isExpanded)
				};
				break;
			/*case 'linkMng':
				url = App.Actions.linkMng;
				options = {
					parameters: 'm='+ obj.m +'&id='+ obj.id + (obj.tit? ('&title='+obj.tit) : '') + 
						(obj.desc? ('&desc='+obj.desc) : '') + (obj.url? ('&link='+obj.url) : '')
					data: obj.responseFun,
				};
				break;*/
		}
		this.doRequest(url, options);
		//setTimeout(function(){this.request(url, options);}.bind(this), 10);
	},
	doRequest: function(url, options) {
		options = Object.extend({
			method: 'get',
			onSuccess: App.Response.analyse.bind(App.Response)
		}, (options || {}) );
		var aa = new App.ImpFile(url, options);
	}
};
App.Response = {
	analyse: function(request, json, exData) {
		LoadBar.hide();
		if (!request) {return this.connetionError();}
		if (!request.responseText)  {
			return this.connetionError();
		}
		if (request.responseText.indexOf('<?') !== 0)  {
			return this.notWebFormed(request);
		}
		if (!request.responseXML)  {
			return this.notWebFormed(request);
		}
		var xmlDom = request.responseXML;

		var code = Element.getChildValueByTagName(xmlDom, 'code')[0];
		var message = Element.getChildValueByTagName(xmlDom, 'message')[0].trim();
		if (typeof code == 'undefined' || typeof message == 'undefined') {
			return this.notWebFormed(request);
		}
		
		if (exData && exData.defaultFun && typeof exData.defaultFun == 'function') {
			exData.defaultFun(code, message);
		}
		if (code == '200') {
			var data = xmlDom.getElementsByTagName('data')[0];
			if (exData && exData.okFun && typeof exData.okFun == 'function') {
				exData.okFun(data);
			}
			else {
				return data;
			}
		}
		else {
			this.reportError(code, message);
			if (exData && exData.errorFun && typeof exData.errorFun == 'function') {
				exData.errorFun(code, message);
			}
		}
	},
	connetionError: function() {
		var str = App.Lang.error +': '+ App.Lang.connetionError +'\n\n';
		str += App.Lang.cannotGetConnetion +'\n';
		str += App.Lang.contactAdmin +'\n';
		
		alert(str);
		/*var opt4popWin = {
			type: 'alert',
			title: App.Lang.error,
			content: str
		};
		new PopWin(opt4popWin);*/
		return null;
	},
	notWebFormed: function(request) {
		var str = App.Lang.error +': '+ App.Lang.analyseFileError +'\n\n';
		str += App.Lang.notWellFormed +'\n';
		str += App.Lang.contactAdmin +'\n';
		str += '-------------------------\n';
		str += (request.responseText.length <= 100)? request.responseText : request.responseText.substring(0, 100)+'...';
		
		alert(str);
		/*var opt4popWin = {
			type: 'alert',
			title: App.Lang.error,
			content: str,
			html: false,
			width: 700
		};
		new PopWin(opt4popWin);*/
		return null;
	},
	reportError: function(code, message) {
		if (code == '401') {
			var str = App.Lang.notLogon +'\n\n';
			str += App.Lang.pleaseLogon;
			if (confirm(str)) {
				location.href = 'http://blog.sohu.com/login/logon.do';
				return;
			}
		}
		if (code == '403') {
			var str = App.Lang.noPermitOrNotLogon +'\n\n';
			str += App.Lang.pleaseLogon;
			if (confirm(str)) {
				location.href = 'http://blog.sohu.com/login/logon.do';
				return;
			}
		}
		else {
			var str  = '';
			str += Info.htmlInfo(unescape(message),1,' ');
			//str += App.Lang.errorCode +': '+ code +'\n';
			//str += App.Lang.errorMessage +': '+ Info.htmlInfo(unescape(message),1,'') +'\n';
			//str += App.Lang.contactAdmin +'\n';
			alert(str);
		}
		/*var opt4popWin = {
			type: 'alert',
			title: App.Lang.error,
			content: str
		};
		new PopWin(opt4popWin);*/
		return null;
	}
};


App.Framework = {
	initialize: function() {
		if (App.Permit.ableLog) {
			$LT('App.Framework.initialize');
		}
		if (App.Permit.editHead) {
			//initHead();
		}
		
		App.Framework.initNavBar();
		
		App.Framework.indiBtnCntn = $('op'+'ti'+'onN'+'av');
		
		//	初始化主题按钮
		App.Framework.initThemeBtn();
		
		//	判断用户是否能够编辑主题
		if (App.Permit.editTheme) {
			//	判断是否默认显示设置主题弹出层
			var hash = window.location.hash;
			if (hash && hash.length > 1) {
				hash = hash.split("#method_");
				if (hash.length == 2 && hash[1].length > 0) {
					if(hash[1] == "settheme")
						Event.observe(window, 'load', App.Framework.setTheme.bind(App.Framework));
					else if(hash[1] == "custtheme")
						Event.observe(window, 'load', App.UserStyle.customTheme.bind(App.UserStyle));
				}
			}
		}
		
		App.UserData.load();
	},
	initNavBar: function() {
		if (App.Permit.ableLog) {
			$LT('App.Framework.initNavBar');
		}
		
		this._mainNavBar = $('ma'+'inN'+'av');
		var arr = [];
		arr.push('<ul></ul>');
		this._mainNavBar.innerHTML = arr.join('');
		arr = null;
		
		this.elm_navBar = this._mainNavBar.firstChild;
	},
	showNewPageBtn: function() {
		this.initNewPageBtn();
	},
	initNewPageBtn: function() {
		if (App.Permit.ableLog) {
			$LT('App.Framework.initNewPageBtn');
		}
		
		var aNewPageBtn = document.createElement('span');
		this.elm_newPageBtn = aNewPageBtn;
		aNewPageBtn.id = 'newPageBtn';
		aNewPageBtn.innerHTML = '<a href="javascript:void(0)" onfocus="this.blur()" onmousedown="CA.q(\'blog_addPage\');">'+App.Lang.newPageBtn+'</a>';
		
		this._mainNavBar.appendChild(aNewPageBtn);

		Event.observe(aNewPageBtn, 'click', App.cancelBubble.bindAsEventListener(this));
		Event.observe(aNewPageBtn, 'click', this.newPage.bindAsEventListener(this));
	},
	getNewPageMenuData: function() {
		var arr = [];
		$A(App.PageLib.lib).each(function(p) {
			var disabled = false;
			var disabledSign = '';
			var disabledText = '';
			if (p.only && (App.PageTabs.getPTabByType(p.type).length > 0)) {
				disabled = true;
				disabledSign += '<img src="'+ App.Actions.imgPath +'ico_tick_small.gif" />';
				disabledText += App.Lang.alreadyInUse;
			}
			if (p.demo && !App.Permit.ableDemo) {
				throw $continue;
			}
			if (p.dev && !App.Permit.able3rdDev && !App.Permit.ableDemo) {
				throw $continue;
			}
			if (p.toy && !App.Permit.ableToy && !App.Permit.ableDemo) {
				throw $continue;
			}
			var pInfo = {
				text: '<img src="'+ (p.ico != 0? (App.Actions.imgPath + App.Actions.icoShortPath + App.icoLib[p.ico]) : (App.Actions.imgPath + 'spacer.gif')) +'" alt="'+ p.title +'" /> '+ 
					(p.title? p.title : App.Lang.customPage) + 
					disabledSign +
					(p.toy? '*':'') + 
					(p.demo? '**':''),
				title: p.desc + (disabled? (' ('+disabledText+')') : '' ),
				action: App.PageTabs.newPageTab.bind(App.PageTabs),
				value: p.type,
				disabled: disabled
			};
			arr.push(pInfo);
		}.bind(this));
		return ([{
			title: null,
			active: true,
			data: arr
		}]);
	},
	newPage: function() {
		if (!this.newPageMenu) {
			var opt4newPage = {
				menuData: this.getNewPageMenuData(),
				title: null,
				clsBtn: false,
				autoCls: true,
				autoActive: false,
				btn: this.elm_newPageBtn,
				zIndex: 500,
				sDivCss: 'menuSub-div menuSub-div-newPage'
			};
			
			this.newPageMenu = new WinMenu(opt4newPage);
		}
		if (!this.newPageMenu.win.showing) {
			this.newPageMenu.show();
		}
		else {
			this.newPageMenu.hide();
		}
	},
	updateNewPageMenuContent: function() {
		if (!this.newPageMenu) {return;}
		this.newPageMenu.updateMenuData(this.getNewPageMenuData());
	},
	initModContainer: function() {
		var _container = $('mai'+'nWra'+'pp'+'er');
		
		var arr = [];
		arr.push('<div id="innerMainWrapper">');
		arr.push('<div style="display:none"></div>');
		arr.push('<div id="modContainer">');
		arr.push('</div>');
		arr.push('</div>');
		_container.innerHTML = arr.join('');
		
		this.elm_modCtnInfo = _container.firstChild.firstChild;
		this.elm_modCtn = _container.firstChild.lastChild;
		
	},
	initThemeBtn: function() {
		//	判断用户是否能够编辑主题
		if (App.Permit.editTheme) {
			if (App.Permit.ableLog) {
				$LT('App.Framework.initThemeBtn');
			}
			
			//	显示设置主题按钮
			var liThemeBtn = document.createElement('li');
			this.elm_themeBtn = liThemeBtn;
			var str = '<a href="javascript:void(0)" onfocus="this.blur()" class="navEditTheme" onmousedown="CA.q(\'blog_editTheme\');">'+App.Lang.setTheme+'</a>';
			if (App.ThemeLib.hasNew) {
				str += '<img src="'+ App.Actions.imgPath +'ico_new.gif" alt="'+ App.Lang.hasNewTheme +'" title="'+ App.Lang.hasNewTheme +'" class="new" />';
			}
			liThemeBtn.innerHTML = str;
			
			this.indiBtnCntn.insertBefore(liThemeBtn, this.indiBtnCntn.firstChild);
			
			Event.observe(liThemeBtn, 'click', this.setTheme.bindAsEventListener(this));
		} else {
			//	显示使用该主题按钮
			var liThemeBtn = document.createElement('li');
			this.elm_userThemeBtn = liThemeBtn;
			var str = '<a href="javascript:void(0)" onfocus="this.blur()" class="navEditTheme" onmousedown="CA.a(\'useTheme\');">使用此博客主题</a>';
			liThemeBtn.innerHTML = str;
			
			this.indiBtnCntn.insertBefore(liThemeBtn, this.indiBtnCntn.firstChild);
			
			Event.observe(liThemeBtn, 'click', this.useTheme.bindAsEventListener(this));
		}
	},
	initNewModBtn: function() {
		if (App.Permit.ableLog) {
			$LT('App.Framework.initNewModBtn');
		}
		
		var liNewModBtn = document.createElement('li');
		this.elm_newModBtn = liNewModBtn;
		var str = '<a href="http://blog.sohu.com/manage/setting.do?m=newEdit" class="navSysOpt" >博客设置</a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onfocus="this.blur()" class="navNewMod" onmousedown="CA.q(\'blog_addMod\');">'+App.Lang.newModule+'</a>';
		if (App.WidgetLib.hasNew) {
			str += '<img src="'+ App.Actions.imgPath +'ico_new.gif" alt="'+ App.Lang.hasNewWidget +'" title="'+ App.Lang.hasNewWidget +'" class="new" />';
		}
		liNewModBtn.innerHTML = str;
		
		this.indiBtnCntn.insertBefore(liNewModBtn, this.indiBtnCntn.firstChild);
		
		Event.observe(liNewModBtn, 'click', this.newMod.bindAsEventListener(this));
	},
	getNewModMenuData: function() {
		var arr1 = [];
		$A(App.WidgetLib.gallery).each(function(g, i) {
			if (g.demo && !App.Permit.ableDemo) {
				throw $continue;
			}
			if (g.dev && !App.Permit.able3rdDev && !App.Permit.ableDemo) {
				throw $continue;
			}
			if (g.toy && !App.Permit.ableToy && !App.Permit.ableDemo) {
				throw $continue;
			}
			if (g.type == "function") {
				var arr2 = this._reqMods.bind(this, g);
			} else {
				var arr2 = [];
				$A(App.WidgetLib.lib).each(function(w) {
					if (w.gal != g.key) {throw $continue;}
					var disabled = false;
					var disabledSign = '';
					var disabledText = '';
					if (w.only && App.UserData.getModByType(w.type)) {
						disabled = true;
						disabledSign += '<img src="'+ App.Actions.imgPath +'ico_tick_small.gif" />';
						disabledText += App.Lang.alreadyInUse;
					}
					var activePage = App.PageTabs.getActivePTab();
					if (w.private && activePage && activePage.options.permit == 0) {
						disabled = true;
						disabledSign += '<img src="'+ App.Actions.imgPath +'ico_warn_small.gif" />';
						disabledText += App.Lang.onlyInPrivatePage;
					}
					if (w.demo && !App.Permit.ableDemo) {
						throw $continue;
					}
					if (w.dev && !App.Permit.able3rdDev && !App.Permit.ableDemo) {
						throw $continue;
					}
					if (w.toy && !App.Permit.ableToy && !App.Permit.ableDemo) {
						throw $continue;
					}
					var wInfo = {
						text: '<img src="'+ w.ico +'" alt="'+ w.title +'" /> '+ 
							w.title + disabledSign +
							(w.toy? '<span>*</span>':'') + 
							(w.demo? '**':'') +
							(w.isNew? '<img src="'+ App.Actions.imgPath +'ico_new.gif" alt="'+ App.Lang.newWidget +'" title="'+ App.Lang.newWidget +'" class="new" />' : ''),
						title: w.desc + (disabled? (' ('+disabledText+')') : (w.sys? (' ('+App.Lang.sysMod+')'):'') ),
						action: App.Modules.newMod.bind(App.Modules),
						value: w.type,
						disabled: disabled
					};
					arr2.push(wInfo);
				}.bind(this));
			}
			arr1.push({
				title: g.title + (g.hasNew || g.isNew? ' <img src="'+ App.Actions.imgPath +'ico_new.gif" alt="'+ App.Lang.hasNewWidget +'" title="'+ App.Lang.hasNewWidget +'" class="new" />':'') + (g.toy? '*':'') + (g.demo? '**':''),
				active: (i == 0),
				data: arr2
			});
		}.bind(this));
		return arr1;
	},
	
	//	请求模块列表
	_reqMods: function(gallery, index) {
		//	创建加载中的显示提示
		var menuOpt = this.newModMenu.options;
		var menuCss = menuOpt.menuData[index].isDivCssEx;
		var divSubContent = document.createElement('div');
		divSubContent.className = menuOpt.isDivCss +' clearfix';
		if (menuCss) {
			Element.addClassName(divSubContent, menuCss);
		}
		divSubContent.innerHTML = App.Lang.loadModuleData;
		
		//	发送请求
		new Groj(gallery.dataUrl, {
			variable: 'ow_recmd_widgets',
			onSuccess: this._getMods.bind(this, index),
			onFailure: this._notGetMods.bind(this, index)
		});
		
		//	返回加载中的对象供菜单显示
		return divSubContent;
	},
	
	_getMods: function(index, json) {
		if (json) {
			if (json.status == 0) {
				
				//	判断是否存在有效数据
				if (json.data && json.data.length) {
					json.data
					var arr2 = [];
					json.data.each(function(w) {
						arr2.push({
							text: '<img src="'+ w.icon +'" alt="'+ w.title +'" /> '+ w.title,
							title: w.description,
							action: App.Modules.newOwMod.bind(App.Modules),//this.newModPre.bind(this),
							value: w.link,
							disabled: false
						});
					});
					this.newModMenu.options.menuData[index].data = arr2;
					this.newModMenu.updateSubContent(index);
				} else {
					
					//	没有模块
					this._notGetMods(index, this.newModMenu.options.noneInfo);
				}
			} else {
				
				//	状态有错误
				this._notGetMods(index, json.statusText);
			}
		} else {
			
			//	文件格式有错误
			this._notGetMods(index, App.Lang.notWellFormed);
		}
	},
	
	_notGetMods: function(index, transport) {
		this.newModMenu.elm_subConts[index].innerHTML = typeof(trasport) == "string" ? transport : transport.statusText;
	},
	
	newMod: function() {
		if (!this.newModMenu) {
			var divMoreMod = document.createElement('div');
			divMoreMod.className = 'more';
			divMoreMod.innerHTML = App.Lang.moreMod;
			var opt4newMod = {
				menuData: this.getNewModMenuData(),
				title: App.Lang.newModule,
				autoActive: false,
				btn: this.elm_newModBtn,
				displace: [-210, 0],
				noneInfo: App.Lang.noWidget,
				zIndex: 500,
				sDivCss: 'menuSub-div menuSub-div-newMod',
				elm_extendBottom: divMoreMod
			};
			
			this.newModMenu = new WinMenu(opt4newMod);
		}
		if (!this.newModMenu.win.showing) {
			if (this.setThemeMenu && this.setThemeMenu.win.showing) {
				this.setThemeMenu.hide();
			}
			this.newModMenu.show();
		}
		else {
			this.newModMenu.hide();
		}
	},
	updateNewModMenuContent: function() {
		if (!this.newModMenu) {return;}
		this.newModMenu.updateMenuData(this.getNewModMenuData());
	},
	getGreenWaySubMenuData: function(index) {
		this.setThemeMenu.index = index;
		var divSubContent = document.createElement('div');
		divSubContent.className = 'menuInnerSub-div clearfix menuInnerSub-div-theme';

		
		var arr = [];
		arr.push('<form method="post" onsubmit="return false;">');
		arr.push('<table style="clear:both;" cellpadding="2" cellspacing="5">');
		arr.push('<tr><td width="55" valign="top">');
		arr.push(App.Lang.greenWay +':');
		arr.push('</td><td>');
		arr.push(App.Lang.blogworldSohuGWThemes);
		arr.push('</td></tr>');
		arr.push('<tr><td>');
		arr.push(App.Lang.gwCode +':');
		arr.push('</td><td>');
		arr.push('<input type="text" name="themeCode" class="text" /> <span style="font-weight:bold; cursor:pointer; padding:0px 4px; border:1px solid #ccc;" title="'+ App.Lang.whatisGW +'">?</span>');
		arr.push('</td></tr>');
		arr.push('<tr style="display:none"><td>&nbsp;</td><td>');
		arr.push('<div class="infoBox" style="float:none;">');
		arr.push(App.Lang.gwInfoText);
		arr.push('</div>');
		arr.push('</td></tr>');
		arr.push('<tr style="display:none;"><td>');
		arr.push(App.Lang.vCode +':');
		arr.push('</td><td>');
		arr.push('</td></tr>');
		arr.push('<tr><td>');
		arr.push('&nbsp;</td><td><input type="submit" class="button-submit" value="'+ App.Lang.ok +'" />');
		arr.push('<span style="display:none;">'+App.Lang.loading+'</span>');
		arr.push('</td></tr>');
		arr.push('</table>');
		arr.push('<div className="clearfix" style="clear:both;"></div>');
		arr.push('</form>');
		divSubContent.innerHTML = arr.join('');
		
		this.setThemeMenu.gwForm = divSubContent.firstChild;
		this.setThemeMenu.gwCodeIpt = divSubContent.firstChild.firstChild.rows[1].cells[1].firstChild;
		this.setThemeMenu.gwInfoBtn = divSubContent.firstChild.firstChild.rows[1].cells[1].lastChild;
		this.setThemeMenu.gwInfoText = divSubContent.firstChild.firstChild.rows[2];
		this.setThemeMenu.gwVCodeBox = divSubContent.firstChild.firstChild.rows[3];
		this.setThemeMenu.gwCodeSubmitBtn = divSubContent.firstChild.firstChild.rows[4].cells[1].firstChild;
		this.setThemeMenu.gwCodeSubmitLoadText = divSubContent.firstChild.firstChild.rows[4].cells[1].lastChild;
		this.setThemeMenu.greenWaySubMenu = divSubContent.firstChild.lastChild;
		
		Event.observe(this.setThemeMenu.gwForm, 'submit', this.submitGreenWayCode.bindAsEventListener(this));
		Event.observe(this.setThemeMenu.gwCodeIpt, 'focus', this.showGreenWayVCode.bindAsEventListener(this));
		//Event.observe(this.setThemeMenu.gwCodeSubmitBtn, 'click', this.submitGreenWayCode.bindAsEventListener(this));
		Event.observe(this.setThemeMenu.gwInfoBtn, 'click',function() {
			Element.toggle(this.setThemeMenu.gwInfoText);
		}.bind(this));
		

		setTimeout(this.loadGreenWayData.bind(this,index), 10);
		return divSubContent;
	},
	showGreenWayVCode: function() {
		if (this.setThemeMenu.gwVCodeBox.lastChild.innerHTML != '') {return;}
		var arr = [];
		arr.push('<input name="vcode" type="text" class="text" id="vcode" value="" size="4" maxlength="4" />&nbsp;');
		arr.push('<span></span>&nbsp;');
		//arr.push(App.Lang.vCodeInfo);
		arr.push('<a href="javascript:void(0)">'+App.Lang.cannotSeeVCode+'</a>');
		this.setThemeMenu.gwVCodeBox.lastChild.innerHTML = arr.join('');
		
		this.setThemeMenu.gwVCodeCon = this.setThemeMenu.gwVCodeBox.lastChild.getElementsByTagName('span')[0];
		this.setThemeMenu.gwVCodeRefresh = this.setThemeMenu.gwVCodeBox.lastChild.lastChild;
		
		this.setThemeMenu.gwVCodeRefresh.onclick = function() {new VCode(this.setThemeMenu.gwVCodeCon);}.bind(this);
		new VCode(this.setThemeMenu.gwVCodeCon);
		
		Element.show(this.setThemeMenu.gwVCodeBox);

	},
	submitGreenWayCode: function() {
		if (!Form.getInputs(this.setThemeMenu.gwForm, 'text', 'themeCode')[0].value) {
			alert(App.Lang.plsEnterGWCode);
			Form.getInputs(this.setThemeMenu.gwForm, 'text', 'themeCode')[0].focus();
			return false;
		}
		if (!Form.getInputs(this.setThemeMenu.gwForm, 'text', 'vcode')[0].value) {
			alert(App.Lang.plsEnterVCode);
			Form.getInputs(this.setThemeMenu.gwForm, 'text', 'vcode')[0].focus();
			return false;
		}
		
		this.setThemeMenu.gwCodeSubmitBtn.disabled = true;
		Element.show(this.setThemeMenu.gwCodeSubmitLoadText);
		App.Requester.request('themeGW', {
			themeCode: Form.getInputs(this.setThemeMenu.gwForm, 'text', 'themeCode')[0].value,
			vcode: Form.getInputs(this.setThemeMenu.gwForm, 'text', 'vcode')[0].value,
			vcodeEn: Form.getInputs(this.setThemeMenu.gwForm, 'hidden', 'vcodeEn')[0].value
		});
		return false;
	},
	okSetThemeGW: function(rData) {
		var themeId = Element.getChildValueByTagName(rData, 'theme')[0] || '';
		if (!themeId) {this.errorSetThemeGW();}
		App.Themes.doSetThemeGW(themeId);
		
		this.endSubmitGreenWayCode();
		this.setThemeMenu.gwCodeIpt.value = '';
		this.setThemeMenu.gwVCodeBox.lastChild.innerHTML = '';
		Element.hide(this.setThemeMenu.gwVCodeBox);
		this.setThemeMenu.hide();
		this.updateGreenWayData();
	},
	errorSetThemeGW: function() {
		this.endSubmitGreenWayCode();
	},
	endSubmitGreenWayCode: function() {
		if (Form.getInputs(this.setThemeMenu.gwForm, 'text', 'vcode')[0]) {
			Form.getInputs(this.setThemeMenu.gwForm, 'text', 'vcode')[0].value = '';
		}
		new VCode(this.setThemeMenu.gwVCodeCon);
		this.setThemeMenu.gwCodeSubmitBtn.disabled = false;
		Element.hide(this.setThemeMenu.gwCodeSubmitLoadText);
	},
	updateGreenWayData: function() {
		this.loadGreenWayData(this.setThemeMenu.index);
	},
	loadGreenWayData: function(index) {
		var url = App.Actions.greenWay +'?mail='+ getP() +'&nocache='+ timeStamp();
		new LinkFile(url, {
			type: 'script',
			callBack: {
				variable: 'gw_codes',
				onLoad: this.showGreenWayData.bind(this,index),
				onFailure: function() {
					this.greenWaySubMenu.innerHTML = '';
				}.bind(this)
			}});
	},
	//	生成“绿色主题”的入口
	showGreenWayData: function(index) {
		if (gw_codes.length > 0) {
			if (!this.setThemeMenu.greenWaySubTitle) {
				var divSIT = document.createElement('div');
				this.setThemeMenu.greenWaySubTitle = divSIT;
				divSIT.style.clear = 'both';
				divSIT.style.styleFloat = 'none';
				divSIT.style.width = 'auto';
				divSIT.style.padding = '5px 0px';
				divSIT.style.margin = '0px 5px';
				divSIT.style.borderTop = '1px solid #ccc';
				this.setThemeMenu.greenWaySubMenu.parentNode.insertBefore(divSIT, this.setThemeMenu.greenWaySubMenu);
			}
			this.setThemeMenu.greenWaySubTitle.innerHTML = App.Lang.myGWTheme +':';
		}
		this.setThemeMenu.greenWaySubMenu.innerHTML = '';
		gw_codes.each(function(s, i) {
			var th = {
				id: s.id,
				grp: 'gw',
				code: s.code
			};
			App.ThemeLib.add(th);
			th = App.ThemeLib.getTheme(th.id);
			var si = {
				text: '<img src="'+ (th.path || (App.Actions.themePath + th.id +'/')) + th.smp +'" alt="'+ (th.name || th.id) +'" />',
				title: th.name || th.id,
				action: App.Themes.setTheme.bind(App.Themes),
				value: th.id,
				active: (App.theme == th.id)
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
			this.greenWaySubMenu.appendChild(divSI);
		}.bind(this.setThemeMenu));
	},
	//	生成“主题自定义”的入口
	getCustomThemeSubMenuData: function(index) {
		this.setThemeMenu.index = index;
		var divSubContent = document.createElement('div');
		divSubContent.className = 'menuInnerSub-div clearfix menuInnerSub-div-theme';
		
		var str = '';
		str += '<input type="button" style="margin:5px 0 5px 20px;" value="'+ App.Lang.customTheme +'" />';
		str += '<input type="button" style="margin:5px 0 5px 20px;" value="'+ App.Lang.shareTheme +'" />';
		divSubContent.innerHTML = str;
		
		this.setThemeMenu.cusThemeBtn = divSubContent.firstChild;
		this.setThemeMenu.shareThemeBtn = divSubContent.childNodes[1];
		
		Event.observe(this.setThemeMenu.cusThemeBtn, 'click',function() {
			App.UserStyle.customTheme();
			this.setThemeMenu.hide();
		}.bind(this));
		
		Event.observe(this.setThemeMenu.shareThemeBtn, 'click', App.UserStyle.shareTheme.bind(App.UserStyle));
		
		return divSubContent;
	},
	getSetThemeMenuData: function() {
		var arr1 = [];
		$A(App.ThemeLib.group).each(function(g, i) {
			if (g.demo && !App.Permit.ableDemo) {
				throw $continue;
			}
			if (g.dev && !App.Permit.able3rdDev && !App.Permit.ableDemo) {
				throw $continue;
			}
			if (g.toy && !App.Permit.ableToy && !App.Permit.ableDemo) {
				throw $continue;
			}
			
			if (g.key == 'gw') {
				var arr2 = this.getGreenWaySubMenuData.bind(this);
			}
			else if (g.key == 'customTheme') {
				var arr2 = this.getCustomThemeSubMenuData.bind(this);
			} else if (g.type == "function") {
				var arr2 = this._reqThemes.bind(this, g);
			}
			else {
				var arr2 = [];
				$A(App.ThemeLib.lib).each(function(t) {
					if (t.grp != g.key) {throw $continue;}
					if (t.demo && !App.Permit.ableDemo) {
						throw $continue;
					}
					if (t.dev && !App.Permit.able3rdDev && !App.Permit.ableDemo) {
						throw $continue;
					}
					if (t.toy && !App.Permit.ableToy && !App.Permit.ableDemo) {
						throw $continue;
					}
					var _text = '<img src="'+ (t.path || (App.Actions.themePath + t.id +'/')) + t.smp +'" alt="'+ (t.name || t.id) +'" />';
					if (t.isNew) {
						_text += '<img src="'+ App.Actions.imgPath +'ico_new.gif" alt="'+ App.Lang.newTheme +'" title="'+ App.Lang.newTheme +'" class="new" />';
					}
					var tInfo = {
						text: _text,
						title: t.name || t.id,
						action: App.Themes.setTheme.bind(App.Themes),
						value: t.code || t.id,
						active: (App.theme == t.id)
					};
					arr2.push(tInfo);
				}.bind(this));
			}
			var divMoreTheme = null;
			if(g.more && g.moreUrl){
				divMoreTheme = '<div class="more" id="'+ g.moreId +'" style="display:none;"><a href="' + g.moreUrl + '" target="_blank">' + g.moreTitle + '</a></div>';
			}
			arr1.push({
				title: g.title + (g.hasNew || g.isNew? ' <img src="'+ App.Actions.imgPath +'ico_new.gif" alt="'+ App.Lang.hasNewTheme +'" title="'+ App.Lang.hasNewTheme +'" class="new" />':'') + (g.toy? '*':'') + (g.demo? '**':''),
				active: (i == 0),
				isDivCssEx: 'menuInnerSub-div-theme',
				itDivExtCss: g.itDivExtCss,
				data: arr2,
				more: divMoreTheme
			});
		}.bind(this));
		return arr1;
	},
	
	
	
	//	请求Theme列表
	_reqThemes: function(gallery, index) {
		//	创建加载中的显示提示
		var menuOpt = this.setThemeMenu.options;
		var menuCss = menuOpt.menuData[index].isDivCssEx;
		var divSubContent = document.createElement('div');
		var vn = gallery.dataUrl.split('vn=')[1].split('&')[0];
		divSubContent.className = menuOpt.isDivCss +' clearfix';
		if (menuCss) {
			Element.addClassName(divSubContent, menuCss);
		}
		divSubContent.innerHTML = App.Lang.loadModuleData;
		
		//	发送请求
		new Groj(gallery.dataUrl, {
			variable: vn,
			onSuccess: this._getThemes.bind(this, index,vn),
			onFailure: this._notGetThemes.bind(this, index)
		});
		
		//	返回加载中的对象供菜单显示
		return divSubContent;
	},
	
	_getThemes: function(index, vn, json) {
		if (json) {
			if (json.status == 0) {
				if(vn == 'ow_my_themes' && json.data.length > 8){
					$('ow_my_themes_more').show();
				} else if(vn == 'ow_latest_themes' && json.data.length == 16){
					$('ow_latest_themes_more').show();
				}
				//	判断是否存在有效数据
				if (json.data && json.data.length) {
					json.data
					var arr2 = [];
					json.data.each(function(w) {
						var text = '<img src="'+ w.thumbnail +'" alt="'+ w.title +'" />',
							value = w.link;
							action = App.Themes.setOT.bind(App.Themes);
						vn = typeof(vn) == 'string' ? vn : '';
						if(vn == 'ow_my_themes'){
							text += '<span class="span_jsy">使用</span>';
							value = w.id;
							action = App.Themes.setTheme.bind(App.Themes);
						} else if(vn == 'ow_latest_themes'){
							text += '<span class="span_jgm"><font>购买</font><b>￥</b>' + w.price + '</span>';
						}
						arr2.push({
							text: text,
							title: w.title,
							action: action,
							value: value,
							disabled: false
						});
					});
					this.setThemeMenu.options.menuData[index].data = arr2;
					this.setThemeMenu.updateSubContent(index);
				} else {
					
					//	没有Theme
					this._notGetThemes(index, this.setThemeMenu.options.noneInfo);
				}
			} else {
				
				//	状态有错误
				this._notGetThemes(index, json.statusText);
			}
		} else {
			
			//	文件格式有错误
			this._notGetThemes(index, App.Lang.notWellFormed);
		}
	},
	
	_notGetThemes: function(index, transport) {
		this.setThemeMenu.elm_subConts[index].innerHTML = typeof(transport) == "string" ? transport : transport.statusText;
	},
	
	//	使用当前博客的主题
	useTheme: function() {
		
		//	确认已经登陆
		if (!isLogin()) {
			setTimeout(function() {location.href = loginPath();}, 0);
			return;
		}
		
		//	不能是收费主题
		var tt = App.UserStyle.getThemeType();
		if (tt == 2) {
			new PopWin({
				type: 'alert',
				content: '此主题为收费主题，请先去收费模板专区购买！'
			});
			return;
		}
		

		new PopWin({
			type: 'confirm',
			//	title: App.Lang.error,
			content: '确定要使用此博客主题吗？',
			okAction: function() {
				var data;
				switch (tt) {
					//	基础主题
					case 1:
						data = 'clean=true&theme=' + App.UserStyle.getThemeId();
						break;
					//	自定义主题
					case 3:
						data = 'clean=true&ot=false&theme=' + App.UserStyle.getThemeId() + '&' + App.UserStyle.getCustomSets(true);
						break;
					//	开放主题
					case 4:
						data = 'clean=true&ot=true&theme=' + App.UserStyle.getThemeId() + '&' + App.UserStyle.getCustomSets(true);
						break;
				}
				App.Requester.request('styleAll', data);
			}
		});
		
	},
	
	//	将“设置主题”按钮与弹出层相联系
	setTheme: function() {
		if (!this.setThemeMenu) {
			var divMoreTheme = document.createElement('div');
			divMoreTheme.className = 'more';
			divMoreTheme.innerHTML = App.Lang.moreTheme;
			var opt4setTheme = {
				/*menuData: [
					{
						title: App.Lang.sysThemes,
						active: true,
						isDivCssEx: 'menuInnerSub-div-theme',
						data: []
					},
					{
						title: App.Lang.bwThemes,
						active: false,
						isDivCssEx: 'menuInnerSub-div-theme',
						data: []
					},
					{
						title: App.Lang.fei2Themes,
						active: false,
						isDivCssEx: 'menuInnerSub-div-theme',

						data: []
					},
					{
						title: App.Lang.g17173Themes,
						active: false,
						isDivCssEx: 'menuInnerSub-div-theme',
						data: []
					},
					{
						title: App.Lang.greenWayThemes,
						active: false,
						isDivCssEx: 'menuInnerSub-div-theme',
						data: this.getGreenWaySubMenuData.bind(this)
					}
				],*/
				menuData: this.getSetThemeMenuData(),
				title: App.Lang.setTheme,
				btn: this.elm_themeBtn,
				displace: [-495, 0],
				zIndex: 500,
				allInOne: true,
				sDivCss: 'menuSub-div menuSub-div-theme',
				elm_extendBottom: divMoreTheme
			};
			/*$A(App.ThemeLib.lib).each(function(s) {
				var theme = {
					text: '<img src="'+ (s.path || (App.Actions.themePath + s.id +'/')) + s.smp +'" alt="'+ (s.name || s.id) +'" />',
					title: s.name || s.id,
					action: App.Themes.setTheme.bind(App.Themes),
					value: s.code || s.id,
					active: (App.theme == s.id)
				};
				if (s.grp == 'sys' && opt4setTheme.menuData[0]) {
					opt4setTheme.menuData[0].data.push(theme);
				}
				else if (s.grp == 'bw' && opt4setTheme.menuData[1]) {
					opt4setTheme.menuData[1].data.push(theme);
				}
				else if (s.grp == 'fei2' && opt4setTheme.menuData[2]) {
					opt4setTheme.menuData[2].data.push(theme);
				}
				else if (s.grp == 'g17173' && opt4setTheme.menuData[3]) {
					opt4setTheme.menuData[3].data.push(theme);
				}
			}.bind(this));*/
			
			this.setThemeMenu = new WinMenu(opt4setTheme);
		}
		if (!this.setThemeMenu.win.showing) {
			if (this.newModMenu && this.newModMenu.win.showing) {
				this.newModMenu.hide();
			}
			this.setThemeMenu.show();
			//	this.resetShareTheme();
		}
		else {
			this.setThemeMenu.hide();
		}
	}
};
//Event.observe(window, 'load', App.Framework.initialize);
//getStart(App.Framework.initialize);
Starter.add(App.Framework.initialize);

App.UserData = {
	userModulesData: [],	// the moduls list that listed in the xml file
	userModulseOrder: null,	// the order modules
	loaded: false,
	load: function() {
		if (App.Permit.ableLog) {
			$LT('App.UserData.load');
		}
		this.userModulesData = [];
		this.userModulseOrder = null;
		
		
		// whether preload user data from page by object "preloadUserData"
		if (typeof preloadUserData == 'undefined' || !preloadUserData) {
			App.Requester.request('userData');
		}
		else {
			if (App.Permit.ableLog) {
				$LT('App.UserData load from page');
			}
			$A(preloadUserData).each(function(mod) {
				if (mod.type == 'order') {
					this.userModulseOrder = mod;
				}
				else {
					this.userModulesData.push(mod);
				}
			}.bind(this));
			
			this.startInitModContainer();
		}
	},
	response: function(rData) {
		this.analyse(rData);
	},
	analyse: function(rData) {
		if (App.Permit.ableLog) {
			$LT('App.UserData.analyse');
		}
		if (!rData) {return;}
		var modList = rData.getElementsByTagName('mod');
		$A(modList).each(function(m){
			var mod = this.getModData(m);
			
			if (mod.type == 'order') {
				this.userModulseOrder = mod;
			}
			else {
				this.userModulesData.push(mod);
			}
		}.bind(this));
		
		this.startInitModContainer();
	},
	startInitModContainer: function() {
		App.Framework.initModContainer();
		this.createPage();
		//this.create();
	},
	getModData: function(m) {
		var mod = {
			id: m.getAttribute('id') || '',
			type: m.getAttribute('type') || '',
			isExpanded: m.getAttribute('isExpanded') ? JSON.parse(m.getAttribute('isExpanded')) : true,
			share: m.getAttribute('share') ? JSON.parse(m.getAttribute('share')) : true,
			floating: m.getAttribute('floating') ? JSON.parse(m.getAttribute('floating')) : false,
			title: Element.getChildValueByTagName(m, 'title')[0] || '',
			data: Element.getChildValueByTagName(m, 'data')[0] ? 
				(JSON.parse(Element.getChildValueByTagName(m, 'data')[0]) || Element.getChildValueByTagName(m, 'data')[0]) : ''
		};
		return mod;
	},
	addMod: function(mod) {
		this.userModulesData.push(mod);
	},
	delMod: function(mod) {
		this.userModulesData = this.userModulesData.reject(function(m) {
			return m.id==mod.id; 
		});
	},
	createPage: function() {
		LoadBar.show(App.Lang.createAllPages);
		
		var activePage = '';
		if (location.hash) {
			var hash = location.hash;
			if (hash.indexOf('#'+ App.pageHash_prefix) == 0) {
				activePage = hash.substring(2);
			}
		}
		/*if (!activePage) {
			$A(this.userModulseOrder.data).each(function(p, i){
				if (p.permit == 0) {
					activePage = p.id;
					throw $break;
				}
			});
		}*/
		var alreadyHaveActive = false;
		//	循环所有Page配置数据，初始化每一个page
		$A(this.userModulseOrder.data).each(function(p, i){
			if (!p.id) {throw $continue;}
			if (!App.Permit.ableViewPvtPageTab && p.permit != 0) {throw $continue;}
			
			if (activePage == null || activePage == '') {
				activePage = p.id;
			}
			var pl = App.PageLib.getPage(p.type);
			if (!pl) {pl = App.PageLib.getPage('0');}
			
			
			var isActive = false;
			if (activePage == p.id || activePage == pl.hash) {
				isActive = true;
			}
			var opt4pageTab = {
				id:			p.id,
				type:		p.type || '0',
				ico:		p.ico || 58,
				title: 		p.title || App.Lang.defaultPageTitle,
				colStyle: 	p.colStyle || App.defaultColStyle,
				mods:		p.mods || [],
				permit:		p.permit || 0,
				isActive: 	(isActive && !alreadyHaveActive),
				createMods: (App.createOnlyFirstPageMod? (isActive && !alreadyHaveActive) : true)
			};
			var aa = new App.PageTab(opt4pageTab);
			
			if (isActive) {alreadyHaveActive = true;}
		});
		LoadBar.hide();
		
		if (App.Permit.editPageTab) {
			App.Framework.showNewPageBtn();
			App.PageTabs.regPageTabObservers();
			App.Framework.initNewModBtn();
		}
		App.PageTabs.listenHash();
	},
	/*updateUserModulseOrder: function() {
		// only one request at one time
		if (this.updateingOrder) {return;}
		this.updateingOrder = true;
		
		this.userModulseOrder.data = App.PageTabs.getPageTabsData();
		App.Requester.request('order', this.userModulseOrder);
		
		setTimeout(function(){this.updateingOrder = false;}.bind(this), 10);
	},*/
	getModByType: function(type) {
		return this.userModulesData.find(function(m) {
			return (m.type == type);
		});
	}
};

App.PageTabs = {
	pTabs: [],
	register: function(pTab) {
		$(pTab.options.placeIn).appendChild(pTab.element);
		
		this.pTabs.push(pTab);
		
	},
	unregister: function(pTab) {
		var _index = 0;
		this.pTabs = this.pTabs.reject(function(m, i) {
			if (m==pTab) {_index = i;}
			return m==pTab; 
		});
		_index--;
		if (_index < 0) {_index = 0;}
		if (_index >= this.pTabs.length) {_index = this.pTabs.length-1;}
		this.pTabs[_index].active();
		
		//this.updatePageTabsIndex();
		App.Framework.updateNewPageMenuContent();
	},
	disActiveAll: function() {
		this.pTabs.each(function(pTab){
			pTab.disActive();
		});
	},
	getActivePTab: function() {
		return this.pTabs.find(function(pTab) {
			return pTab.options.isActive;
		});
	},
	getPrivateTabs: function() {
		return this.pTabs.findAll(function(pTab) {
			return (pTab.options.permit != 0);
		});
	},
	getPublicTabs: function() {
		return this.pTabs.findAll(function(pTab) {
			return (pTab.options.permit == 0);
		});
	},
	getProfileTabs: function() {
		return this.pTabs.findAll(function(pTab) {
			return (pTab.options.permit == 2);
		});
	},
	getPTabByElement: function(element) {
		return this.pTabs.find(function(p) {
			return (p.element == element);
		});
	},
	getPTabByType: function(type) {
		return this.pTabs.findAll(function(p) {
			return (p.options.type == type);
		});
	},
	hideOptMenuAll: function() {
		this.pTabs.each(function(pTab){
			pTab.hideOptMenu();
		});
	},
	setHash: function(pTab) {
		this.stopListenHash();
		var id = '';
		if (pTab) {
			if (pTab.pl.type != '0' && pTab.pl.hash) {
				id = pTab.pl.hash;
			}
			else {
				id = pTab.options.id;
			}
		}
		else {
			var pt = this.pTabs.find(function(m){
				return (m.options.isActive);
			});
			if (pt) {
				if (pt.pl.type != '0' && pt.pl.hash) {
					id = pt.pl.hash;
				}
				else {
					id = pt.options.id;
				}
			}
		}
		this.activePage = id;
		location.href = '#t'+ id;
		this.listenHash();
	},
	getHash: function() {
		var activePage = '';
		if (location.hash && location.hash.indexOf('#'+ App.pageHash_prefix) == 0) {
			activePage = location.hash.substring(2);
		}
		if (activePage == App.profilePageHashId && this.getProfileTabs().length > 0) {
			activePage = this.getProfileTabs()[0].options.id;
		}
		if (activePage == this.activePage) {
			return;
		}
		else if(activePage){
			var pt = this.pTabs.find(function(p){
				var pl = App.PageLib.getPage(p.options.type);
				if (!pl) {pl = App.PageLib.getPage('0');}
				return (p.options.id == activePage || pl.hash == activePage);
			});
			if (typeof pt == 'undefined' || !pt) {
				pt = this.pTabs[0];
			}
			if (typeof pt != 'undefined' && pt) {
				pt.active(true);
			}
			this.activePage = activePage;
		}
	},
	listenHash: function() {
		if (this.hashListener) {
			this.stopListenHash();
		}
		this.hashListener = setInterval(this.getHash.bind(this), 1000);
	},
	stopListenHash: function() {
		if (!this.hashListener) {return;}

		clearInterval(this.hashListener);
		this.hashListener = null;
	},
	/*getPageTabsData: function() {
		this.updatePageTabsOrder();
		this.setHash();
		var pageTabsData = [];
		this.pTabs.each(function(pTab){
			pageTabsData.push(pTab.getPageTabData());
		});
		return pageTabsData;
	},*/

	getNewPageTabsOrder: function() {
		var arr = [];
		var pTabsAll = $A(App.Framework.elm_navBar.getElementsByTagName('li'));
		$A(pTabsAll).each(function(pTab) {
			if (pTab.id) {
				arr.push(pTab.id);
			}
		});
		return arr;
	},
	/*updatePageTabsOrder: function() {
		this.newOrder = this.getNewPageTabsOrder();
		
		this.pTabs = $A(this.newOrder).map(function(pId) {
			return ($A(this.pTabs).find(function(pTab) {
				return (pTab.options.id == pId);
			}));
		}.bind(this));
		this.updatePageTabsIndex();
		this.setHash();
	},*/
	/*updatePageTabsIndex: function() {
		$A(this.pTabs).each(function(pTab, i) {
			pTab.options.id = App.pageId_prefix + (i+1);
			pTab.element.id = pTab.options.id;
		});
	},*/
	savePageTabsOrder: function() {
		this.newOrder = this.getNewPageTabsOrder();
		if (JSON.stringify(this.newOrder) == JSON.stringify(this.oldOrder)) {return;}
		App.Requester.request('pageOrder', {data:this.newOrder});
		this.oldOrder = this.newOrder;
		//this.updatePageTabsOrder();
	},
	regPageTabObservers: function() {
		if (!App.Permit.editPageTab) {return;}
		var opt4pageTabSortable = {
			tag: 'li',
			only: 'pTab',
			targeting: true,
			overlap:     'horizontal', // one of 'vertical', 'horizontal'
			constraint:  'horizontal', // one of 'vertical', 'horizontal', false
			ghosting: true,
			//snap: this.drag_snap,


			onUpdate: this.savePageTabsOrder.bind(this)
		};
		Sortable.create(App.Framework.elm_navBar, opt4pageTabSortable);
		this.regDrops();
		this.oldOrder = this.getNewPageTabsOrder();
		
	},
	disRegPageTabObservers: function() {
		Sortable.destroy(App.Framework.elm_navBar);
	},
	drag_snap: function(l, t) {
		var _l = Math.max(0, Math.min(l, screen.availWidth));
		var pos = Position.positionedOffset(App.Framework.elm_navBar);
		var _t = Math.max(pos[1], Math.min(t, pos[1]+App.Framework.elm_navBar.offsetHeight));
		return [_l, _t];
	},
	regDrops: function() {
		this.pTabs.each(function(p) {
			p.regDrop();
		});
	},
	showModCtnInfo: function(pTab) {
		if (!pTab.options.isActive) {
			return;
		}
		//	为了能够让某些模块显示提示修改了这段代码
		if (pTab.options.mods.flatten().length === 0) {
			if (App.Permit.editPageTab) {
				App.Framework.elm_modCtnInfo.innerHTML = App.Lang.goAddModPageInfo;
			}
			else {
				App.Framework.elm_modCtnInfo.innerHTML = App.Lang.noModPageInfo;
			}
			App.Framework.elm_modCtnInfo.className = 'modCtnInfo-noMod clearfix';
			Element.show(App.Framework.elm_modCtnInfo);
			return;
		}
		if (pTab.pl && pTab.pl.info && pTab.pl.info.length && isMyBlog()) {// && isMyBlog() 浏览用户时候不显示Tab Tips
			App.Framework.elm_modCtnInfo.innerHTML = pTab.pl.info;
			App.Framework.elm_modCtnInfo.className = pTab.options.permit != 0 ? 'modCtnInfo-private clearfix' : 'modCtnInfo-private public clearfix';
			Element.show(App.Framework.elm_modCtnInfo);
			return;
		}
		this.hideModCtnInfo();
		/*  为了能够让某些模块显示提示修改了这段代码
		if (pTab.options.permit != 0) {
			if (pTab.pl && pTab.pl.info && pTab.pl.info.length > 0) {
				App.Framework.elm_modCtnInfo.innerHTML = pTab.pl.info;
			}
			else {
				App.Framework.elm_modCtnInfo.innerHTML = App.Lang.privatePageInfo;
			}
			App.Framework.elm_modCtnInfo.className = 'modCtnInfo-private clearfix';
			Element.show(App.Framework.elm_modCtnInfo);
		}
		else if (pTab.options.mods.flatten().length === 0) {
			if (App.Permit.editPageTab) {
				App.Framework.elm_modCtnInfo.innerHTML = App.Lang.goAddModPageInfo;
			}
			else {
				App.Framework.elm_modCtnInfo.innerHTML = App.Lang.noModPageInfo;
			}
			App.Framework.elm_modCtnInfo.className = 'modCtnInfo-noMod clearfix';
			Element.show(App.Framework.elm_modCtnInfo);
		}
		else {
			this.hideModCtnInfo();
		}
		*/
	},
	hideModCtnInfo: function() {
		Element.hide(App.Framework.elm_modCtnInfo);
	},
	newPageTab: function(type) {
		if (!type) {return;}
		if (this.pTabs.length >= App.maxPageTabCount) {
			var opt4popWin = {
				type: 'alert',
				title: App.Lang.error,
				content: App.Lang.tooManyPages
			};
			var aa = new PopWin(opt4popWin);
			return;
		}
		
		this.newPL = App.PageLib.getPage(type);
		
		this.newPW_all = [];
		this.newPW_okW = [];
		this.newPW_noW = [];
		this.newPW_noM = [];
		$A(this.newPL.widgets).each(function(col,i) {
			this.newPW_all.push([]);
			this.newPW_okW.push([]);
			this.newPW_noW.push([]);
			col.each(function(wt,j) {
				var w = App.WidgetLib.getWidget(wt);
				if (!w) {throw $continue;}
				if ((w.only || w.sys) && App.UserData.getModByType(wt)) {
					var mod = App.UserData.getModByType(wt);
					this.newPW_all[i].push(mod.id);
					this.newPW_noW[i].push(wt);
					this.newPW_noM.push(mod.id);
				}
				else {
					this.newPW_all[i].push(wt);
					this.newPW_okW[i].push(wt);
				}
			}.bind(this));
		}.bind(this));
		
		if (App.Permit.ableLog) {
			$LT('App.PageTabs.newPageTab\n');
			$LR('newPW_all: '+JSON.stringify(this.newPW_all));
			$LR('newPW_okW: '+JSON.stringify(this.newPW_okW));
			$LR('newPW_noW: '+JSON.stringify(this.newPW_noW));
			$LR('newPW_noM: '+JSON.stringify(this.newPW_noM));
		}
		
		
		
		if (this.newPW_noM.length > 0) {
			var str = '';
			str += App.Lang.beSboutToAddNewPage;
			str += '['+ this.newPL.title +'], ';
			str += App.Lang.itContaintMods +':\n';
			$A(this.newPL.widgets.flatten()).each(function(mt, i) {
				str += '['+ App.WidgetLib.getWidget(mt).title +']';
				if (i < this.newPL.widgets.flatten().length-1) {
					str += ', ';
				}
			}.bind(this));
			str += '\n\n';
			
			str += App.Lang.hasUsingTheseMods +':\n';
			$A(this.newPW_noW.flatten()).each(function(mt, i) {
				str += '['+ App.WidgetLib.getWidget(mt).title +']';
				if (i < this.newPW_noW.flatten().length-1) {
					str += ', ';
				}
			}.bind(this));
			str += '\n\n';
			
			str += App.Lang.whetherMoveMods;
			
			
			var opt4popWin = {
				type:		'confirm',
				content:	str,
				focus:		false,
				width:		'350',
				okText:		App.Lang.moveMod,
				okAction:	this.reqNewPageTab.bind(this),
				okData:		true,
				cancelText:	App.Lang.notMoveMod,
				cancelAction: this.reqNewPageTab.bind(this),
				cancelData:	false,
				closeAction:Prototype.emptyFunction
			};
			var aa = new PopWin(opt4popWin);
		}
		else {
			this.reqNewPageTab(true);
		}
		
	},
	reqNewPageTab: function(doMove) {
		this.opt4newPageTab = {
			type: this.newPL.type,
			title: this.newPL.title || App.Lang.aNewPage,
			ico: (this.newPL.ico!=null? this.newPL.ico : 0),
			colStyle: this.newPL.colStyle || App.defaultColStyle,
			permit: this.newPL.permit || 0,
			widgets: this.newPW_all || []
		};
		if (doMove) {
			$A(this.newPW_noM).each(function(id) {
				var mod = App.Modules.getObjById(id);
				if (!mod) {throw $contunue;}
				var page = mod.options.page;
				mod.destroy();
				page.saveModsOrder('noToServer');
			});

		}
		else {
			this.opt4newPageTab.widgets = this.newPW_okW || [];
		}
		App.Requester.request('newPage', {options:this.opt4newPageTab});
	},
	analyseNewPageTab: function(rData) {
		if (App.Permit.ableLog) {
			$LT('App.PageTabs.analyseNewPageTab');
		}
		if (!rData) {return;}
		var modList = rData.getElementsByTagName('mod');
		this.newPageData = null;


		$A(modList).each(function(m){
			var mod = App.UserData.getModData(m);
			
			if (mod.type == 'order') {
				this.newPageData = mod.data;
				App.UserData.userModulseOrder.data.push(mod.data);
			}
			else {
				App.UserData.userModulesData.push(mod);
			}
		}.bind(this));
		this.doNewPageTab();
	},
	doNewPageTab: function() {
		var opt = {};
		if (this.newPageData) {
			opt = this.newPageData[0];
		}
		
		var opt4pageTab = Object.extend(this.opt4newPageTab, opt);
		/*opt4pageTab = Object.extend(opt4pageTab, {
			createMods: true
		});*/
		
		var obj_newPageTab = new App.PageTab(opt4pageTab);
		
		//App.UserData.updateUserModulseOrder();
		this.regPageTabObservers();
		obj_newPageTab.active();
		App.Framework.updateNewPageMenuContent();
		if (this.newPL.ableSetTit) {
			obj_newPageTab.editTitle();
		}
	}
};
App.PageTab = Class.create();
App.PageTab.prototype = {
	initialize: function(options) {
		if (App.Permit.ableLog) {
			$LT('App.PageTab[id:'+ options.id +'] initialize');
		}
		
		this.options = Object.extend({
			id:			null,
			type:		'0',
			ico:		0,
			title: 		'',
			colStyle: 	null,
			mods:		[],
			permit:		0,
			
			isActive: 	false,
			createMods: false,
			placeIn: 	App.Framework.elm_navBar,
			
			sDivCss: 'menuSub-div',
			imtDivCss: 'subMenu-maintitle',
			itDivCss: 'subMenu-title',
			isDivCss:'menuInnerSub-div',
			sOutCss: 'menuSub-out',
			sOverCss: 'menuSub-over',
			sDownCss: 'menuSub-down',
			sDisableCss: 'menuSub-disabled',
			sActiveCss: 'menuSub-active'
		}, options || {});
		
		this.pl = App.PageLib.getPage(this.options.type);
		if (!this.pl) {this.pl = App.PageLib.getPage('0');}
		
		if (!this.pl.ableSetTit && this.pl.title) {
			this.options.title = this.pl.title;
		}
		if (!this.pl.ableSetCol && this.pl.colStyle) {
			this.options.colStyle = this.pl.colStyle;
		}
		if (!this.pl.ableSetIco && this.pl.ico) {
			this.options.ico = this.pl.ico;
		}
		if (!this.pl.ableSetPer) {
			this.options.permit = this.pl.permit;
		}
		
		this.build();
		
		App.PageTabs.register(this);
		if (App.Permit.editPageTab) {
			this.regDrop();
		}
		
		this.buildModCtn();
		
		if (this.options.createMods) {
			this.createMods();
		}
	},
	destroy: function() {
		/*if (this.content && this.content.destroy) {
			try{
				this.content.destroy();
				this.content = null;
			}catch(e){}
		}*/
		if (!this.element) {return;}
		this.disActive();
		this.disRegDrop();
		//this.disRegModObservers();	// 2006-11-27 if move modules to other page, then delete this page, the modules can not drag any more.
		this.removeMods();
		this.modCtn.destroy();

		Element.remove(this.element);
		this.element = null;
		setTimeout(function(){App.PageTabs.unregister(this);}.bind(this), 10);
	},
	build: function() {
		if (App.Permit.ableLog) {
			$LT('App.PageTab[id:'+ this.options.id +'] build');
		}
		
		var liTab = document.createElement('li');
		this.element = liTab;
		liTab.id = this.options.id;
		Element.addClassName(liTab, 'pTab');
		if (this.options.permit != 0) {
			Element.addClassName(liTab, 'private');
		}
		if (this.options.isActive) {
			Element.addClassName(liTab, 'active');
		}
		App.PageTabs.showModCtnInfo(this);
		
		var arr = [];
		if (!this.options.ico) {this.options.ico = 0;}
		var pageTitleHtml = this.options.title ? this.options.title.escapeHTML() : '';
		arr.push('<img class="pageIcon" src="'+ (this.options.ico != 0? (App.Actions.imgPath + App.Actions.icoShortPath + App.icoLib[this.options.ico]) : (App.Actions.imgPath + 'spacer.gif')) +'" alt="'+ (this.options.ico? pageTitleHtml : '') +'" />');
		arr.push('<span class="pageTitle"'+ ((this.options.isActive && App.Permit.editPageTab && this.pl.ableSetTit)? ' title="'+ App.Lang.clk2chgPageName +'"':'') +'>'+ pageTitleHtml +'</span>');
		if (App.Permit.editPageTab) {
			arr.push('<img class="pageCls" src="'+ App.Actions.imgPath +'spacer.gif" alt="'+ App.Lang.delPage +'" title="'+ App.Lang.delPage +'" />');
			arr.push('<img class="pageOpt" src="'+ App.Actions.imgPath +'spacer.gif" alt="'+ App.Lang.setPageOpt +'" title="'+ App.Lang.setPageOpt +'" />');
		}
		
		liTab.innerHTML = arr.join('');
		arr = null;
		
		this.eventCancelBubble = App.cancelBubble.bindAsEventListener(this);
		
		this.elm_ico = liTab.firstChild;
		this.elm_title = liTab.childNodes[1];
		if (liTab.childNodes[2]) {this.elm_del = liTab.childNodes[2];}
		if (liTab.childNodes[3]) {this.elm_opt = liTab.childNodes[3];}
		
		if (this.options.ico == 0) {
			this.elm_ico.style.width = '1px';
		}

		
		if (!this.pl.ableDel && this.elm_del) {
			this.elm_del.style.visibility = 'hidden';
		}
		if (!this.pl.ableSetOpt && this.elm_opt) {
			this.elm_opt.style.visibility = 'hidden';
		}
		
		this.eventActive = function() {
			if (!this.options.isActive) {
				this.active();
			}
			/*else {
				this.setOpt();
			}*/
		}.bindAsEventListener(this);
		Event.observe(this.element, 'click', this.eventActive);
		
		if (App.Permit.editPageTab) {
			if (this.pl.ableSetTit) {
				Event.observe(this.elm_title, 'mouseover', function() {
					if (this.options.isActive) {
						Element.addClassName(this.elm_title, 'pageTitleHover');

					}
				}.bind(this));
				Event.observe(this.elm_title, 'mouseout', function() {
					if (this.options.isActive) {
						Element.removeClassName(this.elm_title, 'pageTitleHover');
					}
				}.bind(this));
				Event.observe(this.elm_title, 'mousedown', this.eventCancelBubble);
				this.eventEditTitle = function(e) {
					if (this.options.isActive) {
	
						this.editTitle();
						App.cancelBubble(e);
					}
				}.bindAsEventListener(this);
				Event.observe(this.elm_title, 'click', this.eventEditTitle);
			}
			
			
			
			
			
			Event.observe(this.elm_del, 'mouseover', function() {
				if (this.options.isActive) {
					Element.addClassName(this.elm_del, 'pageClsHover');
				}
			}.bind(this));
			Event.observe(this.elm_del, 'mouseout', function() {
				if (this.options.isActive) {
					Element.removeClassName(this.elm_del, 'pageClsHover');
				}
			}.bind(this));
			Event.observe(this.elm_del, 'mousedown', this.eventCancelBubble);
			//Event.observe(this.elm_del, 'click', this.eventCancelBubble);
			this.eventClose = this.close.bindAsEventListener(this);
			Event.observe(this.elm_del, 'click', this.eventClose);
			
			
			
			
			
			
			Event.observe(this.elm_opt, 'mouseover', function() {
				if (this.options.isActive) {
					Element.addClassName(this.elm_opt, 'pageOptHover');
				}
			}.bind(this));
			Event.observe(this.elm_opt, 'mouseout', function() {
				if (this.options.isActive) {
					Element.removeClassName(this.elm_opt, 'pageOptHover');
				}
			}.bind(this));
			Event.observe(this.elm_opt, 'mousedown', this.eventCancelBubble);
			//Event.observe(this.elm_opt, 'click', this.eventCancelBubble);
			this.eventSetOpt = this.setOpt.bindAsEventListener(this);
			Event.observe(this.elm_opt, 'click', this.eventSetOpt);
			
			if (!this.options.isActive) {
				Element.hide(this.elm_del);
				Element.hide(this.elm_opt);
			}
		}
	},
	buildModCtn: function() {
		var opt4modContainer = {
			colStyle: this.options.colStyle,
			isActive: this.options.isActive,
			placeIn: App.Framework.elm_modCtn
		};

		this.modCtn = new App.ModContainer(opt4modContainer);
		this.modCtn.pageTab = this;
	},
	removeMods: function() {
		$A(App.Modules.modules).select(function(mod) {
			return (mod.options.page == this);
		}.bind(this)).each(function(mod) {
			App.UserData.delMod(mod.options);
			mod.destroy();
		});
		App.Framework.updateNewModMenuContent();
	},
	createMods: function() {
		this.loaded=true;
		
		LoadBar.show(App.Lang.createAllModules);
		var delay = 100;
		$A(this.options.mods).each(function(col, i){
			$A(col).each(function(id, j){
				$A(App.UserData.userModulesData).each(function(m){
					if (m.id == id) {
						var extendOpt = {
							page: this,
							placeIn: (this.modCtn.cols[i]? 
								this.modCtn.cols[i] : this.modCtn.cols[this.modCtn.cols.length-1]),
							fastLoad: j
						};
						var options = Object.extend(m, extendOpt);
						
						if (this.options.permit == 0 && App.WidgetLib.getWidget(options.type) && App.WidgetLib.getWidget(options.type).private) {
							if (App.Permit.editModule) {
								var aa = new App.Module(options, true);
								setTimeout(function() {
									aa.doClose();
								}, 0);
							}
						} else {
							var aa = new App.Module(options, true);
						}
						throw $break;
					}
				}.bind(this));
			}.bind(this));
		}.bind(this));
		LoadBar.hide();		
		
		setTimeout(this.regModObservers.bind(this), delay);
		delay+=100;
	},
	getPageTabData: function() {
		var pageTabData = {
			id: this.options.id,
			title: this.options.title,
			ico: this.options.ico,
			permit: this.options.permit,
			colStyle: this.options.colStyle,
			mods: this.getModsOrder()
		};
		return pageTabData;
	},
	getModsOrder: function() {
		if (!this.loaded) {
			return this.options.mods;
		}
		var arr = [];
		var colsAll = $A(this.modCtn.cols);
		//colsAll.push(document.body);
		$A(colsAll).each(function(col) {
			var arr2 = [];
			$A(col.childNodes).each(function(mod) {
				if (mod.tagName &&
					mod.tagName.toUpperCase()=='div'.toUpperCase() &&
					Element.hasClassName(mod, 'mod') &&
					mod.id) {
					arr2.push(mod.id);
				}
			});
			arr.push(arr2);
		});
		return arr;
	},
	saveModsOrder: function(toServer) {
		this.newMods = this.getModsOrder();
		if (toServer != 'doToServer' && JSON.stringify(this.newMods) == JSON.stringify(this.options.mods)) {return;}
		//App.PageTabs.hideModCtnInfo();
		this.options.mods = this.newMods;
		if (toServer != 'noToServer') {
			App.Requester.request('editPageMods', this);
		}
		App.PageTabs.showModCtnInfo(this);
	},
	regModObservers: function() {
		if (!App.Permit.sortable) {return;}
		var opt4sortable = {
			tag: 'div',
			handle: 't',
			handleTag: 'td',
			only: 'mod',
			dropOnEmpty: true,
			targeting: true,
			containment: this.modCtn.cols,
			constraint: false,
			snap: this.drag_snap,
			starteffect: function(element) {
				
				(Browser.ua.indexOf('ie')>=0)? 
					new Effect.Opacity(element, {duration:0.0, from:1.0, to:0.7}) :
					new Effect.Opacity(element, {duration:0.2, from:1.0, to:0.7});
					
					
				// hide flash object when dragging
				var flashs = $A(element.getElementsByTagName('object'));
				var embeds = $A(element.getElementsByTagName('embed'));
				embeds = embeds.reject(function(e){return(e.parentNode.tagName.toLowerCase() == 'object');});
				flashs = flashs.concat(embeds);
				var iframes = $A(element.getElementsByTagName('iframe'));
				var nho = flashs.concat(iframes);
				$A(nho).each(function(o) {
					var divNho = document.createElement('div');
					divNho.className = 'divFlashSpacer';
					//Element.addClassName(divNho, 'divFlashSpacer');
					var _w = o.width || o.offsetWidth;
					var _h = o.height || o.offsetHeight;
					divNho.style.width = isNaN(_w)? _w : _w+'px';


					divNho.style.height = isNaN(_h)? _h : _h+'px';
					divNho.style.overflow = 'hidden';
					o.parentNode.insertBefore(divNho, o);
					Element.hide(o);
				});
			},
			endeffect: function(element) { 
				
				(Browser.ua.indexOf('ie')>=0)? 
					new Effect.Opacity(element, {duration:0.0, from:0.7, to:1.0}) :
					new Effect.Opacity(element, {duration:0.2, from:0.7, to:1.0}); 
					
					
				
				// show flash object after dragging
				var flashs = $A(element.getElementsByTagName('object'));
				var embeds = $A(element.getElementsByTagName('embed'));
				embeds = embeds.reject(function(e){return(e.parentNode.tagName.toLowerCase() == 'object');});
				flashs = flashs.concat(embeds);
				var iframes = $A(element.getElementsByTagName('iframe'));
				var nho = flashs.concat(iframes);
				$A(nho).each(function(o) {

					Element.show(o);
				});
				$A(document.getElementsByClassName('divFlashSpacer', element, 'div')).each(function(d){
					Element.remove(d);
				});
			}
		};
		$A(this.modCtn.cols).each(function(col) {
			opt4sortable = Object.extend(opt4sortable, {
				onUpdate: this.saveModsOrder.bind(this)
			});
			Sortable.create(col, opt4sortable);
		}.bind(this));
		
		
	},
	disRegModObservers: function() {
		$A(this.modCtn.cols).each(function(col) {
			Sortable.destroy(col);
		});
	},
	drag_snap: function(l, t) {
		var _l = Math.max(0, Math.min(l, screen.availWidth));
		var _t = Math.max(30, t);
		return [_l, _t];
	},
	active: function(byHash) {
		if (this.options.isActive) {return;}
		App.PageTabs.disActiveAll();
		this.options.isActive = true;
		Element.addClassName(this.element, 'active');
		App.PageTabs.showModCtnInfo(this);
		if (this.pl.ableSetTit && App.Permit.editPageTab) {
			this.elm_title.title = App.Lang.clk2chgPageName;
		}
		if (this.elm_del && this.elm_opt) {
			Element.show(this.elm_del);
			Element.show(this.elm_opt);
		}
		this.modCtn.active();
		
		if (!this.loaded) {
			this.createMods();
		}
		if (!byHash) {
			App.PageTabs.setHash(this);
		}
		App.Framework.updateNewModMenuContent();
	},
	disActive: function() {
		if (!this.options.isActive) {return;}
		this.options.isActive = false;
		Element.removeClassName(this.element, 'active');
		//App.PageTabs.hideModCtnInfo();
		this.elm_title.title = '';
		if (this.elm_del && this.elm_opt) {
			Element.hide(this.elm_del);
			Element.hide(this.elm_opt);
		}
		this.modCtn.disActive();
		this.hideOptMenu();
		this.saveTitle();
	},
	editTitle: function() {
		Element.hide(this.elm_ico);
		Element.hide(this.elm_title);
		Element.hide(this.elm_del);
		Element.hide(this.elm_opt);
		var inputElm = document.createElement("input");
		this.elm_titleIpt = inputElm;
		inputElm.type = "text";
		inputElm.value = this.options.title;
		inputElm.style.width = ((this.options.title.length*12)+20) + 'px';
		this.element.appendChild(inputElm);
		inputElm.focus();
		inputElm.select();

		
		Event.observe(inputElm, 'keydown', this.onTitleEnterDown.bindAsEventListener(this));
		//Event.observe(inputElm, 'click', this.eventCancelBubble);
		//Event.observe(inputElm, 'mousedown', this.eventCancelBubble);
		inputElm.onkeyup = function() {
			this.style.width = (this.value.length*12)+20 + "px";
		};
		Event.observe(inputElm, 'blur', this.saveTitle.bindAsEventListener(this));
		this.editingTitle = true;
	},
	onTitleEnterDown: function(e) {
		if (Browser.ua != 'other') {
			if (e.keyCode==13) {
				this.saveTitle();
			}
		}
	},
	saveTitle: function() {
		if (!this.editingTitle) {return;}
		this.editingTitle = false;
		var value = this.elm_titleIpt.value;
		value = (value.trim() == '') ? this.options.title : value.convertTextToHTML();
		if (value == this.options.title) {
			this.endEditTitle();
			return;
		}
		if (getTureLength(value) > 12) {
			var str = App.Lang.pageTitleTooLong+'('+getTureLength(value) +App.Lang.byte+')';
			str += '\n'+App.Lang.reduceTo+'12'+App.Lang.byte+'(6'+App.Lang.chsWord+')';
			str += '\n\n';
			str += App.Lang.confirmToEdit;
			str += '\n';
			str += App.Lang.cannelThisOperation;

			if (confirm(str)) {
				this.elm_titleIpt.focus();
				this.elm_titleIpt.select();
				this.editingTitle = true;
			}

			else {
				this.endEditTitle();
			}
			return;
		}
		this.newTitle = value;
		
		App.Requester.request('editPageTitle', this);
	},
	doSaveTitle: function(data) {
		var value = this.newTitle;
		if (data && Element.getChildValueByTagName(data, 'data')[0]) {
			var opt = JSON.parse(Element.getChildValueByTagName(data, 'data')[0])[0];
			if (opt.title) {
				value = opt.title;
			}
		}
		this.options.title = value;
		this.elm_title.innerHTML = value;
		if (this.elm_ico) {
			this.elm_ico.alt = value;
		}
		
		this.endEditTitle();
	},
	endEditTitle: function() {
		Element.remove(this.elm_titleIpt);
		Element.show(this.elm_ico);
		Element.show(this.elm_title);
		if (this.elm_del && this.elm_opt) {
			Element.show(this.elm_del);
			Element.show(this.elm_opt);
		}
		this.editingTitle = false;
	},
	hasNoDelMod: function() {
		var arr = [];
		$A(this.options.mods.flatten()).each(function(id) {
			var mod = App.Modules.getObjById(id);
			if (!mod) {throw $continue;}
			var w = App.WidgetLib.getWidget(mod.options.type);
			if (mod && w && !w.ableDel) {
				arr.push(mod);
			}
		}.bind(this));
		return arr;
	},
	close: function() {

		if (App.PageTabs.pTabs.length <= 1) {
			var opt4popWin = {
				type: 'alert',
				title: App.Lang.error,
				content: App.Lang.cannotDelOnlyPage
			};
			var aa = new PopWin(opt4popWin);
			return;
		}
		
		var pubPTabs = App.PageTabs.getPublicTabs();
		if (this.options.permit == 0 && pubPTabs.length <= 1) {
			var opt4popWin = {
				type: 'alert',
				title: App.Lang.error,
				content: App.Lang.cannotDelOnlyPubPage
			};
			var aa = new PopWin(opt4popWin);
			return;
		}
		
		var noDelMods = this.hasNoDelMod();
		if (noDelMods.length > 0) {
			var str = '';
			str += App.Lang.hasNoDelMods;
			str += ':';
			noDelMods.each(function(m, i) {
				if (i!=0) {
					str += ',';
				}
				str += '['+ m.options.title +']';
			});
			str += '\n';
			str += '\n';
			str += App.Lang.cannotDelNoDelModPage;
			
			var opt4popWin = {
				type: 'alert',
				title: App.Lang.error,
				content: str
			};
			var aa = new PopWin(opt4popWin);
			return;
		}
		
		var opt4popWin = {
			type:		'confirm',
			content:	App.Lang.confirmDelPage,
			focus:		false,
			okAction:	this.acceptClose.bind(this)
		};
		var aa = new PopWin(opt4popWin);
	},
	acceptClose: function() {
		App.Requester.request('delPage', this);
	},
	doClose: function() {
		this.destroy();
	},
	getPermitOpt: function() {
		var divSubContent = document.createElement('div');
		divSubContent.className = this.options.isDivCss +' clearfix';
		
		var arr = [];
		arr.push('<ul>');
		arr.push('<li><label for="pagePub_'+ this.options.id +'">');
		arr.push('<input type="radio" id="pagePub_'+ this.options.id +'" name="pagePermit_'+ this.options.id +'" value="0"'+ (this.options.permit == 0? ' checked="checked"' : '') +' />'+ App.Lang.pagePublic);
		arr.push('</label></li>');
		arr.push('<li><label for="pagePri_'+ this.options.id +'">');
		arr.push('<input type="radio" id="pagePri_'+ this.options.id +'" name="pagePermit_'+ this.options.id +'" value="1"'+ (this.options.permit != 0? ' checked="checked"' : '') +' />'+ App.Lang.pagePrivate);
		arr.push('</label></li>');
		arr.push('</ul>');
		
		divSubContent.innerHTML = arr.join('');
		
		this.optPub = divSubContent.firstChild.childNodes[0].firstChild.firstChild;
		this.optPri = divSubContent.firstChild.childNodes[1].firstChild.firstChild;
		
		Event.observe(this.optPub, "click", function() {
			this.setPermit(0);
			if (this.optMenu) {this.optMenu.hide();}
		}.bind(this));
		Event.observe(this.optPri, "click", function() {
			this.setPermit(1);
			if (this.optMenu) {this.optMenu.hide();}
		}.bind(this));
		
		return divSubContent;
	},
	getTitleOpt: function() {
		var divSubContent = document.createElement('div');
		divSubContent.className = this.options.isDivCss +' clearfix';
		
		var arr = [];
		arr.push('<ul>');
		arr.push('<li><a href="javascript:void(0)">'+ App.Lang.chgPageTitle +'</a></li>');
		arr.push('</ul>');
		
		divSubContent.innerHTML = arr.join('');
		
		this.optSetTitle = divSubContent.firstChild;
		
		Event.observe(this.optSetTitle, "click", function() {
			this.editTitle();
			if (this.optMenu) {this.optMenu.hide();}
		}.bind(this));
		
		return divSubContent;
	},
	setOpt: function() {
		if (!this.optMenu) {
			var opt4winMenu = {
				menuData: [],
				title: App.Lang.pageOpt,
				btn: this.element,
				zIndex: 500,

				sDivCss: 'menuSub-div menuSub-div-colStyle'
			};
			
			
			if (this.pl.ableSetCol) {
				var menuData_colStyle = {
					title: App.Lang.pageLayout,
					active: true,

					isDivCssEx: 'menuInnerSub-div-colStyle',
					data: []
				};
				$H(App.colStyleLib).each(function(s){
					menuData_colStyle.data.push(
						{
							text: '<img src="'+ App.Actions.imgPath + s.value +'" alt="'+ s.key +'" />',
							title: s.key,
							action: this.setColStyle.bind(this),
							value: s.key,
							active: (this.options.colStyle == s.key)
						}
					);
				}.bind(this));
				opt4winMenu.menuData.push(menuData_colStyle);
			}
			
			if (this.pl.ableSetTit) {
				opt4winMenu.menuData.push(
					{
						title: App.Lang.pageTitle,
						active: false,
						data: this.getTitleOpt.bind(this)
					}
				);
			}
			
			
			if (this.pl.ableSetIco) {
				var menuData_ico = {
					title: App.Lang.pageIcon,
					active: false,
					isDivCssEx: 'menuInnerSub-div-ico',
					data: []
				};
				$A(App.icoLib).each(function(ico, i){
					menuData_ico.data.push(
						{
							text: '<img src="'+ App.Actions.imgPath + App.Actions.icoShortPath + ico +'" alt="'+ '['+ i +']:'+ ico +'" />',
							title: '['+ i +']:'+ ico,
							action: this.setIcon.bind(this),
							value: i,
							active: (this.options.ico == i)
						}
					);
				}.bind(this));
				opt4winMenu.menuData.push(menuData_ico);
			}
			
			
			

			if (this.pl.ableSetPer) {
				opt4winMenu.menuData.push(
					{
						title: App.Lang.pagePermit,
						active: false,
						data: this.getPermitOpt.bind(this)
					}
				);
			}
			this.optMenu = new WinMenu(opt4winMenu);
		}
		
		if (!this.optMenu.win.showing) {
			App.PageTabs.hideOptMenuAll();
			this.showOptMenu();
		}
		else {
			this.hideOptMenu();
		}
	},
	showOptMenu: function() {
		if (!this.optMenu) {return;}
		this.optMenu.show();
	},
	hideOptMenu: function() {
		if (!this.optMenu) {return;}
		this.optMenu.hide();
	},
	setColStyle: function(colStyle) {
		if (!colStyle || colStyle == this.options.colStyle) {return;}
		this.newColStyle = colStyle;
		App.Requester.request('editPageColStyle', this);
	},
	doSetColStyle: function(data) {
		var colStyle = this.newColStyle;
		if (data && Element.getChildValueByTagName(data, 'data')[0]) {
			var opt = JSON.parse(Element.getChildValueByTagName(data, 'data')[0])[0];
			if (opt.colStyle) {
				colStyle = opt.colStyle;
			}
		}
		this.options.colStyle = colStyle;
		this.modCtn.setColStyle(colStyle);
	},
	setIcon: function(ico) {
		if (ico == this.options.ico) {return;}
		this.newIco = ico;
		App.Requester.request('editPageIco', this);
	},
	doSetIcon: function(data) {
		var ico = this.newIco;
		if (data && Element.getChildValueByTagName(data, 'data')[0]) {
			var opt = JSON.parse(Element.getChildValueByTagName(data, 'data')[0])[0];
			if (opt.ico) {
				ico = opt.ico;
			}
		}
		this.options.ico = ico;
		if (this.options.ico == 0) {
			this.elm_ico.src = App.Actions.imgPath + 'spacer.gif';
			this.elm_ico.style.width = '1px';
		}
		else {
			this.elm_ico.src = App.Actions.imgPath + App.Actions.icoShortPath + App.icoLib[this.options.ico];

			this.elm_ico.style.width = '16px';
		}
	},
	hasPrivateMod: function() {
		var arr = [];
		$A(this.options.mods.flatten()).each(function(id) {
			var mod = App.Modules.getObjById(id);
			if (mod && App.WidgetLib.getWidget(mod.options.type).private) {
				arr.push(mod);
			}
		}.bind(this));
		return arr;
	},
	setPermit: function(permit) {
		if (permit == this.options.permit) {return;}
		
		if (permit == 0) {
			var priMods = this.hasPrivateMod();
			if (priMods.length > 0) {
				var str = '';
				str += App.Lang.hasPriveMods;
				str += ':';
				priMods.each(function(m, i) {
					if (i!=0) {
						str += ',';
					}
					str += '['+ m.options.title +']';
				});
				str += '\n';
				str += '\n';
				str += App.Lang.cannotSetPublic;
				
				var opt4popWin = {
					type: 'alert',
					title: App.Lang.error,
					content: str
				};
				var aa = new PopWin(opt4popWin);

				
				this.optPub.checked = false;
				this.optPri.checked = true;
				return;
			}
			
		}
		else {
			var priPT = App.PageTabs.getPrivateTabs();
			if (priPT.length == App.PageTabs.pTabs.length-1) {
				var str = '';
				str += App.Lang.cannotAllPrivate;
				
				var opt4popWin = {
					type: 'alert',
					title: App.Lang.error,
					content: str
				};
				var aa = new PopWin(opt4popWin);
				
				this.optPub.checked = true;
				this.optPri.checked = false;
				return;
			}
		}
		
		this.newPermit = permit;
		App.Requester.request('editPagePermit', this);
	},
	doSetPermit: function(data) {
		var permit = this.newPermit;
		if (data && Element.getChildValueByTagName(data, 'data')[0]) {
			var opt = JSON.parse(Element.getChildValueByTagName(data, 'data')[0])[0];
			if (opt.permit) {
				permit = opt.permit;
			}
		}
		this.options.permit = permit;
		if (this.options.permit == 0) {
			Element.removeClassName(this.element, 'private');
		}
		else {
			Element.addClassName(this.element, 'private');
		}
		App.PageTabs.showModCtnInfo(this);
		App.Framework.updateNewModMenuContent();
	},
	regDrop: function() {
		if (App.Permit.ableLog) {
			$LT('App.PageTab[id:'+ this.options.id +'] regDrop');
		}
		
		var opt4drop = {
			accept: 'mod',
			hoverclass: 'hover',
			onHover: this.onHover.bind(this),
			onDrop: this.onDrop.bind(this)
		};
		Droppables.add(this.element, opt4drop);
	},
	disRegDrop: function() {
		Droppables.remove(this.element);
	},
	onHover: function(drag, droponElm) {
		var mod = App.Modules.getObjByElement(drag.element);
		if (mod.options.page.element == this.element) {
			Sortable.target(drag, drag.element.parentNode);
			Sortable.targetMark();
			return;
		}
		
		Sortable.untarget();
	},
	onDrop: function(drag, droponElm, event){
		var mod = App.Modules.getObjByElement(drag.element);
		var oldPTab = mod.options.page;
		if (oldPTab.element == this.element) {return;}
		
		if (App.WidgetLib.getWidget(mod.options.type).private && this.options.permit == 0) {
			var str = '';
			str += App.Lang.movePriMod2PubPage;
			str += '\n';
			str += App.Lang.cannotMovePriMod2PubPage;
			
			var opt4popWin = {
				type: 'alert',
				title: App.Lang.error,
				content: str
			};
			var aa = new PopWin(opt4popWin);
			
			return;
		}
		
		if (this.loaded) {
			mod.options.page = this;
			this.modCtn.cols[0].insertBefore(drag.element, this.modCtn.cols[0].firstChild);
			oldPTab.saveModsOrder();
			this.saveModsOrder();
		}
		else {
			mod.destroy(true);
			this.options.mods[0].unshift(mod.options.id);
			this.saveModsOrder('doToServer');
		}
			
	}
};

App.ModContainers = {
	mCtns: [],
	register: function(mCtn) {
		$(mCtn.options.placeIn).appendChild(mCtn.element);
		
		this.mCtns.push(mCtn);
	},
	unregister: function(mCtn) {
		this.mCtns = this.mCtns.reject(function(m) { return m==mCtn; });
	}
};
// create module container
// new App.ModContainer({place: $('test')});
App.ModContainer = Class.create();
App.ModContainer.prototype = {
	initialize: function(options, isInit) {
		if (App.Permit.ableLog) {
			$LT('App.ModContainer.initialize');
		}
		this.options = Object.extend({
			colStyle: App.defaultColStyle,
			isActive: false,
			placeIn: document.body
		}, options || {});
		this.cols = [];
		
		//this.destroy();
		this.build();
		App.ModContainers.register(this);
	},
	destroy: function() {
		if (!this.element) {return;}
		else {
			Element.remove(this.element);
			this.element = null;
		}
		App.ModContainers.unregister(this);
	},

	build: function() {
		var tableModContainer = document.createElement('table');
		this.element = tableModContainer;
		tableModContainer.id = 'modContainerTable';
		tableModContainer.cellSpacing = '0';
		tableModContainer.cellPadding = '0';
		
		if (!this.options.isActive) {
			Element.hide(tableModContainer);
		}

		var containerContent = this.element.insertRow(0);
		this.content = containerContent;
		
		//Element.cleanWhitespace(this.element);

		this.doSetColStyle(true);
	},
	setColStyle: function(colStyle) {

		if (colStyle && colStyle != App.colStyle) {
			this.options.colStyle = colStyle;
			
			this.doSetColStyle();
			// temp
			//App.Requester.request('colStyle', colStyle);
		}
	},
	doSetColStyle: function(isInit) {
		this.colsRate = this.options.colStyle.split(':');
		var colsClone = this.cols;
		var changeCol = (this.colsRate.length != colsClone.length);
		var updateOrder = (this.colsRate.length < colsClone.length);
		$A( (this.colsRate.length > colsClone.length)? this.colsRate : colsClone ).each(function(c, i){
			if (this.colsRate[i] && !colsClone[i]) {
				this.addCol();
			}
			if (colsClone[i] && !this.colsRate[i]) {
				this.delCol();
			}
			if (colsClone[i] && this.colsRate[i]) {
				this.cols[i].style.width = (isNaN(this.colsRate[i])? 100 : this.colsRate[i]) + '%';
			}
		}.bind(this));
		
		// fix opera bug
		if (Browser.ua == 'opera') {
			Element.hide(this.element);
			Element.show(this.element);
		}
		
		if (!isInit) {
			this.pageTab.regModObservers();
			if (updateOrder) {
				this.pageTab.saveModsOrder();
			}

		}
		/*if (changeCol && !isInit) {
			this.pageTab.regModObservers();
			if (updateOrder) {
				App.UserData.updateUserModulseOrder();
			}
		}*/
	},
	addCol: function() {
		var id = this.cols.length;
		var col = document.createElement('td');
		col.className = 'col';
		//Element.addClassName(col, 'col');
		col.id = App.colId_prefix + (id+1);
		this.content.appendChild(col);
		this.cols.push(col);
	},
	delCol: function() {
		var id = this.cols.length -1;
		var col = this.cols[id];
		$A(col.childNodes).each(function(mod){
			this.cols[id-1].appendChild(mod);
		}.bind(this));
		Element.remove(col);
		this.cols = this.cols.reject(function(c) { return c==col; });
	},
	active: function() {
		Element.show(this.element);
	},
	disActive: function() {
		Element.hide(this.element);
	}
};




window.onunload = function() {
	try {
		App.PageTabs.stopListenHash();
		App.Modules.unregisterAll();
		delete App;
		App = null;
	}
	catch (e) {}
};

App.Modules = {
	modules: [],	// the modules list that has created in page
	register: function(mod, isInit) {
		if (isInit || !mod.options.placeBefore) {
			$(mod.options.placeIn).appendChild(mod.element);
		}
		else if ($(mod.options.placeBefore)) {
			$(mod.options.placeIn).insertBefore(mod.element, $(mod.options.placeBefore));
		}
		if (mod.options.floating) {
			mod.element.style.position = 'absolute';
			mod.element.style.left = mod.options.floating[0] +'px';
			mod.element.style.top = mod.options.floating[1] +'px';
			mod.element.style.width = mod.options.floating[2] +'px';
			
			var options4Resizable = {
				defaultWidth: 	mod.options.floating[2],
				defaultHeight: 	mod.options.floating[3]
			};
			this.registerResizable(mod, options4Resizable);
		}
			
		this.modules.push(mod);
		
		if (!isInit) {
			//setTimeout(App.Framework.registerModObservers,10);
			if (Browser.ua.indexOf('ie')<0) {
				var aa = new Effect.Highlight(mod.element, { duration: 0.3, queue: 'front' });
				var aa = new Effect.Highlight(mod.element, { duration: 0.5, queue: 'end' });
				var aa = new Effect.Highlight(mod.element, { duration: 1.0, queue: 'end' });
			}
		}
	},
	unregister: function(mod) {
		this.unregisterResizable(mod);
		this.modules = this.modules.reject(function(m) { return m==mod; });
		
		//App.Framework.registerModObservers();
	},
	
	unregisterAll: function() {
		try{
			for (var i=0; i<this.modules.length; i++) {
				this.modules[i].destroy();
				delete this.modules[i];
				this.modules[i] = null;
			}
		}
		catch(e){}
	},
	
	showAll: function() {
		this.modules.each(function(m,i){
			m.swapShowHide(true);
		});
	},
	hideAll: function() {
		this.modules.each(function(m){
			m.swapShowHide(false);
		});
	},
	
	registerResizable: function(mod, options) {
		if (!mod) {return;}
		if (mod.resizeObj) {return;}
		var options4Resizable = Object.extend({

			able:			App.Permit.resize,
			addons: 		'modCon',
			snap: 			this.resize_snap,
			change: 		this.resize_change,
			update:			function(resizeable){
								App.Modules.getObjByElement(resizeable.element).setFloat();
							}
		}, options || {});
		mod.resizeObj = new App.Resizable(mod.element, options4Resizable);
	},
	unregisterResizable: function(mod) {


		if (!mod) {return;}
		if (mod.resizeObj) {
			mod.resizeObj.destroy();
			mod.resizeObj = null;
		}
	},
	
	resize_snap: function(element, w, h) {
		var _w = Math.max(180, Math.min(w, screen.availWidth));
		var _h = Math.max(20, Math.min(h, screen.availHeight));
		return([_w, _h]);
	},

	resize_change: function(resizable) {
		var w = parseInt(Element.getStyle(resizable.element, 'width'));
		var h = parseInt(Element.getStyle(resizable.element, 'height'));
		var _w = Math.max(180, Math.min(w, screen.availWidth));
		var _h = Math.max(resizable.element.firstChild.offsetHeight, Math.min(h, screen.availHeight));
		resizable.element.style.width = _w +'px';
		resizable.element.style.height = _h +'px';
	},

	
	getObjByElement: function(element) {
		return this.modules.find(function(o) {
			return (o.element == element);
		});
	},
	getObjByType: function(type) {
		return this.modules.find(function(o) {
			return (o.options.type == type);
		});
	},
	getObjById: function(id) {
		return this.modules.find(function(o) {
			return (o.options.id == id);
		});
	},
	
	newOwMod: function(link) {
		window.open(link, '_blank');
	},
	
	newMod: function(type) {
		if (App.PageTabs.getActivePTab()) {
			this.curPTab = App.PageTabs.getActivePTab();
		}
		else {
			this.curPTab = App.PageTabs.pTabs[0];
		}
		if (this.curPTab.options.mods.flatten().length >= App.maxPerPageModCount) {
			var opt4popWin = {
				type: 'alert',
				title: App.Lang.info,
				content: App.Lang.tooManyModsInOnePage
			};
			var aa = new PopWin(opt4popWin);
			return;
		}
		this.opt4newMod = {
			type: type,

			title: ''
		};
		App.Requester.request('new', {options:this.opt4newMod});
	},
	doNewMod: function(data) {
		if (!data) {return;}
		var mod = data.getElementsByTagName('mod')[0];

		var opt4newModPre = {
			page: this.curPTab || App.PageTabs.pTabs[0],
			id: mod.getAttribute('id') || '',
			type: mod.getAttribute('type') || this.opt4newMod.type || '',
			title: Element.getChildValueByTagName(mod, 'title')[0] || this.opt4newMod.title || '',
			data: Element.getChildValueByTagName(mod, 'data')[0] ? 
				JSON.parse(Element.getChildValueByTagName(mod, 'data')[0]) : this.opt4newMod.data || '',
			
			placeIn: this.curPTab.modCtn.cols[0],
			placeBefore: this.curPTab.modCtn.cols[0].firstChild
		};
		var aa = new App.Module(opt4newModPre);
		setTimeout(function(){
			this.curPTab.regModObservers();
			this.curPTab.saveModsOrder();
			App.Framework.updateNewModMenuContent();
		}.bind(this), 100);
	}

};
// creat module
/*	
	var options = {
		id: 		'mod_00002',
		type: 		'rss',
		isExpanded: false,
		share: 		true,
		floating: 	[400,250,150,150],

		title: 		'Title',
		data: 		['aaa','bbb','ccc']
	};
	new App.Module(options);
*/
App.Module = Class.create();
App.Module.prototype = {
	initialize: function(options, isInit) {
		/*if (App.Permit.ableLog) {
			$LT('App.Module.initialize ('+ options.id +'|'+ options.type +')');
		}*/
		this.options = Object.extend({
			id: 		null,

			type: 		null,
			isExpanded: true,
			share: 		true,
			floating: 	false,
			title: 		'',
			data: 		null,
			page:		null,
			placeIn:	document.body,
			placeBefore:null,
			newMode:	false
		}, options || {});
		Object.extend(this.options, {
			editMode:	false,
			loaded:		false,
			loadTime:	0,
			maxLoadTime:App.maxWidgetLoadTime
		});
		/*if (App.Permit.ableLog) {
			$LT('App.Module.initialize ('+ options.id +'|'+ options.type +'):build');
		}*/
		this.build();
		/*if (App.Permit.ableLog) {
			$LT('App.Module.initialize ('+ options.id +'|'+ options.type +'):build end');
		}*/
		this.m_content = this.getModuleContent();
		this.m_suffix = this.getModuleSuffix();
		if (App.Permit.editModule) {
			this.m_edit = this.getEditContent();
			this.hideEditMode();
			//	this.hideEditBtn();
		}/* else {
			this.hideAddMeBtn();
		}*/
		/*
		if (!this.options.newMode) {
			this.hideRefreshBtn();
		}
		*/
		//this.hideCloseBtn();
		this.setIco();
		//this.options.isExpanded ? this.swapShowHide(true, isInit) : this.swapShowHide(false, isInit);
		this.options.isExpanded ? '' : this.swapShowHide(false, isInit);
		this.hideExpandBtn();
		/*if (App.Permit.ableLog) {
			$LT('App.Module.initialize ('+ options.id +'|'+ options.type +'):register');
		}*/
		App.Modules.register(this, isInit);
		/*if (App.Permit.ableLog) {
			$LT('App.Module.initialize ('+ options.id +'|'+ options.type +'):register end');
		}*/
		
		if (isInit) {this.waitToAttachContent();}
		else {
			App.UserData.addMod(this.options);
			this.attachContent();
		}
		
		/*if (App.Permit.ableLog) {
			$LT('App.Module.initialize ('+ options.id +'|'+ options.type +') end');
		}*/
	},
	destroy: function(noUnloadPage) {
		if (this.content && this.content.destroy) {
			try{
				this.content.destroy();
				this.content = null;
			}catch(e){}
		}

		Element.remove(this.element);
		if (noUnloadPage) {
			this.options.page.saveModsOrder();
			App.Framework.updateNewModMenuContent();
		}
		else {
			this.options.page.saveModsOrder('noToServer');
		}
		App.Modules.unregister(this);
		
	},
	build: function(event) {
		var divModule = document.createElement('div');
		this.element = divModule;
		divModule.className = 'mod';
		//Element.addClassName(divModule, 'mod');
		divModule.id = this.options.id;
		
		/*this.eventAutoShow = this.autoShow.bindAsEventListener(this);
		Event.observe(this.element, 'mouseover', this.eventAutoShow);




		this.eventAutoHide = this.autoHide.bindAsEventListener(this);
		Event.observe(this.element, 'mouseout', this.eventAutoHide);*/

		/*var divModuleFrame = document.createElement('div');
		this.elm_moduleFrame = divModuleFrame;
		Element.addClassName(divModuleFrame, 'modFrame');
		
		divModule.appendChild(divModuleFrame);*/
		
		var arr = [];
		arr.push('<div class="modFrame">');
		arr.push('<table cellspacing="0" cellpadding="0" class="modTable">');
		arr.push('<thead><tr>');
		arr.push('<td class="mheader lt"></td>');
		arr.push('<td class="mheader t"><div class="modHeader clearfix"></div></td>');
		arr.push('<td class="mheader rt"></td>');
		arr.push('</tr></thead>');
		arr.push('<tbody>');
		if (!App.Permit.editModule) {
			arr.push('<tr style="display:none;">');
		}
		else {
			arr.push('<tr>');
		}
		arr.push('<td class="mneck l"></td>');
		arr.push('<td class="mneck ec"><div class="modEditCon"></div></td>');
		arr.push('<td class="mneck r"></td>');
		arr.push('</tr>');
		arr.push('<tr>');
		arr.push('<td class="mbody l"></td>');
		arr.push('<td class="mbody c"><div class="modCon">'+ App.Lang.loading +'</div>');
		arr.push('<div class="modSuffix" style="text-align:right;display:none;"><hr /><a href="javascript:void(0);" onmousedown="CA.a(\'widget_share_\' + (isPPLogin() ? (isMyBlog() ? \'admin\' : \'blogger\') : \'guest\'))"><img align="absmiddle" src="http://js2.pp.sohu.com.cn/ppp/images/icons/ico_share.gif" />推荐给好友</a></div></td>');
		arr.push('<td class="mbody r"></td>');
		arr.push('</tr></tbody>');
		arr.push('<tfoot><tr>');
		arr.push('<td class="mfooter lb"></td>');
		arr.push('<td class="mfooter b"></td>');
		arr.push('<td class="mfooter rb"></td>');
		arr.push('</tr></tfoot>');
		arr.push('</table>');
		arr.push('</div>');
		
		//divModuleFrame.innerHTML = str;
		divModule.innerHTML = arr.join('');
		arr = null;
		
		this.eventCancelBubble = App.cancelBubble.bindAsEventListener(this);
		
		var divModuleHeader = this.getModTable().firstChild.firstChild.childNodes[1].firstChild;
		//var divModuleHeader = document.getElementsByClassName('modHeader', divModule)[0];
		
		if (!this.options.newMode) {
			var divShowHide = document.createElement('div');
			this.elm_showHide = divShowHide;
			divShowHide.className = 'modShow';
			//Element.addClassName(divShowHide, 'modShow');
			divShowHide.title = App.Lang.showHideModuleBtnTitle;
			//divShowHide.innerHTML = '<img src="'+App.Actions.imgPath+'spacer.gif" alt="'+ 
				//App.Lang.showHideModuleBtnTitle +'" title="'+ App.Lang.showHideModuleBtnTitle +'" />';
			Event.observe(divShowHide, 'mousedown', this.eventCancelBubble);
			this.eventSwapShowHide = this.swapShowHide.bindAsEventListener(this);
			Event.observe(divShowHide, 'click', this.eventSwapShowHide);
			
			divModuleHeader.appendChild(divShowHide);
		}

		if (App.Permit.editModule) {
			if (!this.options.newMode) {
				var divClose = document.createElement('div');
				this.elm_close = divClose;
				divClose.className = 'modCls';
				
				var clsAlt = '';
				if (App.WidgetLib.getWidget(this.options.type) && App.WidgetLib.getWidget(this.options.type).sys) {
					clsAlt = App.Lang.hideModuleBtnTitle;
				}
				else {
					clsAlt = App.Lang.delModuleBtnTitle;
				}
				divClose.title = clsAlt;
				Event.observe(divClose, 'mousedown', this.eventCancelBubble);
				this.eventClose = this.close.bindAsEventListener(this);
				Event.observe(divClose, 'click', this.eventClose);
				
				divModuleHeader.appendChild(divClose);
				Element.hide(divClose);
			}
			var divEdit = document.createElement('div');
			this.elm_edit = divEdit;
			divEdit.className = 'modEdit';
			divEdit.innerHTML = '<a href="javascript:void(0)">'+App.Lang.setBtn+'</a>';
			Event.observe(divEdit, 'mousedown', this.eventCancelBubble);
			this.eventSwapEdit = this.swapEditMode.bindAsEventListener(this);
			Event.observe(divEdit, 'click', this.eventSwapEdit);
			
			divModuleHeader.appendChild(divEdit);
			Element.hide(divEdit);
		}
		

		if (!this.options.newMode) {
			//	创建并添加刷新按钮
			var divRefresh = document.createElement('div');
			this.elm_refresh = divRefresh;
			divRefresh.className = 'modRfs';
			divRefresh.title = App.Lang.refreshModuleBtnTitle;
			Event.observe(divRefresh, 'mousedown', this.eventCancelBubble);
			this.eventRefresh = this.refresh.bindAsEventListener(this);
			Event.observe(divRefresh, 'click', this.eventRefresh);
			
			divModuleHeader.appendChild(divRefresh);
			Element.hide(divRefresh);
		}
		

		if (!this.options.editModule) {
			//	创建并添加“添加我”按钮
			var divAddMe = document.createElement('div');
			this.elm_addMe = divAddMe;
			divAddMe.className = 'modAdw';
			divAddMe.innerHTML = '<a href="javascript:void(0)">'+App.Lang.addMeModuleBtnTitle+'</a>';
			Event.observe(divAddMe, 'mousedown', this.eventCancelBubble);
			this.eventAddMe = this.addMe.bindAsEventListener(this);
			Event.observe(divAddMe, 'click', this.eventAddMe);
			
			divModuleHeader.appendChild(divAddMe);
			Element.hide(divAddMe);
		}

		var divIco = document.createElement('div');
		this.elm_ico = divIco;
		divIco.className = 'modIco';
		//Element.addClassName(divIco, 'modIco');
		divIco.innerHTML = '<img src="'+App.Actions.imgPath+'spacer.gif" />';

		divModuleHeader.appendChild(divIco);
		
		
		var divTitle = document.createElement('div');
		this.elm_title = divTitle;
		divTitle.className = 'modTitle';
		//Element.addClassName(divTitle, 'modTitle');
		divTitle.innerHTML = this.options.title || App.Lang.createModule;
		//divTitle.appendChild(document.createTextNode(this.options.title || App.Lang.createModule));

		divModuleHeader.appendChild(divTitle);
		
		/*var clearDiv = document.createElement('div');
		clearDiv.className = 'clear';
		//Element.addClassName(clearDiv, 'clear');
		//clearDiv.style.clear = 'both';
		divModuleHeader.appendChild(clearDiv);*/


		//Element.cleanWhitespace(this.element);
		
		this.eventMouseOver = this.mouseOver.bind(this);
		this.eventMouseOut = this.mouseOut.bind(this);
		Event.observe(this.element, "mouseover", this.eventMouseOver);
		Event.observe(this.element, "mouseout", this.eventMouseOut); 
	},
	mouseOver: function() {
		this.showBtns();
	},
	mouseOut: function() {
		this.hideBtns();
	},
	
	//	取得这个Widget的容器的Table对象
	getModTable: function() {
		return(this.element.firstChild.firstChild);
	},
	getEditPanel: function() {
		var mod_table = this.getModTable();
		var editPanel = mod_table.childNodes[1].firstChild;
		return editPanel;
	},
	
	//	取得这个Widget容器中，显示区域所在那一个TR对象
	getContentPanel: function() {
		var mod_table = this.getModTable();
		var contentPanel = mod_table.childNodes[1].childNodes[1];
		return contentPanel;
	},
	getEditContent: function() {
		var editPanel = this.getEditPanel();

		var editContent = editPanel.childNodes[1].firstChild;
		return editContent;
	},
	
	//	取得widget中内容部分的容器对象
	getModuleContent: function() {
		var contentPanel = this.getContentPanel();
		var moduleContent = contentPanel.childNodes[1].firstChild;
		return moduleContent;
	},
	
	//	取得widget中内容后缀部分的容器对象
	getModuleSuffix: function() {
		var contentPanel = this.getContentPanel();
		var moduleSuffix = contentPanel.childNodes[1].lastChild;
		return moduleSuffix;
	},
	
	setIco: function(src) {
		if (!src) {
			Element.hide(this.elm_ico);
			return;
		}
		var _img = this.elm_ico.firstChild;
		_img.src = src;
		//_img.setAttribute('src', src);
		_img.onload = function() {

			if (this.height > 16) {
				this.height = '16';
			}
		};
		Element.show(this.elm_ico);
	},
	showIcoBtn: function() {
		if (this.elm_ico) Element.show(this.elm_ico);
	},
	hideIcoBtn: function() {
		if (this.elm_ico) Element.hide(this.elm_ico);
	},
	setTitle: function(title, cover) {
		if (!title) {return;}
		if (this.options.title && !cover) {return;}
		this.elm_title.innerHTML = title;
	},
	getTitle: function() {

		return (this.elm_title.innerHTML);
	},
	setFloat: function() {
		this.options.floating = [
			parseInt(Element.getStyle(this.element, 'left')),
			parseInt(Element.getStyle(this.element, 'top')),
			parseInt(Element.getStyle(this.element, 'width')),
			parseInt(Element.getStyle(this.element, 'height'))
		];
		App.Requester.request('float', this);
	},
	showRefreshBtn: function() {
		if (this.elm_refresh) Element.show(this.elm_refresh);
	},
	hideRefreshBtn: function() {
		if (this.elm_refresh) Element.hide(this.elm_refresh);
	},
	refresh: function(event) {
		if (this.content && this.content.refresh && this.options.loaded) {
			this.options.loaded = false;
			this.content.refresh();
		}

	},
	loaded: function() {
		this.options.loaded = true;
	},
	showCloseBtn: function() {
		Element.show(this.elm_close);
	},
	hideCloseBtn: function() {
		if (this.elm_close) Element.hide(this.elm_close);
	},
	close: function() {
		var opt4popWin = {
			type:		'confirm',
			content:	(App.WidgetLib.getWidget(this.options.type) && App.WidgetLib.getWidget(this.options.type).sys)? App.Lang.confirmHideModule : App.Lang.confirmDelModule,
			focus:		false,
			okAction:	this.acceptClose.bind(this)
		};
		var aa = new PopWin(opt4popWin);
	},
	acceptClose: function() {
		App.Requester.request('del', this);
	},
	doClose: function() {
		App.UserData.delMod(this.options);
		this.destroy(true);
		//App.UserData.updateUserModulseOrder();
	},
	/*autoShow: function() {
		if (this.options.isExpanded) return;
		if (this.autoHideTimeout)
			clearTimeout(this.autoHideTimeout);
		if (!this.isAutoExpanded) {
			this.isAutoExpanded = true;
			this.autoShowTimeout = setTimeout(this.show.bind(this, true), 1000);
		}
	},
	autoHide: function() {
		if (this.options.isExpanded && !this.isAutoExpanded) return;
		if (this.autoShowTimeout)
			clearTimeout(this.autoShowTimeout);
		if (this.isAutoExpanded){
			this.isAutoExpanded = false;
			this.autoHideTimeout = setTimeout(this.hide.bind(this, true), 1000);
		}
	},*/
	//	显示添加我按钮
	showAddMeBtn: function() {
		if (this.elm_addMe) Element.show(this.elm_addMe);
	},
	//	隐藏添加我按钮
	hideAddMeBtn: function() {
		if (this.elm_addMe) Element.hide(this.elm_addMe);
	},	//	添加我
	addMe: function() {
		if (!(this.content && this.content.addMe && this.content.addMe())) {
			var extData = '&type=' + this.options.type;
			if(this.options.data.oid) {// 判断是否是一个type多个实例的模块，如果是就把OID和data数据也传给服务端
				// 这里没有直接使用Object.toQueryString()方法，因为它使用了encodeURIComponent编码，会导致乱码，
				// 所以这里直接写了一个方法来实现toQueryString的功能，但是用escape方法编码。
				var arr=[],keys = Object.keys(this.options.data);
				for(var i = 0 ; i < keys.length ; i++)
					arr.push(keys[i] + '=' + escape(this.options.data[keys[i]]))
				extData += '&oid=' + this.options.data.oid + '&' + arr.join('&');
			}
			window.open('http://blog.sohu.com/manage/module.do?m=preview'+ extData);
		}
	},
	swapShowHide: function(opr, isInit) {
		this.lastIsExpanded = this.options.isExpanded;
		if (typeof arguments[0] == 'boolean') {
			arguments[0] ? this.show() : this.hide();

		}
		else {
			this.options.isExpanded ?
				this.hide() : this.show();
		}
		if ( App.Permit.editModule && !isInit && (typeof opr == 'undefined' || opr != this.lastIsExpanded) ) {
			App.Requester.request('expand', this);
		}
	},
	showExpandBtn: function() {
		if (this.elm_showHide) Element.show(this.elm_showHide);
	},
	hideExpandBtn: function() {
		if (this.elm_showHide) Element.hide(this.elm_showHide);
	},
	show: function(notSetOpt) {
		Element.show(this.getContentPanel());
		if (this.resizeObj) {
			(Browser.ua == 'opera')?
				setTimeout((function() {this.resizeObj.adjustSize(false, true);}).bind(this), 10) 
				: this.resizeObj.adjustSize(false, true);
			this.resizeObj.options.constraint = this.resizeObj.defaultConstraint;
		}
		
		if (Element.hasClassName(this.elm_showHide, 'modHide')) {
			Element.removeClassName(this.elm_showHide, 'modHide');
		}
		Element.addClassName(this.elm_showHide, 'modShow');
		if (!notSetOpt) {
			this.options.isExpanded = true;
		}
	},
	hide: function(notSetOpt) {
		Element.hide(this.getContentPanel());
		if (this.resizeObj) {
			(Browser.ua == 'opera')?
				setTimeout((function() {this.resizeObj.adjustSize(false, true);}).bind(this), 10) 
				: this.resizeObj.adjustSize(false, true);
			
			this.resizeObj.defaultConstraint = this.resizeObj.options.constraint;
			this.resizeObj.options.constraint = 'horizontal';
		}
			
		if (Element.hasClassName(this.elm_showHide, 'modShow')) {
			Element.removeClassName(this.elm_showHide, 'modShow');
		}
		Element.addClassName(this.elm_showHide, 'modHide');
		if (!notSetOpt) {
			this.options.isExpanded = false;
		}
	},
	showEditBtn: function() {
		Element.show(this.elm_edit);
	},
	hideEditBtn: function() {
		if (this.elm_edit) Element.hide(this.elm_edit);
	},
	swapEditMode: function() {
		this.options.editMode ?
			this.closeEdit() : this.edit();

	},
	edit: function(event) {
		this.options.editMode = true;
		

		if (this.content && this.content.edit) {

			this.content.edit();
		}
		//this.elm_moduleFrame.style.border = "1px solid #2968B9";
		//this.elm_module.style.border = "3px solid #E1E9F4";
		this.showEditMode();
		this.show();
	},
	closeEdit: function(event) {
		this.options.editMode = false;

		if (this.content && this.content.onCloseEdit) {
			this.content.onCloseEdit();
		}
		//self.elm_moduleFrame.style.border = "1px solid #79A7E2";
		//self.elm_module.style.border = "3px solid #EEE";
		this.hideEditMode();

	},
	save: function(data, title) {
		if (!data && title === null) {return;}
		if (typeof data != 'undefined' && data) {
			this.options.data = data;
		}
		if (typeof title != 'undefined' && title !== null) {
			this.options.title = title;
		}
		App.Requester.request('edit', this);
	},
	endSave: function() {
		if (this.content && this.content.endSave) {
			this.content.endSave();
		}
		this.closeEdit();
	},
	showEditMode: function() {
		var editPanel = this.getEditPanel();
		Element.show(editPanel);
		
		if (this.resizeObj) {
			(Browser.ua == 'opera')?
				setTimeout((function() {this.resizeObj.adjustSize(false, true);}).bind(this), 10) 
				: this.resizeObj.adjustSize(false, true);
		}
		this.setCloseEditBtn();
	},
	hideEditMode: function() {
		//var editContent = this.getEditContent();
		//editContent.innerHTML = '';
		var editPanel = this.getEditPanel();
		Element.hide(editPanel);




		if (this.resizeObj) {
			(Browser.ua == 'opera')?
				setTimeout((function() {this.resizeObj.adjustSize(false, true);}).bind(this), 10) 
				: this.resizeObj.adjustSize(false, true);
		}
		this.setEditBtn();
	},
	setEditBtn: function() {
		this.elm_edit.firstChild.innerHTML = App.Lang.setBtn;
	},
	setCloseEditBtn: function() {
		this.elm_edit.firstChild.innerHTML = App.Lang.closeSetBtn;
	},
	
	waitToAttachContent: function() {
		if (Browser.ua.indexOf('ie')>=0 && !this.options.newMode) {
			if (this.options.page.loaded) {
				if (this.options.fastLoad == 0) {
					var rndWaitTime = Math.round(500*Math.random());
				}
				else if (this.options.fastLoad == 1) {
					var rndWaitTime = Math.round(1000*Math.random()+500);
				}
				else {
					var rndWaitTime = Math.round(2000*Math.random()+1500);
				}
				setTimeout(this.attachContent.bind(this), rndWaitTime);
			}
			else {
				setTimeout(this.waitToAttachContent.bind(this), 100);
			}
		}
		else {
			this.attachContent();
		}
	},
	//	加载所有关于Widget的信息(by jady)
	attachContent: function() {
		if (!App.WidgetLib.getWidget(this.options.type)) {
			this.showWidgetError();
			return;
		}
		this.showWidgetLoading();
		if (App.Widgets[this.options.type]) { // already loaded
			//	已经加载了此Widget的js文件，那就开始初始化此Widget
			this.initWidget();
		} else {
			//	还没有加载此Widget的js文件
			var aa = new App.Widget(this.options.type);
			this.waitForAttachContent();

		}


	},
	waitForAttachContent: function () {
		if (!App.Widgets.hasRegistered(this.options.type)) {
			//this.showWidgetInfo();
		}
		if (App.Widgets[this.options.type]) { // if loaded
			//$LR('loaded');
			this.initWidget();
		} 
		else if (this.options.loadTime < this.options.maxLoadTime) {
			//$LR('loading... ' + this.options.loadTime);

			this.options.loadTime += 100;
			setTimeout(this.waitForAttachContent.bind(this), 100);
		}
		else {
			//$LR('run time out white loading widget - "'+this.options.type+'".');
			App.Widgets.unregister(this.options.type);
			this.showWidgetInfo();
		}
	},
	initWidget: function() {
		var widget = App.WidgetLib.getWidget(this.options.type);
		this.setWidgetData(widget);
		this.w_path = widget.path;
		this.content = new App.Widgets[this.options.type](this.options.data, this.m_content, this.m_edit, this.w_path);
		
		this.content.id = this.options.id;
		this.content.setIco = this.setIco.bind(this);
		this.content.setTitle = this.setTitle.bind(this);
		this.content.getTitle = this.getTitle.bind(this);
		
		//	add by Jady for the widget reset the controls button for example edit refresh ..
		this.content.resetControls = this.resetControls.bind(this);
		this.resetControls();
		
		//	调用widget自己的初始化方法进行初始化
		this.content.initialize();
	},
	
	//	显示控制按钮
	resetControls: function() {
		if (App.Permit.editModule) {
			//	设编辑按钮
			if (typeof this.content.edit == 'function') {
				this.content.save = this.save.bind(this);
				this.content.closeEdit = this.closeEdit.bind(this);
			}
		}
		//	设置刷新按钮
		if (typeof this.content.refresh == 'function') {
			this.content.loaded = this.loaded.bind(this);
		}
		//	设置推荐按钮
		if (typeof(this.content.shareMePath) == 'function' && this.content.shareMePath()) {
			if (!this.shareMeEl) this.shareMeEl = this.m_suffix.lastChild;
			//	如果没有绑定事件的话，那就绑定相应的事件
			if (!this.shareMeEvent) {
				this.shareMeEvent = this.shareMe.bind(this);
				Event.observe(this.shareMeEl, 'click', this.shareMeEvent);
			}
			Element.show(this.m_suffix);
		}
		/* 如果系统模块也可以推荐的话的判断条件
		if (typeof this.content.shareMePath != 'function' || this.content.shareMePath()) {
			
		}
		*/
	},
	
	shareMe: function(e) {
		var ele = this.shareMeEl,
				attr = 'data-share2';
				
		if (!isLogin()) {
			ele.href = loginPath();
			return;
		}
		
		//	确保用户没有重复操作
		if (ele.getAttribute(attr)) return;
		
		//	设置相关数据，并发送相应请求
		ele.setAttribute(attr, 'true');
		ele.innerHTML = '<img align="absmiddle" src="http://js2.pp.sohu.com.cn/ppp/images/icons/ico_share.gif" />正在推荐...';
		var func = function(req) {
			var info = App.Lang.unknownError;
			if (req && req.responseText) {
				try {
					var json = eval('(' + req.responseText + ')');
					if (json && json.statusText) info = json.statusText;
				} catch(e) {}
			}
			var aa = new PopWin({
				type: 'alert',
				title: '推荐给好友',
				content: info
			});
			ele.innerHTML = '<img align="absmiddle" src="http://js2.pp.sohu.com.cn/ppp/images/icons/ico_share.gif" />推荐给好友';
			ele.removeAttribute(attr);
		};
		var path = this.content.shareMePath ? this.content.shareMePath() : this.shareMePath();
		/*
		setTimeout(function() {
			new Groj('http://ow.blog.sohu.com/widget/0/sendMsg?' + path, {
				variable: '_j_share' + Time.now(),
				onSuccess: func,
				onFailure: func
			});
		}, 0);
		*/
		var url = '/py?url=' + encodeURIComponent('http://ow.blog.sohu.com/widget/0/sendMsg?' + path + '&c=' + timeStamp());
		new Ajax.Request(url, {
			method: 'POST',
			onComplete: func
		});
	},
	
	shareMePath: function() {
		return 'url=' + this.options.type;
	},
	
	//	显示控制按钮
	showBtns: function() {
		if (App.Permit.editModule) {
			//	设置编辑按钮
			if (this.content && typeof(this.content.edit) == 'function') {
				this.showEditBtn();
			}
		} else {
			//	设置添加我按钮
			this.showAddMeBtn();
		}
		//	设置刷新按钮
		if (this.content && typeof(this.content.refresh) == 'function') {
			if (!this.options.newMode) {
				this.showRefreshBtn();
			}
		}
		//	设置关闭按钮
		if (App.Permit.editModule && !this.options.newMode) {
			//	if (widget.ableDel) {
			this.showCloseBtn();
			//	}
		}
		//	设置展开按钮
		if (!this.options.newMode) {
			this.hideIcoBtn();
			this.showExpandBtn();
		}
	},
	//	隐藏控制按钮
	hideBtns: function() {
		this.hideEditBtn();
		this.hideAddMeBtn();
		this.hideRefreshBtn();
		this.hideCloseBtn();
		
		this.hideExpandBtn();
		this.showIcoBtn();
	},
	showWidgetLoading: function() {
		var str = '';
		str += App.Lang.loadWidget;
		this.m_content.innerHTML = str;
	},
	showWidgetError: function() {
		var str = '';
		str += App.Lang.widgetError;
		this.m_content.innerHTML = str;
	},
	setWidgetData: function(widget) {
		if (!this.options.title) {this.setTitle(widget.title || '');}
		if (!this.options.ico && widget.ico) {this.setIco(widget.ico);}
		else {this.setIco();}
		
		//this.m_content.className = this.options.type+'-content';
		Element.addClassName(this.m_content, this.options.type+'-content');
		//this.m_edit.className = this.options.type+'-edit';
		Element.addClassName(this.m_edit, this.options.type+'-edit');
		
		this.m_content.innerHTML = '';
	},
	showWidgetInfo: function() {
		var str = '';
		str += App.Lang.loadTimeout;
		str += App.Lang.reloadPage;
		str += '<br /><br />'+App.Lang.loadWidgetTimeout+'['+ this.options.type +']';
		this.m_content.innerHTML = str;
	}
};


//	管理所有已经加载的Widget类型(by jady)
App.Widgets = {
	registered: [],
	register: function(widget) {
		if (this.hasRegistered(widget.type)) {return;}
		this.registered.push(widget);
	},
	hasRegistered: function(type) {
		return (this.registered.find(function(w){
			return w.type == type;
		})? true : false);
	},
	unregister: function(type) {
		this.registered = this.registered.reject(function(w) { return w.type==type; });
	},
	getWidget: function(type) {
		return (this.registered.find(function(w){
			return w.type == type;
		}));
	}

};
// load widget
// new App.Widget('rss');
App.Widget = Class.create();
App.Widget.prototype = {
	initialize: function(type) {
		var widget;
		if (!(widget = App.WidgetLib.getWidget(type))) {return false;}
		if (App.Widgets.hasRegistered(type)) {return;}
		
		Object.extend(this, widget);
		
		this.analyse();
		App.Widgets.register(this);
	},
	analyse: function(request) {
		var baseWidgetPath = this.path;
		
		var ico = this.ico.trim();
		if (ico && ico.indexOf('http://') !== 0 && ico.indexOf('/') !== 0) {
			ico = baseWidgetPath + (ico || '');
		}
		this.ico = ico;
		
		$A(this.js).each(function(f, i){
			if (f.indexOf('http://') !== 0 && f.indexOf('/') !== 0) {
				this.js[i] = baseWidgetPath + f;
			}
		}.bind(this));
		
		$A(this.css).each(function(f, i){
			if (f.indexOf('http://') !== 0 && f.indexOf('/') !== 0) {
				this.css[i] = baseWidgetPath + f;
			}
		}.bind(this));
		
		this.loadLib();
	},
	loadLib: function() {
		$A(this.css).each(function(path){
			new LinkFile(path, {type: 'css'})
		});
		$A(this.js).each(function(path){
			var opt = {}
			if (path.indexOf('feed.js') !== -1) {
				opt.charset = 'utf-8'
			}
			Browser.ua == 'opera' ?
				setTimeout(function(){ new LinkFile(path, opt) }, 100) :
				new LinkFile(path, opt);
		});
	}

};
App.Themes = {
	setTheme: function(themeId) {
		if (!themeId) {return;}
		if (themeId == App.theme) {return;}
		var th = App.ThemeLib.getTheme(themeId);
		if (!th) {
			th= {};
			th.id = themeId;
		}
		App.Requester.request('theme', th.code || th.id);
		App.theme = themeId;
	},
	setOT: function(link) {
		window.open(link, "_blank");
	},
	doSetTheme: function(themeUrl) {
		if (themeUrl && typeof themeUrl == 'string') {
			var url = themeUrl;
		}
		else {
			var th = App.ThemeLib.getTheme(App.theme);
			if (!th && App.theme.indexOf('g') == 0) {
				th = {id:App.theme};
			}
			var url = App.Actions.themePath + (th.path || th.id) +'/style.css';
		}
		if ($('themeCss')) {
			$('themeCss').href = url;
			$('themeCss').setAttribute("themeid", App.theme);
		}
		else {
			this.element = new LinkFile(url, {type: 'css'});
			this.element._link.id = 'themeCss';
			this.element._link.setAttribute("themeid", App.theme);
		}
		//	删除掉open theme中的自定义样式
		if ($('openTheme')) Element.remove('openTheme');
	},
	doSetThemeGW: function(themeId) {
		if (themeId && typeof themeId == 'string') {
			var url = App.Actions.themePath + themeId +'/style.css';
		}
		if ($('themeCss')) {
			$('themeCss').href = url;
		}
		else {
			this.element = new LinkFile(url, {type: 'css'});
			this.element._link.id = 'themeCss';
		}
		//	删除掉open theme中的自定义样式
		if ($('openTheme')) Element.remove('openTheme');
	}
};

//	自定义主题的控制类
App.UserStyle = {
	stylesTempl: {
		"#header":{
			"backgroundImage":"",
			"backgroundRepeat":"",
			"backgroundPosition":"",
			"height":""
		},
		"#header-bak":{
			"backgroundImage":""
		},
		"body":{
			"backgroundImage":"",
			"backgroundRepeat":"",
			"backgroundPosition":""
		},
		"body-bak":{
			"backgroundImage":""
		}
	},
	styles: null,
	//	显示自定义主题的设置台
	customTheme: function() {
		if (!this.cusThemeWin) {
			var opt4cusTheme = {
				menuData: [
					{
						title: App.Lang.customHeader,
						active: true,
						data: this.getCusHeaderCon.bind(this)
					},
					{
						title: App.Lang.customBodyBg,
						active: false,
						data: this.getCusBodyBgCon.bind(this)
					}
				],
				//elm_extendTop: this.getCusThemeInfo(),	// insert some extend divs before menus
				elm_extendBottom: this.getCusThemeClean(),		// insert some extend divs after menus
				title: App.Lang.customTheme,	// window title(String)
				dragable: true	,	// need dragable?
				btn: App.Framework.elm_themeBtn,
				displace: [-495, 0],
				zIndex: 1000,
				okBtn: true,	// need ok button?
				cancelBtn: true,	// need cancel button?
				menuType: 'tab',
				
				onOk: this.save.bind(this),
				onCancel: this.cancel.bind(this),
				
				sDivCss: 'menuSub-div menuSub-div-cusTheme'
			};
			
			this.cusThemeWin = new WinMenu(opt4cusTheme);
		}
		

		if (!this.cusThemeWin.showing) {
			if (this.cusThemeWin && this.cusThemeWin.showing) {
				this.cusThemeWin.hide();
			}
			this.cusThemeWin.show();
		}
		else {
			this.cusThemeWin.hide();
		}
	},
	getCusThemeInfo: function() {
		var div = document.createElement('div');
		div.className = 'infoBox';
		div.innerHTML = App.Lang.customThemeInfo;
		return div;
	},
	getCusThemeClean: function() {
		var div = document.createElement('div');
		div.className = 'cusThemeClean';
		div.innerHTML = '<a href="javascript:void(0)">'+ App.Lang.customThemeClean +'</a>';
		
		Event.observe(div.firstChild, 'click', function() {
			var opt4popWin = {
				type:		'confirm',
				content:	App.Lang.confirmCleanCustomTheme,
				focus:		false,
				okAction:	this.clean.bind(this)
			};
			var aa = new PopWin(opt4popWin);
		}.bind(this));
		
		return div;
	},
	getCusHeaderCon: function() {
		var divCon = document.createElement('div');
		divCon.className = 'menuInnerSub-div clearfix';
		var arr = [];
		arr.push('<fieldset>');
		arr.push('<legend>'+ App.Lang.selectImage +'</legend>');
		arr.push('<div id="cusThemeHeaderBgiBox" style="padding:0;margin:5px;border:1px solid #ccc;height:128px;overflow-y:scroll;" class="clearfix">');		
		arr.push('<div class="headerBgiSmp">');
		arr.push('<img src="'+ App.Actions.imgPath +'custom/themesHeaderBg/default.gif" alt="'+ App.Lang.useThemeDefaultHeaderImg +'" value="default" />');
		arr.push('</div>');
		
		arr.push('<div class="headerBgiSmp">');
		arr.push('<img src="'+ App.Actions.imgPath +'custom/themesHeaderBg/upload.gif" alt="'+ App.Lang.useMyHeaderImg +'" value="upload" />');
		arr.push('</div>');
		
		arr.push('<div class="headerBgiSmp">');
		arr.push('<img src="'+ App.Actions.imgPath +'custom/themesHeaderBg/none.gif" alt="'+ App.Lang.hideHeaderImg +'" value="none" />');
		arr.push('</div>');

		App.CusThemeLib.headerBgi.lib.each(function(img) {
			arr.push('<div class="headerBgiSmp">');
			arr.push('<img src="'+ (img.smp || img.src) +'" alt="'+ img.src +'" value="'+ img.src +'" />');
			arr.push('</div>');
		}.bind(this));
		
		arr.push('</div>');
		arr.push('<iframe src="/htmlarea/popups/insert_cusTheme.html?mode=headbgi&d='+ _blog_domain +'" frameborder="0" style="margin-left:5px;display:none"></iframe>');
		arr.push('<input name="ct_header_bgi_bak" type="hidden" />');
		arr.push('</fieldset>');
		arr.push('<fieldset>');
		arr.push('<legend>'+ App.Lang.imageOption +'</legend>');
		arr.push('<table width="100%">');
		arr.push('<tr>');
		arr.push('<td width="35">'+ App.Lang.tiled +':</td>');
		arr.push('<td>');
		arr.push('<select name="ct_header_bgr" class="text">');
		arr.push('<option value="">'+App.Lang.def+'</option>');
		arr.push('<option value="repeat">'+App.Lang.repeat+'</option>');
		arr.push('<option value="no-repeat">'+App.Lang.noRepeat+'</option>');
		arr.push('<option value="repeat-x">'+App.Lang.repeatX+'</option>');
		arr.push('<option value="repeat-y">'+App.Lang.repeatY+'</option>');
		arr.push('</select>');
		arr.push('</td>');
		arr.push('</tr>');
		arr.push('<tr>');
		arr.push('<td>'+ App.Lang.align +':</td>');
		arr.push('<td>'+ App.Lang.horizontal +' <select name="ct_header_bgp_x" class="text">');
		arr.push('<option value="">'+App.Lang.def+'</option>');
		arr.push('<option value="left">'+App.Lang.left+'</option>');
		arr.push('<option value="center">'+App.Lang.center+'</option>');
		arr.push('<option value="right">'+App.Lang.right+'</option>');
		arr.push('</select>');
		arr.push('&nbsp;&nbsp;&nbsp;&nbsp;'+ App.Lang.vertical +' <select name="ct_header_bgp_y" class="text">');
		arr.push('<option value="">'+App.Lang.def+'</option>');
		arr.push('<option value="top">'+App.Lang.top+'</option>');
		arr.push('<option value="center">'+App.Lang.middle+'</option>');
		arr.push('<option value="bottom">'+App.Lang.bottom+'</option>');
		arr.push('</select></td>');
		arr.push('</tr>');
		arr.push('<tr>');
		arr.push('<td>'+ App.Lang.height +':</td>');
		arr.push('<td><input name="ct_header_h" type="text" class="text" maxlength="3" size="3" /><span>'+ App.Lang.pixel + App.Lang.customHeaderHeightInfo +'</span></td>');
		arr.push('</tr>');
		arr.push('</table>');
		arr.push('</fieldset>');
		divCon.innerHTML = arr.join('');
		
		
		
		var _ipts = $A(divCon.getElementsByTagName('input'));
		_ipts = _ipts.concat($A(divCon.getElementsByTagName('select')));
		$A(_ipts).each(function(ipt) {
			if (ipt.name == 'ct_header_bgi_bak') {
				this.ipt_header_bgi_bak = ipt;
			}
			if (ipt.name == 'ct_header_bgr') {
				this.ipt_header_bgr = ipt;
			}
			if (ipt.name == 'ct_header_bgp_x') {
				this.ipt_header_bgp_x = ipt;
			}
			if (ipt.name == 'ct_header_bgp_y') {
				this.ipt_header_bgp_y = ipt;
			}
			if (ipt.name == 'ct_header_h') {
				this.ipt_header_h = ipt;
			}
		}.bind(this));
		
		this.ifm_header_bgi_up = divCon.getElementsByTagName('iframe')[0];
		this.elm_header_bgis = document.getElementsByClassName('headerBgiSmp',divCon,'div');
		
		setTimeout(function(){
			this.updateCusHeaderData();
			this.observeCusHeader();
		}.bind(this),1);
		return divCon;
	},
	updateCusHeaderData: function() {
		if (this.getStyle('header_bgi') && this.getStyle('header_bgi') == 'transparent') {
			//this.ipt_hideHeaderImg.checked = true;
			this.activeOneHeaderBgi('none');
		}
		else if (this.getStyle('header_bgi') != '') {
			//this.ipt_useMyHeaderImg.checked = true;
			if (App.CusThemeLib.headerBgi.getImg(this.getStyle('header_bgi'))) {
				this.activeOneHeaderBgi(this.getStyle('header_bgi'));
			}
			else {
				this.activeOneHeaderBgi('upload');
			}
		}
		else {
			//this.ipt_useThemeDefaultHeaderImg.checked = true;
			this.activeOneHeaderBgi('default');
		}
		
		this.ipt_header_bgi_bak.value = this.getStyle('header_bak_bgi');
		
		this.ipt_header_bgr.value = this.getStyle('header_bgr');
	
		this.ipt_header_bgp_x.value = this.getStyle('header_bgp_x');
		this.ipt_header_bgp_y.value = this.getStyle('header_bgp_y');
	
		this.ipt_header_h.value = this.getStyle('header_h');
	},
	activeOneHeaderBgi: function(value) {
		$A(this.elm_header_bgis).each(function(e) {
			if (e.firstChild.getAttribute('value') == value) {
				Element.addClassName(e, 'headerBgiSmp-active');
				if (e.style.display == 'none') {
					Element.show(e);
				}
			}
			else {
				Element.removeClassName(e, 'headerBgiSmp-active');
			}
		});
	},
	observeCusHeader: function() {
		$A(this.elm_header_bgis).each(function(e) {
			Event.observe(e, 'mouseover', function() {	Element.addClassName(e, 'headerBgiSmp-over');}.bind(this));
			Event.observe(e, 'mouseout', function() {Element.removeClassName(e, 'headerBgiSmp-over');}.bind(this));
			Event.observe(e, 'click', function() {
				var _value = e.firstChild.getAttribute('value');
				this.activeOneHeaderBgi(_value);
				Element.hide(this.ifm_header_bgi_up);
				if (_value == 'default') {
					this.setCss('#header', 'background-image', '');
					
					if (this.ipt_header_bgr.value) {
						this.ipt_header_bgr.value = '';
						this.setCss('#header', 'background-repeat', '');
					}
					if (this.ipt_header_h.value) {
						this.ipt_header_h.value = '';
						this.setCss('#header', 'height', '');
					}
				}
				else if (_value == 'none') {
					this.setCss('#header', 'background-image', 'none');
				}
				else if (_value == 'upload') {
					Element.show(this.ifm_header_bgi_up);
					if ($F(this.ipt_header_bgi_bak)) {
						this.setCss('#header', 'background-image', 'url('+ $F(this.ipt_header_bgi_bak) +')');
					}
				}
				else {
					this.setCss('#header', 'background-image', 'url('+ _value +')');
					if ( (_tiled = App.CusThemeLib.headerBgi.getImg(_value).tiled) && this.ipt_header_bgr.value != _tiled ) {
						this.ipt_header_bgr.value = _tiled;
						this.setCss('#header', 'background-repeat', _tiled);
					}
					if ( (_height = App.CusThemeLib.headerBgi.getImg(_value).height) && this.ipt_header_h.value != _height ) {
						this.ipt_header_h.value = _height;
						this.setCss('#header', 'height', _height +'px');
					}
				}
			}.bind(this));
		}.bind(this));
		Event.observe(this.ipt_header_bgr, 'change', function() {
			this.setCss('#header', 'background-repeat', this.ipt_header_bgr.value);
		}.bind(this));
		Event.observe(this.ipt_header_bgp_x, 'change', function() {
			var _value = '';
			if (this.ipt_header_bgp_x.value || this.ipt_header_bgp_y.value) {
				_value = (this.ipt_header_bgp_x.value || 'left') +' '+ (this.ipt_header_bgp_y.value || 'top');
			}
			this.setCss('#header', 'background-position', _value);
		}.bind(this));
		Event.observe(this.ipt_header_bgp_y, 'change', function() {
			var _value = '';
			if (this.ipt_header_bgp_x.value || this.ipt_header_bgp_y.value) {
				_value = (this.ipt_header_bgp_x.value || 'left') +' '+ (this.ipt_header_bgp_y.value || 'top');
			}
			this.setCss('#header', 'background-position', _value);
		}.bind(this));
		Event.observe(this.ipt_header_h, 'keyup', function() {
			var _value = this.ipt_header_h.value;
			this.ipt_header_h.nextSibling.style.color = "#000000";
			if (_value && (isNaN(_value) || _value < 100 || _value > 500)) {
				this.ipt_header_h.nextSibling.style.color = "#FF0000";
				this.ipt_header_h.focus();
				return;
			}
			this.setCss('#header', 'height', this.ipt_header_h.value +'px');
		}.bind(this));
		Event.observe(this.ipt_header_h, 'blur', function() {
			var _value = this.ipt_header_h.value;
			if (_value && (isNaN(_value) || _value < 100 || _value > 500)) {
				alert(App.Lang.customHeaderHeightError);
				this.ipt_header_h.focus();
				return;
			}
		}.bind(this));
	},
	getCusBodyBgCon: function() {
		var divCon = document.createElement('div');
		divCon.className = 'menuInnerSub-div clearfix';
		var arr = [];
		arr.push('<fieldset>');
		arr.push('<legend>'+ App.Lang.selectImage +'</legend>');
		arr.push('<div id="cusThemeBodyBgiBox" style="padding:0;margin:5px;border:1px solid #ccc;height:128px;overflow-y:scroll;" class="clearfix">');
		
		arr.push('<div class="bodyBgiSmp">');
		arr.push('<img src="'+ App.Actions.imgPath +'custom/themesBodyBg/default.gif" alt="'+ App.Lang.useThemeDefaultBodyImg +'" value="default" />');
		arr.push('</div>');
		
		arr.push('<div class="bodyBgiSmp">');
		arr.push('<img src="'+ App.Actions.imgPath +'custom/themesBodyBg/upload.gif" alt="'+ App.Lang.useMyBodyImg +'" value="upload" />');
		arr.push('</div>');
		
		arr.push('<div class="bodyBgiSmp">');
		arr.push('<img src="'+ App.Actions.imgPath +'custom/themesBodyBg/none.gif" alt="'+ App.Lang.hideBodyImg +'" value="none" />');
		arr.push('</div>');

		App.CusThemeLib.bodyBgi.lib.each(function(img) {
			arr.push('<div class="bodyBgiSmp">');
			arr.push('<img src="'+ (img.smp || img.src) +'" alt="'+ img.src +'" value="'+ img.src +'" />');
			arr.push('</div>');
		}.bind(this));
		
		arr.push('</div>');
		arr.push('<iframe src="/htmlarea/popups/insert_cusTheme.html?mode=bodybgi&d='+ _blog_domain +'" frameborder="0" style="margin-left:5px;display:none"></iframe>');
		arr.push('<input name="ct_body_bgi_bak" type="hidden" />');
		arr.push('</fieldset>');
		arr.push('<fieldset>');
		arr.push('<legend>'+ App.Lang.imageOption +'</legend>');
		arr.push('<table width="100%" style="border-top:1px solid #eee;">');
		arr.push('<tr>');
		arr.push('<td width="35">'+ App.Lang.tiled +':</td>');
		arr.push('<td>');
		arr.push('<select name="ct_body_bgr" class="text">');
		arr.push('<option value="">'+App.Lang.def+'</option>');
		arr.push('<option value="repeat">'+App.Lang.repeat+'</option>');
		arr.push('<option value="no-repeat">'+App.Lang.noRepeat+'</option>');
		arr.push('<option value="repeat-x">'+App.Lang.repeatX+'</option>');
		arr.push('<option value="repeat-y">'+App.Lang.repeatY+'</option>');
		arr.push('</select>');
		arr.push('</td>');
		arr.push('</tr>');
		arr.push('<tr>');
		arr.push('<td>'+ App.Lang.align +':</td>');
		arr.push('<td>'+ App.Lang.horizontal +' <select name="ct_body_bgp_x" class="text">');
		arr.push('<option value="">'+App.Lang.def+'</option>');
		arr.push('<option value="left">'+App.Lang.left+'</option>');
		arr.push('<option value="center">'+App.Lang.center+'</option>');
		arr.push('<option value="right">'+App.Lang.right+'</option>');
		arr.push('</select>');
		arr.push('&nbsp;&nbsp;&nbsp;&nbsp;'+ App.Lang.vertical +' <select name="ct_body_bgp_y" class="text">');
		arr.push('<option value="">'+App.Lang.def+'</option>');
		arr.push('<option value="top">'+App.Lang.top+'</option>');
		arr.push('<option value="center">'+App.Lang.middle+'</option>');
		arr.push('<option value="bottom">'+App.Lang.bottom+'</option>');
		arr.push('</select></td>');
		arr.push('</tr>');
		arr.push('</table>');
		arr.push('</fieldset>');
		divCon.innerHTML = arr.join('');
		
		var _ipts = $A(divCon.getElementsByTagName('input'));
		_ipts = _ipts.concat($A(divCon.getElementsByTagName('select')));
		$A(_ipts).each(function(ipt) {
			if (ipt.name == 'ct_body_bgi_bak') {
				this.ipt_body_bgi_bak = ipt;
			}
			if (ipt.name == 'ct_body_bgr') {
				this.ipt_body_bgr = ipt;
			}
			if (ipt.name == 'ct_body_bgp_x') {
				this.ipt_body_bgp_x = ipt;
			}
			if (ipt.name == 'ct_body_bgp_y') {
				this.ipt_body_bgp_y = ipt;
			}
			if (ipt.name == 'ct_body_h') {
				this.ipt_body_h = ipt;
			}
		}.bind(this));
		
		this.ifm_body_bgi_up = divCon.getElementsByTagName('iframe')[0];
		this.elm_body_bgis = document.getElementsByClassName('bodyBgiSmp',divCon,'div');
		
		setTimeout(function(){
			this.updateCusBodyData();
			this.observeCusBody();
		}.bind(this),1);
		
		return divCon;
	},
	updateCusBodyData: function() {
		if (this.getStyle('body_bgi') && this.getStyle('body_bgi') == 'transparent') {
			this.activeOneBodyBgi('none');
		}
		else if (this.getStyle('body_bgi') != '') {
			if (App.CusThemeLib.bodyBgi.getImg(this.getStyle('body_bgi'))) {
				this.activeOneBodyBgi(this.getStyle('body_bgi'));
			}
			else {
				this.activeOneBodyBgi('upload');
			}
		}
		else {
			this.activeOneBodyBgi('default');
		}
		
		this.ipt_body_bgi_bak.value = this.getStyle('body_bak_bgi');
		
		this.ipt_body_bgr.value = this.getStyle('body_bgr');
	
		this.ipt_body_bgp_x.value = this.getStyle('body_bgp_x');
		this.ipt_body_bgp_y.value = this.getStyle('body_bgp_y');
	},
	activeOneBodyBgi: function(value) {
		$A(this.elm_body_bgis).each(function(e) {
			if (e.firstChild.getAttribute('value') == value) {
				Element.addClassName(e, 'bodyBgiSmp-active');
				if (e.style.display == 'none') {
					Element.show(e);
				}
			}
			else {
				Element.removeClassName(e, 'bodyBgiSmp-active');
			}
		});
	},
	observeCusBody: function() {
		$A(this.elm_body_bgis).each(function(e) {
			Event.observe(e, 'mouseover', function() {	Element.addClassName(e, 'bodyBgiSmp-over');}.bind(this));
			Event.observe(e, 'mouseout', function() {Element.removeClassName(e, 'bodyBgiSmp-over');}.bind(this));
			Event.observe(e, 'click', function() {
				var _value = e.firstChild.getAttribute('value');
				this.activeOneBodyBgi(_value);
				Element.hide(this.ifm_body_bgi_up);
				if (_value == 'default') {
					this.setCss('body', 'background-image', '');
					
					if (this.ipt_body_bgr.value) {
						this.ipt_body_bgr.value = '';
						this.setCss('body', 'background-repeat', '');
					}
				}
				else if (_value == 'none') {
					this.setCss('body', 'background-image', 'none');
				}
				else if (_value == 'upload') {
					Element.show(this.ifm_body_bgi_up);
					if ($F(this.ipt_body_bgi_bak)) {
						this.setCss('body', 'background-image', 'url('+ $F(this.ipt_body_bgi_bak) +')');
					}
				}
				else {
					this.setCss('body', 'background-image', 'url('+ _value +')');
					if ( (_tiled = App.CusThemeLib.bodyBgi.getImg(_value).tiled) && this.ipt_body_bgr.value != _tiled ) {
						this.ipt_body_bgr.value = _tiled;
						this.setCss('body', 'background-repeat', _tiled);
					}
				}
			}.bind(this));
		}.bind(this));
		Event.observe(this.ipt_body_bgr, 'change', function() {
			this.setCss('body', 'background-repeat', this.ipt_body_bgr.value);
		}.bind(this));
		Event.observe(this.ipt_body_bgp_x, 'change', function() {
			var _value = '';
			if (this.ipt_body_bgp_x.value || this.ipt_body_bgp_y.value) {
				_value = (this.ipt_body_bgp_x.value || 'left') +' '+ (this.ipt_body_bgp_y.value || 'top');
			}
			this.setCss('body', 'background-position', _value);
		}.bind(this));
		Event.observe(this.ipt_body_bgp_y, 'change', function() {
			var _value = '';
			if (this.ipt_body_bgp_x.value || this.ipt_body_bgp_y.value) {
				_value = (this.ipt_body_bgp_x.value || 'left') +' '+ (this.ipt_body_bgp_y.value || 'top');
			}
			this.setCss('body', 'background-position', _value);
		}.bind(this));
	},
	//	取得某个样式标签的样式配置对象
	analyesTagCss: function(tagId) {
		var styles = null;
		var ele = $(tagId);
		if (ele) {
			styles = {};
			var _sheet = ele.sheet || ele.styleSheet;
			var _rules = _sheet.cssRules || _sheet.rules;
			$A(_rules).each(function(r) {
				var _selectors = r.selectorText.toLowerCase().split(',');
				//var _selectors = r.selectorText.split(',');
				$A(_selectors).each(function(slt) {
					var _selector = slt.replace(/(^\s*)|(\s*$)/g, '');
					if (!styles[_selector]) {
						styles[_selector] = {};
					}
					var _styleSets = r.style;
					$H(_styleSets).each(function(s) {
						if (s.value && s.key != 'cssText' && (typeof s.value == 'string') && (s.key.indexOf('Moz')!=0) && isNaN(s.key-0)) {
							styles[_selector][s.key] = s.value;
							//$LR(_selector +'{'+ s.key +':'+ s.value +'}');
						}
					});
				});
			});
			
		}
		return styles;
	},
	//	取得除当前基础主题外的综合样式（现在是开放主题和自定义主题的样式）
	getRuntimeCss: function() {
		var openCss = this.analyesTagCss('openTheme');		//	取得开放主题的样式
		var customCss = this.analyesTagCss('customTheme');	//	取得自定义主题的样式
		if (openCss && customCss) {
			return Object.extend(openCss, customCss);
		}
		return openCss || customCss;
	},
	//	分析当前的页面的自定义样式设置信息
	analyesCss: function() {
		this.styles = this.getRuntimeCss();
	},
	getCss: function(selector, property) {
		if (!this.styles) {
			this.analyesCss();
		}
		var styleSet = property.camelize();
		return (  (this.styles && this.styles[selector])? (this.styles[selector][styleSet]? this.styles[selector][styleSet] : '') : ''  );
	},
	// setCss('#header', 'background-image', 'url(http://xx.xx.xx/xx.jpg)');
	setCss: function(selector, property, value) {
		//$LR(selector +'{'+ property +':'+ value +'}');
		var _styleTag = $('customTheme');
		if (!_styleTag) {
			_styleTag = document.createElement('style');
			_styleTag.id = 'customTheme';
			_styleTag.type = 'text/css';
			document.getElementsByTagName('head')[0].appendChild(_styleTag);
		}
		var _sheet = _styleTag.sheet || _styleTag.styleSheet;
		var _rules = _sheet.cssRules || _sheet.rules;
		var insertIndex = _rules.length;
		$A(_rules).each(function(r,i) {
			if (r.selectorText.toLowerCase() == selector && r.style[property.camelize()]) {
				//$LR(i +':::'+ r.selectorText +' : '+ selector)
				insertIndex = i;
				_sheet.deleteRule? _sheet.deleteRule(i) : _sheet.removeRule(i);
				throw $break;
			}
		}.bind(this));
		if (value) {
			var _rule = selector +'{'+ property +':'+ value +';}';
			_sheet.insertRule? _sheet.insertRule(_rule, insertIndex) : _sheet.addRule(selector, property +':'+ value +';');
		}
	},
	getStyle: function(type) {
		switch(type) {
			case 'header_bgi':
				return(this.getCss('#header','background-image').replace(/url\((.*)\)/, '$1'));
				break;
			case 'header_bak_bgi':
				return(this.getCss('#header-bak','background-image').replace(/url\((.*)\)/, '$1'));
				break;
			case 'header_bgr':
				return(this.getCss('#header','background-repeat'));
				break;
			case 'header_bgp_x':
				return(this.getCss('#header','background-position')? this.getCss('#header','background-position').split(' ')[0] : '');
				break;
			case 'header_bgp_y':
				return(this.getCss('#header','background-position')? this.getCss('#header','background-position').split(' ')[1] : '');
				break;
			case 'header_h':
				return(parseInt(this.getCss('#header','height')) || '');
				break;
			case 'body_bgi':
				return(this.getCss('body','background-image').replace(/url\((.*)\)/, '$1'));
				break;
			case 'body_bak_bgi':
				return(this.getCss('body-bak','background-image').replace(/url\((.*)\)/, '$1'));
				break;
			case 'body_bgr':
				return(this.getCss('body','background-repeat'));
				break;
			case 'body_bgp_x':
				return(this.getCss('body','background-position')? this.getCss('body','background-position').split(' ')[0] : '');
				break;
			case 'body_bgp_y':
				return(this.getCss('body','background-position')? this.getCss('body','background-position').split(' ')[1] : '');
				break;
			default: return null;
		}
	},
	//	取得综合open theme主题和自定义主题后综合的样式代码
	getCustomStyles: function() {
		this.analyesCss();
		var str = '';
		str += '#header{background-image: ' + this.getCss('#header', 'background-image') + ';}';
		str += '#header{background-repeat: '+ this.getCss('#header', 'background-repeat') + ';}';
		str += '#header{background-position: '+ this.getCss('#header', 'background-position') + ';}';
		str += '#header{height: '+ this.getCss('#header', 'height') + ';}';	
		
		str += 'body{background-image: '+ this.getCss('body', 'background-image') + ';}';
		str += 'body{background-repeat: '+ this.getCss('body', 'background-repeat') + ';}';
		str += 'body{background-position: '+ this.getCss('body', 'background-position') + ';}';
		return str;
	},
	getCustomSets: function(withoutBak) {
		this.analyesCss();
		var str = '';
		str += 'css|#header|bgi='+ this.getCss('#header', 'background-image');
		if (!withoutBak) str += '&css|#header-bak|bgi='+ this.getCss('#header-bak', 'background-image');			
		str += '&css|#header|bgr='+ this.getCss('#header', 'background-repeat');			
		str += '&css|#header|bgp='+ this.getCss('#header', 'background-position');			
		str += '&css|#header|h='+ this.getCss('#header', 'height');	
		
		str += '&css|body|bgi='+ this.getCss('body', 'background-image');			
		if (!withoutBak) str += '&css|body-bak|bgi='+ this.getCss('body-bak', 'background-image');			
		str += '&css|body|bgr='+ this.getCss('body', 'background-repeat');			
		str += '&css|body|bgp='+ this.getCss('body', 'background-position');
		return str;
	},
	//	保存当前的设置
	save: function() {
		var str = this.getCustomSets();
		App.Requester.request('customTheme', str);
		var opt4popWin = {
			type:		'confirm',
			content:	'自定义主题已生效。<br/><br/>提示：如果您再完善一些详细信息，就可以分享给其他博友使用。',
			okText: 	'分享',
			cancelText: '不分享',
			focus:		false,
			okAction:	this.shareTheme.bind(this)
		};
		var aa = new PopWin(opt4popWin);
	},
	//	保存成功
	saveOk: function() {
		var str = this.getCustomStyles();
		if ($('openTheme')) Element.remove('openTheme');
		$('customTheme').innerHTML = str;
	},
	//	整体调整样式成功
	styleAllOk: function() {
		//	跳转到博主的博客地址
		location.href = ToolBar.getBlogPath();
	},
	//	分享该主题，提交到open widget平台
	shareTheme: function() {
		switch (this.getThemeType()) {
			case 3: 	//	可以分享的主题
				var div = document.createElement("div");
				div.innerHTML = '<form method="post" action="http://ow.blog.sohu.com/manage/theme.do?action=submittheme" target="_blank"><input type="hidden" name="theme" value="" /><input type="hidden" name="style" value="" /></form>';
				div = document.body.appendChild(div);
				var form = div.childNodes[0];
				form.theme.value = $('themeCss').getAttribute('themeid');
				form.childNodes[1].value = this.getCustomSets();
				form.submit();
				break;
			case 2:		//	收费基础主题
				alert(App.Lang.noSharePay);
				break;
			default:	//	其他主题
				alert(App.Lang.needCustom);
				break;
		}
	},
	/**
	 * 取得基础样式的编号
	 */
	getThemeId: function() {
		var themeCss = $("themeCss"),
				themeId;
		if ((themeId = themeCss.getAttribute("themeid")) && typeof(themeId) == "string" && themeId.length > 0) {
			return themeId;
		}
		return null;
	},
	/**
	 * 取得主题的类型
	 *		1：普通基础主题
	 *		2：付费基础主题
	 * 		3：自定义主题
	 * 		4：OW主题
	 **/
	getThemeType: function() {
		var customTheme = $('customTheme'),
				openTheme = $('openTheme'),
				themeId = null;
		
		//	如果已经设置过头图或者背景图的话
		if (this.getCss('#header', 'background-image') != '' || this.getCss('body', 'background-image') != '') {
			//	如果存在自定义主题的话，就认为是自定义主题
			if (customTheme) return 3;
			
			//	如果存在OW them的话，那就认为是OW Theme
			if (openTheme) return 4;
		}
		
		//	判断是否是收费主题
		if ((themeId = this.getThemeId()) && themeId.indexOf('g') == 0) {
			return 2; 
		}
		
		//	默认都是基础主题
		return 1;
	},
	clean: function() {
		App.Requester.request('customThemeClean', this);
	},
	cleanOk: function() {
		var _styleTag = $('customTheme');
		if (_styleTag) {
			Element.remove(_styleTag);
		}
		this.styles = null;
		setTimeout(function() {
			try{this.updateCusHeaderData()}catch(e){}
			try{this.updateCusBodyData()}catch(e){}
		}.bind(this),10);
		this.cusThemeWin.hide();
	},
	//	点取消按钮时调用的方法
	cancel: function() {
		$H(this.stylesTempl).each(function(r) {
			$H(r.value).each(function(p) {
				this.setCss(r.key, p.key.underscore().dasherize(), ((this.styles && this.styles[r.key] && this.styles[r.key][p.key])? this.styles[r.key][p.key] : ''));
			}.bind(this));
		}.bind(this));
		setTimeout(function() {
			try{this.updateCusHeaderData()}catch(e){}
			try{this.updateCusBodyData()}catch(e){}
		}.bind(this),10);
	},
	upHeadbgiOk: function(url) {
		if (url) {
			this.ipt_header_bgi_bak.value = url;
			this.setCss('#header-bak', 'background-image', 'url('+ url +')');
			this.setCss('#header', 'background-image', 'url('+ url +')');
		}
	},
	upBodybgiOk: function(url) {
		if (url) {
			this.ipt_body_bgi_bak.value = url;
			this.setCss('body-bak', 'background-image', 'url('+ url +')');
			this.setCss('body', 'background-image', 'url('+ url +')');
		}
	}
};

var Feed = function(feed) {
	this.root = feed.responseXML.documentElement;
	this.type = (this.root.nodeName=='feed') ? 1 : 0;
	// htmlUrl
	var root = (this.type==1) ? this.root : this.root.getElementsByTagName('channel')[0];
	var links = Element.getChildElementByTagName(root, 'link');
	if (this.type == 1) {
		$A(links).each(function(l){
			if (l.getAttribute('type') == 'text/html' || links.length == 1) {
				this.htmlUrl = l.getAttribute('href');
			}
		}.bind(this));
	} else {
		this.htmlUrl = (links[0].firstChild) ? links[0].firstChild.nodeValue : '';
	}
	
	// title
	this.title = Element.getChildValueByTagName(root, 'title')[0] || this.htmlUrl;
	
	// description
	var desc = (this.type==1) ? this.root.getElementsByTagName('tagline') : this.root.getElementsByTagName('description');
	this.description = (desc.length>0) ? ((desc[0].firstChild) ? desc[0].firstChild.nodeValue : '') : '';
	
	this.items = [];
	var items = (this.type==1) ? this.root.getElementsByTagName('entry') : this.root.getElementsByTagName('item');
	$A(items).each(function(it){
		var obj = {};
		obj.node = it;
		obj.enclosures = it.getElementsByTagName('enclosure');
		
		var title = Element.getChildElementByTagName(it, 'title')[0];
		if (title && title.firstChild) {
			obj.title = title.firstChild.nodeValue;
		} else {
			var d = it.getElementsByTagName('description');
			if (d[0]) {
				var tmp = document.createElement("div");
				tmp.innerHTML = d[0].firstChild.nodeValue;
				obj.title = ((tmp.innerText)? tmp.innerText.substring(0,50) : '' ) +"...";
			} else {
				obj.title = '[...]';
			}
		}
		
		var dcDate = (Browser.ua.indexOf('ie')>=0)? 
			it.getElementsByTagName('dc:date')[0] : it.getElementsByTagName('date')[0];
		if (it.getElementsByTagName('pubDate')[0]) {
			obj.date = (it.getElementsByTagName('pubDate')[0].firstChild)? 
				it.getElementsByTagName('pubDate')[0].firstChild.nodeValue : '';
		} else if (dcDate) {
			obj.date = dcDate.firstChild.nodeValue;
		} else if (it.getElementsByTagName('issued')[0]) {
			obj.date = it.getElementsByTagName('issued')[0].firstChild.nodeValue;
		}
		
		var links = Element.getChildElementByTagName(it, 'link');
		if (links.length > 0) {
			if (this.type == 1) {
				$A(links).each(function(l){
					if (l.getAttribute("type")=='text/html' || links.length==1) {
						obj.link = l.getAttribute('href');
					}
				});
			} else {
				if (links[0] || links[0].firstChild) {
					obj.link = (links[0].firstChild) ? links[0].firstChild.nodeValue : '';
				} else if (it.getElementsByTagName('guid')[0].firstChild) {
					obj.link = it.getElementsByTagName('guid')[0].firstChild.nodeValue;
				}
			}
		} else {
			obj.link = this.htmlUrl;
		}
		
		if (this.type==1) {
			obj.content = it.getElementsByTagName('content')[0];
			obj.description = it.getElementsByTagName('summary')[0];
		} else {
			obj.content = (Browser.ua.indexOf('ie')>=0) ? 
				it.getElementsByTagName('content:encoded')[0] : it.getElementsByTagName('encoded')[0];
			obj.description = it.getElementsByTagName('description')[0];
		}
		
		this.items.push(obj);
	}.bind(this));
};


function registerWidget(w){
	App.Widgets[w] = eval(w);

}

var PopWins = {
	popWins: [],
	x: null,
	y: null,
	zIndex: 2000,
	register: function(popWin) {
		this.popWins.push(popWin);
		
		if (Browser.ua.indexOf('ie')<0) {
			//new Effect.Highlight(popWin.element.firstChild, { duration: 1.0, queue: 'end' });
		}
	},
	unregister: function(popWin) {
		this.popWins = this.popWins.reject(function(p) { return p==popWin; });
		this.x -= 10;
		this.y -= 10;
		if (this.popWins.length <= 0) {
			this.x = this.y = null;
			this.zIndex = 2000;
			Event.stopObserving(window, 'resize', this.eventResizeBgAll);
		}
	},
	placeIt: function(popWin) {
		document.body.appendChild(popWin.element);
		popWin.element.style.position = 'absolute';
		popWin.element.style.zIndex = this.zIndex++;
		popWin.element.style.width = popWin.options.width +'px';
		if ( popWin.element.offsetHeight >= 500 ) {
			popWin.elm_content.style.height = '500px';
		}
		if (!this.x || !this.y) {
			this.x = (document.body.offsetWidth - popWin.element.offsetWidth)/2;
			this.y = Math.ceil((document.documentElement.clientHeight - popWin.element.offsetHeight)/2)*0.6 + document.documentElement.scrollTop;
		}
		else {
			this.x += 10;
			this.y += 10;
		}

		popWin.element.style.left = this.x + "px";
		popWin.element.style.top = this.y + "px";
		
		popWin.dragObj = new Draggable(popWin.element, {handle: 't', zindex: this.zIndex});
		
		this.eventCancelBubble = App.cancelBubble.bindAsEventListener(this);
		Event.observe(popWin.element, 'mousedown', this.eventCancelBubble);
		Event.observe(popWin.element, 'click', this.eventCancelBubble);

	},
	placeBg: function(popWin) {
		document.body.appendChild(popWin.elm_bg);
		var _style = {
			background: '#666',
			position: 'absolute',
			zIndex: this.zIndex++,
			left: '0px',
			top: '0px',
			width: document.body.offsetWidth +'px',
			height: Math.max(document.body.offsetHeight, document.documentElement.clientHeight) +'px'
		};
		Element.setStyle(popWin.elm_bg, _style);
		
		this.eventResizeBgAll = this.resizeBgAll.bindAsEventListener(this);
		Event.observe(window, 'resize', this.eventResizeBgAll);
		
		
		this.eventCancelBubble = App.cancelBubble.bindAsEventListener(this);
		Event.observe(popWin.elm_bg, 'mousedown', this.eventCancelBubble);
		Event.observe(popWin.elm_bg, 'click', this.eventCancelBubble);
		
		if (Browser.ua.indexOf('ie')>=0) {
			Element.setOpacity(popWin.elm_bg, 0.5);
		}
		else {
			Element.setOpacity(popWin.elm_bg, 0.0);
			var aa = new Effect.Opacity(popWin.elm_bg, {duration:0.3, from:0.0, to:0.5});
		}
	},
	resizeBgAll: function() {
		this.popWins.each(function(w) {
			this.resizeBg(w);
		}.bind(this));
	},
	resizeBg: function(popWin) {
		var _style = {
			width: document.body.offsetWidth +'px',
			height: Math.max(document.body.offsetHeight, document.documentElement.clientHeight) +'px'
		};
		Element.setStyle(popWin.elm_bg, _style);
	}
};
var PopWin = Class.create();
PopWin.prototype = {
	initialize: function(options) {
		this.options = Object.extend({
			name: 		'popWin',	// for same name, the content will be shown in the same window
			type: 		'pop',	// 'pop', 'dialog', 'alert', 'confirm'
			focus:		true,	// if type is confirm, this option decide default focus button
			title: 		'',
			ico:		'info',	// 'info', 'error', 'light'
			content:	'',
			html:		true,
			width:		'250',
			okText:		App.Lang.ok,
			okAction:	null,
			okData:		null,
			cancelText:	App.Lang.cancel,
			cancelAction: null,
			cancelData:	null,
			closeAction:null,
			closeData:	null
		}, options || {});
		
		this.options.ico = 'ico_'+ this.options.ico +'.gif';
		
		
		if (this.options.type != 'pop') {
			this.buildBg();

			PopWins.placeBg(this);
		}
		
		this.build();
		
		if (this.options.content) {
			if (this.options.html) {
				this.elm_content.innerHTML = this.options.content.replace(/\n/ig, '<br />');
			}
			else {
				this.elm_content.innerHTML = this.options.content.convertTextToHTML().replace(/\n/ig, '<br />');
			}
		}
		
		PopWins.placeIt(this);
		
		
		if (this.options.type == 'alert' || this.options.type == 'confirm') {
			this.buildBtn();
			setTimeout(this.getFocus.bind(this), 10);
			this.eventGetFocus = this.getFocus.bindAsEventListener(this);
			Event.observe(this.elm_bg, 'click', this.eventGetFocus);
			Event.observe(this.element, 'click', this.eventGetFocus);
		}
		
		PopWins.register(this);
	},
	destroy: function() {
		Element.remove(this.element);
		if (this.elm_bg) {
			Element.setOpacity(this.elm_bg, 1.0);
			Element.remove(this.elm_bg);
		}
		PopWins.unregister(this);
	},
	build: function() {
		var divPopWin = document.createElement('div');
		this.element = divPopWin;
		divPopWin.id = this.options.name;
		divPopWin.className = 'popWin';
		
		var divInnerPopWin = document.createElement('div');
		divInnerPopWin.className = 'mod';

		divPopWin.appendChild(divInnerPopWin);

		var divPopWinFrame = document.createElement('div');
		this.elm_popWinFrame = divPopWinFrame;
		divPopWinFrame.className = 'modFrame';
		
		divInnerPopWin.appendChild(divPopWinFrame);
		
		var str = '';
		str += '<table cellspacing="0" cellpadding="0" class="modTable" height="100%">';
		str += '<thead><tr>';
		str += '<td class="mheader lt"></td>';
		str += '<td class="mheader t"><div class="modHeader"></div></td>';
		str += '<td class="mheader rt"></td>';
		str += '</tr></thead>';
		str += '<tbody><tr>';
		str += '<td class="mbody l"></td>';
		str += '<td class="mbody c" height="100%"><div class="modCon"></div></td>';
		str += '<td class="mbody r"></td>';
		str += '</tr></tbody>';
		str += '<tfoot><tr>';

		str += '<td class="mfooter lb"></td>';
		str += '<td class="mfooter b"></td>';
		str += '<td class="mfooter rb"></td>';
		str += '</tr></tfoot>';
		str += '</table>';
		
		divPopWinFrame.innerHTML = str;

		
		this.eventCancelBubble = App.cancelBubble.bindAsEventListener(this);
		
		var divClose = document.createElement('div');
		this.elm_close = divClose;
		divClose.className = 'modCls';
		divClose.title = App.Lang.close;
		Event.observe(divClose, 'mousedown', this.eventCancelBubble);
		this.eventClose = this.closeAction.bindAsEventListener(this);
		Event.observe(divClose, 'click', this.eventClose);

		var divIco = document.createElement('div');
		this.elm_ico = divIco;
		divIco.className = 'modIco';
		divIco.innerHTML = '<img src="'+App.Actions.imgPath+this.options.ico+'" />';

		var divTitle = document.createElement('div');

		this.elm_title = divTitle;
		divTitle.className = 'modTitle';
		divTitle.appendChild(document.createTextNode(this.options.title || App.Lang.info));

		var divPopWinHeader = document.getElementsByClassName('modHeader', divPopWinFrame)[0];
		
		divPopWinHeader.appendChild(divClose);
		divPopWinHeader.appendChild(divIco);
		divPopWinHeader.appendChild(divTitle);
		
		Element.cleanWhitespace(this.element);
		
		this.elm_content = this.getPopWinContent();
	},
	getPopWinContent: function() {
		var popWin_table = this.element.firstChild.firstChild.firstChild;
		var popWinContent = popWin_table.rows[1].cells[1].firstChild;
		return popWinContent;
	},
	close: function() {
		this.destroy();
	},
	buildBg: function() {
		var divBg = document.createElement('div');
		this.elm_bg = divBg;
	},
	buildBtn: function() {
		var divBtn = document.createElement('div');
		divBtn.className = 'divBtn';
		
		var btnOk = document.createElement('input');
		this.okBtn = btnOk;
		btnOk.className = 'button-submit';
		btnOk.type = 'button';
		btnOk.value = this.options.okText;
		this.eventOkAction = this.okAction.bindAsEventListener(this);
		Event.observe(btnOk, 'click', this.eventOkAction);
		divBtn.appendChild(btnOk);
		
		if (this.options.type == 'confirm') {
			var btnCancel = document.createElement('input');
			this.cancelBtn = btnCancel;
			btnCancel.className = 'button';
			btnCancel.type = 'button';
			btnCancel.value = this.options.cancelText;
			this.eventCancelAction = this.cancelAction.bindAsEventListener(this);
			Event.observe(btnCancel, 'click', this.eventCancelAction);
			divBtn.appendChild(btnCancel);
		}
		
		this.elm_content.parentNode.appendChild(divBtn);
	},
	okAction: function() {
		this.close();
		if (this.options.okAction) {
			(this.options.okData)? (this.options.okAction)(this.options.okData) :	(this.options.okAction)(true);
		}
	},
	cancelAction: function() {
		this.close();
		if (this.options.cancelAction) {
			(this.options.cancelData)? (this.options.cancelAction)(this.options.cancelData) : (this.options.cancelAction)(false);
		}
	},
	closeAction: function() {
		if (this.options.closeAction) {
			this.close();
			(this.options.closeData)? (this.options.closeAction)(this.options.closeData) :	(this.options.closeAction)(true);
		}
		else if (this.options.type == 'confirm') {
			this.cancelAction();
		}
		else if (this.options.type == 'alert') {
			this.okAction();
		}
		else  {
			this.close();
		}
	},
	getFocus: function() {
		if (this.options.type != 'alert' && this.options.type != 'confirm') {return;}
		if (this.options.focus === false) {
			this.cancelBtn.focus();
		}
		else {
			this.okBtn.focus();
		}
	}
};
App.ToolTip = function(node, txt, w, align, ev) {
	var offsetxpoint = 0;
	var offsetypoint = 20;
	var enabletip = false;
	var autoHide;
	var tipobj;
	if ($('tooltip')) {
		tipobj = $('tooltip');
	}
	else {

		tipobj = document.createElement('div');

		tipobj.id = 'tooltip';

		//tipobj.setAttribute('id', 'tooltip');
		tipobj.className = 'mod';
		//Element.addClassName(tipobj, 'mod');
		tipobj.style.position = 'absolute';
		document.body.appendChild(tipobj);
	}
	if (!w) {w = 200;}
	if (!align) {align = "center";}
	
	function ietruebody(){
		return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body;
	}
	
	this.display = function(node, txt, w, align){
		positiontip(window.event);
		Event.observe(document, 'mousemove', positiontip);
		Event.observe(node, 'mouseout', this.hide, false);
		
		tipobj.style.textAlign=align;
		tipobj.innerHTML='<div class="modFrame">'+txt+'</div>';
		Element.show(tipobj);
		
		if (tipobj.offsetWidth>w) {tipobj.style.width=w+"px";}
		enabletip = true;
		autoHide = setTimeout(this.hide, 10000);
	};
	
	function positiontip(event){
		if (enabletip){
			var curX = (Browser.ua.indexOf('ie')>=0)? Event.pointerX(event) : Event.pointerX(event);
			var curY = (Browser.ua.indexOf('ie')>=0)? Event.pointerY(event) : Event.pointerY(event);
			var rightedge = (Browser.ua.indexOf('ie')>=0 && Browser.ua!='opera')? 
				ietruebody().clientWidth-Event.pointerX(event)+ietruebody().scrollLeft-offsetxpoint : window.innerWidth-Event.pointerX(event)+window.pageXOffset-offsetxpoint-20;
			var bottomedge = (Browser.ua.indexOf('ie')>=0 && Browser.ua!='opera')? 
				ietruebody().clientHeight-Event.pointerY(event)+ietruebody().scrollTop-offsetypoint : window.innerHeight-Event.pointerY(event)+window.pageYOffset-offsetypoint-20;
			
			var leftedge = (offsetxpoint<0)? offsetxpoint*(-1) : -1000;
			
			
 			if (rightedge<tipobj.offsetWidth) {
				tipobj.style.left = (Browser.ua.indexOf('ie')>=0) ? 
					Event.pointerX(event)-tipobj.offsetWidth+"px" : Event.pointerX(event)-tipobj.offsetWidth+"px";
			}
			else if (curX<leftedge) {
				tipobj.style.left = "5px";
			} else {
				tipobj.style.left = curX+offsetxpoint+"px";
			}
			
			
			if (bottomedge<tipobj.offsetHeight) {
				var d = (Browser.ua == 'safari') ? 0 : window.pageYOffset;
				tipobj.style.top = (Browser.ua.indexOf('ie')>=0)? 
					Event.pointerY(event)-tipobj.offsetHeight-offsetypoint+"px" : Event.pointerY(event)-tipobj.offsetHeight-offsetypoint+"px";
			} else {
				tipobj.style.top=curY+offsetypoint+"px";
			}

		}
	}
	
	this.hide = function(){
		clearTimeout(autoHide);
		Event.stopObserving(document, 'ousemove', positiontip);
		enabletip=false;
		Element.hide(tipobj);
	};
	
	this.display(node, txt, w, align);
};
function loginPath() {
	return 'http://blog.sohu.com/login/logon.do?bru=' + encodeURIComponent(location.href);
}
