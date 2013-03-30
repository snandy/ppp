/**
 * 有关职位的数据及展示方法等
 * @author Springwang
 * 
 * @base element.Select prototype(1.6)
 **/

var Job = {
	/**
	 * 职位数据
	 */
	data: {
		industry: {
			"1":"计算机硬件及网络设备","2":"计算机软件","3":"IT服务（系统/数据/维护）/多领域经营","4":"互联网/电子商务","5":"网络游戏","6":"通讯（设备/运营/增值服务","7":"电子技术/半导体/集成电路","8":"仪器仪表及工业自动化","9":"金融/银行/投资/基金/证券","10":"保险","11":"房地产/建筑/建材/工程","12":"家居/室内设计/装饰装潢","13":"物业管理/商业中心","14":"广告/会展/公关/市场推广","15":"媒体/出版/影视/文化/艺术","16":"印刷/包装/造纸","17":"咨询/管理产业/法律/财会","18":"教育/培训","19":"检验/检测/认证","20":"中介服务","21":"贸易/进出口","22":"零售/批发","23":"快速消费品（食品/饮料/烟酒/化妆品）","24":"耐用消费品（服装服饰/纺织/皮革/家具/家电）","25":"办公用品及设备","26":"礼品/玩具/工艺美术/收藏品","27":"大型设备/机电设备/重工业","28":"加工制造（原料加工/模具）","29":"汽车/摩托车（制造/维护/配件/销售/服务","30":"交通/运输/物流","31":"医药/生物工程","32":"医疗/护理/美容/保健","33":"医疗设备/器械","34":"酒店/餐饮","35":"娱乐/体育/休闲","36":"旅游/度假","37":"石油/石化/化工","38":"能源/矿产/采掘/冶炼","39":"电气/电力/水利","40":"航空/航天","41":"学术/科研","42":"政府/公共事业/非盈利机构","43":"环保","44":"农/林/牧/渔","45":"跨领域经营","46":"其它"
		},
		category: {
			"1":"销售","2":"市场/市场拓展/公关","3":"商务/采购/贸易","4":"计算机软、硬件/互联网/IT","5":"电子/半导体/仪表仪器","6":"通信技术","7":"客户服务/技术支持","8":"行政/后勤","9":"人力资源","10":"高级管理", "11":"生产/加工/制造","12":"质控/安检","13":"工程机械","14":"技工","15":"财会/审计/统计","16": "金融/银行/保险/证券/投资","17":"建筑/房地产/装修/物业","18":"交通/仓储/物流","19":"普通劳动力/家政服务", "20":"零售业","21":"教育/培训","22":"咨询/顾问","23":"学术/科研","24":"法律","25":"美术/设计/ 创意","26":"编辑/文案/传媒/影视/新闻","27":"酒店/餐饮/旅游/娱乐","28":"化工","29":"能源/矿产/地质勘查 ","30":"医疗/护理/保健/美容","31":"生物/制药/医疗器械","32":"翻译（口译与笔译）","33":"公务员","34": "环境科学/环保","35":"农/林/牧/渔业","36":"兼职/临时/培训生/储备干部","37":"在校学生","38":"其他"
		},
		name: {
			"1":{"1":"销售总监","2":"销售经理","3":"区域销售经理","4":"销售主管","5":"销售工程师","6":"销售代表","7":"销售助理","8":"医药销售代表","9":"电话销售","10":"渠道/分销管理","11":"渠道/分销专员", "12":"经销商","13":"客户经理/主管","14":"客户代表","15":"其他"},
			"2":{"16":"市场总监/经理 /主管","17":"市场营销经理/主管","18":"市场营销专员/助理","19":"市场策划/企划","20":"市场调研与分析", "21":"市场专员/市场助理","22":"市场拓展","23":"公关经理/主管","24":"公关专员","25":"媒介经理/主管", "26":"媒介专员/媒介购买","27":"促销督导","28":"产品?品牌经理/产品?品牌主管","29":"产品/品牌专员","30": "会务专员","31":"其他"},
			"3":{"32":"商务经理/主管","33":"商务专员/助理","34":"采购经理/主管 ","35":"采购专员/助理","36":"外贸?贸易经理/外贸?贸易主管","37":"外贸/贸易专员","38":"业务跟单","39": "报关员","40":"其他"},
			"4":{"41":"首席技术官CTO/首席信息官CIO","42":"技术总监/经理","43": "高级软件工程师","44":"软件工程师","45":"高级硬件工程师","46":"硬件工程师","47":"软件测试","48":"硬件测试","49":"网站运营管理","50":"系统管理员","51":"网络管理员","52":"互联网软件开发工程师","53":"网络工程师 ","54":"网络与信息安全工程师","55":"信息技术经理/主管","56":"信息技术专员","57":"网页设计/制作","58":" 网站编辑","59":"游戏设计/开发","60":"技术支持/维护经理","61":"技术支持/维护工程师","62":"质量工程师", "63":"系统工程师","64":"系统分析师/架构师","65":"数据库开发工程师","66":"数据库管理员","67":"ERP技术/ 开发应用","68":"研发工程师","69":"项目经理/主管","70":"产品经理/主管","71":"语音/视频/图形","72":"其他"},
			"5":{"73":"电子/电气工程师","74":"电子元器件工程师","75":"电路工程师/技术员","76":"电池/ 电源开发","77":"设备工程师（调试/安装/维护）","78":"音频/视频工程师/技术员 ","79":"家用电器/数码产品研发","80":"电子/电器维修","81":"机电工程师","82":"自动化工程师","83":"集成电路IC设计/应用工程师","84":"IC验证工程师","85":"激光/光电子技术","86":"半导体技术","87":"模拟电路设计/应用工程师","88":"嵌入式硬件/软件工程师","89":"无线电工程师","90":"版图设计工程师","91":"仪器/仪表/计量", "92":"FAE现场应用工程师","93":"产品工艺/规划/制程工程师","94":"项目经理/产品经理","95":"测试工程师", "96":"其他"},
			"6":{"97":"通信技术工程师","98":"有线传输工程师","99":"无线通信工程师","100": "电信交换工程师","101":"数据通信工程师","102":"移动通信工程师","103":"电信网络工程师","104":"通信电源工程师 ","105":"其他"},
			"7":{"106":"客户服务总监","107":"客户服务经理/主管","108":"客户服务专员/助理","109":"客户咨询热线/呼叫中心人员","110":"客户协调","111":"售前/售后技术支持管理","112":"售前/售后技术支持工程师","113":"其他"},
			"8":{"114":"行政总监","115":"行政经理/主管/办公室主任","116":"行政专员/助理","117":"经理助理/秘书/文员","118":"前台/总机/接待","119":"图书/资料/档案管理","120":"后勤 ","121":"其他"},
			"9":{"122":"人力资源总监","123":"人力资源经理/主管","124":"人力资源专员/助理","125":"招聘经理/主管","126":"招聘专员/助理","127":"培训经理/主管","128":"培训专员/助理/培训师", "129":"薪酬福利/绩效考核/员工关系","130":"猎头顾问/助理","131":"其他"},
			"10":{"132":"首席执行官CEO/总裁/总经理","133":"首席技术官CTO/首席信息官CIO","134":"首席运营官COO","135":"首席财务官 CFO","136":"副总裁/副总经理","137":"分公司/分支机构/办事处经理","138":"总裁助理/总经理助理","139":"合伙人","140":"总监","141":"其他"},
			"11":{"142":"工厂厂长/副厂长","143":"项目经理/主管", "144":"项目工程师","145":"生产主管/督导/组长","146":"生产经理/车间主任","147":"质量管理","148":"设备管理","149":"化验/检验","150":"仓库物料","151":"采购管理","152":"产品开发/技术或工艺","153":"维修工程师","154":"工业工程师","155":"制造工程师","156":"其他"},
			"12":{"157":"质量管理/测试经理(QA/QC经理)","158":"质量管理/测试主管(QA/QC主管)","159":"质量管理/测试工程师(QA/QC工程师)", "160":"质量检验员/测试员","161":"认证工程师/审核员","162":"供应商/采购设备与材料质量管理","163":"安全管理 ","164":"其他"},
			"13":{"165":"工程机械经理","166":"工程机械主管","167":"机械工程师","168":"机械设计师","169":"机械制图员","170":"技术文档工程师","171":"其他"},
			"14":{"172":"汽车修理工/机修工","173":"电工/电焊工/铆焊工","174":"钳工/钣工","175":"车床/磨床/铣床/冲床工 ","176":"空调工/电梯工/锅炉工","177":"铲车/叉车工","178":"水工/木工/油漆工","179":"模具工", "180":"普工","181":"其他"},
			"15":{"182":"首席财务官CFO","183":"财务总监","184":"财务经理","185":"财务主管/总帐主管","186":"财务分析经理/主管","187":"财务分析员","188":"财务/会计助理", "189":"财务/出纳员","190":"会计经理/主管","191":"会计","192":"审计经理/主管","193":"审计专员/助理 ","194":"统计员","195":"税务经理/主管","196":"税务专员/助理","197":"成本经理/主管","198":"其他 "},
			"16":{"199":"融资总监","200":"融资经理/融资主管/专员","201":"风险管理/控制/稽查", "202":"信贷管理/资信评估","203":"银行经理/主任","204":"银行会计/柜员","205":"保险代理/经纪人/业务员", "206":"保险精算/产品研发","207":"核保理赔","208":"储备经理人","209":"证券总监/部门经理","210":"证券 /期货/外汇经纪人","211":"外汇交易/基金/国债经理人","212":"投资/理财顾问","213":"客户经理/主管","214":" 客户服务","215":"其他"},
			"17":{"216":"土建工程管理/项目经理","217":"高级建筑工程师/总工", "218":"工程监理/质量工程师","219":"建筑师/土建工程师","220":"结构工程师","221":"给排水工程/暖通/制冷工程 ","222":"造价师/预算师","223":"施工员","224":"房地产开发/策划/评估","225":"房地产中介/交易", "226":"城市规划/景观设计","227":"室内外装潢设计","228":"物业经理/主管","229":"物业管理专员/助理", "230":"物业招商/租赁/租售","231":"物业维修","232":"智能大厦/综合布线/弱电","233":"其他"},
			"18":{"234":"运输经理/主管","235":"调度员","236":"快递员/速递员","237":"司机","238":"仓库经理/主管 ","239":"仓库管理员","240":"物流经理/主管","241":"物流专员/助理","242":"海运/空运操作人员","243": "其他"},
			"19":{"244":"保安保洁","245":"家政人员","246":"普工","247":"其他"},
			"20":{"248":"店长/卖场经理","249":"店员/营业员/导购员","250":"收银员","251":"理货员/陈列员","252":"兼职店员","253":"促销专员/导购","254":"其他"},
			"21":{"255":"教授/讲师/助教","256":"教师","257":"教学/教务管理人员","258":"教育产品开发","259":"家教","260":"教练","261":"幼教","262":"其他"},
			"22":{"263":"咨询总监","264":"咨询经理/主管","265":"咨询员","266":"培训师","267":"专业顾问","268":"情报信息分析","269":"其他"},
			"23":{"270":"科研管理人员","271":"科研人员","272":"其他"},
			"24":{"273":"法律部经理/主任","274":"律师/律师助理","275":"法律顾问","276":"法务人员","277":"产权/专利顾问/专业代理","278":"其他"},
			"25":{"279":"设计管理人员","280":"创意指导/总监","281":"美术编辑/美术设计","282":"平面设计","283":"产品/包装设计","284":"多媒体/动画设计","285":"工艺品/珠宝设计","286":"家具设计","287":"服装设计", "288":"展示/装潢设计","289":"其他"},
			"26":{"290":"总编/副总编/主编","291":"编辑/作家/撰稿人","292":"文案/策划","293":"艺术/设计","294":"排版设计/完稿","295":"校对/录入","296":"出版/印刷/发行","297":"导演/编导/影视制作","298":"摄影师/记者","299":"主持人/演员/模特/配音","300":"经纪人 ","301":"后期制作/音效师","302":"化妆师/造型师/服装/道具","303":"其他"},
			"27":{"304":"酒店管理","305":"娱乐或餐饮管理","306":"大堂经理/领班","307":"前厅接待/礼仪/迎宾","308":"厨师", "309":"调酒师","310":"营养师","311":"导游/票务","312":"服务员","313":"保安","314":"其他 "},
			"28":{"315":"化工工程师","316":"化学制剂研发","317":"化学操作","318":"化学分析","319":"化学技术","320":"其他"},
			"29":{"321":"石油天然气技术人员","322":"电力工程师/技术员","323":"空调/热能工程师","324":"核力/火力工程师","325":"地质勘查","326":"其他"},
			"30":{"327":"医疗管理人员","328":"医生/医师","329":"心理医生","330":"药库主任/药剂师","331":"护士/护理人员","332":"医药质检","333":"医药代表","334":"针灸推拿","335":"健身教练","336":"美容师/整形师 ","337":"宠物护理/兽医","338":"其他"},
			"31":{"339":"生物工程/生物制药","340":"药品生产/质量管理","341":"临床研究/协调","342":"医药研发/药品注册","343":"医疗器械推广","344":"医药代表","345":"其他"},
			"32":{"346":"英语类","347":"日语类","348":"德语类","349":"法语类","350":"俄语类","351":"韩语类","352":"其他语种类"},
			"33":{"353":"公务员","354":"其他"},
			"34":{"355":"环境管理/保护","356":"环境工程技术/园林景区","357":"环保技术","358":"其他"},
			"35":{"359":"农/林/牧/渔业","360":"其他"},
			"36":{"361":"兼职/临时","362":"培训生","363":"储备干部","364":"其他"},
			"37":{"365":"应届毕业生","366":"非应届毕业生/实习生","367":"其他"},
			"38":{"368":"航空航天","369":"测绘技术","370":"安全消防","371":"气象","372":"声光学技术/激光技术","373":"其他"}
		}
	},

	/**
	 * 绑定职位类别下拉选择框
	 * @param {Object} cate 职位类别的设置数据（必填项），其为一个对象，其中包括如下配置属性：
	 * 		ele: select对象（必填项）
	 * 		opt: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
	 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
	 * @param {Object} name 市的设置数据（可选项），其为一个对象，其中包括如下配置属性：
	 * 		ele: select对象（必填项）
	 * 		opt: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
	 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
	 * @type Area
	 * @return 返回当前对象
	 */
	bindSelector: function(cate, name,idst) {
		this.bindCategory(cate);
		if (name) {
			this.onChangeCate(name, cate.ele);
			Event.observe(cate.ele, "change", this.onChangeCate.bind(this, Object.extend(Object.clone(name), {val: 0}), cate.ele));
		}
		if(idst)
			this.bindIndustry(idst);
		return this;
	},
	
	/**
	 * 绑定行业类别下拉选择框
	 * @param {Object} cate 行业类别的设置数据（必填项），其为一个对象，其中包括如下配置属性：
	 * 		ele: select对象（必填项）
	 * 		opt: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
	 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
	 */
	bindIndustry: function(idst) {
		var sel = new Select(idst.ele);
		if(idst.val =='')
			idst.val = 0;
		sel.clear()
			.addObj(idst.opt || {"0": "选择行业类别"})
			.addObj(this.data.industry)
			.value(idst.val);
		sel.destroy();
	},
	
	/**
	 * 绑定职位类别下拉选择框
	 * @param {Object} cate 职位类别的设置数据（必填项），其为一个对象，其中包括如下配置属性：
	 * 		ele: select对象（必填项）
	 * 		opt: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
	 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
	 */
	bindCategory: function(cate) {
		var sel = new Select(cate.ele);
		if(cate.val =='')
			cate.val = 0;
		sel.clear()
			.addObj(cate.opt || {"0": "选择职位类别"})
			.addObj(this.data.category)
			.value(cate.val);
		sel.destroy();
	},
	
	/**
	 * 当职位类别变更时调用的方法，用来更新职位名称列表
	 * @param {Object} name 市的设置数据（必填项），其为一个对象，其中包括如下配置属性：
	 * 		ele: select对象（必填项）
	 * 		opt: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
	 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
	 * @param {Element} ele 职位类别element对象（必填项）
	 */
	onChangeCate: function(name, ele) {
		var sel = new Select(name.ele);
		if(name.val =='')
			name.val = 0;
		sel.clear()
			.addObj(name.opt || {"0": "选择职位名称"});
		var el = $(ele);
		var data;		//	用于存储当前职位类别的市列表
		if (el && (data = this.data.name[el.value])) {
			sel.addObj(data)
				.value(name.val)
				.disable(false);
		}
		else
			sel.disable(true);
		sel.destroy();
	},
	
	/**
	 * 获取指定职位类别ID的和职位名称ID所对应的名称
	 * @param {String} cateId 职位类别ID （必填项）
	 * @param {String} nameId 职位名称ID 
	 */
	getCateName: function(cateId,nameId){
		return [this.data.category[cateId],this.data.name[cateId][nameId]];
	},
	
	/**
	 * 获取指定行业类别
	 * @param {String} idstId 职位类别ID （必填项）
	 */
	getIndustry: function(idstId){
		return this.data.industry[idstId];
	}
	
}