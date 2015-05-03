
require.config({
    paths: {
        jquery: '../js/jquery1.7'
 
    }
});
 
require(['common/left', 'common/header', 'jquery', 'detail/article'], function(left, header, $) {
 	header.addSelected(2);
});