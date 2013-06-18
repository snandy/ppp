var isIE = document.all ? true: false;
if (isIE) {
	window.opener = window.dialogArguments.win;
}
if (!window.JSON) {
	window.JSON = opener.JSON;
}
function $(id) {
	if (typeof(id) == "string") return document.getElementById(id);
	else return id;
}
function timeStamp() {	
	var now = new Date();
	return (now.getTime());
}
function getCookie(name){
	var tmp, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)","gi");
	if( tmp = reg.exec( unescape(document.cookie) ) )
		return(tmp[2]);
	return null;
}
function setCookie(name, value, expires, path, domain) {
	var str = name + "=" + escape(value);
	if (expires) {
		if (expires == 'never') {expires = 100*365*24*60;}
		var exp = new Date(); 
		exp.setTime(exp.getTime() + expires*60*1000);
		str += "; expires="+exp.toGMTString();
	}
	if (path) {str += "; path=" + path;}
	if (domain) {str += "; domain=" + domain;}
	document.cookie = str;
}
//	把一段普通的字符串转换成为一段html内容
function escapeHTML(str) {
	str = str.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;").replace(/'/gm, "&#39;");
	return str||'';
}
//	把多行的内容换成一行
function noMultiline(str) {
	str = str.replace(/\r/gm,"").replace(/\n/,"");
	return str;
}

var defaultSetCount = 10;
var defaultPhotoCount = 15;
var defaultSetCount_flash = 9;
var displayTab = 0;

function getAlign()	{
	if($("f_align").checked) return $("f_align").value;
	if($("f_align_left").checked) return $("f_align_left").value;
	if($("f_align_center").checked) return $("f_align_center").value;
	if($("f_align_right").checked) return $("f_align_right").value;
	return "";
}

function setFlashPhoto(jsonObj) {
	var photos = jsonObj.data.photoList,
		photoLength = photos.length;

	var param = {
		type: 'flash',
		kind: flashCfg.selectedMode,
		url: flashCfg.selectedCover,
		name: noMultiline(escapeHTML(flashCfg.selectedName)),
		desc: noMultiline(escapeHTML(flashCfg.selectedDesc)),
		link: 'http://pp.sohu.com/u/' + flashCfg.userId + '/f' + flashCfg.selectedSet,
		count: photoLength,
		data: []
	};
	var selectNum = parseInt($("showPhotoCount").value, 10);
	if (selectNum>0 && selectNum<photoLength) {
		photoLength = selectNum
	}
	for (var i=0; i<photoLength; i++) {
		var photoNow = photos[i],
			uId      = photoNow.creatorId,
			pId      = photoNow.showId,
			url      = photoNow.originUrl + '_c150',
			link     = "http://pp.sohu.com/u/" + uId + "/p" + pId,
			alt      = noMultiline(escapeHTML(photoNow.uploadAtDesc));
		param.data.push({url:url,alt:alt,link:link});
	}
	if (param.count > 0) {
		callback(param)
	} else {
		alert("此专辑中没有任何图片！");
	}
}
function getSetList(pageNo) {
	flashCfg.setListCtr.innerHTML = "正在读取专辑信息......";
	flashCfg.setPageNo = pageNo;
	var url = 'http://pp.sohu.com/folders/' + pageNo + '.jsonp';
	var option = {
		param: 'pageSize='+defaultSetCount_flash,
		charset: 'utf-8',
		success: setSetList,
		failure: failure
	};
	Sjax.get(url, option);
}
function setSetList(jsonObj) {
	var listStr = '',
		pageStr = '',
		photosets = jsonObj.folderList;

	flashCfg.userId = jsonObj.creator.userId;

	if (photosets.length == 0) {
		Tabs.hasPP = false;
		hideBotton();
		listStr = '您还没有公开的相册专辑，何不去<a href="http://pp.sohu.com" target="_blank">创建</a>一个?';
	} else {
		var i, len = photosets.length,
			prePage = flashCfg.setPageNo-1,
			nextPage = jsonObj.hasNextPage ? flashCfg.setPageNo+1 : 0;
		
		for (i=0; i<len; i++) {
			var setNow = photosets[i];
			if (setNow && setNow.showId) {
				var pId = setNow.showId,
					pName = setNow.name,
					pDesc = setNow.description || '',
					pCover = (setNow.cover||{}).url,
					pCount = setNow.photoNum;
				listStr += '<div id="photoSet'+pId+'" onclick="selectSet(\'' + pId + '\', \'' + pCover + '\', \'' + pName + '\', \'' + pDesc + '\')" class="' + ((flashCfg.selectedSet==pId)?"albumCoverPicSelected":"albumCoverPic") + '"><div class="albumCover"><img src="' + pCover + '" height="75" width="75" class="coverPic" /></div><div class="albumTitle">'+pName+'</div></div>';
			}
		}
		pageStr += '<input type="button" value="上一页" onclick="getSetList(' + prePage + ');" ' + (prePage>0 ? '' : 'disabled') + ' class="' +(prePage>0 ? 'buttonEnable' : 'buttonDisable') + '" />';
		pageStr += '&nbsp;<input type="button" value="下一页" onclick="getSetList(' + nextPage + ');" ' + (nextPage>1 ? '' : 'disabled') + ' class="' + (nextPage>1 ? 'buttonEnable' : 'buttonDisable') +'"/>';
	}
	flashCfg.setListCtr.innerHTML = listStr;
	flashCfg.setPageCtr.innerHTML = pageStr;
}
function selectSet(setId, cover, name, desc) {
	if(flashCfg.selectedSet != "") {
		var oldSet = $("photoSet" + flashCfg.selectedSet);
		if(oldSet) oldSet.className = "albumCoverPic";
	}
	flashCfg.selectedSet = setId;
	flashCfg.selectedCover = cover;
	flashCfg.selectedName = name || '';
	flashCfg.selectedDesc = desc || '';
	$("photoSet" + setId).className = "albumCoverPicSelected";
}
function selectMode(id) {
	$("showMode" + id).checked = true;
	flashCfg.selectedMode = id;
}

