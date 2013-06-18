/**
 * SWFUpload: http://www.swfupload.org, http://swfupload.googlecode.com
 *
 * mmSWFUpload 1.0: Flash upload dialog - http://profandesign.se/swfupload/,  http://www.vinterwebb.se/
 *
 * SWFUpload is (c) 2006-2007 Lars Huring, Olov Nilz�n and Mammon Media and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * SWFUpload 2 is (c) 2007-2008 Jake Roberts and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */


/* ******************* */
/* Constructor & Init  */
/* ******************* */
var SWFUpload;

if (SWFUpload == undefined) {
	SWFUpload = function (settings) {
		this.initSWFUpload(settings);
	};
}

SWFUpload.prototype.initSWFUpload = function (settings) {
	try {
		this.customSettings = {};	// A container where developers can place their own settings associated with this instance.
		this.settings = settings;
		this.eventQueue = [];
		this.movieName = "SWFUpload_" + SWFUpload.movieCount++;
		this.movieElement = null;


		// Setup global control tracking
		SWFUpload.instances[this.movieName] = this;

		// Load the settings.  Load the Flash movie.
		this.initSettings();
		this.loadFlash();
		this.displayDebugInfo();
	} catch (ex) {
		delete SWFUpload.instances[this.movieName];
		throw ex;
	}
};

/* *************** */
/* Static Members  */
/* *************** */
SWFUpload.instances = {};
SWFUpload.movieCount = 0;
SWFUpload.version = "2.2.0 2009-03-25";
SWFUpload.QUEUE_ERROR = {
	QUEUE_LIMIT_EXCEEDED	  		: -100,
	FILE_EXCEEDS_SIZE_LIMIT  		: -110,
	ZERO_BYTE_FILE			  		: -120,
	INVALID_FILETYPE		  		: -130
};
SWFUpload.UPLOAD_ERROR = {
	HTTP_ERROR				  		: -200,
	MISSING_UPLOAD_URL	      		: -210,
	IO_ERROR				  		: -220,
	SECURITY_ERROR			  		: -230,
	UPLOAD_LIMIT_EXCEEDED	  		: -240,
	UPLOAD_FAILED			  		: -250,
	SPECIFIED_FILE_ID_NOT_FOUND		: -260,
	FILE_VALIDATION_FAILED	  		: -270,
	FILE_CANCELLED			  		: -280,
	UPLOAD_STOPPED					: -290
};
SWFUpload.FILE_STATUS = {
	QUEUED		 : -1,
	IN_PROGRESS	 : -2,
	ERROR		 : -3,
	COMPLETE	 : -4,
	CANCELLED	 : -5
};
SWFUpload.BUTTON_ACTION = {
	SELECT_FILE  : -100,
	SELECT_FILES : -110,
	START_UPLOAD : -120
};
SWFUpload.CURSOR = {
	ARROW : -1,
	HAND : -2
};
SWFUpload.WINDOW_MODE = {
	WINDOW : "window",
	TRANSPARENT : "transparent",
	OPAQUE : "opaque"
};

// Private: takes a URL, determines if it is relative and converts to an absolute URL
// using the current site. Only processes the URL if it can, otherwise returns the URL untouched
SWFUpload.completeURL = function(url) {
	if (typeof(url) !== "string" || url.match(/^https?:\/\//i) || url.match(/^\//)) {
		return url;
	}
	
	var currentURL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
	
	var indexSlash = window.location.pathname.lastIndexOf("/");
	if (indexSlash <= 0) {
		path = "/";
	} else {
		path = window.location.pathname.substr(0, indexSlash) + "/";
	}
	
	return /*currentURL +*/ path + url;
	
};


/* ******************** */
/* Instance Members  */
/* ******************** */

// Private: initSettings ensures that all the
// settings are set, getting a default value if one was not assigned.
SWFUpload.prototype.initSettings = function () {
	this.ensureDefault = function (settingName, defaultValue) {
		this.settings[settingName] = (this.settings[settingName] == undefined) ? defaultValue : this.settings[settingName];
	};
	
	// Upload backend settings
	this.ensureDefault("upload_url", "");
	this.ensureDefault("preserve_relative_urls", false);
	this.ensureDefault("file_post_name", "file");
	this.ensureDefault("post_params", {});
	this.ensureDefault("use_query_string", false);
	this.ensureDefault("requeue_on_error", false);
	this.ensureDefault("http_success", []);
	this.ensureDefault("assume_success_timeout", 0);
	
	// File Settings
	this.ensureDefault("file_types", "*.*");
	this.ensureDefault("file_types_description", "All Files");
	this.ensureDefault("file_size_limit", 0);	// Default zero means "unlimited"
	this.ensureDefault("file_upload_limit", 0);
	this.ensureDefault("file_queue_limit", 0);

	// Flash Settings
	this.ensureDefault("flash_url", "swfupload.swf");
	this.ensureDefault("prevent_swf_caching", true);
	
	// Button Settings
	this.ensureDefault("button_image_url", "");
	this.ensureDefault("button_width", 1);
	this.ensureDefault("button_height", 1);
	this.ensureDefault("button_text", "");
	this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;");
	this.ensureDefault("button_text_top_padding", 0);
	this.ensureDefault("button_text_left_padding", 0);
	this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES);
	this.ensureDefault("button_disabled", false);
	this.ensureDefault("button_placeholder_id", "");
	this.ensureDefault("button_placeholder", null);
	this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW);
	this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW);
	
	// Debug Settings
	this.ensureDefault("debug", false);
	this.settings.debug_enabled = this.settings.debug;	// Here to maintain v2 API
	
	// Event Handlers
	this.settings.return_upload_start_handler = this.returnUploadStart;
	this.ensureDefault("swfupload_loaded_handler", null);
	this.ensureDefault("file_dialog_start_handler", null);
	this.ensureDefault("file_queued_handler", null);
	this.ensureDefault("file_queue_error_handler", null);
	this.ensureDefault("file_dialog_complete_handler", null);
	
	this.ensureDefault("upload_start_handler", null);
	this.ensureDefault("upload_progress_handler", null);
	this.ensureDefault("upload_error_handler", null);
	this.ensureDefault("upload_success_handler", null);
	this.ensureDefault("upload_complete_handler", null);
	
	this.ensureDefault("debug_handler", this.debugMessage);

	this.ensureDefault("custom_settings", {});

	// Other settings
	this.customSettings = this.settings.custom_settings;
	
	// Update the flash url if needed
	if (!!this.settings.prevent_swf_caching) {
		this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + new Date().getTime();
	}
	
	if (!this.settings.preserve_relative_urls) {
		//this.settings.flash_url = SWFUpload.completeURL(this.settings.flash_url);	// Don't need to do this one since flash doesn't look at it
		this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url);
		this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url);
	}
	
	delete this.ensureDefault;
};

// Private: loadFlash replaces the button_placeholder element with the flash movie.
SWFUpload.prototype.loadFlash = function () {
	var targetElement, tempParent;

	// Make sure an element with the ID we are going to use doesn't already exist
	if (document.getElementById(this.movieName) !== null) {
		throw "ID " + this.movieName + " is already in use. The Flash Object could not be added";
	}

	// Get the element where we will be placing the flash movie
	targetElement = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder;

	if (targetElement == undefined) {
		throw "Could not find the placeholder element: " + this.settings.button_placeholder_id;
	}

	// Append the container and load the flash
	tempParent = document.createElement("div");
	tempParent.innerHTML = this.getFlashHTML();	// Using innerHTML is non-standard but the only sensible way to dynamically add Flash in IE (and maybe other browsers)
	targetElement.parentNode.replaceChild(tempParent.firstChild, targetElement);

	// Fix IE Flash/Form bug
	if (window[this.movieName] == undefined) {
		window[this.movieName] = this.getMovieElement();
	}
	
};

// Private: getFlashHTML generates the object tag needed to embed the flash in to the document
SWFUpload.prototype.getFlashHTML = function () {
	// Flash Satay object syntax: http://www.alistapart.com/articles/flashsatay
	return ['<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">',
				'<param name="wmode" value="', this.settings.button_window_mode, '" />',
				'<param name="movie" value="', this.settings.flash_url, '" />',
				'<param name="quality" value="high" />',
				'<param name="menu" value="false" />',
				'<param name="allowScriptAccess" value="always" />',
				'<param name="flashvars" value="' + this.getFlashVars() + '" />',
				'</object>'].join("");
};

// Private: getFlashVars builds the parameter string that will be passed
// to flash in the flashvars param.
SWFUpload.prototype.getFlashVars = function () {
	// Build a string from the post param object
	var paramString = this.buildParamString();
	var httpSuccessString = this.settings.http_success.join(",");
	
	// Build the parameter string
	return ["movieName=", encodeURIComponent(this.movieName),
			"&amp;uploadURL=", encodeURIComponent(this.settings.upload_url),
			"&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string),
			"&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error),
			"&amp;httpSuccess=", encodeURIComponent(httpSuccessString),
			"&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout),
			"&amp;params=", encodeURIComponent(paramString),
			"&amp;filePostName=", encodeURIComponent(this.settings.file_post_name),
			"&amp;fileTypes=", encodeURIComponent(this.settings.file_types),
			"&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description),
			"&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit),
			"&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit),
			"&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit),
			"&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled),
			"&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url),
			"&amp;buttonWidth=", encodeURIComponent(this.settings.button_width),
			"&amp;buttonHeight=", encodeURIComponent(this.settings.button_height),
			"&amp;buttonText=", encodeURIComponent(this.settings.button_text),
			"&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding),
			"&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding),
			"&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style),
			"&amp;buttonAction=", encodeURIComponent(this.settings.button_action),
			"&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled),
			"&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)
		].join("");
};

