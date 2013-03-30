/**
 * 读取最新访客
 * @author yadongzhao
 */
(function($){
    if (window.App == null) {
        window.App = {};
    }
    var vistors = {
        getRencentVistors: function(){
            var userId = Base64.encode(/focus\.cn$/ig.test(PassportSC.cookie.userid) ? (PassportSC.cookie.uid + "@focus.cn") : PassportSC.cookie.userid);
            var xpt = userId;
            $.getScript("http://blog.sohu.com/service/userinfo.jsp?xp=" + xpt + "&vn=bloginfo", function(){
                var reg = /http:\/\/(.*)\.blog\.sohu\.com/;
                var sUrl = "";
                if (typeof window["bloginfo"] != "undefined" && bloginfo != null && bloginfo[xpt] != null && bloginfo[xpt].url) {
                    var result = reg.exec(bloginfo[xpt].url);
                    if (result != null && result.length > 1) {
                        sUrl = result[1];
                    }
                    else {
                        $("#refersCtr").html("暂无访客");
                    }
                }
                else {
                    $("#refersCtr").html("暂无访客");
                    return;
                }
                if (sUrl != "") {
                    $.getScript('http://stat.pic.sohu.com/blogcount?u=' + sUrl + '&k=rv&vn=referid', function(){
                        if (referid != null) {
                            $.get("http://i.sohu.com/frag/resentVisitor_new.jsp?u=" + sUrl + "&ids=" + referid, function(data){
                                $("#refersCtr").html(data);
                                addTime();
                            });
                        }
                    });
                }
                
            });
        }
    };
    function addTime(){
        if (!(typeof(referidtime) == "string" && referidtime.length > 0)) {
            return;
        }
        var refersCtr = $("#refersCtr");
        if (refersCtr.length == 0) {
            return;
        }
        var brs = $("li", refersCtr), times = referidtime.split(',');
        if (typeof(referid) == "string" && referid.length > 0) {
            var referids = referid.split(',');
            for (var i = 0, il = referids.length; i < il; i++) {
                if (referids[i] == _ebi) {
                    if (i < times.length) 
                        times.splice(i, 1);
                    break;
                }
            }
        }
        for (var i = 0, il = Math.min(brs.length, times.length); i < il; i++) {
            var it = times[i];
            if (isNaN(it) || parseInt(it) == 0) 
                continue;
            var te = document.createElement('p');
            te.className = 'time';
            te.innerHTML = friendlyTime(it);
            brs[i].appendChild(te);
        }
    }
    App.vistors = vistors;
    $(document).ready(function(){
        $.waitUntil({
            condition: function(){
                return typeof window.Base64 != 'undefined';
            },
            work: function(){
                App.vistors.getRencentVistors();
            }
        });
        
    });
    
})(jQuery);
