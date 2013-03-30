
if (!Mini) 
    var Mini = {};
Mini.Post = {
    pg: 0,
    sz: 20,
    delNum: 0,//ajax删除的数目
    listUrl: "/mini/a/document/jsonlist.do",
    addUrl: "/mini/a/document/save.do",
    delUrl: "/mini/a/document/delete.do",
    feedUrl: "http://mnf.blog.sohu.com/message",
    addEntryUrl: "/manage/entry.do?m=quickPost",
    type: -1,
    defaultTxt: '在做什么呢?',
    getXpt: function(){
        return window._xpt;
    },
    
    /**
     * iA:feed的类型，-1代表全部，null代表使用当前设定
     */
    feedMore: function(iA/*type*/, bB/*showmore*/){
        if (this.loadingData) 
            return;
        this.loadingData = true;
        var vn = "hfeed" + Time.now();
        var listEl = $('postList');
        var moreEl = $('homeFeedMore');
        var moreWaitEl = $('homeWaitFeed');
        var showMoreEl = $('showMoreFeed');
        var noMoreEl = $('noMoreFeed');
        
        if (typeof iA == 'number') {
            this.type = iA;
        }
        else 
            if (typeof iA == 'undefined') {
                this.type = -1;
            }
        if (this.type == 33 && bB) {//微博查看更多跳转
            window.open('http://t.sohu.com/home');
            this.loadingData = false;
            return;
        }
        
        if (!moreWaitEl) {
            Mini.MsgBox.alert('等待页面加载中...');
            return;
        }
        
        
        
        if (!bB) {//从头查看
            this.pg = 0;
            listEl.innerHTML = '<div class="feedDefault">正在读取数据...';
            noMoreEl.hide();
            showMoreEl.show();
            moreWaitEl.hide();
            moreEl.hide();
            this._feedTabShow(this.type);
            
        }
        else {
            showMoreEl.hide();
            moreWaitEl.show();
        }
        var qpg = this.pg + 1;
        
        var url = this.feedUrl + '?pp=' + this.getXpt();
        if (this.type >= 0) {
            url += '&type=' + this.type;
        }
        url += '&st=' + ((qpg - 1) * this.sz - this.delNum) + '&sz=' + this.sz;
        
        
        window.setTimeout(function(){
            new Groj(url, {
                variable: vn,
                timeout: 40000,
                onSuccess: function(response){
                    moreWaitEl.hide();
                    if (response.status == 1 && response.data) {
                        Mini.Post.pg++;
                        var newL = document.createElement("div");
                        newL.innerHTML = response.data.view;
                        if (!bB) {
                            listEl.innerHTML = '';
                        }
                        listEl.insert(newL);
                        showMoreEl.show();
                        moreEl.show();
                        Mini.Post._feedHover(newL);
                        Comment.bindEventByElement(newL);
                        if (typeof iBloger != 'undefined') {
                            iBloger.fillBlogerInfo();
                        }
                        if (typeof allTalking != 'undefined') {
                            window.allTalking.getAllTalking();
                        }
                        if (typeof welcomeFeed != 'undefined') {
                            if (Mini.Post.type == -1) {
                                window.welcomeFeed.add();
                            }
                        }
                        //$call(function(){blog.user.User.fill()},'blog.user');
                    }
                    else {
                        if (!bB) {
                            listEl.innerHTML = '<div class="feedDefault">暂无好友动态，<a href="http://blog.sohu.com/morefreshblogs.html" target="_blank">赶紧找找你感兴趣的人吧！</div>';
                            if (typeof allTalking != 'undefined') {
                                window.allTalking.getAllTalking();
                            }
                            if (typeof welcomeFeed != 'undefined') {
                                if (Mini.Post.type == -1) {
                                    window.welcomeFeed.add();
                                }
                            }
                        }
                        else {
                            showMoreEl.hide();
                            noMoreEl.show();
                        }
                    }
                    Mini.Post.loadingData = false;
                },
                onFailure: function(){
                    moreWaitEl.hide();
                    if (!bB) {
                        listEl.innerHTML = '<div class="feedDefault">不能取得相关数据，请稍后重试</div>';
                    }
                    else {
                        Mini.MsgBox.alert('不能取得相关数据，请稍后重试');
                    }
                    Mini.Post.loadingData = false;
                }
            });
        }, 5);
    },
    _feedHover: function(fatherEle){
        fatherEle = fatherEle || document;
        fatherEle = $(fatherEle);
        var feedItems = document.getElementsByClassName("feedItem", fatherEle);
        for (var i = 0; i < feedItems.length; i++) {
            var item = feedItems[i];
            Event.observe(item, 'mouseover', function(){
                $(this).addClassName("hover");
            }
.bind(item));
            Event.observe(item, 'mouseout', function(){
                $(this).removeClassName("hover");
            }
.bind(item));
        }
    },
    _feedTabShow: function(type){
        if (typeof type == 'undefined' || typeof type != 'number') 
            type = -1;
        var tabCtner = $('feedTabs');
        if (!tabCtner) 
            return;
        var tabs = tabCtner.getElementsByTagName('li');
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            var feedType = tab.getAttribute('feedtype');
            if (feedType && feedType == type) {
                tab.className = 'on';
            }
            else {
                tab.className = '';
            }
        }
    },
    bindInputEvent: function(oEl){
        oEl = $(oEl);
        Event.observe(oEl, 'focus', function(){
            if (oEl.value.trim() == Mini.Post.defaultTxt) {
                oEl.value = '';
                oEl.addClassName('focus');
            }
        });
        Event.observe(oEl, 'blur', function(){
            if (oEl.value.trim() == '') {
                oEl.value = Mini.Post.defaultTxt;
                oEl.removeClassName('focus');
            }
        });
    },
    addToList: function(json){
        var listCtner = $('postList');
        if (listCtner) {
            var newPost = new Element('div');
            listCtner.insert({
                'top': newPost
            });
            newPost.setStyle({
                'height': '0px',
                'overflow': 'hidden'
            });
            
            newPost.innerHTML = json.data.view;
            var po = newPost.getElementsByTagName('li')[0];
            po = $(newPost);
            var fn = function(){
                var _h = po.getHeight();
                var padding = 0;
                padding = parseInt(po.getStyle('padding-top')) + parseInt(po.getStyle('padding-bottom'));
                if (isNaN(padding)) 
                    padding = 0;
                _h -= padding;
                po.setStyle({
                    'height': '0px',
                    'overflow': 'hidden'
                });
                //newPost.setStyle({'height':'auto','overflow':'auto'});
                newPost.replace(po);
                var h = 0;
                
                var itid = setInterval(function(){
                    h += 10;
                    if (h > _h) 
                        h = _h;
                    po.setStyle({
                        'height': h + 'px'
                    });
                    if (h >= _h) {
                        clearInterval(itid);
                        po.setStyle({
                            'height': ''
                        });
                    }
                }, 40);
                //var html = json.data.view + listCtner.innerHTML;
                ///listCtner.innerHTML = html;
                //listCtner.insert({'top':newPost});
                Comment.bindEventByElement(po);
                Mini.Post._feedHover(po);
            }
            var img = po.down('img');
            if (img) {
                setTimeout(fn, 500);
            }
            else {
                fn();
            }
        }
    },
    addToListBottom: function(json){
        var listCtner = $('postList');
        if (listCtner) {
            var newPost = new Element('div');
            listCtner.insert({
                'bottom': newPost
            });
            newPost.setStyle({
                'height': '0px',
                'overflow': 'hidden'
            });
            
            newPost.innerHTML = json.data.view;
            var po = newPost.getElementsByTagName('li')[0];
            po = $(newPost);
            var fn = function(){
                var _h = po.getHeight();
                var padding = 0;
                padding = parseInt(po.getStyle('padding-top')) + parseInt(po.getStyle('padding-bottom'));
                if (isNaN(padding)) 
                    padding = 0;
                _h -= padding;
                po.setStyle({
                    'height': '0px',
                    'overflow': 'hidden'
                });
                //newPost.setStyle({'height':'auto','overflow':'auto'});
                newPost.replace(po);
                var h = 0;
                
                var itid = setInterval(function(){
                    h += 10;
                    if (h > _h) 
                        h = _h;
                    po.setStyle({
                        'height': h + 'px'
                    });
                    if (h >= _h) {
                        clearInterval(itid);
                        po.setStyle({
                            'height': ''
                        });
                    }
                }, 40);
                //var html = json.data.view + listCtner.innerHTML;
                ///listCtner.innerHTML = html;
                //listCtner.insert({'top':newPost});
                Comment.bindEventByElement(po);
                Mini.Post._feedHover(po);
            }
            var img = po.down('img');
            if (img) {
                setTimeout(fn, 500);
            }
            else {
                fn();
            }
        }
    },
    
    add: function(fA){
        //if(!User.isLogin()){return needLogin();}
        if (fA.content.value.trim() == Mini.Post.defaultTxt) 
            fA.content.value = '';
        if (fA.content.value.trim() == "") {
            emptyContentAlert(fA.content);
            return;
        }
        var pars = "l=" + fA.l.value + "&content=" + encodeURIComponent(fA.content.value.trim()) +
        "&file=" +
        fA.file.value +
        "&s=" +
        (fA.s ? fA.s.value : '');
        
        if (fA.tag) {
            pars += "&tag=" + encodeURIComponent(fA.tag.value.trim());
        }
        //Mini.MsgBox.alert('发布失败，请稍后重试');
        //$('postsbmt').disabled = true;
        //$($('postsbmt').parentNode.parentNode).addClassName("button-nosub");
        
        new Ajax.Request(Mini.Post.addUrl, {
            method: 'post',
            parameters: pars,
            onComplete: function(response){
                //$('postsbmt').disabled = false;
                //$($('postsbmt').parentNode.parentNode).removeClassName("button-nosub");
                
                if (response.status == 200) {
                    eval("var json=" + response.responseText);
                    if (json) {
                        if (json.status == 1) {
                            fA.reset();
                            Mini.Post.Uploader.reset();
                            
                            //显示发布成功
                            var tarea = $(fA.content);
                            var tparent = $(tarea.parentNode);
                            var sucessEl = new Element('div', {
                                'className': 'success'
                            });
                            sucessEl.className = 'success';
                            //sucessEl = 
                            tarea.hide();
                            tparent = $(tparent);
                            tparent.insert(sucessEl);
                            sucessEl.show();
                            //var sucessEl = tparent.firstChild;
                            var op = 1.0;
                            var sItid = setInterval(function(){
                                sucessEl.setOpacity(op);
                                op = op - 0.1;
                                if (op <= 0) {
                                    clearInterval(sItid);
                                    sucessEl.remove();
                                    tarea.show();
                                }
                            }, 50);
                            
                            if (json.data.url) {
                                window.location.href = json.data.url;
                            }
                            else {
                            
                                //更新列表
                                if ((Mini.Post.type == 33 || Mini.Post.type == -1)) {
                                    Mini.Post.addToList(json);
                                }
                                else {
                                    setTimeout(function(){
                                        Mini.Post.feedMore(33);
                                    }, 500);
                                }
                                
                                //Mini.Post.feedMore(null,false);
                            }
                            Mini.Post.getLastMini();
                            
                        }
                        else {
                            Mini.MsgBox.alert(json.statusText);
                        }
                    }
                }
                else {
                    Mini.MsgBox.alert('发布失败，请稍后重试');
                }
            }
        });
        
    },
    del: function(eA, iB, iC, iD){
        //if(!User.isLogin()){return needLogin();}
        Mini.MsgBox.confirm("确认删除此篇微博?", function(){
            eA = $(eA);
            //var postCtner = eA.getParentElementByClassName("mblogPosts");
            
            var postCtner = eA.up("div.mblogPosts");
            postCtner = $(postCtner);
            if (typeof iD == 'undefined') 
                iD = 1;
            var pars = 'id=' + iB + "&u=" + iC + "&l=" + iD;
            
            new Ajax.Request(Mini.Post.delUrl, {
                method: 'get',
                parameters: pars,
                onComplete: function(response){
                    if (response.status == 200) {
                        eval("var json=" + response.responseText);
                        if (json) {
                            if (json.status == 1) {
                                if (json.data.url) {
                                    window.location.href = json.data.url;
                                }
                                else {
                                    if (postCtner) {
                                        var _h = postCtner.getHeight();
                                        postCtner.setStyle({
                                            'overflow': 'hidden'
                                        })
                                        var itid = setInterval(function(){
                                            _h = _h - 40;
                                            if (_h < 0) 
                                                _h = 0;
                                            postCtner.setStyle({
                                                'height': _h + 'px'
                                            });
                                            if (_h <= 0) {
                                                clearInterval(itid);
                                                postCtner.remove();
                                            }
                                        }, 100)
                                    }
                                    Mini.Post.delNum++;
                                }
                            }
                            else {
                                Mini.MsgBox.alert(json.statusText);
                            }
                        }
                    }
                    else {
                        Mini.MsgBox.alert("服务器异常错误，请稍后重试");
                    }
                }
            });
        });
    },
    addEntry: function(fA){
        if (fA.entrytitle.value.trim() == "") {
            emptyContentAlert(fA.entrytitle);
            return;
        }
        if (fA.entrycontent.value.trim() == "") {
            emptyContentAlert(fA.entrycontent);
            return;
        }
        var pars = "entrytitle=" + encodeURIComponent(encodeURIComponent(fA.entrytitle.value.trim())) + "&entrycontent=" + encodeURIComponent(encodeURIComponent(fA.entrycontent.value.trim())) +
        "&categoryId=" +
        fA.categoryId.value;
        
        fA.sbmtbtn.disabled = true;
        fA.sbmtbtn.innerHTML = "提交中..";
        
        new Ajax.Request(Mini.Post.addEntryUrl, {
            method: 'post',
            parameters: pars,
            onComplete: function(response){
                fA.sbmtbtn.disabled = false;
                fA.sbmtbtn.innerHTML = "发布博文";
                if (response.status == 200) {
                    eval("var json=" + response.responseText);
                    if (json) {
                        if (json.status == 1) {
                        
                            Mini.MsgBox.alert('发布成功', function(){
                                fA.reset();
                                Mini.Post.Tab.hideExtTab();
                                //更新列表
                                if ((Mini.Post.type == 1 || Mini.Post.type == -1)) {
                                    Mini.Post.addToList(json);
                                }
                            });
                        }
                        else {
                            Mini.MsgBox.alert(json.statusText);
                        }
                        
                    }
                    else {
                        Mini.MsgBox.alert('发布失败，请稍后重试.');
                    }
                    
                }
                else {
                    Mini.MsgBox.alert('发布失败，请稍后重试');
                }
            }
        });
    },
    shortcut: function(event, fn){
        if (event.ctrlKey && event.keyCode == Event.KEY_RETURN) {
            var el = Event.element(event);
            var frm = el.up('form');
            if (frm) {
                Mini.Post.add(frm, fn);
            }
        }
    },
    getLastMini: function(){
        var url = 'http://t.sohu.com/a/document/jsonlist.do?to=wg&st=0&sz=10';
        var vn = 'lastMini' + (new Date()).getTime();
        url += '&xpt=' + window._xpt + '&vn=lastMini=' + vn;
        new Groj(url, {
            variable: vn,
            charset: 'UTF-8',
            onSuccess: function(data){
                if (typeof data.status != 'undefined' && data.status == 1) {
                    if (data.mini.length > 0) {
                        var lastMini = data.mini[0];
                        var title = lastMini.ext.title;
                        title = Mini.Util.limitTxt(title, 30);
                        $('lastMiniContent').innerHTML = '：<a href="http://t.sohu.com/m/' + lastMini.ext.did + '" target="_blank">' + title + '</a>';
                        $('lastMiniTime').innerHTML = friendlyTime(lastMini.ext.createdat);
                    }
                }
            },
            onFailure: function(){
            }
        });
        
    }
}

