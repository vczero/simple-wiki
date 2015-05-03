

module.exports = function(req, res){
	res.render('admin/index', {user: req.session.user});
};
