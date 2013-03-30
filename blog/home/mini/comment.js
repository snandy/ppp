/**
 * 评论相关操作
 * @author junchen626
 */
var Comment={
	posturl:'/mini/a/comment/save.do',
	delurl:'/mini/a/comment/delete.do',
	defaultText:'添加评论',
	bindEvent:function(){
		this.bindEventByElement(document);
	},
	bindEventByElement:function(A){
		var forms = A.getElementsByTagName("form");
		for(var i=0;i<forms.length;i++){
			var f = forms[i];
			if(f.id.indexOf("frmCmt_") != -1){
				if(f.id.indexOf("_f") == -1){
					//评论框加上事件
					Event.observe(f.content,"click",this.onclickCtt.bind(f));
					Event.observe(f.content,"focus",this.onclickCtt.bind(f));
				}
				
				//this.autoHeight(f.content);
				Event.observe(f.content,"keydown",this.shortcut.bindAsEventListener());
				Event.observe(f.content,"input",this.textConstrain.bindAsEventListener());
				Event.observe(f.content,"propertychange",this.textConstrain.bindAsEventListener());
				Event.observe(f.content,"change",this.textConstrain.bindAsEventListener());
				Event.observe(f,"submit",this.add.bind(f));
				var sbmtBtn = f.down('.btn');
				Event.observe(sbmtBtn,"click",this.add.bind(f));
//				var ebtn=document.getElementsByClassName("commentToolLeft",f);//表情按钮
//				if(ebtn){
//					ebtn = ebtn[0];
//					ebtn.hide();
//					Event.observe(ebtn,"click",Mini.Emotion.show.bind(f.content));
//				}
			}
		}
	},
	shortcut:function(event){
		var el = Event.element(event);
		var frm = el.up('form');
		if(event.ctrlKey && event.keyCode==13){
			
			if(frm){
				Comment.add.bind(frm)();
			}
		}
		
	},
	textConstrain:function(event){
		var el = Event.element(event);
		var frm = el.up('form');
		var txt = el.value.trim();
		var maxNum = 280;
		if(Mini.Util.getTxtLength(txt) >maxNum){
			el.value=Mini.Util.limitTxt(txt,maxNum);
		}
		txt = el.value.trim();
		var noteEl = frm.down('div.fcmInputNo');
		if(noteEl)noteEl = noteEl.down('span');
		if(noteEl){
			var charLeft = maxNum - Mini.Util.getTxtLength(txt);
			charLeft = (charLeft%2==0)?charLeft/2:(charLeft-1)/2
			noteEl.innerHTML = charLeft;
		}
	},
	autoHeight:function(A){
		var smartTextarea = function(minH){
			this.parentNode.style.height = this.offsetHeight+'px';
			var _padding = 0;
			if(Prototype.Browser.IE || Prototype.Browser.WebKit){
				var _padding = parseInt($(this).getStyle('padding-top'))+parseInt($(this).getStyle('padding-bottom'));
				
			}
			if(Prototype.Browser.IE && (this.style.height = (this.scrollHeight-_padding)+'px')){
				//元素的height发生变化也会触发propertychange，所以要做下判断放置死循环
				return;
			}
			
			this.style.height = '';
			this.style.height = (this.scrollHeight-_padding)+'px';
			
			this.parentNode.style.height = '';
		};
		
		
		//for ie
		Event.observe(A,"propertychange",smartTextarea.bind(A));
		
		//for gecko webkit
		Event.observe(A,"input",smartTextarea.bind(A));
	},
	clearHeight:function(A){
		A.style.height='';
	},
	getIdStr:function(fA){
		var str	= fA.appId.value + '_' + fA.apiid.value;
		if(fA.random)
			str += '_' + fA.random.value;
		return str;
	},
	onclickCtt:function(){
		$(this.content).removeClassName('blank');
		clearInput(this.content,Comment.defaultText);
	},
	
	add:function(){
		if(this.content.value.trim() == Comment.defaultText){
			this.content.value = '';
		}
		if(this.content.value.trim() == ""){
			emptyContentAlert(this.content);
			return;
		}
		var pars = "appId="+this.appId.value+"&apiid="+this.apiid.value
					+"&tuid="+this.tuid.value+"&url="+encodeURIComponent('http://t.sohu.com/document/detail.do?u='+this.tuid.value+'&id='+this.apiid.value)
					+"&picsrc="+this.picsrc.value+"&auids="+this.auids.value
					+"&content="+encodeURIComponent(this.content.value.trim())
					+"&format="+encodeURIComponent(this.format.value.trim())
					+"&sname="+encodeURIComponent('微博')
					+"&title="+encodeURIComponent(this.title.value.trim());
		
		if($('did'+this.apiid.value)){
			pars += '&tm='+$('did'+this.apiid.value).value;
		}
					
		//发布按钮置为disabled
		var sbmtBtn = this.down('.btn');
		sbmtBtn.innerHTML = '<b><i class="i iloading"></i>提交中</b>'
		sbmtBtn.addClassName('btn_dis');
		
		 new Ajax.Request(Comment.posturl,{
	          method:'post',
	          parameters:pars,
	          onComplete:function(response){
	          	
	          		//发布按钮置为enable
	          		
					sbmtBtn.innerHTML = '<b>提 交</b>'
					sbmtBtn.removeClassName('btn_dis');
					
	          		if(response.status == 200){
		          		eval("var json="+response.responseText);
		          		if(json){
		          			if(json.status == 1){
		          				Comment.clearHeight(this.content);
		          				var n1=$('cmtcnt_'+Comment.getIdStr(this)+'_1');
				          		var n2=$('cmtcnt_'+Comment.getIdStr(this)+'_2');
				          		
		          				if(this.format.value == 0){
		          					//$(this.content).addClassName('blank');
		          					this.content.value='';
		          					this.auids.value='';
		          				
		          					//当前位置填充
		          					var cbdiv = $(this).down('div.fcmInt');
		          					if(cbdiv){
		          						if(!cbdiv.visible())cbdiv.show();
		          						cbdiv.innerHTML += json.data.view;
		          					}
		          					
		          					var noteEl = this.down('div.fcmInputNo');
									if(noteEl)noteEl = noteEl.down('span');
									if(noteEl){
										noteEl.innerHTML = '140';
									}
		          				}else{
		          					this.content.value='';
		          					this.auids.value='';
		          				
		          					//列尾位置填充
		          					if($('noCommentNote')){
		          						var cbdiv = new Element('ul');
		          						cbdiv.id = 'cmtnew_'+this.appId.value+'_'+this.apiid.value;
		          						$('noCommentNote').replace(cbdiv);
		          					}else{
		          						var cbdiv = $('cmtnew_'+this.appId.value+'_'+this.apiid.value);
		          					}
		          					if(cbdiv){
		          						cbdiv.innerHTML += json.data.view;
		          						if(!cbdiv.visible())cbdiv.show();//列表为空时默认是不显示的，这里把它显示出来
		          					}
		          					var commentNum = 0;
		          					if(n1&&n1.innerHTML != ''){
		          						commentNum = parseInt(n1.innerHTML);
		          					}
		          					//显示页底评论框
		          					var cmtFrmdiv = $('cmtfullfrm_'+this.appId.value+'_'+this.apiid.value);
		          					if(cmtFrmdiv && !cmtFrmdiv.visible() && commentNum>=3){
		          						cmtFrmdiv.show();
		          					}
		          					
		          					//document.location.href = document.location.href.replace('#footer','')+"#footer";
//		          					var lastEl = cbdiv.lastChild;
//		          					if(lastEl){
//									    var pos = $(lastEl).cumulativeOffset();
//									    window.scrollTo(pos[0]-200, pos[1]);
//		          					}
				          				
				          		}
		          				if(n1){
				          			if(n1.innerHTML == ""){
				          				n1.replace('('+n1.inspect()+(parseInt(n1.innerHTML==""?0:n1.innerHTML)+1)+'</span>)')
				          			}else{
				          				n1.innerHTML = parseInt(n1.innerHTML==""?0:n1.innerHTML)+1;
				          			}
				          		}
				          		if(n2)n2.innerHTML = parseInt(n2.innerHTML==""?0:n2.innerHTML)+1;
		          			}else{
	          					Mini.MsgBox.alert(json.statusText);
	          				}
		          		}
	          		}else{
	          			Mini.MsgBox.alert("服务器异常错误，请稍后重试");
	          		}
	          }.bind(this)
		 });
		return false;
	},
	del:function(eA,iB,iC,iD){
		if(!User.isLogin()){Mini.MsgBox.alert('您未登录，无法执行此操作');return;}
		Mini.MsgBox.confirm("确认删除此篇评论?",function(){
			eA = $(eA);
			var cmtCtner = eA.up("li.tcItem");
			var pars="appId="+iB+"&apiid="+iC+"&cId="+iD;
			
			new Ajax.Request(Comment.delurl,{
				method:'get',
				parameters:pars,
				onComplete:function(response){
					if(response.status == 200){
						eval("var json="+response.responseText);
		          		if(json){
		          			if(json.status == 1){
		          				if(cmtCtner){
		          					//cmtCtner.remove();
		          					Mini.Vision.slideRemove(cmtCtner,{interval:20});
		          				}
		          				var n1=$('cmtcnt_'+iB+'_'+iC+'_1');
				          		
	          					if(n1){
				          			if(n1.innerHTML == ""){
				          				
				          			}else{
				          				var num = parseInt(n1.innerHTML==""?0:n1.innerHTML)-1;
				          				
				          				n1.innerHTML = num;
				          				
				          			}
				          		}
	          					
		          			}else{
	          					Mini.MsgBox.alert(json.statusText);
	          				}
		          		}
					}else{
		          		Mini.MsgBox.alert("服务器异常错误，请稍后重试");
		          	}
				}.bind(this)
			});
		});
		
	},
	showForm:function(evt,A,B){
		evt = evt ? evt : (window.event ? window.event : null);   
        var elem = evt.srcElement ? evt.srcElement : evt.target;  
		var cmtDiv = $('cmtlst_'+A+'_'+B);
		var cmtForm = $('frmCmt_'+A+'_'+B);
		Event.stop(evt);
		if((cmtDiv && cmtDiv.visible())||(!cmtDiv && cmtForm.visible())){
			cmtForm.content.focus();
//			if(typeof createTextRange != 'undefined'){
//				var   r   =cmtForm.content.createTextRange();
//				r.moveStart('character',cmtForm.content.value.length);    //定位到第三个字符
//				r.collapse(true);   
//				r.select();
//			}
			return;
		}
		if(cmtDiv){
			cmtDiv.show();
			cmtForm.content.focus();
			outEvent([cmtDiv,elem],function(){
				if(!cmtDiv||!cmtForm||!cmtForm.content){return;}
				if(cmtForm.content.value.trim() == "" || cmtForm.content.value.trim() == "添加评论"){cmtDiv.hide();return true;}})
		}
	},
	reply:function(A,B,C,D,E){
		A = $(A);
		if(D && D == "simple"){
			var cmtCtner = A.up("div.feedItem");
		}else{
			var cmtCtner = A.up("li.tcItem");
		}
		if(cmtCtner){
			var cUser = cmtCtner.down('.fcmHead');
			if(cUser){
				cUser = cUser.down('a');
				var uname = cUser.innerHTML.trim();
			}
		}
		if(D && D == "simple"){
			var f = $("frmCmt_"+B+"_"+C);
		}else{
			var f = $("frmCmt_"+B+"_"+C);
			var cmtFrmdiv = $('cmtfullfrm_'+B+'_'+C);
			if(!cmtFrmdiv.visible())cmtFrmdiv.show();
		}
		
		var reply_prefix = "@"+uname+" ";
		if(f){
			f.content.focus();
			var c = f.content.value.trim();
			if(c=="添加评论"){
				c='';
			}
			c = c.replace(reply_prefix,'');
			c = reply_prefix+c;
			f.content.value = c;
			
			if(E){
				var auidstr = f.auids.value.trim();
				var auids = auidstr.split(',');
				var exists = false;
				auids.each(function(s){
					if(s==E){
						exists = true;return;
					}
				});
				if(!exists){
					auidstr = (auidstr != '')?(auidstr+','+E):E;
					f.auids.value = auidstr;
				}
			}
		}
	}
	
}