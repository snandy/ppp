/******* Tag Favorite Tag Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2007-07-19
//	Last Update: 2007-07-19
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var tag_favtag = function(m_data, m_content, m_edit){
	var elmOutput;
	var sysTagsBox;
	var request_tags;
	var dataUrl = '/inc/home/tag_index.inc';
	var tags = '';
	if (m_data) {
		tags = m_data.tags || tags;
	}
	
	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		request_tags = null;
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		this.updateData(true);
	};
	this.edit = function() {
		this.buildEdit();
	};
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" width="90%" cellpadding="2" cellspacing="0"><tr>';
		str += '<td>您关注的标签，例如“搜狐 博客”(多个标签请用空格分割)：</td>';
		str += '</tr><tr>';
		str += '<td><textarea rows="6" style="width:95%;">'+ tags +'</textarea></td>';
		str += '</tr><tr>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		this.tagsIpt = elmOutputE.firstChild.rows[1].cells[0].firstChild;
		this.saveBtn = elmOutputE.firstChild.rows[2].cells[0].firstChild;
		Event.observe(this.saveBtn, 'click', this.saveData.bindAsEventListener(this));
		
	};
	this.saveData = function() {
		if (tags == $F(this.tagsIpt)) {
			this.closeEdit();
			return;
		}
		if (getTureLength($F(this.tagsIpt)) > 500) {
			alert('内容过多，请控制在500字内');
			return;
		}
		tags = $F(this.tagsIpt).unescapeHTML() || tags;
		var data = {
			tags: tags
		}
		this.save(data);
		
		this.updateData();
	};
	
	
	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		this.loadedData(noCache);
	}
	this.loadedData = function(noCache) {
		this.showContent();
		this.getSysTags(noCache);
	};
	this.noData = function() {
		this.loaded();
		return;
	};
	
	this.showContent = function() {
		var str = '';
		if (tags) {
			str += '<ul class="clearfix">';
			$A(tags.split(/\s/)).each(function(b) {
				str += '<li><a href="http://tag.blog.sohu.com/search?type=tag&q='+ escape(b) +'" target="_blank">'+ b +'</a></li>';
				//str += '<li><a href="http://tag.blog.sohu.com/'+ encodeURIComponent(b) +'/" target="_blank">'+ b +'</a></li>';
			});
			str += '</ul>';
		}
		else if (App.Permit.editModule) {
			str += '<div style="padding:5px 0 0 5px;">请点击“设置”，添加您关注的标签。</div>';
		}
		str += '<div style="font-weight:bold;margin:10px 5px 3px;padding-top:5px;border-top:1px solid #ccc;">推荐的标签：</div>';
		str += '<div class="sysTagsBox">';
		str += '</div>';
		str += '<div style="text-align: right;clear:both;"><a href="http://tag.blog.sohu.com" target="_blank">更多&gt;&gt;</a></div>';
		
		elmOutput.innerHTML = str;
		sysTagsBox = document.getElementsByClassName('sysTagsBox', elmOutput, 'div')[0];
	};
	this.getSysTags = function(noCache) {
		var options = {
			nocache: noCache,
			onComplete: this.showSysTags.bind(this)
		};
		request_tags = new App.ImpFile(dataUrl, options);
	};
	this.showSysTags = function(request_tags) {
		this.loaded();
		if (!sysTagsBox) {return;}
		if (request_tags.responseText == '') {
			sysTagsBox.innerHTML = App.Lang.analyseFileError;
			return;
		}
		sysTagsBox.innerHTML = request_tags.responseText.replace('tag_cloud', '');
	};
};
registerWidget('tag_favtag');
