/**
 * 回填头像
 * @author yadongzhao
 */
(function($){
    if (window.iBloger != null) {
        return;
    }
    window.iBloger = {};
    var $userInfo = {};
    var uniq = function(oArr){
        var resultarr = [];
        for (var i = 0; i < oArr.length; i++) {
            if (!isContain(oArr[i], resultarr)) {
                resultarr.push(oArr[i]);
            }
        }
        function isContain(value, arr){
            for (var i = 0; i < arr.length; i++) {
                if (value === arr[i]) {
                    return true;
                }
            }
            return false;
        }
        return resultarr;
    };
    /**
     * 回填用户头像和昵称
     */
    function fillInfo(){
        if ($('[name="BlogUser"]', $('#postList')).length > 0) {
            var oNode = ($('[name="BlogUser"]', $('#postList')));
            var dataXpArr = [];
            for (var i = 0; i < oNode.length; i++) {
                if ($(oNode[i]).attr("data-xpt") != null) {
                    dataXpArr.push($(oNode[i]).attr("data-xpt"));
                }
            }
            if (dataXpArr.length > 0) {
                dataXpArr = uniq(dataXpArr);
                var requestArr = [];
                for (var i = 0; i < oNode.length; i++) {
                    if ($(oNode[i]).attr("data-xpt") != null && $userInfo[$(oNode[i]).attr("data-xpt")] == null) {
                        requestArr.push($(oNode[i]).attr("data-xpt"));
                    }
                }
                if (requestArr.length > 0) {
                    jQuery.post("http://i.sohu.com/api/accountinfo.do?t=" + 10000 * Math.random(), {
                        "xp": dataXpArr.join(","),
                        "method": "getAccounts"
                    }, function(data){
                        for (var i in data) {
                            $userInfo[i] = data[i];
                        }
                        //赋值
                        fillData(oNode);
                    },"json");
                }
                else {
                    //赋值
                    fillData(oNode);
                }
            }
        }
    }
    /**
     *回填节点的数据
     */
    function fillData(oNode){
        for (var i = 0; i < oNode.length; i++) {
            var uData = $userInfo[$(oNode[i]).attr("data-xpt")];
            if (uData != null) {
                if ($(oNode[i]).attr("data-blogexp") != null) {
                    if ($(oNode[i]).attr("data-blogexp").indexOf("@innerHTML") > -1) {
                        $(oNode[i]).html(uData.title);
                    }
                    if ($(oNode[i]).attr("data-blogexp").indexOf("@href") > -1) {
                        $(oNode[i]).attr("href", "http://blog.sohu.com/people/!" + $(oNode[i]).attr("data-xpt"));
                    }
                }
                if ($(oNode[i]).find("img").length == 1) {
                    var imgNode = $(oNode[i]).find("img");
                    if (imgNode.attr("data-blogexp") != null) {
                        if (imgNode.attr("data-blogexp").indexOf("@src") > -1) {
                            imgNode.attr("src", uData.ico);
                        }
                        if (imgNode.attr("data-blogexp").indexOf("@alt") > -1) {
                            imgNode.attr("alt", uData.title);
                        }
                        if (imgNode.attr("data-blogexp").indexOf("@title") > -1) {
                            imgNode.attr("title", uData.title);
                        }
                        
                    }
                }
                
            }
            
            
        }
    }
    window.iBloger.fillBlogerInfo = fillInfo;
})(jQuery);

