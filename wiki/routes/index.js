var fs = require('fs');
var org = require('./org');
var suggest = require('./suggest');
var count = require('./count');
var picpages = require('./picpages');

//读取文章简介
//这个后端渲染模板
module.exports = function(req, res, next){
	fs.readFile('./public/blog/main.json', function(err, data){
		if(!err){
			var pages = JSON.parse(data.toString());
			res.render('home/index', {
				pages: pages, 
				org: org.get(),
				sugPages: suggest.get(),
				picpages: picpages.get(),
				count: count.articles()
			});
		}else{
			next();
		}
	});
};