#!/usr/bin/env node

var HashSet = require('hashset');
var HashMap = require('hashmap'); 

function Context(){
	this.entities = {};
	this.attributes = {};
	this.relations = {};
	this.reverseRelations = {};

	this.addEntity = function(entity){
		this.entities[entity] = entity;
	}

	this.addAttribute = function(attribute){
		this.attributes[attribute] = attribute;
	}

	this.addRelation = function(entity, attribute){
		if (!this.relations[entity]){
			this.relations[entity] = {};
		}

		this.relations[entity] = attribute;

		if (!(this.reverseRelations[attribute])){
			this.reverseRelations[attribute] = {};
		}

		this.reverseRelations[attribute] = entity;
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
		for (var entity in this.relations){
				console.log('\t Key is: ' + entity + '. \t Value is: ' + this.relations[entity]);			
		}
		console.log();

		console.log('Reverse relations :');
		for (var attribute in this.reverseRelations){
				console.log('\t Key is: ' + attribute + '. \t Value is: ' + this.reverseRelations[attribute]);			
		}
		console.log();
	}


}

console.log('Hello user, welcome on CssenSass !');
console.log('Test of context.js :');

var testContext = new Context();

var entitiesTest = {
	
}

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

testContext.addRelation('body', 'margin : 10px');
testContext.addRelation('body', 'padding : 0');
testContext.addRelation('a', 'color : black');
testContext.addRelation('.info', 'font-size : 1.2em');
testContext.addRelation('.info', 'color : black');
testContext.addRelation('.info', 'font-weight : 100');
testContext.addRelation('.info', 'margin: 5px');
testContext.addRelation('.error', 'font-size : 1.3em');
testContext.addRelation('.error', 'color : black');
testContext.addRelation('.error', 'font-weight : 200');
testContext.addRelation('.error', 'margin: 10px');
testContext.addRelation('#content', 'font-size : 1.2em');
testContext.addRelation('#content', 'padding : 0');
testContext.addRelation('#content', 'color : black');
testContext.addRelation('#content', 'font-weight : 100');



testContext.printMatrixElement();