Mini.Post.Uploader = {

    init: function(){
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
        Position.clone(this.eC, this.eD, {
            setLeft: true,
            setTop: true,
            setWidth: false,
            setHeight: false,
            offsetTop: 28,
            offsetLeft: -10
        });
    },
    
    upload: function(){
        if (!this._init) 
            this.init();
        this.eI.innerHTML = '';
        this.fA.submit();
        this.eC.hide();
        this.eJ.hide();
        
        this.eF.show();
        //this.eH.hide()
        //this.eD.show();
    
    },
    cbUploadImg: function(cbObj){
        if (!this._init) 
            return;
        if (cbObj && cbObj.img) {
            this.fB.file.value = cbObj.img;
            var s1 = cbObj.img.split(/[\[\]]/);
            var tburl = '';
            if (s1 && s1.length == 3) {
                tburl = s1[0];
                var ids = s1[1].split(/[,]/);
                if (ids.length >= 2) {
                    tburl += 1;
                }
                else {
                    tburl += 0;
                }
                tburl += s1[2];
            }
            else {
                var tburl = cbObj.img;
            }
            
            var filename = tburl.substring(tburl.lastIndexOf("/") + 1);
            if (filename.length > 15) {
                filename = filename.substring(0, 8) + '...' + filename.substring(filename.length - 3);
            }
            this.eG.innerHTML = filename;
            this.eF.hide();
            this.eC.hide();
            this.eJ.show();
            
            var img = new Element('img', {
                'src': tburl
            });
            this.eI.hide();
            this.eI.innerHTML = '';
            this.eI.insert(img);
            img.observe('load', function(){
                this.eI.show();
                //this.eH.show();
            }
.bind(this));
            
            if (this.fB.content && (this.fB.content.value.trim() == "" || this.fB.content.value.trim() == "分享图片")) {
                this.fB.content.value = "分享图片";
                Mini.Util.selectText(this.fB.content, 0, this.fB.content.value.length);
            }
            
        }
        else {
            if (cbObj && cbObj.msg) {
                var msg = cbObj.msg;
            }
            
            Mini.MsgBox.alert("上传失败，请检查图片格式或图片大小超过5M");
            this.reset();
        }
        
    },
    preview: function(){
        this.eD.show();
    },
    cancelPreview: function(){
        this.eD.hide();
    },
    cancel: function(){
        this.reset();
    },
    reset: function(){
        if (!this._init) 
            this.init();
        this.eC.show();
        this.eF.hide();
        this.eJ.hide();
        this.eE.value = "";
        this.fB.file.value = "";
        
        this.fA.reset();
        
        var domain = window.location.host;
        if (domain.indexOf('.sohu.com') != -1) {
            this.fA.d.value = domain.substring(0, domain.indexOf('.sohu.com'));
        }
        $('uploadFrame').src = '';
    }
    
}

