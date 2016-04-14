#!/usr/bin/env node

//////// Arborescence //////////////////////////////

Array.prototype.inArray = function(comparer) { 
    for(var i=0; i < this.length; i++) { 
        if(comparer(this[i])) return true; 
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

function g(entities, reverseRelations, attributes) {
  

  //var objectsList = initObjectsList(lines);
  var i,j,k;

  for(j = 0; j < attributes.length; j++){
    var listTmp = [];
    for(i = 0; i < reverseRelations.length; i++){
        for(k = 0; k < reverseRelations[i][0].length; k++){
            if((reverseRelations[i][0][k].key == attributes[j].key) && (reverseRelations[i][1] == attributes[j].value)){
                listTmp.pushIfNotExist(reverseRelations[i][1], function(e){
                    return reverseRelations[i][1] === e;
                });
            }    
        }  
    }
    var objectsList = intersect(entities, listTmp);
  }
  return objectsList;
}



function f(attributes, relations, entities) {

  //var attributsList = initAttributsList(columns);
  var i,j,k;

  for(j = 0; j < entities.length; j++){
    var listTmp = [];
    for(i = 0; i < relations.length; i++){
        if(relations[i].key == entities[j].key){
            var elementTag;
            for (k = 0; k < relations[i][1].length; k++){          
                if(relations[i][1][k].value != null){
                    elementTag = relations[i][1][k].key + ' : ' + relations[i][1][k].value;
                }else{
                    elementTag = relations[i][1][k].key;
                }
                listTmp.pushIfNotExist(elementTag, function(e){
                    return elementTag === e;
                });
            }    
        }
    }
    attributsList = intersect(attributes, listTmp);
  }
  return attributsList;
}


var attrib = [{key:'background'}];
var obj = [{selector:'body'}, {selector: '#left'}];

/////// TESTS ///////////////////////////


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


//matrixTest.printMatrixElement();
console.log(matrixTest.entities)
console.log(matrixTest.attributes)

console.log(g(matrixTest.entities, matrixTest.relations, matrixTest.attributes));
console.log(f(matrixTest.attributes, matrixTest.reverseRelations, matrixTest.entities));