// Public: getMovieElement retrieves the DOM reference to the Flash element added by SWFUpload
// The element is cached after the first lookup
SWFUpload.prototype.getMovieElement = function () {
	if (this.movieElement == undefined) {
		this.movieElement = document.getElementById(this.movieName);
	}

	if (this.movieElement === null) {
		throw "Could not find Flash element";
	}
	
	return this.movieElement;
};

// Private: buildParamString takes the name/value pairs in the post_params setting object
// and joins them up in to a string formatted "name=value&amp;name=value"
SWFUpload.prototype.buildParamString = function () {
	var postParams = this.settings.post_params; 
	var paramStringPairs = [];

	if (typeof(postParams) === "object") {
		for (var name in postParams) {
			if (postParams.hasOwnProperty(name)) {
				paramStringPairs.push(encodeURIComponent(name.toString()) + "=" + encodeURIComponent(postParams[name].toString()));
			}
		}
	}

	return paramStringPairs.join("&amp;");
};

// Public: Used to remove a SWFUpload instance from the page. This method strives to remove
// all references to the SWF, and other objects so memory is properly freed.
// Returns true if everything was destroyed. Returns a false if a failure occurs leaving SWFUpload in an inconsistant state.
// Credits: Major improvements provided by steffen
SWFUpload.prototype.destroy = function () {
	try {
		// Make sure Flash is done before we try to remove it
		this.cancelUpload(null, false);
		

		// Remove the SWFUpload DOM nodes
		var movieElement = null;
		movieElement = this.getMovieElement();
		
		if (movieElement && typeof(movieElement.CallFunction) === "unknown") { // We only want to do this in IE
			// Loop through all the movie's properties and remove all function references (DOM/JS IE 6/7 memory leak workaround)
			for (var i in movieElement) {
				try {
					if (typeof(movieElement[i]) === "function") {
						movieElement[i] = null;
					}
				} catch (ex1) {}
			}

			// Remove the Movie Element from the page
			try {
				movieElement.parentNode.removeChild(movieElement);
			} catch (ex) {}
		}
		
		// Remove IE form fix reference
		window[this.movieName] = null;

		// Destroy other references
		SWFUpload.instances[this.movieName] = null;
		delete SWFUpload.instances[this.movieName];

		this.movieElement = null;
		this.settings = null;
		this.customSettings = null;
		this.eventQueue = null;
		this.movieName = null;
		
		
		return true;
	} catch (ex2) {
		return false;
	}
};


// Public: displayDebugInfo prints out settings and configuration
// information about this SWFUpload instance.
// This function (and any references to it) can be deleted when placing
// SWFUpload in production.
SWFUpload.prototype.displayDebugInfo = function () {
	this.debug(
		[
			"---SWFUpload Instance Info---\n",
			"Version: ", SWFUpload.version, "\n",
			"Movie Name: ", this.movieName, "\n",
			"Settings:\n",
			"\t", "upload_url:               ", this.settings.upload_url, "\n",
			"\t", "flash_url:                ", this.settings.flash_url, "\n",
			"\t", "use_query_string:         ", this.settings.use_query_string.toString(), "\n",
			"\t", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n",
			"\t", "http_success:             ", this.settings.http_success.join(", "), "\n",
			"\t", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n",
			"\t", "file_post_name:           ", this.settings.file_post_name, "\n",
			"\t", "post_params:              ", this.settings.post_params.toString(), "\n",
			"\t", "file_types:               ", this.settings.file_types, "\n",
			"\t", "file_types_description:   ", this.settings.file_types_description, "\n",
			"\t", "file_size_limit:          ", this.settings.file_size_limit, "\n",
			"\t", "file_upload_limit:        ", this.settings.file_upload_limit, "\n",
			"\t", "file_queue_limit:         ", this.settings.file_queue_limit, "\n",
			"\t", "debug:                    ", this.settings.debug.toString(), "\n",

			"\t", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n",

			"\t", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n",
			"\t", "button_placeholder:       ", (this.settings.button_placeholder ? "Set" : "Not Set"), "\n",
			"\t", "button_image_url:         ", this.settings.button_image_url.toString(), "\n",
			"\t", "button_width:             ", this.settings.button_width.toString(), "\n",
			"\t", "button_height:            ", this.settings.button_height.toString(), "\n",
			"\t", "button_text:              ", this.settings.button_text.toString(), "\n",
			"\t", "button_text_style:        ", this.settings.button_text_style.toString(), "\n",
			"\t", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n",
			"\t", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n",
			"\t", "button_action:            ", this.settings.button_action.toString(), "\n",
			"\t", "button_disabled:          ", this.settings.button_disabled.toString(), "\n",

			"\t", "custom_settings:          ", this.settings.custom_settings.toString(), "\n",
			"Event Handlers:\n",
			"\t", "swfupload_loaded_handler assigned:  ", (typeof this.settings.swfupload_loaded_handler === "function").toString(), "\n",
			"\t", "file_dialog_start_handler assigned: ", (typeof this.settings.file_dialog_start_handler === "function").toString(), "\n",
			"\t", "file_queued_handler assigned:       ", (typeof this.settings.file_queued_handler === "function").toString(), "\n",
			"\t", "file_queue_error_handler assigned:  ", (typeof this.settings.file_queue_error_handler === "function").toString(), "\n",
			"\t", "upload_start_handler assigned:      ", (typeof this.settings.upload_start_handler === "function").toString(), "\n",
			"\t", "upload_progress_handler assigned:   ", (typeof this.settings.upload_progress_handler === "function").toString(), "\n",
			"\t", "upload_error_handler assigned:      ", (typeof this.settings.upload_error_handler === "function").toString(), "\n",
			"\t", "upload_success_handler assigned:    ", (typeof this.settings.upload_success_handler === "function").toString(), "\n",
			"\t", "upload_complete_handler assigned:   ", (typeof this.settings.upload_complete_handler === "function").toString(), "\n",
			"\t", "debug_handler assigned:             ", (typeof this.settings.debug_handler === "function").toString(), "\n"
		].join("")
	);
};

/* Note: addSetting and getSetting are no longer used by SWFUpload but are included
	the maintain v2 API compatibility
*/
// Public: (Deprecated) addSetting adds a setting value. If the value given is undefined or null then the default_value is used.
SWFUpload.prototype.addSetting = function (name, value, default_value) {
    if (value == undefined) {
        return (this.settings[name] = default_value);
    } else {
        return (this.settings[name] = value);
	}
};

// Public: (Deprecated) getSetting gets a setting. Returns an empty string if the setting was not found.
SWFUpload.prototype.getSetting = function (name) {
    if (this.settings[name] != undefined) {
        return this.settings[name];
	}

    return "";
};



// Private: callFlash handles function calls made to the Flash element.
// Calls are made with a setTimeout for some functions to work around
// bugs in the ExternalInterface library.
SWFUpload.prototype.callFlash = function (functionName, argumentArray) {
	argumentArray = argumentArray || [];
	
	var movieElement = this.getMovieElement();
	var returnValue, returnString;

	// Flash's method if calling ExternalInterface methods (code adapted from MooTools).
	try {
		returnString = movieElement.CallFunction('<invoke name="' + functionName + '" returntype="javascript">' + __flash__argumentsToXML(argumentArray, 0) + '</invoke>');
		returnValue = eval(returnString);
	} catch (ex) {
		throw "Call to " + functionName + " failed";
	}
	
	// Unescape file post param values
	if (returnValue != undefined && typeof returnValue.post === "object") {
		returnValue = this.unescapeFilePostParams(returnValue);
	}

	return returnValue;
};

/* *****************************
	-- Flash control methods --
	Your UI should use these
	to operate SWFUpload
   ***************************** */

// WARNING: this function does not work in Flash Player 10
// Public: selectFile causes a File Selection Dialog window to appear.  This
// dialog only allows 1 file to be selected.
SWFUpload.prototype.selectFile = function () {
	this.callFlash("SelectFile");
};

// WARNING: this function does not work in Flash Player 10
// Public: selectFiles causes a File Selection Dialog window to appear/ This
// dialog allows the user to select any number of files
// Flash Bug Warning: Flash limits the number of selectable files based on the combined length of the file names.
// If the selection name length is too long the dialog will fail in an unpredictable manner.  There is no work-around
// for this bug.
SWFUpload.prototype.selectFiles = function () {
	this.callFlash("SelectFiles");
};


// Public: startUpload starts uploading the first file in the queue unless
// the optional parameter 'fileID' specifies the ID 
SWFUpload.prototype.startUpload = function (fileID) {
	this.callFlash("StartUpload", [fileID]);
};

// Public: cancelUpload cancels any queued file.  The fileID parameter may be the file ID or index.
// If you do not specify a fileID the current uploading file or first file in the queue is cancelled.
// If you do not want the uploadError event to trigger you can specify false for the triggerErrorEvent parameter.
SWFUpload.prototype.cancelUpload = function (fileID, triggerErrorEvent) {
	if (triggerErrorEvent !== false) {
		triggerErrorEvent = true;
	}
	this.callFlash("CancelUpload", [fileID, triggerErrorEvent]);
};

