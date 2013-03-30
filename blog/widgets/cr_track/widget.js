
var cr_track = function(m_data, m_content, m_edit, w_path){
	var elmOutput;
	var data_server = "http://i.chinaren.com/json/json_track.jsp";

	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		Element.remove(elmOutput);
	};

	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);
		
	};
	
	this.updateData = function(){
		var dataURL = data_server + "?act=get&uid="+_xpt;
		new LinkFile(dataURL, {
			type: 'script',
			callBack: {
				variable: '_cr_track',
				onLoad: this.showSetsList.bind(this),
				onFailure: this.noSetsList.bind(this)
				/*timeout: 5000
				timerStep: 500*/
			}});		
		elmOutput.innerHTML = "";
		if(App.Permit.editModule){
			elmOutput.innerHTML = '<table width="99%"><tr><td colspan="2"><textarea id="alumni_trend_text" class="text" style="width:100%"  onblur="if(this.value==\'\')this.value=\'写下我的近况，和大家分享。\';" onfocus="if(this.value==\'写下我的近况，和大家分享。\')this.value=\'\';" onkeyup="alu_blog_track_checkcount()" >写下我的近况，和大家分享。</textarea></td></tr><tr><td width="50%"><input value="说一句" class="button-submit" type="button" onclick="alu_blog_track_submit()"></td><td class="tips" id="alumni_trend_tips" align="right">可以输入100字</td></tr></table><hr/>';
			
		}
	}

	this.saveData = function() {
		this.saveBtn.disabled = 'disabled';
		var dataURL = data_server + "?data=haha";
		new LinkFile(dataURL, {
                                        type: 'script',
                                        callBack: {
                                                variable: '_cr_track',
                                                onLoad: this.showSetsList.bind(this),
                                                onFailure: this.noSetsList.bind(this),
                                                timeout: 5000
                                                /*timerStep: 500*/
                                        }});
		this.saveBtn.disabled = '';
		this.updateData();
		this.closeEdit();
	
	};
	
	this.showSetsList = function() {
		var str = '';
		//elmOutput.innerHTML = "";
		if(App.Permit.editModule){
			/*var newdiv = document.createElement("div");
			var newtable = document.createElement("table");
			var newtr = document.createElement("tr");
			var newtd = document.createElement("td");
			newtd.colSpan = 2;
			var newtext = document.createElement("textarea");
			newtext.className = "text";
			//newtext.type = "text";
			newtext.value = "";
			newtext.id = "alumni_trend_text";
			newtext.onfocus = "if(this.value=='写下我的近况，和大家分享。')this.value='';";
			newtext.onblur = "if(this.value=='')this.value='写下我的近况，和大家分享。';";
			newtext.value = "写下我的近况，和大家分享。";
			
			newtd.appendChild(newtext);
			newtr.appendChild(newtd);
			newtable.appendChild(newtr);
			newtr = document.createElement("tr");
			newtd = document.createElement("td");
			newtd.width = "50%";
			newtext = document.createElement("input");
			newtext.className = "button-submit";
                        newtext.type = "button";
                        newtext.value = "说一句";
		
			newtext.onclick = this.subMit;
			newtd.appendChild(newtext);
			newtr.appendChild(newtd);
			newtd = document.createElement("td");
			newtd.align = "right";
			newtd.className = "tips";
			newtd.innerText = "可以输入70字";
			newtr.appendChild(newtd);
			newtable.appendChild(newtr);
			newdiv.appendChild(newtable);
			
			elmOutput.appendChild(newdiv);*/
			//elmOutput.innerHTML = '<table width="99%"><tr><td colspan="2"><textarea id="alumni_trend_text" class="text" style="width:100%"  onblur="if(this.value==\'\')this.value=\'写下我的近况，和大家分享。\';" onfocus="if(this.value==\'写下我的近况，和大家分享。\')this.value=\'\';" onkeyup="alu_blog_track_checkcount()" >写下我的近况，和大家分享。</textarea></td></tr><tr><td width="50%"><input value="说一句" class="button-submit" type="button" onclick="alu_blog_track_submit()"></td><td class="tips" id="alumni_trend_tips" align="right">可以输入100字</td></tr></table><hr/>';
		}
		var newdiv2 = document.createElement("div");
		newdiv2.id = "alumni_trend_list";
		if(_cr_track["trends"].length <= 0) {
			str += '<div class="item" style="border-bottom:1px dashed #CCCCCC;height:100%;padding-top:2px;"><div class="content"><dl><dt>没有近况，瞎忙&nbsp;&nbsp;</dt></dl></div></div>';
		}else{
			for(var i = 0 ;i < _cr_track["trends"].size()-1;i++){
				str += '<div class="item" style="border-bottom:1px dashed #CCCCCC;height:100%;padding-top:2px;"><div class="content"><dl><dt>'+_cr_track["trends"][i].title+'&nbsp;&nbsp;<small>'+_cr_track["trends"][i].time+'</small></dt></dl></div></div>';
			}
		}
		newdiv2.innerHTML = str ;
		elmOutput.appendChild(newdiv2);
        };
        this.noSetsList = function() {
		var newdiv2 = document.createElement("div");
		newdiv2.id = "alumni_trend_list";
		var str = '<div class="item" style="border-bottom:1px dashed #CCCCCC;height:100%;padding-top:2px;"><div class="content"><dl><dt>没有近况，瞎忙&nbsp;&nbsp;</dt></dl></div></div>';
		newdiv2.innerHTML = str ;
		elmOutput.appendChild(newdiv2);
		
        };
	this.subMit = function(){
		if($("alumni_trend_text") != null){
			if($("alumni_trend_text").value.strip().length <= 0 || $('alumni_trend_text').value == '写下我的近况，和大家分享。'){
				alert("你还没有输入近况");
				return;
			}
			//var dataURL = data_server + "?act=save&trend="+$("alumni_trend_text").value;
			var dataURL = "http://i.chinaren.com/user/trendAction.jsp?actfrom=feed&act=updateTrend&memo="+encodeURIComponent2($('alumni_trend_text').value);
			new LinkFile(dataURL, {
						type: 'script'
				});
		}
		
	};
};
function feed_memo(){
	if($("alumni_trend_list") != null){
		var newdiv = document.createElement("div");
		//newdiv.className = "item";
		//newdiv.style = "border-bottom:1px dashed #CCCCCC;height:100%;padding-top:2px;";
		newdiv.innerHTML = '<div class="item" style="border-bottom:1px dashed #CCCCCC;height:100%;padding-top:2px;"><div class="content"><dl><dt>'+$("alumni_trend_text").value+'&nbsp;&nbsp;<small>刚刚</small></dt></dl></div></div>';
		$("alumni_trend_list").insertBefore(newdiv,$("alumni_trend_list").firstChild);
		$('alumni_trend_text').value = "";
		$("alumni_trend_tips").innerHTML = "可以输入100个字";
        }
}
function encodeURIComponent2(str){
        var ret = "";
        for(var i=0;i<str.length;i++){
                var unicode = str.charCodeAt(i);
                if((unicode >= 12592 && unicode <= 12687) || (unicode >= 44032 && unicode<=55203)){
                        ret += "%26%23"+str.charCodeAt(i);
                }else if(str.charAt(i) == '+'){
                        ret += encodeURIComponent(str.charAt(i));
                }else{
                        ret += escape(str.charAt(i));
                }
        }
        return ret;
}
function alu_blog_track_submit(){
	if($("alumni_trend_text") != null){
		if($("alumni_trend_text").value.strip().length <= 0 || $('alumni_trend_text').value == '写下我的近况，和大家分享。'){
			alert("你还没有输入近况");
			return;
		}
		//var dataURL = data_server + "?act=save&trend="+$("alumni_trend_text").value;
		var dataURL = "http://i.chinaren.com/user/trendAction.jsp?actfrom=feed&act=updateTrend&memo="+encodeURIComponent2($('alumni_trend_text').value);
		new LinkFile(dataURL, {
					type: 'script'
			});
	}
		

}
function alu_blog_track_checkcount(){
	var left = Math.max((100-$("alumni_trend_text").value.trim().length), 0);
	$("alumni_trend_tips").innerHTML = left > 0 ? ('可以输入' + left + '个字') : '不允许再输入';
	if(left == 0) $("alumni_trend_text").value = $("alumni_trend_text").value.substring(0,100);
	
}
registerWidget('cr_track');

