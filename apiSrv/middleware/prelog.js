exports.logger = function logger(req, res, next){
	console.log('received. UTC Value: ', Date.now());
	next();
};
