#!/usr/bin/env node

var HashSet = require('hashset');
var HashMap = require('hashmap'); 

function Context(){
	this.entities = {};
	this.attributes = {}
	this.relations = new HashMap();
	this.reverseRelations = new HashMap();

	this.addEntity = function(entity){
		this.entities[entity] = entity;
	}

	this.addAttribute = function(attribute){
		this.attributes[attribute] = attribute;
	}

	this.addRelation = function(entity, attribute){
		if (!this.relations.has(attribute)){
			this.relations.set(entity, new HashSet());
		}

		this.relations.get(entity).add(attribute);

		if (!this.reverseRelations.has(attribute)) {
            this.reverseRelations.set(attribute, new HashSet());
        }
        this.reverseRelations.get(attribute).add(entity);
	}

	this.printMatrixElement = function() {
		console.log('Entities :');
		for(var entity in this.entities){
			console.log('\t' + entity);
		}
		console.log();

		console.log('Attributes :');
		for(var attribute in this.attributes){
			console.log('\t' + attribute);
		}
		console.log();

		console.log('Relations :');
		for (var i in this.relations){
			console.log('\t Key is: ' + i.toString() + '. \t Value is: ' + relations[i].toString());
		}
		console.log();

		console.log('Reverse relations :');
		for (var i in this.reverseRelations){
			console.log('\t Key is: ' + i.toString() + '. \t Value is: ' + reverseRelations[i].toString());
		}
		console.log();

	}


}

console.log('Hello user, welcome on CssenSass !');
console.log('Test of context.js :');

var testContext = new Context();

testContext.addAttribute('color : black');
testContext.addAttribute('font-size : 1em');
testContext.addAttribute('font-size : 1.2em');
testContext.addAttribute('font-size : 1.3em');
testContext.addAttribute('font-weight : 100');
testContext.addAttribute('font-weight : 200');
testContext.addAttribute('padding : 0');
testContext.addAttribute('margin : 5px');
testContext.addAttribute('margin : 10px');

testContext.addEntity('body');
testContext.addEntity('a');
testContext.addEntity('.info');
testContext.addEntity('.error');
testContext.addEntity('#content');




testContext.printMatrixElement();


