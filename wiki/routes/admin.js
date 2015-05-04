
var org = require('./org');

//渲染页面－管理员登录
module.exports = function(req, res){
	res.render('admin/index', {user: req.session.user, org: org.get()});
};
