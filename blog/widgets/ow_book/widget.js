/******* OW Book Widget **********/
//	Author: Jady
//	First Created: 2008-09-09
//	Last Update: 2008-09-09
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var ow_book = function(m_data, m_content, m_edit, w_path){
	
	/********************************  ����  ********************************* Begin */
	
	//	Widget�����ò���
	var wdtId = '63856',
			wdtUrl = 'http://sr.qidian.com/Service/mtk/';
	
	//	widget�Ļ�Ԫ�ض���
	var outputEle = null;
	
	/********************************  ����  ********************************* End */
	
	/********************************  Ӧ�õ����巽��  ********************************* Begin */
	this.reqData = function(noCache) {
		outputEle.innerHTML = App.Lang.loadModuleData;
		
		var url = '/py?url='+encodeURIComponent('http://ow.blog.sohu.com/widget/0/getBookInfo?provider='+wdtUrl+'&bid='+wdtId);
		new Ajax.Request(url, {
			method: "get",
			onSuccess: this.getData.bind(this),
			onFailure: this.noData.bind(this)
		});
	}
	
	this.getData = function(transport) {
		var str = '';
		var json = eval("(" + transport.responseText + ")");
				
	    if (json) {
	      	var bookId = wdtId;	
			if(json.cover==""){
				json.cover="http://i6.itc.cn/20080827/63b_9b609da9_7199_4970_8095_16c608d794c0_0.gif";
			}
			str += '<div class="b_top"><div class="b_name"><a href="'+json.link+'" target="_blank">'+json.name+'</div>';
			str +='<div class="b_brief clearfix">';
			str += '<a href="'+json.link+'" target="_blank"><img class="cover" src="'+json.cover+'" alt="'+json.name+'" /></a>';
			str += '<p class="b_brief_p">���ߣ�'+json.authorName+'</p>';
			str += '<p class="b_brief_p">����:<span class="count_red">'+json.viewCount+'</span></p>';
			str += ' <p>���</p>';
			str += json.brief+'����[<a href="'+json.link+'" target="_blank">��ͷ����</a>]';
  			str +='</div></div><div class="b_top"><p class="b_list_p">�½��Ķc�</p><ul class="text_list">';
			var volumes = json.volumeList;
			for(var i=0;i<volumes.length;i++){
				if(i>=5)break;
				str +='<li><a href="'+volumes[i].vLink+'" target="_blank">'+volumes[i].vName+'</a></li>';
			}
			str += '</ul></div>';
		} else {
			str = 'û�п���ʾ����';
		}
		outputEle.innerHTML = str;
	}
	this.noData = function() {
		outputEle.innerHTML = '�������';
	}
	this.parseData = function(item) {
		var items = ["provider", "id", "name","author_nickname","cover","brief","view_count","book_link"];
		var data = {}
		
		for (var i=0; i<items.length; i++) {
			var eles = item.getElementsByTagName(items[i]);
			if (eles && eles[0]&&eles[0].firstChild) {
			
				data[items[i]] = eles[0].firstChild.data ;
			} else {
				data[items[i]] = "";
			}
		}
		
		return data;
	}
	this.parseDataVolume = function(item) {
		var items = ["volume_id", "volume_name", "volume_short","volume_link"];
		var data = {}
		
		for (var i=0; i<items.length; i++) {
			var eles = item.getElementsByTagName(items[i]);
			if (eles && eles[0]&&eles[0].firstChild) {
				
				data[items[i]] =  eles[0].firstChild.data;
			} else {
				data[items[i]] = "";
			}
		}
		
		return data;
	}
	
	/********************************  Ӧ�õ����巽��  ********************************* End */
	
	/********************************  Ӧ�õĻ���  ********************************* Begin */
	this.initParams = function() {
		if(typeof(m_data) == "object") {
			wdtId = m_data.id;
			wdtUrl = m_data.url;
		}
	}
	this.initEles = function() {
		m_content.innerHTML = "";
		outputEle = document.createElement("div");
		m_content.appendChild(outputEle);
	}
	/********************************  Ӧ�õĻ���  ********************************* End */
	
	/********************************  ���صķ���  ********************************* Begin */
	this.initialize = function() {
		this.initParams();
		this.initEles();
		this.reqData(App.Permit.editModule);
	}
	this.destroy = function() {
		if(outputEle) Element.remove(outputEle);
		m_content.innerHTML = "";
	};
	this.refresh = function() {
		this.reqData(true);
	};
	/********************************  ���صķ���  ********************************* End */
};
registerWidget("ow_book");