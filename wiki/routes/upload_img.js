
var formidable = require('formidable');
var fs = require('fs');

module.exports = function(req, res, next){
	var form = new formidable.IncomingForm();
	var UPLOAD_DIR = 'public/uploader_img/';
	form.maxFieldsSize = 2 * 1024 * 1024;
	form.maxFields = 1000;
	form.uploadDir = UPLOAD_DIR;
    form.parse(req, function(err, fields, files) {
    		if(!err){
      		var name = UPLOAD_DIR + Date.parse(new Date) + '_' + files.file.name;
      		var obj = {
      			status: 1
      		};
      		obj.path = name.split('public/')[1];
        		fs.renameSync(files.file.path, name);
      		return res.send(obj);
    		}else{
    			return res.send({status: 0});
    		}
    });
};
