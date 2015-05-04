

define([], function(){
	var time = function(dateString){
		var date = new Date(dateString);
		var str = date.getFullYear() + '-';
			str += (date.getMonth() + 1) + '-';
			str += date.getDate() + '  ';
			str += date.getHours() + ':';
			str += date.getMinutes() + ':';
			str += date.getSeconds();
	}
	
	return time;
});