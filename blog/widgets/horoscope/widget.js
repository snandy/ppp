/******* Hello World Widget **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2006-03-08
//	Last Update: 2006-03-08
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/

var horoscope = function(m_data, m_content, m_edit){
	var request_horoscope;
	var elmOutput;
	var defaultAstro = 9;
	var astros = {
		1:'白羊座',
		2:'金牛座',
		3:'双子座',
		4:'巨蟹座',
		5:'狮子座',
		6:'处女座',
		7:'天秤座',
		8:'天蝎座',
		9:'射手座',
		10:'摩羯座',
		11:'水瓶座',
		12:'双鱼座'
	};
	var chineseNums = ["一",
	    "二",
	    "三",
	    "四",
	    "五",
	    "六",
	    "七",
	    "八",
	    "九",
	    "十"];
	if (m_data) {
		var astro = m_data.astro || defaultAstro;
	}
	else {
		var astro = defaultAstro;
	};

	this.initialize = function() {
		this.build();
		this.updateData();
	};
	this.destroy = function() {
		request_horoscope = null;
		Element.remove(elmOutput);
	};

	this.refresh = function() {
		this.updateData(true);
	};
	
	this.edit = function() {
		this.buildEdit();
	};

	this.build = function() {
		elmOutput = document.createElement('div');
		elmOutput.innerHTML = App.Lang.loading;
		
		m_content.appendChild(elmOutput);

		var now = new Date();
		this.setTitle(this.getMonth(now.getMonth()) + '月' + this.getDay(now.getDate()) + '日' + '星座运势');
		
	};
	this.buildEdit = function() {

		m_edit.innerHTML = '';
		elmOutputE = document.createElement('div');
		
		var str = '';
		str += '<table border="0" cellpadding="2" cellspacing="0"><tr>';
		str += '<td width="80px">您的星座: </td>';
		str += '<td><select name="astro">'+ this.getAstroList() +'</select></td>';
		str += '</tr><tr>';
		str += '<td>&nbsp;</td>';
		str += '<td><input type="submit" value="'+ App.Lang.save +'" class="button-submit" /></td>';
		str += '</tr></table>';
		elmOutputE.innerHTML = str;
		
		m_edit.appendChild(elmOutputE);
		this.astroIpt = elmOutputE.firstChild.rows[0].cells[1].firstChild;
		this.saveBtn = elmOutputE.firstChild.rows[1].cells[1].firstChild;
		this.eventSaveData = this.saveData.bindAsEventListener(this);
		Event.observe(this.saveBtn, 'click', this.eventSaveData);
	};

	this.getAstroList = function() {
		var str = '';
		$H(astros).each(function(f, i){
			if (f.key == astro) {
				str += '<option value="'+ f.key +'" selected>'+ f.value +'</option>';
			} else {
				str += '<option value="'+ f.key +'">'+ f.value +'</option>';
			}
		});
		return str;
	};
	this.updateData = function(noCache) {
		elmOutput.innerHTML = App.Lang.loadModuleData;
		
		var options = {
			nocache: noCache,
			onComplete: this.showContent.bind(this)
		};
		var horoUrl = '/inc/horo/horo_'+ astro + '.html';
		request_horoscope = new App.ImpFile(horoUrl, options);
	};
	this.saveData = function() {
		this.saveBtn.disabled = 'disabled';
		astro = $F(this.astroIpt) || astro || defaultAstro;
		var data = new Object();
		data.astro = astro;
		this.save(data);
		setTimeout(this.updateData.bind(this), 10);
		// Element.remove(this.saveBtn.nextSibling);
		this.saveBtn.disabled = '';

	};
	this.showContent = function(request_horoscope) {
		this.loaded();
		if (request_horoscope.responseText == '') {
			this.setTitle(App.Lang.error);
			elmOutput.innerHTML = App.Lang.analyseFileError;
			return;
		}
		var str = request_horoscope.responseText;
        str += '<div class="more"><a href="http://astro.women.sohu.com/" target="_blank">查看更多</a></div>';
        elmOutput.innerHTML = str;
	};
	this.getMonth = function(month){
		var str = '';
                var tmp = Math.floor(month / 10);
                if(tmp > 0){
                        if(tmp > 1) str += chineseNums[tmp];
                        str += chineseNums[9];
                }
                tmp = month % 10;
                if(tmp >= 0){
                        str += chineseNums[tmp];
                }
                return str;
	}
	this.getDay = function(day){
		var str = '';
                var tmp = Math.floor(day / 10);
                if(tmp > 0){
                        if(tmp > 1) str += chineseNums[tmp - 1];
                        str += chineseNums[9];
                }
                tmp = day % 10 - 1;
                if(tmp >= 0){
                        str += chineseNums[tmp];
                }
                return str;
	}
};
registerWidget('horoscope');
