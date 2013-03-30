/******* campaign Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-12-04
//	Last Update: 2006-12-04
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var campaign = function(m_data, m_content, m_edit, w_path){
	var dataPath = 'http://see.blog.sohu.com/front.html?m=showParticipatorValueObject&domain='+ _blog_domain;
	//var dataPath = '/campaign.js?domain=todd';
	var elmOutput;
	var timerSetAdSize;
	
	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		clearTimeout(timerSetAdSize);
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
						variable: 'campaignData',
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
		elmOutput.innerHTML = App.Lang.fileNotFound;
	}
	
	this.showContent = function() {
		clearTimeout(timerSetAdSize);
		if (campaignData.length <= 0) {
			elmOutput.innerHTML = '暂时没有活动，何不给我们一些建议？';
			return;
		}
		var str1 = '';
		var str2 = '';
		var str4 = '';
		$A(campaignData).each(function(it){
			if(it.id == '56' && it.status == 2 && it.joined) {
				str4 += '<table class="campJoined" border="0" cellpadding="0" cellspacing="0"><tr>';
				str4 += '<td class="campTitle">';
				str4 += '<img src="http://js3.pp.sohu.com.cn/ppp/blog/widgets/campaign/ico_widget.gif" />&nbsp;<a href="'+ it.url +'" target="_blank">'+ it.name +'</a>&nbsp;-&nbsp;';
				str4 += '<a href="'+ it.joined.categoryUrl +'" target="_blank">'+ it.joined.grp +'</a>&nbsp;-&nbsp;';
				if (it.joined.sex == '1') {
					str4 += '&nbsp;<img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/icons/user.gif" alt="男" />';
				} else {
					str4 += '&nbsp;<img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/icons/user_female.gif" alt="女" />';
				}
				str4 += it.joined.blogname;
				if (App.Permit.editModule) {
					str4 += '&nbsp;<a href="'+ it.joined.editUrl +'" target="_blank" class="modify">[修改信息]</a>';
				}
				str4 += '</td>';
				str4 += '</tr>';
				if (it.video && it.video == 1) {
					str4 += '<tr><td class="videoFile">';
					str4 += '<embed class="embedVideo" src="http://v.blog.sohu.com/fo/u/' + _xpt + '" width="200" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" bgcolor="#191919" />';
					if (App.Permit.editModule) {
						str4 += '<div style="margin:4px"><a href="http://v.blog.sohu.com/s/or" target="_blank">录制视频档案>></a></div>';
					}
					str4 += '</td></tr>';
				}
				else {}
				str4 += '<tr><td>宣言：'+ it.joined.enounce +'</td></tr>';
				if (it.production && it.production == 1) {
					str4 += '<tr><td class="works">';
					if (it.joined.pCount == 0) {
						if (App.Permit.editModule) {
						str4 += '您还未提交任何作品，请先<a href="'+ it.joined.sPrdUrl +'" target="_blank" class="modify">提交作品>></a>';
						}
						else {
						str4 += '暂未提交作品';
						}
					}
					else {
						var prds = ["prd1", "prd2", "prd3"];
						if (it.joined) {							
							str4 += '作品：&nbsp;';
							if (App.Permit.editModule) {
									str4 += '<a href="'+ it.joined.mPrdUrl +'" target="_blank" class="modify">[管理作品]</a>';
									// springwang 增加[在widget里直接有个提交作品的入口，方便提交作品]
									str4 += '&nbsp;&nbsp;<a href="'+ it.joined.sPrdUrl +'" target="_blank" class="modify">[继续提交作品]</a>';
								}
							str4 += '<ul>';
							for (var i=0; i<prds.length; i++) {
								var prd = it.joined[prds[i]];
								if (prd) {
									switch(prd.type) {
										case 0:
											str4 += '<li class="text"><img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/icons/page_white_text.gif" alt="" class="ico" />&nbsp;<a href="'+ _blog_base_path + prd.refId +'.html" target="_blank">'+ prd.title +'</a></li>';
											break;
										case 1:
											str4 += '<li class="albums"><img src="http://js3.pp.sohu.com.cn/ppp/blog/widgets/pp_set/ico_widget.gif" alt="" class="ico" />&nbsp;<a href="http://pp.sohu.com/photosetview-' + prd.refId + '.html" target="_blank">'+ prd.title +'</a><br /><div class="pic"><a href="http://pp.sohu.com/photosetview-' + prd.refId + '.html" target="_blank"><img src="'+ prd.content +'" alt="'+ prd.title +'" /></a></div></li>';
											break;
										case 2:
											str4 += '<li class="video"><img src="http://js3.pp.sohu.com.cn/ppp/blog/widgets/v_tv/ico_widget.gif" alt="" class="ico" />&nbsp;<a href="http://v.blog.sohu.com/u/vw/' + prd.refId + '" target="_blank">'+ prd.title +'</a><br /><a href="http://v.blog.sohu.com/u/vw/' + prd.refId + '" target="_blank" class="cover"><img src="'+ prd.content +'" alt="'+ prd.title +'" /><span class="v_play"></span></a></li>';
											break;
										// springwang 增加 for 奥运宝贝活动
										case 3:
											str4 += '<li class="video"><img src="http://js1.pp.sohu.com.cn/ppp/images/icons/ico_slide.gif" alt="" class="ico" />&nbsp;<a href="http://pp.sohu.com/slideview-' + prd.refId +'.html" target="_blank">'+ prd.title +'</a><br /><div class="slideCover"><a href="http://pp.sohu.com/slideview-' + prd.refId +'.html" target="_blank" class="cover"><img src="'+ prd.content +'" alt="'+ prd.title +'" /></a></div></li>';
											break;
										//------------------------------------
									}
								}
							}
							str4 += '</ul>';
						}
						str4 += '</td></tr>';
					}
				}
				else {}
				str4 += '<tr></tr>';
				str4 += '</table>';
				if (it.tips) {
					str4 += '<div>'+ it.tips +'</div>';
				}
				str4 += '<div class="ad">';
				str4 += '<a href="'+ it.joined.adlink +'" target="_blank">';
				var w = Math.floor(elmOutput.parentNode.parentNode.offsetWidth);
				if (w > 500) {
					adSrc = it.joined.ad3;
					this.ad = 3;
				}else if (w > 300) {
					adSrc = it.joined.ad2;
					this.ad = 2;
				}else {
					adSrc = it.joined.ad1;
					this.ad = 1;
				}
				str4 += '<img class="adImg" src="'+ adSrc +'" alt="'+ it.name +'" ad1="'+ it.joined.ad1 +'" ad2="'+ it.joined.ad2 +'" ad3="'+ it.joined.ad3 +'" />';
				str4 += '</a>';
				str4 += '</div>';
				str4 += '</div>';
			}
			else {
				if(it.status == '2' && it.joined){
					str1 += '<table class="campJoined" border="0" cellpadding="0" cellspacing="0"><tr>';
					str1 += '<td class="campTitle">';
					str1 += '<img src="http://js3.pp.sohu.com.cn/ppp/blog/widgets/campaign/ico_widget.gif" />&nbsp;<a href="'+ it.url +'" target="_blank">'+ it.name +'</a>&nbsp;-&nbsp;';
					str1 += '<a href="'+ it.joined.categoryUrl +'" target="_blank">'+ it.joined.grp +'</a>&nbsp;-&nbsp;';
					if (it.joined.sex == '1') {
						str1 += '&nbsp;<img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/icons/user.gif" alt="男" />';
					} else {
						str1 += '&nbsp;<img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/icons/user_female.gif" alt="女" />';
					}
					str1 += it.joined.blogname;
					if (App.Permit.editModule) {
						str1 += '&nbsp;<a href="'+ it.joined.editUrl +'" target="_blank" class="modify">[修改信息]</a>';
					}
					str1 += '</td>';
					str1 += '</tr>';
					if (it.video && it.video == 1) {
						str1 += '<tr><td class="videoFile">';
						str1 += '<embed class="embedVideo" src="http://v.blog.sohu.com/fo/u/' + _xpt + '" width="200" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" bgcolor="#191919" />';
						if (App.Permit.editModule) {
							str1 += '<div style="margin:4px"><a href="http://v.blog.sohu.com/s/or" target="_blank">录制视频档案>></a></div>';
						}
						str1 += '</td></tr>';
					}
					else {}
					str1 += '<tr><td>宣言：'+ it.joined.enounce +'</td></tr>';
					if (it.production && it.production == 1) {
						str1 += '<tr><td class="works">';
						if (it.joined.pCount == 0) {
							if (App.Permit.editModule) {
							str1 += '您还未提交任何作品，请先<a href="'+ it.joined.sPrdUrl +'" target="_blank" class="modify">提交作品>></a>';
							}
							else {
							str1 += '暂未提交作品';
							}
						}
						else {
							var prds = ["prd1", "prd2", "prd3"];
							if (it.joined) {							
								str1 += '作品：&nbsp;';
								if (App.Permit.editModule) {
										str1 += '<a href="'+ it.joined.mPrdUrl +'" target="_blank" class="modify">[管理作品]</a>';
										// springwang 增加[在widget里直接有个提交作品的入口，方便提交作品]
										str1 += '&nbsp;&nbsp;<a href="'+ it.joined.sPrdUrl +'" target="_blank" class="modify">[继续提交作品]</a>';
									}
								str1 += '<ul>';
								for (var i=0; i<prds.length; i++) {
									var prd = it.joined[prds[i]];
									if (prd) {
										switch(prd.type) {
											case 0:
												str1 += '<li class="text"><img src="http://js1.pp.sohu.com.cn/ppp/blog/styles_ppp/images/icons/page_white_text.gif" alt="" class="ico" />&nbsp;<a href="'+ _blog_base_path + prd.refId +'.html" target="_blank">'+ prd.title +'</a></li>';
												break;
											case 1:
												str1 += '<li class="albums"><img src="http://js3.pp.sohu.com.cn/ppp/blog/widgets/pp_set/ico_widget.gif" alt="" class="ico" />&nbsp;<a href="http://pp.sohu.com/photosetview-' + prd.refId + '.html" target="_blank">'+ prd.title +'</a><br /><a href="http://pp.sohu.com/photosetview-' + prd.refId + '.html" target="_blank" class="pic"><img src="'+ prd.content +'" alt="'+ prd.title +'" /></a></li>';
												break;
											case 2:
												str1 += '<li class="video"><img src="http://js3.pp.sohu.com.cn/ppp/blog/widgets/v_tv/ico_widget.gif" alt="" class="ico" />&nbsp;<a href="http://v.blog.sohu.com/u/vw/' + prd.refId + '" target="_blank">'+ prd.title +'</a><br /><a href="http://v.blog.sohu.com/u/vw/' + prd.refId + '" target="_blank" class="cover"><img src="'+ prd.content +'" alt="'+ prd.title +'" /><span class="v_play"></span></a></li>';
												break;
											// springwang 增加 for 奥运宝贝活动
											case 3:
												str1 += '<li class="video"><img src="http://js1.pp.sohu.com.cn/ppp/images/icons/ico_slide.gif" alt="" class="ico" />&nbsp;<a href="http://pp.sohu.com/slideview-' + prd.refId +'.html" target="_blank">'+ prd.title +'</a><br /><div class="slideCover"><a href="http://pp.sohu.com/slideview-' + prd.refId +'.html" target="_blank" class="cover"><img src="'+ prd.content +'" alt="'+ prd.title +'" /></a></div></li>';
												break;
											//-------------------------------------
										}
									}
								}
								str1 += '</ul>';
							}
							str1 += '</td></tr>';
						}
					}
					else {}
					str1 += '<tr><td>';
					str1 += '排名：';
					str1 += it.joined.rank;
					str1 += '&nbsp;/&nbsp;票数：';
					str1 += '<a href="'+ it.joined.viewAllUrl +'" target="_blank" class="number">'+ it.joined.ballot +'</a>';
					str1 += '</td></tr>';
					str1 += '<tr><td>';
					str1 += '<input type="submit" name="button" id="button" value="" onclick="javascript:window.location.href=\''+ it.joined.voteUrl +'\'" />';
					str1 += '</td></tr>';
					str1 += '</table>';
					if (it.tips) {
						str1 += '<div>'+ it.tips +'</div>';
					}
					str1 += '<div class="ad">';
					str1 += '<a href="'+ it.joined.adlink +'" target="_blank">';
					var w = Math.floor(elmOutput.parentNode.parentNode.offsetWidth);
					if (w > 500) {
						adSrc = it.joined.ad3;
						this.ad = 3;
					}else if (w > 300) {
						adSrc = it.joined.ad2;
						this.ad = 2;
					}else {
						adSrc = it.joined.ad1;
						this.ad = 1;
					}
					str1 += '<img class="adImg" src="'+ adSrc +'" alt="'+ it.name +'" ad1="'+ it.joined.ad1 +'" ad2="'+ it.joined.ad2 +'" ad3="'+ it.joined.ad3 +'" />';
					str1 += '</a>';
					str1 += '</div>';
					str1 += '</div>';
				}
				else {
					str2 += '<div class="noJoined">';
					if (it.notice) {
						str2 += '<div class="campTitle">';
						str2 += '<a href="'+ it.url +'" target="_blank">'+ it.name +'</a>';
						str2 += '</div>';
						str2 += '<div>';
						str2 += it.notice;
						str2 += '</div>';
					}
					else {
						str2 += it.name;
						str2 += '-';
						if (it.status == '1') {
							str2 += '<strong>即将开始</strong>-<a href="'+ it.url +'" target="_blank">查看大赛预告</a>';
						}
						else if (it.status == '2') {
							str2 += '<strong>火热进行中</strong>-<a href="'+ it.url +'" target="_blank">查看详情</a>';
						}
						else if (it.status == '3') {
							str2 += '<strong>已经结束</strong>-<a href="'+ it.url +'" target="_blank">查看获奖名单</a>';
						}
					}
					str2 += '</div>';
				}
			}
		}.bind(this));
		
		var str3 = '';
		str3 += '<div style="text-align:right;"><a href="http://zt.blog.sohu.com/s2007/bloghd2007/" target="_blank">更多博客活动&gt;&gt;</a></div>';
		if (str1 || str4) {
			elmOutput.innerHTML = str4 + str1 + str3;
		}
		else {
			elmOutput.innerHTML = str1 + str2;
		}
		
		timerSetAdSize = setInterval(this.setAdImgSize.bind(this), 1000);
	},
	this.setAdImgSize = function() {
		var w = Math.floor(elmOutput.parentNode.parentNode.offsetWidth);
		if (w > 500 && this.ad != 3) {
			$A(document.getElementsByClassName('adImg', elmOutput)).each(function(ad) {
				ad.src = ad.getAttribute('ad3');
			});
			this.ad = 3;
		}else if (w <= 500 && w > 300 && this.ad != 2) {
			$A(document.getElementsByClassName('adImg', elmOutput)).each(function(ad) {
				ad.src = ad.getAttribute('ad2');
			});
			this.ad = 2;
		}else if (w <= 300 && this.ad != 1){
			$A(document.getElementsByClassName('adImg', elmOutput)).each(function(ad) {
				ad.src = ad.getAttribute('ad1');
			});
			this.ad = 1;
		}
		$A(document.getElementsByClassName('embedVideo', elmOutput)).each(function(v) {
			vh = Math.floor(v.offsetWidth *3/4) + 20;
			v.height = vh +'px';
		});
	}
};
registerWidget('campaign');
