/******* Hello World Widget **********/
//      Author: Todd Lee (www.todd-lee.com)
//      First Created: 2006-03-08
//      Last Update: 2006-03-08
//      Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var search = function(m_data, m_content, m_edit, w_path){
        var elmOutput;

        var urls = {
                'searchWeb' : 'http://www.sogou.com/web',
                'searchBlog' : 'http://blogsearch.sogou.com/blog',
                'searchMusic' : 'http://mp3.sogou.com/music.so'
        };

        this.initialize = function() {
                this.build();
        };
        this.destroy = function() {
                Element.remove(elmOutput);
        };


        this.build = function() {
                elmOutput = document.createElement('div');
                elmOutput.innerHTML = App.Lang.loading;

                m_content.appendChild(elmOutput);

                var str =  '';
				str += '<table cellpadding="0" cellspacing="0" width="99%" class="searchBox"><tr><td class="searchBoxL"></td><td class="searchBoxC">';
                str += '<div id="searchTags">';
                str += '<div id="searchBlog" class="btn2">≤©øÕ</div>';
                str += '<div id="searchWeb" class="btn1">Õ¯“≥</div>';
                str += '<div id="searchMusic" class="btn1">“Ù¿÷</div>';
                str += '</div>';
                str += '<div id="widgetSearch" style="clear:both;">';
                str += '<form id="widgetSearchForm" action="http://blogsearch.sogou.com/blog" method="get" target="_blank">';
                str += '<table cellpadding="0" cellspacing="0" width="95%"><tr>';
                str += '<td><input id="sogouQuery" name="query" class="text" style="width: 100%;"> </td>';
                str += '<td><input name="p" value="40230700" type="hidden"><input id="sogouQueryInsite" name="insite" value="blog.sohu.com" type="hidden"> </td>';
                str += '<td width="41"><input type="image" src="'+w_path+'search.gif"></td>';
                str += '</tr></table>';
                str += '</form>';
                str += '</div>';
				str += '</td><td class="searchBoxR"></td></tr></table>';
                elmOutput.innerHTML = str;
                this.tags = $("searchTags");
                $A(this.tags.childNodes).each(function(c){
                                c.onclick = this.selectTag.bind(this, c.id);
                                c.onmouseover = this.overTag.bind(this, c.id);
                                c.onmouseout = this.outTag.bind(this, c.id);
                                }.bind(this));
				$("sogouQuery").value= getBlogTitle();
        
        };
        this.selectTag = function(tag) {
                //  this.tags = $("searchTags");
                $A(this.tags.childNodes).each(function(c){
                                if(c.id == tag){
                                c.className = 'btn2';
                                
                                }else{
                                c.className = 'btn1'
                                }
                                }.bind(this));
                $('widgetSearchForm').setAttribute('action', urls[tag]);
                if(tag == 'searchBlog'){ 
					$('sogouQueryInsite').value = 'blog.sohu.com';
				} else {
					$('sogouQueryInsite').value = '';
				}
        };
        this.overTag = function(tag) {
                var elem = $(tag);
                if(elem){
                        if(elem.className != "btn2")  elem.className = "event";
                }
        };
        this.outTag = function(tag) {
                var elem = $(tag);
                if(elem){
                        if(elem.className != "btn2")  elem.className = "btn1";
                }
        };
};
registerWidget('search');