Mini.Q = {
    getXpt: function(){
        return window._xpt;
    },
    wdtUrl: "http://q.sohu.com/user/",
    wdtService: "groups",
    wdtVarfix: "Q.user_" + this.wdtService,
    outputEle: null,
    maxNum: 0,
    
    getJsonName: function(){
        return 'Q.user_groups';
    },
    showGroup: function(max){
        this.outputEle = $('myGroups');
        if (!this.outputEle) 
            return;
        
        if (max) 
            this.maxNum = max;
        
        var userPassport = this.getXpt();
        
        var dataURL = this.wdtUrl + "!" + userPassport + "/" + this.wdtService + "!json";
        
        this.loadingData();
        new LinkFile(dataURL, {
            type: 'script',
            noCache: false,
            callBack: {
                variable: this.getJsonName(),
                onLoad: this.loadedData.bind(this),
                onFailure: this.noData.bind(this)
            }
        });
        
    },
    loadedData: function(){
        try {
        
            var data = eval("(" + this.getJsonName() + ")");
            if (data != null) {
                var str = '';
                
                if (data.length) {
                    var num = (this.maxNum <= 0) ? data.length : Math.min(data.length, this.maxNum);
                    str += '<ul class="friends">';
                    for (var i = 0; i < num; i++) {
                        var dataNow = data[i];
                        var ico = dataNow.ico;
                        var title = dataNow.title;
                        var url = dataNow.url;
                        var modifiedImg = this.getUpdateImg(dataNow.modified);
                        
                        str += '<li><a href="' + url + '" target="_blank">' + title + '</a>' + modifiedImg + '</li>';
                    }
                    str += '</ul>';
                    str += '<div class="more"><a href="http://blog.sohu.com/home/soGroup/groups.do" target="_blank">查看全部</a></div>';
                    this.outputEle.innerHTML = str;
                }
                else {
                    this.noData();
                }
                
            }
        } 
        catch (e) {
            this.noData();
        }
    },
    noData: function(){
        this.outputEle.innerHTML = '<p>你还没加入过任何圈子，去<a target="_blank" href="http://q.sohu.com">圈子</a>转转<p>';
    },
    loadingData: function(){
        this.outputEle.innerHTML = '正在读取数据...';
    },
    getUpdateImg: function(time){
        var str = '';
        var mofiLevel = 4;
        var mofiTitle = '好久没更新了，去顶顶支持一下';
        var now = new Date().getTime();
        var interval = now - time;
        if (interval < 0) 
            interval = 0;
        var minu = Math.floor(interval / (60 * 1000));
        var day = Math.floor(minu / (24 * 60));
        if (minu < 60) {
            mofiLevel = 1;
            mofiTitle = '刚刚更新，快去抢个沙发～';
        }
        else 
            if (day < 1) {
                mofiLevel = 2;
                mofiTitle = Math.floor(minu / 60) + '小时前更新，去看看有什么新帖子';
            }
            else 
                if (day < 7) {
                    mofiLevel = 3;
                    mofiTitle = day + '天前更新，去顶顶支持一下';
                }
        str = '<img class="news_info" title="' + mofiTitle + '" alt="' + mofiTitle + '" src="http://js4.pp.sohu.com.cn/ppp/blog/styles/images/ico_upn_' + mofiLevel + '.gif" align="absmiddle" />';
        return str;
    }
}

