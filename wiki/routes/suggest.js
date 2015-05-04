
var fs = require('fs');
var PATH = './suggest.json';

//服务接口
module.exports = {
	get: function(){
		var data = fs.readFileSync(PATH);
		return JSON.parse(data.toString());
	},
	update: function(req, res){
		var errorStatus = {status: 0};
		if(!req.session.user){
			errorStatus.info('请以管理员身份登录后尝试');
			return res.send(errorStatus);
		}
		var str = req.param('str');
		var obj = null;
		
		try{
			obj = JSON.parse(str);
		}catch(e){
			obj = null;
		}
		if(!obj){
			errorStatus.info = '传入的JSON字符串格式有问题。';
			return res.send(errorStatus);
		}
		
		fs.writeFile(PATH, JSON.stringify(obj), function(err){
			if(!err){
				return res.send({status: 1});
			}else{
				errorStatus.info = '服务出现异常，请稍后再尝试。';
				return res.send(errorStatus);
			}
		});
	}
};
