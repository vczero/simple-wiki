
define(['jquery'], function($){
	var leftPanel = $('#home_left_panel');
	var control = $('#home_left_control');

	control.toggle(
		function(){
			control.empty();
			control.append('-');
			leftPanel.animate({width:'toggle'}, 400);
			control.animate({left:'55px'}, 400);
		},
		function(){
			control.empty();
			control.append('+');
			leftPanel.animate({width:'toggle'}, 400);
			control.animate({left:'356px'}, 400);
		}
	);
});
