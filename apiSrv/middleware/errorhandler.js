exports.notFound = function notFound(req, res, next){
	res.status(404).send({msg:'not defined URL.'});
};