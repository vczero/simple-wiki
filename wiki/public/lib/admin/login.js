

define(['jquery'], function($){
	$('#loginBtn').on('click', function(){
		var username = $('#useranme').val();
		var password = $('#password').val();
		if(username && password){
			$.post('/user/login', {username: username, password: password}, function(data){
				if(data.status){
					console.log(data);
					location.reload();
				}else{
					alert('用户名密码错误');
				}
			});
		}else{
			alert('请输入用户名密码');
		}
		
	});
	
});
