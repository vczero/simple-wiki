var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var home = require('./routes/index');
var list = require('./routes/list');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("view options",{                                                                                          
	'layout': false
});

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/list', list);


//404处理
app.use(function(req, res, next) {
	var err = new Error('Not Found');
  	err.status = 404;
  	next(err);
});



//开发模式的错误异常处理
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
    		res.render('common/404', {
      		message: err.message,
      		error: err
    		});
  	});
}

//生产环境的错误处理
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('common/404', {
   		 message: err.message,
    		error: {}
  	});
});

var markdown = require('markdown').markdown;
var fs = require('fs');
fs.readFile('./1.md', function(err, data){
	if(!err){
		data = data.toString();
		console.log(data);
		console.log('--------');
		var md = markdown.toHTML(data);
		fs.writeFile('./test.html', md, function(err){
			if(!err){
				console.log('--ok-');
			}
		});
		console.log(md);
	}
});


module.exports = app;