// Public: stopUpload stops the current upload and requeues the file at the beginning of the queue.
// If nothing is currently uploading then nothing happens.
SWFUpload.prototype.stopUpload = function () {
	this.callFlash("StopUpload");
};

/* ************************
 * Settings methods
 *   These methods change the SWFUpload settings.
 *   SWFUpload settings should not be changed directly on the settings object
 *   since many of the settings need to be passed to Flash in order to take
 *   effect.
 * *********************** */

// Public: getStats gets the file statistics object.
SWFUpload.prototype.getStats = function () {
	return this.callFlash("GetStats");
};

// Public: setStats changes the SWFUpload statistics.  You shouldn't need to 
// change the statistics but you can.  Changing the statistics does not
// affect SWFUpload accept for the successful_uploads count which is used
// by the upload_limit setting to determine how many files the user may upload.
SWFUpload.prototype.setStats = function (statsObject) {
	this.callFlash("SetStats", [statsObject]);
};

// Public: getFile retrieves a File object by ID or Index.  If the file is
// not found then 'null' is returned.
SWFUpload.prototype.getFile = function (fileID) {
	if (typeof(fileID) === "number") {
		return this.callFlash("GetFileByIndex", [fileID]);
	} else {
		return this.callFlash("GetFile", [fileID]);
	}
};

// Public: addFileParam sets a name/value pair that will be posted with the
// file specified by the Files ID.  If the name already exists then the
// exiting value will be overwritten.
SWFUpload.prototype.addFileParam = function (fileID, name, value) {
	return this.callFlash("AddFileParam", [fileID, name, value]);
};

// Public: removeFileParam removes a previously set (by addFileParam) name/value
// pair from the specified file.
SWFUpload.prototype.removeFileParam = function (fileID, name) {
	this.callFlash("RemoveFileParam", [fileID, name]);
};

// Public: setUploadUrl changes the upload_url setting.
SWFUpload.prototype.setUploadURL = function (url) {
	this.settings.upload_url = url.toString();
	this.callFlash("SetUploadURL", [url]);
};

// Public: setPostParams changes the post_params setting
SWFUpload.prototype.setPostParams = function (paramsObject) {
	this.settings.post_params = paramsObject;
	this.callFlash("SetPostParams", [paramsObject]);
};

// Public: addPostParam adds post name/value pair.  Each name can have only one value.
SWFUpload.prototype.addPostParam = function (name, value) {
	this.settings.post_params[name] = value;
	this.callFlash("SetPostParams", [this.settings.post_params]);
};

// Public: removePostParam deletes post name/value pair.
SWFUpload.prototype.removePostParam = function (name) {
	delete this.settings.post_params[name];
	this.callFlash("SetPostParams", [this.settings.post_params]);
};

// Public: setFileTypes changes the file_types setting and the file_types_description setting
SWFUpload.prototype.setFileTypes = function (types, description) {
	this.settings.file_types = types;
	this.settings.file_types_description = description;
	this.callFlash("SetFileTypes", [types, description]);
};

// Public: setFileSizeLimit changes the file_size_limit setting
SWFUpload.prototype.setFileSizeLimit = function (fileSizeLimit) {
	this.settings.file_size_limit = fileSizeLimit;
	this.callFlash("SetFileSizeLimit", [fileSizeLimit]);
};

// Public: setFileUploadLimit changes the file_upload_limit setting
SWFUpload.prototype.setFileUploadLimit = function (fileUploadLimit) {
	this.settings.file_upload_limit = fileUploadLimit;
	this.callFlash("SetFileUploadLimit", [fileUploadLimit]);
};

// Public: setFileQueueLimit changes the file_queue_limit setting
SWFUpload.prototype.setFileQueueLimit = function (fileQueueLimit) {
	this.settings.file_queue_limit = fileQueueLimit;
	this.callFlash("SetFileQueueLimit", [fileQueueLimit]);
};

// Public: setFilePostName changes the file_post_name setting
SWFUpload.prototype.setFilePostName = function (filePostName) {
	this.settings.file_post_name = filePostName;
	this.callFlash("SetFilePostName", [filePostName]);
};

// Public: setUseQueryString changes the use_query_string setting
SWFUpload.prototype.setUseQueryString = function (useQueryString) {
	this.settings.use_query_string = useQueryString;
	this.callFlash("SetUseQueryString", [useQueryString]);
};

// Public: setRequeueOnError changes the requeue_on_error setting
SWFUpload.prototype.setRequeueOnError = function (requeueOnError) {
	this.settings.requeue_on_error = requeueOnError;
	this.callFlash("SetRequeueOnError", [requeueOnError]);
};

// Public: setHTTPSuccess changes the http_success setting
SWFUpload.prototype.setHTTPSuccess = function (http_status_codes) {
	if (typeof http_status_codes === "string") {
		http_status_codes = http_status_codes.replace(" ", "").split(",");
	}
	
	this.settings.http_success = http_status_codes;
	this.callFlash("SetHTTPSuccess", [http_status_codes]);
};

// Public: setHTTPSuccess changes the http_success setting
SWFUpload.prototype.setAssumeSuccessTimeout = function (timeout_seconds) {
	this.settings.assume_success_timeout = timeout_seconds;
	this.callFlash("SetAssumeSuccessTimeout", [timeout_seconds]);
};

// Public: setDebugEnabled changes the debug_enabled setting
SWFUpload.prototype.setDebugEnabled = function (debugEnabled) {
	this.settings.debug_enabled = debugEnabled;
	this.callFlash("SetDebugEnabled", [debugEnabled]);
};

// Public: setButtonImageURL loads a button image sprite
SWFUpload.prototype.setButtonImageURL = function (buttonImageURL) {
	if (buttonImageURL == undefined) {
		buttonImageURL = "";
	}
	
	this.settings.button_image_url = buttonImageURL;
	this.callFlash("SetButtonImageURL", [buttonImageURL]);
};

// Public: setButtonDimensions resizes the Flash Movie and button
SWFUpload.prototype.setButtonDimensions = function (width, height) {
	this.settings.button_width = width;
	this.settings.button_height = height;
	
	var movie = this.getMovieElement();
	if (movie != undefined) {
		movie.style.width = width + "px";
		movie.style.height = height + "px";
	}
	
	this.callFlash("SetButtonDimensions", [width, height]);
};
// Public: setButtonText Changes the text overlaid on the button
SWFUpload.prototype.setButtonText = function (html) {
	this.settings.button_text = html;
	this.callFlash("SetButtonText", [html]);
};
// Public: setButtonTextPadding changes the top and left padding of the text overlay
SWFUpload.prototype.setButtonTextPadding = function (left, top) {
	this.settings.button_text_top_padding = top;
	this.settings.button_text_left_padding = left;
	this.callFlash("SetButtonTextPadding", [left, top]);
};

// Public: setButtonTextStyle changes the CSS used to style the HTML/Text overlaid on the button
SWFUpload.prototype.setButtonTextStyle = function (css) {
	this.settings.button_text_style = css;
	this.callFlash("SetButtonTextStyle", [css]);
};
// Public: setButtonDisabled disables/enables the button
SWFUpload.prototype.setButtonDisabled = function (isDisabled) {
	this.settings.button_disabled = isDisabled;
	this.callFlash("SetButtonDisabled", [isDisabled]);
};
// Public: setButtonAction sets the action that occurs when the button is clicked
SWFUpload.prototype.setButtonAction = function (buttonAction) {
	this.settings.button_action = buttonAction;
	this.callFlash("SetButtonAction", [buttonAction]);
};

// Public: setButtonCursor changes the mouse cursor displayed when hovering over the button
SWFUpload.prototype.setButtonCursor = function (cursor) {
	this.settings.button_cursor = cursor;
	this.callFlash("SetButtonCursor", [cursor]);
};

/* *******************************
	Flash Event Interfaces
	These functions are used by Flash to trigger the various
	events.
	
	All these functions a Private.
	
	Because the ExternalInterface library is buggy the event calls
	are added to a queue and the queue then executed by a setTimeout.
	This ensures that events are executed in a determinate order and that
	the ExternalInterface bugs are avoided.
******************************* */

SWFUpload.prototype.queueEvent = function (handlerName, argumentArray) {
	// Warning: Don't call this.debug inside here or you'll create an infinite loop
	
	if (argumentArray == undefined) {
		argumentArray = [];
	} else if (!(argumentArray instanceof Array)) {
		argumentArray = [argumentArray];
	}
	
	var self = this;
	if (typeof this.settings[handlerName] === "function") {
		// Queue the event
		this.eventQueue.push(function () {
			this.settings[handlerName].apply(this, argumentArray);
		});
		
		// Execute the next queued event
		setTimeout(function () {
			self.executeNextEvent();
		}, 0);
		
	} else if (this.settings[handlerName] !== null) {
		throw "Event handler " + handlerName + " is unknown or is not a function";
	}
};

// Private: Causes the next event in the queue to be executed.  Since events are queued using a setTimeout
// we must queue them in order to garentee that they are executed in order.
SWFUpload.prototype.executeNextEvent = function () {
	// Warning: Don't call this.debug inside here or you'll create an infinite loop

	var  f = this.eventQueue ? this.eventQueue.shift() : null;
	if (typeof(f) === "function") {
		f.apply(this);
	}
};

