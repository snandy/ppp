/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-03-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var delicious = function(m_data, m_content, m_edit){
	var dataUrlPrefix = 'http://del.icio.us/feeds/json/';
	var request_data;
	var elmOutput;
	var elmOutputE;
	var user = '';
	var num = 5;
	var n = 0;
	var maxLoadRsTime = 20000;
	var loadRsTime = 0;
	var nextTimeout;
	if (m_data) {
		user = m_data.u || '';
		num = m_data.num || 5;
	}

	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		clearTimeout(nextTimeout);
		Delicious = null;
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
		str += '<td>”√ªß</td>';
		str += '<td><input type="text" name="user" value="'+ (user || '') +'" class="text" onfocus="this.select()" /></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.rssNum +': </td>';
		str += '<td><select name="rsNum">'+ getNumList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		this.userQIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		this.numIpt = elmOutputE.firstChild.rows[1].cells[1].firstChild;
		this.saveBtn = elmOutputE.firstChild.rows[2].cells[1].firstChild;
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.saveData = function() {
		if (user == $F(this.userQIpt).trim() && num == $F(this.numIpt)) {
			this.closeEdit();
			return;
		}
		user = $F(this.userQIpt).trim();
		num = $F(this.numIpt) || num;
		var data = {
			u: user,
			num: num
		}
		this.save(data);
		this.updateData();
	};

	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
		
	};
	this.updateData = function(noCache) {
		if (!user) {
			elmOutput.innerHTML = App.Lang.setDelUser;
			return;
		}
		elmOutput.innerHTML = App.Lang.loadModuleData;
		
		var userUrl = dataUrlPrefix + user + '?count=' + num + '&c='+ timeStamp();
		
		clearTimeout(nextTimeout);
		loadRsTime = 0;
		if (typeof Delicious != 'undefined' && Delicious) { // if loaded
			delete Delicious;
		}
		new LinkFile(userUrl, {type: 'script', charset: 'utf-8'});
		this.waitForData();
	};
	this.waitForData = function() {
		if (typeof Delicious != 'undefined' && Delicious) { // if loaded
			this.loaded();
			this.showContent();
		} 
		else if (loadRsTime < maxLoadRsTime) {
			loadRsTime += 10;
			setTimeout(this.waitForData.bind(this), 10);
		}
		else {
			elmOutput.innerHTML = App.Lang.fileNotFound;
		}
	};
	
	function showImage(img, spaceImg){
		return (function(){ img.style.display='inline'; spaceImg.style.display='none';});
	};
	this.showContent = function() {
		if (Delicious.length <= 0) {
			elmOutput.innerHTML = App.Lang.noDelItem;
			return;
		}
		
		if (elmOutput.firstChild) {
			Element.remove(elmOutput.firstChild);
		}
		
		var ul = document.createElement('ul');
		$A(Delicious.posts).each(function(post,i){
		  	if (i>=num) {
				throw $continue;
			}
			var li = document.createElement('li');
			var a = document.createElement('a');
			var spaceImg = document.createElement('img');
			spaceImg.style.display = 'inline';
			spaceImg.src='http://js.pp.sohu.com/ppp/blog/styles/images/spacer.gif';
			spaceImg.width=spaceImg.height=16;
			var img = document.createElement('img');
			img.style.display = 'none';
			img.src = post.u.split('/').splice(0,3).join('/')+'/favicon.ico';
			img.width=img.height=16;
			img.onload = showImage(img, spaceImg);
			a.href = post.u;
			a.title = post.d;
			a.target = '_blank';
			a.appendChild(document.createTextNode(post.d));
			li.appendChild(spaceImg);
			li.appendChild(img);
			li.appendChild(a);
			ul.appendChild(li);
		});
		elmOutput.appendChild(ul);
		var more = document.createElement('div');
		more.className = 'more';
		more.innerHTML = '<a href="http://del.icio.us/' + user + '/" target="_blank">'+ App.Lang.more +'</a>';
		elmOutput.appendChild(more);
	};
	function getNumList() {
		var str = '';
		[1,2,3,4,5,6,7,8,9,10].each(function(n){
			if (n == num) {
				str += '<option value="'+ n +'" selected="selected">'+ n +'</option>';
			} else {
				str += '<option value="'+ n +'">'+ n +'</option>';
			}
		});
		return str;
	};
};
registerWidget('delicious');
