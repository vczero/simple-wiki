
/*
 * 邮件服务 
 * */
var mongoskin = require('mongoskin');
var config = require('../config');

module.exports = (function(){
	var str = 'mongodb://' + config.dbUser;
		str += ':' + config.dbPwd + '@';
		str += config.host + ':' + config.dbPort;
		str += '/' + config.dbName;
		
	var opts = {
		native_parser: true
	};
	return mongoskin.db(str, opts);
})();
