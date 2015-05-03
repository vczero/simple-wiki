var home = require('./index');
var detail = require('./detail');
var admin = require('./admin');
var uploadImg = require('./upload_img');
var uploadMd = require('./upload_md');




module.exports = function(app){
	
	/*页面路由*/
	app.get('/', home);
	app.get('/detail', detail);
	app.get('/admin', admin);
	
	
	/*服务接口层*/
	app.post('/upload/img', uploadImg);
	app.post('/upload/md', uploadMd);
	
	
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
