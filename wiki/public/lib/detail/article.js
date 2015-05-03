

 define(['jquery'], function($){
 	//显示文章
 	var blog = $('#detail_blog');
 	var id = location.href.split('?id=')[1];
 	
 	if(id){
 		$.getJSON('/blog/' + id, function(data){
 			if(data[decodeURI(id)]){
 				blog.append(data[decodeURI(id)]);
 			}
 		});
 	}else{
 		//TODO:
 	}
 	
 	
 	//填写评论
 	$('#commentBtn').on('click', function(){
 		var username = $('#username').val();
 		var comment = $('#comment').val();
 		if(username && comment){
 			$.post('/comment', {username: username, comment: comment, id: id}, function(data){
 				if(data.status){
 					location.reload();
 				}else{
 					alert(data.info);
 				}
 			});
 		}else{
 			alert('请输入用户名和评论。');
 		}
 	});
 	
 });

