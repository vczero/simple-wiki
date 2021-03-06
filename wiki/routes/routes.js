var home = require('./index');
var detail = require('./detail');
var admin = require('./admin');
var edit = require('./edit');
var org = require('./org');
var suggest = require('./suggest');

var uploadImg = require('./upload_img');
var uploadMd = require('./upload_md');
var login = require('./login');
var comment = require('./comment');
var picpages = require('./picpages');


module.exports = function(app){
	
	/*页面路由*/
	app.get('/', home);
	app.get('/detail', detail);
	app.get('/admin', admin);
	app.get('/edit', edit);
	
	
	/*服务接口层*/
	app.post('/upload/img', uploadImg);
	app.post('/upload/md', uploadMd);
	app.post('/user/login', login);
	app.post('/comment', comment);
	app.post('/edit/org', org.update);
	app.post('/suggest/update', suggest.update);
	app.post('/picpages/update', picpages.update);
	
	
	/*中间件*/
	//404
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
};
