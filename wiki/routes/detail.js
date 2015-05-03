

module.exports = function(req, res, next){
	var name = req.param('name');
	res.render('detail/index', {blogName: name});
};
