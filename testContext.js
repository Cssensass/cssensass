#!/usr/bin/env node


var CSSParser = require("css-js");
var fs = require("fs");
var matrixTest = new (require('./context'))();
//var arbotest = new (require('./arbo'))();

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


	matrixTest.addAttribute(cssContent.rulesets, cssContent.rulesets.length);	



for (i=0; i<cssContent.rulesets.length; i++){
	matrixTest.addRelation(cssContent.rulesets[i].selector, cssContent.rulesets[i].declaration);	
}


/*arbotest.fonctionF(matrixTest.attributes, matrixTest.relations, matrixTest.entities);

console.log(arbotest.listTmpFinal);*/
//console.log(matrixTest);
console.log('\n');
console.log(matrixTest.attributes);
console.log('\n');
//matrixTest.printMatrixElement();
console.log(matrixTest.relations);
console.log('\n');
