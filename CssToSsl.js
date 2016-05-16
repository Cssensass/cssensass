var cssToSsl = function cssToSsl(){

	this.buildContext = function(cssContent){
		var context = new (require('./context'))();

		for (var i=0; i<cssContent.rulesets.length; i++){
			context.addEntity(cssContent.rulesets[i].selector);	
		}
		
		context.addAttribute(cssContent.rulesets, cssContent.rulesets.length);	
		
		for (var i=0; i<cssContent.rulesets.length; i++){
			context.addRelation(cssContent.rulesets[i].selector, cssContent.rulesets[i].declaration);	
		}

		return context;
	}

	this.generateLatticeFromConcepts = function(concepts){
		var nodes = [];
		for(var i = 0; i<concepts.length; i++){
			var entities = concepts[i].getSimplifiedExtents();
			// Aaaand the fun is coming...
		}

	}



}