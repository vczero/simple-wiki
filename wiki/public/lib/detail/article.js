
define(['jquery'], function($){
 	var blog = $('#detail_blog');
 	var commentsDiv = $('#comments_div');
 	var id = location.href.split('?id=')[1];
 	var commentsData = null;
 	
 	if(id){
 		$.getJSON('/blog/' + id, function(data){
 			if(data[decodeURI(id)]){
 				//显示文章
 				blog.append(data[decodeURI(id)]);
 				commentsData = data.comments;
 				if(!data.comments){
 					return;
 				}
 				//显示评论
 				renderTpl(commentsData, commentsDiv);
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
 					var showComment = {
 						username: username,
 						comment: comment,
 						time: (new Date()).toLocaleString()
 					};
 					commentsData.splice(0, 0, showComment);
 					renderTpl(commentsData, commentsDiv);
 					$('#username').val('');
 					$('#comment').val('');
 				}else{
 					alert(data.info);
 				}
 			});
 		}else{
 			alert('请输入用户名和评论。');
 		}
 	});
 	
 	//渲染模板
 	function renderTpl(comments, parentDiv){
 		parentDiv.empty();
 		var frag = document.createDocumentFragment();
 		for(var i = 0; i < comments.length; i++){
			var str = '<div class="detail_comment_item"><div>';
				str += comments[i].comment;
				str += '</div><div><span>';
				str += comments[i].username;
				str += '&nbsp;</span><span>';
				str += comments[i].time;
				str += '</span></div><div class="detail_comment_count">';
				str += comments.length - i;
				str += '</div></div>';
			frag.appendChild($(str)[0]);
		}
 		parentDiv.append($(frag));
 	}
 	
 });

