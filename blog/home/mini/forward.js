/**
 * 转发相关
 * @author junchen626;
 */
if(!Mini)var Mini={};
Mini.Forward={
	txtConstrain:function(el,maxNum,noteEl){
		if(!el)return;
		maxNum = maxNum||280;
		var txt = el.value.trim();
		if(Mini.Util.getTxtLength(txt) >maxNum){
			el.value=Mini.Util.limitTxt(txt,maxNum);
		}
		txt = el.value.trim();
		if(noteEl){
			var charLeft = maxNum - Mini.Util.getTxtLength(txt);
			charLeft = (charLeft%2==0)?charLeft/2:(charLeft-1)/2
			noteEl.innerHTML = charLeft;
		}
	},
	showForm:function(ouid,oid,puid,pid,el){
		//if(!User.isLogin()){needLoginAlert();return;}
		if(!el)return;
		el = $(el);
		var postEl = el.up('li.feedItem');//空间页
		var forwardEl = postEl.down('div.quoteBox');
		if(forwardEl){
			var forwardTxtEl = forwardEl.down('span.ForwardTxt');
			if(!forwardTxtEl)return;
			var forwardTxt = forwardTxtEl.innerHTML;
		}else{
			var forwardTxtEl = postEl.down('span.ForwardTxt');
			var forwardTxt = forwardTxtEl.innerHTML;
		}
		forwardTxt = Mini.Util.limitTxt(forwardTxt,280);
		
		var str='<b>转：</b>'+forwardTxt
				+'<div style="padding:20px 0 0 10px"><div class="PopContentTxtTips">还可以输入<span id="forwardReasonCharLeft">140</span>个汉字</div>'
				+'<textarea rows="10" cols="50" id="forwardReason" class="text blank">随便说点什么吧……</textarea></div>';
		Mini.MsgBox.confirmExt('',str,function(){
			clearInput($('forwardReason'),'随便说点什么吧……');
			var forwardReason = $('forwardReason').value.trim();
			var url = '/mini/a/document/save.do';
			var pars= 's=icon&ouid='+ouid+'&oid='+oid+'&puid='+puid+'&pid='+pid+'&content='+encodeURIComponent(forwardReason);
			
			new Ajax.Request(url,{
				method:'post',
				parameters:pars,
				onComplete:function(response){
					if(response.status == 200){
						eval('var forwardJson = '+response.responseText);
						if(forwardJson){
							if(forwardJson.status == 1){
								Mini.MsgBox.alert('转发成功');
								//转发的转发，更新转发数
//								if(forwardEl){
//									var numEl = forwardEl.down('span.ForwardCount',1);
//								}else{
//									var numEl = postEl.down('span.ForwardCount');
//									
//								}
//								if(numEl){
//									var numTxt = numEl.innerHTML;
//									var num = parseInt(numTxt.replace('(','').replace(')',''));
//									if(isNaN(num))num=0;
//									if(numTxt == ''){
//										numEl.replace('('+numEl.inspect()+(num+1)+'</span>)')
//									}else{
//										numEl.innerHTML = num+1;
//									}
//								}
								
								//更新到列表
								Mini.Post.addToList(forwardJson);
								return;
							}else{
								if(forwardJson.statusText.indexOf('未登录') != -1){
									needLoginAlert('登录后才能转发微博');return;
								}else{
									Mini.MsgBox.alert(forwardJson.statusText);return;
								}
							}
						}else{
							Mini.MsgBox.alert('转发失败,返回数据格式错误');return;
						}
					}else{
						Mini.MsgBox.alert('转发失败,服务器返回错误，请稍后重试');return;
					}
					Mini.MsgBox.alert('转发失败');
				}});
		});
		var reasonEl = $('forwardReason');
		if(reasonEl){
			Event.observe(reasonEl,"click",function(){clearInput(reasonEl,'随便说点什么吧……',function(){reasonEl.removeClassName('blank');});});
			Event.observe(reasonEl,"blur",function(){restoreInput(reasonEl,'随便说点什么吧……',function(){reasonEl.addClassName('blank');})});
			Event.observe(reasonEl,"propertychange",function(){Mini.Forward.txtConstrain(reasonEl,280,$('forwardReasonCharLeft'))});
			Event.observe(reasonEl,"input",function(){Mini.Forward.txtConstrain(reasonEl,280,$('forwardReasonCharLeft'))});
			Event.observe(reasonEl,"change",function(){Mini.Forward.txtConstrain(reasonEl,280,$('forwardReasonCharLeft'))});
			
		}
	}
	
}
