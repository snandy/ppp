/******* bj2008 Olympic Game Attention Star Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-10
//	Last Update: 2008-07-23
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_atteStar = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget ����չʾ������Ҫ���Ķ����б�
	var elmOutput = null;	// �����������
	var elmOutputE = null; 	// �༭�������
	var blogHost = 'http://'+window.location.host;
	var infoHost = 'http://info.2008.sohu.com'; 	// ����������
	var blogTagHost = 'http://tag.blog.sohu.com';
	
	var spId = '';	// ������ĿID
	var spName = ''; 	// ������Ŀ����
	var stId = '';	// ����ID
	var stName = ''; 	// ��������
	
	var spArray=[
		{"id":"BB","name":"[B]����"},
		{"id":"GT","name":"[B]�Ĵ�"},
		{"id":"CT","name":"[C]�������г�"},
		{"id":"SA","name":"[F]����"},
		{"id":"CR","name":"[G]��·���г�"},
		{"id":"SY","name":"[H]������Ӿ"},
		{"id":"GA","name":"[J]�������"},    
		{"id":"FE","name":"[J]����"},
		{"id":"WL","name":"[J]����"},
		{"id":"BK","name":"[L]����"},
		{"id":"SO","name":"[L]����"},
		{"id":"EQ","name":"[M]����"},
		{"id":"VO","name":"[P]����"},
		{"id":"CS","name":"[P]Ƥ��ͧ��������"},
		{"id":"CF","name":"[P]Ƥ��ͧ��ˮ"},	
		{"id":"TT","name":"[P]ƹ����"},	
		{"id":"HO","name":"[Q]������"},	
		{"id":"BX","name":"[Q]ȭ��"},	
		{"id":"JU","name":"[R]���"},
		{"id":"CM","name":"[S]ɽ�����г�"},	
		{"id":"RO","name":"[S]��ͧ"},
		{"id":"BV","name":"[S]ɳ̲����"},
		{"id":"SH","name":"[S]���"},
		{"id":"AR","name":"[S]���"},
		{"id":"HB","name":"[S]����"},
		{"id":"WR","name":"[S]ˤ��"},
		{"id":"WP","name":"[S]ˮ��"},
		{"id":"TK","name":"[T]��ȭ��"},
		{"id":"AT","name":"[T]�ﾶ"},
		{"id":"DV","name":"[T]��ˮ"},
		{"id":"TR","name":"[T]��������"},
		{"id":"TE","name":"[W]����"},
		{"id":"MP","name":"[X]�ִ�����"},
		{"id":"CB","name":"[X]С�ֳ�"},
		{"id":"GR","name":"[Y]�������"},
		{"id":"SW","name":"[Y]��Ӿ"},
		{"id":"BD","name":"[Y]��ë��"},
		{"id":"FB","name":"[Z]����"}];
		
	// ��ʼ��������ĿID������ID
	if (m_data) {
		spId = m_data.spId || '';
		spName = m_data.spName || '';
		stId = m_data.stId || '';
		stName = m_data.stName || '';
	}else{
		if(!window.o_atteStar_isFirstMod){
			spId = 'AT';
			spName = '�ﾶ';
			stId = '123';
			stName = '����';
			window.o_atteStar_isFirstMod = true;
		}
	};
	
	m_content = $(m_content);
	m_edit = $(m_edit);
	
	// Widget ��ʼ��
	this.initialize = function() {
		this.loaded();
		this.build();
	};
	
	// ����widget
	this.destroy = function() {
		if (elmOutput) {
			elmOutput.remove();
		}
	};
	// Widget ���÷���
	this.edit = function() {
		this.buildEdit();
	};
	
	this.refresh = function() {
		this.build(true);
		this.loaded();
	};
	// ���������������
	this.buildEdit = function() {
		if(elmOutputE)
			return;
		elmOutputE = new Element('div');
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="60px">ѡ����Ŀ: </td>';
		str += '<td><select name="spId"><option value="0">'+ App.Lang.loading +'</option></select></td>';
		str += '</tr><tr>';
		str += '<td>ѡ������: </td>';
		str += '<td><select name="stId"><option value="0">'+ App.Lang.loading +'</option></select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';

		m_edit.appendChild(elmOutputE.update(str));
		
		// ����ʹ�����ַ�ʽ��ȡ������Ϊ�˱���ʹ�� ID �ظ�
		this.spIdIpt = $(elmOutputE.firstChild.rows[0].cells[1].firstChild);
		this.stIdIpt = $(elmOutputE.firstChild.rows[1].cells[1].firstChild);
		
		this.saveBtn = $(elmOutputE.firstChild.rows[2].cells[1].firstChild);
		this.saveBtn.observe('click', this.saveData.bindAsEventListener(this));
		
		setTimeout(this.showSpList.bind(this), 10);
	};
	
	// ��ʾ������Ŀ�б�
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
	
	// ��ȡָ��������Ŀ��Ӧ�������б�
	this.getStList = function(){
		if(!window.o_atteStar_spst){
			var url = blogHost+'/olympic/common/disstar.json?ts='+(new Date()).getTime();
			new Ajax.Request(
				url,
				{
					method:'get',
					onSuccess: this.buildFlagList.bind(this),
					onFailure: this.noData.bind(this,this.stIdIpt,'<option>���޷���ȡ�����б�</option>')
				}
			);
		}
		else
			this.getSIfo();
	};
	// ��ʾ�����б�
	this.showStList = function(){
		var result = $A(eval("(" + window.o_atteStar_spst.responseText + ")")[$F(this.spIdIpt)]); // ������spId
		var str = '<select name="stId">';
		str += this.buildSlctOpt(result,stId);
		str += '</select>';
		var tmpElm = this.stIdIpt.up('td');
		tmpElm.innerHTML = str;
		this.stIdIpt = tmpElm.down('select');
	};
	
	// ����һ��ID��flag�Ķ�Ӧ��
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
	
	// ��������Դ��ѡ��ֵ���������������
	this.buildSlctOpt = function(sArray,selectedId){
		var str ='';
		if(sArray.length == 0)
			str += '<option value="0">û����</option>';
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
	// �����û�����
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
		
		// �����ʱ�򲻽�������ĿID������ID������������Ŀ���ƺ���������
		// ��Ϊ��Ҫ���������ƻ�ȡý�屨������ز���
		var data = {
			spId: spId,
			spName: spName,
			stId: stId,
			stName: stName
		}
		this.save(data);
		this.build();
	};
	
	// ���� Widget չʾ����
	this.build = function(nocache) {
		this.destroy();
		elmOutput = new Element('div');
		m_content.innerHTML = '';
		if (!spId || !stId) {
			elmOutput.innerHTML = '������ʹ�ô�ģ�飬����ʱ�˽�����ע�İ������ǡ�<br /><br />������ģ�����Ͻǵġ����á���ѡ����Ҫ��ע�����ǡ�';
			m_content.appendChild(elmOutput);
		}
		else {
			var str='<div class="attStar-content">'+
				    '<div class="adBanner">Beijing2008���˻�</div>'+
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
				            	'<a class="starGMedalLink" href="#" target="_blank"><img  class="starGMedalImg"  align="absmiddle" src="http://js1.pp.sohu.com.cn/ppp/blog/widgets/o_atteStar/images/ico_medal_gold.gif" alt="����" title="����" /></a><span  class="starGMedalCount">(0)</span>'+
				            	'<a class="starSMedalLink" href="#" target="_blank"><img class="starSMedalImg" align="absmiddle" src="http://js1.pp.sohu.com.cn/ppp/blog/widgets/o_atteStar/images/ico_medal_silver.gif" alt="����" title="����" /></a><span class="starSMedalCount">(0)</span>'+
				            	'<a class="starBMedalLink" href="#" target="_blank"><img class="starBMedalImg" align="absmiddle" src="http://js1.pp.sohu.com.cn/ppp/blog/widgets/o_atteStar/images/ico_medal_bronze.gif" alt="ͭ��" title="ͭ��" /></a><span class="starBMedalCount">(0)</span>'+
				            '</div>'+
				        '</div>'+
				       '</div>'+
				        '<div class="nearly">'+
				          '<h4>����������</h4>'+
				            '<span class="starGames">��������</span>'+
				      '</div>'+
				        '<div class="artList">'+
				        	'<h4>�Ѻ�������</h4>'+
				          '<ul class="sMediaReport">'+
				          '</ul>'+
				            '<p align="right" style="display:none;" ><a class="sMoreMReport" href="#" target="_blank">�鿴����>></a></p>'+
				        '</div>'+
				        '<div class="artList">'+
				        	'<h4>�������ģ�</h4>'+
				          '<ul class="sBlogArticle" >'+ App.Lang.loading +'</ul>'+
				            '<p align="right" style="display:none;" ><a class="sMoreBArticle" href="#" target="_blank">�鿴����>></a></p>'+
				        '</div>'+
				        '<div class="joinguess">'+
				          	'<a href="#" target="_blank" class="btn_joinguess writeStarLink">д�������е�'+stName+'<span>д�������е�'+stName+'</span></a>'+
				        '</div>'+
				        '</div>';
			if(!App.Permit.editModule)  {
				 str +=	'<div class="attStar_bm_bg">'+
				'<a href="http://blog.sohu.com/manage/module.do?m=preview&type=o_atteStar" target="_blank">��ӵ��ҵĲ���</a>';
				}
		else
				str +=	'<div class="attStar_bm_s_bg">';
				
				str +=  '</div>'+
					'</div>';
			m_content.appendChild(elmOutput.update(str));
			this.initEles();
			this.setTitle('�ҹ�ע������', true);
			this.getStList();
		}
	};
	// ��ȡ������Ҫ�������ݵĶ���
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
	
	// ��ȡ���ǻ�����Ϣ
	this.getSIfo = function(){
		//alert(window.o_atteStar_flagList[stId]);
		var flag = window.o_atteStar_flagList[stId] == '0' ? 'athlete' : 'team';
		var url = blogHost+'/olympic/'+ flag +'/'+stId+'.json?ts='+(new Date()).getTime();
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showSIfo.bind(this),
				onFailure: this.noData.bind(this,eles.star.nameLink.up('div.starContent'),'���޷���ȡ������Ϣ')
			}
		);
	};
	// ��ȡ��i[0-9].itc.cn���������
	this.getItc = function(){
		return 'http://i'+Math.floor(Math.random()*10)+'.itc.cn'; //'http://info.2008.sohu.com';//;
	};
	// ��ʾ���ǻ�����Ϣ
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
		eles.star.profileLink.update(stName+'С����').writeAttribute('href',profileLink);
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
			
		// �Լ��������ı�����ʱ���Ⱥ���������ҹ��˵��Ѿ���ȥ�ı�����Ŀ
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
	/* �˽ӿ�ȡ���������ɻ�ȡ������Ϣ�ӿ��ṩ*/
	// ��ȡ���ڴ����ǵ�ý�屨��
	this.getMRpt = function(starId){
		var url = blogHost+'/olympic/relativenews/'+starId+'.json?ts='+(new Date()).getTime();
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showMRpt.bind(this),
				onFailure: this.noData.bind(this,eles.mediaRpt,'���޷���ȡý�屨��')
			}
		);
	};
	
	// ��ʾ����ý�屨��
	this.showMRpt = function(transport){
		var news = eval("(" + transport.responseText + ")");
		var newsList = news.news;
		var moreLink = news.more;
		var str='��ʱû�����ý�屨��';
		if(newsList.length > 0){
			str = '';
			for(var i = 0 ; i< newsList.length ; i++)
				str += '<li><div><a target="_blank" href="'+newsList[i].href+'" alt="'+newsList[i].title+'" title="'+newsList[i].title+'">'+newsList[i].title+'</a></div></li>';		
			eles.moreMRpt.writeAttribute('href',moreLink).up('p').show();
		}
		eles.mediaRpt.update(str);
		
	};
	
	// ��ȡ���ڴ����ǵĲ���
	this.getBAtc = function(){
		//	���������������
		var vn = this.id;//bAtcList
		var url = blogTagHost + '/search?type=tag&f=json&count=5&vn='+this.id+'&q='+escape(stName)+'&ts='+(new Date()).getTime();
		new Groj(url, {
			variable: 'blogTag.posts'+this.id,
			onSuccess: this.showBAtc.bind(this,vn),
			onFailure: this.noData.bind(this,eles.blogAtc,'���޷���ȡ���ǲ���')
		});
	};
	
	// ��ʾ���ǲ���
	this.showBAtc = function(vn,transport){
		var artList = blogTag['posts'+vn];
		var str = '��ʱû����ز�������';
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