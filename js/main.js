$(document).ready(function(){

	PipeGame.configure({
		cols: 4,
		rows: 6,
		startX:0,
		StartY:0,
		lastX:3,
		lastY:5,
		autoStart: 10000		
	});
	
	
	var currentLevel = parseInt(window.location.hash.substring(1)) || 1;
	var board = loadLevel(currentLevel);
	
	if(currentLevel == numberOfLevels){
				$("body").addClass("last-level");
	}
			
	PipeGame.setGameBoard(board);//board
	
	$(document).on("touchstart",".next-level",function(){
		if(numberOfLevels > currentLevel){
			currentLevel++;
			
			document.location.hash = currentLevel;
			board = loadLevel(currentLevel);

			if(currentLevel == numberOfLevels){
				$("body").addClass("last-level");
			}
			
			PipeGame.setGameBoard(board);//board
			
			
		}
	});
	
});


var numberOfLevels = 0;
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
	numberOfLevels  = 0 ;
		  $.each(levels, function(key, val) {
		  	numberOfLevels ++;
		  	var padding ="";
		  	count ++;
		  	if(count == parseInt(level)){
		  		returnval = val;
		  	}
		  });
	return returnval;
}


