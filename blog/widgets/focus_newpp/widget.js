/******* Hello World Widget **********/
//	Author: mingguo
//	First Created: 2009-09-14
//	Last Update: 2009-09-14
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var focus_newpp = function(m_data, m_content, m_edit){
	var focusVn = 'focuspp';
	var limit = 10;
	var dataHost = 'http://blog.focus.cn';
	var dataPath = '/sohu_json/sohu_sjs_list.php?xp=' + _xpt + '&n=' + limit + '&vn=' + focusVn;
	var elmOutput;
	var elmOutputE;
	
	var fjlx = {'name':'��������','id':'fjlx','opt':['��ѡ��','����','����','����','����','����','����','����','����','����','����','����']};
	var fwlx = {'name':'��������','id':'fwlx','opt':['��ѡ��','һ��','����','����','�ľ�','��ʽ','Ծ��','����','����','д��¥','����']};
	var fengge = {'name':'��Ʒ��','id':'fengge','opt':['��ѡ��','��ʽ','ŷʽ','��԰','�ִ�','�ŵ�','�ݻ�','��Լ','Ѥ��','����','����']};
	var sediao = {'name':'��ɫ��','id':'sediao','opt':['��ѡ��','��ɫ','��ɫ','��ɫ','��ɫ','��ɫ','��ɫ','��ɫ','��ɫ','��ɫ','��ɫ','��ɫ','����']};
	var jiage = {'name':'�۸�','id':'jiage','opt':['��ѡ��','2������','2-5��','5-10��','10-30��','30������','����']};
	var categoryArray = [fjlx,fwlx,fengge,sediao,jiage];	
	
	var titleValue = '';
	var fjlxValue = 0;
	var fwlxValue = 0;
	var fenggeValue = 0;
	var sediaoValue = 0;
	var jiageValue = 0;

	if (m_data) {
		fjlxValue = m_data.fjlx || 0;
		fwlxValue = m_data.fwlx || 0;
		fenggeValue = m_data.fengge || 0;
		sediaoValue = m_data.sediao || 0;
		jiageValue = m_data.jiage || 0;
		limit = m_data.limit || 10;
	}
	
	
	//��������������dataURL
	function getSetPathJson(fjlxValue,fwlxValue,fenggeValue,sediaoValue,jiageValue,limit){
		dataPath = '/sohu_json/sohu_sjs_list.php?xp=' + _xpt + '&n=' + limit + '&vn=' + focusVn;
  	if (fjlxValue > 0)
  		dataPath += '&fjlx=' + fjlxValue;
  	if (fwlxValue > 0)
  		dataPath += '&fwlx=' + fwlxValue;
  	if (fenggeValue > 0)
  		dataPath += '&fengge=' + fenggeValue;
  	if (sediaoValue > 0)
  		dataPath += '&sediao=' + sediaoValue;
  	if (jiageValue > 0)
  		dataPath += '&jiage=' + jiageValue;
  	
  	var str = dataHost + dataPath;
  	return str;
	}	
	
	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		if (elmOutput) {
			Element.remove(elmOutput);
		}
	};
	this.refresh = function() {
		this.updateData(true);
	};
	this.build = function() {
		this.destroy();
		elmOutput = document.createElement('div');
		Element.addClassName(elmOutput, 'sjzp');
		elmOutput.innerHTML = App.Lang.loading;
		m_content.appendChild(elmOutput);
	};
	this.edit = function() {
		this.buildEdit();
	};
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		elmOutputE.innerHTML = this.getEditStr();
		m_edit.appendChild(elmOutputE);
		
		this.titleIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		this.fjlxIpt = elmOutputE.firstChild.rows[1].cells[1].firstChild;
		this.fwlxIpt = elmOutputE.firstChild.rows[2].cells[1].firstChild;
		this.fenggeIpt = elmOutputE.firstChild.rows[3].cells[1].firstChild;
		this.sediaoIpt = elmOutputE.firstChild.rows[4].cells[1].firstChild;
		this.jiageIpt = elmOutputE.firstChild.rows[5].cells[1].firstChild;
		this.limitIpt = elmOutputE.firstChild.rows[6].cells[1].firstChild;
		this.saveBtn = elmOutputE.firstChild.rows[7].cells[1].firstChild;
		
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
		
		//setTimeout(this.updateData.bind(this), 10);
	};
	this.saveData = function() {
		if (getTureLength($F(this.titleIpt))>16) {
			var str = App.Lang.modTitleTooLong+'('+getTureLength($F(this.titleIpt))+App.Lang.byte+')';
			str += '\n'+App.Lang.reduceTo+'16'+App.Lang.byte+'(8'+App.Lang.chsWord+')';
			alert(str);
			$(this.titleIpt).focus();
			return;
		}
		
		if (typeof focuspp == 'undefined' || !focuspp) {
			this.closeEdit();
			return;
		}
		if (this.getTitle() == $F(this.titleIpt).unescapeHTML() && fjlxValue == $F(this.fjlxIpt) && fwlxValue == $F(this.fwlxIpt) && fenggeValue == $F(this.fenggeIpt) && sediaoValue == $F(this.sediaoIpt) && jiageValue == $F(this.jiageIpt) && limit == $F(this.limitIpt)) {
			this.closeEdit();
			return;
		}
		
		this.setTitle($F(this.titleIpt).unescapeHTML(), true);
		//titleValue = $F(this.titleIpt).unescapeHTML();
		fjlxValue = $F(this.fjlxIpt);
		fwlxValue = $F(this.fwlxIpt);
		fenggeValue = $F(this.fenggeIpt);
		sediaoValue = $F(this.sediaoIpt);
		jiageValue = $F(this.jiageIpt);
		limit = $F(this.limitIpt);
		
		var data = {
			fjlx:fjlxValue,
			fwlx:fwlxValue,
			fengge:fenggeValue,
			sediao:sediaoValue,
			jiage:jiageValue,
			limit:limit	
		}
		this.save(data,$F(this.titleIpt).unescapeHTML());
		this.updateData();
	};
	this.updateData = function(noCache) {
		var dataURL = getSetPathJson(fjlxValue,fwlxValue,fenggeValue,sediaoValue,jiageValue,limit);
		elmOutput.innerHTML = App.Lang.loadModuleData;
		new LinkFile(dataURL, {
					type: 'script',
					noCache: noCache,
					callBack: {
						variable: focusVn,
						onLoad: this.loadedData.bind(this),
						onFailure: this.noData.bind(this)
						/*timeout: 20,
						timerStep: 500*/
					}});
	}
	this.loadedData = function() {
		this.loaded();
		this.showContent();
	};
	this.noData = function() {
		this.loaded();
		elmOutput.innerHTML = App.Lang.fileNotFound;
	}
	
	this.showContent = function() {
		var str = '';
		if (focuspp.length <= 0) {
			elmOutput.innerHTML = App.Lang.noSets;
			return;
		}
		var status = focuspp.status;
		var total = focuspp.total;
		var moreUrl = focuspp.moreUrl;
		
  	if (status == 1){		
  		if (typeof(focuspp.data) == 'undefined' || focuspp.data.length == 0){
  			if (App.Permit.editModule)
  				str += '<div class="sjzp">����δ�ύ�����������Ʒ��<a href="http://pp.sohu.com/people/!' + _xpt + '" target="_blank">����ȥ����ύ</a></div>';
  			else
  				str += '<div class="sjzp">�����ʦ��δ�ύ�����Ʒ</div>';
  		}else{
  			for (var i=0;i<focuspp.data.length;i++){
  				var data = focuspp.data[i];
  				var image = data.image;
  				var link = data.link;
  				var name = data.name;
  				var category = data.category;
  				str += '<span><a href="' + link + '" target="_blank" title="' + name + '"><img src="' + image + '"/></a></span>';
  			}
  			str += '<div class="clear"></div>';
  			if (total > limit)
  				str += '<div class="more"><a href="' + moreUrl + '" target="_blank">���� &raquo;</a></div>';
  		}
  	}else{
  		if (App.Permit.editModule)
  			str += '<div class="sjzp">���Ĳ��Ͳ��������ʦ���ͣ�<a href="http://blog.focus.cn/sohu_sjs_photos.php" target="_blank">���Ͽ�ͨ���ʦ���͹���</a></div>';
  		else
  			str += '<div class="sjzp">�ò��Ͳ������ʦ����</div>';
  	}		
		
		elmOutput.innerHTML = str;
	}
	
	//����������
	this.getEditStr = function(){
		var str = '';
		var selectArray = [fjlxValue,fwlxValue,fenggeValue,sediaoValue,jiageValue];
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="60px">ģ������: </td>';
		str += '<td><input type="text" name="title" value="' + (this.getTitle() || '') + '"/></td>';
		str += '</tr>';
		
		for (var i=0;i<categoryArray.length;i++){
			var obj = categoryArray[i];
			var label = obj.name;
			var name = obj.id;
			var optArray = obj.opt;
			var selectId = selectArray[i]
			str += '<tr>';
			str += '<td>' + label + ': </td>';
			str += '<td><select name="' + name + '">' + getCategoryOpt(optArray,selectId) + '</select></td>';
			str += '</tr>';
		}
		
		str += '<tr>';
		str += '<td>��ʾ��Ŀ: </td>';
		str += '<td><select name="limit">' + getNumList() + '</select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		return str;
	}
	
	function getCategoryOpt(optArray,selectId){
		var str = '';
    
    for (var i=0;i<optArray.length;i++){
    	if (i == selectId) {
				str += '<option value="'+ i +'" selected="selected">'+ optArray[i] +'</option>';
			} else {
				str += '<option value="'+ i +'">'+ optArray[i] +'</option>';
			}
    }
		return str;
	}

	function getNumList() {
		var str = '';
		[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].each(function(n){
			if (n == limit) {
				str += '<option value="'+ n +'" selected="selected">'+ n +'</option>';
			} else {
				str += '<option value="'+ n +'">'+ n +'</option>';
			}
		});
		return str;
	}
};
registerWidget('focus_newpp');
