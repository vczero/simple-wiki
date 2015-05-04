
define(['jquery'], function($){
	var leftPanel = $('#home_left_panel');
	var control = $('#home_left_control');
	var container = $('#home_container');
	var right = $('.home_photo_list');
	var TIME = 266;
	
	control.toggle(
		function(){
			control.empty();
			control.append('+');
			leftPanel.animate({width: 'toggle'}, TIME);
			control.animate({left: '55px'}, TIME);
			container.animate({left: '55px'}, TIME);
			right && right.animate({width: 'toggle'}, TIME);
		},
		function(){
			control.empty();
			control.append('<div class="home_left_del"></div>');
			leftPanel.animate({width:'toggle'}, TIME);
			control.animate({left:'356px'}, TIME);
			container.animate({left:'356px'}, TIME);
			right && right.animate({width: 'toggle'}, TIME);
		}
	);
	
});
