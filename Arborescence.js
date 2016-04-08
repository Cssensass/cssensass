// Arborescence ///////////////////////////////


function g(cssContent) {
    
    var columns = MatrixColumns(cssContent);
    var lines = MatrixLines(cssContent);
    var correspondances = fillMatrix(cssContent);
    
    var communDeclarationsKeyOnly = [];
    var communDeclarations = [];
    //console.log(correspondances[1].declaration.key);
    for (i=0; i<columns.length; i++){
        var compteur = 0;
        for(j=0; j<lines.length -1; j++){
            if(correspondances[j].declaration.key == columns[i].key && correspondances.egal == true){
                communDeclarationsKeyOnly.push(lines[i]);
                console.log(correspondances[i].declaration.key);
                
            }
            if((correspondances[j].declaration.key == columns[i].key || correspondances[j].declaration.value == columns[i].value) && correspondances[j].egal == true){
                communDeclarations.push(lines[i]);
                console.log(correspondances[i].declaration.key);
            }
            
        }
        
    }
    console.log(communDeclarationsKeyOnly);  
    console.log(communDeclarations); 
};

g(cssContent);

function f(cssContent) {
  
}