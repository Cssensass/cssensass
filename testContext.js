#!/usr/bin/env node


var CSSParser = require("css-js");
var fs = require("fs");
var matrixTest = new (require('./context'))();

var config = {};
config.ver = "3.0";
parser = new CSSParser(config);

var cssContent = parser.parse(fs.readFileSync("test.css", "UTF-8"));

console.log('Hello user, welcome on CssenSass !');
console.log('Test of context.js :');
var EntitiesTab = [];
for (i=0; i<cssContent.rulesets.length; i++){
	matrixTest.addEntity(cssContent.rulesets[i].selector);	
}


for (i=0; i<cssContent.rulesets.length; i++){
	matrixTest.addAttribute(cssContent.rulesets[i].declaration);	
}


for (i=0; i<cssContent.rulesets.length; i++){
	matrixTest.addRelation(cssContent.rulesets[i].selector, cssContent.rulesets[i].declaration);	
}

//console.log(matrixTest);
console.log('\n');
console.log(matrixTest.relations[2][1][1].value);
console.log('\n');
//matrixTest.printMatrixElement();
console.log(matrixTest.reverseRelations[4][1]);
console.log('\n');
