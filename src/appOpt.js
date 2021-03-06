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