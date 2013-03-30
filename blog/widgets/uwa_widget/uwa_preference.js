/*******************************************************************************************************
 * UWA Reference 封装一个具体的Widget
 ******************************************************************************************************/

UWA.Reference = {
	
	config: {
		base: [
			["name", "", "string"],
			["label", "", "string"],
			["defaultValue", undefined, "string"]
		],
		
		text: [
		],
		
		boolean: [
			["onchange", false, "boolean"],
			["defaultValue", "false", "string"]
		],
		
		hidden: [
		],
		
		range: [
			["onchange", false, "boolean"],
			["min", "1", "string"],
			["max", "1", "string"],
			["step", "1", "string"],
			["defaultValue", undefined, "string"]
		],
		
		list: [
			["onchange", false, "boolean"]
		],
		
		password: [
		]
	},

	/**
	 * 从一个Dom元素节点中取得有关于这个元素的所有信息
	 * @param {Element} element Dom元素节点
	 * @type Object
	 * @return 包含这个元素所有配置信息的一个对象 
	 **/
	getData: function(element) {
		var object = {};
		this.parseData(this.config.base, element, object);
		var type = element.getAttribute("type") == undefined ? "text" : element.getAttribute("type").toLowerCase();
		object.type = type;
		this[type + "Data"](element, object);
		return object;
	},
	
	textData: function(element, object) {
	},
	
	booleanData: function(element, object) {
		this.parseData(this.config.boolean, element, object);
	},
	
	hiddenData: function(element, object) {
	},
	
	rangeData: function(element, object) {
		this.parseData(this.config.range, element, object);
	},
	
	listData: function(element, object) {
		this.parseData(this.config.list, element, object);
		var options = element.getElementsByTagName("option");
		object.options = [];
		for (var i=0; i<options.length; i++) {
			object.options.push({
				label: options[i].getAttribute("label"),
				value: options[i].getAttribute("value")
			});
		}
	},
	
	passwordData: function(element, object) {
	},
	
	parseData: function(config, element, object) {
		for (var i=0; i<config.length; i++) {
			var value = element.getAttribute(config[i][0]);
			if (value == null) {
				object[config[i][0]] = config[i][1];
			} else {
				switch (config[i][2]) {
					case "number":
						value = parseFloat(value);
						break;
					case "boolean":
						value = value.toLowerCase() == "true";
						break;
				}
				object[config[i][0]] = value;
			}
		}
		return object;
	},
	
	bindObjData: function(config, obj) {
		for (var i=0; i<config.length; i++) {
			if (typeof(obj[config[i][0]]) != config[i][2]) {
				obj[config[i][0]] = config[i][1];
			}
		}
	},
	
	bindData: function(obj) {
		this.bindObjData(this.config.base, obj);
		this.bindObjData(this.config[obj.type], obj);
		return obj;
	}
}