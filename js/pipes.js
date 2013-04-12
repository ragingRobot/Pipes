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
	
	
}

Pipe.prototype.fill = function(startConnectionIndex){
	/***********************************************************************
	 * This will gradually fill the pipe then call fill on the ones it is 
	 * connected too. If the fill starts from a spot that doesn't have a connection
	 * enabled the users losses.
	 ***********************************************************************/
	if(typeof startConnectionIndex != 'undefined')
	{
		if(this._connectionStatus[startConnectionIndex] == 1){
			this._htmlElement.addClass("full");
			for(var i =0 ;i < this._connectionStatus.length ;i ++)
			{
				var from = 0;
				if(i == 0){
					from = 2
				}else if(i == 1){
					from = 3;
				}else if(i == 2){
					from = 0;
				}else if(i == 3){
					from = 1;
				}
				
				//this part is broken :(
				if(this._connectionStatus[i] == 1){
					if(this._connections[i] != null && typeof this._connections[i] != 'undefined'){
						this._connections[i].fill(from);
					}
				}
			}
		}else{
			//lose :(
				console.log("DEAD");
		}
	}
}
Pipe.prototype.setHTMLElement= function(col, row){
	/***********************************************************************
	 * 
	 ***********************************************************************/
	var thispipe = this;
	this._htmlElement = $("." + col + " ." + row);
	this._htmlElement.click(function(e){
		thispipe.clicked();
	});
}
Pipe.prototype.clicked = function(){
	/***********************************************************************
	 * 
	 ***********************************************************************/
	this.rotate();
	var newclass= this._connectionStatus.toString().replace(/,/g,"");
	this._htmlElement.find("span").removeClass().addClass("pipe-"+newclass);
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SETUP GAME
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/***************************************************************************************
 * This populates the game board based on the number of rows and cols specified.
 * I still need to add in the different pipe types and the ability to add blank spaces
 ***************************************************************************************/
	var prevTopNode;
	var prevCol = [];
	var numCols = 8;
	var numRows = 3;
	var firstToFill;
	var pipeOptions = [
		[0,1,0,1],
		[0,1,1,0],
		[1,1,1,0]
	];
	$(document).ready(function(){
		for(var i=0; i< numCols; i++)
		{
			var random = Math.floor(Math.random()*pipeOptions.length);
			var topNode = new Pipe();
			topNode.setConnectionStatusList(pipeOptions[random]);
			var pipeclass = "pipe-" + pipeOptions[random].toString().replace(/,/g,"");
			$(".plumbing").append("<ul class=\"col-"+ i +"\"><li class=\"row-"+ 0 +"\"><span class=\""+ pipeclass +"\"></span></li></ul>");
			topNode.setHTMLElement("col-"+ i, "row-"+ 0 );
			if(i > 0){
				topNode.setConnection(3, prevTopNode);
				prevTopNode.setConnection(1, topNode);
			}
			
			var nodeAbove = topNode;
			for(var j = 0 ; j < numRows; j++){
				var random = Math.floor(Math.random()*pipeOptions.length);
				var bottomNode = new Pipe();
				bottomNode.setConnectionStatusList(pipeOptions[random]);
				var pipeclass = "pipe-" + pipeOptions[random].toString().replace(/,/g,"");
				$(".plumbing .col-" + i ).append("<li class=\"row-"+ (j + 1) +"\"><span class=\""+ pipeclass +"\"></span></li>");
				bottomNode.setHTMLElement("col-"+ i, "row-" + (j + 1) );
				
				bottomNode.setConnection(0, nodeAbove);
				nodeAbove.setConnection(2, bottomNode );
				nodeAbove = bottomNode;
				if(i > 0){
					
					bottomNode.setConnection(3, prevCol[j]);
					prevCol[j].setConnection(1, bottomNode);
				}
				prevCol[j] = bottomNode;
				
				if(i == 0 && j == 2){
					
					firstToFill = bottomNode;
				}
			}	
			
			prevTopNode = topNode;
		}
		
		setTimeout(function(){firstToFill.fill(3);},3000);
	});
