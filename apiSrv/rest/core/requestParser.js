exports.session_id = function(req){
	return req.headers['session-id'];
};

exports.body = function(req){
	return req.body;
};
