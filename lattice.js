

function lattice(nodes){  //takes nodes as input

	this.topologicalOrder = function(){
		var result = [];
		var visitedNodes = [];
		for(i = 0, i < this.nodes.length, i++){
			topologicalOrderAux(node[i], visitedNodes, result);
		}
		return result;
	}

	this.topologicalOrderAux = function(node, visitedNodes, topologicalOrder){
		var parent = [];
		for(var i = 0; i < visitedNodes.length; i++){
			if(!(visitedNodes[i] == node)){
				parent = node.getParents();
				for(i = 0, i < parent.length, i++){
					topologicalOrderAux(parent[i], visitedNodes, topologicalOrder);
				}
			}
			visitedNodes.push(node);
			topologicalOrder.push(node);
		}
	}

	this.getNodes = function(){
		return this.nodes;
	}

	this.getLeaves = function(){
		var leaves = [];
		for(i = 0, i < this.nodes.length, i++){
			if(!nodes[i].getChildren()){
				leaves.push(nodes[i]);
			}
		}
		return leaves;
	}

	this.getRoots = function(){
		var roots = [];
		for(i = 0, i < this.nodes.length, i++){
			if(!nodes[i].getParents()){
				roots.push(nodes[i]);
			}
		}
		return roots;
	}
}
