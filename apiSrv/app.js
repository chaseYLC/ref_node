var cluster = require('cluster'),
	chalk = require('chalk'),
	log   = require('./config/log-config');


// If 'useClusterMode' is set to true, clusters will be clustered by the number of cpu.
var useClusterMode = false;

// Setting the 'useTimer' to true will cause the timer to be used.
var useTimer = false;

var port = 5002;


if( useClusterMode ){

	if (cluster.isMaster) {

		printServerStatus();
	
		var numCPUs = require('os').cpus().length;
	
	    // Fork workers.
	    for (var i = 0; i < numCPUs; i++) {
	        cluster.fork();
	    }

	    cluster.on('exit', function(worker, code, signal) {
	    	console.log('worker ' + worker.process.pid + ' died');
	    });
	    
	    cluster.on('fork', function(worker) {
	    	console.info("cluster - worker's id : ", worker.id);
	    });
	}
	else {
		serverProcess();
	}
}
else{
	printServerStatus();

	serverProcess();
}

function serverProcess(){

	var http = require('http'),
    express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride  = require("method-override"),
    errorHandler  = require("errorhandler"),
    fs = require("fs"),
    busboy = require('connect-busboy'),
    process = require('process') 
    ;
	
	var app = module.exports = express();

	// maxSockets greater ethan 10 sockets
	http.globalAgent.maxSockets = 1200;
	
	app.use(bodyParser.urlencoded({ extended: true }));

	// parse application/json
	app.use(bodyParser.json());

	// for file upload
	app.use(busboy());

	app.use(methodOverride());


	var env = process.env.NODE_ENV || 'development';

	if ('development' === env) {
		app.use(errorHandler({ dumpExceptions: true, showStack: true }));
	}else if ('production' === env) {
		app.use(express.errorHandler());
	}

	// log when request received
	var prelog = require("./middleware/prelog");
	app.use(prelog.logger);

	// Bootstrap controllers
	var controllers_path = __dirname + '/rest/controllers'
	    , controller_files = fs.readdirSync(controllers_path);

	controller_files.forEach(function (file) {
	    console.log(' reading file ' + file);
	    var fileName = file.substr(0, file.indexOf('.'));
	    app.use("/api/" + fileName, require("./rest/controllers/" + fileName));
	});

	// for 404 error
	var notFoundErrorHandler = require("./middleware/errorhandler");
	app.use(notFoundErrorHandler.notFound);

	
	
	app.listen(port, function () {
		console.log(chalk.cyan("Node server is running on port %d in %s mode", port, app.settings.env));
	});

	if( useTimer ){
		if( useClusterMode && 1 === cluster.worker.id ){// If clustered, timer 1 only works on worker 1
			callTimer();
		}else{
			callTimer();
		}
	}
}

function callTimer(){

	var timer = require('./timerFunc');

	// Timer is called every 1 second
	var timerPeriod = 1;

	log.info(chalk.cyan("running timer. period : " + timerPeriod + " sec"));
	setTimeout(function(){
		timer.timerProcess(timerPeriod);
	}, timerPeriod * 1000);
}

 function printServerStatus(){
 	log.info(chalk.green("start the server. port : ", port));
 	log.info(chalk.green("use cluster : ", useClusterMode));
 	log.info(chalk.green("use timer : ", useTimer));
 }