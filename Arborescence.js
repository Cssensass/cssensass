
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


function fonctionF(attributes, relations, entities) {
    var listTmpFinal = [];
      //var attributsList = initAttributsList(columns);
      var i,j,k;

      for(j = 0; j < attributes.length; j++){
          var listTmp = [];
          var elmt = 0;
          
          if(attributes[j].value == undefined){
              for (i = 0 ;i < relations.length; i++){ 
                     for (k = 0; k < relations[i][1].length; k++){          
                         if(attributes[j].key == relations[i][1][k].key){

                             listTmp[j] = attributes[j].key;

                             elmt ++;
                         }

                    }
              }

          }
          if(attributes[j].value != undefined){
              for (i = 0 ;i < relations.length; i++){ 
                     for (k = 0; k < relations[i][1].length; k++){          
                         if(attributes[j].key == relations[i][1][k].key && attributes[j].value == relations[i][1][k].value){

                             listTmp[j] = attributes[j].key + ' : '+attributes[j].value ;

                             elmt ++;
                         }

                    }
              }

          }
          if(elmt == relations.length){
              listTmpFinal.push(listTmp[j])

          }
          //incrementation variable trouvé
      }

        return listTmpFinal;
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


console.log(fonctionF(matrixTest.attributes, matrixTest.relations, matrixTest.entities));
