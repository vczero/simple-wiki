var fs = require('fs');
var org = require('./org');
var suggest = require('./suggest');


module.exports = function(req, res){
	var data = fs.readFileSync('./suggest.json');
	var suggestObj = JSON.parse(data.toString());
	
	res.render('edit/index', {
		org: org.get(), 
		suggest: suggestObj, 
		user: req.session.user,
		sugPages: suggest.get()
	});
};