// Private: unescapeFileParams is part of a workaround for a flash bug where objects passed through ExternalInterface cannot have
// properties that contain characters that are not valid for JavaScript identifiers. To work around this
// the Flash Component escapes the parameter names and we must unescape again before passing them along.
SWFUpload.prototype.unescapeFilePostParams = function (file) {
	var reg = /[$]([0-9a-f]{4})/i;
	var unescapedPost = {};
	var uk;

	if (file != undefined) {
		for (var k in file.post) {
			if (file.post.hasOwnProperty(k)) {
				uk = k;
				var match;
				while ((match = reg.exec(uk)) !== null) {
					uk = uk.replace(match[0], String.fromCharCode(parseInt("0x" + match[1], 16)));
				}
				unescapedPost[uk] = file.post[k];
			}
		}

		file.post = unescapedPost;
	}

	return file;
};

// Private: Called by Flash to see if JS can call in to Flash (test if External Interface is working)
SWFUpload.prototype.testExternalInterface = function () {
	try {
		return this.callFlash("TestExternalInterface");
	} catch (ex) {
		return false;
	}
};

// Private: This event is called by Flash when it has finished loading. Don't modify this.
// Use the swfupload_loaded_handler event setting to execute custom code when SWFUpload has loaded.
SWFUpload.prototype.flashReady = function () {
	// Check that the movie element is loaded correctly with its ExternalInterface methods defined
	var movieElement = this.getMovieElement();

	if (!movieElement) {
		this.debug("Flash called back ready but the flash movie can't be found.");
		return;
	}

	this.cleanUp(movieElement);
	
	this.queueEvent("swfupload_loaded_handler");
};

// Private: removes Flash added fuctions to the DOM node to prevent memory leaks in IE.
// This function is called by Flash each time the ExternalInterface functions are created.
SWFUpload.prototype.cleanUp = function (movieElement) {
	// Pro-actively unhook all the Flash functions
	try {
		if (this.movieElement && typeof(movieElement.CallFunction) === "unknown") { // We only want to do this in IE
			this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
			for (var key in movieElement) {
				try {
					if (typeof(movieElement[key]) === "function") {
						movieElement[key] = null;
					}
				} catch (ex) {
				}
			}
		}
	} catch (ex1) {
	
	}

	// Fix Flashes own cleanup code so if the SWFMovie was removed from the page
	// it doesn't display errors.
	window["__flash__removeCallback"] = function (instance, name) {
		try {
			if (instance) {
				instance[name] = null;
			}
		} catch (flashEx) {
		
		}
	};

};


/* This is a chance to do something before the browse window opens */
SWFUpload.prototype.fileDialogStart = function () {
	this.queueEvent("file_dialog_start_handler");
};


/* Called when a file is successfully added to the queue. */
SWFUpload.prototype.fileQueued = function (file) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("file_queued_handler", file);
};


/* Handle errors that occur when an attempt to queue a file fails. */
SWFUpload.prototype.fileQueueError = function (file, errorCode, message) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("file_queue_error_handler", [file, errorCode, message]);
};

/* Called after the file dialog has closed and the selected files have been queued.
	You could call startUpload here if you want the queued files to begin uploading immediately. */
SWFUpload.prototype.fileDialogComplete = function (numFilesSelected, numFilesQueued, numFilesInQueue) {
	this.queueEvent("file_dialog_complete_handler", [numFilesSelected, numFilesQueued, numFilesInQueue]);
};

SWFUpload.prototype.uploadStart = function (file) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("return_upload_start_handler", file);
};

SWFUpload.prototype.returnUploadStart = function (file) {
	var returnValue;
	if (typeof this.settings.upload_start_handler === "function") {
		file = this.unescapeFilePostParams(file);
		returnValue = this.settings.upload_start_handler.call(this, file);
	} else if (this.settings.upload_start_handler != undefined) {
		throw "upload_start_handler must be a function";
	}

	// Convert undefined to true so if nothing is returned from the upload_start_handler it is
	// interpretted as 'true'.
	if (returnValue === undefined) {
		returnValue = true;
	}
	
	returnValue = !!returnValue;
	
	this.callFlash("ReturnUploadStart", [returnValue]);
};



SWFUpload.prototype.uploadProgress = function (file, bytesComplete, bytesTotal) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("upload_progress_handler", [file, bytesComplete, bytesTotal]);
};

SWFUpload.prototype.uploadError = function (file, errorCode, message) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("upload_error_handler", [file, errorCode, message]);
};

SWFUpload.prototype.uploadSuccess = function (file, serverData, responseReceived) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("upload_success_handler", [file, serverData, responseReceived]);
};

SWFUpload.prototype.uploadComplete = function (file) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("upload_complete_handler", file);
};

/* Called by SWFUpload JavaScript and Flash functions when debug is enabled. By default it writes messages to the
   internal debug console.  You can override this event and have messages written where you want. */
SWFUpload.prototype.debug = function (message) {
	this.queueEvent("debug_handler", message);
};


/* **********************************
	Debug Console
	The debug console is a self contained, in page location
	for debug message to be sent.  The Debug Console adds
	itself to the body if necessary.

	The console is automatically scrolled as messages appear.
	
	If you are using your own debug handler or when you deploy to production and
	have debug disabled you can remove these functions to reduce the file size
	and complexity.
********************************** */
   
// Private: debugMessage is the default debug_handler.  If you want to print debug messages
// call the debug() function.  When overriding the function your own function should
// check to see if the debug setting is true before outputting debug information.
SWFUpload.prototype.debugMessage = function (message) {
	if (this.settings.debug) {
		var exceptionMessage, exceptionValues = [];

		// Check for an exception object and print it nicely
		if (typeof message === "object" && typeof message.name === "string" && typeof message.message === "string") {
			for (var key in message) {
				if (message.hasOwnProperty(key)) {
					exceptionValues.push(key + ": " + message[key]);
				}
			}
			exceptionMessage = exceptionValues.join("\n") || "";
			exceptionValues = exceptionMessage.split("\n");
			exceptionMessage = "EXCEPTION: " + exceptionValues.join("\nEXCEPTION: ");
			SWFUpload.Console.writeLine(exceptionMessage);
		} else {
			SWFUpload.Console.writeLine(message);
		}
	}
};

SWFUpload.Console = {};
SWFUpload.Console.writeLine = function (message) {
	var console, documentForm;

	try {
		console = document.getElementById("SWFUpload_Console");

		if (!console) {
			documentForm = document.createElement("form");
			document.getElementsByTagName("body")[0].appendChild(documentForm);

			console = document.createElement("textarea");
			console.id = "SWFUpload_Console";
			console.style.fontFamily = "monospace";
			console.setAttribute("wrap", "off");
			console.wrap = "off";
			console.style.overflow = "auto";
			console.style.width = "700px";
			console.style.height = "350px";
			console.style.margin = "5px";
			documentForm.appendChild(console);
		}

		console.value += message + "\n";

		console.scrollTop = console.scrollHeight - console.clientHeight;
	} catch (ex) {
		alert("Exception: " + ex.name + " Message: " + ex.message);
	}
};

/*
	A simple class for displaying file information and progress
	Note: This is a demonstration only and not part of SWFUpload.
	Note: Some have had problems adapting this class in IE7. It may not be suitable for your application.
*/

