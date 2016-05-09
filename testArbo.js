var CSSParser = require("css-js");
var fs = require("fs");
var matrixTest = new (require('./context'))();

var arbotest = new (require('./Arborescence'))();

var config = {};
config.ver = "3.0";
parser = new CSSParser(config);

var cssContent = parser.parse(fs.readFileSync("test.css", "UTF-8"));

console.log('Hello user, welcome on CssenSass !');
console.log('Test of context.js :');

for (i=0; i<cssContent.rulesets.length; i++){
	matrixTest.addEntity(cssContent.rulesets[i].selector);	
}


matrixTest.addAttribute(cssContent.rulesets, cssContent.rulesets.length);	



for (i=0; i<cssContent.rulesets.length; i++){
	matrixTest.addRelation(cssContent.rulesets[i].selector, cssContent.rulesets[i].declaration);	
}


var entitiesTest = ['.info','#content'];
var attrib = [{ key: 'padding', value: '0' }];

console.log("Entites \n")
console.log(matrixTest.entities);
console.log("\ Attributes \n")
console.log(matrixTest.attributes);

console.log('Test of Arborescence.js :\n');
console.log("\n Fonction f \n")
console.log(arbotest.fonctionF(matrixTest.relations, entitiesTest));

console.log(" \n Fonction g \n")
console.log(arbotest.fonctionG(attrib, matrixTest.reverseRelations));
