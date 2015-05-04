var fs = require('fs');
var org = require('./org');
var suggest = require('./suggest');

//读取文章简介
//这个后端渲染模板
module.exports = function(req, res, next){
	fs.readFile('./public/blog/main.json', function(err, data){
		if(!err){
			var pages = JSON.parse(data.toString());
			res.render('home/index', {
				pages: pages, 
				org: org.get(),
				sugPages: suggest.get()
			});
		}else{
			next();
		}
	});
};