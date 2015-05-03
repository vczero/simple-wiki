

 define(['jquery'], function($){
 	//显示文章
 	var blog = $('#detail_blog');
 	var commentsDiv = $('#comments_div');
 	var id = location.href.split('?id=')[1];
 	
 	if(id){
 		$.getJSON('/blog/' + id, function(data){
 			if(data[decodeURI(id)]){
 				blog.append(data[decodeURI(id)]);
 				if(!data.comments){
 					return;
 				}
 				renderTpl(data, commentsDiv);
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
 					
 				}else{
 					alert(data.info);
 				}
 			});
 		}else{
 			alert('请输入用户名和评论。');
 		}
 	});
 	
 	//渲染模板
 	function renderTpl(data, parentDiv){
 		for(var i = 0; i < data.comments.length; i++){
			var str = '<div class="detail_comment_item"><div>';
				str += data.comments[i].comment;
				str += '</div><div><span>';
				str += data.comments[i].username;
				str += '&nbsp;</span><span>';
				str += data.comments[i].time;
				str += '</span></div><div class="detail_comment_count">';
				str += data.comments.length - i;
				str += '</div></div>';
			parentDiv.append(str);
		}
 	}
 	
 });

