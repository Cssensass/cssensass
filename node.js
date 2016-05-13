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
			if()
		}
	}

}