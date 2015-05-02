MVC基础
-------------
1、模型 

+ 模型用来存放应用的数据对象；比如一个User模型；
+ 模型不必知晓试图和控制器的细节；
+ 模型最应该从应用中解藕；
+ 当控制器从服务器抓取数据或创建新纪录时，可以将数据包装成模型实例；

例如：       
	
	//good case
	//封装 & 实例方法
	var user = new User('name', 'tel', 'job');
	user.destroy();
	
	//bad case
	//因为destoryUser不在User的实例中
	var user = {name: 'vczero', tel: '132******', job: '前端'};
	destoryUser(user);
	
2、视图

+ 视图主要由html、css、js模板；
+ 模板中不应该存在逻辑，除了条件语句之外；

例如： 
   
	//render.js
	function render(data){
		//something to do
		//...
		view('userinfo', data);
	}
	
	//tpl.html
	<div>
		<span>{{data.name}}</span>
		<span>{{data.age}}</span>
	</div>
	
3、控制器

+ 控制器是视图间的纽带；
+ 控制器会给视图添加事件监听；

例如：    
 
	function userController(){
		//....
	}
	
	userController.add('#btn', 'click', function(){...});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
