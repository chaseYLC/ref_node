
exports.timerProcess = function(timerPeriod){
	
	setTimeout(function(){
		exports.timerProcess();
	}, timerPeriod * 1000);
	
	// to do...
	myTimerFunction();
};


function myTimerFunction(){
	console.log("called timer function.");
}