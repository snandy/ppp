/******* PP Set Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-10-27
//	Last Update: 2006-10-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
var cr_group = function(m_data, m_content, m_edit){
	var elmOutput;
	var group;
	var num = 6;
	var n = 0;
	var numPerPage = 10;
	var start = 0;
	var maxLoadPicTime = 10000;
	var loadPicTime = 0;
	var nextTimeout;

	var dataHost = 'http://i.chinaren.com';
	var setsListPath = '/json/json_group.jsp?uid='+_xpt;

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
		if (!group) {
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
		var dataURL = dataHost + setsListPath;
		new LinkFile(dataURL, {
					type: 'script',
					callBack: {
						variable: 'group_path',
						onLoad: this.getSetsList2.bind(this),
						onFailure: this.noSetsList2.bind(this),
						timeout: 5000
					}});
	};
	this.getSetsList2 = function() {
		new LinkFile(group_path, {
					type: 'script',
					charset:"utf-8",
					callBack: {
						variable: ' mygroup',
						onLoad: this.showSetsList.bind(this),
						onFailure: this.noSetsList.bind(this)
						/*timeout: 10000
						timerStep: 500*/
					}});
	};
	this.noSetsList2 = function(){

	};
	this.showSetsList = function() {
		var str = '';
		group=true;
		var group0 = "",group1 = "" , group2 = "";	
	
		var elmUl = document.createElement('ul');	
		//elmUl.style.lineHeight = "24px";
		if(mygroup.groups.length <= 0 ) {
			elmUl.innerHTML = '<a href="http://go.chinaren.com/http://i.chinaren.com/group/searchgroup.jsp?type=10142" target="_blank">家庭群</a>，<a href="http://go.chinaren.com/http://i.chinaren.com/group/searchgroup.jsp?type=10059" target="_blank">朋友群</a>，<a href="http://go.chinaren.com/http://i.chinaren.com/group/searchgroup.jsp?type=10067" target="_blank">同事群</a>，<a href="http://go.chinaren.com/http://i.chinaren.com/group/searchgroup.jsp?type=10068" target="_blank">同学群</a>，<a href="http://go.chinaren.com/http://i.chinaren.com/group/searchgroup.jsp?type=10133" target="_blank">老乡群</a>...来来往往的人群穿梭于五味的生活，为何不见你的身影？';
		}else{
			if(App.Permit.editModule){
		        	elmUl.innerHTML = '<div style="text-align:right;"><a href="http://i.chinaren.com/group" style="font-weight:bold;color:red"  target="_blank">管理我的群</a></div><br>';
			}
			$A(mygroup.groups).each(function(it, i){
				//if (i >= num) throw $break;

				/*if (it.date && typeof it.date != 'undefined') {
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
				elmItem.title = it.name.trim();
				elmItem.style.listStyle = 'url('+ App.Actions.imgPath +'arrowList.gif)';
				var elmLink = document.createElement("a");
				elmLink.href = it.url;
				elmLink.target = "_blank";
				//Element.addClassName(elmLink, 'texta');
				elmLink.appendChild(document.createTextNode(it.name.trim()));

				elmItem.appendChild(elmLink);
				if (pubTimeText) {
					elmItem.appendChild(document.createTextNode('- '+ pubTimeText));
				}*/
				/*var elmItem = document.createElement('span');
				elmItem.title = it.name.trim();
				elmItem.style.lineHeight = "24px";*/
				if(it.figure == "0"){
					group0 +=  '<li><a href="'+it.url+'" target="_blank">'+it.name.trim()+'</a></li>';
				}
				if(it.figure == "1"){
					group1 += '<li><img src="http://images.chinaren.com/product/aluclub/images/monitor.gif">';
					group1 +=  '<a href="'+it.url+'" target="_blank">'+it.name.trim()+'</a></li>';
				}
				if(it.figure == "2"){
					group2 += '<li><img src="http://images.chinaren.com/product/aluclub/images/master.gif">';
					group2 +=  '<a href="'+it.url+'" target="_blank">'+it.name.trim()+'</a></li>';
                                }
				/*var elmLink = document.createElement("a");
                                elmLink.href = it.url;
                                elmLink.target = "_blank";
                                elmLink.appendChild(document.createTextNode(it.name.trim()));
                                elmItem.appendChild(elmLink);
				elmItem.appendChild(document.createTextNode("　　"));
				elmUl.appendChild(elmItem);*/


			}.bind(this));
			elmUl.innerHTML += group2 + group1 + group0;
		}
		elmOutput.innerHTML = "";
		elmOutput.appendChild(elmUl);
	
	};

	this.noSetsList = function() {
		elmOutput.innerHTML = '<a href="http://go.chinaren.com/http://i.chinaren.com/group/searchgroup.jsp?type=10142" target="_blank">家庭群</a>，<a href="http://go.chinaren.com/http://i.chinaren.com/group/searchgroup.jsp?type=10059" target="_blank">朋友群</a>，<a href="http://go.chinaren.com/http://i.chinaren.com/group/searchgroup.jsp?type=10067" target="_blank">同事群</a>，<a href="http://go.chinaren.com/http://i.chinaren.com/group/searchgroup.jsp?type=10068" target="_blank">同学群</a>，<a href="http://go.chinaren.com/http://i.chinaren.com/group/searchgroup.jsp?type=10133" target="_blank">老乡群</a>...来来往往的人群穿梭于五味的生活，为何不见你的身影？';
	};
};
registerWidget('cr_group');