function getAlbums(pageNo) {
	var url = 'http://pp.sohu.com/folders/' + pageNo + '.jsonp';
	ppCfg.setListCtr.innerHTML = "正在读取专辑信息......";
	ppCfg.setPageNo = pageNo;
	function success(jsonObj) {
		var listStr = '',
			pageStr = '',
			photosets = jsonObj.folderList;
		if (photosets.length == 0) {
			Tabs.hasPP = false;
			hideBotton();
			listStr = '您还没有公开的相册专辑，何不去<a href="http://pp.sohu.com" target="_blank">创建</a>一个?';
		} else {
			var i,
				len = photosets.length,
				prePage = ppCfg.setPageNo - 1,
				nextPage = jsonObj.hasNextPage ? ppCfg.setPageNo + 1 : 0;
			for (i=0; i<len; i++) {
				var setNow = photosets[i];
				if (setNow && setNow.showId) {
					var sId = setNow.showId,
						pName = setNow.name,
						pCover = (setNow.cover || {}).url,
						pCount = setNow.photoNum;
					listStr += '<div class="albumCoverPic" id="' + sId + '" onclick="getPhotos(1,\''+sId+'\','+pCount+')"><div class="albumCover"><img src="' + pCover + '" height="75" width="75" class="coverPic" /></div><div class="albumTitle">'+pName+'</div></div>';
				}
			}
			pageStr += '<input class="'+(prePage>0? "buttonEnable" : "buttonDisable") + '" type="button" value="上一页" onclick="getAlbums(' + prePage + ');" '+ (prePage>0 ? "" : "disabled") + ' />';
			pageStr += '&nbsp;<input class="'+(nextPage>1?"buttonEnable":"buttonDisable") + '" type="button" value="下一页" onclick="getAlbums(' + nextPage + ');" '+(nextPage>1?"" : "disabled") + ' />';	
		}
		ppCfg.setListCtr.innerHTML = listStr;
		ppCfg.setPageCtr.innerHTML = pageStr;
	}
	var option = {
		url: url,
		charset: 'utf-8',
		param: 'pageSize=10',
		success: success,
		failure: failure
	};
	Sjax.get(option);
}
function getPhotos(pageNo, setId, count) {
	ppCfg.photoListCtr.innerHTML = "正在读取图片信息......";
	ppCfg.photoPageCtr.innerHTML = " ";
	ppCfg.photoAllCtr.innerHTML = " ";
	
	if(arguments.length > 2) {
		ppCfg.pageCount = Math.ceil(count/defaultPhotoCount);
	}
	if(!setId) {
		setId = ppCfg.setId;
	} else {
		ppCfg.photoPageCtr.innerHTML = "";
		ppCfg.photoAllCtr.innerHTML = "";
		var el = $(ppCfg.setId);
		if ( ppCfg.setId && el ) {
			el.className = "albumCoverPic";	
		}
		ppCfg.setId = setId;
		$(setId).className = "albumCoverPicSelected";
	}
	ppCfg.photoPageNo = pageNo;
	var url = 'http://pp.sohu.com/folders/' + setId + '/photos/' + pageNo + '.jsonp';
	var option = {
		charset: 'utf-8',
		param: 'pageSize='+defaultPhotoCount,
		success: setPhotoList,
		failure: failure
	};
	Sjax.get(url, option);
}
function setPhotoList(jsonObj) {
	if (!jsonObj.status) return;

	var photoData = jsonObj.data.photoList,
		photoLength = photoData.length;

	var prePage = (ppCfg.photoPageNo>1) ? ppCfg.photoPageNo-1 : 0,
		nextPage = jsonObj.data.hasNextPage ? ppCfg.photoPageNo+1 : 0;

	var listStr = "";
	if (photoLength > 0) {
		showTip();
		for (var i=0;i<photoLength;i++) {
			var photoNow = photoData[i],
				uId = photoNow.creatorId,
				pId = photoNow.showId,
				pSmall = photoNow.url,
				pMiddle = photoNow.originUrl,
				pDesc = photoNow.uploadAtDesc.replace(/\n/g, ''),
				view = "http://pp.sohu.com/u/" + uId + '/p' + pId,
				shortDesc = (pDesc.length>5) ? pDesc.substr(0,5)+'...' : pDesc;
			shortDesc = noMultiline(escapeHTML(shortDesc));
			pDesc = noMultiline(escapeHTML(pDesc));
			listStr += '<div id="divOption' + pId + '" class="'+(ppCfg.photos[pId]?'photolistSelected':'photolist')+'" onclick="selectOrCancel(\''+pId+'\',\''+pSmall+'\',\''+pMiddle+'\',\''+pDesc+'\',\''+view+'\')" ><div class="photoCover"><img src="'+pSmall+'" /></div><div class="photoTitle">'+shortDesc+'</div></div>';
		}
	} else {
		listStr = "此专辑中没有图片！";
		showTip("noPhoto");
	}
	
	var pageStr = '';
	pageStr += '<input class="'+(prePage>0?"buttonEnable":"buttonDisable")+'" type="button" value="首页" onclick="getPhotos(1)" '+(prePage>0?"":"disabled")+' />';
	pageStr += '&nbsp;<input class="'+(prePage>0?"buttonEnable":"buttonDisable")+'" type="button" value="上一页" onclick="getPhotos(' + prePage + ')" '+(prePage>0?"":"disabled")+'  />';
	pageStr += '&nbsp;<input class="'+(nextPage>1?"buttonEnable":"buttonDisable")+'" type="button" onclick="getPhotos(' + nextPage + ');" value="下一页" '+(nextPage>1?"":"disabled")+'  />';
	pageStr += '&nbsp;<input class="'+(nextPage>1?"buttonEnable":"buttonDisable")+'" type="button" onclick="getPhotos(' + ppCfg.pageCount + ');" value="末页" '+(nextPage>1?"":"disabled")+'  />';
	
	var pageAllStr = '<input type="button" value="全选" class="'+(photoLength>0?"buttonEnable":"buttonDisable")+'" onclick="selectAll()" '+(photoLength>0?"":"disabled")+'  />';
	ppCfg.photoListCtr.innerHTML = listStr;
	ppCfg.photoPageCtr.innerHTML = pageStr;
	ppCfg.photoAllCtr.innerHTML = pageAllStr;
}
function selectAll() {
	var nodes = ppCfg.photoListCtr.childNodes;
	var nodesLength = nodes.length;
	for (var i=0; i<nodesLength; i++) {
		if (nodes[i].className === "photolist") {
			nodes[i].click();
		}
	}
}
function cancelAll() {
	var photoData = ppCfg.photos;
	for (var photoItem in photoData) {
		if (photoData[photoItem].url) {
			selectOrCancel(photoItem);
		}
	}
}
function selectOrCancel(id,small,middle,desc,link) {
	var photoData = ppCfg.photos;
	var photoArr = ppCfg.photoArr;

	if(typeof photoData[id] == "object") {
		ppCfg.selectedCtr.removeChild($('divSelect' + id));
		delete photoData[id];
		var photoListItem = $("divOption" + id);
		if(photoListItem) photoListItem.className = "photolist";
	} else {
		var selectDiv = document.createElement("div");
		selectDiv.id = "divSelect" + id;
		selectDiv.className = "photolist";
		selectDiv.innerHTML = '<div class="photoCover" onclick="selectOrCancel(\''+id+'\')"><img src="'+small+'" title="'+desc+'" /></div>';
		ppCfg.selectedCtr.appendChild(selectDiv);
		
		photoData[id] = {
			url: middle,
			alt: desc,
			link: link
		};
		photoArr.push(photoData[id]);

		$("divOption" + id).className = "photolistSelected";
		selectDiv.scrollIntoView();
	}
		
	var selectedCount = ppCfg.selectedCtr.children.length;
	$("showSelectedCount").innerHTML = selectedCount;
	
	if(selectedCount < 1) {
		ppCfg.cancelAllCtr.disabled = true;
		ppCfg.cancelAllCtr.className = "buttonDisable";
	} else {
		ppCfg.cancelAllCtr.disabled = false;
		ppCfg.cancelAllCtr.className = "buttonEnable";
	}
}
function failure() {
	alert('读取数据失败，请重新操作！');
}

