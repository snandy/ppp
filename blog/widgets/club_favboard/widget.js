/******* Club Favorite Board Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2007-07-17
//	Last Update: 2007-07-17
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var club_favboard = function(m_data, m_content, m_edit){
	//var dataPath = '/clubfavboard.js';
	var dataPath = 'http://club.sohu.com/more/blog/blog_fav_interface.php?cn='+ _xpt;
	var elmOutput;
	
	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		this.updateData(true);
	};
	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		elmOutput.innerHTML = App.Lang.loadModuleData;
		if(App.Permit.editModule){
			var dataURL = dataPath + '&o=true&ca='+timeStamp();
		}else{
			var dataURL = dataPath;
		}
		elmOutput.innerHTML = App.Lang.loadModuleData;
		new LinkFile(dataURL, {
					type: 'script',
					noCache: noCache,
					callBack: {
						variable: 'Club.favBoard',
						onLoad: this.loadedData.bind(this),
						onFailure: this.noData.bind(this)
						/*timeout: 20,
						timerStep: 500*/
					}});
	}
	this.loadedData = function() {
		this.loaded();
		this.showContent();
	};
	this.noData = function() {
		this.loaded();
		if(typeof(Club) == 'undefined') window.Club = {};
		window.Club.favBoard = {
			"boards": [
				{"dis":"������·", "url":"http://club.news.sohu.com/l-help-0-0-0-0.html"},
				{"dis":"��������", "url":"http://club.news.sohu.com/l-board-0-0-0-0.html"},
				{"dis":"��̸����", "url":"http://club.book.sohu.com/l-wordplay-0-0-0-0.html"},
				{"dis":"���Ѻ�", "url":"http://club.yule.sohu.com/l-hot-0-0-0-0.html"},
				{"dis":"���ջ���", "url":"http://club.news.sohu.com/l-Focus-0-0-0-0.html"},
				{"dis":"��ͷ������", "url":"http://club.news.sohu.com/l-bigworld-0-0-0-0.html"}
			],
			"allBoard": "http://club.sohu.com/main.php?url=http://club.sohu.com/map/club_map.html"
		};	
		this.showContent();
		return;
	}
	
	this.showContent = function() {
		if (!Club.favBoard.boards || Club.favBoard.boards.length <= 0) {
			this.noData();
			return;
		}
		var str = '';
		if(App.Permit.editModule){
			str += '<div class="infoBox" style="margin-bottom:5px;">';
			str += '���������<a href="'+ Club.favBoard.allBoard +'" target="_blank">��������</a>��������ϲ���İ棬Ȼ���������������ء������ɽ����ղء�';
			str += '</div>';
		}
		str += '<ul>';
		$A(Club.favBoard.boards).each(function(b) {
			str += '<li><a href="'+ b.url +'" target="_blank">'+ b.dis +'</a></li>';
		});
		str += '</ul>';
		
		elmOutput.innerHTML = str;
	}
};
registerWidget('club_favboard');
