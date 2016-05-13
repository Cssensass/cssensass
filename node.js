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

}