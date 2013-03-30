/******* bj2008 Olympic Game Attention Star Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-10
//	Last Update: 2008-07-23
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_atteStar = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget 内容展示部分需要填充的对象列表
	var elmOutput = null;	// 内容输出容器
	var elmOutputE = null; 	// 编辑输出容器
	var blogHost = 'http://'+window.location.host;
	var infoHost = 'http://info.2008.sohu.com'; 	// 数据所在域
	var blogTagHost = 'http://tag.blog.sohu.com';
	
	var spId = '';	// 比赛项目ID
	var spName = ''; 	// 比赛项目名称
	var stId = '';	// 明星ID
	var stName = ''; 	// 明星姓名
	
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
		stId = m_data.stId || '';
		stName = m_data.stName || '';
	}else{
		if(!window.o_atteStar_isFirstMod){
			spId = 'AT';
			spName = '田径';
			stId = '123';
			stName = '刘翔';
			window.o_atteStar_isFirstMod = true;
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
		str += '<td>选择明星: </td>';
		str += '<td><select name="stId"><option value="0">'+ App.Lang.loading +'</option></select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';

		m_edit.appendChild(elmOutputE.update(str));
		
		// 这里使用这种方式获取对象，是为了避免使用 ID 重复
		this.spIdIpt = $(elmOutputE.firstChild.rows[0].cells[1].firstChild);
		this.stIdIpt = $(elmOutputE.firstChild.rows[1].cells[1].firstChild);
		
		this.saveBtn = $(elmOutputE.firstChild.rows[2].cells[1].firstChild);
		this.saveBtn.observe('click', this.saveData.bindAsEventListener(this));
		
		setTimeout(this.showSpList.bind(this), 10);
	};
	
	// 显示比赛项目列表
	this.showSpList = function(transport){
		var result = $A(spArray);
		var str = '<select name="spId">';
		str += this.buildSlctOpt(result,spId);
		str += '</select>';
		var tmpElm = this.spIdIpt.up('td');
		tmpElm.innerHTML = str;
		this.spIdIpt = tmpElm.down('select');
		this.spIdIpt.observe('change',this.showStList.bind(this));
		this.showStList();
	};
	
	// 获取指定比赛项目对应的明星列表
	this.getStList = function(){
		if(!window.o_atteStar_spst){
			var url = blogHost+'/olympic/common/disstar.json?ts='+(new Date()).getTime();
			new Ajax.Request(
				url,
				{
					method:'get',
					onSuccess: this.buildFlagList.bind(this),
					onFailure: this.noData.bind(this,this.stIdIpt,'<option>暂无法获取明星列表</option>')
				}
			);
		}
		else
			this.getSIfo();
	};
	// 显示明星列表
	this.showStList = function(){
		var result = $A(eval("(" + window.o_atteStar_spst.responseText + ")")[$F(this.spIdIpt)]); // 这里用spId
		var str = '<select name="stId">';
		str += this.buildSlctOpt(result,stId);
		str += '</select>';
		var tmpElm = this.stIdIpt.up('td');
		tmpElm.innerHTML = str;
		this.stIdIpt = tmpElm.down('select');
	};
	
	// 构建一个ID和flag的对应表
	this.buildFlagList = function(transport){
		window.o_atteStar_spst = transport;
		var stList = eval("(" + transport.responseText + ")");
		window.o_atteStar_flagList = {};
		for(st in stList){
			var it = stList[st];
			for(var i= 0; i< it.length ; i++ ){
				window.o_atteStar_flagList[it[i].id] = it[i].flag;
			}
		}
		this.getSIfo();
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
						str += '<option value="'+ it.id  +'" selected="selected">'+ it.name.unescapeHTML() +'</option>';
					} else {
						str += '<option value="'+ it.id  +'">'+ it.name.unescapeHTML() +'</option>';
					}
				}
			});
		}
		return str;
	};
	// 保存用户设置
	this.saveData = function() {
		if ((!$F(this.spIdIpt) || $F(this.spIdIpt) == 0) || (!$F(this.stIdIpt) || $F(this.stIdIpt) == 0)) {
			this.closeEdit();
			return;
		}
		if (spId == $F(this.spIdIpt) && stId == $F(this.stIdIpt)) {
			this.closeEdit();
			return;
		}
		
		spId = $F(this.spIdIpt);
		spName = this.spIdIpt.options[this.spIdIpt.selectedIndex].text;
		spName = spName.substring(spName.indexOf(']')+1,spName.length);
		stId = $F(this.stIdIpt);
		stName = this.stIdIpt.options[this.stIdIpt.selectedIndex].text;
		
		// 保存的时候不仅保存项目ID和明星ID，还保存了项目名称和明星名称
		// 因为需要用明星名称获取媒体报道和相关博文
		var data = {
			spId: spId,
			spName: spName,
			stId: stId,
			stName: stName
		}
		this.save(data);
		this.build();
	};
	
	// 构建 Widget 展示内容
	this.build = function(nocache) {
		this.destroy();
		elmOutput = new Element('div');
		m_content.innerHTML = '';
		if (!spId || !stId) {
			elmOutput.innerHTML = '您可以使用此模块，来及时了解您关注的奥运明星。<br /><br />请点击此模块右上角的“设置”，选择您要关注的明星。';
			m_content.appendChild(elmOutput);
		}
		else {
			var str='<div class="attStar-content">'+
				    '<div class="adBanner">Beijing2008奥运会</div>'+
				    '<div class="attStar_tp_bg"></div>'+
				    '<div class="rank">'+
				      '<div class="starContent clearfix">'+
					  	'<div class="starIcon">'+
				            '<a class="starIconLink" href="#" target="_blank" ><img class="starIconImg" src="" alt="" /></a>'+
				        '</div>'+
				        '<div class="starInfo">'+
				            '<h2><a class="starNameLink" href="#" target="_blank"><span class="red starNameText">'+stName+'</span></a><a class="starCountryLink" href="#" target="_blank" ><img class="starCountryImg" src=""/></a></h2>'+
				            '<div><img align="absmiddle" src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/ico_profile.gif" /> <a class="starProfileLink" href="#" target="_blank"></a></div>'+
				            '<div>'+
				            	'<a class="starGMedalLink" href="#" target="_blank"><img  class="starGMedalImg"  align="absmiddle" src="http://js1.pp.sohu.com.cn/ppp/blog/widgets/o_atteStar/images/ico_medal_gold.gif" alt="金牌" title="金牌" /></a><span  class="starGMedalCount">(0)</span>'+
				            	'<a class="starSMedalLink" href="#" target="_blank"><img class="starSMedalImg" align="absmiddle" src="http://js1.pp.sohu.com.cn/ppp/blog/widgets/o_atteStar/images/ico_medal_silver.gif" alt="银牌" title="银牌" /></a><span class="starSMedalCount">(0)</span>'+
				            	'<a class="starBMedalLink" href="#" target="_blank"><img class="starBMedalImg" align="absmiddle" src="http://js1.pp.sohu.com.cn/ppp/blog/widgets/o_atteStar/images/ico_medal_bronze.gif" alt="铜牌" title="铜牌" /></a><span class="starBMedalCount">(0)</span>'+
				            '</div>'+
				        '</div>'+
				       '</div>'+
				        '<div class="nearly">'+
				          '<h4>即将开赛：</h4>'+
				            '<span class="starGames">暂无内容</span>'+
				      '</div>'+
				        '<div class="artList">'+
				        	'<h4>搜狐报道：</h4>'+
				          '<ul class="sMediaReport">'+
				          '</ul>'+
				            '<p align="right" style="display:none;" ><a class="sMoreMReport" href="#" target="_blank">查看更多>></a></p>'+
				        '</div>'+
				        '<div class="artList">'+
				        	'<h4>博友热文：</h4>'+
				          '<ul class="sBlogArticle" >'+ App.Lang.loading +'</ul>'+
				            '<p align="right" style="display:none;" ><a class="sMoreBArticle" href="#" target="_blank">查看更多>></a></p>'+
				        '</div>'+
				        '<div class="joinguess">'+
				          	'<a href="#" target="_blank" class="btn_joinguess writeStarLink">写下我心中的'+stName+'<span>写下我心中的'+stName+'</span></a>'+
				        '</div>'+
				        '</div>';
			if(!App.Permit.editModule)  {
				 str +=	'<div class="attStar_bm_bg">'+
				'<a href="http://blog.sohu.com/manage/module.do?m=preview&type=o_atteStar" target="_blank">添加到我的博客</a>';
				}
		else
				str +=	'<div class="attStar_bm_s_bg">';
				
				str +=  '</div>'+
					'</div>';
			m_content.appendChild(elmOutput.update(str));
			this.initEles();
			this.setTitle('我关注的明星', true);
			this.getStList();
		}
	};
	// 获取所有需要回填数据的对象
	this.initEles = function(){
		//if(!eles){
			eles = {
				star:{
					iconLink : elmOutput.select('a.starIconLink')[0],
					iconImg : elmOutput.select('img.starIconImg')[0],
					nameLink : elmOutput.select('a.starNameLink')[0],
					nameText : elmOutput.select('span.starNameText')[0],
					countryLink : elmOutput.select('a.starCountryLink')[0],
					countryImg : elmOutput.select('img.starCountryImg')[0],
					profileLink : elmOutput.select('a.starProfileLink')[0], 
					gMedalLink : elmOutput.select('a.starGMedalLink')[0], 
					sMedalLink : elmOutput.select('a.starSMedalLink')[0], 
					bMedalLink : elmOutput.select('a.starBMedalLink')[0], 
					gMedalCount : elmOutput.select('span.starGMedalCount')[0],
					sMedalCount : elmOutput.select('span.starSMedalCount')[0], 
					bMedalCount : elmOutput.select('span.starBMedalCount')[0], 
					games : elmOutput.select('span.starGames')[0]
				},
				mediaRpt : elmOutput.select('ul.sMediaReport')[0],
				moreMRpt : elmOutput.select('a.sMoreMReport')[0],
				blogAtc : elmOutput.select('ul.sBlogArticle')[0],
				moreBAtc : elmOutput.select('a.sMoreBArticle')[0],
				writeIt : elmOutput.select('a.writeStarLink')[0]
			}
		//}
	};
	
	// 获取明星基本信息
	this.getSIfo = function(){
		//alert(window.o_atteStar_flagList[stId]);
		var flag = window.o_atteStar_flagList[stId] == '0' ? 'athlete' : 'team';
		var url = blogHost+'/olympic/'+ flag +'/'+stId+'.json?ts='+(new Date()).getTime();
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showSIfo.bind(this),
				onFailure: this.noData.bind(this,eles.star.nameLink.up('div.starContent'),'暂无法获取明星信息')
			}
		);
	};
	// 获取【i[0-9].itc.cn】随机域名
	this.getItc = function(){
		return 'http://i'+Math.floor(Math.random()*10)+'.itc.cn'; //'http://info.2008.sohu.com';//;
	};
	// 显示明星基本信息
	this.showSIfo = function(transport){
		var result = eval("(" + transport.responseText + ")");
		var flag = result.flag == 0 ? 'Athlete' : 'Team';
		if(result.flag == 0)
			var starIconImg = this.getItc() + '/olympic/public_images/acr/'+result.starid%10+'/'+result.starid+'.gif';
		else
			var starIconImg = this.getItc() + '/olympic/public_images/logo/'+spId+'.gif';
		var profileLink = infoHost+'/Global/'+flag+'/'+result.starid+'.shtml';
		var countryLink = infoHost+'/Global/NOC/'+result.noc+'.shtml';
		var countryImg = this.getItc()+'/olympic/public_images/flags/small/'+result.noc+'.gif';
		var nocMedal = infoHost+'/Medal/NocMedal.shtml#'+result.noc;
		var medals = result.medal.split(',');
		setTimeout(function(){
			eles.star.iconImg.src = starIconImg ;
			if(result.flag == 1)
				eles.star.iconImg.up('div',0).className = 'teamIcon'; 
			eles.star.iconImg.style.display='none';
			eles.star.iconImg.style.display='';
			},10);
		setTimeout(function(){
			eles.star.countryImg.src = countryImg;
			eles.star.countryImg.style.display='none';
			eles.star.countryImg.style.display='';
			},20);
		//eles.star.iconImg.setAttribute('src',starIconImg) ;
		eles.star.iconLink.writeAttribute('href',profileLink).writeAttribute('alt',stName).writeAttribute('title',stName); ;
		eles.star.nameLink.writeAttribute('href',profileLink);
		eles.star.profileLink.update(stName+'小档案').writeAttribute('href',profileLink);
		//eles.star.countryImg.setAttribute('src',countryImg);
		eles.star.countryLink.writeAttribute('href',countryLink).writeAttribute('alt',result.nocname).writeAttribute('title',result.nocname);
		eles.star.gMedalLink.writeAttribute('href',nocMedal);
		eles.star.sMedalLink.writeAttribute('href',nocMedal);
		eles.star.bMedalLink.writeAttribute('href',nocMedal);
		if(medals[0]>0)
			eles.star.gMedalCount.update('('+medals[0]+')').show();
		if(medals[1]>0)
			eles.star.sMedalCount.update('('+medals[1]+')').show();
		if(medals[2]>0)
			eles.star.bMedalCount.update('('+medals[2]+')').show();
			
		// 对即将开赛的比赛按时间先后进行排序并且过滤掉已经过去的比赛项目
		if(result.schedule && result.schedule.length > 0 ){
			var str = '';
			var schedule = $A(result.schedule).sortBy(function(it){
				var days = Math.ceil(it.time.substring(3,5));
				var hours = Math.ceil(it.time.substring(6,8));
				var minutes =  Math.ceil(it.time.substring(9,11));
				it.timeStamp = (new Date(2008,8,days,hours,minutes)).getTime();
				return it.timeStamp;
			});
			var date = new Date();
			var time = (new Date(2008,8,date.getDate(),date.getHours(),date.getMinutes())).getTime();
			schedule.each(function(it){
				if(it.timeStamp >= time)
				str+=('<div>'+it.time+'<br /><a href="'+it.url+'" target="_blank">'+it.name+'</a></div>')
			});
			eles.star.games.update(str).show();
		}
		eles.writeIt.writeAttribute('href','http://blog.sohu.com/manage/entry.do?m=add&t=shortcut&keywords='+escape(stName));
		//this.showMRpt($A(result.news));
		
		this.getMRpt(result.starid);
		this.getBAtc();
	};
	/* 此接口取消，数据由获取明星信息接口提供*/
	// 获取关于此明星的媒体报道
	this.getMRpt = function(starId){
		var url = blogHost+'/olympic/relativenews/'+starId+'.json?ts='+(new Date()).getTime();
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
			str = '';
			for(var i = 0 ; i< newsList.length ; i++)
				str += '<li><div><a target="_blank" href="'+newsList[i].href+'" alt="'+newsList[i].title+'" title="'+newsList[i].title+'">'+newsList[i].title+'</a></div></li>';		
			eles.moreMRpt.writeAttribute('href',moreLink).up('p').show();
		}
		eles.mediaRpt.update(str);
		
	};
	
	// 获取关于此明星的博文
	this.getBAtc = function(){
		//	向服务器保存数据
		var vn = this.id;//bAtcList
		var url = blogTagHost + '/search?type=tag&f=json&count=5&vn='+this.id+'&q='+escape(stName)+'&ts='+(new Date()).getTime();
		new Groj(url, {
			variable: 'blogTag.posts'+this.id,
			onSuccess: this.showBAtc.bind(this,vn),
			onFailure: this.noData.bind(this,eles.blogAtc,'暂无法获取明星博文')
		});
	};
	
	// 显示明星博文
	this.showBAtc = function(vn,transport){
		var artList = blogTag['posts'+vn];
		var str = '暂时没有相关博友热文';
		if(artList && artList.length > 0){
			str='';
			for(var i = 0 ; i< artList.length ; i++)
				if(artList[i].title != '')
					str += '<li><a target="_blank" href="'+artList[i].permlink+'" alt="'+artList[i].title+'" title="'+artList[i].title+'">'+artList[i].title+'</a></li>';	
			eles.moreBAtc.writeAttribute('href',blogTagHost+'/'+blogTag['encode'+vn].encode +'/').up('p').show();
		}
		eles.blogAtc.update(str);
		blogTag['posts'+vn] = null;
		//blogTag = '';
		//delete window.blogTag;
	};
	
	this.noData = function(ele,msg){
		ele.update(msg);
	};
};
registerWidget('o_atteStar');