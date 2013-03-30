/******* bj2008 Olympic Attention Game Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-11
//	Last Update: 2008-07-23
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_atteGame = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget 内容展示部分需要填充的对象列表
	var elmOutput = null;	// 内容输出容器
	var elmOutputE = null; 	// 编辑输出容器
	var blogHost = 'http://'+window.location.host;
	var infoHost = 'http://info.2008.sohu.com'; 	// 数据所在域
	
	var spId = '';	// 比赛项目ID
	var spName = ''; 	// 比赛项目名称
	
	var spArray=[
		{"id":"BB","name":"[B]棒球"},
		{"id":"GT","name":"[B]蹦床"},
		{"id":"CT","name":"[C]场地自行车"},
		{"id":"SA","name":"[F]帆船"},
		{"id":"CR","name":"[G]公路自行车"},
		{"id":"SY","name":"[H]花样游泳"},
		{"id":"GA","name":"[J]竞技体操"},    
		{"id":"FE","name":"[J]击剑"},
		{"id":"WL","name":"[J]举重"},
		{"id":"BK","name":"[L]篮球"},
		{"id":"SO","name":"[L]垒球"},
		{"id":"EQ","name":"[M]马术"},
		{"id":"VO","name":"[P]排球"},
		{"id":"CS","name":"[P]皮划艇激流回旋"},
		{"id":"CF","name":"[P]皮划艇静水"},	
		{"id":"TT","name":"[P]乒乓球"},	
		{"id":"HO","name":"[Q]曲棍球"},	
		{"id":"BX","name":"[Q]拳击"},	
		{"id":"JU","name":"[R]柔道"},
		{"id":"CM","name":"[S]山地自行车"},	
		{"id":"RO","name":"[S]赛艇"},
		{"id":"BV","name":"[S]沙滩排球"},
		{"id":"SH","name":"[S]射击"},
		{"id":"AR","name":"[S]射箭"},
		{"id":"HB","name":"[S]手球"},
		{"id":"WR","name":"[S]摔跤"},
		{"id":"WP","name":"[S]水球"},
		{"id":"TK","name":"[T]跆拳道"},
		{"id":"AT","name":"[T]田径"},
		{"id":"DV","name":"[T]跳水"},
		{"id":"TR","name":"[T]铁人三项"},
		{"id":"TE","name":"[W]网球"},
		{"id":"MP","name":"[X]现代五项"},
		{"id":"CB","name":"[X]小轮车"},
		{"id":"GR","name":"[Y]艺术体操"},
		{"id":"SW","name":"[Y]游泳"},
		{"id":"BD","name":"[Y]羽毛球"},
		{"id":"FB","name":"[Z]足球"}];
	
	// 初始化比赛项目ID和明星ID
	if (m_data) {
		spId = m_data.spId || '';
		spName = m_data.spName || '';
	}
	else{
		if(!window.o_atteGame_isFirstMod){
			spId = 'BK';
			spName = '篮球';
			window.o_atteGame_isFirstMod = true;
		}
	};
	
	m_content = $(m_content);
	m_edit = $(m_edit);
	
	// Widget 初始化
	this.initialize = function() {
		this.loaded();
		this.build();
	};
	
	// 销毁widget
	this.destroy = function() {
		if (elmOutput) {
			elmOutput.remove();
		}
	};
	// Widget 设置方法
	this.edit = function() {
		this.buildEdit();
	};
	
	this.refresh = function() {
		this.build(true);
		this.loaded();
	};
	// 构建设置里面的项
	this.buildEdit = function() {
		if(elmOutputE)
			return;
		elmOutputE = new Element('div');
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="60px">选择项目: </td>';
		str += '<td><select name="spId"><option value="0">'+ App.Lang.loading +'</option></select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';

		m_edit.appendChild(elmOutputE.update(str));
		
		// 这里使用这种方式获取对象，是为了避免使用 ID 重复
		this.spIdIpt = $(elmOutputE.firstChild.rows[0].cells[1].firstChild);

		this.saveBtn = $(elmOutputE.firstChild.rows[1].cells[1].firstChild);
		this.saveBtn.observe('click', this.saveData.bindAsEventListener(this));
		
		setTimeout(this.showSpList.bind(this), 10);
	};
	/*
	// 获取比赛项目列表
	this.getSpList = function(){
		var url = blogHost+'/olympic/common/discipline.json?ts='+(new Date()).getTime();
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showSpList.bind(this),
				onFailure: this.noData.bind(this,this.spIdIpt,'<option>暂无法获取项目列表</option>')
			}
		);
	};
	*/
	// 显示比赛项目列表
	this.showSpList = function(transport){
		var result = $A(spArray);
		var str = '<select name="spId">';
		str += this.buildSlctOpt(result,spId);
		str += '</select>';
		var tmpElm = this.spIdIpt.up('td');
		tmpElm.innerHTML = str;
		this.spIdIpt = tmpElm.down('select');
	};
	// 给定数组源和选定值，构建下拉框的项
	this.buildSlctOpt = function(sArray,selectedId){
		var str ='';
		if(sArray.length == 0)
			str += '<option value="0">没有项</option>';
		else{
			sArray.each(function(it){
				if(it.id){
					if (it.id == selectedId) {
						str += '<option value="'+ it.id +'" selected="selected">'+ it.name.unescapeHTML() +'</option>';
					} else {
						str += '<option value="'+ it.id +'">'+ it.name.unescapeHTML() +'</option>';
					}
				}
			});
		}
		return str;
	};
	
	// 保存用户设置
	this.saveData = function() {
		if ((!$F(this.spIdIpt) || $F(this.spIdIpt) == 0)) {
			this.closeEdit();
			return;
		}
		if (spId == $F(this.spIdIpt)) {
			this.closeEdit();
			return;
		}
		
		spId = $F(this.spIdIpt);
		spName = this.spIdIpt.options[this.spIdIpt.selectedIndex].text;
		spName = spName.substring(spName.indexOf(']')+1,spName.length);
		
		// 保存的时候不仅保存项目ID和明星ID，还保存了项目名称和明星名称
		// 因为需要用明星名称获取媒体报道和相关博文
		var data = {
			spId: spId,
			spName: spName
		}
		this.save(data);
		this.build();
	};
	
	// 构建 Widget 展示内容
	this.build = function(nocache) {
		this.destroy();
		elmOutput = new Element('div');
		m_content.innerHTML = '';
		if (!spId) {
			elmOutput.innerHTML = '您可以使用此模块，来及时了解您关注的比赛项目。<br /><br />请点击此模块右上角的“设置”，选择您要关注的比赛项目。';
			m_content.appendChild(elmOutput);
		}
		else {
			var str='<div class="attGame-content">'+
				    '<div class="adBanner">Beijing2008奥运会</div>'+
				    '<div class="attGame_tp_bg"></div>'+
				    '<div class="rank">'+
				      '<div class="gameContent">'+
					  	'<div class="gameIcon">'+
				            '<a id="gameIconLink" class="gameIconLink" href="#" target="_blank"><img id="gameIconImg" class="gameIconImg" src="" alt="" /></a>'+
				        '</div>'+
				        '<div class="gameInfo">'+
				            '<h2><a id="gameNameLink" href="#" target="_blank" class="gameNameLink"><span id="gameNameText" class="red gameNameText">'+spName+'</span></a></h2>'+
				            '<div><a id="gameDescLink" class="gameDescLink" href="#" target="_blank">比赛项目介绍</a></div>'+
				        '</div>'+
				       '</div>'+
				       '<div style="clear:both"></div>'+
				       '<div id="gameCalendar" class="artList gameCalendar" >'+
				          	'<table width="100%" border="0" cellspacing="1" cellpadding="0">'+
				              '<thead><tr><td colspan="7" align="center"><strong>2008年8月</strong></td></tr></thead>'+
				              '<tbody>'+
				              '<tr>'+
				                '<td align="center">日</td>'+
				                '<td align="center">一</td>'+
				                '<td align="center">二</td>'+
				                '<td align="center">三</td>'+
				                '<td align="center">四</td>'+
				                '<td align="center">五</td>'+
				                '<td align="center">六</td>'+
				              '</tr>'+
				              '<tr>'+
				                '<td align="center"><span class="grey">27</span></td>'+
				                '<td align="center"><span class="grey">28</span></td>'+
				                '<td align="center"><span class="grey">29</span></td>'+
				                '<td align="center"><span class="grey">30</span></td>'+
				                '<td align="center"><span class="grey">31</span></td>'+
				                '<td class="c_d_1" align="center">1</td>'+
				                '<td class="c_d_2" align="center">2</td>'+
				              '</tr>'+
				              '<tr>'+
				                '<td class="c_d_3" align="center">3</td>'+
				                '<td class="c_d_4" align="center">4</td>'+
				                '<td class="c_d_5" align="center">5</td>'+
				                '<td class="c_d_6" align="center">6</td>'+
				                '<td class="c_d_7" align="center">7</td>'+
				                '<td class="c_d_8" align="center">8</td>'+
				                '<td class="c_d_9" align="center">9</td>'+
				              '</tr>'+
				              '<tr>'+
				                '<td class="c_d_10" align="center">10</td>'+
				                '<td class="c_d_11" align="center">11</td>'+
				                '<td class="c_d_12" align="center">12</td>'+
				                '<td class="c_d_13" align="center">13</td>'+
				                '<td class="c_d_14" align="center">14</td>'+
				                '<td class="c_d_15" align="center">15</td>'+
				                '<td class="c_d_16" align="center">16</td>'+
				              '</tr>'+
				              '<tr>'+
				                '<td class="c_d_17" align="center">17</td>'+
				                '<td class="c_d_18" align="center">18</td>'+
				                '<td class="c_d_19" align="center">19</td>'+
				                '<td class="c_d_20" align="center">20</td>'+
				                '<td class="c_d_21" align="center">21</td>'+
				                '<td class="c_d_22" align="center">22</td>'+
				                '<td class="c_d_23" align="center">23</td>'+
				              '</tr>'+
				              '<tr>'+
				                '<td class="c_d_24" align="center">24</td>'+
				                '<td class="c_d_25" align="center">25</td>'+
				                '<td class="c_d_26" align="center">26</td>'+
				                '<td class="c_d_27" align="center">27</td>'+
				                '<td class="c_d_28" align="center">28</td>'+
				                '<td class="c_d_29" align="center">29</td>'+
				                '<td class="c_d_30" align="center">30</td>'+
				              '</tr>'+
				              '<tr>'+
				                '<td class="c_d_31" align="center">31</td>'+
				                '<td align="center"><span class="grey">1</span></td>'+
				                '<td align="center"><span class="grey">2</span></td>'+
				                '<td align="center"><span class="grey">3</span></td>'+
				                '<td align="center"><span class="grey">4</span></td>'+
				                '<td align="center"><span class="grey">5</span></td>'+
				                '<td align="center"><span class="grey">6</span></td>'+
				              '</tr>'+
				              '<tbody>'+
				            '</table>'+
				        '</div>'+
				        '<div class="artList">'+
				        	'<h4>搜狐报道：</h4>'+
				          '<ul id="gMediaReport" class="gMediaReport">'+
				           		App.Lang.loading +
				          '</ul>'+
				            '<p align="right" style="display:none;" ><a id="gMoreMReport"  class="gMoreMReport" href="#" target="_blank">查看更多>></a></p>'+
				        '</div>'+
				        '<br />'+
				        '</div>';
			if(!App.Permit.editModule)  {
				str +=	'<div class="attGame_bm_bg">'+
				'<a href="http://blog.sohu.com/manage/module.do?m=preview&type=o_atteGame" target="_blank">添加到我的博客</a>';
				}
		else
				str +=	'<div class="attGame_bm_s_bg">';
				
				str +=  '</div>'+
					'</div>';
			m_content.appendChild(elmOutput.update(str));
			this.initEles();
			this.setTitle('我关注的赛事', true);
			this.showSIfo();
			setTimeout(this.getCal.bind(this), 10);//this.getCal();
			setTimeout(this.getMRpt.bind(this), 10);//this.getMRpt();
		}
	};
	
	// 获取所有需要回填数据的对象
	this.initEles = function(){
		//if(!eles){
			eles = {
				game:{
					iconLink : elmOutput.select('a.gameIconLink')[0],
					iconImg : elmOutput.select('img.gameIconImg')[0],
					nameLink : elmOutput.select('a.gameNameLink')[0],
					nameText : elmOutput.select('span.gameNameText')[0],
					descLink : elmOutput.select('a.gameDescLink')[0]
				},
				mediaRpt : elmOutput.select('ul.gMediaReport')[0],
				moreMRpt : elmOutput.select('a.gMoreMReport')[0]
			}
		//}
	};
	
	// 获取【i[0-9].itc.cn】随机域名
	this.getItc = function(){
		return 'http://i'+Math.floor(Math.random()*10)+'.itc.cn'; //'http://info.2008.sohu.com';//;
	};
	// 显示赛事基本信息
	this.showSIfo = function(){
		var gameIconImg = this.getItc()+'/olympic/public_images/logo/'+spId+'.gif';
		var gameIconLink = infoHost + '/Global/BCK/'+spId+'.shtml';
		
		eles.game.iconImg.writeAttribute('src',gameIconImg);
		eles.game.iconLink.writeAttribute('href',gameIconLink).writeAttribute('alt',spName).writeAttribute('title',spName);
		eles.game.nameLink.writeAttribute('href',gameIconLink) ;
		eles.game.descLink.writeAttribute('href',gameIconLink);
	};
	
	// 获取赛事日程
	this.getCal = function(){
		var url = blogHost+'/olympic/schedule2/summary_'+spId+'.json?ts='+(new Date()).getTime();
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showCal.bind(this)//,
				//onFailure: this.noData.bind(this,$('gameCalendar'),'暂无法获取赛事日程')
			}
		);
	};
	
	// 显示赛事日程
	this.showCal = function(transport){
		var calList = eval("(" + transport.responseText + ")");
		for(it in calList){
     		var day = Math.floor(it.substring(6,8));
     		elmOutput.select('td.c_d_'+day)[0].innerHTML = '<a target ="_blank" title="点击查看今日比赛" alt="点击查看今日比赛" href="' + infoHost + '/Schedule/' + spId + '.shtml#'+it+'" class="active">'+ day +'</a>';
     	}
	};
	
	// 获取媒体报道
	this.getMRpt = function(){
		var url = blogHost+'/olympic/common/'+ spId +'_news.json?ts='+(new Date()).getTime();
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showMRpt.bind(this),
				onFailure: this.noData.bind(this,eles.mediaRpt,'暂无法获取媒体报道')
			}
		);
	};
	
	// 显示明星媒体报道
	this.showMRpt = function(transport){
		var news = eval("(" + transport.responseText + ")");
		var newsList = news.news;
		var moreLink = news.more;
		var str='暂时没有相关媒体报道';
		if(newsList.length > 0){
			str='';
			for(var i = 0 ; i< newsList.length ; i++)
				str += '<li><a target="_blank" href="'+newsList[i].href+'" alt="'+newsList[i].title+'" title="'+newsList[i].title+'">'+newsList[i].title+'</a></li>';		
			eles.moreMRpt.writeAttribute('href',moreLink).up('p').show();
		}
		eles.mediaRpt.update(str);
		
	};
	
	this.noData = function(ele,msg){
		ele.update(msg);
	};
};
registerWidget('o_atteGame');