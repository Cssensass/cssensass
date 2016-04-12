var matrix = new (require('./context'))();


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