/******* Latest Comments Widget **********/
//	Author: chenqj
//  2012-1-17 modify by snandy
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var latest_comments = function(m_data, m_content, m_edit){
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
		var me = this;
		if ($('latest_commentsData')) {
			this.loaded();
			elmOutput.innerHTML = $('latest_commentsData').innerHTML;
			$('latest_commentsData').innerHTML = '';
			Element.remove($('latest_commentsData'));
		}
		else {
			elmOutput.innerHTML = App.Lang.loadModuleData;
			
			var url = 'http://i.sohu.com/a/app/discuss/discusswidget.htm';
			url += '?xpt=' + _xpt + '&callback=?';
			jQuery.getJSON(url, function(json){
				me.loaded();
				if(json.status === 0 && json.data && json.data.length) {
					var str = jQuery(json.data).map(function(){
						var content = this.content;
						var url = this.oriurl;
						return '<li><a target="_blank" title="' + content + '" href="' + url + '#comment">' + content + '</a></li>';
					}).get().join('');

					elmOutput.innerHTML = '<ul>' + str + '</ul>';

				}else {
					elmOutput.innerHTML = '撰写精彩的日志，会获得更多关注。';
				}
				
			});
		}
	}

};
registerWidget('latest_comments');