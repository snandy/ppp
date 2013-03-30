/**
 * @snandy 2012
 */
(function($, window, document) {

	// ie6使用绝对定位居中，其它浏览器使用固定定位
	var count,
		dialog,
		$h3,
		top,
		url,
		isohu,
		countUrl,
		wHeight,
		getViewSize,
		isReq = false,
		isShow = false,
		$win = $(window),
		$doc = $(document),
		jsonp = '?callback=?',
		ie6 = $.browser.version == '6.0';

	// isblanked 是后台写在页面上得全局变量，如果为false则表示是非推荐博客，true为推荐博客
//	if (typeof isblanked == 'undefined' || !isblanked) {
//		return;
//	}
	
	$h3 = $('#entrycommentlist h3').first();
	top = $h3.offset().top;

	getViewSize = function() {
		return {
			w: $win.width(),
			h: $win.height()
		};
	};
	wHeight = getViewSize().h;


	countUrl = 'http://i.sohu.com/a/blog/home/follow.htm' + jsonp;
	url      = 'http://i.sohu.com/a/app/friend/get/friend/relation.do?cb=?';
	isohu    = typeof showurl != 'undefined' ? showurl : 'http://i.sohu.com';

	// 统计接口 弹窗:0 确定:1；关闭:2；知道了:3；去个人中心:4；去个人展示:5；点击确定后已跟随:6；点击确定:7
	count = function(s) {
		$.getJSON(countUrl, {status: s});
	};

	dialog = function() {
		var viewSize = getViewSize();

		var $el = $(
			'<div class="poping-blog-follow">' +
			'<div class="poping-blog-follow-wrapper">' +
				'<div class="bf-header">' +
					'<a href="javascript://" class="btn-close"></a>' +
					'<p>一亿人当中你遇见了我...</p>' +
				'</div>' +
				'<div class="bf-body">' +
					'<div class="img">' +
						'<a target="_blank" href="' + isohu + '"></a>' +
					'</div>' +
					'<div class="txt"></div>' +
				'</div>' +
				'<div class="bf-recommend">' +
					'<h4>博主推荐的人：<label><input type="checkbox">同时跟随博主推荐的所有人</label></h4>' +
					'<div class="pho-recommend"><ul></ul></div>' +
				'</div>' +
				'<div class="bf-btn">' +
					'<a href="javascript://;" class="btn-enter btn-enter-hover"></a>' +
				'</div>'+
			'</div></div>'
		);

		var $shadow = $(
				'<div class="poping-mask"></div>'
			).width(viewSize.w).height(viewSize.h);

		var fill = function() {
			var url = typeof hidimg != 'undefined' ? hidimg : '';
			var str = '<img src="' + url + '" data-card="true" data-card-action="xpt=' + _upt + '">';
			var addRecommendUrl = 'http://i.sohu.com/a/app/friend/recommend/add.do?cb=?';
			var recommendUrl = 'http://i.sohu.com/a/app/friend/recommend/list/' + _upt + '/?cb=?';

			$el.find('.img a').html(str);
			$el.find('.txt').html(
				'<p class="tt">' +
					'嗨，我是 ' + 
					'<a href="' + isohu + '" target="_blank" data-card="true" data-card-action="xpt=' + _upt + '">' + 
						(nick||"") + 
					'</a>' +
				'</p>' +
				'<p class="con">如果想第一时间阅读我的最新博文，那就快来跟随我吧！</p>'
			);

			// 推荐博友
			$.getJSON(recommendUrl, function(json) {

				if (json.code!=0 || json.data.viewRecommends.length==0) return;

				var $div = $el.find('.bf-recommend');
				var $ul = $div.find('ul');

				$(json.data.viewRecommends).each(function(i, p){
					// console.log(p);
					var img = '<img src="' + p.icon + '" data-card="true" data-card-action="xpt=' + p.xpt + '">'
					$ul.append(
						'<li data-xpt="' + p.xpt + '" title="' + p.nick + '">' +
							'<i class="icon-select"></i><a href="javascript://;">' + img + '</a>' +
						'</li>' 
					);
				});

				$div.delegate('li', 'click', function() {
						$('i', this).toggle();
					})
					.delegate('input', 'click', function() {
						if (this.checked) {
							$div.find('i').show();
						} else {
							$div.find('i').hide();
						}
					})
					.show();

				// 默认选中所有推荐人
				$div.find('input').click();
				$div.find('i').show();

			});	
		};

		var bind = function() {
			$el
				.delegate('div.img a, p.tt a', 'click', function() {
					count(5);
				})
				.delegate('a.close, a.btn-geren', 'click', function() {
					dialog.close();
					if ($(this).hasClass('btn-close')) {
						count(2);

					} else if($(this).hasClass('close')) {
						count(3);

					} else if($(this).hasClass('btn-geren')) {
						count(4);
					}
				})
				.delegate('.btn-enter', 'click', function(evt) {
					// IE6 bug
					evt.preventDefault();
					count(7);
					var $btnClose = $el.find('.btn-close');
					$btnClose.unbind('click', closeHander1);
					$btnClose.click(closeHander2);

					if (isPPLogin()) {
						follow();
					} else {
						login();
					}
				});

				$el.find('.btn-close').click(closeHander1);
		};

		// handers
		function resizeHandler() {
			var size = getViewSize();
			dialog.moveCenter();
			$shadow.width(size.w).height(size.h);
		}
		function scrollHandler() {
			dialog.moveCenter();
		}
		function closeHander1() {
			dialog.close();
			count(2);
		}
		function closeHander2() {
			dialog.close();
			count(3);
		}

		return {
			el: $el,
			open: function() {
				fill();
				bind();
				document.body.appendChild($shadow[0]);
				document.body.appendChild($el[0]);
				this.moveCenter();
				if (ie6) {
					$win.scroll(scrollHandler);
				}
				$win.resize(resizeHandler);
			},
			close: function() {
				document.body.removeChild($shadow[0]);
				document.body.removeChild($el[0]);
				if (ie6) {
					$win.unbind('scroll', scrollHandler);
				}
				$win.unbind('resize', resizeHandler);
			},
			success: function(status) {
				var str = '';
				if (status == 1) {
					str = '跟随成功';
					count(1);
				}
				if (status == -2) {
					str = '已跟随过';
					count(6);
				}

				$el.find('.bf-recommend').hide();

				$el.find('.txt').html(
					'<p class="success">' + str + '！你可以在个人中心里看到我的各种新鲜事了。</p>'
				);
				$el.find('.bf-btn').html(
					'<a target="_blank" href="http://i.sohu.com/blog/home/entry/index.htm" class="btn-geren"></a>' +
					'<a href="javascript://" class="close">我知道了</a>'
				);
			},
			moveCenter: function() {
				var size = getViewSize();
				var el = $el[0];
				var x = (size.w-50)/2 - (el.clientWidth-50)/2;
				var y = (size.h- 50)/2 - (el.clientHeight-50)/2;
				if (ie6) {
					el.style.position = 'absolute';
					y = (size.h- 50)/2 - (el.clientHeight-50)/2 + document.documentElement.scrollTop;
				}
				el.style.left = x + 'px';
				el.style.top = y + 'px';
			}
		};

	}();


	// 跟随接口
	function follow() {
		var singleUrl = 'http://i.sohu.com/a/app/friend/friend/add.do' + jsonp,
			batUrl = 'http://i.sohu.com/a/app/friend/addattentions?cb=?',
			xpts = dialog.el
				.find('.pho-recommend li')
				.map(function(){
					if ($('i', this).css('display') != 'none') {
						return this.getAttribute('data-xpt');
					}
				})
				.get()
				.join(',');
		 
		$.getJSON(
			singleUrl, 
			{
				xpt: _upt, 
				from_type: 'blog_rec_flow'
			}, 
			function(result) {
		 		dialog.success(result.code)
			}
		);

		if (xpts) {
			$.getJSON(
				batUrl, 
				{
					userid: xpts,
					from_type: 'blog_recommend'
				}
			);
		}

	}

	function login() {
		if (!$.ppDialog) {
			return;
		}
		$.ppDialog({
			appId: '1001',
			regRedirectUrl: location.href,
			title: '想要查看更多精彩内容，马上登录吧！',
			onLogin: function(userId) {
				if (isOwnBlog()) {
					dialog.close();
					return;
				}
				follow();
				isShow = true;
//				$.getJSON(url, {xpts: _upt}, function(result) {
//					var code = result.code;
//					follow();
//					if (!result.data.friendList.length) {
//						follow();
//					} else {
//						dialog.success(-2);
//					}
//				});
				
			}
		});
	}

	function openDlg() {
		dialog.open();
		// 弹框统计
		count(0);
		isShow = true;

		function initCard() {
			new $.iCard({
				bindElement : dialog.el,
				params : {product: 'def'}
			});
		}

		setTimeout(initCard, 1000);
	}

	function scrollHandler() {
		if (isShow || isReq) {
			$win.unbind('scroll', scrollHandler);
			return;
		}
		
		var sTop = $doc.scrollTop();

		// 滚动到页面“评论”下125px左右弹窗
		if (top-sTop+125 < wHeight) {
			if (isPPLogin()) {
				if (!isOwnBlog()) {
					$.getJSON(url, {xpts: _upt}, function(rs) {
						if (!rs.data.friendList.length) {
							openDlg();
						}
					});
					isReq = true;
				}

			} else {
				openDlg();
			}
		}
	}

	$win.scroll(scrollHandler);
	jQuery.followDlg = dialog;

})(jQuery, window, document);