Mini.Post.Tab = {
    extTabsEl: null,
    layerCtner: null,
    init: function(){
        this.extTabsEl = $('extPostTabs');
        this.layerCtner = $('postTabLayers');
        this.defaultH = this.layerCtner.getHeight();
        this.layerCtner.setStyle({
            'height': (this.layerCtner.getHeight()) + 'px'
        });
        this.hasInit = true;
    },
    showTab: function(tabId){
        if (!this.hasInit) 
            this.init();
        if (this.currentTab == tabId) 
            return;
        
        var tab = $(tabId);
        if (!tab) 
            return;
        this._clearTabs();
        tab.show();
        var h = tab.getHeight();
        this.extTabsEl.setStyle({
            'top': (-h) + 'px'
        });
        this.showExtTab();
        this.currentTab = tabId;
    },
    _clearTabs: function(){
        $('entryTab').hide();
        $('extPostTabs').setStyle({
            'top': '-10000px'
        });
    },
    showExtTab: function(){
        if (!this.hasInit) 
            this.init();
        if (this.running) 
            return;
        var h = this.extTabsEl.getHeight();
        var t = -h;
        var itid = setInterval(function(){
            t = t + 40;
            if (t >= 0) 
                t = 0;
            this.extTabsEl.setStyle({
                'top': t + 'px'
            });
            if (h + t > this.layerCtner.getHeight()) {
                this.layerCtner.setStyle({
                    'height': (h + t) + 'px'
                });
            }
            if (t == 0) {
                clearInterval(itid);
                //$('addEntryLayer').setStyle({'top':'px'});
                this.running = false;
            }
        }
.bind(this), 20);
        this.running = true;
    },
    hideExtTab: function(){
        if (!this.hasInit) 
            this.init();
        if (this.running) 
            return;
        var h = this.extTabsEl.getHeight();
        var t = 0;
        var itid = setInterval(function(){
            t = t - 40;
            if (t < -h) 
                t = -h;
            this.extTabsEl.setStyle({
                'top': t + 'px'
            });
            if (h + t < this.layerCtner.getHeight()) {
                if (h + t < this.defaultH) {
                    this.layerCtner.setStyle({
                        'height': (this.defaultH) + 'px'
                    });
                }
                else {
                    this.layerCtner.setStyle({
                        'height': (h + t) + 'px'
                    });
                }
            }
            if (t == -h) {
                clearInterval(itid);
                //$('addEntryLayer').setStyle({'top':'px'});
                this._clearTabs();
                this.running = false;
            }
        }
.bind(this), 20);
        this.running = true;
        this.currentTab = null;
        
    }
}

