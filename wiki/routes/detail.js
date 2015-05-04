var org = require('./org');
var suggest = require('./suggest');
var count = require('./count');

//渲染博客详情页
module.exports = function(req, res, next){
	res.render('detail/index', {
		org: org.get(), 
		sugPages: suggest.get(),
		count: count.articles()
	});
};
