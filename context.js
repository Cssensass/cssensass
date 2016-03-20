var my_hashset = require('./hashset');
var fcaElmt = require('./fcaelement');
var myMap_relations = require('hashmap'); 
var myMap_revRelations = require('hashmap'); 

function Context(){
	this.entities = my_hashset.Hashset();
	this.attributes = my_hashset.Hashset();
	this.relations = myMap_relations.HashMap();
	this.reverseRelations = myMap_revRelations.Map();

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
            this.reverseRelations.set(attribute, my_hashset.newHashSet());
        }
        this.reverseRelations.get(attribute).add(entity);
	}

}