Refer = Object.extend(Refer, {
    requestRefers: function(ids){
        var url = '/frag/resentVisitor_new.jsp?u=' + Blog.getDomain() + '&ids=' + ids;
        new Ajax.Request(url, {
            onSuccess: this.gotRefers.bind(this),
            onFailure: this.noGotRefers.bind(this)
        });
    },
    gotRefers: function(transport){
        if (transport.responseText.length > 0) {
            this.ctrJ.html(transport.responseText);
            setTimeout(this.addTime.bind(this), 0);
        }
        else 
            this.noGotRefers();
    },
    addTime: function(){
        if (!(typeof(referidtime) == "string" && referidtime.length > 0)) 
            return;
        if (this.ctrJ.length == 0 || !this.ctrJ.eles[0]) 
            return;
        var brs = this.ctrJ.eles[0].getElementsByTagName('li'), times = referidtime.split(',');
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
})

function homeMessageCenter(){
    var hmcInt = setInterval(function(){
        var requestVn = ToolBar.configs.requestVn;
        if (window[requestVn]) {
            clearInterval(hmcInt);
            var json;
            if ((json = window[requestVn]) && json.status == 0 && (json = json.data)) {
                var confs = ['requestCount', 'noticeCount', 'messageCount', 'notice1Count', 'notice3Count', 'notice4Count', 'notice8Count', 'notice9Count', 'request5Count', 'request6Count', 'notice10Count'];
                var data = [];
                for (var i = 0, il = confs.length; i < il; i++) {
                    data.push(json[confs[i]]);
                }
                //var confNames = ['请求', '通知', '系统消息', '留言评论', '圈子通知', '好友通知', '分享通知', '招呼', '好友请求', '圈子请求','博客活动'];
                
                var friendReq = parseInt(data[8]);
                var qReq = parseInt(data[9]);
                var blogMsg = parseInt(data[3]);
                
                if ($('msgCenterFriend')) {
                    if (friendReq != 0) {
                        $('msgCenterFriend').innerHTML = '<a href="http://blog.sohu.com/home/soRequest/request.do?m=listfriend" target="_blank">' + friendReq + '条</a>';
                    }
                    else {
                        $('msgCenterFriend').innerHTML = '<b class="grey">0条</b>';
                    }
                }
                if ($('msgCenterQ')) {
                    if (qReq != 0) {
                        $('msgCenterQ').innerHTML = '<a href="http://blog.sohu.com/home/soRequest/request.do?m=listgroup" target="_blank">' + qReq + '条</a>';
                    }
                    else {
                        $('msgCenterQ').innerHTML = '<b class="grey">0条</b>';
                    }
                }
                if ($('msgCenterBlog')) {
                    if (blogMsg != 0) {
                        $('msgCenterBlog').innerHTML = '<a href="http://blog.sohu.com/home/soRequest/inform.do?type=1" target="_blank">' + blogMsg + '条</a>';
                    }
                    else {
                        $('msgCenterBlog').innerHTML = '<b class="grey">0条</b>';
                    }
                }
            }
        }
    }, 2000);
    
    //获取微博@数
    var dataURL = 'http://t.sohu.com/a/user/get?auth=abc&passport=' + b64_decodex(window._xpt);
    var vn = 'miniBaseInfo' + (new Date()).getTime();
    dataURL += '&vn=' + vn;
    new LinkFile(dataURL, {
        type: 'script',
        charset: 'utf-8',
        noCache: false,
        callBack: {
            variable: vn,
            onLoad: function(){
                if (window[vn]) {
                    var data = window[vn].new_ated;
                    if (data && data != 0) {
                        $('msgCenterMini').innerHTML = '<a href="http://t.sohu.com/t/at.jsp" target="_blank">' + data + '条</a>';
                    }
                    else {
                        $('msgCenterMini').innerHTML = '<b class="grey">0条</b>';
                    }
                }
            },
            onFailure: function(){
            }
        }
    });
}
