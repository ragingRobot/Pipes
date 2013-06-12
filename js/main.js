$(document).ready(function(){

	PipeGame.configure({
		cols: 4,
		rows: 5,
		startX:0,
		StartY:0,
		lastX:3,
		lastY:4,
		autoStart: 10000		
	});
	
	
	var currentLevel = parseInt(window.location.hash.substring(1)) || 1;
	var board = loadLevel(currentLevel);
	
	PipeGame.setGameBoard(board);//board
	
	$(document).on("touchstart",".next-level",function(){
		currentLevel++;
		document.location.hash = currentLevel;
		board = loadLevel(currentLevel);
		
		PipeGame.setGameBoard(board);//board
	});
	
});



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function loadLevel(level){
	var th = this;
	var items = "";
	var count = 0;
	var returnval;
		  $.each(levels, function(key, val) {
		  	var padding ="";
		  	count ++;
		  	if(count == parseInt(level)){
		  		returnval = val;
		  	}
		  });
	return returnval;
}


