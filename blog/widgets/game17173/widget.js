/******* Clock Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-11-16
//	Last Update: 2006-11-16
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var game17173 = function(m_data, m_content, m_edit){
	var dataUrl = '/rss/17173.xml';
	var request_game17173;
	var elmOutput;

	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		request_game17173 = null;
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
		var options = {
			nocache: noCache,
			onComplete: this.showContent.bind(this)
		};
		request_game17173 = new App.ImpFile(dataUrl, options);
	};
	this.showContent = function(request_game17173) {
		this.loaded();
		if (request_game17173.responseText == '') {
			this.setTitle(App.Lang.error);
			elmOutput.innerHTML = App.Lang.analyseFileError;
			return;
		}
		if (!request_game17173.responseXML)  {
			return this.notWebFormed(request_game17173);
		}
		var xmlDom = request_game17173.responseXML;
		var top = xmlDom.getElementsByTagName('top')[0];
		if (top) {
			var topItem = top.getElementsByTagName('item');
		}
		var testing = xmlDom.getElementsByTagName('testing')[0];
		if (testing) {
			var testingItem = testing.getElementsByTagName('item');
		}
		
		var arr = [];
		if (topItem) {
			arr.push('<div class="top">');
			arr.push('<h5>最新网游排名</h5>');
			arr.push('<table cellpadding="0" cellspacing="0">');
			/*arr.push('<thead><tr>');
			arr.push('<td>名次</td>');
			arr.push('<td>游戏名称</td>');
			arr.push('<td>票数</td>');
			arr.push('</tr></thead>');*/
			arr.push('<tbody>');
			$A(topItem).each(function(t,i) {
				if (i >= 5) {throw $break;}
				arr.push('<tr>');
				arr.push('<td class="num">'+ (i+1) +'</td>');
				arr.push('<td><a href="'+ t.getAttribute('url') +'" target="_blank">'+ t.getAttribute('name').unescapeHTML() +'</a></td>');
				arr.push('<td class="count">'+ t.getAttribute('count').unescapeHTML() +'</td>');
				arr.push('</tr>');
			});
			
			arr.push('</tbody>');
			arr.push('</table>');
			arr.push('</div>');
		}
		
		if (testingItem) {
			arr.push('<div class="testing">');
			arr.push('<h5>网游测试时间</h5>');
			arr.push('<table cellpadding="0" cellspacing="0">');
			/*arr.push('<thead><tr>');
			arr.push('<td>日期</td>');
			arr.push('<td>游戏名称</td>');
			arr.push('<td>状态</td>');
			arr.push('</tr></thead>');*/
			arr.push('<tbody>');
			$A(testingItem).each(function(t,i) {
				if (i >= 10) {throw $break;}
				arr.push('<tr>');
				arr.push('<td class="date">'+ t.getAttribute('date').unescapeHTML() +'</td>');
				arr.push('<td><a href="'+ t.getAttribute('url') +'" target="_blank">'+ t.getAttribute('name').unescapeHTML() +'</a></td>');
				arr.push('<td class="text">'+ t.getAttribute('text').unescapeHTML() +'</td>');
				arr.push('</tr>');
			});
			
			arr.push('</tbody>');
			arr.push('</table>');
			arr.push('<div class="more"><a href="http://newgame.17173.com/game_list.php" target="_blank">查看全部网游测试时间表</a></div>');
			arr.push('</div>');
		}
		
		
		elmOutput.innerHTML = arr.join('');
	};
};

registerWidget('game17173');