//Function to generate concept thanks to function f and g
//And then generate Nodes and Lattices.


function Concept() {

	// extents -> set of entities for a concept chosen
	// intents -> set of attributes for a concept chosen
	
	this.parents = [];
	this.children = [];
	this.extents = [];
	this.intents = [];

	this.addParent = function(conceptParent){
		this.parents.push(conceptParent);
	}

	this.addChild = function(conceptChild){
		this.children.push(conceptChild);
	}	

	this.removeParent = function(conceptParent){
		this.parents.remove(conceptParent);
	}

	this.removeChild = function(conceptChild){
		this.children.remove(conceptChild);
	}

	this.getParents = function(){
		return this.parents;
	}

	this.getChildren = function(){
		return this.children;
	}

	this.getExtents = function(){
		return this.extents;
	}

	this.getIntents = function(){
		return this.intents;
	}

	this.getSimplifiedExtents = function() {
		var simplifiedExtents = [];
		var extentsFromConcept = this.getExtents();
		for(i=0; i<extentsFromConcept.length; i++){
			var leafEntity = true;
			for(j=0; j<this.children.length; j++){
				var extentsFromChild = this.children[j].getExtents();
				for(k=0; k<extentsFromChild.length; k++){
					if(extentsFromChild[k] == extentsFromConcept[i]){
						leafEntity = false;
					}
				}
				if (leafEntity){
					simplifiedExtents.push(extentsFromConcept[i]);
				}
			}
		}
		return simplifiedExtents;
	}

}