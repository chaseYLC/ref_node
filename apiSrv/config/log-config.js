var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        new winston.transports.DailyRotateFile(
        		{
        		//	level : 'log',
        			filename: 'logs/log-',
        			json: false,
        			timestamp: true,
        			datePattern: 'yyyy-MM-dd.txt'
        		}
        	)
    ],
    exceptionHandlers: [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        new winston.transports.DailyRotateFile(
        		{
        			filename: 'logs/exceptions-',
        			json: false, 
        			timestamp: true,
        			datePattern: 'yyyy-MM-dd.txt'
        		}
        	)
    ],
    exitOnError: false
});

logger.setLevels(winston.config.syslog.levels);

// syslogConfig.levels = {
//   emerg: 0,
//   alert: 1,
//   crit: 2,
//   error: 3,
//   warning: 4,
//   notice: 5,
//   info: 6,
//   debug: 7,
// };

// syslogConfig.colors = {
//   emerg: 'red',
//   alert: 'yellow',
//   crit: 'red',
//   error: 'red',
//   warning: 'red',
//   notice: 'yellow',
//   info: 'green',
//   debug: 'blue',
// };

module.exports = logger;