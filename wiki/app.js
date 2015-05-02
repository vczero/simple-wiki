var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config');
var app = express();
var port = config.serverPort || 3000;

app.set('port', port);
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

var server = http.createServer(app);
server.listen(port);
server.on('listening', function(){
	console.log('---------listening on: ' + port + '--------');
});


server.on('error', function(error){
	if (error.syscall !== 'listen'){
		throw error;
  	}
	switch(error.code){
    		case 'EACCES':
    			console.error(bind + ' requires elevated privileges');
      		process.exit(1);
     		break;
    		case 'EADDRINUSE':
      		console.error(bind + ' is already in use');
      		process.exit(1);
      	break;
    		default:
      		throw error;
  	}
});



/*---------------------------路由-------------------------------------*/
var home = require('./routes/index');
var detail = require('./routes/detail');
var admin = require('./routes/admin');
var uploadImg = require('./routes/upload_img');
var uploadMd = require('./routes/upload_md');

app.get('/', home);
app.get('/detail', detail);
app.get('/admin', admin);
app.post('/upload/img', uploadImg);
app.post('/upload/md', uploadMd);


/*--------------------------中间件-------------------------------------*/
//404处理
app.use(function(req, res, next) {
	var err = new Error('Not Found');
  	err.status = 404;
  	next(err);
});


//开发模式的错误异常处理
if(app.get('env') === 'development') {
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




