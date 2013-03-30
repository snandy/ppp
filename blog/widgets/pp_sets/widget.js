/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-03-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var pp_sets = function(m_data, m_content, m_edit){
	var dataHost = 'http://blog.sohu.com/a/album';
	var dataPath = '/json/setlist*' + _ept + '*10.html';
	var elmOutput;
	var elmMng;
	
	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		Element.remove(elmOutput);
	};
	this.refresh = function() {
		eval("photosets=null");
		this.updateData(true);
	};
	this.build = function() {
		elmMng = document.createElement('div');
		var str = '';
		if(App.Permit.editModule){
			str += '<div style="text-align:right">';
			str += '<a href="javascript:ToolBar.getPPUploadPath();" onmousedown="CA.q(\'blog_widget_sets_uploadPhoto\');">';
			str += '<img src="http://js1.pp.sohu.com.cn/ppp/group/toolbar/themes/default/images/ico_ppUpload.gif" alt="'+ App.Lang.pp_upload +'"align="absbottom" />';
			str += App.Lang.pp_upload;
			str += '</a> | ';
			str += '<a href="http://blog.sohu.com/people/!' + _xpt + '/album/" target="_blank" onmousedown="CA.q(\'blog_widget_sets_manage\');">';
			str += '管理';
			str += '</a></div>';
			str += '<hr />';
		}
		elmMng.innerHTML = str;
		
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		m_content.appendChild(elmMng);
		m_content.appendChild(elmOutput);
	};
	this.updateData = function(noCache) {
		if(App.Permit.editModule){
			var dataURL = dataHost + dataPath + '?o=true&ca='+timeStamp();
		}else{
			var dataURL = dataHost + dataPath;
		}
		elmOutput.innerHTML = App.Lang.loadModuleData;
		new LinkFile(dataURL, {
					type: 'script',
					noCache: noCache,
					callBack: {
						variable: 'photosets',
						onLoad: this.loadedData.bind(this),
						onFailure: this.noData.bind(this)
					}});
	}
	this.loadedData = function() {
		this.loaded();
		this.showContent();
	};
	this.noData = function() {
		this.loaded();
		elmOutput.innerHTML = App.Lang.fileNotFound;
	}
	
	this.showContent = function() {
		var str = '';
		if (photosets.length <= 0) {
			elmOutput.innerHTML = App.Lang.noSets;
			return;
		}
		var size = 0;
		$A(photosets).each(function(p,i){
			if(p.id){
				str += '<div class="ppset">';
				str += '<div class="ppsetIco">';
				str += '<a title="'+ p.name.unescapeHTML() +'" href="'+ p.viewurl +(App.Permit.editModule? '?o=true&ca='+timeStamp() : '')+'" target="_blank">';
				str += '<img alt="'+ p.name.unescapeHTML() +'" src="'+ p.cover +'">';
				str += '</a>';
				str += '</div>';
				str += '<div class="ppsetText">';
				str += '<h5>';
				str += '<a title="'+ p.name.unescapeHTML() +'" href="'+ p.viewurl +'" target="_blank">';
				str += p.name.unescapeHTML();
				str += '</a>';
				str += '</h5>';
				str += '<p>'+ p.desc +'</p>';
				str += '<p class="ppsetCount">['+ p.photoCount +'张]</p>';
				str += '</div>';
				str += '</div>';
				
				size++;
			}
		});
		
		if(size == 0){
			elmOutput.innerHTML = App.Lang.noSets;
			return;
		}
		if(ppuserid){
//			str += '<div class="more"><a href="http://pp.sohu.com/setlist.jhtml?method=list&userId=' + ppuserid + '" target="_blank">查看全部专辑</a></div>';
			str += '<div class="more"><a href="http://blog.sohu.com/people/!' + _xpt + '/album/setlist.jhtml?method=list&userId=' + ppuserid + '" target="_blank">查看全部专辑</a></div>';
		}
		elmOutput.innerHTML = str;
	}
};
registerWidget('pp_sets');
