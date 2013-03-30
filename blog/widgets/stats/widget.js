/******* Stats Widget **********/
//	Author: chenqj
//  Modify by snandy 2012-2-20 评论总数接口更换
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var stats = function(m_data, m_content, m_edit){
	var dataUrl = '/action/ebi_' + _ebi + '-m_view-type_stats/widget/';
	var request_stats;
	var elmOutput;
        var maxLoadRsTime = 20000;
        var loadRsTime = 0;

	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		request_stats = null;
		Element.remove(elmOutput);
	};
	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if ($('statsData')) {
			elmOutput.innerHTML = $('statsData').innerHTML;
			$('statsData').innerHTML = '';
			Element.remove($('statsData'));
			this.showCountImg();
			this.updateSogouRank();
		}
		else {
			elmOutput.innerHTML = App.Lang.loadModuleData;
			var options = {
				nocache: noCache,
				onComplete: this.showContent.bind(this)
			};
			if(App.Permit.editModule){
				var requestUrl = dataUrl + '?o=true';
			}else{
				var requestUrl = dataUrl;
			}
			request_stats = new App.ImpFile(requestUrl, options);
		}
	};
	this.showContent = function(request_stats) {
		if (request_stats.responseText == '') {
			this.setTitle(App.Lang.error);
			elmOutput.innerHTML = App.Lang.analyseFileError;
			return;
		}
		elmOutput.innerHTML = request_stats.responseText;
		this.showCountImg();
		
		// update comments
		var url = 'http://i.sohu.com/a/app/discuss/discusswidget.htm';
		url += '?xpt=' + _upt + '&callback=?';
		jQuery.getJSON(url, function(json){
			if(json.status === 0 && json.totalCount) {
				var span = jQuery('li', elmOutput)[2].getElementsByTagName('span')[0];
				span.innerHTML = json.totalCount + '篇';
			}
			
		});
	};
	this.showCountImg = function() {
		if(window.top.location==window.location && _blog_domain && _upt) {
			var sImg = '<img src="http://stat.i.sohu.com/guest/count/piccount.do?type=0&xpt=' + _upt + '&t=' + new Date().getTime() + '" id="statusImg" align="middle" />';
			//var sImg = '<img src="http://stat.pic.sohu.com/blogcount?u='+_blog_domain+'&t='+c+'&v='+getCookie('I')+'" alt="访问数" id="statusImg" align="middle" />';
			$('statusCount').innerHTML = '访问：'+sImg;
		}
	};

	this.updateSogouRank = function() {
		if($('sogouRank') && _blog_domain) {
			var sogouRankDataUrl = 'http://act.blog.sohu.com/json/' + _blog_domain + '/sogou_rank.js';
			new LinkFile(sogouRankDataUrl, {
							type: 'script',
							callBack: {
								variable: 'sogou_rank',
								onLoad: this.showSogouRank.bind(this),
								onFailure: this.noSogouRank.bind(this)
								/*timeout: 20,
								timerStep: 500*/
							}});
		}
	};

	this.showSogouRank = function() {
		if (sogou_rank != null && sogou_rank>= 0) {
			var rankText = sogou_rank;
		}
		else {
			var rankText = '--';
		}
		var str = '';
		str += '<div>指数：</div>';
		str += '<a href="http://www.sogou.com/web?query=link:'+ _blog_domain +'.blog.sohu.com" target="_blank">';
		str += '<span title="看看谁链接到这里" class="imgborder">';
		str += '<img src="http://www.sogou.com/images/pr.gif" width="'+ sogou_rank +'%" alt="Sogou Rank:'+ rankText +'" />';
		str += '</span>';
		str += '</a>';
		str += '<span>'+ rankText +' <a href="http://www.sogou.com/features/sogourank.html" target="_blank" style="text-decoration: none;border: 1px solid #ccc; padding:0 3px;">?</a></span>';
		$('sogouRank').innerHTML = str;
	};
	this.noSogouRank = function() {
		//elmOutput.innerHTML = App.Lang.fileNotFound;
	}
};
registerWidget('stats');
