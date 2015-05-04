var fs = require('fs');
var org = require('./org');
var suggest = require('./suggest');
var count = require('./count');
var picpages = require('./picpages');

module.exports = function(req, res){
	var data = fs.readFileSync('./suggest.json');
	var suggestObj = JSON.parse(data.toString());
	
	console.log(picpages.get());
	res.render('edit/index', {
		org: org.get(), 
		suggest: suggestObj, 
		user: req.session.user,
		sugPages: suggest.get(),
		picpages: picpages.get(),
		count: count.articles()
	});
};
