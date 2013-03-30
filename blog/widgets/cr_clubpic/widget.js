/******* PP Set Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-10-27
//	Last Update: 2006-10-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
var cr_clubpic = function(m_data, m_content, m_edit){
	var elmOutput;
	var clubpic;
	var num = 6;
	var n = 0;
	var numPerPage = 10;
	var start = 0;
	var maxLoadPicTime = 10000;
	var loadPicTime = 0;
	var nextTimeout;

	var dataHost = 'http://i.chinaren.com/sf/statics/json/json_crblog_6.js';
	//var setsListPath = '/html/json_crblog.jsp?act=2&type=6';


	this.initialize = function() {
		this.build();
	};
	this.destroy = function() {
		if (elmOutput) {
			Element.remove(elmOutput);
		}
	};
	this.saveData = function() {
		this.build();
	};
	/*this.refresh = function() {
		this.build(true);
	};*/
	this.build = function(nocache) {
		this.destroy();
		m_content.innerHTML = '';
		if (!clubpic) {
			elmOutput = document.createElement('div');
			elmOutput.innerHTML = App.Lang.loading;
			m_content.appendChild(elmOutput);
			this.getSetsList();
		}
		else {
			this.getSetsList();
		}
	};


	this.getSetsList = function() {
		var dataURL = dataHost;
		new LinkFile(dataURL, {
					type: 'script',
					callBack: {
						variable: 'resJsCR',
						onLoad: this.showSetsList.bind(this),
						onFailure: this.noSetsList.bind(this)
						/*timeout: 5000
						timerStep: 500*/
					}});
	};
	this.showSetsList = function() {
		var str = '';
		clubpic=true;

		if (resJsCR.RecordSet.length <= 0) {
			elmOutput.innerHTML = App.Lang.noPicQuery;
			return;
		}
		$A(resJsCR.RecordSet).each(function(p,i){
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
		if (start >= resJsCR.RecordSet.length) {
			start = 0;
		}

		var pic = elmOutput.childNodes[n];
		if (pic && pic.firstChild) {
			Effect.Fade(pic.firstChild, { duration: 0.5, queue:{scope: 'pic', position: 'end'} });
			var picData = resJsCR.RecordSet[start];
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
		if (n >= num || n >= resJsCR.RecordSet.length) {
			n = 0;
		}

		nextTimeout = setTimeout(this.chgPic.bind(this), 3000);
	};

	this.noSetsList = function() {

	};
};
registerWidget('cr_clubpic');
