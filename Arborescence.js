
//////// Arborescence //////////////////////////////

Array.prototype.inArray = function(comparer) { 
    for(var i=0; i < this.length; i++) { 
        if(comparer[i]) 
            return true; 
    }
    return false; 
}; 

Array.prototype.pushIfNotExist = function(element, comparer) { 
    if (!this.inArray(comparer)) {
        this.push(element);
    }
};

function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        if (b.indexOf(e) !== -1) return true;
    });
}

function initObjectsList(objectsArray){
    var arr = [];
    var i;
    for(i = 0; i < objectsArray.length; i++){
        arr.push(objectsArray[i].selector);
    }
    return arr;
}

function initAttributsList(attributsArray){
    var arr = [];
    var i;
    for(i = 0; i < attributsArray.length; i++){
        if(attributsArray[i].value != null){
            arr.push(attributsArray[i].key + ' : ' + attributsArray[i].value);
        }else{
            arr.push(attributsArray[i].key);
        }
    }
    return arr;
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == obj) {
            return true;
        }
    }
    return false;
}

function KeepDuplicatedKey(Array, verification){
    var newArray =[];
    for(i=0;i<Array.length; i++){
        var elmt = 0;
        for(j=0;j<Array.length;j++){
            if(Array[i] == Array[j]){
                elmt++;
            }
        }
        if(elmt == verification){
            if(!contains(newArray, Array[i])){
                newArray.push(Array[i])
            }
        }
    }
    return newArray;
}

function fonctionF(relations, entities) {
    var communKeys = [];
    var communKeysValues = [];
      //var attributsList = initAttributsList(columns);
    var i,j,k;
    var listTmpKeys = [];
    var listTmpKeysValues = [];
    var tabId = [];
    var listTmpKeysFinal = [];
    
    // chercher la position des selecteurs qu'on a entré
    for(j = 0; j < entities.length; j++){
        var elmt = 0;
                    
        for(i=0;i<relations.length; i++){
                        
            if(entities[j] == relations[i][0]){ 
                tabId.push(i);
            }
        }
    }
    console.log("Tableau d'Ids");
    console.log(tabId);
    console.log("\n");
    var countKeys=0;
    var countValues = 0;
    for(j=0;j<relations.length; j++){
       
        for(i=0; i<entities.length; i++){
            
            if(j == tabId[i]){
                
                for(m=0; m<relations[j][1].length; m++){
                     countKeys++;
                    for(l=0; l<tabId.length; l++){
                       
                        for(k=0; k<relations[tabId[l]][1].length; k++){

                            if(relations[j][1][m].key == relations[tabId[l]][1][k].key){
                                listTmpKeys.push(relations[j][1][m].key);
                            }
                        }  
                    }
                }
            }
        }
        if(countKeys != 0){
        break; 
        }
    }
    communKeys = KeepDuplicatedKey(listTmpKeys, entities.length);
    //console.log(communKeys);
    

    for(j=0;j<relations.length; j++){
        
        for(i=0; i<entities.length; i++){

            if(j == tabId[i]){
                for(m=0; m<relations[j][1].length; m++){
                    countValues++;
                    for(l=0; l<tabId.length; l++){
                        for(k=0; k<relations[tabId[l]][1].length; k++){
                            if(relations[j][1][m].key == relations[tabId[l]][1][k].key && relations[j][1][m].value == relations[tabId[l]][1][k].value){
                                listTmpKeysValues.push(relations[j][1][m].key +' : '+relations[j][1][m].value);
                                
                            }
                        }  
                    }
                }
            }
        }
        if(countValues != 0){
            break; 
        } 
    }
    communKeysValues = KeepDuplicatedKey(listTmpKeysValues, entities.length);
    FinalTab = communKeysValues.concat(communKeys);
    //console.log(communKeysValues);
        console.log("The entities have in commun : \n")
        return FinalTab;
    }

function fonctionG(attributes, reverseRelations) {
    var listTmpFinal = [];
    var listTmp = [];
      //var attributsList = initAttributsList(columns);
    var i,j,k;

    for(j = 0; j < attributes.length; j++){
        var elmt = 0;
        if(attributes[j].value == undefined){
            console.log("YES for undefined");
            for (i = 0 ;i < reverseRelations.length; i++){ 
                for (k = 0; k < reverseRelations[i][0].length; k++){          
                    if(attributes[j].key == reverseRelations[i][0][k].key){
                        if (listTmp.indexOf(reverseRelations[i][1]) == -1) {
                            listTmp.push(reverseRelations[i][1]);
                            elmt ++;
                        } else {
                            console.log("Item already exists");
                        }
                    }
                }
            }
        }
        if(attributes[j].value != undefined){
            console.log("YES for value");
            for (i = 0 ;i < reverseRelations.length; i++){ 
                for (k = 0; k < reverseRelations[i][0].length; k++){          
                    if(attributes[j].key == reverseRelations[i][0][k].key && attributes[j].value == reverseRelations[i][0][k].value){
                        if (listTmp.indexOf(reverseRelations[i][1]) == -1) {
                            listTmp.push(reverseRelations[i][1]);
                            elmt ++;
                        } else {
                            console.log("Item already exists");
                        }
                    }
                }
            }
        }
    }
    return listTmp;
}

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


var entitiesTest = ['.info','#content'];
var attrib = [{ key: 'padding', value: '0' }];

console.log("Entites \n")
console.log(matrixTest.entities);
console.log("\ Attributes \n")
console.log(matrixTest.attributes);
//console.log("\n Fonction f \n")
//console.log(fonctionF(matrixTest.relations, entitiesTest));

console.log(" \n Fonction g \n")
console.log(fonctionG(attrib, matrixTest.reverseRelations));
