$(document).ready(function(){

	PipeGame.configure({
		cols: 4,
		rows: 5,
		startX:0,
		StartY:0,
		lastX:3,
		lastY:4,
		additiveMode: true,
		autoStart: 30000
	});
	
	var board =[[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
				[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
				[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
				[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]];
	
	PipeGame.setGameBoard(board);

	
	
	
});

