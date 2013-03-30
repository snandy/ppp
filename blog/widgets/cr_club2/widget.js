/******* PP Set Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-10-27
//	Last Update: 2006-10-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
var cr_club2 = function(m_data, m_content, m_edit){
	var elmOutput;
	var club2;
	var dataHost = 'http://i.chinaren.com/sf/statics/json/json_crclub_40.js';
        //var setsListPath = '/json/json_crblog.jsp?boardid=40';


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
		if (!club2) {
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
						variable: 'feed_40',
						onLoad: this.showSetsList.bind(this),
						onFailure: this.noSetsList.bind(this)
						/*timeout: 5000
						timerStep: 500*/
					}});
	};
	this.showSetsList = function() {
		var str = '';
		club2=true;
		
	
		var elmDiv = document.createElement('div');	
		elmDiv.style.paddingLeft = '24px';
		str += '<div style="border:1px solid #ccc;padding:3px;margin:2px;width:200px;height:110px;overflow:hidden">';
		str += '<a href="' + feed_40.img_url + '" target="_blank" >';
		str += '<img src="' + feed_40.img_src + '" alt="" width="200" />';
		str += '</a>';
		str += '</div>';
		elmDiv.innerHTML = str;
		str="";
		elmOutput.innerHTML = "";
                elmOutput.appendChild(elmDiv);


		var elmUl = document.createElement('ul');	
		$A(feed_40.items).each(function(it, i){
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
			//elmItem.style.listStyle = 'url('+ App.Actions.imgPath +'arrowList.gif)';
			//elmItem.style.lineHeight = '22px';
			var elmLink = document.createElement("a");
			elmLink.href = it.link;
			elmLink.target = "_blank";
			//Element.addClassName(elmLink, 'texta');
			elmLink.appendChild(document.createTextNode(it.title.trim()));

			elmItem.appendChild(elmLink);
			if (pubTimeText) {
				elmItem.appendChild(document.createTextNode('  '+ pubTimeText));
			}

			elmUl.appendChild(elmItem);


		}.bind(this));
		elmOutput.appendChild(elmUl);
		elmDiv = document.createElement('div');
                elmDiv.className = "moreEntries";
                elmDiv.innerHTML = '<a target="_blank" href="'+feed_40.htmlUrl+'">¸ü¶à>></a>';
                elmOutput.appendChild(elmDiv);
	};

	this.noSetsList = function() {
		
	};
};
registerWidget('cr_club2');
