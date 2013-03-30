/******* Say Favorite Bar Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2007-07-18
//	Last Update: 2007-07-18
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var say_favbar = function(m_data, m_content, m_edit){
	var elmOutput;
	var bars = '';
	var sysBars = '快乐男声 情感 婚姻 上证指数 有一种爱叫做放手 贵定 贴图 宋祖英 笑话 李宇春';
	if (m_data) {
		bars = m_data.bars || bars;
	}
	
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
	this.edit = function() {
		this.buildEdit();
	};
	this.buildEdit = function() {
		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" width="90%" cellpadding="2" cellspacing="0"><tr>';
		str += '<td>您关注的说吧名称，例如“快乐男生”(多个吧请用空格分割)：</td>';
		str += '</tr><tr>';
		str += '<td><textarea rows="6" style="width:95%;">'+ bars +'</textarea></td>';
		str += '</tr><tr>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		this.barsIpt = elmOutputE.firstChild.rows[1].cells[0].firstChild;
		this.saveBtn = elmOutputE.firstChild.rows[2].cells[0].firstChild;
		Event.observe(this.saveBtn, 'click', this.saveData.bindAsEventListener(this));
		
	};
	this.saveData = function() {
		if (bars == $F(this.barsIpt)) {
			this.closeEdit();
			return;
		}
		if (getTureLength($F(this.barsIpt)) > 500) {
			alert('内容过多，请控制在500字内');
			return;
		}
		bars = $F(this.barsIpt).unescapeHTML() || bars;
		var data = {
			bars: bars
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
		this.loadedData();
	}
	this.loadedData = function() {
		this.loaded();
		this.showContent();
	};
	this.noData = function() {
		this.loaded();
		return;
	}
	
	this.showContent = function() {
		var str = '';
		if (bars) {
			str += '<ul class="clearfix">';
			$A(bars.split(/\s/)).each(function(b) {
				str += '<li><a href="http://bbs.sogou.com/searchIn.do?query='+ escape(b) +'" target="_blank">'+ b +'</a></li>';
			});
			str += '</ul>';
		}
		else if (App.Permit.editModule) {
			str += '<div style="padding:5px 0 0 5px;">请点击“设置”，添加您关注的说吧。</div>';
		}
		str += '<div style="font-weight:bold;margin:10px 5px 3px;padding-top:5px;border-top:1px solid #ccc;">推荐的吧：</div>';
		str += '<ul>';
		$A(sysBars.split(/\s/)).each(function(b) {
			str += '<li><a href="http://bbs.sogou.com/searchIn.do?query='+ escape(b) +'" target="_blank">'+ b +'</a></li>';
		});
		str += '</ul>';
		str += '<div style="text-align: right;clear:both;"><a href="http://bbs.sogou.com" target="_blank">更多&gt;&gt;</a></div>';
		
		elmOutput.innerHTML = str;
	}
};
registerWidget('say_favbar');
