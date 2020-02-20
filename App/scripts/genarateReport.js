var componenteA=[];
var componenteB=[];

module.exports = {
    makeReport : function(expParam,compA,compB){
        let report=module.exports.createReport(expParam,compA,compB);
        module.exports.whriteReport(report);
    },
    whriteReport : function(reportResults){
        var archive;
        var fs = require('fs'),
        path = require('path')
        filePath = path.join(__dirname+'/json', 'results.json' );
        if (fs.existsSync(filePath)) {
            try {
                var fsarchive = fs.readFileSync(filePath)
                var archive = JSON.parse(fsarchive);
            } catch (error) {
                console.log("error")
                return false;
            }
            archive.push(reportResults)
            let data = JSON.stringify(archive);
            fs.writeFileSync(__dirname+'/json/results.json', data);
        }
        else{
            var content=[]
            try {
                fs.writeFileSync(filePath, JSON.stringify(content));
                module.exports.whriteReport(reportResults)
            } catch (err) {
                return console.log(err);
            }
        }
    },
    createReport : function(expParam,compA,compB){
        var stagesSet = module.exports.createStagesSet(expParam);
        var stages = module.exports.createStages(expParam,stagesSet.NumberOfStages);
        var testSet = module.exports.createTest(expParam.TestSet,stagesSet);
        let report={
            "ID" : expParam.ID,
            "TrainingTime" : expParam.TrainingTime,
            "TestSet" : testSet,
            "StagesSet": stagesSet,
            "Stages" : stages
        }
        return report;
    },
    createTest : function(test,stagesSet){//função cagada
        let testSet={
            "TestType" : test.TestType,
            "TestTime" : test.TestTime,
            "CollectTime": test.CollectTime,
            "COD" : test.COD,
            "ICI" : test.ICI,
            "ShowScoreInterval" : test.ShowScoreInterval,
            "ScoreShow" : test.ScoreShow,
            "PointsPerTask" : test.PointsPerTask,
            
            "TotalPoints" : stagesSet.StageTotalPoints,
            "TotalInterationTime" : stagesSet.StageInterationTime
        }
        return test;
    },
    createStagesSet : function(expParam){
        let stagesSet = {
            "NumberOfStages" : expParam.StagesSet.NumberOfStages,    
            "ComponentTime" : expParam.StagesSet.ComponentTime
        };
        return stagesSet;
    },
    createStages : function(expParam,maxIndex){
        var stages = [];
        for (let index = 0; index < maxIndex; index++) {
            let tempStage={
                "Condition" : expParam.Stages[index].Condition,
                "NumberOfCycles" : expParam.Stages[index].NumberOfCycles,
                "IntervalTime" :  expParam.Stages[index].IntervalTime,
                "StageInterationTime": componenteA[index].compPIT.tT+componenteB[index].compPIT.tT,
                "StageTotalPoints" : componenteA[index].score + componenteB[index].score,
                "CompA":{
                    "ComponentColor" : componenteA[index].color,
                    "ComponentViPOS" : componenteA[index].posVIinterval,
                    "ComponentViNEG" : componenteA[index].negVIinterval,
                    "PosPtsGive" : componenteA[index].score,
                    "NegPtsGive" : componenteA[index].score,
                    "PositivePointsComp" : componenteA[index].score,
                    "NegativePointsComp" : componenteA[index].score,
                    
                    "PosVIsUsed" : componenteA[index].posVIsUsed,
                    "NegVIsUsed" : componenteA[index].negVIsUsed,
                    "CompqtdClicks" : componenteA[index].color,
                    "CompInterationTime": componenteA[index].compPIT.tT
                },
                "CompB":{
                    "ComponentColor" : componenteB[index].color,
                    "ComponentViPOS" : componenteB[index].posVIinterval,
                    "ComponentViNEG" : componenteB[index].negVIinterval,
                    "PosPtsGive" : componenteB[index].score,
                    "NegPtsGive" : componenteB[index].score,
                    "PositivePointsComp" : componenteB[index].score,
                    "NegativePointsComp" : componenteB[index].score,
                    
                    "PosVIsUsed" : componenteB[index].posVIsUsed,
                    "NegVIsUsed" : componenteB[index].negVIsUsed,
                    "CompqtdClicks" : componenteB[index].color,
                    "CompInterationTime": componenteB[index].compPIT.tT
                }
            }
            stages.push(tempStage);
        }
        return stages;
    },
    storageComps : function(compA, compB){
        console.log(compB);
        componenteA.push(compA);
        componenteB.push(compB);
    }
}