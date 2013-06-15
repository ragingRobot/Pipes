$(document).ready(function(){

	PipeGame.configure({
		cols: 4,
		rows: 6,
		startX:0,
		StartY:0,
		lastX:3,
		lastY:5,
		godMode: true,
		autoStart: null		
	});
	
	var board =[[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
				[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
				[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
				[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]];
	
	PipeGame.setGameBoard(board);
	
	var slider = new Slider($(".options"))
	
});

var Slider = function(el){
	this.el = el;
	this.dragging = false;
	this.startx = this.el.offset().left;
	this.el.on("touchstart",this.startDrag.bind(this));
	this.el.on("touchmove",this.drag.bind(this));
	this.el.on("touchend",this.stopDrag.bind(this));
}

Slider.prototype.startDrag = function(e){
	this.startx = e.originalEvent.touches[0].pageX;
	this.dragging = true;
	
}
Slider.prototype.stopDrag = function(e){
	this.dragging = false;
}
Slider.prototype.drag = function(e){
	
	var pos = Math.round($(".plumbing-creator").position().left - (this.startx - e.originalEvent.touches[0].pageX)  );
	
	
	if(this.dragging){
		
		this.el.css({left:  pos +"px"})
	}
}