var flashCfg = {};
~function() {
	var imgArr = [], urlArr = [];
	function NOOP() {}
	function init_net()	{
		window.netCfg = [$('netUrl1'), $('netUrl2'), $('netUrl3'), $('netUrl4'), $('netUrl5')];
		window.netCfgCtr = [$('f_url1'), $('f_url2'), $('f_url3'), $('f_url4'), $('f_url5')];
		if (window.dialogArguments.obj) {
			for (var i=netCfg.length-1; i>0; i--) {
				netCfg[i].style.display = 'none';
			}
		}
	}
	function init_pp() {
		window.ppCfg = {
			setListCtr: $("setListCtr"),
			setPageCtr: $("setPageCtr"),
			photoListCtr: $("photoListCtr"),
			photoPageCtr: $("photoPageCtr"),
			selectedCtr: $("selectedCtr"),
			photoAllCtr: $("photoAllCtr"),
			cancelAllCtr: $("cancelAllCtr"),
			setPageNo: 1,
			photoPageNo: 1,
			pageCount: 1,
			photos: {},
			photoArr: []
		};
		getAlbums(1);
	}
	function init_flash() {
		flashCfg.setListCtr = $("flashSetList");
		flashCfg.setPageCtr = $("flashSetPage");
		flashCfg.setPageNo = 1;
		flashCfg.selectedSet =  '';
		flashCfg.selectedMode = 1;
		getSetList(1);
	}
	function onOk_local() {
		if (!localParam.data.length) {
			alert('请选择照片！');
			return;
		}
		localParam.align = getAlign();
		setTimeout(function(){
			callback(localParam)
		}, 100)
	}
	function onOk_net() {
		var i, photoData = [];
		for (i=0; i<netCfgCtr.length; i++)	{
			var valueNow = netCfgCtr[i].value;
			if (valueNow && valueNow != 'http://') {
				photoData.push({url:valueNow});
			}
		}
		if (photoData.length > 0) {
			var param = {
				type: 'imgs',
				align: getAlign(),
				data: photoData
			};
			callback(param);
		} else {
			alert('请输入网络图片的地址！');
		}
	}
	function onOk_pp() {
		var photoArr = ppCfg.photoArr;
		if (photoArr.length > 0) {
			var param = {
				type:"imgs",
				align: "center",
				data:photoArr,
				showMemo: $("isAddMemo").checked
			};
			callback(param);
		} else {
			alert('请选择照片！');
		}
	}
	function onOk_flash() {
		if (flashCfg.selectedSet == "") {
			alert("请选择专辑！");
			return;
		}
		var url = 'http://pp.sohu.com/folders/' + flashCfg.selectedSet + '/photos.jsonp';
		var option = {
			charset: 'utf-8',
			success: setFlashPhoto,
			failure: failure
		};
		Sjax.get(url, option);
	}
	function initConfig(imgObject) {
		window.popBottom = $("popBottom");
		window.popButton = $("artItem-button");
		window.infoBox = $("artItem-infoBox");
		
		if (getCookie('editor_insertImg_saveSetting')) {
			$('saveSetting').checked = 'checked';
			switch (getCookie('editor_insertImg_imgLayout')) {
				case "none" : $('f_align').checked = 'checked'; break;
				case "left" : $('f_align_left').checked = 'checked'; break;
				case "center" : $('f_align_center').checked = 'checked'; break;
				case "right" : $('f_align_right').checked = 'checked'; break;
				default : $('f_align_center').checked = 'checked'; break;
			}
		} else {
			$('saveSetting').checked = false;
			$('f_align_center').checked = 'checked';
		}
		
		if (imgObject) {
			displayTab = 2;
			if (imgObject.src) {
				$("f_url1").value = imgObject.src;
			}
			var float = isIE ? imgObject.style.styleFloat : imgObject.style.cssFloat
			if (float) {
				if (float.toLowerCase() == "left") {
					$('f_align_left').checked = 'checked';
				} else {
					if (float.toLowerCase() == "right") {
						$('f_align_right').checked = 'checked';
					}
				}
			} else {
				if (imgObject.style.textAlign) {
					if (imgObject.style.textAlign.toLowerCase() == "center") {
						$('f_align_center').checked = 'checked';
					}
				} else {
					$('f_align').checked = 'checked';
				}
			}
		} else {
			if (getCookie("editor_image_tab")) {
				displayTab = parseInt(getCookie("editor_image_tab"));
			}
		}
		if (displayTab == -1) {
			displayTab = 1;
		}
		swapBoard(displayTab);
	}

	var localUpload,
		progressId = 'progress',
		localParam = {
			type: 'imgs',
			align: '',
			data: []
		};

	function fileQueued(file, xhr) {
		try {
			var progress = new FileProgress(file, progressId);
			var uploadInstance = this;
			if (xhr) {
				uploadInstance = xhr;
			}
			progress.toggleCancel(true, uploadInstance);
		} catch (ex) {}			
	}
	function uploadProgress(file, bytesLoaded, bytesTotal) {
		try {
			var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
			var progress = new FileProgress(file, progressId);
			progress.setProgress(percent);
			progress.setStatus("上传中...");
		} catch (e) {}
	}	
	function uploadSuccess(file, serverData) {
		try {
			var progress = new FileProgress(file, progressId);
			progress.setComplete();
			progress.setStatus("上传成功！");
			progress.toggleCancel(false);

			var obj = typeof serverData === 'object' ? serverData : JSON.parse(serverData);
			if (obj.status) {
				localParam.data.push({
					url: obj.data.origin_url,
					width: obj.data.width
				})
			}
		} catch (ex) {}
	}	
	function initSwfUpload() {
		var span = document.createElement('span');
		span.id = 'spanButton';
		var tab0 = Tabs[0].tab;
		tab0.insertBefore(span, tab0.children[0]);

		var settings = {
			flash_url : "http://js3.pp.sohu.com.cn/ppp/swf/swfupload.swf",
			upload_url: "http://pp.sohu.com/upload",
			post_params: {},
			file_size_limit : "10 MB",
			file_types : "*.jpg;*.jpeg;*.gif;*.png",
			file_upload_limit : 10,
			file_queue_limit : 0,
			custom_settings : {
				progressTarget: 'progress',
				cancelButtonId: 'cancelAllBtn'
			},
			// button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,
			debug: false,

			// Button settings
			button_image_url: "http://js2.pp.sohu.com.cn/ppp/blog/styles/images/editor/upload.png",
			button_width: "95",
			button_height: "30",
			button_placeholder_id: "spanButton",
			
			// The event handler functions are defined in handlers.js
			file_queued_handler: fileQueued,
			file_queue_error_handler : fileQueueError,
			file_dialog_complete_handler: fileDialogComplete,
			upload_progress_handler: uploadProgress,
			upload_success_handler: uploadSuccess,
			upload_complete_handler: uploadComplete
		};

		function fileDialogComplete(numFilesSelected, numFilesQueued) {
			try {
				this.startUpload();
			} catch (ex) {}
		}
		function fileQueueError(file, errorCode, message) {
			try {
				if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
					alert('最多只能选择10张图片');
					return;
				}
				var progress = new FileProgress(file, progressId);
				progress.setError();
				progress.toggleCancel(false);

				switch (errorCode) {
					case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
						progress.setStatus('文件太大，不能超过10M');
						break;
					case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
						progress.setStatus('不能上传0字节的文件');
						break;
					case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
						progress.setStatus("上传失败，只能上传png|jpg|jpeg|gif类型文件");
						break;
					case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
						alert("You have selected too many files.  " +  (message > 1 ? "You may only add " +  message + " more files" : "You cannot add any more files."));
						break;
					default:
						if (file !== null) {
							progress.setStatus("Unhandled Error");
						}
						break;
				}
			} catch (ex) {}
		}
		function uploadComplete(file) {
			try {
				this.startUpload();
			} catch (ex) {}
		}

		localUpload = new SWFUpload(settings);

		// var cancelAllEl = $('cancelAllBtn');
		// cancelAllEl.onclick = function() {
		// 	var stats;
		// 	cancelAllEl.disabled = true;
		// 	localUpload.stopUpload();
		// 	do {
		// 		stats = localUpload.getStats();
		// 		localUpload.cancelUpload();
		// 	} while (stats.files_queued !== 0);
		// };

	}

	function initXhrUpload() {
		var div = document.createElement('div');
		div.className = 'btnWrap';
		var	str = '<div id="coverBtn"></div>' +
				  '<input id="uploadBtn" type="file" multiple accept="image/*"/>';
		
		div.innerHTML = str;

		var tab0 = Tabs[0].tab;
		tab0.insertBefore(div, tab0.children[0]);

		var uploadBtn = $('uploadBtn'), 
			coverBtn = $('coverBtn');

		uploadBtn.onmouseover = function() {
			coverBtn.className = 'coverBtn-hover';
		};
		uploadBtn.onmouseout = function() {
			coverBtn.className = '';
		};

		var input = $('uploadBtn');
		var settings = {
			url: 'http://pp.sohu.com/upload',
			refile: /(?:png|jpg|jpeg|gif)/,
			credential: true,
			params: {},
			fileQueued: fileQueued,
			success: uploadSuccess,
			progress: uploadProgress,
			checkMaximun: function() {
				alert('最多只能选择10张图片.')
			},
			checkFileType: function(file) {
				var progress = new FileProgress(file, progressId);
				progress.setError();
				progress.toggleCancel(false);
				progress.setStatus('上传失败，只能上传png|jpg|jpeg|gif类型文件');
			},
			checkMaximize: function(file) {
				var progress = new FileProgress(file, progressId);
				progress.setError();
				progress.toggleCancel(false);
				progress.setStatus('文件太大，不能超过10M.');
			},
			failure: function(file) {
				// 手动取消上传
				if (file.abort) return
				// 服务器上传失败的提示
				var progress = new FileProgress(file, progressId);
				progress.setError();
				progress.toggleCancel(false);
				progress.setStatus('上传失败，请稍后再试');
			}
		};
		var xhrUpload = XHRUpload(input, settings);

		// var cancelAllEl = $('cancelAllBtn');
		// cancelAllEl.onclick = function() {
		// 	cancelAllEl.disabled = true;
		// 	xhrUpload.cancel()
		// };

	}

	//	初始化方法
	window.onload = function() {
		if (isIE) {
			window.opener = window.dialogArguments.win;	
		}

		var imgObject = window.dialogArguments.obj;
		window.Tabs = [
			{label: $('imgLabel_0'), tab: $('imgBox0'), init: NOOP, onOk: onOk_local},		
			{label: $('imgLabel_1'), tab: $('imgBox1'), init: init_net, onOk: onOk_net},		
			{label: $('imgLabel_2'), tab: $('imgBox2'), init: init_pp, onOk: onOk_pp},		
			{label: $('imgLabel_3'), tab: $('imgBox3'), init: init_flash, onOk: onOk_flash}
		];

		Tabs.hasPP = true;
		Tabs.selectedIndex = -1;
		Tabs.tip = $("tabTip");
		initConfig(imgObject);

		if (isIE) {
			initSwfUpload();
		} else {
			initXhrUpload();
		}			

	};

}();

