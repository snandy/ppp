var scriptDate = new Date();
var mainTime = _timeout = null;
var channelName = "";
var channelList = {
    all: {
        name: "all",
        title: "全部",
        link: "",
        id: ""
    },
    xingkong: {
        name: "xingkong",
        title: "星空广场",
        link: "",
        id: ""
    },
    fashion: {
        name: "fashion",
        title: "时尚",
        link: "",
        id: ""
    },
    biz: {
        name: "biz",
        title: "财经",
        link: "",
        id: ""
    },
    baby: {
        name: "baby",
        title: "育儿",
        link: "",
        id: ""
    },
    newtravel: {
        name: "newtravel",
        title: "旅游",
        link: "",
        id: ""
    },
    life: {
        name: "life",
        title: "生活",
        link: "",
        id: ""
    }
};
var thecookies = function (n) {
    if (n && n > 0) {
        $.cookie("newsList", n, {
            expires: 1,
            path: "/",
            domain: "sohu.com"
        });
        return n;
    } else {
        return $.cookie("newsList");
    }
};
var dateTitle = function () {
    return scriptDate.asString('<span>yyyy</span>年m</span>月<span>d</span>日') + '滚动博文'
};
var thisChannel = function (n) {
    var result = "";
	
    if (n != undefined || n != "") {
        try {
            result = channelList[n].name + "/";
        } catch (e) {
            result = n;
        }
    }
    return result;
};
var thisURL = function (n) {
    return 'http://blog.sohu.com/roll/' + thisChannel(n) + scriptDate.asString('yyyymmdd') + '/index.shtml'
};
var sh = function () {
    $("#date_pick").slideToggle("fast");
};
var reView = {
    open: function (n) {
        window.location.href = thisURL(n);
    },
    reload: function () {
        document.location.reload();
    }
};
var backTime = function (n, o) {
    var nn = parseInt(n) || 120;
    backtime = nn;
    $("#s" + n).parent().find("a").removeClass("now");
    $("#s" + n).addClass("now");
    if (typeof (o) == "object") {
        thecookies(n);
        clearTimeout(mainTime);
        clearTimeout(_timeout);
        $("#backCP").attr("checked", true);
    }
    if ($("#backCP").attr("checked")) {
        mainTime = setTimeout(function () {
            reView.reload(nn);
        }, nn * 1000);
        _countDown();
        return false;
    } else {
        clearTimeout(mainTime);
        clearTimeout(_timeout);
    }
};
var _countDown = function () {
    backtime--;
    $("#backCount").html(backtime > 0 ? backtime : 0);
    clearTimeout(_timeout);
    _timeout = setTimeout(function () {
        _countDown()
    }, 1000);
};
$(

function () {
    $('#date_pick').datePicker({
        inline: true,
        startDate: startDate,
        endDate: (new Date()).asString()
    }).bind('dateSelected', function (e, sd, $td) {
        scriptDate = sd;
        reView.open(channelName);
    });
    $("#listDate").html(dateTitle());
    $("#contentA .list14 li").bind("mouseover", function () {
        $(this).addClass("hover");
    });
    $("#contentA .list14 li").bind("mouseout", function () {
        $(this).removeClass("hover");
    });
    $("#backCP").bind("click", function () {
        backTime(backtime);
    });
    $("#backCount").html(backtime);
    backTime(backtime);
    var r = function (s) {
        return s.replace("http://", "").split("/")[2];
    };
    $(".sideNav").find("a").each(function () {
		
        if (r($(this).attr("href")) == r(document.location.toString())) {
            $(this).parent().addClass = "now";
            channelName = r($(this).attr("href"));
			
        }
    })
})