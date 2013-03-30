/******* Friend_Rss Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-14
//	Last Update: 2006-08-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var Feeds = function(m_data, m_content, m_edit){
	var feedLib = {
		        sohuHomeNews: {name: '搜狐首页焦点新闻', url: '/rss/news/sohu_home.xml',hide:false},
                sohuFocusPics: {name: '搜狐新闻每日焦点', url: '/rss/news/pfocus.xml',hide:false},
                sohuFocusNews: {name: '新闻中心焦点新闻', url: '/rss/news/focus.xml',hide:true},
                localNews: {name: '国内新闻', url: '/rss/news/guonei.xml',hide:false},
                internationalNews: {name: '国际新闻', url: '/rss/news/guoji.xml',hide:false},
                cityNews: {name: '社会新闻', url: '/rss/news/shehui.xml',hide:false},
                militaryNews: {name: '军事新闻', url: '/rss/news/junshi.xml',hide:false},
                sportsNews: {name: '体育新闻', url: '/rss/news/sports.xml',hide:false},
                financeNews: {name: '财经新闻', url: '/rss/news/business.xml',hide:false},
                ITNews: {name: '科技新闻', url: '/rss/news/it.xml',hide:false},
                educationNews: {name: '文教新闻', url: '/rss/news/learning.xml',hide:false},
                entertainmentNews: {name: '娱乐新闻', url: '/rss/news/yule.xml',hide:false},
                autoPinglun: {name: '汽车评论', url: '/rss/news/qichepinglun.xml',hide:false},
                sohuPic: {name: '搜狐图吧', url: '/rss/news/lookbar.xml',hide:false},

                clubRssa:{name:'搜狐社区-热点推荐',url:'/rss/club/photo-rss1.xml',hide:false},
                clubRssb:{name:'搜狐社区-分类推荐',url:'/rss/club/photo-rss2.xml',hide:false},
                clubRss0:{name:'搜狐社区-八卦爆料',url:'/rss/club/bagua.xml',hide:false},
                clubRss1:{name:'搜狐社区-混在北京',url:'/rss/club/beijing.xml',hide:false},
                clubRss2:{name:'搜狐社区-生于80年代',url:'/rss/club/80S.xml',hide:false},
                clubRss3:{name:'搜狐社区-围城故事',url:'/rss/club/marriage.xml',hide:false},
                clubRss4:{name:'搜狐社区-真我风采',url:'/rss/club/myphoto.xml',hide:false},
                clubRss5:{name:'搜狐社区-搞笑图库',url:'/rss/club/fun_pics.xml',hide:false},
                clubRss6:{name:'搜狐社区-美容护肤',url:'/rss/club/face.xml',hide:false},
                clubRss7:{name:'搜狐社区-我家理财',url:'/rss/club/licai.xml',hide:false},
                clubRss8:{name:'搜狐社区-网上情缘',url:'/rss/club/netlove.xml',hide:false},
                clubRss9:{name:'搜狐社区-精品折扣',url:'/rss/club/life1.xml',hide:false},
                clubRss10:{name:'搜狐社区-两性健康',url:'/rss/club/health.xml',hide:false},
                clubRss11:{name:'搜狐社区-小说天地',url:'/rss/club/literature.xml',hide:false},
                clubRss12:{name:'搜狐社区-灵异空间',url:'/rss/club/xuanhuan.xml',hide:false},
                clubRss13:{name:'搜狐社区-自由地带',url:'/rss/club/free.xml',hide:false},
                clubRss14:{name:'搜狐社区-阿拉上海',url:'/rss/club/shanghai.xml',hide:false},
                clubRss15:{name:'搜狐社区-车行天下',url:'/rss/club/car.xml',hide:false},
                clubRss16:{name:'搜狐社区-杂谈酷评',url:'/rss/club/wordplay.xml',hide:false},
                clubRss17:{name:'搜狐社区-减肥沙龙',url:'/rss/club/fitness.xml',hide:false},
                clubRss18:{name:'搜狐社区-花嫁喜铺',url:'/rss/club/bride.xml',hide:false},
                clubRss19:{name:'搜狐社区-婆媳关系',url:'/rss/club/mom_daugh.xml',hide:false},
                clubRss20:{name:'搜狐社区-笑话天地',url:'/rss/club/joke.xml',hide:false},
                clubRss21:{name:'搜狐社区-侦探推理',url:'/rss/club/whodunit.xml',hide:false},
                clubRss22:{name:'搜狐社区-股市风云',url:'/rss/club/stock.xml',hide:false},
                clubRss23:{name:'搜狐社区-电影世界',url:'/rss/club/movie.xml',hide:false},
                clubRss24:{name:'搜狐社区-围炉夜话',url:'/rss/club/star004.xml',hide:false},
                clubRss25:{name:'搜狐社区-菜鸟交流',url:'/rss/club/beginner.xml',hide:false},
                clubRss26:{name:'搜狐社区-美食厨房',url:'/rss/club/food.xml',hide:false},
                clubRss27:{name:'搜狐社区-今日话题',url:'/rss/club/Focus.xml',hide:false},
                clubRss28:{name:'搜狐社区-武侠圣殿',url:'/rss/club/hero.xml',hide:false},
                clubRss29:{name:'搜狐社区-狐说百姓',url:'/rss/club/sohunews.xml',hide:false},
                clubRss30:{name:'搜狐社区-大话搜狐',url:'/rss/club/hot.xml',hide:false},
                clubRss31:{name:'搜狐社区-大话IT',url:'/rss/club/it.xml',hide:false},
                cmtRss1:{name:'我来说两句-网评排行',url:'/rss/comment/blog_news_143746642.xml',hide:false},
                cmtRss2:{name:'我来说两句-辩论排行',url:'/rss/comment/blog_top_debate_24.xml',hide:false},
                chinarenRss1:{name:'Chinaren-中国人闲聊区',url:'/rss/club_cr/b0_top10.xml',hide:false},
                chinarenRss2:{name:'Chinaren-型男索女',url:'/rss/club_cr/b4_top10.xml',hide:false},
                chinarenRss3:{name:'Chinaren-贴贴图图',url:'/rss/club_cr/b13_top10.xml',hide:false},
                chinarenRss4:{name:'Chinaren-娱乐旮旯',url:'/rss/club_cr/b16_top10.xml',hide:false},
                chinarenRss5:{name:'Chinaren-搞笑吧',url:'/rss/club_cr/b32_top10.xml',hide:false},
                chinarenRss6:{name:'Chinaren-FB生活',url:'/rss/club_cr/b33_top10.xml',hide:false},
                chinarenRss7:{name:'Chinaren-体育星空',url:'/rss/club_cr/b25_top10.xml',hide:false},
                chinarenRss8:{name:'Chinaren-情感世界',url:'/rss/club_cr/b8_top10.xml',hide:false},
                chinarenRss9:{name:'Chinaren-动漫空间',url:'/rss/club_cr/b6_top10.xml',hide:false},
                chinarenRss10:{name:'Chinaren-星座占卜',url:'/rss/club_cr/b17_top10.xml',hide:false},
                chinarenRss11:{name:'Chinaren-校园原创',url:'/rss/club_cr/b5_top10.xml',hide:false},
                chinarenRss12:{name:'Chinaren-行行摄摄',url:'/rss/club_cr/b18_top10.xml',hide:false},
                chinarenRss13:{name:'Chinaren-才毕业',url:'/rss/club_cr/b12_top10.xml',hide:false},
				chinarenRss14:{name:'Chinaren-漂在海外',url:'/rss/club_cr/b11_top10.xml',hide:false},
                chinarenRss15:{name:'Chinaren-城市话题',url:'/rss/club_cr/b7_top10.xml',hide:false},
                chinarenRss16:{name:'Chinaren-鬼话玄灵',url:'/rss/club_cr/b29_top10.xml',hide:false},
                chinarenRss17:{name:'Chinaren-人之初',url:'/rss/club_cr/b9_top10.xml',hide:false},
                focus1:{name:'Focus-房产精华帖',url:'/rss/focus/house_forum_elite.xml',hide:false},
                focus2:{name:'Focus-精彩博文推荐',url:'/rss/focus/blog_recommand.xml',hide:false},
                focus3:{name:'Focus-推荐楼盘动态',url:'/rss/focus/dmc_status.xml',hide:false},
                focus4:{name:'Focus-房产新闻',url:'/rss/focus/house_news.xml',hide:false},
                focus5:{name:'Focus-家居新闻',url:'/rss/focus/home_news.xml',hide:false},
                focus6:{name:'Focus-精彩家居帖',url:'/rss/focus/home_forum_elite.xml',hide:false}/*
		sogouRss1:{name:'最热说吧-贴图',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=贴图'},
		sogouRss2:{name:'最热说吧-婚姻',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=婚姻'},
		sogouRss3:{name:'最热说吧-情感',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=情感'},
		sogouRss4:{name:'最热说吧-笑话',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=笑话'},
		sogouRss5:{name:'最热说吧-春节晚会',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=春节晚会'},
		sogouRss6:{name:'最热说吧-小猪特工队',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=小猪特工队'},
		sogouRss7:{name:'最热说吧-有一种爱叫做放手',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=有一种爱叫做放手'},
		sogouRss8:{name:'最热说吧-爱情',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=爱情'},
		sogouRss9:{name:'最热说吧-李宇春',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=李宇春'},
		sogouRss10:{name:'最热说吧-周杰伦',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=周杰伦'},
		sogouRss11:{name:'最热说吧-娱乐',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=娱乐'},
		sogouRss12:{name:'最热说吧-基金',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=基金'},
		sogouRss13:{name:'最热说吧-姚明',url:'http://s.sogou.com/jsp/exinterface/getRss.jsp?spaceID=姚明'}
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