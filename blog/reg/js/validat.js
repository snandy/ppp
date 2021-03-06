// cookie 值
function setCookie(name,value,expires,path,domain,secure) {
    document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
}

function getCookieByName(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return "";
}
function deleteCookie(name,path,domain) {
  if (getCookieByName(name)) {
    document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

var selEmailInput = "user";
var validObj = {
user:{msg:'请填写你的常用邮箱（推荐搜狐邮箱）作为用户名。',errMsg:'邮箱格式有问题，请修改',isExis:false,regStr:/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,isLegal:false},
regEmail:{msg:'4-16位，字母开头，只含字母、数字、下划线',errMsg:'邮箱用户名有问题，请修改',isExis:true,regStr:/[a-zA-z]{1}[a-zA-z0-9_]{3,15}/,isLegal:false},
passwd:{msg:'密码应为6-18位，可包含字母、数字、特殊符号',errMsg:'密码长度不正确，请修改',isExis:false,isLegal:false},
passwdAgain:{msg:'再次输入密码',errMsg:'密码不匹配',isExis:false,isLegal:false},
blogName:{msg:'1-32位，可包含英文、中文、特殊字符，设定后可修改。',errMsg:'昵称长度不正确，请修改',isExis:false,isLegal:false},
vcode:{msg:'请正确输入图片中的字母或数字',errMsg:'验证码错误，请重新输入',isExis:false,isLegal:false},
agree:{msg:'',errMsg:'',isExis:false,isLegal:true},
domain:{msg:'个性域名应为4-16位，包含英文(小写)，数字，设定后不能修改。',errMsg:'个性域名不正确，请修改',isExis:false,regStr:/^[A-Za-z0-9]{4,16}$/,isLegal:false}
};
var fullEmail = "";

/* 注册页面绑定事件 */
function regpageBind(){
	$("#agree").click(function(){
        if($("#agree").attr("checked")==true){
            validObj['agree'].isLegal = true;
            $('#agreeTip').hide();
            checkLegals();
        }else{
            validObj['agree'].isLegal = false;
            $('#agreeTip').show();
            checkLegals();
        }
    });
    
    /* 背景颜色变化 */
    $('ul#reg input.sohuField').each(function(){
        $(this).bind('focus',function(){
            $(this).parent('div').parent('li').addClass('focus');
            createMsgWar($(this));
            if($.trim($(this).val()).length == 0 || $.trim($(this).val())=="" || $(this).attr("id")=="vcode"){
                if($(this).attr("id") == 'user'){
                    showMyTip($(this),"",validObj[$(this).attr("id")].msg,true);
                    var warObj = $('#user').parent('div').parent('li').find('.tip');
                }else{
                    if($(this).attr("id") == 'domain'){
                        var tmp = $("<span></span>").append("个性域名应为4-16位，包含英文（小写），数字，<span class=red>设定后不能修改</span>。");
                        showMyTip($(this),"",tmp,true);
                    }else{
                        showMyTip($(this),"",validObj[$(this).attr("id")].msg,true);        
                    }
                    validObj[$(this).attr("id")].isLegal = false;
                }
            }
            
            checkLegals();
        }).bind('blur',function(){
            $(this).parent('div').parent('li').removeClass('focus');
            checkMyState($(this));
            checkLegals();
        });
    });
    
    $('#passwd').bind('keyup',function(){
        chkPasswordStrong($(this).val());
    });
	$('.chkPic img,.chkPic a').bind('click',function(){
    	getVcodeImg();
    	//getZhVCodeImg();
       	return false;
    });
    $('#vcode').bind('click focus',function(){
    	if($('#chkPicDiv').css('display') == 'none'){
    		$('#chkPicDiv').show();
    		getVcodeImg();
    		//getZhVCodeImg();
    	}
    });
}
/* 填写博客名页面绑定事件方法 */
function blognamepageBind(){
	$("#nameBtn").attr('disabled','disabled');
    $('ul#reg input.nameInput').each(function(){
        $(this).bind('focus',function(){
            $(this).parent('div').parent('li').addClass('focus');
            createMsgWar($(this));
            if($.trim($(this).val()).length == 0 || $.trim($(this).val())==""){
							if($(this).attr("id") == 'domain'){
								var tmp = $("<span></span>").append("个性域名应为4-16位，包含英文（小写），数字，<span class=red>设定后不能修改</span>。");
								showMyTip($(this),"",tmp,true);
							}else{
								showMyTip($(this),"",validObj[$(this).attr("id")].msg,true);        
							}
            }
            checkNameLegals();
        }).bind('blur',function(){
            $(this).parent('div').parent('li').removeClass('focus');
            checkMyState($(this));
            checkNameLegals();
        });
    });
    $('.chkPic img,.chkPic a').bind('click',function(){
    	getVcodeImg();
    	//getZhVCodeImg();
       	return false;
    });
    $('#vcode').bind('click focus',function(){
    	if($('#chkPicDiv').css('display') == 'none'){
    		$('#chkPicDiv').show();
    		getVcodeImg();
    		//getZhVCodeImg();
    	}
    });
		if($('#vcode')){
			checkCode($('#vcode'));
		}
}
/* email重发页面绑定事件 */
function resendpageBind(){
	// 重新发送email
    $('#reSendEmail').bind('click',function(){
        var postUrl = "http://blog.sohu.com/sendMail/?passport="+pass;		
        $.ajax({
            type: "POST",
            url: postUrl,
            beforeSend:function(){
                
            },
            success: function(data){
                $('.actArea .tip').fadeIn('slow');
            },error:function(XMLHttpRequest,textStatus,errorThrown){
                
            }
        });
    });
}
/* 填写个让人信息页面绑定事件 */
function myinfopageBind(){
	 $('#checkLiving').bind('click',function(){
        var tmpprovince = $('#provinceId').val();
        var tmpcity = $('#cityId').val();
        var tmpcounty = $('#countyId').val();
        if($(this).attr("checked") == true){
            $('#cityId').css('visibility', 'hidden');
            $('#countyId').css('visibility', 'hidden');
            $('#provinceId').html($('#birthProvinceId').html());
            $('#cityId').html($('#birthCityId').html());
            $('#countyId').html($('#birthCountyId').html());    
            window.setTimeout(function(){
                $('#provinceId').val($('#birthProvinceId').val());
                $('#cityId').val($('#birthCityId').val());
                $('#countyId').val($('#birthCountyId').val());                             
            },400);
            
            $('#cityId').css('visibility', 'visible');
            $('#countyId').css('visibility', 'visible');
        }else if($(this).attr("checked") == false){
            $('#provinceId').val(0);
            $('#cityId').html("<option value=0>选择城市</option>");
            $('#countyId').html("<option value=0>选择区县</option>"); 
            $('#cityId').val(0);
            $('#countyId').val(0);
        }else{
        
        }
        
    });
    $('#checkLiving').attr("checked",false);
    //  出生地  市区县
    getCityData("birthProvinceId","birthCityId","birthCountyId");
    //  居住地  市区县
    getCityData("provinceId","cityId","countyId");
    // 出生日期 年月日
    getDateData("birthdayYear","birthdayMonth","birthdayDate");
}
    
    /* 生成包装元素 */
    function createMsgWar(obj){
        if(obj.length == 0){return;}
        var exisflag = validObj[obj.attr('id')].isExis;
        
        var defaultmsg = validObj[obj.attr('id')].msg;
        if(exisflag == false){// 判断是否存在该元素
            // 生成外包装 div
            warObj = $('<div class=tip></div>');
            validObj[obj.attr('id')].isExis = true;
            // 把信息对象添加到dom中，修改成对应的css
            warObj.hide();
            if((obj.attr('id') == 'vcode')||(obj.attr('id') == 'user')||(obj.attr('id') == 'passwd')){
                warObj.appendTo(obj.parent('div').parent('li'));
            }else{
                obj.parent('div').after(warObj);
            }
        }
    }
    
    /* 检查状态 （空，合法，非法） */
    function checkMyState(obj){
        if($.trim(obj.val()).length == 0 || $.trim(obj.val())==""){
            showMyTip(obj,"","",false);
            validObj[obj.attr('id')].isLegal = false;
            if(obj.attr('id')=='user'){
                hideMyEmail("user");
            }
            if(obj.attr('id') == 'passwd'){
                hidePassword();
            }
        }else{
            checkIsLegal(obj);
        }
    }
    /* 显示提示信息框事件
        obj 控件对象，根据该对象找到对应的 tip 元素，
        claName  tip元素的class
        str  显示内容
        isShow  是否显示该tip
            eg:  showMyTip($('#user'),'','改mail已经存在，换一个',true);
    */
    function showMyTip(obj,clsName,str,isShow){
        var myTip = obj.parent('div').parent('li').find('.tip');
        
        if(myTip!=null){
            createMsgWar(obj);
        }
        myTip = obj.parent('div').parent('li').find('.tip');
        myTip.attr('class','tip '+clsName);
        if(typeof(str) == "string"){
            myTip.text(str);
        }else if(typeof(str) == "object"){
            myTip.text("");
            myTip.append(str);
        }else{
            
        }
        
        if(isShow == true){
            myTip.show();
        }else{
            myTip.hide();   
        }
        if(clsName == 'error'){
            obj.attr('class','sohuField txtError');             
        }else{
            obj.attr('class','sohuField');
        }

    }
    
    /* 检查非空情况（合法与非法状态） */
    function checkIsLegal(obj){
        var tmpId = obj.attr('id');
        if(tmpId == 'user'){
            checkEmail(obj);
        }else if(tmpId == 'regEmail'){
            checkRegEmail(obj);
        }else if(tmpId == 'passwd'){
            checkPass(obj);
        }else if(tmpId == 'passwdAgain'){
            checkConfirmPass(obj);
        }else if(tmpId == 'blogName'){
            checkNickName(obj);
        }else if(tmpId == 'vcode'){
            checkCode(obj);
        }else if(tmpId == 'agree'){
            checkAgree(obj);
        }else if(tmpId == 'domain'){
            checkDominName(obj);
        }else if(tmpId == 'myDomainName'){
            checkDominName(obj);
        }else{
            
        }
    }
    
    /* 校验邮箱  ajax */
    function checkEmail(obj){
        //$('#regContr').hide();
        var regString = validObj[obj.attr('id')].regStr; 
				obj.val($.trim(obj.val()).toLowerCase());
        if(!regString.test($.trim(obj.val()).toLowerCase())){
            showMyTip(obj,'error',validObj[obj.attr('id')].errMsg,true);
            // 设置标志位
            validObj[obj.attr('id')].isLegal = false;
        }else{
            checkMailAjax(obj,false);
        }
    }
    //  url: "http://localhost:8080/miniblog/register/js/test.xml  /checkuser",
    function checkMailAjax(obj,isSohu){
        var tmpEmail;
        if(isSohu){
            tmpEmail = obj.val()+'@sohu.com';   
        }else{
            tmpEmail = obj.val();   
        }
				fullEmail = tmpEmail;
        $.ajax({
            type: "GET",
            url: "/checkuser",
            data: 'cn='+ tmpEmail,
            dataType: 'xml',
            async:false,
            beforeSend:function(){
                //putDefaultString(obj,'查询中，请稍后……');
                showMyTip(obj,'','查询中，请稍后……',true);
                //设定isLegal
                validObj[obj.attr("id")].isLegal = false;
            },
            success: function(data){
                // status为0用户名未被注册过，1参数错误，2验证码错误，3非法用户名，4用户名已经存在，6查找失败
                // 就3 和4给出提示  其他的都过吧 丢给服务端吧
                returnFlag = $(data).find("status").text();
                if(returnFlag == 3){
                    showMyTip(obj,'error','邮箱格式有问题，请修改',true);
                    hideMyEmail("user");
                    validObj[obj.attr("id")].isLegal = false;
                }else if(returnFlag == 4){
                    showMyTip(obj,'','该邮件已经注册过，使用该邮件登录，或者更换一个新的邮件',true);
                    showMyEmail("user");
                    //设定isLegal
                    validObj[obj.attr("id")].isLegal = false;
                }else if(returnFlag == 0){
                    showMyTip(obj,'ok','',true);
                    hideMyEmail("user");
                    //设定isLegal
                    validObj[obj.attr("id")].isLegal = true;
                    setCookie('regInfosave',tmpEmail);
                    
                }else{
                    showMyTip(obj,'',validObj[obj.attr("id")].msg,true);
                    hideMyEmail("user");
                    //设定isLegal
                    validObj[obj.attr("id")].isLegal = true;
                }
            },error:function(XMLHttpRequest,textStatus,errorThrown){
                //putDefaultString(obj,'服务器忙，请稍后重试。');
                showMyTip(obj,'error','服务器忙，请稍后重试。',true);
                //设定值
                validObj[obj.attr("id")].isLegal = false;
            }
        });
    }
    /* 校验注册邮箱用户名 */
    function checkRegEmail(obj){
        var regString = validObj[obj.attr('id')].regStr;
		obj.val($.trim(obj.val()).toLowerCase());
        if(!regString.test($.trim(obj.val()))){
            showMyTip(obj,'error',validObj[obj.attr('id')].errMsg,true);
            
            validObj[obj.attr('id')].isLegal = false;
        }else{
            checkMailAjax(obj,true);
        }
    }
    /* 校验密码 */
    function checkPass(obj){
        if($.trim(obj.val()).length<6||$.trim(obj.val()).length>18){
            showMyTip(obj,'error',validObj[obj.attr("id")].errMsg,true);
            validObj[obj.attr("id")].isLegal = false;
        }else{
					//添加几个简单密码的判断
					var re=/^(.)\1{5,8}$/;
					if(re.test(obj.val())){
						showMyTip(obj,'error','密码不能是相同的数字或字母，请修改。',true);
            validObj[obj.attr("id")].isLegal = false;
					}else{
						var weakArr=["123456","12345678","qwerty","qwaszx","qazwsx","password","abc123"];
						if($.inArray(obj.val(),weakArr)!=-1){
							showMyTip(obj,'error','密码过于简单，请重新输入。',true);
							validObj[obj.attr("id")].isLegal = false;	
						}else{
							showMyTip(obj,'ok','',true);
							validObj[obj.attr("id")].isLegal = true;
						}
					}
					//var tmpUsername = $().val().substring(0,obj.val().indexOf("@"));
					if(fullEmail == obj.val()){
						showMyTip(obj,'error','密码不能与账户相同。',true);
            validObj[obj.attr("id")].isLegal = false;
					}
					// 是否与确认密码相同
					if($('#passwdAgain').val() == $('#passwd').val()){
						showMyTip($('#passwdAgain'),'ok','',true);
						validObj["passwdAgain"].isLegal = true;
					}
        }
    }
    /* 校验确认密码 */
    function checkConfirmPass(obj){
        if((obj.val()!= $('#passwd').val())||($.trim(obj.val()).length == 0)){
            showMyTip(obj,'error',validObj[obj.attr("id")].errMsg,true);
            validObj[obj.attr("id")].isLegal = false;
        }else{
            showMyTip(obj,'ok','',true);
            validObj[obj.attr("id")].isLegal = true;
        }
    }
    /* 校验昵称 */
    function checkNickName(obj){
		var tmpStr = $.trim(obj.val());
        if($.trim(obj.val()).length<1||$.trim(obj.val()).length>32){
            showMyTip(obj,'error',validObj[obj.attr("id")].errMsg,true);
            validObj[obj.attr("id")].isLegal = false;
        }else{
            showMyTip(obj,'ok','',true);
            validObj[obj.attr("id")].isLegal = true;
						setCookie('nicknamesave',tmpStr);
        }
    }
    
    //setCookie('msg','{"errors.vcode":[]}');
    /* 校验验证码 */
    function checkCode(obj){
        if((getCookieByName('msg')!="none")&&(getCookieByName('msg')!="")){
            showMyTip(obj,'error',validObj['vcode'].errMsg,true);
            setCookie('msg','none',"","/",".blog.sohu.com");
        }else{
            showMyTip(obj,'','',false); 
        }
    }
		/* 校验密码cookie */
    function checkpassCode(obj){
        if((getCookieByName('password')!="none")&&(getCookieByName('password')!="")){
            showMyTip(obj,'error',"密码过于简单，请修改。",true);
           	setCookie('password','none',"","/",".blog.sohu.com");
        }else{
            showMyTip(obj,'','',false); 
        }
    }
    
    /* 判断dominName */
    function checkDominName(obj){
        var regString = validObj["domain"].regStr;      
        if(!regString.test($.trim(obj.val()).toLowerCase())){
            showMyTip(obj,'error',validObj["domain"].errMsg,true);
            validObj[obj.attr("id")].isLegal = false;
        }else{          
            // http://blog.sohu.com/checkdomain?d=shmily
            checkDominNameAjax(obj);    
        }
        obj.val($.trim(obj.val()).toLowerCase());
    }
    
    /* ajax校验个性域名 */
    function checkDominNameAjax(obj){
		var tmpStr = $.trim(obj.val()).toLowerCase();
        $.ajax({
            type: "GET",
            url: "/checkdomain?",
            async: false,
            data: 'd='+ $.trim(obj.val()).toLowerCase(),
            beforeSend:function(){
                showMyTip(obj,'','查询中，请稍后……',true);
                validObj["domain"].isLegal = false;
            },
            success: function(data){
                // data 5 时候已经存在   0  可以提交
                if(data == 5){                  
                    var tmp = $("<span></span>").append("该域名已经注册，可以在此域名后面加上数字试试（总长度4-16位）。例如：<span class=red>"+obj.val()+"1234</span>");
                    showMyTip(obj,'',tmp,true);
                    validObj["domain"].isLegal = false;
                }else if(data == 0){
                    showMyTip(obj,'ok','',true);
                    validObj["domain"].isLegal = true;
					setCookie('domainnamesave',tmpStr);
                }else{
                    showMyTip(obj,'error','域名有问题，请更换一个',true);
                    validObj["domain"].isLegal = false;
                }
            },error:function(XMLHttpRequest,textStatus,errorThrown){
                showMyTip(obj,'error','连接超时，请稍后再试。',true);
                validObj["domain"].isLegal = false;
            }
        });
    }
    /* 刷新验证码 */
    function refrashCode(){
        $('codeImg').src = "/rand?vcode="+vcode;
    }
    
    /* 显示用该邮箱登录区域 */
    function showMyEmail(str){
        if($('.correctMail').length == 0){
            var tmpObj = $('<div class=correctMail>');
            $('<span class=emailTip><span class="icon email"></span>该邮箱已注册，你可以：</span>').appendTo(tmpObj);
            var inputObj = $('<input>').attr({'class':'emailBtn',type:'button',value:'立即以此邮箱登录'}).bind('click',function(){
                var turnUrl ="http://blog.sohu.com/login/logon.do?email="+$('#'+str).val();
                window.open(turnUrl);
            });
            inputObj.appendTo(tmpObj);
            $('<span>或<a href=javascript:void(0); onclick=changeEmail();>换一个邮箱</a></span>').appendTo(tmpObj);
            tmpObj.appendTo($('#'+str).parent('div').parent('li'));
        }else{
            $('.correctMail').show();
        }   
    }

    /* 检验所有输入信息是否合法，如合法把按钮设成可以提交状态，如有不合法的，保持禁提交状态*/
    function checkLegals(){
        if(selEmailInput == 'user'){
            if((validObj['user'].isLegal == true)&&(validObj['passwd'].isLegal == true)&&(validObj['passwdAgain'].isLegal == true)&&(validObj['blogName'].isLegal == true)&&(validObj['domain'].isLegal == true)&&(validObj['agree'].isLegal == true)){
                $(":submit").removeAttr("disabled");
            }else{
                $(":submit").attr('disabled',true);
            }
        }else{
            //console.log("regEmail:"+validObj['regEmail'].isLegal+" passwd:"+validObj['passwd'].isLegal+" passwdAgain:"+validObj['passwdAgain'].isLegal+" blogName:"+validObj['blogName'].isLegal+" domain:"+validObj['domain'].isLegal+" agree:"+validObj['agree'].isLegal);
            if((validObj['regEmail'].isLegal == true)&&(validObj['passwd'].isLegal == true)&&(validObj['passwdAgain'].isLegal == true)&&(validObj['blogName'].isLegal == true)&&(validObj['domain'].isLegal == true)&&(validObj['agree'].isLegal == true)){
                $(":submit").removeAttr("disabled");
            }else{
                $(":submit").attr('disabled',true);
            }   
        }
        
    }
    
    
    
    
    /* 判断博客名称是否合法 */
    function checkNameLegals(){
        if((validObj['blogName'].isLegal == true)&&(validObj['domain'].isLegal == true)){
            $("#nameBtn").attr('disabled','');
        }else{
            $("#nameBtn").attr('disabled','disabled');
        }
    }
    // 进入页面执行的方法
    function initPageSet(){ 
        $('#user').focus();
        $('#user').removeAttr('disabled');  
        // 进入页面状态判断  根据cookie设置vcode 和user
        if($('#vcode')){
            checkCode($('#vcode'));
        }
				if($('#passwd')){
					checkpassCode($('#passwd'));
				}
				if(getCookieByName('regInfosave')!=""){
					$('#user').val(getCookieByName('regInfosave'));
					checkEmail($('#user'));
					checkLegals();
				}
				if(getCookieByName('nicknamesave')!=""){
					$('#blogName').val(getCookieByName('nicknamesave'));
					checkNickName($('#blogName'));
					checkLegals();
				}
				if(getCookieByName('domainnamesave')!=""){
					$('#domain').val(getCookieByName('domainnamesave'));
					checkDominName($('#domain'));
					checkLegals();
				}
				
    }

	function getVcodeImg(){
        var cur_time = (new Date()).getTime();
        var getUrl = "/service/vcode.jsp?nocache="+cur_time;
        $.ajax({
            type: "GET",
            url: getUrl,
            async:false,
            beforeSend:function(){
                
            },
            success: function(data){
                $('.chkPic img').attr('src','/rand?vcode='+data);
                $('.chkPic img').show();
                $('#vcodeHidden').val(data);
            },error:function(XMLHttpRequest,textStatus,errorThrown){
                
            }
        });
        
    };
    if(!VCode)var VCode = {};
    function onloadZhVcodeStr(){
    	if(typeof(vcodestr)!=undefined){
            VCode.zhVcodeStr = vcodestr;    
           	showZhVCodeImg();
        } 
    };
    function showZhVCodeImg(){
    	$('.chkPic img').attr('src','http://vcode.blog.sohu.com/vcode/vcode_cn.php?vcode='+VCode.zhVcodeStr+'&ctp=1&aflag=1&refresh='+ (new Date()).getTime());
       	$('#vcodeHidden').val(VCode.zhVcodeStr);
       	$('.chkPic img').show();
    };
    function getZhVCodeImg(){
    	if(!VCode.zhVcodeStr){
	    	var url = "http://vcode.blog.sohu.com/vcode/getvcode_js.php";
	        var c=document.createElement("script");
	        c.type = "text/javascript";
	        c.src = url;
	        document.getElementsByTagName("head")[0].appendChild(c);
	        if($.browser.msie){
	            c.onreadystatechange = function(){
	                var state = c.readyState;    
	                if(state == "loaded" || state == "interactive" || state == "complete"){    
	                    onloadZhVcodeStr();
	                }else{
	                    c.src = url;
	                }
	            } 
	        }else{          
	            c.onload = function(){
	                onloadZhVcodeStr();
	            }
	        }
    	}else{
    		showZhVCodeImg();
    	}
    };

    function hideMyEmail(str){
        if($('.correctMail')){
            $('.correctMail').hide();   
        }
    }   
    /* 换一个邮箱 */
    function changeEmail(){
        $('.correctMail').hide();
        $('#user').val("");
        $('#regEmail').val("");
    }
    /* 显示注册邮箱区域 */
    function regEmail(obj){
        $('#inputEmailWar').hide();
        $('#regEmailWar').show();
        $('#usedEmailTip').hide();
        $('#regEmailTip').show();
        hideMyEmail("user");
        $('#user').attr('disabled',true);
        $('#regEmail').removeAttr("disabled");
        selEmailInput = 'regEmail';
        $('#regEmail').focus();
    }
    /* 显示用邮箱登录区域 */
    function usedEmail(){
        $('#regEmailWar').hide();
        $('#inputEmailWar').show();
        $('#usedEmailTip').show();
        $('#regEmailTip').hide();
        hideMyEmail("user");
        $('#user').removeAttr("disabled");
        $('#regEmail').attr('disabled',true);
        selEmailInput = 'user';
        $('#user').focus();
    }
    
function validForm(){
    if($('#regBtn')){
        $('#regBtn').attr('disabled','disabled');       
    }
    if($('#nameBtn')){
        $('#nameBtn').attr('disabled','disabled');              
    }
}
/**
 * 显示密码强弱
 * @return
 */
function chkPasswordStrong(me) {
    //恢复重复输入密码状态
    var csint = checkStrong(me);
    $('.psArea').show();
    if(csint == 1){
        $('.psArea .passStrength').attr('class','passStrength lineWeak');
        $('.psArea .strengthTip').attr('class','strengthTip tipWeak');
    }else if(csint == 2){
        $('.psArea .passStrength').attr('class','passStrength lineMedium');
        $('.psArea .strengthTip').attr('class','strengthTip tipMedium');
    }else if(csint == 3){
        $('.psArea .passStrength').attr('class','passStrength lineStrong');
        $('.psArea .strengthTip').attr('class','strengthTip tipStrong');
    }else{
        $('.psArea .passStrength').addClass('');
        $('.psArea .strengthTip').addClass('');
    }
}

//返回密码的强度级别
function checkStrong(passwd){
    var p1= (passwd.search(/[a-zA-Z]/)!=-1) ? 1 : 0; 
    var p2= (passwd.search(/[0-9]/)!=-1) ? 1 : 0; 
    var p3= (passwd.search(/[_-]/)!=-1) ? 1 : 0; 
    var sum = p1+p2+p3; 
    if(sum==0||sum==1)return 1; 
    else return sum; 
}

/* 隐藏密码强度区域 */
function hidePassword(){
    $('.psArea').hide();
    $('.psArea .passStrength').attr('class','passStrength lineNor');
    $('.psArea .strengthTip').attr('class','strengthTip tipNor');
}

// 上传图片相关方法
function preProfileImgFun(str,str1){
    $('#preProfileImg').src = str1;
}
function showTipInfo(str){
    $('#uploadPic').show();
    $('#uploadPic').html(str);
}
function ProfileImgFun(str,str1){
    
    $('#userlogoTip').hide();
    $('#preProfileImg').attr('src',str);
    $('#preProfileImg').show();
    $('#imageHidden').val(str);
    $('#iconHidden').val(str1);
}
function hideTipInfo(){
    $('#uploadPic').hide(); 
}
// 城市数据，最后规整到其他文件
var Area={data:{province:{"1":"北京市","2":"天津市","3":"河北省","4":"山西省","5":"辽宁省","6":"吉林省","7":"上海市","8":"江苏省","9":"浙江省","10":"安徽省","11":"福建省","12":"江西省","13":"山东省","14":"河南省","15":"内蒙古自治区","16":"黑龙江省","17":"湖北省","18":"湖南省","19":"广东省","20":"广西壮族自治区","21":"海南省","22":"四川省","23":"重庆市","24":"台湾省","25":"贵州省","26":"云南省","27":"西藏自治区","28":"陕西省","29":"甘肃省","30":"青海省","31":"宁夏回族自治区","32":"新疆维吾尔族自治区","33":"香港特别行政区","34":"澳门特别行政区","35":"海外"},city:{"1":{"1":"东城区","2":"西城区","3":"崇文区","4":"宣武区","5":"朝阳区","6":"丰台区","7":"石景山区","8":"海淀区","9":"门头沟区","10":"房山区","11":"通州区","12":"顺义区","13":"延庆县","14":"昌平区","15":"怀柔区","16":"密云县","17":"平谷区","18":"大兴区","19":"其它地区"},"2":{"20":"和平区","21":"河东区","22":"河西区","23":"南开区","24":"河北区","25":"红桥区","26":"塘沽区","27":"大港区","28":"东丽区","29":"西青区","30":"津南区","31":"北辰区","32":"蓟县","33":"宝坻区","34":"武清区","35":"宁河县","36":"静海县","541":"汉沽区","37":"其它地区"},"3":{"38":"石家庄市","39":"张家口市","40":"承德市","41":"秦皇岛市","42":"唐山市","43":"廊坊市","44":"保定市","45":"沧州市","46":"衡水市","47":"邢台市","48":"邯郸市","49":"其它地区"},"4":{"50":"太原市","51":"大同市","52":"朔州市","53":"阳泉市","54":"长治市","55":"晋城市","56":"忻州市","57":"吕梁市","58":"晋中市","59":"临汾市","60":"运城市","61":"其它地区"},"5":{"75":"沈阳市","76":"朝阳市","77":"阜新市","78":"铁岭市","79":"抚顺市","80":"本溪市","81":"辽阳市","82":"鞍山市","83":"丹东市","84":"大连市","85":"营口市","86":"盘锦市","87":"锦州市","88":"葫芦岛市","89":"其它地区"},"6":{"90":"长春市","91":"白城市","92":"松原市","93":"吉林市","94":"四平市","95":"辽源市","96":"通化市","97":"白山市","98":"延边朝鲜族自治州","99":"其它地区"},"7":{"114":"黄浦区","116":"卢湾区","117":"徐汇区","118":"长宁区","119":"静安区","120":"普陀区","121":"闸北区","122":"虹口区","123":"杨浦区","124":"闵行区","125":"宝山区","126":"嘉定区","127":"浦东新区","128":"金山区","129":"松江区","130":"崇明县","131":"青浦区","132":"南汇区","133":"奉贤区","134":"其它地区"},"8":{"135":"南京市","136":"徐州市","137":"连云港市","138":"宿迁市","139":"淮安市","140":"盐城市","141":"扬州市","142":"泰州市","143":"南通市","144":"镇江市","145":"常州市","146":"无锡市","147":"苏州市","148":"其它地区","537":"淮安市"},"9":{"149":"杭州市","150":"湖州市","151":"嘉兴市","152":"舟山市","153":"宁波市","154":"绍兴市","155":"金华市","156":"台州市","157":"温州市","158":"丽水市","159":"其它地区","538":"衢州市"},"10":{"160":"合肥市","161":"宿州市","162":"淮北市","163":"阜阳市","164":"蚌埠市","165":"淮南市","166":"滁州市","167":"马鞍山市","168":"芜湖市","169":"铜陵市","170":"安庆市","171":"黄山市","172":"六安市","173":"巢湖市","174":"池州市","175":"宣城市","540":"亳州市","176":"其它地区"},"11":{"177":"福州市","178":"南平市","179":"三明市","180":"莆田市","181":"泉州市","182":"厦门市","183":"漳州市","184":"龙岩市","185":"宁德市","186":"其它地区"},"12":{"187":"南昌市","188":"九江市","189":"景德镇市","190":"鹰潭市","191":"新余市","192":"萍乡市","193":"赣州市","194":"上饶市","195":"抚州市","196":"宜春市","197":"吉安市","198":"其它地区"},"13":{"199":"济南市","200":"聊城市","201":"德州市","202":"东营市","203":"淄博市","204":"潍坊市","205":"烟台市","206":"威海市","207":"青岛市","208":"日照市","209":"临沂市","210":"枣庄市","211":"济宁市","212":"泰安市","213":"莱芜市","214":"滨州市","215":"菏泽市","216":"其它地区"},"14":{"217":"郑州市","218":"三门峡市","219":"洛阳市","220":"焦作市","221":"新乡市","222":"鹤壁市","223":"安阳市","224":"濮阳市","225":"开封市","226":"商丘市","227":"许昌市","228":"漯河市","229":"平顶山市","230":"南阳市","231":"信阳市","232":"济源市","233":"周口市","234":"驻马店市","235":"其它地区"},"15":{"62":"呼和浩特市","63":"包头市","64":"乌海市","65":"赤峰市","66":"呼伦贝尔","67":"兴安盟","69":"锡林郭勒盟","70":"乌兰察布市","72":"巴彦淖尔市","73":"阿拉善盟","555":"鄂尔多斯市","556":"通辽市","74":"其它地区"},"16":{"100":"哈尔滨市","101":"齐齐哈尔市","102":"黑河市","103":"大庆市","104":"伊春市","105":"鹤岗市","106":"佳木斯市","107":"双鸭山市","108":"七台河市","109":"鸡西市","110":"牡丹江市","111":"绥化地区","112":"大兴安岭地区","113":"其它地区"},"17":{"236":"武汉市","237":"十堰市","238":"襄樊市","239":"荆门市","240":"孝感市","241":"黄冈市","242":"鄂州市","243":"黄石市","244":"咸宁市","245":"荆州市","246":"宜昌市","247":"随州市","248":"仙桃市","249":"天门市","250":"潜江市","251":"神农架林区","252":"恩施土家族苗族自治州","253":"其它地区"},"18":{"254":"长沙市","255":"张家界市","256":"常德市","257":"益阳市","258":"岳阳市","259":"株洲市","260":"湘潭市","261":"衡阳市","262":"郴州市","263":"永州市","264":"邵阳市","265":"怀化市","266":"娄底市","267":"湘西土家族苗族自治州","268":"其它地区"},"19":{"269":"广州市","270":"清远市","271":"韶关市","272":"河源市","273":"梅州市","274":"潮州市","275":"汕头市","276":"揭阳市","277":"汕尾市","278":"惠州市","279":"东莞市","280":"深圳市","281":"珠海市","282":"中山市","283":"江门市","284":"佛山市","285":"肇庆市","286":"云浮市","287":"阳江市","288":"茂名市","289":"湛江市","290":"其它地区"},"20":{"291":"南宁市","292":"桂林市","293":"柳州市","294":"梧州市","295":"贵港市","296":"玉林市","297":"钦州市","298":"北海市","299":"防城港市","301":"百色市","302":"河池市","304":"贺州市","542":"崇左市","543":"凭祥市","544":"来宾市","305":"其它地区"},"21":{"306":"海口市","307":"三亚市","308":"琼山市","309":"文昌市","310":"琼海市","311":"万宁市","313":"东方市","314":"儋州市","315":"临高县","316":"澄迈县","317":"定安县","318":"屯昌县","319":"昌江黎族自治县","320":"白沙黎族自治县","321":"琼中黎族苗族自治县","322":"陵水黎族自治县","323":"保亭黎族苗族自治县","324":"乐东黎族自治县","539":"五指山市","326":"其它地区"},"22":{"359":"成都市","360":"广元市","361":"绵阳市","362":"德阳市","363":"南充市","364":"广安市","365":"遂宁市","366":"内江市","367":"乐山市","368":"自贡市","369":"泸州市","370":"宜宾市","371":"攀枝花市","372":"巴中市","373":"达州市","374":"资阳市","375":"眉山市","376":"雅安市","377":"阿坝藏族羌族自治州","378":"甘孜藏族自治州","379":"凉山彝族自治州","380":"其它地区"},"23":{"327":"渝中区","328":"大渡口区","329":"江北区","330":"沙坪坝区","331":"九龙坡区","332":"南岸区","333":"北碚区","334":"万盛区","335":"双桥区","336":"渝北区","337":"巴南区","338":"万州区","339":"涪陵区","340":"合川市","341":"永川市","342":"江津市","343":"南川市","344":"长寿区","345":"綦江县","346":"潼南县","347":"铜梁县","348":"大足县","349":"荣昌县","350":"璧山县","351":"垫江县","352":"武隆县","353":"丰都县","354":"城口县","355":"梁平县","357":"黔江区","358":"其它地区","545":"奉节县","546":"开县","547":"云阳县","548":"忠县","549":"巫溪县","550":"巫山县","551":"石柱土家族自治县","552":"秀山土家族苗族自治县","553":"酉阳土家族苗族自治县","554":"彭水苗族土家族自治县"},"24":{"479":"台北市","480":"高雄市","481":"台南市","482":"台中市","484":"其它地区","579":"基隆市","580":"新竹市","581":"嘉义市","582":"台北县","583":"宜兰县","584":"新竹县","585":"桃园县","586":"苗栗县","587":"台中县","588":"彰化县","589":"南投县","590":"嘉义县","591":"云林县","592":"台南县","593":"高雄县","594":"屏东县","595":"台东县","596":"花莲县","597":"澎湖县","602":"钓鱼岛"},"25":{"381":"贵阳市","382":"六盘水市","383":"遵义市","384":"毕节地区","385":"铜仁地区","386":"安顺市","387":"黔东南苗族侗族自治州","388":"黔南布依族苗族自治州","389":"黔西南布依族苗族自治州","390":"其它地区"},"26":{"391":"昆明市","392":"曲靖市","393":"玉溪市","394":"丽江市","395":"昭通市","396":"普洱市","397":"临沧市","398":"保山市","399":"德宏傣族景颇族自治州","400":"怒江傈傈族自治州","401":"迪庆藏族自治州","402":"大理白族自治州","403":"楚雄彝族自治州","404":"红河哈尼族彝族自治州","405":"文山壮族苗族自治州","406":"西双版纳傣族自治州","407":"其它地区"},"27":{"408":"拉萨市","409":"那曲地区","410":"昌都地区","411":"林芝地区","412":"山南地区","413":"日喀则地区","414":"阿里地区","415":"其它地区"},"28":{"416":"西安市","417":"延安市","418":"铜川市","419":"渭南市","420":"咸阳市","421":"宝鸡市","422":"汉中市","423":"榆林市","424":"商洛市","425":"安康市","426":"其它地区"},"29":{"427":"兰州市","428":"嘉峪关市","429":"金昌市","430":"白银市","431":"天水市","432":"酒泉市","433":"张掖市","434":"武威市","435":"庆阳市","436":"平凉市","437":"定西市","438":"陇南地区","439":"临夏回族自治州","440":"甘南藏族自治州","441":"其它地区","557":"玉门市","558":"敦煌市"},"30":{"442":"西宁市","443":"海东地区","444":"海北藏族自治州","445":"海南藏族自治州","446":"黄南藏族自治州","447":"果洛藏族自治州","448":"玉树藏族自治州","449":"海西蒙古族藏族自治州","450":"其它地区"},"31":{"451":"银川市","452":"石嘴山市","453":"吴忠市","454":"固原市","599":"中卫市","455":"其它地区"},"32":{"456":"乌鲁木齐市","457":"克拉玛依市","458":"石河子市","459":"喀什地区","460":"阿克苏地区","461":"和田地区","462":"吐鲁番地区","463":"哈密地区","464":"克孜勒苏柯尔克孜自治州","465":"博尔塔拉蒙古自治州","466":"昌吉回族自治州","467":"巴音郭楞蒙古自治州","468":"伊犁哈萨克自治州","469":"阿拉尔市","470":"塔城地区","471":"阿勒泰地区","600":"图木舒克市","601":"五家渠市","472":"其它地区"},"33":{"474":"九龙城区","476":"其它地区","559":"中西区","560":"东区","561":"观塘区","562":"南区","563":"深水埗区","564":"黄大仙区","565":"湾仔区","566":"油尖旺区","567":"离岛区","568":"葵青区","569":"北区","570":"西贡区","571":"沙田区","572":"屯门区","573":"大埔区","574":"荃湾区","575":"元朗区"},"34":{"576":"澳门半岛","577":"凼仔岛","578":"路环岛","478":"其它地区"},"35":{"603":"海外"}},loc: {CN1100:'1',CN1101:'1',CN1102:'1',CN1200:'2',CN1201:'2',CN1202:'2',CN1300:'3',CN1301:'3_38',CN1302:'3_42',CN1303:'3_41',CN1304:'3_48',CN1305:'3_47',CN1306:'3_44',CN1307:'3_39',CN1308:'3_40',CN1309:'3_45',CN1310:'3_43',CN1311:'3_46',CN1400:'4',CN1401:'4_50',CN1402:'4_51',CN1403:'4_53',CN1404:'4_54',CN1405:'4_55',CN1406:'4_52',CN1407:'4_58',CN1408:'4_60',CN1409:'4_56',CN1410:'4_59',CN1411:'4_57',CN1500:'15',CN1501:'15_62',CN1502:'15_63',CN1503:'15_64',CN1504:'15_65',CN1505:'15_556',CN1506:'15_555',CN1507:'15_66',CN1508:'15_72',CN1509:'15_70',CN1522:'15_67',CN1525:'15_69',CN1529:'15_73',CN2100:'5',CN2101:'5_75',CN2102:'5_84',CN2103:'5_82',CN2104:'5_79',CN2105:'5_80',CN2106:'5_83',CN2107:'5_87',CN2108:'5_85',CN2109:'5_77',CN2110:'5_81',CN2111:'5_86',CN2112:'5_78',CN2113:'5_76',CN2114:'5_88',CN2200:'6',CN2201:'6_90',CN2202:'6_93',CN2203:'6_94',CN2204:'6_95',CN2205:'6_96',CN2206:'6_97',CN2207:'6_92',CN2208:'6_91',CN2224:'6_98',CN2300:'16',CN2301:'16_100',CN2302:'16_101',CN2303:'16_109',CN2304:'16_105',CN2305:'16_107',CN2306:'16_103',CN2307:'16_104',CN2308:'16_106',CN2309:'16_108',CN2310:'16_110',CN2311:'16_102',CN2312:'111',CN2327:'16_112',CN3100:'7',CN3101:'7',CN3102:'7',CN3200:'8',CN3201:'8_135',CN3202:'8_146',CN3203:'8_136',CN3204:'8_145',CN3205:'8_147',CN3206:'8_143',CN3207:'8_137',CN3208:'8_139',CN3209:'8_140',CN3210:'8_141',CN3211:'8_144',CN3212:'8_142',CN3213:'8_138',CN3300:'9',CN3301:'9_149',CN3302:'9_153',CN3303:'9_157',CN3304:'9_151',CN3305:'9_150',CN3306:'9_154',CN3307:'9_155',CN3308:'9_538',CN3309:'9_152',CN3310:'9_156',CN3311:'9_158',CN3400:'10',CN3401:'10_160',CN3402:'10_168',CN3403:'10_164',CN3404:'10_165',CN3405:'10_167',CN3406:'10_162',CN3407:'10_169',CN3408:'10_170',CN3410:'10_171',CN3411:'10_166',CN3412:'10_163',CN3413:'10_161',CN3414:'10_173',CN3415:'10_172',CN3416:'10_540',CN3417:'10_174',CN3418:'10_175',CN3500:'11',CN3501:'11_177',CN3502:'11_182',CN3503:'11_180',CN3504:'11_179',CN3505:'11_181',CN3506:'11_183',CN3507:'11_178',CN3508:'11_184',CN3509:'11_185',CN3600:'12',CN3601:'12_187',CN3602:'12_189',CN3603:'12_192',CN3604:'12_188',CN3605:'12_191',CN3606:'12_190',CN3607:'12_193',CN3608:'12_197',CN3609:'12_196',CN3610:'12_195',CN3611:'12_194',CN3700:'13',CN3701:'13_199',CN3702:'13_207',CN3703:'13_203',CN3704:'13_210',CN3705:'13_202',CN3706:'13_205',CN3707:'13_204',CN3708:'13_211',CN3709:'13_212',CN3710:'13_206',CN3711:'13_208',CN3712:'13_213',CN3713:'13_209',CN3714:'13_201',CN3715:'13_200',CN3716:'13_214',CN3717:'13_215',CN4100:'14',CN4101:'14_217',CN4102:'14_225',CN4103:'14_219',CN4104:'14_229',CN4105:'14_223',CN4106:'14_222',CN4107:'14_221',CN4108:'14_220',CN4109:'14_224',CN4110:'14_227',CN4111:'14_228',CN4112:'14_218',CN4113:'14_230',CN4114:'14_226',CN4115:'14_231',CN4116:'14_233',CN4117:'14_234',CN4200:'17',CN4201:'17_236',CN4202:'17_243',CN4203:'17_237',CN4205:'17_246',CN4206:'17_238',CN4207:'17_242',CN4208:'17_239',CN4209:'17_240',CN4210:'17_245',CN4211:'17_241',CN4212:'17_244',CN4213:'17_247',CN4228:'17_252',CN4290:'17',CN4300:'18',CN4301:'18_254',CN4302:'18_259',CN4303:'18_260',CN4304:'18_261',CN4305:'18_264',CN4306:'18_258',CN4307:'18_256',CN4308:'18_255',CN4309:'18_257',CN4310:'18_262',CN4311:'18_263',CN4312:'18_265',CN4313:'18_266',CN4331:'18_267',CN4400:'19',CN4401:'19_269',CN4402:'19_271',CN4403:'19_280',CN4404:'19_281',CN4405:'19_275',CN4406:'19_284',CN4407:'19_283',CN4408:'19_289',CN4409:'19_288',CN4412:'19_285',CN4413:'19_278',CN4414:'19_273',CN4415:'19_277',CN4416:'19_272',CN4417:'19_287',CN4418:'19_270',CN4419:'19_279',CN4420:'19_282',CN4451:'19_274',CN4452:'19_276',CN4453:'19_286',CN4500:'20',CN4501:'20_291',CN4502:'20_293',CN4503:'20_292',CN4504:'20_294',CN4505:'20_298',CN4506:'20_299',CN4507:'20_297',CN4508:'20_295',CN4509:'20_296',CN4510:'20_301',CN4511:'20_304',CN4512:'20_302',CN4513:'20_544',CN4514:'20_542',CN4600:'21',CN4601:'21_306',CN4602:'21_307',CN4690:'21',CN5000:'23',CN5001:'23',CN5002:'23',CN5003:'23',CN5100:'22',CN5101:'22_359',CN5103:'22_368',CN5104:'22_371',CN5105:'22_369',CN5106:'22_362',CN5107:'22_361',CN5108:'22_360',CN5109:'22_365',CN5110:'22_366',CN5111:'22_367',CN5113:'22_363',CN5114:'22_375',CN5115:'22_370',CN5116:'22_364',CN5117:'22_373',CN5118:'22_376',CN5119:'22_372',CN5120:'22_374',CN5132:'22_377',CN5133:'22_378',CN5134:'22_379',CN5200:'25',CN5201:'25_381',CN5202:'25_382',CN5203:'25_383',CN5204:'25_386',CN5222:'25_385',CN5223:'25_389',CN5224:'25_384',CN5226:'25_387',CN5227:'25_388',CN5300:'26',CN5301:'26_391',CN5303:'26_392',CN5304:'26_393',CN5305:'26_398',CN5306:'26_395',CN5307:'26_394',CN5308:'26_396',CN5309:'26_397',CN5323:'26_403',CN5325:'26_404',CN5326:'26_405',CN5328:'26_406',CN5329:'26_402',CN5331:'26_399',CN5333:'26_400',CN5334:'26_401',CN5400:'27',CN5401:'27_408',CN5421:'27_410',CN5422:'27_412',CN5423:'27_413',CN5424:'27_409',CN5425:'27_414',CN5426:'27_411',CN6100:'28',CN6101:'28_416',CN6102:'28_418',CN6103:'28_421',CN6104:'28_420',CN6105:'28_419',CN6106:'28_417',CN6107:'28_422',CN6108:'28_423',CN6109:'28_425',CN6110:'28_424',CN6200:'29',CN6201:'29_427',CN6202:'29_428',CN6203:'29_429',CN6204:'29_430',CN6205:'29_431',CN6206:'29_434',CN6207:'29_433',CN6208:'29_436',CN6209:'29_432',CN6210:'29_435',CN6211:'29_437',CN6212:'29_438',CN6229:'29_439',CN6230:'29_440',CN6300:'30',CN6301:'30_442',CN6321:'30_443',CN6322:'30_444',CN6323:'30_446',CN6325:'30_445',CN6326:'30_447',CN6327:'30_448',CN6328:'30_449',CN6400:'31',CN6401:'31_451',CN6402:'31_452',CN6403:'31_453',CN6404:'31_454',CN6405:'31_599',CN6500:'32',CN6501:'32_456',CN6502:'32_457',CN6521:'32_462',CN6522:'32_463',CN6523:'32_466',CN6527:'32_465',CN6528:'32_467',CN6529:'32_460',CN6530:'32_464',CN6531:'32_459',CN6532:'32_461',CN6540:'32_468',CN6542:'32_470',CN6543:'32_471',CN6590:'32',CN7100:'24',CN8100:'33',CN8200:'34'}}};


// 省市县 三级联动
    function getAreaData(proviceId,areaId,cityId){
        
        $('#'+areaId).html("<option value=0>选择城市</option>");
        $('#'+cityId).html("<option value=0>选择区县</option>"); 
        $('#'+areaId).css('visibility','hidden');
        $('#'+cityId).css('visibility','hidden');
        if($('#'+proviceId).val()!=0){
            var areaObj = Area['data']['city'][$('#'+proviceId).val()];             
            $.each(areaObj,function(key1,val1){
                $('#'+areaId).append("<option value="+key1+">"+val1+"</option>");
            })
        }
    }
    function getCityData(proviceId,areaId,cityId){
        $.each(Area['data']['province'],function(key,val){
            $('#'+proviceId).append("<option value="+key+">"+val+"</option>");
        }); 
        
        $('#'+proviceId).change(function(){
            getAreaData(proviceId,areaId,cityId);
            $('#'+areaId).css('visibility', 'visible');
            $('#'+cityId).css('visibility', 'visible');
        }); 
        
        $('#'+areaId).change(function(){
            $('#'+cityId).html("<option value=0>选择区县</option>");             
            //http://profile.blog.sohu.com/service/county.htm?cid=51&vn=countyList
            var url = "http://profile.blog.sohu.com/service/county.htm?cid="+$(this).val()+"&vn=countyList";
            var c=document.createElement("script");
            c.id = "countryDataId";
            c.type = "text/javascript";
            c.src = url;
            document.getElementsByTagName("head")[0].appendChild(c);
            if($.browser.msie){
                c.onreadystatechange = function(){
                    var state = c.readyState;    
                    if(state == "loaded" || state == "interactive" || state == "complete"){    
                        if(typeof(countyList)!=undefined){
                                // 填充区县的方法
                                if(countyList['status'] == 0){
                                    $.each(countyList['data'],function(key2,val2){
                                        $.each(val2,function(k3,v3){
                                            $('#'+cityId).removeAttr('disabled');
                                            $('#'+cityId).append("<option value="+k3+">"+v3+"</option>");
                                        });
                                    });
                                }else{
                                    $('#'+cityId).html("<option value=0>选择区县</option>");
                                    $('#'+cityId).attr('disabled',true);
                                }
                        }               
                    }else{
                        c.src = url;
                    }
                } 
            }else{          
                c.onload = function(){
                    if(typeof(countyList)!=undefined){
                            // 填充区县的方法
                            if(typeof(countyList)!=undefined){
                                if(countyList['status'] == 0){
                                    $.each(countyList['data'],function(key2,val2){
                                        $.each(val2,function(k3,v3){
                                            $('#'+cityId).removeAttr('disabled');
                                            $('#'+cityId).append("<option value="+k3+">"+v3+"</option>");
                                        });
                                    });
                                }else{
                                    $('#'+cityId).html("<option value=0>选择区县</option>");
                                    $('#'+cityId).attr('disabled',true);
                                }
                            }
                    }
                }
            }
            
        });
    }
    //  年月日 选择
    function getDateData(yearId,monthId,dayId){
        var monarr =[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for(var i=2011;i>1900;i--){
            $('#'+yearId).append("<option value="+i+">"+i+"</option>");
        }
        $('#'+yearId).change(function(){
            $('#'+monthId).html("<option value=>选择月份</option>");
            $('#'+dayId).html("<option value=>选择日期</option>");
            for(var i=1;i<13;i++){
                $('#'+monthId).append("<option value="+i+">"+i+"</option>");
            }
        });
        
        $('#'+monthId).change(function(){
            var year = $('#'+yearId).val();
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) monarr[1] = "29";
            for(i=1;i<=monarr[$('#'+monthId).val()-1];i++){
                $('#'+dayId).append("<option value="+i+">"+i+"</option>");
            }
        });
    }
