
define(['jquery'], function($){
	var span = $('header span');
	function addSelected(num){
		var n = span.length;
		for(var i = 0; i < n; i++){
			$(span[i]).removeClass('menu_selected');
		}
		$(span[num]).addClass('menu_selected');
	}
	return {
		addSelected: addSelected
	};
});