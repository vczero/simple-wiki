define(['jquery', 'uploader'], function($, WebUploader){
 
   var list = $('#thelist');
   var btn = $('#ctlBtn');
   var state = 'pending';
   var uploader = WebUploader.create({
        resize: false,
        swf: '../js/Uploader.swf',
        server: '/upload/md',
        pick: '#picker'
    });

    uploader.on('fileQueued', function(file){
    		var str = '<div id="' + file.id + '" class="item">';
    			str += '<h4 class="info">' + file.name + '</h4>';
    			str += '<p class="state">等待上传...</p></div>'
        list.append(str);
    });

    uploader.on('uploadProgress', function(file, percentage) {
        var li = $('#' + file.id);
        var percent = li.find('.progress .progress-bar');
        // 避免重复创建
        if(!percent.length){
        		str = '<div class="progress progress-striped active">';
        		str += '<div class="progress-bar" role="progressbar" style="width: 0%">';
        		str += '</div></div>' 
            percent = $(str).appendTo( li ).find('.progress-bar');
        }
        li.find('p.state').text('上传中');
        percent.css('width', percentage * 100 + '%');
    });

    uploader.on('uploadSuccess', function(file) {
        $('#' + file.id).find('p.state').text('已上传');
    });

    uploader.on( 'uploadError', function(file) {
        $('#' + file.id).find('p.state').text('上传出错');
    });

    uploader.on('uploadComplete', function(file) {
        $('#'+file.id ).find('.progress').fadeOut();
    });

    uploader.on('all', function(type) {
        if (type === 'startUpload') {
            state = 'uploading';
        } else if(type === 'stopUpload') {
            state = 'paused';
        } else if(type === 'uploadFinished') {
            state = 'done';
        }

        if ( state === 'uploading' ) {
            btn.text('暂停上传');
        } else {
            btn.text('开始上传');
        }
    });

    btn.on('click', function(){
        if (state === 'uploading') {
            uploader.stop();
        } else {
            uploader.upload();
        }
    });
    
});