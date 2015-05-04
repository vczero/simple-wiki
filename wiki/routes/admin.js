
var org = require('./org');
var suggest = require('./suggest');
var count = require('./count');

//渲染页面－管理员登录
module.exports = function(req, res){
	res.render('admin/index', {
		user: req.session.user, 
		org: org.get(), 
		sugPages: suggest.get(),
		count: count.articles()
	});
};
