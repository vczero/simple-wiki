var fs = require('fs');

//读取文章简介
module.exports = function(req, res, next){
	fs.readFile('./public/blog/main.json', function(err, data){
		if(!err){
			var pages = JSON.parse(data.toString());
			console.log(pages);
			res.render('home/index', {pages: pages});
		}else{
			next();
		}
	});
};