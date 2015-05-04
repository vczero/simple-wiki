
require.config({
    paths: {
        jquery: '../js/jquery1.7',
        uploader: '../js/webuploader'
    }
});
 
require(['common/left', 'common/header', 'edit/updateOrg', 'edit/updateSuggest', 'admin/login'], function(left, header) {
 	header.addSelected(2);
});