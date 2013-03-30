/**
 * @author mingguo
 */

var t_visitor = function(m_data, m_content, m_edit){
	var eles = null;
	var vn = null;
	var ids = null;
	var times = null;
	var vnum = 9;//显示个数
	var visits = null;//访客总数
	var uid = null;

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
	this.initElement = function(){
		var str = '\
			<div class="miniUserList">\
			\
			</div>\
			<div class="minimoreFir">\
			\
			</div>';		
		m_content.innerHTML = str;		
		eles = {
			body: document.getElementsByClassName("miniUserList",m_content,"div")[0],
			more: document.getElementsByClassName("minimoreFir",m_content,"div")[0]
		};
		eles.body.update('数据加载中...');
		Element.hide(eles.more);
		this.updateData();
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
			uid = data.userId;
			this.updateVisitor(uid);
		}else{
			if (isMyBlog()) 
                str += '点<a href="http://t.sohu.com/">这里</a>立即领取你的微博，与好友分享新鲜事 ';
            else 
                str += 'TA还没有开通微博，过两天再来看看吧';
			m_content.innerHTML = str;
		}		
	};
	this.updateVisitor = function(uid){
		var url = 'http://v1.t.sohu.com/getvisitor?u=' + uid + '&n=14&c=' + Time.now();
		new Groj(url, {
            variable: 'visitInfo',
			charset: 'UTF-8',
            onSuccess:this.showVisitor.bind(this),
            onFailure: this.showError.bind(this)
        });
	};
	this.showVisitor = function(data){
		var str = '';
		if (data.ids){
			ids = data.ids;
			times = data.times;
			visits = data.visits;
			this.updateVisitorInfo(ids);
		}else{
			if (isMyBlog()) 
                str += '说两句有料的，好友都会过来围观你';
            else 
                str += 'TA还没有访客光临';		
			m_content.innerHTML = str;
		}
		
	};
	this.updateVisitorInfo = function(ids){
		vn = "ids" + Time.now();
		var url = 'http://t.sohu.com/a/user/visitor.do?us=' + ids + '&vn=' + vn;
		new Groj(url, {
            variable: vn,
			charset: 'UTF-8',
            onSuccess:this.showVisitorInfo.bind(this),
            onFailure: this.showError.bind(this)
        });
	};
	this.showVisitorInfo = function(data){
		var str = '';
		if (data.status && data.status == 1){			
			var content = data.data.view;
			content = content.replace(/href=\"\/(\d+)\"/g,'href=\"http://t.sohu.com/$1\" target=\"_blank\"');
			str += '<ul class="friends">' + content + '</ul>';
			eles.body.update(str);
            var uidarr = ids.split(",");
            var tarr = times.split(",");
            var uarr = eles.body.getElementsByTagName("li");
            var overEl = [];
            for (var i = 0; i < uarr.length; i++) {
                var ai = uarr[i];			
                if (i >= vnum){
					overEl.push(ai);
				}else{
					if (ai) {
	                    var timestamp = this.getVTimeStr(uidarr, tarr, ai);
	                    if (timestamp != null) {
	                        var ts = this.friendlyTime(timestamp);
	                        $(ai).insert("<p>" + ts + "</p>")
	                    }
	                }
				}
            }
            for (var i = 0; i < overEl.length; i++) {
                $(overEl[i]).remove();
            }
            if (visits > vnum) {
                eles.more.update('<a href="' + this.getMorelink(uid) + '" target="_blank">更多访客</a>');
				Element.show(eles.more);
            }
		}else{
			str = '\u4e0d\u80fd\u53d6\u5f97\u76f8\u5173\u6570\u636e\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5';
			m_content.innerHTML = str;
		}
		
	};
	this.showError = function(){
		m_content.innerHTML = "\u4e0d\u80fd\u53d6\u5f97\u76f8\u5173\u6570\u636e\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5";
    };
	this.getMorelink = function(uid){
		return "http://t.sohu.com/user/visitor.do?u=" + uid;
	};
	this.getUlink = function(uid){
		return "http://t.sohu.com/" + uid;
	};
    this.friendlyTime = function(f){
        var d = new Date();
        var c = d.getTime() - f;
        var e = Math.floor(c / (60 * 1000));
        var a = Math.floor(e / 60);
        var b = Math.floor(a / 24);
        var g = "";
        if (b >= 1) {
            g += b;
            g += "天"
        }
        else {
            if (a < 48 && a > 0 && (a % 24) > 0) {
                g += a % 24;
                g += "小时"
            }
            else {
                if (a <= 0 && (e % 60 <= 2)) {
                    return "刚刚"
                }
                if (a < 24) {
                    g += e % 60;
                    g += "分钟"
                }
            }
        }
        g += "前";
        return g
    };
	this.getVTimeStr = function(b, c, a){
        var d = a.id;
        if (!d || d.length <= 2) {
            return
        }
        var g = d.substring(2);
        var e = -1;
        for (var f = 0; f < b.length; f++) {
            if (g == b[f]) {
                e = f;
                break
            }
        }
        if (e >= 0) {
            return c[e]
        }
        else {
            return null
        }
    };
};
registerWidget('t_visitor');
