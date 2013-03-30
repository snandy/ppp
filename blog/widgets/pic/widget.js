/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2007-09-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var pic = function(m_data, m_content, m_edit){
	//var picUrl = 'http://search.pp.sohu.com/search?dir=pic&prefix_q=&no=3&start=1&num=20&orderStyle=docid&index=FullIndex&backurl=showpic.jsp&outputFormat=js&q=';
	var picUrl = 'http://search.pp.sohu.com/servlet/PhotoServlet?field=content&page=0&pagesize=20&outputFormat=js&query=';
	var request_pic;
	var elmOutput;
	var elmOutputE;
	var picQuery = '';
	var num = 3;
	var n = 0;
	var numPerPage = 10;
	var start = 0;
	var maxLoadPicTime = 10000;
	var loadPicTime = 0;
	var nextTimeout;
	if (m_data) {
		picQuery = m_data.q || '';
		num = m_data.num || 3;
	}

	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		clearTimeout(nextTimeout);
		resJs = null;
		Element.remove(elmOutput);
	};

	this.refresh = function() {
		this.updateData(true);
	};
	this.edit = function() {
		this.buildEdit();
	};
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="50px">'+ App.Lang.modTitle +': </td>';
		str += '<td><input type="text" name="textTitle" value="'+ (this.getTitle() || '') +'" class="text" /></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.picQuery +': </td>';
		str += '<td><input type="text" name="picQ" value="'+ (picQuery || '') +'" class="text" onfocus="this.select()" /></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.rssNum +': </td>';
		str += '<td><select name="picNum">'+ getNumList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		this.titleIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		this.picQIpt = elmOutputE.firstChild.rows[1].cells[1].firstChild;
		this.numIpt = elmOutputE.firstChild.rows[2].cells[1].firstChild;
		this.saveBtn = elmOutputE.firstChild.rows[3].cells[1].firstChild;
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.saveData = function() {
		if ($F(this.titleIpt).length>8) {
			var str = App.Lang.modTitleTooLong+'('+$F(this.titleIpt).length+App.Lang.word+')';
			str += '\n'+App.Lang.reduceTo+'8'+App.Lang.word;
			alert(str);
			$(this.titleIpt).focus();
			return;
		}
		if (this.getTitle() == $F(this.titleIpt).unescapeHTML() && picQuery == $F(this.picQIpt).trim() && num == $F(this.numIpt)) {
			this.closeEdit();
			return;
		}
		picQuery = $F(this.picQIpt).trim();
		num = $F(this.numIpt) || num;
		this.setTitle($F(this.titleIpt).unescapeHTML(), true);
		var data = {
			q: picQuery,
			num: num
		}
		this.save(data, $F(this.titleIpt).unescapeHTML());
		this.updateData();
	};

	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
		
	};
	this.updateData = function(noCache) {
		if (!picQuery) {
			elmOutput.innerHTML = App.Lang.setPicQuery;
			return;
		}
		elmOutput.innerHTML = App.Lang.loadModuleData;
		
		var picQueryUrl = picUrl + escape(picQuery);
		
		clearTimeout(nextTimeout);
		loadPicTime = 0;
		start = 0;
		n = 0;
		if (typeof resJs != 'undefined' && resJs) { // if loaded
			resJs = null;
		}
		new LinkFile(picQueryUrl, {type: 'script', noCache: noCache});
		this.waitForData();
	};
	this.waitForData = function() {
		if (typeof resJs != 'undefined' && resJs) { // if loaded
			this.loaded();
			this.showContent();
		} 
		else if (loadPicTime < maxLoadPicTime) {
			loadPicTime += 10;
			setTimeout(this.waitForData.bind(this), 10);
		}
		else {
			elmOutput.innerHTML = App.Lang.fileNotFound;
		}
	};
	this.showContent = function() {
		var str = '';
		if (resJs.RecordSet.length <= 0) {
			elmOutput.innerHTML = App.Lang.noPicQuery;
			return;
		}
		$A(resJs.RecordSet).each(function(p,i){
			if (i>=num) {
				throw $continue;
			}
			var desc = '';
			if (p.Description) {
				desc = p.Description.unescapeHTML();
			}
			else {
				desc = p.Title.unescapeHTML();
			}
			str += '<div style="border:1px solid #ccc;padding:3px;margin:2px;float:left;width:130px;height:98px;overflow:hidden">';
			str += '<a href="' + p.showPicUrl + '" target="_blank" title="'+ desc +'">';
			str += '<img src="' + p.ThumbnailImageUrl + '" alt="'+ desc +'" width="130" />';
			str += '</a>';
			str += '</div>';
		});
		
		elmOutput.innerHTML = str;
		
		start = start+(num-0);
		nextTimeout = setTimeout(this.chgPic.bind(this), 3000);
	};
	this.chgPic = function(init) {
		start ++;
		if (start >= resJs.RecordSet.length) {
			start = 0;
		}
		
		var pic = elmOutput.childNodes[n];
		if (pic && pic.firstChild) {
			Effect.Fade(pic.firstChild, { duration: 0.5, queue:{scope: 'pic', position: 'end'} });
			var picData = resJs.RecordSet[start];
			var desc = '';
			if (picData.Description) {
				desc = picData.Description.unescapeHTML();
			}
			else {
				desc = picData.Title.unescapeHTML();
			}
			var str = '';
			str += '<a href="' + picData.showPicUrl + '" target="_blank" title="'+ desc +'">';
			str += '<img src="' + picData.ThumbnailImageUrl + '" alt="'+ desc +'" width="130" />';
			str += '</a>';
			setTimeout(function(){
				pic.innerHTML = str;
				Element.setOpacity(pic.firstChild,0);
				Effect.Appear(pic.firstChild, { duration: 0.5, queue:{scope: 'pic', position: 'end'} });
			},500);
		}
		
		n++;
		if (n >= num || n >= resJs.RecordSet.length) {
			n = 0;
		}
		
		nextTimeout = setTimeout(this.chgPic.bind(this), 3000);
	};
	function getNumList() {
		var str = '';
		[1,2,3,4,5,6].each(function(n){
			if (n == num) {
				str += '<option value="'+ n +'" selected="selected">'+ n +'</option>';
			} else {
				str += '<option value="'+ n +'">'+ n +'</option>';
			}
		});
		return str;
	}
};
registerWidget('pic');
