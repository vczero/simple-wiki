var fs = require('fs');
var time = require('../util/time');
var xss = require('xss');

//用户发布评论接口
module.exports = function(req, res){
	var id = req.param('id');
	var username = req.param('username');
	var comment = req.param('comment');
	var PATH = './public/blog/';
	var errorStatus = {status: 0};
	if(id && username && comment){
		fs.readFile(PATH + decodeURI(id), function(err, data){
			if(!err){
				var obj = JSON.parse(data.toString());
				if(!obj.comments){
					obj.comments = [];
				}
				for(var i in obj.comments){
					if(obj.comments[i].username === username){
						errorStatus.info = '姓名不能重复，请重新填写...';
						return res.send(errorStatus);
					}
				}
				obj.comments.splice(0, 0, {
					username: xss(username),
					comment: xss(comment),
					time: time((new Date()).toString())
				});
				
				fs.writeFileSync(PATH + decodeURI(id), JSON.stringify(obj));
				return res.send({
					status: 1,
					comment: comment
				});
			}else{
				errorStatus.info = '服务出错';
				return res.send(errorStatus);
			}
			
		});
	}else{
		errorStatus.info = '请填写用户名和评论';
		return res.send(errorStatus);	
	}
};
