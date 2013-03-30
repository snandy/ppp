function lsl(f, k) {
	if (!f) {
		return
	}
	k = k || {};
	var h = document.getElementsByTagName("script");
	for (var c = 0; c < f.length; c++) {
		var a = f[c];
		var d = false;
		for (var b = 0; b < h.length; b++) {
			var e = h[b].getAttribute("src");
			if (e && e == a) {
				d = true;
				break
			}
		}
		if (!d) {
			var g = (k.charset) ? ' charset="' + k.charset + '"' : "";
			document.write('<script type="text/javascript" src="' + a + '" '
					+ g + "><\/script>")
		}
	}
}
function outEvent(a, c) {
	var b = function(e) {
		e = e ? e : (window.event ? window.event : null);
		var j = e.srcElement ? e.srcElement : e.target;
		var d = j;
		var g = true;
		var k = $("pagePop");
		while (d != document.body) {
			for (var h = 0; h < this.length; h++) {
				if (d == this[h]) {
					g = false;
					break
				} else {
					if (d == k) {
						g = false;
						break
					}
				}
			}
			if (!g) {
				break
			}
			d = d.parentNode;
			if (!d) {
				break
			}
		}
		if (g) {
			var f = c();
			if (f) {
				Event.stopObserving(document.body, "click", b)
			}
		}
	}.bind(a);
	Event.observe(document.body, "click", b)
}
function emptyContentAlert(a) {
	var b = [255, 200, 200];
	a.style.backgroundColor = "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")";
	var c = setInterval(function() {
				b[1] += 10;
				b[2] += 10;
				if (b[1] > 255) {
					clearInterval(c)
				}
				a.style.backgroundColor = "rgb(" + b[0] + "," + b[1] + ","
						+ b[2] + ")"
			}, 100)
}
var friendlyTime = function(f) {
	var d = new Date();
	var c = d.getTime() - f;
	var e = Math.floor(c / (60 * 1000));
	var a = Math.floor(e / 60);
	var b = Math.floor(a / 24);
	var g = "";
	if (b >= 1) {
		g += b;
		g += "天"
	} else {
		if (a < 48 && a > 0 && (a % 24) > 0) {
			g += a % 24;
			g += "小时"
		} else {
			if (a <= 0 && (e % 60 <= 2)) {
				return "刚刚"
			}
			if (a < 24) {
				g += e % 60;
				g += "分钟"
			}
		}
	}
	g += "前";
	return g
};
function needLoginAlert(b) {
	var a = b || "未登录，无法执行此操作！";
	Mini.MsgBox.alert(a, function() {
				if (ToolBar) {
					setTimeout(ToolBar.needLogin, 300)
				}
			})
}
function deRep(a) {
	return a.replace(/-/g, "+").replace(/_/g, "/")
}
function clearText(a) {
	if (typeof a != "string") {
		return a
	}
	return a.replace(/</ig, "&lt;").replace(/>/ig, "&gt;").replace(/"/ig,
			"&quot;").replace(/'/ig, "&apos;")
}
function clearInput(c, a, b) {
	var c = $(c);
	if (!a || c.value.trim() == a) {
		c.value = "";
		if (b && typeof b == "function") {
			b()
		}
	}
}
function restoreInput(c, a, b) {
	var c = $(c);
	if (a && c.value.trim() == "") {
		c.value = a;
		if (b && typeof b == "function") {
			b()
		}
	}
}
if (typeof(HTMLElement) != "undefined" && !window.opera) {
	HTMLElement.prototype.__defineGetter__("outerHTML", function() {
				var b = this.attributes, d = "<" + this.tagName, c = 0;
				for (; c < b.length; c++) {
					if (b[c].specified) {
						d += " " + b[c].name + '="' + b[c].value + '"'
					}
				}
				if (!this.canHaveChildren) {
					return d + " />"
				}
				return d + ">" + this.innerHTML + "</" + this.tagName + ">"
			});
	HTMLElement.prototype.__defineSetter__("outerHTML", function(a) {
				var b = this.ownerDocument.createRange();
				b.setStartBefore(this);
				var c = b.createContextualFragment(a);
				this.parentNode.replaceChild(c, this);
				return a
			});
	HTMLElement.prototype.__defineGetter__("canHaveChildren", function() {
		return !/^(area|base|basefont|col|frame|hr|img|br|input|isindex|link|meta|param)$/
				.test(this.tagName.toLowerCase())
	})
};