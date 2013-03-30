/******* Friend_Rss Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-14
//	Last Update: 2006-08-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Friend_Rss = function(m_data, m_content, m_edit){
	var defaultNum = 10;
	var rss = 'admin';
	var num = defaultNum;
	if (m_data) {
		rss = m_data.domain? m_data.domain.trim() : null;
		num = m_data.num || defaultNum;
	}
	var rndUpdateTime = Math.round(60*1000*Math.random());
	var intervalTime = 20*60*1000 + rndUpdateTime;
	var intervalObj;
	var elmOutput;
	var elmOutputE;
	var request;
	var feed;
/*	
	this.initialize = function() {
		//...
	};
	this.edit = function() {
		//...
	};
	this.onCloseEdit = function() {
		//...
	};
	this.refresh = function() {
		//...
	};
	this.destory = function() {
		//...
	};
	this.save(Object: data);
	this.loaded();
	this.setIco(String: src);
	this.setTitle(String: title);
*/
	this.initialize = function() {
		this.build();
		this.updateData();
		intervalObj = setInterval(this.updateData.bind(this), intervalTime);
	};
	this.destroy = function() {
		clearInterval(intervalObj);
		request = null;
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
		str += '<td width="40px">'+ App.Lang.friendDomain +': </td>';
		str += '<td><input type="text" name="rssUrl" value="'+ (rss || '') +'" class="text" style="width:30px;" onfocus="this.select()" />.blog.sohu.com</td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.rssNum +': </td>';
		str += '<td><select name="rssNum">'+ getOptionList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		this.rssIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		this.numIpt = elmOutputE.firstChild.rows[1].cells[1].firstChild;
		this.saveBtn = elmOutputE.firstChild.rows[2].cells[1].firstChild;
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.saveData = function() {
		if (rss == $F(this.rssIpt).trim() && num == $F(this.numIpt)) {
			this.closeEdit();
			return;
		}
		lastRss = rss;
		rss = $F(this.rssIpt).trim();
		num = $F(this.numIpt) || num || defaultNum;
		var data = new Object();
		data.domain = rss;
		data.num = num;
		this.save(data);
		if (lastRss != $F(this.rssIpt).trim()) {
			this.updateData();
		}
		else {
			this.showContent();
		}
	};
	this.build = function() {
		elmOutput = document.createElement('div');
		Element.addClassName(elmOutput, 'itemsContainer');
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if (!rss) {
			elmOutput.innerHTML = App.Lang.setDomainFirst;
			return;
		}
		elmOutput.innerHTML = App.Lang.loadModuleData;
		this.setTitle(App.Lang.loadModuleData);
		//var url = '/members/'+rss+'/rss';
		var url = 'http://'+rss+'.blog.sohu.com/rss';
		var options = {
			nocache: noCache || false,
			onComplete: this.analyseContent.bind(this)
		};
		request = new App.ImpFile(url, options);
		//this.getIco();
	};
	this.analyseContent = function(request) {
		this.loaded();
		if (request.responseText == '' || request.responseXML.documentElement==null) {
			this.setTitle(App.Lang.error);
			elmOutput.innerHTML = App.Lang.analyseFileError;
			return;
		}
		Element.cleanWhitespace(request.responseXML.documentElement);
		feed = new Feed(request);
		this.showContent();
	};
	this.showContent = function() {
		if (!feed || !feed.title) return;
		var title = '<a href="'+ feed.htmlUrl +'" target="_blank" title="'+ feed.title +'">'+ feed.title +'</a>';
		this.setTitle(title);
		
		elmOutput.innerHTML = '';
		var elmUl = document.createElement('ul');
		$A(feed.items).each(function(it, i){
			if (i >= num) throw $break;
			
			if (it.date && typeof it.date != 'undefined') {
				var pubDate = Date.parse(it.date.trim());
				if (!isNaN(pubDate)) {
					var pubTime = new Date(pubDate);
				}
				else {
					var tmp, reg = new RegExp("(\\d{4})-(\\d{1,2})-(\\d{1,2})","gi");
					tmp = reg.exec(it.date.trim());
					if (tmp) {
						var y = tmp[1];
						var m = tmp[2]-1;
						var d = tmp[3];
					}
					reg = new RegExp("(\\d{2}):(\\d{1,2})(:(\\d{1,2}))?","gi");
					tmp = reg.exec(it.date.trim());
					if (tmp) {
						var h = tmp[1];
						var mi = tmp[2];
						var s = tmp[4] || null;
					}
					var pubTime = new Date(y,m,d,h,mi,s);
					pubDate = pubTime.getTime();
				}
				if (pubTime) {
					var pubTimeText = pubTime.getFullYear() +'-'+ (pubTime.getMonth()+1) +'-'+ pubTime.getDate();
					pubTimeText += ' '+ pubTime.getHours() +':'+ pubTime.getMinutes() +':'+ pubTime.getSeconds();
				}
			}
			else {
				pubTimeText = '';
			}
			
			var elmItem = document.createElement('li');
			elmItem.style.listStyle = 'url('+ App.Actions.imgPath +'arrowList.gif)';
			var elmLink = document.createElement("a");
			elmLink.href = it.link;
			elmLink.target = "_blank";
			elmLink.appendChild(document.createTextNode(it.title.trim()));
			
			elmItem.appendChild(elmLink);
			if (pubTimeText) {
				elmItem.appendChild(document.createTextNode('- '+ pubTimeText));
			}
			
			elmUl.appendChild(elmItem);
			
			
			elmItem.onmouseover = function() {
				var contentValue = '';
				var desc = it.description;
				if (desc && desc.hasChildNodes()) {
					for (var n=desc.firstChild; n!=null; n=n.nextSibling) {
						if (n.innerHTML) {
							contentValue += n.innerHTML;
						} else if (n.nodeValue) {
							contentValue += n.nodeValue;
						}
					}
				}
				contentValue = contentValue.unescapeHTML();
				contentValue = contentValue.substr(0, 200);
				contentValue += '...';
				var str = '';
				str += '<div><strong>'+ it.title.unescapeHTML() +'</strong></div>';
				str += '<div style="padding:0 3px;border-bottom:1px solid #ccc;margin-bottom:5px;color:#999">';
				str += ' <span style="font-family: Arial, Helvetica, sans-serif;font-size: 10px;color: #999;">'+ pubTimeText +'</span>';
				str += '</div>';
				str += '<div>'+ contentValue +'</div>';
				var self = this;
				
				new App.ToolTip(self, str, 250, "left");
				$('tooltip').style.display = "none";
				function showPopup() {
					(Browser.ua.indexOf('ie')>=0)? 
						Element.show($('tooltip')) : 
						Effect.Appear($('tooltip'), { duration: 0.3, queue: {scope: $('tooltip').id, position: 'end'} });
					//$('tooltip').style.display = "block";
				}
				timeID = setTimeout(showPopup, 500);
			};
			elmItem.onmouseout = function() {
				clearTimeout(timeID);
			};
		}.bind(this));
		elmOutput.appendChild(elmUl);
		this.buildEdit();
	};
	this.getIco = function() {
		reg = new RegExp("^(http|https|ftp):\/\/([^\/])*\/","gi");
		var icoUrl = reg.exec(rss)[0] +'favicon.ico';
		var tmp = document.createElement('img');
		tmp.onload = function() {
			this.setIco(icoUrl);
		}.bind(this);
		tmp.src = icoUrl;
	};
	function getOptionList() {
		if (feed) {
			var str = '';
			$A(feed.items).each(function(it, i){
				if ((i+1) == num) {
					str += '<option value="'+(i+1)+'" selected>'+ (i+1) +'</option>';
				} else {
					str += '<option value="'+(i+1)+'">'+ (i+1) +'</option>';
				}
			});
			return str;
		}
	}
};
registerWidget('Friend_Rss');