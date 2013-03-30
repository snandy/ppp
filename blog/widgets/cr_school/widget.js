/******* PP Set Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-10-27
//	Last Update: 2006-10-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
var cr_school = function(m_data, m_content, m_edit){
	var elmOutput;
	var school;
	var dataHost = 'http://i.chinaren.com';
        var setsListPath = '/json/json_school.jsp?uid='+_xpt;


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
	this.build = function(nocache) {
		this.destroy();
		m_content.innerHTML = '';
		if (!school) {
			elmOutput = document.createElement('div');
			//elmOutput.innerHTML = App.Lang.hasNotSetWitchSet;
			elmOutput.innerHTML = App.Lang.loading;
			m_content.appendChild(elmOutput);
			this.getSetsList();
		}
		else {
			this.getSetsList();
		}
	};


	this.getSetsList = function() {
		var dataURL = dataHost + setsListPath;
		new LinkFile(dataURL, {
					type: 'script',
					callBack: {
						variable: '_cr_school',
						onLoad: this.showSetsList.bind(this),
						onFailure: this.noSetsList.bind(this)
						/*timeout: 5000
						timerStep: 500*/
					}});
	};
	this.showSetsList = function() {
		var str = '';
		school = true;
		//var title = '<a href="'+ feed_34.htmlUrl +'" target="_blank" title="'+ feed_34.title +'">'+ feed_34.title +'</a>';
		//this.setTitle(title);
		var elmUl = document.createElement('ul');	
		if(_cr_school.items.length <= 0) {
			elmUl.innerHTML = '关注母校就留下她的名字吧。<a href="" target="blank">填写学校</a>';
		}else{
			$A(_cr_school.items).each(function(it, i){
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
		}
		elmOutput.innerHTML = "";
		elmOutput.appendChild(elmUl);
	};

	this.noSetsList = function() {
		elmOutput.innerHTML = '关注母校就留下她的名字吧。<a href="" target="blank">填写学校</a>';
	};
};
registerWidget('cr_school');
