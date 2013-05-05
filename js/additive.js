$(document).ready(function(){

	PipeGame.configure({
		cols: 4,
		rows: 5,
		startX:0,
		StartY:0,
		lastX:7,
		lastY:0,
		additiveMode: true,
		autoStart: 12000
	});
	
	var board =[[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
				[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
				[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
				[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]];
	
	PipeGame.setGameBoard(board);

	
	
	
});

