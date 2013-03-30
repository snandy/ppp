/******* Friend_Rss Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-14
//	Last Update: 2006-08-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Feeds = function(m_data, m_content, m_edit){
	var feedLib = {
		        sohuHomeNews: {name: '�Ѻ���ҳ��������', url: '/rss/news/sohu_home.xml',hide:false},
                sohuFocusPics: {name: '�Ѻ�����ÿ�ս���', url: '/rss/news/pfocus.xml',hide:false},
                sohuFocusNews: {name: '�������Ľ�������', url: '/rss/news/focus.xml',hide:true},
                localNews: {name: '��������', url: '/rss/news/guonei.xml',hide:false},
                internationalNews: {name: '��������', url: '/rss/news/guoji.xml',hide:false},
                cityNews: {name: '�������', url: '/rss/news/shehui.xml',hide:false},
                militaryNews: {name: '��������', url: '/rss/news/junshi.xml',hide:false},
                sportsNews: {name: '��������', url: '/rss/news/sports.xml',hide:false},
                financeNews: {name: '�ƾ�����', url: '/rss/news/business.xml',hide:false},
                ITNews: {name: '�Ƽ�����', url: '/rss/news/it.xml',hide:false},
                educationNews: {name: '�Ľ�����', url: '/rss/news/learning.xml',hide:false},
                entertainmentNews: {name: '��������', url: '/rss/news/yule.xml',hide:false},
                autoPinglun: {name: '��������', url: '/rss/news/qichepinglun.xml',hide:false},
                sohuPic: {name: '�Ѻ�ͼ��', url: '/rss/news/lookbar.xml',hide:false},

                clubRssa:{name:'�Ѻ�����-�ȵ��Ƽ�',url:'/rss/club/photo-rss1.xml',hide:false},
                clubRssb:{name:'�Ѻ�����-�����Ƽ�',url:'/rss/club/photo-rss2.xml',hide:false},
                clubRss0:{name:'�Ѻ�����-���Ա���',url:'/rss/club/bagua.xml',hide:false},
                clubRss1:{name:'�Ѻ�����-���ڱ���',url:'/rss/club/beijing.xml',hide:false},
                clubRss2:{name:'�Ѻ�����-����80���',url:'/rss/club/80S.xml',hide:false},
                clubRss3:{name:'�Ѻ�����-Χ�ǹ���',url:'/rss/club/marriage.xml',hide:false},
                clubRss4:{name:'�Ѻ�����-���ҷ��',url:'/rss/club/myphoto.xml',hide:false},
                clubRss5:{name:'�Ѻ�����-��Цͼ��',url:'/rss/club/fun_pics.xml',hide:false},
                clubRss6:{name:'�Ѻ�����-���ݻ���',url:'/rss/club/face.xml',hide:false},
                clubRss7:{name:'�Ѻ�����-�Ҽ����',url:'/rss/club/licai.xml',hide:false},
                clubRss8:{name:'�Ѻ�����-������Ե',url:'/rss/club/netlove.xml',hide:false},
                clubRss9:{name:'�Ѻ�����-��Ʒ�ۿ�',url:'/rss/club/life1.xml',hide:false},
                clubRss10:{name:'�Ѻ�����-���Խ���',url:'/rss/club/health.xml',hide:false},
                clubRss11:{name:'�Ѻ�����-С˵���',url:'/rss/club/literature.xml',hide:false},
                clubRss12:{name:'�Ѻ�����-����ռ�',url:'/rss/club/xuanhuan.xml',hide:false},
                clubRss13:{name:'�Ѻ�����-���ɵش�',url:'/rss/club/free.xml',hide:false},
                clubRss14:{name:'�Ѻ�����-�����Ϻ�',url:'/rss/club/shanghai.xml',hide:false},
                clubRss15:{name:'�Ѻ�����-��������',url:'/rss/club/car.xml',hide:false},
                clubRss16:{name:'�Ѻ�����-��̸����',url:'/rss/club/wordplay.xml',hide:false},
                clubRss17:{name:'�Ѻ�����-����ɳ��',url:'/rss/club/fitness.xml',hide:false},
                clubRss18:{name:'�Ѻ�����-����ϲ��',url:'/rss/club/bride.xml',hide:false},
                clubRss19:{name:'�Ѻ�����-��ϱ��ϵ',url:'/rss/club/mom_daugh.xml',hide:false},
                clubRss20:{name:'�Ѻ�����-Ц�����',url:'/rss/club/joke.xml',hide:false},
                clubRss21:{name:'�Ѻ�����-��̽����',url:'/rss/club/whodunit.xml',hide:false},
                clubRss22:{name:'�Ѻ�����-���з���',url:'/rss/club/stock.xml',hide:false},
                clubRss23:{name:'�Ѻ�����-��Ӱ����',url:'/rss/club/movie.xml',hide:false},
                clubRss24:{name:'�Ѻ�����-Χ¯ҹ��',url:'/rss/club/star004.xml',hide:false},
                clubRss25:{name:'�Ѻ�����-������',url:'/rss/club/beginner.xml',hide:false},
                clubRss26:{name:'�Ѻ�����-��ʳ����',url:'/rss/club/food.xml',hide:false},
                clubRss27:{name:'�Ѻ�����-���ջ���',url:'/rss/club/Focus.xml',hide:false},
                clubRss28:{name:'�Ѻ�����-����ʥ��',url:'/rss/club/hero.xml',hide:false},
                clubRss29:{name:'�Ѻ�����-��˵����',url:'/rss/club/sohunews.xml',hide:false},
                clubRss30:{name:'�Ѻ�����-���Ѻ�',url:'/rss/club/hot.xml',hide:false},
                clubRss31:{name:'�Ѻ�����-��IT',url:'/rss/club/it.xml',hide:false},
                cmtRss1:{name:'����˵����-��������',url:'/rss/comment/blog_news_143746642.xml',hide:false},
                cmtRss2:{name:'����˵����-��������',url:'/rss/comment/blog_top_debate_24.xml',hide:false},
                chinarenRss1:{name:'Chinaren-�й���������',url:'/rss/club_cr/b0_top10.xml',hide:false},
                chinarenRss2:{name:'Chinaren-������Ů',url:'/rss/club_cr/b4_top10.xml',hide:false},
                chinarenRss3:{name:'Chinaren-����ͼͼ',url:'/rss/club_cr/b13_top10.xml',hide:false},
                chinarenRss4:{name:'Chinaren-������',url:'/rss/club_cr/b16_top10.xml',hide:false},
                chinarenRss5:{name:'Chinaren-��Ц��',url:'/rss/club_cr/b32_top10.xml',hide:false},
                chinarenRss6:{name:'Chinaren-FB����',url:'/rss/club_cr/b33_top10.xml',hide:false},
                chinarenRss7:{name:'Chinaren-�����ǿ�',url:'/rss/club_cr/b25_top10.xml',hide:false},
                chinarenRss8:{name:'Chinaren-�������',url:'/rss/club_cr/b8_top10.xml',hide:false},
                chinarenRss9:{name:'Chinaren-�����ռ�',url:'/rss/club_cr/b6_top10.xml',hide:false},
                chinarenRss10:{name:'Chinaren-����ռ��',url:'/rss/club_cr/b17_top10.xml',hide:false},
                chinarenRss11:{name:'Chinaren-У԰ԭ��',url:'/rss/club_cr/b5_top10.xml',hide:false},
                chinarenRss12:{name:'Chinaren-��������',url:'/rss/club_cr/b18_top10.xml',hide:false},
                chinarenRss13:{name:'Chinaren-�ű�ҵ',url:'/rss/club_cr/b12_top10.xml',hide:false},
				chinarenRss14:{name:'Chinaren-Ư�ں���',url:'/rss/club_cr/b11_top10.xml',hide:false},
                chinarenRss15:{name:'Chinaren-���л���',url:'/rss/club_cr/b7_top10.xml',hide:false},
                chinarenRss16:{name:'Chinaren-������',url:'/rss/club_cr/b29_top10.xml',hide:false},
                chinarenRss17:{name:'Chinaren-��֮��',url:'/rss/club_cr/b9_top10.xml',hide:false},
                focus1:{name:'Focus-����������',url:'/rss/focus/house_forum_elite.xml',hide:false},
                focus2:{name:'Focus-���ʲ����Ƽ�',url:'/rss/focus/blog_recommand.xml',hide:false},
                focus3:{name:'Focus-�Ƽ�¥�̶�̬',url:'/rss/focus/dmc_status.xml',hide:false},
                focus4:{name:'Focus-��������',url:'/rss/focus/house_news.xml',hide:false},
                focus5:{name:'Focus-�Ҿ�����',url:'/rss/focus/home_news.xml',hide:false},
                focus6:{name:'Focus-���ʼҾ���',url:'/rss/focus/home_forum_elite.xml',hide:false}/*
		sogouRss1:{name:'����˵��-��ͼ',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=��ͼ'},
		sogouRss2:{name:'����˵��-����',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=����'},
		sogouRss3:{name:'����˵��-���',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=���'},
		sogouRss4:{name:'����˵��-Ц��',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=Ц��'},
		sogouRss5:{name:'����˵��-�������',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=�������'},
		sogouRss6:{name:'����˵��-С���ع���',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=С���ع���'},
		sogouRss7:{name:'����˵��-��һ�ְ���������',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=��һ�ְ���������'},
		sogouRss8:{name:'����˵��-����',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=����'},
		sogouRss9:{name:'����˵��-���',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=���'},
		sogouRss10:{name:'����˵��-�ܽ���',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=�ܽ���'},
		sogouRss11:{name:'����˵��-����',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=����'},
		sogouRss12:{name:'����˵��-����',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=����'},
		sogouRss13:{name:'����˵��-Ҧ��',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=Ҧ��'}
*/		
	};
	var defaultNum = 10;
	var rss = '';
	var num = defaultNum;
	if (m_data) {
		rss = m_data.rss? m_data.rss : null;
		num = m_data.num || defaultNum;
	}
	var rndUpdateTime = Math.round(60*1000*Math.random());
	var intervalTime = 20*60*1000 + rndUpdateTime;
	var intervalObj;
	var elmOutput;
	var elmOutputE;
	var request;
	var feed;
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
		str += '<td width="40px">'+ App.Lang.newsFeeds +': </td>';
		str += '<td><select name="rss">'+ getFeedsList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>'+ App.Lang.rssNum +': </td>';
		str += '<td><select name="rssNum">'+ getNumList() +'</select></td>';
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
		if (rss == $F(this.rssIpt) && num == $F(this.numIpt)) {
			this.closeEdit();
			return;
		}
		lastRss = rss;
		rss = $F(this.rssIpt);
		num = $F(this.numIpt) || num || defaultNum;
		var data = new Object();
		data.rss = rss;
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
			elmOutput.innerHTML = App.Lang.selectFeedFirst;
			return;
		}
		elmOutput.innerHTML = App.Lang.loadModuleData;
		this.setTitle(App.Lang.loadModuleData);
		var url = feedLib[rss].url;
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
			//Element.addClassName(elmLink, 'texta');
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
					str += '<option value="'+(i+1)+'" selected="selected">'+ (i+1) +'</option>';
				} else {
					str += '<option value="'+(i+1)+'">'+ (i+1) +'</option>';
				}
			});
			return str;
		}
	}
	function getNumList() {
		var str = '';
		[1,2,3,4,5,6,7,8,9,10,15].each(function(n){
			if (n == num) {
				str += '<option value="'+ n +'" selected="selected">'+ n +'</option>';
			} else {
				str += '<option value="'+ n +'">'+ n +'</option>';
			}
		});
		return str;
	}
	function getFeedsList() {
		var str = '';
		$H(feedLib).each(function(f, i){
			if (f.value.hide == true){throw $continue;}
			if (f.key == rss) {
				str += '<option value="'+ f.key +'" selected="selected">'+ f.value.name +'</li>';
			} else {
				str += '<option value="'+ f.key +'">'+ f.value.name +'</li>';
			}
		});
		return str;
	}
};
registerWidget('Feeds');