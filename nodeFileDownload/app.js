var cluster = require('cluster');

if (cluster.isMaster) {
	
	var numCPUs = require('os').cpus().length;
	
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
	
	var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs')
    ;
	
	var port = 4000;
	
	var mimeTypes = {
			"csv": "text/csv",
		    "html": "text/html",
		    "jpeg": "image/jpeg",
		    "jpg": "image/jpeg",
		    "png": "image/png",
		    "js": "text/javascript",
			"json": "text/javascript",
		    "css": "text/css"};
	
    // worker process
	http.createServer(function(req, res) {
	    var uri = url.parse(req.url).pathname;
		if( "/favicon.ico" === uri){
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write('404 Not Found\n');
	        res.end();
			return;
		}
	    var filename = path.join(process.cwd(), uri);
		console.log(filename);
	    fs.exists(filename, function(exists) {
	        if(!exists) {
	            console.log("not exists: " + filename);
	            res.writeHead(200, {'Content-Type': 'text/plain'});
	            res.write('404 Not Found\n');
	            res.end();
				return;
	        }
	        try{
					if(fs.lstatSync(filename).isDirectory()){
						res.writeHead(200, {'Content-Type': 'text/plain'});
						res.write('Check FileName');
						res.end();
						return;
					}

	                var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
//	                res.writeHead(200, {'Content-Type':mimeType});
	                
	                var fileStream = fs.createReadStream(filename);
	                fileStream.pipe(res);
	        }catch(e){
				console.error("error : ", e);
			}

	    }); //end path.exists
	}).listen(port);
}

console.log("Node server is running on port %d", port);