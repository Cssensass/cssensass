function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == obj) {
            return true;
        }
    }
    return false;
}

function iteratorNodes(array){
    var nextIndex = 0;
    
    return {
       	next: function(){
        	return nextIndex < array.length ?
            {value: array[nextIndex++], done: false} :
            {done: true};
       	}

       	remove: function(){
       		var idx = array.indexOf(nextIndex);
       		if(idx!=-1){
       			array.splice(idx,1);
       		}
       	}
    }
}

// Function to generate Nodes from concept

function Node(identifier, entities, attributes){
	this.parents = [];
	this.children = [];

	this.getEntities = function (){
		return this.entities;
	}

	this.getAttributes = function(){
		return this.attributes;
	}

	this.getSimplifiedAttributes = function(){
		var result = [];
		for(i=0; i<attributes.length; i++){
			var leafAttribute = true;
			for(j=0; j<parents.length; j++){
				if(this.parents[j][0] == attributes[i]){
					leafAttribute = false;
				}
			}
			if(leafAttribute){
				result.push(attributes[i]);
			}
		}
		return result
	}

	this.getParents = function(){
		return this.parents;
	}

	this.getChildren = function() {
		return this.children;
	}

	this.getAllParents = function() {
		var result = [];
		var tmp = [];
		tmp.push(this);
		while(tmp.length > 0){
			node = pickOne(tmp);
			if(!(this.contains(result, node))){
				result.push(node);
				tmp.push(node.getParents());
			}
		}
		return result;
	}

	this.getAllChildren = function() {
		var result = [];
		var tmp = [];
		tmp.push(this);
		while(tmp.length > 0){
			node = pickOne(tmp);
			if(!(this.contains(result, node))){
				result.push(node);
				tmp.push(node.getChildren());
			}
		}
		return result;	
	}

	this.pickOne = function(nodes){
		if(nodes.length == 0){
			return null;
		}
		var it = iteratorNode(nodes);
		var tmp = it.next();
		it.remove();
		return tmp;
	}

}