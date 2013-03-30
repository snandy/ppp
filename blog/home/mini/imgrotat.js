var ImgRotat = Class.create({
    initialize: function(myid) {
        
        this.id = myid;       //图片旋转对象的区分id，传入的参数
        this.flag = 0;        //旋转起始位置，1向右转90度，2转180度，3向右转270度。
        this.createBigImgArea();
        var tmp = "imgSmallDiv"+this.id;
        //this.imgSmallDiv = $(tmp);     //小图的包装div
        this.imgBigDiv = $('imgBigDiv'+this.id);     //大图的包装div
        this.imgSmallObj = $('imgSmallId'+this.id);   //小图
        this.imgBigObj = $('imgBigId'+this.id);       //大图
        this.cavnsObj = $('cavId'+this.id);           //cavns对象（非ie浏览器用到）
        this.inputObj = $('imgBigSrc'+this.id);       //存放大图url的input域
        this.inputOrgObj = $('imgOrgSrc'+this.id);       //存放原始图url的input域
        this.direction = 'r';           //旋转方向（r向右，l向左）
        this.imgLoading = $('imgLoading'+this.id);       //loding图层
        this.imgBigInnerDiv = $('imgBigInnerDiv'+this.id);       //内部包装层（与loading切换）
        this.loadFlag = true;       //下载图片标志，true需要下载 false不用下载
    },
    showThispic:function(){
        if (Prototype.Browser.IE) {
            this.imgBigInnerDiv.style.display = 'block';
            this.cavnsObj.hide();               
            this.resizeBigImgWidth();   
            this.imgBigObj.show();
            this.imgLoading.hide();
            this.imgBigInnerDiv.setStyle({height:'auto','line-height': '20px',padding:'5px 10px 6px'}); 
           // this.imgBigInnerDiv.show();
        }else{
            var ctx = this.cavnsObj.getContext('2d');       
            this.cavnsObj.setAttribute('width',this.imgBigObj.width);
            this.cavnsObj.setAttribute('height',this.imgBigObj.height);
            this.resizecavnsWidth();
            ctx.drawImage(this.imgBigObj,0,0);
            this.imgBigObj.hide();
            this.imgLoading.hide();
            this.imgBigInnerDiv.setStyle({height:'auto','line-height': '20px',padding:'5px 10px 6px'}); 
            this.cavnsObj.show();
        }
            
    },
    showBig:function(){//显示大图方法        
        if(!$('imgBigDiv'+this.id)){//页面元素改变，生成的大图消失
            this.initialize(this.id);
        }
            
        //this.imgSmallDiv.hide();
        this.imgSmallObj.hide();
        this.imgBigDiv.show();
        this.imgBigInnerDiv.setStyle({height: '0',overflow: 'hidden','line-height': '0',padding:'0'}); 
        this.imgLoading.show();
        if(this.loadFlag){          
            this.imgBigObj.onload = function(){
                this.loadFlag = false;  
                this.showThispic();
            }.bind(this);
            this.imgBigObj.setAttribute('src',this.inputObj.value);
        }else{
            this.showThispic();
        }
        
    },
    showSmall:function(){//显示小图方法
        //this.imgSmallDiv.show();
        this.imgSmallObj.show();
        this.imgBigDiv.hide();
    },
    rotat: function(dir){//旋转图片方法
        this.direction = dir;
        if(this.direction == 'r'){
            this.flag ++;
        }else if(this.direction == 'l'){
            this.flag --;
        }
        if(this.flag >3){
            this.flag = 0;
        }else if(this.flag<0){
            this.flag = this.flag +4;
        }
        
        if(Prototype.Browser.IE){
            this.imgBigObj.style.filter ='progid:DXImageTransform.Microsoft.BasicImage(Rotation=' + this.flag +')'
        }else{
            var ctx = this.cavnsObj.getContext('2d');
            switch (this.flag){
                case 0:
                    this.cavnsObj.setAttribute('width',this.imgBigObj.width);
                    this.cavnsObj.setAttribute('height',this.imgBigObj.height);
                    this.resizecavnsWidth();
                    ctx.drawImage(this.imgBigObj,0,0);
                    break;
                case 1:
                    this.cavnsObj.setAttribute('width',this.imgBigObj.height);
                    this.cavnsObj.setAttribute('height',this.imgBigObj.width);
                    ctx.rotate(90*Math.PI/180);
                    this.resizecavnsWidth();
                    ctx.drawImage(this.imgBigObj,0,-this.imgBigObj.height);
                    break;
                case 2:
                    this.cavnsObj.setAttribute('width',this.imgBigObj.width);
                    this.cavnsObj.setAttribute('height',this.imgBigObj.height);
                    ctx.rotate(180*Math.PI/180);
                    this.resizecavnsWidth();
                    ctx.drawImage(this.imgBigObj,-this.imgBigObj.width,-this.imgBigObj.height);
                    break;
                case 3:
                    this.cavnsObj.setAttribute('width',this.imgBigObj.height);
                    this.cavnsObj.setAttribute('height',this.imgBigObj.width);
                    ctx.rotate(270*Math.PI/180);
                    this.resizecavnsWidth();
                    ctx.drawImage(this.imgBigObj,-this.imgBigObj.width,0);
                    break;
            }
            this.imgBigObj.hide();
            this.cavnsObj.show();
        }
    },
    resizeBigImgWidth:function(){
        var tmph = this.imgBigObj.offsetHeight;
        var tmpw = this.imgBigObj.offsetWidth;
        var maxW = 420
        if(tmph>maxW && tmpw>maxW){
            if(tmph>tmpw){
                this.imgBigObj.height = ''+maxW;
            }else{
                this.imgBigObj.width = ''+maxW;   
            }
        }else{
            if(tmph>maxW){
                this.imgBigObj.height = ''+maxW;
               // this.imgBigObj.width = tmpw * 580 / tmph;
            }
            if(tmpw>maxW){
                this.imgBigObj.width = ''+maxW;
               // this.imgBigObj.hiehgt = tmph * 580 / tmpw;
            }   
        }
        
    },
    resizecavnsWidth:function(){
    	var maxW = 420
        if(this.cavnsObj.width>maxW){
            this.cavnsObj.setAttribute('class','canArea width580');
        }else{
            this.cavnsObj.setAttribute('class','canArea');  
        }
    },
    createBigImgArea:function(){
        var origalSrc = $('imgOrgSrc'+this.id).value;
        var tmpBig = document.createElement("div");
        tmpBig.setAttribute("id","imgBigDiv"+this.id);
        //tmpBig.setAttribute("class","imgArea");  //这样不行
        tmpBig.className = "imgArea"; 
        
        var myid = this.id;
        var tmpHTML = "<div id=imgLoading"+myid+" class=loadingImg></div><div id=imgBigInnerDiv"+myid+" class=imgAreaInner><div class=btn><span class=btnTurn><a target=_blank href="+origalSrc+"><span class='icon i-imgShoworgal'></span>查看原图</span></a><span class=split>|</span><span class=btnTurn onClick=ImgRotat.rotat('l','"+myid+"');><span class='icon i-imgTurnLeft'></span>向左旋转</span><span class=split>|</span><span class=btnTurn onClick=ImgRotat.rotat('r','"+myid+"');><span class='icon i-imgTurnRight'></span>向右旋转</span></div><canvas id=cavId"+myid+" class=canArea onclick=ImgRotat.showSmall('"+myid+"')></canvas><img src='' id=imgBigId"+myid+" class=smallShow onclick=ImgRotat.showSmall('"+myid+"')></div><i class=lt></i><i class=rt></i><i class=lb></i><i class=rb></i>";
        tmpBig.innerHTML = tmpHTML;
        $('imgSmallDiv'+myid).insert(tmpBig);
    }
});

ImgRotat.config = {};   //所有图片对象

ImgRotat.showBig = function(myid) {
    if(!ImgRotat.config[myid]){
        ImgRotat.config[myid] = new ImgRotat(myid); 
    }   
    ImgRotat.config[myid].showBig();
}
ImgRotat.showSmall = function(myid) {
    ImgRotat.config[myid].showSmall();
}
ImgRotat.rotat = function(dir,myid) {
    ImgRotat.config[myid].rotat(dir);
}
