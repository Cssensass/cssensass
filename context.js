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
		if (!(this.relations[entity])){
			this.relations[entity] = {};
		}

		this.relations[entity] = attribute;

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

testContext.addRelation('body', 'margin : 10px');




testContext.printMatrixElement();


