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
var routes = require('./routes/routes');

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
//app.use(express.static(path.join(__dirname, 'views/blog')));

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

routes(app);






