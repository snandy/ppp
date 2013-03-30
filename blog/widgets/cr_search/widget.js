/******* PP Set Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-10-27
//	Last Update: 2006-10-27
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
var cr_search = function(m_data, m_content, m_edit){
	var elmOutput;
	var search;


	this.initialize = function() {
		this.build();
	};
	this.destroy = function() {
		if (elmOutput) {
			Element.remove(elmOutput);
		}
	};
	this.saveData = function() {
		this.build();
	};
	this.build = function(nocache) {
		this.setTitle("同学大搜捕");
		this.destroy();
		m_content.innerHTML = '';
		if (!search) {
			elmOutput = document.createElement('div');
			elmOutput.innerHTML = App.Lang.loading;
			m_content.appendChild(elmOutput);
			this.showContent();
		}
		else {
			this.showContent();
		}
	};
	this.showContent = function() {
		var str = '';
		str += '<form action="http://search.chinaren.com/alusearch/cm_search.jsp" target="_blank" method="post" id="alu_blog_search_form">\n';
		str += '	<div>\n';
		str += '		<input id="alu_blog_search_input" type="text" name="keyword" class="text" value="" />\n';
		//str += '	</div>\n';
		//str += '	<div>\n';
		str += '		<select id="alu_blog_search_select" onchange="alu_search_change(this.value)" class="select" >\n';
		str += '			<option value="1">同学</option>\n';
		str += '			<option value="2">班级</option>\n';
		str += '			<option value="3">学校</option>\n';
		str += '		</select>\n';
		str += '		<input type="submit" value="搜索" class="button-submit" />\n';
		str += '	</div>\n';
		str += '</form>\n';
		elmOutput.innerHTML = str;		
	};

};
function alu_search_change(n) {
	//var keyword = $("alu_blog_search_select").options[n].text;
        //var obj = $("alu_blog_search_input");
        //obj.value = keyword;
	if(n==1)
		$('alu_blog_search_form').action = "http://search.chinaren.com/alusearch/cm_search.jsp";
	else if(n==2)
		$('alu_blog_search_form').action = "http://search.chinaren.com/alusearch/class_search.jsp";
	else
		$('alu_blog_search_form').action = "http://search.chinaren.com/alusearch/school_search.jsp";

}


registerWidget('cr_search');
