/******* RSS Widget **********/
//	Author: Jady
//	First Created: 2008-04-01
//	Last Update: 2008-04-01
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var rss = function(m_data, m_content, m_edit, w_path) {
	
	//	var wdtUrl = 'http://reader.mail.sohu.com/blogwidget/get_entry.json';
	//var wdtUrl = 'http://reader.mail.sohu.com/blogwidget/get_info.json';
	var wdtUrl = 'http://see.blog.sohu.com/getRss.jsp';
	var wdtVn = '';
	var wdtData = null;
	
	var wdtRss = '';
	var wdtTitle = 'RSS����';
	var wdtLayout = 'normal';
	var wdtCount = 10;
	
	var outputEle = null;
	var editEle = null;
	var wdtTitleEle = null;
	var wdtLayoutEle = null;
	var wdtCountEle = null;
	
	this.onEditSave = function(e) {
		var needSave = false,
				needSaveTitle = false,
				needRefresh = false;
		
		//	��֤rssԴ
		var newUrl = wdtUrlEle.value.trim();
		wdtUrlEle.value = newUrl;
		if(newUrl.length == 0) {
			alert('������RSSԴ�ĵ�ַ');
			wdtUrlEle.focus();
			return false;
		}
		if (/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(newUrl) == false) {
			alert('RSSԴ�ĸ�ʽ����ȷ');
			wdtUrlEle.focus();
			return false;
		}
		if(newUrl != wdtRss) {
			wdtRss = newUrl;
			needSave = true;
			needRefresh = true;
		}
		
		//	��֤����
		var newTitle = wdtTitleEle.value.trim();
		wdtTitleEle.value = newTitle;
		if(newTitle.length == 0) {
			alert('���������');
			wdtTitleEle.focus();
			return false;
		}
		if(newTitle.length > 8) {
			var str = App.Lang.modTitleTooLong+'('+newTitle.length+App.Lang.word+')';
			str += '\n'+App.Lang.reduceTo+'8'+App.Lang.word;
			alert(str);
			wdtTitleEle.focus();
			return;
		}
		newTitle = newTitle.unescapeHTML();
		if(newTitle != wdtTitle) {
			wdtTitle = newTitle;
			needSave = true;
			needSaveTitle = true;
		}
		
		//	��֤����
		var newLayout = wdtLayoutEle.value;
		if(newLayout != wdtLayout) {
			wdtLayout = newLayout;
			needSave = true;
			needRefresh = true;
		}
		var newCount = wdtCountEle.value;
		if(newCount != wdtCount) {
			wdtCount = newCount;
			needSave = true;
			needRefresh = true;
		}
		
		if(needSave) {
			this.saveData();
		}
		if (needRefresh) {
			this.requestData();
		}
		if (needSaveTitle) {
			this.setTitle(wdtTitle, true);
		}
		
		this.closeEdit();
		return true;
	};
	this.saveData = function() {
		var data = {
			title: wdtTitle,
			layout: wdtLayout,
			url: wdtRss,
			count: wdtCount
		};
		this.save(data);
	};
	this.initEditElements = function() {
		m_edit.innerHTML = "";
		editEle = document.createElement("div");
		
		//	����html
		var str = '';
		str += '<table border="0" cellpadding="0" cellspacing="5"><tr>';
		str += '<td>RSSԴ��ַ: </td>';
		str += '<td><input type="text" name="url" value="'+ wdtRss +'" /></td>';
		str += '</tr><tr>';
		str += '<td>����: </td>';
		str += '<td><input type="text" name="title" /></td>';
		str += '</tr><tr>';
		str += '<td>��ʾģʽ: </td>';
		str += '<td><select name="layout"><option value="normal" selected="selected">ֻ��ʾ����</option><option value="all">��ʾ����ͼ��</option></select></td>';
		str += '</tr><tr>';
		str += '<td>��ʾ����: </td>';
		str += '<td><select name="count"><option value="3">3</option><option value="5">5</option><option value="10">10</option></select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		editEle.innerHTML = str;
		m_edit.appendChild(editEle);
		
		//	ȡ�����еĹؼ�����
		wdtUrlEle = editEle.firstChild.rows[0].cells[1].firstChild;
		wdtTitleEle = editEle.firstChild.rows[1].cells[1].firstChild;
		wdtLayoutEle = editEle.firstChild.rows[2].cells[1].firstChild;
		wdtCountEle = editEle.firstChild.rows[3].cells[1].firstChild;
		
		//	���û�������
		wdtUrlEle.value = wdtRss;
		wdtTitleEle.value = wdtTitle;
		wdtLayoutEle.value = wdtLayout;
		wdtCountEle.value = wdtCount;
		
		//	����Ӧ�¼�
		this.saveBtn = editEle.firstChild.rows[4].cells[1].firstChild;
		this.eventSaveData = this.onEditSave.bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.destroy = function() {
		if(outputEle) Element.remove(outputEle);
		m_content.innerHTML = "";
	};
	this.refresh = function() {
		this.requestData();
	};
	
	this.edit = function() {
		this.initEditElements();
	};
	/**
	 * ��ʼ������
	 */
	this.initParams = function() {
		if (typeof(m_data) == "object") {
			wdtRss = (typeof(m_data.url) != 'string' && m_data.url.length == 0) ? '' : m_data.url;
			wdtTitle = m_data.title || wdtTitle;
			wdtLayout = m_data.layout || wdtLayout;
			wdtCount = m_data.count || wdtCount;
		}
		this.setTitle(wdtTitle, true);
	};
	/**
	 * ��ʼ������
	 */
	this.initElements = function() {
		m_content.innerHTML = "";
		
		outputEle = document.createElement("div");
		m_content.appendChild(outputEle);
	};
	/**
	 * ��������
	 */
	this.requestData = function() {
		if(!outputEle) this.initElement();
		
		if (wdtRss == '') {
			outputEle.innerHTML = App.Permit.editModule ? '������ʹ�ô�ģ�飬���Ķ������ĵ���Ѷ�����¡�<br /><br />������ģ�����Ͻǵġ����á�����������RSSԴ��' : '������û������RSSԴ';
		} else {
			outputEle.innerHTML = App.Lang.loadModuleData;
			
			wdtVn = 'rss_' + this.id + '_' + timeStamp();
			var url = this.getRequestUrl(wdtVn);
			
			new Groj(url, {
				variable: wdtVn,
				charset: 'UTF-8',
				onSuccess: this.loadedData.bind(this),
				onFailure: this.noData.bind(this)
			});
		}
	};
	/**
	 * ������֮��Ĵ�����
	 */
	this.loadedData = function(data) {
		if (typeof(data) == "object" && data != null && data.widget_data) {
			switch (data.widget_data.error_code) {
				case 0:
					wdtData = data;
					this.getData();
					break;
				case 1:
					this.noData('feed����Ϊ��');
					break;
				case 2:
					this.noData('�������feed���������ݿ��в����ڣ������޷�ȡ����Ӧ�����¡�');
					break;
				case 3:
					this.noData('RSSϵͳ����');
					break;
				case 8206:
					this.noData('��RSSԴ����һ����Ч��RSSԴ');
					break;
			}
		} else {
			this.noData();
		}
		this.loaded();
	};
	/**
	 * ȡ�õ���ȡ������֮��Ĵ�����
	 */
	this.getData = function() {
		var str = '',
				wd = wdtData.widget_data,
				list = wd.entry_info,
				fi = wd.feed_info,
				moreUrl = fi.feed_link_alternate;
				
		if (list && list.length > 0) {
			for(var i=0; i<list.length; i++) {
				var iNow = list[i];
				if (!iNow || !iNow["entry_title"]) continue;
				
				var logTitle = iNow["entry_title"];
				var logLink = iNow["entry_link"];
				var logTime = Time.friendly(iNow["entry_publish_time"]*1000);
				
				if (wdtLayout == 'normal') {
					str += '<li><a href="' + logLink + '" target="_blank" alt="' + logTitle + '" title="' + logTitle + '" class="title">' + logTitle + '</a>&nbsp;<span class="time">' + logTime + '</span></li>';
				} else {
					var logContent = iNow['entry_content'].stripTags().truncate(200);
					str += '<li><a href="' + logLink + '" target="_blank" alt="' + logTitle + '" title="' + logTitle + '" class="title">' + logTitle + '</a>&nbsp;<span class="time">' + logTime + '</span><p>' + logContent + '</p></li>';
					
					//str += '<div class="item"><div class="item-top"></div>' +
  					//'<div class="item-title">' +
					 //   '<h3>' + logTime + ' | <a target="_blank" href="' + logLink + '">' + logTitle + '</a></h3><div class="clear"></div>' +
					 // '</div>' +
					 // '<div class="item-body">' +
					   // '<div class="item-content">' +
					    //	logContent +
					    //  '<div style="clear: both;" class="item-more">����<br/>[<a target="_blank" href="' + logLink + '">�鿴ȫ��</a>]</div>' +
					   //   '<div class="clear"></div>' +
					   // '</div></div>' +
					 // '<div class="item-bottom"></div>' +
					//'</div>';
				}
			}
			if (wdtLayout == 'normal') {
				str = '<div class="list_view"><ul class="logList">' + str + '</ul><div class="more"><a href="' + moreUrl + '" target="_blank">�Ķ�����>></a></div></div>';
			}
			else {
				str = '<div class="expanded_view"><ul class="logList">' + str + '</ul><div class="more"><a href="' + moreUrl + '" target="_blank">�Ķ�����>></a></div></div>';
			}
			
		} else {
			str += App.Lang.tag_noLogs;
		}

		outputEle.innerHTML = str;
		
		//	�ж�ȡ��rssԴ��ַ�Ƿ������ڵ���ͬ������ͬ�Ļ���Ҫ�ڵ�½״̬�±��浽������
		if (fi.feed_link != wdtRss) {
			wdtRss = fi.feed_link;
			if (App.Permit.editModule) {
				this.saveData();
			} 
		}
	};
	/**
	 * ����ʧ�ܺ�Ĵ�����
	 */
	this.noData = function(errorStr) {
		wdtData = null;
		outputEle.innerHTML = App.Lang.fileNotFound;
		this.loaded();
	};
	/**
	 * ȡ�������ַ���
	 */
	this.getRequestUrl = function(vn) {
		var str = wdtUrl + '?emode=' + wdtLayout + '&elimit=' + wdtCount + '&vn=' + vn + '&feed_link=' + encodeURIComponent(wdtRss);
		return str;
	};
	/**
	 * ��ʼ������
	 */
	this.initialize = function() {
		this.initParams();
		this.initElements();
		this.requestData();
	};
};
registerWidget("rss");