var querystring = require('querystring'),
	_ = require('underscore'),
	request = require('request');

var SDK = function(api_key, api_secret) {
    if (!api_key || !api_secret) return false;
    this.api_key = api_key;
    this.api_secret = api_secret;
};

SDK.prototype.apiUrl = function(path){
	return 'https://apicn.faceplusplus.com/v2/' + path;
};

SDK.prototype.get = function(path, data, callback){
	var url = this.apiUrl(path);
		params = _.extend({
			api_key		: this.api_key,
			api_secret	: this.api_secret,
		}, data);
	
	url += '?' + querystring.stringify(params);
	
	request.get(url, {json : true}, callback);
};

SDK.prototype.post = function(path, data, callback){
	var url = this.apiUrl(path),
		params = _.extend({
			api_key		: this.api_key,
			api_secret	: this.api_secret,
		}, data);
	
	request.post(url, {json : true, form:params}, callback);
};

SDK.prototype.postMulti = function(path, data, callback){
        var url = this.apiUrl(path);

	var r = request.post(url, {json : true}, callback);
	
	var form = r.form();
	form.append('api_key', this.api_key);
	form.append('api_secret', this.api_secret);
	_.each(data, function(obj, key){
		form.append(key, obj.value, obj.meta);
	});
};

module.exports = SDK;
