/**
 * Rss 操作类
 * @author Jady
 * 
 * @base prototype Groj Time
 **/
 
var Rss = Class.create();

Object.extend(Rss.prototype, {
	
	/**
	 * 初始化方法，
	 */
	initialize: function(url) {
		this.url = url;
		
		this.entries = null;
		this.info = null;
	},
	
	domain: 'http://reader.mail.sohu.com/blogwidget/',
	infoUrl: 'get_feedinfo.json',
	entryUrl: 'get_entry.json',
	
	/**
	 * 请求当前rss的基本信息
	 * @param {Object} options 配置参数，其中包括如下属性：
	 * 		onSuccess: 成功后的回调方法
	 * 		onFailure: 失败后的回调方法
	 * @param {Boolean} noCache 不使用cache中的内容，如果指定为true，那就重新从服务器请求，如果为false，那就从cache中取，默认值为false
	 */
	requestInfo: function(options, noCache) {
		this.infoOptions = options;
		this.requestInfoData(noCache);
	},
	
	/**
	 * 请求rss信息
	 * @param {Boolean} noCache 不使用cache中的内容，如果指定为true，那就重新从服务器请求，如果为false，那就从cache中取，默认值为false
	 */
	requestInfoData: function(noCache) {
		if (!noCache && this.info) this.gotInfo({widget_data: this.info});
		else {
			var vn = 'rss_info_' + Time.now();
			var url = this.domain + this.infoUrl + '?feed_link=' + encodeURIComponent(this.url) + '&vn=' + vn;
			new Groj(url, {
				variable: vn,
				charset: 'UTF-8',
				onSuccess: this.gotInfo.bind(this), 
				onFailure: this.notGotInfo.bind(this)
			});
		}
	},
	
	gotInfo: function(data) {
		if (data && data.widget_data && data.widget_data.error_code == 0) {
			this.info = data.widget_data.feed_info;
			if (this.infoOptions.onSuccess) this.infoOptions.onSuccess(this.info);
		} else {
			this.info = (data && data.widget_data) ? data.widget_data : null;
			if (this.infoOptions.onFailure) this.infoOptions.onFailure({description: '取不到feed信息'});
		}
	},
	
	notGotInfo: function() {
		this.info = null;
		if (this.infoOptions.onFailure) this.infoOptions.onFailure({description: '取不到feed信息'});
	},
	
	/**
	 * 请求当前rss的列表信息
	 * @param {Object} options 配置参数，其中应该如下属性：
	 * 		size: 请求数量，默认值为10
	 * 		start: 开始位置，默认值为0
	 * 		mode: 请求类型，现在有两种：normal（只返回标题、时间这些基本信息）和all（所有的信息）
	 * 		onSuccess: 成功取得列表后的处理方法
	 * 		onFailure: 失败之后的处理方法
	 */
	requestEntries: function(options) {
		this.entryOptions = Object.extend({
			size: 10,
			start: 0,
			mode: 'normal'
		}, options);
		this.requestEntriesData();
	},
	
	/**
	 * 请求rss下的日志列表
	 */
	requestEntriesData: function() {
		var vn = 'rss_entries_' + Time.now();
		var url = this.domain + this.entryUrl + '?feed_link=' + encodeURIComponent(this.url) + '&vn=' + vn + '&mode=' + this.entryOptions.mode + '&limit=' + this.entryOptions.size;
		new Groj(url, {
			variable: vn,
			charset: 'UTF-8',
			onSuccess: this.gotEntries.bind(this), 
			onFailure: this.notGotEntries.bind(this)
		});
	},
	
	/**
	 * 取得日志列表的方法
	 */
	gotEntries: function(data) {
		if (data && data.widget_data && data.widget_data.error_code == 0) {
			this.entries = data.widget_data.entry_info;
			if (this.entryOptions.onSuccess) this.entryOptions.onSuccess(this.entries);
		} else {
			this.entries = (data && data.widget_data) ? data.widget_data : null;
			if (this.entryOptions.onFailure) this.entryOptions.onFailure({description: '取不到feed信息'});
		}
	},
	
	notGotEntries: function() {
		this.entries = null;
		if (this.entryOptions.onFailure) this.entryOptions.onFailure({description: '取不到feed信息'});
	}
});

/**
 * 通过一个url，取得一个rss的描述信息
 * @param {String} url rss的地址，或者是包括rss的一个博客地址
 * @param {Object} options 配置参数，其中包括如下属性：
 * 		onSuccess: 成功后的回调方法
 * 		onFailure: 失败后的回调方法
 */
Rss.getInfo = function(url, options) {
	var r = new Rss(url);
	r.requestInfo(options);
	return this;
}

/**
 * 通过一个url，取得一个rss中的日志列表信息
 * @param {String} url rss的地址，或者是包括rss的一个博客地址
 * @param {Object} options 配置参数，其中应该如下属性：
 * 		size: 请求数量，默认值为10
 * 		start: 开始位置，默认值为0
 * 		mode: 请求类型，现在有两种：normal（只返回标题、时间这些基本信息）和all（所有的信息）
 * 		onSuccess: 成功取得列表后的处理方法
 * 		onFailure: 失败之后的处理方法
 */
Rss.getEntries = function(url, options) {
	var r = new Rss(url);
	r.requestEntries(options);
	return this;
}