/**
 * @author mingguo
 */

var t_tag = function(m_data, m_content, m_edit){
	var content = null;	
	var tagUrl = 'http://blogz.sohu.com/microblog/c16091/s_hot_comment_1609_.inc?t=' + Time.now();

	this.initialize = function() {
		this.build();
		this.initElement();
	};
/*
	this.refresh = function(){
        this.build();
		this.initElement();
    };
*/
	this.destroy = function() {
		m_content.innerHTML = "";
	};
	
	this.build = function() {
		m_content.innerHTML = '数据加载中...';
	};
	this.initElement = function(noCache){
		var options = {
			nocache: noCache,
			onComplete: this.showContent.bind(this)
		};
		content = new App.ImpFile(tagUrl, options);		
	};
	this.showContent = function(content){
		var str = content.responseText;
		if (str == ''){
			m_content.innerHTML = App.Lang.analyseFileError;
			return;
		}
		str = str.replace('<form','<form target="_blank"');
		str = str.replace('搜索其他热点...','');
		str = str.replace('onclick=Mini.Search.clearSearchText()','');
		str = str.replace(/<a/g,'<a target="_blank"');
		m_content.innerHTML = str.replace(/<a/g,'<a target="_blank"');

	}
};
registerWidget('t_tag');
