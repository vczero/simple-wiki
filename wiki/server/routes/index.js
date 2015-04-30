var express = require('express');
var router = express.Router();

//home page
router.get('/', function(req, res, next) {
	res.render('home/index', { title: 'Express' });
});

module.exports = router;
