var crudService = require('../services/crud-service');
var log   = require('../../config/log-config');
var requestParser = require('../core/requestParser');
var express = require('express');
var moment = require('moment');
var router = express.Router();

//middleware specific to this router
router.use(function timeLog(req, res, next) {
  // console.log('Time     : ', Date.now());
  // console.log('UTC Value: ', moment().valueOf());
  //console.log(JSON.stringify(req.headers));
  // console.log("current UTC : " + Date.UTC(2012,02,30) );
  // console.log("user connected. session-id : " + req.headers['session-id']);
  // console.log(req.body);
  next();
});

router.post('/create',function(req, res){
	crudService.create(requestParser.session_id, requestParser.body, res);
});

router.post('/read',function(req, res){
	crudService.read(requestParser.session_id, requestParser.body, res);
});

router.post('/update',function(req, res){
	crudService.update(requestParser.session_id, requestParser.body, res);
});

router.post('/del',function(req, res){
	crudService.del(requestParser.session_id, requestParser.body, res);
});

module.exports = router;