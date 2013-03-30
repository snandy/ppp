/******* Feeds Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-14
//	Last Update: 2006-06-25
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Feeds = function(m_data, m_content, m_edit){
	var feedLib = {
		sohuFocusPics: {name: '搜狐每日焦点图片', url: 'http://rss.news.sohu.com/rss/pfocus.xml'},
		sohuFocusNews: {name: '搜狐每日焦点新闻', url: 'http://rss.news.sohu.com/rss/focus.xml'},
		localNews: {name: '国内新闻', url: 'http://rss.news.sohu.com/rss/guonei.xml'},
		internationalNews: {name: '国际新闻', url: 'http://rss.news.sohu.com/rss/guoji.xml'},
		cityNews: {name: '社会新闻', url: 'http://rss.news.sohu.com/rss/shehui.xml'},
		militaryNews: {name: '军事新闻', url: 'http://mil.news.sohu.com/rss/junshi.xml'},
		sportsNews: {name: '体育新闻', url: 'http://rss.news.sohu.com/rss/sports.xml'},
		financeNews: {name: '产经新闻', url: 'http://rss.news.sohu.com/rss/business.xml'},
		ITNews: {name: 'IT新闻', url: 'http://rss.news.sohu.com/rss/it.xml'},
		educationNews: {name: '文教新闻', url: 'http://rss.news.sohu.com/rss/learning.xml'},
		entertainmentNews: {name: '娱乐新闻', url: 'http://rss.news.sohu.com/rss/yule.xml'},
		sohuPic: {name: '搜狐图吧', url: 'http://pic.sohu.com/view/rss/lookbar.xml'}
	};
	var defaultUserFeeds = ['toddBlog'];
	var defaultNum = 30;
	if (m_data) {
		var userFeeds = m_data.userFeeds || defaultUserFeeds;
		var num = m_data.num || defaultNum;
	}
	else {
		var userFeeds = defaultUserFeeds;
		var num = defaultNum;
	}
	var rndUpdateTime = Math.round(60*1000*Math.random());
	var intervalTime = 20*60*1000 + rndUpdateTime;
	var intervalObj;
	var elmInfo;
	var elmError;
	var elmOutput;
	var elmOutputE;
	var request;
	var items = [];
	var preLoadItems = [];
	
	this.initialize = function() {
		this.build();
		this.updateData();
		intervalObj = setInterval(this.updateData.bind(this), intervalTime);
	};
	this.destroy = function() {
		clearInterval(intervalObj);
		request = null;
		items = [];
	};
	this.refresh = function() {
		this.showInfo(App.Lang.loadModuleData);
		setTimeout(function(){this.updateData(true);}.bind(this), 10);
		
	};
	this.edit = function() {
		this.buildEdit();
	};
	
	
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="40px">'+ App.Lang.modTitle +': </td>';
		str += '<td><input type="text" name="textTitle" value="'+ (this.getTitle() || '') +'" class="input-text" /></td>';
		str += '</tr><tr>';
		str += '<td colspan="2">'+ App.Lang.newsFeeds +': </td>';
		str += '</tr><tr>';
		str += '<td colspan="2"><ul>'+ getFeedsList() +'</ul></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.rssNum +': </td>';
		str += '<td><select name="rssNum">'+ getNumList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="input-button" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		this.titleIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		this.feedsIpts = elmOutputE.firstChild.rows[2].cells[0].firstChild.getElementsByTagName('input');
		this.numIpt = elmOutputE.firstChild.rows[3].cells[1].firstChild;
		this.saveBtn = elmOutputE.firstChild.rows[4].cells[1].firstChild;
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};
	this.saveData = function() {
		var tmpUserFeeds = [];
		$A(this.feedsIpts).each(function(ipt) {
			if (ipt.type == 'checkbox' && ipt.checked) {
				tmpUserFeeds.push(ipt.value);
			}
		});
		if (this.getTitle() == $F(this.titleIpt) && tmpUserFeeds.join() == userFeeds.join() && num == $F(this.numIpt)) {
			this.closeEdit();
			return;
		}
		this.saveBtn.disabled = 'disabled';
		new Insertion.After(this.saveBtn, App.Lang.loading);
		lastUserFeeds = userFeeds;
		userFeeds = tmpUserFeeds || userFeeds || defaultUserFeeds;
		num = $F(this.numIpt) || num || defaultNum;
		var data = new Object();
		data.userFeeds = userFeeds;
		data.num = num;
		this.setTitle($F(this.titleIpt).unescapeHTML(), true);
		this.save(data, $F(this.titleIpt).unescapeHTML());
		if (lastUserFeeds.join() != userFeeds.join()) {
			this.showInfo(App.Lang.loadModuleData);
			setTimeout(this.updateData.bind(this), 10);
		}
		else {
			setTimeout(this.showContent.bind(this), 10);
		}
	};
	this.endSave = function() {
		if (this.saveBtn && this.saveBtn.nextSibling) {
			Element.remove(this.saveBtn.nextSibling);
			new Insertion.After(this.saveBtn, App.Lang.saved);
			setTimeout(function(){
				Element.remove(this.saveBtn.nextSibling);
				this.saveBtn.disabled = '';
			}.bind(this), 1000);
		}
	};
	this.build = function() {
		elmError = document.createElement('div');
		Element.addClassName(elmError, 'error');
		m_content.appendChild(elmError);
		
		elmInfo = document.createElement('div');
		Element.addClassName(elmInfo, 'info');
		m_content.appendChild(elmInfo);
		
		elmOutput = document.createElement('div');
		Element.addClassName(elmOutput, 'itemsContainer');
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		this.hideError();
		if (!userFeeds || userFeeds.length <= 0 || $A(userFeeds).all(function(f){return(feedLib[f]=='undefined'||!feedLib[f]);})) {
			this.showInfo(App.Lang.selectFeedFirst);
			return;
		}
		items = [];
		preLoadItems = userFeeds.select(function(){return true});
		this.loadRssFile(noCache);
	};
	this.loadRssFile = function(noCache) {
		if (preLoadItems.length) {
			var uf = preLoadItems.shift();
			if (feedLib[uf]) {
				var url = feedLib[uf].url;
				var options = {
					nocache: noCache || false,
					onComplete: this.analyseContent.bind(this),
					data: {uf:uf,noCache:noCache}
				};
				this.showInfo(App.Lang.loadModuleData +'['+ feedLib[uf].name +']');
				setTimeout(function(){request = new App.ImpFile(url, options);}.bind(this), 10);
			}
		}
	};
	this.analyseContent = function(request, json, data) {
		this.hideInfo();
		if (preLoadItems.length <= 0) {
			this.loaded();
		}
		else {
			this.loadRssFile(data.noCache);
		}
		if (request.responseText == '' || request.responseXML.documentElement==null) {
			this.showError(App.Lang.analyseFileError +'['+ feedLib[data.uf].name +']');
			return;
		}
		Element.cleanWhitespace(request.responseXML.documentElement);
		var feedXML = new Feed(request);
		$A(feedXML.items).each(function(it){
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
			
			var liItem = document.createElement('li');
			var str = '';
			str += '<span style="width:10px;overflow:hidden;">';
			str += '<img src="'+ App.Actions.imgPath +'arrowList.gif" class="'+ data.uf +'" />';
			str += '</span>';
			str += '<a href="'+ it.link.trim() +'" target="_blank">';
			str += it.title.unescapeHTML();
			str += '</a>';
			str += '- '+ feedXML.title.unescapeHTML();
			str += ' <span class="pubTime">'+ pubTimeText +'</span>';
			liItem.innerHTML = str;
			
			liItem.onmouseover = function() {
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
				str += feedXML.title.unescapeHTML();
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
			liItem.onmouseout = function() {
				clearTimeout(timeID);
			};
			items.push({pubDate:parseInt(pubDate),liItem:liItem});
			
		}.bind(this));
		this.showContent();
	};
	this.showContent = function() {
		if (!items || items.length===0) return;
		try{
			items.sort(function(a, b){
				return(b.pubDate - a.pubDate);
			});
		}catch(e){}
		if (elmOutput.firstChild) {
			Element.remove(elmOutput.firstChild);
		}
		elmOutput.appendChild(document.createElement('ul'));
		$A(items).each(function(it, i){
			if (!isNaN(num) && i > num) {throw $break;}
			elmOutput.firstChild.appendChild(it.liItem);
		});
		this.getIco();
		//this.buildEdit();
	};
	this.showError = function(error) {
		elmError.style.display = 'block';
		var str = '';
		str += '<div style="border-bottom:1px solid #eee">';
		str += error;
		str += '</div>';
		elmError.innerHTML += str;
	};
	this.hideError = function() {
		elmError.innerHTML = '';
		elmError.style.display = 'none';
	};
	this.showInfo = function(info) {
		elmInfo.style.display = 'block';
		elmInfo.innerHTML = info;
	};
	this.hideInfo = function() {
		elmInfo.innerHTML = '';
		elmInfo.style.display = 'none';
	};
	/*function getIco(url) {
		reg = new RegExp("^http:\/\/([^\/])*\/","gi");
		var icoUrl = reg.exec(url)[0] +'favicon.ico';
		return(icoUrl);
	};*/
	this.getIco = function() {
		$A(userFeeds).each(function(uf){
			var reg = new RegExp("^http:\/\/([^\/])*\/","gi");
			var url = feedLib[uf].url;
			var icoUrl = reg.exec(url)[0] +'favicon.ico';
			var tmp = document.createElement('img');
			tmp.onload = function() {
				var elements = document.getElementsByClassName(uf, elmOutput);
				$A(elements).each(function(e) {
					e.src  = icoUrl;
					e.style.height = '10px';
				});
			};
			tmp.src = icoUrl;
		});
	};
	function getNumList() {
		var str = '';
		[5,10,20,30,40,50].each(function(n){
			if (n == num) {
				str += '<option value="'+ n +'" selected>'+ n +'</option>';
			} else {
				str += '<option value="'+ n +'">'+ n +'</option>';
			}
		});
		return str;
	}
	function getFeedsList() {
		var str = '';
		$H(feedLib).each(function(f, i){
			if ($A(userFeeds).any(function(_f){return(f.key == _f)})) {
				str += '<li><input type="checkbox" value="'+ f.key +'" checked="checked" />'+ f.value.name +'</li>';
			} else {
				str += '<li><input type="checkbox" value="'+ f.key +'" />'+ f.value.name +'</li>';
			}
		});
		return str;
	}
};
registerWidget('Feeds');