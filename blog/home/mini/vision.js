/**
 * 视觉相关
 * 
 * @author junchen626
 */
if (!Mini)
	var Mini = {};
Mini.Vision = {
	// 滑动删除
	slideRemove : function(el, options) {
		options = Object.extend({
					step : 10,
					interval : 100,
					type:'remove'
				}, options || {})

		var _h = el.getHeight();
		var padding = 0;
		padding = parseInt(el.getStyle('padding-top'))+parseInt(el.getStyle('padding-bottom'));
		if(isNaN(padding))padding = 0;
		_h -= padding;
		el.setStyle({
					'overflow' : 'hidden'
				})
		var itvid = setInterval(function() {
					_h = _h - options.step;
					if (_h < 0)
						_h = 0;
					el.setStyle({
								'height' : _h + 'px'
							});
					if (_h <= 0) {
						clearInterval(itvid);
						if(options.type == 'remove'){
							el.remove();
						}else{
							el.hide();
						}
					}
				}, options.interval)
	},
	// 滑动显示
	slideShow : function(el,options) {
		options = Object.extend({
					step : 10,
					interval : 100,
					type:'remove'
				}, options || {})
		var parentEl = el.parentNode;
		if(!parentEl)return;
		parentEl = $(parentEl);
		
		var tmpEl = new Element('div',{'height':'0px','overflow':'hidden'});
		parentEl.insert(tmpEl);
		tmpEl.insert();
		//TODO;
	},
	marqueeTitle:function(str,options){
		Mini.Vision.marqueeTitle.backup = document.title;
		if(typeof Mini.Vision.marqueeTitle.itId != 'undefined')
			clearInterval(Mini.Vision.marqueeTitle.itId);
		options = Object.extend({
			interval:200
		},options||{})
		var len = str.length;
		offset = 0;
		Mini.Vision.marqueeTitle.itId = setInterval(function(){
			var title = str.substring(offset)+str.substring(0,offset);
			document.title = title;
			offset++;
			if(offset>=len)offset = 0;
		},options.interval);
	},
	marqueeTitleClear:function(){
		if(typeof Mini.Vision.marqueeTitle.backup != 'undefined')
			document.title = Mini.Vision.marqueeTitle.backup;
		if(typeof Mini.Vision.marqueeTitle.itId != 'undefined')
			clearInterval(Mini.Vision.marqueeTitle.itId);
	},
	NumberVision : {
		up : function(iA, iB, eC) {
			if (iA >= iB)
				return;
			var diff = iB - iA;
			var tt = 2000;
			var step = 1;
			var sec = tt * step / diff;
			if (sec < 50) {
				step = parseInt(diff * 50 / tt);
				sec = tt * step / diff;
			}
			if (sec > 50)
				sec = 50;

			var i = 0;
			var itId = setInterval(function() {
						i += step;
						if (i > diff)
							i = diff;
						eC.innerHTML = iA + i;
						if (i >= diff)
							clearInterval(itId);
					}, sec)
		}
	}
}