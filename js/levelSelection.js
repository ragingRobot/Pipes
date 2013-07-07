var LevelSelector = function(){
	this.highestLevelComplete = 9;
	if(typeof window.SoundManager != "undefined"){
		this.highestLevelComplete = parseInt(window.SoundManager.getLevelsComplete());
	}
}

LevelSelector.prototype.loadLevels = function(){
	var th = this;
	var items = "";
	var count = 0;
	var th = this;
		  $.each(levels, function(key, val) {
		  	var padding ="";
		  	count ++;
		  	if(key < 10){
		  		padding ="0";
		  	}
		  	if(count <= th.highestLevelComplete + 1 ){
		    items += '<li id="level-' + count + '"><a href="arcade.html#'+ count +'">' + padding + count + '</a></li>';
		   }else{
		   	items += '<li class="level-inactive"><a href="#">' + padding + count + '</a></li>';
		   }
		  });
		  
		  $(".menu").html(items);
	

}

$(document).ready(function(){
	
	var levelSelector = new LevelSelector();
	levelSelector.loadLevels();
	
});
