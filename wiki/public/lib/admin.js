
require.config({
    paths: {
        jquery: '../js/jquery1.7',
        uploader: '../js/webuploader'
 
    }
});
 
require(['common/left', 'common/header', 'admin/upload_img', 'admin/upload_md'], function(left, header, WebUploader, $) {
 	header.addSelected(0);
});