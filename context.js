#!/usr/bin/env node

function Context(){
	this.entities = [];
	this.attributes = [];
	this.relations = [];
	this.reverseRelations = [];

	this.addEntity = function(entity){
		this.entities.push(entity);
	}

	this.addAttribute = function(attribute){
		this.attributes.push(attribute);
	}

	this.addRelation = function(entity, attribute){
		var foundEntity = false;
		for(var i=0; i<this.relations.length; i++) {
			if(this.relations[i][0] == entity && this.relations[i][1] == attribute) {
				foundEntity = true;
				break;
			}
		}

		if (!foundEntity){
			this.relations.push([entity, attribute]);
		}

		var foundAttribute = false;

		for(var i=0; i<this.reverseRelations.length; i++) {
			if(this.reverseRelations[i][0] == attribute && this.reverseRelations[i][1] == entity) {
				foundAttribute = true;
				break;
			}
		}

		if (!foundAttribute){
			this.reverseRelations.push([attribute, entity]);
		}
	}

	this.printMatrixElement = function() {
		console.log('Entities :');
		for(var i=0; i<this.entities.length; i++){
			console.log('\t' + this.entities[i]);
		}
		console.log();

		console.log('Attributes :');
		for(var i=0; i<this.attributes.length; i++){
			console.log('\t' + this.attributes[i]);
		}
		console.log();

		console.log('Relations :');
		for (var i=0; i<this.relations.length; i++){
			console.log('\t Key is: ' + this.relations[i][0] + '. \t Value is: ' + this.relations[i][1]);
		}
		console.log();

		console.log('Reverse relations :');
		
		for (var i=0; i<this.reverseRelations.length; i++){
			console.log('\t Key is: ' + this.reverseRelations[i][0] + '. \t Value is: ' + this.reverseRelations[i][1]);			
		
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