#!/usr/bin/env node

var HashSet = require('hashset');
var HashMap = require('hashmap'); 

function Context(){
	this.entities = {};
	this.attributes = {}
	this.relations = new HashMap();
	this.reverseRelations = new HashMap();

	this.addEntity = function(entity, attributes){
		this.entities[entity] = attributes;
	}

	this.addAttribute = function(attribute, value){
		this.attributes[attribute] = value;
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
			console.log('\t' + attribute + ': ' + this.attributes[attribute]);
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

var attribute = {
	'color' : 'grey',
	'font-size' : '1em'
}

testContext.addAttribute('color', 'grey');
testContext.addAttribute('font-size', '1em');
testContext.addEntity('body')

testContext.printMatrixElement();