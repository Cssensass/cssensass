
// Arborescence ///////////////////////////////
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

function g(cssContent, attributs) {
  var columns = MatrixColumns(cssContent);
  var lines = MatrixLines(cssContent);
  var correspondances = fillMatrix(cssContent);

  var objectsList = initObjectsList(lines);
  var i,j;

  for(j = 0; j < attributs.length; j++){
    var listTmp = [];
    for(i = 0; i < correspondances.length; i++){
        if((correspondances[i].declaration.key == attributs[j].key) && (correspondances[i].declaration.value == attributs[j].value)){
            listTmp.pushIfNotExist(correspondances[i].selector.selector, function(e){
                return correspondances[i].selector.selector === e;
            });
        }
    }
    objectsList = intersect(objectsList, listTmp);
  }
  return objectsList;
}



function f(cssContent, objects) {
  var columns = MatrixColumns(cssContent);
  var lines = MatrixLines(cssContent);
  var correspondances = fillMatrix(cssContent);

  var attributsList = initAttributsList(columns);
  var i,j;

  for(j = 0; j < objects.length; j++){
    var listTmp = [];
    for(i = 0; i < correspondances.length; i++){
        if(correspondances[i].selector.selector == objects[j].selector){
            var elementTag;         
            if(correspondances[i].declaration.value != null){
                elementTag = correspondances[i].declaration.key + ' : ' + correspondances[i].declaration.value;
            }else{
                elementTag = correspondances[i].declaration.key;
            }
            listTmp.pushIfNotExist(elementTag, function(e){
                return elementTag === e;
            });
        }
    }
    attributsList = intersect(attributsList, listTmp);
  }
  return attributsList;
}
var attrib = [{key:'background'}];
var obj = [{selector:'body'}, {selector: '#left'}];
//console.log(g(cssContent, attrib));
console.log(f(cssContent, obj));
