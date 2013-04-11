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
			
		}else{
			//lose :(
		}
	}
}
