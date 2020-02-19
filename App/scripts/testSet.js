//req de class
const expParam = require("./App/scripts/le_experiment.js").le_experiment();
const componentClass = require("./App/scripts/componente.js");
const modalClass = require("./App/scripts/modal.js");
const scoreClass = require("./App/scripts/placar.js");
const VI = require("./App/scripts/gera_vi.js");
const test = require("./App/scripts/test.js");
const remote = require("electron").remote;
var stageNumber = 0;
const compParamA = expParam.Stages[stageNumber].CompA;
const compParamB = expParam.Stages[stageNumber].CompB;
const report = require("./App/scripts/gerarelatorio.js")

var posVIA = new VI();
var negVIA = new VI();
var posVIB = new VI();
var negVIB = new VI();

var teste = new test(
  expParam.Stages[0].IntervalTime,
  expParam.TestSet.TestTime
);

var score = new scoreClass(expParam.TestSet.ShowScoreInterval);
var pointsA = new modalClass(
  expParam.TestSet.CollectTime,
  teste,
  "myModalA",
  "headerA",
  "footerA",
  "coletaPontoA"
);
var pointsB = new modalClass(
  expParam.TestSet.CollectTime,
  teste,
  "myModalB",
  "headerB",
  "footerB",
  "coletaPontoB"
);

var componentA = new componentClass(
  compParamA.ComponentColor,
  posVIA,
  negVIA,
  pointsA,
  "capiA"
);
var componentB = new componentClass(
  compParamB.ComponentColor,
  posVIB,
  negVIB,
  pointsB,
  "capiB"
);
componentA.getClick();
componentB.getClick();
pointsA.btn.onclick = function() {
  teste.beginChanger();
  componentA.score++;
  document.getElementById("scoreText").innerHTML =
    "Pontuação: " + (componentA.score + componentB.score);
  componentA.posViCount();
  console.log(
    "Você coletou pontos! Pontos totals: " +
      (componentA.score + componentB.score)
  );
  document.getElementById("myModalA").style.display = "none";
};
pointsB.btn.onclick = function() {
  teste.beginChanger();
  componentB.score++;
  score.info = "Pontuação: " + componentA.score + componentB.score;
  document.getElementById("scoreText").innerHTML =
    "Pontuação: " + (componentA.score + componentB.score);
  componentB.posViCount();
  console.log(
    "Você coletou pontos! Pontos totals: " +
      (componentA.score + componentB.score)
  );
  document.getElementById("myModalB").style.display = "none";
};
teste.beginChanger();
score.scoreShow(score.showInterval, "pos", componentA, teste.compChange);

componentA.posViCount();
componentB.posViCount();


while (stageNumber < expParam.StagesSet.NumberOfStages) {
  stageNumber++;
  setTimeout(function() {
    var window = remote.getCurrentWindow();
        if(stageNumber >= expParam.StagesSet.NumberOfStages){
          //report.create_report(componentA, componentB)  Não está funcionando
          window.close();
        }
        else
          window.reload();
  }, 5000); //teste.phaseTime);
}
