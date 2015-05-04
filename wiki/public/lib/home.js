
require.config({
    paths: {
        jquery: '../js/jquery1.7'
 
    }
});
 
require(['common/left', 'common/header', 'common/util'], function(left, header) {
 	header.addSelected(0);
});