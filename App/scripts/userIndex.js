const expParam = require("./App/scripts/le_experiment.js").le_experiment();
function loadValues(expParam){
    var testSet=expParam.TestSet;
    var stagesSet=expParam.StagesSet;//move
    var stages=expParam.Stages;
    fillTestSetValues(testSet);
    fillStages(stages);
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
        for (let i = 0; i < [jsonK].length; i++) {
            if(field.name==jsonK[index]){
                field.value=jsonV[index];
            }    
        }     
    });
}

function fillStages(stages){
    var maxIndex=1;
    var index=0;
    if(index<maxIndex){
        fillStage(index,stages[index])
    }else{
        console.log("error");
    }
}
function fillStage(index,stage){
    let staticsFields = document.querySelectorAll("#Stages [name]");
    console.log(staticsFields);
    staticsFields.forEach(function(field,index){
        console.log(field.name,field.id,index);
    });

}
loadValues(expParam);


/**/
var next = document.getElementById("next");
next.addEventListener("mousedown",function(next){
    window.location.href = "index.html";
});
function runTest(next) {
    window.location.href = "index.html";
}