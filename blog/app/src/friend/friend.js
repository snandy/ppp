SohuBlog.App.Friend = {
	addGroupUrl:'/a/app/friend/group/add.do',
	updateGroupUrl:'/a/app/friend/group/update.do',
	deleteGroupUrl:'/a/app/friend/group/delete.do',
	addUrl:'/a/app/friend/friend/add.do',
	updateUrl:'/a/app/friend/friend/update.do',
	deleteUrl:'/a/app/friend/friend/delete.do',
	ignoreUrl:'/a/app/friend/fans/ignore.do',
	passUrl:'/a/app/friend/fans/pass.do',
	addMappingUrl:'/a/app/friend/friend/addmapping.do',
	deleteMappingUrl:'/a/app/friend/friend/delmapping.do',
	setPmUrl:'/a/app/friend/friend/setpm.do',
	dsaUrl:'/a/app/friend/friend/dsa.do',
	groupList:[],
	currentGroup:0,
	lastSearchKey:'',
	initView:function(){
		this.groupListHover();
		this.friendListHover();
		this.bindClickEvent();
		
		this.getCurGroupId();
		this.getAllGroups();
	},
	groupListHover:function(){
		$$('.f4 ul li').each(function(oEl){ 
			Event.observe(oEl,'mouseover',function(){$(this).addClassName("fgpact");}.bind(oEl)); 
			Event.observe(oEl,'mouseout',function(){$(this).removeClassName("fgpact");}.bind(oEl)); 
		}) 
	},
	friendListHover:function(){
		$$('.fri').each(function(oEl){ 
			Event.observe(oEl,'mouseover',function(){$(this).addClassName("friact");}.bind(oEl)); 
			Event.observe(oEl,'mouseout',function(){$(this).removeClassName("friact");}.bind(oEl)); 
		})
	},
	bindClickEvent:function(){
		//添加分组
		var aEl = $$('.addfg a')[0];
		Event.observe(aEl,'click',this.toggleAddGroupForm.bind(this));
		//编辑分组
		$$('.f4 .fedit').each(function(o){
			Event.observe(o,'click',this.toggleModifyGroupForm.bindAsEventListener(this));
		}.bind(this))
		//删除分组
		$$('.f4 .fdel').each(function(o){
			Event.observe(o,'click',this.deleteGroup.bindAsEventListener(this));
		}.bind(this))
		this.bindFriendListEvent();
		//搜索框
		if($('search_key')){
			//Event.observe($('search_key'),'change',this.searchFriend.bind(this));
			Event.observe($('search_key'),'input',this.searchFriend.bind(this));
			//Event.observe($('search_key'),'keydown',this.searchFriend.bind(this));
			Event.observe($('search_key'),'propertychange',this.searchFriend.bind(this));
			Event.observe($('search_key'),'blur',function(){if($('search_key').value.trim()==''){$('search_key').value = '搜索好友...';}});
			Event.observe($('search_key'),'click',function(){if($('search_key').value.trim()=='搜索好友...'){$('search_key').value = '';}});
			
		}
	},
	bindFriendListEvent:function(){
		//好友分组选择
		$$('.f3 .fgp').each(
			function(o){
				Event.observe(o,'click',this.toggleGroupSelector.bindAsEventListener(this));
			}.bind(this))
		
		//编辑好友信息
		$$('.f3 .fedit').each(function(o){
			Event.observe(o,'click',this.showModifyFriend.bindAsEventListener(this));
		}.bind(this))
		
		//编辑好友信息
		$$('.f3 .fdel').each(function(o){
			Event.observe(o,'click',this.showDeleteFriend.bindAsEventListener(this));
		}.bind(this))
	},
	binPrivacyTabEvent:function(){
		var btn = $('privacy_form').down('.btn');
		Event.observe(btn,'click',this.setPrivacySetting.bindAsEventListener(this))
	},
	binRequestTabEvent:function(){
		$$('.fri .btn').each(function(o){
			if(o.hasClassName('btn_dis')){
				Event.observe(o,'click',this.ignoreFriendRequest.bindAsEventListener(this));
			}else{
				Event.observe(o,'click',this.approveFriendRequest.bindAsEventListener(this));
			}
		}.bind(this))
	},
	getCurGroupId:function(){
		var hash = ''
		var matches = window.location.toString().match(/^[^#]*(#.+)$/);
		if (matches) {
			hash = matches[1];
		}
		var groupId = 0;
		if(hash.indexOf('groupId=') != -1){
			groupId = hash.substring(hash.indexOf('groupId=')+('groupId='.length));
			if(groupId.indexOf('&') != -1){
				groupId = hash.substring(hash.indexOf('&')+('&'.length));
			}
			groupId = parseInt(groupId);
			if(isNaN(groupId))groupId = 0;
		}
		this.currentGroup = groupId;
	},
	toggleAddGroupForm:function(){
		var form = $$('.pop1')[0];
		if(form.visible()){
			form.hide();
		}else{
			form.show();
		}
	},
	addGroup:function(event,type){
		var srcEle = Event.element(event);
		var form = srcEle.up('form');
		var gname = form.gname.value.trim();
		if(gname == ''){
			emptyContentAlert(form.gname);
			return;
		}
		var pars = 'gname='+encodeURIComponent(gname);
		new Ajax.Request(this.addGroupUrl,{
			 method:'post',
	         parameters:pars,
	         onComplete:function(response){
	         	if(response.status == 200){
	         		eval('var json='+response.responseText)
	         		if(json){
	          			if(json.status == 1){
	          				this.addGroupSuccessOnList(json);
	          				form.gname.value = '';
	          				if(type && type == 'selector'){
	          					var fid = form.fid.value;
	          					this.addGroupSuccessOnSelector(json,fid);
	          				}
	          				this.getAllGroups();
	          			}else{
	          				Mini.MsgBox.alert(json.statusText);return;
	          			}
	         		}
	         	}else{
	         		this.onError(response.status)
	         	}
	         	
	         }.bind(this)
		})
	},
	addGroupSuccessOnList:function(json){
		var data = json.data;
		var gid = json.data.gid;
		var gname = json.data.gname;
		var html = '<li class="" id="group_'+gid+'"><a class="fedit" href="#"><i class="i-fedit"></i></a><a class="fdel" href="#"><i class="i-fdel"></i></a>'
					+'<h4><a href="/app/friend/friend/double.do?groupId='+gid+'"><span>'+gname+'</span><span>(<b>0</b>)</span></a></h4>'
					+'</li>';
		var elements = $$('.f4 ul li');
		if(elements.length > 1){
			var element = elements[elements.length - 2];
			new Insertion.After(element, html);
		}else{
			var element = $$('.f4 ul')[0];
			element.insert(html);
		}
		this.groupListHover();
	},
	addGroupSuccessOnSelector:function(json,fid){
		var data = json.data;
		var gid = json.data.gid;
		this.addGroupMapping(fid,gid);
	},
	toggleModifyGroupForm:function(event){
		var srcEle = Event.element(event);
		var itemContainer = srcEle.up('li');
		var gid = itemContainer.id;
		gid = gid.substring('group_'.length);
		Event.stop(event);
		if(!$('grpmd_'+gid)){
			var ele = new Element('li');
			ele.id='grpmd_'+gid;
			ele.innerHTML = '<form><h4><p><input type="text" name="gname" value=""></p>'
					+'<input name="gid" type="hidden" value='+gid+'>'
					+'<p><a class="fgyes" href="javascript:void(0)"><b>确定</b></a>' +
					'<a class="fgno" href="javascript:void(0)"><b>取消</b></a></p></h4>';
			ele.hide();
			ele.addClassName('fgmod');
			var btnOk = ele.down('.fgyes');
			var btnCancel = ele.down('.fgno');
			
			Event.observe(btnOk,'click',this.modifyGroup.bindAsEventListener(this));
			Event.observe(btnCancel,'click',this.toggleModifyGroupForm.bindAsEventListener(this));
			$('group_'+gid).insert({'after':ele})
		}
		
		if($('grpmd_'+gid).visible()){
			$('grpmd_'+gid).hide();
			$('group_'+gid).show();
		}else{
			var gname = itemContainer.down('h4 a span').innerHTML;
			$('grpmd_'+gid).down('input').replace('<input type="text" name="gname" value="'+gname+'">');
			$('grpmd_'+gid).show();
			$('group_'+gid).hide();
		}
		Event.stop(event);
	},
	modifyGroup:function(event){
		var srcEle = Event.element(event);
		var form = srcEle.up('form');
		var gid = form.gid.value.trim();
		var gname = form.gname.value.trim();
		if(gname == ''){
			emptyContentAlert(form.gname);
			return;
		}
		var pars = 'gname='+encodeURIComponent(gname)
					+'&gid='+gid;
		new Ajax.Request(this.updateGroupUrl,{
			 method:'post',
	         parameters:pars,
	         onComplete:function(response){
	         	if(response.status == 200){
	         		eval('var json='+response.responseText)
	         		if(json){
	          			if(json.status == 1){
	          				var data = json.data;
	          				var gid = json.data.gid;
	          				var gname = json.data.gname;
	          				
	          				$('group_'+gid).down('h4 a span').innerHTML=gname;
	          				$('grpmd_'+gid).hide();
							$('group_'+gid).show();
							this.getAllGroups();
							return;
	          			}else{
	          				Mini.MsgBox.alert(json.statusText);return;
	          			}
	         		}
	         	}else{
	         		this.onError(response.status)
	         	}
	         	
	         }.bind(this)
		})
	},
	deleteGroup:function(event){
		var str = ' <p class="rep_c1">确定要删除分组吗？</p>\
                      <p class="rep_c2">提示：删除分组后，好友会被转移至未分组，不会丢失</p> ';

		Mini.MsgBox.confirmExt('',str,function(){this.doDeleteGroup(event)}.bind(this),'删除分组',false);
	},
	doDeleteGroup:function(event){
		var srcEle = Event.element(event);
		var itemContainer = srcEle.up('li');
		var gid = itemContainer.id;
		gid = gid.substring('group_'.length);
		var pars = 'gid='+gid;
		new Ajax.Request(this.deleteGroupUrl,{
			 method:'post',
	         parameters:pars,
	         onComplete:function(response){
	         	if(response.status == 200){
	         		eval('var json='+response.responseText)
	         		if(json){
	          			if(json.status == 1){
	          				$('group_'+gid).remove();
	          				this.getAllGroups();
	          				SohuBlog.App.getView();
	          				this.dsaInfo = null;
	          				return;
	          			}else{
	          				Mini.MsgBox.alert(json.statusText);return;
	          			}
	         		}
	         	}else{
	         		this.onError(response.status);
	         	}
	         }.bind(this)
		});
		Event.stop(event);
	},
	onError:function(code){
		Mini.MsgBox.alert('服务器暂时没有响应');
	},
	getAllGroups:function(){
		var groupEls = $$('.f4 ul li');
		var groups= [];
		groupEls.each(function(oEl){
			if(oEl.id && oEl.id.indexOf('group_') != -1){
				var id = oEl.id.substring('group_'.length);
				var name = oEl.down('h4 span').innerHTML;
				if(parseInt(id) > 0){
					groups.push({'id':id,'name':name});
				}
			}
		});
		this.groupList = groups;
		return groups;
	},
	toggleGroupSelector:function(event){
		var srcEle = Event.element(event);
		if(srcEle.className != 'fgp'){
			srcEle = srcEle.up('.fgp');
		}
		var friendId = srcEle.getAttribute('fid').trim();
		var inGroupIds = srcEle.getAttribute('gids').trim();
		var inGroupArr = inGroupIds.split(',');
		
		var groups = this.groupList;
		var selector = $('gselctor_'+friendId);
		if(selector){
			if(selector.visible()){
				selector.hide();
				Event.stop(event);
				return;
			}
		}else{
			var selector = new Element('div');
			selector.id='gselctor_'+friendId;
			selector.addClassName('popLayer');
			selector.addClassName('pop2');
			selector.hide();
			selector.innerHTML = '<div class="decor"><span class="tl"><span class="tr"><span class="br"><span class="bl"></span></span></span></span></div>'
				+'<div class="content">'
				+'<ul></ul><form onsubmit="return false;"><p><input type="hidden" name="fid" value="'+friendId+'"><input type="text" name="gname" class="fgtxt" value="新建分组"><a class="fgyes" href="javascript:void(0)"><b>确定</b></a>'
				+'</p></form></div></div>';
			var newGroupInput = selector.down('.fgtxt');
			var newGroupBtn = selector.down('a.fgyes');
			
			Event.observe(newGroupInput,'focus',function(){if(newGroupInput.value.trim() == '新建分组'){newGroupInput.value = ''}})
			Event.observe(newGroupInput,'blur',function(){if(newGroupInput.value.trim() == ''){newGroupInput.value = '新建分组'}})
		
			Event.observe(newGroupBtn,'click',function(event){this.addGroup(event,'selector')}.bindAsEventListener(this));
			$('canvas').insert(selector);
			
		}
		
		var groupContainer = selector.down('ul');			
		
		var str = '';
		groups.each(function(o){
			str += '<li><label class="chkbox"><input type="checkbox" id="'+o.id+'"';
			if(SohuBlog.Util.inArr(inGroupArr,o.id)){
				str += ' checked'
			}
			str += '>'+o.name+'</label></li>';
		})
		groupContainer.innerHTML = str;
		var idCBs = document.getElementsByClassName('chkbox',groupContainer);
		
		idCBs.each(function(oEl){
			var cb = oEl.down('input');
			var groupCheckChange=function(){
				if(cb.checked){
					this.addGroupMapping(friendId,cb.id);
				}else{
					this.deleteGroupMapping(friendId,cb.id);
				}
			}
			
			if(Browser.ua.indexOf('ie')>-1){
				
				Event.observe(cb,'propertychange',groupCheckChange.bind(this));
			}else{
				Event.observe(cb,'change',groupCheckChange.bind(this));
			}
		}.bind(this))
		
		var pos = Position.cumulativeOffset(srcEle);
		pos = [pos[0], (pos[1] + parseInt(srcEle.offsetHeight))];
		selector.setStyle({'left':pos[0]+'px','top':pos[1]+'px'})
		selector.show();
		
		outEvent([selector,srcEle],function(){
				selector.hide();return true;
			}.bind(this))
	},
	getGroupNameStr:function(groupIdArr){
		var groups = this.groupList;
		var str = '';
		for(var i=0;i<groupIdArr.length;i++){
			var id = groupIdArr[i];
			for(var j=0;j<groups.length;j++){
				if(id == groups[j].id){
					str += groups[j].name+',';
					break;
				}
			}
		}
		if(str.length>0){
			str = str.substring(0,str.length-1);
		}
		str = Mini.Util.limitU(str,17);
		return str;
	},
	updateGroupMemberCount:function(groupId,num){
		if($('group_'+groupId)){
			var str = $('group_'+groupId).down('span',1).innerHTML.toLowerCase();
			str = str.replace('<b>','').replace('</b>','').replace('(','').replace(')','');
			var n = parseInt(str.trim());
			if(isNaN(n))n=0;
			$('group_'+groupId).down('span',1).innerHTML = '(<b>'+(n+num)+'</b>)';
		}
	},
	updateAllGroupMemberCount:function(groupIds,num){
		var groupArr = groupIds.split(',');
		this.updateGroupMemberCount(0,num);
		groupArr.each(function(groupId){
			this.updateGroupMemberCount(groupId,num);
		}.bind(this))
	},
	addGroupMapping:function(friendId,groupId){
		var pars = 'friendid='+friendId+'&groupid='+groupId;
		
		new Ajax.Request(this.addMappingUrl,{
			method:'post',
			parameters:pars,
			onComplete:function(response){
				if(response.status == 200){
	         		eval('var json='+response.responseText)
	         		if(json){
	          			if(json.status == 1){
	          				$('gselctor_'+friendId).hide();
	          				var switcher = $('gswi_'+friendId);
	          				var idstr = switcher.getAttribute('gids');
	          				var oldIdStr = idstr;
	          				var idArr = idstr.split(',');
	          				if(!SohuBlog.Util.inArr(idArr,groupId)){
	          					idArr.push(groupId);
	          					idstr+=','+groupId;
	          				}
	          				
	          				if(this.currentGroup == -1){
	          					var fri = switcher.up('.fri');
								this.updateGroupMemberCount(groupId,+1);
								this.updateGroupMemberCount(-1,-1);
								Mini.Vision.slideRemove(fri,{step : 5,interval : 30,type:'remove'});
								
	          				}else{
	          					if(oldIdStr == ''){
									this.updateGroupMemberCount(-1,-1);
	          					}
		          				switcher.setAttribute('gids',idstr);
		          				var groupStr = this.getGroupNameStr(idArr);
		          				switcher.innerHTML = '<b>'+groupStr+'</b>';
		          				this.updateGroupMemberCount(groupId,1);
	          				}
	          				if(this.dsaInfo){
	          					this.updateDsaGroups(friendId,idstr);
	          				}
	          				return;
	          			}else{
	          				Mini.MsgBox.alert(json.statusText);return;
	          			}
	         		}
	         	}else{
	         		this.onError(response.status);
	         	}
			}.bind(this)
		})
	},
	deleteGroupMapping:function(friendId,groupId){
		var pars = 'friendid='+friendId+'&groupid='+groupId;
		
		new Ajax.Request(this.deleteMappingUrl,{
			method:'post',
			parameters:pars,
			onComplete:function(response){
				if(response.status == 200){
	         		eval('var json='+response.responseText)
	         		if(json){
	          			if(json.status == 1){
	          				$('gselctor_'+friendId).hide();
	          				var switcher = $('gswi_'+friendId);
	          				var idstr = switcher.getAttribute('gids');
	          				var idArr = idstr.split(',');
	          				
	          				if(SohuBlog.Util.inArr(idArr,groupId)){
	          					idArr = idArr.without(groupId);
	          					idstr = idArr.join(',');
	          				}
	          				switcher.setAttribute('gids',idstr);
	          				var groupStr = this.getGroupNameStr(idArr);
	          				
	          				if(this.currentGroup != 0 && groupId == this.currentGroup.toString()){
		          				
		          				var fri = switcher.up('.fri');
								this.updateGroupMemberCount(groupId,-1);
								Mini.Vision.slideRemove(fri,{step : 5,interval : 30,type:'remove'});
	          					//SohuBlog.App.getView();
	          				}else{
	          					if(groupStr == ''){
	          						groupStr = '未分组'
	          						this.updateGroupMemberCount(-1,1);
	          					}
	          					switcher.innerHTML = '<b>'+groupStr+'</b>';
	          					this.updateGroupMemberCount(groupId,-1);
	          				}
	          				if(this.dsaInfo){
	          					this.updateDsaGroups(friendId,idstr);
	          				}
	          				
	          				return;
	          			}else{
	          				Mini.MsgBox.alert(json.statusText);return;
	          			}
	         		}
	         	}else{
	         		this.onError(response.status);
	         	}
			}.bind(this)
		})
	},
	showModifyFriend : function(event){
		var srcEle = Event.element(event);
		if(srcEle.className != 'fedit'){
			srcEle = srcEle.up('.fedit');
		}
		
		var desc = '';
		var fin = srcEle.up('.fri').down('.fin');
		var fnk = fin.down('.fnk');
		if(fnk){
			desc = fnk.down('b').innerHTML;
		}
		
		var friendId = srcEle.getAttribute('fid').trim();
		var sub = srcEle.getAttribute('sub').trim();
		var str = '<form id="modFriForm" onsubmit="return false;"><div class="repost">	<div class="mwc3">'
						+'<div class="mwc31">好友标识：<input type="text" name="desc" value="'+desc+'" class="txt">' +
								'<input type="hidden" value="'+friendId+'" name="fid" class="txt"></div>'
						+'<label class="chkbox"><input type="checkbox" '+((sub == "0")?'checked':'')+' name="subscribe">不再接受该好友的动态</label>'
					+'</div></div></form>';
		Mini.MsgBox.confirmExt('',str,function(){
			var form = $('modFriForm');
			var desc = form.desc.value.trim();
			var fid = form.fid.value.trim();
			var subscribe = (form.subscribe.checked)?'0':'1';
			
			var pars = 'friendid='+fid+'&desc='+encodeURIComponent(desc)+'&subscribe='+subscribe;
			
			new Ajax.Request(this.updateUrl,{
				method:'post',
				parameters:pars,
				onComplete:function(response){
					if(response.status == 200){
		         		eval('var json='+response.responseText)
		         		if(json){
		          			if(json.status == 1){
								//Mini.MsgBox.alert('成功');
		          				if(fnk){
		          					fnk.innerHTML = '<b>'+json.data.desc+'</b>'
		          				}
		          				if(this.dsaInfo){
	          						this.updateDsaMyDesc(fid,json.data.desc);
	          					}
	          					srcEle.setAttribute('sub',subscribe);
		          				return;
		          			}else{
		          				Mini.MsgBox.alert(json.statusText);return;
		          			}
		         		}
		         	}else{
		         		this.onError(response.status);
		         	}
				}.bind(this)
			})
			
		}.bind(this),'修改好友信息',false);
		
	},
	showDeleteFriend : function(event){
		
		var srcEle = Event.element(event);
		if(srcEle.className != 'fdel'){
			srcEle = srcEle.up('.fdel');
		}
		var friendId = srcEle.getAttribute('fid').trim();
		
		var name = '';
		var fri = srcEle.up('.fri');
		var fin = fri.down('.fin');
		var fnm = fin.down('.fnm');
		if(fnm){
			name = fnm.down('a').innerHTML;
		}
		
		
		var str = '<div class="mwc3">你确定从好友中删除 '+name+' 吗？<br>提示：删除后将解除好友关系，你也不会再收到他的最新动态</div>';
		Mini.MsgBox.confirmExt('',str,function(){
			var pars = 'friendid='+friendId;
			new Ajax.Request(this.deleteUrl,{
				method:'post',
				parameters:pars,
				onComplete:function(response){
					if(response.status == 200){
		         		eval('var json='+response.responseText)
		         		if(json){
		          			if(json.status == 1){
		          				var gsw = $('gswi_'+friendId);
		          				var gids = gsw.getAttribute('gids').trim();
		          				if(gids == ''){
									gids = '-1';
		          				}
								this.updateAllGroupMemberCount(gids,-1);
								//fri.remove();
								Mini.Vision.slideRemove(fri,{step : 5,interval : 30,type:'remove'});
								//SohuBlog.App.getView();
								if(this.dsaInfo){
	          						this.removeFromDsa(friendId);
	          					}
		          				return;
		          			}else{
		          				Mini.MsgBox.alert(json.statusText);return;
		          			}
		         		}
		         	}else{
		         		this.onError(response.status);
		         	}
				}.bind(this)
			})
		}.bind(this),'删除好友',false);
		
	},
	setPrivacySetting:function(event){
		var radios = $('privacy_form').pm;
		var privacy = 0;
		for(var i=0;i<radios.length;i++){
			if(radios[i].checked){
				privacy = radios[i].value;break;
			}
		}
		var pars = 'pmflag='+privacy;
		new Ajax.Request(this.setPmUrl,{
				method:'post',
				parameters:pars,
				onComplete:function(response){
					if(response.status == 200){
		         		eval('var json='+response.responseText)
		         		if(json){
		          			if(json.status == 1){
		          				Mini.MsgBox.alert('设置成功')
		          				return;
		          			}else{
		          				Mini.MsgBox.alert(json.statusText);return;
		          			}
		         		}
		         	}else{
		         		this.onError(response.status);
		         	}
				}.bind(this)
			})
	},
	ignoreFriendRequest:function(event){
		var srcEle = Event.element(event);
		var friItem = srcEle.up('.fri');
		
		var id = friItem.id;
		id = id.substring('fansid_'.length);
		
		var pars = 'fansid='+id; 
		new Ajax.Request(this.ignoreUrl,{
			method:'post',
			parameters:pars,
			onComplete:function(response){
				if(response.status == 200){
	         		eval('var json='+response.responseText)
	         		if(json){
	          			if(json.status == 1){
	          				Mini.Vision.slideRemove(friItem,{step : 15,interval : 30,type:'remove'});
	          				
	          				return;
	          			}else{
	          				Mini.MsgBox.alert(json.statusText);return;
	          			}
	         		}
	         	}else{
	         		this.onError(response.status);
	         	}
			}.bind(this)
		})
	},
	approveFriendRequest:function(event){
		var srcEle = Event.element(event);
		var friItem = srcEle.up('.fri');
		
		var id = friItem.id;
		id = id.substring('fansid_'.length);
		
		var pars = 'fansid='+id; 
		new Ajax.Request(this.passUrl,{
			method:'post',
			parameters:pars,
			onComplete:function(response){
				if(response.status == 200){
	         		eval('var json='+response.responseText)
	         		if(json){
	          			if(json.status == 1){
	          				Mini.Vision.slideRemove(friItem,{step : 5,interval : 30,type:'remove'});
	          				//this.dsaInfo = null;
	          				var friInfo = json.data.friend;
	          				this.addToDsa(friInfo);
	          				
	          				return;
	          			}else{
	          				Mini.MsgBox.alert(json.statusText);return;
	          			}
	         		}
	         	}else{
	         		this.onError(response.status);
	         	}
			}.bind(this)
		})
	},
	getDsa:function(){
		if(this.dsaInfo == null){
			new Ajax.Request(this.dsaUrl,{
			method:'get',
			parameters:'',
			onComplete:function(response){
				if(response.status == 200){
	         		eval('var json='+response.responseText)
	         		if(json){
	          			if(json.status == 1){
	          				this.dsaInfo = json.data.friends;
	          				this.doSearch();
	          				return;
	          			}else{
	          				Mini.MsgBox.alert(json.statusText);return;
	          			}
	         		}
	         	}else{
	         		this.onError(response.status);
	         	}
			}.bind(this)
		})
		}
	},
	genFriendItem : function(friInfo){
		var groupNameStr = this.getGroupNameStr(friInfo.gids.split(','));
		if(groupNameStr == ''){
			groupNameStr = '未分组';
		}
		var str = '<div class="fri">\
	                    <div class="fra">\
	                     	<a href="'+friInfo.url+'"><img src="'+friInfo.icon+'"></a>\
	                    </div>\
	               <span gids="'+friInfo.gids+'" fid="'+friInfo.id+'" id="gswi_'+friInfo.id+'" class="fgp">\
	                   <b>'+groupNameStr+'</b></span>\
                        <span fid="'+friInfo.id+'" class="fedit"><a href="javascript:void(0)"><i class="i i-fedit"></i>编辑</a></span>\
                        <span fid="'+friInfo.id+'" class="fdel"><a href="javascript:void(0)"><i class="i i-fdel"></i>删除</a></span>\
                        <div class="fr0">\
                            <p class="fin"><span class="fnm"><a href="'+friInfo.url+'">'+friInfo.name+'</a></span><span class="fnk"><b>'+friInfo.mydesc+'</b></span></p>\
                            <p class="fde">'+friInfo.desc+'</p>\
                        </div>\
                    </div>';
        return str;
	},
	searchFriend:function(){
		if(!this.dsaInfo){
			this.getDsa();
		}else{
			this.doSearch();
		}
	},
	doSearch:function(){
		
		var searchKey = $('search_key').value.trim();
		if(searchKey == '搜索好友...'){
			return;
		}
		if(this.lastSearchKey == searchKey){
			return;
		}
		this.lastSearchKey = searchKey;
		var resultArr = [];
		this.searchName(searchKey,resultArr);
		var str = '';
		resultArr.each(function(o){
			str += this.genFriendItem(o);
		}.bind(this))
		if(str == ''){
			str = ' <div class="mytip">没有找到匹配的好友，你可以换一些搜索关键词</div>'
		}
		$$('.fris')[0].innerHTML = str;
		if($$('.pg').length>0)
		$$('.pg')[0].innerHTML = '';
		setTimeout(function(){this.bindFriendListEvent();this.friendListHover();}.bind(this),10);
		
	},
	searchName:function(key,resultArr){
		if(this.dsaInfo){
			for(var i=0;i<this.dsaInfo.length;i++){
				var friInfo = this.dsaInfo[i];
				if(friInfo.name.indexOf(key)!= -1 ||friInfo.pinyin.indexOf(key)!= -1 ||friInfo.shouzimu.indexOf(key)!= -1  ){
					resultArr.push(friInfo);
				}
			}
		}
	},
	removeFromDsa:function(friId){
		if(this.dsaInfo){
			for(var i=0;i<this.dsaInfo.length;i++){
				var friInfo = this.dsaInfo[i];
				if(friInfo.id.toString() == friId ){
					this.dsaInfo = this.dsaInfo.without(friInfo);
				}
			}
		}
	},
	addToDsa:function(friItem){
		if(this.dsaInfo){
			for(var i=0;i<this.dsaInfo.length;i++){
				var friInfo = this.dsaInfo[i];
				if(friInfo.id == friItem.id ){
					return;
				}
			}
		}
		this.dsaInfo.push(friItem);
	},
	updateDsaMyDesc:function(friId,desc){
		if(this.dsaInfo){
			for(var i=0;i<this.dsaInfo.length;i++){
				var friInfo = this.dsaInfo[i];
				if(friInfo.id.toString() == friId ){
					this.dsaInfo[i].mydesc = desc;
				}
			}
		}
	},
	updateDsaGroups:function(friId,groupIds){
		if(this.dsaInfo){
			for(var i=0;i<this.dsaInfo.length;i++){
				var friInfo = this.dsaInfo[i];
				if(friInfo.id.toString() == friId ){
					this.dsaInfo[i].gids = groupIds;
				}
			}
		}
	}
	
}