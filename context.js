#!/usr/bin/env node

var CSSParser = require("css-js");
var fs = require("fs");

var config = {};
config.ver = "3.0";
parser = new CSSParser(config);
 
var cssContent = parser.parse(fs.readFileSync("test/test.css", "UTF-8"));

function Context(){
	this.entities = [];
	this.attributes = [];
	this.relations = [];
	this.reverseRelations = [];
	
	var attributesTab = []; 
	var attributesTabKeyOnly = []; 
	var attributesTabFinal = []; 
	var attributesTabKeyOnlyFinal = [];

	var attributesConstructor = {
		init: function(key,value){
			this.key = key;
			this.value = value;
		},
		initKeyOnly: function(key){
			this.key = key;
		}
	};

	this.removeDuplicationKeys = function(Array){
		for(i=0; i<Array.length-1; i++){
			for(j=i+1; j<Array.length; j++){
				if(Array[i].key == Array[j].key){
					Array.splice(j,1);
				}
			}		
		}
	}

	this.removeDuplicationKeyValue = function(Array){
		for(i=0; i<Array.length-1; i++){
			for(j=i+1; j<Array.length; j++){
				if(Array[i].key == Array[j].key && Array[i].value == Array[j].value){
					Array.splice(j,1);
				}
			}	
		}
	}

	this.addEntity = function(entity){
		this.entities.push(entity);
	}

	this.addAttribute = function(attribute){
		
		for(j=0; j<attribute.length;j++){
			attributesTab[j] = Object.create(attributesConstructor); 
			attributesTab[j].init(attribute[j].key, attribute[j].value);
			attributesTabFinal.push(attributesTab[j]);

			attributesTabKeyOnly[j] = Object.create(attributesConstructor); 
			attributesTabKeyOnly[j].initKeyOnly(attribute[j].key);
			attributesTabKeyOnlyFinal.push(attributesTabKeyOnly[j]);

		}

		this.attributes = attributesTabFinal.concat(attributesTabKeyOnlyFinal);
	}

	this.addRelation = function(entity, attribute){
		var foundEntity = false;
		for(var j=0; j<this.relations.length; j++) {
			if(this.relations[j][0] == entity && this.relations[j][1] == attribute) {
				foundEntity = true;
				break;
			}
		}

		if (!foundEntity){
			this.relations.push([entity, attribute]);
		}

		var foundAttribute = false;

		for(var j=0; j<this.reverseRelations.length; j++) {
			if(this.reverseRelations[j][0] == attribute && this.reverseRelations[j][1] == entity) {
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
		this.removeDuplicationKeyValue(this.attributes);
		for(var i=0; i<this.attributes.length; i++){
			if(this.attributes[i].value == undefined){
				console.log('\t Key is: ' + this.attributes[i].key);
		
			} else {
				console.log('\t Key is: ' + this.attributes[i].key + '. Value is: ' + this.attributes[i].value);	
			}
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

for (i=0; i<cssContent.rulesets.length; i++){
	testContext.addEntity(cssContent.rulesets[i].selector);	
}


for (i=0; i<cssContent.rulesets.length; i++){
	testContext.addAttribute(cssContent.rulesets[i].declaration);	
}


for (i=0; i<cssContent.rulesets.length; i++){
	testContext.addRelation(cssContent.rulesets[i].selector, cssContent.rulesets[i].declaration);	
}

console.log(testContext);

testContext.printMatrixElement();