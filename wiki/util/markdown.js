var markdown = require('markdown').markdown;
var fs = require('fs');
fs.readFile('./1.md', function(err, data){
	if(!err){
		data = data.toString();
		console.log(data);
		console.log('--------');
		var md = markdown.toHTML(data);
		fs.writeFile('./test.html', md, function(err){
			if(!err){
				console.log('--ok-');
			}
		});
		console.log(md);
	}
});