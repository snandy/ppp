/**
 * @author mingguo
 */

var t_profile = function(m_data, m_content, m_edit){
	var vn = null;
	var eles = null;
	

	this.initialize = function() {
		this.build();
		this.updateData();
	};
/*
	this.refresh = function(){
        this.build();
		this.updateData();
    };
*/
	this.destroy = function() {
		m_content.innerHTML = "";
	};
	
	this.build = function() {
		m_content.innerHTML = '数据加载中...';
	};
	this.initElement = function(){
		var str = '\
			<div class="miniBlogWarrper1">\
			  <div class="miniUserInfo">\
			    <div id="userLogo" class="userLogo"></div>\
			    <div class="countArea">加载中...</div>\
			    <div class="countArea">加载中...</div>\
			    <div class="countArea noborder">加载中...</div>\
			  </div>\
			</div>';
		m_content.innerHTML = str;		
		eles = {
			body: document.getElementsByClassName("miniUserInfo",m_content,"div")[0],
			user: document.getElementsByClassName("userLogo",m_content,"div")[0],
			view: document.getElementsByClassName("countArea",m_content,"div")[0],
			cmts: document.getElementsByClassName("countArea",m_content,"div")[1],
			articles: document.getElementsByClassName("countArea noborder",m_content,"div")[0]
			//mobile: document.getElementsByClassName("bandingMobile",m_content,"div")[0]
		};
	};
	this.updateData = function() {
		vn = 'user' + Time.now();
		var url = 'http://t.sohu.com/a/uinfo.do?type=widget&passport=' + b64_decodex(_xpt) + '&vn=' + vn;
		new Groj(url, {
            variable: vn,
			charset: 'UTF-8',
            onSuccess:this.showUser.bind(this),
            onFailure: this.showError.bind(this)
        });		
	};
	this.showUser = function(data){
		var str = '';
		if (data.status && data.status == 1){
			var uid = data.userId;
			var userName = data.name;
			this.initElement();
			str += '<div class="userImg"><a href="' + this.getUlink(uid) + '" target="_blank"><img src="http://js1.pp.sohu.com.cn/ppp/blog/images/common/nobody.gif" ' + this.getPpExpress(_xpt, '#{@src}#{:=}#{$ico}#{:;}#{@alt}#{:=}#{@title}#{:=}#{$title}') + '/></a></div>';
			str += '<div class="miniName"><a href="' + this.getUlink(uid) + '" target="_blank">' + userName + '</a><br />';		
            
            if (data.mobile && data.mobile == 1) {
                if (isMyBlog()){
					str += '<a href="http://t.sohu.com/user/binding.do" target="_blank"><img src="http://i1.itc.cn/20100128/637_6ce46d45_8c4a_4bbb_a55c_c4660451205a_0.gif" width="16" height="16" title="成功绑定"/></a>';
				}else{
					str += '<img src="http://i1.itc.cn/20100128/637_6ce46d45_8c4a_4bbb_a55c_c4660451205a_0.gif" width="16" height="16" title="成功绑定"/>';
				}
            }
            else {                
                if (isMyBlog()) {
                    str += '<a href="http://t.sohu.com/user/binding.do" target="_blank"><img src="http://i1.itc.cn/20100128/637_6ce46d45_8c4a_4bbb_a55c_c4660451205a_1.gif" width="16" height="16" title="尚未绑定"/></a>';
                }
                else {
                    str += '<img src="http://i1.itc.cn/20100128/637_6ce46d45_8c4a_4bbb_a55c_c4660451205a_1.gif" width="16" height="16" title="尚未绑定"/>';
                }
            }
            str += '</div>';
			
			eles.user.update(str);
			$call(function(){
                blog.user.User.fill();
            }, "blog.user");
			this.updateViewAndCmts(uid);
			this.updateActicles(uid);
	
		}else{
			if (isMyBlog()) 
                str += '点<a href="http://t.sohu.com/">这里</a>立即领取你的微博，与好友分享新鲜事';
            else 
                str += 'TA还没有开通微博，过两天再来看看吧>';
			m_content.innerHTML = str;
		}		
	};
	this.updateViewAndCmts = function(uid){
		var url = 'http://v1.t.sohu.com/getvisitor?u=' + uid + '&n=14&c=' + Time.now();
		new Groj(url, {
            variable: 'visitInfo',
			charset: 'UTF-8',
            onSuccess:this.showViewAndCmts.bind(this),
            onFailure: this.showError.bind(this)
        });
	};
	this.showViewAndCmts = function(data){
		//if (data.views){
			eles.view.update('围观<strong>' + data.views + '</strong>次');
		//}
		//if (data.cmts){
			eles.cmts.update('评论<strong>' + data.cmts + '</strong>次');
		//}
	};
	this.updateActicles = function(uid){
		vn = 'art' + Time.now();
		var url = 'http://t.sohu.com/a/document/count.do?u=' + uid + '&vn=' + vn;
		new Groj(url, {
            variable: vn,
			charset: 'UTF-8',
            onSuccess:this.showActicles.bind(this),
            onFailure: this.showError.bind(this)
        });
	};
	this.showActicles = function(data){
		if(data.status && data.status == 1 && data.data){
			eles.articles.update('微博<strong>' + data.data.count + '</strong>篇');
		}
	};
	this.showError = function(){
		m_content.innerHTML = "\u4e0d\u80fd\u53d6\u5f97\u76f8\u5173\u6570\u636e\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5";
    };
	this.getPpExpress = function(passport, express){
        return (" name=\"BlogUser\" data-xpt=\"" + passport + "\" data-blogExp=\"" + express + "\" ");
    };
	this.getUlink = function(uid){
		return "http://t.sohu.com/" + uid;
	};
};
registerWidget('t_profile');
