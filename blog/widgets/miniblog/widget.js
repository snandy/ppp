/******* Mini Blog Widget **********/
//	Author: Jady
//	Created: 2007-06-14
//	Updated: 2007-06-14
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var miniblog = function(m_data, m_content, m_edit, w_path){
	var eles = null;
	var widgetId = this.id;
	var newsfeed = null;
	var minifeed = null;
	var formInited = false;
	
	var Feed = {
		init: function() {
			if (!eles) {
				this.initBody();
				this.initElements();
				this.initEvents();
			}
			
			if (isMyBlog()) Element.show(eles.headCtr);
			
			this.showTab(isMyBlog() ? "news" : "mini");
		},
		initBody: function() {
			var str = '\
				  <div id="miniblogForm" style="display:none;">\
				  	<table class="post">\
				      <tr>\
				        <td colspan="2"><input type="text" class="text" style="width:99%" value="" useEnter="true" onmousedown="CA.q(\'blog_widget_minifeed_textarea\');" /></td>\
				      </tr>\
				      <tr>\
				        <td width="50%"><input onmousedown="CA.q(\'blog_widget_minifeed_submit\');" type="submit" class="button-submit" value="说一句" /></td>\
				        <td align="right" class="tips">可以输入70字</td>\
				      </tr>\
				    </table>\
				     <hr />\
				  </div>\
				  <div class="navTab" style="display:none;">\
				    <ul>\
				      <li class="news_head" style="display:none;" onmousedown="CA.q(\'blog_widget_newsfeed_tab1\');">好友动态</li>\
				      <li class="mini_head" onmousedown="CA.q(\'blog_widget_newsfeed_tab2\');">我的动态</li>\
				    </ul>\
				    <div class="clearBoth"></div>\
				  </div>\
				  <div class="clearBoth"></div>\
				  <div class="news_body" style="display:none;">\
				    <div class="news_board" onmousedown="CA.q(\'blog_widget_newsfeed_board\');">\
					    \
					</div>\
				    <div class="news_cont">\
					    \
					</div>\
				    <div class="more" style="padding:5px 0;display:none;text-align:center;font-weight:bold;"><a class="power" href="http://blog.sohu.com/manage/main.do?tracker=widget_newsfeed" target="_blank">好友都在干什么？去我的搜狐查看更多&raquo;</a><img align="absbottom" title="好友都在干什么？去我的搜狐查看更多" alt="好友都在干什么？去我的搜狐查看更多" src="http://img3.pp.sohu.com/ppp/blog/styles/images/ico_upn_1.gif" /></div>\
				  </div>\
				  <div class="mini_body" style="display:none">\
				    <div class="mini_cont" onmousedown="CA.q(\'blog_widget_minifeed_content\');">\
					    \
					</div>\
				    <div class="more" style="display:none;"><a onmousedown="CA.q(\'blog_widget_minifeed_more\');" href="./mnt/" target="_blank">查看更多>></a></div>\
				  </div>';
			m_content.innerHTML = str;
		},
		initElements: function() {
			eles = {
				mini: {
					head: document.getElementsByClassName("mini_head", m_content, "li")[0], 
					body: document.getElementsByClassName("mini_body", m_content, "div")[0], 
					cont: document.getElementsByClassName("mini_cont", m_content, "div")[0],
					
					form:$('miniblogForm'),
					iptCtr: document.getElementsByClassName("post", m_content, "table")[0],
					ipt: m_content.getElementsByTagName("input")[0],
					iptWords: document.getElementsByClassName("tips", m_content, "td")[0],
					iptSave: m_content.getElementsByTagName("input")[1]
				},
				news: {
					head: document.getElementsByClassName("news_head", m_content, "li")[0], 
					body: document.getElementsByClassName("news_body", m_content, "div")[0], 
					cont: document.getElementsByClassName("news_cont", m_content, "div")[0], 
					board: document.getElementsByClassName("news_board", m_content, "div")[0]
				},
				headCtr: document.getElementsByClassName("navTab", m_content, "div")[0]
			}
			eles.mini.more = document.getElementsByClassName("more", eles.mini.body, "div")[0];
			eles.news.more = document.getElementsByClassName("more", eles.news.body, "div")[0];
			
			if (isMyBlog()) {
				Element.show(eles.news.head);
				Element.show(eles.mini.iptCtr);
				//Element.show(eles.mini.form);
			}
			else{
				//Element.hide(eles.mini.form);
			}
		},
		initEvents: function() {
			if (isMyBlog()) {
				Event.observe(eles.mini.head, "click", this.showTab.bind(this, 'mini'));
				Event.observe(eles.news.head, "click", this.showTab.bind(this, 'news'));
				//Event.observe(eles.mini.ipt, "keyup", this.wordChange.bind(this));
				//Event.observe(eles.mini.iptSave, "click", this.submitWord.bind(this));
			}
		},
		
		showTab: function(type) {
			var another = (type == "mini") ? "news" : "mini";
			eles[another].head.className = "";
			Element.hide(eles[another].body);
			
			eles[type].head.className = "active";
			Element.show(eles[type].body);
			if (type == 'news') 
				this.showNews();
			else 
				this.showMini();
		},
		// 显示newsfeed
		showNews: function(){
			if(newsfeed == null){
				newsfeed = new NewsFeed({	type:'news',
											topEl:eles['news'].board,
											listEl:eles['news'].cont,
											start:0,
											size:5,
											iptEl:eles['mini'].ipt,
											sbtEl:eles['mini'].iptSave,
											leftEl:eles['mini'].iptWords,
											onSucc:this.showTab.bind(this,'mini')});
				newsfeed.requestBoard();
				if(!formInited){
					newsfeed.initForm();
					formInited = true;
				}
				Element.show(eles.news.more);
			}
			else
				newsfeed.requestCont();
			
		},
		// 显示minifeed
		showMini: function(){
			if(minifeed == null){
				minifeed = new NewsFeed({	type:'mini',
											listEl:eles['mini'].cont,
											start:0,
											size:10,
											iptEl:eles['mini'].ipt,
											sbtEl:eles['mini'].iptSave,
											leftEl:eles['mini'].iptWords,
											endel:true,
											onSucc:this.showTab.bind(this,'mini')});
				if(!formInited){
					minifeed.initForm();
					formInited = true;
				}
				Element.show(eles.mini.more);
			}
			else
				minifeed.requestCont();
		}
	};
			
	this.initialize = function() {
		this.loaded();
		Feed.init();
		
	};
	this.refresh = function() {
		Feed.init();
		this.loaded();
	};
	this.destroy = function() {
		m_content.innerHTML = "";
	};
};
registerWidget("miniblog");