// Constructor
// file is a SWFUpload file object
// targetID is the HTML element id attribute that the FileProgress HTML structure will be added to.
// Instantiating a new FileProgress object with an existing file will reuse/update the existing DOM elements
function FileProgress(file, targetID) {
	this.fileProgressID = file.id;
	this.opacity = 100;
	this.height = 0;

	this.fileProgressWrapper = document.getElementById(this.fileProgressID);
	if (!this.fileProgressWrapper) {
		this.fileProgressWrapper = document.createElement("div");
		this.fileProgressWrapper.className = "progressWrapper";
		this.fileProgressWrapper.id = this.fileProgressID;

		this.fileProgressElement = document.createElement("div");
		this.fileProgressElement.className = "progressContainer";

		var progressCancel = document.createElement("a");
		progressCancel.className = "progressCancel";
		progressCancel.href = "#";
		progressCancel.style.visibility = "hidden";
		progressCancel.appendChild(document.createTextNode(" "));

		var progressText = document.createElement("div");
		progressText.className = "progressName";
		progressText.appendChild(document.createTextNode(file.name));

		var progressBar = document.createElement("div");
		progressBar.className = "progressBarInProgress";

		var progressStatus = document.createElement("div");
		progressStatus.className = "progressBarStatus";
		progressStatus.innerHTML = "&nbsp;";

		this.fileProgressElement.appendChild(progressCancel);
		this.fileProgressElement.appendChild(progressText);
		this.fileProgressElement.appendChild(progressStatus);
		this.fileProgressElement.appendChild(progressBar);
		this.fileProgressWrapper.appendChild(this.fileProgressElement);

		document.getElementById(targetID).appendChild(this.fileProgressWrapper);
	} else {
		this.fileProgressElement = this.fileProgressWrapper.firstChild;
		this.fileProgressElement.childNodes[1].innerHTML = file.name;
	}

	this.height = this.fileProgressWrapper.offsetHeight;

}
FileProgress.prototype.setProgress = function (percentage) {
	this.fileProgressElement.className = 'progressContainer green';
	this.fileProgressElement.childNodes[3].className = 'progressBarInProgress';
	this.fileProgressElement.childNodes[3].style.width = percentage + "%";
};
FileProgress.prototype.setComplete = function () {
	this.appear();
	this.fileProgressElement.className = 'progressContainer blue';
	this.fileProgressElement.childNodes[2].className = 'progressBarStatus yes';
	this.fileProgressElement.childNodes[3].className = 'progressBarComplete';
	this.fileProgressElement.childNodes[3].style.width = '';

	// var oSelf = this;
	// setTimeout(function () {
	// 	oSelf.disappear();
	// }, 10000);
};
FileProgress.prototype.setError = function () {
	this.appear();
	this.fileProgressElement.className = 'progressContainer red';
	this.fileProgressElement.childNodes[2].className = 'progressBarStatus no';
	this.fileProgressElement.childNodes[3].className = 'progressBarError';
	this.fileProgressElement.childNodes[3].style.width = '';

	// var oSelf = this;
	// setTimeout(function () {
	// 	oSelf.disappear();
	// }, 5000);
};
FileProgress.prototype.setCancelled = function () {
	this.appear();
	this.fileProgressElement.className = 'progressContainer';
	this.fileProgressElement.childNodes[3].className = 'progressBarError';
	this.fileProgressElement.childNodes[3].style.width = '';

	var oSelf = this;
	setTimeout(function () {
		oSelf.disappear();
	}, 2000);
};
FileProgress.prototype.setStatus = function (status) {
	this.fileProgressElement.childNodes[2].innerHTML = status;
};
// Show/Hide the cancel button
FileProgress.prototype.toggleCancel = function (show, uploadInstance) {
	this.fileProgressElement.childNodes[0].style.visibility = show ? 'visible' : 'hidden';
	// 取消上传按钮
	if (uploadInstance) {
		var fileID = this.fileProgressID;
		this.fileProgressElement.childNodes[0].onclick = function (e) {
			var e = e || window.event;
			if (e.preventDefault) {
				e.preventDefault()
			} else {
				e.returnValue = false
			}
			if (uploadInstance.cancelUpload) {
				// flash
				uploadInstance.cancelUpload(fileID)
			} else if (uploadInstance.xhr.abort) {
				// XHR
				uploadInstance.xhr.abort()
			}
			return false
		};
	}
};
// Makes sure the FileProgress box is visible
FileProgress.prototype.appear = function () {
	if (this.fileProgressWrapper.filters) {
		try {
			this.fileProgressWrapper.filters.item('DXImageTransform.Microsoft.Alpha').opacity = 100;
		} catch (e) {
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			this.fileProgressWrapper.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
		}
	} else {
		this.fileProgressWrapper.style.opacity = 1;
	}
	
	this.fileProgressWrapper.style.height = '';
	this.height = this.fileProgressWrapper.offsetHeight;
	this.opacity = 100;
	this.fileProgressWrapper.style.display = '';
};
// Fades out and clips away the FileProgress box.
FileProgress.prototype.disappear = function () {
	var reduceOpacityBy = 15;
	var reduceHeightBy = 4;
	var rate = 30;	// 15 fps

	if (this.opacity > 0) {
		this.opacity -= reduceOpacityBy;
		if (this.opacity < 0) {
			this.opacity = 0;
		}

		if (this.fileProgressWrapper.filters) {
			try {
				this.fileProgressWrapper.filters.item('DXImageTransform.Microsoft.Alpha').opacity = this.opacity;
			} catch (e) {
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				this.fileProgressWrapper.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + this.opacity + ')';
			}
		} else {
			this.fileProgressWrapper.style.opacity = this.opacity / 100;
		}
	}

	if (this.height > 0) {
		this.height -= reduceHeightBy;
		if (this.height < 0) {
			this.height = 0;
		}
		this.fileProgressWrapper.style.height = this.height + 'px';
	}

	if (this.height > 0 || this.opacity > 0) {
		var oSelf = this;
		setTimeout(function () {
			oSelf.disappear();
		}, rate);
	} else {
		this.fileProgressWrapper.style.display = 'none';
	}
};
/**
 * JavaScript JSONP tool
 * Copyright (c) 2011 snandy
 * 
 * 增加对请求失败的处理，虽然这个功能用处不太大，但研究了各个浏览器下script的差异性
 * 1, IE6/7/8 支持script的onreadystatechange事件
 * 2, IE9/10 支持script的onload和onreadystatechange事件
 * 3, Firefox/Safari/Chrome/Opera支持script的onload事件
 * 4, IE6/7/8/Opera 不支持script的onerror事件; IE9/10/Firefox/Safari/Chrome支持
 * 5, Opera虽然不支持onreadystatechange事件,但其具有readyState属性.这点甚是神奇
 * 6, 用IE9和IETester测试IE6/7/8，其readyState总为loading,loaded。没出现过complete。
 * 
 * 最后的实现思路：
 * 1, IE9/Firefox/Safari/Chrome 成功回调使用onload事件，错误回调使用onerror事件
 * 2, Opera 成功回调也使用onload事件（它压根不支持onreadystatechange），由于其不支持onerror，这里使用了延迟处理。
 *	即等待与成功回调success，success后标志位done置为true。failure则不会执行，否则执行。
 *	这里延迟的时间取值很有技巧，之前取2秒，在公司测试没问题。但回家用3G无线网络后发现即使所引用的js文件存在，但由于
 *	网速过慢，failure还是先执行了，后执行了success。所以这里取5秒是比较合理的。当然也不是绝对的。
 * 3, IE6/7/8 成功回调使用onreadystatechange事件，错误回调几乎是很难实现的。也是最有技术含量的。
 *	参考了http://stackoverflow.com/questions/3483919/script-onload-onerror-with-iefor-lazy-loading-problems
 *	使用nextSibling，发现不能实现。
 *	令人恶心的是，即使请求的资源文件不存在。它的readyState也会经历“loaded”状态。这样你就没法区分请求成功或失败。
 *	怕它了，最后使用前后台一起协调的机制解决最后的这个难题。无论请求成功或失败都让其调用callback(true)。
 *	此时已经将区别成功与失败的逻辑放到了callback中，如果后台没有返回jsonp则调用failure，否则调用success。
 *	
 * 
 * 接口
 * Sjax.debug = true; // 开启调试模式
 * 
 * Sjax.get({
 *	url	      // 请求url 
 *	param	  // 请求参数 (键值对字符串或js对象)
 *  charset   // utf-8
 *	success   // 请求成功回调函数
 *	failure   // 请求失败回调函数
 *	scope	  // 回调函数执行上下文
 *	timestamp // 是否加时间戳
 *  jsonpName // 传给后台的参数名，默认是callback
 *  jsonpCallback // 指定回调函数名称，不使用随机函数名，用在缓存时，此时timestamp应该设为false
 * });
 * 
 * 后台接受一个callback参数，为响应函数
 * 格式： snandy_jsonp_xxx(json)
 */

Sjax = function(global) {
		
var ie678 = !-[1,],
	opera = global.opera,
	doc = global.document,
	head = doc.head || doc.getElementsByTagName('head')[0],
	timeout = 3000, done = false;

function paramsToString(obj) {
	var a = [], key, val;
	for (key in obj) {
		val = obj[key];
		if (val.constructor === Array) {
			for(var i = 0, len = val.length; i < len; i++) {
				a.push(key + '=' + encodeURIComponent(val[i]));
			}
		} else {
			a.push(key + '=' + encodeURIComponent(val));
		}
	}
	return a.join('&');
}
//Thanks to Kevin Hakanson
//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/873856#873856
function generateRandomName() {
	var uuid = '', s = [], i = 0, hexDigits = '0123456789ABCDEF';
	for (i = 0; i < 32; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	// bits 12-15 of the time_hi_and_version field to 0010
	s[12] = '4';
	// bits 6-7 of the clock_seq_hi_and_reserved to 01	
	s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);
	uuid = 'jsonp_' + s.join('');
	return uuid;
}

function noop() {}

var target = {
	debug: false,
	log: function(msg) {
		if (global.console && this.debug) {
			global.console.log(msg);
		}
	},
	get: function(url, options) {
		if (typeof url === 'object') {
			options = url;
			url = options.url;
		}
		var me      = this, 
			url     = url + '?',
			param   = options.param,
			charset = options.charset,
			success = options.success || noop,
			failure = options.failure || noop,
			scope   = options.scope || global,
			timestamp = options.timestamp,
			jsonpName = options.jsonpName || 'callback',
			callbackName = options.jsonpCallback || generateRandomName();
		
		if (param && typeof param === 'object') {
			param = paramsToString(param);
		}
		var script = doc.createElement('script');
		
		function callback(isSucc) {
			if (isSucc) {
				done = true;
				me.log('Request success!');
			} else {
				failure.call(scope);
				me.log('Request failed!');
			}
			// Handle memory leak in IE
			script.onload = script.onerror = script.onreadystatechange = null;
			if ( head && script.parentNode ) {
				head.removeChild(script);
				script = null;
				global[callbackName] = undefined;
				me.log("Garbage collecting!");
			}
		}
		function fixOnerror() {
			setTimeout(function() {
				if (!done) {
					callback();
				}
			}, timeout);
		}
		if (ie678) {
			script.onreadystatechange = function() {
				var readyState = this.readyState;
				if (!done && (readyState == 'loaded' || readyState == 'complete')) {
					callback(true);
				}
			};
			
		} else {
			script.onload = function() {
				callback(true);
			};
			script.onerror = function() {
				callback();
			};
			if (opera) {
				fixOnerror();
			}
		}
		
		url += jsonpName + '=' + callbackName;
		
		if (charset) {
			script.charset = charset;
		}
		if (param) {
			url += '&' + param;
		}
		if (timestamp) {
			url += '&ts=';
			url += (new Date).getTime();
		}
		
		global[callbackName] = function(json) {
			success.call(scope, json);
		};
		
		this.log('Getting JSONP data');
		script.src = url;
		head.insertBefore(script, head.firstChild);
	}
}

return target;
}(this);

