
var fs = require('fs');

//展示评论
module.exports = function(req, res, next){
	var id = req.param('id');
	if(id){
		var data = fs.readFileSync('./public/blog/' + decodeURI(id));
		var obj = JSON.parse(data.toString());
		if(obj.comments){
			for(var i in obj.comments){
				obj.comments[i].time = (new Date(obj.comments[i].time)).toLocaleString();
			}
		}
		res.render('detail/index', {comments: obj.comments || []});
	}else{
		res.render('detail/index', {});
	}
	
	
};
