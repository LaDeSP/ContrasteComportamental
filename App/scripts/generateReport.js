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
        var stages = module.exports.createStages(expParam,compA,compB,stagesSet.NumberOfStages);
        var testSet = module.exports.createTest(expParam.TestSet,stagesSet);
        let report={
            "TrainingTime" : expParam.TrainingTime,
            "TestSet" : testSet,
            "StagesSet": stagesSet,
            "Stages" : stages
        }
        return report;
    },
    createTest : function(test,stagesSet){
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
    createStages : function(expParam,compA,compB,maxIndex){
        var stages = [];
        for (let index = 0; index < maxIndex; index++) {
            let tempStage={
                "Condition" : expParam.Stages[index].Condition,
                "NumberOfCycles" : expParam.Stages[index].NumberOfCycles,
                "IntervalTime" :  expParam.Stages[index].IntervalTime,
                "StageInterationTime": compA.compPIT.tT+compB.compPIT.tT,
                "StageTotalPoints" : compA.score + compB.score,
                "CompA":{
                    "ComponentColor" : compA.color,
                    "ComponentViPOS" : compA.posVIinterval,
                    "ComponentViNEG" : compA.negVIinterval,
                    "PosPtsGive" : compA.score,
                    "NegPtsGive" : compA.score,
                    "PositivePointsComp" : compA.score,
                    "NegativePointsComp" : compA.score,
                    
                    "PosVIsUsed" : compA.posVIsUsed,
                    "NegVIsUsed" : compA.negVIsUsed,
                    "CompqtdClicks" : compA.color,
                    "CompInterationTime": compA.compPIT.tT
                },
                "CompB":{
                    "ComponentColor" : compB.color,
                    "ComponentViPOS" : compB.posVIinterval,
                    "ComponentViNEG" : compB.negVIinterval,
                    "PosPtsGive" : compB.score,
                    "NegPtsGive" : compB.score,
                    "PositivePointsComp" : compB.score,
                    "NegativePointsComp" : compB.score,
                    
                    "PosVIsUsed" : compB.posVIsUsed,
                    "NegVIsUsed" : compB.negVIsUsed,
                    "CompqtdClicks" : compB.color,
                    "CompInterationTime": compB.compPIT.tT
                }
            }
            stages.push(tempStage);
        }
        return stages;
    }
}