var isIE = document.all ? true: false;
if (isIE) {
	window.opener = window.dialogArguments.win;
}
if (!window.JSON) {
	window.JSON = opener.JSON;
}
function $(id) {
	if (typeof(id) == "string") return document.getElementById(id);
	else return id;
}
function timeStamp() {	
	var now = new Date();
	return (now.getTime());
}
function getCookie(name){
	var tmp, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)","gi");
	if( tmp = reg.exec( unescape(document.cookie) ) )
		return(tmp[2]);
	return null;
}
function setCookie(name, value, expires, path, domain) {
	var str = name + "=" + escape(value);
	if (expires) {
		if (expires == 'never') {expires = 100*365*24*60;}
		var exp = new Date(); 
		exp.setTime(exp.getTime() + expires*60*1000);
		str += "; expires="+exp.toGMTString();
	}
	if (path) {str += "; path=" + path;}
	if (domain) {str += "; domain=" + domain;}
	document.cookie = str;
}
//	把一段普通的字符串转换成为一段html内容
function escapeHTML(str) {
	str = str.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;").replace(/'/gm, "&#39;");
	return str;
}
//	把多行的内容换成一行
function noMultiline(str) {
	str = str.replace(/\r/gm,"").replace(/\n/,"");
	return str;
}

var defaultSetCount = 10;
var defaultPhotoCount = 15;
var defaultSetCount_flash = 9;
var displayTab = 0;

function getAlign()	{
	if($("f_align").checked) return $("f_align").value;
	if($("f_align_left").checked) return $("f_align_left").value;
	if($("f_align_center").checked) return $("f_align_center").value;
	if($("f_align_right").checked) return $("f_align_right").value;
	return "";
}
// 只插入公开的相册图片
function filterAlbum(arr) {
	var rs = [], i, album;
	for (i=0; i<arr.length; i++) {
		album = arr[i];
		if (album.permission == 0) {
			rs.push(album);
		}
	}
	return rs;
}
function setFlashPhoto(jsonObj) {
	var photos = jsonObj.data.photoList,
		photoLength = photos.length;

	var param = {
		type: 'flash',
		kind: flashCfg.selectedMode,
		url: flashCfg.selectedCover,
		name: noMultiline(escapeHTML(flashCfg.selectedName)),
		desc: noMultiline(escapeHTML(flashCfg.selectedDesc)),
		link: 'http://pp.sohu.com/u/' + flashCfg.userId + '/f' + flashCfg.selectedSet,
		count: photoLength,
		data: []
	};

	for (var i=0; i<photoLength; i++) {
		var photoNow = photos[i];
		var uId = photoNow.creatorId;
		var pId = photoNow.showId;
		var url = photoNow.originUrl + '_c150';
		var link = "http://pp.sohu.com/u/" + uId + "/p" + pId;
		var alt = noMultiline(escapeHTML(photoNow.uploadAtDesc));
		param.data.push({url:url,alt:alt,link:link});
	}
	if (param.count > 0) {
		callback(param);
	} else {
		alert("此专辑中没有任何图片！");
	}
}
function getSetList(pageNo) {
	flashCfg.setListCtr.innerHTML = "正在读取专辑信息......";
	flashCfg.setPageNo = pageNo;
	var url = 'http://pp.sohu.com/folders/' + pageNo + '.jsonp';
	var option = {
		param: 'pageSize='+defaultSetCount_flash,
		charset: 'utf-8',
		success: setSetList,
		failure: failure
	};
	Sjax.get(url, option);
}
function setSetList(jsonObj) {
	var listStr = '',
		pageStr = '',
		photosets = filterAlbum(jsonObj.folderList);

	flashCfg.userId = jsonObj.creator.userId;

	if (photosets.length == 0) {
		Tabs.hasPP = false;
		hideBotton();
		listStr = '您还没有公开的相册专辑，何不去<a href="http://pp.sohu.com" target="_blank">创建</a>一个?';
	} else {
		var i,
			len = photosets.length,
			prePage = flashCfg.setPageNo-1,
			nextPage = jsonObj.hasNextPage ? flashCfg.setPageNo+1 : 0;
		
		for (i=0; i<len; i++) {
			var setNow = photosets[i];
			if (setNow && setNow.showId) {
				var pId = setNow.showId,
					pName = setNow.name,
					pDesc = setNow.description,
					pCover = (setNow.cover||{}).url,
					pCount = setNow.photoNum;
				listStr += '<div id="photoSet'+pId+'" onclick="selectSet(\'' + pId + '\', \'' + pCover + '\', \'' + pName + '\', \'' + pDesc + '\')" class="' + ((flashCfg.selectedSet==pId)?"albumCoverPicSelected":"albumCoverPic") + '"><div class="albumCover"><img src="' + pCover + '" height="75" width="75" class="coverPic" /></div><div class="albumTitle">'+pName+'</div></div>';
			}
		}
		pageStr += '<input type="button" value="上一页" onclick="getSetList(' + prePage + ');" ' + (prePage>0 ? '' : 'disabled') + ' class="' +(prePage>0 ? 'buttonEnable' : 'buttonDisable') + '" />';
		pageStr += '&nbsp;<input type="button" value="下一页" onclick="getSetList(' + nextPage + ');" ' + (nextPage>1 ? '' : 'disabled') + ' class="' + (nextPage>1 ? 'buttonEnable' : 'buttonDisable') +'"/>';
	}
	flashCfg.setListCtr.innerHTML = listStr;
	flashCfg.setPageCtr.innerHTML = pageStr;
}
function selectSet(setId, cover, name, desc) {
	if(flashCfg.selectedSet != "") {
		var oldSet = $("photoSet" + flashCfg.selectedSet);
		if(oldSet) oldSet.className = "albumCoverPic";
	}
	flashCfg.selectedSet = setId;
	flashCfg.selectedCover = cover;
	flashCfg.selectedName = name || '';
	flashCfg.selectedDesc = desc || '';
	$("photoSet" + setId).className = "albumCoverPicSelected";
}
function selectMode(id) {
	$("showMode" + id).checked = true;
	flashCfg.selectedMode = id;
}

