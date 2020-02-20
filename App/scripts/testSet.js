//req de class
const expParam = require("./App/scripts/le_experiment.js").le_experiment();
const componentClass = require("./App/scripts/componente.js");
const modalClass = require("./App/scripts/modal.js");
const scoreClass = require("./App/scripts/placar.js");
const VI = require("./App/scripts/gera_vi.js");
const test = require("./App/scripts/test.js");
const report = require("./App/scripts/genarateReport.js"); //teste
const itControler = require("./App/scripts/itControler.js"); //teste
const remote = require("electron").remote;
const maxIndex = expParam.StagesSet.NumberOfStages; //teste
var index = 0; //teste
var compParamA = expParam.Stages[index].CompA;
var compParamB = expParam.Stages[index].CompB;
var compPAIT = new itControler(); //teste
var compPBIT = new itControler(); //teste

var posVIA = new VI();
var negVIA = new VI();
var posVIB = new VI();
var negVIB = new VI();

var teste = new test(
  expParam.Stages[index].IntervalTime,
  expParam.TestSet.TestTime,
  compPAIT,
  compPBIT
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
  "capiA",
  compParamA.PosPtsGive,
  compParamA.NegPtsGive,
  compParamA.ComponentViPOS,
  compParamA.ComponentViNEG,
  teste.compPAIT
);
var componentB = new componentClass(
  compParamB.ComponentColor,
  posVIB,
  negVIB,
  pointsB,
  "capiB",
  compParamB.PosPtsGive,
  compParamB.NegPtsGive,
  compParamB.ComponentViPOS,
  compParamB.ComponentViNEG,
  teste.compPBIT
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
    "Você coletou pontos! Total de pontos: " +
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

while (index < expParam.StagesSet.NumberOfStages) {
  index++;
  setTimeout(function() {
    var window = remote.getCurrentWindow();
    if (index >= expParam.StagesSet.NumberOfStages) {
      report.makeReport(expParam, componentA, componentB);
      window.close();
    } else {
      report.storageComps(componentA, componentB);
      window.reload();
    }
  }, 20000); //teste.phaseTime);
}
