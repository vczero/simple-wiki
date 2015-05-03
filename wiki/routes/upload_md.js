var fs = require('fs');
var formidable = require('formidable');
var markdown = require('markdown').markdown;

module.exports = function(req, res, next){
	var form = new formidable.IncomingForm();
	var UPLOAD_DIR = 'public/uploader_md/';
	var MD_DIR = './views/blog/';
	form.maxFieldsSize = 2 * 1024 * 1024;
	form.maxFields = 1000;
	form.uploadDir = UPLOAD_DIR;
    form.parse(req, function(err, fields, files) {
    		if(!err){
      		var name = UPLOAD_DIR + Date.parse(new Date) + '_' + files.file.name;
      		//重命名
        		fs.renameSync(files.file.path, name);
        		//生成HTML
        		fs.readFile(name, function(err, data){
				if(!err){
					data = data.toString();
					var md = markdown.toHTML(data);
					var newName = name.split(UPLOAD_DIR)[1].split('.')[0] + '.ejs';
					fs.writeFile(MD_DIR + newName, md, function(err){
						if(!err){
							var obj = {
								status: 1,
								path: MD_DIR + newName
							};
							return res.send(obj);
						}else{
							return res.send({status: 0});
						}
					});
				}else{
					return res.send({status: 0});
				}
			});			     		
    		}else{
    			return res.send({status: 0});
    		}
    });
};