function getAlbums(pageNo) {
	var url = 'http://pp.sohu.com/folders/' + pageNo + '.jsonp';
	ppCfg.setListCtr.innerHTML = "正在读取专辑信息......";
	ppCfg.setPageNo = pageNo;
	function success(jsonObj) {
		var listStr = '',
			pageStr = '',
			photosets = filterAlbum(jsonObj.folderList);
		if (photosets.length == 0) {
			Tabs.hasPP = false;
			hideBotton();
			listStr = '您还没有公开的相册专辑，何不去<a href="http://pp.sohu.com" target="_blank">创建</a>一个?';
		} else {
			var i,
				len = photosets.length,
				prePage = ppCfg.setPageNo - 1,
				nextPage = jsonObj.hasNextPage ? ppCfg.setPageNo + 1 : 0;
			for (i=0; i<len; i++) {
				var setNow = photosets[i];
				if (setNow && setNow.showId) {
					var sId = setNow.showId,
						pName = setNow.name,
						pCover = (setNow.cover || {}).url,
						pCount = setNow.photoNum;
					listStr += '<div class="albumCoverPic" id="' + sId + '" onclick="getPhotos(1,\''+sId+'\','+pCount+')"><div class="albumCover"><img src="' + pCover + '" height="75" width="75" class="coverPic" /></div><div class="albumTitle">'+pName+'</div></div>';
				}
			}
			pageStr += '<input class="'+(prePage>0? "buttonEnable" : "buttonDisable") + '" type="button" value="上一页" onclick="getAlbums(' + prePage + ');" '+ (prePage>0 ? "" : "disabled") + ' />';
			pageStr += '&nbsp;<input class="'+(nextPage>1?"buttonEnable":"buttonDisable") + '" type="button" value="下一页" onclick="getAlbums(' + nextPage + ');" '+(nextPage>1?"" : "disabled") + ' />';	
		}
		ppCfg.setListCtr.innerHTML = listStr;
		ppCfg.setPageCtr.innerHTML = pageStr;
	}
	var option = {
		url: url,
		charset: 'utf-8',
		param: 'pageSize=10',
		success: success,
		failure: failure
	};
	Sjax.get(option);
}
function getPhotos(pageNo, setId, count) {
	ppCfg.photoListCtr.innerHTML = "正在读取图片信息......";
	ppCfg.photoPageCtr.innerHTML = " ";
	ppCfg.photoAllCtr.innerHTML = " ";
	
	if(arguments.length > 2) {
		ppCfg.pageCount = Math.ceil(count/defaultPhotoCount);
	}
	if(!setId) {
		setId = ppCfg.setId;
	} else {
		ppCfg.photoPageCtr.innerHTML = "";
		ppCfg.photoAllCtr.innerHTML = "";
		var el = $(ppCfg.setId);
		if ( ppCfg.setId && el ) {
			el.className = "albumCoverPic";	
		}
		ppCfg.setId = setId;
		$(setId).className = "albumCoverPicSelected";
	}
	ppCfg.photoPageNo = pageNo;
	var url = 'http://pp.sohu.com/folders/' + setId + '/photos/' + pageNo + '.jsonp';
	var option = {
		charset: 'utf-8',
		param: 'pageSize='+defaultPhotoCount,
		success: setPhotoList,
		failure: failure
	};
	Sjax.get(url, option);
}
function setPhotoList(jsonObj) {
	if (!jsonObj.status) return;

	var photoData = jsonObj.data.photoList,
		photoLength = photoData.length;

	var prePage = (ppCfg.photoPageNo>1) ? ppCfg.photoPageNo-1 : 0,
		nextPage = jsonObj.data.hasNextPage ? ppCfg.photoPageNo+1 : 0;

	var listStr = "";
	if (photoLength > 0) {
		showTip();
		for (var i=0;i<photoLength;i++) {
			var photoNow = photoData[i],
				uId = photoNow.creatorId,
				pId = photoNow.showId,
				pSmall = photoNow.url,
				pMiddle = photoNow.originUrl,
				pDesc = photoNow.uploadAtDesc.replace(/\n/g, ''),
				view = "http://pp.sohu.com/u/" + uId + '/p' + pId,
				shortDesc = (pDesc.length>5) ? pDesc.substr(0,5)+'...' : pDesc;
			shortDesc = noMultiline(escapeHTML(shortDesc));
			pDesc = noMultiline(escapeHTML(pDesc));
			listStr += '<div id="divOption' + pId + '" class="'+(ppCfg.photos[pId]?'photolistSelected':'photolist')+'" onclick="selectOrCancel(\''+pId+'\',\''+pSmall+'\',\''+pMiddle+'\',\''+pDesc+'\',\''+view+'\')" ><div class="photoCover"><img src="'+pSmall+'" /></div><div class="photoTitle">'+shortDesc+'</div></div>';
		}
	} else {
		listStr = "此专辑中没有图片！";
		showTip("noPhoto");
	}
	
	var pageStr = '';
	pageStr += '<input class="'+(prePage>0?"buttonEnable":"buttonDisable")+'" type="button" value="首页" onclick="getPhotos(1)" '+(prePage>0?"":"disabled")+' />';
	pageStr += '&nbsp;<input class="'+(prePage>0?"buttonEnable":"buttonDisable")+'" type="button" value="上一页" onclick="getPhotos(' + prePage + ')" '+(prePage>0?"":"disabled")+'  />';
	pageStr += '&nbsp;<input class="'+(nextPage>1?"buttonEnable":"buttonDisable")+'" type="button" onclick="getPhotos(' + nextPage + ');" value="下一页" '+(nextPage>1?"":"disabled")+'  />';
	pageStr += '&nbsp;<input class="'+(nextPage>1?"buttonEnable":"buttonDisable")+'" type="button" onclick="getPhotos(' + ppCfg.pageCount + ');" value="末页" '+(nextPage>1?"":"disabled")+'  />';
	
	var pageAllStr = '<input type="button" value="全选" class="'+(photoLength>0?"buttonEnable":"buttonDisable")+'" onclick="selectAll()" '+(photoLength>0?"":"disabled")+'  />';
	ppCfg.photoListCtr.innerHTML = listStr;
	ppCfg.photoPageCtr.innerHTML = pageStr;
	ppCfg.photoAllCtr.innerHTML = pageAllStr;
}
function selectAll() {
	var nodes = ppCfg.photoListCtr.childNodes;
	var nodesLength = nodes.length;
	for (var i=0; i<nodesLength; i++) {
		if (nodes[i].className === "photolist") {
			nodes[i].click();
		}
	}
}
function cancelAll() {
	var photoData = ppCfg.photos;
	for (var photoItem in photoData) {
		if (photoData[photoItem].url) {
			selectOrCancel(photoItem);
		}
	}
}
function selectOrCancel(id,small,middle,desc,link) {
	var photoData = ppCfg.photos;
	var photoArr = ppCfg.photoArr;

	if(typeof photoData[id] == "object") {
		ppCfg.selectedCtr.removeChild($('divSelect' + id));
		delete photoData[id];
		var photoListItem = $("divOption" + id);
		if(photoListItem) photoListItem.className = "photolist";
	} else {
		var selectDiv = document.createElement("div");
		selectDiv.id = "divSelect" + id;
		selectDiv.className = "photolist";
		selectDiv.innerHTML = '<div class="photoCover" onclick="selectOrCancel(\''+id+'\')"><img src="'+small+'" title="'+desc+'" /></div>';
		ppCfg.selectedCtr.appendChild(selectDiv);
		
		photoData[id] = {
			url: middle,
			alt: desc,
			link: link
		};
		photoArr.push(photoData[id]);

		$("divOption" + id).className = "photolistSelected";
		selectDiv.scrollIntoView();
	}
		
	var selectedCount = ppCfg.selectedCtr.children.length;
	$("showSelectedCount").innerHTML = selectedCount;
	
	if(selectedCount < 1) {
		ppCfg.cancelAllCtr.disabled = true;
		ppCfg.cancelAllCtr.className = "buttonDisable";
	} else {
		ppCfg.cancelAllCtr.disabled = false;
		ppCfg.cancelAllCtr.className = "buttonEnable";
	}
}
function failure() {
	alert('读取数据失败，请重新操作！');
}

