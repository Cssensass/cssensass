var cssToSsl = function cssToSsl(){

	this.buildContext = function(cssContent){
		var context = new (require('./context'))();

		for (i=0; i<cssContent.rulesets.length; i++){
			context.addEntity(cssContent.rulesets[i].selector);	
		}
		
		context.addAttribute(cssContent.rulesets, cssContent.rulesets.length);	
		
		for (i=0; i<cssContent.rulesets.length; i++){
			context.addRelation(cssContent.rulesets[i].selector, cssContent.rulesets[i].declaration);	
		}

		return context;
	}



}