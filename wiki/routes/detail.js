var org = require('./org');

//渲染博客详情页
module.exports = function(req, res, next){
	res.render('detail/index', {org: org.get()});
};
