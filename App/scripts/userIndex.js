const expParam = require("./App/scripts/le_experiment.js").le_experiment();
function loadValues(expParam){
    var testSet=expParam.TestSet;
    var stagesSet=expParam.StagesSet;
    var stages=expParam.Stages;
    fillTestSetValues(testSet);
    /*transformar depois*/
    var compAVI=document.getElementById("compaVIinput");
    compAVI.value=stages[0].CompA.ComponentViPOS;
    var compBVI=document.getElementById("compbVIinput");
    compBVI.value=stages[0].CompB.ComponentViPOS;
}

function fillTestSetValues(testSet){
    let staticsFields = document.querySelectorAll("#optionBox [name]");
    var json=Object.entries(testSet);
    var jsonK=[];
    var jsonV=[];
  
    for (let [key, value] of json){ 
        /*console.log(`
        key ${key}
        value ${value}
        `);*/
        jsonK.push(key);
        jsonV.push(value);
    }
    /*
    console.log(jsonK);
    console.log(jsonV);
    */
    staticsFields.forEach(function(field,index){
        //console.log(field.name,field.value,index);
        if(field.name=="TesteType"){
            field.value=jsonV[0];
        }
        for (let i = 1; i < jsonK.length; i++) {
            if(field.name==jsonK[i]){
                field.value=jsonV[i];
            }    
        }     
    });
}

loadValues(expParam);
writeExparam();
/** */
function writeExparam(){
    let specs = document.querySelectorAll("#optionBox [name]");
    specs.forEach(function(field,index){
        console.log(index,field.name,field.value);
    });

}

/**/
next.addEventListener("mousedown",function(next){
    window.location.href = "index.html";
});
function runTest(next) {
    console.log("next");
    window.location.href = "index.html";
}