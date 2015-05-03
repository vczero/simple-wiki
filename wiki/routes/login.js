
var fs = require('fs');


//只提供管理员登录
module.exports = function(req, res){
	var username = req.param(username);
	var password = req.param('password');
	var errorStatus = {status: 0};
	
	if(username && password){
		fs.readFileSync('../user.json', function(err, data){
			if(!err){
				var user = JSON.parse(data.toString());
				if(user[username] === password){
					return res.send({
						status: 1,
						username: username
					});
				}else{
					return res.send(errorStatus);
				}
			}else{
				return res.send(errorStatus);
			}
		});
	}else{
		return res.send(errorStatus);	
	}
	
};
