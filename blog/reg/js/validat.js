// cookie ֵ
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
user:{msg:'����д��ĳ������䣨�Ƽ��Ѻ����䣩��Ϊ�û�����',errMsg:'�����ʽ�����⣬���޸�',isExis:false,regStr:/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,isLegal:false},
regEmail:{msg:'4-16λ����ĸ��ͷ��ֻ����ĸ�����֡��»���',errMsg:'�����û��������⣬���޸�',isExis:true,regStr:/[a-zA-z]{1}[a-zA-z0-9_]{3,15}/,isLegal:false},
passwd:{msg:'����ӦΪ6-18λ���ɰ�����ĸ�����֡��������',errMsg:'���볤�Ȳ���ȷ�����޸�',isExis:false,isLegal:false},
passwdAgain:{msg:'�ٴ���������',errMsg:'���벻ƥ��',isExis:false,isLegal:false},
blogName:{msg:'1-32λ���ɰ���Ӣ�ġ����ġ������ַ����趨����޸ġ�',errMsg:'�ǳƳ��Ȳ���ȷ�����޸�',isExis:false,isLegal:false},
vcode:{msg:'����ȷ����ͼƬ�е���ĸ������',errMsg:'��֤���������������',isExis:false,isLegal:false},
agree:{msg:'',errMsg:'',isExis:false,isLegal:true},
domain:{msg:'��������ӦΪ4-16λ������Ӣ��(Сд)�����֣��趨�����޸ġ�',errMsg:'������������ȷ�����޸�',isExis:false,regStr:/^[A-Za-z0-9]{4,16}$/,isLegal:false}
};
var fullEmail = "";

