/******* bj2008 Olympic Medal List Widget **********/
//	Author: Springwang (www.i-starting.com)
//	First Created: 2008-07-14
//	Last Update: 2008-07-15
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_medalList = function(m_data, m_content, m_edit){
	var eles = null; 		// Widget ����չʾ������Ҫ���Ķ����б�
	var elmOutput = null;	// �����������
	var blogHost = 'http://'+window.location.host;
	var infoHost = 'http://info.2008.sohu.com'; 	// ����������
	//var nick = 'Springwang';
	
	m_content = $(m_content);
	
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
	// ˢ��
	this.refresh = function() {
		this.build(true);
		this.loaded();
	};
	// ��ȡ����ֵ
	this.getDate = function(){
		var d = new Date();
		return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
	};
	// ���� Widget չʾ����
	this.build = function(nocache) {
		this.destroy();
		elmOutput = new Element('div');
		m_content.innerHTML = '';
		var str= '<div class="medalRank-content">'+
				    '<div class="adBanner">Beijing2008���˻�</div>'+
				    '<div class="medalRank_tp_bg"></div>'+
				    '<div class="rank">'+
				      '<h3><span class="red">����</span> ��Լ���ư�</h3>'+
				        '<div class="date">'+this.getDate()+'</div>'+
				        '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
				          '<thead>'+
				             '<tr>'+
				                '<td align="right" width="41">����</td>'+
				                '<td align="center" width="45"><img src="http://info.2008.sohu.com/public_images/glodM.gif" alt="����" title="����" /></td>'+
				                '<td align="center" width="35"><img src="http://info.2008.sohu.com/public_images/silverM.gif" alt="����" title="����" /></td>'+
				                '<td align="center" width="35"><img src="http://info.2008.sohu.com/public_images/bronzeM.gif" alt="ͭ��" title="ͭ��" /></td>'+
				                '<td align="center">����</td>'+
				              '</tr>'+
				          '</thead>'+
				          '<tbody id="medalList" >'+
				              App.Lang.loading +
				          '</tbody>'+
				          '<tfoot>'+
				              '<tr>'+
				                '<td colspan="2" align="center"><a href="http://info.2008.sohu.com/Medal/Daily.shtml" target="_blank">���ս���>></a></td>'+
				                '<td>&nbsp;</td>'+
				                '<td colspan="2" align="right"><a href="http://info.2008.sohu.com/Medal/" target="_blank">����>></a></td>'+
				              '</tr>'+
				          '</tfoot>'+
				        '</table>'+
				    '</div>'+
				    '<div class="medalRank_cn_bg"></div>'+
				    '<div class="guess">'+
				    	'<h3>���ƾ���</h3>'+
				        '<div class="guess_content">'+
				        	'<div class="guessIcon">'+
				            	'<a id="mQuizUserIconLink" target="_blank"><img id="mQuizUserIconImg" src="http://img3.pp.sohu.com/ppp/blog/images/common/nobody.gif" alt="" /></a>'+
				            '</div>'+
				            '<div class="guessInfo">'+
				            	'<h4 id="mQuizUserNameText" ></h4>'+
				                '���»��֣�<span id="mQuizScore">����</span>'+
				            '</div>'+
				            '<div style="clear:both"></div>'+
				          '<div class="nowtop">'+
				            	'�����У�<span id="mQuizTRank">����</span><br />'+
				                '<strong><span class="red">�������У�<span id="mQuizDRank" >����</span></span></strong><br />'+
				                '�����й������У�<span id="mQuizTCRank">����</span><br />'+
				                '�й������У�<span id="mQuizCRank">����</span><br />'+
				                //'��Ŀ�����У�<span id="mQuizBRank"></span>'+
				                '<h4><span id="mQuizNick"></span>��õĽ�Ʒ��</h4>'+
				                '<span id="mQuizPrize">����</span>'+
				          '</div>'+
				          '<div class="joinguess">'+
				          	'<a href="http://jingcai.2008.sohu.com" target="_blank" class="btn_joinguess">�μӽ��ս��ƾ���<span>�μӽ��ս��ƾ���</span></a>'+
				            '<a href="http://jingcai.2008.sohu.com/winners.html" target="_blank">���ջ�����</a>'+
				          '</div>'+
				        '</div>'+
				    '</div>';		    
		if(!App.Permit.editModule) {
				str +=	'<div class="medalRank_bm_bg">'+
						'<a href="http://blog.sohu.com/manage/module.do?m=preview&type=o_medalList" target="_blank">��ӵ��ҵĲ���</a>';
		}	
		else
			str +=	'<div class="medalRank_bm_s_bg">';
			
			str +=  '</div>'+
				'</div>';
		m_content.appendChild(elmOutput.update(str));
		this.initEles();
		this.setTitle('���˽��ư�', true);
		this.getMedalList();
		setTimeout(this.getUserInfo.bind(this), 10);
		setTimeout(this.getQuizInfo.bind(this), 10);
		
	};
	
	// ��ȡ������Ҫ�������ݵĶ���
	this.initEles = function(){
		//if(!eles){
			eles = {
				quiz:{
					uIconLink : elmOutput.select('a#mQuizUserIconLink')[0],
					uIconImg : elmOutput.select('img#mQuizUserIconImg')[0],
					uNameText : elmOutput.select('h4#mQuizUserNameText')[0],
					score : elmOutput.select('span#mQuizScore')[0],
					tRank : elmOutput.select('span#mQuizTRank')[0],
					dRank : elmOutput.select('span#mQuizDRank')[0],
					tcRank : elmOutput.select('span#mQuizTCRank')[0],
					cRank : elmOutput.select('span#mQuizCRank')[0],
					//bRank : elmOutput.select('span#mQuizBRank')[0],
					prize : elmOutput.select('span#mQuizPrize')[0],
					nick : elmOutput.select('span#mQuizNick')[0]
			
				},
				mList : elmOutput.select('tbody#medalList')[0]
			}
		//}
	};
	
	// ��ȡ��i[0-9].itc.cn���������
	this.getItc = function(){
		return 'http://i'+Math.floor(Math.random()*10)+'.itc.cn';//'http://info.2008.sohu.com';//'http://i'+Math.floor(Math.random()*10)+'.itc.cn';
	};
	
	// ��ȡ���ư�����
	this.getMedalList = function(){
		var url = blogHost+'/olympic/medal/MiniStanding.json?ts='+(new Date()).getTime();
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showMedalList.bind(this),
				onFailure: this.noData.bind(this,eles.mList,'��ʱ�޷���ȡ���ư�')
			}
		);
	};
	
	// ��ʾ���ư�
	this.showMedalList = function(transport){
		var mList = eval("(" + transport.responseText + ")");
		var str = '';
		if(mList.length == 0 )
			mList = [		
				['USA','1','����','0','0','0','0'],		
				['CHN','2','�й�','0','0','0','0'],
				['RUS','3','����˹','0','0','0','0'],
				['AUS','4','�Ĵ�����','0','0','0','0'],
				['JPN','5','�ձ�','0','0','0','0'],
				['GER','6','�¹�','0','0','0','0'],
				['FRA','7','����','0','0','0','0'],
				['ITA','8','�����','0','0','0','0'],
				['KOR','9','����','0','0','0','0'],
				['GBR','10','Ӣ��','0','0','0','0']
			];
		for(var i = 0; i< mList.length; i++){
			var it= mList[i];
			if( i<3 ){ // ǰ����������ʾ
	     		str += 	'<tr>'+
			                '<td align="right">'+it[1]+'.<a href="'+infoHost+'/Global/NOC/'+it[0]+'.shtml" target="_blank"><img src="'+this.getItc()+'/olympic/public_images/flags/small/'+it[0]+'.gif" alt="'+it[2]+'" title="'+it[2]+'"></a></td>'+
			                '<td align="center"><strong>'+it[3]+'</strong></td>'+
			                '<td align="center"><strong>'+it[4]+'</strong></td>'+
			                '<td align="center"><strong>'+it[5]+'</strong></td>'+
			                '<td align="center"><strong>'+it[6]+'</strong></td>'+
			            '</tr>';
			}
			else{
				str += 	'<tr>'+
			                '<td align="right">'+it[1]+'.<a href="'+infoHost+'/Global/NOC/'+it[0]+'.shtml" target="_blank"><img src="'+this.getItc()+'/olympic/public_images/flags/small/'+it[0]+'.gif" alt="'+it[2]+'" title="'+it[2]+'"></a></td>'+
			                '<td align="center">'+it[3]+'</td>'+
			                '<td align="center">'+it[4]+'</td>'+
			                '<td align="center">'+it[5]+'</td>'+
			                '<td align="center">'+it[6]+'</td>'+
			            '</tr>';
			}
     	}
     	eles.mList.update(str);
	};
	
	// ��ȡ������Ϣ
	this.getUserInfo = function(){
		var url = blogHost+'/service/userinfo.jsp?xp='+_xpt+'&ts='+(new Date()).getTime();
		new Ajax.Request(
			url,
			{
				method:'get',
				onSuccess: this.showUserInfo.bind(this)//,
				//onFailure: this.noData.bind(this)
			}
		);
	};
	// ��ʾ������Ϣ
	this.showUserInfo = function(transport){
		if(transport && transport.responseText!=''){
			var userInfo = eval("(" + transport.responseText + ")")[_xpt];
			eles.quiz.uIconImg.writeAttribute('src',userInfo.ico);
			if(eles.quiz.uNameText.innerHTML == '')
				eles.quiz.uNameText.update(userInfo.title);
		}
	};
	
	// ��ȡ�û����ƾ�����Ϣ
	this.getQuizInfo = function(){
		var vn = 'mQuizInfo';
		var url ='http://jingcai.2008.sohu.com/api/blog_widget.php?xp='+b64_decodex(_xpt)+'&ts='+(new Date()).getTime();//'http://*.blog.com?xp='+_xpt;
		new Groj(url, {
			variable: vn,
			charset:'utf-8',
			onSuccess: this.showQuizInfo.bind(this,vn)//,
			//onFailure: this.noData.bind(this)
		});
	};
	
	// ��ʾ������Ϣ
	this.showQuizInfo = function(vn){
		var quizInfo = window[vn];
		var str='����ʱû�вμӽ��Ʋ���';
		if(quizInfo && quizInfo.nick){
			eles.quiz.uIconLink.writeAttribute('href',quizInfo.link);
			eles.quiz.uNameText.update(quizInfo.nick);
			eles.quiz.nick.update(quizInfo.nick);
			eles.quiz.score.update(quizInfo.marks);
			eles.quiz.tRank.update(quizInfo.pos);
			eles.quiz.dRank.update(quizInfo.todayPos);
			eles.quiz.cRank.update(quizInfo.todayChinaPos);
			eles.quiz.tcRank.update(quizInfo.chinaPos);
			//eles.quiz.bRank.update(quizInfo.itemPos);
			if(quizInfo.award && quizInfo.award.length > 0){
				var str = '';
				for(var i = 0 ; i < quizInfo.award.length; i++){
					var it = quizInfo.award[i];
					str += '<div>'+it.date+'&nbsp;<a href="'+it.cateLink+'" >'+it.cate+'</a>&nbsp;'+it.level+'</div>';
				}
				eles.quiz.prize.update(str);
			}
		}
		 window[vn]=null;
	};
	
	this.noData = function(ele,msg){
		ele.update(msg);
	};
};
registerWidget('o_medalList');