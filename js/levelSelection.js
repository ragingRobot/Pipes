var LevelSelector = function(){
	
}

LevelSelector.prototype.loadLevels = function(){
	var th = this;
	var items = "";
	var count = 0;
		  $.each(levels, function(key, val) {
		  	var padding ="";
		  	count ++;
		  	if(key < 10){
		  		padding ="0";
		  	}
		  	
		    items += '<li id="level-' + count + '"><a href="arcade.html#'+ count +'">' + padding + count + '</a></li>';
		  });
		  
		  $(".menu").html(items);
	

}

$(document).ready(function(){
	
	var levelSelector = new LevelSelector();
	levelSelector.loadLevels();
	
});
