
define(['jquery'], function($){
	$('#suggestBtn').on('click', function(){
		var text = $('#suggestText').val();
		if(text){
			try{
				JSON.parse(text);
			}catch(e){
				return alert('JSON字符串格式有问题');
			}
			$.post('/suggest/update', {str: text}, function(data){
				if(data.status){
					alert('更新成功');
					location.reload();
				}else{
					return alert(data.info);
				}
			});
			
		}else{
			return alert('不能为空！');
		}
	});
});