/**
 * @author mingguo
 * 2012-1-10 snandy 去掉console.dir语句，IE下报错
 *
 */

var t_mini = function(m_data, m_content, m_edit, w_path){
    var eles = null;
    var formInited = false;
    var baseUrl = "";
    var vn = null;
    var start = 0;
    var size = 10;
    var defaultTitlte = '好文分享！';
    
    var sizeEle = null;
    var editEle = null;
	
	var addUrl = '/a/app/mblog/save.htm?_input_encode=UTF-8';
    
    this.initialize = function(){
        this.init();
    };
    
    this.refresh = function(){
        eles.mini.cont.update('正在刷新，请稍候...');
        this.getContent("mini");
    };
    this.destroy = function(){
        m_content.innerHTML = "";
    };
    this.initParams = function(){
        size = m_data.count || size;
    };
    this.init = function(){
        this.initParams();
        this.initBody();
        this.initElements();
        this.getContent("mini");
    };

    this.initBody = function(){
        var str = '\
			<div class="miniBlogC">\
		        <ul><li class="miniUsername"></li></ul>\
			    <div class="noteBox" style="display:none;">\
			    	<form id="frmPost" name="frmPost" class="frmPost" method="post">\
					<input type="hidden" name="l" value="0"/>\
					<input type="hidden" name="file" value=""/>\
					<input type="hidden" name="s" value="icon"/>\
						<div class="noteTit">快速发表微博</div>\
			            <textarea rows="4" id="t_content" name="content" class="t_content"/></textarea>\
			        </form>\
					<div class="noteLeft" style="position: relative; display:none;">\
						<div style="position: relative;" id="picUploader">\
	               			<span class="icon i-img-s"></span><span>插图片</span>\
	               			<form target="uploadFrame" name="uploadForm" id="uploadForm" action="http://upload.pp.sohu.com/miniblog.do" enctype="multipart/form-data" method="POST">\
	               				<input type="hidden" name="d" value="blog" />\
	               				<input type="hidden" name="to" value="" />\
	               				<input type="hidden" name="img" value="" />\
	               				<input type="file" id="coPicUpload" onchange="Mini.Post.Uploader.upload()" style="overflow: hidden; position: absolute; top: 0px; left:-5px; opacity: 0;filter:alpha(opacity=0); height: 20px; width: 55px;cursor:pointer" size="1" name="file1"/>\
	               			</form>\
	               		</div>\
	               		<span id="picUploadingMsg" style="display:none"><span class="icon i-img-s"></span>正在上传中<a href="javascript:void(0)" onclick="Mini.Post.Uploader.cancel()" title="取消上传" id="cancelPic" class="icon i-cancel">取消</a></span>\
	              		<span id="picUploadedMsg" style="display:none"><span class="icon i-img-s"></span><a href="javascript:;" onmouseout="Mini.Post.Uploader.cancelPreview()" onmouseover="Mini.Post.Uploader.preview()"><font id="picUploadedName"></font></a> <a href="javascript:void(0)" onclick="Mini.Post.Uploader.cancel()" title="换一张" id="cancelPic" class="icon i-cancel">取消</a></span>\
					</div>\
					<iframe src="about:blank" id="uploadFrame" name="uploadFrame" style="display:none;border:0pt none;height:0px;width:0px;"></iframe>\
					<div id="picUploadExt" style="left: 45px; top: 181px;display:none"  class="arrowLayer">\
						<div class="arrow"></div>\
						<div class="InsertPicture" id="picUploaded">\
							<div class="PicPreview" id="picPreview"></div>\
						</div>\
					</div>\
		            <div class="noteBtn">\
		                <input type="button" value="发布" class="button"/>\
		            </div>\
			    </div>\
				<div class="feedList">\
		        	\
				</div>\
		    </div>';
        m_content.innerHTML = str;
    };
    this.initElements = function(){
        eles = {
            mini: {
                body: document.getElementsByClassName("miniBlogC", m_content, "div")[0],
				notebox: document.getElementsByClassName("noteBox", m_content, "div")[0],
				form: document.getElementsByClassName("frmPost", m_content, "form")[0],
				text: document.getElementsByClassName("t_content", m_content, "textarea")[0],
				button: document.getElementsByClassName("button", m_content, "input")[0],
                user: document.getElementsByClassName("miniUsername", m_content, "li")[0],
                cont: document.getElementsByClassName("feedList", m_content, "div")[0]
            }
        };
    };
    this.getContent = function(type){
        vn = type + Time.now();
        var url = "http://t.sohu.com/a/document/jsonlist.do?to=wg&xpt=" + _xpt + "&st=" + start + "&sz=" + size + "&vn=" + vn;
        new Groj(url, {
            variable: vn,
            charset: 'UTF-8',
            onSuccess: this.showContent.bind(this),
            onFailure: this.showError.bind(this)
        });
    };
    this.showError = function(){
        eles.mini.body.update("\u4e0d\u80fd\u53d6\u5f97\u76f8\u5173\u6570\u636e\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5");
    };
    this.showContent = function(data){
        var str = '';
        if (data.status == 1) {
            var uid = data.uid;
			//初始化头图和名称
			var userStr = '<a onMouseDown="CA.q(\'tmini_blogIco\');" href="' + this.getUlink(uid) + '" target="_blank"><img src="http://js1.pp.sohu.com.cn/ppp/blog/images/common/nobody.gif" ' + this.getPpExpress(_xpt, '#{@src}#{:=}#{$ico}#{:;}#{@alt}#{:=}#{@title}#{:=}#{$title}') + '/></a> <a onmousedown="CA.q(\'tmini_blogName\');" href="' + this.getUlink(uid) + '" target="_blank"' + this.getPpExpress(_xpt, "#{@innerHTML}#{:=}#{$title}#{:;}") + '></a>';
            eles.mini.user.update(userStr);		
			$call(function(){
                blog.user.User.fill();
            }, "blog.user");
			//初始化form
			if (!formInited && isMyBlog()) {
				Element.show(eles.mini.notebox);
				Event.observe(eles.mini.button, 'click', this.add.bind(this));
				formInited = true;
			}
			if (data.mini) {
                str += '<ul>';
                var listData = data.mini;
                for (var i = 0; i < listData.length; i++) {
                    var item = listData[i];
                    var ext = item.ext;
                    str += '\
	                <li>\
	                    <div class="in">\
	                        <div class="feedContent">\
	                            <div class="feedHead">\
	                                ' + this.getMyTitle(ext) + '\
	                            </div>\
	                            ' +
                    this.getMyBody(ext) +
                    '\
	                            <div class="feedFoot">\
	                                ' +
                    this.getMyFoot(ext) +
                    '\
	                            </div>\
	                        </div>\
	                    </div>\
	                </li>';
                }
                str += '\
					<li class="more">\
						<a href="' + this.getUlink(uid) + '" target="_blank">更多微博</a>\
            		</li>';
                str += '</ul>';
            }
            else {
                if (isMyBlog()) 
                    str += '<div class="noMiniblog">随便说两句，去骚扰一下你的朋友！ </div>';
                else 
                    str += '<div class="noMiniblog">Ta似乎太懒了，什么都没说呢！</div>';
            }
			eles.mini.cont.update(str);
        }
        else {
            if (isMyBlog()) 
                str += '<div class="noMiniblog">点<a href="http://t.sohu.com/">这里</a>立即领取你的微博，与好友分享新鲜事 </div>';
            else 
                str += '<div class="noMiniblog">TA还没有开通微博，过两天再来看看吧</div>';
            eles.mini.body.update(str);
        }
        this.loaded();
    };
    this.getPpExpress = function(passport, express){
        return (" name=\"BlogUser\" data-xpt=\"" + passport + "\" data-blogExp=\"" + express + "\" ");
    };
    this.findLink = function(str){
		return str;
    };
    this.clearText = function(str){
        return str;
    };
    this.getMyTitle = function(ext){
        var str = '';
        var title = ext.title;
        if (title == '') 
            title = defaultTitlte;
        
        str += this.parseAt(this.findLink(this.clearText(title)));
        if (ext.origin && ext.origin == 1) {
            if (ext.originuid != ext.puid) {
                var ptitle = ext.ptitle;
                if (ptitle == '') 
                    ptitle = defaultTitlte;
                str += ' //<a href="' + this.getUlink(ext.puid) + '" target="_blank">' + ext.pname + '</a>：' + this.findLink(this.clearText(ptitle));
            }
        }
        return str;
    };
    this.getMyBody = function(ext){
        var str = '';
        if (ext.origin && ext.origin == 1) {
            str += '\
                <div class="feedBody">\
                    <div class="quoteBox">';
            if (ext.originimg) {
                str += '\
						<div class="quoteTxt">\
                            <a href="' + this.getUlink(ext.originuid) + '" target="_blank">' + ext.originname + '</a> ： ' + this.findLink(this.clearText(ext.origintitle)) + ' \
                        </div>\
						<div class="quoteBod">' +
                this.getImgLink(ext.originuid, ext.originid, ext.originimg) +
                '</div>\
						<div class="quoteTool">\
                            <a href="' +
                this.getDlink(ext.originuid, ext.originid) +
                '" target="_blank"><nobr>查看原文</nobr></a>\
                        </div>';
            }
            else {
                str += '\
						<div class="quoteTxt">\
                            <a href="' + this.getUlink(ext.originuid) + '" target="_blank">' + ext.originname + '</a> ： ' + this.findLink(this.clearText(ext.origintitle)) + ' <a href="' + this.getDlink(ext.originuid, ext.originid) + '" target="_blank"><nobr>[查看原文]</nobr></a>\
                        </div>';
            }
            str += '\
                    </div>\
                </div>';
        }
        else 
            if (ext.img) {
                str += '<div class="feedBody">' + this.getImgLink(ext.uid, ext.did, ext.img) + '</div>';
            }
        return str;
    };
    this.getMyFoot = function(ext){
        return Time.friendly(ext.createdat) + ' 来自 ' + this.getFromText(ext.from) + ' - <a href="' + this.getDlink(ext.uid, ext.did) + '" target="_blank">评论</a>';
        //return Time.friendly(time);
    };
	this.getFromText = function(fromid){
		if (fromid == 1 || fromid == 2 || fromid == 4)
			return "手机";
		else if (fromid == 3)
			return "博客";
		else if (fromid == 22)
			return "搜狐博客空间";
		else
			return "网页";
	};
    this.getImgLink = function(uid, id, img){
        return '<a href="' + this.getDlink(uid, id) + '" onmousedown="CA.q(\'tmini_image_link\');" target="_blank"><img src="' + img + '"/></a>';
    };
    this.getUlink = function(uid){
        return "http://t.sohu.com/u/" + uid;
    };
    this.getDlink = function(uid, did){
        return "http://t.sohu.com/m/" + did;
    };
	this.add = function(){
		if (eles.mini.text.value.trim() == ''){
			alert('请填写内容');
			return;
		}
		var pars = 'type=' + eles.mini.form.l.value + '&content=' + encodeURIComponent(eles.mini.text.value.trim()) + '&url=' + eles.mini.form.file.value; //&s=' + (eles.mini.form.s?eles.mini.form.s.value:'');
		eles.mini.button.disabled = true;
		
		/*2011-11-30修改微薄发布接口为jsonp格式*/
		var that = this;
		jQuery.ajax({
			url:'http://i.sohu.com/a/app/mblog/save.htm?_input_encode=UTF-8',
			type:'GET',
			dataType:'jsonp',
			jsonp:'cb',
			data:pars,
			success:function(json){
				if(!json.code){
					eles.mini.text.value = '';
					setTimeout(function(){
						that.getContent("mini");
					},100);
					
					eles.mini.button.disabled = false;
					
				}else{
					alert("微薄发布失败，请重试！");
				}
			}
    
		});
		
		
	};
	this.parseAt = function(str){
		var reg=/@([^\s]+)\s/g;
		str = str.replace(reg,'<a target="_blank" href="http://t.sohu.com/n/$1">@$1</a> ');
		return str;
	}
	
};
var Mini = {};
	Mini.Post = {};
	Mini.Post.Uploader = {		
		init:function(){
			this.fA = document.forms['uploadForm'];
			this.fB = document.forms['frmPost'];
			this.eC = $('picUploader');
			this.eD = $('picUploadExt');
			this.eE = $('coPicUpload');
			this.eF = $('picUploadingMsg');
			this.eG = $('picUploadedName');
			this.eH = $('picUploaded');
			this.eI = $('picPreview');
			this.eJ = $('picUploadedMsg');
			this._init = true;
			Position.clone(this.eC,this.eD,{
			  setLeft:    true,
			  setTop:     true,
			  setWidth:   false,
			  setHeight:  false,
			  offsetTop:  20,
			  offsetLeft: -10
			});
			var domain=window.location.host;
			if(domain.indexOf('.sohu.com') != -1){
				this.fA.d.value=domain.substring(0,domain.indexOf('.sohu.com'));
			}
			$('uploadFrame').src='';
		},
		
		upload:function(){
			if(!this._init)this.init();
			this.eI.innerHTML='';
			this.fA.submit();
			this.eC.hide();
			this.eJ.hide();
			
			this.eF.show();
			//this.eH.hide()
			//this.eD.show();
			
		},
		cbUploadImg:function(cbObj){
			if(!this._init)return;
			if(cbObj&&cbObj.img){
				this.fB.file.value=cbObj.img;
				var s1 = cbObj.img.split(/[\[\]]/);
				var tburl = '';
				if(s1&&s1.length ==3){
					tburl = s1[0];
					var ids = s1[1].split(/[,]/);
					if(ids.length>=2){
						tburl += 1; 
					}else{
						tburl += 0;
					}
					tburl += s1[2];
				}else{
					var tburl = cbObj.img;
				}
				
				var filename = tburl.substring(tburl.lastIndexOf("/")+1);
				if(filename.length>15){
					filename = filename.substring(0,8)+'...'+filename.substring(filename.length-3);
				}
				this.eG.innerHTML=filename;
				this.eF.hide();
				this.eC.hide();
				this.eJ.show();
					
				var img = new Element('img',{'src':tburl});
				this.eI.hide();
				this.eI.innerHTML = '';
				this.eI.insert(img);
				img.observe('load',function(){
					this.eI.show();
					//this.eH.show();
				}.bind(this));
				
				if(this.fB.content &&this.fB.content.value.trim() == ""){
					this.fB.content.value = "分享图片";
				}
				
			}else{
				if(cbObj&&cbObj.msg){
					var msg = cbObj.msg;
				}
					
				alert("上传失败，请检查图片格式或图片大小超过5M");
				this.reset();
			}
			
		},
		preview:function(){
			this.eD.show();
		},
		cancelPreview:function(){
			this.eD.hide();
		},
		cancel:function(){
			this.reset();
		},
		reset:function(){
			if(!this._init)this.init();
			this.eC.show();
			this.eF.hide();
			this.eJ.hide();
			this.eE.value="";
			this.fB.file.value="";
			
			this.fA.reset();
			
			var domain=window.location.host;
			if(domain.indexOf('.sohu.com') != -1){
				this.fA.d.value=domain.substring(0,domain.indexOf('.sohu.com'));
			}
			$('uploadFrame').src='';
		}
		
	}
registerWidget("t_mini");