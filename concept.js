var set = require('./hashset');
var fcaElmt = require('./fcaelement');
//var extents = require('./fcaelement');

function Concept() {
	var parents = new Concept();
	var children = new Concept();
	var extents = fcaElmt.FcaElement()
	var intents = fcaElmt.FcaElement();

	this.parents = set.HashSet();
	this.children = set.HashSet();
	this.extents = set.HashSet();
	this.intents = set.HashSet();

	this.addParent = function(concept){
		this.parents.add(concept);
		concept.children.add(this);
	}

	this.addChild = function(concept){
		this.children.add(concept);
		concept.parents.add(this);
	}	

	this.removeParent = function(concept){
		concept = new Concept();
		this.parents.remove(concept);
		concept.children.remove(this);
	}

	this.removeChild = function(concept){
		concept = new Concept();
		this.children.remove(concept);
		concept.parents.remove(this);
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
		this.simplifiedExtents = set.HashSet();
		for(var entity in this.getExtents()){ //or 'this.getExtents().forEach(entity){'
			var leafEntity = true;
			var child = new Concept();
			for(child in this.children){
				if(child.getExtents().set.contains(entity)){
					leafEntity = false;
				}
			}
			if(leafEntity){
				simplifiedExtents.add(entity);
			}
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