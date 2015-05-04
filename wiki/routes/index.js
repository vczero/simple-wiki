var fs = require('fs');
var org = require('./org');
var suggest = require('./suggest');
var count = require('./count');

//读取文章简介
//这个后端渲染模板
module.exports = function(req, res, next){
	fs.readFile('./public/blog/main.json', function(err, data){
		console.log(count);
		if(!err){
			var pages = JSON.parse(data.toString());
			res.render('home/index', {
				pages: pages, 
				org: org.get(),
				sugPages: suggest.get(),
				count: count.articles()
			});
		}else{
			next();
		}
	});
};