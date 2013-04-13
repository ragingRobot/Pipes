//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SETUP Node OBJECTS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Node = function(connections, connectionStatus){
	/***********************************************************************
	 * The Node "class" is a quadruple linked list. All of the objects in the 
	 * game area will use this as the base prototype. Each node will have a 
	 * reference to the ones above, below, left, and right of it. It also keeps
     * track of weather or not this node excepts connections from those directions
	 ***********************************************************************/
	
	//all arrays go clockwise [up, right, down, left]
	var defaults = {connections:[null,null,null,null], connectionStatus:[0,0,0,0]};
	this._connections = connections || defaults.connections;
	this._connectionStatus  = connectionStatus || defaults.connectionStatus;
	
}

Node.prototype.setConnection = function (connectionIndex, connectionNode)
{	
	/***********************************************************************
	 * This lets you set or change the nodes linked to this node
	 ***********************************************************************/
	if(connectionIndex < this._connections.length){
		this._connections[connectionIndex] = connectionNode;
	}
	
}

Node.prototype.setConnectionStatus = function (connectionIndex, connectionStatus)
{
	/***********************************************************************
	 * This lets you set or change the ability of this node to connect to 
	 * the ones around it.
	 ***********************************************************************/
	if(connectionIndex < this._connectionStatus.length){
		this._connectionStatus[connectionIndex] = connectionStatus;
	}
	
}


Node.prototype.setConnectionStatusList = function (connectionStatus)
{
	/***********************************************************************
	 * This lets you set or change the ability of this node to connect to 
	 * the ones around it.
	 ***********************************************************************/
		this._connectionStatus = null;
		this._connectionStatus = connectionStatus;
	
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SETUP Pipe OBJECTS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Pipe = Node.prototype.constructor;
Pipe.prototype = new Node();

Pipe.prototype.rotate = function (direction){
	/***********************************************************************
	 * This will shift the values of the _connectionStatus array. it accepts
	 * either a 1 or 0 for the direction. 0 for clockwise, 1 for counter clockwise
	 * It defaults to clockwise.
	 ***********************************************************************/
	if(direction != 0 && direction != 1 || typeof direction == 'undefined')
	{
		direction = 0;
	}
	
	var held;
	if(direction == 0){
		this._connectionStatus.unshift(this._connectionStatus.pop());
	}else{
		this._connectionStatus.push(this._connectionStatus.shift());
	}
	
	var newclass= this._connectionStatus.toString().replace(/,/g,"");
	this._htmlElement.find("span").removeClass().addClass("pipe-"+newclass);
	
	
	
}

Pipe.prototype.fill = function(startConnectionIndex){
	/***********************************************************************
	 * This will gradually fill the pipe then call fill on the ones it is 
	 * connected too. If the fill starts from a spot that doesn't have a connection
	 * enabled the users losses.
	 ***********************************************************************/
	if(typeof startConnectionIndex != 'undefined')
	{
			var newclass= this._connectionStatus.toString().replace(/,/g,"");
			this._htmlElement.find("span").removeClass().addClass("pipe-"+newclass);
	
		console.log(this);
		if(this._connectionStatus[startConnectionIndex] == 1){
			var thispipe = this;
			thispipe._htmlElement.find(".water").animate({width:"71px"},2000, function(){
						thispipe._htmlElement.addClass("full");
						for(var i =0 ; i < thispipe._connectionStatus.length ;i ++)
						{
							var from = 0;
							if(i == 0){
								from = 2;
							}else if(i == 1){
								from = 3;
							}else if(i == 2){
								from = 0;
							}else if(i == 3){
								from = 1;
							}
							
						
							if(thispipe._connectionStatus[i] == 1 && i != startConnectionIndex){
								if(thispipe._connections[i] != null && typeof thispipe._connections[i] != 'undefined'){
									thispipe._connections[i].fill(from);
								}
							}
						}
			});
		}else{
			//lose :(
				console.log("DEAD");
		}
	}
}
Pipe.prototype.setHTMLElement= function(element){
	/***********************************************************************
	 * 
	 ***********************************************************************/
	var thispipe = this;
	this._htmlElement = element;
	this._htmlElement.click(function(e){
		thispipe.clicked();
	});
}

Pipe.prototype.clicked = function(){
	/***********************************************************************
	 * 
	 ***********************************************************************/
	this.rotate();
	
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SETUP GAME
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var PipeGame = (function(){

	
	var numCols = 8;
	var numRows = 4;
	var firstToFill;

	
	function _setGameBoard(){
	/***************************************************************************************
	 * This populates the game board based on the number of rows and cols specified.
	 * I still need to add in the different pipe types and the ability to add blank spaces
	 ***************************************************************************************/		
		var pipeOptions = [
			[0,1,0,1],
			[0,1,1,0],
			[0,1,1,0]
		];
		
		
		var prevTopNode;
		var prevCol = [];
		var topNode;
		var random;
		var pipeclasst;
		var pipeclass;
		var nodeAbove;
		var bottomNode;
		
		for(var i=0; i< numCols; i++)
		{
			random = Math.floor(Math.random()*pipeOptions.length);
			topNode = new Pipe();
			topNode.setConnectionStatusList(pipeOptions[random]);
			pipeclasst = "pipe-" + topNode._connectionStatus.toString().replace(/,/g,"");
			$(".plumbing").append("<ul class=\"col-"+ i +"\"></ul>");
			
			for(var j = 0 ; j < numRows; j++){
				random = Math.floor(Math.random()*pipeOptions.length);
				bottomNode = new Pipe();
				bottomNode.setConnectionStatusList(pipeOptions[random]);
				if(j != null){
					bottomNode.setConnectionStatusList([1,0,0,1]);
				}
				
				pipeclass = "pipe-" + bottomNode._connectionStatus.toString().replace(/,/g,"");
				bottomNode.setHTMLElement($(".plumbing .col-" + i ).append("<li class=\"row-"+ j  +"\"><span class=\""+ pipeclass +"\"></span><div class=\"water\"></div></li>").find("li").last());
				
				if(nodeAbove != null && typeof nodeAbove != 'undefined'){
					bottomNode.setConnection(0, nodeAbove);
					nodeAbove.setConnection(2, bottomNode );
				}
				
				if(i > 0){
					
					bottomNode.setConnection(3, prevCol[j]);
					prevCol[j].setConnection(1, bottomNode);
				}
				
				
				if(i == 0 && j == 3){
					
					firstToFill = bottomNode;
				}
				
				prevCol[j] = bottomNode;
				nodeAbove = bottomNode;
			
			}	
			
			prevTopNode = topNode;
		}
		
		setTimeout(function(){firstToFill.fill(3);},3000);
	
	}
	
	
	return{
		setGameBoard:_setGameBoard
	}
	
})();

$(document).ready(function(){
	PipeGame.setGameBoard();
});
