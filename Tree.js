/////////////////////////////// Arborescence //////////////////////////////

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

var arborescence = function Arborescence(){

    this.fonctionF = function(relations, entities) {
        var communKeys = [];
        var communKeysValues = [];
        //var attributsList = initAttributsList(columns);
        var i,j,k;
        var listTmpKeys = [];
        var listTmpKeysValues = [];
        var tabId = [];
        var listTmpKeysFinal = [];
        // chercher la position des selecteurs qu'on a entré dans le fichier .css 
        for(j = 0; j < entities.length; j++){
            var elmt = 0;
                    
            for(i=0;i<relations.length; i++){
                            
                if(entities[j] == relations[i][0]){ 
                    tabId.push(i);
                }
            }
        }
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
        
            console.log("The entities have in commun : \n")
            return FinalTab;
    }

    this.fonctionG = function(attributes, reverseRelations) {
        var listTmpFinal = [];
        var listTmp = [];
        var tabId = [];
        var tab = [];
        var i,j,k;

        var attributesConstructor = {
		  init: function(key,value){
              this.key = key;
              this.value = value;
		  },
		  initKeyOnly: function(key){
              this.key = key;
		  }
        };
        
        var attributesTab = [];
  
        console.log(reverseRelations.length)
        for(j = 0; j < attributes.length; j++){
            
            var elmt = 0;
            for(i=0;i<reverseRelations.length; i++){
                attributesTab[j] = Object.create(attributesConstructor); 
                attributesTab[j].init(attributes[j].key, attributes[j].value+'d');
                if(attributesTab[j].value == 'undefinedd'){
                    attributesTab[j].value == 'undefined';
                    for(k=0;k<reverseRelations[i][0].length; k++){
                        if(attributesTab[j].key == reverseRelations[i][0][k].key ){
                            tabId.push(reverseRelations[i][1]);
                            
                        }
                    }
                    attributesTab[j].value == 'undefinedd'
                }
            
                attributesTab[j].init(attributes[j].key, attributes[j].value);
                if(attributesTab[j].value != 'undefinedd'){
                    for(m=0;m<reverseRelations[i][0].length; m++){ 
                        if(attributesTab[j].key == reverseRelations[i][0][m].key && attributesTab[j].value == reverseRelations[i][0][m].value ){
                            tabId.push(reverseRelations[i][1]);
                        }
                    }
                }
            }
        }
        tab = KeepDuplicatedKey(tabId,attributes.length);
        return tab;
    }
        
       
}

module.exports = arborescence;
