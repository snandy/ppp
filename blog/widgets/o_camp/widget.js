/******* Olympic campaign Widget **********/
//	Author: Jady
//	First Created: 2008-08-02
//	Last Update: 2008-08-02
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var o_camp = function(m_data, m_content, m_edit){
	var elOutput;
	
	this.initialize = function() {
		this.build();
		this.showContent();
	}
	this.destroy = function() {
		Element.remove(elOutput);
	}
	this.build = function() {
		elOutput = document.createElement('div');
		elOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elOutput);
	}
	this.showContent = function() {
		var str = '<div class="block">\
				<div>\
					<div class="header"><a href="http://see.blog.sohu.com/front.html?m=showSignUpForm&actId=82" target="_blank"><img src="http://i6.itc.cn/20080804/637_68b3cbb1_7cbc_4dc8_b96b_c5e7fdf8b161_0.gif" width="205" height="178" alt="" /></a></div>\
					<h5 class="myArticleTitle" id="o_camp_title">我的奥运事儿</h5>\
				  <div class="myArticleBox" id="o_camp_box">loading...</div>\
					<div class="line"></div>\
					<h5 class="friendArticleTitle" id="o_camp_friendTitle">我的抢票征文</h5>\
					<div class="friendArticleBox" id="o_camp_friendBox">loading...</div>\
					<div class="more"><a href="http://see.blog.sohu.com/front.html?m=getPage&type=act&id=82" target="_blank">查看更多&gt;&gt;</a></div>\
					<div class="line" id="o_camp_line"></div>\
					<div class="btnB" id="o_camp_btnB"><img src="http://i7.itc.cn/20080731/637_a02319b2_0a07_40a8_8064_4ba7e96a5e09_1.gif" width="166" height="39" alt="" /></div>\
				</div>\
				<div class="bot" id="o_camp_bot">票数载入中...</div>\
			</div>';
		elOutput.innerHTML = str;
		
		this.reqContent();
	}
	this.reqContent = function() {
		var url = '/py?url=' + encodeURIComponent('http://see.blog.sohu.com/front.html?m=showNewParticipatorValueObject&domain='+ _blog_domain + '&actId=82&c=' + timeStamp());
		new Ajax.Request(url, {
			onComplete: this.getContent.bind(this)
		});
	}
	this.getContent = function(req) {
		
		if (!req || !req.responseText) return;
		var json_a = eval('(' + req.responseText + ")");
		
		var myStr = '';
		var friendStr = '';
		var i = 1;
		var j = 1;
		var json = json_a[0];
		if (typeof getBlogTitle != 'undefined') {
			$('o_camp_title').innerHTML = getBlogTitle() +'的抢票征文';
		}
		if( typeof(json['joined'])=="undefined" ){
			//未参加此活动
			if (App.Permit.editModule)
				myStr += '您还未参加活动,<a href="' + json.signup + '" target="_blank"><font color="red">赶快报名</font></a>';
			else
				myStr += '还未参加活动～';
			$('o_camp_bot').innerHTML = '';
			$('o_camp_btnB').innerHTML = '<a href="http://see.blog.sohu.com/front.html?m=showSignUpForm&actId=82" target="_blank"><img src="http://i7.itc.cn/20080731/637_a02319b2_0a07_40a8_8064_4ba7e96a5e09_1.gif" width="166" height="39"/></a>';
		}else if( typeof(json.joined.prd1)=="undefined" ){
			//未提交作品
			if (App.Permit.editModule)
				myStr += '您还未提交作品,<a href="' + json.joined.sPrdUrl + '" target="_balnk"><font color="red">赶快提交</font></a>';
			else
				myStr += '还未提交作品～';
			$('o_camp_bot').innerHTML = '已经有<font color="red"><strong>' + json['joined']['ballot'] + '</strong></font>人支持我';
			$('o_camp_btnB').innerHTML = '<a href="' + json['joined']['voteUrl'] + '" target="_blank"><img src="http://i7.itc.cn/20080731/637_a02319b2_0a07_40a8_8064_4ba7e96a5e09_1.gif" width="166" height="39"/></a>';
		}else{
			myStr += '<ul>';
			while(1){
				key = 'prd' + i;
				if( typeof(json['joined'][key])!='undefined'){
					i++;
					if (i > 4){
						break;
					}
					myStr += '<li><a href="'+ json['joined'][key]['pUrl'] +'" target="_blank">'+ json['joined'][key]['title'] +'</a></li>';		
				}else{
					break;
				}		
			}
			myStr += '</ul>';
			$('o_camp_bot').innerHTML = '已经有<font color="red"><strong>' + json['joined']['ballot'] + '</strong></font>人支持我';
			$('o_camp_btnB').innerHTML = '<a href="' + json['joined']['voteUrl'] + '" target="_blank"><img src="http://i7.itc.cn/20080731/637_a02319b2_0a07_40a8_8064_4ba7e96a5e09_1.gif" width="166" height="39"/></a>';
		}
		$('o_camp_box').innerHTML = myStr;
		
		if( typeof(json['newProductions'])!="undefined" ){
			friendStr += '<ul style="list-style:none;margin-left:5px;">';
			for(var news_key in json['newProductions']){
				var news = json['newProductions'][news_key];
				if (news['newBlogIcon'] == "null")
					news['newBlogIcon'] = "http://img3.pp.sohu.com/ppp/blog/images/common/nobody.gif";
				if (j < 6)
					friendStr += '<li><a href="'+ news['newBlogUrl'] +'" target="_blank" style="font-weight:bold;"><img src="'+ news['newBlogIcon'] +'" style="width:16px;height:16px;border:1px solid #ccc;" align="absbottom" /></a> <a href="'+ news['newRefId'] +'" target="_blank">'+ news['newTitle'] +'</a></li>';
				j++;
			}
			friendStr += '</ul>';
		}else{
			friendStr += '似乎还没人提交作品～';
		}
		$('o_camp_friendBox').innerHTML = friendStr;
	}
};

registerWidget('o_camp');