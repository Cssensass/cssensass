var set = require('./hashset');
var fcaElmt = require('./fcaelement');
//var extents = require('./fcaelement');

function Concept() {

	// extents -> set of entities for a concept chosen
	// intents -> set of attributes for a concept chosen
	
	this.parents = [];
	this.children = [];
	this.extents = [];
	this.intents = [];

	this.addParent = function(concept){
		this.parents.push(concept);
	}

	this.addChild = function(concept){
		this.children.push(concept);
	}	

	this.removeParent = function(concept){
		this.parents.remove(concept);
	}

	this.removeChild = function(concept){
		this.children.remove(concept);
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
		for(i=0; i<this.getExtents().length; i++){
			var leafEntity = true;
			for(j=0;)
		}
	}

	this.equals = function(obj){
		if(obj == null){
			return false;
		} else if(obj == this){
			return true;
		} else if(!(obj instanceof Concept)) {
			return false;
		} else {
			var other = new Concept();
			obj = new Concept();
			other = obj;
			return other.intents.equals(this.intents) && other.extents.equals(this.extents);
		}
	}

}