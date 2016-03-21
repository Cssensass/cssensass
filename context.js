var my_hashset = require('./hashset');
var fcaElmt = require('./fcaelement');
var myMap = require('hashmap'); 

function Context(){
	this.entities = my_hashset.Hashset();
	this.attributes = my_hashset.Hashset();
	this.relations = myMap.HashMap();
	this.reverseRelations = myMap.Map();

	this.addEntity = function(entity){
		this.entities.add(entity);
	}

	this.addAtribute = function(attribute){
		this.attributes.add(attribute);
	}

	this.addRelation = function(entity, attribute){
		if (!this.relations.has(attribute)){
			this.relations.set(entity, my_hashset.Hashset());
		}

		this.relations.get(entity).add(attribute);

		if (!this.reverseRelations.has(attribute)) {
            this.reverseRelations.set(attribute, my_hashset.HashSet());
        }
        this.reverseRelations.get(attribute).add(entity);
	}



}