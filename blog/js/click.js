if (!(typeof CA != 'undefined' && CA)) {
	var CA = {
		init: function() {
			var img = document.createElement('img');
			img.id = 'caImg';
			img.style.display = 'none';
			if (document.body) {
				document.body.appendChild(img);
			}
		},
		init2: function() {
			var str = '<img id="caImg" style="display:none;" />';
			document.write(str);
		},
		q: function(from) {
			if (!document.getElementById('caImg')) { return; }
			
			var arr = [];
			
			// time stamp
			arr.push('t='+ (new Date()).getTime());
			
			// referrer
			if (document.referrer) {
				arr.push('r='+ encodeURIComponent(document.referrer));
			}
			
			// passport
			/*if (ToolBar.isPPLogin()) {
				arr.push('xpt='+ encodeURIComponent(ToolBar.getXP()));
			}*/
			
			// from which link(string id)
			if (from) {
				arr.push('from='+ from);
			}
			
			
			var url = 'http://bgt.blog.sohu.com/blogclick.gif?'+ arr.join('&');
			document.getElementById('caImg').src = url;
		},
		
		a: function(from) {
			if (!this.d) {
				var d = document.domain.toLowerCase().split('.'),
						dl = d.length,
						s = '';
				if ((dl>1) && ((s=d[dl-2])=='sohu') && 	//	if this site is sohu, then go to the second domain
						(dl>2) && ((s=d[dl-3])=='blog') && 	//	if it is sohu blog, then check the third domain is the v.blog
						(dl>3) && (d[dl-4]=='v')) {
					s='v';
				}
				this.d = s+'_';
			}
			this.q(this.d+from);
		}
	};
	if (typeof noClickAna == 'undefined' || !noClickAna) {
		//Event.observe(window, 'load', CA.init.bind(CA),false);
		CA.init2();
	}
}
