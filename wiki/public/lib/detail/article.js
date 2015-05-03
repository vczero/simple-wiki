

 define(['jquery'], function($){
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
 });

