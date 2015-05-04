var fs = require('fs');

//统计模块
module.exports = {
	//文章统计
	articles: function(){
		var obj = null;
		try{
			var data = fs.readFileSync('./public/blog/main.json');
			obj = JSON.parse(data.toString());
		}catch(e){
			obj = null;
		}
		if(!obj){
			return 0;
		}
		return obj.length;
	}
	//后续加埋点
	
};
