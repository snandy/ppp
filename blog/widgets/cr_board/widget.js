/******* PP Set Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-10-27
//	Last Update: 2006-10-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
var cr_board = function(m_data, m_content, m_edit){
	var elmOutput;
	var board;
	var dataHost = 'http://i.chinaren.com/sf/statics/json/json_crblog_9.js';
        //var setsListPath = '/html/json_crblog.jsp?act=2&type=9';


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
		if (!board) {
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
		var dataURL = dataHost ;
		new LinkFile(dataURL, {
					type: 'script',
					callBack: {
						variable: 'feednews_9',
						onLoad: this.showSetsList.bind(this),
						onFailure: this.noSetsList.bind(this)
						/*timeout: 5000
						timerStep: 500*/
					}});
	};
	this.showSetsList = function() {
		var str = '';
		board=true;
		
	
		var elmUl = document.createElement('ul');	
		$A(feednews_9.items).each(function(it, i){
			//if (i >= num) throw $break;

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
					var pubTimeText = (pubTime.getMonth()+1) +'-'+ pubTime.getDate();
					pubTimeText += ' '+ pubTime.getHours() +':'+ pubTime.getMinutes() ;
				}
			}
			else {
				pubTimeText = '';
			}

			var elmItem = document.createElement('li');
			elmItem.title = it.title.trim();
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


		}.bind(this));
		elmOutput.innerHTML = "";
		elmOutput.appendChild(elmUl);
		var elmDiv = document.createElement('div');
                elmDiv.className = "moreEntries";
                elmDiv.innerHTML = '<a target="_blank" href="'+feednews_9.htmlUrl+'">¸ü¶à>></a>';
                elmOutput.appendChild(elmDiv);
	};

	this.noSetsList = function() {
		
	};
};
registerWidget('cr_board');