/* ע��ҳ����¼� */
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
    
    /* ������ɫ�仯 */
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
                        var tmp = $("<span></span>").append("��������ӦΪ4-16λ������Ӣ�ģ�Сд�������֣�<span class=red>�趨�����޸�</span>��");
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
/* ��д������ҳ����¼����� */
function blognamepageBind(){
	$("#nameBtn").attr('disabled','disabled');
    $('ul#reg input.nameInput').each(function(){
        $(this).bind('focus',function(){
            $(this).parent('div').parent('li').addClass('focus');
            createMsgWar($(this));
            if($.trim($(this).val()).length == 0 || $.trim($(this).val())==""){
							if($(this).attr("id") == 'domain'){
								var tmp = $("<span></span>").append("��������ӦΪ4-16λ������Ӣ�ģ�Сд�������֣�<span class=red>�趨�����޸�</span>��");
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
/* email�ط�ҳ����¼� */
function resendpageBind(){
	// ���·���email
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
/* ��д��������Ϣҳ����¼� */
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
            $('#cityId').html("<option value=0>ѡ�����</option>");
            $('#countyId').html("<option value=0>ѡ������</option>"); 
            $('#cityId').val(0);
            $('#countyId').val(0);
        }else{
        
        }
        
    });
    $('#checkLiving').attr("checked",false);
    //  ������  ������
    getCityData("birthProvinceId","birthCityId","birthCountyId");
    //  ��ס��  ������
    getCityData("provinceId","cityId","countyId");
    // �������� ������
    getDateData("birthdayYear","birthdayMonth","birthdayDate");
}
    
    /* ���ɰ�װԪ�� */
    function createMsgWar(obj){
        if(obj.length == 0){return;}
        var exisflag = validObj[obj.attr('id')].isExis;
        
        var defaultmsg = validObj[obj.attr('id')].msg;
        if(exisflag == false){// �ж��Ƿ���ڸ�Ԫ��
            // �������װ div
            warObj = $('<div class=tip></div>');
            validObj[obj.attr('id')].isExis = true;
            // ����Ϣ������ӵ�dom�У��޸ĳɶ�Ӧ��css
            warObj.hide();
            if((obj.attr('id') == 'vcode')||(obj.attr('id') == 'user')||(obj.attr('id') == 'passwd')){
                warObj.appendTo(obj.parent('div').parent('li'));
            }else{
                obj.parent('div').after(warObj);
            }
        }
    }
    
    /* ���״̬ ���գ��Ϸ����Ƿ��� */
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
    /* ��ʾ��ʾ��Ϣ���¼�
        obj �ؼ����󣬸��ݸö����ҵ���Ӧ�� tip Ԫ�أ�
        claName  tipԪ�ص�class
        str  ��ʾ����
        isShow  �Ƿ���ʾ��tip
            eg:  showMyTip($('#user'),'','��mail�Ѿ����ڣ���һ��',true);
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
    
    /* ���ǿ�������Ϸ���Ƿ�״̬�� */
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
    
    /* У������  ajax */
    function checkEmail(obj){
        //$('#regContr').hide();
        var regString = validObj[obj.attr('id')].regStr; 
				obj.val($.trim(obj.val()).toLowerCase());
        if(!regString.test($.trim(obj.val()).toLowerCase())){
            showMyTip(obj,'error',validObj[obj.attr('id')].errMsg,true);
            // ���ñ�־λ
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
                //putDefaultString(obj,'��ѯ�У����Ժ󡭡�');
                showMyTip(obj,'','��ѯ�У����Ժ󡭡�',true);
                //�趨isLegal
                validObj[obj.attr("id")].isLegal = false;
            },
            success: function(data){
                // statusΪ0�û���δ��ע�����1��������2��֤�����3�Ƿ��û�����4�û����Ѿ����ڣ�6����ʧ��
                // ��3 ��4������ʾ  �����Ķ����� ��������˰�
                returnFlag = $(data).find("status").text();
                if(returnFlag == 3){
                    showMyTip(obj,'error','�����ʽ�����⣬���޸�',true);
                    hideMyEmail("user");
                    validObj[obj.attr("id")].isLegal = false;
                }else if(returnFlag == 4){
                    showMyTip(obj,'','���ʼ��Ѿ�ע�����ʹ�ø��ʼ���¼�����߸���һ���µ��ʼ�',true);
                    showMyEmail("user");
                    //�趨isLegal
                    validObj[obj.attr("id")].isLegal = false;
                }else if(returnFlag == 0){
                    showMyTip(obj,'ok','',true);
                    hideMyEmail("user");
                    //�趨isLegal
                    validObj[obj.attr("id")].isLegal = true;
                    setCookie('regInfosave',tmpEmail);
                    
                }else{
                    showMyTip(obj,'',validObj[obj.attr("id")].msg,true);
                    hideMyEmail("user");
                    //�趨isLegal
                    validObj[obj.attr("id")].isLegal = true;
                }
            },error:function(XMLHttpRequest,textStatus,errorThrown){
                //putDefaultString(obj,'������æ�����Ժ����ԡ�');
                showMyTip(obj,'error','������æ�����Ժ����ԡ�',true);
                //�趨ֵ
                validObj[obj.attr("id")].isLegal = false;
            }
        });
    }
    /* У��ע�������û��� */
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
    /* У������ */
    function checkPass(obj){
        if($.trim(obj.val()).length<6||$.trim(obj.val()).length>18){
            showMyTip(obj,'error',validObj[obj.attr("id")].errMsg,true);
            validObj[obj.attr("id")].isLegal = false;
        }else{
					//��Ӽ�����������ж�
					var re=/^(.)\1{5,8}$/;
					if(re.test(obj.val())){
						showMyTip(obj,'error','���벻������ͬ�����ֻ���ĸ�����޸ġ�',true);
            validObj[obj.attr("id")].isLegal = false;
					}else{
						var weakArr=["123456","12345678","qwerty","qwaszx","qazwsx","password","abc123"];
						if($.inArray(obj.val(),weakArr)!=-1){
							showMyTip(obj,'error','������ڼ򵥣����������롣',true);
							validObj[obj.attr("id")].isLegal = false;	
						}else{
							showMyTip(obj,'ok','',true);
							validObj[obj.attr("id")].isLegal = true;
						}
					}
					//var tmpUsername = $().val().substring(0,obj.val().indexOf("@"));
					if(fullEmail == obj.val()){
						showMyTip(obj,'error','���벻�����˻���ͬ��',true);
            validObj[obj.attr("id")].isLegal = false;
					}
					// �Ƿ���ȷ��������ͬ
					if($('#passwdAgain').val() == $('#passwd').val()){
						showMyTip($('#passwdAgain'),'ok','',true);
						validObj["passwdAgain"].isLegal = true;
					}
        }
    }
    /* У��ȷ������ */
    function checkConfirmPass(obj){
        if((obj.val()!= $('#passwd').val())||($.trim(obj.val()).length == 0)){
            showMyTip(obj,'error',validObj[obj.attr("id")].errMsg,true);
            validObj[obj.attr("id")].isLegal = false;
        }else{
            showMyTip(obj,'ok','',true);
            validObj[obj.attr("id")].isLegal = true;
        }
    }
    /* У���ǳ� */
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
    /* У����֤�� */
    function checkCode(obj){
        if((getCookieByName('msg')!="none")&&(getCookieByName('msg')!="")){
            showMyTip(obj,'error',validObj['vcode'].errMsg,true);
            setCookie('msg','none',"","/",".blog.sohu.com");
        }else{
            showMyTip(obj,'','',false); 
        }
    }
		/* У������cookie */
    function checkpassCode(obj){
        if((getCookieByName('password')!="none")&&(getCookieByName('password')!="")){
            showMyTip(obj,'error',"������ڼ򵥣����޸ġ�",true);
           	setCookie('password','none',"","/",".blog.sohu.com");
        }else{
            showMyTip(obj,'','',false); 
        }
    }
    
    /* �ж�dominName */
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
    
    /* ajaxУ��������� */
    function checkDominNameAjax(obj){
		var tmpStr = $.trim(obj.val()).toLowerCase();
        $.ajax({
            type: "GET",
            url: "/checkdomain?",
            async: false,
            data: 'd='+ $.trim(obj.val()).toLowerCase(),
            beforeSend:function(){
                showMyTip(obj,'','��ѯ�У����Ժ󡭡�',true);
                validObj["domain"].isLegal = false;
            },
            success: function(data){
                // data 5 ʱ���Ѿ�����   0  �����ύ
                if(data == 5){                  
                    var tmp = $("<span></span>").append("�������Ѿ�ע�ᣬ�����ڴ�������������������ԣ��ܳ���4-16λ�������磺<span class=red>"+obj.val()+"1234</span>");
                    showMyTip(obj,'',tmp,true);
                    validObj["domain"].isLegal = false;
                }else if(data == 0){
                    showMyTip(obj,'ok','',true);
                    validObj["domain"].isLegal = true;
					setCookie('domainnamesave',tmpStr);
                }else{
                    showMyTip(obj,'error','���������⣬�����һ��',true);
                    validObj["domain"].isLegal = false;
                }
            },error:function(XMLHttpRequest,textStatus,errorThrown){
                showMyTip(obj,'error','���ӳ�ʱ�����Ժ����ԡ�',true);
                validObj["domain"].isLegal = false;
            }
        });
    }
    /* ˢ����֤�� */
    function refrashCode(){
        $('codeImg').src = "/rand?vcode="+vcode;
    }
    
    /* ��ʾ�ø������¼���� */
    function showMyEmail(str){
        if($('.correctMail').length == 0){
            var tmpObj = $('<div class=correctMail>');
            $('<span class=emailTip><span class="icon email"></span>��������ע�ᣬ����ԣ�</span>').appendTo(tmpObj);
            var inputObj = $('<input>').attr({'class':'emailBtn',type:'button',value:'�����Դ������¼'}).bind('click',function(){
                var turnUrl ="http://blog.sohu.com/login/logon.do?email="+$('#'+str).val();
                window.open(turnUrl);
            });
            inputObj.appendTo(tmpObj);
            $('<span>��<a href=javascript:void(0); onclick=changeEmail();>��һ������</a></span>').appendTo(tmpObj);
            tmpObj.appendTo($('#'+str).parent('div').parent('li'));
        }else{
            $('.correctMail').show();
        }   
    }

    /* ��������������Ϣ�Ƿ�Ϸ�����Ϸ��Ѱ�ť��ɿ����ύ״̬�����в��Ϸ��ģ����ֽ��ύ״̬*/
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
    
    
    
    
    /* �жϲ��������Ƿ�Ϸ� */
    function checkNameLegals(){
        if((validObj['blogName'].isLegal == true)&&(validObj['domain'].isLegal == true)){
            $("#nameBtn").attr('disabled','');
        }else{
            $("#nameBtn").attr('disabled','disabled');
        }
    }
    // ����ҳ��ִ�еķ���
    function initPageSet(){ 
        $('#user').focus();
        $('#user').removeAttr('disabled');  
        // ����ҳ��״̬�ж�  ����cookie����vcode ��user
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
    /* ��һ������ */
    function changeEmail(){
        $('.correctMail').hide();
        $('#user').val("");
        $('#regEmail').val("");
    }
    /* ��ʾע���������� */
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
    /* ��ʾ�������¼���� */
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
 * ��ʾ����ǿ��
 * @return
 */
function chkPasswordStrong(me) {
    //�ָ��ظ���������״̬
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

//���������ǿ�ȼ���
function checkStrong(passwd){
    var p1= (passwd.search(/[a-zA-Z]/)!=-1) ? 1 : 0; 
    var p2= (passwd.search(/[0-9]/)!=-1) ? 1 : 0; 
    var p3= (passwd.search(/[_-]/)!=-1) ? 1 : 0; 
    var sum = p1+p2+p3; 
    if(sum==0||sum==1)return 1; 
    else return sum; 
}

/* ��������ǿ������ */
function hidePassword(){
    $('.psArea').hide();
    $('.psArea .passStrength').attr('class','passStrength lineNor');
    $('.psArea .strengthTip').attr('class','strengthTip tipNor');
}

// �ϴ�ͼƬ��ط���
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
// �������ݣ��������������ļ�
var Area={data:{province:{"1":"������","2":"�����","3":"�ӱ�ʡ","4":"ɽ��ʡ","5":"����ʡ","6":"����ʡ","7":"�Ϻ���","8":"����ʡ","9":"�㽭ʡ","10":"����ʡ","11":"����ʡ","12":"����ʡ","13":"ɽ��ʡ","14":"����ʡ","15":"���ɹ�������","16":"������ʡ","17":"����ʡ","18":"����ʡ","19":"�㶫ʡ","20":"����׳��������","21":"����ʡ","22":"�Ĵ�ʡ","23":"������","24":"̨��ʡ","25":"����ʡ","26":"����ʡ","27":"����������","28":"����ʡ","29":"����ʡ","30":"�ຣʡ","31":"���Ļ���������","32":"�½�ά�����������","33":"����ر�������","34":"�����ر�������","35":"����"},city:{"1":{"1":"������","2":"������","3":"������","4":"������","5":"������","6":"��̨��","7":"ʯ��ɽ��","8":"������","9":"��ͷ����","10":"��ɽ��","11":"ͨ����","12":"˳����","13":"������","14":"��ƽ��","15":"������","16":"������","17":"ƽ����","18":"������","19":"��������"},"2":{"20":"��ƽ��","21":"�Ӷ���","22":"������","23":"�Ͽ���","24":"�ӱ���","25":"������","26":"������","27":"�����","28":"������","29":"������","30":"������","31":"������","32":"����","33":"������","34":"������","35":"������","36":"������","541":"������","37":"��������"},"3":{"38":"ʯ��ׯ��","39":"�żҿ���","40":"�е���","41":"�ػʵ���","42":"��ɽ��","43":"�ȷ���","44":"������","45":"������","46":"��ˮ��","47":"��̨��","48":"������","49":"��������"},"4":{"50":"̫ԭ��","51":"��ͬ��","52":"˷����","53":"��Ȫ��","54":"������","55":"������","56":"������","57":"������","58":"������","59":"�ٷ���","60":"�˳���","61":"��������"},"5":{"75":"������","76":"������","77":"������","78":"������","79":"��˳��","80":"��Ϫ��","81":"������","82":"��ɽ��","83":"������","84":"������","85":"Ӫ����","86":"�̽���","87":"������","88":"��«����","89":"��������"},"6":{"90":"������","91":"�׳���","92":"��ԭ��","93":"������","94":"��ƽ��","95":"��Դ��","96":"ͨ����","97":"��ɽ��","98":"�ӱ߳�����������","99":"��������"},"7":{"114":"������","116":"¬����","117":"�����","118":"������","119":"������","120":"������","121":"բ����","122":"�����","123":"������","124":"������","125":"��ɽ��","126":"�ζ���","127":"�ֶ�����","128":"��ɽ��","129":"�ɽ���","130":"������","131":"������","132":"�ϻ���","133":"������","134":"��������"},"8":{"135":"�Ͼ���","136":"������","137":"���Ƹ���","138":"��Ǩ��","139":"������","140":"�γ���","141":"������","142":"̩����","143":"��ͨ��","144":"����","145":"������","146":"������","147":"������","148":"��������","537":"������"},"9":{"149":"������","150":"������","151":"������","152":"��ɽ��","153":"������","154":"������","155":"����","156":"̨����","157":"������","158":"��ˮ��","159":"��������","538":"������"},"10":{"160":"�Ϸ���","161":"������","162":"������","163":"������","164":"������","165":"������","166":"������","167":"��ɽ��","168":"�ߺ���","169":"ͭ����","170":"������","171":"��ɽ��","172":"������","173":"������","174":"������","175":"������","540":"������","176":"��������"},"11":{"177":"������","178":"��ƽ��","179":"������","180":"������","181":"Ȫ����","182":"������","183":"������","184":"������","185":"������","186":"��������"},"12":{"187":"�ϲ���","188":"�Ž���","189":"��������","190":"ӥ̶��","191":"������","192":"Ƽ����","193":"������","194":"������","195":"������","196":"�˴���","197":"������","198":"��������"},"13":{"199":"������","200":"�ĳ���","201":"������","202":"��Ӫ��","203":"�Ͳ���","204":"Ϋ����","205":"��̨��","206":"������","207":"�ൺ��","208":"������","209":"������","210":"��ׯ��","211":"������","212":"̩����","213":"������","214":"������","215":"������","216":"��������"},"14":{"217":"֣����","218":"����Ͽ��","219":"������","220":"������","221":"������","222":"�ױ���","223":"������","224":"�����","225":"������","226":"������","227":"�����","228":"�����","229":"ƽ��ɽ��","230":"������","231":"������","232":"��Դ��","233":"�ܿ���","234":"פ�����","235":"��������"},"15":{"62":"���ͺ�����","63":"��ͷ��","64":"�ں���","65":"�����","66":"���ױ���","67":"�˰���","69":"���ֹ�����","70":"�����첼��","72":"�����׶���","73":"��������","555":"������˹��","556":"ͨ����","74":"��������"},"16":{"100":"��������","101":"���������","102":"�ں���","103":"������","104":"������","105":"�׸���","106":"��ľ˹��","107":"˫Ѽɽ��","108":"��̨����","109":"������","110":"ĵ������","111":"�绯����","112":"���˰������","113":"��������"},"17":{"236":"�人��","237":"ʮ����","238":"�差��","239":"������","240":"Т����","241":"�Ƹ���","242":"������","243":"��ʯ��","244":"������","245":"������","246":"�˲���","247":"������","248":"������","249":"������","250":"Ǳ����","251":"��ũ������","252":"��ʩ����������������","253":"��������"},"18":{"254":"��ɳ��","255":"�żҽ���","256":"������","257":"������","258":"������","259":"������","260":"��̶��","261":"������","262":"������","263":"������","264":"������","265":"������","266":"¦����","267":"��������������������","268":"��������"},"19":{"269":"������","270":"��Զ��","271":"�ع���","272":"��Դ��","273":"÷����","274":"������","275":"��ͷ��","276":"������","277":"��β��","278":"������","279":"��ݸ��","280":"������","281":"�麣��","282":"��ɽ��","283":"������","284":"��ɽ��","285":"������","286":"�Ƹ���","287":"������","288":"ï����","289":"տ����","290":"��������"},"20":{"291":"������","292":"������","293":"������","294":"������","295":"�����","296":"������","297":"������","298":"������","299":"���Ǹ���","301":"��ɫ��","302":"�ӳ���","304":"������","542":"������","543":"ƾ����","544":"������","305":"��������"},"21":{"306":"������","307":"������","308":"��ɽ��","309":"�Ĳ���","310":"����","311":"������","313":"������","314":"������","315":"�ٸ���","316":"������","317":"������","318":"�Ͳ���","319":"��������������","320":"��ɳ����������","321":"������������������","322":"��ˮ����������","323":"��ͤ��������������","324":"�ֶ�����������","539":"��ָɽ��","326":"��������"},"22":{"359":"�ɶ���","360":"��Ԫ��","361":"������","362":"������","363":"�ϳ���","364":"�㰲��","365":"������","366":"�ڽ���","367":"��ɽ��","368":"�Թ���","369":"������","370":"�˱���","371":"��֦����","372":"������","373":"������","374":"������","375":"üɽ��","376":"�Ű���","377":"���Ӳ���Ǽ��������","378":"���β���������","379":"��ɽ����������","380":"��������"},"23":{"327":"������","328":"��ɿ���","329":"������","330":"ɳƺ����","331":"��������","332":"�ϰ���","333":"������","334":"��ʢ��","335":"˫����","336":"�山��","337":"������","338":"������","339":"������","340":"�ϴ���","341":"������","342":"������","343":"�ϴ���","344":"������","345":"�뽭��","346":"������","347":"ͭ����","348":"������","349":"�ٲ���","350":"�ɽ��","351":"�潭��","352":"��¡��","353":"�ᶼ��","354":"�ǿ���","355":"��ƽ��","357":"ǭ����","358":"��������","545":"�����","546":"����","547":"������","548":"����","549":"��Ϫ��","550":"��ɽ��","551":"ʯ��������������","552":"��ɽ����������������","553":"��������������������","554":"��ˮ����������������"},"24":{"479":"̨����","480":"������","481":"̨����","482":"̨����","484":"��������","579":"��¡��","580":"������","581":"������","582":"̨����","583":"������","584":"������","585":"��԰��","586":"������","587":"̨����","588":"�û���","589":"��Ͷ��","590":"������","591":"������","592":"̨����","593":"������","594":"������","595":"̨����","596":"������","597":"�����","602":"���㵺"},"25":{"381":"������","382":"����ˮ��","383":"������","384":"�Ͻڵ���","385":"ͭ�ʵ���","386":"��˳��","387":"ǭ�������嶱��������","388":"ǭ�ϲ���������������","389":"ǭ���ϲ���������������","390":"��������"},"26":{"391":"������","392":"������","393":"��Ϫ��","394":"������","395":"��ͨ��","396":"�ն���","397":"�ٲ���","398":"��ɽ��","399":"�º���徰����������","400":"ŭ��������������","401":"�������������","402":"�������������","403":"��������������","404":"��ӹ���������������","405":"��ɽ׳������������","406":"��˫���ɴ���������","407":"��������"},"27":{"408":"������","409":"��������","410":"��������","411":"��֥����","412":"ɽ�ϵ���","413":"�տ������","414":"�������","415":"��������"},"28":{"416":"������","417":"�Ӱ���","418":"ͭ����","419":"μ����","420":"������","421":"������","422":"������","423":"������","424":"������","425":"������","426":"��������"},"29":{"427":"������","428":"��������","429":"�����","430":"������","431":"��ˮ��","432":"��Ȫ��","433":"��Ҵ��","434":"������","435":"������","436":"ƽ����","437":"������","438":"¤�ϵ���","439":"���Ļ���������","440":"���ϲ���������","441":"��������","557":"������","558":"�ػ���"},"30":{"442":"������","443":"��������","444":"��������������","445":"���ϲ���������","446":"���ϲ���������","447":"�������������","448":"��������������","449":"�����ɹ������������","450":"��������"},"31":{"451":"������","452":"ʯ��ɽ��","453":"������","454":"��ԭ��","599":"������","455":"��������"},"32":{"456":"��³ľ����","457":"����������","458":"ʯ������","459":"��ʲ����","460":"�����յ���","461":"�������","462":"��³������","463":"���ܵ���","464":"�������տ¶�����������","465":"���������ɹ�������","466":"��������������","467":"���������ɹ�������","468":"���������������","469":"��������","470":"���ǵ���","471":"����̩����","600":"ͼľ�����","601":"�������","472":"��������"},"33":{"474":"��������","476":"��������","559":"������","560":"����","561":"������","562":"����","563":"��ˮ����","564":"�ƴ�����","565":"������","566":"�ͼ�����","567":"�뵺��","568":"������","569":"����","570":"������","571":"ɳ����","572":"������","573":"������","574":"������","575":"Ԫ����"},"34":{"576":"���Ű뵺","577":"���е�","578":"·����","478":"��������"},"35":{"603":"����"}},loc: {CN1100:'1',CN1101:'1',CN1102:'1',CN1200:'2',CN1201:'2',CN1202:'2',CN1300:'3',CN1301:'3_38',CN1302:'3_42',CN1303:'3_41',CN1304:'3_48',CN1305:'3_47',CN1306:'3_44',CN1307:'3_39',CN1308:'3_40',CN1309:'3_45',CN1310:'3_43',CN1311:'3_46',CN1400:'4',CN1401:'4_50',CN1402:'4_51',CN1403:'4_53',CN1404:'4_54',CN1405:'4_55',CN1406:'4_52',CN1407:'4_58',CN1408:'4_60',CN1409:'4_56',CN1410:'4_59',CN1411:'4_57',CN1500:'15',CN1501:'15_62',CN1502:'15_63',CN1503:'15_64',CN1504:'15_65',CN1505:'15_556',CN1506:'15_555',CN1507:'15_66',CN1508:'15_72',CN1509:'15_70',CN1522:'15_67',CN1525:'15_69',CN1529:'15_73',CN2100:'5',CN2101:'5_75',CN2102:'5_84',CN2103:'5_82',CN2104:'5_79',CN2105:'5_80',CN2106:'5_83',CN2107:'5_87',CN2108:'5_85',CN2109:'5_77',CN2110:'5_81',CN2111:'5_86',CN2112:'5_78',CN2113:'5_76',CN2114:'5_88',CN2200:'6',CN2201:'6_90',CN2202:'6_93',CN2203:'6_94',CN2204:'6_95',CN2205:'6_96',CN2206:'6_97',CN2207:'6_92',CN2208:'6_91',CN2224:'6_98',CN2300:'16',CN2301:'16_100',CN2302:'16_101',CN2303:'16_109',CN2304:'16_105',CN2305:'16_107',CN2306:'16_103',CN2307:'16_104',CN2308:'16_106',CN2309:'16_108',CN2310:'16_110',CN2311:'16_102',CN2312:'111',CN2327:'16_112',CN3100:'7',CN3101:'7',CN3102:'7',CN3200:'8',CN3201:'8_135',CN3202:'8_146',CN3203:'8_136',CN3204:'8_145',CN3205:'8_147',CN3206:'8_143',CN3207:'8_137',CN3208:'8_139',CN3209:'8_140',CN3210:'8_141',CN3211:'8_144',CN3212:'8_142',CN3213:'8_138',CN3300:'9',CN3301:'9_149',CN3302:'9_153',CN3303:'9_157',CN3304:'9_151',CN3305:'9_150',CN3306:'9_154',CN3307:'9_155',CN3308:'9_538',CN3309:'9_152',CN3310:'9_156',CN3311:'9_158',CN3400:'10',CN3401:'10_160',CN3402:'10_168',CN3403:'10_164',CN3404:'10_165',CN3405:'10_167',CN3406:'10_162',CN3407:'10_169',CN3408:'10_170',CN3410:'10_171',CN3411:'10_166',CN3412:'10_163',CN3413:'10_161',CN3414:'10_173',CN3415:'10_172',CN3416:'10_540',CN3417:'10_174',CN3418:'10_175',CN3500:'11',CN3501:'11_177',CN3502:'11_182',CN3503:'11_180',CN3504:'11_179',CN3505:'11_181',CN3506:'11_183',CN3507:'11_178',CN3508:'11_184',CN3509:'11_185',CN3600:'12',CN3601:'12_187',CN3602:'12_189',CN3603:'12_192',CN3604:'12_188',CN3605:'12_191',CN3606:'12_190',CN3607:'12_193',CN3608:'12_197',CN3609:'12_196',CN3610:'12_195',CN3611:'12_194',CN3700:'13',CN3701:'13_199',CN3702:'13_207',CN3703:'13_203',CN3704:'13_210',CN3705:'13_202',CN3706:'13_205',CN3707:'13_204',CN3708:'13_211',CN3709:'13_212',CN3710:'13_206',CN3711:'13_208',CN3712:'13_213',CN3713:'13_209',CN3714:'13_201',CN3715:'13_200',CN3716:'13_214',CN3717:'13_215',CN4100:'14',CN4101:'14_217',CN4102:'14_225',CN4103:'14_219',CN4104:'14_229',CN4105:'14_223',CN4106:'14_222',CN4107:'14_221',CN4108:'14_220',CN4109:'14_224',CN4110:'14_227',CN4111:'14_228',CN4112:'14_218',CN4113:'14_230',CN4114:'14_226',CN4115:'14_231',CN4116:'14_233',CN4117:'14_234',CN4200:'17',CN4201:'17_236',CN4202:'17_243',CN4203:'17_237',CN4205:'17_246',CN4206:'17_238',CN4207:'17_242',CN4208:'17_239',CN4209:'17_240',CN4210:'17_245',CN4211:'17_241',CN4212:'17_244',CN4213:'17_247',CN4228:'17_252',CN4290:'17',CN4300:'18',CN4301:'18_254',CN4302:'18_259',CN4303:'18_260',CN4304:'18_261',CN4305:'18_264',CN4306:'18_258',CN4307:'18_256',CN4308:'18_255',CN4309:'18_257',CN4310:'18_262',CN4311:'18_263',CN4312:'18_265',CN4313:'18_266',CN4331:'18_267',CN4400:'19',CN4401:'19_269',CN4402:'19_271',CN4403:'19_280',CN4404:'19_281',CN4405:'19_275',CN4406:'19_284',CN4407:'19_283',CN4408:'19_289',CN4409:'19_288',CN4412:'19_285',CN4413:'19_278',CN4414:'19_273',CN4415:'19_277',CN4416:'19_272',CN4417:'19_287',CN4418:'19_270',CN4419:'19_279',CN4420:'19_282',CN4451:'19_274',CN4452:'19_276',CN4453:'19_286',CN4500:'20',CN4501:'20_291',CN4502:'20_293',CN4503:'20_292',CN4504:'20_294',CN4505:'20_298',CN4506:'20_299',CN4507:'20_297',CN4508:'20_295',CN4509:'20_296',CN4510:'20_301',CN4511:'20_304',CN4512:'20_302',CN4513:'20_544',CN4514:'20_542',CN4600:'21',CN4601:'21_306',CN4602:'21_307',CN4690:'21',CN5000:'23',CN5001:'23',CN5002:'23',CN5003:'23',CN5100:'22',CN5101:'22_359',CN5103:'22_368',CN5104:'22_371',CN5105:'22_369',CN5106:'22_362',CN5107:'22_361',CN5108:'22_360',CN5109:'22_365',CN5110:'22_366',CN5111:'22_367',CN5113:'22_363',CN5114:'22_375',CN5115:'22_370',CN5116:'22_364',CN5117:'22_373',CN5118:'22_376',CN5119:'22_372',CN5120:'22_374',CN5132:'22_377',CN5133:'22_378',CN5134:'22_379',CN5200:'25',CN5201:'25_381',CN5202:'25_382',CN5203:'25_383',CN5204:'25_386',CN5222:'25_385',CN5223:'25_389',CN5224:'25_384',CN5226:'25_387',CN5227:'25_388',CN5300:'26',CN5301:'26_391',CN5303:'26_392',CN5304:'26_393',CN5305:'26_398',CN5306:'26_395',CN5307:'26_394',CN5308:'26_396',CN5309:'26_397',CN5323:'26_403',CN5325:'26_404',CN5326:'26_405',CN5328:'26_406',CN5329:'26_402',CN5331:'26_399',CN5333:'26_400',CN5334:'26_401',CN5400:'27',CN5401:'27_408',CN5421:'27_410',CN5422:'27_412',CN5423:'27_413',CN5424:'27_409',CN5425:'27_414',CN5426:'27_411',CN6100:'28',CN6101:'28_416',CN6102:'28_418',CN6103:'28_421',CN6104:'28_420',CN6105:'28_419',CN6106:'28_417',CN6107:'28_422',CN6108:'28_423',CN6109:'28_425',CN6110:'28_424',CN6200:'29',CN6201:'29_427',CN6202:'29_428',CN6203:'29_429',CN6204:'29_430',CN6205:'29_431',CN6206:'29_434',CN6207:'29_433',CN6208:'29_436',CN6209:'29_432',CN6210:'29_435',CN6211:'29_437',CN6212:'29_438',CN6229:'29_439',CN6230:'29_440',CN6300:'30',CN6301:'30_442',CN6321:'30_443',CN6322:'30_444',CN6323:'30_446',CN6325:'30_445',CN6326:'30_447',CN6327:'30_448',CN6328:'30_449',CN6400:'31',CN6401:'31_451',CN6402:'31_452',CN6403:'31_453',CN6404:'31_454',CN6405:'31_599',CN6500:'32',CN6501:'32_456',CN6502:'32_457',CN6521:'32_462',CN6522:'32_463',CN6523:'32_466',CN6527:'32_465',CN6528:'32_467',CN6529:'32_460',CN6530:'32_464',CN6531:'32_459',CN6532:'32_461',CN6540:'32_468',CN6542:'32_470',CN6543:'32_471',CN6590:'32',CN7100:'24',CN8100:'33',CN8200:'34'}}};


// ʡ���� ��������
    function getAreaData(proviceId,areaId,cityId){
        
        $('#'+areaId).html("<option value=0>ѡ�����</option>");
        $('#'+cityId).html("<option value=0>ѡ������</option>"); 
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
            $('#'+cityId).html("<option value=0>ѡ������</option>");             
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
                                // ������صķ���
                                if(countyList['status'] == 0){
                                    $.each(countyList['data'],function(key2,val2){
                                        $.each(val2,function(k3,v3){
                                            $('#'+cityId).removeAttr('disabled');
                                            $('#'+cityId).append("<option value="+k3+">"+v3+"</option>");
                                        });
                                    });
                                }else{
                                    $('#'+cityId).html("<option value=0>ѡ������</option>");
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
                            // ������صķ���
                            if(typeof(countyList)!=undefined){
                                if(countyList['status'] == 0){
                                    $.each(countyList['data'],function(key2,val2){
                                        $.each(val2,function(k3,v3){
                                            $('#'+cityId).removeAttr('disabled');
                                            $('#'+cityId).append("<option value="+k3+">"+v3+"</option>");
                                        });
                                    });
                                }else{
                                    $('#'+cityId).html("<option value=0>ѡ������</option>");
                                    $('#'+cityId).attr('disabled',true);
                                }
                            }
                    }
                }
            }
            
        });
    }
    //  ������ ѡ��
    function getDateData(yearId,monthId,dayId){
        var monarr =[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for(var i=2011;i>1900;i--){
            $('#'+yearId).append("<option value="+i+">"+i+"</option>");
        }
        $('#'+yearId).change(function(){
            $('#'+monthId).html("<option value=>ѡ���·�</option>");
            $('#'+dayId).html("<option value=>ѡ������</option>");
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
