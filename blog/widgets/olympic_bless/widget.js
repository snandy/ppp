/******* olympic_bless Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2007-03-07
//	Last Update: 2007-03-07
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var olympic_bless = function(m_data, m_content, m_edit, w_path){
	var elmOutput;
	var elmOutput2;
	var elmClockFlash;
	this.getClockFlash = function () {
		var str = '';
		str += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="180" height="124">';
        str += '<param name="movie" value="'+ w_path +'olympicClock.swf" />';
        str += '<param name="quality" value="high" />';
		str += '<param name="wmode" value="transparent" />';
        str += '<embed src="'+ w_path +'olympicClock.swf" quality="high" width="180" height="124" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" wmode="opaque" />';
        str += '</object>';
		return str;
	}

	this.initialize = function() {
		this.build();
	};
	this.destroy = function() {
		this.destroyPPFlash();
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		try{
			Olympic.bless = null;
		}catch(e){}
		this.updateData(true);
	};
	this.destroyClockFlash = function() {
		if (!document) return;
		if (elmClockFlash) {
			Element.remove(elmClockFlash);
		}
	}
	
	this.build = function(noCache) {
		elmOutput = document.createElement('div');
		Element.addClassName(elmOutput, 'clockFlash');
		elmOutput.innerHTML = this.getClockFlash();
		elmClockFlash = elmOutput.firstChild;
		
		elmOutput2 = document.createElement('div');
		Element.addClassName(elmOutput2, 'bless');
		
		
		arr = [];
		arr.push('<div class="bless_m">');
		arr.push('<h4>啦啦队新闻</h4>');
		arr.push('<div></div>');
		arr.push('</div>');
		arr.push('<div class="bless_m">');
		arr.push('<h4>啦啦队活动</h4>');
		arr.push('<div></div>');
		arr.push('</div>');
		arr.push('<div class="bless_m" style="display:none;">');
		arr.push('<h4>奖牌榜</h4>');
		arr.push('<div></div>');
		arr.push('</div>');
		if (App.Permit.editModule) {
			arr.push('<div>');
			arr.push('<a href="http://up.sohu.com" target="_blank" class="score">　　　</a>');
			arr.push('<a href="http://wish.2008.sohu.com/register/register.php" target="_blank" class="join">　　　</a>');
			arr.push('<div style="clear:both;"></div>');
			arr.push('</div>');
		}
		
		elmOutput2.innerHTML = arr.join('');
		
		var ms = document.getElementsByClassName('bless_m', elmOutput2, 'div');
		if (ms && ms.length > 0) {
			if (ms[0]) {
				this.newsBox = ms[0].lastChild;
			}
			if (ms[1]) {
				this.actBox = ms[1].lastChild;
			}
			if (ms[2]) {
				this.medalBox = ms[2].lastChild;
			}
		}
		
		m_content.appendChild(elmOutput);
		m_content.appendChild(elmOutput2);
		
		this.updateData();
	};
	this.updateData = function(noCache) {
		this.newsBox.innerHTML = 'loading...';
		this.actBox.innerHTML = 'loading...';
		this.medalBox.innerHTML = 'loading...';
		
		var dataURL = 'http://wish.2008.sohu.com/admin/blog/data.php';
		new LinkFile(dataURL, {
					type: 'script',
					noCache: noCache,
					callBack: {
						variable: 'Olympic.bless',
						onLoad: this.loadedData.bind(this),
						onFailure: this.noData.bind(this)
						/*timeout: 20,
						timerStep: 500*/
					}});
	};
	this.loadedData = function() {
		this.loaded();
		this.showContent();
	};
	this.noData = function() {
		this.loaded();
		//this.totalCount.value = '----';
		//this.thisBlog.value = '----';
	}
	
	this.showContent = function() {
		var str_news = '';
		str_news += '<ul>';
		Olympic.bless.news.each(function(n) {
			str_news += '<li><a href="'+ n.url +'" target="_blank" title="'+ n.tit +'">'+ n.tit +'</a></li>';
		});
		str_news += '</ul>';
		str_news += '<a href="http://jiayou.2008.sohu.com" target="_blank" class="more">更多&gt;&gt;</a>';
		this.newsBox.innerHTML = str_news;
		
		
		var str_act = '';
		str_act += '<ul class="act">';
		Olympic.bless.act.each(function(n) {
			//str_act += '<tr><td title="'+ n.tit +'">'+ n.tit +'</td><td>'+ n.time +'</td><td><a href="'+ n.url +'" target="_blank">抢票</a></td></tr>';
			str_act += '<li><span title="'+ n.tit +'" style="width:110px;height:20px;">'+ n.tit +'</span><a href="'+ n.url +'" target="_blank" class="ticket">参加</a></li>';
		});
		str_act += '</ul>';
		str_act += '<a href="'+ Olympic.bless.actmore +'" target="_blank" class="more">更多&gt;&gt;</a>';
		this.actBox.innerHTML = str_act;

		if (Olympic.bless.medal) {
			var str_medal = '';
			str_medal += '<table>';
			str_medal += '<tr><td>&nbsp;</td><td><img src="'+ w_path +'images/ico_gold.gif" alt="金牌" class="medal" /></td><td><img src="'+ w_path +'images/ico_siller.gif" alt="银牌" class="medal" /></td><td><img src="'+ w_path +'images/ico_cuprum.gif" alt="铜牌" class="medal" /></td></tr>';
			Olympic.bless.medal.each(function(n) {
				str_medal += '<tr><td><img src="'+ n.ico +'" alt="'+ n.country +'" class="cntIco" />'+ n.country +'</td><td>'+ n.gold +'</td><td>'+ n.silver +'</td><td>'+ n.cuprum +'</td></tr>';
			});
			str_medal += '</table>';
			this.medalBox.innerHTML = str_medal;
		}
	}
};
registerWidget('olympic_bless');