function showTip(name) {
	var Tips = [
		{
			intro: '提示：通过下面的操作，您可以把电脑中的某张图片添加到日志中。'
		},
		{
			intro: '提示：您只需要找到<font color=\"red\">搜狐网站</font>内图片的网络地址，即可将一张或多张网络图片添加到日志中。'
		},
		{
			intro: '提示：通过下面的操作，您可以把你的图片公园相册中的图片添加到日志中。',
			noPhoto: '<font color="red">提示：此专辑中没有任何图片，请先到您的图片公园相册中添加图片！</font>'
		},
		{
			intro: '提示：通过下面的操作，某一专辑将以指定的显示方式添加到日志中。'
		},
		{
			intro: ''
		}
	];
	if (!name) {
		name = 'intro';
	}
	var tipId = Tabs.selectedIndex;
	Tabs.tip.innerHTML = Tips[tipId][name];
}

//	控制哪个Tab页显示
function swapBoard(_id) {
	if(Tabs.selectedIndex > -1) {
		Tabs[Tabs.selectedIndex].label.className = 'contentLabel';
		Tabs[Tabs.selectedIndex].tab.style.display = 'none';
	}
	Tabs.selectedIndex = _id;
	Tabs[_id].label.className = 'contentLabelActive';
	Tabs[_id].tab.style.display = 'block';
	
	showTip();
	
	if(!Tabs[_id].initGood) {
		Tabs[_id].init();
		Tabs[_id].initGood = true;
	}
	
	if( (_id == 2 || _id == 3) && !Tabs.hasPP ) {
		hideBotton();
	} else {
		popBottom.style.display = '';
		popButton.style.display = '';
	}
	
	if(_id == 0 || _id == 1) {
		infoBox.style.display = '';
	} else {
		infoBox.style.display = 'none';
	}
}
function hideBotton() {
	popBottom.style.display = "none";
	popButton.style.display = "none";
}
// 提交时的处理方法,转到现在打开的Tab页的处理方法
function onOK() {
	Tabs[Tabs.selectedIndex].onOk()
}
//	取消是的处理方法  --  待写
function onCancel() {
	cancel()
}
// 下面为POP中通用的方法
function callback(param) {
	window.dialogArguments.controler.sohu.selectCall.call(null, param);
	closeNow();
}
function closeNow() {
	if ($('saveSetting').checked) {
		setCookie('editor_insertImg_saveSetting', 'true', 'never');
		setCookie('editor_insertImg_imgLayout', getAlign(), 'never');
	} else {
		setCookie('editor_insertImg_saveSetting', '', 'never');
		setCookie('editor_insertImg_imgLayout', '', 'never');
	}
	setCookie("editor_image_tab", Tabs.selectedIndex.toString(), "never");
	window.onunload = null;
	window.close();
}
function cancel() {
	window.dialogArguments.controler.sohu.cancelCall.call();
	closeNow();
}
window.onunload = cancel;


