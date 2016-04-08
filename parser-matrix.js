// ///////////////////////////////PARSEUR ///////////////////////////////////
var CSSParser = require("css-js");
var fs = require("fs");

var config = {};
config.ver = "3.0";
parser = new CSSParser(config);
 
var cssContent = parser.parse(fs.readFileSync("test/test.css", "UTF-8"));
//console.log(cssContent);
/*
console.assert(Object.keys(cssContent).length == 1);
console.assert(Object.keys(cssContent)[0] === "rulesets");
console.assert(cssContent.rulesets[0].selector === "body");
console.assert(cssContent.rulesets[0].declaration.length == 4);
console.assert(cssContent.rulesets[0].declaration[0].key === "color");
console.assert(cssContent.rulesets[0].declaration[0].value === "black");
console.assert(cssContent.rulesets[0].declaration[1].key === "background");
console.assert(cssContent.rulesets[0].declaration[1].value === "gray");
*/
// //////////////Matrix /////////////////////////////////////
var Selector = {
	init: function(selector){
		this.selector = selector;
	}
};

var Declaration = {
	init: function(key,value){
		this.key = key;
		this.value = value;
	},
	initKeyOnly: function(key){
		this.key = key;
	}	
};

var Correspondance = {
	init: function(selector,declaration,egal){
		this.selector = selector;
		this.declaration = declaration;
		this.egal = egal;
	}
};


function removeDuplicationKeys(Array){
	for(i=0; i<Array.length-1; i++){
		for(j=i+1; j<Array.length; j++){
			if(Array[i].key == Array[j].key){
				Array.splice(j,1);
			}
		}	
	}
}
function removeDuplicationKeyValue(Array){
	for(i=0; i<Array.length-1; i++){
		for(j=i+1; j<Array.length; j++){
			if(Array[i].key == Array[j].key && Array[i].value == Array[j].value){
				Array.splice(j,1);
			}
		}	
	}
}

function MatrixLines(cssContent){
	var tabSelectors = [];

for (i=0; i<cssContent.rulesets.length; i++){
	tabSelectors[i] = Object.create(Selector);
	tabSelectors[i].init(cssContent.rulesets[i].selector);
}
return tabSelectors;
}

function MatrixColumns(cssContent){
/* selecteur i et des declarations */


var tabSelectors = [];
var tabDec = [];
var tabDecFinal = [];
var tabDecKeysOnly = [];
var tabDecKeysOnlyFinal = [];

for (i=0; i<cssContent.rulesets.length; i++){   // i = cssContent.rulesets.length
	tabSelectors[i] = Object.create(Selector);
	tabSelectors[i].init(cssContent.rulesets[i].selector);
	
	// remplir les tableaux avec tous les keys et tout les keys:valeurs
	
	for(j=0; j<cssContent.rulesets[i].declaration.length; j++){

			tabDec[j] = Object.create(Declaration);
			tabDec[j].init(cssContent.rulesets[i].declaration[j].key,cssContent.rulesets[i].declaration[j].value);
			tabDecFinal.push(tabDec[j]);
		
			tabDecKeysOnly[j] = Object.create(Declaration);
			tabDecKeysOnly[j].initKeyOnly(cssContent.rulesets[i].declaration[j].key);
			tabDecKeysOnlyFinal.push(tabDecKeysOnly[j]);

	}	
}


	// remove duplications
	
removeDuplicationKeys(tabDecKeysOnlyFinal);
removeDuplicationKeyValue(tabDecFinal);

// contient declarations (keysOnly) au début et declarations completes à la fin.
//va representer les colonnes de la matrice
tabDeclarations = tabDecKeysOnlyFinal.concat(tabDecFinal);

return tabDeclarations;
}

function fillMatrix(cssContent) {

var columns = MatrixColumns(cssContent);
var lines = MatrixLines(cssContent);
var tabCorrespondance = [];
var tabCorrespondanceFinal = [];
for(i=0; i<lines.length; i++){
	for(j=0; j<cssContent.rulesets[i].declaration.length; j++){
		for(k=0; k<columns.length; k++){
			if(columns[k].key == cssContent.rulesets[i].declaration[j].key && !(columns[k].value)){
				
				tabCorrespondance[k] = Object.create(Correspondance);
				tabCorrespondance[k].init(lines[i],columns[k],true);
				tabCorrespondanceFinal.push(tabCorrespondance[k]);
			}
			 if(columns[k].key == cssContent.rulesets[i].declaration[j].key && columns[k].value == cssContent.rulesets[i].declaration[j].value){
				tabCorrespondance[k] = Object.create(Correspondance);
				tabCorrespondance[k].init(lines[i],columns[k],true);
				tabCorrespondanceFinal.push(tabCorrespondance[k]);
			
			} 
			
			/*else{
				tabCorrespondance[k] = Object.create(Correspondance);
				tabCorrespondance[k].init(lines[i],columns[k],false);
				tabCorrespondanceFinal.push(tabCorrespondance[k]);
			}	*/
		 }
	}
}	

return tabCorrespondanceFinal;
}


// TESTS //////////////////////////////////
var columns = MatrixColumns(cssContent);
var lines = MatrixLines(cssContent);
var correspondances = fillMatrix(cssContent);
console.log(" LES LIGNES DE LA MATRICE  \n" );
console.log(lines);
console.log(" LES COLONNES DE LA MATRICE \n");
console.log(columns);
console.log("LES CORRESPONDANCES \n");
console.log(correspondances);

