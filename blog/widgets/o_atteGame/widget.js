/******* bj2008 Olympic Attention Game Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-11
//	Last Update: 2008-07-23
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_atteGame = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget ����չʾ������Ҫ���Ķ����б�
	var elmOutput = null;	// �����������
	var elmOutputE = null; 	// �༭�������
	var blogHost = 'http://'+window.location.host;
	var infoHost = 'http://info.2008.sohu.com'; 	// ����������
	
	var spId = '';	// ������ĿID
	var spName = ''; 	// ������Ŀ����
	
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
	}
	else{
		if(!window.o_atteGame_isFirstMod){
			spId = 'BK';
			spName = '����';
			window.o_atteGame_isFirstMod = true;
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
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';

		m_edit.appendChild(elmOutputE.update(str));
		
		// ����ʹ�����ַ�ʽ��ȡ������Ϊ�˱���ʹ�� ID �ظ�
		this.spIdIpt = $(elmOutputE.firstChild.rows[0].cells[1].firstChild);

		this.saveBtn = $(elmOutputE.firstChild.rows[1].cells[1].firstChild);
		this.saveBtn.observe('click', this.saveData.bindAsEventListener(this));
		
		setTimeout(this.showSpList.bind(this), 10);
	};
	/*
	// ��ȡ������Ŀ�б�
	this.getSpList = function(){
		var url = blogHost+'/olympic/common/discipline.json?ts='+(new Date()).getTime();
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showSpList.bind(this),
				onFailure: this.noData.bind(this,this.spIdIpt,'<option>���޷���ȡ��Ŀ�б�</option>')
			}
		);
	};
	*/
	// ��ʾ������Ŀ�б�
	this.showSpList = function(transport){
		var result = $A(spArray);
		var str = '<select name="spId">';
		str += this.buildSlctOpt(result,spId);
		str += '</select>';
		var tmpElm = this.spIdIpt.up('td');
		tmpElm.innerHTML = str;
		this.spIdIpt = tmpElm.down('select');
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
						str += '<option value="'+ it.id +'" selected="selected">'+ it.name.unescapeHTML() +'</option>';
					} else {
						str += '<option value="'+ it.id +'">'+ it.name.unescapeHTML() +'</option>';
					}
				}
			});
		}
		return str;
	};
	
	// �����û�����
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
		
		// �����ʱ�򲻽�������ĿID������ID������������Ŀ���ƺ���������
		// ��Ϊ��Ҫ���������ƻ�ȡý�屨������ز���
		var data = {
			spId: spId,
			spName: spName
		}
		this.save(data);
		this.build();
	};
	
	// ���� Widget չʾ����
	this.build = function(nocache) {
		this.destroy();
		elmOutput = new Element('div');
		m_content.innerHTML = '';
		if (!spId) {
			elmOutput.innerHTML = '������ʹ�ô�ģ�飬����ʱ�˽�����ע�ı�����Ŀ��<br /><br />������ģ�����Ͻǵġ����á���ѡ����Ҫ��ע�ı�����Ŀ��';
			m_content.appendChild(elmOutput);
		}
		else {
			var str='<div class="attGame-content">'+
				    '<div class="adBanner">Beijing2008���˻�</div>'+
				    '<div class="attGame_tp_bg"></div>'+
				    '<div class="rank">'+
				      '<div class="gameContent">'+
					  	'<div class="gameIcon">'+
				            '<a id="gameIconLink" class="gameIconLink" href="#" target="_blank"><img id="gameIconImg" class="gameIconImg" src="" alt="" /></a>'+
				        '</div>'+
				        '<div class="gameInfo">'+
				            '<h2><a id="gameNameLink" href="#" target="_blank" class="gameNameLink"><span id="gameNameText" class="red gameNameText">'+spName+'</span></a></h2>'+
				            '<div><a id="gameDescLink" class="gameDescLink" href="#" target="_blank">������Ŀ����</a></div>'+
				        '</div>'+
				       '</div>'+
				       '<div style="clear:both"></div>'+
				       '<div id="gameCalendar" class="artList gameCalendar" >'+
				          	'<table width="100%" border="0" cellspacing="1" cellpadding="0">'+
				              '<thead><tr><td colspan="7" align="center"><strong>2008��8��</strong></td></tr></thead>'+
				              '<tbody>'+
				              '<tr>'+
				                '<td align="center">��</td>'+
				                '<td align="center">һ</td>'+
				                '<td align="center">��</td>'+
				                '<td align="center">��</td>'+
				                '<td align="center">��</td>'+
				                '<td align="center">��</td>'+
				                '<td align="center">��</td>'+
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
				        	'<h4>�Ѻ�������</h4>'+
				          '<ul id="gMediaReport" class="gMediaReport">'+
				           		App.Lang.loading +
				          '</ul>'+
				            '<p align="right" style="display:none;" ><a id="gMoreMReport"  class="gMoreMReport" href="#" target="_blank">�鿴����>></a></p>'+
				        '</div>'+
				        '<br />'+
				        '</div>';
			if(!App.Permit.editModule)  {
				str +=	'<div class="attGame_bm_bg">'+
				'<a href="http://blog.sohu.com/manage/module.do?m=preview&type=o_atteGame" target="_blank">��ӵ��ҵĲ���</a>';
				}
		else
				str +=	'<div class="attGame_bm_s_bg">';
				
				str +=  '</div>'+
					'</div>';
			m_content.appendChild(elmOutput.update(str));
			this.initEles();
			this.setTitle('�ҹ�ע������', true);
			this.showSIfo();
			setTimeout(this.getCal.bind(this), 10);//this.getCal();
			setTimeout(this.getMRpt.bind(this), 10);//this.getMRpt();
		}
	};
	
	// ��ȡ������Ҫ�������ݵĶ���
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
	
	// ��ȡ��i[0-9].itc.cn���������
	this.getItc = function(){
		return 'http://i'+Math.floor(Math.random()*10)+'.itc.cn'; //'http://info.2008.sohu.com';//;
	};
	// ��ʾ���»�����Ϣ
	this.showSIfo = function(){
		var gameIconImg = this.getItc()+'/olympic/public_images/logo/'+spId+'.gif';
		var gameIconLink = infoHost + '/Global/BCK/'+spId+'.shtml';
		
		eles.game.iconImg.writeAttribute('src',gameIconImg);
		eles.game.iconLink.writeAttribute('href',gameIconLink).writeAttribute('alt',spName).writeAttribute('title',spName);
		eles.game.nameLink.writeAttribute('href',gameIconLink) ;
		eles.game.descLink.writeAttribute('href',gameIconLink);
	};
	
	// ��ȡ�����ճ�
	this.getCal = function(){
		var url = blogHost+'/olympic/schedule2/summary_'+spId+'.json?ts='+(new Date()).getTime();
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showCal.bind(this)//,
				//onFailure: this.noData.bind(this,$('gameCalendar'),'���޷���ȡ�����ճ�')
			}
		);
	};
	
	// ��ʾ�����ճ�
	this.showCal = function(transport){
		var calList = eval("(" + transport.responseText + ")");
		for(it in calList){
     		var day = Math.floor(it.substring(6,8));
     		elmOutput.select('td.c_d_'+day)[0].innerHTML = '<a target ="_blank" title="����鿴���ձ���" alt="����鿴���ձ���" href="' + infoHost + '/Schedule/' + spId + '.shtml#'+it+'" class="active">'+ day +'</a>';
     	}
	};
	
	// ��ȡý�屨��
	this.getMRpt = function(){
		var url = blogHost+'/olympic/common/'+ spId +'_news.json?ts='+(new Date()).getTime();
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