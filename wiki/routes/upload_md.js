var fs = require('fs');
var formidable = require('formidable');
var markdown = require('markdown').markdown;

module.exports = function(req, res, next){
	var form = new formidable.IncomingForm();
	var UPLOAD_DIR = 'public/uploader_md/';
	var MD_DIR = 'public/blog/';
	var errorSatus = {status: 0};
	
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
					var newName = name.split(UPLOAD_DIR)[1].split('.')[0] + '.json';
					//增加main.json文件简介
					var introObj = {
						author: fields.author,
						time: (new Date()).toString(),
						title: fields.title,
						type: fields.articleType,
						tags: fields.tags,
						introdu: fields.introdu,
						id: newName
					};
					//创建文章
					var articleObj = {};
					articleObj[newName] = md;
					articleObj.comments = [];
					try{
						var mainJSON = JSON.parse(fs.readFileSync(MD_DIR + 'main.json').toString());
						mainJSON.splice(0, 0, introObj);
						fs.writeFileSync(MD_DIR + newName, JSON.stringify(articleObj));
						fs.writeFileSync(MD_DIR + 'main.json', JSON.stringify(mainJSON));
					}catch(e){
						return res.send(errorSatus);
					}
					var obj = {
						status: 1,
						path: MD_DIR + newName
					};
					return res.send(obj);
					
				}else{
					return res.send(errorSatus);
				}
			});			     		
    		}else{
    			return res.send(errorSatus);
    		}
    });
};
