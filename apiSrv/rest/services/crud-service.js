var log = require('../../config/log-config');

exports.create = function(session_id, body, res){
    res.send({called : 'create'});
};

exports.read = function(session_id, req, res){
	var obj = {};
	obj.called = "read";
	obj.arrValue = [];
	obj.arrValue.push(1);
	obj.arrValue.push(2);

	res.send(obj);
};

exports.update = function(session_id, req, res){
	res.send({called : 'update'});
};

exports.del = function(session_id, req, res){
	res.send({called : 'del'});
};
