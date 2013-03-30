/**
 * Rss ������
 * @author Jady
 * 
 * @base prototype Groj Time
 **/
 
var Rss = Class.create();

Object.extend(Rss.prototype, {
	
	/**
	 * ��ʼ��������
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
	 * ����ǰrss�Ļ�����Ϣ
	 * @param {Object} options ���ò��������а����������ԣ�
	 * 		onSuccess: �ɹ���Ļص�����
	 * 		onFailure: ʧ�ܺ�Ļص�����
	 * @param {Boolean} noCache ��ʹ��cache�е����ݣ����ָ��Ϊtrue���Ǿ����´ӷ������������Ϊfalse���Ǿʹ�cache��ȡ��Ĭ��ֵΪfalse
	 */
	requestInfo: function(options, noCache) {
		this.infoOptions = options;
		this.requestInfoData(noCache);
	},
	
	/**
	 * ����rss��Ϣ
	 * @param {Boolean} noCache ��ʹ��cache�е����ݣ����ָ��Ϊtrue���Ǿ����´ӷ������������Ϊfalse���Ǿʹ�cache��ȡ��Ĭ��ֵΪfalse
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
			if (this.infoOptions.onFailure) this.infoOptions.onFailure({description: 'ȡ����feed��Ϣ'});
		}
	},
	
	notGotInfo: function() {
		this.info = null;
		if (this.infoOptions.onFailure) this.infoOptions.onFailure({description: 'ȡ����feed��Ϣ'});
	},
	
	/**
	 * ����ǰrss���б���Ϣ
	 * @param {Object} options ���ò���������Ӧ���������ԣ�
	 * 		size: ����������Ĭ��ֵΪ10
	 * 		start: ��ʼλ�ã�Ĭ��ֵΪ0
	 * 		mode: �������ͣ����������֣�normal��ֻ���ر��⡢ʱ����Щ������Ϣ����all�����е���Ϣ��
	 * 		onSuccess: �ɹ�ȡ���б��Ĵ�����
	 * 		onFailure: ʧ��֮��Ĵ�����
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
	 * ����rss�µ���־�б�
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
	 * ȡ����־�б�ķ���
	 */
	gotEntries: function(data) {
		if (data && data.widget_data && data.widget_data.error_code == 0) {
			this.entries = data.widget_data.entry_info;
			if (this.entryOptions.onSuccess) this.entryOptions.onSuccess(this.entries);
		} else {
			this.entries = (data && data.widget_data) ? data.widget_data : null;
			if (this.entryOptions.onFailure) this.entryOptions.onFailure({description: 'ȡ����feed��Ϣ'});
		}
	},
	
	notGotEntries: function() {
		this.entries = null;
		if (this.entryOptions.onFailure) this.entryOptions.onFailure({description: 'ȡ����feed��Ϣ'});
	}
});

/**
 * ͨ��һ��url��ȡ��һ��rss��������Ϣ
 * @param {String} url rss�ĵ�ַ�������ǰ���rss��һ�����͵�ַ
 * @param {Object} options ���ò��������а����������ԣ�
 * 		onSuccess: �ɹ���Ļص�����
 * 		onFailure: ʧ�ܺ�Ļص�����
 */
Rss.getInfo = function(url, options) {
	var r = new Rss(url);
	r.requestInfo(options);
	return this;
}

/**
 * ͨ��һ��url��ȡ��һ��rss�е���־�б���Ϣ
 * @param {String} url rss�ĵ�ַ�������ǰ���rss��һ�����͵�ַ
 * @param {Object} options ���ò���������Ӧ���������ԣ�
 * 		size: ����������Ĭ��ֵΪ10
 * 		start: ��ʼλ�ã�Ĭ��ֵΪ0
 * 		mode: �������ͣ����������֣�normal��ֻ���ر��⡢ʱ����Щ������Ϣ����all�����е���Ϣ��
 * 		onSuccess: �ɹ�ȡ���б��Ĵ�����
 * 		onFailure: ʧ��֮��Ĵ�����
 */
Rss.getEntries = function(url, options) {
	var r = new Rss(url);
	r.requestEntries(options);
	return this;
}