~function() {
	var imgArr = [],
		urlArr = [];

	function NOOP() {}
	function init_net()	{
		window.netCfg = [$('netUrl1'), $('netUrl2'), $('netUrl3'), $('netUrl4'), $('netUrl5')];
		window.netCfgCtr = [$('f_url1'), $('f_url2'), $('f_url3'), $('f_url4'), $('f_url5')];
		if (window.dialogArguments.obj) {
			for (var i=netCfg.length-1; i>0; i--) {
				netCfg[i].style.display = 'none';
			}
		}
	}
	function init_pp() {
		window.ppCfg = {
			setListCtr: $("setListCtr"),
			setPageCtr: $("setPageCtr"),
			photoListCtr: $("photoListCtr"),
			photoPageCtr: $("photoPageCtr"),
			selectedCtr: $("selectedCtr"),
			photoAllCtr: $("photoAllCtr"),
			cancelAllCtr: $("cancelAllCtr"),
			setPageNo: 1,
			photoPageNo: 1,
			pageCount: 1,
			photos: {},
			photoArr: []
		};
		getAlbums(1);
	}
	function init_flash() {
		window.flashCfg = {
			setListCtr: $("flashSetList"),
			setPageCtr: $("flashSetPage"),
			showCount: $("showPhotoCount"),
			setPageNo: 1,
			selectedSet: '',
			selectedMode: 1
		};
		getSetList(1);
	}
	function onOk_local() {
		if (!localParam.data.length) {
			alert('请选择照片！');
			return;
		}
		localParam.align = getAlign();
		setTimeout(function(){
			callback(localParam)	
		}, 100)
		
	}
	function onOk_net() {
		var i, photoData = [];
		for (i=0; i<netCfgCtr.length; i++)	{
			var valueNow = netCfgCtr[i].value;
			if (valueNow && valueNow != 'http://') {
				photoData.push({url:valueNow});
			}
		}
		if (photoData.length > 0) {
			var param = {
				type: 'imgs',
				align: getAlign(),
				data: photoData
			};
			callback(param);
		} else {
			alert('请输入网络图片的地址！');
		}
	}
	function onOk_pp() {
		var photoArr = ppCfg.photoArr;
		if (photoArr.length > 0) {
			var param = {
				type:"imgs",
				align: "center",
				data:photoArr,
				showMemo: $("isAddMemo").checked
			};
			callback(param);
		} else {
			alert('请选择照片！');
		}
	}
	function onOk_flash() {
		if (flashCfg.selectedSet == "") {
			alert("请选择专辑！");
			return;
		}
		var url = 'http://pp.sohu.com/folders/' + flashCfg.selectedSet + '/photos.jsonp';
		var option = {
			charset: 'utf-8',
			success: setFlashPhoto,
			failure: failure
		};
		Sjax.get(url, option);
	}
	function initConfig(imgObject) {
		window.popBottom = $("popBottom");
		window.popButton = $("artItem-button");
		window.infoBox = $("artItem-infoBox");
		
		if (getCookie('editor_insertImg_saveSetting')) {
			$('saveSetting').checked = 'checked';
			switch (getCookie('editor_insertImg_imgLayout')) {
				case "none" : $('f_align').checked = 'checked'; break;
				case "left" : $('f_align_left').checked = 'checked'; break;
				case "center" : $('f_align_center').checked = 'checked'; break;
				case "right" : $('f_align_right').checked = 'checked'; break;
				default : $('f_align_center').checked = 'checked'; break;
			}
		} else {
			$('saveSetting').checked = false;
			$('f_align_center').checked = 'checked';
		}
		
		if (imgObject) {
			displayTab = 2;
			if (imgObject.src) {
				$("f_url1").value = imgObject.src;
			}
			var float = isIE ? imgObject.style.styleFloat : imgObject.style.cssFloat
			if (float) {
				if (float.toLowerCase() == "left") {
					$('f_align_left').checked = 'checked';
				} else {
					if (float.toLowerCase() == "right") {
						$('f_align_right').checked = 'checked';
					}
				}
			} else {
				if (imgObject.style.textAlign) {
					if (imgObject.style.textAlign.toLowerCase() == "center") {
						$('f_align_center').checked = 'checked';
					}
				} else {
					$('f_align').checked = 'checked';
				}
			}
		} else {
			if (getCookie("editor_image_tab")) {
				displayTab = parseInt(getCookie("editor_image_tab"));
			}
		}
		if (displayTab == -1) {
			displayTab = 1;
		}
		swapBoard(displayTab);
	}

	var localUpload,
		progressId = 'progress',
		localParam = {
			type: 'imgs',
			align: '',
			data: []
		};

	function fileQueued(file, xhr) {
		try {
			var progress = new FileProgress(file, progressId);
			var uploadInstance = this;
			if (xhr) {
				uploadInstance = xhr;
			}
			progress.toggleCancel(true, uploadInstance);
		} catch (ex) {}			
	}
	function uploadProgress(file, bytesLoaded, bytesTotal) {
		try {
			var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
			var progress = new FileProgress(file, progressId);
			progress.setProgress(percent);
			progress.setStatus("上传中...");
		} catch (e) {}
	}	
	function uploadSuccess(file, serverData) {
		try {
			var progress = new FileProgress(file, progressId);
			progress.setComplete();
			progress.setStatus("上传成功！");
			progress.toggleCancel(false);

			var obj = typeof serverData === 'object' ? serverData : JSON.parse(serverData);
			if (obj.status) {
				localParam.data.push({
					url: obj.data.origin_url,
					width: obj.data.width
				})
			}
		} catch (ex) {}
	}	
	function initSwfUpload() {
		var span = document.createElement('span');
		span.id = 'spanButton';
		var tab0 = Tabs[0].tab;
		tab0.insertBefore(span, tab0.children[0]);

		var settings = {
			flash_url : "http://js3.pp.sohu.com.cn/ppp/swf/swfupload.swf",
			upload_url: "http://pp.sohu.com/upload",
			post_params: {},
			file_size_limit : "10 MB",
			file_types : "*.jpg;*.jpeg;*.gif;*.png",
			file_upload_limit : 10,
			file_queue_limit : 0,
			custom_settings : {
				progressTarget: 'progress',
				cancelButtonId: 'cancelAllBtn'
			},
			// button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,
			debug: false,

			// Button settings
			button_image_url: "http://js2.pp.sohu.com.cn/ppp/blog/styles/images/editor/upload.png",
			button_width: "95",
			button_height: "30",
			button_placeholder_id: "spanButton",
			
			// The event handler functions are defined in handlers.js
			file_queued_handler: fileQueued,
			file_queue_error_handler : fileQueueError,
			file_dialog_complete_handler: fileDialogComplete,
			upload_progress_handler: uploadProgress,
			upload_success_handler: uploadSuccess,
			upload_complete_handler: uploadComplete
		};

		function fileDialogComplete(numFilesSelected, numFilesQueued) {
			try {
				this.startUpload();
			} catch (ex) {}
		}
		function fileQueueError(file, errorCode, message) {
			try {
				if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
					alert('最多只能选择10张图片.');
					return;
				}
				var progress = new FileProgress(file, progressId);
				progress.setError();
				progress.toggleCancel(false);

				switch (errorCode) {
					case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
						progress.setStatus('文件太大，不能超过10M.');
						break;
					case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
						progress.setStatus('不能上传0字节的文件.');
						break;
					case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
						progress.setStatus("文件格式不正确，只能上传图片.");
						break;
					case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
						alert("You have selected too many files.  " +  (message > 1 ? "You may only add " +  message + " more files" : "You cannot add any more files."));
						break;
					default:
						if (file !== null) {
							progress.setStatus("Unhandled Error");
						}
						break;
				}
			} catch (ex) {}
		}
		function uploadComplete(file) {
			try {
				this.startUpload();
			} catch (ex) {}
		}

		localUpload = new SWFUpload(settings);

		var cancelAllEl = $('cancelAllBtn');
		cancelAllEl.onclick = function() {
			var stats;
			cancelAllEl.disabled = true;
			localUpload.stopUpload();
			do {
				stats = localUpload.getStats();
				localUpload.cancelUpload();
			} while (stats.files_queued !== 0);
		};

	}

	function initXhrUpload() {
		var div = document.createElement('div');
		div.className = 'btnWrap';
		var	str = '<div id="coverBtn"></div>' +
				  '<input id="uploadBtn" type="file" multiple accept="image/*"/>';
		
		div.innerHTML = str;

		var tab0 = Tabs[0].tab;
		tab0.insertBefore(div, tab0.children[0]);

		var uploadBtn = $('uploadBtn'), 
			coverBtn = $('coverBtn');

		uploadBtn.onmouseover = function() {
			coverBtn.className = 'coverBtn-hover';
		};
		uploadBtn.onmouseout = function() {
			coverBtn.className = '';
		};

		var input = $('uploadBtn');
		var settings = {
			url: 'http://pp.sohu.com/upload',
			refile: /(?:png|jpg|jpeg|gif)/,
			credential: true,
			params: {},
			fileQueued: fileQueued,
			success: uploadSuccess,
			progress: uploadProgress,
			checkMaximun: function() {
				alert('最多只能选择10张图片.')
			},
			checkMaximize: function(file) {
				var progress = new FileProgress(file, progressId);
				progress.setError();
				progress.toggleCancel(false);
				progress.setStatus('文件太大，不能超过10M.');
			},
			failure: function(file) {
				var progress = new FileProgress(file, progressId);
				progress.setError();
				progress.toggleCancel(false);
				progress.setStatus('上传失败，请稍后再试.');
			}
		};
		var xhrUpload = XHRUpload(input, settings);

		var cancelAllEl = $('cancelAllBtn');
		cancelAllEl.onclick = function() {
			cancelAllEl.disabled = true;
			xhrUpload.cancel()
		};		

	}

	//	初始化方法
	window.onload = function() {
		if (isIE) {
			window.opener = window.dialogArguments.win;	
		}

		var imgObject = window.dialogArguments.obj;
		window.Tabs = [
			{label: $('imgLabel_0'), tab: $('imgBox0'), init: NOOP, onOk: onOk_local},		
			{label: $('imgLabel_1'), tab: $('imgBox1'), init: init_net, onOk: onOk_net},		
			{label: $('imgLabel_2'), tab: $('imgBox2'), init: init_pp, onOk: onOk_pp},		
			{label: $('imgLabel_3'), tab: $('imgBox3'), init: init_flash, onOk: onOk_flash}
		];

		Tabs.hasPP = true;
		Tabs.selectedIndex = -1;
		Tabs.tip = $("tabTip");
		initConfig(imgObject);

		if (isIE) {
			initSwfUpload();
		} else {
			initXhrUpload();
		}			

	};

}();

function showTip(name) {
	var Tips = [
		{
			intro: '提示：通过下面的操作，您可以把电脑中的某张图片添加到日志中。'
		},
		{
			intro: '提示：您只需要找到<font color=\"red\">搜狐网站</font>内图片的网络地址，即可将一张或多张网络图片添加到日志中。'
		},
		{
			intro: '提示：通过下面的操作，您可以把你的图片公园相册中的图片添加到日志中。',
			noPhoto: '<font color="red">提示：此专辑中没有任何图片，请先到您的图片公园相册中添加图片！</font>'
		},
		{
			intro: '提示：通过下面的操作，某一专辑将以指定的显示方式添加到日志中。'
		},
		{
			intro: ''
		}
	];
	if (!name) {
		name = 'intro';
	}
	var tipId = Tabs.selectedIndex;
	Tabs.tip.innerHTML = Tips[tipId][name];
}

//	控制哪个Tab页显示
function swapBoard(_id) {
	if(Tabs.selectedIndex > -1) {
		Tabs[Tabs.selectedIndex].label.className = 'contentLabel';
		Tabs[Tabs.selectedIndex].tab.style.display = 'none';
	}
	Tabs.selectedIndex = _id;
	Tabs[_id].label.className = 'contentLabelActive';
	Tabs[_id].tab.style.display = 'block';
	
	showTip();
	
	if(!Tabs[_id].initGood) {
		Tabs[_id].init();
		Tabs[_id].initGood = true;
	}
	
	if( (_id == 2 || _id == 3) && !Tabs.hasPP ) {
		hideBotton();
	} else {
		popBottom.style.display = '';
		popButton.style.display = '';
	}
	
	if(_id == 0 || _id == 1) {
		infoBox.style.display = '';
	} else {
		infoBox.style.display = 'none';
	}
}
function hideBotton() {
	popBottom.style.display = "none";
	popButton.style.display = "none";
}
// 提交时的处理方法,转到现在打开的Tab页的处理方法
function onOK() {
	Tabs[Tabs.selectedIndex].onOk()
}
//	取消是的处理方法  --  待写
function onCancel() {
	cancel()
}
// 下面为POP中通用的方法
function callback(param) {
	window.dialogArguments.controler.sohu.selectCall.call(null, param);
	closeNow();
}
function closeNow() {
	if ($('saveSetting').checked) {
		setCookie('editor_insertImg_saveSetting', 'true', 'never');
		setCookie('editor_insertImg_imgLayout', getAlign(), 'never');
	} else {
		setCookie('editor_insertImg_saveSetting', '', 'never');
		setCookie('editor_insertImg_imgLayout', '', 'never');
	}
	setCookie("editor_image_tab", Tabs.selectedIndex.toString(), "never");
	window.onunload = null;
	window.close();
}
function cancel() {
	window.dialogArguments.controler.sohu.cancelCall.call();
	closeNow();
}
window.onunload = cancel;


